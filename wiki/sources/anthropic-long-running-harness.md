---
title: "Anthropic：跨上下文窗口的任务交接"
nav_title: "Anthropic"
type: source
tags: [agents, source-backed]
sources: []
modified: 2026-10-08
source_file: raw/anthropic-long-running-anthropic-long-running-2026-10-08-c15405d8eaa9.html
source_kind: html
source_type: article
source_url: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
source_date: 2025-11-26
source_version: "2025-11-26"
topics: ["topics/agent-execution"]
extracted_text: graph/extracts/anthropic-long-running-anthropic-long-running-2026-10-08-c15405d8eaa9.md
---

# Anthropic：跨上下文窗口的任务交接

Justin Young 的官方工程文章（2025-11-26）讨论的是：模型换了上下文窗口后，怎样知道项目做到了哪里，并继续完成尚未完成的功能。它基于 Claude Agent SDK 的 Web 应用开发实验，不是 SDK 内部源码解析。[原文](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

## 设计机制

首次运行准备功能清单、环境启动方式、进度文件与初始版本记录；后续运行先读取交接资料、验证已有功能，再完成一个小目标并留下可继续的状态。清单描述可检验的结果，进度说明当前做了什么，版本记录保存代码变化；单纯压缩聊天不能替代三者。

这里的 initializer 与 coding agent 主要区别是最初用户提示，原文脚注明确其系统提示、工具和总体 harness 相同，不能据此声称实现了两个不同的运行时。

## 证据与启发

文章报告的问题包括一次做太多、过早宣布完成、缺少端到端验证；方案强调逐项推进和实际验收。它是特定 Web 开发设置中的经验，没有给出可支持跨框架排名的统一评测。本库未运行配套示例。

**我们的解释：**用于知识库维护时，可借鉴“先读当前内容、完成一项有证据的更新、记下变化与未解问题”。现有页面与 [[log|日志]] 已能承载交接，无需再建立一套抽象学习路径。效果仍需用真实维护任务验证。

## 归档与阅读范围

原始字节与 SHA-256 已登记在 `graph/acquisitions.jsonl`；读取于 2026-10-08。下表保留实际文件路径，便于继续核查。

| 原始资料 | 本地快照 |
| --- | --- |
| [anthropic-long-running.html](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | `raw/anthropic-long-running-anthropic-long-running-2026-10-08-c15405d8eaa9.html` |

关联：[[AgentHarness|Agent Harness 基础]]、[[topics/agent-execution|Agent Systems]]。
