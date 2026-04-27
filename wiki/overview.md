---
title: "Overview（总览）"
type: synthesis
tags: []
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[awesome-world-models]]", "[[pi07-steerable-generalist-robotic-foundation-model]]"]
last_updated: 2026-04-27
---

# Overview（总览）

这是 personal LLM wiki 的 living synthesis 页面。

已 ingest sources 现在形成三条相连的线索。第一条来自 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]]：contact-rich robot behavior 很大程度上取决于底层 contact model 与 solver choices。rigid contact 应该通过 [[ContactComplementarity|contact complementarity（接触互补）]] 来理解：Signorini unilateral contact、Coulomb friction 和 maximum dissipation 会导向一个 NCP，而 simulators 通常为了 speed、conditioning 或 implementation convenience 对它进行 relaxation。

第二条来自 [[a-comprehensive-survey-on-world-models-for-embodied-ai|A Comprehensive Survey on World Models for Embodied AI]] 及其 companion repo [[awesome-world-models|AwesomeWorldModels]]：learned [[WorldModelsForEmbodiedAI|world models]] 也是 simulators，只是它们用 latent dynamics、tokens、spatial grids 或 differentiable rendering 来生成 future rollouts。论文把这个领域组织成 [[WorldModelTaxonomy|Functionality x Temporal Modeling x Spatial Representation]] 三轴 taxonomy，并强调 [[WorldModelEvaluation|evaluation]] 不能停留在 pixel fidelity，需要检验 physical consistency、state understanding 与 task performance。

第三条来自 [[pi07-steerable-generalist-robotic-foundation-model|π0.7]]：robot foundation model 可以把 world model 放进 real-time policy stack，而不是让 world model 单独规划。π0.7 的 [[WorldModelsForEmbodiedAI|world model]] 生成 multi-view subgoal images，[[VisionLanguageActionModels|VLA]] 再用 task/subtask language、metadata、control mode 和 visual goals 预测 action chunks。这里的核心不是“模型知道更多”，而是 [[RobotContextConditioning|context conditioning]] 让 heterogeneous data 中的 strategy、quality、speed、mistake 和 embodiment differences 变成可 steering 的条件。

当前 synthesis 是：无论 downstream system 使用 hand-designed contact solver、learned world model，还是 prompt-conditioned VLA，关键问题都是 model assumptions 如何进入 decisions。[[ContactModelsInRobotics|contact models in robotics]] 应该被看作 task-level assumptions，而不只是 implementation details；[[WorldModelsForEmbodiedAI|world models]] 的 latent state、temporal rollout 和 spatial representation 决定 agent 能想象什么；[[RobotContextConditioning|context conditioning]] 则决定 robot policy 会执行 dataset 中哪个 behavior mode，而不是平均掉多个互相冲突的 modes。

在温和场景中，例如 flat、high-friction 的 quadruped MPC、short-horizon video prediction 或 seen-task imitation，不同 modeling choices 可能看起来等价。但在 sliding、redundant contacts、ill-conditioning、rough terrain、low friction、long-horizon rollouts、cross-embodiment transfer 或 unseen task composition 中，solver/model/context approximations 可能产生 internal forces、energy artifacts、failed convergence、temporal drift、physically inconsistent futures、dataset-bias behavior 或 unrecoverable task-plan errors，并扩大 [[SimulationRealityGap|simulation reality gap]]。

这也留下了一个关于 [[DifferentiablePhysics|differentiable physics]] 与 prompt-conditioned robot policies 的共同问题：如果 forward simulator 使用 artificial compliance、产生 spurious contact forces，learned world model 用 perceptual metrics 掩盖 dynamics errors，或 VLA 通过 metadata/subgoal prompt 执行 idealized behavior mode，那么 gradients、planning signals 和 action chunks 都可能反映 artifacts，而不是目标 physical system。
