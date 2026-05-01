---
title: "Isaac Sim"
type: entity
tags: [robotics, simulation, nvidia, usd]
sources: ["[[isaac-sim-asset-structure]]"]
last_updated: 2026-05-01
---

# Isaac Sim

Isaac Sim 是 [[NVIDIA]] 的 robotics simulation stack。本 wiki 当前对 Isaac Sim 的 source-backed coverage 主要来自 [[isaac-sim-asset-structure|Asset Structure - Isaac Sim Documentation]]：Isaac Sim 6.0 Early Developer Release docs 说明 imported robot assets 会被组织成 geometry、materials、instances、physics、robot schema、engine-specific tuning 和 optional feature layers，并用 USD composition 组合成 final simulation asset。

在这个 source 中，Isaac Sim 的关键工程判断是：robot asset 不是单个不可分割文件，而是一个由 USD layers、payloads、references 和 variants 组成的 composable asset graph。这个判断直接影响 robot setup、runtime switching、control / ROS feature authoring，以及后续用 [[MuJoCo]]、PhysX 或 USD / Newton physics 运行同一个 asset 时的可维护性。

相关页面：[[IsaacSimAssetStructure]]、[[NVIDIA]]、[[MuJoCo]]、[[SimulationRealityGap]]。
