6
2
0
2

n
u
J

6
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
1
1
5
7
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

MagicSim: A Unified Infrastructure for Executable Embodied
Interaction

One Runtime, One MDP, Three Drivers
Haoran Lu1,∗,†, Songling Liu1,∗, Yue Chen2,∗, Guo Ye1, Mutian Shen1, Shuyang Yu1, Yu Xiao1, Jihai Zhao1,
Shang Wu1, Jianshu Zhang1, Xiangtian Gui4, Chuye Hong3, Yuran Wang2, Maojiang Su1, Jiayi Wang1,
Ruihai Wu3, Zhaoran Wang1, Han Liu1,†
1Northwestern University, 2Peking University, 3University of California, Berkeley,
4ShanghaiTech University
∗Equal Contribution, †Corresponding Author

Robot learning and embodied agents now require simulation to serve as a shared execution sub-
strate linking control, skills, and planning, not only as a renderer, controller testbed, or fixed task
environment. Existing pipelines split these layers with “magic” actions, disconnected training envi-
ronments, or forward-only renders that cannot reproduce, evaluate, and annotate the same episode.
We present MagicSim, an embodied interaction infrastructure built around one deterministic batched
runtime and a shared Markov decision process (MDP). From YAML-first specifications that decouple
contents, placement, behavior, and agent exposure, MagicSim constructs diverse executable worlds
spanning task families, interaction regimes, physics, layouts, sensors, avatars, and robot embod-
iments in one reset-and-step loop. A common execution interface grounds high-level commands
through controllers, atomicskills, planner primitives, and asynchronous planning, realizing them as
robot actions rather than simulator-side state edits. One task definition supports three capabilities:
benchmark and RL evaluation, an autocollect interface that automatically turns commands into
grounded trajectories, and agent/VLM-facing interaction. For automatic execution, commands flow
through a Command→Skill→Planner→Robot→Record pipeline, while per-environment command,
skill, planning, retry, annotation, and episode states advance independently above the shared physics
tick. Successful rollouts are saved as structured multimodal trajectories aligning language supervision,
action representations, visual/geometric representations, and task-level status with the executed
episode. MagicSim thus unifies diverse world construction, embodied execution, task evaluation,
automatic rollout generation, and interactive agent interfaces in one planner-in-the-loop runtime.

1 Introduction

1.1 From Simulators to Embodied Interaction Infrastructure

Recent progress in robot learning [1–3], vision-language-action (VLA) and world-action models [4–7], and
embodied agents [8–10] has changed the role of simulation. A simulator is no longer only a place to test
controllers, render scenes, or define task environments [11–13]. It is increasingly expected to serve as a shared
substrate across different levels of embodied intelligence: low-level robot learning needs RL-ready environments
and successful demonstrations [14–17]; mid-level systems need grounded skill abstractions; and high-level
agents need an interactive world where language commands, plans, observations, and consequences unfold
over time.

This shift matters because these research levels are often studied in isolation. Low-level robotics focuses on
control, manipulation, locomotion, contact, and reinforcement learning, while high-level agent research focuses
on planning, task decomposition, language-conditioned decision making, and social interaction. Without a
shared execution layer, high-level agents are often evaluated through artificial “magic” actions, and low-level
policies are trained in environments disconnected from the plans that should invoke them. MagicSim connects
these levels by placing them on one shared, replayable runtime and a single MDP. On top of that runtime, the

1

Figure 1 MagicSim at a glance. A deterministic batched runtime executes planner-grounded, long-horizon episodes
through a shared Markov decision process. Each interaction follows the Command-to-Skill-to-Planner-to-Robot-
to-Record pipeline and can be exposed through three drivers: benchmark and reinforcement-learning evaluation,
success-gated trajectory collection, and agent/VLM interaction. The same execution produces synchronized multimodal
supervision, including RGB-D observations, language traces, end-effector waypoints, object bounding boxes, and
trajectory affordances.

same task can serve as an RL-style benchmark, be driven by planner-backed atomicskills for data collection,
or be opened to agents whose language commands invoke those same grounded skills.

Consider one end-to-end demonstration in MagicSim: a Unitree G1 humanoid walks across a room, crouches
to pick up a bottle, carries it to a side table, pours water from a teapot, places the objects onto a tray, carries
the tray to a seated person, and hands it over Figure.1 This single episode combines navigation, whole-body
balance, rigid-object manipulation, fluid interaction, placement, carrying, and human-facing interaction in
one runnable scene. Rendering such a sequence is not enough. To make this episode reusable for training,
evaluation, or agent interaction, the system must reproduce it when the pour goes wrong, plan the crouch and
the placement inside the stepping loop rather than offline, tie an affordance label to where the robot actually
grasped, and keep the trajectory only when the task succeeds. A render pipeline can produce the pictures of
this episode, but not these interaction-dependent records, because each requires state that a forward-only
pipeline discards.

MagicSim is built around this view. Given a scene specification, a task specification, and an embodiment, it
constructs a randomized but replayable world, exposes it through a shared task interface, drives behavior
through policies, planners, and atomicskills, captures multimodal observations and runtime annotations, and
returns the episode as a benchmark rollout, a successful training trajectory, or an agent-facing interaction.
MagicSim is therefore not merely a physics simulator, renderer, task benchmark, or data pipeline. It is an
embodied interaction infrastructure that serves as a shared substrate across the control, skill, and planning
levels of the embodied stack.

2

Squat Grasp BottleNav & Place BottleGrasp Teapot & Pour WaterGrasp Teacup & LeaveNav To AvatarSquat Handover TeacupExecutable Worlds / Long-Horizon EpisodeCommand->Skill->Planner->Robot->RecordAnnotation-Rich Data·RGB-D ·EE Waypoints·Trajectory ·Affordance·Language ·2/3D BBoxAutoCollect / Data·Auto Collect·Trajectory CollectionAgent / VLM APIOpen Interface forAgents & VLMs1.2 What Makes Embodied Interaction Executable?

The gap above cannot be closed by a richer asset library or a larger task list alone.[18–20] The hard part is
making several system pressures coexist inside one running simulator. An embodied interaction substrate
must support heterogeneous physics, deterministic replay, multiple robot embodiments, planner-in-the-loop
control, and supervision that captures what happened during interaction rather than only what was rendered.

Heterogeneous physical worlds. A long-horizon task may involve rigid bodies, articulated objects, particle
fluids, deformables, terrains, sensors, avatars, and robots in the same episode. These elements have different
simulation backends and lifecycle constraints, yet they must coexist inside one reset and step loop. The
simulator must therefore define a common contract for what exists in the world, where it is placed, how it
behaves, and how it can be acted on.

Deterministic large-scale runtime. Executable worlds must also be reproducible at scale. In MagicSim, many
sub-environments share one simulator instance: one agent may be navigating, another may be waiting for a
planner result, another may be manipulating an object, and another may have failed and reset. Randomization
is useful only if these parallel worlds can be reset, snapshotted, and replayed from the same initial condition.
Deterministic reset ordering, state snapshotting, disjoint seeded randomization streams, and reset_to replay
are therefore part of the runtime contract rather than post-hoc logging utilities.

Multi-embodiment execution. A shared substrate cannot assume a single robot form or action space. Low-level
robotics may require single-arm manipulation, dual-arm coordination, mobile manipulation, dexterous hands,
humanoid loco-manipulation, quadruped locomotion, or camera-only motion. These embodiments differ in
kinematics, controllers, sensors, and action spaces, but they must still be exposed through a consistent task
and execution interface so that benchmark policies, scripted collectors, and agent drivers can operate over the
same world distribution.

Planner-in-the-loop interaction. Long-horizon embodied tasks cannot be reduced to offline trajectories or
instantaneous state edits. Skills such as crouching to grasp, placing an object on a tray, navigating around
furniture, or handing an object to a person require IK, motion generation, local navigation, and controller
feedback inside the stepping loop. This is especially challenging in batched simulation: one slow planning call
should not freeze every other environment. An executable runtime must therefore let skills submit planner
requests, continue stepping the batch, and consume results when they are ready.

Annotation-rich data generation. Finally, the system must preserve the interaction structure that learning and
evaluation need. A rendered frame alone does not say where the robot actually grasped, which skill phase
produced an action, which planner target was selected, whether the task succeeded, or how the scene should
be described in language. Executable interaction requires a capture layer that records observations, actions,
task states, skill and planner traces, object grounding, affordance targets, end-effector waypoints, language,
and success-gated trajectories.

Together, these challenges define MagicSim’s premise: one batched reproducible runtime, one shared MDP,
and multiple drivers for benchmarking, data collection, and agent interaction.

1.3 Design Philosophy

MagicSim is designed as usable infrastructure rather than a fixed benchmark or a closed data-generation
script. Its first principle is configuration over code: scenes, layouts, assets, robots, cameras, tasks, planners,
skills, randomization, and recording options are exposed through structured YAML-style specifications. This
lets researchers build and modify environments without rewriting simulator internals, and also makes the
system easier for coding agents to inspect, generate, and edit programmatically.

Usability is paired with efficiency as a runtime property. MagicSim runs many sub-environments inside one
simulator instance, while each environment maintains its own state and lifecycle. Expensive operations such
as IK and motion planning are handled asynchronously: a skill can submit a planning request, the batched
simulation continues stepping, and the result is consumed when ready. This design keeps the hot path from
blocking on a single slow solve and treats time and compute efficiency as part of how the environment runs,
not as an optimization added after the fact.

3

Finally, MagicSim pursues breadth without detaching abstraction from physical grounding. The system is
designed to support diverse physical interactions, sensors, avatars, robot embodiments, and task families,
so the same framework can serve robot learning, data generation, and agent-facing use cases. At the same
time, high-level skills are exposed only insofar as they can be realized through planners, controllers, and
robot actions inside the simulator. The result is an extensible embodied interaction framework that is easy to
specify, efficient to run, broad in coverage, and grounded in stateful simulation.

1.4 Contributions

This report presents MagicSim as an embodied interaction infrastructure that connects configurable world
construction, reproducible simulation, grounded robot execution, planner-in-the-loop interaction, structured
annotation, and multiple research drivers within one framework. Its main contributions are:

1. A configurable substrate for heterogeneous physical worlds. MagicSim provides a YAML-first environment
interface that decouples what exists, where it is placed, and how it behaves. Scenes can combine diverse
object families, articulated structures, deformables, fluids, terrains, rooms, sensors, avatars, and robot
embodiments under one specification contract, allowing users to define not only what a world contains,
but also what can be acted on, sensed, randomized, and evaluated.

2. A deterministic large-scale batched runtime. MagicSim organizes simulation through a manager-based
runtime in which many sub-environments share one simulator instance while maintaining independent
per-environment state. The runtime supports deterministic reset ordering, seeded domain randomization
with disjoint streams, state snapshotting, reset_to replay, and dynamic object lifecycle handling
across P1/P2/P3 modes. This makes reproducibility a runtime contract for randomized, heterogeneous
embodied worlds.

3. A multi-embodiment execution stack. MagicSim connects robot actions, closed-loop controllers, navigation,
humanoid whole-body control, dexterous control, avatar interaction, and camera motion through a
common execution interface. This allows the same runtime to support single-arm robots, dual-arm
systems, mobile manipulators, dexterous hands, humanoids, quadrupeds, avatars, and camera-only
agents without reducing them to a single action model.

4. Planner-in-the-loop interaction over one MDP and three drivers. MagicSim exposes tasks as a shared MDP
with observations, actions, rewards, terminations, and success conditions. The same Gym-compatible
task can be used as an RL benchmark, driven through atomicskills and planners for scripted data
collection, or exposed through agent-facing interfaces where language-level commands are grounded
into robot behaviors. Its planning stack, including cuRobo-based IK and motion generation, supports
asynchronous microbatch solving so planner-backed skills can run inside a batched simulation loop
without globally blocking all environments.

5. An annotation-rich data generation and serving system. MagicSim separates asset-level world priors
from runtime trajectory supervision. Asset annotations describe objects, rooms, layouts, and semantic
metadata before interaction, while runtime annotators record what happens during the episode. The
system combines camera streams, Omni Replicator annotations, language outputs, skill and planner
traces, and MagicSim-native annotations such as end-effector waypoints, object bounding boxes, and
affordance targets, then saves successful interactions as structured multimodal trajectories for local or
served use.

2 Related Work

Robotics and physics simulators. Modern robot-learning systems rely on mature simulation substrates for
physics, rendering, and parallel environment execution. Isaac Gym and Isaac Lab emphasize GPU-parallel
robot learning workflows [12, 21], while MuJoCo remains a widely used engine for control and robotics
[11]. SAPIEN and ManiSkill further support articulated-object interaction and manipulation benchmarks
[13, 22]. MagicSim is complementary to these simulators: it is not a new physics engine or renderer, but a
manager-centric layer for deterministic world construction, heterogeneous scene objects, planner-in-the-loop
execution, synchronized annotation, data collection, replay, and serving.

4

System

World, phenomena & actors Robot embodiments Deterministic execution runtime Data, tasks & agent interfaces

tic.

r

e
p
o
r
/
h
t
clo
/
Fluid
oft
S

ula
n
a
r
g
/

t
s
u
d
/
e
r
fi
/
w
Flo

n
a
m
u
h
/
r
a
t
a
Av

r
a
/

Rigid

Isaac Lab

ManiSkill3

RoboCasa

RoboTwin 2.0

✓

✓

(cid:71)(cid:35)
✓ ✗
(cid:71)(cid:35)
✓ ✗

✗

✗

✗

✗

✗

✗

✗

✗

✓ ✗

✗
RLBench
BEHAVIOR-1K ✓ ✓ ✓ ✓
✓ ✓ ✓ ✓
Genesis

✗

Habitat 3.0

✓ ✗

✗

✗

MagicSim (ours) ✓ ✓ ✓ ✓

✗

✗

✗

✗

✗

✗

✓
(cid:71)(cid:35)

✓

kills

m
r
a
al
u
d
/
gle
Sin

d
n
a
h
s
u
o
r
e
t
x
e
D

bile
o
m
d
ele
e
h
W

d
e
p
u
r
d
a
u
Q

s
v
n
e

oid
n
a
m
u
H

r
a
P

allel

R
D
d
e
d
e
e
S

g

o
t
_
t
e
s
e
r
/
y
pla
e
R

s
d
e
d
n
u
o
r
r-g
e
n
n
Pla

nin
n
pla
c
n
y
s
A

n
e
a-g
t
a
d
d
e
t
a
s-g
s
e
c
c
u
S

t.
o
n
n
a
e
tiv
a
N

P
D
M
k
r
a
m
h
c
n
e
B

s
e
c
a
r
t
k
s
a
t
/
e
g
a
u
g
n
a
L

I
P
A
M
L
V
/
nt
e
g
A

g
sin
n
e
s
tile
c
Ta

✓ ✓

✓ ✓ ✓ ✓

✓ ✓ ✓ ✓ ✓ ✓ ✓ ✓ ✓
(cid:71)(cid:35) (cid:71)(cid:35)

(cid:71)(cid:35)
✓ ✗ ✓

✓ ✓

✓

(cid:71)(cid:35)
✓ ✓

(cid:71)(cid:35) (cid:71)(cid:35)

✓
(cid:71)(cid:35)
✓

✓

✓ ✗

✗

✗

✗

✗
✗
(cid:71)(cid:35) (cid:71)(cid:35) (cid:71)(cid:35)
✗
✗
✗
(cid:71)(cid:35)

✓ ✗ ✓ ✗
(cid:71)(cid:35)
✓ ✗

✗ ✓ ✗ ✓

✗ ✓

(cid:71)(cid:35) (cid:71)(cid:35) (cid:71)(cid:35)
✓

(cid:71)(cid:35) (cid:71)(cid:35)

✓ ✓

(cid:71)(cid:35)
✓ ✓ ✓ ✓ ✓ ✓ ✓ ✓ ✓

(cid:71)(cid:35) (cid:71)(cid:35)

(cid:71)(cid:35)

✗

✗

✗

✗

✗

✗

✗

✗

✓

✓

✓ ✓ ✗

✗
(cid:71)(cid:35) (cid:71)(cid:35) (cid:71)(cid:35)

✗

✗

✓ ✓ ✗

✗ ✓

✓ ✓ ✓ ✗ ✓

✓ ✓

✓

✓
(cid:71)(cid:35)

(cid:71)(cid:35)
✗
✗
(cid:71)(cid:35) (cid:71)(cid:35)
✗

✗ ✓

✗ ✓

✗

✗ ✓
(cid:71)(cid:35)

(cid:71)(cid:35)

✓ ✓ ✓ ✓ ✓

✗

(cid:71)(cid:35)

(cid:71)(cid:35)
✗
(cid:71)(cid:35)

✗
(cid:71)(cid:35)
✓

(cid:71)(cid:35)

Table 1 Capability comparison of MagicSim against representative robotics / embodied-AI simulators and benchmarks,
judged by each system’s official documentation or papers (June 2026). ✓ = full support,
= partial / limited,
✗ = not supported. “Seeded DR” = seeded domain randomization; “Native annot.” = native end-effector-waypoint /
3D-box / affordance annotations.

(cid:71)(cid:35)

Embodied AI and robot-learning benchmarks. Embodied AI and robot-learning benchmarks define what agents
should solve. Habitat established a modular platform for embodied AI in 3D environments [23]; iGibson and
BEHAVIOR extended this direction toward interactive household scenes and everyday activities [24, 25]. In
manipulation, RLBench provides diverse task demonstrations [26], while CALVIN and RoboCasa focus on
long-horizon, language-conditioned household manipulation [27, 28]. MagicSim adopts explicit task definitions,
but treats each task MDP as a reusable runtime object shared by benchmarking, scripted collection, replay,
and remote inference.

Synthetic data and demonstration generation. Recent robot learning increasingly depends on scalable, diverse,
and standardized trajectory data. Open X-Embodiment aggregates cross-robot datasets for RT-X-style
generalist policies [29], while BridgeData V2 and DROID show the value of broad real-robot data for
generalization [30, 31]. In simulation, VIMA studies multimodal-prompt manipulation [32], and MimicGen
and RoboCasa demonstrate scalable synthetic demonstration generation [28, 33]. MagicSim contributes at
the simulator-production layer: it generates success-gated trajectories with synchronized actions, observations,
cameras, annotations, and language streams.

Motion planning and task-and-motion planning. Motion planning provides the execution backbone for high-level
robot commands. OMPL and MoveIt made reusable planning infrastructure broadly available [34, 35], while
task-and-motion planning studies the coupling of symbolic task structure with continuous feasibility [36, 37].
cuRobo pushes motion generation toward massively parallel GPU-based collision checking and trajectory
optimization [38]. MagicSim builds on this lineage, but makes planning a first-class runtime service: planner
requests, skill execution, and environment state are handled within the same manager abstraction rather than
through an external planning script.

VLM/VLA and agent interfaces to simulation. Multimodal robot-learning systems motivate simulators that
expose more than low-level states. CALVIN and VIMA use language or multimodal prompts for long-horizon
manipulation [27, 32]; RT-1 and RT-2 train visuomotor policies from large-scale robot data [39, 40]; and SayCan
and PaLM-E ground language models through robot skills, perception, and affordances [41, 42]. MagicSim
is positioned as the simulator-side interface layer for such agents, exposing visual streams, structured scene
facts, language-conditioned tasks, skill APIs, replay, and remote serving while leaving closed-loop VLM/VLA
planning as downstream use.

5

3 System Overview: Parallel Episode Runtime for Executable Interaction Data

MagicSim treats an episode, rather than a rendered frame, static scene, or single controller call, as the unit
of system design. A frame records appearance; an episode preserves the interaction-dependent state that
makes a simulated world reusable: replayable initial conditions, task success state, planner and skill history,
grounded affordances, and the trajectory that is retained only when the interaction succeeds.

This episode view makes parallelism a runtime requirement. MagicSim does not scale by assigning one Isaac
Sim [12, 43] process to every agent, planner request, or task attempt. Instead, many sub-environments
share one batched simulator process, while each environment maintains its own randomized world state [44],
command state, planner futures, task status, and recording buffer. Physics time is synchronized across the
batch; semantic time is asynchronous across agents, so at any instant different environments occupy different
control stages while the same task MDP is used for RL, scripted collection, and planned inference or replay.

3.1 Episodes, Not Frames

A conventional rendering pipeline can emit images whether or not an interaction worked. MagicSim instead
preserves the causal structure around those images. An episode couples five axes: world specifies what exists;
runtime specifies what can be reproduced; action specifies what can be executed; supervision specifies what
can be observed and labeled; and exposure specifies how the result is used as a benchmark rollout, dataset
trajectory, or agent-facing interaction.

These axes are not separate pipelines. They are different views of the same running episode. A grasping
trajectory, for example, is simultaneously a world state transition, a robot-control process, a planner-backed
skill execution, a source of affordance supervision, and a candidate data record. The system overview therefore
focuses on how MagicSim keeps these views aligned while running many episodes in parallel.

3.2 Parallelism as a Runtime Contract

MagicSim’s primary unit of scalability is the batched simulator process. A single Isaac Sim instance hosts
many sub-environments, and managers own per-environment slices of the shared stage. Scene, layout, terrain,
robot, planner, camera, capture, navigation, avatar, language, and record managers each own one part of the
runtime state, while the environment wrapper sequences them through a common reset and step lifecycle.

Parallelism appears at several levels. Physics and rendering are batched over sub-environments. Resets and
replay operate on selected env_ids. Each environment may receive a different action, command, skill phase,
or planner request. Planner calls are submitted asynchronously and solved off the main simulator loop. Each
environment also owns its own success gate and trajectory buffer, so one successful episode can be written
while other episodes continue running.

Stage

Parallel unit

Runtime contract

World state
Reset and replay

Sub-environment
env_ids

Physics stepping
Agent progress

Batched simulator tick
Per-env command state

Planner compute

Planner request

Data recording

Per-env trajectory

Managers own per-env slices of the shared Isaac Sim stage.
Reset, randomization, snapshot, and reset_to operate on
selected environments.
Actions are applied before a synchronized simulation step.
Different environments may be running different tasks, skills,
planner phases, or reset states.
Planner calls return futures and are solved asynchronously
off the main loop (§6.7).
Each environment has its own buffers and writes only after
success.

Table 2 Parallelism in MagicSim is staged across world state, reset/replay, physics stepping, agent progress, planner
compute, and data recording.

The important point is that MagicSim does not require one simulator process per agent. Multiple simulator
processes can still be used as an outer serving or cluster-scaling layer, but the core systems contribution is

6

inside a single batched runtime: many agents, tasks, planner requests, and trajectory buffers coexist within
one simulator instance. This is what allows both RL and data collection to scale without turning each agent
into a separate Isaac Sim process.

3.3 Runtime Topology and the MDP Boundary

The runtime topology has two boundaries (Figure 2). The first boundary separates Env-Core from the
task layer. Env-Core managers and synchronized wrappers construct and step the physical world; in robot
environments, this core is exposed through SyncRobotEnv. The second boundary is the MDP boundary.
TaskBaseEnv wraps SyncRobotEnv and defines the observation space, action space, reward, termination,
and success signal.

Figure 2 Runtime topology and the MDP boundary. Env-Core constructs a batched physical runtime; TaskBaseEnv
exposes it as a shared MDP; different drivers step the same task interface.

This topology is deliberately asymmetric. RL training is an external loop that directly steps TaskBaseEnv.
Scripted data collection is implemented as wrappers above the same task: AsyncRobotEnv adds AtomicSkill
and GlobalPlanner managers, and AutoCollectEnv adds command sampling and recording, and drives the
Env-Core language annotation. Inference and replay are planned as an external driver over the same MDP,
using the RobotManager action space rather than the Collect layer’s skill and planner hierarchy.

The MDP boundary is therefore the point where different research modes meet. Below it, the same world,
robot, sensors, planners, and runtime determinism are reused. Above it, a user can attach an RL policy, a
scripted data-collection stack, or a policy/replay driver. MagicSim can therefore support benchmark rollouts,
data trajectories, and agent-facing interactions without defining three separate simulators.

3.4 One MDP, Three Drivers

The headline claim of the system is one MDP, three drivers. A task is defined once as a Gym-compatible [45]
MDP with observations, actions, rewards, terminations, and success conditions. That same MDP can then be
stepped by three different drivers.

Drivers and exposure surfaces are different axes. RL training, AutoCollect, and Inference/Replay describe
how the MDP is stepped. Benchmark rollouts, dataset trajectories, and agent-facing interactions describe

7

Benchmark / RLPolicy obs → actiondirect TaskBaseEnv.stepScripted CollectionAutoCollectEnvAsyncRobotEnvcommand → skill → plannerAgent / Inference / Replayplanned policy or replay action same task APITaskBaseEnvshared Gym-compatible MDP boundarystep(action, env_ids)return obs · reward · term/trunc · info/success · pending envswraps SyncRobotEnv-V0 as self.sceneSyncRobotEnvPlannerManager.step → RobotManager.step → IsaacRLEnv.stepSyncCollectEnvCameraManager · CaptureManager/TiledCaptureManager · native annotatorsSyncBaseEnvTerrainManager · LayoutManager · SceneManager · Seeded DR reset_idx · manager-local replay · P1/P2/P3 lifecycleBaseEnvlaunches IsaacRLEnv-V0; wires manager callbacksIsaacRLEnv hostSimulationContext · PhysX · RTX render · batched sim_step()Env-Core: one batched synchronized runtimeDriver

RL training

Status

current

Scripted AutoCollect

current

Inference / Replay

planned

Action path

A policy directly steps TaskBaseEnv. The action is interpreted
by the task and RobotManager action space, and the environment
returns batched observations, rewards, terminations, and success
information.
AutoCollectEnv wraps the same task through AsyncRobotEnv.
The path is Command → Skill → Planner → Robot → Record,
with per-env state machines driving scripted demonstrations.
InferenceRunner drives the same TaskBaseEnv with a policy or
replayed action stream. The action path uses the RobotManager
action space and does not go through the Collect layer’s AtomicSkill
or GlobalPlanner stack.

Table 3 The three drivers step the same task MDP rather than defining separate environments.

how the resulting episode is exposed. Keeping these two axes separate prevents the system from becoming a
collection of special-purpose pipelines. The driver changes, but the batched runtime does not.

3.5 Agent-Level Asynchrony

The most important form of parallelism in MagicSim is not merely that multiple environments step together.
It is that multiple agents can be at different semantic stages while the simulator remains batched (Figure 3).

Figure 3 Agent-level asynchrony. Environments share a synchronized physics tick but progress through semantic control
states independently.

This matters because planner-backed behavior is not constant-time. If every planning request were executed
synchronously inside the main loop, a single slow environment would stall the entire batch. MagicSim instead
exposes a submit-and-poll contract: a skill or globalplanner submits a request, receives a future, lets the batch
continue stepping, and consumes the result when it is ready. The planner service realizes the compute side of
this abstraction as an asynchronous microbatch solve-farm [38]; the mechanism is deferred to §6.7. For the
overview, two properties matter: the simulator loop is never blocked by a slow solve, and per-agent requests
are aggregated into larger batched solves rather than issued as many isolated calls.

8

Synchronized Physics Timeevery active environment crosses the same batched sim_step() barrier𝑡𝑡+1𝑡+2𝑡+3𝑡+4Env0Env1Env2Env3Submit IK/MotionGen futureExecute planned trajectory through RobotManagerPoll future: hold pose / safe actionConsume Result; executeTask updateBuffer obs/actionSample CommandAtomicSkill phaseGlobalPlanner actionRobotManager stepSuccess stateLanguage L1/L2/L3RecordManager savereset_idx /Next taskPer-env semantic stateAsynchronous across env_idRequest queue / FutureMicrobatch windowBatched cuRobo IK / MotionGenFuture done / per-env resultOff-loop async planner compute service (non-blocking futures; microbatched solves)Agent-level asynchrony is also what connects high-level commands to low-level execution without introducing
“magic” actions. A high-level command does not teleport the world into a goal state. It instantiates a task
command, advances an AtomicSkill state machine, submits planner requests, executes robot actions, observes
what happened, and updates the task state. The agent may reason at the level of commands, but the runtime
records only data produced by grounded actions inside the simulator.

The same asynchronous, batched, and agent-addressable runtime positions MagicSim as a rollout substrate for
high-level agent learning. A vision-language model or other planning policy can emit task or skill commands
against many parallel simulated worlds rather than only replaying pre-recorded trajectories. We treat closed-
loop reinforcement learning of such high-level planners—for example through RL post-training infrastructures
such as verl [46] or RLinf [47]—as a planned use of this interface rather than a completed capability. The
current VLM layout hook is an integration point (§14), while the agent-facing serving interfaces are described
later in the report (§12.3).

3.6 How Interaction Becomes Data

A MagicSim episode becomes data only after execution and validation (Figure 4). The system does not save
every attempted rollout. Instead, each environment accumulates observations, actions, task states, skill states,
planner states, camera streams, annotations, and language into per-env buffers. The task success signal then
serves two roles: it is an evaluation signal for the MDP and a write gate for data collection.

Figure 4 Episode lifecycle. MagicSim turns interaction into data only after execution, observation, annotation, and
success gating.

In MagicSim, interaction is not data until it succeeds and is recorded. This is the payoff of treating episodes
rather than frames as the unit of design. A render pipeline emits images whether or not the robot grasped the
object, reached the target, followed the plan, or satisfied the task. MagicSim instead records the interaction
structure around the frame: what command was active, which skill phase produced the action, which planner
target was selected, which robot action was applied, which observation and annotation streams were produced,
and whether the task state justified saving the episode.

The same lifecycle supports all three exposure surfaces. For benchmarking, the episode is a rollout with
task observations, rewards, terminations, and success. For data collection, the episode is a success-gated

9

SpecificationsScene / task / embodimentcameras / DR seeds / record configManager reset: replayable initial stateLayout → Scene → Terrain → Avatar/NavCamera/Capture → Robot → PlannerTaskBaseEnvobs/action/rewardtermination/successCommandAutoCollectManager samples / advances taskSkill phaseAtomicSkillManagersubmit/pullPlanner actionGlobalPlannerManagercuRobo / Nav / DWBExecutionPlannerManager → RobotManager → sim_step()Observe and evaluateget_obs / reward /  termination / task stateBufferRecordManager obs / action / collect streamsAnnotateCaptureManager, native annotators,Language L1/L2/L3 running: retain buffers, next tickStep loop: one batched physics tick, per-env semantic stateSuccessful and finished?Save trajectoryaction/, collect/, env/info/, env/camera/, language/Flush / re-rollfailed or truncated buffers clearedkeep latest observationreset_idx / next taskBenchmark rolloutobs, reward, done, successDataset trajectoryaligned actions, collect traces, cameras, annotations, languageAgent-facing interactionplanned exposureCommands, observations, consequencesyesnoDirect policy / replay pathseparate from Collectaction → TaskBaseEnv.stepskips AutoCollect / skill / global plannerepisode endsmultimodal trajectory with action, collect, camera, annotation, and language streams. For agent interaction,
the episode is exposed through an environment or serving interface where commands, observations, and
consequences unfold over time.

3.7 Architectural Commitments and Report Roadmap

These choices amount to five architectural commitments. First, MagicSim decouples what exists, where it is
placed, and how it can be acted on. Second, it treats determinism as a runtime contract rather than a logging
convention. Third, it makes planning a first-class runtime component rather than an offline preprocessor.
Fourth, it treats data as a runtime product, produced by execution, annotation, and success gating. Finally,
it exposes one task interface across evaluation, collection, and interaction, so the same episode substrate can
serve RL training, data generation, and agent-facing use.

The remaining chapters unpack this overview by following the executable verbs summarized in Table 4.
MagicSim first builds heterogeneous worlds, then makes them reproducible, executes embodied actions,
annotates runtime interaction, evaluates tasks, composes commands into skills, and finally collects or exposes
the resulting data.

Section

Role in the system

Verb

Build

Reproduce

Execute

Sense

Annotate

Evaluate

§4

§5

§6

§7

§8

§9

Compose

§10

Collect / Serve

§11

Support

Position

Discuss

§12

§13

§14

Construct heterogeneous multi-physics worlds, including rigid and ar-
ticulated objects, deformables, fluids, granular media, ropes, effects,
avatars, world carriers, and embodiments.
Make randomized batched worlds deterministic through manager-owned
state, seeded streams, reset/reset_to, snapshots, and object lifecycle
handling.
Run embodied actions through robot channels, closed-loop controllers,
navigation, motion planning, asynchronous planner services, flying
cameras, and avatars.
Simulate synchronized observation streams, including camera/RGB-D
capture, LiDAR/IMU, tactile contact, occupancy, navmesh queries, and
frame tracking.
Compile offline asset priors and record runtime supervision, including
Omni annotations, native end-effector/object/affordance labels, and
L1/L2/L3 language.
Define the task MDP contract, task families, observations, rewards,
terminations, success status, and benchmark protocol.
Lower commands into AtomicSkills and planner primitives with typed
outcomes, retries, backend execution, and success gates.
Run AutoCollect, maintain per-environment asynchronous collection
state, save success-gated trajectories, and expose the runtime through
serving APIs.
Summarize user-facing capability views: benchmark evaluation, data
collection, and agent/VLM interaction, including current and planned
status boundaries.
Position MagicSim as executable infrastructure for robotics, physical
reasoning, and embodied VLM/VLA or agent learning.
State limitations and future directions on simulation fidelity, learned
skills, and more complex long-horizon tasks.

Table 4 Report roadmap. Each row points to the section that implements or evaluates one part of MagicSim’s executable
embodied-interaction stack.

10

4 MagicSim Simulation Engine: A Unified Multi-Physics Backbone

4.1 Engine Overview

MagicSim is built around a unified simulation engine rather than a collection of object-specific simulators
assembled per task. Within one stage, rigid and articulated bodies, finite-element soft solids and surfaces,
particle-based cloth, fluids, granular media, constraint chains, force-field interactions, volumetric effects, and
animated human avatars can be instantiated, advanced, and observed together. The engine is layered on
Isaac Sim and IsaacLab, but its role is not merely to expose individual solvers. Its contribution is to make
heterogeneous simulation methods co-executable: different object families share the same world context,
appear in the same episode, and, where supported by the underlying physics, interact across solver boundaries.

This section focuses on what the engine can simulate and how these simulation methods compose. The
deterministic mechanisms that create, randomize, reset, step, and replay these entities belong to the manager
runtime (Section 5). This separation is important: the engine defines the multi-physics capability surface,
while the runtime defines the lifecycle, seeding, reset, and replay contracts.

4.2 Programmatic Import and Parameterized Simulation Entities

A central design choice in MagicSim is that simulated entities are not treated as monolithic USD props
with fixed appearance and fixed dynamics. A USD file, primitive, generated particle set, field source, or
animation clip is only the source representation. Before an entity becomes part of the executable world,
the engine imports or generates it through code, assigns it to a simulation family, binds visual and physical
materials, resolves its pose and scale, attaches solver-specific state, and exposes observation hooks. This
programmatic import path is what makes pose randomization, scale randomization, visual randomization,
physics randomization, and multi-physics coupling possible in the same world.

We distinguish three identifiers. Let c ∈ C denote a user-defined logical category, such as a mug, tray, shirt,
cabinet, rice pile, or human avatar. Let

F = {f1, . . . , fK}

denote the set of simulation families exposed by the engine, where K = |F| is a variable family count rather
than a fixed part of the engine definition. An entity instance is identified by its environment, logical category,
and instance index,

while its simulation behavior is determined by a family assignment

e = (n, c, i),

f (e) ∈ F.

Thus, c describes what the entity means in the scene, whereas f (e) describes how it is simulated.

The final simulation entity can be written abstractly as

(cid:16)

xe =

ae, f (e), Te, se, θvis

e , θphys
e

, θsolver
e

, he

(cid:17)

,

where ae is the selected asset or generated source, Te is the world transform, se is scale, θvis
are visual
parameters, θphys
are solver-specific parameters, and he denotes observation
and annotation hooks. Pose, scale, visual appearance, physical material, and solver parameters are therefore
first-class construction axes rather than post-hoc edits to a static scene.

are physical parameters, θsolver

e

e

e

This parameterized construction is what enables domain randomization and multi-physics coupling. Visual
randomization can vary color, texture, material binding, emission, or effect presets. Pose and scale random-
ization can vary object placement, support relations, and collision opportunities. Physical randomization
can vary mass, density, friction, restitution, damping, contact offsets, stiffness, viscosity, cohesion, pressure,
field strength, or flow direction, depending on the simulation family. The runtime mechanisms that sample,
seed, reset, and replay these parameter values are described in Section 5; here we emphasize the engine-level
consequence: MagicSim objects are configurable simulation entities, not fixed USD props.

11

Table 5 Parameterized construction axes for a MagicSim simulation entity. The simulation-family count K = |F| is a
variable. The current implementation used in this report instantiates K = 15, but the engine abstraction is written in
terms of F so that new families can be added without changing the architecture.

Axis

Examples

Engine role

Logical identity

Simulation family

Source representation

e = (n, c, i): env id, logical category,
instance id

Gives each entity a stable user-facing identity
independent of its physical stage prim path.

f (e) ∈ F: Rigid, Fluid, Garment,
Avatar, etc.

Selects the backend representation, solver
state, and method-specific parameters.

USD file, USD folder, primitive ge-
ometry, generated particles, field
source, animation clip

Provides the raw asset or generated source
that the engine imports or binds to a solver-
specific representation.

Layout parameters

Position, orientation, scale

Visual parameters

Color, texture, USD/MDL material,
emissive preset, effect preset

Physical parameters

Mass, density, friction, restitution,
damping, contact offset, rest offset

Solver-specific parameters Joint limits, FEM stiffness, cloth
constraints, particle spacing, viscos-
ity, cohesion, surface tension, pres-
sure, field strength, flow direction

Determine spatial relations, support, collision
opportunities, and task geometry.

Support visual domain randomization with-
out changing semantic identity or simulation
family.

Control contact behavior and dynamics for
rigid, articulated, deformable, and particle-
based entities.

Connect the user-facing family to the simula-
tion method governing state evolution.

Observation hooks

Semantic label, instance id, bbox,
particle state, joint state, animation
state

Make the entity observable, annotatable, and
replayable as part of an executable episode.

4.3 Simulation Methods and Supported Families

MagicSim organizes its simulation support into a small number of method families. Rigid and articulated
dynamics cover movable rigid bodies, jointed objects such as drawers and cabinets, and large instanced rigid
populations. Finite-element simulation covers volumetric soft bodies and surface cloth. Particle-based and
position-based systems cover garments, fluids, granular materials, fine-grain media, and pressurized soft shells.
Constraint-based chains model rope-like objects. Beyond contact dynamics, MagicSim also supports force-field
interactions for magnetic effects, volumetric and emissive effects for fire and flow, and animation-driven
entities for human avatars.

These families do not collapse into one monolithic solver. Instead, they share a common multi-physics engine
boundary: they can be placed into the same world, advanced as part of the same simulation episode, and
exposed through the same observation and annotation path. Physical parameters remain method-specific.
For example, rigid bodies expose mass, density, collision shape, friction, restitution, and contact offsets;
articulations expose joint state and joint limits; finite-element bodies expose mesh resolution, stiffness, damping,
density, and contact parameters; particle systems expose particle spacing, contact offset, density, viscosity,
cohesion, surface tension, drag, and lift; flow effects expose source pose, direction, and magnitude. How these
parameters are sampled, seeded, and replayed is handled by the runtime in Section 5.

MagicSim exposes a user-facing simulation-family set F = {f1, . . . , fK}. The family count K is deliberately
written as a variable: it is a property of the current implementation, not a hard-coded ontology of the engine.
The implementation described in this report instantiates K = 15, summarized in Table 6 and illustrated in
Figure 5.

These families are a capability taxonomy rather than a one-to-one mirror of the internal manager registry.
Internally, they are realized through multiple runtime managers and specialized backends, including physics

12

objects, artifacts and effects, instancing and field backends, and the animation subsystem. To the user,
however, they present a unified simulation surface: each family can be specified as part of a world, observed
during an episode, and composed with other families in executable scenes.1

Figure 5 MagicSim simulation families and coupled multi-physics interactions. The first three rows show the current
implementation of the family set F, where K = 15, spanning rigid and articulated dynamics, finite-element soft bodies
and cloth, particle-based fluids and granular media, force fields, volumetric effects, and animated avatars. The last
row is the coupled multi-physics evidence row: it shows representative cross-family interactions in which entities from
different solver families are co-executed and physically interact in a single scene.

4.4 Coupled Multi-Physics Composition

The engine’s defining property is coupled breadth, and it is useful to separate two senses in which families
compose. The first is co-execution: all families in F can be instantiated in the same stage, advanced under
one simulation episode, and observed as a single scene, regardless of which solver or backend governs each
entity. Co-execution alone distinguishes the engine from a collection of method-specific simulators, because a
single episode need not be confined to one solver’s world.

The second and stronger sense is physical coupling: entities governed by different dynamics solvers do not merely
coexist but interact across solver boundaries. The bottom row of Figure 5 shows five representative cross-family
couplings in the current K = 15 instantiation: rigid bodies against FEM soft solids (Rigid × Deformable),

1Static collision geometry is handled as an internal scene-geometry substrate rather than as one of the user-facing simulation

families in F, and is omitted from Figure 5.

13

RigidFireRiceFluidArticulationSandRopeDeformableGarmentFEMClothMagnetAvatarRigidInstancerInflatableFlowRigid× DeformGarment × DeformableArticulation×GarmentInflatable×FluidRigid× SandTable 6 Current instantiation of MagicSim’s simulation-family set F, with K = 15 user-facing families. The table groups
families by simulation method and lists how each family is represented in simulation. Detailed domain-randomization
sampling, seeding, reset, and replay mechanisms belong to the manager runtime rather than this engine taxonomy.

Method family

Rigid and articulated
dynamics

Family

Rigid

PhysX rigid-body dynamics with collision
geometry and rigid-body material.

How it is simulated

State and representative parameters

Rigid and articulated
dynamics

Articulation

Rigid and articulated
dynamics

RigidInstancer

PhysX articulation for jointed rigid struc-
tures such as cabinets, drawers, doors, and
appliances.
Instanced rigid-body population for large
numbers of repeated rigid entities.

Finite-element simula-
tion

Deformable

FEM volumetric soft body represented by a
simulation tetrahedral mesh.

Finite-element simula-
tion

FEMCloth

FEM surface cloth for sheet-like deformable
objects.

Particle-based
and
position-based systems

Garment

Particle-based cloth for garments and fabric-
like objects.

Particle-based
and
position-based systems

Fluid

Particle-based fluid, optionally coupled with
a container.

Particle-based
and
position-based systems

Sand

Granular particle medium for piles, scooping,
pushing, and contact-rich interaction.

linear/angular velocity,
SE(3) pose,
mass or density, collision approxima-
tion, friction, restitution, contact/rest
offsets.
Root pose, joint positions/velocities,
joint limits, drives, link collision, rigid
material parameters.
Per-instance transforms and velocities,
shared or per-instance rigid material,
collision scale, density/friction settings.

Node positions/velocities, tetrahedral
mesh resolution, density, Young’s mod-
ulus, Poisson ratio, damping, dynamic
friction, contact/rest offsets.
Surface vertices, cloth mesh topology,
stiffness/damping, density, thickness
or contact offset, friction and collision
settings.

surface tension, drag,

Cloth particles,
stretch/bend con-
straints, particle contact offset, rest
offset, solver iterations, density, fric-
tion, damping, drag/lift-style material
terms.
Fluid particles, density, viscosity, co-
hesion,
lift,
solid/fluid rest offsets, contact offset,
solver iterations.
Granular particles, particle radius
or contact offset, density,
friction,
cohesion-like material terms, solver it-
erations, settling/contact parameters.
Grain positions, grain size or particle
spacing, density, friction, contact off-
sets, material and collision parameters.
surface nodes,
stiffness,
friction,

constraint,
contact offsets,

pressure-like
damping,
deformation state.

Particle-based
and
position-based systems

Rice

Particle-based
and
position-based systems

Inflatable

Fine-grain granular medium represented as
small particle-like or grain-like solid ele-
ments.
Pressurized soft-shell or particle-shell object. Shell particles or

Constraint chains

Rope

Constraint-based capsule or chain represen-
tation for rope-like objects.

Force fields

Magnet

Field-based interaction that applies non-
contact forces to nearby compatible bodies.

Volumetric and emis-
sive effects

Fire

Volumetric or emissive effect backend for
flame-like visual and semantic context.

Volumetric and emis-
sive effects

Flow

Flow-like volumetric effect for smoke, steam,
dust, or wind-style context.

Animation-driven enti-
ties

Avatar

Animation-driven human entity controlled
by skeletal animation or animation graph
variables, not by the robot controller stack.

Segment poses, capsule radius/length,
chain constraints, bending/stretch re-
sponse, collision and friction parame-
ters.

Field source pose, range, strength, po-
larity or attraction/repulsion mode,
and affected-body filters.

Source pose, effect preset, color/emis-
sion, scale, intensity, temporal varia-
tion; generally co-observed rather than
contact-coupled.
Source pose, flow direction, magnitude,
scale, density or visual preset; gener-
ally co-executed as context rather than
universal reaction-force coupling.

Root pose, skeletal joint transforms,
animation state, command queue, gaze
or motion clip state; used for human-
scene and human-robot context.

14

particle cloth against FEM solids (Garment × Deformable), articulated structures against particle cloth
(Articulation × Garment), pressurized shells against fluids (Inflatable × Fluid), and rigid bodies against
granular media (Rigid × Sand). These pairs span rigid-body–FEM, FEM–particle, and particle–particle
interaction, so the engine supports bidirectional contact coupling across its dynamics solvers rather than
co-locating independent simulations that never touch.

Not every family participates in physical coupling in the same way. Volumetric and emissive effects such as
fire and flow, and animation-driven avatars, are co-executed and co-observed within the scene but are not, in
general, two-way contact-coupled to the dynamics solvers; they contribute visual, semantic, and interactive
context rather than universal reaction forces. This distinction keeps the engine claim precise: MagicSim
supports broad co-execution across F, and demonstrates physical coupling on representative solver-family
pairs where contact dynamics are supported.

4.5 Heterogeneous Sub-Environments, One Engine

The simulation-family set F defines the interactive content that MagicSim can instantiate, but the engine
is designed for heterogeneity not only across object types, but also across sub-environments. In a batched
run, different sub-envs may contain different assets, different logical categories, different simulation families,
different poses and scales, and different visual and physical parameters. One sub-env may contain a rigid
container, a fluid pour, and an animated human recipient; another may contain an articulation interacting
with garment cloth; another may contain a rigid tool pushing granular media. These sub-envs are not separate
simulators. They are heterogeneous instances of the same multi-physics engine, advanced under one simulation
boundary and exposed through a common observation and annotation surface.

This design follows from the parameterized import model described above. A USD asset, primitive, generated
particle set, field source, or animation clip is only the source representation. At construction time, each
entity is assigned a logical identity e = (n, c, i), a simulation family f (e) ∈ F, a world transform Te, a scale
se, visual parameters θvis
. Because these
quantities are resolved programmatically rather than baked into a static USD scene, different sub-envs can
instantiate different mixtures of families and parameters while remaining part of the same batched episode.
This is what makes pose randomization, scale randomization, visual randomization, physics randomization,
and multi-physics coupling compatible rather than separate features.

, and solver-specific parameters θsolver

e , physical parameters θphys

e

e

The engine therefore treats heterogeneity as a first-class property of the world batch. The same user-facing
simulation family can appear with different assets or physical parameters across sub-envs, and different
families can be combined in different proportions across the batch. For example, Rigid objects may differ in
mass, friction, restitution, collision shape, and scale; Fluid instances may differ in particle spacing, viscosity,
cohesion, and container geometry; Garment instances may differ in cloth resolution, contact offset, stiffness,
and material appearance; and Avatar instances may differ in character asset, root pose, and animation state.
The sampling, seeding, reset, and replay mechanisms that make this heterogeneity deterministic are part of
the manager runtime in Section 5; the engine-level point is that these parameters are exposed as configurable
simulation axes rather than hidden inside fixed assets.

Complete MagicSim worlds also include carriers, embodiments, observability, and task structure. Terrains and
rooms provide the world carrier: they define floors, room-scale geometry, traversable regions, and navigation-
relevant context, but they are not counted as user-facing simulation families in F. Terrain lifecycle semantics,
including when terrain geometry is locked and what is re-sampled on reset, belong to the deterministic manager
runtime in Section 5. Room-level world priors such as occupancy maps, free-point sampling, room bounding
boxes, and boundaries belong to the asset and annotation system in Section 8. Navigation consumption by
navmesh queries, runtime occupancy maps, and DWB-style local planning belongs to the control and planning
stack in Section 6.

Similarly, robots are not ordinary scene objects in this taxonomy. They are controlled embodiments that act on
the world through joint, base, end-effector, navigation, and whole-body controllers. Avatars, by contrast, are
animation-driven human entities that provide human-scene context, interaction targets, and social grounding.
Sensors and annotators observe each heterogeneous sub-env through camera, depth, segmentation, tactile,
occupancy, navmesh, language, and native trajectory annotations. Thus, MagicSim worlds are not static asset

15

arrangements: they are heterogeneous, parameterized, multi-physics sub-environments that can be acted on,
coupled, observed, annotated, and replayed by the runtime described next.

For example, a long-horizon household episode can combine a navigable room, a humanoid embodiment,
rigid containers, a fluid pour, a tray, and an animated human recipient. The room supplies the carrier, the
humanoid supplies embodied action, the rigid and fluid families supply coupled physical content, the avatar
supplies human context, and the sensor stack records the episode as a coherent trajectory. This is the role of
the simulation engine: it turns heterogeneous, parameterized families into co-executable physical content that
later chapters can control, annotate, benchmark, and collect.

5 Deterministic Manager Runtime

Section 4 described what MagicSim can simulate: heterogeneous objects, effects, and avatars can co-exist in
one world. This section describes how those worlds are made reproducible while many episodes share one
continuously stepping simulator. The key constraint is that the batched simulator is not globally stopped or
rebuilt when a single environment resets. Each sub-environment therefore needs local reset, local randomization,
local layout, and local lifecycle decisions, even though all environments share one stage and one simulator
clock.

The central claim is that determinism is a runtime contract, not a property of any single solver. MagicSim
achieves it structurally: it assigns state to managers, addresses operations by env_ids, fixes the order in
which runtime components are invoked, isolates random draws into manager-specific streams, and maps
backend import/delete limitations into a small number of lifecycle modes. The result is a runtime in which one
environment can reset without perturbing another, one randomizer can change without reordering another,
and many object families can share the same reset scheduler (Figure 6).

Figure 6 Deterministic manager runtime. A global seed fans out into disjoint per-environment, per-manager streams;
reset_idx drives a fixed manager reset order; reset_to restores manager-owned snapshots; and hard resets dispatch
each object through its P1/P2/P3 lifecycle mode.

5.1 SimulationContext Host and Launch

The shared stage is hosted by IsaacRLEnv. It owns the SimulationContext, the batched scene, and the
physics and rendering settings under which the engine runs. This host is the execution context for the solvers

16

Episode config scene / layout / terrain robot / camera / planner cfg.seed, env_idsPer-env seed table one seed per env_id disjoint manager streamsShared simulator one Isaac stage one physics clock local reset per envSeed fan-out stream seed(seed, name) for layout / scene / terrain / avatar / camera / robotSelected reset_idx(env_ids): deterministic wrapper order, local to env_idsLayoutManager plan pose / ori / scale write LayoutEntrySceneManager create / reset objects read layoutTerrain / Avatar terrain soft DR avatar if enabledCapture / Camera new capture round camera pose DRRobotManager root pose / joints action state resetPlannerManager IK / MotionGen / Nav reset planner stateOrdinary hard resetfresh asset / DR where allowedScene replayrecorded asset / DR / statelifecycle policyP2 zombie-safeneutralize old primcreate new primP3 persistentkeep existing primreset / restore in placeP1 volatiledelete old primcreate asset / stateget_statecapture each manager’s replayable stateRestore selected envscall each manager’s matching replay APILayoutone-shot ReplayPolicyRobotroot pose + jointsCamerarecorded posesSceneobjects + artifactssame snapshot + same selected env_idsrestores supported manager stateManager snapshot and reset_to replayScene object lifecycle dispatchof Section 4; it is not a second physics layer. The engine defines the capability surface, while the runtime host
provides one stage, one clock, and one synchronized set of simulator services.

Before any manager creates stage content, MagicSim launches Isaac Sim from a launch file. The launch
file acts as a runtime manifest: it selects the application mode, enables the required Isaac Sim extensions,
and fixes process-level settings that must exist before USD prims, physics views, cameras, or annotators are
constructed. This step is global and happens once. World construction, placement, reset, and randomization
are local and happen repeatedly through managers.

Version-sensitive GPU dependencies are also fixed during launch. We keep that detail at the runtime boundary
only to preserve ordering: process-wide dependencies must be pinned before managers and planners import
CUDA-facing modules.

5.2 Managers as State Owners

Runtime state is partitioned across managers. Each manager owns one slice of the batched stage and
communicates with other managers through explicit contracts rather than by mutating their internal state.
The purpose is not just modularity; it is determinism. If every subsystem owns its state and exposes the same
lifecycle, the environment wrapper can drive the world through one ordered sequence instead of accumulating
object-, sensor-, or robot-specific reset paths.

All managers follow the same lifecycle shape: construct from configuration and per-environment seeds, initialize
against the SimulationContext, bind runtime views once the stage is live, reset either the full batch or selected
env_ids, and snapshot or restore their own state. State restoration through reset_to is therefore part of the
lifecycle contract: it restores manager-owned initial conditions, not a separate log replay.

The user-facing object families of Section 4 are realized under this manager contract rather than by a one-to-one
registry. Most physical objects and effects are owned by SceneManager; specialized instancing, field, and
grain backends cover families such as RigidInstancer, Magnet, and Rice; and animated humans are owned
by AvatarManager, a sibling of SceneManager. Robot, planner, navigation, camera, capture, and tactile
managers are sequenced by the same runtime, but their control and observation semantics belong to Sections 6
and 8.

The synchronized Env-Core wrapper chain simply assembles these manager groups: BaseEnv launches
the host, SyncBaseEnv adds world-core managers, SyncCollectEnv adds the capture layer, and the final
branch exposes either SyncRobotEnv or SyncCameraEnv. Task wrappers, asynchronous collection wrappers,
language annotation drivers, and record managers sit above this Env-Core boundary and are described later
with the task, annotation, and collection stack.

5.3 LayoutManager as the Placement Backbone

A randomized world is not executable until objects have places to go. MagicSim therefore separates object
identity from object placement. SceneManager owns what an entity is:
its logical identity, asset choice,
behavior, physics state, and lifecycle. LayoutManager owns where that entity goes. Reset begins with layout
because placement must be decided before scene objects can be created, reset, or rebound to physical prims.

The layout interface is shared across three placement backbones.

Declarative layout. The YAML backbone is the controlled path. Users specify placement ranges, room
regions, support surfaces, relations, sampling ratios, and replayable randomization policies in configuration.
This mode is useful when an experiment needs an exact distribution over object poses, distractors, target
regions, or room-conditioned placements.

VLM-backed layout. The VLM backbone lets language or vision-language systems propose semantically
grounded arrangements, such as placing a cup near a table setting or populating a room from a natural-language
description. This follows recent scene-generation systems such as SceneSmith, which builds simulation-ready
indoor scenes from language prompts through agentic VLM interactions [48]. In MagicSim, the VLM is not

17

allowed to bypass the runtime contract: it proposes a layout plan, while LayoutManager still owns validation,
seeding, replay, and reset ordering.

Heuristic and constraint-based layout. The heuristic backbone uses geometric and task priors: room bounds,
object support surfaces, collision checks, free-space samples, spatial relations, and affordance constraints. This
is closest in spirit to systems such as Holodeck, which uses language to generate embodied 3D environments
and optimizes object placement under spatial constraints [49]. In MagicSim, these heuristics are another route
to the same output: a per-environment pose plan over logical objects.

Across all three backbones, the invariant is the same. A logical object identity, such as (env_id, cat_name,
inst_id), is stable across episodes, while its physical prim_path is only a runtime handle. Tasks, policies,
annotations, and replay state refer to the logical object. The lifecycle scheduler may later reallocate prims,
but layout remains expressed over logical identities and planned poses.

Figure 7 visualizes representative outputs of the shared layout interface at both object and room scales.
Although the declarative, VLM-backed, and heuristic or constraint-based backbones differ in how they propose
an arrangement, they produce the same runtime abstraction: a per-environment pose plan over stable logical
object identities.

Figure 7 Representative randomized layouts at object and room scales in MagicSim. The upper row shows object-level
layouts in which support surfaces, object selections, positions, orientations, scales, and distractor arrangements can
vary across environments. The lower row shows room-level layouts with different spatial arrangements of tables, chairs,
furniture, and scene assets. Each layout is represented as a per-environment pose plan over logical object identities
and can be generated through declarative configuration, VLM-backed proposals, or geometric and task-conditioned
constraints. Layout sampling remains integrated with MagicSim’s seeded reset and replay contract, allowing a sampled
arrangement to be reconstructed without coupling it to unrelated scene, robot, camera, or physics randomization.

Figure 8 summarizes the world-carrier and room-scale environment configurations currently exposed by
MagicSim. These configurations provide the geometric and navigational substrate on which heterogeneous
simulation entities, robots, sensors, and tasks are instantiated.

Figure 8 World carriers and room-scale environment backbones in MagicSim. Representative configurations include a flat
plane, textured ground, procedurally generated terrain, scene-room layouts, and navigation-ready rooms. These carriers
define floor geometry, traversable regions, and room-scale context while remaining integrated with the deterministic
construction, reset, randomization, and replay runtime. Terrains and rooms serve as world carriers and are therefore
not counted among the user-facing simulation families.

18

PlaneGroundGeneratorScene RoomNav Room5.4 Domain Randomization as Controlled Variation

Domain randomization matters because MagicSim does not only randomize where objects are placed; it
randomizes how the world looks and how it behaves. Appearance randomization covers object materials,
colors, textures, texture scales, terrain and floor appearance, lighting, background context, and visual effects.
These changes alter the observation stream while preserving the logical task state.

Physics randomization covers parameters exposed by the engine families. Rigid and articulated objects
may vary mass or density, friction, restitution, collision scale, and contact offsets. Deformable bodies, cloth,
garments, fluids, sand, rice, ropes, and inflatables may vary family-specific parameters such as stiffness,
damping, particle spacing, viscosity, cohesion, pressure, solver iterations, or chain response. A ratio field is
not itself a physical coefficient; it is a policy gate that decides whether a perturbation, distractor, material
change, or physics variation is active for a given environment or reset.

Making this deterministic is difficult because the simulator does not stop. Different environments reset at
different semantic times, and random draws occur inside layout, scene objects, terrain, robots, and cameras.
MagicSim prevents these draws from coupling by separating value parsing from random-stream ownership.
Values use one shared shape rule: constants stay fixed, ranges are sampled uniformly, and vector ranges are
sampled component-wise. The random source is then isolated by environment and by manager.

The unit of isolation is the manager stream, not the episode. A global seed expands into per-environment
seeds, and each manager derives its own stream, such as layout, scene, terrain, robot, or camera. Adding
a new texture randomizer cannot change object physics; adding a new mass draw cannot change lighting;
resetting environment 3 does not advance environment 4. Stream isolation is therefore stronger than logging:
logging records what happened, while stream isolation prevents unrelated random choices from becoming
coupled in the first place.

Figure 9 summarizes the principal randomization axes exposed by MagicSim. Together, these axes vary the
geometry, visual observations, physical dynamics, sensing conditions, and embodiment state of an episode
while preserving logical object identities, task definitions, and reproducible manager-local random streams.

5.5 Object Lifecycle Modes: P1 / P2 / P3

The non-stopping simulator has its sharpest consequence during hard reset. A reset enters the runtime through
a fixed call order—layout plans poses, scene binds objects to those poses, terrain refreshes only mutable
appearance, and robot, camera, and capture managers follow—but the hard-reset behavior of each object is
determined by its lifecycle mode. Because environments reset at different times on a shared stage that keeps
stepping, MagicSim cannot tear down and rebuild the entire world between episodes.

Once SimulationContext.reset() has locked the USD stage, whether an object can still be dynamically
imported or dynamically deleted is a backend capability, not a high-level runtime preference. A uniform
“delete everything and rebuild” path is therefore unavailable. MagicSim collapses each object’s two backend
capabilities—dynamic import and dynamic delete—into three lifecycle modes, and the scheduler dispatches
on the mode rather than on the object type.

In P1, both import and delete are available. A hard reset can destroy the current prim, create a replacement,
and optionally choose a different asset. In P2, import is available but delete is not. The old prim cannot be
removed, so the runtime retires it: gravity and collision are disabled, the prim is hidden and moved aside, and
the replacement is created at a fresh prim_path. This is why logical identity must be separate from physical
prim path. In P3, neither import nor delete is available after the stage lock. The object must be built once
before the lock and can only be reset in place afterward.

This mode collapse is the runtime simplification. Heterogeneous simulation families do not require one reset
algorithm per family; each object declares its backend lifecycle capabilities, and the scheduler maps them to
P1, P2, or P3. State restoration inherits the same limits: reset_to can restore a P1 or P2 snapshot with a
different selected asset because the prim can be rebuilt or reallocated, whereas a P3 object can only restore
pose and randomized state onto the existing asset. Terrain is not a fourth mode: it is a locked carrier whose
reset-time changes are soft randomization of mutable appearance, so it honors the deterministic contract
without entering the hard-reset scheduler.

19

Figure 9 Representative domain-randomization axes supported by MagicSim. From left to right, MagicSim randomizes
spatial layout through object position, orientation, and scale; environment conditions through lighting, background,
and ground appearance; camera sensing through viewpoint and intrinsic parameters; visual appearance through asset
selection, color, texture, and MDL material; physical properties through mass, contact, material, and solver parameters;
and robot state through initial joint configurations and execution noise. Each column contrasts a default configuration
with representative independent or combined perturbations. Random draws are isolated by environment and manager,
allowing any axis to be varied without changing unrelated random choices.

Step ordering is intentionally simpler: actions are applied, the batched simulator advances one physics tick,
and observation follows. Physics coupling, control, and sensing are specified in their own sections; the runtime
only fixes the order in which they are invoked.

20

6 Embodiment Control and Motion Planning

A MagicSim sub-environment can host several robots of different morphologies at once—a humanoid and a
wheeled manipulator sharing one scene, each commanded independently—because the platform is built for
multi-agent embodied settings. That requirement shapes everything in this section: a control stack written
per robot class would not survive such mixtures. Instead, every robot—seven categories, roughly thirty-three
registered embodiments—is reduced at configuration time to a uniform channel interface, base, arm, eef,
and driven through one three-level stack: closed-loop control at the bottom, motion planning in the middle,
target supply at the top. Every layer above addresses channels rather than robots, and the combined action
space simply concatenates the channels of whatever robots an environment declares, so a heterogeneous team
is configured no differently from a single arm. The stack’s planning level is powered by a forked cuRobo
engine [38], rebuilt for multi-tool-frame, per-environment-heterogeneous, asynchronous batched solving. One
stack for every embodiment; one engine behind the stack.

The running example previews both halves. Commanded to walk to the table and grasp the tray with both
hands, the G1 splits the command into a base path—a route from the navigation mesh, a local planner
converting it into velocity commands, a learned whole-body controller realizing them—and an arm path—a
grasp skill submitting candidate end-effector poses to an asynchronous planning service while every parallel
environment keeps stepping, the trajectory landing a few frames later. Part A (§6.1–§6.5) walks the stack
bottom-up after a framing map; Part B (§6.6–§6.8) opens the engine: what the forked solver can solve, how it
runs without blocking, what changed at source level. Part C closes with the two movers that are not robots.
This section owns the mechanisms; skills and the collection loop consume them (Sections 10 and 11).

6.1 RobotManager and the Embodiment Taxonomy

RobotManager spawns every robot, builds its articulation and per-robot action and observation managers,
assembles one combined Gym space across robots, and implements the deterministic-runtime contracts of
Section 5 (seeding, noise, snapshot and replay). Seven embodiment categories are supported—single-arm
manipulators, dual-arm manipulators, dexterous-hand manipulators, mobile bases, mobile manipulators,
humanoids, and quadrupeds—covering roughly thirty-three registered robots, from tabletop arms such as the
Franka and xArm to the Unitree G1 and Go2; new embodiments enter through an import pipeline without
touching anything above. Figure 10 visualizes a representative subset of the registered embodiments and the
morphological breadth handled by RobotManager.

What makes one stack serve all of them is the channel interface. At configuration time every robot reduces to
at most three action channels—base, arm, eef—each filled by an action term from a shared library (§6.3) or
absent where it does not apply: a tabletop manipulator has no base, a wheeled base no arm, and the G1 fills
base with a learned whole-body controller rather than a wheel model. Planners, skills, and the three drivers
of Section 3.4 all address channels, so adapting to a new embodiment means declaring which term fills each
channel—no layer above changes.

6.2 The Three-Level Control Stack

Figure 11 is the map of Part A. Horizontally, three levels: low-level closed-loop controllers write the simulator
every physics tick; mid-level planners turn goals into commands (a local navigation planner for base, the
cuRobo services for arm); the high level supplies the goals themselves. Vertically, the channel decomposition
of §6.1; everything reconverges in the IsaacLab action manager each tick. Three properties anchor the map.
The high level is symmetric in role but not in location: navigation belongs to this section, while arm-side
targets come from the skill layer (Section 10). Collision awareness is a level property: the mid-level services
plan against per-environment scene collision, the low-level cuRobo term checks only self-collision and joint
limits. And cuRobo appears three times—low-level action term, mid-level services, and the shared engine of
Part B behind both. The figure reads left to right, as a command flows; the prose proceeds right to left.

21

Figure 10 Representative robot embodiments supported by MagicSim. The registered embodiment collection spans single-
arm manipulators, dual-arm manipulators, dexterous-hand systems, mobile bases, mobile manipulators, humanoids,
and quadrupeds. The figure shows a representative subset of the approximately thirty-three registered robots. Despite
their heterogeneous morphologies and controllers, all embodiments are exposed to higher-level planners, skills, and
task drivers through the shared base-arm-end-effector channel interface.

6.3 Low Level: Closed-Loop Controllers

Low-level controllers share one contract—consume a command, write the simulator every tick—and differ in
where their control knowledge comes from: direct mapping, vehicle modeling, optimization, or reinforcement
learning. Joint and gripper terms map commands directly into joint limits and span binary, continuous,
and multi-finger end effectors. Drive-model terms encode vehicle kinematics—differential drive, Ackermann
steering, and holonomic bases—turning a body-frame velocity command into wheel actuation; the quadruped
term shares the same (v, ω) interface, but its backend is a learned gait, so the stack above cannot tell wheels
from legs. Optimization enters through three inverse-kinematics architectures: Jacobian differential IK, fast
and collision-blind, whose dual-arm variant stacks two independent chains; cuRobo batched IK, which solves
all environments in one call of the forked engine, tracks every declared tool frame so a single term drives
single-arm, dual-arm, and humanoid upper bodies alike, and is the only term with built-in self-collision and
joint-limit handling (scene-aware collision lives at the service level); and Pink IK [50], a QP over weighted
frame and posture tasks and the route for coupled dual-arm and upper-body solving, whose humanoid subclass
fills a shared arm-reference buffer without writing the simulator. A fourth cuRobo mode, trajectory generation,
is not a per-tick term and belongs to the mid level. Reinforcement learning closes the family: the quadruped’s
(go2) locomotion policy is trained with IsaacLab’s built-in RL workflows [43], and the G1’s whole-body
controllers are selected through a policy factory—homie_v2 following HOMIE [51]; sonic_v1, which realizes
the upper-body reference the Pink term proposes; and an Agile lower-body variant [52]. The family thus ends
where its storyline was headed: optimization proposing, a learned policy realizing, inside one robot.

6.4 Mid Level: Motion Planning

PlannerManager spans two problem families behind one combined action space—base navigation and
manipulation—composing planners the way RobotManager composes action terms, from the robot’s planner:
block. The base side carries the mechanisms. A Dynamic Window planner [53] samples velocity candidates
within limits, rolls each forward, scores the rollouts against goal, path, and an obstacle cost read from

22

Figure 11 The three-level control stack. Commands flow left to right per channel and converge in the action manager;
cuRobo appears as low-level action term, as mid-level services, and as the shared engine behind both (Part B).

the occupancy map, and emits the best command, with a turn-only proportional term near the goal; four
variants—holonomic, differential, humanoid, quadruped—differ only in output width and padding, matching
the base-channel consumers of §6.3. A P-controller handles direct navigate-to-pose and in-place turning, and
the Nav router places both behind one channel, a trailing mode flag selecting the controller or forwarding
waypoints to the dynamic-window planner. On the arm side only the interface appears here: four services
per robot—IKServer, DualIKServer, MotionGenServer, DualMotionGenServer—accept submissions and
resolve futures to (success, goalset_index, env_ids) or (actions, success, env_ids). The engine behind
them is Part B.

6.5 High Level: Navigation and End-Effector Targets

The high level supplies goals and introduces no mechanism. On the base path, a baked navigation mesh
answers global-path queries and the route is handed to the Nav router, while the occupancy map supplies the
obstacle model; both are consumed here, their construction belonging to the engine, runtime, and annotation
chapters (Sections 4, 5, 8). On the arm path, skills such as Reach, Grasp, MoveL, and ServoL emit target
end-effector poses or goalsets, a hand selector designating which arm of a bimanual robot moves; their state
machines are the subject of Section 10. Part A thus closes as it opened: global path → router → velocity
command → drive model or whole-body controller; end-effector target → asynchronous solve → trajectory →
IK term. Every embodiment of §6.1 instantiates a subset, and nothing above the channels knows which.

6.6 cuRobo Solver Capabilities

The mid level holds only because the arm-side planner does what stock cuRobo cannot. Stock cuRobo
solves for one end effector, one goal, a homogeneous batch; MagicSim’s worlds are heterogeneous—many
morphologies, candidate grasps rather than single poses, batches in which every environment wants something
different—and its tasks demand precision, from bimanual grasps that must be jointly reachable to trajectories
that must not wander. The fork’s additions divide along exactly these two axes, turning cuRobo from a
single-end-effector planning library into a multi-embodiment, multi-tool-frame, asynchronous planning engine
for parallel simulation. How the additions run without blocking is §6.7; where they live in source is §6.8.

On the heterogeneity axis, the pose objective generalizes from one end effector to an ordered set of named tool
frames, so a single solver serves every morphology of §6.1; goals extend to per-frame goalsets of candidate poses;
criteria become assignable per batch slot, a NaN-marked frame simply dropping out, so one batched solve
moves different arms in different environments; mobile manipulators get both problem formulations—base
locked, or base free through virtual planar joints—as the “dual” services of §6.4; and a retargeter on the same

23

nav mesh global pathoccupancy goalBASEARMEEFHigh goalsMid plannersLow controllersComposePhysics tickNav router DWB local planner P-controllerwheeled drive / humanoid WBC / quadruped RL gaitRobotManager.step composes base / arm / eef terms into one batched Gym actionskill targets Reach / Grasp MoveL / ServoL EEF pose or goalsetcuRobo services IK / MotionGen async futuresIsaacLab ActionManager IsaacRLEnv.step writes simulator targets every physics tickIK action terms diff IK / cuRobo IK / Pink IKgripper / hand intent open, close finger targetno mid-level planner command passes to selected termjoint / gripper terms binary, continuous multi-fingerobjective carries motion across embodiments.

A common robot-side collision representation is required before the same planning engine can serve heteroge-
neous embodiments. Figure 12 shows representative link-attached collision-sphere models used by the cuRobo
planning stack. These compact geometric approximations make collision-distance queries suitable for batched
GPU execution while preserving the articulated structure and relevant occupied volume of each robot.

Figure 12 Representative cuRobo collision-sphere models across robot embodiments. The upper row shows the rendered
robot geometries, while the lower row visualizes the corresponding link-attached collision spheres used by MagicSim’s
cuRobo configuration. The examples span heterogeneous morphologies, including stationary manipulators, mobile
manipulators, humanoid or whole-body systems, and other articulated embodiments. The overlapping spheres provide
a compact approximation of the robot’s occupied volume for GPU-parallel collision-distance queries during inverse
kinematics and motion generation. At the low-level action-term interface, cuRobo uses the robot model for self-collision
and joint-limit handling; at the mid-level service interface, the same representation is additionally evaluated against
per-environment scene obstacles for collision-aware trajectory generation.

On the precision axis, paired selection—the default for IK—makes all frames share one jointly evaluated
candidate, so a bimanual grasp is reachable as a pair rather than per arm in isolation; and seed anchoring
clusters every seed around the live configuration, eliminating the visible detours that workspace-scattered
seeds produce, enabled by default exactly where detours hurt most.

6.7 Async Microbatch Solve-Farm

These capabilities run through four in-process services sharing one runtime (Figure 13). The design takes its
cue from how SGLang [54] serves rollout generation in LLM reinforcement learning: planning, like generation,
becomes an inference service—submitted to asynchronously, microbatched across callers, and free to live on its
own GPUs—rather than a library call inside the stepping loop. The runtime answers two independent questions.
Time: a solve takes many milliseconds, the loop steps all environments each tick, and one synchronous solve
would stall the batch. Shape: requests arrive ragged—different environments, frames, and goalset sizes—while
the GPU wants one fixed-shape problem. This subsection is the sole owner of both mechanisms; the collection
loop consumes them only as submit, keep stepping, harvest (Section 11.2).

On the time side, callers never block: a submission returns a future at once, the robot holds pose or rides
out its previous trajectory, and the result is consumed when polling finds it ready. Each service is a pool
of solver workers, each bound to a GPU of its own—the solvers need not share a card with the simulator,
and multiple instances spread across multiple GPUs—and a worker holds its microbatch window briefly open
so that requests fired by other environments on the same tick fuse into one batched solve. One detail is
load-bearing for correctness rather than throughput: every worker warms its solver up on its own thread
before serving, because CUDA contexts are per-thread and a late first touch would invalidate graphs the main
thread had already captured—including the action-term IK graph of §6.3.

24

Figure 13 One request’s path through the solve-farm: the asynchrony layer decides when solving happens without
blocking the loop; the batch-assembly layer decides what shape the GPU sees.

On the shape side, a normalization pipeline turns the ragged harvest into the fixed-shape solve: requests are
deduplicated by environment, disabled frames are filled in with their current forward kinematics so the solver
never observes a NaN, the batch is grouped by goalset width, chunked, and padded with trivially solvable
problems, and the result fans back out, each future receiving exactly its slice. A single invariant keeps the
bookkeeping safe: scene loading is the only place an environment id crosses into a solver slot; everything
thereafter is slot-indexed.

6.8 Fork Source and Isaac Sim Integration

None of this exists upstream: the capabilities are source-level additions to a vendored fork, recorded in Table 7.
Beyond these features, the fork is kept viable as an engineering artifact. It tracks cuRobo’s v2 API and
installs as an editable workspace member; the robot-configuration schema gains tool frames, FK-only links,
and virtual base joints;

Capability (§6.6)

Implementation site in the fork

Multi-frame tool poses
Per-env criteria & disable
Paired selection
Per-frame goalsets
Seed IK & anchoring
Cross-embodiment retargeting
Robot-config extensions

tool-pose types, cost terms, Warp kernels
per-slot criterion hooks on the IK solver
paired-mode flag; paired per-env kernel
(B, L, G, 7) goal/cost path; kernels per width
seed-solver module; motion-planner patch
retargeter module on the same objective
tool frames, FK-only links, base joints, exclusions

Table 7 Capability-to-source map for the cuRobo fork; semantics live in §6.6.

6.9 Flying-Camera Planning

Two movers in MagicSim are not robots. The first is the flying camera: planning without physics, used by the
camera-only environment to smooth capture motion between target poses through an eased linear model and
a gimbal model that orbits or tracks a subject. Beyond smooth capture, this is the natural instrument for two
data regimes: free-viewpoint exploration footage for spatial agents that must reason about a scene from limited
views [55], and controlled multi-view recordings of physical events for physics-consistent world modeling [56].
The planner decides the pose sequence, the camera manager writes it, the capture manager records through
it; the planners remain here because they implement the same step interface that PlannerManager composes
(§6.4). Their use in producing camera-trajectory data is described in Section 11.

25

caller in the stepping loop (skill / GlobalPlanner)request queue → Future (returned at once)microbatch window held briefly open: fuse same-tick requestsfour services, each a pool of solver workers: IKServer · DualIKServer MotionGenServer · DualMotionGenServereach workeron itsown GPU;per-threadwarmup beforeservingdedup by env_idsubmitpollfill disabled frames with current FK (never a NaN)group by goalset widthchunkpad with trivially-solvable (retract)forked solverwhile waiting: robot holds pose or rides its previous trajectoryfused microbatchfan-out: split the batched result — each future gets its own sliceinvariant: an env_id crosses into a solver slot only at scene loading; everything thereafter is slot-indexedAsynchrony layer — decides when (off-loop; the loop never blocks)Batch-assembly layer — decides what shape the GPU seesFigure 14 summarizes the camera-motion modes implemented through the common planner interface.

Figure 14 Flying-camera planning modes in MagicSim. Camera-only embodiments support eased linear GoTo motion,
task-following trajectories, long-horizon waypoint sequences, gimbal-based target tracking or orbiting, and coordinated
multi-camera GoTo. The planner generates the camera-pose sequence, CameraManager applies the poses during
simulation, and CaptureManager records the resulting visual trajectory. These modes support free-viewpoint scene
exploration and controlled multi-view recording of physical events.

6.10 Avatar Animation and Control

The second is the animated human avatar: a world entity of the simulation engine (Section 4), driven by an
animation graph rather than physics, to which none of Part A applies. Both control routes exist. Avatars play
externally supplied motion—skeleton-animation clips behind a registry of actions (idle, sit, talk, go-to, custom
commands), driven through a per-avatar action queue—and they are directly controllable through IK : four
modes span full-clip animation, an IK-over-locomotion control mode whose upper–lower split at the spine lets
the avatar reach, look, and bend while a motion-matched lower body keeps walking, a path-walking mode,
and a pose-provider mode that streams arbitrary joint targets for retargeted motion. The stack was validated
end to end by a teleoperated whole-body animation demonstration. The contrast with §6.3 is the point of the
placement: the G1’s whole-body controllers are physics-level robot control inside the action manager loop,
while avatars are animation-graph puppetry—two animated-agent stacks kept apart precisely so they are
never confused.

Figure 15 summarizes the principal control surfaces exposed by MagicSim for animated avatars. These
interfaces cover both motion-driven and inverse-kinematics-driven control, allowing avatars to be used as
environment-side actors in HRI scenes, scenario scripting, teleoperation demonstrations, and avatar-conditioned
task generation.

Figure 15 Avatar control and IK modes in MagicSim. The figure summarizes representative control modes supported for
animated human avatars. Motion Input plays externally supplied motion or action-queue commands through the
animation graph. Torso Control supports upper-body steering over locomotion, allowing the avatar to bend or reorient
the torso while the lower body continues walking. Gaze Tracking lets the avatar look toward a designated target.
Arm IK controls upper-limb reaching through inverse kinematics. Leg IK adjusts lower-limb pose targets for stance
adaptation and motion retargeting. Together, these modes provide a controllable avatar stack that is distinct from
physics-level robot control: the avatar is an environment-side animated actor driven by an animation graph and IK
interfaces, rather than by robot action-space commands.

26

7 Sensor Simulation and Multimodal Observation

MagicSim treats sensing as part of the runtime. A first-class sensor is not just a USD prim attached to a robot;
it is a manager-owned stream that is synchronized with reset, batched across environments, and exposed to
controllers, planners, tasks, or the data engine through the same runtime contract as the rest of the simulator.

This gives the chapter a simple organization. MagicSim inherits broad sensor availability from the Isaac/USD
stage, but it deeply integrates the sensing families that the system actually uses: visual streams, LiDAR/IMU
embodiment sensing, tactile contact, and the geometric signals that planners and annotators consume. Radar
and other autonomous-driving-style or vendor-specific sensors remain stage-compatible, but they are not the
focus of this manipulation-first report.

7.1 Sensor Stack Overview

Table 8 summarizes the stack by sensor family. The table does not ask whether a device can be mounted on
the stage; it asks what MagicSim owns as a runtime stream.

Table 8 MagicSim sensor families. Manager-owned channels participate in the runtime contract; inherited channels
remain attachable through the underlying USD/Isaac stage but are not the focus of this report.

Family

Manager-owned channels

Role in MagicSim

Visual sensing

Camera / tiled capture

Range and inertial sensing RTX LiDAR / IMU

Contact and tactile sens-
ing

Taxel contact, probe tactile, vi-
suotactile

Geometric support sensing Frame tracking, runtime occu-

Inherited stage sensors

pancy, navmesh query
RTX Radar, effort, proximity,
joint-force, PhysX range/light-
beam, ultrasonic, vendor assets

Batched RGB, depth, normal, and related image
streams for data collection, policy observation, and
annotation.
Manager-owned embodiment sensors used by the G1
locomotion stack for range and body-state sensing.
Contact-rich manipulation signals on robot links: force,
pressure, deformation, privileged contact fields, and
tactile images.
Geometry used by IK, navigation, annotation, and
language grounding.
Attachable through the USD/Isaac stage. Radar is
intentionally out of focus because MagicSim does not
claim an autonomous-driving perception stack.

One boundary is important. Joint positions, velocities, and other articulation observations belong to the
robot and task observation space (Section 9); MagicSim does not treat them as a separate sensor module.
Kinematic frame sensing, however, is part of the sensor stack and is covered in Section 7.5.

7.2 Visual, Range, and Inertial Sensing

The visual path is MagicSim’s main imaging substrate. A camera viewpoint is world state: it can be fixed
in the scene, mounted on a moving embodiment, randomized per environment from the seeded streams of
Section 5.4, restored during replay, or flown along planner-generated trajectories for camera-only collection
(Section 6.9). Camera placement therefore participates in the same reproducibility story as objects, robots,
and layouts.

MagicSim separates pose ownership from render ownership. The camera manager owns camera prims and their
poses. The capture manager turns those prims into image streams. This split lets mounting, randomization, and
replay remain independent from render-product construction. It also makes tiled capture a batching strategy
rather than a different sensor API: the same camera configuration can be rendered environment-by-environment
or as a tiled batch while exposing the same per-environment outputs downstream.

The image streams produced here are the substrate for later supervision, not the annotation system itself.
Raw RGB, depth, normals, and motion-like channels live in this chapter; object boxes, end-effector trails,
affordance labels, and saved annotation schemas live in Section 8. This keeps the sensor chapter focused on
observation streams and leaves semantic packaging to the asset and annotation chapter.

27

The same runtime also owns range and inertial sensing for locomotion. On the G1 embodiment, RTX LiDAR
and IMU are manager-owned sensor streams used by the locomotion stack. Their role is different from the
manipulation camera/tactile data engine: LiDAR provides ray-traced range sensing for navigation scenes, and
the IMU provides body-state information for humanoid locomotion. Both belong to MagicSim’s integrated
sensor stack; Radar remains inherited and out of focus because the report does not claim an automotive
Radar perception pipeline.

Where possible, the hot path is GPU-enabled. Tiled capture uses batched GPU rendering buffers, RTX
cameras and LiDAR share the ray-tracing backbone, and the downstream tactile and occupancy streams
below keep their high-rate data in device-resident tensors.

7.3 Contact Backends and Surface Queries

Touch begins as geometry. Before a tactile image, force field, or pressure map exists, the runtime must answer
a taxel-level question: is this point on the sensor surface in contact, how deep is the contact, and along which
local direction should the signal be measured? MagicSim factors this into a reusable contact layer shared by
probe tactile and visuotactile sensors.

Every tactile surface is first sampled into taxels. Each taxel carries its own local frame: an undeformed point,
an outward normal, and tangent directions. The contact backend then fills the same interface regardless of
how contact is computed. MagicSim provides three backends:

Table 9 Contact backends. All backends expose the same taxel-level interface; the choice is about geometry correctness
and runtime constraints.

Backend

sdf_warp

sdf_physx

When to use it

Why

Portable flat or general contact

High-throughput CUDA SDF con-
tact

raycast

Curved tactile skins

Queries a Warp mesh signed-distance field. It needs no
pre-baked field and is the default general-purpose path.
Uses a pre-baked PhysX signed-distance representation.
It is the faster SDF path when the asset and device
support it.
Casts along each taxel’s own outward normal. This
is the geometry-correct path for curved sensors, where
SDF contact follows the object normal and can produce
wrong shear or deformation directions.

The key distinction is not speed alone; it is the contact direction. SDF queries are useful and efficient for flat
pads and many privileged contact signals, but they naturally reason from the object’s closest surface and its
normal. On a flat tactile pad this is often acceptable. On a curved fingertip it is not: the elastomer should
compress along the sensor taxel’s own normal, not along the object normal. Otherwise the simulator can
fabricate spurious tangential motion or shear on the curved skin. For this reason, MagicSim treats ray casting
as the canonical backend for curved tactile sensors.

This also explains why ray casting is not presented as a standalone sensor type. It is a geometric primitive used
by multiple systems: tactile contact uses it at the taxel level, occupancy and nav queries use geometric tests
for planning, and affordance annotation uses ray hits to connect planner intent to object geometry. The sensor
claim lives in the manager-owned streams that consume the primitive. Body-level rigid contact reporting
remains available through the underlying physics stack; MagicSim’s contribution here is the taxel-level contact
interface above it.

7.4 Tactile Transduction

Tactile hardware looks diverse: pressure pads, force probes, flat GelSight-style sensors, and curved visuotactile
fingertips. MagicSim organizes them into a small number of routes. A tactile sensor is configured on a robot
link, owned by the tactile manager, and emits per-environment batched outputs each step. The difference
between sensors is how contact geometry becomes a signal.

28

MagicSim supports two broad tactile families.

The first is the probe family. A probe does not need a camera: any pose-trackable link can become a taxelized
contact surface. The same contact query can be transduced into per-taxel force, scalar pressure, penetration
depth, or deformation maps. This route is important not only for deployable observations, but also for
privileged information. In simulation, probe tactile can expose dense contact fields that are difficult or
impossible to measure on hardware, making it useful for asymmetric actor-critic training, reward debugging,
contact-rich task analysis, and dataset annotation. Depending on the task, these signals can be logged as
privileged state, used to shape rewards, or distilled into policies that observe only camera or tactile images.

The second family is visuotactile. Here, contact geometry becomes an image. Flat GelSight-family sensors
reuse the camera substrate: an in-elastomer camera observes deformation, and a calibrated optical renderer
turns it into a tactile RGB image, following the GelSight/Taxim line of work [57, 58]. Curved visuotactile
sensors use the same manager and contact stack, but their geometry is sampled on a curved surface and
resolved through the taxel-frame contact path above. ShARPA is one example of this curved family, not the
definition of it: the general capability is curved tactile support through per-taxel frames, raycast contact, and
a renderer that maps the resulting deformation into a raw-like tactile image.

The routes can be summarized as follows:

Table 10 Tactile routes in MagicSim. The routes share the same manager runtime but differ in how contact becomes a
sensor signal.

Route

Probe tactile

Flat visuotactile

Curved visuotactile

Input

Output

Taxel contact from SDF or raycast
backends

Camera-observed elastomer defor-
mation
Curved-surface taxels and deforma-
tion maps, typically using raycast
contact

Force, pressure, penetration, or deformation
maps; often useful as privileged simulation in-
formation.
GelSight-style tactile RGB through a calibrated
optical renderer.
Raw-like tactile images or geometric tactile state
for curved fingers and pads.

This compositional view[7] is the tactile story of MagicSim. TacSL, Taxim, FlexiTac, Tacmap, and ShARPA-
style sensors are not separate silos; they are different routes through the same manager-owned tactile stack
[58–61]. The system therefore supports both simple privileged contact probes and image-like tactile sensors
without changing runtime abstractions.

Figure 16 Tactile sensing routes in MagicSim. MagicSim converts taxel-level contact geometry into both probe tactile fields
and visuotactile images through a shared manager-owned runtime stack. Flat tactile pads can use SDF-style contact
queries, while curved fingertips use raycast contact along each taxel’s local normal to preserve the correct deformation
direction. The resulting force, pressure, penetration, deformation, and tactile-image streams are synchronized with
batched simulation and can be consumed by policies, planners, task predicates, and annotation pipelines.

The boundary is deliberate. MagicSim does not place full finite-element elastomer simulation in the hot
path. For the data engine, the preferred tradeoff is fast geometric contact plus scalar, deformation, or optical
transduction. More expensive soft-body tactile simulation is left outside the main runtime path (Section 14).

29

GraspScenePressureMapForceFieldDeformMapRGBImageInsertScenePressureMapForceFieldDeformMapRGBImage7.5 Geometric and Kinematic Sensors for Planning and Annotation

Not every sensor is meant to be rendered as an image or saved as a policy observation. Some sensors exist so
that the runtime can act and annotate. MagicSim uses three manager-owned geometric channels as the eyes
of planners, annotators, and language grounding: frame tracking, runtime occupancy, and navmesh query.

Frame tracking reports the world pose of named frames, especially end effectors. The same stream feeds
inverse-kinematics targets (Section 6.4), end-effector trail annotations, and the spatial facts used by the
language and annotation systems (Section 8). This is kinematic sensing rather than proprioception: the robot
articulation still owns joint positions and velocities, but the sensor stack owns the world-frame facts that
other systems need.

Navigation uses two complementary geometric representations. The navmesh is the global representation.
During scene setup, MagicSim bakes the traversable parts of the room or open world into a navigation mesh
using the agent’s physical constraints, such as height, radius, step height, and slope limit. This converts dense
scene geometry into a sparse walkable manifold. The NavMeshManager then queries that manifold: it can
snap a target to the nearest valid point, test whether a point is navigable, and compute a shortest path over
the baked mesh. Those paths provide global waypoints for mobile bases and humanoid locomotion.

The occupancy scan is the local representation. At runtime, OccupancyManager scans a bounded region
around each environment into a three-valued grid: occupied, unoccupied, or unknown. This grid is not a
static room asset; it is a live observation of the current scene state. It is also the GPU-enabled hot path
for local obstacle reasoning: the multi-environment occupancy output is kept as device-resident tensors and
consumed by the DWB planner as the obstacle cost field. DWB then rolls out candidate velocity commands
and scores them against the global path, the goal, and the local occupancy cost (Section 6.5).

The distinction is therefore simple. The navmesh answers global questions: where can the robot go, and
what path should it roughly follow? The runtime occupancy grid answers local questions: what obstacles
are present around the robot now, and which short-horizon command is safe? A static room occupancy
map, when available, belongs to the asset and annotation system as a world prior (Section 8); the runtime
occupancy scan belongs to sensing. In short, the static map says what the world is expected to be, while the
runtime scan says what the robot sees now.

Taken together, these channels define MagicSim’s sensor story. The platform inherits breadth from USD/Isaac
stage compatibility, but spends its deep runtime integration where the system needs synchronized, batched,
and GPU-ready observations: camera and LiDAR streams, IMU state, taxel-level contact, tactile transduction,
runtime occupancy, and the geometry that lets planners and annotators understand manipulation scenes.

Figure 17 summarizes the range, inertial, and geometric support channels that MagicSim integrates as
manager-owned runtime streams. These channels complement the visual and tactile sensing paths described
earlier in this section: they provide embodiment state, global traversability, current local obstacles, and
world-frame geometry for locomotion, navigation, motion planning, annotation, and language grounding.

Figure 17 Range, inertial, and geometric support sensing in MagicSim. From left to right, RTX LiDAR provides ray-traced
range observations for navigation and locomotion; IMU sensing provides body-state information for humanoid control;
the global navigation mesh represents traversable scene geometry and supports waypoint and shortest-path queries;
runtime local occupancy records the current free, occupied, and unknown regions around an embodiment for short-
horizon obstacle avoidance; and frame tracking reports world-frame poses of named robot and object frames for inverse
kinematics, motion planning, trajectory annotation, and spatial grounding. These channels are synchronized with
the batched simulation lifecycle and are exposed to planners, controllers, tasks, and annotation systems through
manager-owned runtime interfaces.

30

IMUSme fhe4208098相42n122m1ad120043908m1mRTX LiDARIMUSensingGlobal NavMeshLocal OccupancyFrame Tracking8 Assets and Annotations: From Passive Geometry to Executable Supervision

A simulator full of USD files is not yet a robot-learning data engine. Raw geometry tells a robot what an
object looks like, but not which part is functional, which contact is useful, which motion is executable, or which
action was actually taken during a rollout. MagicSim therefore uses two coupled annotation systems. Offline,
the asset annotation stack, powered by AnnotateAnything [62], compiles sim-ready assets into language,
visual, and physics-validated interaction priors. Online, the runtime annotation stack records camera evidence,
skill and planner state, selected targets, and language traces during successful episodes. The offline compiler
says what can be done; the runtime record says what was done.

A cabinet illustrates the lifecycle. As a raw asset, it is only geometry and joints. As a MagicSim asset, it
receives stable logical identity, semantic labels, and a sim-ready physics package. The visual–language stage
proposes handles, drawer fronts, and reachable free space as interaction anchors. The physics stage validates
handle grasps, drawer-pull waypoints, and interaction-ready base poses as candidate banks. At runtime,
skills query the banks, planners select feasible candidates under randomized robot–object configurations, and
annotators record the object box, end-effector trail, ray-cast target point, commanded orientation, camera
evidence, and narration. Repeated failures flow back into the bank. The asset becomes a living supervision
interface.

System

Sub-type

Serves

Timing

Purpose

Visual–language (§8.2)
Asset annotation
Asset annotation
Physics (§8.3)
Runtime annotation — (§8.5–8.7)

physics annotation; segmentation; language
atomicskills; planners; navigation
frames; skill segments; trajectories

offline, per asset
offline; read at reset and skill time
during episodes; success-time flush

grounded priors
executable priors
learning supervision

Table 11 Two annotation systems, one supervision stack. Visual–language annotation proposes where to engage, physics
annotation validates how to engage, and runtime annotation records what happened.

The term affordance is used in three stages. It is first proposed by visual–language grounding, then validated
by physics and stored in candidate banks, and finally executed when a runtime annotator records the
planner-induced ray-cast target point and commanded grasp orientation for one segment. This chapter owns
the schemas and MagicSim integration of those products; AnnotateAnything owns the offline prompting,
grounding, optimization, validation, and augmentation pipelines that produce them. Non-camera sensors
such as tactile are produced by Section 7; when recorded, they appear as trajectory sidecars owned by the
collection layer rather than being re-explained here.

8.1 Sim-Ready Assets: Package, Identity, and Scene Binding

Before an asset can be annotated, it must be addressable. A sim-ready asset packages renderable geometry,
collision representation, a declared physics type, material parameters, canonical pose and scale, and the
identity and semantic hooks to which annotations attach. Normalization recenters, rescales, reorients, and
prepares physics metadata so later stages can assume a consistent object frame and metadata surface.

The annotated pool spans 17,005 assets from nine source families, grouped into four annotation families
(Table 12) [62]. This is an annotation-coverage taxonomy, not a solver taxonomy: the object families of
Section 4 describe simulation method, while the families here describe which supervision labels apply.

Annotation family

#Assets #Ann./obj./skill Main skill families

Rigid objects
Articulated objects
Deformable / garments
Room-scale scenes

Total

12,538
2,094
2,167
206

17,005

869 Grasp, DexGrasp, BiGrasp, Insertion, Hanging
304 Articulation, Grasp, Navigation / Approach
83 BiGrasp, BiDexGrasp, Deformable, Hanging
527 Navigation / Approach, mobile manipulation

—

Table 12 Annotated asset pool by annotation family. These families are orthogonal to the simulation-method families
of Section 4.

31

Figure 18 Offline asset compilation produces grounded anchors and physics-validated candidate banks. Runtime skills
and planners consume those banks while camera, native, action, and language annotators record execution evidence.
Execution failures prune or down-weight the bank.

Scene binding remains deliberately thin. A scene category points to one USD or a folder of USDs; shared
defaults compose with per-instance overrides; selection can be random or deterministic; visual material
follows the priority color > material > none; and semantic labels are written into USD semantics for runtime
segmentation. Annotation follows the logical object, not the transient prim path, so it survives re-instancing,
hard reset, and per-environment asset diversity. Solver semantics live in Section 4; sampling, seeding, and
reset lifecycle live in Section 5; this subsection owns only the asset-side packaging contract.

8.2 Asset Annotation I: Hierarchical Visual–Language Annotation

The visual–language stage proposes where interaction might be meaningful. For an asset A, it produces
grounded anchors

H(A) = P (A) ∪ K(A) ∪ Raff (A) ∪ Rscene(A),

(1)

where P are part regions, K semantic keypoints, Raff affordance regions, and Rscene scene-level regions.
Each anchor h carries a functional prior φ(h), such as grasp-for-use, grasp-for-opening, insertion, hanging,
articulation, or navigation approach. These are priors; they do not become executable affordances until
physics validation.

At the object level, multi-view renderings are sent to a vision–language model [63, 64], producing a semantic
phrase, a functional sentence, and a part-aware paragraph. A fused RGB-D point cloud is then used for 3D
grounding: semantic keypoints are selected over farthest-point-sampling candidates [65], and part masks come
from native 3D part decomposition with P3-SAM and X-Part [66, 67]. These outputs ground handles, drawer
fronts, garment corners, openings, hooks, support edges, and other interaction-relevant regions.

Room-scale scenes receive the same hierarchy at scene granularity: language descriptions of layout, furniture
zones, and dense context; plus multi-height occupancy maps, floor plans, and wall-structure maps built from
simulated LiDAR and ray-cast scans. Objects inside rooms are annotated object-centrically and transformed
back to the global scene frame through shared instance identifiers, so object anchors remain aligned with
room-level reachable space.

32

Raw Simulation-ready 3D AssetsRecenterResizePhysicsReorientPhysics AnnotationVisual AnnotationFPS SamplingPoint CloudHunyuanPart SegmentationLaserRoom-levelObject-levelSkeleton MergerVLM Selection•handled mug•a cylindrical mug with a body and a side handle•a mug with a hollow body for containment and a side handle for grasping and liftingRotateTop-viewOCCVLMFilter•Hospital hall with 9 patient rooms •Rooms are separated by wall partitions and connected through corridors and doorways•Clinical furniture includes beds, desks, cabinets, seating, and medical equipment placed within rooms and common areas.VLMFunctional AnnotationCandidate Target GenerationTrajectoryGenerationTrajectoryOptimizationPhysicsValidationPhysics-awareAugmentationThis stage is static and asset-side. Runtime occupancy scanning belongs to Section 7 and the local planner of
Section 6; runtime language is deterministic and fact-rendered in §8.7; and per-frame detection or projection
labels are produced by the runtime capture stack, not by these offline anchors.

8.3 Asset Annotation II: Physics-Validated Action Candidate Banks

The physics stage turns proposed anchors into many validated ways to act. The unit of executable annotation
is not a single label but a bank :

visual anchor → functional affordance → compatible skills → candidate bank.

For each anchor h and compatible skill s, MagicSim stores

Bh,s =

(cid:110)

a(i)
h,s

(cid:111)Nh,s

i=1

,

h,s = (cid:0)s, o(h), h, φ(h), x(i), θ(i), τ (i), v(i), d(i)(cid:1).
a(i)

(2)

Here s is the skill, o(h) the associated instance, and φ(h) the functional affordance. The remaining fields
specify the concrete target, skill parameters, optional trajectory, validation metadata, and diversity descriptor
(Table 13).

Field Meaning

Examples

x
θ
τ
v
d

concrete target
skill parameters
optional trajectory
validation metadata
diversity descriptor

contact point, handle point, socket, base pose
6D grasp pose, hand joints, insertion / articulation axis
approach–contact–retreat, drawer pull, garment fold, nav path
collision, IK, task success, contact stability, path feasibility
approach side, contact mode, perturbation seed, trajectory family

Table 13 Core per-candidate fields of the action annotation schema in Eq. (2).

Functional affordance is what separates this schema from a pile of stable grasps. A mug handle carries
grasp-for-use, while the mug body may only carry stabilizing grasp. A cabinet handle carries grasp-for-opening,
so its grasp candidates are conditioned on the drawer or door motion they must enable. A grasp that is
physically feasible but blocks the next task step succeeds locally and fails as long-horizon supervision.

Candidates are generated and filtered by the companion pipeline: target localization and sampling; trajectory
template generation; optimization under task, contact, collision, kinematic, and smoothness objectives; parallel
physics validation with floating end-effectors or full robots as needed; and physics-aware augmentation by
local perturbation and symmetry-aware expansion [62]. The resulting catalog is a broad, dozens-scale set of
skill-conditioned annotation products, summarized by family in Table 14.

Family

Representative annotation products

Grasp
DexGrasp
BiGrasp / BiDexGrasp
Articulation
Insertion / Hanging
Deformable
Navigation / Approach

parallel-jaw grasp, functional grasp, lift grasp
dexterous grasp, stable hold, dexterous handle grasp
bimanual grasp, dual-hand dexterous grasp, coordinated hold
open, close, push / pull part, rotate joint, press
peg-in-hole, connector insertion, hang-on-hook, hang-on-edge
garment pick, fold, spread, fling, stretch, retrieval-style motion
navigation target, object-centric approach, interaction-ready base pose

Table 14 Representative action-annotation families. The full catalog is not count-synchronized with the executable
AtomicSkill library.

Across 17,005 assets, AnnotateAnything produces on the order of 108 physics-validated action annotations.
On the audited evaluation suite, an attempted asset–skill pair generates 2,315 raw candidates on average;
1,384 survive geometric constraints, 842 survive IK and trajectory feasibility, 615 pass physics validation,
and 538 are retained in the final bank, corresponding to a 26.6% physics-validation pass rate and a 23.2%
retained-candidate rate [62]. Physics annotation is not physics parameters: mass, friction, joint limits, and
solver settings remain runtime state owned by the sim-ready asset and Section 4.

33

8.4 The Annotation-to-Execution Interface and the Living Bank

The candidate bank is the seam between AnnotateAnything and MagicSim. It is not just a dataset table; it is
the runtime API through which skills turn asset priors into behavior. A skill retrieves multiple candidates,
packs them into a goal-set IK or planning request, and lets the planner select a feasible low-cost solution
under the current randomized robot–object configuration (Section 10; [38]). The bank supplies options; the
planner supplies the decision.

The prior and the record are duals. A candidate in Eq. (2) says what can be done: this handle can be grasped,
this drawer can be pulled, this base pose can approach the target. The native affordance annotator of §8.6
says what was selected and executed : the planner-induced ray-cast target point on the manipulated mesh and
the commanded grasp orientation for one segment.

During collection (Section 11), rollout outcomes are attributed back to the candidates that produced them.
Repeated failures under randomized layouts, poses, cameras, or planner constraints are pruned or down-
weighted, making the bank a population under runtime selection. The annotation catalog and the executable
atomicskills are related but not one-to-one: some annotation products are consumed through existing primitives,
and some executable skills require no asset annotation. The bank is where the vocabularies meet.

8.5 Runtime Capture Substrate and Omni Annotators

Runtime annotation begins with cameras. CameraManager owns camera prims and pose, including pose
randomization, while CaptureManager and TiledCaptureManager own render products and annotators. The
shared camera: YAML block is split so creation, capture, and optional flying-camera planning read the same
per-camera sub-blocks. Pinhole cameras are configuration-driven; Kinect- and RealSense-style cameras use
mesh USDs and fixed mode tables; link-mounted cameras ride the robot body. Full reset rebuilds render
products, partial reset is a no-op, and capture has no reset_to because it is a derived sink rather than
reproducible simulator state.

Stock Omni Replicator annotators [43, 68] run on this substrate: image channels (RGB, normals, depth,
motion, occlusion), segmentation, 2D/3D boxes, and geometry or metadata such as camera parameters, point
clouds, and skeleton data. Runtime semantic segmentation is meaningful because the asset layer writes
semantic labels into USD semantics; instance segmentation becomes usable because stable logical identities
map instance ids back to object records.

8.6 MagicSim-Native Runtime Annotators

Omni annotators label what the renderer sees; MagicSim-native annotators label what the skill meant. Three
pure-CPU annotators are added by MagicSim (Table 15). They are execution traces, not asset metadata.

Annotator

Granularity

Records

eef_waypoint
obj_bbox
affordance

per frame
per AtomicSkill segment
per GlobalPlanner segment

gripper image-plane trail, one or two arms
frozen 8-corner projected box of the target object
ray-cast target point plus commanded grasp quaternion

Table 15 MagicSim-native runtime annotators.

The native annotators share a pinhole projection core with no Isaac dependency. Per-environment origins
lift local coordinates to world; per-step memoization and per-segment fingerprint caches keep geometry off
the hot path; missing manager bindings produce empty payloads; and merged JSON sidecars are flushed
only for successful episodes. Projection is see-through: no occlusion test is performed. The native affordance
annotator is distinct from the validated affordance prior; it records the grasp point and end-effector orientation
actually realized during an executed trajectory, rather than an asset-level affordance prior.

Figure 19 summarizes the representative visual and execution-grounded supervision channels available during
automated data collection. The renderer-derived channels describe what is visible from a camera, whereas the
MagicSim-native channels preserve targets and trajectories selected by the active skill and planning stack.

34

Figure 19 Representative runtime capture and annotation modalities in MagicSim. The left group shows integrated Omni
Replicator outputs, including depth, surface normals, optical flow, two- dimensional bounding boxes, three-dimensional
bounding boxes, and point clouds. The right group shows MagicSim-native execution annotations, including end-effector
waypoints, planner-selected affordance targets, target-object bounding boxes, and navigation points. The modalities
are synchronized with robot actions, task states, skill phases, planner segments, camera streams, and language traces
during automated collection. Native sidecars and renderer-derived outputs are retained only when the episode passes
the trajectory success gate.

8.7 Runtime Language Annotation

Runtime language is the semantic index of a rollout. It turns the same execution that cameras and native
annotators record geometrically into a scene description, a task instruction, and a temporally aligned narration
that can be searched, filtered, and used as supervision. MagicSim stores three levels: L1 describes the episode
scene, including the active robot, objects, appearance, spatial relations, lighting, effects, background, and
camera viewpoint; L2 states the task instruction after task slots have been resolved; and L3 narrates the
active AtomicSkill or GlobalPlanner state at each step, deduplicated to change points so the saved language
is a sequence of events rather than repeated idle frames.

The language layer is fact-rendered rather than image-guessed. Managers answer what is true: SceneMan-
ager contributes object and artifact facts such as identity, noun, color, material, pose, and bounding box;
CameraManager contributes viewpoint and intrinsics; RobotManager contributes the active embodiment;
and the command, skill, planner, and collection managers contribute task type, target object, hand selection,
phase, and planner state. LanguageManager answers how to say it: templates, slot filling, vocabulary maps,
optional clauses, and hand-assembled relation sentences convert those structured facts into English. L1 is
built lazily once the episode has a task, L2 when the task instruction is known, and L3 after manager updates
so skill and planner phases are current. A dense L3 mirror rides in the collect/ buffer; the compact L1/L2/L3
JSON files are dumped only when the trajectory passes the success gate.

Offline asset-language annotations from §8.2 enter this runtime chain as stable object facts, not as another
model call. Semantic phrases populate object vocabulary, functional sentences expose manipulable parts, and
part-aware paragraphs provide compact interaction summaries that scene descriptions can surface. Runtime
language therefore inherits the object knowledge produced by the asset compiler while remaining deterministic
during rollout: no VLM is queried on the hot path, and every sentence is grounded in the same logical
identities, skill segments, and planner targets used by the geometric annotations.

35

Integrated Omni Replicator AnnotatorsCustom MagicSimNative AnnotatorsDepthNormalsFlowEEFWaypointAffordance2D BBox3D BBoxPoint CloudObject BBoxNav Point8.8 Capture and Annotation Efficiency

Efficiency is a design constraint of the annotation stack, not an implementation afterthought. MagicSim runs
many environments in lockstep; a label that blocks every frame is more expensive than the supervision it
creates. The runtime therefore treats annotation as three cost centers—rendering, geometry, and I/O—plus
one lifecycle hazard, and pushes each one off the critical path whenever possible.

Cost center

Rendering

Native geometry
Disk I/O

Failure mode

MagicSim design choice

one render product per env–camera
pair
repeated ray casts and projections
per-frame JSON writes

tiled CameraView per camera, batched over envs

per-step memo plus per-segment fingerprint caches
in-memory accumulation and success-time sidecar
flush
idempotent rebuild; partial reset is a no-op

Lifecycle

duplicated sinks after reset

Table 16 Runtime annotation is engineered around the hot path. Rendering is batched, geometry is cached, disk writes
are deferred, and reset behavior is idempotent.

On the render side, tiled capture builds one batched CameraView per camera over all environments, rather
than one render product per (env, camera). Preallocated Warp buffers preserve the same downstream output
shape as the non-tiled path, so record code does not need a second schema. MagicSim-native annotators
deliberately bypass CameraView; they continue through the projector path, so the same YAML works with
either capture backend.

On the geometry side, native annotators are segment-aware. End-effector trails need per-frame projection,
but object boxes and affordance targets usually change only when the active skill or planner segment changes.
The projector therefore maintains a per-step memo for repeated queries within a frame and a per-segment
fingerprint cache for world points whose source segment has not changed. Missing manager bindings produce
empty payloads instead of forcing synchronization, and see-through projection avoids renderer-dependent
visibility tests.

On the I/O side, annotation is success-gated. Native outputs, Omni sidecars, and language records accumulate
during rollout and are flushed only when the collection layer accepts the trajectory. The collection chapter
owns the directory layout and success gate; this chapter only specifies the annotation contribution to that
layout: camera videos and Omni/native sidecars under camera/, and L1/L2/L3 language under language/.
Failed or truncated episodes drop their buffers instead of writing partial labels. Together, these choices
make the marginal per-frame cost of annotation dominated by pixels already being rendered; the additional
semantic, geometric, and language supervision remains lightweight enough to run inside large-scale collection.

Together, the asset and runtime annotation systems close the supervision loop: assets are compiled before
execution, consumed by skills and planners during execution, recorded as visual, geometric, action, and
language evidence after execution, and refined by the failures that the runtime observes.

9 Task and Benchmark Layer

Existing benchmarks often optimize task diversity and RL-readiness at different layers. Some emphasize
semantic and activity coverage, as in BEHAVIOR-1K’s human-centered everyday activities [25]; others
emphasize fast vectorized control and scalable learning interfaces, as in ManiSkill3’s GPU-parallel simulation
and rendering [69]. MagicSim’s claim at the task layer is not simply that it contains more tasks, but that
task diversity is organized by a single contract: every task, regardless of embodiment or interaction regime,
instantiates the same MDP-facing interface, configuration schema, and status ontology. A fuller comparison
with neighboring platforms is deferred to the related-work discussion.

Section 3.4 stated the per-task form of this idea: fix a task, and the same MDP can be driven by RL training,
scripted collection, or inference. This section takes the transpose: vary the task, and the contract stays
fixed. A tabletop insertion task, a garment manipulation task, a humanoid loco-manipulation task, and
an avatar-conditioned HRI manipulation task are different MDPs, with different observations, actions, and

36

dynamics. What they share is the contract every task fills. We first define this contract, then show how it
composes embodiments and interaction regimes into a diverse task surface, how the same interface becomes
RL-ready, and how the contract is frozen into a benchmark protocol.

9.1 One Task Contract

A MagicSim task is not a standalone script but a parameterized MDP instance. Each task specifies a reset
distribution, a policy observation view, an optional privileged observation view, a reward, a termination and
truncation rule, task parameters, and a status signal. The action space is not declared by the task; it is
inherited from the embodiment through RobotManager’s combined action space (§6.1). Table 17 shows where
each MDP element lives in the contract.

MDP element

MagicSim realization

Substrate / reset distribution
Observation
Action space
Reward
Termination / truncation
Task parameters
Evaluation signal

config.env plus task-level randomization
get_policy_obs and get_privilege_obs
RobotManager’s embodiment-level combined action space
get_reward, declared through config.task
get_termination plus batched episode buffers
config.task.command
running, success, truncated, and failed

Table 17 The task contract. Different tasks instantiate different MDPs, but expose the same contract to training,
collection, and evaluation.

The implementation point is TaskBaseEnv, which wraps the Env-Core environment SyncRobotEnv-V0 (§5)
and reads a flat two-block configuration. config.env defines the substrate consumed by the Core managers:
scene, robot, camera, animation, navigation, and simulation settings. config.task defines the MDP-facing
layer: {observation, reward, termination[, command]}. Category base environments provide defaults, while
concrete tasks override five hooks: get_obs_space, get_policy_obs, get_privilege_obs, get_reward, and
get_termination.

The status ontology is uniform even when success predicates are task-specific. A task may define success
by placing an object, inserting a peg, folding a garment, reaching a camera viewpoint, or completing a
human-facing manipulation outcome with an avatar, but the episode still reports the same status labels.
In this section the label is the evaluation signal; in the collection layer it also becomes the write gate for
trajectories (§11). The same contract also carries task parameters through config.task.command, so training,
evaluation, and AutoCollect differ by command distributions rather than by separate task definitions. How
the substrate beneath this contract resets deterministically, randomizes under disjoint seed streams, and
snapshots state is the subject of Section 5; this section treats those properties as given.

9.2 Diversity by Composition: Embodiment × Interaction

Task diversity comes from recombining embodiments and interaction regimes under this contract. MagicSim
registers eight task families — TableTop, MobileManip, LocoManip, Dexterous, Garment, ContactRich,
Camera, and HRI — spanning more than forty concrete tasks. These names organize implementation and
registration: each family is anchored by a base environment and populated by per-task configuration files.
Conceptually, however, the benchmark is better read as an embodiment-by-interaction matrix than as a flat
list of categories.

The distinction between families and regimes is what keeps the taxonomy coherent. A family fixes shared
substrate: base environment, scene assumptions, embodiment wiring, and default configuration. An interaction
regime describes the dynamics a task exercises. Thus a TableTop task may be contact-rich, as in insertion,
while ContactRich remains its own registered family for precision assembly tasks that need a specialized
substrate. The registry is therefore not a one-dimensional task list; it is a structured surface over controllable
bodies and interaction types.

37

Figure 20 Representative downstream tasks supported by MagicSim. The 4×5 grid summarizes the task coverage
exposed through the shared task and benchmark layer.

The controllable-body axis spans fixed-base arms, dual-arm systems, dexterous hands, wheeled mobile
manipulators, legged or humanoid loco-manipulators, and camera-only sensor carriers. The interaction
axis spans rigid grasping, articulated mechanisms, non-prehensile pushing, deformable garments, precision
contact, locomotion and navigation, viewpoint control, and avatar-conditioned contact-rich manipulation.
A new benchmark cell is a composition of these axes: the embodiment contributes the action space, the
task contributes observation, reward, termination, and command semantics, and the category base supplies
defaults. Task logic also ports across families — the same task form can be registered under more than one
family — and a newly registered embodiment extends every compatible cell without new task code.

HRI deserves its own row in the registry, but not a separate storyline in the section. It is anchored by
HRIBaseEnv because its substrate contains an animated avatar and its success predicates may depend on
robot–object–avatar relations. This makes HRI adjacent to contact-rich manipulation, but not redundant
with the ContactRich family. ContactRich tasks emphasize robot–object–fixture precision, such as insertion or
assembly against a board, socket, hole, or other rigid fixture. HRI tasks emphasize human-facing manipulation
outcomes conditioned on an avatar’s pose, motion, or interaction state. The avatar is part of the environment
state and is advanced by environment-side dynamics (§6.10); no entry of the robot action vector controls it.
HRI therefore changes the transition dynamics and success predicates of a manipulation task without changing
the agent-facing MDP contract. Compared with avatar-centric embodied-AI settings such as Habitat 3.0 [70],
the distinction is task level: MagicSim’s HRI is manipulation-level and contact-rich, rather than primarily
navigation- or household-rearrangement-oriented.

9.3 RL-Ready by Construction

The same contract makes the task layer consumable by vectorized RL pipelines. Here, RL-ready is an interface
property rather than an experimental result: a task is RL-ready when standard vectorized learning pipelines
can consume it without task-specific glue code. Concretely, this means batched stepping, partial resets, stable
observation dictionaries, reward tensors, termination tensors, privileged-observation splits, and reproducible
reset streams.

These properties follow from the contract. TaskBaseEnv runs many replicas inside one vectorized simulation
instance and maintains per-replica episode lengths, termination flags, and truncation flags. The policy/privi-
leged observation split makes asymmetric actor–critic training a first-class interface rather than a per-task
convention. Reward and termination are declared through config.task, so task variants are configuration

38

Bi-DexGraspReachMobileReachPourBi-GraspDexGraspGraspPickandPlaceCloseDrawerMobileOpenDrawerOpenDrawerDualLoco-ReachFlingSquatGraspHandoverLoco-NavigationLoco-GraspLoco-BoxLoco-Bi-GraspLoco-LiftRegistered family

TableTop

MobileManip

LocoManip

Dexterous

Garment

Embodiment / control fam-
ily

fixed-base single- and dual-
arm
wheeled base + arm(s)

humanoid +

/

legged
arm(s)
arm + dexterous hand

single- and dual-arm

ContactRich

fixed-base arm

Camera

HRI

controllable sensor carrier

robot manipulation
avatar-populated scenes

in

Interaction regimes

Representative task forms

rigid prehensile; articulated;
contact-rich
prehensile; articulated; navi-
gation
loco-manipulation;
lated; navigation
dexterous prehensile; articu-
lated
deformable manipulation

articu-

precision contact and assem-
bly
perception; viewpoint con-
trol
avatar-conditioned contact-
rich manipulation

PickPlace, Handover, Insert

BiDexGrasp,

MobileGrasp, MobileOpen-
Drawer, Pack
LocoGrasp, LocoOpenDoor,
LocoRoomNav
DexGrasp,
DexOpenDrawer
Fling, GarmentFold, Hang-
Garment
GearAssembly,
PegInHole
GoTo

InsertUSB,

human-facing manipulation
outcomes

Table 18 Task families organize registration and substrate; interaction regimes cut across them. HRI is a registered task
family because its tasks share an avatar-conditioned manipulation substrate; its semantics remain manipulation-level
and contact-rich.

edits rather than code forks. Reproducibility is inherited from the runtime through seeded randomization,
disjoint streams, and reset_to replay (§5). Finally, IsaacRLEnv subclasses IsaacLab’s DirectRLEnv, allowing
IsaacLab-compatible learning workflows to attach to the same surface.

In the current system, low-level policy RL is exercised through an rsl_rl integration [71]. Closed-loop RL for
higher-level planners — for example through post-training infrastructures such as verl [46] or RLinf [47] —
remains a planned use of the agent-facing interfaces (§12.3) rather than a completed capability. The Camera
family satisfies the same task contract but is exercised through the camera-trajectory collection stack (§11)
rather than low-level policy RL, so we make no training claim for it here.

9.4 Benchmark Protocol

The benchmark protocol freezes the contract into comparable evaluation settings. For each task, a protocol
instance fixes the reset distribution, evaluation seed split, observation modality, action space, episode horizon,
success criterion, privileged-state allowance, command distribution, and reported metrics.

The command block is the protocol’s difficulty knob. Under RL, commands are sampled from the task’s
training or evaluation distribution. Under AutoCollect, AsyncRobotEnv injects config.collect.command into
config.task.command, so the task reads the same parameters regardless of driver. Changing target-object
ranges, initial states, scene distributions, avatar states, interaction poses, or goal tolerances therefore changes
benchmark difficulty without creating a new task implementation. Task-level randomization is declared here
as distributions over reset and command space; the runtime supplies the reproducible sampling machinery
through per-environment seeds and disjoint streams (§5), so the separation between training and evaluation
streams holds by construction rather than by convention.

The success criterion is task-specific, but its output is standardized. PickPlace, for example, emits success:
only when its place-success termination fires, with the tolerance sized to the place pad — the tolerance is part
of the benchmark definition, not an implementation detail. HRI tasks follow the same rule: their predicates
may involve robot–object–avatar relations or contact outcomes, but they still emit the same standardized
status labels. Privileged observations may be used by critics or teachers during training, but benchmark
reports must separate policy inputs from privileged channels, matching the asymmetric training interface in
§9.3.

Metrics derive from the same status ontology used during execution: success rate, truncation rate, and failure

39

rate over the evaluation distribution, optionally with normalized episode length among successful episodes.
The status string is therefore not log text; it is the common source of evaluation metrics in this section and the
trajectory write gate in the collection layer (§11). This section defines the protocol and evaluation interface
only; experiments and per-task scores are reported separately.

10 MagicSim AtomicSkill System

The task layer (§9) defines what success means; the AtomicSkill layer defines the verified actions through which
that success is executed, recorded, and exposed to higher-level decision makers. AtomicSkill is MagicSim’s
physics-facing action layer. AutoCollect uses it to turn sampled command sequences into verified trajectories
and aligned supervision; hierarchical policy evaluation uses the same vocabulary as an action interface.
Individual skills may be realized by motion generation, frozen policies, model-predictive control, or scripts,
but they expose the same lifecycle states, typed outcomes, success checks, and recording boundaries.

The design choice is simple: fix the layer that touches physics. Above the AtomicSkill interface, task intent
may be scripted, sampled, or selected by a policy. Below it, actions are grounded in live scene state, executed
by pre-validated backends, recovered through typed failure paths, and checked by success gates. This makes
task intent executable, batchable where planning is used, recoverable, and selectable by high-level policies.

10.1 Why Atomic Skills: Fixing the Layer That Touches Physics

Scalable robot-data generation must answer three questions: where expert behavior comes from, where
generativity is allowed, and what keeps execution success high enough for collection. Teleoperation answers
with human operators; it gives faithful demonstrations but scales poorly with data volume and embodiment
complexity, especially for bimanual, dexterous, mobile, and whole-body systems [72]. Demonstration-transform
methods answer with source demonstrations: MimicGen, DexMimicGen, SkillMimicGen, and SoftMimicGen
amplify recorded behaviors through object-, skill-, or deformable-object transforms [33, 73–75]. They inherit
human strategies, but their generalization is conditioned on the support of the source demonstrations.

LLM-based systems answer with generated execution logic. RoboTwin 2.0, GenSim, GenSim2, and RoboGen
generate task code or per-task solvers
[76–79]; HumanoidGen defines atomic operations but uses LLM-
generated constraint chains to sequence them [80]. These systems expand task coverage, but the generated
artifact sits inside the execution boundary: code or constraints must be semantically correct before touching
physics. Thus program generation, repair, and execution success become entangled.

MagicSim takes the complementary position. Generativity is allowed above the interface, but the executable
layer is fixed. atomicskills encode the physical decisions that determine success—grasp goal construction,
descent gates, stable-hold checks, contact predicates, base-placement constraints, or learned-policy success
gates—once, then reuse them across tasks and scenes. The trade is explicit coverage: a fixed vocabulary
cannot invent arbitrary new strategies by prompting alone. In return, execution success is engineered in a
verified physics-facing layer rather than re-established for every generated program.

10.2 One Vocabulary, Two Interfaces: Actions Upward, Execution Downward

The high-level interface is not a state machine. It is an action vocabulary over the shared MDP state. At the
command level, an action specifies which command to run, on which object, with which robot, hand, mode,
and target parameters. At the skill level, an action is a single AtomicSkill invocation. A scripted command
source, hierarchical policy, or VLM/LLM high level planner selects one of these actions.

The skill executor owns those lifecycle states. It expands commands into skills, steps each skill, issues backend
requests, handles retries and timeouts, propagates typed statuses, and emits terminal states consumed by the
success gate. Thus an AtomicSkill has two faces: upward it is an action symbol; downward it is a traceable
execution unit with phase state, target state, typed outcomes, and recording boundaries.

40

Component

Role

Command source / high-
level policy
Skill executor

AtomicSkill

Selects command- or skill-level actions over the shared
MDP state.
Expands commands into skills; drives backend execution;
handles retry, timeout, truncation, status propagation, and
logging.
Maps selected action intent to backend requests and typed
execution status.

Lifecycle FSM?

No

Yes

Action upward; trace
downward

Table 19 One vocabulary with two interfaces. Lifecycle state belongs to the skill executor, not to the policy-facing
action API.

10.3 AtomicSkill as an Online Goal Compiler

Most atomicskills are planner-grounded. They store no demonstration or reference trajectory; they compile
task intent and live scene state into planner goals, success predicates, and recovery attempts. Learned or
MPC-backed skills (§10.4) share the same external interface but replace this compiler with a fixed policy,
state-base RL policy or controller. The planner-grounded case makes the contrast to demonstration methods
clearest: a transform adapts recorded behavior, while an AtomicSkill computes current-scene goals directly.

The planner-grounded library separates intent from realization. Skills own target construction, phase gates,
contact checks, object-state predicates, and terminal status strings. Motion realization is restricted to a small
set of GlobalPlanner primitives, including MoveL, ServoL, MobileMoveL, MobileServoL, RetractMoveL,
NavTo, ParallelGripper, and DexHand. Roughly twenty-two skills over eight primitives realize on the order
of thirty command types across the task families and embodiments of §9. The claim is not that any skill is
universal, but that covered interaction patterns are validated at scene time and reused across poses, layouts,
instances, and embodiments.

10.4 Skill Backends and the Batch Boundary

Fixing the AtomicSkill interface does not fix how every skill is realized. The backend is chosen for the physics.
Geometric manipulation uses motion generation because it is fast, reliable, and easy to check: target poses,
collision constraints, active hands, and goalsets are constructed from the live scene, then verified before
and after execution. These planner-grounded skills are also the throughput path. They emit normalized
requests of the form ((robot_id, hand_id, planner_mode), target), which are grouped by solver type, robot
configuration, and planner mode and solved asynchronously by the planning farm (§6). This is the only
backend for which we claim cross-environment batched motion solves.

Other regimes need different backends. High-DOF dexterous behaviors, such as in-hand reorientation, are
not realistically hand-coded or solved as simple geometric plans, so MagicSim trains a series of state-based
RL policies like [81]. These policies add behaviors and micro-strategy diversity that scripted trajectories
cannot express, while still reporting through the same skill lifecycle and success gate. Contact-rich continuous
skills, such as nonprehensile pushing, instead need tight closed-loop correction; an MPC backend supplies
small feedback actions as contact evolves [82]. MPC runs per environment rather than through the motion-
generation solve farm, because its value is feedback, not batching. Simple deterministic behaviors may remain
scripts.

The unification is the contribution. Motion generation, frozen policies, MPC, and scripts are fixed, pre-
validated artifacts at collection time. Each receives a skill invocation, advances under executor-owned lifecycle
control, reports typed outcomes, is checked by the success gate, and writes the same command–skill–backend
hierarchy. A single episode can chain a planned grasp, learned in-hand rotation, and MPC push in one
persistent world and one trajectory format. The backend changes how a selected skill is realized; it does not
change how the skill is selected, verified, segmented, or recorded. RL-as-backend is therefore distinct from
RL-as-driver: the former realizes one skill below the interface, while the latter selects commands or skills
above it (§10.6).

41

Figure 21 Representative AtomicSkill-enabled behaviors across embodiments. The repertoire spans reaching, grasping,
placing, pushing, inserting, articulated-object interaction, cloth manipulation, sweeping, washing, handover, navigation,
and bimanual manipulation across tabletop arms, mobile manipulators, humanoids, and dexterous hands. These
behaviors share the same verified skill interface even when their realization backends differ.

10.5 Typed Failure, Multi-Command Episodes, and Data Boundaries

AtomicSkill does not remove failure; it makes failure local, typed, and useful. With a fixed skill vocabulary,
semantic correctness is paid once per skill or backend. Collection-time failures are mostly geometric or physical:
no IK, collision, unstable grasp, missed contact, timeout, controller failure, or adverse object state. These
failures trigger a fixed ladder—planner retry, alternative goalset, grasp/contact resampling, skill retry. This
provides precious failure-recovery data which is harder to collect in the real world.

An episode is a persistent-world sequence of commands over the same AtomicSkill vocabulary. Later commands
consume the physical consequences of earlier commands; long-horizon behavior is obtained by sequencing
commands, not by adding a separate long-horizon controller. Storage is segmented for reliability: each
successful command can flush its own trajectory record, while episode, command, skill, and backend identifiers
recover the hierarchy. This preserves verified segments even if a later command fails.

The same hierarchy is also supervision. Command boundaries are subtask boundaries; skill boundaries are
execution boundaries; backend or planner segments are motion-affordance boundaries. Native annotators
attach end-effector waypoints, target-object boxes, affordances, and narration at the same boundaries (§8.6,
§8.7). Thus long-horizon data is composable at collection time and decomposable at training time. The G1
example in §1 follows exactly this format: locomotion and manipulation commands share one scene, while
each verified command is stored with recoverable command, skill, and backend indices.

42

Open DrawerMobile ReachMobile OpenMobile RetractDrawerReachPlacePushPick & PlaceLoco Open DoorLoco ReachLoco Retract ReachMobile CloseDrawerMobile Dual ReachMobile GraspReachWaveWashHandoverLoco BoxLoco GraspInsertDexterous WaveGraspFoldFlingLoco Dual ReachSweepDexterous OpenDrawerDexterous GraspClose DrawerSquatPick&PlaceMobile DexterousGraspBi-GraspLoco LiftLoco Nav```markdown```.10.6 AtomicSkill as a High-Level Control Interface

The vocabulary that drives collection is also a high-level action space. Replacing the scripted command source
with a learned high level LLM policy changes who selects the command or skill; it does not change grounding,
control, recovery, verification, recording, or annotation. A command-level policy can select task-scale actions
such as pick, place, open, navigate, or execute a multi-command program; a skill-level policy can select
reusable options for hierarchical imitation, option learning, or reinforcement learning.

11 Asynchronous Data Collection and Serving

The previous sections define the task contract, AtomicSkill executor, planner services, annotations, and
replay. This section only describes the collection-side scheduler and the serving boundary. The invariant
is simple: physics is batched, but collection state is per environment. Every sub-environment crosses the
same sim_step barrier, while commands, skill phases, planner futures, recovery attempts, language updates,
episode boundaries, and writes advance independently. The collector therefore has one shared clock, but not
one shared timeline.

11.1 The Collector Loop

AutoCollect turns a task MDP into a scripted demonstration generator by adding three layers above the
task environment: command sampling, skill/planner execution, and recording. Each tick follows the same
descent-and-ascent pattern:

AutoCollectManager.step → AtomicSkillManager.step → GlobalPlannerManager.step
→ env.step(robot_action) → GlobalPlannerManager.update
→ AtomicSkillManager.update → AutoCollectManager.update.

The downward pass produces the robot action for the current tick; the upward pass reads the post-physics
state and advances the per-environment state machines.

The collector does not reinterpret skill semantics. AtomicSkill owns typed failure, recovery, retries, and phase
transitions; the task layer owns the final success predicate. AutoCollect only maintains slots: it samples each
environment’s task from the weighted task_string distribution, tracks which environments are still running,
failed, or pending reset, clears terminal slots, and lets the next tick resample them. Because one environment
can reset while its neighbors keep running, skills validate substeps against live scene state rather than cached
poses. Language and recording run after the manager updates, so the per-step narration and collect stream
describe the state that actually held after the tick.

11.2 Free-Running Episodes on a Lockstep Tick

Desynchronization of giving high-level commands comes from three sources: motion horizons differ across
targets and layouts; planner futures return at different times; and episodes contain different command
sequences, retries, failures, and resampled tasks. The solve farm itself is owned by §6.7; the collection loop
only uses its caller-side contract: submit a request, keep stepping the batch, and harvest the future when it
is ready. Thus an environment waiting on a planner can hold pose or continue a previous segment without
preventing other environments from finishing skills, entering recovery, or writing successful trajectories.

The efficiency argument is structural. A barriered collector pays the maximum phase length in the batch,
maxi hi, at every phase boundary. A free-running collector pays each environment’s own horizon and
synchronizes only at the physics tick. In one sentence, one long phase should not become a batch-wide stall.

11.3 Serving and Driver Attachment

Serving applies the same scheduling rule at process scale. A single simulator process still has one safe stepping
thread, so GymService marshals concurrent HTTP requests onto that thread through request/response
queues. Across processes, AsyncClient fans calls out to multiple upstream servers, each with its own (port,

43

env_num), and exposes the pool as one larger blocking batched environment. The outside sees concurrency;
each simulator inside the pool still advances on one clock.

This makes serving a transport layer rather than a new environment definition. The same reset, reset_to,
step, observation, and info contract can host different drivers. An RL runner drives TaskBaseEnv directly
through the RobotManager action space. AutoCollect adds the scripted command–skill–planner scheduler
and recorder above that MDP. An inference or replay runner attaches as an external driver whose actions
still enter through the RobotManager action contract, not through the collection layer’s skills or planners. A
verl-facing wrapper attaches at this same boundary; closed-loop high-level post-training through verl or RLinf
remains an integration point rather than a completed result. Full step info, including the dense language
mirror, can be forwarded to served clients when the deployment accepts the bandwidth cost.

12 Supported Capabilities

MagicSim’s supported capabilities are three ways of reading the same runtime rather than three separate
subsystems. The same episode can be used as a benchmark rollout, a success-gated trajectory, or an agent-
facing interaction loop. Section 3.4 stated this as the one-MDP–three-drivers claim; the preceding sections
then defined the mechanisms. This section only assembles those mechanisms from the user’s point of view:
what product the user gets, which entry point they run, and where the current status boundary lies. The
recurring signal is the task status ontology: in benchmarking it is the metric source, in collection it is the
write gate, and in agent interaction it becomes structured feedback.

View

Benchmark

User-facing product

Main entry point

Status boundary

task
robot,

per-task evaluation records
registry,
over
the
including
avatar-
and
conditioned
camera-only / flying-camera
tasks

HRI,

env_string + task configura-
tion + benchmark protocol
over TaskBaseEnv

Data collection

Agent / VLM interac-
tion

successful multimodal trajec-
tories with actions, collect
traces, camera streams, na-
tive annotations, and lan-
guage
action–observation
loops
with visual, language, scene,
status, and scenario feed-
back

weights +
task_string
scene/task distributions +
AutoCollectEnv / camera-
collection mirror stack

locally

or
TaskBaseEnv
GymService / AsyncClient
remotely, with additional
world-
and
grounded
authoring surfaces

/

for

the

Current
gym-
compatible MDP surface
and low-level RL interface;
camera tasks are trajec-
active-perception
tory
benchmarks
than
manipulation-policy training
evidence
Current for robot and cam-
era collection; served at scale
through the environment-
pool path

rather

surfaces,

Current for MDP control,
camera/avatar
serving,
scenario
and
in-process feedback; high-
command injection,
level
VLM layout
and
closed-loop planner RL are
bounded below

scope,

Table 20 Supported capability views. Each row is a product view over the same runtime. Mechanism details remain in
the task, collection, serving, control, annotation, and layout sections referenced below.

The long-horizon G1 episode from the introduction is the simplest way to see the reuse. As a benchmark, it is
a rollout with task status and per-task metrics. As data, it is a {trajectory_id}/ directory with synchronized
action, collect, environment, camera, annotation, and language streams. As an agent interaction, it is the
same world exposed as an observation-and-feedback loop through the gym or served interface. Nothing about
the episode has to change; only the driver and the consumer change.

44

12.1 Benchmark Capability

MagicSim supports benchmark use by exposing the task registry as gym-compatible MDPs with shared
observation, action, reward, termination, success, and status semantics. The main point in this section is not
another list of task mechanics, because the task contract, benchmark protocol, and task-family table are owned
by §9.1–§9.4. The capability is breadth under one contract: the registry spans fixed-base manipulation, mobile
manipulation, humanoid and legged loco-manipulation, dexterous hands, garments, contact-rich assembly,
avatar-conditioned HRI, and the Camera family, where the controllable body is a camera / flying-camera
carrier rather than a robot. A benchmark user therefore chooses an env_string, task configuration, protocol,
and seed split, then reports per-task success, truncation, failure, and episode-length metrics. Low-level
policy RL is exercised through the task-layer RL interface (§9.3); camera-family tasks share the same MDP
contract but should be described as camera-trajectory or active-perception benchmarks, not as evidence for
manipulation-policy training.

12.2 Data Collection Capability

MagicSim supports data collection by turning task specifications and scene distributions into successful,
annotated embodied trajectories. A user provides task_string weights, scene and task distributions, camera
/ annotation settings, and an output_dir; AutoCollectEnv drives the task through the Command–Skill–
Planner hierarchy, the asynchronous planning services keep the batched loop from blocking, and the record
layer writes only episodes whose task state passes the success gate (§10, §11, §11.2). The saved product
is a trajectory directory with robot or camera actions, collect state, observations, camera streams, native
annotators, and L1/L2/L3 language (§8.7–§8.8). The camera-trajectory mirror stack reuses the same Record,
Capture, and Language path (§11), so collection is not tied to manipulation: the same capability also produces
flying-camera / active perception demonstrations. This is the most mature of the three capabilities, including
the success gate, trajectory layout, annotation flush, language dump, and served environment-pool path
(§11.3).

12.3 Agent / VLM Interaction Capability

MagicSim’s agent-facing capability exposes the same runtime as an interactive substrate. The current loop has
three exercised pieces. First, TaskBaseEnv provides the gym-level MDP boundary: observations and status
return from the task, while actions enter through RobotManager’s combined action space (§6.1). Second,
GymService and AsyncClient expose the same reset, reset_to, step, observation, and feedback contract
through the serving layer (§11.3). Third, the observation side includes camera streams, native runtime
annotations, three-level language, scene facts, and task status; in process these fields are available through the
task and collection info, and in served deployments the full-info payload can be forwarded when the client
needs structured feedback rather than a minimal observation–reward channel.

Around that loop, MagicSim exposes grounded environment surfaces rather than magic actions. The Command–
Skill–Planner hierarchy is implemented and exercised inside the collection stack, so high-level commands are
known to lower into skill state machines, planner requests, and ultimately robot or camera actions stepped by
the simulator (§11). Exposing that hierarchy as an external served-agent command API remains an integration
point. Scenario control is already current on the environment side: avatars can be commanded and read
back as animated world actors, while camera poses and flying-camera planners provide an active-perception
entry point without changing the robot MDP action boundary (§6.10, §6.9). The layout layer supplies the
world-authoring side of the interface through its VLM layout contract; its exact scope and implementation
status should remain aligned with the layout and limitations sections (§5.3, §14).

The remaining agent drivers are deliberately not claimed as completed results. InferenceRunner is a planned
policy / replay driver over the same TaskBaseEnv, with actions flowing through RobotManager rather than
through the collection skill stack. External command injection is the upgrade path from the current internal
hierarchy to an agent-facing command surface. Closed-loop reinforcement learning of high-level planners is
likewise a planned use of the same interfaces, not an experimental claim in this section (§9.3). The downstream
research questions enabled by these surfaces are deferred to §13.3; this section only fixes the interfaces and
their status.

45

13 Downstream Research Domains

MagicSim downstream use is organized around one executable substrate. Robotics reads an episode as an
MDP rollout and a success-gated demonstration; physics reads it as a replayable physical interaction under
controlled variation; embodied vision–language research reads it as a privileged trace that can also be evaluated
interactively. The sections below therefore expose three readings of one system rather than three separate
simulators.

13.1 Robotics

Robotics is the native reading of MagicSim: the task layer exposes a gym-compatible MDP, and the collection
layer drives the same tasks through the Command–Skill–Planner hierarchy (§9.3; §11). RL uses the task
contract directly; imitation and robot foundation models use success-gated trajectories; domain randomization
shapes both for transfer (§5.4). The shared surface is the task-family by embodiment matrix of §9.2.

13.1.1 Policy Learning Paradigms

A saved trajectory can be read as behavior, dynamics data, or representation-level supervision. The difference
is what the learner consumes, not which simulator generated the episode.

End-to-end policies. Vision–language–action and world–action models need aligned observation, language,
and action streams at scale [1, 3–5]. MagicSim trajectories pair camera streams, robot actions, language
narration, and skill/planner state, giving alignment at decision granularity (§11). Parallel, success-gated
generation then supports scaling, diversity, and quality-ablation studies.

World and dynamics models. World-model research reads the same record as an action-conditioned rollout
with pixels, actions, and privileged state [6, 7]. The recorded action supplies inverse-dynamics supervision.
Deterministic replay also gives a same-initial-state, same-action-sequence protocol: restore a reset_to snapshot,
execute the recorded actions, and compare model and simulator rollouts step by step (§5; §9.1).

Representation-centric policies. Representation-centric methods use point clouds, affordances, waypoints,
boxes, or object trajectories as control interfaces. MagicSim exports these through depth, normals, segmenta-
tion, waypoint, object-box, and affordance annotators; affordance is grounded in the planner-selected grasp
target realized in a successful execution (§8). Each demonstration therefore pairs 2D observation, 3D or
representation-level supervision, and robot action[16, 83–86].

13.1.2 System-Level Competencies

We use competencies for episode-level behavior: planning over time, recovering from failure, and transferring
across embodiments.

Long-horizon and hierarchical planning. Task and motion planning couples discrete task structure to
continuous motion [87]. MagicSim exposes this coupling directly: commands decompose into atomicskills,
skills into planner primitives, and primitives into per-tick robot actions (§10). Asynchronous planner services
keep batched environments stepping while IK and motion-generation solves are in flight (§6.4; §6.7).

Failure recovery and replanning. Failures are labeled at the tier where they occur and propagate through the
same status ontology used for metrics (§9.4). Snapshot replay restores failing initial conditions; successful
trajectories can contain retry-to-success segments; and, with the optional failed-episode persistence flag,
terminal failures can be saved as replayable corpora instead of cleared by the default success gate (§5; §11).

Cross-embodiment generalization. Roughly thirty-three embodiments across seven control categories share
one task contract: tasks define observations, rewards, and termination, while robots define action spaces
(§6.1). Adding a new embodiment extends every compatible task cell without rewriting task code, making
held-out embodiment evaluation a configuration-level experiment (§9.2).

46

13.1.3 Application Domains

Home robotics is the exercised setting; safety research reads episodes through contact and failure; autonomous
laboratories are the capstone integration.

Home assistant robotics. MagicSim combines indoor rooms, articulated furniture, clutter, mobile and
humanoid embodiments, manipulation tasks, and language-conditioned commands (§9.2). Human-facing
cases use environment-side avatars whose dynamics are part of the transition, not the robot action space
(§6.10). This places handover and human-aware placement near Habitat 3.0 and BEHAVIOR-1K [25, 70],
while remaining contact-rich and manipulation-centered.

Robot safety research. MagicSim is not a certification framework; it is a replayable substrate for studying
safety-relevant behavior. Collision-aware planning, tactile/contact signals, avatar proximity, and snapshot-level
failure replay map onto HRC safety axes such as sensing, planning, replanning, and contact behavior [88]
(§6.4; §7; §6.10; §5). These scenes also support semantic-safety evaluation for VLM-controlled robots [89].

Figure 22 Representative HRI and safety scenarios. Examples include pointing, handover, mobile operation near people,
and humanoid locomotion in populated environments. Avatars are environment-side actors; the robot is the controlled
embodiment.

Autonomous laboratories. Autonomous laboratories are the strongest integrative robotics domain for Mag-
icSim. A self-driving laboratory needs a robot-facing world where containers, liquids, granular materials,
tools, fixtures, and articulated devices interact under an executable protocol [90]. MagicSim addresses this
execution-and-evaluation layer: scenes stage liquid transfer, granular handling, precision insertion, stirring,
shaking, pouring, and equipment operation; the protocol is an executable skill sequence with verification,
retry, and failure labels; and high-level commands are grounded in skills rather than state edits (§4; §10; §11;
§12.3).[91, 92]

Figure 23 Representative autonomous-laboratory operations. Liquid transfer, shaking, stirring, pipette manipulation,
and pouring run through the same Command–Skill–Planner–Robot stack and are recorded with actions, observations,
annotations, language, and tier-level status.

The claim is narrower than a full autonomous scientist but stronger than a visual demo: MagicSim supplies
the robotic protocol-execution substrate such loops require. A protocol is run, recorded, replayed, and ablated;
deterministic replay restores the same recorded state while perturbing one factor such as pose, mass, friction,
appearance, timing, or object choice (§5; §5.4). Auto-lab is therefore the capstone application: it combines
long-horizon manipulation, measurable coupled interaction, and language-grounded closed-loop execution.

47

Point AtHand OverMobile SafeLoco Safe13.2 Physics and Physical Reasoning

Physics reads an episode from the world side: what interaction occurred, what caused it, and how the cause
changes under controlled variation. MagicSim joins executable interaction, measurable state, and deterministic
replay (§4; §5).

Large-scale coupled physical interaction data. The value is not a solver list, but co-instantiation inside one
executable episode. A pour couples robot, container, and fluid; garments drape against furniture; rope,
granular media, soft bodies, and articulated devices can share a scene (§4). Contact and tactile channels
record force, pressure, and deformation, while serving turns batched episodes into corpora under seeded
variation (§7; §11; §11.3).

Figure 24 Composite physics events. A single scene contains rolling, collision, granular and fluid interaction, free fall,
impact, projectile motion, soft-body contact, rebound, and dissipative rollout.

Counterfactual reasoning and controlled variation.
reset_to plus a single-parameter intervention yields
paired counterfactuals: the same episode with one friction, mass, material, or initial pose changed while
other streams remain fixed (§5.4). Read in reverse, the same variation becomes system-identification data
when saved state or metadata exposes the DR parameters. Domain randomization thus supports both causal
reasoning and physical-parameter inference.

4D dynamic scene reconstruction and physically grounded generation. Each episode is an annotated 4D scene
with time-varying geometry, depth, normals, segmentation, motion vectors, and camera parameters over cloth,
particles, articulations, and contact-rich objects (§8). This supplies supervision for dynamic reconstruction
and physics-grounded generation, including Phys4D-style simulation-supervised training and 4D consistency
evaluation [56]. The runtime pins each scene to seed, state, and replay policy rather than a one-off render (§5).

13.3 VLM and Embodied Agent Learning

Embodied VLM research reads privileged state as supervision. Because MagicSim knows poses, contacts,
boxes, cameras, phases, skills, planner outcomes, and language facts, embodied ability dimensions can be
generated programmatically; because the same world is interactive, those labels can become closed-loop

48

SurfaceRollingMomentum TransferGranular InteractionFluid InteractionSurface RollingMomentum TransferFree FallImpact SettlingElevated RollingProjectile MotionPlatform LandingEdge Roll-offSoft-body ImpactElastic ReboundGround RolloutFigure 25 Physics and physical reasoning supported by MagicSim. Coupled interaction episodes—rigid collision, rolling on
ramps and surfaces, and fluid—are recorded as deterministic, replayable rollouts with synchronized RGB observations
and tier-level physical state. The same state converts into robot- and scene-centric VQA covering collision outcome,
containment, and stability prediction, and into counterfactual and dynamics questions over ramp height, buoyancy, and
surface friction, each grounded in single-parameter variation via reset_to. These outputs also repackage as physically
grounded reasoning data for dynamics prediction, physical-parameter (system) identification, and 4D-consistent
generation.

evaluations. Some post-training consumers remain planned, as noted in §14. Figure 26 summarizes this
supervision view: object, keypoint, affordance, action, and language traces can be repackaged as perception
targets, robot-centric VQA, and 3D instruction-tuning data.

Spatial and multi-view understanding. Spatial relations, distances, counts, occlusion, and cross-view cor-
respondence are functions of privileged state. MagicSim can therefore synthesize QA pairs across aligned
egocentric and exocentric views from multi-camera and tiled capture (§11) [55, 93].

Affordance and embodied grounding. Affordance points, object boxes, end-effector waypoints, grasp poses,
and room or support-surface areas are direct products of the annotation schema (§8). The key claim is
execution grounding: the affordance corresponds to the planner-selected grasp target realized in a successful
trajectory [94, 95].

Task progress and skill-structure understanding. Each saved frame carries command, skill, planner, phase,
and status context. Progress estimation, skill segmentation, and success/failure prediction therefore inherit
dense labels from the same state machines that generated the demonstration (§11; §9.4)[96].

High-level planning and embodied reasoning. Each record also contains the instruction, realized skill sequence,
planner results, and outcome. This supports plan generation and critique—predict a skill decomposition,
predict the induced trajectory, or judge whether a sequence can still succeed—with execution as the arbiter
(§11; §12.3).

Active spatial exploration and interactive evaluation. The same labels can serve static supervision and online
evaluation. The camera-only embodiment makes viewpoint selection an action; occupancy and scene state
support information-gain-style objectives; and the agent interface runs commands across many parallel worlds
(§6.9; §11; §12.3). Post-training via verl [46] or RLinf [47] remains planned consumption, but the runtime
already lets an ability benchmark become an agent benchmark (§14).

49

COLLISIONROLLING FLUIDPHYSICAL REASONING VQACOUNTERFACTUAL & DYNAMICSQ[Collision Outcome]: What happens to the duck after the sphere strikes it?A: It is pushed across the surface and comes to rest next to the sphere; momentum transfers on contact.Q[Containment]: Where does the falling sphere come to rest?A: Inside the perforated container it drops into, held by the basket walls.Q[Counterfactual]: If the ramp were steeper, would the ball roll back past its start?A: Yes - a steeper climb stores more potential energy, so on return it overshoots the start point.Q[Buoyancy]: Does the block sink or float when dropped into the juice?A: It sinks through the liquid and settles at the bottom; the fluid only slows the descent.Q[Material Reasoning]: How does the glass surface change the ball's motion?A: Low friction lets it roll farther with little deceleration than on a matte surface.Q[Stability Prediction]: Will this stack of blocks stay upright?A: No - the stack is unstable and topples over before settling.Figure 26 Downstream tasks supported by MagicSim. Object, keypoint, and affordance annotations provide reusable
grounding signals for perception and interaction. Runtime scenes, robot states, task states, and language traces convert
the same supervision into robot-centric VQA examples covering object grounding, manipulation reasoning, navigation
reasoning, and task-state understanding. These outputs can also be repackaged as 3D instruction fine-tuning data for
language-grounded scene and action reasoning.

14 Discussion, Limitations, and Future Work

MagicSim is already operational across the major components required by an executable embodied-interaction
stack: heterogeneous world construction, deterministic batched execution, embodiment control, planning,
sensing, annotation, task MDPs, atomicskills, success-gated collection, serving, and policy-facing interfaces.
The remaining open questions are therefore not missing top-level modules, but limits that appear when these
components are run together in heterogeneous, contact-rich, long-horizon episodes. We organize the discussion
around three axes that can always be pushed further: more realistic simulation, stronger learned skills, and
more complex longer-horizon tasks.

14.1 Simulation Fidelity

MagicSim supports broad co-execution of rigid bodies, articulated objects, deformables, garments, fluids,
granular media, rope-like objects, avatars, robots, and sensors, but this should not be read as uniformly
metric-accurate physical prediction. Cross-solver contact can still produce interpenetration or solver-dependent
outcomes, especially for thin shells, composite or multi-material objects, dense contact, deformables, fluids,
and granular media. Position-based and particle-based methods are useful because they are stable and
executable at task scale, but they remain approximations rather than material-identification-grade models. In
practice, collision geometry, contact offsets, friction, damping, stiffness, particle spacing, and solver iterations
can still require asset-specific tuning, and large fine-particle scenes remain limited by memory, compute cost,
and stability. Physical realism is therefore a real source of headroom in the current system.

14.2 Policy Performance and Skill Coverage

MagicSim includes scripted atomicskills, planner-grounded primitives, learned controllers, model-predictive
backends, and policy-facing task interfaces, so the collection-to-training-to-deployment loop exists. The
limitation is that current behavior still falls short on harder regimes. Contact-rich manipulation, dexterous
manipulation, deformable-object interaction, humanoid loco-manipulation, and long-horizon multi-command
episodes expose failures in success rate, robustness, and generalization. The fixed skill vocabulary is inspectable
and reusable, but it only covers behaviors that have been engineered, trained, or explicitly provided as backends.
Geometric planning is strong for reachable poses, goalsets, collision-aware trajectories, navigation targets, and
gripper commands, but weaker when success depends on rolling, sliding, compliance, deformation history,
force regulation, or long chains of partially observed physical effects. The default success-gated corpus is also

50

OBJECTSKEYPOINTSAFFORDANCESROBOT VQA3D INSTRUCTION FINETUNINGQ[Task State Understanding]: Which drawer is the robot opening?A: The upper drawer. The gripper is positioned at the handle of the top drawer.Q[Object Grounding]: What objects are located near the navigation goal?A: A potted plant and the window area are near the navigation goal, with open floor space around them.Q[Task State Understanding]: Is the orange box open or closed?A: Open. Its flaps are unfolded.Q[Task State Understanding]: Are the objects on the bed clustered or sparsely distributed?A: Clustered. Multiple objects are grouped closely on the bed surface.Q[Object Grounding]: Which objects are highlighted by the blue bounding boxes in the room?A: The blue bounding boxes highlight multiple potted plants distributed around the room.Q[Manipulation Reasoning]: What is the robot doing with the cyan rectangular object, and why must it be aligned?A: The robot is inserting it into the matching slot; alignment helps it fit without collision.biased toward recoverable successes, so saved demonstrations should not be interpreted as an unbiased sample
of all attempted interactions.

14.3 Future Work

14.3.1 More Realistic Simulation

A first direction is to improve physical fidelity, especially contact and material behavior at solver boundaries.
This includes reducing penetration, improving thin-shell and composite-object behavior, expanding multi-
material parameterization, and making deformation, cutting, pouring, and granular interaction more faithful.
Longer term, unified or differentiable simulation layers could make heterogeneous episodes more stable,
measurable, and controllable under intervention.

14.3.2 Stronger Learned Skills

A second direction is stronger learned behavior both below and above the AtomicSkill interface. Below the
interface, learned and model-predictive backends should improve contact-rich manipulation, dexterous control,
deformable manipulation, whole-body loco-manipulation, and recovery. Above the interface, learned command
or skill selectors can choose what to try next while the runtime still grounds every world change through
executable planners, controllers, sensors, and task predicates.

14.3.3 More Complex, Longer-Horizon Tasks

A third direction is to make tasks longer, denser, and more compositional. HRI, tool-use-style manipula-
tion, deformable manipulation, mobile manipulation, humanoid loco-manipulation, autonomous-laboratory
operations, and camera-based exploration are already part of the system; the next step is to combine these
ingredients into episodes where success depends on persistent world state, recovery, cross-subtask dependencies,
and coordinated perception, navigation, manipulation, and human-facing behavior.

14.4 Broader Positioning

MagicSim is best understood as executable data infrastructure for embodied intelligence. It is not only
a physics engine, benchmark, data generator, or agent interface: its value is the shared episode substrate
that lets one rollout be used as an evaluation trial, a success-gated multimodal trajectory, a replayable
physical experiment, or an agent-facing interaction. The main future direction is therefore not to add isolated
components, but to keep pushing the three axes that make this substrate more useful: more realistic simulation,
stronger learned skills, and more complex longer-horizon tasks.

51

Appendix

A Extended Related Work

A.1 Robotics and physics simulators

Broader simulator literature spans GPU-native stacks, control-oriented engines, articulated-scene simulators,
and manipulation-focused frameworks. Isaac Gym and Isaac Lab prioritize throughput and multimodal robot
learning; MuJoCo remains a standard engine for dynamics-centric control research; SAPIEN and ManiSkill
emphasize articulated objects and contact-rich manipulation; and robosuite offers a modular MuJoCo-based
task framework [11–13, 21, 22, 97]. MagicSim should be compared to this layer as middleware above the
simulator, not as a replacement physics engine.

A.2 Embodied AI platforms and interactive environments

Embodied platforms differ in whether they emphasize navigation, household interaction, program execution,
or rearrangement. Habitat and Habitat 2.0 focus on embodied navigation and rearrangement; AI2-THOR and
ProcTHOR center interactive household environments and large-scale procedural generation; VirtualHome
represents activities as executable programs; iGibson and the BEHAVIOR family push toward realistic
household scenes with richer semantics; and the ThreeDWorld Transport Challenge explicitly couples perception
with task-and-motion planning [23–25, 98–103]. MagicSim overlaps with this family in interactivity, but the
paper should stress reusable simulation/data runtime structure rather than a new platform-only benchmark.

A.3 Robot manipulation benchmarks

Manipulation benchmarks vary in embodiment diversity, task semantics, demonstration availability, and
evaluation protocol. RLBench and Meta-World are widely used for multi-task manipulation; robosuite
provides modular tasks and reproducible interfaces; ManiSkill3 scales GPU-parallel simulation for broad
embodied robotics; CALVIN and LIBERO emphasize long-horizon or transfer-oriented manipulation; RoboCasa
focuses on realistic everyday household tasks; and ManiSkill-HAB connects low-level manipulation to home
rearrangement [26–28, 69, 97, 104–106]. In the supplement, MagicSim can be positioned as system-centric
infrastructure that can host benchmark tasks, rather than as only another manipulation benchmark.

A.4 Synthetic data and demonstration generation

Large robot datasets and data-generation systems now form a distinct line of work. Open X-Embodiment
standardizes cross-robot data; DROID and BridgeData V2 show the value of broad real-robot corpora;
MimicGen expands demonstrations from a small human seed set; RoboMimic provides a common offline-
learning substrate; BC-Z studies zero-shot generalization from broad imitation data; VIMA uses simulation-
scale expert trajectories; and RoboCasa shows how realistic household simulation can feed large synthetic
datasets [28–33, 107, 108]. MagicSim should be framed here not primarily as a dataset paper, but as a
generator of replayable, success-gated, multimodal trajectories.

A.5 Motion planning, TAMP, and skill-based control

Planning literature provides the algorithmic and software basis for executing structured robot behavior. OMPL
and MoveIt offer general motion-planning infrastructure; hierarchical task-and-motion planning formalizes the
coupling of symbolic and continuous reasoning; recent surveys organize optimization-based TAMP; and cuRobo
demonstrates GPU-accelerated collision-aware motion generation [34–38]. The supplementary comparison
should make clear that MagicSim’s contribution is not a new planning algorithm per se, but a runtime
architecture in which planner queries, skill execution, and simulator state share one system interface.

52

A.6 Multimodal annotation and synthetic perception data

Synthetic-data systems often focus on rendering and dense computer-vision annotations rather than robot-
executable task traces. BlenderProc and Kubric are general-purpose pipelines for scalable synthetic image
generation; GRADE uses Isaac Sim to create repeatable, richly annotated dynamic scenes; and BEHAVIOR-1K
demonstrates how large embodied environments can expose rich semantic and physical structure [25, 109–111].
MagicSim’s relation to this literature is that it extends beyond generic RGB-D, segmentation, or geometry
labels toward robot-learning-specific annotations attached to executable trajectories and task state.

A.7 Language, VLM, VLA, and embodied agents

Embodied language and foundation-policy work spans instruction-following benchmarks, LLM-planned robotics,
embodied multimodal models, and open-source VLAs. ALFRED and TEACh study instruction following and
dialogue in simulated homes; SayCan and Inner Monologue ground language in skill feedback; PaLM-E and
RT-2 connect large multimodal models to embodied control; OpenVLA and Octo provide open policy baselines;
and MineDojo and Voyager frame long-horizon agentic interaction in open-ended worlds [40–42, 112–118].
MagicSim should be positioned as simulator-side infrastructure for such agents, not as a replacement for their
policy architectures.

A.8 Reproducibility, determinism, and simulation state replay

Many simulation systems support seeding, procedural generation, or reproducible task instantiation, but
the granularity of reproducibility differs substantially. Habitat 2.0, ProcTHOR, and the BEHAVIOR line
support controlled generation of embodied tasks and layouts; GRADE explicitly studies repeatable playback
of recorded experiments inside simulation; and robosuite emphasizes reproducible learning environments
and unified interfaces [25, 97, 98, 100, 102, 111]. This subsection is the right place to sharpen MagicSim’s
distinction between simple seed control and manager-level snapshot/reset/replay semantics.

A.9 Serving and distributed simulation

Parallel and distributed simulation systems focus on throughput and learner–simulator coupling. Isaac Gym
and Isaac Lab emphasize batched GPU simulation; ManiSkill3 similarly targets large-scale GPU-parallel
robotics; Habitat and Galactic demonstrate fast embodied training at scale; and RLlib Flow formalizes
distributed RL as a dataflow problem [12, 21, 23, 69, 119, 120]. MagicSim can be positioned here as moving
from vectorized simulation toward simulator-as-a-service, where the same runtime can back local training,
scripted collection, replay, and remote clients.

References

[1] Physical Intelligence. Pi-0.7: A steerable generalist robotic foundation model with emergent capabilities. arXiv

preprint, 2026. CorpusID: 287607456.

[2] Physical Intelligence, Kevin Black, Noah Brown, James Darpinian, Karan Dhabalia, Danny Driess, Adnan Esmail,
Michael Equi, Chelsea Finn, Niccolo Fusai, Manuel Y. Galliker, Dibya Ghosh, Lachy Groom, Karol Hausman,
Brian Ichter, Szymon Jakubczak, Tim Jones, Liyiming Ke, Devin LeBlanc, Sergey Levine, Adrian Li-Bell, Mohith
Mothukuri, Suraj Nair, Karl Pertsch, Allen Z. Ren, Lucy Xiaoyang Shi, Laura Smith, Jost Tobias Springenberg,
Kyle Stachowicz, James Tanner, Quan Vuong, Homer Rich Walke, Anna Walling, Haohuan Wang, Lili Yu, and
Ury Zhilinsky. π0.5: a vision-language-action model with open-world generalization. ArXiv, abs/2504.16054,
2025. URL https://api.semanticscholar.org/CorpusID:277993634.

[3] Generalist AI Team. Gen-0: Embodied foundation models that scale with physical interaction. Generalist AI

Blog, 2025. November 4, 2025.

[4] NVIDIA. Gr00t n1: An open foundation model for generalist humanoid robots. arXiv:2503.14734, 2025.

[5] Seonghyeon Ye, Yunhao Ge, Kaiyuan Zheng, and Joel Jang. World action models are zero-shot policies.

arXiv:2602.15922, 2026.

53

[6] Tianyuan Yuan, Zibin Dong, Yicheng Liu, and Hang Zhao. Fast-wam: Do world action models need test-time

future imagination?, 2026. URL https://arxiv.org/abs/2603.16666.

[7] Guo Ye, Zexi Zhang, Xu Zhao, Shang Wu, Haoran Lu, Shihan Lu, and Han Liu. Learning to feel the future:
Dreamtacvla for contact-rich manipulation. ArXiv, abs/2512.23864, 2025. URL https://api.semanticscholar.
org/CorpusID:284350273.

[8] Kangrui Wang, Pingyue Zhang, Zihan Wang, Yaning Gao, Linjie Li, Qineng Wang, Hanyang Chen, Chi Wan,
Yiping Lu, Zhengyuan Yang, Lijuan Wang, Ranjay Krishna, Jiajun Wu, Fei-Fei Li, Yejin Choi, and Manling
Li. Vagen: Reinforcing world model reasoning for multi-turn vlm agents. ArXiv, abs/2510.16907, 2025. URL
https://api.semanticscholar.org/CorpusID:282210682.

[9] Zihan Wang, Kangrui Wang, Qineng Wang, Pingyue Zhang, Linjie Li, Zhengyuan Yang, Kefan Yu, Minh Nhat
Nguyen, Licheng Liu, Eli Gottlieb, Monica S. Lam, Yiping Lu, Kyunghyun Cho, Jiajun Wu, Fei-Fei Li, Lijuan
Wang, Yejin Choi, and Manling Li. Ragen: Understanding self-evolution in llm agents via multi-turn reinforcement
learning. ArXiv, abs/2504.20073, 2025. URL https://api.semanticscholar.org/CorpusID:278170861.

[10] Pascale Fung, Yoram Bachrach, Asli Celikyilmaz, Kamalika Chaudhuri, Delong Chen, Willy Chung, Emmanuel
Dupoux, Hervé Jégou, Alessandro Lazaric, Arjun Majumdar, Andrea Madotto, Franziska Meier, Florian Metze,
Théo Moutakanni, Juan Pino, Basile Terver, Joseph Tighe, and Jitendra Malik. Embodied ai agents: Modeling
the world. ArXiv, abs/2506.22355, 2025. URL https://api.semanticscholar.org/CorpusID:280010887.

[11] Emanuel Todorov, Tom Erez, and Yuval Tassa. MuJoCo: A physics engine for model-based control. In IEEE/RSJ

International Conference on Intelligent Robots and Systems, 2012.

[12] Viktor Makoviychuk, Lukasz Wawrzyniak, Yunrong Guo, Michelle Lu, Kier Storey, Miles Macklin, David Hoeller,
Nikita Rudin, Arthur Allshire, Ankur Handa, and Gavriel State. Isaac Gym: High performance GPU-based
physics simulation for robot learning. arXiv preprint arXiv:2108.10470, 2021.

[13] Fanbo Xiang, Yuzhe Qin, Kaichun Mo, Yikuan Xia, Hao Zhu, Fangchen Liu, Minghua Liu, Hanxiao Jiang, Yifu
Yuan, He Wang, Li Yi, Angel X. Chang, Leonidas J. Guibas, and Hao Su. SAPIEN: A simulated part-based
interactive environment. In IEEE/CVF Conference on Computer Vision and Pattern Recognition, 2020.

[14] Yue Chen, Muqing Jiang, Kaifeng Zheng, Jiaqi Liang, Chenrui Tie, Haoran Lu, Ruihai Wu, and Hao Dong.
Learning part-aware dense 3d feature field for generalizable articulated object manipulation, 2026. URL
https://arxiv.org/abs/2602.14193.

[15] Yan Shen, Ruihai Wu, Yubin Ke, Xinyuan Song, Zeyi Li, Xiaoqi Li, Hongwei Fan, Haoran Lu, and Hao Dong.
Biassemble: Learning collaborative affordance for bimanual geometric assembly. ArXiv, abs/2506.06221, 2025.
URL https://api.semanticscholar.org/CorpusID:279244917.

[16] Yitong Li, Ruihai Wu, Haoran Lu, Chuanruo Ning, Yan Shen, Guanqi Zhan, and Hao Dong. Broadcasting
support relations recursively from local dynamics for object retrieval in clutters. ArXiv, abs/2406.02283, 2024.
URL https://api.semanticscholar.org/CorpusID:270226492.

[17] Ruihai Wu, Haozhe Chen, Mingtong Zhang, Haoran Lu, Yitong Li, and Yunzhu Li. Neural dynamics augmented
diffusion policy. In 2025 IEEE International Conference on Robotics and Automation (ICRA), pages 13234–13241,
2025. doi: 10.1109/ICRA55743.2025.11128651.

[18] Haoran Lu, Ruihai Wu, Yitong Li, Sijie Li, Ziyu Zhu, Chuanruo Ning, Yan Shen, Longzan Luo, Yuan-
pei Chen, and Hao Dong. Garmentlab: A unified simulation and benchmark for garment manipula-
tion.
In A. Globerson, L. Mackey, D. Belgrave, A. Fan, U. Paquet, J. Tomczak, and C. Zhang, editors,
Advances in Neural Information Processing Systems, volume 37, pages 11866–11903. Curran Associates,
Inc., 2024. doi: 10.52202/079017-0379. URL https://proceedings.neurips.cc/paper_files/paper/2024/file/
15f80ec0fed53885d2ca6272edb96ede-Paper-Conference.pdf.

[19] Haoran Lu, Yitong Li, Ruihai Wu, Chuanruo Ning, Yan Shen, and Hao Dong. Unigarment: A unified simulation
and benchmark for garment manipulation, 2025. URL https://api.semanticscholar.org/CorpusID:275782214.
Manuscript.

[20] Haoran Geng, Feishi Wang, Songlin Wei, Yuyang Li, Bangjun Wang, Boshi An, Charlie Tianyue Cheng, Haozhe
Lou, Peihao Li, Yen-Jen Wang, et al. Roboverse: Towards a unified platform, dataset and benchmark for scalable
and generalizable robot learning. arXiv preprint arXiv:2504.18904, 2025.

[21] Mayank Mittal, Pascal Roth, James Tigue, Antoine Richard, Octi Zhang, Peter Du, et al.

Isaac lab: A
gpu-accelerated simulation framework for multi-modal robot learning. arXiv preprint arXiv:2511.04831, 2025.

54

[22] Jiayuan Gu, Fanbo Xiang, Xuanlin Li, Zhan Ling, Xiqiang Liu, Tongzhou Mu, Yihe Tang, Stone Tao, et al.
Maniskill2: A unified benchmark for generalizable manipulation skills. arXiv preprint arXiv:2302.04659, 2023.

[23] Manolis Savva, Abhishek Kadian, Oleksandr Maksymets, Yili Zhao, Erik Wijmans, Bhavana Jain, Julian Straub,
Jia Liu, Vladlen Koltun, Jitendra Malik, Devi Parikh, and Dhruv Batra. Habitat: A platform for embodied ai
research. arXiv preprint arXiv:1904.01201, 2019.

[24] Bokui Shen, Fei Xia, Chengshu Li, Roberto Martín-Martín, Linxi Fan, Guanzhi Wang, Claudia Pérez-D’Arpino,
Shyamal Buch, Sanjana Srivastava, Lyne P. Tchapmi, Micael E. Tchapmi, Kent Vainio, Josiah Wong, Li Fei-Fei,
and Silvio Savarese. igibson 1.0: A simulation environment for interactive tasks in large realistic scenes. arXiv
preprint arXiv:2012.02924, 2020.

[25] Chengshu Li, Ruohan Zhang, Josiah Wong, Cem Gokmen, Sanjana Srivastava, Roberto Martín-Martín, Chen
Wang, Gabrael Levine, Wensi Ai, Benjamin Martinez, Hang Yin, Michael Lingelbach, Minjune Hwang, Ayano
Hiranaka, Sujay Garlanka, Arman Aydin, Sharon Lee, Jiankai Sun, Mona Anvari, Manasi Sharma, Dhruva
Bansal, Samuel Hunter, Kyu-Young Kim, Alan Lou, Caleb R Matthews, Ivan Villa-Renteria, Jerry Huayang
Tang, Claire Tang, Fei Xia, Yunzhu Li, Silvio Savarese, Hyowon Gweon, C. Karen Liu, Jiajun Wu, and Li Fei-Fei.
Behavior-1k: A human-centered, embodied ai benchmark with 1,000 everyday activities and realistic simulation.
arXiv preprint arXiv:2403.09227, 2024.

[26] Stephen James, Zicong Ma, David Rovick Arrojo, and Andrew J. Davison. RLBench: The robot learning

benchmark & learning environment. arXiv preprint arXiv:1909.12271, 2019.

[27] Oier Mees, Lukas Hermann, Erick Rosete-Beas, and Wolfram Burgard. CALVIN: A benchmark for language-
conditioned policy learning for long-horizon robot manipulation tasks. arXiv preprint arXiv:2112.03227, 2021.

[28] Soroush Nasiriany, Abhiram Maddukuri, Lance Zhang, Adeet Parikh, Aaron Lo, Abhishek Joshi, Ajay Mandlekar,
and Yuke Zhu. RoboCasa: Large-scale simulation of everyday tasks for generalist robots. arXiv preprint
arXiv:2406.02523, 2024.

[29] Open X-Embodiment Collaboration. Open x-embodiment: Robotic learning datasets and RT-X models. arXiv

preprint arXiv:2310.08864, 2023.

[30] Homer Walke, Kevin Black, Abraham Lee, Moo Jin Kim, Max Du, Chongyi Zheng, Tony Zhao, Philippe
Hansen-Estruch, Quan Vuong, Andre He, Vivek Myers, Kuan Fang, Chelsea Finn, and Sergey Levine. Bridgedata
v2: A dataset for robot learning at scale. arXiv preprint arXiv:2308.12952, 2023.

[31] Alexander Khazatsky, Karl Pertsch, Suraj Nair, Ashwin Balakrishna, Sudeep Dasari, Siddharth Karamcheti,
Soroush Nasiriany, Mohan Kumar Srirama, et al. DROID: A large-scale in-the-wild robot manipulation dataset.
arXiv preprint arXiv:2403.12945, 2024.

[32] Yunfan Jiang, Agrim Gupta, Zichen Zhang, Guanzhi Wang, Yongqiang Dou, Yanjun Chen, Li Fei-Fei, Anima
Anandkumar, Yuke Zhu, and Linxi Fan. Vima: General robot manipulation with multimodal prompts. arXiv
preprint arXiv:2210.03094, 2022.

[33] Ajay Mandlekar, Soroush Nasiriany, Bowen Wen, Iretiayo Akinola, Yashraj Narang, Linxi Fan, Yuke Zhu, and
Dieter Fox. Mimicgen: A data generation system for scalable robot learning using human demonstrations. In
Conference on Robot Learning (CoRL), 2023. arXiv:2310.17596.

[34] Ioan A. Sucan, Mark Moll, and Lydia E. Kavraki. The open motion planning library. IEEE Robotics &

Automation Magazine, 19(4):72–82, 2012.

[35] David Coleman, Ioan Sucan, Sachin Chitta, and Nikolaus Correll. Reducing the barrier to entry of complex

robotic software: a MoveIt! case study. arXiv preprint arXiv:1404.3785, 2014.

[36] Leslie Pack Kaelbling and Tomás Lozano-Pérez. Hierarchical task and motion planning in the now. In 2011

IEEE International Conference on Robotics and Automation, pages 1470–1477, 2011.

[37] Zhigen Zhao, Shuo Cheng, Yan Ding, Ziyi Zhou, Shiqi Zhang, Danfei Xu, and Ye Zhao. A survey of optimization-
based task and motion planning: From classical to learning approaches. arXiv preprint arXiv:2404.02817,
2024.

[38] Balakumar Sundaralingam, Siva Kumar Sastry Hari, Adam Fishman, Caelan Garrett, Karl Van Wyk, Valts
Blukis, Alexander Millane, Helen Oleynikova, Ankur Handa, Fabio Ramos, Nathan Ratliff, and Dieter Fox.
curobo: Parallelized collision-free minimum-jerk robot motion generation. arXiv preprint arXiv:2310.17274,
2023.

55

[39] Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Joseph Dabis, Chelsea Finn, Keerthana
Gopalakrishnan, Karol Hausman, Alex Herzog, Jasmine Hsu, et al. RT-1: Robotics transformer for real-world
control at scale. arXiv preprint arXiv:2212.06817, 2022.

[40] Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Xi Chen, Krzysztof Choromanski, Tianli
Ding, Danny Driess, et al. RT-2: Vision-language-action models transfer web knowledge to robotic control. arXiv
preprint arXiv:2307.15818, 2023.

[41] Michael Ahn, Anthony Brohan, Noah Brown, Yevgen Chebotar, Omar Cortes, Byron David, Chelsea Finn,
Chuyuan Fu, Keerthana Gopalakrishnan, Karol Hausman, et al. Do as i can, not as i say: Grounding language
in robotic affordances. arXiv preprint arXiv:2204.01691, 2022.

[42] Danny Driess, Fei Xia, Mehdi S. M. Sajjadi, Corey Lynch, Aakanksha Chowdhery, Brian Ichter, Ayzaan Wahid,
Jonathan Tompson, Quan Vuong, Tianhe Yu, et al. PaLM-E: An embodied multimodal language model. arXiv
preprint arXiv:2303.03378, 2023.

[43] Mayank Mittal, Calvin Yu, Qinxi Yu, Jingzhou Liu, Nikita Rudin, David Hoeller, Jia Lin Yuan, Ritvik Singh,
Yunrong Guo, Hammad Mazhar, Ajay Mandlekar, Buck Babich, Gavriel State, Marco Hutter, and Animesh
Garg. Orbit: A unified simulation framework for interactive robot learning environments. IEEE Robotics and
Automation Letters, 8(6):3740–3747, 2023.

[44] Josh Tobin, Rachel Fong, Alex Ray, Jonas Schneider, Wojciech Zaremba, and Pieter Abbeel. Domain random-
ization for transferring deep neural networks from simulation to the real world. In IEEE/RSJ International
Conference on Intelligent Robots and Systems (IROS), pages 23–30, 2017.

[45] Greg Brockman, Vicki Cheung, Ludwig Pettersson, Jonas Schneider, John Schulman, Jie Tang, and Wojciech

Zaremba. Openai gym. arXiv preprint arXiv:1606.01540, 2016.

[46] Guangming Sheng, Chi Zhang, Zilingfeng Ye, Xibin Wu, Wang Zhang, Ru Zhang, Yanghua Peng, Haibin Lin,
and Chuan Wu. Hybridflow: A flexible and efficient RLHF framework. In Proceedings of the Twentieth European
Conference on Computer Systems (EuroSys), 2025. The verl library implements HybridFlow.

[47] Chao Yu, Yuanqing Wang, Zhen Guo, Hao Lin, Si Xu, Hongzhi Zang, Quanlu Zhang, Yongji Wu, Chunyang
Zhu, Junhao Hu, et al. RLinf: Flexible and efficient large-scale reinforcement learning via macro-to-micro flow
transformation. arXiv preprint arXiv:2509.15965, 2025.

[48] Nicholas Pfaff, Thomas Cohn, Sergey Zakharov, Rick Cory, and Russ Tedrake. Scenesmith: Agentic generation

of simulation-ready indoor scenes, 2026. URL https://arxiv.org/abs/2602.09153.

[49] Yue Yang, Fan-Yun Sun, Luca Weihs, Eli VanderBilt, Alvaro Herrasti, Winson Han, Jiajun Wu, Nick Haber,
Ranjay Krishna, Lingjie Liu, Chris Callison-Burch, Mark Yatskar, Aniruddha Kembhavi, and Christopher Clark.
Holodeck: Language guided generation of 3d embodied ai environments. In Proceedings of the IEEE/CVF
Conference on Computer Vision and Pattern Recognition (CVPR), pages 16227–16237, 2024.

[50] Stéphane Caron, Yann De Mont-Marin, Rohan Budhiraja, Seung Hyeon Bang, Ivan Domrachev, Simeon
Nedelchev, Peter Du, Adrien Escande, Joris Vaillant, Bruce Wingo, Santosh Patapati, Daniel San José Pro,
and Nicolas Guillermo Marticorena Vidal. Pink: Python inverse kinematics based on Pinocchio, 2026. URL
https://github.com/stephane-caron/pink.

[51] Qingwei Ben, Feiyu Jia, Jia Zeng, Junting Dong, Dahua Lin, and Jiangmiao Pang. HOMIE: Humanoid

loco-manipulation with isomorphic exoskeleton cockpit. arXiv preprint arXiv:2502.13013, 2025.

[52] Huihua Zhao*, Rafael Cathomen*, Lionel Gulich, Wei Liu, Efe Arda Ongan, Michael Lin, Shalin Jain, Soha
Pouya, and Yan Chang. Agile: A comprehensive workflow for humanoid loco-manipulation learning, 2026. URL
https://arxiv.org/abs/2603.20147.

[53] Dieter Fox, Wolfram Burgard, and Sebastian Thrun. The dynamic window approach to collision avoidance.

IEEE Robotics & Automation Magazine, 4(1):23–33, 1997.

[54] Lianmin Zheng, Liangsheng Yin, Zhiqiang Xie, Chuyue Sun, Jeff Huang, Cody Hao Yu, Shiyi Cao, Christos
Kozyrakis, Ion Stoica, Joseph E. Gonzalez, Clark Barrett, and Ying Sheng. SGLang: Efficient execution of
structured language model programs. In Advances in Neural Information Processing Systems, 2024.

[55] Qineng Wang, Baiqiao Yin, Pingyue Zhang, Jianshu Zhang, Kangrui Wang, Zihan Wang, Jieyu Zhang, Keshigeyan
Chandrasegaran, Han Liu, Ranjay Krishna, Saining Xie, Jiajun Wu, Li Fei-Fei, and Manling Li. MindCube:
Spatial mental modeling from limited views. arXiv preprint arXiv:2506.21458, 2025.

56

[56] Haoran Lu, Shang Wu, Jianshu Zhang, Maojiang Su, Guo Ye, Chenwei Xu, Lie Lu, Pranav Maneriker, Fan Du,
Manling Li, Zhaoran Wang, and Han Liu. Phys4D: Fine-grained physics-consistent 4D modeling from video
diffusion. arXiv preprint arXiv:2603.03485, 2026.

[57] Wenzhen Yuan, Siyuan Dong, and Edward H. Adelson. GelSight: High-resolution robot tactile sensors for

estimating geometry and force. Sensors, 17(12):2762, 2017. doi: 10.3390/s17122762.

[58] Zilin Si and Wenzhen Yuan. Taxim: An example-based simulation model for GelSight tactile sensors. IEEE

Robotics and Automation Letters, 7(2):2361–2368, 2022.

[59] Iretiayo Akinola, Jie Xu, Jan Carius, Dieter Fox, and Yashraj Narang. TacSL: A library for visuotactile sensor

simulation and learning. arXiv preprint arXiv:2408.06506, 2024.

[60] Binghao Huang and Yunzhu Li. FlexiTac: A low-cost, open-source, scalable tactile sensing solution for robotic

systems. arXiv preprint arXiv:2604.28156, 2026.

[61] Lei Su, Zhijie Peng, Renyuan Ren, Shengping Mao, Juan Du, Kaifeng Zhang, and Xuezhou Zhu. Tacmap: Bridging
the tactile sim-to-real gap via geometry-consistent penetration depth map. arXiv preprint arXiv:2602.21625,
2026.

[62] AnnotateAnything Team. Annotateanything: Automatic annotation of 3D assets for robot manipulation, 2026.

Companion paper, under review. Citation to be updated upon publication.

[63] Shuai Bai, Yuheng Cai, Ruisheng Chen, Kai Chen, Xi Chen, Zesen Cheng, Lianghao Deng, Wenyu Ding, Chang

Gao, Chunjiang Ge, et al. Qwen3-VL technical report. arXiv preprint arXiv:2511.21631, 2025.

[64] Qwen Team. Qwen3.5: Towards native multimodal agents. Official release post, February 2026. URL https:

//www.alibabacloud.com/blog/602894. Accessed 2026-06-10.

[65] Charles Ruizhongtai Qi, Li Yi, Hao Su, and Leonidas J. Guibas. PointNet++: Deep hierarchical feature learning
on point sets in a metric space. In Advances in Neural Information Processing Systems (NeurIPS), 2017.

[66] Changfeng Ma, Yang Li, Xinhao Yan, Jiachen Xu, Yunhan Yang, Chunshi Wang, Zibo Zhao, Yanwen Guo, Zhuo
Chen, and Chunchao Guo. P3-SAM: Native 3D part segmentation. arXiv preprint arXiv:2509.06784, 2025.

[67] Xinhao Yan, Jiachen Xu, Yang Li, Changfeng Ma, Yunhan Yang, Chunshi Wang, Zibo Zhao, Zeqiang Lai, Yunfei
Zhao, Zhuo Chen, et al. X-Part: High fidelity and structure coherent shape decomposition. arXiv preprint
arXiv:2509.08643, 2025.

[68] NVIDIA. NVIDIA Isaac Sim documentation. https://docs.isaacsim.omniverse.nvidia.com, 2025. Accessed

2026-06-10.

[69] Stone Tao, Fanbo Xiang, Arth Shukla, Yuzhe Qin, Xander Hinrichsen, Xiaodi Yuan, Chen Bao, Xinsong Lin,
Yulin Liu, Tse-kai Chan, Yuan Gao, Xuanlin Li, Tongzhou Mu, Nan Xiao, Arnav Gurha, Viswesh Nagaswamy
Rajesh, Yong Woo Choi, Yen-Ru Chen, Zhiao Huang, Roberto Calandra, Rui Chen, Shan Luo, and Hao Su.
Maniskill3: Gpu parallelized robotics simulation and rendering for generalizable embodied ai. In Robotics:
Science and Systems (RSS), 2025. arXiv:2410.00425.

[70] Xavier Puig, Eric Undersander, Andrew Szot, Mikael Dallaire Cote, Tsung-Yen Yang, Ruslan Partsey, Ruta Desai,
Alexander William Clegg, Michal Hlavac, So Yeon Min, Vladimír Vondruš, Theophile Gervet, Vincent-Pierre
Berges, John M. Turner, Oleksandr Maksymets, Zsolt Kira, Mrinal Kalakrishnan, Jitendra Malik, Devendra Singh
Chaplot, Unnat Jain, Dhruv Batra, Akshara Rai, and Roozbeh Mottaghi. Habitat 3.0: A co-habitat for humans,
avatars and robots. arXiv preprint arXiv:2310.13724, 2023.

[71] Nikita Rudin, David Hoeller, Philipp Reist, and Marco Hutter. Learning to walk in minutes using massively
parallel deep reinforcement learning. In Proceedings of the 5th Conference on Robot Learning (CoRL), volume
164 of Proceedings of Machine Learning Research, pages 91–100. PMLR, 2022.

[72] Tony Z. Zhao, Vikash Kumar, Sergey Levine, and Chelsea Finn. Learning fine-grained bimanual manipulation

with low-cost hardware. In Robotics: Science and Systems (RSS), 2023. arXiv:2304.13705.

[73] Zhenyu Jiang, Yuqi Xie, Kevin Lin, Zhenjia Xu, Weikang Wan, Ajay Mandlekar, Linxi Fan, and Yuke Zhu.
Dexmimicgen: Automated data generation for bimanual dexterous manipulation via imitation learning. In IEEE
International Conference on Robotics and Automation (ICRA), 2025. arXiv:2410.24185.

[74] Caelan Garrett, Ajay Mandlekar, Bowen Wen, and Dieter Fox. Skillmimicgen: Automated demonstration genera-
tion for efficient skill learning and deployment. In Conference on Robot Learning (CoRL), 2024. arXiv:2410.18907.

57

[75] Masoud Moghani, Mahdi Azizian, Animesh Garg, Yuke Zhu, Sean Huver, and Ajay Mandlekar. Softmimicgen:
A data generation system for scalable robot learning in deformable object manipulation. arXiv preprint
arXiv:2603.25725, 2026.

[76] Tianxing Chen, Zanxin Chen, Baijun Chen, Zijian Cai, Yibin Liu, Qiwei Liang, Zixuan Li, Xianliang Lin, Yiheng
Ge, Zhenyu Gu, Weiliang Deng, Yubin Guo, Tian Nian, Xuanbing Xie, Qiangyu Chen, Kailun Su, Tianling Xu,
Guodong Liu, Mengkang Hu, Huan-ang Gao, Kaixuan Wang, Zhixuan Liang, Yusen Qin, Xiaokang Yang, Ping
Luo, and Yao Mu. Robotwin 2.0: A scalable data generator and benchmark with strong domain randomization
for robust bimanual robotic manipulation. arXiv preprint arXiv:2506.18088, 2025.

[77] Lirui Wang, Yiyang Ling, Zhecheng Yuan, Mohit Shridhar, Chen Bao, Yuzhe Qin, Bailin Wang, Huazhe Xu,
and Xiaolong Wang. Gensim: Generating robotic simulation tasks via large language models. In International
Conference on Learning Representations (ICLR), 2024. arXiv:2310.01361.

[78] Pu Hua, Minghuan Liu, Annabella Macaluso, Yunfeng Lin, Weinan Zhang, Huazhe Xu, and Lirui Wang. Gensim2:
Scaling robot data generation with multi-modal and reasoning llms. In Conference on Robot Learning (CoRL),
2024. arXiv:2410.03645.

[79] Yufei Wang, Zhou Xian, Feng Chen, Tsun-Hsuan Wang, Yian Wang, Katerina Fragkiadaki, Zackory Erickson,
David Held, and Chuang Gan. Robogen: Towards unleashing infinite data for automated robot learning via
generative simulation. arXiv preprint arXiv:2311.01455, 2023.

[80] Zhi Jing, Siyuan Yang, Jicong Ao, Ting Xiao, Yugang Jiang, and Chenjia Bai. Humanoidgen: Data generation
for bimanual dexterous manipulation via llm reasoning. In Advances in Neural Information Processing Systems
(NeurIPS), 2025. arXiv:2507.00833.

[81] Tao Chen, Jie Xu, and Pulkit Agrawal. Learning dexterous in-hand manipulation, 2021. Reference for learned

dexterous in-hand manipulation policies.

[82] Hien Bui, Yufeiyang Gao, Haoran Yang, Eric Cui, Siddhant Mody, Brian Acosta, Thomas Stephen Felix,
Bibit Bianchini, and Michael Posa. Push anything: Single- and multi-object pushing from first sight with
contact-implicit mpc, 2026. URL https://arxiv.org/abs/2510.19974.

[83] Chuanruo Ning, Ruihai Wu, Haoran Lu, Kaichun Mo, and Hao Dong. Where2explore: Few-shot affordance
learning for unseen novel categories of articulated objects, 2023. URL https://arxiv.org/abs/2309.07473.

[84] Ruihai Wu, Yan Zhao, Kaichun Mo, Zizheng Guo, Yian Wang, Tianhao Wu, Qingnan Fan, Xuelin Chen, Leonidas
Guibas, and Hao Dong. Vat-mart: Learning visual action trajectory proposals for manipulating 3d articulated
objects, 2022. URL https://arxiv.org/abs/2106.14440.

[85] Yan Shen, Ruihai Wu, Yubin Ke, Xinyuan Song, Zeyi Li, Xiaoqi Li, Hongwei Fan, Haoran Lu, and Hao
dong. Biassemble: Learning collaborative affordance for bimanual geometric assembly, 2025. URL https:
//arxiv.org/abs/2506.06221.

[86] Yue Chen, Muqing Jiang, Kaifeng Zheng, Jiaqi Liang, Chenrui Tie, Haoran Lu, Ruihai Wu, and Hao Dong.
PA3FF: Learning part-aware dense 3d feature field for generalizable articulated object manipulation. In The
Fourteenth International Conference on Learning Representations, 2026. doi: 10.48550/arXiv.2602.14193. URL
https://openreview.net/forum?id=qXfRXfAHOK. ICLR 2026 Poster.

[87] Caelan Reed Garrett, Rohan Chitnis, Rachel Holladay, Beomjoon Kim, Tom Silver, Leslie Pack Kaelbling,
and Tomás Lozano-Pérez. Integrated task and motion planning. Annual Review of Control, Robotics, and
Autonomous Systems, 4:265–293, 2021. arXiv:2010.01083.

[88] Weidong Li, Yudie Hu, Yong Zhou, and Duc Truong Pham. Safe human–robot collaboration for industrial settings:
A survey. Journal of Intelligent Manufacturing, 35(5):2235–2261, 2024. doi: 10.1007/s10845-023-02159-4.

[89] Pierre Sermanet, Anirudha Majumdar, Alex Irpan, Dmitry Kalashnikov, and Vikas Sindhwani. Generating robot
constitutions & benchmarks for semantic safety. In Conference on Robot Learning (CoRL), 2025. arXiv:2503.08663.

[90] Gary Tom, Stefan P. Schmid, Sterling G. Baird, Yang Cao, Kourosh Darvish, Han Hao, Stanley Lo, Sergio
Pablo-García, Ella M. Rajaonson, Marta Skreta, Naruki Yoshikawa, Samantha Corapi, Gun Deniz Akkoc, Felix
Strieth-Kalthoff, Martin Seifrid, and Alán Aspuru-Guzik. Self-driving laboratories for chemistry and materials
science. Chemical Reviews, 124(16):9633–9732, 2024. doi: 10.1021/acs.chemrev.4c00055.

[91] Zhenyu Pan, Yiting Zhang, Zhuo Liu, Yolo Yunlong Tang, Zeliang Zhang, Haozheng Luo, Yuwei Han, Jianshu
Zhang, Dennis Wu, Hong-Yu Chen, Haoran Lu, Haoyang Fang, Manling Li, Chenliang Xu, Philip S. Yu,
and Han Liu. AdvEvo-MARL: Shaping internalized safety through adversarial co-evolution in multi-agent

58

reinforcement learning. arXiv preprint arXiv:2510.01586, 2025. doi: 10.48550/arXiv.2510.01586. URL https:
//arxiv.org/abs/2510.01586. Accepted to ICML 2026.

[92] Zhenyu Pan, Yutong Zhang, Jianshu Zhang, Haoran Lu, Haozheng Luo, Yuwei Han, Philip S. Yu, Manling Li,
and Han Liu. FairReason: Balancing reasoning and social bias in MLLMs. arXiv preprint arXiv:2507.23067,
2025. doi: 10.48550/arXiv.2507.23067. URL https://arxiv.org/abs/2507.23067. Accepted to the Trustworthy
Foundation Models Workshop at ICCV 2025.

[93] Jianshu Zhang, Yijiang Li, Huifeixin Chen, Haoran Lu, Letian Xue, Bingyang Wang, and Han Liu. Spacenum:

Revisiting spatial numerical understanding in vlms, 2026. URL https://arxiv.org/abs/2605.23898.

[94] Ruihai Wu, Haoran Lu, Yiyan Wang, Yubo Wang, and Hao Dong. Unigarmentmanip: A unified framework
for category-level garment manipulation via dense visual correspondence. 2024 IEEE/CVF Conference on
Computer Vision and Pattern Recognition (CVPR), pages 16340–16350, 2024. URL https://api.semanticscholar.
org/CorpusID:269757227.

[95] Xiaoqi Li, Yanzi Wang, Yan Shen, Ponomarenko Iaroslav, Haoran Lu, Qianxu Wang, Boshi An, Jiaming Liu,
and Hao Dong. Imagemanip: Image-based robotic manipulation with affordance-guided next view selection,
2023. URL https://arxiv.org/abs/2310.09069.

[96] Jianshu Zhang, Chengxuan Qian, Haosen Sun, Haoran Lu, Dingcheng Wang, Letian Xue, and Han Liu. Progresslm:

Towards progress reasoning in vision-language models, 2026. URL https://arxiv.org/abs/2601.15224.

[97] Yuke Zhu, Josiah Wong, Ajay Mandlekar, Roberto Martín-Martín, Abhishek Joshi, Kevin Lin, Abhiram
Maddukuri, Soroush Nasiriany, and Yifeng Zhu. robosuite: A modular simulation framework and benchmark for
robot learning. arXiv preprint arXiv:2009.12293, 2020.

[98] Andrew Szot, Alex Clegg, Eric Undersander, Erik Wijmans, Yili Zhao, John Turner, Noah Maestre, Mustafa
Mukadam, Devendra Singh Chaplot, Oleksandr Maksymets, et al. Habitat 2.0: Training home assistants to
rearrange their habitat. arXiv preprint arXiv:2106.14405, 2021.

[99] Eric Kolve, Roozbeh Mottaghi, Winson Han, Eli VanderBilt, Luca Weihs, Alvaro Herrasti, Matt Deitke, Kiana
Ehsani, Daniel Gordon, Yuke Zhu, Aniruddha Kembhavi, Abhinav Gupta, and Ali Farhadi. AI2-THOR: An
interactive 3d environment for visual ai. arXiv preprint arXiv:1712.05474, 2017.

[100] Matt Deitke, Eli VanderBilt, Alvaro Herrasti, Luca Weihs, Jordi Salvador, Kiana Ehsani, Winson Han, Eric
Kolve, Ali Farhadi, Aniruddha Kembhavi, and Roozbeh Mottaghi. Procthor: Large-scale embodied ai using
procedural generation. arXiv preprint arXiv:2206.06994, 2022.

[101] Xavier Puig, Kevin Ra, Marko Boben, Jiaman Li, Tingwu Wang, Sanja Fidler, and Antonio Torralba. Virtualhome:

Simulating household activities via programs. arXiv preprint arXiv:1806.07011, 2018.

[102] Sanjana Srivastava, Chengshu Li, Michael Lingelbach, Roberto Martín-Martín, Fei Xia, Kent Vainio, Zheng
Lian, Cem Gokmen, Shyamal Buch, C. Karen Liu, Silvio Savarese, Hyowon Gweon, Jiajun Wu, and Li Fei-Fei.
BEHAVIOR: Benchmark for everyday household activities in virtual, interactive, and ecological environments.
arXiv preprint arXiv:2108.03332, 2021.

[103] Chuang Gan, Siyuan Zhou, Jeremy Schwartz, Seth Alter, Abhishek Bhandwaldar, Dan Gutfreund, Daniel L. K.
Yamins, James J. DiCarlo, Josh McDermott, Antonio Torralba, and Joshua B. Tenenbaum. The threedworld
transport challenge: A visually guided task-and-motion planning benchmark for physically realistic embodied ai.
arXiv preprint arXiv:2103.14025, 2021.

[104] Tianhe Yu, Deirdre Quillen, Zhanpeng He, Ryan Julian, Avnish Narayan, Hayden Shively, Adithya Bellathur,
Karol Hausman, Chelsea Finn, and Sergey Levine. Meta-World: A benchmark and evaluation for multi-task and
meta reinforcement learning. arXiv preprint arXiv:1910.10897, 2019.

[105] Bo Liu, Yifeng Zhu, Chongkai Gao, Yihao Feng, Qiang Liu, Yuke Zhu, and Peter Stone. LIBERO: Benchmarking

knowledge transfer for lifelong robot learning. arXiv preprint arXiv:2306.03310, 2023.

[106] Arth Shukla, Stone Tao, and Hao Su. ManiSkill-HAB: A benchmark for low-level manipulation in home

rearrangement tasks. arXiv preprint arXiv:2412.13211, 2024.

[107] Ajay Mandlekar, Danfei Xu, Josiah Wong, Soroush Nasiriany, Chen Wang, Rohun Kulkarni, Li Fei-Fei, Silvio
Savarese, Yuke Zhu, and Roberto Martín-Martín. What matters in learning from offline human demonstrations
for robot manipulation. arXiv preprint arXiv:2108.03298, 2021.

59

[108] Eric Jang, Alex Irpan, Mohi Khansari, Daniel Kappler, Frederik Ebert, Corey Lynch, Sergey Levine, and Chelsea
Finn. BC-Z: Zero-shot task generalization with robotic imitation learning. arXiv preprint arXiv:2202.02005,
2022.

[109] Maximilian Denninger, Martin Sundermeyer, Dominik Winkelbauer, Youssef Zidan, Dmitry Olefir, Mohamad
Elbadrawy, Ahsan Lodhi, and Harinandan Katam. Blenderproc. arXiv preprint arXiv:1911.01911, 2019.

[110] Klaus Greff, Francois Belletti, Lucas Beyer, Carl Doersch, Yilun Du, Daniel Duckworth, David J. Fleet, Dan
Gnanapragasam, Florian Golemo, et al. Kubric: A scalable dataset generator. arXiv preprint arXiv:2203.03570,
2022.

[111] Elia Bonetto, Chenghao Xu, and Aamir Ahmad. GRADE: Generating realistic and dynamic environments for

robotics research with isaac sim. arXiv preprint arXiv:2303.04466, 2023.

[112] Mohit Shridhar, Jesse Thomason, Daniel Gordon, Yonatan Bisk, Winson Han, Roozbeh Mottaghi, Luke
Zettlemoyer, and Dieter Fox. ALFRED: A benchmark for interpreting grounded instructions for everyday tasks.
arXiv preprint arXiv:1912.01734, 2019.

[113] Aishwarya Padmakumar, Jesse Thomason, Ayush Shrivastava, Patrick Lange, Anjali Narayan-Chen, Spandana
Gella, Robinson Piramuthu, Gokhan Tur, and Dilek Hakkani-Tur. TEACh: Task-driven embodied agents that
chat. arXiv preprint arXiv:2110.00534, 2021.

[114] Wenlong Huang, Fei Xia, Ted Xiao, Harris Chan, Jacky Liang, Pete Florence, Andy Zeng, Jonathan Tompson,
Igor Mordatch, Yevgen Chebotar, et al. Inner monologue: Embodied reasoning through planning with language
models. arXiv preprint arXiv:2207.05608, 2022.

[115] Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, Ashwin Balakrishna, Suraj Nair, Rafael Rafailov,
Ethan Foster, Grace Lam, Pannag Sanketi, et al. OpenVLA: An open-source vision-language-action model. arXiv
preprint arXiv:2406.09246, 2024.

[116] Dibya Ghosh, Homer Walke, Karl Pertsch, Kevin Black, Oier Mees, Sudeep Dasari, Joey Hejna, Tobias Kreiman,
Charles Xu, Jianlan Luo, et al. Octo: An open-source generalist robot policy. arXiv preprint arXiv:2405.12213,
2024.

[117] Linxi Fan, Guanzhi Wang, Yunfan Jiang, Ajay Mandlekar, Yuncong Yang, Haoyi Zhu, Andrew Tang, De-An
Huang, Yuke Zhu, and Anima Anandkumar. Minedojo: Building open-ended embodied agents with internet-scale
knowledge. arXiv preprint arXiv:2206.08853, 2022.

[118] Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, and Anima Anand-
kumar. Voyager: An open-ended embodied agent with large language models. arXiv preprint arXiv:2305.16291,
2023.

[119] Vincent-Pierre Berges, Andrew Szot, Devendra Singh Chaplot, Aaron Gokaslan, Roozbeh Mottaghi, Dhruv
Batra, and Eric Undersander. Galactic: Scaling end-to-end reinforcement learning for rearrangement at 100k
steps-per-second. arXiv preprint arXiv:2306.07552, 2023.

[120] Eric Liang, Zhanghao Wu, Michael Luo, Sven Mika, Joseph E. Gonzalez, and Ion Stoica. RLlib Flow: Distributed

reinforcement learning is a dataflow problem. arXiv preprint arXiv:2011.12719, 2020.

60
