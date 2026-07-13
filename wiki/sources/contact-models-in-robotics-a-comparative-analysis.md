---
title: "Contact Models in Robotics: a Comparative Analysis"
type: source
tags: [robotics, simulation, contact-dynamics, physics-engines]
sources: []
last_updated: 2026-07-13
source_file: raw/contact-models-in-robotics-a-comparative-analysis.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2304.06372
extracted_text: graph/extracts/contact-models-in-robotics-a-comparative-analysis.md
source_date: 2024-07-21
---

## 摘要

Quentin Le Lidec、Wilson Jallet、Louis Montaut、Ivan Laptev、Cordelia Schmid 和 Justin Carpentier 对机器人仿真中的刚性接触模型做了综述和基准。论文把 [[ContactModelsInRobotics|接触模型 in 机器人学]] 视为同时影响物理保真度与数值失败的核心因素：较物理化的参考模型由 Signorini 条件、Coulomb 摩擦和最大耗散 principle 组成，并导向一个困难的 [[ContactComplementarity|接触互补]] 问题。

该来源比较了常见 relaxations 与求解器，包括 LCP、CCP、RaiSim-like 逐接触点方法、NCP 求解器、PGS、ADMM 和交错投影。核心结论是：求解器/模型选择不是中性的实现细节。简单场景中这些选择可能看起来等价；但在 sliding、underdetermined、ill-条件化的、bumpy 或 slippery 接触 scenarios 中，它们会导致 unphysical 力、distorted 能量耗散、失败的收敛，以及下游控制器差异。这直接把接触建模与 MPC、RL、可微的仿真中的 [[SimulationRealityGap|仿真—现实差距]] 联系起来。

来源网址: https://arxiv.org/abs/2304.06372

## 核心主张

- 带摩擦的刚性接触由 Signorini 条件、Coulomb's 定律和最大耗散 principle 共同约束；它们定义的是 nonlinear 互补问题，而不是简单的平滑动力学模型。
- LCP approximations 会把摩擦锥体近似为多面体的锥体；这降低求解难度，但引入方向-依赖的摩擦偏差。
- CCP-风格 relaxations 比 LCP 更好地保留摩擦锥体与最大耗散，但会松弛 Signorini 互补，并可能允许法向力与分离速度同时存在。
- [[RaiSim]]-风格接触处理尝试在 sliding 接触中恢复 Signorini 行为，但依赖接触状态启发式规则，并放松最大耗散 principle。
- Per-接触的 PGS-风格求解器很快且常见，但论文显示它们可能引入内部力，在 ill-条件化的接触 problems 中表现较差，并在更困难的接触丰富移动条件下失败的到 converge。
- ADMM 和交错投影这类全局/近端 [[ContactSolvers|接触求解器]] 通常更能处理耦合与 underdetermination，但每次迭代成本更高；warm-starting 可以缩小运行时差距。
- Quadruped MPC 实验显示，flat、高摩擦地形可能掩盖求解器 differences；bumpy 与 slippery 地形则会让 RaiSim/CCP 行为与 NCP 行为明显分化。
- 论文把 [[DifferentiablePhysics|可微物理]] 标记为开放风险：人为引入的柔顺性或求解器产物，可能改变轨迹优化与系统辨识使用的梯度。

## 关键引文

- "Simulation is a fundamental tool in robotics."
- "there is no fully satisfactory approach at the moment"
- "these choices may induce unphysical artifacts"

## 关联

- [[ContactModelsInRobotics]] - central 域概念：仿真器的接触定律是模型的一部分，不只是实现；该页包含接触流程图。
- [[ContactComplementarity]] - 论文比较的精确与松弛的数学 formulations；该页补充 Signorini、Coulomb 锥体、最大耗散与残差直觉。
- [[ContactSolvers]] - 按物理准确率、鲁棒性和速度评估的数值 algorithms；该页补充求解器分类体系与 PGS/ADMM/交错投影的求解直觉。
- [[SimulationRealityGap]] - 接触 approximations 会扩大 MPC 与 RL 场景中的迁移错误；该页补充接触产物到硬件迁移不匹配的因果流程。
- [[DifferentiablePhysics]] - 接触产物可能污染梯度；该页补充 chain-rule 风格的梯度污染解释。
- [[ContactBench]] - 论文中的统一的 C++ 基准实现。
- [[MuJoCo]] 与 [[RaiSim]] - 作为不同接触模型取舍示例的重要仿真器实体。

## 开放问题

- 这些发现如何映射到当前 Isaac Sim/PhysX、Newton、MuJoCo Warp 和 GPU-并行训练流程？
- 对特定机器人任务而言，怎样的接触残差阈值才算 "良好的 enough"：MPC、RL 策略训练、硬件 safety 检查，还是可微的优化？
- 现代可微的仿真器中，接触产物造成的实用的梯度错误有多大？
- 论文中的 ContactBench 实现是否仍被维护，并且足够广泛到可以作为新仿真器的 regression 基准？
