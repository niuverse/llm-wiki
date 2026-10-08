# Personal LLM Wiki

这是以人为第一读者、由 Codex 维护的个人知识库。优先写简洁、互链、能复习的知识，不为模板重复铺垫。

## 内容与证据

- `raw/` 保存不可变的原始证据：官方 PDF、网页、代码仓库快照等。不得改写、覆盖、重排或删除；更新资料另存快照，不能放入 LLM 摘要。
- `graph/extracts/` 保存可重建的阅读缓存。非稳定 UTF-8 Markdown 用 `uv run python tools/extract_source.py <path>` 提取，再完整阅读；证据仍追溯到原始资料。
- `wiki/` 是唯一知识内容目录，同时供 Obsidian、Codex 和 Quartz 使用。Obsidian 只打开 `wiki/`，不复制到 `content/`。
- 非显然事实必须链接来源页；区分来源支持、讨论解释与待验证假设。对话和搜索结果摘要都不是外部证据；候选资料未完成阅读与收录前不能支持知识结论。
- 保持文件名、链接目标稳定；内部用 `[[WikiLinks]]`，显示名称选用自然、常见的术语，例如 `[[ModelPredictiveControl|MPC]]` 或 `[[RobotRigidBodyDynamics|刚体动力学]]`。来源、综合页用 `kebab-case`，概念和实体用 `TitleCase`。
- `wiki/topics/` 保存允许交叉的主题地图与具体专题；不设强制单一父领域。首页以机器人与具身智能的六个研究入口为主，工具与工程笔记单列；入口数量随内容需要调整。`wiki/domains/` 仅保留旧地址的迁移入口。
- `wiki/sources/` 记录来源特有主张与证据；论文用 `type: source` 和 `source_type: paper` 区分，文档、仓库、教材与项目页不得假扮论文。不要仅按 PDF 后缀判断论文。
- 论文页采用分层精读：概览；问题与设计动机；论文特有机制、训练／推理接口与必要推导；实验及章节、图表定位；局限与我们的解释。共享基础集中在概念页，正文保留连贯理解所需的变量、假设和应用方式，不重复整套原理，也不以裸链接代替核心解释。
- 项目页讲清架构、模块、一次具体执行的数据流／控制流及接口。固定版本核查关键代码并记录文件位置；分别标注文档说明、静态核查与实际运行，README 不等价于完整实现分析。
- `wiki/concepts/` 精选跨论文复用的机制；论文专属模块并回来源页，跨论文比较归入研究专题。合并后旧地址保留 `type: redirect`、`redirect_to` 与可读入口，不复制旧分析。
- 日常内容分为 Topics（研究问题）、Concepts（可复用原理）、Sources（论文、文档、代码等具体来源）和 Notes（独立讨论笔记）。`wiki/syntheses/` 保留 Notes，不再新建学习路径或学习地图；必要解释与例子直接融入相应主题或概念，避免另一套学习顺序和复习入口。
- 不再维护独立实体或项目索引页；项目说明归入 Sources，相关论文、代码与文档直接互链。`wiki/entities/` 只保留旧地址跳转，导航中隐藏。论文、仓库、文档的证据身份仍由 `source_type` 区分。

三个入口各负其责，避免重复事实：

| 页面                                   | 职责                                                 |
| -------------------------------------- | ---------------------------------------------------- |
| `wiki/index.md`                        | 自动生成的简洁 Markdown 导航；完整页面清单在 `catalog.md` |
| `wiki/overview.md`                     | 当前总判断、证据图谱、关键张力；判断变化时才修改     |
| `wiki/syntheses/research-questions.md` | 自动汇总各专题的未解问题入口，不重复问题正文 |

具体研究问题、优先补证与证据边界由对应 `wiki/topics/` 页面维护。跨主题判断仍在总览，各专题不复制总览。主题是阅读地图，不是对知识的唯一归属；正文链接要说明机制、证据或比较关系。目录收录边与知识关系区分，图谱和双向关系表默认排除纯目录及旧地址入口。

新内容优先融入已有页面，没有合适页面时才新建；默认同步直接相关的来源、概念和专题，仅在跨主题判断变化时更新总览。证据充分时可自主修正旧判断，在日志说明原判断、新判断及修改依据；证据不足时说明不确定，有冲突时保留分歧。更广泛的补充研究由用户明确发起 `research` / `refresh`，不因一次收录自动扩成全库重写。

每次知识修改后先向 `wiki/log.md` 追加 `## [YYYY-MM-DD] <操作> | <标题>`，不改旧日志。每条新记录注明实际记录时间 `时间：YYYY-MM-DD HH:mm（北京时间，UTC+08:00）`，简述新增或修改了什么、为什么改，并用 WikiLinks 链接相关页面；有可用的提交或差异链接时附上，不把提交时间当作操作时间，也不补造旧记录的时间。收录每个来源需有对应 `ingest` 记录。日志写完后运行 `uv run python tools/build_catalog.py`，同步目录和首页最近更新。首页和完整目录保留日志入口。

## 阅读与深度

- 正文解释以简体中文为主，标题与导航使用最自然、易识别的名称；MPC、Flow Matching、Sim-to-Real 等惯用术语优先保留英文，不强行逐词翻译。保留官方标题、专名、引文与代码；不要为保持纯中文牺牲准确性。普通叙述避免无意义的中英混写，例如 `source`、`claim`、`pipeline`、`tradeoff`、`failure mode`、`runtime`、`workflow`、`boundary`。
- 自然段一行，不为列宽手动换行；保留 Markdown 的结构性换行，不重排 `raw/`。
- 数学、仿真、机器人、优化、ML、系统主题须解释机制，不能止于摘要。按内容需要写数学结构、直觉、来源支持的失败情形与实践含义；首次定义变量，说明假设和适用范围。
- 引用原文图号时，在相关段落或表格后嵌入可直接阅读的本地图；图片放在 `wiki/assets/figures/`，使用相对 Markdown 图片链接，兼容 Obsidian 与 Quartz。保留图号、完整图注、来源与页码，裁剪和压缩不能改动图例或数据；衍生图片及裁剪坐标登记在 `graph/figures.json`，原始证据不变。同一图可跨页复用，缺失图片必须说明原因，不以图号定位代替图片。
- 公式用 `$...$` 或 `$$...$$`，不要用 `\(...\)` / `\[...\]`。结构、分类、因果链适合用 Mermaid 时，使用兼容 Obsidian/Quartz 的 fenced `mermaid` 图，并用正文解释。

## 页面元数据

```yaml
---
title: "便于阅读的标题"
type: topic | source | concept | synthesis | navigation | redirect
tags: []
sources: []
modified: YYYY-MM-DD
---
```

- `modified` 是内容最后审阅日期，判断或内容实质变化才更新；批量格式、标签或布局调整不刷新。不要使用 Quartz 不识别的 `last_updated`。
- 主题标签沿用全库跨页维度，不为单页发明标签。来源页必带 `source-backed`；无 `sources` 的知识页必须带 `unsourced`、`source-plan`、`learn` 或 `distill`，并向读者说明哪些内容未经来源验证。
- 来源页另填 `source_file`（原始证据）、`source_kind`（`pdf/html/repo/image/office/audio/markdown/unknown`）、`source_url`、`source_date`（日期或 `unknown`）；有缓存时填 `extracted_text`。
- 来源页可用 `nav_title` 提供简短导航名；`title`、`paper_title` 保留完整名称，显示名调整不刷新审阅日期。
- 主题首页入口用 `entry: research | tools` 标明导航位置，`nav_order` 排序；其余具体专题无需该字段。它们均为 `type: topic`，不使用 `domain`、`featured` 或 `study_topic` / `study_order` 强制层级。知识页用 `topics: ["topics/<slug>", ...]` 关联多个主题；正文提供语义明确的 WikiLinks，Obsidian 无需前端即可导航。
- 论文另填核实后的 `paper_title`、`year`、`venue` 和 `reviewed`；年份按所引用论文或版本核实；译本需分别写清原作年份和实际阅读版本，预印本与正式版不得混用。只调整标签不刷新 `modified` 或 `reviewed`。
- `source_kind` 是原始文件形态；`source_type` 是资料性质（`paper/documentation/repository/tutorial/book/project/article`），两者不能混用。原文内部冲突并列说明；不能把项目页、论文、仓库功能混成一组实验依据。
- `index.md`、`catalog.md`、`papers.md`、`references.md`、`research-topics.md` 和 `syntheses/research-questions.md` 由 `tools/build_catalog.py` 生成，修改源页面元数据后重建。网页首页直接渲染 Markdown；使用 Quartz 原生目录与图谱，知识页正文下显示本页引用和反向链接。

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

- 知识修改后运行 `uv run python tools/build_catalog.py --check` 和 `uv run python tools/health.py`，检查链接、目录、日志、证据文件、语言与证据状态；修复本次引入的问题。语言统计直接核对原文，不能把屏蔽链接后的断裂文本当作真实语病。
- 图片修改后运行 `uv run python tools/build_figures.py` 核对图片与原始证据；需要重建时加 `--render`。知识修改还需重建并提交 `uv run python tools/build_graph.py --report` 的产物，避免 CI 图谱同步失败。
- 大规模知识修改或发布层修改运行 `npm run wiki:build`；前端代码按变化做类型与浏览器验证。检查成功不等于事实正确。
- 本地预览 `npm run wiki:preview`；生产构建 `npm run wiki:build`，输出 `public/`。直接运行 Quartz 时必须指定 `-d wiki`。
- 不自动 `git push`、合并 PR 或部署。现有 GitHub Pages 从 `main` 部署；推送到 `main` 等同触发公开发布。
