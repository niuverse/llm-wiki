---
title: "TD-MPC2：以任务价值学习潜在模型并规划"
type: source
tags: [world-models, robotics, reinforcement-learning, source-backed]
sources: []
source_file: raw/td-mpc2-scalable-robust-world-models.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2310.16828v2
extracted_text: graph/extracts/td-mpc2-scalable-robust-world-models.md
source_date: 2024-03-21
modified: 2026-10-02
study_topic: syntheses/world-models-learning-path
---

# TD-MPC2：以任务价值学习潜在模型并规划

## 摘要

Nicklas Hansen、Hao Su 和 Xiaolong Wang 的 *TD-MPC2: Scalable, Robust World Models for Continuous Control*（ICLR 2024）把世界模型训练目标集中在控制所需的信息：潜在转移一致性、奖励和价值，不解码未来观测。执行时做短时域模型预测控制，并用终端价值估计时域以后的回报。

## 核心主张

- **短规划加长价值。** 模型推进潜在状态，预测每步奖励，末端使用 Q 函数；模型预测路径积分方法（MPPI）采样与重加权动作。部分候选来自学习到的策略先验，上一轮结果用于热启动。目标见 [[ModelPredictiveControl|模型预测控制]]。
- **表示服务控制而非重建。** 编码器、转移、奖励和 Q 函数联合训练；目标潜在状态停止梯度，价值目标使用移动平均网络。潜在状态用分组 softmax 的 SimNorm 归一化，奖励和价值用对数空间的分类回归降低尺度敏感性。
- **多任务数据需要明确任务与动作空间。** 所有组件以学习到的任务嵌入为条件；不同观测和动作维度补零，并屏蔽无效动作。任务身份仍是输入，不能说模型从任意未知机器人上自动识别全部控制接口。

## 实验证据与边界

单任务实验覆盖四类仿真基准的 104 个连续控制任务，主要输入为本体状态；视觉实验另外在 10 个 DMControl 任务上比较。多任务实验在 DMControl 与 Meta-World 的 80 个任务上，从 545M 条混合质量转移学习，最大模型 317M。上述范围不等于跨现实机器人通用控制。

单任务默认 TD-MPC2 约 5M 参数，论文 DreamerV3 基线约 20M；训练重用量及实现也不同。成功定义为回合最后一步满足目标，而非回合中任何一步成功。跨论文比较必须保留这些条件。

附录 J 提醒离线数据覆盖不足会产生外推误差；它用 Q 集成的不一致性在规划时惩罚不确定轨迹，但只作为额外实验，没有用于主表全部结果。连续动作搜索仍不能直接证明离散动作适用性。

## 关联

[[ModelPredictiveControl|短时域与终端价值]]、[[WorldModelTaxonomy|控制用途与表示分类]]、[[WorldModelEvaluation|评测条件]]。与 [[dino-wm-pretrained-visual-features|DINO-WM]] 对照时要留意：后者的基线改为无奖励离线训练与视觉目标 MPC，改变了本算法的关键学习信号。

<details>
<summary>资料版本与归档</summary>

完整阅读 arXiv v2（2024-03-21），首次提交 2023-10-25。PDF：<https://arxiv.org/pdf/2310.16828v2>；官方项目：<https://www.tdmpc2.com/>。获取日期：2026-10-02；SHA-256：`99832c555b66665ad1e26cd48e75ea9dda4f3750175b993e7ed5b8dfe399b9e0`。正文式 5 的 SimNorm 是 `softmax(z / τ)`；附录关于温度两端极限的文字顺序与公式相反，教学解释以公式核对，未照抄该处文字。

</details>
