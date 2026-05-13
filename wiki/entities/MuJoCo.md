---
title: "MuJoCo"
type: entity
tags: [robotics, simulation, physics-engine]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[isaac-sim-asset-structure]]", "[[robotics-simulation-infrastructure]]"]
last_updated: 2026-05-13
---

# MuJoCo

MuJoCo 是 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 中讨论的 robotics physics engine，在 model-based control 与 reinforcement learning workflows 中很重要。

在这个 source 中，MuJoCo 代表一种 contact-model tradeoff：它使用 optimization-based contact handling，以及有助于 conditioning 与 uniqueness 的 compliance/regularization choices；但论文认为这些 choices 也可能 shift the physical solution。作者特别指出 artificial compliance 对 [[DifferentiablePhysics|differentiable physics]] 很重要，因为它会改变下游 trajectory optimization 使用的 gradients。

本页只记录该 paper 对 MuJoCo 的处理方式；在提出 current-version claims 之前，应补充 MuJoCo documentation 或 source-code notes。

[[isaac-sim-asset-structure|Isaac Sim Asset Structure]] source 给 MuJoCo 增加了 asset-authoring context：Isaac Sim 6.0 EDR docs 建议把 MuJoCo-specific attributes 和 tuning 放入 `mujoco.usda`，并把 common rigid bodies、joints 和 articulation 放在 neutral `physics.usd(a)` layer 中，以避免 runtime-specific behavior 与 PhysX 或 neutral physics clashing。

本次 distill 进一步澄清了 `mujoco.usda` 的 ownership boundary：在 Isaac Asset Structure context 中，MuJoCo native MJCF 里存在 visual / collision model 不意味着 visual mesh、material 或 shared collider geometry 应进入 `mujoco.usda`；这些通常属于 shared geometry / material / instance / neutral physics layers，`mujoco.usda` 更适合作为 MuJoCo-only runtime interpretation / tuning overlay。这个边界是 conversation-derived clarification，待后续 ingest MuJoCo XML Reference 和 Isaac backend schema docs 验证具体 supported attributes。见 [[isaac-sim-mujoco-usda-runtime-semantics]]。

另一个 conversation-derived distill 总结了 MuJoCo 与 Isaac Sim / PhysX 的 physics/control 迁移边界：不要直接复制 raw stiffness/damping gains，而应迁移 closed-loop bandwidth、damping ratio、force limit、trajectory smoothness 和 contact regime；同时要记住 MuJoCo 和 PhysX 的 solver、constraint regularization 与 actuator abstraction 不同。MuJoCo actuator、`forcerange`、`armature`、`solref/solimp`、Newton/CG/PGS solver 等具体语义仍需要后续 ingest 官方 MuJoCo docs。见 [[isaac-sim-mujoco-control-tuning-notes]]。

[[robotics-simulation-infrastructure|Robotics Simulation Infrastructure]] source 额外提到 MuJoCo Lab 作为 end-to-end simulation/ML framework example，并特别把它的 visualizer 描述为适合 reinforcement learning work 的 diagnostic surface。这个 claim 指向 MuJoCo Lab infrastructure，而不是 MuJoCo core physics semantics；当前页面暂不把二者合并为同一个 implementation claim。

相关页面：[[ContactModelsInRobotics]]、[[ContactComplementarity]]、[[ContactSolvers]]、[[RoboticsSimulationInfrastructure]]、[[SimulationRealityGap]]、[[IsaacSimAssetStructure]]、[[isaac-sim-mujoco-control-tuning-notes]]。
