---
title: "CoACD Repository"
type: source
tags: [collision-detection, convex-decomposition, repository, simulation-assets]
sources: []
last_updated: 2026-07-13
source_file: raw/coacd-readme.md
source_kind: repo
source_url: https://github.com/SarahWeiii/CoACD
extracted_text: graph/extracts/coacd-readme.md
source_date: unknown
---

## 摘要

CoACD 代码仓库 README 是 [[CoACD]] 的实现-facing 来源，说明 `coacd.run_coacd(mesh)` 如何把输入网格转换成一组凸包，并列出阈值、最大凸包数量、MCTS 搜索、preprocess、真实指标模式等参数。它补充了论文的算法动机：工程上需要把非凸资产变成可被碰撞检测使用的凸组件，同时控制细节、组件数量和运行时成本。

来源网址: https://github.com/SarahWeiii/CoACD

## 核心主张

- CoACD 的目标是用碰撞感知凹度和树搜索生成更适合碰撞条件的凸分解。
- README 暴露 Python/C++/Unity 用法，返回值是一组凸包，可直接进入仿真器 / game 引擎资产流程。
- `threshold` 控制分解细节与组件数量；`max-convex-hull`、`max-ch-vertex`、`resolution`、`decimate` 和 MCTS 参数控制质量与速度取舍。
- 2026-04 README news 增加真实指标模式 `-rm`，使阈值可以按 meters 解释，适合现实世界规模网格。
- 2025 年 9 月的 README 更新提到 PaMO 预处理，用于准备低多边形、流形且无相交的网格。

## 关键引文

- "real metric mode"
- "collision-aware concavity"

## 关联

- [[coacd-approximate-convex-decomposition|CoACD 论文]] - 算法和基准证据。
- [[ApproximateConvexDecomposition]] - 参数如何影响 ACD 的实践。
- [[CollisionGeometryForRobotSimulation]] - collider 制作流程。
- [[CoACD]] - 实体页面。

## 开放问题

- README 的 2025/2026 news 指向活跃维护，但发布 / 提交 provenance 当前没有保存进知识库；后续可用 authenticated GitHub API 或发布 tarball 做更规范的快照。
- PaMO 预处理的来源和基准还未收录；它可能是实用的资产-cleaning 流程的关键补充。
