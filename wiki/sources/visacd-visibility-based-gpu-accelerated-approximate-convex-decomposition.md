---
title: "VisACD: Visibility-Based GPU-Accelerated Approximate Convex Decomposition"
type: source
tags: [collision-detection, convex-decomposition, gpu, simulation-assets]
sources: []
last_updated: 2026-07-13
source_file: raw/visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2604.04788
extracted_text: graph/extracts/visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition.md
source_date: 2026-04-05
---

## 摘要

VisACD proposes 基于可见性, GPU 加速的近似凸分解。它的目标是在保持 intersection-free 分解的同时减少姿态敏感性，并通过 GPU 评估的大量候选切分平面提高分解效率。该来源代表 ACD 的一个趋势：把碰撞体预处理变成更快、更可扩展的、更少 manual 调优的流程。

来源网址: https://arxiv.org/abs/2604.04788

## 核心主张

- ACD 在基元碰撞体和 original 网格碰撞之间提供取舍：比原始三角形网格快，比过粗基元 / 凸包更能保留形状细节。
- VisACD 使用可见性边和点可见性定义分解目标，目标是旋转等变的、intersection-free，并避免对网格姿态的敏感性。
- GPU 实现使用 NVIDIA OptiX / CUDA，可以在每个步骤评估 1000+ 候选切分平面，因为平面价值可在不实际切网格的情况下计算。
- 论文在 V-HACD、PartNet-机动性和 Objaverse 上比较 VisACD、CoACD、V-HACD 等方法；报告 VisACD 在相近凹度下通常需要更少部件，PartNet-机动性平均运行时也低于 CoACD。
- 论文没有评估相交的-凸包 decompositions；在作者设置中，CoACD 合并在 35% 情形生成相交的凸包，因此对比时关闭合并。
- 局限包括 greedy 算法可能 suboptimal、拓扑-sensitive、optimal 性能需要重新网格化；未来方向包括结合 MCTS。

## 关键引文

- "visibility-based"
- "GPU-accelerated"

## 关联

- [[ApproximateConvexDecomposition]] - VisACD 扩展 ACD 分类体系：可见性指标 + GPU 加速度。
- [[CollisionGeometryForRobotSimulation]] - 高质量碰撞体预处理与运行时接触保真度的关系。
- [[VisACD]] - 实体页面。
- [[CoACD]] 与 [[VHACD]] - 对比对象。

## 开放问题

- VisACD 是 2026 short 论文；需要后续代码仓库 / 实现来源才能判断在机器人学资产流程中的可用性。
- GPU 预处理是否能融入大规模合成资产生成 / RL curriculum 流程，还需要工作流层级证据。
