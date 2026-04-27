---
title: "Contact Models in Robotics: a Comparative Analysis"
type: source
tags: [robotics, simulation, contact-dynamics, physics-engines]
sources: []
last_updated: 2026-04-27
source_file: raw/contact-models-in-robotics-a-comparative-analysis.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2304.06372
extracted_text: graph/extracts/contact-models-in-robotics-a-comparative-analysis.md
source_date: 2024-07-21
---

## 摘要

Quentin Le Lidec、Wilson Jallet、Louis Montaut、Ivan Laptev、Cordelia Schmid 和 Justin Carpentier 对 robot simulation 中的 rigid contact models 做了 survey 和 benchmark。论文把 [[ContactModelsInRobotics|contact models in robotics]] 视为同时影响 physical fidelity 与 numerical failure 的核心因素：较物理化的 reference model 由 Signorini condition、Coulomb friction 和 maximum dissipation principle 组成，并导向一个困难的 [[ContactComplementarity|contact complementarity]] problem。

该 source 比较了常见 relaxations 与 solvers，包括 LCP、CCP、RaiSim-like per-contact methods、NCP solvers、PGS、ADMM 和 staggered projections。核心结论是：solver/model choices 不是中性的 implementation details。简单场景中这些选择可能看起来等价；但在 sliding、underdetermined、ill-conditioned、bumpy 或 slippery contact scenarios 中，它们会导致 unphysical forces、distorted energy dissipation、failed convergence，以及下游 controller 差异。这直接把 contact modeling 与 MPC、RL、differentiable simulation 中的 [[SimulationRealityGap|simulation reality gap]] 联系起来。

Source URL: https://arxiv.org/abs/2304.06372

## 核心主张

- 带 friction 的 rigid contact 由 Signorini condition、Coulomb's law 和 maximum dissipation principle 共同约束；它们定义的是 nonlinear complementarity problem，而不是简单的 smooth dynamics model。
- LCP approximations 会把 friction cone 近似为 polyhedral cone；这降低求解难度，但引入 direction-dependent friction bias。
- CCP-style relaxations 比 LCP 更好地保留 friction cone 与 maximum dissipation，但会 relax Signorini complementarity，并可能允许 normal force 与 separating velocity 同时存在。
- [[RaiSim]]-style contact handling 尝试在 sliding contacts 中恢复 Signorini behavior，但依赖 contact-state heuristics，并放松 maximum dissipation principle。
- Per-contact 的 PGS-style solvers 很快且常见，但论文显示它们可能引入 internal forces，在 ill-conditioned contact problems 中表现较差，并在更困难的 contact-rich locomotion 条件下 failed to converge。
- ADMM 和 staggered projections 这类 global/proximal [[ContactSolvers|contact solvers]] 通常更能处理 coupling 与 underdetermination，但每次 iteration 成本更高；warm-starting 可以缩小 runtime gap。
- Quadruped MPC experiments 显示，flat、high-friction terrain 可能掩盖 solver differences；bumpy 与 slippery terrain 则会让 RaiSim/CCP behavior 与 NCP behavior 明显分化。
- 论文把 [[DifferentiablePhysics|differentiable physics]] 标记为开放风险：artificial compliance 或 solver artifacts 可能改变 trajectory optimization 与 system identification 使用的 gradients。

## 关键引文

- "Simulation is a fundamental tool in robotics."
- "there is no fully satisfactory approach at the moment"
- "these choices may induce unphysical artifacts"

## 关联

- [[ContactModelsInRobotics]] - central domain concept：simulator 的 contact law 是模型的一部分，不只是 implementation；该页包含 contact pipeline 图。
- [[ContactComplementarity]] - 论文比较的 exact 与 relaxed mathematical formulations；该页补充 Signorini、Coulomb cone、maximum dissipation 与 residual intuition。
- [[ContactSolvers]] - 按 physical accuracy、robustness 和 speed 评估的 numerical algorithms；该页补充 solver taxonomy 与 PGS/ADMM/staggered projections 的求解直觉。
- [[SimulationRealityGap]] - contact approximations 会扩大 MPC 与 RL 场景中的 transfer error；该页补充 contact artifacts 到 hardware transfer mismatch 的 causal flow。
- [[DifferentiablePhysics]] - contact artifacts 可能污染 gradients；该页补充 chain-rule style 的 gradient contamination 解释。
- [[ContactBench]] - 论文中的 unified C++ benchmark implementation。
- [[MuJoCo]] 与 [[RaiSim]] - 作为不同 contact-model tradeoffs 示例的重要 simulator entities。

## 开放问题

- 这些发现如何映射到当前 Isaac Sim/PhysX、Newton、MuJoCo Warp 和 GPU-parallel training workflows？
- 对特定 robot task 而言，怎样的 contact residual thresholds 才算 "good enough"：MPC、RL policy training、hardware safety checks，还是 differentiable optimization？
- 现代 differentiable simulators 中，contact artifacts 造成的 practical gradient error 有多大？
- 论文中的 ContactBench implementation 是否仍被维护，并且足够广泛到可以作为 new simulators 的 regression benchmark？
