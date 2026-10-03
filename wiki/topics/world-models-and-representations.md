---
title: "世界模型与表征"
type: "topic"
tags: ["world-models", "source-backed"]
sources: ["[[planet-learning-latent-dynamics]]", "[[dreamerv3-mastering-diverse-control]]", "[[dino-wm-pretrained-visual-features]]", "[[v-jepa-2-understanding-prediction-planning]]"]
modified: "2026-10-04"
entry: "research"
nav_order: 1
description: "世界模型研究怎样从观测构造可预测的状态，以及预测怎样服务后续决策。这里沿“表示保留什么—怎样学动力学—预测如何被使用”阅读，而不将所有视频生成或机器人策略视为同一种模型。"
---

# 世界模型与表征

世界模型研究怎样从观测构造可预测的状态，以及预测怎样服务后续决策。这里沿“表示保留什么—怎样学动力学—预测如何被使用”阅读，而不将所有视频生成或机器人策略视为同一种模型。

## 阅读地图

- **表示与状态。** 从 [[LatentStateSpaceModels|潜在状态空间模型]] 理解观测、记忆与隐藏状态的区别；再比较 [[dino-wm-pretrained-visual-features|DINO-WM]] 的冻结图像块表示与 [[v-jepa-2-understanding-prediction-planning|V-JEPA 2]] 的视频预测表示。空间信息、时间信息、控制信息分别来自哪里？
- **动力学与训练信号。** [[planet-learning-latent-dynamics|PlaNet]] 联合学习观测和奖励，[[td-mpc2-scalable-robust-world-models|TD-MPC2]] 保留决策相关预测；二者的模型用途不同。分类机制见 [[WorldModelTaxonomy|世界模型分类]]。
- **预测进入决策。** 沿 [[topics/world-model-decision|世界模型如何用于决策]] 比较在线动作搜索和想象策略学习；完整控制回路见 [[topics/planning-and-control|规划与控制]]。
- **预测进入策略训练。** [[topics/future-conditioned-action|未来预测怎样帮助动作学习]] 连接正向预测、逆向动作与上下文条件，另见 [[topics/robot-policy-learning|机器人策略学习]]。
- **验证表示的用途。** [[topics/world-model-evaluation|如何验证动作后果]] 区分重建质量、动作遵循与闭环任务表现。

## 当前理解

预测对象相似不代表训练监督或执行接口相同。PlaNet 在潜在状态中搜索动作；Dreamer 以想象数据训练策略；DINO-WM 与 V-JEPA 2-AC 以目标表征距离规划。各路线的具体证据见 [[planet-learning-latent-dynamics|PlaNet]]、[[dreamerv3-mastering-diverse-control|Dreamer]]、[[dino-wm-pretrained-visual-features|DINO-WM]] 和 [[v-jepa-2-understanding-prediction-planning|V-JEPA 2]]。这个地图按信息与决策接口组织它们，属于我们的研究视角。

## 未解问题与优先补证

怎样检验表示保留的变量足以支撑控制，而不只预测常见视觉变化？新动作和新接触条件下的误差如何影响规划？具体对照任务与预算问题见 [[topics/world-model-evaluation#未解问题与优先补证|动作后果评估]]。基础学习顺序见 [[world-models-learning-path|世界模型学习路径]]。
