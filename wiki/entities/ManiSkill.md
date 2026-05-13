---
title: "ManiSkill"
type: entity
tags: [robotics, simulation, reinforcement-learning, manipulation]
sources: ["[[robotics-simulation-infrastructure]]"]
last_updated: 2026-05-13
---

# ManiSkill

ManiSkill 是 [[robotics-simulation-infrastructure|Robotics Simulation Infrastructure]] source 中讨论的 robotics simulation framework。文章作者 Stone Tao 明确把 ManiSkill 列为自己的 framework，并用它作为 direct Python API、batched rendering performance 和 pose abstraction 的主要例子。

在这篇 source 中，ManiSkill 代表一种 infrastructure trade-off：相比更 config-driven 的 Isaac Lab style，ManiSkill / MuJoCo Lab style 更接近 direct Python APIs，因此更 flexible 和 hackable，但 structure 与 serialization 需要额外设计。source 同时把 ManiSkill / SAPIEN 的 batched rendering design 描述为偏向 performance 和 GPU memory reduction，让 RL training 可以把更多 memory 用于 batch sizes、replay buffers 和 networks。

ManiSkill 的 `Pose` dataclass 是 source 的 API design case study：position 和 quaternion 被封装进 typed object，暴露 `p`、`q`、composition、inverse 和 heterogeneous input creation。source 的 claim 是这种 design 会让 pose manipulation 更接近 mathematical notation，并减少 call sites 的 variable/import burden；代价是多一层 Python dataclass indirection overhead。

当前 wiki 还没有 ingest ManiSkill official docs 或 repository snapshot，因此本页不记录 version、task list、backend architecture 或 benchmark claims。后续应补充 official docs/repo source，再把 framework-specific notes 从 blog lens 升级为更稳定的 implementation knowledge。

相关页面：[[RoboticsSimulationInfrastructure]]、[[SimulationRealityGap]]、[[TaskGeneralistPolicyEvaluation]]、[[MuJoCo]]、[[IsaacSim]]。
