---
title: "ContactBench"
type: entity
tags: [robotics, simulation, benchmark, cpp]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]"]
last_updated: 2026-07-13
---

# ContactBench

ContactBench 是 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 中描述的统一的 C++ 基准框架。论文用它在尽量固定其他仿真器组件的条件下比较接触模型与求解器。

根据该来源，ContactBench 使用 Pinocchio 处理刚性机体动力学，使用 HPP-FCL 处理碰撞检测。这让作者可以把重点放在接触-分辨率层：LCP、CCP、RaiSim-like 接触处理、NCP、PGS、ADMM 和交错投影。

为什么重要：仿真器比较经常被不同的碰撞检测、模型格式、集成细节和动力学实现混杂。ContactBench 的目标是 isolate 影响物理正确性与 computational 成本的求解器/模型行为。

相关页面：[[ContactModelsInRobotics]]、[[ContactSolvers]]、[[ContactComplementarity]]。
