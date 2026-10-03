---
title: "交叉熵方法：从候选动作到精英分布"
type: concept
tags: [world-models, robotics]
sources: ["[[planet-learning-latent-dynamics]]", "[[dino-wm-pretrained-visual-features]]", "[[v-jepa-2-understanding-prediction-planning]]"]
modified: 2026-10-04
topics: ["topics/world-models-and-representations", "topics/planning-and-control", "topics/world-model-decision"]
---

# 交叉熵方法：从候选动作到精英分布

交叉熵方法（Cross-Entropy Method，CEM）通过“采样候选 → 评分 → 保留精英 → 拟合新分布”搜索高质量解。它只需要能给候选打分，不要求评分函数可微。PlaNet 用预测回报评分，DINO-WM 与 V-JEPA 2-AC 用目标特征距离评分；这三种用法共用优化套路，但任务目标和动力学不同。[[planet-learning-latent-dynamics|PlaNet §2、附录 B]]、[[dino-wm-pretrained-visual-features|DINO-WM 附录 A.5]]、[[v-jepa-2-understanding-prediction-planning|V-JEPA 2 §3.2]]

## 它优化的是一整段动作

设动作有 $m$ 维，规划 $H$ 步，把整段候选写成向量 $A=(a_0,\ldots,a_{H-1})\in\mathbb R^{Hm}$。世界模型从同一个当前状态出发，滚动这段动作，得到代价 $C(A)$；最大化奖励时可令代价为负回报。

第 $j$ 轮维护 $q_j(A)=\mathcal N(\mu_j,\operatorname{diag}(\sigma_j^2))$。均值与方差分别覆盖每个时刻、每个动作维度，不是把所有未来动作强制设成一个相同值。对角协方差只说明搜索分布没有显式表示不同坐标的相关性；候选好坏仍由整条轨迹共同决定。

1. 从 $q_j$ 采样 $N$ 条候选 $A^{(1)},\ldots,A^{(N)}$。
2. 将每条候选交给世界模型，计算完整代价。
3. 选择代价最小的 $K$ 条，组成精英集合 $\mathcal E_j$。
4. 用精英拟合下一轮分布，重复有限轮数。

具体方差下限、动作边界处理、候选数和初始化属于实现选择；下面推导采用理想的无约束对角高斯，不把它当成三篇论文所有细节的逐行复刻。

## 为什么重新计算均值和方差

**教学推导。**把精英视为下一轮希望更常见的样本，对分布参数 $\eta$ 最小化经验交叉熵：

$$
\eta_{j+1}=\arg\min_\eta\left[-\frac1K\sum_{k\in\mathcal E_j}\log q_\eta(A^{(k)})\right].
$$

这也就是对精英做最大似然拟合。对每个独立坐标 $d$，高斯负对数似然只需最小化

$$
\log\sigma_d+\frac{1}{2K\sigma_d^2}\sum_{k\in\mathcal E_j}(A_d^{(k)}-\mu_d)^2.
$$

令对 $\mu_d$ 和 $\sigma_d^2$ 的导数为零，得到

$$
\mu_{j+1,d}=\frac1K\sum_{k\in\mathcal E_j}A_d^{(k)},\qquad
\sigma_{j+1,d}^2=\frac1K\sum_{k\in\mathcal E_j}(A_d^{(k)}-\mu_{j+1,d})^2.
$$

因此均值把搜索移向当前好解，方差控制下一轮还探索多大范围。“交叉熵”在这里是拟合搜索分布的准则，和世界模型是否用交叉熵训练奖励预测器是两回事。论文可能采用不同的离散程度估计或平滑，阅读时应回到对应算法而非只凭名称。

## 一轮数值例子

**教学例子，不是论文实验。**一维动作代价为 $C(a)=(a-2)^2$，某轮恰好采到 $-1,0,1,2$。其代价为 $9,4,1,0$。保留两条精英 $1,2$，则新均值为 $1.5$、方差为 $0.25$。下一轮在 $1.5$ 附近以标准差 $0.5$ 采样；分布已经向好区域移动，但这轮返回均值仍不是精确最优动作 $2$。

```mermaid
flowchart LR
  D[当前动作分布] --> A[采样整段动作]
  A --> W[同一起点预测各自后果]
  W --> C[按任务目标评分]
  C --> E[选择精英]
  E --> F[拟合下一轮分布]
  F --> D
  F --> O[预算结束后输出动作计划]
```

图是算法教学示意。分布只根据已尝试的候选更新；没有采到的好区域，不会因为拟合本身自动被发现。

## CEM、MPC 与模型学习各在哪一层

CEM 完成一次决策内部的动作优化；[[ModelPredictiveControl|MPC]] 决定只执行计划前段、重新观测后再优化；世界模型训练则更新用于评分的动力学参数。冻结模型可以反复做 CEM，做完一轮 CEM 也不意味着已经获得新的真实数据。

PlaNet 与 V-JEPA 2-AC 的论文描述每次搜索重新初始化动作高斯；[[td-mpc2-scalable-robust-world-models|TD-MPC2]] 则采用回报加权的 MPPI、策略候选与搜索热启动。两者都有“采样并更新分布”，但更新权重和算法身份不能混同。

## 哪些地方容易误判

- **把搜索方差当作物理不确定性。** $\sigma_j$ 表示优化器还想在哪里尝试动作；模型预测未来的随机性是另一件事。PlaNet 每候选只采一条潜在轨迹，评分会受模型采样影响。
- **以为优化更久一定更可靠。** 更久的搜索可能找到更好的模型内计划，也可能更充分利用模型误差；动作维度和时域还会放大搜索空间。PlaNet 的真实仿真器消融说明，没有学习误差时也会有搜索困难。
- **过早收缩或平均掉多个解。** 若少量精英集中在偶然区域，方差会变小；若精英分别绕障碍左右两侧，均值可能落在两侧之间。这是高斯拟合的教学风险分析，不是对上述论文某个试验失败的新增归因。
- **把可微等同易优化。** DINO-WM 的梯度下降对照更弱；CEM 不依赖局部梯度，但要付出大量候选评估成本。

实际阅读记录候选数、精英数、轮数、时域、评分随机性和完整延迟。视觉目标如何构成代价见 [[VisualGoalPlanning|视觉目标规划]]；潜在模型如何产生候选后果见 [[LatentStateSpaceModels|潜在状态空间模型]]。

## 研究归属

[[topics/world-models-and-representations|世界模型与表征]] · [[topics/planning-and-control|规划与控制]] · [[topics/world-model-decision|世界模型如何用于决策]]。
