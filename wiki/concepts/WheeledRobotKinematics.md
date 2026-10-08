---
title: "轮式机器人运动学"
type: concept
tags: [robotics, wheeled-robots, mobile-robots, kinematics]
sources: ["[[modern-robotics-chapter-13-wheeled-mobile-robots]]", "[[structural-properties-and-classification-of-wheeled-mobile-robots]]"]
modified: 2026-10-04
topics: ["topics/planning-and-control", "topics/wheeled-robot-modeling"]
---

# 轮式机器人运动学

运动学把轮速与转向角映射到底盘速度；它不回答接触力和执行器能否产生这些运动。以下假设刚性底盘在硬、平、水平地面上滚动，规定的无滑移方向成立。[[modern-robotics-chapter-13-wheeled-mobile-robots|《现代机器人学》第 13 章]]

## 先统一坐标与速度顺序

采用 $q=(\phi,x,y)$，$\phi$ 为朝向，$x,y$ 为底盘参考点世界坐标。底盘坐标中的平面旋量按“角速度、纵向速度、横向速度”排列：

$$
V_b=\begin{bmatrix}\omega\\v_x\\v_y\end{bmatrix}
=\begin{bmatrix}1&0&0\\0&\cos\phi&\sin\phi\\0&-\sin\phi&\cos\phi\end{bmatrix}\dot q.
$$

固定于底盘位置 $(x_i,y_i)$ 的第 $i$ 个轮心，其平面平移速度为

$$
v_i=\begin{bmatrix}v_x-\omega y_i\\v_y+\omega x_i\end{bmatrix}.
$$

这里是**轮心随底盘运动的平移速度**，不是包含轮子自转后的接触材料点总速度；无滑移时后者应满足接触约束。[[modern-robotics-chapter-13-wheeled-mobile-robots|§13.2.1]]

## 每个轮子提供一行几何关系

传统轮的单位滚动方向为 $t_i$，横向为 $n_i$，半径为 $r_i$，自转角速度为 $\dot\theta_i$。在所选正方向下，

$$
t_i^\top v_i=r_i\dot\theta_i,\qquad n_i^\top v_i=0.
$$

第一式决定自转，第二式限制底盘侧移。中心式转向轮让 $t_i,n_i$ 随角度改变；偏置脚轮还引入转向角速度对轮心运动的贡献，不能直接套用固定轮心式。全向轮通过被动滚子允许一个相对运动方向，需要使用相应投影关系。[[structural-properties-and-classification-of-wheeled-mobile-robots|轮式分类论文 §II.B]]

对全向轮系，把轮速关系叠加为

$$
u=H V_b,\qquad u=(\dot\theta_1,\ldots,\dot\theta_m)^\top.
$$

$H\in\mathbb R^{m\times3}$ 由轮位置、驱动方向、滚子方向与半径决定；在《现代机器人学》中记作 $H(0)$，表示用底盘坐标旋量时不再依赖全局朝向。要控制任意平面速度方向，须 $\operatorname{rank}H=3$；传统轮的底盘侧向约束则用 $CV_b=0$，其零空间决定允许速度。[[modern-robotics-chapter-13-wheeled-mobile-robots|§13.2.1]]、[[WheeledMobileRobotClassification|约束秩分类]]

### 手算差速轮系：把坐标变成可检查的式子

**按上述几何重构的例子。** 两轮半径均为 $r$，左轮心为 $(0,d)$、右轮心为 $(0,-d)$，滚动方向均沿底盘 $x$ 轴，正转均指向前方。轮心公式立即给出

$$
r\dot\theta_L=v_x-d\omega,\qquad r\dot\theta_R=v_x+d\omega,\qquad v_y=0.
$$

相加、相减得到 $v_x=r(\dot\theta_L+\dot\theta_R)/2$ 与 $\omega=r(\dot\theta_R-\dot\theta_L)/(2d)$。两个横向约束其实都是 $v_y=0$，并非两个独立约束。令 $r=0.1$ m、$d=0.2$ m，目标 $v_x=0.5$ m/s、$\omega=1$ rad/s，则左右轮分别为 3 和 7 rad/s；要求额外 $v_y=0.1$ m/s 会直接违反假设，增加轮速不能补出这个即时方向。与教材差速模型一致，来源为 [[modern-robotics-chapter-13-wheeled-mobile-robots|§13.3.1.2]]。

## 正向分配与反向估计不能混淆

给定可行底盘速度，轮速命令 $u=HV_b$ 始终直接可算。轮数超过三并不意味着这个方向“没有精确逆”：真正需要伪逆的是从**测得或任意指定的轮速**估计底盘速度，$\hat V_b=H^\dagger u$。如果 $u$ 不在 $H$ 的列空间内，伪逆只给最小二乘拟合，不能消除物理上的轮速冲突。[[modern-robotics-chapter-13-wheeled-mobile-robots|§13.2.1、§13.4]]

**由几何模型得到的实践检查：** 先核对轮序、坐标轴和正转符号，再检查矩阵秩；满秩但条件差时，轮速噪声仍可被放大。轮速上限要求限制目标 $V_b$，实际滑移、惯性和摩擦则需要动力学与接触模型，不能通过伪逆自动补偿。

相关机制见 [[OmnidirectionalWheels|全向轮]]、[[SteerableWheels|可转向轮]]、[[NonholonomicMobileRobots|非完整约束移动机器人]] 与 [[MobileRobotOdometry|移动机器人里程计]]。运动学和接触求解的区别见 [[ContactSolvers|Contact Solvers]]、[[SimulationRealityGap|Sim-to-Real Gap]]。

## 研究归属

[[topics/planning-and-control|规划与控制]] · [[topics/wheeled-robot-modeling|轮式机器人]]。
