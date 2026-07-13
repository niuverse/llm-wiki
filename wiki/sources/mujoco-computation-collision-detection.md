---
title: "MuJoCo Computation: Collision Detection"
type: source
tags: [robotics, simulation, collision-detection, mujoco, contact-dynamics]
sources: []
last_updated: 2026-07-13
source_file: raw/mujoco-computation-collision-detection.html
source_kind: html
source_url: https://mujoco.readthedocs.io/en/stable/computation/index.html#collision-detection
extracted_text: graph/extracts/mujoco-computation-collision-detection.md
source_date: unknown
---

## 摘要

MuJoCo computation 文档的碰撞检测章节说明了 [[MuJoCo]] 如何把 rigidly attached geoms 转换成活跃接触：先筛选候选 geom pairs，再运行 narrowphase 碰撞函数，最后把接触写入 `mjData.contact`，供约束雅可比矩阵结构和接触力 computation 使用。这个来源是研究 [[CollisionGeometryForRobotSimulation|机器人仿真的碰撞几何]] 的基础，因为它明确区分视觉网格与碰撞 geom，并说明 MuJoCo 碰撞默认受凸几何假设约束。

来源网址: https://mujoco.readthedocs.io/en/stable/computation/index.html#collision-detection

## 核心主张

- MuJoCo 的碰撞检测作用在 geoms 上，输出活跃接触；这些接触后续参与约束雅可比矩阵与约束力 computation，因此碰撞体选择会直接影响 [[ContactSolvers|接触求解器]] 输入。
- 候选配对选择包含宽相扫描与剪枝、静态机体中间阶段 BVH / AABB 树，以及按碰撞函数、包围球体、相同/父级机体排除、`contype` / `conaffinity` 做过滤。
- MuJoCo 支持平面、球体、胶囊体、圆柱体、ellipsoid、盒体、网格和 height-字段等 geom 类型；其中基元是凸的，非凸用户网格在碰撞中会用凸包替代。
- 除 SDF 插件例外，MuJoCo 碰撞检测受凸 geoms 限制。要表达非凸物体，应把对象分解成同一机体上的一组凸 geoms，而不是把三角形 soup 直接交给运行时。
- 一般性凸碰撞默认使用原生 GJK/EPA 流程；旧版 libccd / MPR 仍存在，但文档说明原生实现更快、更 robust。
- 标准 GJK/EPA/MPR 通常只返回单一接触点；这对盒体堆叠等表面接触可能不足。MuJoCo 提供 `multiccd` 作为多接触点的 option，但也带来额外代价和不同接触行为。
- 文档明确提到 [[CoACD]] 可用于自动凸分解；预处理成凸 geoms 通常比运行时三角形 soup 更快、更稳定。

## 关键引文

- "convex geoms"
- "faster and more stable simulation"

## 关联

- [[CollisionGeometryForRobotSimulation]] - 碰撞体表示如何进入接触流程。
- [[ApproximateConvexDecomposition]] - 非凸资产如何被拆成凸组件。
- [[ContactModelsInRobotics]] 与 [[ContactSolvers]] - 碰撞接触之后的接触定律 / 求解器层。
- [[MuJoCo]] - 仿真器实体页面。

## 开放问题

- MuJoCo 当前 SDF 插件在机器人学 RL / MPC 工作流中的实际性能、稳定性和制作成本如何？
- `multiccd` 在操作、堆叠、移动中何时值得打开，何时会改变基准 comparability？
- MJCF geom 制作与 USD/MJCF 资产转换中的碰撞体 ownership 边界仍需要结合 XML 参考和 converter 文档继续收录。
