---
title: "Modern Robotics Chapter 13: Wheeled Mobile Robots"
type: source
tags: [robotics, wheeled-robots, mobile-robots, kinematics, odometry]
sources: []
last_updated: 2026-07-13
source_file: raw/modern-robotics-preprint-v2.pdf
source_kind: pdf
source_url: https://hades.mech.northwestern.edu/images/2/2e/MR-largefont-v2.pdf
extracted_text: graph/extracts/modern-robotics-chapter-13-wheeled-mobile-robots.md
source_date: 2019-12-01
---

## 摘要

Kevin M. Lynch 和 Frank C. Park 的 *Modern 机器人学* 章节 13 是轮式移动式机器人的运动学入口。该章把移动底盘配置写成 $q=(\phi,x,y)$，并用机体帧平面旋量（底盘坐标系下的平面旋量）$V_b=(\omega_{bz},v_{bx},v_{by})$ 连接车轮速度、底盘速度、里程计、运动规划和 feedback 控制。

该章的中心边界很清楚：先忽略动力学，假设机器人在硬、flat、horizontal 地面上滚动不含 skidding。它把轮式移动式机器人分成全向和非完整约束两大类：[[OmnidirectionalWheels|全向车轮]] 通过全向轮或 mecanum 车轮释放底盘的横向约束；[[NonholonomicMobileRobots|非完整约束移动式机器人]] 则满足一个不可积分的 Pfaffian 速度约束。更细的结构分类应与 [[WheeledMobileRobotClassification|Campion et al. 的机动性/steerability taxonomy]] 一起读。

来源网址: https://hades.mech.northwestern.edu/images/2/2e/MR-largefont-v2.pdf

## 核心主张

- 轮式机器人运动学模型关注车轮速度如何映射到机器人速度；动力学模型关注车轮 torques 如何映射到加速度。章节 13 主要处理前者。
- 底盘速度可以用 $\dot q=(\dot\phi,\dot x,\dot y)$ 表示，也可以用底盘帧下的 $V_b=(\omega_{bz},v_{bx},v_{by})$ 表示；两者由姿态角 $\phi$ 的 rotation 映射图互相转换。
- 全向移动式机器人至少需要三个 independently 驱动的车轮才能产生任意三维底盘速度；车轮几何必须让 $H(0)$ 秩为 3。
- 对 omni / mecanum 基座，车轮速度与机体旋量的核心关系是 $u=H(0)V_b$。若车轮速度有上界，则每个车轮在旋量空间中给出一对并行约束平面，所有车轮的限制组成可行机体 twists 多面体。
- 非完整约束移动式机器人的简化模型可以统一成 driftless 控制-affine 系统：$\dot q=G(q)u$。unicycle、差分驱动器和类汽车机器人的主要差异体现在控制集合 $U$。
- 典型非完整约束底盘满足 $A(q)\dot q=[0,\sin\phi,-\cos\phi]\dot q=0$，该约束禁止直接横向速度，但不能积分成配置约束。
- 李括号解释了并行 parking 式的横向 maneuver：原始 vector 字段不能直接侧移，但交替执行 noncommuting motions 可以产生二阶横向位移。
- 里程计用车轮角度增量估计底盘配置；它便宜且短时有效，但车轮滑移、skidding 和数值集成错误会累积。
- 移动式操作把基座车轮速度与机械臂关节速度组合成末端执行器旋量：$V_e=J_e(\theta)[u,\dot\theta]^T$。

## 关键引文

- "we ignore the dynamics and focus on the kinematics"
- "Odometry is the process of estimating the chassis configuration"

## 关联

- [[WheeledRobotKinematics]] - 本章的统一入口：$q$、$V_b$、车轮约束、$H(0)$ 和运动学假设。
- [[OmnidirectionalWheels]] - 全向轮与麦克纳姆轮的 $u=H(0)V_b$、秩条件和可行旋量多面体。
- [[NonholonomicMobileRobots]] - unicycle、diff-驱动器、类汽车机器人的规范的模型、Pfaffian 约束和李括号可控性。
- [[MobileRobotOdometry]] - 章节 13.4 的车轮增量集成和里程计失败边界。
- [[SteerableWheels]] - 章节 exercises 与类汽车建模涉及 steerable 传统车轮；更系统分类体系来自 Campion et al.。
- [[SimulationRealityGap]] - 章节 13 的无滑移运动学假设在真实仿真与硬件里会被滑移、接触求解器和传感器 fusion 打破。

## 开放问题

- 章节 13 排除了 skid-steer、履带式车辆和可变形轮胎动力学；这些应通过车辆动力学、terrains 和接触丰富仿真来源单独收录。
- 对 mecanum / omni 的物理仿真，何时可以用控制器层级完整约束模型，何时必须显式建滚轮接触？
- Swerve / steerable 车轮在工业 AMR 与竞赛机器人中的转向动力学、模块同步和饱和策略需要后续实现文档支持。
