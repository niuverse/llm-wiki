---
title: "VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation"
type: source
tags: [robotics, sim-to-real, humanoid, source-backed]
sources: []
modified: 2026-10-04
source_file: raw/viral-humanoid-project-page.html
source_kind: html
source_url: https://viral-humanoid.github.io/
extracted_text: graph/extracts/viral-humanoid-project-page.md
source_date: unknown
source_type: project
topics: ["topics/evaluation-and-transfer", "topics/simulation-transfer"]
---

# VIRAL：视觉仿真到现实迁移的项目证据

## 一屏概览

VIRAL 展示从仿真训练到 Unitree G1 视觉移动操作的教师—学生系统。核心组合是特权强化学习教师、视觉学生蒸馏、视觉随机化，以及手部与相机的真实到仿真对齐。**本页仅依据已归档项目主页；54 个连续循环是页面报告的演示上限，不是成功率。** 完整论文、实现和视频本体尚未纳入本次全文核验。

## 方法如何连接

项目页的 Method 分三步。教师先读取完整仿真状态，通过增量动作空间和参考状态初始化学习长时域行为；视觉学生通过在线 DAgger 与行为克隆模仿教师，并用大规模分块渲染提供图像；最后将视觉随机化与灵巧手、相机参数对齐结合，部署到硬件。页面的 Key Sim2Real Elements 特别列出手指系统辨识和视场角对齐。

**我们的解释：**教师解决“在充分状态信息下如何完成任务”，学生解决“仅凭部署可用观测如何重现教师行为”；随机外观和校准物理／相机参数作用于不同误差来源。这个分解有助于诊断，但项目页没有足够数值消融支持给各环节分配确定贡献比例。通用机制见 [[VisualSimToReal|视觉仿真到现实迁移]]。

### 怎样理解三段之间的接口

| 阶段 | 可读输入与产生的结果 | 下一阶段依赖什么 |
|---|---|---|
| 特权教师训练 | 完整仿真状态 → 任务动作 | 教师在访问状态中提供有效监督；增量动作和参考状态初始化用于降低学习难度 |
| 视觉学生训练 | 渲染图像等部署观测 → 模仿教师行为 | 在线 DAgger 在学生访问到的状态查询教师，行为克隆吸收监督；图像需要批量生成 |
| 真实闭环执行 | 真实相机和机器人观测 → 动作 → 新观测 | 手指动力学、相机视野和时延等条件与训练输入输出相容 |

表格重组项目页 Method 与 Key Sim2Real Elements 的文字，不补写页面没有给出的精确观测张量、损失函数或控制频率。**直觉例子（我们的解释）：** 学生略微推歪一个物体后，后续画面可能偏离教师示范；只重放成功示范不能保证见过这个状态，在线查询教师则能为学生自己的偏离提供纠正动作。它仍要求教师会处理该状态，且视觉中有足够信息判断怎样纠正。共享的监督目标与可观测性限制见 [[VisualSimToReal|视觉迁移机制]]。

## 页面实际提供的证据

| 位置 | 页面主张或材料 | 当前可支持的范围 |
| --- | --- | --- |
| Abstract、Compute Scaling | 教师／学生训练扩展到数十张 GPU，最多 64 张；低计算量设置常失败 | 这是项目作者的报告；本次未从链接图片或完整论文核验各配置的曲线数值 |
| Autonomous Loco-Manipulation、Journey 的 2025-11-10 条目 | 连续完成最多 54 个移动操作循环 | 展示长序列可执行；缺乏总尝试数，不能推出长期部署失败率 |
| Generalization 1–10 | 托盘、物体、机器人初位、桌高、光照、桌布与物体类别变化的视频入口 | 页面提供定性案例；不是覆盖任意物体／空间的统一统计结论 |
| Failure Cases | 部署不可靠、手被卡住、意外掉落和分布外物体失败 | 作者公开列出了失败类型；本次只核验文字及链接，未逐条观看视频 |
| Abstract、Method | 不进行现实世界策略微调 | 不等于没有真实到仿真的手部辨识与相机对齐 |

## 局限与使用方式

主页同时链接不同文件名的论文 PDF，不能仅凭网页导航判断每个演示对应哪个论文版本。当前保留项目主页快照的身份，不将它自动归入论文库。奖励、网络结构、精确训练配置、计算量曲线与独立复现仍需完整论文或实现证据。

**我们的评价：**VIRAL 适合作为“视觉策略迁移需要同时处理观测、控制和物理接口”的案例；其页面主张与演示不应替代系统成功率或普遍泛化能力的证明。与 [[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors|GRAIL]] 的比较归入 [[simulation-transfer|仿真策略怎样可靠迁移到现实]]。

## 来源与关联

依据原始项目 HTML 的 Abstract、Method、Generalization、Journey、Failure Cases 与 BibTeX，2026-10-04 完整复核文字缓存；图片、外链 PDF、代码和视频未作为本次已核验证据。[项目主页](https://viral-humanoid.github.io/)；项目页链接的[论文入口](https://arxiv.org/abs/2511.15200)和[官方代码](https://github.com/NVlabs/GR00T-VisualSim2Real)作为后续阅读入口。

[[VisualSimToReal|视觉迁移机制]]、[[SimulationRealityGap|仿真—现实差距]]、[[NVIDIA|NVIDIA]]。

## 研究归属

[[topics/evaluation-and-transfer|评测与现实迁移]] · [[topics/simulation-transfer|仿真策略怎样可靠迁移到现实]]。
