---
title: "Nonholonomic Mobile Robots"
type: concept
tags: [robotics, wheeled-robots, nonholonomic-systems, controllability]
sources: ["[[modern-robotics-chapter-13-wheeled-mobile-robots]]", "[[structural-properties-and-classification-of-wheeled-mobile-robots]]"]
last_updated: 2026-05-01
---

# Nonholonomic Mobile Robots

Nonholonomic mobile robots（非完整约束移动机器人）不能直接执行某些 instantaneous velocity，例如 car-like robot 不能直接侧移；但这些 velocity constraints 不能积分成 configuration constraints，所以机器人仍可能通过 maneuver 到达任意平面位姿。[[modern-robotics-chapter-13-wheeled-mobile-robots|Modern Robotics Chapter 13]] 用 canonical model、Pfaffian constraint 和 Lie bracket 解释这一点；[[structural-properties-and-classification-of-wheeled-mobile-robots|Campion et al.]] 用 $\delta_m,\delta_s$ 把 limited-mobility WMR 结构化分类。

## 数学结构

典型 nonholonomic chassis configuration 为：

$$
q=(\phi,x,y)
$$

canonical simplified model 写成：

$$
\dot q =
\begin{bmatrix}
0 & 1\\
\cos\phi & 0\\
\sin\phi & 0
\end{bmatrix}
\begin{bmatrix}
v\\
\omega
\end{bmatrix}
$$

其中 $v$ 是 forward speed，$\omega$ 是 yaw rate。该模型隐含一个 lateral Pfaffian constraint：

$$
A(q)\dot q =
\begin{bmatrix}
0 & \sin\phi & -\cos\phi
\end{bmatrix}
\dot q
=
\dot x\sin\phi-\dot y\cos\phi=0
$$

这个 constraint 禁止 body lateral velocity，但不禁止 configuration-level sideways displacement。Lie bracket 说明了原因。若

$$
g_1(q)=(0,\cos\phi,\sin\phi)^T,\qquad g_2(q)=(1,0,0)^T
$$

则

$$
[g_1,g_2](q)=(0,\sin\phi,-\cos\phi)^T
$$

这个 bracket direction 是 sideways motion。实际执行时，它来自 forward/backward 与 rotation motions 的交替组合，位移量是二阶小量。

## 直觉

Nonholonomic constraint 是 velocity-level limitation，不是 position-level wall。车不能瞬间横移，但可以通过前后移动加转向完成 parallel parking。代价是速度方向受限、局部 maneuver 需要时间，并且某些 stabilization/control 问题比 omnidirectional base 更难。

Modern Robotics 的关键对比是：unicycle、diff-drive 和 car-like robot 可以共享同一个 canonical model，但 control set $U$ 不同。Diff-drive 可以原地旋转；car-like robot 受 minimum turning radius 限制；forward-only car 没有 reverse direction，因此 small-time controllability 比有倒车档的 car 更弱。

## Failure Modes

- Controller mismatch：用 omnidirectional single-integrator controller 直接控制 full chassis pose 会违反 nonholonomic constraint。
- Stabilization trap：canonical nonholonomic robot 不能被 continuous time-invariant state feedback 稳定到原点；需要 trajectory tracking、time-varying feedback 或 hybrid/discontinuous strategies。
- Planning simplification error：把 car-like robot 当作 holonomic disc 会生成不可执行路径，尤其在窄通道或障碍物附近。
- Slip hidden in model：skid-steer、tracked vehicle 和高加速度 diff-drive 会依赖或产生 lateral slip，不属于纯 no-slip nonholonomic model。
- Odometry optimism：wheel encoder integration 假设 rolling without slipping；转向、打滑和 caster transient 会破坏该假设。

## 实践含义

路径规划应使用满足车辆约束的 primitives，例如 Dubins、Reeds-Shepp、lattice 或 kinodynamic planning。轨迹跟踪可以在 feasible reference trajectory 周围做 feedback，而不是要求机器人直接执行任意 pose error vector。

与 [[WheeledMobileRobotClassification]] 连接时，nonholonomic robots 覆盖 Campion taxonomy 中 $\delta_m<3$ 的 limited-mobility types。与 [[SimulationRealityGap]] 连接时，关键是区分“真实 nonholonomic no-slip constraint”和“仿真/硬件中的滑移近似”。
