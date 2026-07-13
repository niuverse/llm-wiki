---
title: "轮式机器人运动学"
type: concept
tags: [robotics, wheeled-robots, mobile-robots, kinematics]
sources: ["[[modern-robotics-chapter-13-wheeled-mobile-robots]]", "[[structural-properties-and-classification-of-wheeled-mobile-robots]]"]
last_updated: 2026-07-13
---

# 轮式机器人运动学

轮式机器人运动学（轮式机器人运动学）描述车轮速度、转向角度和底盘速度之间的几何关系。[[modern-robotics-chapter-13-wheeled-mobile-robots|Modern 机器人学章节 13]] 把这个问题作为入门主线：先忽略动力学，假设硬平坦地面上滚动不含 skidding。[[structural-properties-and-classification-of-wheeled-mobile-robots|Campion et al.]] 则给出更一般的结构性的视角：不同车轮约束通过矩阵秩和零空间决定机器人机动性。

## 数学结构

底盘在平面中的配置写成：

$$
q=(\phi,x,y)
$$

其中 $\phi$ 是底盘 heading，$x,y$ 是底盘参考点在世界帧中的位置。底盘速度既可以写成 $\dot q=(\dot\phi,\dot x,\dot y)$，也可以写成底盘帧中的刚体旋量：

$$
V_b =
\begin{bmatrix}
\omega_{bz}\\
v_{bx}\\
v_{by}
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0\\
0 & \cos\phi & \sin\phi\\
0 & -\sin\phi & \cos\phi
\end{bmatrix}
\begin{bmatrix}
\dot\phi\\
\dot x\\
\dot y
\end{bmatrix}
$$

对第 $i$ 个轮子，若其接触点在刚体帧中为 $(x_i,y_i)$，则接触点的平面速度为：

$$
v_i =
\begin{bmatrix}
v_{bx}-\omega_{bz}y_i\\
v_{by}+\omega_{bz}x_i
\end{bmatrix}
$$

普通传统车轮可以近似成一个滚动方向 $t_i$ 与横向方向 $n_i$：

$$
t_i^T v_i = r_i \dot\theta_i,\qquad n_i^T v_i = 0
$$

其中 $r_i$ 是车轮半径，$\dot\theta_i$ 是车轮角速度。第一条约束给出车轮 spin 速度；第二条是横向无滑移约束。全向轮和 mecanum 车轮通过 rollers 释放某个方向的相对运动，因此只保留一个无滑移方向，并把车轮速度写成底盘旋量的线性投影。

对 properly constructed 全向机器人，车轮速度与刚体旋量的关系是：

$$
u = H(0)V_b
$$

其中 $u\in\mathbb{R}^m$ 是 $m$ 个车轮驱动速度，$H(0)\in\mathbb{R}^{m\times 3}$ 由车轮位置、驱动方向和滚轮/free-滑动方向决定。若 $H(0)$ 秩为 3，底盘可以在平面内生成任意 $V_b$。

## 直觉

每个轮子都不是简单地“提供一个 motor”，而是在底盘旋量空间中添加投影或约束。一个传统固定车轮会禁止横向滑移；一个 omni/mecanum 车轮会允许某个被动方向的运动，但仍要求 motor 方向与接触速度匹配；一个 steerable 车轮让约束方向随转向角度改变。

因此轮式基座的能力不是由 motor 数量单独决定，而是由车轮几何矩阵的秩、零空间、条件化和执行器限制决定。对 over-actuated bases，$u=H(0)V_b$ 可能没有精确逆，里程计和控制分配需要 pseudo-逆或 constrained 优化。

```mermaid
flowchart LR
  A["车轮几何<br/>位置, heading, 滚轮角度"] --> B["constraint / projection row"]
  B --> C["矩阵 H 或 C"]
  C --> D["秩与零空间"]
  D --> E["机动性与可行底盘 twists"]
  E --> F["控制分配与里程计"]
```

## 失效情形

- 秩 deficiency：车轮布局看似对称，但 $H(0)$ 秩不足，无法生成全部平面旋量。
- 粗劣的条件化：秩为 3 但条件数值很差，车轮速度噪声会被放大成里程计或控制错误。
- 饱和不匹配：pseudo-逆输出可行速度，但某些车轮速度超出 motor 限制，需要统一缩放或重新优化。
- No-滑移假设失败：加速、转弯、低摩擦地面或载荷偏置会破坏滚动不含 skidding。
- 接触层级不匹配：运动学 equations 不包含法向负载、Coulomb 摩擦、柔顺性和 [[ContactSolvers|接触求解器]] 残差；这些会进入 [[SimulationRealityGap]]。

## 实践含义

建模顺序应先写清楚帧约定和车轮 sign 约定，再推导 $H(0)$ 或约束矩阵。不要从网上直接复制 mecanum 或 omni 公式；轮序、坐标系、滚轮角度和正方向一变，矩阵符号就会变。

仿真中可以分三层：运动学控制器层验证 $u\leftrightarrow V_b$；物理关节层加入质量、惯量、执行器限制；接触层再处理摩擦、滑移、滚轮几何和求解器场景。相关页面：[[OmnidirectionalWheels]]、[[NonholonomicMobileRobots]]、[[SteerableWheels]]、[[MobileRobotOdometry]]、[[WheeledMobileRobotClassification]]。
