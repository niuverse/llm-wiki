---
title: "EmbodiedGen: Towards a Generative 3D World Engine for Embodied Intelligence"
type: source
tags: [robotics, embodied-ai, 3d-generation, simulation-assets, real-to-sim]
sources: []
last_updated: 2026-07-11
source_file: raw/embodiedgen.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2506.10600
extracted_text: graph/extracts/embodiedgen.md
source_date: 2025-06-12
project_url: https://github.com/HorizonRobotics/EmbodiedGen
---

## 摘要

Xinjie Wang、Liu Liu、Yu Cao、Ruiqi Wu、Wenkang Qin、Dehui Wang、Wei Sui 和 Zhizhong Su 提出 [[EmbodiedGen]] V1：一个面向 embodied intelligence 的 generative 3D world toolkit。它针对普通 3D generation 输出“视觉可用、仿真不可用”的缺口，把 image/text-to-3D、texture generation、articulated object generation、panorama-based scene generation、quality inspection、physical property recovery 和 URDF packaging 组合成 [[SimulationReady3DWorldGeneration|simulation-ready 3D generation]] pipeline。

V1 的主要工作单位仍是 asset，而不是持久的 executable world。Rigid object pipeline 使用 TRELLIS 生成 mesh 与 3D Gaussian Splatting（3DGS），再通过 foreground/geometry/aesthetic checks、失败重试、texture delighting、super-resolution、real-scale recovery、mass/friction estimation 和 URDF conversion 形成可进入 MuJoCo、Isaac Lab、SAPIEN 等 simulator 的资产。Text-to-3D 被分解为 text-to-image 与统一的 image-to-3D service，以换取 modularity、early rejection 和对 community model 进步的复用。

论文还包含三个扩展方向：DIPO 用 dual-state images 与 articulation graph 生成 articulated objects；GeoLifter 把 normal、position 和 mask 等 geometry conditions 注入 2D diffusion backbone，提升 multi-view texture consistency；scene module 把 text/image condition 生成 panorama，再用 Pano2Room 构造 mesh/3DGS background 并恢复尺度与坐标系。Application 部分展示 large-scale asset generation、visual appearance editing、digital twins、RoboSplatter 和若干 manipulation/navigation demos，但没有提供统一的 task-world benchmark 或大规模 policy-learning ablation。

## 核心主张

- 普通 image-to-3D / text-to-3D outputs 通常缺少 real-world scale、mass、friction、watertight geometry、collision semantics 和 simulator interface；视觉 fidelity 不能自动推出 simulation usability。
- EmbodiedGen 把 asset generation 写成 generate–inspect–retry–repair–package pipeline。ImageSegChecker 可切换 SAM、REMBG、RMBG-1.4；MeshGeoChecker 从 orthographic views 检查 geometric completeness；失败样本回到对应生成阶段调整 seed/settings。
- VLM-based physics expert 根据 rendered views、object category 与 optional context 估计 height、mass 和 friction；这些值适合生成 plausible metadata 与 downstream sampling priors，但 source 没有证明其等价于 calibrated system identification。
- Texture back-projection 先做 delighting 与 4× super-resolution，再根据 visibility、view normal confidence、depth edge 和 UV projection 融合 multi-view colors，目标是减少 baked highlight/shadow 并生成 2K UV texture。
- Text-to-3D 采用 text-to-image → image-to-3D 的 modular factorization；论文的理由是可以在 expensive 3D generation 前过滤 semantic/segmentation failures，并降低端到端模型维护成本。
- V1 的自动 QA 在 150 个 generated cups 上得到 68.7% precision 与 76.7% recall；作者明确承认其尚未达到 90%，因此 evidence 支持“减少 manual screening”，不支持“自动质量保证已经解决”。
- DIPO 使用 resting/articulated dual-state image pair、diffusion transformer 和 Graph Reasoner 推断 part connectivity；PM-X augmentation pipeline 构建 600 个带 physical properties 的 articulated objects。
- GeoLifter 使用 normal、object-space position 与 mask 形成 geometry condition，并加入 cross-view correspondence spatial loss，使同一 3D point 在不同 views 的 latent features 更接近。
- V1 scene generation 采用 panorama → Pano2Room mesh/3DGS → super-resolution refinement → scale/coordinate alignment。该 representation 适合作为视觉背景，但 V2 source 后续明确指出其 single-mesh panorama background 限制 camera translation、multi-room navigation 和 instance-level editing。

## 关键引文

- “graphics-centric object generation”
- “watertight geometry”
- “real-world scale”

## 关联

- [[EmbodiedGen]] - toolkit / world-engine entity 与 V1→V2 演进。
- [[SimulationReady3DWorldGeneration]] - 从 visual 3D content 到 metric、physical、interactive、portable world artifact 的统一概念。
- [[CollisionGeometryForRobotSimulation]] - V1 的 watertightness 与 geometry checks 是 collider authoring 的前置条件，但 source 对 visual/collision separation 的机制不如 V2 完整。
- [[RoboticsSimulationInfrastructure]] - EmbodiedGen 把 asset generation、scene generation、rendering 与 simulator import 作为 infrastructure problem。
- [[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|EmbodiedGen V2]] - 把 V1 的 asset toolkit 扩展成 task-driven、affordance-aware、stateful、cross-simulator world engine。
- [[embodiedgen-v1-v2-learning-map]] - 两篇工作的机制对照与阅读路径。

## 开放问题

- VLM-estimated size、mass 和 friction 对不同 object categories 的 absolute error、calibration 和 downstream contact behavior 如何？
- Watertight visual mesh、URDF export 与实际 collision stability 之间需要哪些额外 validation？
- Automated QA 在 cup 之外的 articulated、thin-shell、concave、transparent 或 deformable objects 上是否仍有效？
- GeoLifter 的 texture quality 主要来自 geometry conditioning、spatial loss、base model，还是 delighting / super-resolution post-processing？
- Panorama-derived background 在大 camera translation、occlusion reveal、navigation collision 和 instance editing 中会怎样失效？
- V1 demos 是否能在统一 task set 上量化 policy improvement，而不只展示 asset loading 与 qualitative applications？
