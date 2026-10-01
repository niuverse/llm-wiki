---
title: "V-JEPA 2：视频表征怎样接到机器人规划"
type: source
tags: [world-models, robotics, evaluation, source-backed]
sources: []
source_file: raw/v-jepa-2-understanding-prediction-planning.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2506.09985v1
extracted_text: graph/extracts/v-jepa-2-understanding-prediction-planning.md
source_date: 2025-06-11
modified: 2026-10-02
study_topic: syntheses/world-models-learning-path
---

# V-JEPA 2：视频表征怎样接到机器人规划

## 摘要

Mido Assran 等的 *V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning* 把无动作视频表征学习和有动作机器人动力学分为两阶段。V-JEPA 2 在视频上预测被遮挡位置的特征；V-JEPA 2-AC 冻结编码器，再用 Droid 轨迹中的末端状态和动作训练预测器，最后以目标图像进行闭环规划。

## 核心主张

- **会预测遮挡视频，不等于已经知道控制作用。** 第一阶段没有机器人动作条件；第二阶段明确加入动作、本体状态与视觉特征，通过因果注意力预测下一步。超过百万小时的视频预训练，与少于 62 小时的机器人后训练分别提供表征和动作作用信息。
- **未标任务不等于没有动作监督。** 动作由相邻末端位置、姿态与夹爪状态的差构造；不需要任务名称、奖励和成功标签，但机器人状态仍是关键监督。后训练结合真实中间特征的单步损失与两步自回归损失。
- **规划比较潜在后果与目标。** 候选动作推进预测器，CEM 最小化预测末状态与目标的 L1 特征距离，执行首动作后重新观测。机制见 [[VisualGoalPlanning|视觉目标规划]]。

## 实验证据与边界

零样本部署针对 Droid 中未出现的两个实验室 Franka + RobotiQ 夹爪，不做目标环境再训练或校准。**它不是完全没有机器人训练数据。** 作者还人工尝试并选择了相机位置；附录 B.4 采集本地随机动作作误差诊断，未用来再训练，故“从未收集任何本地数据”也过强。

表 2 的杯／盒抓放成功率分别为 80%／65%，来自两个实验室各十次试验的均值；抓取则分别为 65%／25%。抓放按人工提供的中间目标和固定动作步数切换，不是自主分解任意长任务。视觉理解、动作类别预判和语言问答有各自评测，不能替代操作成功率。

附录 B.2 的实际控制为单步规划时域、800 个候选、十轮 CEM、十个精英；RTX4090 上每动作约 16 秒，机器人阻塞执行。该证据支持有限真机闭环，尚不能证明高速控制或复杂接触操作。

## 来源支持的失效情形

相机角度影响机器人坐标轴的隐式推断；基座不可见时会有欠定与系统性旋转误差。较大动作偏离训练分布，需要限制候选幅度；长预测同时面临自回归漂移和动作搜索空间膨胀。夹爪开度和精细对齐错误影响抓取。两步滚动训练缓解预测问题，并未消除这些限制。依据为正文 §4 与附录 B。

## 关联

[[VisualGoalPlanning|视频预训练到动作条件规划]]、[[dino-wm-pretrained-visual-features|DINO-WM 的图像块预测]]、[[WorldModelEvaluation|计算与部署证据]]。本方法不输出接触力，也没有证明可替代 [[RoboticsSimulationLoop|物理仿真循环]]。

<details>
<summary>资料版本与归档</summary>

完整阅读 arXiv `2506.09985v1` 的 48 页正文与附录；来源日期取 arXiv 提交日 2025-06-11，PDF 页头另印 2025-06-13。PDF：<https://arxiv.org/pdf/2506.09985v1>；机构页面：<https://ai.meta.com/research/publications/v-jepa-2-self-supervised-video-models-enable-understanding-prediction-and-planning/>。获取日期：2026-10-02；SHA-256：`9cfcfde5fb0d9730637da5b9e7317825c3f3d09e91f3553e22eeba42c74d2226`。

</details>
