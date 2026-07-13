---
title: "智能体式场景与任务生成"
type: concept
tags: [robotics, simulation, benchmark, asset-authoring, agents]
sources: ["[[nvlabs-robolab]]", "[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[robotics-simulation-infrastructure]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]"]
last_updated: 2026-07-13
---

# 智能体式场景与任务生成

智能体式场景/任务生成（智能体式场景/任务生成）指用 LLM/代码智能体把自然语言需求转成可运行仿真产物，同时用目录、判定条件求解器、模式、验证和重复项检查约束生成结果。[[RoboLab]] 代码仓库的 `/robolab-scenegen` 与 `/robolab-taskgen` Claude Code 技能是一个具体的示例：场景生成生成 USDA 场景，任务生成生成 `Task` 数据类；两者共同服务于可扩展基准任务库。

## 数学结构

一个生成工作流可以写成受约束的综合问题：

$$
\hat{a} = \arg\max_a P_\theta(a \mid u, C) \quad \text{s.t.} \quad V(a)=1,
$$

其中 $u$ 是用户自然语言提示，$C$ 是来源上下文（物体目录、场景格式、条件参考基准、现有任务），$a$ 是产物（场景文件或任务文件），$V(a)$ 是验证判定条件。对场景生成，产物可以拆成物体选择 $O$、判定条件集合 $P$ 和放置方案 $X$：

$$
(O,P) = f_\theta(u,C), \quad X = \mathrm{Solve}(O,P), \quad V_{scene}(O,P,X)=\mathbb{1}[\text{collision-free and format-valid}].
$$

对任务生成，产物是：

$$
T=(S,L,G,H,A,Q),
$$

其中 $S$ 是场景，$L$ 是指令变体，$G$ 是成功或终止条件，$H$ 是时域长度，$A$ 是属性与标签，$Q$ 是可选子任务。验证包括任务类去重、物体名称与场景图元匹配、条件函数签名检查、数据类可变默认值检查、元数据重新生成和环境注册测试。

```mermaid
flowchart LR
  U[自然语言请求] --> A[智能体读取目录/文档]
  A --> B[物体与判定条件方案]
  B --> C[求解器 / 结构规范验证]
  C --> D[USDA 场景]
  D --> E[任务指令 + 条件函数]
  E --> F[任务数据类]
  F --> G[元数据 / 注册 / 回合冒烟测试]
  G --> H[基准库候选]
```

## 直觉

LLM 生成机器人学场景/任务的难点不是写文本，而是让文本落到仿真器的硬约束上。RoboLab 的场景技能要求先读物体目录，使用准确物体名，把自然语言空间关系编译成判定条件，再用求解器找无碰撞的放置；任务技能要求场景已存在、物体名称对齐图元名称、成功条件显式映射到条件函数、指令变体分清默认/模糊的/特定的。这些约束把 “AI 生成的场景” 从自由生成的内容变成可验证产物。

这类工作流应该属于 [[RoboticsSimulationInfrastructure|仿真基础设施]]，因为它改变基准扩展成本和失败表面。更低的制作成本可以扩大任务库，但也引入 LLM 偏差、判定条件表达能力限制和验证盲点。它不能替代人类基准设计；更像是把人类意图转成初始产物，再通过求解器/测试/审查关卡筛选。

[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|EmbodiedGen V2]] 把这个模式扩展到完整可用于仿真的世界。它先把任务分解成场景要求和函数式的角色（机器人、背景、上下文、被操作的物体、干扰物），再用支撑关系、两两 IoU、可达性、SAPIEN 沉降和任务可供性检查筛选布局；有状态的氛围编程还要求每次编辑保持持久的世界状态，并让失败操作保持原子性、不能部分修改场景。这个情形说明智能体式制作的核心产物不只是生成代码或 USD 文件，而是 `world state + constraints + executable validation + edit transaction semantics`。

## 失效情形

- 目录不匹配：LLM 选中的物体名称不在目录或与 USD 图元名称不一致，导致场景/任务无法运行。
- 判定条件约束不足：自然语言中隐含的空间/包含/顺序约束没有被转成判定条件，求解器可能生成语义不符但无碰撞的场景。
- 求解器可行性失败：物体数量、尺寸或约束使放置不可行，需要减少物体或调整判定条件。
- 验证短视：场景格式与任务数据类通过了，但任务语义仍可能不公平、过于简单、过于含混或偏离基准轴。
- 基准偏差放大：如果 LLM 倾向生成常见物体/关系，新任务可能扩大数量但不扩大真实 OOD 覆盖范围。
- 治理差距：自动生成产物需要元数据、审查、重复项检查和可能的社区投稿策略，否则基准演化难以追溯。

## 实践含义

- 对任务库扩展，智能体式生成应输出产物 + 验证证据 + 理由，而不是只提交 `.usda` 或 `.py` 文件。
- 对 [[TaskGeneralistPolicyEvaluation|任务泛化评估]]，LLM 生成的任务必须标注能力轴、难度、物体分布和指令变体，才能避免把基准变成无结构的提示设置。
- 对 [[SimulationBenchmarkReportingPipeline|报告流程]]，生成的任务需要重新生成元数据，才能进入看板、分析分组和置信区间报告。
- 对 [[SimulationRealityGap|仿真到现实迁移]]，智能体式场景/任务生成可以提高覆盖范围，但不能证明现实世界迁移；仍需要物理/渲染/接触有效性和真实机器人检查。

相关页面：[[nvlabs-robolab]]、[[RoboLab]]、[[EmbodiedGen]]、[[SimulationReady3DWorldGeneration]]、[[RoboticsSimulationInfrastructure]]、[[TaskGeneralistPolicyEvaluation]]、[[SimulationBenchmarkReportingPipeline]]、[[SimulationRealityGap]]。
