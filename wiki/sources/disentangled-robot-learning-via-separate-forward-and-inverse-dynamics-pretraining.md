---
title: "Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining"
type: source
tags: [robotics, vla, inverse-dynamics, world-models, source-backed]
sources: []
modified: 2026-10-04
source_file: raw/disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining.pdf
source_kind: pdf
source_url: https://openreview.net/forum?id=DdrsHWobR1
extracted_text: graph/extracts/disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining.md
source_date: 2026-01-26
source_type: paper
paper_title: "Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining"
year: 2026
venue: "ICLR 2026"
reviewed: 2026-10-04
topics: ["topics/robot-policy-learning", "topics/world-models-and-representations", "topics/future-conditioned-action"]
---

# DeFI：分别预训练未来预测与逆动力学

## 一屏概览

**研究问题。** 视频包含大量交互变化，却通常没有机器人动作标签。能否让“预测未来”和“把变化转换为动作”分别利用这些视频，再在机器人数据上接合？

**方法贡献。** DeFI 分别预训练指令条件视频模型 GFDM 和逆动力学表示模型 GIDM。后者用当前／未来图像之间的变化学习离散潜在动作，再通过机器人动作监督训练可执行动作适配器。无动作标签的是预训练阶段，不是最终控制策略。（§3、附录 A.2–A.3）

**证据结论。** CALVIN ABC-D 多视角平均连续任务长度为 4.51；去掉 GFDM 或 GIDM 预训练分别降到 3.28、4.16。结果支持两种预训练在该实现中均有贡献，但不证明分开训练普遍优于同预算联合训练。真机平均成功率 81.3% 来自八项 Franka 任务及论文特定重试协议。（表 1、3、4）

原文：[ICLR 2026 论文页](https://openreview.net/forum?id=DdrsHWobR1) · [PDF](https://openreview.net/pdf?id=DdrsHWobR1)。本页依据归档 PDF 的正文及附录完整复核，以下定位均指该版本。

## 方法：视频变化怎样变成机器人命令

### 两个预训练问题为何分开

普通行为克隆需要“观测—动作”配对；视频生成只需“当前—未来”图像，却不能自行给机器人命令。DeFI 的设计是让正向模块学“将发生什么视觉变化”，让逆向模块学“如何压缩这段变化”，最后才学习机器人动作的落地接口。这样两种视频预训练都能舍弃动作标签；代价是下游必须桥接正向预测特征与逆模型熟悉的 DINO 特征。（§2、3，图 2）

| 阶段 | 可见输入 | 训练监督或执行输出 | 参数与接口变化 |
| --- | --- | --- | --- |
| GFDM 预训练 | 当前帧、语言、加噪后的真实未来视频潜变量 | 预测注入的噪声 | 学视频预测；真实未来仅用于构造训练样本 |
| GIDM 预训练 | 当前／真实未来 DINO 特征、语言、动作查询 | 经潜在动作重建未来 DINO 特征 | 学视觉逆映射，不读取机器人动作标签 |
| 机器人微调 | 当前帧、语言、GFDM 预测特征 | 机器人动作序列 | 冻结 GFDM；训练逆模型与动作适配器，移除预训练重建解码器 |
| 执行 | 当前帧、语言 | 可执行动作序列 | 单步视频去噪取特征，再逆推和动作解码；不输入真实未来 |

该表按 §3 与附录 A.2–A.3 整理。特别要区分“训练时让模型看加噪目标以学去噪”和“部署时能看到目标真值”：前者是训练构造，后者并不存在。

### 1. GFDM 学习指令条件未来

令 $o_t$ 为当前图像，$\ell$ 为指令，$H$ 为预测时域。GFDM 基于 Stable Video Diffusion，以当前图像的 VAE 编码和 CLIP 指令嵌入为条件，预测未来视频。若 $z^{(0)}$ 是真实视频潜变量，$s$ 是扩散步、$\epsilon$ 是标准高斯噪声，则噪声预测目标为：

$$
z^{(s)}=\sqrt{\bar\alpha_s}z^{(0)}+\sqrt{1-\bar\alpha_s}\epsilon,
\qquad
\mathcal L_{\rm diff}=\mathbb E\|\epsilon-\epsilon_\theta(z^{(s)},s,o_t,\ell)\|_2^2.
$$

$\bar\alpha_s$ 是累积保留信号比例；这解释了为何训练需要完整视频，执行时却可只取预测特征。实际控制使用单步去噪获得 16 帧未来表征，多相机视角分别预测。**GFDM 没有接收待测试的机器人动作序列，因此它提供指令条件的预期未来，不能直接视作任意动作条件的物理模拟器。**（§3.1、3.4、4.1，式 1–3）

### 2. GIDM 用信息瓶颈学习潜在动作

取相隔约一秒的图像 $o_t,o_{t+n}$，以 DINOv2 提取 $e_t,e_{t+n}$；T5 提取语言嵌入。时空 Transformer 将这些嵌入与可学习动作查询组合，输出连续表示，再通过 VQ-VAE 码本量化成潜在动作 $u$。它不是关节角或末端命令，而是解释视觉变化的压缩编码。（§3.2）

$$
\tilde u=I_\phi(e_t,e_{t+n},\ell),\qquad
u=\operatorname{VQ}(\tilde u),\qquad
\mathcal L_{\rm GIDM}=\|D(e_t,u)-e_{t+n}\|_2^2+\mathcal L_{\rm VQ}.
$$

这里 $D$ 是未来特征解码器，$\mathcal L_{\rm VQ}$ 是码本学习与量化约束；该式按附录算法 1 简写，不增加原文未报告的损失权重。当前状态经解码器直接可见，而未来状态必须通过有限码本传递。作者认为这种瓶颈可抑制复制未来图像的捷径；表 8 支持量化设计的性能收益，但没有证明码本唯一识别出真实物理动作。

**瓶颈怎样起作用。** 若码本为 $\mathcal C=\{c_1,\ldots,c_K\}$，每个连续查询输出 $\tilde u_j$ 选择最近的码向量 $u_j=c_{k^*}$，其中 $k^*=\arg\min_k\|\tilde u_j-c_k\|^2$。$K$ 是码本大小，$j$ 是查询索引；这展开了原文的最近邻量化操作，不增加其未报告的损失系数。因为解码器已经收到当前状态，瓶颈可以集中表达“变化”；但它仍可能编码视角或外观变化，并不自动等价于末端位移。（§3.2、附录算法 1）

**教学例子。** 在“把抽屉拉开”的两帧中，GIDM 可学到解释抽屉开合变化的编码，而不需要知道示范者用了哪些关节角。部署时 GFDM 先提供预测的打开状态，再由动作适配器把潜在变化映射到当前机器人命令。这个例子说明跨视频学习和机器人落地的分工，不是论文新增实验，也不保证潜在编码跨形态具有完全相同的语义。

### 3. 下游耦合与执行

微调时**冻结 GFDM，更新 GIDM 和动作适配器**。MLP 把预测特征对齐到 GIDM 输入空间；视频特征聚合模块还提取 GFDM 中间层信息。扩散 Transformer 适配器结合潜在动作等条件，输出七维机器人动作。预训练用的未来 DINO 特征解码器在这一阶段移除。（§3.3–3.4、附录 A.3）

```mermaid
flowchart LR
  O["当前图像与指令"] --> F["冻结 GFDM：预测未来特征"]
  O --> C["当前 DINO 特征"]
  F --> P["特征投影与聚合"]
  P --> I["GIDM：推断潜在动作"]
  C --> I
  I --> A["扩散动作适配器"]
  P --> A
  A --> R["可执行机器人动作"]
```

图示强调预测、逆推与控制适配的责任；“端到端耦合”不表示所有参数共同更新。表 9 中全模型微调为 4.40，冻结 GFDM 并微调 GIDM＋适配器为 4.51。

## 数据、实验与消融

GFDM 的采样混合包括 Fractal 30%、Bridge 10%、CALVIN-ABC 30%、Something-Something-v2 15%、Ego4D 15%。GIDM 使用 Open X-Embodiment 单臂末端控制子集与 Ego4D，并舍弃机器人动作和本体状态标签。后续 CALVIN-ABC／Fractal／真机数据提供执行动作监督。（附录 A.2，表 11–12）

| 要核验的主张 | 原文结果与协议 | 证据位置与边界 |
| --- | --- | --- |
| 策略表现 | CALVIN ABC-D：多视角 4.51，VPP 4.33、Seer 4.28；第三人称单视角 4.05，UniVLA 3.80；评估 1,000 条五任务序列 | §4.2、表 1；视角与预训练数据不同，不把跨模型表当作单变量消融 |
| 仿真迁移 | SimplerEnv Google Robot：视觉匹配 51.2%，变体汇总 45.4%；抽屉任务分别为 38.6%、24.0%，低于表中 TraceVLA | §4.3、表 2；这是表中报告的汇总，不能从三个展示列简单算术平均重建 |
| 真机表现 | Franka 八任务、1,600 条微调轨迹；DeFI 81.3%，Diffusion Policy 48.2%、Octo 34.4%、OpenVLA 43.8% | §4.4、表 3；正文写每次试验最多允许 20 次连续尝试，不能解释成一次尝试成功率 |
| 两种预训练的作用 | 去 GFDM 预训练 3.28；去 GIDM 预训练 4.16；完整 4.51 | §4.5、表 4；控制的是本文配置中的预训练开关 |
| 逆模型结构的作用 | MLP 3.42、普通 Transformer 4.22、GIDM 4.51 | 表 7；结构、量化和训练方式须一起理解 |
| 未来图像更精细是否更好 | 单步去噪 4.51，五步 4.45；约 150 ms 对 250 ms | 表 6、§4.5；图像生成质量与闭环动作表现没有必然单调关系 |
| 该更新哪些模块 | 仅适配器 4.33；GFDM＋适配器 4.35；GIDM＋适配器 4.51；全部更新 4.40 | 表 9；作者将全更新下降解释为表征漂移，未单独测定这一因果机制 |

附录表 13 在 RTX 4090 上报告 GFDM 86.1 ms、GIDM 42.9 ms、动作适配器 24.3 ms，平均于五次运行；三项合计约 153.3 ms。它是模型推理耗时，不包含完整机器人感知和执行闭环。

## 局限与原文一致性

- 附录 A.4.2 将 200 个 CALVIN 失败样本分为预测失败 62%、逆推失败 38%。前者包括复杂接触、杂乱场景和多视角不一致；后者包括未来正确但抓取、放置或碰撞处理失败。比例的分母是失败样本，不是所有试验。
- §4.3 将部分 SimplerEnv 退化归因于冻结 GFDM 的真实／仿真域偏移。这是作者解释，结果本身没有排除其他因素。
- **表 5 存在内部矛盾。** “All w/o h.v.” 行列出 93.6、91.2、88.0、82.4、79.2，却写平均长度 3.92；按五级连续成功率求和应为 4.344。附录图 7 的零人类视频行另列 92.4、85.6、78.0、70.2、63.1，这些列值的和为 3.893，同样不能精确复原 3.92。本页保留这一冲突，不选择性拼成更强的消融结论。
- 附录 A.2 的“预训练未见 CALVIN”出现在 GIDM 数据段落，不能推广到整个 DeFI：GFDM 表 11 明列 CALVIN-ABC。
- 文本指令条件不等于通用语言交互；附录 A.6 明确缺少大语言模型支持的交互与具身推理能力。

## 我们的解释与关联

**我们的解释。** DeFI 最有复用价值的思想是让视频预测与动作恢复各自接受合适监督，再用动作标注接到硬件；它的实验证据支持这套配置，而没有消除视觉变化到控制命令的一对多性。码本是否跨机器人保持同一动作语义，以及 DINO 特征是否足够刻画接触和力，不能从重建损失下降直接推出。

机制基础见 [[InverseDynamicsModels|逆动力学模型]]、[[VisionLanguageActionModels|视觉—语言—动作模型]]；与 [[LatentDynamicsActionModels|潜在动力学动作模型]] 比较时，应区分离散潜在动作、潜在视觉状态和可执行动作。[[WorldModelsForEmbodiedAI|具身世界模型]] 与 [[SimulationRealityGap|仿真—现实差距]] 提供更广的预测与迁移背景。

## 研究归属

[[topics/robot-policy-learning|机器人策略学习]] · [[topics/world-models-and-representations|世界模型与表征]] · [[topics/future-conditioned-action|未来预测怎样帮助动作学习]]。
