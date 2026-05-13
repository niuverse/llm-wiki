---
title: "Overview（总览）"
type: synthesis
tags: [research-dashboard, robotics, embodied-ai]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[awesome-world-models]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining]]", "[[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation]]", "[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation]]", "[[robotics-simulation-infrastructure]]"]
last_updated: 2026-05-13
---

# Overview（总览）

这个页面是 wiki 的 research dashboard。它不按 ingest 顺序复述 source，而是维护当前知识库支持的研究判断、关键问题、证据强弱和后续缺口。完整问题索引见 [[research-questions|Research Questions]]。

## 当前总判断

当前 wiki 的中心判断是：robotics systems 中的 model assumptions 会通过 simulator、world model、policy context、training objective 和 benchmark design 进入 downstream decisions 与 reported performance；这些 assumptions 在温和场景里可能被 success rate 掩盖，但在 contact-rich dynamics、long-horizon rollout、heterogeneous data、unseen task composition 和 sim-to-real transfer 中会变成 first-order failure source。[[VIRAL]] 新增的 visual sim-to-real case 强化了这个判断：RGB-based humanoid loco-manipulation 的 transfer 不是单一算法问题，而是 privileged teacher、visual student、domain randomization、real-to-sim alignment、compute scaling 和 failure analysis 的耦合系统。[[RoboticsSimulationInfrastructure]] 则把这条链条再往前推：task/API、asset management、renderer、visualizer 和 ML integration 会决定什么 scene 容易表达、什么 failure 容易看见、什么 resource 留给 training。

这条判断把五类材料连成一条主线。[[ContactModelsInRobotics|contact models in robotics]] 说明 low-level contact law 与 [[ContactSolvers|solver]] 不是 implementation detail，而是 task-level modeling assumption；[[WorldModelsForEmbodiedAI|world models]] 说明 learned latent dynamics 也是 simulator，只是 failure 可能表现为 temporal drift、weak physical consistency 或 misleading futures；[[VisionLanguageActionModels|VLA]] 和 [[RobotContextConditioning|context conditioning]] 说明 robot foundation model 的 behavior mode 由 prompt、metadata、subgoal image 和 control mode 选择；[[LatentDynamicsActionModels|latent dynamics action models]] 与 [[InverseDynamicsModels|inverse dynamics models]] 说明 data quality 的影响取决于 training objective 如何分配 data role、如何把 visual transition 变成 action representation；[[TaskGeneralistPolicyEvaluation|task-generalist policy evaluation]] 说明 benchmark predicates、language variants 和 perturbation protocol 决定哪些 failure 会被看见。

## 研究问题面板

| 问题 | 当前判断 | 主要入口 |
| --- | --- | --- |
| World model 对 robot decision 的价值在哪里？ | 有价值的 world model 不只是生成 plausible future，而是改变 action choice、policy representation 或 evaluation signal。π0.7 把它用作 visual subgoal generator，LDA-1B 把它用作 latent dynamics pretraining。 | [[WorldModelsForEmbodiedAI]], [[WorldModelEvaluation]], [[LatentDynamicsActionModels]] |
| Inverse dynamics model 怎么从视频学 action？ | Seer 在 action-labeled robot data 上把 predicted future RGB 和 action sequence end-to-end joint training；DeFI 把 IDM 写成 self-supervised latent-action representation learning，从 current/future DINO features 重建 future feature，并用 VQ bottleneck 得到 latent action tokens。 | [[InverseDynamicsModels]], [[Seer]], [[DeFI]], [[LatentDynamicsActionModels]] |
| Simulation benchmark 能证明什么？ | Benchmark 更适合作为 diagnostic instrument，而不是 deployment proof。RoboLab 能定位 task、language、object、camera 和 scene sensitivity，但 real/sim proxy validity 仍随 policy/task family 改变。 | [[TaskGeneralistPolicyEvaluation]], [[SimulationSensitivityAnalysis]], [[SimulationRealityGap]] |
| Contact solver choices 为什么会影响 learning/control？ | Contact solver 选择会改变 forces、impulses、energy dissipation 和 convergence residuals；这些误差会进入 MPC、RL、system identification 和 differentiable optimization。 | [[ContactModelsInRobotics]], [[ContactComplementarity]], [[ContactSolvers]], [[DifferentiablePhysics]] |
| Visual sim-to-real 如何跨过 reality gap？ | VIRAL 说明 transfer recipe 至少要同时处理 visual distribution、camera geometry、hand dynamics、distillation distribution 和 compute scale；domain randomization 与 real-to-sim alignment 是互补项，不是替代项。 | [[VisualSimToReal]], [[VIRAL]], [[SimulationRealityGap]] |
| Heterogeneous robot data 是噪声还是资源？ | 不是数据混杂本身决定成败，而是系统是否显式建模 data role。π0.7 用 runtime context steering，LDA-1B 用 objective routing 和 DINO latent dynamics。 | [[RobotContextConditioning]], [[LatentDynamicsActionModels]], [[VisionLanguageActionModels]] |
| 当前证据最薄弱在哪里？ | strongest evidence 来自 source-specific benchmark 和 ablation；weakest link 是跨系统、跨机器人、跨 benchmark 的 independent replication 与真实部署因果验证。 | [[research-questions|Research Questions]], [[SimulationRealityGap]] |

## Evidence Map

| 判断层级 | 支持较强的 evidence | 证据边界 |
| --- | --- | --- |
| Contact assumptions affect downstream behavior | [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics]] 系统比较 NCP、LCP、CCP、RaiSim-style models、PGS、ADMM 和 staggered projections，并报告 rough/slippery terrain 中 solver differences 更明显。 | 主要证据来自 controlled simulation/benchmark；真实 robot transfer 仍需要具体 task validation。 |
| World model evaluation must be decision-coupled | [[a-comprehensive-survey-on-world-models-for-embodied-ai|World Models survey]] 明确区分 pixel prediction、state understanding 和 task performance；[[awesome-world-models|AwesomeWorldModels]] 提供 taxonomy-oriented bibliography。 | Survey 是组织框架，不等于每个收录方法都有 closed-loop robotics evidence。 |
| Context conditioning can turn data heterogeneity into controllable behavior | [[pi07-steerable-generalist-robotic-foundation-model|π0.7]] 把 task/subtask language、metadata、control mode 和 subgoal images 纳入 context，展示 dexterity、instruction following 和 compositional generalization。 | 证据主要来自发布方实验；prompt/context label 与真实 state mismatch 的 failure 尚需外部验证。 |
| Latent dynamics can reuse mixed-quality embodied data | [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]] 用 policy、forward dynamics、inverse dynamics 和 visual forecasting objective 区分 high-quality demonstrations、low-quality trajectories 和 actionless egocentric video。 | DINO latent 可能漏掉 tactile、force、material 或 small-contact state；code/data reproducibility 仍需跟进。 |
| End-to-end PIDM can scale on robot data | [[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation|Seer]] 用 [FRS] future image token 和 [INV] action token 在同一个 Transformer policy 中联合训练，报告 LIBERO、CALVIN 和 real-world Franka gains。 | 主要依赖 action-labeled robot data；future target 是 RGB pixel reconstruction，cross-embodiment 证据仍弱。 |
| Inverse dynamics can be pretrained from action-free videos | [[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|DeFI]] 用 GIDM 从 unlabeled video transitions 学 discrete latent action tokens，并在 CALVIN、SimplerEnv 和 real-world Franka 上报告 gains；failure analysis 还区分 forward vs inverse dynamics bottlenecks。 | Latent action 不等于直接可执行 action；最终 grounding 仍依赖 robot action data，且 GFDM domain mismatch 会传递到 IDM。 |
| High-fidelity sim can expose policy sensitivity | [[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab paper]] 与 [[nvlabs-robolab|NVlabs/RoboLab repo]] 提供 task library、predicate/subtask scoring、wrong-object diagnostics 和 sensitivity analysis workflow。 | Simulation proxy validity 不是自动成立；benchmark success 不能单独证明 real-world reliability。 |
| Visual sim-to-real can produce real humanoid deployment | [[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation|VIRAL project page]] 把 privileged RL teacher、vision student distillation、visual randomization、finger SysID、FOV alignment 和 compute scaling 连到 Unitree G1 的 continuous loco-manipulation videos。 | 当前证据来自 project page 和 source-specific videos；完整 reward、architecture、ablation numbers、code-level reproducibility 与 independent replication 仍需后续 ingest。 |
| Simulation infrastructure shapes research workflows | [[robotics-simulation-infrastructure|Robotics Simulation Infrastructure]] 把 framework stack 拆成 task/API、asset management、physics、rendering、visualization 和 ML，并用 asset API、visualizer、rendering memory/fidelity 与 pose abstraction 说明 trade-offs。 | Source 是 engineering blog，不是 controlled benchmark；framework-specific claims 需要 official docs/repo snapshots 或 quantitative comparisons 补强。 |

## 关键张力

- Exactness vs usability：更接近 rigid contact reference model 的 formulation 物理目标更清楚，但 numerical difficulty 更高；relaxation、heuristic per-contact handling 和 warm-starting 提高可用性，也可能引入 artifacts。见 [[ContactComplementarity]]、[[ContactSolvers]]。
- Fidelity vs decision relevance：world model 生成 future frames 的视觉质量不等于控制价值；对 embodied AI，更关键的是 latent state、rollout horizon、action conditioning 和 downstream policy/evaluation 是否受益。见 [[WorldModelEvaluation]]。
- Data scale vs data role：更多 robot/human/video data 不自动带来 better policy；π0.7、LDA-1B、Seer 和 DeFI 都把 heterogeneity 的关键放在 conditioning、objective routing、future-conditioned inverse dynamics 或 inverse-dynamics proxy task，而不是单纯扩大 BC corpus。见 [[RobotContextConditioning]]、[[LatentDynamicsActionModels]]、[[InverseDynamicsModels]]。
- Benchmark coverage vs deployment confidence：RoboLab 这类 benchmark 能系统暴露 task-generalist policy 的 failure modes，但它仍是 measurement substrate；真实 deployment 还需要验证 sim failure factor 是否在 hardware 上 causal。见 [[TaskGeneralistPolicyEvaluation]]、[[SimulationSensitivityAnalysis]]。
- Structure vs hackability：config-driven simulation APIs 更利于 serialization、governance 和 consistent assets；direct Python APIs 更利于快速 authoring 和 experimentation。这个 trade-off 会影响 human developers、LLM scene generation 和 benchmark maintainability。见 [[RoboticsSimulationInfrastructure]]。
- Differentiability vs physical truth：可微 simulation 与 differentiable rendering 让 gradients 可用，但 contact relaxation、spurious forces 或 learned dynamics artifacts 可能污染 gradient direction。见 [[DifferentiablePhysics]]、[[SimulationRealityGap]]。

## 下一步缺口

- 补充 independent replication 或 follow-up sources：π0.7、LDA-1B、RoboLab、VIRAL 都有强 source-specific claims，但需要更多外部复现、失败案例或对比评测。
- 给 world model papers 建立更结构化 ingest metadata：horizon、input modality、action coupling、closed-loop validation、real-robot validation、benchmark、code/data availability。这个需求来自 [[WorldModelEvaluation]] 与 [[AwesomeWorldModels]]。
- 追踪“latent dynamics + runtime context steering + predictive inverse dynamics”是否会合流：LDA-1B 的 objective routing、π0.7 的 runtime steering、Seer 的 end-to-end PIDM 与 DeFI 的 decoupled GFDM/GIDM 看起来互补，但当前 sources 还没有证明组合系统。
- 对 simulation reality gap 保持多层解释：gap 不只来自 physics engine 参数，也可能来自 learned dynamics objective、policy prompt/context、benchmark predicate 和 evaluation aggregation。见 [[SimulationRealityGap]]。
- 补充 simulation infrastructure official sources：ManiSkill、Isaac Lab、MuJoCo Lab、SAPIEN 和 Viser 的 docs/repo snapshots，可以把当前 blog-level design lens 转成更可维护的 implementation notes。见 [[RoboticsSimulationInfrastructure]]。
