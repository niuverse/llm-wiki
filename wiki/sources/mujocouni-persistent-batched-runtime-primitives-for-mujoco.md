---
title: "MuJoCoUni: Persistent Batched Runtime Primitives for MuJoCo"
type: source
tags: [robotics, simulation, mujoco, reinforcement-learning, systems]
sources: []
last_updated: 2026-07-13
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

Yufei Jia 和 Junzhe Wu 提出 [[MuJoCoUni]]，一个用于在线机器人学习与批量物理评估的 MuJoCo 下游发行版。它的核心对象是 `BatchEnvPool`：由 C++ / pybind11 实现的执行器为每个环境持有一份 `mjModel`，为每个线程配备 `mjData` 工作实例和内部线程池，面向重复的环境步进、稀疏重置、重置时域随机化、批量传感器前向计算、位点雅可比矩阵和高度场查询。

这篇来源对 [[HeterogeneousRobotRLTraining]] 的新增价值是明确 CPU-批处理路线的边界：MuJoCoUni 不改 MuJoCo 求解器、接触模型、积分器或 core 来源树；它把吞吐量 improvement 放在 Python 绑定层、物体生命周期、thread scheduling 和有状态的批处理接口上。因此它不是 GPU 仿真的替代宣言，而是当任务需要 upstream CPU MuJoCo 语义、debuggability 或特征覆盖范围时的一条 complementary 路径。

## 核心主张

- Upstream `mujoco.rollout` 适合开环完整轨迹生成；MuJoCoUni 的 `BatchEnvPool` 适合有状态的在线机器人 RL 运行时。
- `BatchEnvPool` 维护持久环境数据池，而不是每次调用都由外部重建模型、数据、重置语义和随机化生命周期。
- Core 基元包括 `step`、`forward`、`reset`、`compute_site_jacobians` 和 `sample_hfield_height`。
- `reset(env_ids, initial_state, randomization=None)` 支持稀疏重置，只处理选中的已终止环境；随机化载荷的首维与重置子集大小一致。
- 重置时间 patches 支持 `body_mass`、`body_ipos`、`body_iquat`、`body_inertia`、`dof_armature`、`gravity`、`geom_friction`、`kp`、`kd` 等字段，其中部分字段需要 `mj_setConst` 更新。
- 几何层级随机化通过 precompiled 兼容的模型变体处理，不被简单字段 patches 覆盖。
- 来源明确说实现局限到 Python 绑定层，MuJoCo 物理内核与求解器未改变。

## 关键引文

- "stateful environment execution"
- "BatchEnvPool"
- "upstream CPU MuJoCo semantics"
- "without changing the physics kernel"

## 关联

- [[MuJoCoUni]] - 本来源对应的运行时实体。
- [[MuJoCo]] - MuJoCoUni 保留 MuJoCo CPU 物理语义。
- [[HeterogeneousRobotRLTraining]] - MuJoCoUni 是 UniLab 中 CPU-批处理仿真侧的代表后端。
- [[SimulationRealityGap]] - 重置生命周期域随机化与后端语义会影响训练分布。

## 开放问题

- 代码仓库 README 快照当前更像 upstream MuJoCo README，MuJoCoUni-特定的 API 主要来自技术报告；需要后续代码/文档收录来验证 `BatchEnvPool` API 在软件包发布中的具体状态。
- 来源提供基准/验证 framing，但当前知识库尚未收录脚本、测试和软件包发布元数据。
