---
title: RoboHarness：用视觉关键点和几何约束连接模型与机器人
nav_title: RoboHarness
type: source
tags: [robotics, embodied-ai, source-backed]
sources: []
modified: '2026-10-15'
source_file: raw/roboharness-visual-geometric-control-2026-10-15-a4e983be7235.html
source_kind: html
source_type: paper
source_url: https://arxiv.org/abs/2610.14018v1
source_date: '2026-09-29'
source_version: 2610.14018v1
extracted_text: graph/extracts/roboharness-visual-geometric-control-2026-10-15-a4e983be7235.md
acquired: '2026-10-15'
snapshot_sha256: a4e983be72356d63da80386a20e8d06634757742fad1400ad23d50f224678c25
paper_title: 'RoboHarness: A Simple Harness Outperforms VLA and World Actions Models'
year: 2026
venue: arXiv 预印本
reviewed: '2026-10-15'
topics: [topics/robot-harness-and-physical-rsi, topics/robot-policy-learning, topics/agent-execution]
---

## 概览

RoboHarness 给冻结的视觉语言模型提供视觉关键点、持续跟踪和几何约束工具。模型选点并表达目标关系，工具层完成三维还原、可达性筛选、运动规划与执行。它主要研究动作接口怎样让通用模型完成操作，不是已经验证的递归自改进系统。（§1、§3、§6）

完整阅读 v1 HTML 正文、参考文献和附录 A–D，包括逐实例和100物体表。arXiv 标识为2610.14018，但官方提交历史写2026-09-29；本页并列保留这个元数据现象，不按编号推造日期。没有运行实验或核查其待发布实现；与 PyPI／其他 GitHub 上同名 roboharness 工具不是同一来源。

## 关键点怎样变成动作

模型在头部 RGB 图像上选取物体关键点，`track_object` 用光流跨帧跟踪，再结合深度与相机变换得到统一坐标。论文约定前、左、上分别为 $x,y,z$ 正方向；接口使用坐标必须连同实际相机／机器人变换核查，不能仅凭轴名移植。（§3.1）

点分为手上与手外两类。夹爪或被刚性抓持物体上的点随末端变换运动；环境中的目标点作为约束参照。工具支持点重合、线共线、线垂直平面、平面平行等请求，也暴露末端、底盘、高度与俯仰的增量调整。求解顺序是采样满足几何约束的候选，排除 IK 不可行项，规划并执行轨迹，随后重新观测。（§3.2）

教学上可把物体上的局部点 $p_i$ 与环境目标点 $q_i$ 写成 $Rp_i+t\approx q_i$，其中 $(R,t)\in SE(3)$ 为末端引起的刚体变换。距离与方向约束决定候选目标位姿，运动规划负责到达路径，反馈负责确认物体是否仍按假设运动。这个式子是机制解释，不是论文声明的具体损失函数。

核心假设是被抓物体与夹爪之间近似刚性连接、关键点及深度可靠；滑动、遮挡、接触变形会破坏该关系。几何目标可表达，不自动保证夹持稳定、碰撞路径存在或操作成功。（§3.2、§6；第二句为解释）

## “完备性”主张需要哪些条件

§4尝试证明抓取姿态可由接触点及第三方向点表达，以及两条非平行线的对应可唯一确定刚体变换。本页保留其表示论动机，但不接受为任意物体、任意操作的无条件保证。

**我们的数学核查：**若“线重合”表示无方向直线集合，取相交的 $x$ 轴、$z$ 轴，恒等变换与绕 $y$ 轴旋转180度都会把两条线各自映到自身，因而并不唯一。原推导直接采用有方向向量等式，需要补上方向约定或更多非对称约束。抓取证明中从射线与物体表面的交点推出唯一第三点，也需要交点选择和几何条件；$\tan\theta$ 单独不能区分相差 $\pi$ 的角。表达能力论证还不包含动力学与规划可行性。

这项核查只针对论文写出的命题及证明假设，不证明实际工具实现一定采用了有歧义的解；实现尚未在本轮核查。

## 实验协议比标题更重要

BEHAVIOR Challenge 2025 只测前10项任务、每任务5个固定实例，共50回合。模型为 Qwen3.8-Flash-Next，各任务使用人工编写且包含完成流程与行为限制的提示，同任务跨实例共用。最大步数按官方任务限制设置。论文表3／附录 A 的均值为0.44539，是原生 $q$-score 的平均，不是44.539%的整任务成功率。部分对照直接引用官方榜单，不能视为全部方法在同一50实例上的配对实验。（§5.1、附录 A）

100物体测试的成功判据是目标高度比初态提升至少5厘米、最多2000步；正文称抓起与放置，但实际判据只要求抬升。RoboHarness 使用 R1 Pro 地面与俯身初态，学习策略使用其训练环境的清空 LIBERO 桌面；因此68–86/100的模型结果不能剥离机器人形态和初态差异，成为“接口本身普遍胜过 VLA”的因果结论。（§5.2、附录 C–D）

机器人数据小时数由不同论文和数据集换算，有些混合人类视频，有些基于旧模型估计，未计通用视觉语言预训练和人工技能／提示成本。该散点比较不能用于证明“机器人数据越多越无用”。这些是本页对报告口径的审阅，而非新增实验。

## 对 Harness 研究的启发

值得吸收的是“用可持续追踪的几何量帮助模型落地”，与 [[PolicyDeploymentContract|部署接口]] 紧密相关。它与 [[racap-evolvable-robot-learning|RACaP]] 的任务技能 API 处于不同抽象粒度；前者让模型组合几何关系，后者在经过验证的技能内处理更多几何和接触细节。

论文§6把更强物理落地、模型训练或 harness 演化列为未来工作，因此本库将它归为 [[RobotHarness|执行接口]] 的证据，而不是 [[PhysicalRecursiveSelfImprovement|Physical RSI]] 的实现证明。相关新方法对照见 [[topics/robot-harness-and-physical-rsi]]。
