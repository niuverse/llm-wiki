---
title: "PhysX"
type: entity
tags: [physics-engine, robotics, simulation, nvidia]
sources: ["[[omniverse-omni-physics-articulations]]"]
last_updated: 2026-05-04
---

# PhysX

PhysX 是 [[NVIDIA]] 的 physics runtime / SDK family。本 wiki 当前对 PhysX 的 source-backed coverage 来自 [[omniverse-omni-physics-articulations|Articulations - Omni Physics]]：该 source 说明 PhysX 用 reduced-coordinate articulations 表达 jointed mechanisms，并把 robot / mechanism state 组织成 root body + joint DOFs，而不是每个 link 的 independent world pose。

在这个 source 中，PhysX 的关键 robotics semantics 包括：articulation topology 由 USD joints 的 `Body 0` / `Body 1` relationships 决定；`UsdPhysics.ArticulationRootAPI` 控制 fixed-base 或 floating-base articulation creation；articulation drives 是 per-axis PD-like drives；`PhysxDrivePerformanceEnvelopeAPI` 用 effort / velocity constraints 表达 actuator feasible region；joint friction、mimic joints、mimic compliance 和 tendons 都作为 articulation-specific constraints 暴露。

需要注意 evidence boundary：本页不扩展到 PhysX SDK 的完整 contact solver、GPU pipeline 或所有 joint support details。当前只记录 Omni Physics Articulations source 已明确覆盖的 articulation semantics；TGS/PGS defaults、drive discretization、stability-guide details 和 broader PhysX SDK behavior 仍需要后续 ingest。

相关页面：[[ReducedCoordinateArticulations]]、[[IsaacSim]]、[[NVIDIA]]、[[ContactSolvers]]、[[SimulationRealityGap]]。
