---
title: "3D 资产格式"
type: "topic"
tags: ["simulation", "source-backed"]
sources: ["[[openusd-introduction]]", "[[openusd-glossary]]", "[[learn-openusd-stage]]", "[[learn-openusd-file-formats]]", "[[learn-openusd-prim-composition]]", "[[gltf-basic-structure]]", "[[isaac-sim-asset-structure]]", "[[isaac-sim-45-asset-structure]]", "[[nvidia-ovrtx]]", "[[mujoco-overview]]"]
modified: "2026-10-08"
description: "区分文件表示、场景组合、物理配置与传感器输出。"
---

# 3D 资产格式

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

[[OpenUSDSceneComposition|OpenUSD Composition]]、[[USDAFileSyntax|USDA 文件语法]]、[[GLTFSceneStructure|glTF 场景与数据结构]]、[[IsaacSimAssetStructure|Isaac Sim 资产结构 3.0]]、[[IsaacSimLegacyAssetStructure|Isaac Sim 旧版资产结构]]、[[RTXSensorSimulationPipeline|RTX 传感器仿真流程]]。

## 格式比较

下表未标明来源的行均为**无来源学习笔记**，用于形成问题，不替代规范。

| 格式 | 应重点核对的语义 | 典型用途 |
| --- | --- | --- |
| OBJ、STL、PLY | 网格、法向、顶点属性、材质引用、单位约定 | 几何交换、扫描与制造 |
| glTF | 场景节点、网格、访问器、缓冲区；见 [[GLTFSceneStructure|glTF 场景与数据结构]] | 渲染与运行时资产结构 |
| GLB | glTF 二进制容器、外部资源与打包规则，待规范验证 | 单文件交付 |
| FBX | 骨骼、蒙皮、动画曲线、坐标轴与导入器差异 | 动画资产交换 |
| USD、USDA、USDC | 层、组合、结构规范与属性求值；见 [[OpenUSDSceneComposition|OpenUSD Composition]] | 场景协作与非破坏式覆写 |
| USDZ | USD 打包约束与资源路径，见 [[learn-openusd-file-formats|OpenUSD 文件格式教程]] | 资产分发与预览 |
| STEP、IGES | 工程几何、边界表示与网格离散化 | CAD 到渲染／仿真 |
| 3MF | 制造元数据与打包规则 | 三维打印交付 |
| URDF、SDF | 连杆、关节、碰撞、惯量、世界与传感器语义 | 机器人／世界描述 |
| MJCF | MuJoCo 模型对象、执行器与编译语义；见 [[mujoco-overview|MuJoCo 总览]] | MuJoCo 控制与学习实验 |

### 网格与场景

网格描述局部形状；场景描述对象的组织与变换。glTF 的节点树和网格引用给出一个具体例子；USD 进一步提供层组合与覆写机制。两者的组织目标不同，不能仅比较“是否保存了顶点”。[[GLTFSceneStructure|glTF 场景与数据结构]]、[[OpenUSDSceneComposition|OpenUSD Composition]]

### 视觉与碰撞

视觉网格决定外观，碰撞体决定接触输入。高面数外观不保证正确碰撞；把手凹度是否保留可能改变可抓取性。更完整的来源和失效分析见 [[CollisionGeometryForRobotSimulation|机器人仿真的碰撞几何]]、[[ApproximateConvexDecomposition|Approximate Convex Decomposition]]。

## 检查一个资产

检查建议：选一个抽屉或机械臂，记录制作文件、导出文件、视觉网格、碰撞体、单位、关节轴、惯量与驱动参数；分别验证“能显示”“能接触”“能按指令运动”。若资产只在第一项通过，继续定位缺失语义，而不是只换文件后缀。

## 未解问题与优先补证

格式转换后如何验证单位、关节轴、碰撞与执行器语义？优先收录 glTF／GLB 材质动画规范，其他格式比较暂保留学习笔记状态。

这些是研究问题与验证要求，尚未作为已有结论。沿 [[topics/physics-simulation|物理仿真]] 与 [[topics/assets-and-world-generation|资产与场景生成]] 查看相关研究。
