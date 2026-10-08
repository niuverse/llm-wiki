---
title: "仿真敏感性分析"
type: concept
tags: [robotics, simulation, evaluation]
sources: ["[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]"]
modified: 2026-10-04
topics: ["topics/evaluation-and-transfer", "topics/robot-policy-learning", "topics/policy-evaluation"]
---

# 仿真敏感性分析

仿真敏感性分析研究策略输出或成功率如何随环境参数变化。[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab]] 在给定任务上随机改变物体位姿、机器人位置、摩擦、质量、光照和背景，既报告成功率，也估计成功／失败条件下的参数分布。其目标是诊断失效区域，不能直接视为现实因果效应。

## 前向成功率与反向后验

设 $\vartheta$ 为仿真参数，$x$ 为成功、失败或其他观测，$p(\vartheta)$ 为采样先验。前向问题是 $p(x\mid\vartheta)$；RoboLab 的神经后验估计反向学习 $p(\vartheta\mid x)$。论文使用混合神经后验估计（MNPE）处理连续参数与离散背景，并以重要性加权核密度方法辅助分析。[§III-C、附录 B] [[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|原文机制与设置]]

贝叶斯关系提供一个必要的教学解释：

$$
\frac{p(\vartheta\mid x=\mathrm{success})}{p(\vartheta)}
=\frac{p(x=\mathrm{success}\mid\vartheta)}{p(x=\mathrm{success})}.
$$

成功后验相对于采样先验的富集，说明这些参数在所测分布下更常伴随成功；后验本身同时受到先验密度影响。没有先验作参照，不能把密度峰直接称为“最优参数”。宽后验也不自动代表高成功率：策略可能在所有参数下都很差，但偶尔成功的参数仍分布很广。

这里的 $p(\vartheta\mid x)$ 与估计未知成功概率 $p$ 的 $\mathrm{Beta}(k+1,n-k+1)$ 不同：前者的随机变量是环境参数，后者是任务成功概率。后者见 [[SimulationBenchmarkReportingPipeline|报告流程]]。

### 从一个两区域例子理解后验

**教学计算：** 把相机扰动划成 A、B 两个等概率区域，假设区域内成功率分别0.8和0.2。总成功率为0.5，而成功回合有 $P(A\mid\mathrm{success})=0.8\times0.5/0.5=0.8$ 来自 A。后验显示 A 富集，是因为它相对先验更容易成功。

现在换一个策略：A、B 成功率均为0.1。成功后的区域概率仍各0.5，后验与先验同样宽，却只有10%总体成功。因此要同时看总体成功率、先验和条件分布。若原始采样90%集中在 A，即使两区域性能相同，成功样本也会90%来自 A；这就是 [[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab 附录 B]] 需要提议分布修正的原因。

## 位姿度量和参数表示

RoboLab 对位置和旋转的变化使用组合距离：

$$
d=\|t_1-t_2\|_2+\beta\,d_R(q_1,q_2).
$$

$t$ 是以米表示的位置，$q$ 是单位四元数，$d_R$ 是以弧度表示的旋转角距离；原文取 $\beta=1.0$。这意味着距离数值依赖位置与角度的权重约定，不能当作自然唯一的物理距离。位置三维加四元数四维是七个表示分量，刚体位姿仍为六个自由度；单位约束及 $q$ 与 $-q$ 等价使“七自由度物体位姿”不准确。[附录 B]

原文 MNPE 的训练与 5,000 次后验采样用于密度估计，不是 5,000 次额外真实机器人试验；有限的原始执行数据仍限制结论。[附录 B]

## 哪些敏感性证据可以外推

| 观察 | 合理解释 | 不能直接推出 |
| --- | --- | --- |
| 成功集中在某些位姿 | 这些位姿在所采样组合中更有利 | 位姿是唯一原因，或真实机器人也有相同阈值 |
| 背景变化伴随分数变化 | 策略可能依赖视觉上下文 | 背景独立导致变化；还需排除与其他参数共变 |
| 小范围光照变化无明显影响 | 所测任务与范围内未发现明显下降 | 对极端光照、全部任务或所有模型均鲁棒 |
| 后验很窄或很宽 | 成功样本与先验的关系值得进一步检查 | 单凭宽度就能给鲁棒性排名 |

RoboLab 正文把光照结果概括为约 90–100% 鲁棒，但附表的 π0 在若干条件下为零；概念上只能保留具体策略、两个诊断任务与采样范围的结果，不能传播为全基准结论。完整冲突见来源页。

**我们的实践解释：** 先保存参数先验、每次执行的参数与结果，再比较后验富集或直接分层成功率；怀疑某参数后，用匹配其余变量的干预对照复测。若多参数同时变化，要报告联合关系，避免把相关参数的边缘分布误当独立原因。最后仍需以现实实验核对 [[SimulationRealityGap|现实差距]]。

## 研究归属

[[topics/evaluation-and-transfer|评测与 Sim-to-Real]] · [[topics/robot-policy-learning|机器人策略学习]] · [[topics/policy-evaluation|策略评测]]。
