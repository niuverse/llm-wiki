---
title: "规划与控制"
type: "topic"
tags: ["robotics", "source-backed"]
sources: ["[[planet-learning-latent-dynamics]]", "[[td-mpc2-scalable-robust-world-models]]", "[[structural-properties-and-classification-of-wheeled-mobile-robots]]", "[[modern-robotics-chapter-13-wheeled-mobile-robots]]"]
modified: "2026-10-04"
entry: "research"
nav_order: 3
description: "规划与控制把目标、预测和约束变成可执行动作。学习模型和解析模型都可以参与其中；关键是状态怎样估计、动作怎样优化、反馈何时更新。"
---

# 规划与控制

规划与控制把目标、预测和约束变成可执行动作。学习模型和解析模型都可以参与其中；关键是状态怎样估计、动作怎样优化、反馈何时更新。

## 阅读地图

- **模型与反馈。** [[ModelPredictiveControl|模型预测控制]] 解释有限时域优化与重新规划；[[topics/world-model-decision|世界模型决策]] 讨论学得模型怎样参与这一回路。
- **目标与价值。** [[VisualGoalPlanning|视觉目标规划]] 使用目标表征距离；[[td-mpc2-scalable-robust-world-models|TD-MPC2]] 使用奖励和终端价值。它们都要明确目标、可用信息和动作预算。
- **身体约束。** [[RobotCoordinateFrames|坐标系与位姿]]、[[RobotRigidBodyDynamics|刚体动力学]] 连接运动表示与力；[[topics/wheeled-robot-modeling|轮式机器人建模]] 从轮子约束推导可行速度，而不按电机数量猜测自由度。
- **从输出到执行。** [[PolicyDeploymentContract|策略部署约定]]、[[SimulationTimeStepping|步长与控制频率]] 解释动作坐标、控制器和时间尺度。更底层的数值假设见 [[topics/physics-simulation|物理仿真]]。

## 当前理解

执行时求解动作和训练时学习策略是不同的计算安排，见 [[planet-learning-latent-dynamics|PlaNet]] 与 [[ImaginedPolicyLearning|想象策略学习]]。轮式模型则提醒我们：瞬时可行运动、通过连续动作到达的位置、完整配置的约束不是同一个问题，见 [[structural-properties-and-classification-of-wheeled-mobile-robots|轮式分类论文]]、[[modern-robotics-chapter-13-wheeled-mobile-robots|Modern Robotics 第十三章]]。将模型与约束放在同一地图，是为了显式检查控制接口。

## 未解问题与优先补证

估计误差、模型误差和有限优化预算怎样分别影响闭环稳定与约束满足？当前论文不足以给出统一稳定性保证，需要专门控制教材与可核查定理补证。具体轮式问题见 [[topics/wheeled-robot-modeling#未解问题与优先补证|轮式建模的验证问题]]。
