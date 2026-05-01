---
title: "MuJoCo"
type: entity
tags: [robotics, simulation, physics-engine]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[isaac-sim-asset-structure]]"]
last_updated: 2026-05-01
---

# MuJoCo

MuJoCo 是 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 中讨论的 robotics physics engine，在 model-based control 与 reinforcement learning workflows 中很重要。

在这个 source 中，MuJoCo 代表一种 contact-model tradeoff：它使用 optimization-based contact handling，以及有助于 conditioning 与 uniqueness 的 compliance/regularization choices；但论文认为这些 choices 也可能 shift the physical solution。作者特别指出 artificial compliance 对 [[DifferentiablePhysics|differentiable physics]] 很重要，因为它会改变下游 trajectory optimization 使用的 gradients。

本页只记录该 paper 对 MuJoCo 的处理方式；在提出 current-version claims 之前，应补充 MuJoCo documentation 或 source-code notes。

[[isaac-sim-asset-structure|Isaac Sim Asset Structure]] source 给 MuJoCo 增加了 asset-authoring context：Isaac Sim 6.0 EDR docs 建议把 MuJoCo-specific attributes 和 tuning 放入 `mujoco.usda`，并把 common rigid bodies、joints 和 articulation 放在 neutral `physics.usd(a)` layer 中，以避免 runtime-specific behavior 与 PhysX 或 neutral physics clashing。

相关页面：[[ContactModelsInRobotics]]、[[ContactComplementarity]]、[[ContactSolvers]]、[[SimulationRealityGap]]、[[IsaacSimAssetStructure]]。
