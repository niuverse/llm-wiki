---
title: "仿真基准报告流程"
type: concept
tags: [robotics, simulation, benchmark, evaluation]
sources: ["[[nvlabs-robolab]]", "[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[robotics-simulation-infrastructure]]"]
modified: 2026-10-04
topics: ["topics/evaluation-and-transfer", "topics/robot-policy-learning", "topics/policy-evaluation"]
---

# 仿真基准报告流程

基准报告把任务版本、执行记录、成功判定和统计不确定性连成可审计证据。[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab 论文]] 的固定次数实验与 [[nvlabs-robolab|归档仓库]] 后来加入的自适应采样是不同版本的协议，不能把后者描述为论文所有结果已经采用的方法。

## 从回合到结论

每条回合至少需要任务与策略标识、配置和随机种子、成功判定及子任务结果、终止原因，以及视频或轨迹引用。聚合层再计算逐任务结果，最后按预先确定的任务权重形成总分。视频用于查错，不能替代判定器；有报告界面也不证明资产、策略和仿真版本已经完整固定。[[nvlabs-robolab|官方仓库的分析与看板]]

论文数字与实现版本也需保留来源位置。RoboLab 正文与表格的 π0.5 主分数、任务分类数量存在冲突；报告应并列标注并等待核实，而不是挑选较好看的数字。RoboCasa365 真实实验所述 20 次试验与部分百分比粒度不符，也不能据百分比反推成功计数。[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|原文冲突记录]]、[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|现实实验统计边界]]

## 成功率的贝叶斯可信区间

RoboLab 归档提交 `7d45d749` 的 `docs/statistical_significance.md` 与 `robolab/core/utils/adaptive_sampling.py` 使用均匀先验。若把同一设置下的成功事件视为给定成功概率 $p$ 的独立伯努利试验，$n$ 次中成功 $k$ 次，则：

$$
p\mid k,n\sim\operatorname{Beta}(k+1,n-k+1).
$$

95% 可信区间为该后验的 2.5% 与 97.5% 分位数。点估计仍可显示 $k/n$，它与后验均值 $(k+1)/(n+2)$ 不同。文档例子中，6/10 与 60/100 的点估计都为 60%，区间却分别约为 [30.8%,83.3%] 与 [49.9%,69.4%]。[[nvlabs-robolab|归档证据]]

这是给定模型与先验的后验不确定性，不能不加条件地改称频率学派覆盖保证。共享初态、相关种子或重复同一场景造成的相关性，也不会被简单的 $n$ 自动纠正。后一条是对统计假设的解释。

### Beta 后验里的两个“加一”来自哪里

**教学推导：** 独立伯努利结果的似然核为 $p^k(1-p)^{n-k}$，均匀先验是 $\mathrm{Beta}(1,1)$，其密度核为 $p^0(1-p)^0$。两者相乘仍为 $p^k(1-p)^{n-k}$；与 Beta 密度 $p^{a-1}(1-p)^{b-1}$ 对比，便得到 $a=k+1,b=n-k+1$。加一来自先验指数，不代表真的多做了一次成功和一次失败试验。

例如10/10成功仍得到 $\mathrm{Beta}(11,1)$，其95%区间下界约71.5%，而不是断言成功概率等于1。归档代码按这套规则计算区间；文档示例与实现定位见 [[nvlabs-robolab|RoboLab 来源页]]。实际执行记录中，成功、超时、基础设施异常应有明确编码；缺失结果不能靠给百分比加区间变成完整数据。

## 自适应采样的真实停止规则

代码先检查 $n\ge n_{\max}$ 就停止，再检查 $n<n_{\min}$ 就继续，其余情况按区间宽度 $u-l$ 是否大于阈值 $\epsilon$ 决定。默认 $n_{\min}=10$、$n_{\max}=200$、$\epsilon=0.14$；CLI 名称 `--ci-pp-width` 接收的是 0–1 范围的比例，0.14 对应 14 个百分点，并非填入数值 14。

评估按完整并行批次追加回合，所以实际最终 $n$ 可以向上取整到批次边界；“最大 200”是启动下一批之前的停止检查，不保证每次最终恰好不超过 200。记录中应报告实际样本数、阈值、最小次数、批量大小和停止原因。[归档仓库上述文档与函数]

**原文主张与我们的审查：** 文档称“停止只看宽度，所以估计仍无偏”。但 Beta 区间宽度也依赖 $k$，仅凭这句话不能推出随机停止下 $k/n$ 无偏；代码未提供相应证明。这里保留已核实的停止实现，不把无偏性当作已证实结论。后验区间的可计算性、点估计无偏性和重复实验覆盖率是不同问题。

## 聚合和比较

自适应采样让难估计的任务拿到更多回合。若目标是任务等权评测，应先求各任务成功率再取平均；直接合并所有回合会改变任务权重。要比较两个策略，也应交代是否共享任务、初态与随机种子，以及比较的是逐任务差异还是整体加权均值。

**我们的实践解释：** 一个可复查的结果表应连到任务定义、实际 $k/n$、区间方法、版本、训练／适配预算与失败记录。置信或可信区间只能描述部分采样不确定性，不能修复错的任务判定器、数据泄漏或不等训练预算。评测协议见 [[TaskGeneralistPolicyEvaluation|任务通用型策略评测]]，参数诊断见 [[SimulationSensitivityAnalysis|敏感性分析]]。

## 研究归属

[[topics/evaluation-and-transfer|评测与现实迁移]] · [[topics/robot-policy-learning|机器人策略学习]] · [[topics/policy-evaluation|数据与评测怎样支撑泛化判断]]。
