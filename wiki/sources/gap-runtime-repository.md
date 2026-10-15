---
title: Graph as Policy 公开实现：技能图执行、验证与检查点
nav_title: GaP 代码核查
type: source
source_type: repository
tags: [robotics, embodied-ai, source-backed]
sources: []
modified: '2026-10-15'
source_file: raw/gap-runtime-repository-2026-10-15-c28b77486ebf.tgz
source_kind: repo
source_url: https://github.com/graph-robots/graph-as-policy/tree/c8b5515df80d3029ca5dc7f7f1ec1c327b70bbea
source_date: unknown
source_version: c8b5515df80d3029ca5dc7f7f1ec1c327b70bbea
snapshot_sha256: c28b77486ebf2c14a8a075f48491b5e32e100661abfc8da4c50b4b7b1ba731f7
acquired: '2026-10-15'
topics: [topics/robot-harness-and-physical-rsi, topics/agent-execution]
extracted_text: graph/extracts/gap-runtime-repository-2026-10-15-c28b77486ebf.md
---

# Graph as Policy 公开实现

## 版本、范围与证据身份

核查 [graph-robots/graph-as-policy 的固定提交 c8b5515](https://github.com/graph-robots/graph-as-policy/tree/c8b5515df80d3029ca5dc7f7f1ec1c327b70bbea)。归档是九个指定文件的原字节集合，**不是完整仓库快照**：README、架构、工作流格式、检查点文档，executor、validator、checkpoint 数据结构，以及 quickstart 图和抓取检查点。文档、示例完整阅读；较大的执行器与验证器仅静态核查下述相关路径，未审查其全部实现。标准提取器不支持 tgz，缓存由逐成员 UTF-8 解码生成。

与 [[gap-graph-as-policy|论文]] 分开：论文附录描述 `vos`、gRPC、protobuf；此提交文档明确公开移植版采用进程内 Python、TypedDict／numpy，默认示例使用 LIBERO／MuJoCo，Ray 为可选。不能拿当前快速入门运行步骤冒充论文全部八项实验的复现。

## 架构与接口

按 `docs/source/developers/architecture.md` 的文档说明，engine 提供生成、执行、工具注册、机器人连接、追踪与评测；另一个 `open-robot-skills` 仓库提供技能与模型工具，通过目录发现加载。生成输入为任务指令和技能目录，输出工作流目录；执行输入为图、连接器和技能，输出 `ExecutionResult` 与逐节点追踪。

`agent/` 协调子图生成、检查点生成与修复；`runtime/` 解析图并调度；`ToolRegistry` 按统一名称调用模型或控制函数；`connector/` 适配仿真／真实机器人并提供 `robot.*`／`sim.*` 工具；`verify/` 描述仿真世界中的谓词。IK 在连接器，碰撞感知运动规划在独立工具包，不能把“能算 IK”当成“路径已无碰撞”。这些是文档架构描述，本次没有执行所有模块。

## 一次具体执行的数据流与控制流

`examples/libero_quickstart/graph/workflow.json` 把目标感知、抓取、容器感知、搬运等步骤组织成子图。内部 `$ref` 将上游节点结果绑定为下游输入，跨子图按声明名称绑定；顶层根据子图出口路由。感知产生包围盒／掩码，抓取输出末端位姿，搬运同时使用对象、容器和持物信息。节点调用失败时 `on_error` 提供失败出口。

静态核查 `gap/runtime/executor.py:732` 的 `_run_subgraph`：绑定输入 → 运行局部图 → 读取终端节点或路由字段 → 检查出口是否合法 → 解析输出 → 保存跨子图输出 → 正常出口上执行检查点 → 返回 `_exit` 给顶层路由。子图异常路径不执行后置检查。`grasped` 这种出口名称本身只证明代码走到命名的终端，不能证明物体被抓住。

## 检查点到底保证什么

`examples/libero_quickstart/graph/checkpoints/grasp_sg.py` 的 `_target_held` 调用 `world.body("alphabet soup").is_grasped()`，并记录接触、夹爪开度和物体高度作为诊断。文档将 `is_grasped()` 定义为与指定机器人链接接触，因此它还是一个物理代理判据；接触不自动等于稳定夹持。

核查 `gap/runtime/executor.py:860` 的 `_run_validate_checkpoints`：没有 `world_snapshot_fn` 时只告警一次并跳过；没有 sidecar 文件也跳过；只评估 `validate=True` 的谓词；`warn` 记录后继续，`raise` 才抛出 `VerificationFailed`。`docs/source/running/checkpoints.md` 还说明公共 CLI／facade 默认 `warn`，原始执行器默认 `off`。所以 `success=True` 不能代替读取检查点结果；真实机器人通常无仿真真值，检查点不是硬件安全机制。

这一点与 [[regenharness-evidence-gated-self-improvement|RegenHarness]] 的“缺乏证据不接受任务进度”构成有价值的设计比较：前者是允许同图跨仿真／真实运行的排练检查，后者规定的是任务验收权限，不能仅按是否有 verifier 字段认为能力等价。

## 静态验证的实际边界

核查 `gap/runtime/validate.py:315`：`Any`／开放字典采用宽松兼容；未知工具在未注册时可降级为告警。`_check_cross_subgraph_io`（1149 行起）沿顶层依赖检查上游是否提供同名输出或调用点是否传参，但没有在这条路径上比较跨子图输入输出的字段类型；其祖先检查表示“某条前序路径”，也不等同于所有条件分支都必然产生值。静态检查因此不能视为完整程序证明。

文档与静态核查支持它是一套结构化、可追踪的 [[RobotHarness|机器人 Harness]]；本次未安装模型、运行仿真或真实机器人，未验证延迟、成功率及硬件限幅。论文性能只引用论文来源页。
