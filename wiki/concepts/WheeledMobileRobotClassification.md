---
title: "轮式移动机器人分类"
type: concept
tags: [robotics, wheeled-robots, nonholonomic-systems]
sources: ["[[structural-properties-and-classification-of-wheeled-mobile-robots]]", "[[modern-robotics-chapter-13-wheeled-mobile-robots]]"]
modified: 2026-10-04
topics: ["topics/planning-and-control", "topics/wheeled-robot-modeling"]
---

# 轮式移动机器人分类

分类应回答两个问题：**当前轮角下，底盘能立即沿几个独立方向运动；调整轮角后，又能改变哪些方向？** Campion 等人的机动度与可转向度把这两件事分开。分类适用于刚性底盘、平面运动、理想车轮和规定的无滑移约束。[[structural-properties-and-classification-of-wheeled-mobile-robots|轮式机器人结构分类论文]]

## 用约束矩阵计算

设 $\xi=(x,y,\theta)^\top$ 为世界坐标中的底盘位姿，$R(\theta)$ 把其速度转到底盘坐标；$C_{1f}$ 和 $C_{1c}(\beta_c)$ 分别叠加固定轮、中心式转向轮的侧向约束，$\beta_c$ 为转向角。允许速度满足

$$
C_1^*(\beta_c)R(\theta)\dot\xi=0,\qquad
C_1^*=\begin{bmatrix}C_{1f}\\C_{1c}\end{bmatrix}.
$$

机动度、可转向度与操纵度为

$$
\delta_m=3-\operatorname{rank}C_1^*,\qquad
\delta_s=\operatorname{rank}C_{1c},\qquad
\delta_M=\delta_m+\delta_s.
$$

$\delta_m$ 是不调整中心转向角时的即时速度自由度；$\delta_s$ 是保持轮系兼容时的独立中心转向自由度，不是转向电机数量。偏置脚轮可通过自身角速度满足侧向约束，不能直接作为中心转向轮计入 $C_{1c}$。[[structural-properties-and-classification-of-wheeled-mobile-robots|原文 §II.C、§IV.B]]

### 为什么数轮子不如算独立约束

**教学计算。** 用 $v_b=(v_x,v_y,\omega)^\top$ 排列速度。共轴的两固定轮都沿前方滚动，轮心位于 $(0,\pm d)$；两行侧向约束均为 $[0,1,0]$，故矩阵秩为 1，$\delta_m=2$，没有中心转向则 $\delta_s=0$。同一轴上再加一个同向轮，只增加重复方程，不降低机动度。

若在 $(L,0)$ 加一个转向轮，滚动方向与 $x$ 轴夹角为 $\beta$，其侧向行是 $[-\sin\beta,\cos\beta,L\cos\beta]$。在非退化配置中它与后轴约束独立，秩升为 2，$\delta_m=1$、$\delta_s=1$，成为汽车／三轮车式。其允许速度满足 $v_y=0$ 和 $-v_x\sin\beta+L\omega\cos\beta=0$；当 $\cos\beta\ne0$ 时得到熟悉的 $\omega=v_x\tan\beta/L$。这是从 [[structural-properties-and-classification-of-wheeled-mobile-robots|论文的约束分类]]用直角坐标重构的例子；这里的 $\beta$ 采用滚动方向角，不沿用论文极坐标轮角的原点。

## 五类及其适用条件

| 类型 | 即时运动与转向的关系 | 典型结构 |
| --- | --- | --- |
| $(3,0)$ | 三个平面速度方向直接可用 | 合理布局的全向轮，或适当驱动的偏置脚轮 |
| $(2,0)$ | 两个即时速度方向，无中心转向 | 共轴固定驱动轮与支撑脚轮 |
| $(2,1)$ | 两个即时方向随一个转向角改变 | 一个中心转向轮与偏置脚轮 |
| $(1,1)$ | 一个即时方向，通过一个角度改变 | 汽车式或三轮车式 |
| $(1,2)$ | 一个即时方向，通过两个独立轮角改变 | 无固定轮，至少两个中心转向轮 |

该表只在非退化条件下穷尽：$\operatorname{rank}C_{1f}\le1$，固定轮与中心转向轮的约束秩可加，总秩不超过 2。多个固定轮应共轴；轮系锁死、只能围绕固定中心转动等退化结构被排除。额外中心转向轮必须协调轮角，使共同瞬时转动中心存在；平移可理解为转动中心在无穷远。[[structural-properties-and-classification-of-wheeled-mobile-robots|原文 §II.C–III]]

$(3,0)$、$(2,1)$、$(1,2)$ 都有 $\delta_M=3$，却不能视作相同能力：后两类要花时间调整轮角。另一方面，理论机动度也不保证实际电机足以驱动全部方向，还须检验力矩映射在考虑的配置域内保持满秩。[[structural-properties-and-classification-of-wheeled-mobile-robots|原文 §IV.B、§VI.B]]

## 分类之后还需要选模型

底盘位姿运动学用于路径与可达性；完整配置运动学还记录车轮转角；动力学再加入质量、惯性和力矩。底盘位姿可控不意味着每个轮子的累计转角都能独立指定，全向底盘的完整配置仍可能有非完整约束。[[structural-properties-and-classification-of-wheeled-mobile-robots|原文 §IV–VI]]

工程使用时先检验接触假设与矩阵秩，再判断现代转向模块属于哪类；滑移转向、履带和轮胎变形不能只按外形映射。几何推导见 [[WheeledRobotKinematics|轮式机器人运动学]]；区别见 [[SteerableWheels|可转向轮]]、[[OmnidirectionalWheels|全向轮]] 和 [[NonholonomicMobileRobots|非完整约束移动机器人]]。[[modern-robotics-chapter-13-wheeled-mobile-robots|《现代机器人学》第 13 章]] 提供较简明的底盘模型入口。

## 研究归属

[[topics/planning-and-control|规划与控制]] · [[topics/wheeled-robot-modeling|轮式机器人]]。
