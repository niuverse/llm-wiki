---
title: "CoACD"
type: entity
tags: [collision-detection, convex-decomposition, simulation-assets]
sources: ["[[coacd-approximate-convex-decomposition]]", "[[coacd-repository]]", "[[mujoco-computation-collision-detection]]"]
modified: 2026-10-04
topics: ["topics/physics-simulation", "topics/collision-geometry"]
---

# CoACD

连接碰撞感知近似凸分解的论文、实现和引擎使用背景。论文中的抽屉结果具有特定训练与重试协议，不能简写成通用的单次抓取成功率；公式、实验和参数分别查对应来源。

## 来源入口

- [[coacd-approximate-convex-decomposition|CoACD：保留碰撞相关凹陷的凸分解]]
- [[coacd-repository|CoACD Repository]]
- [[mujoco-computation-collision-detection|MuJoCo Computation：动力学、积分与接触]]

方法机制与研究比较请沿下列专题继续阅读；此页只保留跨来源共有的项目入口，避免同一结论重复维护。

## 研究归属

[[topics/physics-simulation|物理仿真]] · [[topics/collision-geometry|碰撞几何如何兼顾精度与计算]]。
