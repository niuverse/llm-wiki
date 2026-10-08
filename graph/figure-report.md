# 全库配图审计

检查日期：2026-10-08。扫描 `wiki/` 全部 179 篇 Markdown（含日志；健康检查计 178 页），逐一盘点 69 篇来源页的原始证据与图号引用。54 篇来源页和 4 篇概念页加入本地图；另有 1 篇来源页说明失效配图。

## 阅读效果与范围

- 共 264 份图片资产，正文共 268 处嵌入。补全现有来源笔记中明确引用的图，并补充官方架构图、流程图、示例与关键曲线；不是把每份完整原文的全部插图无差别复制进摘要。
- 图直接放在正文相关位置，保留原有章节、图号定位和来源链接；PDF 裁图附 PDF 页码，保留原始坐标、图例及图注。概念页复用来源页图片。
- 图片都位于 `wiki/assets/figures/`，用相对 Markdown 路径显示，随 Obsidian 库离线携带。没有依赖外站图片热链或专有插件。
- 原始证据不改写。新增官方网页图片归档在 `raw/`，下载记录保存在 `graph/acquisitions.jsonl`；已有压缩包中的图直接按成员路径生成衍生图。

## 压缩与可追溯性

- PDF 与归档 PDF 子图共 216 张，WebP 合计 26.55 MiB；同尺寸 PNG 对照合计 80.24 MiB，减少 66.9%。此比值针对相同尺寸的图像，不是与整份 PDF 比较。
- 所有库内资产合计 46.78 MiB。静态位图最长限制为宽 2200、高 2800 像素，WebP 质量 92；动画最大 640×640，质量 80，保留帧时长与循环；SVG 保留矢量几何。白色画布使透明底黑字图在深色主题中也能阅读。
- `graph/figures.json` 记录源文件哈希、PDF 页码与归一化裁剪区域／归档成员、输出尺寸、质量和图片哈希。图像只作裁剪、缩放与编码，不重画数据。
- `uv run python tools/build_figures.py` 检查源文件与衍生文件完整性、来源页嵌入及图号覆盖；`--render` 重建，`--only <路径片段>` 可局部重建。不要改 `raw/` 来修图片。

## 可重复验证

逐张检查了裁图与网页图片的联系表，并针对裁剪错误回看原始 PDF 页后修正。自动检查包含缺图、库外路径、远程图片、原始证据变化与有图号无配图。实际构建后检查了全部 268 处正文图片引用，均解析到 `public/` 内存在的资产；264 份构建产物的哈希与登记记录一致。29 项测试、图片证据检查、目录检查、健康检查与 Quartz 构建均通过。

内置浏览器初始化被当前工具环境拒绝（模块 `node:process` 不允许导入），所以本轮不宣称完成浏览器截图验证或 Obsidian 应用内验证；已完成图片本身的视觉核对与静态路径检查。

## 来源逐页清单

| 来源页 | 处理结果 |
| --- | --- |
| [A Comprehensive Survey on World Models for Embodied AI](../wiki/sources/a-comprehensive-survey-on-world-models-for-embodied-ai.md) | 已嵌入 3 张本地图；图号引用已检查 |
| [AgentsDock Releases](../wiki/sources/agentsdock-releases.md) | 无显式图号引用；本轮未添加装饰标识或从未核验外链补图 |
| [AgentsServer](../wiki/sources/agentsserver.md) | 已嵌入 1 张本地图；图号引用已检查 |
| [AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning](../wiki/sources/agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning.md) | 已嵌入 7 张本地图；图号引用已检查 |
| [AwesomeWorldModels：世界模型文献索引](../wiki/sources/awesome-world-models.md) | 无显式图号引用；本轮未添加装饰标识或从未核验外链补图 |
| [CoACD：保留碰撞相关凹陷的凸分解](../wiki/sources/coacd-approximate-convex-decomposition.md) | 已嵌入 8 张本地图；图号引用已检查 |
| [CoACD 项目：接口、尺度与分解代码](../wiki/sources/coacd-repository.md) | 已嵌入 1 张本地图；图号引用已检查 |
| [接触模型比较：物理近似与数值求解怎样改变机器人运动](../wiki/sources/contact-models-in-robotics-a-comparative-analysis.md) | 已嵌入 17 张本地图；图号引用已检查 |
| [凸基元分解：按碰撞成本拟合可编辑的几何](../wiki/sources/convex-primitive-decomposition-for-collision-detection.md) | 已嵌入 11 张本地图；图号引用已检查 |
| [DCOL：以最小均匀缩放构造可微碰撞约束](../wiki/sources/dcol-differentiable-collision-detection-for-a-set-of-convex-primitives.md) | 已嵌入 5 张本地图；图号引用已检查 |
| [DexWeave：联合重定向手臂与手指，学习人形机器人灵巧操作](../wiki/sources/dexweave-dexterous-humanoid-loco-manipulation.md) | 已嵌入 3 张本地图；图号引用已检查 |
| [DiffPills：把胶囊体与带厚度多边形的碰撞写成二次规划](../wiki/sources/diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons.md) | 已嵌入 3 张本地图；图号引用已检查 |
| [DINO-WM：用预训练视觉特征进行目标规划](../wiki/sources/dino-wm-pretrained-visual-features.md) | 已嵌入 2 张本地图；图号引用已检查 |
| [Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining](../wiki/sources/disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining.md) | 已嵌入 3 张本地图；图号引用已检查 |
| [DreamerV3：在想象中学习控制策略](../wiki/sources/dreamerv3-mastering-diverse-control.md) | 已嵌入 6 张本地图；图号引用已检查 |
| [EmbodiedGen: Towards a Generative 3D World Engine for Embodied Intelligence](../wiki/sources/embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence.md) | 已嵌入 15 张本地图；图号引用已检查 |
| [EmbodiedGen V2: An Agentic, Simulation-Ready 3D World Engine for Embodied AI](../wiki/sources/embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai.md) | 已嵌入 10 张本地图；图号引用已检查 |
| [The Basic Structure of glTF - Khronos glTF Tutorials](../wiki/sources/gltf-basic-structure.md) | 已嵌入 2 张本地图；图号引用已检查 |
| [GRAIL: Generating Humanoid Loco-Manipulation from 3D Assets and Video Priors](../wiki/sources/grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors.md) | 已嵌入 4 张本地图；图号引用已检查 |
| [Isaac Lab Repository](../wiki/sources/isaac-lab-repository.md) | 已嵌入 1 张本地图；图号引用已检查 |
| [Asset Structure - Isaac Sim 4.5 Documentation](../wiki/sources/isaac-sim-45-asset-structure.md) | 官方图片 URL 返回 404；正文已说明缺图，未以新版图片替代 |
| [Asset Structure - Isaac Sim Documentation](../wiki/sources/isaac-sim-asset-structure.md) | 已嵌入 4 张本地图；图号引用已检查 |
| [Isaac Sim Core API Collision Approximation](../wiki/sources/isaac-sim-core-api-collision-approximation.md) | 无显式图号引用；本轮未添加装饰标识或从未核验外链补图 |
| [Isaac Sim 6.1: Deploying policies in Isaac Sim](../wiki/sources/isaac-sim-policy-deployment.md) | 已嵌入 2 张本地图；图号引用已检查 |
| [KPI：用交互约定连接高层智能体与人形机器人接触控制](../wiki/sources/kpi-promptable-kernel-physical-interaction.md) | 已嵌入 7 张本地图；图号引用已检查 |
| [LDA-1B: Scaling Latent Dynamics Action Model via Universal Embodied Data Ingestion](../wiki/sources/lda-1b-scaling-latent-dynamics-action-model.md) | 已嵌入 7 张本地图；图号引用已检查 |
| [OpenUSD File Formats - Learn OpenUSD](../wiki/sources/learn-openusd-file-formats.md) | 无显式图号引用；本轮未添加装饰标识或从未核验外链补图 |
| [What Is Prim Composition? - Learn OpenUSD](../wiki/sources/learn-openusd-prim-composition.md) | 已嵌入 5 张本地图；图号引用已检查 |
| [Stage - Learn OpenUSD](../wiki/sources/learn-openusd-stage.md) | 已嵌入 1 张本地图；图号引用已检查 |
| [MagicSim: A Unified Infrastructure for Executable Embodied Interaction](../wiki/sources/magicsim-a-unified-infrastructure-for-executable-embodied-interaction.md) | 已嵌入 5 张本地图；图号引用已检查 |
| [ManiSkill Repository](../wiki/sources/maniskill-repository.md) | 无显式图号引用；本轮未添加装饰标识或从未核验外链补图 |
| [mjlab Repository](../wiki/sources/mjlab-repository.md) | 无显式图号引用；本轮未添加装饰标识或从未核验外链补图 |
| [Modern Robotics Chapter 13: Wheeled Mobile Robots](../wiki/sources/modern-robotics-chapter-13-wheeled-mobile-robots.md) | 已嵌入 6 张本地图；图号引用已检查 |
| [Modern Robotics 3.3.1: Homogeneous Transformation Matrices](../wiki/sources/modern-robotics-homogeneous-transformations.md) | 教程为文字与视频入口；未把视频入口或机构标识当作论文图 |
| [Modern Robotics 8.1: Lagrangian Formulation of Dynamics (Part 1 of 2)](../wiki/sources/modern-robotics-lagrangian-dynamics.md) | 教程为文字与视频入口；未把视频入口或机构标识当作论文图 |
| [MotrixSim Documentation](../wiki/sources/motrixsim-documentation.md) | 无显式图号引用；本轮未添加装饰标识或从未核验外链补图 |
| [MuJoCo Computation：动力学、积分与接触](../wiki/sources/mujoco-computation-collision-detection.md) | 已嵌入 5 张本地图；图号引用已检查 |
| [Overview - MuJoCo Documentation](../wiki/sources/mujoco-overview.md) | 已嵌入 2 张本地图；图号引用已检查 |
| [MuJoCo Playground Repository](../wiki/sources/mujoco-playground-repository.md) | 已嵌入 1 张本地图；图号引用已检查 |
| [MuJoCo Warp (MJWarp) Documentation](../wiki/sources/mujoco-warp-mjwarp-documentation.md) | 无显式图号引用；本轮未添加装饰标识或从未核验外链补图 |
| [MuJoCoUni: Persistent Batched Runtime Primitives for MuJoCo](../wiki/sources/mujocouni-persistent-batched-runtime-primitives-for-mujoco.md) | 已嵌入 6 张本地图；图号引用已检查 |
| [NVIDIA ovrtx](../wiki/sources/nvidia-ovrtx.md) | 已嵌入 2 张本地图；图号引用已检查 |
| [NVlabs/RoboLab](../wiki/sources/nvlabs-robolab.md) | 已嵌入 1 张本地图；图号引用已检查 |
| [Articulations - Omni Physics](../wiki/sources/omniverse-omni-physics-articulations.md) | 已嵌入 2 张本地图；图号引用已检查 |
| [USD Terms and Concepts](../wiki/sources/openusd-glossary.md) | 无显式图号引用；本轮未添加装饰标识或从未核验外链补图 |
| [Introduction to USD](../wiki/sources/openusd-introduction.md) | 无显式图号引用；本轮未添加装饰标识或从未核验外链补图 |
| [Sim-to-Real Transfer of Robotic Control with Dynamics Randomization](../wiki/sources/peng-dynamics-randomization.md) | 已嵌入 2 张本地图；图号引用已检查 |
| [π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities](../wiki/sources/pi07-steerable-generalist-robotic-foundation-model.md) | 已嵌入 12 张本地图；图号引用已检查 |
| [PlaNet：从像素学习潜在动力学并规划](../wiki/sources/planet-learning-latent-dynamics.md) | 已嵌入 8 张本地图；图号引用已检查 |
| [Predictive Inverse Dynamics Models are Scalable Learners for Robotic Manipulation](../wiki/sources/predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation.md) | 已嵌入 4 张本地图；图号引用已检查 |
| [Rho：分离机器人适配、任务微调与潜在空间在线纠正](../wiki/sources/rho-efficiently-adaptable-vla-models.md) | 已嵌入 6 张本地图；图号引用已检查 |
| [Rho 发布文档：检查点接口与 LIBERO 最小验证](../wiki/sources/rho-release-documentation.md) | 实现说明无图号引用；模型架构与实验图已放在 Rho 论文页 |
| [RoboCasa365: A Large-Scale Simulation Framework for Training and Benchmarking Generalist Robots](../wiki/sources/robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots.md) | 已嵌入 4 张本地图；图号引用已检查 |
| [RoboLab: A High-Fidelity Simulation Benchmark for Analysis of Task Generalist Policies](../wiki/sources/robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies.md) | 已嵌入 3 张本地图；图号引用已检查 |
| [Robotics Simulation Infrastructure](../wiki/sources/robotics-simulation-infrastructure.md) | 已嵌入 3 张本地图；图号引用已检查 |
| [SimEX：让编程智能体在仿真中开发并修复机器人技能](../wiki/sources/simex-simulation-integrated-robotics-autoresearch.md) | 已嵌入 5 张本地图；图号引用已检查 |
| [Closing the Sim-to-Real Loop: Adapting Simulation Randomization with Real World Experience](../wiki/sources/simopt-adaptive-randomization.md) | 已嵌入 6 张本地图；图号引用已检查 |
| [Part 2: Kinds of RL Algorithms - Spinning Up](../wiki/sources/spinning-up-rl-algorithm-taxonomy.md) | 已嵌入 1 张本地图；图号引用已检查 |
| [Part 1: Key Concepts in RL - Spinning Up](../wiki/sources/spinning-up-rl-key-concepts.md) | 已嵌入 1 张本地图；图号引用已检查 |
| [Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots](../wiki/sources/structural-properties-and-classification-of-wheeled-mobile-robots.md) | 已嵌入 6 张本地图；图号引用已检查 |
| [TD-MPC2：以任务价值学习潜在模型并规划](../wiki/sources/td-mpc2-scalable-robust-world-models.md) | 已嵌入 8 张本地图；图号引用已检查 |
| [Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World](../wiki/sources/tobin-domain-randomization.md) | 已嵌入 5 张本地图；图号引用已检查 |
| [UniLab: A Heterogeneous Architecture for Robot RL Beyond GPU-Dominant Paradigms](../wiki/sources/unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms.md) | 已嵌入 8 张本地图；图号引用已检查 |
| [UniLab Repository](../wiki/sources/unilab-repository.md) | 已嵌入 1 张本地图；图号引用已检查 |
| [V-HACD 项目：体素分解、参数与调用契约](../wiki/sources/v-hacd-repository.md) | 无显式图号引用；本轮未添加装饰标识或从未核验外链补图 |
| [V-JEPA 2：视频表征怎样接到机器人规划](../wiki/sources/v-jepa-2-understanding-prediction-planning.md) | 已嵌入 9 张本地图；图号引用已检查 |
| [VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation](../wiki/sources/viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation.md) | 已嵌入 6 张本地图；图号引用已检查 |
| [VisACD：用可见性快速评价凸分解切面](../wiki/sources/visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition.md) | 已嵌入 3 张本地图；图号引用已检查 |
| [WorldEcho／WorldSync：世界模型是否忠实执行动作](../wiki/sources/worldecho-worldsync-action-following.md) | 已嵌入 5 张本地图；图号引用已检查 |
