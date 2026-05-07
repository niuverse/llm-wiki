---
title: "Isaac Sim"
type: entity
tags: [robotics, simulation, nvidia, usd, physx]
sources: ["[[isaac-sim-45-asset-structure]]", "[[isaac-sim-asset-structure]]", "[[omniverse-omni-physics-articulations]]"]
last_updated: 2026-05-07
---

# Isaac Sim

Isaac Sim 是 [[NVIDIA]] 的 robotics simulation stack。本 wiki 当前对 Isaac Sim 的 source-backed coverage 来自三类官方 docs：[[isaac-sim-45-asset-structure|Isaac Sim 4.5 Asset Structure]] 说明 legacy / pre-3.0 asset layout；[[isaac-sim-asset-structure|Isaac Sim 6.0 Asset Structure]] 说明 imported robot assets 会被组织成 geometry、materials、instances、physics、robot schema、engine-specific tuning 和 optional feature layers；[[omniverse-omni-physics-articulations|Articulations - Omni Physics]] 说明 [[PhysX]] articulation 如何用 reduced coordinates、root link、joint DOFs、drive envelope、joint friction、mimic joints 和 tendons 表达 robot mechanisms。

在这些 asset-structure sources 中，Isaac Sim 的关键工程判断是：robot asset 不是单个不可分割文件，而是一个由 USD layers、payloads、references 和 variants 组成的 composable asset graph。4.5 legacy layout 使用 `asset_base.usd`、`parts.usd`、`asset_sim_optimized.usd` 和 feature layers；6.0 Asset Structure 3.0 进一步把 geometry、instances/colliders、Robot Schema、neutral physics 和 runtime-specific tuning 拆开。当前没有 official source 支持把 4.5 legacy layout 称为 `Asset Structure 2.0`。

Articulations source 把一部分 physics/control 讨论升级为 source-backed：articulation drive 被明确描述为 analogous to a PD controller，`DriveAPI.maxForce` 进入 performance envelope，`maxActuatorVelocity` 与 `maxJointVelocity` 有不同语义，mimic compliance 使用 natural frequency 和 damping ratio，TGS position iterations 会影响 compliant mimic joint 的 effective timestep。七自由度机械臂 gain grouping、MuJoCo raw-gain 迁移边界等仍属于 conversation-derived synthesis，见 [[isaac-sim-mujoco-control-tuning-notes]]。

相关页面：[[IsaacSimLegacyAssetStructure]]、[[IsaacSimAssetStructure]]、[[ReducedCoordinateArticulations]]、[[PhysX]]、[[NVIDIA]]、[[MuJoCo]]、[[SimulationRealityGap]]、[[isaac-sim-mujoco-control-tuning-notes]]。
