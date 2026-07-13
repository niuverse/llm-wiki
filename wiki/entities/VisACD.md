---
title: "VisACD"
type: entity
tags: [collision-detection, convex-decomposition, gpu, simulation-assets]
sources: ["[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]"]
last_updated: 2026-07-13
---

# VisACD

VisACD 是一种基于可见性、由 GPU 加速的近似凸分解方法，来自 2026 年的一篇短论文。它用可见性指标在 GPU 上评估候选切分平面，生成旋转等变且无相交的凸分解，目标是在保持低凹度的同时减少部件数量和预处理时间。

[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition|VisACD 论文]] 在 V-HACD、PartNet-机动性和 Objaverse 数据集上比较 VisACD、[[CoACD]]、[[VHACD]] 等方法。来源报告 VisACD 在多个场景中用更少部件达到相近或更低凹度，并且 PartNet-机动性平均运行时低于 CoACD。它也明确列出局限：greedy 算法可能 suboptimal、拓扑-sensitive、optimal 性能需要重新网格化，未来可结合 MCTS。

对知识库的意义是补充 [[ApproximateConvexDecomposition|ACD]] 的未来趋势：碰撞体预处理正在从 CPU-密集型 manual 调优走向 GPU 加速的、姿态-robust 和大规模资产可扩展的流程。

相关页面：[[ApproximateConvexDecomposition]]、[[CollisionGeometryForRobotSimulation]]、[[CoACD]]、[[VHACD]]。
