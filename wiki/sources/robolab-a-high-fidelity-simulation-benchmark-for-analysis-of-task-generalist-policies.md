---
title: "RoboLab: A High-Fidelity Simulation Benchmark for Analysis of Task Generalist Policies"
type: source
tags: [robotics, simulation, benchmark, vla, policy-evaluation]
sources: []
last_updated: 2026-04-27
source_file: raw/robolab.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2604.09860
extracted_text: graph/extracts/robolab.md
source_date: 2026-04-14
project_url: https://research.nvidia.com/labs/srl/projects/robolab/
---

## 摘要

Xuning Yang、Rishit Dagli、Alex Zook、Hugo Hadfield、Ankit Goyal、Stan Birchfield、Fabio Ramos 和 Jonathan Tremblay 提出 [[RoboLab]]：一个基于 NVIDIA Isaac Lab / Isaac Sim 的 high-fidelity simulation benchmark，用来分析 real-world task-generalist robot policies 在仿真中的泛化、脆弱性与外部因素敏感度。论文的中心动机是：robot foundation models 已经很强，但许多 simulation benchmarks 因为 train/eval domain overlap 和快速饱和，不能有效暴露真实的 out-of-distribution task generalization。

RoboLab 的具体形态是 [[TaskGeneralistPolicyEvaluation|task-generalist policy evaluation]] platform：scene、task、robot、policy、observation/action configuration 分离；tasks 通过 language instructions、success/failure predicates 和 subtasks 定义；同一 task library 可以和不同 robot/policy 组合成 runnable environments。RoboLab-120 包含 120 个 manipulation tasks，覆盖 visual、relational、procedural 三类 competency，并使用 vague/default/specific instruction variants 检验 language grounding。官方 project page 报告，在 off-the-shelf DROID-finetuned policies 上，最好模型 π0.5 的 overall success 也只有 16.8% / 23.3% / 25.8%（vague/default/specific），说明 benchmark 主要暴露 current VLA policies 的 residual gap，而不是追求高分排行榜。

Source URL: https://arxiv.org/abs/2604.09860

Related project page: https://research.nvidia.com/labs/srl/projects/robolab/

Related code: https://github.com/NVlabs/RoboLab

## 核心主张

- RoboLab 试图回答两个问题：simulation 能在多大程度上解释 real-world policy performance，以及哪些 controllable external factors 最影响 policy behavior。
- Benchmark 设计针对已有 benchmarks 的 domain overlap 和 saturation risk：任务、对象、语言和场景被设计为与 DROID training distribution 有显著差异；project page 报告 benchmark object vocabulary 对 DROID 的 word-level coverage 为 68.7%，而 DROID vocabulary 对 benchmark 的 coverage 只有 2.5%。
- RoboLab-120 的 three competency axes 是 visual（color、semantics、size）、relational（temporal、numerical、spatial relationships）和 procedural（affordances、reorientation、stacking/sorting 等 action-oriented reasoning）。Paper main text 报告 44 relational、91 visual、36 procedural task-axis assignments。
- Benchmark statistics：120 tasks、平均 2.02 subtasks/task、平均 9.0 objects/task、平均 difficulty score 2.90；paper 报告 difficulty distribution 为 simple 65、moderate 38、complex 18，而 repo docs snapshot 报告 simple 64、moderate 39、complex 17。
- Language specificity 是 evaluation variable，而不是只作为 prompt 文案。相同 scene 与 goal 可以使用 vague/default/specific instructions；官方结果显示 vague instructions 通常降低 success，说明 policy failure 不只来自 control，也来自 language-to-object/task grounding。
- Evaluation metrics 不只包含 binary success。Paper 使用 normalized graded subtask score、wrong-object/object-dropped/gripper-collision event counts、trajectory metrics（SPARC、path length、end-effector speed）和 sensitivity analysis 来诊断 failure mode。
- Scene/task generation workflow 声称可用 LLM + geometric solver + physics validation 扩展场景与任务：scene plan 先转成 object placements，随后在 Isaac Sim 中 forward-simulate 300 steps under gravity 检查 stability；task generation 还做 syntax validation、asset validation 和 fix-prompt retry。
- RoboLab 的 failure analysis 强调 wrong-object grasps：视觉相似、几何形状 bias、语义混淆和 proximity bias 会使 VLA 抓错对象，例如把 lime task 误抓 lemon/red onion/pomegranate，或把 boxed-food task 误抓 cylindrical cans。
- Sensitivity analysis 使用 [[SimulationSensitivityAnalysis|Neural Posterior Estimation]] 思路分析 environment parameters $\theta$ 与 outcome $x$ 的关系，估计 $p(\theta \mid x) \propto p(x \mid \theta)p(\theta)$；project page 特别指出 wrist camera sensitivity。
- Real-robot verification 覆盖 6 个 selected simple tasks：paper 报告 π0.5 在 real/sim 上为 79.5%/74.0%，π0-FAST 为 34.1%/42.0%，π0 则是 63.2%/18.0% 的 notable outlier，因此 source 支持“RoboLab can be a useful proxy for some task types”，但不支持把 sim score 简单等同于 real score。
- 论文/项目把 high-fidelity simulation 作为 diagnostic proxy，而不是把仿真分数等同于真实部署能力；它的价值在于 controlled perturbations、granular metrics 和可扩展 task libraries。
- Leaderboard 与 results submission portal 仍在开发中，因此当前 evidence 更适合用于理解 benchmark methodology 和 early policy gaps，而不是作为长期稳定的 SOTA 排名。

## 关键引文

- "true generalization testing"
- "prevent benchmark oversaturation"
- "same scene, same goal"

## 关联

- [[RoboLab]] - benchmark/platform entity page。
- [[nvlabs-robolab|NVlabs/RoboLab]] - official implementation repository。
- [[TaskGeneralistPolicyEvaluation]] - RoboLab 对 task-generalist robot policies 的 evaluation formalism。
- [[SimulationSensitivityAnalysis]] - 用 controlled perturbations 与 posterior inference 找出影响 policy success 的 environment factors。
- [[VisionLanguageActionModels]] - RoboLab 评测的 policy family，包括 π0/π0-FAST/π0.5、GR00T、PaliGemma-style policies。
- [[Pi07]] - 当前 wiki 中另一个 robot foundation model source；RoboLab 提供 complementary evaluation lens。
- [[SimulationRealityGap]] - RoboLab 的核心假设之一是 high-fidelity sim 可以帮助分析 real-world policy behavior，但仍需检查 sim-to-real validity。

## 开放问题

- RoboLab 的 simulation-to-real correlation 在不同 policy families、robots、camera layouts 和 object sets 上是否稳定？
- Benchmark object/task distribution 是否会随着 community submissions 持续演化，从而真正避免 saturation？
- NPE/MNPE sensitivity analysis 的 posterior 是否能区分 causal factors 与 dataset sampling artifacts？
- Predicate-based success checking 能否覆盖 deformable objects、tool use、partial observability 和 recovery behavior 中更复杂的 task semantics？
- 当前 reported results 使用 off-the-shelf DROID-finetuned policies；如果 policy 在 RoboLab 上 co-training 或 targeted fine-tuning，benchmark 是否仍能保持 OOD diagnostic value？
- Paper 与 repo docs snapshot 对 simple/moderate/complex distribution 有 1-task discrepancy；未来 re-ingest 时需要确认 metadata 是否更新。
- 论文限制 RoboLab 目前主要覆盖 rigid-body tabletop scenes；deformable objects、force-control-heavy contact skills、compliant interaction 和 complex frictional dynamics 仍是明显缺口。
