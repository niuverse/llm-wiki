---
title: "MuJoCoUni"
type: entity
tags: [robotics, simulation, mujoco, reinforcement-learning]
sources: ["[[mujocouni-persistent-batched-runtime-primitives-for-mujoco]]"]
last_updated: 2026-07-13
---

# MuJoCoUni

MuJoCoUni 是 [[mujocouni-persistent-batched-runtime-primitives-for-mujoco|MuJoCoUni 技术报告]] 提出的下游 [[MuJoCo]] 分布，面向在线机器人学习和批处理的物理评估。它的核心对象是 `BatchEnvPool`，在 Python 绑定层中维护持久的环境数据池、per-环境 `mjModel` 副本、每个线程 `mjData` 工作线程和内部 thread 数据池。

MuJoCoUni 的关键边界是：它不修改 MuJoCo 求解器、接触模型、积分器或核心源码树，而是通过有状态的批量接口、稀疏重置、重置时域随机化、批量前向与传感器查询、位点雅可比矩阵和高度场查询，降低在线机器人强化学习的运行时开销。它因此是 [[HeterogeneousRobotRLTraining]] 中 CPU 侧批量物理计算路线的代表。

相关页面：[[MuJoCo]]、[[HeterogeneousRobotRLTraining]]、[[UniLab]]、[[mujocouni-persistent-batched-runtime-primitives-for-mujoco]]。
