---
title: "Introduction to USD"
type: source
tags: [openusd, usd, scene-description, composition, hydra]
sources: []
last_updated: 2026-07-13
source_file: raw/openusd-introduction.html
source_kind: html
source_url: https://openusd.org/release/intro.html
extracted_text: graph/extracts/openusd-introduction.md
source_date: unknown
---

# Introduction to USD

## 摘要

这是 OpenUSD / 通用的场景描述官方文档中的 Introduction 到 USD 页面。它比发布 home 页面更适合作为入门来源：页面从场景描述的流程问题出发，解释 USD 为什么不只是交换格式，而是单一场景图、组合引擎、结构规范、toolset、Hydra imaging 和插件 extension 点的组合。

来源的中心判断是：大型 3D 生产流程会产生大量由建模、shading、动画、光照、fx、渲染等应用共同生成的场景描述；USD 的目标是让这些 3D 场景能稳健地、可扩展地交换、augment、assemble、organize 和非破坏性地编辑。它把底层数据模型、高层结构规范、组合弧和阶段运行时评估结合起来，让资产可以软件包、汇总、vary、覆写，并在一个组合的场景描述中被查询和作者。

## 核心主张

- USD 解决的核心问题是 arbitrary 3D 场景的 robust/可扩展的交换与扩充；它支持把基础的资产组合成虚拟的 sets、场景、镜头和 worlds，并在单一场景图中非破坏性地编辑作为覆写。
- USD 的 core 场景图和组合引擎与具体域解耦，因此可以扩展到 graphics 之外的其他数据 domains；来源也明确把几何、shading、光照、物理作为 toolset 覆盖的 graphics-相关的 domains。
- USD 提供底层数据模型和 extensible 高层结构规范；结构规范给网格、变换、材质、光照等概念提供 standard 编码和客户端 API。
- `Stage` 是高性能运行时评估引擎暴露的 compact 场景图，用于 resolve 组合的场景描述，并从中 extract / 作者数据。
- `Layer` 支持多人协作：不同 artists / departments 可以在各自层中作者数据，再按 strength 顺序 resolve，避免互相覆盖并保留 audit trail。
- USD 的基本数据模型是 hierarchical namespace 的 `Prim`；图元可以包含 child 图元、属性、关系和元数据；图元和 contents 组织在层中。
- 组合语义包括子层、参考资料、载荷、VariantSets、inherits 和 specializes；这些 operators 可以组合使用，并由组合引擎以 predictable way resolve。
- 更强的层可以均匀覆写更弱的场景描述：包括添加/停用/重排图元、修改变体、元数据、属性、属性、关系 / 连接等。
- Hydra 是 USD 分布中的 imaging 框架，连接场景 delegates 与渲染 delegates；`usdview` 和许多第三方插件通过 USD 场景 delegate 使用 Hydra 做预览 / 渲染。
- USD 的 extension 点包括资产分辨率、文件格式和结构规范；来源说明 `ArResolver`、`SdfFileFormat` 插件和结构规范生成都是可扩展机制。
- USD 的边界也很明确：它使用 textual hierarchical namespace 而不是 GUID；namespace changes 可能让更高的层级覆写 fall off。USD 也不是高性能骨骼绑定系统，场景图更偏轻量的制作 / 组合的数据 extraction。

## 关键引文

- “single, consistent API”
- “single scenegraph”
- “composed scene description”
- “non-destructively”
- “No GUIDS”
- “Not a rigging system”

## 关联

- [[OpenUSD]] - 本来源对 USD / OpenUSD 的机制级定义。
- [[OpenUSDSceneComposition]] - 把 `Stage`、`Layer`、`Prim`、结构规范、组合弧和失效情形编译成学习页。
- [[IsaacSimAssetStructure]] - 机器人学 / 仿真资产制作中，USD 组合的具体应用。
- [[Pixar]] - 来源中的 USD 历史传承、生产上下文和版权所有者。

## 开放问题

- 本来源给出 compact introduction，但很多术语仍链接到 glossary；后续应收录 `glossary.html` 来补齐 `Stage`、`Prim`、`LayerStack`、LIVRPS strength 顺序、价值分辨率、载荷 loading 等精确定义。
- 机器人学 / 仿真方向还需要收录 OpenUSD 物理结构规范、刚性机体物理 proposal、Isaac Sim 机器人结构规范 / 资产验证文档，才能把一般性 USD 组合与仿真器语义更严密地连接起来。
- 来源说明 USD 不是骨骼绑定系统，但提到 OpenExec computation 引擎；如果学习目标涉及过程推理 computation、约束求解或动画骨骼绑定，需要单独收录 `intro_to_openexec.html`。
