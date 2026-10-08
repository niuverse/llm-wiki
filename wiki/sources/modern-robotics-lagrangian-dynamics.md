---
title: "Modern Robotics 8.1: Lagrangian Formulation of Dynamics (Part 1 of 2)"
type: source
tags: [robotics, simulation, source-backed]
sources: []
modified: 2026-10-02
source_file: raw/modern-robotics-8-1-lagrangian-dynamics.html
source_kind: html
source_url: https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-8-1-lagrangian-formulation-of-dynamics-part-1-of-2/
extracted_text: graph/extracts/modern-robotics-8-1-lagrangian-dynamics.md
source_date: unknown
source_version: official-lesson-transcript
acquired: 2026-10-02
snapshot_sha256: 1e2daa2da44bd5323acb621267ae2be9e9d9dfbc0c4c8e1c2fa8c553171c9596
topics: ["topics/evaluation-and-transfer", "topics/simulation-transfer"]
source_type: tutorial
nav_title: "Modern Robotics · 动力学"
---

## 摘要

官方课程从动能减势能构造拉格朗日量，用双关节机械臂解释质量矩阵、速度乘积项与重力项。它将正向动力学用于仿真、逆向动力学用于控制。完整文字稿已阅读，教学推导整理到 [[RobotRigidBodyDynamics|机器人刚体动力学]]。

## 核心主张

- 正向动力学由当前关节位置、速度和力矩计算加速度；逆向动力学由目标加速度计算所需力矩。
- 拉格朗日方程把能量表达转成广义力；关节力矩与关节速度的内积是功率。
- 开链动力学整理为 $\tau=M(q)\ddot q+c(q,\dot q)+g(q)$。速度乘积项来自关节坐标并非惯性坐标。
- 若弹簧贡献势能，$g$ 的含义不能只理解成重力；末端与环境交换的力还需经过雅可比转置映射。
- 文字稿说明递归牛顿—欧拉方法适合高效计算逆向动力学，本节只介绍拉格朗日途径，不展开该递归算法。

## 阅读边界

本节覆盖开链机械系统的基本结构，没有完成浮动基座、接触互补、闭链或可变形体推导。网页没有明示发布日期；官方章节目录列出的日期不能自动当成这份文字稿的版本日期。

## 关联

[[RobotRigidBodyDynamics|动力学与力矩]]、[[RobotCoordinateFrames|坐标表示]]、[[ReducedCoordinateArticulations|关节系统与驱动]]、[[ContactSolvers|Contact Solvers]]、[[mujoco-computation-collision-detection|MuJoCo 计算文档]]。

## 官方视频

来源页提供 [Modern Robotics Chapter 8.1](https://www.youtube.com/watch?v=1U6y_68CjeY)。观看时追踪双关节机械臂的动能如何同时产生加速度项与速度乘积项；内嵌播放器位于动力学概念页。

## 归档记录

规范网址、版本与获取日期见页首；本次原始文件的 SHA-256 为 `1e2daa2da44bd5323acb621267ae2be9e9d9dfbc0c4c8e1c2fa8c553171c9596`，归档登记在 `graph/acquisitions.jsonl`。

## 研究归属

[[topics/evaluation-and-transfer|评测与 Sim-to-Real]] · [[topics/simulation-transfer|Sim-to-Real]]。
