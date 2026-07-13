---
title: "EmbodiedGen V2: An Agentic, Simulation-Ready 3D World Engine for Embodied AI"
type: source
tags: [robotics, embodied-ai, 3d-generation, simulation-infrastructure, agentic-generation, sim-to-real]
sources: []
last_updated: 2026-07-13
source_file: raw/embodiedgen-v2.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2607.07459
extracted_text: graph/extracts/embodiedgen-v2.md
source_date: 2026-07-08
project_url: https://horizonrobotics.github.io/EmbodiedGen/
code_url: https://github.com/HorizonRobotics/EmbodiedGen
---

## 摘要

Xinjie Wang、Liu Liu、Taojun Ding、Andrew Choi、Chaodong Huang、Mengao Zhao、Ziang Li、Jackson Jiang、Chunlei Yu、Shengxiang Liu、Wei Xu 和 Zhizhong Su 提出 [[EmbodiedGen]] V2：一个把开放式意图编译成可执行仿真环境的生成式三维世界引擎。相较 V1 主要生成孤立资产与全景背景，V2 用统一的物体/场景表示连接可用于仿真的资产生成、部件级可供性、任务驱动世界、多房间场景、有状态自然语言编辑、跨仿真器导出和下游策略学习。

V2 把“可用于仿真”定义为四项联合输出契约：公制几何、兼容仿真的物理资产、任务层级语义与可供性，以及标准化的仿真器接口。物体层级保存带纹理的视觉几何、碰撞几何、物理参数和可供性标注；场景层级使用类型化场景图表达背景、上下文、被操作物体、干扰物、机器人及其空间和交互关系，再把图结构落实为目标仿真器中物理稳定的六自由度位姿。

资产流程支持 TRELLIS、SAM3D、Hunyuan3D 等可插拔的后端，并通过 hierarchical QA、网格修复/simplification、CoACD 凸分解、纹理 baking、VLM 物理 property recovery 和 URDF→MJCF/USD 转换生成跨仿真器资产。可供性流程使用 P3-SAM、几何/VLM 合并、部件-逐项 VLM 语义、GraspGen 与 SAPIEN 执行测试，把物体部件连接到 queryable 语义和物理上 filtered 6-DoF grasps。

任务驱动的世界生成把自然语言任务分解为 `ROBOT`、`BACKGROUND`、`CONTEXT`、`MANIPULATED_OBJS`、`DISTRACTOR_OBJS`，生成 shallow rooted 场景图结构，通过在线生成或离线 retrieval 实例化节点，再用 BFS、支撑/IoU 约束、机器人可达性与重力沉降得到稳定布局。大规模规模模块生成房间拓扑图结构、可寻址的 furniture instances 和规范的 house 帧；氛围编程层则通过智能体–技能–harness、持久世界状态、类型化的工具 arguments、bounded 状态 delta、原子性提交与失败-不含-mutation 支持连续自然语言编辑。

## 核心主张

- 具身 3D 生成的工作单位应从 isolated 产物升级为完整的可执行的环境；几何、物理、可供性、任务语义、编辑历史与仿真器接口必须在共享表示中持续存在。
- 资产流程的完整配置在 200 个 held-out 资产上达到 96.5% 人类验收、98.6% scripted 碰撞/抓取成功，平均处理时间为 2.6±0.4 分钟；去掉网格 fixing 会把视觉网格从 1.43MB 放大到 51.63MB，并把处理时间提高到 21.3±22.8 分钟。
- CoACD 碰撞代理将平均碰撞网格从视觉网格层级 1.45MB 降到 0.29MB，并把 scripted 碰撞成功从 96.5% 提高到 98.6%；这个结果支持凸分解对接触可靠性与 batching 成本有帮助，但不等于所有任务上的操作成功。
- 可供性流程的主要瓶颈是部件分割。完整流程在 200 资产上达到 69.5% 分割 pass、99.3% 条件语义有效性、72.5% 条件抓取覆盖范围，最终端到端可供性 pass 比率只有 50.0%。
- 任务驱动的世界生成在 150 任务上生成 778 交互式资产 instances、覆盖 128 物体 categories；平均每个世界 5.19 个资产。完全在线顺序式的生成在单张 RTX 4090 上平均需要 47.7±5.4 分钟，其中背景生成占 25.5±3.5 分钟。
- 83.3% 最终交互式 worlds 无需人工修改即可进入下游仿真；其余主要失败来自任务-relation 错误、物体规模不匹配、局部几何 defect 与 unstable/imperfect 放置。
- 大规模规模生成把语言模型限制在房间范围 / 复杂度等 discrete 语义决策，把拓扑、traversability 与放置可行性交给 constrained 过程推理求解器；per-实例分解和凸代理物使背景可寻址、可替换、可组合。
- 氛围编程使用 Parse–地面–Invoke–提交循环。失败技能调用返回结构化的诊断信息且不修改世界状态；成功调用才原子性提交 bounded delta，并刷新仿真预览。
- 来源总结配套研究：生成的世界在线 RL 将仿真成功从 9.7% 提高到 79.8%；50-场景扩展将 OOD 成功从 53.2% 提高到 77.9%；结合域随机化的真实机器人成功从 21.7% 提高到 75.0%。这些数字是 V2 对其他研究的汇总，不是本来源内独立重做的策略实验。
- URDF、MJCF/XML 与 USD 转换证明同一标准化布局能被多个后端消费；它不证明 MuJoCo、Genesis、SAPIEN、Bullet 与 Isaac 系列具有相同接触定律、求解器行为或数值轨迹。

## 数学结构

任务驱动的放置把 child footprint $B_c(p_c)$ 放入父级支撑区域 $H_p$，同时避免和已放置 siblings $P_p$ 重叠：

$$
p_c \in H_p,\qquad \operatorname{Support}(B_c(p_c),H_p)=1,\qquad \operatorname{IoU}\left(B_c(p_c),\bigcup_{j\in P_p}B_j\right)=0.
$$

$p_c$ 是 child 候选位置；支撑判定条件排除悬空或支撑不足的放置；IoU 约束排除 footprint 重叠。被操作的物体还必须落在机器人可达且正向-facing 的交互区域中，失败时 resample 或使用 relation-特定的回退方案，最终通过 SAPIEN 重力沉降修正残余穿透/floating。

有状态的编辑的世界状态可以写成：

$$
S_t=(G_t,A_t,P_t,H_t),
$$

其中 $G_t$ 是类型化场景图，$A_t$ 是可用于仿真的资产，$P_t$ 是六自由度位姿，$H_t$ 是对话与技能调用历史。只有 `Invoke` 返回可行增量时才执行 $S_{t+1}=\operatorname{Commit}(S_t,\Delta S_t)$；失败时保持 $S_{t+1}=S_t$。

## 关键引文

- “complete executable environments”
- “bounded, physics-validated edits”
- “persistent world state”

## 关联

- [[EmbodiedGen]] - V1/V2 平台实体。
- [[SimulationReady3DWorldGeneration]] - V2 的双层表示、约束求解与验证技术栈。
- [[AgenticSceneTaskGeneration]] - 自然语言到场景图结构、类型化的技能、确定性求解器和可执行的产物。
- [[CollisionGeometryForRobotSimulation]] - 网格修复、视觉/碰撞分离、CoACD 代理物与接触可靠性证据。
- [[RoboticsSimulationInfrastructure]] - V2 把资产/世界制作、跨仿真器接口、编辑与 ML 循环连接成基础设施。
- [[SimulationRealityGap]] - 生成的环境、域随机化、跨仿真器语义与真实机器人迁移的证据边界。
- [[OpenUSDSceneComposition]] - V2 能输出 USD，但来源聚焦格式转换与运行时部署，不足以证明完整 OpenUSD 组合/layering strategy。
- [[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|EmbodiedGen V1]] - V2 的直接前身。
- [[embodiedgen-v1-v2-learning-map]] - 机制、证据与阅读顺序对照。

## 开放问题

- 人类验收、VLM 检查与 manual 跨验证的标注者一致性、类别分布和阈值敏感性如何？
- 完整可供性 pass 比率只有 50%；如何改善部件分割、细薄/凹形部件、多接触 grasps 与 non-并行-jaw 可供性？
- 跨仿真器导出后，同一场景的接触、沉降位姿、抓取成功、奖励和策略轨迹会偏离多少？
- VLM 推断的质量与摩擦，如何与真实测量值、系统辨识结果或按任务设定的随机化分布进行校准？
- 83.3% 世界验收是否能扩展到关节化的物体、deformables、工具 use、力控制-密集型任务与长时域 recovery？
- 生成的场景 diversity 对策略 improvement 的因果贡献如何与在线 RL、域随机化、pretrained 策略和 curriculum 设计分离？
- 氛围编程的语义落地歧义、历史漂移、concurrent 编辑、rollback/versioning 与大规模世界延迟如何评估？
- V2 是 2026-07-08 发布的 arXiv v1；代码发布、数据集版本、独立 reproduction 与 long-term 仿真器兼容性需要持续跟踪。
