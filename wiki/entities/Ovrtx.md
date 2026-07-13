---
title: "ovrtx"
type: entity
tags: [sdk, nvidia, omniverse, rtx, sensor-simulation, openusd]
sources: ["[[nvidia-ovrtx]]"]
last_updated: 2026-07-13
---

# ovrtx

ovrtx 是 [[NVIDIA]] 发布的轻量的 C/Python SDK，用来把 Omniverse RTX 的 RTX 传感器仿真和可视化集成到外部应用。[[nvidia-ovrtx|NVIDIA ovrtx]] 来源快照显示当前收录的履带式版本是 `0.3.0`，仍标注为 pre-发布 software；它面向相机、lidar、radar 和其他传感器 outputs，使用 [[OpenUSD]] 场景描述，并把渲染的 outputs 暴露成 DLPack-兼容的张量。

工程上，ovrtx 的核心对象不是“打开一个图片渲染器”，而是一条运行时阶段流程：应用创建 `Renderer`，加载根部 USD 或行内 USDA 组合，把传感器图元、`RenderProduct`、`RenderVar` 放进阶段，调用 `step` 生成 outputs，然后按 CPU/CUDA 映射、生命周期和同步契约消费结果。C API 强调显式等待/获取/发布；Python API 包一层阻塞式的/异步便捷方法。更系统的机制整理见 [[RTXSensorSimulationPipeline]]。

API 边界上，当前来源快照支持场景组合 / mutation，但不应被理解成完整物理场景 builder。ovrtx 可以 open 根部 USD、用行内 USDA 子层原始场景、add/remove USD 参考资料、clone 已加载 subtree、查询图元，并通过属性 writes / 映射改变换、材质绑定、semantic labels、RenderProduct 场景等；但当前来源表面没有高层 `create_rigid_body`、`create_articulation`、`create_deformable` 这类物理物体制作辅助函数。更稳妥的工作流是：由 Isaac Sim / Isaac Lab / ovPhysX / USD 制作工具创建物理丰富资产，再由 ovrtx compose 进运行时阶段做 RTX 传感器仿真。这个使用边界见 [[ovrtx-api-boundary]]。

当前有来源支持的边界：本页只记录代码仓库 README、文档、headers 和 changelog 中明示的 API/生命周期信息。`physically accurate` 的传感器模型细节、RTX 渲染器内部架构、真实传感器验证和跨仿真器集成还需要额外官方文档或基准来源。

## 关联

- [[nvidia-ovrtx]] - 官方代码仓库来源页。
- [[RTXSensorSimulationPipeline]] - ovrtx 中 `RenderProduct` / `RenderVar` / DLPack output 的机制页。
- [[OpenUSD]] - ovrtx 场景配置和运行时组合的基底。
- [[NVIDIA]] - publisher。
- [[RoboticsSimulationInfrastructure]] - ovrtx 作为传感器渲染 / GPU output 基础设施的官方情形。
- [[ovrtx-api-boundary]] - 提炼 ovrtx 的场景组合、物理制作和随机化 ownership 边界。
