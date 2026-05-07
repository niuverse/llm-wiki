---
title: "Asset Structure - Isaac Sim 4.5 Documentation"
type: source
tags: [isaac-sim, usd, asset-structure, robot-setup, legacy-assets]
sources: []
last_updated: 2026-05-07
source_file: raw/isaac-sim-45-asset-structure.html
source_kind: html
source_url: https://docs.isaacsim.omniverse.nvidia.com/4.5.0/robot_setup/asset_structure.html
extracted_text: graph/extracts/isaac-sim-45-asset-structure.md
source_date: 2025-09-25
---

# Asset Structure - Isaac Sim 4.5 Documentation

## 摘要

这是 [[NVIDIA]] Isaac Sim 4.5 documentation 中的 Robot Setup / Asset Structure 页面，说明 imported assets 如何按 source asset、transformed optimized asset、feature layers 和 final `asset.usd` 组织。它是 [[IsaacSimLegacyAssetStructure|Isaac Sim legacy / pre-3.0 asset structure]] 的主要证据：页面本身只称为 `Asset Structure`，没有把这套 layout 命名为 `Asset Structure 2.0` 或 `Asset Directory 2.0`。

核心结构是：source 阶段保留 `asset_base.usd`、`parts.usd` 和 `materials.usd`；transformation 阶段生成 simulation-ready 的 `asset_sim_optimized.usd`；physics、sensors、control graphs 和 ROS integration 作为 separate lightweight feature layers 添加；最终 `asset.usd` 用 sublayers、payloads、references 和 variants 组合 simulation asset。

## 核心主张

- Imported assets 被拆成多个 components，以便 manage、reuse 和 simulate；source 示例指向 Isaac Sim assets 中的 `Robots/NVIDIA/Carter/nova_carter/`。
- Asset Source 阶段通常包括 `asset_base.usd`、`parts.usd` 和 `materials.usd`：`asset_base.usd` 保存完整 structural hierarchy，`parts.usd` 保存 individual mesh components，`materials.usd` 保存 PBR materials。
- Source assets 应保持 unchanged，以便 re-import 时不丢失 downstream modifications；structural hierarchy、naming conventions 和 part assemblies 应保持一致。
- Transformation 阶段在 source hierarchy 不满足 simulation 要求时使用：把 nested rigid bodies flatten 成 simple list，分离 visuals/colliders，merge 同一 rigid body 的 meshes，简化 material count，并把 meshes 清理成 instanceable references。
- Features 是叠在 transformed asset 之上的 lightweight layers，例如 `asset_physics.usd`、`asset_sensors.usd`、`asset_control.usd` 和 `asset_ros.usd`。
- Feature authoring workflow 是：新建或打开 feature stage，把 `asset_sim_optimized.usd` 作为 temporary sublayer，引入后只 author feature change，保存前 remove/disable temporary sublayer，再把 feature 加到 final asset；variant set 可以用于 feature switching。
- `asset_physics.usd` 是 source 明确提到的 exception：physics feature 被作为 reference 加到 default prim，而其他 feature 通常作为 payload 添加。
- Final composed asset 是 `asset.usd`：base/optimized asset 作为 sublayer，sensors/control 等作为 payloads，physics setup 作为 reference，variants 用于切换 feature sets；source 还建议 source assets 放独立 folder、features 放 `features/` folder、final asset 放 root folder。

## 关键引文

- “source assets should remain unchanged”
- “asset_sim_optimized.usd”
- “physics feature is an exception”
- “final composed asset is represented in the `asset.usd` file”

## 关联

- [[IsaacSimLegacyAssetStructure]] - 将本 source 编译成 legacy / pre-3.0 asset structure 的机制页，并与 [[IsaacSimAssetStructure|Asset Structure 3.0]] 对照。
- [[IsaacSimAssetStructure]] - Isaac Sim 6.0 EDR docs 中明确命名的 USD Asset Structure 3.0 guidance。
- [[IsaacSim]] - 本 source 对 Isaac Sim 4.5 robot asset organization 的描述。
- [[NVIDIA]] - source publisher 与 Isaac Sim documentation owner。
- [[OpenUSD]] - 本 source 使用 USD sublayers、payloads、references 和 variants 组织 simulation asset。

## 开放问题

- 当前没有官方证据支持把这套 Isaac Sim 4.5 layout 称为 `Asset Structure 2.0`；除非后续找到明确 source，否则应称为 `legacy`、`pre-3.0` 或 `Isaac Sim 4.5 Asset Structure`。
- Source 说明 importer 默认 follow this structure，但没有给出完整 importer output validation checklist；后续如果需要迁移旧 asset 到 3.0，应补充 Asset Transformer / importer rules source。
- 这页没有把 `asset_physics.usd` 继续拆成 neutral physics、MuJoCo-specific tuning 和 PhysX-specific tuning；multi-runtime separation 需要以 [[isaac-sim-asset-structure|Isaac Sim 6.0 Asset Structure]] 为证据。
