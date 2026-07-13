---
title: "Asset Structure - Isaac Sim 4.5 Documentation"
type: source
tags: [isaac-sim, usd, asset-structure, robot-setup, legacy-assets]
sources: []
last_updated: 2026-07-13
source_file: raw/isaac-sim-45-asset-structure.html
source_kind: html
source_url: https://docs.isaacsim.omniverse.nvidia.com/4.5.0/robot_setup/asset_structure.html
extracted_text: graph/extracts/isaac-sim-45-asset-structure.md
source_date: 2025-09-25
---

# Asset Structure - Isaac Sim 4.5 Documentation

## 摘要

这是 [[NVIDIA]] Isaac Sim 4.5 文档中的机器人设置 / 资产结构页面，说明导入的资产如何按来源资产、转换后的 optimized 资产、特征层和最终 `asset.usd` 组织。它是 [[IsaacSimLegacyAssetStructure|Isaac Sim 旧版 / pre-3.0 资产结构]] 的主要证据：页面本身只称为 `Asset Structure`，没有把这套布局命名为 `Asset Structure 2.0` 或 `Asset Directory 2.0`。

核心结构是：来源阶段保留 `asset_base.usd`、`parts.usd` 和 `materials.usd`；transformation 阶段生成可用于仿真的 `asset_sim_optimized.usd`；物理、传感器、控制 graphs 和 ROS 集成作为 separate 轻量的特征层添加；最终 `asset.usd` 用子层、载荷、参考资料和变体组合仿真资产。

## 核心主张

- 导入的资产被拆成多个组件，以便 manage、reuse 和 simulate；来源示例指向 Isaac Sim 资产中的 `Robots/NVIDIA/Carter/nova_carter/`。
- 资产来源阶段通常包括 `asset_base.usd`、`parts.usd` 和 `materials.usd`：`asset_base.usd` 保存完整结构性的层级，`parts.usd` 保存单独的网格组件，`materials.usd` 保存 PBR 材质。
- 来源资产应保持未改变，以便 re-导入时不丢失下游 modifications；结构性的层级、naming conventions 和部件 assemblies 应保持一致。
- Transformation 阶段在来源层级不满足仿真要求时使用：把 nested 刚体 flatten 成简单列表，分离 visuals/碰撞体，merge 同一刚体的网格，简化材质数量，并把网格清理成 instanceable 参考资料。
- 特征是叠在转换后的资产之上的轻量的层，例如 `asset_physics.usd`、`asset_sensors.usd`、`asset_control.usd` 和 `asset_ros.usd`。
- 特征制作工作流是：新建或打开特征阶段，把 `asset_sim_optimized.usd` 作为 temporary 子层，引入后只作者特征 change，保存前 remove/disable temporary 子层，再把特征加到最终资产；变体集合可以用于特征 switching。
- `asset_physics.usd` 是来源明确提到的 exception：物理特征被作为参考加到默认图元，而其他特征通常作为载荷添加。
- 最终组合的资产是 `asset.usd`：基座/optimized 资产作为子层，传感器/控制等作为载荷，物理设置作为参考，变体用于切换特征 sets；来源还建议来源资产放独立文件夹、特征放 `features/` 文件夹、最终资产放根部文件夹。

## 关键引文

- “source assets should remain unchanged”
- “asset_sim_optimized.usd”
- “physics feature is an exception”
- “final composed asset is represented in the `asset.usd` file”

## 关联

- [[IsaacSimLegacyAssetStructure]] - 将本来源编译成旧版 / pre-3.0 资产结构的机制页，并与 [[IsaacSimAssetStructure|资产结构 3.0]] 对照。
- [[IsaacSimAssetStructure]] - Isaac Sim 6.0 EDR 文档中明确命名的 USD 资产结构 3.0 指南。
- [[IsaacSim]] - 本来源对 Isaac Sim 4.5 机器人资产组织的描述。
- [[NVIDIA]] - 来源 publisher 与 Isaac Sim 文档 owner。
- [[OpenUSD]] - 本来源使用 USD 子层、载荷、参考资料和变体组织仿真资产。

## 开放问题

- 当前没有官方证据支持把这套 Isaac Sim 4.5 布局称为 `Asset Structure 2.0`；除非后续找到明确来源，否则应称为 `legacy`、`pre-3.0` 或 `Isaac Sim 4.5 Asset Structure`。
- 来源说明导入器默认 follow this 结构，但没有给出完整导入器输出验证 checklist；后续如果需要迁移旧资产到 3.0，应补充资产 Transformer / 导入器 rules 来源。
- 这页没有把 `asset_physics.usd` 继续拆成中性物理、MuJoCo-特定的调优和 PhysX-特定的调优；多运行时分离需要以 [[isaac-sim-asset-structure|Isaac Sim 6.0 Asset Structure]] 为证据。
