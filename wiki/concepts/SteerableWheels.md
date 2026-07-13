---
title: "可转向轮"
type: concept
tags: [robotics, wheeled-robots, steerable-wheels, swerve, caster]
sources: ["[[structural-properties-and-classification-of-wheeled-mobile-robots]]", "[[modern-robotics-chapter-13-wheeled-mobile-robots]]"]
last_updated: 2026-07-13
---

# 可转向轮

可转向轮（舵轮）是车轮平面姿态可以相对底盘改变的传统车轮。[[structural-properties-and-classification-of-wheeled-mobile-robots|Campion 等人]]区分中心式可转向轮与偏心式可转向轮/脚轮，并用 $\delta_s$ 度量独立转向自由度对操纵能力的贡献。[[modern-robotics-chapter-13-wheeled-mobile-robots|《现代机器人学》第 13 章]]中的类汽车/Ackermann 模型和可转向轮练习提供了更入门的几何直觉。

## 数学结构

对传统车轮，滚动方向与横向无滑移方向随转向角度 $\beta_i$ 改变。若车轮 center 在刚体帧中为 $(x_i,y_i)$，接触点速度为：

$$
v_i =
\begin{bmatrix}
v_{bx}-\omega_{bz}y_i\\
v_{by}+\omega_{bz}x_i
\end{bmatrix}
$$

车轮滚动方向 $t_i(\beta_i)$ 和横向方向 $n_i(\beta_i)$ 给出：

$$
t_i(\beta_i)^T v_i = r_i\dot\theta_i
$$

$$
n_i(\beta_i)^T v_i = 0
$$

中心化的 steerable 车轮的转向轴通过车轮 center，因此转向主要改变无滑移方向。Off-中心化的 steerable/脚轮车轮的转向轴不通过车轮 center，约束中会出现转向比率 $\dot\beta_i$ 与偏移长度 $d_i$ 的耦合；这会让脚轮 transient 进入底盘运动与里程计错误。

Campion 的结构性的角色可以概括为：

$$
\delta_s=\operatorname{rank}C_{1c}(\beta_c)
$$

其中 $C_{1c}$ 是中心化的 steerable 车轮对横向无滑移约束的贡献。$\delta_s$ 不是“有几个舵轮”，而是有多少独立转向方向真正改变机器人机动性结构。

## 直觉

Steerable 车轮的优势是 traction 好：它仍是传统车轮，不依赖 omni/mecanum 滚轮释放侧向运动。但全向能力不是瞬时 free lunch。要朝某个方向运动，车轮模块需要先对准对应滚动方向；转向执行器的速度、角度 wrap、零位误差和同步误差都会进入控制。

类汽车 Ackermann 转向是一种受约束的 steerable 车轮布局：前轮转向角度被机械关系协调，让所有车轮轴指向同一个 center 的旋转。Swerve-风格模块则让每个车轮模块有独立转向与驱动 DOF；它更接近 $\delta_s$ 较高的 steerable-车轮系统，但具体归类需要根据模块约束与 coordination 策略推导。

## 失效情形

- 转向奇异位形：期望车轮接触速度很小，$\operatorname{atan2}$ 给出的转向角度对噪声敏感。
- 角度 wrap 与驱动 reversal：同一车轮速度可由 $\beta_i,\dot\theta_i$ 或 $\beta_i+\pi,-\dot\theta_i$ 实现；控制器必须选择更平滑的一支。
- 转向比率限制：运动学逆 solution 假设转向角度可瞬时改变，真实执行器会滞后。
- 模块 disagreement：多个 steerable 车轮若没有对准同一可行 instant center 的旋转，会产生轮胎 scrub 或接触 conflict。
- 脚轮 transient：off-中心化的脚轮的 $\dot\beta$ 与偏移 $d$ 会引入 transient 力和里程计错误。
- 分类体系不匹配：现代 swerve 驱动的软件控制、模块动力学和车轮滑移需要实现文档与硬件数据补充，Campion 分类体系只给出结构性的层。

## 实践含义

建模时先区分中心化的 steerable 车轮、off-中心化的脚轮和 independently 驱动的 swerve 模块。运动学分配可以先按期望接触点速度求转向角度与驱动速度；工程控制必须再加转向比率限制、车轮速度饱和、角度 wrapping、模块标定和滑移检测。

仿真时，steerable 车轮比 mecanum/omni 更需要正确的关节层级：转向关节、驱动关节、车轮碰撞、摩擦 anisotropy 和执行器限制都会影响行为。相关页面：[[WheeledMobileRobotClassification]]、[[WheeledRobotKinematics]]、[[MobileRobotOdometry]]、[[SimulationRealityGap]]。
