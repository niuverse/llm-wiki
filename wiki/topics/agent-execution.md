---
title: "Agent Systems"
type: topic
entry: tools
nav_order: 1
tags: [agents, source-backed]
sources: ["[[deepseek-harness]]", "[[pi-agent-harness]]", "[[opencode-harness]]", "[[langgraph-persistence]]", "[[anthropic-long-running-harness]]", "[[anthropic-managed-agents]]", "[[agentsserver]]", "[[agentsdock-releases]]"]
modified: 2026-10-08
description: "从工具循环理解上下文、会话恢复与框架设计。"
---

# Agent Systems

这里研究模型如何持续完成实际工作。本轮重点是 Agent Harness：工具怎么执行、上下文怎么整理、状态怎么保存，以及中断后怎样继续。基础解释集中在 [[AgentHarness|Agent Harness]]；具体实现沿下面的来源读，不再另建学习路径。

## 几种设计在解决什么问题

下面是依据官方文档与固定源码整理的比较，不是性能排名。“适合研究”表示我们建议的阅读切入点，不代表某个系统只能做这一件事。

| 实现／资料 | 核心组织方式 | 适合研究什么 | 当前证据边界 |
| --- | --- | --- | --- |
| [[pi-agent-harness|pi agent-core／coding-agent]] | 工具循环、钩子、分支会话 | 从一轮模型调用读到工具结果，理解最小可扩展循环 | 核心循环静态核查；应用会话依据文档 |
| [[deepseek-harness|DeepSeek Harness]] | Cordis 插件树、服务接口、事件日志 | 替换能力而不修改循环，以及请求如何从日志重建 | alpha 固定版本；流记录、工具调度和重试局部核查 |
| [[opencode-harness|OpenCode]] | 编码任务的会话循环与流处理器 | 工具状态、文件快照、错误、压缩与停止条件怎样配合 | dev 固定提交；非全产品审计 |
| [[langgraph-persistence|LangGraph]] | 状态图与 Checkpoints | 明确的节点边界、人工等待、失败恢复和重新执行 | 官方文档为主；没有数据库故障实验 |
| [[pi-agent-harness|pi-durable]] | 原子提交、持久任务、任务所有权 | 模型与工具执行也参与恢复，怎样处理不安全重试 | 实验包文档；不能当成普通 CLI 默认实现 |
| [[anthropic-long-running-harness|Anthropic 长任务方案]] | 环境初始化、逐项推进、验证与交接 | 一个任务跨多个上下文窗口如何保持进度 | Web 开发工程经验；非 SDK 内核解析 |
| [[anthropic-managed-agents|Anthropic Managed Agents]] | 会话、harness、sandbox 分离 | 三种生命周期怎样分别失败和重建 | 官方架构文章；无服务端代码核验 |

**当前判断：**这些系统并不处于完全相同的层级。LangGraph 可以承载一个模型循环；一个完整编码工具也可以把底层循环封装起来。多 agent、MCP、插件和持久化各解决不同问题，不应混成一张“功能越多越先进”的榜单。

## 用同一个例子看懂差异

任务是“读取配置、修改、测试；中途退出后继续”。这是教学分析，不是本轮运行过的实验。

- 在 **pi agent-core** 中，重点看 `runLoop` 如何把结果交回模型、何时轮询 steering、何时检查 follow-up。会话树与压缩由 coding-agent 应用层补充；实验 pi-durable 则进一步记录持久任务。
- 在 **DSH** 中，先看 profile 装了哪些插件，再看一条输入怎样变成 step。两个独立读取可以并行；修改与测试的依赖不能靠日志排序自动解决。重启时需要分清已结算记录和尚未落盘的实时流。
- 在 **OpenCode** 中，追踪外层 prompt 循环与 processor：先取正确的文件基线，更新工具状态，再决定继续、压缩或结束。界面显示完成与工作真的完成仍需测试结果支持。
- 在 **LangGraph** 中，可把读取、修改、测试组织成状态节点；用检查点保存进度。但外部写入成功而节点结果尚未保存时，仍需处理重复执行，不能把图状态恢复等同于整个工作区回滚。

每项的函数、版本和证据都在对应来源页。共享原理见 [[AgentHarness#最重要的区别：历史、上下文、执行状态|三类状态]]与 [[AgentHarness#中断后继续，为什么比保存 JSON 难|恢复边界]]。

## 系统性学习应该能回答哪些具体问题

不靠记框架名检验理解，可以直接用下面几个小问题检查。右列是预期的机制解释，不是已经完成的实验记录。

| 问题／小实验 | 应能说明什么 |
| --- | --- |
| 把一个工具输出从 10 行改成 10 万行 | 谁截断、谁保存原文、谁计量上下文，摘要后怎样找回精确证据 |
| 让两个读取一快一慢，再加一个文件修改 | 执行顺序、完成事件、持久消息顺序为何可能不同 |
| 工具执行一半时输入新要求 | 是取消当前操作、在下一轮调整，还是原工作结束后再处理 |
| 在工具已写文件、尚未保存结果时退出 | 哪个状态丢了，重试会不会重复修改，怎样判定操作结果 |
| 从某条历史消息分支 | 复用了哪些消息，工作区是否也回到当时，外部 API 是否会再调用 |
| 连续三次调用同一失败工具 | 是输入问题、环境问题还是无进展循环，谁决定停止 |

读代码时可以先在 [[pi-agent-harness|pi]] 找到小循环，再到 [[deepseek-harness|DSH]] 看能力替换，接着以 [[opencode-harness|OpenCode]] 和 [[langgraph-persistence|LangGraph]] 对照产品状态与恢复边界。解释直接保存在这些页面中；做实验时补实际结果，不再复制一套课程进度表。

## 对当前知识库有什么启发

以下是基于本轮资料的设计建议：继续保持 `raw → Sources → Concepts／Topics` 的简单结构，日志记录实际知识变化。Agent Harness 的会话日志用于恢复执行，[[log|知识库日志]]用于让人理解内容演变，两者职责不同，没必要互相替代。

如果以后用 agent 自动维护知识，优先落实一条可验收闭环：定位相关旧页 → 完整读证据 → 更新判断与引用 → 运行检查 → 记录变更。只有真实任务反复出现中断丢进度、权限失控或无法确认完成时，再增加对应运行机制。[[anthropic-long-running-harness|任务交接]]提供经验，[[anthropic-managed-agents|职责分离]]提供架构理由；它们不能直接证明自动研究的事实质量。

已有 [[agentsserver|AgentsServer]] 负责连接客户端与本机执行后端，[[agentsdock-releases|AgentsDock]] 提供客户端发布资料。它们与本轮的循环和状态研究相邻，但不是同一层的替代产品。

## 未解问题与优先补证

- **实际故障恢复：**给 DSH、pi 与 OpenCode 使用同一个小任务，在请求中、工具后、结果保存前分别中断，确认记录和文件真实留下了什么；本轮只有静态核查。
- **pi 的新旧路径：**实验 pi-durable 与 coding-agent 的集成程度、迁移方式及持久格式兼容，需要继续核查实现；不将实验设计当作已稳定默认行为。
- **更多主流实现：**Codex、Claude Agent SDK 和 Deep Agents 的核心循环、权限与恢复接口尚未在本轮收录；Anthropic 的两篇架构文章不能替代 SDK 实现研究。
- **DSH 的深层机制：**Cordis 形式化论文，以及 goal、subagent、workflow、插件卸载和状态迁移，仍需独立完整阅读；旧讨论中的公式和结论未直接沿用。
- **效果如何比较：**固定模型、任务、工具、预算和执行环境，记录完成率、人工干预、token／时间、恢复后重复操作。当前来源不足以给框架做可靠性或成本排名。
