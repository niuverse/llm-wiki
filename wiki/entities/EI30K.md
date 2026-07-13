---
title: "EI-30K"
type: entity
tags: [robotics, dataset, embodied-data, heterogeneous-data]
sources: ["[[lda-1b-scaling-latent-dynamics-action-model]]"]
last_updated: 2026-07-13
---

# EI-30K

EI-30K（具身交互数据集）是 [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]] 来源构建的三万小时以上具身交互数据集，用来支持 [[LatentDynamicsActionModels|潜在动力学动作模型]] 的通用具身数据归集。它把机器人/人类、真实/仿真、有动作标注/无动作的数据转成统一格式，并保留质量混合的轨迹，而不是只筛选专家示范。

## 组成

| 类别 | Duration | 角色 in LDA 训练 |
| --- | ---: | --- |
| 真实世界机器人数据 | 8.03k hours | 动作标注的 interaction 数据, 策略 + 动力学监督 when 质量 allows |
| 仿真的机器人数据 | 8.6k hours | dense 与 cleaner 机器人监督, including 操作与 household 任务结构 |
| Ego 人类数据带有动作 | 7.2k hours | 人类意图, 手部运动, dexterity 先验, 动作/动力学监督 |
| Ego 人类数据不含动作 | 10k hours | 视觉预测, 时间结构, 可供性先验 |

## 数据统一

EI-30K 的流程把原始数据集转成 LeRobot 2.1 格式，并统一保存观测、动作、语言、任务元数据、回合边界和 timestamps。动作表示被对齐到手部中心化坐标帧：机器人数据使用 6-DoF 末端执行器位姿加 gripper width 或灵巧手部关节；人类数据使用 6-DoF 腕部位姿和 MANO 手部参数。相机 extrinsics 被保留，用来 decouple 手部运动从第一视角输出头运动。

质量标注是这个数据集的关键：轨迹会按动作准确率和标注完整性标质量；idle/仅头部 segments 被移除；语言标注用 VLM 规范化。低质量轨迹没有被 aggressive 过滤删除，而是作为动力学/视觉预测监督被保留。

## 实践含义

EI-30K 的主要价值不是“数据更多”，而是让数据角色可以被目标路由使用。对于机器人基础模型，这意味着数据采集流程应该记录质量、动作可用性、相机几何、手部/物体交互有效性和任务元数据；否则混合数据只能作为 noisy 模仿语料库，难以转成动力学监督。

相关页面：[[LDA1B]]、[[LatentDynamicsActionModels]]、[[WorldModelsForEmbodiedAI]]、[[VisionLanguageActionModels]]。
