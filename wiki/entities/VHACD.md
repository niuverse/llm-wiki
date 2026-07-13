---
title: "V-HACD"
type: entity
tags: [collision-detection, convex-decomposition, simulation-assets]
sources: ["[[v-hacd-repository]]", "[[coacd-approximate-convex-decomposition]]", "[[convex-primitive-decomposition-for-collision-detection]]", "[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]"]
last_updated: 2026-07-13
---

# V-HACD

V-HACD 是 Voxelized Hierarchical 近似凸分解的代码仓库 / 方法族，用于把凹形 3D 表面分解成 near-凸部件。[[v-hacd-repository|V-HACD README]] 强调精确凸分解是 NP 困难且不实用的，因此 ACD 用凹度阈值放松精确 convexity。

当前知识库把 V-HACD 主要视为 historical 基线和旧版工具。README 已标记项目已弃用的 / 已归档的，并建议新开发使用 [[CoACD]]。后续来源中，[[coacd-approximate-convex-decomposition|CoACD 论文]]、[[convex-primitive-decomposition-for-collision-detection|凸基元分解]] 和 [[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition|VisACD]] 都把 V-HACD 作为对比对象或历史背景。

V-HACD 的实践提醒仍然有价值：单个 ellipsoid、胶囊体或凸包对凹形物体可能产生 false 碰撞；但过高凸包数量或精度场景也会变慢并增加运行时复杂度。

相关页面：[[ApproximateConvexDecomposition]]、[[CollisionGeometryForRobotSimulation]]、[[CoACD]]、[[VisACD]]。
