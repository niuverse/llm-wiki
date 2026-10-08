---
title: "DeepSeek Harness：插件、事件与执行边界"
nav_title: "DeepSeek Harness"
type: source
tags: [agents, source-backed]
sources: []
modified: 2026-10-08
source_file: raw/dsh-readme-2026-10-08-0f5516be2acd.md
source_kind: markdown
source_type: repository
source_url: https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/README.md
source_date: unknown
source_version: "5badb15009ae1756c3afe0ae0cef1faafc290ccc"
topics: ["topics/agent-execution"]
---

# DeepSeek Harness：插件、事件与执行边界

DSH 把模型适配、工具、会话和循环本身都装入 Cordis 插件树。它要解决的主要问题是：替换一项能力时，怎样保留统一的调用接口、会话记录和其他能力，而不用修改整条执行循环。本页依据官方架构文档，并核查固定提交的流式记录、工具调度和请求重试代码；不是运行验证。

## 本次 refresh 核实了什么

截至 2026-10-08，npm 的 `latest` 是 **0.2.0-rc.2**，对应标签提交 `639ed015397290b3745d163aafe02ffee4aa3f84`；较新的 **0.2.1-alpha.1** 对应 `5badb15009ae1756c3afe0ae0cef1faafc290ccc`，也是本次获取的 `master`。项目仍标为 developer preview。本文机制以这个 alpha 固定提交为准；不能假定用户通过普通 npm 更新后已经装到 alpha。[npm 默认版本](https://registry.npmjs.org/@deepseek-ai/dsh/latest)、[标签](https://github.com/deepseek-ai/deepseek-harness/tags)

旧页 [[dsh-learning-map]] 只是未归档的讨论记录，标注过 `0.1.0-rc.7`。本次首次建立可追溯来源；下面“旧笔记 → 当前核查”的变化不是完整发布差异清单，也不推定每项变化都首次发生在 0.2.1。

| 旧笔记 | 当前核查 | 对理解的影响 |
| --- | --- | --- |
| `assistant/chunk` 逐块持久化 | 实时 `agent/assistant-stream` 与结算时写入的 `assistant/message`／`assistant/attempt` 分开 | 实时可见不等于已经持久保存 |
| 简化为三类模型可见消息 | 当前系统提示也通过 `system/message` 进入历史，另有请求头与上下文记录 | 重建请求不能只拼接聊天正文 |
| 主要讲 Web／headless | 还明确区分 SDK、SDK-minimal、ACP 和 Desktop 的组合及启动职责 | 同一能力骨架可以配不同入口；不能混用各入口默认配置 |
| 早期本机路径、包数量与运行状态 | 没有在本机复核，移出当前实现说明 | 不把历史会话的安装环境当成本次环境 |

对 npm 默认版与 alpha 的两份 `architecture.md`、`agent-lifecycle.md` 做了完整文本比较：生命周期文档相同；架构文档中 Desktop 默认固定端口改为系统分配端口，并移除了“由运行时不变量检查请求可重建性”的表述。alpha 的升级说明还写明 Schedule 从可选 bundle 移入 Web 组合；这些差异不能倒推到 RC。未逐项审计两个标签间所有代码变化。

## 组合层：插件为什么不等于工具

Cordis 的共享上下文提供服务和事件；插件可以注册工具，也可以只提供持久化、模型连接或界面。卸载会清理由框架跟踪的注册效果；这不意味着撤销已经写入的文件或外部 API 操作。把“服务注册可撤销”理解成“现实操作可回滚”会破坏恢复设计。[架构文档](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/docs/architecture.md)

启动时，从空插件列表依次叠加 profile 指定的 bundles、profile 的 `cordis.patch.yml`、home 的配置和命令行 overlays。覆盖某个配置行会替换整个 config，因此局部改一个键时仍要考虑其他键。`web`、`headless`、`sdk`、`acp` 复用 base，`sdk-minimal` 则有独立完整树。这里的价值是把“装哪些能力”与“能力怎么工作”分开；代价是读源码前必须先知道实际装载的组合。

一个能力通常分为接口、实现和调用者。例如文件系统与子进程若一起换成远程实现，工具应在同一个远程执行环境中操作。只迁移 Bash、却让文件读取继续指向本机，会出现“模型读到的文件不是命令修改的文件”；这是依据接口分工推导的工程风险，不是本次复现的缺陷。

## 一次请求怎么走

以“读取配置、修改、运行测试”为教学例子：输入先进入队列，驱动认领输入并打开 turn；预处理可以重写或拒绝。获准后打开 step，准备模型调用，记录系统提示、用户消息及请求所需信息，再从日志导出并冻结模型请求。模型提出工具调用后，工具调度器执行、记录结果；结果通常要求下一次模型调用，直到没有后续工作才结束 turn。[生命周期](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/docs/agent-lifecycle.md)

DSH 的 **step** 是一次模型请求与其工具执行；**turn** 可含多个 step。[[pi-agent-harness|pi]] 把一次模型响应与工具称为 turn，比较时要按执行单位对齐，不能按名字直接对应。

### 流式显示和持久记录

`AssistantStreamAttempt.push()` 把片段加入累积器并发出实时帧；`settle()` 先调用日志追加，再发出已提交的结束帧。成功响应保存在 `assistant/message`，没有形成可见消息的已结束失败尝试保存在 `assistant/attempt`。用户取消但已有可保留正文时，驱动也可能保存带 `interrupted` 标记的消息。这里保存的是已结束尝试；进程在结束前硬退出，不保证保留那次尚未提交的流。[`assistant-stream.ts` 53–140 行](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/packages/core/agent-loop/src/assistant-stream.ts#L53)、[`agent.ts` 402–525 行](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/packages/core/agent-loop/src/agent.ts#L402)

### 并行执行，按模型顺序记录结果

调度器让 `exclusive` 调用形成屏障，让 `parallel` 调用进入有上限的滚动池；准备阶段和结果提交保持模型顺序，工具主体可以重叠执行。每个尚未开始的调用还会重新检查执行模式。中止时停止补充新调用，等待已开始的调用结束，并给未执行的调用补上明确错误结果，避免历史里留下悬空工具请求。[`tool-calls.ts` 全文](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/packages/core/agent-loop/src/tool-calls.ts)

这只是调度语义，不会替模型推断业务依赖。“修改配置”和“运行依赖该配置的测试”仍需保证先后关系；把两项都声明可并行不能得到正确依赖顺序。

## 上下文压缩和失败恢复

`deriveMessages()` 从会话记录重建模型历史。摘要压缩追加自己的开始、摘要、结束记录，并用带 `surfaceOp` 的消息替换一段模型可见内容；原事件仍在。替换范围按当前可见位置解释，不是简单的递增事件编号区间；旧区间被新摘要占据后，显示顺序与事件编号可以不同。边界必须保持工具调用和结果配对。[Compaction 文档](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/docs/subsystems/compaction.md)

当前还允许先裁剪过大的工具结果，再决定是否摘要。**压缩做出了有效缩减才值得重试**；否则不能在同一个超长请求上无限重试。文档有一处不一致：Compaction 页面说错误恢复发生在失败 step 关闭之后，生命周期页面说在同一个 step 内。静态代码显示 `step()` 内循环接收 retry 后继续，而 `step/end` 在外层 `finally` 才追加；本页据此采用“同一 step 内重试”，并保留这个文档差异。[`agent.ts` 329–356、402–510 行](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/packages/core/agent-loop/src/agent.ts#L329)

## 工具策略与沙箱

工具经过前置处理、只能拒绝或不干预的 guards、执行及后置处理，最终生成模型可见结果。审批无法作出放行决定时，工具主体不执行。沙箱是另一层：`confine(argv, policy)` 生成受约束的命令参数，没有可用实现时应报错；`danger-full-access` 绕过该约束。模式词汇管的是文件效果，不承诺覆盖网络和进程可见性；`partial` 也不能解释成完整隔离。[工具处理流程](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/docs/tool-execution-pipeline.md)、[Sandbox 文档](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/docs/subsystems/sandbox.md)

本轮全文阅读表中的架构、生命周期、工具流程、压缩、沙箱和迁移说明；全文静态阅读 `assistant-stream.ts`、`tool-calls.ts`，局部阅读 `agent.ts` 285–525 行。没有运行 DSH，没有审计全部沙箱后端、Cordis 内核、目标管理、子智能体、工作流或 SDK。旧笔记里的形式化论文推导待原文收录后再恢复。

## 归档与阅读范围

原始字节与 SHA-256 已登记在 `graph/acquisitions.jsonl`；读取于 2026-10-08。下表保留实际文件路径，便于继续核查。

| 原始资料 | 本地快照 |
| --- | --- |
| [README.md](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/README.md) | `raw/dsh-readme-2026-10-08-0f5516be2acd.md` |
| [docs/architecture.md](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/docs/architecture.md) | `raw/dsh-architecture-2026-10-08-925aee7c59d0.md` |
| [docs/agent-lifecycle.md](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/docs/agent-lifecycle.md) | `raw/dsh-agent-lifecycle-2026-10-08-3f4a7e406d7e.md` |
| [docs/tool-execution-pipeline.md](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/docs/tool-execution-pipeline.md) | `raw/dsh-tool-execution-pipeline-2026-10-08-c939f3f6e84e.md` |
| [docs/subsystems/compaction.md](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/docs/subsystems/compaction.md) | `raw/dsh-compaction-2026-10-08-ac894aeb9282.md` |
| [docs/subsystems/sandbox.md](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/docs/subsystems/sandbox.md) | `raw/dsh-sandbox-2026-10-08-b60d665a9d56.md` |
| [docs/upgrade-guide/v0.2.0-rc.2/schedule-bundle-retired/guide.md](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/docs/upgrade-guide/v0.2.0-rc.2/schedule-bundle-retired/guide.md) | `raw/dsh-guide-2026-10-08-8521833e6f96.md` |
| [packages/core/agent-loop/src/assistant-stream.ts](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/packages/core/agent-loop/src/assistant-stream.ts) | `raw/dsh-assistant-stream-2026-10-08-120d2bec5efe.ts` |
| [packages/core/agent-loop/src/tool-calls.ts](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/packages/core/agent-loop/src/tool-calls.ts) | `raw/dsh-tool-calls-2026-10-08-5c7e8d8ff002.ts` |
| [dsh-npm.json](https://registry.npmjs.org/@deepseek-ai/dsh/latest) | `raw/dsh-dsh-npm-2026-10-08-1510cc60fea3.json` |
| [dsh-tags.json](https://api.github.com/repos/deepseek-ai/deepseek-harness/tags?per_page=20) | `raw/dsh-dsh-tags-2026-10-08-f8a68a7ccf2d.json` |
| [packages/core/agent-loop/src/agent.ts](https://github.com/deepseek-ai/deepseek-harness/blob/5badb15009ae1756c3afe0ae0cef1faafc290ccc/packages/core/agent-loop/src/agent.ts) | `raw/dsh-agent-2026-10-08-9c985dd5ce36.ts` |

关联：[[AgentHarness|Agent Harness 基础]]、[[topics/agent-execution|Agent Systems]]。

默认 RC 的比较快照：

- [architecture.md（0.2.0-rc.2）](https://github.com/deepseek-ai/deepseek-harness/blob/639ed015397290b3745d163aafe02ffee4aa3f84/docs/architecture.md)：`raw/dsh-rc-architecture-2026-10-08-cf5728e0b907.md`。
- [agent-lifecycle.md（0.2.0-rc.2）](https://github.com/deepseek-ai/deepseek-harness/blob/639ed015397290b3745d163aafe02ffee4aa3f84/docs/agent-lifecycle.md)：`raw/dsh-rc-agent-lifecycle-2026-10-08-3f4a7e406d7e.md`。

源码阅读缓存：`graph/extracts/dsh-assistant-stream-2026-10-08-120d2bec5efe.md`、`graph/extracts/dsh-tool-calls-2026-10-08-5c7e8d8ff002.md`、`graph/extracts/dsh-agent-2026-10-08-9c985dd5ce36.md`。
