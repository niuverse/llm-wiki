---
title: "Research Questions"
type: synthesis
tags: [research-questions, robotics, embodied-ai]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]", "[[lda-1b-scaling-latent-dynamics-action-model]]"]
last_updated: 2026-04-27
---

# Research Questions

这个页面是轻量问题索引。它不是新的 map 层，也不试图复述所有 source；它只记录当前 wiki 能支持的高价值研究问题，以及回答这些问题时应该进入哪些 concept/source。

## World model 如何进入 robot decision？

当前判断：world model 的关键不是 future 看起来真实，而是 future representation 是否改变 downstream action、policy representation 或 evaluation signal。[[WorldModelsForEmbodiedAI]] 给出 action-conditioned latent simulator 的基本形式；[[WorldModelEvaluation]] 说明 pixel metrics 容易遗漏 physical consistency 与 task relevance；[[pi07-steerable-generalist-robotic-foundation-model|π0.7]] 把 world model 用作 visual subgoal generator；[[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]] 把 world model 放进 latent dynamics pretraining。

优先阅读：[[WorldModelsForEmbodiedAI]]、[[WorldModelTaxonomy]]、[[WorldModelEvaluation]]、[[LatentDynamicsActionModels]]。

证据边界：survey 和 repo 提供 taxonomy 与 literature organization；π0.7/LDA-1B 提供具体 robot foundation model evidence，但 independent replication、real-robot failure cases 和 cross-benchmark comparison 仍不足。

## Simulation benchmark 能证明 robot policy generalization 吗？

当前判断：high-fidelity simulation benchmark 更适合作为 diagnostic instrument，而不是 deployment guarantee。[[TaskGeneralistPolicyEvaluation]] 说明 RoboLab 如何通过 task library、language variants、predicates、wrong-object diagnostics 和 trajectory metrics 观察 policy behavior；[[SimulationSensitivityAnalysis]] 说明 controlled perturbations 可以定位 success/failure 的 risk factors；[[SimulationRealityGap]] 保留 real/sim validity 的限制。

优先阅读：[[TaskGeneralistPolicyEvaluation]]、[[SimulationSensitivityAnalysis]]、[[RoboLab]]、[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]、[[nvlabs-robolab]]。

证据边界：RoboLab 的 six-task real/sim verification 支持 simulation proxy 有价值，但也提示 proxy validity 会随 policy/task family 改变；benchmark score 不能单独等价于真实部署可靠性。

## Contact model 和 solver 为什么会影响 learning/control？

当前判断：contact solver 不是底层可替换实现，而是会改变 forces、impulses、energy dissipation、residual 和 convergence 的 modeling choice。[[ContactComplementarity]] 给出 Signorini、Coulomb friction 和 maximum dissipation 的 rigid contact target；[[ContactSolvers]] 说明 per-contact 与 global/proximal methods 的 tradeoff；[[DifferentiablePhysics]] 说明 solver artifacts 可能污染 optimization gradients。

优先阅读：[[ContactModelsInRobotics]]、[[ContactComplementarity]]、[[ContactSolvers]]、[[DifferentiablePhysics]]、[[contact-models-in-robotics-a-comparative-analysis]]。

证据边界：当前 evidence 强在 controlled contact simulation benchmark；把某个 solver choice 与某个真实 robot deployment failure 直接因果绑定，还需要具体系统证据。

## Heterogeneous robot data 是噪声还是资源？

当前判断：heterogeneous data 的价值取决于系统是否建模 data role。[[RobotContextConditioning]] 说明 π0.7 用 task/subtask language、metadata、control mode、speed、quality 和 subgoal images disambiguate behavior mode；[[LatentDynamicsActionModels]] 说明 LDA-1B 用 policy、forward dynamics、inverse dynamics 和 visual forecasting objectives 区分 high-quality demonstrations、low-quality trajectories 和 actionless videos。

优先阅读：[[RobotContextConditioning]]、[[LatentDynamicsActionModels]]、[[VisionLanguageActionModels]]、[[Pi07]]、[[LDA1B]]、[[EI30K]]。

证据边界：π0.7 与 LDA-1B 都支持“data role matters”，但前者强调 runtime steering，后者强调 training objective routing；两者是否能组合，还没有被当前 sources 证明。

## 当前 wiki 最值得补哪些 source？

当前判断：下一轮 source 补充应优先解决 evidence boundary，而不是继续横向堆 title。最有价值的补充包括 independent replication、失败案例、cross-benchmark evaluation、real-robot deployment reports，以及 world model papers 的 closed-loop control evidence。

优先阅读：[[overview|Overview]]、[[WorldModelEvaluation]]、[[SimulationRealityGap]]。

候选方向：

- π0.7、LDA-1B、RoboLab 的外部复现或批判性分析。
- 直接比较 visual subgoal world model、latent dynamics pretraining 和 classical model-based control 的 robot studies。
- 把 contact solver choice 与 real-robot MPC/RL/differentiable optimization failure 关联起来的实证工作。
- World model evaluation papers 中明确报告 action coupling、closed-loop success、physical consistency 和 real-time latency 的 sources。
