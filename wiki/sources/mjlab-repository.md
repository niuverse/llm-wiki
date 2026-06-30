---
title: "mjlab Repository"
type: source
tags: [robotics, reinforcement-learning, simulation, mujoco, repository]
sources: []
last_updated: 2026-06-05
source_file: raw/mjlab-readme.md
source_kind: repo
source_url: https://github.com/mujocolab/mjlab
extracted_text: graph/extracts/mjlab-readme.md
source_date: 2026-06-04
commit_snapshot: raw/mjlab-main-commit.json
commit_sha: 1d1474040c3887af8419e20a682a132e7bc3fe86
---

## 摘要

这是 [[Mjlab|mjlab]] official repository README snapshot。README 把 mjlab 定位为把 [[IsaacLab|Isaac Lab]] manager-based API 与 [[MJWarp|MuJoCo Warp]] GPU-accelerated physics 结合起来的 robot learning framework，强调 composable environment building blocks、minimal dependencies 和 direct access to native MuJoCo data structures。

对 wiki 的价值是补上 GPU-accelerated MuJoCo training framework 的 repo-level evidence：mjlab 不是纯 physics backend，而是 task/API + training framework；它通过 velocity tracking、motion imitation、dummy-agent MDP sanity check 和 distributed training examples，把 manager-based environment composition 接到 MJWarp execution path。

## 核心主张

- mjlab combines Isaac Lab's manager-based API with MuJoCo Warp。
- Framework 提供 composable building blocks for environment design，并保留 direct access to native MuJoCo data structures。
- Training requires NVIDIA GPU；macOS supported for evaluation only。
- README examples 覆盖 Unitree G1 velocity tracking、multi-GPU training、motion imitation、zero/random dummy agents for MDP sanity checks。
- Docs、tests、formatting、development commands 和 release/PyPI badges 表示它是 active implementation repository。
- README citation 指向 arXiv 2601.22074，paper v2 last revised 2026-02-25。

## 关键引文

- "Isaac Lab's manager-based API"
- "MuJoCo Warp"
- "minimal dependencies"
- "direct access to native MuJoCo data structures"

## 关联

- [[Mjlab|mjlab]] - 本 source 对应的 framework entity。
- [[MJWarp]] - mjlab 的 physics backend。
- [[IsaacLab]] - mjlab 借鉴的 manager-based API。
- [[HeterogeneousRobotRLTraining]] - mjlab 是 GPU-resident / GPU-oriented training stack 中强调 modular API 与 MuJoCo transparency 的 route。

## 开放问题

- README 不完整覆盖 paper 的 design rationale；若要写更深 mechanism，应后续 ingest arXiv 2601.22074 PDF。
- Source 表明 macOS only for evaluation，不能支持 macOS training portability claims。
