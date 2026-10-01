---
title: "DINO-WM：用预训练视觉特征进行目标规划"
type: source
tags: [world-models, robotics, evaluation, source-backed]
sources: []
source_file: raw/dino-wm-pretrained-visual-features.pdf
source_kind: pdf
source_url: https://proceedings.mlr.press/v267/zhou25t.html
extracted_text: graph/extracts/dino-wm-pretrained-visual-features.md
source_date: unknown
modified: 2026-10-02
study_topic: syntheses/world-models-learning-path
---

# DINO-WM：用预训练视觉特征进行目标规划

## 摘要

Gaoyue Zhou、Hengkai Pan、Yann LeCun 和 Lerrel Pinto 的 *DINO-WM: World Models on Pre-trained Visual Features enable Zero-shot Planning*（ICML 2025）冻结 DINOv2 图像块特征，学习动作条件化的特征转移。任务由目标图像指定，测试时优化动作，让预测末状态的特征接近目标，不需要为每个目标学习奖励或策略。

## 核心主张

- **空间信息不能一概压成单向量。** 模型保留图像块特征，Transformer 在帧间用因果掩码预测下一帧。不同预训练特征的消融支持图像块表示对其精细控制任务有价值，但不证明一种编码器普遍最优。
- **训练与规划均可在特征空间完成。** 解码器单独训练，仅帮助可视化；其重建误差不反馈给动力学模型。动作通过视觉目标优化落地，见 [[VisualGoalPlanning|视觉目标规划]]，不必预先训练 [[InverseDynamicsModels|逆动力学模型]]。
- **闭环修正与优化器分别影响结果。** 附录 A.5 比较开环 CEM、梯度下降和允许重规划的 MPC；在其 PushT 设置中，成功率分别为 0.86、0.28 和 0.90。模型可微不代表梯度搜索一定更好。

## 实验证据与边界

六类环境均为仿真，覆盖导航、Reacher、PushT、绳索和颗粒。四个刚性／导航环境各测试 50 对初态与目标，两个可变形环境各测试十个实例。PushT 表 1 成功率为 0.90；未见物体形状的 PushObj 只有 0.34，未知接触参数仍是限制。

**比较协议改变了基线用途。** DreamerV3、TD-MPC2 和 IRIS 在离线数据上不使用奖励或任务信息训练，再统一用于 MPC。因此 TD-MPC2 在表 1 失败说明其在这一改动设置下表示不足，不能推翻其原始在线强化学习结果。Dreamer 基线使用第三方 PyTorch 实现，也应保留说明。

**零样本不等于零数据。** 模型先学习包含真实动作的环境轨迹，再面向新目标规划；附录 A.1 的 PushT 数据实际重放带不同噪声的专家轨迹。论文并非“所有训练数据完全无专家示范”或“无动作互联网视频即可直接控制”的证据。

附录 A.6 在 A6000 上报告批量 32 的单步推断 0.014 秒、特定仿真单步约 3 秒、CEM 100 候选 × 10 次迭代规划 15.89 秒。批量、任务与完整规划延迟不同，不能只凭单步模型速度认定可以实时闭环。

## 看预测与执行是否一致

下方是[作者官方项目页](https://dino-wm.github.io/)的 PushT 视频：上排为在仿真环境执行规划动作后的观测，下排为模型想象，右侧为目标。观看时追踪接触后物体的位置与朝向，而不只看背景相似度。这是作者选择的示例，不能代替论文的整组任务统计或独立复现。

<video controls preload="none" playsinline aria-label="DINO-WM 作者提供的 PushT 预测与执行对照">
  <source src="https://dino-wm.github.io/mfiles/env/media/exp1_all5envs/pusht_ours.mp4" type="video/mp4">
  浏览器无法播放时，可打开作者项目页查看示例。
</video>

## 关联

[[VisualGoalPlanning|视觉目标与特征距离]]、[[ModelPredictiveControl|动作搜索与重规划]]、[[WorldModelEvaluation|动作和闭环评测]]。与 [[v-jepa-2-understanding-prediction-planning|V-JEPA 2-AC]] 对照，可看图像特征规划与视频表征后训练的连接。

<details>
<summary>资料版本与归档</summary>

完整阅读 PMLR 267 的正式会议 PDF（79115–79135）；会议为 2025-07-13 至 2025-07-19，页面未明确单篇发表日，所以 `source_date` 保留 `unknown`。PDF：<https://raw.githubusercontent.com/mlresearch/v267/main/assets/zhou25t/zhou25t.pdf>。获取日期：2026-10-02；SHA-256：`f054a2c03888aa9a50b7747fb99a168f2979cb7fa216b075011b089d45b628db`。

视频出处的官方页面另存 `raw/dino-wm-project-20261002.html`，缓存 `graph/extracts/dino-wm-project-20261002.md`，同日获取，SHA-256：`6de45e515776483ea319744cd2ca6a0b45ddda613f6e9bd24cd7816637e6433b`；它与论文属于同一方法的补充资料，不计为独立实验来源。媒体仅远程嵌入，不自动播放或下载。

</details>
