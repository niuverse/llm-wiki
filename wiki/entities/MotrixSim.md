---
title: "MotrixSim"
type: entity
tags: [robotics, simulation, physics-engine]
sources: ["[[motrixsim-documentation]]", "[[unilab-repository]]", "[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]"]
last_updated: 2026-07-13
---

# MotrixSim

MotrixSim 是 [[motrixsim-documentation|MotrixSim 文档]] 中描述的高性能物理仿真引擎，面向 multibody 动力学、机器人学仿真、机器人控制、强化学习和 industrial 仿真。文档强调广义的坐标建模、专有的约束模型 / 求解器、Rust CPU 实现、Python API 和 MJCF 兼容性。

在 [[UniLab]] 上下文中，MotrixSim 是 CPU 侧物理后端，与 [[MuJoCoUni]] 一起接入 UniLab 运行时。当前知识库对 MotrixSim 的有来源支持的覆盖范围还停留在文档 home 页面 / UniLab 论文层级；具体求解器 math、接触定律、API 细节和基准证据需要后续收录用户指南、API 参考或技术报告。

相关页面：[[HeterogeneousRobotRLTraining]]、[[UniLab]]、[[MuJoCoUni]]、[[RoboticsSimulationInfrastructure]]。
