---
title: "仿真与资产：从模型到可信观测"
type: synthesis
tags: [robotics, simulation, learn]
sources: ["[[mujoco-overview]]", "[[openusd-introduction]]", "[[isaac-sim-asset-structure]]", "[[contact-models-in-robotics-a-comparative-analysis]]", "[[nvidia-ovrtx]]", "[[mujoco-computation-collision-detection]]", "[[modern-robotics-homogeneous-transformations]]", "[[modern-robotics-lagrangian-dynamics]]", "[[tobin-domain-randomization]]", "[[peng-dynamics-randomization]]", "[[simopt-adaptive-randomization]]", "[[isaac-sim-policy-deployment]]"]
modified: 2026-10-04
nav_title: "仿真与资产"
description: "理解三维资产、机器人状态、碰撞与接触如何组成仿真，再追踪它们对传感器、训练和现实迁移的影响。"
topics: ["topics/physics-simulation", "topics/assets-and-world-generation", "topics/evaluation-and-transfer", "topics/planning-and-control", "topics/contact-modeling", "topics/collision-geometry", "topics/simulation-ready-worlds", "topics/simulation-transfer", "topics/wheeled-robot-modeling", "topics/asset-representation"]
---

# 仿真与资产：从模型到可信观测

目标是看懂“一次仿真步发生了什么”，沿坐标、动力学、接触、观测和任务接口定位问题，再理解如何用真实数据检查模型。需要基础线代、微积分和 Python；第一次学习按下表前进，已有基础可直接进入相关模块。

> 路径和练习是教学设计，技术判断来自各概念页及原始资料。官方文档说明引擎语义，迁移论文说明特定实验，两者的证据用途不同。

## 学习顺序

| 阶段 | 要解决的问题 | 阅读入口 | 完成标志 |
| --- | --- | --- | --- |
| 1 · 看清一个仿真步 | 模型、状态、控制与观测怎样分工 | [[RoboticsSimulationLoop|仿真循环]] | 能解释为什么位置目标不等于关节力矩 |
| 2 · 统一坐标与动力学 | 位姿怎样组合，力怎样改变运动 | [[RobotCoordinateFrames|坐标系与位姿]] → [[RobotRigidBodyDynamics|刚体动力学]] | 能检查参考系、速度自由度、惯量与约束力 |
| 3 · 把连续模型接到计算机 | 积分、物理步长、策略降频与延迟怎样配合 | [[SimulationTimeStepping|时步与控制频率]] | 能分别写出物理周期与策略周期 |
| 4 · 组织三维资产 | 视觉、碰撞、物理参数与层组合怎样分工 | [[3d-model-formats-learning-map|模型格式]] → [[OpenUSDSceneComposition|场景组合]] → [[USDAFileSyntax|USDA 语法]] → [[IsaacSimAssetStructure|资产结构]] | 能沿文件与层追踪参数归属 |
| 5 · 解释接触与机器人结构 | 接触点、摩擦、求解器及关节约束怎样决定运动 | [[CollisionGeometryForRobotSimulation|碰撞几何]] → [[ContactModelsInRobotics|接触模型]] → [[ContactSolvers|求解器]]；[[ReducedCoordinateArticulations|关节系统]] | 能区分几何、模型和数值误差 |
| 6 · 连接观测与任务 | 渲染输出怎样成为策略输入 | [[RTXSensorSimulationPipeline|传感器仿真]] → [[RoboticsSimulationInfrastructure|仿真基础设施]] | 能追踪时间、设备、数据形状与任务判定 |
| 7 · 用真实数据约束仿真 | 分布随机化、参数辨识与任务匹配有何区别 | [[DomainRandomization|域随机化]] → [[SystemIdentificationForSimulation|系统辨识]] → [[SimulationRealityGap|现实差距]] | 能区分迁移成功与参数辨识正确 |
| 8 · 复现策略接口 | 导出模型、观测、动作与时序怎样保持一致 | [[PolicyDeploymentContract|策略部署契约]] | 能核对训练配置、关节顺序与降频责任 |

```mermaid
flowchart LR
  A["资产、坐标与物理参数"] --> B["状态、执行器与接触"]
  B --> C["动力学求解与积分"]
  C --> D["传感器与观测"]
  D --> E["策略与任务判定"]
  E --> B
  F["真实测量"] --> G["辨识与随机化分布"]
  G --> A
```

图是教学抽象。MuJoCo 的具体求解与积分顺序、Isaac Sim 的策略降频责任都应查对应版本；相同的接口名称不保证相同的动力学或控制语义。

## 从具体问题进入

| 看到的现象 | 先查哪里 | 再深入哪里 |
| --- | --- | --- |
| 机器人或相机转向异常 | [[RobotCoordinateFrames|坐标与位姿]] | 轴、单位、变换方向及关节顺序 |
| 改策略频率后行为改变 | [[SimulationTimeStepping|时步与控制频率]] | [[PolicyDeploymentContract|动作和时序契约]] |
| 网格正常，物体却抓不住 | [[CollisionGeometryForRobotSimulation|碰撞几何]] | [[ContactComplementarity|接触互补]]、[[ContactSolvers|接触求解器]] |
| 夹爪颤振或闭环机构不稳定 | [[RobotRigidBodyDynamics|动力学]]、[[ReducedCoordinateArticulations|关节驱动]] | [[isaac-sim-mujoco-control-tuning-notes|控制调参笔记]] |
| RGB 正常，策略输入异常 | [[RTXSensorSimulationPipeline|传感器输出]] | [[PolicyDeploymentContract|观测顺序、缩放与历史]] |
| 仿真成功，硬件失败 | [[SimulationRealityGap|差距诊断]] | [[DomainRandomization|随机化]]、[[SystemIdentificationForSimulation|辨识]] |
| 希望通过梯度优化动作 | [[DifferentiablePhysics|可微物理]] | [[DifferentiableCollisionDetection|可微碰撞]] |

## 把“可仿真”拆成验收条件

[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|EmbodiedGen V2]] 的资产接受、局部抓取、可供性与任务世界检查使用不同对象和判据，不能合并成一个物理正确率。[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|MagicSim]] 描述回合执行、管理器状态恢复与成功筛选记录；这些机制不等于已经证明跨版本逐位重放、异步吞吐提升或真实部署可靠性，其配套资产统计也不是独立复核。

迁移证据同样分层：[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|AGILE]] 的定量跟踪与操作测试主要在仿真，[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation|VIRAL]] 当前归档项目页提供定性案例，[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors|GRAIL]] 则提供限定物体和任务的真机试验。读者应分别记录接口实现、仿真实验、硬件演示和硬件统计。

## 用一个物体完成复习

教学练习：选一个带把手的抽屉，画出坐标、视觉网格、碰撞体、关节、执行器、相机、动作接口和成功判定之间的关系。解释碰撞体变粗、驱动刚度变化、相机移动和策略降频分别影响哪一层。

再设计两个不同实验：一个用测量轨迹辨识参数，另一个在参数分布上训练策略。写清两者的观测、目标、数据预算和独立验证条件。可以用 [[simopt-adaptive-randomization|SimOpt]] 核对任务匹配与物理参数真值的区别。

## 证据与复习入口

本轮补充了坐标、能量动力学、数值时序、域随机化、系统辨识及部署契约。MuJoCo 3.8 与 Isaac Sim 6.1 的接口按版本记录，旧快照和旧版笔记仍可追溯。两条研究线怎样连接，见 [[world-models-and-simulation-research|研究地图]]。研究问题分别进入 [[topics/contact-modeling|接触建模]]、[[topics/collision-geometry|碰撞几何]]、[[topics/simulation-ready-worlds|可执行生成世界]]、[[topics/simulation-transfer|仿真迁移]]、[[topics/asset-representation|资产表示]] 与 [[topics/wheeled-robot-modeling|轮式机器人建模]]；[[research-questions|研究问题索引]]只汇总入口。

轮式机器人见 [[wheeled-robot-modeling-learning-map|轮式机器人地图]]；旧资产见 [[IsaacSimLegacyAssetStructure|旧版资产结构]]；生成世界见 [[SimulationReady3DWorldGeneration|仿真世界生成]]。

## 研究归属

[[topics/physics-simulation|物理仿真]] · [[topics/assets-and-world-generation|三维资产与场景生成]] · [[topics/evaluation-and-transfer|评测与现实迁移]] · [[topics/planning-and-control|规划与控制]] · [[topics/contact-modeling|接触模型与求解怎样改变运动]] · [[topics/collision-geometry|碰撞几何如何兼顾精度与计算]] · [[topics/simulation-ready-worlds|生成世界何时成为可执行环境]] · [[topics/simulation-transfer|仿真策略怎样可靠迁移到现实]] · [[topics/wheeled-robot-modeling|轮式机器人如何建模与分类]] · [[topics/asset-representation|资产格式怎样保留仿真语义]]。
