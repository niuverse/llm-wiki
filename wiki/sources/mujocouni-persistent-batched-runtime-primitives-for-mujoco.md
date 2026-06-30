---
title: "MuJoCoUni: Persistent Batched Runtime Primitives for MuJoCo"
type: source
tags: [robotics, simulation, mujoco, reinforcement-learning, systems]
sources: []
last_updated: 2026-06-05
source_file: raw/mujocouni-persistent-batched-runtime-primitives-for-mujoco.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2605.24922
extracted_text: graph/extracts/mujocouni-persistent-batched-runtime-primitives-for-mujoco.md
source_date: 2026-05-24
repo_url: https://github.com/unilabsim/mujoco_uni
repo_readme: raw/mujocouni-readme.md
repo_commit_snapshot: raw/mujocouni-main-commit.json
repo_commit_sha: 5d782a2bb8569f2c79059c9845cae5147dd684a2
---

## 摘要

Yufei Jia 和 Junzhe Wu 提出 [[MuJoCoUni]]，一个 downstream MuJoCo distribution，用于 online robot learning 与 batched physics evaluation。它的核心对象是 `BatchEnvPool`：C++ / pybind11 executor 持有 per-environment `mjModel` copies、per-thread `mjData` workers 和 internal thread pool，面向 repeated environment stepping、sparse reset、reset-lifecycle domain randomization、batched sensor forward、site Jacobian 和 height-field queries。

这篇 source 对 [[HeterogeneousRobotRLTraining]] 的新增价值是明确 CPU-batched route 的 boundary：MuJoCoUni 不改 MuJoCo solver、contact model、integrator 或 core source tree；它把 throughput improvement 放在 Python binding layer、object lifetime、thread scheduling 和 stateful batched interface 上。因此它不是 GPU simulation 的替代宣言，而是当任务需要 upstream CPU MuJoCo semantics、debuggability 或 feature coverage 时的一条 complementary path。

## 核心主张

- Upstream `mujoco.rollout` 适合 open-loop full trajectory generation；MuJoCoUni 的 `BatchEnvPool` 适合 stateful online robot RL runtime。
- `BatchEnvPool` 维护 persistent environment pool，而不是每次 call 都由外部重建 models、data、reset semantics 和 randomization lifecycle。
- Core primitives 包括 `step`、`forward`、`reset`、`compute_site_jacobians` 和 `sample_hfield_height`。
- `reset(env_ids, initial_state, randomization=None)` 支持 sparse reset，只处理 selected terminated environments；randomization payload 的 leading dimension 匹配 reset subset。
- Reset-time patches 支持 `body_mass`、`body_ipos`、`body_iquat`、`body_inertia`、`dof_armature`、`gravity`、`geom_friction`、`kp`、`kd` 等 fields，其中部分 fields 需要 `mj_setConst` refresh。
- Geometry-level randomization 通过 precompiled compatible model variants 处理，不被简单 field patches 覆盖。
- Source 明确说 implementation confined to Python binding layer，MuJoCo physics kernel and solver unchanged。

## 关键引文

- "stateful environment execution"
- "BatchEnvPool"
- "upstream CPU MuJoCo semantics"
- "without changing the physics kernel"

## 关联

- [[MuJoCoUni]] - 本 source 对应的 runtime entity。
- [[MuJoCo]] - MuJoCoUni 保留 MuJoCo CPU physics semantics。
- [[HeterogeneousRobotRLTraining]] - MuJoCoUni 是 UniLab 中 CPU-batched simulation side 的代表 backend。
- [[SimulationRealityGap]] - reset-lifecycle domain randomization 与 backend semantics 会影响 training distribution。

## 开放问题

- Repo README snapshot 当前更像 upstream MuJoCo README，MuJoCoUni-specific API 主要来自 technical report；需要后续 code/docs ingest 来验证 `BatchEnvPool` API 在 package release 中的具体状态。
- Source 提供 benchmark/validation framing，但当前 wiki 尚未 ingest scripts、tests 和 package release metadata。
