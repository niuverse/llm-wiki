---
title: "mjlab"
type: entity
tags: [robotics, simulation, reinforcement-learning, mujoco]
sources: ["[[mjlab-repository]]"]
last_updated: 2026-07-13
---

# mjlab

mjlab 是 [[mjlab-repository|官方代码仓库 README]] 中描述的机器人学习框架：它把 [[IsaacLab|Isaac Lab]] 的基于管理器的 API 与 [[MJWarp|MuJoCo Warp]] GPU 加速的物理结合起来，目标是提供 composable 环境设计、minimal 依赖和直接访问原生 [[MuJoCo]] 数据 structures。

在 [[HeterogeneousRobotRLTraining]] 分类体系中，mjlab 代表面向 GPU 的 MuJoCo 路线：物理在 MJWarp / NVIDIA GPU 路径上运行，框架层采用 Isaac Lab-风格 managers 来组织观测、奖励、events 和训练任务。README 明确说训练 requires NVIDIA GPU，macOS 只支持评估。

相关页面：[[MJWarp]]、[[IsaacLab]]、[[MuJoCo]]、[[HeterogeneousRobotRLTraining]]。
