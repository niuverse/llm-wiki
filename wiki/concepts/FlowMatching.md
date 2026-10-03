---
title: "流匹配：从噪声生成动作与未来表示"
type: concept
tags: [robotics, world-models, vla]
sources: ["[[lda-1b-scaling-latent-dynamics-action-model]]", "[[pi07-steerable-generalist-robotic-foundation-model]]"]
modified: 2026-10-04
topics: ["topics/robot-policy-learning", "topics/world-models-and-representations", "topics/future-conditioned-action"]
---

# 流匹配：从噪声生成动作与未来表示

流匹配学习一个随时间和条件变化的向量场，使随机噪声经过连续变换变成数据样本。这里关注机器人中的两种用法：[[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]] 生成动作或未来视觉特征，[[pi07-steerable-generalist-robotic-foundation-model|π0.7]] 用连续动作专家生成动作块。向量场的“速度”是生成空间里的变化率，**不一定是机器人的物理速度**。

## 从可构造的训练样本开始

以下用与 LDA-1B 速度目标一致的直线路径做教学推导；这是解释性重构，不声称两篇论文采用完全相同的时间采样或求解器。令 $x$ 为一个真实动作块或特征向量，$\epsilon\sim\mathcal N(0,I)$ 为同维噪声，$\tau\in[0,1]$ 为生成时间，$c$ 为观测、语言等条件：

$$
x_\tau=(1-\tau)x+\tau\epsilon,
\qquad
u_\tau=\frac{d x_\tau}{d\tau}=\epsilon-x.
$$

$\tau=0$ 是数据端，$\tau=1$ 是噪声端。一次训练只需抽出 $x,\epsilon,\tau$，构造中间点 $x_\tau$，再让网络预测它应沿哪一方向变化：

$$
\mathcal L(\theta)=\mathbb E\bigl[\|v_\theta(x_\tau,\tau,c)-(\epsilon-x)\|_2^2\bigr].
$$

这不要求先把模型从噪声完整积分到数据再反向传播整条生成轨迹。网络看得到中间点和条件，却不知道生成这个点的真实 $x$；标签 $\epsilon-x$ 只在训练时由数据对构造。LDA-1B 的式 1 给出动作与视觉两分支的这一速度监督形式；π0.7 说明动作专家采用流匹配，但没有在主文完整展开所有插值细节。

## 平方损失究竟学什么

令 $U=\epsilon-x$，固定模型输入 $X=(x_\tau,\tau,c)$。平方损失可分解为：

$$
\mathbb E[\|v-U\|^2\mid X]
=\|v-\mathbb E[U\mid X]\|^2
+\mathbb E[\|U-\mathbb E[U\mid X]\|^2\mid X].
$$

第二项与预测值 $v$ 无关，所以理想最优解是条件平均速度 $v^*(X)=\mathbb E[U\mid X]$。这是最小二乘的教学推导：网络学习经过同一位置的许多训练路径的平均方向，并非记住每个噪声点唯一对应的动作。

也不要把它误解为直接回归一个平均动作。每次生成从不同噪声出发，沿途位置不同，读取的向量场也不同，因此可以表示多个动作模式；是否实际覆盖这些模式仍取决于数据、模型与训练。

## 执行时怎样得到动作

按上述时间方向，生成从 $x_1\sim\mathcal N(0,I)$ 出发，把常微分方程 $d x_\tau/d\tau=v_\theta(x_\tau,\tau,c)$ 从 1 积分到 0。一个示意性的欧拉步为：

$$
x_{\tau-\Delta}=x_\tau-\Delta\,v_\theta(x_\tau,\tau,c),\qquad \Delta>0.
$$

若另一篇论文把噪声端定义为 0，速度符号和积分方向都会反过来；不能只对比损失中的正负号。这里的欧拉步仅解释生成过程，不指定任一论文的实际求解器。

**一维教学例子。** 令真实动作 $x=2$、噪声 $\epsilon=-1$，则 $x_{0.5}=0.5$、标签速度为 $-3$。从 $\tau=0.5$ 向数据端走 $\Delta=0.1$，更新为 $0.5-0.1(-3)=0.8$，即向 2 靠近。它展示符号如何配合，不是机器人实验。

## 两种时间与实际代价

动作块内部的物理时间索引与生成时间 $\tau$ 是两回事。π0.7 用 5 次去噪更新生成 50 个控制时刻的动作，随后只执行 15 或 25 步再更新；5 不是动作长度，50 也不是模型求解步数。LDA-1B 的视觉和动作还使用不同采样频率。[[pi07-steerable-generalist-robotic-foundation-model|π0.7 §VI–VIII]]、[[lda-1b-scaling-latent-dynamics-action-model|LDA-1B §III]]

流匹配损失小并不保证积分误差小、动作约束满足或闭环成功。动作尺度影响平方损失权重，较少求解步数会改变近似误差，观测条件之外的隐藏接触状态仍可能不可辨识。前三项是该数学结构导出的检查点，不是这里两篇论文均单独验证过的失败实验。落到控制时还要检查动作坐标、缩放、延迟和执行块长，见 [[VisionLanguageActionModels|视觉—语言—动作模型]]。

## 研究归属

[[topics/robot-policy-learning|机器人策略学习]] · [[topics/world-models-and-representations|世界模型与表征]] · [[topics/future-conditioned-action|未来预测怎样帮助动作学习]]。
