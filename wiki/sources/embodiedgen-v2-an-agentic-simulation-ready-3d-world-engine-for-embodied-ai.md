---
title: "EmbodiedGen V2: An Agentic, Simulation-Ready 3D World Engine for Embodied AI"
type: source
tags: [robotics, embodied-ai, 3d-generation, simulation-infrastructure, agentic-generation, sim-to-real]
sources: []
last_updated: 2026-07-11
source_file: raw/embodiedgen-v2.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2607.07459
extracted_text: graph/extracts/embodiedgen-v2.md
source_date: 2026-07-08
project_url: https://horizonrobotics.github.io/EmbodiedGen/
code_url: https://github.com/HorizonRobotics/EmbodiedGen
---

## 摘要

Xinjie Wang、Liu Liu、Taojun Ding、Andrew Choi、Chaodong Huang、Mengao Zhao、Ziang Li、Jackson Jiang、Chunlei Yu、Shengxiang Liu、Wei Xu 和 Zhizhong Su 提出 [[EmbodiedGen]] V2：一个把 open-ended intent 编译成 executable sim-ready environments 的 generative 3D world engine。相较 V1 主要生成 isolated assets 与 panorama backgrounds，V2 用统一的 object/scene representation 连接 sim-ready asset generation、part-level affordance、task-driven worlds、multi-room scenes、stateful natural-language editing、cross-simulator export 和 downstream policy learning。

V2 把 sim-ready 定义为四项联合 output contract：metric geometry、simulation-compatible physical assets、task-level semantics/affordances 与 standardized simulator interfaces。Object level 保存 textured visual geometry、collision geometry、physical parameters 和 affordance annotations；scene level 使用 typed Scene Graph 表达 background、context、manipulated objects、distractors、robot 及其 spatial/interaction relations，再把 graph ground 成 target simulator 中 physically stable 的 6-DoF poses。

资产 pipeline 支持 TRELLIS、SAM3D、Hunyuan3D 等 pluggable backends，并通过 hierarchical QA、mesh repair/simplification、CoACD convex decomposition、texture baking、VLM physical property recovery 和 URDF→MJCF/USD conversion 生成跨 simulator assets。Affordance pipeline 使用 P3-SAM、geometry/VLM merging、part-wise VLM semantics、GraspGen 与 SAPIEN execution tests，把 object parts 连接到 queryable semantics 和 physically filtered 6-DoF grasps。

Task-driven world generation 把自然语言任务分解为 `ROBOT`、`BACKGROUND`、`CONTEXT`、`MANIPULATED_OBJS`、`DISTRACTOR_OBJS`，生成 shallow rooted Scene Graph，通过 online generation 或 offline retrieval 实例化 nodes，再用 BFS、support/IoU constraints、robot reachability 与 gravity settling 得到稳定 layout。Large-scale module 生成 room-topology graph、addressable furniture instances 和 canonical house frame；Vibe Coding layer 则通过 agent–skill–harness、persistent world state、typed tool arguments、bounded state delta、atomic commit 与 failure-without-mutation 支持连续自然语言编辑。

## 核心主张

- Embodied 3D generation 的工作单位应从 isolated artifact 升级为 complete executable environment；geometry、physics、affordance、task semantics、edit history 与 simulator interfaces 必须在共享 representation 中持续存在。
- Asset pipeline 的 full configuration 在 200 个 held-out assets 上达到 96.5% human acceptance、98.6% scripted collision/grasp success，平均 processing time 为 2.6±0.4 分钟；去掉 mesh fixing 会把 visual mesh 从 1.43MB 放大到 51.63MB，并把 processing time 提高到 21.3±22.8 分钟。
- CoACD collision proxy 将平均 collision mesh 从 visual-mesh-level 1.45MB 降到 0.29MB，并把 scripted collision success 从 96.5% 提高到 98.6%；这个结果支持 convex decomposition 对 contact reliability 与 batching cost 有帮助，但不等于所有任务上的 manipulation success。
- Affordance pipeline 的主要 bottleneck 是 part segmentation。Full pipeline 在 200 assets 上达到 69.5% segmentation pass、99.3% conditional semantic validity、72.5% conditional grasp coverage，最终 end-to-end affordance pass rate 只有 50.0%。
- Task-driven world generation 在 150 tasks 上生成 778 interactive asset instances、覆盖 128 object categories；平均每个 world 5.19 个 assets。完全 online sequential generation 在单张 RTX 4090 上平均需要 47.7±5.4 分钟，其中 background generation 占 25.5±3.5 分钟。
- 83.3% final interactive worlds 无需人工修改即可进入 downstream simulation；其余主要失败来自 task-relation error、object-scale mismatch、local geometry defect 与 unstable/imperfect placement。
- Large-scale generation 把 language model 限制在 room scope / complexity 等 discrete semantic decisions，把 topology、traversability 与 placement feasibility 交给 constrained procedural solver；per-instance decomposition 和 convex proxies 使 background 可寻址、可替换、可组合。
- Vibe Coding 使用 Parse–Ground–Invoke–Commit loop。失败 skill call 返回 structured diagnostics 且不修改 world state；成功调用才 atomic commit bounded delta，并刷新 simulation preview。
- Source 总结 companion studies：generated-world online RL 将 simulation success 从 9.7% 提高到 79.8%；50-scene scaling 将 OOD success 从 53.2% 提高到 77.9%；结合 domain randomization 的 real-robot success 从 21.7% 提高到 75.0%。这些数字是 V2 对其他 studies 的汇总，不是本 source 内独立重做的 policy experiment。
- URDF、MJCF/XML 与 USD conversion 证明同一 standardized layout 能被多个 backends 消费；它不证明 MuJoCo、Genesis、SAPIEN、Bullet 与 Isaac 系列具有相同 contact law、solver behavior 或 numerical trajectory。

## 数学结构

Task-driven placement 把 child footprint $B_c(p_c)$ 放入 parent support region $H_p$，同时避免和已放置 siblings $P_p$ 重叠：

$$
p_c \in H_p,\qquad \operatorname{Support}(B_c(p_c),H_p)=1,\qquad \operatorname{IoU}\left(B_c(p_c),\bigcup_{j\in P_p}B_j\right)=0.
$$

$p_c$ 是 child candidate position；support predicate 排除悬空或支撑不足的 placement；IoU constraint 排除 footprint overlap。Manipulated objects 还必须落在 robot 可达且 forward-facing 的 interaction region 中，失败时 resample 或使用 relation-specific fallback，最终通过 SAPIEN gravity settling 修正残余 penetration/floating。

Stateful editing 的 world state 可以写成：

$$
S_t=(G_t,A_t,P_t,H_t),
$$

其中 $G_t$ 是 typed Scene Graph，$A_t$ 是 sim-ready assets，$P_t$ 是 6-DoF poses，$H_t$ 是 dialogue 与 skill invocation history。只有 `Invoke` 返回可行 delta 时才执行 $S_{t+1}=\operatorname{Commit}(S_t,\Delta S_t)$；失败时保持 $S_{t+1}=S_t$。

## 关键引文

- “complete executable environments”
- “bounded, physics-validated edits”
- “persistent world state”

## 关联

- [[EmbodiedGen]] - V1/V2 platform entity。
- [[SimulationReady3DWorldGeneration]] - V2 的 two-level representation、constraint solving 与 validation stack。
- [[AgenticSceneTaskGeneration]] - 自然语言到 Scene Graph、typed skills、deterministic solvers 和 executable artifacts。
- [[CollisionGeometryForRobotSimulation]] - mesh repair、visual/collision separation、CoACD proxies 与 contact reliability evidence。
- [[RoboticsSimulationInfrastructure]] - V2 把 asset/world authoring、cross-simulator interfaces、editing 与 ML loop 连接成 infrastructure。
- [[SimulationRealityGap]] - generated environments、domain randomization、cross-simulator semantics 与 real-robot transfer 的 evidence boundary。
- [[OpenUSDSceneComposition]] - V2 能输出 USD，但 source 聚焦格式转换与 runtime deployment，不足以证明完整 OpenUSD composition/layering strategy。
- [[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|EmbodiedGen V1]] - V2 的直接前身。
- [[embodiedgen-v1-v2-learning-map]] - 机制、证据与阅读顺序对照。

## 开放问题

- Human acceptance、VLM checking 与 manual cross-validation 的 annotator agreement、category distribution 和 threshold sensitivity 如何？
- Full affordance pass rate 只有 50%；如何改善 part segmentation、thin/concave parts、multi-contact grasps 与 non-parallel-jaw affordances？
- Cross-simulator export 后，同一 scene 的 contacts、settling pose、grasp success、reward 和 policy trajectory 会偏离多少？
- VLM-inferred mass/friction 如何与 real measurements、system identification 或 task-conditioned randomization distribution 校准？
- 83.3% world acceptance 是否能扩展到 articulated objects、deformables、tool use、force-control-heavy tasks 与 long-horizon recovery？
- Generated-scene diversity 对 policy improvement 的因果贡献如何与 online RL、domain randomization、pretrained policy 和 curriculum design 分离？
- Vibe Coding 的 grounding ambiguity、history drift、concurrent edits、rollback/versioning 与 large world latency 如何评估？
- V2 是 2026-07-08 发布的 arXiv v1；code release、dataset version、independent reproduction 与 long-term simulator compatibility 需要持续跟踪。
