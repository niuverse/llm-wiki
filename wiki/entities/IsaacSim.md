---
title: "Isaac Sim"
type: entity
tags: [robotics, simulation, nvidia, usd, physx]
sources: ["[[isaac-sim-asset-structure]]", "[[omniverse-omni-physics-articulations]]"]
last_updated: 2026-05-04
---

# Isaac Sim

Isaac Sim 是 [[NVIDIA]] 的 robotics simulation stack。本 wiki 当前对 Isaac Sim 的 source-backed coverage 来自两类官方 docs：[[isaac-sim-asset-structure|Asset Structure - Isaac Sim Documentation]] 说明 imported robot assets 会被组织成 geometry、materials、instances、physics、robot schema、engine-specific tuning 和 optional feature layers；[[omniverse-omni-physics-articulations|Articulations - Omni Physics]] 说明 [[PhysX]] articulation 如何用 reduced coordinates、root link、joint DOFs、drive envelope、joint friction、mimic joints 和 tendons 表达 robot mechanisms。

在这个 source 中，Isaac Sim 的关键工程判断是：robot asset 不是单个不可分割文件，而是一个由 USD layers、payloads、references 和 variants 组成的 composable asset graph。这个判断直接影响 robot setup、runtime switching、control / ROS feature authoring，以及后续用 [[MuJoCo]]、PhysX 或 USD / Newton physics 运行同一个 asset 时的可维护性。

Articulations source 把一部分 physics/control 讨论升级为 source-backed：articulation drive 被明确描述为 analogous to a PD controller，`DriveAPI.maxForce` 进入 performance envelope，`maxActuatorVelocity` 与 `maxJointVelocity` 有不同语义，mimic compliance 使用 natural frequency 和 damping ratio，TGS position iterations 会影响 compliant mimic joint 的 effective timestep。七自由度机械臂 gain grouping、MuJoCo raw-gain 迁移边界等仍属于 conversation-derived synthesis，见 [[isaac-sim-mujoco-control-tuning-notes]]。

相关页面：[[IsaacSimAssetStructure]]、[[ReducedCoordinateArticulations]]、[[PhysX]]、[[NVIDIA]]、[[MuJoCo]]、[[SimulationRealityGap]]、[[isaac-sim-mujoco-control-tuning-notes]]。
