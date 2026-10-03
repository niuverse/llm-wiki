# 世界生成、机器人评估与仿真基础设施：第二轮工作记录

日期：2026-10-04。本文是编辑记录，不是外部证据。覆盖 8 个来源页、9 个概念页和 1 个综合页，共 18 页。遵循 `reading-contract.md`；沿第一轮已完整阅读的五篇论文补充机制教学，并静态核查现有归档仓库的关键控制与数据流。未新增概念、下载新来源、运行第三方项目或修改 `raw/`。目录、日志、主题元数据和最终构建交根代理统一处理。

## 逐页处理

| 页面 | 本轮审阅与实质修改 | 证据与教学边界 |
| --- | --- | --- |
| EmbodiedGen V1 来源 | 补 GeoLifter 的空间一致性损失及变量，解释六视角七通道几何条件、冻结基础模型、训练与推理区别；同一机器人表面纹理对应的例子 | 原文 §3.4、式(2)、图11–12；例子为教学解释；未把物理参数估计提升为真值 |
| EmbodiedGen V2 来源 | 用苹果与碗串起类型化角色、浅树、资产匹配、父节点优先放置、支撑／重叠／可达检查、沉降；补历史指代与验证后提交的编辑过程 | §2.4–2.6；例子非论文实验；不是联合训练的端到端模型 |
| MagicSim 来源 | 补自然语言命令→技能→规划→机器人→验证→记录的具体流程，以及一个环境等待、另一个推进的异步示例；说明固定形状装配和技能词表限制 | §6.7、§8.4–8.8、§10–11，图13；共享 MDP/MPC 双链；低层 RL 接口与计划中的高层 RL 分开 |
| RoboCasa365 来源 | 用原文 BlendIngredients 任务解释蓝图、任务代码、示范、学习、固定策略评估的不同作用；明确四种实验协议和“未见”相对于预训练的含义 | §3.2–3.4、图3；保留合成混合权重未知、训练步数混杂和真机试验数字矛盾 |
| RoboLab 论文来源 | 补 MNPE 的条件建模、类别与连续参数分解、提议分布修正推导、归一化重要性权重和有效样本量解释 | §III-C、附录B 式(4)–(9)；5,000 后验样本不等于新增仿真试验；保留原文任务数字及表格冲突 |
| nvlabs-robolab | 全面重写为用途、具体任务、环境构建、推理缓存、评估循环、结果汇总；固定 commit 和代码路径行号；纠正文档注释与实际容器判定差异，说明“冻结”语义 | 静态代码核查；未运行仿真／策略／统计工具；后续仓库能力不回填成论文实验 |
| nvidia-ovrtx | 全面重写为传感器与产品接口、一步请求、异步完成、映射与 DLPack、释放生命周期、点云有效性和预热；明确忽略消费流参数的实际实现 | 固定 commit 静态核查与 SDK 文档；无 GPU 运行、精度或吞吐复现；零拷贝接口不意味着全链路没有复制 |
| robotics-simulation-infrastructure 来源 | 全文重读文章后重写模块链、配置与代码职责、坐标变换的局部推导、显存预算教学示例；链接已收录仓库来源 | 第一人称设计经验，不是统一基准；没有因此声称核查所有相关框架源码 |
| SimulationReady3DWorldGeneration | 用杯柄的可见几何、凸碰撞填洞、尺度／质量／摩擦和可供性区分四种表示 | 教学例子；通过双链引导碰撞表示基础，不能由好看的网格推断可抓 |
| AgenticSceneTaskGeneration | 苹果例子解释初始状态、目标谓词、对象身份的一致性 | 教学例子；代码可运行、物理稳定、策略可解仍是不同检查 |
| TaskGeneralistPolicyEvaluation | 补任务宏平均与试验微平均的数值例子；用香蕉任务解释成功判定器 | 10/10 与 10/100 得到 55% 与约 18.2% 是教学算例；实际判定引用固定仓库实现 |
| RobotLearningDataComposition | 补按轨迹均匀抽样与按来源配比的区别、梯度权重和轨迹长度偏置 | 假设 3万／60万 条的 95.2% 与 50/50 对比仅为教学；不再假定 RoboCasa 实际使用该采样方式 |
| RobotLearningObjectives | 用同一个滑落事件区分行为克隆、强化学习、动力学预测的学习信号 | 教学示意；评估含奖励字段不使固定策略测试成为 RL |
| SimulationSensitivityAnalysis | 补成功条件后验与实际成功率的差异，解释先验不均匀如何改变后验 | A/B 区域概率为教学例子；后验宽不能独立证明鲁棒 |
| SimulationBenchmarkReportingPipeline | 推导 Beta 后验指数与均匀先验，解释全成功小样本仍有区间宽度 | 10/10 的 95% 等尾区间下界约 71.5% 为 Beta(11,1) 算例；先验不是额外真实试验 |
| RoboticsSimulationInfrastructure | 补动作／观测完整链、控制周期与物理步长、渲染独立时钟、串行与异步耗时区别 | 链接核查后的 RoboLab 与 ovrtx；批量物理环境不等于批量策略推理 |
| RTXSensorSimulationPipeline | 额外授权页；同步修复 DLPack 消费流、map/wait_on、Python 延迟释放及首次 unmap 参数生效边界 | 不改无关内容；版本与路径由 ovrtx 来源追溯；区分生产完成和消费完成两个依赖 |
| embodiedgen-v1-v2-learning-map | 加入杯子从资产到任务世界的阅读练习、自检与共享概念入口 | 教学练习，不是新实验；保留条件成功率及配套策略研究证据归属 |

## 本轮实际阅读范围

### 论文与文章

第一轮五篇 151 页完整阅读情况见 `graph/review-notes/worlds.md`。本轮是针对教学缺口的定向重读，不声称再次完整阅读所有 PDF。

- EmbodiedGen V1：重读 §3.4 及相关损失、条件通道与训练设置；渲染并实际查看 PDF 第8页图文，临时图 `/tmp/worlds-second/geolifter-8.png`。
- EmbodiedGen V2：重读 §2.4–2.6，核对任务世界生成、布置约束与编辑提交顺序。
- MagicSim：重读 §6.7、§8.4–8.8、§10 及相关执行描述；渲染并实际查看 PDF 第25页图13，临时图 `/tmp/worlds-second/magicsim-25.png`。
- RoboCasa365：重读 §3.2–3.4 与图3，沿用第一轮实验协议与附录核对结果。
- RoboLab：重读 §III-C、附录B 的 MNPE、重要性修正与姿态距离，以及附录C/D 相关片段；沿用第一轮数字冲突记录。
- 《Robotics Simulation Infrastructure》：完整阅读本地 `graph/extracts/robotics-simulation-infrastructure.md`，包括嵌入代码与作者限定语。

### RoboLab 仓库静态核查

证据为已归档 `raw/robolab-20260612-7d45d749-source.tar.gz`，commit `7d45d74904eade3b578a8eb1f2f9f89bc3d40326`。临时展开阅读文件在 `/tmp/worlds-second/robolab/`，不修改原归档。来源页使用固定 commit 的路径与行号引用。

完整读到文件末尾：

- `robolab/eval/base_client.py` 1–141；`robolab/eval/episode.py` 1–195；`robolab/eval/runner.py` 1–256。
- `robolab/core/environments/env.py` 1–149；`robolab/core/environments/runtime.py` 1–261。
- `robolab/tasks/benchmark/banana_in_bowl_task.py` 1–45；`policies/pi0_family/client.py` 1–153。

定向读取：

- `core/environments/factory.py` 92–192；`core/environments/config.py` 255–355。
- `core/task/conditionals.py` 31–75、185–234；`core/task/predicate_logic.py` 309–471；`core/task/hull_check.py` 42–110。
- `core/world/world_state.py` 551–607；`eval/summarize.py` 116–310；`core/logging/results.py` 604–638、749–803。
- `core/utils/adaptive_sampling.py` 22–47 再核对；该文件与 `docs/statistical_significance.md` 的完整阅读属于第一轮，本轮沿用，未冒称再次全文阅读。

实质发现：`object_in_container` 的 AABB 注释不能代表 `in_opentop_container` 实现；实际使用凸包顶点均值，转到容器坐标系后对去掉朝上面的半空间检验。这个均值不等于质量中心，也不证明物体全部在容器内；该分支不使用传入的 tolerance。评估循环对活跃环境依次请求共享客户端，再批量执行环境步；“冻结”环境依旧以零动作进入父类步进，所以不能推成物理状态绝对静止。以上都是静态实现语义，不声称已重现运行故障。

### ovrtx 仓库静态核查

证据为已归档 `raw/ovrtx-source.tar.gz`，commit `29d11037fbcaed0f0f53e7f32d17bd0486fd453b`，0.3.0 预发布版本。临时展开文件在 `/tmp/worlds-second/ovrtx/`。

完整阅读：README、`docs/core/application_flow.rst`、`docs/core/async_status_errors.rst`、`docs/sensors/sensor_outputs.rst`、`docs/sensors/pointclouds.rst`；`examples/python/minimal/main.py` 1–68、`examples/python/sensors/lidar/main.py` 1–171、对应 `lidar_example.usda` 1–134。

定向读取：`python/ovrtx/_src/renderer.py` 799–876、1630–1770；`python/ovrtx/_src/types.py` 303–410、531–570、615–731、906–969；`docs/sensors/lidar.rst` 48–72、104–142；`docs/sensors/configuration.rst` 219–254。未把仅检索过函数名的其他模块称作完整阅读。

实质发现：单张量及多张量 `__dlpack__` 实现忽略消费者 stream；正确依赖需借助 map 的 sync_stream、wait_on 或主机等待。C 接口 unmap 后裸指针无效，Python 已创建的 DLPack 视图引用则延迟持有缓冲区到引用释放；首次 unmap 调用决定同步释放参数。点云 Counts 与有效性 Flags 是不同条件；`includeInvalidPoints=true` 才允许包含无效点，官方示例只按 Counts 裁剪不能泛化为所有配置均已过滤 Flags。未运行 GPU、检查二进制内核或复现物理／性能指标。

## 保留的证据限制

- RoboLab 原文总任务数、分类计数、成功率与表格间冲突原样解释；本轮仓库代码不用于默默替作者选一个数字。
- RoboCasa 的合成数据采样权重未知、任务数量与总示范量混杂、联合 120k 对两阶段 80k+60k 的预算差异、真机次数与百分比冲突继续保留。
- V2 配套策略研究及 MagicSim 援引协作研究没有独立收录阅读；定性集成示例不转述为统一性能验证。
- 全部工程结论分别标明文档描述或静态实现核查，没有真实执行、训练复现、吞吐测试或传感器标定验证。
- 无新增外部证据，所以没有本轮新增 ingest 项；现有论文、文章和仓库来源登记继续沿用。

## 验证与交接

已运行 `uv run python tools/health.py`，本组 18 页没有失效链接、缺失证据、语言、证据状态、研究结构或目录同步问题。最后一次全库结果仅剩 2 项其他页日志覆盖问题，交根代理在统一日志中处理。正文自然段保持单行，保留前置元数据、原始路径与链接；没有更改其他代理负责页面。最终全库健康检查与 Quartz 构建由根代理完成。
