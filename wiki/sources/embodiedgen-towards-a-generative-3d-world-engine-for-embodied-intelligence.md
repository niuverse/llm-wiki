---
title: "EmbodiedGen: Towards a Generative 3D World Engine for Embodied Intelligence"
type: source
tags: [robotics, embodied-ai, 3d-generation, simulation-assets, real-to-sim]
sources: []
last_updated: 2026-07-13
source_file: raw/embodiedgen.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2506.10600
extracted_text: graph/extracts/embodiedgen.md
source_date: 2025-06-12
project_url: https://github.com/HorizonRobotics/EmbodiedGen
---

## 摘要

Xinjie Wang、Liu Liu、Yu Cao、Ruiqi Wu、Wenkang Qin、Dehui Wang、Wei Sui 和 Zhizhong Su 提出 [[EmbodiedGen]] V1：一个面向具身 intelligence 的 generative 3D 世界工具包。它针对普通 3D 生成输出“视觉可用、仿真不可用”的缺口，把图像/文本到三维、纹理生成、关节化的物体生成、全景图基于场景生成、质量检查、物理 property recovery 和 URDF packaging 组合成 [[SimulationReady3DWorldGeneration|可用于仿真的 3D 生成]] 流程。

V1 的主要工作单位仍是资产，而不是持久的可执行的世界。刚性物体流程使用 TRELLIS 生成网格与 3D Gaussian Splatting（3DGS），再通过 foreground/几何/审美检查、失败重试、纹理 delighting、super-分辨率、真实规模 recovery、质量/摩擦估计和 URDF 转换形成可进入 MuJoCo、Isaac Lab、SAPIEN 等仿真器的资产。文本到-3D 被分解为文本到-图像与统一的图像到-3D service，以换取 modularity、早期 rejection 和对 community 模型进步的复用。

论文还包含三个扩展方向：DIPO 用 dual-状态图像与关节系统图结构生成关节化的物体；GeoLifter 把法向、位置和掩码等几何条件注入 2D 扩散主干网络，提升多视角纹理一致性；场景模块把文本/图像条件生成全景图，再用 Pano2Room 构造网格/3DGS 背景并恢复尺度与坐标系。Application 部分展示大规模资产生成、视觉外观编辑、digital twins、RoboSplatter 和若干操作/导航 demos，但没有提供统一的任务世界基准或大规模策略学习消融。

## 核心主张

- 普通图像到-3D / 文本到三维输出通常缺少现实世界规模、质量、摩擦、watertight 几何、碰撞语义和仿真器接口；视觉保真度不能自动推出仿真可用性。
- EmbodiedGen 把资产生成写成“生成—检查—重试—修复—打包”流程。ImageSegChecker 可切换 SAM、REMBG、RMBG-1.4；MeshGeoChecker 从正交视图检查几何完整性；失败样本回到对应生成阶段调整随机种子或场景。
- 基于 VLM 的物理专家根据渲染视图、物体类别与可选上下文估计高度、质量和摩擦；这些值适合生成看似合理的元数据与下游采样先验，但来源没有证明其等价于经过标定的系统辨识结果。
- 纹理 back-投影先做 delighting 与 4× super-分辨率，再根据可见性、视角法向置信度、深度边和 UV 投影融合多视角颜色，目标是减少 baked highlight/shadow 并生成 2K UV 纹理。
- 文本到-3D 采用文本到-图像 → 图像到-3D 的 modular factorization；论文的理由是可以在高成本的 3D 生成前过滤语义/分割失败，并降低端到端模型维护成本。
- V1 的自动 QA 在 150 个生成的 cups 上得到 68.7% 精度与 76.7% recall；作者明确承认其尚未达到 90%，因此证据支持“减少人工筛选”，不支持“自动质量保证已经解决”。
- DIPO 使用 resting/关节化的 dual-状态图像配对、扩散 transformer 和图结构 Reasoner 推断部件 connectivity；PM-X 扩充流程构建 600 个带物理属性的关节化的物体。
- GeoLifter 使用法向、物体空间位置与掩码形成几何条件，并加入跨视角 correspondence 空间损失，使同一 3D 点在不同视图的潜在特征更接近。
- V1 场景生成采用全景图 → Pano2Room 网格/3DGS → super-分辨率细化 → 规模/坐标对齐。该表示适合作为视觉背景，但 V2 来源后续明确指出其单一网格全景图背景限制相机 translation、多房间导航和实例层级编辑。

## 关键引文

- “graphics-centric object generation”
- “watertight geometry”
- “real-world scale”

## 关联

- [[EmbodiedGen]] - 工具包 / 世界引擎实体与 V1→V2 演进。
- [[SimulationReady3DWorldGeneration]] - 从视觉 3D 内容到指标、物理、交互式、portable 世界产物的统一概念。
- [[CollisionGeometryForRobotSimulation]] - V1 的 watertightness 与几何检查是碰撞体制作的前置条件，但来源对视觉/碰撞分离的机制不如 V2 完整。
- [[RoboticsSimulationInfrastructure]] - EmbodiedGen 把资产生成、场景生成、渲染与仿真器导入作为基础设施问题。
- [[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|EmbodiedGen V2]] - 把 V1 的资产工具包扩展成任务驱动的、可供性感知、有状态的、跨仿真器世界引擎。
- [[embodiedgen-v1-v2-learning-map]] - 两篇工作的机制对照与阅读路径。

## 开放问题

- VLM-estimated 大小、质量和摩擦对不同物体 categories 的绝对错误、标定和下游接触行为如何？
- Watertight 视觉网格、URDF 导出与实际碰撞稳定性之间需要哪些额外验证？
- Automated QA 在杯子之外的关节化的、细薄-shell、凹形、transparent 或可变形物体上是否仍有效？
- GeoLifter 的纹理质量主要来自几何条件化、空间损失、基座模型，还是 delighting / super-分辨率后处理-处理？
- 全景图派生的背景在大相机 translation、遮挡 reveal、导航碰撞和实例编辑中会怎样失效？
- V1 demos 是否能在统一任务集合上量化策略 improvement，而不只展示资产 loading 与定性 applications？
