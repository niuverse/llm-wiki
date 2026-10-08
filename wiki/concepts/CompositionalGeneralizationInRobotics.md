---
title: "Compositional Generalization"
type: concept
tags: [robotics, generalization, robot-foundation-models, evaluation]
sources: ["[[pi07-steerable-generalist-robotic-foundation-model]]", "[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots]]"]
modified: 2026-10-04
topics: ["topics/evaluation-and-transfer", "topics/robot-policy-learning", "topics/policy-evaluation"]
---

# Compositional Generalization

组合泛化是把已有技能、物体、关系或指令用于新的组合。判断“新”必须说明划分单位：完整任务未见，不代表组成技能、场景或机器人都未见。[[pi07-steerable-generalist-robotic-foundation-model|π0.7]] 与 [[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]] 都考察组合行为，但提示方式、训练数据和评估协议不同。

## 先定义测试条件

令 $\tau^\star$ 是目标任务，$e^\star$ 是环境和机器人设置，$C^\star$ 是测试时可用上下文，$\pi_\theta$ 是策略。评估可记为：

$$
S(\pi_\theta;\tau^\star,e^\star,C^\star).
$$

$S$ 必须说明是完整任务成功、子目标完成比例还是其他分数。以下条件应分别记录：

| 变量 | 需要区分的情况 |
| --- | --- |
| 新颖性 | 新语言、新物体／场景、新机器人、新技能组合 |
| 低层训练 | 是否见过目标任务示范、专家策略自主轨迹或其他相关动作数据 |
| 测试帮助 | 仅任务指令、人工逐步指导、人工或生成视觉子目标 |
| 高层训练 | 是否使用该任务的指导轨迹训练任务分解器 |
| 指标 | 完整成功与平均子目标进度是否分开 |

这是根据来源协议整理的比较框架。π0.7 在已有任务上的免微调结果仍利用了相关专家策略的自主数据；其未见长任务可由人指导完成，再用指导轨迹训练高层自主分解。**固定低层策略不等于整套系统没有接收新任务数据。** 来源的长指令评测还使用指令完成比例，不能替代完整长任务成功率。[[pi07-steerable-generalist-robotic-foundation-model|π0.7 §IX]]

## 为什么长组合更难

设任务要求依次满足 $K$ 个子目标，$G_k$ 表示第 $k$ 阶段成功，则概率链式法则给出：

$$
P(G_1\cap\cdots\cap G_K\mid\tau,\pi)
=\prod_{k=1}^{K}P(G_k\mid G_1,\ldots,G_{k-1},\tau,\pi).
$$

该式没有假设各阶段独立。前一阶段会改变物体位置、抓取状态和可见区域，所以单独测试技能得到的成功率不能直接代入完整组合。**这是机制解释：** 顺序错误、状态记忆不足或恢复失败，都可能让后续技能失去成立条件；恢复策略还会改变“阶段成功”的定义和时间预算。

```mermaid
flowchart LR
  A["已有技能与场景经验"] --> B["新任务组合"]
  B --> C["语言或视觉子目标"]
  C --> D["低层策略执行"]
  D --> E["观测状态与完成进度"]
  E --> C
  E --> F["指导轨迹：可用于高层训练"]
```

图中的反馈是闭环执行，最后一支是新的训练步骤；两者不能混为同一种推理能力。上下文接口见 [[RobotContextConditioning|Context Conditioning]]。

**进度与全成率的教学例子。** 对三个必须依次完成的阶段，假设每一步在前面全成功条件下的成功率都是 0.9，则全成率为 $0.9^3=0.729$。这里直接假设的是条件成功率，不要求阶段在实际机器人系统中独立。如果另一个评测把三个指令各计一分，即使平均拿到 90% 的指令分数，也不能据此还原 72.9% 的整任务成功率；错误是否集中在同一批回合会改变结果。这正是记录逐回合结果、顺序依赖和失败阶段的必要性。例子只演示上述概率关系，不是 π0.7 或 RoboCasa365 的报告数字。

## 证据与局限

π0.7 删除最多样的 20% 数据比随机删除等量数据更影响未见短任务表现，支持其设置下任务覆盖的重要性；这不证明任意增加任务名都能改善泛化。论文同时承认未见任务与未见任务—机器人组合通常弱于已见任务。完整实验与支持程度见 [[pi07-steerable-generalist-robotic-foundation-model|来源页]]。

RoboCasa365 将原子、已见组合和未见组合任务分组；“未见组合”仍允许组成技能、物体或场景重叠，其数据多样性与持续学习实验也揭示覆盖和旧技能保持的影响。具体数字与训练条件保留在 [[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365 来源页]]，不在概念页重新混合成统一成功率。

实践中应记录首次失败阶段、部分完成、恢复次数和总时限，同时记录训练与测试的成分重叠。只报告一个总体均值，难以分清技能不会、顺序错误或依赖人工提示。更多评估组织见 [[TaskGeneralistPolicyEvaluation|通用任务策略评估]]、[[RobotLearningDataComposition|数据构成]]。

## 研究归属

[[topics/evaluation-and-transfer|评测与 Sim-to-Real]] · [[topics/robot-policy-learning|机器人策略学习]] · [[topics/policy-evaluation|策略评测]]。
