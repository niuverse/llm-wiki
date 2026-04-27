---
title: "Contact Complementarity（接触互补）"
type: concept
tags: [robotics, simulation, optimization, contact-dynamics]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]"]
last_updated: 2026-04-27
---

# Contact Complementarity（接触互补）

Contact complementarity（接触互补）是一类 mathematical constraint：contact forces 与 separating velocities 不能以物理上不可能的方式同时 active。在 robot simulation 中，[[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 把 Signorini condition、Coulomb friction 和 maximum dissipation principle 视为导向 nonlinear complementarity problem（NCP）的基本 laws。

## 数学形式

最小的 normal-contact 互补关系可以写成：

$$
g_n(q) \ge 0,\quad \lambda_n \ge 0,\quad g_n(q)\lambda_n = 0
$$

其中 $g_n(q)$ 是 normal gap（正值表示分离），$\lambda_n$ 是 normal contact force 或 impulse。直觉是：没有 penetration 时可以没有力；一旦有正的 separating gap，就不能再施加 pushing contact force。对 time-stepping contact solver，同一思想也常被写成 separating velocity 版本：

$$
v_n^+ \ge 0,\quad \lambda_n \ge 0,\quad v_n^+\lambda_n = 0
$$

带 friction 的 rigid contact 还要加入 Coulomb cone 与 maximum dissipation。若 $\lambda_t$ 是 tangential force，则 Coulomb friction 要求：

$$
\|\lambda_t\| \le \mu \lambda_n
$$

maximum dissipation principle 则选择一个与 sliding motion 相反、并在 friction cone 中耗散最多的 tangential force。三者合起来不是 smooth dynamics equation，而是 source 中强调的 nonlinear complementarity problem（NCP）。

## 假设与变量

这些式子隐含的是 rigid、unilateral、non-pulling contact：contact 可以推开两个 bodies，但不能把它们拉在一起。核心变量包括 $q$ 或 velocity state、normal gap $g_n$、post-contact separating velocity $v_n^+$、normal force/impulse $\lambda_n$、tangential force/impulse $\lambda_t$，以及 friction coefficient $\mu$。

困难来自变量之间的 coupling。一个 contact 的可行力会受 robot mass matrix、其他 simultaneous contacts、friction cone 与 solver iteration 的共同影响。因此 residuals 不能只看单个 contact 是否 locally plausible；在 redundant contacts 或 ill-conditioned systems 中，global consistency 才是问题。

## NCP、LCP、CCP 的关系

- NCP：最接近 source 里的 rigid-contact physical reference，因为它同时保留 Signorini complementarity、Coulomb friction 和 maximum dissipation。但它 non-smooth、non-convex，难以可靠求解。
- LCP：把 friction cone linearize 成 polyhedral cone 或 pyramid，使问题更接近 linear complementarity problem。代价是 friction 方向被离散化，可能产生 direction-dependent friction bias。
- CCP：把 NCP relax 成 convex optimization-style problem。source 的记录是：它比 LCP 更好地保留 friction cone 与 maximum dissipation structure，但会 relax Signorini complementarity，并可能在 sliding 时允许 normal force 与 separating velocity 同时存在。
- RaiSim-style model：尝试在 sliding contacts 中恢复 Signorini behavior，但依赖 contact-state heuristics，并 relax maximum dissipation。

这组关系说明：不同 formulation 不是单纯的 solver speed choice，而是在 physical exactness、robustness 和 numerical tractability 之间移动。

## Residual 直觉

Complementarity residual 衡量的是“违反互补条件的量”。如果 $\lambda_n>0$ 同时 $v_n^+>0$，solver 就在 bodies 已经分离时仍施加 normal force；如果 contact 应该支撑负载却没有产生合适 force，则会表现为 penetration 或 failed support。friction residual 则反映 tangential force 是否越出 Coulomb bound，或是否没有按 maximum dissipation 方向耗散 sliding motion。

论文把这些 residuals 用作 physical accuracy criterion。因此，complementarity 既是 model property，也是 benchmark metric：它描述 simulator 试图满足的 physical law，也暴露 approximation 在 sliding contact、redundant contacts、ill-conditioned systems 和 rough locomotion terrain 中的偏差。

相关页面：[[ContactModelsInRobotics]]、[[ContactSolvers]]、[[SimulationRealityGap]]。
