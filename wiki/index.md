---
title: "Wiki Index"
type: synthesis
tags: [index, navigation]
sources: []
last_updated: 2026-05-07
---

# Wiki Index

这个文件由 Codex 维护。新增、重命名或删除 wiki pages 时必须同步更新。第一部分是研究入口；后半部分是完整 inventory，用于 Obsidian、Quartz 和 deterministic health checks。

## 从研究问题进入

- **当前总判断**：先读 [Overview（总览）](overview.md)。它维护当前 wiki 对 embodied AI、robotics simulation、world models、robot foundation models 与 evaluation 的综合判断。
- **问题索引**：读 [Research Questions](syntheses/research-questions.md)。它把当前 wiki 能回答的高价值问题连接到相应 concept/source，而不额外引入复杂 map 层。
- **World model 如何影响 robot decision？** 读 [World Models for Embodied AI](concepts/WorldModelsForEmbodiedAI.md)、[World Model Evaluation](concepts/WorldModelEvaluation.md)、[Latent Dynamics Action Models](concepts/LatentDynamicsActionModels.md)。
- **Inverse dynamics model 怎么从视频学 action？** 读 [Inverse Dynamics Models](concepts/InverseDynamicsModels.md)、[Latent Dynamics Action Models](concepts/LatentDynamicsActionModels.md)、[Seer](entities/Seer.md)、[DeFI](entities/DeFI.md)。
- **Robot foundation model 如何处理 heterogeneous data？** 读 [Vision-Language-Action Models](concepts/VisionLanguageActionModels.md)、[Robot Context Conditioning](concepts/RobotContextConditioning.md)、[Latent Dynamics Action Models](concepts/LatentDynamicsActionModels.md)。
- **Simulation benchmark 能证明什么？** 读 [Task-Generalist Policy Evaluation](concepts/TaskGeneralistPolicyEvaluation.md)、[Simulation Sensitivity Analysis](concepts/SimulationSensitivityAnalysis.md)、[Simulation Reality Gap（仿真现实差距）](concepts/SimulationRealityGap.md)。
- **OpenUSD 的核心价值是什么？** 读 [OpenUSD Scene Composition](concepts/OpenUSDSceneComposition.md)、[OpenUSD](entities/OpenUSD.md) 和 [Introduction to USD](sources/openusd-introduction.md)；如果关注 robotics asset authoring，再接 [Isaac Sim Asset Structure 3.0](concepts/IsaacSimAssetStructure.md) 与 [Isaac Sim Legacy Asset Structure](concepts/IsaacSimLegacyAssetStructure.md)。
- **Isaac Sim Asset Structure 3.0 怎么理解？** 读 [Isaac Sim Asset Structure 3.0](concepts/IsaacSimAssetStructure.md) 和 [Asset Structure - Isaac Sim Documentation](sources/isaac-sim-asset-structure.md)，重点看 layer role、payload/variant composition 和 engine-specific tuning 隔离。
- **Isaac Sim 旧 asset layout 是不是 2.0？** 读 [Isaac Sim Legacy Asset Structure](concepts/IsaacSimLegacyAssetStructure.md) 和 [Asset Structure - Isaac Sim 4.5 Documentation](sources/isaac-sim-45-asset-structure.md)；当前 source-backed 结论是它应称为 legacy / pre-3.0，而不是 2.0。
- **Isaac Sim 的 `mujoco.usda` 应该放什么？** 读 [Isaac Sim mujoco.usda Runtime Semantics](syntheses/isaac-sim-mujoco-usda-runtime-semantics.md) 和 [Isaac Sim Asset Structure 3.0](concepts/IsaacSimAssetStructure.md)，重点区分 shared visual/collider asset semantics 与 MuJoCo-only runtime tuning。
- **PhysX articulation、position drive、solver 和 joint gains 怎么理解？** 先读 [Reduced-Coordinate Articulations](concepts/ReducedCoordinateArticulations.md) 和 [Articulations - Omni Physics](sources/omniverse-omni-physics-articulations.md)，再读 [Isaac Sim and MuJoCo Physics and Control Notes](syntheses/isaac-sim-mujoco-control-tuning-notes.md)；PhysX articulation drive 的 PD analogy 和 envelope 已有 official source support，MuJoCo 对比与机械臂 gain grouping 仍是 conversation-derived。
- **OBJ、STL、USD、GLB 等 3D 模型格式怎么选？** 读 [3D Model Formats Learning Map](syntheses/3d-model-formats-learning-map.md)，注意其中 USD 相关内容已有 wiki source-backed coverage，其他格式仍是 unsourced learning scaffold。
- **Contact physics 为什么会影响 learning/control？** 读 [Contact Models in Robotics](concepts/ContactModelsInRobotics.md)、[Contact Complementarity（接触互补）](concepts/ContactComplementarity.md)、[Contact Solvers（接触求解器）](concepts/ContactSolvers.md)、[Differentiable Physics（可微物理）](concepts/DifferentiablePhysics.md)。
- **轮式机器人建模怎么系统学习？** 读 [Wheeled Robot Modeling Learning Map](syntheses/wheeled-robot-modeling-learning-map.md)、[Wheeled Robot Visual Lab](syntheses/wheeled-robot-visual-lab.md)、[Wheeled Robot Kinematics](concepts/WheeledRobotKinematics.md)、[Wheeled Mobile Robot Classification](concepts/WheeledMobileRobotClassification.md)、[Omnidirectional Wheels](concepts/OmnidirectionalWheels.md)、[Nonholonomic Mobile Robots](concepts/NonholonomicMobileRobots.md) 和 [Steerable Wheels](concepts/SteerableWheels.md)。

## 维护入口

- [Wiki Log](log.md) - append-only operation history
- Health check: `python3 tools/health.py`
- Graph build: `uv run python tools/build_graph.py --report`
- Publishing preview: `npm run wiki:preview`
- Production build: `npm run wiki:build`

## Syntheses

- [Research Questions](syntheses/research-questions.md) - 当前 wiki 支持的高价值研究问题、阅读路径和 evidence boundary
- [Isaac Sim mujoco.usda Runtime Semantics](syntheses/isaac-sim-mujoco-usda-runtime-semantics.md) - distill `mujoco.usda` 的 ownership boundary：不是 visual/collision asset 文件，而是 MuJoCo-specific runtime interpretation / tuning overlay
- [Isaac Sim and MuJoCo Physics and Control Notes](syntheses/isaac-sim-mujoco-control-tuning-notes.md) - distill Isaac Sim 官方文档措辞、PhysX/Isaac Sim position drive semantics、stiffness/damping、effort limit、七自由度机械臂 gain scaling、MuJoCo/PhysX solver 差异和参数迁移边界
- [3D Model Formats Learning Map](syntheses/3d-model-formats-learning-map.md) - OBJ、STL、PLY、glTF/GLB、FBX、USD、STEP、URDF/SDF/MJCF 等 3D asset formats 的学习脚手架与 source acquisition plan
- [Wheeled Robot Modeling Learning Map](syntheses/wheeled-robot-modeling-learning-map.md) - 轮式机器人建模学习脚手架，覆盖 wheel taxonomy、kinematics、swerve allocation、simulation path、failure modes 和 source acquisition plan
- [Wheeled Robot Visual Lab](syntheses/wheeled-robot-visual-lab.md) - 内嵌 academic-style 交互图，把 wheel-level constraints、contact-point velocity 和 chassis matrix rows 放在同一张平面图中复习

## Sources

### OpenUSD And Asset Infrastructure

- [Introduction to USD](sources/openusd-introduction.md) - OpenUSD 官方 introduction，解释 scene description、Stage/Layer/Prim data model、schemas、composition arcs、Hydra、extension points 与边界条件

### World Models

- [A Comprehensive Survey on World Models for Embodied AI](sources/a-comprehensive-survey-on-world-models-for-embodied-ai.md) - embodied AI world models 的 POMDP/ELBO formalization、三轴 taxonomy、datasets/metrics 与 open challenges
- [AwesomeWorldModels](sources/awesome-world-models.md) - survey companion GitHub repository，按 taxonomy 维护 world model bibliography

### Robot Foundation Models

- [Predictive Inverse Dynamics Models are Scalable Learners for Robotic Manipulation](sources/predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation.md) - Seer/PIDM 框架，用 foresight token 和 inverse dynamics action token end-to-end 连接 vision prediction 与 action prediction
- [Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining](sources/disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining.md) - DeFI 框架，把 visual forward dynamics 和 inverse dynamics 分开预训练，再耦合微调到 robot actions
- [LDA-1B: Scaling Latent Dynamics Action Model via Universal Embodied Data Ingestion](sources/lda-1b-scaling-latent-dynamics-action-model.md) - dynamics-centric robot foundation model，用 DINO latent、MM-DiT 和 EI-30K 做 role-aware heterogeneous data ingestion
- [π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities](sources/pi07-steerable-generalist-robotic-foundation-model.md) - Physical Intelligence 的 steerable VLA model，强调 context conditioning、subgoal images、metadata 与 compositional robot generalization

### Simulation And Evaluation

- [NVlabs/RoboLab](sources/nvlabs-robolab.md) - RoboLab official implementation repository，包含 Isaac Lab task library、predicate/subtask system、policy clients 与 analysis tooling
- [RoboLab: A High-Fidelity Simulation Benchmark for Analysis of Task Generalist Policies](sources/robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies.md) - NVIDIA 的 high-fidelity simulation benchmark，用 RoboLab-120、language variants 与 sensitivity analysis 评测 task-generalist robot policies
- [Asset Structure - Isaac Sim 4.5 Documentation](sources/isaac-sim-45-asset-structure.md) - Isaac Sim 4.5 docs 中的 legacy / pre-3.0 asset layout，覆盖 `asset_base.usd`、`parts.usd`、`asset_sim_optimized.usd`、feature layers 和 final `asset.usd`
- [Asset Structure - Isaac Sim Documentation](sources/isaac-sim-asset-structure.md) - Isaac Sim 6.0 EDR docs 中的 USD Asset Structure 3.0 guidance，说明 robot assets 的 geometry/material/instance/physics/runtime/schema/feature layer organization
- [Articulations - Omni Physics](sources/omniverse-omni-physics-articulations.md) - NVIDIA Omni Physics docs 中的 PhysX reduced-coordinate articulation guidance，覆盖 root/topology、JointStateAPI、drive performance envelope、joint friction、closed loops、mimic joints 和 tendons

### Contact Physics

- [Contact Models in Robotics: a Comparative Analysis](sources/contact-models-in-robotics-a-comparative-analysis.md) - robotic contact models 与 contact solvers 的 comparative survey 和 benchmark

### Wheeled Robot Modeling

- [Modern Robotics Chapter 13: Wheeled Mobile Robots](sources/modern-robotics-chapter-13-wheeled-mobile-robots.md) - Lynch 和 Park 的 wheeled mobile robot chapter，覆盖 planar chassis twist、omni/mecanum kinematics、nonholonomic canonical model、Lie bracket controllability、odometry 和 mobile manipulation
- [Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots](sources/structural-properties-and-classification-of-wheeled-mobile-robots.md) - Campion、Bastin 和 D'Andrea-Novel 的 WMR taxonomy source，提出 degree of mobility、degree of steerability 和五类 nondegenerate WMR

## Concepts

### OpenUSD And Asset Infrastructure

- [OpenUSD Scene Composition](concepts/OpenUSDSceneComposition.md) - 把 OpenUSD 的 Stage/Layer/Prim data model、schemas、composition arcs、Hydra 与 Isaac Sim robotics asset layering 连接起来的学习页

### World Models

- [World Models for Embodied AI](concepts/WorldModelsForEmbodiedAI.md) - action-conditioned latent simulators 的 POMDP/ELBO 机制与 practical failure modes
- [World Model Taxonomy](concepts/WorldModelTaxonomy.md) - Functionality、Temporal Modeling、Spatial Representation 三轴分类
- [World Model Evaluation](concepts/WorldModelEvaluation.md) - world model metrics 从 pixel fidelity 到 state understanding 与 task performance 的评估层次
- [Latent Dynamics Action Models](concepts/LatentDynamicsActionModels.md) - 用 DINO latent、diffusion action chunks 与 multi-task objective routing 学习 robot interaction dynamics
- [Inverse Dynamics Models](concepts/InverseDynamicsModels.md) - 从 current/future visual transition 推断 action 或 latent action 的模型，包含 DeFI/GIDM 的 self-supervised video pretraining 机制

### Robot Foundation Models

- [Vision-Language-Action Models](concepts/VisionLanguageActionModels.md) - 从 observation history 和 context 预测 robot action chunks 的 VLA policy formalism
- [Robot Context Conditioning](concepts/RobotContextConditioning.md) - 用 task/subtask language、metadata、subgoal images 与 control mode disambiguate heterogeneous robot data
- [Compositional Generalization in Robotics](concepts/CompositionalGeneralizationInRobotics.md) - robot policies 如何把 seen skills、objects、embodiments 与 instructions 重新组合到 unseen tasks

### Simulation And Evaluation

- [Task-Generalist Policy Evaluation](concepts/TaskGeneralistPolicyEvaluation.md) - 用 task libraries、language variants、predicates、subtask scoring 和 diagnostics 评估泛化 robot policies
- [Simulation Sensitivity Analysis](concepts/SimulationSensitivityAnalysis.md) - 用 controlled perturbations 与 NPE/MNPE posterior 找出影响 robot policy success 的环境参数
- [Simulation Reality Gap（仿真现实差距）](concepts/SimulationRealityGap.md) - contact approximations、learned dynamics 和 policy context 到 sim-to-real mismatch 的 causal flow
- [Isaac Sim Legacy Asset Structure](concepts/IsaacSimLegacyAssetStructure.md) - Isaac Sim 4.5 legacy / pre-3.0 asset layout，明确旧 layout 没有 source-backed 2.0 命名，并与 Asset Structure 3.0 对照
- [Isaac Sim Asset Structure 3.0](concepts/IsaacSimAssetStructure.md) - 用 architecture diagrams、USD layers、payloads、references 和 variants 组织 Isaac Sim robot assets，并隔离 neutral physics 与 MuJoCo/PhysX-specific tuning
- [Reduced-Coordinate Articulations](concepts/ReducedCoordinateArticulations.md) - PhysX / Omni Physics articulation 的 mechanism-level page，覆盖 reduced coordinates、root selection、drive envelope、mimic/tendon constraints 和 solver failure modes

### Contact Physics

- [Contact Models in Robotics](concepts/ContactModelsInRobotics.md) - simulator contact-law choices 作为 modeling assumptions，并包含 contact pipeline 图
- [Contact Complementarity（接触互补）](concepts/ContactComplementarity.md) - rigid contact、friction cone、NCP/LCP/CCP 与 residual intuition
- [Contact Solvers（接触求解器）](concepts/ContactSolvers.md) - 计算 contact forces 与 impulses 的 numerical methods，以及 solver taxonomy
- [Differentiable Physics（可微物理）](concepts/DifferentiablePhysics.md) - simulator gradients、contact artifacts 与 gradient contamination

### Wheeled Robot Modeling

- [Wheeled Robot Kinematics](concepts/WheeledRobotKinematics.md) - wheel speeds、steering angles、body twist、rolling/no-slip constraints 和 $u=H(0)V_b$ 的统一建模入口
- [Wheeled Mobile Robot Classification](concepts/WheeledMobileRobotClassification.md) - Campion taxonomy 中的 $\delta_m$、$\delta_s$、$\delta_M$ 与五类 WMR
- [Omnidirectional Wheels](concepts/OmnidirectionalWheels.md) - omniwheel / mecanum 的 rank condition、feasible twist polyhedron、roller contact failure modes 和仿真实践含义
- [Nonholonomic Mobile Robots](concepts/NonholonomicMobileRobots.md) - unicycle、diff-drive、car-like robot 的 Pfaffian constraint、canonical model 和 Lie bracket controllability
- [Steerable Wheels](concepts/SteerableWheels.md) - centered steerable wheels、off-centered caster wheels、swerve-style modules 和 steering DOF failure modes
- [Mobile Robot Odometry](concepts/MobileRobotOdometry.md) - 用 wheel encoder increments 估计 chassis pose 的 $H^\dagger$ / SE(2) integration 方法与 drift sources

## Entities

### Models, Datasets, And Benchmarks

- [DeFI](entities/DeFI.md) - decoupled forward/inverse dynamics pretraining framework，用 GFDM、GIDM 和 action adapter 从 videos 到 robot commands
- [EI-30K](entities/EI30K.md) - LDA-1B source 构建的 30k+ hour heterogeneous embodied interaction dataset
- [LDA-1B](entities/LDA1B.md) - dynamics-centric robot foundation model，统一 policy、latent dynamics 和 visual forecasting
- [Seer](entities/Seer.md) - end-to-end PIDM model，用 [FRS] foresight token 和 [INV] action token 做 robot manipulation policy learning
- [π0.7](entities/Pi07.md) - steerable generalist VLA model，使用 language、metadata、subgoal images 和 control mode conditioning
- [RoboLab](entities/RoboLab.md) - high-fidelity simulation benchmark/platform for task-generalist robot policy evaluation
- [ContactBench](entities/ContactBench.md) - source 中的 unified C++ contact-model benchmark framework

### Organizations And Repositories

- [AwesomeWorldModels](entities/AwesomeWorldModels.md) - survey companion bibliography repository
- [Galbot](entities/Galbot.md) - LDA-1B source 中的作者机构与 Galbot G1 real-world evaluation platform context
- [NVIDIA](entities/NVIDIA.md) - RoboLab paper/project/repo 与 Isaac Sim Asset Structure docs 的发布机构
- [Pixar](entities/Pixar.md) - OpenUSD official docs 的 copyright holder 与 USD production-pipeline heritage context
- [Physical Intelligence](entities/PhysicalIntelligence.md) - π0.7 source 中的 robot foundation model research organization

### Scene Description Platforms

- [OpenUSD](entities/OpenUSD.md) - Universal Scene Description / OpenUSD scene-description platform；当前 coverage 聚焦 official Introduction 与 Isaac Sim asset-structure usage

### Simulation Tools

- [Isaac Sim](entities/IsaacSim.md) - NVIDIA robotics simulation stack；当前 source-backed coverage 包括 legacy / pre-3.0 Asset Structure、Isaac Sim 6.0 EDR Asset Structure 3.0 与 Omni Physics articulation semantics
- [PhysX](entities/PhysX.md) - NVIDIA physics runtime / SDK family；当前 wiki coverage 聚焦 Omni Physics articulations source 中的 reduced-coordinate mechanisms、drive envelope、mimic joints 和 tendons
- [MuJoCo](entities/MuJoCo.md) - source 中用于讨论 contact regularization tradeoffs 的 robotics physics engine；Isaac Sim docs 中也作为 engine-specific asset layer 出现
- [RaiSim](entities/RaiSim.md) - source 中用于讨论 quadruped transfer 与 per-contact handling 的 robotics simulator
