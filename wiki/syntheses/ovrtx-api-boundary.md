---
title: "ovrtx API 边界"
type: synthesis
tags: [distill, ovrtx, openusd, sensor-simulation, randomization]
sources: ["[[nvidia-ovrtx]]"]
last_updated: 2026-07-13
---

# ovrtx API 边界

## 讨论背景

这次讨论要回答两个使用边界问题：第一，[[Ovrtx|ovrtx]] 是否提供 API 去“拼接一个 USD 场景”，尤其是添加刚体、关节系统、可变形等物理物体；第二，它是否提供灯光 / 相机随机化这类域随机化功能。结论需要保存在知识库中，因为这会影响后续把 ovrtx 放在 Isaac Sim / Isaac Lab / ovPhysX / custom USD 制作流程中的位置。

## 提炼结果

| Insight | 证据层级 | 知识库目标 |
| --- | --- | --- |
| ovrtx 支持运行时阶段组合：open 根部 USD、行内 USDA 子层、add/remove 参考资料、clone loaded subtrees、查询图元、read/write/图谱属性。 | 有来源支持的 | [[nvidia-ovrtx]], [[RTXSensorSimulationPipeline]], [[Ovrtx]] |
| ovrtx 来源中没有显示高层 `create_rigid_body` / `create_articulation` / `create_deformable` 这类物理物体制作 API；更稳妥的定位是传感器/渲染 SDK，而不是完整物理场景 builder。 | 有来源支持的带有 absence-边界笔记 | [[Ovrtx]], [[RTXSensorSimulationPipeline]] |
| 刚体、关节系统、可变形等物理丰富内容应优先由 Isaac Sim / Isaac Lab / ovPhysX / OpenUSD 制作工具 / 离线 USDA fragments 创建，再由 ovrtx 参考 / 子层 / clone / 变换进入运行时阶段。 | 源自讨论的用法指南 | [[Ovrtx]] |
| ovrtx 没有发现内置域随机化模块；但它提供属性 writes / 映射，因此可以由上层应用随机化相机位姿、focal 长度、exposure、灯光、材质、RenderProduct 场景、实例 transforms。 | 有来源支持的 API 表面 + 源自讨论的指南 | [[RTXSensorSimulationPipeline]] |
| 对 RL 或合成数据工作流，随机化策略的归属应在 env 封装 / 数据集生成器 / Isaac Lab 任务层，而 ovrtx 负责执行已作者的阶段 changes 并产出传感器张量。 | 源自讨论的架构指南 | [[ovrtx-api-boundary]] |

## 证据边界

`source-backed` 的部分来自 [[nvidia-ovrtx]] 中已收录的 README、文档、headers、测试和示例：它们明确展示了 `open_usd*`、行内 composition、`add_usd_reference*`、`clone_usd`、阶段查询、属性 read/write/映射、RenderProduct/RenderVar、相机/lidar/radar 输出和渲染场景。关于“不提供完整物理物体制作 API”的判断来自当前来源快照中没有发现刚体 / 关节系统 / 可变形创建辅助函数；这是来源表面边界，不等同于证明底层 Omniverse RTX 不能消费这些 USD 结构规范。

“来自讨论”的部分是工程使用建议：如果要创建物理丰富场景，应让更合适的制作层负责物理结构规范与运行时语义，再把结果交给 ovrtx 做 RTX 传感器仿真。这个建议符合现有 API 形态，但仍需后续官方架构文档或示例补强。

## 写入位置

- [[Ovrtx]]：增加 API 边界段落，明确 ovrtx 是传感器/渲染 SDK，不是高层物理场景 builder。
- [[RTXSensorSimulationPipeline]]：增加场景组合 / 随机化归属的实践说明和失效情形。
- `wiki/index.md`：增加综合整理入口，方便以后回答 ovrtx 边界问题。

## 后续来源

- ovrtx 与 ovPhysX / Isaac Sim / Isaac Lab 共进程或流程集成的官方架构文档。
- OpenUSD / Omniverse 物理结构规范制作文档，尤其是刚体、关节系统、可变形的规范的制作层。
- Isaac Lab 域随机化 / 环境随机化文档，用于确认随机化策略应放在哪个层。
- ovrtx 后续发布笔记，确认是否新增物理制作或随机化便捷方法 APIs。
