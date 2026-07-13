---
title: "CoACD"
type: entity
tags: [collision-detection, convex-decomposition, simulation-assets]
sources: ["[[coacd-approximate-convex-decomposition]]", "[[coacd-repository]]", "[[mujoco-computation-collision-detection]]"]
last_updated: 2026-07-13
---

# CoACD

CoACD 是近似凸分解用于 3D 网格带有碰撞感知凹度与树搜索的方法 / 实现，用碰撞感知凹度、直接平面切分和 MCTS 搜索生成更适合碰撞条件的凸分解。[[coacd-approximate-convex-decomposition|CoACD 论文]] 把它定位为对 V-HACD-风格 ACD 的改进：目标不是只让凸包视觉上接近网格，而是避免填掉 holes、slots、handles 等会改变物体交互的凹度。

对机器人仿真，CoACD 的核心意义是碰撞体近似可以改变任务 outcome。论文的 SAPIEN 抽屉开启实验报告：V-HACD 碰撞形状填满把手 holes 时，智能体成功率为 49%；CoACD 保留把手几何后成功率为 80%。这个结果是来源特有的证据，但足以说明 [[CollisionGeometryForRobotSimulation|碰撞 geometry]] 不是纯资产预处理细节。

[[coacd-repository|CoACD 代码仓库]] 提供 Python/C++/Unity 用法，`coacd.run_coacd(mesh)` 返回一组凸包。关键参数包括 `threshold`、`max-convex-hull`、MCTS 迭代 / 深度 / 节点、`resolution`、`decimate`、`max-ch-vertex` 和真实指标模式。[[mujoco-computation-collision-detection|MuJoCo 文档]] 也明确把 CoACD 作为非凸物体预处理的工具例子。

相关页面：[[ApproximateConvexDecomposition]]、[[CollisionGeometryForRobotSimulation]]、[[VHACD]]、[[VisACD]]、[[SimulationRealityGap]]。
