---
title: "可微物理"
type: concept
tags: [robotics, simulation, differentiable-optimization]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]", "[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons]]"]
last_updated: 2026-07-13
---

# 可微物理

可微物理通过仿真暴露梯度，使优化、系统辨识和学习系统能使用动力学 derivatives。在 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 中，可微仿真不是主要实验目标，但论文把它标记为接触产物的高风险 area。

问题很直接：如果正向仿真引入内部力、人为柔顺性，或物理上 shifted 接触 solutions，那么计算出的梯度可能 encode 这些产物。这对轨迹优化和物理系统辨识很关键，因为梯度是驱动更新的信号。

[[DifferentiableCollisionDetection]] 补充了另一层：在完整可微仿真器之前，可以先把碰撞查询写成可微函数。[[DCOL]] 用最小均匀规模扩展因素 $\alpha$ 表示凸基元的分离 / 穿透，[[DiffPills]] 用邻近度价值 $\phi$ 处理胶囊体和带填充的多边形。这些来源支持把碰撞 avoidance 写成可微约束，但它们不自动解决摩擦接触时间步进、求解器残差和互补 switches。

可以把一个时间步写成：

```text
contact state z_t = (x_t, u_t, geometry, velocities)
lambda_hat_t = S_m(z_t; theta)
x_hat_{t+1} = F(x_t, u_t, lambda_hat_t)
L = ell(x_hat_{0:T})
```

这里 `S_m` 是仿真器选择的接触模型与 [[ContactSolvers|求解器]]，`lambda_hat_t` 是它返回的法向/切向力或冲量。反向传播时，损失梯度会经过：

```text
dL/dtheta = dL/dx_hat_{t+1}
            * (dF/dlambda_hat_t)
            * (dS_m/dtheta)
            + other state/control paths
```

因此污染不是只发生在正向状态错误上。只要 `S_m` 为了速度、条件化或 regularity 引入人为柔顺性、松弛的互补、方向-biased 摩擦或求解器残差，`dS_m/dtheta` 就会把这些数值选择当成真实物理的敏感性。优化器随后可能学习到“利用仿真器产物”的方向，而不是真实刚性接触系统中存在的方向。

接触还会放大这个问题，因为 [[ContactComplementarity|互补]] 包含有效设置 switches：separate/接触、stick/滑移、冲击/滑动。松弛可以让这些转移更平滑，也更容易微分；但如果平滑性来自 shifted 接触 solution，那么梯度的方向、大小甚至 sign 都可能对应松弛的模型，而不是参考基准接触定律。

开放线索：评估可微仿真器时，不应只看平滑性、速度或任务层级损失，还应该看接触残差与力产物。

相关页面：[[DifferentiableCollisionDetection]]、[[CollisionGeometryForRobotSimulation]]、[[ContactModelsInRobotics]]、[[ContactComplementarity]]、[[ContactSolvers]]、[[MuJoCo]]。
