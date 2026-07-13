---
title: "Asset Structure - Isaac Sim Documentation"
type: source
tags: [isaac-sim, usd, asset-structure, robot-setup]
sources: []
last_updated: 2026-07-13
source_file: raw/isaac-sim-6-asset-structure.html
source_kind: html
source_url: https://docs.isaacsim.omniverse.nvidia.com/6.0.0/robot_setup/asset_structure.html
extracted_text: graph/extracts/isaac-sim-6-asset-structure.md
source_date: 2026-03-18
---

# Asset Structure - Isaac Sim Documentation

## 摘要

这是 [[NVIDIA]] Isaac Sim 6.0 文档中的机器人设置 / 资产结构页面，说明导入的机器人资产如何按 USD 组件分层组织，以便审查、reuse、仿真和多运行时调优。页面本身标注为 Isaac Sim 6.0 早期开发者发布，且说明该版本文档 incomplete；因此本页应视为 Isaac Sim 6.0 EDR / USD 资产结构 3.0 的官方设计意图，而不是 GA 发布行为的最终保证。

核心思想是把一个机器人资产拆成来源/几何/材质/实例/物理/机器人/结构规范/控制/ROS/末端执行器等职责明确的 USD 层，再用子层、参考资料、载荷和变体组合成最终可加载资产。这个结构服务两个目标：一是让原始导入的来源可以保持不变并可重新导入；二是让 [[MuJoCo]]、PhysX、USD / Newton 等运行时特定的物理调优不互相污染。

## 核心主张

- 导入的资产被组织成多个组件，例如 geometries、材质、instances、物理和机器人；这种拆分让资产更容易管理、复用和仿真。
- 资产来源阶段通常包括 `base.usda`、`geometries.usdc`、`instances.usda`、`materials.usda`、`physics.usd`、`mujoco.usda`、`physx.usda` 和 `robot.usda`。
- `geometries.usdc` 应只放网格拓扑 / 顶点数据；`materials.usda` 放材质图元和着色器 bindings；`instances.usda` 把几何、材质和碰撞体组合成视觉 / 碰撞网格。
- `physics.usda` 或 `physics.usd` 表示中性 USD / Newton 物理层；`mujoco.usda` 和 `physx.usda` 分别承载引擎特定的属性和调优。
- 来源资产应保持未改变，便于 re-导入；当来源层级不适合仿真时，Transformation 阶段会 flatten nested 刚体、整理 visuals/碰撞体，并把网格做实例化友好的优化。
- 特征是叠加在转换后的资产上的轻量的层，例如物理设置、传感器配置、控制 graphs、ROS 集成和 gripper 技术栈。
- Adding/modifying 特征的工作流是：把 optimized 资产作为 temporary sub-层引入特征阶段，作者特征后保存前断开 sub-层，再把特征作为载荷加入最终资产；变体可用于运行时特征 switching。
- 机器人结构规范被描述为与仿真资产结构解耦的机器人结构描述，并且必须作为子层包含在机器人资产中。

## 关键引文

- “source assets must remain unchanged”
- “Isolate attributes for different physics engines”
- “Use of layers, payloads, and variants”
- “final composed asset is represented in the `asset.usd` file”
- “mirrors USD Asset Structure 3.0 guidance”

## 关联

- [[IsaacSimAssetStructure]] - 把本来源编译成资产结构 3.0 的学习页和实践检查表。
- [[IsaacSimLegacyAssetStructure]] - 与 Isaac Sim 4.5 旧版 / pre-3.0 布局对照，避免把旧布局误称为 2.0。
- [[IsaacSim]] - 本来源对 Isaac Sim 6.0 EDR 机器人资产组织的描述。
- [[NVIDIA]] - 来源 publisher 与 Isaac Sim 文档 owner。
- [[MuJoCo]] - 本来源将 MuJoCo-特定的调优隔离到 `mujoco.usda` 层。
- [[SimulationRealityGap]] - 多运行时资产结构能减少制作 clash，但不能单独证明物理运行时与真实机器人一致。

## 开放问题

- 来源在不同段落中同时使用 `physics.usd` 与 `physics.usda`，以及 `asset.usd` 与 `interface.usda` 两种最终入口 naming；学习时应先抓住层角色，再在具体 Isaac Sim 构建 / 导入器输出中确认实际文件名称。
- 页面属于 Isaac Sim 6.0 早期开发者发布文档；GA 发布后需要复查文档、导入器输出和资产 Transformer 行为是否发生变化。
- 本来源给出结构和工作流，但没有提供完整验证 checklist；后续可收录机器人结构规范、资产 Transformer Rules 参考、资产验证和 Instanceable 资产文档来补齐。
