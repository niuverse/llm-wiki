---
title: "想象中的策略学习：世界模型到演员与价值评估器"
type: concept
tags: [world-models, robotics, reinforcement-learning]
sources: ["[[dreamerv3-mastering-diverse-control]]", "[[planet-learning-latent-dynamics]]", "[[td-mpc2-scalable-robust-world-models]]"]
modified: 2026-10-02
study_topic: syntheses/world-models-learning-path
---

# 想象中的策略学习：世界模型到演员与价值评估器

世界模型可以在训练时产生潜在轨迹，让策略反复练习动作后果。DreamerV3 用真实交互数据学习模型，再在模型想象中训练演员和价值评估器；**部署时直接采样策略，未逐步搜索候选动作。** 这与 [[ModelPredictiveControl|执行时 MPC]] 的计算位置不同。[[dreamerv3-mastering-diverse-control|DreamerV3]]

## 数学结构

### 先训练能预测的状态

RSSM 状态为 $s_t=(h_t,z_t)$：$h_t$ 是确定性记忆，$z_t$ 是随机潜在状态，$o_t$ 是观测，$a_t$ 是动作。真实数据训练观测后验 $q_\phi(z_t\mid h_t,o_t)$ 和预测先验 $p_\phi(z_t\mid h_t)$；想象时没有未来观测，只能沿先验推进。Dreamer 另外预测奖励 $r_t$ 和继续概率 $c_t$。结构见 [[LatentStateSpaceModels|RSSM 与状态估计]]。

DreamerV3 将同一 KL 差异分成不同梯度方向，$\operatorname{sg}$ 表示停止梯度：

$$
\begin{aligned}
\mathcal L_{\rm dyn}&=\max\!\left(1,D_{\rm KL}(\operatorname{sg}(q_\phi)\Vert p_\phi)\right),\\
\mathcal L_{\rm rep}&=\max\!\left(1,D_{\rm KL}(q_\phi\Vert\operatorname{sg}(p_\phi))\right).
\end{aligned}
$$

前者让预测追上从观测得到的表示，后者让表示更容易预测；1 nat 的下限让已足够小的 KL 暂停施压，配合观测、奖励和继续标记预测，避免表示只追求“好预测”却丢失信息。两项的权重不同，不能当成两个完全重复的损失。[[dreamerv3-mastering-diverse-control|DreamerV3 的模型目标]]

### 想象回报如何越过有限时域

$\pi_\theta(a_t\mid s_t)$ 为演员，$v_\psi(s_t)$ 为价值分布的均值，$\gamma$ 为折扣，$\lambda$ 控制多步回报与自举的折中。为避免奖励时间索引混淆，这里规定 $r_t,c_t$ 对应 $s_t\to s_{t+1}$ 的转移，用一致索引重写 $\lambda$ 回报：

$$
G_t^\lambda=r_t+\gamma c_t\big[(1-\lambda)v_\psi(s_{t+1})+\lambda G_{t+1}^\lambda\big],\qquad
G_H^\lambda=v_\psi(s_H).
$$

$H$ 为想象时域。继续概率在回合终止处截断未来贡献；末端价值补上时域以外的回报。演员用优势 $A_t=G_t^\lambda-v_\psi(s_t)$ 改善动作概率，价值评估器拟合停止梯度后的 $G_t^\lambda$。这是来源机制的教学重索引，不是新的实验算法。[[dreamerv3-mastering-diverse-control|DreamerV3 的演员与价值学习]]

### 为什么还需要尺度处理

Dreamer 用 $\operatorname{symlog}(x)=\operatorname{sign}(x)\log(1+|x|)$ 压缩正负大值，用分位数间距 $S$ 归一化演员回报，分母限制为 $\max(1,S)$，避免稀疏奖励下把微小噪声放大。奖励与价值的双桶软标签将目标放到相邻两个数值桶，用分类交叉熵训练；两桶加权均值仍能输出连续数值。这里的“离散潜在状态”或“分类回归”不表示环境动作必须离散。[[dreamerv3-mastering-diverse-control|DreamerV3 的稳健预测]]

## 直觉

```mermaid
flowchart LR
  A[真实交互与经验缓存] --> B[学习世界模型]
  B --> C[从真实起点想象轨迹]
  C --> D[学习演员与价值评估器]
  D --> E[真实环境直接执行演员]
  E --> A
```

策略把模型内反复计算出的偏好压进参数，因此部署省掉候选搜索；代价是执行表现取决于此前模型与策略训练。训练在想象中进行，不代表可以完全不接触真实环境或不用数据。

## 失效情形与适用范围

Dreamer 的消融显示 KL、回报归一化与数值变换对不同任务的贡献不一致；未经验证删掉某项，可能恢复不稳定训练。固定配置可用于多个任务，仍需要分别交互学习；论文没有验证单一权重跨全部八类环境迁移。[[dreamerv3-mastering-diverse-control|DreamerV3 的消融与范围]]

TD-MPC2 在其连续控制套件中观察到早期 DreamerV3 基线在部分精细操作上不足，而后来的 Nature 版在另一任务集合上报告强视觉控制结果。两者模型规模与协议不同，保留条件比给出统一排名更有价值。[[td-mpc2-scalable-robust-world-models|TD-MPC2]]、[[WorldModelEvaluation|比较协议]]

## 实践含义

选型时分别算环境交互成本、模型训练成本、策略训练成本和执行延迟；经验利用率高不必然意味着总计算更少。比较 [[ModelPredictiveControl|在线规划]]、[[VisualGoalPlanning|视觉目标搜索]] 和想象策略学习时，先确定新任务是重新训练策略、更换奖励，还是只换目标图像。
