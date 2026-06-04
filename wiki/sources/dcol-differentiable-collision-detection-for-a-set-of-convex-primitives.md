---
title: "DCOL: Differentiable Collision Detection for a Set of Convex Primitives"
type: source
tags: [collision-detection, differentiable-optimization, convex-primitives, robotics]
sources: []
last_updated: 2026-06-04
source_file: raw/dcol-differentiable-collision-detection-for-a-set-of-convex-primitives.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2207.00669
extracted_text: graph/extracts/dcol-differentiable-collision-detection-for-a-set-of-convex-primitives.md
source_date: 2023-05-18
---

## 摘要

DCOL 提出一种 differentiable collision detection method for sets of convex primitives。与 GJK、MPR、EPA、FCL 这类成熟但包含 branching / pivoting 的 collision algorithms 不同，DCOL 把 collision detection 写成 convex optimization problem：求使两 primitives 相交所需的最小 uniform scaling。这个 formulation 同时给出 collision metric、contact points 和 configuration gradients，面向 trajectory optimization 与 differentiable contact physics。

Source URL: https://arxiv.org/abs/2207.00669

## 核心主张

- DCOL 支持 polytopes、capsules、cylinders、cones、ellipsoids 和 padded polygons 六类 convex primitives。
- 核心 metric 是 minimum scaling factor $\alpha$：$\alpha>1$ 表示 separated，$\alpha=1$ 表示 touching，$\alpha<1$ 表示 interpenetration。
- Collision avoidance 可以写成 trajectory optimization constraints，例如对每个 primitive pair 保持 $\alpha_k(q)\ge 1$。
- DCOL 使用 differentiable convex optimization 和 custom primal-dual interior-point conic solver，计算 metric 和 contact points 对 configuration 的 derivatives。
- Paper 展示了 piano mover、quadrotor、cone-through-hole 等 trajectory optimization examples，并把 differentiable collision constraints 嵌入 complementarity-style contact time stepping。
- Paper 把 future work 指向将方法纳入现有 physics engines，以及为复杂 shapes 做适合 differentiable collision 的 convex decomposition。

## 关键引文

- "minimum uniform scaling"
- "differentiable collision detection"

## 关联

- [[DifferentiableCollisionDetection]] - DCOL 的数学结构和优化含义。
- [[CollisionGeometryForRobotSimulation]] - convex primitive representation 如何服务 optimization。
- [[DifferentiablePhysics]] - differentiable collision query 与 differentiable simulation 的关系。
- [[DCOL]] - entity page。

## 开放问题

- DCOL 的 gradients 来自 collision metric surrogate；它如何与 full rigid-contact solver、friction 和 time-stepping coupling 一起保持物理一致，还需要更多 engine integration evidence。
- 复杂 robot/object meshes 如何自动分解成 DCOL-friendly primitives，是 paper 也明确提出的后续问题。
