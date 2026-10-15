---
title: RACaP：演化技能 API，再以冻结代码闭环执行
nav_title: RACaP
type: source
tags: [robotics, embodied-ai, source-backed]
sources: []
modified: '2026-10-15'
source_file: raw/racap-evolvable-robot-learning-2026-10-15-c7d32e9de5da.html
source_kind: html
source_type: paper
source_url: https://arxiv.org/abs/2609.29394v1
source_date: '2026-09-24'
source_version: 2609.29394v1
extracted_text: graph/extracts/racap-evolvable-robot-learning-2026-10-15-c7d32e9de5da.md
acquired: '2026-10-15'
snapshot_sha256: c7d32e9de5daddfa3470df0b42654c104a76da82b7cc822ea7177e531ee0fe9d
paper_title: 'RACaP: Agentic Reasoning, Acting, and Coding as Policies for Evolvable Robot Learning'
year: 2026
venue: arXiv 预印本
reviewed: '2026-10-15'
topics: [topics/robot-harness-and-physical-rsi, topics/robot-policy-learning, topics/agent-execution]
---

## 概览

RACaP 把编码放在部署前的演化阶段，运行时由 ReAct 调用冻结的有类型技能 API。持久产物包含技能实现、ReAct 的提示和调度规则、长期经验；当前回合的工作记忆仍随观测更新。它解决的是“可复用机制怎样存进代码，而场景相关决策怎样保留适应性”。（§1、§3）

本页完整阅读 v1 HTML 正文、参考文献和附录 A–D；未核查代码、未运行机器人。主要定量证据来自仿真，压缩模型实验是部署效率诊断，不是新增真机成功率验证。

## 改进对象与执行接口

论文把可部署系统写成 $\Pi=(\mathcal A_\theta,\pi_\phi,\mathcal M)$：$\mathcal A_\theta$ 为 Policy API 库，$\pi_\phi$ 为由 harness 配置控制的 ReAct 策略，$\mathcal M$ 为长期经验。这里 $\theta$、$\phi$ 表示实现和配置，不应一律理解为神经网络权重。运行时输入为指令、RGB-D、本体状态与工具返回；输出为带类型参数的函数调用。（§3.1）

API 包含抓放、插入、堆叠、推动、关节物体操作和旋钮等控制。几何、接触和轨迹执行放在技能内；物体选择、任务顺序、抓取模式、偏移、恢复与停止留给 ReAct。Full ReAct 管理完整目标，Transport ReAct 处理一个搬运子目标；六种提示角色属于两个决策层，不是六个独立智能体。（§3.5、附录 A）

例如一次放置偏离目标后，工具返回距离、状态和新图像；局部 ReAct 可以先改抓取偏移，接近后改用小幅推动。代码本身不变，参数和调用顺序变化。长期记忆存前提、恢复经验与接口限制，不应存测试任务答案或真值坐标。每次动作后重新读取视觉证据，不能用“函数返回成功”代替任务确实完成。（附录 A、C）

## 两阶段演化及接受准则

第一阶段由人工规定能力课程：先把41个搬运任务的执行、恢复和视觉检查做稳，再扩到90个任务的插入、堆叠、关节操作和任务编排。过早从基础原语开放探索时，感知、抓取和排序错误会混在一起，难以归因；课程提供可诊断的起点。（§3.3）

第二阶段自行聚类失败，提出单项 API、参数暴露、工具报告、提示或记忆修改，用同任务、种子和预算进行父版本与候选的配对比较。固定 harness 和记忆时，论文式2的目标为

$$
\Delta(\theta')=\sum_{\tau\in\mathcal D_{dev}}[S(\tau,\mathcal A_{\theta'},\pi_\phi,\mathcal M)-S(\tau,\mathcal A_\theta,\pi_\phi,\mathcal M)],
$$

其中 $S\in\{0,1\}$ 是模拟器原生成功判据，$\mathcal D_{dev}$ 为开发任务集。收益须抵过回归，不能只在刚失败的任务上修好。固定 API 后，式3对 harness／记忆按字典序优化：先比较成功数，相同时才偏好较少 ReAct 轮数。附录的实际晋升规则要求成功差严格为正；因此效率目标与实际候选晋升应分别理解。（§3.1、§3.4、附录 B）

第二阶段使用596个开发回合，生成32项提案、测试23项候选、晋升9项。各能力组分母不同，不能把9次局部胜出视为9次全任务独立提升。最后完整系统冻结，跨任务测试不能再改代码、提示、长期记忆或模型；回合内工作记忆可更新。（§3.4、§4.1）

## 实验与反例

| 设置 | 结果 | 解释边界 |
| --- | --- | --- |
| LIBERO-90，每任务种子0，共90回合 | 第二阶段49/90；课程结束的演化运行48/90，统一评测模型重放第一阶段42/90 | 演化使用 GPT-5.6，标准评测使用 GPT-5.5，不能混用48和42的基线 |
| LIBERO-PRO，6套×10任务×3种子 | 第一阶段59/180，第二阶段81/180；最强 CaP 基线32/180 | 配对 McNemar 检验第一／二阶段差异 $p=0.00126$；不是跨论文排行榜 |
| LIBERO-Long，10任务×5种子 | 第一阶段16/50，第二阶段23/50；基线1–2/50 | 两阶段配对 $p=0.118$，Close 子目标仍为0，不能声称所有长任务都稳定改善 |
| Robosuite，7任务×5种子 | 冻结版本6/35，CaP-X 9/35；目标域演化后 RACaP 与 RATS 都为11/35 | 接口可适应不等于已经解决跨机器人零样本迁移 |
| 紧凑决策器，附录 D.1 | 54条接受、40条拒绝的教师决策；60个配对回合中重复物理调用16→4 | 0.750秒与教师代理9.895秒来自不同部署条件，13.2倍是推理延迟比较，不是成功率增益 |

标准回合限制为一次重置、8000仿真步、1000秒策略时间；代码基线最多10轮视觉修复。RATS 的对照使用共同重置上限，但实际开发回合与费用并非全部相等。其退步审计中，接口漂移解释181/321项失败，支持维护调用契约的重要性，不能由此断言任何自由探索必然有害。（§4、附录 D）

## 局限与联系

运行时能力受冻结 API 的表达范围限制，新物理技能不能凭调参凭空产生。跨任务收益已有受控证据，但没有证明改进程序本身在相同新任务、数据和预算下变得更有效；它首先是可继承的技能与 harness 演化。（§5；后句为我们的解释）

与 [[gap-graph-as-policy|GaP]] 的固定图执行相比，RACaP 部署时保留模型的任务决策循环；与 [[robofoundry-system-as-policy|RoboFoundry]] 可提升上下文和技能系统的路线相邻。共享机制见 [[RobotHarness|机器人 Harness]]、[[PhysicalRecursiveSelfImprovement|Physical RSI]]；动作接口约定见 [[PolicyDeploymentContract]]。
