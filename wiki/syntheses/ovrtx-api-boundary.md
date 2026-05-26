---
title: "ovrtx API Boundary"
type: synthesis
tags: [distill, ovrtx, openusd, sensor-simulation, randomization]
sources: ["[[nvidia-ovrtx]]"]
last_updated: 2026-05-26
---

# ovrtx API Boundary

## 讨论背景

这次讨论要回答两个使用边界问题：第一，[[Ovrtx|ovrtx]] 是否提供 API 去“拼接一个 USD 场景”，尤其是添加 rigid body、articulation、deformable 等 physics objects；第二，它是否提供 light / camera randomization 这类 domain randomization 功能。结论需要保存在 wiki 中，因为这会影响后续把 ovrtx 放在 Isaac Sim / Isaac Lab / ovPhysX / custom USD authoring pipeline 中的位置。

## 提炼结果

| Insight | Evidence Level | Wiki Target |
| --- | --- | --- |
| ovrtx 支持 runtime stage composition：open root USD、inline USDA sublayers、add/remove references、clone loaded subtrees、query prims、read/write/map attributes。 | source-backed | [[nvidia-ovrtx]], [[RTXSensorSimulationPipeline]], [[Ovrtx]] |
| ovrtx source 中没有显示 high-level `create_rigid_body` / `create_articulation` / `create_deformable` 这类 physics object authoring API；更稳妥的定位是 sensor/rendering SDK，而不是 full physics scene builder。 | source-backed with absence-boundary note | [[Ovrtx]], [[RTXSensorSimulationPipeline]] |
| 刚体、articulation、deformable 等 physics-rich content 应优先由 Isaac Sim / Isaac Lab / ovPhysX / OpenUSD authoring tools / offline USDA fragments 创建，再由 ovrtx reference / sublayer / clone / transform 进入 runtime stage。 | conversation-derived usage guidance | [[Ovrtx]] |
| ovrtx 没有发现内置 domain randomization module；但它提供 attribute writes / mappings，因此可以由上层应用随机化 camera pose、focal length、exposure、lights、materials、RenderProduct settings、instance transforms。 | source-backed API surface + conversation-derived guidance | [[RTXSensorSimulationPipeline]] |
| 对 RL 或 synthetic data workflow，randomization policy 的 ownership 应在 env wrapper / dataset generator / Isaac Lab task layer，而 ovrtx 负责执行已 author 的 stage changes 并产出 sensor tensors。 | conversation-derived architecture guidance | [[ovrtx-api-boundary]] |

## Evidence Boundaries

`source-backed` 的部分来自 [[nvidia-ovrtx]] 中已 ingest 的 README、docs、headers、tests 和 examples：它们明确展示了 `open_usd*`、inline composition、`add_usd_reference*`、`clone_usd`、stage query、attribute read/write/mapping、RenderProduct/RenderVar、camera/lidar/radar outputs 和 render settings。关于“不提供 full physics object authoring API”的判断来自当前 source snapshot 中没有发现 rigid body / articulation / deformable creation helpers；这是 source-surface boundary，不等同于证明底层 Omniverse RTX 不能消费这些 USD schemas。

`conversation-derived` 的部分是工程使用建议：如果要创建 physics-rich scene，应让更合适的 authoring layer 负责 physics schemas / runtime semantics，再把结果交给 ovrtx 做 RTX sensor simulation。这个建议符合现有 API shape，但需要后续 official architecture docs 或 examples 补强。

## 写入位置

- [[Ovrtx]]：增加 API boundary 段落，明确 ovrtx 是 sensor/rendering SDK，不是 high-level physics scene builder。
- [[RTXSensorSimulationPipeline]]：增加 scene composition / randomization ownership 的实践说明和 failure mode。
- `wiki/index.md`：增加 synthesis entry，方便以后回答 ovrtx 边界问题。

## Follow-up Sources

- ovrtx 与 ovPhysX / Isaac Sim / Isaac Lab 共进程或 pipeline integration 的 official architecture docs。
- OpenUSD / Omniverse physics schema authoring docs，尤其是 rigid body、articulation、deformable 的 canonical authoring layer。
- Isaac Lab domain randomization / environment randomization docs，用于确认 randomization policy 应放在哪个 layer。
- ovrtx 后续 release notes，确认是否新增 physics authoring 或 randomization convenience APIs。
