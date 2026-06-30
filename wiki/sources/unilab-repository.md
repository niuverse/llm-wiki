---
title: "UniLab Repository"
type: source
tags: [robotics, reinforcement-learning, simulation, systems, repository]
sources: []
last_updated: 2026-06-05
source_file: raw/unilab-readme.md
source_kind: repo
source_url: https://github.com/unilabsim/UniLab
extracted_text: graph/extracts/unilab-readme.md
source_date: 2026-06-04
commit_snapshot: raw/unilab-main-commit.json
commit_sha: 2a9e8ae635811a7385bb8ac111acb25f8c819a6c
---

## 摘要

这是 [[UniLab]] 的 official GitHub README snapshot，补充 [[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab paper]] 的 implementation-facing evidence。README 把 UniLab 定位为“不依赖 GPU simulation backend 的 robot RL training”系统：CPU physics simulation 通过 unified shared memory 向 GPU policy training 发送 transitions，支持 MuJoCo / Motrix backends 与 CUDA、MPS、ROCm、XPU accelerator paths。

对 wiki 来说，这个 source 的价值是把 paper-level architecture 落到 repository contract：`uv run train` / `uv run eval` / `uv run demo` 作为统一 CLI，Hydra owner YAML 负责 task、reward、backend、algorithm 组合，backend selection 通过 `task=<task>/<backend>` 显式表达。它还列出 documentation entrypoints、backend support matrix、developer guide 与 ADR index，说明 UniLab 把 runtime architecture 当作 repo-level governance surface。

## 核心主张

- README 明确说 UniLab 的运行路径是 CPU-parallel simulation + shared-memory buffer + GPU policy learning。
- Repository 支持 MuJoCoUni 与 MotrixSim 两个 physics backends，并把 backend switching 放到 task owner config 中。
- Unified CLI 覆盖 PPO、MLX PPO、APPO、SAC、TD3、FlashSAC；HORA 和 HIM-PPO 是 script-level workflows。
- Cross-platform setup 覆盖 Linux CUDA、Linux ROCm、Linux XPU 和 Apple Silicon / macOS；README 仍建议使用 `uv` workflow。
- Demo / training examples 覆盖 G1 dance / wallflip / boxtracking、Sharpa in-hand、Go2 loco-manipulation 等 tasks。
- README 指向 English docs、training guide、simulation backends support matrix、developer standard 和 ADR index，说明 repo 把 contracts、layering 和 validation boundaries 文档化。

## 关键引文

- "Train robot RL without a GPU simulation backend."
- "CPU Physics Sim"
- "Unified Shared Memory"
- "GPU Policy Training"

## 关联

- [[UniLab]] - repository 对应的 system entity。
- [[HeterogeneousRobotRLTraining]] - repository 把 paper 中的 runtime abstraction 具体化为 CLI、task/backend config 和 developer contracts。
- [[MuJoCoUni]] 与 [[MotrixSim]] - README 明确列出的 physics backends。

## 开放问题

- README 是 main branch snapshot，不等价于固定 release；后续如果要复现实验，应补充 release tag、docs version、dependency lockfile 和 benchmark scripts。
- Source 没有展开 implementation internals；shared-memory buffer、worker lifecycle、runtime scheduler 与 replay path 仍需要 code-level ingest 或 docs page 补强。
