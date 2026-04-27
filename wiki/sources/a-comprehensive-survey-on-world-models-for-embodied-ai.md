---
title: "A Comprehensive Survey on World Models for Embodied AI"
type: source
tags: [embodied-ai, world-models, robotics, autonomous-driving, evaluation]
sources: []
last_updated: 2026-04-27
source_file: raw/a-comprehensive-survey-on-world-models-for-embodied-ai.html
source_kind: html
source_url: https://arxiv.org/abs/2510.16732
extracted_text: graph/extracts/a-comprehensive-survey-on-world-models-for-embodied-ai.md
source_date: 2025-11-29
---

## 摘要

Xinqing Li、Xin He、Le Zhang、Min Wu、Xiaoli Li 和 Yun Liu 的 survey 把 embodied AI 中的 [[WorldModelsForEmbodiedAI|world models]] 定义为 action-aware internal simulators：agent 不只是识别当前 scene，还要预测 action 如何改变 future world states，并把这些 rollouts 用于 perception、prediction、planning 和 control。

论文的核心贡献是一个三轴 [[WorldModelTaxonomy|taxonomy]]：Functionality 分成 Decision-Coupled 与 General-Purpose；Temporal Modeling 分成 Sequential Simulation and Inference 与 Global Difference Prediction；Spatial Representation 分成 Global Latent Vector、Token Feature Sequence、Spatial Latent Grid 和 Decomposed Rendering Representation。论文还用 POMDP 与 variational latent-state learning formalize world model objective，并系统整理 datasets、metrics、performance comparisons 与 open challenges。

Source URL: https://arxiv.org/abs/2510.16732

## 核心主张

- Embodied AI 的 world model 应该产生 actionable predictions，而不是只做 static scene description 或不受 action 控制的 video generation。
- 数学上，论文把 interaction 写成 POMDP：observation $o_t$、action $a_t$、不可见 true state $s_t$ 和 learned latent state $z_t$。Model 学习 dynamics prior $p_\theta(z_t \mid z_{t-1}, a_{t-1})$、filtered posterior $q_\phi(z_t \mid z_{t-1}, a_{t-1}, o_t)$ 与 reconstruction model $p_\theta(o_t \mid z_t)$。
- Training objective 是 ELBO：reconstruction likelihood 鼓励 faithful observation prediction，KL regularization 把 filtered posterior 对齐到 action-conditioned dynamics prior。因此 world model 的核心不是 pixel decoder，而是能支撑 rollout 的 latent predictive memory。
- [[WorldModelTaxonomy|三轴 taxonomy]] 把方法按照 function、temporal reasoning 和 spatial representation 组织起来。这个 taxonomy 解释了为什么 Dreamer-style RSSM、tokenized Transformer、BEV/voxel occupancy forecasting、NeRF/3DGS digital twin 和 JEPA/video diffusion 方法都可以被放到同一个 map 中比较。
- [[WorldModelEvaluation|evaluation]] 需要从 pixel prediction quality 上升到 state-level understanding 和 task performance。论文明确指出 FID/FVD 这类 perceptual metrics 容易忽略 physical consistency、dynamics 和 causality。
- Data resources 仍然 fragmented：robot manipulation、navigation、autonomous driving 和 general video pretraining 使用不同 datasets、modalities 与 protocols，缺少 unified multimodal cross-domain dataset。
- Computational efficiency 是 embodied control 的硬约束。Transformer 与 Diffusion models 表现强，但 inference cost 与 real-time control 冲突；RNN、RSSM、Global Latent Vector 和 SSM/Mamba-style approaches 在效率上更有吸引力，但各自牺牲 expressiveness 或 long-range modeling。
- Sequential rollouts sample-efficient、compact 且 interactive，但容易 error accumulation；Global Difference Prediction 可以并行估计未来状态并减轻多步 drift，但计算更重、closed-loop interactivity 更弱。
- Spatial representation 也有 tradeoff：Global Latent Vector 高效但丢细节；Token Feature Sequence 适合 multimodal dependency 和 LLM reuse；Spatial Latent Grid 保留 geometry/locality；Decomposed Rendering Representation 如 NeRF/3DGS 有 high fidelity 和 view consistency，但 dynamic scenes 上 scalability 较弱。
- Performance comparison 说明 benchmark 结果已经显著进步，但不同 methods 的 resolution、input modality、auxiliary supervision、episode budget 和 task subset 差异很大，导致 direct comparison 仍然困难。

## 关键引文

- "internal simulators"
- "physical consistency over pixel fidelity"
- "long-horizon temporal consistency"

## 关联

- [[WorldModelsForEmbodiedAI]] - 论文的数学和机制层核心：POMDP、latent state、dynamics prior、filtered posterior、ELBO 与 rollout intuition。
- [[WorldModelTaxonomy]] - 论文提出的 Functionality x Temporal Modeling x Spatial Representation 三轴分类。
- [[WorldModelEvaluation]] - paper 中 datasets、metrics、performance tables 与 evaluation failure modes 的整理。
- [[AwesomeWorldModels]] - 论文配套 curated bibliography，把 taxonomy 映射到持续维护的 paper list。
- [[SimulationRealityGap]] - source 中的 S2R、physical consistency 与 real-time embodied control 讨论，为已有 contact simulation gap 增加 learned-simulator lens。
- [[DifferentiablePhysics]] - paper 中的 decomposed rendering、3DGS、differentiable rendering 和 physics-informed world models 与可微 simulation 方向相关。

## 开放问题

- 论文的 taxonomy 是否足够表达 hybrid systems：例如同时有 RSSM latent dynamics、diffusion decoder、geometry memory 和 VLM critic 的 systems？
- Pixel/state/task metrics 之间如何建立 causal relation：pixel quality 改善在什么条件下会真正提升 MPC、RL 或 robot manipulation success rate？
- 物理一致性应该如何 operationalize：energy conservation、contact consistency、causal intervention accuracy、closed-loop task success，还是 simulator-to-real transfer？
- [[AwesomeWorldModels]] 继续扩展时，taxonomy 是否需要加上 evaluation protocol、availability、license、training data scale 和 real-robot validation 的 structured metadata？
