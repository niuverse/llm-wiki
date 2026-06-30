---
title: "ManiSkill Repository"
type: source
tags: [robotics, simulation, manipulation, reinforcement-learning, repository]
sources: []
last_updated: 2026-06-05
source_file: raw/maniskill-readme.md
source_kind: repo
source_url: https://github.com/haosulab/ManiSkill
extracted_text: graph/extracts/maniskill-readme.md
source_date: 2026-05-20
commit_snapshot: raw/maniskill-main-commit.json
commit_sha: ea2e7faf6b37742e0147147ad125b6d114722698
---

## 摘要

这是 [[ManiSkill]] official repository README snapshot。README 把 ManiSkill 3 定位为 powered by SAPIEN 的 open-source robot simulation and training framework，重点是 manipulation skills、GPU-parallelized simulation/rendering、heterogeneous parallel scenes、real2sim / sim2real examples 和 tuned learning baselines。

对 wiki 的价值是把此前来自 engineering blog 的 ManiSkill lens 升级为 official repo evidence：ManiSkill 不只是 direct Python API example；它明确提供 GPU parallelized visual data collection、state-based simulation、heterogeneous simulation、task building API、real2sim environments、sim2real examples，以及 PPO/SAC/TD-MPC2、BC、Diffusion Policy 和 VLA baselines。

## 核心主张

- ManiSkill 是 SAPIEN-powered open-source robot simulation and training framework。
- README claims GPU parallelized RGBD + segmentation collection can reach 30,000+ FPS on a 4090 GPU。
- 支持 GPU parallelized simulation、heterogeneous simulation（parallel environments can have different scenes/objects）和 object-oriented task building API。
- Example tasks 覆盖 humanoids、mobile manipulators、single-arm robots、tabletop、drawing/cleaning、dexterous manipulation。
- 提供 real2sim environments、sim2real examples、RL / IL / VLA baselines。
- System support table shows Linux/NVIDIA supports CPU sim、GPU sim、rendering；Windows/MacOS support is more limited, especially GPU simulation。
- Assets are CC BY-NC 4.0 while rigid body environments use permissive licenses such as Apache-2.0。

## 关键引文

- "GPU parallelized heterogeneous simulation"
- "30,000+ FPS"
- "Real2sim environments"
- "Sim2real examples"

## 关联

- [[ManiSkill]] - 本 source 对应的 framework entity。
- [[RoboticsSimulationInfrastructure]] - ManiSkill 是 simulation framework API / rendering / ML integration 的 concrete case。
- [[HeterogeneousRobotRLTraining]] - ManiSkill 是 GPU-parallelized simulation/rendering route，和 UniLab 的 CPU-simulation / GPU-learning route 构成对照。
- [[TaskGeneralistPolicyEvaluation]] - ManiSkill 的 broad task/baseline claims可作为 future benchmark/source plan 的入口。

## 开放问题

- README 支持 capability summary，但 detailed architecture、benchmark protocol 和 sim-to-real evidence 需要 ManiSkill3 paper / docs 单独 ingest。
- System support table 显示跨平台限制，不能把 Linux/NVIDIA GPU results 外推到 Windows/MacOS GPU simulation。
