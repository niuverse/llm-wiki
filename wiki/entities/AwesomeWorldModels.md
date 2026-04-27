---
title: "AwesomeWorldModels"
type: entity
tags: [github, bibliography, embodied-ai, world-models]
sources: ["[[awesome-world-models]]"]
last_updated: 2026-04-27
---

# AwesomeWorldModels

AwesomeWorldModels 是 Li-Zn-H 维护的 GitHub bibliography repository，对应 survey [[a-comprehensive-survey-on-world-models-for-embodied-ai|A Comprehensive Survey on World Models for Embodied AI]]。它的主要内容是 README 中的 paper list，而不是 model implementation。

该 repo 的组织方式直接跟随 [[WorldModelTaxonomy]]：先区分 Decision-Coupled 与 General-Purpose，再区分 Sequential Simulation and Inference 与 Global Difference Prediction，最后按 spatial representation 分成 Global Latent Vector、Token Feature Sequence、Spatial Latent Grid 和 Decomposed Rendering Representation。

在本次 ingest 的 snapshot 中，README 包含 193 条 paper entries，覆盖 robotics manipulation、autonomous driving、navigation 和 video generation。Entry 通常链接 paper，并在可用时链接 code、project page、dataset、poster 或 video。

实践上，这个 repo 更适合作为 discovery index：需要定位某个 taxonomy cell 下的代表工作时先查它；需要 mechanism-level understanding 时再回到对应 paper source。相关页面：[[WorldModelsForEmbodiedAI]]、[[WorldModelTaxonomy]]、[[WorldModelEvaluation]]。
