---
title: "MuJoCo"
type: entity
tags: [robotics, simulation, physics-engine]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[mujoco-computation-collision-detection]]", "[[isaac-sim-asset-structure]]", "[[robotics-simulation-infrastructure]]", "[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]", "[[mujocouni-persistent-batched-runtime-primitives-for-mujoco]]", "[[mujoco-warp-mjwarp-documentation]]", "[[mjlab-repository]]", "[[mujoco-playground-repository]]"]
modified: 2026-10-04
topics: ["topics/physics-simulation", "topics/robot-policy-learning", "topics/contact-modeling", "topics/robot-learning-systems"]
---

# MuJoCo

连接 MuJoCo 的接触、计算文档及训练系统资料。核心物理语义、CPU 批处理包装、GPU 实现和上层学习框架分别有自己的版本与适用范围，不视为同一实现的可互换配置。

## 来源入口

- [[contact-models-in-robotics-a-comparative-analysis|接触模型比较：物理近似与数值求解怎样改变机器人运动]]
- [[mujoco-computation-collision-detection|MuJoCo Computation：动力学、积分与接触]]
- [[isaac-sim-asset-structure|Asset Structure - Isaac Sim Documentation]]
- [[robotics-simulation-infrastructure|Robotics Simulation Infrastructure]]
- [[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab: A Heterogeneous Architecture for Robot RL Beyond GPU-Dominant Paradigms]]
- [[mujocouni-persistent-batched-runtime-primitives-for-mujoco|MuJoCoUni: Persistent Batched Runtime Primitives for MuJoCo]]
- [[mujoco-warp-mjwarp-documentation|MuJoCo Warp (MJWarp) Documentation]]
- [[mjlab-repository|mjlab Repository]]
- [[mujoco-playground-repository|MuJoCo Playground Repository]]

方法机制与研究比较请沿下列专题继续阅读；此页只保留跨来源共有的项目入口，避免同一结论重复维护。

## 研究归属

[[topics/physics-simulation|物理仿真]] · [[topics/robot-policy-learning|机器人策略学习]] · [[topics/contact-modeling|接触模型与求解怎样改变运动]] · [[topics/robot-learning-systems|训练系统怎样提高有效学习效率]]。
