---
title: "World Models"
type: "topic"
tags: ["world-models", "source-backed"]
sources: ["[[planet-learning-latent-dynamics]]", "[[dreamerv3-mastering-diverse-control]]", "[[dino-wm-pretrained-visual-features]]", "[[v-jepa-2-understanding-prediction-planning]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation]]", "[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining]]", "[[td-mpc2-scalable-robust-world-models]]", "[[worldecho-worldsync-action-following]]"]
modified: "2026-10-08"
entry: "research"
nav_order: 1
description: "表征、动力学预测与机器人决策"
---

# World Models

世界模型研究怎样从观测构造可预测的状态，以及预测怎样服务后续决策。这里沿“表示保留什么—怎样学动力学—预测如何被使用”阅读，而不将所有视频生成或机器人策略视为同一种模型。

## 核心问题

理解世界模型时，可以先分清三个对象：观测历史怎样形成状态，状态怎样随动作变化，预测怎样影响决策。[[LatentStateSpaceModels|Latent State-Space Models]] 解释前两者的联系，[[ModelPredictiveControl|MPC]] 解释怎样用预测选择动作，[[planet-learning-latent-dynamics|PlaNet]] 给出完整实例。

## 带着问题研究

| 我想弄清楚 | 从哪里开始 | 阅读时抓住什么 |
| --- | --- | --- |
| 表示保留了哪些信息？ | [[LatentStateSpaceModels|状态估计基础]]；再对照 [[dino-wm-pretrained-visual-features|DINO-WM]] 与 [[v-jepa-2-understanding-prediction-planning|V-JEPA 2]] | 空间、时间和控制所需的信息分别来自哪里 |
| 模型究竟学什么？ | [[WorldModelTaxonomy|世界模型分类]]；再对照 [[planet-learning-latent-dynamics|PlaNet]] 与 [[td-mpc2-scalable-robust-world-models|TD-MPC2]] | 预测对象、训练监督和后续用途是否一致 |
| 预测怎样变成动作？ | [[topics/world-model-decision|World Models 与决策]] | 执行时搜索动作，还是训练时学习策略；完整控制回路见 [[topics/planning-and-control|规划与控制]] |
| 未来信息怎样帮助训练？ | [[topics/future-conditioned-action|未来预测与动作学习]] | 未来是监督、表示还是策略条件；相关学习问题见 [[topics/robot-policy-learning|机器人策略学习]] |
| 怎样证明预测有用？ | [[topics/world-model-evaluation|如何验证动作后果]] | 分开看视觉质量、动作遵循与闭环任务表现 |

专题持续汇总方法比较、现有证据与未解问题；需要核对具体实现或实验时，再沿专题进入来源页。

## 当前理解

预测对象相似不代表训练监督或执行接口相同。PlaNet 在潜在状态中搜索动作；Dreamer 以想象数据训练策略；DINO-WM 与 V-JEPA 2-AC 以目标表征距离规划。各路线的具体证据见 [[planet-learning-latent-dynamics|PlaNet]]、[[dreamerv3-mastering-diverse-control|Dreamer]]、[[dino-wm-pretrained-visual-features|DINO-WM]] 和 [[v-jepa-2-understanding-prediction-planning|V-JEPA 2]]。这个地图按信息与决策接口组织它们，属于我们的研究视角。

## 例子：预测相似，动作也应该相似吗？

思考一个例子：给定同一张“夹爪靠近杯子”的图像，分别输入“继续靠近”和“后退”两段动作。如果预测几乎相同，应检查动作条件化、数据覆盖与评估中的哪些部分？如果视频很好而抓取成功率没变，问题可能位于哪个决策接口？答案线索见 [[WorldModelsForEmbodiedAI|世界模型机制]] 与 [[WorldModelEvaluation|评估层次]]。

再比较两种实现：一种每次搜索未来动作；另一种只在训练中展开模型，执行时用策略出动作。为它们分别列训练成本、执行成本、模型更新后的适应方式，避免用一个“模型大小”数字判断实时控制能力。

## 容易混淆的结论

RSSM、MPC、想象策略、视觉目标规划与动作遵循评估均有原文入口。复习时保留三条区别：Dreamer 的统一配置在任务间分别训练，不代表同一权重覆盖所有领域；V-JEPA 2-AC 的视觉目标规划有动作数据与预设子目标切换，不代表自主任务分解；DINO-WM 的离线基线改变了 Dreamer／TD-MPC2 的原在线设置。各论文任务、奖励、数据和预算不一致，不能直接拼成排名。[[dreamerv3-mastering-diverse-control|Dreamer]]、[[v-jepa-2-understanding-prediction-planning|V-JEPA 2]]、[[dino-wm-pretrained-visual-features|DINO-WM]]

## 未解问题与优先补证

怎样检验表示保留的变量足以支撑控制，而不只预测常见视觉变化？新动作和新接触条件下的误差如何影响规划？具体对照任务与预算问题见 [[topics/world-model-evaluation#未解问题与优先补证|动作后果评估]]。
