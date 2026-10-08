---
title: "OpenCode：编码任务的会话执行"
nav_title: "OpenCode"
type: source
tags: [agents, source-backed]
sources: []
modified: 2026-10-08
source_file: raw/opencode-readme-2026-10-08-400890a3082e.md
source_kind: markdown
source_type: repository
source_url: https://github.com/anomalyco/opencode/blob/687664c63b2bb4eb9b9c7e0dc37227869282ed80/README.md
source_date: unknown
source_version: "687664c63b2bb4eb9b9c7e0dc37227869282ed80"
topics: ["topics/agent-execution"]
---

# OpenCode：编码任务的会话执行

本页固定到 `dev` 提交 `687664c63b2bb4eb9b9c7e0dc37227869282ed80`（2026-10-08），不是稳定发行版承诺。OpenCode 是完整编码工具；本轮研究集中在模型调用、工具状态、文件快照和停止条件如何接起来，不把整个产品归纳成一个 SDK。[官方仓库](https://github.com/anomalyco/opencode/tree/687664c63b2bb4eb9b9c7e0dc37227869282ed80)

## 从用户任务到下一次模型请求

`SessionPrompt.run` 每轮读取已过滤压缩内容的会话，识别最新用户输入、助手响应与待处理任务。子任务和压缩请求先交给对应处理器；普通生成则获取 agent 配置、工具、指令和模型消息，创建 `SessionProcessor`，再交给其消费模型流。[`prompt.ts` 1082–1348 行](https://github.com/anomalyco/opencode/blob/687664c63b2bb4eb9b9c7e0dc37227869282ed80/packages/opencode/src/session/prompt.ts#L1082)

以“修改配置并测试”为例，工具选择、权限与模型由本轮解析得到；模型调用通过处理器更新会话中的工具和文本部分。处理器返回 compact、stop 或 continue，外层据此安排压缩、结束或下一轮。这里的分工是：外层决定本轮要准备什么和是否继续，处理器把流式反馈变成可观察的会话状态。

停止条件并不只看模型的 finish 字段。源码特别处理了“模型返回 stop，但响应仍含需要回传结果的工具调用”的情况；还区分提供方已执行的调用与清理时标记的中断孤立工具。若只凭 stop 退出，模型可能根本没有看过工具结果。

## 工具是一段有生命周期的工作

工具调用具有 pending、running、completed、error 等状态。结果与错误会更新对应部分，包含输入、输出、时间和附件；结束清理把尚未完成的调用标为中断错误。它们表达执行进度，但本轮没有据此证明进程崩溃后能恢复任意工具进程。[`processor.ts` 全文](https://github.com/anomalyco/opencode/blob/687664c63b2bb4eb9b9c7e0dc37227869282ed80/packages/opencode/src/session/processor.ts)

处理器在模型流启动前获取文件快照，因为底层调用层可能先开始执行工具、后发出 step-start。若等显示事件到达才取“执行前快照”，基线可能已被修改。每步结束后记录新的快照、差异、用量和开销；这是一个值得复用的时序原则：**观测事件何时到达，不一定等于真实操作何时开始。**

同一个消息的最近三个工具部分若具有相同名称和参数，代码会发起 `doom_loop` 权限检查；是否获准取决于权限规则，不意味着第三次必定强制停止。这是针对重复调用的启发式检测，不能证明每种无进展循环都能被发现。[重复检测](https://github.com/anomalyco/opencode/blob/687664c63b2bb4eb9b9c7e0dc37227869282ed80/packages/opencode/src/session/processor.ts#L354)

## 出错与压缩如何分流

模型流错误经错误分类和重试策略处理。上下文溢出会进入压缩分支，其他终止错误写入消息并通知会话；清理逻辑收束文本、工具与快照状态。权限拒绝是否终止继续循环还受配置影响，因此不能将“请求了权限”概括成固定行为。

README 提供 build 与 plan 两种内置 agent，plan 默认拒绝文件编辑并对 Bash 请求许可。这个产品配置与操作系统沙箱不是同一层；本轮没有审计完整权限实现，也没有验证所有工具路径都经过相同限制。[README](https://github.com/anomalyco/opencode/blob/687664c63b2bb4eb9b9c7e0dc37227869282ed80/README.md)

**我们的判断：**相比 [[pi-agent-harness|pi 的核心循环]]，OpenCode 适合研究“可用的编码工具还需要哪些状态与错误处理”；相比 [[deepseek-harness|DSH]]，本页证据主要呈现具体产品执行路径，不能据此给出全局扩展性排名。

本轮完整读取 README 与 `processor.ts`，静态阅读 `prompt.ts` 1072–1348 行，其余部分只是保留同一文件快照；没有运行 OpenCode，没有全面核查数据库、UI、权限、工具注册或文件恢复实现。

## 归档与阅读范围

原始字节与 SHA-256 已登记在 `graph/acquisitions.jsonl`；读取于 2026-10-08。下表保留实际文件路径，便于继续核查。

| 原始资料 | 本地快照 |
| --- | --- |
| [README.md](https://github.com/anomalyco/opencode/blob/687664c63b2bb4eb9b9c7e0dc37227869282ed80/README.md) | `raw/opencode-readme-2026-10-08-400890a3082e.md` |
| [packages/opencode/src/session/processor.ts](https://github.com/anomalyco/opencode/blob/687664c63b2bb4eb9b9c7e0dc37227869282ed80/packages/opencode/src/session/processor.ts) | `raw/opencode-processor-2026-10-08-0b31e207beda.ts` |
| [packages/opencode/src/session/prompt.ts](https://github.com/anomalyco/opencode/blob/687664c63b2bb4eb9b9c7e0dc37227869282ed80/packages/opencode/src/session/prompt.ts) | `raw/opencode-prompt-2026-10-08-f0c5bc64c0f0.ts` |

关联：[[AgentHarness|Agent Harness 基础]]、[[topics/agent-execution|Agent Systems]]。

源码阅读缓存：`graph/extracts/opencode-processor-2026-10-08-0b31e207beda.md`、`graph/extracts/opencode-prompt-2026-10-08-f0c5bc64c0f0.md`。
