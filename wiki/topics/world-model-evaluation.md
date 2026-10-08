---
title: "World Model 评测"
type: "topic"
tags: ["world-models", "source-backed"]
sources: ["[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[worldecho-worldsync-action-following]]", "[[v-jepa-2-understanding-prediction-planning]]", "[[dino-wm-pretrained-visual-features]]"]
modified: "2026-10-04"
description: "分开检验视觉质量、动作遵循和闭环控制收益。"
---

# World Model 评测

分开检验视觉质量、动作遵循和闭环控制收益。

## 方法与证据

[[a-comprehensive-survey-on-world-models-for-embodied-ai|世界模型综述]]提供分类与指标地图；具体能力需追溯到原始实验。[[worldecho-worldsync-action-following|WorldEcho／WorldSync]]把非专家动作遵循与视觉可接受性分开，[[v-jepa-2-understanding-prediction-planning|V-JEPA 2-AC]]提供有限真机闭环，[[dino-wm-pretrained-visual-features|DINO-WM]]考察视觉目标规划。

**当前判断：**视觉质量、动作后果和闭环任务成功是不同证据。末端位姿误差不能代替物体状态、接触力或失败恢复；更好的预测指标也不自动证明策略收益。比较时分别列出数据覆盖、动作查询分布、门控规则和下游任务。

## 支撑资料

- [[a-comprehensive-survey-on-world-models-for-embodied-ai|A Comprehensive Survey on World Models for Embodied AI]]
- [[worldecho-worldsync-action-following|WorldEcho／WorldSync：世界模型是否忠实执行动作]]
- [[v-jepa-2-understanding-prediction-planning|V-JEPA 2：视频表征怎样接到机器人规划]]
- [[dino-wm-pretrained-visual-features|DINO-WM：用预训练视觉特征进行目标规划]]

## 机制基础

[[WorldModelEvaluation|World Model 评测]]、[[WorldModelTaxonomy|World Model 分类]]、[[SimulationRealityGap|Sim-to-Real Gap]]。

## 未解问题与优先补证

怎样在非专家动作、未见初态和真实硬件上同时衡量状态误差、失败率与延迟？视觉门控是否遗漏物体运动、接触力和滑移错误？优先核验动作遵循评估的独立复现。

这些是研究问题与验证要求，尚未作为已有结论。沿 [[topics/world-models-and-representations|World Models]] 查看相关研究。
