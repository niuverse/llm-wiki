---
title: "非完整约束移动机器人"
type: concept
tags: [robotics, wheeled-robots, nonholonomic-systems, controllability]
sources: ["[[modern-robotics-chapter-13-wheeled-mobile-robots]]", "[[structural-properties-and-classification-of-wheeled-mobile-robots]]"]
last_updated: 2026-07-13
---

# 非完整约束移动机器人

非完整约束移动机器人不能直接执行某些瞬时速度，例如类汽车机器人不能直接侧移；但这些速度约束不能积分成配置约束，所以机器人仍可能通过组合机动到达任意平面位姿。[[modern-robotics-chapter-13-wheeled-mobile-robots|《现代机器人学》第 13 章]] 用规范模型、Pfaffian 约束和李括号解释这一点；[[structural-properties-and-classification-of-wheeled-mobile-robots|Campion 等人]] 用 $\delta_m,\delta_s$ 对机动性受限的 WMR 做结构化分类。

## 数学结构

典型非完整约束底盘配置为：

$$
q=(\phi,x,y)
$$

规范 simplified 模型写成：

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

其中 $v$ 是正向速度，$\omega$ 是偏航角比率。该模型隐含一个横向 Pfaffian 约束：

$$
A(q)\dot q =
\begin{bmatrix}
0 & \sin\phi & -\cos\phi
\end{bmatrix}
\dot q
=
\dot x\sin\phi-\dot y\cos\phi=0
$$

这个约束禁止刚体横向速度，但不禁止配置层级横向 displacement。李括号说明了原因。若

$$
g_1(q)=(0,\cos\phi,\sin\phi)^T,\qquad g_2(q)=(1,0,0)^T
$$

则

$$
[g_1,g_2](q)=(0,\sin\phi,-\cos\phi)^T
$$

这个 bracket 方向是横向运动。实际执行时，它来自正向/backward 与旋转 motions 的交替组合，位移量是二阶小量。

## 直觉

非完整约束是速度层级限制，不是位置层级的“墙”。车辆不能瞬间横移，但可以通过前后移动与转向完成侧方停车。代价是速度方向受限、局部机动需要时间，并且某些稳定化与控制问题比全向基座更难。

Modern 机器人学的关键对比是：unicycle、diff-驱动和类汽车机器人可以共享同一个规范模型，但控制设置 $U$ 不同。Diff-驱动可以原地旋转；类汽车机器人受最小转弯半径限制；只能前进的 car 没有倒车方向，因此小时间可控性比有倒车档的 car 更弱。

## 失效情形

- 控制器不匹配：用全向单积分器控制器直接控制完整底盘位姿会违反非完整约束。
- 稳定化 trap：规范非完整约束机器人不能被连续时间-invariant 状态 feedback 稳定到原点；需要轨迹跟踪、随时间变化的 feedback 或混合/discontinuous 策略。
- 规划 simplification 错误：把类汽车机器人当作完整约束 disc 会生成不可执行路径，尤其在窄通道或障碍物附近。
- 滑移隐藏的 in 模型：skid-steer、履带式车辆和高加速度 diff-驱动会依赖或产生横向滑移，不属于纯无滑移非完整约束模型。
- 里程计 optimism：车轮编码器集成假设滚动不含 slipping；转向、打滑和脚轮 transient 会破坏该假设。

## 实践含义

路径规划应使用满足车辆约束的基元，例如 Dubins、Reeds-Shepp、lattice 或 kinodynamic 规划。轨迹跟踪可以在可行参考基准轨迹周围做 feedback，而不是要求机器人直接执行任意位姿错误 vector。

与 [[WheeledMobileRobotClassification]] 连接时，非完整约束机器人覆盖 Campion 分类体系中 $\delta_m<3$ 的 limited-机动性类型。与 [[SimulationRealityGap]] 连接时，关键是区分“真实非完整约束无滑移约束”和“仿真/硬件中的滑移近似”。
