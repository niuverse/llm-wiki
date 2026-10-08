---
title: "潜在动力学动作模型"
type: concept
tags: [robotics, world-models, vla, inverse-dynamics]
sources: ["[[lda-1b-scaling-latent-dynamics-action-model]]", "[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining]]", "[[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation]]"]
modified: 2026-10-04
topics: ["topics/robot-policy-learning", "topics/world-models-and-representations", "topics/future-conditioned-action"]
---

# 潜在动力学动作模型

潜在动力学动作建模把未来视觉表示与机器人动作放到共享学习系统中。这里以 [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]] 的框架为主要证据：它用 DINO 特征作为未来目标，用流匹配训练共享模型，并按数据质量和标签选择训练任务。“潜在”指视觉状态表示，不能自动理解为无动作标签的潜在动作码本。

## 四种条件任务

令 $o_t$ 为当前观测，$\ell$ 为语言，$A$ 为未来动作块，$Z$ 为未来图像经 DINO 编码的特征序列。动作和视觉的采样频率可以不同，不假定两者具有相同序列长度。四种条件关系是：

$$
\begin{array}{ll}
\text{策略：}&p_\theta(A\mid o_t,\ell),\\
\text{正向动力学：}&p_\theta(Z\mid o_t,A,\ell),\\
\text{逆动力学：}&p_\theta(A\mid o_t,Z,\ell),\\
\text{视觉预测：}&p_\theta(Z\mid o_t,\ell).
\end{array}
$$

$\theta$ 是共享模型参数。这里描述条件分布，不是四个独立网络；LDA-1B 用任务嵌入、模态噪声与损失掩码区分任务，缺失模态用可学习占位标记表示。逆动力学的输入包含目标未来，普通策略推理不要求先提供真实未来。[[lda-1b-scaling-latent-dynamics-action-model|LDA-1B §III]]

## 共享模型怎样训练

LDA-1B 采用 [[FlowMatching|流匹配]]，分别为动作和未来视觉特征学习生成向量场。这里更关键的是损失的选择：

$$
\mathcal L=\lambda_A(m)\mathcal L_A+\lambda_Z(m)\mathcal L_Z.
$$

$m$ 是训练任务类型，$\mathcal L_A,\mathcal L_Z$ 是相应速度预测损失，$\lambda_A(m),\lambda_Z(m)$ 表示启用哪个分支。这不是用零向量填补缺失动作标签：未提供的模态由占位标记表达，未激活的损失不拿伪造标签回归。速度目标与积分的推导集中在流匹配页，论文特有的任务嵌入、MM-DiT 与调用输入见 [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B §III]]。

| 数据条件 | 原文分配的任务 | 原因 |
| --- | --- | --- |
| 高质量、带动作轨迹 | 四种任务 | 可同时学习期望行为和动作后果 |
| 低质量、带动作轨迹 | 正向动力学、视觉预测 | 行为不理想仍可提供状态转移监督 |
| 无动作的人类视频 | 视觉预测 | 缺少真实动作条件，不能直接监督机器人逆映射 |

这使“可用于学习世界变化的数据”和“可用于模仿的示范”分开。它不是低质量数据永远有益的定理，效果取决于路由、覆盖和表示；具体消融见 [[lda-1b-scaling-latent-dynamics-action-model|来源页]]。

**同一轨迹可以产生不同学习问题。** 给定一段带动作的推物视频，正向任务把动作当已知条件、预测物体后续特征；逆向任务反过来把未来特征当条件、预测动作。后者只是数据中的条件推断，不证明该动作是达到目标的最优解；低质量动作不能因为换名为逆动力学就自动成为优质控制示范。LDA-1B 因此只把高质量带动作数据分配给逆动力学与策略任务。[[lda-1b-scaling-latent-dynamics-action-model|LDA-1B §III-B]]

## 表示的收益与边界

DINO 特征减少直接拟合所有像素细节的需求，也保留空间结构；但特征距离小不等于接触力、摩擦或材质状态正确。来源把冻结视觉表示列为局限。**进一步推论：** 如果关键控制变量在视觉表示中不可区分，下游预测头无法仅靠同一表示恢复它。

评估应同时检查表征预测和闭环动作。LDA-1B 的规模曲线使用离线动作 L1 误差；部分真机“成功率”实际是完成比例或加权进度分数，不能混作完整任务成功概率。数据路由收益也应在相同数据和预算下比较。[[lda-1b-scaling-latent-dynamics-action-model|LDA-1B 图 10、附录表 VII–VIII]]

![原文图 10](../assets/figures/lda-1b-scaling-latent-dynamics-action-model/fig-10.webp)

原文图 10；PDF 第 8 页。[查看原始来源](https://arxiv.org/pdf/2602.12215#page=8)

与 [[InverseDynamicsModels|逆动力学模型]]、[[RobotContextConditioning|上下文条件化]] 的关系见 [[topics/future-conditioned-action|未来条件动作学习专题]]；动作执行接口见 [[VisionLanguageActionModels|视觉—语言—动作模型]]。

## 研究归属

[[topics/robot-policy-learning|机器人策略学习]] · [[topics/world-models-and-representations|世界模型与表征]] · [[topics/future-conditioned-action|未来预测怎样帮助动作学习]]。
