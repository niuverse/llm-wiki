---
title: "NVlabs/RoboLab"
type: source
tags: [github, robotics, simulation, isaac-lab, benchmark]
sources: []
last_updated: 2026-04-27
source_file: raw/robolab-source.tar.gz
source_kind: repo
source_url: https://github.com/NVlabs/RoboLab
source_metadata: raw/robolab-main-commit.json
source_date: 2026-04-22
---

## 摘要

[[NVIDIA]] 的 `NVlabs/RoboLab` repository 是 [[RoboLab]] paper 的 official code artifact。该 repo 把 RoboLab 实现为 Isaac Lab 2.2.0 / Isaac Sim 5.0 上的 Python framework，包含 benchmark task library、USD assets、scene/task docs、environment registration、policy inference clients、evaluation scripts、results analysis 和 agentic scene/task generation skills。本次 ingest 保存了 `main` branch archive、README、GitHub repo metadata 和 main commit metadata；抓取时 main commit 为 `5d3ba41e551aced710b3d585b245a313a9a407ce`，author date 为 2026-04-22。

Repository 的核心工程判断是把 task definition 从 robot/policy implementation 中解耦。一个 task 是 scene、language instruction、termination conditions、subtasks 和 contact object list 的组合；environment registration 再把 task library 与 robot articulation、actions、observations、cameras、lighting、backgrounds、simulation timestep 和 render interval 组合成 Gymnasium/Isaac Lab runnable environments。这使 RoboLab 可以作为 [[TaskGeneralistPolicyEvaluation|policy evaluation]] substrate，而不是某个单一 robot 或 model 的 demo script。

Source URL: https://github.com/NVlabs/RoboLab

## 核心主张

- README 定义 RoboLab 为 task-based evaluation benchmark，包含 100+ manipulation tasks、automated success detection、server-client policy architecture 和 multi-environment parallel evaluation。
- Repository release 采用 CC-BY-NC-4.0，Python 为主；requirements 指向 Ubuntu 22.04+、Python 3.11、NVIDIA RTX GPU、Isaac Sim 5.0、Isaac Lab 2.2.0，assets 约占 7GB。
- `Task` dataclass 的 required surface 包括 `scene`、`instruction`、`terminations`、`episode_length_s` 和 `contact_object_list`；optional fields 包括 `subtasks`、`attributes`、`events`、`rewards` 和 `task_name`。
- Instruction field 支持 string 或 dict variants；runtime 通过 `instruction_type` 选择 vague/default/specific 等 variants，缺失时 fallback 到 default。
- `robolab.core.task.conditionals` 把 success/failure 定义成 atomic/composite predicates。Atomic predicates 包括 contact、containment、on-top、left/right/front/behind、upright、stationary 等；composite `pick_and_place` 把 object_grabbed 与 object_in_container/on_surface 串成 subtask。
- `SubtaskStateMachine` 处理 sequential subtasks；每个 subtask 内由 `ConditionalsStateMachine` 管理 parallel conditions、logical modes（all/any/choose）和 regression checking。Total score 由 completed subtask weights 与 current subtask progress normalized 得到。
- `WorldState` 是 predicate layer 的 state abstraction，缓存 local geometry，并暴露 pose、velocity、bbox、contact force、support detection 等 query；conditionals 支持 `env_id=None` 的 vectorized multi-env path 和 single-env scalar path。
- Environment registration 通过 `auto_discover_and_create_cfgs` 把 task files 与 observation/action/robot/camera/lighting/background configs 合成 environments；这正是 repo 实现 robot-agnostic 与 policy-agnostic 的地方。
- Policy evaluation 使用 server-client architecture。`InferenceClient` base class 把 `_extract_observation`、`_pack_request`、`_query_server`、`_unpack_response` 分离，并在 base 中处理 action chunking、per-env state 和 reset。
- Analysis tools 支持 per-task summary、attribute grouping、scene grouping、wrong-object-grasp counts、instruction-type comparison、trajectory metrics、CSV export 和 result consistency checks。
- Sensitivity analysis script 使用 Mixed Neural Posterior Estimation（MNPE）处理 continuous/categorical parameters，用于分析 lighting、camera pose、object pose 等 controlled perturbations 对 success outcome 的影响。

## 关键引文

- "Bring your own robot"
- "automated success/failure detection"
- "server-client architecture"

## 关联

- [[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]] - repo 对应的 arXiv paper source page。
- [[RoboLab]] - repo 实现的 benchmark/platform entity。
- [[TaskGeneralistPolicyEvaluation]] - repo 中 task/subtask/predicate/evaluation APIs 对应的概念页。
- [[SimulationSensitivityAnalysis]] - repo 中 posterior inference workflow 对应的概念页。
- [[VisionLanguageActionModels]] - repo 内置 OpenPI/π0 family、GR00T、DreamZero client examples，服务于 VLA-style policy evaluation。
- [[SimulationRealityGap]] - repo 通过 high-fidelity sim 与 controlled perturbations 分析 real-world policies，但其结果仍受 sim-to-real validity 约束。

## 开放问题

- Repo 当前不接受 pull requests，community scene/task submissions 计划未来开放；benchmark evolution 的 governance 仍未确定。
- Success predicates 在 many-object manipulation 中很实用，但对 deformables、tool-mediated effects、partial task repair 和 human-preference outcomes 是否足够？
- Server-client architecture 能兼容多种 model stacks，但 inference latency、action chunking 和 observation preprocessing 会不会成为跨-policy comparison 的 confounders？
- Repo docs 给出 sensitivity analysis tooling，但需要更多公开 runs 才能判断 MNPE posterior 是否可靠。
