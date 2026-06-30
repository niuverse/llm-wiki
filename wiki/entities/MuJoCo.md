---
title: "MuJoCo"
type: entity
tags: [robotics, simulation, physics-engine]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[mujoco-computation-collision-detection]]", "[[isaac-sim-asset-structure]]", "[[robotics-simulation-infrastructure]]", "[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]", "[[mujocouni-persistent-batched-runtime-primitives-for-mujoco]]", "[[mujoco-warp-mjwarp-documentation]]", "[[mjlab-repository]]", "[[mujoco-playground-repository]]"]
last_updated: 2026-06-05
---

# MuJoCo

MuJoCo 是 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 中讨论的 robotics physics engine，在 model-based control 与 reinforcement learning workflows 中很重要。

在这个 source 中，MuJoCo 代表一种 contact-model tradeoff：它使用 optimization-based contact handling，以及有助于 conditioning 与 uniqueness 的 compliance/regularization choices；但论文认为这些 choices 也可能 shift the physical solution。作者特别指出 artificial compliance 对 [[DifferentiablePhysics|differentiable physics]] 很重要，因为它会改变下游 trajectory optimization 使用的 gradients。

[[mujoco-computation-collision-detection|MuJoCo collision detection docs]] 补充了 current documentation coverage：MuJoCo 的 collision query 作用在 geoms 上，active contacts 写入 `mjData.contact`，后续用于 constraint construction。Docs 明确说 MuJoCo collision detection 默认受 convex geoms 约束；non-convex meshes 在 collision 中会用 convex hull 替代，复杂 non-convex objects 应通过 [[ApproximateConvexDecomposition|convex decomposition]] 变成同一 body 上的一组 convex geoms。Docs 还把 [[CoACD]] 作为自动 decomposition 工具例子。

[[isaac-sim-asset-structure|Isaac Sim Asset Structure]] source 给 MuJoCo 增加了 asset-authoring context：Isaac Sim 6.0 EDR docs 建议把 MuJoCo-specific attributes 和 tuning 放入 `mujoco.usda`，并把 common rigid bodies、joints 和 articulation 放在 neutral `physics.usd(a)` layer 中，以避免 runtime-specific behavior 与 PhysX 或 neutral physics clashing。

本次 distill 进一步澄清了 `mujoco.usda` 的 ownership boundary：在 Isaac Asset Structure context 中，MuJoCo native MJCF 里存在 visual / collision model 不意味着 visual mesh、material 或 shared collider geometry 应进入 `mujoco.usda`；这些通常属于 shared geometry / material / instance / neutral physics layers，`mujoco.usda` 更适合作为 MuJoCo-only runtime interpretation / tuning overlay。这个边界是 conversation-derived clarification，待后续 ingest MuJoCo XML Reference 和 Isaac backend schema docs 验证具体 supported attributes。见 [[isaac-sim-mujoco-usda-runtime-semantics]]。

另一个 conversation-derived distill 总结了 MuJoCo 与 Isaac Sim / PhysX 的 physics/control 迁移边界：不要直接复制 raw stiffness/damping gains，而应迁移 closed-loop bandwidth、damping ratio、force limit、trajectory smoothness 和 contact regime；同时要记住 MuJoCo 和 PhysX 的 solver、constraint regularization 与 actuator abstraction 不同。MuJoCo actuator、`forcerange`、`armature`、`solref/solimp`、Newton/CG/PGS solver 等具体语义仍需要后续 ingest 官方 MuJoCo docs。见 [[isaac-sim-mujoco-control-tuning-notes]]。

[[robotics-simulation-infrastructure|Robotics Simulation Infrastructure]] source 额外提到 MuJoCo Lab 作为 end-to-end simulation/ML framework example，并特别把它的 visualizer 描述为适合 reinforcement learning work 的 diagnostic surface。这个 claim 指向 MuJoCo Lab infrastructure，而不是 MuJoCo core physics semantics；当前页面暂不把二者合并为同一个 implementation claim。

[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab]] source 又给 MuJoCo ecosystem 增加了 training-system context：MuJoCoUni 作为 CPU-batched MuJoCo runtime backend，用于 heterogeneous CPU simulation / GPU learning；source 还把 MjWarp / mjlab / MuJoCo Playground 放在 GPU-resident robot learning systems 背景中对比。后续 ingest 已把这个 context 拆开：[[MuJoCoUni]] 的 technical report 支持 stateful CPU-batched `BatchEnvPool` route；[[MJWarp]] official docs 支持 NVIDIA Warp / GPU-oriented parallel MuJoCo route，并明确 feature parity、nondeterminism 与 nondifferentiability boundary；[[Mjlab|mjlab]] 和 [[MuJoCoPlayground]] repository snapshots 则显示 MuJoCo Warp / MJX 已进入 higher-level robot learning frameworks。这个 evidence 说明 MuJoCo-related infrastructure 已经同时覆盖 CPU-batched、GPU-oriented 和 framework-level training paths，但不支持把各 backend 的 solver/contact/rendering semantics 直接视为完全等价。

相关页面：[[CollisionGeometryForRobotSimulation]]、[[ApproximateConvexDecomposition]]、[[ContactModelsInRobotics]]、[[ContactComplementarity]]、[[ContactSolvers]]、[[RoboticsSimulationInfrastructure]]、[[HeterogeneousRobotRLTraining]]、[[SimulationRealityGap]]、[[MuJoCoUni]]、[[MJWarp]]、[[Mjlab|mjlab]]、[[MuJoCoPlayground]]、[[IsaacSimAssetStructure]]、[[isaac-sim-mujoco-control-tuning-notes]]。
