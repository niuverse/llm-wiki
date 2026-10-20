---
title: "ryanbbrown/Retrodict：把日志当唯一记忆的 ARC-AGI-3 Harness"
nav_title: "Retrodict"
type: source
source_type: repository
tags: [agents, harness, memory, benchmark, repository, source-backed]
sources: []
modified: 2026-10-20
source_file: raw/ryanbbrown-retrodict-repository-2026-10-20-c49ff487069d.tgz
extracted_text: graph/extracts/ryanbbrown-retrodict-repository-2026-10-20-c49ff487069d.md
source_kind: repo
source_url: https://github.com/ryanbbrown/Retrodict/tree/71672e8e5adb008360f52a61ef9e2adf91a62d89
source_date: 2026-08-11
source_version: 71672e8e5adb008360f52a61ef9e2adf91a62d89
acquired: 2026-10-20
snapshot_sha256: c49ff487069d345ea2bf26b975f673629e886ad00c0de15f05729f83f6e235e2
reviewed: 2026-10-20
topics: ["topics/agent-execution", "topics/arc-agi-3-harness-design"]
---

# Retrodict：把日志当唯一记忆的 ARC-AGI-3 Harness

## 1. 一句话与证据边界

Retrodict 是一个**文本优先**的 ARC-AGI-3 harness：除开局的一次图像预读外，智能体不再看图片，只在一个追加式 `log.txt` 上工作；它用 Python 在日志里证伪假设，再把验证过的计划连同**逐动作的格子级预测**交给 runner 执行，预测不中就停。

**必须先说清楚证据边界**：README 声称 99.86% 平均 RHAE、183 关全解、7,703 个动作、6.60 亿 token、$654；官方 scorecard 是远程的 `9c403765`，仓库里**没有**提交这张卡的 JSON。仓库里提交的 `docs/official-scorecard-8d734689.json` 是更早的 `gpt-5.6-sol high` 跑分，实际分数 **84.52**、21/25 局完成、170/183 关、9,445 个动作，对应 README 的 “archived earlier run”；`.gitignore` 排除了 `scorecard-*.json`，最终卡因此没有进快照。所以本页把 99.86 标为“作者自述 + 远程卡片”，把 84.52 标为“已提交的可核查产物”。仓库**没有 LICENSE 文件**，按默认版权处理。

## 2. 核心结构：日志、手册、计划

| 工件 | 角色 | 谁写 |
| --- | --- | --- |
| `log.txt` | 唯一事实来源：每步的帧、动作、关卡数、状态、可用动作、`[DIFF]` | runner 追加，不可改 |
| `playbook.md` | 给“上下文重置后的继任者”的简报：working model + working memory | 模型自己写、可改写 |
| `[ACTIONS]` 计划 | 一串动作，每个动作带期望格子与期望关卡数 | 模型提出，runner 逐步执行并核对 |
| `scratch/` | 模型写的模拟器与搜索脚本 | 模型 |

日志格式是稳定标记块（`[STEP n]`、`[ACTION]`、`[BOARD] 1/2 intermediate`、`[DIFF]`、`[PLAN]`），既可 grep 也可被 Python 精确解析。runner 每步派生 `[DIFF]`——“哪些格变了”——这样模型不必自己解析 64×64 网格。

**为什么是文本。** 作者的选择很明确：图像只进入一次（开局给一个视觉模型看渲染图，把它的判断作为待验证假设注入首条 prompt），之后所有感知都走数字与差分。好处是可 grep、可回放、可写程序检验；代价是模型再也看不到“形状”和“布局”的直观信息，只能靠计算重建。

## 3. 一次运行的数据流

1. **图像预读。** 开局帧渲染成图，另一个视觉模型回答“看到什么、目标可能是什么”，答案作为假设写进首条 prompt（`vision.py`）。
2. **读日志与手册。** 模型读 `log.txt`、`playbook.md`，用 `python` 工具把假设回放到历史帧上——**在日志里证伪不花环境动作**。
3. **提交计划。** 模型输出 `[ACTIONS]` 块，每个动作可带 `expect`（若干格子的目标颜色）与整体 `expect_levels` 期望。`plan_parser.py` 解析并校验。
4. **逐步执行与核对。** runner 一次执行一个动作，把新帧追加进日志，再检查 `expect`：任一格不符就停掉剩余计划，把差异交回模型（`runner.py:491-540`）。
5. **重新调用。** 计划耗尽、关卡或状态变化、GAME_OVER（runner 自己发 RESET）、计划中的动作不再可用，都会重新调用模型。
6. **上下文重置。** 输入 token 超过 150k 就丢弃对话，开新会话；只有工作区文件存活，新会话从 `playbook.md` 与 `log.txt` 续接（`runner.py:79`）。
7. **卡关升级。** 同一关 300 个动作或 2 次自发 RESET 后，runner 在每次调用里追加一条**约束性指令**：盘点日志解释不了的东西与从未去过的区域，把规则提升成 `scratch/` 下的可执行模拟器，验证它能重放每一帧，再在模拟器里搜路线；再 300 动作后升级到第二档，要求搜索从未见过的状态并重新推导“目标不可达”的规则（`runner.py:31-32`、`400-414`）。

第 7 步值得单独看：它不是提示词建议，而是 **runner 强制的降级路径**——当自由推理卡住，就强制回到“先建模型再搜索”。`experiments.md` 记录了这条规则怎么被失败逼出来：bp35 的第 8 关在约 800 个动作的“纪律性证伪”后仍无进展，升级指令注入后模型写出 `l8_sim.py`，补全从未走过的高层地图，约 60 个动作后通关。

## 4. 工具与隔离

工具只有五个：`read`、`write`、`edit`、`search`（ThinHarness 内置，作用于工作区文件）与 `python`（在 containment venv 里跑脚本，带 numpy/scipy/networkx，工作目录是 workspace）。**没有 shell**，也没有截图。

隔离靠一个“可证明的否定能力”：agent 的 Python 跑在没有游戏引擎包的 venv 里；每次运行写 `containment.json`，证明 `import arc_agi` 之类会失败，失败不了就中止。这比“我们没作弊”的声明强，因为它把否定能力变成了每次运行的产物。

## 5. 结果与成本

| 运行 | 平均 RHAE | 动作 | token | API 价 |
| --- | ---: | ---: | ---: | ---: |
| Retrodict (max) | **99.86** | 7,703 | 0.66B | **$654** |
| baseline1 twma (max) | 95.97 | 10,111 | 1.20B | $918 |
| baseline1 ewma_sv (max) | 98.77 | 7,758 | 3.97B | $3,105 |
| baseline1 ewma_sv (xhigh) | 98.97 | 8,347 | 3.64B | $2,722 |

表：与同模型（gpt-5.6-sol）、同价格表的 baseline1 对比。Retrodict 比最高分的 baseline1 高 0.89 个百分点、token 少 5.5 倍。来源：README 与 `docs/per-game-costs.md`。

逐游戏成本差距很大：lf52 花 $75.19、806 个动作；cd82 只花 $7.22、74 个动作。23/25 局满分，sk48 为 98.64、sp80 为 97.77。作者把两局的重跑原因也写清楚了（tn36 的实验跑与正式跑、bp35 被监督者误取消），并说明本地跑完后用 `replay_runs.py` 通过 API 重放动作以生成官方卡。

## 6. 它自己怎么做横向比较

`docs/arc-agi-3-harness-comparison.md` 是一份少见的、带成本口径说明的公开 harness 对比（18 个系统）。它给出的关键结论是：**头部分数混合了架构、模型、重跑与推理预算**。例如 Schema 的 98.98 是“条件重跑、保留更好结果”，PRO-LONG 的 97.4 是 best@2，Tycho 的 100.00 是单次单模型跑。它把成本分成“提交成本 / API 等价成本 / 图表插值”三类，并明确说提交到排行榜的成本没有统一会计方法。

这份文档是**作者自述**，对被比较系统的描述应回到各自原文核对；但它至少把“分数不可直接横比”的问题摆到了台面上。

## 7. 局限

- **单次运行。** 每个游戏一局（两局因流程原因重跑），没有 run-to-run 方差；99.86 与 100.00 的差距小于这种不确定性。
- **文本通道的代价。** 除开局预读外不看图，意味着空间布局、颜色邻近、形状相似性都要靠程序重建；这也可能是 sk48/sp80 失分的原因之一（未验证）。
- **升级规则是手工调出来的。** 300 动作、2 次 RESET、150k 上下文都是经验阈值，换环境需要重调。
- **无许可证、无独立复现。** 代码可读、轨迹可下载，但没有第三方复跑。
- **作者自述的对比文档有立场。** 它由 Retrodict 作者维护，虽然口径写得细，但选择哪些系统、如何归类成本仍可能影响结论。

## 8. 与另外三条路线的关系

Retrodict 与 [[vista-a-visual-harness-for-reasoning-in-an-interactive-world|VISTA]] 恰好相反：VISTA 把原始像素当记忆，Retrodict 把文本日志当记忆；VISTA 让模型自己决定看哪块，Retrodict 让模型把感知写成程序。它与 [[nimi-research-tycho-repository|Tycho]] 的差别在“模型是否常驻”：Tycho 有独立 builder 和可执行世界模型，Retrodict 默认不建模型，只在卡关时被强制升级。它与 [[schema-discovering-unknown-environments-via-agentic-program-induction|Schema]] 的差别在“程序是否中心”：Retrodict 的程序是临时工具，Schema 的程序是唯一的知识载体。

横向对照见 [[topics/arc-agi-3-harness-design|ARC-AGI-3 Harness 设计]]。
