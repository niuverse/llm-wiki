---
title: "可用于仿真的三维世界生成"
type: concept
tags: [robotics, embodied-ai, simulation, 3d-generation]
sources: ["[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]", "[[robotics-simulation-infrastructure]]", "[[mujoco-computation-collision-detection]]", "[[coacd-approximate-convex-decomposition]]"]
modified: 2026-10-04
topics: ["topics/assets-and-world-generation", "topics/simulation-ready-worlds"]
---

# 可用于仿真的三维世界生成

可用于仿真的生成系统需要交付能加载、能接触、能执行任务的资产与环境。视觉外观只是其中一层。[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|EmbodiedGen V1]] 主要组织资产生成、检查、纹理和物理打包；[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|V2]] 再加入部件交互语义、任务布局和有状态编辑。它们生成可执行的显式环境，与预测未来观测的 [[WorldModelsForEmbodiedAI|学得世界模型]] 有不同的输出契约。

## 从图像到可执行资产

V1 把图像生成的网格或三维高斯表示接到几何检查、纹理处理与 URDF 打包。语言视觉模型提供尺度、质量与摩擦估计，作用是填补缺失参数；这些估计未经逐资产测量，不能视为真实动力学标定。多视角纹理一致性解决外观问题，也不能证明碰撞体或惯量正确。[V1 §3.1、§3.4–3.5] [[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|原文复核]]

V2 显式分开视觉网格、碰撞网格、物理参数和交互可供性。几何修复使渲染与碰撞处理更可用；CoACD 将非凸物体近似为多个凸体；部件分割与功能合并提供交互区域；抓取候选最后还需通过仿真动作测试。各模块各自减少一种错误，不能合并为一个泛化的“物理正确率”。[V2 §2.2–2.3] [[CollisionGeometryForRobotSimulation|碰撞几何]]

**我们的组织抽象：** 可将资产记为 $A=(V,C,P,F)$，分别表示视觉、碰撞、物理参数与功能语义。世界还需要 $W=(\{A_i\},G,X,T)$：$G$ 为对象关系，$X$ 为位姿，$T$ 为任务条件。这只是方便检查交付物的记号，不是论文训练目标或新的优化算法。

## 用带把手的杯子检查四种表示

**教学例子：** 杯子的视觉网格可以清楚显示把手洞，但如果碰撞表示用一个大凸包包住整个杯子，手指仍无法穿过洞。此时改纹理没有帮助，需要修改碰撞近似；[[CollisionGeometryForRobotSimulation|碰撞几何]] 解释这种几何误差。反过来，即使手指能进入把手，错误尺度会让夹爪张不开，错误质量／摩擦又可能让抬升测试失败。最后，“把手适合抓取”的语义标签只提供目标区域，仍需构造姿态、解机器人运动学并执行验证。

这个例子把 $V,C,P,F$ 的作用分开：看得见、碰得到、力学行为合理、能选出功能部位。它依据 [[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|V2资产流程]] 与碰撞概念作教学重构，不是论文新增的一组杯子实验。调试时应找到失败发生的表示层，再修改该层输入。

## 四层验证互不替代

| 层级 | 需要检查 | 已有证据及边界 |
| --- | --- | --- |
| 格式与结构 | 文件可加载、关节／引用有效、尺度与坐标一致 | URDF、MJCF、USD 导出支持接口复用；不证明不同引擎轨迹一致 |
| 几何与接触 | 碰撞近似、穿透、支撑、沉降与稳定性 | V2 资产消融有脚本抓取测试；不覆盖任意接触任务 |
| 交互可行性 | 功能部件可识别，至少有可执行的抓取候选 | V2 独立 200 物体评估总通过率 50%；不是所有部件或所有抓取均成功 |
| 任务与策略 | 初态未完成目标、物体可达、动作能完成目标、策略能泛化 | 场景人工验收与下游策略成功率评估的对象不同，不能相互替代 |

这些层级概括了 V1/V2 的工程检查，跨层解释是知识库整理。实验规模、消融和阈值见两篇来源页；不能把合成的四层框架误称为作者统一基准。[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|V2 §2–3]]

V2 的“Collision Success 98.6%”来自另一组 200 资产、每个资产四个偏航角的 Franka 脚本抓取抬升；名称比测量范围宽。可供性流程的阶段通过率为 69.5%、99.3%、72.5%，连乘约 50%；其判定含不适合抓取的大物体豁免，不能解释为任意新物体都有一半概率被真实机器人成功操作。[V2 表2–3]

## 场景生成与编辑

V2 以类型化场景树约束对象角色，通过广度优先放置处理支撑、重叠和可达性，再以物理沉降检查布局。交互式编辑对现有世界计算有界修改，验证成功才提交；失败保留原状态。这把生成模型的语义建议与确定性几何／状态维护分开。具体机制见 [[AgenticSceneTaskGeneration|智能体式场景与任务生成]]。

主要残余问题包括初态已经满足目标、尺寸不相容、桌边物体不稳定，以及物理参数只具类别合理性。多引擎转换尚不能替代 [[SimulationRealityGap|仿真与现实差距]] 验证；V2 转述的策略学习改进来自配套研究，不能单独归因于世界生成器。阅读顺序见 [[embodiedgen-v1-v2-learning-map|EmbodiedGen 学习地图]]。

## 研究归属

[[topics/assets-and-world-generation|三维资产与场景生成]] · [[topics/simulation-ready-worlds|生成世界何时成为可执行环境]]。
