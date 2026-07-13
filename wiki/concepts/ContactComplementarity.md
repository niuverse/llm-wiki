---
title: "接触互补"
type: concept
tags: [robotics, simulation, optimization, contact-dynamics]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]"]
last_updated: 2026-07-13
---

# 接触互补

接触互补（接触互补）是一类数学约束：接触力与分离速度不能以物理上不可能的方式同时有效。在机器人仿真中，[[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 把 Signorini 条件、Coulomb 摩擦和最大耗散原理视为导向非线性互补问题（NCP）的基本定律。

## 数学形式

最小的法向接触互补关系可以写成：

$$
g_n(q) \ge 0,\quad \lambda_n \ge 0,\quad g_n(q)\lambda_n = 0
$$

其中 $g_n(q)$ 是法向差距（正值表示分离），$\lambda_n$ 是法向接触力或冲量。直觉是：没有穿透时可以没有力；一旦有正的分离差距，就不能再施加 pushing 接触力。对时间-stepping 接触求解器，同一思想也常被写成分离速度版本：

$$
v_n^+ \ge 0,\quad \lambda_n \ge 0,\quad v_n^+\lambda_n = 0
$$

带摩擦的刚性接触还要加入库仑摩擦锥与最大耗散。若 $\lambda_t$ 是切向力，则 Coulomb 摩擦要求：

$$
\|\lambda_t\| \le \mu \lambda_n
$$

最大耗散原理则选择一个与滑动运动相反、并在摩擦锥中耗散最多的切向力。三者合起来不是平滑动力学方程，而是来源中强调的非线性互补问题（NCP）。

## 假设与变量

这些式子隐含的是刚性、单边、不产生拉力接触：接触可以推开两个刚体，但不能把它们拉在一起。核心变量包括 $q$ 或速度状态、法向差距 $g_n$、后处理-接触分离速度 $v_n^+$、法向力/冲量 $\lambda_n$、切向力/冲量 $\lambda_t$，以及摩擦系数 $\mu$。

困难来自变量之间的耦合。一个接触的可行力会受机器人质量矩阵、其他 simultaneous 接触、摩擦锥与求解器迭代的共同影响。因此残差不能只看单个接触是否 locally 看似合理；在冗余接触或病态系统中，全局一致性才是问题。

## NCP、LCP、CCP 的关系

- NCP：最接近来源里的刚性接触物理参考基准，因为它同时保留 Signorini 互补条件、Coulomb 摩擦和最大耗散。但它 non-平滑、非凸，难以可靠求解。
- LCP：把摩擦锥线性化成多面体锥或棱锥，使问题更接近线性互补问题。代价是摩擦方向被离散化，可能产生方向相关摩擦偏差。
- CCP：把 NCP 松弛成凸优化风格问题。来源的记录是：它比 LCP 更好地保留摩擦锥与最大耗散结构，但会松弛 Signorini 互补条件，并可能在滑动时允许法向力与分离速度同时存在。
- RaiSim-风格模型：尝试在滑动接触中恢复 Signorini 行为，但依赖接触状态启发式规则，并松弛最大耗散。

这组关系说明：不同表述不是单纯的求解器速度选择，而是在物理精确性、鲁棒性和数值 tractability 之间移动。

## 残差直觉

互补残差衡量的是“违反互补条件的量”。如果 $\lambda_n>0$ 同时 $v_n^+>0$，求解器就在刚体已经分离时仍施加法向力；如果接触应该支撑负载却没有产生合适力，则会表现为穿透或失败的支撑。摩擦残差则反映切向力是否越出 Coulomb 边界，或是否没有按最大耗散方向耗散滑动运动。

论文把这些残差用作物理准确率 criterion。因此，互补既是模型属性，也是基准指标：它描述仿真器试图满足的物理定律，也暴露近似在滑动接触、冗余接触、病态系统和崎岖运动地形中的偏差。

相关页面：[[ContactModelsInRobotics]]、[[ContactSolvers]]、[[SimulationRealityGap]]。
