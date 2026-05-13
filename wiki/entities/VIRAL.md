---
title: "VIRAL"
type: entity
tags: [framework, robotics, sim-to-real, humanoid]
sources: ["[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation]]"]
last_updated: 2026-05-13
---

# VIRAL

VIRAL 是 project page 中提出的 visual sim-to-real framework，全称是 "Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation"。它的目标是在 simulation 中训练 humanoid loco-manipulation policy，并 zero-shot 部署到真实 Unitree G1 humanoid 上执行连续 walking、placing、grasping、turning 和 object transport。

系统结构是 teacher-student：privileged RL teacher 用 full-state information 学 task；vision-based student policy 再从 RGB 与 proprioception imitation teacher，并通过 online DAgger、behavior cloning、large-scale tiled rendering、visual domain randomization、finger SysID 和 FOV alignment 转到 real hardware。

## 关联

- [[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation]] - project page source。
- [[VisualSimToReal]] - VIRAL 所代表的机制：从 privileged simulation teacher 到 real-deployable visual student。
- [[SimulationRealityGap]] - VIRAL 把 gap 拆成 visual randomization、camera alignment、hand dynamics SysID 和 real deployment failure cases。
- [[NVIDIA]] - page links to the NVlabs `GR00T-VisualSim2Real` code repository。

## Evidence Boundary

当前 wiki 对 VIRAL 的 coverage 来自 project page。页面包含 videos、abstract、method outline、generalization examples、failure cases、paper/arXiv/code links 和 BibTeX，但没有把完整 reward functions、architecture details、ablation tables 或 code-level implementation ingest 进来。后续如果 ingest arXiv paper 或 NVlabs repository，应回到本页补充 reproducibility 与 implementation boundary。
