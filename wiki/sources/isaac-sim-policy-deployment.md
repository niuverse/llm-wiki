---
title: "Isaac Sim 6.1: Deploying policies in Isaac Sim"
type: source
tags: [robotics, simulation, isaac-sim, sim-to-real, source-backed]
sources: []
modified: 2026-10-02
source_file: raw/isaac-sim-6-1-policy-deployment.html
source_kind: html
source_url: https://docs.isaacsim.omniverse.nvidia.com/6.1.0/isaac_lab_tutorials/tutorial_policy_deployment.html
extracted_text: graph/extracts/isaac-sim-6-1-policy-deployment.md
source_date: 2026-09-18
source_version: isaac-sim-6.1.0-documentation
acquired: 2026-10-02
snapshot_sha256: d9e59e49dd99b47608238c048d135b5ec0f116ec4c876a04731a1dbec1007c20
topics: ["topics/evaluation-and-transfer", "topics/simulation-transfer"]
source_type: documentation
nav_title: "Isaac Sim · 策略部署"
---

## 摘要

截至 2026-10-02 读取的 6.1.0 官方指南，将策略导出物、张量接口、物理配置和运行生命周期明确分开。页面最后更新于 2026-09-18。它补充 [[PolicyDeploymentContract|策略部署契约]]；不能直接替代本库早期版本的 Isaac Sim 配置与调参说明。

![Unitree H1 策略控制演示（动图）](../assets/figures/isaac-sim-policy-deployment/web-02.webp)

Unitree H1 策略控制演示（动图）。[查看原始来源](https://docs.isaacsim.omniverse.nvidia.com/6.1.0/_images/tutorial_lab_h1_walk_demo.gif)

## 核心主张

- `policy.pt`／`policy.onnx` 是推理模型；训练检查点不能直接当部署模型。
- `IO_descriptors.yaml` 保存实际张量顺序、关节名、形状、缩放和偏移；关节正则表达式只选择集合，不能定义训练顺序。
- `env.yaml` 保存时步、策略降频、资产、初态、增益、限制及执行器；三个部署文件应来自同一训练运行。
- `RobotPolicyRunner` 按名称绑定支持的观测与动作，在每个物理步调用一次，并负责策略降频；调用方再加降频计数会改变执行周期。
- 自定义项需要明确绑定；历史和修饰器的元数据不意味着部署实现已自动复现它们。不能把“模型成功加载”当成输入、物理与时序一致。

![Spot 策略控制演示（动图）](../assets/figures/isaac-sim-policy-deployment/web-03.webp)

Spot 策略控制演示（动图）。[查看原始来源](https://docs.isaacsim.omniverse.nvidia.com/6.1.0/_images/tutorial_lab_spot_walk_demo.gif)

## 版本与证据边界

指南介绍的是在 Isaac Sim 验证策略及接口，再检查硬件部署的时序与语义；没有测量硬件成功率或保证零样本迁移。所列类名与生命周期限定于本次 6.1 文档，不将早期 [[isaac-sim-mujoco-control-tuning-notes|跨引擎控制笔记]] 中的 API 自动改成新版本。

## 关联

[[PolicyDeploymentContract|策略部署契约]]、[[SimulationTimeStepping|控制与物理频率]]、[[RoboticsSimulationInfrastructure|仿真基础设施]]、[[SimulationRealityGap|现实差距]]、[[ReducedCoordinateArticulations|驱动与关节]]。

## 归档记录

规范网址、版本与获取日期见页首；本次原始文件的 SHA-256 为 `d9e59e49dd99b47608238c048d135b5ec0f116ec4c876a04731a1dbec1007c20`，归档登记在 `graph/acquisitions.jsonl`。

## 研究归属

[[topics/evaluation-and-transfer|评测与 Sim-to-Real]] · [[topics/simulation-transfer|Sim-to-Real]]。
