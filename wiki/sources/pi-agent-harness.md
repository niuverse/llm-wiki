---
title: "pi：可组合循环与持久化实验"
nav_title: "pi"
type: source
tags: [agents, source-backed]
sources: []
modified: 2026-10-08
source_file: raw/pi-readme-2026-10-08-d4f05a91fe0d.md
source_kind: markdown
source_type: repository
source_url: https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/README.md
source_date: unknown
source_version: "ce950d78f424dcaf9f5d6a03ce80ab141130eb1d"
topics: ["topics/agent-execution"]
---

# pi：可组合循环与持久化实验

本次官方仓库 `badlogic/pi-mono` 跳转到 `earendil-works/pi`，固定读取 `ce950d78f424dcaf9f5d6a03ce80ab141130eb1d`（2026-10-08 的 main 快照，**不等同于稳定发行版**）。当前包命名使用 `@earendil-works/*`。pi 保留精简且可扩展的产品取向，但“整个仓库只有一个小循环”已经不足以描述当前代码：除了 agent-core 和 coding-agent，还出现实验性的 pi-durable 与 Chord。以下分别说明，避免把实验接口当成 CLI 的默认行为。[固定版本仓库](https://github.com/earendil-works/pi/tree/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d)

## agent-core：围绕一个循环暴露扩展位置

`pi-ai` 负责模型访问，`pi-agent-core` 负责消息、工具循环和事件，coding-agent 在其上提供应用层会话与交互。模型请求前可以用 `transformContext` 整理消息，再用 `convertToLlm` 转成模型理解的消息；界面专用记录不必发给模型。`prepareRequest` 可以在发请求前装入最终上下文，`finishTurn` 则决定自然调度、继续一次或结束。[agent-core README](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/packages/agent/README.md)

以“读配置、改配置、测试”为例，`prompt()` 加入用户消息；`runLoop()` 获取模型响应并提取工具调用，执行后把工具结果加回上下文，通常再请求一次模型。pi 此处的 turn 指一次模型响应加工具，不等于 [[deepseek-harness|DSH]] 可含多个 step 的 turn。[`agent-loop.ts` 166–322 行](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/packages/agent/src/agent-loop.ts#L166)

正在运行时，steering 输入在当前工具轮次完成后进入下一次请求；follow-up 在原工作本来可以结束时才接入。`finishTurn` 明确返回 end 时会提前结束，不继续轮询队列。模型错误与中止属于硬退出，不能靠一个“总是 continue”的回调可靠续跑；无条件 continue 反而可能制造无限循环。

## 工具与事件：并行、顺序和阻塞位置

该提交默认并行执行工具，逐项预检查后并发运行，完成事件按实际完成顺序到达，但最终工具结果消息按模型原调用顺序排列。只要同一批有工具声明 `executionMode: sequential`，整个批次改为串行。这与 DSH 的逐个 exclusive 屏障不同；两者都不能从工具名称自动推导读写依赖。[`agent-loop.ts` 工具执行部分](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/packages/agent/src/agent-loop.ts#L508)

参数先验证，再进入 `beforeToolCall`；被拒绝的调用转成工具错误，`afterToolCall` 可以处理执行结果。输出因长度上限截断时，即使部分 JSON 恰好能解析，也不能保证参数完整；当前循环为该响应的工具调用生成失败结果，让模型重新提出完整调用。工具批次只有所有最终结果都声明 terminate 才会跳过自动后续请求。

`Agent` 类会等待订阅处理，assistant 的完成消息处理因此可以成为工具前置检查前的屏障；底层 `agentLoop()` 事件流只是观察接口，不等待外部异步处理结束。要在工具执行前落实策略，应使用明确的前置钩子或类级屏障，不能假定“监听到事件就来得及拦截”。这些行为由 README 与同一份循环代码共同支持，未做并发压测。

## coding-agent：会话树与模型上下文

会话 JSONL 的条目用 `id`／`parentId` 形成分支。当前叶子到根的路径决定活跃历史，切换分支不等于把文件后半段删除。`compaction` 保存摘要和保留边界，`context_edit` 可以在不改原条目的情况下影响未来模型上下文。`custom` 扩展状态默认不进入模型，`custom_message` 则可以进入；“写入会话”和“模型看得见”有明确区别。[Session Format](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/packages/coding-agent/docs/session-format.md)

压缩先选保留边界，再生成摘要，追加新条目并重建上下文。当前文档要求保留工具调用／结果配对，不在结果中间任意截断；系统提示与工具声明也要形成可重建的检查点。工具输出在摘要序列化时可能截断，因此“原历史仍在”与“摘要保留了全部细节”不能互相替代。[Compaction Reference](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/packages/coding-agent/docs/compaction.md)

## pi-durable：把执行过程也变成可恢复状态

**这一节是实验包文档解析，未做实现核验，也不代表普通 coding-agent 已全部切换到它。** `pi-durable` 把会话条目、文档状态和任务推进放在原子提交中；生成任务创建工具子任务，工具完成后再交给下一次生成。它把恢复单位从“重新读消息”推进到“重新打开持久任务的状态机”。[pi-durable README](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/packages/durable/README.md)

文档声明工具意图在执行前提交。进程在工具中途退出，只有标为 `replay: safe` 的工具才重新执行，否则交回 interrupted 结果和已提交输出。`requestId` 用于重试提交时查回同一请求。两者用途不同：请求去重不自动让写文件或外部 API 变成可安全重放的操作。

任务还记录归属：父任务中止会向其持有的工作传播，父任务完成要等所属工作完成；明确 background 的任务形成独立边界。运行中的调用保留启动时取到的实现，后续阶段才取新注册表。扩展名称可以持久化，扩展代码本身不会自动写入存储，重启仍需装入对应实现。

存储能力取决于后端：MemoryStorage 不跨进程保存；SQLite 与 JSONL 有各自持久化选项。文档明确一份存储由一个进程拥有，没有跨进程锁。实时输出按间隔提交，也有尚未提交的窗口；本次没有测试强杀进程、断电或重复调用。

## 权限与适用性

根 README 明确说明 pi 默认使用启动进程的权限，没有内置覆盖文件、进程、网络和凭据的权限系统。可以通过容器或其他沙箱部署，也可以用钩子阻止特定工具，但钩子不能自动成为操作系统级隔离。[权限说明](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/README.md#permissions--containerization)

**我们的判断：**学习最小工具循环和扩展位置，可以先精读 agent-core；研究崩溃恢复时再对照 pi-durable 与 [[langgraph-persistence|LangGraph]]。不要因为框架名称简短，就把可靠性、隔离和状态恢复视为已经解决。

全文阅读下表的 README、Session Format、Compaction；全文静态阅读 agent-core 的 `agent-loop.ts`。coding-agent 持久化与 pi-durable 仅核对文档，没有全面阅读实现或运行测试。

## 归档与阅读范围

原始字节与 SHA-256 已登记在 `graph/acquisitions.jsonl`；读取于 2026-10-08。下表保留实际文件路径，便于继续核查。

| 原始资料 | 本地快照 |
| --- | --- |
| [README.md](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/README.md) | `raw/pi-readme-2026-10-08-d4f05a91fe0d.md` |
| [packages/agent/README.md](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/packages/agent/README.md) | `raw/pi-readme-2026-10-08-37da6831566e.md` |
| [packages/agent/src/agent-loop.ts](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/packages/agent/src/agent-loop.ts) | `raw/pi-agent-loop-2026-10-08-28a2b03e34a7.ts` |
| [packages/coding-agent/docs/session-format.md](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/packages/coding-agent/docs/session-format.md) | `raw/pi-session-format-2026-10-08-4f8fc42179b3.md` |
| [packages/coding-agent/docs/compaction.md](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/packages/coding-agent/docs/compaction.md) | `raw/pi-compaction-2026-10-08-190b8c651148.md` |
| [packages/durable/README.md](https://github.com/earendil-works/pi/blob/ce950d78f424dcaf9f5d6a03ce80ab141130eb1d/packages/durable/README.md) | `raw/pi-durable-readme-2026-10-08-3afb20db992f.md` |

关联：[[AgentHarness|Agent Harness 基础]]、[[topics/agent-execution|Agent Systems]]。

源码阅读缓存：`graph/extracts/pi-agent-loop-2026-10-08-28a2b03e34a7.md`。
