# 第二轮：未来动作学习与智能体执行项目

遵循 `reading-contract.md`。本轮是可理解性与机制补强，不把上一轮的全文阅读记成第二次全文重读；上一轮完整覆盖见 `graph/review-notes/action.md`。所有原论文数字、版本界限和已识别的原文冲突保留。未修改 topics、domains、overview、log、规则；新增证据仅另存 raw 快照。

## 逐页处理

| 页面 | 本轮实际复核与修改 |
| --- | --- |
| a-comprehensive-survey-on-world-models-for-embodied-ai | 审阅全文现页；去掉与潜在状态空间页重复的完整 ELBO，把推导改成语义链接，保留综述适用范围；增加推杯子的三轴分类练习，明确它是教学例子。沿用上一轮 §2–5 核验，不声称重读全部参考文献。 |
| disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining | 重读原文 §2–3.4 与 A.2–A.3，渲染查看第 4 页图 2。新增四阶段输入、监督、参数与执行接口表；展开最近邻码本操作；解释两个预训练问题为何分开，增加抽屉变化到机器人动作的教学例子。没有编造 VQ 权重。 |
| predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation | 重读 §2–3.4，渲染查看第 4 页图 2。补 `[FRS]` 到 `[INV]` 的梯度链式法则，说明为何不同于旁路辅助图像损失；补从视觉压缩到动作块的具体计算过程。区分真实未来监督与预测表示输入。 |
| lda-1b-scaling-latent-dynamics-action-model | 重读 §III-A–E、图 2 与相关上下文，渲染第 3 页架构图。新增四调用模式表、损失速度符号解释、低质量推杯轨迹的目标路由例子；说明共享四目标不表示策略部署必须串行调用四遍。基础流匹配推导链接共享页。 |
| pi07-steerable-generalist-robotic-foundation-model | 重读 §III、VI-B/C、VII–VIII、算法 1，沿用已查看的第 4 页架构图及附录训练标记说明。补 FAST 交叉熵与连续动作损失的梯度隔离公式，明确解释性记号不冒充原文权重；按算法 1 写咖啡任务的异步子目标／动作执行例子。 |
| InverseDynamicsModels | 审阅全页；补同一杯子终态可由抓放或推移达到的非唯一逆映射；解释真实未来、预测未来与目标图三类输入及其分布差别；链接流匹配但不声称生成模型自动解决隐藏接触状态。 |
| LatentDynamicsActionModels | 审阅全页；把重复的完整流匹配公式移交共享页，保留本页特有的任务损失掩码；补同一轨迹的正向／逆向条件关系，强调逆推到的次优动作不自动变为最优控制。 |
| VisionLanguageActionModels | 审阅全页；补生成时间与物理控制时间的例子，以及动作向量维度相同不代表坐标、单位、控制模式相同。 |
| RobotContextConditioning | 审阅全页；通过全概率公式解释混合元数据条件与指定条件分布，补质量标签为何不是硬约束的例子。未额外声称某条件组合已经评估。 |
| CompositionalGeneralizationInRobotics | 审阅全页；补三阶段条件概率 0.9^3=0.729 的教学算例，解释为何指令平均得分不能还原整任务成功率。 |
| WorldModelsForEmbodiedAI | 审阅全页；补同形杯子不同隐藏重量的例子，解释为何历史、新观测和状态可辨识性影响动力学，不重复完整 ELBO 推导。 |
| WorldModelTaxonomy | 审阅全页；补分类三轴之外必须记录的训练与执行接口，解释相同标签不等于相同算法或计算成本。 |
| FlowMatching（新增） | 由已全文核验 LDA-1B 与 π0.7 两个来源共同支撑。区分生成时间与物理时间，展开直线插值→速度标签→平方损失条件均值→反向积分；附一维数值例子。明确这些是教学重构，不声称 π0.7 主文给出相同完整时间采样／求解器，也不把“条件均值速度”误写成单一平均动作。 |
| agentsserver | 从旧 README 功能列表改为固定提交的模块表与请求执行流程。完整读取新 README、interactive_chat_runtime.py，定向阅读 agent_server.py 的接收／分派／追加／广播／补读片段。改正旧接口草图，说明按序号补读到实时订阅的接缝；新增共享视图版本例子。没有运行项目，也没有完整安全审计。 |
| agentsdock-releases | 完整读取固定提交 README 与完整 Git 树响应。该提交只有 README，无更新器源码；改为分发职责、文档描述的流程和发布政策，明确未核验安装包签名。删除旧页无资产快照支撑的平台／Android“当前状态”说法；分发仓库无源码不等于客户端闭源。 |

未新建 TeacherForcing：当前几篇的教学缺口可以在训练／推理输入接口中解决，暂无必要再扩张一个共享概念。

## 新增原始证据

所有文件经 `tools/archive_source.py` 的 `archive` 函数保存，记录追加到 `graph/acquisitions.jsonl`，内容保留上游原始字节。没有安装或运行第三方仓库代码。

AgentsServer 固定提交：`bcb250eb5fab8678d41dc23489427f013305b57d`。官方原始 URL 的统一前缀为 `https://raw.githubusercontent.com/ZhengyiLuo/AgentsServer/bcb250eb5fab8678d41dc23489427f013305b57d/`。

| 原文件 | 新快照 | 阅读范围与采用状态 |
| --- | --- | --- |
| README.md | raw/agentsserver-readme-md-2026-10-04-d17732b96ff8.md | 全文阅读并采用 |
| agent_server.py | raw/agentsserver-agent-server-py-2026-10-04-ac01b8da041c.py | 全文件归档；只采用并完整阅读选定片段，不声称读完约 9.5 万行文件 |
| interactive_chat_runtime.py | raw/agentsserver-interactive-chat-runtime-py-2026-10-04-685cac3b1dfa.py | 全文阅读并采用 |
| codex_provider.py | raw/agentsserver-codex-provider-py-2026-10-04-a6d58a8d3f46.py | 获取后只读文件头和函数目录，发现它主要处理自定义 Responses 端点，不是这次要说明的后端执行器；**未完整阅读，未用它支持 Wiki 能力结论**。保留不可变获取记录，不计作完成收录的新独立来源。 |

agent_server.py 的已读片段：13455–13586（订阅与广播）、16701–16783（事件追加主体）、70916–71112（Codex 分派与接收入口）、71570–71695（忙状态／排队）、72389–72469（后端分派与监督任务）、88551–88580（轮次 HTTP 入口）、93894–93989（事件 WebSocket 补读与订阅）。这些范围的可重建缓存为 `graph/extracts/agentsserver-request-events-bcb250eb.md`，已分三段完整读回，保留原文件行号。另有零散认证分支检索，不据此声称完整认证审计。

`uv run python tools/extract_source.py` 成功生成 `graph/extracts/agentsserver-interactive-chat-runtime-py-2026-10-04-685cac3b1dfa.md`。同工具读取大型 agent_server.py 时，MarkItDown 将内容误判为 ASCII，在非 ASCII 字节处报错；于是直接用 Python 严格 UTF-8 解码已归档字节，生成上述指定行区间缓存。原文件未改。

AgentsDock-Releases 固定提交：`0637b37147fb0d9b10b995ce6876a80325197d8d`。

| 官方证据 | 新快照 | 阅读状态 |
| --- | --- | --- |
| https://raw.githubusercontent.com/ZhengyiLuo/AgentsDock-Releases/0637b37147fb0d9b10b995ce6876a80325197d8d/README.md | raw/agentsdock-releases-readme-md-2026-10-04-acc6a7e3cc9c.md | 全文 |
| https://api.github.com/repos/ZhengyiLuo/AgentsDock-Releases/git/trees/0637b37147fb0d9b10b995ce6876a80325197d8d?recursive=1 | raw/agentsdock-releases-tree-2026-10-04-98f340934f61.json | 完整响应；truncated=false，仅一个 README 文件 |

根代理待追加 ingest／refresh 记录：AgentsServer 补充固定提交 README、关键源码片段与完整共享视图模块；AgentsDock-Releases 补充固定 README 与树结构证据。两者均合并到既有来源页，不另建重复来源页。FlowMatching 复用已有论文，无新外部来源需 ingest。

## 验证与剩余范围

- 本组 15 页内部 WikiLinks、原证据字段路径、代码围栏配对通过定向检查。
- 本轮运行 `uv run python tools/health.py`：断链、原始证据、语言、证据状态、结构、目录检查均为 0；当时日志覆盖有其他组的 awesome-world-models、v-hacd-repository 两项，交根代理统一日志，不越权修改。
- 本轮没有修改任何前端；生产构建、目录、日志、主题元数据由根代理汇总。
- 保留上一轮 DeFI 表 5／附录数值、综述 COME 比较、LDA 指标和样本数、Seer 参数／预训练口径、π0.7 人类比较等证据边界；新增机制段落没有抹去这些限制。
- 项目只完成所列关键片段的静态机制核查；没有验证全部权限、更新签名、性能、并发持久性或平台支持。Releases 项目只有文档与树结构证据，不猜测未读更新器能力。
