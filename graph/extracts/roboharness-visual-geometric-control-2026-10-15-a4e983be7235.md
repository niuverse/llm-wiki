##### Report GitHub Issue

×

Title:

Content selection saved. Describe the issue below:

Description:

Submit without GitHub
Submit in GitHub

![](/static/base/1.0.1/images/icons/smileybones-small.svg)
arXiv is now an independent nonprofit!
[Learn more](https://info.arxiv.org/about)
×

[![arXiv logo](/static/base/1.0.1/images/arxiv-logo-primary-light.svg)
Back to arXiv](/)

[Why HTML?](https://info.arxiv.org/about/accessible_HTML.html)
Report Issue

[Back to Abstract](/abs/2610.14018v1 "Back to abstract page")

[Download PDF](/pdf/2610.14018v1 "Download PDF")

1. [Abstract](#abstract1 "In RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
2. [1 Introduction](#S1 "In RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
3. [2 Related Work](#S2 "In RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
   1. [2.1 Vision-Language-Action Models](#S2.SS1 "In 2 Related Work ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      1. [Autoregressive action tokens.](#S2.SS1.SSS0.Px1 "In 2.1 Vision-Language-Action Models ‣ 2 Related Work ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      2. [Continuous action experts.](#S2.SS1.SSS0.Px2 "In 2.1 Vision-Language-Action Models ‣ 2 Related Work ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
   2. [2.2 LLMs as Robot Planners and Programmers](#S2.SS2 "In 2 Related Work ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      1. [Skill and module orchestration.](#S2.SS2.SSS0.Px1 "In 2.2 LLMs as Robot Planners and Programmers ‣ 2 Related Work ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      2. [Program synthesis and skill discovery.](#S2.SS2.SSS0.Px2 "In 2.2 LLMs as Robot Planners and Programmers ‣ 2 Related Work ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
   3. [2.3 Spatial Representations for Manipulation](#S2.SS3 "In 2 Related Work ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      1. [Visual points and motion proposals.](#S2.SS3.SSS0.Px1 "In 2.3 Spatial Representations for Manipulation ‣ 2 Related Work ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
4. [3 Method](#S3 "In RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
   1. [3.1 Geometry State for Spatial Grounding](#S3.SS1 "In 3 Method ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      1. [3.1.1 Robot coordination definition](#S3.SS1.SSS1 "In 3.1 Geometry State for Spatial Grounding ‣ 3 Method ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      2. [3.1.2 Track keypoints](#S3.SS1.SSS2 "In 3.1 Geometry State for Spatial Grounding ‣ 3 Method ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
   2. [3.2 Action Toolset](#S3.SS2 "In 3 Method ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      1. [3.2.1 Keypoint-constraint tools for manipulation](#S3.SS2.SSS1 "In 3.2 Action Toolset ‣ 3 Method ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      2. [3.2.2 Adjustment tools](#S3.SS2.SSS2 "In 3.2 Action Toolset ‣ 3 Method ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
5. [4 Proof: Completeness of the Keypoint-Constraint Representation](#S4 "In RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
   1. [4.1 Any Grasp Pose Can Be Expressed by Keypoint Constraints](#S4.SS1 "In 4 Proof: Completeness of the Keypoint-Constraint Representation ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      1. [Definition:](#S4.SS1.SSS0.Px1 "In 4.1 Any Grasp Pose Can Be Expressed by Keypoint Constraints ‣ 4 Proof: Completeness of the Keypoint-Constraint Representation ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
   2. [4.2 Any Relationship Between In-Hand and Off-hand Object Can Be Expressed by Keypoint Constraints](#S4.SS2 "In 4 Proof: Completeness of the Keypoint-Constraint Representation ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
6. [5 Experiments](#S5 "In RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
   1. [5.1 RoboHarness can outperform VLA and WAM across tasks](#S5.SS1 "In 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      1. [BEHAVIOR 2025: Long-horizon household tasks.](#S5.SS1.SSS0.Px1 "In 5.1 RoboHarness can outperform VLA and WAM across tasks ‣ 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
   2. [5.2 Does the RoboHarness Generalize across Objects?](#S5.SS2 "In 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      1. [Objects.](#S5.SS2.SSS0.Px1 "In 5.2 Does the RoboHarness Generalize across Objects? ‣ 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      2. [Tasks.](#S5.SS2.SSS0.Px2 "In 5.2 Does the RoboHarness Generalize across Objects? ‣ 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      3. [Analysis and results.](#S5.SS2.SSS0.Px3 "In 5.2 Does the RoboHarness Generalize across Objects? ‣ 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      4. [Generalization is not positively correlated with the amount of robot data.](#S5.SS2.SSS0.Px4 "In 5.2 Does the RoboHarness Generalize across Objects? ‣ 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
      5. [Multimodal capabilities matter more than model parameter count.](#S5.SS2.SSS0.Px5 "In 5.2 Does the RoboHarness Generalize across Objects? ‣ 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
7. [6 Limitation & Discussion](#S6 "In RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
8. [References](#bib "In RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
9. [A BEHAVIOR Five-Instance Scores](#A1 "In RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
10. [B Full Embodied Skill Catalog](#A2 "In RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
11. [C Evaluation Setting and Robot-Data Hours](#A3 "In RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    1. [Test.](#A3.SS0.SSS0.Px1 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    2. [Qwen3.8-27B.](#A3.SS0.SSS0.Px2 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    3. [Qwen3.8-Flash.](#A3.SS0.SSS0.Px3 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    4. [GPT-6-luna.](#A3.SS0.SSS0.Px4 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    5. [π0.5\pi\_{0.5}.](#A3.SS0.SSS0.Px5 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    6. [Faster-WAM.](#A3.SS0.SSS0.Px6 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    7. [Galaxea G0.5.](#A3.SS0.SSS0.Px7 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    8. [OpenWAM-α\alpha.](#A3.SS0.SSS0.Px8 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    9. [LingBot-VA.](#A3.SS0.SSS0.Px9 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    10. [OpenVLA-OFT.](#A3.SS0.SSS0.Px10 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    11. [ABot-M0.](#A3.SS0.SSS0.Px11 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    12. [Xiaomi-Robotics-0.](#A3.SS0.SSS0.Px12 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    13. [X-VLA.](#A3.SS0.SSS0.Px13 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
    14. [ASPIRE pick function.](#A3.SS0.SSS0.Px14 "In Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")
12. [D Per-Object Outcomes](#A4 "In RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")

[License: arXiv.org perpetual non-exclusive license](https://info.arxiv.org/help/license/index.html#licenses-available)

arXiv:2610.14018v1 [cs.RO] 29 Sep 2026

# RoboHarness: A Simple Harness Outperforms VLA and World Actions Models

[Bince Qu](https://openreview.net/profile?id=~Bince_Qu1) [Wei Chen](https://openreview.net/profile?id=~Wei_Chen34) [Bo Zhang](https://openreview.net/profile?id=~Bo_Zhang9)
Affiliation: Zhejiang University

###### Abstract

The rise of large language models (LLMs) has opened a path toward generalist embodied AI, raising the question of how LLMs can act in the physical world. One straightforward approach is training the model to generate actions: collect robot-action data and video demonstration, refine LLM architecture with an action head, and train a vision-language-action (VLA) model at scale.
However, we argue that coding agents have the potential to realize generalist embodied manipulation. All they need is a simple yet effective robot harness. We present R​o​b​o​H​a​r​n​e​s​sRoboHarness: a robotic harness that gives LLM agents a visual-geometric control panel so that they can directly understand and invoke embodied tasks. With RoboHarness, Qwen3.8-Flash-Next ([Qwen Team, 2026](#bib.bib34)) outperforms state-of-the-art VLA models on BEHAVIOR Challenge 2025 tasks ([Li et al., 2024](#bib.bib22)). The implementation will be released as open source.

|  |
| --- |
|  |

![Refer to caption](2610.14018v1/overview.png)

Figure 1: RoboHarness overview: visual keypoints are tracked persistently, converted into geometric constraints, executed, and verified in a closed loop.

## 1 Introduction

The emergence of large language models (LLMs) opened a path towards generalist robot manipulation. The community has explored many ways to make use of LLM for planning, visual understanding, physical reasoning, and spatial reasoning to achieve generalizable robot manipulation. Yet an LLM’s world knowledge lives in a textual space. A bridge between the LLM and the physical world is therefore required:

One straightforward approach is training the model to generate actions. VLA models try to make the model output end-effector actions directly. Actions may be encoded into the vocabulary for autoregressive generation, as in RT-2, OpenVLA, and FAST ([Brohan et al., 2023](#bib.bib6); [Kim et al., 2025b](#bib.bib20); [Pertsch et al., 2025](#bib.bib32)), or grouped into flow-matching chunks, which are later produced by an action head appended to the LLM ([Black et al., 2025b](#bib.bib5); [Bjorck et al., 2025](#bib.bib3)). This representation can express arbitrary robot actions, but it requires substantial robot-action data and additional post-training. Such data are difficult to collect and scale to the diversity of real-world objects, scenes, and tasks. This difficulty has motivated world-action models (WAMs), which seek to improve generalization by learning action-conditioned models of how the world changes ([Zhao et al., 2026](#bib.bib45); [Wang et al., 2026](#bib.bib38); [Li et al., 2026](#bib.bib23)).

We take a different view. An LLM already has strong capabilities for task decomposition, planning, spatial reasoning, and tool use. The main challenge is therefore not to train the LLM to generate a larger set of actions, but to provide a simple and sufficiently complete interface that connects these capabilities to the physical world.

Existing work provides evidence for this view: Packaging embodied subtasks, such as picking, placing, and navigation, as callable functions allows an LLM to compose them into longer procedures ([Liang et al., 2023](#bib.bib25)). ASPIRE shows that an LLM agent can refine such programs and accumulate the repairs in a skill library ([Lu et al., 2026](#bib.bib28)). However, the available functions are not complete: their coverage is determined by predefined tasks, objects, and policies. Every new object or task may require another function, leaving the LLM confined to a predefined action space. This suggests that the main limitation lies in the action interface rather than in the LLM’s ability.

In this paper, we propose RoboHarness. Without training models, RoboHarness combines visual clicks, keypoint tracking, and geometric constraints to provide an embodied control panel for an LLM agent. Concretely, our contributions are:

1. An expressive, LLM-friendly robot harness that provides an embodied control panel for an LLM agent.
2. A new paradigm for embodied AI. We show that a generalist LLM, equipped with the right tool harness can outperform VLA and World Action Models

With RoboHarness, the open-source model Qwen3.8-Flash-Next can directly solve long-horizon household tasks in BEHAVIOR-1K ([Li et al., 2024](#bib.bib22)) without any finetune, outperforming state-of-the-art models. It also substantially outperforms VLA and WAM baselines on fully out-of-distribution generalization tests.

## 2 Related Work

Prior work connects pretrained language and vision-language models to manipulation through learned action generation, executable programs, or spatial representations. These approaches differ in where they place the boundary between model reasoning and robot control.

### 2.1 Vision-Language-Action Models

##### Autoregressive action tokens.

RT-2 and OpenVLA adapt pretrained VLMs to predict discretized robot actions through next-token prediction ([Brohan et al., 2023](#bib.bib6); [Kim et al., 2025b](#bib.bib20)). FAST improves this approach by compressing action chunks with a frequency-domain tokenizer, making autoregressive learning more effective for high-frequency control ([Pertsch et al., 2025](#bib.bib32)). Galaxea G0.5 further integrates reasoning and action tokens into one autoregressive stream, combining task decomposition, visual grounding, and motor commands within a shared model ([Liu et al., 2026](#bib.bib27)).

##### Continuous action experts.

Another family couples a pretrained VLM with a specialized module for generating continuous action sequences. Representative examples include the flow-matching action expert in π0\pi\_{0} and the diffusion transformer in GR00T N1 ([Black et al., 2025b](#bib.bib5); [Bjorck et al., 2025](#bib.bib3)). More recent models, such as π0.7\pi\_{0.7}, condition action generation on richer task context, including subtask instructions, subgoal images, and episode metadata, to improve steerability ([Physical Intelligence, 2026](#bib.bib33)). These approaches learn a broad motor action space, but require robot-action supervision and additional training. Preserving pretrained knowledge is also a training-design concern: knowledge insulation mitigates interference by blocking action-expert gradients from entering the VLM backbone ([Driess et al., 2025](#bib.bib10)). RoboHarness connects an unchanged LLM to robot control through a geometric tool interface, avoiding this additional model-training stage.

### 2.2 LLMs as Robot Planners and Programmers

##### Skill and module orchestration.

SayCan grounds language-level skill selection in learned affordance values, while Inner Monologue incorporates environmental feedback into replanning ([Ahn et al., 2023](#bib.bib1); [Huang et al., 2023b](#bib.bib15)). HarnessVLA combines a frozen VLA for contact-rich manipulation with analytic primitives, using execution memory to guide retries and recovery ([Zhang et al., 2026](#bib.bib44)).

##### Program synthesis and skill discovery.

Code as Policies extends composition to generated control programs, including feedback loops and waypoint-level commands ([Liang et al., 2023](#bib.bib25)). CaP-X systematically varies the abstraction level of robot APIs and finds that performance degrades as human-designed abstractions are removed; execution feedback and skill discovery help agents work with lower-level interfaces ([Fu et al., 2026](#bib.bib12)). ASPIRE compounds program repairs into a growing skill library ([Lu et al., 2026](#bib.bib28)).

### 2.3 Spatial Representations for Manipulation

##### Visual points and motion proposals.

RoboPoint learns to predict image-space affordance points from synthetic supervision ([Yuan et al., 2025](#bib.bib43)). PIVOT iteratively selects among visual action proposals with a frozen VLM, and MOKA selects marked keypoints and waypoints ([Nasiriany et al., 2024](#bib.bib29); [Fang et al., 2024](#bib.bib11)). HAMSTER predicts a two-dimensional end-effector path and passes it to a separate low-level policy ([Li et al., 2025](#bib.bib24)). VoxPoser grounds language in composable three-dimensional value maps and uses model-based planning to generate six-degree-of-freedom end-effector trajectories ([Huang et al., 2023a](#bib.bib14)). Constraint-based approaches express the required geometry more explicitly. CoPa grounds object parts in the observed scene and solves geometric constraints over those parts ([Huang et al., 2024](#bib.bib13)). OmniManip represents interaction points and directions in an object’s canonical space and tracks the resulting six-dimensional poses ([Pan et al., 2025](#bib.bib31)). ReKep synthesizes relational constraints over three-dimensional keypoints as Python functions and optimizes subgoals and paths in a closed perception–action loop ([Huang et al., 2025](#bib.bib16)). These works establish that grounded geometric relations can support orientation-aware, multi-stage manipulation without task-specific VLM training.

## 3 Method

Lessons from coding agents show that: a minimal set of simple, orthogonal primitive tools outperforms a collection of predefined features and heavy scaffolding. Inspired by this principle, we argue that an LLM’s potential on embodied tasks is best unlocked by giving it the minimal primitive action tools rather than layers of engineered features.

We start from studying spatial relations between a gripper and objects it interacts with, therefore constructing the most elementary primitive action tools. We further prove their completeness in Section [4](#S4 "4 Proof: Completeness of the Keypoint-Constraint Representation ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models"): (i)  any contact pose between a gripper and an object can be expressed by geometric constraints, and (ii) once the gripper holds an object, any spatial relationship between the in-hand object and a target object can be expressed by geometric constraints.

With the primitive action tools in place, the remaining challenge is spatial understanding: although VLMs cannot reliably reason about 3D spatial relations, their grounding training enables them to localize specific points on objects with reasonable accuracy. We therefore use spatial grounding as the bridge between vision-language models and robots. The LLM marks points of interest on a 2D image and continuously receives their positions via optical-flow tracking and depth back-projection; with this information, it composes accurate primitive actions to perform complex manipulation.

Following this design, we build a simple but effective Robot Harness, which we will release as open source to the community.

### 3.1 Geometry State for Spatial Grounding

To make primitive action tools more usable to the LLM, we design a persistent geometry-state tracking mechanism that continuously returns the coordinates of objects of interest to the LLM, enhancing its accurate spacial perception capabilities.

#### 3.1.1 Robot coordination definition

We first define a unified camera-frame coordination for diverse robot configurations, making it straightforward for the LLM to read spatial relations:

| Axis | Positive direction |
| --- | --- |
| xx | forward from camera view |
| yy | left from camera view |
| zz | upward from camera view |

![Refer to caption](2610.14018v1/figures/r1pro_dual_x5_xyz_pair.png)

Figure 2: Visualization of the unified coordinate frame on two embodiments: BEHAVIOR R1 Pro ([Li et al., 2024](#bib.bib22)) (left) and RoboDojo ARX X5 ([Chen et al., 2026](#bib.bib9)) (right).

#### 3.1.2 Track keypoints

With a unified coordinate frame in place, we design the track\_object tool for LLM to retrieve coordinates of points in which it is interested using no simulation priors the procedure and proceeds as follows:

1. 1.

   The LLM selects one or more points of interest that are visible in the head camera.
2. 2.

   Harness continuously tracks each marked point across successive head-camera frames.
3. 3.

   The latest 2D location is projected onto the depth view to recover the metric distance.
4. 4.

   The pixel coordinate and depth are then back-projected into the robot camera frame.

![Refer to caption](2610.14018v1/track.png)

Figure 3: Pipeline of the track\_object tool: optical-flow keypoint tracking followed by depth back-projection into the robot coordinate frame.

### 3.2 Action Toolset

Our goal is to design a minimal action toolset.

Therefore, we start from object-interaction relations and build the toolset bottom-up.

A manipulation task can be viewed as a two-stage process: first the gripper establishes a spatial relationship with an object, and then an end-effector action drives this object to satisfy a geometric relationship with another object. For instance, in an insert-key task, the gripper first grasps the key, then moves it until it satisfies the insertion constraint with the lock. Consequently, our action toolset only needs to capture these two stages.

We implement the first stage with keypoint-and-constraint tools: the LLM selects points on the image and specifies the geometric constraints they must satisfy; the harness automatically solves and executes the corresponding actions. To support model fine-tuning, we additionally provide adjustment tools that directly command the robot’s low-level degrees of freedom.

In the next section, we will prove that, for any object, any grasp pose can be expressed by two keypoint constraints when the object has not yet been grasped; and when it has already been grasped, assuming the gripper forms a rigid connection with the object, the desired spatial relation between this held object and any other object in the scene can be expressed by two sets of keypoint constraints. Therefore, our action toolset is both minimal and complete.

#### 3.2.1 Keypoint-constraint tools for manipulation

The model supplies a set of input points together with their spatial relations, and the harness automatically solves and executes the corresponding action. The model must distinguish between on-hand and off-hand points: on-hand points lie on the gripper or on a held object and their positions can be modified, whereas off-hand points are fixed in the scene. The harness drives the on-hand points so that they satisfy the spatial constraints specified by the model through the following pipeline:

1. 1.

   Sample action candidates and select those satisfying the constraints.
2. 2.

   Discard candidates whose inverse kinematics are infeasible or unreachable.
3. 3.

   Plan a motion trajectory from the current pose to the target pose.
4. 4.

   Execute the trajectory.

In principle, the model can express any constraint through coordinate relations among the input points. However, expressions such as collinearity and coplanarity are both verbose to write and frequently required, so we encapsulate the most common patterns as quick requests; their specific modes are listed in Table [1](#S3.T1 "Table 1 ‣ 3.2.1 Keypoint-constraint tools for manipulation ‣ 3.2 Action Toolset ‣ 3 Method ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models").

Table 1: Modes for keypoint-constraints tool

|  |  |  |
| --- | --- | --- |
| Mode | Input points | Description |
| coordinate | arbitrary | move points to satisfy the given coordinate constraints |

| Quick-requests | On-hand | Off-hand | Description |
| --- | --- | --- | --- |
| touch | 11 | 11 | an on-hand point coincides with an off-hand point |
| linear | 22 | 1​or​ 21\ \text{or}\ 2 | two on-hand points collinear with off-hand points |
| line-vertical-plane | 22 | 33 | an on-hand line is orthogonal to an off-hand plane |
| plane-parallel | 33 | 33 | on-hand plane parallel to off-hand plane |
| line-vertical-ground | 22 | 00 | on-hand line vertical to the ground |
| face to | 33 | 00 | face the target surface |
| move to reach | 00 | 11 | move chassis to make target reachable |
| grasp | 00 | 11 | move chassis to make target reachable |

#### 3.2.2 Adjustment tools

To refine robot action or to improve robustness when the constraints fail (for example, when the object slips out of the gripper), we also expose direct low-level robot control interfaces. These interfaces share the same coordinate frame defined in Section [3.1.1](#S3.SS1.SSS1 "3.1.1 Robot coordination definition ‣ 3.1 Geometry State for Spatial Grounding ‣ 3 Method ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models"), so that the LLM can interpret and use them consistently.

Table 2: Adjustment tools. Displacements are incremental; chassis spin is a yaw increment.

| Name | Parameters | Meaning |
| --- | --- | --- |
| adjust left eef pose | (Δ​x,Δ​y,Δ​z,r,p,y)(\Delta x,\Delta y,\Delta z,r,p,y) | increment the left end-effector pose or rotation |
| adjust right eef pose | (Δ​x,Δ​y,Δ​z,r,p,y)(\Delta x,\Delta y,\Delta z,r,p,y) | increment the right end-effector pose or rotation |
| adjust chassis | (fwd,side,spin)(\mathrm{fwd},\,\mathrm{side},\,\mathrm{spin}) | move the chassis forward, sideways or spin |
| adjust height | Δ​h\Delta h | raise or lower the body |
| adjust pitch | Δ​θ\Delta\theta | change the body pitch |

## 4 Proof: Completeness of the Keypoint-Constraint Representation

The three points on the robot gripper, namely the left fingertip, right fingertip, and gripper center, are intrinsic points that remain tracked throughout execution (Figure [4.1](#S4.SS1 "4.1 Any Grasp Pose Can Be Expressed by Keypoint Constraints ‣ 4 Proof: Completeness of the Keypoint-Constraint Representation ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")). The following results show that constraining their geometric relationships can represent arbitrary motion trajectories and interaction poses. The elementary correspondence between a contact pose and a keypoint triple is given in Section [4.1](#S4.SS1 "4.1 Any Grasp Pose Can Be Expressed by Keypoint Constraints ‣ 4 Proof: Completeness of the Keypoint-Constraint Representation ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models").

### 4.1 Any Grasp Pose Can Be Expressed by Keypoint Constraints

##### Definition:

The gripper carries three predefined points {FL,FR,G}\{F\_{L},F\_{R},G\}: the left fingertip, the right fingertip, and the slider center. A contact pose is (fl,fr,θ)(f\_{l},f\_{r},\theta) with fl,fr∈∂Af\_{l},f\_{r}\in\partial A. We prove that (fl,fr,θ)(f\_{l},f\_{r},\theta) is in analytic bijection with three surface points (a1,a2,a3)(a\_{1},a\_{2},a\_{3}) under the constraints overlap⁡[a1,FL]\mathrm{overlap}[a\_{1},F\_{L}], overlap⁡[a2,FR]\mathrm{overlap}[a\_{2},F\_{R}], and linear⁡[c,a3,G]\mathrm{linear}[c,a\_{3},G], where c=a1+a22c=\frac{a\_{1}+a\_{2}}{2}.

###### Proposition 1.

The gripper carries predefined points {FL,FR,G}\{F\_{L},F\_{R},G\} and a contact pose is (fl,fr,θ)(f\_{l},f\_{r},\theta) with fl,fr∈∂Af\_{l},f\_{r}\in\partial A. We prove an analytic bijection to three surface points (a1,a2,a3)(a\_{1},a\_{2},a\_{3}) under overlap⁡[a1,FL]\mathrm{overlap}[a\_{1},F\_{L}], overlap⁡[a2,FR]\mathrm{overlap}[a\_{2},F\_{R}], and linear⁡[c,a3,G]\mathrm{linear}[c,a\_{3},G], where c=a1+a22c=\tfrac{a\_{1}+a\_{2}}{2}.

![Refer to caption](2610.14018v1/proof_1.png)

Figure 4: Three predefined gripper points {FL,FR,G}\{F\_{L},F\_{R},G\} and a contact pose (fl,fr,θ)(f\_{l},f\_{r},\theta).

###### Proof.

(i) (fl,fr,θ)↦(a1,a2,a3)(f\_{l},f\_{r},\theta)\mapsto(a\_{1},a\_{2},a\_{3}). From the two overlap constraints, a1=fla\_{1}=f\_{l} and a2=fra\_{2}=f\_{r}. From linear\mathrm{linear}, a3a\_{3} satisfies

|  |  |  |  |
| --- | --- | --- | --- |
|  | a3=c+k⁡(p⁡(G)−c),a3∈∂A,k>0.a\_{3}=c+k\bigl(p(G)-c\bigr),\qquad a\_{3}\in\partial A,\ k>0. |  | (1) |

Hence (a1,a2,a3)(a\_{1},a\_{2},a\_{3}) is uniquely determined.

(ii) (a1,a2,a3)↦(fl,fr,θ)(a\_{1},a\_{2},a\_{3})\mapsto(f\_{l},f\_{r},\theta). From overlap, fl=a1f\_{l}=a\_{1} and fr=a2f\_{r}=a\_{2}. Let u:=(a2−a1)/‖a2−a1‖u:=(a\_{2}-a\_{1})/\|a\_{2}-a\_{1}\|, fix a right-handed orthonormal basis (𝐯1,𝐯2)(\mathbf{v}\_{1},\mathbf{v}\_{2}) of u⟂u^{\perp}, and set h:=‖p⁡(G)−c‖h:=\|p(G)-c\|. Then

|  |  |  |  |
| --- | --- | --- | --- |
|  | p⁡(G,θ)=c+h⁡(𝐯1​cos⁡θ+𝐯2​sin⁡θ),h⁡(𝐯1​cos⁡θ+𝐯2​sin⁡θ)×(a3−c)=𝟎.p(G,\theta)=c+h\bigl(\mathbf{v}\_{1}\cos\theta+\mathbf{v}\_{2}\sin\theta\bigr),\qquad h\bigl(\mathbf{v}\_{1}\cos\theta+\mathbf{v}\_{2}\sin\theta\bigr)\times(a\_{3}-c)=\mathbf{0}. |  | (2) |

Since (a3−c)⟂(a1−a2)(a\_{3}-c)\perp(a\_{1}-a\_{2}), the cross-product condition yields a unique θ\theta:

|  |  |  |  |
| --- | --- | --- | --- |
|  | tan⁡θ=(a3−c)⋅𝐯2(a3−c)⋅𝐯1.\tan\theta=\frac{(a\_{3}-c)\cdot\mathbf{v}\_{2}}{(a\_{3}-c)\cdot\mathbf{v}\_{1}}. |  | (3) |

The two maps are mutual inverses, so (a1,a2,a3)(a\_{1},a\_{2},a\_{3}) and (fl,fr,θ)(f\_{l},f\_{r},\theta) are in analytic bijection.∎

∎

### 4.2 Any Relationship Between In-Hand and Off-hand Object Can Be Expressed by Keypoint Constraints

###### Proposition 2.

For any prescribed relative coordinate transform Ttrue∈S​E​(3)T\_{\mathrm{true}}\in SE(3) between two rigid objects, there exist two non-parallel spatial line-coincidence constraints such that any unknown T∈S​E​(3)T\in SE(3) satisfying the resulting system is uniquely determined, and the solution is TtrueT\_{\mathrm{true}}.

###### Proof.

Existence. Place the objects at TtrueT\_{\mathrm{true}}. In the global frame pick two non-parallel lines ℓ1,ℓ2\ell\_{1},\ell\_{2}, with body-AA parameters LA​1,LA​2L\_{A1},L\_{A2} and body-BB parameters LB​1,LB​2L\_{B1},L\_{B2}. Rigid kinematics gives

Ttrue​(LB​1)=LA​1,Ttrue​(LB​2)=LA​2.T\_{\mathrm{true}}(L\_{B1})=L\_{A1},\qquad T\_{\mathrm{true}}(L\_{B2})=L\_{A2}.

(4)
Hence such a pair of characteristic line correspondences exists.
![[Uncaptioned image]](2610.14018v1/proof_2.png)
Figure 5: Two non-parallel line coincidences fix a unique T∈S​E​(3)T\in SE(3).

Reduction. Let T∈S​E​(3)T\in SE(3) satisfy the same two coincidences. Align local frames so that the ZZ axis of AA coincides with LA​1L\_{A1} and the ZZ axis of BB with LB​1L\_{B1}. Then T⁡(LB​1)=LA​1T(L\_{B1})=L\_{A1} forces TT to preserve the ZZ axis, so TT retains two degrees of freedom: a rotation θ\theta about ZZ and a translation dd along ZZ. For 𝐩=(x,y,z)⊤\mathbf{p}=(x,y,z)^{\top} on BB, the image 𝐩′=(x′,y′,z′)⊤\mathbf{p}^{\prime}=(x^{\prime},y^{\prime},z^{\prime})^{\top} is x′=x​cos⁡θ−y​sin⁡θ,y′=x​sin⁡θ+y​cos⁡θ,z′=z+dx^{\prime}=x\cos\theta-y\sin\theta,\ y^{\prime}=x\sin\theta+y\cos\theta,\ z^{\prime}=z+d,

|  |  |  |  |
| --- | --- | --- | --- |
|  | x′=x​cos⁡θ−y​sin⁡θ,y′=x​sin⁡θ+y​cos⁡θ,z′=z+d.x^{\prime}=x\cos\theta-y\sin\theta,\quad y^{\prime}=x\sin\theta+y\cos\theta,\quad z^{\prime}=z+d. |  | (5) |

Unique θ\theta. The second constraint is T⁡(LB​2)=LA​2T(L\_{B2})=L\_{A2}. Non-parallelism implies LB​2∦ZL\_{B2}\nparallel Z. Let 𝐯x​y=(vx,vy)⊤≠𝟎\mathbf{v}\_{xy}=(v\_{x},v\_{y})^{\top}\neq\mathbf{0} be the X​YXY projection of the direction of LB​2L\_{B2}, and 𝐮x​y=(ux,uy)⊤\mathbf{u}\_{xy}=(u\_{x},u\_{y})^{\top} that of LA​2L\_{A2}. Rotation about ZZ preserves the projected length, ‖𝐯x​y‖=‖𝐮x​y‖\|\mathbf{v}\_{xy}\|=\|\mathbf{u}\_{xy}\|, and

|  |  |  |  |
| --- | --- | --- | --- |
|  | (cos⁡θ−sin⁡θsin⁡θcos⁡θ)​(vxvy)=(uxuy).\begin{pmatrix}\cos\theta&-\sin\theta\\ \sin\theta&\cos\theta\end{pmatrix}\begin{pmatrix}v\_{x}\\ v\_{y}\end{pmatrix}=\begin{pmatrix}u\_{x}\\ u\_{y}\end{pmatrix}. |  | (6) |

The determinant is nonzero, so this system has a unique real solution θ∈[0,2​π)\theta\in[0,2\pi).

Unique dd. Pick a known point 𝐩0=(x0,y0,z0)⊤\mathbf{p}\_{0}=(x\_{0},y\_{0},z\_{0})^{\top} on LB​2L\_{B2}. Substituting x0,y0x\_{0},y\_{0} and the solved θ\theta into ([5](#S4.E5 "In Proof. ‣ 4.2 Any Relationship Between In-Hand and Off-hand Object Can Be Expressed by Keypoint Constraints ‣ 4 Proof: Completeness of the Keypoint-Constraint Representation ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")) yields constants x0′,y0′x^{\prime}\_{0},y^{\prime}\_{0}. The image of 𝐩0\mathbf{p}\_{0} lies on LA​2L\_{A2}, and LA​2∦ZL\_{A2}\nparallel Z, so (x0′,y0′)(x^{\prime}\_{0},y^{\prime}\_{0}) determines a unique height ZtargetZ\_{\mathrm{target}} on LA​2L\_{A2}. The third identity in ([5](#S4.E5 "In Proof. ‣ 4.2 Any Relationship Between In-Hand and Off-hand Object Can Be Expressed by Keypoint Constraints ‣ 4 Proof: Completeness of the Keypoint-Constraint Representation ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models")) gives z0+d=Ztargetz\_{0}+d=Z\_{\mathrm{target}}, hence d=Ztarget−z0d=Z\_{\mathrm{target}}-z\_{0}.

Thus TT is uniquely solved and equals TtrueT\_{\mathrm{true}}.
∎

## 5 Experiments

### 5.1 RoboHarness can outperform VLA and WAM across tasks

##### BEHAVIOR 2025: Long-horizon household tasks.

We compare against state-of-the-art VLAs such as Galaxea G0.5 and π0.5\pi\_{0.5}, evaluating both success rate and subgoal completion rate ([Liu et al., 2026](#bib.bib27); [Black et al., 2025a](#bib.bib4)). We additionally include the first- and second-place winners of the BEHAVIOR Challenge 2025 (RLC and Comet, respectively) ([Larchenko et al., 2025](#bib.bib21); [Bai et al., 2025](#bib.bib2)), whose qq-scores are reported on the official leaderboard. The RoboHarness column is Qwen3.8-Flash-Next. Each entry is the mean qq-score over five instances per task. Due to the limited evaluation budget, we only run five instances per task with seed 20260911, using slots 0,3,5,7,90,3,5,7,9 (instance IDs 301,304,306,308,310301,304,306,308,310). The prompt is specific to each task but
shared across instances, and is written by a human. The maximum tick count is set separately for each task, and the ten limits are listed in Appendix [A](#A1 "Appendix A BEHAVIOR Five-Instance Scores ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models").
Per-instance scores and the rollout archive are in Appendix [A](#A1 "Appendix A BEHAVIOR Five-Instance Scores ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models").

Table 3: BEHAVIOR Challenge 2025 task results. The RoboHarness column is Qwen3.8-Flash-Next, and each entry is the five-instance mean in Appendix [A](#A1 "Appendix A BEHAVIOR Five-Instance Scores ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models").

|  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| ID | Task | RLC | Comet | π0​.5\pi\_{0}.5 4ep | G0.5 1ep | RoboHarness |
| 0 | turning on radio | 0.6000 | 1.0000 | 0.1500 | 0.3000 | 0.4000 |
| 1 | picking up trash | 0.6667 | 0.7667 | 0.5500 | 0.8167 | 0.8667 |
| 2 | putting away Halloween decorations | 0.2000 | 0.5000 | 0.3714 | 0.4857 | 0.6857 |
| 3 | cleaning up plates and food | 0.1857 | 0.0000 | 0.3857 | 0.1786 | 0.2571 |
| 4 | can meat | 0.0000 | 0.0000 | 0.0333 | 0.0111 | 0.0000 |
| 5 | setting mousetraps | 0.3333 | 0.0000 | 0.1083 | 0.5083 | 0.8333 |
| 6 | hiding Easter eggs | 0.1444 | 0.2444 | 0.0778 | 0.0500 | 0.4222 |
| 7 | picking up toys | 0.3000 | 0.0000 | 0.1833 | 0.3167 | 0.3667 |
| 8 | rearranging kitchen furniture | 0.3000 | 0.3750 | 0.3875 | 0.3500 | 0.4000 |
| 9 | putting up Christmas decorations inside | 0.4333 | 0.0000 | 0.5611 | 0.4667 | 0.2222 |
| Percentage | | 31.635% | 28.861% | 28.084% | 34.838% | 44.539% |

### 5.2 Does the RoboHarness Generalize across Objects?

##### Objects.

The catalog is the 100 rigid objects in Figure [5.2](#S5.SS2 "5.2 Does the RoboHarness Generalize across Objects? ‣ 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models"). Assets are taken from the BEHAVIOR object library ([Li et al., 2024](#bib.bib22)), have extent at most 0.210.21 m, and have mass at most 1.21.2 kg. saucepan and one recorded outlier are kept outside those two cuts.

##### Tasks.

The task is to pick up each of the 100100 objects, and to place each object in the embodiment and simulation environment on which the corresponding model was trained. For ASPIRE and RoboHarness, the object is placed on the floor and the robot starts from a stooping pose. For models trained on LIBERO ([Liu et al., 2023](#bib.bib26)), the LIBERO tabletop scene is cleared and the object is placed at the center of the table. Success conditions:

|  |  |
| --- | --- |
| Max ticks | 20002000 |
| Success | max⁡z−z0≥5\max z-z\_{0}\geq 5 cm |

![Refer to caption](2610.14018v1/sec53_100_objects.png)

Figure 6: The 100 objects used to evaluate generalization across objects. The catalog is drawn from the BEHAVIOR object library.

##### Analysis and results.

##### Generalization is not positively correlated with the amount of robot data.

In Figure [7](#S5.F7 "Figure 7 ‣ Multimodal capabilities matter more than model parameter count. ‣ 5.2 Does the RoboHarness Generalize across Objects? ‣ 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models"), Faster-WAM reaches 61/10061/100 from a few hours of robot demonstrations, while several models trained on thousands of hours score lower ([Zhao et al., 2026](#bib.bib45)). The three world action models initialized from Wan2.2, Faster-WAM, OpenWAM-α\alpha, and LingBot-VA, sit above most vision-language-action models despite very different robot-data budgets ([Wan Team, 2025](#bib.bib36); [Wang et al., 2026](#bib.bib38); [Li et al., 2026](#bib.bib23)).

##### Multimodal capabilities matter more than model parameter count.

The RoboHarness points use no robot training set and still score 6868–8686. These points sit above the learned policies. Among those policies, the smaller world action models outscore larger vision-language-action models such as OpenVLA-OFT ([Kim et al., 2025a](#bib.bib19)). Per-object outcomes are in Appendix [D](#A4 "Appendix D Per-Object Outcomes ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models").

![Refer to caption](2610.14018v1/sec54_robot_hours.png)

Figure 7: Successes out of 100 objects versus estimated hours of robot data. Colors: VLA (blue), world action model (green), RoboHarness (red), and the ASPIRE-pick baseline (gray). The hour conversion is in Appendix [C](#A3 "Appendix C Evaluation Setting and Robot-Data Hours ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models").

## 6 Limitation & Discussion

This work explores a new technical path for generalist Embodied AI, constructing a simple but effective harness design that lets an LLM directly command a robot, and experimentally shows that this approach substantially outperforms both VLA and WAM baselines.

LLMs can come up with brilliant
plans and solutions for embodied tasks, but often fail to ground in the robot’s physical embodiment, leading to failures such as knocking over objects, falling, or getting stuck. To mitigate this on BEHAVIOR long-horizon mobile manipulation tasks, we hand-craft a task-specific prompt for every task that specifies the execution steps and the behavioral boundaries the model must respect.

Future work aims to close this gap further by training the model or evolving the harness to become more physically grounded.

### AI use statement

Generative AI tools were used in three ways. (i) They assisted writing. (ii) They assisted running the experiments: launching jobs, monitoring long rollouts, and flagging failed runs so that each experiment kept running stably, while every experimental setting and every reported number was checked by the authors. (iii) They assisted coding: writing and debugging RoboHarness human interface.

## References

* Ahn et al. (2023)

  Michael Ahn, Anthony Brohan, Noah Brown, Yevgen Chebotar, Omar Cortes, Byron
  David, Chelsea Finn, Chuyuan Fu, Keerthana Gopalakrishnan, Karol Hausman,
  et al.
  Do as I can, not as I say: Grounding language in robotic
  affordances.
  In *Proceedings of the 6th Conference on Robot Learning*, volume
  205 of *Proceedings of Machine Learning Research*, pp. 287–318. PMLR,
  2023.
  URL <https://proceedings.mlr.press/v205/ichter23a.html>.
* Bai et al. (2025)

  Junjie Bai, Yu-Wei Chao, Qizhi Chen, Jinwei Gu, Moo Jin Kim, Zhaoshuo Li, Xuan
  Li, Tsung-Yi Lin, Ming-Yu Liu, Nic Ma, Kaichun Mo, Delin Qu, Shangkun Sun,
  Hongchi Xia, Fangyin Wei, and Xiaohui Zeng.
  OpenPI Comet: Competition solution for 2025 BEHAVIOR challenge.
  *arXiv preprint arXiv:2512.10071*, 2025.
  URL <https://arxiv.org/abs/2512.10071>.
* Bjorck et al. (2025)

  Johan Bjorck, Fernando Castañeda, Nikita Cherniadev, Xingye Da, Runyu Ding,
  Linxi Jim Fan, Yu Fang, Dieter Fox, et al.
  GR00T N1: An open foundation model for generalist humanoid robots.
  *arXiv preprint arXiv:2503.14734*, 2025.
  URL <https://arxiv.org/abs/2503.14734>.
* Black et al. (2025a)

  Kevin Black, Noah Brown, James Darpinian, Karan Dhabalia, Danny Driess, Adnan
  Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Manuel Y. Galliker, et al.
  π0.5\pi\_{0.5}: a vision-language-action model with open-world
  generalization.
  In *Proceedings of the 9th Conference on Robot Learning*, volume
  305 of *Proceedings of Machine Learning Research*, pp. 17–40. PMLR,
  2025a.
  URL <https://proceedings.mlr.press/v305/black25a.html>.
* Black et al. (2025b)

  Kevin Black, Noah Brown, Danny Driess, Adnan Esmail, Michael Equi, Chelsea
  Finn, Niccolo Fusai, Lachy Groom, Karol Hausman, Brian Ichter, et al.
  π0\pi\_{0}: A vision-language-action flow model for general robot
  control.
  In *Proceedings of Robotics: Science and Systems*, Los Angeles,
  CA, USA, 2025b.
  URL <https://arxiv.org/abs/2410.24164>.
* Brohan et al. (2023)

  Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Joseph Dabis,
  Chelsea Finn, Chuyuan Fu, Keerthana Gopalakrishnan, et al.
  RT-2: Vision-language-action models transfer web knowledge to
  robotic control.
  In *Proceedings of the 7th Conference on Robot Learning*, volume
  229 of *Proceedings of Machine Learning Research*, pp. 2165–2183.
  PMLR, 2023.
  URL <https://proceedings.mlr.press/v229/zitkovich23a.html>.
* Bu et al. (2025)

  Qingwen Bu, Jisong Cai, Li Chen, et al.
  AgiBot World Colosseo: A large-scale manipulation platform for
  scalable and intelligent embodied systems.
  In *2025 IEEE/RSJ International Conference on Intelligent Robots
  and Systems (IROS)*, 2025.
  doi: 10.1109/IROS60139.2025.11247088.
* Cai et al. (2026)

  Rui Cai, Jun Guo, Xinze He, Piaopiao Jin, Jie Li, Bingxuan Lin, Futeng Liu, Wei
  Liu, Fei Ma, Kun Ma, Feng Qiu, Heng Qu, Yifei Su, Qiao Sun, Dong Wang,
  Donghao Wang, Yunhong Wang, Rujie Wu, Diyun Xiang, Yu Yang, Hangjun Ye, Yuan
  Zhang, and Quanyun Zhou.
  Xiaomi-Robotics-0: An open-sourced vision-language-action model
  with real-time execution.
  *arXiv preprint arXiv:2602.12684*, 2026.
  URL <https://arxiv.org/abs/2602.12684>.
* Chen et al. (2026)

  Tianxing Chen, Yue Chen, Zixuan Li, Junyuan Tang, Kailun Su, et al.
  RoboDojo: A unified sim-and-real benchmark for comprehensive
  evaluation of generalist robot manipulation policies.
  *arXiv preprint arXiv:2607.04434*, 2026.
  URL <https://arxiv.org/abs/2607.04434>.
* Driess et al. (2025)

  Danny Driess, Jost Tobias Springenberg, Brian Ichter, Lili Yu, Adrian Li-Bell,
  Karl Pertsch, Allen Z. Ren, Homer Walke, Quan Vuong, Lucy Xiaoyang Shi, and
  Sergey Levine.
  Knowledge insulating vision-language-action models: Train fast, run
  fast, generalize better.
  In *Advances in Neural Information Processing Systems*, 2025.
  URL <https://arxiv.org/abs/2505.23705>.
* Fang et al. (2024)

  Kuan Fang, Fangchen Liu, Pieter Abbeel, and Sergey Levine.
  MOKA: Open-world robotic manipulation through mark-based visual
  prompting.
  In *Proceedings of Robotics: Science and Systems*, 2024.
  URL <https://arxiv.org/abs/2403.03174>.
* Fu et al. (2026)

  Letian Fu, Justin Yu, Karim El-Refai, Ethan Kou, Haoru Xue, Huang Huang, Wenli
  Xiao, Guanzhi Wang, Dantong Niu, Li Fei-Fei, Guanya Shi, Jiajun Wu, Shankar
  Sastry, Yuke Zhu, Ken Goldberg, and Linxi Jim Fan.
  CaP-X: A framework for benchmarking and improving coding agents for
  robot manipulation.
  *arXiv preprint arXiv:2603.22435*, 2026.
  URL <https://arxiv.org/abs/2603.22435>.
* Huang et al. (2024)

  Haoxu Huang, Fanqi Lin, Yingdong Hu, Shengjie Wang, and Yang Gao.
  CoPa: General robotic manipulation through spatial constraints of
  parts with foundation models.
  In *2024 IEEE/RSJ International Conference on Intelligent Robots
  and Systems (IROS)*, pp. 9488–9495, 2024.
  doi: 10.1109/IROS58592.2024.10801352.
* Huang et al. (2023a)

  Wenlong Huang, Chen Wang, Ruohan Zhang, Yunzhu Li, Jiajun Wu, and Li Fei-Fei.
  Voxposer: Composable 3D value maps for robotic manipulation with
  language models.
  In *Proceedings of the 7th Conference on Robot Learning*, volume
  229 of *Proceedings of Machine Learning Research*, pp. 540–562. PMLR,
  2023a.
  URL <https://proceedings.mlr.press/v229/huang23b.html>.
* Huang et al. (2023b)

  Wenlong Huang, Fei Xia, Ted Xiao, Harris Chan, Jacky Liang, Pete Florence, Andy
  Zeng, Jonathan Tompson, Igor Mordatch, Yevgen Chebotar, Pierre Sermanet,
  Tomas Jackson, Noah Brown, Linda Luu, Sergey Levine, Karol Hausman, and Brian
  Ichter.
  Inner monologue: Embodied reasoning through planning with language
  models.
  In *Proceedings of the 6th Conference on Robot Learning*, volume
  205 of *Proceedings of Machine Learning Research*, pp. 1769–1782.
  PMLR, 2023b.
  URL <https://proceedings.mlr.press/v205/huang23c.html>.
* Huang et al. (2025)

  Wenlong Huang, Chen Wang, Yunzhu Li, Ruohan Zhang, and Li Fei-Fei.
  ReKep: Spatio-temporal reasoning of relational keypoint constraints
  for robotic manipulation.
  In *Proceedings of the 8th Conference on Robot Learning*, volume
  270 of *Proceedings of Machine Learning Research*, pp. 4573–4602.
  PMLR, 2025.
  URL <https://proceedings.mlr.press/v270/huang25g.html>.
* Jiang et al. (2025)

  Tao Jiang, Tianyuan Yuan, Yicheng Liu, Chenhao Lu, Jianning Cui, Xiao Liu,
  Shuiqi Cheng, Jiyang Gao, Huazhe Xu, and Hang Zhao.
  Galaxea Open-World dataset and G0 dual-system VLA model.
  *arXiv preprint arXiv:2509.00576*, 2025.
  URL <https://arxiv.org/abs/2509.00576>.
* Khazatsky et al. (2024)

  Alexander Khazatsky, Karl Pertsch, Suraj Nair, Ashvin Balakrishna, Sudeep
  Dasari, Siddharth Karamcheti, Soroush Nasiriany, Mohan Kumar Srirama,
  Lawrence Yunliang Chen, Kirsty Ellis, et al.
  DROID: A large-scale in-the-wild robot manipulation dataset.
  In *Proceedings of Robotics: Science and Systems*, 2024.
  URL <https://arxiv.org/abs/2403.12945>.
* Kim et al. (2025a)

  Moo Jin Kim, Chelsea Finn, and Percy Liang.
  Fine-tuning vision-language-action models: Optimizing speed and
  success.
  In *Proceedings of Robotics: Science and Systems*, Los Angeles,
  CA, USA, 2025a.
  doi: 10.15607/RSS.2025.XXI.017.
* Kim et al. (2025b)

  Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, Ashwin Balakrishna,
  Suraj Nair, Rafael Rafailov, Ethan Foster, Grace Lam, Pannag Sanketi, et al.
  OpenVLA: An open-source vision-language-action model.
  In *Proceedings of the 8th Conference on Robot Learning*, volume
  270 of *Proceedings of Machine Learning Research*. PMLR,
  2025b.
  URL <https://arxiv.org/abs/2406.09246>.
* Larchenko et al. (2025)

  Ilia Larchenko, Gleb Zarin, and Akash Karnatak.
  Task adaptation of vision-language-action model: 1st place solution
  for the 2025 BEHAVIOR challenge.
  *arXiv preprint arXiv:2512.06951*, 2025.
  URL <https://arxiv.org/abs/2512.06951>.
* Li et al. (2024)

  Chengshu Li, Ruohan Zhang, Josiah Wong, Cem Gokmen, Sanjana Srivastava, Roberto
  Martín-Martín, Chen Wang, Gabrael Levine, Wensi Ai, Benjamin
  Martinez, et al.
  BEHAVIOR-1K: A human-centered, embodied AI benchmark with 1,000
  everyday activities and realistic simulation.
  *arXiv preprint arXiv:2403.09227*, 2024.
  URL <https://arxiv.org/abs/2403.09227>.
* Li et al. (2026)

  Lin Li, Qihang Zhang, Yiming Luo, Shuai Yang, Ruilin Wang, Fei Han, Mingrui Yu,
  Zelin Gao, Nan Xue, Xing Zhu, Yujun Shen, and Yinghao Xu.
  LingBot-VA: Causal world modeling for robot control.
  *arXiv preprint arXiv:2601.21998*, 2026.
  URL <https://arxiv.org/abs/2601.21998>.
* Li et al. (2025)

  Yi Li, Yuquan Deng, Jesse Zhang, Joel Jang, Marius Memmel, Raymond Yu,
  Caelan Reed Garrett, Fabio Ramos, Dieter Fox, Anqi Li, Abhishek Gupta, and
  Ankit Goyal.
  HAMSTER: Hierarchical action models for open-world robot
  manipulation.
  In *International Conference on Learning Representations*, 2025.
  URL <https://arxiv.org/abs/2502.05485>.
* Liang et al. (2023)

  Jacky Liang, Wenlong Huang, Fei Xia, Peng Xu, Karol Hausman, Brian Ichter, Pete
  Florence, and Andy Zeng.
  Code as policies: Language model programs for embodied control.
  In *2023 IEEE International Conference on Robotics and
  Automation (ICRA)*, pp. 9493–9500, 2023.
  doi: 10.1109/ICRA48891.2023.10160591.
* Liu et al. (2023)

  Bo Liu, Yifeng Zhu, Chongkai Gao, Yihao Feng, Qiang Liu, Yuke Zhu, and Peter
  Stone.
  LIBERO: Benchmarking knowledge transfer for lifelong robot
  learning.
  In *Advances in Neural Information Processing Systems*, 2023.
  URL <https://arxiv.org/abs/2306.03310>.
* Liu et al. (2026)

  Yicheng Liu, Zibin Dong, Baijun Ye, Tianyuan Yuan, Tao Jiang, Anqi Yang,
  Shicheng Cao, Haonan Liu, Yue Sun, Zihan Guo, et al.
  G0.5: One autoregressive stream for robot reasoning and action.
  *arXiv preprint arXiv:2608.11739*, 2026.
  URL <https://arxiv.org/abs/2608.11739>.
* Lu et al. (2026)

  Runyu Lu, Yubo Wu, Ethan Kou, Letian Fu, Wenli Xiao, Ajay Mandlekar, Yinzhen
  Xu, Guanya Shi, Ken Goldberg, Ang Chen, Mosharaf Chowdhury, Yuke Zhu,
  Linxi Jim Fan, and Guanzhi Wang.
  ASPIRE: Agentic /skills discovery for robotics.
  *arXiv preprint arXiv:2607.00272*, 2026.
  URL <https://arxiv.org/abs/2607.00272>.
* Nasiriany et al. (2024)

  Soroush Nasiriany, Fei Xia, Wenhao Yu, Ted Xiao, Jacky Liang, Ishita Dasgupta,
  Annie Xie, Danny Driess, Ayzaan Wahid, Zhuo Xu, Quan Vuong, Tingnan Zhang,
  Tsang-Wei Edward Lee, Kuang-Huei Lee, Peng Xu, Sean Kirmani, Yuke Zhu, Andy
  Zeng, Karol Hausman, Nicolas Heess, Chelsea Finn, Sergey Levine, and Brian
  Ichter.
  PIVOT: Iterative visual prompting elicits actionable knowledge for
  VLMs.
  In *Proceedings of the 41st International Conference on Machine
  Learning*, volume 235 of *Proceedings of Machine Learning Research*,
  pp. 37321–37341. PMLR, 2024.
  URL <https://proceedings.mlr.press/v235/nasiriany24a.html>.
* Open X-Embodiment Collaboration (2024)

  Open X-Embodiment Collaboration.
  Open X-Embodiment: Robotic learning datasets and RT-X models.
  In *2024 IEEE International Conference on Robotics and
  Automation (ICRA)*, pp. 6892–6903, 2024.
  doi: 10.1109/ICRA57147.2024.10611477.
* Pan et al. (2025)

  Mingjie Pan, Jiyao Zhang, Tianshu Wu, Yinghao Zhao, Wenlong Gao, and Hao Dong.
  OmniManip: Towards general robotic manipulation via object-centric
  interaction primitives as spatial constraints.
  In *Proceedings of the IEEE/CVF Conference on Computer Vision
  and Pattern Recognition (CVPR)*, pp. 17359–17369, 2025.
  doi: 10.1109/CVPR52734.2025.01618.
* Pertsch et al. (2025)

  Karl Pertsch, Kyle Stachowicz, Brian Ichter, Danny Driess, Suraj Nair, Quan
  Vuong, Oier Mees, Chelsea Finn, and Sergey Levine.
  FAST: Efficient action tokenization for vision-language-action
  models.
  In *Proceedings of Robotics: Science and Systems*, Los Angeles,
  CA, USA, 2025.
  doi: 10.15607/RSS.2025.XXI.012.
* Physical Intelligence (2026)

  Physical Intelligence.
  π0.7\pi\_{0.7}: a steerable generalist robotic foundation model with
  emergent capabilities.
  *arXiv preprint arXiv:2604.15483*, 2026.
  URL <https://arxiv.org/abs/2604.15483>.
* Qwen Team (2026)

  Qwen Team.
  Qwen3.8-Flash-Next: A new architecture, towards ultimate
  cost-efficiency.
  <https://qwen.ai/blog?id=qwen3.8-flash-next>, August 2026.
* Tian et al. (2025)

  Yang Tian, Yuyin Yang, Yiman Xie, Zetao Cai, Xu Shi, Ning Gao, Hangxu Liu,
  Xuekun Jiang, Zherui Qiu, Feng Yuan, Yaping Li, Ping Wang, Junhao Cai, Jia
  Zeng, Hao Dong, and Jiangmiao Pang.
  InternData-A1: Pioneering high-fidelity synthetic data for
  pre-training generalist policy.
  *arXiv preprint arXiv:2511.16651*, 2025.
  URL <https://arxiv.org/abs/2511.16651>.
* Wan Team (2025)

  Wan Team.
  Wan2.2.
  <https://github.com/Wan-Video/Wan2.2>, 2025.
  Model card and code release. The technical report is Wan et al. (2025).
* Wan Team et al. (2025)

  Wan Team, Ang Wang, Baole Ai, Bin Wen, Chaojie Mao, Chen-Wei Xie, Di Chen,
  Feiwu Yu, Haiming Zhao, Jianxiao Yang, Jianyuan Zeng, et al.
  Wan: Open and advanced large-scale video generative models.
  *arXiv preprint arXiv:2503.20314*, 2025.
  URL <https://arxiv.org/abs/2503.20314>.
* Wang et al. (2026)

  Yuran Wang, Siqiao Huang, Mingleyang Li, Chenhao Zhang, Jiaqi Liang, Weiyang
  Jin, Yue Chen, Xuemin Chi, Donghao Zhou, Qize Yu, et al.
  OpenWAM: An open, modular exploration towards systematic
  world-action model pretraining.
  *arXiv preprint arXiv:2609.07398*, 2026.
  URL <https://arxiv.org/abs/2609.07398>.
* Wu et al. (2025a)

  Kun Wu, Chengkai Hou, Jiaming Liu, Zhengping Che, Xiaozhu Ju, et al.
  RoboMIND: Benchmark on multi-embodiment intelligence normative data
  for robot manipulation.
  In *Proceedings of Robotics: Science and Systems*, Los Angeles,
  CA, USA, 2025a.
  doi: 10.15607/RSS.2025.XXI.152.
* Wu et al. (2025b)

  Shihan Wu, Xuecheng Liu, Shaoxuan Xie, Pengwei Wang, Xinghang Li, et al.
  RoboCOIN: An open-sourced bimanual robotic data collection for
  integrated manipulation.
  *arXiv preprint arXiv:2511.17441*, 2025b.
  URL <https://arxiv.org/abs/2511.17441>.
* Yang et al. (2026)

  Yandan Yang, Shuang Zeng, Tong Lin, Xinyuan Chang, Dekang Qi, Junjin Xiao,
  Haoyun Liu, Ronghan Chen, Yuzhi Chen, Dongjie Huo, Feng Xiong, Xing Wei,
  Zhiheng Ma, and Mu Xu.
  ABot-M0: VLA foundation model for robotic manipulation with
  action manifold learning.
  *arXiv preprint arXiv:2602.11236*, 2026.
  URL <https://arxiv.org/abs/2602.11236>.
* Yuan (2026)

  Tianyuan Yuan.
  LIBERO MuJoCo 3.3.2 for FastWAM.
  <https://huggingface.co/datasets/yuanty/LIBERO-fastwam>, 2026.
  LeRobot release used by the Faster-WAM training scripts.
* Yuan et al. (2025)

  Wentao Yuan, Jiafei Duan, Valts Blukis, Wilbert Pumacay, Ranjay Krishna,
  Adithyavairavan Murali, Arsalan Mousavian, and Dieter Fox.
  Robopoint: A vision-language model for spatial affordance prediction
  for robotics.
  In *Proceedings of the 8th Conference on Robot Learning*, volume
  270 of *Proceedings of Machine Learning Research*, pp. 4005–4020.
  PMLR, 2025.
  URL <https://proceedings.mlr.press/v270/yuan25c.html>.
* Zhang et al. (2026)

  Yixian Zhang, Huanming Zhang, Feng Gao, Xiao Li, Zhihao Liu, Yi Nie, Chunyang
  Zhu, Jiaxing Qiu, Yuchen Yan, Jiyuan Liu, Wenhao Tang, Jiaji Rao, Zhengru
  Fang, Changxu Wei, Yu Wang, Wenbo Ding, and Chao Yu.
  Harness VLA: Steering frozen VLAs into reliable manipulation
  primitives via memory-guided agents.
  *arXiv preprint arXiv:2607.08448*, 2026.
  URL <https://arxiv.org/abs/2607.08448>.
* Zhao et al. (2026)

  Weiheng Zhao, Haoyi Jiang, Xin Shi, Liu Liu, Fan Huang, Zhizhong Su, Wei Sui,
  and Xinggang Wang.
  Faster-WAM: Efficient inference-time future conditioning for robust
  world action models.
  *arXiv preprint arXiv:2608.04404*, 2026.
  URL <https://arxiv.org/abs/2608.04404>.
* Zheng et al. (2026)

  Jinliang Zheng, Jianxiong Li, Zhihao Wang, Dongxiu Liu, Xirui Kang, Yuchun
  Feng, Yinan Zheng, Jiayin Zou, Yilun Chen, Jia Zeng, et al.
  X-VLA: Soft-prompted transformer as scalable cross-embodiment
  vision-language-action model.
  In *International Conference on Learning Representations*, 2026.
  URL <https://arxiv.org/abs/2510.10274>.

## Appendix A BEHAVIOR Five-Instance Scores

The RoboHarness column of Table [3](#S5.T3 "Table 3 ‣ BEHAVIOR 2025: Long-horizon household tasks. ‣ 5.1 RoboHarness can outperform VLA and WAM across tasks ‣ 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models") is a five-instance sample of each of the first ten BEHAVIOR Challenge 2025 tasks, and every rollout in that column uses Qwen3.8-Flash-Next.
The robot is the R1 Pro embodiment of the challenge.
The sample is fixed by seed 20260911.
Every task loads the same evaluation slots 0,3,5,7,90,3,5,7,9, which are activity instances 301,304,306,308,310301,304,306,308,310.
Slots 1,2,4,6,81,2,4,6,8 (instances 302,303,305,307,309302,303,305,307,309) are outside this sample.
Each instance is one official rollout.
The prompt is specific to each task but shared across instances, and is written by a human. It includes a procedure for accomplishing the task.
The official BEHAVIOR Challenge 2025 evaluator scores the rollout, and a cell in Table [5](#A1.T5 "Table 5 ‣ Appendix A BEHAVIOR Five-Instance Scores ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models") is q\_score.final from that evaluation.
The task mean is the unweighted average of those five scores, rounded to four decimals, and is the number reported in Table [3](#S5.T3 "Table 3 ‣ BEHAVIOR 2025: Long-horizon household tasks. ‣ 5.1 RoboHarness can outperform VLA and WAM across tasks ‣ 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models").

An episode ends when the task goal is already satisfied or when the simulator reaches the maximum tick count of that task.
The maximum is the official 2025 limit for the task, set to twice the mean length of its human demonstrations, and it is counted in simulator control steps.
Table [4](#A1.T4 "Table 4 ‣ Appendix A BEHAVIOR Five-Instance Scores ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models") lists the limit used for each task.

Table 4: Official maximum tick count for each BEHAVIOR Challenge 2025 task in this sample. The episode stops at this count unless the goal is already satisfied.

| ID | Task | Max ticks |
| --- | --- | --- |
| 0 | turning on radio | 4299 |
| 1 | picking up trash | 10535 |
| 2 | putting away Halloween decorations | 27664 |
| 3 | cleaning up plates and food | 27392 |
| 4 | can meat | 23694 |
| 5 | setting mousetraps | 20343 |
| 6 | hiding Easter eggs | 15239 |
| 7 | picking up toys | 37781 |
| 8 | rearranging kitchen furniture | 17886 |
| 9 | putting up Christmas decorations inside | 27437 |

Table 5: Per-instance qq-score for the five-instance RoboHarness sample. Slots 0,3,5,7,90,3,5,7,9 are instances 301,304,306,308,310301,304,306,308,310.

|  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ID | Task | 301 | 304 | 306 | 308 | 310 | Mean |
|  |  | slot 0 | slot 3 | slot 5 | slot 7 | slot 9 |  |
| 0 | turning on radio | 0.0000 | 0.0000 | 0.0000 | 1.0000 | 1.0000 | 0.4000 |
| 1 | picking up trash | 1.0000 | 0.3333 | 1.0000 | 1.0000 | 1.0000 | 0.8667 |
| 2 | putting away Halloween decorations | 0.5714 | 0.7143 | 0.4286 | 0.7143 | 1.0000 | 0.6857 |
| 3 | cleaning up plates and food | 0.2857 | 0.2857 | 0.2857 | 0.1429 | 0.2857 | 0.2571 |
| 4 | can meat | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| 5 | setting mousetraps | 1.0000 | 1.0000 | 0.5000 | 1.0000 | 0.6667 | 0.8333 |
| 6 | hiding Easter eggs | 1.0000 | 0.0000 | 0.7778 | 0.3333 | 0.0000 | 0.4222 |
| 7 | picking up toys | 0.0000 | 0.6667 | 0.5000 | 0.6667 | 0.0000 | 0.3667 |
| 8 | rearranging kitchen furniture | 0.2500 | 0.5000 | 0.2500 | 0.5000 | 0.5000 | 0.4000 |
| 9 | putting up Christmas decorations inside | 0.3333 | 0.2222 | 0.3333 | 0.1111 | 0.1111 | 0.2222 |
| Task 0–9 mean | |  |  |  |  |  | 0.44539 |

## Appendix B Full Embodied Skill Catalog

We distill the procedures used across individual tasks into a set of reusable embodied skills, listed in Table [6](#A2.T6 "Table 6 ‣ Appendix B Full Embodied Skill Catalog ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models").

Table 6: Embodied skills shipped with the embodied\_claude\_code plugin, excluding the trivial single-object skills close-box, cut-object, and stand-trash-can-upright. Each row is condensed to one sentence describing what the skill does.

| Skill | Description |
| --- | --- |
| behavior-v2-baseline | contract of scene perception, task decomposition, primitive selection, and execution monitoring. |
| navigate-to-target | Drives the chassis toward a marked target. |
| open-doors-and-drawers | Open hinged doors or drawers. |
| pick-up-object | Plans and executes a grasp of a visible object. |
| place-object-in-container | Aligns a held object over an open container and releases it only after the object has settled inside. |
| traverse-narrow-passages | Drives chassis through tight doorway . |

## Appendix C Evaluation Setting and Robot-Data Hours

##### Test.

Each learned policy is evaluated on a cleared LIBERO table. The object is placed at the center, the prompt is pick up the {name}, and the trial runs for 20002000 steps. The trial succeeds when the target root rises by at least 55 cm. Qwen3.8-Flash and gpt-6-luna use the RoboHarness on the R1 Pro, with the object on the floor and the same success rule. An hour counts robot recordings and human egocentric manipulation video once. Web-video generation and VQA are not counted.

##### Qwen3.8-27B.

* •

  The run calls the served model Qwen3.8-27B-FP8 with the skill prompt. This model has no released robot checkpoint on Hugging Face. The trial uses the shared 20002000-step protocol and the 55 cm lift.
* •

  The run has no robot manipulation training set, so the robot-data hours are 00.

##### Qwen3.8-Flash.

* •

  The run calls the served model Qwen3.8-Flash-Next-FP8 with the skill prompt. This model has no released robot checkpoint on Hugging Face.
* •

  The run has no robot manipulation training set, so the robot-data hours are 00.

##### GPT-6-luna.

* •

  The run calls the served model gpt-6-luna with the skill prompt. This model has no released robot checkpoint on Hugging Face.
* •

  The run has no robot manipulation training set, so the robot-data hours are 00.

##### π0.5\pi\_{0.5}.

* •

  The run uses the released pi05\_libero checkpoint from the openpi release. The policy replans every 55 actions.
* •

  The paper states about 400400 hours of mobile-manipulator data, and states that 97.6%97.6\% of the examples in the first training phase come from other robots or the web ([Black et al., 2025a](#bib.bib4)). Converting the whole first-phase mixture by that share gives 16,666.716{,}666.7 hours. The paper does not separate the web portion from the other robot data.

##### Faster-WAM.

* •

  The run uses hustvl/FasterWAM, the released LIBERO weights at step 2170021700. The policy replans every 1010 actions.
* •

  The paper initializes the model from Wan2.2-5B, marks embodied pretraining as absent, and trains on four LIBERO suites of 500500 demonstrations for 1010 epochs ([Zhao et al., 2026](#bib.bib45); [Wan Team, 2025](#bib.bib36)). The training release yuanty/LIBERO-fastwam states 1,7121{,}712 episodes and 277,713277{,}713 frames at 2020 frames per second, which converts to 3.863.86 hours ([Yuan, 2026](#bib.bib42)). The Wan corpus is web video and is not counted ([Wan Team et al., 2025](#bib.bib37)).

##### Galaxea G0.5.

* •

  The run uses the g05-libero checkpoint released in OpenGalaxea/G05. The policy predicts 1010 action steps at a time.
* •

  The G0.5 paper states 1414 embodiments and does not state a training duration ([Liu et al., 2026](#bib.bib27)). The estimate therefore uses stage 1 of the previous G0 paper, which states about 1,0001{,}000 hours of Open X-Embodiment, 500500 hours of Galaxea Open-World, and 200200 hours collected in-house ([Jiang et al., 2025](#bib.bib17); [Open X-Embodiment Collaboration, 2024](#bib.bib30)). The no-op-filtered LIBERO demonstrations used for this checkpoint convert to 3.803.80 hours at 2020 Hz. Adding these durations gives 1,703.81{,}703.8 hours.

##### OpenWAM-α\alpha.

* •

  The run uses OpenWAM/OpenWAM-Alpha-Sim-LIBERO at step 1069010690. Denoising uses 1010 steps, and the inference horizon is 1010 actions.
* •

  The paper lists 1,4421{,}442 hours of egocentric human video, 1,7941{,}794 hours of AgiBot, 686686 hours of RoboCOIN, 1,0071{,}007 hours of DROID, and 1,4401{,}440 hours of InternData-A1, and states that this mixture is seen for one epoch ([Wang et al., 2026](#bib.bib38); [Wu et al., 2025b](#bib.bib40); [Tian et al., 2025](#bib.bib35)). Adding these durations gives 6,3696{,}369 hours. The Wan2.2 initialization is web video and is not counted ([Wan Team et al., 2025](#bib.bib37); [Wan Team, 2025](#bib.bib36)).

##### LingBot-VA.

* •

  The run uses robbyant/lingbot-va-posttrain-libero-long. The trial uses the shared setting of 20002000 steps and a 55 cm lift.
* •

  The paper states approximately 1616K hours of robot manipulation data, and states that pretraining consumes 1.41.4T tokens ([Li et al., 2026](#bib.bib23)). The plotted value is the stated 16,00016{,}000 hours. The token count records how much data the run consumes, and it is not added again as a second copy of the corpus.

##### OpenVLA-OFT.

* •

  The run uses moojink/openvla-7b-oft-finetuned-libero-10. The unnormalization key is libero\_10\_no\_noops, and the client executes the full 88-step action chunk.
* •

  The OpenVLA paper states 970970k demonstrations from 2727 Open X-Embodiment datasets, trained for 2727 epochs, with the DROID portion removed for the last third of training ([Kim et al., 2025b](#bib.bib20); [Open X-Embodiment Collaboration, 2024](#bib.bib30)). The released frame counts of those 2727 datasets convert to 1,651.41{,}651.4 hours. The OFT paper fine-tunes this checkpoint on LIBERO and does not add another pretraining corpus ([Kim et al., 2025a](#bib.bib19)).

##### ABot-M0.

* •

  The run uses acvlab/ABot-M0-LIBERO at step 4000040000. The action chunk is 1010 steps, and the unnormalization key is franka.
* •

  The paper states that UniACT contains more than six million trajectories and 9,5009{,}500 hours ([Yang et al., 2026](#bib.bib41)). The plotted value is the stated 9,5009{,}500 hours.

##### Xiaomi-Robotics-0.

* •

  The run uses XiaomiRobotics/Xiaomi-Robotics-0-LIBERO. The task id is libero\_all, and the policy replans every 1010 actions.
* •

  The paper states about 200×106200\times 10^{6} robot timesteps on a unified 3030 Hz timeline ([Cai et al., 2026](#bib.bib8)). These timesteps convert to 1,851.91{,}851.9 hours. The 338338 hours and 400400 hours of in-house tasks stated in the paper are already inside this total.

##### X-VLA.

* •

  The run uses 2toINF/X-VLA-Libero. The domain id is 33, and denoising uses 1010 steps.
* •

  The pretraining table lists episode counts: AgiBot has 141141K episodes, DROID is listed as two rows of 4545K episodes, and RoboMIND is listed as 1919K, 22K, 2525K, and 1111K episodes ([Zheng et al., 2026](#bib.bib46)). AgiBot states 1,001,5521{,}001{,}552 trajectories and 2,976.42{,}976.4 hours, which converts to 419.0419.0 hours for the listed 141141K episodes ([Bu et al., 2025](#bib.bib7)). DROID states 7676k successful trajectories and 350350 hours, and the two 4545K rows are one subset of that release, which converts to 207.2207.2 hours ([Khazatsky et al., 2024](#bib.bib18)). RoboMIND states 107107k trajectories and 305.5305.5 hours for the full corpus, which converts to 162.7162.7 hours for the listed 5757K episodes ([Wu et al., 2025a](#bib.bib39)). Adding these three durations gives 788.9788.9 hours. The sampling weights in the X-VLA table are mixture weights, and they are not used as durations.

##### ASPIRE pick function.

* •

  The baseline has no learned checkpoint. Each object is scored by one call of the ASPIRE pick function, and the same 55 cm lift is a success ([Lu et al., 2026](#bib.bib28)).
* •

  The baseline has no robot manipulation training set, so the robot-data hours are 00.

## Appendix D Per-Object Outcomes

Table [7](#A4.T7 "Table 7 ‣ Appendix D Per-Object Outcomes ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models") lists the runs in Figure [7](#S5.F7 "Figure 7 ‣ Multimodal capabilities matter more than model parameter count. ‣ 5.2 Does the RoboHarness Generalize across Objects? ‣ 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models"). A check is a success and a cross is a failure under the 55 cm rule of Section [5.2](#S5.SS2 "5.2 Does the RoboHarness Generalize across Objects? ‣ 5 Experiments ‣ RoboHarness: A Simple Harness Outperforms VLA and World Actions Models").

Table 7: Per-object outcome on the 100 objects. A check is a success under the 55 cm rule and a cross is a failure. Columns are Qwen3.8-27B, Qwen3.8-Flash, gpt-6-luna, π0.5\pi\_{0.5}, Faster-WAM, G0.5, OpenWAM-α\alpha, LingBot-VA, OpenVLA-OFT, ABot-M0, Xiaomi-Robotics-0, X-VLA, and the ASPIRE pick function.

| # | Object | 27B | Flash | luna | π0.5\pi\_{0.5} | F-WAM | G0.5 | OWAM | Ling | OVLA | ABot | Xiao | XVLA | Pick |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | alarm\_clock | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 2 | apple | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times |
| 3 | avocado | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times |
| 4 | banana | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ✓\checkmark | ×\times |
| 5 | bar\_soap | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 6 | baseball | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times |
| 7 | battery | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 8 | bell\_pepper | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times |
| 9 | blackboard\_eraser | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ×\times |
| 10 | calculator | ×\times | ×\times | ×\times | ×\times | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 11 | can\_of\_soda | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ✓\checkmark |
| 12 | canned\_food | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times |
| 13 | carrot | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times |
| 14 | cell\_phone | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ✓\checkmark |
| 15 | cellulose\_tape\_dispenser | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 16 | coffee\_cup | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times |
| 17 | cucumber | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ×\times |
| 18 | deodorant\_stick | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ✓\checkmark |
| 19 | dental\_floss | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 20 | digital\_camera | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 21 | duct\_tape | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ✓\checkmark |
| 22 | easter\_egg | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 23 | egg | ×\times | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times |
| 24 | eggplant | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ✓\checkmark | ×\times | ×\times |
| 25 | garlic | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times |
| 26 | gaming\_controller | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 27 | hockey\_puck | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times |
| 28 | inhaler | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 29 | lemon | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times |
| 30 | lime | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times |
| 31 | lipstick | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 32 | mouse | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ✓\checkmark | ×\times | ×\times | ×\times |
| 33 | mug | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ✓\checkmark |
| 34 | orange | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times |
| 35 | paper\_cup | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ✓\checkmark | ×\times |
| 36 | peach | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times |
| 37 | pear | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times | ×\times |
| 38 | pepper\_grinder | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times |
| 39 | pill\_bottle | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 40 | pillar\_candle | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 41 | plum | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 42 | pool\_ball | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times |
| 43 | portable\_game\_console | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times |
| 44 | potato | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times |
| 45 | salt\_shaker | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 46 | soda\_cup | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark |
| 47 | stapler | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ✓\checkmark | ×\times | ×\times |
| 48 | tennis\_ball | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times |
| 49 | toy\_dice | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 50 | wallet | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 51 | artichoke | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 52 | baby\_bottle | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times |
| 53 | beaker | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ✓\checkmark | ×\times |
| 54 | beefsteak\_tomato | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ×\times |
| 55 | beer\_glass | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ✓\checkmark | ×\times | ×\times |
| 56 | beet | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 57 | bottle\_of\_hot\_sauce | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times |
| 58 | bowl | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ✓\checkmark |
| 59 | brussels\_sprouts | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 60 | can\_of\_beans | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ✓\checkmark | ×\times |
| 61 | can\_of\_sardines | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ✓\checkmark | ×\times |
| 62 | canteen | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 63 | carton\_of\_milk | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times |
| 64 | fried\_chicken | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 65 | cinnamon\_roll | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 66 | marker | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 67 | conch | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 68 | corkscrew | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times |
| 69 | gravy\_boat | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 70 | eyeglasses | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ✓\checkmark |
| 71 | french\_press | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 72 | gift\_box | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ✓\checkmark |
| 73 | glue\_stick | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times |
| 74 | grapefruit | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 75 | hard\_drive | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 76 | hotdog | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times |
| 77 | spray\_can | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 78 | jade\_roller | ×\times | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times |
| 79 | jar\_of\_jam | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times |
| 80 | jigger | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times |
| 81 | light\_bulb | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times |
| 82 | lighter | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 83 | mango | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times |
| 84 | match\_box | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times |
| 85 | mousetrap | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times |
| 86 | pencil\_case | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 87 | plier | ×\times | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 88 | pomegranate | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ×\times |
| 89 | razor | ×\times | ×\times | ×\times | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times |
| 90 | saucepan | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 91 | screwdriver | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times |
| 92 | scrub\_brush | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times |
| 93 | snow\_globe | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ×\times |
| 94 | teacup | ×\times | ✓\checkmark | ×\times | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times |
| 95 | tube\_of\_toothpaste | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark |
| 96 | vegetable\_peeler | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times |
| 97 | water\_glass | ×\times | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times |
| 98 | toy\_figure | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times | ×\times |
| 99 | spirit\_lamp | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times |
| 100 | zucchini | ✓\checkmark | ✓\checkmark | ×\times | ✓\checkmark | ✓\checkmark | ✓\checkmark | ✓\checkmark | ×\times | ×\times | ✓\checkmark | ×\times | ×\times | ×\times |

Experimental support, please
[view the build logs](./2610.14018v1/__stdout.txt)
for errors. Generated by
[L
A
T
E
xml
![[LOGO]](data:image/png;base64...)](https://math.nist.gov/~BMiller/LaTeXML/).

## Instructions for reporting errors

We are continuing to improve HTML versions of papers, and your feedback helps enhance accessibility and mobile
support. To report errors in the HTML that will help us improve conversion and rendering, choose any of the
methods listed below:

* Click the "Report Issue" (

  ) button, located in the page header.

**Tip:** You can select the relevant text first, to include it in your report.

Our team has already identified [the following issues](https://github.com/arXiv/html_feedback/issues). We appreciate your time reviewing and reporting rendering errors we
may not have found yet. Your efforts will help us improve the HTML versions for all readers, because disability
should not be a barrier to accessing research. Thank you for your continued support in championing open access for
all.

Have a free development cycle? Help support accessibility at arXiv! Our collaborators at LaTeXML maintain a [list of packages that need conversion](https://github.com/brucemiller/LaTeXML/wiki/Porting-LaTeX-packages-for-LaTeXML), and welcome [developer contributions](https://github.com/brucemiller/LaTeXML/issues).

We gratefully acknowledge support from
our **major funders**,
[**member institutions**](https://info.arxiv.org/about/ourmembers.html), ,
and all contributors.

[About](https://info.arxiv.org/about)
·
[Help](https://info.arxiv.org/help)
·
[Contact](https://info.arxiv.org/help/contact.html)
·
[Subscribe](https://info.arxiv.org/help/subscribe)
·
[Copyright](https://info.arxiv.org/help/license/index.html)
·
[Privacy](https://info.arxiv.org/help/policies/privacy_policy.html)
·
[Accessibility](https://info.arxiv.org/help/web_accessibility.html)
·
[Operational Status (opens in new tab)](https://status.arxiv.org)

Major funding support from

[![Simons Foundation](/static/base/1.0.1/images/funders/simons-foundation.png)](https://www.simonsfoundation.org/)
[![Simons Foundation International](/static/base/1.0.1/images/funders/simons-foundation-international.png)](https://www.sfi.org.bm/)
[![Schmidt Sciences](/static/base/1.0.1/images/funders/schmidt-sciences.png)](https://www.schmidtsciences.org/)
