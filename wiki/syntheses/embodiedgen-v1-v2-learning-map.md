---
title: "EmbodiedGen V1/V2 学习地图"
type: synthesis
tags: [learn, embodiedgen, simulation, 3d-generation]
sources: ["[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]"]
last_updated: 2026-07-13
---

# EmbodiedGen V1/V2 学习地图

## 主题边界

EmbodiedGen 研究的是生成式仿真基础设施：如何把文本、图像、任务描述与对话式编辑变成仿真器可以消费的三维资产和世界。它不是新的刚体求解器，也不是预测未来观测的 [[WorldModelsForEmbodiedAI|学得的世界模型]]。V1 的核心是可用于仿真的资产；V2 的核心是可执行、任务条件化且有状态的世界。

## 前置知识图

1. 3D 表征：网格、UV 纹理、3DGS、视觉几何与碰撞几何。
2. 物理资产语义：公制尺度、质量、摩擦、惯性坐标帧、网格封闭性和凸分解。
3. 仿真器格式：URDF、MJCF/XML、USD，以及格式转换与运行时解释的边界。
4. 场景结构：场景图结构、支持/包含/空间 relations、6-DoF poses、可达性与导航约束。
5. 交互语义：部件分割、可供性、graspability、6-DoF 抓取与物理验证。
6. 机器人学习：环境 diversity、在线 RL、域随机化、OOD 评估与仿真到现实迁移 attribution。

## 核心演进

| 问题 | V1 的回答 | V2 的回答 |
| --- | --- | --- |
| 普通生成的 3D 为什么不能直接训练机器人？ | 缺规模化、物理属性、几何 integrity、QA 与 URDF | 还缺可供性、任务语义、稳定的布局、持久的状态与闭环验证 |
| 生成单位是什么？ | 刚性/关节化的资产、纹理、全景图场景 | 物体资产 + 类型化的场景图结构 + 世界状态 |
| 如何约束错误？ | VLM/几何/审美检查与 auto-retry | hierarchical QA、网格修复、CoACD、放置求解器、沉降、抓取测试、原子性编辑 |
| 如何扩展场景？ | 全景图 → 网格/3DGS 背景 | 多房间拓扑、可通行开口、可单独寻址的家具 |
| 如何证明价值？ | 资产 QA 与定性仿真 demos | 资产/世界/可供性消融，加配套策略学习证据 |

## 机制层阅读路径

1. 先读 [[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|V1]] 章节 3.1 与 3.5，理解视觉 3D 内容与仿真器资产的差异。
2. 再读 V1 章节 3.4，理解多视角纹理一致性与后处理-处理在流程中的位置，不要把整篇论文误读为单一生成模型。
3. 读 [[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|V2]] 第 2.1–2.2 节，掌握双层可用于仿真的契约与资产流程。
4. 读 V2 章节 2.3–2.5，跟踪部件可供性、任务图结构、BFS 放置和多房间求解器如何组合。
5. 读 V2 章节 2.6，重点看持久的状态、类型化的技能、语义落地、bounded delta 与失败-不含-mutation。
6. 最后读实验 3.1–3.4，优先看各阶段的样本损耗、人工验收、延迟与配套研究的贡献归属，而不是只看醒目的成功率数字。

## 误解图谱

- “生成了 URDF，所以已经可用于仿真”：URDF 打包不能证明碰撞体、惯量、尺度、接触或任务可执行性正确。
- “同一资产能导出六个仿真器，所以动力学一致”：转换统一接口，不统一求解器/接触语义。
- “VLM 能预测质量和摩擦，所以不需要系统辨识”：VLM 给出类别先验；真实部署仍需要标定、随机化或系统辨识。
- “98.6% 碰撞成功等于机器人操作成功”：该指标是 scripted top-down 抓取与-lift 测试，不覆盖复杂接触丰富任务。
- “Vibe Coding 就是 LLM 直接编辑 3D 坐标”：论文的关键恰恰是智能体只做 intent/语义落地，确定性技能和约束决定可提交编辑。
- “RL 从 9.7% 到 79.8% 完全证明生成器”：这是配套流程的整体结果，混合了生成的环境、在线 RL、场景扩展与域随机化。

## 证据边界

| Insight | 证据层级 | 知识库目标 |
| --- | --- | --- |
| V1 自动 QA 能减少人工筛选，但远未解决 | 有来源支持的 | [[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]] |
| V2 网格修复与 CoACD 改善处理/接触指标 | 有来源支持的消融 | [[SimulationReady3DWorldGeneration]], [[CollisionGeometryForRobotSimulation]] |
| V2 可供性的最大损耗来自部件分割 | 有来源支持的分阶段评估 | [[SimulationReady3DWorldGeneration]] |
| 跨格式导出不等于跨引擎轨迹等价性 | 有来源支持的接口 + 知识库推理 | [[SimulationReady3DWorldGeneration]], [[SimulationRealityGap]] |
| 生成式世界 diversity 很可能是策略泛化的重要资源 | 有来源支持的配套摘要；因果 isolation incomplete | [[SimulationRealityGap]], [[RoboticsSimulationInfrastructure]] |
| 有状态的世界编辑应采用 transactional 状态语义 | 有来源支持的机制 + 可复用设计推理 | [[AgenticSceneTaskGeneration]] |

## 来源获取计划

- `highest priority`：收录配套论文 *扩展仿真到现实迁移强化学习用于机器人 VLAs 带有 Generative 3D Worlds*，核查场景数量扩展、RL 设置、域随机化与真实机器人协议。
- `high priority`：收录 EmbodiedGen V2 代码/文档的 versioned 快照，确认论文表示如何落到结构规范、布局文件、converters、技能与测试。
- `medium priority`：收录 DIPO、3D-Fixer、P3-SAM 与 GraspGen，拆分关节化的生成、遮挡完成度、部件分割和抓取验证的贡献。
- `medium priority`：补充独立跨仿真器比较，测同一生成的场景在 MuJoCo、SAPIEN、Isaac Sim/PhysX、Genesis 与 Bullet 中的沉降/接触/策略 divergence。

相关页面：[[EmbodiedGen]]、[[SimulationReady3DWorldGeneration]]、[[AgenticSceneTaskGeneration]]、[[RoboticsSimulationInfrastructure]]、[[CollisionGeometryForRobotSimulation]]、[[SimulationRealityGap]]。
