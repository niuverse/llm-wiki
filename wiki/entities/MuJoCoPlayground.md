---
title: "MuJoCo Playground"
type: entity
tags: [robotics, simulation, reinforcement-learning, mujoco]
sources: ["[[mujoco-playground-repository]]"]
last_updated: 2026-06-05
---

# MuJoCo Playground

MuJoCo Playground 是 [[mujoco-playground-repository|official repository README]] 中描述的 GPU-accelerated environment suite，用于 robot learning research and sim-to-real，built with MuJoCo MJX。它覆盖 classic control、quadruped/biped locomotion、non-prehensile and dexterous manipulation，并通过 [[MJWarp]] Batch Renderer 支持 vision-based environments。

README 表示 MuJoCo Playground 当前支持 MJX JAX implementation 和 MuJoCo Warp implementation at HEAD。它因此是 [[MuJoCo]] ecosystem 中连接 environment suite、learning recipes、JAX/MJX、Warp rendering 和 sim-to-real examples 的 practical entrypoint。README 同时提示 Ampere GPUs 上 JAX 默认 TF32 matmul 可能影响 RL training stability，需要记录 precision settings。

相关页面：[[MuJoCo]]、[[MJWarp]]、[[HeterogeneousRobotRLTraining]]、[[SimulationRealityGap]]。
