---
title: "物理仿真"
type: "topic"
tags: ["simulation", "source-backed"]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[mujoco-computation-collision-detection]]", "[[coacd-approximate-convex-decomposition]]", "[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]", "[[mujoco-overview]]", "[[openusd-introduction]]", "[[isaac-sim-asset-structure]]", "[[nvidia-ovrtx]]", "[[modern-robotics-homogeneous-transformations]]", "[[modern-robotics-lagrangian-dynamics]]", "[[tobin-domain-randomization]]", "[[peng-dynamics-randomization]]", "[[simopt-adaptive-randomization]]", "[[isaac-sim-policy-deployment]]", "[[robosimstudio-interactive-toolkit-rapid-real2sim]]", "[[robosimstudio-repository]]", "[[physgaussian-physics-integrated-3d-gaussians-for-generative-dynamics]]", "[[physgaussian-repository]]", "[[pac-nerf-physics-augmented-continuum-neural-radiance-fields]]", "[[vr-gs-physical-dynamics-aware-interactive-gaussian-splatting]]", "[[spring-gaus-reconstruction-and-simulation-of-elastic-objects]]", "[[physdreamer-physics-based-interaction-with-3d-objects]]", "[[gic-gaussian-informed-continuum-physical-property-identification]]", "[[phystwin-physics-informed-reconstruction-and-simulation-of-deformable-objects]]"]
modified: "2026-10-19"
entry: "research"
nav_order: 4
description: "碰撞、接触与动力学求解"
---

# 物理仿真

物理仿真从几何和状态出发，计算约束、接触与下一时刻运动。这里按计算链条阅读，区分物理近似、离散化和数值求解，避免把“跑得稳定”直接视为“符合真实”。

## 阅读地图

- **几何输入。** [[topics/collision-geometry|碰撞几何]] 比较凸分解、基元表示和可微查询；[[CollisionGeometryForRobotSimulation|碰撞几何基础]] 解释视觉网格与碰撞表示为何不同。
- **接触关系。** [[topics/contact-modeling|接触模型与求解]] 连接 [[ContactComplementarity|Contact Complementarity]]、[[ContactModelsInRobotics|接触模型]] 和 [[ContactSolvers|Contact Solvers]]。
- **动力学与时间。** [[RobotRigidBodyDynamics|刚体动力学]]、[[ReducedCoordinateArticulations|约化坐标关节系统]]、[[SimulationTimeStepping|离散步进]] 解释状态推进的假设。
- **梯度与优化。** [[DifferentiableCollisionDetection|Differentiable Collision Detection]] 与 [[DifferentiablePhysics|Differentiable Physics]] 的可微对象、退化条件和接触切换边界分别成立。
- **物理集成 3D 高斯与连续介质。** [[PhysicsIntegrated3DGaussians|物理集成 3D 高斯与连续介质仿真]] 串联从 [[pac-nerf-physics-augmented-continuum-neural-radiance-fields|PAC-NeRF]]、[[physgaussian-physics-integrated-3d-gaussians-for-generative-dynamics|PhysGaussian]]（[[physgaussian-repository|Code]]）到 [[vr-gs-physical-dynamics-aware-interactive-gaussian-splatting|VR-GS]]、[[spring-gaus-reconstruction-and-simulation-of-elastic-objects|Spring-Gaus]]、[[physdreamer-physics-based-interaction-with-3d-objects|PhysDreamer]]、[[gic-gaussian-informed-continuum-physical-property-identification|GIC]] 与 [[phystwin-physics-informed-reconstruction-and-simulation-of-deformable-objects|PhysTwin]] 的演进，对比 APIC-MPM、XPBD 与三维弹簧质点如何驱动 3DGS 并从视频反演材料属性。
- **有效计算。** [[topics/robot-learning-systems|训练系统]] 讨论物理、渲染、数据搬运与学习器的整体成本。资产如何携带物理参数见 [[topics/assets-and-world-generation|3D 资产与场景]]。

## 当前理解

几何改变接触输入，接触模型决定所求的关系，数值方法决定在给定预算下如何近似求解。这个分工由 [[contact-models-in-robotics-a-comparative-analysis|接触比较论文]]、[[mujoco-computation-collision-detection|MuJoCo 计算文档]] 和 [[coacd-approximate-convex-decomposition|CoACD]] 的不同实验对象支持。当同一操作任务同时包含铰接机械臂、薄壳布料与体积软体时，[[robosimstudio-interactive-toolkit-rapid-real2sim|RoboSimStudio]] 及其 [[robosimstudio-repository|多物理场分岛与协同仿真实现]] 进一步展示了如何把 MuJoCo-Warp、VBD 与外部隐式有限元引擎（SuperDex、Genesis）组合在同一场景中，并通过子步位姿插值、非对称 EMA 力旋量滤波与单步冲量限幅维持跨求解器接触稳定。可微接近度与欧氏穿透距离也应区分，见 [[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|DCOL]]。

## 按现象定位问题

| 看到的现象 | 先查哪里 | 再深入哪里 |
| --- | --- | --- |
| 机器人或相机转向异常 | [[RobotCoordinateFrames|坐标与位姿]] | 轴、单位、变换方向及关节顺序 |
| 改策略频率后行为改变 | [[SimulationTimeStepping|时步与控制频率]] | [[PolicyDeploymentContract|动作和时序契约]] |
| 网格正常，物体却抓不住 | [[CollisionGeometryForRobotSimulation|碰撞几何]] | [[ContactComplementarity|Contact Complementarity]]、[[ContactSolvers|Contact Solvers]] |
| 夹爪颤振或闭环机构不稳定 | [[RobotRigidBodyDynamics|动力学]]、[[ReducedCoordinateArticulations|关节驱动]] | [[isaac-sim-mujoco-control-tuning-notes|控制调参笔记]] |
| RGB 正常，策略输入异常 | [[RTXSensorSimulationPipeline|传感器输出]] | [[PolicyDeploymentContract|观测顺序、缩放与历史]] |
| 仿真成功，硬件失败 | [[SimulationRealityGap|差距诊断]] | [[DomainRandomization|随机化]]、[[SystemIdentificationForSimulation|辨识]] |
| 希望通过梯度优化动作 | [[DifferentiablePhysics|Differentiable Physics]] | [[DifferentiableCollisionDetection|可微碰撞]] |
| 3DGS 变形仿真出现瘪塌或尖刺毛刺 | [[PhysicsIntegrated3DGaussians|物理集成 3D 高斯]] | [[physgaussian-physics-integrated-3d-gaussians-for-generative-dynamics|内部填充与各向异性正则化]]、[[vr-gs-physical-dynamics-aware-interactive-gaussian-splatting|双层四面体嵌入]] |

## PhysGaussian 与物理集成 3D 高斯演进对比

围绕“所见即所仿（What You See Is What You Simulate）”将物理仿真与 3DGS 结合的工作，按**正向动力学合成**、**实时交互降维**与**逆向材料参数辨识**形成清晰的演进链条：

| 工作与年份 | 视觉与几何表征 | 物理求解器与自由度 | 参数来源与核心创新 | 主要局限或适用边界 |
| --- | --- | --- | --- | --- |
| [[pac-nerf-physics-augmented-continuum-neural-radiance-fields|PAC-NeRF]]（ICLR 2023） | DirectVoxGO 欧拉体素场（$160^3$）+ 浅层 MLP | DiffTaichi 可微 MLS-MPM（五类连续介质） | 从 11 视角 RGB 视频端到端联合反演未知几何、初速度与本构参数 | 体素光线步进慢（~1 s/帧，训练 1.5 h）；P2G 重采样使大变形 RGB 纹理严重模糊 |
| [[physgaussian-physics-integrated-3d-gaussians-for-generative-dynamics|PhysGaussian]]（CVPR 2024，[[physgaussian-repository|Code]]） | 3DGS 各向异性核 + 不透明度射线内部填充 + $\mathcal{L}_{\text{aniso}}$ | NVIDIA Warp 显式 APIC-MPM（逐高斯核直接作物质点） | 局部仿射协方差演化 $a_p = F_p A_p F_p^T$ + 极分解旋转球谐视线 $f_0(R_p^T d)$，无需任何网格 | 参数需手工配置；复杂百万核场景单帧 $112\text{--}390\text{ ms}$；静态烘焙阴影不随物体移动 |
| [[vr-gs-physical-dynamics-aware-interactive-gaussian-splatting|VR-GS]]（SIGGRAPH 2024） | 分割/LaMa 修补 3DGS + VDB/TetGen 四面体笼 + 动态阴影贴图 | 有限元应变能约束 XPBD（$1\text{万}\sim 3\text{万}$ 顶点笼） | **局部—全局双层四面体嵌入**消除跨单元高斯毛刺，比 PhysGaussian 加速 $6.6\text{--}18.6\times$ | 固定拓扑四面体笼不支持流体/沙土溃散；笼网格过密（>5 万顶点）在固定迭代预算下反而变软 |
| [[spring-gaus-reconstruction-and-simulation-of-elastic-objects|Spring-Gaus]]（ECCV 2024） | 各向同性静态 3DGS（与动态帧 6D 配准） | 可微 3D 弹簧质点（$N_A = 2048$ 体积采样锚点）+ IDW 插值 | 无需预设本构类型，通过逐锚点刚度 $k_i/l_{i,j}$ 与可微连接软向量 $\eta(\kappa)$ 反演异质弹性体 | 仅限纯弹性体；无主动受控交互输入，仅做纯平移 IDW 插值 |
| [[physdreamer-physics-based-interaction-with-3d-objects|PhysDreamer]]（ECCV 2024） | 静态 3DGS + $8^3 / 24^3$ 双三平面神经场 | 可微 Fixed-Corotated MPM（K-Means 降采样 $10\text{--}50\times$ 驱动粒子） | 无需真实交互视频，从 Stable Video Diffusion 生成视频蒸馏空间连续杨氏模量场 $E(\mathbf{x})$ | 仅限无碰撞纯弹性微幅振荡；MPM 网格阻尼使薄叶频率偏慢；每生成 1 秒视频需 V100 跑约 1 分钟 |
| [[gic-gaussian-informed-continuum-physical-property-identification|GIC]]（NeurIPS 2024） | 运动分解动态 3DGS（含尺度正则）+ 4 轮由粗到细密度场 | DiffTaichi 可微 MLS-MPM（五类连续介质，5–10 万粒子） | 将连续介质包装为无色高斯渲染 **2D 掩码代理**，结合 **3D 提取表面 CD** 消除大变形 RGB 失真干扰 | 仍需已知本构类别与多视角标定相机；单物体恢复需 A10 训练约 1.5 小时 |
| [[phystwin-physics-informed-reconstruction-and-simulation-of-deformable-objects|PhysTwin]]（2025） | TRELLIS 单图生成完整形状 + 各向同性 3DGS LBS 蒙皮 | Warp 可微 3D 弹簧质点（含手部/夹爪主动控制点） | 仅需 3 个稀疏 RGB-D 视角；**零阶 CMA-ES 搜拓扑 + 一阶梯度优稠密刚度**，支持 57 FPS 实时遥操作与机器人规划 | 聚焦弹性/准弹性可变形物体（绳索、布料、毛绒玩具、包裹），尚未覆盖塑性流体与切割撕裂 |

## 未解问题与优先补证

怎样在同一任务中同时报告几何误差、约束残差、能量、吞吐量与真实轨迹差异？柔性接触和材料行为仍缺系统资料；具体数值与几何缺口分别见 [[topics/contact-modeling#未解问题与优先补证|接触专题]]、[[topics/collision-geometry#未解问题与优先补证|几何专题]]。
