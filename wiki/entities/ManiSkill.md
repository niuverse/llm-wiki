---
title: "ManiSkill"
type: entity
tags: [robotics, simulation, reinforcement-learning, manipulation]
sources: ["[[robotics-simulation-infrastructure]]"]
last_updated: 2026-07-13
---

# ManiSkill

ManiSkill 是 [[robotics-simulation-infrastructure|机器人学仿真基础设施]] 来源中讨论的机器人学仿真框架。文章作者 Stone Tao 明确把 ManiSkill 列为自己的框架，并用它作为直接使用 Python 的 API、批处理的渲染性能和位姿抽象的主要例子。

在这篇来源中，ManiSkill 代表一种基础设施取舍：相比配置驱动程度更高的 Isaac Lab 风格，ManiSkill / MuJoCo Lab 风格更接近直接使用 Python API，因此更灵活、也更便于修改，但结构与序列化需要额外设计。来源同时认为 ManiSkill / SAPIEN 的批量渲染设计更偏重性能和减少 GPU 内存占用，让强化学习训练可以把更多内存用于更大的批次、经验回放缓冲区和神经网络。

ManiSkill 的 `Pose` 数据类是来源中的 API 设计案例：位置和四元数被封装进类型化对象，并暴露 `p`、`q`、组合、求逆和异构输入创建。来源认为，这种设计让位姿操作更接近数学记号，并减少调用位置携带的变量与导入负担；代价是增加一层 Python 数据类间接访问开销。

当前知识库还没有收录 ManiSkill 官方文档或代码仓库快照，因此本页不记录版本、任务列表、后端架构或基准主张。后续应补充官方文档/代码仓库来源，再把框架特定的笔记从博客视角升级为更稳定的实现知识。

相关页面：[[RoboticsSimulationInfrastructure]]、[[SimulationRealityGap]]、[[TaskGeneralistPolicyEvaluation]]、[[MuJoCo]]、[[IsaacSim]]。
