---
title: "研究问题"
type: synthesis
tags: [research-questions, robotics, embodied-ai]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[mujoco-computation-collision-detection]]", "[[isaac-sim-core-api-collision-approximation]]", "[[coacd-approximate-convex-decomposition]]", "[[convex-primitive-decomposition-for-collision-detection]]", "[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]", "[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]", "[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning]]", "[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors]]", "[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]", "[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]", "[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots]]"]
last_updated: 2026-07-19
---

# 研究问题

这个页面是轻量问题索引。它不是新的图谱层，也不试图复述所有来源；它只记录当前知识库能支持的高价值研究问题，以及回答这些问题时应该进入哪些概念页/来源。

## 世界模型如何进入机器人决策？

当前判断：世界模型的关键不是未来看起来真实，而是未来表示是否改变下游动作、策略表示或评估 signal。[[WorldModelsForEmbodiedAI]] 给出动作条件化的潜在仿真器的基本形式；[[WorldModelEvaluation]] 说明像素指标容易遗漏物理一致性与任务相关性；[[pi07-steerable-generalist-robotic-foundation-model|π0.7]] 把世界模型用作视觉子目标生成器；[[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]] 把世界模型放进潜在动力学预训练。

优先阅读：[[WorldModelsForEmbodiedAI]]、[[WorldModelTaxonomy]]、[[WorldModelEvaluation]]、[[LatentDynamicsActionModels]]。

证据边界：survey 和代码仓库提供分类体系与文献组织；π0.7/LDA-1B 提供具体机器人基础模型证据，但独立复现、真实机器人失败案例和跨基准比较仍不足。

## 仿真基准能证明机器人策略泛化吗？

当前判断：高保真度仿真基准更适合作为诊断 instrument，而不是部署 guarantee。[[TaskGeneralistPolicyEvaluation]] 说明 RoboLab 如何通过任务库、语言变体、判定条件、wrong-物体诊断和轨迹指标观察策略行为；[[SimulationSensitivityAnalysis]] 说明受控的 perturbations 可以定位成功/失败的风险因素；[[SimulationRealityGap]] 保留真实/仿真有效性的限制。

优先阅读：[[TaskGeneralistPolicyEvaluation]]、[[SimulationSensitivityAnalysis]]、[[RoboLab]]、[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]、[[nvlabs-robolab]]。

证据边界：RoboLab 的 six-任务真实/仿真验证支持仿真代理有价值，但也提示代理有效性会随策略/任务族改变；基准得分不能单独等价于真实部署可靠性。

## 仿真机器人预训练更依赖数据量还是数据构成？

当前判断：数据总量不是充分解释。[[RobotLearningDataComposition]] 把训练分布拆成任务覆盖、场景覆盖、示范来源与质量、采样权重和训练阶段。[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]] 的 Human50→Human300 与 5→25→2,500 场景消融支持覆盖范围有益；Human300→Human300+MG60 的下降说明规模更大的混合质量合成数据可能稀释监督；单阶段联合训练 22.5% 与两阶段训练 51.1% 的差距又说明优化顺序本身是一等变量。

优先阅读：[[RobotLearningDataComposition]]、[[RoboCasa365]]、[[CompositionalGeneralizationInRobotics]]、[[TaskGeneralistPolicyEvaluation]]、[[RobotContextConditioning]]、[[LatentDynamicsActionModels]]。

证据边界：RoboCasa365 的主要消融使用固定的 GR00T N1.5 训练设置，合成数据没有逐轨迹质量标签；任务、技能、物体和场景重叠也没有完全解耦。因此当前证据支持“构成很重要”，但还不能给出跨模型通用的最优人类/合成数据配比或规模扩展定律。

## 生成式三维世界什么时候才算可用于机器人学习？

当前判断：视觉合理性只是起点。[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|EmbodiedGen V1]] 建立物体、纹理、关节系统、场景与布局生成的模块化流程；[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|V2]] 把目标收紧为 [[SimulationReady3DWorldGeneration|可用于仿真的契约]]：公制几何、碰撞资产、物理参数、任务语义、可供性、标准化接口和可执行验证必须共同成立。对任务世界，还要满足支撑、不重叠、可达性、沉降和作用一致性。

优先阅读：[[embodiedgen-v1-v2-learning-map|EmbodiedGen V1/V2 Learning Map]]、[[EmbodiedGen]]、[[SimulationReady3DWorldGeneration]]、[[AgenticSceneTaskGeneration]]、[[CollisionGeometryForRobotSimulation]]、[[RoboticsSimulationInfrastructure]]。

证据边界：V2 的资产/世界验收、碰撞成功、处理时间与可供性消融实验是来源特有的证据；跨格式导出不保证跨仿真器动力学等价性，VLM 物理估计不等于 SysID，论文引用的策略扩展 numbers 来自配套研究而不是 V2 独立控制实验。

## 机器人 RL 训练必须使用驻留 GPU 的仿真吗？

当前判断：不必须。[[HeterogeneousRobotRLTraining]] 说明基于仿真的机器人 RL 训练的关键是采集器、缓冲区、学习器、数据迁移和同步组成的闭环循环，而不是物理后端必须驻留在 GPU 上。[[UniLab]] 用 CPU-批处理的 MuJoCoUni / MotrixSim + GPU 学习器 + 统一的运行时作为有来源支持的 counterexample，并报告 3-10× 端到端实际运行时间增益；但这不是否定 GPU 仿真，而是说明驻留 GPU 的物理是有效路径之一。

优先阅读：[[HeterogeneousRobotRLTraining]]、[[UniLab]]、[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]、[[RoboticsSimulationInfrastructure]]、[[MuJoCo]]。

证据边界：UniLab 的 strongest 证据是来源特有的 workstation 基准和重放路径执行轨迹/消融；视觉-dominated workloads、多-GPU/distributed 场景、可变形物理和现实世界策略可靠性都不能由这篇来源直接推出。

## 人形机器人强化学习从训练到硬件怎样减少静默失败？

当前判断：AGILE 的主要价值是把人形机器人强化学习的工作流边界变成显式契约。[[HumanoidRLWorkflow]] 说明训练前的关节/奖励/接触验证、训练中的 git/配置快照、评估中的确定性场景测试、运动质量诊断，以及部署时的 TorchScript + YAML I/O 描述文件，可以一起减少关节顺序、历史缓冲区、动作扩展、奖励投机、关节限制 violations 和高频驱动这类静默失败。[[SimulationRealityGap]] 需要因此扩展：差距不只来自物理不匹配，也可能来自工作流/导出不匹配。

优先阅读：[[HumanoidRLWorkflow]]、[[AGILE]]、[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning]]、[[SimulationRealityGap]]、[[TaskGeneralistPolicyEvaluation]]。

证据边界：AGILE 报告 Unitree G1 / Booster T1 上五类技能的迁移示范数据与多个稳定化消融实验，但硬件验证主要是定性；移动操作/VLA 情形的 90% 成功是闭环仿真结果，不等于真实人形机器人操作已解决。

## 人形机器人移动操作示范数据如何规模化？

当前判断：GRAIL 提供一条有来源支持的路线：把 3D 资产、仿真器就绪场景、相机/规模化/深度和机器人-proportioned character 先固定，再用 VFM 作为交互先验生成视频，随后通过公制四维人物—物体交互重建、GMR 重定向和通用任务跟踪器转成机器人动作数据。这个路线的重点不是“VFM 直接控制机器人”，而是用已知三维配置把视频先验约束成物理上可执行的轨迹。

优先阅读：[[AssetConditionedHOIGeneration]]、[[GRAIL]]、[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors]]、[[VisualSimToReal]]、[[TaskGeneralistPolicyEvaluation]]。

证据边界：GRAIL 报告超过 20,000 条生成的序列、HOI 生成/跟踪消融实验和 Unitree G1 现实世界 pick-up / stair-climbing 成功比率；但项目页面/代码/数据集发布、VFM/API 可复现性、失败过滤比率、跨平台迁移和独立复现仍需后续来源。

## 接触模型和求解器为什么会影响学习/控制？

当前判断：接触求解器不是底层可替换实现，而是会改变力、冲量、能量耗散、残差和收敛的建模选择。[[ContactComplementarity]] 给出 Signorini、Coulomb 摩擦和最大耗散的刚性接触目标；[[ContactSolvers]] 说明逐接触点与全局/近端方法的取舍；[[DifferentiablePhysics]] 说明求解器产物可能污染优化梯度。

优先阅读：[[ContactModelsInRobotics]]、[[ContactComplementarity]]、[[ContactSolvers]]、[[DifferentiablePhysics]]、[[contact-models-in-robotics-a-comparative-analysis]]。

证据边界：当前证据强在受控的接触仿真基准；把某个求解器选择与某个真实机器人部署失败直接因果绑定，还需要具体系统证据。

## 碰撞几何选择为什么会影响机器人仿真？

当前判断：碰撞几何是接触流程的上游建模选择。[[CollisionGeometryForRobotSimulation]] 说明球体、胶囊体、圆柱体、盒体、凸包、ACD、SDF 和可微的基元会改变接触候选、接触点、法向量、间隙、接触数量和求解器约束。[[ApproximateConvexDecomposition]] 说明非凸资产不能只看视觉网格；单一凸包会填满 handles / slots / holes，过度分解又会拖慢运行时。[[DifferentiableCollisionDetection]] 则把基元碰撞体连接到轨迹优化梯度。

优先阅读：[[CollisionGeometryForRobotSimulation]]、[[ApproximateConvexDecomposition]]、[[DifferentiableCollisionDetection]]、[[mujoco-computation-collision-detection]]、[[isaac-sim-core-api-collision-approximation]]、[[coacd-approximate-convex-decomposition]]。

证据边界：当前有来源支持的内容很适合建立分类体系和失效情形；但还缺跨引擎、跨机器人任务的 systematic 碰撞体基准。尤其需要比较胶囊体 / 基元分解 / CoACD / VisACD / SDF 在抓取、插入、移动、RL 吞吐量和仿真到现实迁移中的实际差异。

## 异构机器人数据是噪声还是资源？

当前判断：异构数据的价值取决于系统是否建模数据作用。[[RobotContextConditioning]] 说明 π0.7 用任务/子任务语言、元数据、控制模式、速度、质量和子目标图像消除歧义行为模式；[[LatentDynamicsActionModels]] 说明 LDA-1B 用策略、正向动力学、逆动力学和视觉预测目标区分高质量示范数据、低质量轨迹和 actionless 视频。

优先阅读：[[RobotContextConditioning]]、[[LatentDynamicsActionModels]]、[[VisionLanguageActionModels]]、[[Pi07]]、[[LDA1B]]、[[EI30K]]。

证据边界：π0.7 与 LDA-1B 都支持“数据作用 matters”，但前者强调运行时转向，后者强调训练目标路由；两者是否能组合，还没有被当前来源证明。

## 当前知识库最值得补哪些来源？

当前判断：下一轮来源补充应优先解决证据边界，而不是继续横向堆 title。最有价值的补充包括独立复现、失败案例、跨基准评估、真实机器人部署报告，以及世界模型论文的闭环控制证据。

优先阅读：[[overview|总览]]、[[WorldModelEvaluation]]、[[SimulationRealityGap]]。

候选方向：

- π0.7、LDA-1B、RoboLab 的外部复现或批判性分析。
- RoboCasa365 的外部复现、MimicGen 逐轨迹质量审计、固定训练预算下的数据配比实验、组合任务逐阶段失败统计和跨机器人真实验证。
- AGILE/WBC-AGILE 的后续硬件报告，尤其是带运动捕捉、力/力矩、能量、失败比率和感知驱动的操作指标的资料。
- GRAIL 的项目页面、代码、数据集发布、失败过滤 statistics 和独立复现，尤其是不同 VFM / 3D 资产流程 / 机器人平台下的鲁棒性。
- EmbodiedGen V2 的代码/数据发布、跨仿真器动力学验证、物理参数真实值基准、可供性端到端失败分析，以及生成的世界策略扩展配套研究。
- MuJoCoUni、MotrixSim、UniLab 代码仓库、mjlab / MjWarp、MuJoCo Playground、Isaac Lab 和 ManiSkill3 的文档 / 代码仓库快照，用来建立机器人 RL 训练运行时分类体系。
- 直接比较视觉子目标世界模型、潜在动力学预训练和经典的基于模型控制方法。
- 把接触求解器选择与真实机器人 MPC/RL/可微的优化失败关联起来的实证工作。
- 对同一物体/机器人资产系统比较基元碰撞体、凸包、CoACD、VisACD、SDF 和可微的基元碰撞的引擎特定的基准。
- 世界模型评估论文中明确报告动作耦合、闭环成功、物理一致性和实时延迟的来源。
