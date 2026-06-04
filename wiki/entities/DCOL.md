---
title: "DCOL"
type: entity
tags: [collision-detection, differentiable-optimization, robotics]
sources: ["[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]"]
last_updated: 2026-06-04
---

# DCOL

DCOL 是 Differentiable Collision Detection for a Set of Convex Primitives。它把 collision detection formulation 从 branching-heavy geometric algorithms 转换成 convex optimization problem：求两 convex primitives 相交所需的 minimum uniform scaling factor $\alpha$。若 $\alpha>1$，objects separated；若 $\alpha<1$，objects interpenetrating。

[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|DCOL paper]] 支持 polytopes、capsules、cylinders、cones、ellipsoids 和 padded polygons，并通过 differentiable conic optimization 返回 collision metric、contact points 和 gradients。它的主要 application 是 trajectory optimization collision constraints 和 differentiable contact physics experiments。

在当前 wiki 中，DCOL 连接了 [[CollisionGeometryForRobotSimulation|collider representation]] 与 [[DifferentiableCollisionDetection|differentiable collision detection]]：复杂 assets 若要进入 gradient-based planning，往往需要先被表示成一组 optimization-friendly convex primitives。

相关页面：[[DifferentiableCollisionDetection]]、[[DifferentiablePhysics]]、[[CollisionGeometryForRobotSimulation]]、[[DiffPills]]。
