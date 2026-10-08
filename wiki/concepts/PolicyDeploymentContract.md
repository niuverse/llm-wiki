---
title: "策略部署接口"
type: concept
tags: [robotics, simulation, sim-to-real, systems]
sources: ["[[isaac-sim-policy-deployment]]", "[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning]]", "[[peng-dynamics-randomization]]", "[[isaac-lab-repository]]", "[[mjlab-repository]]", "[[mujoco-playground-repository]]"]
modified: 2026-10-04
topics: ["topics/evaluation-and-transfer", "topics/simulation-transfer"]
---

# 策略部署接口

模型权重相同，行为也可能不同：输入的关节顺序、历史、尺度、动作含义或更新时间改变，机器人执行的就不是训练时的闭环系统。部署契约记录这些条件；[[isaac-sim-policy-deployment|Isaac Sim 部署指南]] 与 [[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|AGILE，第 3.5 节]] 都将输入输出复现纳入部署过程。优先核对这些已知条件，再判断未知物理差距，是本页采用的诊断建议。

## 数学结构

用教学抽象写出一次执行：

$$
z_k=\mathcal A(o_{k-H:k};\kappa_{obs}),\qquad
a_k=\pi_\theta(z_k),\qquad
u_k=\mathcal B(a_k;\kappa_{act}).
$$

$\theta$ 是模型权重，$\mathcal A$ 是观测组装与预处理，$H$ 是历史长度；$\mathcal B$ 将模型动作映射为实际命令；$\kappa_{obs}$ 与 $\kappa_{act}$ 包含顺序、单位、尺度和偏移。实际行为还依赖 [[SimulationTimeStepping|控制周期]] 与执行器。只对齐 $\theta$，不能对齐整个系统。

## 文件怎样分工

[[isaac-sim-policy-deployment|Isaac Sim 6.1 官方指南]] 的具体实现是：

| 产物 | 需要复现的内容 |
| --- | --- |
| `policy.pt`／`policy.onnx` | 推理计算与模型权重 |
| `IO_descriptors.yaml` | 观测／动作顺序、实际关节名、形状、缩放、偏移和裁剪 |
| `env.yaml` | 物理步长、策略降频、资产、初态、驱动增益与执行器 |
| `agent.yaml` | 训练过程来源记录，不是运行时必需输入 |

`RobotPolicyRunner` 对支持的项按关节名绑定，不要求资产数组顺序与训练顺序相同。自定义观测、历史和修饰器仍需正确实现；描述文件能记录某项，不等于执行器已经理解它。类名和自动绑定行为以本次 6.1 文档为准，旧系统需检查相应版本。

## 直觉与运行生命周期

把权重视为“函数”，接口与时序视为“怎样调用函数”。Isaac Sim 6.1 要求停止时生成机器人，物理启动后初始化，每个物理步调用一次；运行器自己负责策略降频。重放或传送后先恢复最终机器人状态，再重新初始化策略和执行器状态。

[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|AGILE]] 的 TorchScript 与 YAML 接口描述、跨 MuJoCo 验证采用了同样的契约思路；它提供流程证据，不能证明新 API 和旧实现完全等价。

### 一个数值正确但行为错误的例子

以下是教学构造。训练动作的含义若为 $q^{target}=q^{default}+0.5a$，部署误写成 $q^{target}=q^{current}+0.5a$，同一输出 $a$ 就从“相对默认姿态”变成“相对当前位置”。张量形状、单位甚至单步幅值都可能合法，但重复动作的行为不同。[[peng-dynamics-randomization|Peng]] 使用后一类相对当前角度的增量，所以阅读动作接口时必须明确参考点。

时间也进入输入语义：若历史样本相隔 $\Delta t$，$H$ 个间隔覆盖 $H\Delta t$ 的真实时间。把控制周期加倍却沿用相同历史长度，会改变策略看见的运动时段；仅把历史张量维度对齐还不够。[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|AGILE]] 因此将观测顺序、历史与动作缩放共同导出。

### 训练端也需要终止与重置契约

[[isaac-lab-repository|Isaac Lab]] 与 [[mjlab-repository|mjlab]] 的默认自动重置会让结束步返回新回合观测，但该步奖励与结束标志属于旧回合；RSL-RL 包装器另传时间截断信息。若训练器需要终止状态的价值，必须使用其约定的终止信息，不能直接把任何返回观测都当成旧回合最后状态。

[[mujoco-playground-repository|MuJoCo Playground]] 的自动重置包装器默认复用首次 reset 缓存的物理数据和观测，完整重置则采用另一条路径。这个区别会改变初始化采样；一般附加状态和循环隐藏状态也需要按各自所有者的约定重置。这里不是要求三个实现采用同一种重置，而是要求学习算法与环境对“这一步属于哪个回合”有同一解释。相关结论来自固定提交的静态源码，不代表已复现训练结果。

## 接口一致与迁移成功分别验证

[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|AGILE，第 4.2 节与表 3]] 复用确定性速度扫描和高度渐变，在 MuJoCo 比较教师与不同学生结构；这些结果说明统一评估可以在导出后继续使用。第 5.2 节则明确硬件迁移主要依赖定性演示，不能把跨仿真器的跟踪误差当作真实硬件误差。

[[peng-dynamics-randomization|Peng，第 V 节、表 III]] 在正确动作语义之外还随机化动作持续时间；去掉这项后，推动任务的真实表现明显下降。因此“实现与训练的接口相同”只排除了一类错误，执行器响应和通信时延仍需建模或校正。

## 失效情形

- **不同运行的文件混装**：模型能加载，但接口、资产或执行器来自别的训练运行，行为仍可能错误。
- **用正则表达式猜顺序**：`.*` 只定义选择条件，导出后的实际关节顺序才是训练张量语义。
- **历史有字段却无实现**：自定义历史或预处理须复现；不能把元数据存在当成功。
- **重复降频或错误重置**：改变动作周期，或保留旧策略／执行器状态，都会改变闭环轨迹。上述四点由 [[isaac-sim-policy-deployment|官方指南]] 明确支持。

## 实践含义

建议按“训练环境复现 → 导出物一致 → 名称与张量绑定 → 物理和时序一致 → 硬件观测与动作语义”排查。仿真到仿真验证有助定位契约错误，但不替代真实验证；[[DomainRandomization|随机化]] 处理未知变化，[[SystemIdentificationForSimulation|辨识]] 调整模型参数，二者都无法自动修正错误关节映射。

## 研究归属

[[topics/evaluation-and-transfer|评测与 Sim-to-Real]] · [[topics/simulation-transfer|Sim-to-Real]]。
