---
title: "物理仿真"
type: "topic"
tags: ["simulation", "source-backed"]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[mujoco-computation-collision-detection]]", "[[coacd-approximate-convex-decomposition]]", "[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]"]
modified: "2026-10-04"
entry: "research"
nav_order: 4
description: "物理仿真从几何和状态出发，计算约束、接触与下一时刻运动。这里按计算链条阅读，区分物理近似、离散化和数值求解，避免把“跑得稳定”直接视为“符合真实”。"
---

# 物理仿真

物理仿真从几何和状态出发，计算约束、接触与下一时刻运动。这里按计算链条阅读，区分物理近似、离散化和数值求解，避免把“跑得稳定”直接视为“符合真实”。

## 阅读地图

- **几何输入。** [[topics/collision-geometry|碰撞几何]] 比较凸分解、基元表示和可微查询；[[CollisionGeometryForRobotSimulation|碰撞几何基础]] 解释视觉网格与碰撞表示为何不同。
- **接触关系。** [[topics/contact-modeling|接触模型与求解]] 连接 [[ContactComplementarity|接触互补]]、[[ContactModelsInRobotics|接触模型]] 和 [[ContactSolvers|接触求解器]]。
- **动力学与时间。** [[RobotRigidBodyDynamics|刚体动力学]]、[[ReducedCoordinateArticulations|约化坐标关节系统]]、[[SimulationTimeStepping|离散步进]] 解释状态推进的假设。
- **梯度与优化。** [[DifferentiableCollisionDetection|可微碰撞检测]] 与 [[DifferentiablePhysics|可微物理]] 的可微对象、退化条件和接触切换边界分别成立。
- **有效计算。** [[topics/robot-learning-systems|训练系统]] 讨论物理、渲染、数据搬运与学习器的整体成本。资产如何携带物理参数见 [[topics/assets-and-world-generation|三维资产与场景生成]]。

## 当前理解

几何改变接触输入，接触模型决定所求的关系，数值方法决定在给定预算下如何近似求解。这个分工由 [[contact-models-in-robotics-a-comparative-analysis|接触比较论文]]、[[mujoco-computation-collision-detection|MuJoCo 计算文档]] 和 [[coacd-approximate-convex-decomposition|CoACD]] 的不同实验对象支持。可微接近度与欧氏穿透距离也应区分，见 [[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|DCOL]]。

## 未解问题与优先补证

怎样在同一任务中同时报告几何误差、约束残差、能量、吞吐量与真实轨迹差异？柔性接触和材料行为仍缺系统资料；具体数值与几何缺口分别见 [[topics/contact-modeling#未解问题与优先补证|接触专题]]、[[topics/collision-geometry#未解问题与优先补证|几何专题]]。
