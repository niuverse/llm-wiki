---
title: "Stage - Learn OpenUSD"
type: source
tags: [openusd, source-backed]
sources: []
modified: 2026-09-30
source_file: raw/learn-openusd-stage.html
source_kind: html
source_url: https://docs.nvidia.com/learn-openusd/latest/stage-setting/stage.html
extracted_text: graph/extracts/learn-openusd-stage.md
source_date: unknown
topics: ["topics/assets-and-world-generation", "topics/asset-representation"]
source_type: tutorial
---

# Stage - Learn OpenUSD

## 摘要

NVIDIA Learn OpenUSD 的场景入门教程。`Stage` 呈现由根文件及引用、层等内容组合得到的场景图，而非单个文件。教程用 Python 演示创建、打开、保存和临时场景，以及根层添加子层。

## 核心主张

- 场景图由图元（`Prim`）组成层级，表示几何、材质、灯光和组织元素。
- `Stage` 可以来自一个文件，也可以由多个资产／层组合；组合支持模块化和非破坏式编辑。
- 基础操作包括 `Usd.Stage.CreateNew()`、`Usd.Stage.Open()`、`stage.Save()` 与 `Usd.Stage.CreateInMemory()`。
- 空 USDA 导出只有格式头；定义 `/World` 后出现 `def Xform "World"`。
- 根层是打开或创建场景的锚点，可以组织不同格式的子层。

## 关键引文

> “Stages aren’t files”

这句话强调组合后的场景与持久化文件的区别。

## 关联

[[USDAFileSyntax|USDA 文件语法]] 使用教程的最小例子；[[OpenUSDSceneComposition|场景组合]] 展开层、图元与求值机制；[[OpenUSD|OpenUSD]] 是跨来源项目入口。

## 开放问题

教程不是完整 USDA 语法规范。Python API 细节应补 `UsdStage` API 参考；术语合读 [[openusd-glossary|OpenUSD 术语与概念]]、[[learn-openusd-file-formats|OpenUSD 文件格式教程]] 和 [[learn-openusd-prim-composition|OpenUSD 图元组合教程]]。

## 研究归属

[[topics/assets-and-world-generation|三维资产与场景生成]] · [[topics/asset-representation|资产格式怎样保留仿真语义]]。
