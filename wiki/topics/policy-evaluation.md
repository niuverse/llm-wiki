---
title: "策略评测"
type: "topic"
tags: ["robotics", "source-backed"]
sources: ["[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[nvlabs-robolab]]", "[[spinning-up-rl-key-concepts]]", "[[spinning-up-rl-algorithm-taxonomy]]"]
modified: "2026-10-08"
description: "数据构成和评测协议共同影响泛化判断；仿真高分不等于真实可靠。"
---

# 策略评测

检查数据构成、训练测试隔离以及仿真结果的外部有效性。

## 方法与证据

[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab]]强调受控扰动、分级指标与真实／仿真对照；[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]]研究任务场景覆盖、混合数据和训练阶段；[[pi07-steerable-generalist-robotic-foundation-model|π0.7]]与[[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]]从上下文与动力学目标组织数据。

**当前判断：**更多数据、仿真高分与真实泛化之间都需要实验桥梁。不同策略、任务及训练方式的结果不能直接排列成通用能力榜。目标基准上的后训练必须注明，因为它改变了评测所回答的问题。

## 支撑资料

- [[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab: A High-Fidelity Simulation Benchmark for Analysis of Task Generalist Policies]]
- [[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365: A Large-Scale Simulation Framework for Training and Benchmarking Generalist Robots]]
- [[pi07-steerable-generalist-robotic-foundation-model|π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities]]
- [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B: Scaling Latent Dynamics Action Model via Universal Embodied Data Ingestion]]
- [[nvlabs-robolab|NVlabs/RoboLab]]

## 机制基础

[[TaskGeneralistPolicyEvaluation|通用任务策略评估]]、[[RobotLearningDataComposition|训练数据构成]]、[[RobotLearningObjectives|机器人学习目标]]、[[CompositionalGeneralizationInRobotics|Compositional Generalization]]、[[SimulationSensitivityAnalysis|仿真敏感性分析]]、[[SimulationBenchmarkReportingPipeline|仿真评测与统计]]。

## 读实验时先检查比较条件

[[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]] 的两阶段方案优于联合训练，但总更新步数不同；任务覆盖增加时数据量也变了。因此，“阶段安排有效”是完整方案的经验结果，尚不能独立量化顺序或多样性的因果贡献。目标任务微调后的成功也应与未见任务零样本泛化分开。

[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab]] 用固定策略和受控扰动诊断失败，但有限真机对照并非所有策略都一致；固定种子的测试回合不等于独立训练种子。[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab]] 的端到端收益也要连同算法、硬件与视觉负载阅读。教学上应同时记录“比较了什么”和“还没有隔离什么”。

## 例子：在未见厨房中打开抽屉

这是一个评测设计例子：为“在未见厨房中打开抽屉”记录机器人与动作模式、观测、奖励、终态成功条件、训练数据来源、未见因素、训练预算和测试回合数。然后分别设计“冻结策略测试”和“提供少量目标示范后适应”两种实验，写出它们回答的不同问题。用 [[TaskGeneralistPolicyEvaluation|评测概念页]] 核对协议，用 [[RobotLearningDataComposition|数据构成页]] 核对数据分布。

## 未解问题与优先补证

怎样隔离训练、适应和测试场景？固定有效样本数与预算时，数据质量、混合权重和训练顺序各贡献多少？仿真失败因素能否预测硬件失败，需跨策略与任务检验。

这些是研究问题与验证要求，尚未作为已有结论。沿 [[topics/robot-policy-learning|策略学习]] 与 [[topics/evaluation-and-transfer|评测与迁移]] 查看相关研究。

评测设计可参考 [[simulation-post-training-evaluation|冻结评测、目标适应与真实迁移的协议建议]]。后续优先核验以下候选资料；这些链接尚未完成归档与全文收录，不支持本页的知识结论：

- [SIMPLER 项目](https://simpler-env.github.io/)：核验真实策略的仿真代理评测及排序指标。
- [仿真与现实评测相关性研究](https://arxiv.org/abs/2606.10366)：核验目标域适应是否改善相关性，以及实验预算与适用范围。
- [RoboTwin 2.0](https://arxiv.org/abs/2506.18088)：核验训练式基准、随机化和真实迁移的对照条件。
- [LIBERO 仓库](https://github.com/Lifelong-Robot-Learning/LIBERO)、[CALVIN 仓库](https://github.com/mees/calvin)：核验连续学习和长程任务协议，避免混用冻结与适应成绩。
