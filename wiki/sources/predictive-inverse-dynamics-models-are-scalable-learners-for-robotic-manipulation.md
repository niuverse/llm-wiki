---
title: "Predictive Inverse Dynamics Models are Scalable Learners for Robotic Manipulation"
type: source
tags: [robotics, vla, inverse-dynamics, world-models, robot-manipulation]
sources: []
last_updated: 2026-04-27
source_file: raw/predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation.pdf
source_kind: pdf
source_url: https://proceedings.iclr.cc/paper_files/paper/2025/hash/e5b5c402bb7bd5e60bede6961d6fe39e-Abstract-Conference.html
extracted_text: graph/extracts/predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation.md
source_date: unknown
---

## 摘要

这篇 ICLR 2025 paper 提出 Predictive Inverse Dynamics Models（PIDM）并实现为 [[Seer]]。它的核心问题是：robot manipulation scaling 不能只靠 action-centric behavior cloning，也不能只靠 vision-centric world model / visual pretraining；更合理的是让 future visual prediction 和 [[InverseDynamicsModels|inverse dynamics prediction]] 在同一个 policy 中闭环训练。

Seer 用 Transformer 同时处理 language、RGB observations、robot state 和 readout tokens。它引入 [FRS] foresight token 预测 future RGB image，和 [INV] action token 预测从当前 history 到 predicted future 的 intermediate actions。关键结构是 unidirectional attention：action token 可以 attend 到 foresight token，因此 inverse dynamics 不是只看当前 observation，而是 conditioned on predicted future visual state。训练目标把 conditional visual foresight loss 和 inverse dynamics action loss 合在一起；pretraining 和 finetuning 保持同样 objective。

这篇 source 和 [[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|DeFI paper]] 构成一个有用对照：Seer 主张 end-to-end PIDM，把 visual foresight 与 inverse action prediction 一起优化；DeFI 则指出 end-to-end entanglement 可能造成 2D video forecasting 和 3D action prediction 的 mismatch，因此先 separate pretraining GFDM/GIDM 再耦合。

Source URL: https://proceedings.iclr.cc/paper_files/paper/2025/hash/e5b5c402bb7bd5e60bede6961d6fe39e-Abstract-Conference.html

PDF URL: https://proceedings.iclr.cc/paper_files/paper/2025/file/e5b5c402bb7bd5e60bede6961d6fe39e-Paper-Conference.pdf

Project page: https://nimolty.github.io/Seer/

Code: https://github.com/OpenRobotLab/Seer/

## 核心主张

- PIDM 的核心是用 forecasted visual state condition inverse dynamics：先预测未来 visual representation，再用它指导 action sequence prediction。论文认为这比 naive BC 或 two-stage visual-goal + low-level IDM 更适合 scalable robot policy learning。
- Seer 的 history $h_t$ 包含过去 $m$ 步 RGB images 与 robot states，goal $g$ 可以是 language instruction 或 robot state。Conditional visual foresight 写作 $\hat{o}_{t+n}=f_{\mathrm{fore}}(g,h_t)$，future image loss 是 pixel MSE。
- Inverse dynamics prediction 从 goal、history 和 predicted future latent $\hat{o}^{l}_{t+n}$ 预测 action sequence：$\hat{a}_{t:t+n-1}=f_{\mathrm{inv}}(g,h_t,\hat{o}^{l}_{t+n})$。Action loss 包含 6D arm action Smooth-L1 和 gripper BCE，$\lambda=0.01$。
- 总训练目标为 $\mathcal{L}=\alpha\mathcal{L}_{\mathrm{fore}}+\mathcal{L}_{\mathrm{inv}}$，paper 中 $\alpha=0.5$。Pretraining 与 finetuning 都使用 conditional visual foresight + inverse dynamics prediction。
- Architecture 使用 MAE-pretrained ViT image encoder、Perceiver Resampler、CLIP ViT-B/32 text encoder、robot state MLP、24-layer GPT-2-style transformer backbone、MLP action decoder 和 ViT image decoder。Standard Seer 有 316M total parameters，其中 65M trainable；Seer-Large 有 315M trainable parameters。
- Pretraining data 根据 benchmark 不同而变化：LIBERO 用 LIBERO-90，CALVIN 用 official robot play data（无 language annotations 且含 random exploration），real-world validation 用 DROID。论文强调 Seer 能处理 missing language annotations，因为 pretraining 时可用 future robot state token 作为 goal。
- LIBERO-LONG 中，Seer 平均成功率 87.7%，高于 Seer scratch 78.7%、OpenVLA 54.0%、MPI 77.3%。CALVIN ABC-D 中，Seer-Large average length 为 4.28，高于 CLOVER 3.53、GR-1 3.06、Susie 2.69；standard Seer 为 3.98。
- Data efficiency evidence：在 10% downstream data 时，pretrained Seer 相对 scratch 在 LIBERO-LONG success rate 上有 187% relative improvement，在 CALVIN average length 上有 150% relative improvement；论文称约 70% downstream data 即可超过 prior SOTA。
- Ablation 支持 vision-action synergy：fine-tuning 中只加 $L_{\mathrm{fore}}$ 从 3.31 到 3.41，同时加 $L_{\mathrm{fore}}+L_{\mathrm{inv}}$ 到 3.64；pretraining 中只加 $L_{\mathrm{fore}}$ 从 3.64 到 3.73，同时加两者到 3.98。
- Real-world Franka Research 3 + Robotiq-2f-85 setup 中，4 个 generalization-centric tasks 平均成功率/score 为 78.4% / 39.5，高于 Seer scratch 60.0% / 32.8、MVP 55.0% / 29.8、MPI 48.4% / 29.3、OpenVLA 16.7% / 11.0。Appendix 中 high-precision/contact-rich tasks（Press Button、Insertion）也显示 pretraining 改善。

## 关键引文

- "closing the loop between vision and action"

## 关联

- [[Seer]] - 本 source 的核心模型。
- [[InverseDynamicsModels]] - Seer/PIDM 是 action-labeled、end-to-end 的 inverse dynamics formulation；DeFI/GIDM 是 unlabeled video transition pretraining formulation。
- [[VisionLanguageActionModels]] - Seer 是 VLA/action policy 的一种 compact Transformer implementation，用 [FRS]/[INV] readout tokens 把 visual foresight 接到 action prediction。
- [[LatentDynamicsActionModels]] - Seer 的 action representation 是 supervised action sequence prediction；LDA-1B 和 DeFI 更强调 latent dynamics / latent action scaling。
- [[WorldModelsForEmbodiedAI]] - Seer 的 future image prediction 是 decision-coupled world model signal，不是单独追求 video fidelity。
- [[SimulationRealityGap]] - real-world 和 robustness experiments 说明 DROID pretraining 对 object/background/lighting disturbances 有帮助，但 cross-embodiment 与 contact-rich coverage 仍有限。

## 开放问题

- 用户提供的 `asproceedings.iclr.cc` URL 返回空占位文本；本 ingest 使用同一路径下 canonical `proceedings.iclr.cc` 页面与 official PDF。
- Seer 依赖 action-labeled robot data 做 pretraining；它不像 DeFI/GIDM 那样把 action-free human videos 直接用于 inverse dynamics pretraining。因此它证明的是 large robot datasets 上 vision-action joint pretraining 的价值，而不是 action-free video scaling。
- Future prediction target 是 RGB pixel reconstruction，可能把 appearance fidelity 和 task-relevant state 纠缠在一起；这也是后续 DeFI/LDA-style latent representation 方法试图改进的方向。
- 论文 limitation 明确提到 downstream tasks 只有 6 个 real-world tasks，high-precision/contact-rich coverage 还不够；cross-embodiment 也需要更多测试。Appendix 中 OXE pretraining 去掉 Franka subsets 后只带来 marginal improvement，甚至在部分 high-precision tasks 上下降。
