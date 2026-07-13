---
title: "Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots"
type: source
tags: [robotics, wheeled-robots, mobile-robots, nonholonomic-systems, dynamics]
sources: []
last_updated: 2026-07-13
source_file: raw/campion-bastin-dandrea-novel-wheeled-mobile-robots-nd-2011.pdf
source_kind: pdf
source_url: https://nd.ics.org.ru/nd1104002/
extracted_text: graph/extracts/campion-bastin-dandrea-novel-wheeled-mobile-robots-nd-2011.md
source_date: unknown
---

## 摘要

Guy Campion、Georges Bastin 和 Brigitte D'Andrea-Novel 的经典 WMR 分类论文最初发表于 1996 年的 *IEEE Transactions on Robotics and Automation*；当前收录的规范完整文本是 2011 年 *Russian Journal of Nonlinear 动力学* 的俄文翻译/复刊版本，页面标注 CC BY-ND。论文系统分析轮式移动机器人（WMR）的运动学与动力学模型，并提出用机动度 $\delta_m$ 与可转向度 $\delta_s$ 把非退化 WMR 分成五类。

这篇来源是 [[WheeledMobileRobotClassification|轮式移动式机器人结构性的 classification]] 的核心依据。它比入门教材更一般：不只讨论 diff-驱动器、类汽车或 mecanum，而是从固定传统车轮、中心化的 steerable 传统车轮、off-中心化的 steerable/脚轮车轮和 omniwheels 的约束出发，建立矩阵形式的机动性 restrictions，再推导位姿运动学、配置运动学、配置动力学和位姿动力学四类模型。

来源网址: https://nd.ics.org.ru/nd1104002/

## 核心主张

- WMR 是带 nonintegrable 运动学约束的机械系统，因此 manipulator-风格规划/控制 algorithms 不能直接套用。
- 一般性 WMR 可以有任意数量、类型和 motorization 的车轮；重要的是车轮约束如何限制底盘机动性，而不是只按外观命名。
- 传统固定车轮与中心化的 steerable 车轮的横向无滑移约束共同形成矩阵 $C_1^*(\beta_c)$；其零空间维度定义度的机动性：$\delta_m=\dim N[C_1^*(\beta_c)]=3-\operatorname{rank}C_1^*(\beta_c)$。
- 可独立定向的中心式可转向轮的有效数量定义可转向度：$\delta_s=\operatorname{rank}C_{1c}(\beta_c)$。
- 在非退化的假设下，WMR 只剩五种实用的类型：$(3,0)$、$(2,0)$、$(2,1)$、$(1,1)$ 和 $(1,2)$。
- 操纵度 $\delta_M=\delta_m+\delta_s$ 描述直接机动性与可通过转向自由度调节的机动性之和；相同的 $\delta_M$ 不代表相同的机器人行为，因为 $\delta_m$ 与 $\delta_s$ 的分配可能不同。
- 来源区分四种模型：位姿运动学模型描述整体位姿运动；配置运动学模型描述全部配置变量；配置动力学模型纳入执行器 torques；位姿动力学模型与配置动力学模型 feedback-等价的。
- 位姿模型是通用的、不可约的和可控的；配置模型更依赖具体机器人结构，可可约的，且不一定可控的。

## 关键引文

- "classified into five types"
- "degree of mobility and degree of steerability"

## 关联

- [[WheeledMobileRobotClassification]] - $\delta_m$、$\delta_s$、$\delta_M$ 与五类 WMR 的主概念页。
- [[WheeledRobotKinematics]] - 车轮层级约束与广义的 WMR 运动学。
- [[SteerableWheels]] - 中心化的 steerable 车轮、off-中心化的 steerable/脚轮车轮和转向 DOFs 的数学角色。
- [[OmnidirectionalWheels]] - 类型 $(3,0)$ 的 omni-移动式机器人与全向轮示例。
- [[NonholonomicMobileRobots]] - limited-机动性类型与非完整约束可控性的连接。

## 开放问题

- 原始 IEEE 1996 PDF 与 2011 俄文翻译/复刊版之间是否有排版、页码或术语差异，需要后续补充 IEEE DOI 元数据页面。
- 这套分类体系如何映射到现代 `swerve drive`、industrial AMR 转向模块、skid-steer 和履带式机器人？
- 论文的动力学模型部分如何与现代仿真器关节/执行器/接触 parameterization 对齐，例如 MuJoCo、Isaac Sim/PhysX 和 Gazebo/ROS 2 控制？
