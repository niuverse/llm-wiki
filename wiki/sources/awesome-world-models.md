---
title: "AwesomeWorldModels"
type: source
tags: [embodied-ai, world-models, github, source-backed]
sources: []
modified: 2026-09-25
source_file: raw/awesome-world-models-readme.md
source_kind: repo
source_url: https://github.com/Li-Zn-H/AwesomeWorldModels
source_metadata: raw/awesome-world-models-main-commit.json
extracted_text: graph/extracts/awesome-world-models-readme.md
source_date: 2026-03-28
---

## 摘要

[[awesome-world-models|AwesomeWorldModels]] 是论文 [[a-comprehensive-survey-on-world-models-for-embodied-ai|A Comprehensive Survey on World Models for Embodied AI]] 的配套 GitHub 代码仓库。它不是算法实现，而是按照综述分类体系维护的 curated bibliography。README 把世界模型描述为 environmental 动力学的内部仿真器，并用域 icons 标记自主驱动、机器人操作、导航和视频生成。

本次收录抓取的 README 为 UTF-16LE 编码的 Markdown，包含 193 条论文记录。仓库主分支的提交元数据也保存为 `raw/awesome-world-models-main-commit.json`，其中主提交是 `a512d22526a75974e5fc18da9c09017cd16dfa27`，作者日期为 2026-03-28。

来源网址: https://github.com/Li-Zn-H/AwesomeWorldModels

## 核心主张

- 代码仓库的功能是把世界模型 literature 映射到 [[WorldModelTaxonomy|survey taxonomy]]，而不是提供 runnable 代码。
- README 的一级组织与论文分类体系对齐：决策-耦合的 / 一般性-Purpose、顺序式的 / 全局，以及全局潜在 Vector、标记特征序列、空间潜在 Grid、Decomposed 渲染表示等空间表示。
- 每个入口通常包含论文 title、venue/year、论文链接，并在可用时附上项目主页、代码、数据集、poster 或视频链接。
- README 的域 icons 表明类别是 predominant 域，不是互斥标签；例如机器人学与驱动 works 也可能使用 generative 建模。
- 配套代码仓库的价值在于可维护性：综述论文给出静态综合整理，代码仓库则承载后续论文、代码和项目链接的滚动 bibliography。

## 关键引文

- "accompanies our survey"
- "internal simulators"
- "categories are non-exclusive"

### AwesomeWorldModels

AwesomeWorldModels 是 Li-Zn-H 维护的 GitHub bibliography 代码仓库，对应 survey [[a-comprehensive-survey-on-world-models-for-embodied-ai|A Comprehensive Survey on World Models for Embodied AI]]。它的主要内容是 README 中的论文列表，而不是模型实现。

该代码仓库的组织方式直接跟随 [[WorldModelTaxonomy]]：先区分决策-耦合的与一般性-Purpose，再区分顺序式的仿真与推理与全局 Difference 预测，最后按空间表示分成全局潜在 Vector、标记特征序列、空间潜在 Grid 和 Decomposed 渲染表示。

在本次收录的快照中，README 包含 193 条论文条目，覆盖机器人学操作、自主驱动、导航和视频生成。入口通常链接论文，并在可用时链接代码、项目主页、数据集、poster 或视频。

实践上，这个代码仓库更适合作为 discovery 索引：需要定位某个分类体系 cell 下的代表工作时先查它；需要机制层级 understanding 时再回到对应论文来源。

## 关联

- [[a-comprehensive-survey-on-world-models-for-embodied-ai]] - 代码仓库对应的综述论文。
- [[awesome-world-models|AwesomeWorldModels]] - 代码仓库实体页面，记录维护形态、范围和使用方式。
- [[WorldModelsForEmbodiedAI]] - 代码仓库收录论文的共同问题帧。
- [[WorldModelTaxonomy]] - README 的章节结构直接实例化分类体系。
- [[WorldModelEvaluation]] - README 中包含 WorldGym、WorldEval 等把世界模型用作策略评估器的方向。

## 开放问题

- README 是否会持续补充结构化的元数据，例如许可证、训练数据规模、真实机器人验证、基准协议和推理成本？
- 这个代码仓库是否应被本知识库定期 re-收录，或只在用户指定时更新？
- 对本知识库而言，哪些反复出现的条目值得进一步拆成独立来源页面：DreamerV3、V-JEPA 2、Sora、WorldGym、WorldEval、COME、DrivePhysica、AETHER？
