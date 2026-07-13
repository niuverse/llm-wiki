---
title: "轮式机器人可视化实验"
type: synthesis
tags: [learn, robotics, kinematics, visualization]
sources: ["[[modern-robotics-chapter-13-wheeled-mobile-robots]]", "[[structural-properties-and-classification-of-wheeled-mobile-robots]]"]
last_updated: 2026-07-13
---

# 轮式机器人可视化实验

## 目的

这个页面把车轮级几何约束画成可交互平面图，并同步显示它们如何形成底盘运动学矩阵。它是一份学习脚手架：数学关系来自已收录的轮式移动机器人来源，交互组织方式属于知识库的学习辅助层。

## 从轮子约束到矩阵行

平面刚体的机体旋量写成 $V_b = [v_x, v_y, \omega]^T$。位于机体帧中 $(x_i, y_i)$ 的轮子接触点速度为：

$$
v_i =
\begin{bmatrix}
v_x - \omega y_i \\
v_y + \omega x_i
\end{bmatrix}
$$

轮子的滚动方向 $t_i$ 给出驱动的滚动行：

$$
\dot\phi_i = \frac{1}{r} t_i^T v_i
$$

传统车轮的横向方向 $n_i$ 给出无滑移约束：

$$
n_i^T v_i = 0
$$

这些行叠起来后，就是整车层面的运动学矩阵。差分驱动器、omni 车轮和可引导的车轮的差异，主要体现在哪些行被保留、哪些横向约束被放松，以及车轮方向是否随转向角度改变。更完整的有来源支持的推导见 [[WheeledRobotKinematics]]、[[OmnidirectionalWheels]]、[[NonholonomicMobileRobots]] 和 [[SteerableWheels]]。

## 交互图

<div data-wheeled-robot-lab data-default-kind="differential"></div>

## 读图方法

- 蓝绿色箭头表示滚动方向 $t_i$，它进入车轮速度行。
- 红色法向箭头表示横向无滑移方向 $n_i$，它进入约束行。
- 黑色小箭头表示由当前 $V_b$ 诱导出的车轮接触速度 $v_i$。
- 对 omni 车轮，虚线横向方向表示被被动滚轮运动放松的方向，不再作为传统车轮那样的硬无滑移约束。

## 关联

- [[WheeledRobotKinematics]]
- [[WheeledMobileRobotClassification]]
- [[NonholonomicMobileRobots]]
- [[OmnidirectionalWheels]]
- [[SteerableWheels]]
- [[MobileRobotOdometry]]
- [[modern-robotics-chapter-13-wheeled-mobile-robots|Modern Robotics Chapter 13: Wheeled Mobile Robots]]
- [[structural-properties-and-classification-of-wheeled-mobile-robots|Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots]]
