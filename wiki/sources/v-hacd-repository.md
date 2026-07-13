---
title: "V-HACD Repository"
type: source
tags: [collision-detection, convex-decomposition, repository, simulation-assets]
sources: []
last_updated: 2026-07-13
source_file: raw/v-hacd-readme.md
source_kind: repo
source_url: https://github.com/kmammou/v-hacd
extracted_text: graph/extracts/v-hacd-readme.md
source_date: unknown
---

## 摘要

V-HACD 代码仓库 README 描述了 Voxelized Hierarchical 近似凸分解：把 3D 表面分解成一组近似凸的部件，用于碰撞检测等需要凸形状的应用。该 README 同时说明项目已经已弃用的 / 已归档的，新开发转移到 [[CoACD]]。它仍是理解 [[ApproximateConvexDecomposition|近似凸分解]] 历史和基线的重要来源。

来源网址: https://github.com/kmammou/v-hacd

## 核心主张

- V-HACD 的目标是把凹形表面分解为 near-凸部件，从而避免单个 ellipsoid、胶囊体或凸包对凹形形状造成过多 false 碰撞。
- README 明确说精确凸分解是 NP 困难且不实用的；ACD 通过允许低于阈值的凹度来放松精确 convexity。
- V-HACD 4.0 rewrite 不再追求最小凸包数量；用户应指定需要的细节 / 凸包预算。README 警告默认 32 凸包对很多场景可能过高，高精度场景可能 overkill 且缓慢。
- 项目状态本身是重要证据：V-HACD 已已弃用的 / 已归档的，README 建议新开发使用 CoACD。

## 关键引文

- "DEPRECATED & ARCHIVED"
- "near convex parts"

## 关联

- [[ApproximateConvexDecomposition]] - V-HACD 是常用 ACD 基线，也是 CoACD / VisACD / 基元分解对比对象。
- [[CollisionGeometryForRobotSimulation]] - 解释为什么单凸包 / 基元对凹度容易产生误报。
- [[VHACD]] - 实体页面。
- [[CoACD]] - README 推荐的新开发方向。

## 开放问题

- V-HACD 在当前 game 引擎 / 机器人学仿真器中仍有多少旧版用法，需要结合引擎文档或资产流程继续确认。
- README 的实用的调优 advice 很有用，但缺少机器人学特定的基准；需要和 CoACD / VisACD / 基元分解论文对照。
