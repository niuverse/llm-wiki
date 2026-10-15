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

[Back to Abstract](/abs/2609.27612v1 "Back to abstract page")

[Download PDF](/pdf/2609.27612v1 "Download PDF")

1. [Abstract](#abstract1 "In RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
2. [1 Introduction](#S1 "In RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
3. [2 Problem Formulation](#S2 "In RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   1. [Scope of the notation.](#S2.SS0.SSS0.Px1 "In 2 Problem Formulation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
4. [3 Design Principles and Threat Model](#S3 "In RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   1. [Explicit authorities.](#S3.SS0.SSS0.Px1 "In 3 Design Principles and Threat Model ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   2. [Physical skills are not ordinary software tools.](#S3.SS0.SSS0.Px2 "In 3 Design Principles and Threat Model ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   3. [Fail closed under missing evidence.](#S3.SS0.SSS0.Px3 "In 3 Design Principles and Threat Model ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   4. [Bound every autonomous loop.](#S3.SS0.SSS0.Px4 "In 3 Design Principles and Threat Model ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
5. [4 RegenHarness Architecture](#S4 "In RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   1. [4.1 Model and Agent Loops](#S4.SS1 "In 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      1. [Model loop: context to proposal.](#S4.SS1.SSS0.Px1 "In 4.1 Model and Agent Loops ‣ 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      2. [Agent loop: proposal to verified progress.](#S4.SS1.SSS0.Px2 "In 4.1 Model and Agent Loops ‣ 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      3. [Coupling through context and authority.](#S4.SS1.SSS0.Px3 "In 4.1 Model and Agent Loops ‣ 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   2. [4.2 Typed Effects and Task Contracts](#S4.SS2 "In 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   3. [4.3 Capability Cards and Routing](#S4.SS3 "In 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      1. [Optional world-model support.](#S4.SS3.SSS0.Px1 "In 4.3 Capability Cards and Routing ‣ 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   4. [4.4 Role-Isolated Contexts](#S4.SS4 "In 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   5. [4.5 Supervised Skill Lifecycle](#S4.SS5 "In 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   6. [4.6 Evidence, Verification, and Commit](#S4.SS6 "In 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   7. [4.7 Budgeted Recovery](#S4.SS7 "In 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   8. [4.8 Trusted Memory and Event Sourcing](#S4.SS8 "In 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   9. [4.9 Evidence-Gated Recursive Self-Improvement](#S4.SS9 "In 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      1. [From execution records to candidate revisions.](#S4.SS9.SSS0.Px1 "In 4.9 Evidence-Gated Recursive Self-Improvement ‣ 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      2. [Evaluation before release.](#S4.SS9.SSS0.Px2 "In 4.9 Evidence-Gated Recursive Self-Improvement ‣ 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      3. [Versioned rollout and recursion.](#S4.SS9.SSS0.Px3 "In 4.9 Evidence-Gated Recursive Self-Improvement ‣ 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   10. [4.10 Safety and Resource Authority](#S4.SS10 "In 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
6. [5 Implementation](#S5 "In RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
7. [6 Experimental Evaluation](#S6 "In RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   1. [6.1 Experimental Setup and Robot Platform](#S6.SS1 "In 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      1. [Platform and recorded tasks.](#S6.SS1.SSS0.Px1 "In 6.1 Experimental Setup and Robot Platform ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   2. [6.2 Voice-Triggered Warehouse Inspection](#S6.SS2 "In 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      1. [Command and navigation.](#S6.SS2.SSS0.Px1 "In 6.2 Voice-Triggered Warehouse Inspection ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      2. [Observation and visual analysis.](#S6.SS2.SSS0.Px2 "In 6.2 Voice-Triggered Warehouse Inspection ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      3. [Delivery, return, and user feedback.](#S6.SS2.SSS0.Px3 "In 6.2 Voice-Triggered Warehouse Inspection ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      4. [Linking the stages.](#S6.SS2.SSS0.Px4 "In 6.2 Voice-Triggered Warehouse Inspection ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      5. [End-to-end mission results.](#S6.SS2.SSS0.Px5 "In 6.2 Voice-Triggered Warehouse Inspection ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      6. [Cross-stage evidence links.](#S6.SS2.SSS0.Px6 "In 6.2 Voice-Triggered Warehouse Inspection ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   3. [6.3 Exploration with VLM + omni\_planner](#S6.SS3 "In 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      1. [Visual goal selection.](#S6.SS3.SSS0.Px1 "In 6.3 Exploration with VLM + omni_planner ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      2. [Local planner.](#S6.SS3.SSS0.Px2 "In 6.3 Exploration with VLM + omni_planner ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      3. [Feedback.](#S6.SS3.SSS0.Px3 "In 6.3 Exploration with VLM + omni_planner ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      4. [Mapping result.](#S6.SS3.SSS0.Px4 "In 6.3 Exploration with VLM + omni_planner ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   4. [6.4 Site Map and Semantic Anchors](#S6.SS4 "In 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   5. [6.5 Navigation Results](#S6.SS5 "In 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      1. [Metrics.](#S6.SS5.SSS0.Px1 "In 6.5 Navigation Results ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
      2. [Execution results.](#S6.SS5.SSS0.Px2 "In 6.5 Navigation Results ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   6. [6.6 Closed-Route Completion Case](#S6.SS6 "In 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   7. [6.7 Supplementary Text-Driven Camera Task](#S6.SS7 "In 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   8. [6.8 Harness and RSI Evaluation Protocol](#S6.SS8 "In 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
8. [7 Related Work](#S7 "In RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   1. [Agent loops and harnesses.](#S7.SS0.SSS0.Px1 "In 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   2. [Guarded execution.](#S7.SS0.SSS0.Px2 "In 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   3. [World models and diagnosis.](#S7.SS0.SSS0.Px3 "In 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   4. [Language-guided robot planning.](#S7.SS0.SSS0.Px4 "In 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   5. [Failure diagnosis and recovery.](#S7.SS0.SSS0.Px5 "In 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   6. [Evaluating recovery rather than nominal success.](#S7.SS0.SSS0.Px6 "In 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   7. [Visuomotor policies.](#S7.SS0.SSS0.Px7 "In 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   8. [Embodied runtimes and memory.](#S7.SS0.SSS0.Px8 "In 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
   9. [Robot middleware and task execution.](#S7.SS0.SSS0.Px9 "In 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
9. [8 Conclusion](#S8 "In RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
10. [References](#bib "In RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")

[License: arXiv.org perpetual non-exclusive license](https://info.arxiv.org/help/license/index.html#licenses-available)

arXiv:2609.27612v1 [cs.RO] 23 Sep 2026

# RegenHarness: A Robot Agent Harness with Evidence-Gated Recursive Self-Improvement

Kailin Wang  Haoxiang Jie  Yaoyuan Yan  Zhiyou Heng  Zhaosong Li
Affiliation: AI Lab, Country Garden Services Group
Affiliation: School of Mechanical Science and Engineering, Huazhong University of Science and Technology
Affiliation: Omni AI
Email: mailto:wangkailin417@gmail.comwangkailin417@gmail.commailto:jiehaoxiang@bgyfw.comjiehaoxiang@bgyfw.com

###### Abstract

Long-horizon robot execution requires a clear distinction between a model’s
proposal, a controller’s termination, and verified task completion. We present
RegenHarness, an evidence-gated robot-agent harness connecting task planning to
heterogeneous robot skills. Its execution architecture couples a model loop
for context-conditioned proposals with an agent loop for dispatch, observation,
verification, commitment, and bounded recovery. Four role-isolated contexts
separate planning, supervision, verification, and recovery inputs. Versioned
memory distinguishes observed facts from accepted task progress, while an
identity- and version-bound commit gate controls updates to trusted task state.
The runtime combines duplicate-dispatch control, resource leases, and recovery
budgets under explicit backend contracts, and checks the original user goal
before reporting completion. To our knowledge, we are the first to introduce
an evidence-gated recursive self-improvement (RSI) protocol for embodied
robotic agents. Across missions, execution records motivate
candidate changes to context rules, task templates, routing, and recovery
policies; fixed regression checks and release authorization govern their
acceptance; versioned rollout and rollback preserve configuration traceability.
This RSI protocol revises the harness configuration without online model-weight
updates or permission to weaken the commit gate. A real quadruped deployment
documents voice-triggered warehouse navigation, panoramic inspection, visual
analysis, message delivery, return, and spoken reporting through linked audio,
images, trajectories, and receipts. A separate circuit demonstrates why
completion depends on execution history rather than endpoint proximity alone.
Together, the cases demonstrate integrated perception, physical execution,
communication, and history-dependent completion in real-world robot tasks.

Keywords: Robot agent harness; evidence-gated execution;
recursive self-improvement (RSI); model and agent loops; role-isolated context;
verifiable task completion; real-world robot deployment.

## 1 Introduction

Modern robot systems can draw on broad language reasoning, generalist
vision-language-action (VLA) policies, persistent spatial representations, learned world
models, task-and-motion planning (TAMP), and mature navigation and control stacks. This
expanding capability pool changes the central systems question. Rather than asking one
model to produce every motor command, a long-horizon robot agent must decide which
capability to invoke, ground that invocation in the current world, observe its progress,
determine whether its intended effect occurred, and recover when it did not.

Here a *skill* is a bounded operation such as navigating to a named place or
capturing an image. A *provider* (also called a backend) is the model,
controller, or service implementing that operation. A *harness* is the runtime
around these providers: it decides what may be invoked, tracks execution, and
determines what counts as accepted progress. It is neither the language model
itself nor a replacement for the robot’s low-level control stack.

Our starting point is HROS (Harness Robotic OS) [[24](#bib.bib1)], our previously implemented
robot operating system and inspection application. RegenHarness targets an upgrade
of HROS’s agent harness, motivated by its deployment experience. HROS supplies
the application setting; RegenHarness specifies reusable execution contracts and
authority boundaries. For example, “inspect the storage area and return”
requires navigation, observations, analysis, and reporting. Reaching the storage
waypoint proves only one of those stages, not the complete user request.

Reasoning–acting methods such as ReAct interleave model reasoning with environmental
interaction [[25](#bib.bib12)]. Agent engineering also emphasizes feedback-driven tool
use and stopping conditions [[2](#bib.bib13)], while harness engineering makes
state, tool execution, and orchestration explicit responsibilities outside the
model [[20](#bib.bib14), [8](#bib.bib15), [18](#bib.bib16)]. For robots, this distinction raises an additional
question: what authorizes the transition from a model’s proposed progress to accepted
physical task progress? We use *model loop* and *agent loop* to distinguish
inference-level proposal generation from the runtime process that acts on and verifies
those proposals, rather than to claim that iterative agent execution is itself new.

This problem becomes acute as task length grows. For a fixed sequence of NN necessary
stages, let pip\_{i} be the probability of stage ii succeeding conditional on all preceding
stages having succeeded. The probability that all stages succeed is then

|  |  |  |  |
| --- | --- | --- | --- |
|  | P⁡(all stages succeed)=∏i=1Npi.P(\text{all stages succeed})=\prod\_{i=1}^{N}p\_{i}. |  | (1) |

This chain-rule identity requires no independence assumption. Recovery can change the
conditional outcomes and the execution path.
Long-horizon reliability therefore cannot come only from increasing the quality of a local
policy. The system must also detect failed transitions, preserve useful intermediate
state, select an appropriate fallback, and prevent an early false-positive completion from
corrupting every downstream decision.

Recent systems already organize skills, memory, and verification within embodied
runtimes [[28](#bib.bib4), [15](#bib.bib5)]. EmbodiedSkills checks skill proposals
before execution and outcomes afterward [[23](#bib.bib19)]; CommitFlow gates
dependent actions on physical conditions and rechecks them after local
correction [[27](#bib.bib20)]. Thus, neither an execution loop nor verification
alone is unique to RegenHarness. Our focus is their runtime contract: (i) which component
may change trusted task state; (ii) which evidence may flow to the planner, skill,
verifier, and recovery policy; and (iii) how accepted progress and recovery expenditure
can be reconstructed from durable, identity- and version-bound records.

We introduce RegenHarness, an evidence-gated robot-agent harness centered on these authority and
state-transition boundaries. The key abstraction is a versioned skill invocation
bound to explicit preconditions, target
effects, resource requirements, evidence requirements, cancellation semantics, and a
recovery policy. RegenHarness uses the same abstraction for a learned VLA, a navigation action,
a TAMP solver, a world-model-assisted policy, or a conventional controller.
A cross-mission recursive self-improvement (RSI) loop uses execution records
to revise the harness configuration under fixed acceptance checks, without
changing active missions or weakening their verification and safety gates.

The paper makes five system contributions:

1. 1.

   Evidence-gated agent-loop control. We distinguish model proposals,
   controller termination, and accepted task progress. Only independently verified
   outcomes may advance committed task state.
2. 2.

   Role-isolated context compilation. The compiler builds four bounded
   views from shared versioned memory: planner (C1), skill (C2), verifier (C3), and recovery
   (C4). In particular, the verifier does not inherit the planner’s completion claim.
3. 3.

   Policy-neutral supervised execution and recovery. Capability cards,
   idempotent dispatch, leases, timeouts, cancellation, and typed, budgeted recovery
   compose heterogeneous backends without granting them global-success authority.
4. 4.

   Event-sourced auditability. Version-bound observations, invocations,
   evidence, verdicts, commits, and recovery costs support deterministic inspection
   and restart-oriented recovery.
5. 5.

   Evidence-gated cross-mission self-improvement. To our knowledge,
   we are the first to introduce an evidence-gated recursive self-improvement
   (RSI) protocol for embodied robotic agents. It uses trace-driven configuration revision,
   fixed acceptance checks, mission-boundary release, and versioned rollback.

## 2 Problem Formulation

We consider a robot receiving a long-horizon goal gg under partial observability. The
robot has access to a set of heterogeneous skill providers Π={π1,…,πK}\Pi=\{\pi\_{1},\ldots,\pi\_{K}\}.
A provider may be a learned visuomotor policy, navigation stack, TAMP system, perception
model, remote service, or deterministic controller. Providers differ in embodiments,
observation and action spaces, latency, risk, failure modes, and available feedback.

The harness compiles gg into a task contract

|  |  |  |  |
| --- | --- | --- | --- |
|  | 𝒯=(g,𝒢,𝒞g,𝒮,ℛ),\mathcal{T}=(g,\mathcal{G},\mathcal{C}\_{g},\mathcal{S},\mathcal{R}), |  | (2) |

where 𝒢\mathcal{G} is an acyclic dependency graph of subgoals, 𝒞g\mathcal{C}\_{g} is the set of
original completion conditions, 𝒮\mathcal{S} contains safety and resource constraints, and
ℛ\mathcal{R} defines recovery budgets. Each node v∈𝒢v\in\mathcal{G} declares one or more
target effects EvE\_{v}, eligible capability classes, dependencies, and evidence requirements.

#### Scope of the notation.

A task is the complete user request; a node is one dependency-constrained stage;
an invocation is one attempt to execute a node with a particular provider.
Retries can create new invocations without changing the node’s intended effect.
A node is eligible only when its required dependencies have been accepted.
The integer kk below is a logical state version, not elapsed time, distance,
or a model-training iteration.

At state version kk, the system maintains two fact sets. OkO\_{k} contains recent observed
facts whose provenance and freshness are known but whose task meaning may be unverified.
CkC\_{k} contains committed facts admitted by the verification path. A *commit*
means accepting a checked result into the authoritative task record, not issuing
a motion command. For example, a pose sample belongs to OkO\_{k}; the accepted
statement that the current navigation node reached its specified target belongs
to CkC\_{k}. “Committed” describes acceptance by the configured checks, not a
guarantee that sensors or verifiers are infallible. A skill invocation may
read from an authorized context derived from (Ok,Ck)(O\_{k},C\_{k}), but it cannot write Ck+1C\_{k+1}
directly. Instead, execution produces an evidence packet ZkZ\_{k} and a proposed
fact update Δ^k\widehat{\Delta}\_{k}. The verdict vocabulary distinguishes
*satisfied*, *violated*, *ambiguous*, *stale*, or
*unsafe*.
Satisfied means the declared conditions passed; violated means
a condition failed; ambiguous means the evidence cannot decide;
stale means it is no longer valid for the decision; and unsafe
denotes a safety rejection. The reference predicate verifier returns the first
three; freshness, identity, and safety checks additionally gate acceptance.
Only a satisfied verdict with matching task, node, invocation, and state-version
identities may advance committed facts. Other outcomes do not accept the proposed
facts, although recording an observation, rejection, or recovery expenditure can
still advance the overall state version.

Our objective is not to optimize a specific policy. It is to maximize verified task
completion while minimizing false completion, unsafe actions, unrecoverable loops, resource
conflicts, and irreproducible decisions under a fixed pool of perception and action
capabilities.

## 3 Design Principles and Threat Model

The failures considered here are erroneous completion claims, stale or misbound
evidence, repeated requests, concurrent resource use, and interrupted execution.
The harness is intended to contain these runtime failures, not to prove correctness
against compromised sensors, malicious hardware, or arbitrary verifier defects.

#### Explicit authorities.

Planning, prediction, and execution do not confer authority to verify, commit,
or override safety. A planner can propose a skill; a skill can report progress or terminal status;
a world model can predict likely effects; none of them can alone certify that a physical
goal has been achieved. A safety veto is monotonic: later components cannot relax it.

#### Physical skills are not ordinary software tools.

A function return usually marks the end of computation. For a physical skill, a return can
mean that a command was accepted, a trajectory was generated, or a controller stopped. It
does not necessarily mean that the intended object relation, robot pose, or human-facing
outcome now holds. The harness must therefore model asynchronous progress, cancellation,
quiescence, physical evidence, and side effects.

#### Fail closed under missing evidence.

Missing evidence, a missing verifier, stale context, or unresolved predicates must not be
coerced into success. Ambiguity is a first-class outcome that commonly triggers active
re-perception instead of task-state advancement.

#### Bound every autonomous loop.

Every retry, view change, policy switch, or replanning action consumes an explicit budget. This
prevents a capable planner from creating an unbounded physical loop and makes escalation to
a human or safe stop inspectable.

## 4 RegenHarness Architecture

![Refer to caption](2609.27612v1/fig01_architecture.png)

Figure 1: RegenHarness architecture and execution authority. Versioned memory supplies
role-isolated contexts for planning (C1), supervision (C2), verification (C3), and
recovery (C4). Only the identity- and version-bound commit gate accepts task progress.
Blue paths carry execution and context; green paths carry accepted progress;
amber paths denote bounded recovery. Interchangeable providers remain outside
task-state commit authority.

### 4.1 Model and Agent Loops

We distinguish two coupled loops by their outputs and authority, not by requiring
separate models or fixed execution frequencies. The *model loop* refers here to
inference-time proposal generation and revision as context and feedback change; it is
not a model-training loop or a world-model rollout. The *agent loop* is the
task-level process that selects, executes, verifies, and commits physical work.
The harness implements the state, interfaces, and guards connecting these loops.

#### Model loop: context to proposal.

For runtime state SkS\_{k} and role rr, a model-backed component consumes a compiled
context and emits a proposal:

|  |  |  |  |
| --- | --- | --- | --- |
|  | ck(r)=κr​(Sk),uk(r)=Mθr​(ck(r)).c\_{k}^{(r)}=\kappa\_{r}(S\_{k}),\qquad u\_{k}^{(r)}=M\_{\theta\_{r}}(c\_{k}^{(r)}). |  | (3) |

Here SkS\_{k} includes node states, observed and committed facts, evidence references,
and remaining budgets. The role rr is planning, supervision, verification, or
recovery; κr\kappa\_{r} selects its permitted input fields, ck(r)c\_{k}^{(r)} is that input,
and MθrM\_{\theta\_{r}} is a model with parameters θr\theta\_{r}. Its output uk(r)u\_{k}^{(r)}
may be a subgoal, skill selection, or recovery suggestion. Not every role requires
a model: a predicate verifier is a valid deterministic implementation.
On a later invocation, refreshed observations,
verified progress, or failure evidence can change the proposal without changing model
weights θr\theta\_{r}. A provider may implement additional internal inference steps, but
the harness does not assume access to hidden reasoning or require a universal internal
loop. A deterministic planner or controller can occupy the same interface. Neither
additional reasoning nor a model’s declaration of success directly updates committed
task facts.

#### Agent loop: proposal to verified progress.

At the task level, C1 selects the next eligible node and provider, C2 supplies the
execution context, and the supervisor dispatches and polls the skill. C3 evaluates
postconditions using execution evidence. The commit gate admits only a valid,
identity- and version-matched result; failed or uncertain outcomes enter C4 for
budgeted recovery or escalation. Accepted progress is written back before subsequent
contexts are compiled. All required nodes being committed triggers an original-goal
check rather than immediate completion. Thus, tool return, node acceptance, and
task completion are distinct stopping conditions.

#### Coupling through context and authority.

Figure [1](#S4.F1 "Figure 1 ‣ 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement") makes the coupling concrete: the central compiler delivers
bounded role views, while execution, verification, commitment, and recovery form the
outer task loop. The loops are not synchronized one-for-one: a long-running skill may
need many controller updates and runtime polls between planning decisions. Their
shared interface is the versioned task and evidence contract, not a transcript treated
as trusted state. This is the scope of our embodied harness design: models may revise
proposals, but only the guarded agent loop may accept physical task progress.

### 4.2 Typed Effects and Task Contracts

An effect is a task-relevant change that can be predicted, observed, and tested. It may be
symbolic (held(cup)), metric (the base lies within a pose tolerance), relational
(inside(cup,drawer)), visual (a target mask or keypoint configuration), or temporal
(a condition remains stable for a required interval). Multiple representations can be
bundled when no single representation is sufficient.

A task contract retains the original user goal and completion conditions while organizing
execution into a dependency graph. Each node contains a subgoal, success conditions,
eligible capability classes, typed parameters, resource requirements, evidence policy,
timeout, and recovery limits. This separation is important: the graph records what must
become true, while routing determines which currently available backend should attempt it.

“Typed” means that fields have explicit categories and validation rules rather
than being an unconstrained prose instruction. A navigation target, for example,
must identify a coordinate frame, a target position, and an admissible tolerance.
Its preconditions apply before dispatch (such as a valid localization estimate);
its postconditions are tested afterward (such as reaching the target). A request
to inspect and return additionally requires evidence from the observation and
reporting nodes. These task conditions are not interchangeable with a controller’s
terminal status.

### 4.3 Capability Cards and Routing

Each skill provider publishes a capability card containing its identifier and version,
supported embodiments, parameter schema, preconditions, declared side effects, expected
latency, resource set, cancellation behavior, risk class, failure vocabulary, and required
evidence. Routing begins with deterministic filtering over capability, embodiment,
parameter validity, preconditions, freshness, and safety. A configurable scorer may then
rank the eligible set using predicted success, risk, uncertainty, latency, cost, and verified
operational history:

|  |  |  |  |
| --- | --- | --- | --- |
|  | s⁡(πi)=wp​p^i−wr​r^i−wu​u^i−wl​l^i−wc​c^i−wh​h^i.s(\pi\_{i})=w\_{p}\hat{p}\_{i}-w\_{r}\hat{r}\_{i}-w\_{u}\hat{u}\_{i}-w\_{l}\hat{l}\_{i}-w\_{c}\hat{c}\_{i}-w\_{h}\hat{h}\_{i}. |  | (4) |

Here p^i,r^i,u^i,l^i,c^i\hat{p}\_{i},\hat{r}\_{i},\hat{u}\_{i},\hat{l}\_{i},\hat{c}\_{i} denote estimated success,
risk, uncertainty, latency, and cost for provider ii; h^i\hat{h}\_{i} is a penalty
derived from relevant historical failures or transition residuals. A transition
residual is a discrepancy between an expected and observed effect. Nonnegative
weights w∗w\_{\*} specify application tradeoffs after the quantities are put on
compatible scales. This is a configurable ranking interface, not a learned
policy or a scoring rule calibrated by the navigation cases in this paper.
The score is inspectable and is not itself an execution authority; hard guards and resource
acquisition still run after ranking.

This interface makes broad VLA policies and precise classical stacks complementary. A VLA
can supply a flexible manipulation backend, while a navigation stack or TAMP solver handles
tasks where metric constraints and explicit collision checks dominate.
Provider fallback preserves the node’s target effect.

#### Optional world-model support.

A world model can estimate candidate outcomes to assist routing or local planning.
Its predicted effects remain decision inputs: they cannot establish post-execution
success. The harness can also operate with geometry-based planners, navigation skills,
or conventional controllers that supply no learned prediction. Thus, the task contract,
context compiler, execution supervisor, and commit path do not require a particular
world model. This paper studies those runtime mechanisms; prediction-model training
is delegated to the selected provider.

### 4.4 Role-Isolated Contexts

RegenHarness compiles a common state version into four bounded contexts (Table [1](#S4.T1 "Table 1 ‣ 4.4 Role-Isolated Contexts ‣ 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")).
The letter C stands for *context*; C1–C4 are information-access roles,
not four model names, robots, or independently maintained memories. A context
compiler is a software selector and formatter for those views, not a neural
network compiler. “Bounded” refers to the scope and amount of information
included in a view.
The compiler selects fields by role, task and node scope, confidence, freshness, provenance,
and item budget. It rejects expired or superseded records and withholds unresolved
conflicts until re-observation or explicit disambiguation.

| View | Consumer | Primary question |
| --- | --- | --- |
| C1 | Planner | What should happen next? |
| C2 | Skill | How should this node be executed? |
| C3 | Verifier | Did the intended effect occur? |
| C4 | Recovery | What bounded response is justified? |

Table 1: Role-isolated contexts compiled from one versioned state.

C1 contains the original goal, graph frontier, committed progress, relevant spatial state,
and high-level failure history. C2 contains one current subgoal, grounded targets, the
selected skill contract, bounded observations, and a small number of verified operational
examples. C3 contains postconditions, before/after evidence, sensor timestamps, and
relevant committed facts; records originating from the planner’s own conclusion are
excluded. C4 contains the structured failure, attempted actions, remaining budgets,
available alternatives, and evidence necessary to choose an escalation.

Context separation limits both accidental leakage and correlated self-confirmation. For
example, the text “the cup has been grasped” generated by a planner is useful as an
intention in C2 but cannot become evidence of grasp success in C3.
In this sense, context engineering is an information-access policy for the coupled loops,
not merely prompt formatting: each consumer receives the state and evidence permitted
for its decision, rather than an undifferentiated history of model outputs.

### 4.5 Supervised Skill Lifecycle

The skill supervisor is the only dispatch path in the reference harness. Before execution, it validates the request,
records a dispatch intent, acquires leases for the robot and workspace resources, and binds
an idempotency key to the task/node/attempt. The backend then exposes a lifecycle with
accepted, queued, running, blocked, succeeded, failed, and cancelled states, plus structured
progress and evidence references.

*Idempotent dispatch* means that receiving the same invocation request
again returns its existing execution record rather than starting another
physical action. This handles a repeated send after a lost acknowledgment; it
does not prohibit an explicitly authorized new attempt. The reference
orchestrator keys dispatch by task, node, and state version. A *resource
lease* is a time-bounded reservation, with an owner and expiry, for resources
such as the mobile base. Conflicting exclusive leases prevent two skills from
simultaneously commanding that resource. A lease is coordination metadata, not
a physical emergency stop.

Long-running skills have explicit deadlines. Persisted execution handles support
reattachment to providers that implement it. Replaying a pending start uses the same
request identity and requires provider-side deduplication to avoid repeated physical
execution across that crash boundary.

For physical deployment, resource reassignment requires a confirmed stopped or safe-hold
state. The reference supervisor currently treats return from cancel() as
completion and releases the lease. This assumes synchronous cancellation; asynchronous
robot providers require a stopping acknowledgment before the lease can be reassigned.

### 4.6 Evidence, Verification, and Commit

For a terminal execution, the harness preserves an evidence packet, summarized as:

|  |  |  |  |
| --- | --- | --- | --- |
|  | Zk=(I,kctx,Obefore,Oafter,P,Δ^k),Z\_{k}=\bigl(I,k\_{\mathrm{ctx}},O\_{\mathrm{before}},O\_{\mathrm{after}},P,\widehat{\Delta}\_{k}\bigr), |  | (5) |

where II identifies the task, node, provider, execution, and packet;
kctxk\_{\mathrm{ctx}} is the state version used to dispatch; ObeforeO\_{\mathrm{before}}
and OafterO\_{\mathrm{after}} reference observations before and after execution;
PP references pose or other state estimates; and Δ^k\widehat{\Delta}\_{k} contains
the provider’s proposed task facts. An observation collection may be empty if
that skill does not require it; its evidence policy determines what is mandatory.
Each evidence reference retains a source, timestamp, confidence, and a file
reference or checksum, with a coordinate frame where relevant. In the reference
implementation, the packet ID is derived from the execution ID, which is also
stored in packet metadata. The packet is retained even when verification rejects it.

Verification proceeds in two layers. A node-level verifier evaluates every declared
postcondition with sources independent of the executing provider where possible. A
backend’s own done signal may be included as evidence but is never the sole
authority. The commit gate checks the verdict, identity binding, state version, and
condition coverage before atomically advancing the node and trusted facts. Once every
required node is committed, a separate goal verifier rechecks the original completion
conditions. Thus:

|  |  |  |  |
| --- | --- | --- | --- |
|  | controller done⇏node success⇏goal success.\text{controller done}\not\Rightarrow\text{node success}\not\Rightarrow\text{goal success}. |  | (6) |

Only a satisfied original-goal verdict authorizes a final success report to the
user; intermediate status or failure reports are not completion claims.

The verifier asks whether the evidence satisfies the node conditions; the commit
gate asks whether that verdict is authorized to change this task version.
For example, a valid arrival verdict from an earlier attempt cannot certify a
later request to a different target. The gate rejects a packet generated from
an obsolete state version rather than silently interpreting it under the new
state. “Atomic” means that accepting the node result and updating its task
facts form one guarded state transition, not two independently visible writes.

### 4.7 Budgeted Recovery

Non-satisfied verification results enter C4 with a structured failure class. The recovery
router maps this class to an ordered escalation ladder, for example:

|  |  |  |  |
| --- | --- | --- | --- |
|  | target\_not\_found | :re-perceive→adjust view,\displaystyle:\ \text{re-perceive}\rightarrow\text{adjust view}, |  |
|  |  |  |  |
| --- | --- | --- | --- |
|  | no\_progress | :local replan→switch skill,\displaystyle:\ \text{local replan}\rightarrow\text{switch skill}, |  |
|  |  |  |  |
| --- | --- | --- | --- |
|  | unsafe\_action | :safe stop→human handoff.\displaystyle:\ \text{safe stop}\rightarrow\text{human handoff}. |  |

Each action consumes both a per-action and total recovery budget. The current failure,
prior attempts, excluded providers, evidence, and remaining budget are recorded before the
next attempt is planned. Repeating the same failed action without new evidence can
therefore be prohibited deterministically.

Recovery budgets count authorized recovery actions, not low-level controller
cycles. A retry repeats a bounded skill invocation, a provider switch chooses
another implementation of the same capability, and replanning revises the task
or route proposal. The relevant limits come from the task contract; exhausting
them requires escalation or termination instead of another automatic attempt.
An internal collision-avoidance iteration is therefore not, by itself, a C4 event.

### 4.8 Trusted Memory and Event Sourcing

Memory here means stored task and evidence records, not a learned model of how
the world will evolve. Versioning marks which record was current for a decision;
it does not change model weights.

The memory fabric separates five roles: working memory for the active graph and control
state; spatial memory for maps, entities, poses, and relations; episodic memory for verified
attempt histories; operational memory for context-conditioned provider outcomes; and
semantic memory for capability contracts and rules. Long-term records require provenance,
confidence, validity intervals, and verification state. Updates append a new record with a
supersedes or conflict relation instead of silently overwriting history.

The trusted task store projects current progress from ordered observation, commit,
recovery-budget, and goal-verification events. Execution snapshots and evidence records
retain the associated request, provider handle, state version, sources, and verdicts.
These records support reconstruction of task progress. Exact replay of model decisions
additionally requires the original context contents, candidate set, configuration,
model outputs, and any randomness; complete capture of those inputs across all entry
points remains an integration requirement.

Event sourcing means retaining an ordered history of state-changing records,
from which current task progress can be reconstructed. Reconstruction is not
the same as re-running the robot or reproducing a stochastic model response.

### 4.9 Evidence-Gated Recursive Self-Improvement

Recursive self-improvement (RSI) adds a cross-mission revision loop around the
model and agent loops. The model loop revises a proposal within the current
configuration; the agent loop verifies physical progress; the RSI loop evaluates
a change to the configuration used by subsequent missions. Here the object of
improvement is the harness configuration: context-selection rules, task
templates, routing preferences, and bounded recovery policies. The RSI protocol
organizes candidate generation, regression checks, release authorization,
and versioned rollback.

#### From execution records to candidate revisions.

Let HjH\_{j} denote harness configuration version jj, and let 𝒟j\mathcal{D}\_{j}
contain its mission records, evidence links, failures, and recovery costs.
A revision generator produces a candidate H~j\widetilde{H}\_{j} with a change
manifest that identifies the affected component, motivating traces, intended
effect, and rollback version. Stable skill and evidence interfaces allow the
same provider to be exercised under both configurations.

#### Evaluation before release.

Each candidate is checked against a fixed regression set ℛj\mathcal{R}\_{j},
including nominal tasks and stale-evidence, duplicate-request, interrupted-run,
and resource-conflict cases. The release rule is

|  |  |  |  |
| --- | --- | --- | --- |
|  | Hj+1={H~j,𝒜⁡(H~j,Hj,ℛj)=1,Hj,otherwise.H\_{j+1}=\begin{cases}\widetilde{H}\_{j},&\mathcal{A}(\widetilde{H}\_{j},H\_{j},\mathcal{R}\_{j})=1,\\ H\_{j},&\text{otherwise}.\end{cases} |  | (7) |

The acceptance predicate 𝒜\mathcal{A} requires preserved safety and evidence
contracts, no regression on designated checks, improvement on a predeclared
target metric, and release authorization. Evaluation results and tested versions
are retained with the revision. The updater has no permission to weaken its own
acceptance predicate, commit gate, or lower-level safety interlocks.

#### Versioned rollout and recursion.

Approved revisions become available at mission boundaries; each active mission
remains pinned to its original configuration. A failed release returns to the
last accepted version. Subsequent mission records feed the next revision cycle,
forming the recursive feedback path. Online weight updates are outside this
protocol. Section [6.8](#S6.SS8 "6.8 Harness and RSI Evaluation Protocol ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement") defines the assessment
criteria for execution outcomes and cross-mission configuration updates.

### 4.10 Safety and Resource Authority

The harness does not replace motor-control safety. Hardware limits, collision and force
guards, watchdogs, controller interlocks, and emergency stops remain beneath and outside
model authority. The harness adds task-level preflight, resource and workspace leases,
freshness checks, cancellation, and human-approval policies. A planner or plugin may add a
restriction but cannot remove a restriction imposed by a lower safety layer. Missing
safety-critical state causes the relevant action to fail closed.

## 5 Implementation

The Python reference runtime implements typed immutable contracts and
SQLite-backed task, evidence, execution, and memory stores. Its state machine
performs planning, context compilation, dispatch, polling, verification,
commitment, recovery, and original-goal verification. Persisted requests,
execution handles, leases, and evidence support restart-oriented recovery under
the deduplication and cancellation assumptions stated above. Adapters connect
ROS 2 (Robot Operating System 2), vendor software development kits (SDKs),
model services, and simulators to that runtime.

The reference deployment is single-host. Multi-robot deployment requires
transactional external leases and explicit clock and event-ordering contracts.
Verification also depends on evidence quality: shared sensor or model errors
require independent adjudication when measuring semantic correctness.

Section [6](#S6 "6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement") presents the quadruped warehouse workflow built
on the HROS field application [[24](#bib.bib1)], together with exploration,
mapping, and navigation results. The provider interface also accommodates
VLA, manipulation, TAMP, and world-model-assisted backends through the
capability and lifecycle contracts defined above.

## 6 Experimental Evaluation

### 6.1 Experimental Setup and Robot Platform

The main case documents a physical quadruped’s voice-triggered warehouse
inspection. Voice-session records, mission identifiers,
image checksums, and navigation receipts link the stages in
Figure [6.2](#S6.SS2 "6.2 Voice-Triggered Warehouse Inspection ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement") to one execution. A separate circuit
examines completion when the robot starts near its eventual
goal. These deployment cases demonstrate an integrated physical inspection
workflow and a history-dependent navigation completion condition.

The experiments use a quadruped robot in an office and entrance environment.
We examine the voice-to-action workflow, VLM-guided exploration with
omni\_planner, semantic place binding, and navigation completion.
Mission identifiers connect the command, sensor observations, action results,
and communication receipts. Section [6.8](#S6.SS8 "6.8 Harness and RSI Evaluation Protocol ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement") defines
the assessment criteria for harness execution and RSI configuration updates.

#### Platform and recorded tasks.

The robot’s navigation stack combines a fixed reference route, local planning, localization,
and a supervised velocity interface. The recorded trial settings specify a
0.5 m/s speed cap and a 0.6 m controller lookahead, the forward reference
distance used by the local follower. The first mission follows
the same 17.62 m reference in opposite directions between the violet and blue
waypoints. The second follows an 18.83 m circuit whose start and goal coincide.

The ROS 2 recordings use the MCAP container format. They store body poses on
/vbot\_planner/body\_pose and dispatched paths on /initial\_path.
A reference path is the ordered waypoint sequence
sent to the follower; the body trajectory is the robot’s recorded localization
output while following it. We also inspect supervisor and planner logs. Figures
use the recorded map frame; their background is a saved point-cloud map
aligned by the recorded static transform. Camera panels are decoded from the
closed-route recording, with timestamps derived from MCAP log time. In the
distance plots, zero seconds is the reference-path dispatch recorded in that
segment’s bag. Audio acquisition and recording start have separate timestamps.

### 6.2 Voice-Triggered Warehouse Inspection

The spoken instruction translates as “Help me go and check the office
storage area,” preceded by the wake phrase. The warehouse profile connects
the command to navigation, panoramic capture, visual analysis, DingTalk
delivery, return, and spoken reporting. The profile supplies return and reporting
as part of its inspection workflow. Figure [6.2](#S6.SS2 "6.2 Voice-Triggered Warehouse Inspection ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")
presents the seven-stage execution of the voice-triggered warehouse inspection
described in this subsection.

![Refer to caption](2609.27612v1/fig02_voice_inspection.png)

Figure 2: Step-by-step evidence from one real voice-triggered warehouse
inspection. The waveform is derived from the original microphone recording;
the photographs are unaltered full frames from the destination panorama.
English text translates or summarizes the saved command and report.
Arrival distances are supervisor-reported; communication outcomes are
system-side receipts. Each panel summarizes the corresponding recorded stage.

#### Command and navigation.

An 8.16 s, 16 kHz microphone recording feeds streaming ASR. The warehouse
profile binds the destination to office\_storage at endpoint B.
The robot navigates from A to B; the supervisor reports 0.11 m endpoint
error and disarms velocity control before the observation stage begins.

#### Observation and visual analysis.

The robot rotates in segments and saves eight 1280×\times720 images,
with capture times, checksums, rotation request identifiers, terminal events,
and a static-body postcondition. The deployed Qwen3-VL-Plus configuration
analyzes these frames. Its saved report describes boxes obstructing a
passage, providing the visual finding used by the subsequent reporting stages.

#### Delivery, return, and user feedback.

The application sends four images and the inspection text to the configured
DingTalk group, retaining acknowledged receipts before returning to A.
The return supervisor reports 0.17 m endpoint error. After a turn and a
static-body check, the robot speaks the result. Final playback is recorded
as completed. Delivery and playback records preserve both system-side outcomes.

#### Linking the stages.

The voice result embeds the same task identifier and mission record as the
executor; the transcript checksum matches, navigation receipts locate both
legs’ recordings, and all eight image checksums match. The session log
links the recognized command to final playback. Mission execution takes
259.94 s; the full voice turn, including input acquisition and overhead,
takes 271.22 s. The shared identifiers, timestamps, and checksums connect
these stages into one physical mission under the deployed warehouse profile.

#### End-to-end mission results.

Figure [6.2](#S6.SS2 "6.2 Voice-Triggered Warehouse Inspection ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement") follows one spoken request through
arrival, observation, analysis, delivery, return, and reporting. The
photographs show the actual destination and boxes described in the output.
The images retain the camera’s original lighting and lens distortion.
Navigation, image capture, messaging, and speech each supply
different evidence. Their ordered outcomes make the complete workflow
visible: reaching the warehouse alone would leave inspection, delivery,
return, and final reporting unfinished.

#### Cross-stage evidence links.

The voice result embeds the mission identifier and the executor’s record.
The transcript checksum matches the input; navigation receipts locate both
legs’ recordings; frame paths match saved image checksums. The final record
retains the finding and delivery status. These links connect audio, motion,
perception, and communication in one physical task. The case documents the
application’s complete execution chain and identifies the evidence produced
at each stage. Shared identifiers and evidence references preserve the
connection between the user request, physical actions, visual findings,
message delivery, and final spoken report.

The warehouse mission links the following evidence across its execution stages:

* •

  Input: the original recording, ASR transcript, and a
  matching transcript checksum in the mission record.
* •

  Inspection: timestamped panoramic images, rotation
  receipts, and a visual report based on those frames.
* •

  Physical execution: outbound and return trajectories,
  arrival declarations, and recorded static-body checks.
* •

  Communication: acknowledged image/text delivery and
  completed final speech playback.

### 6.3 Exploration with VLM + omni\_planner

Mapping supplies spatial context for warehouse navigation and semantic place
binding. Figure [6.3](#S6.SS3 "6.3 Exploration with VLM + omni_planner ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement") presents the VLM +
omni\_planner workflow alongside the field map. The exploration
system uses the VLM for semantic goal selection and our in-house
omni\_planner for local motion generation. SLAM maintains spatial
context, and execution feedback informs the next exploration decision.

![Refer to caption](2609.27612v1/fig03_exploration_mapping.png)

Figure 3: VLM + omni\_planner: exploration architecture and field
mapping output. (a) The architecture assigns exploration-goal selection to
the VLM, local motion generation to omni\_planner, and map updates
to SLAM, with RegenHarness supervising execution. (b) The saved
point cloud and recorded SLAM trajectory, aligned using recorded transforms.
The two panels connect the exploration workflow to the site’s mapped
geometry and robot trajectory.

#### Visual goal selection.

The VLM interface consumes camera observations, map context, the exploration
objective, and execution feedback. Its output is a bounded exploration target
and the reason for visiting it. This target specifies the next observation
region or reachable approach point. The harness checks target admissibility
and binds the dispatched request to the active mission and configuration.

#### Local planner.

The local planner, omni\_planner, converts the selected target into
locally feasible motion using geometric observations and robot pose. Local
collision checks and controller limits govern motion execution. This division
assigns semantic target selection to the VLM while retaining geometric
feasibility and motor-command authority in the local motion stack.

#### Feedback.

Target progress, blockage, and map changes return to the goal-selection
interface. RegenHarness supplies dispatch, monitoring, verification, and bounded
recovery around each invocation. SLAM updates the spatial map during motion.
This interaction closes the feedback path between observation,
target selection, local planning, and the next observation.

#### Mapping result.

The field panel uses the saved point cloud from the robot’s exploration and
mapping session. We render the final nonempty recorded
/path trajectory in the map frame and apply the recorded
transform from the point cloud’s lidar\_init frame. The full extent
and enlarged explored area expose the geometry used for subsequent navigation
and place binding. The SLAM path records the robot’s motion, including revisits.

### 6.4 Site Map and Semantic Anchors

Figure [6.4](#S6.SS4 "6.4 Site Map and Semantic Anchors ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement") restores the spatial context omitted by the
trajectory crops. It displays the full extent of the saved site’s vertical
point-cloud structure and an enlarged task area. The field inspection template
binds office\_storage to the blue route endpoint B; the violet endpoint
A is the departure and return anchor. These configured task semantics bind
the inspection destination and return point to the recorded geometric map.
The letters A and B identify task roles consistently across the mission,
map, and navigation figures.

![Refer to caption](2609.27612v1/fig04_semantic_map.png)

Figure 4: Site geometry and configured task semantics. (a) Task area and
reference routes. (b) Full recorded map extent. (c) Place-to-target bindings:
A is departure/return; B is office\_storage. These sparse anchors
provide configured mission-level semantics over the recorded geometric map.

The semantic layer connects user-level names to execution targets. Its place
record schema includes an identifier, name and aliases, map frame and version,
region or approach pose, provenance, and verification status. The field map
instantiates this connection with two configured mission anchors. Extending
the registry adds further place bindings without changing the execution contract.

### 6.5 Navigation Results

#### Metrics.

For reference waypoints q0,…,qMq\_{0},\ldots,q\_{M} and a recorded planar body position
p⁡(τ)p(\tau), the quantities in Table [6.5](#S6.SS5.SSS0.Px2 "Execution results. ‣ 6.5 Navigation Results ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement") are

|  |  |  |  |
| --- | --- | --- | --- |
|  | Lref\displaystyle L\_{\mathrm{ref}} | =∑j=1M∥qj−qj−1∥2,\displaystyle=\sum\_{j=1}^{M}\lVert q\_{j}-q\_{j-1}\rVert\_{2}, |  |
|  |  |  |  |
| --- | --- | --- | --- |
|  | d⁡(τ)\displaystyle d(\tau) | =∥p⁡(τ)−qM∥2.\displaystyle=\lVert p(\tau)-q\_{M}\rVert\_{2}. |  |

Here τ\tau is elapsed time relative to recorded path dispatch, qMq\_{M} is the
segment’s target, and ∥⋅∥2\lVert\cdot\rVert\_{2} is planar Euclidean distance.

For example, the outbound row assigns a 17.62 m A-to-B route. At the arrival
declaration the supervisor reports 0.11 m remaining to B; the last recorded
pose is 0.09 m from B. The two columns report the supervisor’s arrival event
and the final recorded localization sample, respectively. Their distinct
sampling times explain the difference. Recording duration includes
pre/post-arrival samples; mission timing is taken from the execution log.

#### Execution results.

Both round-trip segments reach their endpoints and then stop publishing velocity
commands (control disarming). The return trace has an interval of limited
goal-distance reduction; planner logs record rejected collision candidates and
replanning before progress resumes. These events describe the local planner’s
internal motion-generation process.

![Refer to caption](2609.27612v1/fig05_roundtrip_evidence.png)

Figure 5: Navigation legs of the recorded voice-triggered warehouse mission.
(a) Reference and body trajectories from
A to B and back. (b) Distance to each segment’s goal relative to reference
dispatch; the dotted line is the 0.40 m tolerance. Traces continue to the
end of recording; Table [6.5](#S6.SS5.SSS0.Px2 "Execution results. ‣ 6.5 Navigation Results ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement") reports the supervisor’s
arrival distances and the distances at the last recorded poses.

Table 2: Per-segment navigation measurements. Outbound and return are the two legs of the
voice-triggered warehouse inspection; the circuit is a separate mission.
A is the departure/return anchor and B the configured storage-area target
in Figure [6.4](#S6.SS4 "6.4 Site Map and Semantic Anchors ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement"). All numeric distances are in meters.

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| Execution segment | Commanded route and target | Reference path length LrefL\_{\mathrm{ref}} (m) | Goal distance at arrival declaration (m) | Goal distance at last recorded pose (m) |
| Outbound | A →\rightarrow B; target B | 17.62 | 0.11 | 0.09 |
| Return | B →\rightarrow A; target A | 17.62 | 0.17 | 0.17 |
| Circuit | A →\rightarrow circuit →\rightarrow A | 18.83 | 0.25 | 0.15 |

How the columns are obtained. Reference length is the sum of
planar distances between commanded waypoints, not traveled distance.
Arrival distance is the value printed in the supervisor’s
GOAL REACHED log; last-pose distance is recomputed from the final
recorded localization sample to that segment’s target. Both are endpoint
distances, not path-tracking error or external ground-truth accuracy.
The configured arrival radius is 0.40 m; the circuit additionally requires
confirmed departure before return can count. The two timestamps differ.

### 6.6 Closed-Route Completion Case

The circuit exposes a useful completion ambiguity. At reference dispatch, the
first recorded robot position is approximately 0.23 m from the goal, already
inside the 0.40 m arrival tolerance. Nevertheless, the intended task is to
traverse the circuit and return. The recorded supervisor announces departure
before its eventual arrival decision; the body trajectory moves as far as
6.20 m from the shared endpoint and returns
(Figure [6.6](#S6.SS6 "6.6 Closed-Route Completion Case ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")). The planner log additionally reports 99.6%
reference progress and 0.068 m remaining at its completion event. These are
complementary observations of endpoint distance and route progress at their
respective recorded times.

The circuit’s completion condition requires departure, route progress, and
return, rather than endpoint proximity alone. The deployed supervisor records departure and return;
the planner reports reference progress; and the trajectory records the
traversed geometry. Together, these records explain the history-dependent
navigation decision and give the agent loop concrete evidence fields for
checking a closed-route task.

![Refer to caption](2609.27612v1/fig06_loop_completion.png)

Figure 6: Circuit completion requires execution history. (a) Reference and
body trajectory with camera locations c–e. (b) The robot starts within the
arrival tolerance, leaves, and returns. (c–e) Original onboard frames from
that recording. Departure, trajectory, and return records establish the
navigation-level completion sequence.

### 6.7 Supplementary Text-Driven Camera Task

Separately from the voice-triggered inspection, we examine a supplementary
text-driven camera task. This case records a Qwen-Plus plan: capture,
persist evidence, and describe the image. All nodes
succeed without motion commands and share the image checksum, documenting
model-proposed task decomposition on real sensor data.

### 6.8 Harness and RSI Evaluation Protocol

The assessment protocol separates task execution from cross-mission
configuration updates. Execution checks address evidence validity, completion
decisions, dispatch identity, resource ownership, and bounded recovery. RSI
checks address candidate changes, regression behavior, release decisions,
and rollback. Both use explicit acceptance criteria rather than a model’s
unverified declaration of success.

For controlled harness comparisons, the protocol fixes the navigation
provider and routes across direct provider completion, monitored execution,
and evidence-gated execution. It specifies stale or missing pose evidence,
early provider success, repeated requests, and interrupted execution as fault
conditions. The ablation design removes evidence binding, role-isolated
contexts, or bounded recovery individually. Its outcome measures are
independently adjudicated task success, false completion, duplicate physical
dispatch, recovery outcome, and execution overhead.

For RSI, the protocol compares a frozen harness version with an accepted
candidate while holding the model and skill provider fixed. Each revision
retains the motivating traces, configuration difference, regression outcomes,
release decision, and rollback record. A held-out task set separates revision
generation from evaluation. Target measures are false completion, recovery
cost, regression failures, and release overhead. For VLM + omni\_planner,
each exploration decision links the camera observation, proposed target,
planner response, and map update under one mission identity. These criteria
define how execution outcomes and configuration changes are assessed within
the model, agent, and RSI loops.

## 7 Related Work

#### Agent loops and harnesses.

ReAct interleaves reasoning and action [[25](#bib.bib12)]. Anthropic’s agent patterns
and LangChain’s harness account describe feedback-driven tool use and orchestration
outside the model [[2](#bib.bib13), [20](#bib.bib14)]; these are engineering
articles, not robot evaluations. Recent research makes this systems perspective
explicit: Gu studies context governance, trustworthy memory, and dynamic skill
routing [[8](#bib.bib15)], while Code as Agent Harness surveys executable
interfaces, stateful mechanisms, and verification [[18](#bib.bib16)].
Self-Harness mines execution failures, proposes harness edits, and retains edits
after regression tests [[26](#bib.bib17)]. This motivates separating
runtime execution from cross-mission harness revision. Our RSI protocol
(Section [4.9](#S4.SS9 "4.9 Evidence-Gated Recursive Self-Improvement ‣ 4 RegenHarness Architecture ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement")) binds candidate revisions to robot execution evidence,
fixed acceptance checks, versioned release, and rollback. The agent loop retains
authority over physical task-state commitment under each accepted configuration.

#### Guarded execution.

EmbodiedSkills is closely related: a fixed skill interface connects high-level
selection, preflight checks, bounded VLA execution, post-action verification, and
structured trajectories [[23](#bib.bib19)]. CommitFlow also addresses
premature stage progression; it monitors physical requirements, blocks dependent
actions, and applies calibrated local corrections before
re-verification [[27](#bib.bib20)]. These works share our motivation and
preclude treating verification-gated progression itself as a new principle.
Our emphasis is the surrounding systems contract: C1–C4 information-access
boundaries, identity- and version-bound commit authority, duplicate-dispatch
control, resource ownership, and durable recovery accounting across heterogeneous
providers. These contracts define the mechanisms for a matched evaluation
with a fixed skill provider and common failure conditions.

#### World models and diagnosis.

EV-WM [[21](#bib.bib2)] decodes imagined feature-space futures into task events and
uses event scores to guide candidate selection. Onto-EV-WM [[22](#bib.bib3)]
provides typed fact grounding and failure diagnosis around world-model prediction and
verification-gated correction. Such methods can supply candidate assessments or
diagnostic information to a robot runtime. RegenHarness addresses the execution contract
around heterogeneous providers: task-state commitment, role-specific contexts, skill
lifecycles, and bounded recovery. Its runtime does not require either method, and
evaluating its contribution is distinct from evaluating prediction or correction quality.

#### Language-guided robot planning.

Language models have been used to select robot skills by combining semantic likelihood with
learned affordances [[1](#bib.bib6)], and closed-loop language agents have incorporated
environment feedback into subsequent reasoning [[9](#bib.bib7)].
ReKep converts language and visual observations into relational keypoint constraints
and optimizes actions in a perception–action loop [[10](#bib.bib26)].
These methods address skill selection, feedback, or geometric action construction.
RegenHarness instead specifies how a selected provider’s execution is supervised and
how its evidence becomes accepted task progress; a planner’s valid proposal is
not itself proof that the physical transition occurred.

#### Failure diagnosis and recovery.

REFLECT summarizes multisensory execution history for language-based failure
explanation and correction [[16](#bib.bib24)]. AHA trains a vision-language
model to identify manipulation failures and explain them [[6](#bib.bib23)].
MAGMA-GEN generates recovery supervision by testing candidate corrections through
matched-state re-execution [[3](#bib.bib22)]. These target diagnostic
quality or the acquisition of recovery behavior, complementary to the verifier
and recovery-provider interfaces in our design.
Our C4 contract governs which recovery is authorized, how much budget it consumes,
and which new evidence must support subsequent acceptance. A useful diagnosis
and an authorized state transition remain different objects.

#### Evaluating recovery rather than nominal success.

LIBERO-RECOVER evaluates manipulation from failure scenarios spanning action
retry, action adaptation, object-state recovery, and environmental
recovery [[14](#bib.bib21)]. This motivates measuring recovery separately
from nominal task completion. Our deployment cases concern navigation and
inspection; the benchmark addresses manipulation recovery.
For a harness comparison, the provider and failure conditions must be held fixed
while measuring false completion, duplicate dispatch, recovery expenditure, and
verified task outcomes. These criteria define the controlled evaluation protocol
in Section [6.8](#S6.SS8 "6.8 Harness and RSI Evaluation Protocol ‣ 6 Experimental Evaluation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").

#### Visuomotor policies.

RT-2 [[5](#bib.bib8)], OpenVLA [[12](#bib.bib9)], and π0\pi\_{0} [[4](#bib.bib10)]
demonstrate increasingly broad vision-language-conditioned control.
π0.5\pi\_{0.5} uses co-training across diverse data sources to improve
open-world generalization [[19](#bib.bib25)]. RegenHarness does not
compete with these policies. It treats each as a versioned, bounded backend whose outputs
must satisfy the same lifecycle, resource, evidence, and verification contracts as a
classical controller.

#### Embodied runtimes and memory.

HROS [[24](#bib.bib1)] supplies our prior quadruped inspection runtime, integrating
autonomy, voice, memory, and reporting. RegenHarness builds on this deployment
foundation and upgrades the agent-harness execution contract.
HoloAgent-0 organizes an embodied runtime, hierarchical 3D memory, and robot skills through
a monitored execution loop [[28](#bib.bib4)]. PhyAgentOS provides session-based
coordination, a state-as-a-file protocol, verification, epistemic memory, and a staged
evaluation process [[15](#bib.bib5)]. RegenHarness is complementary but places
its main technical emphasis on state-commit authority: observed versus committed facts,
role-isolated C1–C4 contexts, identity- and version-bound evidence packets, and event-sourced
budgeted recovery. These mechanisms make false completion and correlated self-verification
explicitly testable harness properties.

#### Robot middleware and task execution.

ROS 2 supplies distributed communication and execution infrastructure [[17](#bib.bib11)],
behavior trees structure modular control flow [[11](#bib.bib28)], and
TAMP integrates discrete task planning with continuous motion
planning [[7](#bib.bib27)]. Lee et al. explicitly frame robot middleware as a
Physical AI harness, with output projection, execution/communication isolation,
and fallback transfer [[13](#bib.bib18)]. That enforcement layer is
complementary to our task-level contract: RegenHarness does not replace real-time
scheduling, network isolation, or low-level safety. It governs evidence provenance,
task-state acceptance, and recovery budgets above the provider interface.

## 8 Conclusion

RegenHarness organizes long-horizon execution around explicit authority and
evidence-bound state transitions. Role-isolated contexts, supervised skill
lifecycles, guarded commitment, and bounded recovery connect model proposals
to accepted task progress under the verifier and backend contracts. The
warehouse mission demonstrates an integrated physical workflow; the circuit
exposes history-dependent completion. The RSI loop applies the same
evidence-before-acceptance principle to harness revisions through regression
checks, versioned release, and rollback.

## References

* [1]
  M. Ahn, A. Brohan, N. Brown, Y. Chebotar, O. Cortes, B. David, C. Finn, C. Fu, K. Gopalakrishnan, K. Hausman, et al. (2022)
  Do as I can, not as I say: grounding language in robotic affordances.
  In Conference on Robot Learning,
  Cited by: [§7](#S7.SS0.SSS0.Px4.p1.1 "Language-guided robot planning. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [2]
  Anthropic (2024)
  Building effective agents.
  Note: Engineering article, December 19<https://www.anthropic.com/engineering/building-effective-agents>
  Cited by: [§1](#S1.p4.1 "1 Introduction ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement"),
  [§7](#S7.SS0.SSS0.Px1.p1.1 "Agent loops and harnesses. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [3]
  L. Bernat, M. Grard, A. Herbulot, and F. Lamiraux (2026)
  MAGMA-GEN: validated recovery supervision from ambiguous failures via counterfactual re-execution.
  arXiv preprint arXiv:2609.20056.
  External Links: [Link](https://arxiv.org/abs/2609.20056)
  Cited by: [§7](#S7.SS0.SSS0.Px5.p1.1 "Failure diagnosis and recovery. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [4]
  K. Black, N. Brown, D. Driess, A. Esmail, M. Equi, C. Finn, N. Fusai, L. Groom, K. Hausman, B. Ichter, et al. (2024)
  π0\pi\_{0}: A vision-language-action flow model for general robot control.
  arXiv preprint arXiv:2410.24164.
  Cited by: [§7](#S7.SS0.SSS0.Px7.p1.1 "Visuomotor policies. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [5]
  A. Brohan, N. Brown, J. Carbajal, Y. Chebotar, X. Chen, K. Choromanski, T. Ding, D. Driess, A. Dubey, C. Finn, et al. (2023)
  RT-2: vision-language-action models transfer web knowledge to robotic control.
  arXiv preprint arXiv:2307.15818.
  Cited by: [§7](#S7.SS0.SSS0.Px7.p1.1 "Visuomotor policies. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [6]
  J. Duan, W. Pumacay, N. Kumar, Y. R. Wang, S. Tian, W. Yuan, R. Krishna, D. Fox, A. Mandlekar, and Y. Guo (2025)
  AHA: a vision-language-model for detecting and reasoning over failures in robotic manipulation.
  In International Conference on Learning Representations,
  External Links: [Link](https://proceedings.iclr.cc/paper_files/paper/2025/hash/70a06501001e1820fd1eb9ee821302d2-Abstract-Conference.html)
  Cited by: [§7](#S7.SS0.SSS0.Px5.p1.1 "Failure diagnosis and recovery. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [7]
  C. R. Garrett, R. Chitnis, R. Holladay, B. Kim, T. Silver, L. P. Kaelbling, and T. Lozano-Pérez (2021)
  Integrated task and motion planning.
  Annual Review of Control, Robotics, and Autonomous Systems 4, pp. 265–293.
  External Links: [Document](https://dx.doi.org/10.1146/annurev-control-091420-084139),
  [Link](https://arxiv.org/abs/2010.01083)
  Cited by: [§7](#S7.SS0.SSS0.Px9.p1.1 "Robot middleware and task execution. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [8]
  S. Gu (2026)
  From model scaling to system scaling: scaling the harness in agentic AI.
  arXiv preprint arXiv:2605.26112.
  External Links: [Link](https://arxiv.org/abs/2605.26112)
  Cited by: [§1](#S1.p4.1 "1 Introduction ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement"),
  [§7](#S7.SS0.SSS0.Px1.p1.1 "Agent loops and harnesses. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [9]
  W. Huang, P. Abbeel, D. Pathak, and I. Mordatch (2022)
  Inner monologue: embodied reasoning through planning with language models.
  In Conference on Robot Learning,
  Cited by: [§7](#S7.SS0.SSS0.Px4.p1.1 "Language-guided robot planning. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [10]
  W. Huang, C. Wang, Y. Li, R. Zhang, and L. Fei-Fei (2024)
  ReKep: spatio-temporal reasoning of relational keypoint constraints for robotic manipulation.
  arXiv preprint arXiv:2409.01652.
  External Links: [Link](https://arxiv.org/abs/2409.01652)
  Cited by: [§7](#S7.SS0.SSS0.Px4.p1.1 "Language-guided robot planning. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [11]
  M. Iovino, E. Scukins, J. Styrud, P. Ögren, and C. Smith (2022)
  A survey of behavior trees in robotics and AI.
  Robotics and Autonomous Systems 154, pp. 104096.
  External Links: [Document](https://dx.doi.org/10.1016/j.robot.2022.104096),
  [Link](https://arxiv.org/abs/2005.05842)
  Cited by: [§7](#S7.SS0.SSS0.Px9.p1.1 "Robot middleware and task execution. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [12]
  M. J. Kim, K. Pertsch, S. Karamcheti, T. Xiao, A. Balakrishna, S. Nair, R. Rafailov, E. Foster, P. Sanketi, Q. Vuong, et al. (2024)
  OpenVLA: an open-source vision-language-action model.
  In Conference on Robot Learning,
  Cited by: [§7](#S7.SS0.SSS0.Px7.p1.1 "Visuomotor policies. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [13]
  S. Lee, J. Chae, and K. Park (2026)
  Harness engineering for physical AI: robot middleware is the harness layer.
  arXiv preprint arXiv:2606.09416.
  External Links: [Link](https://arxiv.org/abs/2606.09416)
  Cited by: [§7](#S7.SS0.SSS0.Px9.p1.1 "Robot middleware and task execution. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [14]
  L. Liu, Z. Bao, L. Zhang, Z. Song, W. Yang, Y. Zhuang, S. Tao, W. Liu, C. Jia, and H. Lu (2026)
  LIBERO-RECOVER: beyond task success towards failure recovery in robotic manipulation models.
  arXiv preprint arXiv:2609.05178.
  External Links: [Link](https://arxiv.org/abs/2609.05178v2)
  Cited by: [§7](#S7.SS0.SSS0.Px6.p1.1 "Evaluating recovery rather than nominal success. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [15]
  Y. Liu, W. Chen, X. Song, T. Pu, S. Mo, Y. Bai, Z. Chen, Q. Sun, L. Zhong, Y. Shen, and L. Lin (2026)
  PhyAgentOS: a self-evolving operating system for embodied agents with decoupled cognitive planning and physical execution.
  arXiv preprint arXiv:2607.16636.
  Cited by: [§1](#S1.p6.1 "1 Introduction ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement"),
  [§7](#S7.SS0.SSS0.Px8.p1.1 "Embodied runtimes and memory. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [16]
  Z. Liu, A. Bahety, and S. Song (2023)
  REFLECT: summarizing robot experiences for failure explanation and correction.
  In Proceedings of The 7th Conference on Robot Learning,
  Proceedings of Machine Learning Research, Vol. 229, pp. 3468–3484.
  External Links: [Link](https://proceedings.mlr.press/v229/liu23g.html)
  Cited by: [§7](#S7.SS0.SSS0.Px5.p1.1 "Failure diagnosis and recovery. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [17]
  S. Macenski, T. Foote, B. Gerkey, C. Lalancette, and W. Woodall (2022)
  Robot operating system 2: design, architecture, and uses in the wild.
  Science Robotics 7 (66).
  Cited by: [§7](#S7.SS0.SSS0.Px9.p1.1 "Robot middleware and task execution. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [18]
  X. Ning, K. Tieu, D. Fu, T. Wei, Z. Li, Y. Bei, J. Zou, M. Ai, Z. Liu, T. Li, et al. (2026)
  Code as agent harness.
  arXiv preprint arXiv:2605.18747.
  External Links: [Link](https://arxiv.org/abs/2605.18747)
  Cited by: [§1](#S1.p4.1 "1 Introduction ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement"),
  [§7](#S7.SS0.SSS0.Px1.p1.1 "Agent loops and harnesses. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [19]
  Physical Intelligence, K. Black, N. Brown, J. Darpinian, K. Dhabalia, D. Driess, A. Esmail, M. Equi, C. Finn, N. Fusai, et al. (2025)
  π0.5\pi\_{0.5}: a vision-language-action model with open-world generalization.
  arXiv preprint arXiv:2504.16054.
  External Links: [Link](https://arxiv.org/abs/2504.16054)
  Cited by: [§7](#S7.SS0.SSS0.Px7.p1.1 "Visuomotor policies. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [20]
  V. Trivedy (2026)
  The anatomy of an agent harness.
  Note: LangChain engineering article, March 10<https://www.langchain.com/blog/the-anatomy-of-an-agent-harness>
  Cited by: [§1](#S1.p4.1 "1 Introduction ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement"),
  [§7](#S7.SS0.SSS0.Px1.p1.1 "Agent loops and harnesses. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [21]
  K. Wang, H. Jie, Y. Yan, J. Zhou, and Z. Heng (2026)
  EV-WM: event-verified world models for long-horizon robotic manipulation.
  arXiv preprint arXiv:2606.13053.
  External Links: [Document](https://dx.doi.org/10.48550/arXiv.2606.13053),
  [Link](https://arxiv.org/abs/2606.13053)
  Cited by: [§7](#S7.SS0.SSS0.Px3.p1.1 "World models and diagnosis. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [22]
  K. Wang, H. Jie, Y. Yan, J. Zhou, and Z. Heng (2026)
  Ontology-grounded world models for failure diagnosis and closed-loop repair in physical AI systems.
  arXiv preprint arXiv:2608.13901.
  External Links: [Document](https://dx.doi.org/10.48550/arXiv.2608.13901),
  [Link](https://arxiv.org/abs/2608.13901)
  Cited by: [§7](#S7.SS0.SSS0.Px3.p1.1 "World models and diagnosis. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [23]
  W. Wang, W. Zhang, Y. Lin, Y. Yuan, T. Lin, J. Mao, Z. Fan, M. Gao, Y. Dai, W. Li, Z. Lv, Z. Dong, Y. Niu, J. Zhu, J. Xiao, C. Li, and Y. Zhuang (2026)
  EmbodiedSkills: a unified framework for orchestrating, training, and deploying VLA agents.
  arXiv preprint arXiv:2609.01281.
  External Links: [Link](https://arxiv.org/abs/2609.01281)
  Cited by: [§1](#S1.p6.1 "1 Introduction ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement"),
  [§7](#S7.SS0.SSS0.Px2.p1.1 "Guarded execution. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [24]
  Y. Yan, Z. Heng, H. Jie, G. Liu, H. Yan, and W. Zhou (2026)
  Harness Robotic OS: a unified embodied-agent runtime for closed-loop quadruped inspection.
  arXiv preprint arXiv:2609.11225.
  External Links: [Document](https://dx.doi.org/10.48550/arXiv.2609.11225),
  [Link](https://arxiv.org/abs/2609.11225)
  Cited by: [§1](#S1.p3.1 "1 Introduction ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement"),
  [§5](#S5.p3.1 "5 Implementation ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement"),
  [§7](#S7.SS0.SSS0.Px8.p1.1 "Embodied runtimes and memory. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [25]
  S. Yao, J. Zhao, D. Yu, N. Du, I. Shafran, K. Narasimhan, and Y. Cao (2023)
  ReAct: synergizing reasoning and acting in language models.
  In International Conference on Learning Representations,
  External Links: [Link](https://arxiv.org/abs/2210.03629)
  Cited by: [§1](#S1.p4.1 "1 Introduction ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement"),
  [§7](#S7.SS0.SSS0.Px1.p1.1 "Agent loops and harnesses. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [26]
  H. Zhang, S. Zhang, K. Li, C. Zhang, Y. Chen, Y. Zhang, L. Bai, and S. Hu (2026)
  Self-Harness: harnesses that improve themselves.
  arXiv preprint arXiv:2606.09498.
  External Links: [Link](https://arxiv.org/abs/2606.09498v3)
  Cited by: [§7](#S7.SS0.SSS0.Px1.p1.1 "Agent loops and harnesses. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [27]
  Z. Zhao, Y. Feng, Y. Yang, C. Wang, H. Xiao, H. Zhang, C. Cheng, and J. Ma (2026)
  CommitFlow: semantic commitment verification and local correction for long-horizon robot manipulation VLA execution.
  arXiv preprint arXiv:2609.21908.
  External Links: [Link](https://arxiv.org/abs/2609.21908)
  Cited by: [§1](#S1.p6.1 "1 Introduction ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement"),
  [§7](#S7.SS0.SSS0.Px2.p1.1 "Guarded execution. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").
* [28]
  X. Zhou, L. Liu, T. Xiao, W. Feng, F. Fu, X. Meng, X. Wang, J. Han, B. Yu, Y. Du, W. Sui, and Z. Su (2026)
  HoloAgent-0: a unified embodied agent framework with 3D spatial memory.
  arXiv preprint arXiv:2606.23565.
  Cited by: [§1](#S1.p6.1 "1 Introduction ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement"),
  [§7](#S7.SS0.SSS0.Px8.p1.1 "Embodied runtimes and memory. ‣ 7 Related Work ‣ RegenHarness: A Robot Agent Harness withEvidence-Gated Recursive Self-Improvement").

Experimental support, please
[view the build logs](./2609.27612v1/__stdout.txt)
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
