---
title: "Predictive Inverse Dynamics Models are Scalable Learners for Robotic Manipulation"
type: source
tags: [robotics, vla, inverse-dynamics, world-models, robot-manipulation]
sources: []
last_updated: 2026-07-13
source_file: raw/predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation.pdf
source_kind: pdf
source_url: https://proceedings.iclr.cc/paper_files/paper/2025/hash/e5b5c402bb7bd5e60bede6961d6fe39e-Abstract-Conference.html
extracted_text: graph/extracts/predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation.md
source_date: unknown
---

## 摘要

这篇 ICLR 2025 论文提出预测式逆动力学模型（PIDM）并实现为 [[Seer]]。它的核心问题是：机器人操作扩展不能只靠动作中心化行为克隆，也不能只靠视觉中心化世界模型 / 视觉预训练；更合理的是让未来视觉预测和 [[InverseDynamicsModels|逆动力学预测]] 在同一个策略中闭环训练。

Seer 用 Transformer 同时处理语言、RGB 观测、机器人状态和 readout 标记。它引入 [FRS] 前瞻预测标记预测未来 RGB 图像，和 [INV] 动作标记预测从当前历史到预测的未来的中间动作。关键结构是 unidirectional attention：动作标记可以关注到前瞻预测标记，因此逆动力学不是只看当前观测，而是条件化的在预测的未来视觉状态。训练目标把条件视觉前瞻预测损失和逆动力学动作损失合在一起；预训练和 finetuning 保持同样目标。

这篇来源和 [[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|DeFI 论文]] 构成一个有用对照：Seer 主张端到端 PIDM，把视觉前瞻预测与逆动作预测一起优化；DeFI 则指出端到端 entanglement 可能造成 2D 视频预测和 3D 动作预测的不匹配，因此先 separate 预训练 GFDM/GIDM 再耦合。

来源网址: https://proceedings.iclr.cc/paper_files/paper/2025/hash/e5b5c402bb7bd5e60bede6961d6fe39e-Abstract-Conference.html

PDF 网址: https://proceedings.iclr.cc/paper_files/paper/2025/file/e5b5c402bb7bd5e60bede6961d6fe39e-Paper-Conference.pdf

项目主页: https://nimolty.github.io/Seer/

代码: https://github.com/OpenRobotLab/Seer/

## 核心主张

- PIDM 的核心是用 forecasted 视觉状态条件逆动力学：先预测未来视觉表示，再用它指导动作序列预测。论文认为这比 naive BC 或 two-阶段视觉目标 + 底层 IDM 更适合可扩展的机器人策略学习。
- Seer 的历史 $h_t$ 包含过去 $m$ 步 RGB 图像与机器人状态，目标 $g$ 可以是语言指令或机器人状态。条件视觉前瞻预测写作 $\hat{o}_{t+n}=f_{\mathrm{fore}}(g,h_t)$，未来图像损失是像素 MSE。
- 逆动力学预测从目标、历史和预测的未来潜在 $\hat{o}^{l}_{t+n}$ 预测动作序列：$\hat{a}_{t:t+n-1}=f_{\mathrm{inv}}(g,h_t,\hat{o}^{l}_{t+n})$。动作损失包含 6D 机械臂动作平滑-L1 和 gripper BCE，$\lambda=0.01$。
- 总训练目标为 $\mathcal{L}=\alpha\mathcal{L}_{\mathrm{fore}}+\mathcal{L}_{\mathrm{inv}}$，论文中 $\alpha=0.5$。预训练与 finetuning 都使用条件视觉前瞻预测 + 逆动力学预测。
- 架构使用 MAE-pretrained ViT 图像编码器、Perceiver Resampler、截断 ViT-B/32 文本编码器、机器人状态 MLP、24-层 GPT-2-风格 transformer 主干网络、MLP 动作解码器和 ViT 图像解码器。Standard Seer 有 316M total 参数，其中 65M trainable；Seer-大规模有 315M trainable 参数。
- 预训练数据根据基准不同而变化：LIBERO 用 LIBERO-90，CALVIN 用官方机器人 play 数据（无语言标注且含 random exploration），现实世界验证用 DROID。论文强调 Seer 能处理 missing 语言标注，因为预训练时可用未来机器人状态标记作为目标。
- 在 LIBERO-LONG 中，Seer 平均成功率为 87.7%，高于从头训练的 Seer（78.7%）、OpenVLA（54.0%）和 MPI（77.3%）。在 CALVIN ABC-D 中，Seer-大的平均任务长度为 4.28，高于 CLOVER（3.53）、GR-1（3.06）和 Susie（2.69）；标准版 Seer 为 3.98。
- 数据效率证据：在 10% 下游数据时，pretrained Seer 相对 scratch 在 LIBERO-LONG 成功比率上有 187% relative improvement，在 CALVIN 平均长度上有 150% relative improvement；论文称约 70% 下游数据即可超过先验 SOTA。
- 消融支持视觉动作 synergy：微调中只加 $L_{\mathrm{fore}}$ 从 3.31 到 3.41，同时加 $L_{\mathrm{fore}}+L_{\mathrm{inv}}$ 到 3.64；预训练中只加 $L_{\mathrm{fore}}$ 从 3.64 到 3.73，同时加两者到 3.98。
- 现实世界 Franka 研究 3 + Robotiq-2f-85 设置中，4 个泛化中心化任务平均成功率/得分为 78.4% / 39.5，高于 Seer scratch 60.0% / 32.8、MVP 55.0% / 29.8、MPI 48.4% / 29.3、OpenVLA 16.7% / 11.0。附录中高精度/接触丰富任务（Press Button、插入）也显示预训练改善。

## 关键引文

- "closing the loop between vision and action"

## 关联

- [[Seer]] - 本来源的核心模型。
- [[InverseDynamicsModels]] - Seer/PIDM 是动作标注的、端到端的逆动力学表述；DeFI/GIDM 是 unlabeled 视频转移预训练表述。
- [[VisionLanguageActionModels]] - Seer 是 VLA/动作策略的一种 compact Transformer 实现，用 [FRS]/[INV] readout 标记把视觉前瞻预测接到动作预测。
- [[LatentDynamicsActionModels]] - Seer 的动作表示是 supervised 动作序列预测；LDA-1B 和 DeFI 更强调潜在动力学 / 潜在动作扩展。
- [[WorldModelsForEmbodiedAI]] - Seer 的未来图像预测是决策-耦合的世界模型 signal，不是单独追求视频保真度。
- [[SimulationRealityGap]] - 现实世界和鲁棒性实验说明 DROID 预训练对物体/背景/光照 disturbances 有帮助，但跨机器人形态与接触丰富覆盖范围仍有限。

## 开放问题

- 用户提供的 `asproceedings.iclr.cc` URL 返回空占位文本；本收录使用同一路径下规范的 `proceedings.iclr.cc` 页面与官方 PDF。
- Seer 依赖动作标注的机器人数据做预训练；它不像 DeFI/GIDM 那样把动作-free 人类视频直接用于逆动力学预训练。因此它证明的是大规模机器人数据集上视觉动作关节预训练的价值，而不是动作-free 视频扩展。
- 未来预测目标是 RGB 像素重建，可能把外观保真度和任务相关的状态纠缠在一起；这也是后续 DeFI/LDA-风格潜在表示方法试图改进的方向。
- 论文局限明确提到下游任务只有 6 个现实世界任务，高精度/接触丰富覆盖范围还不够；跨机器人形态也需要更多测试。附录中 OXE 预训练去掉 Franka subsets 后只带来 marginal improvement，甚至在部分高精度任务上下降。
