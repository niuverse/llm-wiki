---
title: "MuJoCoUni"
type: entity
tags: [robotics, simulation, mujoco, reinforcement-learning]
sources: ["[[mujocouni-persistent-batched-runtime-primitives-for-mujoco]]"]
last_updated: 2026-06-05
---

# MuJoCoUni

MuJoCoUni 是 [[mujocouni-persistent-batched-runtime-primitives-for-mujoco|MuJoCoUni technical report]] 提出的 downstream [[MuJoCo]] distribution，面向 online robot learning 和 batched physics evaluation。它的核心对象是 `BatchEnvPool`，在 Python binding layer 中维护 persistent environment pool、per-environment `mjModel` copies、per-thread `mjData` workers 和 internal thread pool。

MuJoCoUni 的关键边界是：它不修改 MuJoCo solver、contact model、integrator 或 core source tree，而是通过 stateful batched interface、sparse reset、reset-time domain randomization、batched forward/sensor queries、site Jacobian 和 height-field queries 来降低 online robot RL runtime overhead。它因此是 [[HeterogeneousRobotRLTraining]] 中 CPU-side batched physics route 的代表。

相关页面：[[MuJoCo]]、[[HeterogeneousRobotRLTraining]]、[[UniLab]]、[[mujocouni-persistent-batched-runtime-primitives-for-mujoco]]。
