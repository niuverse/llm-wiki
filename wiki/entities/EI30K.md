---
title: "EI-30K"
type: entity
tags: [robotics, dataset, embodied-data, heterogeneous-data]
sources: ["[[lda-1b-scaling-latent-dynamics-action-model]]"]
last_updated: 2026-04-27
---

# EI-30K

EI-30K（Embodied Interaction Dataset）是 [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]] source 构建的 30k+ hour embodied interaction dataset，用来支持 [[LatentDynamicsActionModels|Latent Dynamics Action Model]] 的 universal embodied data ingestion。它把 robot/human、real/sim、action-labeled/actionless data 转成统一格式，并保留 mixed-quality trajectories，而不是只筛选 expert demonstrations。

## 组成

| Category | Duration | Role in LDA training |
| --- | ---: | --- |
| Real-world robot data | 8.03k hours | action-labeled interaction data, policy + dynamics supervision when quality allows |
| Simulated robot data | 8.6k hours | dense and cleaner robot supervision, including manipulation and household task structure |
| Ego human data with actions | 7.2k hours | human intent, hand motion, dexterity priors, action/dynamics supervision |
| Ego human data without actions | 10k hours | visual forecasting, temporal structure, affordance priors |

## Data Unification

EI-30K 的 pipeline 把 raw datasets 转成 LeRobot 2.1 format，并统一保存 observations、actions、language、task metadata、episode boundaries 和 timestamps。Action representation 被对齐到 hand-centric coordinate frame：robot data 使用 6-DoF end-effector pose 加 gripper width 或 dexterous hand joints；human data 使用 6-DoF wrist pose 和 MANO hand parameters。Camera extrinsics 被保留，用来 decouple hand motion from egocentric head motion。

Quality annotation 是这个 dataset 的关键：trajectory 会按 action accuracy 和 annotation completeness 标质量；idle/head-only segments 被移除；language annotations 用 VLM 规范化。低质量 trajectories 没有被 aggressive filtering 删除，而是作为 dynamics/visual forecasting supervision 被保留。

## 实践含义

EI-30K 的主要价值不是“数据更多”，而是让 data role 可以被 objective routing 使用。对于 robot foundation models，这意味着 data collection pipeline 应该记录质量、动作可用性、camera geometry、hand/object interaction validity 和 task metadata；否则 mixed data 只能作为 noisy imitation corpus，难以转成 dynamics supervision。

相关页面：[[LDA1B]]、[[LatentDynamicsActionModels]]、[[WorldModelsForEmbodiedAI]]、[[VisionLanguageActionModels]]。
