---
title: "Anthropic Managed Agents：分离会话、循环与执行环境"
nav_title: "Anthropic Managed Agents"
type: source
tags: [agents, source-backed]
sources: []
modified: 2026-10-08
source_file: raw/anthropic-managed-anthropic-managed-2026-10-08-d886ceae967e.html
source_kind: html
source_type: article
source_url: https://www.anthropic.com/engineering/managed-agents
source_date: 2026-04-08
source_version: "2026-04-08"
topics: ["topics/agent-execution"]
extracted_text: graph/extracts/anthropic-managed-anthropic-managed-2026-10-08-d886ceae967e.md
---

# Anthropic Managed Agents：分离会话、循环与执行环境

Lance Martin、Gabe Cemaj、Michael Cohen 的官方工程文章（2026-04-08）解释托管长任务系统的职责划分。它是架构说明，不能视为 Claude Code 或 Claude Agent SDK 的完整实现审计。[原文](https://www.anthropic.com/engineering/managed-agents)

## 从同一容器拆出三种生命周期

文章将持久会话日志、驱动模型的 harness、执行代码的 sandbox 分离。执行环境失败通过工具错误反馈；驱动进程失败后可由新实例读取外部日志继续。上下文窗口只是从日志选出的本轮输入，不承担保存全部历史的职责。

这样做还允许按需准备执行环境，并把外部服务凭据交给隔离的代理／存储处理。这里说明设计意图，未核查服务端代码或独立验证其安全性与性能。

## 对框架比较的意义

**我们的解释：**比较 [[deepseek-harness|DSH]]、[[pi-agent-harness|pi]]、[[langgraph-persistence|LangGraph]] 时，要逐一问会话、执行循环和文件／进程由谁拥有、在哪里保存、失败后谁重建。接口可替换不等于所有外部修改都可回滚；恢复聊天、恢复调度、恢复工作区分别需要证据。

文章还提醒，针对旧模型增加的控制策略可能随模型变化失去价值。对本库的实践含义是：先测具体失败，再决定是否增加多 agent、重置或复杂编排，而不是将组件数量当成成熟度。

## 归档与阅读范围

原始字节与 SHA-256 已登记在 `graph/acquisitions.jsonl`；读取于 2026-10-08。下表保留实际文件路径，便于继续核查。

| 原始资料 | 本地快照 |
| --- | --- |
| [anthropic-managed.html](https://www.anthropic.com/engineering/managed-agents) | `raw/anthropic-managed-anthropic-managed-2026-10-08-d886ceae967e.html` |

关联：[[AgentHarness|Agent Harness 基础]]、[[topics/agent-execution|Agent Systems]]。
