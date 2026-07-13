---
title: "DCOL: Differentiable Collision Detection for a Set of Convex Primitives"
type: source
tags: [collision-detection, differentiable-optimization, convex-primitives, robotics]
sources: []
last_updated: 2026-07-13
source_file: raw/dcol-differentiable-collision-detection-for-a-set-of-convex-primitives.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2207.00669
extracted_text: graph/extracts/dcol-differentiable-collision-detection-for-a-set-of-convex-primitives.md
source_date: 2023-05-18
---

## 摘要

DCOL 提出一种可微碰撞检测方法用于 sets 的凸基元。与 GJK、MPR、EPA、FCL 这类成熟但包含 branching / pivoting 的碰撞 algorithms 不同，DCOL 把碰撞检测写成凸优化问题：求使两基元相交所需的最小均匀扩展。这个表述同时给出碰撞指标、接触点和配置梯度，面向轨迹优化与可微的接触物理。

来源网址: https://arxiv.org/abs/2207.00669

## 核心主张

- DCOL 支持 polytopes、胶囊体、圆柱体、cones、ellipsoids 和带填充的多边形六类凸基元。
- 核心指标是最小扩展因素 $\alpha$：$\alpha>1$ 表示分离，$\alpha=1$ 表示接触，$\alpha<1$ 表示相互穿透。
- 碰撞 avoidance 可以写成轨迹优化约束，例如对每个基元配对保持 $\alpha_k(q)\ge 1$。
- DCOL 使用可微的凸优化和 custom primal-dual interior-点 conic 求解器，计算指标和接触点对配置的 derivatives。
- 论文展示了 piano mover、quadrotor、锥体-through-孔等轨迹优化示例，并把可微碰撞约束嵌入互补风格接触时间步进。
- 论文把未来工作指向将方法纳入现有物理引擎，以及为复杂形状做适合可微碰撞的凸分解。

## 关键引文

- "minimum uniform scaling"
- "differentiable collision detection"

## 关联

- [[DifferentiableCollisionDetection]] - DCOL 的数学结构和优化含义。
- [[CollisionGeometryForRobotSimulation]] - 凸基元表示如何服务优化。
- [[DifferentiablePhysics]] - 可微碰撞查询与可微的仿真的关系。
- [[DCOL]] - 实体页面。

## 开放问题

- DCOL 的梯度来自碰撞指标 surrogate；它如何与完整刚性接触求解器、摩擦和时间-stepping 耦合一起保持物理一致，还需要更多引擎集成证据。
- 复杂机器人/物体网格如何自动分解成 DCOL-友好的基元，是论文也明确提出的后续问题。
