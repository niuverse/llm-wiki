| RoboLab: |     |     | A        | High-Fidelity |        |              |           | Simulation  |     |                 | Benchmark |     |     |     |
| -------- | --- | --- | -------- | ------------- | ------ | ------------ | --------- | ----------- | --- | --------------- | --------- | --- | --- | --- |
|          |     | for | Analysis |               |        | of           | Task      | Generalist  |     |                 | Policies  |     |     |     |
|          |     |     |          | Xuning        | Yang1, | Rishit       | Dagli2,4, | Alex Zook1, |     | Hugo Hadfield1, |           |     |     |     |
|          |     |     | Ankit    | Goyal1,       | Stan   | Birchfield1, | Fabio     | Ramos1,3,   | and | Jonathan        | Tremblay1 |     |     |     |
1NVIDIA, 2University of Toronto, 3The University of Sydney, 4Work done during internship at NVIDIA
6202 rpA 41  ]OR.sc[  2v06890.4062:viXra
Fig. 1: OverviewofRoboLab.RoboLabaddressesthesimulation-to-realgapbyevaluatingroboticspoliciesonentirelyheld-outdomains.By
featuring a streamlined generation pipeline for new scenes and tasks (top row), RoboLab enables rapid extensibility for testing generalization
capabilities. Our accompanying benchmark introduces visual, relational, and procedural testing axes, paired with robust metrics designed to
reveal how modern models perform when faced with novel, out-of-distribution challenges (bottom row).
Abstract—The pursuit of general-purpose robotics has yielded performance gap in current state-of-the-art models. By providing
impressivefoundationmodels,yetsimulation-basedbenchmarking granularmetricsandascalabletoolset,RoboLaboffersascalable
remains a bottleneck due to rapid performance saturation and framework for evaluating the true generalization capabilities of
a lack of true generalization testing. Existing benchmarks often task-generalist robotic policies.
exhibitsignificantdomainoverlapbetweentrainingandevaluation,
| trivializing | success  | rates | and obscuring |     | insights     | into | robustness. |     |     |     |              |     |     |     |
| ------------ | -------- | ----- | ------------- | --- | ------------ | ---- | ----------- | --- | --- | --- | ------------ | --- | --- | --- |
|              |          |       |               |     |              |      |             |     |     | I.  | INTRODUCTION |     |     |     |
| We introduce | RoboLab, |       | a simulation  |     | benchmarking |      | framework   |     |     |     |              |     |     |     |
designed to address these challenges. Concretely, our framework The pursuit of generality has been a longstanding challenge
is designed to answer two questions: (1) to what extent can we inmodernrobotics.Recentadvanceshaveproducedimpressive
| understand | the | performance | of  | a real-world |     | policy by | analyzing |     |     |     |     |     |     |     |
| ---------- | --- | ----------- | --- | ------------ | --- | --------- | --------- | --- | --- | --- | --- | --- | --- | --- |
generalistrobotpoliciesthatdemonstratesuccessinchallenging
| its behavior | in  | simulation, | and | (2) which | external | factors | most |           |       |        |             |         |      |           |
| ------------ | --- | ----------- | --- | --------- | -------- | ------- | ---- | --------- | ----- | ------ | ----------- | ------- | ---- | --------- |
|              |     |             |     |           |          |         |      | and novel | tasks | in the | real-world. | Despite | this | progress, |
stronglyaffectthatbehaviorundercontrolledperturbations.First,
RoboLab enables human-authored and LLM-enabled generation benchmarksforevaluatingwhetherthesepoliciesaretrulytask-
of scenes and tasks in a robot- and policy-agnostic manner general has been slow. Evaluating models in the real world
within a physically realistic and photorealistic simulation. With remains prohibitively expensive and logistically intractable,
| this, we          | propose     | the RoboLab-120 |            | benchmark,       |       | consisting | of 120      |            |              |         |                  |     |            |       |
| ----------------- | ----------- | --------------- | ---------- | ---------------- | ----- | ---------- | ----------- | ---------- | ------------ | ------- | ---------------- | --- | ---------- | ----- |
|                   |             |                 |            |                  |       |            |             | motivating | the          | rise of | simulation-based |     | benchmarks | as an |
| tasks categorized |             | into three      | competency |                  | axes: | visual,    | procedural, |            |              |         |                  |     |            |       |
|                   |             |                 |            |                  |       |            |             | appealing  | alternative. |         |                  |     |            |       |
| relational        | competency, |                 | across     | three difficulty |       | levels.    | Second, we  |            |              |         |                  |     |            |       |
introduceasystematicanalysisofreal-worldpoliciesthatquantify Currentroboticsbenchmarks[19,35,11,16]faceseveralcrit-
both their performance and the sensitivity of their behavior to icallimitations:(1)alackofhigh-fidelitysimulationcapableof
controlled perturbations, indicating that high-fidelity simulation supportingreal-worldpolicies;(2)rapidperformancesaturation
canserveasaproxyforanalyzingperformanceanditsdependence
onstatictasksets;and(3)alackofgranularanalysisregarding
| on external | factors. | Evaluation |     | with RoboLab |     | exposes | significant |        |         |        |               |         |            |      |
| ----------- | -------- | ---------- | --- | ------------ | --- | ------- | ----------- | ------ | ------- | ------ | ------------- | ------- | ---------- | ---- |
|             |          |            |     |              |     |         |             | policy | failure | modes. | For instance, | popular | benchmarks | like |

Fig. 2: Three approaches for robotic benchmarks. LEFT: To date, pure simulation based benchmarks have exhibited low visual quality,
creating a large sim2real transfer gap. MIDDLE: Real2sim benchmarks address this issue by using techniques to bring real-world visual
texture into simulation. However, these environments are extremely costly with reported per-scene generation time of ∼1hr [10]. RIGHT: Our
| approach | achieves   | a high degree | of     | realism   | with low     | overhead. |     |             |     |     |     |     |     |     |     |
| -------- | ---------- | ------------- | ------ | --------- | ------------ | --------- | --- | ----------- | --- | --- | --- | --- | --- | --- | --- |
| LIBERO   | [19] often | utilize       | nearly | identical | environments |           | for | difficulty. |     |     |     |     |     |     |     |
both training and evaluation. When policies are fine-tuned In summary, our contributions are:
on these simulation-specific demonstrations, the lack of a 1) RoboLab: A novel simulation platform designed for
meaningful domain gap trivializes the evaluation process and evaluating modern robotics policies with a scalable, LLM-
| obscures | the model’s | true | generalization |     | capabilities. |     | Many |       |          |     |         |                 |     |            |      |
| -------- | ----------- | ---- | -------------- | --- | ------------- | --- | ---- | ----- | -------- | --- | ------- | --------------- | --- | ---------- | ---- |
|          |             |      |                |     |               |     |      | based | workflow |     | capable | of procedurally |     | generating | over |
existingplatformshavelimitedrealismoraredifficulttoextend 800 unique scenes and tasks using human-readable USD
| due to using | rigid        | architectures |     | that make | it        | cumbersome |     | to             |        |            |     |               |     |     |             |
| ------------ | ------------ | ------------- | --- | --------- | --------- | ---------- | --- | -------------- | ------ | ---------- | --- | ------------- | --- | --- | ----------- |
|              |              |               |     |           |           |            |     | and            | Python | interfaces | in  | IsaacLab[21]. |     |     |             |
| introduce    | new objects, | tasks,        | or  | robots    | (Fig. 2). |            |     |                |        |            |     |               |     |     |             |
|              |              |               |     |           |           |            |     | 2) RoboLab-120 |        | Benchmark: |     | Comprising    |     | 120 | tasks eval- |
To address these limitations, we present RoboLab (Fig. 1), uated across three distinct competency axes (visual,
a simulation platform and benchmarking suite designed for procedural, relational) and supported by four new robust-
rigorous robotics evaluation. Unlike prior benchmarks that ness metrics. We also present five policies evaluated on
| rely on PDDL | or  | rigid scene-graph |     | definitions |     | [19], RoboLab |     |     |     |     |     |     |     |     |     |
| ------------ | --- | ----------------- | --- | ----------- | --- | ------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
RoboLab-120.
introducesaneasy-to-useinterfacethatenableshuman-authored 3) Policy Analysis: We introduce a suite of analysis tools
and LLM-scaled scene and task generation. RoboLab enables that gives insight into the model performance beyond
generation and validation of new scenes and tasks from natural binary success rates and broader understanding of policy
| language    | prompts.  | This | system         | enables | the       | creation | of over  | performance. |     |     |     |     |     |     |     |
| ----------- | --------- | ---- | -------------- | ------- | --------- | -------- | -------- | ------------ | --- | --- | --- | --- | --- | --- | --- |
| 800 diverse | scenarios | (see | supplemental), |         | providing | a        | scalable |              |     |     |     |     |     |     |     |
framework that mitigates benchmark saturation and ensures II. RELATEDWORK
| long-term       | value.     |       |           |           |            |                 |         |                  |             |              |              |           |            |               |            |
| --------------- | ---------- | ----- | --------- | --------- | ---------- | --------------- | ------- | ---------------- | ----------- | ------------ | ------------ | --------- | ---------- | ------------- | ---------- |
|                 |            |       |           |           |            |                 |         | Simulation-Based |             | Benchmarks.  |              |           | Simulation |               | provides a |
| RoboLab         | introduces | novel | task      | axes      | and robust | metrics         |         | to               |             |              |              |           |            |               |            |
|                 |            |       |           |           |            |                 |         | scalable         | and         | reproducible | environment  |           | for        | evaluating    | robot      |
| provide deeper  | diagnostic |       | insights, | paired    | with       | a streamlined   |         |                  |             |              |              |           |            |               |            |
|                 |            |       |           |           |            |                 |         | manipulation     |             | policies.    | Widely       | used      | benchmarks |               | such as    |
| toolset for     | generation | of    | scenes    | and tasks | (see       | Fig. 1)..       | To pro- |                  |             |              |              |           |            |               |            |
|                 |            |       |           |           |            |                 |         | RLBench          | [11],       | MetaWorld    |              | [33], and | robosuite  |               | [36], Man- |
| vide a granular | assessment |       | of policy | behavior  |            | in our proposed |         |                  |             |              |              |           |            |               |            |
|                 |            |       |           |           |            |                 |         | iSkill2          | [7], CALVIN |              | [20], LIBERO |           | [19],      | and BEHAVIOR- |            |
benchmark,weevaluatethreeaxes:Visual(perceptualattributes
|            |                     |            |            |                  |          |                |      | 1K [15],           | offer | standardized | task        | suites | for learning  |     | and evalua- |
| ---------- | ------------------- | ---------- | ---------- | ---------------- | -------- | -------------- | ---- | ------------------ | ----- | ------------ | ----------- | ------ | ------------- | --- | ----------- |
| like color | and size),          | Procedural |            | (action-oriented |          | logic          | such | as                 |       |              |             |        |               |     |             |
|            |                     |            |            |                  |          |                |      | tion in simulation |       | across       | pre-defined |        | task families |     | and object  |
| stacking   | and reorientation), |            | Relational |                  | (spatial | and linguistic |      |                    |       |              |             |        |               |     |             |
configurations.However,inthesesettings,policiesaretypically
| logic like | “and/or”) | spanning |     | across | three | difficulty | levels |         |               |     |        |      |           |               |     |
| ---------- | --------- | -------- | --- | ------ | ----- | ---------- | ------ | ------- | ------------- | --- | ------ | ---- | --------- | ------------- | --- |
|            |           |          |     |        |       |            |        | trained | and evaluated |     | in the | same | simulated | environments, |     |
dependingontasklengthandlanguagenuance.Policyexecution
|          |          |                |     |      |         |           |      | which encourages |           | overfitting |     | to simulator-specific |     |            | quirks, leads |
| -------- | -------- | -------------- | --- | ---- | ------- | --------- | ---- | ---------------- | --------- | ----------- | --- | --------------------- | --- | ---------- | ------------- |
| on these | tasks is | then evaluated |     | with | metrics | on graded | task |                  |           |             |     |                       |     |            |               |
|          |          |                |     |      |         |           |      | to rapid         | benchmark | saturation, |     | and makes             |     | real-world | general-      |
completion,failureanderroroccurrences,andtrajectoryquality.
|             |           |       |         |     |             |           |     | ization hard | to  | assess. | [35]. In | our setting, | policies |     | are instead |
| ----------- | --------- | ----- | ------- | --- | ----------- | --------- | --- | ------------ | --- | ------- | -------- | ------------ | -------- | --- | ----------- |
| Finally, we | highlight | novel | metrics | for | evaluation; | including |     |              |     |         |          |              |          |     |             |
trainedonlarge-scalereal-worlddata(e.g.,DROID[13]),while
| sensitivity     | analysis  | to identify | environmental |            | factors      | that         | most    |               |            |             |                |         |                 |            |            |
| --------------- | --------- | ----------- | ------------- | ---------- | ------------ | ------------ | ------- | ------------- | ---------- | ----------- | -------------- | ------- | --------------- | ---------- | ---------- |
|                 |           |             |               |            |              |              |         | high-fidelity | simulation |             | is used        | only    | as a controlled |            | evaluation |
| strongly        | influence | policy      | performance,  |            | e.g., camera | placement.   |         |               |            |             |                |         |                 |            |            |
|                 |           |             |               |            |              |              |         | environment,  | so         | training    | and evaluation |         | domains         | are        | decoupled  |
| We introduce    | the       | RoboLab-120 |               | benchmark, |              | comprising   | 120     |               |            |             |                |         |                 |            |            |
|                 |           |             |               |            |              |              |         | and measured  |            | performance | more           | closely | reflects        | robustness | in         |
| tasks generated | via       | our         | automated     | workflow   |              | and verified | by      |               |            |             |                |         |                 |            |            |
|                 |           |             |               |            |              |              |         | the real      | world.     |             |                |         |                 |            |            |
| humans.         | These     | tasks span  | varying       |            | difficulties | (65          | simple, |               |            |             |                |         |                 |            |            |
38 moderate, 18 complex) and multiple competency axes Real-to-sim Evaluation. Recent work have focused on
(44 relational, 91 visual, and 36 procedural). To prevent leveraging 3D reconstruction to build photorealistic simulation
overfitting to the simulation domain, we evaluate policies scenes from real-world videos in order to achieve closer visual
trainedexclusivelyonthereal-worldDROID[13]dataset.This alignment between simulation and real world photorealism
creates an environment that reflects “in the wild” conditions; [16, 12, 10, 37]. These works typically use Gaussian splatting,
for instance, the state-of-the-art π 0.5 [9] achieves only a ∼30% 3D segmentation, and multi-view inpainting, often operated
success rate on RoboLab-120, highlighting the benchmark’s at a per-scene level, which entails costly optimization and

Fig. 3: Task progression of a few tasks, illustrating errors encountered during policy rollout.Toprow:Althoughthetaskissuccessfully
completed, errors were encountered during execution: 1) The robot drops the milk jug too early, missing the bin. 2) the robot grasps an
orange (wrong object) and puts it in the bin. Mid row: An extraneous object was reoriented before the actual intended object. Final row:
Intended objects were attempted unsuccessfully, and the policy tended to two wrong other objects.
makes it slow to scale beyond a small number of environments taxonomic decomposition enables fine-grained analysis of
[10, 34, 28]. In contrast, our framework produces large-scale, policy capabilities by systematically assessing performance.
photorealisticscenesandtaskswithinminutesratherthanhours, Figure 4 shows examples of these questions accompanied by
| while preserving |     | sufficient | geometric | and | visual | fidelity | for scene examples. |     |     |     |     |     |     |     |
| ---------------- | --- | ---------- | --------- | --- | ------ | -------- | ------------------- | --- | --- | --- | --- | --- | --- | --- |
policy evaluation, thereby making real-to-sim benchmarking Visual Competency: Assesses recognition of color, semantics,
practical at the scale needed for modern generalist robot and size, capturing the policy’s capability to link perceptual
| policies. |     |     |     |     |     |     | attributes | with | higher-level | reasoning. |     |     |     |     |
| --------- | --- | --- | --- | --- | --- | --- | ---------- | ---- | ------------ | ---------- | --- | --- | --- | --- |
ProceduralCompetency:Evaluatestheabilitytoperformtasks
|            |             |     | III. ROBOLAB |          |          |     |                |                 |              |            |     |           |              |     |
| ---------- | ----------- | --- | ------------ | -------- | -------- | --- | -------------- | --------------- | ------------ | ---------- | --- | --------- | ------------ | --- |
|            |             |     |              |          |          |     | that involve   | action-oriented |              | reasoning, |     | including | affordances, |     |
| Evaluating | real-world, |     | generalist   | robotics | policies | in  | simu-          |                 |              |            |     |           |              |     |
|            |             |     |              |          |          |     | reorientation, |                 | or stacking. |            |     |           |              |     |
lation remains a significant challenge. RoboLab is a bench- Relational Competency: Tests understanding of language con-
| marking        | framework | that | introduces | three      | novel    | task axes | and       |        |               |           |        |             |                |     |
| -------------- | --------- | ---- | ---------- | ---------- | -------- | --------- | --------- | ------ | ------------- | --------- | ------ | ----------- | -------------- | --- |
|                |           |      |            |            |          |           | junctions | (e.g., | ‘and’, ‘or’), | counting, |        | and spatial | relationships, |     |
| three original | metrics   |      | tailored   | for modern | robotics | systems.  |           |        |               |           |        |             |                |     |
|                |           |      |            |            |          |           | measuring | how    | effectively   | the       | policy | interprets  | multi-object   |     |
RoboLab enables a multifaceted analysis of Vision-Language- instructions and scene structure.
| Action (VLA) |     | models, | providing | deeper | insights | into | their      |       |              |     |          |     |                  |     |
| ------------ | --- | ------- | --------- | ------ | -------- | ---- | ---------- | ----- | ------------ | --- | -------- | --- | ---------------- | --- |
|              |     |         |           |        |          |      | Tasks from | these | competencies |     | can span | one | of the following |     |
scalability and task generalization. difficulty levels: simple, medium, complex. These are deter-
A. RoboLab-120 minedasafunctionoftwoaspects:whetherifthelanguagewas
|                     |             |       |               |       |             |               | straightforward |           | in describing |     | the task, | as well | as the | number |
| ------------------- | ----------- | ----- | ------------- | ----- | ----------- | ------------- | --------------- | --------- | ------------- | --- | --------- | ------- | ------ | ------ |
| Inspired            | by the      | Large | Language      | Model | (LLM)       | community’s   |                 |           |               |     |           |         |        |        |
|                     |             |       |               |       |             |               | of required     | reasoning | steps         | for | the task. |         |        |        |
| use of Visual       | Question    |       | and Answering | (VQA) | benchmarks, |               | we              |           |               |     |           |         |        |        |
| introduce           | RoboLab-120 |       | Benchmark     | that  | focus       | on evaluating |                 |           |               |     |           |         |        |        |
|                     |             |       |               |       |             |               | B. Metrics      | for       | Evaluation    |     |           |         |        |        |
| specific competency |             | axes  | spanning      | three | difficulty  | levels.       | This            |           |               |     |           |         |        |        |
Weestablishacomprehensivesuiteofevaluationmetricsthat
capturesthefullspectrumofpolicyperformancecharacteristics.
|     |     |     |     |     |     |     | While task | success | rate         | remains | a fundamental |         | metric,        | prior |
| --- | --- | --- | --- | --- | --- | --- | ---------- | ------- | ------------ | ------- | ------------- | ------- | -------------- | ----- |
|     |     |     |     |     |     |     | work [14]  | has     | demonstrated |         | that they     | fail to | reveal nuanced |       |
aspectsofpolicybehaviorandfailuremodes.Unlikeapproaches
|     |     |     |     |     |     |     | relying        | on human | judgment      | [12],           | we         | define  | a set of     | discrete |
| --- | --- | --- | --- | --- | --- | --- | -------------- | -------- | ------------- | --------------- | ---------- | ------- | ------------ | -------- |
|     |     |     |     |     |     |     | and continuous |          | metrics       | to characterize |            | policy  | performance. | We       |
|     |     |     |     |     |     |     | regroup        | these    | novel metrics |                 | as follow, | failure | cases        | scoring, |
|     |     |     |     |     |     |     | trajectory     | metrics, | and           | sensitivity     | analysis.  |         |              |          |
Fig. 4: Example of language instructions in RoboLab-120. Failure cases. In addition to success rate, we compute

Fig. 5: Comparison of policy performance for bowl-in-bin manipulation. Rows represent distinct policies shown in chronological order (left
to right). Successful execution involves grasping the central red bowl and depositing it into the gray bin on the right. Unsuccessful attempts
are characterized by aimless arm trajectories and a lack of object interaction.
a normalized graded score Sc(T) = 1 (cid:80) Sc(τ). For C. Sensitivity Analysis
|T| τ∈T
example, for the instruction “pick the lemon and the lime,” the
We present a Bayesian framework for evaluating policy
subtasks τ “pick lemon” and “pick lime” includes steps such
robustness across diverse environmental conditions using
as “grasp” and “drop”. The final task score is the normalized
Simulation-Based Inference (SBI). This analysis provides
subtask scores. Our benchmark automatically records instances
insight into which scene parameters are most strongly linked
of events; including wrong object grasped, object dropped, and
to success and failure outcomes by learning an approximate
gripper collisions. Fig. 3 demonstrates a successful episode;
posterior distribution over them given evaluation data. Let
however, the policy incorrectly grasped an extraneous object.
θ =(θcont,θdisc)denotetheenvironmentparameterscomprising
Sucherrorshighlightpotentialbiasesinthepolicynotcaptured
of continuous variables (e.g., object distance, camera displace-
by other metrics.
ment)and/ordiscretevariables.Afterevaluatingpolicyπ under
varied conditions, we generate episodes D = {(θ ,x )}N
Trajectory Metrics. Trajectory quality metrics capture char- i i i=1
with observed outcomes x (e.g., task success). The posterior
acteristics of motion efficiency and optimality. We compute i
distribution p(θ | x) ∝ p(x | θ)p(θ) is approximated
the following: Spectral arc-length (SPARC), which evaluates
using Mixed Neural Posterior Estimation (MNPE), which
motion smoothness [2] via the arc length of the normalized
trains a neural density estimator q (θ | x) to directly learn
Fourier magnitude spectrum of the velocity profile. Given a ϕ
the mapping from observations to parameter distributions.
speed profile v(t) of the end effector over time interval [0,T]
The resulting posterior q (θ | x) characterizes which scene
ϕ
variables are most associated with a target observation x. Our
(cid:118) approach provides systematic assessment of which variables
(cid:90) ωc (cid:117) (cid:117) (cid:18) 1 (cid:19)2 (cid:32) dVˆ(ω) (cid:33)2 most strongly influence performance outcomes. Further details
SPARC=− (cid:116) + dω (1)
ω dω are in Appendix B.
0 c
D. Robolab scene and task generation
where Vˆ(ω)=V(ω)/V(0) represents the normalized Fourier RoboLab offers a user-friendly workflow that mirrors the
magnitude spectrum. Smoother motions yield values closer to process of preparing a real-world robot evaluation (Fig. 1):
zero, while jerkier trajectories produce more negative values. 1) create a scene by positioning and orienting objects in a
Weemployanadaptivecutofffrequencyω =min(10 Hz,ω ), workspace; 2) define a task as language instructions for a goal
c α
where ω = max ω and K = {k | Vˆ(ω ) ≥ α} denotes state in the scene; 3) instantiate an environment by selecting
α k∈K k k
the set of frequency bins exceeding threshold α=0.05 . This a robot, policy, and variations of scene features including
adaptivestrategyensuresthatthesmoothnessevaluationfocuses camera, lighting, and backgrounds for a task. We make this
on relevant frequency components. Lastly, trajectory optimality processreproducibleandscalablebydecouplingtaskdefinitions
is assessed through end effector speed v(t), and path length from environments, allowing reuse over new embodiments and
l =
(cid:80)N−1∥p
−p ∥, where p denotes the end-effector policies. Our approach automates the process of environment
k=0 k+1 k k
positionattimestepk.Shorterpathlengthsindicatemoredirect assembly, reducing manual labor when evaluating a new robot
trajectories and generally reflect superior motion quality. or policy. In addition, we developed an automated workflow

Fig. 6: Example scene variations, lighting variations, and camera pose variations in RoboLab.
to generate new scenes and tasks to facilitate extension of our 2) uses a geometric solver and physics simulation to check
evaluations and to mitigate benchmark saturation in the future. asset placement validity; and 3) refines the scene if it is not
Formally, define a scene S = {(b ,p ,q )}N , where b valid. First, the LLM is prompted with a theme (e.g., “messy
|     |     |     | i i | i i=1 | i   |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
representsanobjectinstanceselectedfromtheavailablecatalog counter”) to generate a structured scene plan consisting of a
R3,q
of objects B and p ∈ ∈ SO(3) denote its position subsetofobjectsB ⊂B andspatialpredicatesP governingthe
|     | i   | i   |     |     |     |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
and orientation. Define a task T = {S,l}, where l is the layout. The LLM is provided with the full catalog of objects
∈R3.
language instruction to complete in the scene. Define a policy B containing names and bounding box dimensions d i
π : O → A where the action space A ∈ {Ajoint,AEE,...} Second, a spatial solver converts the relational predicates P
| and observation | space O =(Oproprio,Orgb,Odepth···) |     |     | is  | policy |            |      |                |     |         |         |     |           |     |
| --------------- | ---------------------------------- | --- | --- | --- | ------ | ---------- | ---- | -------------- | --- | ------- | ------- | --- | --------- | --- |
|                 |                                    |     |     |     |        | into valid | pose | configurations |     | (p,q)). | Objects | are | processed | in  |
dependent. An environment E =(T,R,O,A,ξ) consists of a dependency order, with support surfaces placed before objects
task,robotembodimentR,policyparameters(A,O),andscene
|     |     |     |     |     |     | on those | surfaces | (Algorithm |     | 1). | To check | physical | stability, |     |
| --- | --- | --- | --- | --- | --- | -------- | -------- | ---------- | --- | --- | -------- | -------- | ---------- | --- |
=(ξcamera,ξlight,ξbackground,ξpose).
variations ξ More details on the scene is then forward simulated in Isaac Sim [23] for 300
the specific objects, scenes and tasks in RoboLab can be found steps under gravity. An object b is flagged as unstable if it’s
i
| in Appendix | A.  |     |     |     |     |         |           |     |              |     |           |      |             |     |
| ----------- | --- | --- | --- | --- | --- | ------- | --------- | --- | ------------ | --- | --------- | ---- | ----------- | --- |
|             |     |     |     |     |     | maximum | Euclidean |     | displacement |     | is larger | than | a threshold |     |
1) Scaling Scene Generation: We enable scaling scene (typically 0.02m). Third, If any object is unstable, we generate
| generation | through an automated | pipeline | that: | 1) prompts | an  |              |            |     |             |        |         |     |         |          |
| ---------- | -------------------- | -------- | ----- | ---------- | --- | ------------ | ---------- | --- | ----------- | ------ | ------- | --- | ------- | -------- |
|            |                      |          |       |            |     | a text error | describing |     | the failure | (e.g., | “Object |     | ‘apple’ | fell off |
LLM to generate a structured scene plan for asset placement; ‘plate’ with displacement 0.15m”). This feedback is provided
|     |     |     |     |     |     | to the LLM       | to       | refine      | the scene | plan        | and          | repeat       | the  | process. |
| --- | --- | --- | --- | --- | --- | ---------------- | -------- | ----------- | --------- | ----------- | ------------ | ------------ | ---- | -------- |
|     |     |     |     |     |     | Further          | details, | including   | on        | the spatial |              | and physical |      | solvers, |
|     |     |     |     |     |     | are provided     | in       | Appendix    | C.        |             |              |              |      |          |
|     |     |     |     |     |     | 2) Scaling       | Task     | Generation: |           | We          | enable       | scaling      | task | genera-  |
|     |     |     |     |     |     | tion through     | an       | automated   | pipeline  |             | that: 1)     | generates    | task | code     |
|     |     |     |     |     |     | from information |          | including   |           | the scene   | and          | competency   |      | axes; 2) |
|     |     |     |     |     |     | validates        | code     | syntax;3)   | validates | asset       | selectionsin |              | the  | scene;   |
and4)refinesthetaskifitisnotvalid.First,wepromptanLLM
|     |     |     |     |     |     | with detailed | task | information: |     | 1) the | scene | object | catalog | B   |
| --- | --- | --- | --- | --- | --- | ------------- | ---- | ------------ | --- | ------ | ----- | ------ | ------- | --- |
S
|                  |                     |          |              |                       |      | and metadata      |              | (including    | bounding        |               | boxes    | and semantics) |                 | with    |
| ---------------- | ------------------- | -------- | ------------ | --------------------- | ---- | ----------------- | ------------ | ------------- | --------------- | ------------- | -------- | -------------- | --------------- | ------- |
|                  |                     |          |              |                       |      | dimensions;       | 2)           | task examples |                 | demonstrating |          | the            | task structure; |         |
|                  |                     |          |              |                       |      | 3) the complete   |              | predicate     |                 | library       | defining | sub-task       |                 | success |
|                  |                     |          |              |                       |      | and termination;  |              | 4)            | Competency-axes |               |          | language       | templates       |         |
|                  |                     |          |              |                       |      | with placeholders |              | for           | objects,        | spatial       | verbs,   | and            | attributes;     |         |
|                  |                     |          |              |                       |      | and 5)            | constraints  | including     |                 | difficulty    |          | levels         | and physical    |         |
| Fig. 7: Examples | of language         | ablation | experiments. | Top:                  | Same |                   |              |               |                 |               |          |                |                 |         |
|                  |                     |          |              |                       |      | feasibility       | requirements |               | (e.g.,          | containment   |          | size           | constraints,    |         |
| scene and goal,  | but the instruction | wording  | ranges       | from precise          | to   |                   |              |               |                 |               |          |                |                 |         |
|                  |                     |          |              |                       |      | stacking          | stability).  | The           | prompt          | forbids       |          | referencing    |                 | objects |
| increasingly     | vague. Middle: Same | scene,   | but the      | instruction specifies |      |                   |              |               |                 |               |          |                |                 |         |
different tasks to perform. Bottom: Same instruction, but the scene not present in B S and includes previously generated tasks to
becomes progressively more complex. prevent duplicates (see Appendix C for details). Second, tasks

TABLE I: Overall performance of VLAs on RoboLab. While recent VLAs exhibit emerging capabilities across diverse task dimensions,
overall success rates and consistency remain limited.
OverallMetrics Difficulty(succ%) Procedural(succ%) Relational(succ%) Visual(succ%)
Model Succ%(↑) Score(↑) SPARC(↑) Speed(↑) simple moderate complex affordance reorientation stacking conjunction counting spatial color semantics size
π0.5[9] 23.3 0.39 −9.92±6.0 5.7±1.8 26.3 23.2 11.7 13.3 16.7 15.0 56.2 50.0 19.0 17.3 18.3 13.3
π0-FAST[27] 15.7 0.29 −9.53±6.1 4.6±1.7 21.7 11.3 2.9 1.7 3.3 6.7 38.8 40.0 16.9 5.8 11.7 1.7
GR00TN1.6[24] 2.0 0.10 −9.25±5.0 4.0±1.8 1.9 3.1 0.0 3.3 0.0 13.3 0.0 0.0 0.0 0.0 2.0 0.0
π0[5] 5.2 0.14 −9.51±3.9 4.4±1.4 8.1 2.6 0.0 0.0 0.0 0.0 20.0 12.9 2.4 0.0 1.7 3.3
PaliGemma[4] 1.5 0.07 −21.25±14.9 0.9±1.1 1.9 1.5 0.0 0.0 0.0 0.0 1.2 8.6 1.0 0.0 2.3 0.0
are check for syntax validity as code. Third, asset validation command.Theenvironmentswerecomposedofadefaultoffice-
checks that all objects are not in the forbidden set and, for like background and natural lighting to mimic typical setups in
containmenttasks(e.g.,“placeb insideb ”),thatinnerobjects the DROID dataset [13], with wrist and external camera poses
i j
fit inside containers with some clearance. Fourth, if validation designed to match the real-world DROID robot. Each task was
fails, feedback is gathered into a fix prompt Q that includes repeated 10 times with a fixed seed to address uncontrolled
fix
theoriginalpromptQ,theinvalidoutput,andanerrormessage stochasticity in the physics simulation and robot policy.
E describing syntax errors or invalid asset references. The fix
B. Task Results
prompt is provided to the LLM to refine the task and repeat
the process. Table I shows the overall results on our benchmark. Overall
We evaluated our task generation approach using an LLM- success rates were low, with the best policy (π 0.5 ) reaching
as-judge framework. We generated 812 tasks across 59 scenes 31.9% success. This matches prior observations on out-of-
evenly across the competency axes with o1 [26]. We then domain generalization for VLAs [35]. Below, we discuss π 0.5
extracted each natural-language instruction and its program- toillustratehowRoboLabsupportstargeteddiagnosisofpolicy
matic termination conditions from the generated code, and capabilities and suggests concrete directions for improvement.
prompted a second o1 judge to score instruction–criterion Competencyaxesalsohighlightedasymmetricgeneralization
alignment across relation, target, object, and quantifier match, in relational reasoning tasks: π 0.5 handled conjunctions
plus instruction clarity and physical feasibility (each on a 0– (76.0% success) and counting (60.0%) better than spatial
1 scale), and to assign an aligned/partial/misaligned verdict. relations (23.9%). In visual grounding, performance remained
Overall, tasks achieved 0.91 alignment, 0.96 clarity, 0.92 low across attribute types (35.0% for size, 30.0% for color,
feasibility, and 0.95 semantic match, with 76% judged fully and 21.5% for semantics), indicating brittle language-to-object
aligned (misaligned ≈1%) and covered 88% of objects. These binding beyond a narrow set of familiar object descriptions.
results show our approach can scale to generate diverse tasks Procedural understanding proved most challenging: π 0.5
that are semantically aligned to their language instructions (see achievedmodestsuccessonreorientation(53.3%)butstruggled
Appendix D). withaffordances(20.0%)andstacking(16.0%).Together,these
results show how RoboLab isolates where generalization fails,
IV. EXPERIMENTS
supportingdiagnosisthatcaninformdatacollectionandtraining
We evaluate several off-the-shelf VLA policies on RoboLab- priorities.
120, controlled ablations, and environmental perturbations to
C. Ablation Experiments
identify which competencies generalize and where failures
concentrate. The experiments are designed to address the To further probe robustness and language grounding, we
following questions: Q1: How well does a real-world policy performedcontrolledablationsthatvariedtheinstruction,scene,
perform in our simulated benchmark? Q2: How well does a or task in isolation (Fig. 7).
policy generalize with language variations? Q3: When and
Varying instruction specificity in a fixed scene. Table IIa
why does a policy fail?
shows how VLAs respond to varying levels of instruction
A. Experiment Setup specificity.ResultsrevealthatVLAslackgroundingforabstract
or implied goals. Interestingly, we observe that the for the
Weevaluate120tasksofvaryingdifficultylevels(65simple,
vague command “Empty the grey bin”, π tries to grab
38 moderate, 18 complex) and spanning competency axes (44 0.5
the bin instead of clearing its content. These results indicate
relational,91visual,and36procedural).Eachtaskwasassigned
that current VLAs may rely on keyword matching within
to one or more competency axes. Our experiments used the
instructions rather than demonstrating the linguistic inference
DROID robot [13], which is commonly used to benchmark
necessarytoidentifyimplicittaskgoals.AsshowninTableIIa,
VLAs [10, 1]. DROID has a 7-DOF Franka Panda robot arm
π exhibits higher performance on specific instructions than
with a Robotiq-2F-85 gripper, an externally mounted ZED 2i 0.5
on vague ones, indicating a sensitivity to unde-rspecified task
camera with f=2.1mm, and a ZED mini as the wrist camera.
goals.
We evaluated VLAs with off-the-shelf checkpoints fine-tuned
on the DROID dataset [13]: π [9], π -FAST [27], π [5], Varyingscenecomplexitywithafixedinstruction. TableIIb
0.5 0 0
PaliGemma [4], and GR00T N1.6 [24]. The action space is isolates the effect of scene complexity by increasing the
7-DOF Franka joint positions and a 1-DOF binary gripper number of objects to manipulate. Success rates drop as object

TABLE II: Language understanding ablations. (a) VLA perfor- TABLE III: Robustness to controlled environmental variations
mance degrades with abstract or vague language instructions. over two simple tasks (BananaInBowl, BananaAndCubeInBowl).
|           |             |          |          |            |              |                 |                | PaliGemma | is excluded |      | as it fails | to achieve | meaningful |        | results. |
| --------- | ----------- | -------- | -------- | ---------- | ------------ | --------------- | -------------- | --------- | ----------- | ---- | ----------- | ---------- | ---------- | ------ | -------- |
| (b)       | Performance | drops    | as       | scene      | complexity   |                 | increases. (c) |           |             |      |             |            |            |        |          |
| VLAs      | show        | brittle  | language | grounding, |              | with consistent | object         |           |             |      |             |            |            |        |          |
|           |             |          |          |            |              |                 |                |           |             | π0.5 |             | π0-FAST    |            |        | π0       |
| confusion |             | patterns | across   | different  | instructions |                 | in the same    |           |             |      |             |            |            |        |          |
|           |             |          |          |            |              |                 |                | Variation | Succ.%      |      | Time(s)     | Succ.%     | Time(s)    | Succ.% | Time(s)  |
| scene.    |             |          |          |            |              |                 |                | Lighting  |             |      |             |            |            |        |          |
(a) Effect of language specificity on task performance. Color 96.7 14.5±7.9 93.3 17.9±10.7 6.7 31.1±4.3
|     |     |     |     |     |      |     |         | Shadows     | 100.0 | 16.0±6.0 |         | 90.0  | 12.4±3.5 | 0.0  | -        |
| --- | --- | --- | --- | --- | ---- | --- | ------- | ----------- | ----- | -------- | ------- | ----- | -------- | ---- | -------- |
|     |     |     |     |     |      |     |         | Dim         |       | 90.0     | 9.1±2.1 | 70.0  | 13.1±2.8 | 70.0 | 35.5±9.7 |
|     |     |     |     |     | π0.5 |     | π0-FAST | Overexposed | 100.0 | 13.9±4.4 |         | 100.0 | 9.6±1.7  | 0.0  | -        |
VisualVariations
| Task |     |     |     |     | Succ% | Score | Succ% Score |     |     |     |     |     |     |     |     |
| ---- | --- | --- | --- | --- | ----- | ----- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- |
BananasOutOfBinTask Background 85.0 14.4±8.7 70.0 21.3±10.7 25.0 31.6±11.8
|                                   |     |     |     |     |     |      |         | Tabletexture |     | 87.5 19.0±13.8 |     | 60.0 | 19.0±12.9 | 22.5 | 28.1±6.9 |
| --------------------------------- | --- | --- | --- | --- | --- | ---- | ------- | ------------ | --- | -------------- | --- | ---- | --------- | ---- | -------- |
| “Takeallthebananasoutofthegreybin |     |     |     |     | 50  | 0.13 | 30 0.05 |              |     |                |     |      |           |      |          |
| andputitonthetable.”              |     |     |     |     |     |      |         | ObjectPose   |     |                |     |      |           |      |          |
“Takethebananasout” 40 0.22 10 0.15 10cm 95.0 16.2±9.2 55.0 26.5±13.8 22.5 34.7±13.3
“Emptythegreybin” 10 0.07 70 0.11 20cm 95.0 19.7±10.2 40.0 21.8±9.5 20.0 37.4±11.2
|     |     |     |     |     |     |     |     | 30cm |     | 62.5 18.9±8.7 |     | 35.0 | 24.3±11.9 | 17.5 | 24.3±11.9 |
| --- | --- | --- | --- | --- | --- | --- | --- | ---- | --- | ------------- | --- | ---- | --------- | ---- | --------- |
WhiteMugsInBinTask
CameraPose
| “Putthewhitemugsinthegreybin” |     |     |     |     | 80  | 0.50 | 20 0.22 |     |     |     |     |     |     |     |     |
| ----------------------------- | --- | --- | --- | --- | --- | ---- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
“Putthemugsinthebin” 90 0.50 10 0.11 external 85.0 17.4±11.3 45.0 27.7±10.6 50.0 27.4±16.0
“Putawaymugs” 0 0.00 0 0.00 wrist 60.0 21.9±13.4 25.0 20.1±9.9 10.0 35.3±10.4
RemoveMeasuringSpoonsfromthePlateTask
TABLE IV:
“Puttheorangemeasuringcupandtheblue 20 0.47 0 0.31 Overall success rate (%) on RoboLab-120 across
| measuringcupoutsideoftheplate” |     |           |                  |      |         |              |              | language | specificity | levels. |       |          |     |          |     |
| ------------------------------ | --- | --------- | ---------------- | ---- | ------- | ------------ | ------------ | -------- | ----------- | ------- | ----- | -------- | --- | -------- | --- |
| “Cleartheplate”                |     |           |                  |      | 0       | 0.08         | 0 0.10       |          |             |         |       |          |     |          |     |
|                                |     |           |                  |      |         |              |              |          | Model       |         | Vague | Default  |     | Specific |     |
|                                | (b) | Effect of | scene complexity |      | on task | performance. |              |          |             |         |       |          |     |          |     |
|                                |     |           |                  |      |         |              |              |          | π0.5        |         | 16.8  | 23.3     |     | 25.8     |     |
|                                |     |           |                  |      |         |              |              |          | π0-FAST     |         |       | 9.7 15.7 |     | 15.2     |     |
| Scene                          |     |           |                  | π0.5 | π0-FAST |              | π0 GR00TN1.6 |          |             |         |       |          |     |          |     |
|                                |     |           |                  |      |         |              |              |          | GR00TN1.6   |         |       | 1.8      | 2.0 | 2.2      |     |
Task:“Packboxedfoodsintothebin”
|             |     |     |     |     |     |     |     |     | π0        |     |     | 3.4 | 5.2 | 6.5 |     |
| ----------- | --- | --- | --- | --- | --- | --- | --- | --- | --------- | --- | --- | --- | --- | --- | --- |
| 1Box/Can    |     |     |     |     | 10  | 0   | 0 0 |     |           |     |     |     |     |     |     |
|             |     |     |     |     |     |     |     |     | PaliGemma |     |     | 1.5 | 1.5 | 1.0 |     |
| 2Boxes/Cans |     |     |     |     | 0   | 0   | 0 0 |     |           |     |     |     |     |     |     |
| 3Boxes/Cans |     |     |     |     | 0   | 0   | 0 0 |     |           |     |     |     |     |     |     |
Task:“Packcannedfoodsintothebin”
1Box/Can 70 30 0 0 can flexibly respond to different instructions while holding
| 2Boxes/Cans |     |     |     |     | 30  | 10  | 0 0 |           |        |         |        |         |          |     |            |
| ----------- | --- | --- | --- | --- | --- | --- | --- | --------- | ------ | ------- | ------ | ------- | -------- | --- | ---------- |
|             |     |     |     |     |     |     |     | the scene | fixed. | Results | expose | brittle | language |     | grounding: |
| 3Boxes/Cans |     |     |     |     | 20  | 0   | 0 0 |           |        |         |        |         |          |     |            |
π
|             |     |                 |             |      |         |               |              | 0.5 was        | highly       | sensitive | to    | object      | choice; | 70%        | success for |
| ----------- | --- | --------------- | ----------- | ---- | ------- | ------------- | ------------ | -------------- | ------------ | --------- | ----- | ----------- | ------- | ---------- | ----------- |
|             |     | (c) Instruction | sensitivity |      | within  | fixed scenes. |              |                |              |           |       |             |         |            |             |
|             |     |                 |             |      |         |               |              | “Select        | the cordless |           | drill | and put     | it on   | the table” | but 0%      |
|             |     |                 |             |      |         |               |              | when replacing |              | “cordless |       | drill” with | “blue   | hammer”.   | Error       |
| Task/Prompt |     |                 |             | π0.5 | π0-FAST |               | π0 GR00TN1.6 |                |              |           |       |             |         |            |             |
FruitPlateScene analysis reveals consistent object confusion patterns: visually
|       |           |           |             |     |     |     |     | similar | distractors | (pumpkin |     | vs. orange, |     | drill | vs. hammer) |
| ----- | --------- | --------- | ----------- | --- | --- | --- | --- | ------- | ----------- | -------- | --- | ----------- | --- | ----- | ----------- |
| “Move | an orange | or a lime | to the wood |     | 50  | 0   | 0 0 |         |             |          |     |             |     |       |             |
bowl” frequently override language-specified targets (see Table. VII
| “Moveanorangetothewhitebowl” |     |     |     |     | 0   | 0   | 0 0 |     |     |     |     |     |     |     |     |
| ---------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
“Puttheonioninthewoodbowl” 70 10 20 20 in Appendix for detailed analysis). These findings indicate that
“Puttheonionontheplate” 0 0 0 0 VLA language grounding is highly sensitive to the specific
ToolsCleanupScene
|                           |     |     |     |     |     |     |     | object-instruction |               | pairings |                    | seen during | training, |          | rather than |
| ------------------------- | --- | --- | --- | --- | --- | --- | --- | ------------------ | ------------- | -------- | ------------------ | ----------- | --------- | -------- | ----------- |
| “Puthammersintherightbin” |     |     |     |     | 20  | 0   | 0 0 |                    |               |          |                    |             |           |          |             |
|                           |     |     |     |     |     |     |     | reflecting         | generalizable |          | language-to-object |             |           | binding. |             |
| “Puthammersintheleftbin”  |     |     |     |     | 10  | 0   | 0 0 |                    |               |          |                    |             |           |          |             |
ToolsSelectionScene
|                                      |     |     |     |     |     |     |       | D. Sensitivity |     | and robustness |     |     |     |     |     |
| ------------------------------------ | --- | --- | --- | --- | --- | --- | ----- | -------------- | --- | -------------- | --- | --- | --- | --- | --- |
| “Selectthecordlessdrillandputitonthe |     |     |     |     | 70  | 50  | 20 30 |                |     |                |     |     |     |     |     |
table” We perform a set of variations given two basic tasks and
“Selectthebluehammerandputitonthe 0 0 10 0 observe the outcome, for example, we only change the target
table”
|       |            |      |     |      |          |        |        | object to     | pick   | or the      | target         | for place, | this   | is akin   | to domain    |
| ----- | ---------- | ---- | --- | ---- | -------- | ------ | ------ | ------------- | ------ | ----------- | -------------- | ---------- | ------ | --------- | ------------ |
|       |            |      |     |      |          |        |        | randomization |        | [29]        | as illustrated | in         | Fig.   | 6. The    | following    |
|       |            |      |     |      |          |        |        | variations    | are    | considered, | variations     |            | 1) in  | wrist     | and external |
| count | increases: | from | 70% | with | a single | target | object | to            |        |             |                |            |        |           |              |
|       |            |      |     |      |          |        |        | camera        | poses; | 2) object   | poses;         | 3) in      | visual | features, | including    |
20% with three objects. More revealing is the type of failure: background and table textures; and 4) in lighting, including
| VLAs        | exhibit | systematic     | geometric |            | biases, | frequently    | grasping |            |     |      |       |                 |     |             |         |
| ----------- | ------- | -------------- | --------- | ---------- | ------- | ------------- | -------- | ---------- | --- | ---- | ----- | --------------- | --- | ----------- | ------- |
|             |         |                |           |            |         |               |          | saturation | and | hue. | Table | III illustrates |     | the results | for all |
| cylindrical |         | objects (cans) | when      | instructed |         | to manipulate | boxes.   |            |     |      |       |                 |     |             |         |
experiments.
| This | suggests | that | training | data | distributions |     | create strong |     |     |     |     |     |     |     |     |
| ---- | -------- | ---- | -------- | ---- | ------------- | --- | ------------- | --- | --- | --- | --- | --- | --- | --- | --- |
shape priors that override language-specified targets, a critical Visual and Lighting variations. We vary the lighting
|     |     |     |     |     |     |     |     | conditions | via | color | temperature |     | shifts, | lighting | exposure |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | --- | ----- | ----------- | --- | ------- | -------- | -------- |
limitationforreal-worlddeploymentwhereobjectsvarywidely
|     |     |     |     |     |     |     |     | and strong | directional |     | light | that generates |     | shadows | as the |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | ----------- | --- | ----- | -------------- | --- | ------- | ------ |
in geometry.
|     |     |     |     |     |     |     |     | robot is | moving. | Lighting: |     | VLAs | were | robust | to changes |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | ------- | --------- | --- | ---- | ---- | ------ | ---------- |
Varyingtasksinafixedscene. TableIIcshowswhetherVLAs in lighting conditions, with 90–100% success across shadow

| TABLE        | V: Overall | success  | rates  | across | real and | simulation | environ- |                  |            |            |          |              |           |                |            |
| ------------ | ---------- | -------- | ------ | ------ | -------- | ---------- | -------- | ---------------- | ---------- | ---------- | -------- | ------------ | --------- | -------------- | ---------- |
|              |            |          |        |        |          |            |          | physics          | simulation | fidelity,  | limiting |              | Robolab’s | coverage       | of fine-   |
| ments across | 6          | selected | simple | tasks. |          |            |          |                  |            |            |          |              |           |                |            |
|              |            |          |        |        |          |            |          | grained,         | low-level  | control    | tasks.   | Finally,     | although  |                | evaluation |
|              |            |          |        |        |          |            |          | in high-fidelity |            | simulation |          | is a strong  | proxy     | for            | real-world |
| Environment  |            | π        | π      | -FAST  | π        | PaliGemma  |          |                  |            |            |          |              |           |                |            |
|              |            | 0.5      |        | 0      | 0        |            |          |                  |            |            |          |              |           |                |            |
|              |            |          |        |        |          |            |          | performance,     | a          | residual   | visual   | distribution |           | shift remains. | This       |
Real 79.5 34.1 63.2 0.0 gap needs to be characterized further both by analyzing the
| Sim |     | 74.0 |     | 42.0 | 18.0 |     | 4.0 |          |           |            |     |               |            |              |           |
| --- | --- | ---- | --- | ---- | ---- | --- | --- | -------- | --------- | ---------- | --- | ------------- | ---------- | ------------ | --------- |
|     |     |      |     |      |      |     |     | behavior | and       | robustness | of  | the visual    | perception |              | stack and |
|     |     |      |     |      |      |     |     | through  | extensive | validation |     | on real-world |            | deployments. |           |
variations,colortemperatureshifts,and500×intensitychanges.
|        |             |     |            |      |               |     |          |     |     |     | VI. CONCLUSION |     |     |     |     |
| ------ | ----------- | --- | ---------- | ---- | ------------- | --- | -------- | --- | --- | --- | -------------- | --- | --- | --- | --- |
| Visual | appearance: |     | Variations | over | 10 background |     | textures |     |     |     |                |     |     |     |     |
Recentbenchmarkingeffortshavemadesignificantstridesin
| and 4 table | textures       | had         | minimal | impact           | (<5% | degradation), |            |                  |       |             |            |              |           |           |            |
| ----------- | -------------- | ----------- | ------- | ---------------- | ---- | ------------- | ---------- | ---------------- | ----- | ----------- | ---------- | ------------ | --------- | --------- | ---------- |
|             |                |             |         |                  |      |               |            | scalable         | robot | evaluation, | but        | they         | primarily | assess    | robustness |
| suggesting  | generalization |             | to      | scene appearance |      | changes.      |            |                  |       |             |            |              |           |           |            |
|             |                |             |         |                  |      |               |            | to perturbations |       | of training |            | environments | rather    | than      | true task  |
| Camera      | variation      | sensitivity |         | analysis.        | We   | infer         | posteriors |                  |       |             |            |              |           |           |            |
|             |                |             |         |                  |      |               |            | generalization   |       | to novel    | scenarios. | RoboLab      |           | addresses | this gap   |
over camera displacement conditioned on task success (Fig. 8). by evaluating real world policies in a high-fidelity simulation,
Cameraposeswererandomizedinbothorientationandposition structuredevaluationvectorsthatdecomposepolicycompetence
for 10 episodes each. Displacement is calculated with respect into visual, procedural, and relational dimensions, and a set
to the nominal position of the cameras. Across all policies, of sensitivity analysis set of novel analysis that provides
| the wrist-camera |     | posterior | is  | sharply | concentrated |     | near zero, |         |             |          |     |               |     |                  |     |
| ---------------- | --- | --------- | --- | ------- | ------------ | --- | ---------- | ------- | ----------- | -------- | --- | ------------- | --- | ---------------- | --- |
|                  |     |           |     |         |              |     |            | insight | into policy | behavior |     | for robotics. |     | Our benchmarking |     |
indicating that successful execution often required the wrist framework enables the community to critically answer the
camera to remain close to its nominal pose, while performance question of generalization and performance. At the same time,
| is more | tolerant | to external |     | camera | position | changes. | This |               |     |             |     |       |               |     |             |
| ------- | -------- | ----------- | --- | ------ | -------- | -------- | ---- | ------------- | --- | ----------- | --- | ----- | ------------- | --- | ----------- |
|         |          |             |     |        |          |          |      | the framework |     | is designed |     | to be | pragmatically |     | usable: new |
indicates performance is critically dependent on wrist camera tasks can be authored in minutes by arranging objects on a
than external camera. tabletop and attaching language instructions, and a generative
|                |        |           |             |              |           |              |          | scene–task–environment |            |     | workflow |     | that supports |     | continuous |
| -------------- | ------ | --------- | ----------- | ------------ | --------- | ------------ | -------- | ---------------------- | ---------- | --- | -------- | --- | ------------- | --- | ---------- |
| Object         | pose   | variation | sensitivity |              | analysis. | We randomize |          |                        |            |     |          |     |               |     |            |
|                |        |           |             |              |           |              |          | benchmark              | evolution. |     |          |     |               |     |            |
| initial object | poses  | via       | a uniform   | distribution |           | of 10cm,     | 20cm,    |                        |            |     |          |     |               |     |            |
| and 30cm       | within | its       | nominal     | placement    | (usually  | in           | front of |                        |            |     |          |     |               |     |            |
REFERENCES
| the robot)     | for | 10 episodes       | each. | We  | then infer   | posteriors | over     |            |         |     |               |     |           |     |          |
| -------------- | --- | ----------------- | ----- | --- | ------------ | ---------- | -------- | ---------- | ------- | --- | ------------- | --- | --------- | --- | -------- |
| initial object |     | poses conditioned |       | on  | task success | (see       | Fig. 8), |            |         |     |               |     |           |     |          |
|                |     |                   |       |     |              |            |          | [1] Pranav | Atreya, |     | Karl Pertsch, |     | Tony Lee, | Moo | Jin Kim, |
relative to the robot pose. We observe a strong peak over 0.5m Arhan Jain, Artur Kuramshin, Clemens Eppner, Cyrus
from the robot’s origin, suggesting that objects placed at this Neary, Edward Hu, Fabio Ramos, et al. Roboarena:
distance has the highest probability of success, likely due to Distributed real-world evaluation of generalist robot
reachability. policies. In Proceedings of the Conference on Robot
|     |     |     |     |     |     |     |     | Learning |     | (CoRL | 2025), |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | --- | ----- | ------ | --- | --- | --- | --- |
2025.
| E. Real | Robot | Verification |     |     |     |     |     |               |     |                  |     |     |           |     |           |
| ------- | ----- | ------------ | --- | --- | --- | --- | --- | ------------- | --- | ---------------- | --- | --- | --------- | --- | --------- |
|         |       |              |     |     |     |     |     | [2] Sivakumar |     | Balasubramanian, |     |     | Alejandro |     | Melendez- |
We evaluated the same policies on a small set of six Calderon, and Etienne Burdet. A robust and sensitive
simple real-robot tasks and compared success rates to matched metric for quantifying movement smoothness. IEEE
simulation evaluations (Table V). π achieved 79.5% success Transactions on Biomedical Engineering, 59(8):
0.5
in the real world, close to its 74.0% success in simulation, 2126–2136, 2012. doi: 10.1109/TBME.2011.2179545.
suggestingthatRoboLabcanprovideareasonableproxyforthis [3] Prithviraj Banerjee, Sindi Shkodrani, Pierre Moulon,
policyonthesetasktypes.π -FASTachieved34.1%successin Shreyas Hampali, Shangchen Han, Fan Zhang, Linguang
0
therealworldand42.0%insimulation,showingasimilartrend. Zhang, Jade Fountain, Edward Miller, Selen Basol,
π was a notable outlier, reaching 63.2% success on the real Richard Newcombe, Robert Wang, Jakob Julian Engel,
0
robot but only 18.0% in simulation; qualitatively, this policy and Tomas Hodan. HOT3D: Hand and object tracking in
appeared tuned to reliably grasp single objects, which matched 3D from egocentric multi-view videos. CVPR, 2025.
the selected real-robot tasks. We leave deeper investigation of [4] Lucas Beyer, Andreas Steiner, Andre´ Susano Pinto,
| policy-specific |     | sim-to-real | deviations |     | to future | work. |     |           |     |             |                |      |              |       |            |
| --------------- | --- | ----------- | ---------- | --- | --------- | ----- | --- | --------- | --- | ----------- | -------------- | ---- | ------------ | ----- | ---------- |
|                 |     |             |            |     |           |       |     | Alexander |     | Kolesnikov, |                | Xiao | Wang, Daniel | Salz, | Maxim      |
|                 |     |             |            |     |           |       |     | Neumann,  |     | Ibrahim     | Alabdulmohsin, |      | Michael      |       | Tschannen, |
V. LIMITATIONS Emanuele Bugliarello, Thomas Unterthiner, Daniel Key-
While RoboLab provides a flexible and scalable framework sers,SkandaKoppula,FangyuLiu,AdamGrycner,Alexey
for evaluating language-conditioned manipulation, it currently Gritsenko, Neil Houlsby, Manoj Kumar, Keran Rong,
focuses on rigid-body tabletop scenes and does not fully JulianEisenschlos,RishabhKabra,MatthiasBauer,Matko
capture the challenges of deformable object manipulation (e.g., Bosˇnjak, Xi Chen, Matthias Minderer, Paul Voigtlaender,
cloth, cables, bags). Moreover, many contact-rich skills that Ioana Bica, Ivana Balazevic, Joan Puigcerver, Pinelopi
requirepreciseforce control,compliantinteraction,orcomplex Papalampidi, Olivier Henaff, Xi Xiong, Radu Soricut,
frictional dynamics are underrepresented and dependent on the Jeremiah Harmsen, and Xiaohua Zhai. Paligemma: A

Fig. 8: Results of the sensitivity analysis using MNPE. Policies were highly sensitive to wrist-camera displacement from the nominal pose,
indicating strong dependence on wrist-mounted camera calibration. Success also peaked for objects placed at approximately 0.5m from the
robot, likely due to robot reachability.
versatile 3b vlm for transfer, 2024. URL https://arxiv.org/ Polaris: Scalable real-to-sim evaluations for generalist
abs/2407.07726. robot policies, 2025. URL https://arxiv.org/abs/2512.
[5] Kevin Black, Noah Brown, Danny Driess, Adnan Esmail, 16881.
MichaelEqui,ChelseaFinn,NiccoloFusai,LachyGroom, [11] Stephen James, Zicong Ma, David R. Arrojo, and
Karol Hausman, Brian Ichter, Szymon Jakubczak, Tim Andrew J. Davison. RLBench: The Robot Learning
Jones, Liyiming Ke, Sergey Levine, Adrian Li-Bell, Benchmark & Learning Environment. RAL, 2020.
Mohith Mothukuri, Suraj Nair, Karl Pertsch, Lucy Xi- [12] YashJangir,YidiZhang,KashuYamazaki,ChenyuZhang,
aoyang Shi, James Tanner, Quan Vuong, Anna Walling, Kuan-Hsun Tu, Tsung-Wei Ke, Lei Ke, Yonatan Bisk,
HaohuanWang,andUryZhilinsky.π :Avision-language- and Katerina Fragkiadaki. Robotarena ∞: Scalable robot
0
action flow model for general robot control, 2026. URL benchmarking via real-to-sim translation, 2025. URL
https://arxiv.org/abs/2410.24164. https://arxiv.org/abs/2510.23571.
[6] RishitDagli,DonglaiXiang,VismayModi,CharlesLoop, [13] Alexander Khazatsky, Karl Pertsch, Suraj Nair, Ash-
Clement Fuji Tsang, Anka He Chen, Anita Hu, Gavriel win Balakrishna, Sudeep Dasari, Siddharth Karamcheti,
State, David I.W. Levin, and Maria Shugrina. Vomp: SoroushNasiriany,MohanKumarSrirama,LawrenceYun-
Predicting volumetric mechanical property fields. arXiv liang Chen, Kirsty Ellis, Peter David Fagan, Joey
preprint, 2025. Hejna, Masha Itkina, Marion Lepert, Yecheng Jason Ma,
[7] JiayuanGu,FanboXiang,XuanlinLi,ZhanLing,Xiqiang Patrick Tree Miller, Jimmy Wu, Suneel Belkhale, Shivin
Liu, Tongzhou Mu, Yihe Tang, Stone Tao, Xinyue Wei, Dass, Huy Ha, Arhan Jain, Abraham Lee, Youngwoon
Yunchao Yao, et al. Maniskill2: A unified benchmark Lee, Marius Memmel, Sungjae Park, Ilija Radosavovic,
for generalizable manipulation skills. arXiv preprint Kaiyuan Wang, Albert Zhan, Kevin Black, Cheng Chi,
arXiv:2302.04659, 2023. Kyle Beltran Hatch, Shan Lin, Jingpei Lu, Jean Mercat,
[8] Andrew Guo, Bowen Wen, Jianhe Yuan, Jonathan Trem- Abdul Rehman, Pannag R Sanketi, Archit Sharma, Cody
blay, Stephen Tyree, Jeffrey Smith, and Stan Birchfield. Simpson, Quan Vuong, Homer Rich Walke, Blake Wulfe,
HANDAL: A dataset of real-world manipulable object TedXiao,JonathanHeewonYang,ArefehYavary,TonyZ.
categories with pose annotations, affordances, and recon- Zhao, Christopher Agia, Rohan Baijal, Mateo Guaman
structions. In IROS, 2023. Castro,DaphneChen,QiuyuChen,TrinityChung,Jaimyn
[9] Physical Intelligence, Kevin Black, Noah Brown, James Drake, Ethan Paul Foster, Jensen Gao, Vitor Guizilini,
Darpinian, Karan Dhabalia, Danny Driess, Adnan Esmail, David Antonio Herrera, Minho Heo, Kyle Hsu, Jiaheng
Michael Equi, Chelsea Finn, Niccolo Fusai, Manuel Y. Hu, Muhammad Zubair Irshad, Donovon Jackson, Char-
Galliker, Dibya Ghosh, Lachy Groom, Karol Hausman, lotte Le, Yunshuang Li, Kevin Lin, Roy Lin, Zehan Ma,
Brian Ichter, Szymon Jakubczak, Tim Jones, Liyiming Abhiram Maddukuri, Suvir Mirchandani, Daniel Morton,
Ke, Devin LeBlanc, Sergey Levine, Adrian Li-Bell, Tony Nguyen, Abigail O’Neill, Rosario Scalise, Derick
Mohith Mothukuri, Suraj Nair, Karl Pertsch, Allen Z. Seale, Victor Son, Stephen Tian, Emi Tran, Andrew E.
Ren, Lucy Xiaoyang Shi, Laura Smith, Jost Tobias Wang, Yilin Wu, Annie Xie, Jingyun Yang, Patrick Yin,
Springenberg, Kyle Stachowicz, James Tanner, Quan Yunchu Zhang, Osbert Bastani, Glen Berseth, Jeannette
Vuong, Homer Walke, Anna Walling, Haohuan Wang, Bohg, Ken Goldberg, Abhinav Gupta, Abhishek Gupta,
Lili Yu, and Ury Zhilinsky. π : a vision-language- DineshJayaraman,JosephJLim,JitendraMalik,Roberto
0.5
action model with open-world generalization, 2025. URL Mart´ın-Mart´ın,SubramanianRamamoorthy,DorsaSadigh,
https://arxiv.org/abs/2504.16054. Shuran Song, Jiajun Wu, Michael C. Yip, Yuke Zhu,
[10] Arhan Jain, Mingtong Zhang, Kanav Arora, William Thomas Kollar, Sergey Levine, and Chelsea Finn. Droid:
Chen, Marcel Torne, Muhammad Zubair Irshad, Sergey A large-scale in-the-wild robot manipulation dataset.
Zakharov, Yue Wang, Sergey Levine, Chelsea Finn, Wei- 2024.
ChiuMa,DhruvShah,AbhishekGupta,andKarlPertsch. [14] Hadas Kress-Gazit, Kunimatsu Hashimoto, Naveen Kup-

puswamy, Paarth Shah, Phoebe Horgan, Gordon Richard- JumyungChang,AnkaHeChen,PablodeHerasCiechom-
son, Siyuan Feng, and Benjamin Burchfiel. Robot ski, Gilles Daviet, Mohammad Mohajerani, Julia von
learning as an empirical science: Best practices for policy Muralt, Viktor Reutskyy, Michael Sauter, Simon Schirm,
evaluation, 2024. URL https://arxiv.org/abs/2409.09491. Eric L. Shi, Pierre Terdiman, Kenny Vilella, Tobias
[15] ChengshuLi,RuohanZhang,JosiahWong,CemGokmen, Widmer, Gordon Yeoman, Tiffany Chen, Sergey Grizan,
Sanjana Srivastava, Roberto Mart´ın-Mart´ın, Chen Wang, Cathy Li, Lotus Li, Connor Smith, Rafael Wiltz, Kostas
Gabrael Levine, Wensi Ai, Benjamin Martinez, et al. Alexis, Yan Chang, David Chu, Linxi ”Jim” Fan, Farbod
Behavior-1k: A human-centered, embodied ai benchmark Farshidian, Ankur Handa, Spencer Huang, Marco Hutter,
with 1,000 everyday activities and realistic simulation. Yashraj Narang, Soha Pouya, Shiwei Sheng, Yuke Zhu,
arXiv preprint arXiv:2403.09227, 2024. Miles Macklin, Adam Moravanszky, Philipp Reist, Yun-
[16] Xuanlin Li, Kyle Hsu, Jiayuan Gu, Karl Pertsch, Oier rongGuo,DavidHoeller,andGavrielState. IsaacLab:A
Mees, Homer Rich Walke, Chuyuan Fu, Ishikaa Lunawat, GPU-accelerated simulation framework for multi-modal
Isabel Sieh, Sean Kirmani, Sergey Levine, Jiajun Wu, robot learning. arXiv preprint arXiv:2511.04831, 2025.
Chelsea Finn, Hao Su, Quan Vuong, and Ted Xiao. URL https://arxiv.org/abs/2511.04831.
Evaluating real-world robot manipulation policies in [22] Nicolas Moenne-Loccoz, Ashkan Mirzaei, Or Perel,
simulation. arXiv preprint arXiv:2405.05941, 2024. Riccardo de Lutio, Janick Martinez Esturo, Gavriel State,
[17] YunzhiLin,JonathanTremblay,StephenTyree,PatricioA. Sanja Fidler, Nicholas Sharp, and Zan Gojcic. 3d
Vela, and Stan Birchfield. Multi-view fusion for multi- gaussianraytracing:Fasttracingofparticlescenes. ACM
level robotic scene understanding. In IEEE/RSJ Inter- Transactions on Graphics and SIGGRAPH Asia, 2024.
national Conference on Intelligent Robots and Systems [23] NVIDIA. Isaac Sim. URL https://github.com/isaac-sim/
(IROS),pages6817–6824,2021. doi:10.1109/IROS51168. IsaacSim.
2021.9635994. [24] NVIDIA, Johan Bjorck, Nikita Cherniadev Fer-
[18] ZhiqiuLin,DeepakPathak,BaiqiLi,JiayaoLi,XideXia, nando Castan˜eda, Xingye Da, Runyu Ding, Linxi ”Jim”
Graham Neubig, Pengchuan Zhang, and Deva Ramanan. Fan, Yu Fang, Dieter Fox, Fengyuan Hu, Spencer Huang,
Evaluating text-to-visual generation with image-to-text Joel Jang, Zhenyu Jiang, Jan Kautz, Kaushil Kundalia,
generation, 2024. URL https://arxiv.org/abs/2404.01291. Lawrence Lao, Zhiqi Li, Zongyu Lin, Kevin Lin, Guilin
[19] Bo Liu, Yifeng Zhu, Chongkai Gao, Yihao Feng, Qiang Liu,EdithLlontop,LoicMagne,AjayMandlekar,Avnish
Liu, Yuke Zhu, and Peter Stone. Libero: Benchmarking Narayan, Soroush Nasiriany, Scott Reed, You Liang Tan,
knowledge transfer for lifelong robot learning. Advances Guanzhi Wang, Zu Wang, Jing Wang, Qi Wang, Jiannan
in Neural Information Processing Systems, 36:44776– Xiang, Yuqi Xie, Yinzhen Xu, Zhenjia Xu, Seonghyeon
44791, 2023. Ye, Zhiding Yu, Ao Zhang, Hao Zhang, Yizhou Zhao,
[20] Oier Mees, Lukas Hermann, Erick Rosete-Beas, and Ruijie Zheng, and Yuke Zhu. GR00T N1: An open
Wolfram Burgard. CALVIN: A Benchmark for Language- foundation model for generalist humanoid robots. In
Conditioned Policy Learning for Long-Horizon Robot ArXiv Preprint, March 2025.
Manipulation Tasks. IEEE Robotics and Automation [25] OpenAI, Josh Achiam, Steven Adler, Sandhini Agar-
Letters, 7(3):7327–7334, 2022. wal, Lama Ahmad, Ilge Akkaya, Florencia Leoni Ale-
[21] Mayank Mittal, Pascal Roth, James Tigue, Antoine man, Diogo Almeida, Janko Altenschmidt, Sam Altman,
Richard, Octi Zhang, Peter Du, Antonio Serrano-Mun˜oz, Shyamal Anadkat, Red Avila, Igor Babuschkin, Suchir
Xinjie Yao, Rene´ Zurbru¨gg, Nikita Rudin, Lukasz Balaji, Valerie Balcom, Paul Baltescu, Haiming Bao,
Wawrzyniak, Milad Rakhsha, Alain Denzler, Eric Heiden, Mohammad Bavarian, Jeff Belgum, Irwan Bello, Jake
Ales Borovicka, Ossama Ahmed, Iretiayo Akinola, Abrar Berdine, Gabriel Bernadett-Shapiro, Christopher Berner,
Anwar, Mark T. Carlson, Ji Yuan Feng, Animesh Garg, Lenny Bogdonoff, Oleg Boiko, Madelaine Boyd, Anna-
Renato Gasoto, Lionel Gulich, Yijie Guo, M. Gussert, Luisa Brakman, Greg Brockman, Tim Brooks, Miles
AlexHansen,MihirKulkarni,ChenranLi,WeiLiu,Viktor Brundage, Kevin Button, Trevor Cai, Rosie Campbell,
Makoviychuk, Grzegorz Malczyk, Hammad Mazhar, Ma- Andrew Cann, Brittany Carey, Chelsea Carlson, Rory
soudMoghani,AdithyavairavanMurali,MichaelNosewor- Carmichael, Brooke Chan, Che Chang, Fotis Chantzis,
thy, Alexander Poddubny, Nathan Ratliff, Welf Rehberg, Derek Chen, Sully Chen, Ruby Chen, Jason Chen, Mark
Clemens Schwarke, Ritvik Singh, James Latham Smith, Chen, Ben Chess, Chester Cho, Casey Chu, Hyung Won
Bingjie Tang, Ruchik Thaker, Matthew Trepte, Karl Van Chung, Dave Cummings, Jeremiah Currier, Yunxing Dai,
Wyk, Fangzhou Yu, Alex Millane, Vikram Ramasamy, Cory Decareaux, Thomas Degry, Noah Deutsch, Damien
Remo Steiner, Sangeeta Subramanian, Clemens Volk, Deville, Arka Dhar, David Dohan, Steve Dowling, Sheila
CY Chen, Neel Jawale, Ashwin Varghese Kuruttukulam, Dunning, Adrien Ecoffet, Atty Eleti, Tyna Eloundou,
Michael A. Lin, Ajay Mandlekar, Karsten Patzwaldt, David Farhi, Liam Fedus, Niko Felix, Simo´n Posada
John Welsh, Huihua Zhao, Fatima Anes, Jean-Francois Fishman, Juston Forte, Isabella Fulford, Leo Gao, Elie
Lafleche, Nicolas Moe¨nne-Loccoz, Soowan Park, Rob Georges, Christian Gibson, Vik Goel, Tarun Gogineni,
Stepinski, Dirk Van Gelder, Chris Amevor, Jan Carius, Gabriel Goh, Rapha Gontijo-Lopes, Jonathan Gordon,

MorganGrafstein,ScottGray,RyanGreene,JoshuaGross, Zhuk, and Barret Zoph. Gpt-4 technical report, 2024.
Shixiang Shane Gu, Yufei Guo, Chris Hallacy, Jesse Han, URL https://arxiv.org/abs/2303.08774.
JeffHarris,YuchenHe,MikeHeaton,JohannesHeidecke, [26] OpenAI, Aaron Jaech, Adam Kalai, Adam Lerer, Adam
ChrisHesse,AlanHickey,WadeHickey,PeterHoeschele, Richardson, Ahmed El-Kishky, Aiden Low, Alec Helyar,
Brandon Houghton, Kenny Hsu, Shengli Hu, Xin Hu, Aleksander Madry, Alex Beutel, Alex Carney, Alex
Joost Huizinga, Shantanu Jain, Shawn Jain, Joanne Jang, Iftimie, Alex Karpenko, Alex Tachard Passos, Alexander
AngelaJiang,RogerJiang,HaozhunJin,DennyJin,Shino Neitz, Alexander Prokofiev, Alexander Wei, Allison Tam,
Jomoto, Billie Jonn, Heewoo Jun, Tomer Kaftan, Łukasz Ally Bennett, Ananya Kumar, Andre Saraiva, Andrea
Kaiser, Ali Kamali, Ingmar Kanitscheider, Nitish Shirish Vallone, Andrew Duberstein, Andrew Kondrich, Andrey
Keskar, Tabarak Khan, Logan Kilpatrick, Jong Wook Mishchenko, Andy Applebaum, Angela Jiang, Ashvin
Kim, Christina Kim, Yongjik Kim, Jan Hendrik Kirchner, Nair, Barret Zoph, Behrooz Ghorbani, Ben Rossen,
Jamie Kiros, Matt Knight, Daniel Kokotajlo, Łukasz Benjamin Sokolowsky, Boaz Barak, Bob McGrew, Borys
Kondraciuk, Andrew Kondrich, Aris Konstantinidis, Kyle Minaiev, Botao Hao, Bowen Baker, Brandon Houghton,
Kosic, Gretchen Krueger, Vishal Kuo, Michael Lampe, Brandon McKinzie, Brydon Eastman, Camillo Lugaresi,
Ikai Lan, Teddy Lee, Jan Leike, Jade Leung, Daniel Cary Bassin, Cary Hudson, Chak Ming Li, Charles
Levy, Chak Ming Li, Rachel Lim, Molly Lin, Stephanie de Bourcy, Chelsea Voss, Chen Shen, Chong Zhang,
Lin,MateuszLitwin,TheresaLopez,RyanLowe,Patricia Chris Koch, Chris Orsinger, Christopher Hesse, Clau-
Lue,AnnaMakanju,KimMalfacini,SamManning,Todor dia Fischer, Clive Chan, Dan Roberts, Daniel Kappler,
Markov, Yaniv Markovski, Bianca Martin, Katie Mayer, Daniel Levy, Daniel Selsam, David Dohan, David Farhi,
Andrew Mayne, Bob McGrew, Scott Mayer McKinney, David Mely, David Robinson, Dimitris Tsipras, Doug Li,
Christine McLeavey, Paul McMillan, Jake McNeil, David Dragos Oprica, Eben Freeman, Eddie Zhang, Edmund
Medina,AalokMehta,JacobMenick,LukeMetz,Andrey Wong, Elizabeth Proehl, Enoch Cheung, Eric Mitchell,
Mishchenko, Pamela Mishkin, Vinnie Monaco, Evan Eric Wallace, Erik Ritter, Evan Mays, Fan Wang, Fe-
Morikawa, Daniel Mossing, Tong Mu, Mira Murati, lipe Petroski Such, Filippo Raso, Florencia Leoni, Foivos
Oleg Murk, David Me´ly, Ashvin Nair, Reiichiro Nakano, Tsimpourlas, Francis Song, Fred von Lohmann, Freddie
RajeevNayak,Arvind Neelakantan,RichardNgo, Hyeon- Sulit, Geoff Salmon, Giambattista Parascandolo, Gildas
wooNoh,LongOuyang,CullenO’Keefe,JakubPachocki, Chabot, Grace Zhao, Greg Brockman, Guillaume Leclerc,
AlexPaino,JoePalermo,AshleyPantuliano,Giambattista Hadi Salman, Haiming Bao, Hao Sheng, Hart Andrin,
Parascandolo, Joel Parish, Emy Parparita, Alex Passos, Hessam Bagherinezhad, Hongyu Ren, Hunter Lightman,
Mikhail Pavlov, Andrew Peng, Adam Perelman, Filipe Hyung Won Chung, Ian Kivlichan, Ian O’Connell, Ian
de Avila Belbute Peres, Michael Petrov, Henrique Ponde Osband, Ignasi Clavera Gilaberte, Ilge Akkaya, Ilya
de Oliveira Pinto, Michael, Pokorny, Michelle Pokrass, Kostrikov, Ilya Sutskever, Irina Kofman, Jakub Pachocki,
Vitchyr H. Pong, Tolly Powell, Alethea Power, Boris James Lennon, Jason Wei, Jean Harb, Jerry Twore,
Power, Elizabeth Proehl, Raul Puri, Alec Radford, Jack Jiacheng Feng, Jiahui Yu, Jiayi Weng, Jie Tang, Jieqi
Rae, Aditya Ramesh, Cameron Raymond, Francis Real, Yu, Joaquin Quin˜onero Candela, Joe Palermo, Joel Parish,
KendraRimbach,CarlRoss,BobRotsted,HenriRoussez, Johannes Heidecke, John Hallman, John Rizzo, Jonathan
Nick Ryder, Mario Saltarelli, Ted Sanders, Shibani Gordon,JonathanUesato,JonathanWard,JoostHuizinga,
Santurkar,GirishSastry,HeatherSchmidt,DavidSchnurr, Julie Wang, Kai Chen, Kai Xiao, Karan Singhal, Karina
John Schulman, Daniel Selsam, Kyla Sheppard, Toki Nguyen, Karl Cobbe, Katy Shi, Kayla Wood, Kendra
Sherbakov, Jessica Shieh, Sarah Shoker, Pranav Shyam, Rimbach,KerenGu-Lemberg,KevinLiu,KevinLu,Kevin
Szymon Sidor, Eric Sigler, Maddie Simens, Jordan Stone, Kevin Yu, Lama Ahmad, Lauren Yang, Leo Liu,
Sitkin, Katarina Slama, Ian Sohl, Benjamin Sokolowsky, Leon Maksin, Leyton Ho, Liam Fedus, Lilian Weng,
Yang Song, Natalie Staudacher, Felipe Petroski Such, Linden Li, Lindsay McCallum, Lindsey Held, Lorenz
NatalieSummers,IlyaSutskever,JieTang,NikolasTezak, Kuhn, Lukas Kondraciuk, Lukasz Kaiser, Luke Metz,
Madeleine B. Thompson, Phil Tillet, Amin Tootoonchian, Madelaine Boyd, Maja Trebacz, Manas Joglekar, Mark
Elizabeth Tseng, Preston Tuggle, Nick Turley, Jerry Chen, Marko Tintor, Mason Meyer, Matt Jones, Matt
Tworek, Juan Felipe Cero´n Uribe, Andrea Vallone, Arun Kaufer, Max Schwarzer, Meghan Shah, Mehmet Yatbaz,
Vijayvergiya,ChelseaVoss,CarrollWainwright,JustinJay Melody Y. Guan, Mengyuan Xu, Mengyuan Yan, Mia
Wang, Alvin Wang, Ben Wang, Jonathan Ward, Jason Glaese, Mianna Chen, Michael Lampe, Michael Malek,
Wei, CJ Weinmann, Akila Welihinda, Peter Welinder, Michele Wang, Michelle Fradin, Mike McClay, Mikhail
Jiayi Weng, Lilian Weng, Matt Wiethoff, Dave Willner, Pavlov, Miles Wang, Mingxuan Wang, Mira Murati,
Clemens Winter, Samuel Wolrich, Hannah Wong, Lauren Mo Bavarian, Mostafa Rohaninejad, Nat McAleese, Neil
Workman, Sherwin Wu, Jeff Wu, Michael Wu, Kai Xiao, Chowdhury,NeilChowdhury,NickRyder,NikolasTezak,
Tao Xu, Sarah Yoo, Kevin Yu, Qiming Yuan, Wojciech Noam Brown, Ofir Nachum, Oleg Boiko, Oleg Murk,
Zaremba, Rowan Zellers, Chong Zhang, Marvin Zhang, Olivia Watkins, Patrick Chao, Paul Ashbourne, Pavel
Shengjia Zhao, Tianhao Zheng, Juntang Zhuang, William Izmailov, Peter Zhokhov, Rachel Dias, Rahul Arora,

Randall Lin, Rapha Gontijo Lopes, Raz Gaon, Reah Hyunjong Song, Guangyan Cai, Zhuo Xu, Xiaochen Hu,
Miyara, Reimar Leike, Renny Hwang, Rhythm Garg, Changxi Zheng, and Yunzhu Li. Real-to-sim robot policy
Robin Brown, Roshan James, Rui Shu, Ryan Cheu, Ryan evaluation with gaussian splatting simulation of soft-body
Greene, Saachi Jain, Sam Altman, Sam Toizer, Sam interactions. arXiv preprint arXiv:2511.04665, 2025.
Toyer, Samuel Miserendino, Sandhini Agarwal, Santiago [35] Xueyang Zhou, Yangming Xu, Guiyao Tie, Yongchao
Hernandez, Sasha Baker, Scott McKinney, Scottie Yan, Chen, Guowen Zhang, Duanfeng Chu, Pan Zhou, and
Shengjia Zhao, Shengli Hu, Shibani Santurkar, Shra- Lichao Sun. Libero-pro: Towards robust and fair evalua-
manRayChaudhuri,ShuyuanZhang,SiyuanFu,Spencer tion of vision-language-action models beyond memoriza-
Papay,StephLin,SuchirBalaji,SuvanshSanjeev,Szymon tion. [arXiv preprint arXiv:2510.03827], 2025.
Sidor, Tal Broda, Aidan Clark, Tao Wang, Taylor Gordon, [36] YukeZhu,JosiahWong,AjayMandlekar,RobertoMart´ın-
TedSanders,TejalPatwardhan,ThibaultSottiaux,Thomas Mart´ın, Abhishek Joshi, Kevin Lin, Soroush Nasiriany,
Degry, Thomas Dimson, Tianhao Zheng, Timur Garipov, and Yifeng Zhu. robosuite: A modular simulation
Tom Stasi, Trapit Bansal, Trevor Creech, Troy Peterson, framework and benchmark for robot learning. In arXiv
Tyna Eloundou, Valerie Qi, Vineet Kosaraju, Vinnie preprint arXiv:2009.12293, 2020.
Monaco, Vitchyr Pong, Vlad Fomenko, Weiyi Zheng, [37] Alex Zook, Fan-Yun Sun, Josef Spjut, Valts Blukis, Stan
Wenda Zhou, Wes McCabe, Wojciech Zaremba, Yann Birchfield, and Jonathan Tremblay. Grs: Generating
Dubois, Yinghai Lu, Yining Chen, Young Cha, Yu Bai, robotic simulation tasks from real-world images. In Pro-
Yuchen He, Yuchen Zhang, Yunyun Wang, Zheng Shao, ceedings of the Computer Vision and Pattern Recognition
and Zhuohan Li. Openai o1 system card, 2024. URL Conference, pages 594–603, 2025.
https://arxiv.org/abs/2412.16720.
[27] KarlPertsch,KyleStachowicz,BrianIchter,DannyDriess,
Suraj Nair, Quan Vuong, Oier Mees, Chelsea Finn, and
Sergey Levine. Fast: Efficient action tokenization for
vision-language-action models, 2025. URL https://arxiv.
org/abs/2501.09747.
[28] Mohammad Nomaan Qureshi, Sparsh Garg, Francisco
Yandun, David Held, George Kantor, and Abhishesh
Silwal. Splatsim: Zero-shot sim2real transfer of rgb
manipulationpoliciesusinggaussiansplatting,2024. URL
https://arxiv.org/abs/2409.10161.
[29] Jonathan Tremblay, Aayush Prakash, David Acuna, Mark
Brophy,VarunJampani,CemAnil,ThangTo,EricCamer-
acci,ShaadBoochoon,andStanBirchfield. Trainingdeep
networks with synthetic data: Bridging the reality gap
by domain randomization. In Proceedings of the IEEE
conference on computer vision and pattern recognition
workshops, pages 969–977, 2018.
[30] Qi Wu, Janick Martinez Esturo, Ashkan Mirzaei, Nicolas
Moenne-Loccoz, and Zan Gojcic. 3dgut: Enabling
distortedcamerasandsecondaryraysingaussiansplatting.
Conference on Computer Vision and Pattern Recognition
(CVPR), 2025.
[31] Yu Xiang, Tanner Schmidt, Venkatraman Narayanan, and
Dieter Fox. Posecnn: A convolutional neural network for
6d object pose estimation in cluttered scenes. 2018.
[32] Yandan Yang, Baoxiong Jia, Shujie Zhang, and Siyuan
Huang. Sceneweaver: All-in-one 3d scene synthesis with
an extensible and self-reflective agent, 2025. URL https:
//arxiv.org/abs/2509.20414.
[33] Tianhe Yu, Deirdre Quillen, Zhanpeng He, Ryan Julian,
Avnish Narayan, Hayden Shively, Adithya Bellathur,
Karol Hausman, Chelsea Finn, and Sergey Levine. Meta-
world: A benchmark and evaluation for multi-task and
meta reinforcement learning, 2021. URL https://arxiv.org/
abs/1910.10897.
[34] KaifengZhang,ShuoSha,HanxiaoJiang,MatthewLoper,

APPENDIXA positions. For object pose, reference pose is the origin of
DETAILSONTHEROBOLABBENCHMARK the robot base.
In this section we provide detail on the benchmark. Prior Specification. We adopt non-informative uniform priors
RoboLab provides a set of ∼300 object assets from well- to avoid biasing the inference toward any particular parameter
known 3D pose estimation benchmarks; including YCB [31], region. For continuous parameters normalized to the unit
HOT3D [3], HOPE [17], HANDAL [8], and VoMP [6]. interval:
Each asset contains a visual and collision mesh, with mass m
(cid:89)
and friction properties added. Each object has a language p(θ)= Uniform(0,1)=1, θ ∈[0,1]. (4)
j
description and an object label attached to it. This forms the j=1
catalog of objects used in the scenes, in either manual or
Training Objective. The neural network parameters ϕ are
LLM-scaled scene environments.
optimized by minimizing the negative log-likelihood over the
RoboLab the RoboLab-120 benchmark contains 120 manu-
training dataset, D ={(θ ,x )}N :
ally generated tasks. These tasks span one or more categories. i i i=1
Moredetailsonthebenchmarkimplementationwillbeprovided N
1 (cid:88)
in the code repository, which will be open sourced. L(ϕ)=− N logq ϕ (θ i |x i ). (5)
We provide additional details on the results reported in the i=1
paper. Please refer to Table VI for expanded results on overall We train for 50 epochs using the Adam optimizer on data
performance on our benchmark; Table VII for more details collected from the camera pose variation and initial pose
on the language ablation; Table VIII for details on the real- variation experiments (see Table III).
sim verification experiments; and Tables IX-XIII for detailed
Importance Sampling Correction. Since the experimental
per-task results for each policy.
data may sample parameters non-uniformly, we apply impor-
APPENDIXB tance sampling to recover the posterior under a uniform prior:
DETAILSOFMNPESENSITIVITYANALYSIS p(θ |x)≈ p p˜ ( ( θ θ) )q ϕ (θ |x), where p˜(θ) is the empirical proposal
distribution. We correct posterior samples using importance
MNPE allows us to analyze the relationship between scene
weights:
parameters and policy outcomes in a likelihood-free Bayesian
p(θ )
inference setting. w = i , (6)
i p˜(θ )
i
Variable Definitions. Let θ ∈Θ denote the vector of varia-
where p˜(θ) is estimated via Gaussian kernel density estimation
tion parameters. In our camera pose sensitivity experiments, onthetrainingdata.TheeffectivesamplesizeESS=1/ (cid:80) w¯2
θ = (d ,d ) ∈ R2 where d and d represent the i i
ext wrist ext wrist quantifies the efficiency of this correction.
displacement of the external and wrist cameras from their
reference configurations, respectively, in SE(3). Posterior Inference. Given a query observation x o (e.g.,
Let x∈{0,1} denote the binary task success indicator, and x o =1 for successful task completion), we draw N s =5000
let π denote the robot policy being evaluated. samples from the learned posterior:
Handling Mixed Parameters. For experiments involving
(cid:110)
θ(i)
(cid:111)Ns
∼q (θ |x ). (7)
ϕ o
both continuous parameters (e.g., pose distances) and discrete i=1
parameters (e.g., lighting levels, table materials), MNPE Posterior Statistics. For each continuous parameter, we
handles mixed continuous-discrete parameters through fac- compute the posterior mean and 95% credible interval:
torization: q (θ | x) = q (θcont | θdisc,x) · q (θdisc | x),
where discre
ϕ
te components
ϕ
use softmax distri
ϕ
butions and µˆ = 1 (cid:88)
Ns
θ(i), (8)
continuous components use normalizing flows. In our camera j N s j
i=1
pose experiments, all parameters are continuous. (cid:104) (cid:16) (cid:17) (cid:16) (cid:17)(cid:105)
CI(j) = Q {θ(i)} , Q {θ(i)} , (9)
95% 0.025 j 0.975 j
Pose Distance Metric. Poses are represented as 7-DoF
transformations T=(p,q) comprising position p∈R3 and where Q α (·) denotes the α-quantile.
unit quaternion orientation q ∈ H. We compute a weighted This analysis reveals which variation parameters are most
strongly associated with successful task outcomes: a posterior
distance from the reference configuration:
distribution tightly concentrated near zero indicates high
d(T,T ref )=∥p−p ref ∥ 2 +β·d SO(3) (q,q ref ), (2) sensitivity to that parameter (the policy requires it to remain
near the reference value), while a broad posterior indicates
where the geodesic distance on SO(3) is:
robustness to variation.
d (q ,q )=2arccos(min(1,|q ·q |)). (3)
SO(3) 1 2 1 2 APPENDIXC
The weighting factor β =1.0 balances translational (meters) DETAILSONSCALINGSCENEGENERATION
and rotational (radians) components. For camera displacement, We present additional implementation details on scene
reference poses correspond to nominal camera mounting generation (Section III-D1).

TABLE VI: Expanded results of Table I: Overall performance of VLAs on RoboLab (Best viewed with zoom).
Cat T e a g s o k ries # π0.5 π0-FAS T GR00TN 1 .6 π0 PaliGem m a
Succ% Score SPARC Speed(cm/s) Succ% Score S PARC Speed(cm/s) Succ% Score SP A RC Speed(cm/s) Succ% Score SPARC Speed(cm/s) Succ% Score S P ARC Speed(cm/s)
−9.92(±5.98) −9.53(±6.12) −9.25(±4.96) −9.51(±3.91) −21.25(±14.94)
Total simple 120 65 26.3% 23.3% 0.39 0.35 −8.30(±5.05) 5.7(±1.8) 5.8(±1.8) 15.7% 21.7% 0.29 0.28 −8.23(±6.27) 4.6(±1.7) 4.7(±1.6) 2.0% 1.9% 0.10 0.06 −10.15(±4.41) 4.0(±1.8) 4.0(±1.8) 5.2% 8.1% 0.14 0.10 −8.49(±4.03) 4.5(±1.3) 4.4(±1.4) 1.9% 1.5% 0.02 0.07 −17.77(±12.91) 0.9(±1.2) 0.9(±1.1)
moderate 38 23.2% 0.44 −10.55(±5.87) 5.9(±2.0) 11.3% 0.30 −9.85(±5.46) 4.7(±2.0) 3.1% 0.19 −9.56(±5.66) 4.0(±1.8) 2.6% 0.18 −10.42(±3.35) 4.3(±1.5) 1.5% 0.11 −22.58(±16.36) 0.9(±1.2)
complex 18 11.7% 0.43 −15.32(±7.31) 4.8(±1.5) 2.9% 0.31 −13.71(±4.87) 4.2(±1.2) 0.0% 0.10 −5.17(±2.74) 3.9(±1.9) 0.0% 0.14 −11.28(±3.52) 4.1(±1.1) 0.0% 0.12 −31.32(±13.64) 0.7(±0.5)
Procedural 34 15.6% 0.39 −12.47(±5.96) 5.1(±1.7) 3.5% 0.25 −10.90(±4.62) 4.4(±1.3) 3.5% 0.11 −7.51(±4.05) 4.0(±1.9) 0.0% 0.11 −10.80(±3.42) 4.2(±1.2) 0.0% 0.06 −25.69(±15.96) 0.6(±0.6)
affordance 12 13.3% 0.35 −12.48(±6.06) −14.84(±7.88) 4.9(±1.7) 1.7% 0.20 −10.39(±4.77) −11.19(±5.98) 4.0(±1.1) 3.3% 0.15 −7.93(±3.89) −6.95(±3.36) 4.5(±2.3) 0.0% 0.11 −10.75(±3.13) −12.39(±2.26) 4.6(±1.6) 0.0% 0.03 −22.88(±15.67) −27.36(±18.43) 0.7(±0.7)
reorientation stacking 6 6 16.7% 15.0% 0.37 0.35 −9.62(±2.80) 4.9(±1.4) 6.1(±1.2) 3.3% 6.7% 0.14 0.28 −8.63(±2.27) 4.7(±1.3) 5.4(±1.4) 13.3% 0.0% 0.00 0.16 −10.90(±4.61) 4.0(±1.9) 4.6(±1.9) 0.0% 0.0% 0.01 0.07 −9.68(±3.79) 3.8(±0.8) 4.0(±1.0) 0.0% 0.0% 0.00 0.05 −18.72(±8.67) 0.5(±0.6) 0.6(±0.5)
Relational 42 32.1% 0.43 −9.32(±6.16) 6.0(±1.9) 25.7% 0.40 −8.72(±5.93) 5.0(±2.0) 0.0% 0.12 −9.66(±5.14) 4.0(±1.9) 7.6% 0.21 −9.12(±3.37) 4.8(±1.6) 2.4% 0.12 −19.56(±15.28) 1.1(±1.5)
conjunction 8 56.2% 0.68 −7.44(±3.68) 6.3(±1.5) 38.8% 0.54 −9.08(±8.77) 5.3(±1.8) 0.0% 0.04 −8.93(±2.56) 3.0(±0.9) 20.0% 0.28 −8.46(±4.74) 4.8(±1.4) 1.2% 0.05 −16.82(±10.01) 1.5(±1.5)
counting 7 50.0% 0.74 −11.43(±10.91) 7.0(±2.8) 40.0% 0.61 −9.61(±7.39) 5.5(±2.5) 0.0% 0.12 −7.70(±4.50) 3.6(±1.1) 12.9% 0.32 −9.34(±2.70) 4.7(±1.7) 8.6% 0.24 −19.80(±12.79) 1.7(±2.2)
spatial 29 19.0% 0.30 −9.34(±4.89) 5.7(±1.6) 16.9% 0.31 −8.40(±4.37) 4.8(±1.9) 0.0% 0.15 −10.34(±5.65) 4.4(±2.1) 2.4% 0.16 −9.25(±3.04) 4.8(±1.6) 1.0% 0.11 −20.25(±16.90) 0.9(±1.3)
Visual 83 17.7% 0.34 −10.27(±5.70) 5.5(±1.8) 9.0% 0.22 −10.18(±5.99) 4.3(±1.5) 1.4% 0.09 −9.38(±5.70) 3.9(±1.8) 1.4% 0.08 −9.87(±3.68) 4.2(±1.2) 1.7% 0.07 −23.46(±15.74) 0.9(±1.0)
color 26 17.3% 0.34 −9.53(±5.07) 5.6(±1.6) 5.8% 0.20 −9.30(±5.81) 4.6(±1.4) 0.0% 0.08 −9.47(±5.63) 3.8(±1.7) 0.0% 0.06 −9.54(±3.02) 4.1(±1.2) 0.0% 0.05 −20.92(±13.56) 0.9(±1.0)
semantics 59 18.3% 0.35 −10.76(±6.09) 5.5(±1.9) 11.7% 0.24 −10.81(±6.17) 4.2(±1.6) 2.0% 0.10 −9.52(±5.96) 3.9(±1.7) 1.7% 0.10 −10.19(±3.93) 4.2(±1.2) 2.3% 0.07 −24.86(±16.93) 0.8(±1.1)
size 6 13.3% 0.19 −8.77(±3.25) 4.7(±1.9) 1.7% 0.12 −7.66(±3.26) 4.3(±0.9) 0.0% 0.00 −7.63(±1.84) 4.6(±2.3) 3.3% 0.04 −8.08(±3.00) 3.8(±0.9) 0.0% 0.08 −20.43(±9.26) 1.0(±0.8)
|     |     |     |     |     |     |     | OBB(b | )   | = ∅ for | all previously |     | placed | objects | on the |
| --- | --- | --- | --- | --- | --- | --- | ----- | --- | ------- | -------------- | --- | ------ | ------- | ------ |
existing
|     |     |     |     |     |     |     | same support    | (Algorithm |            | 2). |      |           |           |          |
| --- | --- | --- | --- | --- | --- | --- | --------------- | ---------- | ---------- | --- | ---- | --------- | --------- | -------- |
|     |     |     |     |     |     |     | For Containment |            | (PlaceIn(b |     | i ,b | container | )), we    | compute  |
|     |     |     |     |     |     |     | the available   | interior   | volume     |     | of b |           | using its | bounding |
container
|     |     |     |     |     |     |     | box dimensions |     | d . We | employ | a   | packing | heuristic | that |
| --- | --- | --- | --- | --- | --- | --- | -------------- | --- | ------ | ------ | --- | ------- | --------- | ---- |
b
|     |     |     |     |     |     |     | discretizes    | the container’s |     | floor | into         | a grid | with          | resolution |
| --- | --- | --- | --- | --- | --- | --- | -------------- | --------------- | --- | ----- | ------------ | ------ | ------------- | ---------- |
|     |     |     |     |     |     |     | s=max(dx,dy)+ϵ |                 |     | .     | A cell (u,v) |        | is considered | valid      |
i i margin
|                                                    |     |     |     |     |     |     | if it is unoccupied |                                     | and        | within | the container’s |     | bounds | scaled by  |
| -------------------------------------------------- | --- | --- | --- | --- | --- | --- | ------------------- | ----------------------------------- | ---------- | ------ | --------------- | --- | ------ | ---------- |
|                                                    |     |     |     |     |     |     | factorγ             | =0.7toavoidedgecollisions.Weassigno |            |        |                 |     |        | tothefirst |
| Fig.9:(Left)WeshowoneofourGaussianSplat+Meshscenes |     |     |     |     |     |     |                     |                                     |            |        |                 |     |        | i          |
|                                                    |     |     |     |     |     |     | valid cell,         | setting                             | its height | z      | =z              |     | +h     | /2.        |
in RoboLab. This scene has a Gaussian splat background with i container container
acollisionmeshforthesplatestimatedwith3DGRUT[22,30], C. Baseline Method
| and a mesh | foreground. | All | objects | in the scene | have | spatially |             |     |          |     |                  |     |           |     |
| ---------- | ----------- | --- | ------- | ------------ | ---- | --------- | ----------- | --- | -------- | --- | ---------------- | --- | --------- | --- |
|            |             |     |         |              |      |           | To validate | the | efficacy | of  | our hierarchical |     | approach, | we  |
varying density, and thus mass is estimated with VoMP [6]. implement a robust baseline inspired by standard domain
| (Right) We | show a | VLA running |     | a task in | this scene. |     |     |     |     |     |     |     |     |     |
| ---------- | ------ | ----------- | --- | --------- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
randomizationtechniques.Thebaselineoperatesinasinglepass
|                                              |               |              |           |          |     |        | without     | iterative     | feedback.   | The       | process    | begins      | with        | the LLM  |
| -------------------------------------------- | ------------- | ------------ | --------- | -------- | --- | ------ | ----------- | ------------- | ----------- | --------- | ---------- | ----------- | ----------- | -------- |
|                                              |               |              |           |          |     |        | selecting   | a list of     | objects     | O and     | suggesting | a           | grid layout | (rows    |
| A. Stage                                     | I: Predicates | for Semantic |           | Planning |     |        |             |               |             |           |            |             |             |          |
|                                              |               |              |           |          |     |        | R× columns  | C)            | for the     | table     | surface.   | The table   | surface     | is then  |
|                                              |               |              |           |          |     |        | divided     | into R×C      | rectangular |           | cells,     | and objects | are         | assigned |
| The following                                | predicates    |              | are used: |          |     |        |             |               |             |           |            |             |             |          |
|                                              |               |              |           |          |     |        | to cells    | sequentially. | Within      | each      | cell       | k, the      | object’s    | position |
| • PlaceIn(x,y):Objectxmustbecontainedwithiny |               |              |           |          |     | (e.g., |             |               |             |           |            |             |             |          |
|                                              |               |              |           |          |     |        | is jittered | uniformly:    | p           | ∼U(center |            | −w/4,center |             | +w/4).   |
| fruit                                        | in a bowl).   |              |           |          |     |        |             |               | xy          |           |            | k           |             | k        |
PlaceOn(x,y): Object x is supported by y (e.g., mug on This ensures basic separation but precludes complex stacking
•
|     |     |     |     |     |     |     | or containment, |     | as objects | are | simply | placed | at a | safe height |
| --- | --- | --- | --- | --- | --- | --- | --------------- | --- | ---------- | --- | ------ | ------ | ---- | ----------- |
a coaster).
|                     |         |        |            |             |        |            | z =z      | +h            | /2.Finally,werunthesamephysicssimulation |          |         |           |       |            |
| ------------------- | ------- | ------ | ---------- | ----------- | ------ | ---------- | --------- | ------------- | ---------------------------------------- | -------- | ------- | --------- | ----- | ---------- |
| ClusterAround(x,{y  |         |        | }): Object | x acts      | as an  | anchor for | table     | obj           |                                          |          |         |           |       |            |
| •                   |         |        | i          |             |        |            |           |               |                                          |          |         |           |       |            |
|                     |         |        |            |             |        |            | pass as   | in our method |                                          | to allow | objects | to settle | under | gravity,   |
| a group             | {B i }. |        |            |             |        |            |           |               |                                          |          |         |           |       |            |
|                     |         |        |            |             |        |            | resolving | minor         | inter-penetrations                       |          | but     | without   | the   | capability |
| • PlaceAnywhere(x): |         | Object |            | x is placed | freely | on the     |           |               |                                          |          |         |           |       |            |
global support surface (table). to correct semantic or structural failures.
| If a predicate | refers | to a non-existent |     | anchor, | it is downgraded |     | D. Experiments |     |     |     |     |     |     |     |
| -------------- | ------ | ----------------- | --- | ------- | ---------------- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- |
to a PlaceAnywhere constraint to preserve the object in the We compare our scene generation with the baseline method
scene.
|     |     |     |     |     |     |     | using popular | scene | generation |     | metrics, | VQA | score | [18], GPT |
| --- | --- | --- | --- | --- | --- | --- | ------------- | ----- | ---------- | --- | -------- | --- | ----- | --------- |
preferencewhereitisshowntwoimageseachfromthebaseline
| B. Stage | II: Geometric | Constraint |     | Solving |     |     |               |     |          |     |           |     |           |      |
| -------- | ------------- | ---------- | --- | ------- | --- | --- | ------------- | --- | -------- | --- | --------- | --- | --------- | ---- |
|          |               |            |     |         |     |     | or our method | and | is asked | to  | pick one, | and | following | Yang |
For Global Placement (PlaceAnywhere), we utilize rejec- et al. [32], we report the visual realism (Real.), functionality
tion sampling on the global table surface bounds, checking (Func.), layout correctness (Lay.), Quality (Qual.) and scene
collision against all currently placed objects using SAT on completeness (Comp.) scores. We use GPT-4o [25] to generate
OBBs.Tohandlehigh-densityscenes,weemploytwostrategies: scenes from our method and baseline; and use GPT-4.1 [25]
(1) an adaptive relaxation loop that progressively increases for the evaluations. These metrics are computed on rendered
collision margins if a valid layout is not found, and (2) a RGB images from two viewpoints: a frontal view aligned with
stochastic perturbation step that randomly jitters all object the table axis (camera at (1.0,0.0,0.7) looking at table center)
| positions | when the | solver | converges | to  | a local | minimum |               |             |     |      |         |     |                  |     |
| --------- | -------- | ------ | --------- | --- | ------- | ------- | ------------- | ----------- | --- | ---- | ------- | --- | ---------------- | --- |
|           |          |        |           |     |         |         | and an angled | perspective |     | view | (camera | at  | (−0.3,0.3,0.7)). |     |
(Algorithm 1). We show quantitative comparisons across 100 generated
For Stacking (PlaceOn(b ,b )), we sample positions scenes for our method compared to the baselines in Table XIV.
i support
on the top surface of b support using rejection sampling (up to We show the quantitative comparisons split by the number of
K =20 attempts) to find a position p such that OBB(b )∩ objects in the scene ([1,5] objects, [6,15] objects, and [16,20]
|     |     |     |     | xy  |     | i   |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

TABLE VII: Expanded results of Table II: Language understanding ablations.(a) VLA performance degrades with abstract or
vague language instructions. π , PaliGemma and GR00T N1.6 excluded as no tasks were able to be completed. (b) Performance
0
drops as scene complexity increases. (c) VLAs show brittle language grounding, with consistent object confusion patterns
| across different | instructions |     | in the | same scene. |     |                      |      |         |              |     |     |         |     |     |
| ---------------- | ------------ | --- | ------ | ----------- | --- | -------------------- | ---- | ------- | ------------ | --- | --- | ------- | --- | --- |
|                  |              |     |        | (a) Effect  | of  | language specificity |      | on task | performance. |     |     |         |     |     |
|                  |              |     |        |             |     |                      | π0.5 |         |              |     |     | π0-FAST |     |     |
Task Succ% Score Time(s) WrongObj SPARC l(m) v(cm/s) Succ% Score Time(s) WrongObj SPARC l(m) v(cm/s)
BananasOutOfBinTask
“Takeallthebananasoutofthegreybinandputitonthetable.” 50 0.13 26.96 18 -10.54 2.26 5.7 30 0.05 34.29 4 -6.46 2.71 5.3
“Takethebananasout” 40 0.22 38.77 14 -9.90 2.63 5.2 10 0.15 24.53 3 -9.46 2.89 5.0
“Emptythegreybin” 10 0.07 79.47 120 -13.02 4.06 4.4 70 0.11 51.25 14 -7.46 3.79 6.2
WhiteMugsInBinTask
“Putthewhitemugsinthegreybin” 80 0.50 44.97 0 -6.50 3.39 7.1 20 0.22 54.00 7 -7.39 3.92 6.3
“Putthemugsinthebin” 90 0.50 35.13 1 -5.79 3.22 8.4 10 0.11 51.80 22 -6.74 4.28 7.0
“Putawaymugs” 0 0.00 - 0 -7.51 4.64 7.3 0 0.00 - 53 -7.20 4.05 6.3
RemoveMeasuringSpoonsfromthePlateTask
“Puttheorangemeasuringcupandthebluemeasuringcupoutsideoftheplate” 20 0.47 95.17 25 -17.91 4.97 3.0 0 0.31 - 5 -12.75 10.20 5.4
“Cleartheplate” 0 0.08 - 15 -13.43 9.76 5.1 0 0.10 - 0 -23.86 4.93 2.5
|     |     |      |     | (b) | Effect of | scene complexity |     | on task | performance. |     |     |           |     |     |
| --- | --- | ---- | --- | --- | --------- | ---------------- | --- | ------- | ------------ | --- | --- | --------- | --- | --- |
|     |     | π0.5 |     |     |           | π0-FAST          |     |         | π0           |     |     | GR00TN1.6 |     |     |
Scene Succ% Wrongobjectgrabbed Succ% Wrongobjectgrabbed Succ% Wrongobjectgrabbed Succ% Wrongobjectgrabbed
Task:“Packboxedfoodsintothebin”
| 1Box/Can    | 10  | -   |     |     | 0   | soupcan |     |     | 0 soupcan |     |     | 0 soupcan,mustard |     |     |
| ----------- | --- | --- | --- | --- | --- | ------- | --- | --- | --------- | --- | --- | ----------------- | --- | --- |
| 2Boxes/Cans | 0   | -   |     |     | 0   | soupcan |     |     | 0 soupcan |     |     | 0 soupcan,bin     |     |     |
3Boxes/Cans 0 spamcan,soupcan 0 soupcan 0 soupcan,spamcan 0 spamcan,soupcan
Task:“Packcannedfoodsintothebin”
| 1Box/Can    | 70  | bin            |     |     | 30              | -           |        |         | 0 -          |     |     | 0 - |           |     |
| ----------- | --- | -------------- | --- | --- | --------------- | ----------- | ------ | ------- | ------------ | --- | --- | --- | --------- | --- |
| 2Boxes/Cans | 30  | bin            |     |     | 10              | -           |        |         | 0 -          |     |     | 0 - |           |     |
| 3Boxes/Cans | 20  | bin,puddingbox |     |     | 0               | -           |        |         | 0 puddingbox |     |     | 0 - |           |     |
|             |     |                |     |     | (c) Instruction | sensitivity | within | fixed   | scenes.      |     |     |     |           |     |
|             |     |                |     |     | π0.5            |             |        | π0-FAST |              | π0  |     |     | GR00TN1.6 |     |
Task Succ% Wrongobjectgrabbed Succ% Wrongobjectgrabbed Succ% Wrongobjectgrabbed Succ% Wrongobjectgrabbed
FruitPlateScene
“Moveanorangeoralimetothewoodbowl” 50 pumpkin,redonion 0 - 0 - 0 redonion,woodenbowl
“Moveanorangetothewhitebowl” 0 pumpkin 0 - 0 pumpkin,woodenbowl 0 redonion,woodenbowl,pomegranate
“Puttheonioninthewoodbowl” 70 pumpkin,woodenbowl 10 - 20 - 20 woodenbowl,pumpkin,storagebox
“Puttheonionontheplate” 0 pumpkin 0 - 0 woodenbowl,lime 0 woodenbowl,pumpkin
ToolsCleanupScene
“Puthammersintherightbinandignoreeverythingelse” 20 rightbin,drill 0 drill 0 drill 0 -
“Puthammersintheleftbin” 10 leftbin 0 drill 0 drill 0 springclamp
ToolsSelectionScene
“Takeoutallthehammersandputitonthetable” 0 clamp,leftbin 0 - 0 drill,centerbin,rightbin 0 leftbin,centerbin
“Selectthecordlessdrillandputitonthetable” 70 redhammer,woodhammer,bluehammer 50 clamp 20 centerbin,rightbin 30 bluehammer,redhammer,clamp
“Selectthebluehammerandputitonthetable” 0 leftbin 0 redhammer 10 centerbin,rightbin,leftbin 0 leftbin,centerbin
objects) in Table XV. We show the quantitative comparisons through static analysis of the generated Python code. We then
split across the 10 scene themes we use in Table XVI. We prompted an LLM (also o1 [26]) to assess alignment between
find our method consistently outperforms the baseline across the instruction and the programmatic success conditions across
all metrics, with particularly large gains in visual realism and six dimensions: relation match (whether the spatial/logical
semantic functionality. relationship is preserved), target match (correctness of goal
|     |     |     |     |     |     |     | state), | object | match | (whether | referenced | objects | are | correct), |
| --- | --- | --- | --- | --- | --- | --- | ------- | ------ | ----- | -------- | ---------- | ------- | --- | --------- |
APPENDIXD
|     |     |     |     |     |     |     | quantifier |     | match (handling |     | of “all,” | “any,” or | specific | counts), |
| --- | --- | --- | --- | --- | --- | --- | ---------- | --- | --------------- | --- | --------- | --------- | -------- | -------- |
DETAILSONTASKGENERATIONEVALUATION instruction clarity (unambiguous and well-formed language),
|              |     |         |        |      |            |        | and | physical | feasibility | (whether | the | task is | achievable | given |
| ------------ | --- | ------- | ------ | ---- | ---------- | ------ | --- | -------- | ----------- | -------- | --- | ------- | ---------- | ----- |
| We evaluated | the | quality | of our | task | generation | method |     |          |             |          |     |         |            |       |
typicalrobotcapabilities).Eachdimensionwasscoredona0–1
| using an  | LLM-as-judge | framework. |      | Tasks              | were generated | by      |        |     |             |     |           |           |       |        |
| --------- | ------------ | ---------- | ---- | ------------------ | -------------- | ------- | ------ | --- | ----------- | --- | --------- | --------- | ----- | ------ |
|           |              |            |      |                    |                |         | scale, | and | we computed | an  | aggregate | alignment | score | as the |
| prompting | an LLM       | (o1 [26])  | with | scene descriptions |                | and our |        |     |             |     |           |           |       |        |
Category templates1. For each generated task, we extracted the weighted mean. The model additionally provided a categorical
|                  |             |     |         |               |     |             | verdict—aligned, |     | partially       |            | aligned, | or misaligned—based |     | on       |
| ---------------- | ----------- | --- | ------- | ------------- | --- | ----------- | ---------------- | --- | --------------- | ---------- | -------- | ------------------- | --- | -------- |
| natural language | instruction |     | and the | corresponding |     | termination |                  |     |                 |            |          |                     |     |          |
|                  |             |     |         |               |     |             | whether          |     | the termination | conditions |          | would correctly     |     | evaluate |
conditions(successcriteriaimplementedaspredicatefunctions)
|     |     |     |     |     |     |     | task | success | as described |     | in the instruction. |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ---- | ------- | ------------ | --- | ------------------- | --- | --- | --- |
1For2simplescenes,wegenerated1taskforeachofthe7categoriesand
TableXVIIshowsthatourmethodcansuccessfullygenerate
fortheremaining57scenes,wegenerated2tasks.Thisproduced57∗7∗
2+2∗7∗1=812tasks avarietyoftypesoftasksappropriatetotheassetsinthescene.

TABLE VIII: Expanded results of Table V: Comparison of Algorithm 1 Spatial Constraint Solver
| success | rates (%) | between | real | and | simulation | environments |     |        |         |     |            |     |              |     |
| ------- | --------- | ------- | ---- | --- | ---------- | ------------ | --- | ------ | ------- | --- | ---------- | --- | ------------ | --- |
|         |           |         |      |     |            |              |     | Input: | Objects | B,  | Predicates | P,  | Table Bounds | L   |
max
| per task. |     |     |     |     |     |     |     | Output: |     | 2D  | coordinates |     | (x,y,θ) | for all base |
| --------- | --- | --- | --- | --- | --- | --- | --- | ------- | --- | --- | ----------- | --- | ------- | ------------ |
objects
Success%
|              |     |      |       |         |      |      |           |     | Margins | M        | ←[µ,1.25µ,1.5µ,2.0µ] |     |     |     |
| ------------ | --- | ---- | ----- | ------- | ---- | ---- | --------- | --- | ------- | -------- | -------------------- | --- | --- | --- |
| Task         |     | Env  | π0.5  | π0-FAST |      | π0   | PaliGemma | 1:  |         |          |                      |     |     |     |
|              |     |      |       |         |      |      |           | 2:  | for all | margin∈M | do                   |     |     |     |
|              |     | Real | 90.9  |         | 80.0 | 80.0 | -         |     |         |          |                      |     |     |     |
| BananaInBowl |     |      |       |         |      |      |           |     | {Phase  | 1:       | Initialization}      |     |     |     |
|              |     | Sim  | 100.0 |         | 70.0 | 20.0 | 0.0       | 3:  |         |          |                      |     |     |     |
Real 100.0 30.0 90.0 0.0 4: Randomize (x,y) for all loose objects inside L max
BananaAndCubeInBowl
|                  |     | Sim  | 90.0 |     | 60.0 | 50.0  | 0.0 | 5:  | for | all p∈P                          | do  |     |           |           |
| ---------------- | --- | ---- | ---- | --- | ---- | ----- | --- | --- | --- | -------------------------------- | --- | --- | --------- | --------- |
|                  |     | Real | 83.3 |     | 60.0 | 100.0 | -   |     |     | if p.type==place-on-base         |     |     | then      |           |
| BananasOutOfBin  |     |      |      |     |      |       |     | 6:  |     |                                  |     |     |           |           |
|                  |     | Sim  | 50.0 |     | 30.0 | 0.0   | 0.0 |     |     |                                  |     |     |           |           |
|                  |     |      |      |     |      |       |     | 7:  |     | p.object.(x,y,θ)←(p.x,p.y,p.yaw) |     |     |           |           |
|                  |     | Real | 40.0 |     | 0.0  | 40.0  | -   | 8:  |     | else if p.type==cluster-around   |     |     | then      |           |
| FoodPacking2Cans |     | Sim  |      | -   | -    | -     | -   |     |     |                                  |     |     |           |           |
|                  |     |      |      |     |      |       |     |     |     | PolarPlace(p.targets,            |     |     | p.anchor, | p.radius) |
9:
|             |     | Real | 33.3  |     | 0.0 | 40.0 | -   |     |     |        |     |     |     |     |
| ----------- | --- | ---- | ----- | --- | --- | ---- | --- | --- | --- | ------ | --- | --- | --- | --- |
| PickOranges |     |      |       |     |     |      |     | 10: |     | end if |     |     |     |     |
|             |     | Sim  | 60.0  |     | 0.0 | 0.0  | 0.0 |     |     |        |     |     |     |     |
|             |     |      |       |     |     |      |     |     | end | for    |     |     |     |     |
|             |     | Real | 100.0 |     | 0.0 | 0.0  | 0.0 | 11: |     |        |     |     |     |     |
ToolsPickingDrill
|     |     | Sim | 70.0 |     | 50.0 | 20.0 | 20.0 | 12: | {Phase | 2:  | Relative | Constraints} |     |     |
| --- | --- | --- | ---- | --- | ---- | ---- | ---- | --- | ------ | --- | -------- | ------------ | --- | --- |
Real 79.5 34.1 63.2 0.0 13: while constraints not satisfied do
Total
|     |     | Sim | 74.0 |     | 42.0 | 18.0 | 4.0 |     |     | ApplyRelativeConstraints(P) |     |     |     |     |
| --- | --- | --- | ---- | --- | ---- | ---- | --- | --- | --- | --------------------------- | --- | --- | --- | --- |
14:
|     |     |     |     |     |     |     |     | 15: | end | while |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- |
ApplyOrientations(P)
16:
| The Alignment |     | score | represents | the | overall | instruction-code |     |     |        |     |           |             |     |     |
| ------------- | --- | ----- | ---------- | --- | ------- | ---------------- | --- | --- | ------ | --- | --------- | ----------- | --- | --- |
|               |     |       |            |     |         |                  |     | 17: | {Phase | 3:  | Collision | Resolution} |     |     |
alignment, aggregating the six sub-dimensions. Clarity mea- 18: for k =1 to K do
max
sures whether instructions are unambiguous and grammatically C ←FindCollisions(B,margin)
19:
Feasibility
well-formed. assesses physical realizability of the 20: if C =∅ then
task. Match combines the four semantic dimensions (relation, return Success
21:
| target, object, | quantifier) |     | into | a single | score | reflecting | how |     |     |        |     |     |     |     |
| --------------- | ----------- | --- | ---- | -------- | ----- | ---------- | --- | --- | --- | ------ | --- | --- | --- | --- |
|                 |             |     |      |          |       |            |     | 22: |     | end if |     |     |     |     |
accurately the code captures the instruction’s intent. Verdict 23: if |C| not decreasing for 10 steps then
reports the percentage of tasks judged as fully aligned versus PerturbPositions(B)
24:
| partially | aligned | (misaligned |     | tasks, | comprising | approximately |     |     |     |        |     |     |     |     |
| --------- | ------- | ----------- | --- | ------ | ---------- | ------------- | --- | --- | --- | ------ | --- | --- | --- | --- |
|           |         |             |     |        |            |               |     | 25: |     | end if |     |     |     |     |
1% of the dataset, are omitted for brevity). We additionally 26: for all (o ,o )∈C do
i j
| compute | scene coverage |     | metrics: | object | coverage |     | measures the |     |     |                  |     |      |            |     |
| ------- | -------------- | --- | -------- | ------ | -------- | --- | ------------ | --- | --- | ---------------- | --- | ---- | ---------- | --- |
|         |                |     |          |        |          |     |              | 27: |     | ResolveOverlap(b |     | i ,b | j ,margin) |     |
fraction of manipulable objects in each scene that appear in at 28: ClampToBounds(b ,b ,L )
i j max
| least one | generated | task, | while | predicate |     | coverage | measures |     |     | end for |     |     |     |     |
| --------- | --------- | ----- | ----- | --------- | --- | -------- | -------- | --- | --- | ------- | --- | --- | --- | --- |
29:
| the fraction     | of          | available | termination |         | predicates |             | used across  |     |        |         |     |     |     |     |
| ---------------- | ----------- | --------- | ----------- | ------- | ---------- | ----------- | ------------ | --- | ------ | ------- | --- | --- | --- | --- |
|                  |             |           |             |         |            |             |              | 30: | end    | for     |     |     |     |     |
| tasks for        | that scene. | All       | evaluations |         | use        | temperature | 0 for        | 31: | end    | for     |     |     |     |     |
| reproducibility, | with        | automatic |             | retry   | logic to   | handle      | rate limits. |     |        |         |     |     |     |     |
|                  |             |           |             |         |            |             |              | 32: | return | Failure |     |     |     |     |
| The evaluation   |             | reveals   | strong      | overall | task       | generation  | quality,     |     |        |         |     |     |     |     |
with0.91meanalignmentand76%oftasksreceivingfullalign-
mentverdicts.Performancevariesbycategory:conjunctionand
|     |     |     |     |     |     |     |     | to  | the assets | in the | scene. |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---------- | ------ | ------ | --- | --- | --- |
recognitiontasksachievethehighestalignment(0.97and0.96),
likelybecausetheirsuccessconditionsmapstraightforwardlyto
| compositional  | predicates,  |              | while     | color-based  |             | tasks        | show lower  |     |     |     |     |     |     |     |
| -------------- | ------------ | ------------ | --------- | ------------ | ----------- | ------------ | ----------- | --- | --- | --- | --- | --- | --- | --- |
| alignment      | (0.81),      | reflecting   | the       | challenge    |             | of grounding | color       |     |     |     |     |     |     |     |
| references     | to specific  |              | object    | instances.   | High        | clarity      | (0.96)      |     |     |     |     |     |     |     |
| and semantic   | match        | (0.95)       | scores    | indicate     |             | that the     | generated   |     |     |     |     |     |     |     |
| instructions   | are          | well-formed  |           | and the      | termination |              | conditions  |     |     |     |     |     |     |     |
| capture        | the intended | semantics,   |           | though       | feasibility |              | scores are  |     |     |     |     |     |     |     |
| slightly       | lower for    | spatial      | tasks     | (0.89)       | where       | precise      | placement   |     |     |     |     |     |     |     |
| requirements   | may          | exceed       | typical   | manipulation |             | tolerances.  | The         |     |     |     |     |     |     |     |
| 88% object     | coverage     | demonstrates |           |              | good        | utilization  | of scene    |     |     |     |     |     |     |     |
| assets,        | while the    | lower        | predicate | coverage     |             | (29%)        | suggests    |     |     |     |     |     |     |     |
| the generator  | favors       | a            | subset    | of reliable  |             | predicates   | rather      |     |     |     |     |     |     |     |
| than exploring | the          | full         | space of  | available    | success     |              | conditions— |     |     |     |     |     |     |     |
| a conservative |              | strategy     | that      | likely       | contributes |              | to the high |     |     |     |     |     |     |     |
alignmentscores.Overall,theseresultsdemonstrateourmethod
cansuccessfullygenerateavarietyoftypesoftasksappropriate

| Algorithm |         | 2 Physical Placement | Solver    |            |         |
| --------- | ------- | -------------------- | --------- | ---------- | ------- |
| Input:    | Objects | B, Predicates        | P, Solved | Base Poses |         |
| Output:   |         | 3D coordinates       | (x,y,z)   | for        | all ob- |
jects
| 1:  | {Solve  | Stacking:} |                  |     |     |
| --- | ------- | ---------- | ---------------- | --- | --- |
|     |         | p∈P        | p.type==place-on |     |     |
| 2:  | for all | where      |                  | do  |     |
3: s←p.support
|     | B   | ←{b′ |b′ is | already on s} |     |     |
| --- | --- | ----------- | ------------- | --- | --- |
4: peers
| 5:  | (x,y)←FindSpot(s,p.object,B |                                 | peers | )   |     |
| --- | --------------------------- | ------------------------------- | ----- | --- | --- |
| 6:  | p.object.z                  | ←s.z+s.height+p.object.height/2 |       |     |     |
p.object.(x,y)←(x,y)
7:
8: end for
|     | {Solve | Containment:} |     |     |     |
| --- | ------ | ------------- | --- | --- | --- |
9:
| 10: | for all | p∈P where | p.type==place-in | do  |     |
| --- | ------- | --------- | ---------------- | --- | --- |
11: c←p.container
|     | if  | TotalArea(p.objects)>0.8×Area(c) |     | then |     |
| --- | --- | -------------------------------- | --- | ---- | --- |
12:
13: p.objects←SortAndFilter(p.objects,c.capacity)
|     | end | if  |     |     |     |
| --- | --- | --- | --- | --- | --- |
14:
15: (R,C)←ComputeGridDimensions(c.dims,|p.objects|)
|     | for | i=0 to |p.objects|−1 | do  |     |     |
| --- | --- | -------------------- | --- | --- | --- |
16:
17: (r,c)←(i//C,i%C)
| 18: |     | (x ,y )←GridCellCenter(r,c,c.dims) |     |     |     |
| --- | --- | ---------------------------------- | --- | --- | --- |
loc loc
| 19: |     | Jitter(x loc ,y loc )         |     |     |     |
| --- | --- | ----------------------------- | --- | --- | --- |
| 20: |     | p.objects[i].(x,y)←c.(x,y)+(x |     | ,y  | )   |
loc loc
|     |     | p.objects[i].z ←c.z+c.height/2+buffer |     |     |     |
| --- | --- | ------------------------------------- | --- | --- | --- |
21:
| 22: | end | for |     |     |     |
| --- | --- | --- | --- | --- | --- |
23: end for
|     | return | Success |     |     |     |
| --- | ------ | ------- | --- | --- | --- |
24:

TABLE IX: Detailed results for π .
0.5
TaskName Succ% Score Time(s) SPARC PathLen(m) Speed(cm/s) WrongObjNames
TOTAL(120tasks) 23.3 0.389 29.70±33.47 −9.92±5.98 5.45±8.67 5.7±1.8
AnimalsInBinTask 0.0 0.300 - −8.51±1.97 4.45±0.96 4.9±1.0 -
AppleAndYogurtInBowlTask 40.0 0.583 55.97±41.54 −11.54±9.09 17.20±27.94 7.1±1.5 -
BBQSauceInBinTask 0.0 0.400 - −8.14±1.03 4.44±1.41 4.8±1.5 -
BagelsOnPlateTask 0.0 0.050 - −8.38±2.07 2.24±0.44 4.9±0.8 -
BananaInBowlTask 100.0 - 12.54±1.56 −4.51±1.06 0.81±0.04 6.1±0.6 -
BananaOnPlateTask 100.0 - 9.36±0.90 −3.61±0.71 0.68±0.09 6.9±0.9 -
BananaThenRubiksCubeTask 90.0 1.000 35.49±9.70 −6.09±1.46 2.23±0.54 5.7±0.7 -
BananasInBinOneMoreTask 100.0 - 8.12±1.66 −3.63±0.35 0.79±0.12 9.5±1.3 -
BananasInBinThreeTotalTask 100.0 - 10.01±5.76 −4.19±1.76 0.89±0.23 9.4±2.0 -
BananasInCrateTask 100.0 - 9.55±3.86 −3.90±1.20 0.96±0.27 9.8±1.8 -
BananasOutOfBinTask 60.0 1.000 50.50±13.06 −14.60±11.41 8.97±18.98 4.7±1.3 -
BigPumpkinInBinTask 10.0 0.000 9.00 −9.50±4.01 2.00±0.76 4.2±2.7 -
BlackItemsInBinTask 10.0 0.578 65.33 −10.06±3.03 6.64±6.90 4.1±0.9 -
BlockStackingOrderAgnosticTask 10.0 0.477 38.47 −9.90±1.74 5.40±1.41 6.1±1.1 -
BlockStackingSpecifiedOrderTask 0.0 0.066 - −11.98±2.02 4.33±0.57 4.6±0.6 -
BlocksInBinTask 0.0 0.475 - −10.92±2.16 8.70±1.39 5.6±0.9 -
BowlInBinTask 60.0 0.000 24.03±16.03 −10.91±14.75 5.61±12.15 5.3±0.9 -
BowlStackingLeftOnRightTask 10.0 0.000 17.67 −6.30±1.29 1.25±0.29 5.9±1.3 -
BowlStackingRightOnLeftTask 20.0 0.000 18.33±0.75 −7.44±2.17 0.88±0.24 4.2±1.2 -
ButterAboveRaisinTask 0.0 0.000 - −9.12±1.48 1.87±0.24 4.6±0.6 -
CannedFoodInBinTask 20.0 0.000 29.30±20.22 −9.67±2.52 2.17±0.57 4.1±1.0 -
ClampInRightBinTask 30.0 0.000 16.40±9.29 −6.38±2.15 2.68±1.02 6.6±3.0 -
CleanUpToysTask 0.0 0.022 - −15.01±0.86 19.68±0.71 6.3±0.2 -
ClearOrganicObjectsTask 0.0 0.000 - −13.35±1.14 19.08±1.28 7.6±0.5 -
ClutterPlasticTask 0.0 0.467 - −13.02±2.14 10.46±1.55 5.7±0.8 -
ClutterPumpkinTask 0.0 0.050 - −10.84±2.48 3.98±1.31 4.4±1.4 -
CoffeePotInBinTask 0.0 0.000 - −10.17±1.34 1.82±0.27 3.0±0.4 -
CondimentsInBinTask 0.0 0.275 - −19.65±4.87 4.77±1.47 2.6±0.7 -
CookingClearPlateTask 10.0 0.611 31.27 −13.94±3.95 9.46±13.89 3.1±1.8 -
CookingPickPastaToolTask 0.0 0.000 - −8.20±1.13 4.22±0.77 6.6±1.1 -
CubesAndBlocksInBinTask 40.0 0.694 211.45±24.77 −14.14±4.11 21.54±17.74 6.0±1.0 -
DishesInBinTask 10.0 0.259 141.40 −15.75±1.92 13.17±8.33 5.8±1.0 -
ElectronicsInBinTask 0.0 0.675 - −13.72±3.11 6.49±1.56 3.7±0.9 -
FoodPacking1BoxesTask 10.0 0.000 55.00 −6.73±1.50 3.81±0.58 6.1±0.9 -
FoodPacking1CansTask 70.0 0.000 29.40±15.44 −8.56±9.08 6.48±11.86 7.5±1.5 -
FoodPacking2BoxesTask 0.0 0.100 - −13.96±2.18 9.53±1.50 5.1±0.8 -
FoodPacking2CansTask 10.0 0.500 153.73 −12.55±2.92 11.38±7.91 5.0±0.8 -
FoodPacking3BoxesTask 0.0 0.000 - −16.03±6.48 12.10±4.81 5.0±1.8 -
FoodPacking3CansTask 0.0 0.267 - −13.06±3.18 11.02±2.97 4.5±1.2 -
FoodPackingByColorTask 0.0 0.050 - −9.44±2.20 7.16±1.18 5.7±0.9 -
FruitsGreenLimesOnPlateTask 40.0 0.417 72.42±12.37 −10.77±4.44 6.48±9.15 4.4±1.0 -
FruitsMovingOrangeOrLimeTask 60.0 0.250 36.67±19.04 −6.34±1.61 2.52±1.05 5.7±1.3 -
FruitsMovingTask 10.0 0.000 10.80 −8.06±2.55 2.87±1.40 5.1±1.9 -
FruitsOnPlate3Task 50.0 0.600 92.87±13.18 −17.41±18.05 24.18±56.98 4.3±1.3 -
FruitsOnPlateTask 0.0 0.371 - −18.18±3.43 12.00±2.34 3.9±0.8 -
FruitsOnionTask 90.0 0.000 20.27±12.70 −10.82±19.72 7.50±18.79 7.3±1.3 -
FruitsOnionToPlateTask 20.0 0.000 24.23±15.70 −9.00±3.71 3.94±4.08 5.1±1.3 -
FruitsOrangesOnPlateTask 0.0 - - −29.25±5.60 29.97±3.74 3.6±0.4 -
GrabABagelTask 0.0 0.400 - −6.05±0.89 2.23±0.36 6.9±1.1 -
GrabAFruitTask 0.0 0.100 - −7.79±1.82 1.72±0.25 5.4±0.8 -
GreenSpoonsInPotTask 0.0 0.167 - −21.61±7.87 4.57±1.39 2.6±0.7 -
HammersInLeftBinTask 0.0 0.150 - −12.62±2.33 8.76±1.38 5.0±0.8 -
JugsOnShelfTask 0.0 0.000 - −8.61±1.07 10.36±2.20 8.2±1.7 -
KeyboardOutOfBinTask 0.0 0.100 - −9.03±3.27 2.69±0.85 4.3±1.3 -
LargerObjectRaisinBoxInBinTask 0.0 0.000 - −7.91±1.82 0.86±0.21 3.0±0.7 -
MarkerInMugTask 0.0 0.000 - −10.82±2.62 1.07±0.09 2.5±0.2 -
MouseOnKeyboardTask 60.0 0.000 39.09±12.89 −10.24±4.96 4.09±6.71 4.6±1.1 -
MoveBananaToBagelPlateTask 0.0 0.000 - −10.79±1.39 6.12±0.50 6.3±0.5 -
MustardAboveRaisinTask 100.0 - 11.73±6.36 −4.25±1.61 0.70±0.39 5.6±0.6 -
MustardInLeftBinTask 30.0 0.000 10.84±6.72 −4.48±0.98 1.75±0.65 7.2±1.4 -
MustardInRightBinTask 100.0 - 10.49±6.54 −4.44±0.77 0.86±0.45 8.3±1.4 -
NonHammerToolsInRightBinTask 0.0 0.050 - −14.37±3.66 7.50±2.01 4.2±1.0 -
OneBottleInSquarePailTask 100.0 - 12.25±4.15 −3.90±0.77 1.10±0.35 8.5±1.2 -
OneBottleOnShelfTask 0.0 0.000 - −7.24±1.28 5.37±0.74 8.4±1.2 -
PhoneOrRemoteInBinTask 40.0 0.000 17.98±26.90 −8.63±4.26 1.39±0.70 5.4±2.5 -
PickDrillTask 0.0 0.800 - −9.09±1.29 2.31±0.32 5.5±0.7 -
PickGlassesTask 0.0 0.500 - −5.55±0.73 2.63±0.36 8.3±1.1 -
PickOrangeObjectTask 0.0 0.050 - −7.52±1.72 4.36±0.60 6.8±0.9 -
PickUpBluePitcherTask 0.0 0.350 - −7.89±1.35 1.56±0.23 4.9±0.7 -
PickUpGreenObjectTask 0.0 0.400 - −8.05±0.75 1.71±0.18 5.3±0.5 -
PinkSpoonInPotTask 60.0 0.000 44.99±12.43 −7.70±1.70 2.88±0.81 5.5±1.3 -
PlasticBottlesInSquarePailTask 50.0 0.667 74.28±52.12 −10.59±4.48 8.03±3.89 6.3±0.9 -
PutBowlOnShelfTopTask 0.0 0.100 - −9.89±1.13 4.14±0.67 6.4±1.0 -
PutMugsOnShelfTask 0.0 0.300 - −13.90±3.09 10.44±2.73 5.6±1.4 -
PutTwoMugsOnShelfTask 0.0 0.350 - −11.30±2.10 10.89±1.99 6.0±0.9 -
RecycleCartonTask 10.0 0.500 77.00 −8.06±0.69 5.30±0.80 5.8±0.9 -
RecycleCartonsOnBoxTask 0.0 0.000 - −9.66±1.66 6.11±0.47 6.5±0.5 -
RecycleCartonsVerticalCrateTask 10.0 0.278 54.53 −8.28±1.10 8.43±7.65 6.5±0.7 -
RedDishesInBinTask 30.0 0.286 47.16±12.26 −6.71±1.26 4.42±2.60 6.4±1.4 -
RedItemsInBinTask 20.0 0.312 36.83±8.25 −6.62±1.59 5.12±3.46 7.6±1.7 -
ReorientAllMugsTask 0.0 0.467 - −14.81±1.65 5.23±0.56 5.5±0.6 -
ReorientJugTask 0.0 0.050 - −12.39±1.90 3.21±0.52 4.9±0.8 -
ReorientRedMugTask 60.0 0.125 33.17±17.07 −12.17±10.88 5.15±8.09 6.4±0.7 -
ReorientWhiteMugsTask 40.0 0.167 14.28±7.65 −11.15±11.10 5.55±10.26 5.8±0.7 -
RubiksCubeAndBananaTask 90.0 0.500 30.64±19.34 −5.72±1.90 2.33±1.23 6.9±0.7 -
RubiksCubeBehindBowlTask 60.0 0.667 9.72±7.45 −5.16±1.17 1.30±0.75 7.6±1.2 -
RubiksCubeInFrontOfBowlTask 0.0 0.400 - −7.26±0.78 1.99±0.16 6.3±0.5 -
RubiksCubeLeftOfBowlTask 10.0 0.704 25.80 −7.91±1.12 2.30±0.40 7.4±1.2 -
RubiksCubeOrBananaTask 100.0 - 12.85±5.74 −4.48±1.00 0.92±0.35 7.2±1.5 -
RubiksCubeRightOfBowlTask 0.0 0.667 - −6.30±0.94 2.43±0.30 7.6±0.9 -
RubiksCubeTask 100.0 - 8.94±1.08 −3.72±0.57 0.65±0.03 6.9±0.9 -
RubiksCubeThenBananaTask 20.0 0.000 44.17±15.51 −7.05±1.20 5.12±4.49 6.5±1.2 -
RubiksCubesInBinTask 50.0 0.467 63.31±29.56 −14.00±10.94 12.42±16.46 5.1±1.3 -
SauceBottlesCrateTask 60.0 0.500 15.00±8.22 −5.34±1.55 1.68±0.87 6.9±1.2 -
SmallPumpkinInBinTask 0.0 0.000 - −9.67±3.81 2.65±1.24 4.3±1.9 -
SmallerObjectButterInBinTask 20.0 0.000 16.70±5.80 −8.08±1.68 1.11±0.36 4.3±1.6 -
SmartphoneInBinTask 0.0 0.000 - −8.54±2.29 2.53±0.63 4.1±1.0 -
SpoonInMugTask 60.0 0.000 21.23±11.02 −10.81±12.93 5.99±13.56 5.7±1.6 -
SpoonsInPotTask 0.0 0.400 - −16.88±3.49 7.56±1.76 4.1±0.9 -
Stack3RubiksCubeTask 10.0 0.500 40.53 −9.16±1.74 3.69±0.32 6.0±0.8 -
StackWhiteMugsTask 40.0 0.083 49.32±8.33 −6.73±1.22 4.25±0.80 7.3±1.1 -
StackYellowOnRedTask 20.0 0.188 29.00±7.35 −7.99±1.75 4.21±2.83 6.1±0.7 -
TakeMeasuringSpoonOutTask 30.0 0.143 22.91±5.64 −11.16±1.96 1.10±0.22 3.1±0.4 -
TakeMugsOffOfShelfTask 0.0 0.800 - −15.07±2.57 10.92±1.01 5.7±0.5 -
TakeSpatulaOffShelfTask 0.0 0.000 - −10.62±1.86 2.90±0.50 4.6±0.8 -
ThrowAwayAppleTask 0.0 0.000 - −7.89±1.23 4.01±0.45 6.2±0.7 -
ThrowAwaySnacksTask 0.0 0.350 - −9.24±2.25 7.11±1.35 5.6±1.0 -
ToolOrganizationBothTask 0.0 0.150 - −13.21±2.47 7.53±1.68 4.4±0.9 -
ToolOrganizationTask 0.0 0.200 - −14.03±2.60 8.41±1.44 4.8±0.8 -
ToolsPickingAllHammersTask 0.0 0.075 - −16.93±2.19 9.30±1.73 3.8±0.7 -
ToolsPickingDrillTask 0.0 0.000 - −8.38±1.50 3.15±0.56 5.0±0.8 -
ToolsPickingHammerTask 0.0 0.000 - −10.33±1.18 2.96±0.31 4.7±0.5 -
ToyInBinTask 40.0 0.000 32.70±20.07 −10.81±10.55 3.60±4.45 4.5±1.1 -
UnstackRubiksCubeTask 10.0 0.222 29.20 −11.94±3.46 7.76±6.03 6.6±0.5 -
UtensilsInMugTask 0.0 0.000 - −20.85±3.69 1.72±0.49 2.0±0.6 -
WhiteMugInCenterOfTableTask 60.0 0.667 17.66±6.12 −5.77±1.80 1.51±0.61 6.2±0.7 -
WhiteMugsInBinTask 0.0 0.000 - −9.04±1.19 4.88±0.35 7.6±0.5 -
WoodSpatulaToBowlTask 20.0 0.375 27.07±28.28 −8.80±3.56 4.10±2.25 6.1±0.8 -
YellowAndWhiteObjectsInBinTask 10.0 0.333 59.27 −6.99±1.95 4.32±1.11 7.0±1.7 -
YogurtInBowlTask 0.0 0.000 - −6.88±1.44 2.56±0.50 6.0±1.1 -

|     | TABLE | X: Detailed | results for | π -FAST. |     |     |
| --- | ----- | ----------- | ----------- | -------- | --- | --- |
0
Task Name Succ% Score Time(s) SPARC PathLen(m) Speed(cm/s) WrongObjNames
TOTAL(120tasks) 15.7 0.292 22.94±23.99 −9.53±6.12 4.08±4.85 4.6±1.7
| AnimalsInBinTask | 0.0 0.150 |     | - −10.78±2.63 | 3.16±1.16 | 3.3±1.2 | -   |
| ---------------- | --------- | --- | ------------- | --------- | ------- | --- |
AppleAndYogurtInBowlTask 20.0 0.250 97.83±19.75 −9.55±2.80 5.99±3.62 4.1±1.1 -
| BBQSauceInBinTask | 0.0 0.050 |     | - −7.78±2.03 | 3.59±0.83 | 3.8±0.9 | -   |
| ----------------- | --------- | --- | ------------ | --------- | ------- | --- |
| BagelsOnPlateTask | 0.0 0.000 |     | - −9.21±2.94 | 1.76±0.46 | 3.4±1.0 | -   |
BananaInBowlTask 30.0 0.000 29.87±15.98 −11.69±13.55 3.00±4.61 3.8±1.3 -
BananaOnPlateTask 60.0 0.000 20.16±10.62 −11.67±17.94 5.36±13.43 4.4±1.2 -
BananaThenRubiksCubeTask 70.0 0.833 29.10±7.00 −8.45±10.85 7.09±14.82 6.5±0.7 -
BananasInBinOneMoreTask 100.0 - 19.53±14.51 −5.36±2.61 1.18±0.56 7.0±2.3 -
BananasInBinThreeTotalTask 100.0 - 12.30±4.29 −3.83±0.92 1.04±0.30 8.3±1.5 -
BananasInCrateTask 70.0 0.000 10.63±2.23 −9.38±16.93 9.27±24.89 8.0±2.5 -
BananasOutOfBinTask 30.0 1.000 46.31±24.71 −11.03±4.66 7.88±10.77 4.4±1.2 -
BigPumpkinInBinTask 0.0 0.000 - −7.20±1.86 2.80±0.41 4.5±0.7 -
BlackItemsInBinTask 0.0 0.420 - −13.53±4.71 3.42±1.05 3.2±0.7 -
|                                |            | 70.36±13.88 | −8.98±2.18 | 5.27±4.62 | 4.6±0.9 |     |
| ------------------------------ | ---------- | ----------- | ---------- | --------- | ------- | --- |
| BlockStackingOrderAgnosticTask | 30.0 0.471 |             |            |           |         | -   |
BlockStackingSpecifiedOrderTask 0.0 0.000 - −9.53±1.13 5.06±0.66 5.3±0.7 -
| BlocksInBinTask | 0.0 0.225 |     | - −11.99±1.44 | 7.87±1.69 | 5.0±1.1 | -   |
| --------------- | --------- | --- | ------------- | --------- | ------- | --- |
BowlInBinTask 70.0 0.000 35.48±18.77 −10.19±10.50 4.94±10.84 4.2±1.5 -
BowlStackingLeftOnRightTask 80.0 0.000 8.81±1.85 −3.09±0.75 0.83±0.23 7.5±1.3 -
BowlStackingRightOnLeftTask 90.0 0.000 10.23±2.16 −2.81±0.43 0.74±0.07 6.6±1.2 -
ButterAboveRaisinTask 0.0 0.000 - −7.17±1.03 1.62±0.25 4.1±0.4 -
CannedFoodInBinTask 0.0 0.000 - −6.13±2.27 2.70±0.78 4.4±1.2 -
ClampInRightBinTask 0.0 0.000 - −7.74±1.50 2.26±0.46 3.7±0.7 -
| CleanUpToysTask | 0.0 0.044 |     | - −14.53±4.17 | 15.84±2.74 | 5.1±0.9 | -   |
| --------------- | --------- | --- | ------------- | ---------- | ------- | --- |
ClearOrganicObjectsTask 0.0 0.000 - −15.56±2.83 8.24±1.45 3.3±0.6 -
ClutterPlasticTask 0.0 0.033 - −17.21±4.61 4.59±1.34 2.4±0.7 -
ClutterPumpkinTask 0.0 0.050 - −9.00±2.28 3.60±0.85 3.8±0.9 -
CoffeePotInBinTask 10.0 0.000 19.13 −8.48±3.90 3.18±2.19 4.4±1.1 -
CondimentsInBinTask 0.0 0.325 - −14.57±2.45 6.28±1.37 3.4±0.7 -
CookingClearPlateTask 0.0 0.000 - −12.61±2.18 8.27±1.79 4.4±0.9 -
CookingPickPastaToolTask 0.0 0.000 - −8.63±1.04 3.95±0.44 6.0±0.6 -
CubesAndBlocksInBinTask 0.0 0.458 - −13.05±2.31 12.48±3.83 5.0±1.5 -
| DishesInBinTask | 0.0 0.033 |     | - −14.80±2.97 | 9.73±1.95 | 5.2±1.0 | -   |
| --------------- | --------- | --- | ------------- | --------- | ------- | --- |
ElectronicsInBinTask 0.0 0.550 - −14.84±6.56 6.54±1.48 3.6±0.7 -
FoodPacking1BoxesTask 0.0 0.000 - −8.38±1.56 1.99±0.43 3.2±0.6 -
FoodPacking1CansTask 20.0 0.000 21.97±11.36 −11.32±10.84 4.09±6.95 3.9±1.3 -
FoodPacking2BoxesTask 0.0 0.000 - −13.38±2.96 5.87±1.27 3.1±0.7 -
|                      |            |     | −15.38±3.52 | 5.34±0.92 | 2.8±0.5 |     |
| -------------------- | ---------- | --- | ----------- | --------- | ------- | --- |
| FoodPacking2CansTask | 10.0 0.167 |     | 178.20      |           |         | -   |
FoodPacking3BoxesTask 0.0 0.000 - −16.30±3.74 8.26±2.36 3.4±0.9 -
FoodPacking3CansTask 0.0 0.033 - −16.39±2.10 7.03±1.77 2.8±0.7 -
FoodPackingByColorTask 0.0 0.000 - −12.49±4.24 4.24±1.88 3.4±1.6 -
FruitsGreenLimesOnPlateTask 0.0 0.450 - −9.76±2.54 3.20±0.69 3.4±0.7 -
FruitsMovingOrangeOrLimeTask 0.0 0.000 - −10.21±1.58 2.05±0.22 3.2±0.3 -
| FruitsMovingTask | 0.0 0.000 |     | - −8.78±1.60 | 2.11±0.45 | 3.3±0.7 | -   |
| ---------------- | --------- | --- | ------------ | --------- | ------- | --- |
FruitsOnPlate3Task 0.0 0.367 - −14.29±1.77 6.91±1.43 3.3±0.7 -
FruitsOnPlateTask 0.0 0.200 - −19.92±6.60 9.56±2.25 3.0±0.7 -
FruitsOnionTask 80.0 0.000 19.65±6.29 −4.86±1.99 1.43±0.32 5.7±1.8 -
FruitsOnionToPlateTask 10.0 0.000 14.47 −7.47±2.68 3.40±4.11 4.0±1.4 -
FruitsOrangesOnPlateTask 10.0 0.500 9.20 −9.63±3.40 3.16±0.99 3.9±1.1 -
| GrabABagelTask | 0.0 0.500 |     | - −6.39±1.35 | 1.13±0.39 | 3.5±1.1 | -   |
| -------------- | --------- | --- | ------------ | --------- | ------- | --- |
| GrabAFruitTask | 0.0 0.100 |     | - −5.66±1.11 | 1.47±0.22 | 4.5±0.7 | -   |
GreenSpoonsInPotTask 0.0 0.100 - −21.09±7.44 5.40±2.73 3.1±1.5 -
HammersInLeftBinTask 0.0 0.000 - −13.58±3.25 5.17±0.68 2.9±0.3 -
| JugsOnShelfTask | 0.0 0.000 |     | - −10.65±2.75 | 5.80±0.82 | 4.7±0.6 | -   |
| --------------- | --------- | --- | ------------- | --------- | ------- | --- |
KeyboardOutOfBinTask 0.0 0.000 - −9.10±1.49 2.97±0.70 4.6±1.1 -
LargerObjectRaisinBoxInBinTask 0.0 0.000 - −5.36±0.92 0.86±0.11 3.6±0.3 -
| MarkerInMugTask | 0.0 0.000 |     | - −7.29±1.53 | 1.39±0.43 | 3.3±1.0 | -   |
| --------------- | --------- | --- | ------------ | --------- | ------- | --- |
MouseOnKeyboardTask 0.0 0.000 - −7.43±1.08 3.15±0.35 5.0±0.5 -
MoveBananaToBagelPlateTask 0.0 0.000 - −12.91±2.76 3.57±0.72 3.7±0.7 -
MustardAboveRaisinTask 90.0 0.000 10.56±3.34 −3.64±1.56 0.70±0.29 5.5±1.0 -
|                      |            | 16.87±6.73 | −5.07±1.13 | 1.32±0.38 | 5.4±0.7 |     |
| -------------------- | ---------- | ---------- | ---------- | --------- | ------- | --- |
| MustardInLeftBinTask | 50.0 0.000 |            |            |           |         | -   |
MustardInRightBinTask 90.0 0.000 9.86±1.49 −3.53±0.50 0.79±0.20 6.8±1.0 -
NonHammerToolsInRightBinTask 0.0 0.000 - −11.71±2.38 5.04±1.59 2.9±0.7 -
OneBottleInSquarePailTask 100.0 - 13.50±6.05 −3.23±1.29 1.14±0.29 8.7±1.9 -
OneBottleOnShelfTask 0.0 0.000 - −8.25±2.15 2.67±0.58 4.2±0.9 -
PhoneOrRemoteInBinTask 30.0 0.000 8.00±6.12 −12.20±18.04 4.09±8.16 4.6±1.9 -
| PickDrillTask   | 0.0 0.900 |     | - −7.14±1.44 | 2.33±0.38 | 5.4±0.8 | -   |
| --------------- | --------- | --- | ------------ | --------- | ------- | --- |
| PickGlassesTask | 0.0 0.300 |     | - −6.51±2.12 | 1.78±0.34 | 5.7±1.0 | -   |
PickOrangeObjectTask 0.0 0.050 - −9.16±1.52 2.68±0.56 4.1±0.9 -
PickUpBluePitcherTask 0.0 0.050 - −6.41±1.00 1.58±0.29 4.8±0.8 -
PickUpGreenObjectTask 0.0 0.500 - −6.25±1.05 1.51±0.18 4.6±0.5 -
PinkSpoonInPotTask 0.0 0.000 - −6.71±1.03 2.93±0.53 4.6±0.8 -
PlasticBottlesInSquarePailTask 10.0 0.704 162.87 −13.38±3.06 9.81±3.70 4.7±0.9 -
PutBowlOnShelfTopTask 0.0 0.500 - −8.33±1.92 1.90±0.50 3.4±0.7 -
PutMugsOnShelfTask 0.0 0.250 - −12.58±2.65 7.76±1.63 4.2±0.8 -
PutTwoMugsOnShelfTask 0.0 0.400 - −12.23±1.79 6.80±1.51 3.8±0.7 -
RecycleCartonTask 0.0 0.000 - −11.70±2.52 2.36±0.47 2.5±0.5 -
RecycleCartonsOnBoxTask 0.0 0.000 - −12.18±3.24 3.18±0.50 3.3±0.5 -
RecycleCartonsVerticalCrateTask 0.0 0.050 - −13.29±4.89 1.53±0.28 1.7±0.3 -
RedDishesInBinTask 50.0 0.300 36.41±9.55 −7.15±4.45 4.08±5.36 5.5±1.9 -
RedItemsInBinTask 20.0 0.500 49.43±14.09 −5.70±0.67 3.24±0.51 5.3±0.9 -
ReorientAllMugsTask 0.0 0.100 - −9.86±1.22 4.59±0.71 4.7±0.8 -
| ReorientJugTask | 0.0 0.000 |     | - −7.77±1.48 | 2.92±0.46 | 4.5±0.7 | -   |
| --------------- | --------- | --- | ------------ | --------- | ------- | --- |
ReorientRedMugTask 0.0 0.050 - −7.34±1.37 3.02±0.41 4.7±0.6 -
ReorientWhiteMugsTask 20.0 0.000 42.83±7.40 −7.56±1.11 3.97±0.67 6.6±0.9 -
RubiksCubeAndBananaTask 70.0 0.833 30.81±13.59 −8.96±11.94 6.92±14.34 6.4±0.9 -
RubiksCubeBehindBowlTask 40.0 0.667 7.50±0.81 −5.01±1.57 1.67±0.88 7.5±1.0 -
RubiksCubeInFrontOfBowlTask 0.0 0.633 - −4.87±0.37 2.27±0.27 7.2±0.9 -
RubiksCubeLeftOfBowlTask 0.0 0.667 - −5.16±0.80 2.84±0.64 8.8±1.9 -
RubiksCubeOrBananaTask 90.0 0.000 12.96±7.45 −3.62±0.77 1.15±0.65 7.6±1.0 -
RubiksCubeRightOfBowlTask 0.0 0.667 - −4.81±0.56 1.71±0.34 5.3±1.0 -
RubiksCubeTask 100.0 - 9.47±0.72 −2.97±0.18 0.63±0.02 6.2±0.5 -
RubiksCubeThenBananaTask 50.0 0.600 35.51±18.67 −6.05±1.55 2.69±0.94 5.6±1.1 -
RubiksCubesInBinTask 10.0 0.593 113.20 −10.44±2.50 5.99±0.99 4.8±0.8 -
SauceBottlesCrateTask 40.0 0.500 7.72±1.32 −12.37±21.71 5.37±12.62 5.7±1.5 -
SmallPumpkinInBinTask 0.0 0.000 - −8.04±2.51 2.50±0.76 4.0±1.2 -
SmallerObjectButterInBinTask 0.0 0.000 - −5.91±0.76 0.92±0.17 3.7±0.4 -
SmartphoneInBinTask 0.0 0.000 - −9.43±1.67 2.98±0.80 4.7±1.2 -
| SpoonInMugTask       | 0.0 0.000 |     | - −8.39±2.14  | 3.12±0.27 | 4.9±0.4 | -   |
| -------------------- | --------- | --- | ------------- | --------- | ------- | --- |
| SpoonsInPotTask      | 0.0 0.400 |     | - −13.52±3.33 | 9.28±1.21 | 4.9±0.7 | -   |
|                      |           |     | −6.44±0.73    | 3.40±0.70 | 5.4±1.1 |     |
| Stack3RubiksCubeTask | 0.0 0.150 |     | -             |           |         | -   |
StackWhiteMugsTask 0.0 0.350 - −7.36±1.63 3.10±0.58 4.9±0.9 -
StackYellowOnRedTask 10.0 0.000 58.20 −7.60±1.67 2.78±0.40 4.4±0.6 -
TakeMeasuringSpoonOutTask 30.0 0.000 27.60±10.46 −9.33±6.90 3.74±6.61 4.8±0.9 -
TakeMugsOffOfShelfTask 0.0 0.800 - −21.05±5.47 5.76±1.03 3.0±0.5 -
TakeSpatulaOffShelfTask 0.0 0.100 - −9.57±3.69 1.60±0.80 2.5±1.3 -
ThrowAwayAppleTask 0.0 0.000 - −8.54±1.72 2.69±0.60 4.3±0.9 -
ThrowAwaySnacksTask 0.0 0.000 - −13.47±4.74 4.66±1.85 3.7±1.5 -
ToolOrganizationBothTask 0.0 0.000 - −14.70±6.34 6.35±1.74 3.6±0.8 -
ToolOrganizationTask 0.0 0.050 - −11.46±1.58 6.33±0.83 3.4±0.4 -
ToolsPickingAllHammersTask 0.0 0.000 - −14.06±4.28 11.21±3.18 4.4±1.2 -
ToolsPickingDrillTask 0.0 0.000 - −7.07±1.84 2.60±0.76 4.1±1.2 -
ToolsPickingHammerTask 0.0 0.100 - −6.93±1.30 3.52±0.39 5.6±0.6 -
ToyInBinTask 70.0 0.000 29.28±14.11 −10.21±12.68 5.50±11.24 5.5±1.3 -
UnstackRubiksCubeTask 0.0 0.450 - −11.86±0.94 7.61±0.95 7.8±1.0 -
| UtensilsInMugTask | 0.0 0.000 |     | - −9.63±3.68 | 3.40±0.87 | 3.7±0.8 | -   |
| ----------------- | --------- | --- | ------------ | --------- | ------- | --- |
WhiteMugInCenterOfTableTask 20.0 0.750 23.03±2.31 −5.48±0.58 1.33±0.26 4.4±0.8 -
WhiteMugsInBinTask 0.0 0.000 - −7.93±0.75 4.60±0.42 7.0±0.6 -
WoodSpatulaToBowlTask 0.0 0.000 - −8.36±2.03 2.39±0.65 3.7±1.0 -
YellowAndWhiteObjectsInBinTask 0.0 0.000 - −10.11±1.83 2.38±0.65 3.9±1.0 -
| YogurtInBowlTask | 0.0 0.000 |     | - −6.09±0.76 | 2.26±0.34 | 5.2±0.8 | -   |
| ---------------- | --------- | --- | ------------ | --------- | ------- | --- |

|     | TABLE | XI: Detailed | results for | π . |     |
| --- | ----- | ------------ | ----------- | --- | --- |
0
Task Name Succ% Score Time(s) SPARC PathLen(m) Speed(cm/s) WrongObjNames
TOTAL(120tasks) 5.2 0.136 23.01±16.01 −9.51±3.91 4.04±3.20 4.4±1.4
| AnimalsInBinTask | 0.0 0.000 |     | - −8.61±2.77 | 4.57±0.82 | 4.9±0.9 - |
| ---------------- | --------- | --- | ------------ | --------- | --------- |
AppleAndYogurtInBowlTask 0.0 0.150 - −6.73±1.55 7.01±2.28 5.5±1.8 -
| BBQSauceInBinTask | 0.0 0.000 |     | - −7.51±0.58 | 4.35±0.51 | 4.7±0.6 - |
| ----------------- | --------- | --- | ------------ | --------- | --------- |
| BagelsOnPlateTask | 0.0 0.000 |     | - −6.98±1.46 | 2.63±0.48 | 4.0±0.7 - |
| BananaInBowlTask  | 0.0 0.100 |     | - −6.63±1.14 | 2.31±0.33 | 4.5±0.6 - |
BananaOnPlateTask 40.0 0.000 20.17±10.62 −9.70±12.32 3.57±7.31 4.5±1.7 -
BananaThenRubiksCubeTask 10.0 0.389 55.00 −9.03±1.98 2.85±0.41 4.6±0.7 -
BananasInBinOneMoreTask 10.0 0.000 59.67 −9.20±1.69 2.49±0.30 4.0±0.5 -
BananasInBinThreeTotalTask 0.0 0.000 - −10.57±1.82 2.54±0.35 4.0±0.5 -
BananasInCrateTask 80.0 0.000 14.97±6.46 −4.40±1.21 1.77±1.20 7.7±1.4 -
BananasOutOfBinTask 0.0 1.000 - −12.88±2.11 4.76±1.11 5.0±1.2 -
BigPumpkinInBinTask 10.0 0.000 24.00 −7.49±1.78 3.31±2.49 4.5±0.9 -
BlackItemsInBinTask 0.0 0.520 - −7.21±1.35 5.92±1.21 4.7±1.0 -
|                                |           |     | −8.16±0.97 | 3.48±0.87 | 3.7±0.9 |
| ------------------------------ | --------- | --- | ---------- | --------- | ------- |
| BlockStackingOrderAgnosticTask | 0.0 0.099 |     | -          |           | -       |
BlockStackingSpecifiedOrderTask 0.0 0.000 - −8.95±2.18 3.49±0.44 3.7±0.5 -
| BlocksInBinTask | 0.0 0.100 |     | - −9.21±1.76 | 6.83±0.73 | 4.4±0.5 - |
| --------------- | --------- | --- | ------------ | --------- | --------- |
BowlInBinTask 50.0 0.000 36.27±22.22 −7.14±7.63 4.55±4.79 6.4±0.5 -
BowlStackingLeftOnRightTask 0.0 0.000 - −6.77±1.07 1.17±0.23 5.6±1.0 -
BowlStackingRightOnLeftTask 0.0 0.000 - −5.60±1.17 1.36±0.25 6.5±1.2 -
ButterAboveRaisinTask 10.0 0.000 35.27 −6.65±1.04 2.64±0.30 6.3±0.6 -
CannedFoodInBinTask 0.0 0.000 - −5.95±0.97 2.80±0.45 4.5±0.8 -
ClampInRightBinTask 0.0 0.000 - −7.30±1.38 2.48±0.58 4.0±0.9 -
| CleanUpToysTask | 0.0 0.000 |     | - −17.55±2.35 | 14.49±1.31 | 4.5±0.4 - |
| --------------- | --------- | --- | ------------- | ---------- | --------- |
ClearOrganicObjectsTask 0.0 0.000 - −15.38±2.81 8.97±1.18 3.5±0.5 -
ClutterPlasticTask 0.0 0.000 - −11.74±2.50 6.70±0.85 3.6±0.5 -
ClutterPumpkinTask 0.0 0.050 - −8.20±1.42 3.62±0.70 3.9±0.7 -
CoffeePotInBinTask 0.0 0.000 - −6.63±1.04 3.14±0.34 5.0±0.5 -
CondimentsInBinTask 0.0 0.050 - −9.34±3.37 9.34±1.63 5.0±0.9 -
CookingClearPlateTask 0.0 0.000 - −15.37±2.70 7.57±0.86 4.0±0.4 -
CookingPickPastaToolTask 0.0 0.000 - −9.95±1.60 3.24±0.45 4.9±0.7 -
CubesAndBlocksInBinTask 0.0 0.117 - −9.39±2.61 11.60±1.85 4.7±0.7 -
| DishesInBinTask | 0.0 0.167 |     | - −12.68±2.94 | 8.11±1.36 | 4.3±0.7 - |
| --------------- | --------- | --- | ------------- | --------- | --------- |
ElectronicsInBinTask 0.0 0.600 - −10.80±2.16 6.60±1.37 3.5±0.7 -
FoodPacking1BoxesTask 0.0 0.000 - −7.71±0.87 2.92±0.36 4.6±0.6 -
FoodPacking1CansTask 0.0 0.000 - −7.59±0.84 2.05±0.39 3.2±0.6 -
FoodPacking2BoxesTask 0.0 0.000 - −11.36±1.28 7.59±1.05 4.0±0.6 -
|                      |           |     | −11.53±1.41 | 5.64±0.72 | 3.0±0.4 |
| -------------------- | --------- | --- | ----------- | --------- | ------- |
| FoodPacking2CansTask | 0.0 0.000 |     | -           |           | -       |
FoodPacking3BoxesTask 0.0 0.000 - −11.92±2.09 8.76±1.94 3.5±0.8 -
FoodPacking3CansTask 0.0 0.000 - −12.00±2.22 8.76±1.45 3.5±0.6 -
FoodPackingByColorTask 0.0 0.000 - −9.74±1.30 4.13±0.58 3.3±0.5 -
FruitsGreenLimesOnPlateTask 0.0 0.000 - −9.17±1.46 3.32±0.48 3.4±0.5 -
FruitsMovingOrangeOrLimeTask 0.0 0.000 - −7.06±0.72 3.01±0.33 4.8±0.5 -
| FruitsMovingTask | 0.0 0.000 |     | - −7.21±0.84 | 3.33±0.29 | 5.4±0.5 - |
| ---------------- | --------- | --- | ------------ | --------- | --------- |
FruitsOnPlate3Task 0.0 0.333 - −11.42±1.22 7.01±0.58 3.3±0.3 -
FruitsOnPlateTask 0.0 0.143 - −13.72±2.58 10.19±0.87 3.2±0.3 -
| FruitsOnionTask | 0.0 0.000 |     | - −6.81±0.68 | 3.11±0.25 | 5.0±0.4 - |
| --------------- | --------- | --- | ------------ | --------- | --------- |
FruitsOnionToPlateTask 0.0 0.000 - −7.29±1.03 2.83±0.29 4.5±0.5 -
FruitsOrangesOnPlateTask 0.0 0.500 - −8.36±1.00 3.34±0.55 3.5±0.6 -
| GrabABagelTask | 0.0 0.000 |     | - −9.37±1.12 | 1.34±0.12 | 4.1±0.4 - |
| -------------- | --------- | --- | ------------ | --------- | --------- |
| GrabAFruitTask | 0.0 0.000 |     | - −8.12±1.77 | 1.38±0.12 | 4.2±0.4 - |
GreenSpoonsInPotTask 0.0 0.000 - −14.10±3.41 5.40±1.06 2.8±0.5 -
HammersInLeftBinTask 0.0 0.000 - −11.62±4.55 5.63±1.24 3.1±0.7 -
| JugsOnShelfTask | 0.0 0.000 |     | - −9.56±1.11 | 7.15±1.16 | 5.7±0.9 - |
| --------------- | --------- | --- | ------------ | --------- | --------- |
KeyboardOutOfBinTask 0.0 0.000 - −11.34±0.93 1.87±0.24 2.8±0.4 -
LargerObjectRaisinBoxInBinTask 0.0 0.000 - −5.26±1.06 1.19±0.35 3.8±1.1 -
| MarkerInMugTask | 0.0 0.000 |     | - −11.08±2.73 | 1.38±0.39 | 3.2±0.9 - |
| --------------- | --------- | --- | ------------- | --------- | --------- |
MouseOnKeyboardTask 0.0 0.000 - −8.12±2.15 2.60±0.90 4.1±1.4 -
MoveBananaToBagelPlateTask 0.0 0.000 - −16.21±1.55 3.14±0.63 3.2±0.6 -
MustardAboveRaisinTask 0.0 0.000 - −8.79±1.21 2.15±0.24 5.0±0.6 -
|                      |            | 11.95±4.85 | −4.71±0.72 | 1.46±0.55 | 6.6±1.7 |
| -------------------- | ---------- | ---------- | ---------- | --------- | ------- |
| MustardInLeftBinTask | 40.0 0.000 |            |            |           | -       |
MustardInRightBinTask 10.0 0.000 9.73 −5.24±1.15 1.73±0.39 6.0±0.9 -
NonHammerToolsInRightBinTask 0.0 0.000 - −11.80±1.73 5.57±1.45 3.1±0.8 -
OneBottleInSquarePailTask 30.0 0.000 11.82±15.51 −5.52±2.26 2.04±1.38 5.0±2.2 -
OneBottleOnShelfTask 0.0 0.000 - −7.33±1.50 3.16±0.73 5.0±1.2 -
PhoneOrRemoteInBinTask 30.0 0.000 36.87±16.70 −7.31±1.28 2.16±2.40 2.7±0.7 -
| PickDrillTask   | 0.0 0.200 |     | - −8.98±1.24  | 1.81±0.31 | 4.3±0.6 - |
| --------------- | --------- | --- | ------------- | --------- | --------- |
| PickGlassesTask | 0.0 0.000 |     | - −10.09±1.29 | 1.16±0.15 | 3.6±0.5 - |
PickOrangeObjectTask 0.0 0.000 - −12.71±1.39 1.97±0.54 3.1±0.8 -
PickUpBluePitcherTask 0.0 0.000 - −8.70±0.75 0.78±0.07 2.4±0.2 -
PickUpGreenObjectTask 0.0 0.000 - −7.86±1.18 0.72±0.17 2.2±0.5 -
PinkSpoonInPotTask 0.0 0.000 - −9.35±1.45 2.96±0.54 4.6±0.8 -
PlasticBottlesInSquarePailTask 0.0 0.167 - −12.35±2.72 7.08±1.80 3.7±0.9 -
PutBowlOnShelfTopTask 0.0 0.000 - −11.17±3.14 3.17±1.04 5.0±1.7 -
PutMugsOnShelfTask 0.0 0.200 - −10.55±2.35 9.90±3.16 5.3±1.6 -
PutTwoMugsOnShelfTask 0.0 0.300 - −10.85±1.16 9.13±1.32 5.0±0.7 -
| RecycleCartonTask | 0.0 0.050 |     | - −8.68±1.19 | 3.45±0.42 | 3.7±0.4 - |
| ----------------- | --------- | --- | ------------ | --------- | --------- |
RecycleCartonsOnBoxTask 0.0 0.000 - −16.54±1.76 2.53±0.24 2.6±0.2 -
RecycleCartonsVerticalCrateTask 0.0 0.000 - −15.36±2.12 2.21±0.35 2.3±0.4 -
RedDishesInBinTask 0.0 0.000 - −6.11±0.60 3.59±0.28 5.6±0.4 -
| RedItemsInBinTask | 0.0 0.250 |     | - −7.00±1.96 | 3.11±0.48 | 4.9±0.8 - |
| ----------------- | --------- | --- | ------------ | --------- | --------- |
ReorientAllMugsTask 0.0 0.083 - −11.52±1.69 4.14±0.64 4.4±0.6 -
| ReorientJugTask | 0.0 0.000 |     | - −11.37±0.88 | 2.51±0.30 | 3.9±0.5 - |
| --------------- | --------- | --- | ------------- | --------- | --------- |
ReorientRedMugTask 0.0 0.000 - −12.59±1.26 2.41±0.17 3.7±0.3 -
ReorientWhiteMugsTask 0.0 0.000 - −10.89±1.75 2.95±0.39 4.7±0.6 -
RubiksCubeAndBananaTask 30.0 0.214 35.27±20.43 −9.62±5.23 4.42±5.08 5.6±1.2 -
RubiksCubeBehindBowlTask 0.0 0.733 - −7.49±1.46 1.93±0.25 6.1±0.8 -
RubiksCubeInFrontOfBowlTask 0.0 0.600 - −7.87±1.06 2.15±0.28 6.8±0.9 -
RubiksCubeLeftOfBowlTask 10.0 0.667 9.87 −7.44±1.61 1.96±0.48 6.7±0.8 -
RubiksCubeOrBananaTask 60.0 0.000 14.52±6.82 −5.89±1.46 1.15±0.47 5.8±1.5 -
RubiksCubeRightOfBowlTask 0.0 0.367 - −8.08±2.05 0.98±0.15 3.1±0.5 -
RubiksCubeTask 100.0 - 16.89±8.64 −4.99±0.83 0.89±0.32 5.4±0.9 -
RubiksCubeThenBananaTask 30.0 0.071 19.96±6.63 −11.39±11.27 4.96±7.28 5.8±1.0 -
RubiksCubesInBinTask 0.0 0.200 - −7.65±1.16 5.46±0.53 4.4±0.4 -
SauceBottlesCrateTask 0.0 0.200 - −6.67±2.31 2.24±0.45 5.4±1.1 -
SmallPumpkinInBinTask 0.0 0.000 - −8.17±1.50 2.48±0.60 3.9±0.9 -
SmallerObjectButterInBinTask 10.0 0.000 15.00 −5.39±1.49 0.88±0.13 3.0±0.6 -
SmartphoneInBinTask 30.0 0.000 42.96±15.85 −7.15±1.74 3.46±4.13 3.7±0.5 -
| SpoonInMugTask       | 0.0 0.000 |     | - −9.36±1.50  | 2.56±0.43 | 4.0±0.7 - |
| -------------------- | --------- | --- | ------------- | --------- | --------- |
| SpoonsInPotTask      | 0.0 0.000 |     | - −13.87±1.86 | 6.39±1.52 | 3.4±0.8 - |
|                      |           |     | −8.98±1.70    | 2.73±0.32 | 4.3±0.5   |
| Stack3RubiksCubeTask | 0.0 0.050 |     | -             |           | -         |
StackWhiteMugsTask 0.0 0.150 - −7.70±1.26 3.32±0.43 5.3±0.7 -
StackYellowOnRedTask 0.0 0.000 - −7.81±1.74 2.07±0.21 3.2±0.3 -
TakeMeasuringSpoonOutTask 0.0 0.000 - −10.72±1.30 2.06±0.31 4.8±0.7 -
TakeMugsOffOfShelfTask 0.0 0.700 - −17.54±1.31 11.74±0.80 6.2±0.5 -
TakeSpatulaOffShelfTask 0.0 0.000 - −11.56±1.43 2.76±0.52 4.4±0.8 -
ThrowAwayAppleTask 0.0 0.000 - −11.59±2.98 2.36±0.62 3.7±1.0 -
ThrowAwaySnacksTask 0.0 0.000 - −10.93±2.98 5.04±0.90 4.0±0.7 -
ToolOrganizationBothTask 0.0 0.000 - −11.79±1.14 5.43±0.78 3.0±0.4 -
ToolOrganizationTask 0.0 0.000 - −11.56±2.15 4.94±1.10 2.8±0.6 -
ToolsPickingAllHammersTask 0.0 0.000 - −11.15±1.22 16.37±1.86 6.6±0.7 -
ToolsPickingDrillTask 0.0 0.000 - −6.28±0.77 3.96±0.47 6.3±0.6 -
ToolsPickingHammerTask 0.0 0.000 - −7.37±1.30 3.49±0.31 5.5±0.5 -
ToyInBinTask 30.0 0.000 30.62±23.94 −12.98±14.63 3.45±4.86 3.6±0.9 -
UnstackRubiksCubeTask 0.0 0.100 - −16.48±4.21 3.76±1.19 3.9±1.3 -
| UtensilsInMugTask | 0.0 0.000 |     | - −8.04±1.02 | 6.90±0.77 | 7.2±0.8 - |
| ----------------- | --------- | --- | ------------ | --------- | --------- |
WhiteMugInCenterOfTableTask 0.0 0.333 - −7.95±1.18 1.31±0.25 4.0±0.7 -
WhiteMugsInBinTask 0.0 0.000 - −12.91±1.36 2.52±0.25 4.0±0.4 -
WoodSpatulaToBowlTask 0.0 0.500 - −8.86±1.93 2.94±0.40 4.6±0.6 -
YellowAndWhiteObjectsInBinTask 0.0 0.000 - −8.00±2.01 2.67±0.89 4.4±1.4 -
| YogurtInBowlTask | 0.0 0.000 |     | - −9.83±1.42 | 1.76±0.29 | 4.0±0.7 - |
| ---------------- | --------- | --- | ------------ | --------- | --------- |

|     | TABLE XII: | Detailed | results for PaliGemma. |     |     |
| --- | ---------- | -------- | ---------------------- | --- | --- |
Task Name Succ% Score Time(s) SPARC PathLen(m) Speed(cm/s) WrongObjNames
TOTAL(120tasks) 1.5 0.067 14.72±11.09 −21.25±14.94 0.79±2.20 0.9±1.1
| AnimalsInBinTask | 0.0 0.000 | -   | −19.13±1.24 | 0.21±0.02 | 0.2±0.0 - |
| ---------------- | --------- | --- | ----------- | --------- | --------- |
AppleAndYogurtInBowlTask 0.0 0.000 - −19.69±6.80 0.46±0.04 0.4±0.0 -
BBQSauceInBinTask 0.0 0.000 - −20.30±10.72 1.01±0.91 1.1±1.0 -
BagelsOnPlateTask 0.0 0.000 - −40.20±25.26 0.20±0.05 0.3±0.1 -
| BananaInBowlTask  | 0.0 0.000 | -   | −12.20±4.86 | 0.17±0.14 | 0.3±0.2 - |
| ----------------- | --------- | --- | ----------- | --------- | --------- |
| BananaOnPlateTask | 0.0 0.000 | -   | −9.97±3.48  | 0.19±0.20 | 0.5±0.5 - |
BananaThenRubiksCubeTask 0.0 0.100 - −9.39±3.01 1.77±0.66 2.8±1.0 -
BananasInBinOneMoreTask 50.0 0.000 13.23±2.57 −11.90±16.87 5.93±15.11 5.0±2.8 -
BananasInBinThreeTotalTask 10.0 0.000 8.60 −13.03±6.81 1.85±2.29 2.9±2.9 -
BananasInCrateTask 0.0 0.000 - −10.00±4.02 0.48±0.65 0.7±1.0 -
BananasOutOfBinTask 0.0 1.000 - −32.28±21.47 0.48±0.38 0.5±0.4 -
BigPumpkinInBinTask 0.0 0.000 - −21.87±8.97 0.43±0.59 0.7±0.9 -
BlackItemsInBinTask 0.0 0.400 - −36.18±14.33 0.38±0.10 0.3±0.1 -
|                                |           |     | −28.35±9.35 | 0.23±0.03 | 0.2±0.0 |
| ------------------------------ | --------- | --- | ----------- | --------- | ------- |
| BlockStackingOrderAgnosticTask | 0.0 0.000 | -   |             |           | -       |
BlockStackingSpecifiedOrderTask 0.0 0.000 - −22.75±7.46 0.25±0.05 0.3±0.0 -
| BlocksInBinTask | 0.0 0.000 | -   | −28.08±3.66 | 0.49±0.03 | 0.3±0.0 - |
| --------------- | --------- | --- | ----------- | --------- | --------- |
| BowlInBinTask   | 0.0 0.000 | -   | −15.96±4.39 | 0.18±0.01 | 0.3±0.0 - |
BowlStackingLeftOnRightTask 0.0 0.000 - −5.98±2.36 0.07±0.01 0.3±0.1 -
BowlStackingRightOnLeftTask 0.0 0.000 - −5.26±0.43 0.07±0.00 0.3±0.0 -
ButterAboveRaisinTask 0.0 0.000 - −10.76±1.34 0.08±0.01 0.2±0.0 -
CannedFoodInBinTask 0.0 0.000 - −9.28±3.93 0.45±0.31 0.7±0.6 -
ClampInRightBinTask 0.0 0.000 - −17.54±5.77 0.21±0.17 0.4±0.4 -
| CleanUpToysTask | 0.0 0.022 | -   | −38.61±8.64 | 2.23±0.66 | 0.8±0.2 - |
| --------------- | --------- | --- | ----------- | --------- | --------- |
ClearOrganicObjectsTask 0.0 0.000 - −32.68±11.41 1.56±0.39 0.6±0.2 -
ClutterPlasticTask 0.0 0.000 - −29.88±10.26 0.71±0.09 0.4±0.0 -
ClutterPumpkinTask 0.0 0.000 - −26.94±18.46 0.65±0.80 0.7±0.9 -
CoffeePotInBinTask 0.0 0.000 - −14.75±7.94 1.52±0.55 2.4±0.9 -
CondimentsInBinTask 0.0 0.000 - −16.19±4.85 3.17±1.36 1.8±0.7 -
CookingClearPlateTask 0.0 0.000 - −20.15±8.52 2.06±0.83 1.1±0.4 -
CookingPickPastaToolTask 0.0 0.000 - −10.31±1.58 0.23±0.09 0.4±0.1 -
CubesAndBlocksInBinTask 0.0 0.033 - −30.93±9.12 1.53±0.62 0.6±0.3 -
| DishesInBinTask | 0.0 0.000 | -   | −56.74±10.82 | 1.40±0.45 | 0.8±0.3 - |
| --------------- | --------- | --- | ------------ | --------- | --------- |
ElectronicsInBinTask 0.0 0.525 - −34.41±14.61 0.92±0.33 0.5±0.2 -
FoodPacking1BoxesTask 0.0 0.000 - −13.09±3.89 0.26±0.20 0.4±0.3 -
FoodPacking1CansTask 0.0 0.000 - −15.03±4.42 0.15±0.04 0.2±0.1 -
FoodPacking2BoxesTask 0.0 0.000 - −34.68±12.86 0.95±0.64 0.5±0.3 -
|                      |           |     | −35.70±10.32 | 0.67±0.18 | 0.4±0.1 |
| -------------------- | --------- | --- | ------------ | --------- | ------- |
| FoodPacking2CansTask | 0.0 0.000 | -   |              |           | -       |
FoodPacking3BoxesTask 0.0 0.000 - −34.88±9.67 2.61±0.65 1.1±0.3 -
FoodPacking3CansTask 0.0 0.000 - −29.87±9.26 1.72±0.35 0.8±0.2 -
FoodPackingByColorTask 0.0 0.000 - −53.42±16.57 0.35±0.05 0.3±0.0 -
FruitsGreenLimesOnPlateTask 0.0 0.000 - −31.44±9.90 0.67±0.22 0.7±0.2 -
FruitsMovingOrangeOrLimeTask 0.0 0.000 - −28.71±4.29 0.31±0.03 0.5±0.1 -
| FruitsMovingTask | 0.0 0.000 | -   | −29.73±5.48 | 0.37±0.10 | 0.6±0.1 - |
| ---------------- | --------- | --- | ----------- | --------- | --------- |
FruitsOnPlate3Task 0.0 0.367 - −26.59±9.66 1.37±0.54 0.7±0.3 -
FruitsOnPlateTask 0.0 0.143 - −29.77±8.78 2.06±0.54 0.7±0.2 -
| FruitsOnionTask | 0.0 0.000 | -   | −21.79±13.87 | 0.29±0.06 | 0.5±0.1 - |
| --------------- | --------- | --- | ------------ | --------- | --------- |
FruitsOnionToPlateTask 0.0 0.000 - −26.20±16.88 0.21±0.06 0.3±0.1 -
FruitsOrangesOnPlateTask 0.0 0.500 - −27.40±8.09 0.55±0.23 0.6±0.2 -
| GrabABagelTask | 0.0 0.000 | -   | −21.22±4.13 | 0.08±0.01 | 0.2±0.0 - |
| -------------- | --------- | --- | ----------- | --------- | --------- |
| GrabAFruitTask | 0.0 0.000 | -   | −10.70±4.14 | 0.07±0.01 | 0.2±0.0 - |
GreenSpoonsInPotTask 0.0 0.000 - −47.57±16.62 0.83±0.52 0.5±0.4 -
HammersInLeftBinTask 0.0 0.000 - −21.20±7.23 1.86±0.71 1.2±0.5 -
| JugsOnShelfTask | 0.0 0.000 | -   | −32.26±12.27 | 0.40±0.15 | 0.3±0.1 - |
| --------------- | --------- | --- | ------------ | --------- | --------- |
KeyboardOutOfBinTask 0.0 0.000 - −20.17±6.34 0.19±0.04 0.3±0.1 -
LargerObjectRaisinBoxInBinTask 0.0 0.000 - −15.33±7.52 0.21±0.10 0.7±0.4 -
| MarkerInMugTask | 0.0 0.000 | -   | −22.08±7.50 | 0.16±0.11 | 0.4±0.3 - |
| --------------- | --------- | --- | ----------- | --------- | --------- |
MouseOnKeyboardTask 0.0 0.000 - −10.75±2.88 0.26±0.10 0.4±0.2 -
MoveBananaToBagelPlateTask 0.0 0.000 - −53.13±17.03 0.36±0.05 0.4±0.0 -
MustardAboveRaisinTask 0.0 0.000 - −8.00±1.66 0.11±0.02 0.2±0.0 -
|                      |           |     | −7.78±4.51 | 1.10±0.42 | 3.4±1.3 |
| -------------------- | --------- | --- | ---------- | --------- | ------- |
| MustardInLeftBinTask | 0.0 0.000 | -   |            |           | -       |
MustardInRightBinTask 30.0 0.000 7.53±1.35 −9.43±9.96 1.06±0.71 5.1±2.9 -
NonHammerToolsInRightBinTask 0.0 0.000 - −53.81±16.67 0.57±0.20 0.3±0.2 -
OneBottleInSquarePailTask 80.0 0.000 17.94±15.51 −26.59±40.29 5.64±16.50 3.0±1.7 -
OneBottleOnShelfTask 0.0 0.000 - −18.26±4.95 0.82±0.52 1.3±0.8 -
PhoneOrRemoteInBinTask 0.0 0.000 - −21.19±8.24 0.20±0.10 0.3±0.2 -
| PickDrillTask   | 0.0 0.000 | -   | −9.97±3.11  | 0.22±0.23 | 0.5±0.6 - |
| --------------- | --------- | --- | ----------- | --------- | --------- |
| PickGlassesTask | 0.0 0.000 | -   | −16.62±7.62 | 0.07±0.01 | 0.2±0.0 - |
PickOrangeObjectTask 0.0 0.000 - −17.03±3.50 0.27±0.10 0.4±0.1 -
PickUpBluePitcherTask 0.0 0.150 - −9.62±4.11 0.45±0.59 1.4±1.8 -
PickUpGreenObjectTask 0.0 0.100 - −6.16±1.59 1.15±0.64 3.5±2.0 -
PinkSpoonInPotTask 0.0 0.000 - −21.66±12.41 0.25±0.07 0.4±0.1 -
PlasticBottlesInSquarePailTask 0.0 0.500 - −26.86±6.15 2.02±0.76 1.1±0.4 -
PutBowlOnShelfTopTask 0.0 0.000 - −10.45±3.76 1.27±0.40 2.1±0.6 -
PutMugsOnShelfTask 0.0 0.200 - −25.02±12.03 2.09±0.70 1.2±0.5 -
PutTwoMugsOnShelfTask 0.0 0.000 - −24.64±14.33 1.79±0.93 1.0±0.5 -
RecycleCartonTask 0.0 0.000 - −27.94±11.96 0.82±0.67 0.9±0.7 -
RecycleCartonsOnBoxTask 0.0 0.000 - −23.62±18.11 0.96±0.89 1.0±1.0 -
RecycleCartonsVerticalCrateTask 0.0 0.000 - −24.83±12.03 0.80±0.43 0.9±0.5 -
RedDishesInBinTask 0.0 0.000 - −14.89±2.68 0.20±0.01 0.3±0.0 -
RedItemsInBinTask 0.0 0.000 - −15.79±2.62 0.17±0.01 0.3±0.0 -
ReorientAllMugsTask 0.0 0.000 - −19.23±5.15 1.08±0.39 1.2±0.4 -
| ReorientJugTask | 0.0 0.000 | -   | −13.83±7.56 | 0.19±0.13 | 0.3±0.2 - |
| --------------- | --------- | --- | ----------- | --------- | --------- |
ReorientRedMugTask 0.0 0.000 - −20.41±2.90 0.36±0.39 0.6±0.6 -
ReorientWhiteMugsTask 0.0 0.000 - −13.84±3.19 0.58±0.15 0.9±0.2 -
RubiksCubeAndBananaTask 0.0 0.150 - −11.54±5.20 1.64±0.84 2.6±1.3 -
RubiksCubeBehindBowlTask 0.0 0.333 - −11.42±4.82 0.09±0.01 0.3±0.0 -
RubiksCubeInFrontOfBowlTask 0.0 0.333 - −7.43±1.33 0.07±0.01 0.2±0.0 -
RubiksCubeLeftOfBowlTask 0.0 0.333 - −17.24±8.84 0.11±0.02 0.3±0.1 -
RubiksCubeOrBananaTask 10.0 0.000 24.13 −11.08±4.46 0.85±0.57 2.8±2.3 -
RubiksCubeRightOfBowlTask 0.0 0.333 - −8.25±2.61 0.06±0.00 0.2±0.0 -
| RubiksCubeTask | 0.0 0.000 | -   | −11.91±2.83 | 0.17±0.17 | 0.4±0.4 - |
| -------------- | --------- | --- | ----------- | --------- | --------- |
RubiksCubeThenBananaTask 0.0 0.000 - −14.34±3.23 1.05±0.44 1.7±0.7 -
RubiksCubesInBinTask 0.0 0.033 - −19.29±3.21 0.81±0.67 0.7±0.5 -
SauceBottlesCrateTask 0.0 0.000 - −11.61±6.45 0.78±0.27 1.8±0.7 -
SmallPumpkinInBinTask 0.0 0.000 - −20.58±11.99 0.76±0.65 1.2±1.0 -
SmallerObjectButterInBinTask 0.0 0.000 - −16.65±6.92 0.53±0.21 1.9±0.7 -
SmartphoneInBinTask 0.0 0.000 - −11.73±1.15 0.15±0.01 0.2±0.0 -
| SpoonInMugTask       | 0.0 0.000 | -   | −11.05±3.07  | 0.33±0.19 | 0.5±0.3 - |
| -------------------- | --------- | --- | ------------ | --------- | --------- |
| SpoonsInPotTask      | 0.0 0.000 | -   | −49.28±18.06 | 0.79±0.45 | 0.4±0.2 - |
|                      |           |     | −23.41±7.42  | 0.20±0.06 | 0.3±0.1   |
| Stack3RubiksCubeTask | 0.0 0.000 | -   |              |           | -         |
StackWhiteMugsTask 0.0 0.300 - −13.46±4.14 1.11±0.29 1.7±0.5 -
StackYellowOnRedTask 0.0 0.000 - −11.80±1.56 0.15±0.01 0.2±0.0 -
TakeMeasuringSpoonOutTask 0.0 0.000 - −8.82±0.48 0.10±0.00 0.2±0.0 -
TakeMugsOffOfShelfTask 0.0 0.000 - −47.29±9.65 0.92±0.22 0.5±0.1 -
TakeSpatulaOffShelfTask 0.0 0.000 - −13.65±1.56 0.14±0.01 0.2±0.0 -
ThrowAwayAppleTask 0.0 0.000 - −15.97±2.91 0.25±0.11 0.4±0.2 -
ThrowAwaySnacksTask 0.0 0.000 - −15.04±2.37 1.48±0.49 1.2±0.4 -
ToolOrganizationBothTask 0.0 0.000 - −44.61±31.70 2.44±1.89 1.3±1.0 -
ToolOrganizationTask 0.0 0.000 - −22.47±8.67 2.71±0.68 1.8±0.6 -
ToolsPickingAllHammersTask 0.0 0.025 - −45.61±7.23 1.32±0.32 0.5±0.1 -
ToolsPickingDrillTask 0.0 0.000 - −25.90±3.50 0.38±0.06 0.6±0.1 -
ToolsPickingHammerTask 0.0 0.000 - −25.45±7.81 0.32±0.21 0.5±0.3 -
| ToyInBinTask | 0.0 0.000 | -   | −13.94±5.99 | 0.15±0.03 | 0.2±0.0 - |
| ------------ | --------- | --- | ----------- | --------- | --------- |
UnstackRubiksCubeTask 0.0 0.000 - −12.51±1.50 0.20±0.06 0.2±0.1 -
UtensilsInMugTask 0.0 0.000 - −16.70±9.82 1.06±0.26 1.1±0.3 -
WhiteMugInCenterOfTableTask 0.0 0.333 - −13.37±3.04 0.60±0.21 1.9±0.6 -
WhiteMugsInBinTask 0.0 0.000 - −16.27±3.56 0.19±0.04 0.3±0.1 -
WoodSpatulaToBowlTask 0.0 0.000 - −9.83±2.34 0.28±0.09 0.4±0.1 -
YellowAndWhiteObjectsInBinTask 0.0 0.000 - −7.41±3.18 0.26±0.05 0.4±0.1 -
YogurtInBowlTask 0.0 0.000 - −21.30±10.08 0.14±0.06 0.3±0.1 -

|     | TABLE XIII: | Detailed | results for GR00T | N1.6. |     |
| --- | ----------- | -------- | ----------------- | ----- | --- |
Task Name Succ% Score Time(s) SPARC PathLen(m) Speed(cm/s) WrongObjNames
TOTAL(120tasks) 2.0 0.105 44.59±31.00 −9.25±4.96 3.33±2.90 4.0±1.8
| AnimalsInBinTask | 0.0 0.000 | -   | −14.83±0.77 | 3.12±0.69 | 3.6±0.9 - |
| ---------------- | --------- | --- | ----------- | --------- | --------- |
AppleAndYogurtInBowlTask 40.0 0.500 102.57±3.77 −12.76±5.41 7.48±6.87 5.0±1.1 -
BBQSauceInBinTask 0.0 0.000 - −10.41±4.95 1.98±0.44 2.2±0.6 -
| BagelsOnPlateTask | 0.0 0.000 | -   | −8.78±4.78 | 1.48±0.23 | 2.6±0.6 - |
| ----------------- | --------- | --- | ---------- | --------- | --------- |
| BananaInBowlTask  | 0.0 0.000 | -   | −6.21±1.25 | 1.63±0.30 | 3.4±0.7 - |
BananaOnPlateTask 0.0 0.000 - −10.34±0.91 1.25±0.21 3.3±0.7 -
BananaThenRubiksCubeTask 0.0 0.000 - −7.74±1.51 1.65±0.28 2.8±0.5 -
BananasInBinOneMoreTask 0.0 0.000 - −10.90±2.17 2.15±0.39 3.7±0.8 -
BananasInBinThreeTotalTask 0.0 0.000 - −9.07±4.50 1.67±0.31 3.1±0.8 -
BananasInCrateTask 0.0 0.000 - −10.46±5.34 1.69±0.22 3.0±0.5 -
BananasOutOfBinTask 0.0 1.000 - −4.66±0.77 5.69±1.49 6.5±1.8 -
BigPumpkinInBinTask 0.0 0.000 - −7.11±2.15 1.77±0.36 3.2±0.8 -
BlackItemsInBinTask 0.0 0.540 - −7.35±4.86 4.26±0.89 4.2±1.2 -
|                                |           |     | −9.40±4.70 | 2.41±0.49 | 2.8±0.7 |
| ------------------------------ | --------- | --- | ---------- | --------- | ------- |
| BlockStackingOrderAgnosticTask | 0.0 0.000 | -   |            |           | -       |
BlockStackingSpecifiedOrderTask 0.0 0.000 - −3.23±0.08 5.53±1.34 6.7±1.8 -
| BlocksInBinTask | 0.0 0.000 | -   | −4.19±0.51 | 3.74±0.89 | 2.7±0.7 - |
| --------------- | --------- | --- | ---------- | --------- | --------- |
| BowlInBinTask   | 0.0 0.000 | -   | −6.06±0.98 | 1.85±0.26 | 3.3±0.5 - |
BowlStackingLeftOnRightTask 0.0 0.000 - −7.84±0.35 1.14±0.21 6.0±1.3 -
BowlStackingRightOnLeftTask 0.0 0.000 - −9.61±1.12 0.94±0.10 4.7±0.7 -
ButterAboveRaisinTask 0.0 0.000 - −9.48±0.15 3.47±0.92 9.3±2.8 -
CannedFoodInBinTask 0.0 0.000 - −11.60±2.57 2.42±0.55 4.3±1.0 -
ClampInRightBinTask 0.0 0.000 - −14.91±2.20 2.19±0.53 3.9±1.0 -
| CleanUpToysTask | 0.0 0.000 | -   | −4.69±0.29 | 9.23±2.30 | 3.2±0.9 - |
| --------------- | --------- | --- | ---------- | --------- | --------- |
ClearOrganicObjectsTask 0.0 0.000 - −7.13±1.86 15.71±5.34 6.8±2.4 -
ClutterPlasticTask 0.0 0.000 - −16.01±11.53 4.10±1.27 2.3±0.8 -
ClutterPumpkinTask 0.0 0.000 - −13.36±6.35 3.33±0.59 3.9±1.0 -
CoffeePotInBinTask 0.0 0.000 - −14.40±2.15 1.61±0.27 2.8±0.6 -
CondimentsInBinTask 0.0 0.025 - −3.46±0.19 5.23±1.05 3.0±0.7 -
CookingClearPlateTask 0.0 0.000 - −3.26±0.11 9.39±2.95 5.5±1.8 -
CookingPickPastaToolTask 0.0 0.000 - −9.51±3.45 2.90±1.01 5.4±2.0 -
CubesAndBlocksInBinTask 0.0 0.033 - −6.70±2.53 5.15±1.16 2.2±0.6 -
| DishesInBinTask | 0.0 0.000 | -   | −5.44±0.97 | 6.84±1.45 | 4.2±1.0 - |
| --------------- | --------- | --- | ---------- | --------- | --------- |
ElectronicsInBinTask 0.0 0.500 - −5.09±0.96 7.79±2.13 4.6±1.3 -
FoodPacking1BoxesTask 0.0 0.000 - −15.32±3.12 2.11±0.44 3.6±0.8 -
FoodPacking1CansTask 0.0 0.000 - −12.38±0.85 1.79±0.29 3.2±0.6 -
FoodPacking2BoxesTask 0.0 0.000 - −3.63±0.31 5.21±0.97 3.0±0.6 -
|                      |           |     | −21.53±8.44 | 6.14±1.76 | 3.6±1.1 |
| -------------------- | --------- | --- | ----------- | --------- | ------- |
| FoodPacking2CansTask | 0.0 0.000 | -   |             |           | -       |
FoodPacking3BoxesTask 0.0 0.000 - −3.64±0.39 5.91±1.16 2.6±0.5 -
FoodPacking3CansTask 0.0 0.000 - −3.30±0.18 11.95±3.28 5.4±1.6 -
FoodPackingByColorTask 0.0 0.000 - −7.40±3.92 4.03±0.92 3.5±0.9 -
FruitsGreenLimesOnPlateTask 0.0 0.000 - −6.96±3.25 3.44±0.99 4.0±1.3 -
FruitsMovingOrangeOrLimeTask 0.0 0.300 - −9.69±1.28 1.49±0.26 2.7±0.6 -
| FruitsMovingTask | 0.0 0.000 | -   | −13.90±2.35 | 1.74±0.29 | 3.0±0.6 - |
| ---------------- | --------- | --- | ----------- | --------- | --------- |
FruitsOnPlate3Task 0.0 0.333 - −3.60±0.54 7.32±1.93 3.9±1.1 -
FruitsOnPlateTask 0.0 0.143 - −4.58±0.53 10.48±2.78 3.8±1.1 -
| FruitsOnionTask | 0.0 0.000 | -   | −9.62±4.20 | 2.51±0.62 | 4.4±1.2 - |
| --------------- | --------- | --- | ---------- | --------- | --------- |
FruitsOnionToPlateTask 0.0 0.000 - −12.34±1.22 1.72±0.35 3.1±0.7 -
FruitsOrangesOnPlateTask 0.0 0.500 - −10.29±5.51 3.95±1.17 4.9±1.6 -
| GrabABagelTask | 0.0 0.500 | -   | −7.12±0.67 | 1.02±0.15 | 3.5±0.6 - |
| -------------- | --------- | --- | ---------- | --------- | --------- |
| GrabAFruitTask | 0.0 0.000 | -   | −5.88±0.33 | 1.15±0.23 | 4.0±0.9 - |
GreenSpoonsInPotTask 0.0 0.000 - −3.31±0.18 4.07±0.99 2.4±0.6 -
HammersInLeftBinTask 0.0 0.000 - −24.54±8.33 5.18±1.22 3.1±0.8 -
| JugsOnShelfTask | 0.0 0.000 | -   | −5.29±2.92 | 4.89±1.31 | 4.4±1.3 - |
| --------------- | --------- | --- | ---------- | --------- | --------- |
KeyboardOutOfBinTask 0.0 0.000 - −6.00±2.06 3.09±0.96 5.5±1.9 -
LargerObjectRaisinBoxInBinTask 0.0 0.000 - −9.39±1.12 1.03±0.16 3.4±0.6 -
| MarkerInMugTask | 0.0 0.000 | -   | −10.63±0.54 | 1.50±0.36 | 3.6±0.9 - |
| --------------- | --------- | --- | ----------- | --------- | --------- |
MouseOnKeyboardTask 0.0 0.000 - −17.97±0.36 4.25±1.44 7.6±2.8 -
MoveBananaToBagelPlateTask 0.0 0.000 - −3.12±1.62 6.44±2.53 7.5±3.0 -
MustardAboveRaisinTask 0.0 0.000 - −12.90±0.72 1.79±0.29 4.6±0.9 -
|                      |           |     | −8.44±1.78 | 0.88±0.12 | 3.1±0.6 |
| -------------------- | --------- | --- | ---------- | --------- | ------- |
| MustardInLeftBinTask | 0.0 0.000 | -   |            |           | -       |
MustardInRightBinTask 0.0 0.000 - −12.26±3.28 0.80±0.11 2.7±0.5 -
NonHammerToolsInRightBinTask 0.0 0.000 - −4.73±0.79 4.50±0.91 2.9±0.6 -
OneBottleInSquarePailTask 50.0 0.000 53.43±0.56 −10.63±3.20 3.86±1.13 6.9±1.8 -
OneBottleOnShelfTask 0.0 0.000 - −13.64±4.58 1.42±0.20 2.5±0.4 -
PhoneOrRemoteInBinTask 0.0 0.000 - −10.80±2.67 1.66±0.30 2.6±0.5 -
| PickDrillTask   | 0.0 0.600 | -   | −11.61±0.96 | 1.70±0.32 | 4.2±0.9 - |
| --------------- | --------- | --- | ----------- | --------- | --------- |
| PickGlassesTask | 0.0 0.300 | -   | −7.86±0.38  | 1.07±0.15 | 3.7±0.6 - |
PickOrangeObjectTask 0.0 0.000 - −11.56±2.23 3.03±1.00 5.4±1.9 -
PickUpBluePitcherTask 0.0 0.500 - −9.63±0.57 1.24±0.27 4.4±1.1 -
PickUpGreenObjectTask 0.0 0.500 - −9.25±0.66 1.02±0.16 3.4±0.6 -
PinkSpoonInPotTask 0.0 0.000 - −6.68±2.39 1.89±0.47 3.2±0.8 -
PlasticBottlesInSquarePailTask 0.0 0.000 - −6.34±0.67 6.61±1.43 3.9±0.9 -
PutBowlOnShelfTopTask 0.0 0.200 - −13.03±2.93 2.67±0.58 4.9±1.2 -
PutMugsOnShelfTask 0.0 0.000 - −3.56±0.35 6.10±1.28 3.7±0.9 -
PutTwoMugsOnShelfTask 0.0 0.000 - −5.98±0.73 4.91±0.94 2.9±0.6 -
| RecycleCartonTask | 0.0 0.000 | -   | −9.66±4.41 | 2.46±0.40 | 2.8±0.5 - |
| ----------------- | --------- | --- | ---------- | --------- | --------- |
RecycleCartonsOnBoxTask 0.0 0.000 - −15.99±4.32 3.55±0.88 4.2±1.1 -
RecycleCartonsVerticalCrateTask 0.0 0.000 - −12.94±4.56 2.75±0.53 3.3±0.7 -
RedDishesInBinTask 0.0 0.000 - −5.83±3.00 1.66±0.31 2.9±0.6 -
RedItemsInBinTask 0.0 0.000 - −11.19±1.69 1.30±0.20 2.3±0.4 -
ReorientAllMugsTask 0.0 0.000 - −7.13±4.61 4.65±1.56 5.8±2.1 -
| ReorientJugTask | 0.0 0.000 | -   | −10.09±1.16 | 3.20±0.77 | 5.7±1.5 - |
| --------------- | --------- | --- | ----------- | --------- | --------- |
ReorientRedMugTask 0.0 0.000 - −6.82±3.04 2.32±0.60 4.1±1.1 -
ReorientWhiteMugsTask 0.0 0.000 - −9.32±2.47 2.20±0.42 3.8±0.8 -
RubiksCubeAndBananaTask 0.0 0.000 - −9.96±0.95 2.39±0.53 4.0±1.0 -
RubiksCubeBehindBowlTask 0.0 0.667 - −14.58±1.24 1.07±0.26 3.7±1.1 -
RubiksCubeInFrontOfBowlTask 0.0 0.667 - −10.63±3.22 1.11±0.29 3.9±1.1 -
RubiksCubeLeftOfBowlTask 0.0 0.500 - −13.39±0.69 1.18±0.22 3.9±0.9 -
RubiksCubeOrBananaTask 0.0 0.000 - −9.56±0.87 1.01±0.20 3.5±0.8 -
RubiksCubeRightOfBowlTask 0.0 0.667 - −9.20±3.36 0.85±0.13 2.9±0.5 -
| RubiksCubeTask | 0.0 0.000 | -   | −9.18±1.62 | 1.29±0.21 | 3.3±0.6 - |
| -------------- | --------- | --- | ---------- | --------- | --------- |
RubiksCubeThenBananaTask 0.0 0.000 - −8.66±4.70 1.58±0.44 2.8±0.9 -
RubiksCubesInBinTask 0.0 0.033 - −3.58±0.65 2.47±0.55 2.2±0.6 -
SauceBottlesCrateTask 0.0 0.000 - −9.01±1.20 1.03±0.17 2.7±0.5 -
SmallPumpkinInBinTask 0.0 0.000 - −6.84±2.29 3.64±1.11 6.4±2.1 -
SmallerObjectButterInBinTask 0.0 0.000 - −8.80±0.77 0.87±0.07 2.9±0.4 -
SmartphoneInBinTask 0.0 0.000 - −9.03±1.86 1.80±0.43 3.2±0.6 -
| SpoonInMugTask       | 0.0 0.000 | -   | −9.55±2.55  | 3.29±1.07 | 6.0±2.1 - |
| -------------------- | --------- | --- | ----------- | --------- | --------- |
| SpoonsInPotTask      | 0.0 0.000 | -   | −5.05±0.53  | 3.54±0.50 | 2.1±0.4 - |
|                      |           |     | −11.43±1.24 | 2.64±0.67 | 4.4±1.2   |
| Stack3RubiksCubeTask | 0.0 0.000 | -   |             |           | -         |
StackWhiteMugsTask 0.0 0.000 - −12.24±1.50 1.45±0.30 2.5±0.6 -
StackYellowOnRedTask 0.0 0.000 - −16.61±0.39 3.51±0.87 5.8±1.5 -
TakeMeasuringSpoonOutTask 0.0 0.000 - −10.69±1.38 1.15±0.17 3.0±0.5 -
TakeMugsOffOfShelfTask 0.0 0.650 - −2.86±0.07 9.07±3.09 5.8±2.0 -
TakeSpatulaOffShelfTask 0.0 0.000 - −9.59±4.47 4.72±1.62 8.7±3.2 -
ThrowAwayAppleTask 0.0 0.000 - −9.53±2.98 2.22±0.35 3.6±0.6 -
ThrowAwaySnacksTask 0.0 0.000 - −7.31±4.37 3.07±0.57 2.7±0.6 -
ToolOrganizationBothTask 0.0 0.000 - −3.72±1.04 3.86±0.54 2.2±0.4 -
ToolOrganizationTask 0.0 0.000 - −14.59±9.04 4.88±1.33 3.0±0.9 -
ToolsPickingAllHammersTask 0.0 0.025 - −3.05±0.24 12.47±3.28 5.5±1.6 -
ToolsPickingDrillTask 0.0 0.000 - −15.47±0.75 2.76±0.69 4.9±1.4 -
ToolsPickingHammerTask 0.0 0.000 - −18.37±3.98 1.97±0.26 3.4±0.6 -
ToyInBinTask 70.0 0.000 12.22±1.23 −6.43±1.53 1.32±0.81 6.4±2.1 -
UnstackRubiksCubeTask 80.0 0.750 38.41±9.06 −12.47±2.08 2.55±1.25 5.3±0.8 -
| UtensilsInMugTask | 0.0 0.000 | -   | −8.82±4.61 | 2.47±0.37 | 2.8±0.5 - |
| ----------------- | --------- | --- | ---------- | --------- | --------- |
WhiteMugInCenterOfTableTask 0.0 0.567 - −9.87±1.31 0.90±0.14 3.2±0.6 -
WhiteMugsInBinTask 0.0 0.000 - −6.29±1.58 2.27±0.51 3.9±1.0 -
WoodSpatulaToBowlTask 0.0 0.000 - −12.98±1.94 1.72±0.38 3.1±0.8 -
YellowAndWhiteObjectsInBinTask 0.0 0.000 - −8.35±1.66 1.81±0.42 3.3±0.8 -
| YogurtInBowlTask | 0.0 0.000 | -   | −7.32±1.48 | 3.01±1.02 | 7.6±2.8 - |
| ---------------- | --------- | --- | ---------- | --------- | --------- |

You are a scene generation expert creating REALISTIC robot manipulation scenarios.
| REAL-WORLD        |                  | SCENE     |             | PRINCIPLES: |                 |              |                       |     |
| ----------------- | ---------------- | --------- | ----------- | ----------- | --------------- | ------------ | --------------------- | --- |
| 1. Objects        | form             | CLUSTERS  |             | - not       | evenly          | spaced grids |                       |     |
| 2. Containers     |                  | (bowls,   | bins)       | have        | objects INSIDE  | them         |                       |     |
| 3. Supports       | (plates,         |           | trays) have | objects     | ON              | TOP          |                       |     |
| 4. Objects        | scatter          | naturally |             | AROUND      | containers      |              |                       |     |
| 5. Orientations   |                  | VARY      | - not       | all aligned | to              | 0◦/90◦       |                       |     |
| COORDINATE        |                  | SYSTEM:   |             |             |                 |              |                       |     |
| - Table           | bounds:          | X=[0.25   | to          | 0.85],      | Y=[-0.40        | to 0.40]     | (meters)              |     |
| - Table           | center:          | (0.55,    | 0.0)        |             |                 |              |                       |     |
| - Front=+X,       | Back=-X,         |           | Left=+Y,    | Right=-Y    |                 |              |                       |     |
| PLACEMENT         |                  | TYPES:    |             |             |                 |              |                       |     |
| 1. place-on-base: |                  | Object    | directly    |             | on table        |              |                       |     |
| {“type”:          | “place-on-base”, |           | “object”:   |             | “bowl           | 0”, “x”:     | 0.4, “y”: 0.1, “yaw”: | 23} |
| VARY              | yaw angles       | (15,      | 47,         | 123, not    | just 0/90/180). |              |                       |     |
| Position          | matters          | for       | anchors,    | less        | for loose       | objects.     |                       |     |
| 2. place-in:      | Objects          |           | INSIDE      | a container |                 |              |                       |     |
{“type”: “place-in”, “objects”: [“apple 01”, “orange 01”], “container”: “bowl 0”}
| Container    | MUST       | be        | placed | first | with place-on-base. |     |     |     |
| ------------ | ---------- | --------- | ------ | ----- | ------------------- | --- | --- | --- |
| Great        | for fruits | in bowls, | items  | in    | bins.               |     |     |     |
| 3. place-on: | Object     |           | ON TOP | of    | support             |     |     |     |
{“type”: “place-on”, “object”: “banana”, “support”: “plate large”, “position”: “center”}
| Support            | MUST      | be placed  | first. |             |        |           |     |     |
| ------------------ | --------- | ---------- | ------ | ----------- | ------ | --------- | --- | --- |
| position:          | “center”, | “edge”,    |        | or “random” |        |           |     |     |
| Great              | for food  | on plates, | items  | on          | trays. |           |     |     |
| 4. cluster-around: |           | Objects    |        | scattered   | NEAR   | an anchor |     |     |
{“type”: “cluster-around”, “objects”: [“mug”, “spoon”], “anchor”: “bowl 0”, “radius”: 0.15}
| Creates     | natural    | groupings.  |            |                       |                  |          |          |     |
| ----------- | ---------- | ----------- | ---------- | --------------------- | ---------------- | -------- | -------- | --- |
| radius:     | how far    | from        | anchor     | (0.10–0.20m           |                  | typical) |          |     |
| SCENE       | STRUCTURE  |             | (follow    | this                  | pattern):        |          |          |     |
| 1. Place    | 1-2 ANCHOR |             | objects    | (containers/supports) |                  |          | on table |     |
| 2. Put      | objects    | INSIDE      | containers |                       | (place-in)       |          |          |     |
| 3. Put      | objects    | ON supports |            | (place-on)            |                  |          |          |     |
| 4. Cluster  | objects    | AROUND      |            | anchors               | (cluster-around) |          |          |     |
| 5. Add      | a few      | LOOSE       | objects    | to                    | fill space       |          |          |     |
| REALISTIC   |            | SPACING:    |            |                       |                  |          |          |     |
| - Anchors:  | 0.25-0.35m |             | apart      |                       |                  |          |          |     |
| - Clustered | objects:   | 0.08-0.15m  |            | from                  | anchor           |          |          |     |
| - Loose     | objects:   | fill        | remaining  | space                 | naturally        |          |          |     |
Fig. 10: System prompt for Stage I (Semantic Planning). This prompt instructs the LLM to generate physically plausible scene
| layouts using | structured |     | predicates | rather | than | raw coordinates. |     |     |
| ------------- | ---------- | --- | ---------- | ------ | ---- | ---------------- | --- | --- |
TABLE XIV: Quantitative comparison for Scene Generation. We evaluate our against the baseline across diverse metrics
measuring the visual realism (Real.), functionality (Func.), layout correctness (Lay.), Quality (Qual.), VQA score [18], and GPT
Preference.
Method VQA(↑) Real.(↑) Func.(↑) Lay.(↑) Compl.(↑) Qual.(↑) #Obj(↑) GPTPref.(↑)
Baseline 0.398(±0.04) 6.889(±0.36) 6.221(±0.58) 6.166(±0.42) 4.687(±0.57) 5.991(±0.24) 13.750(±10.52) 18.000
Ours 0.554(±0.03) 8.755(±0.27) 8.951(±0.33) 7.919(±0.28) 8.207(±0.40) 8.458(±0.25) 26.870(±24.90) 82.000

| OUTPUT | FORMAT | (JSON | only, | no markdown): |     |     |     |     |
| ------ | ------ | ----- | ----- | ------------- | --- | --- | --- | --- |
{
| “objects”: | [               |       |     |     |     |     |     |     |
| ---------- | --------------- | ----- | --- | --- | --- | --- | --- | --- |
| {“name”:   | “bowl 0”},      |       |     |     |     |     |     |     |
| {“name”:   | “plate large”}, |       |     |     |     |     |     |     |
| {“name”:   | “apple          | 01”}, |     |     |     |     |     |     |
| {“name”:   | “orange         | 01”}, |     |     |     |     |     |     |
| {“name”:   | “banana”},      |       |     |     |     |     |     |     |
| {“name”:   | “mug”},         |       |     |     |     |     |     |     |
| {“name”:   | “spoon”}        |       |     |     |     |     |     |     |
],
| “predicates”: | [                |     |           |           |      |            |              |      |
| ------------- | ---------------- | --- | --------- | --------- | ---- | ---------- | ------------ | ---- |
| {“type”:      | “place-on-base”, |     | “object”: | “bowl 0”, | “x”: | 0.40, “y”: | 0.15, “yaw”: | 23}, |
{“type”: “place-on-base”, “object”: “plate large”, “x”: 0.65, “y”: -0.10, “yaw”: 156},
{“type”: “place-in”, “objects”: [“apple 01”, “orange 01”], “container”: “bowl 0”},
{“type”: “place-on”, “object”: “banana”, “support”: “plate large”, “position”: “center”},
{“type”: “cluster-around”, “objects”: [“mug”, “spoon”], “anchor”: “bowl 0”, “radius”: 0.12}
]
}
| CRITICAL               | RULES:      |        |             |                     |         |           |                |     |
| ---------------------- | ----------- | ------ | ----------- | ------------------- | ------- | --------- | -------------- | --- |
| 1. Object              | names MUST  | match  | EXACTLY     | from                | catalog |           |                |     |
| 2. Containers/supports |             | MUST   | be placed   | before              | objects | go in/on  | them           |     |
| 3. Create              | INTERESTING |        | scenes with | containment,        |         | stacking, | AND clustering |     |
| 4. VARY                | yaw angles  | - real | scenes      | aren’t grid-aligned |         |           |                |     |
| 5. Return              | ONLY valid  | JSON,  | no markdown |                     |         |           |                |     |
Fig. 11: Continued System prompt for Stage I (Semantic Planning). This prompt instructs the LLM to generate physically
| plausible scene | layouts | using | structured | predicates | rather | than | raw coordinates. |     |
| --------------- | ------- | ----- | ---------- | ---------- | ------ | ---- | ---------------- | --- |
TABLE XV: Quantitative comparison across Difficulty Splits. We evaluate our method against the baseline on Easy, Medium,
and Hard splits. Our method consistently outperforms the baseline across all difficulty levels.
Method VQA(↑) Real.(↑) Func.(↑) Lay.(↑) Compl.(↑) Qual.(↑) #Obj(↑) GPTPref.(↑)
Easy([0,5]objects)
Baseline 0.458(±0.02) 6.767(±0.36) 6.269(±0.57) 6.079(±0.48) 4.737(±0.61) 5.963(±0.26) 6.467(±0.52) 33.333
Ours 0.525(±0.05) 8.331(±0.24) 8.423(±0.27) 7.636(±0.21) 7.626(±0.25) 8.004(±0.09) 12.800(±11.54) 66.667
Medium([6,15]objects)
Baseline 0.401(±0.02) 6.933(±0.37) 6.223(±0.59) 6.199(±0.41) 4.634(±0.56) 5.997(±0.22) 10.957(±2.11) 17.143
Ours 0.561(±0.02) 8.779(±0.18) 8.996(±0.23) 7.932(±0.24) 8.235(±0.29) 8.485(±0.13) 22.414(±19.15) 82.857
Hard([16,20]objects)
Baseline 0.326(±0.02) 6.808(±0.30) 6.162(±0.59) 6.099(±0.42) 4.883(±0.58) 5.988(±0.30) 34.067(±14.89) 6.667
Ours 0.553(±0.03) 9.067(±0.13) 9.271(±0.17) 8.142(±0.27) 8.659(±0.25) 8.785(±0.07) 61.733(±28.80) 93.333

SCENE REQUEST: theme from dataset
TARGET: target object count objects
TABLE SIZE: 0.7m × 1.0m = 0.70m2 (objects must fit with spacing!)
SIZE LIMITS (max 1-2 large objects, prefer smaller for 8+ items):
Large (>0.08m2): computed from catalog footprint
Avoid picking multiple large objects - they won’t all fit!
AVAILABLE OBJECTS:
CONTAINERS (can hold objects inside): filled from catalog
SUPPORTS (can stack objects on): filled from catalog
FOOD: filled from catalog
TOOLS: filled from catalog
OTHER: filled from catalog
MEDIUM SCENE STRATEGY (10-14 objects):
- Use 1-2 containers/supports as ANCHORS
- Put 2-4 objects IN containers (place-in)
- Stack 1-2 items ON supports (place-on)
- Cluster 2-3 objects near anchors (cluster-around)
- VARY yaw angles - no grid alignment!
SUGGESTED for diversity (use only if they fit the theme): preselected objects
Fig. 12: User prompt template for Stage I (medium target count). The highlighted fields are populated at runtime (theme, target
count, size warnings, catalog subsets, and diversity suggestions). Analogous strategy blocks are used for sparse (fewer than 10)
and dense (15+) targets.
PREVIOUS ATTEMPT FAILED:
feedback string produced by spatial/physical solver or grammar checks
Please fix the issues. Common fixes:
- Use MORE containment (place-in) to reduce table crowding
- Use MORE stacking (place-on) to utilize vertical space
- Use clustering (cluster-around) instead of individual placements
- Select SMALLER objects if collisions persist
Fig. 13: Feedback block appended to the user prompt when spatial solving, physical placement, grammar checks, or intersection
validation fails. The highlighted region is the dynamic diagnostic message.

TABLE XVI: Per-Scene Quantitative Analysis. We report the performance breakdown across 10 distinct scene themes. Our
method demonstrates robust generalization, outperforming the baseline in nearly all metrics across diverse environments.
Theme Method VQA(↑) Real.(↑) Func.(↑) Lay.(↑) Compl.(↑) Qual.(↑) #Obj(↑) GPTPref.(↑)
Baseline 0.405(±0.02) 6.901(±0.37) 6.196(±0.73) 6.260(±0.26) 4.805(±0.56) 6.041(±0.19) 15.00(±0.00) 10.00
BathroomCounter Ours 0.564(±0.02) 8.913(±0.16) 9.159(±0.22) 7.967(±0.28) 8.276(±0.33) 8.579(±0.15) 28.50(±18.47) 90.00
Baseline 0.401(±0.02) 6.881(±0.31) 6.458(±0.50) 5.931(±0.41) 5.018(±0.55) 6.072(±0.17) 10.40(±1.26) 50.00
ClassroomSupplies
Ours 0.562(±0.02) 8.790(±0.18) 8.990(±0.18) 7.842(±0.28) 8.406(±0.26) 8.507(±0.12) 32.90(±23.70) 50.00
Baseline 0.399(±0.02) 7.062(±0.49) 6.385(±0.56) 6.171(±0.39) 4.590(±0.60) 6.052(±0.24) 9.70(±0.48) 10.00
CraftStation
Ours 0.560(±0.03) 8.761(±0.19) 9.045(±0.28) 7.938(±0.22) 8.179(±0.33) 8.481(±0.06) 17.70(±13.61) 90.00
Baseline 0.410(±0.01) 7.032(±0.34) 6.308(±0.63) 6.246(±0.47) 4.432(±0.62) 6.005(±0.26) 9.00(±0.47) 0.00
GarageWorkstation
Ours 0.566(±0.02) 8.796(±0.21) 9.004(±0.20) 7.881(±0.28) 8.207(±0.29) 8.472(±0.13) 13.00(±11.68) 100.00
GardenTools Baseline 0.400(±0.02) 7.018(±0.45) 6.155(±0.53) 6.315(±0.47) 4.489(±0.53) 5.994(±0.21) 10.30(±0.95) 30.00
Ours 0.561(±0.02) 8.778(±0.16) 8.949(±0.15) 7.950(±0.20) 8.175(±0.27) 8.463(±0.12) 13.80(±11.36) 70.00
Baseline 0.327(±0.02) 6.862(±0.31) 6.281(±0.61) 6.008(±0.39) 5.069(±0.48) 6.055(±0.26) 37.38(±19.66) 12.50
KitchenCabinet Ours 0.554(±0.03) 9.052(±0.13) 9.313(±0.17) 8.070(±0.25) 8.710(±0.25) 8.786(±0.06) 48.88(±25.63) 87.50
Baseline 0.396(±0.01) 6.795(±0.24) 6.327(±0.63) 6.269(±0.34) 4.536(±0.47) 5.982(±0.21) 12.30(±1.70) 0.00
LaundrySorting
Ours 0.558(±0.03) 8.742(±0.17) 8.975(±0.26) 8.021(±0.16) 8.202(±0.28) 8.485(±0.12) 35.30(±27.34) 100.00
Baseline 0.457(±0.02) 6.747(±0.36) 6.183(±0.25) 6.101(±0.52) 4.697(±0.59) 5.932(±0.25) 7.00(±0.00) 57.14
OfficeDesk
Ours 0.499(±0.05) 8.296(±0.22) 8.535(±0.16) 7.524(±0.16) 7.609(±0.32) 7.991(±0.08) 17.57(±16.03) 42.86
Baseline 0.324(±0.02) 6.747(±0.29) 6.027(±0.58) 6.203(±0.45) 4.670(±0.64) 5.912(±0.35) 30.29(±5.91) 0.00
StorageRoom
Ours 0.552(±0.02) 9.085(±0.14) 9.224(±0.17) 8.224(±0.28) 8.601(±0.24) 8.783(±0.08) 76.43(±26.40) 100.00
TeaTime Baseline 0.458(±0.02) 6.784(±0.39) 6.345(±0.77) 6.061(±0.48) 4.773(±0.67) 5.991(±0.29) 6.00(±0.00) 12.50
Ours 0.547(±0.03) 8.361(±0.26) 8.325(±0.31) 7.735(±0.21) 7.642(±0.18) 8.016(±0.10) 8.63(±1.85) 87.50
Baseline 0.394(±0.02) 6.838(±0.35) 5.733(±0.38) 6.199(±0.47) 4.564(±0.52) 5.833(±0.22) 10.00(±0.47) 20.00
WorkshopBench Ours 0.556(±0.03) 8.675(±0.10) 8.846(±0.22) 7.928(±0.26) 8.200(±0.30) 8.412(±0.16) 15.70(±10.36) 80.00
TABLEXVII:LLM-judgedqualitymetricsfor812automaticallygeneratedmanipulationtasksacross59scenesand7competency
axes.
|     |     | LLMJudge |     | Coverage |
| --- | --- | -------- | --- | -------- |
Category N Alignment Clarity Feasibility Match Aligned% Partial% Object Predicate
| color 116       | 0.81 0.94 | 0.80 0.90 | 57 40 | 0.88 0.29 |
| --------------- | --------- | --------- | ----- | --------- |
| conjunction 116 | 0.97 0.98 | 1.00 0.98 | 91 9  | 0.88 0.29 |
| counting 116    | 0.87 0.97 | 0.90 0.92 | 60 38 | 0.88 0.29 |
| recognition 116 | 0.96 0.97 | 0.96 0.97 | 85 15 | 0.88 0.29 |
| semantics 116   | 0.89 0.95 | 0.94 0.94 | 72 27 | 0.88 0.29 |
| sorting 116     | 0.94 0.95 | 0.97 0.96 | 86 14 | 0.88 0.29 |
| spatial 116     | 0.92 0.98 | 0.89 0.95 | 80 17 | 0.88 0.29 |
| Overall 812     | 0.91 0.96 | 0.92 0.95 | 76 23 | 0.88 0.29 |
