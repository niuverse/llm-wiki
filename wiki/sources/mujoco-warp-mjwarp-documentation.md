---
title: "MuJoCo Warp (MJWarp) Documentation"
type: source
tags: [robotics, simulation, mujoco, gpu, documentation]
sources: []
last_updated: 2026-06-05
source_file: raw/mujoco-warp-mjwarp-documentation.html
source_kind: html
source_url: https://mujoco.readthedocs.io/en/latest/mjwarp/
extracted_text: graph/extracts/mujoco-warp-mjwarp-documentation.md
source_date: unknown
repo_readme: raw/mujoco-warp-readme.md
repo_commit_snapshot: raw/mujoco-warp-main-commit.json
repo_commit_sha: fb56eb0820aa22252a9ec869408484ac86d2b869
---

## 摘要

这是 official MuJoCo documentation 中的 [[MJWarp]] page snapshot，并附带 `google-deepmind/mujoco_warp` README / commit snapshot。Docs 把 MJWarp 定义为用 NVIDIA Warp 实现、为 NVIDIA hardware 和 parallel simulation 优化的 MuJoCo implementation，由 NVIDIA 与 Google DeepMind 共同开发维护。

对 wiki 的价值是给 GPU-resident / GPU-oriented MuJoCo route 增加官方边界：MJWarp 适合 high-throughput sampling and reinforcement learning，但不以 low-latency single-step control 为目标；它支持 `nworld` batched worlds、device-side `mjw.Model` / `mjw.Data`、batch rendering 和 per-world batched model fields，同时有 explicit feature gaps、float32 differences、nondeterminism 和 nondifferentiability boundary。

## 核心主张

- MJWarp 是 MuJoCo written in Warp and optimized for NVIDIA hardware and parallel simulation。
- MuJoCo ecosystem 的 batched options 包括 CPU `mujoco.rollout`、JAX/MJX 和 `mujoco_warp.step`；docs 明确把它们按 throughput / device path 区分。
- MJWarp 适合 large number of samples / RL；MuJoCo CPU 更适合 low-latency online control、MPC 或 interactive teleoperation。
- Docs 说 MJWarp 在 many geoms / DoFs 的 scenes 中比 MJX scaling better，但 complex scenes 仍有 limitations，超过 60 DoFs 可能有 performance degradation。
- `mjw.Model` 和 `mjw.Data` 是 device-side variants，部分 unsupported features 缺失。
- Feature parity 有例外：docs/README 提到 unsupported PGS / noslip、某些 integrator/fluid/flex/sensor/plugin/user parameter cases；differentiability via Warp 尚不可用。
- Batch rendering 支持 mesh/texture、heightfield、flex rendering、heterogeneous multi-camera、lighting/shadows 和 per-world domain-randomizable visual fields。
- Docs FAQ 明确 MJWarp GPU execution may be nondeterministic；README also notes NVIDIA GPU required for fast simulation while CPU can support development/debugging。

## 关键引文

- "optimized for NVIDIA hardware and parallel simulation"
- "well suited for applications where large numbers of samples are required"
- "Feature Parity"
- "MJWarp is not currently differentiable"

## 关联

- [[MJWarp]] - 本 source 对应的 GPU-oriented MuJoCo backend entity。
- [[MuJoCo]] - MJWarp 是 MuJoCo ecosystem 的 GPU implementation。
- [[Mjlab|mjlab]] 和 [[MuJoCoPlayground]] - README 明确指向这两个 robot learning integration paths。
- [[HeterogeneousRobotRLTraining]] - MJWarp 是 GPU-side physics route 的代表，与 MuJoCoUni / UniLab 的 CPU-side route 构成对照。
- [[DifferentiablePhysics]] - MJWarp 当前不支持 Warp automatic differentiation，不能把 GPU MuJoCo route 自动等同于 differentiable physics。

## 开放问题

- Docs 是 `latest` snapshot；要复现实验需要 pinned version / release tag。
- Feature parity 和 performance caveats 会快速变化，应后续按版本重查。
- Current source 支持 runtime boundary，不支持把 MJWarp numerical behavior 与 CPU MuJoCo 完全等价。
