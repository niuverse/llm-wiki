---
title: "UniLab"
type: entity
tags: [robotics, reinforcement-learning, simulation, systems]
sources: ["[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]", "[[unilab-repository]]", "[[mujocouni-persistent-batched-runtime-primitives-for-mujoco]]", "[[motrixsim-documentation]]"]
last_updated: 2026-06-05
---

# UniLab

UniLab 是 [[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab paper]] 提出的 heterogeneous CPU-simulation / GPU-learning robot RL training system。它的核心定位不是新 policy optimization algorithm，而是 training runtime architecture：CPU-batched physics backends 负责 data generation，GPU learner 负责 policy/value updates，runtime 负责 data movement、buffering、scheduling 和 parameter synchronization。

Source 中 UniLab 当前连接两个 CPU-side simulation backends：MuJoCoUni 和 MotrixSim。算法层支持 PPO、APPO、FastSAC 和 FlashSAC，用这些算法分别覆盖 strict synchronization、near-on-policy overlap 和 replay-based producer-consumer regimes。source 报告它在 representative robot-control tasks 上取得 3-10× end-to-end training efficiency gain，并展示 Apple macOS、AMD ROCm、Intel XPU execution evidence。

[[unilab-repository|UniLab repository]] 把 paper-level architecture 落到 repo contract：CPU physics simulation、unified shared memory 和 GPU policy training 被暴露为统一 CLI 与 Hydra task/backend config。README 列出 MuJoCoUni 与 MotrixSim backends，以及 PPO、MLX PPO、APPO、SAC、TD3 和 FlashSAC 等算法入口。[[mujocouni-persistent-batched-runtime-primitives-for-mujoco|MuJoCoUni technical report]] 补强了 CPU-batched side：`BatchEnvPool` 维护 persistent environments、per-thread `mjData` workers 和 stateful batched primitives，同时不改 MuJoCo core solver/contact/integrator。[[motrixsim-documentation|MotrixSim docs]] 目前只支持 high-level engine positioning，不能推出具体 solver-level equivalence。

UniLab 对本 wiki 的意义是把 [[RoboticsSimulationInfrastructure|robotics simulation infrastructure]] 的问题推进到 runtime critical path：training speed 不只由 physics backend env steps/s 决定，还由 learner utilization、replay boundary、H2D transfer、buffer slotting 和 weight sync 决定。它也为 [[HeterogeneousRobotRLTraining]] 提供 source-backed case：GPU simulation 是有效路径，但不是 efficient robot RL training 的唯一系统组织方式。

相关页面：[[HeterogeneousRobotRLTraining]]、[[RoboticsSimulationInfrastructure]]、[[SimulationRealityGap]]、[[MuJoCoUni]]、[[MotrixSim]]、[[MuJoCo]]。
