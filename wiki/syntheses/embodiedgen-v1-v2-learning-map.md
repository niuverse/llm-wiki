---
title: "EmbodiedGen V1/V2 Learning Map"
type: synthesis
tags: [learn, embodiedgen, simulation, 3d-generation]
sources: ["[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]"]
last_updated: 2026-07-11
---

# EmbodiedGen V1/V2 Learning Map

## Topic Boundary

EmbodiedGen 研究的是 generative simulation infrastructure：如何把 text、image、task description 与 conversational edits 变成 simulator 可以消费的 3D assets/worlds。它不是新的 rigid-body solver，也不是预测未来 observation 的 [[WorldModelsForEmbodiedAI|learned world model]]。V1 的中心是 sim-ready assets；V2 的中心是 executable、task-conditioned、stateful worlds。

## Prerequisite Map

1. 3D representations：mesh、UV texture、3DGS、visual geometry 与 collision geometry。
2. Physics asset semantics：metric scale、mass、friction、inertial frame、watertightness、convex decomposition。
3. Simulator formats：URDF、MJCF/XML、USD，以及 format conversion 与 runtime interpretation 的边界。
4. Scene structure：Scene Graph、support/containment/spatial relations、6-DoF poses、reachability 与 navigation constraints。
5. Interaction semantics：part segmentation、affordance、graspability、6-DoF grasp 与 physics validation。
6. Robot learning：environment diversity、online RL、domain randomization、OOD evaluation 与 sim-to-real attribution。

## 核心演进

| 问题 | V1 的回答 | V2 的回答 |
| --- | --- | --- |
| 普通 generated 3D 为什么不能直接训练 robot？ | 缺 scale、physical properties、geometry integrity、QA 与 URDF | 还缺 affordance、task semantics、stable layout、persistent state 与 closed-loop validation |
| 生成单位是什么？ | rigid/articulated asset、texture、panorama scene | object asset + typed Scene Graph + world state |
| 如何约束错误？ | VLM/geometry/aesthetic check 与 auto-retry | hierarchical QA、mesh repair、CoACD、placement solver、settling、grasp tests、atomic edits |
| 如何扩展场景？ | panorama → mesh/3DGS background | multi-room topology、traversable openings、addressable furniture |
| 如何证明价值？ | asset QA 与 qualitative simulation demos | asset/world/affordance ablation，加 companion policy-learning evidence |

## Mechanism-Level Reading Path

1. 先读 [[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|V1]] Sections 3.1 与 3.5，理解 visual 3D content 与 simulator asset 的差异。
2. 再读 V1 Section 3.4，理解 multi-view texture consistency 与 post-processing 在 pipeline 中的位置，不要把整篇论文误读为单一生成模型。
3. 读 [[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|V2]] Sections 2.1–2.2，掌握 two-level sim-ready contract 与 asset pipeline。
4. 读 V2 Sections 2.3–2.5，跟踪 part affordance、task graph、BFS placement 和 multi-room solver 如何组合。
5. 读 V2 Section 2.6，重点看 persistent state、typed skills、grounding、bounded delta 与 failure-without-mutation。
6. 最后读 Experiments 3.1–3.4，优先看 stage-wise attrition、manual acceptance、latency 与 companion-study attribution，而不是只看 headline success rates。

## Misconception Map

- “生成了 URDF，所以已经 sim-ready”：URDF packaging 不能证明 collider、inertia、scale、contact 或 task executability 正确。
- “同一 asset 能导出六个 simulator，所以 dynamics 一致”：conversion 统一 interface，不统一 solver/contact semantics。
- “VLM 能预测 mass/friction，所以不需要 SysID”：VLM 给 category prior；真实 deployment 仍需要 calibration、randomization 或 system identification。
- “98.6% collision success 等于机器人 manipulation 成功”：该 metric 是 scripted top-down grasp-and-lift test，不覆盖复杂 contact-rich task。
- “Vibe Coding 就是 LLM 直接编辑 3D coordinates”：论文的关键恰恰是 agent 只做 intent/grounding，deterministic skills 和 constraints 决定可提交 edits。
- “RL 从 9.7% 到 79.8% 完全证明 generator”：这是 companion pipeline 的整体结果，混合了 generated environments、online RL、scene scaling 与 domain randomization。

## Evidence Boundaries

| Insight | Evidence Level | Wiki Target |
| --- | --- | --- |
| V1 自动 QA 能减少 manual screening，但远未解决 | source-backed | [[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]] |
| V2 mesh repair 与 CoACD 改善 processing/contact metrics | source-backed ablation | [[SimulationReady3DWorldGeneration]], [[CollisionGeometryForRobotSimulation]] |
| V2 affordance 的最大损耗来自 part segmentation | source-backed stage-wise evaluation | [[SimulationReady3DWorldGeneration]] |
| Cross-format export 不等于 cross-engine trajectory equivalence | source-backed interface + wiki inference | [[SimulationReady3DWorldGeneration]], [[SimulationRealityGap]] |
| Generated world diversity 很可能是 policy generalization 的重要资源 | source-backed companion summary；causal isolation incomplete | [[SimulationRealityGap]], [[RoboticsSimulationInfrastructure]] |
| Stateful world editing 应采用 transactional state semantics | source-backed mechanism + reusable design inference | [[AgenticSceneTaskGeneration]] |

## Source Acquisition Plan

- `highest priority`：ingest companion paper *Scaling Sim-to-Real Reinforcement Learning for Robot VLAs with Generative 3D Worlds*，核查 scene-count scaling、RL setup、domain randomization 与 real-robot protocol。
- `high priority`：ingest EmbodiedGen V2 code/docs 的 versioned snapshot，确认 paper representation 如何落到 schemas、layout files、converters、skills 与 tests。
- `medium priority`：ingest DIPO、3D-Fixer、P3-SAM 与 GraspGen，拆分 articulated generation、occlusion completion、part segmentation 和 grasp validation 的贡献。
- `medium priority`：补充 independent cross-simulator comparison，测同一 generated scene 在 MuJoCo、SAPIEN、Isaac Sim/PhysX、Genesis 与 Bullet 中的 settling/contact/policy divergence。

相关页面：[[EmbodiedGen]]、[[SimulationReady3DWorldGeneration]]、[[AgenticSceneTaskGeneration]]、[[RoboticsSimulationInfrastructure]]、[[CollisionGeometryForRobotSimulation]]、[[SimulationRealityGap]]。
