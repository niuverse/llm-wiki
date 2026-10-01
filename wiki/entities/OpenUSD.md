---
title: "OpenUSD"
type: entity
tags: [openusd, usd, scene-description]
sources: ["[[openusd-introduction]]", "[[isaac-sim-asset-structure]]", "[[nvidia-ovrtx]]", "[[learn-openusd-stage]]", "[[learn-openusd-file-formats]]", "[[learn-openusd-prim-composition]]", "[[openusd-glossary]]"]
modified: 2026-07-13
study_topic: syntheses/simulation-and-assets-learning-path
---

# OpenUSD

OpenUSD / USD（通用的场景描述）在 [[openusd-introduction|Introduction 到 USD]] 中被定位为用于稳健地与可扩展地交换 / augment arbitrary 3D scenes 的 open 来源场景描述系统。它不是单纯的交换文件格式：来源强调 USD 可以 assembly / organize 资产为 sets、scenes、镜头、worlds，并在单一场景图中非破坏性地编辑作为覆写。

机制上，OpenUSD 由底层数据模型、高层结构规范、组合弧、阶段运行时评估、toolset、Hydra imaging 和插件 extension 点组成。数据模型用 hierarchical namespace 的 `Prim` 表示场景；图元可以包含属性、关系和元数据；contents 被组织在 `Layer` 中。结构规范给网格、变换、材质、光照、物理等域提供 standard 编码和客户端 API。组合弧则用于软件包、汇总、vary 和覆写资产。

在本知识库的机器人学上下文中，OpenUSD 的直接意义来自两条有来源支持的路径。[[IsaacSimAssetStructure|Isaac Sim 资产结构 3.0]] 展示机器人资产可以被组织成几何、材质、实例、物理、运行时调优、机器人结构规范和特征层，再通过载荷、参考资料和变体组合成最终仿真资产；[[nvidia-ovrtx|NVIDIA ovrtx]] 则展示传感器仿真 application 如何用 USD 图元、关系、行内子层、参考资料、`RenderProduct` 和 `RenderVar` 把场景组合变成运行时传感器 outputs。也就是说，OpenUSD 不只是保存网格的容器，而是仿真资产假设和传感器-output 配置的组织方式。

当前证据边界：本页已覆盖 OpenUSD Introduction、Learn OpenUSD 的 Stage / File Formats / Prim Composition lessons、官方 Glossary、Isaac Sim 资产结构用法和 ovrtx 传感器配置用法。当前可以支持 `.usda` 入门读写、Stage / Layer / Prim / PrimSpec / opinion 的机制解释，以及 file-format 选择边界；更细的 LIVRPS、namespace editing、variant selection、OpenUSD 物理结构规范、toolset 命令行为和完整 Python API 仍需要后续收录。

相关页面：[[OpenUSDSceneComposition|OpenUSD 场景组合]]、[[USDAFileSyntax|USDA 文件语法]]、[[IsaacSimAssetStructure|Isaac Sim 资产结构 3.0]]、[[RTXSensorSimulationPipeline|RTX 传感器仿真流程]]、[[IsaacSim|Isaac Sim]]、[[openusd-introduction|Pixar]]。
