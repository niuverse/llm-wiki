---
title: "Isaac Sim Core API Collision Approximation"
type: source
tags: [isaac-sim, physx, collision-detection, usd, simulation-assets]
sources: []
last_updated: 2026-06-04
source_file: raw/isaac-sim-core-api-collision-approximation.html
source_kind: html
source_url: https://docs.isaacsim.omniverse.nvidia.com/5.1.0/py/source/extensions/isaacsim.core.api/docs/index.html
extracted_text: graph/extracts/isaac-sim-core-api-collision-approximation.md
source_date: unknown
---

## 摘要

Isaac Sim Core API docs 中多个 primitive / mesh classes 暴露 `get_collision_approximation` 与 `set_collision_approximation`，列出 triangle mesh、convex decomposition、convex hull、bounding sphere、bounding cube、mesh simplification、SDF 和 sphere fill 等 collision approximation modes。这个 source 把 [[IsaacSim]] 中 collider authoring 的选项具体化：同一个 visual object 可以用不同 collider representation 参与 PhysX collision/contact computation，且更精细的 approximation 会带来 performance cost。

Source URL: https://docs.isaacsim.omniverse.nvidia.com/5.1.0/py/source/extensions/isaacsim.core.api/docs/index.html

## 核心主张

- Isaac Sim API 明确区分 visual-only primitives 和带 Collider API / Rigid Body API 的 dynamic primitives；visual geometry 本身不等于 physical collision geometry。
- `collision_approximation` 支持的 modes 包括 `none` triangle mesh、`convexDecomposition`、`convexHull`、`boundingSphere`、`boundingCube`、`meshSimplification`、`sdf` 和 `sphereFill`。
- Docs 建议使用 Convex Decomposition 或 SDF 来更好捕捉 mesh details；同时警告这些方法有 performance impact，因为计算成本更高。
- Contact offset 表示两个 shape 距离小于 offset 和时会生成 contacts；rest offset 表示 objects come to rest 的距离。这说明 collider representation 还会和 contact offset / rest offset 共同决定实际接触生成。
- API 返回 contact force data 时包含 normal forces、points、normals 和 separations；这些输出会被 collider approximation 的几何误差影响。

## 关键引文

- "Convex Decomposition or SDF"
- "performance impact"

## 关联

- [[CollisionGeometryForRobotSimulation]] - primitive、convex hull、SDF、sphere fill 等 collider choice 的统一解释。
- [[IsaacSimAssetStructure]] - collision representation 在 Asset Structure 3.0 中属于 shared instance/collider authoring 层，而不是单独的 runtime tuning layer。
- [[IsaacSim]] 与 [[PhysX]] - Isaac Sim / PhysX context。
- [[SimulationRealityGap]] - collider approximation 误差如何成为 sim-to-real gap 的上游因素。

## 开放问题

- Isaac Sim / PhysX 中各 collision approximation mode 的具体 narrowphase implementation、GPU support 和 articulation constraints 需要进一步 ingest official PhysX / Isaac Sim docs。
- `sphereFill` 与 robotics grasping / locomotion 中的 contact stability 之间关系如何，当前 docs 只列出 mode，没有提供 benchmark。
- SDF collider 的 resolution、memory cost、contact offset 和 policy training throughput 需要更具体的 source。
