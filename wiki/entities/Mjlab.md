---
title: "mjlab"
type: entity
tags: [robotics, simulation, reinforcement-learning, mujoco]
sources: ["[[mjlab-repository]]"]
last_updated: 2026-06-05
---

# mjlab

mjlab 是 [[mjlab-repository|official repository README]] 中描述的 robot learning framework：它把 [[IsaacLab|Isaac Lab]] 的 manager-based API 与 [[MJWarp|MuJoCo Warp]] GPU-accelerated physics 结合起来，目标是提供 composable environment design、minimal dependencies 和 direct access to native [[MuJoCo]] data structures。

在 [[HeterogeneousRobotRLTraining]] taxonomy 中，mjlab 代表 GPU-oriented MuJoCo route：physics 在 MJWarp / NVIDIA GPU path 上运行，framework layer 采用 Isaac Lab-style managers 来组织 observations、rewards、events 和 training tasks。README 明确说 training requires NVIDIA GPU，macOS 只支持 evaluation。

相关页面：[[MJWarp]]、[[IsaacLab]]、[[MuJoCo]]、[[HeterogeneousRobotRLTraining]]。
