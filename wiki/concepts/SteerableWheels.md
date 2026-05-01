---
title: "Steerable Wheels"
type: concept
tags: [robotics, wheeled-robots, steerable-wheels, swerve, caster]
sources: ["[[structural-properties-and-classification-of-wheeled-mobile-robots]]", "[[modern-robotics-chapter-13-wheeled-mobile-robots]]"]
last_updated: 2026-05-01
---

# Steerable Wheels

Steerable wheels（舵轮/可转向轮）是 wheel plane orientation 可以相对 chassis 改变的 conventional wheels。[[structural-properties-and-classification-of-wheeled-mobile-robots|Campion et al.]] 区分 centered steerable conventional wheels 与 off-centered steerable/caster wheels，并用 $\delta_s$ 度量独立 steering DOFs 对 maneuverability 的贡献。[[modern-robotics-chapter-13-wheeled-mobile-robots|Modern Robotics Chapter 13]] 的 car-like / Ackermann model 和 steerable-wheel exercise 提供了更入门的几何直觉。

## 数学结构

对 conventional wheel，rolling direction 与 lateral no-slip direction 随 steering angle $\beta_i$ 改变。若 wheel center 在 body frame 中为 $(x_i,y_i)$，接触点速度为：

$$
v_i =
\begin{bmatrix}
v_{bx}-\omega_{bz}y_i\\
v_{by}+\omega_{bz}x_i
\end{bmatrix}
$$

wheel rolling direction $t_i(\beta_i)$ 和 lateral direction $n_i(\beta_i)$ 给出：

$$
t_i(\beta_i)^T v_i = r_i\dot\theta_i
$$

$$
n_i(\beta_i)^T v_i = 0
$$

Centered steerable wheel 的 steering axis 通过 wheel center，因此 steering 主要改变 no-slip direction。Off-centered steerable/caster wheel 的 steering axis 不通过 wheel center，constraint 中会出现 steering rate $\dot\beta_i$ 与 offset length $d_i$ 的耦合；这会让 caster transient 进入底盘运动与 odometry error。

Campion 的 structural role 可以概括为：

$$
\delta_s=\operatorname{rank}C_{1c}(\beta_c)
$$

其中 $C_{1c}$ 是 centered steerable wheels 对 lateral no-slip constraints 的贡献。$\delta_s$ 不是“有几个舵轮”，而是有多少独立 steering directions 真正改变 robot mobility structure。

## 直觉

Steerable wheel 的优势是 traction 好：它仍是 conventional wheel，不依赖 omni/mecanum roller 释放侧向运动。但全向能力不是 instantaneous free lunch。要朝某个方向运动，wheel modules 需要先对准对应 rolling directions；steering actuator 的速度、角度 wrap、零位误差和同步误差都会进入控制。

Car-like Ackermann steering 是一种受约束的 steerable wheel layout：前轮 steering angles 被机械关系协调，让所有 wheel axes 指向同一个 center of rotation。Swerve-style modules 则让每个 wheel module 有独立 steering 与 drive DOF；它更接近 $\delta_s$ 较高的 steerable-wheel system，但具体归类需要根据 module constraints 与 coordination policy 推导。

## Failure Modes

- Steering singularity：期望 wheel contact velocity 很小，$\operatorname{atan2}$ 给出的 steering angle 对噪声敏感。
- Angle wrap and drive reversal：同一 wheel velocity 可由 $\beta_i,\dot\theta_i$ 或 $\beta_i+\pi,-\dot\theta_i$ 实现；控制器必须选择更平滑的一支。
- Steering-rate limit：kinematic inverse solution 假设 steering angle 可瞬时改变，真实 actuator 会滞后。
- Module disagreement：多个 steerable wheels 若没有对准同一 feasible instant center of rotation，会产生 tire scrub 或 contact conflict。
- Caster transient：off-centered caster 的 $\dot\beta$ 与 offset $d$ 会引入 transient forces 和 odometry error。
- Taxonomy mismatch：现代 swerve drive 的软件控制、module dynamics 和 wheel slip 需要 implementation docs 与 hardware data 补充，Campion taxonomy 只给出 structural layer。

## 实践含义

建模时先区分 centered steerable wheel、off-centered caster 和 independently driven swerve module。Kinematic allocation 可以先按 desired contact-point velocity 求 steering angle 与 drive speed；工程控制必须再加 steering-rate limits、wheel-speed saturation、angle wrapping、module calibration 和 slip detection。

仿真时，steerable wheels 比 mecanum/omni 更需要正确的 joint hierarchy：steering joint、drive joint、wheel collision、friction anisotropy 和 actuator limits 都会影响 behavior。相关页面：[[WheeledMobileRobotClassification]]、[[WheeledRobotKinematics]]、[[MobileRobotOdometry]]、[[SimulationRealityGap]]。
