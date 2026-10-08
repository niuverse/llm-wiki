---
title: "Inverse Dynamics"
type: concept
tags: [robotics, inverse-dynamics, vla, world-models]
sources: ["[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining]]", "[[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[dino-wm-pretrained-visual-features]]", "[[v-jepa-2-understanding-prediction-planning]]"]
modified: 2026-10-04
topics: ["topics/robot-policy-learning", "topics/world-models-and-representations", "topics/future-conditioned-action"]
---

# Inverse Dynamics

这里的逆动力学模型从当前与未来视觉状态推断动作或潜在动作，应与经典机器人学中由位置、速度、加速度求力矩的逆动力学区分。它回答“怎样实现这个变化”，正向动力学则回答“这个动作会造成什么变化”。[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|DeFI]]、[[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation|Seer]]

## 条件动作分布与可辨识性

令 $h_t$ 是当前观测与历史，$z_g$ 是未来目标表示，$\ell$ 是语言，$A_t$ 是一段动作。视觉逆模型可写为：

$$
A_t\sim p_\phi(A_t\mid h_t,z_g,\ell).
$$

$\phi$ 是模型参数。这是条件分布的教学记号，不要求实现精确计算似然。同一视觉终态可能由不同动作路径达到；遮挡和无力觉输入还可能把不同接触状态映射到相似图像。因此逆映射不必唯一，视觉预测准确也不足以保证动作可执行。**这一歧义是机制解释，不是某篇论文报告的统一错误率。**

有动作标签时，可直接监督逆模型。Seer 用未来标记 `[FRS]` 表示预测的未来，让动作标记 `[INV]` 读取这些特征；训练同时监督未来 RGB 与机械臂／夹爪动作。它没有在执行时枚举动作并搜索，也不需要先把预测图像重新编码后才生成动作。损失和注意力结构见 [[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation|Seer §3]]。

**一个非唯一逆映射的例子。** 当前杯子在桌面中央、目标图像中杯子在右侧，既可能用夹爪抓起再放下，也可能沿桌面推动。只给前后图像时，中间路径、接触力与夹爪状态并不唯一；若训练把两种策略压成一个确定的平均动作，平均值未必对应可行策略。这是教学例子，用来解释为何“重建未来视觉变化”不等价于“辨认出唯一真实动作”。动作分布可通过 [[FlowMatching|流匹配]] 等方式建模，但多模态建模也不能补回输入中不存在的接触信息。

还要区分监督目标与控制目标：训练时用真实未来检验逆映射，执行时的未来可能是用户目标、模型预测或潜在读出。换了未来提供者，输入分布也随之变化。DeFI 用特征投影桥接两种表示；Seer 训练时已经让动作标记读取预测表示。两者都在处理这一接口，却使用不同设计。[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|DeFI §3]]、[[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation|Seer §3]]

## 无动作标签时学到的是什么

视频没有动作标签时，可以学习解释状态变化的潜在编码。以 DeFI 为例，当前和未来图像经 DINO 编码为 $e_t,e_g$，逆模型 $I_\phi$ 产生编码，码本量化成 $u$，解码器 $D$ 重建未来特征：

$$
u=\operatorname{VQ}(I_\phi(e_t,e_g,\ell)),\qquad
\mathcal L=\|D(e_t,u)-e_g\|_2^2+\mathcal L_{\rm VQ}.
$$

$\mathcal L_{\rm VQ}$ 约束量化与码本学习。当前特征直接供给解码器，有限码本承担变化信息的瓶颈；作者希望减少直接复制未来细节的捷径。**$u$ 不是已辨识的关节命令**，还要用机器人动作标签训练适配器。推理时使用预测的未来特征，不能偷用真实未来。[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|DeFI §3、附录 A.2–A.3]]

```mermaid
flowchart LR
  O["当前观测"] --> F["预测未来表示"]
  O --> I["逆模型"]
  F --> I
  I --> U["潜在动作"]
  U --> A["机器人动作适配器"]
  A --> R["可执行动作"]
```

图对应潜在动作路线；直接监督动作的模型不一定需要独立码本或适配器。共享模型也可以把逆动力学作为多种条件任务之一，见 [[sources/lda-1b-scaling-latent-dynamics-action-model|LDA-1B]]。

## 失效与验证

DeFI 检查的 200 次失败中，作者归因 62% 为未来预测失败、38% 为逆动力学失败；这些比例只描述该样本。其冻结正向模型、训练逆模型与适配器的设置优于全量微调，证明该训练选择在实验中有效，**不能单凭这一消融就证实“未来表示漂移”是唯一原因**。[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|DeFI 表 9、§4.4]]

应分别检查目标可达性、预测未来是否正确、逆映射是否执行到位，以及新机器人动作空间是否得到充分监督。Seer 去除 Franka 数据后的跨形态预训练收益有限且部分任务下降，说明数据规模不能独自保证迁移。[[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation|Seer 附录 A.6.4]]

[[VisualGoalPlanning|视觉目标规划]] 提供另一种接口：给正向模型候选动作，用目标特征误差搜索动作，而非训练一个目标到动作的逆映射。两者的监督需求与推理预算不同。方法之间的具体比较见 [[topics/future-conditioned-action|未来条件动作学习专题]]，评估原则见 [[WorldModelEvaluation|World Model 评测]]。

## 研究归属

[[topics/robot-policy-learning|机器人策略学习]] · [[topics/world-models-and-representations|World Models]] · [[topics/future-conditioned-action|未来预测与动作学习]]。
