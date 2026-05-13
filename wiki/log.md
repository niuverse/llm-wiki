---
title: "Wiki Log"
type: synthesis
tags: []
sources: []
last_updated: 2026-05-13
---

# Wiki Log

wiki operations 的 append-only chronological record。

Format: `## [YYYY-MM-DD] <operation> | <title>`

Operations: `ingest`, `query`, `distill`, `learn`, `source`, `health`, `lint`, `graph`, `maintenance`

---

## [2026-04-27] ingest | Contact Models in Robotics: a Comparative Analysis

## [2026-04-27] maintenance | 中文/Hybrid 语言规范迁移

## [2026-04-27] maintenance | Quartz 发布层与数学深度扩写

## [2026-04-27] maintenance | Markdown 不硬换行规范迁移

## [2026-04-27] ingest | A Comprehensive Survey on World Models for Embodied AI

## [2026-04-27] ingest | AwesomeWorldModels

## [2026-04-27] maintenance | Quartz LaTeX delimiter 规范化

## [2026-04-27] ingest | π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities

## [2026-04-27] maintenance | MarkItDown source extraction, health/graph tools, and knowledge review

## [2026-04-27] ingest | RoboLab: A High-Fidelity Simulation Benchmark for Analysis of Task Generalist Policies

## [2026-04-27] ingest | NVlabs/RoboLab

## [2026-04-27] maintenance | Fix Mermaid label in Simulation Sensitivity Analysis

## [2026-04-27] maintenance | Audit Mermaid labels for special-character syntax

## [2026-04-27] ingest | LDA-1B: Scaling Latent Dynamics Action Model via Universal Embodied Data Ingestion

## [2026-04-27] maintenance | Research dashboard and lightweight question index

## [2026-04-27] ingest | Disentangled Robot Learning via Separate Forward and Inverse Dynamics Pretraining

## [2026-04-27] ingest | Predictive Inverse Dynamics Models are Scalable Learners for Robotic Manipulation

## [2026-04-28] maintenance | Add distill workflow for conversation-derived knowledge

## [2026-04-28] maintenance | Add learn and source workflows for unsourced study topics

## [2026-05-01] ingest | Asset Structure - Isaac Sim Documentation

## [2026-05-01] maintenance | Add Isaac Sim Asset Structure architecture diagrams

## [2026-05-01] ingest | Introduction to USD

## [2026-05-01] learn | Wheeled Robot Modeling

## [2026-05-01] ingest | Modern Robotics Chapter 13: Wheeled Mobile Robots

## [2026-05-01] ingest | Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots

## [2026-05-01] learn | Wheeled Robot Visual Lab

- Added `wiki/syntheses/wheeled-robot-visual-lab.md` as an embedded academic visualization scaffold for wheeled robot kinematics.
- Linked it to the wheeled robot modeling learning map and source-backed concept pages.

## [2026-05-03] learn | 3D Model Formats Learning Map

- Added `wiki/syntheses/3d-model-formats-learning-map.md` as a learning scaffold for OBJ, STL, PLY, glTF/GLB, FBX, USD, STEP, URDF/SDF/MJCF and related asset pipeline concepts.
- Linked it from `wiki/index.md` and marked non-USD format comparisons as unsourced learning notes pending source / ingest.

## [2026-05-04] distill | Isaac Sim mujoco.usda Runtime Semantics

- Added `wiki/syntheses/isaac-sim-mujoco-usda-runtime-semantics.md` to preserve the conversation-derived ownership boundary for `mujoco.usda`.
- Updated `wiki/concepts/IsaacSimAssetStructure.md`, `wiki/entities/MuJoCo.md`, and `wiki/index.md`.

## [2026-05-04] distill | Isaac Sim and MuJoCo Control Tuning Notes

- Added `wiki/syntheses/isaac-sim-mujoco-control-tuning-notes.md` to preserve the discussion about PhysX/Isaac Sim joint position drive, stiffness/damping, effort limits, seven-DOF arm gain scaling, and MuJoCo/PhysX tuning boundaries.
- Updated `wiki/entities/IsaacSim.md`, `wiki/entities/MuJoCo.md`, and `wiki/index.md`.

## [2026-05-04] distill | Isaac Sim and MuJoCo Physics and Control Notes

- Expanded `wiki/syntheses/isaac-sim-mujoco-control-tuning-notes.md` beyond control tuning to include the Isaac Sim documentation wording, PhysX solver-level drive semantics, effort-limit diagnosis, seven-DOF arm gain scaling, MuJoCo/PhysX solver and actuator differences, and follow-up official docs to ingest.
- Updated `wiki/entities/IsaacSim.md`, `wiki/entities/MuJoCo.md`, and `wiki/index.md` to point to the broader physics/control framing.

## [2026-05-04] ingest | Articulations - Omni Physics

- Added `wiki/sources/omniverse-omni-physics-articulations.md` with canonical HTML in `raw/` and extracted Markdown in `graph/extracts/`.
- Added `wiki/concepts/ReducedCoordinateArticulations.md` and `wiki/entities/PhysX.md`.
- Updated Isaac Sim, NVIDIA, Contact Solvers, the physics/control notes, and the wiki index.

## [2026-05-07] ingest | Asset Structure - Isaac Sim 4.5 Documentation

- Added `wiki/sources/isaac-sim-45-asset-structure.md` with canonical HTML in `raw/` and extracted cache in `graph/extracts/`.
- Added `wiki/concepts/IsaacSimLegacyAssetStructure.md` for the legacy / pre-3.0 layout and explicitly avoided the unsupported `Asset Structure 2.0` label.
- Updated `wiki/concepts/IsaacSimAssetStructure.md`, `wiki/entities/IsaacSim.md`, `wiki/entities/NVIDIA.md`, and `wiki/index.md`.

## [2026-05-13] ingest | VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation

- Added `wiki/sources/viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation.md` with canonical HTML in `raw/` and extracted Markdown in `graph/extracts/`.
- Added `wiki/concepts/VisualSimToReal.md` and `wiki/entities/VIRAL.md`.
- Updated `wiki/concepts/SimulationRealityGap.md`, `wiki/entities/NVIDIA.md`, `wiki/overview.md`, and `wiki/index.md`.

## [2026-05-13] ingest | Robotics Simulation Infrastructure

- Added `wiki/sources/robotics-simulation-infrastructure.md` with canonical HTML in `raw/` and extracted Markdown in `graph/extracts/`.
- Added `wiki/concepts/RoboticsSimulationInfrastructure.md` and `wiki/entities/ManiSkill.md`.
- Updated `wiki/concepts/SimulationRealityGap.md`, `wiki/concepts/TaskGeneralistPolicyEvaluation.md`, `wiki/entities/MuJoCo.md`, `wiki/overview.md`, and `wiki/index.md`.
