---
title: "NVIDIA ovrtx"
type: source
tags: [github, nvidia, omniverse, rtx, sensor-simulation, openusd, rendering]
sources: []
last_updated: 2026-05-26
source_file: raw/ovrtx-source.tar.gz
source_kind: repo
source_url: https://github.com/NVIDIA-Omniverse/ovrtx/tree/main
source_metadata: raw/ovrtx-main-commit.json
source_readme: raw/ovrtx-readme.md
source_date: 2026-05-19
---

## 摘要

[[NVIDIA]] 的 `NVIDIA-Omniverse/ovrtx` repository 是 [[Ovrtx|ovrtx]] 的 official source repository。README 把 ovrtx 定位为 lightweight C and Python SDK for Omniverse RTX，用来把 RTX sensor simulation 和 visualization 集成到应用里；目标场景包括 robotics learning、synthetic data generation、industrial/design workflows。本次 ingest 使用本地 clone `/home/galbot/Projects/ovrtx` 的 tracked `HEAD` archive，commit 为 `29d11037fbcaed0f0f53e7f32d17bd0486fd453b`，author date 为 2026-05-19，version file 与 Python package 都指向 `0.3.0`。本地 clone 里有一个未跟踪的 `examples/python/minimal/uv.lock`，没有进入 `raw/ovrtx-source.tar.gz`。

这个 source 的核心价值是把 RTX sensor simulation 的工程 contract 写清楚：应用创建 renderer，把 [[OpenUSD]] content 加载到 runtime stage，通过 `RenderProduct` 路径 step sensor simulation，再把 `RenderVar` outputs 映射成 DLPack tensors。它不是只讲视觉渲染质量，而是把 camera、lidar、radar、semantic segmentation、non-visual material labels、stage attributes、async operations、GPU/CPU mapping 和 C/Python lifetime rules 放进一个可编程 pipeline。这个机制被整理到 [[RTXSensorSimulationPipeline]]。

Source URL: https://github.com/NVIDIA-Omniverse/ovrtx/tree/main

## 核心主张

- ovrtx 是 Omniverse RTX 的 C/Python SDK；README 声明它支持 camera、lidar、radar 等 physically accurate sensor simulation，并服务于 Physical AI、robotics learning、synthetic data generation 与 design/industrial workflows。
- Repository snapshot 是 pre-release `0.3.0`。README 要求 Python 3.10-3.13；C/C++ examples 使用 CMake；binary releases 支持 Windows x86_64、Linux x86_64 和 Linux aarch64，并需要 compatible NVIDIA RTX-capable GPU 和 driver。
- 典型 application flow 是 create renderer、load USD、step one or more RenderProducts、map render variables 或 read attributes、释放 mappings/results/bindings/renderer。关键边界是 `step` 接收 `RenderProduct` paths，不接收 sensor paths。
- Runtime stage 通常包含 sensor prim、`RenderProduct` prim 和 `RenderVar` prim。`RenderProduct` 通过 `rel camera` 选择 camera/lidar/radar 等 sensor，通过 `rel orderedVars` 选择输出变量，并承载 resolution、render mode、render settings、device pinning 等 per-product controls。
- `RenderVar` 的 `sourceName` 绑定 renderer output。Camera outputs 可以是 `LdrColor`、`HdrColor`、`NormalSD`、`DepthSD`、`SemanticSegmentation` 等单 tensor outputs；lidar/radar 的 `PointCloud` 是 multi-tensor output，channels 由 `RenderVar.channels` 选择。
- Output container 是 self-describing named structure：render var output 有 `name`、`type`、`doc`、`version`、`status`、GPU sync hints、named tensors 和 CPU params。Bulk data 使用 DLPack，所以 NumPy、PyTorch、Warp、JAX、CuPy 或 CUDA code 可以零拷贝消费。
- Lidar 和 radar 的 variable-sized point-cloud tensors 要用 `Counts` 限定有效条目，用 `Flags[i] & 0x40` 判断 valid bit。`Counts` 与 `Flags` 会被 sensor model auto-enable；其他 payload channels 只有被请求时才出现。
- Camera render modes 是 per-RenderProduct trade-off：`Real-Time Path-Tracing` 作为默认高保真路径，`PathTracing` 用于 progressive/reference-quality rendering，`Minimal` 用于高 throughput 的 RL、segmentation masks 或 debugging workflows。
- ovrtx 支持三类 USD composition pattern：open file/URL/inline USDA as root layer，用 inline root layer sublayer existing scene 并添加 sensors/RenderProducts/labels，或在已打开 root stage 下添加 removable referenced content。
- Stage query、attribute read/write、attribute bindings 和 attribute mapping 让应用以 DLPack tensor 方式读写 runtime stage；hot path 可以通过 persistent bindings 或 mapping 避免重复构造 descriptors。
- Async model 是 stream-ordered。Python 提供 blocking convenience methods 和 `*_async`；C enqueue functions 返回 operation ids，必须 wait/fetch/release。GPU mappings 带 synchronization hints，C mappings/results 需要显式 unmap/destroy。
- 0.3.0 changelog 增加了 lidar/radar sensor support、multi-tensor RenderVar outputs、stage queries、stage attribute reads、expanded attribute write/mapping APIs、viewport picking/selection outlines、schema path registration 和一组 agent skills/docs。

## 关键引文

- "pre-release software"
- "step takes RenderProduct paths"
- "RenderProduct" / "RenderVar"
- "Counts and Flags are auto-enabled"
- "First-call wins."

## 关联

- [[Ovrtx]] - SDK entity，记录 version、scope、license 和 API surface。
- [[RTXSensorSimulationPipeline]] - 从本 repo 提炼出的 mechanism-level concept page。
- [[OpenUSDSceneComposition]] - ovrtx 用 inline sublayers、references、relationships 和 runtime stage 说明 OpenUSD composition 如何进入 sensor simulation。
- [[RoboticsSimulationInfrastructure]] - ovrtx 把 renderer lifecycle、sensor outputs、GPU memory/mapping、async status 与 examples 变成 simulation infrastructure 的 official implementation case。
- [[OpenUSD]] - ovrtx 的 scene/sensor/RenderProduct configuration 建立在 USD schemas、prim paths、relationships 和 composition 上。
- [[SimulationRealityGap]] - source 支持 sensor simulation pipeline，但没有证明 sensor outputs 与真实 hardware distribution 自动一致。

## 开放问题

- ovrtx 与 Isaac Sim、Isaac Lab、Omniverse Kit、ovPhysX 的边界需要更多 official architecture docs：这个 repo 说明了 SDK contract，但没有完整解释底层 Omniverse RTX runtime composition。
- README 提到 scalable performance 和 physically accurate sensor simulation，但缺少独立 benchmark 或 sensor-model validation source；性能与 sim-to-real accuracy 应通过后续 source 单独 ingest。
- Lidar/radar material behavior、non-visual material database 和 semantic labels 的真实硬件校准逻辑还需要更低层 source 支持。
- 0.3.0 是 pre-release；API、limitations 和 packaging behavior 值得在后续 release 后 re-ingest。
