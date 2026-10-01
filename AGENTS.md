# Personal LLM Wiki

这是以人为第一读者、由 Codex 维护的个人知识库。优先写简洁、互链、能复习的知识，不为模板重复铺垫。

## 内容与证据

- `raw/` 保存不可变的原始证据：官方 PDF、网页、代码仓库快照等。不得改写、覆盖、重排或删除；更新资料另存快照，不能放入 LLM 摘要。
- `graph/extracts/` 保存可重建的阅读缓存。非稳定 UTF-8 Markdown 用 `uv run python tools/extract_source.py <path>` 提取，再完整阅读；证据仍追溯到原始资料。
- `wiki/` 是唯一知识内容目录，同时供 Obsidian、Codex 和 Quartz 使用。Obsidian 只打开 `wiki/`，不复制到 `content/`。
- 非显然事实必须链接来源页；区分来源支持、讨论解释与待验证假设。对话和搜索结果摘要都不是外部证据；候选资料未完成阅读与收录前不能支持知识结论。
- 保持文件名、链接目标稳定；内部用 `[[WikiLinks]]`，优先中文显示别名，例如 `[[ContactSolvers|接触求解器]]`。来源、综合页用 `kebab-case`，概念和实体用 `TitleCase`。
- `wiki/sources/` 记录来源特有主张、证据、引文与问题；`wiki/concepts/` 解释机制；`wiki/syntheses/` 保存学习路径和可复用综合。
- `wiki/entities/` 仅保留被至少两个来源引用的共享枢纽。单篇论文、模型或项目说明并入来源页，不另建实体。

三个入口各负其责，避免重复事实：

| 页面                                   | 职责                                                 |
| -------------------------------------- | ---------------------------------------------------- |
| `wiki/index.md`                        | 纯目录，一行一页；不放研究判断或阅读路径             |
| `wiki/overview.md`                     | 当前总判断、证据图谱、关键张力；判断变化时才修改     |
| `wiki/syntheses/research-questions.md` | 问题、优先阅读、证据边界；全库“下一步缺口”的唯一位置 |

每次知识修改都同步目录，并向 `wiki/log.md` 追加 `## [YYYY-MM-DD] <操作> | <标题>`，不改旧日志。收录每个来源需有对应 `ingest` 记录。

## 阅读与深度

- 正文、标题、导航、表格和图示默认简体中文。保留官方标题、专名、引文、代码与通用缩写；术语首次出现可附英文便于查找。修改内容时清理中英混写，普通名词不用 `source`、`claim`、`pipeline`、`tradeoff`、`failure mode`、`runtime`、`workflow`、`boundary`。
- 自然段一行，不为列宽手动换行；保留 Markdown 的结构性换行，不重排 `raw/`。
- 数学、仿真、机器人、优化、ML、系统主题须解释机制，不能止于摘要。按内容需要写数学结构、直觉、来源支持的失败情形与实践含义；首次定义变量，说明假设和适用范围。
- 公式用 `$...$` 或 `$$...$$`，不要用 `\(...\)` / `\[...\]`。结构、分类、因果链适合用 Mermaid 时，使用兼容 Obsidian/Quartz 的 fenced `mermaid` 图，并用正文解释。

## 页面元数据

```yaml
---
title: "便于阅读的标题"
type: source | concept | synthesis | entity
tags: []
sources: []
modified: YYYY-MM-DD
---
```

- `modified` 是内容最后审阅日期，判断或内容实质变化才更新；批量格式、标签或布局调整不刷新。不要使用 Quartz 不识别的 `last_updated`。
- 主题标签沿用全库跨页维度，不为单页发明标签。来源页必带 `source-backed`；无 `sources` 的知识页必须带 `unsourced`、`source-plan`、`learn` 或 `distill`，并向读者说明哪些内容未经来源验证。
- 来源页另填 `source_file`（原始证据）、`source_kind`（`pdf/html/repo/image/office/audio/markdown/unknown`）、`source_url`、`source_date`（日期或 `unknown`）；有缓存时填 `extracted_text`。
- 主题入口由学习路径的 `study_order`、`nav_title`、`description` 生成；`study_topic` 关联所属主题，沿用已有目标。

## 操作入口

先读目录、总览和最小相关页面集合，沿现有知识更新，避免平行重复建页。

| 请求 | 行为 |
| --- | --- |
| `ingest <path>` | 完整阅读原始资料或缓存，建来源页和必要概念，互链、登记、记录并检查 |
| `query: <question>` | 用中文和 WikiLinks 答复；未要求保存时，询问是否沉淀可复用答案 |
| `distill` | 保存对话洞见，明确来源支持／讨论解释／假设；对话不进入 `raw/` |
| `learn <topic>` | 解释基础、机制、误解与实践；无来源部分标注学习笔记，未授权保存时先询问 |
| `source <topic>` | 搜集可信候选资料和收录优先级；只建资料计划，不自动收录或生成知识结论 |
| `research <topic>` | 按需自动搜索、归档、完整阅读并整合本地知识；使用 [.agents/skills/wiki-research/SKILL.md](.agents/skills/wiki-research/SKILL.md) |
| `refresh <topic>` | 用同一技能检查资料和知识的新变化，去重并保留原快照，仅整合有意义的更新 |
| `health` / `lint` | 分别报告确定性问题／孤页、稀疏页、矛盾、陈旧与拆页机会；未要求修复时不编辑 |
| `build graph` | 运行 `uv run python tools/build_graph.py --report`；只解析显式链接，不为失效目标自动建页 |

`research` / `refresh` 是交给 Codex 的请求，不是 shell 命令。一次调用授权范围内的搜索和本地整合，无需逐篇确认；公开发布仍由用户触发。不设置定期调度、后端或额外依赖，除非另有明确要求。

## 验证与发布

- 知识修改后运行 `uv run python tools/health.py`，检查链接、目录、日志、证据文件、语言与证据状态；修复本次引入的问题。语言统计直接核对原文，不能把屏蔽链接后的断裂文本当作真实语病。
- 大规模知识修改或发布层修改运行 `npm run wiki:build`；前端代码按变化做类型与浏览器验证。检查成功不等于事实正确。
- 本地预览 `npm run wiki:preview`；生产构建 `npm run wiki:build`，输出 `public/`。直接运行 Quartz 时必须指定 `-d wiki`。
- 不自动 `git push`、合并 PR 或部署。现有 GitHub Pages 从 `main` 部署；推送到 `main` 等同触发公开发布。
