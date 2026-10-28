---
title: "Physical RSI：物理世界递归自改进"
type: concept
tags: [robotics, agents, embodied-ai, source-backed]
sources: ["[[aspire-agentic-skills-discovery-for-robotics]]", "[[nvlabs-aspire-repository]]", "[[physical-rsi-research-map]]", "[[embodirsi-data-efficient-robot-adaptation]]", "[[physevo-physical-recursive-self-improvement]]", "[[enpire-agentic-robot-policy-self-improvement]]", "[[racap-evolvable-robot-learning]]", "[[dagger-no-regret-imitation-learning]]", "[[flowdagger-latent-space-corrections]]", "[[hi-wm-human-in-world-model]]", "[[pyrua-lean-fewer-tokens-better-action]]", "[[pyrua-lean-repository]]"]
modified: 2026-10-28
topics: ["topics/robot-harness-and-physical-rsi", "topics/robot-policy-learning", "topics/evaluation-and-transfer"]
---

# Physical RSI：物理世界递归自改进

Physical RSI 的文献用法尚不统一：有些工作指反复执行、收集经验和更新策略，有些要求改进程序自身被改变并继承。本页采用 [[physical-rsi-research-map|Physical RSI 作者资料库]] 的区分来分析证据，同时保留各论文自己的定义；不把一种严格口径宣称为全领域共识。

## 策略更好与改进方法更好

执行系统写成 $S_t=(\theta_t,H_t)$：$\theta_t$ 是模型参数，$H_t$ 是 [[RobotHarness|机器人 Harness]] 的技能、工具、记忆和执行规则。改进程序 $U_t$ 决定如何诊断失败、产生候选、收集数据、训练和筛选。物理执行得到数据 $D_t$，外部验收规则为 $V$。下面是教学形式化，并非某篇论文原式：

$$
D_t=\operatorname{Execute}(S_t,\mathcal E),\qquad
(S_{t+1},U_{t+1})=\operatorname{Accept}_{V}\bigl(U_t(S_t,D_t)\bigr).
$$

$\mathcal E$ 是实际交互环境。若每次都用同一训练／搜索程序，只让数据和策略变多，循环仍可有效，却不足以证明 $U_t$ 自身改善。若系统创建诊断工具，并在后续迭代中使用它生成更好的修复，才出现需要进一步验证的程序继承链。[[embodirsi-data-efficient-robot-adaptation|EmbodiRSI]] 明示学习形式固定；[[physevo-physical-recursive-self-improvement|PhysEvo]] 展示诊断工具的修订与继承，二者不能只按名字归为同等证据。

“Physical”也要有明确作用：仅给软件 agent 换成机器人主题任务不够；真实物理反馈是否改变了候选产生或保留决策？仿真中的递归优化和真实部署成功是两项证据，连接它们仍需实验证明。[[physical-rsi-research-map|作者框架]] 提出这个因果边界；[[simex-simulation-integrated-robotics-autoresearch|SimEX]] 提供真实失败进入仿真假设检验的具体实例。

## 交互式模仿学习提供一个固定改进程序的参照

[[dagger-no-regret-imitation-learning|DAgger]] 反复执行当前策略、查询专家并聚合数据；[[flowdagger-latent-space-corrections|FlowDAgger]] 改变纠正的监督空间；[[hi-wm-human-in-world-model|Hi-WM]] 改变纠正发生的环境并支持回退分支。它们可以使下一版策略更好，却不能仅凭循环和参数更新说明改进程序 $U_t$ 本身更好。[[InteractiveImitationLearning|交互式模仿学习]] 因而是研究外层智能体收益时有意义的参照：在相同策略起点和总成本下，比较自动诊断、采集选择或工具继承是否优于固定纠正程序。具体联合设计仍属于 [[topics/interactive-policy-improvement|待验证研究问题]]。

## 代码执行与代码规划器训练提供的参照

[[pyrua-lean-fewer-tokens-better-action|PyRUA-Lean]] 的两部分应分别映射到上述模型：交互代码在一次回合中修正动作、复用变量，属于执行闭环；PyRUA-Lean Coder 通过固定 GRPO 程序，用任务成败更新代码规划器参数，属于改进 $S_t$。主接口实验关闭跨回合记忆，Coder 实验也未让 GRPO 或诊断程序自行演化。因此二者提供了执行与固定学习器的实证参照，没有分离出 $U_t$ 继承带来的递归增益。[[pyrua-lean-repository|截至 2026-10-28 的公开仓库]]仍将 PyRUA-RSI 标为预告，不能用该名称替代已发布机制。

这个区分不否定代码作为改进载体的价值：可执行程序便于记录、修改和验证；要进一步证明累积效果，仍需明确哪些技能或诊断资源跨回合保留，以及在相同起点与总预算下如何影响后续改进。与 [[aspire-agentic-skills-discovery-for-robotics|跨任务技能库]]、[[physevo-physical-recursive-self-improvement|诊断工具继承]] 的比较集中在 [[topics/robot-harness-and-physical-rsi|研究专题]]。

## 可观察的四种证据

以下是本库的检查维度，不是论文统一等级：

| 观察到什么 | 需要保留的证据 | 尚不能推出什么 |
| --- | --- | --- |
| 本次执行会纠错 | 失败观测、恢复动作和实际结果 | 改动会跨任务或跨运行保留 |
| 下一版系统变好 | 策略／技能／数据变化及冻结评测 | 生成这些变化的方法变好了 |
| 改进工具被继承使用 | 修改来源、版本、后续调用与候选谱系 | 该继承比固定改进程序更有效 |
| 继承使后续改进更有效 | 相同起点、任务与预算下的独立对照 | 无界加速或开放世界普适性 |

[[physevo-physical-recursive-self-improvement|PhysEvo]] 的回放诊断工具在后续碰撞修复中复用，是第三行的具体案例；但其最终任务成绩不能单独测出工具继承的净贡献。[[enpire-agentic-robot-policy-self-improvement|ENPIRE]] 自动调整策略与训练代码，是研究程序更新的重要入口；仍需区分任务工程选择和后续改进能力的受控增益。

## 怎样验证递归增益

我们建议把候选改进程序 $U'$ 和旧程序 $U$ 从同一个执行系统 $S_0$、同一初始经验 $D_0$ 出发运行，在保留任务 $\mathcal Q$ 和相同预算 $B$ 上比较：

$$
\Delta_{meta}(B)=\mathbb E_{q\sim\mathcal Q}\left[J\bigl(U'(S_0,D_0;q,B)\bigr)-J\bigl(U(S_0,D_0;q,B)\bigr)\right].
$$

这里 $U(\cdot)$ 简写为运行改进程序后产生的执行系统；$J$ 用受保护的独立物理验收测量。需要多次试验和不确定性，而不是只选择最好一次。若将同一测试集反复给改进器看，测到的可能是开发集过拟合。

预算 $B$ 应同时记录真实尝试、仿真步数、训练算力、模型调用、人工重置／纠正和墙钟时间。提高成功率可能只是增加重试，减少示范也可能增加大量仿真筛选。[[enpire-agentic-robot-policy-self-improvement|ENPIRE 的重试协议]]、[[embodirsi-data-efficient-robot-adaptation|EmbodiRSI 的采样与保留数据]] 与 [[racap-evolvable-robot-learning|RACaP 的配对候选测试]] 展示了这些口径差异。

以上公式与实验建议是基于来源的综合分析，尚未在本库执行。固定外部验收并不禁止改进内部诊断器：允许它更好地提出候选，但不能通过降低“成功”的定义获得表面增益。[[regenharness-evidence-gated-self-improvement|RegenHarness]] 对此提出了不可修改的提交／发布约束，尚未给出相应多轮收益实验。

## 常见误解与实践意义

循环次数多不等于递归层次深；模型权重冻结也不等于没有学习；生成一个新技能不等于改变学习算法；某个模型自己说成功不等于独立验证。跨场景迁移还要说明任务是否改变，跨任务复用则要证明保留下来的资源实际被读取或调用，而不仅是存盘。[[aspire-agentic-skills-discovery-for-robotics|ASPIRE]] 与其 [[nvlabs-aspire-repository|v1.0 代码库]] 提供了两个关键例证：首先，在 `LIBERO-90 → LIBERO-Pro Long` 的零样本迁移消融（源任务数 $N \in \{0, 25, 50, 90\}$）中，虽然宏平均成功率随技能库扩大单调增长（$4.7\% \to 30.5\%$），但单个任务（如 `Stove+moka pot` 在 $N=50 \to 90$ 时从 0.68 降至 0.26）会出现因陈旧或过度特化技能引发的非单调退化；其次，ASPIRE v1.0 明确将技能入库门控拆分为**可传递性验证（transmits）**与**跨任务泛化证据（generalizes）**——独立盲测验证器（Skill Verifier）在隔离目录中不看原解、仅凭技能文本在 5 个种子 2 次尝试内复现修复，只能证明“文本把解法写清楚了”，而该技能是否真正跨任务泛化，仍需由后续不同任务在 `skill_report.json` 中给出的 `useful` / `misleading` / `wrong` 评级独立检验。[[physical-rsi-research-map]]、[[robofoundry-system-as-policy]]

工程上可以先建立可追溯的执行—诊断—候选—验收—保留链，再判断值得开放哪些更新面。对研究而言，最有价值的缺口是低成本地测出“改进器为何更有效”，而不是给所有自主循环统一贴 RSI 标签。当前工作比较与候选资料见 [[topics/robot-harness-and-physical-rsi|机器人 Harness 与 Physical RSI]]。
