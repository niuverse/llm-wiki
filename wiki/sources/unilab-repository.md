---
title: "UniLab Repository"
type: source
tags: [robotics, reinforcement-learning, simulation, systems, repository]
sources: []
last_updated: 2026-07-13
source_file: raw/unilab-readme.md
source_kind: repo
source_url: https://github.com/unilabsim/UniLab
extracted_text: graph/extracts/unilab-readme.md
source_date: 2026-06-04
commit_snapshot: raw/unilab-main-commit.json
commit_sha: 2a9e8ae635811a7385bb8ac111acb25f8c819a6c
---

## 摘要

这是 [[UniLab]] 的官方 GitHub README 快照，补充 [[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab 论文]] 的实现-facing 证据。README 把 UniLab 定位为“不依赖 GPU 仿真后端的机器人 RL 训练”系统：CPU 物理仿真通过统一的共享内存向 GPU 策略训练发送转移，支持 MuJoCo / Motrix 后端与 CUDA、MPS、ROCm、XPU accelerator 路径。

对知识库来说，这个来源的价值是把论文层级架构落到代码仓库契约：`uv run train` / `uv run eval` / `uv run demo` 作为统一 CLI，Hydra owner YAML 负责任务、奖励、后端、算法组合，后端选择通过 `task=<task>/<backend>` 显式表达。它还列出文档 entrypoints、后端支撑矩阵、开发者指南与 ADR 索引，说明 UniLab 把运行时架构当作代码仓库层级治理表面。

## 核心主张

- README 明确说 UniLab 的运行路径是 CPU-并行仿真 + 共享内存缓冲区 + GPU 策略学习。
- 代码仓库支持 MuJoCoUni 与 MotrixSim 两个物理后端，并把后端 switching 放到任务 owner 配置中。
- 统一的 CLI 覆盖 PPO、MLX PPO、APPO、SAC、TD3、FlashSAC；HORA 和 HIM-PPO 是脚本层级流程。
- 跨平台设置覆盖 Linux CUDA、Linux ROCm、Linux XPU 和 Apple Silicon / macOS；README 仍建议使用 `uv` 流程。
- Demo / 训练示例覆盖 G1 dance / wallflip / boxtracking、Sharpa in-手部、Go2 移动操作等任务。
- README 指向 English 文档、训练指南、仿真后端支撑矩阵、开发者 standard 和 ADR 索引，说明代码仓库把契约、layering 和验证边界文档化。

## 关键引文

- "Train robot RL without a GPU simulation backend."
- "CPU Physics Sim"
- "Unified Shared Memory"
- "GPU Policy Training"

## 关联

- [[UniLab]] - 代码仓库对应的系统实体。
- [[HeterogeneousRobotRLTraining]] - 代码仓库把论文中的运行时抽象具体化为 CLI、任务/后端配置和开发者契约。
- [[MuJoCoUni]] 与 [[MotrixSim]] - README 明确列出的物理后端。

## 开放问题

- README 是主分支快照，不等价于固定发布；后续如果要复现实验，应补充发布标签、文档版本、依赖锁定文件和基准脚本。
- 来源没有展开实现 internals；共享内存缓冲区、工作线程生命周期、运行时调度器与重放路径仍需要代码层级收录或文档页面补强。
