---
title: "通用任务策略评估"
type: concept
tags: [robotics, evaluation, vla]
sources: ["[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]", "[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning]]", "[[robotics-simulation-infrastructure]]", "[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors]]", "[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots]]"]
modified: 2026-10-04
topics: ["topics/evaluation-and-transfer", "topics/robot-policy-learning", "topics/policy-evaluation"]
---

# 任务通用型策略评测

任务通用型策略评测回答：一个策略在明确的任务、场景、物体和指令分布下能完成什么，以及失败对哪些变化敏感。[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab]] 侧重外部预训练策略的统一测试与扰动诊断；[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]] 同时提供数据、适配与评测协议。二者的“成功率”不能脱离训练条件直接排名。

## 先确定泛化协议

| 协议 | 测试前允许什么 | 回答的问题 |
| --- | --- | --- |
| 零样本任务测试 | 使用既有检查点，不用目标任务示范适配 | 既有能力能否迁移到这个任务分布？ |
| 目标数据适配 | 明确数量的目标任务示范和训练预算 | 给定数据与预算后能学到什么？ |
| 场景泛化 | 固定任务语义，改变布局、外观、对象或初始状态 | 能力对哪些环境变化稳定？ |
| 任务组合泛化 | 控制原子技能和组合任务的训练覆盖 | 已学技能能否迁移到新的组合？ |

这些是教学上的比较维度，并不自动等于每篇论文采用的划分。RoboLab 使用 DROID 检查点、不在该基准上重新训练；RoboCasa365 的“未见组合任务”指未进入仿真预训练集，目标微调阶段仍可见其示范。因此后者不能写成完全零样本组合泛化。[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab §IV-A]]、[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365 §4、附录 H]]

## 成功率依赖任务判定和聚合方式

设任务 $i$ 的第 $e$ 条轨迹为 $\tau_{i,e}$，任务判定器为 $G_i$。教学表达为：

$$
\hat p_i=\frac{1}{n_i}\sum_{e=1}^{n_i}\mathbf1[G_i(\tau_{i,e})],\qquad
\hat p_{\mathrm{macro}}=\frac1M\sum_{i=1}^M\hat p_i.
$$

$n_i$ 是任务试验数，$M$ 是任务数。$G_i$ 可以包含终态、多个子目标和过程顺序，不能一律化约为最终画面上的所有谓词同时成立。任务等权的宏平均，与把全部回合合并的微平均，只有在任务试验数一致等条件下才相等。自适应采样后尤其要标明权重。见 [[SimulationBenchmarkReportingPipeline|基准报告流程]]。

成功率之外，RoboLab 记录子任务、错误接触、路径长度与轨迹平滑性。短而平滑的轨迹可能根本没有行动；只看终态成功也可能忽略错误对象接触。应在同一任务定义下联合解释这些指标。[RoboLab §III-B]

### 两个任务为何能给出两个“总体成功率”

**教学例子：** 任务 A 成功10/10，任务 B 成功10/100。任务等权宏平均为 $(100\%+10\%)/2=55\%$；回合合并得到 $20/110\approx18.2\%$。两者计算都可以正确，但前者回答“随机选一个任务的表现”，后者回答“按实际试验频次选一个回合的表现”。增加 B 的试验数能缩小 B 的不确定性，却不应悄悄改变任务等权基准所回答的问题。

判定也需要拆开看。[[nvlabs-robolab|RoboLab 香蕉入碗实现]] 以几何、接触与松爪共同定义成功，子任务状态另记录抓取和放置过程。同样是最终在碗里，“夹爪仍持住”与“已经放下”可得到不同结果。测到的是明确判定器下的能力，而不是读者凭画面想象的另一项任务。

## 两种基准提供的实际证据

| 来源 | 受控设置与结果 | 不能推出什么 |
| --- | --- | --- |
| RoboLab 表 I、VI | 每任务 10 次，表列 π0.5 23.3%、π0-FAST 15.7% 等；正文另写 31.9% | 不应把正文与表格揉成单一确定排行榜，也不能把 10 次视为精确概率 |
| RoboLab 指令对照表 IV | π0.5 模糊／默认／具体指令 16.8／23.3／25.8% | 更具体指令并非对所有策略单调有效 |
| RoboLab 现实对照表 V、VIII | 作者称六任务对照，但一项仿真值缺失；策略间差距不一致 | 不能声称仿真分数能准确预测任意策略的现实成功率 |
| RoboCasa365 表1 | 多任务训练平均值 GR00T N1.5 20.0%、π0.5 16.9% | 模型骨干冻结、步数和批量不同，非等算力架构比较 |
| RoboCasa365 附录 H.3 | 两阶段 51.1%、联合训练 22.5%，分别 140k 与 120k 步 | 不能隔离“训练顺序”本身的因果收益 |

完整数字及原文内部不一致见两篇来源页。RoboLab 的任务难度数 65+38+18=121，与总数 120 不符；能力轴计数也在不同位置变化。因此概念层保留关系／视觉／程序性三类解释，不把有冲突的计数当作稳定分类事实。

## 结论需要多窄

扰动测试只覆盖所采样的参数、范围和任务。[[SimulationSensitivityAnalysis|仿真敏感性分析]] 能定位关联，但单个任务上的光照鲁棒不代表全部任务鲁棒。比较模型应同时提供任务／场景划分、动作观测接口、训练数据与预算、成功判定器、试验数和不确定性。

**我们的解释：** 有价值的评测不是给“通用性”贴一个总分，而是让读者知道总分由哪些技能、适配条件和环境变化组成。训练目标与数据调度分别见 [[RobotLearningObjectives|学习目标]]、[[RobotLearningDataComposition|数据构成]]；跨仿真与现实的外推见 [[SimulationRealityGap|现实差距]]。

## 研究归属

[[topics/evaluation-and-transfer|评测与 Sim-to-Real]] · [[topics/robot-policy-learning|机器人策略学习]] · [[topics/policy-evaluation|策略评测]]。
