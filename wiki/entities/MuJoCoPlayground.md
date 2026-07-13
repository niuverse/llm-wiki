---
title: "MuJoCo Playground"
type: entity
tags: [robotics, simulation, reinforcement-learning, mujoco]
sources: ["[[mujoco-playground-repository]]"]
last_updated: 2026-07-13
---

# MuJoCo Playground

MuJoCo Playground 是 [[mujoco-playground-repository|官方代码仓库 README]] 中描述的 GPU 加速的环境套件，用于机器人学习研究与仿真到现实迁移，基于 MuJoCo MJX。它覆盖 classic 控制、quadruped/biped 移动、non-prehensile 与灵巧操作，并通过 [[MJWarp]] 批次渲染器支持基于视觉的环境。

README 表示 MuJoCo Playground 当前支持 MJX JAX 实现和 MuJoCo Warp 实现在输出头。它因此是 [[MuJoCo]] 生态中连接环境套件、学习 recipes、JAX/MJX、Warp 渲染和仿真到现实迁移示例的实用的 entrypoint。README 同时提示 Ampere GPUs 上 JAX 默认 TF32 matmul 可能影响 RL 训练稳定性，需要记录精度场景。

相关页面：[[MuJoCo]]、[[MJWarp]]、[[HeterogeneousRobotRLTraining]]、[[SimulationRealityGap]]。
