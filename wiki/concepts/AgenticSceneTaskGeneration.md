---
title: "智能体式场景与任务生成"
type: concept
tags: [robotics, simulation, benchmark]
sources: ["[[nvlabs-robolab]]", "[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[robotics-simulation-infrastructure]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]"]
modified: 2026-10-04
topics: ["topics/assets-and-world-generation", "topics/simulation-ready-worlds"]
---

# 智能体式场景与任务生成

智能体式场景与任务生成把语言目标转成对象、空间关系、任务条件与可执行环境。核心困难是让这些表示互相一致：描述合理的场景可能碰撞，稳定的场景可能无法完成任务，能完成的任务也可能被错误的成功判定器计分。[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab]] 与 [[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|EmbodiedGen V2]] 分别展示了谓词约束生成和类型化世界生成的路线。

## 语义提议与执行验证

```mermaid
flowchart LR
  L["语言意图"] --> S["对象、关系与任务条件"]
  S --> G["几何约束与放置"]
  G --> P["物理稳定性检查"]
  P --> T["任务初态与执行检查"]
  T --> C["提交场景或记录失败"]
  C --> S
```

这是对两套系统的共同机制所作的整理。每条返回路径都应保留失败原因；不能仅让语言模型再说一次“合理”。

RoboLab 将场景描述变成空间谓词，再由求解器放置物体、减少碰撞，运行约 300 个物理步检查稳定性，并把检查结果反馈给生成过程。任务生成另外提出语言指令与成功条件。**生成能被解析的任务定义，不等于验证机器人能够完成它。** 原文的 812 个生成任务由语言模型评审意图对齐和条件完整性；76% 完整率不是机器人执行成功率。[§III-D、§IV-D、附录 C] [[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|实验与判定范围]]

EmbodiedGen V2 为场景树节点规定五类角色，以父子关系约束支撑、包含与附着等放置语义，再按广度优先顺序求解对象位置。可达性、尺寸与重叠检查将任务意图落实为几何约束，物理沉降补充静态几何检查遗漏的稳定性。多房间生成另处理房间拓扑、家具配置和坐标，不是把小场景提示词简单加长。[§2.4–2.5] [[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|V2 机制]]

## 编辑已有世界需要状态语义

V2 的编辑器维护对象图、资产、位姿和编辑历史。语言模型选择类型化技能并绑定对象；技能产生有界修改，验证通过后才提交。可写为教学抽象：

$$
S_{t+1}=\begin{cases}\operatorname{commit}(S_t,\Delta_t),&\operatorname{valid}(S_t,\Delta_t),\\ S_t,&\text{否则}.\end{cases}
$$

$S_t$ 是当前世界，$\Delta_t$ 是本次编辑。该表达解释事务式提交的直觉，不代表任意机器人执行或物理仿真都能回滚；论文保证的是其编辑流程中的世界状态修改。[V2 §2.6]

## 一个“苹果放入碗里”的任务需要三份状态

**教学例子：** 语言目标是苹果最终在碗内；初始布局应把苹果放在机器人可接近的桌面上；成功判定器则需要在执行后检查所选苹果与所选碗之间的关系。把最终目标直接当成初始布局，会生成无需行动就成功的任务。对象名、场景图实例和判定器参数若没有绑定到同一对象，还可能拿了一个苹果却给另一个苹果计分。

因此生成器至少要交付“初态、目标、判定”之间的对应，而不是只有漂亮场景。[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|V2]] 的初态已满足目标是这种错误的实测案例；[[nvlabs-robolab|RoboLab 实现]] 的香蕉入碗例子则展示判定进一步细化为几何关系、接触和夹爪分离。具体几何与代码留在来源页，本概念强调三者必须一致。

## 应分别检查哪些错误

| 检查 | 典型错误 | 验证边界 |
| --- | --- | --- |
| 引用和类型 | 指令引用不存在的物体，技能参数与对象类型不符 | 合法引用不证明语义正确 |
| 空间与稳定性 | 尺寸不合、穿透、无支撑、沉降后位姿漂移 | 稳定不证明可抓取或可达 |
| 初态与终态 | 任务开始时已经成功，目标条件与语言不符 | 谓词成立不证明按指定过程完成 |
| 执行 | 夹爪进不去、路径不可达、接触过程失败 | 一个规划器失败不证明任务不可解 |
| 评审 | 同一模型生成又评判，遗漏条件被共同接受 | 语义打分不能替代独立执行或人工复核 |

前面四类由两篇论文的约束与案例归纳；最后一类是我们的评测解释。RoboLab 的 120 个主基准任务究竟“自动生成后人工验证”还是“人工生成”，原文不同位置表述冲突，不能据此宣布全部自动生成。官方仓库后来提供的制作技能属于另一个版本的实现证据，见 [[nvlabs-robolab|归档仓库]]。

生成质量应同时报告尝试数、验收数、失败阶段、耗时和人工干预，而非仅展示成功场景。若用于学习，还需说明过滤改变了哪些任务分布；见 [[RobotLearningDataComposition|数据构成]] 与 [[TaskGeneralistPolicyEvaluation|任务通用型策略评测]]。

## 研究归属

[[topics/assets-and-world-generation|三维资产与场景生成]] · [[topics/simulation-ready-worlds|生成世界何时成为可执行环境]]。
