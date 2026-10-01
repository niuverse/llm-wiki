---
title: "Modern Robotics 3.3.1: Homogeneous Transformation Matrices"
type: source
tags: [robotics, kinematics, source-backed]
sources: []
modified: 2026-10-02
source_file: raw/modern-robotics-3-3-1-homogeneous-transformation.html
source_kind: html
source_url: https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-3-1-homogeneous-transformation-matrices/
extracted_text: graph/extracts/modern-robotics-3-3-1-homogeneous-transformation.md
source_date: unknown
source_version: official-lesson-transcript
acquired: 2026-10-02
snapshot_sha256: 2c249299585a645ed5287effcff2d0ab896286dcb86ed49b838b8df4d87a9f53
study_topic: syntheses/simulation-and-assets-learning-path
---

## 摘要

Kevin Lynch 与 Frank Park 的官方课程用齐次变换统一刚体位姿、坐标变换和刚体移动。完整网页包含文字稿；本轮阅读的是文字稿，视频用于观看同一变换的动画。数学结构整理到 [[RobotCoordinateFrames|机器人坐标系与位姿]]。

## 核心主张

- $T_{sb}$ 表示坐标系 $b$ 在坐标系 $s$ 下的位姿；逆矩阵交换两个下标。
- 组合关系是 $T_{sc}=T_{sb}T_{bc}$；矩阵乘法可结合，通常不可交换。
- 三维点需要补一个齐次坐标才能乘四阶变换矩阵。
- 用同一个增量变换左乘或右乘，分别表达固定空间坐标系或随物体移动的坐标系中的运动；动画展示两者得到不同终态。

## 阅读边界

本节讲位姿表示与变换，不是相机标定算法或各种仿真器的四元数数组约定。网页没有明确发布日期，因此保留 `unknown`，获取日期不代替出版日期。

## 关联

[[RobotCoordinateFrames|坐标系与位姿]] → [[RobotRigidBodyDynamics|刚体动力学]] → [[RoboticsSimulationLoop|仿真循环]]。轮式坐标实例见 [[WheeledRobotKinematics|轮式机器人运动学]]。

## 官方视频

[官方课程与文字稿](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-3-1-homogeneous-transformation-matrices/)给出的公开视频是 [Modern Robotics Chapter 3.3.1](https://www.youtube.com/watch?v=vlb3P7arbkU)。先画出 $T_{sb}T$ 与 $TT_{sb}$，再观看动画检查自己对参考坐标系的理解；概念页提供内嵌播放器。

## 归档记录

规范网址、版本与获取日期见页首；本次原始文件的 SHA-256 为 `2c249299585a645ed5287effcff2d0ab896286dcb86ed49b838b8df4d87a9f53`，归档登记在 `graph/acquisitions.jsonl`。
