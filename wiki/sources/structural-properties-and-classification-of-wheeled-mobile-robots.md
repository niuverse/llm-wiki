---
title: "Structural Properties and Classification of Kinematic and Dynamic Models of Wheeled Mobile Robots"
type: source
tags: [robotics, wheeled-robots, mobile-robots, nonholonomic-systems, dynamics]
sources: []
last_updated: 2026-05-01
source_file: raw/campion-bastin-dandrea-novel-wheeled-mobile-robots-nd-2011.pdf
source_kind: pdf
source_url: https://nd.ics.org.ru/nd1104002/
extracted_text: graph/extracts/campion-bastin-dandrea-novel-wheeled-mobile-robots-nd-2011.md
source_date: unknown
---

## 摘要

Guy Campion、Georges Bastin 和 Brigitte D'Andrea-Novel 的 classic WMR classification paper 原发表于 *IEEE Transactions on Robotics and Automation* 1996；当前 ingest 的 canonical full text 是 *Russian Journal of Nonlinear Dynamics* 2011 俄文翻译/复刊版本，页面标注 CC BY-ND。它系统分析 wheeled mobile robot（WMR）的 kinematic and dynamic models，并提出用 degree of mobility $\delta_m$ 与 degree of steerability $\delta_s$ 把 nondegenerate WMR 分成五类。

这篇 source 是 [[WheeledMobileRobotClassification|wheeled mobile robot structural classification]] 的核心依据。它比入门教材更一般：不只讨论 diff-drive、car-like 或 mecanum，而是从 fixed conventional wheels、centered steerable conventional wheels、off-centered steerable/caster wheels 和 omniwheels 的 constraints 出发，建立矩阵形式的 mobility restrictions，再推导 posture kinematic、configuration kinematic、configuration dynamic 和 posture dynamic 四类模型。

Source URL: https://nd.ics.org.ru/nd1104002/

## 核心主张

- WMR 是带 nonintegrable kinematic constraints 的 mechanical systems，因此 manipulator-style planning/control algorithms 不能直接套用。
- General WMR 可以有任意数量、类型和 motorization 的 wheels；重要的是 wheel constraints 如何限制 chassis mobility，而不是只按外观命名。
- Conventional fixed wheels 与 centered steerable wheels 的 lateral no-slip constraints 共同形成矩阵 $C_1^*(\beta_c)$；其 nullspace 维度定义 degree of mobility：$\delta_m=\dim N[C_1^*(\beta_c)]=3-\operatorname{rank}C_1^*(\beta_c)$。
- Independently orientable centered steerable wheels 的有效数目定义 degree of steerability：$\delta_s=\operatorname{rank}C_{1c}(\beta_c)$。
- 在 nondegenerate assumptions 下，WMR 只剩五种 practical types：$(3,0)$、$(2,0)$、$(2,1)$、$(1,1)$ 和 $(1,2)$。
- Degree of maneuverability $\delta_M=\delta_m+\delta_s$ 描述直接 mobility 加上可通过 steering DOFs 调节的 mobility；同样的 $\delta_M$ 不代表同样的 robot behavior，因为 $\delta_m$ 与 $\delta_s$ 的分配不同。
- Source 区分四种 models：posture kinematic model 描述整体位姿运动；configuration kinematic model 描述全部 configuration variables；configuration dynamic model 纳入 actuator torques；posture dynamic model 与 configuration dynamic model feedback-equivalent。
- Posture models 是 universal、irreducible 和 controllable；configuration models 更依赖具体 robot construction，可 reducible，且不一定 controllable。

## 关键引文

- "classified into five types"
- "degree of mobility and degree of steerability"

## 关联

- [[WheeledMobileRobotClassification]] - $\delta_m$、$\delta_s$、$\delta_M$ 与五类 WMR 的主概念页。
- [[WheeledRobotKinematics]] - wheel-level constraints 与 generalized WMR kinematics。
- [[SteerableWheels]] - centered steerable wheels、off-centered steerable/caster wheels 和 steering DOFs 的数学角色。
- [[OmnidirectionalWheels]] - type $(3,0)$ 的 omni-mobile robots 与 omniwheel examples。
- [[NonholonomicMobileRobots]] - limited-mobility types 与 nonholonomic controllability 的连接。

## 开放问题

- 原始 IEEE 1996 PDF 与 2011 俄文翻译/复刊版之间是否有排版、页码或术语差异，需要后续补充 IEEE DOI metadata page。
- 这套 taxonomy 如何映射到现代 `swerve drive`、industrial AMR steering modules、skid-steer 和 tracked robots？
- 论文的 dynamic model 部分如何与现代 simulator joint/actuator/contact parameterization 对齐，例如 MuJoCo、Isaac Sim/PhysX 和 Gazebo/ROS 2 control？
