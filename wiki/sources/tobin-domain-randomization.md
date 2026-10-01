---
title: "Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World"
type: source
tags: [robotics, simulation, sim-to-real, source-backed]
sources: []
modified: 2026-10-02
source_file: raw/tobin-2017-domain-randomization.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/1703.06907v1
extracted_text: graph/extracts/tobin-2017-domain-randomization.md
source_date: 2017-03-20
source_version: arxiv-1703.06907v1
acquired: 2026-10-02
snapshot_sha256: 3fc98c5f4cea050686d45858e647e1b704492121fdae80f8fcd5d560c107f11f
study_topic: syntheses/simulation-and-assets-learning-path
---

## 摘要

Tobin 等人的经典论文通过随机纹理、光照、相机和干扰物训练物体定位网络，再把预测位置交给现成规划器完成抓取。它提供的是视觉 [[DomainRandomization|域随机化]] 证据；不能把这项实验读成任意机器人策略的动力学迁移保证。

## 核心主张与实验范围

- 每个渲染样本改变纹理、干扰物、光照、相机及图像噪声，使用位置标注训练修改后的 VGG-16；无需逼真纹理。
- 固定桌面高度，识别对象的形状和尺寸已知；单目定位并未解决任意物体完整六维位姿估计。
- 真实定位测试共 480 张图像，包含八种几何对象及干扰／遮挡情形；论文报告平均定位误差约 1.5 cm。
- 特定 Fetch 抓取测试成功 38/40；另一个食品罐测试成功 9/10。动作由现成规划器产生，不是论文训练出的端到端接触策略。
- 消融中缺少训练干扰物显著损害真实杂乱场景定位；仿真定位误差约 0.3–0.5 cm，仍低于真实误差。

## 阅读边界

多数实验以 ImageNet 权重初始化，也比较从头训练；不能把全部实验都写成完全没用真实图像预训练。本文没有验证任意精密接触操作、未知几何物体或动力学随机化。MarkItDown 的双栏提取存在错序，结论与表格已交叉检查原 PDF 的 `pdftotext` 阅读结果。

## 关联

[[DomainRandomization|域随机化]]、[[VisualSimToReal|视觉迁移]]、[[SimulationRealityGap|仿真—现实差距]]、[[peng-dynamics-randomization|动力学随机化]]。

## 归档记录

规范网址、版本与获取日期见页首；本次原始文件的 SHA-256 为 `3fc98c5f4cea050686d45858e647e1b704492121fdae80f8fcd5d560c107f11f`，归档登记在 `graph/acquisitions.jsonl`。
