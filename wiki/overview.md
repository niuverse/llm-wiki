---
title: "Overview（总览）"
type: synthesis
tags: []
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]"]
last_updated: 2026-04-27
---

# Overview（总览）

这是 personal LLM wiki 的 living synthesis 页面。

第一个已 ingest source，[[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]]，确立了一个 robotics simulation 主题：contact-rich robot behavior 很大程度上取决于底层 contact model 与 solver choices。该 source 主张，rigid contact 应该通过 [[ContactComplementarity|contact complementarity（接触互补）]] 来理解：Signorini unilateral contact、Coulomb friction 和 maximum dissipation 会导向一个 NCP，而 simulators 通常为了 speed、conditioning 或 implementation convenience 对它进行 relaxation。

当前 synthesis 是：[[ContactModelsInRobotics|contact models in robotics]] 应该被看作 task-level assumptions，而不只是 implementation details。在温和场景中，例如 flat、high-friction 的 quadruped MPC，不同 simulators 可能得到相似的 controller outcomes。但在更困难的场景中，例如 sliding、redundant contacts、ill-conditioning、rough terrain 或 low friction，solver/model approximations 可能产生 internal forces、energy artifacts、failed convergence，并扩大 [[SimulationRealityGap|simulation reality gap]]。

这也留下了一个关于 [[DifferentiablePhysics|differentiable physics]] 的重要问题：如果 forward simulator 使用 artificial compliance，或产生 spurious contact forces，那么 gradients 可能反映的是 numerical artifacts，而不是目标 physical system。
