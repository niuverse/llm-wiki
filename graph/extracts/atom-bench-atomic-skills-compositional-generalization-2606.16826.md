6
2
0
2

n
u
J

5
1

]

O
R
.
s
c
[

1
v
6
2
8
6
1
.
6
0
6
2
:
v
i
X
r
a

ATOM-Bench: A Real-World Benchmark for Atomic Skills and
Compositional Generalization in Manipulation Policies

Zenan Wu1,2,∗,‡ Bingqing Wei1,2,∗,‡ Lu Liu1,∗ Zheqi He1,† Xi Wang1

Jiakang Liu1

Zehui Li1,2 Guocai Yao1

Jing-Shu Zheng1 Xi Yang1 Yongtao Wang2

1Beijing Academy of Artificial Intelligence

2Peking University

{liulu, zqhe}@baai.ac.cn

Homepage: https://flageval-baai.github.io/AtomBenchPage/

Abstract

Generalist manipulation policies are increasingly presented as foundation models for
robotic control, but their real-world generalization remains difficult to diagnose. A pol-
icy may succeed on demonstrated tasks while still failing to execute fine-grained atomic
skills or recombine learned skills in new task structures. We introduce ATOM-Bench, a
real-world benchmark for evaluating both atomic skills and compositional generalization
in manipulation policies. ATOM-Bench factorizes tabletop manipulation into motor atoms
and instruction atoms, and contains 30 atomic tasks and 24 held-out compositional tasks
across paired single-arm and dual-arm robot tracks. We collect 3,000 human demonstra-
tions for atomic fine-tuning and release both the demonstration data and evaluation rollout
data to support reproducible real-world evaluation. Policies are fine-tuned on atomic tasks
and evaluated on both atomic skill acquisition and held-out compositional tasks. We fur-
ther introduce Atomic Score (AS) and Compositional Failure Share (CFS) to distinguish
failures caused by weak atomic skills from failures caused by limited compositional reuse.
Through 2,700 physical rollouts on five representative manipulation policies, we find that
current policies can acquire simple instruction-grounding skills, but still struggle with fine-
grained motor atoms, counting, and logical filtering. More importantly, strong atomic per-
formance does not reliably transfer to held-out compositional tasks. ATOM-Bench pro-
vides a diagnostic testbed for studying whether failures arise from weak motor execution,
poor instruction grounding, or limited compositional reuse.

1

Introduction

Recent manipulation policies (Black et al., 2025; Physical Intelligence et al., 2025b; Wu et al., 2026; Cai et al.,
2026; Bi et al., 2025; Ye et al., 2026) are increasingly presented as foundation models for robotic control.
They have demonstrated impressive behaviors across common manipulation, long-horizon instruction fol-
lowing, and multi-task learning. These systems suggest an appealing possibility: a robot policy may acquire
reusable physical and semantic skills, and then recombine them to solve new tasks. However, this promise
remains difficult to verify on real robots. Strong demonstrations, high simulation scores, or successful task-
specific fine-tuning do not necessarily show that a policy has learned composable skills rather than task
templates or dataset-specific regularities.

Existing benchmarks make this verification difficult, revealing a growing evaluation tension for manipula-
tion foundation models. Simulation benchmarks provide scale, controllability, and fast iteration, but their
large programmatically generated task distributions can be rapidly absorbed by high-capacity policies,
while their physical challenges remain less demanding than real-world contact, perception, and execution.
As a result, high simulation success increasingly provides limited evidence of deployable real-robot gen-
eralization. Real-world evaluation gives stronger evidence, but it is expensive, difficult to automate, and
hard to scale. Recent real-robot efforts make important progress: RoboArena (Atreya et al., 2025) stud-
ies distributed pairwise policy ranking, AutoEval (Zhou et al., 2025b) reduces human involvement with
learned success classifiers and reset policies, RoboChallenge (Yakefu et al., 2025) builds an online evalua-
tion system for scalable real-robot testing, and GM-100 (Wang et al., 2026) expands real-robot task diversity
with 100 detail-oriented tasks. However, these benchmarks primarily evaluate policies over task suites or

∗Equal contribution.

†Corresponding author and project leader.

‡Work done during an internship at BAAI.

1

Figure 1: Overview of ATOM-Bench. Tabletop manipulation tasks are factorized into motor atoms and
instruction atoms. Policies are fine-tuned on atomic tasks and evaluated on both atomic skill acquisition and
held-out compositional generalization.

ranking protocols. They provide limited control over the skills a policy has seen during adaptation, mak-
ing it difficult to determine whether a model has learned reusable atomic skills that can be transferred to
unseen compositional tasks. ATOM-Bench targets this diagnostic gap by controlling the atomic training
distribution and evaluating both atomic skill acquisition and held-out compositional generalization on real
robots.

We focus on two related questions. First, can current manipulation policies acquire reliable atomic skills, in-
cluding both physical motor skills and language-conditioned instruction skills? Second, after these atomic
skills are learned, can they be recombined to solve held-out compositional tasks that were never demon-
strated during fine-tuning? This setting is more diagnostic than broad task-suite averages, because it lets
us pinpoint where a policy fails rather than only that it fails.

To study these questions, we introduce ATOM-Bench, a real-world benchmark for atomic skills and compo-
sitional generalization in manipulation policies. As illustrated in Figure 1, ATOM-Bench factorizes tabletop
manipulation into motor atoms, which describe physical operations, and instruction atoms, which describe
semantic or logical constraints in language. These atoms are used to build atomic tasks for adaptation and
held-out compositional tasks for evaluation. Policies are fine-tuned on atomic tasks and then evaluated
on both the atomic tasks themselves and held-out compositional tasks that combine multiple motor and
instruction atoms. We further introduce Atomic Score (AS) and Compositional Failure Share (CFS) to sep-
arate failures caused by weak atomic skills from failures caused by compositional failures. ATOM-Bench
contains two paired real-world robot tracks: a single-arm track on Franka Panda and a dual-arm track on
Cobot Magic. Each dual-arm task is designed as the bimanual counterpart of a single-arm task, adding
hand-role assignment, inter-arm coordination, and ordered action sequences.

Our experiments show that atomic skills and compositional generalization remain challenging in different
ways. Atomic tasks that require precise control, such as pouring, reorientation, and pushing, are difficult
for current policies. Instruction atoms that require set-level reasoning, such as counting and exclusion, also
remain challenging. Even when policies acquire useful atomic skills, their performance drops sharply on
held-out compositional tasks. These results suggest that real-world generalization in manipulation policies
remains far from solved. Our contributions are:

• We introduce ATOM-Bench, a real-world robot benchmark with 3,000 human demonstrations across

two robotic platforms.

2

• We design a paired two-track task suite with 30 atomic tasks and 24 compositional tasks, covering

single-arm object-centric manipulation and dual-arm coordinated manipulation.

• We introduce AS and CFS to distinguish atomic-skill deficits from compositional failures.
• We evaluate five representative manipulation policies through 2,700 physical rollouts and show that

both atomic skills and compositional transfer remain challenging.

2 Related Work

Simulated and compositional manipulation benchmarks. Simulation benchmarks provide scalable and
controllable evaluation for robot learning. VIMA-Bench (Jiang et al., 2023), LIBERO (Liu et al., 2023),
and VLABench (Zhang et al., 2024) study multi-task learning, language-conditioned manipulation, long-
horizon execution, and knowledge-intensive reasoning in simulated environments. Recent benchmarks
further show that strong VLA performance can hide memorization and weak compositional generaliza-
tion: VLA-Arena (Zhang et al., 2025), LIBERO-PRO (Zhou et al., 2025a), and RoboHiMan (Chen et al.,
2025) evaluate policies under compositional, visual, language, or task perturbations. These works moti-
vate ATOM-Bench, but they mainly evaluate in simulation or digital-twin settings. ATOM-Bench instead
evaluates both atomic skill execution and compositional generalization directly on physical robots.

Real-world manipulation benchmarks. Real-world benchmarks evaluate policies directly on physi-
cal robots. RoboArena (Atreya et al., 2025) performs distributed pairwise policy comparison, AutoE-
val (Zhou et al., 2025b) automates success scoring and scene resets, RoboChallenge (Yakefu et al., 2025)
provides large-scale online evaluation, and GM-100 (Wang et al., 2026) broadens real-robot task coverage.
SceneReplica (Khargonkar et al., 2024) and FurnitureBench (Heo et al., 2023) emphasize reproducible scenes
and long-horizon assembly. These efforts improve scalability, automation, ranking, reproducibility, or task
diversity. In contrast, ATOM-Bench fine-tunes policies on controlled atomic tasks and evaluates them on
both atomic and held-out compositional tasks, revealing failures in atomic execution and compositional
reuse.

Generalist manipulation policies. Generalist manipulation policies such as the π series (Black et al., 2025;
Physical Intelligence et al., 2025b;a; 2026), OpenVLA (Kim et al., 2025), LingBot-VLA (Wu et al., 2026),
GR00T (NVIDIA et al., 2025; GEAR Team, 2025), SmolVLA (Shukor et al., 2025), Motus (Bi et al., 2025), and
DreamZero (Ye et al., 2026), have shown increasingly strong performance on language-conditioned robot
tasks. However, it remains unclear whether their generalization comes from reusable physical and semantic
skills or from task templates and dataset-specific regularities. ATOM-Bench provides a controlled real-
world protocol for this question by jointly measuring atomic-task performance and held-out compositional
performance under the same adaptation setting.

3 ATOM-Bench

3.1 Task Factorization and Task Groups

ATOM-Bench uses atoms as a practical abstraction for controlled real-robot evaluation. We choose atoms
by summarizing recurring task factors in prior manipulation benchmarks (Yu et al., 2019; Nasiriany et al.,
2024; Luo et al., 2025; Wang et al., 2025; Paulius et al., 2019; 2020; Srivastava et al., 2022; Zhang et al., 2024)
and referring-expression grounding datasets (Kazemzadeh et al., 2014; Mao et al., 2016; Yu et al., 2016). The
selected atoms are common in manipulation tasks, expose different physical or semantic failure modes, can
be reliably instantiated on real robots, and can be recombined into held-out compositional tasks. The full
taxonomy and design rationale are provided in Appendix E.

We divide these factors into two types: motor atoms and instruction atoms. Motor atoms specify the phys-
ical operation required by the task, including pick-and-place, reorientation, pushing, stacking, pouring,
or articulated-object access. Instruction atoms specify how the target object or destination is described in
language, including color, shape, size, source relation, goal destination, counting or exclusion. Instruction
atoms are always evaluated through executable robot tasks, typically with pick-and-place or its bimanual
counterpart as the carrier action.

Based on these atoms, each platform contains 7 instruction-atom tasks, 8 motor-atom tasks, and 12 held-
out compositional tasks. The single-arm and dual-arm task suites are paired: each Cobot Magic task is
designed as the bimanual counterpart of a Franka Panda task, with additional hand-role assignment and

3

Figure 2: Data collection platforms used in ATOM-Bench. Left: the Franka Panda with single-arm. Right:
the Agilex Cobot Magic with dual-arm.

inter-arm coordination. The Motor Set tests one physical skill at a time with minimal semantic ambiguity.
The Instruction Set tests one language constraint at a time under a simple carrier action. The Composition Set
contains held-out tasks that combine one or more motor atoms with multiple instruction atoms.

3.2 Data Collection

We collect data on two robotic platforms: Franka Panda for single-arm tasks and Agilex Cobot Magic for
dual-arm tasks. As shown in Figure 2, the Franka Panda setup uses a 7-DoF Franka Panda arm with a
Robotiq 2F-85 gripper and three Intel RealSense cameras mounted at the left, front, and wrist viewpoints.
The wrist camera is attached with a 3D-printed mount following (Taunyazov et al., 2020).

The Agilex Cobot Magic setup is an open-source dual-arm system built upon Mobile ALOHA (Fu et al.,
2024). It supports coordinated control of two robotic arms and uses three Intel RealSense cameras mounted
at the left-arm, right-arm, and front viewpoints.

For each atomic task, we collect 100 expert demonstrations through human teleoperation. Franka Panda
is controlled with a 3D SpaceMouse, while Agilex Cobot Magic is teleoperated through its master arms.
During teleoperation, we record synchronized observations and robot actions at 30 Hz. In total, we collect
approximately 9 hours of demonstrations on Franka Panda and 12.5 hours on Agilex Cobot Magic.

3.3 Metrics

ATOM-Bench uses five metrics: Success Rate (SR), Process Success Rate (PSR), Atomic Score (AS), Com-
positional Failure Share (CFS), and Transfer Gap (TG). Each task is evaluated over 10 shared physical test
seeds, and results are macro-averaged across tasks.

Success Rate. Success Rate (SR) is the primary task-completion metric. A rollout is counted as successful
only if it satisfies the task completion predicate. SR is the percentage of successful rollouts among all
evaluation trials.

Process Success Rate. Since real-robot failures are often partial, PSR captures intermediate progress. Each
task is annotated with a small set of score points (e.g., select the correct object, reach the target); PSR is the
per-rollout fraction of points achieved, averaged across rollouts.

Atomic Score. For a compositional task X, let A(X) be the set of its participating motor and instruction
atoms. We define the Atomic Score (AS) as the mean PSR of these atoms,

AS(X) =

1
|A(X)|

∑
a∈A(X)

PSR(a).

When an atom has multiple representative atomic tasks, PSR(a) is the mean PSR of those tasks. AS mea-
sures how well the policy performs the required atoms in isolation.

4

Table 1: Atomic skill acquisition under atomic-transfer fine-tuning. Mean SR and PSR (%) over the Motor
and Instruction Sets.

Franka Panda

Cobot Magic

Motor

Instruction

Motor

Instruction

Model

SR

46.2
Pi0.5
36.2
Motus
LingBot-VLA 37.5
28.8
GROOT N1.6
17.5
SmolVLA

PSR

56.2
46.2
46.5
47.1
29.8

SR

94.3
67.1
54.3
57.1
11.4

PSR

95.7
78.7
60.5
69.5
31.2

SR

45.0
35.0
26.2
23.8
10.0

PSR

72.0
59.3
42.8
41.0
32.2

SR

71.4
50.0
21.4
27.1
5.7

PSR

83.2
67.5
47.1
52.1
29.3

Compositional Failure Share. We measure how much of the compositional failure cannot be explained by
weak atomic skills using

CFS(X) =

max(0, AS(X) − PSR(X))
1 − PSR(X)

.

A low CFS means that the failure is mostly explained by weak atomic skills, while a high CFS means that
the required atoms are learned in isolation but fail after composition.

Transfer Gap. TG is the SR difference between single-task and multi-task atomic fine-tuning. Positive TG
favors task specialization, while negative TG favors joint atomic training.

4 Experiments

We design our experiments to evaluate generalist manipulation policies on two axes: atomic skill acqui-
sition and compositional generalization, under a shared real-world adaptation protocol. Our experiments
answer four questions: (1) How well do current policies acquire atomic motor and instruction skills on real
robots? (2) How well do those acquired atomic skills compose into unseen held-out tasks? (3) What are
the dominant failure modes of current policies? (4) How does atomic-transfer fine-tuning compare with
single-task fine-tuning?

4.1 Experimental Setup

We evaluate five manipulation policies in ATOM-Bench: Pi0.5, LingBot-VLA, GROOT N1.6, SmolVLA, and
Motus. Each policy is evaluated on both robotic platforms described in Section 3.2.

We use two fine-tuning protocols. Atomic-transfer fine-tuning is the primary protocol: a single policy is
jointly fine-tuned on all 15 atomic tasks and evaluated on both the atomic tasks and the held-out Compo-
sition Set. Single-task atomic fine-tuning trains an independent checkpoint on the 100 demonstrations of one
atomic task and evaluates it only on that task, serving as a specialization baseline. Because this requires one
training run per atomic task, we report it only for Pi0.5. We also evaluate robustness with perturbations;
details are provided in Appendix C.

For each task, policies are evaluated under 10 fixed physical test seeds with shared initial object place-
ments. We reproduce each seed using a mask-guided placement procedure, as detailed in Appendix B.
Hyperparameters and training details are listed in Appendix D.

4.2 Atomic Skill Acquisition

We first evaluate whether policies can acquire atomic skills under the atomic-transfer protocol and results
are summarized in Table 1 and Figure 3.

Overall, instruction atoms are easier than motor atoms. For example, Pi0.5 reaches 94.3% SR on Franka
Panda instruction atoms and 71.4% SR on Cobot Magic instruction atoms, while its motor SR is only 46.2%
and 45.0%, respectively. This is expected because most instruction atoms are evaluated through simple
carrier actions such as pick-and-place, while motor atoms require the policy to execute the physical skill
itself. Among motor atoms, pick-and-place is clearly the easiest, with a cross-model mean SR of 74%. In

5

Figure 3: Per-atom Success Rate under atomic-transfer fine-tuning. Each bar is one model’s SR over all
tasks instantiating that atom on both platforms.

Franka Panda

Cobot Magic

Model

SR

PSR AS

15.8
Pi0.5
Motus
10.8
LingBot-VLA 3.3
3.3
GROOT N1.6
0.0
SmolVLA

30.4
26.5
12.1
11.6
6.6

83.3
69.3
60.3
66.3
33.3

CFS

73.7
49.4
54.5
61.2
28.3

SR

PSR AS

16.7
7.5
0.0
1.7
0.0

42.6
31.5
24.4
13.7
6.3

79.5
68.5
47.2
48.2
32.5

CFS

56.8
48.3
29.3
38.8
27.3

Table 2: Atomic-to-compositional transfer. Mean SR, PSR, AS, CFS (%) over the Composition Set, per plat-
form. AS is the atomic-baseline ceiling; CFS is the share of compositional failure attributable to composition
rather than to weak atoms.

contrast, access (9%), reorientation (11%), pushing (16%), and pouring (20%) have much lower cross-model
mean SR, showing that precise control and object pose control remain difficult.

Instruction atoms also show different levels of difficulty. Simple visual grounding tasks, such as color,
size, and source relation, achieve higher success rates, while count and exclusion are more challenging.
This suggests that current policies can often use basic visual attributes to select objects, but still struggle
with set-level constraints and logical filtering. Across models, Pi0.5 performs best on both platforms, and
Motus is overall the second-strongest. LingBot-VLA is competitive on Franka Panda motor atoms (37.5%
SR, slightly above Motus) but trails on Cobot Magic; GROOT N1.6 shows mid-pack performance on both
platforms; SmolVLA trails in every setting. Finally, PSR is often higher than SR, especially for motor tasks,
indicating that many failures are partial: policies can complete early stages but fail to satisfy the final success
condition.

4.3 Compositional Generalization

We next evaluate whether learned atomic skills transfer to held-out compositional tasks under the atomic-
transfer protocol. As shown in Table 2, although most models achieve non-trivial AS, their compositional
success rates remain low. Pi0.5 reaches high AS on both Franka Panda and Cobot Magic (83.3% and 79.5%),
yet its compositional SR is only 15.8% and 16.7%. Motus shows the same pattern. LingBot-VLA and
GROOT N1.6 on Franka Panda also have moderate AS (60.3% and 66.3%) that does not translate into com-
positional success (both 3.3% SR). The gap between AS and compositional SR is consistent across models,
showing that learning atomic skills does not automatically yield the ability to recombine them into unseen
tasks.

6

Figure 4: Transfer Gap on paired atomic tasks of Pi0.5. Each point pairs a Franka atom with its dual-arm
counterpart.

Figure 5: Representative failure cases.

CFS further shows that this gap is not only caused by weak atomic skills. Pi0.5 has the highest PSR on both
tracks and the highest CFS as well, indicating that most of its remaining failure comes from composition
itself rather than from unlearned atoms. Motus shows a similar profile with CFS around 48–49% on both
platforms despite a lower atomic ceiling.
In contrast, SmolVLA has both low AS and CFS, suggesting
that its failures are still largely atom-limited. Across models, PSR is consistently higher than SR, showing
that policies often complete some intermediate steps but fail to finish the full compositional task. Overall,
these results suggest that current policies can acquire some useful atomic skills, but still struggle to reliably
compose them in real-world settings.

4.4 Failure Analysis

We further analyze failed rollouts to understand where current policies break down. We annotate each
failed rollout into five types: motor failure (correct object but failed execution), reference failure (wrong object
selection), constraint failure (violating count, exclusion, or other logical constraints), safety abort (human
intervention due to unsafe behavior), and timeout (failure to finish within the time limit).

7

Figure 6: Single-arm vs. dual-arm failure comparison on a paired task. The single-arm rollout completes
the task, whereas the dual-arm counterpart fails midway.

Across all tasks, motor failure, reference failure, and timeout account for over 90% of failures. This suggests
that most failures come from three bottlenecks: physical execution, target grounding, and task progress.
Figure 5 shows representative examples of motor failure and reference failure. Motor failures are common
in tasks that require precise control, such as pouring, reorientation and articulated-object access. Reference
failures are more frequent in tasks involving spatial relations, exclusion, or multiple candidate destinations.

We also compare paired single-arm and dual-arm tasks. The dual-arm tasks are designed as bimanual
counterparts of the single-arm tasks, but they introduce extra requirements such as hand-role assignment,
inter-arm coordination, and longer ordered action sequences, which make them more challenging. As
shown in Figure 6, the Franka Panda single-arm rollout completes the pour-beans task, whereas the Cobot
Magic dual-arm rollout fails to grasp the bowl with the left hand, leaving the pour-and-receive sequence
unexecutable.

4.5 Atomic-transfer vs. Single-task Atomic Fine-tuning

We compare atomic-transfer fine-tuning with single-task atomic fine-tuning on Pi0.5. For each atomic task,
we compute the Transfer Gap (TG) between the single-task checkpoint and the atomic-transfer checkpoint;
negative TG indicates that atomic-transfer performs better. Since the atomic-transfer checkpoint is trained
on all 15 atomic tasks, this comparison should be read as a comparison against a 100-demonstration single-
task baseline rather than a general verdict on single-task training.

Figure 4 shows that the effect depends on both platform and atom type. On Franka Panda, most atoms
have negative TG, suggesting that joint atomic training improves many single-arm skills. This is likely
because these tasks share low-level behaviors such as object localization, grasping, moving, and placing,
while multi-task training provides more data and scene variation than fitting each task separately.

The pattern is more mixed on Cobot Magic. Instruction atoms still mostly benefit from atomic-transfer
training, likely because they share visual-language grounding and target selection.
In contrast, several
bimanual motor atoms have positive TG. These tasks require hand-role assignment, inter-arm coordination,
and precise ordered actions, so single-task fine-tuning can better specialize to the required action pattern.
Overall, atomic-transfer fine-tuning is a strong default for shared instruction grounding and single-arm
manipulation, while complex bimanual motor skills remain more sensitive to task-specific practice.

5 Conclusion

We introduced ATOM-Bench, a real-world benchmark for evaluating atomic skills and compositional gen-
eralization in manipulation policies. ATOM-Bench contains 30 atomic tasks and 24 held-out compositional
tasks across paired single-arm and dual-arm tracks, enabling diagnosis of motor execution, instruction
grounding, and compositional reuse. Through 2,700 physical rollouts on five representative policies, we

8

find that current policies can acquire some useful atomic skills, especially simple instruction-grounding
skills. However, fine-grained motor atoms and instruction atoms that require selecting objects from a set,
such as counting and exclusion remain difficult, and strong atomic performance does not reliably transfer
to held-out compositional tasks. We hope ATOM-Bench helps the community better understand where
manipulation policies fail and supports progress toward more reliable real-world generalization.

6 Limitations

ATOM-Bench is limited by the cost of real-robot evaluation and model fine-tuning. We evaluate five repre-
sentative policies, but do not cover all available VLA and WAM models. Our task suite focuses on common
tabletop manipulation factors that can be reliably instantiated on real robots, and therefore does not cover
many long-tail skills such as deformable-object manipulation, tool use, mobile manipulation, or highly
long-horizon tasks.
In addition, evaluation remains labor-intensive: each rollout requires scene setup,
safety monitoring, and manual score-point annotation. Future work will extend the task coverage and
explore more automated reset, success detection, and annotation tools to scale real-world diagnostic evalu-
ation.

References

Pranav Atreya, Karl Pertsch, Tony Lee, Moo Jin Kim, Arhan Jain, Artur Kuramshin, Cyrus Neary, Edward S
Hu, Kanav Arora, Kirsty Ellis, et al. Roboarena: Distributed real-world evaluation of generalist robot
policies. In Conference on Robot Learning, pp. 336–364. PMLR, 2025.

Hongzhe Bi, Hengkai Tan, Shenghao Xie, Zeyuan Wang, Shuhe Huang, Haitian Liu, Ruowen Zhao, Yao
Feng, Chendong Xiang, Yinze Rong, Hongyan Zhao, Hanyu Liu, Zhizhong Su, Lei Ma, Hang Su, and Jun
Zhu. Motus: A unified latent action world model, 2025. URL https://arxiv.org/abs/2512.13030.

Kevin Black, Noah Brown, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Lachy
Groom, Karol Hausman, Brian Ichter, Szymon Jakubczak, Tim Jones, Liyiming Ke, Sergey Levine, Adrian
Li-Bell, Mohith Mothukuri, Suraj Nair, Karl Pertsch, Lucy Xiaoyang Shi, James Tanner, Quan Vuong,
Anna Walling, Haohuan Wang, and Ury Zhilinsky. π0: A vision-language-action flow model for general
robot control. In Robotics: Science and Systems (RSS), 2025. doi: 10.48550/arXiv.2410.24164.

Rui Cai, Jun Guo, Xinze He, Piaopiao Jin, Jie Li, Bingxuan Lin, Futeng Liu, Wei Liu, Fei Ma, Kun Ma,
et al. Xiaomi-robotics-0: An open-sourced vision-language-action model with real-time execution. arXiv
preprint arXiv:2602.12684, 2026.

Yangtao Chen, Zixuan Chen, Nga Teng Chan, Junting Chen, Junhui Yin, Jieqi Shi, Yang Gao, Yong-Lu Li,
and Jing Huo. Robohiman: A hierarchical evaluation paradigm for compositional generalization in long-
horizon manipulation. arXiv preprint arXiv:2510.13149, 2025.

Zipeng Fu, Tony Z Zhao, and Chelsea Finn. Mobile aloha: Learning bimanual mobile manipulation with

low-cost whole-body teleoperation. arXiv preprint arXiv:2401.02117, 2024.

GEAR Team. GR00T N1.6: An improved open foundation model for generalist humanoid robots. https:
//research.nvidia.com/labs/gear/gr00t-n1_6/, December 2025. NVIDIA Research. Accessed: 2026-
05-25.

Minho Heo, Youngwoon Lee, Doohyun Lee, and Joseph J. Lim. Furniturebench: Reproducible real-world

benchmark for long-horizon complex manipulation. In Robotics: Science and Systems, 2023.

Yunfan Jiang, Agrim Gupta, Zichen Zhang, Guanzhi Wang, Yongqiang Dou, Yanjun Chen, Li Fei-Fei, Anima
Anandkumar, Yuke Zhu, and Linxi Fan. Vima: General robot manipulation with multimodal prompts.
In Fortieth International Conference on Machine Learning, 2023.

Justin Johnson, Bharath Hariharan, Laurens van der Maaten, Li Fei-Fei, C. Lawrence Zitnick, and Ross
Girshick. CLEVR: A diagnostic dataset for compositional language and elementary visual reasoning. In
IEEE Conference on Computer Vision and Pattern Recognition (CVPR), pp. 2901–2910, 2017. URL https:
//cs.stanford.edu/people/jcjohns/clevr/.

9

Sahar Kazemzadeh, Vicente Ordonez, Mark Matten, and Tamara Berg. ReferItGame: Referring to objects
In Proceedings of the 2014 Conference on Empirical Methods in Natural
in photographs of natural scenes.
Language Processing (EMNLP), pp. 787–798. Association for Computational Linguistics, 2014. doi: 10.
3115/v1/D14-1086. URL https://aclanthology.org/D14-1086/.

Ninad Khargonkar, Sai Haneesh Allu, Yangxiao Lu, Balakrishnan Prabhakaran, Yu Xiang, et al.
Scenereplica: Benchmarking real-world robot manipulation by creating replicable scenes. In 2024 IEEE
International Conference on Robotics and Automation (ICRA), pp. 8258–8264. IEEE, 2024.

Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, Ashwin Balakrishna, Suraj Nair, Rafael
Rafailov, Ethan P Foster, Pannag R Sanketi, Quan Vuong, et al. Openvla: An open-source vision-
language-action model. In Conference on Robot Learning, pp. 2679–2713. PMLR, 2025.

Bo Liu, Yifeng Zhu, Chongkai Gao, Yihao Feng, Qiang Liu, Yuke Zhu, and Peter Stone. Libero: Benchmark-
ing knowledge transfer for lifelong robot learning. Advances in Neural Information Processing Systems, 36:
44776–44791, 2023.

Jianlan Luo, Charles Xu, Fangchen Liu, Liam Tan, Zipeng Lin, Jeffrey Wu, Pieter Abbeel, and Sergey Levine.
FMB: A functional manipulation benchmark for generalizable robotic learning. The International Journal
of Robotics Research, 2025. doi: 10.1177/02783649241276017. URL https://journals.sagepub.com/doi/
abs/10.1177/02783649241276017.

Junhua Mao, Jonathan Huang, Alexander Toshev, Oana Camburu, Alan L. Yuille, and Kevin Murphy. Gen-
eration and comprehension of unambiguous object descriptions. In IEEE Conference on Computer Vision
and Pattern Recognition (CVPR), pp. 11–20, 2016. doi: 10.1109/CVPR.2016.9. URL https://arxiv.org/
abs/1511.02283.

Soroush Nasiriany, Abhiram Maddukuri, Lance Zhang, Adeet Parikh, Aaron Lo, Abhijeet Joshi, Ajay Man-
In
dlekar, and Yuke Zhu. Robocasa: Large-scale simulation of everyday tasks for generalist robots.
Robotics: Science and Systems (RSS), 2024. URL https://arxiv.org/abs/2406.02523.

NVIDIA, Johan Bjorck, Nikita Cherniadev Fernando Castañeda, Xingye Da, Runyu Ding, Linxi "Jim" Fan,
Yu Fang, Dieter Fox, Fengyuan Hu, Spencer Huang, Joel Jang, Zhenyu Jiang, Jan Kautz, Kaushil Kun-
dalia, Lawrence Lao, Zhiqi Li, Zongyu Lin, Kevin Lin, Guilin Liu, Edith Llontop, Loic Magne, Ajay
Mandlekar, Avnish Narayan, Soroush Nasiriany, Scott Reed, You Liang Tan, Guanzhi Wang, Zu Wang,
Jing Wang, Qi Wang, Jiannan Xiang, Yuqi Xie, Yinzhen Xu, Zhenjia Xu, Seonghyeon Ye, Zhiding Yu,
Ao Zhang, Hao Zhang, Yizhou Zhao, Ruijie Zheng, and Yuke Zhu. GR00T N1: An open foundation
model for generalist humanoid robots. In ArXiv Preprint, March 2025.

David Paulius, Yongqiang Huang, Jason Meloncon, and Yu Sun. Manipulation motion taxonomy and
coding for robots. In IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), pp. 5596–
5601, 2019. doi: 10.1109/IROS40897.2019.8967754. URL https://arxiv.org/abs/1910.00532.

David Paulius, Nicholas Eales, and Yu Sun. A motion taxonomy for manipulation embedding. In Robotics:

Science and Systems (RSS), 2020. URL https://www.roboticsproceedings.org/rss16/p045.html.

Physical Intelligence, Ali Amin, Raichelle Aniceto, Ashwin Balakrishna, Kevin Black, et al. π∗

0.6: A vla that

learns from experience, 2025a.

Physical Intelligence, Kevin Black, Noah Brown, James Darpinian, Karan Dhabalia, Danny Driess, Adnan
Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Manuel Y. Galliker, Dibya Ghosh, Lachy Groom,
Karol Hausman, Brian Ichter, Szymon Jakubczak, Tim Jones, Liyiming Ke, Devin LeBlanc, Sergey Levine,
Adrian Li-Bell, Mohith Mothukuri, Suraj Nair, Karl Pertsch, Allen Z. Ren, Lucy Xiaoyang Shi, Laura
Smith, Jost Tobias Springenberg, Kyle Stachowicz, James Tanner, Quan Vuong, Homer Walke, Anna
Walling, Haohuan Wang, Lili Yu, and Ury Zhilinsky. π0.5: A vision-language-action model with open-
world generalization. In Conference on Robot Learning (CoRL), 2025b. doi: 10.48550/arXiv.2504.16054.

Physical Intelligence, Bo Ai, Ali Amin, Raichelle Aniceto, Ashwin Balakrishna, et al. π0.7: A steerable

generalist robotic foundation model with emergent capabilities, 2026.

Mustafa Shukor, Dana Aubakirova, Francesco Capuano, Pepijn Kooijmans, Steven Palma, Adil Zouitine,
Michel Aractingi, Caroline Pascal, Martino Russi, Andres Marafioti, et al. Smolvla: A vision-language-
action model for affordable and efficient robotics. arXiv preprint arXiv:2506.01844, 2025.

10

Sanjana Srivastava, Chengshu Li, Michael Lingelbach, Roberto Martín-Martín, Fei Xia, Kent Elliott Vainio,
Zheng Lian, Cem Gokmen, Shyamal Buch, Karen Liu, Silvio Savarese, Hyowon Gweon, Jiajun Wu, and
Li Fei-Fei. BEHAVIOR: Benchmark for everyday household activities in virtual, interactive, and eco-
In Proceedings of the 5th Conference on Robot Learning, volume 164 of Proceedings
logical environments.
of Machine Learning Research, pp. 477–490. PMLR, 2022. URL https://proceedings.mlr.press/v164/
srivastava22a.html.

Tasbolat Taunyazov, Weicong Sng, Hian Hian See, Brian Lim, Jethro Kuan, Abdul Fatir Ansari, Benjamin
C. K. Tee, and Harold Soh. Event-driven visual-tactile sensing and learning for robots. In Proceedings of
Robotics: Science and Systems, Corvalis, Oregon, USA, July 2020. doi: 10.15607/RSS.2020.XVI.020. URL
https://www.roboticsproceedings.org/rss16/p020.pdf.

Yi Ru Wang, Carter Ung, Christopher Tan, Grant Tannert, Jiafei Duan, Josephine Li, Anh Le, Rishabh Os-
wal, Markus Grotz, Wilbert Pumacay, Yuquan Deng, Ranjay Krishna, Dieter Fox, and Siddhartha Srini-
vasa. RoboEval: Where robotic manipulation meets structured and scalable evaluation. arXiv preprint
arXiv:2507.00435, 2025. URL https://arxiv.org/abs/2507.00435.

Ziyu Wang, Chenyuan Liu, Yushun Xiang, Runhao Zhang, Qingbo Hao, Hongliang Lu, Houyu Chen,
Zhizhong Feng, Kaiyue Zheng, Dehao Ye, et al. The great march 100: 100 detail-oriented tasks for evalu-
ating embodied ai agents. arXiv preprint arXiv:2601.11421, 2026.

Wei Wu, Fan Lu, Yunnan Wang, Shuai Yang, Shi Liu, Fangjing Wang, Qian Zhu, He Sun, Yong Wang,

Shuailei Ma, et al. A pragmatic vla foundation model. arXiv preprint arXiv:2601.18692, 2026.

Adina Yakefu, Bin Xie, Chongyang Xu, Enwen Zhang, Erjin Zhou, Fan Jia, Haitao Yang, Haoqiang Fan,
Haowei Zhang, Hongyang Peng, et al. Robochallenge: Large-scale real-robot evaluation of embodied
policies. arXiv preprint arXiv:2510.17950, 2025.

Seonghyeon Ye, Yunhao Ge, Kaiyuan Zheng, Shenyuan Gao, Sihyun Yu, George Kurian, Suneel Indupuru,
You Liang Tan, Chuning Zhu, Jiannan Xiang, Ayaan Malik, Kyungmin Lee, William Liang, Nadun
Ranawaka, Jiasheng Gu, Yinzhen Xu, Guanzhi Wang, Fengyuan Hu, Avnish Narayan, Johan Bjorck, Jing
Wang, Gwanghyun Kim, Dantong Niu, Ruijie Zheng, Yuqi Xie, Jimmy Wu, Qi Wang, Ryan Julian, Danfei
Xu, Yilun Du, Yevgen Chebotar, Scott Reed, Jan Kautz, Yuke Zhu, Linxi "Jim" Fan, and Joel Jang. World
action models are zero-shot policies, 2026. URL https://arxiv.org/abs/2602.15922.

Licheng Yu, Patrick Poirson, Shan Yang, Alexander C. Berg, and Tamara L. Berg. Modeling context in
referring expressions. In European Conference on Computer Vision (ECCV), pp. 69–85, 2016. URL https:
//arxiv.org/abs/1608.00272.

Tianhe Yu, Deirdre Quillen, Zhanpeng He, Ryan Julian, Karol Hausman, Chelsea Finn, and Sergey Levine.
Meta-world: A benchmark and evaluation for multi-task and meta reinforcement learning. In Conference
on Robot Learning (CoRL), 2019. URL https://arxiv.org/abs/1910.10897.

Borong Zhang, Jiahao Li, Jiachen Shen, Yishuai Cai, Yuhao Zhang, Yuanpei Chen, Juntao Dai, Jiaming Ji,
and Yaodong Yang. Vla-arena: An open-source framework for benchmarking vision-language-action
models, 2025. URL https://arxiv.org/abs/2512.22539.

Shiduo Zhang, Zhe Xu, Peiju Liu, Xiaopeng Yu, Yuan Li, Qinghui Gao, Zhaoye Fei, Zhangyue Yin, Zuxuan
Wu, Yu-Gang Jiang, and Xipeng Qiu. VLABench: A large-scale benchmark for language-conditioned
robotics manipulation with long-horizon reasoning tasks. arXiv preprint arXiv:2412.18194, 2024. URL
https://arxiv.org/abs/2412.18194.

Xueyang Zhou, Yangming Xu, Guiyao Tie, Yongchao Chen, Guowen Zhang, Duanfeng Chu, Pan Zhou, and
Lichao Sun. Libero-pro: Towards robust and fair evaluation of vision-language-action models beyond
memorization. arXiv preprint arXiv:2510.03827, 2025a.

Zhiyuan Zhou, Pranav Atreya, You Liang Tan, Karl Pertsch, and Sergey Levine. Autoeval: Autonomous
evaluation of generalist robot manipulation policies in the real world. arXiv preprint arXiv:2503.24278,
2025b.

11

A Task Design

ATOM-Bench instantiates the motor and instruction atoms as concrete real-robot tasks on two platforms.
Each platform has three task groups: a Motor Set that isolates a single motor atom under a minimal, unam-
biguous instruction; an Instruction Set that isolates a single instruction atom under a simple pick-and-place
carrier motor; and a held-out Composition Set that combines one or more motor atoms with two or more
instruction atoms. The two platforms share a paired task design. The single-arm (Franka Panda) tasks
are prefixed m/i/x for the three groups, and the dual-arm (Cobot Magic) tasks are prefixed dm/di/dx. The
two tracks are constructed in one-to-one correspondence, the biggest difference is that the dual-arm ver-
sion additionally requires bimanual coordination. The full task list, with prompts and the atoms each task
instantiates, is given in Tables 3–8.

Table 3: Single-arm Motor Set (m1–m8). Each task isolates one motor atom under a minimal, unambiguous
instruction.

Task_id

Prompt

Instruction_atom

Image

m1

m2

Pick up the cube and place it into the
basket.

pick_place

Pick up the ball and place it into the
basket.

pick_place

m3

Place the bottle upright on the tray.

reorient

m4

Push the cube into the marked area.

push

m5

Pour the coffee beans from the cup
into the bowl.

pour

m6

Open the drawer, then close it.

access

m7

Stack the two cubes.

stack

m8

Open the lid, then close it.

access

12

Table 4: Single-arm Instruction Set (i1–i7). Each task isolates one instruction atom under a pick-and-place
carrier motor.

Task_id

Prompt

Instruction_atom

Image

i1

i2

i3

i4

i5

i6

i7

Pick up the blue cube and place it into
the basket.

color

Pick up the triangular block and place
it into the basket.

shape

Pick up the largest block and place it
onto the tray.

size

Pick up the object to the left of the
cylinder and place it into the basket.

source_relation

Pick up exactly two blocks and place
them into the basket.

count

Pick up the red cube and place it into
the right basket.

goal_destination

Place all non-red objects into the
basket.

exclusion

Table 5: Single-arm Composition Set (x1–x12). Each held-out task combines one or more motor atoms with
two or more instruction atoms.

Task_id

Prompt

Motor_atom Instruction_atoms

Image

x1

x2

Pick up exactly two red cubes
and place them into the basket.

pick_place

color +
count

Pick up the non-red object to
the right of the cylinder and
place it into the basket.

pick_place

source_relation

+
exclusion

Continued on next page

13

Task_id

Prompt

Motor_atom Instruction_atoms

Image

x3

x4

x5

x6

x7

x8

x9

x10

x11

x12

Open the drawer, pick up the
red object to the left of the
cylinder, place it into the basket,
then close the drawer.

Open the drawer, pick up
exactly two blocks, place them
into the right basket, then close
the drawer.

access +
pick_place

color +

source_relation

access +
pick_place

count +

goal_destination

Place the two smallest bottles
upright into the tray.

reorient

count +
size

Place the green bottle upright
onto the right tray.

reorient

color +

goal_destination

Push the non-red block into the
right marked area.

push

exclusion
+

goal_destination

Push the triangular block to the
left of the cylinder into the
marked area.

push

shape +

source_relation

Stack the smallest red cube on
top of the green cube.

stack

color +
size

Stack the triangular block that is
not purple on top of the cube.

stack

shape +
exclusion

Pour the beans from the bean
dish into the small bowl on the
right.

pour

size +

goal_destination

Pour the beans from the brown
bean dish on the left into the
bowl.

pour

color +

source_relation

14

Table 6: Dual-arm Motor Set (dm1–dm8). Bimanual counterparts of the single-arm Motor Set, additionally
requiring two-arm coordination.

Task_id

Prompt

Instruction_atom

Image

dm1

dm2

Pick up the basket with the left hand
and place the cube into the basket
with the right hand.

pick_place

Pick up the basket with the left hand
and place the ball into the basket with
the right hand.

pick_place

dm3

Place the bottles upright on the tray.

reorient

dm4

Push the two cubes into the marked
area.

dm5

dm6

dm7

dm8

Pick up the bowl with the left hand
and pour the coffee beans from the
cup into the bowl with the right hand.

Open the drawer with the left hand,
place the block into the drawer with
the right hand, then close the drawer
with the left hand.
Pick up one cube with the left hand
and another cube with the right hand.
First place the cube in the right hand
at the target position, then stack the
cube in the left hand on top.
Open the box lid with the left hand,
place the block into the box with the
right hand, then close the box lid with
the left hand.

push

pour

access

stack

access

Table 7: Dual-arm Instruction Set (di1–di7). Bimanual counterparts of the single-arm Instruction Set, iso-
lating one instruction atom each.

Task_id

Prompt

Instruction_atom

Image

di1

Pick up the basket with the left hand
and place the blue cube into the basket
with the right hand.

color

Continued on next page

15

Task_id

Prompt

Instruction_atom

Image

di2

di3

di4

di5

di6

di7

Pick up the basket with the left hand
and place the triangular block into the
basket with the right hand.

Pick up the basket with the left hand
and place the largest block into the
basket with the right hand.

Pick up the basket with the left hand
and place the object to the left of the
red cylinder into the basket with the
right hand.

Pick up one cube with each hand and
place exactly two cubes into the same
basket, leaving the remaining cube
outside.

Pick up one cube with the left hand
and place it into the upper basket.
Pick up one cube with the right hand
and place it into the lower basket.

shape

size

source_relation

count

goal_destination

Place all geometric objects except the
red cube into the basket.

exclusion

Table 8: Dual-arm Composition Set (dx1–dx12). Bimanual held-out compositions combining one or more
motor atoms with two or more instruction atoms.

Task_id

Prompt

Motor_atom Instruction_atoms

Image

dx1

dx2

dx3

Pick up one red cube with each
hand and place exactly two red
cubes into the basket.

pick_place

color +
count

Pick up the basket with the left
hand and place the all non-red
objects to the right of the
cylinder into the basket with
the right hand.

Open the drawer with the left
hand, pick up the red cube to
the left of the cylinder with the
right hand, place it into the
basket, then close the drawer
with the left hand.

pick_place

source_relation

+
exclusion

access +
pick_place

color +

source_relation

Continued on next page

16

Task_id

Prompt

Motor_atom Instruction_atoms

Image

dx4

Open the drawer with the left
hand, pick up one block with
each hand, place exactly two
blocks into the right basket,
then close the drawer with the
left hand.

access +
pick_place

count +

goal_destination

dx5

Place the two smallest bottles
upright into the tray.

reorient

count +
size

dx6

dx7

dx8

dx9

dx10

dx11

dx12

Pick up the two green bottles
lying down, one with each
hand, and place them upright in
the right target area, leaving the
bottles of other colors in place.

reorient

color +

goal_destination

Push the block that is not red
into the right marked area.

push

exclusion
+

goal_destination

Push the triangular block to the
left of the cylinder into the
marked area.

push

shape +

source_relation

Place the green cube on top of
the largest blue cube with your
left hand, and put the smallest
red cube onto the green cube
with your right hand.

Pick up the triangular block
with the left hand and pick up a
cube that is not red with the
right hand. First place the cube
at the target position, then stack
the triangular block on top of it.

Pick up the smaller of the two
bowls with the left hand, pick
up the bean dish containing
beans with the right hand, and
pour the beans from the bean
dish into that smaller bowl.

Pick up the bowl with the left
hand, pick up the brown bean
dish with the right hand, and
pour the beans from the brown
bean dish into the bowl.

stack

color +
size

stack

color +
shape +
exclusion

pour

size +

goal_destination

pour

color +

source_relation

17

B Physical Test Seed Placement

Each task is evaluated under 10 fixed physical test seeds, and the same initial object placements must be
reproduced when testing different policies. To achieve this without precise measurement, the reference
scene of each seed is shown as a semi-transparent mask overlaid on the operator’s camera view (Figure 7).
Before every rollout, the operator arranges the physical objects until they align with the mask, so that all
policies are evaluated under approximately the same initial conditions.

Figure 7: Mask-guided object placement. The reference scene of a physical test seed (overlaid as a mask)
lets the operator reproduce the same initial object positions across policies and evaluation runs.

C Robustness to Language and Visual Perturbations

Beyond the atomic-transfer and single-task protocols, we probe whether successful policies remain robust
under simple perturbations. We reuse each policy’s atomic-transfer checkpoint without further fine-tuning,
select the tasks on which it already achieves a high success rate, and re-evaluate it under two perturbation
types: a visual perturbation (changing the background while keeping the scene layout) and a language
perturbation (rewording the instruction while preserving its meaning). This isolates whether a policy relies
on the specific visual and linguistic surface form seen during fine-tuning rather than on the underlying
skill.

Visual perturbations (Perturbed-Vis). We change the tabletop background from the default white cloth
to a brown one while keeping all objects, layout, and lighting fixed. The instruction, score-point rubric, and
physical test seeds remain unchanged.

Language perturbations (Perturbed-Lan). For each selected task, we author a single paraphrase that pre-
serves the underlying skill but changes the surface form. Atom-defining tokens (color, shape, and count
words such as “blue,” “triangular,” “exactly two”), the left/right role assignment, and the temporal or-
dering of multi-stage actions are all preserved verbatim. Surface form is varied along three axes: verb
synonyms within the same motor family (e.g., pick up → grasp/lift/hold; place → drop/put; open/close → pull
open/push shut; pour → tip), role-assignment phrasing (with the left hand → using your left hand), and clause
structure (sentence merging or splitting, pronoun replacement, explicit sequencers). The score-point rubric
and physical test seeds remain unchanged. The paraphrases are listed in Table 9.

Results. We re-evaluate the Pi0.5 atomic-transfer checkpoint on Cobot Magic under both perturbation
types for six tasks — four atomic tasks the policy already solves reliably (di1, di2, dm2, dm6) and two
compositional tasks (dx1, dx12). Figure 8 reports the per-task SR.

On the four atomic tasks, both perturbations have a minimal effect: SR stays at 90–100% across all settings,
indicating that Pi0.5 has learned the underlying atomic skills rather than overfitting to the training back-
ground or wording. On the two compositional tasks, however, robustness drops sharply: dx1 falls from

18

Table 9: Original and language-perturbed (Perturbed-Lan) instructions for the evaluated tasks.

Task Original prompt

Perturbed-Lan prompt

di1

di2

dm2

dm6

dx1

dx12

Pick up the basket with the left hand and place the
blue cube into the basket with the right hand.

Use your left hand to hold the basket, and use your
right hand to drop the blue cube into it.

Pick up the basket with the left hand and place the
triangular block into the basket with the right hand.

Hold the basket with the left hand; with the right
hand, put the triangular block inside.

Pick up the basket with the left hand and place the
ball into the basket with the right hand.

Grasp the basket using the left hand, then drop the
ball into it using the right hand.

Open the drawer with the left hand, place the block
into the drawer with the right hand, then close the
drawer with the left hand.

Pull the drawer open with the left hand, put the
block inside with the right hand, then push the
drawer shut with the left hand.

Pick up one red cube with each hand and place ex-
actly two red cubes into the basket.

Use each hand to grasp one red cube, then place ex-
actly two red cubes into the basket.

Pick up the bowl with the left hand, pick up the
brown bean dish with the right hand, and pour the
beans from the brown bean dish into the bowl.

Lift the bowl with the left hand and the brown bean
dish with the right hand, then tip the beans from the
brown bean dish into the bowl.

Figure 8: Pi0.5 success rate on Cobot Magic under the baseline atomic-transfer protocol, Perturbed-Vis
(brown tablecloth), and Perturbed-Lan (paraphrased instruction). The right-most group is the mean SR
across the six tasks.

60% to 40% under both perturbations, and dx12 falls from 50% to 40% (Perturbed-Vis) and 20% (Perturbed-
Lan). Averaged across the six tasks, the mean SR decreases from 78.3% (baseline) to 76.7% under visual
perturbation and to 71.7% under language perturbation, with the language perturbation being the more
damaging of the two. This pattern suggests that compositional skills are markedly more brittle to surface-
form changes than atomic skills, and that language paraphrasing is a stronger stress test for compositional
generalization than background perturbation.

D SFT Configurations for Models in ATOM-Bench

We fine-tune five models using their official codebases, following the publicly released training recipes
whenever possible. In the atomic-transfer setting, each policy is jointly fine-tuned on all 15 atomic tasks,
with 100 demonstrations per task and 1,500 demonstrations in total. In the single-task setting, which is
reported only for Pi0.5, we fine-tune an independent checkpoint for each atomic task using its 100 demon-
strations.

19

All fine-tuning runs are conducted on NVIDIA H100 GPUs. SmolVLA was fine-tuned with LoRA due to
its smaller model size. Table 10 lists the per-model details in atomic-transfer setting, including the base
checkpoint, fine-tuning mode, optimizer, learning rate, batch size, and number of training steps.

Table 10: Per-model SFT configurations in atomic-transfer.

Model

Base ckpt.

Mode Optimizer

LR

Batch

Steps

pi05_base

Pi0.5
LingBot-VLA lingbot-vla-4b
GROOT N1.6 GR00T N1.6
SmolVLA
Motus

smolvla_base
Motus

pi05_base

Pi0.5
LingBot-VLA lingbot-vla-4b
GROOT N1.6 GR00T N1.6
SmolVLA
Motus

smolvla_base
Motus

Franka Panda

AdamW
full
AdamW
full
full
AdamW
LoRA AdamW
AdamW
full

2.0e-5 (cosine, warmup steps 1000)
2.5e-5 (cosine, warmup ratio 0.25)
1.0e-4 (cosine, warmup ratio 0.05)
1.0e-4 (cosine, warmup steps 1000)
2.0e-5 (linear, warmup steps 1000)

Cobot Magic

full
AdamW
full
AdamW
AdamW
full
LoRA AdamW
AdamW
full

2.0e-5 (cosine, warmup steps 1000)
5.0e-5 (constant)
1.0e-4 (cosine, warmup ratio 0.05)
1.0e-4 (cosine, warmup steps 1000)
2.0e-5 (linear, warmup steps 1000)

256
128
256
256
64

256
256
256
256
64

3 epochs
3 epochs
3 epochs
9 epochs
6 epochs

3 epochs
3 epochs
6 epochs
5 epochs
5 epochs

E Atom Taxonomy and Design Rationale

E.1 Motor Atoms

Table 11 summarizes the motor atoms used in ATOM-Bench. We select these atoms from common physical
operation families in prior manipulation benchmarks and motion taxonomies Yu et al. (2019); Nasiriany
et al. (2024); Luo et al. (2025); Wang et al. (2025); Zhang et al. (2024); Paulius et al. (2019; 2020). They provide
a compact set of real-robot-executable skills for evaluating atomic skill acquisition and compositional reuse.

We separate stack from pick_place because stacking requires stable contact and accurate relative pose
control. We also define access as a functional operation family, covering tasks such as opening, using, and
closing an articulated container.

E.2

Instruction Atoms

Table 12 summarizes the instruction atoms used in ATOM-Bench. We select these atoms from common
semantic and logical constraints in referring-expression grounding, compositional reasoning, and embod-
ied manipulation benchmarks Kazemzadeh et al. (2014); Mao et al. (2016); Yu et al. (2016); Johnson et al.
(2017); Srivastava et al. (2022); Nasiriany et al. (2024); Zhang et al. (2024). Each instruction atom is eval-
uated through an executable robot task, usually with pick-and-place or its bimanual counterpart as the
carrier action.

These atoms cover three roles in a manipulation instruction. color, shape, size, source_relation, and
exclusion specify which object should be manipulated. count specifies how many objects should be ma-
nipulated. goal_destination specifies where the object should be delivered. goal_destination is a goal-
binding atom, which determines where the manipulated object should be delivered.

20

Table 11: Motor atoms in ATOM-Bench. Each atom summarizes a recurring physical operation family used
for real-robot adaptation and held-out compositional evaluation.

Motor Atom Definition

Design Rationale

pick_place

reorient

push

stack

pour

access

Grasp an object and place it into a target con-
tainer or region.
Change an object’s pose or orientation before
completing placement, such as placing a bottle
upright.
Move an object along a support surface to a tar-
get region without necessarily grasping it.
Place one object on top of another object.

Transfer granular or liquid-like contents from
one container to another.
Open, maintain, or close an articulated con-
tainer, such as a drawer, box, or lid.

Foundational tabletop operation and default car-
rier motor for many instruction atoms.
Tests object pose control beyond basic transport.

Captures canonical non-prehensile tabletop ma-
nipulation.
Tests relative-pose precision and contact stabil-
ity.
Tests functional container use and material
transfer.
Tests articulated-object interaction and phase
transitions.

Table 12: Instruction atoms in ATOM-Bench. These atoms summarize recurring semantic and logical con-
straints in language-conditioned manipulation.

Instruction Atom

Definition

Design Rationale

color

shape

size

count

Select the target object according to color.

Select the target object according to geometric
shape.
Select the target object according to relative
size, such as the largest or smallest object.
Manipulate an exact number of objects.

exclusion

source_relation

goal_destination

Select objects by excluding a specified at-
tribute or category.
Select the target object according to its spatial
relation to another reference object.
Bind the action endpoint to one among mul-
tiple candidate destinations or target regions.

Basic attribute for object-level referring ex-
pressions.
Stable visual attribute for tabletop object se-
lection.
Tests comparative attribute grounding.

Tests set-level reasoning and multi-object se-
lection.
Tests logical filtering over candidate objects.

Tests relation-based object reference.

Tests binding between instruction and action
endpoint.

21
