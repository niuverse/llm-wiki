HarnessEval-W: Agentifying the Evaluation of
Visual Worlds

Authors

∗

∗

Jun Gao

Haowen Sun

∗ † Jiawei Chi Hanyang Wang Qiyu Dai Yihao Li Hao Li
Weiliang Chen
Jingnan Gao Yi-Hsin Hung Xingzhuo Guo Shangchen Miao Zhiyuan Shi Xiang Li Fengrui Tian
Shizun Wang
Weihua Du
Xi Wang Tianqi Zhang Xue Luo Xiyin Ren Jinshan Ren Xiaoyang Shen Xiaobo Hu Zhiyang Dou
Mingyu Ding Yichao Yan Xinchao Wang Yizhou Wang Shilong Liu Wenzhao Zheng Yueqi Duan
Yuan Gong Ziwei Liu Ming-Yu Liu Jialong Wu† Jiangran Lyu† Fangfu Liu†

Siqiao Huang Mingyu Liu

Shenyuan Gao

Ziqi Huang

Yifei Li

∗

Co-First Authors

†Co-Project Leads

Abstract

A benchmark should deliver more than a scalar score: what makes an evaluation trustworthy is
the reasoning that justifies the score. This is especially critical for world models, where judging a
rollout requires understanding whether physics, causality, and world state evolve correctly. Humans
spot such violations naturally, yet no existing benchmark automates this capability: metrics are
computed brute-force, leaving no reasoning chain that can be examined or verified. We introduce
HarnessEval-W, an agentified evaluation pipeline that brings the harness paradigm from the LLM
ecosystem to world model benchmarking. Rather than applying a fixed rubric, HarnessEval-W
interprets the context of each evaluation case, decomposes the evaluation question into measurable
subproblems, and spawns specialized sub-agents, each equipped with tailored context and diagnostic
tools to reason over its own subproblem. The parent agent then validates the gathered evidence
and summarizes it into the final verdict. This hierarchical workflow turns every evaluation into a
transparent evidence tree whose complete reasoning chain justifies the result. We apply HarnessEval-
W to 18 representative world models over 330 evaluation cases. Its judgments closely align with
human preferences while providing verifiable, fine-grained diagnoses of every generated rollout. We
open-source the full pipeline as a live benchmark and invite the broad community to contribute to
grow new skills and evaluation cases as world models evolve.

Date: August 18, 2026

Blog: https://mirros.ai/blog/harnesseval

Code: https://github.com/mirros-lab/harnesseval-w

Project Page: https://mirros-lab.github.io/HarnessEval-W

1

arXiv:2608.16859v1  [cs.CV]  17 Aug 2026HarnessEval-W: Agentifying the Evaluation of Visual Worlds

Figure 1 HarnessEval-W. The agentified benchmarks for interactive world models. Given an evaluation case,
HarnessEval-W routes it to the appropriate skills, decomposes each skill into measurable sub-questions answered
by specialized sub-agents, and aggregates the validated evidence into a final score that traces back to the exact
sub-questions that failed.

1 Introduction

Benchmarks set the North Star of technology development, guiding the frontier of exploration. Yet,
evaluating world models remains a fragile practice, particularly when assessing physical causality, geometric
consistency, and observation realism in the generated videos. While humans can easily analyze and spot
the artifacts in the generated content, such a capability has never been successfully automated and
achieved in existing benchmarks for world models. As a consequence, existing evaluation benchmarks
offer limited persuasive power: the reported scores can be neither explained nor verified, and provide little
insight into where and why a model fails.

In this paper, we bring a concept from the LLM ecosystem to the benchmark community: the evaluation
harness. A harness is more than a code wrapper; it provides the robust scaffolding to power fully
agentic pipelines by formalizing complex human workflows, such as evidence gathering, tool use, and
reasoning. Human evaluation is also a workflow, and can therefore be harnessed. When humans evaluate a
generated world, we do not merely glance at the static image; we intuitively locate the object, track object
permanence across time, and verify causal relationships as well as geometric constraints. We conceptualize
this workflow as an agentic pipeline: a benchmark agent that actively interprets the intent of the actions
performed in the world model, hunts for spatiotemporal evidence in the generation, and spawns specialized
sub-agents, each equipped with dedicated context and diagnostic tools to investigate a different aspect
of the model’s output. This design moves beyond the static Q&A probing of existing benchmarks and
instead produces an inspectable reasoning sequence behind every score.

To realize this vision of agentic evaluation, we introduce HarnessEval-W: our agentic benchmark to
evaluate interactive world models. Evaluating a world model is highly context-dependent: every test case
instantiates a unique world with different physical actions, temporal structures, and observation states,
so no fixed rubric fits all cases. HarnessEval-W therefore operates hierarchically. At the top level, it
interprets the context of each evaluation case and routes it to the skills that can legitimately evaluate
it. Once a skill is assigned, the evaluation question is further decomposed into measurable subquestions,

2

Evaluation PipelineAn extra gripper and spoon are introduced. Model CModel BModel ABoth grippers hold the spoon, even though the left gripper is instructed to remain low. no extra event    intended change0.582     no extra event0.7500.913Data ConstructionTaxonomy Sampling Agentic GenerationScore & Validation    Skill Library    Eval Axes       Case-specific          Routing       Sub-agent        ReasoningBut, whylow score?Reasonable EvalI performhumanlikereasoning！The primary response matches the requested gripping action without extra intentions! Low score in Sub-agent: Low score in Sub-agents:High score in all Sub-agents！Initial ImagePromptMake the robot's right gripper lift the wooden spoon from the light-gray counter and hold it hovering above the clear glass mixing bowl, while the left gripper remains low at the bottom edge of the frame. HarnessEval-W: Agentifying the Evaluation of Visual Worlds

each delegated to a suitable sub-agent or tool: when evaluating a collision, for instance, the agent tracks
bounding boxes, verifies temporal intersection, and estimates velocity. The parent agent validates the
evidence returned by all sub-agents before merging it into the final verdict, and this pipeline can run
recursively as sub-agents spawn their own investigations. The outcome is not merely a scalar score but a
transparent evidence tree, which meticulously records exactly what was tested, which specific tool supplied
the visual grounding, and the complete logical chain that justifies the final score.

In HarnessEval-W, we construct a benchmark of 330 evaluation cases organized around the three core
functions of a world model: rendering observations from the current state (Observation Quality), updating
the state under interventions (Transition Correctness), and maintaining the state over time (World
Persistence). The cases are authored by an agentic construction pipeline that samples diverse initial worlds
from a structured scene taxonomy, grounds concrete actions in the generated scenes, and validates every
candidate case before acceptance. We evaluate 18 representative world models, spanning general-purpose
video generators and interactive world simulators. The evaluation ordering from HarnessEval-W aligns
well with human preferences. Our analysis further reveals that adapting a video generator into a world
model redistributes capability across settings rather than uniformly improving it.

We believe the future of benchmarking is no longer a black-box metric with a static rubric, but an
intelligent evaluator that decomposes the problem, assembles the right tools, and reasons over every
evaluation case. We open-source HarnessEval-W as a living benchmark: an executable agentic system
that grows new skills and evaluation cases as world models evolve. We invite the broader community to
contribute to this agentic benchmark workflow together.

2 Related Works

2.1 Video Generation and Interactive World Models

Modern video generation models have become increasingly capable of producing high-fidelity and temporally
coherent sequences from text or image conditions. The field has progressed from U-Net-based approaches
such as Video Diffusion Models [1] and latent diffusion systems such as Align Your Latents [2] to scalable
diffusion transformer architectures, including CogVideoX [3], HunyuanVideo [4], and Wan [5]. These
advances have improved visual fidelity, prompt adherence, temporal coherence, and generation horizons,
providing strong visual priors for simulating observable worlds. Nevertheless, most video generators remain
designed for open-loop synthesis, producing clips from fixed conditions without repeatedly incorporating
external actions or maintaining an evolving world state. This limitation separates the synthesis of plausible
visual sequences from the modeling of worlds that respond coherently to interaction.

Interactive video world models bridge this gap by conditioning future observations on actions and placing
generation within a closed interaction loop. Classical approaches [6–8] learn compact latent dynamics for
planning and control, whereas recent generative systems predict action-conditioned futures directly in pixel
space. This direction includes game-centered systems such as Genie [9], GameNGen [10], DIAMOND [11],
and MineWorld [12], as well as more open-ended models supporting language, camera, and keyboard-
and-mouse control, including YUME 1.5 [13], HY-World 1.5 (WorldPlay) [14], LingBot-World [15], and
Matrix-Game 3.0 [16]. Despite their different control interfaces, interactive world models must be assessed
not only by the reliability of their generated observations, but also by whether actions produce the intended
semantic, geometric, and physical transitions and whether visible and offscreen state remains coherent
over long rollouts. Accordingly, we structure HarnessEval-W’s evaluation around three complementary
axes: Observation Quality, Transition Correctness, and World Persistence.

2.2 Benchmarking Video Generators and Interactive Worlds

Benchmarking an interactive world begins with visual and temporal reliability, because later judgments of
dynamics and persistence depend on usable rendered observations. VBench [17] decomposes video quality
across imaging, aesthetics, temporal stability, subject and background consistency, motion, and prompt
consistency, with dimension-wise human validation. EvalCrafter [18] complements this taxonomy with
visual, content, motion, and text-video metrics calibrated by user judgments. FETV [19] uses temporally
aware prompts and human ratings to expose metric weaknesses, while Video-Bench and VBench++ [20,
21] extend coverage through MLLM judging, image-to-video generation, and trustworthiness.

3

HarnessEval-W: Agentifying the Evaluation of Visual Worlds

Figure 2 Overview of the HarnessEval-W evaluation pipeline. Given a case with its prompt and evaluation setting,
the agentic planner routes the case to applicable skills from the skill library, recording an evidence-grounded
reason for every activated and skipped skill (e.g., the Offscreen Evolution Verifier is skipped because all requested
actions remain visible). Each activated skill spawns sub-agents that inspect the world model rollout for specific
sub-questions, such as target visibility and final state validity; here, the Intentional Change Verifier detects an
unrelated human intervention picking up the cube and zeroes the no-extra-event score. The collected evidence is
finally aggregated into per-dimension scores and an interpretable final score.

Reliable rendering is only the first step, as world realism also requires physically and behaviorally plausible
content. VBench-2.0 [22] covers human fidelity, controllability, creativity, physics, and commonsense,
while VideoPhy [23], PhyGenBench [24], and PhyWorldBench [25] test material interactions, physical-law
reasoning, and composite or anti-physical scenarios. Together, they distinguish realistic appearance from
behavior compatible with the depicted world.

Interactive-world benchmarks then make actions explicit and assess whether controls produce the intended
changes. WorldScore [26] compares 3D, 4D, and video generation on camera-specified next scenes, while
related benchmarks test instruction and physics adherence and whether futures support intended controls
[27, 28]. WorldMark and complementary suites standardize interfaces and evaluate generation, trajectories,
memory, and causal effects [29–31]. Downstream benchmarks such as WorldArena cover data generation,
policy evaluation, planning, closed-loop success, and multi-turn interaction under human-validated quality,
adherence, consistency, and physics metrics [32–34].

Evaluation next asks whether locally valid transitions preserve one consistent, evolving world over longer
horizons. WorldScore and WorldMark evaluate geometric, appearance, and state consistency through
camera specifications, reprojection, and long trajectories [26, 29]. Revisitation suites expose drift through
return paths and long-context reconstruction [30, 34, 35], but cannot determine whether hidden state
evolves offscreen. MemoBench and related benchmarks test offscreen updates, re-observation correctness,
and extended action, physics, and memory rollouts [36–38].

Across all evaluation targets, evaluation reliability is a cross-cutting requirement. MUSIQ and related tools
extract frame-quality, camera-motion, return-observation, and mask evidence [39–42], while VLMEvalKit
and other toolkits support reproducible pipelines [43–45]. Because such pipelines are fixed, interactive
worlds require adaptive applicability, execution, and aggregation, motivating agentic evaluation.

2.3 Agentic Evaluation

Most existing benchmarks predefine what to test, how to extract evidence, and how to validate and
aggregate scores. In interactive worlds, these choices are state dependent because available controls and
earlier outcomes determine what can be tested next. This motivates agentic evaluation, in which the
evaluator selects, executes, and revises probes as evidence accumulates. In LLM evaluation, model-based
judges [46] provide a useful precedent by applying natural-language criteria, although they typically assess
supplied outputs under fixed prompts. More recent agentic evaluators extend this role to test construction,
evidence acquisition, tool use, memory, and verification [47–52]. In this setting, agency lies in controlling
the evaluation trajectory rather than merely replacing a metric with a model-based judge.

In visual generation, this procedural view extends to selecting which prompts to sample, which regions
or frames to inspect, and which tools to apply. Adaptive testing methods [53–55] support this process
by revising prompts and subsequent probes using feedback from sampled outputs. Tool-grounded image
evaluators [56–58] organize fine-grained evidence across generation and multi-turn editing, while temporally

4

Case InformationCase-specific Skill Routing Intentional Change... The case is an intentional transition since the right gripper must lift the cube above the tray...Offscreen EvolutionAmong all skills, I will choose these skills because ....Render QualityPhysical Plausibility..., and I will not use other skills because ...Sub-Agent Reasoning [Evaluation Setting]Intentional transition[Prompt]Have the right gripper lift the cube, which is above the tray.Drift Degradation... ...... ...Gen. Video I rate <target specificity> 1.00, since ...I rate <final state> as 0.25, because ...I rate <no extra event> as 0.00, because the rollout introduces an unrelated human intervention to pick up the cub!... Above and other sub-agents average: 0.485 Final ScoreRenderMotionConsistencyPhysicalIntentionalAggregatedScore0.650.500.610.490.580.90HarnessEval-W: Agentifying the Evaluation of Visual Worlds

aware video evaluators [59, 60] combine structured criteria with localized evidence. Reusable evaluation
frameworks [61] further externalize evaluation knowledge as revisable libraries of tools and skills. Together,
these methods make prompts, rubrics, and evidence acquisition adaptive, but largely remain within
prompt-conditioned image or video generation and editing.

HarnessEval-W extends this adaptive logic to interactive worlds through reusable evaluation skills. Each
skill defines its applicability, evidence, scoring, validation, and aggregation, allowing probes to be selected
and revised as a rollout unfolds. This separation keeps unsupported or invalid measurements out of the
score while preserving genuine model failures as negative evidence. Such safeguards are important because
insufficient evidence, unreliable state verification, and benchmark design choices can distort evaluation
outcomes [62, 63]. HarnessEval-W thus unifies Observation Quality, Transition Correctness, and World
Persistence within an auditable, adaptive process.

3 HarnessEval-W: Agent Evaluation Harness

3.1 Overview

Figure 2 illustrates the overall pipeline of our agentic evaluation harness for interactive world models. The
core idea of HarnessEval-W is to decompose the monolithic task of evaluation into distinct, actionable
subproblems. We first formalize the definition of world models and decompose their capabilities into
three evaluation axes: observation quality, transition correctness, and world persistence. Our hierarchical
agentic workflow then evaluates world models along detail evaluation settings from these three axes.

3.2 The Formulation of Interactive World Models

Following common practice in the literature [6, 7, 64], we formulate an interactive world model as predicting
future observations conditioned on historical observations and user-specified actions. Any model that
supports this interface can be evaluated by our benchmark, including but not limited to bidirectional
video diffusion models and autoregressive video models. Formally, given initial observations {oi}0
and
as follows, leveraging
future actions {ai}t−1
i=0
the hidden states {si}t

, we decompose the distribution of future observations {oi}t
i=0

of the world model:

i=−T

i=1

P (o1, · · · , ot | o−T , · · · , o0; a0, · · · , at−1) ∝ P (s0 | o−T , · · · , o0)

t
Y

i=1

S(oi | si) T (si | si−1, ai−1),

(1)

where the distribution of future observations is obtained by marginalizing the hidden states. Here S(oi | si)
models the observation likelihood conditioned on the current state, T (si | si−1, ai−1) refers to the state
transition conditioned on the given action, and P (s0 | o−T , · · · , o0) is the initial state distribution inferred
from historical observations. An action can be an exploratory viewpoint change, an intentional change to
a specified entity or event, or a physical intervention.

3.3 What to Test: Evaluation Axes

The factorization in Equation (1) exposes three basic abilities of a world model: rendering observations
from the current state (S), updating the state under actions (T ), and maintaining a coherent state
sequence over time ({si}t
). As illustrated in Table 1, we construct three corresponding evaluation axes
with eight detail evaluation settings in HarnessEval-W.

i=0

Observation Quality refers to whether the rendered observation of the current world state is visually
reliable. It covers perceptual quality, temporal coherence, and the readability of state-relevant entities,
attributes, relations, and events. Observation quality reflects the action-agnostic generation capability of
a world model and is the foundation on which all further evaluation rests.

Transition Correctness focuses on whether the state transition faithfully executes the requested actions at
the appropriate time. We evaluate three transition types: Exploratory transitions change the observer’s
viewpoint or position in the world; Intentional transitions change a specified entity, relation, or event; and
Physical transitions test whether a physical intervention produces the corresponding dynamical response.

5

HarnessEval-W: Agentifying the Evaluation of Visual Worlds

Table 1 Evaluation axes of HarnessEval-W. Derived from the factorization in Equation (1), the three evaluation
axes decompose into eight detailed settings, each anchored by the core world-state question it answers.

Evaluation Axis

Detail Evaluation Settings

Core World-state Question

Observation Quality

Render Quality

Physical Observation

Exploratory Transition

Transition Correctness

Intentional Transition

World Persistence

Physical Transition

Drift Resistance

Revisit Consistency

Offscreen Evolution

Is the rollout video coherent, stable, and suffi-
ciently readable to serve as evidence?
Is each rendered frame from hidden state struc-
turally and physically plausible?

Does the requested viewpoint change occur while
the world remains compatible?
Does the specified target change while protected
state remains stable?
Does a physical intervention produce the corre-
sponding dynamical response?

Do invariant objects survive a long rollout?
Does a place or entity remain compatible after
leaving and returning?
Does an unobserved endogenous process continue
rather than freeze or reset?

World Persistence evaluates whether the sequence of predicted states remains coherent as the world
evolves. It includes three representative settings: Drift Resistance tests whether overall layout, style, and
appearance remain consistent across a long rollout; Revisit Consistency tests whether a location or object
remains the same after the observer leaves and returns; and Offscreen Evolution examines whether an
endogenous process continues while temporarily unseen. Persistence does not require the world to remain
frozen. Instead, stable properties must stay invariant, while dynamic properties should continue to evolve
consistently with actions and time.

3.4 How to Test: Hierarchical Agentic Evaluation

The evaluation of world models is highly context-dependent: each test case is a distinct world with its
own actions, temporal structure, and observable state, so a fixed rubric applied uniformly across cases
would either ask irrelevant questions or miss case-critical context. We therefore design a hierarchical
agentic workflow that generates a reasoning trace grounded in the context of each case, as shown in
Figure 2. Specifically, HarnessEval-W first routes each case to the appropriate skills according to the case
context and evaluation intention. Each skill is an intelligent agent that decomposes its evaluation problem
into measurable sub-questions, delegates them to sub-agents that interpret the world from specialized
perspectives, and finally the parent agent validates and aggregates the collected evidence into the final
score.

Case-specific Skill Routing. The evaluation begins by interpreting the case context, including the initial
image, action prompt, and evaluation setting. Based on this context, HarnessEval-W routes the case
to one or more reusable skills drawn from a predefined skill library as shown in Figure 3 (left). Each
high-level skill is tailored to a specific evaluation type, ensuring that we ask the right high-level questions
for each unique world instead of a one-size-fits-all question. The skill library is designed to be extensible:
new skills can be added as new evaluation needs arise, without changing the overall framework. Note that
the routing process depends only on the case context and evaluation intention and is independent of the
world model being evaluated, so the same routing is applied to all models on the same case, ensuring the
evaluation is fair and unbiased.

Sub-agent Reasoning. Once a high-level skill is assigned, HarnessEval-W performs a granular evaluation via
sub-agents rather than issuing a single holistic evaluation. Specifically, for each high-level skill, we further
decompose the evaluation into a set of sub-questions that can be answered by specialized sub-agents. Each
sub-agent is then only responsible for one specific aspect of the evaluation, such as checking target visibility
or confirming that a visible transition occurs, and returns a discrete score together with diagnostics. The
parent skill agent then aggregates these outputs into a structured evidence tree and produces the case
score. This hierarchical design ensures that the reasoning trace records not only the final answer but also

6

HarnessEval-W: Agentifying the Evaluation of Visual Worlds

Figure 3 Hierarchical structure of sub-agent reasoning for high-level skills. The Intentional Change Verifier skill
decomposes its evaluation into eight measurable sub-questions, each answered by a dedicated sub-agent that
inspects the rollout evidence and returns a discrete score with its reasoning.

the supporting evidence behind it.

As shown in Figure 3, we take Intentional Change Verifier as an example. HarnessEval-W further
decomposes this high-level skill through multiple sub-agents with detail questioning. Before querying these
specific sub-agents, an extra sub-agent first predicts and reasons about the expected outcome from the
case context. Guided by this specification, parallel sub-agents then inspect the rollout for target visibility,
visible transition occurrence, and target correctness, while additional branches examine the final state,
anchor preservation, extra events and overall judgeability. Since each sub-agent scores the rollout against
its specific expectation, the final score remains interpretable: a low score can be traced back to a concrete
failure, e.g., the wrong target or including extra unrelated events. We provide specific cases in Section 5.

The ultimate goal of our agentic workflow is not just to provide a scalar score indicating model performance,
but a transparent evidence tree, which meticulously records exactly what was tested, which specific tool
supplied the visual grounding, and the complete logical chain that justifies the final score. This interpretable
paradigm further delivers actionable insights, helping researchers pinpoint exact failure modes and guiding
future model development.

4 HarnessEval-W Case Construction

Overall Pipeline. To probe the limits of world models, a benchmark must reflect the complexity and
diversity of real-world environments, demanding a wide spectrum of evaluation cases. However, manually
authoring such cases is hard to scale while keeping every case diagnosable and every intervention verifiable.
In practice, we therefore need both real-world data and synthetic cases that are diverse and realistic. To
this end, we design our agentic HarnessEval-W case construction pipeline, illustrated in Figure 4. The
pipeline first samples an initial world setup from a predefined scene taxonomy and probe family, and then
employs a series of agents for world generation, action planning, and case validation.

Scene Taxonomy Sampling. To provide complete and diverse descriptions for world initialization, we
develop a structured scene taxonomy with six complementary axes: 1) Environment represents the basic
background setting, organized into indoor (e.g., living room, office), outdoor (e.g., traffic intersection),
and transitional (e.g., doorway, building entrance) categories; 2) Foreground specifies the dominant visible
entities that can be manipulated or serve as landmarks, such as people, vehicles, articulated objects, and
physical apparatuses; 3) Midground refers to the spatial structure in which an interaction takes place, such
as a corridor, sidewalk, workbench, road, or shoreline; 4) Scene Density controls the amount of clutter and
objects while preserving the readability of case-critical entities; 5) Appearance ranges from photorealistic
and cinematic rendering to game-engine, stylized-3D, and anime domains; 6) Perspective specifies the
observer’s relationship to the world, including first-person and third-person views. During construction,
a sampler selects a compatible combination of taxonomy values to instantiate a concrete world. It also
checks basic semantic compatibility, rejecting combinations whose entities or spatial structures cannot
support the selected interaction.

Probe Family Assignment. In addition to the scene taxonomy, we assign each case a probe family that
specifies its interaction type and the evidence expected for evaluation. The six case families correspond

7

Target VisibleIs the target is clearly visible and localizable in the evidence frames?Transition VisibleDoes a visible transition occur, not just a static image?Intended ChangeDoes the requested intended change actually occurs in the video?Target SpecificityDoes the change happens to the correct target, not a wrong object?Final StateDoes the final visible state matches the action and expected outcome?Anchor PreservationDo protected anchors and unrelated objects remain in same world state?No Extra EventDoes the rollout avoid extra events, reset, hard cut, or unrelated edits?JudgeableIs the video clear, continuous, and sufficiently observable to judge?Render QualityInspectorPhysicalPlausibilityInspectorPhysicalResponseVerifierPhysical Dynamics VerifierViewpointTrajectoryVerifierIntentional Change VerifierMotion Quality InspectorAppearance Consistency Inspector. . .High-level Skill LibrarySub-agent Reasoning QuestionsHarnessEval-W: Agentifying the Evaluation of Visual Worlds

Figure 4 Overview of the HarnessEval-W data construction pipeline. We first sample an initial world setup from
a predefined scene taxonomy and probe family, and then employ a series of agents for world generation, action
planning, and case validation.

to the Transition Correctness and World Persistence settings in Table 1, while Observation Quality is
evaluated in every case and therefore does not constitute a separate family. Each probe family imposes its
own requirements on the sampled scene: 1) Exploratory Transition requires a traversable route, an open
region, or stable spatial anchors that support a viewpoint or navigation change; 2) Intentional Transition
requires a clearly visible target with an identifiable initial state and a localized edit, relation change, or
event; 3) Physical Transition requires visible support, contact, and motion relationships, together with
state variables whose response can be inspected; 4) Drift Resistance requires the overall layout, style, and
appearance remain consistent across a long rollout; 5) Revisit Consistency requires a recognizable location
or object and a valid path that takes the observer away before returning; 6) Offscreen Evolution requires an
endogenous process—for example, traffic, smoke, or flowing water—that should continue while temporarily
unobserved. The assignment is therefore constrained by scene affordances: exploratory transitions are
preferentially assigned to scenes with routes and spatial landmarks, while intentional transitions require
scenes with clearly visible targets.

Agentic Case Authoring. With the sampled scene taxonomy and probe family as world metadata, we
leverage a series of agents to make case construction efficient at scale while retaining quality control:

• Image Generator. The sampled metadata is converted into a structured image-generation prompt,
which is fed to a generation model to create the initial image. This image serves as the initial observation
for the world model.

• Image-grounded Planner. The planner grounds a concrete action in the visible world. Taking the
generated image as input, it specifies the actions for the case, including the text instruction, camera
trajectory, control sequence, rollout plan, and physical parameter conditions. It ensures the action is
meaningful, diagnosable, and supported by observable evidence via image-grounded reasoning. The
planner cannot change the assigned probe family or introduce entities absent from the image.

• Case Validator. A separate validation agent audits the proposed image–action pair. It verifies that the
target is visible and identifiable, the action is feasible in the depicted world, the expected outcome
is sufficiently specific, and the rollout will contain evidence adequate for the assigned probe. Taking
revisit and offscreen cases as examples, it checks that the return path or hidden process is well defined.
Candidates that fail the validity gate are returned to the sampler for resampling or regeneration rather
than being silently retained. This validation loop is valuable not only for quality control but also for
scalability: it concentrates expensive reasoning on ambiguous candidates while allowing the majority of
case authoring steps to be automated.

Benchmark Composition. Following the construction pipeline, we instantiate a benchmark of 330 cases
spanning diverse initial worlds and interaction patterns. As shown in Figure 5, the released cases cover a
broad range of environments, foreground entities, spatial layouts, scene densities, visual appearances, and
perspectives. The keyword cloud summarizes the dominant scene content, while the horizon panel shows
how the six probe families distribute across short intervention cases and longer persistence-style rollouts.

Beyond scene diversity, HarnessEval-W covers six complementary probe families with different interaction
horizons: transition-oriented cases range from direct state or physical interventions to short exploratory
rollouts, while persistence-oriented cases require longer trajectories to assess drift resistance, revisit
consistency, and offscreen evolution. Together, these cases evaluate both immediate world-state transitions
and the consistency of world dynamics over time.

8

Scene Taxonomy• Environment• Foreground• Midground• Scene Density• Appearance• Perspective  GeneratorProbe Family• Explor. Trans.• Intent. Trans.• Physic. Trans.• Drift Resist.• Return Consist.• Offscreen Evol.+Scene & Probe SamplingPlannerAgentic Case Authoring    ValidatorImage & SampleInitial ImagePrompted SampleText-to-Image GenerationImage-groundedLLM PlanningPlanning ActionsImage & ActionsLLM Scoring& ValidationValidation ResultInvalid ResampleValid CaseIDEval        SettingInit        ImagePromptActionHarnessEval-W: Agentifying the Evaluation of Visual Worlds

Figure 5 Statistics of the HarnessEval-W cases. (a) Case taxonomy distribution in HarnessEval-W. (b) Keyword
frequency over scene descriptions. (c) Probe family distribution.

5 Experiments and Analysis

In this section, we first introduce the experimental setup (Section 5.1) and report how current world
models rank under HarnessEval-W, together with the qualitative reasoning traces behind the scores
(Section 5.2). We then evaluate the evaluator itself, including the alignment with human preferences,
advantage over existing evaluation benchmarks, and evaluation robustness (Section 5.3). Finally, we
analyze the correlations among evaluation axes and how capabilities shift under finetuning (Section 5.4).

5.1 Experimental Setup

Evaluated World Models. We evaluate 18 representative world models, spanning general-purpose video
generative models and models designed for interactive world simulation. For each model, we use the
released checkpoint or the official API and retain its native conditioning interface.

Evaluation cases. All models are evaluated on the same frozen set of 330 HarnessEval-W cases. Each case
specifies an initial observation, an interaction, and the world-state question to be evaluated. Since the
models expose different conditioning mechanisms, we translate each interaction into the model’s native
input form—a text instruction, camera trajectory, or control sequence—preserving the case intent and
evaluation target while allowing each model to operate through its intended interface.

Evaluation Process. We evaluate every generated rollout with the HarnessEval-W evaluation harness
shown in Figure 2. For each evaluation case, the harness interprets the assigned world-state question,
selects a primary evaluation skill, and composes the supporting skills needed for that specific case. After
that, each skill decomposes the question into measurable subproblems, delegates them to specialized
sub-agents or tools, and validates the collected evidence before producing a score. All sub-agents use a
VLM with the same backend, temperature, and frame-sampling configuration.

Evaluation Metrics. Following Table 1, we design our 8 metrics in correspondence with 8 evaluation
settings, i.e., Render Quality (Obs-R), Physical Observation Quality (Obs-P), Exploratory Transition
Correctness (Trans-E), Intentional Transition Correctness (Trans-I), Physical Transition Correctness
(Trans-P), Drift Resistance (Pers-D), Revisit Consistency (Pers-R) and Offscreen Evolution (Pers-O).
Each metric originally ranges from 0 to 1, and we use a normalized final score ranging from 1 to 100 for
clear representation. The observation-related metrics (i.e., Obs-R and Obs-P) are evaluated for every case
and averaged across all 330 cases, while other metrics are only averaged over the subset of cases with the
corresponding probe family. The overall score is computed by averaging the case-level scores.

5.2 Main Results

We first demonstrate our HarnessEval-W leaderboard in Table 2. All 18 models are evaluated on the
same 330 cases. We cover three types of world models: general-purpose video generators driven by a text
instruction, and autoregressive video models driven by camera pose or by native action controls. As all
types of models are evaluated on the same questions with the same cases, we report them in a single table

9

ExploratoryIntentionalPhysicalDriftRevisitCase Count(b) Keyword Frequency(a) Case Taxonomy Distribution(c) Probe Family StatisticsOffscreenProbe FamilyHarnessEval-W: Agentifying the Evaluation of Visual Worlds

Table 2 HarnessEval-W main leaderboard. All models are evaluated on the same case set and grouped by
conditioning interface. Overall is the arithmetic average of the 330 cases. The gray label below each score gives its
column-wise rank across all 18 models. Purple backgrounds mark first, second, and third place from darkest to
lightest. Close-source methods are annotated with ∗.

Model

Interface

Observation

Transition

Persistence

Obs-Q

Obs-P

Trans-E

Trans-I

Trans-P

Pers-D

Pers-R

Pers-O

Overall

Seedance 2.0∗ [65]

Prompt I2V

Wan 2.7∗ [5]

Prompt I2V

Kling 3.0∗ [66]

Prompt I2V

MiniMax H3 [67]

Prompt I2V

Grok Imagine 1.5∗ [68] Prompt I2V

FLUX 3∗ [69]

Prompt I2V

Cosmos3-Super [70]

Prompt I2V

HunyuanVideo 1.5 [71] Prompt I2V

Wan 2.2 [5]

Prompt I2V

LTX-2.3 [72]

Prompt I2V

SANA-WM [73]

Native action

ABot-World [74]

Native action

DreamX-World [75]

Native action

LingBot World v2 [15] Camera pose

Lyra 2 [76]

Camera pose

Fantasy-World [77]

Camera pose

HY-WorldPlay 1.5 [14] Camera pose

InSpatio-World [78]

Camera pose

83.6
#2

80.9
#8

82.1
#4

81.5
#6

85.1
#1

81.7
#5

83.5
#3

80.0
#11

80.4
#10

78.4
#16

81.0
#7

77.7
#17

78.5
#15

80.5
#9

79.5
#12

74.1
#18

79.4
#13

79.0
#14

61.8
#7

58.8
#16

60.6
#12

61.3
#9

60.6
#12

61.6
#8

61.0
#10

59.0
#15

58.6
#17

54.5
#18

62.3
#6

60.8
#11

60.6
#12

63.3
#3

64.0
#2

62.7
#5

64.6
#1

63.0
#4

80.2
#7

78.7
#9

79.1
#8

77.7
#11

76.4
#14

76.4
#14

77.9
#10

77.6
#12

77.2
#13

73.8
#16

82.5
#2

83.5
#1

81.8
#4

81.5
#5

80.7
#6

73.2
#17

82.0
#3

70.7
#18

81.8
#3

83.6
#1

82.6
#2

81.7
#4

80.2
#5

79.0
#6

75.1
#7

73.2
#8

62.0
#9

60.4
#10

50.6
#13

49.0
#16

50.0
#14

56.8
#11

48.9
#17

52.4
#12

49.9
#15

48.6
#18

63.5
#4

71.1
#1

63.2
#5

66.9
#2

66.7
#3

63.2
#5

60.2
#7

57.2
#8

55.1
#9

53.3
#10

47.6
#13

45.7
#15

47.4
#14

49.8
#11

45.1
#18

48.9
#12

45.5
#17

45.6
#16

79.8
#1

74.3
#16

77.2
#9

77.0
#11

79.1
#4

77.1
#10

77.6
#6

76.5
#12

76.0
#14

72.4
#17

78.9
#5

76.3
#13

77.5
#8

79.5
#2

77.6
#6

69.9
#18

79.3
#3

74.5
#15

76.8
#5

68.5
#15

75.4
#7

72.3
#9

70.9
#11

70.2
#13

70.6
#12

69.5
#14

66.5
#17

63.3
#18

78.8
#3

72.0
#10

73.1
#8

75.8
#6

79.7
#2

68.4
#16

81.9
#1

77.0
#4

68.9
#2

65.9
#8

66.2
#6

67.2
#4

64.5
#10

67.4
#3

66.8
#5

63.2
#12

63.4
#11

57.7
#15

72.3
#1

60.8
#14

65.4
#9

66.1
#7

56.4
#16

53.8
#18

61.1
#13

54.0
#17

75.5
#1

75.0
#2

74.4
#3

74.3
#4

73.4
#5

72.2
#6

71.9
#7

70.3
#8

67.7
#11

64.6
#16

68.7
#10

66.1
#14

66.8
#13

68.8
#9

65.5
#15

62.1
#17

67.1
#12

61.4
#18

and group them according to the conditioning interface.

Quantitatively, Seedance 2.0 [65] ranks first with an Overall score of 75.5, followed by Wan 2.7 [5] (75.0),
Kling 3.0 [66] (74.4), and MiniMax H3 [67] (74.3), where all four models are text-driven general-purpose
video generators. We attribute their advantage to large-scale text-conditioned training, which supplies
strong grounding and predictive ability to interpret the consequences of an action. Such ability is precisely
what Intentional and Physical Transition demand.

We further examine the scores across 3 evaluation axes and 8 detailed metrics. We find that different
models lead in different metrics. For example, Wan 2.7 [5] takes the leading performance in Intentional
and Physical Transition Correctness, while Seedance 2.0 [65], HY-WorldPlay 1.5 [14] and SANA-WM [73]
outperforms other models in Drift Resistance, Revisit Consistency and Offscreen Evolution, respectively.
This strength diversity mainly comes from differences in the training data distributions of these models.

We then qualitatively inspect the complete reasoning traces produced for each evaluation case and model.
Each trace records the case specification, the generated rollout, the LLM planner’s selected evaluation
route, the skill-level measurements, the aggregation result, and the validator’s decisions, making every
evaluation auditable end to end. Figure 7 illustrates two distinct planning routes. For the long-horizon
navigation case, the planner selects drift analysis as the core skill, with render-quality and motion evidence
providing complementary signals; for the intentional state-change case, it instead selects the intentional-
change verifier while skipping persistence- and physics-specific skills. In both cases, the validator audits

10

HarnessEval-W: Agentifying the Evaluation of Visual Worlds

Figure 6 Human alignment of HarnessEval-W and its comparison with WBench. (a) Model-level human alignment:
each point is one of the evaluated models; we fit a linear curve for both Intentional and Physical Transition. (b)
Controlled comparison with the closest WBench protocols on the same data: we report pairwise accuracy (higher
is better), draw rate, and Brier score (both lower is better).

the proposed route and adds the required evidence gates before execution.

5.3 Evaluating the Evaluator: Human Alignment, Robustness and Comparison

We evaluate the performance of HarnessEval-W itself in this section. Specifically, we assess HarnessEval-W
from three angles: whether its scores align with human preference, how it compares with other benchmarks,
and its robustness under different VLMs. We use two aspects for evaluation: Intentional and Physical
Transition, the two settings that most directly require semantic and causal interpretation of an intervention
and are therefore the hardest to evaluate automatically.

Human Alignment. We first conduct a human study to establish a reference ordering. Annotators
are shown pairs of rollouts generated by two different models for the same case and asked to choose
the better one; we collect 5000 such A/B judgments across nine representative models. The pairwise
choices are then aggregated into a per-model strength score with a Bradley–Terry model. As reported in
Figure 6(a), HarnessEval-W closely aligns with the resulting human ordering on both Intentional and
Physical Transition, achieving a Spearman rank correlation of ρ = 0.93 (Kendall τ = 0.82) on Intentional
Transition and ρ = 0.87 (τ = 0.74) on Physical Transition.

Comparison with WBench [34]. We next compare HarnessEval-W against the closest existing evaluation
protocols, drawn from WBench [34]: Event Edit for Intentional and Causal Fidelity for Physical. Both
protocols are re-run on the same videos with the same GPT-5.5 backend, temperature, and frame sampling
as our benchmark, so that only the evaluation protocol differs. Event Edit asks five binary questions about
the video—whether the scene changes, whether the event is recognizable, whether it concludes, whether
key details are correct, and whether unrelated anomalies appear—and sums the answers; Causal Fidelity
compresses the physics and causal consistency of an entire rollout video into a single 0–3 score. We
compare the evaluation results from our benchmark and WBench, and report three metrics in Figure 6(b):
pairwise accuracy, whether the evaluator prefers the same model as the human raters in each A/B pair;
draw rate, the percentage of pairs to which the evaluator assigns identical scores and therefore fails to
separate; and Brier score, the mean squared error between the win probability implied by the evaluator’s
scores and the human choice. Across all three metrics, HarnessEval-W aligns substantially better with
human judgment: on Physical, it raises pairwise accuracy from 31.9% to 71.7% while cutting the draw rate
from 52.2% to 1.8%; on Intentional, it raises accuracy from 60.2% to 77.8% with draws falling from 36.1%
to 11.1%; and it yields the lower Brier score in both settings. These results support the central design
choice of HarnessEval-W: decomposing one global judgment into many separately grounded sub-questions
produces evaluation that is both more discriminative and more human-aligned.

Robustness of HarnessEval-W. Finally, we evaluate the robustness of the evaluator itself by running GPT
multiple times with the same GPT-5.5 backend at temperature 0. We then fit a linear score-to-human
curve for each round, and apply the same procedure to the WBench protocol (Figure 8). HarnessEval-W
produces consistent evaluation across different rounds: the slopes of fitted curves stay within 9.6–10.8, the
correlations with human strength within 0.928–0.964, and the envelope of the three fits spans only 0.33
Bradley–Terry units. WBench, by contrast, is far less stable: its slope nearly doubles across rounds (11.2
to 21.0), its correlation ranges between 0.646 and 0.780, and its envelope spans 1.61 units—4.9× wider

11

Human Bradley—Terry StrengthIntentional & Event EditPhysical & Causal FidelityClosest WbenchProtocolWorldSherlockSkill(b) Task-specificSkill Alignment with Human A/BClosest WbenchProtocolHarnessEval-WSkillPhysicalintentionalHarnessEval-W ScoreAccuracy↑Draw Rate ↓BrierScore  ↓Accuracy↑Draw Rate ↓BrierScore  ↓1.00.80.60.40.20.0Score(a) Skill Human AlignmentHarnessEval-W: Agentifying the Evaluation of Visual Worlds

Figure 7 Complete reasoning traces produced by HarnessEval-W. Each card records the full trajectory of one
evaluation: the case specification, the generated rollout, the selected evaluation route with evidence-grounded
reasons for each skill. For the long-horizon navigation case (left), the planner selects drift analysis as the core skill;
for the intentional state-change case (right), it selects the intentional-change verifier while skipping persistence-
and physics-specific skills.

than ours. HarnessEval-W therefore not only aligns with human judgment but also returns the evaluation
consistently under repetitions, which is closer to an ideal benchmark for world models.

5.4 Further Analysis

We further analyze the benchmark results from two perspectives: the correlations among evaluation
settings, and how capabilities shift when a text-to-video generator is fine-tuned into an action-conditioned
video model.

5.4.1 Correlations among Different Evaluation Axes.

To understand how the evaluated capabilities relate to one another, we compute pairwise Pearson
correlations across the eight evaluated axes over all 18 models and report them in Figure 9. Render Quality
has little correlation with Physical Observation (r = −0.04). Intentional and Physical Transition are
strongly coupled (r = 0.98): both require the model to understand the semantics of a specified intervention
and generate its corresponding consequences. By contrast, Exploratory Transition is nearly unrelated to
either (r = −0.15 and r = −0.18): producing a coherent exploratory continuation does not imply the
semantic and physical grounding required to execute a commanded interaction.

5.4.2 Capability Shifts under Finetuning

We examine how capabilities shift when a text-to-video model is fine-tuned into an action-conditioned
video model, and report the results in Figure 10. We compare two pairs of models: Wan 2.2 fine-tuned
into DreamX-World, and HunyuanVideo 1.5 fine-tuned into HY-WorldPlay 1.5. For each pair, we compute
the difference in all the axes ∆ = Sfine-tuned − Soriginal. DreamX-World gains 4.8 points in Exploratory,
7.8 in Revisit, and 3.5 in Offscreen, while losing 11.9 in Intentional and 7.2 in Physical; HY-WorldPlay
gains 8.4 points in Revisit while losing 24.2 in Intentional and 11.2 in Physical. Both pairs exhibit the
same trend: the fine-tuned model becomes better at revisiting places it has already seen, and worse at
handling physical interactions. We hypothesize that this shift might stem from the fine-tuning data, which
emphasizes exploration-style trajectories over commanded interventions.

12

Model AModel BSub-agent Reasoning Trace for Intentional Change Verifier: 1.00Sub-agent 1: Target VisibleThe wooden spoon is clearly localizable. 0.00Sub-agent 2: Target SpecificityChange hits a wrong object - an extra spoon. 0.25Sub-agent 3: No Extra EventAn unrequested second spoon with left gripper. 0.25Sub-agent 4: Final StateThe spoon never ends held above the bowl.1.00Sub-agent 1: Target VisibleThe wooden spoon is clearly localizable. 1.00Sub-agent 2: Target SpecificityOnly the requested spoon changes. 1.00Sub-agent 3: No Extra EventNo unrequested event, reset or edit occurs.1.00Sub-agent 4: Final StateThe spoon ends held hovering above the bowl.Make the robot's right gripper lift the wooden spoon from the light-gray counter and hold it hovering above the clear glass mixing bowl, while the left gripper remains low at the bottom edge of the frame. Initial ImagePromptRouted High-level SkillsPhysical Plausibility InspectorIntentional Change VerifierAppearance Consistency InspectorMotion Quality InspectorRender Quality InspectorHarnessEval-W: Agentifying the Evaluation of Visual Worlds

Figure 8 Robustness of evaluation. We run the benchmark
three times and fit a linear curve for each run. The shaded band
is the envelope of the three fits. The envelope of HarnessEval-
W is 4.9× narrower than that of WBench.

Figure 9 Correlations among evaluation axes.
Each cell reports the Pearson correlation between
two axes. The results are reported across all 18
models.

Figure 10 Capability shifts under fine-tuning. For each pair (Wan 2.2 → DreamX-World and HunyuanVideo 1.5
→ HY-WorldPlay 1.5), we report the per-axis difference ∆ = Sfine-tuned − Soriginal.

6 Future Work: Toward Self-Evolving Harness for Evaluation

Evaluation is never a static rubric. It evolves in our evolving world, mirroring a broader shift toward
harness engineering and recursive self-improvement [79–81]. HarnessEval-W is only the start of this
agentic benchmark paradigm; we identify three directions in which the evaluation harness should evolve
alongside the worlds it measures.

Test-Time Scaling for Agentic Benchmarks. As LLMs generate increasingly complex reasoning traces
and leverage external tools to solve long-horizon tasks, the evaluation process must scale accordingly.
The same test-time-compute paradigm that makes models more capable [82, 83] applies equally to the
evaluator: within our harness, additional compute buys finer skill decomposition, deeper sub-agent search
over the rollout, multi-step verification, and repeated re-verification of the collected evidence, each of
which makes a verdict strictly more complete. This paradigm shift ensures the evaluator is always as
capable as the model being tested.

Scaling Skill Libraries. Future world models will scale up and serve a vastly broader range of scenarios,
generating highly complex environments with fine-grained physical fidelity, and the evaluator must scale
its capabilities accordingly. We therefore need to continuously grow a comprehensive skill library. Each
skill encodes human knowledge about how to evaluate a specific a scenario—what evidence settles a
question, and which tool grounds it—so that scaling the library accumulates evaluation knowledge rather

13

Evaluator ScoreHuman Bradley—Terry StrengthObs-QObs-PTrans-ETrans-ITrans-PPers-DPers-RPers-OObs-QObs-PTrans-ETrans-ITrans-PPers-DPers-RPers-O1.00-0.040.150.710.670.690.130.69-0.041.000.29-0.34-0.380.400.83-0.040.150.291.00-0.15-0.180.670.490.530.71-0.34-0.151.000.980.16-0.330.530.67-0.38-0.180.981.000.08-0.390.510.690.400.670.160.081.000.620.660.130.830.49-0.33-0.390.621.000.110.69-0.040.530.530.510.660.111.00−0.50.00.51.0Pearson rTrans-ETrans-ITrans-PPers-DPers-RPers-OObs-RObs-P−30−20−10010RenderPhys-ObsExplor.Intent.PhysicalDriftRevisitOffscreenDreamX-World (2s)  −  Wan 2.2Overall −0.8  [−2.1, +0.4]−0.0+2.1+4.6−12.1−7.7+1.5+6.5+2.0−30−20−10010HY-WorldPlay (2s)  −  HunyuanVideo 1.5Overall −3.2  [−4.7, −1.7]+7.1+5.6+4.4−23.3−11.7+2.8+12.5−2.1Adapting a video generator into a world model redistributes capabilityΔ = derived − base on identical cases  ·  95% CI from 10,000 paired bootstrap resamplesDerived models re-generated at a matched 2s per action; bases are released prompt-to-video systems at their native setting.Gains concentrate in exploration and persistence; controlled transitions pay for them. Grey marks an interval that spans zero — no direction established.Descriptive comparisons between released systems, not controlled ablations.−30−20−10010RenderPhys-ObsExplor.Intent.PhysicalDriftRevisitOffscreenDreamX-World (2s)  −  Wan 2.2Overall −0.8  [−2.1, +0.4]−0.0+2.1+4.6−12.1−7.7+1.5+6.5+2.0−30−20−10010HY-WorldPlay (2s)  −  HunyuanVideo 1.5Overall −3.2  [−4.7, −1.7]+7.1+5.6+4.4−23.3−11.7+2.8+12.5−2.1Adapting a video generator into a world model redistributes capabilityΔ = derived − base on identical cases  ·  95% CI from 10,000 paired bootstrap resamplesDerived models re-generated at a matched 2s per action; bases are released prompt-to-video systems at their native setting.Gains concentrate in exploration and persistence; controlled transitions pay for them. Grey marks an interval that spans zero — no direction established.Descriptive comparisons between released systems, not controlled ablations.−30−20−10010RenderPhys-ObsExplor.Intent.PhysicalDriftRevisitOffscreenDreamX-World (2s)  −  Wan 2.2Overall −0.8  [−2.1, +0.4]−0.0+2.1+4.6−12.1−7.7+1.5+6.5+2.0−30−20−10010HY-WorldPlay (2s)  −  HunyuanVideo 1.5Overall −3.2  [−4.7, −1.7]+7.1+5.6+4.4−23.3−11.7+2.8+12.5−2.1Adapting a video generator into a world model redistributes capabilityΔ = derived − base on identical cases  ·  95% CI from 10,000 paired bootstrap resamplesDerived models re-generated at a matched 2s per action; bases are released prompt-to-video systems at their native setting.Gains concentrate in exploration and persistence; controlled transitions pay for them. Grey marks an interval that spans zero — no direction established.Descriptive comparisons between released systems, not controlled ablations.Wan 2.2  →  DreamX-World Hunyuan Video  →  HY-WorldPlay −30−20−10010Obs-QObs-PExplor.Intent.PhysicalDriftRevisitOffscreenDreamX-World  −  Wan 2.2Overall −0.8  [−2.1, +0.4]−1.9+2.1+4.6−12.1−7.7+1.5+6.5+2.0−30−20−10010HY-WorldPlay  −  HunyuanVideo 1.5Overall −3.2  [−4.7, −1.7]−0.6+5.6+4.4−23.3−11.7+2.8+12.5−2.1Adapting a video generator into a world model redistributes capabilityΔ = derived − base on identical cases  ·  95% CI from 10,000 paired bootstrap resamplesDerived models re-generated at a matched 2s per action; bases are released prompt-to-video systems at their native setting.Gains concentrate in exploration and persistence; controlled transitions pay for them. Grey marks an interval that spans zero — no direction established.Descriptive comparisons between released systems, not controlled ablations.−30−20−10010Obs-QObs-PExplor.Intent.PhysicalDriftRevisitOffscreenDreamX-World  −  Wan 2.2Overall −0.8  [−2.1, +0.4]−1.9+2.1+4.6−12.1−7.7+1.5+6.5+2.0−30−20−10010HY-WorldPlay  −  HunyuanVideo 1.5Overall −3.2  [−4.7, −1.7]−0.6+5.6+4.4−23.3−11.7+2.8+12.5−2.1Adapting a video generator into a world model redistributes capabilityΔ = derived − base on identical cases  ·  95% CI from 10,000 paired bootstrap resamplesDerived models re-generated at a matched 2s per action; bases are released prompt-to-video systems at their native setting.Gains concentrate in exploration and persistence; controlled transitions pay for them. Grey marks an interval that spans zero — no direction established.Descriptive comparisons between released systems, not controlled ablations.HarnessEval-W: Agentifying the Evaluation of Visual Worlds

than re-deriving a bespoke rubric for every new benchmark, in the same spirit as agents that grow reusable
libraries of executable skills [61, 84]. As models generate more intricate physics and more diverse scenes,
the evaluator dynamically retrieves and composes specialized skills from this ever-growing library to
accurately assess physical understanding across generated worlds.

Recursively Self-Improving Agentic Benchmarks. When the system encounters out-of-distribution scenarios
while evaluating frontier models—when routing finds no skill that can legitimately answer a case—this
failure is a measurement of the evaluator’s own limitation. We intend to make such skill gaps explicit
and actionable: through external skill expansion, or self-driven exploration [52, 85, 86], the evaluation
agent acquires the missing capabilities and writes them back into its skill library, creating a recursively
self-improving evaluation loop that never becomes obsolete. An evaluator that can extend itself into
worlds it has never seen is what makes self-improvement possible beyond the known world [87].

7 Conclusion

In this paper, we introduced HarnessEval-W, an agentified evaluation pipeline that brings the harness
paradigm from the LLM ecosystem to world model benchmarking. Rather than applying a fixed rubric,
HarnessEval-W interprets the context of each evaluation case, decomposes the evaluation into measurable
sub-questions answered by specialized sub-agents, and aggregates the validated evidence into a transparent
reasoning trace, so that every score can be examined and verified. Across 330 evaluation cases and 18
representative world models, its judgments closely align with human preferences, faithfully reflecting
model performance. We open-source HarnessEval-W as a living benchmark: an executable agentic system
that grows new skills and evaluation cases as world models evolve. We invite the broader community to
contribute to this agentic benchmark workflow together.

References

[1] J. Ho, T. Salimans, A. Gritsenko, W. Chan, M. Norouzi, and D. J. Fleet. “Video Diffusion Models”. In:

Advances in Neural Information Processing Systems 35 (2022), pp. 8633–8646.

[2] A. Blattmann, R. Rombach, H. Ling, T. Dockhorn, S. W. Kim, S. Fidler, and K. Kreis. “Align Your Latents:
High-Resolution Video Synthesis with Latent Diffusion Models”. In: Proceedings of the IEEE/CVF Conference
on Computer Vision and Pattern Recognition. 2023, pp. 22563–22575.

[3] Z. Yang, J. Teng, W. Zheng, M. Ding, S. Huang, J. Xu, et al. “CogVideoX: Text-to-Video Diffusion Models

with an Expert Transformer”. In: arXiv preprint arXiv:2408.06072 (2024).

[4] W. Kong, Q. Tian, Z. Zhang, R. Min, Z. Dai, J. Zhou, et al. “HunyuanVideo: A Systematic Framework for

Large Video Generative Models”. In: arXiv preprint arXiv:2412.03603 (2024).

[5] T. Wan, A. Wang, B. Ai, B. Wen, C. Mao, C.-W. Xie, et al. “Wan: Open and Advanced Large-Scale Video

Generative Models”. In: arXiv preprint arXiv:2503.20314 (2025).

[6] D. Ha and J. Schmidhuber. “World Models”. In: arXiv preprint arXiv:1803.10122 (2018).

[7] D. Hafner, T. Lillicrap, J. Ba, and M. Norouzi. “Dream to Control: Learning Behaviors by Latent Imagination”.

In: arXiv preprint arXiv:1912.01603 (2019).

[8] D. Hafner, J. Pasukonis, J. Ba, and T. Lillicrap. “Mastering Diverse Domains through World Models”. In:

arXiv preprint arXiv:2301.04104 (2023).

[9] J. Bruce, M. Dennis, A. Edwards, J. Parker-Holder, Y. Shi, E. Hughes, et al. “Genie: Generative Interactive

Environments”. In: arXiv preprint arXiv:2402.15391 (2024).

[10] D. Valevski, Y. Leviathan, M. Arar, and S. Fruchter. “Diffusion Models Are Real-Time Game Engines”. In:

arXiv preprint arXiv:2408.14837 (2024).

[11] E. Alonso, A. Jelley, V. Micheli, A. Kanervisto, A. Storkey, T. Pearce, and F. Fleuret. “Diffusion for World

Modeling: Visual Details Matter in Atari”. In: arXiv preprint arXiv:2405.12399 (2024).

[12] J. Guo, Y. Ye, T. He, H. Wu, Y. Jiang, T. Pearce, and J. Bian. “MineWorld: a Real-Time and Open-Source

Interactive World Model on Minecraft”. In: arXiv preprint arXiv:2504.08388 (2025).

[13] X. Mao, Z. Li, C. Li, X. Xu, K. Ying, T. He, J. Pang, Y. Qiao, and K. Zhang. “Yume-1.5: A Text-Controlled

Interactive World Generation Model”. In: arXiv preprint arXiv:2512.22096 (2025).

[14] W. Sun, H. Zhang, H. Wang, J. Wu, Z. Wang, Z. Wang, et al. “WorldPlay: Towards Long-Term Geometric
Consistency for Real-Time Interactive World Modeling”. In: arXiv preprint arXiv:2512.14614 (2025).

14

HarnessEval-W: Agentifying the Evaluation of Visual Worlds

[15] Robbyant Team, Z. Gao, Q. Wang, Y. Zeng, J. Zhu, K. L. Cheng, et al. “Advancing Open-Source World

Models”. In: arXiv preprint arXiv:2601.20540 (2026).

[16] Z. Wang, Z. Liu, J. Li, K. Huang, B. Xu, F. Kang, et al. “Matrix-Game 3.0: Real-Time and Streaming
Interactive World Model with Long-Horizon Memory”. In: arXiv preprint arXiv:2604.08995 (2026).

[17] Z. Huang, Y. He, J. Yu, F. Zhang, C. Si, Y. Jiang, et al. “VBench: Comprehensive Benchmark Suite for
Video Generative Models”. In: Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern
Recognition. 2024, pp. 21807–21818.

[18] Y. Liu, X. Cun, X. Liu, X. Wang, Y. Zhang, H. Chen, et al. “EvalCrafter: Benchmarking and Evaluating
Large Video Generation Models”. In: Proceedings of the IEEE/CVF Conference on Computer Vision and
Pattern Recognition. 2024, pp. 22139–22149.

[19] Y. Liu, L. Li, S. Ren, R. Gao, S. Li, S. Chen, X. Sun, and L. Hou. “FETV: A Benchmark for Fine-Grained
Evaluation of Open-Domain Text-to-Video Generation”. In: Advances in Neural Information Processing
Systems. 2023, pp. 62352–62387.

[20] H. Han, S. Li, J. Chen, Y. Yuan, Y. Wu, Y. Deng, et al. “Video-Bench: Human-Aligned Video Generation
Benchmark”. In: Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition.
2025, pp. 18858–18868.

[21] Z. Huang, F. Zhang, X. Xu, Y. He, J. Yu, Z. Dong, et al. “VBench++: Comprehensive and Versatile

Benchmark Suite for Video Generative Models”. In: arXiv preprint arXiv:2411.13503 (2024).

[22] D. Zheng, Z. Huang, H. Liu, K. Zou, Y. He, F. Zhang, et al. “VBench-2.0: Advancing Video Generation

Benchmark Suite for Intrinsic Faithfulness”. In: arXiv preprint arXiv:2503.21755 (2025).

[23] H. Bansal, Z. Lin, T. Xie, Z. Zong, M. Yarom, Y. Bitton, et al. “VideoPhy: Evaluating Physical Commonsense

for Video Generation”. In: International Conference on Learning Representations. 2025.

[24] F. Meng, J. Liao, X. Tan, Q. Lu, W. Shao, K. Zhang, Y. Cheng, D. Li, and P. Luo. “Towards World
Simulator: Crafting Physical Commonsense-Based Benchmark for Video Generation”. In: Proceedings of the
42nd International Conference on Machine Learning. 2025, pp. 43781–43806.

[25] J. Gu, X. Liu, Y. Zeng, A. Nagarajan, F. Zhu, D. Hong, et al. “PhyWorldBench: A Comprehensive Evaluation
of Physical Realism in Text-to-Video Models”. In: International Conference on Learning Representations.
2026.

[26] H. Duan, H.-X. Yu, S. Chen, L. Fei-Fei, and J. Wu. “WorldScore: A Unified Evaluation Benchmark for
World Generation”. In: Proceedings of the IEEE/CVF International Conference on Computer Vision. 2025,
pp. 27713–27724.

[27] D. Li, Y. Fang, Y. Chen, S. Yang, S. Cao, J. Wong, et al. “WorldModelBench: Judging Video Generation

Models as World Models”. In: arXiv preprint arXiv:2502.20694 (2025).

[28] Y. Qin, Z. Shi, J. Yu, X. Wang, E. Zhou, L. Li, et al. “WorldSimBench: Towards Video Generation Models
as World Simulators”. In: Proceedings of the 42nd International Conference on Machine Learning. 2025,
pp. 50338–50362.

[29] X. Xu, Z. Lin, K. He, Y. Feng, X. Mao, Y. Yin, K. Zhang, and Y. Ge. “WorldMark: A Unified Benchmark

Suite for Interactive Video World Models”. In: arXiv preprint arXiv:2604.21686 (2026).

[30] J. Fang, Y. Lei, Q. Wan, Z. Wang, Y. Huang, Y. Xu, et al. “iWorld-Bench: A Benchmark for Interactive
World Models with a Unified Action Generation Framework”. In: arXiv preprint arXiv:2605.03941 (2026).

[31] M. Wu, Z. Cai, F. Zhao, X. Feng, R. Dang, B. Song, et al. “Omni-WorldBench: Towards a Comprehensive

Interaction-Centric Evaluation for World Models”. In: arXiv preprint arXiv:2603.22212 (2026).

[32] Y. Shang, Z. Li, Y. Ma, W. Su, X. Jin, Z. Wang, et al. “WorldArena: A Unified Benchmark for Evaluating
Perception and Functional Utility of Embodied World Models”. In: arXiv preprint arXiv:2602.08971 (2026).

[33] J. Zhang, M. Jiang, N. Dai, T. Lu, A. Uzunoglu, S. Zhang, et al. “World-in-World: World Models in a

Closed-Loop World”. In: International Conference on Learning Representations. 2026.

[34] K. Ying, H. Hu, S. Ren, J. Li, F. Chen, Z. Wang, X. Cao, X. Cai, and H. Ding. “WBench: A Comprehensive
Multi-turn Benchmark for Interactive Video World Model Evaluation”. In: arXiv preprint arXiv:2605.25874
(2026).

[35] Y. Ye, X. Lu, Y. Jiang, Y. Gu, R. Zhao, Q. Liang, et al. “MIND: Benchmarking Memory Consistency and

Action Control in World Models”. In: arXiv preprint arXiv:2602.08025 (2026).

[36] H. Chen, K. Zhou, H. Hua, K. Zhang, J. Qian, W. Ma, et al. “MemoBench: Benchmarking World Modeling

in Dynamically Changing Environments”. In: arXiv preprint arXiv:2606.27537 (2026).

[37] J. Lu, D. Zhu, H. Shi, L. Cai, G. Tang, Y. Chen, et al. “Current World Models Lack a Persistent State Core”.

In: arXiv preprint arXiv:2606.20545 (2026).

[38] T.-B. Xu, J. Sui, Z. Gao, K. Shi, W. Yang, Z. Liu, et al. “WorldRoamBench: An Open-World Benchmark for

Long-Horizon Stability of Interactive World Models”. In: arXiv preprint arXiv:2606.31672 (2026).

15

HarnessEval-W: Agentifying the Evaluation of Visual Worlds

[39] J. Ke, Q. Wang, Y. Wang, P. Milanfar, and F. Yang. “MUSIQ: Multi-Scale Image Quality Transformer”. In:

Proceedings of the IEEE/CVF International Conference on Computer Vision. 2021, pp. 5148–5157.

[40] Z. Li, R. Tucker, F. Cole, Q. Wang, L. Jin, V. Ye, A. Kanazawa, A. Holynski, and N. Snavely. “MegaSaM:
Accurate, Fast and Robust Structure and Motion from Casual Dynamic Videos”. In: Proceedings of the
IEEE/CVF Conference on Computer Vision and Pattern Recognition. 2025, pp. 10486–10496.

[41] S. Fu, N. Tamir, S. Sundaram, L. Chai, R. Zhang, T. Dekel, and P. Isola. “DreamSim: Learning New
Dimensions of Human Visual Similarity using Synthetic Data”. In: Advances in Neural Information Processing
Systems. 2023, pp. 50742–50768.

[42] N. Ravi, V. Gabeur, Y.-T. Hu, R. Hu, C. Ryali, T. Ma, et al. “SAM 2: Segment Anything in Images and

Videos”. In: International Conference on Learning Representations. 2025.

[43] H. Duan, J. Yang, Y. Qiao, X. Fang, L. Chen, Y. Liu, et al. “VLMEvalKit: An Open-Source ToolKit for
Evaluating Large Multi-Modality Models”. In: Proceedings of the 32nd ACM International Conference on
Multimedia. 2024, pp. 11198–11201.

[44] P. Liang, R. Bommasani, T. Lee, D. Tsipras, D. Soylu, M. Yasunaga, et al. “Holistic Evaluation of Language

Models”. In: Transactions on Machine Learning Research (2023).

[45] E. Bandel, Y. Perlitz, E. Venezian, R. Friedman, O. Arviv, M. Orbach, et al. “Unitxt: Flexible, Shareable
and Reusable Data Preparation and Evaluation for Generative AI”. In: Proceedings of the 2024 Conference of
the North American Chapter of the Association for Computational Linguistics: Human Language Technologies
(Volume 3: System Demonstrations). 2024, pp. 207–215.

[46] L. Zheng, W.-L. Chiang, Y. Sheng, S. Zhuang, Z. Wu, Y. Zhuang, et al. “Judging LLM-as-a-Judge with

MT-Bench and Chatbot Arena”. In: arXiv preprint arXiv:2306.05685 (2023).

[47] R. You, H. Cai, C. Zhang, Q. Xu, M. Liu, T. Yu, Y. Li, and W. Li. “Agent-as-a-Judge”. In: arXiv preprint

arXiv:2601.05111 (2026).

[48] M. Zhuge, C. Zhao, D. R. Ashley, W. Wang, D. Khizbullin, Y. Xiong, et al. “Agent-as-a-Judge: Evaluate
Agents with Agents”. In: Proceedings of the 42nd International Conference on Machine Learning. Vol. 267.
Proceedings of Machine Learning Research. 2025, pp. 80569–80611.

[49] B. Gou, Z. Huang, Y. Ning, Y. Gu, M. Lin, W. Qi, et al. “Mind2Web 2: Evaluating Agentic Search with
Agent-as-a-Judge”. In: Advances in Neural Information Processing Systems. Vol. 38. 2025, pp. 192393–192451.

[50] D. Brown, P. Balehannina, H. Jin, S. Havaldar, H. Hassani, and E. Wong. “Adaptively Profiling Models
with Task Elicitation”. In: Proceedings of the 2025 Conference on Empirical Methods in Natural Language
Processing. 2025, pp. 24985–25020.

[51] C. Shen, Y. Hou, M. Pan, R. He, Z. H. Wong, M. Qiang, et al. “One-Eval: An Agentic System for Automated

and Traceable LLM Evaluation”. In: arXiv preprint arXiv:2603.09821 (2026).

[52] Y. Wang, X. Wang, Y. Yao, X. Li, X. Yang, Y. Teng, X. Ma, and Y. Wang. “AgenticEval: Toward Agentic and
Self-Evolving Safety Evaluation of Large Language Models”. In: Findings of the Association for Computational
Linguistics: ACL 2026. 2026, pp. 14789–14808.

[53] F. Zhang, S. Tian, Z. Huang, Y. Qiao, and Z. Liu. “Evaluation Agent: Efficient and Promptable Evaluation
Framework for Visual Generative Models”. In: Proceedings of the 63rd Annual Meeting of the Association for
Computational Linguistics (Volume 1: Long Papers). 2025, pp. 7561–7582.

[54] S. Tian, Z. Huang, F. Zhang, H. Zhu, Y. Qiao, and Z. Liu. “Open Evaluation Agent: Efficient and Promptable

Evaluation of Visual Generative Models”. In: arXiv preprint arXiv:2608.09666 (2026).

[55] Y. Song, T. Pfister, and Y. Song. “VQQA: An Agentic Approach for Video Evaluation and Quality Improve-

ment”. In: arXiv preprint arXiv:2603.12310 (2026).

[56] Z. Qin, D. Cheng, H. Wang, H. Yi, Y. Shao, Z. Fan, K. Li, and Q. Lao. “Evaluating Hallucination in
Text-to-Image Diffusion Models with Scene-Graph based Question-Answering Agent”. In: arXiv preprint
arXiv:2412.05722 (2024).

[57] J. Wang, X. Yang, L. Wang, Z. Xu, Y. Wang, Y. Wang, et al. “A Unified Agentic Framework for Evalu-
ating Conditional Image Generation”. In: Proceedings of the 63rd Annual Meeting of the Association for
Computational Linguistics (Volume 1: Long Papers). 2025, pp. 12626–12646.

[58] T. Chen, Y. Zhang, Z. Zhang, P. Yu, S. Wang, Z. Wang, et al. “EdiVal-Agent: An Object-Centric Framework
for Automated, Fine-Grained Evaluation of Multi-Turn Editing”. In: arXiv preprint arXiv:2509.13399 (2026).

[59] Y. Yang, K. Fan, S. Sun, H. Li, A. Zeng, F. Han, et al. “VideoGen-Eval: Agent-based System for Video

Generation Evaluation”. In: arXiv preprint arXiv:2503.23452 (2025).

[60] Z. Zeng, Z. Wang, Y. Yu, H. Hua, and J. Luo. “VideoArgus: Agentic Rubric-Grounded Unified Evaluation

for Video Generation and Editing”. In: arXiv preprint arXiv:2608.05485 (2026).

[61] Y. Zhang, P. Du, B. Li, C. Wei, J. Miao, H. Zhang, et al. “RewardHarness: Self-Evolving Agentic Post-

Training”. In: arXiv preprint arXiv:2605.08703 (2026).

16

HarnessEval-W: Agentifying the Evaluation of Visual Worlds

[62] W. Shi, Y. Wang, Y. Zhao, Y. Chen, F. Feng, X. Hao, et al. “AJ-Bench: Benchmarking Agent-as-a-Judge for
Environment-Aware Evaluation”. In: Findings of the Association for Computational Linguistics: ACL 2026.
2026, pp. 25371–25413.

[63] Y. Zhu, T. Jin, Y. Pruksachatkun, A. Zhang, S. Liu, S. Cui, et al. “Establishing Best Practices in Building
Rigorous Agentic Benchmarks”. In: Advances in Neural Information Processing Systems. Vol. 38. 2025,
pp. 184435–184475.

[64] D. Hafner, J. Pasukonis, J. Ba, and T. Lillicrap. “Mastering diverse domains through world models”. In:

arXiv preprint arXiv:2301.04104 (2023).

[65] Team Seedance, D. Chen, L. Chen, et al. “Seedance 2.0: Advancing Video Generation for World Complexity”.

In: arXiv preprint arXiv:2604.14148 (2026).

[66] Kuaishou Technology. Kling 3.0: High-Fidelity Video Generation with Physics-Aware Motion and Omni-Native

Audio. Technical report. 2026.

[67] MiniMax. MiniMax H3: An Open Model Breaking the Boundaries Between Tasks and Modalities. Technical

report. 2026.

[68] xAI. Grok Imagine Video 1.5. Product announcement. June 16, 2026.

[69] Black Forest Labs. FLUX 3 Video, Part 1: Generation. Aug. 2026.

[70] NVIDIA, N. Agarwal, A. Ali, M. Bala, Y. Balaji, et al. “Cosmos World Foundation Model Platform for

Physical AI”. In: arXiv preprint arXiv:2501.03575 (2025).

[71] B. Wu, C. Zou, C. Li, D. Huang, F. Yang, H. Tan, et al. “HunyuanVideo 1.5 Technical Report”. In: arXiv

preprint arXiv:2511.18870 (2025).

[72] Y. HaCohen, B. Brazowski, N. Chiprut, Y. Bitterman, A. Kvochko, A. Berkowitz, et al. “LTX-2: Efficient

Joint Audio-Visual Foundation Model”. In: arXiv preprint arXiv:2601.03233 (2026).

[73] H. Zhu, H. Liu, Y. Zhao, T. Ye, J. Chen, J. Yu, T. He, S. Han, and E. Xie. “SANA-WM: Efficient Minute-Scale

World Modeling with Hybrid Linear Diffusion Transformer”. In: arXiv preprint arXiv:2605.15178 (2026).

[74] F. Jiang, Z. Sun, M. Wang, Z. Zhu, C. Wang, Y. Zhang, et al. “ABot-World-0: Infinite Interactive World

Rollout on a Single Desktop GPU”. In: arXiv preprint arXiv:2607.19191 (2026).

[75] DreamX Team, Y. Bai, R. Chen, X. Chu, R. Dang, H. Dou, et al. “DreamX-World 1.0: A General-Purpose

Interactive World Model”. In: arXiv preprint arXiv:2606.16993 (2026).

[76] T. Shen, S. Bahmani, K. He, S. G. Srinivasan, T. Cao, J. Ren, et al. “Lyra 2.0: Explorable Generative 3D

Worlds”. In: arXiv preprint arXiv:2604.13036 (2026).

[77] Y. Dai, F. Jiang, C. Wang, M. Xu, and Y. Qi. “FantasyWorld: Geometry-Consistent World Modeling via

Unified Video and 3D Prediction”. In: arXiv preprint arXiv:2509.21657 (2025).

[78]

InSpatio Team, D. Shen, G. Zhang, H. Liu, H. Ji, H. Bao, et al. “InSpatio-World: A Real-Time 4D World
Simulator via Spatiotemporal Autoregressive Modeling”. In: arXiv preprint arXiv:2604.07209 (2026).

[79] L. Weng. Harness Engineering for Self-Improvement. Blog post. July 2026.

[80] M. Chen, L. Wang, and B. Qu. “Recursive Self-Improvement in AI: From Bounded Self-Refinement to

Autonomous Research Loops”. In: arXiv preprint arXiv:2607.07663 (2026).

[81] Anthropic. When AI Builds Itself. Anthropic Institute. 2026.

[82] C. Snell, J. Lee, K. Xu, and A. Kumar. “Scaling LLM Test-Time Compute Optimally Can Be More Effective

Than Scaling Model Parameters”. In: arXiv preprint arXiv:2408.03314 (2024).

[83] N. Muennighoff, Z. Yang, W. Shi, X. L. Li, L. Fei-Fei, H. Hajishirzi, et al. “s1: Simple Test-Time Scaling”. In:

arXiv preprint arXiv:2501.19393 (2025).

[84] G. Wang, Y. Xie, Y. Jiang, A. Mandlekar, C. Xiao, Y. Zhu, L. Fan, and A. Anandkumar. “Voyager: An
Open-Ended Embodied Agent with Large Language Models”. In: arXiv preprint arXiv:2305.16291 (2023).

[85] S. Hu, C. Lu, and J. Clune. “Automated Design of Agentic Systems”. In: arXiv preprint arXiv:2408.08435

(2024).

[86] J. Zhang, S. Hu, C. Lu, R. Lange, and J. Clune. “Darwin Gödel Machine: Open-Ended Evolution of

Self-Improving Agents”. In: arXiv preprint arXiv:2505.22954 (2025).

[87] MirroS Team. Building Physical RSI Beyond the Known World. Blog post. Aug. 2026.

17
