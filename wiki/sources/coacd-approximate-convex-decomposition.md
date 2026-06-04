---
title: "Approximate Convex Decomposition for 3D Meshes with Collision-Aware Concavity and Tree Search"
type: source
tags: [collision-detection, convex-decomposition, robotics, simulation-assets, siggraph]
sources: []
last_updated: 2026-06-04
source_file: raw/coacd-approximate-convex-decomposition.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2205.02961
extracted_text: graph/extracts/coacd-approximate-convex-decomposition.md
source_date: 2022-07-01
---

## 摘要

CoACD paper 提出 Approximate Convex Decomposition for 3D Meshes with Collision-Aware Concavity and Tree Search。核心问题是：传统 ACD 可能在 toaster slots、handles、holes 等功能性 concavities 上失败，把真实可进入/可抓取的空间填满，从而改变 collision conditions。论文提出 collision-aware concavity、direct plane cuts 和 MCTS search，以更少 components 更好保留碰撞相关细节。

Source URL: https://arxiv.org/abs/2205.02961

## 核心主张

- ACD 将 shape 分解成 almost convex components，并用每个 component 的 convex hull 表示输入；它广泛用于 game engines、physics simulation 和 animation。
- Exact convex decomposition 是 NP-hard；ACD 放松 exact convexity，但错误的 concavity metric 会让 decomposition 忽略功能性 holes、slots 和 handles。
- CoACD 的 collision-aware concavity 同时从 boundary 与 interior 检查 shape 与 convex hull 的距离，目标是发现会改变 collision conditions 的 approximation errors。
- CoACD 直接用 3D planes cut meshes，避免 voxelization artifacts，并保证 convex hulls intersection-free。
- CoACD 使用 MCTS multi-step tree search 选择 cutting planes，避免 greedy strategy 产生不必要 cuts。
- SAPIEN drawer-opening experiment 显示 collider approximation 可以显著改变 RL outcome：V-HACD collision shapes 可能填满 handle holes，使 arm slip off handles；CoACD 保留 handle geometry 后，drawer-opening success 从 paper 报告的 49% 提高到 80%。
- Paper 的 future work 包括 parallelization、neural evaluation of decompositions、smarter cutting directions 和 adaptive thresholds。

## 关键引文

- "collision-aware concavity"
- "fine details"

## 关联

- [[ApproximateConvexDecomposition]] - CoACD 的数学结构、直觉和 failure modes。
- [[CollisionGeometryForRobotSimulation]] - collider mismatch 如何改变 grasping / manipulation outcome。
- [[SimulationRealityGap]] - asset-level collider error 是 policy reality gap 的上游因素。
- [[CoACD]] - entity page。
- [[VHACD]] - baseline entity。

## 开放问题

- CoACD 的 handle/drawer evidence 很强地说明 collider matters，但它是 source-specific SAPIEN experiment；不同 robot hands、contact solvers 和 object categories 下是否稳定，需要外部复现。
- CoACD 的 MCTS / threshold tuning 如何与 training throughput、contact stability 和 authoring automation 共同优化，仍需要 implementation-level study。
