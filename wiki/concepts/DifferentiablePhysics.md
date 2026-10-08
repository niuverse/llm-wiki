---
title: "Differentiable Physics"
type: concept
tags: [robotics, simulation, differentiable-optimization]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]", "[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons]]"]
modified: 2026-10-04
topics: ["topics/physics-simulation", "topics/contact-modeling"]
---

# Differentiable Physics

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

将接触求解合入一步映射 $\Psi$，写成 $x_{t+1}=\Psi(x_t,u_t;\theta)$。若动作序列固定，完整状态敏感性 $D_t=dx_t/d\theta$ 满足：

$$
D_{t+1}=\frac{\partial\Psi}{\partial x_t}D_t+\frac{\partial\Psi}{\partial\theta}.
$$

若动作也随参数或反馈状态改变，还需加入 $\frac{\partial\Psi}{\partial u_t}\frac{du_t}{d\theta}$。这些是链式法则的教学展开，不是特定引擎的梯度实现；具体采用隐式微分、展开迭代还是平滑近似，需要各自的实现来源。

## 直觉

优化器会沿“让损失下降”的方向更新参数。如果求解映射 $S$ 使用接触松弛、人工柔顺性或方向有偏的摩擦，那么导数也包含这些选择。优化器可能降低仿真损失，却依赖真实系统没有的行为。比较论文为这个风险提供模型与残差层面的依据，是否发生在具体任务仍需验证。[[ContactComplementarity|Contact Complementarity]]、[[ContactSolvers|Contact Solvers]]

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

### 梯度经过的是“有限次算法”还是“收敛后的解”

作为数学教学区分，若求解器迭代为 $y^{k+1}=T(y^k,\theta)$，逐步对实际执行的 $K$ 次迭代求导，得到的是 $y^K$ 对参数的导数，可能依赖初始化与 $K$。若假设已经收敛到满足 $g(y^\star,\theta)=0$ 的解，再隐式求导，目标则是这个方程解的敏感性。二者对应不同映射，有限预算时不必相同。

例如标量迭代 $y^{k+1}=\rho y^k+\theta$、$y^0=0$、$|\rho|<1$，执行 $K$ 次后的导数是 $(1-\rho^K)/(1-\rho)$，收敛解的导数是 $1/(1-\rho)$。当收敛慢时差异更明显。这个例子是基础几何级数推导，不是已收录论文对所有可微引擎的实验比较；两篇碰撞论文采用的隐式求导机制见 [[DifferentiableCollisionDetection|Differentiable Collision Detection]]，接触求解预算问题见 [[ContactSolvers|Contact Solvers]]。

## 碰撞查询与完整动力学的区别

[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|DCOL]] 用最小均匀缩放因子 $\alpha$ 描述凸基元间的接触关系；[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons|DiffPills]] 用邻近值 $\phi$ 处理胶囊体与带填充多边形。它们支持 [[DifferentiableCollisionDetection|可微碰撞约束]]，不等于已经求解摩擦接触、冲击、状态积分和接触切换的全部导数。

## 可微性的条件

优化定义的碰撞或接触查询，常对最优性条件 $g(y^\star,\theta)=0$ 求导，得到 $dy^\star/d\theta=-(\partial_y g)^{-1}\partial_\theta g$。这要求对应线性化系统可解；非唯一解、退化接触或状态切换需要额外处理。最优碰撞指标可求导也不保证某个接触点选择处处可微，详见 [[DifferentiableCollisionDetection|碰撞指标与最优解的区别]]。

[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives|DCOL]] 确实将碰撞约束放入互补时间步进并展示凸体相撞，因此不能说它完全没有动力学集成。但该演示没有覆盖复杂机器人全部摩擦模式与参数敏感性；[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons|DiffPills]] 的主要应用证据则是避碰轨迹优化。

## 失效情形

- 接触力、内部力或松弛解偏离参考规律，梯度随之描述近似模型。[[contact-models-in-robotics-a-comparative-analysis|接触模型比较论文]]
- 只验证碰撞查询导数，就把结论扩展到完整动力学；DCOL 与 DiffPills 的问题范围不支持这种扩展。[[DifferentiableCollisionDetection|Differentiable Collision Detection]]

## 实践含义

对系统辨识和轨迹优化，建议同时核对正向残差、局部梯度与闭环任务。这是研究检查建议：有限差分只能检查导数是否符合当前实现，不能单独证明模型物理正确；更换步长、松弛和迭代预算后重复验证，才能观察更新是否依赖数值选择。进一步看 [[SimulationRealityGap|Sim-to-Real Gap]]。

## 研究归属

[[topics/physics-simulation|物理仿真]] · [[topics/contact-modeling|接触建模]]。
