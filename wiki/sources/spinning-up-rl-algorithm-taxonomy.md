---
title: "Part 2: Kinds of RL Algorithms - Spinning Up"
type: source
tags: [robotics, reinforcement-learning, source-backed]
sources: []
modified: 2026-09-30
source_file: raw/spinning-up-rl-algorithm-taxonomy.html
source_kind: html
source_url: https://spinningup.openai.com/en/latest/spinningup/rl_intro2.html
extracted_text: graph/extracts/spinning-up-rl-algorithm-taxonomy.md
source_date: unknown
topics: ["topics/world-models-and-representations", "topics/planning-and-control", "topics/robot-policy-learning", "topics/physics-simulation", "topics/world-model-decision", "topics/robot-learning-systems"]
source_type: tutorial
---

## 摘要

教程按环境模型的使用方式和学习对象组织 RL 方法，解释策略优化、Q 学习、两者结合，以及模型在规划、数据生成和策略中的作用。原文明确以 2018 年为背景；这里保留基础分类，不据此判断当前方法流行度。

## 核心主张

- 是否使用环境模型是一个分类轴，学习策略、价值还是模型是另一个轴；简单树形分类无法表达全部组合。
- 策略优化直接或间接优化期望回报；Q 学习通过价值的自洽关系构造决策，数据复用方式与稳定性取舍不同。
- 环境模型可以用于直接规划、生成训练经验、专家迭代或作为策略子程序，并不必然直接输出动作。
- 模型预测控制每次规划一段未来，执行首个动作，再根据新状态重新规划。
- 学得的模型可能被策略利用其预测偏差；模型内成绩需要在实际环境中验证。

## 关键引文

> “bias in the model can be exploited by the agent”

模型误差可能成为策略优化利用的方向。

## 关联

比较入口为 [[RobotLearningObjectives|机器人学习目标]]。MDP 符号见 [[MarkovDecisionProcesses|MDP 与强化学习基础]]；潜在预测模型见 [[LatentStateSpaceModels|潜在状态空间模型：估计与预测]] 与 [[WorldModelsForEmbodiedAI|具身智能世界模型]]。

## 开放问题

本页没有给出 PPO、SAC 或 MPC 的完整实现，也不能支持当前算法性能排名；后续应直接收录对应论文和实现文档。

## 研究归属

[[topics/world-models-and-representations|世界模型与表征]] · [[topics/planning-and-control|规划与控制]] · [[topics/robot-policy-learning|机器人策略学习]] · [[topics/physics-simulation|物理仿真]] · [[topics/world-model-decision|世界模型如何用于决策]] · [[topics/robot-learning-systems|训练系统怎样提高有效学习效率]]。
