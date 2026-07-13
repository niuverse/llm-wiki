---
title: "总览"
type: synthesis
tags: [research-dashboard, robotics, embodied-ai]
sources: ["[[contact-models-in-robotics-a-comparative-analysis]]", "[[mujoco-computation-collision-detection]]", "[[isaac-sim-core-api-collision-approximation]]", "[[coacd-approximate-convex-decomposition]]", "[[convex-primitive-decomposition-for-collision-detection]]", "[[visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition]]", "[[dcol-differentiable-collision-detection-for-a-set-of-convex-primitives]]", "[[diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons]]", "[[a-comprehensive-survey-on-world-models-for-embodied-ai]]", "[[awesome-world-models]]", "[[pi07-steerable-generalist-robotic-foundation-model]]", "[[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies]]", "[[nvlabs-robolab]]", "[[lda-1b-scaling-latent-dynamics-action-model]]", "[[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining]]", "[[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation]]", "[[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning]]", "[[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation]]", "[[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors]]", "[[robotics-simulation-infrastructure]]", "[[nvidia-ovrtx]]", "[[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms]]", "[[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence]]", "[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai]]"]
last_updated: 2026-07-13
---

# 总览

这个页面是知识库的研究仪表盘。它不按收录顺序复述来源，而是维护当前知识库支持的研究判断、关键问题、证据强弱和后续缺口。完整问题索引见 [[research-questions|研究 Questions]]。

## 当前总判断

当前知识库的中心判断是：机器人学系统中的模型假设会通过仿真器、碰撞几何、世界模型、策略上下文、训练目标、数据生成契约、工作流与导出契约、传感器与渲染契约、训练运行时契约和基准设计进入下游决策与报告性能。这些假设在温和场景里可能被成功率掩盖，但在富接触动力学、长时域轨迹采样、异构数据、未见任务组合和仿真到现实迁移中会成为一阶失败来源。[[CollisionGeometryForRobotSimulation]] 把这条链条进一步推到接触流程上游：球体、胶囊体、圆柱体、凸包、ACD、SDF 或可微基元会改变接触点、法向量、间隙和求解器约束。[[VIRAL]] 的视觉仿真到现实迁移案例进一步说明，基于 RGB 的人形机器人移动操作迁移不是单一算法问题，而是特权教师策略、视觉学生策略、域随机化、现实到仿真对齐、计算扩展和失败分析的耦合系统。[[GRAIL]] 又把这条链条推到示范数据来源：生成的视频先验只有在已知三维资产、公制相机参数与尺度、深度、交互感知重建、重定向和物理可执行性都成立时，才会变成机器人可用数据。[[AGILE]] 则把人形机器人强化学习的工作流与导出契约纳入同一张图：关节轴、奖励激活、运动诊断、I/O 描述文件和策略导出不匹配也可能造成静默部署失败。[[RoboticsSimulationInfrastructure]] 把链条继续前推：任务/API、资产管理、渲染器、可视化工具和机器学习集成会决定哪些场景容易表达、哪些失败容易发现、多少资源能够留给训练。[[UniLab]] 进一步把训练运行时纳入基础设施层：采集器与学习器的放置、回放边界、主机到设备传输、缓冲和同步会决定机器人 RL 的端到端实际运行效率。[[RTXSensorSimulationPipeline]] 则把渲染器与传感器输出契约具体化：在 ovrtx 中，OpenUSD 组合、RenderProduct/RenderVar 结构规范、DLPack 张量映射、GPU 同步和预热策略都会影响观测张量的含义与可靠性。

这条判断把多类材料连成一条主线。[[ContactModelsInRobotics|机器人学中的接触模型]] 说明底层接触定律与 [[ContactSolvers|求解器]] 不是实现细节，而是任务层级的建模假设；[[WorldModelsForEmbodiedAI|世界模型]] 说明学得的潜在动力学也是一种仿真器，只是失败可能表现为时间漂移、物理一致性弱或对未来状态的误导；[[VisionLanguageActionModels|VLA]] 和 [[RobotContextConditioning|上下文条件化]] 说明机器人基础模型的行为模式由提示、元数据、子目标图像和控制模式共同选择；[[LatentDynamicsActionModels|潜在动力学动作模型]] 与 [[InverseDynamicsModels|逆动力学模型]] 说明数据质量的影响取决于训练目标如何分配数据作用，以及如何把视觉变化转成动作表示；[[TaskGeneralistPolicyEvaluation|任务泛化策略评估]] 说明基准判定条件、语言变体和扰动规程决定哪些失败会被看见；[[HumanoidRLWorkflow|人形机器人强化学习工作流]] 说明即使策略和奖励看起来正常，开发契约仍可能决定仿真到现实迁移是否可靠；[[RoboticsSimulationInfrastructure|仿真基础设施]] 与 [[RTXSensorSimulationPipeline|传感器渲染流程]] 说明场景制作、资产、渲染输出和机器学习循环也会成为研究流程中的隐含假设。[[EmbodiedGen]] 进一步说明，生成式世界只有跨过公制几何、碰撞、物理参数、语义、可供性、接口和可执行验证这些关卡，才会从三维内容变成机器人学习基础设施。

## 研究问题面板

| 问题 | 当前判断 | 主要入口 |
| --- | --- | --- |
| 世界模型对机器人决策的价值在哪里？ | 有价值的世界模型不只是生成合理的未来，而是能改变动作选择、策略表示或评估信号。π0.7 把它用作视觉子目标生成器，LDA-1B 把它用作潜在动力学预训练。 | [[WorldModelsForEmbodiedAI]], [[WorldModelEvaluation]], [[LatentDynamicsActionModels]] |
| 逆动力学模型怎么从视频学动作？ | Seer 在动作标注的机器人数据上联合训练未来 RGB 预测与动作序列预测；DeFI 把 IDM 写成自监督潜在动作表示学习，从当前和未来 DINO 特征重建未来特征，并用 VQ 瓶颈得到潜在动作标记。 | [[InverseDynamicsModels]], [[Seer]], [[DeFI]], [[LatentDynamicsActionModels]] |
| 仿真基准能证明什么？ | 基准更适合作为诊断工具，而不是部署证明。RoboLab 能定位任务、语言、物体、相机和场景敏感性，但真实/仿真代理的有效性仍会随策略与任务族改变。 | [[TaskGeneralistPolicyEvaluation]], [[SimulationSensitivityAnalysis]], [[SimulationRealityGap]] |
| 生成式三维世界什么时候才算可用于机器人学习？ | 视觉合理性不够；还需要公制、物理、语义、可供性和接口完整性，以及仿真器侧的碰撞、沉降、可达性和任务执行验证。 | [[EmbodiedGen]], [[SimulationReady3DWorldGeneration]], [[AgenticSceneTaskGeneration]] |
| 接触求解器选择为什么会影响学习/控制？ | 接触求解器选择会改变力、冲量、能量耗散和收敛残差；这些误差会进入 MPC、RL、系统辨识和可微优化。 | [[ContactModelsInRobotics]], [[ContactComplementarity]], [[ContactSolvers]], [[DifferentiablePhysics]] |
| 碰撞几何选择为什么会影响机器人仿真？ | 碰撞体表示决定候选接触、接触点、法向量和间隙；基元、单一凸包、ACD、SDF 与可微基元在保真度、速度、可编辑性和梯度上有不同取舍。 | [[CollisionGeometryForRobotSimulation]], [[ApproximateConvexDecomposition]], [[DifferentiableCollisionDetection]] |
| 视觉仿真到现实迁移如何跨过仿真—现实差距？ | VIRAL 说明迁移方案至少要同时处理视觉分布、相机几何、手部动力学、蒸馏分布和计算规模；域随机化与现实到仿真对齐是互补项，不是替代项。 | [[VisualSimToReal]], [[VIRAL]], [[SimulationRealityGap]] |
| 人形机器人移动操作示范数据如何规模化？ | GRAIL 说明一条全数字化路线：先指定三维资产、公制场景、相机和按机器人比例设计的人体模型，再用 VFM 先验生成交互，并通过四维人物—物体交互重建、重定向和通用任务跟踪器转成机器人动作数据。 | [[AssetConditionedHOIGeneration]], [[GRAIL]], [[VisualSimToReal]] |
| 异构机器人数据是噪声还是资源？ | 不是数据混杂本身决定成败，而是系统是否显式建模数据作用。π0.7 用运行时上下文引导，LDA-1B 用目标路由和 DINO 潜在动力学。 | [[RobotContextConditioning]], [[LatentDynamicsActionModels]], [[VisionLanguageActionModels]] |
| 人形机器人强化学习从训练到硬件怎样减少静默失败？ | AGILE 把验证、训练、评估和部署导出形式化成工作流契约；关键不是单个新算法，而是提前检查 MDP、记录运行信息、做确定性场景诊断，并用 I/O 描述文件避免导出不匹配。 | [[HumanoidRLWorkflow]], [[AGILE]], [[SimulationRealityGap]] |
| 当前证据最薄弱在哪里？ | 最强证据来自来源特有的基准和消融；最弱环节是跨系统、跨机器人、跨基准的独立复现与真实部署因果验证。 | [[research-questions|研究问题]], [[SimulationRealityGap]] |

## 证据图谱

| 判断层级 | 支持较强的证据 | 证据边界 |
| --- | --- | --- |
| 接触假设影响下游行为 | [[contact-models-in-robotics-a-comparative-analysis|Contact Models in Robotics]] 系统比较 NCP、LCP、CCP、RaiSim 风格模型、PGS、ADMM 和交错投影，并报告颠簸或湿滑地形中的求解器差异更明显。 | 主要证据来自受控仿真与基准；真实机器人迁移仍需要具体任务验证。 |
| 碰撞体表示决定接触输入 | [[mujoco-computation-collision-detection|MuJoCo 碰撞文档]] 说明接触来自几何体并进入约束；[[isaac-sim-core-api-collision-approximation|Isaac Sim Core API 文档]] 列出碰撞近似模式；[[coacd-approximate-convex-decomposition|CoACD]] 报告保留把手凹陷的分解会改变抽屉开启成功率。 | 当前证据组合了官方文档、算法论文和来源特有的基准；跨引擎、机器人与策略的统一碰撞体基准仍缺。 |
| 世界模型评估必须与决策耦合 | [[a-comprehensive-survey-on-world-models-for-embodied-ai|世界模型综述]] 明确区分像素预测、状态理解和任务性能；[[awesome-world-models|AwesomeWorldModels]] 提供面向分类体系的参考文献表。 | 综述提供的是组织框架，不等于每个收录方法都有闭环机器人学证据。 |
| 上下文条件化把数据异构性转成可控行为 | [[pi07-steerable-generalist-robotic-foundation-model|π0.7]] 把任务与子任务语言、元数据、控制模式和子目标图像纳入上下文，展示灵巧性、指令遵循和组合泛化。 | 证据主要来自发布方实验；提示或上下文标签与真实状态不匹配的失败尚需外部验证。 |
| 潜在动力学可以复用质量混合的具身数据 | [[lda-1b-scaling-latent-dynamics-action-model|LDA-1B]] 用策略、正向动力学、逆动力学和视觉预测目标区分高质量示范、低质量轨迹和无动作的第一视角视频。 | DINO 潜在可能漏掉触觉、力、材质或微小接触状态；代码与数据的可复现性仍需跟进。 |
| 端到端 PIDM 可以在机器人数据上扩展 | [[predictive-inverse-dynamics-models-are-scalable-learners-for-robotic-manipulation|Seer]] 用 [FRS] 未来图像标记和 [INV] 动作标记在同一个 Transformer 策略中联合训练，报告 LIBERO、CALVIN 和现实世界 Franka 上的增益。 | 主要依赖动作标注的机器人数据；未来目标是 RGB 像素重建，跨机器人形态证据仍弱。 |
| 逆动力学可以从无动作视频预训练 | [[disentangled-robot-learning-via-separate-forward-and-inverse-dynamics-pretraining|DeFI]] 用 GIDM 从无标签视频迁移学习离散潜在动作标记，并在 CALVIN、SimplerEnv 和现实世界 Franka 上报告增益；失败分析还区分正向与逆动力学瓶颈。 | 潜在动作不等于直接可执行动作；最终语义落地仍依赖机器人动作数据，且 GFDM 的域不匹配会传递到 IDM。 |
| 高保真仿真可以暴露策略敏感性 | [[robolab-a-high-fidelity-simulation-benchmark-for-analysis-of-task-generalist-policies|RoboLab 论文]] 与 [[nvlabs-robolab|NVlabs/RoboLab 代码仓库]] 提供任务库、判定条件、子任务评分、错误物体诊断和敏感性分析流程。 | 仿真代理的有效性不会自动成立；基准成功不能单独证明现实世界可靠性。 |
| 视觉仿真到现实迁移可以支持真实人形机器人部署 | [[viral-visual-sim-to-real-at-scale-for-humanoid-loco-manipulation|VIRAL 项目主页]] 把特权 RL 教师策略、视觉学生策略蒸馏、视觉随机化、手指系统辨识、视场角对齐和计算扩展连接到 Unitree G1 的连续移动操作视频。 | 当前证据来自项目主页和来源特有的视频；完整奖励、架构、消融数值、代码层级可复现性与独立复现仍需后续收录。 |
| 资产条件化生成数据可以减少视频到机器人的歧义 | [[grail-generating-humanoid-loco-manipulation-from-3d-assets-and-video-priors|GRAIL]] 用完整指定的三维配置、VFM 交互先验、公制四维人物—物体交互重建、GMR 重定向和通用任务跟踪器生成人形机器人移动操作数据，并报告 Unitree G1 在现实世界中的拾取与爬楼梯结果。 | 证据来自 arXiv v1 的来源特有基准；项目主页、代码、数据集发布、VFM 可复现性、失败过滤比率和独立复现仍需跟进。 |
| 流程契约可以减少人形机器人仿真到现实迁移失败 | [[agile-a-comprehensive-workflow-for-humanoid-loco-manipulation-learning|AGILE]] 把训练前 GUI 验证、可复现训练、确定性场景评估、运动质量诊断和 YAML I/O 描述文件接成完整的人形机器人强化学习生命周期，并在 Unitree G1 与 Booster T1 任务上报告迁移演示和消融实验。 | 硬件迁移主要是定性演示；移动操作与 VLA 结果主要是仿真闭环成功；更广泛的机器人、任务和定量真实指标还不足。 |
| 仿真基础设施塑造研究流程 | [[robotics-simulation-infrastructure|机器人学仿真基础设施]] 把框架技术栈拆成任务/API、资产管理、物理、渲染、可视化和机器学习，并用资产 API、可视化工具、渲染内存与保真度、位姿抽象说明取舍。 | 来源是工程博客，不是受控基准；框架特定主张需要官方文档、代码仓库快照或定量对比补强。 |
| 生成世界需要仿真就绪契约 | [[embodiedgen-towards-a-generative-3d-world-engine-for-embodied-intelligence|EmbodiedGen V1]] 建立模块化三维生成流程；[[embodiedgen-v2-an-agentic-simulation-ready-3d-world-engine-for-embodied-ai|V2]] 报告资产与世界验收、碰撞成功、可供性消融和智能体式任务世界生成。 | 结果具有来源特异性；跨格式不保证动力学等价，VLM 物理估计不等于系统辨识，策略扩展数字来自配套研究。 |
| 传感器渲染 API 决定观测张量结构 | [[nvidia-ovrtx|NVIDIA ovrtx]] 把 OpenUSD 场景组合、RenderProduct/RenderVar 制作、DLPack 输出、激光雷达/雷达点云通道、GPU 映射、预热和拾取局限写成 SDK 契约。 | 这是官方 API 与来源快照，能支持流程语义；不能单独证明传感器模型准确性、仿真到现实迁移有效性或声称的吞吐量。 |
| 训练运行时架构决定 RL 效率 | [[unilab-a-heterogeneous-architecture-for-robot-rl-beyond-gpu-dominant-paradigms|UniLab]] 把基于仿真的机器人 RL 训练解释为 CPU/GPU 职责分配、采集器与学习器重叠执行、回放边界、主机到设备传输和权重同步的闭环系统问题。 | 证据主要来自来源特有的受控工作站基准；不证明异构运行时总优于驻留 GPU 的仿真，也不证明现实世界策略可靠性。 |

## 关键张力

- 精确性与可用性：更接近刚性接触参考模型的表述物理目标更清楚，但数值难度更高；松弛、启发式规则逐接触点处理和 warm-starting 提高可用性，也可能引入产物。见 [[ContactComplementarity]]、[[ContactSolvers]]。
- 碰撞体保真度与吞吐量/可编辑性：单一凸包和基元快且易编辑，但可能填满任务关键凹度；ACD/SDF 更保真但增加预处理、运行时成本和接触复杂度；可微的基元给梯度，但不是完整接触动力学。见 [[CollisionGeometryForRobotSimulation]]、[[ApproximateConvexDecomposition]]、[[DifferentiableCollisionDetection]]。
- 保真度与决策相关性：世界模型生成未来帧的视觉质量不等于控制价值；对具身智能，更关键的是潜在状态、轨迹采样时域、动作条件化和下游策略/评估是否受益。见 [[WorldModelEvaluation]]。
- 数据规模化与数据作用：更多机器人/人类/视频数据不自动带来更好的策略；π0.7、LDA-1B、Seer 和 DeFI 都把异构性的关键放在条件化、目标路由、未来条件化的逆动力学或逆动力学代理任务，而不是单纯扩大 BC 语料库。见 [[RobotContextConditioning]]、[[LatentDynamicsActionModels]]、[[InverseDynamicsModels]]。
- 基准覆盖范围与部署置信度：RoboLab 这类基准能系统暴露通用任务策略的失效情形，但它仍是测量基底；真实部署还需要验证 sim 失败因素是否在硬件上因果。见 [[TaskGeneralistPolicyEvaluation]]、[[SimulationSensitivityAnalysis]]。
- 结构与可修改性：配置驱动的仿真 APIs 更利于序列化、治理和一致的资产；直接使用 Python 的 APIs 更利于快速制作和实验。这个取舍会影响人类开发者、LLM 场景生成和基准可维护性。见 [[RoboticsSimulationInfrastructure]]。
- 视觉合理性与仿真可用性：生成模型可以产出看起来合理的网格/场景，但机器人学习还要求公制尺度、碰撞体、物理参数、关节语义、可供性、任务约束和稳定的接口；任何一层缺失都可能让内容无法执行或产生静默不匹配。见 [[SimulationReady3DWorldGeneration]]、[[EmbodiedGen]]。
- 传感器契约与不透明的渲染：把传感器输出写成 `RenderProduct` / `RenderVar` / DLPack 契约可以改善可复现性、调试和机器学习集成；但观测张量的物理真实性仍取决于传感器模型、材质语义、标定和验证。见 [[RTXSensorSimulationPipeline]]。
- 驻留 GPU 的耦合与异构重叠：把物理、轨迹采样和学习放在 GPU 执行路径上很有效，但也可能制造加速器资源争用、CUDA 技术栈依赖和重放内存压力；CPU 批量仿真 + GPU 学习只有在运行时能把采集 / 打包 / H2D 隐藏的隐藏在学习器更新时才成立。见 [[HeterogeneousRobotRLTraining]]。
- 算法层面的 novelty 与工作流正确性：AGILE 提示人形机器人强化学习的失败可能来自工作流边界，而不是策略架构本身；关节顺序、历史缓冲区、动作扩展、奖励激活和确定性运动诊断都需要进入开发契约。见 [[HumanoidRLWorkflow]]、[[AGILE]]。
- 生成先验与指标语义落地：GRAIL 把 VFM 当作交互先验，而不是 4D 真值；已知资产、相机、深度和形态可以降低重建歧义，但 VFM 产物、接触力、重定向和硬件动力学仍要单独验证。见 [[AssetConditionedHOIGeneration]]、[[GRAIL]]。
- 可微性与物理真值：可微仿真与可微的渲染让梯度可用，但接触松弛、伪力或学得的动力学产物可能污染梯度方向。见 [[DifferentiablePhysics]]、[[SimulationRealityGap]]。

## 下一步缺口

- 补充独立复现或后续来源：π0.7、LDA-1B、RoboLab、VIRAL 和 AGILE 都有强来源特有的主张，但需要更多外部复现、失败案例或对比评测。
- 追踪 AGILE/WBC-AGILE 的后续硬件报告：当前来源对工作流、评估和消融实验很有价值，但现实世界定量跟踪指标与感知驱动的人形机器人操作仍是明显缺口。
- 追踪 GRAIL 项目页面、代码、数据集和后续报告：当前来源已给出 arXiv v1 的流程、损失项、运行时、基准和现实世界成功比率，但发布产物、失败过滤比率、VFM 版本漂移与独立复现仍是关键缺口。
- 追踪 EmbodiedGen V2 的代码/数据发布、跨仿真器动力学验证、物理参数真实值、可供性端到端基准和配套策略扩展研究；当前论文证明了流程可行性，但没有把仿真可用性升级成物理等价性保证。
- 给世界模型论文建立更结构化收录元数据：时域、输入模态、动作耦合、闭环验证、真实机器人验证、基准、代码/数据可用性。这个需求来自 [[WorldModelEvaluation]] 与 [[AwesomeWorldModels]]。
- 追踪“潜在动力学 + 运行时上下文引导 + predictive 逆动力学”是否会合流：LDA-1B 的目标路由、π0.7 的运行时转向、Seer 的端到端 PIDM 与 DeFI 的解耦的 GFDM/GIDM 看起来互补，但当前来源还没有证明组合系统。
- 对仿真—现实差距保持多层解释：差距不只来自物理引擎参数，也可能来自学得的动力学目标、策略提示/上下文、工作流/导出契约、传感器/渲染契约、基准判定条件和评估汇总。见 [[SimulationRealityGap]]。
- 补充仿真基础设施官方来源：ManiSkill、Isaac Lab、MuJoCo Lab、SAPIEN 和 Viser 的文档/代码仓库快照，可以把当前博客层级设计视角转成更可维护的实现笔记。见 [[RoboticsSimulationInfrastructure]]。
- 补充机器人 RL 训练系统来源：MuJoCoUni、MotrixSim、UniLab 代码仓库、mjlab / MjWarp、MuJoCo Playground、Isaac Lab 和 ManiSkill3 的官方文档/代码仓库快照，可以把 [[HeterogeneousRobotRLTraining]] 从单篇系统论文扩展成可比较的运行时分类体系。
- 补充引擎特定的碰撞体基准：同一资产的胶囊体 / 基元 / 凸包 / CoACD / VisACD / SDF 碰撞体在 MuJoCo、Isaac Sim / PhysX、Bullet、Drake 中对接触数量、求解器残差、训练吞吐量、操作成功和仿真到现实迁移的影响仍缺系统比较。
