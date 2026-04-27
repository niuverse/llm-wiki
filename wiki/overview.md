---
title: "Overview（总览）"
type: synthesis
tags: []
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[awesome-world-models]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]", "[[lda-1b-scaling-latent-dynamics-action-model]]"]
last_updated: 2026-04-27
---

# Overview（总览）

这是 personal LLM wiki 的 living synthesis 页面。

已 ingest sources 现在形成五条相连的线索。第一条来自 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]]：contact-rich robot behavior 很大程度上取决于底层 contact model 与 solver choices。rigid contact 应该通过 [[ContactComplementarity|contact complementarity（接触互补）]] 来理解：Signorini unilateral contact、Coulomb friction 和 maximum dissipation 会导向一个 NCP，而 simulators 通常为了 speed、conditioning 或 implementation convenience 对它进行 relaxation。

第二条来自 [[a-comprehensive-survey-on-world-models-for-embodied-ai|A Comprehensive Survey on World Models for Embodied AI]] 及其 companion repo [[awesome-world-models|AwesomeWorldModels]]：learned [[WorldModelsForEmbodiedAI|world models]] 也是 simulators，只是它们用 latent dynamics、tokens、spatial grids 或 differentiable rendering 来生成 future rollouts。论文把这个领域组织成 [[WorldModelTaxonomy|Functionality x Temporal Modeling x Spatial Representation]] 三轴 taxonomy，并强调 [[WorldModelEvaluation|evaluation]] 不能停留在 pixel fidelity，需要检验 physical consistency、state understanding 与 task performance。

第三条来自 [[pi07-steerable-generalist-robotic-foundation-model|π0.7]]：robot foundation model 可以把 world model 放进 real-time policy stack，而不是让 world model 单独规划。π0.7 的 [[WorldModelsForEmbodiedAI|world model]] 生成 multi-view subgoal images，[[VisionLanguageActionModels|VLA]] 再用 task/subtask language、metadata、control mode 和 visual goals 预测 action chunks。这里的核心不是“模型知道更多”，而是 [[RobotContextConditioning|context conditioning]] 让 heterogeneous data 中的 strategy、quality、speed、mistake 和 embodiment differences 变成可 steering 的条件。

第四条来自 [[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab]] 与 [[nvlabs-robolab|NVlabs/RoboLab]]：robot foundation models 需要 evaluation substrate，而不是只靠 demo videos 或 seen-task success。RoboLab 把 high-fidelity simulation、task libraries、language variants、predicate-based success checks、wrong-object diagnostics、trajectory metrics 和 [[SimulationSensitivityAnalysis|sensitivity analysis]] 组织成 [[TaskGeneralistPolicyEvaluation|task-generalist policy evaluation]] workflow，用 controlled perturbations 暴露 VLA policies 对 camera、language、object distribution 和 scene factors 的依赖；它的 six-task real/sim verification 也提醒我们，simulation proxy validity 会随 policy/task family 改变。

第五条来自 [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]]：robot foundation model scaling 也可以把 dynamics learning 放回中心。[[LatentDynamicsActionModels|Latent Dynamics Action Model]] 不只做 expert behavior cloning，而是在 DINO latent space 中 cotrain policy、forward dynamics、inverse dynamics 和 visual forecasting；[[EI30K|EI-30K]] 则把 high-quality demonstrations、low-quality trajectories 和 actionless egocentric videos 分配到不同 training objectives。这个 source 把“heterogeneous data 是否有害”的问题改写成“data role 是否被正确建模”。

当前 synthesis 是：无论 downstream system 使用 hand-designed contact solver、learned world model、prompt-conditioned VLA、latent dynamics pretraining，还是 high-fidelity benchmark，关键问题都是 model assumptions 如何进入 decisions 与 evaluations。[[ContactModelsInRobotics|contact models in robotics]] 应该被看作 task-level assumptions，而不只是 implementation details；[[WorldModelsForEmbodiedAI|world models]] 的 latent state、temporal rollout 和 spatial representation 决定 agent 能想象什么；[[RobotContextConditioning|context conditioning]] 和 [[LatentDynamicsActionModels|data-role/objective conditioning]] 决定 robot policy 会从 heterogeneous data 中执行哪个 behavior mode；[[TaskGeneralistPolicyEvaluation|benchmark task design]] 则决定我们会观察到哪些 failure modes，以及哪些 failure 会被 aggregate success 掩盖。

在温和场景中，例如 flat、high-friction 的 quadruped MPC、short-horizon video prediction、seen-task imitation、expert-only BC 或 benchmark-overlap-heavy evaluation，不同 modeling choices 可能看起来等价。但在 sliding、redundant contacts、ill-conditioning、rough terrain、low friction、long-horizon rollouts、cross-embodiment transfer、unseen task composition、vague language、visual distractors、camera perturbations 或 mixed-quality training data 中，solver/model/context/evaluation approximations 可能产生 internal forces、energy artifacts、failed convergence、temporal drift、physically inconsistent futures、dataset-bias behavior、wrong-object grasp、language grounding failure、bad-action imitation 或 unrecoverable task-plan errors，并扩大 [[SimulationRealityGap|simulation reality gap]]。

这也留下了一个关于 [[DifferentiablePhysics|differentiable physics]]、prompt-conditioned robot policies 与 simulation benchmarks 的共同问题：如果 forward simulator 使用 artificial compliance、产生 spurious contact forces，learned world model 用 perceptual metrics 掩盖 dynamics errors，VLA 通过 metadata/subgoal prompt 执行 idealized behavior mode，或 benchmark predicates 只捕获 easy-to-measure success，那么 gradients、planning signals、action chunks 和 reported scores 都可能反映 artifacts，而不是目标 physical system。
