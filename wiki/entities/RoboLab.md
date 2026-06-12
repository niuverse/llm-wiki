---
title: "RoboLab"
type: entity
tags: [robotics, benchmark, simulation, isaac-lab]
sources: ["[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]"]
last_updated: 2026-06-12
---

# RoboLab

RoboLab 是 [[NVIDIA]] 发布的 high-fidelity simulation benchmark/platform，用于分析 task-generalist robot policies 的 manipulation generalization、language grounding、robustness 和 environment sensitivity。它不是一个单一 model，而是一套 task library + Isaac Lab environment generation + policy backend + evaluation runner + analysis/dashboard framework。2026-06 repo refresh 显示 RoboLab 正从 paper artifact 扩展为更完整的 local benchmark platform：policy backend folders、adaptive sampling、confidence interval reporting、dashboard、diagnostic tests 和 agentic scene/task generation 都成为 repo design surface。

```mermaid
flowchart LR
  A[USD assets and scenes] --> B[Task dataclasses]
  B --> C[Environment registration]
  C --> D[Policy backend folders]
  D --> E[Evaluation runner]
  E --> F[Episode outputs]
  F --> G[Analysis scripts]
  F --> H[Dashboard]
  E --> I[Adaptive sampling]
  G --> J[Confidence intervals and grouped diagnostics]
  K[Agentic scene/task generation] --> A
  K --> B
```

RoboLab 的关键设计是 separation of concerns：task file 只描述 scene、instruction、termination/subtask logic 和 contact objects；environment registration 再选择 robot embodiment、camera layout、lighting/background、action space 和 observation schema；policy 作为外部 server 接入，并通过 per-backend client/run scripts 统一进入 evaluation runner。这使同一 benchmark 可以比较不同 [[VisionLanguageActionModels|VLA policies]] 和 World-Action Models，也可以测试 same task 在不同 embodiment、observation setup 或 controlled perturbations 下的表现。

RoboLab-120 的 evaluation target 不是训练一个 policy，而是暴露 policy gaps。官方 project page 报告，π0.5 在 default instructions 下 overall success 为 23.3%，complex tasks default success 为 11.7%，而其他 evaluated policies 更低。Paper 还用 6 个 selected simple tasks 做 real/sim verification：π0.5 与 π0-FAST 的 real/sim success trend 接近，但 π0 是 outlier。这些结果把当前 robot foundation models 的问题具体化为 wrong-object grasps、language specificity sensitivity、visual/geometric bias、controlled perturbation sensitivity 和 policy-specific sim-to-real mismatch。

## 实践含义

- 对 robot policy work：RoboLab 提供一种比单任务 demo 更可诊断的 evaluation harness，可以按 task attributes、instruction variants、wrong-object errors、trajectory metrics、confidence intervals 和 dashboard episode replay 分解失败。
- 对 simulation work：RoboLab 把 [[SimulationRealityGap|sim-to-real]] 问题从“仿真是否真实”转成“哪些 perturbations 会显著改变 policy outcome”，并用 [[SimulationSensitivityAnalysis|sensitivity analysis]] 与 [[SimulationBenchmarkReportingPipeline|reporting pipeline]] 保留诊断证据。
- 对 dataset/model work：DROID-style real-world data training 并不自动带来 robust task generalization；RoboLab 通过低 overlap tasks、language variants、policy backend adapters 和 adaptive episode sampling 检验 dataset coverage。
- 对 benchmark authoring：RoboLab 的 `/robolab-scenegen` 与 `/robolab-taskgen` 把 scene/task expansion 写成 [[AgenticSceneTaskGeneration|LLM-assisted authoring workflow]]，但 generated tasks 仍需要 predicate、metadata 和 simulation validation 约束。

## 限制

RoboLab 的 evidence 仍主要是 official paper/project/repo。Leaderboard 与 community submissions 的长期 governance 仍在演化；paper 自身也限制 scope 到 rigid-body tabletop scenes，不充分覆盖 deformables、force-control-heavy contact skills 和 complex frictional dynamics。因此当前更适合作为 methodology 与 diagnostic benchmark 来理解，而不是作为长期稳定 ranking。Repo refresh 中大量 asset `_wip` removal 属于 curation churn，不应直接解读为 benchmark capability 的理论变化。
