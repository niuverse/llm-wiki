---
title: "OpenUSD"
type: entity
tags: [openusd, usd, scene-description, software-platform]
sources: ["[[openusd-introduction]]", "[[isaac-sim-asset-structure]]"]
last_updated: 2026-05-01
---

# OpenUSD

OpenUSD / USD（Universal Scene Description）在 [[openusd-introduction|Introduction to USD]] 中被定位为用于 robustly and scalably interchange / augment arbitrary 3D scenes 的 open source scene-description system。它不是单纯的 interchange file format：source 强调 USD 可以 assembly / organize assets into sets、scenes、shots、worlds，并在 single scenegraph 中 non-destructively edit as overrides。

机制上，OpenUSD 由 low-level data model、high-level schemas、composition arcs、Stage runtime evaluation、toolset、Hydra imaging 和 plugin extension points 组成。Data model 用 hierarchical namespace of `Prim` 表示 scene；prim 可以包含 Attributes、Relationships 和 metadata；contents 被组织在 `Layer` 中。Schemas 给 mesh、transform、material、lighting、physics 等 domain 提供 standard encoding 和 client API。Composition arcs 则用于 package、aggregate、vary 和 override assets。

在本 wiki 的 robotics context 中，OpenUSD 的直接意义来自 [[IsaacSimAssetStructure]]：robot asset 可以被组织成 geometry、material、instance、physics、runtime tuning、robot schema 和 feature layers，再通过 payloads、references 和 variants 组合成 final simulation asset。也就是说，OpenUSD 不只是保存 mesh 的容器，而是 simulation asset assumptions 的组织方式。

当前 evidence boundary：本页只记录已 ingest sources 覆盖的 OpenUSD Introduction 与 Isaac Sim asset-structure 用法。`LayerStack`、value resolution、namespace editing、LIVRPS strength ordering、OpenUSD physics schema、toolset command behavior 和 Python API 需要后续 ingest Terms and Concepts、Tutorials 或 API docs 后再扩展。

相关页面：[[OpenUSDSceneComposition]]、[[IsaacSimAssetStructure]]、[[IsaacSim]]、[[Pixar]]。
