---
title: "MuJoCo Computation: Collision Detection"
type: source
tags: [robotics, simulation, collision-detection, mujoco, contact-dynamics]
sources: []
last_updated: 2026-06-04
source_file: raw/mujoco-computation-collision-detection.html
source_kind: html
source_url: https://mujoco.readthedocs.io/en/stable/computation/index.html#collision-detection
extracted_text: graph/extracts/mujoco-computation-collision-detection.md
source_date: unknown
---

## 摘要

MuJoCo computation documentation 的 collision detection section 说明了 [[MuJoCo]] 如何把 rigidly attached geoms 转换成 active contacts：先筛选 candidate geom pairs，再运行 narrowphase collision functions，最后把 contacts 写入 `mjData.contact`，供 constraint Jacobian construction 和 contact force computation 使用。这个 source 是研究 [[CollisionGeometryForRobotSimulation|robot simulation collision geometry]] 的基础，因为它明确区分 visual mesh 与 collision geom，并说明 MuJoCo collision 默认受 convex geometry 假设约束。

Source URL: https://mujoco.readthedocs.io/en/stable/computation/index.html#collision-detection

## 核心主张

- MuJoCo 的 collision detection 作用在 geoms 上，输出 active contacts；这些 contacts 后续参与 constraint Jacobian 与 constraint force computation，因此 collider choice 会直接影响 [[ContactSolvers|contact solver]] 输入。
- Candidate pair selection 包含 broadphase sweep-and-prune、static body midphase BVH / AABB tree，以及按 collision function、bounding sphere、same/parent body exclusion、`contype` / `conaffinity` 做 filtering。
- MuJoCo 支持 plane、sphere、capsule、cylinder、ellipsoid、box、mesh 和 height-field 等 geom types；其中 primitives 是凸的，non-convex user meshes 在 collision 中会用 convex hull 替代。
- 除 SDF plugin 例外，MuJoCo collision detection 受 convex geoms 限制。要表达 non-convex object，应把对象分解成同一 body 上的一组 convex geoms，而不是把 triangle soup 直接交给 runtime。
- General convex collision 默认使用 native GJK/EPA pipeline；legacy libccd / MPR 仍存在，但文档说明 native implementation 更快、更 robust。
- 标准 GJK/EPA/MPR 通常只返回 single contact point；这对 box stacking 等 surface contact 可能不足。MuJoCo 提供 `multiccd` 作为多 contact points 的 option，但也带来额外代价和不同接触行为。
- 文档明确提到 [[CoACD]] 可用于自动 convex decomposition；预处理成 convex geoms 通常比 runtime triangle soup 更快、更稳定。

## 关键引文

- "convex geoms"
- "faster and more stable simulation"

## 关联

- [[CollisionGeometryForRobotSimulation]] - collider representation 如何进入 contact pipeline。
- [[ApproximateConvexDecomposition]] - non-convex assets 如何被拆成 convex components。
- [[ContactModelsInRobotics]] 与 [[ContactSolvers]] - collision contacts 之后的 contact law / solver layer。
- [[MuJoCo]] - simulator entity page。

## 开放问题

- MuJoCo 当前 SDF plugin 在 robotics RL / MPC workflow 中的实际性能、稳定性和 authoring cost 如何？
- `multiccd` 在 manipulation、stacking、locomotion 中何时值得打开，何时会改变 benchmark comparability？
- MJCF geom authoring 与 USD/MJCF asset conversion 中的 collider ownership boundary 仍需要结合 XML Reference 和 converter docs 继续 ingest。
