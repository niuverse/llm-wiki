---
title: "Physical Intelligence"
type: entity
tags: [robotics, robot-foundation-models, organization]
sources: ["[[pi07-steerable-generalist-robotic-foundation-model]]"]
last_updated: 2026-04-27
---

# Physical Intelligence

Physical Intelligence 是 [[pi07-steerable-generalist-robotic-foundation-model|π0.7 paper]] 的发布组织。当前 wiki 中它主要作为 [[Pi07|π0.7]]、π0.6/MEM/RL-specialist model line、robot data collection infrastructure 与 robot foundation model research 的 entity 出现。

在这个 source 中，Physical Intelligence 的 technical thesis 是：robot foundation models 的 generalization 不只来自更多 parameters 或更多 demonstrations，还来自能把 heterogeneous data 标注为不同 strategy、quality、speed、mistake 和 goal-state 的 [[RobotContextConditioning|context conditioning]]。这让一个 generalist VLA 在 test time 被 steer 到特定行为模式，而不是平均掉 dataset 中互相冲突的 trajectories。

本页只记录该 source 对 Physical Intelligence 的处理方式；关于公司状态、产品化部署或模型开放性，需要另行 ingest 官方页面、model card 或 independent evaluations。

相关页面：[[Pi07]]、[[VisionLanguageActionModels]]、[[RobotContextConditioning]]、[[CompositionalGeneralizationInRobotics]]。
