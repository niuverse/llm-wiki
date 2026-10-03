---
title: "V-HACD"
type: entity
tags: [collision-detection, convex-decomposition, simulation-assets]
sources: ["[[v-hacd-repository]]", "[[coacd-approximate-convex-decomposition]]", "[[convex-primitive-decomposition-for-collision-detection]]", "[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]"]
modified: 2026-10-04
topics: ["topics/physics-simulation", "topics/collision-geometry"]
---

# V-HACD

连接 V-HACD 仓库与将其作为对照的凸分解论文。不同论文使用的版本、分解参数、合并步骤和硬件条件可能不同，比较时以各来源的具体协议为准。归档状态仅按已收录仓库快照描述。

## 来源入口

- [[v-hacd-repository|V-HACD Repository]]
- [[coacd-approximate-convex-decomposition|CoACD：保留碰撞相关凹陷的凸分解]]
- [[convex-primitive-decomposition-for-collision-detection|凸基元分解：按碰撞成本拟合可编辑的几何]]
- [[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition|VisACD：用可见性快速评价凸分解切面]]

方法机制与研究比较请沿下列专题继续阅读；此页只保留跨来源共有的项目入口，避免同一结论重复维护。

## 研究归属

[[topics/physics-simulation|物理仿真]] · [[topics/collision-geometry|碰撞几何如何兼顾精度与计算]]。
