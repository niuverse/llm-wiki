---
title: "V-HACD Repository"
type: source
tags: [collision-detection, convex-decomposition, repository, simulation-assets]
sources: []
last_updated: 2026-06-04
source_file: raw/v-hacd-readme.md
source_kind: repo
source_url: https://github.com/kmammou/v-hacd
extracted_text: graph/extracts/v-hacd-readme.md
source_date: unknown
---

## 摘要

V-HACD repository README 描述了 Voxelized Hierarchical Approximate Convex Decomposition：把 3D surface 分解成一组近似凸的 parts，用于 collision detection 等需要 convex shapes 的应用。该 README 同时说明项目已经 deprecated / archived，新开发转移到 [[CoACD]]。它仍是理解 [[ApproximateConvexDecomposition|approximate convex decomposition]] 历史和 baseline 的重要 source。

Source URL: https://github.com/kmammou/v-hacd

## 核心主张

- V-HACD 的目标是把 concave surface 分解为 near-convex parts，从而避免单个 ellipsoid、capsule 或 convex hull 对 concave shapes 造成过多 false collision。
- README 明确说 exact convex decomposition 是 NP-hard 且不 practical；ACD 通过允许低于阈值的 concavity 来放松 exact convexity。
- V-HACD 4.0 rewrite 不再追求最小 hull count；user 应指定需要的 detail / hull budget。README 警告默认 32 hulls 对很多场景可能过高，高 precision settings 可能 overkill 且 slow。
- 项目状态本身是重要证据：V-HACD 已 deprecated / archived，README 建议新开发使用 CoACD。

## 关键引文

- "DEPRECATED & ARCHIVED"
- "near convex parts"

## 关联

- [[ApproximateConvexDecomposition]] - V-HACD 是常用 ACD baseline，也是 CoACD / VisACD / primitive decomposition 对比对象。
- [[CollisionGeometryForRobotSimulation]] - 解释为什么单 hull / primitive 对 concavity 容易产生 false positives。
- [[VHACD]] - entity page。
- [[CoACD]] - README 推荐的新开发方向。

## 开放问题

- V-HACD 在当前 game engines / robotics simulators 中仍有多少 legacy usage，需要结合 engine docs 或 asset pipelines 继续确认。
- README 的 practical tuning advice 很有用，但缺少 robotics-specific benchmark；需要和 CoACD / VisACD / primitive decomposition papers 对照。
