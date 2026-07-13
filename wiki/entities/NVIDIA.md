---
title: "NVIDIA"
type: entity
tags: [organization, robotics, simulation]
sources: ["[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]", "[[isaac-sim-45-asset-structure]]", "[[isaac-sim-asset-structure]]", "[[omniverse-omni-physics-articulations]]", "[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation]]", "[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors]]", "[[nvidia-ovrtx]]"]
last_updated: 2026-07-13
---

# NVIDIA

NVIDIA 是 [[RoboLab]] 论文、项目与代码仓库的发布机构，也是 [[isaac-sim-45-asset-structure|Isaac Sim 4.5 资产结构]]、[[isaac-sim-asset-structure|Isaac Sim 6.0 资产结构]]、[[omniverse-omni-physics-articulations|关节系统 - Omni 物理]] 与 [[nvidia-ovrtx|NVIDIA ovrtx]] 的发布方。RoboLab 来源涉及 NVIDIA Isaac Lab、Isaac Sim、Omniverse EULA、NVlabs GitHub 组织和仿真与机器人学实验室项目主页；Isaac Sim 4.5 来源描述 3.0 之前的旧版机器人资产布局；Isaac Sim 6.0 来源把机器人资产拆成几何、材质、实例、物理、运行时、结构规范和特征层；Omni 物理关节系统来源则记录 [[PhysX]] 约化坐标关节系统、驱动器性能包络、关节摩擦、随动关节和肌腱；ovrtx 来源把 Omniverse RTX 传感器仿真暴露为 C/Python SDK、OpenUSD 运行时阶段、RenderProduct/RenderVar 输出契约和 DLPack 张量映射。[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation|VIRAL 项目主页]] 把 NVlabs `GR00T-VisualSim2Real` 代码仓库列为关联实现；[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors|GRAIL]] 则把 NVIDIA 研究上下文扩展到资产条件化的人形机器人数据生成。本页只记录与当前知识库来源相关的信息，不扩展到 NVIDIA 的公司历史。

## 关联

- [[RoboLab]] - NVIDIA 发布的高保真度仿真基准用于任务通用型机器人策略。
- [[nvlabs-robolab]] - NVlabs 官方实现代码仓库。
- [[IsaacSim]] - NVIDIA 机器人学仿真技术栈；当前有来源支持的覆盖范围包括旧版 / pre-3.0 资产结构、资产结构 3.0 与 Omni 物理关节系统。
- [[PhysX]] - NVIDIA 物理运行时 / SDK 族；当前知识库覆盖范围聚焦关节系统语义。
- [[Ovrtx]] - NVIDIA Omniverse RTX 的 C/Python 传感器仿真 SDK。
- [[SimulationRealityGap]] - RoboLab 使用 NVIDIA 仿真技术栈作为分析现实世界策略的诊断代理。
- [[VIRAL]] - 来源页链接到 an NVlabs code 代码仓库用于视觉仿真到现实迁移人形机器人移动操作。
- [[GRAIL]] - NVIDIA 研究来源中的完全 digital 人形机器人移动操作数据生成框架。
