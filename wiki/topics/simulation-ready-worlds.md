---
title: "Simulation-ready Worlds"
type: "topic"
tags: ["simulation", "source-backed"]
sources: ["[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]", "[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction]]", "[[nvlabs-robolab]]", "[[robotics-simulation-infrastructure]]", "[[mujoco-overview]]", "[[openusd-introduction]]", "[[isaac-sim-asset-structure]]", "[[contact-models-in-robotics-a-comparative-analysis]]", "[[nvidia-ovrtx]]", "[[mujoco-computation-collision-detection]]", "[[modern-robotics-homogeneous-transformations]]", "[[modern-robotics-lagrangian-dynamics]]", "[[tobin-domain-randomization]]", "[[peng-dynamics-randomization]]", "[[simopt-adaptive-randomization]]", "[[isaac-sim-policy-deployment]]"]
modified: "2026-10-08"
description: "沿几何、物理、语义与回放检查生成资产到交互数据的链条。"
---

# Simulation-ready Worlds

沿几何、物理、语义与回放检查生成资产到交互数据的链条。

## 方法与证据

[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|EmbodiedGen]]与[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|EmbodiedGen V2]]组织生成资产与场景验收；[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|MagicSim]]连接世界描述、回合执行、回放与数据输出；[[nvlabs-robolab|RoboLab 仓库]]记录场景任务生成的实现。

**当前判断：**可导入、可执行、可重放和可迁移到真实机器人需要不同验收。应在同一任务里分别记录几何、物理、控制和成功判定，而不是把任一演示作为整条流程有效的证明。论文版本与后来仓库功能分别引用。

## 支撑资料

- [[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|EmbodiedGen: Towards a Generative 3D World Engine for Embodied Intelligence]]
- [[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|EmbodiedGen V2: An Agentic, Simulation-Ready 3D World Engine for Embodied AI]]
- [[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|MagicSim: A Unified Infrastructure for Executable Embodied Interaction]]
- [[nvlabs-robolab|NVlabs/RoboLab]]
- [[robotics-simulation-infrastructure|Robotics Simulation Infrastructure]]

## 机制基础

[[SimulationReady3DWorldGeneration|Simulation-ready 3D Generation]]、[[AgenticSceneTaskGeneration|Agentic Scene Generation]]、[[RoboticsSimulationInfrastructure|机器人仿真基础设施]]。

## EmbodiedGen V1 与 V2

| 问题 | V1 | V2 |
| --- | --- | --- |
| 交付单位 | 带纹理、物理元数据和仿真描述的资产，兼有场景背景 | 资产、可供性、任务场景、多房间世界与编辑状态 |
| 视觉质量 | 生成后检查、多视角纹理与修补 | 继承资产流程，强调几何修复、分离碰撞表示和部署成本 |
| 交互语义 | 主要展示物体与关节化资产可执行 | 部件分割、功能合并、抓取生成及物理验证 |
| 空间组织 | 全景图反投影背景等示例 | 类型化对象树、约束放置、沉降、房间拓扑与家具实例 |
| 修改方式 | 主要生成与导出 | 持久世界状态、类型化技能、有界修改与验证后提交 |
| 主要定量证据 | 150 个杯子上的不可用资产检测 | 资产消融、200 物体可供性、150 任务世界人工验收 |

此表概括各篇实际展示的侧重，不表示 V1 完全没有场景、或 V2 的全部能力已用统一评测验证。章节与数据见 [[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|V1]] 和 [[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|V2]]。

## 把“可仿真”拆成验收条件

[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|EmbodiedGen V2]] 的资产接受、局部抓取、可供性与任务世界检查使用不同对象和判据，不能合并成一个物理正确率。[[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|MagicSim]] 描述回合执行、管理器状态恢复与成功筛选记录；这些机制不等于已经证明跨版本逐位重放、异步吞吐提升或真实部署可靠性，其配套资产统计也不是独立复核。

迁移证据同样分层：[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|AGILE]] 的定量跟踪与操作测试主要在仿真，[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation|VIRAL]] 当前归档项目页提供定性案例，[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors|GRAIL]] 则提供限定物体和任务的真机试验。读者应分别记录接口实现、仿真实验、硬件演示和硬件统计。

## 未解问题与优先补证

生成物理参数如何对照真实测量？如何分别记录资产无效、任务不可达、执行失败及成功过滤率？跨格式导出和重放的一致性需要哪些验收轨迹？

这些是研究问题与验证要求，尚未作为已有结论。沿 [[topics/physics-simulation|物理仿真]] 与 [[topics/assets-and-world-generation|资产与场景生成]] 查看相关研究。
