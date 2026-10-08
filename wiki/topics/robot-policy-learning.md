---
title: "机器人策略学习"
type: "topic"
tags: ["robotics", "source-backed"]
sources: ["[[pi07-steerable-generalist-robotic-foundation-model]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining]]", "[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots]]", "[[simex-simulation-integrated-robotics-autoresearch]]", "[[kpi-promptable-kernel-physical-interaction]]", "[[dexweave-dexterous-humanoid-loco-manipulation]]", "[[rho-efficiently-adaptable-vla-models]]"]
modified: 2026-10-08
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
- **通过实验修改代码技能。** [[simex-simulation-integrated-robotics-autoresearch|SimEX]] 持久保存感知控制代码与使用说明，先仿真探索、再用少量真机反馈筛选修复；每次任务重新生成程序，其改进对象与模型权重训练不同。
- **数据组织。** [[RobotLearningDataComposition|机器人学习数据构成]] 连接质量、覆盖和训练阶段；[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]] 提供特定协议下的比较。
- **训练怎样执行。** [[topics/robot-learning-systems|有效学习效率]] 讨论采集和学习器协作，别把物理吞吐量直接当成策略质量。

## 当前理解

动作标签、无动作视频、奖励和任务条件承担不同监督角色。DeFI 的无标签逆模型预训练仍需动作适配；LDA 按数据质量分配目标；π0.7 的任务条件与子目标影响策略行为。上述证据分别由 [[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|DeFI]]、[[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]]、[[pi07-steerable-generalist-robotic-foundation-model|π0.7]] 支持，不应汇成无需说明数据条件的能力榜。

## 四种可改进的对象

| 来源 | 改进对象与反馈 | 阅读或验证建议 |
| --- | --- | --- |
| [[simex-simulation-integrated-robotics-autoresearch|SimEX]] | 仿真实验与真实失败驱动工具代码修复 | 读：关注工具持久化、实验记录与候选修复筛选 |
| [[kpi-promptable-kernel-physical-interaction|KPI]] | 交互约定和估计力驱动高速控制参数调整 | 读：关注方向性顺应和力范围接口；局部预测不等于硬保证 |
| [[dexweave-dexterous-humanoid-loco-manipulation|DexWeave]] | 人体参考驱动接触重定向与每参考策略训练 | 读并关注实现：先确认物体状态与参考接口，再比较结构化注意力 |
| [[rho-efficiently-adaptable-vla-models|Rho]] | 多阶段权重学习，在线只调整潜在策略 | 试：按 [[rho-release-documentation|固定版本文档]] 先做40回合链路验证 |

这一比较按“改什么、何时反馈”组织，不把硬件试验、轨迹跟踪完成率和有在线纠正的基准成绩放在同一排行榜。表内建议是本库的阅读判断；实验依据和边界在各来源页。

## 未解问题与优先补证

固定数据和计算预算时，表示、目标函数与动作参数化各贡献多少？组合泛化的测试是否已经含有低层任务经验或测试指导？定义与协议沿 [[topics/evaluation-and-transfer|评测与现实迁移]] 检查。需要补基础时使用 [[robot-learning-and-evaluation-learning-path|机器人学习路径]]。
