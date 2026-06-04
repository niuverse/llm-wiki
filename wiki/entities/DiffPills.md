---
title: "DiffPills"
type: entity
tags: [collision-detection, differentiable-optimization, capsules, robotics]
sources: ["[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons]]"]
last_updated: 2026-06-04
---

# DiffPills

DiffPills 是 Differentiable Collision Detection for Capsules and Padded Polygons。它用 differentiable convex quadratic programs 计算 capsules / padded polygons 之间的 proximity value $\phi$ 和 closest points，使 collision avoidance constraints 可以进入 gradient-based trajectory optimization。

[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons|DiffPills paper]] 把 $\phi>0$ 解释为 separation，$\phi<0$ 解释为 collision，并展示了 car-as-capsule 的 trajectory optimization demo。它可以看作 [[DCOL]] 的 precursor：primitive family 更窄，但已经体现了把 robot / obstacle geometry 分解为 simple convex primitives 以获得 collision gradients 的思路。

当前 wiki 中，DiffPills 的主要价值是补充 capsule collider 的 optimization role。Capsule 不只是 fast runtime primitive，也可以是 differentiable collision constraint 的基本 building block。

相关页面：[[DifferentiableCollisionDetection]]、[[CollisionGeometryForRobotSimulation]]、[[DifferentiablePhysics]]、[[DCOL]]。
