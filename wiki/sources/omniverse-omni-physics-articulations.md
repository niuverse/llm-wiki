---
title: "Articulations - Omni Physics"
type: source
tags: [omniverse, omni-physics, physx, articulations, robotics-simulation]
sources: []
last_updated: 2026-07-13
source_file: raw/omniverse-omni-physics-articulations.html
source_kind: html
source_url: https://docs.omniverse.nvidia.com/kit/docs/omni_physics/latest/dev_guide/rigid_bodies_articulations/articulations.html
extracted_text: graph/extracts/omniverse-omni-physics-articulations.md
source_date: 2026-05-01
---

# Articulations - Omni Physics

## 摘要

这是 [[NVIDIA]] Omni 物理文档中的关节系统页面，最后更新时间为 2026-05-01。它说明 [[PhysX]] 如何用约化坐标关节系统（约化坐标关节系统）模拟由关节连接的刚体，并给出 USD / PhysX API 层面的根部放置、关节状态、驱动器 envelope、关节摩擦、闭环 breaking、mimic 关节和 tendons rules。

本页对 Isaac Sim / PhysX 机器人仿真的价值在于：它把“关节系统只是 jointed 刚体的加速实现”纠正为一个更具体的建模选择。关节系统用根部机体和关节角度表达配置，而不是让每个链接拥有独立世界位姿；这带来 zero 关节错误由设计和更好的质量比率处理，但也要求拓扑基本是树，并引入根部选择、闭环处理、关节限制、mimic 柔顺性和张量 API access 等约束。

## 核心主张

- 关节系统通常比 ordinary jointed 刚体更适合机制 / 机器人：PhysX 在约化坐标中模拟关节系统，配置由根部机体和关节角度决定，而不是由每个机体的世界位姿决定。
- 关节系统拓扑由关节的 `Body 0` / `Body 1` 关系形成；USD 层级只在 parsing / 根部检测时有影响，不等价于物理关节系统树。
- 固定基座关节系统应把 `UsdPhysics.ArticulationRootAPI` 加到世界固定关节或其 ancestor；floating-基座关节系统应加到根部链接或其 ancestor。
- 如果根部 API 不是直接加到固定关节或刚体，仿真器会遍历层级、构造拓扑图结构，并用确定性 rule 选择关节系统类型和根部：有世界关节则固定基座，否则选 minimal eccentricity 的图结构节点。
- 约化坐标语义意味着 non-根部链接不能直接设置位姿 / 速度；关节 DOF 状态要用 `PhysxSchema.JointStateAPI`，但在 Fabric / RL workloads 中应改用张量 API `ArticulationView`。
- 关节系统驱动器是 per-轴驱动器，来源明确把它描述为类似 PD 控制器；`PhysxDrivePerformanceEnvelopeAPI` 用作用力和速度约束表达执行器可行区域，并区分 `maxActuatorVelocity` 与关节层级 `maxJointVelocity`。
- 关节系统关节摩擦组合静态 / 动力学 Coulomb 摩擦和 viscous 摩擦；`staticFrictionEffort` 必须大于或等于 `dynamicFrictionEffort`，同一 API 还可设置最大关节速度和 armature。
- 关节系统关节本身不支持闭环s；循环-closing 关节需要作为 regular 关节并标记 `excludeFromArticulation`。闭环关节系统更难求解，来源建议降低仿真时间步并参考稳定性指南。
- Mimic 关节用 $q_A + Gq_B + \gamma = 0$ 约束两个 DOF，适合 gear / rack-与-pinion；gripper 接触中硬 mimic 约束可能和硬接触竞争，来源建议用自然频率和阻尼比率添加柔顺性。
- 肌腱是关节系统内部约束：固定肌腱约束关节位置的加权和；空间肌腱通过附着点之间的视线距离，建模液压执行器、人工肌肉或弹性绳索类机构。

## 关键引文

- “zero joint error by design”
- “PhysX simulates articulations in reduced-coordinates”
- “The tree structure is created solely by the Body 0 and Body 1 relationships”
- “A drive, operating analogous to a PD controller”
- “These constraints define a feasible operating region”
- “Closing loops is still possible by using a regular joint”
- “Mimic joint compliance is achieved with two parameters”

## 关联

- [[ReducedCoordinateArticulations]] - 把本来源编译成机制层级概念：拓扑、坐标、驱动器 envelope、mimic/tendon 约束和失效情形。
- [[PhysX]] - 本来源的物理运行时 / 结构规范上下文。
- [[IsaacSim]] - Isaac Sim 机器人仿真中关节系统、驱动器、关节状态和张量 API 的有来源支持的语义。
- [[NVIDIA]] - 来源 publisher 与 Omni 物理 / PhysX 文档 owner。
- [[ContactSolvers]] - 来源中的闭环、mimic 柔顺性、TGS 位置迭代和硬接触 competition 扩展了求解器 / 约束交互视角。
- [[isaac-sim-mujoco-control-tuning-notes]] - 本来源将其中一部分 PhysX 位置驱动器讨论升级为有来源支持的，但 MuJoCo 对比与七自由度机械臂增益分组仍是来自讨论的。

## 开放问题

- 本页链接到关节系统与机器人仿真稳定性指南、驱动器性能 Envelope PDF、PhysX SDK mimic-关节文档与关节支撑表格；这些是后续值得收录的来源，用来补充求解器稳定性、motor 数据手册 envelope 和不支持的关节分类体系。
- 来源说明驱动器类似 PD 控制器，但没有完整展开 PhysX 关节系统驱动器的离散化、加速度驱动、求解器迭代默认值或时间步交互；这些仍需 PhysX SDK / Isaac Sim 关节调优文档验证。
- 来源覆盖 Omni 物理当前文档，而 Isaac Sim 导入器 / 资产流程可能还会把这些 APIs 包装进 `physx.usda`、机器人结构规范或张量 API 工作流；实际项目仍需检查导入器输出和版本特定的结构规范。
