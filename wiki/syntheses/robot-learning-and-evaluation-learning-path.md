---
title: "机器人学习与评测：从目标到可靠结论"
type: synthesis
tags: [robotics, evaluation, learn]
sources: ["[[spinning-up-rl-key-concepts]]", "[[spinning-up-rl-algorithm-taxonomy]]", "[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[nvlabs-robolab]]"]
modified: 2026-10-04
nav_title: "机器人学习与评测"
description: "分清策略、奖励、示范与训练分布，理解 VLA 和仿真训练，再设计能解释泛化与失败的评测。"
topics: ["topics/evaluation-and-transfer", "topics/robot-policy-learning", "topics/physics-simulation", "topics/policy-evaluation", "topics/robot-learning-systems", "topics/simulation-transfer"]
---

# 机器人学习与评测：从目标到可靠结论

这条路径用同一条链连接学习与评测：先定义任务，再选择学习目标与数据，最后检验策略是否在目标条件下工作。具备编程和基础概率知识即可开始；已经熟悉 RL 和模仿学习，可从第三阶段读起。

> 路径、完成标志与练习是教学设计；具体算法和基准结论以链接页中的来源为依据。

## 学习顺序

| 阶段 | 核心问题 | 阅读入口 | 完成标志 |
| --- | --- | --- | --- |
| 1 · 定义任务 | 状态、观测、动作、奖励和成功有什么区别？ | [[MarkovDecisionProcesses|MDP 与强化学习基础]] | 能把一个抓取任务写成交互循环 |
| 2 · 分清学习目标 | 拟合示范动作与最大化回报分别在优化什么？ | [[RobotLearningObjectives|机器人学习目标]] | 能解释训练损失下降为什么不保证闭环成功 |
| 3 · 理解策略与数据 | 语言、上下文、动作块和数据混合如何影响策略？ | [[VisionLanguageActionModels|VLA]] → [[RobotContextConditioning|上下文条件化]] → [[RobotLearningDataComposition|数据构成]] | 能独立记录数据来源、采样权重与训练阶段 |
| 4 · 运行训练系统 | 并行仿真、采样、更新和部署如何衔接？ | [[HeterogeneousRobotRLTraining|异构 RL 训练]] → [[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|人形机器人 RL 工作流]] → [[VisualSimToReal|视觉仿真到现实迁移]] | 能沿采集、训练、导出和执行定位接口问题 |
| 5 · 设计评测 | 高成功率究竟证明了什么？ | [[TaskGeneralistPolicyEvaluation|通用任务策略评估]] → [[SimulationBenchmarkReportingPipeline|统计与报告]] → [[SimulationSensitivityAnalysis|敏感性分析]] | 能区分泛化、适应、置信区间与仿真代理有效性 |

```mermaid
flowchart LR
  A["任务与成功条件"] --> B["示范或交互数据"]
  B --> C["学习目标与训练分布"]
  C --> D["闭环策略"]
  D --> E["分层评测与失败诊断"]
  E --> F["修改数据、目标或接口"]
  F --> B
```

图展示的是研究循环。评测反馈可以指导下一轮开发，但若据此修改策略，就需要明确开发集与最终测试集的职责；当前基准中的训练—评测分层见 [[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]]。

## 研究复习入口

| 想快速判断什么 | 入口 |
| --- | --- |
| 增加合成示范后性能下降 | [[RobotLearningDataComposition|数据构成与梯度占比]] |
| 模型是否真正具备组合泛化 | [[CompositionalGeneralizationInRobotics|组成部分与任务组合]] |
| 是否可以用评测任务数据做后训练 | [[simulation-post-training-evaluation|评测目的与后训练]]，该页含尚未收录资料 |
| 训练很快，但实际回报提升慢 | [[HeterogeneousRobotRLTraining|端到端训练效率]] |
| 成功率相近但失败行为不同 | [[SimulationBenchmarkReportingPipeline|回合证据与统计报告]] |
| 生成视频怎样变成动作示范 | [[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors|资产条件化交互生成]] |

## 读实验时先检查比较条件

[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]] 的两阶段方案优于联合训练，但总更新步数不同；任务覆盖增加时数据量也变了。因此，“阶段安排有效”是完整方案的经验结果，尚不能独立量化顺序或多样性的因果贡献。目标任务微调后的成功也应与未见任务零样本泛化分开。

[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab]] 用固定策略和受控扰动诊断失败，但有限真机对照并非所有策略都一致；固定种子的测试回合不等于独立训练种子。[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab]] 的端到端收益也要连同算法、硬件与视觉负载阅读。教学上应同时记录“比较了什么”和“还没有隔离什么”。

## 写一张实验卡片

这是本次设计的练习：为“在未见厨房中打开抽屉”记录机器人与动作模式、观测、奖励、终态成功条件、训练数据来源、未见因素、训练预算和测试回合数。然后分别设计“冻结策略测试”和“提供少量目标示范后适应”两种实验，写出它们回答的不同问题。用 [[TaskGeneralistPolicyEvaluation|评测概念页]] 核对协议，用 [[RobotLearningDataComposition|数据构成页]] 核对数据分布。

## 覆盖与缺口

已有资料覆盖 RL 基础、VLA、数据构成、仿真训练系统、组合泛化、基准诊断和部署工作流。PPO/SAC 的完整推导、行为克隆分布偏移的系统理论、离线 RL、奖励设计与独立硬件复现仍不完整。数据与评测问题进入 [[topics/policy-evaluation|数据与评测怎样支撑泛化判断]]，系统预算进入 [[topics/robot-learning-systems|训练系统怎样提高有效学习效率]]，硬件验证进入 [[topics/simulation-transfer|仿真策略怎样可靠迁移到现实]]。这些专题维护后续证据需求，[[research-questions|研究问题索引]]只汇总入口；需要理解学得的动力学时，转到 [[world-models-learning-path|世界模型学习路径]]。

## 研究归属

[[topics/evaluation-and-transfer|评测与现实迁移]] · [[topics/robot-policy-learning|机器人策略学习]] · [[topics/physics-simulation|物理仿真]] · [[topics/policy-evaluation|数据与评测怎样支撑泛化判断]] · [[topics/robot-learning-systems|训练系统怎样提高有效学习效率]] · [[topics/simulation-transfer|仿真策略怎样可靠迁移到现实]]。
