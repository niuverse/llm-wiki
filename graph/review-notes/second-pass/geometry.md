# 第二轮：碰撞几何与接触

日期：2026-10-04。编辑依据 `reading-contract.md` 与 `wiki-research/references/deep-reading.md`。本轮目标是补足理解链，沿用第一轮对六篇 PDF 的完整阅读及证据纠错；本轮没有重复声称把全部 77 页再次全文阅读。所有教学数值和新推导均明确区分于原文实验。未新增概念；未编辑 topic/domain/index/log/overview/规则。

## 逐页修改

| 页面 | 本轮阅读／核查 | 实质改动 |
| --- | --- | --- |
| `contact-models-in-robotics-a-comparative-analysis` | 已有完整复核页；原文 III-A/B、CCP 式（16）–（19）、实验设计相关段落 | 增加 ContactBench 受控比较图；用 μ=0.4、切向速度 1 m/s、步长 1 ms 的教学例解释 0.4 mm 分离位移尺度；说明容差不能消除方程本身的松弛。定位核对为 III-B，不误引图 5 |
| `coacd-approximate-convex-decomposition` | 已有页；原文 6.2–6.4、算法 2、图 9–10 对应说明 | 解释树节点保存部件集合、最差块切割、补齐到同深度再评分、只执行第一刀；新增树结构示意和多凹槽前瞻直觉 |
| `convex-primitive-decomposition-for-collision-detection` | 已有页；原文 3.1/3.2/3.4 的法向矩阵、特征向量、切向修正 | 展开 uᵀQu 的面积加权方向能量；平面例、圆柱轴直觉、法向符号不变性、位置不能从矩阵恢复；增加矩阵／顶点／合并信息流 |
| `dcol-differentiable-collision-detection-for-a-set-of-convex-primitives` | 已有页；原文 III-A/B 尺度定义与六类基元 | 增加双球特例 α=D/(R₁+R₂)、位置梯度、同 α 不同米制间隙和 D=0 退化；保留最优尺度不等于一般欧氏距离的纠错 |
| `diffpills-differentiable-collision-detection-for-capsules-and-padded-polygons` | 已有页；原文 III、附录 A 算法 4–5 | 展开平方得到 FᵀF 的凸 QP；解释九候选；推导安全间隙 s 对应 φ≥2(R₁+R₂)s+s²；增加信息流与有单位数值例 |
| `visacd-visibility-based-gpu-accelerated-approximate-convex-decomposition` | 已有页；原文 3.3–3.5 式（1）–（3）与候选平面 | 增加长度 2/3/5 的同分截边例说明新边被忽略；中点／法向解释旋转等变；增加“并行评价→仅实际切最佳候选”示意 |
| `CollisionGeometryForRobotSimulation` | 完整阅读现有概念，核对几何→动力学接口 | 增加 δτ=δp×f 的作用点误差推导及 1 cm / 10 N 数值例，明确固定力的教学假设 |
| `ApproximateConvexDecomposition` | 完整阅读现有概念，对照 CoACD 原文和两项目实现 | 增加双向 Hausdorff 定义、边界／内部集合区别、空壳与有限采样直觉；明确 V-HACD 百分比阈值与 CoACD 归一化长度阈值不能数值对齐 |
| `DifferentiableCollisionDetection` | 完整阅读现有概念，对照两碰撞论文隐式求导结构 | 增加最优性条件一阶展开到线性系统的推导；用 max(a,0) 凸问题解释活动约束切换；最优值与所选最近点的可微性分开 |
| `ContactModelsInRobotics` | 完整阅读现有概念，对照比较论文 III/IV | 增加同一滑动盒子的模型／算法比较顺序，减少读者把方程差异归因于收敛的混淆 |
| `ContactComplementarity` | 完整阅读现有概念，对照最大耗散定义 | 用 Cauchy–Schwarz 推导滑动摩擦方向；静止时不能由瞬时耗散单独选力 |
| `ContactSolvers` | 完整阅读现有概念，对照局部迭代解释 | 增加二接触 2×2 教学系统，推导 PGS 的局部 ρ² 误差因子与条件数，说明传播耦合却可能收敛慢 |
| `DifferentiablePhysics` | 完整阅读现有概念及已有隐式求导范围 | 以标量不动点迭代解释有限次迭代导数与收敛解导数，避免假装做过跨引擎梯度基准 |
| `coacd-repository` | 下列官方固定提交的 README、接口和关键代码 | 完整重写为调用契约→尺度／预处理→分解／后处理→参数→代码边界；9 文件归档 |
| `v-hacd-repository` | 下列官方固定提交 README、公开头文件相关实现、示例调用 | 完整重写体素误差／递归／合并、填充模式、同步异步与生命周期、真实默认值；3 文件归档 |

## 官方代码版本与实际覆盖

CoACD：`131010c4f03fec375ea88c5c6263f120046cb7f1`，提交日期 2026-09-23。完整阅读 README、`python/package/__init__.py`、`public/coacd.h`、`public/coacd.cpp`、`src/cost.cpp`、`src/preprocess.cpp`；选段阅读 `src/process.cpp` 的流形性／合并／主循环及后处理入口、`src/model_obj.cpp` 的归一化／恢复、`src/mcts.cpp` 的状态与模拟候选评价。不是整个仓库或所有搜索子程序的完整审计。重点定位：Python 70–163；入口 74–118；释放 144–156；合并 351–379；主循环 521–687；归一化 622–666；MCTS 710–738。

V-HACD：`f900e42361491f525262d4825e758845e4969897`，提交日期 2025-09-18。完整阅读 README；`include/VHACD.h` 阅读公开接口约 280–485、工厂接口、VoxelHull 6148–6212、同步入口 7112–7185、体素化与递归 7250–7400、合并 7450–7590、后处理 7650–7720、异步实现 8175–8310；`app/TestVHACD.cpp` 阅读参数解析与创建／等待／取结果／释放生命周期。未逐行阅读约 8,000 行头文件中的全部数学与几何子程序。

两项目只做静态阅读；没有安装、编译、运行第三方代码、计时、内存检测或论文复现实验。所有非 Markdown 代码均用 `uv run python tools/extract_source.py <raw-file>` 建立对应阅读缓存；定位以未改写的原始代码行号为准。

## 新增证据与关键纠错

- CoACD Python/C++ 默认 MCTS 迭代 150；README CLI 表写 100，保留差异，不替代成单一默认。
- CoACD 归一化最长边为 2；真实指标模式是 `0.8*2*threshold/L`，不是纯粹单位换算或严格误差证明。
- CoACD 内部预处理是 OpenVDB SDF 重建；PaMO 只是 README 外部推荐。
- CoACD 最大凸包数只在合并启用时有效，可突破阈值，候选不足时可能未达数量；顶点预算需打开 decimate。
- CoACD 原生释放函数先置空外层指针后 delete[]：静态代码提示未释放最初外层数组，页内明确未做实测，不扩张成未验证的崩溃／性能断言。
- V-HACD 代码最大凸包默认 64，README 写 32；代码体积误差百分比、体素终止与最终数量预算各自独立。
- V-HACD README 命令重复 `-r`；实际 `-h` 才设置凸包数量。
- V-HACD 同步工厂／异步工厂与内部 `m_asyncACD` 并行选项分开说明；`Clean` 与 `Release` 分开。
- 第一轮六论文原链接纠错、实验数值条件、VisACD 原文比较歧义、DCOL 恢复点限制等全部保留。

新增原始证据清单见下表；同名 stem 的代码缓存位于 `graph/extracts/<stem>.md`。URL、获取时间、固定版本和 SHA-256 已追加 `graph/acquisitions.jsonl`。根代理需为两个既有项目页的新增代码证据追加 ingest，并同步项目标题索引／日志；本代理未写共享日志。

| 项目／文件 | 原始快照 |
| --- | --- |
| coacd/README.md | `raw/coacd-readme-md-2026-10-04-1cb2fb0f072d.md` |
| coacd/python/package/__init__.py | `raw/coacd-python-package-init-py-2026-10-04-c5730c358f07.py` |
| coacd/public/coacd.h | `raw/coacd-public-coacd-h-2026-10-04-15187afa8559.h` |
| coacd/public/coacd.cpp | `raw/coacd-public-coacd-cpp-2026-10-04-e45249efce88.cpp` |
| coacd/src/process.cpp | `raw/coacd-src-process-cpp-2026-10-04-ad8be1d839e4.cpp` |
| coacd/src/cost.cpp | `raw/coacd-src-cost-cpp-2026-10-04-54c80f77e698.cpp` |
| coacd/src/mcts.cpp | `raw/coacd-src-mcts-cpp-2026-10-04-3e9115180840.cpp` |
| coacd/src/preprocess.cpp | `raw/coacd-src-preprocess-cpp-2026-10-04-c8ce19b8f00b.cpp` |
| coacd/src/model_obj.cpp | `raw/coacd-src-model-obj-cpp-2026-10-04-cdb47131cb49.cpp` |
| vhacd/README.md | `raw/vhacd-readme-md-2026-10-04-ee8953b3533b.md` |
| vhacd/include/VHACD.h | `raw/vhacd-include-vhacd-h-2026-10-04-c2b750a41bc6.h` |
| vhacd/app/TestVHACD.cpp | `raw/vhacd-app-testvhacd-cpp-2026-10-04-9deb35a89ece.cpp` |

## 可理解性与验证

人工沿 `DiffPills → DifferentiableCollisionDetection → DCOL` 检查：共同隐式微分推导只在概念页详细展开，两论文仍保留自己的优化变量、指标、碰撞判据与几何例子。沿 `CoACD → ApproximateConvexDecomposition → V-HACD 项目` 检查：误差对象、单位和预算差别通过真实语义链接连接，没有把项目实现当作论文的新实验。

`uv run python tools/health.py`：本组无失效链接、证据缺失、语言问题、结构或目录问题；当时唯一相关项为 V-HACD 项目新标题的日志覆盖，由根代理统一追加。其他页日志项属于并行工作。`git diff --check` 本组页面通过。最终全库构建由根代理执行。

未完成范围：未审计 CoACD Unity 分支与 Python CLI 的完整导出实现，未审计 V-HACD 所有几何子程序，未测性能或内存；这不影响本页已静态验证的调用路径与默认值结论。论文第二轮是针对性原文回读和教学补充，第一轮全文覆盖记录见 `graph/review-notes/geometry.md`。
