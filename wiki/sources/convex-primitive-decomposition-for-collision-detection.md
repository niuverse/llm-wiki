---
title: "Convex Primitive Decomposition for Collision Detection"
type: source
tags: [collision-detection, convex-decomposition, primitives, game-physics, simulation-assets]
sources: []
last_updated: 2026-07-13
source_file: raw/convex-primitive-decomposition-for-collision-detection.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2602.03865
extracted_text: graph/extracts/convex-primitive-decomposition-for-collision-detection.md
source_date: unknown
---

## 摘要

凸基元分解用于碰撞检测提出自动把网格拟合成一组 parametric 凸基元，例如盒体、胶囊体、球体、圆柱体、frustums 和 trapezoidal prisms，而不是只输出凸包分解。论文的核心工程判断是：物理引擎对基元碰撞体有深度优化，基元碰撞体更容易被 artists / engineers 手工理解和编辑，因此在 tight 运行时 budgets 中可能比凸包-密集型 ACD 更有价值。

来源网址: https://arxiv.org/abs/2602.03865

## 核心主张

- 单个凸包或凸包分解可以表达许多形状，但凸包在运行时和手工编辑上不一定是最好的碰撞表示。
- 物理引擎通常为盒体、胶囊体、球体等基元提供高度优化的 narrowphase；基元碰撞体复杂度也更低，便于调试和修改。
- 论文提出一种受网格简化启发的自底向上流程，把网格簇拟合成封顶圆柱体、胶囊体、球体、定向盒、等腰梯形棱柱和截锥体等基元。
- 在 60+ Sketchfab 模型上，论文报告该方法比 V-HACD / CoACD 获得更低 one-way Hausdorff / Chamfer 错误，并且字节复杂度不到对比方法的三分之一。
- 刚性机体实际运行时间基准中，基元分解在作者测试的 24 个模型上整体加快；论文也明确 caveat 性能依赖硬件和物理引擎。
- 方法能直接处理非流形或非水密的游戏网格，不要求先清理成水密流形。

## 关键引文

- "primitive colliders"
- "less than one-third"

## 关联

- [[CollisionGeometryForRobotSimulation]] - 基元与凸包 / ACD 的取舍。
- [[ApproximateConvexDecomposition]] - 凸基元分解是 ACD 的一个面向运行时的分支。
- [[VHACD]] 与 [[CoACD]] - 论文对比对象。

## 开放问题

- 论文主要面向 game / artistic 资产；机器人学中接触丰富操作是否同样受益，需要按抓取、移动、插入等任务重测。
- 基元分解可能牺牲局部细节；何时该混合基元与凸包或 SDF，仍是实用的开放问题。
- 性能依赖引擎；需要 Isaac Sim / PhysX、MuJoCo、Bullet、Drake 等引擎特定的基准才能给机器人学工作流下结论。
