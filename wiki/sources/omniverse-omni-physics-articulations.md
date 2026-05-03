---
title: "Articulations - Omni Physics"
type: source
tags: [omniverse, omni-physics, physx, articulations, robotics-simulation]
sources: []
last_updated: 2026-05-04
source_file: raw/omniverse-omni-physics-articulations.html
source_kind: html
source_url: https://docs.omniverse.nvidia.com/kit/docs/omni_physics/latest/dev_guide/rigid_bodies_articulations/articulations.html
extracted_text: graph/extracts/omniverse-omni-physics-articulations.md
source_date: 2026-05-01
---

# Articulations - Omni Physics

## 摘要

这是 [[NVIDIA]] Omni Physics documentation 中的 Articulations 页面，最后更新时间为 2026-05-01。它说明 [[PhysX]] 如何用 reduced-coordinate articulation（约化坐标 articulation）模拟由 joints 连接的 rigid bodies，并给出 USD / PhysX API 层面的 root placement、joint state、drive envelope、joint friction、closed-loop breaking、mimic joints 和 tendons rules。

本页对 Isaac Sim / PhysX robot simulation 的价值在于：它把“articulation 只是 jointed rigid bodies 的加速实现”纠正为一个更具体的建模选择。Articulation 用 root body 和 joint angles 表达 configuration，而不是让每个 link 拥有独立 world pose；这带来 zero joint error by design 和更好的 mass-ratio handling，但也要求 topology 基本是 tree，并引入 root selection、closed-loop handling、joint limits、mimic compliance 和 Tensor API access 等约束。

## 核心主张

- Articulations 通常比 ordinary jointed rigid bodies 更适合 mechanisms / robots：PhysX 在 reduced coordinates 中模拟 articulations，configuration 由 root body 和 joint angles 决定，而不是由每个 body 的 world pose 决定。
- Articulation topology 由 joints 的 `Body 0` / `Body 1` relationships 形成；USD hierarchy 只在 parsing / root detection 时有影响，不等价于物理 articulation tree。
- Fixed-base articulation 应把 `UsdPhysics.ArticulationRootAPI` 加到 world fixed joint 或其 ancestor；floating-base articulation 应加到 root link 或其 ancestor。
- 如果 root API 不是直接加到 fixed joint 或 rigid body，simulator 会遍历 hierarchy、构造 topology graph，并用 deterministic rule 选择 articulation type 和 root：有 world joint 则 fixed-base，否则选 minimal eccentricity 的 graph node。
- Reduced-coordinate semantics 意味着 non-root links 不能直接设置 pose / velocity；joint DOF state 要用 `PhysxSchema.JointStateAPI`，但在 Fabric / RL workloads 中应改用 Tensor API `ArticulationView`。
- Articulation drive 是 per-axis drive，source 明确把它描述为 analogous to a PD controller；`PhysxDrivePerformanceEnvelopeAPI` 用 effort 和 velocity constraints 表达 actuator feasible region，并区分 `maxActuatorVelocity` 与 joint-level `maxJointVelocity`。
- Articulation joint friction 组合 static / dynamic Coulomb friction 和 viscous friction；`staticFrictionEffort` 必须大于或等于 `dynamicFrictionEffort`，同一 API 还可设置 max joint velocity 和 armature。
- Articulation joints 本身不支持 closed loops；loop-closing joint 需要作为 regular joint 并标记 `excludeFromArticulation`。Closed-loop articulation 更难求解，source 建议降低 simulation timestep 并参考 stability guide。
- Mimic joints 用 $q_A + Gq_B + \gamma = 0$ 约束两个 DOF，适合 gear / rack-and-pinion；gripper contact 中 hard mimic constraint 可能和 hard contact 竞争，source 建议用 natural frequency 和 damping ratio 添加 compliance。
- Tendons 是 articulation 内部 constraints：fixed tendons 约束 joint positions 的 weighted sum；spatial tendons 通过 attachments 的 line-of-sight distances 建模 hydraulic actuator、artificial muscle 或 elastic-string-like mechanics。

## 关键引文

- “zero joint error by design”
- “PhysX simulates articulations in reduced-coordinates”
- “The tree structure is created solely by the Body 0 and Body 1 relationships”
- “A drive, operating analogous to a PD controller”
- “These constraints define a feasible operating region”
- “Closing loops is still possible by using a regular joint”
- “Mimic joint compliance is achieved with two parameters”

## 关联

- [[ReducedCoordinateArticulations]] - 把本 source 编译成 mechanism-level concept：topology、coordinates、drive envelope、mimic/tendon constraints 和 failure modes。
- [[PhysX]] - 本 source 的 physics runtime / schema context。
- [[IsaacSim]] - Isaac Sim robot simulation 中 articulation、drive、joint state 和 Tensor API 的 source-backed semantics。
- [[NVIDIA]] - source publisher 与 Omni Physics / PhysX documentation owner。
- [[ContactSolvers]] - source 中的 closed-loop、mimic compliance、TGS position iterations 和 hard-contact competition 扩展了 solver / constraint interaction lens。
- [[isaac-sim-mujoco-control-tuning-notes]] - 本 source 将其中一部分 PhysX position-drive 讨论升级为 source-backed，但 MuJoCo 对比与七自由度机械臂 gain grouping 仍是 conversation-derived。

## 开放问题

- 本页链接到 Articulation and Robot Simulation Stability Guide、Drive Performance Envelope PDF、PhysX SDK mimic-joint docs 与 joint support table；这些是后续值得 ingest 的 source，用来补充 solver stability、motor datasheet envelope 和 unsupported-joint taxonomy。
- Source 说明 drive analogous to PD controller，但没有完整展开 PhysX articulation drive 的 discretization、acceleration drive、solver iteration default 或 timestep interaction；这些仍需要 PhysX SDK / Isaac Sim joint tuning docs 验证。
- Source 覆盖 Omni Physics current docs，而 Isaac Sim importer / asset pipeline 可能还会把这些 APIs 包装进 `physx.usda`、Robot Schema 或 Tensor API workflow；实际项目仍需检查 importer output 和 version-specific schemas。
