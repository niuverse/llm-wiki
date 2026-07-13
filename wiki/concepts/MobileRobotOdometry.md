---
title: "移动机器人里程计"
type: concept
tags: [robotics, wheeled-robots, odometry, state-estimation]
sources: ["[[modern-robotics-chapter-13-wheeled-mobile-robots]]"]
last_updated: 2026-07-13
---

# 移动机器人里程计

移动式机器人里程计（移动机器人里程计）用车轮编码器增量估计底盘配置。[[modern-robotics-chapter-13-wheeled-mobile-robots|Modern 机器人学章节 13]] 把里程计写成两步：先把车轮角度增量变成刚体旋量 $V_b$，再把 $V_b$ 积分成新的底盘位姿。

## 数学结构

设第 $i$ 个车轮在采样间隔内的角度增量为 $\Delta\theta_i$，组成向量 $\Delta\theta$。对 omni/mecanum 基座：

$$
\Delta\theta = H(0)V_b
$$

因此：

$$
V_b=H^\dagger(0)\Delta\theta=F\Delta\theta
$$

其中 $H^\dagger(0)$ 是 pseudo-逆。对差分驱动或 car 的后轮，若左右轮增量为 $\Delta\theta_L,\Delta\theta_R$，轮半径 $r$，半轮距 $d$，则：

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

得到 $V_b=(\omega_{bz},v_{bx},v_{by})$ 后，将这段时间内的刚体旋量视为常量。若 $\omega_{bz}=0$：

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

最后用上一时刻 heading $\phi_k$ 把刚体帧增量转成世界帧增量，并更新：

$$
q_{k+1}=q_k+\Delta q
$$

## 直觉

里程计是 dead reckoning：它不直接测量位姿，而是把车轮 rotations 积分成位姿变更。短时间内通常稳定、便宜、低延迟；长时间会因为滑移、skid、车轮半径错误、编码器 quantization 和集成错误累积漂移。

Omni/mecanum 的里程计还多一个矩阵条件化问题：$H^\dagger$ 会把车轮编码器噪声投影到底盘旋量。如果车轮布局或标定不好，误差会被放大。

## 失效情形

- 车轮滑移：驱动方向发生滑移时，编码器仍会报告车轮旋转，但底盘没有对应位移。
- 横向滑移：传统车轮的横向无滑移假设被破坏，尤其在急转、低摩擦或 skid-steer 情况下。
- 半径或轮距标定误差：车轮半径 $r$ 或半轮距 $d$ 不准，会给平移与偏航角带来系统性偏差。
- 脚轮与转向 transient：被动脚轮或 steerable 模块未对准时，短时运动不符合简单里程计模型。
- 集成漂移：即使每步误差很小，位姿估计值也会随时间积累。

## 实践含义

车轮里程计不应单独作为长期全局位姿。它适合作为高比率局部估计值，再与 IMU、视觉、lidar、GPS、beacon 或 landmark 观测通过 Kalman filter、particle filter 或因素图结构融合。

仿真验证时，应单独检查指令到-车轮、车轮到-旋量、旋量到-位姿三层误差。相关页面：[[WheeledRobotKinematics]]、[[OmnidirectionalWheels]]、[[NonholonomicMobileRobots]]、[[SimulationRealityGap]]。
