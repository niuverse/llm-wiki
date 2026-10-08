---
title: "3D 资产与场景"
type: "topic"
tags: ["simulation", "source-backed"]
sources: ["[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]", "[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction]]", "[[openusd-introduction]]"]
modified: "2026-10-04"
entry: "research"
nav_order: 5
description: "3D 资产、场景表示与环境生成"
---

# 3D 资产与场景

资产与场景把几何、外观、物理结构和任务语义组织为可执行环境。生成、表示、验证和执行分别需要证据，不能仅凭一段视觉演示判断整个环境可用于训练。

## 阅读地图

- **表示与组合。** [[topics/asset-representation|资产格式与仿真语义]] 串联 [[OpenUSDSceneComposition|OpenUSD Composition]]、[[USDAFileSyntax|USDA 语法]] 与 [[GLTFSceneStructure|glTF 场景结构]]。
- **资产生成。** [[SimulationReady3DWorldGeneration|可用于仿真的世界生成]] 解释从几何外观到物理配置的验收；版本演进见 [[topics/simulation-ready-worlds|EmbodiedGen 两代专题]]。
- **场景与任务。** [[AgenticSceneTaskGeneration|场景与任务生成]] 区分语义条件、空间约束、任务代码与可执行验证。
- **交互与回放。** [[topics/simulation-ready-worlds|Simulation-ready Worlds]] 比较 [[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|MagicSim]] 和生成系统的接口职责。
- **传感器与使用者。** [[RTXSensorSimulationPipeline|RTX 传感器仿真]] 连接观测生成，[[topics/robot-policy-learning|策略学习]] 和 [[topics/evaluation-and-transfer|评测]] 决定环境最终如何使用。

## 当前理解

OpenUSD 提供场景表示与组合语义；EmbodiedGen 两代论文分别给出资产与世界生成流程；MagicSim 描述交互执行与数据接口。这些来源检验的对象不同，不能相互替代：[[openusd-introduction|OpenUSD 介绍]]、[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|EmbodiedGen]]、[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|EmbodiedGen V2]]、[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|MagicSim]]。

## 未解问题与优先补证

哪些检查能够区分视觉合理、碰撞合理、动力学合理与任务可达？生成的物理参数如何接受真实测量约束？格式与执行差异见 [[topics/asset-representation#未解问题与优先补证|资产语义问题]]，生成验收见 [[topics/simulation-ready-worlds#未解问题与优先补证|可执行世界问题]]。
