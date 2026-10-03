---
title: "OpenUSD File Formats - Learn OpenUSD"
type: source
tags: [openusd, source-backed]
sources: []
modified: 2026-09-30
source_file: raw/learn-openusd-file-formats.html
source_kind: html
source_url: https://docs.nvidia.com/learn-openusd/latest/stage-setting/usd-file-formats.html
extracted_text: graph/extracts/learn-openusd-file-formats.md
source_date: unknown
topics: ["topics/assets-and-world-generation", "topics/asset-representation"]
source_type: tutorial
---

# OpenUSD File Formats - Learn OpenUSD

## 摘要

NVIDIA Learn OpenUSD 解释 `.usd`、`.usda`、`.usdc` 和 `.usdz` 的差别：USDA 为可读文本，USDC 为二进制 crate，`.usd` 可承载任一种编码，USDZ 为交付而打包。格式选择关系到编辑、加载、存储和审查。

## 核心主张

- USDA 为 ASCII 文本，适合人工编辑、检查、小接口层、调试与差异比较。
- USDC 更适合几何等大量数值数据，以改善存储与加载；生产建议倾向于重数据用 crate，小可读层用文本。
- `.usd` 允许底层编码变化而不改变引用扩展名，也可能掩盖巨大文本文件的成本。
- USDZ 是不压缩的 ZIP 归档，用于完整资产交付，通常不适合作为持续编辑中的资产形式。

## 关键引文

> “prefer crate files”

建议针对生产数据的存储选择，不意味着文本格式没有用途。

## 关联

[[USDAFileSyntax|USDA 文件语法]] 解释文本层的语义；[[OpenUSDSceneComposition|OpenUSD 场景组合]] 将格式放回场景组合；[[OpenUSD|OpenUSD]] 汇总项目来源。

## 开放问题

这是入门教程，不是完整 USDA 文法；细粒度语法仍需 `Sdf` API 与官方参考。后续补 `usdcat`、`usdedit`、`usdview` 文档，连接格式选择与调试。

## 研究归属

[[topics/assets-and-world-generation|三维资产与场景生成]] · [[topics/asset-representation|资产格式怎样保留仿真语义]]。
