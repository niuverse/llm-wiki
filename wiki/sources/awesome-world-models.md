---
title: "AwesomeWorldModels：世界模型文献索引"
type: source
tags: [embodied-ai, world-models, github, source-backed]
sources: []
modified: 2026-10-04
source_file: raw/awesome-world-models-readme.md
source_kind: repo
source_url: https://github.com/Li-Zn-H/AwesomeWorldModels
source_metadata: raw/awesome-world-models-main-commit.json
extracted_text: graph/extracts/awesome-world-models-readme.md
source_date: 2026-03-28
topics: ["topics/world-models-and-representations", "topics/evaluation-and-transfer", "topics/planning-and-control", "topics/world-model-evaluation", "topics/world-model-decision"]
source_type: repository
---

# AwesomeWorldModels：世界模型文献索引

[AwesomeWorldModels](https://github.com/Li-Zn-H/AwesomeWorldModels) 是 [[a-comprehensive-survey-on-world-models-for-embodied-ai|具身世界模型综述]] 的配套文献索引。所收录内容是 README 中的分类列表和外部链接，**不是训练框架或某个世界模型的实现**；这里不补造模块调用链、运行命令或性能结论。

本页对应已归档提交 `a512d22526a75974e5fc18da9c09017cd16dfa27`，作者日期2026-03-28。本轮完整阅读本地 README 缓存，并对照 UTF-16 原文件重新统计，实际有 **194条顶层论文记录**；此前193条的记录已更正。这里只计列表条目，没有逐个核查外链、去重所有论文版本或阅读全文。

## 索引怎样组织材料

README 用三层组合标题组织论文，再按年份分组：

| 分类轴 | README 使用的类别 | 查找时问什么 |
| --- | --- | --- |
| 与决策的关系 | 决策耦合 `Decision-Coupled`、通用 `General-Purpose` | 作者把模型主要放在行为系统里，还是作为可供不同用途的预测表示？ |
| 时间建模 | 顺序式 `Sequential`、整体式 `Global` | 索引把方法归于逐步展开还是整体预测？具体定义需合读综述 |
| 空间表示 | 全局潜在向量、标记特征序列、空间潜在网格、分解式渲染表示 | 预测对象保留什么空间结构？ |

归档 README 实际列出12个组合章节，不是把所有类别的笛卡尔积都完整填满。图标另外标记自动驾驶、机器人操作、导航和视频生成的主要领域；作者明确这些领域不互斥。分类是资料组织视角，不能仅从类别推断动作监督、真实部署能力或模型优劣。机制定义见 [[WorldModelTaxonomy|世界模型分类体系]]。

## 一个条目能提供什么

条目通常有方法名、官方标题、会场／年份标记和论文链接；部分还给项目页、代码、数据、海报或视频。链接存在不表示代码已经可运行，也不保证链接指向官方实现或与论文完全相同的版本。README 的简短条目没有系统记录数据预算、控制频率、硬件、任务协议和独立复现情况。

**使用示例（阅读流程）。**若想找“空间特征上的目标规划”，可从决策耦合、顺序式、空间潜在网格章节找到 DINO-WM，再转到 [[dino-wm-pretrained-visual-features|已收录论文页]]核对冻结编码器、动作数据与 CEM。README 只证明它如何收录这篇工作，论文才支持方法与实验判断。

另一个容易混淆的例子是 V-JEPA 2：索引将其列在通用、整体式、标记特征序列下，并用视频生成图标标记。[[v-jepa-2-understanding-prediction-planning|原论文]]却包含视频表征预训练和动作条件机器人后训练两阶段；单一分类标签不能替代逐模块解释。PlaNet 与 Dreamer 同处决策耦合、顺序式、全局潜在向量章节，也不表示两者执行时都搜索动作。[[planet-learning-latent-dynamics|PlaNet]]、[[dreamerv3-mastering-diverse-control|Dreamer]]

## 怎样使用这份证据

- 找代表工作和相邻路线时，用索引定位候选，再阅读官方原文。
- 核对技术判断时，回到已收录论文；尚未完整收录的条目只作为候选资料。
- 比较年份与会场时，把 README 的标记视为作者登记，必要时到正式出版页核验。
- 跟踪变化时按需要另存快照；当前页面不声称已检查最新主分支，也不设置自动更新。

归档范围是 README 及提交元数据。首页所链中英文幻灯片、外部实现、数据集与视频均未在本轮审计。原始 README 以 UTF-16 保存，阅读缓存为可重建 Markdown；本轮未修改原始文件。

相关入口：[[WorldModelsForEmbodiedAI|具身世界模型]]、[[WorldModelEvaluation|世界模型评估]]、[[topics/world-model-evaluation|动作后果评估专题]]、[[topics/world-model-decision|世界模型与决策专题]]。

## 研究归属

[[topics/world-models-and-representations|世界模型与表征]] · [[topics/evaluation-and-transfer|评测与现实迁移]] · [[topics/planning-and-control|规划与控制]] · [[topics/world-model-evaluation|如何验证世界模型的动作后果]] · [[topics/world-model-decision|世界模型如何用于决策]]。
