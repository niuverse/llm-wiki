---
title: "机器人接触模型"
type: concept
tags: [robotics, simulation, contact-dynamics]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]"]
modified: 2026-10-04
topics: ["topics/physics-simulation", "topics/contact-modeling"]
---

# 机器人接触模型

接触模型把接触几何和运动转成力、冲量与能量耗散规则。[[contact-models-in-robotics-a-comparative-analysis|接触模型比较论文]] 的核心提醒是：模型近似和求解误差会进入机器人控制，不能只把它们当作速度优化。

## 数学结构

$q$ 为广义位置，$v$ 为广义速度，$g_n(q)$ 为法向间隙，$J$ 为接触雅可比矩阵，$\mu$ 为摩擦系数。刚性参考模型同时要求单边接触、库仑摩擦和最大耗散：

$$
0\le g_n(q)\perp\lambda_n\ge0,\qquad
\|\boldsymbol\lambda_t\|_2\le\mu\lambda_n.
$$

$\lambda_n$ 与 $\boldsymbol\lambda_t$ 分别为法向力和切向力。最大耗散在摩擦可行集合中约束滑动时的力方向；实际时间步进常改用冲量与速度条件。定义、量纲与例子见 [[ContactComplementarity|Contact Complementarity]]，接触耦合见 [[ContactSolvers|Contact Solvers]]。

## 接触处理流程

```mermaid
flowchart LR
  A[几何与当前状态] --> B[碰撞检测：接触点、法向、间隙]
  B --> C[接触定律：单边约束、摩擦、耗散]
  C --> D[数学表述：NCP、LCP、CCP 等]
  D --> E[数值求解：PGS、ADMM 等]
  E --> F[力或冲量与状态积分]
  E --> G[残差与耗时诊断]
```

图中的三层不能混为一谈：碰撞检测决定接触输入；模型决定期望满足的规律；求解器决定怎样逼近解。残差用于诊断，不意味着每次时间步都会自动改换模型。[[CollisionGeometryForRobotSimulation|机器人仿真的碰撞几何]]、[[contact-models-in-robotics-a-comparative-analysis|接触模型比较论文]]

## 直觉

| 层次 | 应问的问题 | 例子 |
| --- | --- | --- |
| 几何 | 哪些表面可以接触？ | 单一凸包可能填满把手孔洞 |
| 接触模型 | 允许怎样的力和滑动？ | LCP 离散摩擦方向；CCP 放松互补 |
| 求解算法 | 给定预算能把误差降到多少？ | PGS 顺序更新；近端方法使用整体结构 |

前一层的错误不能总靠后一层修好。把手孔洞被碰撞体填满时，增加求解迭代不会恢复孔洞。这个因果解释结合了 [[CollisionGeometryForRobotSimulation|碰撞体机制]] 与 [[contact-models-in-robotics-a-comparative-analysis|模型比较]]；它是跨来源综合，而非单个实验结论。

### 用同一个滑动盒子区分模型与算法

设盒子持续横向滑动。理想库仑模型的切向力应反向于速度；多面体摩擦近似会把可选方向限制在离散结构中，CCP 则可能允许支撑力与法向分离速度并存。即使这两个近似各自被精确求解，所得运动也可不同；这是模型差异。固定其中一个表述，再把求解迭代从少增多，观察残差和力是否趋稳，才是在检查算法误差。

这一思想实验依据 [[contact-models-in-robotics-a-comparative-analysis|比较论文第 II–IV 节]]，帮助读者设计比较顺序：先写清目标接触规律，再核对求解器是否足够逼近该规律，最后检验规律本身是否适合材料与任务。它不预设哪种近似在所有任务中最合适。

## 失效情形

比较论文支持的风险包括多面体摩擦锥的方向偏差、互补松弛产生的非物理法向力、启发式接触状态处理的偏差，以及困难接触系统中的收敛和内部力问题。其四足控制基准中，崎岖或湿滑条件会比温和条件更明显地暴露差异。不能据此推出一个求解器在所有机器人任务中始终最好。[[contact-models-in-robotics-a-comparative-analysis|接触模型比较论文]]

## 证据边界

[[contact-models-in-robotics-a-comparative-analysis|比较论文]] 在 ContactBench 中固定动力学和碰撞检测，比较不同接触模型与算法的重实现。文中的 RaiSim、Drake 等结果不能直接当作当前完整产品的排名；其中部分线搜索和实现与原引擎不同。它验证了接触选择会改变仿真中的控制行为，但没有以真实硬件轨迹为所有模型排序。

还要区分“解得更准”与“更接近现实”：残差只能相对指定定律判断。柔顺接触若用于表达材料变形，是模型假设；同样的正则项若只是改善条件数，仍会改变模型，需要说明其来源。刚体、点接触、干摩擦本身也是有限适用范围的近似。

## 实践含义

对 MPC、RL 和仿真迁移，比较对象应包含几何、接触模型、算法、步长与预算，而不只是引擎名称。记录物理残差、任务表现和耗时，有助于辨别“算法未收敛”与“算法很好地求出了一个不同模型的解”。后续读 [[SimulationRealityGap|Sim-to-Real Gap]]、[[DifferentiablePhysics|Differentiable Physics]]。

## 研究归属

[[topics/physics-simulation|物理仿真]] · [[topics/contact-modeling|接触建模]]。
