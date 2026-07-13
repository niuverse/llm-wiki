---
title: "VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation"
type: source
tags: [robotics, sim-to-real, humanoid, loco-manipulation, visual-policy]
sources: []
last_updated: 2026-07-13
source_file: raw/viral-humanoid-project-page.html
source_kind: html
source_url: https://viral-humanoid.github.io/
extracted_text: graph/extracts/viral-humanoid-project-page.md
source_date: unknown
---

## 摘要

VIRAL 项目主页展示了一个面向人形机器人移动操作的 [[VisualSimToReal|视觉仿真到现实迁移]] 框架：系统在仿真中训练，然后零样本部署到 Unitree G1 人形机器人，在真实环境中完成连续 walking、placing、抓取、turning 和物体 transport。页面把核心方法概括为三步：特权 RL 教师策略先用完整状态信息学长时域行为；基于视觉的学生策略再通过大规模仿真、tiled 渲染、在线 DAgger 与行为克隆模仿教师策略；最后通过视觉域随机化与灵巧手部 / 相机的真实到-sim 对齐缩小仿真到现实迁移差距。

这个来源对知识库的价值不在于提出新算法名称，而在于给出一个全栈 recipe：delta 动作空间、参考状态 initialization（RSI）、教师—学生 distillation、计算扩展、视觉随机化、手指 SysID 和 FOV 对齐被组合成同一个 deployed 人形机器人系统。页面还保留了大量现实世界视频、泛化因素、失败案例与从 2025-05 到 2025-11 的工程 timeline，适合作为 [[SimulationRealityGap|仿真—现实差距]] 的视觉策略案例。

来源网址: https://viral-humanoid.github.io/

相关的链接在 the 页面: arXiv `2511.15200`, 项目 PDF, 与 `https://github.com/NVlabs/GR00T-VisualSim2Real`.

## 核心主张

- VIRAL 的任务是自主人形机器人移动操作：机器人需要在两个表格之间移动、放置物体、抓取新物体并转身继续循环。
- 教师策略侧使用特权 RL 教师策略，观察完整状态，并通过 delta 动作空间和 RSI 学长时域移动操作。
- 学生策略侧是基于视觉的策略，从 RGB 和真实-可用本体感知模仿教师策略；训练混合在线 DAgger 与行为克隆，并依赖大规模 tiled 渲染。
- 计算规模是系统主张的一部分：页面声称教师策略/学生策略训练需要扩展到 tens 的 GPUs，低算力 regimes often fail。
- 仿真到现实迁移不是只靠域随机化。页面把光照、材质、相机参数、图像质量、传感器 delays 等视觉随机化与灵巧手部 SysID、相机/FOV 对齐组合起来。
- 现实世界部署主张是 Unitree G1 上连续移动操作到 54 cycles，并在 diverse 空间 / 外观 variations 下不做现实世界微调。
- 泛化视频覆盖托盘的横纵位置、圆柱体位置、机器人起始位置、桌面高度、光照、桌布颜色、桌子类型与物体类别；物体示例包括瓶子、罐子、杯子、保龄球瓶、按压泵瓶和喷雾罐等。
- 页面明确展示失败案例：unreliable 部署、手部 stuck、accidental drop 和失败的分布外物体泛化。
- 视觉仿真到现实迁移 journey timeline 显示系统并非一次成型：从 2025-05-30 的 RGB reaching 到 2025-11-10 的 54-周期移动操作，中间经历抓取失败、手指基元 SysID、pre-抓取、walking-到-表格迁移和多轮调优。

## 关键引文

- "tens of GPUs"
- "up to 54 cycles"
- "without any real-world fine-tuning"

## 关联

- [[VIRAL]] - 本来源的框架 / 项目实体页面。
- [[VisualSimToReal]] - 本来源最核心的机制层级概念：从特权仿真教师策略到视觉学生策略，再到真实硬件迁移。
- [[SimulationRealityGap]] - VIRAL 的迁移 recipe 把差距拆成视觉外观随机化、传感器/相机不匹配、灵巧手部动力学不匹配和计算/训练分布问题。
- [[NVIDIA]] - 页面链接到 NVlabs `GR00T-VisualSim2Real` 代码仓库；作者与项目生态也和 NVIDIA 机器人学技术栈相关。

## 开放问题

- 当前收录只覆盖项目主页；arXiv 论文和代码仓库尚未收录。精确奖励定义、网络架构、消融数据和实现细节需要后续来源。
- 54-周期部署与泛化视频是来源特有的证据；还需要独立 replication 或第三方基准才能判断是否可跨机器人、任务和 lab generalize。
- VIRAL 的迁移成功到底由哪部分贡献最大：视觉随机化、真实到-sim 对齐、WBC 命令接口、RSI、delta 动作空间、计算规模，还是它们之间的耦合？
- 失败视频指向 OOD 物体泛化、手部 stuck 和 accidental drop；后续应该追踪这些失败是否来自感知 aliasing、抓取 mechanics、接触动力学、策略 recovery，还是底层手部控制。
