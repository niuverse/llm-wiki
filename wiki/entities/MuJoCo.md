---
title: "MuJoCo"
type: entity
tags: [robotics, simulation, physics-engine]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[mujoco-computation-collision-detection]]", "[[isaac-sim-asset-structure]]", "[[robotics-simulation-infrastructure]]", "[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]", "[[mujocouni-persistent-batched-runtime-primitives-for-mujoco]]", "[[mujoco-warp-mjwarp-documentation]]", "[[mjlab-repository]]", "[[mujoco-playground-repository]]"]
last_updated: 2026-07-13
---

# MuJoCo

MuJoCo 是 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 中讨论的机器人学物理引擎，在模型基于控制与强化学习流程中很重要。

在这个来源中，MuJoCo 代表一种接触模型取舍：它使用优化基于接触处理，以及有助于条件化与 uniqueness 的柔顺性/regularization 选择；但论文认为这些选择也可能 shift the 物理 solution。作者特别指出人为柔顺性对 [[DifferentiablePhysics|可微物理]] 很重要，因为它会改变下游轨迹优化使用的梯度。

[[mujoco-computation-collision-detection|MuJoCo collision detection docs]] 补充了当前文档覆盖范围：MuJoCo 的碰撞查询作用在 geoms 上，活跃接触写入 `mjData.contact`，后续用于约束结构。文档明确说 MuJoCo 碰撞检测默认受凸 geoms 约束；非凸网格在碰撞中会用凸包替代，复杂非凸物体应通过 [[ApproximateConvexDecomposition|凸分解]] 变成同一机体上的一组凸 geoms。文档还把 [[CoACD]] 作为自动分解工具例子。

[[isaac-sim-asset-structure|Isaac Sim Asset Structure]] 来源给 MuJoCo 增加了资产制作上下文：Isaac Sim 6.0 EDR 文档建议把 MuJoCo-特定的属性和调优放入 `mujoco.usda`，并把常见的刚体、关节和关节系统放在中性 `physics.usd(a)` 层中，以避免运行时特定的行为与 PhysX 或中性物理 clashing。

本次提炼进一步澄清了 `mujoco.usda` 的 ownership 边界：在 Isaac 资产结构上下文中，MuJoCo 原生 MJCF 里存在视觉 / 碰撞模型不意味着视觉网格、材质或共享碰撞体几何应进入 `mujoco.usda`；这些通常属于共享几何 / 材质 / 实例 / 中性物理层，`mujoco.usda` 更适合作为 MuJoCo-仅运行时 interpretation / 调优 overlay。这个边界是来自讨论的 clarification，待后续收录 MuJoCo XML 参考和 Isaac 后端结构规范文档验证具体 supported 属性。见 [[isaac-sim-mujoco-usda-runtime-semantics]]。

另一个来自讨论的提炼总结了 MuJoCo 与 Isaac Sim / PhysX 的物理/控制迁移边界：不要直接复制原始 stiffness/damping 增益，而应迁移闭环带宽、damping 比率、力限制、轨迹平滑性和接触 regime；同时要记住 MuJoCo 和 PhysX 的求解器、约束 regularization 与执行器抽象不同。MuJoCo 执行器、`forcerange`、`armature`、`solref/solimp`、Newton/CG/PGS 求解器等具体语义仍需要后续收录官方 MuJoCo 文档。见 [[isaac-sim-mujoco-control-tuning-notes]]。

[[robotics-simulation-infrastructure|机器人学仿真基础设施]] 来源额外提到 MuJoCo Lab 作为端到端仿真/ML 框架示例，并特别把它的可视化工具描述为适合强化学习工作的诊断表面。这个主张指向 MuJoCo Lab 基础设施，而不是 MuJoCo core 物理语义；当前页面暂不把二者合并为同一个实现主张。

[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab]] 来源又给 MuJoCo 生态增加了训练系统上下文：MuJoCoUni 作为 CPU-批处理的 MuJoCo 运行时后端，用于异构 CPU 仿真 / GPU 学习；来源还把 MjWarp / mjlab / MuJoCo Playground 放在驻留 GPU 的机器人学习 systems 背景中对比。后续收录已把这个上下文拆开：[[MuJoCoUni]] 的技术报告支持有状态的 CPU-批处理的 `BatchEnvPool` 路线；[[MJWarp]] 官方文档支持 NVIDIA Warp / 面向 GPU 的并行 MuJoCo 路线，并明确特征一致性、nondeterminism 与 nondifferentiability 边界；[[Mjlab|mjlab]] 和 [[MuJoCoPlayground]] 代码仓库 snapshots 则显示 MuJoCo Warp / MJX 已进入更高的层级机器人学习框架。这个证据说明 MuJoCo-相关的基础设施已经同时覆盖 CPU-批处理的、面向 GPU 的和框架层级训练路径，但不支持把各后端的求解器/接触/渲染语义直接视为完全等价。

相关页面：[[CollisionGeometryForRobotSimulation]]、[[ApproximateConvexDecomposition]]、[[ContactModelsInRobotics]]、[[ContactComplementarity]]、[[ContactSolvers]]、[[RoboticsSimulationInfrastructure]]、[[HeterogeneousRobotRLTraining]]、[[SimulationRealityGap]]、[[MuJoCoUni]]、[[MJWarp]]、[[Mjlab|mjlab]]、[[MuJoCoPlayground]]、[[IsaacSimAssetStructure]]、[[isaac-sim-mujoco-control-tuning-notes]]。
