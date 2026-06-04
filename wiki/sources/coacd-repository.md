---
title: "CoACD Repository"
type: source
tags: [collision-detection, convex-decomposition, repository, simulation-assets]
sources: []
last_updated: 2026-06-04
source_file: raw/coacd-readme.md
source_kind: repo
source_url: https://github.com/SarahWeiii/CoACD
extracted_text: graph/extracts/coacd-readme.md
source_date: unknown
---

## 摘要

CoACD repository README 是 [[CoACD]] 的 implementation-facing source，说明 `coacd.run_coacd(mesh)` 如何把 input mesh 转换成一组 convex hulls，并列出 threshold、max hull count、MCTS search、preprocess、real metric mode 等参数。它补充了 paper 的算法动机：工程上需要把 non-convex assets 变成可被 collision detection 使用的 convex components，同时控制 detail、component count 和 runtime cost。

Source URL: https://github.com/SarahWeiii/CoACD

## 核心主张

- CoACD 的目标是用 collision-aware concavity 和 tree search 生成更适合 collision conditions 的 convex decomposition。
- README 暴露 Python/C++/Unity usage，返回值是一组 convex hulls，可直接进入 simulator / game engine asset pipeline。
- `threshold` 控制 decomposition detail 与 component count；`max-convex-hull`、`max-ch-vertex`、`resolution`、`decimate` 和 MCTS 参数控制质量与速度 tradeoff。
- 2026-04 README news 增加 real metric mode `-rm`，使 threshold 可以按 meters 解释，适合 real-world scale meshes。
- 2025-09 README news 提到 PaMO preprocessing，用于 low-poly、manifold、intersection-free mesh preparation。

## 关键引文

- "real metric mode"
- "collision-aware concavity"

## 关联

- [[coacd-approximate-convex-decomposition|CoACD paper]] - 算法和 benchmark evidence。
- [[ApproximateConvexDecomposition]] - 参数如何影响 ACD 的实践。
- [[CollisionGeometryForRobotSimulation]] - collider authoring workflow。
- [[CoACD]] - entity page。

## 开放问题

- README 的 2025/2026 news 指向 active maintenance，但 release / commit provenance 当前没有保存进 wiki；后续可用 authenticated GitHub API 或 release tarball 做更 canonical snapshot。
- PaMO preprocessing 的 source 和 benchmark 还未 ingest；它可能是 practical asset-cleaning pipeline 的关键补充。
