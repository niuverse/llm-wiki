---
title: "DreamerV3：在想象中学习控制策略"
type: source
tags: [world-models, robotics, reinforcement-learning, source-backed]
sources: []
source_file: raw/dreamerv3-nature-2025.html
source_kind: html
source_url: https://www.nature.com/articles/s41586-025-08744-2
extracted_text: graph/extracts/dreamerv3-nature-2025.md
source_date: 2025-04-02
modified: 2026-10-02
study_topic: syntheses/world-models-learning-path
---

# DreamerV3：在想象中学习控制策略

## 摘要

Danijar Hafner、Jurgis Pasukonis、Jimmy Ba 和 Timothy Lillicrap 的 *Mastering diverse control tasks through world models*（Nature 2025）给出了世界模型、价值评估器与策略同时学习的完整算法。模型在真实交互数据上学习；策略和价值评估器在预测的潜在轨迹上学习。**执行时从策略直接采样动作，不进行前瞻搜索。**

## 核心主张

- **模型和行为承担不同目标。** RSSM 学习观测表示、动作转移、奖励和回合是否继续；价值评估器用自举回报学习，策略用回报优势与熵目标学习。公式与梯度路径见 [[ImaginedPolicyLearning|想象中的策略学习]]。
- **稳定性来自一组配合的机制。** KL 平衡、最低信息阈值、分类分布的 1% 均匀混合、回报分位数归一化，以及压缩大数值的 symlog／symexp 与双桶软标签，共同处理跨任务的信号尺度。消融中每项影响的任务不同，不能只归功于模型规模。
- **固定配置指算法配置可复用。** 论文在八类基准、超过 150 个任务上逐任务训练，并研究模型大小与经验重放量；它没有证明一个同权重策略能同时解决所有这些领域。单一跨领域世界模型仍是其后续方向。

## 实验证据与边界

Nature 版默认模型约 200M 参数，通常每个基准五个随机种子，BSuite 和 Minecraft 各十个。视觉与本体 Control Suite 各含 20 个任务；其他基准包括 Atari、ProcGen、DMLab 等。论文按基准设置数据预算和重放比，不能将“固定超参数”理解为所有任务的算力、环境数量和数据量完全相同。

Minecraft 在论文定义的环境中无需人类数据或自适应课程；环境包含抽象合成动作、加速破坏方块、图像与背包等观测，以及物品里程碑奖励。结果不能改写为未经修改游戏、仅凭图像和唯一钻石奖励下的学习，更不是物理机器人安全泛化证据。

跨方法比较时，需区分本 Nature 版与 TD-MPC2 论文使用的早期 DreamerV3 基线：模型规模、训练设置与任务集合不同。相关对照见 [[WorldModelEvaluation|世界模型评估]]。

## 关联

[[planet-learning-latent-dynamics|PlaNet]] 提供 RSSM 与在线搜索的基础；本论文接向 [[ImaginedPolicyLearning|想象策略学习]]。[[td-mpc2-scalable-robust-world-models|TD-MPC2]] 则在执行时继续规划，并以策略先验加速候选搜索。

<details>
<summary>资料版本与归档</summary>

阅读版本为 Nature 正式发表全文及方法部分，2025-04-02 的版本记录，DOI `10.1038/s41586-025-08744-2`。获取日期：2026-10-02；保存官方完整 HTML（PDF 下载重定向未成功）；SHA-256：`961c2df364600df94f33168278d64146451bf4cfe0406d9773446d4ebc0a047a`。未以 2024 年 arXiv 版本冒充 Nature 版。官方实现：<https://github.com/danijar/dreamerv3>。

</details>
