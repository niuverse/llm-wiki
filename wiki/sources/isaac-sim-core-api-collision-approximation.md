---
title: "Isaac Sim Core API Collision Approximation"
type: source
tags: [isaac-sim, physx, collision-detection, usd, simulation-assets]
sources: []
last_updated: 2026-07-13
source_file: raw/isaac-sim-core-api-collision-approximation.html
source_kind: html
source_url: https://docs.isaacsim.omniverse.nvidia.com/5.1.0/py/source/extensions/isaacsim.core.api/docs/index.html
extracted_text: graph/extracts/isaac-sim-core-api-collision-approximation.md
source_date: unknown
---

## 摘要

Isaac Sim Core API 文档中多个基元 / 网格类暴露 `get_collision_approximation` 与 `set_collision_approximation`，列出三角形网格、凸分解、凸包、包围球体、包围 cube、网格 simplification、SDF 和球体 fill 等碰撞近似模式。这个来源把 [[IsaacSim]] 中碰撞体制作的选项具体化：同一个视觉物体可以用不同碰撞体表示参与 PhysX 碰撞/接触 computation，且更精细的近似会带来性能成本。

来源网址: https://docs.isaacsim.omniverse.nvidia.com/5.1.0/py/source/extensions/isaacsim.core.api/docs/index.html

## 核心主张

- Isaac Sim API 明确区分视觉-仅基元和带碰撞体 API / 刚性机体 API 的动力学基元；视觉几何本身不等于物理碰撞几何。
- `collision_approximation` 支持的模式包括 `none` 三角形网格、`convexDecomposition`、`convexHull`、`boundingSphere`、`boundingCube`、`meshSimplification`、`sdf` 和 `sphereFill`。
- 文档建议使用凸分解或 SDF 来更好捕捉网格细节；同时警告这些方法有性能影响，因为计算成本更高。
- 接触偏移表示两个形状距离小于偏移和时会生成接触；rest 偏移表示物体 come 到 rest 的距离。这说明碰撞体表示还会和接触偏移 / rest 偏移共同决定实际接触生成。
- API 返回接触力数据时包含法向力、点、法向量和 separations；这些输出会被碰撞体近似的几何误差影响。

## 关键引文

- "Convex Decomposition or SDF"
- "performance impact"

## 关联

- [[CollisionGeometryForRobotSimulation]] - 基元、凸包、SDF、球体 fill 等碰撞体选择的统一解释。
- [[IsaacSimAssetStructure]] - 碰撞表示在资产结构 3.0 中属于共享实例/碰撞体制作层，而不是单独的运行时调优层。
- [[IsaacSim]] 与 [[PhysX]] - Isaac Sim / PhysX 上下文。
- [[SimulationRealityGap]] - 碰撞体近似误差如何成为仿真到现实迁移差距的上游因素。

## 开放问题

- Isaac Sim / PhysX 中各碰撞近似模式的具体 narrowphase 实现、GPU 支撑和关节系统约束需要进一步收录官方 PhysX / Isaac Sim 文档。
- `sphereFill` 与机器人学抓取 / 移动中的接触稳定性之间关系如何，当前文档只列出模式，没有提供基准。
- SDF 碰撞体的分辨率、内存成本、接触偏移和策略训练吞吐量需要更具体的来源。
