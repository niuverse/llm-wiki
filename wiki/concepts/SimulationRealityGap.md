---
title: "Simulation Reality Gap（仿真现实差距）"
type: concept
tags: [robotics, simulation, sim-to-real, reinforcement-learning, world-models]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]"]
last_updated: 2026-04-27
---

# Simulation Reality Gap（仿真现实差距）

Simulation reality gap 是 simulated behavior 与 real robot behavior 之间的 mismatch。[[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 提供了一个 low-level contact-modeling lens：这个 gap 不只来自 randomized masses、frictions、delays 或 sensors，也来自 physics engine 的 contact law 与 solver。

用 transition model 看，simulator 实际提供的是：

```text
x_{t+1}^{sim} = T_body(x_t, u_t, lambda_hat_m)
lambda_hat_m = S_m(contact law, solver, geometry, velocity)
```

real robot 则由真实接触产生 `lambda_real`。当 `lambda_hat_m` 因 LCP/CCP relaxation、RaiSim-style heuristics、PGS residual、artificial compliance 或 failed convergence 偏离 `lambda_real`，差异会进入下一步 state，再进入 controller 或 policy 的训练分布。

```mermaid
flowchart LR
  A["contact law choice<br/>NCP / LCP / CCP / RaiSim-style"] --> C["computed forces / impulses"]
  B["solver choice<br/>PGS / bisection / ADMM / staggered projections"] --> C
  C --> D["state transition<br/>support, slip, impact, dissipation"]
  D --> E["MPC prediction horizon<br/>or RL rollout distribution"]
  E --> F["chosen controls / learned policy"]
  F --> G["hardware execution"]
  D -.-> H["simulation reality gap<br/>mismatch vs real contacts"]
  G --> H
```

论文显示 contact artifacts 具有 task-dependent 特征。Flat、high-friction 的 quadruped MPC 可能在不同 simulators 中追踪出相似的 base velocities；但 bumpy 与 slippery terrain 会暴露 NCP、CCP 和 RaiSim-like behavior 之间的显著差异。这意味着 simulator 在 easy validation tests 下看起来可接受，却仍可能在更困难的 contact regimes 中误导 controller。

对 MPC，这个 gap 表现为 horizon 内预测的 support、slip 和 dissipation 与 hardware 不一致：optimizer 可能选择在 simulated terrain 上稳定、但在真实接触条件下失效的 controls。对 RL，同样的问题会改变 rollout distribution：policy 在 simulation 中反复见到的是 solver/model 生成的 contact outcomes，而不是 hardware 上的 contact outcomes。

对 RL 和 MPC 来说，这提示 simulator choice 应该围绕 hardware 上预期出现的 contact regime 来审计：sliding、impacts、redundant contacts、rough terrain，以及 ill-conditioned mass/contact layouts。

## Learned world model lens

[[a-comprehensive-survey-on-world-models-for-embodied-ai|A Comprehensive Survey on World Models for Embodied AI]] 给 simulation reality gap 增加了 learned-simulator lens。[[WorldModelsForEmbodiedAI|World models]] 用 latent dynamics、tokens、spatial grids 或 renderable primitives rollout future states；这些 rollouts 可能帮助 policy optimization、MPC 和 counterfactual reasoning，但也可能把 dataset bias、temporal drift、weak physical consistency 或 pixel-level artifacts 转换成新的 model-reality mismatch。

这个 source 支持一个更一般的判断：sim-to-real gap 不只是 physics engine 参数错了，也可能是 learned dynamics 的 objective 错了。若 [[WorldModelEvaluation|evaluation]] 主要依赖 FID/FVD 这类 pixel fidelity metrics，而没有检查 state-level dynamics、causality、collision、task success 或 real-time closed-loop behavior，model 可能生成视觉上 plausible 但控制上 misleading 的 futures。

相关页面：[[ContactModelsInRobotics]]、[[ContactSolvers]]、[[ContactComplementarity]]、[[WorldModelsForEmbodiedAI]]、[[WorldModelEvaluation]]、[[MuJoCo]]、[[RaiSim]]。
