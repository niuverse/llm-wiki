---
title: "VIRAL"
type: entity
tags: [framework, robotics, sim-to-real, humanoid]
sources: ["[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation]]"]
last_updated: 2026-07-13
---

# VIRAL

VIRAL 是项目主页中提出的视觉仿真到现实迁移框架，全称是 "视觉仿真到现实迁移在规模用于人形机器人移动操作"。它的目标是在仿真中训练人形机器人移动操作策略，并零样本部署到真实 Unitree G1 人形机器人上执行连续 walking、placing、抓取、turning 和物体 transport。

系统结构是教师—学生：特权 RL 教师策略用完整状态信息学任务；基于视觉的学生策略再从 RGB 与本体感知模仿教师策略，并通过在线 DAgger、行为克隆、大规模 tiled 渲染、视觉域随机化、手指 SysID 和 FOV 对齐转到真实硬件。

## 关联

- [[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation]] - 项目页面来源。
- [[VisualSimToReal]] - VIRAL 所代表的机制：从特权仿真教师策略到真实-deployable 视觉学生策略。
- [[SimulationRealityGap]] - VIRAL 把差距拆成视觉随机化、相机对齐、手部动力学 SysID 和真实部署失败情形。
- [[NVIDIA]] - 页面链接到 the NVlabs `GR00T-VisualSim2Real` code 代码仓库。

## 证据边界

当前知识库对 VIRAL 的覆盖范围来自项目主页。页面包含视频、abstract、方法 outline、泛化示例、失败情形、论文/arXiv/代码链接和 BibTeX，但没有把完整奖励函数、架构细节、消融 tables 或代码层级实现收录进来。后续如果收录 arXiv 论文或 NVlabs 代码仓库，应回到本页补充 reproducibility 与实现边界。
