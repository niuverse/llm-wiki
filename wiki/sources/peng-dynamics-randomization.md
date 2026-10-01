---
title: "Sim-to-Real Transfer of Robotic Control with Dynamics Randomization"
type: source
tags: [robotics, simulation, sim-to-real, reinforcement-learning, source-backed]
sources: []
modified: 2026-10-02
source_file: raw/peng-2018-dynamics-randomization.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/1710.06537v3
extracted_text: graph/extracts/peng-2018-dynamics-randomization.md
source_date: 2018-03-03
source_version: arxiv-1710.06537v3
acquired: 2026-10-02
snapshot_sha256: a15cb24630a11218865027024ae2353f80f46d40371b42dccb2b24e9d00d62d8
study_topic: syntheses/simulation-and-assets-learning-path
---

## 摘要

Peng 等人以 Fetch 推动圆盘实验展示：同时随机物理、控制时序和观测噪声，并让循环策略利用历史适应动力学，可改善真实迁移。它与 [[tobin-domain-randomization|视觉随机化]] 互补，机制整理到 [[DomainRandomization|域随机化]] 与 [[SimulationTimeStepping|仿真步长与控制频率]]。

## 核心主张与实验范围

- 目标是在动力学参数分布上最大化平均回报；95 个随机参数包含质量、阻尼、摩擦、桌面高度、位置控制增益、动作时长和观测噪声。
- 每回合采样质量等参数并固定；动作时长和噪声随步骤变化。策略的 LSTM 隐状态利用历史，评估网络在训练时额外读取仿真参数。
- 物理步长为 0.002 s，默认每 20 步更新控制；动作是七维关节位置增量。圆盘状态由动作捕捉提供，成功阈值为距目标 7 cm。
- 表 II 报告 LSTM 真实成功率 $0.89\pm0.06$，共 28 次；不随机化的前馈基线为 0/10。模型、历史与随机化因素同时不同，不能将差值全部归因于一个模块。
- 表 III 中固定动作时长或去掉观测噪声的真实成功率分别降到 $0.29\pm0.11$ 与 $0.25\pm0.12$；每项试验数量不同。

## 阅读边界

这是单一推动任务的动力学迁移实验，不是视觉端到端控制验证。论文有约一亿训练样本；低真实数据需求不等于低计算成本。循环记忆可被解释为隐式适应，但论文没有证明隐状态恢复了唯一真实物理参数。完整 PDF 与提取文本已交叉阅读。

## 关联

[[DomainRandomization|域随机化]]、[[SystemIdentificationForSimulation|仿真系统辨识]]、[[SimulationTimeStepping|物理与控制时序]]、[[SimulationRealityGap|现实差距]]、[[simopt-adaptive-randomization|SimOpt]]。

## 归档记录

规范网址、版本与获取日期见页首；本次原始文件的 SHA-256 为 `a15cb24630a11218865027024ae2353f80f46d40371b42dccb2b24e9d00d62d8`，归档登记在 `graph/acquisitions.jsonl`。
