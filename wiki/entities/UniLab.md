---
title: "UniLab"
type: entity
tags: [robotics, reinforcement-learning, simulation, systems]
sources: ["[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]"]
last_updated: 2026-06-05
---

# UniLab

UniLab 是 [[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab paper]] 提出的 heterogeneous CPU-simulation / GPU-learning robot RL training system。它的核心定位不是新 policy optimization algorithm，而是 training runtime architecture：CPU-batched physics backends 负责 data generation，GPU learner 负责 policy/value updates，runtime 负责 data movement、buffering、scheduling 和 parameter synchronization。

Source 中 UniLab 当前连接两个 CPU-side simulation backends：MuJoCoUni 和 MotrixSim。算法层支持 PPO、APPO、FastSAC 和 FlashSAC，用这些算法分别覆盖 strict synchronization、near-on-policy overlap 和 replay-based producer-consumer regimes。source 报告它在 representative robot-control tasks 上取得 3-10× end-to-end training efficiency gain，并展示 Apple macOS、AMD ROCm、Intel XPU execution evidence。

UniLab 对本 wiki 的意义是把 [[RoboticsSimulationInfrastructure|robotics simulation infrastructure]] 的问题推进到 runtime critical path：training speed 不只由 physics backend env steps/s 决定，还由 learner utilization、replay boundary、H2D transfer、buffer slotting 和 weight sync 决定。它也为 [[HeterogeneousRobotRLTraining]] 提供 source-backed case：GPU simulation 是有效路径，但不是 efficient robot RL training 的唯一系统组织方式。

相关页面：[[HeterogeneousRobotRLTraining]]、[[RoboticsSimulationInfrastructure]]、[[SimulationRealityGap]]、[[MuJoCo]]。
