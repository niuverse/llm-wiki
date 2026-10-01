---
title: "接触互补"
type: concept
tags: [robotics, simulation, contact-dynamics]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]"]
modified: 2026-09-30
study_topic: syntheses/simulation-and-assets-learning-path
---

# 接触互补

接触互补描述单边接触的一条规则：物体可以相互推开，但不能靠普通接触把彼此拉住；分离时也不应继续产生支撑力。[[contact-models-in-robotics-a-comparative-analysis|接触模型比较论文]] 把 Signorini 条件、库仑摩擦和最大耗散作为刚性接触的参考定律。先读本页，再看 [[ContactSolvers|这些条件怎样被数值求解]]。

## 数学结构

令 $q$ 为广义位置，$g_n(q)$ 为两物体沿接触法向的间隙（正值表示分离），$\lambda_n$ 为法向接触力。位置层面的理想条件是：

$$
g_n(q)\ge 0,\qquad \lambda_n\ge 0,\qquad g_n(q)\lambda_n=0.
$$

前两项分别禁止穿透和拉力，第三项禁止“有间隙同时有支撑力”。紧写成 $0\le g_n(q)\perp\lambda_n\ge0$；符号 $\perp$ 在这里表示乘积为零。

在已激活接触处，忽略恢复系数和位置稳定化的教学速度模型可写为：

$$
0\le v_n^+\perp p_n\ge0.
$$

$v_n^+$ 是冲量施加后的法向相对速度，$p_n$ 是法向冲量，单位为牛顿秒。它和接触力 $\lambda_n$ 不同：在步长 $h$ 内，$p_n/h$ 才是平均力。实际引擎还会纳入碰撞恢复、穿透修正或柔顺性；不能把上述简式当作所有引擎的完整公式。

令 $\boldsymbol\lambda_t$ 为切向力，$\mu$ 为摩擦系数，库仑摩擦锥是：

$$
\|\boldsymbol\lambda_t\|_2\le\mu\lambda_n.
$$

最大耗散要求在这个可行集合内选择最抵抗滑动的切向力。它与法向互补共同决定力；只有摩擦幅值上界，还不能说明滑动时力的方向。冲量形式有相应的摩擦锥约束。以上定律与模型近似的区分来自 [[contact-models-in-robotics-a-comparative-analysis|接触模型比较论文]]。

## 直觉

用桌面上的盒子理解乘积为零：盒子悬空时，$g_n>0$，所以桌面接触力必须为零；盒子贴着桌面时，$g_n=0$，法向力可以为正，也可以恰好为零。互补条件没有单独决定支撑力大小，大小还由质量、外力、运动和其他接触共同决定。这个盒子例子是教学解释，不是来源中的实验。

## 不同表述放松了什么

| 表述 | 保留或近似的结构 | 代价 |
| --- | --- | --- |
| NCP：非线性互补问题 | 保留上述刚性参考定律 | 非光滑、非凸，求解困难 |
| LCP：线性互补问题 | 用多面体近似摩擦锥 | 摩擦方向离散化，可能出现方向偏差 |
| CCP：凸锥问题 | 较好保留摩擦锥与耗散结构 | 松弛 Signorini 条件，滑动时可能出现法向力与分离速度并存 |
| RaiSim 风格 | 在滑动接触中尝试恢复 Signorini 行为 | 使用接触状态启发式规则，放松最大耗散 |

这是比较论文中的模型关系，不是所有版本仿真器的永久分类。实现和设置变化时应重新核对来源。见 [[ContactModelsInRobotics|接触模型]]。

## 失效情形

比较论文指出，滑动、冗余支撑和病态接触系统会放大模型近似与数值误差：多面体摩擦锥产生方向偏差；互补松弛可能产生非物理支撑；局部迭代未充分收敛时，接触力分配可能含内部力。[[contact-models-in-robotics-a-comparative-analysis|接触模型比较论文]]

残差需要分开看：可行性残差检查不穿透、非负法向力与摩擦边界；互补残差检查分离与支撑是否同时存在；耗散残差检查摩擦方向。仅看 $g_n\lambda_n$ 不足以判断整个接触系统正确，量纲与归一化也会影响不同算例间的比较。

## 实践含义

对 MPC、RL 和力感知任务，先明确允许哪种近似，再比较求解器。对可微优化，还要检查梯度是否来自松弛模型，而不是把光滑性直接当作物理真实性。继续读 [[ContactSolvers|接触求解器]]、[[DifferentiablePhysics|可微物理]] 和 [[SimulationRealityGap|仿真—现实差距]]。
