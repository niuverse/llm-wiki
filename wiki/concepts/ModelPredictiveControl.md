---
title: "模型预测控制：预测、优化、执行、重规划"
type: concept
tags: [robotics, world-models, reinforcement-learning]
sources: ["[[planet-learning-latent-dynamics]]", "[[td-mpc2-scalable-robust-world-models]]", "[[dino-wm-pretrained-visual-features]]"]
modified: 2026-10-04
topics: ["topics/world-models-and-representations", "topics/planning-and-control", "topics/world-model-decision"]
---

# 模型预测控制：预测、优化、执行、重规划

模型预测控制（MPC）每次从当前状态出发，优化有限时域的动作序列，只执行开头，再用新观测重规划。**模型给动作后果，优化器选动作，反馈修正下一次计划。** 本页讨论已收录的学习模型实现；经典 MPC 的稳定性、约束可行性与鲁棒保证不能从这些实验直接推出。[[planet-learning-latent-dynamics|PlaNet]]、[[td-mpc2-scalable-robust-world-models|TD-MPC2]]

## 数学结构：预测时域与长期目标

令 $z_0$ 为当前观测历史估计出的潜在状态，$a_i$ 为第 $i$ 步候选动作，$f_\theta$ 为动力学，$r_\theta$ 为预测奖励，$H$ 为规划时域，$\gamma$ 为折扣，$V_\psi$ 为终态之后的价值估计。统一的教学表达为：

$$
\begin{aligned}
a^*_{0:H-1}&\in\arg\max_{a_{0:H-1}}\mathbb E\!\left[\sum_{i=0}^{H-1}\gamma^i r_\theta(z_i,a_i)+\gamma^H V_\psi(z_H)\right],\\
z_{i+1}&=f_\theta(z_i,a_i),\qquad a_i\in\mathcal A.
\end{aligned}
$$

$\mathcal A$ 是允许的动作集合；随机模型的转移应读作从分布采样，期望还涉及当前状态的不确定性。实际有限预算优化通常只近似求解上述目标，不能把写成 $\arg\max$ 当作找到了全局最优的保证。[[planet-learning-latent-dynamics|潜在规划与采样]]

终端价值是一种可选组件。PlaNet 直接累加有限时域奖励，不使用价值网络；TD-MPC2 使用终端 $Q_\psi(z_H,a_H)$，因而还需选择末端动作 $a_H$。价值使短规划考虑较远回报，也引入价值估计误差。视觉目标方法则可改成最小化预测终态与目标特征距离，见 [[VisualGoalPlanning|视觉目标规划]]。这些选择改变优化目标，不能只按是否使用 MPC 判断方法等价。[[td-mpc2-scalable-robust-world-models|短规划与终端价值]]

## 动作优化器与状态估计各做什么

### 动作分布是优化器的搜索工具

[[CrossEntropyMethod|交叉熵方法（CEM）]]从动作分布中采样完整序列，用模型评分，再对精英重新拟合。共享概念页展开最大似然推导与数值例子。它不需要动力学梯度，也不把搜索分布当成状态后验；PlaNet、DINO-WM 与 V-JEPA 2-AC 采用这一类搜索。

TD-MPC2 则采用 MPPI 的回报加权更新，并用策略先验补充候选。CEM 与 MPPI 都采样动作，但具体更新规则不能互换。[[planet-learning-latent-dynamics|PlaNet 附录 B]]、[[td-mpc2-scalable-robust-world-models|TD-MPC2 §3.2]]

### 重规划不等于重新学习

执行后，真实观测用于重新估计当前状态，再求下一段动作。它不同于更新模型参数：可以在冻结动力学上反复闭环规划，也可以另外用新数据持续训练模型。两条更新路径应分开描述。[[planet-learning-latent-dynamics|在线模型学习与规划循环]]、[[dino-wm-pretrained-visual-features|离线学习后的目标规划]]

**搜索热启动也是可选项。** PlaNet 每次收到新观测后重新用零均值、单位方差初始化动作分布，以减少陷入局部解；TD-MPC2 将上一步计划平移作为下一步初值，再结合策略先验加速搜索。不能把“使用上一段计划”写成 MPC 或 CEM 的必备定义。[[planet-learning-latent-dynamics|PlaNet §2]]、[[td-mpc2-scalable-robust-world-models|TD-MPC2 §3.2]]

```mermaid
flowchart LR
  A[观测与状态估计] --> B[初始化候选动作分布]
  B --> C[模型预测后果]
  C --> D[按目标评分并更新候选]
  D --> C
  D --> E[执行首步或短动作块]
  E --> F[获得真实反馈]
  F --> A
```

图中内圈是同一决策的动作优化，外圈是执行后的观测反馈。反馈可以修正下一段计划，不能撤销已经发生的碰撞或掉落。

## 用一个控制周期看清三个时钟

**教学例子。**假设每个模型动作代表0.1秒，规划未来10步，每次只执行前2步。规划覆盖1秒，真实反馈每0.2秒进入一次；如果一次搜索另耗0.3秒，实际控制时序还需考虑这段计算如何与执行衔接，不能只报模型前向频率。这些数字是解释用的设定，不是任何论文配置。

状态更新时只保留已执行动作和新观测，重新推断当前位置；先前预测的第3到10步只是旧计划，不应当成已经发生的事实。是否把剩余动作平移作初值是热启动选择，是否用新经验训练模型是学习选择。对应的不同实现见 [[planet-learning-latent-dynamics|PlaNet]] 与 [[td-mpc2-scalable-robust-world-models|TD-MPC2]]。

## 为什么增加时域或预算未必解决问题

| 限制 | 机制 | 来源支持 |
|---|---|---|
| 短视 | 目标收益在搜索时域之外，且没有可靠终端价值 | [[planet-learning-latent-dynamics|规划时域实验]]、[[td-mpc2-scalable-robust-world-models|终端价值机制]] |
| 搜索困难 | 动作维度和时域增加会放大候选空间；即使用真实动力学也可能更难求解 | [[planet-learning-latent-dynamics|附录 J 的真实仿真器实验]] |
| 累积预测误差 | 早期预测继续作为后续输入，偏差沿滚动传播 | [[v-jepa-2-understanding-prediction-planning|长时域局限]] |
| 分布外利用 | 搜索偏向模型或价值误判为高收益、却缺少训练覆盖的动作 | [[td-mpc2-scalable-robust-world-models|离线外推误差]]、[[worldecho-worldsync-action-following|非专家动作评测]] |
| 反馈滞后 | 候选评估增加完整决策延迟，真实状态可能在等待中变化 | [[dino-wm-pretrained-visual-features|完整规划延迟]]、[[v-jepa-2-understanding-prediction-planning|阻塞式真机控制]] |

动作范围限制也不自动成为状态或接触力约束。若要禁止某类碰撞，模型、约束表达和求解器都需提供对应信息；上述学习模型论文并未建立一般安全保证。

## 实践含义

**我们的归纳。** 记录预测步长、规划时域、候选数、优化轮数、执行动作块长度和完整决策延迟，才能分辨模型误差、搜索失败与反馈不足。比较时还应明确终端价值是否存在、候选是否依赖预训练策略、是否热启动，以及允许多少真实交互。具体数字留在论文页维护。

希望把反复搜索的成本转移到训练时，可读 [[ImaginedPolicyLearning|想象中的策略学习]]；评估是否真正改善任务执行，则读 [[WorldModelEvaluation|世界模型评估]]。

## 研究归属

[[topics/world-models-and-representations|世界模型与表征]] · [[topics/planning-and-control|规划与控制]] · [[topics/world-model-decision|世界模型如何用于决策]]。
