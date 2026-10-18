---
title: "交互式模仿学习与 DAgger"
type: concept
tags: [robotics, imitation-learning, source-backed]
sources: ["[[dagger-no-regret-imitation-learning]]", "[[hg-dagger-human-experts]]", "[[thriftydagger-budget-aware-interventions]]", "[[sirius-robot-learning-on-the-job]]", "[[sirius-fleet-visual-world-models]]", "[[flowdagger-latent-space-corrections]]", "[[hi-wm-human-in-world-model]]", "[[embodirsi-data-efficient-robot-adaptation]]", "[[rho-efficiently-adaptable-vla-models]]", "[[simex-simulation-integrated-robotics-autoresearch]]"]
modified: 2026-10-18
topics: ["topics/robot-policy-learning", "topics/interactive-policy-improvement", "topics/robot-harness-and-physical-rsi"]
---

# 交互式模仿学习与 DAgger

交互式模仿学习让当前策略参与决定下一轮需要哪些监督：先执行策略，再对它实际访问的状态查询专家、接受纠正或收集恢复轨迹，把新经验用于下一次更新。[[dagger-no-regret-imitation-learning|DAgger]] 用数据聚合处理行为克隆的状态分布偏移；[[hg-dagger-human-experts|HG-DAgger]] 把何时介入的决定交给人类。两者不能等同为“每次出错后重置，再录一条成功示范”。

## 为什么干净示范不够

[[RobotLearningObjectives|行为克隆]] 在示范输入上拟合动作，部署时自己的动作却会改变下一时刻的输入。**教学例子：** 专家总能从杯子正上方抓取，学生稍有偏差后把杯子推到桌边；训练集中可能没有“杯子已在桌边、手臂也在错误位置”的正确动作。仅增加同一种标准初态的成功示范，未必补到这个缺口。DAgger 的关键是为学生诱导的状态提供专家动作，而不只是增加数据量。[[dagger-no-regret-imitation-learning]]

这依赖专家能在这些状态提供有用监督。若杯子已经掉出工作台，专家也不能凭一个正确动作恢复；若视觉观测不能辨认持物或接触状态，给更多同观测的冲突动作也不能补回缺失信息。这是由纠正接口和可观测性得到的实践解释，不是 DAgger 对任意机器人任务的成功保证。专家、观测和门控的具体假设见 [[hg-dagger-human-experts|HG-DAgger]] 与 [[thriftydagger-budget-aware-interventions|ThriftyDAgger]]。

## 数据聚合和接管各改变什么

以下统一符号是教学表达。令 $\pi_k$ 为第 $k$ 轮学生策略，$\pi_E$ 为专家，$s$ 为执行状态，$o=h(s)$ 为学生可用观测；$h$ 是观测映射。执行产生状态后，查询专家得到动作 $a^E$，把有专家标签的样本聚合为

$$
D_{k+1}=D_k\cup\{(o_t,a_t^E):\text{第 }k\text{ 轮中该状态被专家标注}\},\qquad
\theta_{k+1}\in\arg\min_\theta\mathbb E_{(o,a^E)\sim D_{k+1}}\ell(\pi_\theta(o),a^E).
$$

$\ell$ 是适合策略表示的监督损失，不要求一定用动作均方误差。原始 DAgger 在执行中使用逐轮减少的专家混合，并查询访问状态的专家动作；HG-DAgger 主要利用人类接管期间的数据。**执行某个动作、给该状态提供监督标签、把样本保留入库，是三个不同决定。** [[dagger-no-regret-imitation-learning]]、[[hg-dagger-human-experts]]

用 $g_k(s)\in[0,1]$ 抽象表示接管概率，混合执行策略可写为

$$
\mu_k(a\mid s)=(1-g_k(s))\pi_k(a\mid h(s))+g_k(s)\pi_E(a\mid s).
$$

该式省略观测历史和操作者内部判断，只说明控制权的混合。其访问分布是 $d^{\mu_k}$，并非严格的纯学生分布 $d^{\pi_k}$；再只选接管时刻，标签分布还会被门控筛选。因此“on-policy 纠正”指针对当前策略造成的情境收集监督，不能据此声称整段接管轨迹来自未受干预的学生策略。[[hg-dagger-human-experts]]、[[thriftydagger-budget-aware-interventions]]

“on-policy”也不规定更新必须是强化学习。是否使用奖励、回报估计和策略优化，应检查实际目标；[[flowdagger-latent-space-corrections|FlowDAgger]] 就把纠正动作反演为潜变量标签，再用监督回归训练小策略。

原始 DAgger 的理论还依赖有界损失、无遗憾学习和专家混合比例等条件，保证的是历代策略中存在表现良好的策略，而不是最后一个神经网络检查点必然最好。仅在选择性接管时提供监督，改变了原分析的标签覆盖，不能直接继承其保证。完整条件与任务代价转换见 [[dagger-no-regret-imitation-learning|原论文精读]]。

## 谁决定接管，谁提供动作

| 机制 | 触发与监督 | 需要分别检查的成本或偏差 |
| --- | --- | --- |
| 人类主动接管 | 人观察策略，判断何时需要纠正；HG-DAgger | 持续监看、反应延迟、纠正一致性；仅计接管时间会漏掉监看成本 |
| 系统请求接管 | 新颖性／风险或异常预测请求人类；ThriftyDAgger、Sirius-Fleet | 误报、漏报、阈值与策略更新后的监控有效性 |
| 仿真脚本专家 | 读取特权物体状态产生纠正；Rho 等 | 不是等量人工劳动；特权信息能否被学生观测表达 |
| 智能体与规划器恢复 | 从当前物体与机器人状态规划，经几何和执行检查；EmbodiRSI | 请求、可执行纠正、成功恢复分别统计；规划器未必覆盖所有失败状态 |

表格按 [[hg-dagger-human-experts]]、[[thriftydagger-budget-aware-interventions]]、[[sirius-fleet-visual-world-models]]、[[rho-efficiently-adaptable-vla-models]] 和 [[embodirsi-data-efficient-robot-adaptation]] 归纳。接管者与触发者可以分离；自动触发人工纠正仍然依赖人类专家。

## 不能把整段执行都当作正确动作

接管记录至少含四种语义：初始专家示范、策略自主动作、专家纠正、接管前可能导致失败的动作。它们可以共同用于学习，但监督身份和权重需要说明。[[sirius-robot-learning-on-the-job|Sirius]] 将接管前片段的训练权重设为零并强调纠正；[[flowdagger-latent-space-corrections|FlowDAgger]] 用纠正和成功自主执行的两个缓冲区组成训练批次；[[embodirsi-data-efficient-robot-adaptation|EmbodiRSI]] 的实际实验只保留最终成功的回合，失败回合参与归因而不进入策略训练。这些是不同方法，不能统一写成“只学专家”或“所有执行数据都做行为克隆”。

采样权重与数据存量分开理解，见 [[RobotLearningDataComposition|训练数据构成]]。一个回合接管后完成，证明人机系统解决了该次任务；只有关闭接管后的独立评测，才测量学生吸收了多少纠正。[[sirius-fleet-visual-world-models|Sirius-Fleet]] 明确区分自主和联合执行指标。

## 仿真怎样改变纠正的成本

物理仿真可把一个偏离状态保存下来供恢复与候选比较；[[hi-wm-human-in-world-model|Hi-WM]] 在学习出来的世界模型中缓存中间状态，并回退、分支采集不同纠正延续。两者都在复用失败附近的情境，但世界模型状态不等于物理真值，纠正有用还要求预测忠实响应动作，尤其在原本就缺数据的失败区域。

**工程解释：** 重放应绑定环境版本、策略版本、控制频率、执行过的动作和必要历史。仅保存一张图像不能保证同样的接触、速度、控制器状态或策略记忆；恢复日志也不等于恢复物理环境。通用约定见 [[PolicyDeploymentContract|策略部署契约]]，状态与执行分离见 [[RobotHarness|机器人 Harness]]。

## 与仿真自改进的边界

DAgger 提供“从当前策略访问状态获得监督”的内环；外层系统还可决定下一轮练哪个场景、用哪个专家、如何分配预算以及候选是否被接受。[[embodirsi-data-efficient-robot-adaptation|EmbodiRSI]] 增加失败驱动采集；[[simex-simulation-integrated-robotics-autoresearch|SimEX]] 则把失败转成工具代码修复实验，未因此产生可直接训练 VLA 的专家动作标签。

所以，持续训练、一次恢复和 [[PhysicalRecursiveSelfImprovement|改进方法自身变强]] 是不同证据。跨论文机制和系统设计问题集中在 [[topics/interactive-policy-improvement|接管学习与仿真自改进]]，不把完整外层系统视作 DAgger 定理的自动推论。
