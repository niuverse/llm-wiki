---
title: "MJWarp"
type: entity
tags: [robotics, simulation, mujoco, gpu]
sources: ["[[mujoco-warp-mjwarp-documentation]]"]
last_updated: 2026-07-13
---

# MJWarp

MJWarp / MuJoCo Warp 是 [[mujoco-warp-mjwarp-documentation|MuJoCo 官方文档]] 中描述的实现：它以 NVIDIA Warp 编写，针对 NVIDIA 硬件和并行仿真优化。项目由 Google DeepMind 和 [[NVIDIA]] 共同开发维护，代码位于 `google-deepmind/mujoco_warp` 仓库。

MJWarp 的定位是高吞吐量采样 / RL，而不是低延迟单一步骤控制。文档把它放在 MuJoCo 生态的批处理的 options 中：CPU `mujoco.rollout`、JAX/MJX 和 `mujoco_warp.step`。它支持设备侧 `mjw.Model` / `mjw.Data`、批处理的 worlds、批次渲染和 per-世界字段，但也明确有特征 gaps：例如 PGS / noslip、部分积分器/传感器/插件/flex/用户参数支持，以及当前不可用的 Warp 自动微分。

相关页面：[[MuJoCo]]、[[HeterogeneousRobotRLTraining]]、[[Mjlab]]、[[MuJoCoPlayground]]、[[DifferentiablePhysics]]。
