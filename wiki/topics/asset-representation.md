---
title: "资产格式怎样保留仿真语义"
type: "topic"
tags: ["simulation", "source-backed"]
sources: ["[[openusd-introduction]]", "[[openusd-glossary]]", "[[learn-openusd-stage]]", "[[learn-openusd-file-formats]]", "[[learn-openusd-prim-composition]]", "[[gltf-basic-structure]]", "[[isaac-sim-asset-structure]]", "[[isaac-sim-45-asset-structure]]", "[[nvidia-ovrtx]]"]
modified: "2026-10-04"
description: "区分文件表示、场景组合、物理配置与传感器输出。"
---

# 资产格式怎样保留仿真语义

区分文件表示、场景组合、物理配置与传感器输出。

## 方法与证据

[[openusd-introduction|OpenUSD 官方介绍]]与[[openusd-glossary|术语表]]解释层、图元和组合；[[isaac-sim-asset-structure|Isaac Sim 资产结构]]记录版本相关的资产组织；[[gltf-basic-structure|glTF 基础教程]]解释场景与缓冲区；[[nvidia-ovrtx|ovrtx 仓库]]说明传感器渲染接口。

**当前判断：**文件可解析、场景组合正确、物理可执行与观测可信是不同条件。版本特有的配置应保留版本范围；本专题目前以规范和实现资料为主，不假装已有同条件的跨格式物理比较实验。

## 支撑资料

- [[openusd-introduction|Introduction to USD]]
- [[openusd-glossary|USD Terms and Concepts]]
- [[learn-openusd-stage|Stage - Learn OpenUSD]]
- [[learn-openusd-file-formats|OpenUSD File Formats - Learn OpenUSD]]
- [[learn-openusd-prim-composition|What Is Prim Composition? - Learn OpenUSD]]
- [[gltf-basic-structure|The Basic Structure of glTF - Khronos glTF Tutorials]]
- [[isaac-sim-asset-structure|Asset Structure - Isaac Sim Documentation]]
- [[isaac-sim-45-asset-structure|Asset Structure - Isaac Sim 4.5 Documentation]]
- [[nvidia-ovrtx|NVIDIA ovrtx]]

## 机制基础

[[OpenUSDSceneComposition|OpenUSD 场景组合]]、[[USDAFileSyntax|USDA 文件语法]]、[[GLTFSceneStructure|glTF 场景与数据结构]]、[[IsaacSimAssetStructure|Isaac Sim 资产结构 3.0]]、[[IsaacSimLegacyAssetStructure|Isaac Sim 旧版资产结构]]、[[RTXSensorSimulationPipeline|RTX 传感器仿真流程]]。

## 未解问题与优先补证

格式转换后如何验证单位、关节轴、碰撞与执行器语义？优先收录 glTF／GLB 材质动画规范，其他格式比较暂保留学习笔记状态。

这些是研究问题与验证要求，尚未作为已有结论。沿 [[topics/physics-simulation|物理仿真]] 与 [[topics/assets-and-world-generation|资产与场景生成]] 查看相关研究；基础学习可沿 [[simulation-and-assets-learning-path|学习路径]] 进行。
