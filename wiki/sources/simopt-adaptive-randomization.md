---
title: "Closing the Sim-to-Real Loop: Adapting Simulation Randomization with Real World Experience"
type: source
tags: [robotics, simulation, sim-to-real, reinforcement-learning, source-backed]
sources: []
modified: 2026-10-02
source_file: raw/simopt-adapting-simulation-randomization.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/1810.05687v4
extracted_text: graph/extracts/simopt-adapting-simulation-randomization.md
source_date: 2019-03-05
source_version: arxiv-1810.05687v4
acquired: 2026-10-02
snapshot_sha256: 5dde7ad391342c29cdcb80c3728389a59712e6798a21fc5a8f4b5d82e4baf245
study_topic: syntheses/simulation-and-assets-learning-path
---

## 摘要

Chebotar 等人的 SimOpt 交替训练策略、执行少量真实回合，再用相同闭环策略比较真实与仿真观测，更新仿真参数分布。它将 [[DomainRandomization|域随机化]] 与 [[SystemIdentificationForSimulation|系统辨识]] 接起来，目标是任务相关行为一致，不要求恢复全部真实物理参数。

## 核心主张与实验范围

- 分布采用均值与完整协方差参数化的高斯；更新最小化加权观测轨迹差异，并限制新旧分布的 KL 散度。
- 轨迹差异结合 $L_1$ 与平方 $L_2$ 项，进行高斯平滑以缓解时间错位；不要求辨识所用观测与策略输入相同。
- 当前实现用不可微 Flex 仿真器与基于 REPS 的采样优化，不是端到端可微物理算法。
- 摇摆插销任务在两次更新后报告 18/20 成功；抽屉任务在一次更新后报告 20/20。每轮采三条真实轨迹，仿真训练使用 64 块 GPU；真实试验少不代表总体预算小。
- 过宽随机分布可能产生插销比孔大、绳长不足等不可解情形，也可能学得保守策略；论文给出仿真实验而非普遍定理。

## 阅读边界

成功证据仅覆盖两类操作任务；视觉和触觉高维观测、多峰参数分布在文中仍是后续方向。参数之间能相互补偿，轨迹匹配不能自动证明物理参数已唯一确定。PDF 的方法、实验与附录已完整阅读；另保留首次下载的旧版本 `raw/simopt-adapting-simulation-randomization-v2.pdf`，本页结论以 v4 为准。

## 关联

[[SystemIdentificationForSimulation|系统辨识]]、[[DomainRandomization|随机化分布]]、[[SimulationRealityGap|现实差距]]、[[DifferentiablePhysics|可微物理]]。

## 归档记录

规范网址、版本与获取日期见页首；本次原始文件的 SHA-256 为 `5dde7ad391342c29cdcb80c3728389a59712e6798a21fc5a8f4b5d82e4baf245`，归档登记在 `graph/acquisitions.jsonl`。
