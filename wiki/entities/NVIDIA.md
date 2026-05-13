---
title: "NVIDIA"
type: entity
tags: [organization, robotics, simulation]
sources: ["[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]", "[[isaac-sim-45-asset-structure]]", "[[isaac-sim-asset-structure]]", "[[omniverse-omni-physics-articulations]]", "[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation]]"]
last_updated: 2026-05-13
---

# NVIDIA

NVIDIA 是 [[RoboLab]] paper/project/repository 的发布机构，也是 [[isaac-sim-45-asset-structure|Isaac Sim 4.5 Asset Structure]]、[[isaac-sim-asset-structure|Isaac Sim 6.0 Asset Structure]] 与 [[omniverse-omni-physics-articulations|Articulations - Omni Physics]] 的 publisher。RoboLab source 中相关的技术上下文是 NVIDIA Isaac Lab、Isaac Sim、Omniverse EULA、NVlabs GitHub organization，以及 Simulation and Robotics Lab project page；Isaac Sim 4.5 Asset Structure source 描述 legacy / pre-3.0 robot asset layout；Isaac Sim 6.0 Asset Structure source 把 robot asset organization 写成 geometry/material/instance/physics/runtime/schema/feature layers；Omni Physics Articulations source 则把 [[PhysX]] reduced-coordinate articulation、drive envelope、joint friction、mimic joints 和 tendons 写成 official documentation。[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation|VIRAL project page]] 进一步把 NVlabs `GR00T-VisualSim2Real` code repository 作为 associated implementation link。这里的 entity page 只记录与本 wiki sources 相关的信息，不扩展到 NVIDIA 的 broader corporate history。

## 关联

- [[RoboLab]] - NVIDIA 发布的 high-fidelity simulation benchmark for task-generalist robot policies。
- [[nvlabs-robolab]] - NVlabs official implementation repository。
- [[IsaacSim]] - NVIDIA robotics simulation stack；当前 source-backed coverage 包括 legacy / pre-3.0 asset structure、Asset Structure 3.0 与 Omni Physics articulations。
- [[PhysX]] - NVIDIA physics runtime / SDK family；当前 wiki coverage 聚焦 articulation semantics。
- [[SimulationRealityGap]] - RoboLab 使用 NVIDIA simulation stack 作为分析 real-world policies 的 diagnostic proxy。
- [[VIRAL]] - source page links to an NVlabs code repository for visual sim-to-real humanoid loco-manipulation。
