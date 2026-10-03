---
title: "机器人策略学习"
type: "topic"
tags: ["robotics", "source-backed"]
sources: ["[[pi07-steerable-generalist-robotic-foundation-model]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining]]", "[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots]]"]
modified: "2026-10-04"
entry: "research"
nav_order: 2
description: "策略学习关注如何把观测与任务条件变成动作，以及数据、监督和优化怎样决定学到的行为。按学习目标与信息接口串联论文，比按模型名称堆列表更容易比较。"
---

# 机器人策略学习

策略学习关注如何把观测与任务条件变成动作，以及数据、监督和优化怎样决定学到的行为。按学习目标与信息接口串联论文，比按模型名称堆列表更容易比较。

## 阅读地图

- **动作从哪里来。** [[VisionLanguageActionModels|视觉—语言—动作模型]] 解释观测、语言、动作块和闭环执行；[[RobotLearningObjectives|机器人学习目标]] 区分示范、回报与动力学监督。
- **未来怎样帮助动作。** [[topics/future-conditioned-action|未来条件动作学习]] 比较 [[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation|Seer]]、[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|DeFI]]、[[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]]，共同基础见 [[InverseDynamicsModels|逆动力学]]。
- **任务条件与组合。** [[RobotContextConditioning|机器人上下文条件化]] 与 [[CompositionalGeneralizationInRobotics|组合泛化]] 解释指令、子目标和新任务的不同含义，论文实例见 [[pi07-steerable-generalist-robotic-foundation-model|π0.7]]。
- **数据组织。** [[RobotLearningDataComposition|机器人学习数据构成]] 连接质量、覆盖和训练阶段；[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]] 提供特定协议下的比较。
- **训练怎样执行。** [[topics/robot-learning-systems|有效学习效率]] 讨论采集和学习器协作，别把物理吞吐量直接当成策略质量。

## 当前理解

动作标签、无动作视频、奖励和任务条件承担不同监督角色。DeFI 的无标签逆模型预训练仍需动作适配；LDA 按数据质量分配目标；π0.7 的任务条件与子目标影响策略行为。上述证据分别由 [[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|DeFI]]、[[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]]、[[pi07-steerable-generalist-robotic-foundation-model|π0.7]] 支持，不应汇成无需说明数据条件的能力榜。

## 未解问题与优先补证

固定数据和计算预算时，表示、目标函数与动作参数化各贡献多少？组合泛化的测试是否已经含有低层任务经验或测试指导？定义与协议沿 [[topics/evaluation-and-transfer|评测与现实迁移]] 检查。需要补基础时使用 [[robot-learning-and-evaluation-learning-path|机器人学习路径]]。
