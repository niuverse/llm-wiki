---
title: "研究问题"
type: synthesis
tags: [robotics, embodied-ai]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[mujoco-computation-collision-detection]]", "[[isaac-sim-core-api-collision-approximation]]", "[[coacd-approximate-convex-decomposition]]", "[[convex-primitive-decomposition-for-collision-detection]]", "[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]", "[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]", "[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning]]", "[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors]]", "[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]", "[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]", "[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots]]", "[[planet-learning-latent-dynamics]]", "[[dreamerv3-mastering-diverse-control]]", "[[td-mpc2-scalable-robust-world-models]]", "[[dino-wm-pretrained-visual-features]]", "[[v-jepa-2-understanding-prediction-planning]]", "[[worldecho-worldsync-action-following]]", "[[modern-robotics-lagrangian-dynamics]]", "[[simopt-adaptive-randomization]]", "[[isaac-sim-policy-deployment]]"]
modified: 2026-10-02
---

# 研究问题与资料缺口

本页集中记录值得追问的问题、证据边界和补充资料优先级。[[overview|当前研究判断]] 负责综合结论；各概念页负责机制解释。下列研究问题不意味着当前知识库已经给出答案。

## 学习入口

| 想解决的问题 | 阅读路径 |
| --- | --- |
| 从资产、物理到传感器建立完整仿真认识 | [[simulation-and-assets-learning-path|仿真与资产]] |
| 从学习目标到数据和闭环评测 | [[robot-learning-and-evaluation-learning-path|机器人学习与评测]] |
| 分清未来预测、潜在动作与策略收益 | [[world-models-learning-path|世界模型]] |
| 分清客户端、执行后端与会话插件 | [[agent-tools-learning-path|智能体工具]] |

路径提供基础顺序，本页提供研究切入点。

## 仿真与资产

### 碰撞模型和接触求解怎样影响控制？

阅读：[[CollisionGeometryForRobotSimulation|机器人仿真的碰撞几何]] → [[ContactModelsInRobotics|机器人学中的接触模型]] → [[ContactSolvers|接触求解器]] → [[DifferentiablePhysics|可微物理]]。

已知：几何改变接触输入，接触近似与数值误差改变力和运动。[[contact-models-in-robotics-a-comparative-analysis|接触比较论文]]、[[coacd-approximate-convex-decomposition|CoACD]] 支持任务相关差异。

待解：在相同资产、策略、步长和预算下，基元／凸包／凸分解／SDF 如何影响接触残差、任务成功和训练吞吐量？这些差异能否迁移到真实机器人？当前仍缺跨引擎、跨任务统一实验。

### 生成的三维世界什么时候真正可用？

阅读：[[SimulationReady3DWorldGeneration|可用于仿真的三维世界生成]]、[[AgenticSceneTaskGeneration|智能体式场景与任务生成]]、[[EmbodiedGen|EmbodiedGen]]、[[ExecutableEmbodiedInteractionInfrastructure|可执行具身交互基础设施]]。

已知：EmbodiedGen 提供几何、碰撞、物理、语义与可执行验收的框架；MagicSim 连接回合、回放与数据门控。跨格式导出不自动保证动力学等价。[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|EmbodiedGen V2 论文]]、[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|MagicSim 论文]]

待解：物理参数如何对照真实测量？可供性与任务世界失败如何分层统计？只保留成功轨迹时，尝试数、过滤率和难例是否充分报告？

### 格式、USDA 与轮式机器人怎样补齐基础？

阅读：[[3d-model-formats-learning-map|三维模型格式学习地图]]、[[GLTFSceneStructure|glTF 场景与数据结构]]、[[OpenUSDSceneComposition|OpenUSD 场景组合]]、[[USDAFileSyntax|USDA 文件语法]]、[[wheeled-robot-modeling-learning-map|轮式机器人建模学习地图]]。

证据边界：OpenUSD 组合与 USDA 有官方文档和 Learn OpenUSD 教程；glTF 场景及缓冲区结构有 Khronos 教程，但完整 GLB、材质和动画规范仍待收录。轮式运动学有 Modern Robotics 与分类论文支持。其他格式对比仍有无来源学习笔记，应逐项升级证据。

### Isaac Sim 与 MuJoCo 的控制参数能直接迁移吗？

阅读：[[isaac-sim-mujoco-control-tuning-notes|Isaac Sim 与 MuJoCo 物理和控制笔记]]、[[isaac-sim-mujoco-usda-runtime-semantics|Isaac Sim `mujoco.usda` 运行时语义]]、[[ReducedCoordinateArticulations|约化坐标关节系统]]、[[RoboticsSimulationLoop|机器人仿真循环]]。

已知：驱动器、执行器、单位与求解语义都需要核对。讨论中的增益分组仍是学习笔记；新增 MuJoCo 总览支持执行器分层，尚未验证所有跨引擎增益换算。待解：固定机械臂、动作接口与采样频率，怎样分别辨识控制器与物理误差？

### 物理机制完整之后，怎样检查离散化与可辨识性？

阅读：[[RobotCoordinateFrames|坐标与位姿]]、[[RobotRigidBodyDynamics|刚体动力学]]、[[SimulationTimeStepping|时步与控制频率]]、[[DomainRandomization|随机化]]、[[SystemIdentificationForSimulation|系统辨识]]、[[PolicyDeploymentContract|策略部署契约]]。

已知：官方课程与 MuJoCo 3.8 支持坐标、能量方程和积分机制；Tobin、Peng 与 SimOpt 分别提供视觉、动力学随机化和分布适配的特定实验。Isaac Sim 6.1 的关节绑定与降频责任按版本记录，没有被当作全部旧版 API 的替代。

待解：哪些激励和观测能区分质量、摩擦、控制增益与延迟？应怎样用未参与拟合的轨迹验证参数？保持策略周期不变时，改变物理步长与求解预算各贡献多少？完整空间向量／递归动力学、浮动基座约束、触觉与传感器标定、可变形材料和跨引擎参数验证仍需原始教材与独立实验。

## 机器人学习与评测

### 仿真基准能证明泛化与部署可靠性吗？

阅读：[[TaskGeneralistPolicyEvaluation|通用任务策略评估]]、[[SimulationSensitivityAnalysis|仿真敏感性分析]]、[[SimulationRealityGap|仿真—现实差距]]、[[simulation-post-training-evaluation|机器人仿真评测是否需要仿真数据后训练]]。

已知：RoboLab 提供受控扰动和真实／仿真对照；代理有效性仍随策略和任务变化。关于是否用目标基准仿真数据后训练，应先区分零样本评测与适应能力评测；该专题中的外部资料尚未正式收录，相关解释保留为无来源学习笔记。

待解：仿真中的失败因素能否预测硬件失败？训练、适应和测试场景怎样隔离？应报告哪些逐阶段指标与不确定性？[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab 论文]]

### 更多数据为什么不一定更好？

阅读：[[RobotLearningObjectives|机器人学习目标：示范、回报与动力学]]、[[RobotLearningDataComposition|机器人学习数据构成]]、[[RobotContextConditioning|机器人上下文条件化]]、[[CompositionalGeneralizationInRobotics|机器人学中的组合泛化]]。

已知：RoboCasa365 的覆盖、混合质量数据与两阶段训练消融表明构成重要；LDA-1B 和 π0.7 分别从目标路由与上下文条件化处理异构数据。它们没有给出跨模型通用的最优数据配比。[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365 论文]]、[[LatentDynamicsActionModels|潜在动力学动作模型]]

待解：在相同有效样本数和训练预算下，质量、权重、任务覆盖和训练顺序各贡献多少？合成轨迹能否逐条审计？

### 训练系统和硬件迁移怎样避免静默失败？

阅读：[[HeterogeneousRobotRLTraining|异构机器人强化学习训练]]、[[HumanoidRLWorkflow|人形机器人强化学习工作流]]、[[VisualSimToReal|视觉仿真到现实迁移]]、[[AssetConditionedHOIGeneration|资产条件化人物—物体交互生成]]。

已知：UniLab 的工作站基准支持异构采集／学习路线，但不证明所有负载都优于 GPU 仿真。AGILE 关注关节、奖励、导出接口；VIRAL 关注视觉迁移；GRAIL 将资产条件化视频转成机器人轨迹。各来源的迁移范围和定量证据不同。

待解：视觉主导、多 GPU 负载怎样改变运行时结论？硬件报告能否同时提供关节误差、能量、失败率和感知驱动任务指标？视频生成版本漂移与过滤规则如何复现？

## 世界模型

### 未来预测究竟在哪个环节改善动作？

阅读：[[WorldModelsForEmbodiedAI|具身世界模型]]、[[ModelPredictiveControl|MPC]]、[[ImaginedPolicyLearning|想象策略学习]]、[[VisualGoalPlanning|视觉目标规划]]、[[LatentDynamicsActionModels|潜在动力学预训练]]、[[InverseDynamicsModels|逆动力学]]。

已知：PlaNet 和 TD-MPC2 在执行时规划，Dreamer 在训练中想象；DINO-WM、V-JEPA 2-AC 使用视觉目标。π0.7、LDA-1B、Seer、DeFI 连接上下文、表示与动作监督。各来源的任务、奖励、模型规模和预算不同，不能直接排序；DINO-WM 改动后的离线基线不是原在线强化学习方法的通用判决。

待解：在相同数据与预算下，如何隔离表示、未来条件、动作标签、在线搜索与策略先验的收益？何时应选 MPC，何时在想象中学策略？模型更新后，策略适应成本与在线搜索成本如何比较？组合路线仍需同条件实验。

### 世界模型能否忠实模拟非专家动作？

阅读：[[WorldModelEvaluation|世界模型评估]]、[[worldecho-worldsync-action-following|WorldEcho／WorldSync]]、[[v-jepa-2-understanding-prediction-planning|V-JEPA 2-AC]]、[[SimulationRealityGap|现实差距]]。

证据边界：WorldEcho 的近期预印本扩展动作查询并报告视觉门与 SE(3) 误差；主模型训练次数不同，下游策略改进只覆盖少量任务。V-JEPA 2 提供有限真机闭环，但其完整规划耗时与任务分解方式不能直接推出高速接触能力。

待解：视觉门、失败惩罚、位姿误差和延迟能否独立复现？如何测接触力、滑移、物体运动与不可执行动作，而非只测末端位姿？策略是否会利用学习模型的乐观预测？应如何在未见初态、非专家动作和真实硬件上报告校准与失败率？

## 智能体工具

### 自托管系统中客户端与执行后端怎样协作？

阅读：[[AgentsDock|AgentsDock]]、[[AgentsServer|AgentsServer]]、[[dsh-learning-map|DeepSeek Harness 来源获取计划]]。

当前证据只覆盖 AgentsDock／AgentsServer 的 README 和发布快照。DeepSeek Harness 仍是资料获取计划；插件、事件日志与执行隔离需要正式收录后再形成结论。此主题独立于机器人主线。

## 补充资料优先级

| 优先级 | 缺口与建议资料 | 验收标准 |
| --- | --- | --- |
| 1：基础机制 | 空间向量与递归动力学、浮动基座、系统辨识可辨识性教材；glTF／GLB 材质与动画规范；触觉和相机标定参考 | 原始资料归档后补变量、假设、更新规则和可手算例子 |
| 2：实验可比性 | 同预算世界模型规划／策略对照、接触与碰撞基准、时步／延迟消融、WorldEcho 评估复现 | 明确数据、奖励、初态、时域、预算、样本数和失败统计 |
| 3：独立验证 | 世界模型非专家动作与真机闭环；随机化／辨识的未见轨迹验证；现有机器人基础模型与迁移结果复现 | 区分发布方与独立结果，保留冲突，不跨协议排名 |
| 4：版本与实现 | MuJoCo／PhysX 参数语义、Isaac Sim 部署配置、生成世界和执行基础设施的代码／数据版本 | 固定版本，核对物理、控制、回放与过滤规则，旧证据不覆盖 |

2026-10-02 首轮已补 RSSM、MPC、想象策略、视觉目标规划、坐标与动力学、时序、随机化、辨识和部署；覆盖记录见 [[world-models-and-simulation-research|研究地图]]。本表保留尚未收录或需要独立验证的队列，不把候选资料写成已有知识。
