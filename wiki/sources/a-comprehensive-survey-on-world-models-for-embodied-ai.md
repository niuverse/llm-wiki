---
title: "A Comprehensive Survey on World Models for Embodied AI"
type: source
tags: [embodied-ai, world-models, robotics, evaluation, source-backed]
sources: []
modified: 2026-07-13
source_file: raw/a-comprehensive-survey-on-world-models-for-embodied-ai.html
source_kind: html
source_url: https://arxiv.org/abs/2510.16732
extracted_text: graph/extracts/a-comprehensive-survey-on-world-models-for-embodied-ai.md
source_date: 2025-11-29
study_topic: syntheses/world-models-learning-path
---

## 摘要

Xinqing Li、Xin He、Le Zhang、Min Wu、Xiaoli Li 和 Yun Liu 的综述将具身智能的 [[WorldModelsForEmbodiedAI|世界模型]] 定义为动作感知的内部仿真器：模型预测动作如何改变未来状态，并用这些预测轨迹支持感知、规划与控制。

论文提出 [[WorldModelTaxonomy|三轴分类体系]]：功能分为决策耦合与通用用途；时间建模分为顺序仿真与推理、全局差异预测（Global Difference Prediction）；空间表示分为全局潜在向量、特征标记序列、空间潜在网格和分解式渲染表示。它还用 POMDP 与变分潜在状态学习描述训练目标，整理跨领域数据集、指标、性能比较和开放挑战。

来源网址: https://arxiv.org/abs/2510.16732

## 核心主张

- 具身智能的世界模型应提供可用于行动的预测，超越静态场景描述或不受动作控制的视频生成。
- 数学上，交互被建模为 POMDP：$o_t$ 是观测，$a_t$ 是动作，$s_t$ 是不可直接观测的真实状态，$z_t$ 是学得的潜在状态。模型包含动力学先验 $p_\theta(z_t \mid z_{t-1}, a_{t-1})$、结合当前观测的滤波后验 $q_\phi(z_t \mid z_{t-1}, a_{t-1}, o_t)$，以及观测重建模型 $p_\theta(o_t \mid z_t)$。
- 训练使用证据下界（ELBO）：重建似然鼓励准确预测观测，KL 正则项将滤波后验对齐到动作条件动力学先验。学得的潜在轨迹因此可以作为紧凑的预测记忆，支持后续轨迹采样与策略优化。
- 三轴分类将 Dreamer 风格的 RSSM、使用离散标记的 Transformer、鸟瞰图/体素占用预测、NeRF/3DGS 数字孪生和 JEPA/视频扩散方法放在统一框架中比较。它提供组织方法的维度，并不意味着这些方法的目标和能力等价。
- [[WorldModelEvaluation|评估]] 要同时关注像素预测、状态理解与任务表现。论文指出，FID/FVD 等感知指标容易忽略物理一致性、动力学和因果关系。
- 数据仍分散在机器人操作、导航、自动驾驶和通用视频预训练等领域：数据集、模态和评估协议不同，缺少统一的多模态跨域资源。
- 实时控制受计算效率约束。Transformer 与扩散模型的推理成本较高；RNN、RSSM、全局潜在向量和 SSM/Mamba 风格方法更注重效率，但表达能力和长时依赖建模各有取舍。
- 顺序轨迹预测紧凑、样本效率较高，也方便闭环交互，但误差会逐步累积；全局预测可以并行估计未来状态、缓解多步漂移，代价是计算负担与闭环交互能力之间的取舍。
- 空间表示同样有取舍：全局潜在向量高效但容易丢失细节；特征标记序列适合多模态依赖和复用 LLM；空间网格保留几何结构与局部性；NeRF/3DGS 等分解式渲染表示提供高保真、视角一致的预测，但对动态场景的扩展仍有困难。
- 性能表中的方法在分辨率、输入模态、辅助监督、回合预算和任务子集上差异较大，基准数字不能脱离这些条件直接比较。

## 关键引文

- "internal simulators"
- "physical consistency over pixel fidelity"
- "long-horizon temporal consistency"

## 关联

- [[WorldModelsForEmbodiedAI|具身智能世界模型]] - POMDP、潜在状态、动力学先验、滤波后验、ELBO 和预测轨迹的机制解释。
- [[WorldModelTaxonomy|世界模型分类体系]] - 功能、时间建模和空间表示三个维度。
- [[WorldModelEvaluation|世界模型评估]] - 数据集、指标、性能比较与评估失效情形。
- [[awesome-world-models|AwesomeWorldModels]] - 配套论文列表，将分类体系映射到持续维护的文献目录。
- [[SimulationRealityGap|仿真—现实差距]] - 从学得的仿真器角度讨论物理一致性、实时控制与现实迁移。
- [[DifferentiablePhysics|可微物理]] - 分解式渲染、3DGS、可微渲染与融入物理约束的世界模型。

## 开放问题

- 三轴分类如何描述同时使用 RSSM、扩散解码器、几何记忆和 VLM 评价器的混合系统？
- 像素预测的改善在什么条件下会提高 MPC、RL 或机器人操作成功率？像素、状态与任务指标之间的关系仍需验证。
- 物理一致性应如何量化：能量守恒、接触一致性、因果干预准确率、闭环成功率与现实迁移，分别适合哪些模型和任务？
- 配套论文列表持续扩展时，是否需要同步记录评估协议、模型可用性、许可证、训练规模与真实机器人验证的元数据？
