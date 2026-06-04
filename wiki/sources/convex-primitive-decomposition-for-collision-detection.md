---
title: "Convex Primitive Decomposition for Collision Detection"
type: source
tags: [collision-detection, convex-decomposition, primitives, game-physics, simulation-assets]
sources: []
last_updated: 2026-06-04
source_file: raw/convex-primitive-decomposition-for-collision-detection.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2602.03865
extracted_text: graph/extracts/convex-primitive-decomposition-for-collision-detection.md
source_date: unknown
---

## 摘要

Convex Primitive Decomposition for Collision Detection 提出自动把 mesh 拟合成一组 parametric convex primitives，例如 boxes、capsules、spheres、cylinders、frustums 和 trapezoidal prisms，而不是只输出 convex hull decomposition。论文的核心工程判断是：physics engines 对 primitive colliders 有深度优化，primitive collider 更容易被 artists / engineers 手工理解和编辑，因此在 tight runtime budgets 中可能比 hull-heavy ACD 更有价值。

Source URL: https://arxiv.org/abs/2602.03865

## 核心主张

- 单个 convex hull 或 hull decomposition 可以表达许多 shapes，但 convex hulls 在 runtime 和手工编辑上不一定是最好的 collision representation。
- Physics engines 通常为 boxes、capsules、spheres 等 primitives 提供高度优化的 narrowphase；primitive collider complexity 也更低，便于调试和修改。
- Paper 提出 bottom-up mesh simplification-inspired procedure，把 mesh clusters 拟合成 capped cylinders、capsules、spheres、oriented boxes、isosceles trapezoidal prisms、frustums 等 primitives。
- 在 60+ Sketchfab models 上，paper 报告该方法比 V-HACD / CoACD 获得更低 one-way Hausdorff / Chamfer error，并且 byte complexity 不到对比方法的三分之一。
- Rigid-body wall-clock benchmark 中，primitive decomposition 在作者测试的 24 个 models 上整体加快；paper 也明确 caveat performance 依赖 hardware 和 physics engine。
- 方法能直接处理 non-manifold / non-watertight game meshes，不要求先清理成 watertight manifold。

## 关键引文

- "primitive colliders"
- "less than one-third"

## 关联

- [[CollisionGeometryForRobotSimulation]] - primitives vs convex hulls / ACD 的 tradeoff。
- [[ApproximateConvexDecomposition]] - convex primitive decomposition 是 ACD 的一个 runtime-oriented branch。
- [[VHACD]] 与 [[CoACD]] - paper 对比对象。

## 开放问题

- Paper 主要面向 game / artistic assets；robotics 中 contact-rich manipulation 是否同样受益，需要按 grasping、locomotion、insertion 等任务重测。
- Primitive decomposition 可能牺牲局部细节；何时该混合 primitives 与 convex hulls 或 SDF，仍是 practical open question。
- Performance 依赖 engine；需要 Isaac Sim / PhysX、MuJoCo、Bullet、Drake 等 engine-specific benchmark 才能给 robotics workflow 下结论。
