---
title: "策略部署契约：同一模型如何执行同一行为"
type: concept
tags: [robotics, simulation, sim-to-real, systems]
sources: ["[[isaac-sim-policy-deployment]]", "[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning]]", "[[peng-dynamics-randomization]]"]
modified: 2026-10-02
study_topic: syntheses/simulation-and-assets-learning-path
---

# 策略部署契约：同一模型如何执行同一行为

模型权重相同，行为也可能不同：输入的关节顺序、历史、尺度、动作含义或更新时间改变，机器人执行的就不是训练时的闭环系统。部署契约记录这些条件，先于物理随机化和硬件迁移判断。

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

## 失效情形

- **不同运行的文件混装**：模型能加载，但接口、资产或执行器来自别的训练运行，行为仍可能错误。
- **用正则表达式猜顺序**：`.*` 只定义选择条件，导出后的实际关节顺序才是训练张量语义。
- **历史有字段却无实现**：自定义历史或预处理须复现；不能把元数据存在当成功。
- **重复降频或错误重置**：改变动作周期，或保留旧策略／执行器状态，都会改变闭环轨迹。上述四点由 [[isaac-sim-policy-deployment|官方指南]] 明确支持。

## 实践含义

建议按“训练环境复现 → 导出物一致 → 名称与张量绑定 → 物理和时序一致 → 硬件观测与动作语义”排查。仿真到仿真验证有助定位契约错误，但不替代真实验证；[[DomainRandomization|随机化]] 处理未知变化，[[SystemIdentificationForSimulation|辨识]] 调整模型参数，二者都无法自动修正错误关节映射。
