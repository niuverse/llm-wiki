---
title: "RaiSim"
type: entity
tags: [robotics, simulation, physics-engine, quadrupeds]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]"]
last_updated: 2026-04-27
---

# RaiSim

RaiSim 是 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 中讨论的 robotics simulator，尤其因为它在 learned quadruped locomotion policies 到 hardware transfer 中的作用而重要。

论文把 RaiSim 的 contact model 看作对 CCP formulations 一个弱点的修正：它通过 enforcing Signorini condition 来处理 sliding contacts。tradeoff 是该方法依赖 contact-state heuristics，并 relax maximum dissipation principle。在论文 benchmarks 中，这会产生 energy-dissipation 与 locomotion differences，尤其是在 bumpy 或 slippery terrain 上。

本页只记录该 paper 对 RaiSim 的处理方式；在提出 up-to-date claims 之前，应对照 RaiSim documentation 或 source material 检查当前 implementation details。

相关页面：[[ContactModelsInRobotics]]、[[ContactComplementarity]]、[[ContactSolvers]]、[[SimulationRealityGap]]。
