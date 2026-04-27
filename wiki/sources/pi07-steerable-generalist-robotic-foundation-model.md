---
title: "π0.7: a Steerable Generalist Robotic Foundation Model with Emergent Capabilities"
type: source
tags: [robotics, robot-foundation-models, vla, context-conditioning, generalization]
sources: []
last_updated: 2026-04-27
source_file: raw/pi07.pdf
source_kind: pdf
source_date: 2026-04-16
source_url: https://www.pi.website/download/pi07.pdf
extracted_text: graph/extracts/pi07.md
---

## 摘要

Physical Intelligence 的 π0.7 paper 提出一个 [[Pi07|π0.7]] robot foundation model：它不是只把 task language 映射到动作，而是把 task instruction、subtask instruction、generated subgoal images、episode metadata 和 control mode 都放进 prompt/context，让同一个 [[VisionLanguageActionModels|VLA（vision-language-action model）]] 可以利用 demonstration data、mixed-quality autonomous data、human egocentric video 和 web multimodal data。

论文的核心判断是：大规模异质数据本身不够，robot policy 需要 [[RobotContextConditioning|context conditioning]] 来区分 episode 的策略、质量、速度、mistake 与 visual outcome。否则模型会在不同 strategy/mode 之间平均，学到 suboptimal behavior。π0.7 用 richer context 把“数据多样性”转成可 steer 的行为空间，并在实验中展示 out-of-the-box dexterity、instruction following、cross-embodiment transfer 和 [[CompositionalGeneralizationInRobotics|compositional generalization in robotics]]。

Source URL: https://www.pi.website/download/pi07.pdf

Related project page: https://www.pi.website/blog/pi07

## 核心主张

- π0.7 是一个约 5B-parameter 的 VLA：4B Gemma3 VLM backbone、MEM-style video history encoder、860M-parameter flow-matching action expert，并在 context 中加入 language commands、episode metadata、control mode 和 subgoal images。
- 标准 VLA objective 是从 observation history $o_{t-T:t}$ 与 context $C_t$ 预测 future action chunk $a_{t:t+H}$；π0.7 的主要变化不是全新 backbone，而是扩展 $C_t$，让 training examples 携带“怎么做”和“做得多好”的信息。
- Prompt/context 被拆成 task instruction $\ell_t$、subtask instruction $\hat{\ell}_t$、multi-view subgoal images $g_t$、episode metadata $m$ 与 control mode $c$。Training 时随机 dropout prompt components，使模型在 test time 可以使用任意子集。
- Subgoal images 由 lightweight world model 生成；这个 world model 接收当前 observation、subtask instruction 和 metadata，输出 near-future multi-view images。它把 language-level intent 转成 visual target，使低层 VLA 更容易做 spatial grounding。
- Episode metadata 包括 overall speed、overall quality 和 mistake label。论文的关键 argument 是：metadata 允许模型吸收 failures、low-quality demonstrations 与 autonomous rollouts，同时在 test time 被 prompt 到 fast/high-quality/no-mistake mode。
- Runtime pipeline 是 hierarchical 的：human 或 learned high-level policy 产生 subtask instruction，world model 异步刷新 subgoal images，π0.7 action expert 产生 50-step action chunks，并用 real-time action chunking 处理 inference delay。
- 实验声称 π0.7 在 laundry folding、espresso、box building 等 dexterous tasks 上能 out-of-the-box 接近或超过 task-specific RL/SFT specialists；ablation 显示去掉 metadata 或 autonomous evaluation data 会显著降低表现，尤其是 throughput。
- Instruction-following 实验覆盖 unseen kitchens/bedrooms、complex referential instructions 和 deliberately reversed dataset biases；generated subgoal images 对一些 reverse-bias tasks 是关键。
- Cross-embodiment transfer 实验中，π0.7 把 folding 等 dexterous skills 转移到未收集该 task 数据的 bimanual UR5e system；shirt folding 对比中，π0.7(GC) 达到 85.6% task progress / 80% success，expert teleoperators 为 90.9% / 80.6%。
- Compositional generalization 主要表现为两类：short-horizon unseen tasks 可直接 prompt；long-horizon unseen appliance tasks 需要 step-by-step language coaching，之后可以用 coaching traces 训练 high-level policy，让 π0.7 autonomously 生成 subtasks。
- 论文也明确承认 zero-shot generalization 仍低于 in-distribution：seen tasks 常超过 90% success，而 unseen tasks 或 unseen task-robot combinations 通常在 60-80% range。
- “Seen/unseen” 本身难以界定：由于 training data 很大且多样，某些看似 unseen 的行为可能是从相关 episodes、web-scale pretraining 或 incidental skills 中 remix 出来的。

## 关键引文

- "how to do it"
- "out of the box"
- "compositional generalization"

## 关联

- [[Pi07]] - 本 source 的核心 model/entity page。
- [[PhysicalIntelligence]] - 发布 π0.7 paper 与相关 model line 的组织。
- [[VisionLanguageActionModels]] - π0.7 所在的 action-prediction model family。
- [[RobotContextConditioning]] - 本文最重要的机制：用 richer context 解开 heterogeneous robot data 的 ambiguity。
- [[CompositionalGeneralizationInRobotics]] - 本文围绕 unseen tasks、language coaching 和 cross-embodiment transfer 展示的能力类型。
- [[WorldModelsForEmbodiedAI]] - π0.7 的 subgoal generator 是一个 decision-coupled world model use case：world model 不直接控制机器人，而是生成 visual goals 来 condition policy。

## 开放问题

- π0.7 的 compositional generalization 有多少来自 robot data 中的 latent overlap，有多少来自 web-scale VLM/image-generator pretraining，还有多少来自 prompt/context design？
- Subgoal-image world model 在 failure recovery 中如何表现？如果它生成 plausible 但 physically unreachable 的 goal images，VLA 会如何失败？
- Metadata prompting 是否会在 deployment 中产生 miscalibration：例如要求 high speed/high quality/no mistake，但当前 state 或 embodiment 已经超出训练分布？
- “Coaching → high-level policy” 能否扩展到更长 horizon、更高 branching factor、需要 retry/repair 的 household tasks？
- 论文没有把 model weights、training data 或 full evaluation protocols 变成可复现 artifact；这些 claims 目前主要是 source-specific evidence，而不是 independent benchmark consensus。
