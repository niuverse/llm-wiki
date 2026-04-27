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
- [Wiki Log](log.md) - append-only operation history

## Sources

- [A Comprehensive Survey on World Models for Embodied AI](sources/a-comprehensive-survey-on-world-models-for-embodied-ai.md) - embodied AI world models 的 POMDP/ELBO formalization、三轴 taxonomy、datasets/metrics 与 open challenges
- [AwesomeWorldModels](sources/awesome-world-models.md) - survey companion GitHub repository，按 taxonomy 维护 world model bibliography
- [Contact Models in Robotics: a Comparative Analysis](sources/contact-models-in-robotics-a-comparative-analysis.md) - robotic contact models 与 contact solvers 的 comparative survey 和 benchmark
- [LDA-1B: Scaling Latent Dynamics Action Model via Universal Embodied Data Ingestion](sources/lda-1b-scaling-latent-dynamics-action-model.md) - dynamics-centric robot foundation model，用 DINO latent、MM-DiT 和 EI-30K 做 role-aware heterogeneous data ingestion
- [NVlabs/RoboLab](sources/nvlabs-robolab.md) - RoboLab official implementation repository，包含 Isaac Lab task library、predicate/subtask system、policy clients 与 analysis tooling
- [π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities](sources/pi07-steerable-generalist-robotic-foundation-model.md) - Physical Intelligence 的 steerable VLA model，强调 context conditioning、subgoal images、metadata 与 compositional robot generalization
- [RoboLab: A High-Fidelity Simulation Benchmark for Analysis of Task Generalist Policies](sources/robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies.md) - NVIDIA 的 high-fidelity simulation benchmark，用 RoboLab-120、language variants 与 sensitivity analysis 评测 task-generalist robot policies

## Entities

- [AwesomeWorldModels](entities/AwesomeWorldModels.md) - survey companion bibliography repository
- [ContactBench](entities/ContactBench.md) - source 中的 unified C++ contact-model benchmark framework
- [EI-30K](entities/EI30K.md) - LDA-1B source 构建的 30k+ hour heterogeneous embodied interaction dataset
- [Galbot](entities/Galbot.md) - LDA-1B source 中的作者机构与 Galbot G1 real-world evaluation platform context
- [LDA-1B](entities/LDA1B.md) - dynamics-centric robot foundation model，统一 policy、latent dynamics 和 visual forecasting
- [MuJoCo](entities/MuJoCo.md) - source 中用于讨论 contact regularization tradeoffs 的 robotics physics engine
- [NVIDIA](entities/NVIDIA.md) - RoboLab paper/project/repo 的发布机构与 Isaac simulation stack 上下文
- [Physical Intelligence](entities/PhysicalIntelligence.md) - π0.7 source 中的 robot foundation model research organization
- [π0.7](entities/Pi07.md) - steerable generalist VLA model，使用 language、metadata、subgoal images 和 control mode conditioning
- [RaiSim](entities/RaiSim.md) - source 中用于讨论 quadruped transfer 与 per-contact handling 的 robotics simulator
- [RoboLab](entities/RoboLab.md) - high-fidelity simulation benchmark/platform for task-generalist robot policy evaluation

## Concepts

- [Compositional Generalization in Robotics](concepts/CompositionalGeneralizationInRobotics.md) - robot policies 如何把 seen skills、objects、embodiments 与 instructions 重新组合到 unseen tasks
- [Contact Complementarity（接触互补）](concepts/ContactComplementarity.md) - rigid contact、friction cone、NCP/LCP/CCP 与 residual intuition
- [Contact Models in Robotics](concepts/ContactModelsInRobotics.md) - simulator contact-law choices 作为 modeling assumptions，并包含 contact pipeline 图
- [Contact Solvers（接触求解器）](concepts/ContactSolvers.md) - 计算 contact forces 与 impulses 的 numerical methods，以及 solver taxonomy
- [Differentiable Physics（可微物理）](concepts/DifferentiablePhysics.md) - simulator gradients、contact artifacts 与 gradient contamination
- [Latent Dynamics Action Models](concepts/LatentDynamicsActionModels.md) - 用 DINO latent、diffusion action chunks 与 multi-task objective routing 学习 robot interaction dynamics
- [Robot Context Conditioning](concepts/RobotContextConditioning.md) - 用 task/subtask language、metadata、subgoal images 与 control mode disambiguate heterogeneous robot data
- [Simulation Reality Gap（仿真现实差距）](concepts/SimulationRealityGap.md) - contact approximations 到 sim-to-real mismatch 的 causal flow
- [Simulation Sensitivity Analysis](concepts/SimulationSensitivityAnalysis.md) - 用 controlled perturbations 与 NPE/MNPE posterior 找出影响 robot policy success 的环境参数
- [Task-Generalist Policy Evaluation](concepts/TaskGeneralistPolicyEvaluation.md) - 用 task libraries、language variants、predicates、subtask scoring 和 diagnostics 评估泛化 robot policies
- [Vision-Language-Action Models](concepts/VisionLanguageActionModels.md) - 从 observation history 和 context 预测 robot action chunks 的 VLA policy formalism
- [World Model Evaluation](concepts/WorldModelEvaluation.md) - world model metrics 从 pixel fidelity 到 state understanding 与 task performance 的评估层次
- [World Model Taxonomy](concepts/WorldModelTaxonomy.md) - Functionality、Temporal Modeling、Spatial Representation 三轴分类
- [World Models for Embodied AI](concepts/WorldModelsForEmbodiedAI.md) - action-conditioned latent simulators 的 POMDP/ELBO 机制与 practical failure modes

## Syntheses
