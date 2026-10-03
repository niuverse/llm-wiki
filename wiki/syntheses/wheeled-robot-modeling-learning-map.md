---
title: "轮式机器人建模学习地图"
type: synthesis
tags: [learn, robotics, wheeled-robots, simulation]
sources: ["[[modern-robotics-chapter-13-wheeled-mobile-robots]]", "[[structural-properties-and-classification-of-wheeled-mobile-robots]]", "[[contact-models-in-robotics-a-comparative-analysis]]"]
modified: 2026-10-04
topics: ["topics/planning-and-control", "topics/wheeled-robot-modeling"]
---

# 轮式机器人建模学习地图

这条学习路线从车轮约束走到控制分配、里程计与物理仿真。基础证据是 [[modern-robotics-chapter-13-wheeled-mobile-robots|《现代机器人学》第 13 章]] 与 [[structural-properties-and-classification-of-wheeled-mobile-robots|Campion 等人的分类论文]]；后者原作发表于 1996 年，本库实际全文是 2011 年俄文译本。跨方法判断和补证队列集中在 [[topics/wheeled-robot-modeling|轮式机器人建模专题]]，本页保留学习顺序和练习。

## 先明确模型的假设

起点是刚性底盘、硬平水平地面和规定方向上的无滑移滚动。此时运动学回答轮速与底盘速度的几何关系；动力学另问质量、执行器与接触力能否实现运动。教材明确不把履带与滑移转向纳入这套无滑移模型；Campion 的五类结论还需要非退化轮系假设。[[modern-robotics-chapter-13-wheeled-mobile-robots|章首与 §13.1]]、[[structural-properties-and-classification-of-wheeled-mobile-robots|§II]]

```mermaid
flowchart LR
  A[坐标与平面刚体速度] --> B[单轮滚动和横向约束]
  B --> C[矩阵秩与可行速度]
  C --> D[轮速分配和限制]
  C --> E[非完整性与转向状态]
  D --> F[编码器增量与里程计]
  E --> F
  F --> G[动力学与接触验证]
```

图中的学习顺序让每层都有独立检查对象：先检查几何与单位，再判断哪些误差需要进入接触或动力学层。

## 第一段：从一个轮子到整车约束

先读 [[WheeledRobotKinematics|轮式机器人运动学]]，统一 $V_b=(\omega,v_x,v_y)^\top$ 的顺序。$\omega$ 为偏航角速度，$v_x,v_y$ 为底盘局部线速度。固定轮心在底盘中的位置为 $(x_i,y_i)$，其随底盘的平移速度是

$$
v_i=\begin{bmatrix}v_x-\omega y_i\\v_y+\omega x_i\end{bmatrix}.
$$

这不是包含轮子自转后的接触材料点总速度。对固定或中心式转向传统轮，滚动方向 $t_i$、横向方向 $n_i$、半径 $r_i$ 与自转角速度 $\dot\theta_i$ 满足

$$
t_i^\top v_i=r_i\dot\theta_i,\qquad n_i^\top v_i=0.
$$

偏置脚轮还包含转向运动对轮心速度的贡献；全向轮则使用滚子允许方向对应的投影。具体推导分别见 [[SteerableWheels|可转向轮]] 和 [[OmnidirectionalWheels|全向轮]]。

**先算一遍，再变化条件。** 沿 [[WheeledRobotKinematics#手算差速轮系：把坐标变成可检查的式子|差速轮系数值例子]]核算左右轮 3、7 rad/s，再将偏航角速度变为零或变号。随后分别输入纯前进、纯侧移、纯旋转，逐轮检查横向约束。发现约束不成立时，先判定指令不可行；伪逆不能把不可行运动变成无滑移运动。

## 第二段：区分即时机动、转向与长期可达

读 [[WheeledMobileRobotClassification|轮式移动机器人分类]]。固定轮和中心转向轮的侧向约束叠成 $C_1^*$，中心转向部分为 $C_{1c}$，则

$$
\delta_m=3-\operatorname{rank}C_1^*,\qquad
\delta_s=\operatorname{rank}C_{1c},\qquad
\delta_M=\delta_m+\delta_s.
$$

$\delta_m$ 是当前轮角下的即时速度自由度，$\delta_s$ 是满足轮系兼容性的独立中心转向自由度。它们都不等于驱动或转向电机数量。五类 $(3,0),(2,0),(2,1),(1,1),(1,2)$ 的条件、示例与电机满秩要求留在概念和 [[structural-properties-and-classification-of-wheeled-mobile-robots|论文页]]。

再读 [[NonholonomicMobileRobots|非完整约束移动机器人]]：不能瞬间侧移仍可能通过多段机动到达侧向位置；能否倒车、转向限位和障碍物会改变可达条件。$(1,2)$ 即使操纵度为 3，也需要时间调整轮角。另一方面，$(3,0)$ 的底盘即时全向，不表示包含车轮自转角的完整配置没有非完整约束。

**学习练习。** 先做 [[WheeledMobileRobotClassification#为什么数轮子不如算独立约束|从共轴两轮到三轮车的秩计算]]，再用 [[NonholonomicMobileRobots#把 Lie 括号还原成四段动作|四段机动]]理解长期可达性。对差速、汽车式和两中心转向轮构型，分别写“固定当前轮角的速度空间”和“允许调整轮角后的路径”；明确哪些控制动作确实允许。

## 第三段：轮速分配与反向估计

对固定几何的全向轮系，驱动角速度向量 $u$ 与底盘速度满足

$$
u=H V_b,
$$

$H$ 包含轮位置、半径、驱动与滚子方向。满秩 $\operatorname{rank}H=3$ 表示三个底盘速度方向可控。给定 $V_b$，轮速命令由矩阵乘法直接得到；从测得轮速反推底盘速度才使用 $\hat V_b=H^\dagger u$。对于冗余轮系，任意轮速向量可能不相容，伪逆只给拟合结果。[[modern-robotics-chapter-13-wheeled-mobile-robots|§13.2.1、§13.4]]

轮速上限 $|h_iV_b|\le u_{i,\max}$ 给出可行旋量域，$h_i$ 为第 $i$ 行。**练习建议：** 比较统一缩放一致轮速与逐轮独立截断后的残差，检查后者是否仍属于 $H$ 的列空间。

中心式转向模块不能直接视作同一个固定 $H$ 的全向底盘。理想轮心速度可以用于选择目标滚动方向，但当前轮角、转向速率和共同瞬时转动中心仍须满足约束。现代模块实现的角度选支、零位与饱和细节见 [[SteerableWheels|可转向轮中的实现检查]]；本库当前没有足够专用来源给出所有模块的通用性能排序。

## 第四段：编码器增量怎样变成位姿

读 [[MobileRobotOdometry|移动机器人里程计]]。采样间隔为 $\Delta t$，轮角增量为 $\Delta\theta$，在区间速度近似恒定时，

$$
\bar V_b=H^\dagger\frac{\Delta\theta}{\Delta t},\qquad
\chi=\bar V_b\Delta t=H^\dagger\Delta\theta.
$$

$\bar V_b$ 是速度，$\chi$ 是积分旋量；两者单位不同。转弯时积分旋量的线性部分也不等于实际局部平移，应经平面刚体指数映射，再用旧朝向转入世界坐标。教材归一化时间为 1 的写法不能脱离说明直接复制到真实采样循环。[[modern-robotics-chapter-13-wheeled-mobile-robots|§13.4]]

**学习练习。** 复算 [[MobileRobotOdometry#带单位算一个圆弧，检查时间是否多乘了一次|0.1 s 内左右轮转过 1、2 rad 的例子]]，再把采样间隔改为 0.2 s：速度应减半，位移不变。分别验证直线、圆弧与小转角极限，确认没有多乘一次时间，也没有用新朝向替代旧朝向做坐标变换。

## 第五段：何时需要动力学与接触

理想运动学没有检查法向支持、摩擦或可用力矩。接触定律、摩擦约束与数值求解相互影响，应该分别查看 [[ContactModelsInRobotics|机器人学中的接触模型]]、[[ContactComplementarity|接触互补]]、[[ContactSolvers|接触求解器]] 与 [[SimulationRealityGap|仿真—现实差距]]，不能把“仿真中能侧移”当作模型正确的充分条件。

**以下是分层验证建议，不是已验证的统一仿真方案：** 先以几何模型检查可行命令和单位，再加入关节、惯量与执行器限制，最后按目标任务检查接触力、滑移和里程计偏差。是否需要显式滚子、轮胎变形或某种摩擦近似，要依据相应来源和真实测量决定；不预先断言哪种轮型牵引更强、效率更高或高速更稳定。

## 复习时应能回答

- 为什么轮心平移速度与接触材料点速度不同？
- 为什么轮数多于三时，给定底盘速度仍能直接算轮速，但任意轮速可能不对应无滑移运动？
- 为什么操纵度为 3 不一定能瞬时侧移，全向底盘的完整配置又仍可能非完整？
- 为什么 $H^\dagger\Delta\theta$ 不是带真实时间单位的速度？
- 轨迹不匹配来自几何标定、执行器跟踪、积分假设还是接触滑移，应怎样分别检查？

后续研究问题与优先补证统一维护在 [[topics/wheeled-robot-modeling#未解问题与优先补证|专题的未解问题与优先补证]]；本学习页不另设资料队列。

## 研究归属

[[topics/planning-and-control|规划与控制]] · [[topics/wheeled-robot-modeling|轮式机器人如何建模与分类]]。
