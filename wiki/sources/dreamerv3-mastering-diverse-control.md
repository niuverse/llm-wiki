---
title: "DreamerV3：在想象中学习控制策略"
type: source
tags: [world-models, robotics, reinforcement-learning, source-backed]
sources: []
source_file: raw/dreamerv3-nature-2025.html
source_kind: html
source_url: https://www.nature.com/articles/s41586-025-08744-2
extracted_text: graph/extracts/dreamerv3-nature-2025.md
source_date: 2025-04-02
modified: 2026-10-04
source_type: paper
paper_title: "Mastering diverse control tasks through world models"
year: 2025
venue: "Nature"
reviewed: 2026-10-04
topics: ["topics/world-models-and-representations", "topics/planning-and-control", "topics/world-model-decision"]
---

# DreamerV3：在想象中学习控制策略

## 一屏概览

**研究问题。** 同一强化学习算法怎样在图像／向量观测、离散／连续动作、稀疏／密集奖励之间复用配置，同时保持学习稳定性与数据效率？

**方法贡献。** Danijar Hafner、Jurgis Pasukonis、Jimmy Ba、Timothy Lillicrap 将世界模型、价值评估器和演员策略协同训练：模型学习真实经验，演员主要在潜在想象中改进行为；执行时直接从演员采样动作，不进行前瞻搜索。第三代的重点是归一化、KL 平衡、分布混合和数值变换的配合，以及可扩大的网络与优化实现。

**证据范围。** [Nature 2025 正式版本](https://www.nature.com/articles/s41586-025-08744-2)在八类基准、超过 150 个任务上逐任务训练，显示算法配置可复用；**不是一个同权重策略同时解决所有领域**。本文的模型、回放和优化器设置不能用早期 arXiv 版代替。下文引用以正式全文的章节名和图号定位。

## 方法：从真实经验到想象行为

令 $x_t$ 为观测，$a_t$ 为动作，$r_t$ 为奖励，$c_t\in\{0,1\}$ 为回合继续标记；确定性记忆 $h_t$ 与随机潜在变量 $z_t$ 合成模型状态 $s_t=(h_t,z_t)$。世界模型为 RSSM：

$$
h_t=f_\phi(h_{t-1},z_{t-1},a_{t-1}),\quad
z_t\sim q_\phi(z_t\mid h_t,x_t),\quad
\hat z_t\sim p_\phi(z_t\mid h_t).
$$

编码器后验 $q_\phi$ 利用当前观测纠正状态，先验 $p_\phi$ 在没有未来观测时预测状态；解码器、奖励预测器与继续标记预测器从 $(h_t,z_t)$ 读取信息。$z_t$ 由一组分类变量组成，采样使用直通梯度估计。真实轨迹训练后验和先验，想象轨迹只沿先验生成。结构见“World model learning”、图 1；RSSM 的起点见 [[planet-learning-latent-dynamics|PlaNet]]。

### 世界模型的三种压力

用 $q_t,p_t$ 简写当步后验与先验，$\operatorname{sg}$ 为停止梯度：

$$
\mathcal L_{\rm model}=\mathbb E\sum_t
\left[\mathcal L_{\rm pred}+\mathcal L_{\rm dyn}+0.1\mathcal L_{\rm rep}\right],
$$

$$
\mathcal L_{\rm dyn}=\max\{1,D_{\rm KL}(\operatorname{sg}(q_t)\Vert p_t)\},\qquad
\mathcal L_{\rm rep}=\max\{1,D_{\rm KL}(q_t\Vert\operatorname{sg}(p_t))\}.
$$

$\mathcal L_{\rm pred}$ 包含观测重建、奖励和继续标记的预测损失。动力学项让先验追随后验，表示项让后验更可预测；两者不同的梯度方向与权重构成 KL 平衡。1 nat 的下限意味着损失较小时不再施加压缩梯度，为保留有用信息留出空间。分类分布再加入 1% 均匀混合，避免零概率造成 KL 激增。上述机制解决的是表示可预测性与信息量之间的平衡，并非让重建误差越低越好（“World model learning”）。

### 分类状态为何还能反向传播

**直通估计的教学写法。**对一组分类变量，令 $\rho$ 为网络给出的类别概率，$z_{\rm hard}$ 为抽样得到的独热向量，可以用

$$
\tilde z=\operatorname{sg}(z_{\rm hard}-\rho)+\rho
$$

理解前向与反向的分工：前向数值等于离散样本，反向把该节点对概率的导数近似为恒等映射。这是有偏梯度估计，不是让离散采样突然成为精确可微运算；“World model learning”明确采用直通梯度。它用于世界模型的表示学习，与演员随后使用的 REINFORCE 是两个不同位置的选择。

如果这组变量有 $C$ 类，均匀混合使概率变为 $\tilde\rho_i=0.99\rho_i+0.01/C$，每类都有正下限。由此可直观看到为何它能避免先验把后验需要的类别赋成零概率、导致 KL 尖峰。另一方面，KL 截到 1 nat 以下时停掉压缩梯度，让观测与奖励预测继续改善表示。二者分别处理概率极端值和压缩压力，并非同一个正则的重复实现。

### 价值学习：有限想象如何考虑更远后果

从真实重放的状态出发，用演员 $\pi_\theta(a\mid s)$ 与模型生成长度 16 的想象轨迹。价值评估器 $v_\psi$ 预测回报分布，用自举的 $\lambda$ 回报作目标。为说明递推，下面采用「$r_t$ 是从 $s_t$ 到 $s_{t+1}$ 的奖励」的统一索引，属于对原文记号的教学整理：

$$
G_t^\lambda=r_t+\gamma c_t\left[(1-\lambda)v_\psi(s_{t+1})+\lambda G_{t+1}^\lambda\right],\qquad
G_H^\lambda=v_\psi(s_H).
$$

$\gamma=0.997$ 是折扣系数，$\lambda$ 调节一步自举与较长回报之间的权重，$H$ 是想象终点。终点价值使有限预测不必覆盖全部奖励延迟；继续标记在终止后关闭自举。价值网络还在真实重放轨迹上接受较低权重 0.3 的学习信号，并向自身 EMA 网络的预测做正则，减少自举不稳定（“Critic learning”）。

### 策略学习：模型给经验，演员学会选动作

演员使用 REINFORCE 估计器处理离散和连续动作。按原文「最大化回报与熵」的文字说明，可把策略更新解释为增加下述优势加权对数概率与熵目标：

$$
J_\pi=\mathbb E\sum_t\left[
\operatorname{sg}\!\left(\frac{G_t^\lambda-v_\psi(s_t)}{\max(1,S)}\right)\log\pi_\theta(a_t\mid s_t)
+\eta\mathcal H(\pi_\theta(\cdot\mid s_t))\right],
$$

$$
S=\operatorname{EMA}\!\left(P_{95}(G^\lambda)-P_{5}(G^\lambda),0.99\right),\qquad \eta=3\times10^{-4}.
$$

$P_p$ 是批次回报的第 $p$ 百分位数。只缩小大回报、不放大小于 1 的范围，避免稀疏奖励时把估计噪声放大到压过探索熵。策略优势停止梯度，因此不应把 Nature 版解释为依靠对整条动力学链求导来更新演员。执行时，模型负责根据新观测维护状态，演员直接给动作（“Actor learning”）。这与 [[td-mpc2-scalable-robust-world-models|TD-MPC2]] 执行时继续搜索不同；通用机制见 [[ImaginedPolicyLearning|想象中的策略学习]]。

### 数值稳定：压缩输入与分布式标量预测

向量观测使用

$$
\operatorname{symlog}(x)=\operatorname{sign}(x)\log(1+|x|),\qquad
\operatorname{symexp}(x)=\operatorname{sign}(x)(\exp(|x|)-1).
$$

变换在原点附近近似恒等，在大幅度处压缩正负数值。奖励和价值则用 **symexp 间隔的桶**及双桶软标签训练：真实标量位于相邻桶之间时，按距离分配两个权重，最小化交叉熵；读出时按桶位置的概率加权平均得到连续预测。正式版的这套读出应与早期版本区分，不能统一改写成「先预测 symlog 均值，再 symexp」。图像重建也不应笼统说成所有像素都做同一种向量 symlog 处理（“Robust predictions”“Methods / Distributions”）。

**双桶回归如何稳定梯度？**令相邻实际桶位置为 $b_k\le y\le b_{k+1}$，目标权重为

$$
w_k=\frac{b_{k+1}-y}{b_{k+1}-b_k},\qquad
w_{k+1}=\frac{y-b_k}{b_{k+1}-b_k}.
$$

其他 $w_i=0$。若输出概率为 $p_i=\operatorname{softmax}(\ell)_i$，则损失 $-\sum_iw_i\log p_i$ 对输出逻辑值的导数为 $\partial L/\partial\ell_i=p_i-w_i$。**这是基于原文分布定义的教学推导：**目标的绝对数值可以很大，但这一层导数没有平方误差里直接乘上的巨大数值残差；它不保证网络所有层的梯度都与任务尺度无关。比如目标位于相邻桶间30%的位置，就分别分配0.7和0.3，而不是硬归入一个桶。此例只说明插值，不代表论文实际桶间距恒定。

同一机制同时服务奖励和价值网络，使模型预测与价值自举使用相容的宽范围标量表示；演员另用分位数回报归一化控制优势与熵的相对权重。三处设计共同服务“固定配置跨任务重训”的目标（“Robust predictions”“Methods / Distributions”）。

Nature 版还使用分块 GRU、RMSNorm、SiLU、自适应梯度裁剪与 LaProp；经验重放采用在线队列补充均匀采样，并保存、更新潜在状态。它们属于正式版本的算法实现，单独把跨任务稳健性归功于模型变大或某一个损失，会丢失论文实际贡献（“Methods / Previous generations”“Implementation”）。

## 实验与消融

| 实验问题 | 原文定位 | 结果与解释范围 |
|---|---|---|
| 配置能否跨领域复用 | “Evaluation / Benchmarks”、图 4 | Atari、ProcGen、DMLab、Atari100k、本体与视觉 Control Suite、BSuite、Minecraft；按领域规定预算，不是共同数据量的统一比赛 |
| 连续控制 | 同上；“Methods / Protocols” | 本体与视觉 Control Suite 各 20 任务、1M 环境步；作者报告本体表现匹配强基线、视觉优于所比较方法；不覆盖 TD-MPC2 全部 104 任务 |
| Minecraft 从零探索 | 图 5、扩展图 2；“Methods / Minecraft” | 10 个训练种子都在 100M 环境步以内发现钻石；“每次训练都发现”不等于“每回合成功” |
| 稳定性组件的价值 | 图 6a，14 个任务 | KL 平衡和最低信息阈值作用最突出，其次是回报归一化与双桶回归；单个组件只在部分任务上关键 |
| 表示依赖什么学习信号 | 图 6b | 阻断重建梯度的损害较大，支持该模型对无监督表示目标的依赖；不能解释成训练完全不需要奖励 |
| 更大模型与更多重放 | 图 6c–d | Crafter 与一个 DMLab 任务，6 种模型规模 12M–400M；扩大规模和重放量改善性能／数据效率，不是所有任务上的普遍规模定律 |

默认模型约 200M，每个代理在单张 A100 上训练；通常 5 个种子，BSuite 和 Minecraft 各 10 个。回放比随基准数据预算选择，环境实例数量也不同。原文将重放比定义为训练时间步数与收集时间步数之比，不能不经批次长度、动作重复换算就与其他论文的「每环境步梯度更新次数」比较（“Methods / Computational choices”“Experience replay”）。

## 局限与我们的解释

**Minecraft 的任务边界。** 观测除 $64\times64$ 图像外还有背包、已达到里程碑、装备、生命等信息；奖励包括 12 个物品里程碑与生命变化，动作有抽象合成操作，并加快方块破坏速度。结果支持该 MineRL 衍生协议下的从零学习，不能写成未经修改游戏、只有图像和唯一钻石奖励的学习。

**版本与证据边界。** 这里完整重读了归档 Nature HTML 的正文、方法与扩展图说明。扩展数值表是独立网页，补充信息是独立 PDF，均不包含在该 HTML 正文中；本页没有冒充已经逐项复核这些独立资料。所有数值和结论以当前完整可读正文明确给出的内容为限。跨版本比较见 [[WorldModelEvaluation|世界模型评估]]。

**我们的解释。** 本文最强的证据是「一个算法设计能较稳定地重新学习多种环境」，不是「一个世界模型已积累所有领域的共同知识」。想象策略能减少真实交互需求，但仍依赖真实探索数据及模型有效范围；视频看起来合理并不保证策略优化时不会利用模型误差。

<details>
<summary>资料版本与归档</summary>

阅读版本为 Nature 正式发表全文及方法部分，2025-04-02 的版本记录，DOI `10.1038/s41586-025-08744-2`。获取日期：2026-10-02；保存官方完整 HTML（PDF 下载重定向未成功）；SHA-256：`961c2df364600df94f33168278d64146451bf4cfe0406d9773446d4ebc0a047a`。未以 2024 年 arXiv 版本冒充 Nature 版。官方实现：<https://github.com/danijar/dreamerv3>。

</details>

## 研究归属

[[topics/world-models-and-representations|世界模型与表征]] · [[topics/planning-and-control|规划与控制]] · [[topics/world-model-decision|世界模型如何用于决策]]。
