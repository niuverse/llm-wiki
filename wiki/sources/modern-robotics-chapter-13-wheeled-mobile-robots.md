---
title: "Modern Robotics Chapter 13: Wheeled Mobile Robots"
type: source
tags: [robotics, wheeled-robots, mobile-robots, kinematics, odometry]
sources: []
last_updated: 2026-05-01
source_file: raw/modern-robotics-preprint-v2.pdf
source_kind: pdf
source_url: https://hades.mech.northwestern.edu/images/2/2e/MR-largefont-v2.pdf
extracted_text: graph/extracts/modern-robotics-chapter-13-wheeled-mobile-robots.md
source_date: 2019-12-01
---

## 摘要

Kevin M. Lynch 和 Frank C. Park 的 *Modern Robotics* Chapter 13 是 wheeled mobile robots 的运动学入口。该章把移动底盘配置写成 $q=(\phi,x,y)$，并用 body-frame planar twist（底盘坐标系下的平面 twist）$V_b=(\omega_{bz},v_{bx},v_{by})$ 连接 wheel speeds、chassis velocity、odometry、motion planning 和 feedback control。

该章的中心边界很清楚：先忽略 dynamics，假设机器人在 hard、flat、horizontal ground 上 rolling without skidding。它把 wheeled mobile robots 分成 omnidirectional 和 nonholonomic 两大类：[[OmnidirectionalWheels|omnidirectional wheels]] 通过 omniwheel 或 mecanum wheel 释放底盘的 sideways constraint；[[NonholonomicMobileRobots|nonholonomic mobile robots]] 则满足一个不可积分的 Pfaffian velocity constraint。更细的结构分类应与 [[WheeledMobileRobotClassification|Campion et al. 的 mobility/steerability taxonomy]] 一起读。

Source URL: https://hades.mech.northwestern.edu/images/2/2e/MR-largefont-v2.pdf

## 核心主张

- Wheeled robot kinematic model 关注 wheel speeds 如何映射到 robot velocities；dynamic model 关注 wheel torques 如何映射到 accelerations。Chapter 13 主要处理前者。
- 底盘速度可以用 $\dot q=(\dot\phi,\dot x,\dot y)$ 表示，也可以用 chassis frame 下的 $V_b=(\omega_{bz},v_{bx},v_{by})$ 表示；两者由姿态角 $\phi$ 的 rotation map 互相转换。
- Omnidirectional mobile robot 至少需要三个 independently driven wheels 才能产生任意三维 chassis velocity；wheel geometry 必须让 $H(0)$ rank 为 3。
- 对 omni / mecanum base，wheel speeds 与 body twist 的核心关系是 $u=H(0)V_b$。若 wheel speed 有上界，则每个 wheel 在 twist space 中给出一对 parallel constraint planes，所有 wheel 的限制组成 feasible body twists polyhedron。
- Nonholonomic mobile robots 的简化模型可以统一成 driftless control-affine system：$\dot q=G(q)u$。unicycle、differential drive 和 car-like robot 的主要差异体现在 control set $U$。
- 典型 nonholonomic 底盘满足 $A(q)\dot q=[0,\sin\phi,-\cos\phi]\dot q=0$，该约束禁止直接 sideways velocity，但不能积分成 configuration constraint。
- Lie bracket 解释了 parallel parking 式的 sideways maneuver：原始 vector fields 不能直接侧移，但交替执行 noncommuting motions 可以产生二阶横向位移。
- Odometry 用 wheel angle increments 估计 chassis configuration；它便宜且短时有效，但 wheel slip、skidding 和 numerical integration error 会累积。
- Mobile manipulation 把 base wheel velocities 与 arm joint velocities 组合成 end-effector twist：$V_e=J_e(\theta)[u,\dot\theta]^T$。

## 关键引文

- "we ignore the dynamics and focus on the kinematics"
- "Odometry is the process of estimating the chassis configuration"

## 关联

- [[WheeledRobotKinematics]] - 本章的统一入口：$q$、$V_b$、wheel constraints、$H(0)$ 和 kinematic assumptions。
- [[OmnidirectionalWheels]] - omniwheel / mecanum 的 $u=H(0)V_b$、rank condition 和 feasible twist polyhedron。
- [[NonholonomicMobileRobots]] - unicycle、diff-drive、car-like robot 的 canonical model、Pfaffian constraint 和 Lie bracket controllability。
- [[MobileRobotOdometry]] - Chapter 13.4 的 wheel-increment integration 和 odometry failure boundary。
- [[SteerableWheels]] - Chapter exercises 与 car-like modeling 涉及 steerable conventional wheels；更系统 taxonomy 来自 Campion et al.。
- [[SimulationRealityGap]] - Chapter 13 的 no-slip kinematic assumptions 在真实仿真与硬件里会被 slip、contact solver 和 sensor fusion 打破。

## 开放问题

- Chapter 13 排除了 skid-steer、tracked vehicle 和 deformable tire dynamics；这些应通过 vehicle dynamics、terrains 和 contact-rich simulation sources 单独 ingest。
- 对 mecanum / omni 的 physics simulation，何时可以用 controller-level holonomic model，何时必须显式建 roller contact？
- Swerve / steerable wheel 在工业 AMR 与竞赛机器人中的 steering dynamics、module synchronization 和 saturation policy 需要后续 implementation docs 支持。
