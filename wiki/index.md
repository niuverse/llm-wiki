---
title: "Wiki Index"
type: synthesis
tags: []
sources: []
last_updated: 2026-04-27
---

# Wiki Index

这个文件由 Codex 维护。新增、重命名或删除 wiki pages 时必须同步更新。

## 概览

- [Overview（总览）](overview.md) - 跨 sources 的 living synthesis

## Sources

- [A Comprehensive Survey on World Models for Embodied AI](sources/a-comprehensive-survey-on-world-models-for-embodied-ai.md) - embodied AI world models 的 POMDP/ELBO formalization、三轴 taxonomy、datasets/metrics 与 open challenges
- [AwesomeWorldModels](sources/awesome-world-models.md) - survey companion GitHub repository，按 taxonomy 维护 world model bibliography
- [Contact Models in Robotics: a Comparative Analysis](sources/contact-models-in-robotics-a-comparative-analysis.md) - robotic contact models 与 contact solvers 的 comparative survey 和 benchmark

## Entities

- [AwesomeWorldModels](entities/AwesomeWorldModels.md) - survey companion bibliography repository
- [ContactBench](entities/ContactBench.md) - source 中的 unified C++ contact-model benchmark framework
- [MuJoCo](entities/MuJoCo.md) - source 中用于讨论 contact regularization tradeoffs 的 robotics physics engine
- [RaiSim](entities/RaiSim.md) - source 中用于讨论 quadruped transfer 与 per-contact handling 的 robotics simulator

## Concepts

- [Contact Complementarity（接触互补）](concepts/ContactComplementarity.md) - rigid contact、friction cone、NCP/LCP/CCP 与 residual intuition
- [Contact Models in Robotics](concepts/ContactModelsInRobotics.md) - simulator contact-law choices 作为 modeling assumptions，并包含 contact pipeline 图
- [Contact Solvers（接触求解器）](concepts/ContactSolvers.md) - 计算 contact forces 与 impulses 的 numerical methods，以及 solver taxonomy
- [Differentiable Physics（可微物理）](concepts/DifferentiablePhysics.md) - simulator gradients、contact artifacts 与 gradient contamination
- [Simulation Reality Gap（仿真现实差距）](concepts/SimulationRealityGap.md) - contact approximations 到 sim-to-real mismatch 的 causal flow
- [World Model Evaluation](concepts/WorldModelEvaluation.md) - world model metrics 从 pixel fidelity 到 state understanding 与 task performance 的评估层次
- [World Model Taxonomy](concepts/WorldModelTaxonomy.md) - Functionality、Temporal Modeling、Spatial Representation 三轴分类
- [World Models for Embodied AI](concepts/WorldModelsForEmbodiedAI.md) - action-conditioned latent simulators 的 POMDP/ELBO 机制与 practical failure modes

## Syntheses
