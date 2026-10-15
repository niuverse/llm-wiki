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

[Back to Abstract](/abs/2609.32862v1 "Back to abstract page")

[Download PDF](/pdf/2609.32862v1 "Download PDF")

1. [Abstract](#abstract1 "In RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
2. [1 Introduction](#S1 "In RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
3. [2 Method](#S2 "In RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   1. [2.1 Self-Evolving System as Policy](#S2.SS1 "In 2 Method ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   2. [2.2 Inner-Loop System Execution](#S2.SS2 "In 2 Method ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   3. [2.3 Trace-Grounded Diagnosis and System Improvement](#S2.SS3 "In 2 Method ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      1. [Task-level system improvement.](#S2.SS3.SSS0.Px1 "In 2.3 Trace-Grounded Diagnosis and System Improvement ‣ 2 Method ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      2. [General system improvement.](#S2.SS3.SSS0.Px2 "In 2.3 Trace-Grounded Diagnosis and System Improvement ‣ 2 Method ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
4. [3 Experiments](#S3 "In RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   1. [3.1 System-Level Evolution of Embodied Decision-Making](#S3.SS1 "In 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   2. [3.2 Long-Horizon Memory through Context Evolution](#S3.SS2 "In 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   3. [3.3 System Evolution under Distribution Shift](#S3.SS3 "In 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   4. [3.4 Real-World Evaluation](#S3.SS4 "In 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
5. [4 Related Work](#S4 "In RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   1. [Foundation Models as Embodied Agents.](#S4.SS0.SSS0.Px1 "In 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   2. [Self-Evolving LLM/MLLM Agents.](#S4.SS0.SSS0.Px2 "In 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   3. [Self-Improving Embodied Agents.](#S4.SS0.SSS0.Px3 "In 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
6. [5 Conclusion](#S5 "In RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
7. [References](#bib "In RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
8. [A Appendix](#A1 "In RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   1. [A.1 EmbodiedBench Evolution Case Studies](#A1.SS1 "In Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      1. [A.1.1 Example 1: Feedback-Grounded Recovery in EB-Habitat](#A1.SS1.SSS1 "In A.1 EmbodiedBench Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      2. [A.1.2 Example 2: Skill Refinement in EB-Manipulation](#A1.SS1.SSS2 "In A.1 EmbodiedBench Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      3. [A.1.3 Example 3: Support-Surface Grounding in EB-ALFRED](#A1.SS1.SSS3 "In A.1 EmbodiedBench Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      4. [A.1.4 Example 4: Reachable-Floor Reasoning in EB-Navigation](#A1.SS1.SSS4 "In A.1 EmbodiedBench Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      5. [A.1.5 Persistent Filesystem Evolution](#A1.SS1.SSS5 "In A.1 EmbodiedBench Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
         1. [Execution surface.](#A1.SS1.SSS5.Px1 "In A.1.5 Persistent Filesystem Evolution ‣ A.1 EmbodiedBench Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
         2. [Outer-loop evolution evidence.](#A1.SS1.SSS5.Px2 "In A.1.5 Persistent Filesystem Evolution ‣ A.1 EmbodiedBench Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   2. [A.2 RoboMemArena Evolution Case Studies](#A1.SS2 "In Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      1. [A.2.1 Example 1: Task Progress as Active Context in Transfer](#A1.SS2.SSS1 "In A.2 RoboMemArena Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      2. [A.2.2 Example 2: External Visual Memory under Occlusion](#A1.SS2.SSS2 "In A.2 RoboMemArena Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      3. [A.2.3 Example 3: Counting as Stage-Conditioned Context](#A1.SS2.SSS3 "In A.2 RoboMemArena Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      4. [A.2.4 Example 4: Local Progress Improvement in Sequence](#A1.SS2.SSS4 "In A.2 RoboMemArena Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      5. [A.2.5 Persistent Filesystem Changes](#A1.SS2.SSS5 "In A.2 RoboMemArena Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      6. [A.2.6 Evolution Evidence and Execution Traces](#A1.SS2.SSS6 "In A.2 RoboMemArena Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
   3. [A.3 LIBERO-PRO Evolution Case Studies](#A1.SS3 "In Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      1. [A.3.1 Persistent Evolution](#A1.SS3.SSS1 "In A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
         1. [Task-generation prompt.](#A1.SS3.SSS1.Px1 "In A.3.1 Persistent Evolution ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
         2. [Coordinate semantics.](#A1.SS3.SSS1.Px2 "In A.3.1 Persistent Evolution ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
         3. [Reusable helpers.](#A1.SS3.SSS1.Px3 "In A.3.1 Persistent Evolution ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      2. [A.3.2 Example 1: From Long Manipulation Code to Composite Skills](#A1.SS3.SSS2 "In A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      3. [A.3.3 Example 2: Execution Abstraction without Spatial Grounding Success](#A1.SS3.SSS3 "In A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
      4. [A.3.4 Filesystem Organization](#A1.SS3.SSS4 "In A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
         1. [Persistent executable system.](#A1.SS3.SSS4.Px1 "In A.3.4 Filesystem Organization ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
         2. [Outer evolution evidence.](#A1.SS3.SSS4.Px2 "In A.3.4 Filesystem Organization ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")
         3. [Task-specific execution.](#A1.SS3.SSS4.Px3 "In A.3.4 Filesystem Organization ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")

[License: arXiv.org perpetual non-exclusive license](https://info.arxiv.org/help/license/index.html#licenses-available)

arXiv:2609.32862v1 [cs.RO] 26 Sep 2026

# RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents

Jingsong Liang
Affiliation: Nanyang Technological University
Equal Contribution

Shuhao Liao
Affiliation: Nanyang Technological University
Affiliation: Beihang University
Equal Contribution

Shizhe Zhang
Affiliation: Nanyang Technological University

Diyuan Hou
Affiliation: Beihang University

Yuxin Cai
Affiliation: Nanyang Technological University

Xinjian Deng
Affiliation: National University of Singapore

Chengyang He
Affiliation: National University of Singapore

Wenhui Huang
Affiliation: Nanyang Technological University

Runjia Tan
Affiliation: Nanyang Technological University

Zhidong Wang
Affiliation: Nanyang Technological University

Lan Yu
Affiliation: Cloud Butterfly Technology

Xuesong Tian
Affiliation: Cloud Butterfly Technology

Guillaume Sartoretti
Affiliation: National University of Singapore

Jie Luo
Affiliation: Beihang University

Yao Mu
Affiliation: Shanghai Jiao Tong University

Wenjun Wu
Affiliation: Beihang University
Corresponding Author

Wanhua Li
Affiliation: Nanyang Technological University
Corresponding Author

Chen Lv
Affiliation: Nanyang Technological University
Corresponding Author

###### Abstract

A foundation model should not act in isolation as an embodied agent. Yet, existing methods often optimize individual components of the agent stack, such as memory, context, skills, or action interfaces, rather than treating the supporting system itself as a unified policy. Moreover, interaction alone does not yield self-improvement unless execution experience is converted into persistent, validated system changes. We therefore propose RoboFoundry, the first embodied agentic framework that formulates this process as Self-Evolving System-as-Policy. RoboFoundry diagnoses capability gaps in *decision-making* and *memory management*, converts execution traces into validated task-specific system updates, and promotes recurring improvements to the general system. Evolution operates over two complementary surfaces: a context system that manages active internal context and persistent file-system memory, and a hierarchical skill system that organizes atomic skills, reusable compositions, and failure-conditioned recovery. A shared semantic interface separates embodiment-invariant decisions from embodiment-specific execution, allowing evolved system capabilities to transfer across heterogeneous robots. On EmbodiedBench, RoboFoundry achieves state-of-the-art performance, notably improving GPT-5.5 by 27.8 %27.8\text{\,}\%. It also brings Qwen3.7-Plus to near parity with GPT-5.5 (70.3 %70.3\text{\,}\% vs. 72.7 %72.7\text{\,}\%), showing consistent gains from system-as-policy evolution across foundation models. For long-horizon memory, RoboFoundry outperforms all baselines on RoboMemArena by at least 39.0 %39.0\text{\,}\%, even against methods assisted by external foundation models. On LIBERO-PRO, it further outperforms Cap-Agent0 by 243.8 243.8\text{\,}–679.7 %679.7\text{\,}\% across all perturbation types.
In real-world deployments, RoboFoundry demonstrates zero-shot transfer and online evolution across robots and tasks, highlighting its potential for fully autonomous embodied agents.

††Website: [jingsongliang.com/robofoundry](https://jingsongliang.com/robofoundry)

## 1 Introduction

Recent advances in large language models (LLMs) and multimodal large
language models (MLLMs) are shifting embodied intelligence from learning a
separate policy per task toward using general-purpose foundation models as
embodied decision makers.
Early work mainly uses them as high-level planners, exposing observations,
robot states, and admissible actions through designed prompts
([Brohan et al., 2023](#bib.bib11); [Huang et al., 2023](#bib.bib13); [Jiang et al., 2023](#bib.bib14)).
As model outputs become increasingly executable, code-as-policy
methods take the next step, composing perception and control primitives into
programs that interact with the environment
([Fu et al., 2026](#bib.bib10); [Liu et al., 2026](#bib.bib1); [Li et al., 2026](#bib.bib4); [Zhang et al., 2026b](#bib.bib20)), moving the
foundation model from a planner inside the robotic stack toward the decision
core of a closed-loop embodied agent.

![Refer to caption](2609.32862v1/robo_teaser.png)

Figure 1:
RoboFoundry: System-as-Policy Evolution across benchmarks and real robots.
The central Act–Reflect–Repair–Promote loop executes across embodiments,
attributes failures to capabilities, revises the task-level system, and
promotes validated changes to the general system.
The surrounding panels show gains across foundation models on
EmbodiedBench, long-horizon memory results on RoboMemArena, and robustness perturbations
under LIBERO-PRO.
The capability plots compare GPT-5.5 and Qwen3.7-Plus before and after
RoboFoundry, while the lower image strip illustrates adaptation and
evolution on physical robots.

Yet a foundation model alone does not define such an agent.
The same model behaves very differently as the surrounding interaction
structure changes: iterative observation, feedback, and verification support
better-grounded decisions, while structured action interfaces reduce the
burden of turning semantic decisions into executable behavior
([Li et al., 2024](#bib.bib7); [Liu et al., 2026](#bib.bib1); [Kwok et al., 2026](#bib.bib19)).
*The executable embodied policy is therefore a system, rather than a
model in isolation*, jointly determined by the model and by what information
reaches it, what experience persists, and how its decisions become physical
actions.
Existing embodied agents, however, are rarely optimized as such a system, and
instead refine a predefined component while leaving the rest unchanged:
interaction harnesses improve model–environment feedback
([Liu et al., 2026](#bib.bib1)); memory systems improve access to past information
([Huang et al., 2026](#bib.bib18); [Zhang et al., 2026c](#bib.bib17)); skill-learning agents
accumulate reusable behaviors
([Wang et al., 2023](#bib.bib9); [Lu et al., 2026](#bib.bib3); [Wang et al., 2026](#bib.bib15)); and coding agents
refine programs from physical feedback ([Xiao et al., 2026](#bib.bib2)).
Such gains can be substantial, but remain *component-local*: improving
one component neither identifies another bottleneck nor determines how the
improvement propagates through the system.
Richer interaction also does not by itself make an embodied system
self-improving.
Most systems stay fixed after deployment even though interaction continuously
exposes where their support is insufficient, so the same weakness recurs
across episodes
([Huang et al., 2023](#bib.bib13); [Madaan et al., 2023](#bib.bib16); [Brohan et al., 2023](#bib.bib11); [Zhang et al., 2026c](#bib.bib17));
The resulting experience is typically used for evaluation or manual debugging
rather than converted into persistent, validated system changes
([Li et al., 2024](#bib.bib7); [Yang et al., 2025](#bib.bib6); [Fu et al., 2026](#bib.bib10); [Liu et al., 2026](#bib.bib1)).

These observations lead to the central question:
Can an embodied agent treat its entire system as the policy, diagnose
where that system limits behavior, and evolve the corresponding components
from embodied experience?
To this end, we propose RoboFoundry, the first embodied agent
framework that formulates the agent stack itself as a
Self-Evolving System-as-Policy.
Rather than committing in advance to one module to optimize, RoboFoundry lets
embodied execution history decide which part of the system supporting the
foundation model should change and how far that change should propagate,
extending the progression from *language-model planning* to
*code-as-policy execution*, and further to
*system-as-policy evolution*.

Evolution operates over two complementary *surfaces*.
The *context surface* governs how observations and accumulated
experience are managed, spanning active internal context within an episode
and persistent file-system memory across episodes.
The *skill surface* organizes executable behavior, from atomic skills to
reusable compositions and failure-conditioned recovery graphs. Execution traces decide both *why* the system is limited and
*where* it should change: RoboFoundry attributes recurring failures to
model-conditioned capability gaps, confines each revision to the responsible
surface, and assigns it an explicit *scope*, where a task-specific
repair is validated in place while a general update is promoted only after
the same improvement proves effective beyond the held-in task.
Self-evolution is therefore a controlled loop of diagnosis, intervention,
validation, and promotion, rather than unconstrained self-rewriting.

A shared semantic interface keeps evolved capability from being bound to one
robot or one backbone: decisions are expressed once as semantic units, while
replaceable embodiment bindings realize them through robot-specific
primitives.
Because evolution acts on the semantic side, a system evolved on one platform
is reused on another by swapping its bindings, and the same evolved support
attaches to different foundation models.

Multiple embodied benchmarks test whether system-level evolution improves
decision-making, long-horizon memory, and robustness under task and
environment perturbations, repeated across foundation models of different
capability to verify that the gains come from the system rather than from a
particular backbone; real-robot deployments then test transfer to unseen
robots and tasks and continued improvement after deployment.
RoboFoundry achieves state-of-the-art results in all settings and keeps
evolving across simulation and the real world.

In summary, we make key contributions as follows:

* •

  We propose RoboFoundry, the first embodied agent framework
  that formulates the agent system itself as the policy and makes it
  self-evolving, advancing embodied agents from
  *code-as-policy execution* to system-as-policy evolution.
* •

  We develop a capability-guided mechanism for context–skill
  co-evolution that turns execution traces into targeted, validated system
  revisions and promotes recurring improvements from task-specific support
  to the general system.
* •

  We introduce a shared semantic interface that decouples
  embodiment-invariant decisions from embodiment-specific execution, making
  evolved capability reusable across heterogeneous robots and tasks.
* •

  RoboFoundry delivers substantial gains across multiple
  benchmarks, spanning embodied decision-making, long-horizon memory, and
  robustness to perturbations, brings open-source backbones close to
  frontier-model performance, and demonstrates zero-shot
  generalization and online evolution in real-world robotic experiments.

## 2 Method

### 2.1 Self-Evolving System as Policy

RoboFoundry treats the overall system supporting task execution as the
policy to optimize.
Let MM denote a frozen foundation model and H⁡(M)H(M) its supporting system.
Rather than updating the parameters of MM, RoboFoundry improves the
effective capability of the model–system pair by evolving H⁡(M)H(M) through
filesystem operations.
The model inspects the supporting system using operations such as
cat and grep, and edits it using add,
modify, and delete.
We decompose the supporting system into a task-specific component HtH\_{t}
and a general component HgH\_{g}, with corresponding optimization spaces
StS\_{t} and SgS\_{g}.
The task-specific space StS\_{t} comprises semantic-level task formulation
StcS\_{t}^{c} and embodiment-specific execution SteS\_{t}^{e}.

RoboFoundry organizes system evolution as an inner–outer loop.
The inner loop executes tasks under the current system and collects
execution traces.
For a task instance x∼𝒳x\sim\mathcal{X}, a rollout is written as
τ∼𝒯⁡(Hg,Ht,x)\tau\sim\mathcal{T}(H\_{g},H\_{t},x), where τ\tau records system and tool calls,
step-wise observations and robot states, execution outcomes, and task feedback.
Here, 𝒯⁡(Hg,Ht,x)\mathcal{T}(H\_{g},H\_{t},x) denotes the set of stored traces.
The outer loop proposes system edits, which are deployed and
evaluated through subsequent inner-loop rollouts.
We detail task execution in Section [2.2](#S2.SS2 "2.2 Inner-Loop System Execution ‣ 2 Method ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").

The outer loop first performs *task-level system improvement* over
StS\_{t} to improve completion of the current task.
Here, rx​(Δ​Ht,τ)r\_{x}(\Delta H\_{t},\tau) denotes the performance score of rollout τ\tau
on task xx, where Δ​Ht\Delta H\_{t} is a candidate edit to the
task-level system.
Based on execution traces, the outer loop revises either the
semantic-level system in StcS\_{t}^{c} or the embodiment-specific execution
system in SteS\_{t}^{e}:

|  |  |  |  |
| --- | --- | --- | --- |
|  | Ht∗=arg⁡maxHt∈St​𝔼τ​[rx​(Δ​Ht,τ)].H\_{t}^{\*}=\arg\max\_{H\_{t}\in S\_{t}}\mathbb{E}\_{\tau}\left[r\_{x}(\Delta H\_{t},\tau)\right]. |  | (1) |

Beyond the current task, RoboFoundry performs *general-level system
improvement* over the persistent system HgH\_{g}.
It examines whether a successful task-level improvement addresses a
capability gap shared by other tasks, using traces accumulated across
tasks and embodiments.
Let 𝒳𝒜\mathcal{X}\_{\mathcal{A}} denote the task distribution associated
with these capability gaps and Δ​Hg\Delta H\_{g} denotes the general-level edit.
General-level optimization is formulated as

|  |  |  |  |
| --- | --- | --- | --- |
|  | Hg∗=arg⁡maxHg∈Sg​𝔼x∼𝒳𝒜,τ∼𝒯⁡(Hg,Ht∗​(x),x)​[rx​(Δ​Hg,τ)].H\_{g}^{\*}=\arg\max\_{H\_{g}\in S\_{g}}\mathbb{E}\_{x\sim\mathcal{X}\_{\mathcal{A}},\,\tau\sim\mathcal{T}(H\_{g},H\_{t}^{\*}(x),x)}\left[r\_{x}(\Delta H\_{g},\tau)\right]. |  | (2) |

The outer loop promotes improvements supported by the broader trace
history into HgH\_{g}, where they persist across subsequent tasks.
The objectives above specify what each level seeks to improve; the
trace-grounded edits below provide the local improvement procedure.
Thus, although MM remains frozen, the effective capability of the
model–system pair can evolve through persistent changes to its
supporting system. Algorithm [1](#alg1 "Algorithm 1 ‣ General system improvement. ‣ 2.3 Trace-Grounded Diagnosis and System Improvement ‣ 2 Method ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents") summarizes the overall
execution–evolution loop.
We detail diagnosis and improvement in
Section [2.3](#S2.SS3 "2.3 Trace-Grounded Diagnosis and System Improvement ‣ 2 Method ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").

![Refer to caption](2609.32862v1/robo_model.png)

Figure 2:
Overview of RoboFoundry. (a) The inner loop runs task-specific System-as-Policy through
context/skill surfaces and semantic/execution bindings, producing embodiment-specific rollouts and traces.
(b) The general system supplies reusable context and skill rules to task-level systems.
(c) The outer loop diagnoses capability failures and validates
targeted edits through held-in repair and held-out retention.
Accepted edits update the task-specific system or promote the general system.

### 2.2 Inner-Loop System Execution

RoboFoundry uses the same task-execution loop in simulation and the
real world.
Given a task description, observations, and robot states,
cross-embodiment execution requires separating embodiment-invariant
task semantics from embodiment-specific kinematic and dynamic primitives.
We introduce a semantic binding layer
Hts​(M)=BINDs​(Ht​(M)),H\_{t}^{s}(M)=\texttt{BIND}\_{s}(H\_{t}(M)),
which exposes task logic shared across embodiments.
Accordingly, Hts​(M)H\_{t}^{s}(M) represents, reasons about, and decomposes the
task without directly handling robot-specific constraints.
An execution binding layer
Hte​(M)=BINDe​(Ht​(M)),H\_{t}^{e}(M)=\texttt{BIND}\_{e}(H\_{t}(M)),
grounds the resulting semantic decisions in embodiment-specific execution.
This separation helps distinguish errors in task reasoning from failures
in execution.
The execution backend can use frozen VLA policies, functions generated
by coding agents, visuomotor APIs such as CuRobo, or other
foundation-model-supported robotic interfaces.

RoboFoundry exposes two task-level surfaces, *context* and
*skill*, for semantic-level optimization in Hts​(M)H\_{t}^{s}(M).
(1) Context: The context system consists of persistent filesystem memory
and the active context presented to the model.
Rather than updating memory at every step, Hts​(M)H\_{t}^{s}(M) monitors task
progress and updates context when an event warrants it.
We define the context operation space as
Stctx={SAVE,RETRIEVE,UTILIZE}S\_{t}^{\mathrm{ctx}}=\{\texttt{SAVE},\texttt{RETRIEVE},\texttt{UTILIZE}\}.
Given execution histories of observations, actions, and feedback,
SAVE selects task-relevant evidence for persistent storage.
What should be retained depends on task semantics: an occlusion task
may require object and spatial relations, whereas a counting task may
require occurrences of relevant actions.
RETRIEVE selects stored evidence for the next decision, and
UTILIZE incorporates it into the active context.
These operations are recorded in the execution trace as evidence for
subsequent system improvement.

(2) Skill: BINDs\texttt{BIND}\_{s} separates task logic from
embodiment-specific constraints.
We organize the skill surface hierarchically into atomic skills,
skill compositions, and recovery.
Atomic skills are indivisible executable units, such as grasp
or move-to, whose low-level implementations are initially
handcrafted and verified.
For a given task, atomic skills are composed into reusable procedures
that preserve its semantic logic; for example, move-to,
grasp, and place can form a transfer procedure.
During the inner loop, RoboFoundry maintains a recovery tree with key
states as nodes and skill executions, including failed transitions,
as edges.
Upon failure, H⁡(M)H(M) queries the tree to identify a valid state from
which to replan, rather than repeating the failed action.
For example, if a cube falls during transfer, the system can use the
state where the cube rests on the support surface to plan another grasp.
Execution traces are therefore attributable to atomic execution,
composition, or recovery, providing evidence for skill improvement.

### 2.3 Trace-Grounded Diagnosis and System Improvement

##### Task-level system improvement.

Given an execution trace τ\tau, the task-level system policy Ht​(M)H\_{t}(M)
diagnoses the observed failure or inefficiency by attributing it to
one of six capabilities:
𝒜={perceive,reason,plan,save,retrieve,utilize}\mathcal{A}=\{\texttt{perceive},\texttt{reason},\texttt{plan},\\
\texttt{save},\texttt{retrieve},\texttt{utilize}\}.
The first three characterize decision-making, while the latter three
characterize memory management.
Ht​(M)H\_{t}(M) then localizes the capability gap and proposes an edit
Δ​Ht\Delta H\_{t} to the corresponding context or skill surface.
The candidate is evaluated in a new inner-loop execution.
If it resolves the failure, we denote the successful edit by
Δ​Ht∗=Δ​Ht\Delta H\_{t}^{\*}=\Delta H\_{t} and commit it as
Ht∗←Ht⊕Δ​Ht∗H\_{t}^{\*}\leftarrow H\_{t}\oplus\Delta H\_{t}^{\*},
where ⊕\oplus denotes applying an edit to the current system.
The resulting trace, including Δ​Ht∗\Delta H\_{t}^{\*} and its execution feedback,
is stored in 𝒯\mathcal{T} and indexed by capability a∈𝒜a\in\mathcal{A}
for later general system improvement.

##### General system improvement.

Task-specific corrections cannot guarantee performance on similar cases
when the underlying general capability remains unchanged.
RoboFoundry therefore evaluates whether a successful task-level edit
can be generalized into a reusable system-level rule.

For each successful repair, its stored trace τi\tau\_{i} records the task
xix\_{i}, observations and robot states before and after the repair,
pre-repair history, committed task-level edit Δ​Ht,i∗\Delta H\_{t,i}^{\*},
and execution feedback.
We select successful records of the same capability from other tasks
as the held-out trace set
𝒯aout(x)={τi∈𝒯:ai=a,xi≠x}\mathcal{T}^{\mathrm{out}}\_{a}(x)=\{\tau\_{i}\in\mathcal{T}:a\_{i}=a,\ x\_{i}\neq x\}.

From the successful edit Δ​Ht∗\Delta H\_{t}^{\*} on task xx and its trace
τx\tau\_{x}, we abstract a candidate general edit
Δ​Hg←Abstract⁡(Δ​Ht∗,τx,Hg)\Delta H\_{g}\leftarrow\operatorname{Abstract}(\Delta H\_{t}^{\*},\tau\_{x};H\_{g}).
For each held-out trace, let τipre\tau\_{i}^{\mathrm{pre}} denote its recorded
task, observation, state, and pre-repair history.
We replay this information and use the candidate general system to
propose a task-level edit
ΔHt,i′←Propose(Hg⊕ΔHg,τipre)\Delta H\_{t,i}^{{}^{\prime}}\leftarrow\operatorname{Propose}(H\_{g}\oplus\Delta H\_{g},\tau\_{i}^{\mathrm{pre}}).
The system policy H⁡(M)H(M) then acts as a verifier.
Given the candidate ΔHt,i′\Delta H\_{t,i}^{{}^{\prime}}, the recorded successful edit
Δ​Ht,i∗\Delta H^{\*}\_{t,i}, and its execution feedback, it scores whether the
candidate addresses the same capability gap.
Let rx​(Δ​Ht,τi)r\_{x}(\Delta H\_{t},\tau\_{i}) denote this score.
We measure capability-conditioned transfer as

|  |  |  |  |
| --- | --- | --- | --- |
|  | Δcap(ΔHg)=1|𝒯aout​(x)|∑τi∈𝒯aout​(x)[rx(ΔHt,i′,τi)−rx(ΔHt,i∗,τi)].\Delta\_{\mathrm{cap}}(\Delta H\_{g})=\frac{1}{|\mathcal{T}^{\mathrm{out}}\_{a}(x)|}\sum\_{\tau\_{i}\in\mathcal{T}^{\mathrm{out}}\_{a}(x)}\left[r\_{x}(\Delta H\_{t,i}^{{}^{\prime}},\tau\_{i})-r\_{x}(\Delta H\_{t,i}^{\*},\tau\_{i})\right]. |  | (3) |

We promote a candidate Δ​Hg∗\Delta H\_{g}^{\*} when
Δcap​(Δ​Hg∗)≥0\Delta\_{\mathrm{cap}}(\Delta H\_{g}^{\*})\geq 0 and commit it as
Hg∗←Hg⊕Δ​Hg∗H\_{g}^{\*}\leftarrow H\_{g}\oplus\Delta H\_{g}^{\*}.
Thus, task-level evaluation verifies whether an edit repairs the
observed failure, while capability-conditioned held-out evaluation
assesses whether the general edit addresses the same capability gap
across other tasks.

Algorithm 1  RoboFoundry: system evolution and task execution

Overall evolution

1:
General system HgH\_{g}, task-level system HtH\_{t},
tasks 𝒳\mathcal{X}, trace set 𝒯\mathcal{T}

2:
𝒯←∅\mathcal{T}\leftarrow\emptyset

3:
for each task x∈𝒳x\in\mathcal{X} do

4:
  for each rollout on xx do

5:
   τ←RunTask​(Hg,Ht,x)\tau\leftarrow\textsc{RunTask}(H\_{g},H\_{t},x)

6:
   (Hg,Ht,𝒯)←Revise​(Hg,Ht,𝒯,τ)(H\_{g},H\_{t},\mathcal{T})\leftarrow\textsc{Revise}(H\_{g},H\_{t},\mathcal{T},\tau)

7:
return Hg,Ht,𝒯H\_{g},H\_{t},\mathcal{T}

RunTask(Hg,Ht,x)(H\_{g},H\_{t},x)

1:
Hts←BINDs​(Ht)H\_{t}^{s}\leftarrow\texttt{BIND}\_{s}(H\_{t});
Hte←BINDe​(Ht)H\_{t}^{e}\leftarrow\texttt{BIND}\_{e}(H\_{t})

2:
Initialize state z0z\_{0}, memory ℳ0\mathcal{M}\_{0}; τ←∅\tau\leftarrow\emptyset

3:
for each step tt until completion do

4:
  ct←Utilize​(Retrieve​(x,zt,ℳt),zt)c\_{t}\leftarrow\textsc{Utilize}(\textsc{Retrieve}(x,z\_{t},\mathcal{M}\_{t}),z\_{t})

5:
  pt←M⁡(x,zt,ct,Hg,Hts)p\_{t}\leftarrow M(x,z\_{t},c\_{t};H\_{g},H\_{t}^{s})

6:
  (zt+1,ft)←Execute​(Hte​(pt))(z\_{t+1},f\_{t})\leftarrow\textsc{Execute}(H\_{t}^{e}(p\_{t}))

7:
  τ←τ∥(zt,ct,pt,zt+1,ft)\tau\leftarrow\tau\mathbin{\|}(z\_{t},c\_{t},p\_{t},z\_{t+1},f\_{t})

8:
  ℳt+1←SAVE​(ℳt,τ)\mathcal{M}\_{t+1}\leftarrow\textsc{SAVE}(\mathcal{M}\_{t},\tau)
 on event

9:
return τ\tau

## 3 Experiments

### 3.1 System-Level Evolution of Embodied Decision-Making

![Refer to caption](2609.32862v1/robo_evaluation.png)

Figure 3:
Example of evolution trace on the EB-Habitat spatial subset. Here, RoboFoundry (GPT-5.5) rises Held-in success rate from 21.4 %21.4\text{\,}\% to 78.0 %78.0\text{\,}\% over six candidate evaluations. The final version passes the held-out check and is promoted to the general system.

EmbodiedBench ([Yang et al., 2025](#bib.bib6)) evaluates embodied decision-making
across 1,128 tasks in four environments:
EB-ALFRED and EB-Habitat test high-level semantic planning, while
EB-Navigation and EB-Manipulation require low-level executable actions. We instantiate the raw backbone, RoboFoundry-Lite, and full
RoboFoundry across multiple frontier foundation models: GPT-6 Astra, GPT-5.5, Qwen3.7-Plus, Qwen3.8-27B, and GLM5.3-Flash.
Lite ablates general evolution and keeps task edits only.
All variants share the same task stream and interaction budget, evolve from
the first scored episode, and retain every evolution trajectory in the
reported score.

Table [1](#S3.T1 "Table 1 ‣ 3.1 System-Level Evolution of Embodied Decision-Making ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents") shows consistent gains across all five
backbones, indicating that RoboFoundry is compatible with heterogeneous
foundation models and repairs backbone-specific bottlenecks rather than
converging to a fixed harness.
It improves GPT-5.5 by 27.8 %27.8\text{\,}\%, and notably lifts Qwen3.7-Plus to
near parity with RoboFoundry (GPT-5.5), showing that performance is governed
by the evolved system rather than dominated by a stronger backbone.
Even the frontier-tier GPT-6 Astra benefits from RoboFoundry, with an
8.5 %8.5\text{\,}\% relative gain.
The 11.2 %11.2\text{\,}\% relative gain of full RoboFoundry over RoboFoundry-Lite
on Qwen3.7-Plus further isolates general-scope evolution as the critical
ingredient. Subset results are detailed in
Tables [5](#A1.T5 "Table 5 ‣ Task-specific execution. ‣ A.3.4 Filesystem Organization ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")–[8](#A1.T8 "Table 8 ‣ Task-specific execution. ‣ A.3.4 Filesystem Organization ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"). We further evaluate a 16K-token context budget in
Table [9](#A1.T9 "Table 9 ‣ Task-specific execution. ‣ A.3.4 Filesystem Organization ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"). A larger budget itself does not consistently
improve task success (e.g., GLM5.3-Flash drops from 62.0% at 4K to
61.3% at 16K), while RoboFoundry still improves all backbones
at 16K by 7.9 %7.9\text{\,}\%–13.1 %13.1\text{\,}\% relative to their baselines.

![Refer to caption](2609.32862v1/robo_scale.png)

Figure 4:
Example of scaling with held-in data on EmbodiedBench.
RoboFoundry (GPT-5.5) is evaluated on 50 fixed held-out tasks
per suite. Using three quarters of the held-in data already
matches the full-data success rate of 74.0 %74.0\text{\,}\% on EB-Habitat,
highlighting data-efficient evolution.

Figure [3](#S3.F3 "Figure 3 ‣ 3.1 System-Level Evolution of Embodied Decision-Making ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents") further traces one evolution run on the EB-Habitat
spatial subset: three committed edits lift held-in success from
21.4 %21.4\text{\,}\% to 50.0 %50.0\text{\,}\%, two candidates are discarded without changing
the system, and the last is tagged for promotion, reaching 78.0 %78.0\text{\,}\%. We further investigate how RoboFoundry scales with the amount of held-in data
used for evolution, reserving 50 held-out tasks per suite for testing.
As shown in Figure [4](#S3.F4 "Figure 4 ‣ 3.1 System-Level Evolution of Embodied Decision-Making ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"), evolution is data-efficient:
one quarter of the held-in tasks already reaches 78.0 %78.0\text{\,}\% on EB-ALFRED and
66.0 %66.0\text{\,}\% on EB-Habitat, and three quarters recover most of the final score,
with EB-Habitat saturating at 74.0 %74.0\text{\,}\%.

Table 1:
Overall comparison on EmbodiedBench.
Avg. is the arithmetic mean of success rates across the four suites.
All results are reported in percentage (%).
Gains are reported in percentage points (+pp).

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Method | Avg. | EB- ALFRED | EB- Habitat | EB- Navigation | EB- Manipulation |
| RoboFoundry (GPT-6 Astra) | 78.0+6.1 | 90.0+2.7 | 86.7+11.4 | 80.2+3.2 | 54.9+6.9 |
| RoboFoundry (GPT-5.5) | 72.7+15.8 | 84.0+7.3 | 88.7+24.7 | 72.0+17.3 | 45.9+13.8 |
| RoboFoundry (Qwen3.7-Plus) | 70.3+10.4 | 81.3+8.0 | 80.3+15.3 | 71.9+7.6 | 47.7+10.5 |
| RoboFoundry (GLM5.3-Flash) | 69.3+7.4 | 80.0+8.3 | 75.0+14.3 | 72.7+1.7 | 49.5+5.1 |
| RoboFoundry (Qwen3.8-27B) | 66.5+14.2 | 78.0+12.3 | 77.0+19.0 | 68.3+16.0 | 42.8+9.5 |
| RoboFoundry-Lite (GPT-5.5) | 65.5+8.6 | 78.0+1.3 | 74.3+10.3 | 69.7+15.0 | 39.9+7.8 |
| RoboFoundry-Lite (Qwen3.7-Plus) | 63.2+3.2 | 75.0+1.7 | 72.0+7.0 | 68.0+3.7 | 37.6+0.4 |
| GPT-6 Astra | 71.9 | 87.3 | 75.3 | 77.0 | 48.0 |
| GLM5.3-Flash | 62.0 | 71.7 | 60.7 | 71.0 | 44.4 |
| Qwen3.7-Plus | 60.0 | 73.3 | 65.0 | 64.3 | 37.2 |
| GPT-5.5 | 56.9 | 76.7 | 64.0 | 54.7 | 32.1 |
| Qwen3.8-27B | 52.3 | 65.7 | 58.0 | 52.3 | 33.3 |
| Claude-3.5-Sonnet | 50.5 | 64.0 | 68.0 | 44.7 | 25.4 |
| GPT-4o | 50.4 | 56.3 | 59.0 | 57.7 | 28.5 |
| Claude-3.7-Sonnet | 49.9 | 67.7 | 58.7 | 45.0 | 28.3 |

### 3.2 Long-Horizon Memory through Context Evolution

RoboMemArena ([Lei et al., 2026](#bib.bib5)) evaluates long-horizon memory across
26 tasks in four categories: Transfer, Occlusion,
Counting, and Sequence.
We follow the official protocol and report task success rate (TSR) and
cumulative success rate (CSR).
RoboFoundry uses Qwen3.7-Plus as the backbone for the main comparison.
Evolution begins with the first scored episode, and all trajectories
used for updates count toward the evaluation budget.
Task state is reset between trials; only validated task-agnostic
context revisions persist.
Table [2](#S3.T2 "Table 2 ‣ 3.2 Long-Horizon Memory through Context Evolution ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents") shows that RoboFoundry achieves 53.5 %53.5\text{\,}\% TSR and 72.8 %72.8\text{\,}\% CSR, outperforming all baselines
across all four categories. Compared with PrediMem, RoboFoundry achieves its largest relative TSR
gain on Transfer, improving it by 213.3 %213.3\text{\,}\%.

We further apply RoboFoundry to standalone
π0.5\pi\_{0.5} ([Black et al., 2025](#bib.bib12)) and PrediMem, which combines
Qwen3-VL-8B-Instruct for explicit memory management and planning with π0.5\pi\_{0.5} for execution.
Table [4](#S3.T4 "Table 4 ‣ 3.2 Long-Horizon Memory through Context Evolution ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents") shows improvements in both
TSR and CSR across all categories for both architectures, with a
200.0 %200.0\text{\,}\% relative TSR gain for PrediMem on Transfer.
These results support the applicability of RoboFoundry’s context evolution across
different memory architectures.

Table 2:
Long-horizon memory results on RoboMemArena. RoboFoundry achieves the best TSR and CSR overall and across all four categories. Each entry reports TSR / CSR (%).

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Method | Overall | Transfer | Occlusion | Counting | Sequence |
| RoboFoundry | 53.5 / 72.8 | 70.5 / 78.1 | 38.3 / 57.6 | 55.2 / 82.5 | 75.2 / 92.1 |
| PrediMem | 38.5 / 55.2 | 22.5 / 45.2 | 27.3 / 38.4 | 45.7 / 69.3 | 72.5 / 89.5 |
| MemER | 27.3 / 49.1 | 20.0 / 36.1 | 16.4 / 33.2 | 27.1 / 65.1 | 65.0 / 79.1 |
| HiF-VLA | 16.9 / 39.8 | 17.5 / 38.9 | 12.7 / 27.1 | 8.6 / 45.9 | 42.5 / 70.2 |
| π0.5\pi\_{0.5} | 21.5 / 38.7 | 20.0 / 42.8 | 12.7 / 17.2 | 14.3 / 50.9 | 60.0 / 71.6 |
| MemoryVLA | 15.0 / 35.3 | 15.0 / 37.2 | 7.3 / 13.1 | 14.3 / 55.1 | 37.5 / 65.2 |

Table 3:
Context evolution across agent configurations.
RoboFoundry improves both standalone π0.5\pi\_{0.5} and PrediMem across all four categories. Each entry reports TSR/CSR (%).

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| Memory Category | 𝝅0.5\bm{\pi}\_{0.5} | | PrediMem | |
|  | Base | +RoboFoundry | Base | +RoboFoundry |
| Transferring | 20.0 / 42.8 | 62.5 / 71.2 | 22.5 / 45.2 | 67.5 / 76.2 |
| Occlusion | 12.7 / 17.2 | 33.6 / 47.2 | 27.3 / 38.4 | 36.4 / 56.4 |
| Counting | 14.3 / 50.9 | 58.8 / 79.6 | 45.7 / 69.3 | 53.7 / 80.3 |
| Sequence | 60.0 / 71.6 | 70.0 / 90.8 | 72.5 / 89.5 | 73.0 / 90.5 |
| Avg. | 26.8 / 45.6 | 56.2 / 72.2 | 42.0 / 60.6 | 57.7 / 75.9 |

Table 4:
Results on LIBERO-PRO under perturbations.
Each entry reports position/task success rate (%).
† denotes privileged simulator object poses.

|  |  |  |  |
| --- | --- | --- | --- |
| Method | Object | Goal | Spatial |
| OpenVLA | 0.0 / 0.0 | 0.0 / 0.0 | 0.0 / 0.0 |
| π0\pi\_{0} | 0.0 / 0.0 | 0.0 / 0.0 | 0.0 / 0.0 |
| π0.5\pi\_{0.5} | 17.0 / 1.0 | 38.0 / 0.0 | 20.0 / 1.0 |
| CaP-Agent0 | 21.8 / 18.2 | 25.6 / 16.8 | 11.8 / 14.0 |
| ASPIRE | 98.0 / 95.0 | 81.0 / 45.0 | 51.0 / 60.0 |
| Harness VLA (Codex) | 81.0 / 69.0 | 94.0 / 91.0 | 75.0 / 66.0 |
| Harness VLA (CC) | 94.0 / 80.0 | 88.0 / 90.0 | 87.0 / 87.5 |
| RoboFoundry | 96.0 / 98.0 | 88.0 / 86.0 | 92.0 / 91.5 |
| RoboFoundry† | 99.0 / 100.0 | 96.0 / 100.0 | 98.0 / 99.2 |

### 3.3 System Evolution under Distribution Shift

We use LIBERO-PRO ([Zhou et al., 2025](#bib.bib21)) to test whether persistent system evolution improves
robustness to changes in object layouts and task specifications. We compare against CaP-Agent0 ([Fu et al., 2026](#bib.bib10)),
ASPIRE ([Lu et al., 2026](#bib.bib3)), and both Harness VLA variants
(CodeX and CC) ([Zhang et al., 2026c](#bib.bib17)). Following the CaP-Agent0 protocol, we evaluate 30 tasks
from the Object, Goal, and Spatial suites under
*Position* and *Task* perturbations, using the same perception
and control primitives, multi-turn interaction setting, and 50 trials
per task and perturbation.
Evolution begins with the first scored rollout, and all rollouts used
for updates count toward the evaluation budget.

Table [4](#S3.T4 "Table 4 ‣ 3.2 Long-Horizon Memory through Context Evolution ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents") shows that RoboFoundry
achieves the highest average success rate across the six settings
among methods without privileged object poses
(91.9 %91.9\text{\,}\% vs. 87.8 %87.8\text{\,}\% for Harness VLA (CC)).
It also outperforms CaP-Agent0 with up to a
679.7 %679.7\text{\,}\% relative gain on Spatial position perturbations, supporting the benefit of persistent system
evolution beyond within-episode program repair.
We report task-wise results in
Tables [10](#A1.T10 "Table 10 ‣ Task-specific execution. ‣ A.3.4 Filesystem Organization ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")–[12](#A1.T12 "Table 12 ‣ Task-specific execution. ‣ A.3.4 Filesystem Organization ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").

![Refer to caption](2609.32862v1/robo_real_1.png)

Figure 5:
Real-world evolution and transfer of RoboFoundry.
(a) Failures motivate alignment and progress-tracking edits,
enabling nesting-doll completion in Trial 3.
(b) Towel-folding skills evolved on the blue towel transfer
to unseen green and pink fabrics.
(c) The general system grounds a semantic navigation goal
in executable actions on a Unitree G1 humanoid.

To assess how much perception limits the evolved system, we additionally
provide RoboFoundry† with privileged simulator object poses.
Success improves across all six settings, reaching 100%
on both Object and Goal task perturbations.
These gains suggest that perception remains a bottleneck and that
RoboFoundry can translate more accurate state information into
more reliable task execution.

### 3.4 Real-World Evaluation

![Refer to caption](2609.32862v1/robo_real_2.png)

Figure 6:
Long-horizon chemistry manipulation with RoboFoundry.
A task-state record connects six dependent subtasks: funnel readiness
and scale taring are written during execution, and the final pouring
step reads the earlier funnel-ready state to guide skill execution.

We evaluate whether the general RoboFoundry system transfers to physical
robots and continues improving after deployment.
Throughout the real-world experiments, RoboFoundry takes GPT-5.5 as the supporting foundation model and π0.5\pi\_{0.5} as its manipulation backend,
following ([Lei et al., 2026](#bib.bib5)).
For a fair comparison, RoboFoundry and the standalone baseline π0.5\pi\_{0.5} share
the same fine-tuned checkpoint on corresponding tasks.
RoboFoundry starts without task-specific system adaptation.
We report the success rate of 10 trials per task, including all trials used
for online evolution, with system updates applied only between trials.

We first evaluate online evolution on an AgileX COBOT MAGIC platform. As shown in Figure [5](#S3.F5 "Figure 5 ‣ 3.3 System Evolution under Distribution Shift ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")(a), nesting-doll manipulation requires both small-to-large ordering and
precise insertion. Early failures drive complementary skill and context revisions:
alignment checks improve insertion, while progress tracking enables
execution to resume from the last completed subtask. Finally, RoboFoundry achieves 70 %70\text{\,}\% success, compared with
30 %30\text{\,}\% for standalone π0.5\pi\_{0.5}.

Moreover, Figure [5](#S3.F5 "Figure 5 ‣ 3.3 System Evolution under Distribution Shift ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")(b) demonstrates zero-shot transfer
of the evolved folding skill: RoboFoundry evolves only on the blue
towel and transfers directly to held-out green and pink towels
with different appearance, geometry, and material properties. Without further adaptation, RoboFoundry achieves over 80 %80\text{\,}\% success, compared with below 20 %20\text{\,}\% for π0.5\pi\_{0.5}, which needs further fine-tuning.
Figure [5](#S3.F5 "Figure 5 ‣ 3.3 System Evolution under Distribution Shift ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents")(c) extends RoboFoundry beyond manipulation
to semantic navigation on a Unitree G1 humanoid.
Through the shared semantic interface, RoboFoundry maps “Find drinking
water” to a dispenser identified in RGB observations, while
embodiment-specific bindings translate this target into navigation actions.
As shown in Figure [6](#S3.F6 "Figure 6 ‣ 3.4 Real-World Evaluation ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"), we also evaluate a long-horizon chemistry experiment with six dependent
subtasks. RoboFoundry successfully preserves subtask state through its context surface and
coordinates execution through reusable skill compositions and recovery
structures. Crucially, completed steps become persistent prerequisites for later
actions: the final pouring step retrieves the funnel-ready state
recorded several subtasks earlier. On the other hand, standalone π0.5\pi\_{0.5} struggles to complete the full procedure.

## 4 Related Work

##### Foundation Models as Embodied Agents.

LLMs and MLLMs increasingly guide embodied decision-making.
Early work connects language and multimodal observations to robot
actions through vision-language-action models, multimodal prompts,
and feedback-guided planning
 ([Brohan et al., 2023](#bib.bib11); [Jiang et al., 2023](#bib.bib14); [Huang et al., 2023](#bib.bib13)).
Code-as-policy methods further enable models to compose perception
and control primitives into executable programs
 ([Fu et al., 2026](#bib.bib10); [Zhang et al., 2026b](#bib.bib20)).
The same backbone can behave differently depending on its surrounding
interaction harness ([Liu et al., 2026](#bib.bib1); [Zhang et al., 2026c](#bib.bib17)),
verification ([Kwok et al., 2026](#bib.bib19)), and embodied decision
interface ([Li et al., 2024](#bib.bib7)).
RoboFoundry formalizes this dependence as *System-as-Policy*:
the executable policy is jointly determined by the foundation model
and its supporting system. It makes this system an explicit target of
evolution, turning embodied experience into persistent changes to
future behavior.

##### Self-Evolving LLM/MLLM Agents.

A parallel line improves agents through reflective
self-correction ([Madaan et al., 2023](#bib.bib16); [Shinn et al., 2023](#bib.bib8)),
persistent memory ([Packer et al., 2023](#bib.bib22); [Zhao et al., 2024](#bib.bib23)),
and automated search over prompts, workflows, or
code ([Khattab et al., 2023](#bib.bib24); [Hu et al., 2025](#bib.bib25); [Zhang et al., 2026a](#bib.bib26)).
RoboFoundry extends system-level adaptation to cross-embodied
execution. Its shared semantic interface separates task-level
reasoning from robot-specific execution, allowing system revisions
to be evaluated and reused across embodiments.

##### Self-Improving Embodied Agents.

Existing work studies skill acquisition
 ([Wang et al., 2023](#bib.bib9); [Lu et al., 2026](#bib.bib3); [Wang et al., 2026](#bib.bib15)),
memory-guided execution and policy orchestration
 ([Huang et al., 2026](#bib.bib18); [Zhang et al., 2026c](#bib.bib17); [Lei et al., 2026](#bib.bib5)),
program repair with execution feedback ([Fu et al., 2026](#bib.bib10)),
and closed-loop policy improvement
 ([Li et al., 2026](#bib.bib4); [Xiao et al., 2026](#bib.bib2)).
RoboFoundry treats context and skills as complementary intervention
surfaces of the executable system policy. It evaluates task-level
repairs on related held-out cases before promoting them into general
system capabilities that support subsequent tasks.

## 5 Conclusion

We present RoboFoundry, an embodied agentic framework for *System-as-Policy Evolution*. Acting as a bridge between general-purpose models and embodied scenarios, RoboFoundry improves the embodied agent lifecycle, from decision-making and memory management to skill execution.
It uses execution traces to improve task performance and promotes validated improvements into general system capabilities that benefit future tasks. RoboFoundry demonstrates strong autonomy and evolvability across multiple benchmarks and diverse real-world tasks. Looking forward, we aim to build an embodied flywheel that connects simulation and real-world experience, transfers knowledge from diverse non-embodied data to embodied tasks, and enables system evolution and model learning to reinforce each other.

## References

* Black et al. (2025)
  K. Black, N. Brown, J. Darpinian, K. Dhabalia, et al.
  π0.5\pi\_{0.5}: A vision-language-action model with open-world generalization.
  In Proceedings of The 9th Conference on Robot Learning,
  Proceedings of Machine Learning Research, Vol. 305, pp. 17–40.
  Cited by: [§3.2](#S3.SS2.p2.1 "3.2 Long-Horizon Memory through Context Evolution ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Brohan et al. (2023)
  A. Brohan, Y. Chebotar, C. Finn, K. Hausman, A. Herzog, D. Ho, J. Ibarz, A. Irpan, E. Jang, R. Julian, et al.
  Do as i can, not as i say: grounding language in robotic affordances.
  In Conference on robot learning,
  pp. 287–318.
  Cited by: [§1](#S1.p1.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px1.p1.1 "Foundation Models as Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Fu et al. (2026)
  M. Fu, J. Yu, K. El-Refai, E. Kou, et al.
  CaP-X: a framework for benchmarking and improving coding agents for robot manipulation.
  arXiv preprint arXiv:2603.22435.
  External Links: [Link](https://arxiv.org/abs/2603.22435)
  Cited by: [Table 10](#A1.T10 "In Task-specific execution. ‣ A.3.4 Filesystem Organization ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [Table 11](#A1.T11 "In Task-specific execution. ‣ A.3.4 Filesystem Organization ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [Table 12](#A1.T12 "In Task-specific execution. ‣ A.3.4 Filesystem Organization ‣ A.3 LIBERO-PRO Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§1](#S1.p1.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§3.3](#S3.SS3.p1.1 "3.3 System Evolution under Distribution Shift ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px1.p1.1 "Foundation Models as Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px3.p1.1 "Self-Improving Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Hu et al. (2025)
  S. Hu, C. Lu, and J. Clune
  Automated design of agentic systems.
  In International Conference on Learning Representations,
  Vol. 2025, pp. 21344–21377.
  Cited by: [§4](#S4.SS0.SSS0.Px2.p1.1 "Self-Evolving LLM/MLLM Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Huang et al. (2026)
  J. Huang, Y. Hu, Z. Li, R. Qi, Y. Xiao, Z. Zhang, M. Coates, T. Cao, and Y. Zhang
  RoboHarness: memory-driven orchestration of heterogeneous robot policies for long-horizon planning.
  arXiv preprint arXiv:2607.18060.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px3.p1.1 "Self-Improving Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Huang et al. (2023)
  W. Huang, F. Xia, T. Xiao, H. Chan, et al.
  Inner monologue: embodied reasoning through planning with language models.
  In Proceedings of The 6th Conference on Robot Learning,
  Proceedings of Machine Learning Research, Vol. 205, pp. 1769–1782.
  Cited by: [§1](#S1.p1.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px1.p1.1 "Foundation Models as Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Jiang et al. (2023)
  Y. Jiang, A. Gupta, Z. Zhang, G. Wang, et al.
  VIMA: robot manipulation with multimodal prompts.
  In Proceedings of the 40th International Conference on Machine Learning,
  Proceedings of Machine Learning Research, Vol. 202, pp. 14975–15022.
  Cited by: [§1](#S1.p1.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px1.p1.1 "Foundation Models as Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Khattab et al. (2023)
  O. Khattab, A. Singhvi, P. Maheshwari, Z. Zhang, K. Santhanam, S. Vardhamanan, S. Haq, A. Sharma, T. T. Joshi, H. Moazam, et al.
  Dspy: compiling declarative language model calls into self-improving pipelines.
  arXiv preprint arXiv:2310.03714.
  Cited by: [§4](#S4.SS0.SSS0.Px2.p1.1 "Self-Evolving LLM/MLLM Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Kwok et al. (2026)
  J. Kwok, S. Li, P. Atreya, Y. Liu, Y. Jiang, C. Finn, M. Pavone, I. Stoica, and A. Mirhoseini
  LLM-as-a-verifier: a general-purpose verification framework.
  arXiv preprint arXiv:2607.05391.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px1.p1.1 "Foundation Models as Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Lei et al. (2026)
  H. Lei, W. Song, H. Zhang, J. Pei, J. Chen, H. Yan, H. Zhao, P. Ding, Z. Zhang, L. Huang, et al.
  Robomemarena: a comprehensive and challenging robotic memory benchmark.
  arXiv preprint arXiv:2605.10921.
  Cited by: [§3.2](#S3.SS2.p1.1 "3.2 Long-Horizon Memory through Context Evolution ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§3.4](#S3.SS4.p1.1 "3.4 Real-World Evaluation ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px3.p1.1 "Self-Improving Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Li et al. (2024)
  M. Li, S. Zhao, Q. Wang, K. Wang, Y. Zhou, S. Srivastava, C. Gokmen, T. Lee, L. E. Li, R. Zhang, et al.
  Embodied agent interface: benchmarking llms for embodied decision making.
  Advances in Neural Information Processing Systems 37, pp. 100428–100534.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px1.p1.1 "Foundation Models as Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Li et al. (2026)
  R. Li, Y. Zhou, Y. Zhu, K. Chen, J. Wang, S. Wang, K. Hu, M. Yu, B. Jiang, Z. Su, et al.
  Roboclaw: an agentic framework for scalable long-horizon robotic tasks.
  arXiv preprint arXiv:2603.11558.
  Cited by: [§1](#S1.p1.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px3.p1.1 "Self-Improving Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Liu et al. (2026)
  H. Liu, X. Li, S. Yao, P. Shi, T. Zhou, J. Huang, F. Huang, and J. Mao
  Guava: an effective and universal harness for embodied manipulation.
  arXiv preprint arXiv:2606.18363.
  Cited by: [§1](#S1.p1.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px1.p1.1 "Foundation Models as Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Lu et al. (2026)
  R. Lu, Y. Wu, E. Kou, L. Fu, W. Xiao, A. Mandlekar, Y. Xu, G. Shi, K. Goldberg, A. Chen, et al.
  ASPIRE: agentic/skills discovery for robotics.
  arXiv preprint arXiv:2607.00272.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§3.3](#S3.SS3.p1.1 "3.3 System Evolution under Distribution Shift ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px3.p1.1 "Self-Improving Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Madaan et al. (2023)
  A. Madaan, N. Tandon, P. Gupta, S. Hallinan, L. Gao, S. Wiegreffe, U. Alon, N. Dziri, S. Prabhumoye, Y. Yang, et al.
  Self-refine: iterative refinement with self-feedback.
  Advances in neural information processing systems 36, pp. 46534–46594.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px2.p1.1 "Self-Evolving LLM/MLLM Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Packer et al. (2023)
  C. Packer, S. Wooders, K. Lin, V. Fang, S. G. Patil, I. Stoica, and J. E. Gonzalez
  Memgpt: towards llms as operating systems.
  arXiv preprint arXiv:2310.08560.
  Cited by: [§4](#S4.SS0.SSS0.Px2.p1.1 "Self-Evolving LLM/MLLM Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Shinn et al. (2023)
  N. Shinn, F. Cassano, A. Gopinath, K. Narasimhan, and S. Yao
  Reflexion: language agents with verbal reinforcement learning.
  Advances in neural information processing systems 36, pp. 8634–8652.
  Cited by: [§4](#S4.SS0.SSS0.Px2.p1.1 "Self-Evolving LLM/MLLM Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Wang et al. (2026)
  C. Wang, C. Zhang, Z. Wu, R. Li, A. Ma, K. Chao, Y. Liang, X. Xu, Z. Wang, Y. Tang, et al.
  SkillMemo: expert-guided skill memory framework for compositional embodied manipulation.
  arXiv preprint arXiv:2608.05970.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px3.p1.1 "Self-Improving Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Wang et al. (2023)
  G. Wang, Y. Xie, Y. Jiang, A. Mandlekar, et al.
  Voyager: an open-ended embodied agent with large language models.
  arXiv preprint arXiv:2305.16291.
  External Links: [Link](https://arxiv.org/abs/2305.16291)
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px3.p1.1 "Self-Improving Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Xiao et al. (2026)
  W. Xiao, J. Xie, T. Zhang, H. Lin, L. Fu, H. Xue, J. Lu, Y. Yang, C. Dai, Z. Wang, et al.
  ENPIRE: agentic robot policy self-improvement in the real world.
  arXiv preprint arXiv:2606.19980.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px3.p1.1 "Self-Improving Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Yang et al. (2025)
  R. Yang, H. Chen, J. Zhang, M. Zhao, C. Qian, K. Wang, Q. Wang, T. V. Koripella, M. Movahedi, M. Li, et al.
  EmbodiedBench: comprehensive benchmarking multi-modal large language models for vision-driven embodied agents.
  In International Conference on Machine Learning,
  pp. 70576–70631.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§3.1](#S3.SS1.p1.1 "3.1 System-Level Evolution of Embodied Decision-Making ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Zhang et al. (2026a)
  J. Zhang, S. Hu, C. Lu, R. Lange, and J. Clune
  Darwin gödel machine: open-ended evolution of self-improving agents.
  In International Conference on Learning Representations,
  Vol. 2026, pp. 104223–104294.
  Cited by: [§4](#S4.SS0.SSS0.Px2.p1.1 "Self-Evolving LLM/MLLM Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Zhang et al. (2026b)
  J. Zhang, J. Ge, H. Yoo, L. Fu, Z. Yang, Y. Liu, R. Saravanan, S. Yin, J. Yu, D. Niu, et al.
  Playful agentic robot learning.
  arXiv preprint arXiv:2606.19419.
  Cited by: [§1](#S1.p1.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px1.p1.1 "Foundation Models as Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Zhang et al. (2026c)
  Y. Zhang, H. Zhang, F. Gao, X. Li, Z. Liu, C. Zhu, J. Qiu, Y. Yan, J. Liu, W. Tang, et al.
  Harness vla: steering frozen vlas into reliable manipulation primitives via memory-guided agents.
  arXiv preprint arXiv:2607.08448.
  Cited by: [§1](#S1.p2.1 "1 Introduction ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§3.3](#S3.SS3.p1.1 "3.3 System Evolution under Distribution Shift ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px1.p1.1 "Foundation Models as Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents"),
  [§4](#S4.SS0.SSS0.Px3.p1.1 "Self-Improving Embodied Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Zhao et al. (2024)
  A. Zhao, D. Huang, Q. Xu, M. Lin, Y. Liu, and G. Huang
  Expel: llm agents are experiential learners.
  In Proceedings of the AAAI Conference on Artificial Intelligence,
  Vol. 38, pp. 19632–19642.
  Cited by: [§4](#S4.SS0.SSS0.Px2.p1.1 "Self-Evolving LLM/MLLM Agents. ‣ 4 Related Work ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").
* Zhou et al. (2025)
  X. Zhou, Y. Xu, G. Tie, Y. Chen, G. Zhang, D. Chu, P. Zhou, and L. Sun
  Libero-pro: towards robust and fair evaluation of vision-language-action models beyond memorization.
  arXiv preprint arXiv:2510.03827.
  Cited by: [§3.3](#S3.SS3.p1.1 "3.3 System Evolution under Distribution Shift ‣ 3 Experiments ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents").

## Appendix A Appendix

### A.1 EmbodiedBench Evolution Case Studies

![Refer to caption](2609.32862v1/robo_embodiedbench_simple.png)

Figure 7:
Representative EmbodiedBench cases (GPT-5.5) before and after
RoboFoundry evolution.
Examples illustrate repairs to perception, reasoning, planning, and
low-level skill execution.

This section provides several examples of how RoboFoundry evolves on EmbodiedBench. Figure [7](#A1.F7 "Figure 7 ‣ A.1 EmbodiedBench Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents") illustrates four representative
failures repaired through changes to perception, reasoning, planning,
and skill execution. We compare the initial execution (GPT-5.5) with the final candidate promoted by RoboFoundry’s evolution. Specifically, we expose three levels of change:
(1) the persistent *general* system, (2) its *task-specific* realization during execution, and (3) the corresponding changes in the filesystem. To ensure a fair comparison, we use the same episode and instruction for the initial and final candidates.

#### A.1.1 Example 1: Feedback-Grounded Recovery in EB-Habitat

Consider the instruction
"Relocate every cleanser from sink onto the sofa."
The initial system permits relatively long action sequences.
The accepted revision instead introduces observation checkpoints after
navigation and treats environment feedback as stronger evidence than
visual appearance for interaction feasibility:

- Each plan should include no more than 20 actions.
+ Prefer one action; at most two when both are currently supported.
+ After Navigation, observe before Pick/Place/Open/Close.
+ Trust environment feedback over visual appearance for proximity.
+ After a not-near Pick failure, navigate before retrying.

This is a shared cross-task modification: it does not encode the
cleanser, sink, sofa, or other entities from the proposal episode.
During execution, the shared rule is instantiated using task-conditioned
feedback. The persistent system policy stores the reusable recovery rule, while
the runtime instantiation binds it to the current failed action, object,
and environment feedback:

- Pick(cleanser) -> not near -> repeated retries -> failure
+ Pick(cleanser) -> not near
+ Navigate(table 2) -> Pick(cleanser) -> Navigate(sofa) -> Place(sofa)
+ task success

#### A.1.2 Example 2: Skill Refinement in EB-Manipulation

We further examine
"Please put the red star into the shape sorter."
The initial rollout executes 15 valid actions without completing the
task, whereas the rollout under the accepted revision succeeds at the
sixth action. The revision introduces an explicit skill-level insertion
strategy:

+ For shape-sorter tasks, insert the object into the matching opening.
+ Keep holding while aligning and descending into the opening.
+ Release only when the object is inside or just below the opening.

The corresponding task-conditioned action sequence changes from an early
release to a grasp-preserving descent.
Actions follow
[x,y,z,rx,ry,rz,gripper], where the final dimension controls
the gripper:

- [49,60,48,0,60,45,0] // above opening, closed
- [49,60,40,0,60,45,1] // early release
+ [49,60,48,0,60,35,0] // above opening, closed
+ [49,60,39,0,60,35,0] // descend while holding
+ [49,60,38,0,60,35,1] // low-position release

#### A.1.3 Example 3: Support-Surface Grounding in EB-ALFRED

The instruction
"Place the newspaper next to the left laptop"
requires distinguishing a semantic spatial reference from a physically
valid support surface.
The laptop defines the target spatial region, while the sofa provides
the executable support surface. The accepted revision explicitly
separates these roles in the runtime plan:

find Newspaper
pick up Newspaper
find Laptop
+ find Sofa
put down

#### A.1.4 Example 4: Reachable-Floor Reasoning in EB-Navigation

For
"navigate to the Toaster and be as close as possible",
the initial planner primarily reasons about the target location and
nearby obstacles. The planner under the accepted revision also uses
shorter movement segments, allowing new observations and collision
feedback to affect subsequent actions.
The final target distance decreases from 3.9 m3.9\text{\,}\mathrm{m} to 0.9 m0.9\text{\,}\mathrm{m}.
The accepted revision adds an explicit rule for reasoning over reachable
floor:

- Reason based on the target object’s location and nearby obstacles.
+ Reason about the reachable floor path, not only the target image location.
+ For targets on furniture, approach the free floor beside the support surface.

#### A.1.5 Persistent Filesystem Evolution

RoboFoundry does not treat evolution as transient model output.
A candidate becomes an *accepted revision* only after evaluation;
accepted revisions are then committed to the agent workspace.
For EmbodiedBench, the execution and outer-loop systems
are organized as follows:

⬇

+– overlay/embodiedbench/

| +– evaluator/config/

| | +– system\_prompts.py

| | +– habitat\_examples.json

| | +– eb\_navigation\_examples.json

| | +– eb\_manipulation\_examples.json

| | +– eb\_alfred\_examples.json

| +– planner/

| +– vlm\_planner.py

| +– nav\_planner.py

| +– manip\_planner.py

+– .robofoundry/

+– AGENTS.md

+– READ\_POLICY.md

+– bootstrap/{snapshot.json, summary.md}

+– experience/{parent\_summary.json, parent/…}

+– <benchmark>\_feedback/{summary.md, failures.json}

##### Execution surface.

overlay/embodiedbench/ contains components directly used
during agent execution.
Evolution modifies persistent rules, demonstrations, and execution feedback. These modifications constitute the persistent system policy reused by subsequent executions. Representative file modifications are:

ALFRED
M evaluator/config/system\_prompts.py
M planner/planner\_utils.py
M planner/vlm\_planner.py
Habitat
M evaluator/config/system\_prompts.py
M evaluator/config/habitat\_examples.json
M planner/vlm\_planner.py
Navigation
M evaluator/config/system\_prompts.py
M evaluator/config/eb\_navigation\_examples.json
M planner/nav\_planner.py
Manipulation
M evaluator/config/system\_prompts.py
M evaluator/config/eb\_manipulation\_examples.json
M planner/manip\_planner.py

##### Outer-loop evolution evidence.

The .robofoundry/ branch is the filesystem realization of the
Evolution Ledger ℒ\mathcal{L}.
It stores information used by the outer evolution process, including
bootstrap state, parent–candidate information, evaluation summaries,
and benchmark-specific failures. Observations, actions, feedback, and model outputs remain
associated with evaluation traces:

⬇

+– results/episode\_\*\_res.json

+– episode\_\*\_step\_\*.json

+– traces/episode\_\*/

+– step\_\*/

+– prompt.txt

+– model\_output.txt

These execution traces provide the grounded evidence from which
candidate system revisions are diagnosed and evaluated.
Taken together, the filesystem separates two roles: runtime execution
produces grounded traces, while accepted revisions persist reusable
decision rules and execution constraints back into the system policy.

### A.2 RoboMemArena Evolution Case Studies

We provide several examples of how RoboFoundry changes the
context-management system on RoboMemArena. We expose how an
accepted system revision changes
(1) persistent context or memory rules,
(2) the task-conditioned input, and
(3) the corresponding files in the agent workspace.
We select representative tasks from four RoboMemArena categories:
Transfer, Occlusion, Counting, and Sequence.
Figure [8](#A1.F8 "Figure 8 ‣ A.2 RoboMemArena Evolution Case Studies ‣ Appendix A Appendix ‣ RoboFoundry: System-as-Policy Evolution for Self-Learning Embodied Agents") shows the corresponding rollouts
and illustrates how the evolved context supports task execution.

![Refer to caption](2609.32862v1/robo_memory_exp.png)

Figure 8: RoboFoundry rollouts across four memory categories in
RoboMemArena: Transfer, Occlusion, Counting, and Sequence.

#### A.2.1 Example 1: Task Progress as Active Context in Transfer

We first examine a Transferring task that requires moving both
*butter* and *cream cheese* from one plate to another.
The initial formatter ignores runtime progress and always returns the
original task prompt, whereas the revised formatter explicitly selects
the next unfinished stage:

- del context
- return str(base\_prompt)
+ completed\_count = \_completed\_stage\_count(context)
+ stage = \_next\_stage\_name(context)
+ overall = "overall task: <base task>"
+ return <next stage> + <overall task> + "do not undo completed steps"

The persistent rule is task-agnostic: object names appear only in its
runtime instantiation from the current execution state.
For the selected episode:

⬇

01\_Place\_Butter\_Plate2 = true

02\_Place\_Cream\_Cheese\_Plate2 = false

This changes the actual input from a static task description to
an explicit active subgoal:

- butter cream
+ place cream cheese plate 2.
+ overall task: butter cream.
+ do not undo completed steps

The evolved context therefore preserves the active subgoal, global task,
and completed progress simultaneously.
The selected episode progresses from completing only the butter stage
to completing both stages; across the corresponding 10-episode search
evaluation, full-task success increases from 40 %40\text{\,}\% to 70 %70\text{\,}\%.

#### A.2.2 Example 2: External Visual Memory under Occlusion

The Occlusion example requires manipulating cookies with a microwave
and later placing popcorn into it.
The evolved memory system introduces explicit rules for combining the
current observation, sparse visual history, and attempted trials:

+ Ground decisions in the latest frame first.
+ Use historical keyframes for persistent objects, receptacles, and progress.
+ Keep frames that capture persistent state changes or useful locations.
+ Attempted commands are not evidence of physical success.
+ If the current image supports completion, advance to the next primitive.

The memory selector additionally provides sparse fallback anchors when
no selected keyframes are available and summarizes recent attempted
commands into the active context.
For one selected invocation, the retrieved visual context is:

⬇

recent\_window = [711, …, 715]

previous\_primitive = open microwave

place cookies = attempted 31x (t=560–710)

The corresponding contextual guidance emphasizes that the retrieved
historical frames are reminders rather than authoritative evidence:

+ Use sparse historical frames as reminders of persistent scene state.
+ Compare them with the current frame before deciding to continue or move on.
+ Attempted VLA prompts are not evidence that an action succeeded.

The initially selected episode repeatedly returns to
pick cookies, whereas the evolved execution later transitions
to pick popcorn and place popcorn.
Recorded stage completion changes from 50 %50\text{\,}\% to 75 %75\text{\,}\%.
This example illustrates the evolution of both which historical
observations are retrieved and how retrieved evidence is
presented and interpreted.

#### A.2.3 Example 3: Counting as Stage-Conditioned Context

The Counting task requires two pouring operations followed by a final
placement.
The initial formatter always returns the same base prompt.
The revised formatter instead converts ordered stage state into an
explicit next-step instruction:

+ completed\_count = number of completed stages
+ unfinished\_count = number of remaining stages
+ append "<N> earlier steps already complete"
+ append "Next, <next unfinished stage>"
+ if one stage remains: finish it and avoid redoing completed steps

Across the search evaluation, full-task success increases
from 60 %60\text{\,}\% to 80 %80\text{\,}\%. After both pouring stages have been recorded as complete, the runtime
prompt changes to:

- pour tomato sauce into bowl drainer
+ Task: pour tomato sauce into bowl drainer.
+ 2 earlier steps are already complete.
+ Next, place bowl drainer.
+ Complete this remaining step now and avoid redoing completed steps.

#### A.2.4 Example 4: Local Progress Improvement in Sequence

RoboFoundry changes the context system and selects key episodes. The evolved format exposes the active stage and adds stage-dependent execution constraints:

+ For place/put/insert/move: the named item should end at the destination.
+ For open/close: change only the named fixture for this step.
+ Do not redo completed steps.
+ After all stages complete: preserve the final arrangement.

One runtime prompt becomes:

⬇

Full task: pour tomato cookies microwave.

The named item should end at the named destination.

Do not redo completed steps.

After all listed stages are marked complete:

⬇

All listed steps are complete;

hold the final arrangement and avoid disturbing objects.

#### A.2.5 Persistent Filesystem Changes

The behavior changes above correspond to persistent modifications in
the execution workspace rather than transient natural-language
suggestions:

⬇

+– evaluation\_benchmark/

+– scripts/

| +– robofoundry\_policy.py

+– async\_vlm\_reference/

+– memory\_policy.py

+– eval\_async\_vlm\_vla.py

The stage-conditioned Transferring, Counting, and Sequence cases modify
the shared context-management implementation, while the Occlusion case
additionally changes visual-memory selection, retrieval, and active-context
construction:

Transferring / Counting / Sequence
M evaluation\_benchmark/scripts/robofoundry\_policy.py
Occlusion
M evaluation\_benchmark/async\_vlm\_reference/memory\_policy.py
M evaluation\_benchmark/async\_vlm\_reference/eval\_async\_vlm\_vla.py

The persistent changes cover context formatting, ordered-stage
processing, stage-conditioned context construction, replanning cadence,
historical-frame selection, and memory-context formatting.

#### A.2.6 Evolution Evidence and Execution Traces

Outer-loop evolution evidence is stored separately from the
execution-facing system.
The .robofoundry/ branch is the filesystem realization:

⬇

+– .robofoundry/

+– AGENTS.md

+– READ\_POLICY.md

+– bootstrap/{snapshot.json, summary.md}

+– experience/

| +– parent\_summary.json

| +– parent/{manifest.json, evaluation/, validation/}

+– <adapter>\_feedback/

+– summary.md

+– failures.json

+– image\_evidence/\*.png

Task-conditioned evidence remains attached to each evaluation episode:

⬇

+– episode\_result.json

+– stage\_events.jsonl

+– vla\_input\_trace.jsonl # runtime prompt / context

+– vla\_prompt\_trace.jsonl # VLA prompt

+– sync\_vlm\_trace.jsonl # VLM decision / memory indices

+– vla\_inputs/

+– vlm\_inputs/

This organization separates three roles: execution traces record
episode-level state, actions, and failures; evolution evidence supports
diagnosis and candidate evaluation; and accepted revisions persist
reusable context-selection, retrieval, and utilization rules back into
the system policy.

These cases expose complementary forms of context management.
Transferring and Counting convert recorded progress into an explicit
active subgoal; Occlusion changes the retrieval and utilization of
external visual memory; and Sequence shows that better structured
active context can improve intermediate progress without resolving the
complete task.
Together, these examples show that RoboFoundry evolves not only the
content of a prompt, but also the mechanisms that determine what state
is retained, what evidence is retrieved, and how it is presented to the
embodied model.

### A.3 LIBERO-PRO Evolution Case Studies

We further inspect how RoboFoundry revises the executable system on
LIBERO-PRO.
In contrast to the context-centric changes observed in RoboMemArena,
the main revisions occur at the interface between high-level task
reasoning and physical execution, i.e., code-as-policy.
We distinguish two adaptation scopes.
Persistent shared evolution modifies prompt templates, API
semantics, reusable execution skills, and logic shared across tasks.
In contrast, trial-local recovery occurs within an individual
trial, where generated task code is revised using the current
observation, simulator state, execution feedback, and previous failures.

#### A.3.1 Persistent Evolution

The selected persistent revision modifies four files in the shared
workspace. These changes jointly modify task generation, API semantics, reusable
execution skills, and environment launch:

⬇

+– env\_configs/libero/

| +– franka\_libero\_robofoundry.yaml

+– robofoundry/integrations/franka/

| +– libero\_reduced.py

| +– libero\_harness.py

+– robofoundry/utils/

+– launch\_utils.py

##### Task-generation prompt.

The evolved template changes how ordinary object transfer should be
implemented. The persistent rule specifies *how* a transfer should be executed
without encoding object-specific cases:

- Prefer CuRobo grasp and transport planning with small fallbacks.
+ Prefer pick\_and\_place\_sim\_object(...) for ordinary object transfer.
+ Pass the desired final object-center XYZ from the live target pose.
+ Use a modest positive Z clearance for receptacles or support surfaces.
+ Keep TCP offsets and bounded grasp retries inside the helper.
+ Use lower-level CuRobo only when scene geometry requires it.

##### Coordinate semantics.

The revised execution interface consistently separates the desired
object-center target from the TCP target used by the controller.
This keeps hand-to-object offsets inside the embodiment-specific
execution interface rather than repeatedly re-estimating them in
generated task code:

⬇

tcp\_position = get\_ee\_pose()[0]

tcp\_object\_offset = tcp\_position - object\_position

tcp\_target =

desired\_object\_position + tcp\_object\_offset

##### Reusable helpers.

The evolved system exposes three higher-level operations:

⬇

place\_held\_sim\_object(…)

pick\_and\_place\_sim\_object(…)

The grasp skill reads the current object pose and performs bounded
physical grasp attempts.
The placement skill converts the requested object-center position into
a TCP target and performs hover, descent, release, and retreat.
The composite skill connects these operations.
These skills execute physical motions rather than directly setting
simulator object state.

#### A.3.2 Example 1: From Long Manipulation Code to Composite Skills

For task
"Pick the cream cheese and place it in the basket.", the initial
generated solution explicitly constructs segmentation, grasp generation,
trajectory planning, lift validation, transport, descent, and release.
Under the persistent shared revision, the generated task code instead
binds live object poses to the reusable manipulation skills:

- segment cream cheese and generate grasp poses
- plan\_grasp\_trajectory(...) and execute trajectory
- manually compute transport offset, descend, and release
+ cream\_key = match cream cheese from live object poses
+ basket\_pos = get\_sim\_object\_pose(basket\_key)[0]
+ target = basket\_pos + [0, 0, 0.12]
+ pick\_and\_place\_sim\_object(cream\_key, target, ...)

The persistent abstraction alone does not immediately complete the
task. Furthermore, feedback-driven rewrites introduce a trial-local recovery.
The composite manipulation skill is therefore persisted in the shared
system, whereas the push–regrasp recovery remains local to this trial.
This exposes two distinct adaptation time scales rather than a single
monolithic code update:

⬇

|

v

construct a tangential push direction

|

v

push object and verify XY displacement

|

v

grasp\_sim\_object(…)

|

v

place\_held\_sim\_object(…)

#### A.3.3 Example 2: Execution Abstraction without Spatial Grounding Success

For task instruction
"Pick the akita black bowl next to the ramekin and place it on the plate.",
both the initial and revised systems use simulator poses to identify the
bowl nearest to the ramekin.
The main persistent change is therefore the abstraction of the
subsequent manipulation:

select bowl nearest to ramekin using current XY distance
- segment bowl
- generate grasp poses
- plan\_grasp\_trajectory(...)
- manually lift, transport, descend, and release
+ target\_pos = plate\_pos + vertical clearance
+ pick\_and\_place\_sim\_object(bowl\_key, target\_pos, ...)

#### A.3.4 Filesystem Organization

The LIBERO-PRO workspace separates the persistent shared system,
outer-loop evolution evidence, and trial-local generated task code.

##### Persistent executable system.

The archived persistent revision modifies the task-generation interface,
API semantics, reusable skills, and launch logic:

M env\_configs/libero/franka\_libero\_robofoundry.yaml
M robofoundry/integrations/franka/libero\_reduced.py
M robofoundry/integrations/franka/libero\_harness.py
M robofoundry/utils/launch\_utils.py

##### Outer evolution evidence.

The .robofoundry/ branch is the filesystem realization of the
Evolution Ledger ℒ\mathcal{L} and stores evidence used by the outer evolution process. The curobo\_debug files are motion-planning debug artifacts:

⬇

+– .robofoundry/

| +– AGENTS.md

| +– bootstrap/{snapshot.json, summary.md}

| +– experience/

| | +– parent\_summary.json

| | +– parent/{manifest.json, evaluation/, validation/}

| +– libero\_pro\_feedback/{report.md, summary.json}

+– curobo\_debug/

+– \*.npz

+– \*.obj

##### Task-specific execution.

Generated task code and its feedback-driven revision history remain
inside the corresponding evaluation trial:

⬇

+– result.json

+– stdout.txt

+– stderr.txt

+– config.yaml

+– output/robofoundry/run/

+– trial\_index.json

+– trial\_01\_…/

+– trial\_manifest.json

+– code.py

+– summary.txt

+– motion\_debug.json

+– codegen\_trace/

+– initial/{prompt.txt, final/output.txt}

+– regen\_\*/{prompt.txt, final/output.txt}

The filesystem thus makes the two adaptation scopes explicit:
persistent shared evolution stores reusable execution abstractions in
the shared workspace, whereas trial-local recovery remains inside the
corresponding trial and revises generated task code from execution
feedback.

Table 5:
Main comparison on the EB-ALFRED high-level benchmark.
Avg. denotes the arithmetic mean over Base, Common Sense,
Complex Instruction, Visual, Spatial, and Long Horizon.
All results are reported in percentage (%).

|  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Method | Avg. | Base | Common Sense | Complex Instruction | Visual | Spatial | Long Horizon |
| RoboFoundry (GPT-6 Astra) | 90.0 | 92.0 | 92.0 | 92.0 | 86.0 | 94.0 | 84.0 |
| RoboFoundry (GPT-5.5) | 84.0 | 90.0 | 84.0 | 84.0 | 74.0 | 80.0 | 92.0 |
| RoboFoundry (Qwen3.7-Plus) | 81.3 | 88.0 | 90.0 | 72.0 | 74.0 | 82.0 | 82.0 |
| RoboFoundry (GLM5.3-Flash) | 80.0 | 82.0 | 76.0 | 82.0 | 80.0 | 74.0 | 86.0 |
| RoboFoundry (Qwen3.8-27B) | 78.0 | 82.0 | 84.0 | 82.0 | 72.0 | 68.0 | 80.0 |
| RoboFoundry-Lite (GPT-5.5) | 78.0 | 82.0 | 80.0 | 76.0 | 70.0 | 72.0 | 88.0 |
| RoboFoundry-Lite (Qwen3.7-Plus) | 75.0 | 76.0 | 80.0 | 82.0 | 74.0 | 62.0 | 76.0 |
| GPT-6 Astra | 87.3 | 92.0 | 92.0 | 92.0 | 80.0 | 88.0 | 80.0 |
| GPT-5.5 | 76.7 | 86.0 | 82.0 | 82.0 | 70.0 | 72.0 | 68.0 |
| Qwen3.7-Plus | 73.3 | 82.0 | 78.0 | 66.0 | 78.0 | 56.0 | 80.0 |
| GLM5.3-Flash | 71.7 | 76.0 | 76.0 | 76.0 | 70.0 | 62.0 | 70.0 |
| Claude-3.7-Sonnet | 67.7 | 68.0 | 68.0 | 70.0 | 68.0 | 62.0 | 70.0 |
| Qwen3.8-27B | 65.7 | 72.0 | 76.0 | 60.0 | 62.0 | 68.0 | 56.0 |
| Claude-3.5-Sonnet | 64.0 | 72.0 | 66.0 | 76.0 | 60.0 | 58.0 | 52.0 |
| GPT-4o | 56.3 | 64.0 | 54.0 | 68.0 | 46.0 | 52.0 | 54.0 |

Table 6:
Main comparison on the EB-Habitat high-level benchmark.
Avg. denotes the arithmetic mean over Base, Common Sense,
Complex Instruction, Visual, Spatial Relationship, and Long Horizon.
All results are reported in percentage (%).

|  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Method | Avg. | Base | Common Sense | Complex Instruction | Visual | Spatial | Long Horizon |
| RoboFoundry (GPT-5.5) | 88.7 | 100.0 | 78.0 | 80.0 | 86.0 | 100.0 | 88.0 |
| RoboFoundry (GPT-6 Astra) | 86.7 | 100.0 | 100.0 | 100.0 | 100.0 | 42.0 | 78.0 |
| RoboFoundry (Qwen3.7-Plus) | 80.3 | 100.0 | 80.0 | 92.0 | 88.0 | 48.0 | 74.0 |
| RoboFoundry (Qwen3.8-27B) | 77.0 | 100.0 | 58.0 | 80.0 | 80.0 | 94.0 | 50.0 |
| RoboFoundry (GLM5.3-Flash) | 75.0 | 100.0 | 58.0 | 66.0 | 80.0 | 94.0 | 52.0 |
| RoboFoundry-Lite (GPT-5.5) | 74.3 | 100.0 | 66.0 | 74.0 | 80.0 | 44.0 | 82.0 |
| RoboFoundry-Lite (Qwen3.7-Plus) | 72.0 | 98.0 | 66.0 | 82.0 | 80.0 | 42.0 | 64.0 |
| GPT-6 Astra | 75.3 | 88.0 | 84.0 | 86.0 | 82.0 | 38.0 | 74.0 |
| Claude-3.5-Sonnet | 68.0 | 96.0 | 68.0 | 78.0 | 70.0 | 38.0 | 58.0 |
| Qwen3.7-Plus | 65.0 | 92.0 | 58.0 | 76.0 | 74.0 | 34.0 | 56.0 |
| GPT-5.5 | 64.0 | 94.0 | 54.0 | 62.0 | 70.0 | 32.0 | 72.0 |
| GLM5.3-Flash | 60.7 | 94.0 | 54.0 | 54.0 | 64.0 | 34.0 | 64.0 |
| GPT-4o | 59.0 | 86.0 | 44.0 | 56.0 | 68.0 | 36.0 | 64.0 |
| Claude-3.7-Sonnet | 58.7 | 90.0 | 58.0 | 58.0 | 62.0 | 38.0 | 46.0 |
| Qwen3.8-27B | 58.0 | 96.0 | 46.0 | 48.0 | 60.0 | 36.0 | 62.0 |

Table 7:
Main comparison on the EB-Navigation benchmark.
Avg. denotes the arithmetic mean over Base, Common Sense,
Complex Instruction, Visual, and Long Horizon.
All results are reported in percentage (%).

|  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| Method | Avg. | Base | Common Sense | Complex Instruction | Visual | Long Horizon |
| RoboFoundry (GPT-6 Astra) | 80.3 | 90.0 | 85.0 | 86.7 | 73.3 | 66.7 |
| RoboFoundry (GLM5.3-Flash) | 72.7 | 80.0 | 71.7 | 78.3 | 73.3 | 60.0 |
| RoboFoundry (GPT-5.5) | 72.0 | 80.0 | 83.3 | 80.0 | 76.7 | 40.0 |
| RoboFoundry (Qwen3.7-Plus) | 72.0 | 78.3 | 83.3 | 65.0 | 66.7 | 66.7 |
| RoboFoundry-Lite (GPT-5.5) | 69.7 | 83.3 | 81.7 | 76.7 | 80.0 | 26.7 |
| RoboFoundry (Qwen3.8-27B) | 68.3 | 76.7 | 85.0 | 73.3 | 63.3 | 43.3 |
| RoboFoundry-Lite (Qwen3.7-Plus) | 68.0 | 78.3 | 76.7 | 68.3 | 63.3 | 53.3 |
| GPT-6 Astra | 77.0 | 86.7 | 83.3 | 83.3 | 71.7 | 60.0 |
| GLM5.3-Flash | 71.0 | 80.0 | 73.3 | 80.0 | 66.7 | 55.0 |
| Qwen3.7-Plus | 64.3 | 75.0 | 73.3 | 63.3 | 60.0 | 50.0 |
| GPT-4o | 57.7 | 55.0 | 60.0 | 58.3 | 60.0 | 55.0 |
| GPT-5.5 | 54.7 | 68.3 | 66.7 | 61.7 | 65.0 | 11.7 |
| Qwen3.8-27B | 52.3 | 41.7 | 66.7 | 60.0 | 53.3 | 40.0 |
| Claude-3.7-Sonnet | 45.0 | 50.0 | 61.7 | 50.0 | 36.7 | 26.7 |
| Claude-3.5-Sonnet | 44.7 | 66.7 | 51.7 | 41.7 | 36.7 | 26.7 |

Table 8:
Main comparison on the EB-Manipulation benchmark.
Avg. denotes the success rate over all 228 tasks.
All results are reported in percentage (%).

|  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- |
| Method | Avg. | Base | Common Sense | Complex Instruction | Visual | Spatial |
| RoboFoundry (GPT-6 Astra) | 54.8 | 58.3 | 62.5 | 56.3 | 55.6 | 41.7 |
| RoboFoundry (GLM5.3-Flash) | 49.6 | 56.3 | 45.8 | 56.3 | 47.2 | 41.7 |
| RoboFoundry (Qwen3.7-Plus) | 47.8 | 43.8 | 54.2 | 52.1 | 44.4 | 43.8 |
| RoboFoundry (GPT-5.5) | 46.1 | 54.2 | 47.9 | 43.8 | 41.7 | 41.7 |
| RoboFoundry (Qwen3.8-27B) | 42.5 | 35.4 | 41.7 | 43.8 | 47.2 | 45.8 |
| RoboFoundry-Lite (GPT-5.5) | 39.5 | 43.8 | 37.5 | 31.3 | 47.2 | 39.6 |
| RoboFoundry-Lite (Qwen3.7-Plus) | 37.3 | 33.3 | 41.7 | 31.3 | 44.4 | 37.5 |
| GPT-6 Astra | 48.2 | 56.3 | 58.3 | 47.9 | 44.4 | 33.3 |
| GLM5.3-Flash | 43.0 | 41.7 | 41.7 | 33.3 | 72.2 | 33.3 |
| Qwen3.7-Plus | 36.0 | 35.4 | 35.4 | 27.1 | 61.1 | 27.1 |
| Qwen3.8-27B | 32.0 | 31.3 | 31.3 | 22.9 | 58.3 | 22.9 |
| GPT-5.5 | 30.7 | 29.2 | 29.2 | 22.9 | 58.3 | 20.8 |
| GPT-4o | 28.9 | 39.6 | 29.2 | 29.2 | 19.4 | 25.0 |
| Claude-3.7-Sonnet | 28.5 | 31.3 | 20.8 | 43.8 | 25.0 | 20.8 |
| Claude-3.5-Sonnet | 25.4 | 37.5 | 16.7 | 29.2 | 19.4 | 22.9 |

Table 9:
Overall comparison on EmbodiedBench (16K).
Avg. is the arithmetic mean of success rates across the four suites.
All results are reported in percentage (%).
Gains are reported in percentage points (+pp).

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Method | Avg. | EB- ALFRED | EB- Habitat | EB- Navigation | EB- Manipulation |
| RoboFoundry (GPT-5.5) | 71.7+8.3 | 82.3+3.3 | 81.3+12.3 | 75.7+8.4 | 47.3+9.0 |
| RoboFoundry (Qwen3.7-Plus) | 70.4+5.8 | 82.5+2.8 | 79.3+5.6 | 71.8+1.0 | 47.8+13.7 |
| RoboFoundry (Qwen3.8 27B) | 69.4+5.1 | 79.7+3.4 | 79.3+8.0 | 75.0+6.0 | 43.7+3.0 |
| RoboFoundry (GLM5.3-Flash) | 68.8+7.6 | 80.0+5.7 | 72.0+5.3 | 77.7+8.7 | 45.5+10.5 |
| Qwen3.7-Plus | 64.6 | 79.7 | 73.7 | 70.8 | 34.1 |
| Qwen3.8-27B | 64.3 | 76.3 | 71.3 | 69.0 | 40.7 |
| GPT-5.5 | 63.4 | 79.0 | 69.0 | 67.3 | 38.3 |
| GLM5.3-Flash | 61.3 | 74.3 | 66.7 | 69.0 | 35.0 |

Table 10: Task-wise LIBERO-PRO performance on the libero-object
benchmark. Each entry reports position/task success rate in percentage (%). †\dagger
denotes the use of privileged simulator object poses. Results for OpenVLA, π0\pi\_{0}, π0.5\pi\_{0.5}, and CaP-Agent0 are taken
directly from the CaP-Agent0 report [[Fu et al., 2026](#bib.bib10)].

|  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Task (Symbolic Form) | OpenVLA | | 𝝅𝟎\bm{\pi\_{0}} | | 𝝅0.5\bm{\pi\_{0.5}} | | CaP-Agent0 | | RoboFoundry | | RoboFoundry† | |
|  | Pos | Task | Pos | Task | Pos | Task | Pos | Task | Pos | Task | Pos | Task |
| Place⁡(alphabet\_soup,basket)\operatorname{Place}(\texttt{alphabet\\_soup},\texttt{basket}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 2.0 | 4.0 | 98.0 | 99.0 | 100.0 | 100.0 |
| Place⁡(bbq\_sauce,basket)\operatorname{Place}(\texttt{bbq\\_sauce},\texttt{basket}) | 0.0 | 0.0 | 0.0 | 0.0 | 100.0 | 2.0 | 12.0 | 42.0 | 97.0 | 93.0 | 100.0 | 100.0 |
| Place⁡(butter,basket)\operatorname{Place}(\texttt{butter},\texttt{basket}) | 0.0 | 0.0 | 0.0 | 0.0 | 54.0 | 0.0 | 26.0 | 18.0 | 97.0 | 99.0 | 100.0 | 100.0 |
| Place⁡(chocolate\_pudding,basket)\operatorname{Place}(\texttt{chocolate\\_pudding},\texttt{basket}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 2.0 | 18.0 | 48.0 | 88.0 | 93.0 | 100.0 | 100.0 |
| Place⁡(cream\_cheese,basket)\operatorname{Place}(\texttt{cream\\_cheese},\texttt{basket}) | 0.0 | 0.0 | 10.0 | 0.0 | 0.0 | 0.0 | 12.0 | 6.0 | 98.0 | 99.0 | 100.0 | 100.0 |
| Place⁡(ketchup,basket)\operatorname{Place}(\texttt{ketchup},\texttt{basket}) | 0.0 | 0.0 | 0.0 | 0.0 | 20.0 | 2.0 | 32.0 | 12.0 | 96.0 | 100.0 | 90.0 | 100.0 |
| Place⁡(milk,basket)\operatorname{Place}(\texttt{milk},\texttt{basket}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 38.0 | 2.0 | 98.0 | 98.0 | 100.0 | 100.0 |
| Place⁡(orange\_juice,basket)\operatorname{Place}(\texttt{orange\\_juice},\texttt{basket}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 2.0 | 30.0 | 2.0 | 100.0 | 100.0 | 100.0 | 100.0 |
| Place⁡(salad\_dressing,basket)\operatorname{Place}(\texttt{salad\\_dressing},\texttt{basket}) | 0.0 | 0.0 | 10.0 | 0.0 | 0.0 | 0.0 | 32.0 | 0.0 | 100.0 | 99.0 | 100.0 | 100.0 |
| Place⁡(tomato\_sauce,basket)\operatorname{Place}(\texttt{tomato\\_sauce},\texttt{basket}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 16.0 | 48.0 | 88.0 | 100.0 | 100.0 | 100.0 |
| Average | 0.0 | 0.0 | 0.0 | 0.0 | 17.0 | 1.0 | 21.8 | 18.2 | 96.0 | 98.0 | 99.0 | 100.0 |

Table 11: Task-wise LIBERO-PRO performance on the libero-goal
benchmark. Each entry reports position/task success rate in percentage (%).
†\dagger denotes the use of privileged simulator object poses.
Results for OpenVLA, π0\pi\_{0}, π0.5\pi\_{0.5}, and CaP-Agent0 are taken
directly from the CaP-Agent0 report [[Fu et al., 2026](#bib.bib10)].

|  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Task (Symbolic Form) | OpenVLA | | 𝝅𝟎\bm{\pi\_{0}} | | 𝝅0.5\bm{\pi\_{0.5}} | | CaP-Agent0 | | RoboFoundry | | RoboFoundry† | |
|  | Pos | Task | Pos | Task | Pos | Task | Pos | Task | Pos | Task | Pos | Task |
| Open⁡(cabinet,drawer\_mid)\operatorname{Open}(\texttt{cabinet},\texttt{drawer\\_mid}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 4.0 | 0.0 | 0.0 | 71.0 | 71.0 | 95.0 | 100.0 |
| Put⁡(bowl,drawer\_top)\operatorname{Put}(\texttt{bowl},\texttt{drawer\\_top}) | 0.0 | 0.0 | 0.0 | 0.0 | 94.0 | 2.0 | 4.0 | 0.0 | 90.0 | 71.0 | 95.0 | 100.0 |
| Push⁡(plate,stove\_front)\operatorname{Push}(\texttt{plate},\texttt{stove\\_front}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 10.0 | 71.0 | 70.0 | 95.0 | 100.0 |
| Put⁡(bowl,plate)\operatorname{Put}(\texttt{bowl},\texttt{plate}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 2.0 | 36.0 | 38.0 | 90.0 | 97.0 | 100.0 | 100.0 |
| Put⁡(bowl,stove)\operatorname{Put}(\texttt{bowl},\texttt{stove}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 4.0 | 22.0 | 12.0 | 99.0 | 100.0 | 95.0 | 100.0 |
| Put⁡(bowl,cabinet\_top)\operatorname{Put}(\texttt{bowl},\texttt{cabinet\\_top}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 2.0 | 60.0 | 4.0 | 100.0 | 99.0 | 99.0 | 100.0 |
| Put⁡(cream\_cheese,bowl)\operatorname{Put}(\texttt{cream\\_cheese},\texttt{bowl}) | 0.0 | 0.0 | 0.0 | 0.0 | 98.0 | 2.0 | 4.0 | 34.0 | 98.0 | 90.0 | 94.0 | 100.0 |
| Put⁡(wine\_bottle,rack)\operatorname{Put}(\texttt{wine\\_bottle},\texttt{rack}) | 0.0 | 0.0 | 0.0 | 0.0 | 88.0 | 2.0 | 2.0 | 12.0 | 71.0 | 70.0 | 94.0 | 100.0 |
| Put⁡(wine\_bottle,cabinet\_top)\operatorname{Put}(\texttt{wine\\_bottle},\texttt{cabinet\\_top}) | 0.0 | 0.0 | 0.0 | 0.0 | 98.0 | 2.0 | 62.0 | 40.0 | 95.0 | 95.0 | 94.0 | 100.0 |
| TurnOn⁡(stove)\operatorname{TurnOn}(\texttt{stove}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 66.0 | 18.0 | 95.0 | 97.0 | 99.0 | 100.0 |
| Average | 0.0 | 0.0 | 0.0 | 0.0 | 38.0 | 0.0 | 25.6 | 16.8 | 88.0 | 86.0 | 96.0 | 100.0 |

Table 12: Task-wise LIBERO-PRO performance on the libero-spatial
benchmark. Each entry reports position/task success rate in percentage (%). †\dagger
denotes the use of privileged simulator object poses. Results for OpenVLA, π0\pi\_{0}, π0.5\pi\_{0.5}, and CaP-Agent0 are taken
directly from the CaP-Agent0 report [[Fu et al., 2026](#bib.bib10)].

|  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Task (Symbolic Form) | OpenVLA | | 𝝅𝟎\bm{\pi\_{0}} | | 𝝅0.5\bm{\pi\_{0.5}} | | CaP-Agent0 | | RoboFoundry | | RoboFoundry† | |
|  | Pos | Task | Pos | Task | Pos | Task | Pos | Task | Pos | Task | Pos | Task |
| Pick⁡(between⁡(plate,ramekin),plate)\operatorname{Pick}(\operatorname{between}(\texttt{plate},\texttt{ramekin}),\texttt{plate}) | 0.0 | 0.0 | 0.0 | 0.0 | 2.0 | 0.0 | 22.0 | 14.0 | 98.0 | 88.0 | 100.0 | 100.0 |
| Pick⁡(table\_center,plate)\operatorname{Pick}(\texttt{table\\_center},\texttt{plate}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 2.0 | 22.0 | 14.0 | 89.0 | 99.0 | 100.0 | 100.0 |
| Pick⁡(drawer​\_​top⁡(cabinet\_wood),plate)\operatorname{Pick}(\operatorname{drawer\\_top}(\texttt{cabinet\\_wood}),\texttt{plate}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 2.0 | 10.0 | 88.0 | 96.0 | 99.0 | 98.0 |
| Pick⁡(next​\_​to⁡(cookie\_box),plate)\operatorname{Pick}(\operatorname{next\\_to}(\texttt{cookie\\_box}),\texttt{plate}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 2.0 | 0.0 | 10.0 | 97.0 | 96.0 | 100.0 | 98.0 |
| Pick⁡(next​\_​to⁡(plate),plate)\operatorname{Pick}(\operatorname{next\\_to}(\texttt{plate}),\texttt{plate}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 10.0 | 20.0 | 97.0 | 88.0 | 100.0 | 98.0 |
| Pick⁡(next​\_​to⁡(ramekin),plate)\operatorname{Pick}(\operatorname{next\\_to}(\texttt{ramekin}),\texttt{plate}) | 0.0 | 0.0 | 0.0 | 0.0 | 12.0 | 2.0 | 30.0 | 14.0 | 89.0 | 96.0 | 85.0 | 100.0 |
| Pick⁡(on⁡(cookie\_box),plate)\operatorname{Pick}(\operatorname{on}(\texttt{cookie\\_box}),\texttt{plate}) | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 0.0 | 14.0 | 8.0 | 88.0 | 88.0 | 98.0 | 100.0 |
| Pick⁡(on⁡(ramekin),plate)\operatorname{Pick}(\operatorname{on}(\texttt{ramekin}),\texttt{plate}) | 0.0 | 0.0 | 0.0 | 0.0 | 98.0 | 2.0 | 2.0 | 20.0 | 98.0 | 88.0 | 99.0 | 100.0 |
| Pick⁡(on⁡(stove),plate)\operatorname{Pick}(\operatorname{on}(\texttt{stove}),\texttt{plate}) | 0.0 | 0.0 | 0.0 | 0.0 | 2.0 | 0.0 | 8.0 | 14.0 | 88.0 | 88.0 | 100.0 | 100.0 |
| Pick⁡(on⁡(cabinet\_wood),plate)\operatorname{Pick}(\operatorname{on}(\texttt{cabinet\\_wood}),\texttt{plate}) | 0.0 | 0.0 | 0.0 | 0.0 | 90.0 | 0.0 | 8.0 | 16.0 | 88.0 | 88.0 | 99.0 | 98.0 |
| Average | 0.0 | 0.0 | 0.0 | 0.0 | 20.0 | 1.0 | 11.8 | 14.0 | 92.0 | 91.5 | 98.0 | 99.2 |

Experimental support, please
[view the build logs](./2609.32862v1/__stdout.txt)
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
