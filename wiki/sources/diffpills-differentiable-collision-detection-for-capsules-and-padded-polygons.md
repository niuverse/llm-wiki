---
title: "DiffPills: Differentiable Collision Detection for Capsules and Padded Polygons"
type: source
tags: [collision-detection, differentiable-optimization, robotics, source-backed]
sources: []
modified: 2026-09-25
source_file: raw/diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2207.00670
extracted_text: graph/extracts/diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons.md
source_date: 2022-07-01
---

## 摘要

DiffPills 提出胶囊体和带填充的多边形之间的可微碰撞检测，用可微的凸 quadratic programs 返回邻近度价值和 closest 点。它可以看作 [[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|DCOL]] 更早、更窄的 precursor：强调把机器人 / obstacle 几何分解成简单凸基元后，碰撞约束可以进入基于梯度的轨迹优化、状态估计和 RL 流程。

来源网址: https://arxiv.org/abs/2207.00670

## 核心主张

- DiffPills 支持胶囊体与带填充的多边形；arbitrary 非凸几何可以先分解成这些基元的采集。
- 邻近度价值 $\phi$ 为 positive 时无碰撞，为 negative 时碰撞；轨迹优化可用 $\phi\ge 0$ 表达碰撞 avoidance。
- 算法通过可微的凸 quadratic programs 计算邻近度和 closest 点，并对物体位置 / orientations 可微。
- 论文展示了把汽车表示为胶囊体、避让静止汽车与公交车的轨迹优化示例，并使用 ALTRO 优化器。
- Open-来源 Julia 实现为 `DiffPills.jl`。

## 关键引文

- "capsules and padded polygons"
- "proximity value"

### DiffPills

DiffPills 是可微碰撞检测用于胶囊体与带填充的多边形。它用可微凸 quadratic programs 计算胶囊体 / 带填充的多边形之间的邻近度价值 $\phi$ 和 closest 点，使碰撞 avoidance 约束可以进入基于梯度的轨迹优化。

[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons|DiffPills 论文]] 把 $\phi>0$ 解释为分离，$\phi<0$ 解释为碰撞，并展示了把汽车表示为胶囊体的轨迹优化示例。它可以看作 [[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|DCOL]] 的前身：基元族更窄，但已经体现了把机器人与障碍物几何分解为简单凸基元以获得碰撞梯度的思路。

当前知识库中，DiffPills 的主要价值是补充胶囊体碰撞体的优化角色。胶囊体不只是快速运行时基元，也可以是可微碰撞约束的基本 building block。

## 关联

- [[DifferentiableCollisionDetection]] - DiffPills 的邻近度表述。
- [[CollisionGeometryForRobotSimulation]] - 胶囊体 / 带填充的多边形基元的建模意义。
- [[DifferentiablePhysics]] - 碰撞梯度如何进入优化。
- [[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons|DiffPills]] - 实体页面。
- [[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|DCOL]] - 后续更一般的凸基元方法。

## 开放问题

- DiffPills 的基元集合更窄；在 3D 接触丰富操作中是否足够，需要结合 DCOL 或凸分解扩展。
- 论文主要展示轨迹优化示例；和完整接触动力学 / 摩擦仿真的集成仍是后续问题。
