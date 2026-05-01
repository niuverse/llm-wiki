---
title: "Wheeled Robot Visual Lab"
type: synthesis
tags: [learn, robotics, kinematics, visualization]
sources: ["[[modern-robotics-chapter-13-wheeled-mobile-robots]]", "[[structural-properties-and-classification-of-wheeled-mobile-robots]]"]
last_updated: 2026-05-01
---

# Wheeled Robot Visual Lab

## 目的

这个页面把轮子级别的几何约束画成可交互的平面图，并同步显示它们如何形成 chassis-level kinematic matrix（底盘运动学矩阵）。它是一个 learning scaffold：数学关系来自已 ingest 的 wheeled mobile robot sources，交互组织方式是 wiki 的学习辅助层。

## 从轮子约束到矩阵行

平面刚体的 body twist 写成 $V_b = [v_x, v_y, \omega]^T$。位于 body frame 中 $(x_i, y_i)$ 的轮子接触点速度为：

$$
v_i =
\begin{bmatrix}
v_x - \omega y_i \\
v_y + \omega x_i
\end{bmatrix}
$$

轮子的 rolling direction $t_i$ 给出 driven rolling row：

$$
\dot\phi_i = \frac{1}{r} t_i^T v_i
$$

conventional wheel 的 lateral direction $n_i$ 给出 no-slip constraint：

$$
n_i^T v_i = 0
$$

这些 row 叠起来后，就是整车层面的 kinematic matrix。differential drive、omni wheel 和 steerable wheel 的差异，主要体现在哪些 row 被保留、哪些 lateral constraints 被放松，以及 wheel direction 是否随 steering angle 改变。更完整的 source-backed 推导见 [[WheeledRobotKinematics]]、[[OmnidirectionalWheels]]、[[NonholonomicMobileRobots]] 和 [[SteerableWheels]]。

## 交互图

<div data-wheeled-robot-lab data-default-kind="differential"></div>

## 读图方法

- 蓝绿色箭头表示 rolling direction $t_i$，它进入 wheel-speed row。
- 红色法向箭头表示 lateral no-slip direction $n_i$，它进入 constraint row。
- 黑色小箭头表示由当前 $V_b$ 诱导出的 wheel contact velocity $v_i$。
- 对 omni wheel，虚线 lateral direction 表示被 passive roller motion 放松的方向，不再作为 conventional wheel 那样的硬 no-slip constraint。

## 关联

- [[WheeledRobotKinematics]]
- [[WheeledMobileRobotClassification]]
- [[NonholonomicMobileRobots]]
- [[OmnidirectionalWheels]]
- [[SteerableWheels]]
- [[MobileRobotOdometry]]
- [[modern-robotics-chapter-13-wheeled-mobile-robots|Modern Robotics Chapter 13: Wheeled Mobile Robots]]
- [[structural-properties-and-classification-of-wheeled-mobile-robots|Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots]]
