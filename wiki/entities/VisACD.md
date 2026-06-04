---
title: "VisACD"
type: entity
tags: [collision-detection, convex-decomposition, gpu, simulation-assets]
sources: ["[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]"]
last_updated: 2026-06-04
---

# VisACD

VisACD 是 Visibility-Based GPU-Accelerated Approximate Convex Decomposition，一种 2026 short paper 中提出的 ACD method。它用 visibility metric 和 GPU evaluation of candidate cutting planes 来生成 rotation-equivariant、intersection-free convex decomposition，目标是在保持 low concavity 的同时减少 parts 和 preprocessing time。

[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition|VisACD paper]] 在 V-HACD、PartNet-Mobility 和 Objaverse datasets 上比较 VisACD、[[CoACD]]、[[VHACD]] 等方法。Source 报告 VisACD 在多个 settings 中用更少 parts 达到相近或更低 concavity，并且 PartNet-Mobility average runtime 低于 CoACD。它也明确列出 limitations：greedy algorithm 可能 suboptimal、topology-sensitive、optimal performance 需要 remeshing，未来可结合 MCTS。

对 wiki 的意义是补充 [[ApproximateConvexDecomposition|ACD]] 的未来趋势：collider preprocessing 正在从 CPU-heavy manual tuning 走向 GPU-accelerated、orientation-robust 和 large-asset scalable pipeline。

相关页面：[[ApproximateConvexDecomposition]]、[[CollisionGeometryForRobotSimulation]]、[[CoACD]]、[[VHACD]]。
