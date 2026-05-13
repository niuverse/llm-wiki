---
title: "VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation"
type: source
tags: [robotics, sim-to-real, humanoid, loco-manipulation, visual-policy]
sources: []
last_updated: 2026-05-13
source_file: raw/viral-humanoid-project-page.html
source_kind: html
source_url: https://viral-humanoid.github.io/
extracted_text: graph/extracts/viral-humanoid-project-page.md
source_date: unknown
---

## 摘要

VIRAL project page 展示了一个面向 humanoid loco-manipulation 的 [[VisualSimToReal|visual sim-to-real]] framework：系统在 simulation 中训练，然后 zero-shot 部署到 Unitree G1 humanoid，在真实环境中完成连续 walking、placing、grasping、turning 和 object transport。页面把核心方法概括为三步：privileged RL teacher 先用 full-state information 学 long-horizon behavior；vision-based student policy 再通过 large-scale simulation、tiled rendering、online DAgger 与 behavior cloning imitation teacher；最后通过 visual domain randomization 与 dexterous hand / camera 的 real-to-sim alignment 缩小 sim-to-real gap。

这个 source 对 wiki 的价值不在于提出新算法名称，而在于给出一个 full-stack recipe：delta action space、reference state initialization（RSI）、teacher-student distillation、compute scaling、visual randomization、finger SysID 和 FOV alignment 被组合成同一个 deployed humanoid system。页面还保留了大量 real-world videos、generalization factors、failure cases 与从 2025-05 到 2025-11 的工程 timeline，适合作为 [[SimulationRealityGap|simulation reality gap]] 的视觉策略案例。

Source URL: https://viral-humanoid.github.io/

Related links on the page: arXiv `2511.15200`, project PDF, and `https://github.com/NVlabs/GR00T-VisualSim2Real`.

## 核心主张

- VIRAL 的 task 是 autonomous humanoid loco-manipulation：机器人需要在两个 table 之间移动、放置物体、抓取新物体并转身继续循环。
- Teacher side 使用 privileged RL teacher，观察 full state，并通过 delta action space 和 RSI 学 long-horizon loco-manipulation。
- Student side 是 vision-based policy，从 RGB 和 real-available proprioception imitation teacher；训练混合 online DAgger 与 behavior cloning，并依赖 large-scale tiled rendering。
- Compute scale 是系统主张的一部分：页面声称 teacher/student training 需要扩展到 tens of GPUs，low-compute regimes often fail。
- Sim-to-real transfer 不是只靠 domain randomization。页面把 lighting、materials、camera parameters、image quality、sensor delays 等 visual randomization 与 dexterous hand SysID、camera/FOV alignment 组合起来。
- Real-world deployment claim 是 Unitree G1 上连续 loco-manipulation 到 54 cycles，并在 diverse spatial / appearance variations 下不做 real-world fine-tuning。
- Generalization videos 覆盖 tray Y/X position、cylinder position、robot start position、table height、lighting、table cloth color、table type 与 object category；object examples 包括 bottles、cans、cup、bowling pin、pump bottle、spray can 等。
- 页面明确展示 failure cases：unreliable deployment、hand stuck、accidental drop 和 failed out-of-distribution object generalization。
- Visual sim-to-real journey timeline 显示系统并非一次成型：从 2025-05-30 的 RGB reaching 到 2025-11-10 的 54-cycle loco-manipulation，中间经历 grasping failure、finger primitive SysID、pre-grasping、walking-to-table transfer 和多轮 tuning。

## 关键引文

- "tens of GPUs"
- "up to 54 cycles"
- "without any real-world fine-tuning"

## 关联

- [[VIRAL]] - 本 source 的 framework / project entity page。
- [[VisualSimToReal]] - 本 source 最核心的 mechanism-level concept：从 privileged simulation teacher 到 vision student，再到 real hardware transfer。
- [[SimulationRealityGap]] - VIRAL 的 transfer recipe 把 gap 拆成 visual appearance randomization、sensor/camera mismatch、dexterous hand dynamics mismatch 和 compute/training distribution issues。
- [[NVIDIA]] - 页面链接到 NVlabs `GR00T-VisualSim2Real` code repository；作者/项目生态也与 NVIDIA robotics stack 相关。

## 开放问题

- 当前 ingest 只覆盖 project page；arXiv paper 和 code repository 尚未 ingest。精确 reward definitions、network architecture、ablation numbers 和 implementation details 需要后续 source。
- 54-cycle deployment 与 generalization videos 是 source-specific evidence；还需要 independent replication 或第三方 benchmark 才能判断是否可跨 robot、task 和 lab generalize。
- VIRAL 的 transfer 成功到底由哪部分贡献最大：visual randomization、real-to-sim alignment、WBC command interface、RSI、delta action space、compute scale，还是它们之间的耦合？
- Failure videos 指向 OOD object generalization、hand stuck 和 accidental drop；后续应该追踪这些 failure 是否来自 perception aliasing、grasp mechanics、contact dynamics、policy recovery，还是 low-level hand control。
