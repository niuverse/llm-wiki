---
title: "Research Questions"
type: synthesis
tags: [research-questions, robotics, embodied-ai]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[mujoco-computation-collision-detection]]", "[[isaac-sim-core-api-collision-approximation]]", "[[coacd-approximate-convex-decomposition]]", "[[convex-primitive-decomposition-for-collision-detection]]", "[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]", "[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]", "[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning]]", "[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors]]"]
last_updated: 2026-06-04
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

## Humanoid RL 从训练到硬件怎样减少 silent failures？

当前判断：AGILE 的主要价值是把 humanoid RL 的 workflow boundary 变成 explicit contract。[[HumanoidRLWorkflow]] 说明训练前的 joint/reward/contact verification、训练中的 git/config snapshot、评估中的 deterministic scenario tests、motion-quality diagnostics，以及 deployment 时的 TorchScript + YAML I/O descriptor，可以一起减少 joint order、history buffer、action scaling、reward hacking、joint-limit violations 和 high-frequency actuation 这类 silent failures。[[SimulationRealityGap]] 需要因此扩展：gap 不只来自 physics mismatch，也可能来自 workflow/export mismatch。

优先阅读：[[HumanoidRLWorkflow]]、[[AGILE]]、[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning]]、[[SimulationRealityGap]]、[[TaskGeneralistPolicyEvaluation]]。

证据边界：AGILE 报告 Unitree G1 / Booster T1 上五类 skills 的 transfer demonstrations 与多个 stabilization ablations，但 hardware validation 主要是 qualitative；loco-manipulation/VLA case 的 90% success 是 closed-loop simulation result，不等于真实 humanoid manipulation 已解决。

## Humanoid loco-manipulation demonstrations 如何 scale？

当前判断：GRAIL 提供一条 source-backed route：把 3D assets、simulator-ready scenes、camera/scale/depth 和 robot-proportioned character 先固定，再用 VFM 作为 interaction prior 生成 video，随后通过 metric 4D HOI reconstruction、GMR retargeting 和 task-general trackers 转成 robot-action data。这个路线的重点不是“VFM 直接控制 robot”，而是用 known 3D configuration 把 video prior 约束成 physically executable trajectories。

优先阅读：[[AssetConditionedHOIGeneration]]、[[GRAIL]]、[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors]]、[[VisualSimToReal]]、[[TaskGeneralistPolicyEvaluation]]。

证据边界：GRAIL 报告超过 20,000 条 generated sequences、HOI generation/tracking ablations 和 Unitree G1 real-world pick-up / stair-climbing success rates；但 project page/code/dataset release、VFM/API reproducibility、failure filtering rate、跨平台 transfer 和 independent replication 仍需后续 sources。

## Contact model 和 solver 为什么会影响 learning/control？

当前判断：contact solver 不是底层可替换实现，而是会改变 forces、impulses、energy dissipation、residual 和 convergence 的 modeling choice。[[ContactComplementarity]] 给出 Signorini、Coulomb friction 和 maximum dissipation 的 rigid contact target；[[ContactSolvers]] 说明 per-contact 与 global/proximal methods 的 tradeoff；[[DifferentiablePhysics]] 说明 solver artifacts 可能污染 optimization gradients。

优先阅读：[[ContactModelsInRobotics]]、[[ContactComplementarity]]、[[ContactSolvers]]、[[DifferentiablePhysics]]、[[contact-models-in-robotics-a-comparative-analysis]]。

证据边界：当前 evidence 强在 controlled contact simulation benchmark；把某个 solver choice 与某个真实 robot deployment failure 直接因果绑定，还需要具体系统证据。

## Collision geometry choices 为什么会影响 robot simulation？

当前判断：collision geometry 是 contact pipeline 的上游 modeling choice。[[CollisionGeometryForRobotSimulation]] 说明 sphere、capsule、cylinder、box、convex hull、ACD、SDF 和 differentiable primitives 会改变 contact candidates、contact points、normals、clearance、contact count 和 solver constraints。[[ApproximateConvexDecomposition]] 说明 non-convex assets 不能只看 visual mesh；single hull 会填满 handles / slots / holes，过度 decomposition 又会拖慢 runtime。[[DifferentiableCollisionDetection]] 则把 primitive collider 连接到 trajectory optimization gradients。

优先阅读：[[CollisionGeometryForRobotSimulation]]、[[ApproximateConvexDecomposition]]、[[DifferentiableCollisionDetection]]、[[mujoco-computation-collision-detection]]、[[isaac-sim-core-api-collision-approximation]]、[[coacd-approximate-convex-decomposition]]。

证据边界：当前 source-backed coverage 很适合建立 taxonomy 和 failure modes；但还缺跨 engine、跨 robot task 的 systematic collider benchmark。尤其需要比较 capsule / primitive decomposition / CoACD / VisACD / SDF 在 grasping、insertion、locomotion、RL throughput 和 sim-to-real transfer 中的实际差异。

## Heterogeneous robot data 是噪声还是资源？

当前判断：heterogeneous data 的价值取决于系统是否建模 data role。[[RobotContextConditioning]] 说明 π0.7 用 task/subtask language、metadata、control mode、speed、quality 和 subgoal images disambiguate behavior mode；[[LatentDynamicsActionModels]] 说明 LDA-1B 用 policy、forward dynamics、inverse dynamics 和 visual forecasting objectives 区分 high-quality demonstrations、low-quality trajectories 和 actionless videos。

优先阅读：[[RobotContextConditioning]]、[[LatentDynamicsActionModels]]、[[VisionLanguageActionModels]]、[[Pi07]]、[[LDA1B]]、[[EI30K]]。

证据边界：π0.7 与 LDA-1B 都支持“data role matters”，但前者强调 runtime steering，后者强调 training objective routing；两者是否能组合，还没有被当前 sources 证明。

## 当前 wiki 最值得补哪些 source？

当前判断：下一轮 source 补充应优先解决 evidence boundary，而不是继续横向堆 title。最有价值的补充包括 independent replication、失败案例、cross-benchmark evaluation、real-robot deployment reports，以及 world model papers 的 closed-loop control evidence。

优先阅读：[[overview|Overview]]、[[WorldModelEvaluation]]、[[SimulationRealityGap]]。

候选方向：

- π0.7、LDA-1B、RoboLab 的外部复现或批判性分析。
- AGILE/WBC-AGILE 的后续 hardware reports，尤其是带 motion capture、force/torque、energy、failure-rate 和 perception-driven manipulation metrics 的资料。
- GRAIL 的 project page、code、dataset release、failure-filtering statistics 和 independent replication，尤其是不同 VFM / 3D asset pipeline / robot platform 下的 robustness。
- 直接比较 visual subgoal world model、latent dynamics pretraining 和 classical model-based control 的 robot studies。
- 把 contact solver choice 与 real-robot MPC/RL/differentiable optimization failure 关联起来的实证工作。
- 对同一 object/robot asset 系统比较 primitive collider、convex hull、CoACD、VisACD、SDF 和 differentiable primitive collision 的 engine-specific benchmarks。
- World model evaluation papers 中明确报告 action coupling、closed-loop success、physical consistency 和 real-time latency 的 sources。
