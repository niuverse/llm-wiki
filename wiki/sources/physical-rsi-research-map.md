---
title: Physical RSI 作者资料库：执行更新与改进程序更新的区分
nav_title: Physical RSI 研究框架
type: source
source_type: repository
tags: [robotics, embodied-ai, source-backed]
sources: []
modified: '2026-10-15'
source_file: raw/physical-rsi-research-map-2026-10-15-0a03f42f2ac6.md
source_kind: markdown
source_url: https://raw.githubusercontent.com/SAIL-Research-Lab/Physical-RSI/8ea92d4152e3e22c6143155b5ff8a68ded5c8461/README.md
source_date: '2026-10-15'
source_version: 8ea92d4152e3e22c6143155b5ff8a68ded5c8461
snapshot_sha256: 0a03f42f2ac69e5a2ba37f09c6ae2bdf99ab96d483e14cb1242115f5ba8bd6b3
acquired: '2026-10-15'
topics: [topics/robot-harness-and-physical-rsi, topics/agent-execution]
---

# Physical RSI 作者资料库

## 来源与阅读范围

完整阅读 [SAIL-Research-Lab/Physical-RSI 的 README](https://github.com/SAIL-Research-Lab/Physical-RSI/blob/8ea92d4152e3e22c6143155b5ff8a68ded5c8461/README.md)，固定提交 `8ea92d4152e3e22c6143155b5ff8a68ded5c8461`，提交日期 2026-10-15。归档是原始 Markdown。它是作者维护的研究框架与资料目录，**不是本地已精读的综述论文，也不是机器人实现或独立评测**。目录中数百项引用的结果没有随之获得本库的证据资格。

对应论文 *Who Improves the Robot? Toward Physical Recursive Self-Improvement*（arXiv:2610.18842）本轮只核实入口，全文深读保留为候选。README 提及作者稿 v35，不应把这个内部修订号自动等同 arXiv 版本号。

## 来源提出的区分

执行系统 $M=(\Theta,H)$ 包括模型参数 $\Theta$ 与 Harness $H$；改进程序 $\Phi=(Adapt,Train,Ver)$ 包括系统适配、训练和验收。任务表现改善，并不自动说明生成未来更新的程序更有效。真实交互还必须在选择或保留程序改变时起因果作用，才能满足这里采用的 Physical RSI 口径。

README 的 L0–L5 分类同时观察更新对象与迁移范围：L0 没有自主保留更新的闭环；L1／L3 为执行系统的更新在同任务／跨任务受益；L2／L4 为改进程序更新在同任务／跨任务被继承使用；L5 进一步要求连续程序修订在匹配资源、受保护的跨任务评测下提高后续改进效果。**这是该作者组的框架，不是全领域统一分级标准，也不是只看论文名称就能赋予的等级。** 新场景不自动代表新任务。

## 目录怎样使用

目录按记忆、技能与工具、工作流、恢复、训练数据、在线学习、程序优化、验证、安全及评测组织候选。它适合找缺口和回溯原文；条目被列入不能证明满足 RSI，文中也明确反对拿“autonomous”“self-improving”等标签当作证据。特别是同一循环反复收数据、微调或恢复动作，是否改动更新生成／评价／选择机制，需要返回各论文核查。

本库将其区分用于 [[PhysicalRecursiveSelfImprovement|Physical RSI 概念]]，并用独立读过的 [[embodirsi-data-efficient-robot-adaptation|EmbodiRSI]]、[[physevo-physical-recursive-self-improvement|PhysEvo]] 和 [[enpire-agentic-robot-policy-self-improvement|ENPIRE]] 讨论实际证据，而不复制整份目录成为另一套知识导航。

## 尚待补证

README 提出六类问题：从有噪声的真实反馈学习；分辨多个 Harness 改动的因果贡献；处理系统和物理环境的非平稳性；控制奖励投机与评测泄漏；随更新重新核查约束；从相同起点和经验、匹配任务与预算比较连续改进程序。这些是研究议程，不是已解决的能力。原文框架的详细论证及各项分级仍需完整论文阅读。
