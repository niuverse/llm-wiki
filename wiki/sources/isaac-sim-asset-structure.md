---
title: "Asset Structure - Isaac Sim Documentation"
type: source
tags: [isaac-sim, usd, asset-structure, robot-setup]
sources: []
last_updated: 2026-05-01
source_file: raw/isaac-sim-6-asset-structure.html
source_kind: html
source_url: https://docs.isaacsim.omniverse.nvidia.com/6.0.0/robot_setup/asset_structure.html
extracted_text: graph/extracts/isaac-sim-6-asset-structure.md
source_date: 2026-03-18
---

# Asset Structure - Isaac Sim Documentation

## 摘要

这是 [[NVIDIA]] Isaac Sim 6.0 documentation 中的 Robot Setup / Asset Structure 页面，说明 imported robot assets 如何按 USD components 分层组织，以便 review、reuse、simulation 和 multi-runtime tuning。页面本身标注为 Isaac Sim 6.0 Early Developer Release，且说明该版本文档 incomplete；因此本页应视为 Isaac Sim 6.0 EDR / USD Asset Structure 3.0 的官方设计意图，而不是 GA release 行为的最终保证。

核心思想是把一个 robot asset 拆成 source/geometry/material/instance/physics/robot/schema/control/ROS/end-effector 等职责明确的 USD layers，再用 sublayers、references、payloads 和 variants 组合成最终可加载 asset。这个结构服务两个目标：一是让原始 imported source 可以保持不变并可重新导入；二是让 [[MuJoCo]]、PhysX、USD / Newton 等 runtime-specific physics tuning 不互相污染。

## 核心主张

- Imported assets 被组织成多个 components，例如 geometries、materials、instances、physics 和 robot；这种拆分让 asset 更容易管理、复用和仿真。
- Asset Source 阶段通常包括 `base.usda`、`geometries.usdc`、`instances.usda`、`materials.usda`、`physics.usd`、`mujoco.usda`、`physx.usda` 和 `robot.usda`。
- `geometries.usdc` 应只放 mesh topology / vertex data；`materials.usda` 放 material prims 和 shader bindings；`instances.usda` 把 geometry、materials 和 colliders 组合成 visual / collision meshes。
- `physics.usda` 或 `physics.usd` 表示 neutral USD / Newton physics layer；`mujoco.usda` 和 `physx.usda` 分别承载 engine-specific attributes 和 tuning。
- Source assets 应保持 unchanged，便于 re-import；当 source hierarchy 不适合 simulation 时，Transformation 阶段会 flatten nested rigid bodies、整理 visuals/colliders，并把 meshes 做 instancing-friendly optimization。
- Features 是叠加在 transformed asset 上的 lightweight layers，例如 physics setup、sensor configuration、control graphs、ROS integration 和 gripper stacks。
- Adding/modifying feature 的 workflow 是：把 optimized asset 作为 temporary sub-layer 引入 feature stage，author feature 后保存前断开 sub-layer，再把 feature 作为 payload 加入 final asset；variants 可用于 runtime feature switching。
- Robot Schema 被描述为与 simulation asset structure 解耦的 robot structure description，并且必须作为 sublayer 包含在 robot asset 中。

## 关键引文

- “source assets must remain unchanged”
- “Isolate attributes for different physics engines”
- “Use of layers, payloads, and variants”
- “final composed asset is represented in the `asset.usd` file”
- “mirrors USD Asset Structure 3.0 guidance”

## 关联

- [[IsaacSimAssetStructure]] - 把本 source 编译成 Asset Structure 3.0 的学习页和实践检查表。
- [[IsaacSim]] - 本 source 对 Isaac Sim 6.0 EDR robot asset organization 的描述。
- [[NVIDIA]] - source publisher 与 Isaac Sim documentation owner。
- [[MuJoCo]] - 本 source 将 MuJoCo-specific tuning 隔离到 `mujoco.usda` layer。
- [[SimulationRealityGap]] - multi-runtime asset structure 能减少 authoring clash，但不能单独证明 physics runtime 与真实机器人一致。

## 开放问题

- Source 在不同段落中同时使用 `physics.usd` 与 `physics.usda`，以及 `asset.usd` 与 `interface.usda` 两种 final-entry naming；学习时应先抓住 layer role，再在具体 Isaac Sim build / importer output 中确认实际 file names。
- 页面属于 Isaac Sim 6.0 Early Developer Release 文档；GA release 后需要复查 docs、importer output 和 Asset Transformer behavior 是否发生变化。
- 本 source 给出 structure 和 workflow，但没有提供完整 validation checklist；后续可 ingest Robot Schema、Asset Transformer Rules Reference、Asset Validation 和 Instanceable Assets docs 来补齐。
