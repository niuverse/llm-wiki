---
title: "MuJoCo Playground Repository"
type: source
tags: [robotics, reinforcement-learning, simulation, mujoco, repository, source-backed]
sources: []
modified: 2026-09-25
source_file: raw/mujoco-playground-readme.md
source_kind: repo
source_url: https://github.com/google-deepmind/mujoco_playground
extracted_text: graph/extracts/mujoco-playground-readme.md
source_date: 2026-05-27
commit_snapshot: raw/mujoco-playground-main-commit.json
commit_sha: 33f1b2843a7ec5537c4882177aa2a9f236e9b692
---

## 摘要

这是 [[mujoco-playground-repository|MuJoCo Playground]] 官方代码仓库 README 快照。README 把它定义为基于 MuJoCo MJX 的 GPU 加速的环境套件，用于机器人学习研究与仿真到现实迁移。它覆盖 classic 控制、quadruped/biped 移动、non-prehensile 与灵巧操作，并通过 MJWarp 批次渲染器支持基于视觉的环境。

对知识库的价值是把 [[MuJoCo]] 生态中的环境套件 / 学习 recipes 路线与 [[mujoco-warp-mjwarp-documentation|MJWarp]]、MJX 和仿真到现实迁移连接起来。README 还说明当前支持 both MJX JAX 实现与 MuJoCo Warp 在输出头，这让 MuJoCo Playground 成为比较 JAX/MJX 与 Warp 执行路径的实用的 entrypoint。

## 核心主张

- MuJoCo Playground 是 GPU 加速的机器人学习与仿真到现实迁移环境套件。
- 项目基于 MuJoCo MJX 构建，README 说明现在同时支持 MJX 的 JAX 实现与 MuJoCo Warp 实现。
- 特征包括 classic 控制、quadruped 与 biped 移动、non-prehensile 与灵巧操作、视觉支撑通过 MJWarp 批次渲染器。
- 安装支持 PyPI `playground`，但 README 推荐从来源安装以获得 latest MuJoCo 特征 / fixes。
- CLI 示例包括 `train-jax-ppo --env_name CartpoleBalance` 和 `--impl warp`。
- README 明确记录可复现性 / GPU 精度 issue：Ampere GPUs 上 JAX 默认 TF32 matmul 可能影响 RL 训练稳定性，建议设置 `JAX_DEFAULT_MATMUL_PRECISION=highest`。
- README 的许可证与免责声明表明：项目采用 Apache-2.0 许可证，但并非 Google 官方支持的产品。

## 关键引文

- "GPU-accelerated environments"
- "robot learning research and sim-to-real"
- "MuJoCo MJX"
- "MJWarp Batch Renderer"

### MuJoCoPlayground

MuJoCo Playground 是 [[mujoco-playground-repository|官方代码仓库 README]] 中描述的 GPU 加速的环境套件，用于机器人学习研究与仿真到现实迁移，基于 MuJoCo MJX。它覆盖 classic 控制、quadruped/biped 移动、non-prehensile 与灵巧操作，并通过 [[mujoco-warp-mjwarp-documentation|MJWarp]] 批次渲染器支持基于视觉的环境。

README 表示 MuJoCo Playground 当前支持 MJX JAX 实现和 MuJoCo Warp 实现在输出头。它因此是 [[MuJoCo]] 生态中连接环境套件、学习 recipes、JAX/MJX、Warp 渲染和仿真到现实迁移示例的实用的 entrypoint。README 同时提示 Ampere GPUs 上 JAX 默认 TF32 matmul 可能影响 RL 训练稳定性，需要记录精度场景。

## 关联

- [[mujoco-playground-repository|MuJoCoPlayground]] - 本来源对应的框架/实体。
- [[MuJoCo]]、[[mujoco-warp-mjwarp-documentation|MJWarp]] - MuJoCo Playground 连接 MJX 和 MJWarp 路径。
- [[HeterogeneousRobotRLTraining]] - 它代表 GPU 加速的环境套件 / 学习 recipe 路线。
- [[SimulationRealityGap]] - 仿真到现实迁移主张需要具体任务/硬件证据；README 本身只支持框架 capability 边界。

## 开放问题

- README 是代码仓库快照，不等价于技术报告；若要写基准层级主张，应收录 MuJoCo Playground 论文 / 技术报告。
- JAX 精度/可复现性 issue 提示基准比较需要记录 accelerator 架构与 matmul 精度场景。
