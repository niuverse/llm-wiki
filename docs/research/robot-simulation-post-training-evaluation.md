# 机器人模型仿真评测是否需要仿真数据后训练：证据综述与评测建议

调研日期：2026-07-23

## Executive Summary

结论不是简单的“需要”或“不需要”，而是取决于评测想估计哪个量：

- 如果目标是测量模型的 **frozen zero-shot / OOD generalization**，不应使用目标仿真 benchmark 的数据微调。此时 simulator 是测量仪器，目标域微调会把“模型原有能力”与“对 benchmark 的学习能力”混在一起，并引入 simulator overfitting。
- 如果目标是测量 **few-shot adaptation、task learning 或 continual learning**，使用仿真 demonstration 做 post-training 通常就是协议的一部分。LIBERO、CALVIN、RoboTwin 2.0 和 RoboCasa365 都属于这一类或包含这一类 track。
- 如果模型要迁移到新的 embodiment、camera、action space、controller frequency 或 observation schema，轻量 post-training 往往有现实必要性；但应把它称为 target-domain calibration / adaptation，而不是 zero-shot evaluation。
- 如果最终目标是 **sim-to-real deployment**，高质量、足够多样且与真实接口对齐的仿真数据通常值得使用，最好与少量真实数据组成 `sim-only / real-only / sim→real / sim+real` 四组对照。仿真训练不能替代真实硬件终评。
- 当前证据也明确显示“更多 synthetic data”并非单调更好：低质量 synthetic demonstrations、过窄的 simulator、过多的单任务 fine-tuning 都可能降低泛化或真实相关性。

因此，最稳妥的评测设计不是只报一个数字，而是同时提供两条主线：

1. `Frozen/OOD track`：目标仿真数据零接触，测先验能力。
2. `Adaptation track`：在严格隔离的仿真训练集上微调，报告 data-efficiency curve。

如果项目关注真实部署，再增加第三条 `Real-transfer track`。这三条 track 回答的是不同问题，不能把结果混为同一排名。

## 1. 先定义“后训练”和“仿真评测”

这里的 **post-training（后训练）** 指：从一个通用 pretrained / instruction-tuned robot model 或 VLA checkpoint 出发，使用目标 simulator 中采集、teleoperate、自动生成或在线 rollout 得到的数据继续更新模型参数。常见形式包括：

- offline imitation learning / behavior cloning；
- parameter-efficient fine-tuning，例如 LoRA；
- full fine-tuning；
- online RL 或 preference/reward-guided optimization；
- sim pretraining 后再用少量 real data fine-tuning。

以下操作应单独记录，不宜悄悄计入“zero-shot”：action normalization、camera calibration、IK / operational-space controller、control frequency resampling、observation adapter、prompt template 和 system identification。它们未必更新模型参数，但仍可能显著改变结果。

另一个容易混淆的词是“zero-shot”：

- `target-simulator zero-shot`：模型没有见过目标 simulator 的训练数据；它可能已经用大量真实机器人数据 fine-tune 过。
- `zero-real-shot`：模型没有用真实目标任务数据，但可能已经用目标仿真数据训练过。
- `base-checkpoint zero-shot`：不做任何目标域模型参数更新，只允许事先声明的接口适配。

报告必须说明使用的是哪一种定义。

## 2. 为什么不同 benchmark 会给出相反答案

设初始策略为 $\pi_0$，目标仿真 test distribution 为 $D^{test}_{sim}$。Frozen evaluation 测的是：

$$
J_0 = \mathbb{E}_{\tau \sim D^{test}_{sim}}[R(\pi_0;\tau)]
$$

若允许用 $k$ 条仿真 demonstration 做 adaptation，则测的是：

$$
J(k) = \mathbb{E}_{\tau \sim D^{test}_{sim}}[R(\operatorname{Adapt}(\pi_0,D^{train}_{sim,k});\tau)]
$$

$J_0$ 回答“模型带着已有先验来到新环境能做什么”，$J(k)$ 回答“给定 $k$ 条目标域数据后能学多快”。二者都重要，但不是同一个 estimand。将一个模型的 $J_0$ 与另一个模型的 $J(k)$ 直接排序没有解释力。

真实部署还需要第三个量：

$$
J_{real}(\pi_{sim\rightarrow real})
$$

它只能由真实机器人任务验证。仿真成功率或 sim-real correlation 可以帮助筛选，但不能替代这个终点。

## 3. 按评测目的给出直接答案

| 评测目的 | 是否用目标仿真数据 post-train | 原因 | 推荐标签 |
| --- | --- | --- | --- |
| 测 frozen foundation-model capability | 不应 | 避免 benchmark leakage 与 simulator overfitting | `Frozen/OOD` |
| 测跨任务、跨场景或跨 embodiment zero-shot | 原则上不应 | 目标域适配会改变 generalization 问题 | `Target-sim zero-shot` |
| 测 few-shot learning / adaptation efficiency | 应该 | 微调本身就是被测能力 | `Adapt-k`，报告 $k$ 和 compute |
| 测 continual / lifelong learning | 应该 | 要观察 sequential adaptation 与 forgetting | `Continual` |
| 新 action space、camera 或 robot embodiment | 通常需要，但需保留 frozen 对照 | 接口错配常使 base model 无法公平运行 | `Embodiment calibration` |
| 校准仿真评测与真实排名的一致性 | 可做少量、受控的 adaptation | 新证据表明能改善 correlation，但过量会过拟合 | `Proxy calibration` |
| 为真实部署提升策略 | 通常值得，但必须以 real eval 终审 | domain randomization 和 mixed sim-real data 常有益 | `Sim-to-real` |
| 在 simulator 内做 online RL | 可做，单列 track | 它测优化后的策略，而非原始模型能力 | `Online-RL` |

## 4. Primary-source evidence

### 4.1 不用目标仿真数据：RoboLab 和 SIMPLER 的诊断式路线

[RoboLab](https://arxiv.org/html/2604.09860)（2026）明确把“训练域”和“仿真评测域”解耦：被测策略在真实 DROID 数据上 fine-tune，随后作为 off-the-shelf policy 进入 RoboLab；目标 simulator 不提供训练数据。作者指出，LIBERO 等 benchmark 在同一 simulated domain 内训练和评测，使用 simulator demonstrations 微调会使任务变容易，却难以回答模型能否对未见环境泛化。RoboLab 因而把 simulator 定位为 controlled diagnostic instrument，而不是训练场。

[SIMPLER](https://simpler-env.github.io/) 同样主要把 simulation 用作 real-world policy evaluation proxy：给定在真实数据上训练的 RT-1、RT-1-X、Octo 等策略，在视觉匹配的仿真场景中执行 inference，并用 Pearson correlation 和 Mean Maximum Rank Violation（MMRV）比较模拟与真实排序。这个协议要测的正是“现有真实策略在仿真里能否被正确区分”，所以在目标 simulator 上 fine-tune 会破坏问题定义。

这条路线最适合：foundation model 的 frozen capability、OOD robustness、failure analysis、模型筛选，以及验证 simulator 是否能重现真实 failure modes。

### 4.2 使用目标仿真数据：LIBERO、CALVIN、RoboTwin 2.0 的学习式路线

[LIBERO](https://github.com/Lifelong-Robot-Learning/LIBERO) 是 lifelong robot learning benchmark，提供 130 个任务与高质量 simulated teleoperation demonstrations；标准问题包括 sequential fine-tuning、multitask learning，以及从较大任务集合到下游任务的知识迁移。这里仿真 demonstration 是训练协议的组成部分，而不是泄漏。

[OpenVLA 官方评测说明](https://github.com/openvla/openvla)进一步展示了同一模型在不同协议下的差异：在与 pretraining domain 匹配的 Bridge 场景可以 zero-shot 推理；在 LIBERO 上则为每个 suite 使用其 simulated data 做 LoRA fine-tuning。官方报告的 LIBERO 平均成功率为 OpenVLA 76.5%、Octo 75.1%、从头训练的 Diffusion Policy 72.4%。这些数字衡量的是 in-domain / suite-level adaptation 后性能，不能当作 frozen zero-shot 成绩。

[CALVIN](https://github.com/mees/calvin) 也是从 simulation dataset 学习 long-horizon language-conditioned manipulation，再在规定环境和任务链上评测的 benchmark。其核心问题是 data-driven policy learning 与长程组合能力，使用仿真训练数据是题目的一部分。

[RoboTwin 2.0](https://arxiv.org/html/2506.18088v2) 同时提供了更直接的实证。其训练式 benchmark 为每个任务采集 50 条 clean simulated expert demonstrations，并在 easy / hard 设置各做 100 次 rollout。跨任务预训练实验包含 9,600 条、32 个任务的数据；相比 clean pretraining，domain-randomized pretraining 使 RDT 和 $\pi_0$ 的绝对成功率分别提升 10.6 和 8.8 percentage points。真实操作实验中，向 10 条真实 demonstration 加入 1,000 条 randomized sim trajectories，在不同场景带来 13.5–33 percentage-point 的收益；不过个别条件也会下降，说明收益并不逐任务单调。

这条路线最适合：few-shot learning、data efficiency、continual learning、目标任务 policy optimization，以及研究 pretraining mixture。

### 4.3 大规模仿真 post-training 对 sim-to-real 的价值：RoboCasa365

[RoboCasa365](https://arxiv.org/html/2603.04356)（ICLR 2026）提供 365 个任务、2,500 个厨房场景、612 小时 human demonstrations 和 1,615 小时 MimicGen synthetic data，总计超过 50 万条 trajectories。其结果支持三个比“仿真数据有效”更细的结论：

1. **多任务 sim pretraining 能显著提高 target-task data efficiency。** 在 50 个 target tasks 上，仅使用 10% target demonstrations 时，target-only 平均成功率为 21.0，而先做多任务 pretraining 再 post-train 为 35.9；完整 target data 下为 43.7 对 51.1。
2. **仿真数据可以帮助真实部署。** 在四个真实机器人任务上，real-only GR00T N1.5 平均成功率为 61.8，sim-and-real midtraining / co-finetuning 后为 79.8，提升约 18.1 percentage points。
3. **质量和多样性比单纯数量重要。** Human300 pretraining 在多个设置中优于 Human300+MimicGen60；作者将差异归因于 synthetic demonstrations 质量不均。场景数量从 5、25 增加到 2,500 时，zero-shot 与 fine-tuned 性能均持续提高，说明 diversity 是关键变量。

RoboCasa365 还报告了 source-specific 的优化结论：在其 GR00T N1.5 设置中，two-stage post-training 明显优于简单 joint co-training，LoRA 也优于 full fine-tuning。它们值得作为实验起点，但不能未经复现就推广到所有架构。

### 4.4 少量仿真 post-training 能否让评测更像真实世界：最新证据

[A Practical Recipe Towards Improving Sim-and-Real Correlation for VLA Evaluation](https://arxiv.org/html/2606.10366)（2026 年 6 月 arXiv v1）直接研究这个问题。作者在 9 个 paired sim-real tasks 上收集 11,800 次 simulation rollouts 与 1,115 次 real rollouts，并对多种 VLA policy 做小规模 targeted simulator post-training。

在其 REALM 设置中，post-training 后 proxy accuracy 的 Spearman correlation 从 0.700 提升到 0.875，Pearson 从 0.785 到 0.878，MMRV 从 0.030 降到 0.015；对扰动敏感性的 Pearson correlation 从 0.875 提升到 0.970。作者将其解释为针对 embodiment、camera、action distribution 和 task distribution 的 lightweight calibration。

但 dose-response 不是单调的：5 条 demonstration 有帮助，10 条最好，20 条在扰动敏感性上反而退化，表现出 single-task simulator overfitting。该研究只覆盖固定 tabletop embodiment、有限任务和有限 policy family，且截至调研日仍是 arXiv v1。因此它支持“少量受控 adaptation 可能改善 proxy”，不支持“所有仿真 benchmark 都应先 fine-tune”。

### 4.5 当前通用 VLA 的工程现实：通常需要 target-domain adaptation

[NVIDIA Isaac-GR00T](https://github.com/NVIDIA/Isaac-GR00T) 的当前工作流将 base model zero-shot inference 与 post-trained checkpoints 明确分开：pretraining 中已覆盖的 embodiment 可以直接使用 base checkpoint；LIBERO、DROID、SimplerEnv 或新的 embodiment/task 则使用相应 fine-tuned checkpoint 或用户数据 post-training。

OpenVLA 的官方说明也指出，对新 task / embodiment，通常需要约 100 条 target-domain robot demonstrations 才能取得可靠效果；具体需求高度依赖 action frequency、观测接口与训练数据覆盖。这里有一个重要细节：**在 simulator 里评测，不等于必须用 simulator data fine-tune。** 例如 SIMPLER 可以在 simulator 中评测由真实 Bridge / Fractal 数据 fine-tune 的 checkpoint。

## 5. “需要”仿真后训练时，怎样避免把 benchmark 做坏

### 5.1 推荐三轨协议

#### Track A — Frozen/OOD

- 禁止使用 target simulator 的 trajectory、reward、success label 和 test-time feedback 更新权重。
- 只允许事先声明的 interface adapter；冻结后不得按 test results 调参。
- 对所有模型使用相同 controller、action horizon、observation preprocessing 和 rollout budget。
- 报告 base checkpoint 的 pretraining overlap，尤其是 robot embodiment、场景资产、任务文本和数据来源。

#### Track B — Adaptation curve

- 使用独立的 simulator train split，设置 $k \in \{5,10,20,50,100,\ldots\}$ demonstrations 或等价 interaction budget。
- 同时报 $J(0)$、$J(k)$ 和单位数据/单位 compute 的增益，而不只报最终最高分。
- 模型间匹配 optimizer steps、GPU hours、environment interactions、hyperparameter search budget。
- train/dev/test 在 task、object instance、scene、camera、lighting、physics parameters 和 random seed 上做层级隔离。
- 记录是 clean teleoperation、domain-randomized expert data、MimicGen-style synthetic data，还是 on-policy rollout。

#### Track C — Real transfer

- 至少比较 `real-only`、`sim-only`、`sim→real`、`sim+real`；若资源允许，增加 `frozen`。
- 匹配真实 demonstration 数量，避免把“多了 100 倍总数据”误写成“simulation 方法更优”。
- 最终模型选择尽量依赖 sim dev set 或预注册规则，不根据 real test 反复挑 checkpoint。
- 在真实机器人上测 success、safety、recovery、latency 和 distribution shift；仿真分数只作为中间指标。

若进行 online RL，应再设独立 Track D，固定 environment interaction budget、reward access 和 reset cost；不要与只做 offline imitation 的模型放在无说明的同一榜单。

### 5.2 最小消融矩阵

如果预算有限，最低限度建议跑以下矩阵：

| 组别 | 初始模型 | 仿真数据 | 真实数据 | 回答的问题 |
| --- | --- | --- | --- | --- |
| A | base | 0 | 0 或已有 pretraining | Frozen capability |
| B | base | clean sim | 0 | 同域 imitation 是否有效 |
| C | base | randomized sim | 0 | diversity / domain randomization 的增益 |
| D | base | 0 | small real | 真实数据基线 |
| E | base | randomized sim → small real | small real | sim pretraining 是否提高 real data efficiency |
| F | base | randomized sim + small real | small real | mixture / co-training 是否更好 |

每组至少使用多个训练 seeds；每个任务使用足够 rollout 并给出 binomial confidence interval。RoboTwin 2.0 每个 easy / hard 条件使用 100 rollouts，RoboCasa365 每个任务使用 30 trials，可作为量级参考，而不是硬性标准。

### 5.3 数据 quality gates

仿真数据进入 post-training 前，应检查：

- demonstration success、subtask completion、wrong-object interaction、collision 和 action stall；
- camera intrinsics/extrinsics、robot kinematics、gripper state、action units 与真实系统的一致性；
- control frequency、latency、frame stacking 和 action chunk execution 是否对齐；
- object/scene/task 分布是否被少量模板主导；
- domain randomization 是否覆盖合理范围，而不是制造不可实现的 physics；
- synthetic trajectories 是否存在捷径、穿模、非因果视觉线索或不自然 recovery；
- train/test asset family、language template 和 random seeds 是否泄漏；
- mixed sim-real training 时，两类数据的采样权重、loss scale 和 action normalization 是否一致。

RoboCasa365 的结果说明，若没有 per-trajectory filtering 和质量审计，添加更多 synthetic trajectories 可能比只用高质量 human demonstrations 更差。

## 6. 应报告哪些指标

仅报 mean task success 不足以判断“仿真后训练是否值得”。推荐至少包含：

- `Frozen score` 与 `Adapted score`；
- $\Delta J(k)$、learning curve 和达到目标成功率所需的数据量；
- seen / unseen task、object、scene、camera、physics perturbation 分层结果；
- collision、wrong-object、premature termination、timeout、oscillation 等 failure taxonomy；
- catastrophic forgetting：post-training 前已会任务是否退化；
- sim-real ranking correlation：Spearman、Pearson、MMRV；
- perturbation sensitivity error，而不只是绝对成功率误差；
- 真实机器人 success、safety intervention、recovery rate、latency；
- training compute、environment interactions、真实数据小时数和 simulator data 小时数。

如果只关心从多个 checkpoint 中选最好模型，rank correlation 可能比绝对 sim-real gap 更重要；如果要估算真实成功率，则 calibration error 和 MAE 更重要。

## 7. 风险与常见误判

1. **把 target-sim fine-tuning 后的分数称为 zero-shot。** 这最多是 zero-real-shot。
2. **把 simulator 评测等同于 sim-to-real 证明。** 高 sim score 仍可能来自 renderer、controller 或 object dynamics 的捷径。
3. **只改模型，不控制接口。** action frequency、camera pose 和 controller 的差异可能大于模型架构差异。
4. **训练和测试只换 random seed。** 对 foundation model 来说，这通常不足以构成 OOD split。
5. **用 test score 选择微调步数。** 这会把 test set 变成 dev set；2026 correlation study 中 10 条优于 20 条正说明 adaptation dose 必须在独立 dev set 上选。
6. **认为 synthetic quantity 自动等价于 quality。** RoboCasa365 给出了相反案例。
7. **忽略已有 pretraining overlap。** “未用目标 simulator data”不等于“没见过类似任务、资产或真实数据”。
8. **把 source-specific recipe 普遍化。** LoRA、two-stage post-training 或某个 randomization range 的优势需要在自己的架构与控制栈上复现。

## 8. 对当前机器人模型仿真评测的最终建议

若目标尚未限定，建议默认采用以下 policy：

- **主榜使用 Frozen/OOD track**，不使用目标 simulator 数据做模型 post-training，用来保持模型间可解释的先验能力比较。
- **副榜使用 Adaptation track**，允许相同数量和质量的仿真数据，展示 0/5/10/20/50/100-shot learning curve；这通常比单一 fine-tuned score 更有研究价值。
- 对新的 embodiment 或 action interface，允许一份明确记录的 calibration set，但 frozen 结果仍需保留；若 base model 根本无法表达目标 action space，则声明 frozen track 为 `not applicable`，不要伪造公平性。
- 若最终要部署真实机器人，优先尝试 `diverse randomized sim pretraining → small real fine-tuning`，并与 `small real only` 做 matched-real-data 对照。
- 不要默认追求最大仿真数据量。先做 5/10/20-shot dose sweep 和 held-out perturbation 验证，再扩大规模。
- 将真实评测作为最终 gate；sim-real correlation 应在多个 policies、多个 tasks 和多种 perturbations 上验证，而不是只检查一个模型的平均成功率。

一句话概括：**仿真数据 post-training 对“把模型做得更好”通常有价值，但对“测清模型原本有多好”通常不应存在；一个可信的评测体系应同时保留这两个问题，而不是让 adaptation 覆盖掉 zero-shot 诊断。**

## Primary Sources

- [RoboLab: A High-Fidelity Simulation Benchmark for Analysis of Task-Generalist Policies](https://arxiv.org/html/2604.09860)
- [SIMPLER: Evaluating Real-World Robot Manipulation Policies in Simulation](https://simpler-env.github.io/)
- [A Practical Recipe Towards Improving Sim-and-Real Correlation for VLA Evaluation](https://arxiv.org/html/2606.10366)
- [RoboTwin 2.0: A Scalable Data Generator and Benchmark with Strong Domain Randomization for Robust Bimanual Robotic Manipulation](https://arxiv.org/html/2506.18088v2)
- [RoboCasa365: A Large-Scale Simulation Framework for Training and Benchmarking Generalist Robots](https://arxiv.org/html/2603.04356)
- [LIBERO official repository](https://github.com/Lifelong-Robot-Learning/LIBERO)
- [CALVIN official repository](https://github.com/mees/calvin)
- [OpenVLA official repository and LIBERO evaluation instructions](https://github.com/openvla/openvla)
- [NVIDIA Isaac-GR00T official repository](https://github.com/NVIDIA/Isaac-GR00T)

## Evidence Limits

- 机器人 foundation model 的公开评测协议仍快速变化，不同 paper 对 zero-shot、fine-tuning 和 embodiment adaptation 的命名并不统一。
- RoboLab、SIMPLER、RoboTwin 2.0、RoboCasa365 覆盖的 robot embodiment、task family 和 simulator 各不相同；数值不能跨论文直接横比。
- 2026 年的 sim-real correlation 研究仍是 arXiv v1，结论需要更多 robot、policy family 和真实环境复现。
- 成功率提升不能单独归因于“仿真”这一变量；data quantity、demonstration quality、domain randomization、controller、camera alignment、optimization recipe 和 real-data mixture 都是潜在 confounders。
