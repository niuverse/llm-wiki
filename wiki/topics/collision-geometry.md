---
title: "碰撞几何如何兼顾精度与计算"
type: "topic"
tags: ["simulation", "source-backed"]
sources: ["[[coacd-approximate-convex-decomposition]]", "[[convex-primitive-decomposition-for-collision-detection]]", "[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]", "[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]", "[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons]]", "[[v-hacd-repository]]", "[[coacd-repository]]", "[[isaac-sim-core-api-collision-approximation]]"]
modified: "2026-10-04"
description: "几何近似和可微查询解决不同问题；表示误差需连同下游任务评估。"
---

# 碰撞几何如何兼顾精度与计算

对照凸分解、基元表示与可微接近度，检查几何误差如何进入任务。

## 方法与证据

| 路线 | 代表来源 | 主要核验对象 |
| --- | --- | --- |
| 凸分解 | [[coacd-approximate-convex-decomposition|CoACD]]、[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition|VisACD]] | 凹陷保留、部件数、预处理时间与下游碰撞 |
| 凸基元分解 | [[convex-primitive-decomposition-for-collision-detection|CPD]] | 基元表示误差及引擎实际支持 |
| 可微接近度 | [[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|DCOL]]、[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons|DiffPills]] | 优化问题的几何量、梯度条件与查询成本 |

**当前判断：**离线几何近似和在线可微查询解决不同问题。不能用某一数据集的分解速度证明接触更真实，也不能将缩放接近度直接当作以米计的穿透深度。

## 支撑资料

- [[coacd-approximate-convex-decomposition|Approximate Convex Decomposition for 3D Meshes with Collision-Aware Concavity and Tree Search]]
- [[convex-primitive-decomposition-for-collision-detection|Convex Primitive Decomposition for Collision Detection]]
- [[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition|VisACD: Visibility-Based GPU-Accelerated Approximate Convex Decomposition]]
- [[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|DCOL: Differentiable Collision Detection for a Set of Convex Primitives]]
- [[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons|DiffPills: Differentiable Collision Detection for Capsules and Padded Polygons]]
- [[v-hacd-repository|V-HACD Repository]]
- [[coacd-repository|CoACD Repository]]
- [[isaac-sim-core-api-collision-approximation|Isaac Sim Core API Collision Approximation]]

## 机制基础

[[CollisionGeometryForRobotSimulation|机器人仿真的碰撞几何]]、[[ApproximateConvexDecomposition|近似凸分解]]、[[DifferentiableCollisionDetection|可微碰撞检测]]。

## 未解问题与优先补证

同一资产与任务中，几何误差、接近度梯度、接触数量和仿真吞吐量应怎样联合评估？可微几何查询对完整接触动力学的优化收益仍需单独验证。

这些是研究问题与验证要求，尚未作为已有结论。沿 [[topics/physics-simulation|物理仿真]] 与 [[topics/assets-and-world-generation|资产与场景生成]] 查看相关研究；基础学习可沿 [[simulation-and-assets-learning-path|学习路径]] 进行。
