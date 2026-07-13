---
title: "DiffPills"
type: entity
tags: [collision-detection, differentiable-optimization, capsules, robotics]
sources: ["[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons]]"]
last_updated: 2026-07-13
---

# DiffPills

DiffPills 是可微碰撞检测用于胶囊体与带填充的多边形。它用可微凸 quadratic programs 计算胶囊体 / 带填充的多边形之间的邻近度价值 $\phi$ 和 closest 点，使碰撞 avoidance 约束可以进入基于梯度的轨迹优化。

[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons|DiffPills 论文]] 把 $\phi>0$ 解释为分离，$\phi<0$ 解释为碰撞，并展示了把汽车表示为胶囊体的轨迹优化示例。它可以看作 [[DCOL]] 的前身：基元族更窄，但已经体现了把机器人与障碍物几何分解为简单凸基元以获得碰撞梯度的思路。

当前知识库中，DiffPills 的主要价值是补充胶囊体碰撞体的优化角色。胶囊体不只是快速运行时基元，也可以是可微碰撞约束的基本 building block。

相关页面：[[DifferentiableCollisionDetection]]、[[CollisionGeometryForRobotSimulation]]、[[DifferentiablePhysics]]、[[DCOL]]。
