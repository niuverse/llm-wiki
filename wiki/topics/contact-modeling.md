---
title: "接触模型与求解怎样改变运动"
type: "topic"
tags: ["simulation", "source-backed"]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[mujoco-computation-collision-detection]]", "[[omniverse-omni-physics-articulations]]"]
modified: "2026-10-04"
description: "区分物理近似、离散化和求解误差，避免用稳定性代替真实性。"
---

# 接触模型与求解怎样改变运动

区分物理近似、离散化和求解误差，避免用稳定性代替真实性。

## 方法与证据

[[contact-models-in-robotics-a-comparative-analysis|接触模型比较]]区分物理模型与数值求解的影响；[[mujoco-computation-collision-detection|MuJoCo 计算文档]]和[[omniverse-omni-physics-articulations|关节系统文档]]说明具体实现语义。

**当前判断：**几何决定候选接触，接触关系决定力的可行域，求解器和步长影响实际数值结果。比较残差前必须先对齐方程与单位，不能把不同物理假设产生的差异全部称为求解误差。局部梯度存在也不等于接触切换处处光滑。

## 支撑资料

- [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]]
- [[mujoco-computation-collision-detection|MuJoCo Computation：动力学、积分与接触]]
- [[omniverse-omni-physics-articulations|Articulations - Omni Physics]]

## 机制基础

[[ContactModelsInRobotics|机器人学中的接触模型]]、[[ContactComplementarity|接触互补]]、[[ContactSolvers|接触求解器]]、[[DifferentiablePhysics|可微物理]]、[[ReducedCoordinateArticulations|约化坐标关节系统]]。

## 未解问题与优先补证

相同几何、控制、步长和预算下，不同接触模型的残差、能量与任务成功如何变化？浮动基座、柔性接触和可变形材料仍需教材与独立实验补证。

这些是研究问题与验证要求，尚未作为已有结论。沿 [[topics/physics-simulation|物理仿真]] 与 [[topics/assets-and-world-generation|资产与场景生成]] 查看相关研究；基础学习可沿 [[simulation-and-assets-learning-path|学习路径]] 进行。
