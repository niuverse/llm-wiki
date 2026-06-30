---
title: "Isaac Lab"
type: entity
tags: [robotics, simulation, reinforcement-learning, nvidia]
sources: ["[[isaac-lab-repository]]"]
last_updated: 2026-06-05
---

# Isaac Lab

Isaac Lab 是 [[isaac-lab-repository|official repository README]] 中描述的 GPU-accelerated open-source framework，built on [[IsaacSim|NVIDIA Isaac Sim]]，用于 reinforcement learning、imitation learning、motion planning 和 sim-to-real robotics workflows。README 记录它提供 robot models、ready-to-train environments、physics/sensor simulation、RL framework integrations 和 local/cloud deployment options。

在本 wiki 的 runtime taxonomy 中，Isaac Lab 是 NVIDIA GPU-accelerated robot learning stack 的主要 framework route，也是 [[Mjlab|mjlab]] 借鉴 manager-based API 的上游设计来源。需要注意的是，README 同时记录 Isaac Sim version dependency 与 proprietary dependency boundary；因此 Isaac Lab open-source framework 不等于整个 runtime stack 都是 permissive 或 fully open。

相关页面：[[IsaacSim]]、[[NVIDIA]]、[[RoboticsSimulationInfrastructure]]、[[HeterogeneousRobotRLTraining]]、[[Mjlab]]。
