---
title: "DiffPills: Differentiable Collision Detection for Capsules and Padded Polygons"
type: source
tags: [collision-detection, differentiable-optimization, capsules, robotics]
sources: []
last_updated: 2026-06-04
source_file: raw/diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2207.00670
extracted_text: graph/extracts/diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons.md
source_date: 2022-07-01
---

## 摘要

DiffPills 提出 capsules 和 padded polygons 之间的 differentiable collision detection，用 differentiable convex quadratic programs 返回 proximity value 和 closest points。它可以看作 [[DCOL]] 更早、更窄的 precursor：强调把 robot / obstacle geometry 分解成简单 convex primitives 后，collision constraints 可以进入 gradient-based trajectory optimization、state estimation 和 RL pipelines。

Source URL: https://arxiv.org/abs/2207.00670

## 核心主张

- DiffPills 支持 capsules 与 padded polygons；arbitrary non-convex geometry 可以先分解成这些 primitives 的 collection。
- Proximity value $\phi$ 为 positive 时无 collision，为 negative 时 collision；trajectory optimization 可用 $\phi\ge 0$ 表达 collision avoidance。
- 算法通过 differentiable convex quadratic programs 计算 proximity 和 closest points，并对 object positions / orientations 可微。
- Paper 展示了 car-as-capsule avoiding stationary car / bus 的 trajectory optimization demo，并使用 ALTRO optimizer。
- Open-source Julia implementation 为 `DiffPills.jl`。

## 关键引文

- "capsules and padded polygons"
- "proximity value"

## 关联

- [[DifferentiableCollisionDetection]] - DiffPills 的 proximity formulation。
- [[CollisionGeometryForRobotSimulation]] - capsule / padded polygon primitives 的建模意义。
- [[DifferentiablePhysics]] - collision gradients 如何进入 optimization。
- [[DiffPills]] - entity page。
- [[DCOL]] - 后续更一般的 convex primitive method。

## 开放问题

- DiffPills 的 primitive set 更窄；在 3D contact-rich manipulation 中是否足够，需要结合 DCOL 或 convex decomposition 扩展。
- Paper 主要展示 trajectory optimization examples；和 full contact dynamics / frictional simulation 的 integration 仍是后续问题。
