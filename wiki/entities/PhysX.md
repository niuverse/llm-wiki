---
title: "PhysX"
type: entity
tags: [physics-engine, robotics, simulation, nvidia]
sources: ["[[omniverse-omni-physics-articulations]]"]
last_updated: 2026-07-13
---

# PhysX

PhysX 是 [[NVIDIA]] 的物理运行时 / SDK 族。本知识库当前对 PhysX 的有来源支持的覆盖范围来自 [[omniverse-omni-physics-articulations|关节系统 - Omni 物理]]：该来源说明 PhysX 用约化坐标关节系统表达 jointed 机制，并把机器人 / 机制状态组织成根部机体 + 关节 DOFs，而不是每个链接的独立世界位姿。

在这个来源中，PhysX 的关键机器人学语义包括：关节系统拓扑由 USD 关节的 `Body 0` / `Body 1` 关系决定；`UsdPhysics.ArticulationRootAPI` 控制固定基座或 floating-基座关节系统创建；关节系统驱动器是 per-轴类 PD 驱动器；`PhysxDrivePerformanceEnvelopeAPI` 用作用力 / 速度约束表达执行器可行区域；关节摩擦、mimic 关节、mimic 柔顺性和 tendons 都作为关节系统特定的约束暴露。

需要注意证据边界：本页不扩展到 PhysX SDK 的完整接触求解器、GPU 流程或所有关节支持细节。当前只记录 Omni 物理关节系统来源已明确覆盖的关节系统语义；TGS/PGS 默认值、驱动器离散化、稳定性-指南细节和更广泛的 PhysX SDK 行为仍需要后续收录。

相关页面：[[ReducedCoordinateArticulations]]、[[IsaacSim]]、[[NVIDIA]]、[[ContactSolvers]]、[[SimulationRealityGap]]。
