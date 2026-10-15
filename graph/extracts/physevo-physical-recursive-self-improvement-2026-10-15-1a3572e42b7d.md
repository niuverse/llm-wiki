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

[Back to Abstract](/abs/2610.08995v1 "Back to abstract page")

[Download PDF](/pdf/2610.08995v1 "Download PDF")

1. [Abstract](#abstract1 "In PhysEvo: Astra Can Act, Let It")
2. [1 Introduction](#S1 "In PhysEvo: Astra Can Act, Let It")
3. [2 Related Work](#S2 "In PhysEvo: Astra Can Act, Let It")
   1. [Foundation models for robot control.](#S2.SS0.SSS0.Px1 "In 2 Related Work ‣ PhysEvo: Astra Can Act, Let It")
   2. [Self-improving agents.](#S2.SS0.SSS0.Px2 "In 2 Related Work ‣ PhysEvo: Astra Can Act, Let It")
   3. [Experience-driven embodied agents.](#S2.SS0.SSS0.Px3 "In 2 Related Work ‣ PhysEvo: Astra Can Act, Let It")
4. [3 PhysEvo: Physical Recursive Self-Improvement](#S3 "In PhysEvo: Astra Can Act, Let It")
   1. [3.1 One Frozen Model, Two Editable Harnesses](#S3.SS1 "In 3 PhysEvo: Physical Recursive Self-Improvement ‣ PhysEvo: Astra Can Act, Let It")
   2. [3.2 Task Execution and Physical Feedback](#S3.SS2 "In 3 PhysEvo: Physical Recursive Self-Improvement ‣ PhysEvo: Astra Can Act, Let It")
   3. [3.3 Revision, Testing, and Recursive Reuse](#S3.SS3 "In 3 PhysEvo: Physical Recursive Self-Improvement ‣ PhysEvo: Astra Can Act, Let It")
5. [4 The Evolved Embodied Framework](#S4 "In PhysEvo: Astra Can Act, Let It")
   1. [4.1 Joint-Level Control](#S4.SS1 "In 4 The Evolved Embodied Framework ‣ PhysEvo: Astra Can Act, Let It")
   2. [4.2 Active and Retrospective Observation](#S4.SS2 "In 4 The Evolved Embodied Framework ‣ PhysEvo: Astra Can Act, Let It")
   3. [4.3 Reusable Skills and Diagnostic Tools](#S4.SS3 "In 4 The Evolved Embodied Framework ‣ PhysEvo: Astra Can Act, Let It")
6. [5 Experiments](#S5 "In PhysEvo: Astra Can Act, Let It")
   1. [5.1 Experimental Setup](#S5.SS1 "In 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
      1. [Tasks and metrics.](#S5.SS1.SSS0.Px1 "In 5.1 Experimental Setup ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
      2. [Development, sharing, and scoring.](#S5.SS1.SSS0.Px2 "In 5.1 Experimental Setup ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
      3. [Comparison methods.](#S5.SS1.SSS0.Px3 "In 5.1 Experimental Setup ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
   2. [5.2 Performance Across RoboDojo](#S5.SS2 "In 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
   3. [5.3 Comparison with Direct and Hybrid Astra Policies](#S5.SS3 "In 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
   4. [5.4 Manipulation Tasks Challenging Direct Astra](#S5.SS4 "In 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
   5. [5.5 What Changes Through Physical RSI?](#S5.SS5 "In 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
      1. [Making posture a policy decision.](#S5.SS5.SSS0.Px1 "In 5.5 What Changes Through Physical RSI? ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
      2. [Maintaining evidence during action.](#S5.SS5.SSS0.Px2 "In 5.5 What Changes Through Physical RSI? ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
      3. [Inheriting a means of diagnosis.](#S5.SS5.SSS0.Px3 "In 5.5 What Changes Through Physical RSI? ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
   6. [5.6 Real-World Adaptation through Skill Revision](#S5.SS6 "In 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
      1. [Hardware results.](#S5.SS6.SSS0.Px1 "In 5.6 Real-World Adaptation through Skill Revision ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
      2. [Compensating for liquid motion.](#S5.SS6.SSS0.Px2 "In 5.6 Real-World Adaptation through Skill Revision ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
      3. [Changing when geometry is used.](#S5.SS6.SSS0.Px3 "In 5.6 Real-World Adaptation through Skill Revision ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")
7. [6 Discussion and Conclusion](#S6 "In PhysEvo: Astra Can Act, Let It")
8. [References](#bib "In PhysEvo: Astra Can Act, Let It")
9. [A Physical RSI Procedure](#A1 "In PhysEvo: Astra Can Act, Let It")
   1. [Initialization and persistence.](#A1.SS0.SSS0.Px1 "In Appendix A Physical RSI Procedure ‣ PhysEvo: Astra Can Act, Let It")
10. [B Evaluation Details](#A2 "In PhysEvo: Astra Can Act, Let It")
    1. [B.1 Metrics and Aggregation](#A2.SS1 "In Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
       1. [Development and held-out scoring.](#A2.SS1.SSS0.Px1 "In B.1 Metrics and Aggregation ‣ Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
       2. [Episode state and information access.](#A2.SS1.SSS0.Px2 "In B.1 Metrics and Aggregation ‣ Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
    2. [B.2 Comparison Sources and Aggregation](#A2.SS2 "In Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
       1. [Five-dimension comparison.](#A2.SS2.SSS0.Px1 "In B.2 Comparison Sources and Aggregation ‣ Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
       2. [Direct and hybrid Astra policies.](#A2.SS2.SSS0.Px2 "In B.2 Comparison Sources and Aggregation ‣ Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
       3. [Manipulation-challenge subset.](#A2.SS2.SSS0.Px3 "In B.2 Comparison Sources and Aggregation ‣ Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
    3. [B.3 Real-World Scores and Success Criteria](#A2.SS3 "In Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
       1. [Stack blocks.](#A2.SS3.SSS0.Px1 "In B.3 Real-World Scores and Success Criteria ‣ Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
       2. [Stack bowls.](#A2.SS3.SSS0.Px2 "In B.3 Real-World Scores and Success Criteria ‣ Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
       3. [Place pens.](#A2.SS3.SSS0.Px3 "In B.3 Real-World Scores and Success Criteria ‣ Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
       4. [Pour water.](#A2.SS3.SSS0.Px4 "In B.3 Real-World Scores and Success Criteria ‣ Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
       5. [Write PhysEvo.](#A2.SS3.SSS0.Px5 "In B.3 Real-World Scores and Success Criteria ‣ Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It")
11. [C Additional Framework Analysis](#A3 "In PhysEvo: Astra Can Act, Let It")
    1. [C.1 Control-Interface Comparison](#A3.SS1 "In Appendix C Additional Framework Analysis ‣ PhysEvo: Astra Can Act, Let It")
    2. [C.2 Observation Tools](#A3.SS2 "In Appendix C Additional Framework Analysis ‣ PhysEvo: Astra Can Act, Let It")
    3. [C.3 Skill-Guided Observation and Diagnosis](#A3.SS3 "In Appendix C Additional Framework Analysis ‣ PhysEvo: Astra Can Act, Let It")
12. [D Robot and Agent Averages on the Manipulation Subset](#A4 "In PhysEvo: Astra Can Act, Let It")
13. [E Additional Simulation Executions](#A5 "In PhysEvo: Astra Can Act, Let It")
14. [F Task-Agent Input, Output, and Tool Formats](#A6 "In PhysEvo: Astra Can Act, Let It")
    1. [F.1 Input Context](#A6.SS1 "In Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       1. [Task and progress fields.](#A6.SS1.SSS0.Px1 "In F.1 Input Context ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       2. [Arm-state fields.](#A6.SS1.SSS0.Px2 "In F.1 Input Context ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       3. [Gripper-state fields.](#A6.SS1.SSS0.Px3 "In F.1 Input Context ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       4. [Memory, feedback, and budgets.](#A6.SS1.SSS0.Px4 "In F.1 Input Context ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       5. [Skills and image names.](#A6.SS1.SSS0.Px5 "In F.1 Input Context ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
    2. [F.2 Model Output and Function Calls](#A6.SS2 "In Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       1. [Call-envelope fields.](#A6.SS2.SSS0.Px1 "In F.2 Model Output and Function Calls ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       2. [Common decision fields.](#A6.SS2.SSS0.Px2 "In F.2 Model Output and Function Calls ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       3. [Arm-selection fields.](#A6.SS2.SSS0.Px3 "In F.2 Model Output and Function Calls ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
    3. [F.3 Tool Arguments and Execution Feedback](#A6.SS3 "In Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       1. [Observation and geometry fields.](#A6.SS3.SSS0.Px1 "In F.3 Tool Arguments and Execution Feedback ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       2. [Temporal geometry and stopping fields.](#A6.SS3.SSS0.Px2 "In F.3 Tool Arguments and Execution Feedback ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       3. [Control parameters.](#A6.SS3.SSS0.Px3 "In F.3 Tool Arguments and Execution Feedback ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       4. [Tool-result format.](#A6.SS3.SSS0.Px4 "In F.3 Tool Arguments and Execution Feedback ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       5. [Return-envelope fields.](#A6.SS3.SSS0.Px5 "In F.3 Tool Arguments and Execution Feedback ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       6. [Execution-feedback fields.](#A6.SS3.SSS0.Px6 "In F.3 Tool Arguments and Execution Feedback ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")
       7. [Updated step and termination.](#A6.SS3.SSS0.Px7 "In F.3 Tool Arguments and Execution Feedback ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It")

[License: arXiv.org perpetual non-exclusive license](https://info.arxiv.org/help/license/index.html#licenses-available)

arXiv:2610.08995v1 [cs.RO] 06 Oct 2026

# PhysEvo: Astra Can Act, Let It

Wenqing Tian Zeyu Zhang Zhaocheng Liu

Fengwei Liu Qiang Liu Liang Wang
University of Chinese Academy of Sciences

Institute of Automation, Chinese Academy of Sciences

Tsinghua University  Independent Researcher
lio.h.zen@gmail.com  qiang.liu@nlpr.ia.ac.cn

###### Abstract

Astra can act, yet reliable manipulation depends on the system through which it observes and controls the world. We introduce PhysEvo, a framework for physical recursive self-improvement (RSI) around a single frozen model. A task agent executes robot tasks; a meta-agent uses the resulting trajectories to diagnose failures, revise tools and skills, and test corrections. The meta-agent can also improve its own diagnostic tools, so retained revisions support both later action and later self-improvement. This process develops joint-level control, evidence-seeking observation, and reusable manipulation skills without model-weight updates or a separately trained action policy. Across 42 RoboDojo tasks, held-out-layout evaluation of retained task-specific deployment versions yields a five-dimension average score of 68.14/100 and 62.00% success, compared with 47.17% for RoboDawn’s one-shot Astra agent, the strongest published reference in our comparison. On eight manipulation tasks challenging direct Astra, PhysEvo achieves 55.00% success, compared with 1.25% for the direct-Astra reference. Deploying the simulation-evolved harness on AgileX PiPER and continuing skill revision yields 90.60/100 average score and 84.00% success across 25 trials on five real-world tasks. PhysEvo turns the consequences of action into persistent, testable changes to how a frozen model acts and improves.

![Refer to caption](2610.08995v1/overview.png)

Figure 1: Physical RSI in PhysEvo: execute, diagnose, revise, test, and inherit. The lower panel compares success on eight challenging tasks for Direct Astra ([table 3](#S5.T3 "In 5.4 Manipulation Tasks Challenging Direct Astra ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")).

## 1 Introduction

Astra can already control a robot, but demonstrated competence does not guarantee reliable execution. In a ten-task RoboDojo evaluation, direct Astra reaches 100% success on object classification yet succeeds on only 26% of attempts overall. Pairing it with the specialized vision–language–action (VLA) policy π0.5\pi\_{0.5} raises success to 48% ([Su et al., 2026](#bib.bib27)). These results pose a question: *what prevents capabilities that are already present from being used reliably?*

Our executions expose bottlenecks in the *harness*: the tools, skills, and execution logic between the model and the robot. During pouring, the held bottle obscures the wrist view needed to monitor liquid delivery. With a tool-center-point (TCP) interface, local inverse kinematics (IK) can fold the arm into an obstructive posture, while leaving Astra no explicit way to choose the joint configuration ([figures 3](#S5.F3 "In Making posture a policy decision. ‣ 5.5 What Changes Through Physical RSI? ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It") and [4](#S5.F4 "Figure 4 ‣ Maintaining evidence during action. ‣ 5.5 What Changes Through Physical RSI? ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")). These failures call for more than a new action through an unchanged interface: the agent needs a useful view or direct authority over posture.

Why should the same model be able to fix a failure it did not prevent? *Retrospective diagnosis has access to evidence that was unavailable during action selection.* A trajectory reveals the consequences of a command; aligned images, robot states, and code help trace those consequences to a cause. Astra can then propose a concrete intervention, such as maintaining a free-arm side view or exposing joint reconfiguration, and test it through further execution. In our pouring case, revised skill guidance changes the observation strategy, and the subsequent episode succeeds. Physical interaction thus provides both evidence for a correction and a test of whether it works.

A correction need not end with the episode. Retained tools and skills change later execution; retained diagnostic tools change how later failures can be investigated. In our packing case, Astra reuses a review tool it built earlier to trace box displacement to preceding contact and revise clearance guidance ([figure 5](#S5.F5 "In Inheriting a means of diagnosis. ‣ 5.5 What Changes Through Physical RSI? ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")). We call this loop *physical recursive self-improvement* (RSI): experience revises the system used for action and diagnosis, and the revised system is inherited by subsequent rounds.

We introduce PhysEvo, which implements this loop with one frozen Astra in two roles. The task agent observes and controls the robot. The meta-agent inspects execution, edits tools and skills, tests revisions, and retains useful changes, including changes to its own diagnostic resources. The resulting framework combines joint-level control, active and historical observation, geometry tools, and manipulation skills.

Across 42 RoboDojo tasks, held-out-layout evaluation of retained task-specific deployment versions achieves 68.14/100 score and 62.00% success under equal five-dimension weighting. This exceeds the 47.17% reported by RoboDawn’s one-shot Astra agent, the strongest reference in our comparison ([table 1](#S5.T1 "In 5.2 Performance Across RoboDojo ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")) ([Guo et al., 2026a](#bib.bib7)). On the ten-task comparison with direct and hybrid policies, PhysEvo reaches 68.00% success versus 26.00% and 48.00%, respectively. On eight manipulation tasks challenging direct Astra, it reaches 55.00% versus 1.25%, a 53.75-point gain; Simate-beta, the strongest robot-policy reference on this subset, reports 50.83% ([figures 1](#S0.F1 "In PhysEvo: Astra Can Act, Let It") and [3](#S5.T3 "Table 3 ‣ 5.4 Manipulation Tasks Challenging Direct Astra ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")) ([RoboDojo Team, 2026](#bib.bib25); [Zhang et al., 2026d](#bib.bib40)).

On AgileX PiPER, the simulation-evolved harness serves as a starting point for continued adaptation. Across five trials on each of five real-world tasks, PhysEvo achieves a mean score of 90.60/100 and 84.00% success. Revisions compensate for liquid-flow effects and replace geometry-first localization with a visually guided approach followed by close-range geometric refinement ([section 5.6](#S5.SS6 "5.6 Real-World Adaptation through Skill Revision ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")). The same loop can therefore revise both how the robot moves and when it seeks geometric evidence.

Our contributions are (i) a physical RSI framework in which one frozen model acts, revises, and inherits task and meta resources; (ii) an evolved interaction architecture combining joint control, evidence-seeking observation, and reusable skills; and (iii) a 42-task evaluation with mechanism-focused cases and a five-task evaluation of continued adaptation on real hardware.

## 2 Related Work

#### Foundation models for robot control.

Vision–language–action models such as RT-2, OpenVLA, and π0.5\pi\_{0.5} learn control from robot data ([Brohan et al., 2023](#bib.bib2); [Kim et al., 2024](#bib.bib13); [Physical Intelligence et al., 2025](#bib.bib23)). Code as Policies instead composes perception and control APIs, while Inner Monologue incorporates environmental feedback ([Liang et al., 2022](#bib.bib16); [Huang et al., 2022](#bib.bib11)). CaP-X and Guava study tool, action, and observation design ([Fu et al., 2026](#bib.bib6); [Liu et al., 2026a](#bib.bib17)); Show-Harness and obstacle-aware harnesses address embodiment and geometric constraints ([Chen et al., 2026](#bib.bib3); [Xu et al., 2026](#bib.bib34)). RoboDawn couples discrete commands with feedback and demonstrations ([Guo et al., 2026a](#bib.bib7)). Thea and PhyAgentOS structure persistent state and outcome verification ([Wang et al., 2026b](#bib.bib30); [Liu et al., 2026b](#bib.bib18)), while Harness VLA and RoboHarness use execution memory to guide primitives or route heterogeneous policies ([Zhang et al., 2026e](#bib.bib41); [Huang et al., 2026](#bib.bib10)). These systems establish the importance of the interface around a model.

#### Self-improving agents.

Reflexion retains verbal feedback, and GEPA evolves prompts from execution traces ([Shinn et al., 2023](#bib.bib26); [Agrawal et al., 2025](#bib.bib1)). ADAS searches code-defined agents; SICA and DGM modify agent implementations ([Hu et al., 2024](#bib.bib9); [Robeyns et al., 2025](#bib.bib24); [Zhang et al., 2025](#bib.bib38)). AutoHarness, Meta-Harness, and Self-Harness synthesize or revise executable harnesses from feedback ([Lou et al., 2026](#bib.bib20); [Lee et al., 2026b](#bib.bib15); [Zhang et al., 2026a](#bib.bib36)). Recursive Harness Self-Improvement evolves a prompt-level harness with a fixed optimizer ([Lee et al., 2026a](#bib.bib14)), whereas STOP and Hyperagents also modify the improvement procedure ([Zelikman et al., 2023](#bib.bib35); [Zhang et al., 2026b](#bib.bib37)). RRSI regularizes harness edits, and Dream-RSI uses discovery histories to improve exploration ([Xia et al., 2026](#bib.bib32); [Zheng et al., 2026](#bib.bib42)). Hyperagents’ robotics experiment evolves rewards for PPO controllers ([Zhang et al., 2026b](#bib.bib37), App. C.3); PhysEvo instead uses the same frozen model for robot decisions and software revision.

#### Experience-driven embodied agents.

REFLECT diagnoses failures from execution summaries ([Liu et al., 2023](#bib.bib19)); Voyager and RATs accumulate executable skills through interaction and autonomous play ([Wang et al., 2023](#bib.bib28); [Zhang et al., 2026c](#bib.bib39)). EmbodiSkill distinguishes faulty skills from failures to follow valid guidance ([Ju et al., 2026](#bib.bib12)); ASPIRE retains manipulation and debugging knowledge from multimodal traces ([Lu et al., 2026](#bib.bib21)). RoboRSI organizes skills hierarchically ([Noematrix Team, 2026](#bib.bib22)), and Zetta evolves critics, recovery, and tools around a frozen action policy ([Ding et al., 2026](#bib.bib4)). SHAPER evolves skills and context-construction code with one frozen model serving as planner and optimizer, while fixing the action interface and executor ([Wang et al., 2026a](#bib.bib29)). ENPIRE automates real-world policy development ([Xiao et al., 2026](#bib.bib33)). RHO evolves multi-file robot repositories, including prompts, tools, and control code for LLM-in-the-loop execution ([Elmaaroufi et al., 2026](#bib.bib5)). HarnessPAI revises programs and repair skills across rollouts, keeping the selected high-level program fixed within each rollout ([Wang et al., 2026c](#bib.bib31)). PhysEvo focuses on the joint evolution of skills, robot-facing action and observation interfaces, and diagnostic resources: the same frozen model acts through revised interfaces and reuses self-built tools to diagnose later failures.

## 3 PhysEvo: Physical Recursive Self-Improvement

PhysEvo alternates between acting in the environment and revising the system used to act. A single frozen model performs both roles. Physical outcomes provide evidence; tested changes to the harness preserve what is learned from that evidence ([figure 2](#S3.F2 "In 3 PhysEvo: Physical Recursive Self-Improvement ‣ PhysEvo: Astra Can Act, Let It")).

![Refer to caption](2610.08995v1/method.png)

Figure 2: Physical RSI in PhysEvo. A frozen Astra acts through the task harness and revises both task and meta resources from execution feedback. Accepted revisions support later episodes and improvement rounds.

### 3.1 One Frozen Model, Two Editable Harnesses

Let MθM\_{\theta} denote Astra with fixed parameters. At iteration rr, the persistent system consists of a task harness HrtaskH^{\mathrm{task}}\_{r} and a meta harness HrmetaH^{\mathrm{meta}}\_{r}:

|  |  |  |  |
| --- | --- | --- | --- |
|  | Hr=(Hrtask,Hrmeta).H\_{r}=(H^{\mathrm{task}}\_{r},H^{\mathrm{meta}}\_{r}). |  | (1) |

The task harness supplies observations, action tools, execution feedback, and skills. Task-agnostic skills guide operations such as grasp verification and recovery; task-specific skills guide activities such as pouring or packing. The meta harness provides code inspection and editing, trajectory review, diagnostic experiments, and revision testing. The meta-agent may modify either harness, including its own tools. The two roles use separate contexts and tool access but the same model. Model weights, robot dynamics, and the task evaluator are not editable.

Initialization provides a working observation–action loop with TCP targets and local IK, plus a general code-editing workspace. From this starting point, the system develops joint-level control, specialized observation tools, and reusable skills through execution and revision.

### 3.2 Task Execution and Physical Feedback

The task agent receives the instruction, selected skills, camera images, and robot proprioception. It selects an action or observation tool, then uses the returned result to make its next decision. Observation tools can retrieve evidence or calculate geometry without advancing the environment. Motion tools execute commands and return the resulting state and images.

For diagnosis, the harness links each requested action to its dispatched command and observed outcome. An unsuccessful grasp can thus be examined through approach, gripper closure, and subsequent object motion, rather than reduced to a final score. During execution, the same feedback supports closed-loop correction within the episode.

### 3.3 Revision, Testing, and Recursive Reuse

The meta-agent reviews execution alongside the current implementation, forms a failure hypothesis, and tests it through further inspection or diagnostic experiments. A revision may change action or observation tools, execution logic, skills, or diagnostic utilities. When a tool changes, its skill guidance is revised with it so that the agent inherits both a capability and instructions for using it.

Candidate revisions are tested during development, not on the held-out layouts used for final scoring. The meta-agent first checks that edited code runs and tools return the intended outputs. For behavioral changes, it compares the candidate with the current harness on the same task and initial scene. A score gain, or progress beyond the failure without a score decrease, supports adoption; a score decrease leads to rejection. A diagnostic-tool revision is checked against the error or measurement it is intended to address.

Accepted changes take effect between episodes. Changes to the task harness shape later execution; changes to the meta harness shape later diagnosis and revision. A review tool built in one round can therefore support a different correction in a later round. The improvement process thus inherits changes to its own machinery. A retained deployment version is then fixed for that task’s held-out evaluation ([section 5.1](#S5.SS1 "5.1 Experimental Setup ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")). [Appendix A](#A1 "Appendix A Physical RSI Procedure ‣ PhysEvo: Astra Can Act, Let It") gives the full procedure.

## 4 The Evolved Embodied Framework

Physical RSI reshapes what Astra can control, what evidence it can obtain, and what guidance persists. We describe the resulting architecture below; tasks retain their own deployment versions ([section 5.1](#S5.SS1 "5.1 Experimental Setup ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")).

### 4.1 Joint-Level Control

The default control\_arms interface accepts twelve absolute arm-joint targets and two continuous gripper commands. It supports both arms and remains available while an object is held. The executor enforces native actuator limits and checks measured motion; Astra chooses the approach, arm configuration, and reconfiguration.

TCP control asks the model for an end-effector goal and delegates posture selection to IK. Joint control instead makes posture part of the policy decision. This additional authority lets Astra adjust an obstructive configuration and continue manipulation, rather than repeatedly requesting a target from an unsuitable posture. [Section C.1](#A3.SS1 "C.1 Control-Interface Comparison ‣ Appendix C Additional Framework Analysis ‣ PhysEvo: Astra Can Act, Let It") compares the interfaces under fixed model, skill, initialization, and budget.

### 4.2 Active and Retrospective Observation

Astra can move a free arm to obtain a useful wrist-camera view while the other arm manipulates an object. When the relevant event is no longer visible, review\_frames retrieves earlier images and aligned robot states from the current episode without advancing physics. Active viewing seeks new evidence; historical retrieval recovers evidence already observed.

Pixel projection and multi-view triangulation compute geometry for image features selected by Astra. Temporal triangulation uses views collected as a wrist camera moves. The model decides what to inspect and where to look; deterministic tools compute geometry and check validity using images and known camera and robot geometry, not hidden object coordinates. Temporal reconstruction requires a stationary point and a translational viewing baseline.

### 4.3 Reusable Skills and Diagnostic Tools

Skills link tools to the physical conditions under which they are useful: when to verify a grasp, obtain another view, reorient an object, clear an obstacle, or check a release. The pouring skill, for example, maintains a free-arm side view through pouring and upright recovery. A packing skill requires wrist and gripper clearance above raised box flaps before turning. Skills retain these lessons while leaving action decisions to Astra’s closed-loop policy.

The meta harness retains trajectory-review tools that align images, robot states, and policy decisions. The task agent uses runtime tools and selected skills; the meta-agent uses the broader editing and diagnostic workspace. Experience is therefore retained in two forms: guidance for acting and tools for understanding why an action failed.

## 5 Experiments

We first evaluate retained deployment versions on held-out simulation layouts, then examine the revisions behind the resulting framework. On real hardware, we continue skill adaptation after deployment.

### 5.1 Experimental Setup

#### Tasks and metrics.

We evaluate all 42 base RoboDojo simulation tasks across generalization, precision, long-horizon execution, memory, and open-ended instruction following. Native score ranges from 0 to 100; success rate (SR) counts scores of 100. Each task averages one attempt on each of five held-out layouts. The headline comparison weights the five dimensions equally after averaging tasks within each dimension. We also report the equal-task average and two task-level comparisons covering 16 distinct tasks ([tables 2](#S5.T2 "In 5.3 Comparison with Direct and Hybrid Astra Policies ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It") and [3](#S5.T3 "Table 3 ‣ 5.4 Manipulation Tasks Challenging Direct Astra ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")).

#### Development, sharing, and scoring.

Simulation self-improvement precedes scoring. Development resources are shared across tasks; at the task-agent level, only tools and task-agnostic skills are shared, while task-specific skills remain task-local. Each task retains a deployment version that stays fixed across its five scored layouts. Scored layouts are excluded from revision and version selection. Before each scored episode, we reset session context, historical-frame indices, and writable memory. Online correction and same-episode history are allowed, but persistent tools and skills do not change. [Appendix B](#A2 "Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It") details these boundaries.

#### Comparison methods.

References include RoboDojo robot and language-model policies ([RoboDojo Team, 2026](#bib.bib25); [Zhang et al., 2026d](#bib.bib40)), GPT-as-Policy’s direct Astra and Astra–π0.5\pi\_{0.5} hybrid ([Su et al., 2026](#bib.bib27)), and RoboDawn’s one-shot Astra agent with closed-loop feedback and in-context demonstrations ([Guo et al., 2026a](#bib.bib7)). Bold and underlining indicate the best and second-best values within each comparison panel.

### 5.2 Performance Across RoboDojo

Under five-dimension weighting, PhysEvo achieves 68.14/100 score and 62.00% SR, exceeding RoboDawn one-shot’s 47.17% SR by 14.83 points ([table 1](#S5.T1 "In 5.2 Performance Across RoboDojo ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")). This is the highest reported average among the compared methods, including an Astra agent already equipped with feedback and demonstrations. Equal weighting of all 42 tasks instead gives 65.00 score and 58.57% SR.

Relative to RoboDawn, PhysEvo improves SR by 46.67 percentage points in memory, 17.50 in open-ended tasks, and 15.00 in precision. These gains combine stronger memory and instruction-dependent performance with improved precision ([table 1](#S5.T1 "In 5.2 Performance Across RoboDojo ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")).

Table 1: RoboDojo performance across five capability dimensions. The average weights dimensions equally.

|  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Method | General. | | Precision | | Long-horizon | | Memory | | Open | | Average | |
|  | Score | SR (%) | Score | SR (%) | Score | SR (%) | Score | SR (%) | Score | SR (%) | Score | SR (%) |
| Robot policies | | | | | | | | | | | | |
| Simate-beta | 35.09 | 27.95 | 34.35 | 26.92 | 57.84 | 43.42 | 33.33 | 33.00 | 9.12 | 8.50 | 33.95 | 27.96 |
| Liber-0 Preview | 24.99 | 18.61 | 38.28 | 33.17 | 45.98 | 33.17 | 37.77 | 37.33 | 6.68 | 5.33 | 30.74 | 25.52 |
| Liber-0 Lite | 25.36 | 19.11 | 36.60 | 31.08 | 45.50 | 32.92 | 35.68 | 35.44 | 3.06 | 2.58 | 29.24 | 24.23 |
| DM0.5 | 15.78 | 10.95 | 24.82 | 16.75 | 33.70 | 19.50 | 47.74 | 47.44 | 2.43 | 2.08 | 24.90 | 19.34 |
| GalaxeaVLA G0.5 | 18.46 | 12.83 | 28.25 | 20.42 | 44.12 | 32.25 | 8.61 | 7.33 | 1.73 | 1.58 | 20.23 | 14.88 |
| Xiaomi-Robotics-1 | 23.55 | 17.00 | 26.69 | 18.83 | 38.39 | 23.67 | 7.81 | 6.56 | 3.94 | 3.58 | 20.07 | 13.93 |
| OpenWAM-α\alpha | 20.71 | 14.84 | 18.45 | 9.25 | 34.93 | 25.33 | 10.41 | 9.11 | 1.41 | 1.08 | 17.18 | 11.92 |
| π0.5\pi\_{0.5} | 13.38 | 8.17 | 12.40 | 5.50 | 23.54 | 14.67 | 5.89 | 4.67 | 1.98 | 1.67 | 11.44 | 6.93 |
| Language-model policies | | | | | | | | | | | | |
| Official Astra | 33.36 | 30.50 | 12.65 | 4.00 | 21.45 | 8.25 | 43.04 | 38.67 | 34.36 | 31.00 | 28.97 | 22.48 |
| GPT-5.5 | 0.20 | 0.00 | 0.42 | 0.00 | 0.51 | 0.00 | 1.67 | 1.67 | 2.87 | 2.75 | 1.13 | 0.88 |
| DeepSeek-Flash | 2.42 | 1.67 | 1.75 | 0.00 | 2.12 | 0.00 | 2.17 | 1.67 | 6.50 | 6.25 | 2.99 | 1.92 |
| RoboDawn (1-shot) | 55.08 | 50.00 | 35.88 | 25.00 | 59.88 | 45.00 | 54.33 | 53.33 | 68.00 | 62.50 | 54.63 | 47.17 |
| PhysEvo (ours) | 51.08 | 45.00 | 50.38 | 40.00 | 56.38 | 45.00 | 100.00 | 100.00 | 82.88 | 80.00 | 68.14 | 62.00 |

RoboDawn uses GPT-6 Astra with one in-context demonstration; its Score and SR follow the public evaluation records.

### 5.3 Comparison with Direct and Hybrid Astra Policies

On the ten-task GPT-as-Policy set, PhysEvo reaches 68.00% SR, versus 26.00% for direct Astra and 48.00% for the hybrid ([table 2](#S5.T2 "In 5.3 Comparison with Direct and Hybrid Astra Policies ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")). The three systems organize Astra’s capabilities differently: direct action, delegation to a trained VLA, or action through an experience-revised harness.

PhysEvo improves SR over Direct on eight tasks and ties on two. Gains span language-conditioned classification, sorting imitation, and number arrangement, as well as packing and bottle disposal. An experience-revised harness thus offers a route to higher aggregate performance without a separately trained action policy.

Table 2: Comparison on the ten-task GPT-as-Policy evaluation set. Hybrid combines Astra with π0.5\pi\_{0.5}; Direct uses Astra alone.

| Task | G0.5 | | Xiaomi | | O-WAM | | Hybrid | | Direct | | PhysEvo | |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | Score | SR | Score | SR | Score | SR | Score | SR | Score | SR | Score | SR |
| Organize table | 46.33 | 11.33 | 57.67 | 14.67 | 62.50 | 13.33 | 60.00 | 0.00 | 30.00 | 0.00 | 60.00 | 0.00 |
| Classify by language | 1.07 | 0.00 | 2.00 | 0.67 | 1.33 | 0.00 | 38.00 | 20.00 | 60.00 | 40.00 | 100.00 | 100.00 |
| Imitate sorting | 1.67 | 0.00 | 2.50 | 0.67 | 2.90 | 0.67 | 53.00 | 40.00 | 0.00 | 0.00 | 100.00 | 100.00 |
| Largest number | 4.11 | 0.53 | 8.56 | 3.73 | 4.36 | 0.53 | 50.00 | 40.00 | 57.00 | 40.00 | 100.00 | 100.00 |
| Pack objects | 17.12 | 2.93 | 18.69 | 2.40 | 20.83 | 3.73 | 50.00 | 20.00 | 50.00 | 20.00 | 70.00 | 40.00 |
| Classify objects | 10.33 | 4.00 | 17.20 | 8.67 | 5.53 | 1.33 | 71.00 | 60.00 | 100.00 | 100.00 | 100.00 | 100.00 |
| Build tower | 82.93 | 78.67 | 52.60 | 47.33 | 52.53 | 38.67 | 64.00 | 60.00 | 12.00 | 0.00 | 40.00 | 20.00 |
| Make kong | 90.00 | 90.00 | 41.33 | 41.33 | 32.00 | 32.00 | 40.00 | 40.00 | 0.00 | 0.00 | 60.00 | 60.00 |
| Fold clothes | 32.75 | 28.00 | 41.49 | 38.93 | 51.31 | 49.07 | 100.00 | 100.00 | 40.00 | 40.00 | 68.00 | 60.00 |
| Bottles into dustbin | 96.30 | 94.00 | 97.70 | 96.67 | 94.03 | 91.33 | 100.00 | 100.00 | 36.00 | 20.00 | 100.00 | 100.00 |
| Mean | 38.26 | 30.95 | 33.97 | 25.51 | 32.73 | 23.07 | 62.60 | 48.00 | 38.50 | 26.00 | 79.80 | 68.00 |

Score is on a 0–100 scale; SR is in percent. The three VLA references have the highest ten-task average scores in the source report ([Su et al., 2026](#bib.bib27)). G0.5 = GalaxeaVLA (G0.5); Xiaomi = Xiaomi-Robotics-1; O-WAM = OpenWAM-α\alpha.

### 5.4 Manipulation Tasks Challenging Direct Astra

The RoboDojo Astra report identifies eight tasks with VLA SR ≥20%\geq 20\% and direct-Astra SR <5%<5\% ([Zhang et al., 2026d](#bib.bib40)). This externally defined subset tests whether improvement reaches manipulation tasks that direct Astra rarely completes.

PhysEvo achieves 55.00% SR and 62.88 score, compared with official Astra’s 1.25% and 5.96: a 53.75-point SR gain ([table 3](#S5.T3 "In 5.4 Manipulation Tasks Challenging Direct Astra ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")). Its mean SR also exceeds Simate-beta’s 50.83%, Liber-0 Preview’s 46.44%, and RoboDawn’s 45.00%.

On the two pouring tasks, PhysEvo improves SR over RoboDawn from 0% to 80% for pouring balls and from 80% to 100% for pouring liquid. These gains align with the observation and pouring cases below.

Table 3: Eight manipulation tasks challenging direct Astra. PhysEvo results average five layouts per task. The task set is defined by the RoboDojo report, with VLA SR ≥20%\geq 20\% and Astra SR <5%<5\%.

| Task | Official Astra | | G0.5 | | Simate-beta | | Liber-0 Preview | | RoboDawn | | PhysEvo | |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  | Score | SR | Score | SR | Score | SR | Score | SR | Score | SR | Score | SR |
| Make kong | 0.00 | 0.00 | 90.00 | 90.00 | 76.00 | 76.00 | 18.00 | 18.00 | 60.00 | 60.00 | 60.00 | 60.00 |
| Build tower | 16.40 | 2.00 | 82.93 | 78.67 | 87.40 | 83.33 | 84.33 | 81.00 | 54.00 | 40.00 | 40.00 | 20.00 |
| Insert tubes | 6.00 | 0.00 | 58.53 | 42.67 | 41.20 | 22.00 | 82.53 | 73.00 | 88.00 | 80.00 | 88.00 | 80.00 |
| Tic-tac-toe | 10.70 | 0.00 | 65.23 | 40.00 | 86.27 | 60.67 | 95.67 | 89.00 | 100.00 | 100.00 | 100.00 | 100.00 |
| Pour balls into vase | 4.00 | 4.00 | 28.00 | 28.00 | 45.33 | 45.33 | 30.67 | 31.00 | 0.00 | 0.00 | 80.00 | 80.00 |
| Pour liquid into cup | 4.00 | 4.00 | 35.34 | 35.34 | 55.33 | 55.33 | 34.67 | 34.50 | 80.00 | 80.00 | 100.00 | 100.00 |
| Laptop / headphones | 1.60 | 0.00 | 28.27 | 11.34 | 53.87 | 34.00 | 38.14 | 20.00 | 12.00 | 0.00 | 16.00 | 0.00 |
| Fill pen holder | 5.00 | 0.00 | 41.27 | 18.67 | 50.37 | 30.00 | 49.77 | 25.00 | 26.00 | 0.00 | 19.00 | 0.00 |
| Mean | 5.96 | 1.25 | 53.70 | 43.09 | 61.97 | 50.83 | 54.22 | 46.44 | 52.50 | 45.00 | 62.88 | 55.00 |

SR is in percent. G0.5 = GalaxeaVLA (G0.5); RoboDawn uses GPT-6 Astra, 1-shot. For Simate-beta and Liber-0 Preview, Std/Rand Score and SR are averaged within task before the eight-task mean. Further references appear in [appendix D](#A4 "Appendix D Robot and Agent Averages on the Manipulation Subset ‣ PhysEvo: Astra Can Act, Let It").

### 5.5 What Changes Through Physical RSI?

Three cases trace execution feedback to concrete changes in control, observation, and diagnosis.

#### Making posture a policy decision.

[Figure 3](#S5.F3 "In Making posture a policy decision. ‣ 5.5 What Changes Through Physical RSI? ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It") shows two independent executions: an obstructive fold under TCP control with local IK, and recovery from a rejected TCP motion through joint reconfiguration. End-effector goals leave posture to IK; joint control makes that missing choice expressible. In a focused two-layout comparison with the model, skill, initialization, and budget fixed, mean scores are 40 for TCP, 100 for Joint, and 55 for Both (six episodes; [section C.1](#A3.SS1 "C.1 Control-Interface Comparison ‣ Appendix C Additional Framework Analysis ‣ PhysEvo: Astra Can Act, Let It")). Joint outperforming Both in this comparison also shows that a larger tool menu alone is not sufficient.

![Refer to caption](2610.08995v1/control.png)

Figure 3: Joint reconfiguration enables recovery from an obstructive arm posture.

#### Maintaining evidence during action.

A pouring failure occurs while the bottle blocks the holding arm’s wrist view. Revising the pouring skill, with the other loaded skills fixed, directs the free arm to maintain a side view through pouring and recovery. The task agent then checks the bottle mouth, cup rim, liquid landing point, and clearance, corrects its motion, and completes the task ([figure 4](#S5.F4 "In Maintaining evidence during action. ‣ 5.5 What Changes Through Physical RSI? ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")). The revised skill keeps existing sensors useful as manipulation alters visibility.

![Refer to caption](2610.08995v1/observation.png)

Figure 4: Skill revision maintains a useful view throughout pouring and recovery.

#### Inheriting a means of diagnosis.

In [figure 5](#S5.F5 "In Inheriting a means of diagnosis. ‣ 5.5 What Changes Through Physical RSI? ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It"), the meta-agent invokes a review tool built in an earlier round. Aligned images, robot states, and policy decisions help trace box displacement to wrist or gripper contact with raised flaps. The skill is then revised to require clearance above the flaps before turning. In the revised execution, the task agent follows this guidance and avoids pushing the box away. The final symptom, a box out of reach, thus leads to a specific intervention on the preceding contact. Crucially, a diagnostic resource created by one improvement round helps produce a correction in another: the system inherits a way to improve, not only a way to act.

![Refer to caption](2610.08995v1/diagnosis.png)

Figure 5: An inherited review tool supports a later packing-skill revision.

### 5.6 Real-World Adaptation through Skill Revision

We deploy the simulation-evolved harness on an AgileX PiPER platform and continue the execution–revision loop. After each attempt, the meta-agent analyzes the trajectory and revises skills; the task agent uses those revisions in the next attempt. These cycles yield successful executions of block stacking, bowl stacking, pen placement, liquid pouring, and writing “PhysEvo” with a pen ([figure 6](#S5.F6 "In Changing when geometry is used. ‣ 5.6 Real-World Adaptation through Skill Revision ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")).

#### Hardware results.

We report five trials per task, for 25 trials in total ([table 4](#S5.T4 "In Hardware results. ‣ 5.6 Real-World Adaptation through Skill Revision ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It")). PhysEvo achieves a mean score of 90.60/100 and 84.00% SR. Block stacking, bowl stacking, and pen placement each achieve 100% SR; pouring and writing each achieve 60% SR. [Section B.3](#A2.SS3 "B.3 Real-World Scores and Success Criteria ‣ Appendix B Evaluation Details ‣ PhysEvo: Astra Can Act, Let It") specifies the task-level scoring rules.

Table 4: Real-world performance on AgileX PiPER. Each task has five trials.

| Task | Score | SR (%) |
| --- | --- | --- |
| Stack blocks | 100.00 | 100.00 |
| Stack bowls | 100.00 | 100.00 |
| Place pens | 100.00 | 100.00 |
| Pour water | 60.00 | 60.00 |
| Write PhysEvo | 93.00 | 60.00 |
| Overall | 90.60 | 84.00 |

Two revisions illustrate how physical discrepancies change the inherited skills.

#### Compensating for liquid motion.

The liquid stream’s forward momentum causes it to overshoot the cup. The meta-agent revises the pouring skill to shift the bottle opening backward relative to the cup, compensating for the observed displacement. The hardware revision changes the action to account for the observed flow.

#### Changing when geometry is used.

Our physical arm has lower positioning accuracy than its simulated counterpart, and localization from the initial distant view is often unreliable. The revised skill reverses the geometry-first sequence: visual feedback guides a coarse approach, then geometry provides close-range localization for fine positioning. By changing the order of perception and action, the revised skill uses geometry under more reliable viewing conditions.

These cases demonstrate continued post-deployment adaptation. Additional simulation executions appear in [appendix E](#A5 "Appendix E Additional Simulation Executions ‣ PhysEvo: Astra Can Act, Let It").

![Refer to caption](2610.08995v1/hardware_gallery.png)

Figure 6: Five AgileX PiPER tasks after trajectory-driven skill revision. Each row shows one execution in time; alternate final views are marked.

## 6 Discussion and Conclusion

PhysEvo uses physical consequences to revise the tools, skills, and diagnostic resources of a frozen Astra. Its retained deployment versions achieve 62.00% success under five-dimension weighting across 42 RoboDojo tasks. The cases identify three ways experience changes the system: exposing posture control, maintaining useful observations, and inheriting tools for later diagnosis. On AgileX PiPER, the same loop adapts skills to liquid motion and localization discrepancies, with a mean score of 90.60/100 and 84.00% success across five tasks. The central lesson is that experience can improve not only the next action, but the interface and diagnostic resources available to future actions.

## References

* Agrawal et al. (2025)

  Lakshya A Agrawal, Shangyin Tan, Dilara Soylu, Noah Ziems, Rishi Khare, Krista
  Opsahl-Ong, Arnav Singhvi, Herumb Shandilya, Michael J Ryan, Meng Jiang,
  Christopher Potts, Koushik Sen, Alexandros G. Dimakis, Ion Stoica, Dan Klein,
  Matei Zaharia, and Omar Khattab.
  GEPA: Reflective prompt evolution can outperform reinforcement
  learning.
  *arXiv preprint arXiv:2507.19457*, 2025.
  URL <https://arxiv.org/abs/2507.19457>.
* Brohan et al. (2023)

  Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Xi Chen,
  Krzysztof Choromanski, Tianli Ding, Danny Driess, Avinava Dubey, Chelsea
  Finn, Pete Florence, Chuyuan Fu, Montse Gonzalez Arenas, Keerthana
  Gopalakrishnan, Kehang Han, Karol Hausman, Alexander Herzog, Jasmine Hsu,
  Brian Ichter, Alex Irpan, Nikhil Joshi, Ryan Julian, Dmitry Kalashnikov,
  Yuheng Kuang, Isabel Leal, Lisa Lee, Tsang-Wei Edward Lee, Sergey Levine, Yao
  Lu, Henryk Michalewski, Igor Mordatch, Karl Pertsch, Kanishka Rao, Krista
  Reymann, Michael Ryoo, Grecia Salazar, Pannag Sanketi, Pierre Sermanet,
  Jaspiar Singh, Anikait Singh, Radu Soricut, Huong Tran, Vincent Vanhoucke,
  Quan Vuong, Ayzaan Wahid, Stefan Welker, Paul Wohlhart, Jialin Wu, Fei Xia,
  Ted Xiao, Peng Xu, Sichun Xu, Tianhe Yu, and Brianna Zitkovich.
  RT-2: Vision-language-action models transfer web knowledge to
  robotic control.
  *arXiv preprint arXiv:2307.15818*, 2023.
  URL <https://arxiv.org/abs/2307.15818>.
* Chen et al. (2026)

  Yanzhe Chen, Zechen Bai, Zhijun Cao, Wenzheng Zeng, Kevin Qinghong Lin, Yiqi
  Lin, Guoqiang Liang, Kevin Yuchen Ma, Qiming Huang, and Mike Zheng Shou.
  Show-Harness: Just a VLM agent can play robots.
  *arXiv preprint arXiv:2609.10522*, 2026.
  URL <https://arxiv.org/abs/2609.10522>.
* Ding et al. (2026)

  Xin Ding et al.
  Zetta: An efficient closed-loop embodied harness for self-evolving
  physical intelligence.
  *arXiv preprint arXiv:2608.16590*, 2026.
  URL <https://arxiv.org/abs/2608.16590>.
* Elmaaroufi et al. (2026)

  Karim Elmaaroufi, Justin Svegliato, Sarunas Kalade, Graham Schelle, Sanjit A.
  Seshia, and Matei Zaharia.
  RHO: Your coding agent is secretly a roboticist.
  *arXiv preprint arXiv:2606.16458*, 2026.
  URL <https://arxiv.org/abs/2606.16458>.
* Fu et al. (2026)

  Letian Fu et al.
  CaP-X: A framework for benchmarking and improving coding agents for
  robot manipulation.
  *arXiv preprint arXiv:2603.22435*, 2026.
  URL <https://arxiv.org/abs/2603.22435>.
* Guo et al. (2026a)

  Meng-Hao Guo, Zhe-Han Mo, Jia-Jun Wang, Yi Zhang, Kejin Wang, Yi-Xuan Deng,
  Jia-Peng Zhang, Yongming Rao, and Shi-Min Hu.
  Transferring the intelligence of VLMs to robotic control.
  *arXiv preprint arXiv:2609.22966*, 2026a.
  URL <https://arxiv.org/abs/2609.22966>.
* Guo et al. (2026b)

  Meng-Hao Guo, Zhe-Han Mo, Jia-Jun Wang, Yi Zhang, Kejin Wang, Yi-Xuan Deng,
  Jia-Peng Zhang, Yongming Rao, and Shi-Min Hu.
  RoboDawn: Public task-level evaluation results, 2026b.
  URL <https://robodawn.top/results/>.
  RoboDojo, GPT-6 Astra, one-shot setting; five runs per task. Recorded
  26 September 2026.
* Hu et al. (2024)

  Shengran Hu, Cong Lu, and Jeff Clune.
  Automated design of agentic systems.
  *arXiv preprint arXiv:2408.08435*, 2024.
  URL <https://arxiv.org/abs/2408.08435>.
* Huang et al. (2026)

  Jinbang Huang, Yuanzhao Hu, Zhiyuan Li, Ran Qi, Yixin Xiao, Zhanguang Zhang,
  Mark Coates, Tongtong Cao, and Yingxue Zhang.
  RoboHarness: Memory-driven orchestration of heterogeneous robot
  policies for long-horizon planning.
  *arXiv preprint arXiv:2607.18060*, 2026.
  URL <https://arxiv.org/abs/2607.18060>.
* Huang et al. (2022)

  Wenlong Huang, Fei Xia, Ted Xiao, Harris Chan, Jacky Liang, Pete Florence, Andy
  Zeng, Jonathan Tompson, Igor Mordatch, Yevgen Chebotar, Pierre Sermanet, Noah
  Brown, Tomas Jackson, Linda Luu, Sergey Levine, Karol Hausman, and Brian
  Ichter.
  Inner Monologue: Embodied reasoning through planning with language
  models.
  *arXiv preprint arXiv:2207.05608*, 2022.
  URL <https://arxiv.org/abs/2207.05608>.
* Ju et al. (2026)

  Ruofei Ju, Xinrui Wang, Xin Ding, Yifan Yang, Hao Wu, Shiqi Jiang, Qianxi
  Zhang, Hao Wen, Xiangyu Li, Weijun Wang, Kun Li, Yunxin Liu, Haipeng Dai, Wei
  Wang, and Ting Cao.
  EmbodiSkill: Skill-aware reflection for self-evolving embodied
  agents.
  *arXiv preprint arXiv:2605.10332*, 2026.
  URL <https://arxiv.org/abs/2605.10332>.
* Kim et al. (2024)

  Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, Ashwin Balakrishna,
  Suraj Nair, Rafael Rafailov, Ethan Foster, Grace Lam, Pannag Sanketi, Quan
  Vuong, Thomas Kollar, Benjamin Burchfiel, Russ Tedrake, Dorsa Sadigh, Sergey
  Levine, Percy Liang, and Chelsea Finn.
  OpenVLA: An open-source vision-language-action model.
  *arXiv preprint arXiv:2406.09246*, 2024.
  URL <https://arxiv.org/abs/2406.09246>.
* Lee et al. (2026a)

  Hyunin Lee, Jinglue Xu, Jeffrey Seely, Donghyun Lee, Matei Zaharia, and Yujin
  Tang.
  Recursive harness self-improvement.
  *arXiv preprint arXiv:2607.15524*, 2026a.
  URL <https://arxiv.org/abs/2607.15524>.
* Lee et al. (2026b)

  Yoonho Lee, Roshen Nair, Qizheng Zhang, Kangwook Lee, Omar Khattab, and Chelsea
  Finn.
  Meta-Harness: End-to-end optimization of model harnesses.
  *arXiv preprint arXiv:2603.28052*, 2026b.
  URL <https://arxiv.org/abs/2603.28052>.
* Liang et al. (2022)

  Jacky Liang, Wenlong Huang, Fei Xia, Peng Xu, Karol Hausman, Brian Ichter, Pete
  Florence, and Andy Zeng.
  Code as policies: Language model programs for embodied control.
  *arXiv preprint arXiv:2209.07753*, 2022.
  URL <https://arxiv.org/abs/2209.07753>.
* Liu et al. (2026a)

  Haowen Liu, Xirui Li, Shaoxiong Yao, Peng Shi, Tianyi Zhou, Jia-Bin Huang,
  Furong Huang, and Jiayuan Mao.
  Guava: An effective and universal harness for embodied
  manipulation.
  *arXiv preprint arXiv:2606.18363*, 2026a.
  URL <https://arxiv.org/abs/2606.18363>.
* Liu et al. (2026b)

  Yang Liu, Weixing Chen, Xinshuai Song, Tao Pu, Siwen Mo, Yongjie Bai, Zihao
  Chen, Qianran Sun, Liruo Zhong, Ying Shen, and Liang Lin.
  PhyAgentOS: A self-evolving operating system for embodied agents
  with decoupled cognitive planning and physical execution.
  *arXiv preprint arXiv:2607.16636*, 2026b.
  URL <https://arxiv.org/abs/2607.16636>.
* Liu et al. (2023)

  Zeyi Liu, Arpit Bahety, and Shuran Song.
  REFLECT: Summarizing robot experiences for failure explanation and
  correction.
  *arXiv preprint arXiv:2306.15724*, 2023.
  URL <https://arxiv.org/abs/2306.15724>.
* Lou et al. (2026)

  Xinghua Lou, Miguel Lázaro-Gredilla, Antoine Dedieu, Carter Wendelken,
  Wolfgang Lehrach, and Kevin P. Murphy.
  AutoHarness: Improving LLM agents by automatically synthesizing a
  code harness.
  *arXiv preprint arXiv:2603.03329*, 2026.
  URL <https://arxiv.org/abs/2603.03329>.
* Lu et al. (2026)

  Runyu Lu, Yubo Wu, Ethan Kou, Letian Fu, Wenli Xiao, Ajay Mandlekar, Yinzhen
  Xu, Guanya Shi, Ken Goldberg, Ang Chen, Mosharaf Chowdhury, Yuke Zhu, Linxi
  Fan, and Guanzhi Wang.
  ASPIRE: Agentic /skills discovery for robotics.
  *arXiv preprint arXiv:2607.00272*, 2026.
  URL <https://arxiv.org/abs/2607.00272>.
* Noematrix Team (2026)

  Noematrix Team.
  RoboRSI: Stable, efficient, and reusable robot self-evolution in
  complex real-world environments.
  Noematrix Lab research blog, September 2026.
  URL <https://lab.noematrix.ai/blog/2-roborsi/>.
  Accessed 21 September 2026.
* Physical Intelligence et al. (2025)

  Physical Intelligence, Kevin Black, Noah Brown, James Darpinian, Karan
  Dhabalia, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo
  Fusai, Manuel Y. Galliker, Dibya Ghosh, Lachy Groom, Karol Hausman, Brian
  Ichter, Szymon Jakubczak, Tim Jones, Liyiming Ke, Devin LeBlanc, Sergey
  Levine, Adrian Li-Bell, Mohith Mothukuri, Suraj Nair, Karl Pertsch, Allen Z.
  Ren, Lucy Xiaoyang Shi, Laura Smith, Jost Tobias Springenberg, Kyle
  Stachowicz, James Tanner, Quan Vuong, Homer Walke, Anna Walling, Haohuan
  Wang, Lili Yu, and Ury Zhilinsky.
  π0.5\pi\_{0.5}: A vision-language-action model with open-world
  generalization.
  *arXiv preprint arXiv:2504.16054*, 2025.
  URL <https://arxiv.org/abs/2504.16054>.
* Robeyns et al. (2025)

  Maxime Robeyns, Martin Szummer, and Laurence Aitchison.
  A self-improving coding agent.
  *arXiv preprint arXiv:2504.15228*, 2025.
  URL <https://arxiv.org/abs/2504.15228>.
* RoboDojo Team (2026)

  RoboDojo Team.
  RoboDojo Simulation Leaderboard, 2026.
  URL <https://robodojo-benchmark.com/leaderboard>.
  Data updated 23 September 2026; task-level results recorded 26
  September 2026.
* Shinn et al. (2023)

  Noah Shinn, Federico Cassano, Edward Berman, Ashwin Gopinath, Karthik
  Narasimhan, and Shunyu Yao.
  Reflexion: Language agents with verbal reinforcement learning.
  *arXiv preprint arXiv:2303.11366*, 2023.
  URL <https://arxiv.org/abs/2303.11366>.
* Su et al. (2026)

  Jiayi Su, Yixin Zheng, Mi Yan, Li Yi, Zhizheng Zhang, and He Wang.
  GPT 6 Astra as an embodied policy.
  Technical report and code, 2026.
  URL <https://github.com/anonymous-report-421/GPT-as-Policy>.
  Accessed 21 September 2026.
* Wang et al. (2023)

  Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu,
  Linxi Fan, and Anima Anandkumar.
  Voyager: An open-ended embodied agent with large language models.
  *arXiv preprint arXiv:2305.16291*, 2023.
  URL <https://arxiv.org/abs/2305.16291>.
* Wang et al. (2026a)

  Peidong Wang, Zhiming Ma, Ying Chang, Xufang Luo, Yiqun Zhang, Zihan Wang,
  Xiaocui Yang, Shi Feng, Yuqing Yang, and Dongsheng Li.
  Self-evolving embodied agents via skill-harness evolution.
  *arXiv preprint arXiv:2608.11350*, 2026a.
  URL <https://arxiv.org/abs/2608.11350>.
* Wang et al. (2026b)

  Qi Wang, Tianyi Wang, Chengyang Li, Shikun Ban, Yurun Chen, Yizhong Ge, Jason
  Qin, Chengtai Li, and Wentao Zhu.
  Towards the harness of embodied agents.
  *arXiv preprint arXiv:2608.11246*, 2026b.
  URL <https://arxiv.org/abs/2608.11246>.
* Wang et al. (2026c)

  Xin Wang, Wenhao Wu, Menghao Zhang, Zhi Wang, Kun Shao, Jian Luan, Yang Li,
  Qing Li, Shangding Gu, Huichi Zhou, Shuqing Shi, Fei Ni, Shuo Lu, Weicheng
  Meng, Kang Li, Jin Wu, Kang Zhao, Shangmin Guo, Gen Li, Yongqiang Tang,
  Zhizhong Zhang, Yuan Xie, and Heng Qu.
  HarnessPAI: An evolving harness for physical AI.
  *arXiv preprint arXiv:2609.29166*, 2026c.
  URL <https://arxiv.org/abs/2609.29166>.
* Xia et al. (2026)

  Peng Xia, Rujun Han, Zifeng Wang, Yanfei Chen, Yufan Zhuang, Yoonho Lee,
  Chengsong Huang, Han Yu, Zhongying CuiZhu, Yifei Ming, Huaxiu Yao, Burak
  Gokturk, Tomas Pfister, and Chen-Yu Lee.
  RRSI: Regularized recursive self-improvement of agent harnesses.
  *arXiv preprint arXiv:2609.24972*, 2026.
  URL <https://arxiv.org/abs/2609.24972>.
* Xiao et al. (2026)

  Wenli Xiao, Jia Xie, Tonghe Zhang, Haotian Lin, Letian Fu, Haoru Xue, Jalen Lu,
  Yi Yang, Cunxi Dai, Zi Wang, Jimmy Wu, Guanzhi Wang, S. Shankar Sastry, Ken
  Goldberg, Linxi Fan, Yuke Zhu, and Guanya Shi.
  ENPIRE: Agentic robot policy self-improvement in the real world.
  *arXiv preprint arXiv:2606.19980*, 2026.
  URL <https://arxiv.org/abs/2606.19980>.
* Xu et al. (2026)

  Bingxin Xu, Yuzhang Shang, Zhen Dong, and Emilio Ferrara.
  Coding agents with an obstacle-aware harness for safe robot
  manipulation.
  *arXiv preprint arXiv:2609.20822*, 2026.
  URL <https://arxiv.org/abs/2609.20822>.
* Zelikman et al. (2023)

  Eric Zelikman, Eliana Lorch, Lester Mackey, and Adam Tauman Kalai.
  Self-taught optimizer (STOP): Recursively self-improving code
  generation.
  *arXiv preprint arXiv:2310.02304*, 2023.
  URL <https://arxiv.org/abs/2310.02304>.
* Zhang et al. (2026a)

  Hangfan Zhang, Shao Zhang, Kangcong Li, Chen Zhang, Yang Chen, Yiqun Zhang, Lei
  Bai, and Shuyue Hu.
  Self-Harness: Harnesses that improve themselves.
  *arXiv preprint arXiv:2606.09498*, 2026a.
  URL <https://arxiv.org/abs/2606.09498>.
* Zhang et al. (2026b)

  Jenny Zhang, Bingchen Zhao, Wannan Yang, Jakob Foerster, Jeff Clune, Minqi
  Jiang, Sam Devlin, and Tatiana Shavrina.
  Hyperagents.
  *arXiv preprint arXiv:2603.19461*, 2026b.
  URL <https://arxiv.org/abs/2603.19461>.
* Zhang et al. (2025)

  Jenny Zhang et al.
  Darwin Godel Machine: Open-ended evolution of self-improving
  agents.
  *arXiv preprint arXiv:2505.22954*, 2025.
  URL <https://arxiv.org/abs/2505.22954>.
* Zhang et al. (2026c)

  Junyi Zhang, Jiaxin Ge, Hanjun Yoo, Letian Fu, Zihan Yang, Yaowei Liu, Raj
  Saravanan, Shaofeng Yin, Justin Yu, Dantong Niu, Zirui Wang, Roei Herzig, Ken
  Goldberg, Yutong Bai, David M. Chan, Ion Stoica, Angjoo Kanazawa, Jiahui Lei,
  Haiwen Feng, and Trevor Darrell.
  Playful agentic robot learning.
  *arXiv preprint arXiv:2606.19419*, 2026c.
  URL <https://arxiv.org/abs/2606.19419>.
* Zhang et al. (2026d)

  Wenbo Zhang, Kaixuan Wang, Yutao Ouyang, Xiaoyu Huang, Liyang Li, Kailun Su,
  Weiyang Jin, Wenhao Chai, Haotian Liang, Zhiyang Dou, Yue Chen, and Tianxing
  Chen.
  An unexpected robot policy: Early evaluations of gpt-6 astra on
  robodojo and beyond, 2026d.
  URL <https://robodojo-benchmark.com/report/gpt-6-astra-eval>.
  Equal contribution: Wenbo Zhang, Kaixuan Wang, Yutao Ouyang. Project
  lead: Wenbo Zhang. Corresponding: Yue Chen, Tianxing Chen.
* Zhang et al. (2026e)

  Yixian Zhang, Huanming Zhang, Feng Gao, Xiao Li, Zhihao Liu, Yi Nie, Chunyang
  Zhu, Jiaxing Qiu, Yuchen Yan, Jiyuan Liu, Wenhao Tang, Jiaji Rao, Zhengru
  Fang, Changxu Wei, Yu Wang, Wenbo Ding, and Chao Yu.
  Harness VLA: Steering frozen VLAs into reliable manipulation
  primitives via memory-guided agents.
  *arXiv preprint arXiv:2607.08448*, 2026e.
  URL <https://arxiv.org/abs/2607.08448>.
* Zheng et al. (2026)

  Tong Zheng, Xidong Wu, Zheng Zhang, Zhankui He, Chaoyi Zhang, Benjamin Coleman,
  Ruoqiao Wei, Di Bai, Haolin Liu, Rui Liu, Xue Wang, Yue Zhuan, Wang-Cheng
  Kang, Renkai Xiang, Heng Huang, Xinwu Cheng, and Yunsong Guo.
  Dream-RSI: Recursive self-improvement through evolving worlds.
  *arXiv preprint arXiv:2609.14858*, 2026.
  URL <https://arxiv.org/abs/2609.14858>.

## Appendix A Physical RSI Procedure

At iteration rr, the persistent system is Hr=(Hrtask,Hrmeta)H\_{r}=(H^{\mathrm{task}}\_{r},H^{\mathrm{meta}}\_{r}). Both roles use the same frozen model MθM\_{\theta}. The task agent selects tools from a context assembled by the task harness:

|  |  |  |  |
| --- | --- | --- | --- |
|  | at∼Mθ(⋅∣PHrtask(ℓ,o≤t,mt)),(ot+1,ft)=RunToolHrtask(at).a\_{t}\sim M\_{\theta}(\cdot\mid P\_{H^{\mathrm{task}}\_{r}}(\ell,o\_{\leq t},m\_{t})),\qquad(o\_{t+1},f\_{t})=\operatorname{RunTool}\_{H^{\mathrm{task}}\_{r}}(a\_{t}). |  | (2) |

Here ℓ\ell is the instruction, o≤to\_{\leq t} contains observations, mtm\_{t} is episode memory, and ftf\_{t} is execution feedback. The index tt counts tool interactions. A motion call can execute several native steps; a review or geometry call need not advance the environment.

Let ErE\_{r} contain feedback available to the meta-agent. One improvement round is summarized by

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
|  | H~r\displaystyle\widetilde{H}\_{r} | ←ReviseMθ,Hrmeta⁡(Hr,Er),\displaystyle\leftarrow\operatorname{Revise}\_{M\_{\theta},H^{\mathrm{meta}}\_{r}}(H\_{r},E\_{r}), |  | (3) |
|  |  |  |  |  |
| --- | --- | --- | --- | --- |
|  | yr\displaystyle y\_{r} | ←Test⁡(H~r,Hr),\displaystyle\leftarrow\operatorname{Test}(\widetilde{H}\_{r},H\_{r}), |  | (4) |
|  |  |  |  |  |
| --- | --- | --- | --- | --- |
|  | Hr+1\displaystyle H\_{r+1} | ←SelectMθ,Hrmeta⁡(Hr,H~r,yr).\displaystyle\leftarrow\operatorname{Select}\_{M\_{\theta},H^{\mathrm{meta}}\_{r}}(H\_{r},\widetilde{H}\_{r},y\_{r}). |  | (5) |

H~r\widetilde{H}\_{r} is a candidate revision and yry\_{r} contains its test results. The selection step either adopts the candidate or preserves the current harness. Robot dynamics, actuator restrictions, model configuration, and evaluation rules are outside the editable system.

Table 5: Physical RSI procedure in PhysEvo.

|  | Inputs: frozen Astra MθM\_{\theta}, initial task and meta harnesses H0H\_{0}, and an interaction budget. |
| --- | --- |
| 1 | Execute a task using the current task harness. |
| 2 | Give the meta-agent the task outcome, relevant images and robot states, action feedback, and current code. |
| 3 | Let the meta-agent inspect the failure, retrieve evidence, and run diagnostic experiments. |
| 4 | Propose a candidate revision to tools, skills, execution logic, or meta resources. |
| 5 | Run the edited code and check its outputs. For task-behavior changes, compare the candidate with the current harness on the same task and initial scene. |
| 6 | Adopt a candidate with a score gain, or progress beyond the failure without a score decrease. Reject a candidate that lowers the score. Test diagnostic changes against the error or measurement they address. |
| 7 | Load accepted tools and their associated skills together in subsequent episodes. Reuse accepted meta resources in subsequent improvement rounds. |
| 8 | Repeat within the interaction budget, then retain a deployment version for that task and evaluate held-out layouts without further updates. |

#### Initialization and persistence.

The initial task harness supplies instructions, camera observations, proprioception, and a TCP/local-IK action interface. The initial meta harness supplies a code-editing and execution workspace. Retained tools and skills form a compatible system: an updated tool and the guidance for using its API are loaded together. Updates take effect between episodes rather than changing an active episode’s tools. Selected skills are loaded at episode start. The task agent uses its runtime tools; the meta-agent uses the code-editing workspace. Development resources are shared across tasks. At the task-agent level, tools and task-agnostic skills are shared, while task-specific skills remain task-local. Each task retains its own deployment version before scoring.

## Appendix B Evaluation Details

### B.1 Metrics and Aggregation

For task tt, let st​ℓs\_{t\ell} be the native score on layout ℓ∈{1,…,5}\ell\in\{1,\ldots,5\}. We compute

|  |  |  |  |
| --- | --- | --- | --- |
|  | Mt=15∑ℓ=15st​ℓ,SRt(%)=1005∑ℓ=15𝟏[st​ℓ=100].M\_{t}=\frac{1}{5}\sum\_{\ell=1}^{5}s\_{t\ell},\qquad\mathrm{SR}\_{t}(\%)=\frac{100}{5}\sum\_{\ell=1}^{5}\mathbf{1}[s\_{t\ell}=100]. |  | (6) |

The ten-task GPT-as-Policy set and the eight-task manipulation subset overlap on tower building and making kong. Their union contains 16 distinct tasks and 80 attempts, giving 75.06 score and 65.00% SR. Each task is counted once in this union; the two subset averages are not averaged together.

#### Development and held-out scoring.

Self-improvement takes place during simulation development. For each task, a retained deployment version is fixed across its five scored layouts; these layouts are not used for harness revision or version selection. Development resources may carry experience across tasks, but task-agent sharing is restricted to tools and task-agnostic skills. Task-specific skills remain task-local.

#### Episode state and information access.

Before every scored episode, session context, historical-frame indices, and writable memory are reset. The task agent loads its retained tools and selected skills, then may accumulate and revisit observations from that episode and correct its actions online. This within-episode feedback does not change persistent tools, skills, or the deployment version. Scored instances do not supply privileged information to the meta-agent or contribute to revision or version selection. The hardware experiments use a separate adaptation protocol with skill revision after deployment; [section 5.6](#S5.SS6 "5.6 Real-World Adaptation through Skill Revision ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It") reports the real-world trial outcomes.

### B.2 Comparison Sources and Aggregation

#### Five-dimension comparison.

The robot and direct-language-model results in [table 1](#S5.T1 "In 5.2 Performance Across RoboDojo ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It") are taken from the RoboDojo leaderboard and Astra report ([RoboDojo Team, 2026](#bib.bib25); [Zhang et al., 2026d](#bib.bib40)). The final average weights the five dimensions equally. RoboDawn’s five-dimension Score and SR are computed from its public evaluation records: GPT-6 Astra, 1-shot, with five runs per task ([Guo et al., 2026b](#bib.bib8)). The dimension-weighted means, 54.63 score and 47.17% SR, agree with its paper ([Guo et al., 2026a](#bib.bib7)).

#### Direct and hybrid Astra policies.

The ten-task set follows GPT-as-Policy ([Su et al., 2026](#bib.bib27)). PhysEvo is evaluated on five layouts per task, with one attempt per layout, for 50 attempts in total. The source reports 50 selected cases for the hybrid and 48 valid scores for Direct. We recompute Direct’s score by averaging task means, giving 38.50 rather than its pooled-case score of 37.81. The three VLA methods displayed in [table 2](#S5.T2 "In 5.3 Comparison with Direct and Hybrid Astra Policies ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It") have the highest ten-task average scores among the source report’s VLA references.

#### Manipulation-challenge subset.

The eight tasks in [table 3](#S5.T3 "In 5.4 Manipulation Tasks Challenging Direct Astra ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It") correspond to Table F2 of the RoboDojo Astra report ([Zhang et al., 2026d](#bib.bib40)). Its selection criterion is VLA SR ≥20%\geq 20\% and Astra SR <5%<5\%. PhysEvo is evaluated on five scenes per task on this subset, with one attempt per scene. The main table uses the same six methods as [figure 1](#S0.F1 "In PhysEvo: Astra Can Act, Let It"). Simate-beta and Liber-0 Preview follow the 23 September 2026 leaderboard update, recorded on 26 September. RoboDawn uses GPT-6 Astra, 1-shot, with five runs per task ([Guo et al., 2026b](#bib.bib8)). Both Score and SR are shown in the task rows. [Appendix D](#A4 "Appendix D Robot and Agent Averages on the Manipulation Subset ‣ PhysEvo: Astra Can Act, Let It") retains the other robot-policy references.

### B.3 Real-World Scores and Success Criteria

Each hardware task is evaluated over five trials. As in simulation, Score summarizes partial and full task completion on a 0–100 scale, while SR is the percentage of trials reaching the task’s maximum score. Averaging the five task-level metrics in [table 4](#S5.T4 "In Hardware results. ‣ 5.6 Real-World Adaptation through Skill Revision ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It") gives a Score of 90.60/100 and an SR of 84.00%. The task-specific scores are defined below.

#### Stack blocks.

The goal is to stack three blocks. A score of 0 means that no block stacking is completed; 15 means that any two of the three blocks are stacked; 100 requires all three blocks to be stacked and the arm to return home.

#### Stack bowls.

The goal is to stack three bowls. A score of 0 means that no bowls are correctly stacked; 15 means that any two bowls are stacked upright; 100 requires all three bowls to be stacked upright, the bottom bowl to rest stably on the table, and the arm to return home.

#### Place pens.

The goal is to place both pens in the holder. Scores are 0 if neither pen is in the holder, 50 if either one is in the holder, and 100 if both are in the holder.

#### Pour water.

The goal is to pour liquid from the bottle into the cup. A score of 0 means that the liquid has not been successfully poured into the cup. A score of 100 requires the cup to contain the required liquid and the bottle to be upright.

#### Write PhysEvo.

The goal is to write “PhysEvo” on the table. The score is 0 when no letter is correct, and 15, 30, 45, 60, 75, or 90 when any one, two, three, four, five, or six letters are correct, respectively. All seven letters correct earns 100. The five scores are 100, 100, 100, 75, and 90, with a mean Score of 93/100 and an SR of 60%.

## Appendix C Additional Framework Analysis

### C.1 Control-Interface Comparison

A focused comparison on language-based object classification evaluates TCP, Joint, and Both interfaces on two scene layouts, for six episodes in total. The model, task skill, initialization for each layout, and budget are held fixed. Mean scores are 40 for TCP, 100 for Joint, and 55 for Both. Joint is retained as the default control interface.

The control sequences in [figure 3](#S5.F3 "In Making posture a policy decision. ‣ 5.5 What Changes Through Physical RSI? ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It") illustrate two independent executions. The first develops an obstructive posture under TCP/local IK. In the second, Astra adjusts joints after a TCP rejection and then completes a motion to the same target pose. The mechanism is direct access to the arm configuration, which an end-effector target alone leaves to the IK solver.

### C.2 Observation Tools

Historical-frame retrieval returns images and aligned robot states from earlier in the same episode. It does not advance the environment. Active viewing can place the free wrist camera to the side of a manipulation. Geometric tools combine model-selected image features with camera calibration and robot geometry.

A synthetic-marker reconstruction test accepted 8 of 12 points, with a median error of 0.615 mm and a 95th-percentile error of 1.437 mm. Four points were rejected by the validity checks. A separate wrist-camera translation of approximately 57.525 mm yielded a marker error of about 2.14 mm. These component tests measure the calibration and reconstruction paths. Temporal triangulation additionally requires correspondence to the same stationary point across views.

### C.3 Skill-Guided Observation and Diagnosis

The pouring example changes the skill guidance while keeping the other loaded skills fixed. The revised skill maintains a free-arm side view during pouring, draining, and upright recovery. The task agent uses the observation arm while the pouring arm makes corrections, and the revised episode reaches task success.

The packing example reuses a trajectory-review tool that presents RGB, robot states, and policy decisions. The meta-agent inspects the box displacement and revises the packing skill to require clearance above the flaps before a turn. With the revised skill, the task agent avoids pushing the box away. The reused diagnostic tool thus supports a subsequent skill revision.

## Appendix D Robot and Agent Averages on the Manipulation Subset

The original 40 robot-policy means are reaggregated from the RoboDojo Astra report’s task matrix ([Zhang et al., 2026d](#bib.bib40)), weighting all eight tasks equally. The Simate-beta, Liber-0 Preview, and RoboDawn rows summarize the task-level Score and SR entries in [table 3](#S5.T3 "In 5.4 Manipulation Tasks Challenging Direct Astra ‣ 5 Experiments ‣ PhysEvo: Astra Can Act, Let It") ([RoboDojo Team, 2026](#bib.bib25); [Guo et al., 2026b](#bib.bib8)). Each method is evaluated on the same task set and averaged with equal task weights. G0.5 is the strongest robot policy in the original 40-method set (43.09% SR); Simate-beta is the strongest displayed robot-policy entry in the extended comparison (50.83%). PhysEvo reaches 55.00%.

Table 6: Eight-task means for the original references and the extended comparison. Bold and underlining mark the best and second-best values.

| Method | Mean score | SR (%) |
| --- | --- | --- |
| PhysEvo (ours) | 62.88 | 55.00 |
| Simate-beta | 61.97 | 50.83 |
| Liber-0 Preview | 54.22 | 46.44 |
| RoboDawn (1-shot) | 52.50 | 45.00 |
| GalaxeaVLA (G0.5) | 53.70 | 43.09 |
| Xiaomi-Robotics-1 | 44.73 | 31.83 |
| DM0.5 | 37.80 | 26.42 |
| OpenWAM-α\alpha | 34.10 | 26.25 |
| VLAct | 28.26 | 22.67 |
| Meituan-Robotics-0 | 26.76 | 16.25 |
| StarVLA-PI\_v3 | 24.38 | 18.50 |
| InternVLA-A1.5 | 23.84 | 16.00 |
| Spatial Forcing | 23.78 | 16.42 |
| Hy-Embodied-0.5-VLA | 23.61 | 15.17 |
| StarVLA-OFT | 22.68 | 15.08 |
| X-VLA | 22.12 | 15.25 |
| Pi-05 | 19.73 | 12.00 |
| StarVLA-GR00T | 15.95 | 9.00 |
| StarVLA | 13.84 | 8.33 |
| Xiaomi-Robotics-0 | 12.93 | 8.33 |
| MolmoAct2 | 11.62 | 5.17 |
| EventVLA | 11.42 | 5.92 |
| GalaxeaVLA (G0) | 10.48 | 5.25 |

| Method | Mean score | SR (%) |
| --- | --- | --- |
| GigaWorld-Policy-0 | 7.87 | 3.09 |
| LingBot-VLA | 7.49 | 3.58 |
| AHA-WAM | 7.29 | 2.50 |
| X-WAM | 7.11 | 2.17 |
| Pi-0 | 5.31 | 2.42 |
| ABot-M0 | 4.61 | 1.67 |
| SmolVLA (Single Task) | 3.22 | 1.17 |
| GROOT-N1.7 | 3.22 | 1.25 |
| InternVLA-A1 | 2.96 | 1.33 |
| LDA-1B | 2.64 | 0.58 |
| ACT (Single Task) | 2.58 | 1.75 |
| GO-1 | 2.35 | 1.25 |
| Fast-WAM | 1.58 | 0.00 |
| RDT | 0.60 | 0.08 |
| Dexora-1B | 0.48 | 0.00 |
| H-RDT | 0.42 | 0.00 |
| DM0 | 0.31 | 0.08 |
| A1 | 0.11 | 0.00 |
| TinyVLA | 0.09 | 0.00 |
| OpenVLA-OFT | 0.09 | 0.00 |
| Spirit v1.5 | 0.07 | 0.00 |
| Official Astra | 5.96 | 1.25 |

## Appendix E Additional Simulation Executions

[Figures 7](#A5.F7 "In Appendix E Additional Simulation Executions ‣ PhysEvo: Astra Can Act, Let It"), [8](#A5.F8 "Figure 8 ‣ Appendix E Additional Simulation Executions ‣ PhysEvo: Astra Can Act, Let It"), [9](#A5.F9 "Figure 9 ‣ Appendix E Additional Simulation Executions ‣ PhysEvo: Astra Can Act, Let It"), [10](#A5.F10 "Figure 10 ‣ Appendix E Additional Simulation Executions ‣ PhysEvo: Astra Can Act, Let It"), [11](#A5.F11 "Figure 11 ‣ Appendix E Additional Simulation Executions ‣ PhysEvo: Astra Can Act, Let It") and [12](#A5.F12 "Figure 12 ‣ Appendix E Additional Simulation Executions ‣ PhysEvo: Astra Can Act, Let It") present execution sequences for all 42 RoboDojo simulation tasks. Each strip retains the task name and instruction and shows six frames in temporal order from left to right. The gallery follows the S01–S42 case order.

![Refer to caption](2610.08995v1/S01_organize_table.png)

![Refer to caption](2610.08995v1/S02_classify_objects_by_language.png)

![Refer to caption](2610.08995v1/S03_imitate_sorting_sequence.png)

![Refer to caption](2610.08995v1/S04_arrange_largest_number.png)

![Refer to caption](2610.08995v1/S05_pack_objects_into_box.png)

![Refer to caption](2610.08995v1/S06_classify_objects.png)

![Refer to caption](2610.08995v1/S07_build_tower.png)

Figure 7: Simulation executions, cases S01–S07 from top to bottom. Task names and instructions appear above each strip; frames progress from left to right.

![Refer to caption](2610.08995v1/S08_make_kong.png)

![Refer to caption](2610.08995v1/S09_fold_clothes.png)

![Refer to caption](2610.08995v1/S10_put_bottles_into_dustbin.png)

![Refer to caption](2610.08995v1/S11_insert_tubes.png)

![Refer to caption](2610.08995v1/S12_play_tic_tac_toe.png)

![Refer to caption](2610.08995v1/S13_pour_balls_into_vase.png)

![Refer to caption](2610.08995v1/S14_pour_liquid_into_cup.png)

Figure 8: Simulation executions, cases S08–S14 from top to bottom. Task names and instructions appear above each strip; frames progress from left to right.

![Refer to caption](2610.08995v1/S15_store_laptop_and_headphones.png)

![Refer to caption](2610.08995v1/S16_fill_pen_holder.png)

![Refer to caption](2610.08995v1/S17_stack_bowls.png)

![Refer to caption](2610.08995v1/S18_push_T.png)

![Refer to caption](2610.08995v1/S19_hang_mugs.png)

![Refer to caption](2610.08995v1/S20_sweep_blocks.png)

![Refer to caption](2610.08995v1/S21_make_toast.png)

Figure 9: Simulation executions, cases S15–S21 from top to bottom. Task names and instructions appear above each strip; frames progress from left to right.

![Refer to caption](2610.08995v1/S22_sort_nesting_dolls_by_size.png)

![Refer to caption](2610.08995v1/S23_stack_blocks.png)

![Refer to caption](2610.08995v1/S24_fasten_screws.png)

![Refer to caption](2610.08995v1/S25_plug_in_charger.png)

![Refer to caption](2610.08995v1/S26_play_Xylophone.png)

![Refer to caption](2610.08995v1/S27_deposit_coin.png)

![Refer to caption](2610.08995v1/S28_insert_key.png)

Figure 10: Simulation executions, cases S22–S28 from top to bottom. Task names and instructions appear above each strip; frames progress from left to right.

![Refer to caption](2610.08995v1/S29_fill_egg_holder.png)

![Refer to caption](2610.08995v1/S30_play_stacking_toy.png)

![Refer to caption](2610.08995v1/S31_cover_blocks.png)

![Refer to caption](2610.08995v1/S32_match_and_pick_from_conveyor.png)

![Refer to caption](2610.08995v1/S33_swap_T.png)

![Refer to caption](2610.08995v1/S34_press_by_number.png)

![Refer to caption](2610.08995v1/S35_swap_blocks.png)

Figure 11: Simulation executions, cases S29–S35 from top to bottom. Task names and instructions appear above each strip; frames progress from left to right.

![Refer to caption](2610.08995v1/S36_align_blocks.png)

![Refer to caption](2610.08995v1/S37_solve_equation.png)

![Refer to caption](2610.08995v1/S38_stack_blocks_by_language.png)

![Refer to caption](2610.08995v1/S39_general_pickup.png)

![Refer to caption](2610.08995v1/S40_pick_from_conveyor_by_image.png)

![Refer to caption](2610.08995v1/S41_store_tools_in_toolbox.png)

![Refer to caption](2610.08995v1/S42_pour_by_language.png)

Figure 12: Simulation executions, cases S36–S42 from top to bottom. Task names and instructions appear above each strip; frames progress from left to right.

## Appendix F Task-Agent Input, Output, and Tool Formats

The following blocks describe the task-agent interface in a joint-control configuration. Angle brackets and ellipses denote runtime data rather than literal argument values.

### F.1 Input Context

The system message supplies the control contract and selected skills. Each skill is Markdown text with name and description fields. A request also includes the preceding completed tool cycle, current public context, and RGB observations. Key context fields are:

```
{
  "instruction": "<current task instruction>",
  "step": <native-step index>,
  "state": {
    "left_arm_joint_state": [<six measured joint angles>],
    "right_arm_joint_state": [<six measured joint angles>],
    "left_ee_pose": [<x>, <y>, <z>, <qw>, <qx>, <qy>, <qz>],
    "right_ee_pose": [<x>, <y>, <z>, <qw>, <qx>, <qy>, <qz>],
    "left_ee_joint_state": [<gripper command echo>],
    "right_ee_joint_state": [<gripper command echo>],
    "left_gripper_measured_joints": [<measured finger positions>],
    "right_gripper_measured_joints": [<measured finger positions>]
  },
  "memory": "<same-episode facts and unresolved questions>",
  "previous_result": <preceding tool feedback or null>,
  "budget": {
    "remaining_native_steps": <integer>,
    "model_calls_remaining": <integer>, ...
  }, ...
}
```

Named RGB inputs include cam\_head, cam\_left\_wrist, and cam\_right\_wrist, together with selected previous-segment or requested historical views. Other context fields provide home poses, joint semantics, and camera geometry. Joint angles are in radians; positions are in metres.

#### Task and progress fields.

instruction is the natural-language goal for the current task. step is the current native environment-step index: one motion call may advance several native steps, whereas a geometry or review call need not advance it. state groups the robot’s reported measurements at that step.

#### Arm-state fields.

left\_arm\_joint\_state and right\_arm\_joint\_state contain six measured joint angles for the corresponding arm. left\_ee\_pose and right\_ee\_pose give the reported end-effector position and orientation. In each seven-element pose, the first three entries are x,y,zx,y,z in metres; the final four are the quaternion components in scalar-first order qw,qx,qy,qzq\_{w},q\_{x},q\_{y},q\_{z}.

#### Gripper-state fields.

left\_ee\_joint\_state and right\_ee\_joint\_state echo gripper commands. left\_gripper\_measured\_joints and right\_gripper\_measured\_joints instead report measured finger positions. The distinction lets the agent compare what was commanded with what the gripper physically reached; neither a closing command nor a small opening by itself proves that an object is held.

#### Memory, feedback, and budgets.

memory carries the task agent’s explicit same-episode notes, including established facts and unresolved questions. It is not a persistent skill document. previous\_result carries the preceding tool’s feedback, or null when no preceding result is available. budget.remaining\_native\_steps is the remaining environment-step allowance, while budget.model\_calls\_remaining is the remaining model-call allowance. These are separate resources because a tool call can execute zero, one, or several native steps.

#### Skills and image names.

A skill’s name identifies the document and its description summarizes its purpose or applicability; its Markdown body supplies procedural guidance. The named cam\_head, cam\_left\_wrist, and cam\_right\_wrist inputs identify the source camera for RGB observations. RGB observations are supplied as named image inputs alongside the JSON context.

### F.2 Model Output and Function Calls

The model returns exactly one enabled function call. Every tool requires assessment, plan, phase, and updated episode memory, followed by tool-specific arguments. Below, arguments is displayed as a decoded object; the function-call transport serializes it as a JSON string.

```
{
  "type": "function_call", "call_id": "<call identifier>",
  "name": "control_arms",
  "arguments": {
    "assessment": "<observed evidence and uncertainty>",
    "plan": "<next operation>",
    "phase": "fine",
    "memory": "<updated same-episode memory>",
    "left": null,
    "right": {
      "control": "joint",
      "joints": [<q1>, <q2>, <q3>, <q4>, <q5>, <q6>],
      "gripper": null
    },
    "steps": <integer>, "settle": <integer>
  }
}
```

#### Call-envelope fields.

type: function\_call marks an executable tool request. call\_id identifies that request and must match the identifier in its return message. name selects an enabled tool, here control\_arms; arguments contains the fields validated against that tool’s schema.

#### Common decision fields.

assessment summarizes the currently observed evidence and remaining uncertainty. plan states the next intended operation. phase selects the fine-motion or transit regime and its permitted segment length. The output memory is the updated note carried into the next decision.

#### Arm-selection fields.

left and right select commands for the corresponding arms. A non-null arm object uses control: joint to select joint control, joints for its target vector, and gripper for its opening command. An arm or an individual target field set to null preserves that command. steps requests the native motion-segment length, while settle requests additional hold steps for settling. Units and allowed ranges are detailed below.

### F.3 Tool Arguments and Execution Feedback

[Table 7](#A6.T7 "In F.3 Tool Arguments and Execution Feedback ‣ Appendix F Task-Agent Input, Output, and Tool Formats ‣ PhysEvo: Astra Can Act, Let It") lists tool-specific arguments in addition to the four common fields above. Only enabled tools can be invoked; task-agent calls do not provide shell access or hidden simulator-state queries.

Table 7: Task-agent tool arguments. Braced entries denote object fields, and square brackets denote lists.

| Tool | Tool-specific arguments and semantics |
| --- | --- |
| control\_arms | left, right, steps, settle. Each non-null arm has control, joints, and gripper fields, as shown above. |
| review\_frames | frames: [{step, camera}]. Retrieves 1–6 same-episode RGB frames and their public poses without motion. |
| project\_pixels | points: [{pixel: [u,v], z}]. Projects 1–32 head-view pixels onto model-specified height planes without motion. |
| triangulate\_point | step, feature, views: [{camera, pixel}]. Matches one physical feature in 2–3 distinct current views; returns geometry estimates and diagnostics without motion. |
| triangulate\_temporal\_point | step, camera, feature, stationary\_target, camera\_hand\_empty, stationarity\_evidence, and samples: [{step, pixel}]. Uses 2–3 reviewed views from one wrist camera. Both Boolean fields must be true; sampling steps increase, end at the current step, and span at most 24 native steps. |
| verify\_completion | No additional arguments. Advances six hold steps and checks native termination. |
| stop\_episode | reason. Stops the controller when blocked. |

#### Observation and geometry fields.

In review\_frames, frames is a list of retrieval requests: step selects a same-episode observation by its native-step index and camera selects its view. In geometric queries, pixel: [u,v] denotes horizontal and vertical image coordinates. The z in project\_pixels specifies a model-chosen height plane in metres; it is a hypothesis, not a supplied object depth. In triangulate\_point, step identifies the current observation, feature describes the same physical feature to match, and views pairs each camera with its pixel coordinates.

#### Temporal geometry and stopping fields.

For triangulate\_temporal\_point, camera selects one wrist camera, feature identifies the target feature, and samples pairs observation steps with its pixel locations. stationary\_target and camera\_hand\_empty state the required stationary-target and empty-camera-hand conditions; stationarity\_evidence explains their observational basis. These flags must be supported by the observations. The reason argument of stop\_episode explains why execution should stop.

#### Control parameters.

Each non-null joints field contains six absolute targets in radians, not joint increments. gripper is a continuous opening command in [0,1][0,1]. A null arm, joint vector, or gripper field holds its corresponding command. phase is fine or transit: motion segments use 1–6 or 1–20 native steps, respectively, with settle in {0,1,2}\{0,1,2\}. Execution checks can stop a segment before the requested number of steps.

#### Tool-result format.

The result is linked to the model call through the same call\_id. For a motion tool, feedback includes segment status, the executed step count, and tracking measurements. The following abbreviated block displays the serialized output payload as a decoded object:

```
{
  "type": "function_call_output",
  "call_id": "<same call identifier>",
  "output": {
    "feedback": {
      "status": "<segment status>",
      "reason": "<status detail>",
      "executed_steps": <integer>,
      "tracking": [<per-arm tracking measurements>], ...
    },
    "step": <current native-step index>,
    "ended": <Boolean>
  }
}
```

The next request supplies updated context and images together with this feedback. Observation and geometry tools instead return their requested evidence or diagnostic information without executing native actions.

#### Return-envelope fields.

type: function\_call\_output identifies a tool return. Its call\_id links it to the preceding request, and output contains the tool’s returned payload. As with arguments, the block displays the decoded content rather than the transport’s JSON string.

#### Execution-feedback fields.

feedback.status describes the motion segment’s execution status, such as completion, interruption, or rejection. feedback.reason provides an associated explanation and may be null when no detail applies. feedback.executed\_steps reports how many native steps actually ran, which can differ from the requested motion and settling steps. feedback.tracking contains per-arm measurements comparing commanded and observed execution.

#### Updated step and termination.

The return’s step is the updated native-step index after the tool call. ended indicates whether the episode has terminated, while task success is determined separately by the environment’s native evaluator. Updated state, images, and feedback allow the next call to respond to what actually happened.

Experimental support, please
[view the build logs](./2610.08995v1/__stdout.txt)
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
