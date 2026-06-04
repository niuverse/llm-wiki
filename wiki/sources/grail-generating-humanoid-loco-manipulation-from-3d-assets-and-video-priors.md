---
title: "GRAIL: Generating Humanoid Loco-Manipulation from 3D Assets and Video Priors"
type: source
tags: [robotics, humanoid, loco-manipulation, data-generation, sim-to-real, video-foundation-models]
sources: []
last_updated: 2026-06-04
source_file: raw/grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2606.05160
extracted_text: graph/extracts/grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors.md
source_date: 2026-06-03
project_url: https://research.nvidia.com/labs/dair/grail/
---

## 摘要

Tianyi Xie 等提出 [[GRAIL]]，一个面向 humanoid loco-manipulation 的 fully digital data-generation pipeline。它不是从 in-the-wild videos 里事后猜 camera、scale、object geometry 和 contact，而是先构造 fully specified 3D configuration：object asset、scene geometry、camera intrinsics/extrinsics、metric scale、environment depth 和一个 prefitted 到 Unitree G1 morphology 的 human character 都在 video generation 之前已知。随后系统用 video foundation model（VFM）提供 interaction prior，再用已知 3D configuration 约束 4D human-object interaction（HOI）reconstruction，最后 retarget 到 humanoid robot 并训练 task-general tracking policies 与 egocentric visual policies。

这篇 source 对 wiki 的新增价值是把 [[VisualSimToReal|visual sim-to-real]] 的上游数据问题具体化：GRAIL 试图用 [[AssetConditionedHOIGeneration|asset-conditioned HOI generation]] 替代 teleoperation / motion capture 的物理采集瓶颈，同时避免 unconstrained video reconstruction 的 scale、depth、camera 和 morphology ambiguity。它报告生成超过 20,000 条序列，覆盖 pick-up、whole-body manipulation、sitting 和 terrain traversal；用这些 generated data 训练的 RGB policy 在 Unitree G1 上达到 object pick-up 84% real-world success 和 stair-climbing 90% success。

Source URL: https://arxiv.org/abs/2606.05160

Project page: https://research.nvidia.com/labs/dair/grail/

## 核心主张

- Humanoid loco-manipulation 的 demonstration scaling bottleneck 来自 robot-compatible trajectories：teleoperation / mocap 质量高但依赖 physical setup、instrumented actors 和 robot operation；in-the-wild video reconstruction 又必须推断 camera、scale、object geometry、contact 和 world-space motion。
- GRAIL 的 central design 是把 VFM 当作 interaction prior，而不是把 generated video 当作完整 truth：系统先规定 3D world，再让 VFM 生成 interaction video，之后用已知 geometry、camera、metric scale、depth 和 robot-proportioned morphology 做 reconstruction anchor。
- Video generation stage 使用 Infinigen candidate environments、object stable placement、Blender rendering、VLM-generated prompt 和 Kling image-to-video generation；VLM 还用于按 affordance 选择 floor/table placement。
- 4D HOI reconstruction 先独立估计 human motion 与 object pose：GENMO 给 SMPL-X body pose，WiLoR refine hands，FoundationPose 在已知 object geometry / texture / camera 下做 RGB-only 6-DoF object tracking。
- Joint optimization 通过 $L=\lambda_{\mathrm{kp}}L_{\mathrm{kp}}+\lambda_{\mathrm{proj}}L_{\mathrm{proj}}+\lambda_{\mathrm{depth}}L_{\mathrm{depth}}+\lambda_{\mathrm{cont}}L_{\mathrm{cont}}+\lambda_{\mathrm{reg}}L_{\mathrm{reg}}$ refine human/object residual trajectories；其中 depth alignment 使用 MoGe-2 + rendered environment depth 恢复 metric-scale point clouds，contact alignment 用 VLM contact labels 和 depth-only Chamfer loss 处理 hand-object contact。
- Failure filtering 用 SAM2 object masks 与 predicted object-pose rendered silhouettes 比较，discard fast motion、blur、object appearance inconsistency 或 tracking loss 导致的失败序列。
- Retargeting stage 用 GMR 把 reconstructed SMPL-X motion retarget 到 Unitree G1 joint-space references，再在 SONIC pretrained whole-body controller 上训练两个 task-general trackers：object-aware latent adaptor 处理 manipulation，scene-aware height-map tracker 处理 terrain traversal 与 sitting。
- Object-aware adaptor 冻结 SONIC encoder / FSQ quantizer / decoder，只训练 $\pi_\phi$ 输出 latent residual $\Delta z_t$ 与 binary hand primitives；observations 包含 object pose、hand-to-object transforms、finger contact forces、BPS shape encoding 和 future object-pose deltas。
- Scene-aware tracker fine-tunes controller，加一个 local height-map encoder $\epsilon_h$，并混合原始 flat-ground data 以保留 base locomotion distribution。
- Dataset scale：1,000 object assets、1,000 procedurally generated terrain configurations、超过 20,000 sequences，覆盖 pick-up、whole-body manipulation、sitting 和 terrain traversal。
- Evaluation 不只看 generated video plausibility：Table 1 比较 geometric contact/penetration、VLM interaction score、smoothness 和 physics-based tracking executability；Table 2 比较 task-general tracking success、object position error 和 MPJPE-L；真实部署报告 seen/unseen object pick-up 与 stair-climbing。
- Source-supported limitations：pipeline 假设已有 3D object assets、simulator-ready scenes 和能 follow prompt 的 VFM；severe occlusion、fast motion、VFM object appearance inconsistency 会降低 reconstruction quality；motion family 变化仍需要 retraining 或 fine-tuning。

## 关键引文

- "fully virtual until deployment"
- "over 20,000 sequences"
- "84% real-world success"
- "90% success"

## 关联

- [[GRAIL]] - 本 source 对应的 framework / project entity。
- [[AssetConditionedHOIGeneration]] - 本 source 最核心的 mechanism-level concept：先规定 3D assets / camera / metric world，再用 VFM prior 生成和重建 robot-compatible HOI trajectories。
- [[VisualSimToReal]] - GRAIL 的 generated data 最终通过 egocentric RGB policies 部署到真实 Unitree G1。
- [[SimulationRealityGap]] - GRAIL 把 gap 的一部分前移到 data/reconstruction stage：known geometry 和 metric scale 可以减少 video-to-4D ambiguity，但 VFM artifacts、camera/hand dynamics 和 real-world contact 仍会留下 gap。
- [[TaskGeneralistPolicyEvaluation]] - GRAIL 明确比较 per-task/per-sequence style baselines 与 task-family pooled trackers，并用 SR、ObjPos、MPJPE-L 评估。
- [[NVIDIA]] - 作者团队主要来自 NVIDIA，project page 位于 NVIDIA Research。

## 开放问题

- Project page、代码和 dataset artifact 还没有单独 ingest；需要后续确认 release status、license、reproducibility boundary 和 pipeline configuration。
- VFM 依赖 Kling API，VLM 依赖 OpenAI model；这会带来 reproducibility、cost、terms-of-use 和 model-version drift 问题，source 本身没有把这些工程边界展开。
- Failure filtering 被描述为会 discard non-trivial fraction of sequences，但 source 没给出全 pipeline 的 discard rate；真实 dataset quality 需要 release 后进一步审计。
- Real-world object pick-up 和 stair-climbing results 是 source-specific evidence；还需要 independent replication、更多 robot platforms、更多 object/material/mass variations 和 failure-rate reporting。
- 这条路线与 [[VIRAL]] 的 visual teacher-student sim-to-real、[[AGILE]] 的 workflow contract、HumanoidMimicGen-style planning data generation 是否会合流，当前 source 还没有直接回答。
