---
title: "Galbot"
type: entity
tags: [organization, robotics, robot-platform]
sources: ["[[lda-1b-scaling-latent-dynamics-action-model]]"]
last_updated: 2026-07-13
---

# Galbot

Galbot 是 [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]] 来源中的作者机构之一，也是现实世界评估使用的机器人平台上下文。论文作者单位列出 Peking University、Galbot、CASIA、BAAI、Tsinghua University、Sun Yat-sen University 与 NVIDIA。

## 来源背景

LDA-1B 的现实世界实验使用 Galbot G1 与 Unitree G1。Galbot G1 在来源中有两种末端执行器设置：standard two-手指并行 gripper，以及 22-DoF SharpaWave 灵巧手部。论文特别指出 Galbot G1 没有出现在 EI-30K 预训练数据集中，因此 Galbot 实验被用作少样本适配到新机器人形态的证据。

Galbot G1 夹爪任务覆盖 Pick Vegetable、Handover、Wipe Board、Flip Box、Water Flower、Knock Block with Hammer、Sweep 表格和 Throw Rubbish。灵巧手设置则参与高自由度的面包操作任务。这里保留英文任务名，因为它们是论文中的正式评测标签。

相关页面：[[LDA1B]]、[[EI30K]]、[[LatentDynamicsActionModels]]。
