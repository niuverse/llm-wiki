---
title: "非完整约束移动机器人"
type: concept
tags: [robotics, wheeled-robots, nonholonomic-systems]
sources: ["[[modern-robotics-chapter-13-wheeled-mobile-robots]]", "[[structural-properties-and-classification-of-wheeled-mobile-robots]]"]
modified: 2026-10-04
topics: ["topics/planning-and-control", "topics/wheeled-robot-modeling"]
---

# 非完整约束移动机器人

非完整约束限制某些瞬时速度，却不能等价写成只含配置的位置约束。例如车不能立即侧移，仍可能通过前进、倒退与转弯完成侧方停车。可达性还取决于允许的控制集合，不能只看状态方程。[[modern-robotics-chapter-13-wheeled-mobile-robots|《现代机器人学》§13.3]]

## 速度受限为何仍能改变横向位置

设平面位姿 $q=(\phi,x,y)$，输入为纵向速度 $v$ 与偏航角速度 $\omega$。简化模型为

$$
\dot q=g_1(q)v+g_2(q)\omega,
\quad g_1=(0,\cos\phi,\sin\phi)^\top,
\quad g_2=(1,0,0)^\top.
$$

横向无滑移约束是

$$
\dot x\sin\phi-\dot y\cos\phi=0.
$$

采用 $[g_1,g_2]=Dg_2\,g_1-Dg_1\,g_2$ 的约定，有

$$
[g_1,g_2]=(0,\sin\phi,-\cos\phi)^\top.
$$

这个方向是底盘横向。短时间交替执行两个非交换运动及其逆运动，会产生沿括号方向的二阶净位移；它不是可以立刻输入的第三个速度通道。原始两个向量与括号张成三维切空间，解释了允许双向输入且无障碍时的局部可达性。[[modern-robotics-chapter-13-wheeled-mobile-robots|§13.3 的规范模型与 Lie 括号]]

### 把 Lie 括号还原成四段动作

**教学构造。** 初始朝向为零，先向前走距离 $\ell$，再原地左转 $\alpha$，沿新方向后退同样距离 $\ell$，最后右转回原朝向。差速底盘在允许倒车和原地转向时能够执行这四段，最终位移为

$$
\Delta x=\ell(1-\cos\alpha),\qquad \Delta y=-\ell\sin\alpha,\qquad\Delta\phi=0.
$$

若 $\ell=v\varepsilon$、$\alpha=\omega\varepsilon$，小量展开给出 $\Delta y\approx-v\omega\varepsilon^2$，而 $\Delta x=O(\varepsilon^3)$：横向位移是两个控制相互作用的二阶效果。取 $\ell=0.1$ m、$\alpha=0.1$ rad，净位移约为 $(0.00050,-0.00998)$ m。执行过程中每一段都满足横向无滑移，故并未引入一个“侧移速度输入”。此构造用于解释 [[modern-robotics-chapter-13-wheeled-mobile-robots|§13.3.2 的非交换运动]]，不适用于不能原地旋转的汽车控制集合。

## 方程相似，控制限制可以不同

差速底盘允许通过左右轮反转原地旋转；汽车式底盘有转向几何和最小转弯半径，不能把 $v,\omega$ 当作任意独立输入。只许前进又会进一步改变小时间可控性。若显式保留转向角状态，它还须满足自己的角速度约束。[[modern-robotics-chapter-13-wheeled-mobile-robots|§13.3]]、[[structural-properties-and-classification-of-wheeled-mobile-robots|轮式分类论文 §IV]]

**可控也不等于容易稳定。** 在论文理想模型条件下，有限机动性底盘的位姿可控，但静止点线性化不完全可控；连续、静态、时不变状态反馈不能将它渐近稳定到孤立静止目标。时变反馈等不同控制类别不受这个特定不可能性结论直接排除。不能简写成“非完整机器人无法稳定”。[[structural-properties-and-classification-of-wheeled-mobile-robots|性质 2–5]]

## 状态选取也改变完整性判断

在 [[WheeledMobileRobotClassification|五类底盘]] 中，$\delta_m<3$ 表示底盘即时速度受限。但不能反过来说 $\delta_m=3$ 时整台机器人没有非完整性：若状态包含轮子的累计自转角，全向底盘的完整配置仍可能有非完整滚动约束。底盘位姿和完整配置必须分别讨论。[[structural-properties-and-classification-of-wheeled-mobile-robots|§V，性质 6]]

**实践含义。** 规划与跟踪应满足实际允许速度、转向限位和是否可倒车；无滑移模型没有证明障碍物环境下任意目标可达。滑移转向与履带依赖不同接触假设，不能用侧向约束简单覆盖。车轮估计误差见 [[MobileRobotOdometry|里程计]]，动力学偏差见 [[SimulationRealityGap|Sim-to-Real Gap]]。

## 研究归属

[[topics/planning-and-control|规划与控制]] · [[topics/wheeled-robot-modeling|轮式机器人]]。
