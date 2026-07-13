---
title: "AwesomeWorldModels"
type: entity
tags: [github, bibliography, embodied-ai, world-models]
sources: ["[[awesome-world-models]]"]
last_updated: 2026-07-13
---

# AwesomeWorldModels

AwesomeWorldModels 是 Li-Zn-H 维护的 GitHub bibliography 代码仓库，对应 survey [[a-comprehensive-survey-on-world-models-for-embodied-ai|A Comprehensive Survey on World Models for Embodied AI]]。它的主要内容是 README 中的论文列表，而不是模型实现。

该代码仓库的组织方式直接跟随 [[WorldModelTaxonomy]]：先区分决策-耦合的与一般性-Purpose，再区分顺序式的仿真与推理与全局 Difference 预测，最后按空间表示分成全局潜在 Vector、标记特征序列、空间潜在 Grid 和 Decomposed 渲染表示。

在本次收录的快照中，README 包含 193 条论文条目，覆盖机器人学操作、自主驱动、导航和视频生成。入口通常链接论文，并在可用时链接代码、项目主页、数据集、poster 或视频。

实践上，这个代码仓库更适合作为 discovery 索引：需要定位某个分类体系 cell 下的代表工作时先查它；需要机制层级 understanding 时再回到对应论文来源。相关页面：[[WorldModelsForEmbodiedAI]]、[[WorldModelTaxonomy]]、[[WorldModelEvaluation]]。
