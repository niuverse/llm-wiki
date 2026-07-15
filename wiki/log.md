---
title: "知识库日志"
type: synthesis
tags: []
sources: []
last_updated: 2026-07-15
---

# 知识库日志

本页按时间顺序记录知识库操作，只追加，不改写。

格式：`## [YYYY-MM-DD] <operation> | <title>`

操作类型：`ingest`、`query`、`distill`、`learn`、`source`、`health`、`lint`、`graph`、`maintenance`

---

## [2026-04-27] ingest | Contact Models in Robotics: a Comparative Analysis

## [2026-04-27] maintenance | 中文/Hybrid 语言规范迁移

## [2026-04-27] maintenance | Quartz 发布层与数学深度扩写

## [2026-04-27] maintenance | Markdown 不硬换行规范迁移

## [2026-04-27] ingest | A Comprehensive Survey on World Models for Embodied AI

## [2026-04-27] ingest | AwesomeWorldModels

## [2026-04-27] maintenance | Quartz LaTeX delimiter 规范化

## [2026-04-27] ingest | π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities

## [2026-04-27] maintenance | MarkItDown source extraction, health/graph tools, and knowledge review

## [2026-04-27] ingest | RoboLab: A High-Fidelity Simulation Benchmark for Analysis of Task Generalist Policies

## [2026-04-27] ingest | NVlabs/RoboLab

## [2026-04-27] maintenance | Fix Mermaid label in Simulation Sensitivity Analysis

## [2026-04-27] maintenance | Audit Mermaid labels for special-character syntax

## [2026-04-27] ingest | LDA-1B: Scaling Latent Dynamics Action Model via Universal Embodied Data Ingestion

## [2026-04-27] maintenance | Research dashboard and lightweight question index

## [2026-04-27] ingest | Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining

## [2026-04-27] ingest | Predictive Inverse Dynamics Models are Scalable Learners for Robotic Manipulation

## [2026-04-28] maintenance | Add distill workflow for conversation-derived knowledge

## [2026-04-28] maintenance | Add learn and source workflows for unsourced study topics

## [2026-04-28] ingest | AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning

## [2026-05-01] ingest | Asset Structure - Isaac Sim Documentation

## [2026-05-01] maintenance | Add Isaac Sim Asset Structure architecture diagrams

## [2026-05-01] ingest | Introduction to USD

## [2026-05-01] learn | Wheeled Robot Modeling

## [2026-05-01] ingest | Modern Robotics Chapter 13: Wheeled Mobile Robots

## [2026-05-01] ingest | Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots

## [2026-05-01] learn | Wheeled Robot Visual Lab

- 新增 `wiki/syntheses/wheeled-robot-visual-lab.md`，作为轮式机器人运动学的内嵌学术可视化脚手架。
- 将其链接到轮式机器人建模学习地图和有来源支持的概念页。

## [2026-05-03] learn | 3D Model Formats Learning Map

- 新增 `wiki/syntheses/3d-model-formats-learning-map.md`，作为 OBJ、STL、PLY、glTF/GLB、FBX、USD、步骤、URDF/SDF/MJCF 及相关资产流程概念的学习脚手架。
- 从 `wiki/index.md` 链接该页，并把非 USD 格式对比标为等待来源查找与收录的无来源学习笔记。

## [2026-05-04] distill | Isaac Sim mujoco.usda Runtime Semantics

- 新增 `wiki/syntheses/isaac-sim-mujoco-usda-runtime-semantics.md`，保存讨论中形成的 `mujoco.usda` 归属边界。
- 更新 `wiki/concepts/IsaacSimAssetStructure.md`、`wiki/entities/MuJoCo.md` 和 `wiki/index.md`。

## [2026-05-04] distill | Isaac Sim and MuJoCo Control Tuning Notes

- 新增 `wiki/syntheses/isaac-sim-mujoco-control-tuning-notes.md`，保存关于 PhysX/Isaac Sim 关节位置驱动、刚度与阻尼、力矩限制、七自由度机械臂增益缩放，以及 MuJoCo/PhysX 调参边界的讨论。
- 更新 `wiki/entities/IsaacSim.md`、`wiki/entities/MuJoCo.md` 和 `wiki/index.md`。

## [2026-05-04] distill | Isaac Sim and MuJoCo Physics and Control Notes

- 扩展 `wiki/syntheses/isaac-sim-mujoco-control-tuning-notes.md`：除控制调参外，补充 Isaac Sim 文档措辞、PhysX 求解器层驱动语义、力矩限制诊断、七自由度机械臂增益缩放、MuJoCo/PhysX 求解器与执行器差异，以及待收录的后续官方文档。
- 更新 `wiki/entities/IsaacSim.md`、`wiki/entities/MuJoCo.md` 和 `wiki/index.md`，指向更完整的物理与控制框架。

## [2026-05-04] ingest | Articulations - Omni Physics

- 新增 `wiki/sources/omniverse-omni-physics-articulations.md`，权威 HTML 保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 新增 `wiki/concepts/ReducedCoordinateArticulations.md` 和 `wiki/entities/PhysX.md`。
- 更新 Isaac Sim、NVIDIA、接触求解器、物理与控制笔记以及知识库索引。

## [2026-05-07] ingest | Asset Structure - Isaac Sim 4.5 Documentation

- 新增 `wiki/sources/isaac-sim-45-asset-structure.md`，权威 HTML 保存于 `raw/`，提取缓存保存于 `graph/extracts/`。
- 新增 `wiki/concepts/IsaacSimLegacyAssetStructure.md` 记录 3.0 之前的旧版布局，并明确避免使用缺乏来源支持的 `Asset Structure 2.0` 标签。
- 更新 `wiki/concepts/IsaacSimAssetStructure.md`、`wiki/entities/IsaacSim.md`、`wiki/entities/NVIDIA.md` 和 `wiki/index.md`。

## [2026-05-13] ingest | VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation

- 新增 `wiki/sources/viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation.md`，权威 HTML 保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 新增 `wiki/concepts/VisualSimToReal.md` 和 `wiki/entities/VIRAL.md`。
- 更新 `wiki/concepts/SimulationRealityGap.md`、`wiki/entities/NVIDIA.md`、`wiki/overview.md` 和 `wiki/index.md`。

## [2026-05-13] ingest | Robotics Simulation Infrastructure

- 新增 `wiki/sources/robotics-simulation-infrastructure.md`，权威 HTML 保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 新增 `wiki/concepts/RoboticsSimulationInfrastructure.md` 和 `wiki/entities/ManiSkill.md`。
- 更新 `wiki/concepts/SimulationRealityGap.md`、`wiki/concepts/TaskGeneralistPolicyEvaluation.md`、`wiki/entities/MuJoCo.md`、`wiki/overview.md` 和 `wiki/index.md`。

## [2026-05-26] ingest | NVIDIA ovrtx

- 从本地克隆的提交 `29d11037fbcaed0f0f53e7f32d17bd0486fd453b` 新增 `raw/ovrtx-source.tar.gz`、`raw/ovrtx-readme.md` 和 `raw/ovrtx-main-commit.json`。
- 新增 `wiki/sources/nvidia-ovrtx.md`、`wiki/entities/Ovrtx.md` 和 `wiki/concepts/RTXSensorSimulationPipeline.md`。
- 更新 OpenUSD、NVIDIA、机器人仿真基础设施、总览和知识库索引。

## [2026-05-26] distill | ovrtx API Boundary

- 新增 `wiki/syntheses/ovrtx-api-boundary.md`，保存 ovrtx 场景组合/传感器渲染 API 与完整物理场景制作之间的边界。
- 更新 `wiki/entities/Ovrtx.md`、`wiki/concepts/RTXSensorSimulationPipeline.md` 和 `wiki/index.md`。

## [2026-06-04] ingest | MuJoCo Computation: Collision Detection

- 新增 `wiki/sources/mujoco-computation-collision-detection.md`，权威 HTML 保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 更新 `wiki/entities/MuJoCo.md`、`wiki/concepts/CollisionGeometryForRobotSimulation.md`、`wiki/concepts/ApproximateConvexDecomposition.md` 和导航页。

## [2026-06-04] ingest | Isaac Sim Core API Collision Approximation

- 新增 `wiki/sources/isaac-sim-core-api-collision-approximation.md`，权威 HTML 保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 更新 `wiki/entities/IsaacSim.md`、`wiki/concepts/IsaacSimAssetStructure.md`、`wiki/concepts/CollisionGeometryForRobotSimulation.md` 和导航页。

## [2026-06-04] ingest | V-HACD Repository

- 新增 `wiki/sources/v-hacd-repository.md`，权威 README 快照保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 新增 `wiki/entities/VHACD.md`，并把 V-HACD 链接到近似凸分解内容。

## [2026-06-04] ingest | CoACD Repository

- 新增 `wiki/sources/coacd-repository.md`，权威 README 快照保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 增加面向实现的 CoACD 参数笔记，并从 `wiki/entities/CoACD.md` 链接。

## [2026-06-04] ingest | Approximate Convex Decomposition for 3D Meshes with Collision-Aware Concavity and Tree Search

- 新增 `wiki/sources/coacd-approximate-convex-decomposition.md`，权威 PDF 保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 新增 `wiki/entities/CoACD.md`，并在 `wiki/concepts/ApproximateConvexDecomposition.md` 中增加有来源支持的保留把手结构碰撞几何讨论。

## [2026-06-04] ingest | Convex Primitive Decomposition for Collision Detection

- 新增 `wiki/sources/convex-primitive-decomposition-for-collision-detection.md`，权威 PDF 保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 在 `wiki/concepts/CollisionGeometryForRobotSimulation.md` 和 `wiki/concepts/ApproximateConvexDecomposition.md` 中增加基元碰撞体趋势笔记。

## [2026-06-04] ingest | VisACD: Visibility-Based GPU-Accelerated Approximate Convex Decomposition

- 新增 `wiki/sources/visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition.md`，权威 PDF 保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 新增 `wiki/entities/VisACD.md`，并把 GPU/基于可见性的 ACD 纳入碰撞体制作分类。

## [2026-06-04] ingest | DCOL: Differentiable Collision Detection for a Set of Convex Primitives

- 新增 `wiki/sources/dcol-differentiable-collision-detection-for-a-set-of-convex-primitives.md`，权威 PDF 保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 新增 `wiki/entities/DCOL.md` 和 `wiki/concepts/DifferentiableCollisionDetection.md`。

## [2026-06-04] ingest | DiffPills: Differentiable Collision Detection for Capsules and Padded Polygons

- 新增 `wiki/sources/diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons.md`，权威 PDF 保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 新增 `wiki/entities/DiffPills.md`，并把胶囊体/带填充多边形的碰撞梯度纳入可微碰撞内容。

## [2026-06-04] ingest | GRAIL: Generating Humanoid Loco-Manipulation from 3D Assets and Video Priors

- 新增 `wiki/sources/grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors.md`，权威 arXiv PDF 保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 新增 `wiki/entities/GRAIL.md` 和 `wiki/concepts/AssetConditionedHOIGeneration.md`。
- 更新视觉仿真到现实迁移、仿真—现实差距、通用任务策略评估、NVIDIA、总览、研究问题和知识库索引。

## [2026-06-05] ingest | UniLab: A Heterogeneous Architecture for Robot RL Beyond GPU-Dominant Paradigms

- 新增 `wiki/sources/unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms.md`，权威 arXiv PDF 保存于 `raw/`，提取的 Markdown 保存于 `graph/extracts/`。
- 新增 `wiki/entities/UniLab.md` 和 `wiki/concepts/HeterogeneousRobotRLTraining.md`。
- 更新机器人仿真基础设施、仿真—现实差距、MuJoCo、总览、研究问题和知识库索引。
## [2026-06-12] ingest | NVlabs/RoboLab repository refresh

- 为 RoboLab 提交 `7d45d74904eade3b578a8eb1f2f9f89bc3d40326` 增加带版本的原始产物，包括 GitHub 代码仓库元数据、主提交元数据、README 快照、相对基线 `5d3ba41e` 的比较 JSON 和源码压缩包。
- 新增 `graph/extracts/robolab-20260612-7d45d749-repository-manifest.md`，作为 19 个提交更新的可读设计与变更清单。
- 更新 `wiki/sources/nvlabs-robolab.md` 和 `wiki/entities/RoboLab.md`，补充仪表盘、自适应统计报告、策略后端契约、Cosmos3 客户端、调试与运维文档，以及智能体式场景/任务生成内容。
- 新增 `wiki/concepts/SimulationBenchmarkReportingPipeline.md` 和 `wiki/concepts/AgenticSceneTaskGeneration.md`；更新通用任务策略评估、仿真基础设施、仿真敏感性分析和机器人上下文条件化概念页。

## [2026-06-30] ingest | Isaac Lab Repository

- 登记待完善的本地来源页 `wiki/sources/isaac-lab-repository.md`，包含原始 README 快照、提取缓存和 `wiki/entities/IsaacLab.md`。

## [2026-06-30] ingest | ManiSkill Repository

- 登记待完善的本地来源页 `wiki/sources/maniskill-repository.md`，包含原始 README 快照和提取缓存。

## [2026-06-30] ingest | mjlab Repository

- 登记待完善的本地来源页 `wiki/sources/mjlab-repository.md`，包含原始 README 快照、提取缓存和 `wiki/entities/Mjlab.md`。

## [2026-06-30] ingest | MotrixSim Documentation

- 登记待完善的本地来源页 `wiki/sources/motrixsim-documentation.md`，包含权威 HTML、提取缓存和 `wiki/entities/MotrixSim.md`。

## [2026-06-30] ingest | MuJoCo Playground Repository

- 登记待完善的本地来源页 `wiki/sources/mujoco-playground-repository.md`，包含原始 README 快照、提取缓存和 `wiki/entities/MuJoCoPlayground.md`。

## [2026-06-30] ingest | MuJoCo Warp (MJWarp) Documentation

- 登记待完善的本地来源页 `wiki/sources/mujoco-warp-mjwarp-documentation.md`，包含权威 HTML、提取缓存、代码仓库 README 快照和 `wiki/entities/MJWarp.md`。

## [2026-06-30] ingest | MuJoCoUni: Persistent Batched Runtime Primitives for MuJoCo

- 登记待完善的本地来源页 `wiki/sources/mujocouni-persistent-batched-runtime-primitives-for-mujoco.md`，包含权威 PDF、提取缓存和 `wiki/entities/MuJoCoUni.md`。

## [2026-06-30] ingest | UniLab Repository

- 登记待完善的本地来源页 `wiki/sources/unilab-repository.md`，包含原始 README 快照和提取缓存。

## [2026-07-11] ingest | EmbodiedGen: Towards a Generative 3D World Engine for Embodied Intelligence

- 新增权威 arXiv PDF 和 MarkItDown 提取结果，并把模块化物体、纹理、关节系统、场景与布局生成流程连接到 [[EmbodiedGen]]、[[SimulationReady3DWorldGeneration]]、[[RoboticsSimulationInfrastructure]] 和 V1/V2 学习地图。

## [2026-07-11] ingest | EmbodiedGen V2: An Agentic, Simulation-Ready 3D World Engine for Embodied AI

- 新增权威 arXiv PDF 和 MarkItDown 提取结果，并把公制、物理、语义、可供性与接口契约，智能体式任务—世界生成，仿真器验证，实验证据和局限整理进知识层。

## [2026-07-13] maintenance | 中文优先的阅读体验统一

- 更新 `AGENTS.md` 中的语言规范：操作说明保持英文，知识页阅读内容以自然中文为主。
- 统一清理导航、综述、概念页、综合页、来源页、实体页和历史日志中的非必要英文，同时保留论文原题、项目名、代码标识、命令、公式与链接目标。

## [2026-07-15] ingest | MagicSim: A Unified Infrastructure for Executable Embodied Interaction

- 保存 arXiv v1 PDF 与 MarkItDown 阅读缓存，新增来源页、[[MagicSim]] 实体页和 [[ExecutableEmbodiedInteractionInfrastructure|可执行具身交互基础设施]] 概念页。
- 更新 [[RoboticsSimulationInfrastructure|机器人仿真基础设施]]、总览和索引，区分当前接口、计划中能力与缺失的定量 / 真实机器人证据。
