---
title: "Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining"
type: source
tags: [robotics, vla, inverse-dynamics, world-models, robot-learning-from-videos]
sources: []
last_updated: 2026-04-27
source_file: raw/disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining.pdf
source_kind: pdf
source_url: https://openreview.net/forum?id=DdrsHWobR1
extracted_text: graph/extracts/disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining.md
source_date: 2026-01-26
---

## 摘要

这篇 ICLR 2026 paper 提出 [[DeFI]]：把 robot policy learning 拆成两个先分开预训练、再耦合微调的 dynamics modules。[[InverseDynamicsModels|inverse dynamics model]] 不再只是一个轻量 action decoder，而是和 forward dynamics 一样被当成需要 scale pretraining 的核心能力。

DeFI 的 Stage I 包含两个并行预训练任务。GFDM（General Forward Dynamics Model）用 Stable Video Diffusion 和 CLIP text conditioning，从 current observation 与 instruction 预测 future video features；GIDM（General Inverse Dynamics Model）则用 DINOv2 current/future frame features、T5 instruction embedding、spatial-temporal Transformer 与 VQ-VAE codebook，从 unlabeled video transitions 中学习 discrete latent actions。GIDM 预训练时刻意不使用 robot actions 和 proprioceptive states，只用 frames 与 text instruction，通过 reconstruction future DINO features 来逼迫 latent action code 捕捉 transition 中的 action-relevant information。

Stage II 中，GFDM frozen，只做 single-step denoising 产生 16-frame future representations；这些 future features 经 MLP 对齐到 GIDM input manifold，GIDM 推断 latent action sequence，再由 diffusion-based action adapter 转成 executable robot commands。论文的核心判断是：large-scale action-free human/video data 不只适合学 forward video prediction，也可以通过 self-supervised inverse dynamics pretraining 学到 action representation。

Source URL: https://openreview.net/forum?id=DdrsHWobR1

PDF URL: https://openreview.net/pdf?id=DdrsHWobR1

## 核心主张

- Entangled VLA training 把 2D future forecasting 和 3D action prediction 绑在一起，容易产生 objective misalignment，也限制模型使用 action-free web/human videos；DeFI 改成先分开学 GFDM/GIDM，再在 downstream robot data 上耦合。
- GIDM 的训练样本是 $(o_t,o_{t+n},\ell)$，其中 $o_t$ 是 current frame，$o_{t+n}$ 是约 1 秒后的 future frame，$\ell$ 是 language instruction。模型先提取 DINO features $e_t,e_{t+n}$，再让 learnable action queries 通过 causal spatial-temporal Transformer 和 VQ-VAE codebook 形成 discrete latent action tokens。
- GIDM 的 proxy objective 是用 latent action token 和 current DINO state 重建 future DINO state。这个 objective 把 inverse dynamics 写成 self-supervised representation learning：如果 latent action 没有捕捉 transition 里可控的动作因素，decoder 就无法稳定重建 future feature。
- Pretraining data 分工明确：GFDM 使用 Fractal、Bridge、CALVIN-ABC、Something-Something-v2、Ego4D；GIDM 使用 Open X-Embodiment 中 single-arm end-effector control 子集和 Ego4D，且在 GIDM pretraining 中排除 action/proprio labels。
- CALVIN ABC-D multi-view 中，DeFI 达到 4.51 average task length，高于 VPP 4.33、Seer 4.28、UP-VLA 4.08、OpenVLA 3.27。Third-view 设置下 DeFI 达到 4.05，高于 UniVLA 3.80。
- SimplerEnv-Fractal Google Robot 上，DeFI 在 visual matching 平均 51.2%，在 variant aggregation 平均 45.4%。论文也指出 Open/Close Drawer 等任务仍受 GFDM real-world pretraining domain mismatch 影响，错误会传递到 GIDM 并生成 wrong actions。
- Real-world Franka Panda 实验覆盖 8 个 tasks、1600 trajectories；DeFI 平均成功率 81.3%，高于 Diffusion Policy 48.2%、Octo-Base 34.4%、OpenVLA 43.8。
- Ablation 支持 inverse dynamics 不是次要模块：CALVIN 中 GFDM without pretraining 为 3.28，GIDM without pretraining 为 4.16，full decoupled pretraining 为 4.51；MLP inverse model 为 3.42，plain Transformer 为 4.22，GIDM 为 4.51。
- VQ-VAE discretization 同时是 action tokenization 和 information bottleneck。论文认为它减少 future-state leakage，让模型不能只靠低层视觉 shortcut，而必须把 transition 压成 meaningful latent action representation。
- 失败统计显示，CALVIN 200 个失败样本中，62% 属于 forward-dynamics failures，主要是 contact-rich 或 cluttered interaction 中的 hallucinated / physically implausible future；38% 属于 inverse-dynamics failures，即 future prediction 看起来准确但 IDM 仍输出 wrong action。

## 关键引文

- "accurate action inference is as important"

## 关联

- [[DeFI]] - 本 source 的核心 model/entity。
- [[InverseDynamicsModels]] - 机制页：GIDM 如何从 unlabeled video transitions 学 latent action。
- [[LatentDynamicsActionModels]] - DeFI 与 LDA-1B 都把 action representation 和 dynamics pretraining 作为 robot foundation model 的 scaling path。
- [[VisionLanguageActionModels]] - DeFI 针对 VLA 中 future forecasting 与 action prediction entanglement 的问题给出 separate pretraining 解法。
- [[WorldModelsForEmbodiedAI]] - GFDM 是 decision-coupled visual forward dynamics model，但 paper 强调 forward prediction alone 不够，必须配合 inverse action inference。
- [[SimulationRealityGap]] - DeFI 的 SimplerEnv 和 failure analysis 暴露了 GFDM domain mismatch、contact-rich hallucination 与 IDM wrong-action propagation。

## 开放问题

- Source 页面显示 GitHub Code 和 HuggingFace 入口，但 extraction 没有保留具体链接；需要后续补充代码、checkpoint、license 和 reproducibility 状态。
- GIDM pretraining 不使用 action/proprio labels，但 final policy 仍依赖 action adapter 在 downstream robot action data 上 grounding。它学到的是 transferable latent action representation，不等于完全 action-free policy learning。
- Future DINO reconstruction 是否足够约束 contact force、tactile slip、grasp stability 或 deformable object state 仍不清楚；论文自己的 failure analysis 已显示 contact-rich 和 cluttered scenes 是主要 forward-model bottleneck。
- VQ codebook 让 latent action 离散化并稳定训练，但不同 robot morphology、control frequency 和 action space 是否共享同一 token semantics 仍需要跨 embodiment 复现实验。
- Frozen GFDM 提供稳定 latent space，但当 deployment domain 与 GFDM pretraining domain 不匹配时，错误会传给 GIDM；如何在不造成 representation drift 的情况下做 domain adaptation 是后续问题。
