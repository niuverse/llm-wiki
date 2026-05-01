---
title: "Mobile Robot Odometry"
type: concept
tags: [robotics, wheeled-robots, odometry, state-estimation]
sources: ["[[modern-robotics-chapter-13-wheeled-mobile-robots]]"]
last_updated: 2026-05-01
---

# Mobile Robot Odometry

Mobile robot odometry（移动机器人里程计）用 wheel encoder increments 估计 chassis configuration。[[modern-robotics-chapter-13-wheeled-mobile-robots|Modern Robotics Chapter 13]] 把 odometry 写成两步：先把 wheel angle increments 变成 body twist $V_b$，再把 $V_b$ 积分成新的 chassis pose。

## 数学结构

设第 $i$ 个 wheel 在采样间隔内的 angle increment 为 $\Delta\theta_i$，组成向量 $\Delta\theta$。对 omni/mecanum base：

$$
\Delta\theta = H(0)V_b
$$

因此：

$$
V_b=H^\dagger(0)\Delta\theta=F\Delta\theta
$$

其中 $H^\dagger(0)$ 是 pseudo-inverse。对 differential drive 或 car 的后轮，若左右轮增量为 $\Delta\theta_L,\Delta\theta_R$，轮半径 $r$，半轮距 $d$，则：

$$
V_b =
r
\begin{bmatrix}
-1/(2d) & 1/(2d)\\
1/2 & 1/2\\
0 & 0
\end{bmatrix}
\begin{bmatrix}
\Delta\theta_L\\
\Delta\theta_R
\end{bmatrix}
$$

得到 $V_b=(\omega_{bz},v_{bx},v_{by})$ 后，将这段时间内的 body twist 视为常量。若 $\omega_{bz}=0$：

$$
\Delta q_b =
\begin{bmatrix}
0\\
v_{bx}\\
v_{by}
\end{bmatrix}
$$

若 $\omega_{bz}\ne 0$：

$$
\Delta q_b =
\begin{bmatrix}
\omega_{bz}\\
(v_{bx}\sin\omega_{bz}+v_{by}(\cos\omega_{bz}-1))/\omega_{bz}\\
(v_{by}\sin\omega_{bz}+v_{bx}(1-\cos\omega_{bz}))/\omega_{bz}
\end{bmatrix}
$$

最后用上一时刻 heading $\phi_k$ 把 body-frame increment 转成 world-frame increment，并更新：

$$
q_{k+1}=q_k+\Delta q
$$

## 直觉

Odometry 是 dead reckoning：它不直接测量 pose，而是把 wheel rotations 积分成 pose change。短时间内通常稳定、便宜、低延迟；长时间会因为 slip、skid、wheel radius error、encoder quantization 和 integration error 累积 drift。

Omni/mecanum 的 odometry 还多一个 matrix conditioning 问题：$H^\dagger$ 会把 wheel encoder noise 投影到底盘 twist。如果 wheel layout 或 calibration 不好，误差会被放大。

## Failure Modes

- Wheel slip：drive direction 发生滑移时，encoder 仍会报告 wheel rotation，但 chassis 没有对应位移。
- Lateral slip：conventional wheel 的 lateral no-slip assumption 被破坏，尤其在急转、低摩擦或 skid-steer 情况下。
- Radius / baseline calibration error：wheel radius $r$ 或 half track $d$ 错，会系统性偏置 translation 与 yaw。
- Caster and steering transient：passive caster 或 steerable module 未对准时，短时 motion 不符合 simple odometry model。
- Integration drift：即使每步误差很小，pose estimate 也会随时间积累。

## 实践含义

Wheel odometry 不应单独作为长期 global pose。它适合作为 high-rate local estimate，再与 IMU、vision、lidar、GPS、beacon 或 landmark observations 通过 Kalman filter、particle filter 或 factor graph 融合。

仿真验证时，应单独检查 command-to-wheel、wheel-to-twist、twist-to-pose 三层误差。相关页面：[[WheeledRobotKinematics]]、[[OmnidirectionalWheels]]、[[NonholonomicMobileRobots]]、[[SimulationRealityGap]]。
