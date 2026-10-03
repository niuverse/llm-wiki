---
title: "未来预测怎样帮助动作学习"
type: "topic"
tags: ["world-models", "source-backed"]
sources: ["[[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation]]", "[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[pi07-steerable-generalist-robotic-foundation-model]]"]
modified: "2026-10-04"
description: "区分未来监督、逆动力学、潜在动作和上下文条件化的作用。"
---

# 未来预测怎样帮助动作学习

区分未来监督、逆动力学、潜在动作和上下文条件化的作用。

## 方法与证据

| 代表工作 | 未来信息的角色 | 证据边界 |
| --- | --- | --- |
| [[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation|Seer]] | 联合训练未来图像预测与逆动力学；动作标记读取预测未来的潜在表示 | 预训练依赖动作标注轨迹；执行时不搜索候选动作，跨形态收益有限 |
| [[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|DeFI]] | 分别预训练指令条件的正向视频模型与视觉逆动力学模型；后者学习潜在动作，再用机器人数据训练控制适配器 | 下游冻结正向模型、更新逆模型与适配器；无动作标签预训练不等于最终控制无需动作监督 |
| [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]] | 共享模型学习策略、正向／逆动力学和未来 DINO 特征预测，按质量与标签分配目标 | 低质量轨迹不作策略模仿，无动作视频只作视觉预测；普通策略推理不要求真实未来 |
| [[pi07-steerable-generalist-robotic-foundation-model|π0.7]] | 用语言、元数据及可选的独立生成器视觉子目标引导 VLA | 子目标生成不是候选动作模拟；人工指导与使用指导记录训练高层须分别报告 |

**当前判断：**“用了未来”不是单一算法类别。未来可以是训练监督、动作预测所读的中间表示，或独立生成的策略条件；应分别记录训练输入、预测目标、动作标签需求和部署时真正可用的信息。Seer 的联合预训练与 DeFI 的解耦预训练各有本方法内的消融支持，但数据、规模与协议不同，尚不能据跨论文结果判定哪种组织方式普遍更优；上述接口也不自动构成动作搜索或物理模拟。

## 支撑资料

- [[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation|Predictive Inverse Dynamics Models are Scalable Learners for Robotic Manipulation]]
- [[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining]]
- [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B: Scaling Latent Dynamics Action Model via Universal Embodied Data Ingestion]]
- [[pi07-steerable-generalist-robotic-foundation-model|π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities]]

## 机制基础

[[InverseDynamicsModels|逆动力学模型]]、[[LatentDynamicsActionModels|潜在动力学动作模型]]、[[VisionLanguageActionModels|视觉—语言—动作模型]]、[[RobotContextConditioning|机器人上下文条件化]]。

## 未解问题与优先补证

固定机器人动作数据、视频数据与模型预算后，收益来自未来预测目标、表示预训练还是动作解码器？跨机器人潜在动作是否保留相同语义？

这些是研究问题与验证要求，尚未作为已有结论。沿 [[topics/world-models-and-representations|世界模型与表征]] 查看相关研究；基础学习可沿 [[world-models-learning-path|学习路径]] 进行。
