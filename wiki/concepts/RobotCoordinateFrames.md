---
title: "机器人坐标系与位姿"
type: concept
tags: [robotics, kinematics, simulation]
sources: ["[[modern-robotics-homogeneous-transformations]]", "[[mujoco-computation-collision-detection]]", "[[isaac-sim-policy-deployment]]"]
modified: 2026-10-02
study_topic: syntheses/simulation-and-assets-learning-path
---

# 机器人坐标系与位姿

位置、姿态和速度都必须说明“相对谁、用哪个坐标系表达”。世界、基座、连杆、相机和接触坐标系可同时存在；名字相同的三维数组不能因此直接相加。[[modern-robotics-homogeneous-transformations|官方课程]] 用统一的位姿表示解释这一点。

## 数学结构

设 $T_{ab}$ 表示坐标系 $b$ 在坐标系 $a$ 下的位姿，$R_{ab}$ 是其旋转矩阵，$p_{ab}$ 是 $b$ 原点在 $a$ 下的位置：

$$
T_{ab}=\begin{bmatrix}R_{ab}&p_{ab}\\0&1\end{bmatrix},\qquad
\begin{bmatrix}x_a\\1\end{bmatrix}=T_{ab}\begin{bmatrix}x_b\\1\end{bmatrix}.
$$

$x_a$ 与 $x_b$ 是同一个点的不同坐标。由这个定义推得的教学关系是：

$$
T_{ac}=T_{ab}T_{bc},\qquad
T_{ba}=T_{ab}^{-1}=\begin{bmatrix}R_{ab}^{T}&-R_{ab}^{T}p_{ab}\\0&1\end{bmatrix}.
$$

下标消去帮助检查组合顺序，但乘法一般不可交换。旋转矩阵属于 $SO(3)$；刚体位姿属于 $SE(3)$。如果增量 $\Delta T$ 用固定坐标系表达，左乘；用物体自身坐标系表达，右乘。[[modern-robotics-homogeneous-transformations|齐次变换文字稿]]

### 位姿参数与自由度不同

MuJoCo 自由关节用七个位置数值表示平移与四元数，却只有六个速度自由度。姿态四元数有单位长度约束，四个数不能视为四个独立旋转自由度；位置数组的差不能直接当速度数组。`mj_differentiatePos` 处理这种差分，积分也使用姿态几何。[[mujoco-computation-collision-detection|MuJoCo 计算章]]

## 直觉

把“向前移动一米”交给机器人之前，先确定“前”指世界方向、基座方向还是相机方向。机器人转过身后，基座方向改变，世界方向不变。这正是左乘和右乘得到不同结果的原因。

## 失效情形

- **交换乘法顺序**：将世界增量当成本体增量，改变运动的参考系；官方动画展示不同终态。
- **位置差分维数错误**：将四元数参数当独立坐标差分，得到与广义速度不一致的结果。[[mujoco-computation-collision-detection|MuJoCo]]
- **忽略接口坐标语义**：轴、单位与实际关节顺序属于部署接口。Isaac Sim 指南把这些保存在描述文件，不能只凭数组宽度猜测。[[isaac-sim-policy-deployment|部署指南]]

## 观看并复习

下面来自 [[modern-robotics-homogeneous-transformations|官方课程]]，不自动播放。先预测左乘、右乘的结果，再看动画；最后给世界到相机、相机到物体两个变换写出组合式。

<iframe class="external-embed" src="https://www.youtube-nocookie.com/embed/vlb3P7arbkU" title="Modern Robotics 3.3.1：齐次变换矩阵" loading="lazy" allowfullscreen></iframe>

[打开官方课程与文字稿](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-3-1-homogeneous-transformation-matrices/)。视频需要播放器服务可访问，公式与解释可直接在本页复习。

## 实践含义

比较两套引擎或部署同一策略时，应检查坐标系、单位、姿态参数顺序和关节名；这是由上述机制得到的工程检查建议。下一步读 [[RobotRigidBodyDynamics|动力学]]，追踪速度和力怎样配对；部署检查见 [[PolicyDeploymentContract|策略部署契约]]。
