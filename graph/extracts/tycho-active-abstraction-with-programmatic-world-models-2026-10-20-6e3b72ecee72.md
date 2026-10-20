NIMI Research Group

July 29, 2026 · nimi-ai.com

Tycho: Active Abstraction with Programmatic
World Models for ARC-AGI-3

Jens Lehmann
Dresden University of Technology
Amazon
Dresden, Germany
jens.lehmann@tu-dresden.de
Work done outside of Amazon

Andrei Aioanei
TIB – Leibniz Information Centre for
Science and Technology,
Hannover, Germany
andrei.aioanei@tib.eu

Sahar Vahdati
Leibniz University of Hannover
TIB – Leibniz Information Centre for
Science and Technology,
Hannover, Germany
sahar.vahdati@tib.eu

Abstract

ARC-AGI-3 turns abstraction into an interactive problem of skill acquisition. A player must figure out an
unfamiliar game’s rules, hidden state, and goal while maintaining action efficiency, since every move counts.
We formalize these game environments as parameterized rendered deterministic Moore machines. We then
introduce Tycho, a coding-agent system for constructing and using game-specific models during interaction.
Tycho distinguishes observations on which the agent can act from intermediate animation, level-completion,
and game-over frames. Using this structured interaction history, an agent can model, test, plan with, repair,
or bypass a free-form executable hypothesis about the game.

In one matched public-set run per policy, we compare four orchestration policies on all 25 public ARC-AGI-3
games using Claude Opus 4.8 under matched inference budgets: direct reasoning, actor-authored modeling,
actor-requested delegation to a builder, and automatically triggered model repair on verification failure. Actor-
requested delegation obtains the highest observed mean Relative Human Action Efficiency (RHAE), at 88.49.
We then evaluate this selected policy with two frontier models. GPT-5.6 Sol reaches 100.00 RHAE, completing
all 25 games and all 183 levels in 7,766 scored actions. Opus 5 also reaches 100.00 RHAE, completing all 183
levels in 6,641 actions. The two runs obtain game-balanced first-run human-replay midranks of 98.5 and 100.0,
respectively. Across the 183 completed levels, Opus 5 uses 61% fewer scored actions than the aggregate official
human baselines.

Automatic repair after verification failures produces models that reproduce observed game transitions much
more accurately. Yet the resulting policy reaches only 83.07 RHAE, below actor-requested delegation. This gap
illustrates that transition match shows whether a simulator reproduces observed dynamics, not whether it has
identified the objective or whether consulting it improves the next action. Strong play therefore also requires
deciding when to construct, repair, use, or bypass the model. We call this joint problem active abstraction:
generating a testable model from costly interaction and deciding when acquiring or using that model is worth
its cost.

WHY TYCHO

Tycho Brahe, the sixteenth-century astronomer, charted the heavens with unmatched precision, but
did not live to see their hidden order become law. Kepler found that order in Tycho’s observations.
The name is our thesis: intelligence begins by looking closely at an unfamiliar world, turning
evidence into a model, and using that model to see beyond the next observation.

Open-source implementation: github.com/NIMI-research/Tycho · Apache-2.0

arXiv:2607.28287v1  [cs.AI]  30 Jul 20261

Introduction

The hard part of intelligence is not storing many solutions. It is acquiring useful new skills from a
small amount of experience. Chollet’s definition of intelligence as skill-acquisition efficiency (Chollet,
2019) makes this point precise enough to make this view of intelligence measurable: a system that
solves a task only after exhaustive search, hidden pretraining leakage, or thousands of environment
trials has not demonstrated the same kind of generalization as a human who infers a rule from a
few examples.

The first two ARC-AGI benchmarks made this idea concrete through static reasoning tasks and
became widely regarded as exceptionally difficult tests of generalization in artificial intelligence.
ARC-AGI-3 (ARC Prize Foundation, 2026b) moves the same principle into an interactive setting.
The agent observes a 64 × 64 colored grid, chooses an action, receives the next grid, and must
complete a sequence of levels. No natural-language rule, goal description, or action semantics are
provided. Every environment action is part of the score. The agent must therefore decide not only
what is true, but also which action is worth performing next.

ARC-AGI-3 is a bounded instance of a broader challenge for general agents: entering a new domain,
forming hypotheses about its mechanics, selecting informative actions, and using the resulting model
for action selection. Unlike static ARC, evidence is not fixed in advance: each transition (ot, at, ot+1)
is both evidence about the world and an irreversible expenditure from the action budget. We call
this problem active abstraction: automatically constructing an explicit, testable model from costly
interaction and deciding when acquiring or using that model is worth its cost. A useful abstraction
must preserve hidden state and cross-level regularities, guide action from limited evidence, and
justify the actions spent testing it.

Tycho operationalizes several central elements of the world-model-induction agenda of Ying et al.
(2025): constructing and revising models from limited interaction, using them to guide action and
exploration, and making the induced representation directly inspectable. World models are useful
here for three reasons. They let the agent simulate alternative action sequences before spending real
actions; they make exploration purposeful when competing hypotheses predict different observations
or plans; and they help localize failure when modeled dynamics fit the interaction history but
outcome inference or planning remains wrong. Programmatic models are directly inspectable and
editable. They can be tested against observed transitions, revised after mismatches, and used by
standard planning algorithms. Passing observed replay checks does not prove generalization, but it
turns an informal interpretation into a concrete hypothesis. Independent analysis of frontier-model
trajectories identifies the corresponding failures in practice: agents can observe a correct local effect
but form the wrong global model, import an inappropriate game abstraction, or complete one level
without extracting mechanics that transfer to the next (Kamradt, 2026a).

We use world model in the agent-relative sense, a model of the environment in which an agent
acts. Here, that environment is one ARC-AGI-3 game. Tycho induces a game-specific model from
interaction, not a general model of the physical world. More precisely, the model represents latent
environment state, action-conditioned dynamics, observation formation, and terminal outcomes in a
form that supports prospective simulation and action selection. This paper studies one instantiation:
programmatic world models. Tycho externalizes the representation as an editable, task-specific
executable hypothesis in Python with freely chosen state variables, initialization and transition rules,
a renderer back to the observed grid, and an outcome classifier. It may also expose planner-facing
search guidance. It can be verified against past experience and used for planning, and its structure
can be read, edited, and simplified.

2

action

ARC-AGI-3
environment

Interaction record
frames and action masks,
typed events and history

evidence

Frontier actor
reasons over evidence,
commits each action

Optional executable-model workbench

advice

Construct
or repair
actor or builder

Executable model
state and dynamics,
render and outcome

repair feedback

Verify and plan
replay history,
search model states

Figure 1: Tycho’s shared task-time architecture. The actor reasons over the interaction record and
alone commits environment actions. The optional workbench constructs or repairs an executable
model, verifies it, and returns plans or diagnostics.

Tycho instantiates this research program through a loop over evidence, executable hypotheses,
and action. Figure 1 summarizes the shared loop and Table 1 defines the four model-maintenance
policies varied in our matched comparison. Its contributions are:

• We formalize ARC-AGI-3 as active identification of deterministic rendered Moore machines with
transition emissions and a typed agent-facing evidence contract. The formulation makes hidden
state, non-injective observations, level boundaries, task-equivalent models, and information-
gathering actions explicit.

• We define programmatic world models as a free-form, executable hypothesis language giving the
agent freedom to decide whether to use it. The same interaction interface supports four policies:
(1) no model, (2) single-actor modeling, (3) actor-requested delegation, and (4) automatically
triggered repair. We benchmark and compare all four policies.

• We separate model accuracy from game-playing performance through pre-action execution,
accepted transition match, prediction coverage, terminal-outcome prediction, plan following,
scored actions, and inference cost. In a replay-audited public-set evaluation, the matched study
selects Orchestrator; GPT-5.6 Sol and Opus 5 both reach 100.00 RHAE, with Opus 5 using
14.5% fewer actions.

• We describe the human-mediated cross-run adaptation loop used to identify candidate architec-
tural changes from limited development feedback and validate them before they enter future
frozen harnesses.

3

2 Related Work

ARC, skill acquisition, and induction versus transduction. ARC was designed to measure
broad generalization and skill-acquisition efficiency rather than task-specific training performance
(Chollet, 2019). In static ARC, Li et al. (2025) distinguish induction—constructing an intermediate
rule that can be applied to the test input—from transduction, which predicts the test output
directly. They find the approaches complementary: induction is stronger when exact computation
and composition matter, whereas transduction can better capture less precisely specified perceptual
concepts. ARC-AGI-3 carries a related tension into sequential interaction. An executable world
model makes the inferred rule persistent and testable while direct actor reasoning is transduction-like,
because it maps the current observation and interaction record to an action without first externalizing
a reusable transition function. This complementarity motivates Tycho’s central design choice: world
modeling is available throughout the task, but is not mandatory when direct reasoning is sufficient.

ARC-AGI-3 extends skill-acquisition to interactive agents (ARC Prize Foundation, 2026b): the
agent must infer reusable structure while every exploratory action is scored. It operationalizes the
proposal to evaluate adaptive world-model induction through novel games (Ying et al., 2025). A
cross-generation survey identifies test-time adaptation and refinement loops as recurring strengths of
approaches solving ARC, while compositional generalization, interactive learning, and computational
efficiency remain central bottlenecks (Vahdati et al., 2026). Tycho therefore treats action efficiency
as evidence of useful abstraction, not merely of eventual task success.

ARC-AGI-3 agent architectures. Recent systems emphasize different parts of the interactive
inference problem. DreamTeam treats the editable workspace—artifacts, evidence, feedback, and
agent roles—as an object of inference-time optimization, with specialist roles for executable modeling,
probing, and planning (Sarafian et al., 2026). AERA separates exploration, verification, and planning
(Han, 2026b). Its released evaluator maps WIN, GAME_OVER, and a None step return to the same
termination path, which the agent records as solved (Han, 2026a). We therefore do not treat its
completion counts as directly comparable to official outcome-based counts. The Duck Harness
demonstrates a deliberately lightweight alternative in which a local model writes and executes Python
in a short-context REPL (Bessis et al., 2026). Graph-based exploration instead makes systematic
state-space coverage the organizing principle (Rudakov et al., 2025). Together these systems expose
the need to distinguish base-model capability, evidence and memory design, exploration, model
construction, metareasoning, and evaluation protocol.

Contemporaneous coding-agent systems for ARC-AGI-3. Several contemporaneous systems
independently combine persistent evidence, executable hypotheses, replay, and planning. Rodionov’s
coding-agent system uses Python world models, a scripted controller, predefined interfaces, replay
verification, plan execution, and refactoring as a practical MDL proxy (Rodionov, 2026c). Its
component study compares textual reasoning, flexible executable modeling, scheduled simplification,
and fixed-interface verification (Rodionov, 2026b). Verification ranks first in all four matched settings
but uses the most resources, while requiring a persistent executable deliverable is not uniformly
beneficial. OPINE-World couples acting and model-synthesis agents through counterexample-
guided repair, exact replay admission, forward planning, and ontology-error-prioritized exploration
(Courtis et al., 2026). The Schema harness combines an append-only transition record, persistent
notes, editable Python hypotheses, full-history backtesting, certified-model search, discriminating
probes, and guarded action queues invalidated by prediction mismatches (Zeng et al., 2026).

4

PRO-LONG isolates a simpler memory intervention: every observation, action, and outcome is
appended to one structured log, which a coding agent searches with tools such as grep and Python
(Fox et al., 2026a). It neither requires an executable model nor supplies a dedicated model interface,
although its agents sometimes synthesize transition programs and breadth-first search on their own.

The main architectural differences concern representation and model allocation. OPINE-World
commits to an object-centric factorization. It synthesizes a typed extractor, uses Bayesian effect
statistics to prioritize unresolved object types, and admits only exact-replay models into a fixed actor–
synthesizer loop. Its formal analysis assumes an observable-Markov representation. The Schema
harness likewise places a persistent executable hypothesis at the center of control. Backtesting
certifies the hypothesis for search, and prediction mismatches invalidate queued actions. Rodionov
instead varies executable-model components within a prescribed controller. Tycho imposes neither
a fixed object decomposition nor a fixed internal state representation. It also makes the executable
model optional. Across a shared evidence and action interface, the experiment varies who constructs
or repairs a model and when. This makes model allocation, rather than model synthesis alone, the
object of study. PRO-LONG is closest to Tycho’s persistent-evidence layer: both let a coding agent
query exact earlier interactions programmatically. PRO-LONG deliberately stops at this general
memory interface. Tycho additionally represents transient and terminal evidence, gives executable
models explicit initialization, rendering, outcome, verification, and planning interfaces, and tests
when that machinery should be invoked.

The evaluation protocols also differ. OPINE-World reports 78.4 RHAE with Opus 4.8. Rodionov’s
fixed verification variant reports 98.97 with GPT-5.6 Sol at xhigh. The Schema harness reports
98.98 by running Opus 4.8 first, rerunning games below a score of 80 with Fable 5, and retaining
the better trajectory for each game (Zeng et al., 2026). On every rerun game, taking the better
trajectory can only preserve or raise the first-pass score. A fallback model that is stronger on average
does not remove this best-of-two advantage because it need not dominate the first model on every
game or run. The GPT protocol applies the same rule to xhigh and max. The released traces allow
the 25 retained trajectories to be rescored, but the aggregate is a conditional multi-model selection
result rather than a score from one fixed model pass. PRO-LONG reports 94.6 from one Fable 5
pass with a 2,000-action limit, then 97.4 after selectively rerunning some games and retaining the
better result. The authors call this a lower bound on best@2 because several games have only one
run. With one fixed configuration and one trajectory per game, Tycho reaches 100.00 with GPT-5.6
Sol/max and 100.00 with Opus 5/xhigh. The headline numbers alone therefore mix architecture,
model choice, rerunning, and inference allocation. The protocol must be stated alongside the score.

Released usage artifacts add a cost dimension: our API-equivalent normalization estimates Tycho
at $5.78k versus $12.4–15.2k for OPINE-World in the Opus comparison, and at $4.47k versus $13.6–
15.5k for Rodionov’s near-saturation GPT verification runs under the latter’s reported preliminary
API-key cache behavior. The Opus 5 run costs an estimated $2.99k at the frozen Opus-rate schedule.
PRO-LONG reports a substantially lower $1.75k list-price equivalent for its selective Fable protocol.
Its pricing formula is consistent with public Fable rates, but the released bundle strips the per-call
token telemetry and omits the additional runs, so the total cannot yet be independently reconstructed
(Section 5.1).

Tycho’s four matched Opus scorecards were completed by July 13, before we learned of the Schema
harness and Rodionov’s component study. Tycho’s distinguishing contributions are a rendered
Moore-machine formalization of interactive games, a matched comparison of four modeling policies,
and a trace-grounded qualitative analysis of agent adaptation. The matched comparison shows that
automatic repair makes models much more exact yet underperforms actor-requested delegation.

5

Programmatic world models and metareasoning. WorldCoder studies LLM agents that
build programmatic world models from interaction (Tang et al., 2024). Code World Models use
generated Python dynamics and execution feedback for offline model-based control (Dainese et al.,
2024). Theory-based reinforcement learning starts from structured causal theories. EMPA performs
program-based model inference, exploration, and planning (Tsividis et al., 2026). TheoryCoder
combines synthesized Python dynamics with human-specified high-level operators (Ahmed et al.,
2025). TheoryCoder-2 also learns reusable planning abstractions (Ahmed et al., 2026). PoE-World
composes programmatic experts and extends sparse-data program synthesis to stochastic, non-
gridworld domains (Piriyakulkij et al., 2025). These systems show that source-code hypotheses can
support sample-efficient control. Tycho asks the complementary policy question: when should a
frontier coding agent construct, repair, query, plan through, or bypass one?

That allocation is a form of metareasoning: computation is useful only through its effect on
external decisions (Russell and Wefald, 1991). Across visual and agentic tasks, agents may rarely
invoke available simulators, misuse their rollouts, or degrade when simulation is forced (Qian et al.,
2026). Similarly, planning before every action can waste test-time compute and reduce long-horizon
performance, motivating policies that learn when to plan (Paglieri et al., 2025). Tool-using agents
such as ReAct, Reflexion, and Voyager show the broader benefits of external tools, memory, and
self-revision (Yao et al., 2023; Shinn et al., 2023; Wang et al., 2024). Tycho makes the allocation
decision explicit and separately measures pre-action model execution, accepted transition match,
surfaced recommendations, exact following, and game-playing performance.

Active identification and decision-relevant models. World models are central to model-based
agents and reinforcement learning (Ha and Schmidhuber, 2018; Hafner et al., 2020; Schrittwieser
et al., 2020). Tycho uses discrete programs because they make hypotheses inspectable, testable
against recorded history, and directly usable by ordinary planners. Prediction accuracy and task
performance are distinct objectives: globally accurate dynamics can be irrelevant to the current
decision, while a task-useful model may abstract away most observable detail (Lambert et al.,
2020; Grimm et al., 2020). WorldTest instead separates reward-free model acquisition from later
prediction and planning tests (Warrier et al., 2026). Tycho measures transition prediction and game
play within the same scarce-action trajectory.

POMDPs and belief-space planning formalize action under hidden state (Kaelbling et al., 1998;
Bonet and Geffner, 2000). Bayes-adaptive and dual-control perspectives couple action selection
to uncertainty about the dynamics: an action can improve both the physical state and the model
used for later decisions (Klenske and Hennig, 2016). Value-of-information and active-data-selection
results likewise explain why an action can be useful because it discriminates among hypotheses
rather than directly approaching a goal (Howard, 1966; MacKay, 1992). Tycho does not assign priors
or likelihoods to the free-form programs proposed for a one-off game. Full Bayesian planning would
therefore require an additional probability model over programs and planning through that distri-
bution. Tycho instead uses selected deterministic hypotheses consistent with the observed record,
without maintaining an enumerated version space. This stops short of belief-space optimization but
preserves the distinction between task progress and information value.

Learning deterministic machines from queries and counterexamples provides a complementary
identification perspective (Angluin, 1987; Rivest and Schapire, 1993). ARC-AGI-3 is a rendered,
cost-sensitive variant: reset and membership queries are not freely available, observations are pixel
grids, and the terminal-outcome map is hidden. Work on Moore and Mealy machines from traces
and apartness suggests tools for finite-state identification (Giantamidis et al., 2021; Vaandrager et al.,

6

2022). Agentic automata learning nevertheless finds frontier agents brittle in query planning, evidence
integration, and hypothesis construction as machines grow (Menaged et al., 2026). Tycho studies the
analogous problem with unknown goals and irreversible scored actions, where abstraction, simulation
of alternative actions, and model testing and revision must all fit within a scarce interaction budget.

3 Formal Setting: Rendered Deterministic Moore Machines

3.1 Level mechanics and scored interaction

Why rendered Moore machines? In ARC-AGI-3, an agent faces a sequence of decision frames.
It observes a grid and the available actions, chooses one, and receives a new observation or a terminal
outcome. A model that supports action selection and planning must explain more than the visible
frame. It must retain hidden facts from earlier interaction, predict how actions change those facts,
render the resulting observation, and recognize completion or failure. A Moore machine makes this
separation explicit: actions update an underlying state, while each state produces the observation
and outcome available to the agent. We call the machine rendered because its principal observation
is a grid. We augment it with transition emissions to preserve informative animation frames between
decision frames. Figure 2 illustrates the resulting cycle.
Let L = {1, . . . , L} denote the ordered levels of a game, let G = {0, . . . , 15}64×64 denote the space
of rendered grids, and let

Y = {ongoing, level_complete, game_over}

denote the possible outcomes. At the start of level ℓ, the environment is in an underlying state
(sℓ
0 ∈ S). This state encodes the level’s layout, object positions, counters, and every other vari-
able—whether visible in the rendered grid or hidden—needed to determine subsequent transitions
and outcomes.

Formally, the object below is a deterministic transition system with Moore-style state outputs and
transition emissions. We use rendered Moore machine as shorthand.

Definition 1 (Level mechanics). The mechanics shared by the levels of one ARC-AGI-3 game form
a parameterized rendered deterministic Moore machine with transition emissions,

M ℓ

θ = (S, A, sℓ

0, δθ, qθ, εθ).

Let S denote the environment’s underlying state space, containing every visible or hidden variable
needed to determine future behavior, and let A denote the set of game actions. The output map

qθ(s) = (cid:0)

ρθ(s)
| {z }
rendered grid

,

αθ(s)
| {z }
available actions

, ωθ(s)
| {z }
outcome

(cid:1) ∈ G × 2A × Y

gives the settled observation at a state. If ωθ(s) = ongoing, each available action a ∈ αθ(s) has
the unique successor s′ = δθ(s, a). The emission εθ(s, a, s′) ∈ G∗ is the finite sequence of transient
frames shown between the two settled outputs. These frames provide evidence about the transition,
but the agent cannot act from them.

7

Toy scrolling level: The blue cell is a player needing to discover and move to the yellow goal cell.

Initial state sℓ
0
latent world offset x = 0

State sℓ
1
latent world offset x = 1

State sℓ
2
latent world offset x = 2

RIGHT

δθ

Camera pan εθ

rendered grid

ρθ(sℓ

0) = g

rendered grid

ρθ(sℓ

1) = g

RIGHT

δθ

Camera pan εθ

rendered grid
ρθ(sℓ
2) = ggoal

Non-Markov witness. ρθ(sℓ

0) = ρθ(sℓ

1) = g, yet RIGHT yields g

from sℓ

0 and ggoal from sℓ

1. The current grid is therefore not a sufficient state.

Figure 2: A non-Markov scrolling viewport. Identical grids at two world offsets have different
successors under RIGHT; green boxes denote transient camera frames.

Determinism, hidden state, and level variation. ARC-AGI-3 is turn-based: the environment
does not change asynchronously while the agent deliberates, and the benchmark’s environment
qualification replays recorded winning and losing traces to verify faithful re-execution (ARC Prize
Foundation, 2026b). We therefore represent the evaluated level instances with a transition function
rather than a probability distribution. For a fixed environment version and initial configuration, a
complete underlying state and legal action determine one successor.

Determinism does not imply that the visible grid is Markov or that the agent knows the underlying
state. Every fixed level property needed for later dynamics is part of sℓ
0. A counter, camera offset, or
off-screen object that changes during play is part of the evolving state st. It may remain uncertain
to the agent even though the underlying transition is deterministic. A stochastic environment could
instead use a transition kernel without changing the separation between underlying state, rendering,
outcomes, and protocol events.
The parameter θ denotes mechanics shared across the game, while the initial state sℓ
0 varies by
level. Tycho constructs its estimate ˆsℓ
0, ℓ − 1) from the first rendered grid and the zero-based
position of the level in the game, then advances that state estimate through the recorded actions. It
does not reconstruct state independently from every new grid. As Figure 2 shows, doing so would
erase hidden changes whenever two points in the interaction have the same rendered frame. The
transition, rendering, and outcome code is shared across levels, so evidence gathered earlier can
reduce what must be inferred again through scored interaction.

0 = ˆι(gℓ

Why an outer game protocol? A level machine describes the mechanics within one attempt,
but ARC-AGI-3 also governs resets, repeated attempts, level advancement, and action accounting.
We represent these benchmark-wide rules as a small outer protocol so that the same level model
can be composed with the progression and scoring semantics.

Definition 2 (Scored game protocol). The ARC game protocol composes the level machines in
order and adds attempts, recovery, advancement, and action accounting. A protocol configuration
records the active level ℓ, its underlying state s, whether the current attempt is playable or fatal,
and the scored-action counts a = (a1, . . . , a|L|). An ordinary action advances the current level
machine M ℓ
θ and increments aℓ. A level_complete output closes the current level after preserving

8

its terminal evidence, then advances without action cost to sℓ+1
or ends the game after the last
level. A game_over output closes only the current attempt. The protocol control RESET is available
independently of αθ(s), the set of ordinary game actions returned with the current decision frame.
It costs one in-play action and starts a fresh attempt at sℓ
0. The initialization RESET that creates a
play is unscored.

0

The outer protocol determines how level-machine outputs affect progression and score. A terminal
frame documents how an attempt ended, whereas a reset or level advancement creates the next state
from which an action can be chosen. Representing these events separately preserves this distinction
and ensures that attempts, completions, and scored actions are counted correctly.

If level ℓ has human baseline hℓ, completion indicator cℓ, and uses aℓ scored actions, define its
efficiency contribution as follows. Under the protocol, completion follows an ordinary action, so
cℓ = 1 implies aℓ ≥ 1.

eℓ =

(min(cid:8)115, 100(hℓ/aℓ)2(cid:9) ,
0,

cℓ = 1 and aℓ > 0,
cℓ = 0.

Indexing levels from one, write wℓ = ℓ for the official later-level weight. Game RHAE is
(cid:26) P
ℓ wℓeℓ
P
ℓ wℓ

P
ℓ wℓcℓ
P
ℓ wℓ

, 100

min

(cid:27)

.

Model identification is thus instrumental: it is valuable only when it improves weighted completion
or reduces scored interaction.

These protocol distinctions must be preserved in the evidence shown to the agent and verifier.
We therefore record not only grids and actions, but also what role each observation played in the
interaction.

Definition 3 (Typed interaction history). At each decision point, the history records the grid,
available ordinary actions, and current outcome. After an action, it records the chosen action and
its scored cost, any transient frames, the successor decision output or terminal frame, and any
reset or level boundary created by the protocol. Each grid is tagged by its role: decision, transient,
completion terminal, fatal terminal, reset initialization, or next-level initialization. A history is
faithful when every recorded action is attached to the decision frame from which it was chosen, never
to a transient or terminal frame.

Let O denote the space of these one-step records. Their purpose is to preserve what the agent
knew when it chose an action and what the environment returned as a consequence. This matters
because identical pixel grids can have different meanings when one is a decision frame and another
is an animation or terminal frame. The tags prevent the model builder and verifier from fabricating
transitions between observations that were never consecutive decision frames.

3.2 Identifiability and partial prediction

Interaction can reveal relevant mechanics, but cannot distinguish internal implementations that
produce the same consequences for every future action sequence. The operational target is therefore
to retain every distinction in the interaction history that could change what happens under a
future action. Two histories are interaction-distinguishable if some common legal continuation
yields different future typed evidence, cost, outcome, or level progression. A history encoding is
interaction-sufficient when its value and a future action sequence determine these quantities.

9

Proposition 1 (History-state lower bound). Every interaction-sufficient encoding assigns different
states to every pair of interaction-distinguishable histories. Consequently, the current rendered grid
and action mask are insufficient whenever two such histories share that visible output.

Proof. Suppose distinguishable histories h and h′ receive the same encoded state.
Interaction
sufficiency requires every common legal continuation to induce the same typed evidence, cost,
outcome, and progression from that state. This contradicts interaction distinguishability. The
second claim follows by choosing h, h′ with equal current render and mask, as can occur with an
unrendered switch, timer, inventory bit, or off-screen structure.

A useful model need not predict every visual detail. To distinguish an abstraction from an incorrect
full-frame prediction, we allow a modeled renderer to abstain on pixels it has not determined.

Definition 4 (Partial output prediction). A learned renderer may return

ˆρ(ˆs) ∈ ({0, . . . , 15} ∪ {⊥})64×64,

where ⊥ abstains on a pixel not determined by the model’s encoded knowledge. It may also return
a bounded set V (ˆs) of observation variants for display-level ambiguity such as quantization. The
output concretization ΓO(ˆρ, V ) ⊆ G contains the full grids agreeing with the canonical render or a
variant on every predicted cell. For an observed grid g, the prediction is accepted when it claims at
least one cell and g ∈ ΓO(ˆρ, V ). Its coverage is the fraction of cells claimed by the canonical render,

cov(ˆρ) =

1
4096

|{(i, j) : ˆρ(ˆs)ij ̸= ⊥}| .

These are Tycho’s two mechanisms for uncertain output: local abstention and a set of alternatives.
This is intentionally simpler than maintaining a distribution over colors at every cell. Alternatives
are used only to check predictions against evidence. Planning uses the canonical rendering.

(a) Abstain on newly exposed cells

(b) Return bounded alternatives

observed gt

predicted ˆρ(ˆst+1)

observed gt+1

Zoomed 64-cell bar

n = 0 : p0 = 64 lit cells

right

verify

⊥
⊥
⊥
⊥
⊥
⊥

n = 1 : p1 = 63 lit cells
pn = round(64(M − n)/M )
p1 = 63 =⇒ M ∈ {43, . . . , 127}
Possible next outputs

tu93 start; true M = 50

p2 = 61 :
p2 = 62 :
p2 = 63 :

. . .
. . .
. . .

⊥ claims nothing about the unseen column;
known cells remain checkable.

Observed next HUD: p2 = 61

Observation leaves M ∈ {43, . . . , 51}.

Figure 3: Tycho’s two mechanisms for uncertain output. In (a), scrolling exposes cells the model
has not determined, so it abstains only there and receives lower coverage. Panel (b) uses an actual
tu93 frame. Its 64-cell HUD quantizes a hidden move budget. After one action, three next bar
lengths remain compatible with the visible evidence.

Figure 3 separates localized ignorance from finite display ambiguity. Abstained cells make no
correctness claim and reduce coverage. Adding a complete observation variant does not. Panel (b)

10

instantiates finite ambiguity with the actual tu93 renderer. If M is the unobserved initial move
budget, then after n ordinary actions it displays pn = round(64(M −n)/M ) lit cells. The observations
p0 = 64 and p1 = 63 leave every M ∈ {43, . . . , 127} compatible, yielding p2 ∈ {61, 62, 63}. Observing
p2 = 61 narrows the range to {43, . . . , 51} but still does not identify M . The three complete next
grids can be returned as observation variants. Variants describe alternative renderings of one
model state, not alternative underlying states. Because the candidate budgets also imply different
termination times, Tycho keeps them as distinct hypotheses and plans from one selected executable
hypothesis. Neither mechanism makes the environment stochastic.

Remark 1 (Available-action masks). Action legality is part of the machine output because it
constrains action selection even when two rendered grids are identical. The public games inspected
here did not vary the mask within a game, but the interface also supports dynamic masks.

Finite histories often leave multiple hypotheses. Tycho does not maintain an explicit version space:
the language-model policy can record competing hypotheses in its notes, choose one to encode as
the current executable model, and spend an action to distinguish them when useful. Section B
formalizes this interpretation and the trade-off between information and scored action cost.

4 Tycho: Constructing Programmatic World Models

Tycho realizes the formal setting with four connected components. The harness records observations
and submitted actions in a structured interaction record. A free-form executable program repre-
sents a revisable hypothesis about task-relevant state and dynamics. Verification compares that
hypothesis with recorded experience, while planning exposes its consequences for future decisions.
A metareasoning policy decides when to construct, repair, use, or bypass the model. Only the actor
can call take_action and thereby change the environment.

4.1 Evidence and task memory

Each game run has a separate on-disk workspace containing two kinds of information: observations
and events recorded by the harness, and notes and programs maintained by the actor or builder.
Recorded experience is the empirical reference for verification. A program may explain or predict
that experience, but its simulated states are not added to the interaction record.

Evidence interface. At each turn, the actor receives the current decision frame and its action
mask, and may submit one control through take_action. The harness saves the frame and metadata
under level_L/turn_NNN.{txt,png,json}. Within Python code execution, the current grid is
preloaded as grid, while a library (wmlib) provides parsed access to prior decision frames and
ordinary transitions, archived reset attempts, completed-level terminal events, fatal events, and
animation events. Terminal, fatal, and animation frames remain separate from ordinary transitions
because the actor never chooses an action from them. The no-model policy receives the same
evidence interface. Model-using policies additionally maintain an editable world model and may
verify it or search its predicted states.

11

Figure 4: Querying accumulated evidence in the GPT-5.6 Sol/Orchestrator run on cd82. The
displayed filter simplifies a broader transition audit issued at the start of Level 5. The focused view
at left identifies the brush head and canvas in the turn-0 frame. The two matches below the results
show the brush stamping its color into the same 3 × 4 canvas region across Levels 2 and 4; each
transition also changes one HUD-counter cell.

Persistent task memory. The workspace persists across levels of a game even though Tycho
clears the conversation at each level boundary. Before clearing it, a consolidation pass writes level
summaries. Actor beliefs, builder notes, helper programs, the executable model, and validated
plans also remain in the workspace. Resets archive abandoned attempts rather than erasing them.
Independent runs use separate workspaces and never share information across games. Animation
events have an index of selected keyframes. The actor loads exact frames only when needed.

4.2 Executable hypothesis language

A Tycho world model is a Python program that implements four required functions:

1. init_state, which maps a level’s first observed frame and index to a modeled state.

2. transition, which advances that state under an action.

3. render, which maps the state back to an observed grid and may abstain on genuinely undeter-

mined cells.

4. outcome, which classifies the state as ongoing, level complete, or game over.

It may also implement bounded observation_variants for display-level quantization ambiguity
and planner-facing hooks for candidate actions, subgoals, a heuristic, a state key, or a custom
planner.

The program constructs a separate start state for every level. Layout, object positions, counters,
selected tools, and other setup values may therefore differ by level, while the transition, rendering,
and outcome functions express mechanics intended to generalize across the game. This implements
the distinction between the level-specific state sℓ
0 and shared mechanics θ introduced in Section 3.
The modeled state is deliberately game-specific. It may store the grid directly, an object list, a
finite-state controller, a user-interface mode, a selected color or tool, a counter, geometric constraints,
or a combination of these. Tycho therefore does not require an object-centric decomposition in
advance. Although many ARC-AGI-3 games are naturally described in terms of objects, others are

12

better represented as user interfaces, cellular automata, editing tools, counters, hidden modes, or
rule systems. The agent chooses a state representation after observing the game.

Programs are not the only possible world-model representation. Neural latent models can represent
rich continuous dynamics (Ha and Schmidhuber, 2018; Hafner et al., 2020), and tree-search systems
can use learned dynamics for planning (Schrittwieser et al., 2020). Programs are particularly suitable
here because the observations are discrete, many environments are algorithmic, individual prediction
errors can be localized exactly, scored actions reward reusable rules, and language-model agents can
write and debug code. Tycho uses Python programs, but its evidence, verification, planning, and
model-allocation interfaces do not depend on that choice.

The program can carry information absent from the current grid, such as a counter, camera offset,
or selected tool, forward through the action history. Re-parsing each frame independently would
discard this information. When some pixels remain genuinely undetermined, the renderer may leave
them unclaimed as explained in Section 3. Planning operates on the model’s explicit internal state,
while verification reports both accuracy on claimed pixels and prediction coverage.

4.3 Verification and planning

Verification and planning answer different questions. Verification tests whether the learned program
replays interactions that have already been observed. Planning starts from the replayed model
state and searches the program for an action sequence whose modeled endpoint is level_complete.
When invoked through plan.py, Tycho canonically replays the candidate and writes a validated
artifact anchored to the current model and starting frame, with an expected-frame hash for every
step. This establishes the route’s internal consistency under the learned program, not its correctness
on unobserved environment transitions. The actor receives the validated route as conditional advice
and commits one action at a time. On subsequent turns, Tycho surfaces the next action only
while the model is unchanged, the observed frame matches the stored hash, and the action remains
available. The automatic planner probe is separate and advisory. It is level-local, requires an
accepted replay of the current-level prefix and no falsified current-level outcome evidence, and can
surface a candidate first action and short plan prefix. It does not write the guarded artifact. The
actor must re-observe after acting and re-plan from the resulting state. Earlier-level mismatches
remain warnings rather than blocking search. Section B formalizes the stronger condition under
which following a validated route preserves the real outcome and action count.

Operational verification. Verification replays the most recent attempt for each level from its
first frame and compares predicted with recorded observations. A transition enters the grading set
if the recorded successor differs from the recorded predecessor, or if the recorded grid is unchanged
but the model predicts a visible change. The latter case penalizes false motion on a real no-op.
Transitions for which both observation and model remain visually unchanged still advance the
threaded model state but do not enter this score. Every claimed predicted cell is checked against the
recorded successor. Partial renders therefore report both known-cell accuracy and coverage, while
bounded observation variants affect only compatibility testing. Outcomes are verified separately
because a model may reproduce motion while misidentifying the goal or a hazard. Recorded winning
and fatal actions test whether the predicted successor returns level_complete or game_over and,
when available, renders the associated terminal frame. Ordinary decision states should remain
ongoing.

13

Planning from threaded state. Planning starts from the state obtained by replaying the
current level history through the model rather than reparsing the latest grid, thereby preserving
accumulated hidden variables. For click-heavy games, the lightweight planner relies on the model to
propose a focused action set rather than expanding every grid cell.

Figure 5 makes this data flow concrete in a toy 4 × 4 maze. For the recorded transition (g0, a0, g1),
panel (a) instantiates the learned counterparts of the maps in Section 3: it constructs ˆs0, applies ˆδ
to obtain ˆs1, renders ˆg1 = ˆρ(ˆs1), and compares that prediction with g1. Starting from the threaded
state ˆs1, the planner finds and canonically replays a four-action route to level_complete, recording
a hash of the predicted observation after each action so that divergence can be detected during
execution.

(a) Learned transition check

(b) Planner searches the threaded model state

evidence

a0 = RIGHT

✓ prefix accepted

g0

recorded g1

=

replay

ˆs0 =
ˆι(g0, ℓ − 1)

ˆδ( · , a0)

ˆg1 = ˆρ(ˆs1)

threaded ˆst

step 1

step 2

step 3

ˆω(ˆst+4) =
level complete

Plan: RIGHT −→ UP −→ UP −→ UP −→ level complete

Figure 5: Synthetic illustration of verification and planning. Panel (a) connects the learned
initialization, transition, and rendering maps to the formal model in Section 3. Panel (b) starts
from the accepted current-level replay state and searches for a state classified as level_complete.

4.4 Metareasoning over model use

Constructing and maintaining a model consumes inference that could otherwise be spent on direct
reasoning. Tycho therefore makes this allocation policy an explicit experimental object through four
benchmarkable policies. Under no-world-model, the actor receives the game interface without an
executable model contract. This is the direct-reasoning baseline for the matched comparison. Under
single, one actor both reasons and edits the model. Under orchestrator, the actor may call a focused
model-building subagent. Under trigger, the harness invokes the model builder when verification
reports an unusable model, insufficient prediction coverage, a transition mismatch, or an outcome
inconsistency. It also invokes the builder at new-level and fatal-reset boundaries. These policies test
whether world modeling should remain actor-owned, be delegated to a specialist, or be triggered
automatically after verification failure.

The policies differ in who edits the executable model and what initiates an edit. They never delegate
environment actions. In builder-based policies, the builder may update the model and return advice,
but only the actor can act in the environment.

14

Policy

Model editor

When construction or repair runs Role in the comparison

No world model
Single

—
actor

never
at the actor’s discretion

Orchestrator

builder

when requested by the actor

Trigger

builder

after falsification or a lifecycle
event

direct-reasoning baseline
integrated reasoning and
modeling
delegated specialist modeling
(subagent)
automatic model repair

Table 1: The four evaluated task-time model-maintenance policies. All share the interaction record
and actor-only action protocol. They jointly vary model ownership, specialist access, and realized
inference allocation.

5 Evaluation

We evaluate Tycho on all 25 public ARC-AGI-3 demonstration games.1 Five were randomly
designated for harness development: tr87, vc33, r11l, bp35, and ft09. Reporting the full set
preserves scorecard comparability and avoids a selectively defined evaluation subset.

We organize the analysis around three hypotheses:

1. Selective executable world-model use improves completion and action efficiency over direct

reasoning.

2. Accurate transition prediction alone does not ensure strong gameplay: correct outcome inference

and effective use of model advice also matter.

3. A free-form model contract can accommodate task-specific representations, while automatic

repair trades more exact models for additional builder calls and inference.

We evaluate the four policies in Table 1 in a matched comparison over the full public demonstration
set of 25 ARC-AGI-3 games (183 levels in total) using Opus as backend model. We use this matched
comparison to select the policy with the highest RHAE score, then evaluate that policy with GPT-5.6
Sol and Opus 5 as separate complete-system evaluations under the reported configurations.

Shared configuration. Table 2 gives the matched and selected-policy configurations. Games are
played against the locally cached ARC engine. Each completed trace is checked for frame, state,
and level-count agreement, then replayed through the ARC-AGI API in competition mode (ARC
Prize Foundation, 2026a). Inference ceilings use a post-action boundary: the action cycle crossing
the nominal limit remains in the trace, and the game stops before the next request. The live harness
and canonical exporter use the same accounting rule.

5.1 Experimental results

Metrics. Our primary performance metric is mean game RHAE: the arithmetic mean of the
official per-game RHAE scores over the 25 games. We also report games completed, levels completed,
and scored environment actions. RHAE uses the upper-median first-run human action count for each
level as its efficiency baseline (ARC Prize Foundation, 2026a). Separately, we compare each agent

1https://arcprize.org/arc-agi/3

15

Parameter

Policy selection

Selected-policy evaluation

Language model
Reasoning effort
LM-call budget / game
Inference budget / game
Tool steps / turn
Answer budget / LM call
Policy
Scoring

Claude Opus 4.8
xhigh
3500
$750
40
24,000
four matched policies
official scorecards from deterministic competition replay

GPT-5.6 Sol / Opus 5
max / xhigh
3500
$1,500 (not reached)
40
24,000
orchestrator

Table 2: Two-stage public-set evaluation. The first stage holds the listed configuration fixed and
varies the model-maintenance policy. The second evaluates the selected policy with two frontier
models. The configured answer budget is not the provider request cap: requests add effort-dependent
headroom because hidden reasoning and visible output share the provider limit.

trajectory with the released distribution of first-run human replays; the resulting game-balanced
midrank reveals near-ceiling performance that capped RHAE can obscure.

The model diagnostics ask three questions: can the model execute before an action, does it predict
the next rendering, and does it classify boundaries correctly? They use the model version available
before each action. The pre-action model-execution rate is the fraction of non-RESET actions for
which replay, the committed action’s transition, rendering, and a valid outcome all execute. Among
graded ordinary non-boundary actions with an executable render, a cell is claimed when the model
predicts one of the 16 colors rather than returning -1 to abstain. Accepted transition match requires
at least one claimed cell and requires every claimed cell to match the next frame, using either
the canonical render or one of at most five bounded variants with the same unknown-cell mask.
Prediction coverage is the fraction of frame cells claimed by the canonical render; an unknown cell is
an abstention, not a correct prediction. Terminal-outcome recall measures correct level_complete
or game_over predictions on recorded boundary actions for which the pre-action model executes,
while the terminal false-positive rate measures terminal predictions on evaluable ongoing actions.
We call an evaluable level, meaning one with at least one graded transition, transition-exact under
the accepted verifier when every graded transition is accepted. This binary level summary does not
require strict full-frame equality. End-of-run model results are labeled separately. Strict full-frame
match and other supporting diagnostics appear in Section D.

An exactly followed recommendation is the same fully specified action, including click coordinates,
committed later in the turn in which it was surfaced. Builder calls count explicit builder invocations,
and inference costs apply each provider’s public list prices to recorded token and cache traffic. The
game-balanced human-replay midrank compares an agent and a first-run human replay first by levels
completed and, when tied, by actions through the last completed level. It then averages the resulting
same-game midranks uniformly over games.

Matched policy selection. The direct-reasoning no-world-model baseline reaches 79.07 RHAE,
confirming that a frontier model with Tycho’s durable typed evidence and workspace interface is
already a strong ARC-AGI-3 agent. The integrated single policy reaches 85.36, and the builder-
delegating orchestrator reaches 88.49. The trigger policy, which calls the builder after verification
failures rather than leaving model construction under direct actor choice, reaches 83.07: above the
no-world-model baseline, but below both single and orchestrator. The four policies complete 19, 19,
21, and 18 games and 157, 162, 166, and 162 levels, respectively. Trigger produces much higher

16

Figure 6: RHAE in the two-stage evaluation. Four matched Opus 4.8 runs select the orchestrator
policy, which is then evaluated with GPT-5.6 Sol and Opus 5 as separate system results.

accepted transition match, but makes more builder calls, spends more inference, and completes
fewer levels. Accurate transition prediction therefore does not by itself ensure strong game-playing
performance: when the model is built and how its advice is used also matter. All four closed
competition cards are public: no world model, single, orchestrator, and trigger. With the orchestrator
policy fixed by the Opus 4.8 study, GPT-5.6 Sol reaches 100.00 public-set RHAE under official
scoring (public scorecard), completing all 25 games and all 183 levels in 7,766 scored actions. An
Opus 5 run also reaches 100.00 RHAE (public scorecard), completing all 25 games and all 183 levels
in 6,641 actions.

Selected using Opus 4.8, the orchestrator policy reaches 100.00 public-set RHAE with GPT-5.6
Sol, providing evidence of transfer across model families. Opus 5 reaches the same score with fewer
actions.

Efficiency beyond capped RHAE. The headline score compresses substantial differences
in action use. Orchestrator completes the most levels (166) while using 10,354 actions, 20.3%
fewer than direct reasoning for nine additional levels. Trigger spends still fewer actions (9,442)
and completes 162 levels; single reaches the same progress with 11,576 actions. Raw totals are
not matched efficiency comparisons because the policies reach different levels. On the 157 levels
completed by both orchestrator and direct reasoning, orchestrator uses 7,187 actions versus 8,857,
an 18.9% reduction: it is more efficient on 81 levels, less efficient on 42, and tied on 34. Against
direct reasoning on their respective matched sets, single reduces actions by 8.5% over 153 levels and
trigger by 11.9% over 150 levels. Trigger’s shorter unfinished tails are budget-censored. It spends
1,361 actions after the last completed level, versus 4,140 for direct reasoning, 2,403 for single, and
1,842 for orchestrator. Every unsuccessful matched-study game hits an imposed limit, including five
trigger runs that hit the LM-call limit (Table 10).

The selected-policy GPT run moves the frontier in both dimensions: it completes 17 more levels
than the Opus 4.8 orchestrator while using 7,766 actions, 25.0% fewer overall. Opus 5 also completes
17 more levels than the matched orchestrator in 6,641 actions, 35.9% fewer overall. Relative to
GPT-5.6, it uses 14.5% fewer actions at the same complete coverage. RHAE only partially reflects

17

No world modelSingleOrchestratorTriggerOrchestrator+ GPT-5.6 SolOrchestrator+ Opus 565707580859095100Official public-set RHAE79.0785.3688.4983.07100.00100.00select orchestrator policySeparate policy selection from frontier-model evaluationthis behavior. Per-level efficiency is clipped at 115, and game score is further bounded by weighted
completion. Consequently, 114/157 direct, 133/162 single, 138/166 orchestrator, and 124/162
trigger completions already saturate the per-level cap. The corresponding counts are 167/183 for
GPT-5.6 and 171/183 for Opus 5. We therefore complement RHAE with the completed-level actions,
unfinished tails, and cap counts in Figure 7.

Figure 7: Action use and score saturation. Left: actions assigned to completed levels and to
unfinished tails. Right: completed levels and the subset at the per-level RHAE efficiency ceiling.
Trigger uses the fewest actions in the matched study, orchestrator completes the most levels, and
both selected-policy frontier runs advance the completion/action frontier.

Paired game-level effects. Because the public set contains only 25 games and many games
saturate at 100 RHAE, aggregate means alone are not sufficient. Figure 8 shows the saturation
pattern, while Table 3 reports paired per-game deltas with descriptive game-resampling intervals.
Resampling paired deltas over games asks whether a conclusion depends on the particular mix of
games in the public set. It does not measure run-to-run model variability. Within the observed
trajectories, orchestrator exceeds no world model by 9.42 RHAE. Its resampling interval excludes
zero, and deleting any one game leaves a difference between +7.63 and +10.14. Differences among
the three model-using policies are less uniform. Their intervals include zero because they trade wins
across games and tie on 9–12 games, often at saturation. Thus, the observed delegation advantage is
distributed across the public games rather than driven by one game. No model-maintenance policy
dominates every game.

Human replay comparison. We also compare against the ARC Prize public human replay
release (Kamradt, 2026b). The release contains 340 usable first-run replays. We do not construct
synthetic 25-game “human players,” because the public files do not expose stable participant
identifiers across games. Instead, for each game we compare the agent to the empirical distribution

18

No world modelSingleOrchestratorTriggerGPT-5.6Opus 502000400060008000100001200014000Scored environment actions12,99711,57610,3549,4427,7666,641Where actions were spentcompleted levelsunfinished tailNo world modelSingleOrchestratorTriggerGPT-5.6Opus 50255075100125150175Levels157114162133166138162124183167183171Completion and score saturationcompletedat efficiency capFigure 8: Per-game public-set RHAE. The first four rows are the matched Opus policy study; the
separated last two rows use the selected orchestrator policy with GPT-5.6 Sol and Opus 5. Columns
are sorted by the Opus orchestrator’s gain over direct reasoning. Row colors match the policy color
scheme used throughout the paper, with paler cells indicating lower RHAE. Black outlines mark
games discussed as case studies or diagnostics.

Paired comparison

Mean ∆ RHAE 95% resampling interval +/0/− games

Single − no world model
Trigger − no world model
Orchestrator − no world model
Orchestrator − single
Orchestrator − trigger

+6.28
+4.00
+9.42
+3.14
+5.43

[−0.67, 13.15]
[−6.35, 15.68]
[3.97, 15.76]
[−2.61, 9.28]
[−6.73, 16.44]

11 / 9 / 5
8 / 9 / 8
11 / 11 / 3
9 / 12 / 4
10 / 11 / 4

Table 3: Paired public-game deltas. All comparisons have median zero because many games tie.
Descriptive bootstrap intervals resample the 25 paired game deltas and measure sensitivity to
benchmark composition, not run-to-run model variability.

of human replays for that same game using lexicographic progress/action ordering: more completed
levels is better, and among runs with the same progress, fewer actions to the last completed level
is better. We then average the resulting midrank uniformly over games: a strictly beaten replay
contributes one, an exact tie one half, and a replay ahead of the agent zero. This is the expected
midrank for a uniformly sampled public game and first-run replay (it is not the percentile of one
human participant across 25 games). Human sample sizes are uneven (10–54 usable replays per
game), but each game receives equal weight in the game-balanced midrank.

The matched policies show that action efficiency and completion are distinct. Trigger uses only
57.2% of the official human-baseline actions on the levels it completes, yet orchestrator completes
four more levels and attains the higher human midrank. Both frontier runs are stronger on both
dimensions. GPT-5.6 uses 45.3% of the aggregate baseline over all 183 levels, reaches the empirical
top decile on 24 games, and meets or exceeds the best observed replay on 22. Across all 183 levels,

19

sp80bp35wa30g50ttn36lf52ka59s5i5cd82re86cn04ar25ft09lp85m0r0r11lsc25su15tr87vc33dc22sk48ls20tu93sb26Games sorted by orchestrator gain over no-world-modelNo world modelSingleOrchestratorTriggerGPT-5.6 Sol(selected orchestrator)Opus 5(selected orchestrator)47.6362.269.574.51071.384.289.896.196.910010010010010010010010010071.40100100100100279.794.595.427.375.010010010089.610010010010010091.953.710010010027.896.810010010041.096.810010027.388.210010010010010010010010010010010010010071.4097.997.792.1100080.089.618.927.310058.310099.396.910010010010010010072.910010066.310069.510097.4100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100100Policy selection with Opus 4.8, then frontier-model evaluation020406080100RHAEFigure 9: Paired public-game RHAE deltas. The no-world-model comparisons show large wins
alongside many saturated ties; the lower panels compare the three model-maintenance policies
directly.

20

−40−2002040sp80bp35wa30g50ttn36lf52ka59s5i5cd82re86cn04ar25ft09lp85m0r0r11lsc25su15tr87vc33dc22sk48ls20tu93sb26mean +6.28; median +0.0095% game bootstrap [-0.7, +13.2]Single - no world model−1001020304050mean +9.42; median +0.0095% game bootstrap [+4.0, +15.8]Orchestrator - no world model−2002040RHAE deltasp80bp35wa30g50ttn36lf52ka59s5i5cd82re86cn04ar25ft09lp85m0r0r11lsc25su15tr87vc33dc22sk48ls20tu93sb26mean +3.14; median +0.0095% game bootstrap [-2.6, +9.3]Orchestrator - single−100−75−50−250255075RHAE deltamean +5.43; median +0.0095% game bootstrap [-6.7, +16.4]Orchestrator - triggerPolicy / model

Game-balanced
midrank

Pooled strict
win

Top-decile
games

Baseline action
ratio

No world model / Opus 4.8
Single / Opus 4.8
Orchestrator / Opus 4.8
Trigger / Opus 4.8

Orchestrator / GPT-5.6
Sol
Orchestrator / Opus 5

79.86
83.23
86.14
81.97

98.47

81.18
84.12
87.06
82.94

98.53

13 / 25
14 / 25
17 / 25
15 / 25

24 / 25

100.00

100.00

25 / 25

1.43
1.54
1.67
1.75

2.21

2.58

Table 4: Human replay comparison. Game-balanced midrank is the exact empirical statistic over
the released first-run replays, with equal weight per game. Pooled win is the fraction of replays
strictly beaten, and “top-decile” counts games reaching the empirical cutoff. The baseline action
ratio compares official human baselines with agent actions on completed levels, so values above one
mean the agent used fewer actions at its achieved progress. The two selected-policy frontier runs
are shown separately.

Opus 5 uses 38.8% of the aggregate baseline, reaches the top decile on all 25 games, and meets or
exceeds the best observed replay on all 25.

To place the human comparison in context, we applied the same ordering to Tycho’s three orchestrator
scorecards, every nonhuman community-leaderboard entry whose linked scorecard exposes all 25
public games, and contemporaneous systems that release equivalent 25-game progress and action data
(Table 5; ARC Prize Foundation, 2026c). Official scorecards are parsed directly. For OPINE-World
and Schema we sum released per-level action counts through the last completed level; for Rodionov’s
component study we use its released “Steps on Solved” field, which is the same sum (Courtis et al.,
2026; Zeng et al., 2026; Rodionov, 2026b). PRO-LONG releases 25 official single-game scorecards for
its first Fable 5 pass, while Continual Harness links a complete official scorecard (Fox et al., 2026a;
Karten et al., 2026). NOOA likewise releases complete scorecards for its GPT-5.5 and GPT-5.6 Sol
fleets (Furgale et al., 2026).

The resulting comparison changes the external reference point substantially. Rodionov’s fixed-
verification run reaches a human midrank of 96.38, Schema’s selected fallback result 95.27, and
PRO-LONG’s first pass 88.71. The older Rodionov row is the scorecard associated with the original
executable-world-model paper (Rodionov, 2026c); we identify it by the paper and method rather
than its repository nickname. Selection protocols remain material: Schema retains the better
trajectory after conditionally rerunning games, whereas the PRO-LONG row excludes the additional
runs used for its 97.4 headline. The 25 released first-pass scorecards average 94.71, slightly above
the paper’s rounded 94.6. DreamTeam’s row is its released scorecard (38.06), not the paper’s
two-run mean of 38.4 (Sarafian et al., 2026). Continual Harness’s released run reaches a 26.53
human midrank at 20.54 RHAE. NOOA reaches human midranks of 81.89 with GPT-5.6 Sol and
57.60 with GPT-5.5 under its two-hour fleet protocol. Read-Grep-Bash exposes only one game. We
found no compatible current public-25 artifact for Duck Harness; AERA does not provide directly
comparable outcome-based counts for the reason noted above; and graph-based exploration reports
the earlier six-game preview. These systems are therefore not assigned a human midrank.

Cost and context. Table 6 reports cost-relevant serving statistics. For the matched study we use
Anthropic’s public Claude Opus 4.8 list prices (Anthropic, 2026b): $5 per million fresh input tokens,

21

System

LLM

RHAE Top-decile games Human midrank∗

Opus 5
GPT-5.6 Sol
GPT-5.6 Sol
Opus 4.8/Fable 5
Fable 5
Opus 4.8
GPT-5.6 Sol
Opus 4.8
Vision Large

Tycho
Tycho
Rodionov verification
Schema
PRO-LONG (first pass)
Tycho
NOOA
OPINE-World
Vision – Continual Learning v1
Rodionov executable WM (original) GPT-5.5
GPT-5.5
NOOA
Opus 4.6
TELL
Opus 4.6/GPT-5.5
DreamTeam (released run)
Gemini 3.1 Pro
Continual Harness
Opus 4.6
a-evolve MAS Evolved
Opus 4.7
OpenClaw

100.00
100.00
98.97
98.98
94.71
88.49
85.13
78.40
63.15
63.74
50.22
43.90
38.06
20.54
12.30
5.20

25 / 25
24 / 25
23 / 25
20 / 25
15 / 25
17 / 25
15 / 25
12 / 25
11 / 25
9 / 25
5 / 25
3 / 25
4 / 25
1 / 25
0 / 25
0 / 25

100.00
98.47
96.38
95.27
88.71
86.14
81.89
79.42
68.28
63.08
57.60
52.91
40.18
26.53
26.18
16.25

Table 5: Human-replay comparison for publicly auditable 25-game trajectories using the comparison
rule in Table 4. Rows are sorted by human midrank, then RHAE. They may differ in model and
selection protocol; the text states the non-single-pass cases. ∗ Human midrank is shown only as
cross-protocol context.

$25 per million output tokens, $0.50 per million cache-read tokens, and the five-minute cache-write
rate for writes. The GPT transfer uses its corresponding public schedule (OpenAI, 2026): $5 fresh
input, $30 output, $0.50 cache read, and $6.25 cache write per million tokens. For Opus 5 we
retain the same Opus-rate vector recorded by the run’s budget accounting ($5/$25/$0.50/$6.25
per million fresh-input/output/cache-read/cache-write tokens), and therefore label its dollar value
an API-equivalent estimate. The four 25-game runs correspond to budgeted list-price totals of
approximately $5.66k (no world model), $7.27k (single), $5.78k (orchestrator), and $8.03k (trigger).
Orchestrator therefore obtains the highest score at essentially the same estimated cost as no world
model. Single’s per-game costs remain heavy-tailed: its mean is $291, but its median is $151. The
GPT transfer is estimated at $4.47k total, or $179 mean and $114 median per game. Its largest
game cost is $649, so the nominal $1.5k ceiling never fires. Despite using the stronger model, this
run is cheaper than the matched Opus model-using policies because it consumes substantially fewer
output and cache-read tokens. Opus 5 is estimated at $2.99k total, or $119 mean and $97 median
per game; its largest game is $303. This accounting includes usage retained for interrupted or
resumed inference attempts even when no subsequent environment action was committed.

Cross-system cost normalization. The available artifacts permit direct repricing for OPINE-
World, sensitivity analysis for Rodionov, and a partial audit for PRO-LONG, but not a dollar
reconstruction for Schema. Repricing OPINE-World’s released actor and synthesis-agent counters
at current Opus 4.8 API rates gives $12.4–15.2k across 25 games, compared with $5.78k for Tycho’s
orchestrator. The range is necessary because the archive reports aggregate cache-creation tokens
but not their TTL split (five minute or one hour rate). On this normalized same-model comparison,
Tycho achieves the higher score at less than half the list-price inference cost.

Directly converting the 90.75M and 103.49M cost tokens for Rodionov’s GPT-5.6 Sol verification
runs gives $2.72k and $3.10k under the observed subscription-backed cache mix, in which 97–98%

22

Policy

Calls

Fresh Cache read Cache write Output Mean / median

No world model
Single
Orchestrator
Trigger

GPT transfer
Opus 5

22.9k
25.6k
24.1k
44.4k

26.5k
15.1k

404M
594M
390M
609M

69.8M
322M

4,068M
4,936M
3,286M
3,610M

949M
947M

125M
155M
207M
255M

512M
50.7M

32.8M
34.3M
35.8M
63.1M

15.0M
23.4M

$226 / $106
$291 / $151
$231 / $169
$321 / $264

$179 / $114
$119 / $97

Table 6: Serving statistics and model-specific API-equivalent estimates. Token columns total 25
games; “Fresh” excludes cache reads and writes, and the last column gives mean/median per-game
cost.

of input is recorded as cache reads and cache writes are not reported. The authors caution that
preliminary API-key tests had lower cache-hit rates and cost roughly five times this projection,
yielding empirical reproduction sensitivities of approximately $13.6k and $15.5k (Rodionov, 2026a,b).
These are 3.0–3.5× Tycho’s $4.47k selected GPT transfer and 4.6–5.2× its $2.99k Opus 5 run.
Under Rodionov’s subscription-backed cache mix, however, the direct $2.72k–$3.10k projection is
comparable to the Opus 5 estimate.

PRO-LONG weights Fable 5 output, cache reads, and one-hour cache writes at 5, 0.1, and 2
fresh-input tokens, matching the public $10/$50/$1/$20 per-million schedule (Fox et al., 2026a;
Anthropic, 2026b). Its reported 150M billed-token equivalents therefore yield $1.50k for the first
pass, while the selective best-of-up-to-two protocol is reported at $1.75k. The latter is 1.7× lower
than Tycho’s $2.99k Opus 5 estimate. This is a plausible inference-cost advantage, helped by
PRO-LONG’s ability to execute up to 20 queued actions between model invocations, whereas Tycho
observes and checks every committed action. The exact total cannot be independently reconstructed
because the additional selected trajectories and their token telemetry are not included in the released
artifacts (Fox et al., 2026b). Its different model, 2,000-action allowance, and selective rerunning also
preclude a controlled cost comparison.

(a)

(b)

Figure 10: Compute–performance tradeoffs; labels give policy and model. (a) Mean public-game
RHAE versus API-equivalent cost. (b) RHAE of canonical trace prefixes at $100, $250, $500, and
$750 ceilings (left to right). Solid curves are matched-study policies and dashed curves are frontier
runs. Horizontal position includes the crossing action cycle; these are prefix analyses, not reruns.

23

100150200250300Mean API-equivalent cost/game (USD)80859095100Mean RHAENo world modelOpus 4.8SingleOpus 4.8OrchestratorOpus 4.8TriggerOpus 4.8OrchestratorGPT-5.6 SolOrchestratorOpus 5100150200250300Mean realized cost/game (USD)405060708090100Mean RHAENo-WM / Opus 4.8Single / Opus 4.8Orch. / Opus 4.8Trigger / Opus 4.8Orch. / GPT-5.6 SolOrch. / Opus 5Policy

Model exec. Accepted trans. Coverage LC recall (n) GO recall (n) Terminal FP

Single
Orchestrator
Trigger

89.3
83.5
52.0

13.9
16.2
88.1

99.7
100.0
99.3

21.1 (147)
20.0 (155)
77.7 (112)

0.0 (12)
0.0 (6)
0.0 (4)

0.97
0.58
0.59

Table 7: Pre-action model diagnostics (percent), using the definitions above. Accepted transition
match and coverage are micro-averaged over evaluable ordinary transitions; LC is level_complete,
GO is game_over, and FP is the false-positive rate.

Policy

Builder calls Recommendations Exact followed Action-name followed

Single
Orchestrator
Trigger

GPT transfer
Opus 5

0
147
1,192

660
130

29
68
970

644
129

25
35
552

634
109

25
54
748

636
122

Table 8: Builder activity and behavior after pre-action model advice. Exact following includes click
coordinates; action-name following compares only the action type. Single recommendations are
candidate first actions from automatic planner probes, while the other rows use builder reports.

Sensitivity to per-game cost limits. We replay each recorded trajectory only through the
action cycle that crosses a nominal $100, $250, $500, or $750 per-game limit, then recompute its
score. The agents were not rerun or told about these lower limits, so the curves show how much
of the final score had accumulated by each point. The right panel of Figure 10 shows two main
patterns. Within the matched study, at $100 direct reasoning leads single and trigger because model
construction has not yet paid off. Orchestrator reaches 86.57 RHAE and 163 completed levels by the
$250 limit, then gains only three levels and 1.92 RHAE by $750, while trigger needs more inference
to recover from its builder-heavy start. The frontier traces saturate faster: Opus 5 reaches 98.62 at
$250 and 100 by $500, while GPT-5.6 reaches 89.75 at $250 and 100 by $750.

Models available before action. The pre-action diagnostic evaluates the Python model available
before each committed action using only preceding history. The resulting pre-action model-execution
rates are 89.3%, 83.5%, and 52.0% for single, orchestrator, and trigger, respectively. If no usable
model version is available in the run record, the action counts as unavailable

The ordering rules out transition accuracy as a sufficient explanation of game-playing performance.
Trigger attains 88.1% accepted transition match and recognizes most completion boundaries, yet
scores below single and orchestrator, whose accepted transition match is 13.9% and 16.2%. None
predicts the small set of observed deaths in the evaluable prefixes. Single and orchestrator can
still benefit from structured scratch work, selective model use, later repair, and the actor’s own
reasoning. These pre-action diagnostics establish when an evaluated model was available and what
it predicted. They do not isolate its causal effect on the next action. Macro-averaged, missing-data,
strict-match, and repair- recovery checks in Section D preserve the same qualitative contrast.

World-model and planner diagnostics. End-of-run diagnostics show the same separation. The
end-of-run models are transition-exact on 25 of 137 evaluable completed levels under single (18.2%),
62 of 155 under orchestrator (40.0%), and 154 of 162 under trigger (95.1%), although trigger scores

24

below both other model-using policies. Full replay in Tables 11 and 12 reports 99.97% accepted
transition match for trigger, versus 45.56% for orchestrator and 22.24% for single. These end-of-run
measurements cannot determine how earlier model versions affected action, but they reinforce that
a more accurate simulator is not necessarily a better game-playing policy.

The executable pathway also remains active in the frontier runs. GPT-5.6’s end-of-run summaries
report a transition-exact model on 182 of 183 completed levels (99.5%), 660 builder calls, and
planner-bearing diagnostics on 34 completed levels. Of 644 parseable builder recommendations
surfaced before a GPT action, the actor commits the exact recommended action 634 times in the
same turn (636 match at the action-name level). This close temporal alignment shows that builder
advice is usually carried into the next action, but it does not isolate a causal effect because actor
and builder share the same evidence. Opus 5 reports transition-exact end-of-run models on 150 of
183 completed levels (82.0%), 130 builder calls, and planner-bearing diagnostics on 32 levels. It
exactly follows 109 of 129 surfaced builder recommendations (122 match at the action-name level).

Figure 11: World-model diagnostics for the matched Opus runs. Left: builder calls versus orches-
trator’s RHAE gain over direct reasoning; color encodes end-of-run accepted transition match,
marker size transition-exact levels, and crosses unavailable end-of-run replays. Right: completed,
transition-exact, and planner-bearing levels for each model-using policy.

Hypothesis verdict. The evidence supports the three hypotheses with different strength. First,
the observed matched runs are consistent with a benefit from selective executable-model use.
Single and orchestrator score above direct reasoning, whereas automatic trigger repair spends more
inference without attaining the best score. Second, accurate transition prediction is insufficient for
strong gameplay. Terminal-outcome recall remains weaker, sk48 models mechanics without the
objective, and trigger combines the highest accepted transition match with lower RHAE. Third,
the case studies illustrate how the free-form contract accommodates task-specific combinations of
representational devices, while automatic repair trades additional builder calls and inference for

25

05101520Builder invocations in game−1001020304050Orchestrator RHAE gainvs no-world-modelbp35g50tlf52sb26sk48wa30Builder work is targeted, not uniformly helpfulend-of-run replay unavailable0.00.20.40.60.81.0End-of-run accepted transition exactnessSingleOrchestratorTrigger0255075100125150175200Completed levels16225/137016662/1555162155/16234End-of-run model diagnosticscompleted levelstransition-exact levelsplanner-bearing levelsbetter transition match. The GPT result provides evidence of cross-family transfer of the selected
policy. Opus 5 reaches the same public-set score with fewer actions.

5.2 Executable Models in Use

Aggregate diagnostics do not show what an executable model contributes within a trajectory. We
therefore inspect two late-level successes with complementary state representations, one failure in
which model construction became counterproductive, and one transfer-run episode that exposes
repair and replanning. To illustrate exact replay and model-based planning, we use cd82, where
the canonical renders match all recorded graded transitions exactly and the model predicts the
level-completion outcome. We then deliberately examine two different levels of tu93 to show how
an executable model can support search with incomplete rendering and be locally repaired when a
previously unobserved interaction reveals a missing transition. Finally, sk48 is used to show that
correct mechanics are insufficient when the objective remains unresolved.

Exact Replay and Planning with an Executable Model.
In the matched Opus 4.8 Orches-
trator run, cd82 asks the agent to reproduce a target pattern by moving one of two paint droppers
over a canvas and selecting colors. The world model represents the canvas at its logical resolution,
the droppers and their orientations, the selected color, and the target pattern. Its transition program
composes the different paint operations, including rotated droppers and overlapping colors. Before
acting in level 4, the model’s canonical renders strictly matched all 38 graded transitions from
levels 0–3, rendered the new initial state exactly, and simulated a 13-action program to the goal.
The actor accepted the first recommendation and then executed the entire sequence, completing
the level on its first attempt. Figure 12 shows four intermediate simulated states and reports their
agreement with the corresponding observations. The case illustrates how an executable model can
replace trial and error with a verified sequence.

Figure 12: Planning with an Executable Model in cd82, level 4. From left to right, the initial
observation identifies the target and mutable canvas, the canvas is enlarged, and successive modeled
states apply the planned actions until the final state reaches the target and returns level_complete.
The diagonally offset cards behind the modeled states show the corresponding observed crops, with
green shading marking their agreement.

26

target legendmutable canvasState = {canvas[10x10], target[10x10],ring position, selected color, spout, won}(a) Initial observationN-wide blue+ N-spout red+ SW-wide green+ SE-wide orange(b) Enlarged modeled canvas sequenceorchestrator / cd82 / level 4Verified model: 38/38 prior graded transitions strictly matched; outcome verified.The simulated 13-action plan was executed in full and completed the level on the first attempt.step 2 • matches abstractionstep 4 • matches abstractionstep 9 • matches abstractiongoal • matches abstractionIn the matched Opus 4.8 Single run, level 6 of tu93
Search over a partially rendered state.
uses a different abstraction. The 64 × 64 rendered grid encodes a 9 × 13 room graph because each
logical cell occupies a block of pixels. The modeled state tracks passability, player and goal positions,
facing, hazards, move budget, and death. Following the partial-prediction contract in Section 3.2,
the renderer abstains on the uncertain remaining-moves HUD row, yielding 100% accepted transition
match at 98% prediction coverage. Predicting the HUD is unnecessary for the route. Over this
state, A* expands 189 nodes and returns a 13-action plan that deliberately removes a red hazard
before reaching the goal. The actor follows the recommended first action, and the subsequent
recorded trajectory matches the plan through completion (Figure 13). Thus a reduced-state model
can support reliable search without claiming every display pixel. Tycho still invokes a language
model around every committed action. A guarded executor could instead carry out several verified
actions and interrupt on a prediction mismatch, as discussed in Section 8.

Repair after a previously unobserved interaction.
In the GPT-5.6 Sol Orchestrator transfer
run, level 8 of tu93 combines moving orange patrols with two directional red hazards and a trail-
following chaser. The model had explained all prior evidence and predicted that the player could
enter an orange patrol’s cell because the patrol would move away. The action was safe, but for a
different reason: animation frames show the perpendicular contact expanding the patrol into an
explosion ring and removing it before the other entities move (Figure 14a–b). The resulting frame
therefore contradicted the assumed patrol transition while revealing a more general combat rule.

After the builder encoded perpendicular patrol removal, the model’s canonical renders strictly
matched all 168 graded transitions, including all 17 from the current level. From the corrected
turn-17 state, exact-state BFS visited 33 states and validated a shortest 12-action continuation. It
removes the two red hazards in sequence and then enters the green goal, whose completion rule had
already been verified on levels 0–7. The actor took the recommended first action and subsequently
followed the full route to the recorded completion (Figure 14c–d). Here verification does more than
score the model: it localizes a mismatch, after which the repaired state can immediately support
planning.

Figure 13: Planning over a reduced state representation in tu93, level 6. The 64 × 64 observation is
parsed into a 9 × 13 room graph in which diamonds mark hazards and the gold line is the 13-action
A* plan. The plan removes the red hazard on its way to the goal, and the recorded trajectory
follows it to completion.

27

(a) Decision framedestroy(b) Modeled 9x13 room graph and A* path048913playergoalred hazardmaroon hazard(c) Recorded terminalsingle / tu93 / level 6State = {passable[9x13], player, facing, goal, hazards, budget, dead}Accepted accuracy 1.00 at 0.98 coverage; outcome verified.  A*: 189 nodes, 13 actions; recommendation followed; recorded path solved.Figure 14: Transition mismatch, repair, and replanning in tu93, level 8. The first observed player–
patrol contact produces an observed explosion and removal. The repaired model replays 168 graded
transitions exactly, then validates the 12-action route that the recorded run follows to completion.

Correct mechanics, unresolved objective. The matched Opus 4.8 Orchestrator run on sk48
demonstrates the opposite regime. The builder inferred a task-specific gripper-and-block simulator
and repeatedly reported exact reproduction of observed transitions, but no terminal had revealed
the objective. The actor and builder consequently treated the pictorial HUD as a sequence of
candidate goal predicates: a horizontal color train, a vertical dock, and several variants that included
gripper position or an attached arm. Each became reachable in the simulator, produced a long plan,
but executing the plans did not produce the predicted outcomes. Thirteen builder calls and 314
official scored actions completed no level, whereas the trigger policy completed all eight levels of the
same game in this run. The case shows how an accurate transition model can amplify a wrong or
ungrounded objective.

Figure 15: Outcome-identification failure in sk48, level 0. The initial puzzle is followed by
three simulator-reachable configurations suggested by the HUD; all remained nonterminal in the
environment despite accurate modeled dynamics.

Together, the cases show both the flexibility and the risk of the model interface. One model preserves
a nearly pixel-level UI state. Another discards display resolution in favor of a hazard-aware graph.
The transfer episode repairs a previously unobserved interaction, while the failure case models
mechanics without identifying the target. What is shared is not a fixed object decomposition,

28

DOWNplayer enters an occupied patrol cell(a) Novel patrol contactbefore(b) Animation evidenceexplosionafter03691212-action BFS route; red crosses mark two removals(c) Repaired model and planthe recorded actions follow the entire plan(d) Recorded completionorchestrator / GPT-5.6 Sol / tu93 / level 8Unexpected contact falsifies the vacating-patrol rule  →  repair models perpendicular patrol removal→  verifier replays 168/168 graded transitions exactly  →  BFS validates 12 actions  →  level completeThree blocks, gripper, and a pictorial HUDInitial puzzleHUD-aligned hypothesis; no terminalHorizontal R-G-B trainSecond plausible arrangement; no terminalVertical R-G-B dockArm-hook hypothesis; no terminalConnected wall trainCorrect mechanics, unresolved objectiveorchestrator / sk48 / level 0The builder repeatedly reported exact observed-transition simulation, but four visually plausible goal predicates were falsified.  Thirteen builder calls and 314 official scored actions completed no level.but an executable contract whose transition, outcome, and search components must be evaluated
separately.

5.3 Behavioral Evidence of Task Simulation

A high score demonstrates acquired skill, but not by itself the process that produced it. Chollet’s
definition emphasizes skill-acquisition efficiency: how effectively a system turns limited experience
and prior knowledge into new competence (Chollet, 2019). ARC-AGI-3 operationalizes part of this
idea through exploration, goal inference, dynamics learning, planning, and action efficiency (ARC
Prize Foundation, 2026b). To look beyond aggregate scores, the ARC Prize Foundation audited 160
frontier-model replays and traces against human-written game strategies. The audit identified three
recurring failures: recognizing a local effect without deriving a global rule, importing the wrong
abstraction from a familiar game, and clearing a level without learning a transferable mechanic
(Kamradt, 2026a). We use these distinctions to inspect the reported GPT-5.6 Sol Orchestrator run
based on the model-authored persistent notes, executable programs and plans, recorded actions,
and subsequent observations. We select tr87 to examine how mechanisms established in earlier
levels are integrated into one executable rule system, and ka59 to show how useful actions can test
uncertain mechanics and how deliberation can precede execution.

Composing an executable rule system. tr87 develops a visual rewrite language over six levels.
Its upper panels encode rules, while its lower panels show a query and target. Actions move a cursor
between panels or cycle every glyph in the selected panel through a seven-state visual alphabet.
Levels 1–3 establish the alphabets and variable-length rules: one query symbol can be represented by
multiple target symbols and vice versa. Level 4 first requires a fixed two-stage translation from cyan
through pink to yellow, with only the answer reels editable. Level 5 changes the interaction: the
rule panels themselves become editable, and every glyph in a multi-glyph panel cycles in lockstep.

The builder handled these changes by repeatedly revising one persistent per-game program, not by
maintaining separate models for different levels. The Level 4 revision added color-directed multi-hop
translation, while Level 5 added editable-panel state and lockstep transitions. The final initializer
infers the applicable layout from the current grid rather than branching on the level index.

Level 6 combines these previously separate demands. Each of its three rows contains one cyan-to-
pink rule and one pink-to-yellow rule, giving six rules represented by 12 source and output panels
(Figure 16a). The agent must edit the rules so that translating the cyan query produces a pink string
which, in turn, translates to the fixed yellow target. Its executable model parses variable-length
rules, predicts the intermediate pink string in Figure 16b, and searches over cyclic shifts of the
12 panels. The selected assignment requires 13 panel edits and 11 cursor moves. The recorded
edits follow this assignment and the level terminates on action 24 (Figure 16c), compared with a
146-action human baseline. This is within-game compositional transfer: no new control action is
introduced, but the agent must combine the two-stage inference established in Level 4 with the
editable-panel dynamics established in Level 5.

Turning a useful action into a test. ka59 asks the agent to place colored pieces into matching
sockets. Later levels add mechanisms (pistons) in dark-red color that periodically extend as actions
advance, while purple bands block ordinary movement. The extension can be used for accelerated
movement to bypass obstacles. Level 6 contains two ceiling-mounted pistons and one floor-mounted

29

Figure 16: Within-game recombination in tr87, level 6. Earlier levels separately introduce two-stage
composition and editable rule panels; level 6 combines them. The agent predicts the intermediate
string and searches for a minimum-cost panel assignment, completing the level in 24 actions.

piston that can be moved between shafts (Figure 17a). Under the inherited assumption that every
piston extends downward, exhaustive search over all 6,888 reachable modeled states finds no goal.

The placement of the pistons suggests a different rule: a piston extends away from its supporting
surface. The first action of the resulting shortest plan is also a discriminating test. It advances the
phase and reveals orange on the top edge of both ceiling pistons but the bottom edge of the floor
piston, as predicted (Figure 17b). The notes correctly preserve what this frame does not establish:
orientation is observed, but upward transport remains a hypothesis. Action 12 supplies the decisive
test by carrying the green token through the purple band to its predicted cell (Figure 17c). The
remaining plan executes without correction and fills both sockets in 45 actions, versus the 132-action
baseline (Figure 17d).

Figure 17: Hypothesis testing through useful actions in ka59, level 6. One plan step distinguishes
support-relative piston orientation from the inherited model; a later step tests the still-open transport
hypothesis. Both predictions are confirmed before the plan completes.

Deliberation before execution. The final level of ka59 shows a different separation between
inference and action. A prolonged actor–builder phase committed only three environment actions.

30

3 cyan → pink3 pink → yellowquerytargetqueryX6  X5  X2predicted intermediateY0  Y6  Y3  Y3  Y6  Y0targetZA  ZE  ZF  ZF  ZE  ZAapply cyan rulesapply pink rulesGeneric constraint search over the 12 panel cyclesselects 13 edits + 11 cursor moves = 24 actions.The model evaluates variable-length rule composition;it does not store one hard-coded terminal panel assignment.automatic terminalFrom visual examples to an executable rewrite programGPT-5.6 Sol / Orchestrator / tr87 / level 6(a) Puzzle: edit six visual rules(b) Induced two-stage program(c) Edited rules reach the targetWithin-game recombination: level 6 combines two-hop composition from level 4 with editable rule panels from level 5 (24 actions; human baseline: 146).During it, the builder corrected the transition rule for selection clicks, recovered relevant pushing
and beam-transport evidence from earlier levels, and validated an end-to-end route. The actor
then completed the level through the remaining 88 actions in rapid succession, without another
builder call. This was not batched control: actions were still issued through ordinary turns, but
now followed the established route with state checks and minor adjustments. The trace therefore
exposes substantial pre-action computation that an action-based efficiency score does not measure.

Together, these traces show reusable abstraction, informative intervention, hypothesis revision,
cross-level transfer, and efficient execution once a useful model is found. The evidence concerns the
coupled system—frontier model, Tycho harness, executable workspace, and search—on public games;
it does not separate the model’s prior knowledge from online acquisition. Its value is diagnostic:
the retained intermediate artifacts connect successful behavior to the tests that preceded it.

6 From Task Adaptation in ARC-AGI-3 to Agent Adaptation:

Learning from Limited Feedback

General-purpose agents must adapt to new tasks from limited task-specific evidence rather than
depend on data-heavy training for each new problem, a requirement central to skill-acquisition
efficiency (Chollet, 2019). ARC-AGI-3 makes this requirement concrete: an agent must identify
hidden mechanics and objectives through bounded interaction, while exploratory actions consume the
same budget used to complete the task. Tycho studies one response to this constraint: constructing
explicit, testable task models during inference and using them to guide information gathering,
planning, and action.

The same principle applies one level higher. A run may expose limitations not only in its task model
but in the harness governing what the model can observe, retain, test, and execute. Tycho records
traces, metrics, and meta-reflections to derive candidate changes for future runs. This is adaptation
from limited evidence directed at the agent architecture rather than the task.

Figure 18 presents the same adaptation pattern at two scales. Each loop turns limited feedback into
a testable hypothesis: the inner loop models the task, whereas the outer loop models a limitation of
the agent architecture. Each then tests the hypothesis through an action or system change and
uses new evidence to retain, revise, or reject it. Freezing the harness within a run separates the two
timescales: task adaptation can affect the current trajectory, while agent adaptation affects only
future runs.

The agent extends beyond the foundation model. An interactive agent couples a foundation
model to an observation interface, memory, tools, action protocols, verification, and recovery.
Changing the scaffolding or agent–computer interface can change behavior with the model held
fixed (Ben Sghaier et al., 2026; Yang et al., 2024). System evaluations must therefore report the
architecture and protocol alongside the score (Kapoor et al., 2025; Zhang et al., 2026). Tycho
is instantiated on ARC-AGI-3, but follows a broader methodology: preserve experience, turn it
into explicit hypotheses that can be tested, and use those hypotheses selectively for action. We
therefore evaluate the compound agent rather than the foundation model in isolation. The official
scorecard reports 1.5 RHAE for Opus 4.8,2 whereas Tycho’s orchestrator reaches 88.49 with the
same foundation model. This is not a controlled estimate of any single component, but it shows

2https://arcprize.org/scorecards/model/anthropic-opus-4-8-high

31

Frozen task-time agent run

Foundation model
reasoning, tools;
no task fine-tuning

Frozen harness
tools, memory;
verifiers

Observe
task state;
feedback

World model
state, dynamics;
objectives

Plan/probe
model-based
search

Act
environment
step

Meta-reflection
harness-aware;
development note

Experience record
traces, metrics;
meta-reflections

Generalize
failure mechanism;
minimal change

Candidate agent
revised harness;
future runs

Validation
transfers? clean?
worthwhile?

Figure 18: Two coupled adaptation loops. During a frozen task run, the model and harness turn
observations into executable hypotheses, probes or plans, and actions. The foundation model
generates role-specific meta-reflections from its harness-mediated context, and the harness stores
these development notes with traces and metrics in the experience record. They do not affect the
current trajectory. Between runs, those records motivate minimal harness changes whose transfer
and integrity are checked before they enter future agents.

how strongly system architecture can alter behavior. The same methodology can then be applied
one level higher: failures in the harness become hypotheses for agent adaptation.

Meta-reflection turns trajectories into candidate system changes. The actor and builder
system prompts include a development-aid instruction inviting each role to record one or two
concrete sources of friction, such as a confusing instruction, unhelpful feedback, a missing affordance,
or a workspace obstacle. Roles often provide these optional notes. We call this meta-reflection
because its object is not the game but the system through which the game is approached. The notes
are written inside the run but read only afterward, so they cannot alter its trajectory or score. They
serve as compact hypotheses about system limitations that can be checked against the associated
trace.

Across development runs, meta-reflections and trace review exposed recurring limitations in Ty-
cho. Representative examples included low-resolution renders, missing level-boundary frames,
file-operation caps, unavailable Python libraries, incorrect reset semantics, missing verification
and planning metrics, imprecise diagnostic reports, and insufficient isolation from network or
external-filesystem access. This list is illustrative rather than exhaustive. None of these observations
described an individual game’s mechanics. Instead, they identified transferable deficiencies in how
future agents could observe, retain, verify, report, and act.

32

Related work uses trajectory feedback to revise language-model programs (Agrawal et al., 2026),
or searches and repairs agent architectures (Hu et al., 2025; Chen et al., 2026). In Tycho, we still
mediate this outer loop. We cluster notes across runs, inspect the corresponding traces, and filter
the feedback for generality. Requests for additional task hints, for example, are not treated as
candidate improvements. For recurring issues, we infer a general failure mechanism and implement
a minimal candidate change. We reject changes that leak task information, lack a transferable
mechanism, or add unjustified complexity, and test the remaining candidates on development games
before freezing the architecture. This process turns local friction into an auditable architectural
hypothesis and distinguishes agent adaptation from benchmark-specific patching.

World models make limited experience reusable. The inner loop requires a corresponding
abstraction over task experience. A useful world model turns a trajectory into a prospective
computational object:
it preserves task-relevant state, predicts relevant consequences, exposes
uncertainty, and supports testing candidate actions before executing them in the environment.
ARC-AGI-3 makes Python programs and deterministic Moore machines a natural choice because its
observations and actions are discrete and exact. The broader claim is not that useful world models
must be symbolic programs or exact simulators. It is that an agent can make limited experience
reusable by organizing it into a predictive representation for information gathering, planning, and
action.

The functional requirement is representation-agnostic. Programmatic models can extend beyond
deterministic grid worlds (Piriyakulkij et al., 2025), while object-centric states (Locatello et al., 2020),
causal models (Schölkopf et al., 2021), and learned latent dynamics provide alternative formalisms.
MuZero further shows that a planning model need only predict action-relevant quantities rather than
complete observations (Schrittwieser et al., 2020). Any such model must organize history for prospec-
tive action selection: what is known, what remains uncertain, which action would resolve it, and which
plan should work if the model is right. At greater generality, choosing the representation becomes
part of agent adaptation itself. An unfamiliar domain may call for a symbolic simulator, belief state,
relational graph, learned neural dynamics model, hybrid representation, or no explicit model at all.

Toward closing the outer loop. Limited feedback makes audit and validation more important:
a single trajectory can support a plausible but spurious diagnosis. Replayable traces, verifier metrics,
and explicit artifacts make proposed improvements inspectable. Separate validation can then test
whether changes transfer, remain uncontaminated, and justify their added complexity. In Tycho,
task-time adaptation occurs through inference-time hypotheses, tools, and memory rather than
task-specific fine-tuning. The outer loop remains human-mediated: the actor and builder generate
diagnostic notes, while we select, refine, implement, and validate the resulting changes.

The next step is to automate these stages without relaxing their controls: compare evidence across
runs, formulate recurring failure mechanisms, implement candidate changes in isolation, and test
them on held-out tasks. Our broader hypothesis is architectural: generality depends not only on
the pretrained model, but also on machinery that can organize limited experience into task models
and revise the system supporting that process. Under a strict standard for general intelligence, an
agent should eventually construct or adapt whatever harness and model formalism a novel problem
requires rather than depend on a human engineer to do so. More capable models should require
fewer externally engineered iterations and progressively close this outer loop themselves.

33

7 Limitations

Empirical scope. We evaluate one stochastic run of each reported configuration on the 25
public games (183 levels), five of which informed harness development. These results therefore
characterize performance on a fixed public testbed, not generalization to unseen games or run-to-run
reliability. Benchmark exposure also cannot be excluded: three games were public before the full
2026 release, and provider cutoff dates do not constitute a benchmark-specific contamination audit.3
A strict generalization test requires a frozen-harness evaluation on unseen games. Estimating
generation variability additionally requires repeated runs of each policy, which are computationally
and financially costly.

Benchmark-specific priors. Tycho is not benchmark-agnostic. However, its task contract,
belief-memory schema, action interface, and modeling tools encode ARC-AGI-3–specific structural
priors. The observations are 64 × 64 grids over 16 colors, and the games comprise multiple levels
that generally increase in complexity and share mechanics. The framework supplies conventions
for RESET and numbered actions. Action efficiency is the benchmark objective, and the levels
are assumed to be human-solvable through manageable interaction. HUD or interface cells are
interpreted using possible categories such as budget lives, timers, selected tools, progress indicators,
validation lights, and status bars. These priors do not reveal any individual game’s mechanics,
objective, or solution, but they narrow the interpretation and modeling problem and would require
revision for transfer to other domains.

Agent adaptation remains human-mediated. The initial creation of Tycho and the reflection-
based changes described in Section 6 are author-steered. The actor and builder produce diagnostic
notes, and LLMs assist development, but the authors select, refine, implement, and validate the
resulting harness changes. These results therefore demonstrate a human-mediated adaptation
process, not autonomous harness construction or self-improvement. A stronger test would require
the system itself to select, implement, and validate generic harness changes from limited feedback.

Human comparisons are reference distributions. The released human data contain indepen-
dent first-run replays rather than stable participant identities across games. Our game-balanced
statistic therefore compares a fixed agent trajectory with a random replay on the same public game;
it does not rank one agent against a population of 25-game human participants. Humans also did
not receive the iterative public-set development process available to the harness.

Action efficiency excludes inference cost. ARC-AGI-3 uses action count as a common proxy
for resources including data, time, compute, and risk, while internal reasoning and tool operations
are not scored (ARC Prize Foundation, 2026b). Opus 5 uses 61% fewer environment actions
than the aggregate human baselines, but the run still entails 15.1k model calls and an estimated
$2.99k in API-equivalent inference cost across the public set. The comparison therefore establishes
efficient environment interaction, not lower total resource use: Tycho trades substantial unscored
inference for fewer scored actions. For an order-of-magnitude comparison, integrating the brain’s

3The full public set launched on March 25, 2026, but ft09, ls20, and vc33 had been public since the July 2025
developer preview. The reported cutoffs for Opus 4.8 (January 2026) and GPT-5.6 Sol (February 16, 2026) predate
the full release but postdate the three preview games; Opus 5 has a May 2026 cutoff, after the full release (Anthropic,
2026a; OpenAI, 2026).

34

estimated 20 W metabolic power over the median successful human replay for each public game
yields roughly 0.1 kWh (Kamradt, 2026b; Yu et al., 2018). Applying published estimates of 0.24 Wh
for a production text request and 3.91 Wh for a long test-time-scaled reasoning request to Opus 5’s
15.1k calls yields a 4–60 kWh envelope (Elsworth et al., 2025; Oviedo et al., 2026). These proxies
place the run at roughly 30–600× the human brain-energy estimate, with 102 as the central order of
magnitude. This projection compares inference with brain metabolism rather than lifecycle energy.

Individual model calls can vary
Inference latency and service reliability affect evaluation.
from seconds to tens of minutes during extended reasoning, while hosted inference services can
throttle, time out, or fail transiently. Evaluation therefore depends on operational choices such as
per-call and per-game timeouts, retry and backoff policies, and durable checkpointing for resumption.
Aggressive limits can truncate useful reasoning; permissive limits can leave games stalled or exhaust
the evaluation budget. These choices can affect completion and reproducibility even when the agent
policy is unchanged.

Model and evidence limitations. Programmatic models can be verbose, brittle, and costly
when direct spatial reasoning would suffice. Agreement with observed transitions also leaves off-
trajectory behavior unidentified, while sparse terminal events make objective inference harder than
dynamics fitting. Tycho therefore treats replay consistency as evidence rather than proof and relies
on discriminating probes, cross-level transfer, planned-rollout tests, and separate measurements of
action and language-model cost.

8 Conclusion and Future Work

Tycho formalizes an ARC-AGI-3 game as a rendered deterministic Moore machine rather than a
stream of screenshots. State and action determine transitions; states produce observations, available
actions, and outcomes; and transient and boundary evidence remain distinct. The resulting evidence
contract lets an executable hypothesis be checked against experience, used for planning, and left
partial where evidence does not support a prediction.

The experiments yield three general conclusions. First, executable modeling is useful selectively:
direct reasoning is already strong, while actor-requested delegation has the strongest observed
performance. Second, transition accuracy and decision quality are distinct: automatic repair produces
the highest accepted transition match without the strongest gameplay because objective inference,
model allocation, and effective use of advice remain separate problems. Third, a useful abstraction
need not reconstruct the privileged engine or every pixel; multiple task-specific representations and
partial models can support successful action when they preserve decision-relevant distinctions along
a proposed route. This is active abstraction: deciding whether, when, and how to model is part of
the control problem, and a model is valuable when it improves evidence gathering, planning, or
action.

The decisive next test is frozen-harness generalization to environments unavailable during develop-
ment, including newly released ARC-AGI-3 games, independently authored rendered environments,
and other interactive domains. Repeated generations and comparisons across frontier and open-
weight models can separate stable system properties from model-specific behavior. Technical
priorities include explicit uncertainty, better allocation between reasoning and model construction,
guarded reuse of verified plans, and lower inference cost. More fundamentally, meta-reflection should

35

become an agent capability: proposing, implementing, and validating harness changes from limited
feedback while preserving independent checks.

A note on timing. The final weeks of this work coincided with an exceptional pace of change in
ARC-AGI-3: new systems and LLMs appeared, and the state of the art shifted repeatedly. This
changing empirical context led us to revisit comparisons, analyses, and experimental priorities
several times while finalizing the manuscript. We chose to prioritize methodological quality over
release speed, accepting that the paper would enter the public discussion at a later point.

References

L. A. Agrawal, S. Tan, D. Soylu, N. Ziems, R. Khare, K. Opsahl-Ong, A. Singhvi, H. Shandilya,
M. J. Ryan, M. Jiang, C. Potts, K. Sen, A. G. Dimakis, I. Stoica, D. Klein, M. Zaharia, and
O. Khattab. GEPA: Reflective prompt evolution can outperform reinforcement learning. In
International Conference on Learning Representations, 2026. URL https://openreview.net/
forum?id=4oo6XTL6Oj. Oral presentation.

Z. Ahmed, J. B. Tenenbaum, C. Bates, and S. J. Gershman. Synthesizing world models for bilevel
planning. Transactions on Machine Learning Research, 2025. URL https://openreview.net/
forum?id=m9V4JHLJrD.

Z. Ahmed, K. Irie, J. B. Tenenbaum, C. J. Bates, and S. J. Gershman. Learning abstractions for

hierarchical planning in program-synthesis agents. arXiv preprint arXiv:2602.00929, 2026.

D. Angluin. Learning regular sets from queries and counterexamples. Information and Computation,

75(2):87–106, 1987. doi: 10.1016/0890-5401(87)90052-6.

Anthropic. Models overview. https://platform.claude.com/docs/en/about-claude/models/

overview, 2026a. Accessed 2026-07-29.

Anthropic. Claude pricing. https://platform.claude.com/docs/en/about-claude/pricing,

2026b. Accessed 2026-07-22.

ARC Prize Foundation. ARC-AGI-3 scoring methodology.

https://docs.arcprize.org/

methodology, 2026a. Accessed 2026-07-09.

ARC Prize Foundation. ARC-AGI-3: A new challenge for frontier agentic intelligence. arXiv

preprint arXiv:2603.24621, 2026b.

ARC Prize Foundation. ARC-AGI community leaderboard. https://arcprize.org/leaderboard/

community, 2026c. Accessed 2026-07-22.

O. Ben Sghaier, H. Li, B. Adams, and A. E. Hassan. Don’t blame the large language model: How
agent harness evolution shapes coding agent quality. arXiv preprint arXiv:2607.03691, 2026.

H. Bessis, J. Cottaar, I. Pressman, A. Smit, M. Tešnar, and S. Viel. Duck harness: Winning solution
for ARC-AGI-3 milestone 1. https://tufalabs.ai/research/duck-harness/, 2026. Published
2026-07-01; accessed 2026-07-22.

36

B. Bonet and H. Geffner. Planning with incomplete information as heuristic search in belief space.
In Proceedings of the Fifth International Conference on Artificial Intelligence Planning and
Scheduling (AIPS), pages 52–61. AAAI Press, 2000.

M. Chen, J. Wang, Z. Liu, Y. Wang, H. Zheng, and Q. Wang. From failed trajectories to reliable
LLM agents: Diagnosing and repairing harness flaws. arXiv preprint arXiv:2606.06324, 2026.

F. Chollet. On the measure of intelligence. arXiv preprint arXiv:1911.01547, 2019.

D. Courtis, W. Li, and S. Sanner. OPINE-World: Programmatic world modeling with ontology-
error-prioritized interactive exploration for ARC-AGI-3. arXiv preprint arXiv:2607.01531, 2026.

N. Dainese, M. Merler, M. Alakuijala, and P. Marttinen. Generating code world models with large
language models guided by monte carlo tree search. In Advances in Neural Information Processing
Systems, volume 37, pages 60429–60474, 2024. doi: 10.52202/079017-1933.

C. Elsworth, K. Huang, D. Patterson, I. Schneider, R. Sedivy, S. Goodman, B. Townsend, P. Ran-
ganathan, J. Dean, A. Vahdat, B. Gomes, and J. Manyika. Measuring the environmental impact
of delivering AI at Google scale. arXiv preprint arXiv:2508.15734, 2025.

A. Fox, J. Wang, P. Rosu, and B. Dhingra. PRO-LONG: Programmatic memory enables long-horizon

reasoning. arXiv preprint arXiv:2607.20064, 2026a.

A. Fox, J. Wang, P. Rosu, and B. Dhingra. PRO-LONG source code, scorecards, and run logs.
https://github.com/alexisfox7/PRO-LONG, 2026b. Repository revision 7268de0; accessed
2026-07-28.

P. Furgale, S. Klingler, J. Nolan, M. Staats, G. Di Lorenzo, E. Martinez Abad, C. Schüller, R. Dinu,
A. Devoto, P. Berard, G. Kaplun, E. Sarafian, R. Roveri, L. Derczynski, and R. Silveira Cabral.
NVIDIA-labs OO agents: Native python object-oriented agents. arXiv preprint arXiv:2607.20709,
2026.

G. Giantamidis, S. Tripakis, and S. Basagiannis. Learning Moore machines from input-output
traces. International Journal on Software Tools for Technology Transfer, 23(1):1–29, 2021. doi:
10.1007/s10009-019-00544-0.

C. Grimm, A. Barreto, S. P. Singh, and D. Silver. The value equivalence principle for model-based
reinforcement learning. In Advances in Neural Information Processing Systems, volume 33, pages
5541–5552, 2020. URL https://proceedings.neurips.cc/paper_files/paper/2020/hash/
3bb585ea00014b0e3ebe4c6dd165a358-Abstract.html.

D. Ha and J. Schmidhuber. Recurrent world models facilitate policy evolution. In Advances in

Neural Information Processing Systems, volume 31, pages 2450–2462, 2018.

D. Hafner, T. Lillicrap, J. Ba, and M. Norouzi. Dream to control: Learning behaviors by latent
In International Conference on Learning Representations (ICLR), 2020. URL

imagination.
https://openreview.net/forum?id=S1lOTC4tDS.

L. K. Han. AERA ARC-AGI-3 evaluation code. GitHub, https://github.com/farmountain/

aera-arc3-paper, 2026a. Repository revision 53ba4db. Accessed 2026-07-30.

L. K. Han. Explore before you solve: The speed–depth trade-off in epistemic agents for ARC-AGI-3.

arXiv preprint arXiv:2605.25931, 2026b.

37

R. A. Howard. Information value theory. IEEE Transactions on Systems Science and Cybernetics, 2

(1):22–26, 1966. doi: 10.1109/TSSC.1966.300074.

S. Hu, C. Lu, and J. Clune. Automated design of agentic systems. In International Conference
on Learning Representations, 2025. URL https://proceedings.iclr.cc/paper_files/paper/
2025/hash/36b7acf6f6010652b3f2a433774a66fe-Abstract-Conference.html.

L. P. Kaelbling, M. L. Littman, and A. R. Cassandra. Planning and acting in partially observable
stochastic domains. Artificial Intelligence, 101(1–2):99–134, 1998. doi: 10.1016/S0004-3702(98)
00023-X.

G. Kamradt. Analyzing GPT-5.5 & Opus 4.7 with ARC-AGI-3. ARC Prize Foundation, https:
//arcprize.org/blog/arc-agi-3-gpt-5-5-opus-4-7-analysis, 2026a. Published 2026-05-01;
accessed 2026-07-22.

G. Kamradt. Measuring human performance on ARC-AGI-3. https://arcprize.org/blog/

arc-agi-3-human-dataset, 2026b. Published 2026-04-14; accessed 2026-07-22.

S. Kapoor, B. Stroebl, Z. S. Siegel, N. Nadgir, and A. Narayanan. AI agents that matter. Transactions
on Machine Learning Research, 2025. URL https://openreview.net/forum?id=Zy4uFzMviZ.

S. Karten, J. Zhang, T. Upaa Jr., R. Feng, W. Li, C. Shi, C. Jin, and K. Vodrahalli. Continual
harness: Online adaptation for self-improving foundation agents. arXiv preprint arXiv:2605.09998,
2026.

E. D. Klenske and P. Hennig. Dual control for approximate bayesian reinforcement learning. Journal

of Machine Learning Research, 17(127):1–30, 2016.

N. Lambert, B. Amos, O. Yadan, and R. Calandra. Objective mismatch in model-based reinforcement
learning. In Proceedings of the 2nd Conference on Learning for Dynamics and Control, volume
120 of Proceedings of Machine Learning Research, pages 761–770, 2020.

W.-D. Li, K. Hu, C. Larsen, Y. Wu, S. Alford, C. Woo, S. M. Dunn, H. Tang, W.-L. Zheng, Y. Pu,
and K. Ellis. Combining induction and transduction for abstract reasoning. In The Thirteenth
International Conference on Learning Representations, 2025. URL https://openreview.net/
forum?id=UmdotAAVDe.

F. Locatello, D. Weissenborn, T. Unterthiner, A. Mahendran, G. Heigold, J. Uszkoreit, A. Dosovitskiy,
and T. Kipf. Object-centric learning with slot attention. In Advances in Neural Information
Processing Systems, volume 33, pages 11594–11604, 2020.

D. J. C. MacKay. Information-based objective functions for active data selection. Neural Computation,

4(4):590–604, 1992. doi: 10.1162/neco.1992.4.4.590.

R. Menaged, G. Lior, S. Ravfogel, R. Aharoni, and G. Stanovsky. Can LLM agents infer world

models? evidence from agentic automata learning. arXiv preprint arXiv:2606.16576, 2026.

OpenAI. GPT-5.6 Sol Model. OpenAI API documentation, 2026. URL https://developers.

openai.com/api/docs/models/gpt-5.6-sol. Accessed 2026-07-22.

F. Oviedo, F. Kazhamiaka, E. Choukse, A. Kim, A. Luers, M. Nakagawa, R. Bianchini, and J. M.
Lavista Ferres. Energy use of AI inference, efficiency pathways, and test-time scaling. Joule, page
102430, 2026. doi: 10.1016/j.joule.2026.102430.

38

D. Paglieri, B. Cupiał, J. Cook, U. Piterbarg, J. Tuyls, E. Grefenstette, J. N. Foerster, J. Parker-
Holder, and T. Rocktäschel. Learning when to plan: Efficiently allocating test-time compute for
LLM agents. arXiv preprint arXiv:2509.03581, 2025.

W. T. Piriyakulkij, Y. Liang, H. Tang, A. Weller, M. Kryven, and K. Ellis. PoE-World: Compositional
world modeling with products of programmatic experts. In Advances in Neural Information
Processing Systems, volume 38, 2025. URL https://proceedings.neurips.cc/paper_files/
paper/2025/hash/262dd62fd1bbb30d6a6b4d578f5e65ff-Abstract-Conference.html.

C. Qian, E. C. Acikgoz, B. Li, X. Chen, Y. Zhang, B. He, Q. Luo, G. Tur, D. Hakkani-Tür, Y. Li,
and H. Ji. Current agents fail to leverage world model as tool for foresight. In Proceedings of the
64th Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers),
pages 13686–13723. Association for Computational Linguistics, July 2026. doi: 10.18653/v1/2026.
acl-long.623. URL https://aclanthology.org/2026.acl-long.623/.

R. L. Rivest and R. E. Schapire. Inference of finite automata using homing sequences. Information

and Computation, 103(2):299–347, 1993. doi: 10.1006/inco.1993.1021.

S. Rodionov. Supporting data and full run artifacts for “do coding agents need executable world
models, simplification, and verification to solve ARC-AGI-3?”. https://doi.org/10.5281/
zenodo.21412274, 2026a. Archived run artifacts; accessed 2026-07-22.

S. Rodionov. Do coding agents need executable world models, simplification, and verification to

solve ARC-AGI-3? arXiv preprint arXiv:2607.15439, 2026b.

S. Rodionov. Executable world models for ARC-AGI-3 in the era of coding agents. arXiv preprint

arXiv:2605.05138, 2026c. Accepted at AGI-2026.

E. Rudakov, J. Shock, and B. U. Cowley. Graph-based exploration for ARC-AGI-3 interactive

reasoning tasks. arXiv preprint arXiv:2512.24156, 2025.

S. Russell and E. Wefald. Principles of metareasoning. Artificial Intelligence, 49(1–3):361–395, 1991.

doi: 10.1016/0004-3702(91)90015-C.

E. Sarafian, G. Kaplun, R. Banner, D. Soudry, and B. Ginsburg. Workspace optimization: How to

train your agent. arXiv preprint arXiv:2605.09650, 2026.

B. Schölkopf, F. Locatello, S. Bauer, N. R. Ke, N. Kalchbrenner, A. Goyal, and Y. Bengio.
Toward causal representation learning. Proceedings of the IEEE, 109(5):612–634, 2021. doi:
10.1109/JPROC.2021.3058954.

J. Schrittwieser, I. Antonoglou, T. Hubert, K. Simonyan, L. Sifre, S. Schmitt, A. Guez, E. Lockhart,
D. Hassabis, T. Graepel, T. Lillicrap, and D. Silver. Mastering Atari, Go, chess and shogi by
planning with a learned model. Nature, 588:604–609, 2020. doi: 10.1038/s41586-020-03051-4.

N. Shinn, F. Cassano, A. Gopinath, K. Narasimhan, and S. Yao. Reflexion: Language agents with
verbal reinforcement learning. In Advances in Neural Information Processing Systems, volume 36,
pages 8634–8652, 2023. doi: 10.52202/075280-0377.

H. Tang, D. Key, and K. Ellis. WorldCoder, a model-based LLM agent: Building world models by
writing code and interacting with the environment. In Advances in Neural Information Processing
Systems, volume 37, pages 70148–70212, 2024. doi: 10.52202/079017-2243.

39

P. Tsividis, J. Loula, J. Burga, J. P. Rodriguez, S. Arnaud, N. Foss, A. Campero, A. Subramanian,
T. Pouncy, S. J. Gershman, and J. B. Tenenbaum. Human-level learning of complex novel tasks
as theory-based modelling, exploration and planning. Philosophical Transactions of the Royal
Society A, 384(2320):20240529, 2026. doi: 10.1098/rsta.2024.0529.

F. Vaandrager, B. Garhewal, J. Rot, and T. Wißmann. A new approach for active automata
learning based on apartness. In Tools and Algorithms for the Construction and Analysis of
Systems, volume 13243 of Lecture Notes in Computer Science, pages 223–243. Springer, 2022. doi:
10.1007/978-3-030-99524-9_12.

S. Vahdati, A. Aioanei, H. Suresh, and J. Lehmann. The ARC of progress towards AGI: A living

survey of abstraction and reasoning. arXiv preprint arXiv:2603.13372, 2026.

G. Wang, Y. Xie, Y. Jiang, A. Mandlekar, C. Xiao, Y. Zhu, L. Fan, and A. Anandkumar. Voyager:
An open-ended embodied agent with large language models. Transactions on Machine Learning
Research, 2024. URL https://openreview.net/forum?id=ehfRiF0R3a.

A. Warrier, T. D. Nguyen, M. Naim, M. Jain, Y. Liang, K. Schroeder, C. Yang, J. B. Tenenbaum,
S. Vollmer, K. Ellis, and Z. Tavares. Benchmarking world-model learning with environment-level
queries. In Proceedings of the Forty-third International Conference on Machine Learning, volume
306 of Proceedings of Machine Learning Research, 2026. URL https://openreview.net/forum?
id=Ny6UYZ8ysN.

J. Yang, C. E. Jimenez, A. Wettig, K. Lieret, S. Yao, K. Narasimhan, and O. Press. SWE-
agent: Agent-computer interfaces enable automated software engineering. In Advances in Neural
Information Processing Systems, volume 37, pages 50528–50652, 2024. doi: 10.52202/079017-1601.

S. Yao, J. Zhao, D. Yu, N. Du, I. Shafran, K. Narasimhan, and Y. Cao. React: Synergizing reasoning
and acting in language models. In International Conference on Learning Representations (ICLR),
2023. URL https://openreview.net/forum?id=WE_vluYUL-X.

L. Ying, K. M. Collins, P. Sharma, C. Colas, K. I. Zhao, A. Weller, Z. Tavares, P. Isola, S. J.
Gershman, J. D. Andreas, T. L. Griffiths, F. Chollet, K. R. Allen, and J. B. Tenenbaum. Assessing
adaptive world models in machines with novel games. arXiv preprint arXiv:2507.12821, 2025.

Y. Yu, P. Herman, D. L. Rothman, D. Agarwal, and F. Hyder. Evaluating the gray and white
matter energy budgets of human brain function. Journal of Cerebral Blood Flow & Metabolism,
38(8):1339–1353, 2018. doi: 10.1177/0271678X17708691.

G. Zeng, J. Wang, W. Ma, S. Yin, C. Wang, S. Liu, A. Kanazawa, W. Ni, X. Li, A. Zanette,
and H. Feng. Frontier models with our harness achieve ∼99% on ARC-AGI-3 public—Schema.
Impossible Research, https://schema-harness.github.io/, 2026. Project report; retained
traces at https://huggingface.co/datasets/schema-harness/arc-agi-3-schema-traces;
accessed 2026-07-22.

Y. Zhang, J. Wang, Y. Ge, W. Xu, J. Hamm, and C. K. Reddy. Stop comparing LLM agents
without disclosing the harness. Preprints, 2026. doi: 10.20944/preprints202605.0711.v1. URL
https://www.preprints.org/manuscript/202605.0711.

40

A Illustration of Tools and Prompt Excerpts

This section gives the complete tool surface and selected passages from the actor and builder system
prompts in the GPT-5.6 Sol orchestrator run. The public release fixes the corresponding actor
template, builder template, and run configuration at commit f68912a. Both prompts also included
the development-only meta-reflection instruction described in Section 6; we omit that instruction
here for brevity. Both agents received the same color vocabulary and access to the per-game
workspace and recorded-history library. We show those shared operational instructions only where
they clarify a role-specific contract. Bracketed ellipses mark omitted prompt text.

Tool surface Table 9 summarizes the complete actor tool surface. A question mark denotes
an optional field. File operations were confined to the per-game workspace. Only take_action
changed the environment and consumed a scored action. The other tools supported computation,
memory, context management, or delegation.

Table 9: Actor tools in the GPT-5.6 Sol orchestrator run.

Tool and arguments

Function and benchmark effect

ls(path?)
read_file(path)
write_file(path, content)
edit_file(path, old, new)

run_python(code,
timeout_s?)

set_verbosity(grid?, diff?)

invoke_builder
(reason?)

take_action(action, row?,
col?)

List a workspace directory; read-only.
Read a workspace file; read-only.
Create or overwrite a workspace file; persists without an environment action.
Replace one exact, unique string in a workspace file; persists without an
environment action.
Run Python with the current grid, NumPy, and recorded-history library
preloaded; the optional timeout is 1–300 seconds (15 by default); no
environment action.
Control whether later turns inline the grid and an exact, summarized, or
omitted diff; recorded evidence is unchanged.

Ask the builder to construct or revise the executable hypothesis; invokes a
separate model call but no environment action.
Commit a currently available game control; ends the turn and consumes one
scored environment action.

The action field of take_action was constrained each turn to RESET and the controls declared by
the current frame. The builder had a narrower surface: file listing, reading, writing, and exact-string
editing; run_python; and edit_function(path, name, code) for replacing one top-level Python
function. It had neither take_action nor recursive delegation, so the actor retained control over
every scored intervention.

Annotated actor prompt excerpts The selected actor passages establish the task, delegation
policy, and durable belief channel.

K
S
A
T

T
C
A
R
T
N
O
C

[. . . ] You are playing an unfamiliar turn-based game on a 64x64 grid of colored cells (colors
0–15). Its objects, mechanics, and goal are not given - you need to discover them by exploring and
observing, like a scientist. Each game has multiple levels of usually increasing complexity; a level
ends when you reach its (unknown) goal. Your objective: complete each level in as few actions as
possible. Benchmark prior: every level is solvable by human players through a manageable amount
of interaction and reasoning. [. . . ] The current turn header lists the valid take_action choices:
RESET plus the frame-declared game actions. Tool calls are free for scoring; each take_action,
including RESET, spends one scored environment action and ends the turn. Prefer RESET when

41

the current attempt is unwinnable or clearly more expensive than restarting. [. . . ]

[. . . ] World modeling is delegated to a focused subagent; you do NOT write world_model.py yourself.
Once the dynamics look learnable, call invoke_builder with your beliefs about state, action effects,
[. . . ] The builder constructs and verifies world_model.py, then
objectives, and useful probes.
reports its confidence, outcome hypothesis, and recommended action or subgoal. You retain action
control: discount uncertain advice, and do not treat failure to find a plan as proof that the level is
impossible. Re-invoke after informative new evidence or a failed prediction, then reuse the model.
[. . . ]

[. . . ] Keep your evolving hypotheses in notes/actor_beliefs.md; this is both memory across turns
and the handoff read by the builder. [. . . ] Treat HUD and interface cells as possible observations of
game state, not decoration, and infer their role from transitions and terminal evidence. [. . . ]

R
E
D
L
I
U
B

I

N
O
T
A
G
E
L
E
D

F
E
I
L
E
B

Y
R
O
M
E
M

Annotated builder prompt excerpts The selected builder passages contain the role-specific
scientific instructions: latent-state representation, bounded prediction, falsification feedback, cross-
level generalization, outcome inference, and validated planning. Shared operational instructions and
implementation-level cautions are omitted.

You are the WORLD-MODEL BUILDER for an agent playing an unfamiliar 64x64 grid game. You
do NOT take game actions. Your only job: construct or refine world_model.py so it predicts the
game’s dynamics, and report what you found to the ACTING agent.

The ACTING agent hands you, in the message below, its current beliefs about the mechanics (how
the grid parses into objects, how actions change the grid, the objective/outcome/subgoals). Treat
that as your starting hypothesis—verify and encode it; correct it where the observed frames disagree.
[. . . ]

[. . . ] Define whatever latent fields the game requires in State; a single frame need not determine
the next. [. . . ] render(state) must project that state to the full visible grid. Use -1 only for
genuinely undetermined cells. For bounded HUD quantization, observation_variants may return
at most five full-grid alternatives; do not use it to hide uncertain dynamics, locations, off-screen
terrain, or outcomes. [. . . ]

[. . . ] The kickoff message includes a [verify state] block with initial-render results, simulation
accuracy, the first divergence, and lossless observed and predicted deltas. Compare those deltas to
locate the error, edit the model, and use the next verification report as feedback. [. . . ]

[. . . ] Every save auto-verifies three channels: the initial render, transitions replayed from the level
start, and outcomes on solved, failed, and ongoing states. [. . . ] Iterate: edit → read feedback →
refine. There is ONE game engine across levels, so encode shared mechanics rather than hardcoding
level branches in transition(); use level-specific initialization or outcomes only when the evidence
requires them. [. . . ]

E
L
O
R

D
N
A
E
T
A
T
S

I

N
O
T
A
V
R
E
S
B
O

I

N
O
T
A
C
I
F
I
S
L
A
F

K
C
A
B
D
E
E
F

D
N
A

Y
F
I
R
E
V

E
Z
I
L
A
R
E
N
E
G

42

[. . . ] OUTCOME is a FIRST-CLASS inference, not an afterthought. The objective is never told to
you; infer it from what changed when a level ended. [. . . ] A draining move or life counter is a cost,
not success. While the objective is uncertain, retain competing terminal hypotheses and the probe
that would separate them. [. . . ]

[. . . ] Use the generic planner first.
world_model.py reaches level_complete. [. . . ]

[. . . ] A plan is validated only when replay through

E
M
O
C
T
U
O

E
C
N
E
R
E
F
N

I

I

G
N
N
N
A
L
P

B Task-Relevant Identification and Plan Sufficiency

Finite interaction generally leaves many programs and underlying states compatible with the
evidence. The relevant question is which remaining distinctions can affect benchmark performance.
We formalize two answers: identification only up to benchmark behavior, and correctness only along
a proposed route.

B.1 What must be identified?

After history ht, let Bt contain the complete machine–state hypotheses consistent with it. Each
hypothesis fixes future observations, available actions, costs, outcomes, and level progression. A
partial executable model with abstained cells or observation alternatives denotes a set of these
completions; it does not make the environment stochastic.
Definition 5 (Benchmark equivalence). Two hypotheses b, b′ ∈ Bt are benchmark-equivalent,
written b ≡bench b′, when every adaptive policy induces the same available-action sets, terminal
outcomes, per-level completion indicators, and scored-action counts under both.

Since RHAE is determined by completion and action counts, replacing the game by any member
of its equivalence class preserves every policy’s score. Identification therefore need not recover
source code, privileged state, or even a unique program. History may nevertheless leave several
classes possible. A probe is decision-relevant only if its outcomes separate classes that favor different
continuations, and its potential benefit must justify its scored cost. Tycho does not enumerate Bt;
the actor approximates this comparison by recording alternative hypotheses and deciding whether
another interaction or a model request is worthwhile.

B.2 How much correctness does a plan require?

Let P = (at, . . . , at+m−1) be a model-generated plan. Starting from the true protocol state xt and
modeled state ˆst, consider the true and modeled executions of P .

Definition 6 (Route-sufficient model). The model is route-sufficient for P when, after every prefix,
the true rendered grid belongs to the output concretization ΓO of the model’s predicted render and
variants, and the true and modeled outcomes agree. At every nonfinal prefix, the next action must
be available in both executions.

Proposition 2 (Route preservation). If a model is route-sufficient for P , then P remains executable
and incurs m scored actions. A modeled level_complete or game_over endpoint is also the true
endpoint.

43

Proof. Induction over prefixes preserves action availability, the rendered-grid relation, and outcome
agreement. Applying final outcome agreement gives the claim.

Route sufficiency requires no correctness away from P and is thus weaker than global transition
match. Conversely, exact replay constrains past transitions, not the unobserved transitions on a new
route. Accepted transition match is therefore neither necessary nor sufficient for a high RHAE. This
clarifies the matched-policy result: repair can improve replay accuracy without improving RHAE,
while an abstract model can support a successful route despite errors elsewhere. For an explicit
validated plan, Tycho surfaces one action at a time and withholds further plan actions when the
observed frame differs from the stored canonical prediction.

C Public Implementation and Audit Interface

The released artifact contains the agent and harness source, prompt templates, paper configurations,
tests, aggregate inputs, and the six competition-scorecard manifests. make validate exercises the
package and its configuration and contract tests without model or ARC credentials, supporting
fresh stochastic runs and aggregate verification. Before creating each official scorecard, deterministic
competition replay checked the recorded actions against the returned states and rejected any
mismatch; the released scorecard manifests contain the resulting public scorecard links and aggregate
outcomes.

C.1 Agent-facing evidence API

The harness interface is the evidence layer shared by all policies, including no-world-model runs. It
is not itself a learned model. It is the typed view of the environment history that the actor can
inspect, reason over, and, when enabled, use to build an executable model.

Decision frames. Each turn exposes the current playable grid and action interface.

In the
workspace, grid and wmlib.current_grid() give the current rendered frame as a numeric
array; prompts may additionally carry an image, a text grid, and a text diff.

Transition and boundary history. wmlib.frames() and wmlib.transitions() return deci-
sion states and ordinary action transitions. Completed-level and fatal boundaries are represented
separately by terminal_events() and death_events(), preserving the terminal frame and
causal action needed to test outcome(state).

Transient animation evidence. wmlib.animation_index() lists summary metadata for saved
non-decision animation events. animation_grids() retrieves exact numeric frames for a
selected event, optionally restricted to keyframes or requested indices.

Perceptual helpers. wmlib.diff_text(), wmlib.segment(), and wmlib.segment_summary()
provide lossless diffs and connected-component summaries. They are convenience views over
recorded grids, not fixed representational commitments.

This API matters for interpretation of results. A no-world-model actor still receives durable evidence
about current state, history, boundaries, and animations; it is not a bare language model asked to
infer from a lossy transcript. Conversely, when executable world modeling is enabled, the model
is judged against this same record. The policy comparison therefore asks whether model-using
workflows improve the complete agent on top of a faithful Moore-machine interface.

44

C.2 Executable-model verification

The required Python functions are init_state, transition, render, and outcome. The op-
tional observation_variants hook represents display uncertainty; actions, subgoals, heuristic,
planner_key, and a custom planner can support tractable planning. The verifier threads each level
from its first frame, checks every claimed cell, reports prediction coverage separately, and evaluates
outcomes against recorded completion and fatal boundaries. It applies no cosmetic HUD mask,
and completion animations and the next level’s initial frame remain outside the completed level’s
ordinary transition sequence.

The trigger configuration uses a fixed verifier gate. It requests repair when accepted transition
match is below 0.999, when prediction coverage is below 0.75 or vacuous, when the model is absent
or invalid, or when the outcome classifier contradicts observed ordinary, completion, or fatal states.
New levels after the first and fatal resets invoke the builder independently of this gate. The coverage
guard prevents a substantially abstaining renderer from silencing repair merely because all cells it
does claim are correct. The value 0.75 was fixed during harness development and used unchanged
in the reported trigger run; it was not selected by a threshold sweep or varied in an ablation.

D Run Diagnostics

These diagnostics complement the per-game RHAE, level-completion, and action counts available
from the official scorecards. The scorecard links and per-game manifests are released in artifacts/
scorecards/; machine-readable diagnostic values and aggregate figure inputs are released in
artifacts/appendix_metrics.json and artifacts/figure_data.json.

D.1 Operational and end-of-run checks

Table 10 separates successful engine win terminations from stops imposed by the level-action,
language-model-call, and inference-cost limits. Context reductions count emergency prompt reduc-
tions; peak prompt is the largest recorded prompt-token estimate; and LM calls count language-model
requests. No run ended through the all-levels-accounted fallback, an exception, or the output-length
cap.

Policy

Wins Level limit LM limit Cost limit Context comp. Peak prompt LM calls

No world model
Single
Orchestrator
Trigger
GPT-5.6
Opus 5

19
19
21
18
25
25

3
2
1
2
0
0

0
0
1
5
0
0

3
4
2
0
0
0

3
4
3
1
5
0

850k
851k
852k
852k
219k
300k

22.9k
25.6k
24.1k
44.4k
26.5k
15.1k

Table 10: Operational diagnostics for the six evaluated runs.

The rendering diagnostics in Table 11 grade a transition when either the observed grid changes or
the model predicts a change. Accepted transition match permits a bounded observation variant and
ignores cells explicitly marked UNKNOWN; strict match requires the canonical full render. Known-cell
accuracy is weighted by claimed cells, coverage by transitions, and the last two columns report how
often each uncertainty mechanism was used. The no-world-model policy has no executable renderer.

45

Policy

Trans. Accepted Strict Known-cell Coverage UNKNOWN Variant

No world model
Single
Orchestrator
Trigger
GPT-5.6
Opus 5

–
4,510
5,355
6,105
6,486
6,114

–
22.24
45.56
99.97
99.49
70.26

–
6.9
44.1
92.9
98.8
63.2

–
90.2
97.2
100.0
100.0
95.7

–
99.5
97.8
98.9
100.0
99.5

–
30.8
3.8
5.5
0.3
7.8

–
0.5
0.8
1.6
0.4
2.7

Table 11: End-of-run rendering diagnostics over graded transitions (percent except Trans.).

Table 12 evaluates level_complete (LC) and game_over (GO). Recall is measured on recorded
terminal evidence, false-positive rates on ordinary decision states, and parentheses give terminal-
event counts. Inference-cost-capped games are excluded from all end-of-run model aggregates.
Among the remaining games, a game enters the verified-game denominator only when its end-of-run
model provides a usable observable outcome report, and it is verified only when every such outcome
check passes.

Policy

LC recall (n) GO recall (n) LC false + GO false + Verified games

No world model
Single
Orchestrator
Trigger
GPT-5.6
Opus 5

–
28.5 (137)
46.5 (155)
98.1 (156)
99.5 (183)
87.8 (181)

–
25.0 (12)
66.7 (6)
100.0 (20)
100.0 (10)
100.0 (6)

–
0.2
0.3
0.0
0.0
3.4

–
0.6
0.0
0.0
0.0
0.0

–
0/21
4/22
20/24
22/25
8/25

Table 12: End-of-run outcome diagnostics (percent except event counts and verified games).

D.2 Model use and pre-action repair

We count only explicit harness events with stable trace-level definitions; arbitrary Python calls
and file rewrites are excluded. In Table 13, end-run plan levels count completed levels for which
model replay exposes at least one plan. The remaining columns use recommendations surfaced
before the committed action. A first action is followed only when the actor commits the same fully
specified action later in that harness turn. Manual recommendations are explicit plan.py results,
automatic recommendations come from verifier feedback, and builder advice is separate because it
need not originate in search. An explicit plan.py invocation creates the validated cross-turn artifact.
Automatic feedback never does so. Plan prefix counts surfaced actions until the first deviation
or boundary. A dash means that the policy exposed no parseable recommendation through that
channel, not that no planning occurred.

Policy

Builder calls End-run plan lvls. Auto first Manual first Builder first Plan prefix

No world model
Single
Orchestrator
Trigger
GPT-5.6
Opus 5

0
0
147
1192
660
130

0
0
5
34
34
32

–
25/29
–
–
–
–

–
–
–
–
4/5
–

–
–
35/68
552/970
634/644
109/129

–
116/217
–
–
49/150
–

Table 13: Builder activity and executable-model use.

The main text reports micro-averaged accepted transition match. Game-macro accepted transition
match is 16.6%, 17.8%, and 83.0% for single, orchestrator, and trigger, preserving the same ordering.

46

A conservative lower bound that counts every action without an available pre-action model as
inexact is 12.4%, 13.5%, and 45.5%.

Repair-recovery measurements give a second view. After a rejected prediction, orchestrator restores
an accepted prediction on the first post-builder action in 29 of 73 evaluable cases (39.7%) and
within five predictions in 35 (47.9%). Trigger does so in 354 of 531 (66.7%) and 503 of 531 (94.7%),
respectively. The evaluable subset contains 103 of 147 orchestrator builder calls and 716 of 1,192
trigger calls. These rates are associational: a builder call can coincide with an already informative
trajectory, and the five-step window can include another call.

E Generated Program versus Game Engine: ls20

Replay metrics show whether a final simulator reproduces recorded transitions, but not which engine
rules it encodes or where its behavior diverges off the recorded trajectory. We therefore compare the
generated program, notes, auxiliary files, and action trace from one completed ls20 run with the
public engine source. This retrospective case study asks what Tycho constructed and how builder
recommendations appear in the action stream.

The run uses the Orchestrator policy described in Table 1. We did not supply the actor or builder
with an explicit description of ls20’s mechanics. We did supply our ARC-AGI-3-specific prompts
and initial workspace, documented in Section A. These specify the action interface, interaction
history retained across levels, explicit state/transition/render/outcome interfaces, attention to hidden
state and heads-up display (HUD) variables, hypothesis-discriminating probes, replay verification,
uncertainty handling, and simulator-based search. The ls20 hypotheses and code changes were
produced during interaction within this workflow.

For ground truth, we use ls20.py from public engine package version 9607627b. The alphanumeric
tags shown below are non-semantic identifiers from the obfuscated engine source, not names assigned
by Tycho. We include them only as searchable source anchors.

E.1 Program-engine correspondence

Item

Inference activity

Benchmark result

Program construction

Engine source inspected for this
audit

Audited value

GPT-5.6 Sol at maximum reasoning effort; 1,749 completed
language-model calls: 661 in the actor role, 1,068 in the
builder role, 18 summarizing completed levels, and 2
summarizing animations; $264.77 recorded list-price cost
7/7 levels, Relative Human Action Efficiency (RHAE;
completion and action efficiency) 100 under the official scoring
rule, WIN; 478 scored environment actions: 17, 103, 41, 43, 75,
111, and 88 by level, including 3 RESET commands
98-line initial simulator template present at the first scored
action; 38 actor-requested builder invocations; 1,319-line final
world_model.py; three generated auxiliary files totaling 347
lines
ls20.py; 2,060 lines

Table 14: Execution and artifact scope of the audited ls20 run.

47

During the run, Tycho produced an executable Python simulator, implementing the prescribed
state, transition, rendering, and outcome interfaces. Its State dataclass represents avatar position,
the remaining action-counter value (named fuel in the generated code), carried shape and color,
refills, game-board transformation operators, launchers, target chambers, moving-object positions
and directions, and an internal map of terrain hidden by fog (world_model.py). init_state parses
an observed grid, transition applies one action, render produces the predicted grid, and outcome
predicts ongoing, completed, or game-over status (world_model.py, lines 240, 605, 910, and 1006).
actions lists candidate moves; subgoals and heuristic expose targets and cost estimates to
search (world_model.py). Replay follows the typed decision-frame and verification protocol in
Sections 3 and 4; transient animation frames remain separate evidence and are not graded as state
transitions.

Tables 15 and 16 use five audit labels. A match means that the generated code implements the
stated engine mechanic within the listed scope. A lookup table maps a finite, enumerated set of
inputs to successor patterns and defines a fallback for all other inputs. An approximation agrees on
the successful action sequences replayed here but differs in mechanism or scope. An omission is
an engine behavior with no counterpart in the generated transition. Data denotes fixed per-level
engine configuration represented as inferred constants or per-level state. Such values may be valid
state estimates, but they do not constitute a general rule for generating levels.

Engine mechanic (source tag)

Counterpart in world_model.py

5 × 5 avatar moves one tile; wall tiles block
(ihdgageizm)

The parser first matches the observed avatar: two rows of
color 12 above three rows of color 9. If its palette
changes, a fallback accepts the same geometry in any two
non-terrain colors. Movement permits floor and operator
cells, blocks walls, and tests target entry at tile centers

Label

match

Ordinary and wall-blocked movement
decrements the counter. StepsDecrement is 1
on levels 0, 3, and 5, and defaults to 2

Shared decrement and blocked-move logic; values inferred
from counter shortening are 1, 2, 2, 1, 2, 1, and 2 for
levels 0–6

match +
data

Hollow rings refill the counter once and
disappear on contact (npxgalaybz)

Ring detection by an exact 3 × 3 ring outline; contact
refills the counter and removes the ring. Respawn
restoration is assessed below

Rotation contact advances by 90◦ (rhsxkxzdjz) Clockwise np.rot90 of the carried shape shown in the
HUD when the avatar newly contacts the operator; all
recorded rotations agree

match

match

Color-operator contact advances through ARC
palette color IDs 12 → 9 → 14 → 8 → 12
(soyhouuebz)

Matching contact consumes a chamber; the
level completes when no chambers remain, with
two sequential target chambers on level 5
(rjlbuycveu)

Entry into a mismatched chamber is rejected
without decrementing the counter; moving
operators undo their tentative step

The colors are read clockwise from the visible wheel and
applied in the same order

match

The visible 3 × 3 pattern and color are compared, so
rotation is included in the pattern; the first target is
removed when matched and the last completes the level

match

The avatar, counter, and moving-operator positions and
directions also remain unchanged

match

Table 15: Engine rules matched by executable mechanics in the generated program.

48

Engine rule or representation (source tag)

Counterpart in world_model.py

Shape contact advances an unobserved internal
index through six fixed 3 × 3 patterns,
independent of entry direction (ttfwljgohq)

The program generates a 24-entry lookup table. It
produces the correct successor for every engine-valid
shape and rotation; an input outside that table is
predicted to remain unchanged

Label

match +
lookup

omission

No exhaustion or respawn transition and no life counter
are implemented; transition cannot reach game_over
from init_state. RESET is selected by the actor, handled
by the outer harness, and not modeled by transition

When a command starts with the counter at
zero, movement and contact handling still
occur before possible life loss; respawn restores
the avatar, carried shape and color, counter,
consumed rings, chambers, and
moving-operator positions and directions; the
last life ends the game

Launch tiles move to the tile before the next
wall or target-chamber coordinate; a
transformation operator on an intermediate tile
does not shorten the move (gbvqrjtaqo)

Moving operators advance before the avatar
and undo on rejected movement. Invisible
engine objects mark allowed path cells; at each
step the engine tries straight, then right, left,
and reverse (xfmluydglp)

A loop follows visible road until a wall, chamber, or
non-road tile. It matches recorded lanes and crosses
operator tiles that retain road pixels, but tests pixels in
the rendered map rather than the engine’s precomputed
wall and target coordinates

match +
approx.

The generated program also advances operators before
the avatar, but its line-segment patrols and eight-position
road loop are inferred from visible geometry and observed
positions rather than the hidden path objects

match +
approx.

Level-6 fog masks pixels farther than 20 pixels
from the avatar and renders the HUD after
masking so it remains visible

The same 20-pixel visibility rule is applied to a 64 × 64
terrain map reconstructed from observations, with ? for
cells never made visible

match +
data

On level 0, an operator contact that produces a
target match skips that command’s decrement

All three transformation operators apply
whenever the command’s destination contains
them, including contact with the same moving
operator on consecutive commands

Every rotator contact that begins after the previous state
had no rotator contact is free whenever the initial grid
contains no refill rings, whether or not it produces a
target match

The color wheel applies on every such contact. Shape and
rotation trigger only when contact begins, so the
generated program would miss a repeated contact on
consecutive commands; this case was not exercised in the
trace

approx.

approx.

Counter cost, terrain, starts, target attributes,
and fog are per-level fixed engine data

Costs, target state, and observed terrain are retained as
constants or internal per-level state, not produced by a
general rule for generating levels

data

Table 16: Finite lookup structure, unimplemented transitions, per-level data, and approximations
in the generated ls20 program. These forms can support successful play without being identical to
the engine’s state representation or implementation.

The generated program encodes each visible 3 × 3 shape row by row as a 9-bit integer, one bit per
cell. This abridged excerpt from world_model.py shows how it maps one shape to the next:

family = (179, 461, 413, 151, 367, 234)
known_successor = {}
for index, source in enumerate(family):

target = family[(index + 1) % len(family)]
for quarter_turns in range(4):

known_successor[bitmap_value(np.rot90(
bitmap(source), -quarter_turns

))] = bitmap_value(np.rot90(

bitmap(target), -quarter_turns

))

new_value = known_successor.get(value, value)

49

The engine instead increments an unobserved internal shape index cyclically through six values.
The generated code constructs 24 entries: the six shapes under all four rotations. It produces the
same successor as the engine for every valid visible shape, while using a finite lookup table rather
than separate shape and rotation indices. For an integer outside the table, it predicts no shape
change instead of marking the carried-shape cells UNKNOWN, the simulator’s marker for cells on which
it makes no claim. The engine explicitly assigns each mobile operator an invisible path object. The
generated program does not represent these objects, it infers bounded segments and a road loop
from visible geometry and observed positions. Because the path objects are never rendered, replay
can test the resulting operator positions on the recorded action sequence, but cannot establish
recovery of the engine’s path representation or behavior on unsampled branches. The generated
paths are therefore behavioral approximations even where recorded movement is exact.

E.2 Generated support code and action use

The three generated auxiliary files make their level-specific content explicit. compact_l5_search.py
hard-codes three eight-step operator paths, goal coordinate (50, 54), 9-bit target value 335, ARC
palette color ID 9, and an intermediate successor table. search_mobile.cpp hard-codes 70-
node movement graphs, 9-bit operator value 282, 9-bit target value 371, and the subsequently
rejected modular addition rule. fog_template.py stores the terrain map reconstructed from level-6
observations as 64 row strings with ? for unobserved cells. These are useful level-specific search
programs and map estimates, not a shared, level-independent transition program. This observation
is specific to the audited ls20 run. Determining whether auxiliary-file use generally increases on
later or harder levels would require a corpus file creation analysis.

The action trace records each builder recommendation alongside the action submitted in the same
actor turn. Each of the 38 builder invocations returned a recommended_action; 35 recommended
a directional movement action and three recommended RESET. In all 38 cases the subsequently
submitted action matched that recommendation. This establishes that builder recommendations
were followed in the recorded action stream. It does not show which actions or level completions
would have occurred without them.

E.3 Recorded hypothesis tests and revisions

The notes in notes/world_model.md record a sequence of explicit, testable revisions:

1. On level 3, one contact maps the 9-bit shape value 179 to 461 while the visible operator pattern
encodes 282. Because 179 + 282 = 461, the notes propose arithmetic addition, then record that
this single transition is also consistent with OR, XOR, or direct replacement.

2. On level 4, the notes predict that a second contact should yield 231 under addition modulo
512. The observed value is 413, rejecting that rule. A hypothesis that the result depends on
approach direction is retained provisionally because approach side and the number of prior
contacts changed together and could not yet be separated.

3. Deliberately repeated level-5 contacts produce 371 → 466 → 493 → 174 → 410 → 359.
Intermediate observations reject a proposed four-value cycle and fixed arithmetic or bitwise rules.
Before the final contact, a rotation-consistency hypothesis—rotating an input should also rotate
its successor—predicts 410 → 359; the next observation matches that prediction.

50

4. Level 6 then supplies 151 → 367 → 234 → 179 → 461 → 413. Together with the rotated level-5
transitions, these observations support the six-shape transition mapping, applied consistently
under rotation, retained in the final program.

Inspection of the engine after the run confirms that the operator contains no arithmetic rule and
that entry direction is not an input to its shape-index update. The record therefore contains explicit
predictions, observations that contradict or match them, and corresponding code revisions retained
in the workspace.

E.4 Replay

The aggregate diagnostics in Sections D and 5 distinguish pre-action from end-of-run models. This
case study instead uses the final ls20 program for a mechanic-level comparison with the engine,
replaying each level’s final successful attempt. Historical program versions preserved in workspace
snapshots were not replayed here; the figures below therefore describe final fit, not the accuracy
available when each action was selected.

The verifier accepts all 394 graded transitions: every concretely predicted cell matches the recorded
next grid without an optional alternative grid. This set excludes 74 transitions from three RESET-
abandoned attempts and the RESET commands themselves, although all three count in the 478-action
benchmark total. Seven level-ending transitions are checked separately through terminal rendering
and outcome. Strict full-grid exactness (all 64 × 64 cells concrete and correct) is 94.92% at 99.97%
coverage. Only level 6 uses UNKNOWN: 20 transitions contain at least one such cell, and strict exactness
is 77.01%. Every abstained cell is marked ? in the static level-6 terrain template and appears when
the moving fog window reaches terrain not encoded in that template. Abstention avoids guessing at
first exposure, but some coordinates remain UNKNOWN on later visits because the simulator does not
assimilate observed successor grids into its threaded terrain state. Those repeated abstentions are a
model limitation rather than unavoidable fog uncertainty. Outcomes match all seven completions;
six terminal renders are strictly exact and the seventh is accepted with UNKNOWN. No game-over
terminal was observed.

Replay covers only final successful attempts. A stronger audit would initialize both systems from
the same level start, replay a common prefix, and compare untaken branches over multiple steps.
That test was not run, so no accuracy is reported for those branches.

51

E.5 Claim assessment

Supported by this case

Not supported by this case

Tycho produced executable Python code matching
several engine mechanics, including a 24-entry lookup
correct for every engine-valid visible shape state.

This does not show exact recovery of all engine rules or
equivalent recovery on other games; life loss and respawn are
absent.

Notes and code record proposals, distinguishing tests,
and resulting revisions to mechanics.

In accepted replay, every concretely predicted cell
matches; UNKNOWN occurs only in level 6’s incomplete
terrain map.

Within Tycho’s human-designed workflow, GPT-5.6
Sol calls produced game specific hypotheses, code,
searches, and actions; all 38 builder recommendations
were followed.

The trace cannot determine whether GPT-5.6 Sol
encountered this game during training or establish adaptation
independent of ARC-AGI-3 specific system design.

Replay does not establish agreement on untried states, other
action sequences, or long multi-step predictions.

The score does not isolate GPT-5.6 Sol from ARC-AGI-3
specific prompts, interfaces, workspace, tools, or actor–builder
workflow, and does not measure component contributions.

Table 17: Claims warranted by the inspected ls20 artifact and important non-implications.

This case shows where the adaptation occurred. During play, GPT-5.6 Sol, operating through Tycho,
generated and revised an ls20-specific simulator, supporting code, and hypotheses. The prompts,
action and evidence interface, persistent workspace, actor–builder protocol, verifier, and planner
were fixed and designed by us for ARC-AGI-3. The result therefore demonstrates game-specific
program construction within a human-designed harness.

52
