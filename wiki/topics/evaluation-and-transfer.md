---
title: "评测与 Sim-to-Real"
type: "topic"
tags: ["robotics", "source-backed"]
sources: ["[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots]]", "[[simopt-adaptive-randomization]]", "[[peng-dynamics-randomization]]", "[[kpi-promptable-kernel-physical-interaction]]", "[[dexweave-dexterous-humanoid-loco-manipulation]]", "[[rho-efficiently-adaptable-vla-models]]", "[[atom-bench-atomic-skills-and-compositional-generalization]]"]
modified: 2026-10-16
entry: "research"
nav_order: 6
description: "评测协议、失败诊断与现实迁移"
---

# 评测与 Sim-to-Real

评测定义我们要测量什么，现实迁移检验仿真和训练中得到的能力是否在硬件上成立。两者交叉于任务分布、观测和控制接口，但评测方法并不自动带来迁移能力。

## 阅读地图

- **定义评测对象。** [[TaskGeneralistPolicyEvaluation|通用任务策略评估]] 与 [[topics/policy-evaluation|数据与泛化判断]] 区分已有能力、目标适应、组合泛化和过程错误；[[AtomicSkillAndCompositionalEvaluation|原子技能与组合泛化评测]] 记录把任务拆成部件、只在部件上适配再测留出组合的做法。
- **设计比较协议。** [[simulation-post-training-evaluation|冻结、适应与真实迁移协议]] 说明哪些预算和数据接触会改变问题；[[RobotLearningDataComposition|数据构成]] 帮助解释训练条件。
- **定位失败因素。** [[SimulationSensitivityAnalysis|仿真敏感性分析]]、[[SimulationBenchmarkReportingPipeline|基准报告]] 连接扰动、成功、过程与轨迹指标。
- **处理环境差异。** [[topics/simulation-transfer|可靠迁移]] 串联 [[DomainRandomization|域随机化]]、[[SystemIdentificationForSimulation|系统辨识]] 与 [[PolicyDeploymentContract|部署约定]]。
- **验证预测系统。** [[topics/world-model-evaluation|动作后果评估]] 将视觉质量、动作遵循与真实控制表现分开；预测方法入口见 [[topics/world-models-and-representations|World Models]]。

## 当前理解

RoboLab 主要使用留出仿真域诊断已有策略；RoboCasa365 研究仿真训练与适应；SimOpt 用真实交互调整随机化分布。它们回答的问题不同，不能凭一个总成功率判定通用优劣。具体协议和限制分别见 [[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab]]、[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]]、[[simopt-adaptive-randomization|SimOpt]]。动力学随机化的观察条件也要明确，见 [[peng-dynamics-randomization|Peng 等的迁移实验]]。

[[atom-bench-atomic-skills-and-compositional-generalization|ATOM-Bench]] 把这组问题放到真机上，并控制策略在适配阶段见过哪些原子技能；它同样说明“部件覆盖”决定了评测结论的可解释范围——留出的是任务组合，物体类别与场景因素仍与训练重叠，因此测的是组合泛化而不是对全新环境的泛化。真机评测的额外代价是人工摆场景、安全监控与手工标注，这些环节使规模与随机化都受限。

近期案例说明成功率必须附带终止与适应条件：[[dexweave-dexterous-humanoid-loco-manipulation|DexWeave]] 的完成率针对参考片段，[[rho-efficiently-adaptable-vla-models|Rho]] 的 LIBERO 主成绩包含在线专家纠正，而 [[kpi-promptable-kernel-physical-interaction|KPI]] 的15次硬件试验仅覆盖三项选定任务。比较前先列明训练数据、测试期间反馈、动作执行块长和总预算。

## 未解问题与优先补证

怎样在多个策略与任务上检验仿真诊断是否预测现实失败？迁移收益究竟来自参数覆盖、接口校准还是额外真实数据？优先补证与候选材料分别维护在 [[topics/policy-evaluation#未解问题与优先补证|评测协议]] 和 [[topics/simulation-transfer#未解问题与优先补证|迁移机制]]。
