---
title: "VisACD: Visibility-Based GPU-Accelerated Approximate Convex Decomposition"
type: source
tags: [collision-detection, convex-decomposition, gpu, simulation-assets]
sources: []
last_updated: 2026-06-04
source_file: raw/visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2604.04788
extracted_text: graph/extracts/visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition.md
source_date: 2026-04-05
---

## 摘要

VisACD proposes visibility-based, GPU-accelerated approximate convex decomposition。它的目标是在保持 intersection-free decomposition 的同时减少 orientation sensitivity，并通过 GPU evaluation of many candidate cutting planes 提高 decomposition efficiency。该 source 代表 ACD 的一个趋势：把 collider preprocessing 变成更快、更 scalable、更少 manual tuning 的 pipeline。

Source URL: https://arxiv.org/abs/2604.04788

## 核心主张

- ACD 在 primitive collider 和 original mesh collision 之间提供 tradeoff：比原始 triangle mesh 快，比过粗 primitive / hull 更能保留形状细节。
- VisACD 使用 visibility edges 和 point visibility 定义 decomposition objective，目标是 rotation-equivariant、intersection-free，并避免对 mesh orientation 的敏感性。
- GPU implementation 使用 NVIDIA OptiX / CUDA，可以在每个 step 评估 1000+ candidate cutting planes，因为 plane value 可在不实际切 mesh 的情况下计算。
- Paper 在 V-HACD、PartNet-Mobility 和 Objaverse 上比较 VisACD、CoACD、V-HACD 等方法；报告 VisACD 在相近 concavity 下通常需要更少 parts，PartNet-Mobility average runtime 也低于 CoACD。
- Paper 没有评估 intersecting-hull decompositions；在作者 setup 中，CoACD merging 在 35% cases 生成 intersecting convex hulls，因此对比时关闭 merging。
- Limitations 包括 greedy algorithm 可能 suboptimal、topology-sensitive、optimal performance 需要 remeshing；future direction 包括结合 MCTS。

## 关键引文

- "visibility-based"
- "GPU-accelerated"

## 关联

- [[ApproximateConvexDecomposition]] - VisACD 扩展 ACD taxonomy：visibility metric + GPU acceleration。
- [[CollisionGeometryForRobotSimulation]] - 高质量 collider preprocessing 与 runtime contact fidelity 的关系。
- [[VisACD]] - entity page。
- [[CoACD]] 与 [[VHACD]] - 对比对象。

## 开放问题

- VisACD 是 2026 short paper；需要后续 repo / implementation source 才能判断在 robotics asset pipelines 中的可用性。
- GPU preprocessing 是否能融入大规模 synthetic asset generation / RL curriculum pipeline，还需要 workflow-level evidence。
