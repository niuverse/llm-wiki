---
title: "Approximate Convex Decomposition for 3D Meshes with Collision-Aware Concavity and Tree Search"
type: source
tags: [collision-detection, convex-decomposition, robotics, simulation-assets, siggraph]
sources: []
last_updated: 2026-07-13
source_file: raw/coacd-approximate-convex-decomposition.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2205.02961
extracted_text: graph/extracts/coacd-approximate-convex-decomposition.md
source_date: 2022-07-01
---

## 摘要

CoACD 论文提出近似凸分解用于 3D 网格带有碰撞感知凹度与树搜索。核心问题是：传统 ACD 可能在 toaster slots、handles、holes 等功能性 concavities 上失败，把真实可进入/可抓取的空间填满，从而改变碰撞条件。论文提出碰撞感知凹度、直接平面切分和 MCTS 搜索，以更少组件更好保留碰撞相关细节。

来源网址: https://arxiv.org/abs/2205.02961

## 核心主张

- ACD 将形状分解成 almost 凸组件，并用每个组件的凸包表示输入；它广泛用于 game 引擎、物理仿真和动画。
- 精确凸分解是 NP 困难；ACD 放松精确 convexity，但错误的凹度指标会让分解忽略功能性 holes、slots 和 handles。
- CoACD 的碰撞感知凹度同时从边界与 interior 检查形状与凸包的距离，目标是发现会改变碰撞条件的近似错误。
- CoACD 直接用 3D 平面切分网格，避免体素化产物，并保证凸包 intersection-free。
- CoACD 使用 MCTS 多步骤树搜索选择切分平面，避免 greedy strategy 产生不必要切分。
- SAPIEN 抽屉开启实验显示碰撞体近似可以显著改变 RL outcome：V-HACD 碰撞形状可能填满把手 holes，使机械臂滑移 off handles；CoACD 保留把手几何后，抽屉开启成功从论文报告的 49% 提高到 80%。
- 论文的未来工作包括并行化、神经网络评估的 decompositions、更智能的切分方向和自适应阈值。

## 关键引文

- "collision-aware concavity"
- "fine details"

## 关联

- [[ApproximateConvexDecomposition]] - CoACD 的数学结构、直觉和失效情形。
- [[CollisionGeometryForRobotSimulation]] - 碰撞体不匹配如何改变抓取 / 操作 outcome。
- [[SimulationRealityGap]] - 资产层级碰撞体错误是策略现实差距的上游因素。
- [[CoACD]] - 实体页面。
- [[VHACD]] - 基线实体。

## 开放问题

- CoACD 的把手/drawer 证据很强地说明碰撞体 matters，但它是来源特有的 SAPIEN 实验；不同机器人 hands、接触求解器和物体 categories 下是否稳定，需要外部复现。
- CoACD 的 MCTS / 阈值调优如何与训练吞吐量、接触稳定性和制作 automation 共同优化，仍需要实现层级研究。
