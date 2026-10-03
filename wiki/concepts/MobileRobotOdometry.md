---
title: "移动机器人里程计"
type: concept
tags: [robotics, wheeled-robots]
sources: ["[[modern-robotics-chapter-13-wheeled-mobile-robots]]"]
modified: 2026-10-04
topics: ["topics/planning-and-control", "topics/wheeled-robot-modeling"]
---

# 移动机器人里程计

车轮里程计把编码器增量积分成底盘位姿。它测到的是轮子转了多少，再在无滑移假设下推断车体移动；不是直接测量全球位置。以下依据 [[modern-robotics-chapter-13-wheeled-mobile-robots|《现代机器人学》§13.4，式 13.32–13.36]]，明确区分速度与采样区间内的增量。

## 轮角增量先变成积分旋量

采样时间为 $\Delta t$，轮角增量向量为 $\Delta\theta$。对固定几何全向底盘，轮速关系为 $\dot\theta=H V_b$；假设区间内底盘局部速度近似恒定，则

$$
\bar V_b=H^\dagger\frac{\Delta\theta}{\Delta t},\qquad
\chi=\bar V_b\Delta t=H^\dagger\Delta\theta.
$$

$H^\dagger$ 是伪逆，$\bar V_b$ 是平均速度，$\chi=(\psi,\rho_x,\rho_y)^\top$ 是**积分旋量**。$\psi$ 为区间转角，$\rho_x,\rho_y$ 是局部速度积分参数，转弯时不等于实际平移增量。教材把区间时间归一为 1，故沿用速度记号；实现时若省掉这一说明，容易多乘或少除一次采样时间。

差速底盘的轮半径为 $r$，半轮距为 $d$，左右轮正转均定义为向前，则

$$
\psi=\frac{r}{2d}(\Delta\theta_R-\Delta\theta_L),\qquad
\rho_x=\frac r2(\Delta\theta_L+\Delta\theta_R),\qquad \rho_y=0.
$$

汽车式底盘的后轮也可在该几何与无滑移假设下用于这种增量估计；这不意味着它拥有差速底盘的任意原地旋转控制能力。

## 积分旋量不是直接加到位置上

对恒定局部速度，平面刚体指数映射给出在旧底盘坐标系中的真实位移：

$$
\Delta x_b=\frac{\sin\psi}{\psi}\rho_x-\frac{1-\cos\psi}{\psi}\rho_y,\qquad
\Delta y_b=\frac{1-\cos\psi}{\psi}\rho_x+\frac{\sin\psi}{\psi}\rho_y.
$$

$\psi\to0$ 时连续极限为 $(\Delta x_b,\Delta y_b)=(\rho_x,\rho_y)$。用上一时刻朝向 $\phi_k$ 转回世界系：

$$
\begin{bmatrix}x_{k+1}\\y_{k+1}\end{bmatrix}
=\begin{bmatrix}x_k\\y_k\end{bmatrix}
+\begin{bmatrix}\cos\phi_k&-\sin\phi_k\\\sin\phi_k&\cos\phi_k\end{bmatrix}
\begin{bmatrix}\Delta x_b\\\Delta y_b\end{bmatrix},\qquad
\phi_{k+1}=\phi_k+\psi.
$$

这是对教材公式的单位明确化重写。指数映射精确处理**区间恒定局部速度**的弧线，不意味着只有区间总轮角就能恢复任意时变运动。数值实现宜在小转角处使用连续函数或级数，避免直接相除造成消减误差。

### 带单位算一个圆弧，检查时间是否多乘了一次

**教学构造。** 差速底盘 $r=0.1$ m、$d=0.2$ m，在 $\Delta t=0.1$ s 内左右轮分别转过 1、2 rad，则

$$
\chi=(0.25\ \mathrm{rad},\ 0.15\ \mathrm m,\ 0)^\top,\qquad
\bar V_b=(2.5\ \mathrm{rad/s},\ 1.5\ \mathrm{m/s},\ 0)^\top.
$$

指数积分给出 $\Delta x_b=0.15\sin(0.25)/0.25\approx0.14844$ m，$\Delta y_b=0.15[1-\cos(0.25)]/0.25\approx0.01865$ m。尽管瞬时局部横向速度始终为零，转弯后的位移在**旧底盘坐标系**中仍有横向分量；这不违反无侧滑约束。

若相同轮角增量发生在 0.2 s 内，估计速度减半，但 $\chi$ 和最终位移不变。这个检查能发现把 $H^\dagger\Delta\theta$ 当速度后又乘一次 $\Delta t$ 的错误。例子是对 [[modern-robotics-chapter-13-wheeled-mobile-robots|§13.4 积分公式]]的单位演示。

## 误差从哪里来

车轮滑移会让编码器转动与真实位移脱钩；积分会累积这种偏差。教材因此建议用其他位置观测校正或融合里程计，而不单独依赖它维持长期全局定位。[[modern-robotics-chapter-13-wheeled-mobile-robots|§13.4]]

**由模型推得的检查：** 半径、轮距、轮序和正转符号错误会形成系统偏差；冗余轮系的 $H^\dagger$ 只能拟合不一致读数，不能判断所有残差都来自哪一只轮；转向几何在区间内变化时，固定 $H$ 假设需要相应细化。上述因素应与执行器跟踪误差、接触滑移分别检查。

几何基础见 [[WheeledRobotKinematics|轮式运动学]]、[[OmnidirectionalWheels|全向轮]]；可行控制集合见 [[NonholonomicMobileRobots|非完整约束移动机器人]]。运动学估计与物理现实的差异见 [[SimulationRealityGap|仿真—现实差距]]。

## 研究归属

[[topics/planning-and-control|规划与控制]] · [[topics/wheeled-robot-modeling|轮式机器人如何建模与分类]]。
