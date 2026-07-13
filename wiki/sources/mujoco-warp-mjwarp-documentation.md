---
title: "MuJoCo Warp (MJWarp) Documentation"
type: source
tags: [robotics, simulation, mujoco, gpu, documentation]
sources: []
last_updated: 2026-07-13
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

这是官方 MuJoCo 文档中的 [[MJWarp]] 页面快照，并附带 `google-deepmind/mujoco_warp` README / 提交快照。文档把 MJWarp 定义为用 NVIDIA Warp 实现、为 NVIDIA 硬件和并行仿真优化的 MuJoCo 实现，由 NVIDIA 与 Google DeepMind 共同开发维护。

对知识库的价值是给驻留 GPU 的 / 面向 GPU 的 MuJoCo 路线增加官方边界：MJWarp 适合高吞吐量采样与强化学习，但不以低延迟单一步骤控制为目标；它支持 `nworld` 批处理的 worlds、设备侧 `mjw.Model` / `mjw.Data`、批次渲染和 per-世界批处理模型字段，同时有显式特征 gaps、float32 differences、nondeterminism 和 nondifferentiability 边界。

## 核心主张

- MJWarp 是用 Warp 编写、针对 NVIDIA 硬件和并行仿真优化的 MuJoCo 实现。
- MuJoCo 生态的批处理 options 包括 CPU `mujoco.rollout`、JAX/MJX 和 `mujoco_warp.step`；文档明确把它们按吞吐量 / 设备路径区分。
- MJWarp 适合大规模数值的样本 / RL；MuJoCo CPU 更适合低延迟在线控制、MPC 或交互式遥操作。
- 文档说 MJWarp 在大量 geoms / DoFs 的场景中比 MJX 扩展更好的，但复杂的场景仍有局限，超过 60 DoFs 可能有性能 degradation。
- `mjw.Model` 和 `mjw.Data` 是设备侧变体，部分不支持的特征缺失。
- 特征一致性有例外：文档/README 提到不支持的 PGS / noslip、某些积分器/fluid/flex/传感器/插件/用户参数情形；可微性通过 Warp 尚不可用。
- 批次渲染支持网格/纹理、heightfield、flex 渲染、异构多相机、光照/shadows 和 per-世界域-randomizable 视觉字段。
- 文档 FAQ 明确 MJWarp GPU 执行可能不具确定性；README 还指出 NVIDIA GPU 必需用于快速仿真而 CPU can 支撑 development/调试。

## 关键引文

- "optimized for NVIDIA hardware and parallel simulation"
- "well suited for applications where large numbers of samples are required"
- "Feature Parity"
- "MJWarp is not currently differentiable"

## 关联

- [[MJWarp]] - 本来源对应的面向 GPU 的 MuJoCo 后端实体。
- [[MuJoCo]] - MJWarp 是 MuJoCo 生态的 GPU 实现。
- [[Mjlab|mjlab]] 和 [[MuJoCoPlayground]] - README 明确指向这两个机器人学习集成路径。
- [[HeterogeneousRobotRLTraining]] - MJWarp 是 GPU 侧物理路线的代表，与 MuJoCoUni / UniLab 的 CPU 侧路线构成对照。
- [[DifferentiablePhysics]] - MJWarp 当前不支持 Warp 自动微分，不能把 GPU MuJoCo 路线自动等同于可微的物理。

## 开放问题

- 文档是 `latest` 快照；要复现实验需要 pinned 版本 / 发布 tag。
- 特征一致性和性能 caveats 会快速变化，应后续按版本重查。
- 当前来源支持运行时边界，不支持把 MJWarp 数值行为与 CPU MuJoCo 完全等价。
