---
title: "模型预测控制：预测、优化、执行、重规划"
type: concept
tags: [robotics, world-models, reinforcement-learning]
sources: ["[[planet-learning-latent-dynamics]]", "[[td-mpc2-scalable-robust-world-models]]", "[[dino-wm-pretrained-visual-features]]"]
modified: 2026-10-02
study_topic: syntheses/world-models-learning-path
---

# 模型预测控制：预测、优化、执行、重规划

模型预测控制（MPC）每次从当前状态出发，优化一段有限时域的动作，只执行开头，再用新观测重规划。**模型给动作后果，优化器选动作，反馈纠正预测。** 这里重点解释已收录的学习模型版本；经典 MPC 的稳定性、约束可行性和鲁棒保证不能从这些实验直接推出。[[planet-learning-latent-dynamics|PlaNet]]、[[td-mpc2-scalable-robust-world-models|TD-MPC2]]

## 数学结构

令 $z_0$ 是由当前观测历史估计的潜在状态，$a_i$ 是第 $i$ 步候选动作，$f_\theta$ 为动力学，$r_\theta$ 为预测奖励，$H$ 为规划时域，$\gamma$ 为折扣，$V_\psi$ 为时域结束后的价值估计。以下统一写法用于解释组件，不是某篇论文的逐字公式：

$$
\begin{aligned}
a^*_{0:H-1}&\in\arg\max_{a_{0:H-1}}\mathbb E\!\left[\sum_{i=0}^{H-1}\gamma^i r_\theta(z_i,a_i)+\gamma^H V_\psi(z_H)\right],\\
z_{i+1}&=f_\theta(z_i,a_i),\qquad a_i\in\mathcal A.
\end{aligned}
$$

$\mathcal A$ 是允许的动作集合；随机模型的状态转移应读作从模型分布采样。PlaNet 不用价值网络，相当于去掉终端项；TD-MPC2 使用终端 $Q_\psi(z_H,a_H)$ 并额外选择末端动作。这里的动作范围并不自动编码物体不碰撞或接触力安全约束。[[planet-learning-latent-dynamics|PlaNet 的纯规划]]、[[td-mpc2-scalable-robust-world-models|TD-MPC2 的终端价值]]

### CEM 如何选动作

交叉熵方法（CEM）维护动作序列的高斯分布 $q_j(a)=\mathcal N(\mu_j,\operatorname{diag}(\sigma_j^2))$，$j$ 是搜索轮次。每轮采样 $N$ 条序列，用模型评分，取最好的 $K$ 条组成精英集合 $\mathcal E_j$，重新估计每个时刻和动作维度的均值、方差：

$$
\mu_{j+1}=\frac1K\sum_{k\in\mathcal E_j}a^{(k)},\qquad
\sigma_{j+1}^2=\frac1K\sum_{k\in\mathcal E_j}(a^{(k)}-\mu_{j+1})^2.
$$

这是 CEM 的逐维矩估计教学写法；方差下限、平滑与终止规则依实现变化。模型只回答“这条动作序列会怎样”，CEM 本身不需要动力学梯度。PlaNet 与 DINO-WM 使用 CEM；TD-MPC2 使用 MPPI 的加权更新，不能因二者都采样就把名称混用。[[planet-learning-latent-dynamics|PlaNet 附录 B]]、[[dino-wm-pretrained-visual-features|DINO-WM 附录 A.5]]、[[td-mpc2-scalable-robust-world-models|TD-MPC2 §3.2]]

## 直觉

```mermaid
flowchart LR
  A[观测与状态估计] --> B[候选动作序列]
  B --> C[模型预测后果]
  C --> D[按目标评分并优化]
  D --> E[执行第一步或短动作块]
  E --> F[获得真实反馈]
  F --> A
```

重规划意味着发现物体没有到预期位置后，下一段计划可以改变；它不追溯撤销已经发生的错误。搜索时域决定目前能看到多远，终端价值尝试补上更远的目标，但终端价值也需要学准。

## 失效情形

- **时域不是越长越好。** PlaNet 的时域实验同时显示短视与搜索空间增大的代价；V-JEPA 2 也指出自回归误差和搜索维数限制长期规划。[[planet-learning-latent-dynamics|PlaNet 附录 J]]、[[v-jepa-2-understanding-prediction-planning|V-JEPA 2]]
- **搜索会进入训练分布外。** TD-MPC2 讨论离线覆盖不足的外推误差；WorldEcho 显示只在专家动作上测模型，会遗漏非专家动作下的失真。[[td-mpc2-scalable-robust-world-models|TD-MPC2 附录 J]]、[[worldecho-worldsync-action-following|WorldEcho]]
- **可微不等于容易优化。** DINO-WM 的开环梯度下降弱于 CEM，闭环重规划又优于开环搜索；模型、优化器和反馈需分别检查。[[dino-wm-pretrained-visual-features|DINO-WM]]

## 实践含义

同时记录预测步长、规划时域、候选数、优化轮数、执行动作块长度和完整规划延迟。要比较控制方法，先对齐动作与数据预算，再区分模型误差、搜索失败和反馈频率。目标由图像指定时读 [[VisualGoalPlanning|视觉目标规划]]；希望把执行时搜索成本学进策略时读 [[ImaginedPolicyLearning|想象策略学习]]。
