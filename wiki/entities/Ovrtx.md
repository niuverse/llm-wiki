---
title: "ovrtx"
type: entity
tags: [sdk, nvidia, omniverse, rtx, sensor-simulation, openusd]
sources: ["[[nvidia-ovrtx]]"]
last_updated: 2026-05-26
---

# ovrtx

ovrtx 是 [[NVIDIA]] 发布的 lightweight C/Python SDK，用来把 Omniverse RTX 的 RTX sensor simulation 和 visualization 集成到外部应用。[[nvidia-ovrtx|NVIDIA ovrtx]] source snapshot 显示当前 ingest 的 tracked version 是 `0.3.0`，仍标注为 pre-release software；它面向 camera、lidar、radar 和其他 sensor outputs，使用 [[OpenUSD]] scene description，并把 rendered outputs 暴露成 DLPack-compatible tensors。

工程上，ovrtx 的核心对象不是“打开一个图片 renderer”，而是一条 runtime stage pipeline：应用创建 `Renderer`，加载 root USD 或 inline USDA composition，把 sensor prim、`RenderProduct`、`RenderVar` 放进 stage，调用 `step` 生成 outputs，然后按 CPU/CUDA mapping、lifetime 和 synchronization contract 消费结果。C API 强调 explicit wait/fetch/release；Python API 包一层 blocking/async convenience。更系统的机制整理见 [[RTXSensorSimulationPipeline]]。

API boundary 上，当前 source snapshot 支持 scene composition / mutation，但不应被理解成 full physics scene builder。ovrtx 可以 open root USD、用 inline USDA sublayer 原始 scene、add/remove USD references、clone 已加载 subtree、query prims，并通过 attribute writes / mappings 改 transform、material binding、semantic labels、RenderProduct settings 等；但当前 source surface 没有 high-level `create_rigid_body`、`create_articulation`、`create_deformable` 这类 physics object authoring helpers。更稳妥的工作流是：由 Isaac Sim / Isaac Lab / ovPhysX / USD authoring tool 创建 physics-rich assets，再由 ovrtx compose 进 runtime stage 做 RTX sensor simulation。这个使用边界见 [[ovrtx-api-boundary]]。

当前 source-backed 边界：本页只记录 repository README、docs、headers 和 changelog 中明示的 API/lifecycle 信息。`physically accurate` 的 sensor model 细节、RTX renderer internal architecture、真实 sensor validation 和跨 simulator integration 还需要额外 official docs 或 benchmark sources。

## 关联

- [[nvidia-ovrtx]] - official repo source page。
- [[RTXSensorSimulationPipeline]] - ovrtx 中 `RenderProduct` / `RenderVar` / DLPack output 的机制页。
- [[OpenUSD]] - ovrtx scene configuration 和 runtime composition 的 substrate。
- [[NVIDIA]] - publisher。
- [[RoboticsSimulationInfrastructure]] - ovrtx 作为 sensor rendering / GPU output infrastructure 的 official case。
- [[ovrtx-api-boundary]] - distill ovrtx 的 scene composition、physics authoring 和 randomization ownership 边界。
