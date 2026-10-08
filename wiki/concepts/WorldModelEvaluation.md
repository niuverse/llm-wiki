---
title: "World Model 评测"
type: concept
tags: [embodied-ai, world-models, evaluation]
sources: ["[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[awesome-world-models]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[dreamerv3-mastering-diverse-control]]", "[[td-mpc2-scalable-robust-world-models]]", "[[dino-wm-pretrained-visual-features]]", "[[v-jepa-2-understanding-prediction-planning]]", "[[worldecho-worldsync-action-following]]"]
modified: 2026-10-04
topics: ["topics/world-models-and-representations", "topics/evaluation-and-transfer", "topics/world-model-evaluation"]
---

# World Model 评测

世界模型要分别回答四个问题：**生成内容是否像真实观测、状态结构是否准确、是否忠实响应动作、接入决策是否有用。** 这些是互补证据，不是一个分数由低到高自动证明的能力阶梯。[[a-comprehensive-survey-on-world-models-for-embodied-ai|具身世界模型综述]]、[[worldecho-worldsync-action-following|WorldEcho]]

## 指标测到了什么

| 层面 | 典型指标 | 单独不能证明什么 |
| --- | --- | --- |
| 观测与分布 | PSNR、SSIM、LPIPS、FID、FVD | 接触正确或动作后果正确 |
| 状态与几何 | 位姿误差、轨迹误差、分割重叠、点集距离 | 改变动作后仍正确，或策略能完成任务 |
| 动作干预 | 同初态不同动作的配对结果、动作遵循误差 | 所有接触力或全部长时物体状态真实 |
| 闭环决策 | 成功率、回报、数据效率、决策耗时 | 任意任务通用性，或仅模型自身带来的增益 |

前两类见 [[a-comprehensive-survey-on-world-models-for-embodied-ai|综述]]，动作干预见 [[worldecho-worldsync-action-following|WorldEcho]]，决策实例见 [[td-mpc2-scalable-robust-world-models|TD-MPC2]] 与 [[v-jepa-2-understanding-prediction-planning|V-JEPA 2-AC]]。例如背景像素可以占满误差权重，而抓取位置只有很小一块；这是教学反例，不是某篇论文新增的失败观测。

### 分布与几何误差需要先对齐定义

设真实与生成样本的特征均值为 $\mu_x,\mu_y$，协方差为 $\Sigma_x,\Sigma_y$，FID 的对称矩阵平方根写法为

$$
\operatorname{FID}=\|\mu_x-\mu_y\|_2^2+\operatorname{Tr}\left(\Sigma_x+\Sigma_y-2(\Sigma_x^{1/2}\Sigma_y\Sigma_x^{1/2})^{1/2}\right).
$$

它比较特征分布的高斯近似；特征提取器、样本数与估计方法改变分数。点集 $S_1,S_2$ 的一种平方 Chamfer 距离为

$$
\operatorname{CD}=\frac1{|S_1|}\sum_{x\in S_1}\min_{y\in S_2}\|x-y\|_2^2+\frac1{|S_2|}\sum_{y\in S_2}\min_{x\in S_1}\|x-y\|_2^2.
$$

是否平方、按点数归一化、坐标单位和采样密度都要记录。以上是对 [[a-comprehensive-survey-on-world-models-for-embodied-ai|综述指标]] 的教学定义，不保证任意论文采用同一版本。[[dino-wm-pretrained-visual-features|DINO-WM]] 主表同时报告成功率和 Chamfer 距离，不能把所有列当成越高越好的成功率。

## 动作遵循：固定初态，比较动作对应的后果

如果任务指令暗示成功，而输入动作实际上会失败，可靠模型应预测动作后果。WorldEcho 因此不仅回放当前专家动作，还查询跨状态专家动作、局部扰动、策略动作与更广的可行动作；每次查询都从同初态执行同动作以获得真值。训练数据覆盖与评估查询分布必须分开报告。[[worldecho-worldsync-action-following|WorldEcho §3.1–3.3]]

设 $D_n$ 为样本 $n$ 的末端位姿轨迹误差，$G_n\in\{0,1\}$ 为图像质量、平滑、末端可见和机械臂完整性全部通过的视觉门，固定惩罚为 $\kappa$，组合误差为

$$
S_n=\begin{cases}D_n,&G_n=1,\\\kappa,&G_n=0.\end{cases}
$$

先任务内平均，再跨任务宏平均，并且同时报告视觉通过率、所有样本的原始误差和组合误差。只统计通过门的视频会隐藏崩坏；只报组合误差又无法定位画质与动作失配。位姿误差、时间规整及多末端平均的完整定义集中在 [[worldecho-worldsync-action-following|论文页]]，避免重复维护。

**由定义推得的限制。** 时间规整容忍部分时间伸缩，因而不能独立验证真实控制延迟；末端 SE(3) 也不直接测接触力、摩擦或全部物体状态。若缺少门阈值、位姿权重和失败惩罚，组合数值就不能严格复现。WorldEcho v1 的这些披露限制应随结果保留。

### 算一次组合分数，理解它为何会掩盖原因

**教学构造。** 假设某任务 10 个样本中 8 个通过视觉门，通过样本的平均误差为 0.02，失败惩罚 $\kappa=0.3$。该任务组合误差为 $0.8\times0.02+0.2\times0.3=0.076$。另一模型全部通过但平均位姿误差为 0.06，其组合分数反而更好；选择不是只由位姿误差决定。一般有

$$
\bar S=p\,\bar D_{\mathrm{pass}}+(1-p)\kappa,
$$

$p$ 为通过率，$\bar D_{\mathrm{pass}}$ 为通过子集平均误差。它不同于将**所有样本**的原始误差均值代入；失败样本的原始误差没有进入上述第一项。比较时应并列查看通过率、组合误差和全样本原始误差。这是对 [[worldecho-worldsync-action-following|WorldEcho 评分定义]]的代数解释，例中参数不是论文公布的阈值。

宏平均也改变每个任务的权重：两个任务分别有 10 和 100 个样本，宏平均给予两任务各一半权重，合并所有样本则给予后者十倍权重。前者回答“典型任务怎么样”，后者回答“这个采样分布下典型样本怎么样”；记录分母才能解释差异。

## 决策结果要连同接口与预算解释

同一模型用于 [[ImaginedPolicyLearning|想象策略学习]] 或 [[ModelPredictiveControl|在线规划]]，收益来源和成本位置不同；[[VisualGoalPlanning|视觉目标规划]] 还把目标图像作为额外任务信息。论文对比必须保留这些条件。

| 容易混淆的比较 | 实际差异 | 可以支持的判断 |
| --- | --- | --- |
| TD-MPC2 与 Nature DreamerV3 | TD-MPC2 对照早期约 20M Dreamer；Nature 默认约 200M，更新实现与重放；104 个控制任务与各 20 个 Control Suite 任务也不同 | 各论文协议内的结果，不能拼成统一算法排名 |
| DINO-WM 与其 Dreamer／TD-MPC2 基线 | 离线图像—动作数据，移除奖励和任务信息后统一接目标 MPC；Dreamer 为第三方实现 | 修改后接口的比较，不推翻原始在线有奖励结果 |
| WorldSync 与扩展基线 | 60k 对 40k 次更新，组合点估计接近，未给差异显著性 | 指定终点结果，不能声称同预算全面领先 |
| V-JEPA 2 的理解、预判、机器人规划 | 分类探测器、离散动作类别预判与连续机器人闭环是不同系统 | 各指标各自成立，不能互换为机器人成功率 |

出处分别为 [[td-mpc2-scalable-robust-world-models|TD-MPC2]]、[[dreamerv3-mastering-diverse-control|DreamerV3 正式版]]、[[dino-wm-pretrained-visual-features|DINO-WM]]、[[worldecho-worldsync-action-following|WorldSync]]、[[v-jepa-2-understanding-prediction-planning|V-JEPA 2]]。

### “零样本”和“成功率”的分母要明确

DreamerV3 的跨领域配置复用是逐任务重新训练；Minecraft 的十个种子都发现钻石，不表示每回合成功。TD-MPC2 新任务适应使用在线微调，不是零样本识别任务。[[dreamerv3-mastering-diverse-control|DreamerV3]]、[[td-mpc2-scalable-robust-world-models|TD-MPC2]]

V-JEPA 2 的 EK100 39.7 是提前一秒预测动作类别的按类平均 recall@5，不能称为机器人动作正确率。真机抓放另有人工提供的三目标，按 **4／10／4 个固定步骤**切换，既非自主任务分解，也非检测到子目标成功才切换。部署还采用一步规划时域、人工选择相机视角。与单目标抓取比较时，任务与提供信息不同，成功率更高不构成矛盾。[[v-jepa-2-understanding-prediction-planning|§4、§6、附录 B]]

预测一次的耗时也不等于决策耗时：候选动作数、搜索轮数与时域会放大成本。DINO-WM 与 V-JEPA 2-AC 都分别报告完整规划成本；不同候选预算下的运行时间只能作为系统结果，不能隔离为同预算算法效率。[[dino-wm-pretrained-visual-features|附录 A.6]]、[[v-jepa-2-understanding-prediction-planning|表 3]]

## 一张可复查的评测卡

| 字段 | 应记录的条件 |
| --- | --- |
| 版本与角色 | 论文版本、模型规模、预训练／后训练、未来如何进入决策 |
| 输入与监督 | 观测、动作、奖励、特权状态、任务标签、目标或人工子目标 |
| 数据与查询 | 数据来源、成功／失败覆盖、专家与非专家动作、留出方式 |
| 时间与预算 | 预测时域、控制频率、更新量、重放定义、候选数与完整决策延迟 |
| 结果与统计 | 指标公式、单位、成功条件、试验分母、种子与不确定性 |
| 部署限制 | 机器人形态、相机选择、校准、是否使用本地适应数据 |

这张卡是依据已收录研究提出的整理建议。[[pi07-steerable-generalist-robotic-foundation-model|π0.7]] 的视觉子目标尤其需要区分“目标本身质量”与“接入策略后的收益”，不能只评图像。相关基础见 [[RobotContextConditioning|Context Conditioning]]、[[WorldModelTaxonomy|世界模型分类]]、[[WorldModelsForEmbodiedAI|World Models]]、[[TaskGeneralistPolicyEvaluation|通用策略评估]] 和 [[SimulationRealityGap|Sim-to-Real Gap]]。

## 研究归属

[[topics/world-models-and-representations|World Models]] · [[topics/evaluation-and-transfer|评测与 Sim-to-Real]] · [[topics/world-model-evaluation|World Model 评测]]。
