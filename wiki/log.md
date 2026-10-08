---
title: "知识库日志"
type: synthesis
tags: []
sources: []
modified: 2026-08-25
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
