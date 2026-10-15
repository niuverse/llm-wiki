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

[Back to Abstract](/abs/2609.38905v3 "Back to abstract page")

[Download PDF](/pdf/2609.38905v3 "Download PDF")

1. [Abstract](#abstract1 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
2. [1 Introduction](#S1 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
3. [2 Related Work](#S2 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   1. [Simulation-based Scalable Data Generation.](#S2.SS0.SSS0.Px1 "In 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   2. [Robot Learning via Real2Sim2Real.](#S2.SS0.SSS0.Px2 "In 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   3. [Recursive Self-Improvement for Robot Learning.](#S2.SS0.SSS0.Px3 "In 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
4. [3 Method: A System for Recursive Policy Self-Improvement](#S3 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   1. [3.1 An Executable Environment for RSI](#S3.SS1 "In 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   2. [3.2 A Reusable Source of Training Experience](#S3.SS2 "In 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   3. [3.3 Agent-Guided Recursive Policy Self-Improvement](#S3.SS3 "In 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
      1. [3.3.1 Agentic Rollout Monitor](#S3.SS3.SSS1 "In 3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
      2. [3.3.2 Collaborative Error Correction](#S3.SS3.SSS2 "In 3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
      3. [3.3.3 Adaptive Data Collection](#S3.SS3.SSS3 "In 3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
      4. [3.3.4 Policy Updating and Recursion](#S3.SS3.SSS4 "In 3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
         1. [Coordination and real-world adaptation.](#S3.SS3.SSS4.Px1 "In 3.3.4 Policy Updating and Recursion ‣ 3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
5. [4 Experiments](#S4 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   1. [Experimental settings.](#S4.SS0.SSS0.Px1 "In 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   2. [Training budgets and evaluation.](#S4.SS0.SSS0.Px2 "In 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   3. [4.1 Does the Policy Improve Across RSI Rounds?](#S4.SS1 "In 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   4. [4.2 Does Feedback Help at Matched Trajectory Counts?](#S4.SS2 "In 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   5. [4.3 Does RSI Enable Data-Efficient Real-World Adaptation?](#S4.SS3 "In 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
6. [5 Limitations](#S5 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
7. [6 Conclusion](#S6 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
8. [References](#bib "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
9. [A RSI implementation and agent coordination](#A1 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   1. [A.1 Task interfaces and recovery handover](#A1.SS1 "In Appendix A RSI implementation and agent coordination ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   2. [A.2 Grid attribution records and counting](#A1.SS2 "In Appendix A RSI implementation and agent coordination ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
   3. [A.3 Supervisor scheduling and output validation](#A1.SS3 "In Appendix A RSI implementation and agent coordination ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
      1. [Skills and workflow state.](#A1.SS3.SSS0.Px1 "In A.3 Supervisor scheduling and output validation ‣ Appendix A RSI implementation and agent coordination ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
      2. [Eligibility and stage completion.](#A1.SS3.SSS0.Px2 "In A.3 Supervisor scheduling and output validation ‣ Appendix A RSI implementation and agent coordination ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
      3. [Failure handling.](#A1.SS3.SSS0.Px3 "In A.3 Supervisor scheduling and output validation ‣ Appendix A RSI implementation and agent coordination ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
10. [B Environment and trajectory infrastructure](#A2 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    1. [B.1 Agentic Real2Sim Scene Construction and Refinement](#A2.SS1 "In Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       1. [Object-centric reconstruction.](#A2.SS1.SSS0.Px1 "In B.1 Agentic Real2Sim Scene Construction and Refinement ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       2. [Simulation instantiation.](#A2.SS1.SSS0.Px2 "In B.1 Agentic Real2Sim Scene Construction and Refinement ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       3. [Support-aware collision rectification.](#A2.SS1.SSS0.Px3 "In B.1 Agentic Real2Sim Scene Construction and Refinement ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       4. [Task-oriented scene organization.](#A2.SS1.SSS0.Px4 "In B.1 Agentic Real2Sim Scene Construction and Refinement ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    2. [B.2 Agentic Trajectory Generation](#A2.SS2 "In Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       1. [Object-centric task compilation.](#A2.SS2.SSS0.Px1 "In B.2 Agentic Trajectory Generation ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       2. [Grasp-conditioned motion synthesis.](#A2.SS2.SSS0.Px2 "In B.2 Agentic Trajectory Generation ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       3. [Validation-guided repair.](#A2.SS2.SSS0.Px3 "In B.2 Agentic Trajectory Generation ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       4. [Reset-aware execution and data curation.](#A2.SS2.SSS0.Px4 "In B.2 Agentic Trajectory Generation ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    3. [B.3 Scene geometry](#A2.SS3 "In Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       1. [Parallel Horizontal Rectification.](#A2.SS3.SSS0.Px1 "In B.3 Scene geometry ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    4. [B.4 Sequential motion execution](#A2.SS4 "In Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
11. [C Task environments and scene reconstruction results](#A3 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    1. [C.1 Robot platform and evaluated tasks](#A3.SS1 "In Appendix C Task environments and scene reconstruction results ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    2. [C.2 Reconstruction and organization examples](#A3.SS2 "In Appendix C Task environments and scene reconstruction results ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
12. [D Training data and evaluation protocol](#A4 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    1. [D.1 Training data and retained-trajectory budgets](#A4.SS1 "In Appendix D Training data and evaluation protocol ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       1. [Training-data selection.](#A4.SS1.SSS0.Px1 "In D.1 Training data and retained-trajectory budgets ‣ Appendix D Training data and evaluation protocol ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    2. [D.2 Real-world refinement and comparison settings](#A4.SS2 "In Appendix D Training data and evaluation protocol ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    3. [D.3 Autonomous evaluation protocol](#A4.SS3 "In Appendix D Training data and evaluation protocol ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    4. [D.4 Statistical analysis and numerical precision](#A4.SS4 "In Appendix D Training data and evaluation protocol ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
13. [E Detailed results and behavioral observations](#A5 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    1. [E.1 Simulation evolution](#A5.SS1 "In Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    2. [E.2 Real-world transfer](#A5.SS2 "In Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    3. [E.3 Matched-trajectory collection comparisons](#A5.SS3 "In Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    4. [E.4 Qualitative execution observations](#A5.SS4 "In Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       1. [Simulation errors and instruction-following.](#A5.SS4.SSS0.Px1 "In E.4 Qualitative execution observations ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       2. [Physical transfer and local corrective experience.](#A5.SS4.SSS0.Px2 "In E.4 Qualitative execution observations ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
       3. [Real-only coverage and task selection.](#A5.SS4.SSS0.Px3 "In E.4 Qualitative execution observations ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
14. [F Additional related work](#A6 "In EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    1. [F.1 Autonomous improvement and corrective experience](#A6.SS1 "In Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    2. [F.2 Failure-driven acquisition and adaptive curricula](#A6.SS2 "In Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
    3. [F.3 Agentic workflows and execution-time recovery](#A6.SS3 "In Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")

[License: CC BY-NC-SA 4.0](https://info.arxiv.org/help/license/index.html#licenses-available)

arXiv:2609.38905v3 [cs.RO] 03 Oct 2026

# EmbodiRSI: Recursive Self-Improvement for Data-Efficient Robot Adaptation

Haoran Lang1,2,∗1,2,\*

Haotao Lu1,2,∗1,2,\*

Shiyu Sang1,2,∗1,2,\*

Haoyang Luo11
Affiliation: Guo Chen11

Qun Li11

Jingyi Yu11

Ye Shi1,2,†1,2,\dagger

Jingya Wang1,2,†1,2,\dagger

###### Abstract

Adapting robot manipulation policies to new tasks and environments remains highly data-intensive, while the data needed for further improvement depends on the policy’s current capabilities and failure modes. We introduce EmbodiRSI, an agentic system for recursive self-improvement (RSI) in a real-to-sim-to-real setting, where task-specific simulations are constructed from target deployment scenarios and used as low-cost environments for iterative policy improvement before transfer back to the physical world. EmbodiRSI uses policy execution feedback to guide subsequent experience acquisition and policy updates. Two complementary mechanisms close this loop: *Collaborative Error Correction* generates agent-assisted corrective trajectories from policy-reached states, while *Adaptive Data Collection* directs expert demonstration generation toward the current policy’s weaknesses. The task-specific simulation serves as a reusable workspace for policy warm-up, repeatable evaluation, failure diagnosis, and targeted data generation across successive RSI rounds. Across three tabletop environments and 14 subtasks, EmbodiRSI increases scene-balanced autonomous simulation success from 50.4% to 83.5% over two RSI updates. With 400 adaptive simulated trajectories and only ten real-world refinement trajectories per subtask, EmbodiRSI achieves 83.1% scene-balanced autonomous real-world success, compared with 75.0% for adaptation using 200 real-world demonstrations per subtask. These results demonstrate that feedback-driven recursive improvement in deployment-specific simulations can enable data-efficient adaptation of embodied policies to physical environments.

11footnotetext: These authors contributed equally to this work.22footnotetext: Corresponding authors: Jingya Wang
(wangjingya@shanghaitech.edu.cn),
Ye Shi
(shiye@shanghaitech.edu.cn).
![Refer to caption](2609.38905v3/overview.png)

Figure 1: Overview of EmbodiRSI.
Real-world observations and task goals guide the construction of an executable
simulation environment and the generation of validated demonstrations.
Within this environment, policy rollout feedback guides Collaborative Error
Correction and Adaptive Data Collection.
The resulting experience updates the policy for the next round,
forming a recursive self-improvement loop.
A small real-world human-in-the-loop (HIL) dataset then refines the policy
for autonomous deployment.

## 1 Introduction

Recent advances in general-purpose robot manipulation policies have substantially expanded the range of tasks that a single robot can perform ([Kim et al., 2024](#bib.bib1); [Black et al., 2024](#bib.bib2); [Intelligence et al., 2025b](#bib.bib3)), yet reliable deployment in new environments remains challenging. Deployment often reveals systematic failure modes that are insufficiently covered by the original training distribution. Importantly, these failure modes change as the policy improves: some weaknesses are resolved, while the remaining errors become concentrated in different states or configurations. Effective adaptation therefore requires more than a fixed training set. It calls for a learning system that repeatedly evaluates the current policy, identifies its remaining weaknesses, and acquires targeted experience for subsequent improvement, without relying on costly physical data collection and human intervention at every iteration.

The missing link is between *observing a failure* and *obtaining useful
experience for subsequent improvement*. Within an episode, a missed grasp or displaced object can leave
the robot in a state absent from nominal demonstrations. Across episodes, recurring failures reveal regions of the task distribution where additional experience is most needed. Dataset aggregation supervises learner-induced
states ([Ross et al., 2011](#bib.bib16)); intervention and recovery methods turn execution
errors into training experience ([Hoque et al., 2024](#bib.bib17); [Lin et al., 2025](#bib.bib18)); and recent agentic systems coordinate collection, learning and execution ([Li et al., 2026](#bib.bib21)). These directions motivate a broader question:

*Can a robot use feedback from its current policy to determine both how to recover from failures and what experience should be acquired for the next policy update?*

We introduce EmbodiRSI, an agentic learning system for *recursive self-improvement* (RSI) within a *real-to-sim-to-real* (R2S2R) workflow
(Figure [1](#S0.F1 "Figure 1 ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")). Starting from a target physical workspace, EmbodiRSI constructs a task-specific simulation in which the policy can be repeatedly evaluated and improved before transferring back to the real world. The current policy generates rollouts, execution outcomes determine what experience should be acquired next, and the resulting experience is used to update the policy. The updated policy is then evaluated again, producing new feedback for the next round. In this way, the experience distribution evolves together with the policy rather than being fixed in advance.

Two complementary mechanisms close this RSI loop. *Collaborative Error Correction* operates within an episode: when policy execution fails, an agent guides recovery from the intermediate state actually reached by the policy, generating corrective trajectories without resetting the task. *Adaptive Data Collection* operates across episodes: the agent aggregates rollout outcomes, identifies recurring failure modes, and redirects subsequent expert demonstration generation toward configurations where the current policy remains weak. Together, these mechanisms transform execution feedback into targeted training experience for subsequent policy updates. The updated policy is then rolled out again to reveal its remaining limitations.

Task-specific simulation provides the workspace in which this recursive improvement can be performed efficiently and repeatedly. Given observations of the target deployment environment and task specifications, EmbodiRSI reconstructs and organizes a corresponding virtual workspace, while a trajectory agent generates validated expert demonstrations for policy initialization and subsequent adaptive collection. The same environment supports repeatable evaluation, failure diagnosis, error correction, and targeted data generation. Geometric reasoning, collision checking, and motion-planning tools are used to validate generated trajectories and recovery actions. After iterative improvement in simulation, only a small number of human-in-the-loop (HIL) trajectories are collected in the physical workspace to refine the policy for autonomous real-world execution.

Our evaluation follows this R2S2R progression from recursive improvement in task-specific simulation to deployment in the corresponding physical environments. Across three tabletop environments and 14 subtasks, EmbodiRSI increases scene-balanced autonomous simulation success from 50.4% to 83.5% over two RSI updates (R0 to R2). To isolate the benefit of feedback-driven experience acquisition, we further compare adaptive and static collection in two environments at matched retained-trajectory counts. With a cumulative budget of 400 simulated trajectories per subtask, adaptive collection improves scene-balanced simulation success by 20.6 percentage points and pre-refinement real-world success by 12.9 points over static collection. In the full three-environment evaluation, EmbodiRSI achieves 83.1% scene-balanced autonomous real-world success using 400 adaptive simulated trajectories and only ten real-world refinement trajectories per subtask, compared with 75.0% for adaptation using 200 real-world demonstrations per subtask.

Our main contributions are as follows.

* •

  We propose EmbodiRSI, an agentic recursive self-improvement system within an R2S2R workflow, where policy execution feedback iteratively guides experience acquisition and policy updates in task-specific simulation environments.
* •

  We develop two complementary mechanisms to close the RSI loop: *Adaptive Data Collection*, which directs expert demonstrations toward the current policy’s weaknesses, and *Collaborative Error Correction*, which generates corrective trajectories from policy-reached failure states through agent-guided recovery.
* •

  We demonstrate progressive policy improvement and data-efficient real-world adaptation across diverse manipulation tasks. EmbodiRSI achieves higher real-world success with only a small amount of physical refinement data than adaptation using substantially more real-world demonstrations.

## 2 Related Work

##### Simulation-based Scalable Data Generation.

RoboGen and GenSim generate environments or tasks ([Wang et al., 2023](#bib.bib4); [Wang et al., 2024](#bib.bib5));
MimicGen, SkillMimicGen, DexMimicGen and DemoGen expand source
demonstrations ([Mandlekar et al., 2023](#bib.bib6); [Garrett et al., 2024](#bib.bib26); [Jiang et al., 2025b](#bib.bib28); [Xue et al., 2025](#bib.bib7)). RoboTwin uses generative digital twins ([Mu et al., 2025](#bib.bib8)) and RoboTwin 2.0 scales
bimanual data generation with domain randomization ([Chen et al., 2025](#bib.bib27)).
SAGE and V-CAGE incorporate agentic generation and
verification ([Xia et al., 2026](#bib.bib14); [Liu et al., 2026](#bib.bib15)). Deployment-specific Real2Sim2Real systems connect reconstructed workspaces to
policy learning and transfer ([Torne et al., 2024](#bib.bib9); [Fang et al., 2025](#bib.bib10); [Han et al., 2025](#bib.bib11); [Dan et al., 2025](#bib.bib12); [Patel et al., 2025](#bib.bib13)).
EmbodiRSI uses these capabilities as infrastructure for repeated policy
improvement: the workspace remains available after initial training, while rollout feedback revises what experience is generated within it.

##### Robot Learning via Real2Sim2Real.

Real2Sim2Real reduces real-world data requirements by reconstructing or generating simulation from real observations, learning policies or expanding robot experience in simulation, and transferring the resulting policies or behaviors back to real robots. Representative systems include RialTo ([Torne et al., 2024](#bib.bib9)), RL-GSBridge ([Wu et al., 2025](#bib.bib29)), RoboGSim ([Li et al., 2024](#bib.bib30)), Re3Sim ([Han et al., 2025](#bib.bib11)), RoboSimGS ([Zhao et al., 2026](#bib.bib31)), ReBot ([Fang et al., 2025](#bib.bib10)), and X-SIM ([Dan et al., 2025](#bib.bib12)). Closely related real-to-sim and photorealistic digital-twin systems, such as IKER ([Patel et al., 2025](#bib.bib13)), Scalable Real2Sim ([Pfaff et al., 2025](#bib.bib32)), RoboPearls ([Tao et al., 2025](#bib.bib33)), GSWorld ([Jiang et al., 2025a](#bib.bib19)), and Real2Sim-Eval ([Zhang et al., 2025](#bib.bib34)), demonstrate the value of simulation as a bridge between real observations and robot execution. EmbodiRSI further extends this paradigm with an agent-driven closed-loop that unifies scene construction, trajectory generation, policy training, rollout evaluation, failure recovery, and data refinement.

##### Recursive Self-Improvement for Robot Learning.

Recent work on recursive robot self-improvement explores how policies can be iteratively refined using experience generated by their own evolving behavior. SOAR ([Zhou et al., 2024](#bib.bib42)) uses foundation models to guide autonomous data collection and learning from unlabeled experience, while RECAP ([Intelligence et al., 2025a](#bib.bib20)) combines demonstrations, autonomous experience, and corrective feedback through advantage conditioning. VERITAS ([Zhang and Shah, 2026](#bib.bib47)) uses visual verification to filter autonomous rollouts for subsequent policy improvement, and RoboClaw ([Li et al., 2026](#bib.bib21)) integrates autonomous data collection, learning, and execution into a unified iterative loop. RISE ([Yang et al., 2026](#bib.bib48)) further improves policies through imagined rollouts and advantage estimation in a learned world model. EmbodiRSI follows this direction by coupling within-episode recovery with across-episode recollection, so that experience generated by each policy iteration informs subsequent updates.
Appendix [F](#A6 "Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") provides further context.

## 3 Method: A System for Recursive Policy Self-Improvement

EmbodiRSI couples policy optimization to the acquisition of its next training
experience. At round kk, let πk\pi\_{k} be the current scene-specific policy,
𝒟k\mathcal{D}\_{k} the accumulated simulation dataset and pk​(c)p\_{k}(c) the distribution
of demonstration-collection configurations. A configuration cc specifies a
source object, target anchor, instruction, grasp and waypoint program, and
admissible reset ranges. One policy covers all subtasks in a scene. Sections
[3.1](#S3.SS1 "3.1 An Executable Environment for RSI ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") and [3.2](#S3.SS2 "3.2 A Reusable Source of Training Experience ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") describe the supporting
infrastructure; Section [3.3](#S3.SS3 "3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") develops the RSI loop.

### 3.1 An Executable Environment for RSI

Given a tabletop image and, optionally, a target image or language goal, EmbodiRSI constructs an initial scene 𝒮0\mathcal{S}\_{0} and an organized target scene 𝒮org\mathcal{S}\_{\mathrm{org}} through a fully automated, agent-orchestrated pipeline.
The scene agent identifies objects and invokes SAM 3 ([Carion et al., 2026](#bib.bib22)) to obtain instance masks and SAM 3D ([Chen et al., 2026](#bib.bib23)) to reconstruct the corresponding textured meshes.
It then applies Agent-Guided Adaptive Collision Rectification to resolve interpenetration while preserving support and containment relations.
To construct the organized target scene, the agent establishes coarse task relations and refines object poses using rendered views and geometric checks.

This scene is the *practice environment* for RSI: it supports repeatable resets, exposes object states for training-time diagnosis and permits recovery from policy-failed states. It is retained throughout learning, rather than used only to produce a seed dataset. Scene construction, geometric operators and organization examples are detailed in Appendices [B](#A2 "Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") and [C](#A3 "Appendix C Task environments and scene reconstruction results ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

### 3.2 A Reusable Source of Training Experience

A trajectory agent compiles the scene pair into executable task configurations and validated demonstrations. It proposes object-space routes, projects them through GraspGen ([Murali et al., 2025](#bib.bib24)) candidates, and validates complete robot programs with cuRobo ([Sundaralingam et al., 2026](#bib.bib25)).
Admission requires swept-object collision checking, multi-view review, sequential motion feasibility and execution-time task checks. Infeasible candidates are repaired and revalidated or rejected.

Stored waypoints follow source or target anchors. After a reset, they are
re-grounded to measured object poses and replanned from the current robot state.
This reusable interface connects agent decisions to executable supervision for
initial collection, recovery and targeted recollection.
Appendix [B.2](#A2.SS2 "B.2 Agentic Trajectory Generation ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") details compilation and execution.

### 3.3 Agent-Guided Recursive Policy Self-Improvement

Initial demonstrations may omit both imperfect learner-induced states and
configurations that remain difficult after training. EmbodiRSI addresses these
gaps at two timescales (Figure [2](#S3.F2 "Figure 2 ‣ 3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")): recovery supplies
corrective supervision *within* an episode, while rollout diagnosis
refines the collection distribution *across* episodes. Accumulated
experience updates the policy, closing the loop summarized in
Algorithm [1](#alg1 "Algorithm 1 ‣ 3.3.4 Policy Updating and Recursion ‣ 3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

![Refer to caption](2609.38905v3/recovery_pipeline.png)

Figure 2: The recursive self-improvement loop in EmbodiRSI.
The rollout monitor combines multi-camera observations and simulator states
to trigger recovery from the current state without resetting.
Failure analysis guides targeted data collection.
Successful rollouts, including those completed after correction, and newly
generated demonstrations are accumulated to update the policy for the next round.
External recovery is used only during training; evaluation is autonomous.

#### 3.3.1 Agentic Rollout Monitor

During a rollout τπk={(ot,xt,at)}t=1T\tau^{\pi\_{k}}=\{(o\_{t},x\_{t},a\_{t})\}\_{t=1}^{T}, a monitor agent combines a temporal image window, action history and simulator object/robot state xtx\_{t}:

|  |  |  |  |
| --- | --- | --- | --- |
|  | yt=𝒜RSI(ot−w:t,xt,a1:t,l),yt∈{continue,recover,complete}.y\_{t}=\mathcal{A}\_{\mathrm{RSI}}(o\_{t-w:t},x\_{t},a\_{1:t},l),\qquad y\_{t}\in\{\texttt{continue},\texttt{recover},\texttt{complete}\}. |  | (1) |

Visual evidence identifies missed grasps, slippage and incorrect placement;
programmatic checks measure target-object error and gripper state. Completion requires both a visual decision and geometric success. Recovery is gated by confidence, cooldown, attempt budget and an object-holding test, avoiding interruption of an ongoing valid transport.
Decisions are logged with configuration identifiers, scene states and failure evidence. Simulator object poses support these training tools but are not inputs to the learned policy.

#### 3.3.2 Collaborative Error Correction

Recovery must solve the task from the state the policy actually reached, not
replay a clean demonstration from its initial state. At a recovery trigger
tft\_{f}, a nominal grasp is transported to the current object pose:

|  |  |  |  |
| --- | --- | --- | --- |
|  | Tgcur=Tocur​(To0)−1​Tg0.T\_{g}^{\mathrm{cur}}=T\_{o}^{\mathrm{cur}}(T\_{o}^{0})^{-1}T\_{g}^{0}. |  | (2) |

Here, TocurT\_{o}^{\mathrm{cur}} and To0T\_{o}^{0} denote the current and initial poses of object oo, respectively.
Candidate configurations are probed in deterministic order without advancing the simulator.
Entry motion is planned from the *current joint state*, and targets are re-grounded to the current scene.
The correction can provide an entry-to-grasp motion or continue the remaining manipulation program.

Diagnosis and planning pause simulation advancement. After a correction, the system refreshes observations, checks completion and may return control to the policy under the recovery gates.
We log recovery requests, executed corrections and final episode outcomes separately.
Successful continuations provide action supervision from imperfect states that nominal demonstrations may omit.
Recovery supplies corrective training experience from policy-failed states, while performance evaluation uses the learned policy alone.

#### 3.3.3 Adaptive Data Collection

Agent-guided data collection adapts the collection distribution to the current policy’s diagnosed weaknesses. After each collection round, the agent attributes final failures to the source-object reset, target-anchor reset or neither; stored attributions can be reused without additional VLM calls.
For reset subject ss with a non-degenerate, configuration-specific range
[ℓs,hs][\ell^{s},h^{s}], we normalize its position to a common grid and compute
the attributed-failure rate:

|  |  |  |  |
| --- | --- | --- | --- |
|  | us​(x,y)=(x−ℓxshxs−ℓxs,y−ℓyshys−ℓys),r^k,bs=Uk,bsNk,bs.u^{s}(x,y)=\left(\frac{x-\ell\_{x}^{s}}{h\_{x}^{s}-\ell\_{x}^{s}},\frac{y-\ell\_{y}^{s}}{h\_{y}^{s}-\ell\_{y}^{s}}\right),\qquad\widehat{r}\_{k,b}^{s}=\frac{U\_{k,b}^{s}}{N\_{k,b}^{s}}. |  | (3) |

Here, Nk,bsN\_{k,b}^{s} counts completed monitored episodes with valid subject positions in cell bb, whereas Uk,bsU\_{k,b}^{s} counts only final failures with supported attribution to ss. Cell selection requires sufficient observations and attributed failures, together with a rate exceeding the subject-level global rate. Episodes that succeed after recovery do not contribute to the numerator; these statistics describe assisted collection rather than unassisted test performance.

Selected cells are mapped back to world coordinates to restrict the
corresponding reset ranges, including yaw when sufficiently supported.
Configurations for subsequent demonstration generation are sampled from

|  |  |  |  |
| --- | --- | --- | --- |
|  | pk+1​(c)=(1−α)​p0​(c)+α​phard,k​(c),0≤α≤1.p\_{k+1}(c)=(1-\alpha)p\_{0}(c)+\alpha p\_{\mathrm{hard},k}(c),\qquad 0\leq\alpha\leq 1. |  | (4) |

Here, phard,kp\_{\mathrm{hard},k} concentrates sampling on diagnosed weak
configurations, while the base component preserves access to the original range for α<1\alpha<1.
The mixture controls configuration sampling but does not determine retained-trajectory proportions, which also depend on execution-based acceptance.
This refinement applies only to training collection; test resets remain unchanged.
Failure concentration provides a heuristic for prioritizing subsequent data acquisition (Appendix [A.2](#A1.SS2 "A.2 Grid attribution records and counting ‣ Appendix A RSI implementation and agent coordination ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")).

#### 3.3.4 Policy Updating and Recursion

Let 𝒟kroll\mathcal{D}\_{k}^{\mathrm{roll}} contain retained rollout-derived episodes,
which may include both policy actions and corrections, and let
𝒟knew\mathcal{D}\_{k}^{\mathrm{new}} contain validated demonstrations generated under
pk+1p\_{k+1}. Each saved episode is counted once. The next dataset is

|  |  |  |  |
| --- | --- | --- | --- |
|  | 𝒟k+1=𝒟k∪𝒟kroll∪𝒟knew.\mathcal{D}\_{k+1}=\mathcal{D}\_{k}\cup\mathcal{D}\_{k}^{\mathrm{roll}}\cup\mathcal{D}\_{k}^{\mathrm{new}}. |  | (5) |

The policy receives head- and wrist-camera RGB images, a 14-dimensional robot
state (six arm-joint positions and one gripper value per arm) and an instruction.
Following RECAP ([Intelligence et al., 2025a](#bib.bib20)), a task-conditioned value model annotates the accumulated experience:

|  |  |  |  |
| --- | --- | --- | --- |
|  | A^t(n)=Rt(n)+Vϕ(ot+n,l)−Vϕ(ot,l),zt=𝕀[A^t(n)>δ].\widehat{A}\_{t}^{(n)}=R\_{t}^{(n)}+V\_{\phi}(o\_{t+n},l)-V\_{\phi}(o\_{t},l),\qquad z\_{t}=\mathbb{I}[\widehat{A}\_{t}^{(n)}>\delta]. |  | (6) |

The implementation sets Rt(n)=0R\_{t}^{(n)}=0, n=50n=50, so the binary condition depends on the value-estimate change.
With 𝒟~k+1\widetilde{\mathcal{D}}\_{k+1} denoting the annotated data, the policy update minimizes

|  |  |  |  |
| --- | --- | --- | --- |
|  | ℒπ(θ)=𝔼(ot,l,at,zt)∼𝒟~k+1[ℓBC(πθ(⋅∣ot,l,zt),at)].\mathcal{L}\_{\pi}(\theta)=\mathbb{E}\_{(o\_{t},l,a\_{t},z\_{t})\sim\widetilde{\mathcal{D}}\_{k+1}}\left[\ell\_{\mathrm{BC}}\bigl(\pi\_{\theta}(\cdot\mid o\_{t},l,z\_{t}),a\_{t}\bigr)\right]. |  | (7) |

Recorded actions remain the supervision targets, while advantage labels are provided in text form as condition for action prediction.
This formulation integrates RSI-generated experience into policy learning. The updated policy πk+1\pi\_{k+1} then generates the next round’s rollouts, which guide the refinement of both corrective supervision and subsequent data collection.
The number of rounds and retained-data quotas are fixed in advance; feedback guides experience acquisition within this schedule.

Algorithm 1  EmbodiRSI: recursive policy self-improvement

1:
Deployment observations and goals, base distribution p0p\_{0}, round/data budgets

2:
Construct the simulator; compile validated task configurations

3:
Collect initial demonstrations 𝒟0\mathcal{D}\_{0} and train π0\pi\_{0}

4:
for each scheduled RSI round kk do

5:
  Roll out πk\pi\_{k}; diagnose execution and request eligible state-conditioned recovery

6:
  Retain rollout-derived episodes 𝒟kroll\mathcal{D}\_{k}^{\mathrm{roll}}, counting each episode once

7:
  Attribute final failures; form pk+1p\_{k+1} by Eq. ([4](#S3.E4 "In 3.3.3 Adaptive Data Collection ‣ 3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"))

8:
  Generate and validate new demonstrations 𝒟knew\mathcal{D}\_{k}^{\mathrm{new}} under pk+1p\_{k+1}

9:
  Accumulate 𝒟k+1\mathcal{D}\_{k+1}; annotate and train πk+1\pi\_{k+1} by Eqs. ([5](#S3.E5 "In 3.3.4 Policy Updating and Recursion ‣ 3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"))–([7](#S3.E7 "In 3.3.4 Policy Updating and Recursion ‣ 3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"))

10:
end for

11:
Refine the selected policy with a small real-world human-in-the-loop (HIL) dataset

12:
Evaluate independently with the learned policy alone

##### Coordination and real-world adaptation.

At the outer level, an OpenClaw-based supervisor coordinates the complete RSI workflow through a Model Context Protocol (MCP) interface. (Appendix [A.3](#A1.SS3 "A.3 Supervisor scheduling and output validation ‣ Appendix A RSI implementation and agent coordination ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")).
After simulation RSI, ten retained real-world human-in-the-loop (HIL) trajectories per subtask refine the selected policy with the same learning formulation.
Operators correct residual execution errors, such as unstable grasps and inaccurate placement.
Final simulation and physical tests are independent of training collection and disable agent takeover, planner recovery and human correction.
A test-time reattempt is therefore behavior learned by the policy itself.

## 4 Experiments

##### Experimental settings.

We use a 14-DoF dual-arm ALOHA ([Zhao et al., 2023](#bib.bib35))
with two wrist cameras and one head camera, matching the simulation observations. The paired workspaces comprise Office Table (S1, six subtasks), Kitchen Table (S2, four) and Household Table (S3, four) (Figure [3](#S4.F3 "Figure 3 ‣ Training budgets and evaluation. ‣ 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")).
Each training setting uses one policy per scene.
R0 is initialized from the pretrained π0.5\pi\_{0.5} checkpoint ([Intelligence et al., 2025b](#bib.bib3)).
Each subsequent RSI round continues training from the preceding round’s
policy using the accumulated dataset.
The value model uses the vision–language backbone initialized from the same checkpoint, augmented with a value prediction head. We build our agent system based on GPT-5.5 and use Isaac Sim as the simulation platform.
Subtasks share simulation/physical goal definitions (Table [C.1](#A3.T1 "Table C.1 ‣ C.1 Robot platform and evaluated tasks ‣ Appendix C Task environments and scene reconstruction results ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")) and are evaluated individually, not as complete tidying sequences.

##### Training budgets and evaluation.

R0/R1/R2 use 50/200/400 cumulative *retained simulated training trajectories per subtask*. R0 is the seed policy; R1 and R2 follow collection-and-training updates.
+10 adds ten real-world human-in-the-loop (HIL) refinement trajectories per subtask.
All tests are policy-only, without external recovery. We run ten physical trials per task and setting; simulation test counts vary by task–checkpoint pair. Scene-balanced means weight scenes equally.
Appendix [D](#A4 "Appendix D Training data and evaluation protocol ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") provides allocation and statistical details.

![Refer to caption](2609.38905v3/evaluation_scenes.png)

Figure 3: Paired physical and simulated experimental settings.
Columns from left to right show Office Table (S1), Kitchen Table (S2), and Household Table (S3).
The top row shows the physical workspaces, and the bottom row shows their corresponding simulated environments.
Each column presents the same scene in the real world and simulation.

### 4.1 Does the Policy Improve Across RSI Rounds?

Scene-balanced autonomous simulation success increases from 50.4% at R0 to 70.7% at R1 and 83.5% at R2 (Figure [4](#S4.F4 "Figure 4 ‣ 4.1 Does the Policy Improve Across RSI Rounds? ‣ 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")).
All 14 subtasks improve from R0 to R2, with substantial gains on initially challenging tasks.
For example, black-pen placement in S1 improves from 14.0% to 76.5%, whereas carrot placement in S2 starts near ceiling, leaving less room for improvement.
These results demonstrate that EmbodiRSI’s evaluated RSI rounds yield progressively stronger autonomous policies.

Figure 4: Autonomous policy performance across RSI rounds.
Thin lines show individual subtasks; markers and error bars indicate scene means ±\pm sample SD across subtasks.
Discrete rounds R0/R1/R2 use 50/200/400 retained simulated training trajectories per subtask, respectively.

Qualitative observations are consistent with EmbodiRSI’s two feedback paths.
Early policies often continued nominal transport after missed grasps, whereas later policies grasped more reliably and sometimes reattempted unsuccessful interactions, with some reattempts leading to task completion.
Missed grasps occurred at peripheral object positions, although these positions were not shown to be unreachable or outside the training distribution.
Placement failures also occurred after successful grasping, particularly when objects missed narrow target openings.
These execution errors are distinct from task-selection errors. At the 50-demonstration initialization, the policy occasionally confused the red-cap-marker and red-pen instructions in S1.
Such confusion was not a recurring failure mode at larger simulation budgets, where most errors arose during execution of the requested manipulation.
Further details are provided in Appendix [E](#A5 "Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

### 4.2 Does Feedback Help at Matched Trajectory Counts?

We compare EmbodiRSI with Static collection in S1 and S3, the two more difficult scenes at initialization.
Both settings start from the same 50 demonstrations per subtask and use the same policy architecture and training recipe.
Static continues generating demonstrations under the original configuration distribution; EmbodiRSI adds rollout-derived experience and targeted recollection.
Cumulative retained counts are matched at 200 and 400 trajectories per subtask.

Table 1: Effect of RSI under equal data budgets.
Scene-balanced autonomous success (%) across S1 and S3 at 400 simulated trajectories per subtask. Complete 200/400 comparisons, scene-level dispersion and task-level exceptions are retained in Appendix [E](#A5 "Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

|  |  |  |  |
| --- | --- | --- | --- |
| Method | Simulation | R2S2R | R2S2R + Human in the Loop |
| EmbodiRSI w/o RSI | 59.3 | 46.3 | 67.9 |
| EmbodiRSI | 79.9 | 59.2 | 82.1 |
| Gain (pp) | +20.6 | +12.9 | +14.2 |

At a matched budget of 400 simulated trajectories per subtask, EmbodiRSI’s adaptive collection achieves 79.9% scene-balanced simulation success, compared with 59.3% for Static—a gain of 20.6 percentage points (Table [1](#S4.T1 "Table 1 ‣ 4.2 Does Feedback Help at Matched Trajectory Counts? ‣ 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")). Adaptive collection yields higher scene-level mean success in both scenes at both evaluated budgets. This advantage extends to real-world execution, reaching 12.9 percentage points before physical refinement and 14.2 points after both policies are refined with ten human-in-the-loop (HIL) trajectories per subtask. The benefits of adaptive simulation collection therefore persist after limited real-world refinement. Detailed task-level simulation results are provided in Appendix [E](#A5 "Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

### 4.3 Does RSI Enable Data-Efficient Real-World Adaptation?

With 400 simulated and ten real-world refinement trajectories per subtask, EmbodiRSI reaches 83.1% scene-balanced autonomous real-world success, compared with 75.0% for Real-only adaptation using 200 real demonstrations per subtask (Table [2](#S4.T2 "Table 2 ‣ 4.3 Does RSI Enable Data-Efficient Real-World Adaptation? ‣ 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")).
Its observed mean is higher in each scene, using one-twentieth as many retained physical training trajectories.

Table 2: Data-efficient real-world adaptation.
Success rates (%) are mean ±\pm sample SD across subtasks; the final column weights scenes equally.
R1/R2 use 200/400 simulated trajectories per subtask; +10 adds ten real human-in-the-loop (HIL) trajectories.
Real-only labels give demonstration counts per subtask.
Each subtask/setting has ten autonomous test trials.

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| Training setting | S1: Office  n=6n=6 tasks | S2: Kitchen  n=4n=4 tasks | S3: Household  n=4n=4 tasks | Scene-balanced  mean |
| R1 | 43.3±22.543.3\pm 22.5 | 60.0±8.260.0\pm 8.2 | 52.5±9.652.5\pm 9.6 | 51.951.9 |
| R1+10 | 63.3±13.763.3\pm 13.7 | 82.5±5.082.5\pm 5.0 | 75.0±17.375.0\pm 17.3 | 73.673.6 |
| R2 | 53.3±32.053.3\pm 32.0 | 70.0±14.170.0\pm 14.1 | 65.0±12.965.0\pm 12.9 | 62.862.8 |
| R2+10 | 81.7±13.3\textbf{81.7}\pm\textbf{13.3} | 85.0±12.9\textbf{85.0}\pm\textbf{12.9} | 82.5±9.6\textbf{82.5}\pm\textbf{9.6} | 83.1 |
| Real-only 10 | 13.3±13.713.3\pm 13.7 | 45.0±5.845.0\pm 5.8 | 20.0±8.220.0\pm 8.2 | 26.126.1 |
| Real-only 100 | 56.7±15.156.7\pm 15.1 | 62.5±5.062.5\pm 5.0 | 52.5±5.052.5\pm 5.0 | 57.257.2 |
| Real-only 200 | 70.0±6.370.0\pm 6.3 | 77.5±9.677.5\pm 9.6 | 77.5±9.677.5\pm 9.6 | 75.075.0 |

In zero-shot deployment, both Static and RSI policies generally approached
the appropriate object despite pose variation. Narrow placement regions made
near-contact errors conspicuous, including pens released outside their holders.
Broader target regions were more forgiving, but constrained-placement trials
did not invariably fail. RSI policies showed more consistent grasp alignment
and sometimes completed an episode after a new attempt.

Before refinement, R2 already achieves 62.8% physical success. Here
*zero-shot* means no task-specific real-world policy refinement.
The policy generally approaches the instructed object, while
remaining failures concentrate near grasping and placement.
human-in-the-loop (HIL) corrections address these residual errors rather than providing the entire strategy from scratch.
For example, S1 red-pen placement remains at 2/10 before refinement at
both simulation checkpoints but reaches 7/10 after R2 refinement; glasses placement already achieves 10/10 before refinement.

These patterns suggest complementary roles: simulation RSI develops
scene-specific capability through repeated practice and corrective experience, while physical refinement addresses residual deployment errors.
Figure [E.2](#A5.F2 "Figure E.2 ‣ E.4 Qualitative execution observations ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") contrasts some real-world executions; Appendix [E](#A5 "Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") retains all task-level outcomes and sampling intervals.
Reattempts during these tests are actions of the learned policy, not training-time agent recovery.
Further details are provided in Appendix [E](#A5 "Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

## 5 Limitations

Within the available time and computational budget, we prioritized evaluating scene-specific adaptation across the selected workspaces.
We plan to extend evaluation to held-out workspaces and longer improvement runs to assess generalization and sustained policy improvement.

Our evaluation centers on the complete pipeline, in which recovery, recollection and agent reasoning operate jointly.
While component-wise attribution is not the primary focus of this system-level study, we plan targeted ablations to better understand their contributions and interactions, informing further refinement of the pipeline.

## 6 Conclusion

EmbodiRSI enables recursive policy self-improvement within a real-to-sim-to-real (R2S2R) workflow by making experience acquisition responsive to the evolving policy. With agent assistance, Collaborative Error Correction provides corrective continuations from policy-failed states, while Adaptive Data Collection directs practice toward persistent weaknesses. Supported by task-specific simulation reconstructed from real-world observations and validated trajectory generation, these mechanisms turn rollout feedback into training experience for successive policy updates. After recursive improvement in simulation, the policy is refined with limited real-world data for autonomous deployment in the corresponding physical workspace. Experiments demonstrate improved autonomous performance across the evaluated rounds, gains over static collection at matched retained-trajectory counts, and data-efficient real-world adaptation. Together, these results highlight the value of refining not only the policy, but also the experience that drives its improvement.

## AI Use Statement

Generative AI assisted earlier manuscript restructuring, language revision, literature checks and descriptive analysis code. Additional AI-assisted editing helped polish this manuscript,
including language revision, interpretation of existing results, LaTeX formatting, figure-layout exploration and editable vector diagrams. Submitted experimental images are retained from the supplied materials; generated layout concepts are not experimental evidence.
Manuscript preparation introduced no new robot trials or simulation
measurements. The diagrams are method illustrations, not generated experimental evidence. The reconstruction gallery includes labeled AI-generated scene inputs for illustration, not evaluation. The human authors retain responsibility for the final text, claims, references, implementation details and AI-use disclosure.

## Reproducibility Statement

The full code for the entire pipeline will be released soon.

## References

* Black et al. (2024)
  K. Black, N. Brown, D. Driess, A. Esmail, M. Equi, C. Finn, N. Fusai, L. Groom, K. Hausman, B. Ichter, et al.
  π0\pi\_{0}: a vision-language-action flow model for general robot control.
  arXiv preprint arXiv:2410.24164.
  Cited by: [§1](#S1.p1.1 "1 Introduction ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Bousmalis et al. (2023)
  K. Bousmalis, G. Vezzani, D. Rao, C. Devin, A. X. Lee, M. Bauzá, T. Davchev, Y. Zhou, A. Gupta, A. Raju, et al.
  Robocat: a self-improving generalist agent for robotic manipulation.
  arXiv preprint arXiv:2306.11706.
  Cited by: [§F.1](#A6.SS1.p1.1 "F.1 Autonomous improvement and corrective experience ‣ Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Carion et al. (2026)
  N. Carion, L. Gustafson, Y. Hu, S. Debnath, R. Hu, D. Suris Coll-Vinent, C. Ryali, K. V. Alwala, H. Khedr, A. Huang, et al.
  Sam 3: segment anything with concepts.
  In International conference on learning representations,
  Vol. 2026, pp. 138846–138923.
  Cited by: [§B.1](#A2.SS1.SSS0.Px1.p1.1 "Object-centric reconstruction. ‣ B.1 Agentic Real2Sim Scene Construction and Refinement ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§3.1](#S3.SS1.p1.1 "3.1 An Executable Environment for RSI ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Chen et al. (2025)
  T. Chen, Z. Chen, B. Chen, Z. Cai, Y. Liu, Z. Li, Q. Liang, X. Lin, Y. Ge, Z. Gu, et al.
  Robotwin 2.0: a scalable data generator and benchmark with strong domain randomization for robust bimanual robotic manipulation.
  arXiv preprint arXiv:2506.18088.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Chen et al. (2026)
  X. Chen, F. Chu, P. Gleize, K. J. Liang, A. Sax, H. Tang, W. Wang, M. Guo, T. Hardin, X. Li, et al.
  Sam 3d: 3dfy anything in images.
  In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition,
  pp. 7220–7232.
  Cited by: [§B.1](#A2.SS1.SSS0.Px1.p1.1 "Object-centric reconstruction. ‣ B.1 Agentic Real2Sim Scene Construction and Refinement ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§3.1](#S3.SS1.p1.1 "3.1 An Executable Environment for RSI ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Dan et al. (2025)
  P. Dan, K. Kedia, A. Chao, E. W. Duan, M. A. Pace, W. Ma, and S. Choudhury
  X-sim: cross-embodiment learning via real-to-sim-to-real.
  arXiv preprint arXiv:2505.07096.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§2](#S2.SS0.SSS0.Px2.p1.1 "Robot Learning via Real2Sim2Real. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Fang et al. (2025)
  Y. Fang, Y. Yang, X. Zhu, K. Zheng, G. Bertasius, D. Szafir, and M. Ding
  Rebot: scaling robot learning with real-to-sim-to-real robotic video synthesis.
  In 2025 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS),
  pp. 11351–11358.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§2](#S2.SS0.SSS0.Px2.p1.1 "Robot Learning via Real2Sim2Real. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Fu et al. (2025)
  H. Fu, R. Gong, X. Zhang, M. V. Minniti, J. Patel, and K. Schmeckpeper
  Data-efficient multitask dagger.
  arXiv preprint arXiv:2509.25466.
  Cited by: [§F.2](#A6.SS2.p1.1 "F.2 Failure-driven acquisition and adaptive curricula ‣ Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Garrett et al. (2024)
  C. Garrett, A. Mandlekar, B. Wen, and D. Fox
  Skillmimicgen: automated demonstration generation for efficient skill learning and deployment.
  arXiv preprint arXiv:2410.18907.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Han et al. (2025)
  X. Han, J. Yu, M. Liu, Y. Chen, X. Lyu, Y. Tian, B. Wang, W. Zhang, and J. Pang
  Re3{}^{3}Sim: generating high-fidelity simulation data via 3D-photorealistic real-to-sim for robotic manipulation.
  arXiv preprint arXiv:2502.08645.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§2](#S2.SS0.SSS0.Px2.p1.1 "Robot Learning via Real2Sim2Real. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Hoque et al. (2024)
  R. Hoque, A. Mandlekar, C. Garrett, K. Goldberg, and D. Fox
  Intervengen: interventional data generation for robust and data-efficient robot imitation learning.
  In 2024 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS),
  pp. 2840–2846.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Huang et al. (2024)
  W. Huang, C. Wang, Y. Li, R. Zhang, and L. Fei-Fei
  Rekep: spatio-temporal reasoning of relational keypoint constraints for robotic manipulation.
  arXiv preprint arXiv:2409.01652.
  Cited by: [§F.3](#A6.SS3.p1.1 "F.3 Agentic workflows and execution-time recovery ‣ Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Huang et al. (2025)
  Y. Huang, N. Alvina, M. D. Shanthi, and T. Hermans
  Fail2progress: learning from real-world robot failures with stein variational inference.
  arXiv preprint arXiv:2509.01746.
  Cited by: [§F.2](#A6.SS2.p1.1 "F.2 Failure-driven acquisition and adaptive curricula ‣ Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Huo et al. (2026)
  D. Huo, H. Liu, G. Liu, D. Qi, Z. Sun, M. Gao, J. He, Y. Yang, X. Chang, F. Xiong, et al.
  ABot-claw: a foundation for persistent, cooperative, and self-evolving robotic agents.
  arXiv preprint arXiv:2604.10096.
  Cited by: [§F.3](#A6.SS3.p1.1 "F.3 Agentic workflows and execution-time recovery ‣ Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Intelligence et al. (2025a)
  P. Intelligence, A. Amin, R. Aniceto, A. Balakrishna, K. Black, K. Conley, G. Connors, J. Darpinian, K. Dhabalia, J. DiCarlo, et al.
  π0.6∗\pi\_{0.6}^{\*}: a VLA that learns from experience.
  arXiv preprint arXiv:2511.14759.
  Cited by: [§2](#S2.SS0.SSS0.Px3.p1.1 "Recursive Self-Improvement for Robot Learning. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§3.3.4](#S3.SS3.SSS4.p1.2 "3.3.4 Policy Updating and Recursion ‣ 3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Intelligence et al. (2025b)
  P. Intelligence, K. Black, N. Brown, J. Darpinian, K. Dhabalia, D. Driess, A. Esmail, M. Equi, C. Finn, N. Fusai, et al.
  π0.5\pi\_{0.5}: a vision-language-action model with open-world generalization.
  arXiv preprint arXiv:2504.16054.
  Cited by: [§1](#S1.p1.1 "1 Introduction ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§4](#S4.SS0.SSS0.Px1.p1.1 "Experimental settings. ‣ 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Jiang et al. (2025a)
  G. Jiang, H. Chang, R. Qiu, Y. Liang, M. Ji, J. Zhu, Z. Dong, X. Zou, and X. Wang
  Gsworld: closed-loop photo-realistic simulation suite for robotic manipulation.
  arXiv preprint arXiv:2510.20813.
  Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Robot Learning via Real2Sim2Real. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Jiang et al. (2021)
  M. Jiang, E. Grefenstette, and T. Rocktäschel
  Prioritized level replay.
  In International Conference on Machine Learning,
  pp. 4940–4950.
  Cited by: [§F.2](#A6.SS2.p1.1 "F.2 Failure-driven acquisition and adaptive curricula ‣ Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Jiang et al. (2025b)
  Z. Jiang, Y. Xie, K. Lin, Z. Xu, W. Wan, A. Mandlekar, L. J. Fan, and Y. Zhu
  Dexmimicgen: automated data generation for bimanual dexterous manipulation via imitation learning.
  In 2025 IEEE International Conference on Robotics and Automation (ICRA),
  pp. 16923–16930.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Kim et al. (2024)
  M. J. Kim, K. Pertsch, S. Karamcheti, T. Xiao, A. Balakrishna, S. Nair, R. Rafailov, E. Foster, G. Lam, P. Sanketi, et al.
  Openvla: an open-source vision-language-action model.
  arXiv preprint arXiv:2406.09246.
  Cited by: [§1](#S1.p1.1 "1 Introduction ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Li et al. (2026)
  R. Li, Y. Zhou, Y. Zhu, K. Chen, J. Wang, S. Wang, K. Hu, M. Yu, B. Jiang, Z. Su, et al.
  Roboclaw: an agentic framework for scalable long-horizon robotic tasks.
  arXiv preprint arXiv:2603.11558.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§2](#S2.SS0.SSS0.Px3.p1.1 "Recursive Self-Improvement for Robot Learning. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Li et al. (2024)
  X. Li, J. Li, Z. Zhang, R. Zhang, F. Jia, T. Wang, H. Fan, K. Tseng, and R. Wang
  Robogsim: a real2sim2real robotic gaussian splatting simulator.
  arXiv preprint arXiv:2411.11839.
  Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Robot Learning via Real2Sim2Real. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Lin et al. (2025)
  Z. Lin, J. Duan, H. Fang, D. Fox, R. Krishna, C. Tan, and B. Wen
  Failsafe: reasoning and recovery from failures in vision-language-action models.
  arXiv preprint arXiv:2510.01642.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Liu et al. (2026)
  Y. Liu, A. Wang, and N. Ye
  V-cage: vision-closed-loop agentic generation engine for robotic manipulation.
  arXiv preprint arXiv:2604.09036.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Mandlekar et al. (2023)
  A. Mandlekar, S. Nasiriany, B. Wen, I. Akinola, Y. Narang, L. Fan, Y. Zhu, and D. Fox
  Mimicgen: a data generation system for scalable robot learning using human demonstrations.
  arXiv preprint arXiv:2310.17596.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Mu et al. (2025)
  Y. Mu, T. Chen, Z. Chen, S. Peng, Z. Lan, Z. Gao, Z. Liang, Q. Yu, Y. Zou, M. Xu, et al.
  Robotwin: dual-arm robot benchmark with generative digital twins.
  In 2025 IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR),
  pp. 27649–27660.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Murali et al. (2025)
  A. Murali, B. Sundaralingam, Y. Chao, W. Yuan, J. Yamada, M. Carlson, F. Ramos, S. Birchfield, D. Fox, and C. Eppner
  Graspgen: a diffusion-based framework for 6-dof grasping with on-generator training.
  arXiv preprint arXiv:2507.13097.
  Cited by: [§B.2](#A2.SS2.SSS0.Px2.p1.1 "Grasp-conditioned motion synthesis. ‣ B.2 Agentic Trajectory Generation ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§3.2](#S3.SS2.p1.1 "3.2 A Reusable Source of Training Experience ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Patel et al. (2025)
  S. Patel, X. Yin, W. Huang, S. Garg, H. Nayyeri, L. Fei-Fei, S. Lazebnik, and Y. Li
  A real-to-sim-to-real approach to robotic manipulation with vlm-generated iterative keypoint rewards.
  In 2025 IEEE International Conference on Robotics and Automation (ICRA),
  pp. 8258–8266.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§2](#S2.SS0.SSS0.Px2.p1.1 "Robot Learning via Real2Sim2Real. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Pfaff et al. (2025)
  N. Pfaff, E. Fu, J. Binagia, P. Isola, and R. Tedrake
  Scalable real2sim: physics-aware asset generation via robotic pick-and-place setups.
  In 2025 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS),
  pp. 6296–6303.
  Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Robot Learning via Real2Sim2Real. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Ross et al. (2011)
  S. Ross, G. Gordon, and D. Bagnell
  A reduction of imitation learning and structured prediction to no-regret online learning.
  In Proceedings of the fourteenth international conference on artificial intelligence and statistics,
  pp. 627–635.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Sundaralingam et al. (2026)
  B. Sundaralingam, A. Murali, and S. Birchfield
  Curobov2: dynamics-aware motion generation with depth-fused distance fields for high-dof robots.
  arXiv preprint arXiv:2603.05493.
  Cited by: [§B.2](#A2.SS2.SSS0.Px3.p1.1 "Validation-guided repair. ‣ B.2 Agentic Trajectory Generation ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§3.2](#S3.SS2.p1.1 "3.2 A Reusable Source of Training Experience ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Tao et al. (2025)
  T. Tao, L. Zhang, Y. Wen, K. Zhang, J. Bian, X. Zhou, T. Yan, K. Zhan, P. Jia, H. Wu, et al.
  RoboPearls: editable video simulation for robot manipulation.
  In 2025 IEEE/CVF International Conference on Computer Vision (ICCV),
  pp. 1–12.
  Cited by: [§F.2](#A6.SS2.p1.1 "F.2 Failure-driven acquisition and adaptive curricula ‣ Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§2](#S2.SS0.SSS0.Px2.p1.1 "Robot Learning via Real2Sim2Real. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Torne et al. (2024)
  M. Torne, A. Simeonov, Z. Li, A. Chan, T. Chen, A. Gupta, and P. Agrawal
  Reconciling reality through simulation: a real-to-sim-to-real approach for robust manipulation.
  arXiv preprint arXiv:2403.03949.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§2](#S2.SS0.SSS0.Px2.p1.1 "Robot Learning via Real2Sim2Real. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Wang et al. (2024)
  L. Wang, Y. Ling, Z. Yuan, M. Shridhar, C. Bao, Y. Qin, B. Wang, H. Xu, and X. Wang
  Gensim: generating robotic simulation tasks via large language models.
  In International Conference on Learning Representations,
  Vol. 2024, pp. 4890–4924.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Wang et al. (2023)
  Y. Wang, Z. Xian, F. Chen, T. Wang, Y. Wang, K. Fragkiadaki, Z. Erickson, D. Held, and C. Gan
  Robogen: towards unleashing infinite data for automated robot learning via generative simulation.
  arXiv preprint arXiv:2311.01455.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Wang et al. (2025)
  Z. Wang, J. Li, J. Zheng, W. Zhang, D. Liu, Y. Zheng, H. Niu, J. Yu, and X. Zhan
  PhysiAgent: an embodied agent framework in physical world.
  arXiv preprint arXiv:2509.24524.
  Cited by: [§F.3](#A6.SS3.p1.1 "F.3 Agentic workflows and execution-time recovery ‣ Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Wu et al. (2025)
  Y. Wu, L. Pan, W. Wu, G. Wang, Y. Miao, F. Xu, and H. Wang
  Rl-gsbridge: 3d gaussian splatting based real2sim2real method for robotic manipulation learning.
  In 2025 IEEE International Conference on Robotics and Automation (ICRA),
  pp. 192–198.
  Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Robot Learning via Real2Sim2Real. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Xia et al. (2026)
  H. Xia, X. Li, Z. Li, Q. Ma, J. Xu, M. Liu, Y. Cui, T. Lin, W. Ma, S. Wang, et al.
  Sage: scalable agentic 3d scene generation for embodied ai.
  arXiv preprint arXiv:2602.10116.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Xiao et al. (2026)
  W. Xiao, H. Lin, A. Peng, H. Xue, T. He, Z. Luo, Y. Xie, F. Hu, J. Fan, G. Shi, et al.
  Self-improving vision-language-action models with data generation via residual rl.
  In International Conference on Learning Representations,
  Vol. 2026, pp. 13209–13236.
  Cited by: [§F.1](#A6.SS1.p1.1 "F.1 Autonomous improvement and corrective experience ‣ Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Xu et al. (2026)
  S. Xu, R. Jin, H. Zhou, B. Yue, G. Qiao, Y. Tai, Y. Deng, K. Jia, and G. Liu
  From reaction to anticipation: proactive failure recovery through agentic task graph for robotic manipulation.
  arXiv preprint arXiv:2605.11951.
  Cited by: [§F.3](#A6.SS3.p1.1 "F.3 Agentic workflows and execution-time recovery ‣ Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Xue et al. (2025)
  Z. Xue, S. Deng, Z. Chen, Y. Wang, Z. Yuan, and H. Xu
  Demogen: synthetic demonstration generation for data-efficient visuomotor policy learning.
  arXiv preprint arXiv:2502.16932.
  Cited by: [§2](#S2.SS0.SSS0.Px1.p1.1 "Simulation-based Scalable Data Generation. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Yang et al. (2026)
  J. Yang, K. Lin, J. Li, W. Zhang, T. Lin, L. Wu, Z. Su, H. Zhao, Y. Zhang, L. Chen, et al.
  Rise: self-improving robot policy with compositional world model.
  arXiv preprint arXiv:2602.11075.
  Cited by: [§2](#S2.SS0.SSS0.Px3.p1.1 "Recursive Self-Improvement for Robot Learning. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Zhang et al. (2025)
  K. Zhang, S. Sha, H. Jiang, M. Loper, H. Song, G. Cai, Z. Xu, X. Hu, C. Zheng, and Y. Li
  Real-to-sim robot policy evaluation with gaussian splatting simulation of soft-body interactions.
  arXiv preprint arXiv:2511.04665.
  Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Robot Learning via Real2Sim2Real. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Zhang and Shah (2026)
  M. Zhang and D. Shah
  Visual verification enables inference-time steering and autonomous policy improvement.
  arXiv preprint arXiv:2606.18247.
  Cited by: [§2](#S2.SS0.SSS0.Px3.p1.1 "Recursive Self-Improvement for Robot Learning. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Zhao et al. (2026)
  H. Zhao, C. Zeng, L. Zhuang, Y. Zhao, S. Xue, H. Wang, X. Zhao, Z. Li, K. Li, S. Huang, et al.
  High-fidelity simulated data generation for real-world zero-shot robotic manipulation learning with gaussian splatting.
  IEEE Robotics and Automation Letters.
  Cited by: [§2](#S2.SS0.SSS0.Px2.p1.1 "Robot Learning via Real2Sim2Real. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Zhao et al. (2023)
  T. Z. Zhao, V. Kumar, S. Levine, and C. Finn
  Learning fine-grained bimanual manipulation with low-cost hardware.
  arXiv preprint arXiv:2304.13705.
  Cited by: [§4](#S4.SS0.SSS0.Px1.p1.1 "Experimental settings. ‣ 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Zhou et al. (2026)
  X. Zhou, Y. Sun, X. Gong, G. Tie, P. Zhou, L. Sun, and Y. Chen
  EmbodiedClaw: conversational workflow execution for embodied ai development.
  arXiv preprint arXiv:2604.13800.
  Cited by: [§F.3](#A6.SS3.p1.1 "F.3 Agentic workflows and execution-time recovery ‣ Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
* Zhou et al. (2024)
  Z. Zhou, P. Atreya, A. Lee, H. Walke, O. Mees, and S. Levine
  Autonomous improvement of instruction following skills via foundation models.
  arXiv preprint arXiv:2407.20635.
  Cited by: [§F.1](#A6.SS1.p1.1 "F.1 Autonomous improvement and corrective experience ‣ Appendix F Additional related work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"),
  [§2](#S2.SS0.SSS0.Px3.p1.1 "Recursive Self-Improvement for Robot Learning. ‣ 2 Related Work ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

## Appendix A RSI implementation and agent coordination

This appendix expands the RSI loop in Section [3.3](#S3.SS3 "3.3 Agent-Guided Recursive Policy Self-Improvement ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"). It documents
state-conditioned handover, failure-attribution records and supervisory
coordination, distinguishing proposed operations, executed corrections and
final outcomes. Environment and trajectory construction are detailed separately
in Appendix [B](#A2 "Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

### A.1 Task interfaces and recovery handover

Task configurations associate the manipulated object and target anchor with a language instruction, grasp candidates, an ordered robot program and reset groups. Each associated waypoint follows the transformation of its source or target object. Members of a reset group share a sampled transformation, while sequential placement and collision handling can introduce dependencies between groups. These associations allow the same task-relative program to be re-grounded after a reset without specifying a new task goal.

The object-route generator returns intermediate world-frame poses with stage labels for lift, optional bypass and pre-placement. Its structured-output checks test object identity, numerical validity, pose representation and stage ordering before geometric review. Failed checks provide feedback for candidate revision. This separates a proposed route from its validation and subsequent execution; a plausible textual proposal alone is not an executable demonstration.

During monitored simulation collection, visual diagnosis and recovery planning are synchronous: the control loop does not advance the simulation while waiting for these operations. Recovery uses the current object and robot states. On return from a correction, observations are refreshed and completion is checked again; the continuation path can return control to the policy under the configured recovery gates. Reaching a feasible entry pose does not guarantee completion of the remaining manipulation.

Event records distinguish a recovery request, any corrective actions actually executed, and the final episode outcome. A request can fail before any correction is executed, while a partially executed correction can be followed by policy completion. Thus, triggering recovery, executing recovery and passing the final task check are distinct events. These training-collection events are also distinct from the policy-generated reattempts observed during unassisted evaluation.

### A.2 Grid attribution records and counting

The grid analysis uses structured rollout records, including reset positions,
final outcomes and subject-attribution labels. A VLM request can assign a
failure to the source-object reset, target-anchor reset or neither; the request
uses the recorded execution evidence rather than requiring a new replay of the
rollout video. Existing attribution records can be reused, so issuing a new
VLM request is optional and does not replace the normalized-grid procedure.
For each subject and cell, valid completed episodes contribute to the
denominator, whereas only final failures with supported attribution to that
subject contribute to the numerator. Low-confidence and unassigned failures do
not increase the corresponding attributed-failure count. An episode that
finishes successfully after recovery is not counted as a final failure.

### A.3 Supervisor scheduling and output validation

##### Skills and workflow state.

The supervisor coordinates the workflow through a typed skill library,

|  |  |  |  |
| --- | --- | --- | --- |
|  | 𝒦={kscene,kcapture,kgrasp,kconfig,kmotion,ktrain,keval},\mathcal{K}=\{k^{\mathrm{scene}},k^{\mathrm{capture}},k^{\mathrm{grasp}},k^{\mathrm{config}},k^{\mathrm{motion}},k^{\mathrm{train}},k^{\mathrm{eval}}\}, |  | (A.1) |

covering scene construction, observation capture, grasp inference and
verification, task-configuration generation, motion synthesis, policy training
and monitored evaluation. Each skill specifies typed inputs, explicit
preconditions, an execution backend and the outputs needed by downstream
operations. The persistent workflow state is

|  |  |  |  |
| --- | --- | --- | --- |
|  | st=(g,b,r,𝐳t,𝒥t,𝒜t),s\_{t}=(g,b,r,\mathbf{z}\_{t},\mathcal{J}\_{t},\mathcal{A}\_{t}), |  | (A.2) |

where gg is the user-specified objective, bb the requested stopping boundary,
rr the scene and run identifier, 𝐳t\mathbf{z}\_{t} the stage states,
𝒥t\mathcal{J}\_{t} the asynchronous jobs, and 𝒜t\mathcal{A}\_{t} the indexed artifacts.
Before execution, the supervisor constructs the dependency chain, assigns
stage-specific computing resources and fixes the requested stopping boundary.

##### Eligibility and stage completion.

At time tt, eligible skills satisfy

|  |  |  |  |
| --- | --- | --- | --- |
|  | 𝒦tready={ki∈𝒦∣Prei(st)=1,Valid(𝒜ireq)=1,ki⪯b}.\mathcal{K}\_{t}^{\mathrm{ready}}=\{k\_{i}\in\mathcal{K}\mid\mathrm{Pre}\_{i}(s\_{t})=1,\ \mathrm{Valid}(\mathcal{A}\_{i}^{\mathrm{req}})=1,\ k\_{i}\preceq b\}. |  | (A.3) |

Here Prei\mathrm{Pre}\_{i} represents dependency and resource constraints,
𝒜ireq\mathcal{A}\_{i}^{\mathrm{req}} is the required upstream artifact set, and
ki⪯bk\_{i}\preceq b prevents execution beyond the requested boundary. The supervisor
selects kt=πsup​(st,𝒦tready)k\_{t}=\pi\_{\mathrm{sup}}(s\_{t},\mathcal{K}\_{t}^{\mathrm{ready}}). Independent
scene- or object-level jobs can be dispatched in parallel on different devices.
Long-running skills return a durable job handle and are monitored through their
runtime state, logs and artifact manifests. Successful completion requires both
a normal process exit and valid required outputs:

|  |  |  |  |
| --- | --- | --- | --- |
|  | Complete(ki)=𝕀[ei=0]∏a∈𝒜iout𝕀[Valid(a)=1].\mathrm{Complete}(k\_{i})=\mathbb{I}[e\_{i}=0]\prod\_{a\in\mathcal{A}\_{i}^{\mathrm{out}}}\mathbb{I}[\mathrm{Valid}(a)=1]. |  | (A.4) |

Here eie\_{i} is the exit code and 𝒜iout\mathcal{A}\_{i}^{\mathrm{out}} contains outputs
required downstream. Persistent services use readiness checks rather than
process-exit semantics.

##### Failure handling.

When a precondition or artifact check fails, the supervisor localizes the
earliest invalid dependency and requests the corresponding upstream repair,
rather than restarting the entire workflow. Transient communication failures
are handled by recovering the latest durable job and stage state before making
a new scheduling decision. These runtime checks support the scene-to-policy
coordination described in Section [3](#S3 "3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") without treating a process exit or an
accepted tool request as sufficient evidence of task completion.

## Appendix B Environment and trajectory infrastructure

The simulator and trajectory generator provide the reusable infrastructure for
RSI. This appendix retains the scene compilation, collision rectification,
trajectory validation and reset-aware execution details summarized in
Sections [3.1](#S3.SS1 "3.1 An Executable Environment for RSI ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") and [3.2](#S3.SS2 "3.2 A Reusable Source of Training Experience ‣ 3 Method: A System for Recursive Policy Self-Improvement ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"). These tools
serve initial collection, state-conditioned recovery and targeted recollection;
they are not separate deployment-time controllers.

### B.1 Agentic Real2Sim Scene Construction and Refinement

A reconstructed workspace is useful for learning only when it supports both
physically valid interactions and explicit task goals. We therefore formulate
Real2Sim construction as an *agentic scene compiler*: visual and semantic
reasoning specifies the objects and their intended relations, while geometric
tools implement and check the corresponding scene operations. Given a tabletop
image, optionally accompanied by a target image and language prompt, the compiler
produces an initial scene and an organized target layout
(Figure [B.1](#A2.F1 "Figure B.1 ‣ Support-aware collision rectification. ‣ B.1 Agentic Real2Sim Scene Construction and Refinement ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")). Their difference defines the object-level goals
for demonstration generation.

##### Object-centric reconstruction.

A vision–language model (VLM) identifies the table and visible movable objects
in the input image I0I\_{0}. SAM 3 produces instance masks and SAM 3D reconstructs
the corresponding textured meshes ([Carion et al., 2026](#bib.bib22); [Chen et al., 2026](#bib.bib23)). The scene is
represented as

|  |  |  |  |
| --- | --- | --- | --- |
|  | 𝒮0={oT,o1,…,oN},oi=(ci,mi,Ti0),\mathcal{S}\_{0}=\{o\_{T},o\_{1},\ldots,o\_{N}\},\qquad o\_{i}=(c\_{i},m\_{i},T\_{i}^{0}), |  | (B.1) |

where oTo\_{T} is the table, and cic\_{i}, mim\_{i} and Ti0∈SE⁡(3)T\_{i}^{0}\in\mathrm{SE}(3) are an
object’s semantic category, mesh and initial pose. Object identity is maintained
through scene editing and trajectory generation, so that an instruction refers
to the same object in the rendered workspace, geometric checks and robot program.

##### Simulation instantiation.

The scene agent configures the reconstructed assets for simulation,
setting and adjusting object scale, poses, and physical properties to
obtain an executable task environment.
The resulting scene undergoes collision and support checks before
task and trajectory generation.

##### Support-aware collision rectification.

Imperfect reconstruction can leave objects interpenetrating, particularly in
cluttered tabletop scenes. Agent-Guided Adaptive Collision Rectification (AACR)
resolves these collisions while preserving the support and containment relations
inferred from I0I\_{0}. The agent first partitions the non-table objects into
support-aware groups 𝒢={G1,…,GK}\mathcal{G}=\{G\_{1},\ldots,G\_{K}\}.
*Parallel Horizontal Rectification* separates intersecting groups by
selecting a central root and moving other groups outward. A group moves as a
unit, preserving its internal relations; only groups with disjoint swept
regions are adjusted in the same parallel batch. The settled set is then
updated before the next batch is processed.

*Adaptive Intra-group Rectification* resolves the remaining collisions
within each group. The agent selects a correction according to the object
relation: horizontal separation for objects sharing a support, vertical
adjustment for containment, or bounded tilt for insertion-like arrangements.
The selected geometric operator applies and validates the pose change. Thus,
semantic reasoning determines which adjustment is appropriate, rather than
replacing collision checking. The group-selection and displacement rules are
given in Section [B.3](#A2.SS3 "B.3 Scene geometry ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") below.

![Refer to caption](2609.38905v3/agent_scene_pipeline.png)

Figure B.1: From deployment observations to task-defining scenes.
Object reconstruction and support-aware collision rectification produce the initial scene.
The scene agent iteratively refines object poses using multi-view feedback and geometric validation to obtain the target scene.
The scene pair defines manipulation goals for trajectory generation.

##### Task-oriented scene organization.

The scene agent compares the original image I0I\_{0} with a rendering of the
rectified scene and generates an organization instruction ℒ\mathcal{L}.
A supplied target image or language prompt can further specify the intended
layout. The agent first uses relation-specific tools, such as
on-top-of, inside and beside, to establish a coarse
arrangement. It then refines object translations and rotations, with individual
object agents operating in parallel. Rendered views and structured object states
make the consequences of an edit available for critique and revision. This
coarse-to-fine process separates deciding *which relation should hold* from
finding poses that realize that relation without invalid geometry.

The accepted target scene is

|  |  |  |  |
| --- | --- | --- | --- |
|  | 𝒮org={(ci,mi,Tiorg)}i∈{T,1,…,N}.\mathcal{S}\_{\mathrm{org}}=\{(c\_{i},m\_{i},T\_{i}^{\mathrm{org}})\}\_{i\in\{T,1,\ldots,N\}}. |  | (B.2) |

The initial and organized layouts specify what the robot should change.
During task compilation, these goals are associated with language instructions,
grasps, waypoints and reset groups. Objects in a reset group share a sampled
transformation. Source- and target-associated waypoints subsequently follow
their respective anchors, allowing the same task to be practiced under different
configurations without redefining its goal.

### B.2 Agentic Trajectory Generation

The scene pair defines the desired transition, but not a feasible way for the
robot to execute it. The trajectory-generation agent
𝒜traj\mathcal{A}\_{\mathrm{traj}} bridges this gap by proposing object motions,
projecting them through candidate grasps and validating the resulting robot
programs. Its interface is

|  |  |  |  |
| --- | --- | --- | --- |
|  | 𝒜traj:(𝒮0,𝒮org,l)⟼(𝒞,𝒟demo,ℰ),\mathcal{A}\_{\mathrm{traj}}:(\mathcal{S}\_{0},\mathcal{S}\_{\mathrm{org}},l)\longmapsto(\mathcal{C},\mathcal{D}\_{\mathrm{demo}},\mathcal{E}), |  | (B.3) |

where ll is the task instruction, 𝒞\mathcal{C} is a library of executable
configurations, 𝒟demo\mathcal{D}\_{\mathrm{demo}} contains accepted demonstrations
and ℰ\mathcal{E} records validation evidence. The same trajectory tools later
support recovery from policy-failed states and recollection under revised
reset ranges. Demonstration generation is therefore a reusable part of the
learning loop, not a one-time preprocessing stage.

##### Object-centric task compilation.

The agent compares 𝒮0\mathcal{S}\_{0} and 𝒮org\mathcal{S}\_{\mathrm{org}}, identifies
objects whose states must change and compiles an ordered list of subtasks,

|  |  |  |  |
| --- | --- | --- | --- |
|  | 𝒯=(χj)j=1M,χj=(oij,bj,ρj).\mathcal{T}=(\chi\_{j})\_{j=1}^{M},\qquad\chi\_{j}=(o\_{i\_{j}},b\_{j},\rho\_{j}). |  | (B.4) |

Here oijo\_{i\_{j}} is the manipulated object, bjb\_{j} its target anchor or support,
and ρj\rho\_{j} the desired relation. The order accounts for accessibility,
target occupancy and earlier placements; the subtask count MM need not equal
the number of reconstructed objects NN. For each subtask, a VLM planner
proposes object-space routes comprising lift, optional bypass and pre-placement
poses. These routes are simplified, refined for clearance and densified to
bound translation and rotation between consecutive states. Planning in object
space allows the intended motion to be evaluated before a particular grasp is
chosen.

##### Grasp-conditioned motion synthesis.

GraspGen supplies candidate grasps ([Murali et al., 2025](#bib.bib24)), which are screened
for grasp quality, endpoint reachability and collision clearance. For a grasp
Tg,i0T\_{g,i}^{0} on object ii, the object-relative gripper transform is preserved
along an object route:

|  |  |  |  |
| --- | --- | --- | --- |
|  | Toi→g=(Toi0)−1​Tg,i0,Tg,ij=Toij​Toi→g.T\_{o\_{i}\rightarrow g}=(T\_{o\_{i}}^{0})^{-1}T\_{g,i}^{0},\qquad T\_{g,i}^{j}=T\_{o\_{i}}^{j}T\_{o\_{i}\rightarrow g}. |  | (B.5) |

An accepted route can thus be reused across grasp candidates without
regenerating its semantic path. Pick and place are checked jointly. When an endpoint pair is unreachable, pick and place poses are repaired
jointly using bounded SE⁡(3)\mathrm{SE}(3) adjustments.
The repaired poses must satisfy the shared object-relative grasp relation
in Eq. ([B.5](#A2.E5 "In Grasp-conditioned motion synthesis. ‣ B.2 Agentic Trajectory Generation ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")). Pre-grasp, gripper closure, release and post-release retract
complete the waypoint program.

##### Validation-guided repair.

A plausible object route does not by itself establish a valid demonstration.
EmbodiRSI uses three checks before admitting a configuration to 𝒞\mathcal{C}.
First, a swept full-mesh test checks the carried object along each interpolated
segment, with narrowly scoped exemptions for intended support and target
contact. Second, multi-view renderings allow a VLM reviewer to assess route
efficiency, orientation consistency and target approach. Third, cuRobo validates
the complete robot program sequentially, initializing each transition from the
preceding terminal joint state ([Sundaralingam et al., 2026](#bib.bib25)). Because the
carried object’s swept geometry is checked separately, its stale source-pose
mesh is disabled after grasping; robot collision checking against the rest of
the scene remains active.

When a transition is infeasible, the agent first attempts route contraction,
then searches bounded local pose adjustments around the first infeasible
waypoint. A repaired candidate must pass the geometric and sequential-motion
checks again, together with renewed visual review when its object route
changes. Only programs feasible through post-release retract are accepted.
These checks connect high-level proposals to executable supervision while
allowing invalid candidates to be repaired rather than treated as training data.

##### Reset-aware execution and data curation.

At collection time, scene objects are randomized within their admissible reset
ranges. Once physics has settled, each stored waypoint is re-grounded to the
measured pose of its associated source or target anchor r⁡(j)r(j):

|  |  |  |  |
| --- | --- | --- | --- |
|  | T~e​ej=Tr⁡(j)cur​(T¯r⁡(j))−1​T¯e​ej,\widetilde{T}\_{ee}^{j}=T\_{r(j)}^{\mathrm{cur}}(\overline{T}\_{r(j)})^{-1}\overline{T}\_{ee}^{j}, |  | (B.6) |

where overbars denote poses stored in the configuration. Each segment is
replanned from the measured joint state and then executed. Transit motions
permit broader local pose search, whereas grasp and placement use tightly
bounded planar fallbacks to preserve the task relation.

Execution supplies a fourth validation layer. The system checks the
object–gripper relation after grasping, verifies transport at designated
waypoints and compares the settled object pose after release with the
reset-adjusted target. A generated demonstration is retained only when

|  |  |  |  |
| --- | --- | --- | --- |
|  | Accept⁡(τ)=Vmesh∧Vview∧Vmotion∧Vexec.\operatorname{Accept}(\tau)=V\_{\mathrm{mesh}}\land V\_{\mathrm{view}}\land V\_{\mathrm{motion}}\land V\_{\mathrm{exec}}. |  | (B.7) |

The terms denote swept-mesh, visual-review, sequential-motion and execution-time validity.
Failed demonstrations are rejected and resampled. Accepted records contain multi-camera observations, joint states, velocities, efforts and commanded actions in LeRobot format. Together, proposal, validation, repair and execution turn an object-level task into varied training demonstrations without manual waypoint scripting.

### B.3 Scene geometry

##### Parallel Horizontal Rectification.

AACR partitions non-table objects into support-aware groups
𝒢={G1,…,GK}\mathcal{G}=\{G\_{1},\ldots,G\_{K}\}. PHR treats each group as a unit while resolving
inter-group overlap. Let 𝐩k\mathbf{p}\_{k} denote the center of GkG\_{k} projected onto
the tabletop plane, represented in world coordinates with zero vertical
component. The root minimizes the sum of planar distances to the other groups;
each non-root group is assigned the corresponding outward direction:

|  |  |  |  |
| --- | --- | --- | --- |
|  | r=arg⁡min⁡∑j≠kk⁡‖𝐩k−𝐩j‖2,𝐝k=𝐩k−𝐩r‖𝐩k−𝐩r‖2,k≠r,𝐩k≠𝐩r.r=\arg\min\_{k}\sum\_{j\neq k}\|\mathbf{p}\_{k}-\mathbf{p}\_{j}\|\_{2},\qquad\mathbf{d}\_{k}=\frac{\mathbf{p}\_{k}-\mathbf{p}\_{r}}{\|\mathbf{p}\_{k}-\mathbf{p}\_{r}\|\_{2}},\quad k\neq r,\ \mathbf{p}\_{k}\neq\mathbf{p}\_{r}. |  | (B.8) |

The displacement δ​𝐝k\delta\mathbf{d}\_{k} is horizontal. Starting from the settled
anchor set ℋ0={Gr}\mathcal{H}\_{0}=\{G\_{r}\}, each unresolved group is assigned the minimum
displacement that removes overlap with the settled groups:

|  |  |  |  |
| --- | --- | --- | --- |
|  | δk∗=min⁡{δ≥0∣(Gk+δ​𝐝k)∩ℋt=∅},G^k=Gk+δk∗​𝐝k.\delta\_{k}^{\*}=\min\{\delta\geq 0\mid(G\_{k}+\delta\mathbf{d}\_{k})\cap\mathcal{H}\_{t}=\emptyset\},\qquad\widehat{G}\_{k}=G\_{k}+\delta\_{k}^{\*}\mathbf{d}\_{k}. |  | (B.9) |

Intersections refer to occupied geometry. A conflict-aware parallel batch
ℬt\mathcal{B}\_{t} contains only groups whose proposed swept regions are disjoint:

|  |  |  |  |
| --- | --- | --- | --- |
|  | Sweep⁡(Gi,G^i)∩Sweep⁡(Gj,G^j)=∅,Gi,Gj∈ℬt,i≠j.\operatorname{Sweep}(G\_{i},\widehat{G}\_{i})\cap\operatorname{Sweep}(G\_{j},\widehat{G}\_{j})=\emptyset,\qquad G\_{i},G\_{j}\in\mathcal{B}\_{t},\ i\neq j. |  | (B.10) |

Here Sweep\operatorname{Sweep} denotes the spatial region traversed during the
proposed translation. The selected groups are moved simultaneously, and the
settled set is updated as

|  |  |  |  |
| --- | --- | --- | --- |
|  | ℋt+1=ℋt∪{G^k∣Gk∈ℬt}.\mathcal{H}\_{t+1}=\mathcal{H}\_{t}\cup\{\widehat{G}\_{k}\mid G\_{k}\in\mathcal{B}\_{t}\}. |  | (B.11) |

The equations specify the non-degenerate geometry. AIR subsequently addresses
within-group overlap using the relation-specific horizontal, vertical and
bounded-tilt corrections described in Section [B.1](#A2.SS1 "B.1 Agentic Real2Sim Scene Construction and Refinement ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

### B.4 Sequential motion execution

Robot transitions are planned sequentially, with the terminal joint state of
one transition used to initialize the next:

|  |  |  |  |
| --- | --- | --- | --- |
|  | ξi,k∗=Plan⁡(qi,k−1,Tg,ik,𝒲i,k),qi,k=Last⁡(ξi,k∗).\xi^{\*}\_{i,k}=\operatorname{Plan}(q\_{i,k-1},T^{k}\_{g,i},\mathcal{W}\_{i,k}),\qquad q\_{i,k}=\operatorname{Last}(\xi^{\*}\_{i,k}). |  | (B.12) |

Here 𝒲i,k\mathcal{W}\_{i,k} is the collision world used for the transition. At
collection time, Eq. ([B.6](#A2.E6 "In Reset-aware execution and data curation. ‣ B.2 Agentic Trajectory Generation ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")) re-grounds each
waypoint using the current pose of its source object or target anchor. This
preserves task-relative motion after a reset. The corresponding geometry and
motion checks are repeated after a repair; visual review is repeated when the
object route changes.

## Appendix C Task environments and scene reconstruction results

### C.1 Robot platform and evaluated tasks

Section [4](#S4 "4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") and Figure [3](#S4.F3 "Figure 3 ‣ Training budgets and evaluation. ‣ 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") present the
robot platform and paired physical/simulated workspaces. Table [C.1](#A3.T1 "Table C.1 ‣ C.1 Robot platform and evaluated tasks ‣ Appendix C Task environments and scene reconstruction results ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
lists all 14 object-level task goals shared by each simulation–real pair.
One policy covers the subtasks of each scene and training setting; tasks are
evaluated separately. The matched-collection comparison uses S1 and S3.

Table C.1: Manipulation subtask definitions. Initial and goal relations are kept fixed across the corresponding simulation and real-world task definitions.

|  |  |
| --- | --- |
| Subtask | Goal |
| S1-1 | Place glasses on the stand. |
| S1-2 | Put the red-cap marker in the green cup. |
| S1-3 | Put the yellow-cap marker in the basket. |
| S1-4 | Place the mouse on the mouse pad. |
| S1-5 | Put the red pen in the green box. |
| S1-6 | Put the black pen in the pen holder. |
| S2-1 | Place the blue bowl on the plate. |
| S2-2 | Put the carrot in the basket. |
| S2-3 | Put the eggplant in the basket. |
| S2-4 | Put the red chilli in the basket. |
| S3-1 | Place the soda bottle on the shelf. |
| S3-2 | Put the pencil case in the metal box. |
| S3-3 | Place the snack bag on the shelf. |
| S3-4 | Put the candy wrapper in the can. |

### C.2 Reconstruction and organization examples

Figure [C.1](#A3.F1 "Figure C.1 ‣ C.2 Reconstruction and organization examples ‣ Appendix C Task environments and scene reconstruction results ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") places selected observations beside their reconstructions and illustrates how an initial layout defines an organization goal. The examples complement the actual evaluation environments in Figure [3](#S4.F3 "Figure 3 ‣ Training budgets and evaluation. ‣ 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

![Refer to caption](2609.38905v3/reconstruction_pairs.png)

Figure C.1: Qualitative examples of scene reconstruction and organization.
a,b, Mobile-camera and robot-camera observations paired with reconstructed scenes; views are not pixel-aligned.
c, Initial and target layouts illustrating object-level manipulation goals.

Figure [C.2](#A3.F2 "Figure C.2 ‣ C.2 Reconstruction and organization examples ‣ Appendix C Task environments and scene reconstruction results ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") expands the scene-agent workflow using an example initial and target layout. It separates semantic assessment from deterministic validation and complements the method pipeline in Figure [B.1](#A2.F1 "Figure B.1 ‣ Support-aware collision rectification. ‣ B.1 Agentic Real2Sim Scene Construction and Refinement ‣ Appendix B Environment and trajectory infrastructure ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

![Refer to caption](2609.38905v3/scene_refinement.png)

Figure C.2: Iterative scene organization through critique, editing, and validation.
The critic compares rendered views and object states with target relations to guide pose adjustments.
Collision and support checks validate each edit before re-rendering.
The accepted layout defines object-level goals for trajectory generation.

Figure [C.3](#A3.F3 "Figure C.3 ‣ C.2 Reconstruction and organization examples ‣ Appendix C Task environments and scene reconstruction results ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") presents additional input–reconstruction pairs.

![Refer to caption](2609.38905v3/reconstruction_gallery.png)

Figure C.3: Qualitative input–reconstruction pairs.
a–d, Mobile-camera, web, robot-camera, and AI-generated inputs, respectively.
Each pair shows the input on the left and reconstruction on the right.
Examples extend beyond the evaluation benchmark; views are not aligned in pose or scale.

## Appendix D Training data and evaluation protocol

### D.1 Training data and retained-trajectory budgets

Every stated data budget is the number of retained training trajectories for *each subtask*. Data from all subtasks of a scene train one scene-specific policy. Table [D.1](#A4.T1 "Table D.1 ‣ D.1 Training data and retained-trajectory budgets ‣ Appendix D Training data and evaluation protocol ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") separates the sources of training experience; Tables [D.2](#A4.T2 "Table D.2 ‣ Training-data selection. ‣ D.1 Training data and retained-trajectory budgets ‣ Appendix D Training data and evaluation protocol ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") and [D.3](#A4.T3 "Table D.3 ‣ Training-data selection. ‣ D.1 Training data and retained-trajectory budgets ‣ Appendix D Training data and evaluation protocol ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") give per-subtask and scene-total counts.

Table D.1: Experience sources and retained-data notation. The notation separates monitored training rollouts, corrective data and newly generated demonstrations. The reported quotas distinguish newly generated from rollout-derived data, without a separate count for each rollout-derived source. No numerical allocation between base and targeted collection is inferred from those quotas. Policy and correction symbols denote sources within episodes, not separately counted episode datasets.

|  |  |  |
| --- | --- | --- |
| Data item | Source and learning role | Budget accounting |
| 𝒟0\mathcal{D}\_{0} | Initial validated simulation demonstrations. | 50 per subtask at R0. |
| 𝒟kmon\mathcal{D}\_{k}^{\mathrm{mon}} | Policy-generated trajectories recorded during monitored training collection. | Part of rollout-derived data. |
| 𝒟krec\mathcal{D}\_{k}^{\mathrm{rec}} | Corrections generated from eligible intermediate states reached during collection. | Part of rollout-derived data. |
| 𝒟kroll\mathcal{D}\_{k}^{\mathrm{roll}} | Retained data assembled from monitored and corrective sources. | 50 added at R1; 100 at R2. |
| 𝒟knew\mathcal{D}\_{k}^{\mathrm{new}} | Newly generated demonstrations after collection configurations are updated. | 100 added at each round. |
| Real HIL data | Real-world training rollouts with operator corrections. | 10 per subtask; pooled within scene. |
| Real test records | Autonomous policy evaluation, independent of HIL training. | Ten trials per subtask and setting; not training data. |

R0 uses 50 generated demonstrations per subtask. R1 adds 100 newly generated
and 50 rollout-derived trajectories; R2 adds 100 of each, giving cumulative
budgets of 200 and 400. The counts describe retained training sets, not total
acquisition attempts, transitions or computation.

##### Training-data selection.

Our learning formulation supports joint training on successful and
unsuccessful trajectories. In the reported experiments, however, only
trajectories that ultimately completed the task were retained for policy
training. These include episodes that succeeded after corrective
intervention and may therefore contain intermediate policy errors.
Unsuccessful monitored rollouts informed failure attribution and targeted
collection but were excluded from the policy-training dataset.
All reported training budgets count retained successful trajectories.

Table D.2: Simulation training schedule per subtask. The two data columns are additions at the indicated stage; the total is cumulative. For R1/R2, newly generated demonstrations are 𝒟knew\mathcal{D}\_{k}^{\mathrm{new}} and retained rollout-derived data are 𝒟kroll\mathcal{D}\_{k}^{\mathrm{roll}}. R0 contains the initial generated demonstrations. Counts do not include performance-test episodes.

|  |  |  |  |
| --- | --- | --- | --- |
| Stage | Newly generated  demonstrations | Retained rollout-  derived data | Cumulative  total |
| R0 | 50 | 0 | 50 |
| R1 | 100 | 50 | 200 |
| R2 | 100 | 100 | 400 |

Table D.3: Scene-level trajectory budgets. Counts equal the reported per-subtask budget multiplied by the number of subtasks covered by the scene policy. Real-only 10 and HIL+10 contain the same number of trajectories but are different training settings. The last row is evaluation, not training; each real-world subtask is tested in ten autonomous rollouts.

|  |  |  |  |
| --- | --- | --- | --- |
| Dataset / evaluation | S1 (6 tasks) | S2 (4 tasks) | S3 (4 tasks) |
| R0 simulation training | 300 | 200 | 200 |
| R1 simulation training | 1,200 | 800 | 800 |
| R2 simulation training | 2,400 | 1,600 | 1,600 |
| HIL+10 real training | 60 | 40 | 40 |
| Real-only 10 training | 60 | 40 | 40 |
| Real-only 100 training | 600 | 400 | 400 |
| Real-only 200 training | 1,200 | 800 | 800 |
| Real test episodes per setting | 60 | 40 | 40 |

### D.2 Real-world refinement and comparison settings

For each scene, the simulation-evolved policy is refined using 10 retained real-world HIL training trajectories per subtask. An operator corrects undesirable execution, such as slippage or inaccurate placement, and the retained data are annotated for the same conditioned training objective used in simulation. Data are pooled across subtasks to update the shared scene policy. Final real-world test rollouts are collected independently of HIL training.

The Real-only baselines use real-world demonstrations at budgets of 10, 100 and 200 trajectories per subtask, without the task-specific simulation stage. These demonstrations are collected by trained data-collection operators following a standard operating procedure. Static simulation collection continues from the initial demonstration dataset under the original reset distribution; EmbodiRSI instead combines rollout-derived experience with targeted recollection. Static and adaptive comparisons share the 50-trajectory-per-subtask initial dataset and match cumulative retained trajectory counts. The compared policies use the same architecture and training recipe. Table [D.4](#A4.T4 "Table D.4 ‣ D.2 Real-world refinement and comparison settings ‣ Appendix D Training data and evaluation protocol ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") summarizes these settings. Equal real-world trajectory budgets do not imply identical datasets; Real-only demonstrations and HIL corrections are distinct collection settings.

Table D.4: Training and collection settings. Budgets are retained trajectories per subtask. The table distinguishes the adaptation data sources and configuration-sampling procedures. Equal real-data counts do not imply identical trajectories.

|  |  |  |  |
| --- | --- | --- | --- |
| Setting | Real-only | Static simulation | EmbodiRSI (adaptive) |
| Scene policy | One per scene | One per scene | One per scene |
| Architecture | Same policy architecture across compared groups | | |
| Initial simulation data | Not used | Shared 50 demonstrations per subtask | Same initial dataset as Static |
| Subsequent reset sampling | Real collection | Original configuration distribution | Feedback-guided configuration update |
| Simulation trajectory budget | None | 200 or 400 | 200 (R1) or 400 (R2) |
| Training recipe | Same policy-training recipe across compared groups | | |
| Real training source | Demonstrations at 10/100/200 per subtask | Zero-shot or +10 HIL | Zero-shot or +10 HIL |
| Role in comparison | Physical-data reference | Static-collection control | Adaptive-collection workflow |

### D.3 Autonomous evaluation protocol

Each subtask is evaluated separately with the scene’s trained policy. Agent takeover, planner-generated recovery and human correction are disabled; policy-generated reattempts remain part of autonomous execution. Outcomes are scored against the corresponding task definition. Here zero-shot real deployment means no task-specific real-world policy refinement; the simulation itself is constructed from observations of the target workspace.

In simulation, each task–checkpoint pair is tested in repeated rollouts under its evaluation reset configuration. The number of episodes varies across pairs. Success is rs,j=100​Ns,jsucc/Ns,jtestr\_{s,j}=100N^{\mathrm{succ}}\_{s,j}/N^{\mathrm{test}}\_{s,j}, where Ns,jtestN^{\mathrm{test}}\_{s,j} is the total number of attempted evaluation episodes. These performance tests are distinct from monitored training collection, denoted by 𝒟mon\mathcal{D}^{\mathrm{mon}}.

Real-world evaluation uses ten autonomous rollouts per subtask and setting, separate from HIL training collection, giving 140 test episodes for a fully evaluated setting. The empirical task rate is rs,j=100​Ns,jsucc/10r\_{s,j}=100N^{\mathrm{succ}}\_{s,j}/10. Subtasks sharing a policy are not independently trained policy replicates.

### D.4 Statistical analysis and numerical precision

Scene-level standard deviations describe variation across subtasks sharing a policy, not independent training runs. Task-matched comparisons do not imply episode-wise pairing of resets.
For scene ss with MsM\_{s} subtasks and task success percentages rs,jr\_{s,j}, we report

|  |  |  |  |
| --- | --- | --- | --- |
|  | r¯s=1Ms​∑j=1Msrs,j,ss=1Ms−1​∑j=1Ms(rs,j−r¯s)2.\overline{r}\_{s}=\frac{1}{M\_{s}}\sum\_{j=1}^{M\_{s}}r\_{s,j},\qquad s\_{s}=\sqrt{\frac{1}{M\_{s}-1}\sum\_{j=1}^{M\_{s}}(r\_{s,j}-\overline{r}\_{s})^{2}}. |  | (D.1) |

Here M1=6M\_{1}=6 and M2=M3=4M\_{2}=M\_{3}=4. Real-world rates use integer success counts; simulation summaries use the tabulated task-level percentages. For a fixed real-world task and trained policy, Figure [E.1](#A5.F1 "Figure E.1 ‣ E.2 Real-world transfer ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") additionally reports pointwise 95% Wilson intervals under an independent binomial model. For p^=Nsucc/n\widehat{p}=N^{\mathrm{succ}}/n, n=10n=10 and z.975=1.959964z\_{.975}=1.959964, the interval is

|  |  |  |  |
| --- | --- | --- | --- |
|  | p^+z.9752/(2​n)±z.975​p^​(1−p^)/n+z.9752/(4​n2)1+z.9752/n.\frac{\widehat{p}+z\_{.975}^{2}/(2n)\ \pm\ z\_{.975}\sqrt{\widehat{p}(1-\widehat{p})/n+z\_{.975}^{2}/(4n^{2})}}{1+z\_{.975}^{2}/n}. |  | (D.2) |

The main aggregate is the scene-balanced mean r¯=13​∑s=13r¯s\overline{r}=\frac{1}{3}\sum\_{s=1}^{3}\overline{r}\_{s}, reported without an overall SD to keep it distinct from the within-scene statistics. Pooled real-world success counts are a different weighting: for example, R2+10 has 116/140 successes, whereas its scene-balanced mean is 83.1%. Collection-method differences are formed per subtask before summarization, ds,j=rs,jadaptive−rs,jstaticd\_{s,j}=r^{\mathrm{adaptive}}\_{s,j}-r^{\mathrm{static}}\_{s,j}. Their mean and sample SD are reported in percentage points. Equal-scene collection-comparison means use S1 and S3 only.

All calculations retain the supplied input precision and use round-half-up to one decimal only for final displayed percentages, SDs and gains. Simulation collection comparisons use the complete S1/S3 results at both matched budgets; no Static result is extrapolated to S2. In task-level direction counts, increases, ties and decreases refer to observed success rates, not hypothesis tests.

## Appendix E Detailed results and behavioral observations

Task-level results and qualitative observations are grouped below; experimental
and statistical definitions are provided in Appendix [D](#A4 "Appendix D Training data and evaluation protocol ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

### E.1 Simulation evolution

Table [E.1](#A5.T1 "Table E.1 ‣ E.1 Simulation evolution ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") reports per-task simulation success across collection-and-training rounds.

Table E.1: Task-level simulation success (%).
Scene summaries report mean ±\pm sample SD across subtasks (S1: six; S2/S3: four each), not confidence intervals.
The final row weights scenes equally and reports no SD.
Numbers in column headers denote simulated training trajectories per subtask.

|  |  |  |  |
| --- | --- | --- | --- |
| Task | R0 (50) | R1 (200) | R2 (400) |
| S1: Office Table | | | |
| Glasses →\rightarrow stand | 44.5 | 64.9 | 80.7 |
| Red-cap marker →\rightarrow green cup | 34.034.0 | 50.150.1 | 75.375.3 |
| Yellow-cap marker →\rightarrow basket | 26.1 | 30.930.9 | 57.057.0 |
| Mouse →\rightarrow mouse pad | 33.3 | 70.1 | 85.1 |
| Red pen →\rightarrow green box | 17.5 | 36.036.0 | 72.072.0 |
| Black pen →\rightarrow pen holder | 14.0 | 42.242.2 | 76.576.5 |
| Mean ±\pm SD | 28.2±11.428.2\pm 11.4 | 49.0±15.849.0\pm 15.8 | 74.4±9.774.4\pm 9.7 |
| S2: Kitchen Table | | | |
| Blue bowl →\rightarrow plate | 75.0 | 84.0 | 86.0 |
| Carrot →\rightarrow basket | 90.0 | 94.0 | 98.6 |
| Eggplant →\rightarrow basket | 32.3 | 74.0 | 82.5 |
| Red chili →\rightarrow basket | 84.0 | 86.0 | 96.2 |
| Mean ±\pm SD | 70.3±26.170.3\pm 26.1 | 84.5±8.284.5\pm 8.2 | 90.8±7.890.8\pm 7.8 |
| S3: Household Table | | | |
| Soda bottle →\rightarrow shelf | 62.0 | 76.0 | 88.0 |
| Pencil case →\rightarrow metal box | 72.0 | 94.0 | 96.0 |
| Snack bag →\rightarrow shelf | 28.6 | 68.0 | 75.5 |
| Candy wrapper →\rightarrow can | 48.0 | 76.0 | 82.0 |
| Mean ±\pm SD | 52.7±18.852.7\pm 18.8 | 78.5±11.078.5\pm 11.0 | 85.4±8.785.4\pm 8.7 |
| Scene-balanced mean | 50.450.4 | 70.770.7 | 83.583.5 |

### E.2 Real-world transfer

Table [E.2](#A5.T2 "Table E.2 ‣ E.2 Real-world transfer ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") gives the exact physical test counts, including task-level ties and lower observed outcomes. Tests are independent of HIL(human-in-the-loop) training and exclude external correction. Scene-balanced and pooled summaries use different weighting, as defined in Appendix [D](#A4 "Appendix D Training data and evaluation protocol ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

Table E.2: Task-level real-world performance.
Task entries are successes out of ten autonomous tests.
Scene summaries report mean success (%) ±\pm sample SD across subtasks; the final row weights scenes equally, without an SD.
R1/R2 use 200/400 simulated training trajectories per subtask; +10 adds ten real HIL trajectories per subtask.
Real 10/100/200 denote real-only training with 10/100/200 demonstrations per subtask.

|  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Task | R1 | R1+10 | R2 | R2+10 | Real 10 | Real 100 | Real 200 |
| S1: Office Table | | | | | | | |
| Glasses →\rightarrow stand | 7/10 | 8/10 | 10/10 | 10/10 | 3/10 | 7/10 | 7/10 |
| Red-cap marker →\rightarrow green cup | 3/10 | 6/10 | 3/10 | 7/10 | 0/10 | 4/10 | 7/10 |
| Yellow-cap marker →\rightarrow basket | 6/10 | 6/10 | 6/10 | 9/10 | 1/10 | 5/10 | 7/10 |
| Mouse →\rightarrow mouse pad | 6/10 | 8/10 | 8/10 | 9/10 | 3/10 | 8/10 | 8/10 |
| Red pen →\rightarrow green box | 2/10 | 5/10 | 2/10 | 7/10 | 1/10 | 5/10 | 7/10 |
| Black pen →\rightarrow pen holder | 2/10 | 5/10 | 3/10 | 7/10 | 0/10 | 5/10 | 6/10 |
| Mean ±\pm SD | 43.3  ±\pm 22.5 | 63.3  ±\pm 13.7 | 53.3  ±\pm 32.0 | 81.7  ±\pm 13.3 | 13.3  ±\pm 13.7 | 56.7  ±\pm 15.1 | 70.0  ±\pm 6.3 |
| S2: Kitchen Table | | | | | | | |
| Blue bowl →\rightarrow plate | 5/10 | 9/10 | 6/10 | 10/10 | 5/10 | 6/10 | 9/10 |
| Carrot →\rightarrow basket | 6/10 | 8/10 | 7/10 | 7/10 | 5/10 | 7/10 | 7/10 |
| Eggplant →\rightarrow basket | 6/10 | 8/10 | 9/10 | 8/10 | 4/10 | 6/10 | 8/10 |
| Red chili →\rightarrow basket | 7/10 | 8/10 | 6/10 | 9/10 | 4/10 | 6/10 | 7/10 |
| Mean ±\pm SD | 60.0  ±\pm 8.2 | 82.5  ±\pm 5.0 | 70.0  ±\pm 14.1 | 85.0  ±\pm 12.9 | 45.0  ±\pm 5.8 | 62.5  ±\pm 5.0 | 77.5  ±\pm 9.6 |
| S3: Household Table | | | | | | | |
| Soda bottle →\rightarrow shelf | 6/10 | 9/10 | 7/10 | 8/10 | 3/10 | 5/10 | 7/10 |
| Pencil case →\rightarrow metal box | 6/10 | 8/10 | 8/10 | 9/10 | 2/10 | 5/10 | 7/10 |
| Snack bag →\rightarrow shelf | 5/10 | 8/10 | 6/10 | 9/10 | 2/10 | 6/10 | 9/10 |
| Candy wrapper →\rightarrow can | 4/10 | 5/10 | 5/10 | 7/10 | 1/10 | 5/10 | 8/10 |
| Mean ±\pm SD | 52.5  ±\pm 9.6 | 75.0  ±\pm 17.3 | 65.0  ±\pm 12.9 | 82.5  ±\pm 9.6 | 20.0  ±\pm 8.2 | 52.5  ±\pm 5.0 | 77.5  ±\pm 9.6 |
| Scene-balanced mean | 51.951.9 | 73.673.6 | 62.862.8 | 83.183.1 | 26.126.1 | 57.257.2 | 75.075.0 |

Figure [E.1](#A5.F1 "Figure E.1 ‣ E.2 Real-world transfer ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") shows the task-level comparison between
R2+10 and Real-only 200, including ties and the negative difference.

Figure E.1: Task-level real-world transfer and sampling precision. a, Success rates for R2+10 and Real-only 200, with pointwise 95% Wilson intervals from ten autonomous tests per task and setting.
b, Observed differences matched by subtask identity; positive values favor R2+10. R2+10 uses 400 simulated and ten real-world training trajectories per subtask, versus 200 real-world demonstrations for Real-only 200. Task IDs follow Table [C.1](#A3.T1 "Table C.1 ‣ C.1 Robot platform and evaluated tasks ‣ Appendix C Task environments and scene reconstruction results ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

### E.3 Matched-trajectory collection comparisons

Table E.3: Scene-level matched-count comparisons.
a, Simulation evaluation without physical refinement.
b, Real-world performance before and after HIL refinement.
Entries are mean autonomous success (%) ±\pm sample SD across subtasks (n=6n=6 for S1 and n=4n=4 for S3).
Δ\Delta is the mean ±\pm SD of task-matched differences, in percentage points.
Equal counts do not equate total acquisition cost.

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Scene | Sim.  per subtask | HIL  per subtask | Static  collection | Adaptive  collection | Δ\Delta (pp) |
| a  Simulation evaluation | | | | | |
| S1 | 200 | — | 40.7±14.640.7\pm 14.6 | 49.0±15.849.0\pm 15.8 | +8.3±12.3+8.3\pm 12.3 |
|  | 400 | — | 51.6±10.251.6\pm 10.2 | 74.4±9.774.4\pm 9.7 | +22.9±9.3+22.9\pm 9.3 |
| S3 | 200 | — | 58.1±28.158.1\pm 28.1 | 78.5±11.078.5\pm 11.0 | +20.5±18.0+20.5\pm 18.0 |
|  | 400 | — | 67.0±23.267.0\pm 23.2 | 85.4±8.785.4\pm 8.7 | +18.4±16.0+18.4\pm 16.0 |
| b  Real-world evaluation | | | | | |
| S1 | 200 | 0 | 33.3±21.633.3\pm 21.6 | 43.3±22.543.3\pm 22.5 | +10.0±8.9+10.0\pm 8.9 |
|  | 200 | 10 | 48.3±13.348.3\pm 13.3 | 63.3±13.763.3\pm 13.7 | +15.0±5.5+15.0\pm 5.5 |
|  | 400 | 0 | 45.0±28.845.0\pm 28.8 | 53.3±32.053.3\pm 32.0 | +8.3±11.7+8.3\pm 11.7 |
|  | 400 | 10 | 68.3±16.068.3\pm 16.0 | 81.7±13.381.7\pm 13.3 | +13.3±10.3+13.3\pm 10.3 |
| S3 | 200 | 0 | 40.0±20.040.0\pm 20.0 | 52.5±9.652.5\pm 9.6 | +12.5±12.6+12.5\pm 12.6 |
|  | 200 | 10 | 55.0±17.355.0\pm 17.3 | 75.0±17.375.0\pm 17.3 | +20.0±0.0+20.0\pm 0.0 |
|  | 400 | 0 | 47.5±12.647.5\pm 12.6 | 65.0±12.965.0\pm 12.9 | +17.5±5.0+17.5\pm 5.0 |
|  | 400 | 10 | 67.5±9.667.5\pm 9.6 | 82.5±9.682.5\pm 9.6 | +15.0±5.8+15.0\pm 5.8 |

Tables [E.4](#A5.T4 "Table E.4 ‣ E.3 Matched-trajectory collection comparisons ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") and [E.5](#A5.T5 "Table E.5 ‣ E.3 Matched-trajectory collection comparisons ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation")
report the complete S1/S3 simulation and physical collection comparisons at 200
and 400 simulated trajectories per subtask. In simulation, the scene-balanced
adaptive advantage is 14.4 percentage points at 200 trajectories and 20.6 points
at 400.
These differences are calculated from the task-level percentages in
Table [E.4](#A5.T4 "Table E.4 ‣ E.3 Matched-trajectory collection comparisons ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"), with equal weighting of S1 and S3
and rounding only after aggregation.

Adaptive collection is higher on all six S1 subtasks and three of four S3 subtasks
at both budgets. The S3 pencil-case task remains slightly better with Static:
94.8% versus 94.0% at 200 trajectories, and 97.2% versus 96.0% at 400.
Larger Static datasets raise both scene means, but do not improve every task;
S1 mouse placement decreases from 67.6% to 59.1%. The aggregate trends therefore
coexist with task-level exceptions.

Table E.4: Task-level simulation collection comparison. R0 is the shared 50-trajectory-per-subtask initialization. Static and adaptive policies have matched cumulative training budgets per subtask. Scene rows report mean ±\pm sample SD across subtasks. The final row weights S1 and S3 equally; it is distinct from the three-scene average in the simulation-evolution table.

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
|  | Initial | 200 per subtask | | 400 per subtask | |
| Task | R0 (50) | Static | R1 | Static | R2 |
| S1: Office Table | | | | | |
| Glasses →\rightarrow stand | 44.5 | 32.632.6 | 64.9 | 41.441.4 | 80.7 |
| Red-cap marker →\rightarrow green cup | 34.034.0 | 47.247.2 | 50.150.1 | 59.759.7 | 75.375.3 |
| Yellow-cap marker →\rightarrow basket | 26.1 | 30.030.0 | 30.930.9 | 38.638.6 | 57.057.0 |
| Mouse →\rightarrow mouse pad | 33.3 | 67.667.6 | 70.1 | 59.159.1 | 85.1 |
| Red pen →\rightarrow green box | 17.5 | 35.335.3 | 36.036.0 | 48.248.2 | 72.072.0 |
| Black pen →\rightarrow pen holder | 14.0 | 31.531.5 | 42.242.2 | 62.562.5 | 76.576.5 |
| Mean ±\pm SD | 28.2±11.428.2\pm 11.4 | 40.7±14.640.7\pm 14.6 | 49.0±15.849.0\pm 15.8 | 51.6±10.251.6\pm 10.2 | 74.4±9.774.4\pm 9.7 |
| S3: Household Table | | | | | |
| Soda bottle →\rightarrow shelf | 62.0 | 64.064.0 | 76.0 | 72.072.0 | 88.0 |
| Pencil case →\rightarrow metal box | 72.0 | 94.894.8 | 94.0 | 97.297.2 | 96.0 |
| Snack bag →\rightarrow shelf | 28.6 | 30.930.9 | 68.0 | 54.254.2 | 75.5 |
| Candy wrapper →\rightarrow can | 48.0 | 42.542.5 | 76.0 | 44.444.4 | 82.0 |
| Mean ±\pm SD | 52.7±18.852.7\pm 18.8 | 58.1±28.158.1\pm 28.1 | 78.5±11.078.5\pm 11.0 | 67.0±23.267.0\pm 23.2 | 85.4±8.785.4\pm 8.7 |
| Scene-balanced mean | 40.440.4 | 49.449.4 | 63.863.8 | 59.359.3 | 79.979.9 |

Table E.5: Task-level real-world collection comparison.
Task entries are successes out of ten autonomous test rollouts.
All budgets are training trajectories per subtask, and one policy covers each scene.
R1 and R2 correspond to simulation budgets of 200 and 400; +10 adds ten real-world HIL training trajectories per subtask for either collection method.
Summary rows report mean success (%) ±\pm sample SD across subtasks within each scene.

|  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Task | Static  200 | Static  200+10 | R1 | R1+10 | Static  400 | Static  400+10 | R2 | R2+10 |
| S1: Office Table | | | | | | | | |
| Glasses →\rightarrow stand | 7/10 | 7/10 | 7/10 | 8/10 | 7/10 | 8/10 | 10/10 | 10/10 |
| Red-cap marker →\rightarrow green cup | 2/10 | 4/10 | 3/10 | 6/10 | 3/10 | 6/10 | 3/10 | 7/10 |
| Yellow-cap marker →\rightarrow basket | 4/10 | 4/10 | 6/10 | 6/10 | 6/10 | 8/10 | 6/10 | 9/10 |
| Mouse →\rightarrow mouse pad | 4/10 | 6/10 | 6/10 | 8/10 | 8/10 | 8/10 | 8/10 | 9/10 |
| Red pen →\rightarrow green box | 1/10 | 4/10 | 2/10 | 5/10 | 1/10 | 4/10 | 2/10 | 7/10 |
| Black pen →\rightarrow pen holder | 2/10 | 4/10 | 2/10 | 5/10 | 2/10 | 7/10 | 3/10 | 7/10 |
| Mean ±\pm SD | 33.3  ±\pm 21.6 | 48.3  ±\pm 13.3 | 43.3  ±\pm 22.5 | 63.3  ±\pm 13.7 | 45.0  ±\pm 28.8 | 68.3  ±\pm 16.0 | 53.3  ±\pm 32.0 | 81.7  ±\pm 13.3 |
| S3: Household Table | | | | | | | | |
| Soda bottle →\rightarrow shelf | 5/10 | 7/10 | 6/10 | 9/10 | 5/10 | 6/10 | 7/10 | 8/10 |
| Pencil case →\rightarrow metal box | 5/10 | 6/10 | 6/10 | 8/10 | 6/10 | 8/10 | 8/10 | 9/10 |
| Snack bag →\rightarrow shelf | 5/10 | 6/10 | 5/10 | 8/10 | 5/10 | 7/10 | 6/10 | 9/10 |
| Candy wrapper →\rightarrow can | 1/10 | 3/10 | 4/10 | 5/10 | 3/10 | 6/10 | 5/10 | 7/10 |
| Mean ±\pm SD | 40.0  ±\pm 20.0 | 55.0  ±\pm 17.3 | 52.5  ±\pm 9.6 | 75.0  ±\pm 17.3 | 47.5  ±\pm 12.6 | 67.5  ±\pm 9.6 | 65.0  ±\pm 12.9 | 82.5  ±\pm 9.6 |

### E.4 Qualitative execution observations

The observations below supplement the behavioral observations in Section [4](#S4 "4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation") and the selected sequences in Figure [E.2](#A5.F2 "Figure E.2 ‣ E.4 Qualitative execution observations ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").
“Reattempt” denotes an action sequence produced by the learned policy after an unsuccessful interaction, not an agent- or planner-generated training correction.

![Refer to caption](2609.38905v3/real_execution_examples.png)

Figure E.2: Illustrative autonomous real-world executions.
a, Real-only adaptation with 200 real demonstrations per subtask.
b, EmbodiRSI with 400 simulated and ten real HIL trajectories per subtask.
All tests use the learned policy alone.
Quantitative results are reported in Table [2](#S4.T2 "Table 2 ‣ 4.3 Does RSI Enable Data-Efficient Real-World Adaptation? ‣ 4 Experiments ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation").

##### Simulation errors and instruction-following.

Missed grasps occurred at peripheral object positions, although these positions were not shown to be unreachable or outside the training distribution.
Placement failures also occurred after successful grasping, particularly when objects missed narrow target openings.
These execution errors are distinct from task-selection errors. At the 50-demonstration initialization, the policy occasionally confused the red-cap-marker and red-pen instructions in S1.
Such confusion was not a recurring failure mode at larger simulation budgets, where most errors arose during execution of the requested manipulation.

Reattempts at R1 and R2 had mixed outcomes: some completed the task, while others failed.
EmbodiRSI’s learning workflow combines experience from imperfect intermediate states with additional demonstrations under difficult configurations.

##### Physical transfer and local corrective experience.

During HIL collection, operators mainly corrected the final approach, acquisition and placement. After refinement, broad approach motions resembled the simulation demonstrations, while adjustments near grasping and placement resembled the physical corrections. This resemblance does not imply online inverse-kinematics control, nor that HIL changes only contact-related behavior. The pretrained policy’s prior capabilities also contribute; not all task knowledge need originate in the simulation data.

Static+10 also benefited from local corrections, but remained less consistent
under pose changes and showed fewer reattempts than the refined evolved policies.

##### Real-only coverage and task selection.

With ten real-world demonstrations per subtask, successful behavior was largely
restricted to particular configurations; the non-zero test counts are retained
in Table [E.2](#A5.T2 "Table E.2 ‣ E.2 Real-world transfer ‣ Appendix E Detailed results and behavioral observations ‣ EmbodiRSI: Recursive Self-Improvementfor Data-Efficient Robot Adaptation"). The 200-demonstration collection
covered more configurations than the 100-demonstration collection, although both
policies remained vulnerable at difficult poses and sometimes selected a task
inconsistent with the instruction.

Trained operators followed a standard operating procedure but differed in motion
style and preferred reset configurations. Uneven coverage does not make individual
demonstrations invalid. It may leave difficult configurations sparsely represented,
while correlations among layouts, execution styles and task labels could encourage
reliance on incidental cues instead of the instruction.

## Appendix F Additional related work

### F.1 Autonomous improvement and corrective experience

Autonomous robot learning has explored how experience generated by a
policy can support subsequent policy updates. RoboCat uses
robot-generated data to train successive generalist manipulation
models ([Bousmalis et al., 2023](#bib.bib41)), while SOAR employs foundation models to guide autonomous experience collection and evaluation for improving instruction-following skills ([Zhou et al., 2024](#bib.bib42)).
PLD trains residual reinforcement-learning experts, collects recovery trajectories through a hybrid rollout procedure, and distills the resulting data into a VLA model through supervised fine-tuning ([Xiao et al., 2026](#bib.bib43)).
These approaches provide precedents for learning from policy-dependent experience rather, than relying exclusively on an initial demonstration set. Within this line of work, EmbodiRSI focuses on coupling corrective continuations from policy-failed states with updates to subsequent collection configurations.
Its recursion operates through the experience acquired for a fixed policy-learning formulation, rather than through changes to the learning algorithm itself.

### F.2 Failure-driven acquisition and adaptive curricula

Policy feedback can guide not only corrective supervision but also
the allocation of subsequent training experience. Data-Efficient
Multitask DAgger distributes additional expert demonstrations across
tasks according to policy performance and estimated data
utility ([Fu et al., 2025](#bib.bib44)). Prioritized Level Replay
selects training levels using estimates of their learning
potential ([Jiang et al., 2021](#bib.bib45)). More directly related to failure-driven
generation, Fail2Progress synthesizes simulation data targeted to
observed failures and uses it to refine skill effect
models ([Huang et al., 2025](#bib.bib46)). RoboPearls uses VLM-based failure analysis to formulate targeted simulation requests for further policy training ([Tao et al., 2025](#bib.bib33)).
EmbodiRSI studies a configuration-level acquisition mechanism: attributed rollout failures guide the selection of source-object and target-anchor reset regions within each task.
The evaluated procedure maintains fixed per-subtask retained-data budgets and mixes targeted configurations with the base collection
distribution.
Its failure-concentration statistics serve as an acquisition heuristic, not an estimate of configuration-specific learning gains.

### F.3 Agentic workflows and execution-time recovery

Agentic systems operate at different levels of the robotics workflow.
EmbodiedClaw exposes embodied-AI development activities, including environment construction, trajectory synthesis and evaluation, as conversationally executable skills ([Zhou et al., 2026](#bib.bib36)).
ABot-Claw combines persistent cross-embodiment memory with coordinated execution and feedback-based correction ([Huo et al., 2026](#bib.bib38)), while PhysiAgent integrates monitoring and self-reflection into physical
task execution ([Wang et al., 2025](#bib.bib37)). At the motion-generation
level, ReKep optimizes visually grounded relational keypoint constraints to produce robot actions ([Huang et al., 2024](#bib.bib39)). AgentChord augments task graphs with precompiled recovery branches for handling anticipated execution deviations ([Xu et al., 2026](#bib.bib40)).
These mechanisms are relevant to workflow coordination and corrective execution, but their roles should be distinguished from the training-data role of recovery in EmbodiRSI.
Our diagnostic and planning tools generate experience during collection; the updated policy is subsequently evaluated without those external recovery mechanisms.
Policy-generated reattempts at test time therefore reflect the learned controller, not an online planner takeover.

Experimental support, please
[view the build logs](./2609.38905v3/__stdout.txt)
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
