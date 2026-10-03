---
title: "EmbodiedGen V1/V2 学习地图"
type: synthesis
tags: [learn, simulation, 3d-generation]
sources: ["[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]"]
modified: 2026-10-04
topics: ["topics/assets-and-world-generation", "topics/simulation-ready-worlds"]
---

# EmbodiedGen V1/V2 学习地图

这条路径回答一个问题：怎样把生成的三维内容逐步变成机器人能够交互、编辑和复用的仿真环境？[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|V1]] 侧重资产加工，[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|V2]] 进一步组织任务世界。两篇都不是新的刚体求解器，也不是以预测未来观测为主要输出的 [[WorldModelsForEmbodiedAI|学得世界模型]]。

## 读之前需要区分的对象

视觉网格决定外观，碰撞网格决定接触计算的几何输入，物理参数决定质量和摩擦等行为，场景图决定对象关系，任务定义决定怎样算完成。理解这五者后，再读生成模型、纹理模型和智能体编排，会更容易判断各模块实际修复了哪类错误。机制入口是 [[SimulationReady3DWorldGeneration|可用于仿真的三维世界生成]]、[[CollisionGeometryForRobotSimulation|碰撞几何]] 与 [[AgenticSceneTaskGeneration|场景与任务生成]]。

## 两代系统的关键变化

| 问题 | V1 | V2 |
| --- | --- | --- |
| 交付单位 | 带纹理、物理元数据和仿真描述的资产，兼有场景背景 | 资产、可供性、任务场景、多房间世界与编辑状态 |
| 视觉质量 | 生成后检查、多视角纹理与修补 | 继承资产流程，强调几何修复、分离碰撞表示和部署成本 |
| 交互语义 | 主要展示物体与关节化资产可执行 | 部件分割、功能合并、抓取生成及物理验证 |
| 空间组织 | 全景图反投影背景等示例 | 类型化对象树、约束放置、沉降、房间拓扑与家具实例 |
| 修改方式 | 主要生成与导出 | 持久世界状态、类型化技能、有界修改与验证后提交 |
| 主要定量证据 | 150 个杯子上的不可用资产检测 | 资产消融、200 物体可供性、150 任务世界人工验收 |

此表概括各篇实际展示的侧重，不表示 V1 完全没有场景、或 V2 的全部能力已用统一评测验证。章节与数据见两篇来源页。

## 按机制阅读

1. **先理解“生成”和“可用”的距离。** 读 V1 §3.1、§3.5：生成网格之后为什么还需要尺度、碰撞与 URDF？模型估计的物理参数与测量参数有什么不同？
2. **再拆开视觉改进。** 读 V1 §3.4 的 GeoLifter：六视角几何条件、多视角一致性损失、去光照和纹理融合各解决什么？不要把纹理提升解释为接触精度提升。
3. **看 V2 的表示契约。** 读 §2.1–2.2：视觉、碰撞、物理与可供性怎样分离？六引擎导出展示的是兼容性，还是跨引擎动力学一致？
4. **跟踪筛选损耗。** 读 §2.3 与 §3.2：部件分割、标签质量和至少一个有效抓取的条件率怎样连成 50% 的端到端通过率？
5. **理解世界的状态。** 读 §2.4–2.6：树结构、放置、沉降和编辑提交各维护哪种不变量？失败为什么应保留原世界？
6. **最后读实验和归因。** 读 §3.1–3.4：每个成功率的分母、判据、硬件和耗时是什么？哪些实验由本篇完成，哪些来自配套论文的摘要转述？

## 读完后用一个任务自检

以“把新生成的杯子放到厨房桌上，供机器人抓取”为教学练习，不需要运行系统即可检查自己是否读懂：沿 [[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|V1]] 说清图像怎样变成网格、几何条件怎样让杯身纹理在多视角一致；沿 [[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|V2]] 说清碰撞体、部件语义和抓取测试分别输出什么，以及桌面支撑与可达区域怎样限制杯子位置。

然后加入“把刚才的杯子移到桌子另一侧”：如果只改坐标而不改图关系或记录历史，哪个不变量会破坏？如果图像很好看但夹爪穿不过把手，应该回到哪一层？前一问对应 [[AgenticSceneTaskGeneration|状态编辑]]，后一问对应 [[CollisionGeometryForRobotSimulation|碰撞表示]]。能定位输入、输出和失败所属模块，比记住五个成功率更接近读懂系统。

## 优先纠正的误读

| 读到的数字或表述 | 应怎样理解 |
| --- | --- |
| V1 检测精确率 68.7%、召回率 76.7% | 以不可用杯子为正类的质量检查指标，不是生成通过率 |
| V2 “Collision Success 98.6%” | 200 资产、四个偏航角的脚本抓取抬升测试，不是任意接触任务正确率 |
| V2 可供性 69.5／99.3／72.5% | 逐阶段条件率，连乘约 50%；不能只引用中间的 99.3% |
| V2 世界接受率 83.3% | 150 任务世界的人工可用性检查，仍会遇到初态已成功、尺寸错误与不稳定布局 |
| 六引擎都能加载 | 导出与加载示例，不是接触力或轨迹误差对照 |
| 仿真 9.7→79.8%、真机 21.7→75.0% | V2 援引另一项下游研究；本轮未独立审计该论文，不能视为生成器单模块的因果增益 |

以上均有两篇来源页的原文章节／表格定位。V1 的元数据估计、V2 的任务生成与下游策略训练分别处于不同验证层，不应合并为一个“仿真到现实已解决”的判断。

## 怎样迁移这些思想

**我们的解释：** 更可复用的部分是把生成过程拆成有明确输入、输出与拒绝条件的步骤：语义建议交给模型，几何约束交给可检验的程序，接触可行性通过执行筛选，世界修改在验证后提交。每个步骤仍需记录失败和筛选比例，避免最终成功示例掩盖制作成本与分布偏差。

继续看 [[magicsim-a-unified-infrastructure-for-executable-embodied-interaction|MagicSim]]，可研究资产就绪之后如何统一任务、技能、记录与学习接口；看 [[robocasa365-a-large-scale-simulation-framework-for-training-and-benchmarking-generalist-robots|RoboCasa365]]，可研究场景和数据增加如何影响策略；看 [[TaskGeneralistPolicyEvaluation|策略评测]]，则检查生成环境的收益是否落到了清楚的泛化协议。待补原文与跨引擎验证的统一问题队列见 [[research-questions|研究问题与缺口]]，不在学习路径另建一份资料计划。

## 研究归属

[[topics/assets-and-world-generation|三维资产与场景生成]] · [[topics/simulation-ready-worlds|生成世界何时成为可执行环境]]。
