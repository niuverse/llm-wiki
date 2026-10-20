---
title: "可执行世界表示"
type: concept
tags: [world-models, program-induction, simulation, agents, source-backed]
sources: ["[[code-as-world-executable-world-representations]]", "[[agentgarten-code-worlds-evolving-agents]]", "[[schema-discovering-unknown-environments-via-agentic-program-induction]]", "[[tycho-active-abstraction-with-programmatic-world-models]]"]
modified: 2026-10-20
topics: ["topics/executable-world-representations", "topics/world-models-and-representations"]
---

# 可执行世界表示

**一句话：把“世界是什么、怎样变、看起来怎样”写成可运行的程序，使状态可查询、动力学可执行、预测可验证。** 它不是“用代码描述场景”这么宽泛：关键在**执行**——程序能跑出轨迹，轨迹能与观测比对，差异能定位到具体成分。像素世界模型把状态藏在生成历史里；可执行表示把状态摆到接口上。

## 一个最小结构

Code-as-World 给出的分解是 $p=(C,E,A)$：

| 成分 | 内容 | 作用 |
| --- | --- | --- |
| $C$ 物理构成 | 对象、网格、尺寸、质量、摩擦、重力；地板/墙也是物理实体 | 决定“存在什么、能参与什么接触” |
| $E$ 动态演化 | 初态、事件、时长、外力 | 决定“轨迹怎样展开” |
| $A$ 视觉外观 | 相机、材质、光照、帧率、分辨率 | 决定“从哪个视角、以什么风格被看到” |

给定 $p$，编译成模拟器参数 $\theta$，执行得到轨迹 $\tau=\operatorname{Sim}(\theta)$；渲染器把 $\tau$ 变成观测 $\hat o$。物理等价优先于像素复制：$C,E$ 一致比 $\hat o$ 与 $o$ 逐像素接近更重要，因为前者才能支持反事实干预。

这个结构与“世界模型 = 视频生成器”是两种接口。视频生成器的状态是隐式的、不可直接编辑；可执行表示的状态是显式的，能查询、改一个变量重跑、把同一轨迹换相机/材质重渲染。[[agentgarten-code-worlds-evolving-agents|AgentGarten]] 把这一点工程化：代码世界维护状态与规则，神经渲染器只学“看起来怎样”，从而同时要 faithful 与 realistic。

## 两种用法，不要混为一谈

**作为知识/监督。** [[code-as-world-executable-world-representations|Code-as-World]] 从文本或视频反推 $p$，用被接受的 EWR 生成同步视频与状态轨迹，再从轨迹读出精确标签（尺寸、位移、速度、加速度），训练 VLM。这里的产物是**数据与表示**，验证信号是“仿真观测与输入证据是否一致”。

**作为环境/练习场。** AgentGarten 用代码世界给智能体提供可交互环境：动作先改变代码状态，渲染器再生成观测。这里的产物是**经验**，验证信号是任务能否完成、策略能否跨轮改进。

两者共享“状态与外观分离”，但目标函数不同：前者要求表示解释已有观测，后者要求环境对动作作出正确响应。把两者混成“世界模型”一个词，会看不清失败出在哪：是表示错了，还是环境不响应，还是智能体不会用。

## 发现循环：假设—执行—渲染—验证

Code-as-World 的循环是这一类方法的模板：

1. **证据适配**：文本 → 实体/关系/事件/预期；视频 → 深度、掩码、轨迹、网格。
2. **提议/修改**：智能体根据证据、当前假设与上轮诊断，改 $C$、$E$ 或 $A$。
3. **实例化**：编译成模拟器可执行的参数。
4. **执行**：跑出轨迹，记录接触、碰撞、速度、终止。
5. **渲染/投影**：渲染 RGB；视频输入还把状态投影成深度、掩码、图像平面轨迹。
6. **验证**：在关键帧比较预测与证据；文本输入查语义与物理约束，视频输入查 RGB/深度/掩码/轨迹。
7. **诊断**：把差异汇总成结构化反馈，指导下轮只改相关成分；满足解释力与简约性则接受。

这里没有可微损失；验证器是“比较—诊断—改写”的语言回路。优点是能处理异构证据与结构修改，缺点是收敛依赖诊断质量，且关键帧检查会漏掉长时程漂移。[[schema-discovering-unknown-environments-via-agentic-program-induction|Schema]] 在离散游戏里用同一逻辑（程序预测下一帧、全历史回测），[[tycho-active-abstraction-with-programmatic-world-models|Tycho]] 进一步问“何时值得建/修/绕过模型”。三者的共同前提是：**程序可以被证伪**。

## 成立需要哪些假设

1. **模拟器足够覆盖**：代码表达力与引擎的物理范围要包含目标现象。刚体引擎表达不了流体、布料、燃烧；几何条件表达不了材质、颜色、旋转对称物体的自转。
2. **验证信号足够强**：关键帧 RGB/深度/掩码能区分“机制正确”与“碰巧看起来对”。Code-as-World 自己承认可能收敛到局部可信但机制错误的 EWR。
3. **标签来自状态，而不是渲染**：世界空间监督的精度取决于轨迹与标定；`metric` 与 `scene_unit` 两种尺度说明绝对尺度并不总能恢复。
4. **外观可以后置**：物理轨迹正确后，用生成模型补 realism 不会改变物理；但生成模型可能引入与轨迹不一致的细节。

## 常见失败情形

- **局部可信、机制错误**：视频对齐好，但接触/摩擦参数错，换个初速度就崩。对策是反事实干预测试，而不是只看重建。
- **验证器只看关键帧**：慢漂移、长时间接触、遮挡后状态变化可能漏检。
- **条件不完整**：AgentGarten 的深度/法线条件无法表达自转、材质、身份；渲染器可能生成“看起来对但状态不对”的帧。
- **手写世界成本**：每个世界都要写规则、调参数、设计任务；规模化需要编码智能体生成/修订世界，而“世界是否值得练”还需自动检查。
- **把范式差异当效率**：AgentGarten 的“4 轮 vs 2,500 万回合”是预训练先验 + 代码世界 + playbook 对从零 RL 的对照，不是同一算法的样本效率比。

## 实践含义

如果要把可执行表示用于机器人或仿真：

1. **先定接口**：状态里哪些量可查询、哪些动作可施加、渲染器需要哪些条件；接口决定哪些世界能表达。
2. **把验证做成证据链**：每次接受/拒绝记录假设、轨迹、关键帧差异与理由，而不是只留一个分数。
3. **用干预测试机制**：改一个物理量重跑，检查轨迹是否按预期变；这比重建误差更能暴露“碰巧对”。
4. **分开计量表示、环境与策略**：表示的解释力、环境的动作响应、策略的任务收益是三张表，不能用一个成功率替代。
5. **承认尺度与覆盖边界**：单目视频的绝对尺度、刚体假设、关键帧验证，都要写进结果的条件里。

## 与库内工作的关系

[[code-as-world-executable-world-representations|Code-as-World]] 给出物理世界的 EWR 与发现循环；[[agentgarten-code-worlds-evolving-agents|AgentGarten]] 给出代码世界 + 实时渲染器的环境实现；[[schema-discovering-unknown-environments-via-agentic-program-induction|Schema]] 与 [[tycho-active-abstraction-with-programmatic-world-models|Tycho]] 提供离散环境下的程序归纳与模型维护策略。更广的仿真就绪资产与执行基础设施见 [[SimulationReady3DWorldGeneration|Simulation-ready 3D Generation]]、[[ExecutableEmbodiedInteractionInfrastructure|可执行具身交互基础设施]]；评测侧见 [[AgentifiedEvaluation|智能体化评测]]。

研究入口：[[topics/executable-world-representations|可执行世界表示与智能体化评测]]。
