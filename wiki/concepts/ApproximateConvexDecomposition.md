---
title: "Approximate Convex Decomposition"
type: concept
tags: [collision-detection, convex-decomposition, simulation-assets, robotics]
sources: ["[[v-hacd-repository]]", "[[coacd-approximate-convex-decomposition]]", "[[coacd-repository]]", "[[convex-primitive-decomposition-for-collision-detection]]", "[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]", "[[mujoco-computation-collision-detection]]", "[[isaac-sim-core-api-collision-approximation]]"]
modified: 2026-10-04
topics: ["topics/physics-simulation", "topics/collision-geometry"]
---

# Approximate Convex Decomposition

近似凸分解（Approximate Convex Decomposition，ACD）将非凸形状拆成一组近似凸的部件，再以各部件凸包作为碰撞体。它试图在保留任务相关空隙与降低几何处理成本之间取得平衡；**凸包数量、近似误差和实际仿真成本是不同的量**。[[coacd-approximate-convex-decomposition|CoACD]]、[[convex-primitive-decomposition-for-collision-detection|凸基元分解]]

## 目标与误差

给定实体形状 $S$，寻找部件 $S_1,\ldots,S_K$，使 $S=\bigcup_iS_i$，最终用 $\widehat S=\bigcup_i\operatorname{CH}(S_i)$ 近似它。$\operatorname{CH}$ 为凸包，$K$ 为部件数。一类典型目标为：

$$
\min K,\qquad C(S_i)\le\epsilon\quad\text{对所有 }i.
$$

$C$ 衡量部件与其凸包的差异，$\epsilon$ 是允许误差。这个形式概括了 [[coacd-approximate-convex-decomposition|CoACD 第 3 节]]；具体算法未必保证找到全局最少部件，也有算法直接给定目标数量。精确凸分解追求最少部件时是困难的组合优化问题，近似分解用误差预算换取可用规模。

**误差指标决定哪些空间被保留。** 只看体积差，可能认为封住细槽的代价很小；只看外表面距离，又可能忽视空腔被填实。CoACD 结合边界与内部的 Hausdorff 距离，实际用体积差的立方根近似内部项；其阈值具有长度尺度含义，但有限采样、经验系数和预处理使它不能直接当作任务空间的严格安全间隙证明。公式和保证条件见 [[coacd-approximate-convex-decomposition|CoACD 的指标与近似]]。

### 用集合距离理解“平均很准但孔被封住”

令 $A,B$ 为两组几何点，双向 Hausdorff 距离为：

$$
H(A,B)=\max\left\{\sup_{a\in A}\inf_{b\in B}\|a-b\|_2,\ \sup_{b\in B}\inf_{a\in A}\|a-b\|_2\right\}.
$$

先为每个点找另一个集合中的最近点，再挑最差的那个，因而关注最大偏差，而非平均偏差。取边界集合会衡量表面偏差，取实体内部点会衡量凸包新增空间离原实体有多远。两者对象不同：空心壳的内表面可能很靠近凸包外表面，但凸包中心仍离壳很远；内部项因此补足只看边界的缺口。定义与空壳机制见 [[coacd-approximate-convex-decomposition|CoACD 第 4 节]]。

有限样本把上式上确界替换成样本最大值，遗漏的狭槽不会自动进入评价。因此“采用最坏点指标”和“已找到连续形状上的真正最坏点”不是同一件事。跨方法比较还须分清：[[v-hacd-repository|V-HACD 固定版本]] 的局部百分比体积误差无量纲，[[coacd-repository|CoACD 默认接口]] 的阈值在归一化坐标中具有长度尺度；相同数字不表示相同质量预算。

## 三种构造路线

| 路线 | 核心操作 | 主要条件与取舍 |
| --- | --- | --- |
| 碰撞感知平面切割 | 将实体网格切开，以多步搜索选择切面 | CoACD 需要实体流形输入或预处理；前瞻可减少短视切割，仍有搜索预算与方向限制 |
| 可见性平面切割 | 用被截断的外部可见性边总长度快速评价平面，GPU 并行筛选 | VisACD 不必为每个候选真的切网格；评分依赖顶点密度，贪心算法仍可能次优 |
| 参数基元合并 | 从面开始，按方向与新增包覆体积向上合并为盒体、胶囊体等 | 凸基元分解可处理开放表面，输出允许重叠；拟合质量与引擎原生支持共同决定成本 |

依据分别为 [[coacd-approximate-convex-decomposition|CoACD]]、[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition|VisACD]]、[[convex-primitive-decomposition-for-collision-detection|凸基元分解]]。最后一种是相关的碰撞体近似路线，不宜把“覆盖网格表面”和“内部不交的实体分割”当作相同保证。传统 [[v-hacd-repository|V-HACD]] 的体素分解作为历史参照，具体版本和参数应单独记录。

```mermaid
flowchart LR
  A[原始网格与任务关键空隙] --> B[输入修复与尺度约定]
  B --> C[误差指标与预算]
  C --> D[切分或基元合并]
  D --> E[凸包或参数基元集合]
  E --> F[目标引擎的接触与任务验证]
  F --> G[质量、数量与耗时共同评估]
```

图中预处理属于结果的一部分：孔洞若在重网格化时消失，后续分解无法恢复原始功能。平面切割可以保持切分块内部不交，但合并后重新取凸包可能破坏这一性质。[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition|VisACD]] 因此在其比较中关闭 CoACD 合并，不能将它的基线结果与默认启用合并的 CoACD 数字直接对照。

## 为什么不能只数凸包

一个凸包可能含很多面和顶点，参数基元只有少量尺寸与位姿参数。碰撞检测还会先排除大量不可能相撞的配对；因此总成本既取决于组件数，也取决于实际候选数、窄阶段算法、生成的接触点及后续求解。[[convex-primitive-decomposition-for-collision-detection|凸基元分解]] 的实验支持“更多廉价基元可能比更少复杂凸包快”，但仅限其 Rapier 落球协议，不能作为所有引擎的成本定律。

[[coacd-approximate-convex-decomposition|CoACD 抽屉实验]] 支持另一条链：保留把手孔 → 更容易形成稳定抓握 → 更多抽屉能训练出成功策略。论文报告的 49% 与 80% 是多次训练尝试后的成功抽屉比例，不是常规单次执行成功率。几何误差、存储量和耗时都不能替代任务验收。

## 失败情形与实践解释

- **关键空隙被封住。** 低平均几何误差仍可能改变抓取或插入可行性；应单独检查把手、孔和槽。[[coacd-approximate-convex-decomposition|CoACD]]
- **预处理、拓扑与方向影响结果。** 水密化、顶点采样、内部面和退化法向都可能改变分解。[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition|VisACD]]、[[convex-primitive-decomposition-for-collision-detection|凸基元分解]]
- **预算与引擎不匹配。** 阈值很小可保留更多细节，却可能生成更多几何或接触查询；某种基元若必须转成凸包，其专用加速收益也可能消失。[[coacd-approximate-convex-decomposition|CoACD 参数消融]]、[[convex-primitive-decomposition-for-collision-detection|基元成本消融]]

**我们的综合建议。** 保存原始网格、修复后网格、参数、输出碰撞体与目标引擎版本；按任务空隙、几何偏差、接触行为、总耗时分开验收。混用基元与凸包是可测试的工程选择，现有来源尚未证明统一混合方案最优。当前实现接口见 [[coacd-repository|CoACD 仓库来源]]；完整上下游见 [[CollisionGeometryForRobotSimulation|碰撞几何]]、[[ContactSolvers|Contact Solvers]]。

## 研究归属

[[topics/physics-simulation|物理仿真]] · [[topics/collision-geometry|Collision Geometry]]。
