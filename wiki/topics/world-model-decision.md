---
title: "World Models 与决策"
type: "topic"
tags: ["world-models", "source-backed"]
sources: ["[[planet-learning-latent-dynamics]]", "[[dreamerv3-mastering-diverse-control]]", "[[td-mpc2-scalable-robust-world-models]]", "[[dino-wm-pretrained-visual-features]]", "[[v-jepa-2-understanding-prediction-planning]]"]
modified: "2026-10-08"
description: "预测可在执行时规划或训练时学策略；现有证据不支持跨协议统一排名。"
---

# World Models 与决策

这个专题回答：已经能预测未来之后，机器人怎样据此选择动作？先区分预测发生在训练还是执行阶段，再比较奖励、视觉目标与计算预算。状态估计与控制基础分别见 [[LatentStateSpaceModels|Latent State-Space Models]] 和 [[ModelPredictiveControl|MPC]]。

## 当前认识

**预测可以在执行时参与动作搜索，也可以在训练时用于学习策略。** [[planet-learning-latent-dynamics|PlaNet]]、[[td-mpc2-scalable-robust-world-models|TD-MPC2]] 把预测接到在线规划；[[dreamerv3-mastering-diverse-control|DreamerV3]] 在想象轨迹中训练策略，执行时由策略输出动作；[[dino-wm-pretrained-visual-features|DINO-WM]] 与 [[v-jepa-2-understanding-prediction-planning|V-JEPA 2-AC]] 用视觉目标驱动搜索。因此比较时要分别记录训练成本与在线决策成本，现有来源不能给出同数据、同预算的完整路线排名。

## 方法与证据

| 路线 | 方法如何产生动作 | 比较时必须对齐 |
| --- | --- | --- |
| [[planet-learning-latent-dynamics|PlaNet]] | 在 RSSM 中预测奖励，用 CEM 搜索，执行首个动作后重规划 | 图像观测、在线交互回合数、动作重复与搜索预算 |
| [[td-mpc2-scalable-robust-world-models|TD-MPC2]] | 用奖励与价值约束潜在模型，以终端价值补有限时域 | 任务输入、训练数据、模型规模与基线版本 |
| [[dreamerv3-mastering-diverse-control|DreamerV3]] | 在想象轨迹中学习策略，执行时直接输出动作 | 逐任务训练还是共享权重、重放量、基准与算力 |
| [[dino-wm-pretrained-visual-features|DINO-WM]]、[[v-jepa-2-understanding-prediction-planning|V-JEPA 2-AC]] | 预测视觉表征，以目标图像驱动动作搜索 | 离线覆盖、动作标签、目标形式、完整规划延迟 |

## 怎样用于自己的研究

下面是依据上述接口差异提出的阅读与实验建议，不是已经验证的通用选型结论。

- **关心执行时的计算预算：**对照 [[planet-learning-latent-dynamics|PlaNet]] 的在线搜索与 [[dreamerv3-mastering-diverse-control|DreamerV3]] 的策略执行，分别列训练和执行要做的计算；不能只用模型参数量判断部署成本。
- **任务以目标图像描述：**先查 [[dino-wm-pretrained-visual-features|DINO-WM]] 与 [[v-jepa-2-understanding-prediction-planning|V-JEPA 2-AC]] 的目标接口、动作数据和规划预算，再判断是否符合自己的任务设置。
- **想证明新模型更有效：**先对齐数据、观测、目标和总预算，再看闭环任务；详细评测问题进入 [[topics/world-model-evaluation|动作后果评估专题]]。

例如想比较“每次重新搜索动作”和“直接调用学好的策略”，应先为同一任务列出两条完整执行过程，再核对训练与测试条件。这个例子用于组织对照，不预设哪条路线更好。

## 支撑资料

- [[planet-learning-latent-dynamics|PlaNet：从像素学习潜在动力学并规划]]
- [[dreamerv3-mastering-diverse-control|DreamerV3：在想象中学习控制策略]]
- [[td-mpc2-scalable-robust-world-models|TD-MPC2：以任务价值学习潜在模型并规划]]
- [[dino-wm-pretrained-visual-features|DINO-WM：用预训练视觉特征进行目标规划]]
- [[v-jepa-2-understanding-prediction-planning|V-JEPA 2：视频表征怎样接到机器人规划]]

## 机制基础

[[LatentStateSpaceModels|Latent State-Space Models]]、[[ModelPredictiveControl|Model Predictive Control (MPC)]]、[[ImaginedPolicyLearning|Imagination-based Policy Learning]]、[[VisualGoalPlanning|Visual Goal Planning]]。

## 未解问题与优先补证

在相同交互数据和总计算预算下，在线搜索与想象策略学习各适合什么条件？模型更新后，重新训练策略和重新规划的代价如何比较？

这些是研究问题与验证要求，尚未作为已有结论。沿 [[topics/world-models-and-representations|World Models]] 查看相关研究。
