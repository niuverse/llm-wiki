---
title: "AwesomeWorldModels"
type: source
tags: [embodied-ai, world-models, bibliography, github]
sources: []
last_updated: 2026-04-27
source_file: raw/awesome-world-models-readme.md
source_kind: repo
source_url: https://github.com/Li-Zn-H/AwesomeWorldModels
source_metadata: raw/awesome-world-models-main-commit.json
extracted_text: graph/extracts/awesome-world-models-readme.md
source_date: 2026-03-28
---

## 摘要

[[AwesomeWorldModels]] 是论文 [[a-comprehensive-survey-on-world-models-for-embodied-ai|A Comprehensive Survey on World Models for Embodied AI]] 的 companion GitHub repository。它不是 algorithm implementation，而是按照 survey taxonomy 维护的 curated bibliography。README 把 world models 描述为 environmental dynamics 的 internal simulators，并用 domain icons 标记 Autonomous Driving、Robotic Manipulation、Navigation 和 Video Generation。

本次 ingest 抓取的 README 为 UTF-16LE Markdown，包含 193 条 paper entries。仓库 main branch 的 commit metadata 也保存为 `raw/awesome-world-models-main-commit.json`，其中 main commit 是 `a512d22526a75974e5fc18da9c09017cd16dfa27`，author date 为 2026-03-28。

Source URL: https://github.com/Li-Zn-H/AwesomeWorldModels

## 核心主张

- Repository 的功能是把 world model literature 映射到 [[WorldModelTaxonomy|survey taxonomy]]，而不是提供 runnable code。
- README 的一级组织与 paper taxonomy 对齐：Decision-Coupled / General-Purpose、Sequential / Global，以及 Global Latent Vector、Token Feature Sequence、Spatial Latent Grid、Decomposed Rendering Representation 等 spatial representation。
- 每个 entry 通常包含 paper title、venue/year、paper link，并在可用时附上 project page、code、dataset、poster 或 video link。
- README 的 domain icons 表明 category 是 predominant domain，不是互斥标签；例如 robotics 与 driving works 也可能使用 generative modeling。
- Companion repo 的价值在于可维护性：survey paper 给出 static synthesis，repo 则承载后续 papers、code 和 project links 的 rolling bibliography。

## 关键引文

- "accompanies our survey"
- "internal simulators"
- "categories are non-exclusive"

## 关联

- [[a-comprehensive-survey-on-world-models-for-embodied-ai]] - repository 对应的 survey paper。
- [[AwesomeWorldModels]] - repo entity page，记录维护形态、scope 和使用方式。
- [[WorldModelsForEmbodiedAI]] - repository 收录 papers 的共同 problem frame。
- [[WorldModelTaxonomy]] - README 的 section structure 直接实例化 taxonomy。
- [[WorldModelEvaluation]] - README 中包含 WorldGym、WorldEval 等把 world models 用作 policy evaluator 的方向。

## 开放问题

- README 是否会持续补充 structured metadata，例如 license、training data scale、real-robot validation、benchmark protocol 和 inference cost？
- 这个 repo 是否应被本 wiki 定期 re-ingest，或只在用户指定时更新？
- 对本 wiki 而言，哪些 recurring entries 值得进一步拆成独立 source pages：DreamerV3、V-JEPA 2、Sora、WorldGym、WorldEval、COME、DrivePhysica、AETHER？
