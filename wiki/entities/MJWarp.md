---
title: "MJWarp"
type: entity
tags: [robotics, simulation, mujoco, gpu]
sources: ["[[mujoco-warp-mjwarp-documentation]]"]
last_updated: 2026-06-05
---

# MJWarp

MJWarp / MuJoCo Warp 是 [[mujoco-warp-mjwarp-documentation|MuJoCo official docs]] 中描述的 MuJoCo implementation written in NVIDIA Warp and optimized for NVIDIA hardware and parallel simulation。它由 Google DeepMind 和 [[NVIDIA]] 共同开发维护，位于 `google-deepmind/mujoco_warp` repository。

MJWarp 的定位是 high-throughput sampling / RL，而不是 low-latency single-step control。Docs 把它放在 MuJoCo ecosystem 的 batched options 中：CPU `mujoco.rollout`、JAX/MJX 和 `mujoco_warp.step`。它支持 device-side `mjw.Model` / `mjw.Data`、batched worlds、batch rendering 和 per-world fields，但也明确有 feature gaps：例如 PGS / noslip、部分 integrator/sensor/plugin/flex/user parameter support，以及当前不可用的 Warp automatic differentiation。

相关页面：[[MuJoCo]]、[[HeterogeneousRobotRLTraining]]、[[Mjlab]]、[[MuJoCoPlayground]]、[[DifferentiablePhysics]]。
