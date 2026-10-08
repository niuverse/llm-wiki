---
title: "LangGraph：状态图与 Checkpoints"
nav_title: "LangGraph"
type: source
tags: [agents, source-backed]
sources: []
modified: 2026-10-08
source_file: raw/langgraph-langgraph-checkpointers-2026-10-08-3881beeb186a.md
source_kind: markdown
source_type: documentation
source_url: https://docs.langchain.com/oss/python/langgraph/checkpointers.md
source_date: unknown
source_version: "retrieved 2026-10-08"
topics: ["topics/agent-execution"]
---

# LangGraph：状态图与 Checkpoints

LangGraph 把工作组织成状态、节点和转换，重点是让长任务在明确边界保存并继续。本页以官方 Persistence、Checkpointers 文档为主；代码快照固定为 `40a2e6d845054cc0cc17a6a169ca6e7394e5231c`，只读取 Pregel 类的调度说明，没有验证全部实现。[官方持久化文档](https://docs.langchain.com/oss/python/langgraph/persistence)

## 图怎样驱动工作

应用指定节点读取哪些状态、返回哪些更新，以及下一步走向。Pregel 将一步分为选择节点、并行执行、合并更新；执行阶段的新写入要到下一步才对其他节点可见。这个同步边界不同于“任何工具结果一到就立即改变所有并行任务”。[固定代码中的调度说明，`pregel/main.py` 458–510 行](https://github.com/langchain-ai/langgraph/blob/40a2e6d845054cc0cc17a6a169ca6e7394e5231c/libs/langgraph/langgraph/pregel/main.py#L458)

以“读取配置 → 修改 → 测试 → 决定继续或结束”为教学图，节点可以是确定性代码，也可以内部调用模型。图负责规定谁在什么条件下运行；模型仍可以在某个节点内决定具体工具。这说明状态图与自主循环可以嵌套，并非必须二选一。

## Checkpoint 保存的不只是聊天内容

checkpointer 按 thread 保存图状态。`StateSnapshot` 包括状态值、下一批节点、配置、元数据、前一检查点及任务信息。一个顺序图 `START → A → B → END` 在初始空状态、接收输入、A 完成、B 完成后有相应检查点；更新如何合并由各状态字段的 reducer 决定，例如列表累加与值覆盖是不同语义。[Checkpointers](https://docs.langchain.com/oss/python/langgraph/checkpointers)

同一步内各节点已完成的写入也会单独保存。若 A 成功、B 失败，恢复时可以复用 A 的 pending writes，不必把整步所有节点重算。但这些中间写入不是完整的任意位置快照；时间回溯以完整检查点为边界。

跨轮对话状态与跨对话知识也应区分：checkpointer 管当前 thread 的图状态，store 管应用定义的跨 thread 数据。`InMemorySaver` 只保存在内存里，不能因为用了 checkpointer 接口就宣称进程重启可恢复。

## 持久化时机决定能恢复到哪里

| 模式 | 文档语义 | 代价与边界 |
| --- | --- | --- |
| exit | 运行退出时保存，包括正常、错误或人工中断退出 | 运行中硬崩溃不能依靠尚未保存的中间状态 |
| async | 下一步执行时异步保存 | 有尚未写入的崩溃窗口 |
| sync | 下一步前等待检查点写完 | 多了存储等待，但不会先跑下一步再补写上一检查点 |

这张表说明保存时机，不承诺数据库、磁盘和外部服务具备任意故障下的统一事务语义。尤其要区别**失败恢复**与**从旧检查点重新运行**：后者会重新执行检查点之后的节点，包括模型调用、API 和人工中断。[Durability modes 与 Replay](https://docs.langchain.com/oss/python/langgraph/checkpointers)

**教学推论：**节点已经向外部系统提交修改、但结果还没有写入检查点时，恢复可能重复那次操作。幂等请求标识、查询实际结果或补偿逻辑仍需在应用层设计；“有检查点”不是外部操作恰好一次的证明。可对照 [[pi-agent-harness|pi-durable 的 replay: safe]] 理解这条边界。

## 为什么历史存储也需要设计

完整快照容易读取，但不断累积的消息可能反复写入。当前文档给出 beta 状态的 DeltaChannel：保留增量并从祖先记录重建，减少追加型状态的存储量；代价是加载、分支和清理需要保留依赖链。清理旧检查点前若删掉仍被依赖的增量，剩余检查点就不再自足。这里是文档说明，未采信示例 SQL 作为已经测试的数据库实现。

本轮全文阅读根 README、Persistence、Checkpointers；源码只核查上述 Pregel 调度说明。在线文档没有固定发行标签，不能把文档所有新接口都绑定到本地已安装版本；也没有运行数据库、故障注入或多节点恢复实验。

## 归档与阅读范围

原始字节与 SHA-256 已登记在 `graph/acquisitions.jsonl`；读取于 2026-10-08。下表保留实际文件路径，便于继续核查。

| 原始资料 | 本地快照 |
| --- | --- |
| [README.md](https://github.com/langchain-ai/langgraph/blob/40a2e6d845054cc0cc17a6a169ca6e7394e5231c/README.md) | `raw/langgraph-readme-2026-10-08-3a13e257af12.md` |
| [libs/langgraph/langgraph/pregel/main.py](https://github.com/langchain-ai/langgraph/blob/40a2e6d845054cc0cc17a6a169ca6e7394e5231c/libs/langgraph/langgraph/pregel/main.py) | `raw/langgraph-main-2026-10-08-dfec86a82131.py` |
| [langgraph-durable.md](https://docs.langchain.com/oss/python/langgraph/persistence.md) | `raw/langgraph-langgraph-durable-2026-10-08-eb1eaceb1fd8.md` |
| [langgraph-checkpointers.md](https://docs.langchain.com/oss/python/langgraph/checkpointers.md) | `raw/langgraph-langgraph-checkpointers-2026-10-08-3881beeb186a.md` |

关联：[[AgentHarness|Agent Harness 基础]]、[[topics/agent-execution|Agent Systems]]。

源码阅读缓存：`graph/extracts/langgraph-main-2026-10-08-dfec86a82131.md`。通用提取器误按 ASCII 解码失败，改为显式 UTF-8 解码并保留所读片段及原行号，未改动原始文件。
