---
title: "USDA 文件语法"
type: concept
tags: [openusd, usda, syntax, scene-description, composition]
sources: ["[[learn-openusd-stage]]", "[[learn-openusd-file-formats]]", "[[learn-openusd-prim-composition]]", "[[openusd-glossary]]", "[[openusd-introduction]]"]
modified: 2026-09-30
topics: ["topics/assets-and-world-generation", "topics/asset-representation"]
---

# USDA 文件语法

USDA 是 OpenUSD 的可读文本层格式。读 `.usda` 时，应把文本视为一个层（`Layer`）中的图元规范、属性和元数据意见；最终场景（`Stage`）来自多个层的组合及属性求值。文件文本与最终场景不是同一对象。[[learn-openusd-file-formats|OpenUSD 文件格式教程]]、[[learn-openusd-stage|OpenUSD 场景教程]]、[[learn-openusd-prim-composition|OpenUSD 图元组合教程]]、[[openusd-glossary|OpenUSD 术语与概念]]

## 数学结构

用教学记号表示一个文本层：

$$
L_{\mathrm{usda}}=(M,\{Q_i\},\{E_j\}),\qquad
S=\operatorname{Compose}(L_0,\ldots,L_n).
$$

$M$ 为层元数据，$Q_i$ 为图元／属性规范，$E_j$ 为组合弧，$S$ 为组合后的场景。这是帮助阅读的抽象，不是 OpenUSD API 的函数签名。组合先建立图元的贡献索引，属性求值再从按强弱排序的贡献中取最终值：

$$
a^\star=\operatorname{ResolveValue}(a,\operatorname{PrimIndex}(P)).
$$

$P$ 为组合图元，$a$ 为属性，$a^\star$ 为最终值。`PrimIndex` 表示组合算法找到的贡献位置；并非只从眼前这个文件读一个赋值。[[openusd-glossary|OpenUSD 术语与概念]]、[[OpenUSDSceneComposition|OpenUSD Composition]]

## 最小读法

空层导出后可以只有 `#usda 1.0`。定义 `/World` 后：

```usda
#usda 1.0

def Xform "World"
{
}
```

`def` 是定义说明符，`Xform` 是结构规范类型名，`"World"` 是图元名，命名空间层级决定路径 `/World`。大括号容纳子图元、属性和关系。[[learn-openusd-stage|OpenUSD 场景教程]]、[[openusd-glossary|OpenUSD 术语与概念]]

层元数据与子层示例：

```usda
#usda 1.0
(
    defaultPrim = "World"
    subLayers = [
        @./geometry.usdc@
    ]
)

def Xform "World"
{
}
```

圆括号中的内容属于层元数据；`@...@` 表示资产路径；`subLayers` 把另一个层纳入当前层栈。Learn OpenUSD 的 Stage 教程演示了根层添加子层，以及不同文件格式的层可以参与组合。[[learn-openusd-stage|OpenUSD 场景教程]]

## 语法与语义对照

| 文本 | 应怎样理解 |
| --- | --- |
| `def Xform "World"` | 定义图元规范 |
| `over "World"` | 在较强层中稀疏覆写；没有较弱定义时，通常不成为默认遍历中的已定义图元 |
| `class Xform "Template"` | 供继承组合弧复用的类图元 |
| `double radius = 1` | 在当前层编写一个有类型的属性值意见 |
| `rel material:binding = </Looks/Mat>` | 关系目标是命名空间路径，组合时可能重映射 |
| `subLayers = [@a.usda@]` | 将层加入层栈 |
| `references = @asset.usd@` | 通过引用组合外部资产的图元层级 |

表中的说明由 [[openusd-glossary|OpenUSD 术语与概念]] 与 [[learn-openusd-prim-composition|OpenUSD 图元组合教程]] 支持；它不是完整语法规范，复杂列表编辑还需单独参考。

## 直觉

调试时问三个问题：意见写在哪一层？它是否最强？它通过哪条组合弧进入当前图元？同一个属性在多个文件出现并不矛盾，可能是不同强度的意见。创建新场景通常先定义图元，修改已有资产则可用覆写层只编写需要改变的内容。[[OpenUSDSceneComposition|OpenUSD Composition]]

USDA 适合小接口层、审查和差异比较；大量网格、拓扑与密集动画数值更适合 USDC。`.usd` 扩展名本身不能区分文本与二进制；`.usdz` 负责打包交付。[[learn-openusd-file-formats|OpenUSD 文件格式教程]]

## 失效情形

把编写意见当作最终值、期待单独的 `over` 创建普通已定义图元、以及将重数值数据长期存成巨大文本层，都违背上述语义或格式建议。路径改动还可能影响关系、引用和覆写目标。[[openusd-glossary|OpenUSD 术语与概念]]、[[learn-openusd-file-formats|OpenUSD 文件格式教程]]

把几何、材质、物理和引擎调优拆到明确负责的层，是 [[IsaacSimAssetStructure|资产组织]] 支持的实践方式；它便于定位修改，但不是 USDA 语法强制的目录规则。

## 实践含义

练习：先用 `Usd.Stage.CreateNew()` 创建空层，再 `DefinePrim("/World", "Xform")`；逐步加属性、关系、子层与引用，每步用 `ExportToString()` 或 `usdcat` 对照文本。这是依照教程整理的学习安排。

阅读顺序：[[learn-openusd-stage|场景入门]] → [[learn-openusd-prim-composition|图元组合]] → [[openusd-glossary|术语与求值]] → [[IsaacSimAssetStructure|机器人资产分层]]。

## 研究归属

[[topics/assets-and-world-generation|3D 资产与场景]] · [[topics/asset-representation|3D 资产格式]]。
