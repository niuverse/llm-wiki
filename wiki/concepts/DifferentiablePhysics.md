---
title: "可微物理"
type: concept
tags: [robotics, simulation, differentiable-optimization]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]", "[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons]]"]
modified: 2026-09-30
study_topic: syntheses/simulation-and-assets-learning-path
---

# 可微物理

可微物理让优化器使用仿真对状态、控制或参数的导数。关键问题是：**梯度描述所实现模型的敏感性，不自动描述真实系统的敏感性**。[[contact-models-in-robotics-a-comparative-analysis|接触模型比较论文]] 将数值接触产物视为可微仿真的潜在风险，但没有提供所有可微方法的统一实验排名。

## 数学结构

用一个教学计算图说明梯度来自哪里。$x_t$ 为系统状态，$u_t$ 为控制，$\theta$ 为待辨识参数，$S$ 为接触求解映射，$p_t$ 为接触冲量，$F$ 为状态推进函数：

$$
p_t=S(x_t,u_t;\theta),\qquad x_{t+1}=F(x_t,u_t,p_t;\theta),\qquad L=\sum_{t=0}^{T}\ell_t(x_t,u_t).
$$

$L$ 是总损失，$\ell_t$ 是每步损失。在相关映射可微且暂时固定 $x_t,u_t$ 的局部计算中：

$$
\frac{\partial x_{t+1}}{\partial\theta}
=\frac{\partial F}{\partial\theta}
+\frac{\partial F}{\partial p_t}\frac{\partial S}{\partial\theta}.
$$

完整轨迹梯度还必须经过历史状态和控制的依赖，不能只保留上式第二项。这个公式是链式法则的教学展开；具体引擎的隐式微分、展开迭代或梯度近似需要各自的实现来源。

## 直觉

优化器会沿“让损失下降”的方向更新参数。如果求解映射 $S$ 使用接触松弛、人工柔顺性或方向有偏的摩擦，那么导数也包含这些选择。优化器可能降低仿真损失，却依赖真实系统没有的行为。比较论文为这个风险提供模型与残差层面的依据，是否发生在具体任务仍需验证。[[ContactComplementarity|接触互补]]、[[ContactSolvers|接触求解器]]

```mermaid
flowchart LR
  A[状态、控制、参数] --> B[碰撞与接触求解]
  B --> C[状态推进]
  C --> D[任务损失]
  D -.梯度反传.-> C
  C -.模型导数.-> B
  B -.参数更新信号.-> A
```

接触还包含分离／接触、黏着／滑动等状态切换。切换附近可能不光滑；放松约束可以改善数值可微性，同时改变正向模型。平滑性和物理一致性应分开核对。

## 碰撞查询与完整动力学的区别

[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|DCOL]] 用最小均匀缩放因子 $\alpha$ 描述凸基元间的接触关系；[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons|DiffPills]] 用邻近值 $\phi$ 处理胶囊体与带填充多边形。它们支持 [[DifferentiableCollisionDetection|可微碰撞约束]]，不等于已经求解摩擦接触、冲击、状态积分和接触切换的全部导数。

## 失效情形

- 接触力、内部力或松弛解偏离参考规律，梯度随之描述近似模型。[[contact-models-in-robotics-a-comparative-analysis|接触模型比较论文]]
- 只验证碰撞查询导数，就把结论扩展到完整动力学；DCOL 与 DiffPills 的问题范围不支持这种扩展。[[DifferentiableCollisionDetection|可微碰撞检测]]

## 实践含义

对系统辨识和轨迹优化，建议同时核对正向残差、局部梯度与闭环任务。这是研究检查建议：有限差分只能检查导数是否符合当前实现，不能单独证明模型物理正确；更换步长、松弛和迭代预算后重复验证，才能观察更新是否依赖数值选择。进一步看 [[SimulationRealityGap|仿真—现实差距]]。
