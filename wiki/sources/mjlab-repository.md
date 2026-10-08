---
title: "mjlab Repository"
type: source
tags: [robotics, reinforcement-learning, simulation, mujoco, repository, source-backed]
sources: []
modified: 2026-10-04
source_file: raw/mjlab-readme.md
source_kind: repo
source_url: https://github.com/mujocolab/mjlab
extracted_text: graph/extracts/mjlab-readme.md
source_date: 2026-06-04
commit_snapshot: raw/mjlab-main-commit.json
commit_sha: 1d1474040c3887af8419e20a682a132e7bc3fe86
topics: ["topics/robot-policy-learning", "topics/physics-simulation", "topics/robot-learning-systems"]
source_type: repository
code_files:
  - raw/code-mjlab-src-mjlab-scripts-train-py-2026-10-04-25da18c990b2.py
  - raw/code-mjlab-src-mjlab-envs-manager-based-rl-env-py-2026-10-04-df814fc0ad36.py
  - raw/code-mjlab-src-mjlab-tasks-cartpole-cartpole-env-cfg-py-2026-10-04-f37800dc7d21.py
  - raw/code-mjlab-src-mjlab-tasks-cartpole-init-py-2026-10-04-161dd6cccab6.py
  - raw/code-mjlab-src-mjlab-tasks-registry-py-2026-10-04-f1c82c8f1ff5.py
  - raw/code-mjlab-src-mjlab-rl-vecenv-wrapper-py-2026-10-04-d458aa421d72.py
  - raw/code-mjlab-src-mjlab-sim-sim-py-2026-10-04-e9e7eb9bb404.py
nav_title: "mjlab · Code"
---

## 定位与阅读范围

mjlab 将 [[isaac-lab-repository|Isaac Lab]] 风格的管理器接口接到 [[mujoco-warp-mjwarp-documentation|MuJoCo Warp]]，用任务配置组织观测、奖励、动作与事件，用 PyTorch 训练器消费批量仿真数据。本页完整读取固定提交的七个关键文件，沿 `Mjlab-Cartpole-Balance` 说明控制流；没有安装依赖、执行训练或验证性能。README 明确训练要求 NVIDIA GPU，macOS 仅支持评估；源码存在备用执行分支，不足以扩大这一支持范围。

## 从任务注册到训练器

任务注册表保存环境、训练器以及单独的评估配置，加载时深拷贝，避免命令行修改污染注册模板。Cartpole 注册平衡与摆起两个任务；训练入口通过任务名生成 `TrainConfig`，按 GPU 配置选择单进程或分布式启动，每个进程创建环境、可选录像包装器和 `RslRlVecEnvWrapper`，再创建默认的 `MjlabOnPolicyRunner` 或任务指定训练器。入口在训练器可能修改配置之前保存环境和智能体 YAML，然后调用 `learn()`。（注册表第 1–71 行；训练入口第 49–258 行）

```mermaid
flowchart LR
  A["任务配置与命令行覆盖"] --> B["MuJoCo 模型编译"]
  B --> C["MJWarp 批量模型和数据"]
  C --> D["管理器生成观测与奖励"]
  D --> E["RSL-RL 接口与 PyTorch 策略"]
  E --> F["动作与物理子步"]
  F --> D
```

图是依据代码重画的模块关系。模型编译与策略学习是不同阶段：前者建立仿真结构，后者反复消费环境转移。本次未读取外部 RSL-RL 更新器内部，也未展开全部场景、传感器与桥接实现。

## Cartpole 配置揭示了什么

平衡与摆起共用同一构造函数，区别之一是摆杆初始角度分别接近 0 与 π。智能体与价值网络都接收五维状态：小车位置、摆角的余弦和正弦、小车速度、摆角速度。把角度拆成正余弦，可避免角度跨过周期接缝时数值突然跳变；这是对表示的解释。

动作通过原 XML 中的执行器施力，配置缩放为 1。密集奖励将直立、居中、小控制量与小摆角速度因子相乘；这与 [[isaac-lab-repository|Isaac Lab Cartpole]] 的奖励加权和不同。物理步长为 0.01 s，每次动作执行 5 个子步，即控制频率 20 Hz；回合上限 50 s，仅配置超时终止。默认环境数为 1，批量训练必须通过配置覆盖环境数；不能从框架支持批量直接推断该示例默认就是数千环境。PPO 配置为两层各 64 单元网络、每环境采样 32 步、500 次训练迭代。（`cartpole_env_cfg.py` 第 97–309 行）

## 物理循环和重置的顺序

`ManagerBasedRlEnv.step()` 先处理动作，按 `decimation` 次数应用动作、写场景并推进物理，再计算终止与奖励。此版本特意说明：计算奖励和终止时，部分派生量仍落后一个物理子步；随后对已结束环境自动重置，并统一调用一次 `forward()` 更新运动学，再计算指令、事件、传感器和最终观测。读奖励项时应检查它依赖的是直接状态还是派生状态，不能假定所有字段都处于完全相同的刷新时刻。（环境第 378–475 行）

默认 `auto_reset=True`。若关闭，环境保留终止状态，并要求用户在下一次推进前重置待结束环境；默认训练包装器没有替用户实现这套手工管理。包装器将 `terminated | truncated` 转为 `dones`，非有限时域配置额外提供 `time_outs`。因此自动重置和价值自举的语义必须与训练器一起检查，见 [[PolicyDeploymentContract|执行接口]]。

## 为什么批量随机化会影响 CUDA 图

`Simulation` 先用 `MjSpec` 编译 CPU MuJoCo 模板，再创建 MJWarp 模型与多个世界的数据，用桥接对象提供张量访问。在支持的 CUDA 条件下，步进、前向计算、重置和传感计算会捕获为 CUDA 图；不满足条件时直接调用相应 MJWarp 运算。（`sim.py` 第 218–350 行）

关键约束是图捕获了数组地址。某个模型字段最初可以在所有环境间共享，但按环境随机化时需要扩展为每个世界独有的字段。`expand_model_fields()` 分配新的数组后会清理桥接缓存、重建相关传感上下文并重新捕获图；改变质量等参数还可能需要重算派生常量。仅改一个 Python 配置对象不等于已经正确更新全部设备侧数据。（第 398–449 行）

**我们的解释：** 框架不仅把物理后端换成 GPU，还必须管理“哪些参数共享、哪些参数逐环境变化、何时刷新派生量、何时重建执行图”。这些是实现 [[DomainRandomization|域随机化]] 的成本与正确性条件；静态代码不能证明其实际开销，也不能证明所有随机化路径都无额外数据复制。

## 固定版本与已读代码

原 README、提交快照与来源日期保留在页首。以下文件均完整阅读并另存不可变原文，未执行第三方脚本。正文行号均指此提交；本地清单同时登记 SHA-256。

| 官方文件（固定提交） | 本地原文快照 |
|---|---|
| [src/mjlab/scripts/train.py](https://github.com/mujocolab/mjlab/blob/1d1474040c3887af8419e20a682a132e7bc3fe86/src/mjlab/scripts/train.py)，1–258 行 | `raw/code-mjlab-src-mjlab-scripts-train-py-2026-10-04-25da18c990b2.py` |
| [src/mjlab/envs/manager_based_rl_env.py](https://github.com/mujocolab/mjlab/blob/1d1474040c3887af8419e20a682a132e7bc3fe86/src/mjlab/envs/manager_based_rl_env.py)，1–591 行 | `raw/code-mjlab-src-mjlab-envs-manager-based-rl-env-py-2026-10-04-df814fc0ad36.py` |
| [src/mjlab/tasks/cartpole/cartpole_env_cfg.py](https://github.com/mujocolab/mjlab/blob/1d1474040c3887af8419e20a682a132e7bc3fe86/src/mjlab/tasks/cartpole/cartpole_env_cfg.py)，1–309 行 | `raw/code-mjlab-src-mjlab-tasks-cartpole-cartpole-env-cfg-py-2026-10-04-f37800dc7d21.py` |
| [src/mjlab/tasks/cartpole/__init__.py](https://github.com/mujocolab/mjlab/blob/1d1474040c3887af8419e20a682a132e7bc3fe86/src/mjlab/tasks/cartpole/__init__.py)，1–20 行 | `raw/code-mjlab-src-mjlab-tasks-cartpole-init-py-2026-10-04-161dd6cccab6.py` |
| [src/mjlab/tasks/registry.py](https://github.com/mujocolab/mjlab/blob/1d1474040c3887af8419e20a682a132e7bc3fe86/src/mjlab/tasks/registry.py)，1–71 行 | `raw/code-mjlab-src-mjlab-tasks-registry-py-2026-10-04-f1c82c8f1ff5.py` |
| [src/mjlab/rl/vecenv_wrapper.py](https://github.com/mujocolab/mjlab/blob/1d1474040c3887af8419e20a682a132e7bc3fe86/src/mjlab/rl/vecenv_wrapper.py)，1–107 行 | `raw/code-mjlab-src-mjlab-rl-vecenv-wrapper-py-2026-10-04-d458aa421d72.py` |
| [src/mjlab/sim/sim.py](https://github.com/mujocolab/mjlab/blob/1d1474040c3887af8419e20a682a132e7bc3fe86/src/mjlab/sim/sim.py)，1–545 行 | `raw/code-mjlab-src-mjlab-sim-sim-py-2026-10-04-e9e7eb9bb404.py` |

## 研究归属

[[topics/robot-policy-learning|机器人策略学习]] · [[topics/physics-simulation|物理仿真]] · [[topics/robot-learning-systems|RL 训练系统]]。
