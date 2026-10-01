---
title: "USD Terms and Concepts"
type: source
tags: [openusd, source-backed]
sources: []
modified: 2026-09-30
source_file: raw/openusd-glossary.html
source_kind: html
source_url: https://openusd.org/release/glossary.html
extracted_text: graph/extracts/openusd-glossary.md
source_date: unknown
study_topic: syntheses/simulation-and-assets-learning-path
---

# USD Terms and Concepts

## 摘要

OpenUSD 官方术语页，用于查证层、场景、图元、属性、关系、编写意见、强度顺序与属性求值。它补足入门教程的定义边界，适合作为机制参考，而不是线性入门课程。

## 核心主张

- `Layer` 是持久化场景描述容器，包含图元规范及属性／元数据值；`Stage` 始终呈现组合后的场景视图。
- `Prim` 组织子图元与属性，形成命名空间层级；层中的 `PrimSpec` 尚未组合，一个场景图元可能汇集多个规范。
- `Attribute` 具有合法类型、默认值及时间采样值；`Relationship` 持有命名空间目标，组合时可能重映射。
- 定义说明符包括 `def`、`over`、`class`；覆写不会单独创建默认遍历中的已定义图元，类图元用于继承。
- 编写意见是属性求值的基本贡献；层栈由根层及递归子层按强度组成。
- 组合建立图元贡献索引，属性求值从有序贡献位置决定最终属性或元数据值；两者不是同一步。

## 关键引文

> “composed view”

这解释了为什么最终场景不能简单等同某个文本文件。

## 关联

[[USDAFileSyntax|USDA 文件语法]] 将定义落到语法；[[OpenUSDSceneComposition|OpenUSD 场景组合]] 解释组合与求值；[[OpenUSD|OpenUSD]] 是跨来源入口。

## 开放问题

LIVERPS、列表编辑、变体选择和命名空间编辑各需要具体教程与算例。术语页支持定义，不独立证明某个机器人资产组织方案最佳。
