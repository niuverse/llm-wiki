# 第二轮：训练系统、世界模型动作评估与轮式机器人

审阅日期：2026-10-04。工作记录，不是外部证据。依据 `reading-contract.md` 和前轮 `graph/review-notes/systems.md` 执行；未新建知识页，未修改规则、目录、日志、领域或专题。16 个分配页面已完成可理解性审阅及实质补充，已通知根代理停止内容写入，由其统一元数据、目录、日志与构建。

## 逐页处理

| 页面 | 本轮实际缺口与处理 | 证据或推导性质 |
| --- | --- | --- |
| sources/unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms | 通用关键路径推导移交概念链接；补一轮重放的生产／消费／参数发布接口、UB/(NK)复用计数和训练／部署区别；保留全部原核验实验及限定 | 原 §3、附录 A、C.4；新增计数和时序明确为教学解释，实际实现另链固定仓库 |
| sources/mujocouni-persistent-batched-runtime-primitives-for-mujoco | 补1024环境／16线程／5子步／3环境稀疏重置例子；说明显式状态与持久模型的所有权、输出规模与计算步数差别、雅可比前导维度 | 重新核对 §3.2–3.4、表1–3；数值为教学设定，不混入实测表 |
| sources/structural-properties-and-classification-of-wheeled-mobile-robots | 补从AS=0到Sᵀ消去约束力、H=SᵀMS及F=SᵀBτ的推导；解释惯量未丢失、驱动秩随配置变化 | 重新读俄译 §VI.A式39–50与53–56；统一符号推导明确为我们的重构；保留译本式56疑点及1996英文未校勘边界 |
| sources/worldecho-worldsync-action-following | 补AFE与IE信息通路区别、训练辅助头与推理删除、共同噪声端点的一维例子；明确一般中间时刻输入也随真值改变 | 重新核对 §3.4、图4和式10–13；标量2／−1／0.3是教学构造，不是物理测量 |
| concepts/HeterogeneousRobotRLTraining | 补24ms串行／13ms重叠的瓶颈例子；加入数据完整性／轮次／参数版本三种同步，以及自动重置转移语义 | 关键路径模型是教学近似；语义以本轮UniLab／ManiSkill已读实现为证据 |
| concepts/WorldModelEvaluation | 补视觉门组合分数的混合均值推导、0.076与0.06例子、宏平均与样本加权的差别 | WorldEcho评分定义；例中κ等值明确不是论文公开参数；保留前轮Dreamer/VJEPA版本与4/10/4限制 |
| concepts/WheeledMobileRobotClassification | 补共轴固定轮约束重复、添加中心转向轮后秩升高，以及ω=vx tanβ/L的推导 | 按已有轮式来源用直角坐标重构；明确例中β定义不同于原论文轮角原点 |
| concepts/WheeledRobotKinematics | 补差速左右轮公式相加／相减，0.1m轮半径与0.2m半轮距下轮速3／7rad/s例子 | 教学几何与教材差速模型；保留轮心／接触点、正向分配／反向估计区分 |
| concepts/NonholonomicMobileRobots | 用前进、转向、后退、回正四段动作得到二阶横移，连接Lie括号 | 教学构造、明确需允许倒车和原地转向，不能照搬汽车 |
| concepts/OmnidirectionalWheels | 从被动滑动方向分解推导tanγ投影；同样侧向轮心速度在普通全向轮／45度滚子上的不同驱动需求 | 重新核对教材式13.3–13.4；角度采用教材正方向，例子不是实测 |
| concepts/SteerableWheels | 由同一个目标旋量求各轮atan2目标与轮速；26.6度例子展示当前角未到位时的侧向冲突 | 由中心轮约束推得的教学建议，不假装硬件试验 |
| concepts/MobileRobotOdometry | 加完整带单位圆弧例子，ψ=.25rad、ρ=.15m、位移(.14844,.01865)m；改采样时间只改变速度 | 对已核对教材公式的单位演示，区分积分旋量与位移 |
| syntheses/wheeled-robot-modeling-learning-map | 将泛泛练习换成上述可计算例子的语义链接，让学习路径有检查结果；保持专题唯一问题入口 | 不重复建立backlog，不复写概念内的完整解答 |
| sources/unilab-repository | 从README摘要改为CLI→SAC调度器→CPU采集→终止观测→重放→采样水位→复制事件→权重版本的执行解析；14代码文件固定提交 | 官方源码静态阅读，详见下表；保留全部既有原始证据字段 |
| sources/maniskill-repository | 以PushCube走注册→重置→控制器→物理→评价→观测奖励→自动重置；增加相对当前／上次目标的控制例子和分阶段奖励代数 | 官方源码固定提交；明确控制器示例不代表全部任务默认控制模式 |
| sources/motrixsim-documentation | 从首页摘要改为SceneModel／SceneData／执行器／step／渲染完整接口说明；补仿真时钟例子、状态刷新提醒与专有内核边界 | v0.2.0官方四页完整阅读，仅文档层，无物理内核代码审计 |

## 实质新增发现与边界

- UniLab该提交的离策略双缓冲入口明确限制单学习GPU、one_tick预取、同步分块采集。同步块数并不禁止GPU学习与下一块采集重叠。不是“独立采集进程=完全无同步”。
- UniLab采样请求携带最低写入水位；真正采样时重新记录当前ptr/size，不能把早期请求元数据当永久冻结缓冲。两个共享传输槽被注册为锁页，而主重放驻CPU。ReplayBuffer即使fallback sample也没有GPU完整缓存。
- UniLab末次观测通过NpEnv保存并在ReplayBuffer写入时修补；ManiSkill同一步自动重置同样通过final_observation和掩码保留末次观测。只读取主obs会把回合边界接错。未逐算法审计所有自举掩码损失。
- ManiSkill PushCube成功奖励执行语句是4、normalized_dense除4，邻近旧注释仍写3；采用代码值并明示冲突。成功布尔量与塑形奖励分开解释。
- ManiSkill BaseEnv根据num_envs在auto时选择CPU/CUDA；部分reset与reconfigure不能同时用于子集。视觉采集路径有显式CUDA同步，不能用状态仿真吞吐替代完整视觉训练速度。
- Motrix快速入门代码为Spot与while True，解释段落却写Go1／1000步；保留正确调用序列，不合成不存在的一份示例。Data页说明派生状态需更新，并在get_pose示例提醒可能滞后一帧。General执行器部分属性不支持。
- Motrix的网页能读到不等于求解器已开源；未取得核心实现。本轮没有推断接触定律、矩阵求解法、线程安全或批量加速保证。完整MJCF支持表未读，明确不写全面兼容。

## 新增归档：固定提交源码

所有以下文件经 `tools.archive_source.archive` 另存，记录追加到 `graph/acquisitions.jsonl`；不改旧raw。UniLab提交 `2a9e8ae635811a7385bb8ac111acb25f8c819a6c`；ManiSkill提交 `ea2e7faf6b37742e0147147ad125b6d114722698`。原文件与官方固定提交URL见表。本轮源码阅读明确限定到函数/行段，没有声称审计整个仓库。

| 文件 | 实际阅读范围（原始代码行） | 官方固定版本 | 不可变快照 |
| --- | --- | --- | --- |
| `src/unilab/cli.py` | 全文1–313 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/cli.py) | `raw/uni-src-unilab-cli-2026-10-04-4ecb9bbab99e.py` |
| `src/unilab/training/run.py` | 全文1–210 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/training/run.py) | `raw/uni-src-unilab-training-run-2026-10-04-e8b1a37b2001.py` |
| `src/unilab/algos/torch/offpolicy/runtime.py` | 全文1–69 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/algos/torch/offpolicy/runtime.py) | `raw/uni-src-unilab-algos-torch-offpolicy-runtime-2026-10-04-8b2465361922.py` |
| `src/unilab/ipc/replay_pipelines/base.py` | 全文1–35 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/ipc/replay_pipelines/base.py) | `raw/uni-src-unilab-ipc-replay-pipelines-base-2026-10-04-c29a1a0abab9.py` |
| `src/unilab/ipc/replay_pipelines/cpu_pinned_double_buffer.py` | 全文1–506 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/ipc/replay_pipelines/cpu_pinned_double_buffer.py) | `raw/uni-src-unilab-ipc-replay-pipelines-cpu-pinned-double-buffer-2026-10-04-fa25d7fa0db0.py` |
| `src/unilab/ipc/weight_sync.py` | 全文1–154 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/ipc/weight_sync.py) | `raw/uni-src-unilab-ipc-weight-sync-2026-10-04-c30e0e96acd3.py` |
| `src/unilab/base/np_env.py` | 全文1–460 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/base/np_env.py) | `raw/uni-src-unilab-base-np-env-2026-10-04-6e050aae710d.py` |
| `mani_skill/envs/sapien_env.py` | 192–346、501–636、648–760、857–979、1018–1168 | [固定提交](https://github.com/haosulab/ManiSkill/blob/ea2e7faf6b37742e0147147ad125b6d114722698/mani_skill/envs/sapien_env.py) | `raw/mani-mani-skill-envs-sapien-env-2026-10-04-459196c27576.py` |
| `mani_skill/envs/tasks/tabletop/push_cube.py` | 全文1–247 | [固定提交](https://github.com/haosulab/ManiSkill/blob/ea2e7faf6b37742e0147147ad125b6d114722698/mani_skill/envs/tasks/tabletop/push_cube.py) | `raw/mani-mani-skill-envs-tasks-tabletop-push-cube-2026-10-04-8ae1536c13fa.py` |
| `mani_skill/agents/controllers/pd_joint_pos.py` | 全文1–259 | [固定提交](https://github.com/haosulab/ManiSkill/blob/ea2e7faf6b37742e0147147ad125b6d114722698/mani_skill/agents/controllers/pd_joint_pos.py) | `raw/mani-mani-skill-agents-controllers-pd-joint-pos-2026-10-04-ce05feb05c43.py` |
| `mani_skill/vector/wrappers/gymnasium.py` | 全文1–199 | [固定提交](https://github.com/haosulab/ManiSkill/blob/ea2e7faf6b37742e0147147ad125b6d114722698/mani_skill/vector/wrappers/gymnasium.py) | `raw/mani-mani-skill-vector-wrappers-gymnasium-2026-10-04-66784e43ea5d.py` |
| `mani_skill/utils/registration.py` | 全文1–261 | [固定提交](https://github.com/haosulab/ManiSkill/blob/ea2e7faf6b37742e0147147ad125b6d114722698/mani_skill/utils/registration.py) | `raw/mani-mani-skill-utils-registration-2026-10-04-5e553c27ed82.py` |
| `scripts/train_offpolicy.py` | 124–261、603–667 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/scripts/train_offpolicy.py) | `raw/uni-scripts-train-offpolicy-2026-10-04-a2df9720cffc.py` |
| `src/unilab/ipc/async_runner.py` | 全文1–171 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/ipc/async_runner.py) | `raw/uni-src-unilab-ipc-async-runner-2026-10-04-d89176296af5.py` |
| `src/unilab/ipc/replay_pipelines/transfer/cuda_like.py` | 全文1–171 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/ipc/replay_pipelines/transfer/cuda_like.py) | `raw/uni-src-unilab-ipc-replay-pipelines-transfer-cuda-like-2026-10-04-5ee97f7b221c.py` |
| `src/unilab/ipc/replay_pipelines/transfer/factory.py` | 全文1–23 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/ipc/replay_pipelines/transfer/factory.py) | `raw/uni-src-unilab-ipc-replay-pipelines-transfer-factory-2026-10-04-091cbc85bfae.py` |
| `src/unilab/algos/torch/offpolicy/double_buffer_runner.py` | 1–216、253–548 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/algos/torch/offpolicy/double_buffer_runner.py) | `raw/uni-src-unilab-algos-torch-offpolicy-double-buffer-runner-2026-10-04-8698233babf0.py` |
| `src/unilab/algos/torch/offpolicy/worker.py` | 114–199、302–611（来源页列出的主段外另读407–449推理调用） | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/algos/torch/offpolicy/worker.py) | `raw/uni-src-unilab-algos-torch-offpolicy-worker-2026-10-04-166ecf2408aa.py` |
| `src/unilab/ipc/replay_buffer.py` | 全文1–215 | [固定提交](https://github.com/unilabsim/UniLab/blob/2a9e8ae635811a7385bb8ac111acb25f8c819a6c/src/unilab/ipc/replay_buffer.py) | `raw/uni-src-unilab-ipc-replay-buffer-2026-10-04-d370c5270b47.py` |

19个代码文件都生成了同名 `graph/extracts/<raw-stem>.md` 阅读缓存。常规提取会合并空行、去尾空白；`train_offpolicy.py` 还遭遇MarkItDown把UTF-8当ASCII的解码失败。已用明确UTF-8解码原始字节重建全部19个fenced Python缓存，逐行核验除围栏和末尾换行外与原始代码一致。原始证据未修改。实际审阅范围仍以表中行段为准，生成全文缓存不代表全文审阅。

GitHub递归树JSON仅在/tmp用于定位文件，没有作为新知识证据归档；没有克隆／安装／运行仓库。运行的Python仅用于下载、归档、缓存和数学例子验算。

## 新增归档：Motrix v0.2.0 文档

| 页面 | 实际阅读 | 官方版本地址 | 不可变快照 |
| --- | --- | --- | --- |
| hello | 正文与全部代码示例，完整缓存 | [v0.2.0](https://motrixsim.readthedocs.io/en/v0.2.0/user_guide/getting_started/hello_motrixsim.html) | `raw/motrixsim-v020-hello-2026-10-04-05fca5e07c64.html` |
| scene-model | 正文与全部代码示例，完整缓存 | [v0.2.0](https://motrixsim.readthedocs.io/en/v0.2.0/user_guide/main_function/scene_model.html) | `raw/motrixsim-v020-scene-model-2026-10-04-85c130e01e5a.html` |
| scene-data | 正文与全部代码示例，完整缓存 | [v0.2.0](https://motrixsim.readthedocs.io/en/v0.2.0/user_guide/main_function/scene_data.html) | `raw/motrixsim-v020-scene-data-2026-10-04-9a5cb93890b4.html` |
| actuator | 正文与全部代码示例，完整缓存 | [v0.2.0](https://motrixsim.readthedocs.io/en/v0.2.0/user_guide/kinematics/actuator.html) | `raw/motrixsim-v020-actuator-2026-10-04-83c0e020e1ef.html` |

四个HTML都用extract_source生成同名Markdown缓存并完整读取。urllib直接请求曾403，改用常规Mozilla User-Agent的curl取得200响应；不是绕过认证或取得私有资料。以原始HTML字节归档，版本为v0.2.0，快照日2026-10-04，未猜发布日期。

## 论文阅读状态：继承与本轮复查分开

前轮完整阅读记录保留在 `graph/review-notes/systems.md`：UniLab42/42页（附录A–C）、MuJoCoUni11/11页、WorldEcho12/12页、轮式分类2011俄译37/37页（733–769）。本轮为教学补强只回看相关原文段落与公式，没有重新宣称全文阅读四篇。关键回看为MuJoCoUni §3.2–3.4、WorldEcho §3.4与式10–13、轮式分类 §VI.A式39–56；教材复核13.3–13.4轮速投影。前轮其他教材相关范围、原始表格视觉校验和版本边界继续有效。

轮式来源仍以1996为原作年、2011为实际已读俄译；未取得1996英文原版，不撤销对译本式56错误来源的不确定性。原实验表、论文归属及实测限定保持，没有新增自行推测的结果数值。

## 验证与交接

- 数学例子用独立标量计算核对：圆弧Δx=.14844237555271378、Δy=.01865254697361316；四段机动Δx=.0004995834721974179、Δy=−.009983341664682815；转向角26.565051177度，与正文舍入一致。
- `uv run python tools/health.py`：本组16页无失效链接、空页、缺失证据、语言或研究结构问题。检查时其他组两页日志待根代理统一，不由本组越权修改。
- 根代理负责统一日志：建议3条来源补充ingest（UniLab14文件／ManiSkill5文件／Motrix4页），以及对应4论文+8概念+地图的教学更新记录；并运行全库构建。
- 内容文件已经停止写入。未复现实验性能／训练／真机，也未对第三方库运行测试。
