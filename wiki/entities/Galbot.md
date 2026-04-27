---
title: "Galbot"
type: entity
tags: [organization, robotics, robot-platform]
sources: ["[[lda-1b-scaling-latent-dynamics-action-model]]"]
last_updated: 2026-04-27
---

# Galbot

Galbot 是 [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]] source 中的作者机构之一，也是 real-world evaluation 使用的 robot platform context。论文作者单位列出 Peking University、Galbot、CASIA、BAAI、Tsinghua University、Sun Yat-sen University 与 NVIDIA。

## Source Context

LDA-1B 的 real-world experiments 使用 Galbot G1 与 Unitree G1。Galbot G1 在 source 中有两种 end-effector setup：standard two-finger parallel gripper，以及 22-DoF SharpaWave dexterous hand。论文特别指出 Galbot G1 没有出现在 EI-30K pretraining dataset 中，因此 Galbot experiments 被用作 few-shot adaptation to new embodiment 的 evidence。

Galbot G1 gripper tasks 覆盖 Pick Vegetable、Handover、Wipe Board、Flip Box、Water Flower、Knock Block with Hammer、Sweep Table 和 Throw Rubbish。Dexterous setup 则参与 high-DoF bread manipulation tasks。

相关页面：[[LDA1B]]、[[EI30K]]、[[LatentDynamicsActionModels]]。
