---
title: "DCOL"
type: entity
tags: [collision-detection, differentiable-optimization, robotics]
sources: ["[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]"]
last_updated: 2026-07-13
---

# DCOL

DCOL 是用于一组凸基元的可微碰撞检测方法。它把包含大量分支的几何碰撞算法转换成凸优化问题：求两个凸基元相交所需的最小均匀尺度扩展因子 $\alpha$。若 $\alpha>1$，物体分离；若 $\alpha<1$，物体相互穿透。

[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|DCOL 论文]] 支持 polytopes、胶囊体、圆柱体、cones、ellipsoids 和带填充的多边形，并通过可微 conic 优化返回碰撞指标、接触点和梯度。它的主要 application 是轨迹优化碰撞约束和可微接触物理实验。

在当前知识库中，DCOL 连接了 [[CollisionGeometryForRobotSimulation|collider representation]] 与 [[DifferentiableCollisionDetection|可微碰撞检测]]：复杂资产若要进入基于梯度的规划，往往需要先被表示成一组优化友好的凸基元。

相关页面：[[DifferentiableCollisionDetection]]、[[DifferentiablePhysics]]、[[CollisionGeometryForRobotSimulation]]、[[DiffPills]]。
