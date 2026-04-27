---
title: "Differentiable Physics（可微物理）"
type: concept
tags: [robotics, simulation, differentiable-optimization]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]"]
last_updated: 2026-04-27
---

# Differentiable Physics（可微物理）

Differentiable physics 通过 simulation 暴露 gradients，使 optimization、system identification 和 learning systems 能使用 dynamics derivatives。在 [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics: a Comparative Analysis]] 中，differentiable simulation 不是主要实验目标，但论文把它标记为 contact artifacts 的 high-risk area。

问题很直接：如果 forward simulation 引入 internal forces、artificial compliance，或 physically shifted contact solutions，那么计算出的 gradients 可能 encode 这些 artifacts。这对 trajectory optimization 和 physical system identification 很关键，因为 gradient 是驱动 update 的信号。

可以把一个 time step 写成：

```text
contact state z_t = (x_t, u_t, geometry, velocities)
lambda_hat_t = S_m(z_t; theta)
x_hat_{t+1} = F(x_t, u_t, lambda_hat_t)
L = ell(x_hat_{0:T})
```

这里 `S_m` 是 simulator 选择的 contact model 与 [[ContactSolvers|solver]]，`lambda_hat_t` 是它返回的 normal/tangential forces 或 impulses。反向传播时，loss gradient 会经过：

```text
dL/dtheta = dL/dx_hat_{t+1}
            * (dF/dlambda_hat_t)
            * (dS_m/dtheta)
            + other state/control paths
```

因此污染不是只发生在 forward state error 上。只要 `S_m` 为了 speed、conditioning 或 regularity 引入 artificial compliance、relaxed complementarity、direction-biased friction 或 solver residual，`dS_m/dtheta` 就会把这些 numerical choices 当成真实 physics 的 sensitivity。优化器随后可能学习到“利用 simulator artifact”的方向，而不是 real rigid-contact system 中存在的方向。

contact 还会放大这个问题，因为 [[ContactComplementarity|complementarity]] 包含 active-set switches：separate/contact、stick/slip、impact/sliding。Relaxation 可以让这些 transitions 更 smooth，也更容易微分；但如果 smoothness 来自 shifted contact solution，那么 gradient 的方向、大小甚至 sign 都可能对应 relaxed model，而不是 reference contact law。

开放线索：评估 differentiable simulators 时，不应只看 smoothness、speed 或 task-level loss，还应该看 contact residuals 与 force artifacts。

相关页面：[[ContactModelsInRobotics]]、[[ContactComplementarity]]、[[ContactSolvers]]、[[MuJoCo]]。
