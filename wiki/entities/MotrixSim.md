---
title: "MotrixSim"
type: entity
tags: [robotics, simulation, physics-engine]
sources: ["[[motrixsim-documentation]]", "[[unilab-repository]]", "[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]"]
last_updated: 2026-06-05
---

# MotrixSim

MotrixSim 是 [[motrixsim-documentation|MotrixSim documentation]] 中描述的 high-performance physics simulation engine，面向 multibody dynamics、robotics simulation、robot control、reinforcement learning 和 industrial simulation。Docs 强调 generalized coordinate modeling、proprietary constraint model / solver、Rust CPU implementation、Python API 和 MJCF compatibility。

在 [[UniLab]] context 中，MotrixSim 是 CPU-side physics backend，与 [[MuJoCoUni]] 一起接入 UniLab runtime。当前 wiki 对 MotrixSim 的 source-backed coverage 还停留在 docs home page / UniLab paper 层级；具体 solver math、contact law、API details 和 benchmark evidence 需要后续 ingest user guide、API reference 或 technical reports。

相关页面：[[HeterogeneousRobotRLTraining]]、[[UniLab]]、[[MuJoCoUni]]、[[RoboticsSimulationInfrastructure]]。
