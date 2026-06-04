---
title: "CoACD"
type: entity
tags: [collision-detection, convex-decomposition, simulation-assets]
sources: ["[[coacd-approximate-convex-decomposition]]", "[[coacd-repository]]", "[[mujoco-computation-collision-detection]]"]
last_updated: 2026-06-04
---

# CoACD

CoACD 是 Approximate Convex Decomposition for 3D Meshes with Collision-Aware Concavity and Tree Search 的 method / implementation，用 collision-aware concavity、direct plane cuts 和 MCTS search 生成更适合 collision conditions 的 convex decomposition。[[coacd-approximate-convex-decomposition|CoACD paper]] 把它定位为对 V-HACD-style ACD 的改进：目标不是只让 hulls 视觉上接近 mesh，而是避免填掉 holes、slots、handles 等会改变 object interaction 的 concavity。

对 robot simulation，CoACD 的核心意义是 collider approximation 可以改变 task outcome。Paper 的 SAPIEN drawer-opening experiment 报告：V-HACD collision shapes 填满 handle holes 时，agent 成功率为 49%；CoACD 保留 handle geometry 后成功率为 80%。这个 result 是 source-specific evidence，但足以说明 [[CollisionGeometryForRobotSimulation|collision geometry]] 不是纯 asset-preprocessing detail。

[[coacd-repository|CoACD repository]] 提供 Python/C++/Unity usage，`coacd.run_coacd(mesh)` 返回一组 convex hulls。关键参数包括 `threshold`、`max-convex-hull`、MCTS iterations / depth / nodes、`resolution`、`decimate`、`max-ch-vertex` 和 real metric mode。[[mujoco-computation-collision-detection|MuJoCo docs]] 也明确把 CoACD 作为 non-convex object preprocessing 的工具例子。

相关页面：[[ApproximateConvexDecomposition]]、[[CollisionGeometryForRobotSimulation]]、[[VHACD]]、[[VisACD]]、[[SimulationRealityGap]]。
