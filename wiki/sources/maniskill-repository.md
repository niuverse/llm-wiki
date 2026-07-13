---
title: "ManiSkill Repository"
type: source
tags: [robotics, simulation, manipulation, reinforcement-learning, repository]
sources: []
last_updated: 2026-07-13
source_file: raw/maniskill-readme.md
source_kind: repo
source_url: https://github.com/haosulab/ManiSkill
extracted_text: graph/extracts/maniskill-readme.md
source_date: 2026-05-20
commit_snapshot: raw/maniskill-main-commit.json
commit_sha: ea2e7faf6b37742e0147147ad125b6d114722698
---

## 摘要

这是 [[ManiSkill]] 官方代码仓库 README 快照。README 把 ManiSkill 3 定位为 powered 由 SAPIEN 的开源机器人仿真与训练框架，重点是操作技能、GPU-并行化的仿真/渲染、异构并行场景、real2sim / sim2real 示例和 tuned 学习基线。

对知识库的价值是把此前来自工程博客的 ManiSkill 视角升级为官方代码仓库证据：ManiSkill 不只是直接使用 Python 的 API 示例；它明确提供 GPU 并行化的视觉数据采集、状态基于仿真、异构仿真、任务 building API、real2sim 环境、sim2real 示例，以及 PPO/SAC/TD-MPC2、BC、扩散策略和 VLA 基线。

## 核心主张

- ManiSkill 是 SAPIEN-powered 开源机器人仿真与训练框架。
- README 表示，在一张 4090 GPU 上，并行采集 RGBD 图像和分割结果可达到每秒 30,000 帧以上。
- 支持 GPU 并行化的仿真、异构仿真（并行环境 can have different 场景/物体）和物体定向的任务 building API。
- 示例任务覆盖人形机器人、移动操作机器人、单机械臂机器人、桌面任务、绘制与清理，以及灵巧操作。
- 提供 real2sim 环境、sim2real 示例、RL / IL / VLA 基线。
- System 支撑表格 shows Linux/NVIDIA supports CPU sim、GPU sim、渲染；Windows/MacOS 支撑 is more limited, especially GPU 仿真。
- 资产 are CC 由-NC 4.0 而刚体环境 use permissive licenses such 作为 Apache-2.0。

## 关键引文

- "GPU parallelized heterogeneous simulation"
- "30,000+ FPS"
- "Real2sim environments"
- "Sim2real examples"

## 关联

- [[ManiSkill]] - 本来源对应的框架实体。
- [[RoboticsSimulationInfrastructure]] - ManiSkill 是仿真框架 API / 渲染 / ML 集成的具体的情形。
- [[HeterogeneousRobotRLTraining]] - ManiSkill 是 GPU-并行化的仿真/渲染路线，和 UniLab 的 CPU-仿真 / GPU-学习路线构成对照。
- [[TaskGeneralistPolicyEvaluation]] - ManiSkill 的 broad 任务/基线主张可作为未来基准/来源 plan 的入口。

## 开放问题

- README 支持 capability 摘要，但 detailed 架构、基准协议和仿真到现实迁移证据需要 ManiSkill3 论文 / 文档单独收录。
- 系统支撑表格显示跨平台限制，不能把 Linux/NVIDIA GPU 结果外推到 Windows/MacOS GPU 仿真。
