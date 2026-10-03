---
title: "MDP 与强化学习基础"
type: concept
tags: [robotics, reinforcement-learning]
sources: ["[[spinning-up-rl-key-concepts]]", "[[spinning-up-rl-algorithm-taxonomy]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]"]
modified: 2026-09-30
topics: ["topics/world-models-and-representations", "topics/planning-and-control", "topics/evaluation-and-transfer", "topics/robot-policy-learning", "topics/world-model-decision", "topics/policy-evaluation"]
---

# MDP 与强化学习基础

马尔可夫决策过程（MDP）把任务写成“状态 → 动作 → 下一状态与奖励”的交互。强化学习在这个循环中优化策略产生的**期望回报**。状态、观测、奖励、回报和成功条件各有含义，这是阅读机器人 RL、世界模型与评测论文的共同起点。[[spinning-up-rl-key-concepts|强化学习基础概念]]

## 从抓取任务进入

教学例子：真实状态包括关节位置、速度、杯子姿态及任务需要的其他变量；相机图像只是部分观测。动作可以是夹爪与机械臂命令，奖励可以鼓励接近目标，而成功条件要求杯子被稳定抬起。接近杯子的奖励提高，不必然意味着最终抓取成功；成功的具体定义应由任务评测协议给出。[[TaskGeneralistPolicyEvaluation|通用任务策略评估]]

## 数学结构

采用 [[spinning-up-rl-key-concepts|教程]] 的 MDP 约定 $\mathcal M=(S,A,R,P,\rho_0)$。$S$ 为状态集合，$A$ 为动作集合，$R(s,a,s')$ 为奖励函数，$P(s'\mid s,a)$ 为转移分布，$\rho_0$ 为初始状态分布。折扣因子 $\gamma\in[0,1)$ 与时域另外指定。

$$
s_0\sim\rho_0,\quad a_t\sim\pi_\theta(\cdot\mid s_t),\quad s_{t+1}\sim P(\cdot\mid s_t,a_t),\quad r_t=R(s_t,a_t,s_{t+1}).
$$

$\pi_\theta$ 是参数为 $\theta$ 的策略，$r_t$ 是第 $t$ 步奖励。有限时域 $H$ 下，一条轨迹 $\tau$ 的折扣回报和优化目标为：

$$
G(\tau)=\sum_{t=0}^{H-1}\gamma^t r_t,\qquad J(\theta)=\mathbb E_{\tau\sim\pi_\theta}[G(\tau)].
$$

不折扣的有限时域目标可令 $\gamma=1$。期望同时涉及初态、随机策略和随机转移，不能只看一条幸运轨迹。对无限时域折扣情形，状态价值、动作价值与优势分别是：

$$
V^\pi(s)=\mathbb E_\pi\!\left[\sum_{k=0}^{\infty}\gamma^k r_{t+k}\mid s_t=s\right],\qquad A^\pi(s,a)=Q^\pi(s,a)-V^\pi(s).
$$

$Q^\pi(s,a)$ 表示先执行动作 $a$、以后按 $\pi$ 行动的期望回报。Bellman 方程把价值拆成眼前收益和未来收益：

$$
Q^\pi(s,a)=\mathbb E_{s'\sim P}\!\left[R(s,a,s')+\gamma\,\mathbb E_{a'\sim\pi(\cdot\mid s')}Q^\pi(s',a')\right].
$$

有限时域时还需记录当前时间或剩余步数，价值通常应写成 $V_t^\pi$。[[spinning-up-rl-key-concepts|强化学习基础概念]]

## 直觉

| 概念 | 问的问题 |
| --- | --- |
| 奖励 $r_t$ | 这一步获得多少反馈？ |
| 回报 $G$ | 整段行为累计获得多少反馈？ |
| 价值 $V,Q$ | 从这里继续行动，平均能获得多少回报？ |
| 优势 $A$ | 这个动作比策略平均选择好多少？ |
| 成功判定 | 行为是否满足任务规定的条件？ |

马尔可夫性质不是“物理世界没有历史”，而是选定的状态已经包含预测下一步所需的信息。如果只给当前图像，同样图像可能对应不同速度；这时需要观测历史或状态估计。潜在状态的处理见 [[LatentStateSpaceModels|潜在状态空间模型：估计与预测]]，对应的部分可观测建模见 [[a-comprehensive-survey-on-world-models-for-embodied-ai|具身世界模型综述]]。

## 失效情形

- **把观测当完整状态**：遗漏速度、遮挡或其他状态后，基于当前观测的策略不能直接继承全状态假设。
- **把奖励当成功证明**：奖励与任务判定条件需要分别检查。[[TaskGeneralistPolicyEvaluation|通用任务策略评估]]
- **时域定义含糊**：不区分有限时域与无限时域，可能错误解释价值函数和折扣。
- **利用模型偏差**：模型内回报提高可能依赖错误预测，需要在实际环境中检验。[[spinning-up-rl-algorithm-taxonomy|强化学习算法分类]]

## 实践含义

读一篇机器人学习论文，先写出它的 $S$、观测、$A$、$R$、初态和时域，再讨论网络结构。比较结果时，还需记录是否提供特权状态、目标任务数据与相同评测条件。后续阅读 [[RobotLearningObjectives|学习目标]]、[[RobotLearningDataComposition|数据构成]] 与 [[TaskGeneralistPolicyEvaluation|评测协议]]。

## 自测

一个策略获得更高奖励，却更少把杯子抬离桌面：应该先比较奖励定义和成功条件。另一个策略在静止杯子上成功，在运动杯子上失败：先检查观测或记忆是否包含速度信息，再检查训练分布。第二个问题是诊断练习，不构成对某一策略失败原因的实证判断。

## 研究归属

[[topics/world-models-and-representations|世界模型与表征]] · [[topics/planning-and-control|规划与控制]] · [[topics/evaluation-and-transfer|评测与现实迁移]] · [[topics/robot-policy-learning|机器人策略学习]] · [[topics/world-model-decision|世界模型如何用于决策]] · [[topics/policy-evaluation|数据与评测怎样支撑泛化判断]]。
