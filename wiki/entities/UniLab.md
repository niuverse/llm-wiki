---
title: "UniLab"
type: entity
tags: [robotics, reinforcement-learning, simulation, systems]
sources: ["[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]", "[[unilab-repository]]", "[[mujocouni-persistent-batched-runtime-primitives-for-mujoco]]", "[[motrixsim-documentation]]"]
last_updated: 2026-07-13
---

# UniLab

UniLab 是 [[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab 论文]] 提出的异构 CPU-仿真 / GPU-学习机器人 RL 训练系统。它的核心定位不是新策略优化算法，而是训练运行时架构：CPU-批处理的物理后端负责数据生成，GPU 学习器负责策略/价值更新，运行时负责数据移动、缓冲、scheduling 和参数同步。

来源中 UniLab 当前连接两个 CPU 侧仿真后端：MuJoCoUni 和 MotrixSim。算法层支持 PPO、APPO、FastSAC 和 FlashSAC，用这些算法分别覆盖严格同步、near-在策略重叠和重放基于生产者—消费者 regimes。来源报告它在 representative 机器人控制任务上取得 3-10× 端到端训练效率 gain，并展示 Apple macOS、AMD ROCm、Intel XPU 执行证据。

[[unilab-repository|UniLab 代码仓库]] 把论文层级架构落到代码仓库契约：CPU 物理仿真、统一的共享内存和 GPU 策略训练被暴露为统一 CLI 与 Hydra 任务/后端配置。README 列出 MuJoCoUni 与 MotrixSim 后端，以及 PPO、MLX PPO、APPO、SAC、TD3 和 FlashSAC 等算法入口。[[mujocouni-persistent-batched-runtime-primitives-for-mujoco|MuJoCoUni 技术报告]] 补强了 CPU-批处理的侧：`BatchEnvPool` 维护持久的环境、每个线程 `mjData` 工作线程和有状态的批处理的基元，同时不改 MuJoCo core 求解器/接触/积分器。[[motrixsim-documentation|MotrixSim 文档]] 目前只支持高层引擎 positioning，不能推出具体求解器层级等价性。

UniLab 对本知识库的意义是把 [[RoboticsSimulationInfrastructure|机器人学仿真基础设施]] 的问题推进到运行时关键路径：训练速度不只由物理后端 env 步骤/s 决定，还由学习器利用率、重放边界、H2D 迁移、缓冲区 slotting 和权重同步决定。它也为 [[HeterogeneousRobotRLTraining]] 提供有来源支持的情形：GPU 仿真是有效路径，但不是高效机器人 RL 训练的唯一系统组织方式。

相关页面：[[HeterogeneousRobotRLTraining]]、[[RoboticsSimulationInfrastructure]]、[[SimulationRealityGap]]、[[MuJoCoUni]]、[[MotrixSim]]、[[MuJoCo]]。
