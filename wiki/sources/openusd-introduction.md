---
title: "Introduction to USD"
type: source
tags: [openusd, usd, scene-description, composition, hydra]
sources: []
last_updated: 2026-05-01
source_file: raw/openusd-introduction.html
source_kind: html
source_url: https://openusd.org/release/intro.html
extracted_text: graph/extracts/openusd-introduction.md
source_date: unknown
---

# Introduction to USD

## 摘要

这是 OpenUSD / Universal Scene Description 官方文档中的 Introduction to USD 页面。它比 release home page 更适合作为入门 source：页面从 scene description 的 pipeline problem 出发，解释 USD 为什么不只是 interchange format，而是 single scenegraph、composition engine、schemas、toolset、Hydra imaging 和 plugin extension points 的组合。

Source 的中心判断是：大型 3D production pipeline 会产生大量由 modeling、shading、animation、lighting、fx、rendering 等应用共同生成的 scene description；USD 的目标是让这些 3D scenes 能 robustly、scalably interchange、augment、assemble、organize 和 non-destructively edit。它把 low-level data model、high-level schemas、composition arcs 和 Stage runtime evaluation 结合起来，让 assets 可以 package、aggregate、vary、override，并在一个 composed scene description 中被查询和 author。

## 核心主张

- USD 解决的核心问题是 arbitrary 3D scenes 的 robust/scalable interchange 与 augmentation；它支持把 elemental assets 组合成 virtual sets、scenes、shots 和 worlds，并在 single scenegraph 中 non-destructively edit as overrides。
- USD 的 core scenegraph 和 composition engine 与具体 domain 解耦，因此可以扩展到 graphics 之外的其他 data domains；source 也明确把 geometry、shading、lighting、physics 作为 toolset 覆盖的 graphics-related domains。
- USD 提供 low-level data model 和 extensible high-level schemas；schemas 给 mesh、transform、material、lighting 等概念提供 standard encoding 和 client API。
- `Stage` 是 high-performance runtime evaluation engine 暴露的 compact scenegraph，用于 resolve composed scene description，并从中 extract / author data。
- `Layer` 支持多人协作：不同 artists / departments 可以在各自 layer 中 author data，再按 strength ordering resolve，避免互相覆盖并保留 audit trail。
- USD 的基本 data model 是 hierarchical namespace of `Prim`；prim 可以包含 child prims、Attributes、Relationships 和 metadata；prims 和 contents 组织在 Layer 中。
- Composition semantics 包括 subLayers、references、payloads、VariantSets、inherits 和 specializes；这些 operators 可以组合使用，并由 composition engine 以 predictable way resolve。
- Stronger layers 可以 uniform override weaker scene description：包括添加/deactivate/reorder prims、修改 variants、metadata、properties、attributes、relationships / connections 等。
- Hydra 是 USD distribution 中的 imaging framework，连接 scene delegates 与 render delegates；`usdview` 和许多第三方插件通过 USD scene delegate 使用 Hydra 做 preview / rendering。
- USD 的 extension points 包括 Asset Resolution、File Formats 和 Schemas；source 说明 `ArResolver`、`SdfFileFormat` plugin 和 schema generation 都是可扩展机制。
- USD 的边界也很明确：它使用 textual hierarchical namespace 而不是 GUID；namespace changes 可能让 higher-level overrides fall off。USD 也不是 high-performance rigging system，scenegraph 更偏 lightweight authoring / composed data extraction。

## 关键引文

- “single, consistent API”
- “single scenegraph”
- “composed scene description”
- “non-destructively”
- “No GUIDS”
- “Not a rigging system”

## 关联

- [[OpenUSD]] - 本 source 对 USD / OpenUSD 的机制级定义。
- [[OpenUSDSceneComposition]] - 把 `Stage`、`Layer`、`Prim`、schemas、composition arcs 和 failure modes 编译成学习页。
- [[IsaacSimAssetStructure]] - robotics / simulation asset authoring 中，USD composition 的具体应用。
- [[Pixar]] - source 中的 USD heritage、production context 和 copyright holder。

## 开放问题

- 本 source 给出 compact introduction，但很多术语仍链接到 glossary；后续应 ingest `glossary.html` 来补齐 `Stage`、`Prim`、`LayerStack`、LIVRPS strength ordering、value resolution、payload loading 等精确定义。
- Robotics / simulation 方向还需要 ingest OpenUSD physics schema、Rigid Body Physics proposal、Isaac Sim Robot Schema / Asset Validation docs，才能把 general USD composition 与 simulator semantics 更严密地连接起来。
- Source 说明 USD 不是 rigging system，但提到 OpenExec computation engine；如果学习目标涉及 procedural computation、constraint solving 或 animation rigging，需要单独 ingest `intro_to_openexec.html`。
