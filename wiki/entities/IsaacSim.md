---
title: "Isaac Sim"
type: entity
tags: [robotics, simulation, nvidia, usd, physx]
sources: ["[[isaac-sim-45-asset-structure]]", "[[isaac-sim-asset-structure]]", "[[isaac-sim-core-api-collision-approximation]]", "[[omniverse-omni-physics-articulations]]", "[[isaac-lab-repository]]"]
last_updated: 2026-07-13
---

# Isaac Sim

Isaac Sim 是 [[NVIDIA]] 的机器人学仿真技术栈。本知识库当前对 Isaac Sim 的有来源支持的覆盖范围来自四类官方文档：[[isaac-sim-45-asset-structure|Isaac Sim 4.5 Asset Structure]] 说明旧版 / pre-3.0 资产布局；[[isaac-sim-asset-structure|Isaac Sim 6.0 Asset Structure]] 说明导入的机器人资产会被组织成几何、材质、instances、物理、机器人结构规范、引擎特定的调优和可选特征层；[[isaac-sim-core-api-collision-approximation|Isaac Sim Core API collision approximation docs]] 列出三角形网格、凸分解、凸包、包围球体 / cube、网格 simplification、SDF 和球体 fill 等碰撞体模式；[[omniverse-omni-physics-articulations|关节系统 - Omni 物理]] 说明 [[PhysX]] 关节系统如何用约化坐标、根部链接、关节 DOFs、驱动器 envelope、关节摩擦、mimic 关节和 tendons 表达机器人机制。

在这些资产结构来源中，Isaac Sim 的关键工程判断是：机器人资产不是单个不可分割文件，而是一个由 USD 层、载荷、参考资料和变体组成的 composable 资产图结构。4.5 旧版布局使用 `asset_base.usd`、`parts.usd`、`asset_sim_optimized.usd` 和特征层；6.0 资产结构 3.0 进一步把几何、instances/colliders、机器人结构规范、中性物理和运行时特定的调优拆开。当前没有官方来源支持把 4.5 旧版布局称为 `Asset Structure 2.0`。

关节系统来源把一部分物理/控制讨论升级为有来源支持的：关节系统驱动器被明确描述为类似 PD 控制器，`DriveAPI.maxForce` 进入性能 envelope，`maxActuatorVelocity` 与 `maxJointVelocity` 有不同语义，mimic 柔顺性使用自然频率和 damping 比率，TGS 位置迭代会影响 compliant mimic 关节的有效的时间步。七自由度机械臂增益分组、MuJoCo 原始-gain 迁移边界等仍属于来自讨论的综合整理，见 [[isaac-sim-mujoco-control-tuning-notes]]。

碰撞近似来源把 Isaac Sim 的资产 / 物理边界具体化：视觉物体、动力学基元和网格 colliders 可以选择不同碰撞表示，而凸分解 / SDF 能捕捉更多细节但有性能影响。这个来源支持把碰撞体制作纳入 [[CollisionGeometryForRobotSimulation|碰撞 geometry]] 与 [[SimulationRealityGap|现实差距]] audit。

[[isaac-lab-repository|Isaac Lab 代码仓库]] 把 Isaac Sim 连接到机器人学习框架层：Isaac Lab built 在 NVIDIA Isaac Sim，用于强化学习、模仿学习、运动规划和仿真到现实迁移流程。README 还记录 Isaac Sim 版本依赖与专有的依赖边界，因此这个来源支持“Isaac Lab 是 Isaac Sim 上的 GPU 加速的机器人学研究框架”，但不支持把整套运行时技术栈简化为 permissive 开源。

相关页面：[[CollisionGeometryForRobotSimulation]]、[[IsaacSimLegacyAssetStructure]]、[[IsaacSimAssetStructure]]、[[ReducedCoordinateArticulations]]、[[PhysX]]、[[NVIDIA]]、[[IsaacLab]]、[[MuJoCo]]、[[SimulationRealityGap]]、[[isaac-sim-mujoco-control-tuning-notes]]。
