---
title: "GRAIL: Generating Humanoid Loco-Manipulation from 3D Assets and Video Priors"
type: source
tags: [robotics, humanoid, loco-manipulation, data-generation, sim-to-real, video-foundation-models]
sources: []
last_updated: 2026-07-13
source_file: raw/grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors.pdf
source_kind: pdf
source_url: https://arxiv.org/abs/2606.05160
extracted_text: graph/extracts/grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors.md
source_date: 2026-06-03
project_url: https://research.nvidia.com/labs/dair/grail/
---

## 摘要

Tianyi Xie 等提出 [[GRAIL]]，一个面向人形机器人移动操作的全数字化数据生成流程。它不从自然场景视频中事后猜测相机、尺度、物体几何和接触，而是先构造完全明确的三维配置：物体资产、场景几何、相机内外参、公制尺度、环境深度，以及预拟合到 Unitree G1 形态的人体角色，都在视频生成前已知。随后系统用视频基础模型（VFM）提供交互先验，再用已知三维配置约束四维人物—物体交互（HOI）重建，最后重定向到人形机器人并训练通用任务跟踪策略与第一视角视觉策略。

这篇来源对知识库的新增价值是把 [[VisualSimToReal|视觉仿真到现实迁移]] 的上游数据问题具体化：GRAIL 试图用 [[AssetConditionedHOIGeneration|资产条件化的 HOI 生成]] 替代遥操作 / 运动捕捉的物理采集瓶颈，同时避免 unconstrained 视频重建的规模、深度、相机和形态歧义。它报告生成超过 20,000 条序列，覆盖 pick-up、whole-机体操作、坐下和地形穿越；用这些生成的数据训练的 RGB 策略在 Unitree G1 上达到物体 pick-up 84% 现实世界成功和 stair-climbing 90% 成功。

来源网址: https://arxiv.org/abs/2606.05160

项目主页: https://research.nvidia.com/labs/dair/grail/

## 核心主张

- 人形机器人移动操作的示范数据扩展瓶颈来自机器人兼容的轨迹：遥操作 / 动作捕捉质量高但依赖物理设置、instrumented actors 和机器人 operation；自然场景视频重建又必须推断相机、规模、物体几何、接触和世界空间运动。
- GRAIL 的 central 设计是把 VFM 当作交互先验，而不是把生成的视频当作完整真值：系统先规定 3D 世界，再让 VFM 生成交互视频，之后用已知几何、相机、公制尺度、深度和机器人-proportioned 形态做重建 anchor。
- 视频生成阶段使用 Infinigen 候选环境、物体稳定的放置、Blender 渲染、VLM 生成的提示和 Kling 图像到-视频生成；VLM 还用于按可供性选择 floor/表格放置。
- 4D HOI 重建先独立估计人类运动与物体位姿：GENMO 给 SMPL-X 机体位姿，WiLoR refine hands，FoundationPose 在已知物体几何 / 纹理 / 相机下做 RGB-仅 6-DoF 物体跟踪。
- 关节优化通过 $L=\lambda_{\mathrm{kp}}L_{\mathrm{kp}}+\lambda_{\mathrm{proj}}L_{\mathrm{proj}}+\lambda_{\mathrm{depth}}L_{\mathrm{depth}}+\lambda_{\mathrm{cont}}L_{\mathrm{cont}}+\lambda_{\mathrm{reg}}L_{\mathrm{reg}}$ refine 人类/物体残差轨迹；其中深度对齐使用 MoGe-2 + 渲染的环境深度恢复指标规模点 clouds，接触对齐用 VLM 接触标签和深度-仅 Chamfer 损失处理手部物体接触。
- 失败过滤用 SAM2 物体掩码与预测的物体位姿渲染的 silhouettes 比较，discard 快速运动、blur、物体外观 inconsistency 或跟踪损失导致的失败序列。
- 重定向阶段用 GMR 把 reconstructed SMPL-X 运动 retarget 到 Unitree G1 关节空间参考资料，再在 SONIC pretrained whole-机体控制器上训练两个通用任务跟踪器：物体感知潜在 adaptor 处理操作，场景感知 height-映射图跟踪器处理地形穿越与坐下。
- 物体感知 adaptor 冻结 SONIC 编码器 / FSQ quantizer / 解码器，只训练 $\pi_\phi$ 输出潜在残差 $\Delta z_t$ 与二进制手部基元；观测包含物体位姿、手部到-物体 transforms、手指接触力、BPS 形状编码和未来物体位姿 deltas。
- 场景感知跟踪器精细-tunes 控制器，加一个局部 height-映射图编码器 $\epsilon_h$，并混合原始 flat-地面数据以保留基座移动分布。
- 数据集规模：1,000 物体资产、1,000 procedurally 生成的地形配置、超过 20,000 序列，覆盖 pick-up、whole-机体操作、坐下和地形穿越。
- 评估不只看生成的视频合理性：表格 1 比较几何接触/穿透、VLM 交互得分、平滑性和物理基于跟踪可执行性；表格 2 比较通用任务跟踪成功、物体位置错误和 MPJPE-L；真实部署报告见过的/未见的物体 pick-up 与 stair-climbing。
- 来源支持的局限：流程假设已有 3D 物体资产、仿真器就绪场景和能 follow 提示的 VFM；severe 遮挡、快速运动、VFM 物体外观 inconsistency 会降低重建质量；运动族变化仍需要 retraining 或微调。

## 关键引文

- "fully virtual until deployment"
- "over 20,000 sequences"
- "84% real-world success"
- "90% success"

## 关联

- [[GRAIL]] - 本来源对应的框架 / 项目实体。
- [[AssetConditionedHOIGeneration]] - 本来源最核心的机制层级概念：先规定 3D 资产 / 相机 / 指标世界，再用 VFM 先验生成和重建机器人兼容的 HOI 轨迹。
- [[VisualSimToReal]] - GRAIL 的生成的数据最终通过第一视角 RGB 策略部署到真实 Unitree G1。
- [[SimulationRealityGap]] - GRAIL 把差距的一部分前移到数据/重建阶段：已知几何和公制尺度可以减少视频到-4D 歧义，但 VFM 产物、相机/手部动力学和现实世界接触仍会留下差距。
- [[TaskGeneralistPolicyEvaluation]] - GRAIL 明确比较 per-任务/per-序列风格基线与任务族 pooled 跟踪器，并用 SR、ObjPos、MPJPE-L 评估。
- [[NVIDIA]] - 作者团队主要来自 NVIDIA，项目主页位于 NVIDIA 研究。

## 开放问题

- 项目主页、代码和数据集产物还没有单独收录；需要后续确认发布状态、许可证、可复现性边界和流程配置。
- VFM 依赖 Kling API，VLM 依赖 OpenAI 模型；这会带来可复现性、成本、条款的-use 和模型版本漂移问题，来源本身没有把这些工程边界展开。
- 失败过滤被描述为会 discard non-简单 fraction 的序列，但来源没给出全流程的 discard 比率；真实数据集质量需要发布后进一步审计。
- 现实世界物体 pick-up 和 stair-climbing 结果是来源特有的证据；还需要独立 replication、更多机器人 platforms、更多物体/材质/质量 variations 和失败比率报告。
- 这条路线与 [[VIRAL]] 的视觉教师—学生仿真到现实迁移、[[AGILE]] 的工作流契约、HumanoidMimicGen-风格规划数据生成是否会合流，当前来源还没有直接回答。
