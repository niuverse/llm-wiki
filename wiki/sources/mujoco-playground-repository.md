---
title: "MuJoCo Playground Repository"
type: source
tags: [robotics, reinforcement-learning, simulation, mujoco, repository]
sources: []
last_updated: 2026-06-05
source_file: raw/mujoco-playground-readme.md
source_kind: repo
source_url: https://github.com/google-deepmind/mujoco_playground
extracted_text: graph/extracts/mujoco-playground-readme.md
source_date: 2026-05-27
commit_snapshot: raw/mujoco-playground-main-commit.json
commit_sha: 33f1b2843a7ec5537c4882177aa2a9f236e9b692
---

## 摘要

这是 [[MuJoCoPlayground|MuJoCo Playground]] official repository README snapshot。README 把它定义为 built with MuJoCo MJX 的 GPU-accelerated environments suite，用于 robot learning research and sim-to-real。它覆盖 classic control、quadruped/biped locomotion、non-prehensile and dexterous manipulation，并通过 MJWarp Batch Renderer 支持 vision-based environments。

对 wiki 的价值是把 [[MuJoCo]] ecosystem 中的 environment suite / learning recipes route 与 [[MJWarp]]、MJX 和 sim-to-real 连接起来。README 还说明当前支持 both MJX JAX implementation and MuJoCo Warp at HEAD，这让 MuJoCo Playground 成为比较 JAX/MJX 与 Warp execution paths 的 practical entrypoint。

## 核心主张

- MuJoCo Playground 是 GPU-accelerated robot learning and sim-to-real environment suite。
- Built with MuJoCo MJX，并且 README note 表示现在支持 MJX JAX implementation 与 MuJoCo Warp implementation。
- Features 包括 classic control、quadruped and biped locomotion、non-prehensile and dexterous manipulation、vision support via MJWarp Batch Renderer。
- Installation 支持 PyPI `playground`，但 README 推荐从 source 安装以获得 latest MuJoCo features / fixes。
- CLI examples 包括 `train-jax-ppo --env_name CartpoleBalance` 和 `--impl warp`。
- README 明确记录 reproducibility / GPU precision issue：Ampere GPUs 上 JAX 默认 TF32 matmul 可能影响 RL training stability，建议设置 `JAX_DEFAULT_MATMUL_PRECISION=highest`。
- README license/disclaimer 表示 Apache-2.0 且不是 officially supported Google product。

## 关键引文

- "GPU-accelerated environments"
- "robot learning research and sim-to-real"
- "MuJoCo MJX"
- "MJWarp Batch Renderer"

## 关联

- [[MuJoCoPlayground]] - 本 source 对应的 framework/entity。
- [[MuJoCo]]、[[MJWarp]] - MuJoCo Playground 连接 MJX 和 MJWarp paths。
- [[HeterogeneousRobotRLTraining]] - 它代表 GPU-accelerated environment suite / learning recipe route。
- [[SimulationRealityGap]] - sim-to-real claim 需要具体 task/hardware evidence；README 本身只支持 framework capability boundary。

## 开放问题

- README 是 repository snapshot，不等价于 technical report；若要写 benchmark-level claims，应 ingest MuJoCo Playground paper / technical report。
- JAX precision/reproducibility issue 提示 benchmark comparisons 需要记录 accelerator architecture 与 matmul precision settings。
