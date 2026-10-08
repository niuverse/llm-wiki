---
title: "总览"
type: synthesis
tags: [robotics, embodied-ai]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[mujoco-computation-collision-detection]]", "[[isaac-sim-core-api-collision-approximation]]", "[[coacd-approximate-convex-decomposition]]", "[[convex-primitive-decomposition-for-collision-detection]]", "[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]", "[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]", "[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[awesome-world-models]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining]]", "[[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation]]", "[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning]]", "[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation]]", "[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors]]", "[[robotics-simulation-infrastructure]]", "[[nvidia-ovrtx]]", "[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]", "[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]", "[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction]]", "[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots]]", "[[planet-learning-latent-dynamics]]", "[[dreamerv3-mastering-diverse-control]]", "[[td-mpc2-scalable-robust-world-models]]", "[[dino-wm-pretrained-visual-features]]", "[[v-jepa-2-understanding-prediction-planning]]", "[[worldecho-worldsync-action-following]]", "[[modern-robotics-lagrangian-dynamics]]", "[[simopt-adaptive-randomization]]", "[[isaac-sim-policy-deployment]]"]
modified: 2026-10-04
---

# 当前研究判断

这里维护跨来源判断及其证据边界。全部页面见 [[catalog|完整目录]]，研究问题分别由交叉的主题和专题维护；[[research-questions|研究问题索引]]只汇总入口。本页是知识库的综合判断，不把不同论文的结果当作同一个受控实验。

## 当前总判断

**机器人系统的结果取决于一串模型与接口假设。** 碰撞几何先决定接触输入，接触模型与求解器再决定运动；渲染与传感器决定策略看到什么；训练目标与数据构成决定学习什么；评测协议决定哪些失败被计入。各环节的证据分别见 [[CollisionGeometryForRobotSimulation|机器人仿真的碰撞几何]]、[[ContactModelsInRobotics|机器人学中的接触模型]]、[[RTXSensorSimulationPipeline|RTX 传感器仿真流程]]、[[RobotLearningDataComposition|训练数据构成]] 和 [[TaskGeneralistPolicyEvaluation|通用任务策略评估]]。

**预测价值需要通过决策验证，训练与执行用途必须分开。** PlaNet、TD-MPC2 在执行时搜索未来动作；Dreamer 用想象轨迹训练策略，执行时直接出动作；DINO-WM、V-JEPA 2-AC 用视觉目标规划；π0.7、LDA-1B、Seer 和 DeFI 则把未来接入上下文、表示或动作监督。它们支持不同连接机制，不提供跨协议的通用排名。动作遵循评估还表明，画面合理与忠实执行动作应分别检查。[[ModelPredictiveControl|模型预测控制]]、[[ImaginedPolicyLearning|想象策略学习]]、[[VisualGoalPlanning|视觉目标规划]]、[[WorldModelEvaluation|评估边界]]

**辨识参数与复现接口是两类验证。** 轨迹匹配可能通过多个参数的补偿实现，SimOpt 的迁移成功不证明物理真值已唯一恢复；同时，坐标、关节顺序、观测历史、执行器和策略频率需要在训练与部署间一致。MuJoCo 3.8 和 Isaac Sim 6.1 的官方语义给出检查依据，仍不能保证任意跨引擎等价或硬件成功。[[SystemIdentificationForSimulation|系统辨识]]、[[PolicyDeploymentContract|策略部署契约]]、[[RobotRigidBodyDynamics|动力学]]、[[SimulationTimeStepping|数值时序]]

**数据规模要连同构成和训练阶段解释。** RoboCasa365 的任务／场景覆盖消融支持扩大覆盖；混入更多混合质量合成轨迹未继续改善其结果，两阶段方案的报告结果高于联合训练，但前者为预训练8万步加微调6万步，后者为12万步，不能把全部差距归因于训练顺序。任务覆盖消融也同时改变样本量；这些结果不能直接推成普遍配比规律。[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]]

**能执行、能重放、能迁移是不同验收标准。** EmbodiedGen 讨论生成资产的仿真就绪性，MagicSim 讨论回合执行与数据对齐，但没有本报告统一协议下的成功率或吞吐消融；AGILE 讨论开发与导出契约，VIRAL 项目页提供定性案例，GRAIL 则提供限定任务的真机试验。单个环节成立不能替代全链验证。[[SimulationReady3DWorldGeneration|Simulation-ready 3D Generation]]、[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|可执行具身交互基础设施]]、[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|人形机器人强化学习工作流]]、[[VisualSimToReal|Visual Sim-to-Real]]、[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors|资产条件化人物—物体交互生成]]

## 证据强在哪里，弱在哪里

| 领域 | 当前证据能支持什么 | 仍不能证明什么 |
| --- | --- | --- |
| 接触与碰撞 | 官方文档给出表示与求解语义；[[contact-models-in-robotics-a-comparative-analysis|接触比较]]、[[coacd-approximate-convex-decomposition|CoACD]] 等提供任务相关基准 | 所有引擎与真实机器人中统一的模型／算法排名 |
| 世界模型与策略 | 原始论文支持 [[ModelPredictiveControl|在线规划]]、[[ImaginedPolicyLearning|想象学习]] 与 [[VisualGoalPlanning|视觉目标规划]]；动作遵循和策略预训练均有来源特有实验 | 跨协议的能力排序、组合路线收益与独立复现结论 |
| 学习与评测 | [[sources/nvlabs-robolab|RoboLab]]、[[RobotLearningDataComposition|RoboCasa365]] 支持诊断扰动、数据覆盖与阶段效应 | 仿真得分直接等于真实部署可靠性；通用最优数据比例 |
| 资产与执行 | [[sources/embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|EmbodiedGen]] 提供分层资产验收；[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|MagicSim]] 描述执行、状态恢复与数据契约 | MagicSim 的统一量化性能、跨格式动力学等价、生成物理参数等于系统辨识真值 |
| 基础设施与迁移 | [[RTXSensorSimulationPipeline|ovrtx]] 说明观测接口；[[HeterogeneousRobotRLTraining|UniLab]] 有工作站基准；[[DomainRandomization|随机化]] 与 [[SystemIdentificationForSimulation|辨识]] 有受限迁移实验；[[PolicyDeploymentContract|部署契约]] 有固定版本官方接口依据 | 所有任务的吞吐量优势、所有传感器的物理真实性或普遍硬件成功保证 |

工程博客 [[robotics-simulation-infrastructure|机器人仿真基础设施文章]] 提供组织视角；官方仓库快照补足具体接口与版本信息。博客判断、API 语义、受控实验与演示视频的证据强度不同，阅读时应保留这种区别。

## 2026-10-04 全文复核后的关键修订

- **算法配置通用，不等于同一组权重通用。** Dreamer 的跨领域结果来自各任务分别训练；Nature 版本的策略用 REINFORCE 更新，不能把可微世界模型概括为沿整条动力学链直接反传动作梯度。Minecraft 结果也保留其观测、奖励与动作接口。[[dreamerv3-mastering-diverse-control|Dreamer 原文复核]]
- **零样本规划仍有输入与协议。** V-JEPA 2-AC 使用带动作的机器人数据、选定相机与目标图像；长任务按预设步数切换子目标，不能称为自主任务分解。其机器人实验与视频理解、视频问答的训练条件分别成立。[[v-jepa-2-understanding-prediction-planning|V-JEPA 2 原文复核]]
- **对照设计决定因果解释。** RoboCasa365 的训练阶段和总步数一起变化；DINO-WM 的 Dreamer／TD-MPC2 基线改成离线视觉目标规划；WorldSync 主表的更新预算也不相同。它们都不能直接组成同预算算法排名。[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]]、[[dino-wm-pretrained-visual-features|DINO-WM]]、[[worldecho-worldsync-action-following|WorldEcho／WorldSync]]
- **系统说明与被引结果不能重复计为独立验证。** MagicSim 的配套资产统计、EmbodiedGen V2 的下游迁移成绩均有转述来源；本轮未独立复核被引研究。MagicSim 的异步收益仍是机制论证，AGILE 的操作成功率来自仿真，VIRAL 当前归档只是项目页。[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|MagicSim]]、[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|EmbodiedGen V2]]、[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|AGILE]]、[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation|VIRAL]]
- **微基准、训练速度与现实可靠性分别成立。** UniLab 的实用系统比较同时涉及算法与配置差异；MuJoCoUni 的局部操作加速不能相乘成训练加速比。RoboLab 的仿真—真机对应也随策略变化，不能把仿真分数直接解释为硬件成功概率。[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab]]、[[mujocouni-persistent-batched-runtime-primitives-for-mujoco|MuJoCoUni]]、[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab]]

这些修订对应 [[topics/world-model-decision|世界模型与决策]]、[[topics/world-model-evaluation|动作后果评估]]、[[topics/policy-evaluation|数据与泛化评测]]、[[topics/robot-learning-systems|训练效率]] 和 [[topics/simulation-ready-worlds|可执行生成世界]]；未解问题由这些专题继续维护。

## 关键张力

1. **物理一致性与计算预算。** 简化碰撞体、接触松弛和有限迭代各改变不同环节；快、稳定、可微不意味着同样真实。[[ApproximateConvexDecomposition|Approximate Convex Decomposition]]、[[ContactComplementarity|Contact Complementarity]]、[[ContactSolvers|Contact Solvers]]、[[DifferentiablePhysics|Differentiable Physics]]
2. **视觉保真与控制信息。** 精致渲染、未来图像和冻结视觉特征可能保留外观，却不足以检验接触状态与动作后果。[[RTXSensorSimulationPipeline|RTX 传感器仿真流程]]、[[WorldModelEvaluation|World Model 评测]]、[[sources/lda-1b-scaling-latent-dynamics-action-model|LDA-1B]]
3. **更多数据与正确监督。** 条件化、目标路由、采样权重、成功门控和训练阶段影响哪些行为被学习；只保留成功轨迹还会改变尝试分布。[[RobotContextConditioning|Context Conditioning]]、[[RobotLearningObjectives|机器人学习目标]]、[[RobotLearningDataComposition|训练数据构成]]、[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|可执行具身交互基础设施]]
4. **系统吞吐量与局部性能。** 采集、传输、渲染、缓冲和学习器竞争资源；CPU／GPU 的整体放置比单个物理内核速度更接近训练耗时。UniLab 的结论仍限定于其基准。[[RoboticsSimulationInfrastructure|机器人仿真基础设施]]、[[HeterogeneousRobotRLTraining|异构 RL 训练]]
5. **仿真可用与现实可靠。** 尺度、关节轴、动作缩放、观测历史、传感器标定、奖励和判定条件均需分别验证。[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|人形机器人强化学习工作流]]、[[SimulationSensitivityAnalysis|仿真敏感性分析]]、[[SimulationRealityGap|Sim-to-Real Gap]]
