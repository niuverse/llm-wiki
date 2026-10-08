---
title: "仿真策略怎样可靠迁移到现实"
type: "topic"
tags: ["simulation", "source-backed"]
sources: ["[[tobin-domain-randomization]]", "[[peng-dynamics-randomization]]", "[[simopt-adaptive-randomization]]", "[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning]]", "[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors]]", "[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation]]", "[[isaac-sim-policy-deployment]]", "[[simex-simulation-integrated-robotics-autoresearch]]", "[[dexweave-dexterous-humanoid-loco-manipulation]]"]
modified: 2026-10-08
description: "比较视觉与动力学随机化、分布适配和部署接口校验。"
---

# 仿真策略怎样可靠迁移到现实

比较视觉与动力学随机化、分布适配和部署接口校验。

## 方法与证据

| 路线 | 代表来源 | 需要避免的推断 |
| --- | --- | --- |
| 视觉随机化 | [[tobin-domain-randomization|Tobin 等]] | 仿真视觉定位成功不代表所有物理参数正确 |
| 动力学随机化 | [[peng-dynamics-randomization|Peng 等]] | 对随机参数稳健不等于恢复真实参数 |
| 仿真辅助的技能开发与修复 | [[simex-simulation-integrated-robotics-autoresearch|SimEX]] | 每任务约10分钟是真机适应交互，不包含数小时级的编排推理；跨仿真器评测不能当作硬件结果 |
| 分布适配 | [[simopt-adaptive-randomization|SimOpt]] | 匹配轨迹分布不等于参数唯一可辨识 |
| 部署流程与视觉策略 | [[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|AGILE]]、[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation|VIRAL 项目页]]、[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors|GRAIL]] | 流程建议、演示与定量实验不能混作同等证据 |

**当前判断：**迁移既需要处理环境分布差异，也需要复现观测、关节、动作单位与频率等接口。参数校准与接口校验应分别报告。

[[simex-simulation-integrated-robotics-autoresearch|SimEX]] 增加了另一种仿真用途：在真实失败之后固定程序校正环境，用多组仿真实验筛选代码修复。它改进可执行工具库和使用说明；与 [[simopt-adaptive-randomization|SimOpt]] 的参数分布校准和神经策略训练应分开比较。

[[dexweave-dexterous-humanoid-loco-manipulation|DexWeave]] 提供另一种迁移证据：Isaac Lab 训练、MuJoCo 定量评测、G1 定性展示。它依赖重定向参考、当前物体位姿与特定位置控制接口；97.5%是参考片段未提前终止的仿真完成率，不能作为真机操作成功率。

## 支撑资料

- [[tobin-domain-randomization|Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World]]
- [[peng-dynamics-randomization|Sim-to-Real Transfer of Robotic Control with Dynamics Randomization]]
- [[simopt-adaptive-randomization|Closing the Sim-to-Real Loop: Adapting Simulation Randomization with Real World Experience]]
- [[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning]]
- [[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors|GRAIL: Generating Humanoid Loco-Manipulation from 3D Assets and Video Priors]]
- [[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation|VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation]]
- [[isaac-sim-policy-deployment|Isaac Sim 6.1: Deploying policies in Isaac Sim]]

## 机制基础

[[DomainRandomization|域随机化：学习一组环境中的行为]]、[[SystemIdentificationForSimulation|仿真系统辨识与闭环分布校准]]、[[PolicyDeploymentContract|策略部署契约：同一模型如何执行同一行为]]、[[VisualSimToReal|视觉仿真到现实迁移]]、[[SimulationTimeStepping|仿真步长、积分器与控制频率]]、[[RobotCoordinateFrames|机器人坐标系与位姿]]、[[RobotRigidBodyDynamics|机器人刚体动力学]]、[[RoboticsSimulationLoop|机器人仿真循环]]。

## 未解问题与优先补证

哪些激励与观测能区分质量、摩擦、增益和延迟？怎样用未参与拟合的轨迹验证？优先补空间向量动力学、传感器标定和时步／控制周期的受控消融。

对仿真辅助修复，还需验证校准是否改善候选修复在真实系统中的排序，以及固定总计算预算后开放探索和种群多样性的收益。[[simex-simulation-integrated-robotics-autoresearch|SimEX 的现有实验与缺口]]给出起点，但尚未量化最低仿真保真度或单独消融对齐步骤。

这些是研究问题与验证要求，尚未作为已有结论。沿 [[topics/physics-simulation|物理仿真]] 与 [[topics/assets-and-world-generation|资产与场景生成]] 查看相关研究；基础学习可沿 [[simulation-and-assets-learning-path|学习路径]] 进行。
