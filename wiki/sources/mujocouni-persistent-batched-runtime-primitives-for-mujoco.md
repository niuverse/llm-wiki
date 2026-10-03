---
title: "MuJoCoUni: Persistent Batched Runtime Primitives for MuJoCo"
type: source
tags: [robotics, simulation, mujoco, reinforcement-learning, systems, source-backed]
sources: []
modified: 2026-10-04
source_file: raw/mujocouni-persistent-batched-runtime-primitives-for-mujoco.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2605.24922
extracted_text: graph/extracts/mujocouni-persistent-batched-runtime-primitives-for-mujoco.md
source_date: 2026-05-24
repo_url: https://github.com/unilabsim/mujoco_uni
repo_readme: raw/mujocouni-readme.md
repo_commit_snapshot: raw/mujocouni-main-commit.json
repo_commit_sha: 5d782a2bb8569f2c79059c9845cae5147dd684a2
source_type: paper
paper_title: "MuJoCoUni: Persistent Batched Runtime Primitives for MuJoCo"
year: 2026
venue: "arXiv 技术报告"
reviewed: 2026-10-04
topics: ["topics/robot-policy-learning", "topics/physics-simulation", "topics/robot-learning-systems"]
---

## 一屏概览

**问题。** 在线机器人强化学习反复执行短步进、读传感器、重置少量终止环境。即使物理计算本身足够快，频繁进入 Python、重复管理对象和返回整段轨迹，也会增加训练循环的开销。

**贡献。** Yufei Jia、Junzhe Wu 的 MuJoCoUni 在 MuJoCo 的 Python 绑定层加入 `BatchEnvPool`：持久保存每环境模型副本、每线程工作数据和线程池，提供短步进、稀疏重置及批量查询。**物理求解器、接触模型和积分器不变；贡献是接口与资源生命周期的组织。**

**证据范围。** 2026-05-24 的 [arXiv v1 技术报告](https://arxiv.org/abs/2605.24922)共 11 页。作者在一台 16 线程 CPU 机器上报告物理吞吐量和接口微基准；这不是端到端策略训练对比，也不证明优于所有 GPU 后端。以下章节、表图定位均指这份归档全文。

## 方法：把重复交互变成一个持久环境池

### 与完整轨迹接口的分工

上游 `mujoco.rollout` 接收初态和开环控制序列，返回形状为 $(N,T,d)$ 的轨迹；$N$ 为环境数，$T$ 为步数，$d$ 为状态维数。它可以复用线程池，但环境模型、重置和随机化生命周期仍由调用方管理。MuJoCoUni 的 `step` 接收初态和短控制序列，只返回 $(N,d)$ 的最终状态，以及可选的最终传感器数据。它省去不需要的中间输出；需要逐时刻完整轨迹的系统辨识、轨迹优化仍适合 `rollout`。（§2.1、§3.1，表 1）

`BatchEnvPool(model, nbatch=N, nthread=W)` 为每个环境复制一个 `mjModel`，为每个工作线程创建一个 `mjData`。因此它**不是每环境一份完整 `mjData` 的所有权设计**，也不是把当前状态完全藏进对象后直接无参步进：`step`、`forward` 等仍显式接收状态数组。持久的是模型、工作资源与交互生命周期。（§3.2–3.3，图 1）

### 五个基元及其计算含义

| 基元 | 做什么 | 对学习循环的作用 |
| --- | --- | --- |
| `step(initial_state, nstep, control)` | 对全池调用 `mj_step`，返回短窗口最终状态 | 降低逐环境 Python 调用和中间轨迹写出开销 |
| `forward(initial_state)` | 调用 `mj_forward`，不推进时间 | 从当前状态建立观测、刷新传感器 |
| `reset(env_ids, initial_state, randomization)` | 只处理指定子集 | 重置和随机化开销随实际终止环境数变化 |
| `compute_site_jacobians` | 先算位置阶段，再调用 `mj_jacSite` | 提供末端控制、奖励和逆运动学所需的雅可比 |
| `sample_hfield_height` | 在高度场上双线性插值 | 批量构造局部地形高度或离地间隙 |

位点雅可比的输出为 $(N,K,3,n_v)$，$K$ 为位点数，$n_v$ 为广义速度维数；位置、旋转雅可比分别返回。高度查询支持偏航对齐、世界对齐和完整机体对齐；间隙为机体参考高度减地形高度。若步进后要使传感器严格对应最终状态，接口另有 `post_step_forward_sensor=True`，不能把所有返回传感器一概视为自动额外前向计算后的值。（§3.3，表 2）

### 随机化绑定到重置生命周期

重置载荷首维必须是 `len(env_ids)`，不是全池 $N$。修改质量、质心、惯量坐标、惯量和关节附加惯量后，需要调用 `mj_setConst` 刷新派生常量；重力、摩擦、位置执行器的刚度和阻尼则直接写入。几何尺寸、网格尺度等变化通过预先编译的兼容模型变体处理，不能等同于任意运行时字段修改。（§3.2、§3.4，表 3）

### 一次在线控制循环怎样用这些基元

**按 §3 接口构造的教学例子。** 设有 $N=1024$ 个环境、$W=16$ 个工作线程，一个策略动作保持 5 个物理步。调用方保存形状为 $(1024,d_s)$ 的当前状态，构造 $(1024,5,d_a)$ 的控制序列；$d_s,d_a$ 分别是该状态与控制规格的维数。`step` 返回最终状态，任务层据此计算奖励和终止。若只有环境 7、19、801 结束，`reset` 的状态与随机化载荷首维应为 **3**，再把返回的三行写回全局状态数组；不能把全池状态误传成子集载荷。

调用方下一轮仍传入完整当前状态；池内每环境模型保存其随机化参数，16 份工作数据轮流处理 1024 个环境。这种所有权安排解释了“持久环境池”与“环境状态必须完全封装在对象内部”并不是同一个要求。

若只需要每次控制末端的状态，完整轨迹输出要写出 $5N d_s$ 个状态数值，最终状态输出只需 $N d_s$ 个，传感器亦可按需求选择。这是**输出规模的计数**，不是物理步数减为五分之一：内部仍执行全部 5 个积分步。类似地，批量位点雅可比把广义速度 $\dot q\in\mathbb R^{n_v}$ 映射为末端线速度 $J_p\dot q$ 与角速度 $J_r\dot q$，每块 $J_p,J_r$ 均为 $3\times n_v$；批处理只是让环境与位点两个索引成为前导维度，不改变雅可比本身的数学含义。

## 验证与性能证据

实验使用 Ubuntu 20.04、Intel i9-14900HX、16 仿真线程、MuJoCoUni 3.8.0、Python 3.13、NumPy 2.4。模型设置 `discardvisual` 排除视觉几何；C++ 路径预热 5 次、计时 50 次，Python 基线重复次数较少。以下均为**作者报告，未在本库复跑**。（§4.1）

| 检查 | 结果 | 能支持的结论与定位 |
| --- | --- | --- |
| 数值一致性与接口测试 | 脚本覆盖 `step` 对 `rollout`、`forward` 对逐环境前向，以及构造、载荷、随机化、查询 | 报告说明测试覆盖；正文未给逐项误差表，不能写成所有状态与模型的严格等价证明；§4.2 |
| 四模型步进 | 饱和吞吐量约为 Allegro 180 万、Go1 120 万、Franka 41 万、Humanoid 29 万步／秒 | 约 256–512 环境时 16 线程池充分利用；§4.3，图 2 |
| 模型副本开销 | Go1、Allegro 在饱和区的共享模型与模型变体吞吐接近 | 有限两模型结果，不表示模型复制没有内存成本；§4.4，图 3 |
| Go1 全重置 | 4096 环境：C++ 3.5 ms，Python 循环 53 ms，约 15 倍 | 重置接口微基准；部分重置随子集大小变化；§4.5，图 4 |
| Franka 位点雅可比 | 4096 环境：0.53 ms 对 11.9 ms，约 22 倍 | 单个位点查询微基准；§4.6，图 5 |
| 高度场采样 | 4096 环境、每环境 $4\times4$ 点：0.52 ms 对 290 ms，约 555 倍 | 特定楼梯地形与 Python 循环基线；§4.7，图 6 |

这些倍数不能相乘，也不能替换成 RL 训练加速比：只优化重置或查询时，整体收益仍取决于它们在训练总时间中的占比。

## 局限与我们的解释

**作者明确的限制。** 每环境模型副本增加内存；几何随机化需要兼容的预编译模型；重置修改限于已注册字段。任务逻辑、奖励、控制器、数据管理、日志和分布式调度由上层承担。（§5、§6.1）

**我们的解释。** MuJoCoUni 的可复用思路是让接口输出与消费者需求相符，并把资源所有权和重置时序变得明确。它在 [[HeterogeneousRobotRLTraining|异构机器人强化学习训练]] 中提供 CPU 侧基元，但没有单独验证完整异构训练架构；端到端证据应读 [[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab]]。保留 [[MuJoCo|MuJoCo]] 语义不等于消除 [[SimulationRealityGap|仿真—现实差距]]。

## 资料与关联

[论文对应代码仓库](https://github.com/unilabsim/mujoco_uni)和 [基准仓库](https://github.com/unilabsim/mujoco_uni_bench)由正文 §6.3 指出。已有 README 与提交快照的路径继续保留于元数据；本次完整复核对象是技术报告，没有重新审计实现或确认当前发布包。旧页中重复的“MuJoCoUni 实体介绍”已并入本页。

## 研究归属

[[topics/robot-policy-learning|机器人策略学习]] · [[topics/physics-simulation|物理仿真]] · [[topics/robot-learning-systems|训练系统怎样提高有效学习效率]]。
