---
title: "知识库索引"
type: synthesis
tags: [index, navigation]
sources: []
last_updated: 2026-08-18
---

# 知识库索引

这个文件由 Codex 维护。新增、重命名或删除知识页时必须同步更新。第一部分是研究入口；后半部分是完整清单，用于 Obsidian、Quartz 和确定性健康检查。

## 从研究问题进入

- **当前总判断**：先读 [总览](overview.md)。它维护当前知识库对具身智能、机器人学仿真、世界模型、机器人基础模型与评估的综合判断。
- **问题索引**：读 [研究问题](syntheses/research-questions.md)。它把当前知识库能回答的高价值问题连接到相应概念页/来源，而不额外引入复杂图谱层。
- **世界模型如何影响机器人决策？** 读 [具身智能世界模型](concepts/WorldModelsForEmbodiedAI.md)、[世界模型评估](concepts/WorldModelEvaluation.md)、[潜在动力学动作模型](concepts/LatentDynamicsActionModels.md)。
- **逆动力学模型怎么从视频学动作？** 读 [逆动力学模型](concepts/InverseDynamicsModels.md)、[潜在动力学动作模型](concepts/LatentDynamicsActionModels.md)、[Seer](entities/Seer.md)、[DeFI](entities/DeFI.md)。
- **机器人基础模型如何处理异构数据？** 读 [视觉—语言—动作模型](concepts/VisionLanguageActionModels.md)、[机器人上下文条件化](concepts/RobotContextConditioning.md)、[潜在动力学动作模型](concepts/LatentDynamicsActionModels.md)。
- **仿真机器人预训练更依赖数据量还是数据构成？** 读 [机器人学习数据构成](concepts/RobotLearningDataComposition.md)、[RoboCasa365](entities/RoboCasa365.md) 和 [机器人学中的组合泛化](concepts/CompositionalGeneralizationInRobotics.md)，重点看任务/场景覆盖、示范质量、采样权重与预训练—后训练顺序。
- **仿真基准能证明什么？** 读 [通用任务策略评估](concepts/TaskGeneralistPolicyEvaluation.md)、[仿真基准报告流程](concepts/SimulationBenchmarkReportingPipeline.md)、[仿真敏感性分析](concepts/SimulationSensitivityAnalysis.md)、[仿真—现实差距](concepts/SimulationRealityGap.md)。
- **人形机器人强化学习从训练到硬件怎样减少静默失败？** 读 [人形机器人强化学习工作流](concepts/HumanoidRLWorkflow.md)、[AGILE](entities/AGILE.md)、[仿真—现实差距](concepts/SimulationRealityGap.md)。
- **仿真基础设施决策为什么重要？** 读 [机器人仿真基础设施](concepts/RoboticsSimulationInfrastructure.md) 和 [智能体式场景与任务生成](concepts/AgenticSceneTaskGeneration.md)，重点看任务/API、资产管理、智能体式场景/任务制作、渲染内存/保真度、可视化工具诊断和位姿 API 如何影响 RL/评估工作流。
- **MagicSim 怎样把基准、数据生成和智能体交互接到同一运行时？** 读 [MagicSim 论文](sources/magicsim-a-unified-infrastructure-for-executable-embodied-interaction.md)、[MagicSim](entities/MagicSim.md) 和 [可执行具身交互基础设施](concepts/ExecutableEmbodiedInteractionInfrastructure.md)，重点看“回合而非帧”、共享任务 MDP、同步物理 / 异步语义状态、AtomicSkill、异步规划与成功门控数据。
- **生成式三维世界什么时候才算可用于机器人学习？** 读 [EmbodiedGen V1/V2 学习地图](syntheses/embodiedgen-v1-v2-learning-map.md)、[可用于仿真的三维世界生成](concepts/SimulationReady3DWorldGeneration.md) 和 [EmbodiedGen](entities/EmbodiedGen.md)，重点区分视觉合理性与公制几何、物理资产、任务语义、可供性、仿真器接口和可执行验证。
- **机器人 RL 训练必须驻留 GPU 的仿真吗？** 读 [异构机器人强化学习训练](concepts/HeterogeneousRobotRLTraining.md)、[UniLab](entities/UniLab.md) 和 [机器人仿真基础设施](concepts/RoboticsSimulationInfrastructure.md)，重点看 CPU/GPU 职责分配、采集器与学习器重叠执行、回放边界、主机到设备传输和权重同步如何决定端到端训练效率。
- **ovrtx 如何把 OpenUSD 场景变成 RTX 传感器输出？** 读 [RTX 传感器仿真流程](concepts/RTXSensorSimulationPipeline.md)、[NVIDIA ovrtx](sources/nvidia-ovrtx.md)、[ovrtx](entities/Ovrtx.md) 和 [OpenUSD 场景组合](concepts/OpenUSDSceneComposition.md)，重点看 `RenderProduct`、`RenderVar`、DLPack 张量映射、lidar/radar `PointCloud` 通道和预热 / 同步规则。
- **视觉仿真到现实迁移怎么跨过仿真—现实差距？** 读 [视觉仿真到现实迁移](concepts/VisualSimToReal.md)、[VIRAL](entities/VIRAL.md) 和 [仿真—现实差距](concepts/SimulationRealityGap.md)，重点看特权教师策略、视觉学生策略、域随机化、手部与相机对齐与失败案例。
- **人形机器人移动操作示范数据如何规模化？** 读 [资产条件化人物—物体交互生成](concepts/AssetConditionedHOIGeneration.md)、[GRAIL](entities/GRAIL.md) 和 [视觉仿真到现实迁移](concepts/VisualSimToReal.md)，重点看 3D 资产、VFM 交互先验、公制四维人物—物体交互重建、重定向与通用任务跟踪器。
- **OpenUSD 的核心价值是什么？** 读 [OpenUSD 场景组合](concepts/OpenUSDSceneComposition.md)、[OpenUSD](entities/OpenUSD.md) 和 [Introduction to USD](sources/openusd-introduction.md)；如果关注机器人学资产制作，再接 [Isaac Sim 资产结构 3.0](concepts/IsaacSimAssetStructure.md) 与 [Isaac Sim 旧版资产结构](concepts/IsaacSimLegacyAssetStructure.md)。
- **Isaac Sim 资产结构 3.0 怎么理解？** 读 [Isaac Sim 资产结构 3.0](concepts/IsaacSimAssetStructure.md) 和 [Asset Structure - Isaac Sim Documentation](sources/isaac-sim-asset-structure.md)，重点看分层职责、载荷/变体组合和引擎专用调优隔离。
- **Isaac Sim 旧资产布局是不是 2.0？** 读 [Isaac Sim 旧版资产结构](concepts/IsaacSimLegacyAssetStructure.md) 和 [Asset Structure - Isaac Sim 4.5 Documentation](sources/isaac-sim-45-asset-structure.md)；当前有来源支持的结论是它应称为旧版 / 3.0 之前，而不是 2.0。
- **Isaac Sim 的 `mujoco.usda` 应该放什么？** 读 [Isaac Sim `mujoco.usda` 运行时语义](syntheses/isaac-sim-mujoco-usda-runtime-semantics.md) 和 [Isaac Sim 资产结构 3.0](concepts/IsaacSimAssetStructure.md)，重点区分共享视觉/碰撞体资产语义与 MuJoCo 专用运行时调优。
- **PhysX 关节系统、位置驱动、求解器和关节增益怎么理解？** 先读 [约化坐标关节系统](concepts/ReducedCoordinateArticulations.md) 和 [Articulations - Omni Physics](sources/omniverse-omni-physics-articulations.md)，再读 [Isaac Sim 与 MuJoCo 物理和控制笔记](syntheses/isaac-sim-mujoco-control-tuning-notes.md)；PhysX 关节系统驱动器的 PD 类比和适用范围已有官方来源支持，MuJoCo 对比与机械臂增益分组仍是源自讨论的。
- **OBJ、STL、USD、GLB 等 3D 模型格式怎么选？** 读 [三维模型格式学习地图](syntheses/3d-model-formats-learning-map.md)，注意其中 USD 相关内容已有知识库来源支持，其他格式仍是无来源学习脚手架。
- **接触物理为什么会影响学习/控制？** 读 [机器人学中的接触模型](concepts/ContactModelsInRobotics.md)、[接触互补](concepts/ContactComplementarity.md)、[接触求解器](concepts/ContactSolvers.md)、[可微物理](concepts/DifferentiablePhysics.md)。
- **碰撞几何为什么会影响机器人仿真？** 读 [机器人仿真的碰撞几何](concepts/CollisionGeometryForRobotSimulation.md)、[近似凸分解](concepts/ApproximateConvexDecomposition.md)、[可微碰撞检测](concepts/DifferentiableCollisionDetection.md)，重点看胶囊体/球体/圆柱体、凸包、凸分解、SDF、基元分解和可微基元的取舍。
- **轮式机器人建模怎么系统学习？** 读 [轮式机器人建模学习地图](syntheses/wheeled-robot-modeling-learning-map.md)、[轮式机器人可视化实验](syntheses/wheeled-robot-visual-lab.md)、[轮式机器人运动学](concepts/WheeledRobotKinematics.md)、[轮式移动机器人分类](concepts/WheeledMobileRobotClassification.md)、[全向轮](concepts/OmnidirectionalWheels.md)、[非完整约束移动机器人](concepts/NonholonomicMobileRobots.md) 和 [可转向轮](concepts/SteerableWheels.md)。

## 维护入口

- [知识库日志](log.md) - 仅追加的操作历史
- 健康检查：`python3 tools/health.py`
- 图结构构建: `uv run python tools/build_graph.py --report`
- 发布预览: `npm run wiki:preview`
- 生产构建: `npm run wiki:build`

## 综合页

- [研究问题](syntheses/research-questions.md) - 当前知识库支持的高价值研究问题、阅读路径和证据边界
- [EmbodiedGen V1/V2 学习地图](syntheses/embodiedgen-v1-v2-learning-map.md) - 对照两代 EmbodiedGen 的系统边界、核心机制、证据强度、常见误解和推荐阅读路径
- [ovrtx API 边界](syntheses/ovrtx-api-boundary.md) - 提炼 ovrtx 的场景组合、物理物体制作、灯光/相机随机化和上层归属边界
- [Isaac Sim `mujoco.usda` 运行时语义](syntheses/isaac-sim-mujoco-usda-runtime-semantics.md) - 提炼 `mujoco.usda` 的归属边界：不是视觉/碰撞资产文件，而是 MuJoCo-特定的运行时解释 / 调优叠加层
- [Isaac Sim 与 MuJoCo 物理和控制笔记](syntheses/isaac-sim-mujoco-control-tuning-notes.md) - 提炼 Isaac Sim 官方文档措辞、PhysX/Isaac Sim 位置驱动语义、刚度/阻尼、力矩限制、七自由度机械臂增益缩放、MuJoCo/PhysX 求解器差异和参数迁移边界
- [三维模型格式学习地图](syntheses/3d-model-formats-learning-map.md) - OBJ、STL、PLY、glTF/GLB、FBX、USD、步骤、URDF/SDF/MJCF 等三维资产格式的学习脚手架与来源获取计划
- [轮式机器人建模学习地图](syntheses/wheeled-robot-modeling-learning-map.md) - 轮式机器人建模学习脚手架，覆盖车轮分类体系、运动学、全向转向分配、仿真路径、失效情形和来源获取计划
- [轮式机器人可视化实验](syntheses/wheeled-robot-visual-lab.md) - 内嵌学术风格交互图，把车轮层约束、接触点速度和底盘矩阵行放在同一张平面图中复习
- [DeepSeek Harness 学习地图](syntheses/dsh-learning-map.md) - DeepSeek Harness（dsh）agent 运行时学习脚手架，覆盖 Cordis 插件框架、profile/bundle 组合、session 事件日志、turn/step 循环、能力 seam、沙箱/审批、编排能力与来源获取计划

## 来源页

### OpenUSD 与资产基础设施

- [Introduction to USD](sources/openusd-introduction.md) - OpenUSD 官方介绍，解释场景描述、阶段/层/图元数据模型、结构规范、组合弧、Hydra、扩展点与边界条件

### 传感器仿真与渲染

- [NVIDIA ovrtx](sources/nvidia-ovrtx.md) - NVIDIA Omniverse RTX 的 C/Python SDK 代码仓库快照，覆盖 OpenUSD 运行时阶段、RenderProduct/RenderVar、相机/lidar/radar 输出、DLPack 映射、异步生命周期、场景查询和 0.3.0 局限

### 世界模型

- [A Comprehensive Survey on World Models for Embodied AI](sources/a-comprehensive-survey-on-world-models-for-embodied-ai.md) - 具身智能世界模型的 POMDP/ELBO 形式化、三轴分类体系、数据集/指标与开放挑战
- [AwesomeWorldModels](sources/awesome-world-models.md) - 综述配套 GitHub 代码仓库，按分类体系维护世界模型参考文献表

### 机器人基础模型

- [Predictive Inverse Dynamics Models are Scalable Learners for Robotic Manipulation](sources/predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation.md) - Seer/PIDM 框架，用预见标记和逆动力学动作标记端到端连接视觉预测与动作预测
- [Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining](sources/disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining.md) - DeFI 框架，把视觉正向动力学和逆动力学分开预训练，再耦合微调到机器人动作
- [LDA-1B: Scaling Latent Dynamics Action Model via Universal Embodied Data Ingestion](sources/lda-1b-scaling-latent-dynamics-action-model.md) - 动力学中心化机器人基础模型，用 DINO 潜在、MM-DiT 和 EI-30K 做作用感知的异构数据归集
- [π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities](sources/pi07-steerable-generalist-robotic-foundation-model.md) - 物理 Intelligence 的可引导的 VLA 模型，强调上下文条件化、子目标图像、元数据与组合式机器人泛化

### 仿真与评估

- [EmbodiedGen: Towards a Generative 3D World Engine for Embodied Intelligence](sources/embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence.md) - 模块化生成式 3D 世界引擎，覆盖物体/纹理/关节系统/场景/布局生成、自动质量检查和仿真器资产导出
- [EmbodiedGen V2: An Agentic Simulation-Ready 3D World Engine for Embodied AI](sources/embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai.md) - 智能体式可用于仿真的世界引擎，把公制几何、碰撞修复、物理参数、任务可供性、场景约束、多房间世界和有状态自然语言编程接成可执行流程
- [MagicSim: A Unified Infrastructure for Executable Embodied Interaction](sources/magicsim-a-unified-infrastructure-for-executable-embodied-interaction.md) - 把异构世界、确定性批处理运行时、多机器人控制、异步规划、共享任务 MDP、AtomicSkill、成功门控轨迹与智能体接口组织成同一个可执行回合基础设施
- [AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning](sources/agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning.md) - 人形机器人强化学习工作流，把环境验证、训练稳定化、确定性评估和描述文件驱动的部署接成仿真到现实迁移生命周期
- [VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation](sources/viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation.md) - 项目页介绍基于 RGB 的人形机器人移动操作，覆盖特权 RL 教师策略、视觉学生策略蒸馏、视觉随机化、手指系统辨识、视场角对齐、泛化视频和失败案例
- [GRAIL: Generating Humanoid Loco-Manipulation from 3D Assets and Video Priors](sources/grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors.md) - 全数字化人形机器人数据生成流程，用 3D 资产、VFM 先验、公制四维人物—物体交互重建、重定向和通用任务跟踪器训练 Unitree G1 视觉策略
- [机器人仿真基础设施](sources/robotics-simulation-infrastructure.md) - Stone Tao 的仿真基础设施博客，覆盖任务/API、资产管理、物理/渲染、可视化工具、机器学习集成、渲染内存/保真度和位姿 API 取舍
- [UniLab: A Heterogeneous Architecture for Robot RL Beyond GPU-Dominant Paradigms](sources/unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms.md) - 异构 CPU-仿真 / GPU-学习机器人 RL 训练系统，把采集器与学习器重叠执行、回放边界、主机到设备传输和同步写成端到端效率问题
- [UniLab Repository](sources/unilab-repository.md) - UniLab 官方代码仓库 README 快照，补充统一的运行时、安装、训练脚本、基准、配置表面和支持的示例
- [MuJoCoUni: Persistent Batched Runtime Primitives for MuJoCo](sources/mujocouni-persistent-batched-runtime-primitives-for-mujoco.md) - MuJoCoUni 技术报告，把持久批处理 MuJoCo 执行、重置时随机化和在线机器人学习运行时基元写成系统设计
- [MotrixSim Documentation](sources/motrixsim-documentation.md) - MotrixSim 文档，描述 Rust CPU 实现、MJCF 兼容性、广义坐标建模、约束求解器和 Python API
- [MuJoCo Warp (MJWarp) Documentation](sources/mujoco-warp-mjwarp-documentation.md) - MuJoCo 官方 MJWarp 文档，覆盖 NVIDIA Warp 实现、并行仿真路线、MuJoCo 兼容性边界和硬件/依赖假设
- [mjlab Repository](sources/mjlab-repository.md) - mjlab 官方代码仓库 README 快照，把 Isaac Lab-风格管理器 API 与 MuJoCo Warp GPU 物理组合成机器人学习框架
- [MuJoCo Playground Repository](sources/mujoco-playground-repository.md) - MuJoCo Playground 官方代码仓库 README 快照，覆盖基于 MJX/MJWarp 的 GPU 环境、运动与操作任务和仿真到现实迁移示例
- [Isaac Lab Repository](sources/isaac-lab-repository.md) - Isaac Lab 官方代码仓库 README 快照，覆盖基于 Isaac Sim 的强化学习、模仿学习与运动规划框架，以及机器人资产、环境库和部署路线
- [ManiSkill Repository](sources/maniskill-repository.md) - ManiSkill 官方代码仓库 README 快照，覆盖基于 SAPIEN 的操作环境、视觉数据生成、基准任务和学习集成
- [NVlabs/RoboLab](sources/nvlabs-robolab.md) - RoboLab 官方实现代码仓库；2026-06 更新增加仪表盘、自适应采样/统计报告、策略后端契约、Cosmos3 客户端、智能体式场景/任务生成技能与调试/运维文档
- [RoboLab: A High-Fidelity Simulation Benchmark for Analysis of Task Generalist Policies](sources/robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies.md) - NVIDIA 的高保真度仿真基准，用 RoboLab-120、语言变体与敏感性分析评测任务通用型机器人策略
- [RoboCasa365: A Large-Scale Simulation Framework for Training and Benchmarking Generalist Robots](sources/robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots.md) - 365 个厨房任务、2,500 个预训练场景和人类/合成示范组成的训练—评测框架，用受控实验研究任务/场景多样性、数据构成、组合泛化和持续学习
- [Asset Structure - Isaac Sim 4.5 Documentation](sources/isaac-sim-45-asset-structure.md) - Isaac Sim 4.5 文档中的旧版 / 3.0 之前资产布局，覆盖 `asset_base.usd`、`parts.usd`、`asset_sim_optimized.usd`、特征层和最终 `asset.usd`
- [Asset Structure - Isaac Sim Documentation](sources/isaac-sim-asset-structure.md) - Isaac Sim 6.0 EDR 文档中的 USD 资产结构 3.0 指南，说明机器人资产的几何/材质与实例/物理/运行时/结构规范/特征层组织
- [Articulations - Omni Physics](sources/omniverse-omni-physics-articulations.md) - NVIDIA Omni 物理文档中的 PhysX 约化坐标关节系统指南，覆盖根部/拓扑、JointStateAPI、驱动性能适用范围、关节摩擦、闭环机构、mimic 关节和肌腱

### 接触物理

- [Contact Models in Robotics: a Comparative Analysis](sources/contact-models-in-robotics-a-comparative-analysis.md) - 机器人接触模型与接触求解器的对比综述和基准

### 碰撞几何与碰撞体制作

- [MuJoCo Computation: Collision Detection](sources/mujoco-computation-collision-detection.md) - MuJoCo 官方文档中的基于几何体的碰撞流程、凸几何体限制、GJK/EPA、单一与多接触点和凸分解指南
- [Isaac Sim Core API Collision Approximation](sources/isaac-sim-core-api-collision-approximation.md) - Isaac Sim Core API 文档中的碰撞近似模式，包括三角形网格、凸分解、凸包、包围球与包围盒、SDF 和球体填充
- [V-HACD Repository](sources/v-hacd-repository.md) - 已弃用并归档的 V-HACD README，说明近似凸分解的动机、NP 困难精确分解边界和实用的凸包数量预算取舍
- [CoACD Repository](sources/coacd-repository.md) - CoACD 实现 README，覆盖 `run_coacd` 用法、阈值 / 凸包数量 / MCTS 参数、真实指标模式和预处理说明
- [Approximate Convex Decomposition for 3D Meshes with Collision-Aware Concavity and Tree Search](sources/coacd-approximate-convex-decomposition.md) - CoACD 论文，提出碰撞感知凹度、直接平面切分、MCTS 搜索，并展示把手保留碰撞体改变抽屉开启成功
- [Convex Primitive Decomposition for Collision Detection](sources/convex-primitive-decomposition-for-collision-detection.md) - 用盒体、胶囊体、球体、圆柱体等基元碰撞体自动拟合网格的面向运行时的碰撞体分解论文
- [VisACD: Visibility-Based GPU-Accelerated Approximate Convex Decomposition](sources/visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition.md) - 基于可见性、GPU 加速的、旋转等变的 ACD 论文
- [DCOL: Differentiable Collision Detection for a Set of Convex Primitives](sources/dcol-differentiable-collision-detection-for-a-set-of-convex-primitives.md) - 用最小均匀扩展因素和可微的锥优化处理凸基元碰撞的论文
- [DiffPills: Differentiable Collision Detection for Capsules and Padded Polygons](sources/diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons.md) - 胶囊体 / 带填充的多边形可微的碰撞检测论文，用邻近值进入轨迹优化

### 轮式机器人建模

- [Modern Robotics Chapter 13: Wheeled Mobile Robots](sources/modern-robotics-chapter-13-wheeled-mobile-robots.md) - Lynch 和 Park 的轮式移动式机器人章节，覆盖平面底盘旋量、omni/mecanum 运动学、非完整约束规范的模型、李括号可控性、里程计和移动操作
- [Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots](sources/structural-properties-and-classification-of-wheeled-mobile-robots.md) - Campion、Bastin 和 D'Andrea-Novel 的 WMR 分类体系来源，提出机动度、可转向度和五类非退化 WMR

## 概念页

### OpenUSD 与资产基础设施

- [OpenUSD 场景组合](concepts/OpenUSDSceneComposition.md) - 把 OpenUSD 的阶段、层、图元数据模型、结构规范、组合弧、Hydra 与 Isaac Sim 机器人学资产分层连接起来的学习页

### 传感器仿真与渲染

- [RTX 传感器仿真流程](concepts/RTXSensorSimulationPipeline.md) - ovrtx 中 OpenUSD 场景、传感器图元、RenderProduct、RenderVar、DLPack 张量输出与 CPU/CUDA 映射组成的传感器仿真流程

### 世界模型

- [具身智能世界模型](concepts/WorldModelsForEmbodiedAI.md) - 动作条件化的潜在仿真器的 POMDP/ELBO 机制与实用的失效情形
- [World Model Taxonomy](concepts/WorldModelTaxonomy.md) - 功能、时间建模、空间表示三轴分类
- [世界模型评估](concepts/WorldModelEvaluation.md) - 从像素保真度、状态理解到任务性能的世界模型评估层次
- [潜在动力学动作模型](concepts/LatentDynamicsActionModels.md) - 用 DINO 潜在表示、扩散动作块与多任务目标路由学习机器人交互动力学
- [逆动力学模型](concepts/InverseDynamicsModels.md) - 从当前/未来视觉转移推断动作或潜在动作的模型，包含 DeFI/GIDM 的自监督视频预训练机制

### 机器人基础模型

- [视觉—语言—动作模型](concepts/VisionLanguageActionModels.md) - 从观测历史和上下文预测机器人动作块的 VLA 策略形式化表述
- [机器人上下文条件化](concepts/RobotContextConditioning.md) - 用任务/子任务语言、元数据、子目标图像与控制模式消除异构机器人数据中的歧义
- [Compositional Generalization in Robotics](concepts/CompositionalGeneralizationInRobotics.md) - 机器人策略如何把见过的技能、物体、机器人形态与指令重新组合到未见的任务
- [机器人学习数据构成](concepts/RobotLearningDataComposition.md) - 用任务覆盖、场景覆盖、示范来源与质量、采样权重和训练阶段解释机器人预训练数据的有效性

### 仿真与评估

- [可用于仿真的三维世界生成](concepts/SimulationReady3DWorldGeneration.md) - 从生成外观到公制几何、物理、语义、可供性和完整接口的仿真资产与世界约束合成框架
- [人形机器人强化学习工作流](concepts/HumanoidRLWorkflow.md) - 从机器人/MDP 验证到训练、评估、描述文件导出和硬件部署的人形机器人强化学习生命周期
- [通用任务策略评估](concepts/TaskGeneralistPolicyEvaluation.md) - 用任务库、语言变体、判定条件、子任务评分和诊断评估泛化机器人策略
- [机器人仿真基础设施](concepts/RoboticsSimulationInfrastructure.md) - 把仿真器框架拆成任务/API、资产管理、物理/渲染、可视化工具和 ML 循环的设计决策
- [可执行具身交互基础设施](concepts/ExecutableEmbodiedInteractionInfrastructure.md) - 用共享任务 MDP、按环境异步状态机、在线规划、固定技能接口、可重放初态与成功门控记录把基准、数据生成和智能体交互接到同一回合
- [仿真基准报告流程](concepts/SimulationBenchmarkReportingPipeline.md) - 把轨迹采样输出、回合证据、成功比率不确定性、自适应采样和仪表盘复核组织成基准报告系统
- [智能体式场景与任务生成](concepts/AgenticSceneTaskGeneration.md) - 用 LLM/智能体式工作流生成场景、物体、判定条件和任务数据类，并把验证边界接回仿真基准基础设施
- [异构机器人强化学习训练](concepts/HeterogeneousRobotRLTraining.md) - 把基于仿真的机器人 RL 训练写成 CPU/GPU 职责分配、采集器/学习器重叠、回放边界、主机到设备传输、缓冲和权重同步的系统问题
- [仿真敏感性分析](concepts/SimulationSensitivityAnalysis.md) - 用受控扰动与 NPE/MNPE 后验找出影响机器人策略成功的环境参数
- [仿真—现实差距](concepts/SimulationRealityGap.md) - 接触近似、学得的动力学和策略上下文造成仿真到现实迁移不匹配的因果流程
- [视觉仿真到现实迁移](concepts/VisualSimToReal.md) - VIRAL 风格的教师—学生表述、域随机化、真实到仿真的手部与相机对齐，以及部署失效情形
- [资产条件化人物—物体交互生成](concepts/AssetConditionedHOIGeneration.md) - GRAIL-风格生成的人形机器人示范流程：已知三维资产 / 相机 / 公制世界 + VFM 先验 + 交互感知的 4D 重建 + 机器人跟踪
- [Isaac Sim 旧版资产结构](concepts/IsaacSimLegacyAssetStructure.md) - Isaac Sim 4.5 旧版 / 3.0 之前资产布局；现有来源不支持“2.0”这一命名，并与资产结构 3.0 对照
- [Isaac Sim 资产结构 3.0](concepts/IsaacSimAssetStructure.md) - 用架构图、USD 层、载荷、引用和变体组织 Isaac Sim 机器人资产，并隔离中性物理与 MuJoCo/PhysX 专用调优
- [约化坐标关节系统](concepts/ReducedCoordinateArticulations.md) - PhysX / Omni 物理关节系统的机制层级页面，覆盖约化坐标、根部选择、驱动器适用范围、mimic/tendon 约束和求解器失效情形

### 接触物理

- [机器人学中的接触模型](concepts/ContactModelsInRobotics.md) - 仿真器接触定律选择作为建模假设，并包含接触流程图
- [接触互补](concepts/ContactComplementarity.md) - 刚性接触、摩擦锥体、NCP/LCP/CCP 与残差直觉
- [接触求解器](concepts/ContactSolvers.md) - 计算接触力与冲量的数值方法，以及求解器分类体系
- [可微物理](concepts/DifferentiablePhysics.md) - 仿真器梯度、接触产物与梯度污染
- [机器人仿真的碰撞几何](concepts/CollisionGeometryForRobotSimulation.md) - 球体、胶囊体、圆柱体、凸包、ACD、SDF 和可微的基元如何改变接触生成与机器人策略行为
- [近似凸分解](concepts/ApproximateConvexDecomposition.md) - V-HACD、CoACD、VisACD 和凸基元分解的数学结构、直觉、失效情形与实践含义
- [可微碰撞检测](concepts/DifferentiableCollisionDetection.md) - DCOL / DiffPills 风格碰撞指标如何把基元碰撞体变成轨迹优化约束与梯度

### 轮式机器人建模

- [轮式机器人运动学](concepts/WheeledRobotKinematics.md) - 车轮速度、转向角度、机体旋量、滚动/无滑移约束和 $u=H(0)V_b$ 的统一建模入口
- [轮式移动机器人分类](concepts/WheeledMobileRobotClassification.md) - Campion 分类体系中的 $\delta_m$、$\delta_s$、$\delta_M$ 与五类 WMR
- [全向轮](concepts/OmnidirectionalWheels.md) - 全向轮与麦克纳姆轮的秩条件、可行旋量多面体、滚轮接触失效情形和仿真实践含义
- [非完整约束移动机器人](concepts/NonholonomicMobileRobots.md) - 单轮车、差速驱动和类汽车模型的 Pfaffian 约束、规范模型和李括号可控性
- [可转向轮](concepts/SteerableWheels.md) - 中心式可转向轮、偏心脚轮、全向转向模块和转向自由度的失效情形
- [Mobile Robot Odometry](concepts/MobileRobotOdometry.md) - 用车轮编码器增量估计底盘位姿的 $H^\dagger$ / SE(2) 集成方法与漂移来源

## 实体页

### 模型、数据集与基准

- [EmbodiedGen](entities/EmbodiedGen.md) - 从模块化三维内容生成演进到智能体式、可用于仿真的资产、世界与任务生成系统
- [AGILE](entities/AGILE.md) - Isaac Lab/RSL-RL 基于人形机器人强化学习工作流层，统一验证、训练、评估和描述文件驱动的部署
- [DeFI](entities/DeFI.md) - 解耦的正向/逆动力学预训练框架，用 GFDM、GIDM 和动作适配器把视频映射为机器人指令
- [EI-30K](entities/EI30K.md) - LDA-1B 来源构建的三万小时以上异构具身交互数据集
- [LDA-1B](entities/LDA1B.md) - 动力学中心化机器人基础模型，统一策略、潜在动力学和视觉预测
- [Seer](entities/Seer.md) - 端到端 PIDM 模型，用 [FRS] 预见标记和 [INV] 动作标记做机器人操作策略学习
- [π0.7](entities/Pi07.md) - 可引导的通用型 VLA 模型，使用语言、元数据、子目标图像和控制模式条件化
- [RoboLab](entities/RoboLab.md) - 高保真度仿真基准/平台用于任务泛化机器人策略评估
- [RoboCasa365](entities/RoboCasa365.md) - 连接 365 个任务、2,500 个厨房、人类/合成示范、策略训练和系统评测的家庭移动操作仿真框架
- [VIRAL](entities/VIRAL.md) - 视觉仿真到现实迁移框架用于人形机器人移动操作，使用特权教师策略、视觉学生策略蒸馏、视觉随机化和现实到仿真对齐
- [GRAIL](entities/GRAIL.md) - 全数字化人形机器人移动操作数据生成框架，使用 3D 资产、VFM 先验、公制四维人物—物体交互重建和通用任务跟踪器
- [UniLab](entities/UniLab.md) - 异构 CPU-仿真 / GPU-学习机器人 RL 训练系统，使用统一的运行时管理轨迹采样采集、缓冲、主机到设备传输和学习器同步
- [MagicSim](entities/MagicSim.md) - Isaac Sim 之上的可执行具身交互基础设施，用一个确定性批处理运行时和共享任务 MDP 连接评测、自动轨迹采集与智能体交互
- [ContactBench](entities/ContactBench.md) - 来源中的统一的 C++ 接触模型基准框架

### 组织与代码仓库

- [AwesomeWorldModels](entities/AwesomeWorldModels.md) - 综述配套的参考文献代码仓库
- [Galbot](entities/Galbot.md) - LDA-1B 来源中的作者机构与 Galbot G1 现实世界评估平台上下文
- [NVIDIA](entities/NVIDIA.md) - RoboLab 论文与项目、VIRAL 关联的 NVlabs 代码仓库，以及 Isaac Sim 资产结构文档的发布机构
- [Pixar](entities/Pixar.md) - OpenUSD 官方文档的版权所有者与 USD 生产流程历史传承上下文
- [Physical Intelligence](entities/PhysicalIntelligence.md) - π0.7 来源中的机器人基础模型研究组织

### 场景描述平台

- [OpenUSD](entities/OpenUSD.md) - 通用的场景描述 / OpenUSD 场景描述平台；当前覆盖范围聚焦官方介绍与 Isaac Sim 资产结构用法

### 碰撞几何方法

- [CoACD](entities/CoACD.md) - 碰撞感知近似凸分解方法 / 实现，用凹度指标、平面切分和 MCTS 保留碰撞相关的细节
- [V-HACD](entities/VHACD.md) - 已弃用并归档的体素化分层近似凸分解基线
- [VisACD](entities/VisACD.md) - 基于可见性的 GPU 加速 ACD 方法，强调旋转等变且无相交的碰撞体分解
- [DCOL](entities/DCOL.md) - 可微的碰撞检测方法用于凸基元，用最小均匀扩展因素生成碰撞约束与梯度
- [DiffPills](entities/DiffPills.md) - 可微碰撞检测方法用于胶囊体与带填充的多边形

### 仿真工具

- [Isaac Sim](entities/IsaacSim.md) - NVIDIA 机器人学仿真技术栈；当前有来源支持的内容包括旧版 / 3.0 之前资产结构、Isaac Sim 6.0 EDR 资产结构 3.0、Core API 碰撞近似模式与 Omni 物理关节系统语义
- [ovrtx](entities/Ovrtx.md) - NVIDIA Omniverse RTX 的轻量的 C/Python 传感器仿真 SDK，使用 OpenUSD 运行时阶段、RenderProduct/RenderVar 和 DLPack 张量输出
- [PhysX](entities/PhysX.md) - NVIDIA 物理运行时 / SDK 族；当前知识库覆盖范围聚焦 Omni 物理关节系统来源中的约化坐标机制、驱动器适用范围、mimic 关节和肌腱
- [MuJoCo](entities/MuJoCo.md) - 机器人学物理引擎；当前覆盖接触正则化取舍、基于几何体的碰撞检测、凸碰撞约束，以及 Isaac Sim 中的引擎专用资产层上下文
- [Isaac Lab](entities/IsaacLab.md) - 基于 Isaac Sim 的开源机器人学框架，用于强化学习、模仿学习、运动规划与仿真到现实迁移
- [MJWarp](entities/MJWarp.md) - 以 NVIDIA Warp 实现、面向 NVIDIA GPU 并行 MuJoCo 仿真的路线
- [mjlab](entities/Mjlab.md) - 把 Isaac Lab 风格的管理器 API 与 MuJoCo Warp GPU 物理结合起来的机器人学习框架
- [MotrixSim](entities/MotrixSim.md) - 高性能机器人学仿真引擎，强调 Rust CPU 实现、广义的坐标、MJCF 兼容性和专有的约束求解器
- [MuJoCo Playground](entities/MuJoCoPlayground.md) - GPU 加速的 MuJoCo MJX/MJWarp 环境套件，用于机器人学习研究与仿真到现实迁移
- [MuJoCoUni](entities/MuJoCoUni.md) - 面向持久批处理运行时基元、在线机器人学习和批量物理评估的 MuJoCo 下游发行版
- [ManiSkill](entities/ManiSkill.md) - Stone Tao 文章中用于说明 Python API、批量渲染性能和 `Pose` 抽象的机器人学仿真框架
- [RaiSim](entities/RaiSim.md) - 来源中用于讨论四足机器人迁移与逐接触点处理的机器人学仿真器
