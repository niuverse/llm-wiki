---
title: "V-HACD"
type: entity
tags: [collision-detection, convex-decomposition, simulation-assets]
sources: ["[[v-hacd-repository]]", "[[coacd-approximate-convex-decomposition]]", "[[convex-primitive-decomposition-for-collision-detection]]", "[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]"]
last_updated: 2026-06-04
---

# V-HACD

V-HACD 是 Voxelized Hierarchical Approximate Convex Decomposition 的 repository / method family，用于把 concave 3D surfaces 分解成 near-convex parts。[[v-hacd-repository|V-HACD README]] 强调 exact convex decomposition 是 NP-hard 且不 practical，因此 ACD 用 concavity threshold 放松 exact convexity。

当前 wiki 把 V-HACD 主要视为 historical baseline 和 legacy tool。README 已标记项目 deprecated / archived，并建议新开发使用 [[CoACD]]。后续 sources 中，[[coacd-approximate-convex-decomposition|CoACD paper]]、[[convex-primitive-decomposition-for-collision-detection|Convex Primitive Decomposition]] 和 [[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition|VisACD]] 都把 V-HACD 作为对比对象或历史背景。

V-HACD 的实践提醒仍然有价值：单个 ellipsoid、capsule 或 convex hull 对 concave objects 可能产生 false collision；但过高 hull count 或 precision settings 也会变慢并增加 runtime complexity。

相关页面：[[ApproximateConvexDecomposition]]、[[CollisionGeometryForRobotSimulation]]、[[CoACD]]、[[VisACD]]。
