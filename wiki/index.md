---
title: "Wiki Index"
type: synthesis
tags: [index, navigation]
sources: []
last_updated: 2026-04-27
---

# Wiki Index

这个文件由 Codex 维护。新增、重命名或删除 wiki pages 时必须同步更新。第一部分是研究入口；后半部分是完整 inventory，用于 Obsidian、Quartz 和 deterministic health checks。

## 从研究问题进入

- **当前总判断**：先读 [Overview（总览）](overview.md)。它维护当前 wiki 对 embodied AI、robotics simulation、world models、robot foundation models 与 evaluation 的综合判断。
- **问题索引**：读 [Research Questions](syntheses/research-questions.md)。它把当前 wiki 能回答的高价值问题连接到相应 concept/source，而不额外引入复杂 map 层。
- **World model 如何影响 robot decision？** 读 [World Models for Embodied AI](concepts/WorldModelsForEmbodiedAI.md)、[World Model Evaluation](concepts/WorldModelEvaluation.md)、[Latent Dynamics Action Models](concepts/LatentDynamicsActionModels.md)。
- **Inverse dynamics model 怎么从视频学 action？** 读 [Inverse Dynamics Models](concepts/InverseDynamicsModels.md)、[Latent Dynamics Action Models](concepts/LatentDynamicsActionModels.md)、[Seer](entities/Seer.md)、[DeFI](entities/DeFI.md)。
- **Robot foundation model 如何处理 heterogeneous data？** 读 [Vision-Language-Action Models](concepts/VisionLanguageActionModels.md)、[Robot Context Conditioning](concepts/RobotContextConditioning.md)、[Latent Dynamics Action Models](concepts/LatentDynamicsActionModels.md)。
- **Simulation benchmark 能证明什么？** 读 [Task-Generalist Policy Evaluation](concepts/TaskGeneralistPolicyEvaluation.md)、[Simulation Sensitivity Analysis](concepts/SimulationSensitivityAnalysis.md)、[Simulation Reality Gap（仿真现实差距）](concepts/SimulationRealityGap.md)。
- **Contact physics 为什么会影响 learning/control？** 读 [Contact Models in Robotics](concepts/ContactModelsInRobotics.md)、[Contact Complementarity（接触互补）](concepts/ContactComplementarity.md)、[Contact Solvers（接触求解器）](concepts/ContactSolvers.md)、[Differentiable Physics（可微物理）](concepts/DifferentiablePhysics.md)。

## 维护入口

- [Wiki Log](log.md) - append-only operation history
- Health check: `python3 tools/health.py`
- Graph build: `uv run python tools/build_graph.py --report`
- Publishing preview: `npm run wiki:preview`
- Production build: `npm run wiki:build`

## Syntheses

- [Research Questions](syntheses/research-questions.md) - 当前 wiki 支持的高价值研究问题、阅读路径和 evidence boundary

## Sources

### World Models

- [A Comprehensive Survey on World Models for Embodied AI](sources/a-comprehensive-survey-on-world-models-for-embodied-ai.md) - embodied AI world models 的 POMDP/ELBO formalization、三轴 taxonomy、datasets/metrics 与 open challenges
- [AwesomeWorldModels](sources/awesome-world-models.md) - survey companion GitHub repository，按 taxonomy 维护 world model bibliography

### Robot Foundation Models

- [Predictive Inverse Dynamics Models are Scalable Learners for Robotic Manipulation](sources/predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation.md) - Seer/PIDM 框架，用 foresight token 和 inverse dynamics action token end-to-end 连接 vision prediction 与 action prediction
- [Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining](sources/disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining.md) - DeFI 框架，把 visual forward dynamics 和 inverse dynamics 分开预训练，再耦合微调到 robot actions
- [LDA-1B: Scaling Latent Dynamics Action Model via Universal Embodied Data Ingestion](sources/lda-1b-scaling-latent-dynamics-action-model.md) - dynamics-centric robot foundation model，用 DINO latent、MM-DiT 和 EI-30K 做 role-aware heterogeneous data ingestion
- [π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities](sources/pi07-steerable-generalist-robotic-foundation-model.md) - Physical Intelligence 的 steerable VLA model，强调 context conditioning、subgoal images、metadata 与 compositional robot generalization

### Simulation And Evaluation

- [NVlabs/RoboLab](sources/nvlabs-robolab.md) - RoboLab official implementation repository，包含 Isaac Lab task library、predicate/subtask system、policy clients 与 analysis tooling
- [RoboLab: A High-Fidelity Simulation Benchmark for Analysis of Task Generalist Policies](sources/robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies.md) - NVIDIA 的 high-fidelity simulation benchmark，用 RoboLab-120、language variants 与 sensitivity analysis 评测 task-generalist robot policies

### Contact Physics

- [Contact Models in Robotics: a Comparative Analysis](sources/contact-models-in-robotics-a-comparative-analysis.md) - robotic contact models 与 contact solvers 的 comparative survey 和 benchmark

## Concepts

### World Models

- [World Models for Embodied AI](concepts/WorldModelsForEmbodiedAI.md) - action-conditioned latent simulators 的 POMDP/ELBO 机制与 practical failure modes
- [World Model Taxonomy](concepts/WorldModelTaxonomy.md) - Functionality、Temporal Modeling、Spatial Representation 三轴分类
- [World Model Evaluation](concepts/WorldModelEvaluation.md) - world model metrics 从 pixel fidelity 到 state understanding 与 task performance 的评估层次
- [Latent Dynamics Action Models](concepts/LatentDynamicsActionModels.md) - 用 DINO latent、diffusion action chunks 与 multi-task objective routing 学习 robot interaction dynamics
- [Inverse Dynamics Models](concepts/InverseDynamicsModels.md) - 从 current/future visual transition 推断 action 或 latent action 的模型，包含 DeFI/GIDM 的 self-supervised video pretraining 机制

### Robot Foundation Models

- [Vision-Language-Action Models](concepts/VisionLanguageActionModels.md) - 从 observation history 和 context 预测 robot action chunks 的 VLA policy formalism
- [Robot Context Conditioning](concepts/RobotContextConditioning.md) - 用 task/subtask language、metadata、subgoal images 与 control mode disambiguate heterogeneous robot data
- [Compositional Generalization in Robotics](concepts/CompositionalGeneralizationInRobotics.md) - robot policies 如何把 seen skills、objects、embodiments 与 instructions 重新组合到 unseen tasks

### Simulation And Evaluation

- [Task-Generalist Policy Evaluation](concepts/TaskGeneralistPolicyEvaluation.md) - 用 task libraries、language variants、predicates、subtask scoring 和 diagnostics 评估泛化 robot policies
- [Simulation Sensitivity Analysis](concepts/SimulationSensitivityAnalysis.md) - 用 controlled perturbations 与 NPE/MNPE posterior 找出影响 robot policy success 的环境参数
- [Simulation Reality Gap（仿真现实差距）](concepts/SimulationRealityGap.md) - contact approximations、learned dynamics 和 policy context 到 sim-to-real mismatch 的 causal flow

### Contact Physics

- [Contact Models in Robotics](concepts/ContactModelsInRobotics.md) - simulator contact-law choices 作为 modeling assumptions，并包含 contact pipeline 图
- [Contact Complementarity（接触互补）](concepts/ContactComplementarity.md) - rigid contact、friction cone、NCP/LCP/CCP 与 residual intuition
- [Contact Solvers（接触求解器）](concepts/ContactSolvers.md) - 计算 contact forces 与 impulses 的 numerical methods，以及 solver taxonomy
- [Differentiable Physics（可微物理）](concepts/DifferentiablePhysics.md) - simulator gradients、contact artifacts 与 gradient contamination

## Entities

### Models, Datasets, And Benchmarks

- [DeFI](entities/DeFI.md) - decoupled forward/inverse dynamics pretraining framework，用 GFDM、GIDM 和 action adapter 从 videos 到 robot commands
- [EI-30K](entities/EI30K.md) - LDA-1B source 构建的 30k+ hour heterogeneous embodied interaction dataset
- [LDA-1B](entities/LDA1B.md) - dynamics-centric robot foundation model，统一 policy、latent dynamics 和 visual forecasting
- [Seer](entities/Seer.md) - end-to-end PIDM model，用 [FRS] foresight token 和 [INV] action token 做 robot manipulation policy learning
- [π0.7](entities/Pi07.md) - steerable generalist VLA model，使用 language、metadata、subgoal images 和 control mode conditioning
- [RoboLab](entities/RoboLab.md) - high-fidelity simulation benchmark/platform for task-generalist robot policy evaluation
- [ContactBench](entities/ContactBench.md) - source 中的 unified C++ contact-model benchmark framework

### Organizations And Repositories

- [AwesomeWorldModels](entities/AwesomeWorldModels.md) - survey companion bibliography repository
- [Galbot](entities/Galbot.md) - LDA-1B source 中的作者机构与 Galbot G1 real-world evaluation platform context
- [NVIDIA](entities/NVIDIA.md) - RoboLab paper/project/repo 的发布机构与 Isaac simulation stack 上下文
- [Physical Intelligence](entities/PhysicalIntelligence.md) - π0.7 source 中的 robot foundation model research organization

### Simulation Tools

- [MuJoCo](entities/MuJoCo.md) - source 中用于讨论 contact regularization tradeoffs 的 robotics physics engine
- [RaiSim](entities/RaiSim.md) - source 中用于讨论 quadruped transfer 与 per-contact handling 的 robotics simulator
