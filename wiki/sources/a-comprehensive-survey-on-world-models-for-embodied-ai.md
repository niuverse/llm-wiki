---
title: "A Comprehensive Survey on World Models for Embodied AI"
type: source
tags: [embodied-ai, world-models, robotics, autonomous-driving, evaluation]
sources: []
last_updated: 2026-07-13
source_file: raw/a-comprehensive-survey-on-world-models-for-embodied-ai.html
source_kind: html
source_url: https://arxiv.org/abs/2510.16732
extracted_text: graph/extracts/a-comprehensive-survey-on-world-models-for-embodied-ai.md
source_date: 2025-11-29
---

## 摘要

Xinqing Li、Xin He、Le Zhang、Min Wu、Xiaoli Li 和 Yun Liu 的综述把具身 AI 中的 [[WorldModelsForEmbodiedAI|世界模型]] 定义为动作感知内部仿真器：智能体不只是识别当前场景，还要预测动作如何改变未来世界状态，并把这些轨迹采样用于感知、预测、规划和控制。

论文的核心贡献是一个三轴 [[WorldModelTaxonomy|taxonomy]]：功能分成决策-耦合的与一般性-Purpose；时间建模分成顺序式的仿真与推理与全局 Difference 预测；空间表示分成全局潜在 Vector、标记特征序列、空间潜在 Grid 和 Decomposed 渲染表示。论文还用 POMDP 与 variational 潜在状态学习形式化世界模型目标，并系统整理数据集、指标、性能比较与开放挑战。

来源网址: https://arxiv.org/abs/2510.16732

## 核心主张

- 具身 AI 的世界模型应该产生 actionable 预测，而不是只做静态场景描述或不受动作控制的视频生成。
- 数学上，论文把交互写成 POMDP：观测 $o_t$、动作 $a_t$、不可见真实状态 $s_t$ 和学得的潜在状态 $z_t$。模型学习动力学先验 $p_\theta(z_t \mid z_{t-1}, a_{t-1})$、filtered 后验 $q_\phi(z_t \mid z_{t-1}, a_{t-1}, o_t)$ 与重建模型 $p_\theta(o_t \mid z_t)$。
- 训练目标是 ELBO：重建 likelihood 鼓励 faithful 观测预测，KL regularization 把 filtered 后验对齐到动作条件化的动力学先验。因此世界模型的核心不是像素解码器，而是能支撑轨迹采样的潜在预测式内存。
- [[WorldModelTaxonomy|三轴 taxonomy]] 把方法按照函数、时间推理和空间表示组织起来。这个分类体系解释了为什么 Dreamer-风格 RSSM、tokenized Transformer、BEV/voxel occupancy 预测、NeRF/3DGS digital twin 和 JEPA/视频扩散方法都可以被放到同一个映射图中比较。
- [[WorldModelEvaluation|评估]] 需要从像素预测质量上升到状态层级 understanding 和任务性能。论文明确指出 FID/FVD 这类 perceptual 指标容易忽略物理一致性、动力学和 causality。
- 数据资源仍然 fragmented：机器人操作、导航、自主驱动和一般性视频预训练使用不同数据集、modalities 与 protocols，缺少统一的 multimodal 跨域数据集。
- Computational 效率是具身控制的硬约束。Transformer 与扩散模型表现强，但推理成本与实时控制冲突；RNN、RSSM、全局潜在 Vector 和 SSM/Mamba-风格 approaches 在效率上更有吸引力，但各自牺牲 expressiveness 或 long-range 建模。
- 顺序式的轨迹采样样本高效、compact 且交互式，但容易错误 accumulation；全局 Difference 预测可以并行估计未来状态并减轻多步漂移，但计算更重、闭环 interactivity 更弱。
- 空间表示也有取舍：全局潜在 Vector 高效但丢细节；标记特征序列适合 multimodal 依赖和 LLM reuse；空间潜在 Grid 保留几何/locality；Decomposed 渲染表示如 NeRF/3DGS 有高保真度和视角一致性，但动力学场景上可扩展性较弱。
- 性能比较说明基准结果已经显著进步，但不同方法的分辨率、输入模态、auxiliary 监督、回合预算和任务 subset 差异很大，导致直接比较仍然困难。

## 关键引文

- "internal simulators"
- "physical consistency over pixel fidelity"
- "long-horizon temporal consistency"

## 关联

- [[WorldModelsForEmbodiedAI]] - 论文的数学和机制层核心：POMDP、潜在状态、动力学先验、filtered 后验、ELBO 与轨迹采样直觉。
- [[WorldModelTaxonomy]] - 论文提出的功能 x 时间建模 x 空间表示三轴分类。
- [[WorldModelEvaluation]] - 论文中数据集、指标、性能 tables 与评估失效情形的整理。
- [[AwesomeWorldModels]] - 论文配套 curated bibliography，把分类体系映射到持续维护的论文列表。
- [[SimulationRealityGap]] - 来源中的 S2R、物理一致性与实时具身控制讨论，为已有接触仿真差距增加学得的仿真器视角。
- [[DifferentiablePhysics]] - 论文中的 decomposed 渲染、3DGS、可微的渲染和物理-informed 世界模型与可微仿真方向相关。

## 开放问题

- 论文的分类体系是否足够表达混合系统：例如同时有 RSSM 潜在动力学、扩散解码器、几何内存和 VLM critic 的系统？
- 像素/状态/任务指标之间如何建立因果 relation：像素质量改善在什么条件下会真正提升 MPC、RL 或机器人操作成功比率？
- 物理一致性应该如何 operationalize：能量 conservation、接触一致性、因果 intervention 准确率、闭环任务成功，还是仿真器到-真实迁移？
- [[AwesomeWorldModels]] 继续扩展时，分类体系是否需要加上评估协议、可用性、许可证、训练数据规模和真实机器人验证的结构化的元数据？
