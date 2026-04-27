---
title: "Contact Models in Robotics"
type: concept
tags: [robotics, simulation, contact-dynamics]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]"]
last_updated: 2026-04-27
---

# Contact Models in Robotics

Contact models 定义 robot simulator 如何把 collisions、non-penetration、friction、impacts 与 numerical relaxation 转换成 forces 或 impulses。在 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 中，contact modeling 是 contact-rich robotics 的 first-order modeling choice，而不只是 solver implementation detail。

## 数学结构

较物理化的 rigid-contact reference 组合了三条 laws：

- Signorini complementarity：用于 unilateral、non-pulling contact；normal force 只能在 active contact 中推开 bodies。
- Coulomb friction：用于 bounded tangential forces；friction magnitude 受 normal force 与 coefficient $\mu$ 限制。
- Maximum dissipation principle：用于 friction opposing motion；在 friction cone 内选择最耗散 sliding motion 的 tangential force。

三者合在一起会产生困难的 [[ContactComplementarity|contact complementarity]] problem。Simulators 经常用 exactness 换取 speed、robustness、differentiability 或 easier implementation。论文的主要警告是：这些 tradeoffs 在简单任务中可能被隐藏，但会在 sliding contact、redundant contacts、ill-conditioned systems 和 rough locomotion terrain 中显现出来。

用 variables 看，contact model 从 robot configuration $q$、velocity $v$、contact gap $g_n(q)$、contact Jacobian $J$ 和 friction coefficient $\mu$ 出发，求 normal/tangential impulse 或 force $\lambda=(\lambda_n,\lambda_t)$。理想 rigid reference 希望同时满足 unilateral contact、Coulomb cone 和 dissipation direction；不同 simulator 的差异在于它把这个 reference problem 近似成 NCP、LCP、CCP 还是 heuristic contact-state update。

## Contact pipeline

```mermaid
flowchart LR
  A[Robot state<br/>q, v] --> B[Collision detection<br/>candidate contacts]
  B --> C[Contact law<br/>Signorini + Coulomb + maximum dissipation]
  C --> D[Model approximation<br/>NCP / LCP / CCP / RaiSim-style]
  D --> E[Solver<br/>PGS / ADMM / staggered projections]
  E --> F[Forces or impulses<br/>lambda_n, lambda_t]
  F --> G[Dynamics integration<br/>next q, v]
  E --> H[Residuals<br/>complementarity, friction, convergence]
  H --> D
```

这个 pipeline 的关键点是：contact model 在 contact-resolution layer 进入 simulator。Collision detection 只给出 candidate contacts；真正决定 physical behavior 的，是后续如何把这些 contacts 解释成 unilateral constraints、friction bounds、dissipation objective，以及可求解的 mathematical problem。

## 直觉

在 contact law 阶段，选择 rigid reference 意味着把 non-penetration、non-pulling force、Coulomb friction 和 maximum dissipation 一起保留。这个选择给出最清晰的 physical target，但也把问题变成 [[ContactComplementarity|NCP-style complementarity]]。

在 model approximation 阶段，simulator 会决定牺牲哪部分 exactness。LCP 把 friction cone linearize 成 pyramid，降低求解难度但引入 direction-dependent friction bias。CCP 更好保留 cone 与 maximum dissipation structure，但可能 relax Signorini complementarity。RaiSim-style handling 尝试在 sliding contacts 中恢复 Signorini behavior，但使用 contact-state heuristics，并 relax maximum dissipation。

在 solver 阶段，per-contact methods 如 PGS 或 RaiSim-style bisection 通常每次 iteration 更便宜，但可能错过 contacts 之间的 global coupling，产生 internal forces，并在 ill-conditioned problems 上失败。ADMM 与 staggered projections 这类 global/proximal [[ContactSolvers|contact solvers]] 更关注完整 contact problem 的 coupling，通常更 robust，但每次 iteration 成本更高；warm-starting 可以缩小 runtime gap。

## Failure Modes

- Direction-dependent friction bias：LCP 的 polyhedral friction cone 会让 friction behavior 依赖离散 cone directions。
- Relaxed complementarity：CCP-style relaxation 可能允许 separating velocity 与 positive normal force 同时出现，导致 non-physical support forces。
- Heuristic contact-state errors：RaiSim-style handling 依赖 contact state classification；sliding/sticking 判断错误会改变 force distribution。
- Internal forces：per-contact/local solvers 在 redundant contacts 中可能产生互相抵消但物理上不干净的 internal forces。
- Hidden easy-case equivalence：flat、high-friction terrain 可能让不同 models 看起来等价；bumpy、slippery、ill-conditioned settings 才暴露差异。

## 实践含义

对 robotics，contact model 的误差不是只停留在 forces 层。它会进入 MPC、RL policy training、trajectory optimization、system identification 与 [[DifferentiablePhysics|differentiable physics]] 的 downstream objective。source 的 quadruped MPC experiments 显示，flat、high-friction terrain 可能掩盖 solver differences；bumpy 与 slippery terrain 会放大 RaiSim/CCP behavior 与 NCP behavior 的差异。

选择 simulator 时应先写清楚目标 contact regime：高速 impact、long sliding、cloth/soft contact、redundant support、force sensing、还是 differentiable optimization。没有这个 regime，比较 “fast” 或 “stable” solver 很容易把 task-specific tolerance 误当成 general physical fidelity。

相关页面：[[ContactSolvers]]、[[SimulationRealityGap]]、[[DifferentiablePhysics]]、[[MuJoCo]]、[[RaiSim]]、[[ContactBench]]。
