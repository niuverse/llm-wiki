---
title: "训练数据构成"
type: concept
tags: [robotics, imitation-learning, generalization]
sources: ["[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[lda-1b-scaling-latent-dynamics-action-model]]"]
modified: 2026-10-04
topics: ["topics/evaluation-and-transfer", "topics/robot-policy-learning", "topics/policy-evaluation"]
---

# 训练数据构成

数据构成描述机器人学习看到了哪些任务、场景、来源与质量的数据，以及各类数据如何进入训练。样本总数只说明存量，不能说明实际梯度中谁占主导。[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]] 的受控实验分别改变任务覆盖、场景覆盖、示范来源和训练阶段，是理解这些维度的具体案例。

## 数据存量、采样权重与学习目标

将数据划为 $D_1,\ldots,D_K$，教学上的混合采样分布可写为：

$$
q(z)=\sum_{j=1}^{K}\alpha_jq_j(z),\qquad
\alpha_j\ge0,\quad\sum_j\alpha_j=1.
$$

$z$ 是训练样本，$q_j$ 是第 $j$ 类的内部采样分布，$\alpha_j$ 是其采样概率。对应监督目标可写为 $\mathcal L(\theta)=\sum_j\alpha_j\mathbb E_{z\sim q_j}[\ell(\theta;z)]$。这里的符号是教学表达；仅在按样本均匀采样等条件下，$\alpha_j$ 才等于数据量占比。按轨迹、时间步、动作块或任务均衡采样，会形成不同分布。RoboCasa365 没有完整交代所有混合实验的采样权重，不能默认均匀采样。

数据质量也与目标有关。专家动作模仿、奖励优化、动力学预测可利用的轨迹不同；包含失败的轨迹可能提供转移信息，却不是等价的成功专家示范。目标区别见 [[RobotLearningObjectives|机器人学习目标]]，按数据路由多个目标的案例见 [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]]。

### 数量怎样变成优化权重

**教学计算，非论文实际采样声明：** 若将30k 人类轨迹与600k 合成轨迹合并并按轨迹均匀抽样，合成来源的概率为 $600/(600+30)\approx95.2\%$。若先等概率选来源，再从来源内选轨迹，则两边各50%，相同数据存量产生不同训练分布。再改成对所有时间步均匀抽样，较长轨迹会占更多权重。

由于 $\nabla_\theta\mathcal L=\sum_j\alpha_j\mathbb E[\nabla_\theta\ell_j]$，来源权重直接改变平均更新方向；它不只是下载目录占了多少空间。实际梯度大小还由损失尺度和模型状态决定，所以50%采样也不保证恰好50%参数变化。RoboCasa365的具体混合权重未完整报告，应保留这个未知量，而不是从轨迹数量反推作者采样器。

## RoboCasa365 实际改变了什么

其预训练人类数据覆盖 300 任务，每任务约 100 条，约 30k 示范；MimicGen 扩增覆盖 60 原子任务、约 600k 条；目标集为 50 任务、每任务 500 条，约 25k 条。后者独立于预训练任务／场景划分。预训练 50 布局×50 风格构成 2,500 个厨房，目标使用 10 个固定厨房；风格组合不等于 2,500 次现实场景扫描。[§4、附录 F] [[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|来源与统计范围]]

| 变量 | 原文对照 | 支持的判断与限制 |
| --- | --- | --- |
| 目标数据量 | 10／30／100% 目标示范：只用目标数据 21.0／34.3／43.7%，预训练后适配 35.9／42.2／51.1% | 所测设置下预训练收益依目标数据预算而变 |
| 预训练任务覆盖 | 少量目标数据时 Human50 34.7%、Human300 40.0% | 增加任务同时增加人类数据，未隔离任务多样性的纯效应 |
| 合成数据加入 | Human300+MG60 对应 35.9%，低于 Human300；全部目标数据时 51.1% 对 52.5% | 该混合配置没有提高结果；不能单凭此确定是质量、权重、分布或优化原因 |
| 场景覆盖 | 5／25／2,500 场景，零样本 29.6／39.6／44.7%，适配后 53.3／56.7／62.4% | 这是 17 个原子任务上的实验，不能推广为全部 365 任务的增益 |
| 训练调度 | 联合训练 22.5%、先预训练再目标适配 51.1% | 前者 120k 步，后者 80k+60k 步，顺序与预算混杂 |

以上数值对应原文 §4.2、§4.4、附录 H.1与 H.3，具体骨干、目标集与预算见来源页；不同表行不可拼成同一次实验。

## 阶段为何不能只用一个比例描述

教学上，两阶段训练是 $\theta_1=\operatorname{Train}(\theta_0,D_{\mathrm{pre}})$，再令 $\theta_2=\operatorname{FineTune}(\theta_1,D_{\mathrm{target}})$。即使两阶段累计看到的样本与联合采样相同，优化状态、学习率和参数起点仍不同，不能从全程数据比例推断最终策略相同。RoboCasa365 支持比较其具体调度方案，但不足以独立证明哪一种机制导致差距。

还要区分“预训练时未见”与“整个训练过程未见”：目标微调可以使用原先未见组合任务的示范。生成数据的质量门控也会改变分布；例如 [[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|MagicSim]] 默认成功才写出完整示范，因此输出数据反映筛选后的执行，而不是全部尝试的原始分布。

**我们的实践解释：** 报告至少应同时给出每类任务／场景数、轨迹数、时长、采样单位与权重、过滤比例、训练阶段和步数。要判断“质量”或“多样性”的原因，应在预算与其余变量匹配时分别改变它们；单纯加入更多数据后的下降只定位到一种混合配置。

## 研究归属

[[topics/evaluation-and-transfer|评测与 Sim-to-Real]] · [[topics/robot-policy-learning|机器人策略学习]] · [[topics/policy-evaluation|策略评测]]。
