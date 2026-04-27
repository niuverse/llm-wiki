---
title: "ContactBench"
type: entity
tags: [robotics, simulation, benchmark, cpp]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]"]
last_updated: 2026-04-27
---

# ContactBench

ContactBench 是 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 中描述的 unified C++ benchmark framework。论文用它在尽量固定其他 simulator components 的条件下比较 contact models 与 solvers。

根据该 source，ContactBench 使用 Pinocchio 处理 rigid-body dynamics，使用 HPP-FCL 处理 collision detection。这让作者可以把重点放在 contact-resolution layer：LCP、CCP、RaiSim-like contact handling、NCP、PGS、ADMM 和 staggered projections。

为什么重要：simulator comparisons 经常被不同的 collision detection、model formats、integration details 和 dynamics implementations 混杂。ContactBench 的目标是 isolate 影响 physical correctness 与 computational cost 的 solver/model behavior。

相关页面：[[ContactModelsInRobotics]]、[[ContactSolvers]]、[[ContactComplementarity]]。
