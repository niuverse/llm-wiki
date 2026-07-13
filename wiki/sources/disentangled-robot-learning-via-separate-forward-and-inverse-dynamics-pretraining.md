---
title: "Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining"
type: source
tags: [robotics, vla, inverse-dynamics, world-models, robot-learning-from-videos]
sources: []
last_updated: 2026-07-13
source_file: raw/disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining.pdf
source_kind: pdf
source_url: https://openreview.net/forum?id=DdrsHWobR1
extracted_text: graph/extracts/disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining.md
source_date: 2026-01-26
---

## 摘要

这篇 ICLR 2026 论文提出 [[DeFI]]：把机器人策略学习拆成两个先分开预训练、再耦合微调的动力学模块。[[InverseDynamicsModels|逆动力学模型]] 不再只是一个轻量动作解码器，而是和正向动力学一样被当成需要规模预训练的核心能力。

DeFI 的阶段 I 包含两个并行预训练任务。GFDM（一般性正向动力学模型）用稳定的视频扩散和截断文本条件化，从当前观测与指令预测未来视频特征；GIDM（一般性逆动力学模型）则用 DINOv2 当前/未来帧特征、T5 指令嵌入、空间时间 Transformer 与 VQ-VAE 码本，从 unlabeled 视频转移中学习 discrete 潜在动作。GIDM 预训练时刻意不使用机器人动作和 proprioceptive 状态，只用帧与文本指令，通过重建未来 DINO 特征来逼迫潜在动作代码捕捉转移中的动作相关的信息。

阶段 II 中，GFDM 冻结的，只做单一步骤 denoising 产生 16-帧未来表征；这些未来特征经 MLP 对齐到 GIDM 输入流形，GIDM 推断潜在动作序列，再由扩散基于动作 adapter 转成可执行的机器人命令。论文的核心判断是：大规模动作-free 人类/视频数据不只适合学正向视频预测，也可以通过 self-supervised 逆动力学预训练学到动作表示。

来源网址: https://openreview.net/forum?id=DdrsHWobR1

PDF 网址: https://openreview.net/pdf?id=DdrsHWobR1

## 核心主张

- Entangled VLA 训练把 2D 未来预测和 3D 动作预测绑在一起，容易产生目标 misalignment，也限制模型使用动作-free web/人类视频；DeFI 改成先分开学 GFDM/GIDM，再在下游机器人数据上耦合。
- GIDM 的训练样本是 $(o_t,o_{t+n},\ell)$，其中 $o_t$ 是当前帧，$o_{t+n}$ 是约 1 秒后的未来帧，$\ell$ 是语言指令。模型先提取 DINO 特征 $e_t,e_{t+n}$，再让可学习的动作查询通过因果空间时间 Transformer 和 VQ-VAE 码本形成 discrete 潜在动作标记。
- GIDM 的代理目标是用潜在动作标记和当前 DINO 状态重建未来 DINO 状态。这个目标把逆动力学写成 self-supervised 表示学习：如果潜在动作没有捕捉转移里可控的动作因素，解码器就无法稳定重建未来特征。
- 预训练数据分工明确：GFDM 使用 Fractal、Bridge、CALVIN-ABC、Something-Something-v2、Ego4D；GIDM 使用 Open X-机器人形态中单一机械臂末端执行器控制子集和 Ego4D，且在 GIDM 预训练中排除动作/proprio 标签。
- 在 CALVIN ABC-D 多视角设置中，DeFI 的平均任务长度达到 4.51，高于 VPP 的 4.33、Seer 的 4.28、UP-VLA 的 4.08 和 OpenVLA 的 3.27。在第三人称视角设置下，DeFI 达到 4.05，高于 UniVLA 的 3.80。
- SimplerEnv-Fractal Google 机器人上，DeFI 在视觉匹配平均 51.2%，在变体汇总平均 45.4%。论文也指出 Open/Close Drawer 等任务仍受 GFDM 现实世界预训练域不匹配影响，错误会传递到 GIDM 并生成 wrong 动作。
- 现实世界 Franka Panda 实验覆盖 8 个任务、1600 轨迹；DeFI 平均成功率 81.3%，高于扩散策略 48.2%、Octo-基座 34.4%、OpenVLA 43.8。
- 消融支持逆动力学不是次要模块：CALVIN 中 GFDM 不含预训练为 3.28，GIDM 不含预训练为 4.16，完整解耦的预训练为 4.51；MLP 逆模型为 3.42，plain Transformer 为 4.22，GIDM 为 4.51。
- VQ-VAE 离散化同时是动作 tokenization 和信息瓶颈。论文认为它减少未来状态 leakage，让模型不能只靠低层视觉 shortcut，而必须把转移压成 meaningful 潜在动作表示。
- 失败统计显示，CALVIN 200 个失败样本中，62% 属于正向动力学失败，主要是接触丰富或 cluttered 交互中的 hallucinated / 物理上 implausible 未来；38% 属于逆动力学失败，即未来预测看起来准确但 IDM 仍输出 wrong 动作。

## 关键引文

- "accurate action inference is as important"

## 关联

- [[DeFI]] - 本来源的核心模型/实体。
- [[InverseDynamicsModels]] - 机制页：GIDM 如何从 unlabeled 视频转移学潜在动作。
- [[LatentDynamicsActionModels]] - DeFI 与 LDA-1B 都把动作表示和动力学预训练作为机器人基础模型的扩展路径。
- [[VisionLanguageActionModels]] - DeFI 针对 VLA 中未来预测与动作预测 entanglement 的问题给出 separate 预训练解法。
- [[WorldModelsForEmbodiedAI]] - GFDM 是决策-耦合的视觉正向动力学模型，但论文强调正向预测 alone 不够，必须配合逆动作推理。
- [[SimulationRealityGap]] - DeFI 的 SimplerEnv 实验和失败分析暴露了 GFDM 域不匹配、复杂接触场景中的错误想象，以及 IDM 错误动作的逐步传播。

## 开放问题

- 来源页面显示 GitHub 代码和 HuggingFace 入口，但 extraction 没有保留具体链接；需要后续补充代码、检查点、许可证和可复现性状态。
- GIDM 预训练不使用动作/proprio 标签，但最终策略仍依赖动作 adapter 在下游机器人动作数据上语义落地。它学到的是 transferable 潜在动作表示，不等于完全动作-free 策略学习。
- 未来 DINO 重建是否足够约束接触力、tactile 滑移、抓取稳定性或可变形物体状态仍不清楚；论文自己的失败分析已显示接触丰富和 cluttered 场景是主要正向模型瓶颈。
- VQ 码本让潜在动作离散化并稳定训练，但不同机器人形态、控制频率和动作空间是否共享同一标记语义仍需要跨机器人形态复现实验。
- 冻结的 GFDM 提供稳定潜在空间，但当部署域与 GFDM 预训练域不匹配时，错误会传给 GIDM；如何在不造成表示漂移的情况下做域 adaptation 是后续问题。
