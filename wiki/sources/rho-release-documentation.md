---
title: "Rho 发布文档：检查点接口与 LIBERO 最小验证"
type: source
tags: [robotics, vla, source-backed]
sources: ["[[rho-efficiently-adaptable-vla-models]]"]
modified: 2026-10-08
source_file: raw/rho-readme-2026-10-08-402fab1ede76.md
source_kind: markdown
source_type: documentation
source_url: https://github.com/microsoft/rhobotics/blob/d15cc626bd0cc0699d8e93ef6c751f63b912d777/README.md
source_date: unknown
source_version: d15cc626bd0cc0699d8e93ef6c751f63b912d777
acquired: 2026-10-08
snapshot_sha256: 402fab1ede76446d5632619481d8ddc9c58ec9a901aa987342e5b726b2d94641
topics: ["topics/robot-policy-learning", "topics/evaluation-and-transfer"]
nav_title: "Rho · Docs"
---

## 范围与证据等级

本页完整阅读并归档 Microsoft rhobotics 在提交 `d15cc626bd0cc0699d8e93ef6c751f63b912d777` 的 [README](https://github.com/microsoft/rhobotics/blob/d15cc626bd0cc0699d8e93ef6c751f63b912d777/README.md)。这是一份发布文档的核查，**没有读取完整实现、安装依赖或运行模型**。下述行为属于文档说明，不能称为已经静态验证或实测的实现能力。论文结果与机制单列于 [[rho-efficiently-adaptable-vla-models|Rho 论文精读]]。

## 文档描述的组成和一次评测数据流

发布内容包含基础模型、机器人专属中间训练模型和任务检查点的使用说明；LIBERO 评测使用 `microsoft/rho-libero`。检查点保存模型配置、特征定义、权重和任务数据的归一化统计。环境产生图像、语言与本体状态，模型按检查点配置归一化并生成动作块，再由评测环境执行，最终汇总各任务套件结果。（README：检查点与 LIBERO 部分）

公开权重不含优化器状态。评测配置不应随意覆盖训练数据集定义，否则可能加载错误的归一化统计。这里接口正确性比先调整网络参数更值得优先检查，参见 [[PolicyDeploymentContract|策略部署约定]]。

运行要求为 Linux、Python 3.12、CUDA GPU 与 Git；默认 FlashAttention 2.8.3 需单独安装，其构建需要 CUDA 12以上的开发工具链，只有显卡驱动不足以完成构建。文档推荐容器方式并单列 LIBERO 环境安装流程。约10.5 GB 的模型权重文件大小不是峰值显存要求。（README：安装与检查点部分）

## 值得先做的40回合小实验

**状态：建议，未执行。** 按固定提交的安装说明准备模型和 LIBERO 环境，在该提交的项目根目录执行文档给出的评测入口：

```bash
python environments/libero/eval.py \
  --config_path=environments/libero/configs/multieval_libero_rho_smoke.yaml
```

这是40回合的评测冒烟配置，与文档中的10步训练冒烟测试不同。完整单轮评测配置 `multieval_libero_rho_50.yaml` 为2000回合，也不同于论文三种子共6000回合、包含在线纠正的报告。（README：LIBERO；论文附录 F、I）

建议将这次实验的判据限定为链路有效性：

| 记录项 | 目的与通过条件 |
| --- | --- |
| 仓库提交、检查点版本、种子、GPU 与环境版本 | 使后续运行可比较；不要只记录模型名称 |
| 四个套件的状态和回合数 | 四个均完成，总计40回合，退出正常；部分成功不能算完整验证 |
| 执行块长与归一化来源 | 核实实际加载值；论文写预测16／执行8，当前文档写16／16 |
| 各套件成功率与失败原因 | 小样本诊断，不能作为复现论文成绩的结论 |
| 动作块推理延迟中位数／95分位与峰值显存 | 衡量当前设备可用性；这是本页建议采集，不声称脚本已自动记录这些指标 |

文档说明即使评测失败也会写 `multieval_summary*.json`，套件结果含状态与错误。全局 `aggregate.mean_success_rt` 在运行不完整时为 `null`，另有仅针对已完成部分的平均值。因此“生成了结果文件”不等于全部通过，不能用已完成部分的均值冒充全量成功率。（README：评测结果）

## 训练成本与复现边界

README 的标准 LIBERO 训练配置为40000步、全局批量128、四张 H100，每卡32且不做梯度累积，每样本8个流匹配采样。它描述的是下游训练，不是完整多机器人预训练成本；论文另列48张 B200 的预训练设置。执行块长的文档／论文差异目前保留为待核查项，没有通过猜测修改任一来源。（README：LIBERO；[[rho-efficiently-adaptable-vla-models|论文附录 A、I]]）

若40回合无法完整结束，先定位环境、检查点和输入接口；若能结束，再按所需证据扩大回合数，随后才考虑在线纠正或微调。该顺序是本页的实践建议，尚无本地测量支撑“这台机器足够快”或“显存足够”等结论。
