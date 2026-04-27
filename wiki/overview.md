---
title: "Overview（总览）"
type: synthesis
tags: []
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[awesome-world-models]]"]
last_updated: 2026-04-27
---

# Overview（总览）

这是 personal LLM wiki 的 living synthesis 页面。

已 ingest sources 现在形成两条相连的线索。第一条来自 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]]：contact-rich robot behavior 很大程度上取决于底层 contact model 与 solver choices。rigid contact 应该通过 [[ContactComplementarity|contact complementarity（接触互补）]] 来理解：Signorini unilateral contact、Coulomb friction 和 maximum dissipation 会导向一个 NCP，而 simulators 通常为了 speed、conditioning 或 implementation convenience 对它进行 relaxation。

第二条来自 [[a-comprehensive-survey-on-world-models-for-embodied-ai|A Comprehensive Survey on World Models for Embodied AI]] 及其 companion repo [[awesome-world-models|AwesomeWorldModels]]：learned [[WorldModelsForEmbodiedAI|world models]] 也是 simulators，只是它们用 latent dynamics、tokens、spatial grids 或 differentiable rendering 来生成 future rollouts。论文把这个领域组织成 [[WorldModelTaxonomy|Functionality x Temporal Modeling x Spatial Representation]] 三轴 taxonomy，并强调 [[WorldModelEvaluation|evaluation]] 不能停留在 pixel fidelity，需要检验 physical consistency、state understanding 与 task performance。

当前 synthesis 是：无论 simulator 是 hand-designed contact solver 还是 learned world model，关键问题都是 model assumptions 如何进入 downstream decisions。[[ContactModelsInRobotics|contact models in robotics]] 应该被看作 task-level assumptions，而不只是 implementation details；同样，[[WorldModelsForEmbodiedAI|world models]] 的 latent state、temporal rollout 和 spatial representation 也决定 agent 能想象什么、忽略什么、如何失败。

在温和场景中，例如 flat、high-friction 的 quadruped MPC 或 short-horizon video prediction，不同 modeling choices 可能看起来等价。但在 sliding、redundant contacts、ill-conditioning、rough terrain、low friction、long-horizon rollouts 或 closed-loop control 中，solver/model approximations 可能产生 internal forces、energy artifacts、failed convergence、temporal drift 或 physically inconsistent futures，并扩大 [[SimulationRealityGap|simulation reality gap]]。

这也留下了一个关于 [[DifferentiablePhysics|differentiable physics]] 的重要问题：如果 forward simulator 使用 artificial compliance、产生 spurious contact forces，或 learned world model 用 perceptual metrics 掩盖 dynamics errors，那么 gradients 和 planning signals 可能反映 artifacts，而不是目标 physical system。
