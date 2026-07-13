---
title: "NVIDIA ovrtx"
type: source
tags: [github, nvidia, omniverse, rtx, sensor-simulation, openusd, rendering]
sources: []
last_updated: 2026-07-13
source_file: raw/ovrtx-source.tar.gz
source_kind: repo
source_url: https://github.com/NVIDIA-Omniverse/ovrtx/tree/main
source_metadata: raw/ovrtx-main-commit.json
source_readme: raw/ovrtx-readme.md
source_date: 2026-05-19
---

## 摘要

[[NVIDIA]] 的 `NVIDIA-Omniverse/ovrtx` 代码仓库是 [[Ovrtx|ovrtx]] 的官方来源代码仓库。README 把 ovrtx 定位为轻量的 C 与 Python SDK 用于 Omniverse RTX，用来把 RTX 传感器仿真和可视化集成到应用里；目标场景包括机器人学学习、合成数据生成、industrial/设计流程。本次收录使用本地 clone `/home/galbot/Projects/ovrtx` 的履带式 `HEAD` archive，提交为 `29d11037fbcaed0f0f53e7f32d17bd0486fd453b`，作者 date 为 2026-05-19，版本文件与 Python 软件包都指向 `0.3.0`。本地 clone 里有一个未跟踪的 `examples/python/minimal/uv.lock`，没有进入 `raw/ovrtx-source.tar.gz`。

这个来源的核心价值是把 RTX 传感器仿真的工程契约写清楚：应用创建渲染器，把 [[OpenUSD]] 内容加载到运行时阶段，通过 `RenderProduct` 路径步骤传感器仿真，再把 `RenderVar` 输出映射成 DLPack 张量。它不是只讲视觉渲染质量，而是把相机、lidar、radar、语义分割、non-视觉材质标签、阶段属性、异步操作、GPU/CPU 映射和 C/Python 生命周期 rules 放进一个可编程流程。这个机制被整理到 [[RTXSensorSimulationPipeline]]。

来源网址: https://github.com/NVIDIA-Omniverse/ovrtx/tree/main

## 核心主张

- ovrtx 是 Omniverse RTX 的 C/Python SDK；README 声明它支持相机、lidar、radar 等物理上 accurate 传感器仿真，并服务于物理 AI、机器人学学习、合成数据生成与设计/industrial 流程。
- 代码仓库快照是 pre-发布 `0.3.0`。README 要求 Python 3.10-3.13；C/C++ 示例使用 CMake；二进制发布版本支持 Windows x86_64、Linux x86_64 和 Linux aarch64，并需要兼容的 NVIDIA RTX-可用的 GPU 和驱动程序。
- 典型 application 流程是 create 渲染器、负载 USD、步骤 one 或 more RenderProducts、映射图渲染变量或 read 属性、释放映射/结果/bindings/渲染器。关键边界是 `step` 接收 `RenderProduct` 路径，不接收传感器路径。
- 运行时阶段通常包含传感器图元、`RenderProduct` 图元和 `RenderVar` 图元。`RenderProduct` 通过 `rel camera` 选择相机/lidar/radar 等传感器，通过 `rel orderedVars` 选择输出变量，并承载分辨率、渲染模式、渲染场景、设备 pinning 等逐产品 controls。
- `RenderVar` 的 `sourceName` 绑定渲染器输出。相机输出可以是 `LdrColor`、`HdrColor`、`NormalSD`、`DepthSD`、`SemanticSegmentation` 等单张量输出；lidar/radar 的 `PointCloud` 是多张量输出，通道由 `RenderVar.channels` 选择。
- 输出容器是自描述的具名的结构：渲染 var 输出有 `name`、`type`、`doc`、`version`、`status`、GPU 同步提示、具名的张量和 CPU 参数。批量数据使用 DLPack，所以 NumPy、PyTorch、Warp、JAX、CuPy 或 CUDA 代码可以零拷贝消费。
- Lidar 和 radar 的变量-sized 点点云张量要用 `Counts` 限定有效条目，用 `Flags[i] & 0x40` 判断 valid bit。`Counts` 与 `Flags` 会被传感器模型 auto-enable；其他载荷通道只有被请求时才出现。
- 相机渲染模式是每个 RenderProduct 取舍：`Real-Time Path-Tracing` 作为默认高保真路径，`PathTracing` 用于 progressive/参考质量渲染，`Minimal` 用于高吞吐量的 RL、分割掩码或调试流程。
- ovrtx 支持三类 USD 组合模式：open 文件/URL/行内 USDA 作为根部层，用行内根部层子层现有场景并添加传感器/RenderProducts/标签，或在已打开根部阶段下添加 removable 引用的内容。
- 阶段查询、属性 read/write、属性 bindings 和属性映射让应用以 DLPack 张量方式读写运行时阶段；hot 路径可以通过持久 bindings 或映射避免重复构造 descriptors。
- 异步模型是按流排序的。Python 提供便捷的阻塞式方法和 `*_async`；C 入队函数返回操作编号，必须等待/获取/发布。GPU 映射带同步提示，C 映射/结果需要显式取消映射/释放。
- 0.3.0 changelog 增加了 lidar/radar 传感器支撑、多张量 RenderVar 输出、阶段查询、阶段属性 reads、expanded 属性 write/映射 APIs、视口 picking/选择 outlines、结构规范路径 registration 和一组智能体技能/文档。

## 关键引文

- "pre-release software"
- "step takes RenderProduct paths"
- "RenderProduct" / "RenderVar"
- "Counts and Flags are auto-enabled"
- "First-call wins."

## 关联

- [[Ovrtx]] - SDK 实体，记录版本、范围、许可证和 API 表面。
- [[RTXSensorSimulationPipeline]] - 从本代码仓库提炼出的机制层级概念页。
- [[OpenUSDSceneComposition]] - ovrtx 用行内子层、参考资料、关系和运行时阶段说明 OpenUSD 组合如何进入传感器仿真。
- [[RoboticsSimulationInfrastructure]] - ovrtx 把渲染器生命周期、传感器输出、GPU 内存/映射、异步状态与示例变成仿真基础设施的官方实现情形。
- [[OpenUSD]] - ovrtx 的场景/传感器/RenderProduct 配置建立在 USD 结构规范、图元路径、关系和组合上。
- [[SimulationRealityGap]] - 来源支持传感器仿真流程，但没有证明传感器输出与真实硬件分布自动一致。

## 开放问题

- ovrtx 与 Isaac Sim、Isaac Lab、Omniverse Kit、ovPhysX 的边界需要更多官方架构文档：这个代码仓库说明了 SDK 契约，但没有完整解释底层 Omniverse RTX 运行时组合。
- README 提到可扩展的性能和物理上 accurate 传感器仿真，但缺少独立基准或传感器模型验证来源；性能与仿真到现实迁移准确率应通过后续来源单独收录。
- Lidar/radar 材质行为、non-视觉材质 database 和语义标签的真实硬件校准逻辑还需要更低层来源支持。
- 0.3.0 是 pre-发布；API、局限和 packaging 行为值得在后续发布后 re-收录。
