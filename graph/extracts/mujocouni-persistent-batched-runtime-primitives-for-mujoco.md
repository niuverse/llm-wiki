MuJoCoUni
Persistent Batched Runtime Primitives for MuJoCo
https://github.com/unilabsim/mujoco_uni
Yufei Jia∗, Junzhe Wu
Tsinghua University
∗Correspondence to: jyf23@mails.tsinghua.edu.cn
Abstract
We present MuJoCoUni, a downstream MuJoCo distribution for online robot learning
and batched physics evaluation. Alongside the open-loop batched trajectory generation
already provided by upstream mujoco.rollout, MuJoCoUni supplies runtime primitives
for stateful environment execution. The target workloads need high-throughput parallel
execution while retaining upstream CPU MuJoCo semantics for models, sensors, contact,
and constraints. Its core object, BatchEnvPool, is a C++/pybind11 executor that owns
per-environment mjModel copies, per-thread mjData workers, and an internal thread pool. It
provides final-state-only short stepping, sparse reset, reset-lifecycle domain randomization,
batched sensor forward evaluation without advancing dynamics, and batched Jacobian and
height-field queries. The implementation is confined to the Python binding layer; MuJoCo’s
solver,contactmodel,integrator,andcoresourcetreeretainupstreamsemantics. Thisreport
describes the BatchEnvPool API, implementation boundary, relationship to rollout, and
the validation and benchmark scripts shipped with the open-source mujoco-uni package,
which is installed with pip install mujoco-uni.
1 Introduction
Robot-learning systems increasingly place the physics simulator inside the training loop. The
runtime sends batched controls, advances a short time window, reads sensors and task state,
and resets only terminated environments. MuJoCo already provides mature XML/MJB assets,
sensors, contact solving, and debugging tools; when these fine-grained operations run at high
frequency, interface overhead, object lifetime, and output shape directly affect training efficiency.
GPU-resident simulators and GPU-oriented MuJoCo backends are important paths for
efficient training. When a task also needs upstream CPU MuJoCo behavior for models, sen-
sors, contact or constraint handling, or debugging, a CPU-side batched runtime provides a
complementary route.
Upstream MuJoCo already provides batched stepping through the official mujoco.rollout
interface. It uses a C++ thread pool to run open-loop mj_step from many initial states and
returns full state and sensor trajectories. It is appropriate for planning, system identification,
trajectory optimization, and other tasks that consume full trajectory tensors. Importantly, the
persistence in rollout is limited to optional thread-pool reuse; environment models, data, state
updates, reset semantics, and randomization lifecycles remain external to the call.
Online robot RL also needs an environment-runtime interface. The runtime should preserve
environments and model variants across calls, return only the final state after short stepping
windows, and apply sparse reset with domain randomization for terminated environments.
Observation and control computation further need batched sensor forward passes, site Jacobians,
and local terrain-height queries without advancing dynamics.
1
6202
yaM
42
]OR.sc[
1v22942.5062:viXra

MuJoCoUni is a lightweight downstream distribution of MuJoCo with additions concentrated
in the Python binding layer. Its core object, BatchEnvPool, creates per-environment mjModel
copies, per-thread mjData workers, and an internal thread pool. It exposes step, forward,
reset, compute_site_jacobians, and sample_hfield_height; MuJoCo’s physics kernel and
solver are unchanged.
The contribution of this report is engineering-oriented. We describe the complementary
relationship between MuJoCoUni and upstream rollout, present the persistent environment
pool and reset/forward/query primitives, and summarize the repository scripts for numerical
parity, field-patching tests, and micro-benchmarks.
The remainder of the report is organized as follows. section 2 discusses related batching
and environment-runtime systems. section 3 describes the design and API of BatchEnvPool.
section 4 documents validation and benchmark results. section 5 summarizes target applications.
section 6 discusses runtime boundaries and broader system context.
2 Related Work
2.1 Upstream MuJoCo Batching
The closest interface to MuJoCoUni is MuJoCo’s upstream mujoco.rollout module [10].
rollout generates open-loop trajectories from a batch of initial states and control sequences,
supportssingle-threadedorthread-poolexecution, andreturnsstateandsensorarrayswithshape
nbatch×nstep×dim. Thecenteroftherolloutabstractionis“generateafulltrajectoryfrom
input tensors”; the center of the MuJoCoUni abstraction is “maintain a repeatedly interactive
environment pool.”
Thisdistinctiondeterminestheirusecases. rolloutfitsfull-trajectorytaskssuchasplanning,
system identification, and trajectory optimization. BatchEnvPool is complementary when tasks
need per-environment models to persist across calls, short steps to return only final states, sparse
reset-time patches, or batched current-state queries.
2.2 Vectorized Environment Runtimes
Vectorized environment runtimes organize many environments behind one interface and are
a common engineering layer in RL systems. EnvPool [11] demonstrates the value of moving
environment execution into a high-performance C++ runtime, and robot benchmarks such
as ManiSkill [9] expose batched task interfaces. MotrixSim [5] shows a systems route that
combines CPU-parallel simulation with reinforcement-learning algorithms for robot policy
training. MuJoCoUni occupies a lower-level position: rather than defining task semantics or a
full learning runtime, it extends the MuJoCo binding layer for systems that need the standard
mjModelworkflow,persistentmodelpools,reset-timedomainrandomization,andbatchedphysics
queries.
2.3 GPU-Resident Physics
Brax [3] implements a vectorizable and differentiable physics kernel in JAX; MJX [8] maps
a subset of MuJoCo to JAX; Isaac Gym [6] and Isaac Lab [7] provide NVIDIA GPU-resident
simulation through PhysX; Genesis [1] and MuJoCo Warp [4] also target GPU-side physics
execution. These systems can provide high throughput at large parallel scales, but GPU
paths typically require models, contact and constraint handling, and data layout to fit an
accelerator-friendly execution model. They may therefore introduce constraints in feature
coverage, static-shape assumptions, contact/constraint buffers, or backend hardware.
MuJoCoUni takes a complementary route. It preserves MuJoCo CPU physics semantics and
concentrates batched execution plus common robot-task queries in the C++ binding layer. It
2

MuJoCoUni
persistent batched runtime
BATCHENVPOOL API
|              |     | step              | forward | reset query      |                  |
| ------------ | --- | ----------------- | ------- | ---------------- | ---------------- |
| DOWNSTREAM   |     |                   |         |                  | UPSTREAM ENGINE  |
| Batched loop |     |                   |         |                  | CPU MuJoCo       |
|              |     | PERSISTENT MODELS |         | PARALLEL WORKERS | unchanged kernel |
state, control
|           |     | N model copies                 |     | W data buffers       |         |
| --------- | --- | ------------------------------ | --- | -------------------- | ------- |
| reset ids |     |                                |     |                      | mj_step |
|           |     | model variants + reset patches |     | thread-pool dispatch |         |
mj_forward
state, sensors
mj_jacSite
queries
EXECUTION
Parallel dispatch
over persistent environments
Figure 1: MuJoCoUni architecture. maintains persistent model and worker resources
BatchEnvPool
behind the Python interface and executes batched operations through standard MuJoCo calls without
| modifying | the physics | kernel. |     |     |     |
| --------- | ----------- | ------- | --- | --- | --- |
is not a replacement claim against GPU-resident simulation; it is a CPU-batched backend for
MuJoCo workloads where feature coverage matters more than accelerator residency.
| 2.4 Domain | Randomization |     |     |     |     |
| ---------- | ------------- | --- | --- | --- | --- |
Domain randomization is a basic technique for sim-to-real training and robust policy
search. Standard MuJoCo Python workflows typically copy or mutate mjModel fields
and call mj_setConst when required. MuJoCoUni moves common field patches into
BatchEnvPool.reset, so sparse reset can handle both state reset and per-environment
randomization.
| 2.5 Evolutionary |     | and | Optimization | Workloads |     |
| ---------------- | --- | --- | ------------ | --------- | --- |
Evolutionary computing, neuroevolution, and model search also rely on large numbers of
physics evaluations. Recent work comparing CPU MuJoCo and GPU/MJX backends reports
systems tradeoffs across model complexity and population size [2]. MuJoCoUni’s persistent
model pools, model-variant initialization, and final-state return semantics fit workloads that
| evaluate   | many candidate | bodies | or controllers | in parallel. |     |
| ---------- | -------------- | ------ | -------------- | ------------ | --- |
| 3 System   | Design         | and    | API            |              |     |
| 3.1 Design | Boundary       |        |                |              |     |
MuJoCoUni has a narrow design boundary: it adds a batched runtime inside the MuJoCo
Python package without changing the physics kernel. Throughput improvements come from
object lifetime, thread scheduling, and batched interfaces rather than from reducing the MuJoCo
physics feature set. At the code level, the core additions are python/mujoco/batch_env.cc and
python/mujoco/batch_env.py; changestostructs.handstructs_wrappers.cconlysupport
| safe non-owning | Python | references | to pool-owned | models. |     |
| --------------- | ------ | ---------- | ------------- | ------- | --- |
Figure 1 summarizes this boundary: a downstream batched loop calls BatchEnvPool, which
keeps per-environment models and per-worker data persistent while dispatching execution to the
| unchanged | CPU MuJoCo | kernel. |     |     |     |
| --------- | ---------- | ------- | --- | --- | --- |
3

| Aspect | mujoco.rollout |     | BatchEnvPool |     |
| ------ | -------------- | --- | ------------ | --- |
Primary abstraction Stateless open-loop trajectory call; Stateful pool of N environments
|     | optional | persistent thread | pool owned by | one executor |
| --- | -------- | ----------------- | ------------- | ------------ |
Model/data ownership Caller supplies mjModel/mjData on Pool owns per-environment
|     | each call |     | mjModel copies | and per-thread |
| --- | --------- | --- | -------------- | -------------- |
mjData workers
Step output Full trajectory (N, T, nstate) Final state (N, nstate) and
|     | and optional | sensor trajectory | optional final | sensor data |
| --- | ------------ | ----------------- | -------------- | ----------- |
Reset semantics No reset primitive; caller constructs Sparse reset over env_ids with
|     | the next | initial state/model | optional field | patching |
| --- | -------- | ------------------- | -------------- | -------- |
externally
Current-state queries Not exposed as separate pool Batched forward, site Jacobian,
|     | operations |     | and hfield | sampling |
| --- | ---------- | --- | ---------- | -------- |
Best fit Planning, system identification, Online robot RL and other stateful
|     | trajectory | optimization | batched runtimes |     |
| --- | ---------- | ------------ | ---------------- | --- |
Table 1: Interface-level distinction between upstream rollout and MuJoCoUni. MuJoCoUni adds per-
sistent environment ownership and reset/query lifecycle primitives around MuJoCo’s stepping semantics.
| 3.2 Pool Construction |     |     |     |     |
| --------------------- | --- | --- | --- | --- |
BatchEnvPool(model, *, nbatch, nthread=None) accepts either one MjModel or a com-
patible model sequence of length 1 or nbatch. All arguments after model are keyword-only.
The constructor creates one model copy per environment with mj_copyModel and one mjData
per worker thread. When nthread > 0, an internal thread pool assigns chunks of environment
| indices to workers; | otherwise execution | runs on | the calling thread. |     |
| ------------------- | ------------------- | ------- | ------------------- | --- |
This construction supports parameter-level randomization through reset-time field patches
and geometry-level randomization through precompiled variants. The latter covers
MjModel
changes such as link lengths, mesh scales, or collision geometry that cannot be expressed by
| simple field patches. |     |     |     |     |
| --------------------- | --- | --- | --- | --- |
The pool owns its models, but downstream code sometimes needs model metadata such as
sensor layout, body/site/geom ids, or playback models. get_model and get_all_models return
non-owning references, avoiding double-free behavior when the pool is destroyed.
| 3.3 Execution | Primitives |     |     |     |
| ------------- | ---------- | --- | --- | --- |
BatchEnvPool exposes primitives for common online robot-training operations.
Batched stepping. step(initial_state, nstep, control=None) runs mj_step for nstep
integration steps on every environment. Controls are passed as (N, nstep, ncontrol), and
control_spec can include MuJoCo state items such as xfrc_applied. The default output
is the final full-physics state. With return_sensor=True, the function also returns final-step
sensordata; post_step_forward_sensor=True runs one additional mj_forward on the final
| state before copying | sensors. |     |     |     |
| -------------------- | -------- | --- | --- | --- |
Forward evaluation. forward(initial_state) runs one mj_forward over all environments
and returns sensors. It is used to build observations from current state, refresh sensor caches
after pool construction, or evaluate auxiliary signals without advancing dynamics.
Sparse reset. reset(env_ids, initial_state, randomization=None) acts only on a se-
lected subset of environments. initial_state and every randomization payload have leading
4

| Primitive |     |     |     | Input     | pattern  |         |            |     | Output   | /     | purpose    |     |
| --------- | --- | --- | --- | --------- | -------- | ------- | ---------- | --- | -------- | ----- | ---------- | --- |
|           |     |     |     | Full-pool | state    |         | nstate),   |     | Final    | state | nstate);   |     |
| step      |     |     |     |           |          | (N,     |            |     |          |       | (N,        |     |
|           |     |     |     | nstep,    | optional | control | trajectory |     | optional | final | sensordata |     |
forward Full-pool state (N, nstate) Sensordata (N, nsensordata)
|     |     |     |     |     |     |     |     |     | without | advancing | dynamics |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ------- | --------- | -------- | --- |
reset Subset env_ids, subset states, Reset state and sensordata for
|     |     |     |     | optional | randomization |     | dict |     | only | the selected | environments |     |
| --- | --- | --- | --- | -------- | ------------- | --- | ---- | --- | ---- | ------------ | ------------ | --- |
compute_site_jacobians Full-pool state and one or more Batched translational and/or
|     |     |     |     | site | ids |     |     |     | rotational |     | site Jacobians |     |
| --- | --- | --- | --- | ---- | --- | --- | --- | --- | ---------- | --- | -------------- | --- |
sample_hfield_height Full-pool state, hfield geom id, Batched terrain heights or
|     |              |     |       | local       | XY offsets,  |     | frame body     | id       | frame-to-terrain |               | clearances |     |
| --- | ------------ | --- | ----- | ----------- | ------------ | --- | -------------- | -------- | ---------------- | ------------- | ---------- | --- |
|     |              |     | Table | 2: Core     | BatchEnvPool |     | primitives.    | N        | denotes          | nbatch.       |            |     |
|     | Field        |     |       | mj_setConst |              |     | Use case       |          |                  |               |            |     |
|     | body_mass    |     |       | yes         |              |     | Body mass      | and      | payload          | randomization |            |     |
|     | body_ipos    |     |       | yes         |              |     | Inertial-frame |          | COM              | offsets       |            |     |
|     | body_iquat   |     |       | yes         |              |     | Inertial-frame |          | orientation      | perturbations |            |     |
|     | body_inertia |     |       | yes         |              |     | Inertia        | tensor   | randomization    |               |            |     |
|     | dof_armature |     |       | yes         |              |     | Joint armature |          | perturbations    |               |            |     |
|     | gravity      |     |       | no          |              |     | Per-env        | gravity  | vectors          |               |            |     |
|     |              |     |       | no          |              |     | Contact        | friction | randomization    |               |            |     |
geom_friction
|     | kp, | kd    |     | no        |                 |     | Position-actuator |         | gain | randomization |     |     |
| --- | --- | ----- | --- | --------- | --------------- | --- | ----------------- | ------- | ---- | ------------- | --- | --- |
|     |     | Table | 3:  | Supported | reset-lifecycle |     | model             | patches | in   | BatchEnvPool. |     |     |
dimension len(env_ids), matching the reset subset size. This design makes reset cost scale
| with the        | number |     | of environments        |     | that actually |     | terminated. |      |        |     |         |         |
| --------------- | ------ | --- | ---------------------- | --- | ------------- | --- | ----------- | ---- | ------ | --- | ------- | ------- |
| Site Jacobians. |        |     |                        |     |               |     | computes    |      | and/or |     | for one | or more |
|                 |        |     | compute_site_jacobians |     |               |     |             | jacp |        |     | jacr    |         |
sites. For each environment, the implementation sets state, runs the position-stage prefix
mj_kinematics and mj_comPos, and calls mj_jacSite. For K sites, outputs have shape (N, K,
3, nv); when the Python wrapper receives one scalar site id, it squeezes the K dimension.
Height-field sampling. sample_hfield_height bilinearly samples a MuJoCo hfield geom.
QuerypointsarelocalXYoffsetsattachedtoaframebodyandcanbealignedinyaw,world/none,
or body/full mode. The output is either world-frame terrain height or clearance frame_z -
terrain_z.
| 3.4 Reset-Time |     |     | Domain |     | Randomization |     |     |     |     |     |     |     |
| -------------- | --- | --- | ------ | --- | ------------- | --- | --- | --- | --- | --- | --- | --- |
The reset randomization payload is a dictionary from field name to float64 arrays. Fields
marked as requiring refresh trigger mj_setConst for the target environments after patching;
| other fields | are | written | directly |     | before reset/forward |     |     | execution. |     |     |     |     |
| ------------ | --- | ------- | -------- | --- | -------------------- | --- | --- | ---------- | --- | --- | --- | --- |
5

| 4 Validation |     | and Benchmarks |     |     |     |     |
| ------------ | --- | -------------- | --- | --- | --- | --- |
This section reports MuJoCoUni benchmarks on four MuJoCo models; all use the
discardvisual compiler option to exclude visual geometries from physics computation.
| 4.1 Benchmark |     | Setup |     |     |     |     |
| ------------- | --- | ----- | --- | --- | --- | --- |
All reported data are collected on an x86_64 machine running Ubuntu 20.04 with an Intel
i9-14900HX CPU. The experiments use MuJoCoUni 3.8.0, Python 3.13, and NumPy 2.4, with
16 simulation threads enabled. The C++ fast path uses 5 warmup iterations and 50 timed
repetitions; Python baselines use fewer repetitions due to their significantly longer execution
time.
| 4.2 Correctness |     | Coverage |     |     |     |     |
| --------------- | --- | -------- | --- | --- | --- | --- |
batch_env_test.py covers pool construction, model sequences, input validation for
step/forward/reset, randomization fields, indexed field access, Jacobians, and hfield sampling.
batch_env_parity_check.py runs two parity checks: step against rollout, and forward
| against per-environment |             | mj_forward | loops. |     |     |     |
| ----------------------- | ----------- | ---------- | ------ | --- | --- | --- |
| 4.3 Step                | and Forward | Throughput |        |     |     |     |
Four models are tested: Unitree Go1 (18 DoF quadruped), Wonik Allegro (16 DoF dexterous
hand), Franka Emika Panda (9 DoF arm), and a CMU Humanoid (56 DoF). Figure 2 scales
the number of parallel environments from 32 to 4096; throughput saturates around 256–512
environments on the 16-thread pool. At saturation, Allegro reaches ∼1.8M steps/s, Go1 ∼1.2M,
| Franka ∼410k, | and Humanoid | ∼290k. |     |     |     |     |
| ------------- | ------------ | ------ | --- | --- | --- | --- |
Step / Forward Throughput
|     |     |     |     | Go1 Allegro | Franka Humanoid |     |
| --- | --- | --- | --- | ----------- | --------------- | --- |
Unitree Go1 Wonik Allegro (a) Batched Step (b) Batched Forward
| (18 DoF quadruped) |     | (16 DoF hand) |     |     |     |     |
| ------------------ | --- | ------------- | --- | --- | --- | --- |
| (1)                | (2) |               |     |     |     |     |
)dnoces rep( tuphguorhT
106
| Franka Panda |     | CMU Humanoid |     |     |     |     |
| ------------ | --- | ------------ | --- | --- | --- | --- |
| (9 DoF arm)  |     | (56 DoF)     |     |     |     |     |
| (3)          | (4) |              |     |     |     |     |
105
|     |     |     | 32 64 128 | 256 512 1024 2048 4096 | 32 64 128 | 256 512 1024 2048 4096 |
| --- | --- | --- | --------- | ---------------------- | --------- | ---------------------- |
Number of environments
Figure 2: Robotbenchmarkmodelsandthroughput. Left: thefourrobotmodelsusedinthethroughput
benchmarks–(1) Unitree Go1, (2) Wonik Allegro, (3) Franka Panda, and (4) CMU Humanoid. Right:
batched step and forward throughput for these models; throughput saturates when the 16-thread pool
| becomes fully     | utilized. |          |     |     |     |     |
| ----------------- | --------- | -------- | --- | --- | --- | --- |
| 4.4 Model-Variant |           | Overhead |     |     |     |     |
When each environment owns a distinct mjModel copy (model-variant mode), cache locality
decreases slightly compared to a single shared model. Figure 3 compares the two modes for Go1
and Allegro; at saturation (256–512 environments) the gap closes and throughput is essentially
identical.
6

Multi-Model Step Throughput
|     |     |     | Go1   single model   |     | Allegro  |  single model   |     |
| --- | --- | --- | -------------------- | --- | -------- | --------------- | --- |
|     |     |     | Go1   model variants |     | Allegro  |  model variants |     |
)s/spets( tuphguorhT
106
|     |     |     | 3 2 | 6 4 2 8 5 6 | 1 2 | 2 4 4 8 | 9 6 |
| --- | --- | --- | --- | ----------- | --- | ------- | --- |
|     |     |     |     | 1 2         | 5 0 | 0 0     |     |
|     |     |     |     |             | 1   | 2 4     |     |
Number of environments
Figure 3: Step throughput: single shared model versus per-environment model variants.
| 4.5 Reset | Performance |     |     |     |     |     |     |
| --------- | ----------- | --- | --- | --- | --- | --- | --- |
Sparse reset is a core feature of MuJoCoUni. Figure 4 compares the reset latency of a Python
for-loop, Python multiprocessing, and the MuJoCoUni C++ pool. At 4096 environments, the
C++ path completes a full reset in 3.5ms versus 53ms for the Python loop—a ∼15× speedup.
The C++ path scales linearly with reset fraction, reaching 3.4ms at 90%.
|     |     |     |                 | Reset Performance      |  Go1                       |           |     |
| --- | --- | --- | --------------- | ---------------------- | -------------------------- | --------- | --- |
|     |     |     | Python for-loop | Python multiprocessing |                            | MuJoCoUni |     |
|     |     |     | (a) Full Reset  |                        | (b) Partial Reset (N=4096) |           |     |
104
103
)sm( emiT
102
101
100
10 1
|     |     | 2                      | 4 8 6   | 2 4 8 6         | %   | % %            | % % % |
| --- | --- | ---------------------- | ------- | --------------- | --- | -------------- | ----- |
|     |     | 3 6                    | 1 2 2 5 | 5 1 0 2 0 4 0 9 | 5   | 0 0 0          | 0 0   |
|     |     |                        |         | 1 2 4           | 1   | 3 5            | 7 9   |
|     |     | Number of environments |         |                 |     | Reset fraction |       |
Figure 4: Reset latency on Go1. Left: full reset across environment counts. Right: partial reset at 4096
environments.
| 4.6 Batched |     | Jacobian | Performance |     |     |     |     |
| ----------- | --- | -------- | ----------- | --- | --- | --- | --- |
Figure 5 shows the performance of compute_site_jacobians on the Franka Panda end-
effector site. The C++ pool computes Jacobians for 4096 environments in 0.53ms, compared to
| 11.9ms | for a Python | loop—a | ∼22× | speedup. |     |     |     |
| ------ | ------------ | ------ | ---- | -------- | --- | --- | --- |
7

|     |     |     |     |                 | Site Jacobian Computation  |     |                        |  Franka |           |     |
| --- | --- | --- | --- | --------------- | -------------------------- | --- | ---------------------- | ------- | --------- | --- |
|     |     |     |     | Python for-loop |                            |     | Python multiprocessing |         | MuJoCoUni |     |
104
103
)sm( emiT
102
101
100
10 1
|     |     |     |     |     | 2   | 4   | 8 6   | 2       | 4 8 6   |     |
| --- | --- | --- | --- | --- | --- | --- | ----- | ------- | ------- | --- |
|     |     |     |     |     | 3   | 6 1 | 2 2 5 | 5 1 0 2 | 0 4 0 9 |     |
|     |     |     |     |     |     |     |       | 1       | 2 4     |     |
Number of environments
|                  |     | Figure | 5:       | Site-Jacobian |             | computation |     | time on | Franka Emika Panda. |     |
| ---------------- | --- | ------ | -------- | ------------- | ----------- | ----------- | --- | ------- | ------------------- | --- |
| 4.7 Height-Field |     |        | Sampling |               | Performance |             |     |         |                     |     |
Figure 6 shows performance on a stairs-terrain heightfield with a
sample_hfield_height
4×4 sampling grid per environment. At 4096 environments, the C++ path takes 0.52ms versus
| 290ms | for a | Python | loop—a | ∼555× |     | speedup. |     |                        |     |          |
| ----- | ----- | ------ | ------ | ----- | --- | -------- | --- | ---------------------- | --- | -------- |
|       |       |        |        |       |     |          |     | Height-Field Sampling  |     |  Terrain |
Stairs Terrain Python for-loop Python multiprocessing MuJoCoUni
(height-field)
102
)sm( emiT
101
100
10 1
|     |     |     |     |     |     |     |     | 3 2 | 6 4 2 8 5 6 1 2 | 2 4 4 8 9 6 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --------------- | ----------- |
|     |     |     |     |     |     |     |     |     | 1 2 5           | 0 0 0       |
1 2 4
Number of environments
Figure 6: Height-field sampling benchmark. Left: stairs height-field terrain used for batched terrain
| sampling. | Right: | height-field |     | sampling | time | on  | the terrain | model. |     |     |
| --------- | ------ | ------------ | --- | -------- | ---- | --- | ----------- | ------ | --- | --- |
5 Applications
MuJoCoUni provides MuJoCo-side batched runtime primitives. It can serve as the simulation
backend inside larger training, evaluation, or data-generation systems; the higher-level system
remains responsible for task logic, controllers, data management, logging, and distributed
scheduling.
| 5.1 Robot |     | Reinforcement |     |     | Learning |     |     |     |     |     |
| --------- | --- | ------------- | --- | --- | -------- | --- | --- | --- | --- | --- |
Robot RL is the primary target workload for MuJoCoUni. BatchEnvPool gathers short-
horizon stepping, sensor reads, sparse reset, reset-time domain randomization, and current-state
| queries | into | one MuJoCo-side |     |     | object. |     |     |     |     |     |
| ------- | ---- | --------------- | --- | --- | ------- | --- | --- | --- | --- | --- |
8

This interface fits several environment organizations. Downstream systems can consume final
states and sensors through synchronous batch sampling, asynchronous collection, or offline data
generation. MuJoCoUni remains neutral to controllers, learning algorithms, and data paths.
| 5.2 Sim-to-Real |     |     | Domain | Randomization |     |     |     |
| --------------- | --- | --- | ------ | ------------- | --- | --- | --- |
Sim-to-real training often randomizes dynamics parameters, contact parameters, gravity,
and actuator gains during the reset lifecycle. MuJoCoUni places common MuJoCo field patches
and required mj_setConst refreshes inside reset; geometry-level changes are represented by
| precompiled       | model |     | variants   | at construction |     | time. |     |
| ----------------- | ----- | --- | ---------- | --------------- | --- | ----- | --- |
| 5.3 Terrain-Aware |       |     | Locomotion |                 |     |       |     |
Uneven-terrain locomotion tasks often require height scans in a robot-local frame.
sample_hfield_height samples MuJoCo hfield data in batch, supports yaw/world/body
| alignment,       | and | returns | either | terrain   | height | or frame | clearance. |
| ---------------- | --- | ------- | ------ | --------- | ------ | -------- | ---------- |
| 5.4 Manipulation |     |         | and    | Kinematic |        | Control  |            |
Manipulation, mobile manipulation, and IK tasks often need site Jacobians for end effectors
or intermediate links. compute_site_jacobians runs the minimal kinematic prefix over the full
pool and calls mj_jacSite in batch, supporting operational-space control, reward computation,
| constraint | checks, | IK           | auxiliary | objectives, |     | and analysis. |     |
| ---------- | ------- | ------------ | --------- | ----------- | --- | ------------- | --- |
| 5.5 Batch  |         | Optimization |           |             |     |               |     |
Evolution strategies, neuroevolution, and model/controller search often evaluate many
candidates in parallel. MuJoCoUni’s persistent model pools, model-variant initialization, and
final-state-only step fit evaluation loops whose objective depends on final state, terminal events,
| or aggregated |     | rewards. |     |     |     |     |     |
| ------------- | --- | -------- | --- | --- | --- | --- | --- |
Whenanoptimizerneedsfullstateandsensortrajectoriesateverytimestep,mujoco.rollout
provides the direct full-trajectory interface. When the evaluation loop is closer to a stateful
environment pool, MuJoCoUni provides the more natural runtime model.
6 Discussion
| 6.1 Runtime |     | Boundary |     | and | Tradeoffs |     |     |
| ----------- | --- | -------- | --- | --- | --------- | --- | --- |
This report positions MuJoCoUni as a MuJoCo-compatible CPU batched runtime layer.
It places persistent environment pools, sparse reset, reset-time domain randomization, and
batched sensor, Jacobian, and hfield queries in the MuJoCo binding layer while keeping physical
| semantics | in upstream |     | MuJoCo. |     |     |     |     |
| --------- | ----------- | --- | ------- | --- | --- | --- | --- |
This boundary gives the main engineering tradeoffs. Per-environment model copies increase
memory use, geometry-level randomization requires precompiled compatible models, and reset-
time field patching covers the currently registered field set. The corresponding benefits are clear
object ownership, lower-frequency Python interaction, and simulator-side interfaces that can be
embedded in different training, evaluation, or data-generation systems.
Upstream mujoco.rollout covers open-loop batched trajectory generation; GPU-resident
backends cover accelerator-native massive parallel simulation; MuJoCoUni covers the stateful
runtime position where environments and models persist across calls.
9

6.2 System Context
Efficient training stacks for modern robot-control RL are commonly organized around GPU-
resident simulation and the CUDA software stack. Systems such as Isaac Gym, Isaac Lab,
MuJoCo Playground, MJLab-style MuJoCo-Warp stacks, ManiSkill, and Genesis demonstrate
the practical training efficiency of large-scale GPU-parallel environments [6, 7, 12, 4, 9, 1].
GPU-resident physics also has explicit implementation conditions. Robot simulation brings
dynamic contacts, sparse constraints, closed chains, and contact-rich manipulation with branch-
heavy control flow and data dependencies; GPU backends therefore make tradeoffs around static
allocation, fixed buffers, feature coverage, numerical formats, and solver approximations.
CPU MuJoCo provides a different set of systems properties. It runs across platforms,
preserves mature XML/MJB assets, sensors, debugging, and visualization workflows, and
naturally supports physics computations with branching and irregular control flow. Combined
with modern multicore CPUs, thread pools, persistent object lifetimes, and batched array
interfaces, it can serve as a high-throughput data-generation component; MotrixSim [5] has
already demonstrated this route.
This interface decouples physics simulation from other components in a larger system.
Downstream systems can organize learning, logging, scheduling, rendering, or distributed
execution according to their own needs while keeping the simulator side on portable CPU
MuJoCo semantics. For workloads that need full MuJoCo feature coverage, cross-platform
deployment, or reuse of existing MuJoCo assets, MuJoCoUni provides a concrete CPU-batched
engineering path.
6.3 Availability and Reproducibility
MuJoCoUni is released as the open-source mujoco-uni Python package together with unit
tests and parity checks. The benchmark code is maintained separately at https://github.com/
unilabsim/mujoco_uni_bench.
References
[1] Genesis Authors. Genesis: A generative and universal physics engine for robotics and
beyond, December 2024. URL https://github.com/Genesis-Embodied-AI/Genesis.
[2] Rustam Eynaliyev and Houcen Liu. Combining gpu and cpu for accelerating evolutionary
computing workloads. arXiv preprint arXiv:2502.11129, 2025.
[3] C Daniel Freeman, Erik Frey, Anton Raichuk, Sertan Girgin, Igor Mordatch, and Olivier
Bachem. Brax–a differentiable physics engine for large scale rigid body simulation. arXiv
preprint arXiv:2106.13281, 2021.
[4] Google DeepMind and NVIDIA. Mujoco Warp: GPU-optimized version of the mujoco
physics simulator, 2025. URL https://github.com/google-deepmind/mujoco_warp.
[5] Yufei Jia, Heng Zhang, Ziheng Zhang, Junzhe Wu, Mingrui Yu, Zifan Wang, Dixuan
Jiang, Zheng Li, Chenyu Cao, Zhuoyuan Yu, et al. Gs-playground: A high-throughput
photorealisticsimulatorforvision-informedrobotlearning. arXiv preprint arXiv:2604.25459,
2026.
[6] Viktor Makoviychuk, Lukasz Wawrzyniak, Yunrong Guo, Michelle Lu, Kier Storey, Miles
Macklin, David Hoeller, Nikita Rudin, Arthur Allshire, Ankur Handa, et al. Isaac
gym: High performance gpu-based physics simulation for robot learning. arXiv preprint
arXiv:2108.10470, 2021.
10

[7] Mayank Mittal, Pascal Roth, James Tigue, Antoine Richard, Octi Zhang, Peter Du, Antonio
Serrano-Muñoz,XinjieYao,RenéZurbrügg,NikitaRudin,etal. Isaaclab: Agpu-accelerated
simulation framework for multi-modal robot learning. arXiv preprint arXiv:2511.04831,
2025.
| [8] MuJoCo | XLA Authors. | Mujoco | XLA (MJX), 2024. | URL |
| ---------- | ------------ | ------ | ---------------- | --- |
https://mujoco.readthedocs.
io/en/stable/mjx.html.
[9] Stone Tao, Fanbo Xiang, Arth Shukla, Yuzhe Qin, Xander Hinrichsen, Xiaodi Yuan, Chen
Bao, Xinsong Lin, Yulin Liu, Tse kai Chan, Yuan Gao, Xuanlin Li, Tongzhou Mu, Nan
Xiao, Arnav Gurha, Viswesh Nagaswamy Rajesh, Yong Woo Choi, Yen-Ru Chen, Zhiao
Huang, Roberto Calandra, Rui Chen, Shan Luo, and Hao Su. Maniskill3: Gpu parallelized
robotics simulation and rendering for generalizable embodied ai. Robotics: Science and
| Systems, | 2025. |     |     |     |
| -------- | ----- | --- | --- | --- |
[10] Emanuel Todorov, Tom Erez, and Yuval Tassa. Mujoco: A physics engine for model-based
control. In 2012 IEEE/RSJ international conference on intelligent robots and systems,
| pages | 5026–5033. | IEEE, 2012. |     |     |
| ----- | ---------- | ----------- | --- | --- |
[11] Jiayi Weng, Min Lin, Shengyi Huang, Bo Liu, Denys Makoviichuk, Viktor Makoviychuk,
Zichen Liu, Yufan Song, Ting Luo, Yukun Jiang, et al. Envpool: A highly parallel
reinforcement learning environment execution engine. Advances in Neural Information
| Processing | Systems, | 35:22409–22421, | 2022. |     |
| ---------- | -------- | --------------- | ----- | --- |
[12] Kevin Zakka, Baruch Tabanpour, Qiayuan Liao, Mustafa Haiderbhai, Samuel Holt,
Jing Yuan Luo, Arthur Allshire, Erik Frey, Koushil Sreenath, Lueder A Kahrs, et al.
| Mujoco | playground. | arXiv preprint | arXiv:2502.08844, | 2025. |
| ------ | ----------- | -------------- | ----------------- | ----- |
11
