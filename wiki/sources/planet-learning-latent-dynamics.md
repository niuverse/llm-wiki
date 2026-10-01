---
title: "PlaNet：从像素学习潜在动力学并规划"
type: source
tags: [world-models, robotics, reinforcement-learning, source-backed]
sources: []
source_file: raw/planet-learning-latent-dynamics.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/1811.04551v5
extracted_text: graph/extracts/planet-learning-latent-dynamics.md
source_date: 2019-06-04
modified: 2026-10-02
study_topic: syntheses/world-models-learning-path
---

# PlaNet：从像素学习潜在动力学并规划

## 摘要

Danijar Hafner 等的 *Learning Latent Dynamics for Planning from Pixels*（ICML 2019）展示了一条完整闭环：从图像历史估计潜在状态，用学到的动力学预测候选动作后果，在潜在空间优化动作，再执行首个动作并重新观测。论文的价值是把状态估计、模型学习与在线规划接起来；它没有学习演员或价值网络。

## 核心主张

- **记忆与不确定性分开表示。** 循环状态空间模型（RSSM）包含确定性记忆 $h_t$ 与随机潜在状态 $z_t$；前者保存历史，后者表示无法从图像完全确定的状态。只有确定性或只有随机转移的消融均弱于组合模型。机制见 [[LatentStateSpaceModels|潜在状态空间模型]]。
- **规划不必重建图像。** 解码器提供训练信号，在线搜索只推进潜在状态并预测奖励；交叉熵方法（CEM）迭代采样、评分和重拟合动作序列。实现过程见 [[ModelPredictiveControl|模型预测控制]]。
- **数据收集与规划相互影响。** 实验中在线收集显著优于只用随机动作数据，CEM 迭代搜索也优于同规模随机搜索。因此本文不是仅凭固定数据集就能完成任意任务的证据。

## 实验证据与边界

正文表 1 覆盖 DeepMind Control Suite 的六个仿真连续控制任务，观测为 $64\times64$ 图像，报告五个随机种子、各十条测试轨迹。PlaNet 在 1,000 回合下接近或超过部分训练 100,000 回合的无模型强化学习基线；其中 A3C 使用本体状态，D4PG 使用图像，输入条件不同。“平均约 200 倍数据效率”是论文依此协议估算的结果，不是对真实机器人或所有任务的保证。

附录 A 的默认规划参数是时域 12、10 次迭代、每轮 1,000 个候选和 100 个精英；动作重复次数按任务变化。附录 J 使用真实仿真器研究时域，过短无法看见后果，过长则扩大搜索空间，不能把“预测更远”直接等同于“控制更好”。

**潜在多步预测正则的限定。** 论文提出 latent overshooting，但最终 RSSM 不需要它；附录 D 中它改善另一个模型 DRNN，却略降低 RSSM 表现。不要把这个正则写成 PlaNet 成功的必需组件。

## 关联

[[WorldModelsForEmbodiedAI|具身世界模型]] → [[LatentStateSpaceModels|估计与预测]] → [[ModelPredictiveControl|在线动作搜索]]。与 [[dreamerv3-mastering-diverse-control|DreamerV3]] 对照，可看出把搜索留在执行时和把行为学进策略的区别。

<details>
<summary>资料版本与归档</summary>

完整阅读 arXiv v5（2019-06-04）；首次提交为 2018-11-12。原始 PDF 下载地址：<https://arxiv.org/pdf/1811.04551v5>。获取日期：2026-10-02；SHA-256：`abac727526e6a45669d3ab9957126587e22aacf4dc9bcd60ffe5c853108e5bcc`。MarkItDown 缓存的双栏与公式另用原 PDF 文本布局核对。

</details>
