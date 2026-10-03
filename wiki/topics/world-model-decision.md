---
title: "世界模型如何用于决策"
type: "topic"
tags: ["world-models", "source-backed"]
sources: ["[[planet-learning-latent-dynamics]]", "[[dreamerv3-mastering-diverse-control]]", "[[td-mpc2-scalable-robust-world-models]]", "[[dino-wm-pretrained-visual-features]]", "[[v-jepa-2-understanding-prediction-planning]]"]
modified: "2026-10-04"
description: "预测可在执行时规划或训练时学策略；现有证据不支持跨协议统一排名。"
---

# 世界模型如何用于决策

比较执行时规划与训练时想象，区分奖励、视觉目标和计算预算。

## 方法与证据

| 路线 | 方法如何产生动作 | 比较时必须对齐 |
| --- | --- | --- |
| [[planet-learning-latent-dynamics|PlaNet]] | 在 RSSM 中预测奖励，用 CEM 搜索，执行首个动作后重规划 | 图像观测、在线交互回合数、动作重复与搜索预算 |
| [[td-mpc2-scalable-robust-world-models|TD-MPC2]] | 用奖励与价值约束潜在模型，以终端价值补有限时域 | 任务输入、训练数据、模型规模与基线版本 |
| [[dreamerv3-mastering-diverse-control|DreamerV3]] | 在想象轨迹中学习策略，执行时直接输出动作 | 逐任务训练还是共享权重、重放量、基准与算力 |
| [[dino-wm-pretrained-visual-features|DINO-WM]]、[[v-jepa-2-understanding-prediction-planning|V-JEPA 2-AC]] | 预测视觉表征，以目标图像驱动动作搜索 | 离线覆盖、动作标签、目标形式、完整规划延迟 |

**当前判断：**预测影响决策的环节不同，在线搜索成本和策略训练成本必须分别比较。上述论文没有提供同数据、同预算的完整路线排名。

## 支撑资料

- [[planet-learning-latent-dynamics|PlaNet：从像素学习潜在动力学并规划]]
- [[dreamerv3-mastering-diverse-control|DreamerV3：在想象中学习控制策略]]
- [[td-mpc2-scalable-robust-world-models|TD-MPC2：以任务价值学习潜在模型并规划]]
- [[dino-wm-pretrained-visual-features|DINO-WM：用预训练视觉特征进行目标规划]]
- [[v-jepa-2-understanding-prediction-planning|V-JEPA 2：视频表征怎样接到机器人规划]]

## 机制基础

[[LatentStateSpaceModels|潜在状态空间模型：估计与预测]]、[[ModelPredictiveControl|模型预测控制：预测、优化、执行、重规划]]、[[ImaginedPolicyLearning|想象中的策略学习：世界模型到演员与价值评估器]]、[[VisualGoalPlanning|视觉目标规划：让动作后果接近目标图像]]。

## 未解问题与优先补证

在相同交互数据和总计算预算下，在线搜索与想象策略学习各适合什么条件？模型更新后，重新训练策略和重新规划的代价如何比较？

这些是研究问题与验证要求，尚未作为已有结论。沿 [[topics/world-models-and-representations|世界模型与表征]] 查看相关研究；基础学习可沿 [[world-models-learning-path|学习路径]] 进行。
