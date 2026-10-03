---
title: "机器人上下文条件化"
type: concept
tags: [robotics, vla]
sources: ["[[pi07-steerable-generalist-robotic-foundation-model]]"]
modified: 2026-10-04
topics: ["topics/robot-policy-learning", "topics/world-models-and-representations", "topics/future-conditioned-action"]
---

# 机器人上下文条件化

上下文条件化让同一个策略区分任务、子任务、质量、速度、错误、控制模式与期望视觉结果。[[pi07-steerable-generalist-robotic-foundation-model|π0.7]] 将这些信息纳入提示，以处理异构机器人数据中的行为歧义。

## 数学结构

用教学记号汇总来源中的上下文：

$$
C_t=(\ell_t,\hat\ell_t,g_t,m,c),\qquad
\pi_\theta(A_t\mid O_t,C_t).
$$

$\ell_t$ 为总体任务语言，$\hat\ell_t$ 为当前子任务语言，$g_t$ 为多视角视觉子目标，$m$ 为回合元数据，$c$ 为关节或末端控制模式；$O_t$ 为观测历史，$A_t$ 为动作块，$\theta$ 为策略参数。动作块长度的明确记法见 [[VisionLanguageActionModels|VLA]]。

来源中的元数据包括速度（回合长度按 500 步分箱）、质量（1 至 5 人工评分）和错误标签。测试通常选择最高质量、无错误与较快的速度提示；标签选择只是分布条件，不能保证实际行为达到指定质量或速度。训练会随机丢弃部分条件，关节／末端控制模式则一直保留；并非所有样本都有视觉子目标。这些是来源设置，不是任意系统的通用最优值。[[pi07-steerable-generalist-robotic-foundation-model|π0.7 论文]]

视觉子目标由生成器参数 $\psi$ 决定：

$$
g^\star\sim p_\psi(g^\star\mid o_t,\hat\ell_t,m).
$$

$o_t$ 为当前观测，$g^\star$ 为目标图像。来源使用片段末帧或采样未来帧作为训练目标，以条件流匹配训练独立的图像生成器；生成结果再进入 VLA 上下文。它没有接收待搜索的动作序列，所以这里的子目标生成不等于动作条件物理模拟。详见 [[pi07-steerable-generalist-robotic-foundation-model|π0.7 §V-B、附录 C]]。

## 直觉

同一句“折好衣服”可以对应不同速度、质量和机器人形态的示范。把这些模式显式写入条件，模型就可以学习条件分布，而不是只拟合混合行为。视觉目标进一步表达语言难以说明的位姿或结果形状。这是依据来源机制整理的解释，不保证任意标签都能带来收益。

```mermaid
flowchart LR
  A[质量混合的轨迹] --> B[语言、速度、质量与错误标签]
  B --> C[世界模型生成视觉子目标]
  D[当前观测] --> C
  C --> E[策略上下文]
  B --> E
  F[控制模式] --> E
  E --> G[VLA 动作块]
  D --> G
```

## 为什么条件标签不等于约束

若所有轨迹只保留任务条件 $\ell$，模型要拟合的混合行为可写为 $p(A\mid O,\ell)=\sum_m p(A\mid O,\ell,m)p(m\mid O,\ell)$；这里 $m$ 暂把质量类别等元数据看作离散变量，$O$ 是观测、$A$ 是动作。保留 $m$ 则允许在测试时指定其中的条件分布。这个全概率公式是教学解释，不是 π0.7 额外引入的分类器。

例如“把衣服折好”的慢速整齐回合与快速但凌乱回合都有学习价值，质量标签让模型有机会区分它们；但输入“最高质量”只是请求相应动作分布，并没有在输出后施加“误差必须小于某阈值”的硬约束。模型也不一定能组合训练中罕见的“最高质量＋最快速度”。后一个风险是条件覆盖的推论，不能冒充论文已有消融结论。[[pi07-steerable-generalist-robotic-foundation-model|π0.7 §V、IX-E]]

## 失效情形与证据边界

语言指导可以在固定低层策略的情况下分解任务；之后使用指导轨迹训练高层策略，已经增加了任务相关训练数据。应分别报告“低层没有微调”“推理时有人指导”和“高层经新轨迹训练”，避免统称为完全零样本自主执行。[[pi07-steerable-generalist-robotic-foundation-model|π0.7 §IX-D 的长任务实验]]

以下是**机制推导的待验证风险**：质量或错误误标、测试提示与当前状态不匹配、生成目标不可达、子目标延迟，以及把已有片段重组误判为未见任务。当前来源没有独立验证全部风险，不将它们伪装成已观察的通用失败。

[[nvlabs-robolab|RoboLab 仓库]] 的策略后端与客户端组织支持集成语义，不是新的上下文训练方法证据。π0.7 的正结果来自发布方技术栈与评测；跨平台校准和独立复现仍需补充。

## 实践含义

数据收集要记录模式与质量，而不只保留一条任务语言。实验时分别移除元数据、评估数据和生成子目标，辨别贡献。π0.7 中无元数据与无评估数据的消融影响吞吐量，这为组件分析提供具体证据；是否适用于自己的平台仍需重做实验。[[pi07-steerable-generalist-robotic-foundation-model|π0.7 论文]]

继续读 [[RobotLearningDataComposition|数据构成]]、[[RobotLearningObjectives|学习目标]] 和 [[CompositionalGeneralizationInRobotics|组合泛化]]。

## 研究归属

[[topics/robot-policy-learning|机器人策略学习]] · [[topics/world-models-and-representations|世界模型与表征]] · [[topics/future-conditioned-action|未来预测怎样帮助动作学习]]。
