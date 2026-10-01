---
title: "总览"
type: synthesis
tags: [robotics, embodied-ai]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[mujoco-computation-collision-detection]]", "[[isaac-sim-core-api-collision-approximation]]", "[[coacd-approximate-convex-decomposition]]", "[[convex-primitive-decomposition-for-collision-detection]]", "[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]", "[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]", "[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[awesome-world-models]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining]]", "[[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation]]", "[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning]]", "[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation]]", "[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors]]", "[[robotics-simulation-infrastructure]]", "[[nvidia-ovrtx]]", "[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]", "[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]", "[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction]]", "[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots]]", "[[planet-learning-latent-dynamics]]", "[[dreamerv3-mastering-diverse-control]]", "[[td-mpc2-scalable-robust-world-models]]", "[[dino-wm-pretrained-visual-features]]", "[[v-jepa-2-understanding-prediction-planning]]", "[[worldecho-worldsync-action-following]]", "[[modern-robotics-lagrangian-dynamics]]", "[[simopt-adaptive-randomization]]", "[[isaac-sim-policy-deployment]]"]
modified: 2026-10-02
---

# 当前研究判断

这里维护跨来源判断及其证据边界。完整目录由首页提供，待解问题与资料队列见 [[research-questions|研究问题]]。本页是知识库的综合判断，不把不同论文的结果当作同一个受控实验。

## 当前总判断

**机器人系统的结果取决于一串模型与接口假设。** 碰撞几何先决定接触输入，接触模型与求解器再决定运动；渲染与传感器决定策略看到什么；训练目标与数据构成决定学习什么；评测协议决定哪些失败被计入。各环节的证据分别见 [[CollisionGeometryForRobotSimulation|机器人仿真的碰撞几何]]、[[ContactModelsInRobotics|机器人学中的接触模型]]、[[RTXSensorSimulationPipeline|RTX 传感器仿真流程]]、[[RobotLearningDataComposition|机器人学习数据构成]] 和 [[TaskGeneralistPolicyEvaluation|通用任务策略评估]]。

**预测价值需要通过决策验证，训练与执行用途必须分开。** PlaNet、TD-MPC2 在执行时搜索未来动作；Dreamer 用想象轨迹训练策略，执行时直接出动作；DINO-WM、V-JEPA 2-AC 用视觉目标规划；π0.7、LDA-1B、Seer 和 DeFI 则把未来接入上下文、表示或动作监督。它们支持不同连接机制，不提供跨协议的通用排名。动作遵循评估还表明，画面合理与忠实执行动作应分别检查。[[ModelPredictiveControl|模型预测控制]]、[[ImaginedPolicyLearning|想象策略学习]]、[[VisualGoalPlanning|视觉目标规划]]、[[WorldModelEvaluation|评估边界]]

**辨识参数与复现接口是两类验证。** 轨迹匹配可能通过多个参数的补偿实现，SimOpt 的迁移成功不证明物理真值已唯一恢复；同时，坐标、关节顺序、观测历史、执行器和策略频率需要在训练与部署间一致。MuJoCo 3.8 和 Isaac Sim 6.1 的官方语义给出检查依据，仍不能保证任意跨引擎等价或硬件成功。[[SystemIdentificationForSimulation|系统辨识]]、[[PolicyDeploymentContract|策略部署契约]]、[[RobotRigidBodyDynamics|动力学]]、[[SimulationTimeStepping|数值时序]]

**数据规模要连同构成和训练阶段解释。** RoboCasa365 的任务／场景覆盖消融支持扩大覆盖；混入更多混合质量合成轨迹未继续改善其结果，两阶段训练也明显优于该设置的联合训练。这个结论限定在来源的模型、预算和数据设置，不能直接推成普遍配比规律。[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]]

**能执行、能重放、能迁移是不同验收标准。** EmbodiedGen 讨论生成资产的仿真就绪性，MagicSim 讨论回合执行与数据对齐，AGILE 讨论开发与导出契约，VIRAL 和 GRAIL 提供人形机器人迁移案例。单个环节成立不能替代全链验证。[[SimulationReady3DWorldGeneration|可用于仿真的三维世界生成]]、[[ExecutableEmbodiedInteractionInfrastructure|可执行具身交互基础设施]]、[[HumanoidRLWorkflow|人形机器人强化学习工作流]]、[[VisualSimToReal|视觉仿真到现实迁移]]、[[AssetConditionedHOIGeneration|资产条件化人物—物体交互生成]]

## 证据强在哪里，弱在哪里

| 领域 | 当前证据能支持什么 | 仍不能证明什么 |
| --- | --- | --- |
| 接触与碰撞 | 官方文档给出表示与求解语义；[[contact-models-in-robotics-a-comparative-analysis|接触比较]]、[[coacd-approximate-convex-decomposition|CoACD]] 等提供任务相关基准 | 所有引擎与真实机器人中统一的模型／算法排名 |
| 世界模型与策略 | 原始论文支持 [[ModelPredictiveControl|在线规划]]、[[ImaginedPolicyLearning|想象学习]] 与 [[VisualGoalPlanning|视觉目标规划]]；动作遵循和策略预训练均有来源特有实验 | 跨协议的能力排序、组合路线收益与独立复现结论 |
| 学习与评测 | [[RoboLab|RoboLab]]、[[RobotLearningDataComposition|RoboCasa365]] 支持诊断扰动、数据覆盖与阶段效应 | 仿真得分直接等于真实部署可靠性；通用最优数据比例 |
| 资产与执行 | [[EmbodiedGen|EmbodiedGen]]、[[ExecutableEmbodiedInteractionInfrastructure|MagicSim]] 给出资产验收、回放和数据契约 | 跨格式动力学等价、生成物理参数等于系统辨识真值 |
| 基础设施与迁移 | [[RTXSensorSimulationPipeline|ovrtx]] 说明观测接口；[[HeterogeneousRobotRLTraining|UniLab]] 有工作站基准；[[DomainRandomization|随机化]] 与 [[SystemIdentificationForSimulation|辨识]] 有受限迁移实验；[[PolicyDeploymentContract|部署契约]] 有固定版本官方接口依据 | 所有任务的吞吐量优势、所有传感器的物理真实性或普遍硬件成功保证 |

工程博客 [[robotics-simulation-infrastructure|机器人仿真基础设施文章]] 提供组织视角；官方仓库快照补足具体接口与版本信息。博客判断、API 语义、受控实验与演示视频的证据强度不同，阅读时应保留这种区别。

## 关键张力

1. **物理一致性与计算预算。** 简化碰撞体、接触松弛和有限迭代各改变不同环节；快、稳定、可微不意味着同样真实。[[ApproximateConvexDecomposition|近似凸分解]]、[[ContactComplementarity|接触互补]]、[[ContactSolvers|接触求解器]]、[[DifferentiablePhysics|可微物理]]
2. **视觉保真与控制信息。** 精致渲染、未来图像和冻结视觉特征可能保留外观，却不足以检验接触状态与动作后果。[[RTXSensorSimulationPipeline|RTX 传感器仿真流程]]、[[WorldModelEvaluation|世界模型评估]]、[[LatentDynamicsActionModels|潜在动力学动作模型]]
3. **更多数据与正确监督。** 条件化、目标路由、采样权重、成功门控和训练阶段影响哪些行为被学习；只保留成功轨迹还会改变尝试分布。[[RobotContextConditioning|机器人上下文条件化]]、[[RobotLearningObjectives|机器人学习目标：示范、回报与动力学]]、[[RobotLearningDataComposition|机器人学习数据构成]]、[[ExecutableEmbodiedInteractionInfrastructure|可执行具身交互基础设施]]
4. **系统吞吐量与局部性能。** 采集、传输、渲染、缓冲和学习器竞争资源；CPU／GPU 的整体放置比单个物理内核速度更接近训练耗时。UniLab 的结论仍限定于其基准。[[RoboticsSimulationInfrastructure|机器人仿真基础设施]]、[[HeterogeneousRobotRLTraining|异构机器人强化学习训练]]
5. **仿真可用与现实可靠。** 尺度、关节轴、动作缩放、观测历史、传感器标定、奖励和判定条件均需分别验证。[[HumanoidRLWorkflow|人形机器人强化学习工作流]]、[[SimulationSensitivityAnalysis|仿真敏感性分析]]、[[SimulationRealityGap|仿真—现实差距]]
