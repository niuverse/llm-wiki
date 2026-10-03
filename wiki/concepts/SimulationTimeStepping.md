---
title: "仿真步长、积分器与控制频率"
type: concept
tags: [robotics, simulation, sim-to-real]
sources: ["[[mujoco-computation-collision-detection]]", "[[peng-dynamics-randomization]]", "[[isaac-sim-policy-deployment]]"]
modified: 2026-10-02
topics: ["topics/evaluation-and-transfer", "topics/simulation-transfer"]
---

# 仿真步长、积分器与控制频率

物理求解、策略推理和图像生成可以有不同周期。改变物理步长会改变离散动力学；改变动作保持时间会改变闭环控制；降低显示帧率则未必改变这两者。它们需要分别记录。

## 数学结构

设物理步长为 $h$，每 $N$ 个物理步查询一次策略，控制周期为 $\Delta t_c$。固定周期下：

$$
\Delta t_c=Nh,\qquad f_{\mathrm{physics}}=1/h,\qquad f_{\mathrm{policy}}=1/(Nh).
$$

这是对 [[isaac-sim-policy-deployment|策略降频契约]] 的教学表达；两个频率相等只在 $N=1$ 时成立。[[peng-dynamics-randomization|Peng 的实验]] 使用 $h=0.002$ s，默认 $N=20$，即物理 500 Hz、策略 25 Hz，并进一步随机动作时长。

### 积分器改变离散状态转移

设 $v_t$ 为广义速度，$a_t$ 为由动力学计算的加速度。对普通标量关节，半隐式 Euler 先推进速度，再用新速度推进位置：

$$
v_{t+h}=v_t+ha_t,\qquad q_{t+h}=q_t+hv_{t+h}.
$$

四元数位姿需要几何积分，不能直接使用上述数组加法。MuJoCo 的速度隐式方法对速度相关力做局部线性化，写成：

$$
v_{t+h}=v_t+h(M-hD)^{-1}Ma_t.
$$

$M$ 是质量矩阵，$D$ 是相应力对速度的导数；不同积分器保留的导数不同。3.8 文档中 `implicit` 不包含约束力导数，`implicitfast` 还省略科里奥利与离心力相关导数，并将 $D$ 对称化。因此“隐式”不是把未来所有力精确求出来。[[mujoco-computation-collision-detection|数值积分章节]]

### 为什么小步长有时更稳定

教学例子：质量 $m>0$ 的物体只有黏性阻尼 $b>0$，满足 $m\dot v=-bv$。显式 Euler 给出 $v_{t+h}=(1-hb/m)v_t$，收敛条件是 $|1-hb/m|<1$；速度隐式更新给出 $v_{t+h}=v_t/(1+hb/m)$。这个简单计算解释了大阻尼与步长的耦合，不能当成多接触机器人完整稳定性条件。

## 直觉

策略每次看完观测后，动作通常会保持若干物理步。即使机械模型相同，让动作保持两倍时间也会改变策略能修正误差的速度。MuJoCo 官方建议根据系统选择积分器：速度相关力可能更适合隐式处理，接近能量守恒的系统可能更适合 RK4；不存在统一最优步长。

## 失效情形

- **步长过大**：官方文档指出会导致不稳定；过小则浪费计算，合适范围依赖模型。
- **重复降频**：Isaac Sim 6.1 的 `RobotPolicyRunner` 已负责降频，调用方再计数会改变策略实际周期。
- **传感器时间误读**：MuJoCo `mj_step` 最后更新状态，部分派生量仍指向之前的位置；读取雅可比或观测时要确认计算阶段。渲染同步另见 [[RTXSensorSimulationPipeline|RTX 输出契约]]。
- **动作时长迁移失败**：Peng 的固定动作时长消融明显降低真实成功率，说明该任务的控制延迟不能只靠质量和摩擦随机化替代。

## 实践含义

复现实验时分别记录物理步长、积分器、求解器迭代、策略周期、传感器采样与输出时间。比较两种设置的建议是：先固定动作时序与初态，再缩小物理步长检查结果是否趋于稳定；这是机制导出的诊断方法，不是已验证的统一评测规程。继续读 [[PolicyDeploymentContract|部署契约]] 与 [[SimulationRealityGap|现实差距]]。

## 研究归属

[[topics/evaluation-and-transfer|评测与现实迁移]] · [[topics/simulation-transfer|仿真策略怎样可靠迁移到现实]]。
