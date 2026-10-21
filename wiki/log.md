---
title: "知识库日志"
type: navigation
tags: [navigation, learn]
sources: []
modified: 2026-10-08
---

# 知识库日志

本页按时间顺序记录知识库操作，只追加，不改写。

格式：`## [YYYY-MM-DD] <operation> | <title>`

新记录在标题下注明实际记录时间：`时间：YYYY-MM-DD HH:mm（北京时间，UTC+08:00）`，简述新增或修改了什么、为什么改，并链接相关页面。判断变化时说明原判断、新判断与依据；有可用的版本差异链接时附上。旧记录保留原样，未记录的具体时间不补造。最新记录在本页末尾，也可通过页面目录定位日期。

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

- 保存 arXiv v1 PDF 与 MarkItDown 阅读缓存，新增来源页、[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|MagicSim]] 实体页和 [[ExecutableEmbodiedInteractionInfrastructure|可执行具身交互基础设施]] 概念页。
- 更新 [[RoboticsSimulationInfrastructure|机器人仿真基础设施]]、总览和索引，区分当前接口、计划中能力与缺失的定量 / 真实机器人证据。

## [2026-07-19] ingest | RoboCasa365: A Large-Scale Simulation Framework for Training and Benchmarking Generalist Robots

- 保存 ICLR 2026 官方 PDF 与 MarkItDown 阅读缓存，新增来源页和 [[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]] 实体页。
- 新增 [[RobotLearningDataComposition|机器人学习数据构成]] 概念页，整理任务/场景覆盖、示范质量、采样权重和训练阶段的机制与失效情形。
- 更新 [[TaskGeneralistPolicyEvaluation|通用任务策略评估]]、[[CompositionalGeneralizationInRobotics|机器人学中的组合泛化]]、[[RoboticsSimulationInfrastructure|机器人仿真基础设施]]、[[SimulationRealityGap|仿真—现实差距]]、总览、研究问题和索引。

## [2026-08-18] learn | DeepSeek Harness

- 新增 [[dsh-learning-map|DeepSeek Harness 学习地图]] 综合页：Cordis 插件框架、profile/bundle 组合层、session 事件日志、turn/step 循环、能力 seam、沙箱/审批、goal/subagent/workflow/plan/compaction 编排能力、误解图谱与来源获取计划。
- 内容基于对本机安装包源码（@deepseek-ai/dsh 0.1.0-rc.7）与官方仓库（deepseek-ai/deepseek-harness、cordiverse/paper）的一手调研，标注为 conversation-derived / unsourced learning scaffold；待后续 ingest repo 与 Cordis 论文后升级为 source-backed。

## [2026-08-25] ingest | AgentsDock Releases / AgentsServer

- 新增 `raw/agentsdock-releases-readme.md` 与 `raw/agentsserver-readme.md` 作为官方 README 快照，`raw/agentsserver-version.txt` 记录服务器版本。
- 新增 `wiki/sources/agentsdock-releases.md` 和 `wiki/sources/agentsserver.md`，记录两个仓库的发布边界、核心能力、实现结构与安全/运维要点。
- 新增 `wiki/entities/AgentsDock.md` 和 `wiki/entities/AgentsServer.md`，补充客户端/后端关系、平台现状、安装方式与实现要点。
- 更新 `wiki/index.md`，在来源页和实体页分别增加 Agent 工具与自托管服务小节。

## [2026-08-25] maintenance | Knowledge base automation workflow

- 新增 `.github/workflows/knowledge-base-automation.yml`。
- PR 自动验证：运行 `tools/health.py`、Quartz 构建、图谱构建，并强制提交最新 graph 产物。
- 当 PR 带 `auto-merge` label，或标题/描述包含 `[auto-merge]` 时，自动启用 squash auto-merge。
- 合并到 `main` 后自动重新生成 graph 产物；若 graph 有变化则直接提交回 `main`。

## [2026-09-25] maintenance | 精简条目与修正展示层

六项决策，按人类阅读优先原则执行。

- **实体层收敛**：27 个只对应单一 source 的实体页并入其来源页，成为 `### <名称>` 小节（`AGENTS.md` 新增 Entity Policy）。实体页从 39 降到 12，仅保留横跨多来源的基础设施枢纽。全库 211 处 Wikilink 与 35 处 Markdown 链接改写为带别名的目标，阅读体验不变。
- **索引只做目录**：`index.md` 删除 27 行已并实体与整段「从研究问题进入」（与 overview/RQ 三处重复），改为纯目录并内嵌实体名；1526 → 1153 词。
- **判断与问题分工**：`overview.md` 删除「研究问题面板」（与 RQ 三处重复），「下一步缺口」迁入 RQ 作为唯一位置；719 → 454 词。RQ 收编 4 个 0 入链孤岛主题，488 词。
- **语言修复与常驻检查**：修复 62 处中文散文里的英文名词替换残留（`闭环s`、`non-根`、`动作-free`、`资产 management`、`评估 signal`、`内存 footprint`、`two-阶段` 等）与 32 处多余空格；`tools/health.py` 新增 Language Artifacts 与 Evidence State 两项窄检查。检查前必须屏蔽代码/链接/引语，否则会凭空造出双空格与断裂词。
- **证据状态可见**：来源页统一带 `source-backed`，无来源页必须带状态 tag；tag 从 137 收敛到 42 主题 + 5 状态，词表写入 `index.md`。`DeepSeek Harness 学习地图` 正名为 `来源获取计划`（`tags: [source-plan]`），因为它等的是 ingest。
- **展示层**：frontmatter `last_updated` 改名 `modified`（Quartz 只识别 `created`/`modified`/`published`，原字段一直被静默忽略、fallback 到 git 日期）；`docs/research/robot-simulation-post-training-evaluation.md`（1560 词、零引用、不在 vault 内）迁入 `wiki/syntheses/simulation-post-training-evaluation.md` 并标注 `unsourced`；`WheeledRobotVisualLab` 组件从每页注入收敛到单页（108 → 1 页）；同步修正 `404.tsx` 与 list layout 缺失的 `afterBody`。

wiki 从 134 页降到 106 页，graph 孤儿 0、断链 0。`npm run wiki:build` 通过（此前因 `node_modules` 缺失而无法构建）。

## [2026-09-25] maintenance | 展示层与阅读体验

- **修复中文阅读时间虚高**：`reading-time` 把每个汉字算成一个词，中文页因此虚高约 2.5 倍（`index.md` 报 25 分钟、LDA-1B 来源页报 14 分钟）。`ContentMeta` 改为分别统计汉字与拉丁词，按 400 字/分与 200 词/分合并计算。
- **新增「最近更新」面板**：右栏加 `RecentNotes`（6 条，仅桌面端，排除 index/log），这是站点第一个基于 `modified` 的更新入口。
- **`log.md` 退出发布层**：它是仅追加的操作历史，对读者无价值；加入 `ignorePatterns`，仍在仓库内服务 Codex 与 health 检查。
- **日期诚实性**：并页后一度把 100+ 页刷成同一天，按 `AGENTS.md` 自己的规则回退。最终 27 页为真正改过的日期，69 页保持原审阅日期。
- **顺带修复**：`WheeledRobotVisualLab.tsx` 缺 `@ts-ignore` 导致 `npm run wiki:check` 长期报 1 个类型错误；现已 `tsc` 零错误。

## [2026-09-25] maintenance | 删除 WheeledRobotVisualLab

- 删除自改 Quartz 源码四处：`components/WheeledRobotVisualLab.tsx`、`scripts/wheeledRobotVisualLab.inline.ts`、`scripts/wheeledRobotVisualLab.math.ts`、`styles/wheeledRobotVisualLab.scss`，以及 `tests/wheeledRobotVisualLab.math.test.ts`。
- 删除 `wiki/syntheses/wheeled-robot-visual-lab.md`：该页的全部意义是为组件提供挂载点和读图说明，组件删除后 `## 交互图` 会成为死 div；其数学内容本就由 [[WheeledRobotKinematics]] 承载。
- 删除对应的过期计划文档 `docs/plans/2026-05-01-wheeled-robot-visual-lab{,-design}.md`。
- 清理 `components/index.ts`、`quartz.layout.ts`（去掉唯一的 `afterBody` 块）、`wiki/index.md`、[[wheeled-robot-modeling-learning-map|轮式机器人建模学习地图]] 与 [[research-questions|研究问题]] 中的引用。

结果：Quartz 回到接近上游状态，仓库不再有自改组件，未来升级 Quartz 可直接覆盖。`npm run wiki:check` 与 `npm run wiki:build` 均通过。

## [2026-05-06] ingest | USDA / OpenUSD Syntax References

- 新增 Stage - Learn OpenUSD、OpenUSD File Formats - Learn OpenUSD、What Is Prim Composition? - Learn OpenUSD 和 USD Terms and Concepts 的官方 / reference 原始快照。
- 新增来源页：`wiki/sources/learn-openusd-stage.md`、`wiki/sources/learn-openusd-file-formats.md`、`wiki/sources/learn-openusd-prim-composition.md` 和 `wiki/sources/openusd-glossary.md`。
- 新增 `wiki/concepts/USDAFileSyntax.md`，作为读写 `.usda` 语法的有来源支持入口。
- 更新 `wiki/concepts/OpenUSDSceneComposition.md`、`wiki/entities/OpenUSD.md` 和 `wiki/index.md`，连接新增内容。

## [2026-09-30] maintenance | 拉取最新并恢复本地 OpenUSD 资料

- 快进更新至 `5251eab`，恢复拉取前未提交的 OpenUSD 原始资料、阅读缓存和知识页；原始资料未改写。
- 合并日期字段、标签、来源列表与目录冲突，保留远端的目录职责和本地新增链接；USDA 阅读入口移至研究问题页。
- 本地工作备份保留在 Git stash 中。

## [2026-09-30] maintenance | 学习体验升级与内网预览

- 新增仿真与资产、机器人学习与评测、世界模型、智能体工具四条主题路径；为知识页登记所属主题。
- 首页基于知识页元数据展示主题入口，完整目录仍由 `wiki/index.md` 持有；新增简洁导航与可见证据提示，改善中文排版和移动布局。
- 启动 `8081` 内网预览与 `8082` 自动刷新连接，后续内容整理沿同一预览服务推进。

## [2026-09-30] ingest | Overview - MuJoCo Documentation

- 保存官方 HTML 为 `raw/mujoco-overview.html`，使用 MarkItDown 生成阅读缓存并完整阅读。
- 新增来源档案与 [[RoboticsSimulationLoop|仿真循环]]，连接关节、执行器、碰撞与传感器概念。

## [2026-09-30] ingest | Part 1: Key Concepts in RL - Spinning Up

- 保存官方 HTML 并生成阅读缓存，完整阅读后新增来源档案、[[MarkovDecisionProcesses|MDP 基础]] 与 [[RobotLearningObjectives|学习目标]]。
- 页面原修订年代与本次获取日期分开记录，保留有限时域、观测与状态的适用条件。

## [2026-09-30] ingest | Part 2: Kinds of RL Algorithms - Spinning Up

- 保存官方 HTML 并生成阅读缓存，完整阅读后新增来源档案，连接策略优化、价值学习、模型用途和世界模型。
- 采用其基础机制分类，不据旧教程判断当前方法流行度或性能排名。

## [2026-09-30] ingest | The Basic Structure of glTF - Khronos glTF Tutorials

- 保存官方教程 HTML 并生成阅读缓存，完整阅读后新增来源档案与 [[GLTFSceneStructure|场景数据结构]]。
- 区分已支持的 JSON／资源引用机制与仍待收录的 GLB、材质细节和物理扩展。

## [2026-09-30] maintenance | 学习结构、核心机制与阅读体验升级

建立仿真与资产、机器人学习与评测、世界模型、智能体工具四条主题路径；补充仿真循环、MDP、学习目标、潜在状态空间与 glTF 场景结构五页基础。重整接触模型／互补／求解器、可微物理、世界模型／分类／评估、VLA、上下文条件化与逆动力学；明确公式变量、力与冲量、来源结论、教学算例和待验证风险。压缩 overview，合并研究问题与资料队列，更新格式学习地图与 USDA 解释。为页面增加主题关联及可读链接别名，保持文件名、引用目标和已有原始资料不变。

Quartz 改为主题导航、首页学习入口与证据提示，优化中文排版、移动端、深色与阅读模式；修正内网自动刷新地址，并让首页统计与路径导航响应增量内容修改。预览使用 HTTP 8081 / WebSocket 8082。依赖清单未增加；原始 OpenUSD 工作在拉取前的备份中保留。

## [2026-09-30] maintenance | 学习体验升级验收

确定性健康检查扫描 123 个知识页：断链、未登记页面、缺失原始资料／缓存、缺失收录日志、语言规则与证据状态均无问题。生产构建使用 `-d wiki`，输出到 `/tmp/llm-wiki-production`，避免干扰运行中的内网预览；181 个生成 HTML 页面未发现缺失本地链接或 KaTeX 错误。

TypeScript 与本次改动文件的格式检查通过。浏览器验证桌面／移动布局、主题切换、搜索、深色、阅读模式、折叠推导、公式、Mermaid、目录锚点、GitHub Pages 子路径以及内网 WebSocket 自动刷新。全库 `wiki:check` 的格式阶段仍报告原有 `AGENTS.md` 与 `.github/workflows/knowledge-base-automation.yml` 两处格式问题；两文件与拉取后的 HEAD 相同，本次未修改规则或自动化。

已有受跟踪 `raw/` 文件逐个核对后保持不变；原有远端日志完整保留为前缀，恢复的本地 OpenUSD 收录记录追加在其后。更深的算法教材、跨引擎控制语义与独立硬件复现仍列入研究问题中的资料队列。

## [2026-10-02] maintenance | 精简维护规则与按需自动研究

AGENTS.md 从 333 行精简至 72 行，将重复操作收敛为入口表，保留原始证据不可变、完整阅读、中文机制解释、稳定链接、三层内容职责、语义日期与公开发布边界。新增仓库技能 `.agents/skills/wiki-research/SKILL.md`：`research`／`refresh` 在 Codex 会话中自动搜索、归档、阅读和本地整合；不引入后台、调度或依赖。`tools/archive_source.py` 保存原始字节与 URL、版本、SHA-256，获取记录追加到 `graph/acquisitions.jsonl`，相同内容复用，版本变化另存。

修正健康检查的成功判定：语言异常、空页和证据状态问题均返回失败；无来源概念不能仅用 `source-backed` 标签通过。补充归档不变量与 CLI 门禁测试，旧有效样例补齐来源声明，PR 验证运行两套 Python 测试。公开发布仍由用户触发。

## [2026-10-02] ingest | PlaNet：从像素学习潜在动力学并规划

归档原始资料 `raw/planet-learning-latent-dynamics.pdf`，生成并完整阅读 `graph/extracts/planet-learning-latent-dynamics.md`；版本、日期和实验条件见来源页，校验和与获取记录见归档台账。机制编译进相关概念与学习路径，保留证据边界。

## [2026-10-02] ingest | DreamerV3：在想象中学习控制策略

归档原始资料 `raw/dreamerv3-nature-2025.html`，生成并完整阅读 `graph/extracts/dreamerv3-nature-2025.md`；版本、日期和实验条件见来源页，校验和与获取记录见归档台账。机制编译进相关概念与学习路径，保留证据边界。

## [2026-10-02] ingest | TD-MPC2：以任务价值学习潜在模型并规划

归档原始资料 `raw/td-mpc2-scalable-robust-world-models.pdf`，生成并完整阅读 `graph/extracts/td-mpc2-scalable-robust-world-models.md`；版本、日期和实验条件见来源页，校验和与获取记录见归档台账。机制编译进相关概念与学习路径，保留证据边界。

## [2026-10-02] ingest | DINO-WM：用预训练视觉特征进行目标规划

归档原始资料 `raw/dino-wm-pretrained-visual-features.pdf`，生成并完整阅读 `graph/extracts/dino-wm-pretrained-visual-features.md`；版本、日期和实验条件见来源页，校验和与获取记录见归档台账。机制编译进相关概念与学习路径，保留证据边界。

## [2026-10-02] ingest | V-JEPA 2：视频表征怎样接到机器人规划

归档原始资料 `raw/v-jepa-2-understanding-prediction-planning.pdf`，生成并完整阅读 `graph/extracts/v-jepa-2-understanding-prediction-planning.md`；版本、日期和实验条件见来源页，校验和与获取记录见归档台账。机制编译进相关概念与学习路径，保留证据边界。

## [2026-10-02] ingest | WorldEcho／WorldSync：世界模型是否忠实执行动作

归档原始资料 `raw/worldecho-worldsync-action-following.pdf`，生成并完整阅读 `graph/extracts/worldecho-worldsync-action-following.md`；版本、日期和实验条件见来源页，校验和与获取记录见归档台账。机制编译进相关概念与学习路径，保留证据边界。

## [2026-10-02] ingest | Modern Robotics 3.3.1: Homogeneous Transformation Matrices

归档原始资料 `raw/modern-robotics-3-3-1-homogeneous-transformation.html`，生成并完整阅读 `graph/extracts/modern-robotics-3-3-1-homogeneous-transformation.md`；版本、日期和实验条件见来源页，校验和与获取记录见归档台账。机制编译进相关概念与学习路径，保留证据边界。

## [2026-10-02] ingest | Modern Robotics 8.1: Lagrangian Formulation of Dynamics (Part 1 of 2)

归档原始资料 `raw/modern-robotics-8-1-lagrangian-dynamics.html`，生成并完整阅读 `graph/extracts/modern-robotics-8-1-lagrangian-dynamics.md`；版本、日期和实验条件见来源页，校验和与获取记录见归档台账。机制编译进相关概念与学习路径，保留证据边界。

## [2026-10-02] ingest | Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World

归档原始资料 `raw/tobin-2017-domain-randomization.pdf`，生成并完整阅读 `graph/extracts/tobin-2017-domain-randomization.md`；版本、日期和实验条件见来源页，校验和与获取记录见归档台账。机制编译进相关概念与学习路径，保留证据边界。

## [2026-10-02] ingest | Sim-to-Real Transfer of Robotic Control with Dynamics Randomization

归档原始资料 `raw/peng-2018-dynamics-randomization.pdf`，生成并完整阅读 `graph/extracts/peng-2018-dynamics-randomization.md`；版本、日期和实验条件见来源页，校验和与获取记录见归档台账。机制编译进相关概念与学习路径，保留证据边界。

## [2026-10-02] ingest | Closing the Sim-to-Real Loop: Adapting Simulation Randomization with Real World Experience

归档原始资料 `raw/simopt-adapting-simulation-randomization.pdf`，生成并完整阅读 `graph/extracts/simopt-adapting-simulation-randomization.md`；版本、日期和实验条件见来源页，校验和与获取记录见归档台账。机制编译进相关概念与学习路径，保留证据边界。

## [2026-10-02] ingest | Isaac Sim 6.1: Deploying policies in Isaac Sim

归档原始资料 `raw/isaac-sim-6-1-policy-deployment.html`，生成并完整阅读 `graph/extracts/isaac-sim-6-1-policy-deployment.md`；版本、日期和实验条件见来源页，校验和与获取记录见归档台账。机制编译进相关概念与学习路径，保留证据边界。

## [2026-10-02] refresh | MuJoCo Computation：动力学、积分与接触

沿用原来源 ID，扩展动力学、积分与接触解释，接入 3.8 固定版本；旧原始文件保留，版本语义差异在来源页单独说明。

## [2026-10-02] research | 世界模型与机器人仿真

首次按需研究新增 12 个来源页、刷新一个 MuJoCo 来源页，新增 MPC、想象策略、视觉目标规划、坐标、刚体动力学、仿真时序、随机化、系统辨识与部署契约九个机制页。补强现有世界模型与仿真解释，更新两条学习路径、总览和研究问题，新增覆盖地图 `world-models-and-simulation-research`。

保留关键比较限制：离线规划改动基线不能替代在线 RL 结论；跨论文预算与任务不匹配不能构成总排名；视觉随机化、动力学随机化和分布辨识的目标及实验范围不同；当前部署 API 按版本使用。动作遵循近期预印本不当作独立复现。论文与课程原文支持公式，教学推导和练习另行说明。

整理既有 π0.7、LDA-1B、Seer、DeFI 与世界模型综述来源页的中文表达，删除重复介绍与自链接，保留量化证据；还原此前纯语言／别名／布局调整误刷的审阅日期。

## [2026-10-02] maintenance | Dashboard 学习与探索升级

首页增加主题、类型、阅读记录和关键词筛选，列表与双向关系图共用 Quartz 内容索引；文章保留 Backlinks，并增加可折叠局部图及入链／出链表。图节点支持点击、键盘、缩放和平移；已读由读者手动标记，收藏与记录仅保存在当前浏览器，跨页面和刷新保持一致。最近研究来源按语义审阅日期展示；课程视频和作者演示嵌入相关机制页，标注用途与出处，不自动播放。

修复 SVG 链接的 SPA 导航、弹窗重复操作按钮与浏览器存储异常；加入存储失败提示与深色模式兜底。无新增前端依赖、数据库或网页研究后端。预览在 8081／8082，临时监督进程在构建退出时重启服务，配置未写入系统服务或定时任务。

## [2026-10-02] maintenance | 首轮升级验收

健康检查扫描 145 个知识页，空页、断链、目录不同步、缺失日志、缺失资料、语言异常及证据状态均为 0。19 项 Python 测试通过；`npm run wiki:check` 的类型与全库格式检查通过；生产构建输出 `/tmp/llm-wiki-final-production`，203 个 HTML 未发现缺失本地引用或 KaTeX 错误。显式关系图已重新生成。

独立浏览器检查核对世界模型概念筛选得到 9 节点／37 条边，局部图与全部入链／出链一致；收藏、手动已读在 SPA 与刷新后保持，存储异常有反馈。手机没有横向溢出，课程 iframe 保持 16:9，视频有控制且不自动播放；GitHub Pages 子路径下图节点键盘导航通过，页面 JavaScript 错误为 0。

14 条本轮归档记录的校验和全部匹配；任务开始时已有的 98 个原始文件字节不变，原日志作为精确前缀保留。另用官方课程真实重复获取验证无变化时复用快照、不改原文件时间或知识日期。内网预览最终版本 HTTP 200，8081 与 8082 保持监听，监督进程在预览退出时重启。改动保留本地，未推送或公开发布。

## [2026-10-02] maintenance | 首页审阅日期排序修正

保留 Quartz 已有 `getDate` 派生的索引日期，移除输出 JSON 时删除日期的旧逻辑；没有新增日期字段或平行状态。146 页索引均含日期，首页列表按最新审阅排序，与浏览器逐项核对一致；关键词搜索与手机无溢出检查通过，页面错误为 0。生产构建与全库类型／格式检查再次通过，内网预览已加载修正后的索引。

## [2026-10-04] review | A Comprehensive Survey on World Models for Embodied AI

复核既有原始资料 `raw/a-comprehensive-survey-on-world-models-for-embodied-ai.html`，重写 [[a-comprehensive-survey-on-world-models-for-embodied-ai|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/action.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning

复核既有原始资料 `raw/agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning.pdf`，重写 [[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/transfer.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | CoACD：保留碰撞相关凹陷的凸分解

复核既有原始资料 `raw/coacd-approximate-convex-decomposition.pdf`，重写 [[coacd-approximate-convex-decomposition|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/geometry.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | 接触模型比较：物理近似与数值求解怎样改变机器人运动

复核既有原始资料 `raw/contact-models-in-robotics-a-comparative-analysis.pdf`，重写 [[contact-models-in-robotics-a-comparative-analysis|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/geometry.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | 凸基元分解：按碰撞成本拟合可编辑的几何

复核既有原始资料 `raw/convex-primitive-decomposition-for-collision-detection.pdf`，重写 [[convex-primitive-decomposition-for-collision-detection|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/geometry.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | DCOL：以最小均匀缩放构造可微碰撞约束

复核既有原始资料 `raw/dcol-differentiable-collision-detection-for-a-set-of-convex-primitives.pdf`，重写 [[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/geometry.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | DiffPills：把胶囊体与带厚度多边形的碰撞写成二次规划

复核既有原始资料 `raw/diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons.pdf`，重写 [[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/geometry.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | DINO-WM：用预训练视觉特征进行目标规划

复核既有原始资料 `raw/dino-wm-pretrained-visual-features.pdf`，重写 [[dino-wm-pretrained-visual-features|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/decision.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining

复核既有原始资料 `raw/disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining.pdf`，重写 [[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/action.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | DreamerV3：在想象中学习控制策略

复核既有原始资料 `raw/dreamerv3-nature-2025.html`，重写 [[dreamerv3-mastering-diverse-control|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/decision.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | EmbodiedGen: Towards a Generative 3D World Engine for Embodied Intelligence

复核既有原始资料 `raw/embodiedgen.pdf`，重写 [[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/worlds.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | EmbodiedGen V2: An Agentic, Simulation-Ready 3D World Engine for Embodied AI

复核既有原始资料 `raw/embodiedgen-v2.pdf`，重写 [[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/worlds.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | GRAIL: Generating Humanoid Loco-Manipulation from 3D Assets and Video Priors

复核既有原始资料 `raw/grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors.pdf`，重写 [[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/transfer.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | LDA-1B: Scaling Latent Dynamics Action Model via Universal Embodied Data Ingestion

复核既有原始资料 `raw/lda-1b-scaling-latent-dynamics-action-model.pdf`，重写 [[lda-1b-scaling-latent-dynamics-action-model|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/action.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | MagicSim: A Unified Infrastructure for Executable Embodied Interaction

复核既有原始资料 `raw/magicsim-a-unified-infrastructure-for-executable-embodied-interaction.pdf`，重写 [[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/worlds.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | MuJoCoUni: Persistent Batched Runtime Primitives for MuJoCo

复核既有原始资料 `raw/mujocouni-persistent-batched-runtime-primitives-for-mujoco.pdf`，重写 [[mujocouni-persistent-batched-runtime-primitives-for-mujoco|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/systems.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | Sim-to-Real Transfer of Robotic Control with Dynamics Randomization

复核既有原始资料 `raw/peng-2018-dynamics-randomization.pdf`，重写 [[peng-dynamics-randomization|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/transfer.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities

复核既有原始资料 `raw/pi07.pdf`，重写 [[pi07-steerable-generalist-robotic-foundation-model|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/action.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | PlaNet：从像素学习潜在动力学并规划

复核既有原始资料 `raw/planet-learning-latent-dynamics.pdf`，重写 [[planet-learning-latent-dynamics|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/decision.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | Predictive Inverse Dynamics Models are Scalable Learners for Robotic Manipulation

复核既有原始资料 `raw/predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation.pdf`，重写 [[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/action.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | RoboCasa365: A Large-Scale Simulation Framework for Training and Benchmarking Generalist Robots

复核既有原始资料 `raw/robocasa365.pdf`，重写 [[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/worlds.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | RoboLab: A High-Fidelity Simulation Benchmark for Analysis of Task Generalist Policies

复核既有原始资料 `raw/robolab.pdf`，重写 [[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/worlds.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | Closing the Sim-to-Real Loop: Adapting Simulation Randomization with Real World Experience

复核既有原始资料 `raw/simopt-adapting-simulation-randomization.pdf`，重写 [[simopt-adaptive-randomization|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/transfer.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots

复核既有原始资料 `raw/campion-bastin-dandrea-novel-wheeled-mobile-robots-nd-2011.pdf`，重写 [[structural-properties-and-classification-of-wheeled-mobile-robots|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/systems.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | TD-MPC2：以任务价值学习潜在模型并规划

复核既有原始资料 `raw/td-mpc2-scalable-robust-world-models.pdf`，重写 [[td-mpc2-scalable-robust-world-models|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/decision.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World

复核既有原始资料 `raw/tobin-2017-domain-randomization.pdf`，重写 [[tobin-domain-randomization|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/transfer.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | UniLab: A Heterogeneous Architecture for Robot RL Beyond GPU-Dominant Paradigms

复核既有原始资料 `raw/unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms.pdf`，重写 [[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/systems.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | V-JEPA 2：视频表征怎样接到机器人规划

复核既有原始资料 `raw/v-jepa-2-understanding-prediction-planning.pdf`，重写 [[v-jepa-2-understanding-prediction-planning|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/decision.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | VisACD：用可见性快速评价凸分解切面

复核既有原始资料 `raw/visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition.pdf`，重写 [[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/geometry.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | WorldEcho／WorldSync：世界模型是否忠实执行动作

复核既有原始资料 `raw/worldecho-worldsync-action-following.pdf`，重写 [[worldecho-worldsync-action-following|论文解析]]：区分研究问题、机制与数学、实验协议、来源结论及我们的解释。保留原始快照与稳定链接，补论文元数据和多专题归属；详细纠错及阅读限制记于 `graph/review-notes/systems.md`。本次为既有来源复核，没有新增来源收录。

## [2026-10-04] review | VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation

完整重读归档项目页并整理 [[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation|VIRAL 项目解析]]，明确演示次数不等于成功率、仍涉及真实接口标定；论文、视频及图片未列为本轮完整阅读证据。保留项目资料分类，不混入论文库。

## [2026-10-04] restructure | 研究领域、问题专题与论文证据

建立 4 个研究领域和 12 个问题专题，论文多对多关联专题；论文、其他资料、共享概念、学习路径与实体入口分别承担职责。问题由专题维护，研究问题页仅生成入口。重写关联概念与综合，收紧实验外推与来源等级；3 个论文专属概念并入来源页，旧路径保留可读跳转。12 个实体收敛为共享来源入口。评测综述撤回未收录资料的数字及错误 LoRA 判断，保留有据比较与明确标注的协议建议。仅导航、标签及格式调整不刷新知识审阅日期。

首页简化为领域、重点专题和单份最近更新；论文库支持多专题、年份和关键词筛选，保留浏览器阅读记录。目录由 `tools/build_catalog.py` 从页面元数据生成；健康检查增加主题归属与论文必填字段校验。同步维护规则与研究技能，避免旧流程重新制造平行目录。原始资料未改写，本地修改未推送或发布。

## [2026-10-04] maintenance | 研究架构与论文复核验收

30 篇论文全部有逐篇审阅记录，另重读 VIRAL 归档项目页；覆盖与限制记于 `graph/review-notes/README.md`，状态与原始校验和记于 `graph/review-2026-10-04.json`。98 个原始文件字节未变，旧页面路径和旧日志前缀保留。Dreamer 独立附件、轮式英文原版及实验复现不属于已完成范围，文档编辑整理也不冒称全文重审。

健康检查扫描 165 页全部通过，目录生成检查、类型与变更前端格式检查通过，20 项 Python 测试和 3 项筛选脚本测试通过。生产构建的 225 个 HTML 未发现缺失本地引用、失效锚点或 KaTeX 错误；论文库生成 30 条记录。修复主题目录同名路由冲突，显式关系图已重建。本地预览 8081／8082 已启动，论文页 HTTP 200。浏览器工具初始化被环境拒绝导入 `node:process`，因此真实浏览器视觉与交互验收仍未完成；不将脚本或静态检查替代该验证。本轮没有推送或发布。

## [2026-10-04] review | A Comprehensive Survey on World Models for Embodied AI

[[a-comprehensive-survey-on-world-models-for-embodied-ai|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] ingest | AgentsDock Releases

[[agentsdock-releases|本页]]：补充官方固定版本原始证据并归档，静态核查实际调用流程；完整文件与定向片段的阅读范围分别登记。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] ingest | AgentsServer

[[agentsserver|本页]]：补充官方固定版本原始证据并归档，静态核查实际调用流程；完整文件与定向片段的阅读范围分别登记。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning

[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | AwesomeWorldModels：世界模型文献索引

[[awesome-world-models|本页]]：复核既有归档资料，重写项目定位、机制与证据边界；未运行第三方代码或外链实验。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | CoACD：保留碰撞相关凹陷的凸分解

[[coacd-approximate-convex-decomposition|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] ingest | CoACD 项目：接口、尺度与分解代码

[[coacd-repository|本页]]：补充官方固定版本原始证据并归档，静态核查实际调用流程；完整文件与定向片段的阅读范围分别登记。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | 接触模型比较：物理近似与数值求解怎样改变机器人运动

[[contact-models-in-robotics-a-comparative-analysis|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | 凸基元分解：按碰撞成本拟合可编辑的几何

[[convex-primitive-decomposition-for-collision-detection|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | DCOL：以最小均匀缩放构造可微碰撞约束

[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | DiffPills：把胶囊体与带厚度多边形的碰撞写成二次规划

[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | DINO-WM：用预训练视觉特征进行目标规划

[[dino-wm-pretrained-visual-features|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining

[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | DreamerV3：在想象中学习控制策略

[[dreamerv3-mastering-diverse-control|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | EmbodiedGen: Towards a Generative 3D World Engine for Embodied Intelligence

[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | EmbodiedGen V2: An Agentic, Simulation-Ready 3D World Engine for Embodied AI

[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | GRAIL: Generating Humanoid Loco-Manipulation from 3D Assets and Video Priors

[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] ingest | Isaac Lab Repository

[[isaac-lab-repository|本页]]：补充官方固定版本原始证据并归档，静态核查实际调用流程；完整文件与定向片段的阅读范围分别登记。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | LDA-1B: Scaling Latent Dynamics Action Model via Universal Embodied Data Ingestion

[[lda-1b-scaling-latent-dynamics-action-model|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | MagicSim: A Unified Infrastructure for Executable Embodied Interaction

[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] ingest | ManiSkill Repository

[[maniskill-repository|本页]]：补充官方固定版本原始证据并归档，静态核查实际调用流程；完整文件与定向片段的阅读范围分别登记。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] ingest | mjlab Repository

[[mjlab-repository|本页]]：补充官方固定版本原始证据并归档，静态核查实际调用流程；完整文件与定向片段的阅读范围分别登记。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] ingest | MuJoCo Playground Repository

[[mujoco-playground-repository|本页]]：补充官方固定版本原始证据并归档，静态核查实际调用流程；完整文件与定向片段的阅读范围分别登记。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | MuJoCoUni: Persistent Batched Runtime Primitives for MuJoCo

[[mujocouni-persistent-batched-runtime-primitives-for-mujoco|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | NVIDIA ovrtx

[[nvidia-ovrtx|本页]]：复核既有归档资料，重写项目定位、机制与证据边界；未运行第三方代码或外链实验。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | NVlabs/RoboLab

[[nvlabs-robolab|本页]]：复核既有归档资料，重写项目定位、机制与证据边界；未运行第三方代码或外链实验。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | Sim-to-Real Transfer of Robotic Control with Dynamics Randomization

[[peng-dynamics-randomization|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities

[[pi07-steerable-generalist-robotic-foundation-model|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | PlaNet：从像素学习潜在动力学并规划

[[planet-learning-latent-dynamics|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | Predictive Inverse Dynamics Models are Scalable Learners for Robotic Manipulation

[[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | RoboCasa365: A Large-Scale Simulation Framework for Training and Benchmarking Generalist Robots

[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | RoboLab: A High-Fidelity Simulation Benchmark for Analysis of Task Generalist Policies

[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | Robotics Simulation Infrastructure

[[robotics-simulation-infrastructure|本页]]：复核既有归档资料，重写项目定位、机制与证据边界；未运行第三方代码或外链实验。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | Closing the Sim-to-Real Loop: Adapting Simulation Randomization with Real World Experience

[[simopt-adaptive-randomization|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots

[[structural-properties-and-classification-of-wheeled-mobile-robots|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | TD-MPC2：以任务价值学习潜在模型并规划

[[td-mpc2-scalable-robust-world-models|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World

[[tobin-domain-randomization|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | UniLab: A Heterogeneous Architecture for Robot RL Beyond GPU-Dominant Paradigms

[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] ingest | UniLab Repository

[[unilab-repository|本页]]：补充官方固定版本原始证据并归档，静态核查实际调用流程；完整文件与定向片段的阅读范围分别登记。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] ingest | V-HACD 项目：体素分解、参数与调用契约

[[v-hacd-repository|本页]]：补充官方固定版本原始证据并归档，静态核查实际调用流程；完整文件与定向片段的阅读范围分别登记。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | V-JEPA 2：视频表征怎样接到机器人规划

[[v-jepa-2-understanding-prediction-planning|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation

[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation|本页]]：复核既有归档资料，重写项目定位、机制与证据边界；未运行第三方代码或外链实验。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | VisACD：用可见性快速评价凸分解切面

[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] review | WorldEcho／WorldSync：世界模型是否忠实执行动作

[[worldecho-worldsync-action-following|本页]]：在首轮全文核验基础上定向回读机制，补充输入输出、必要推导、训练与推理差别、明确标注的教学例子；不将本轮记作第二次全文阅读。逐页核查范围见 `graph/review-notes/second-pass/`；共享基础通过双向链接复用，保留首轮数值纠错与版本限制。

## [2026-10-04] restructure | 交叉主题地图与原生 Quartz 阅读

以六张可交叉主题地图替代四领域的强制父子分类；既有十二专题作为具体问题笔记继续保留，工具笔记单列。旧领域地址保留可读跳转，论文和概念以多对多主题元数据与正文链接导航。首页回归普通 Markdown，完整目录独立生成；恢复原生 Quartz 目录树、搜索、局部图与反向链接，补本页引用列表，关系图排除目录及跳转入口。保留论文筛选和浏览器阅读记录，移除旧定制仪表盘及图脚本。

新增 [[CrossEntropyMethod|交叉熵方法]] 和 [[FlowMatching|流匹配]]，共享机制不在每篇论文重复；其余既有概念随论文和项目复核补充直觉、假设与教学例子。研究规则与技能同步本次设计，并记录参考的开源读论文技能和未采用部分。只变动导航元数据的页面不刷新审阅日期，原始证据只追加，不修改或删除旧文件。本轮不推送或公开发布。

## [2026-10-04] ingest | MotrixSim Documentation

[[motrixsim-documentation|本页]]：补充归档 MotrixSim v0.2.0 四份官方文档并全文阅读，整理模型、状态、驱动器和仿真步的接口；闭源实现未核查，未运行仿真或性能测试。逐文件范围见 `graph/review-notes/second-pass/systems.md`。

## [2026-10-04] maintenance | 第二轮研究地图与阅读深化验收

30 篇论文在首轮全文核验后完成定向机制补强；12 个仓库来源、1 个项目来源及 2 份文档／文章分别记录实际阅读范围。共处理 45 个来源、42 个概念和 2 个学习综合页，新建 CEM 与流匹配共享概念。范围与保留缺口见 `graph/review-notes/second-pass/README.md`。

98 个旧原始文件校验和不变，新增 59 份官方原始快照，旧 Wiki 路径保留。173 页健康检查、目录同步、类型、21 项 Python 测试及 3 项论文筛选测试通过。233 个构建 HTML 未发现失效本地引用、锚点和 KaTeX 错误，双向列表已静态检查；知识图排除目录和跳转后为 161 节点、1247 边，无失效目标或孤页。修复两项目公式中的下划线转义。本地预览 8081／8082 运行，页面 HTTP 200；浏览器初始化限制仍阻止实际视觉与交互验收。本轮没有推送或发布。

## [2026-10-08] ingest | SimEX：让编程智能体在仿真中开发并修复机器人技能

[[simex-simulation-integrated-robotics-autoresearch|本页]]：归档 arXiv:2609.38982v1（2026-09-30），完整阅读21页正文、参考文献及附录，并视觉核对真机、预算、逐任务与消融表。整理双阶段机制、脚本与工具库接口、跨仿真器与真机评测、计算成本和未验证边界；接入 [[topics/simulation-transfer|迁移专题]]、[[topics/robot-policy-learning|策略学习]] 与 [[SystemIdentificationForSimulation|系统辨识]]。论文专有机制保留在来源页；未核查项目代码或运行复现实验，未公开发布。

## [2026-10-08] ingest | KPI：用交互约定连接高层智能体与人形机器人接触控制

[[kpi-promptable-kernel-physical-interaction|本页]]：归档并完整阅读10页正文与补充材料，整理方向性约定、局部力预测、控制通道和15次真机试验的范围；核查不可达约束及力估计限制。 接入相关主题与共享概念。未运行第三方模型或硬件实验；文档阅读不等同于实现核查。

## [2026-10-08] ingest | DexWeave：联合重定向手臂与手指，学习人形机器人灵巧操作

[[dexweave-dexterous-humanoid-loco-manipulation|本页]]：归档并完整阅读26页正文与附录，记录两阶段重定向、注意力掩码、动作接口和逐参考训练；区分仿真片段完成率与定性真机展示，复核表3及表12–13。 接入相关主题与共享概念。未运行第三方模型或硬件实验；文档阅读不等同于实现核查。

## [2026-10-08] ingest | Rho：分离机器人适配、任务微调与潜在空间在线纠正

[[rho-efficiently-adaptable-vla-models|本页]]：归档并完整阅读52页正文与附录，解释流匹配与离散逆变换、分阶段训练、评测预算及在线反馈；保留种子叙述和逐任务结果的内部口径差异。 接入相关主题与共享概念。未运行第三方模型或硬件实验；文档阅读不等同于实现核查。

## [2026-10-08] ingest | Rho 发布文档：检查点接口与 LIBERO 最小验证

[[rho-release-documentation|本页]]：归档并完整阅读固定提交的官方 README，单独登记为文档来源；记录检查点与归一化接口、40回合评测方案及论文与文档执行块长差异。 接入相关主题与共享概念。未运行第三方模型或硬件实验；文档阅读不等同于实现核查。

## [2026-10-08] maintenance | 全库补齐可离线显示的原文配图

扫描所有知识页；向54篇来源页和4篇概念页嵌入264份本地图，保留原图图注、图号、PDF页码和来源链接。位图压缩为 WebP，SVG 保留矢量，动图保留动画；原始证据不变。逐页清单见仓库 `graph/figure-report.md`，衍生记录见 `graph/figures.json`。Isaac Sim 4.5 官方旧图失效，已在正文明确说明。补充图片路径、图号覆盖与证据哈希检查，并接入持续集成。

## [2026-10-08] ingest | 补充原始配图：agentsserver

为 [[agentsserver]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：coacd-repository

为 [[coacd-repository]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：dreamerv3-mastering-diverse-control

为 [[dreamerv3-mastering-diverse-control]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：gltf-basic-structure

为 [[gltf-basic-structure]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：isaac-lab-repository

为 [[isaac-lab-repository]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：isaac-sim-asset-structure

为 [[isaac-sim-asset-structure]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：isaac-sim-policy-deployment

为 [[isaac-sim-policy-deployment]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：learn-openusd-prim-composition

为 [[learn-openusd-prim-composition]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：learn-openusd-stage

为 [[learn-openusd-stage]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：mujoco-computation-collision-detection

为 [[mujoco-computation-collision-detection]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：mujoco-overview

为 [[mujoco-overview]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：mujoco-playground-repository

为 [[mujoco-playground-repository]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：nvlabs-robolab

为 [[nvlabs-robolab]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：omniverse-omni-physics-articulations

为 [[omniverse-omni-physics-articulations]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：robotics-simulation-infrastructure

为 [[robotics-simulation-infrastructure]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：spinning-up-rl-algorithm-taxonomy

为 [[spinning-up-rl-algorithm-taxonomy]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：spinning-up-rl-key-concepts

为 [[spinning-up-rl-key-concepts]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：unilab-repository

为 [[unilab-repository]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] ingest | 补充原始配图：viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation

为 [[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation]] 归档官方配图并生成库内显示副本；来源地址、原始字节哈希与本地图对应关系见 `graph/acquisitions.jsonl` 与 `graph/figures.json`。此次补充不将项目演示等同于独立复现实验。

## [2026-10-08] maintenance | 恢复日志入口与简化持续更新规则

时间：2026-10-08 18:38（北京时间，UTC+08:00）

在 [[index|首页]] 和 [[catalog|完整目录]] 增加 [[log|知识库日志]] 入口，解决日志难找的问题，并移除网站构建中对日志的排除，使网页端也能阅读；后续记录明确时间、改动原因与相关页面，历史记录保留原样。维护规则明确新内容优先更新已有页面，只同步直接相关知识；有依据时修正判断，不确定或冲突时明确保留。修正链接检查对日志等实际存在的维护页面的误报。

## [2026-10-08] maintenance | 世界模型主题的学习与研究入口整理

时间：2026-10-08 18:47（北京时间，UTC+08:00）

将 [[topics/world-models-and-representations|世界模型与表征]] 的入口整理为“从基础学起”和“带着问题研究”，前移已有学习路径，并提供概念到论文实例的短路线。[[world-models-learning-path|学习路径]] 保留顺序与练习，将重复的方法对照集中到专题；[[topics/world-model-decision|决策专题]] 前置当前认识，补充明确标为研究建议的比较步骤，便于围绕问题积累。沿用已有来源和页面地址，没有新增分类或外部资料；仅导航重排的页面保留原审阅日期。

## [2026-10-08] restructure | 精简分类、合并学习路径与项目索引

时间：2026-10-08 19:00（北京时间，UTC+08:00）

日常目录收敛为 Topics、Concepts、Sources、Notes。7 篇学习路径或学习地图的有效解释、对照与例子融入 [[topics/world-models-and-representations|World Models]]、[[topics/physics-simulation|物理仿真]]、[[topics/policy-evaluation|策略评测]]、[[topics/agent-execution|Agent Systems]]、[[topics/asset-representation|3D 资产格式]]、[[topics/wheeled-robot-modeling|轮式机器人]] 和 [[topics/simulation-ready-worlds|Simulation-ready Worlds]] 等相关主题，移除重复课程表。12 个项目实体索引合并到对应具体来源或 [[references|Sources]]；LDA-1B 专属概念解析归回 [[sources/lda-1b-scaling-latent-dynamics-action-model|论文页]]。共 20 个旧页面保留直接跳转，活跃正文更新为直接链接，旧日志不改写。

Sources 统一收录论文、代码与文档，保留各自证据身份；侧栏采用简短导航名和惯用英文术语，官方论文标题与文件地址不变。旧地址从侧栏、搜索和文件夹列表隐藏，完整目录保留折叠入口。同步维护规则，后续不再新增学习路径或实体索引。原始证据不变，本轮没有新增外部事实或重新精读论文；仅显示名与链接变化的页面不刷新审阅日期。

## [2026-10-08] maintenance | 首页与正文阅读体验优化

时间：2026-10-08 19:14（北京时间，UTC+08:00）

[[index|首页]] 改为 Niuverse Wiki，前置搜索，以六个主题入口和简短说明帮助定位内容，最近五条更新直接来自本日志。正文目录置于关系图之前，图谱默认折叠，展开后才绘制；增加配图放大、原图入口及明确的阅读模式按钮。资料内容与主题归属不变，子主题的数据结构仍处于方案讨论，未新增层级。

## [2026-10-08] maintenance | 去除 Browse 重复入口

时间：2026-10-08 19:19（北京时间，UTC+08:00）

Browse 保留可展开的 Topics 与 Sources 文件夹，隐藏同名的 [[research-topics|主题索引]] 和 [[references|资料索引]]，避免两套入口并列。索引页仍可从 [[index|首页]] 访问，内容与旧链接不变。

## [2026-10-08] ingest | DeepSeek Harness 当前版本与执行机制

时间：2026-10-08 23:30（北京时间，UTC+08:00）

首次归档官方架构、生命周期、工具处理、压缩与沙箱文档，固定到 0.2.1-alpha.1；另存 npm 默认 0.2.0-rc.2 的版本信息及对照文档。静态核查流记录、工具调度和局部重试代码，纠正旧笔记逐块持久化的描述；保留压缩文档与代码时序不一致的证据。[[deepseek-harness]]

## [2026-10-08] ingest | pi 的循环、会话与 pi-durable

时间：2026-10-08 23:30（北京时间，UTC+08:00）

沿官方跳转定位 earendil-works/pi，固定 main 提交归档 agent-core、会话格式、压缩及实验持久包资料。区分核心循环的源码核查与 pi-durable 的文档解析，不将开发分支或实验接口视为稳定默认行为。[[pi-agent-harness|pi：可组合循环与持久化实验]]

## [2026-10-08] ingest | OpenCode 的会话执行

时间：2026-10-08 23:30（北京时间，UTC+08:00）

固定 dev 提交，全文核查流处理器及外层循环片段，解释工具状态、文件快照、重复调用检测、压缩和停止条件；未运行第三方软件。[[opencode-harness|OpenCode：编码任务的会话执行]]

## [2026-10-08] ingest | LangGraph 状态与检查点

时间：2026-10-08 23:30（北京时间，UTC+08:00）

完整收录官方 Persistence 和 Checkpointers，区分检查点、逐任务写入、重新执行与持久化模式；固定代码只核查 Pregel 调度说明，不将检查点等同于外部操作恰好执行一次。[[langgraph-persistence|LangGraph：状态图与 Checkpoints]]

## [2026-10-08] ingest | Anthropic 长任务交接

时间：2026-10-08 23:30（北京时间，UTC+08:00）

归档并完整阅读官方工程文章，提炼跨上下文窗口的初始化、逐项验证与任务交接，标明 Web 开发设置与未经本库复现的边界。[[anthropic-long-running-harness|Anthropic：跨上下文窗口的任务交接]]

## [2026-10-08] ingest | Anthropic Managed Agents 架构

时间：2026-10-08 23:30（北京时间，UTC+08:00）

归档并完整阅读官方文章，解释会话、执行循环和沙箱各自生命周期；作为架构说明，不充当 Claude Code／SDK 源码验证。[[anthropic-managed-agents]]

## [2026-10-08] refresh | DeepSeek Harness 与 Agent Harness 系统理解

时间：2026-10-08 23:30（北京时间，UTC+08:00）

将 [[dsh-learning-map]] 旧待核实笔记改为稳定跳转，正式解析归入 [[deepseek-harness]]；新增唯一共享基础 [[AgentHarness]]，扩充 [[topics/agent-execution|Agent Systems]] 的框架比较、具体例子与可验证问题，不新增学习路径。旧逐块持久化判断改为实时流与结算记录分离，依据固定版本文档和 assistant-stream.ts；旧包数量、本机状态、Cordis 论文推导未复核，不再作当前事实。Codex、Claude Agent SDK、Deep Agents、Cordis 论文及完整故障恢复实验仍是未收录缺口。本轮仅更新本地知识，未安装、升级或运行这些框架。

## [2026-10-15] ingest | ENPIRE

时间：2026-10-15 20:36（北京时间，UTC+08:00）

归档并完整阅读 2606.19980v2 的 HTML 正文、参考文献和附录，记录机制、执行接口、实验协议与证据限制；原始快照及获取记录保留版本和 SHA-256。[[enpire-agentic-robot-policy-self-improvement|ENPIRE]]；比较归入 [[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]。本次未运行论文系统。

## [2026-10-15] ingest | RACaP

时间：2026-10-15 20:38（北京时间，UTC+08:00）

归档并完整阅读 2609.29394v1 的 HTML 正文、参考文献和附录，记录机制、执行接口、实验协议与证据限制；原始快照及获取记录保留版本和 SHA-256。[[racap-evolvable-robot-learning|RACaP]]；比较归入 [[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]。本次未运行论文系统。

## [2026-10-15] ingest | RoboHarness

时间：2026-10-15 20:38（北京时间，UTC+08:00）

归档并完整阅读 2610.14018v1 的 HTML 正文、参考文献和附录，记录机制、执行接口、实验协议与证据限制；原始快照及获取记录保留版本和 SHA-256。[[roboharness-visual-geometric-control|RoboHarness]]；比较归入 [[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]。本次未运行论文系统。

## [2026-10-15] ingest | PhysEvo

时间：2026-10-15 20:41（北京时间，UTC+08:00）

归档并完整阅读 2610.08995v1 的 HTML 正文、参考文献和附录，记录机制、执行接口、实验协议与证据限制；原始快照及获取记录保留版本和 SHA-256。[[physevo-physical-recursive-self-improvement|PhysEvo]]；比较归入 [[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]。本次未运行论文系统。

## [2026-10-15] ingest | EmbodiRSI

时间：2026-10-15 20:41（北京时间，UTC+08:00）

归档并完整阅读 2609.38905v3 的 HTML 正文、参考文献和附录，记录机制、执行接口、实验协议与证据限制；原始快照及获取记录保留版本和 SHA-256。[[embodirsi-data-efficient-robot-adaptation|EmbodiRSI]]；比较归入 [[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]。本次未运行论文系统。

## [2026-10-15] ingest | RoboFoundry

时间：2026-10-15 20:46（北京时间，UTC+08:00）

归档并完整阅读 2609.32862v1 的 HTML 正文、参考文献和附录，记录机制、执行接口、实验协议与证据限制；原始快照及获取记录保留版本和 SHA-256。[[robofoundry-system-as-policy|RoboFoundry]]；比较归入 [[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]。本次未运行论文系统。

## [2026-10-15] ingest | RegenHarness

时间：2026-10-15 20:47（北京时间，UTC+08:00）

归档并完整阅读 2609.27612v1 的 HTML 正文、参考文献和附录，记录机制、执行接口、实验协议与证据限制；原始快照及获取记录保留版本和 SHA-256。[[regenharness-evidence-gated-self-improvement|RegenHarness]]；比较归入 [[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]。本次未运行论文系统。

## [2026-10-15] ingest | GaP

时间：2026-10-15 20:51（北京时间，UTC+08:00）

归档并完整阅读 2607.05369v1 的 HTML 正文、参考文献和附录，记录机制、执行接口、实验协议与证据限制；原始快照及获取记录保留版本和 SHA-256。[[gap-graph-as-policy|GaP]]；比较归入 [[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]。本次未运行论文系统。

## [2026-10-15] ingest | GaP 代码核查

时间：2026-10-15 20:52（北京时间，UTC+08:00）

归档固定提交 c8b5515df80d3029ca5dc7f7f1ec1c327b70bbea 的原始资料并按来源页声明范围核查；[[gap-runtime-repository|GaP 代码核查]] 保留版本、证据路径与限制，连接 [[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]。未运行机器人系统。

## [2026-10-15] ingest | Physical RSI 研究框架

时间：2026-10-15 20:52（北京时间，UTC+08:00）

归档固定提交 8ea92d4152e3e22c6143155b5ff8a68ded5c8461 的原始资料并按来源页声明范围核查；[[physical-rsi-research-map|Physical RSI 研究框架]] 保留版本、证据路径与限制，连接 [[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]。未运行机器人系统。

## [2026-10-15] research | 机器人 Harness 与 Physical RSI

时间：2026-10-15 21:00（北京时间，UTC+08:00）

围绕用户从 GaP 扩展到机器人 Harness 和物理 RSI 的请求，搜索截至 2026-10-15 的原始资料，完整阅读并收录八篇论文、固定核查 GaP 九文件代码资料及 Physical RSI 作者 README，复用已有 [[simex-simulation-integrated-robotics-autoresearch|SimEX]]。新增 [[topics/robot-harness-and-physical-rsi|研究专题]]、[[RobotHarness|机器人 Harness]] 与 [[PhysicalRecursiveSelfImprovement|Physical RSI]]，同步 [[topics/robot-policy-learning|策略学习]]、[[topics/agent-execution|Agent Systems]]、[[AgentHarness]] 和 SimEX 关系；新增四幅原始架构图／机制图并登记来源、裁剪与校验和。

总览原先强调模型、接口、训练和评测的假设链；本次依据 GaP、RACaP、RoboFoundry、EmbodiRSI 与 PhysEvo，补充执行系统更新和改进程序更新的区别，明确在线／冻结协议和元层增益不能混为一谈。[[overview|总览]] 只增加这项跨主题判断。保留 RoboHarness 日期／编号、GaP 插口数及提示例子的原文冲突；RegenHarness 的 RSI 协议不当作已完成定量实验。

ASPIRE、Harness VLA、123 轮负结果、Who Improves the Robot 全文、RSI-Anything、HarnessPAI、Cortex 等仅列为下一批候选，不用于知识结论；未扩大到全部自主实验室或模型演化研究。未运行机器人系统，GaP 检查为限定范围静态核查；标准提取器不支持 tgz，代码缓存逐成员原文解码。

## [2026-10-15] ingest | 本轮来源全名与归档登记核对

时间：2026-10-15 21:01（北京时间，UTC+08:00）

补充前述十项收录的完整名称，便于日志覆盖检查与来源追溯；不改变既有记录。

- [[gap-graph-as-policy|GaP：面向变式自动化的 Graph-as-Policy 多智能体自学习 Harness]]
- [[enpire-agentic-robot-policy-self-improvement|ENPIRE：把真实机器人实验接入编码智能体的改进循环]]
- [[racap-evolvable-robot-learning|RACaP：演化技能 API，再以冻结代码闭环执行]]
- [[embodirsi-data-efficient-robot-adaptation|EmbodiRSI：用失败恢复和自适应采集改进机器人策略]]
- [[physevo-physical-recursive-self-improvement|PhysEvo：冻结模型下的任务工具与诊断工具共同演化]]
- [[roboharness-visual-geometric-control|RoboHarness：用视觉关键点和几何约束连接模型与机器人]]
- [[robofoundry-system-as-policy|RoboFoundry：通过系统即策略实现机器人自我演化]]
- [[regenharness-evidence-gated-self-improvement|RegenHarness：证据门控的机器人执行与自改进协议]]
- [[gap-runtime-repository|Graph as Policy 公开实现：技能图执行、验证与检查点]]
- [[physical-rsi-research-map|Physical RSI 作者资料库：执行更新与改进程序更新的区分]]

## [2026-10-16] ingest | ATOM-Bench: A Real-World Benchmark for Atomic Skills and Compositional Generalization in Manipulation Policies

时间：2026-10-16 15:22（北京时间，UTC+08:00）

按用户学习请求归档 arXiv 2606.16826v1 的 PDF 并完整阅读正文八页与附录 A–E，新建来源页 `atom-bench-atomic-skills-and-compositional-generalization`（[[atom-bench-atomic-skills-and-compositional-generalization|ATOM-Bench]]），记录 motor／instruction 原子分类法、配对单臂双臂任务套件、数据采集、AS／CFS／TG 指标定义与假设、表 1／表 2 数字、失败归因与扰动实验结果。原始 PDF 保留于 `raw/atom-bench-atomic-skills-compositional-generalization-2606.16826.pdf`，阅读缓存为 `graph/extracts/atom-bench-atomic-skills-compositional-generalization-2606.16826.md`；新增六幅原文图（图 1、3、4、5、6、7）并登记来源、页码、裁剪坐标与校验和。

[[CompositionalGeneralizationInRobotics|组合泛化]] 原先只由 π0.7 与 RoboCasa365（均为仿真或仿真预训练路径）支撑；本次补上真机、控制原子训练分布、留出组合任务这一类证据，并新增「报告组合失败比例时必须同时给出原子侧基线」这一判断，依据是 SmolVLA 的低组合失败占比来自弱原子而非强组合。新建 [[AtomicSkillAndCompositionalEvaluation|原子技能与组合泛化评测]] 沉淀可复用的分解设计与指标假设，同步 [[TaskGeneralistPolicyEvaluation|通用任务策略评估]]、[[topics/policy-evaluation|策略评测]] 与 [[topics/evaluation-and-transfer|评测与 Sim-to-Real]]。

保留原文内部不一致：§4.2 正文给出的 motor atom 跨模型平均成功率（pick-and-place 74%、pour 20% 等）与图 3 中同名的 cross-model mean 读数（69%、16% 等）不同，论文未说明口径差异，两个读数并列记录在来源页。未运行任何机器人系统，结论限于归档 PDF。

## [2026-10-16] ingest | RoboSimStudio: An Interactive Toolkit for Rapid Real2Sim of Robot Manipulation Tasks

时间：2026-10-16 17:36（北京时间，UTC+08:00）

按用户学习请求先同步本仓库远端最新提交，并在 `AGENTS.md` 与 `wiki-research` 技能中补充“每次开始学习、研究或收录前先从远端拉取最新状态”的规范。归档 arXiv 2610.18835v1 原始 PDF（`raw/robosimstudio-interactive-toolkit-rapid-real2sim-2026-10-16-e701248a4cd0.pdf`）并完整阅读全文 13 页，新建论文来源页 [[robosimstudio-interactive-toolkit-rapid-real2sim|RoboSimStudio]]，嵌入并登记全部七幅原文图（图 1–7），记录声明式机器人接口、Newton 多物理场耦合、Viser 人机交互工作台、编码智能体时空反馈、18 项富接触操作任务、主臂力反馈遥操作与海绵擦杆端到端 Real2Sim2Real 先导实验。

## [2026-10-16] ingest | RoboSimStudio 公开实现：多物理场编译、协同仿真桥、实时热重载与力反馈工程分析

时间：2026-10-16 17:36（北京时间，UTC+08:00）

固定官方仓库 `robosimstudio/robosimstudio` 提交 `73739abe212f963e8a9f5862b27bca370df091a7`，归档 34 个核心工程文件（`raw/robosimstudio-repository-2026-10-16-5860aeb05800.tgz` 及阅读缓存 `graph/extracts/robosimstudio-repository-2026-10-16-5860aeb05800.md`），新建代码核查来源页 [[robosimstudio-repository|RoboSimStudio · Code]]。深入解析五包单向依赖与 PEP 562 惰性导入、`compile_scene` 十阶段不可调换顺序、按后端相等分岛与多世界碰撞对步幅展开、`SolverOneWay` 子步位移差摩擦恢复、九阶段 CUDA 图可捕获性铁律与 `LIVE`／`RECAPTURE`／`REBUILD` 三级在线调参、`CosimRig` 子步插值与 `WrenchAccumulator` 非对称 EMA 滤波加冲量限幅、`wipe_the_bar` 的 Preston 磨损与 `bar.Latch` 接触门控顺应锁定（并列说明论文未展开的 33 次纯摩擦滑脱消融）、`robosimstudio_real2sim_agent` 的热重载与四类定量门控（`compare_still`／`look_sheet`／`gate`／`compare_take`）、`ConnectorNewton` 的 `SimBus` 线程隔离与特权工具边界，以及 100 Hz/60 Hz 双时钟力反馈遥操作的速度相关死区与安全门控。同步更新 [[gap-graph-as-policy|GaP]]、[[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]、[[topics/simulation-transfer|Sim-to-Real]]、[[topics/physics-simulation|物理仿真]] 与 [[RoboticsSimulationInfrastructure|机器人仿真基础设施]]。本轮为静态源码核查，未在本机启动 GPU 仿真或连接硬件。

## [2026-10-17] ingest | ASPIRE: Agentic /Skills Discovery for Robotics

时间：2026-10-17 21:57（北京时间，UTC+08:00）

按用户系统学习请求归档 arXiv 2607.00272v1 原始 PDF（`raw/aspire-agentic-skills-discovery-for-robotics-2026-10-17-9df00979a6d5.pdf`）并完整阅读正文与附录 A–E 共 43 页（阅读缓存 `graph/extracts/aspire-agentic-skills-discovery-for-robotics-2026-10-17-9df00979a6d5.md`），新建论文来源页 [[aspire-agentic-skills-discovery-for-robotics|ASPIRE]]，嵌入并登记全部六幅正文图（图 1–6）。完整梳理协调器—执行器（Coordinator–Actor）架构、暴露原语级多模态追踪的机器人执行引擎、六大类异构技能库（定位消歧、运动原语、导航恢复、物体级策略抓取、场景理解、调试工作流）、维护持久任务分析账本 $A_i$ 的程序演化搜索（算法 1）、LIBERO-Pro / Robosuite / BEHAVIOR-1K 主实验（表 2–4）、`LIBERO-90 → LIBERO-Pro Long` 技能库规模零样本迁移扩展律与单任务非单调退化（表 5–6）、Franka 仿真向双臂 YAM 真机的跨本体技能迁移（表 1）以及留出验证集选择方差（表 7–9）。

## [2026-10-17] ingest | NVlabs/ASPIRE 公开实现：受限 CaP 运行时、技能验证器、多模型扩展与双臂 YAM System 2 架构核查

时间：2026-10-17 21:57（北京时间，UTC+08:00）

固定官方仓库 `NVlabs/ASPIRE` 主分支 `v1.0` 提交 `fa00f0ef2bc1d91d594b9aa502c22133c9f538f7`（并对照论文期分支 `v0.1` 提交 `317a72e649d9c083298a1724d873491e499c0712`），归档 61 个核心工程文件（`raw/nvlabs-aspire-repository-2026-10-17-cdf064f957c9.tgz` 及阅读缓存 `graph/extracts/nvlabs-aspire-repository-2026-10-17-cdf064f957c9.md`），新建代码核查来源页 [[nvlabs-aspire-repository|ASPIRE · Code]]。深入解析 `v0.1 → v1.0`（`cap-harness`）的五层架构演进、`_ProgramValidator` AST 静态沙盒与无特权白名单 `ToolRegistry`、主机侧特权协议见证器（`BehaviorPickupWitness` 与 `RobosuiteBimanualProtocolEvaluator`）、四项种子防泄漏审计（`audit_seeding.py`）与密封环境哈希（`provenance.py`）、正交叶子桶耗时归因 `RunTiming` 与关键帧 PNG 压缩优化、`batch.py` 的 `spawn` 进程池与 `PR_SET_PDEATHSIG` 内核级防僵尸机制、独立盲测技能验证器（`verifier-prompt.md` 区分可传递性 `transmits` 与跨任务泛化性 `generalizes`）、响亮/静默失配触发器修剪与静态检查器 `lint_skills.py`、Robosuite `nut_assembly` 从论文 9% 跃升至 99% 的几何与 PyRoKi IK 预检实现，以及双臂 YAM 真机客户端安全联锁、单通道执行与 System 2 原生 MCP 三阶魔方/药瓶精细操作闭环。同步更新 [[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]、[[RobotHarness|机器人 Harness]]、[[PhysicalRecursiveSelfImprovement|Physical RSI]]、[[topics/robot-policy-learning|机器人策略学习]]、[[topics/agent-execution|Agent Systems]] 与 [[topics/simulation-transfer|Sim-to-Real]]。本轮为静态源码核查，未在本机启动 GPU 仿真或连接硬件。



## [2026-10-18] review | SimEX 的 harness 权责与接管式学习边界

时间：2026-10-18 22:11（北京时间，UTC+08:00）

复用 [[simex-simulation-integrated-robotics-autoresearch|SimEX]] 既有全篇精读，定向复核归档 v1 的§2.1、§2.4：明确 harness 只执行与评分、智能体作优化决策，持久更新为工具代码及说明；补充与 [[InteractiveImitationLearning|交互式模仿学习]] 的区别，标明联合补数据与修复工具仍属设计推演。关联 [[topics/interactive-policy-improvement|交互式策略改进]]。未新增论文收录，未重跑实验。

## [2026-10-18] review | 复核 EmbodiRSI 的恢复数据与 Harness 闭环

时间：2026-10-18 22:11（北京时间，UTC+08:00）

复用 [[embodirsi-data-efficient-robot-adaptation|EmbodiRSI]] v3 的既有完整阅读与不可变快照，本次复核 §3.3、附录 A、D.1，明确恢复从当前状态继续、仅最终成功回合入训练、混合轨迹动作并非逐状态专家重标、特权监控不等于策略输入，以及监督层的依赖与产物验收。新增与 [[InteractiveImitationLearning|交互式模仿学习]]、[[topics/interactive-policy-improvement|交互式策略改进]] 的机制关系；未宣称本次重读全文或运行系统。

## [2026-10-18] review | 复核 PhysEvo 的工具继承与接管学习区别

时间：2026-10-18 22:11（北京时间，UTC+08:00）

复用 [[physevo-physical-recursive-self-improvement|PhysEvo]] v1 的既有完整阅读与不可变快照，本次复核 §3.1–3.3 与 §5.5，区分双层 Harness、诊断工具跨轮继承及 DAgger 动作标签，说明自动选择数据更新或接口修改仍属未验证的系统设计设想。关联 [[InteractiveImitationLearning|交互式模仿学习]] 和 [[topics/interactive-policy-improvement|交互式策略改进]]，未新增重复来源页。

## [2026-10-18] ingest | Robot Learning on the Job: Human-in-the-Loop Autonomy and Learning During Deployment

时间：2026-10-18 22:12（北京时间，UTC+08:00）

完整阅读并归档 [[sirius-robot-learning-on-the-job|Sirius]] arXiv v3 的14页正文、参考文献与附录，补全四类样本权重、接管前15步删除、人工预算驱动轮次、固定内存保留策略和自主评测协议；嵌入原文关键评测图。明确仿真与真机动作接口不同，100%指人机团队，85%存储削减只对应特定任务，保留正文不同加速表述的差异。连接 [[InteractiveImitationLearning]]、[[topics/interactive-policy-improvement]] 与 [[topics/robot-harness-and-physical-rsi]]；未核查代码或复现训练。

## [2026-10-18] ingest | Multi-Task Interactive Robot Fleet Learning with Visual World Models

时间：2026-10-18 22:12（北京时间，UTC+08:00）

完整阅读并归档 [[sirius-fleet-visual-world-models|Sirius-Fleet]] arXiv v1 的28页正文、参考文献与附录，补全世界模型—异常预测—请求监控—人工接管—聚合更新的信息流，嵌入架构和评测原图。澄清世界模型输入是视觉历史，不是已验证的动作条件仿真器；自主与人机成功率分开记录。保留正文与附录对世界模型数据量、初始训练epoch等协议冲突，并指出阈值公式参数与文字方向不一致；图中最终人机成绩超过95%，中间轮次未达到。连接 [[InteractiveImitationLearning]]、[[RobotHarness]] 与相关专题；未核查代码或运行系统。

## [2026-10-18] ingest | FlowDAgger: Human-in-the-Loop Adaptation of Generative Robot Policies in Latent Space

时间：2026-10-18 22:13（北京时间，UTC+08:00）

完整阅读 [[flowdagger-latent-space-corrections|FlowDAgger]] arXiv v1 正文、参考文献和附录共 14 页，归档完整官方项目页并核查固定提交的局部代码，补入逐步不动点反演、Cosmos 联合潜变量与末端反传例外、双缓存训练、脚本专家和真人接管的区别及 50 回合协议。更正“冻结权重等于无反传／无遗忘”的过度解释，保留原文正文与附录表述差异；与 [[InteractiveImitationLearning]]、[[hi-wm-human-in-world-model|Hi-WM]]、[[rho-efficiently-adaptable-vla-models|Rho]] 和 [[topics/interactive-policy-improvement|交互式策略改进]] 互链。仓库仅做指定路径静态核查，未运行。

## [2026-10-18] ingest | Hi-WM: Human-in-the-World-Model for Scalable Robot Post-Training

时间：2026-10-18 22:13（北京时间，UTC+08:00）

完整阅读 [[hi-wm-human-in-world-model|Hi-WM]] 当前 v2 的 15 页正文与参考文献，并复核 v1 全文差异，保留两版原始快照与完整官方项目页。解释双臂动作接口、失败／边缘数据、控制权交接、回退分支和新旧数据混合后训练，记录 3 任务、2 骨干与 20%／35% 数据预算的真实适用范围。并列两版成本主张 10 万与 4500 万美元冲突，不背书金额；说明绝对数据规模、重复试验、冻结状态及完整状态恢复实现缺失。与 [[RobotHarness]]、[[flowdagger-latent-space-corrections|FlowDAgger]] 及 [[topics/interactive-policy-improvement|交互式策略改进]] 互链。

## [2026-10-18] review | Rho 在线纠正接口与交互式策略改进

时间：2026-10-18 22:14（北京时间，UTC+08:00）

完整复读 [[rho-efficiently-adaptable-vla-models|Rho]] 已归档 v1 共52页提取文本（正文、参考文献、附录 A–H），并视觉核对 PDF 第10页的训练数据统计；检查整页主要数字及原文定位。修正旧页§章节／附录错引（原文没有附录 I）、将旧页误写的 FR3 中间训练3278小时更正为原文278小时，并保留种子数与图注等原文内部差异。重点复核§6.2、§7.6及附录 F：明确采用 [[flowdagger-latent-space-corrections|FlowDAgger]]，区分仿真特权脚本专家和真机人工纠正；补足16步预测范围、八步查询间隔、混合动作块反演与固定检查点评测。新增到 [[InteractiveImitationLearning|交互式模仿学习]] 和 [[topics/interactive-policy-improvement|交互式策略改进]] 的语义链接。没有重下同版本或重跑实验。

## [2026-10-18] ingest | A Reduction of Imitation Learning and Structured Prediction to No-Regret Online Learning

时间：2026-10-18 22:14（北京时间，UTC+08:00）

完整阅读 AISTATS 2011 正式版 9 页，归档原文与缓存，补充混合控制、全状态专家标注、理论前提及三类实验，嵌入原文实验图，明确选择性接管不能直接继承保证。 来源页：[[dagger-no-regret-imitation-learning]]；直接关联 [[InteractiveImitationLearning|交互式模仿学习]] 与 [[topics/interactive-policy-improvement|接管学习与仿真自改进]]。

## [2026-10-18] ingest | HG-DAgger: Interactive Imitation Learning with Human Experts

时间：2026-10-18 22:14（北京时间，UTC+08:00）

完整阅读 arXiv v2 7 页，归档原文与缓存，整理连续接管的数据筛选、疑虑阈值与车辆评测；区分人工训练门控和未实现的自动门控方向，保留实体实验样本规模限制。 来源页：[[hg-dagger-human-experts]]；直接关联 [[InteractiveImitationLearning|交互式模仿学习]] 与 [[topics/interactive-policy-improvement|接管学习与仿真自改进]]。

## [2026-10-18] ingest | ThriftyDAgger: Budget-Aware Novelty and Risk Gating for Interactive Imitation Learning

时间：2026-10-18 22:14（北京时间，UTC+08:00）

完整阅读正式版 11 页及官网补充附录 8 页，归档 PDF、原始 ZIP 和其 PDF 成员，嵌入原图。核实 CoRL 2021 与 PMLR 2022 出版年份差别，保留成功概率定义与损失边界不一致、目标请求频率非严格总预算、减少切换不等于减少人工动作，以及自主／含接管成功率区别。 来源页：[[thriftydagger-budget-aware-interventions]]；直接关联 [[InteractiveImitationLearning|交互式模仿学习]] 与 [[topics/interactive-policy-improvement|接管学习与仿真自改进]]。

## [2026-10-18] research | 接管学习与仿真自改进的来源整合

时间：2026-10-18 22:15（北京时间，UTC+08:00）

按本次对话明确范围，新增七篇论文精读（DAgger、HG-DAgger、ThriftyDAgger、Sirius、Sirius-Fleet、FlowDAgger、Hi-WM），包括正式补充附录、Hi-WM两版和两份官方项目页；复读 [[rho-efficiently-adaptable-vla-models|Rho]] 52页，复用并定向核对 [[embodirsi-data-efficient-robot-adaptation|EmbodiRSI]]、[[simex-simulation-integrated-robotics-autoresearch|SimEX]] 与 [[physevo-physical-recursive-self-improvement|PhysEvo]]。新增 [[InteractiveImitationLearning|交互式模仿学习]] 与 [[topics/interactive-policy-improvement|接管学习与仿真自改进]]，沿已有 [[RobotHarness|机器人 Harness]]、[[PhysicalRecursiveSelfImprovement|Physical RSI]]、[[RobotLearningObjectives|学习目标]]、[[RobotLearningDataComposition|数据构成]] 和相关专题互链；九幅本地图登记原始证据、裁剪与校验和。

原先对话的机制关联保留为设计推演，不能当成已验证的统一系统。原文核查进一步明确：Sirius-Fleet世界模型是视觉历史预测的监控器；ThriftyDAgger的执行时100%包含接管；FlowDAgger冻结权重仍有旧任务退化且Cosmos反演存在输入反传；Hi-WM两版成本主张冲突、状态恢复实现细节不全，不据此背书金额或确定性重放。Rho旧页将3278小时更正为278小时并修复不存在的附录I等定位。跨主题总判断未改变，因此不重写 [[overview|总览]]。

没有扩展到未在答复中列为核心来源的其他论文，没有运行机器人模型或训练；FlowDAgger代码仅核查来源页声明的固定提交与路径。更新日志后重建目录和显式链接图谱，完成结构、图片和生产构建检查后以独立分支提交PR。

## [2026-10-18] review | 接管学习来源的图注与版本核对

时间：2026-10-18 22:16（北京时间，UTC+08:00）

为 [[rho-efficiently-adaptable-vla-models|Rho]] 与 [[simex-simulation-integrated-robotics-autoresearch|SimEX]] 既有11幅图片补齐完整中文图注，保留原图、页码、来源链接及Rho图注与表格的措辞差异；核实 [[dagger-no-regret-imitation-learning|DAgger]] 的PMLR RIS日期与会议日期不同，[[thriftydagger-budget-aware-interventions|ThriftyDAgger]] 的2022-01-11来自正式论文集出版元数据。新增九幅图均已核对可读性及来源登记，原始证据未覆盖或删除。目录检查、健康检查、296幅图片校验、图谱构建和Quartz生产构建通过，既有工具与页面测试共33项通过；本轮未运行机器人模型或训练。

## [2026-10-18] review | ThriftyDAgger 补充材料阅读缓存修复

时间：2026-10-18 22:17（北京时间，UTC+08:00）

提交前检查发现 [[thriftydagger-budget-aware-interventions|ThriftyDAgger]] 补充附录的标准提取含52个NUL字符，导致Markdown缓存被Git识别为二进制。用PyMuPDF逐页排序提取完整文本重建该缓存，并在缓存和来源页说明方法与公式核查边界；原始PDF、ZIP及校验和均未修改。

## [2026-10-18] review | ThriftyDAgger 正文缓存同步重建

时间：2026-10-18 22:17（北京时间，UTC+08:00）

对新增缓存进行相同检查，[[thriftydagger-budget-aware-interventions|ThriftyDAgger]] 正文标准提取也有53个NUL字符，故分别从对应正文11页PDF与补充8页PDF重建两份完整缓存，核对来源路径和页数，避免破损数学字形进入阅读缓存。来源页同步注明两份缓存的提取方式，原始证据不变。

## [2026-10-19] ingest | PhysGaussian: Physics-Integrated 3D Gaussians for Generative Dynamics

时间：2026-10-19 17:38（北京时间，UTC+08:00）

按用户系统学习请求归档 arXiv 2311.12198v3（CVPR 2024）原始 PDF（`raw/physgaussian-physics-integrated-3d-gaussians-for-generative-dynamics-2026-10-19-95b0b94d80e3.pdf`）并完整阅读全文 13 页，新建论文来源页 [[physgaussian-physics-integrated-3d-gaussians-for-generative-dynamics|PhysGaussian]]，嵌入并登记正文全部八幅图（图 1–8）。详细梳理“所见即所仿（$\text{WS}^2$）”原则、显式 APIC-MPM P2G/G2P 离散、一阶局部仿射高斯核协方差演化 $a_p(t) = F_p(t) A_p F_p(t)^T$、极分解视线逆旋转球谐函数 $f_t(d) = f_0(R_p^T d)$、无总变形梯度 $F_p$ 的速度梯度率形式更新、不透明度场六向射线搜索加奇偶计数内部填充、各向异性正则化损失 $\mathcal{L}_{\text{aniso}}$、五类本构与塑性返回映射（Fixed Corotated、StVK、Neo-Hookean、Drucker-Prager 沙土、von Mises 金属、Herschel-Bulkley 黏塑性流体）以及晶格变形基准消融实验（表 1）。

## [2026-10-19] ingest | XPandora/PhysGaussian 公开实现：Warp MPM 核函数、Taichi 内部填充与论文—源码差异核查

时间：2026-10-19 17:38（北京时间，UTC+08:00）

固定官方仓库 `XPandora/PhysGaussian` 提交 `8339ed6aa2cd5d50e1001a254a3d95aea678a956`，归档全部 21 个源码与场景配置文件（`raw/physgaussian-repository-2026-10-19-d9fc70e92aff.tgz` 及阅读缓存 `graph/extracts/physgaussian-repository-2026-10-19-d9fc70e92aff.md`），新建代码核查来源页 [[physgaussian-repository|PhysGaussian · Code]]。深入解析 PyTorch + Taichi + NVIDIA Warp 三框架协同数据流、$[0,2]^3$ 坐标与协方差正逆变换及不可调换的初始化顺序，并记录静态核查发现的四处论文—源码差异：（1）内部填充粒子在 `filling.py:306–322` 中直接从最近邻表面核复制 6 维协方差而非按论文 §3.7 初始化为体积球 $\operatorname{diag}(r_p^2, r_p^2, r_p^2)$，且默认 `visualize=False` 仅参与 MPM 力学支撑而不进入渲染；（2）布尔标志 `update_cov_with_F` 字面含义反转（默认 `False` 执行 `F_trial * init_cov * F_trial^T`，设为 `True` 才执行率形式增量更新）；（3）`add_surface_collider` 在 `mpm_solver_warp.py:648` 算出摩擦滑移速度 `v` 后误将网格速度覆写为零向量，致使 `slip` 与摩擦面退化为 `sticky`；（4）源码额外实现了论文未展开的第 6 类带应变软化与刚度归零损伤的 `plasticine` 本构。

## [2026-10-19] ingest | PAC-NeRF: Physics Augmented Continuum Neural Radiance Fields for Geometry-Agnostic System Identification

时间：2026-10-19 17:38（北京时间，UTC+08:00）

归档 arXiv 2303.05512v1（ICLR 2023 Spotlight）原始 PDF（`raw/pac-nerf-physics-augmented-continuum-neural-radiance-fields-2026-10-19-f7a0a1226081.pdf`）并完整阅读全文 14 页，新建论文来源页 [[pac-nerf-physics-augmented-continuum-neural-radiance-fields|PAC-NeRF]]，嵌入并登记图 1 与图 4。记录欧拉—拉格朗日混合 DirectVoxGO + DiffTaichi MLS-MPM 架构、辐射场平流守恒律、初始帧 $\text{G2P} \to \text{P2G}$ 一致性重采样、$\alpha_p^3$ 虚空粒子应力软化、三阶段系统辨识流程以及五类连续介质合成基准结果，阐明其渲染速度与大变形纹理模糊瓶颈如何直接推动 PhysGaussian 与 GIC。

## [2026-10-19] ingest | VR-GS: A Physical Dynamics-Aware Interactive Gaussian Splatting System in Virtual Reality

时间：2026-10-19 17:38（北京时间，UTC+08:00）

归档 arXiv 2401.16663v2（SIGGRAPH 2024）原始 PDF（`raw/vr-gs-physical-dynamics-aware-interactive-gaussian-splatting-2026-10-19-294b63f0d0e0.pdf`）并完整阅读全文 12 页（使用 PyMuPDF 逐页无 NUL 重建缓存），新建论文来源页 [[vr-gs-physical-dynamics-aware-interactive-gaussian-splatting|VR-GS]]，嵌入并登记图 2 与图 3。解析同一团队为何从 PhysGaussian 的逐核 MPM 转向四面体笼 XPBD、局部紧致四面体加全局笼网格的**双层变形嵌入（Two-Level Embedding）**如何消除跨单元分段常数梯度引起的尖刺伪影、内生 3DGS 分割与 LaMa 引导 3D 空洞修补、光源深度阴影贴图，以及相对 PhysGaussian 的 $6.6\text{--}18.6\times$ 单帧加速与笼网格过密导致 XPBD 约束不收敛变软的折中分析。

## [2026-10-19] ingest | Reconstruction and Simulation of Elastic Objects with Spring-Mass 3D Gaussians

时间：2026-10-19 17:38（北京时间，UTC+08:00）

归档 arXiv 2403.09434v3（ECCV 2024）原始 PDF（`raw/spring-gaus-reconstruction-and-simulation-of-elastic-objects-2026-10-19-03d88ab0f14a.pdf`）并完整阅读全文 20 页，新建论文来源页 [[spring-gaus-reconstruction-and-simulation-of-elastic-objects|Spring-Gaus]]，嵌入并登记图 2。梳理外观高斯与 $N_A=2048$ 体积采样弹簧质点锚点的解耦设计、非线性胡克定律与反距离加权（IDW）插值、可微拓扑连接软向量 $\eta(\kappa)$ 与锚点级刚度降维 $k_{i,j} = k_i / l_{i,j}$、真实稀疏视角下的 6D 静态—动态配准与掩码中心损失，以及合成与真实弹性物体上的动态重建、未来预测和异质刚度消融（表 1–3）。

## [2026-10-19] ingest | PhysDreamer: Physics-Based Interaction with 3D Objects via Video Generation

时间：2026-10-19 17:38（北京时间，UTC+08:00）

归档 arXiv 2404.13026v2（ECCV 2024）原始 PDF（`raw/physdreamer-physics-based-interaction-with-3d-objects-2026-10-19-683aff31d3e1.pdf`）并完整阅读全文 22 页，新建论文来源页 [[physdreamer-physics-based-interaction-with-3d-objects|PhysDreamer]]，嵌入并登记图 3 与图 4。记录如何利用图生视频模型（Stable Video Diffusion）生成参考视频并通过可微 MPM + 可微 3DGS 蒸馏双尺度三平面空间杨氏模量场 $E(\mathbf{x})$、两阶段解耦优化与 768 子步激活检查点加帧间梯度截断、基于 K-Means 驱动粒子（Driving Particles）与 8-NN 局部刚体配准的 $10\text{--}50\times$ 仿真加速，以及 800 样本人类 2AFC 评测中揭示的“MPM 网格阻尼使薄叶变慢反而获 86% 人类偏好”的评测洞见。

## [2026-10-19] ingest | GIC: Gaussian-Informed Continuum for Physical Property Identification and Simulation

时间：2026-10-19 17:38（北京时间，UTC+08:00）

归档 arXiv 2406.14927v3（NeurIPS 2024）原始 PDF（`raw/gic-gaussian-informed-continuum-physical-property-identification-2026-10-19-3349f443e056.pdf`）并完整阅读全文 22 页，新建论文来源页 [[gic-gaussian-informed-continuum-physical-property-identification|GIC]]，嵌入并登记图 1 与图 3。解析共享主干运动分解动态 3DGS 与防止大变形核膨胀的 $\mathcal{L}_1$ 尺度正则化、结合多视角高斯深度过滤与四轮“上采样—均值滤波—占据重置”的由粗到细密度场填充（算法 1）、将连续体包装为无色高斯渲染 2D 掩码代理与 3D 表面 Chamfer 距离的双重形状监督，以及在 PAC-NeRF 五材质基准、Spring-Gaus 未来预测基准与 UR10 真机软体抓取上的实验证据。

## [2026-10-19] ingest | PhysTwin: Physics-Informed Reconstruction and Simulation of Deformable Objects from Videos

时间：2026-10-19 17:38（北京时间，UTC+08:00）

归档 arXiv 2503.17973v1 原始 PDF（`raw/phystwin-physics-informed-reconstruction-and-simulation-of-deformable-objects-2026-10-19-79389c194d83.pdf`）并完整阅读全文 16 页（使用 PyMuPDF 逐页无 NUL 重建缓存），新建论文来源页 [[phystwin-physics-informed-reconstruction-and-simulation-of-deformable-objects|PhysTwin]]，嵌入并登记图 1 与图 2。记录带手部/夹爪主动控制点的动量守恒三维弹簧质点模型、基于 TRELLIS 单图 3D 生成先验与 SuperGlue/PnP/ARAP 的完整形状配准、Grounded-SAM2 + CoTracker3 三维伪轨迹监督、**零阶 CMA-ES 离散拓扑搜索 + 一阶可微稠密刚度精化**的分层优化、线性混合蒙皮（LBS）高斯更新，以及在 22 个真实柔性交互场景上相对 Spring-Gaus 和 30 倍数据量 GNN 基线的优势与 57 FPS 实时遥操作/模型预测规划应用。

## [2026-10-19] research | PhysGaussian 与物理集成 3D 高斯（Physical 3DGS）体系整合

时间：2026-10-19 17:38（北京时间，UTC+08:00）

围绕用户系统学习 PhysGaussian 及其相关工作的请求，先同步本仓库远端最新 `main` 分支，完整归档并精读 7 篇代表性论文（[[physgaussian-physics-integrated-3d-gaussians-for-generative-dynamics|PhysGaussian]]、[[pac-nerf-physics-augmented-continuum-neural-radiance-fields|PAC-NeRF]]、[[vr-gs-physical-dynamics-aware-interactive-gaussian-splatting|VR-GS]]、[[spring-gaus-reconstruction-and-simulation-of-elastic-objects|Spring-Gaus]]、[[physdreamer-physics-based-interaction-with-3d-objects|PhysDreamer]]、[[gic-gaussian-informed-continuum-physical-property-identification|GIC]]、[[phystwin-physics-informed-reconstruction-and-simulation-of-deformable-objects|PhysTwin]]）与 [[physgaussian-repository|XPandora/PhysGaussian 官方仓库]]（共 8 份原始资料，新增并校验 19 幅原文图）。新建跨论文概念页 [[PhysicsIntegrated3DGaussians|物理集成 3D 高斯与连续介质仿真]]，统合四类高斯—物理耦合架构（逐核直接 MPM、双层四面体笼 XPBD、K-Means 驱动粒子可微 MPM、稀疏弹簧质点锚点 IDW/LBS）、局部仿射协方差与球谐演化、三代内部体积填充与形状补全策略，以及从真实视频或视频生成先验反演物理参数的优化设计；同步更新 [[DifferentiablePhysics|可微物理]]、[[SystemIdentificationForSimulation|系统辨识]]、[[topics/physics-simulation|物理仿真]]、[[topics/assets-and-world-generation|3D 资产与场景]]、[[topics/simulation-ready-worlds|Simulation-ready Worlds]] 与 [[topics/simulation-transfer|Sim-to-Real]]。本轮未在本机编译运行 GPU 仿真。

## [2026-10-20] ingest | VISTA: A Visual Harness for Reasoning in an Interactive World

时间：2026-10-20 15:34（北京时间，UTC+08:00）

归档 arXiv 2610.02200v1 原始 PDF（`raw/vista-a-visual-harness-for-reasoning-in-an-interactive-world-2026-10-20-40c95e5ebed5.pdf`）并完整阅读全文 19 页，新建论文来源页 [[vista-a-visual-harness-for-reasoning-in-an-interactive-world|VISTA]]，嵌入并登记原文图 3、图 5 与图 10。记录其把 ARC-AGI-3 从“文本网格 + 程序合成”改写为“渲染像素 + 自然语言推理”的动机：视觉表示在编码时无法预知后续用途，长程交互中早期观测又被上下文淘汰；对应机制是视觉观测、无损视觉记忆与模型主导的 `inspect`／`read_pixels`。整理 RHAE 的逐关平方比与关卡加权公式、13.33 → 47.32 → 51.66 → 65.82 → 70.05 → 94.10 → 99.00 的逐层消融、图像与文本网格的 token 对比（30.7M vs 71.9M 每局）、上下文与输入缩放的平坦曲线、3D 渲染与开源权重结果，以及四个基准的泛化数字。同步新建概念页 [[AddressableVisualMemory|可寻址视觉记忆]]，解释“裁剪才改变有效分辨率”“测量与解释分离”“压缩变成交接协议”三条机制判断，并在 [[AgentHarness|Agent Harness]] 的上下文一节补写像素历史的同构问题、在 [[topics/agent-execution|Agent Systems]] 的比较表新增一行。本轮为阅读与知识整合，未复现实验。

## [2026-10-20] ingest | joshhhhhan/VISTA 工程实现：视觉记忆、工具桥与上下文交接

时间：2026-10-20 15:34（北京时间，UTC+08:00）

归档固定提交 `c97c354`（2026-10-04，MIT）的源码快照 `raw/joshhhhhan-vista-repository-2026-10-20-5b1b16a31113.tgz`，按成员路径逐字解码 104 个文本文件生成读取缓存，新建仓库来源页 [[joshhhhhan-vista-repository|VISTA · Code]]。核查内容包括：`benchmarks`／`core`／`backends` 三层与四个基准的适配边界；一次 `play` 从 MCP bridge 经 Unix socket 到宿主 controller 的完整路径，以及“上一次动作结果未交付前拒绝新动作”的串行闸门；512 显示坐标到 64×64 环境格的映射；全部动画帧按 `turn_XXX_frame_YY.png` 归档而只回最后一帧；`inspect` 从归档 PNG 裁剪并最近邻放大、`read_pixels` 的等分格心采样与两套调色板作用域（ARC 精确色 / 通用截图 4 bit 量化）；以 599 个图像块与 provider 自动压缩为触发、`PreCompact` hook 阻断原生压缩、只放行笔记工具、写完后以 `interrupt_after` 结束回合再开新会话的交接协议；以及只读容器、`--tools ""` 与凭据清理的隔离参数。未运行游戏或模型。

## [2026-10-20] ingest | Tycho: Active Abstraction with Programmatic World Models for ARC-AGI-3

时间：2026-10-20 20:28（北京时间，UTC+08:00）

归档 arXiv 2607.28287v1 原始 PDF（`raw/tycho-active-abstraction-with-programmatic-world-models-2026-10-20-6e3b72ecee72.pdf`）并完整阅读 52 页，新建论文来源页 [[tycho-active-abstraction-with-programmatic-world-models|Tycho]]，嵌入并登记原文图 1。记录其把关卡形式化为带转移发射的渲染确定性 Moore 机、区分可行动帧与动画／终局证据、以及在同一证据接口上比较四种模型维护策略的匹配实验：79.07 / 85.36 / 88.49 / 83.07，选定 orchestrator 后 GPT-5.6 Sol 与 Opus 5 双双 100.00（7,766 / 6,641 动作）。重点写明“自动修复让模拟器更准但分数更低”的原因——transition match 不等于目标识别或动作质量，并摘录 actor 的八个工具与“只有 `take_action` 计分”的协议。

## [2026-10-20] ingest | NIMI-research/Tycho：证据工作区、可执行模型接口与可复算的跑分

时间：2026-10-20 20:28（北京时间，UTC+08:00）

归档固定提交 `f68912a`（2026-07-29，Apache-2.0）源码快照 `raw/nimi-research-tycho-repository-2026-10-20-d3f82c1577bb.tgz`，逐字解码 152 个文本文件生成缓存，新建仓库来源页 [[nimi-research-tycho-repository|Tycho · Code]]。核查证据工作区的目录约定（turn 网格／PNG／JSON、关卡内差分、死亡证据、不可变 attempt、`WorkspaceVersionStore`）、为模型可寻址性测过 token 成本的网格格式（spaced_grid8 比 spaced 多 9% token）、`world_model.py` 的五个入口与 `-1` 弃权语义、六张官方 scorecard 与 `evaluation_integrity.json` 的绑定、151 文件完整性清单与容器隔离。未运行游戏。

## [2026-10-20] ingest | Schema: Discovering Unknown Environments via Agentic Program Induction

时间：2026-10-20 20:28（北京时间，UTC+08:00）

归档 arXiv 2609.39140v1 原始 PDF（`raw/schema-discovering-unknown-environments-via-agentic-program-induction-2026-10-20-de1f788d70a7.pdf`）并完整阅读 33 页，新建论文来源页 [[schema-discovering-unknown-environments-via-agentic-program-induction|Schema]]，嵌入并登记原文图 2。记录交互式程序归纳的四步（假设—认证—规划—带验证执行）、预测接口 $P(z_t,o_t,a_t)\to(\hat o_{t+1},z_{t+1})$、全历史回测的认证判据，以及 ARC-AGI-3 从 58.7% 到 99.2% 的模型对照、72.9→52.4 的消融与四条行为案例。标明 DiG-bench“100%”是 max effort 单次 21/21（三次均值 20.3/21），并注明正文与附录对压缩次数的 20/35 两种说法。

## [2026-10-20] ingest | ryanbbrown/Retrodict：把日志当唯一记忆的 ARC-AGI-3 Harness

时间：2026-10-20 20:28（北京时间，UTC+08:00）

归档固定提交 `71672e8`（2026-08-11，无 LICENSE）源码快照 `raw/ryanbbrown-retrodict-repository-2026-10-20-c49ff487069d.tgz`，新建仓库来源页 [[ryanbbrown-retrodict-repository|Retrodict]]。核查其“日志即唯一记忆”的设计：`log.txt` 的稳定标记块、`[DIFF]` 派生、`playbook.md` 的 checked/assumed 标注、带格子级期望的计划队列与逐步核对、150k token 上下文重置、300 动作／2 次 RESET 后的强制升级、containment venv 与每次运行生成的 `containment.json`。特别标明证据边界：README 声称 99.86%（远程卡 `9c403765`），仓库提交的是更早的 84.52 官方卡；并摘录其维护的 18 个 harness 成本对比。

## [2026-10-20] research | ARC-AGI-3 harness 的四种记录与形式化路线

时间：2026-10-20 20:28（北京时间，UTC+08:00）

在四份来源（[[vista-a-visual-harness-for-reasoning-in-an-interactive-world|VISTA]]、[[tycho-active-abstraction-with-programmatic-world-models|Tycho]]、[[schema-discovering-unknown-environments-via-agentic-program-induction|Schema]]、[[ryanbbrown-retrodict-repository|Retrodict]]）之上新建专题页 [[topics/arc-agi-3-harness-design|ARC-AGI-3 Harness 设计]]，比较记录形态（像素／文本网格／类型化事件／程序）、信念载体（笔记／playbook／world_model.py）与“何时形式化”的四种调度，指出四者收敛到“记录高于信念”，并区分可核查证据（第三方卡／轨迹／无代码）。同步在 [[AddressableVisualMemory|可寻址视觉记忆]] 增加同基准其他路线的对照，在 [[topics/agent-execution|Agent Systems]] 比较表加入该专题入口。横向数字部分依赖 Retrodict 作者维护的对比文档与 Tycho 论文对 Schema 重跑协议的描述，已在页面标注为一方说法。

## [2026-10-20] research | MirroS 的可执行世界表示与智能体化评测

时间：2026-10-20 22:03（北京时间，UTC+08:00）

围绕用户“系统学习 MirroS 近期工作”的请求，先同步本仓库 `main`，确认其公开研究线由一篇 Physical RSI 提纲与四项技术报告组成：[[mirros-physical-rsi-thesis|Building Physical RSI]]（08-06）、[[code-as-world-executable-world-representations|Code-as-World]]（08-31，arXiv 2608.27549）、[[harnesseval-w-agentifying-evaluation-of-visual-worlds|HarnessEval-W]]（08-18，2608.16859）、[[s-space-spatial-workspace-mllm|S-Space]]（10-09，2610.13527）、[[agentgarten-code-worlds-evolving-agents|AgentGarten]]（10-08，2610.12374）。归档 4 份 PDF 与 1 份提纲 HTML（快照与 SHA-256 见各来源页），完整阅读并交叉核对摘要、方法、主表、附录与局限；未运行任何模型或实验。

新建专题 [[topics/executable-world-representations|可执行世界表示与智能体化评测]]，把四条线定位为“表示—环境—机制—评测”：Code-as-World 的 $p=(C,E,A)$ 与 propose–execute–render–verify 循环、AgentGarten 的代码世界 + 实时神经渲染器 + playbook 继承、S-Space 的线性坐标读出与因果干预、HarnessEval-W 的路由—子问题—证据树。新建概念页 [[ExecutableWorldRepresentation|可执行世界表示]]、[[AgentifiedEvaluation|智能体化评测]]、[[SpatialWorkspaceInMLLMs|多模态模型的空间工作区]]，分别沉淀跨来源机制，不复制论文实验。

关键数字与边界：Code-as-World 的 QuantiPhy 是外部 159 题验证集，9B 直答 55.4 略高于 Gemini-3.1 Flash 54.8，27B 58.6 但 2S 仅 48.7；无 C/E/A 与验证器消融。HarnessEval-W 330 case/18 模型，人类排序 Spearman 0.93/0.87，对 WBench 的 Physical pairwise accuracy 31.9%→71.7%，但无成本、无逐 case 人类标签。S-Space 的 SpinBench 60.96→94.52 依赖外部 oracle 旋转；深度轴 Spearman 仅 0.521，多视角深度 steering 57–68%。AgentGarten 的“第 4/10 轮”对照“2,500 万/1 亿回合”是范式差异，四个附加世界每轮仅 1 episode。上述均已写入来源页的“局限”，不进入已验证结论。

同步更新 [[topics/world-models-and-representations|World Models]]、[[topics/world-model-evaluation|World Model 评测]]、[[topics/simulation-ready-worlds|Simulation-ready Worlds]]、[[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]] 与 [[overview|总览]]，加入“表示从预测器变为可操作接口”的跨主题判断及其证据边界。本轮未新增图片；来源页只引用表号与页码，不改写 `raw/`。

## [2026-10-20] ingest | Code-as-World：用可执行代码表示物理世界

时间：2026-10-20 22:06（北京时间，UTC+08:00）

归档 arXiv 2608.27549v1（MirroS/清华/北大/NTU，31 页）并完整阅读，新建论文页 [[code-as-world-executable-world-representations|Code-as-World]]。记录 $p=(C,E,A)$ 的可执行世界表示、propose–execute–render–verify 发现循环（无损失函数、关键帧语言诊断、$K=5$）、两阶段 SFT+GRPO 与 73,335 图像空间 / 1,585 文本世界 / 988 视频世界 VQA。主表 4B/9B/27B 为 50.6/55.4/58.6，9B 略高于 Gemini-3.1 Flash 54.8；同时标注 QuantiPhy 是外部 159 题基准、4B/9B 基座未写明、无成分与验证器消融、原文 Table 4 与正文 56.8 的矛盾。未复现实验。

## [2026-10-20] ingest | HarnessEval-W：把世界模型评测变成可审计的证据树

时间：2026-10-20 22:06（北京时间，UTC+08:00）

归档 arXiv 2608.16859v1（MirroS，17 页）并完整阅读，新建论文页 [[harnesseval-w-agentifying-evaluation-of-visual-worlds|HarnessEval-W]]。记录由 $P(o|s)T(s'|s,a)$ 分解出的三轴八指标、9 个 skill 的路由—子问题—证据树、330 case/18 模型榜单（Seedance 2.0 75.5 至 InSpatio-World 61.4），以及人类对齐（Intentional $\rho=0.93$、Physical $\rho=0.87$）与 WBench 对照（Physical pairwise 31.9%→71.7%，draw 52.2%→1.8%）。标注 Figure 10 与 §5.4.2 正文数值冲突、无成本/无逐 case 人类标签/评委仍是 VLM 等边界。未复现评测。

## [2026-10-20] ingest | S-Space：多模态模型内部的三维空间工作区

时间：2026-10-20 22:06（北京时间，UTC+08:00）

归档 arXiv 2610.13527v1（MirroS/清华/北大，24 页）并完整阅读，新建论文页 [[s-space-spatial-workspace-mllm|S-Space]]。记录从答案 logit 差梯度构造三轴读出方向 $v_g$、坐标读出与写回干预（swap/shift/random）、跨 prompt 与多视角持久性，以及 SpinBench 上 direct 60.96 对 S-Space+rotation 94.52 的“信息够、计算不够”证据。明确标注旋转是外部 oracle、深度轴 Spearman 仅 0.521、多视角深度 steering 57–68%、因果干预只在 Molmo2-ER L17 完成。未复现实验。

## [2026-10-20] ingest | AgentGarten：代码世界与实时神经渲染器

时间：2026-10-20 22:06（北京时间，UTC+08:00）

归档 arXiv 2610.12374v1（MirroS/清华/北大，26 页）并完整阅读，新建论文页 [[agentgarten-code-worlds-evolving-agents|AgentGarten]]。记录代码世界状态 $f_p$ 不接收渲染观测、深度/法线条件的共享渲染器（Cosmos3-Nano 三阶段训练、exact replay 逐位一致），以及单 H100 36.5 FPS/438.8 ms 每 16 帧块、hide-and-seek 第 4/10 轮与四个附加世界的逐轮曲线。标注每轮 1 episode、单模型 GPT-6 Astra、无 playbook 消融、无 FVD/用户研究、渲染器不保证实现代码状态等边界。未运行系统。

## [2026-10-20] ingest | MirroS：Physical RSI 需要同时改进 Actor 与世界模型

时间：2026-10-20 22:06（北京时间，UTC+08:00）

归档 MirroS 研究提纲《Building Physical RSI Beyond the Known World》（2026-08-06，HTML）并完整阅读，新建来源页 [[mirros-physical-rsi-thesis|MirroS · Physical RSI 提纲]]。记录 environment gap / skill gap 的区分、八步循环（遭遇→意外→诊断→抽象→模拟→求解→验证→内化）、四项能力路线图与“评测/可解释性”两项横向要求。明确这是立场文、无实验，不能把八步循环当作已在真实机器人闭环的系统能力。

## [2026-10-20] learn | MirroS 四篇论文逐节带读

时间：2026-10-20 22:12（北京时间，UTC+08:00）

按用户要求，为四项技术报告补写逐节阅读笔记 [[syntheses/mirros-guided-reading|MirroS 四篇论文逐节带读]]，按原文 §1–§7 的顺序解释每节的论证任务、关键公式、变量含义、假设与阅读问题，而不是再建一套学习路径。覆盖 Code-as-World 的 $p=(C,E,A)$、发现循环、像素/世界空间监督与 GRPO；AgentGarten 的状态接口、块因果掩码、DMD、exact replay 与 R1/R2；S-Space 的梯度读出、写回干预、SpinBench 的 oracle 旋转限定与参考系耦合；HarnessEval-W 的 $S/T$ 分解、路由与证据树、人类对齐与 WBench 对照。笔记中所有数字与边界均与来源页一致，未新增实验；冲突（HarnessEval 正文与 Figure 10、Code-as-World 27B 的 2S 子项）按来源页保留。专题页已加入口。

## [2026-10-21] update | 为 MirroS 四篇来源页补原文图

时间：2026-10-21 12:09（北京时间，UTC+08:00）

补充四篇论文页缺失的原文图：[[code-as-world-executable-world-representations|Code-as-World]] 图 3（发现循环，PDF 第 7 页）、[[agentgarten-code-worlds-evolving-agents|AgentGarten]] 图 2（代码世界与渲染器回路，第 3 页）、[[s-space-spatial-workspace-mllm|S-Space]] 图 2（物理空间—激活子空间—读出，第 3 页）、[[harnesseval-w-agentifying-evaluation-of-visual-worlds|HarnessEval-W]] 图 2（评测流水线，第 4 页）。按页内文字块定位边界，从原始 PDF 裁剪并登记到 `graph/figures.json`（新增 4 条，总计 324 张），图注保留图号、来源页与原始链接；未改动论文结论与实验数字。同步把四页 `modified` 更新为 2026-10-21。
