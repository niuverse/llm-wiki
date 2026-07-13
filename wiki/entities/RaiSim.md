---
title: "RaiSim"
type: entity
tags: [robotics, simulation, physics-engine, quadrupeds]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]"]
last_updated: 2026-07-13
---

# RaiSim

RaiSim 是 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 中讨论的机器人学仿真器，尤其因为它在学得的 quadruped 移动策略到硬件迁移中的作用而重要。

论文把 RaiSim 的接触模型看作对 CCP formulations 一个弱点的修正：它通过 enforcing Signorini 条件来处理 sliding 接触。取舍是该方法依赖接触状态启发式规则，并松弛最大耗散 principle。在论文基准中，这会产生能量-耗散与移动 differences，尤其是在 bumpy 或 slippery 地形上。

本页只记录该论文对 RaiSim 的处理方式；在提出 up-到-date 主张之前，应对照 RaiSim 文档或来源材质检查当前实现细节。

相关页面：[[ContactModelsInRobotics]]、[[ContactComplementarity]]、[[ContactSolvers]]、[[SimulationRealityGap]]。
