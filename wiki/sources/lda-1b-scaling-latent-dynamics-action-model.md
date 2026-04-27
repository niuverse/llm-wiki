---
title: "LDA-1B: Scaling Latent Dynamics Action Model via Universal Embodied Data Ingestion"
type: source
tags: [robotics, robot-foundation-models, world-models, vla, embodied-data]
sources: []
last_updated: 2026-04-27
source_file: raw/lda-1b-scaling-latent-dynamics-action-model.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2602.12215
extracted_text: graph/extracts/lda-1b-scaling-latent-dynamics-action-model.md
source_date: 2026-02-12
---

## 摘要

这篇 arXiv paper 提出 [[LDA1B|LDA-1B]]：一个把 [[WorldModelsForEmbodiedAI|world model]]、[[VisionLanguageActionModels|VLA policy]] 和 visual forecasting 放进同一 latent diffusion training regime 的 robot foundation model。它的核心反对点是：大规模 behavior cloning 只模仿 expert actions，会丢掉 mixed-quality robot/human interaction data 中可迁移的 dynamics knowledge；而已有 UWM（Unified World Model）方法直接在 pixel/VAE space 预测 future state，容易把 appearance noise 和 dynamics learning 纠缠在一起。

LDA-1B 的 solution 是 [[LatentDynamicsActionModels|Latent Dynamics Action Model]]：用 frozen DINOv3 features 表示 future visual state，用 MM-DiT 同时 denoise action chunks 和 future visual latents，并通过 policy、forward dynamics、inverse dynamics、visual forecasting 四个 objective 让不同质量的数据发挥不同作用。论文同时构建 [[EI30K|EI-30K]]，一个超过 30k 小时的 embodied interaction dataset，统一 robot/human、real/sim、action-labeled/actionless 数据格式和 hand-centric action representation。

Source URL: https://arxiv.org/abs/2602.12215

Project page: https://pku-epic.github.io/LDA/

## 核心主张

- LDA-1B 的核心不是单纯扩大 BC 数据，而是把 heterogeneous embodied data 分配到不同 supervision roles：high-quality robot/human demonstrations 用于 policy、dynamics 和 forecasting；lower-quality trajectories 主要用于 dynamics/visual forecasting；actionless egocentric human videos 用于 instruction-conditioned future-state prediction。
- UWM objective 被组织成四个条件分布：policy $p(a_{t+1:t+k}\mid o_t,\ell)$、forward dynamics $p(o_{t+1:t+k}\mid o_t,a_{t+1:t+k},\ell)$、inverse dynamics $p(a_{t+1:t+k}\mid o_{t:t+k},\ell)$、visual planning/forecasting $p(o_{t+1:t+k}\mid o_t,\ell)$。LDA 把 future observation target 换成 DINO latent $z_{t+1:t+k}$，减少 pixel appearance modeling。
- Architecture 使用 Qwen3-VL 作为 vision-language conditioning encoder、DINOv3-ViT-s 作为 visual latent encoder、MM-DiT 作为 action/visual token 的 shared self-attention backbone。Pretraining 时 VLM 与 DINO encoder frozen，只更新 MM-DiT 和 action encoder/decoder；finetuning stage 再 unfreeze VLM。
- 论文把 LDA-1B 描述为 1.6B-parameter robot foundation model，同时 Table I 的 trainable parameters 栏标成 1B，并说明该栏不计 frozen components；因此更准确地说是 1B-scale trainable core + frozen VLM/DINO components。
- [[EI30K|EI-30K]] 包含 8.03k 小时 real-world robot data、8.6k 小时 simulated robot data、7.2k 小时 human demonstrations with actions，以及 10k 小时 actionless human videos。所有数据转成 LeRobot format，并把 action 对齐到 hand-centric coordinate frame。
- RoboCasa-GR1 simulation benchmark 中，LDA-1B average success 为 55.4%，高于 GR00T-N1.6 的 47.6%、StarVLA 的 47.8%、reproduced GR00T-EI subset 的 51.3%、UWM-1B 的 19.3%。Ablation 中，VAE latent + MM-DiT 的 UWM 只有 20.0%，换成 DINO latent 的 LDA-1B 达到 55.4%。
- Real-world experiments 覆盖 [[Galbot]] G1 和 Unitree G1，包括 two-finger gripper、22-DoF SharpaWave hand、10-DoF BrainCo hand。论文报告 LDA-1B 在 contact-rich、dexterous、long-horizon tasks 上相对 prior methods 分别有 up to 21%、48%、23% gains。
- Mixed-quality finetuning 是关键 evidence：在 Place the pen into the box 与 Bimanually remove the lid 两个任务中，加入约 30% low-quality trajectories 让 LDA-1B 各提升 10%，而 π0.5 分别下降 20% 和 10%。
- Dynamics analysis 用 DINO feature PCA visualization 和 action-conditioned attention map 说明模型关注 contact regions、force application points 和 anticipated motion trajectories，而不是 background clutter。
- 论文承认 limitations：依赖 fixed DINO visual features，且主要使用 egocentric camera viewpoints；future work 包括 jointly learning visual representations and latent dynamics、扩展到 richer sensory modalities、自动优化 data roles。

## 关键引文

- "distinct yet complementary roles"
- "structured DINO latent space"
- "fixed DINO visual features"

## 关联

- [[LDA1B]] - 本 source 的核心 model/entity。
- [[EI30K]] - 本 source 构建的 embodied interaction dataset。
- [[LatentDynamicsActionModels]] - 机制页：UWM objectives、DINO latent target、MM-DiT、role-aware data ingestion。
- [[WorldModelsForEmbodiedAI]] - LDA-1B 是 decision-coupled latent world model：prediction 不直接追求 pixels，而是用 dynamics-aware latent state 改善 action policy。
- [[VisionLanguageActionModels]] - LDA-1B 与 π0.5/GR00T 属于 robot foundation policy comparison set，但它把 action policy 和 dynamics objectives cotrain。
- [[RobotContextConditioning]] - LDA-1B 与 π0.7 都处理 heterogeneous data，但 LDA 主要靠 task embeddings、quality-aware objective routing 和 latent dynamics，而不是 runtime metadata/subgoal prompting。
- [[Galbot]] - 作者单位之一，也是 real-world Galbot G1 evaluation platform。

## 开放问题

- Table III 的 caption 说 LDA-1B 在 unseen objects、backgrounds 和 OOD positions 上都维持 60.0% success，但表格本身给出的 OOD Position 是 40.0%；这应作为 source 内部不一致处理。
- LDA-1B 的 DINO latent advantage 很强，但也带来 representation lock-in：如果 frozen DINO features 漏掉 force、tactile、small tool contact 或 transparent/reflective objects，latent dynamics 可能无法恢复这些 state variables。
- Mixed-quality data 的 routing 依赖 quality labels 与 objective selection。论文说明了 high/low/actionless roles，但自动估计 data role 仍列为 future work。
- 论文报告的是 team-owned dataset、training stack 和 robot setup；paper 指向 Code & Data URL，但 source 本身不足以证明 independent reproducibility。
- 与 [[pi07-steerable-generalist-robotic-foundation-model|π0.7]] 相比，LDA-1B 强调 latent dynamics pretraining，而 π0.7 强调 context/subgoal steering；两者是否可以组合成“latent dynamics + runtime subgoal/context”系统仍是值得跟进的问题。
