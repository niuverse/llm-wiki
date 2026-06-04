AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

Huihua Zhao*, Rafael Cathomen*, Lionel Gulich, Wei Liu, Efe Arda Ongan, Michael Lin, Shalin Jain, Soha

2026-3-23

Pouya, Yan Chang
*Equal contribution.

Abstract

6
2
0
2

r
a

M
0
2

]

O
R
.
s
c
[

1
v
7
4
1
0
2
.
3
0
6
2
:
v
i
X
r
a

Recent advances in reinforcement learning (RL) have enabled impressive humanoid behaviors in sim-
ulation, yet transferring these results to new robots remains challenging. In many real deployments,
the primary bottleneck is no longer simulation throughput or algorithm design, but the absence of
systematic infrastructure that links environment verification, training, evaluation, and deployment in a
coherent loop.
To address this gap, we present AGILE, an end-to-end workflow for humanoid RL that standardizes
the policy-development lifecycle to mitigate common sim-to-real failure modes. AGILE comprises four
stages: (1) interactive environment verification, (2) reproducible training, (3) unified evaluation, and
(4) descriptor-driven deployment via robot/task configuration descriptors. For evaluation stage, AGILE
supports both scenario-based tests and randomized rollouts under a shared suite of motion-quality
diagnostics, enabling automated regression testing and principled robustness assessment. AGILE also
incorporates a set of training stabilizations and algorithmic enhancements in training stage to improve
optimization stability and sim-to-real transfer.
With this pipeline in place, we validate AGILE across five representative humanoid skills spanning
locomotion, recovery, motion imitation, and loco-manipulation on two hardware platforms (Unitree G1
and Booster T1), achieving consistent sim-to-real transfer. Overall, AGILE shows that a standardized,
end-to-end workflow can substantially improve the reliability and reproducibility of humanoid RL
development.
Code: https://github.com/nvidia-isaac/WBC-AGILE

1. Introduction

Reinforcement learning has enabled increasingly capable humanoid locomotion and manipulation policies [1–6],
yet translating these results to new robots and tasks remains fragile and labor-intensive. In practice, failures
rarely stem from insufficient simulation throughput or algorithmic novelty, but from the absence of structured
infrastructure connecting environment verification, scalable training, systematic evaluation, and deployment.

The Workflow Gap: Humanoid RL development is often built on fragmented and ad hoc workflows. Basic
environment issues, such as reversed joint axes or incorrect reward terms, are frequently discovered only after
costly training runs. Policy evaluation is also commonly performed through stochastic rollouts, which measure
average task performance under randomized commands but can make it difficult to diagnose hardware-critical
behaviors such as joint limit violations or high-frequency actuation. As a result, the lifecycle of humanoid RL
development, from environment verification to deployment, remains poorly structured and hard to reproduce.

The Transfer Gap: Exporting a learned policy for external validation or hardware deployment is a notoriously
fragile process. Without a standardized I/O contract, researchers must manually resolve joint order mismatches,
reconstruct observation history buffers, and align action scaling. This ad hoc translation introduces silent
bugs and prevents the use of a unified evaluation pipeline across secondary simulators (like MuJoCo), forcing

© 2026 NVIDIA. All rights reserved.

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

Figure 1: Overview of agile learning workflow. The workflow covers prepare-training, batch cloud training
with reproducible logging and deployment-oriented features, evaluation using quantitative motion metrics and
automated HTML reports, and deployment by exporting the learned policy and I/O descriptors for Sim2Sim and
Sim2Real transfer. Example applications include locomotion, loco-manipulation, DeepMimic-style imitation,
and synthetic data generation (SDG) for VLA training, supported by an algorithmic enhancements library (e.g.,
curricula, regularization, adaptive sampling, reward normalization, symmetry augmentation, and distillation).

researchers to risk physical deployment without rigorous, quantitative pre-validation.

To resolve these bottlenecks, we present AGILE (A Generic Isaac-Lab based Engine), an open-source workflow
built on Isaac Lab and RSL-RL that covers the full path from a new robot to a deployed policy. AGILE bridges
the workflow and transfer gaps through a four-stage pipeline (Figure 1):

1. Prepare: Interactive debug GUIs (for joint control, object manipulation, and reward visualization) allow
researchers to catch robot model and MDP misconfigurations in minutes before committing GPU hours.
2. Train: A scalable, reproducible training environment featuring automated hyperparameter sweeps,

experiment tracking, and a suite of independently toggleable algorithmic enhancements.

3. Evaluate: A unified evaluation pipeline combining deterministic scenario-based tests and stochastic
rollouts. Parallel environments receive scripted or randomized commands to evaluate deployment-critical
motion metrics such as joint jerk and limit violations.

4. Deploy: Trained policies are auto-exported alongside self-contained YAML I/O descriptors that resolve
joint ordering and action scaling. This powers a unified inference pipeline for both quantitative sim-to-sim
validation in MuJoCo and real-world hardware deployment.

Beyond infrastructure, agile also packages a suite of training enhancements for sim-to-real transfer
(L2C2 [7], reward normalization, value-bootstrapped terminations, symmetry augmentation [8], virtual
harness), each validated through thorough ablations. To further showcase agile’s modularity, we present a
decoupled whole-body control application [9, 10], in which a frozen locomotion policy serves as a lower-body

2

3. Evaluation• Quantitative Metrics• Deterministic Setup• HTML Reports4. Deployment• Export Policy & IO Descriptors• Sim2Real / Sim2Sim2. Training• Batch Cloud Training• Reproducible Logging• Deployment-focused Features1. Prepare-training• Verify USD/Config• Joint Control GUI• DebuggingUse CasesAlgorithmic Enhancements LibraryLocomotionDeepMimicSDG for VLA TrainingLoco-manipulation L2C2 RegularizationOnline reward normalizationAdaptive Command SamplingTeacher-student DistillationVirtual harness curriculumValue-bootstrappedterminationsUpper-body velocity profilesGeneric symmetryaugmentationAGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

API while an independent upper-body expert collects demonstration data for VLA fine-tuning [11].

Conceptually, AGILE reframes humanoid reinforcement learning as a structured engineering lifecycle
rather than a collection of loosely connected scripts. By formalizing interfaces across verification, training,
evaluation, and deployment, the framework enables deterministic regression testing, deployment-oriented
motion diagnostics, and descriptor-consistent policy export prior to hardware trials. This shifts humanoid RL
development from empirical trial-and-error toward repeatable, quantitatively validated engineering.

We validate the complete workflow across five tasks on the Unitree G1 and Booster T1: velocity tracking,
height-controlled locomotion [9], stand-up [12, 13], motion imitation [14, 15], and loco-manipulation with
VLA [16]. Our contributions are:

• A structured lifecycle for humanoid RL, integrating environment verification, training, evaluation, and

descriptor-driven deployment into a unified workflow.

• A unified evaluation framework combining deterministic scenario tests and stochastic rollouts with
per-joint motion-quality metrics (jerk, limit violations) for quantitatively regression test and deployment-
oriented policy validation.

• Validation across five tasks and two platforms, with sim-to-real transfer for locomotion, recovery,

imitation, and loco-manipulation, released as open-source with pre-trained checkpoints.

2. Related Work

We categorize related work into simulation platforms, humanoid learning frameworks, algorithmic techniques
for sim-to-real transfer, and evaluation methodologies.

2.1. GPU-Accelerated Simulation Primitives

GPU-based simulators have significantly accelerated reinforcement learning for robotics. Isaac Gym [17]
introduced tensor-based simulation pipelines that eliminate CPU–GPU bottlenecks, while Isaac Lab [18] extends
this approach with a modular manager-based architecture and USD-based scene configuration. Parallel efforts
such as MuJoCo Playground [19] bring GPU acceleration to the MuJoCo physics engine. While these platforms
provide powerful simulation primitives, they primarily focus on simulation performance and environment
modeling rather than the workflow surrounding debugging, evaluation, and deployment.

2.2. Humanoid Learning Frameworks

Several recent frameworks aim to scale humanoid learning pipelines. Holosoma focuses on large-scale infrastruc-
ture and fast off-policy learning for humanoid locomotion [20, 21]. HumanoidVerse emphasizes cross-simulator
compatibility through abstraction layers across multiple physics engines [22], ProtoMotions provides an Isaac
Lab-native framework for motion tracking and humanoid control [23], and RoboVerse provides unified inter-
faces for scalable robot learning across tasks and embodiments [24]. These frameworks primarily address
training scalability and simulator interoperability. In contrast, agile focuses on the broader development
lifecycle of humanoid RL policies, including environment verification, deterministic evaluation, and deployment.
Table 1 summarizes key differences.

2.3. Algorithmic Techniques for Sim-to-Real Transfer

A number of approaches improve policy robustness for real-world deployment. CAPS encourages smoother
control policies through action regularization [25], while L2C2 enforces local Lipschitz continuity to improve
stability under observation perturbations [7]. Other approaches such as ASAP use data from real world

3

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

Table 1: Feature comparison of humanoid RL frameworks. ✓= supported,

= partial, – = not supported.

∼

Feature

agile Holosoma H.Verse Proto.

Env. debugging
Algo. enhancements
Determ. evaluation
Sim-to-sim pipeline
Descriptor-driven export
Sim-to-real validation
Multi-sim backend support

✓
✓
✓
✓
✓
✓
–

–

∼
∼
✓
–
✓
–

–
–
–
✓
–
✓
✓

–

∼
✓
✓
–
✓
✓

deployments to learn a residual action policy that enables simulation dynamics to better align with real world
dynamics [26]. While these techniques improve policy stability, they are typically applied independently. AGILE
instead integrates such stabilization methods within a unified training and evaluation workflow.

2.4. Evaluation and Benchmarking

Earlier benchmark suites such as OpenAI Gym [27] and the DeepMind Control Suite [28] established standard-
ized task evaluation in simulation, motivating similar rigor for humanoid systems. HumanoidBench provides
simulation benchmarks for locomotion and manipulation tasks [29], while RoboGauge proposes a predictive
assessment suite for quantifying sim-to-real transferability in quadrupedal locomotion [30]. Related efforts
from the IEEE Humanoid Study Group seek standardized metrics for stability and safety in humanoid systems.
AGILE builds on this direction by incorporating a unified evaluation framework into the RL development
workflow, supporting deterministic scenario tests and stochastic rollouts with motion-quality diagnostics.

3. System Design

3.1. Overview

agile is a comprehensive workflow layer built on top of Isaac Lab (providing parallel GPU simulation and
MDP primitives) and RSL-RL (providing RL algorithms). It adds a four-stage pipeline (Figure 1) that wraps the
training loop with tooling for verification, reproducibility, evaluation, and deployment.

The workflow follows a configuration-driven, flat architecture: every task is a self-contained file specifying
the scene, observations, actions, rewards, terminations, and curriculum. Because every MDP parameter can be
modified directly via configuration, researchers can rapidly prototype, sweep parameters, and deploy policies
without structural code changes.

3.2. Training Preparation

Misconfigurations such as incorrect joint directions, collision geometries, or reward terms can waste days of
GPU time. agile provides three composable GUI plugins, built on Isaac Lab’s manager terms, that attach to
any environment for interactive pre-training validation:

Joint Position GUI. Per-joint slider control with real-time torque readout; an optional symmetry mode

displays mirrored robots side by side to spot sign errors in roll/yaw axes.

Object Manipulation GUI. 6-DOF object positioning with live contact-sensor visualization for verifying

that manipulation-based rewards activate correctly.

Reward Visualizer. Per-term reward overlay showing each component’s weight and contribution while

4

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

Figure 2: Deterministic Evaluation Pipeline. A unified framework for assessing humanoid policies across Isaac
Lab (GPU) and MuJoCo (CPU) backends.

users manipulate the scene, confirming reward behavior without running a training loop.

3.3. Training

A unified entry point manages training, evaluation, and parameter sweeps, supporting both local execution
and cloud deployment.

3.3.1. Training Infrastructure

To ensure reproducibility, agile records a lightweight git snapshot (commit hash, branch, and uncommitted
diffs) together with YAML configuration dumps for every run. Combined with Docker-based orchestration and
W&B logging, experiments are exactly reproducible.

AGILE also supports structured hyperparameter sweeps through scaled-dict parameters. Instead of inde-
pendently sweeping each entry of structured parameter groups (e.g., leg PD gains), scaled-dict allowed for
joint-parameter sweeping by scaling a single scaling parameter that is applied to the entire dictionary, preserving
relative structure while collapsing the search into a one-dimensional variable. Because AGILE builds on Isaac
Lab’s manager architecture, any MDP parameter, not only RL hyperparameters, can participate in these sweeps.

3.3.2. Algorithmic Toolbox

AGILE integrates several commonly used stabilization techniques as independently toggleable modules within
the training pipeline.

L2C2 Regularization. Given consecutive observations (x𝑡, x𝑡+1), we form an interpolated input ˜x =

x𝑡 + 𝛼 (x𝑡+1

x𝑡) with 𝛼

−

∼ 𝒰

(0, 1) and penalize the output change:

enforcing local Lipschitz continuity [7] for smooth, hardware-safe actions, also used in [12].

= 𝜆𝜋

𝜋(˜x)

‖

−

ℒ

𝜋(x𝑡)

‖

2 + 𝜆𝑉

⃦
⃦𝑉 ( ˜xp)

𝑉 (xp

𝑡 )⃦
2
⃦

,

−

(1)

5

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

Online Reward Normalization. Rewards are normalized [31] by a running standard deviation,

ˆ𝑟𝑡 =

𝜎𝑟

𝑟𝑡
𝜑𝛾

𝑐 + 𝜖

,

(2)

·
where 𝜖 = 10−2 prevents division by zero, 𝜎𝑟 is an EMA standard deviation across the environment batch,
√︀1
𝛾2 accounts for discounted return variance, and 𝑐 is a return-scale correction updated as
𝜑𝛾 = 1/
−
𝑐, where 𝜎𝐺 is the GAE return standard deviation. Because rewards are divided by 𝑐, the
𝛽) 𝜎𝐺
𝛽 𝑐 + (1
𝑐
−
𝑐 is invariant to the current normalization, making training largely invariant to reward magnitude
product 𝜎𝐺
changes during curriculum.

←

·

·

·

Value-Bootstrapped Terminations. Standard GAE bootstraps the value to zero at termination. The
conventional remedy—a sparse penalty 𝑝—is fragile: 𝑝 must satisfy 𝑝 < 𝑉 (x𝑇 ) for all terminal states, otherwise
the agent prefers dying over continuing when expected returns are negative. We instead modify the terminal
reward as

ˆ𝑟𝑇

←

ˆ𝑟𝑇 + 𝛾 𝑉 (x𝑇 ) +

𝜎 bad (e.g. falling)

⎧
⎪⎪⎨
−
+𝜎 good (e.g. reaching goal)
0 neutral (e.g. timeout)

⎪⎪⎩

(3)

The 𝛾𝑉 (x𝑇 ) term makes termination value-neutral (as if the episode continued), while 𝜎 > 0 shifts the
outcome to be strictly worse or better than continuing. Because 𝜎 operates after reward normalization, it
remains scale-invariant (𝜎=5 for all tasks). This is related to potential-based shaping [32], applied only at
terminal states. The modified Bellman operator is a 𝛾-contraction; with 𝛾=0.99, a bad termination offset of
𝜎=5 amplifies to an effective shift of 500 in value space.

Virtual Harness. Much like a physical harness that supports a person learning to walk, external PD
forces applied to the root body stabilize the robot during early training, preventing immediate collapse before
˙ℎ, where 𝐾𝑝/𝐾𝑑 are
the policy can discover useful behaviors: 𝜏 h = 𝐾𝑝 e𝑞
−
proportional/derivative gains, e𝑞 is the orientation error to upright, 𝜔 the angular velocity, and ℎ*/ℎ the
desired/current root height. A curriculum scale 𝑠
[0, 1] multiplies all gains and limits; supported schedules
are linear decay (𝑠 = 1
𝑡/𝑇 ), exponential decay (𝑠 = 𝑒(𝑡/𝑇 ) ln 0.01), and an adaptive variant that decreases 𝑠
−
only when the standing ratio exceeds a threshold.

𝐾𝑑 𝜔, fh = 𝐾𝑝 (ℎ*

𝐾𝑑

ℎ)

−

−

∈

Velocity Profile. When randomizing upper-body joint targets during locomotion training, abrupt position
jumps can destabilize the lower-body policy. agile provides pluggable velocity profiles that interpolate between
the current position q𝑡 and a sampled target q*:

• EMA. Exponential smoothing: q𝑡+1 = 𝛼ema q* +(1

Smooth, zero-overshoot.

−

𝛼ema) q𝑡, with 𝛼ema sampled uniformly per trajectory.

• Trapezoidal. Three-phase motion with bounded 𝑎max and 𝑣max: accelerate, cruise, decelerate. Joints

can be synchronized to finish simultaneously. Physically realistic.

• Linear. Constant-velocity interpolation. Simplest; suitable for non-critical joints.

All profiles support per-joint position and velocity limits.

Symmetry Augmentation. Observations and actions are mirrored to encourage symmetric locomotion and
effectively double training data [8]. The mapping is configuration-driven rather than index-based, enabling
adaptation to new observation spaces and robot morphologies.

Additional Modules. These include adaptive command sampling (biasing toward low-speed balancing),
upper-body velocity profiles (EMA, trapezoidal, linear interpolation), state caching for efficient resets (a one-
time rollout collects diverse initial states, e.g. fallen poses, avoiding repeated drop simulations during training),
and teacher-student distillation following RSL-RL with symmetry mirror loss.

6

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

Figure 3: Decoupled whole-body control: upper- and lower-body policies are trained separately. This design
allows greater flexibility to meet different application requirements. For example, an IK policy can be used for
high-accuracy tasks while a VLA upper-body policy enables autonomous execution with language input.

Transferring policies to real hardware requires both smooth and robust control. AGILE encourages smoothness
through action regularization penalties (norm, rate, acceleration) and L2C2, reducing high-frequency actions
that real actuators cannot reliably track. Robustness is improved through domain randomization—randomizing
dynamics, mass properties, contact parameters, and actuator delays—as established in sim-to-real transfer
literature [33, 34], together with external perturbations and sensor noise injection. These techniques are not
new learning algorithms; instead, AGILE provides a unified implementation and empirical characterization of
commonly used stabilization methods within a reproducible humanoid RL workflow.

3.4. Evaluation

Comparing policies solely with stochastic rollouts can mask failure modes that become visible only under
controlled conditions. agile therefore complements stochastic rollouts with deterministic scenario-driven
testing, where parallel environments receive identical scripted command sequences (e.g., velocity sweeps or
height ramps). The resulting evaluation pipeline combines stochastic rollouts, deterministic scenario tests,
and motion-quality diagnostics within a unified workflow. Crucially, this pipeline operates seamlessly in both
Isaac Lab and MuJoCo, allowing the same evaluation scenarios and metrics to be applied during sim-to-sim
validation (Figure 2).

Beyond aggregate task tracking, the pipeline analyzes deployment-critical per-joint motion-quality metrics

7

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

Table 2: MDP overview and training time (on a single L40) per task.

Task

Robot

Actions

Observation (pol/crit)

Reward dim Episode

Terrain

Training

Locomotion
Locomotion
Loco + Height
Stand-up
Stand-up
Motion Imitation
Pick & Place

G1
T1
G1
G1
T1
G1
G1

Leg pos (12)
Leg pos (10)
Leg pos (12)
All joints (rel)
All joints (rel)
All joints (rel)
Upper body

noisy / + scans
noisy / + vel,ht
noisy / + scans
noisy / + forces
noisy / + forces
noisy / + vel
tracking / –

15
20
22
18
18
9
10

30 s
30 s
30 s
15 s
15 s
8 s
25 s

rough
rough
rough
stand-up
stand-up
flat
flat

10h
10h
10h
25h
15h
6h
10h

such as RMS acceleration, jerk, and joint-limit violations. Deterministic scenarios provide reproducible, lower-
variance benchmarks for regression testing, while stochastic rollouts evaluate robustness under randomized
command distributions. All evaluation results are exported as standalone interactive HTML reports, enabling
rapid diagnosis of behaviors that may threaten hardware safety prior to deployment.

3.5. Deployment

agile builds on Isaac Lab’s I/O descriptor system, which exports trained policies to TorchScript alongside
auto-generated YAML configurations capturing the full I/O contract (joint names, observation ordering, history
buffers, action scaling). On top of this, agile provides export tooling and a complete sim-to-sim validation
pipeline in MuJoCo that reads the descriptors to automatically reconstruct observation assembly, action mapping,
and history buffers for inference. Hardware-specific driver integrations reuse the same I/O contract, so the core
inference logic remains identical; only the state provider changes. The descriptor also facilitates translating the
inference stack from Python to C++ for real-time execution on hardware.

4. Case Studies & Results

We validate agile across five representative tasks using the Unitree G1 and Booster T1 platforms. Table 2
provides a comprehensive summary of the MDP configurations and the estimated training hours required for
each task on a single L40. Although the reward signal often reaches convergence relatively early, we typically
extend training runs until 20k steps reached to ensure optimal policy performance and stability.

4.1. Velocity Tracking on Unitree G1 and Booster T1

The baseline locomotion policy tracks commanded (𝑣𝑥, 𝑣𝑦, 𝜔𝑧) using leg-joint position offsets (Figure 8a,b). To
encourage robustness, upper-body joints receive random targets via trapezoidal velocity profiles. This task
demonstrates agile’s generic configuration architecture. Both the Unitree G1 and Booster T1 use the exact
same MDP template and training pipeline. We utilize a preparation module to ensure the defined symmetry
terms are correct, allowing us to safely apply agile’s symmetry augmentation to double the effective training
data and enforce symmetric gaits. Additionally, the virtual harness is utilized for early stabilization, preventing
initial episode collapse. All locomotion tasks train on procedurally generated rough terrain with an adaptive
difficulty curriculum [1].

4.2. Height-Controlled Locomotion on Unitree G1

This task extends velocity tracking by introducing a commanded pelvis height, requiring the robot to maintain
stable locomotion across postures ranging from a deep crouch to a full stance (Figure 8a).

8

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

Figure 4: Velocity and height command tracking in MuJoCo. Each subplot shows a sweep of commanded values
(dashed) versus actual robot response (solid) for forward velocity, lateral velocity, yaw rate, and standing
height. The solid line is smoothed with the actual showing as the lighter shadow for easier visualization.

Decoupled WBC architecture. A critical design choice is “separated body control.” The RL policy controls
the leg joints exclusively, while the waist and upper-body joints are randomized using a trapezoidal velocity
profile during training. This deliberately reserves the upper degrees of freedom, enabling an independent
Inverse Kinematics (IK) or Vision-Language-Action (VLA) controller to take full ownership of the torso and
arms at deployment (Figure 3).

This task also serves as a case study for agile’s unified evaluation pipeline (Section 3.4), which combines
deterministic scenario tests, stochastic rollouts, and shared motion-quality diagnostics. Policies are first
evaluated in IsaacLab; we observed that consistent violations of joint limits reliably preclude successful sim-
to-sim transfer; policies are thus fine-tuned using these feedback signals. The pipeline then transitions to
MuJoCo, employing scripted height-ramp and velocity-sweep scenarios to provide reproducible, low-variance
benchmarks for controlled comparison, while stochastic command sampling assesses robustness. As shown in
Table 3, deterministic scenarios produce consistent tracking metrics over short horizons, whereas stochastic
rollouts have bigger variance (std is computed with 10 runs) and require substantially longer durations to
converge. This unified evaluation enables consistent quantitative comparisons between the privileged teacher
policy and distilled LSTM and history-MLP student architectures (Figure 4 and Table 3), demonstrating that
the evaluation pipeline generalizes across different policy structures.

9

01020304050−0.50−0.250.000.250.50Velocity(m/s)XVelocityTrackingActualvxCommandedvx01020304050−0.50−0.250.000.250.50Velocity(m/s)YVelocityTrackingActualvyCommandedvy01020304050Time(s)−1.0−0.50.00.51.0Angularvel(rad/s)YawRateTrackingActualωzCommandedωz01020304050Time(s)0.40.50.60.7Height(m)HeightTrackingActualhCommandedhAGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

Table 3: Sim-to-Sim evaluation of tracking on Unitree G1 velocity+height control. Left: deterministic sweep
(50 s) vs. random commands at increasing durations (2 s resample interval) over 10 runs. Right: teacher vs.
distilled student policies (deterministic sweep, 50 s).

Duration

𝑣𝑥 (m/s)
𝑣𝑦 (m/s)
𝜔𝑧 (rad/s)
ℎ (m)

Det.

50s

0.070
0.083
0.074
0.035

Teacher (Privileged)

Student (Distilled)

Random

Deterministic

50s

200s

500s

RNN (50s) Hist. (50s)

0.142±0.019
0.118±0.013
0.116±0.013
0.046±0.007

0.136±0.010
0.110±0.006
0.113±0.007
0.039±0.003

0.136±0.003
0.110±0.002
0.112±0.003
0.036±0.001

0.116
0.110
0.117
0.037

0.097
0.087
0.079
0.037

4.3. Stand-Up on Booster T1 & Unitree G1

Fall recovery is a complex whole-body control problem where the policy must coordinate all joints to transition
from a random fallen configuration to a stable standing pose [12]. Both policies successfully transfer to real
hardware (Figure 8c,d). To handle the massive scale differences between fine-grained postural rewards and
the large sparse bonus for standing, this task relies on online reward normalization. A pre-collected dataset of
diverse fallen poses (via agile’s state caching) provides varied initial configurations without wasting training
compute on repeated drops.

4.4. Motion Imitation on Unitree G1

We formulate a BeyondMimic-style [35] motion imitation task to demonstrate that agile generalizes beyond
standard command-tracking. The policy tracks an 8𝑠 dancing sequence by sampling harder segments more
frequently. Because the actor uses only hardware-available observations (no privileged state), the policy deploys
directly to the real Unitree G1 hardware without distillation (Figure 8e). The default BeyondMimic setup
with our motion reference data failed to transfer even to simulation. Therefore, we applied additional domain
randomization and L2C2 regularization to support sim-to-real transfer and suppress high-frequency actuator
oscillations during real-world deployment.

4.5. Loco-Manipulation & VLA Fine-Tuning

agile’s modular architecture freezes the locomotion policy from Section 4.2 as a lower-body controller while
an upper-body module is developed independently. We demonstrate this with a pick-and-place task on Unitree
G1, followed by VLA fine-tuning (Figure 5).

RL expert. An RL policy controls the right arm and waist only, guided by reference trajectories and privileged
simulation state (object pose, hand–object distance). Restricting the action space to the upper body reduces
training to 20k iterations. Object identity is varied across environments to promote visual diversity in the
resulting demonstrations.

VLA data collection and fine-tuning. The RL expert generates 100 successful trajectories via tiled parallel
simulation under physics and visual domain randomization, producing paired RGB observations, proprioception,
and actions without human teleoperation. A GR00T N1.5 VLA model is fine-tuned on this dataset, replacing
privileged inputs with RGB and language task descriptions. At deployment, the VLA predicts upper-body targets
while the frozen locomotion policy maintains lower-body stability.

10

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

Figure 5: GR00T post-training pipeline. (1) RL expert trained with physics randomization. (2) Demonstration
collection via tiled parallel rendering with scene randomization. (3) VLA fine-tuning on the collected dataset.
(4) Closed-loop evaluation in simulation.

In closed-loop simulation, the post-trained VLA reliably picks up the target object and places it to the side,
achieving a 90% success rate across 100 test cases with randomly sampled initial robot states. These results
validate effective transfer from privileged RL to perception-driven control.

5. Discussion & Limitations

5.1. Ablation Studies

We ablate five key enhancements independently.

5.1.1. Reward Normalizer

Online reward normalization makes training magnitude-agnostic, which is useful when reward scales shift
during curriculum progression or when porting configurations across robots. Figure 7(a) validates this on
Unitree G1 velocity tracking: at the original scale (1
), the normalizer provides a modest improvement, while
×
scale it recovers near-original performance.
at 100

×

5.1.2. L2C2

We evaluate L2C2 on a mimic-style task using our MuJoCo evaluation pipeline (15 deterministic rollouts, 8𝑠
each). Both policies successfully transfer to real hardware for the same dancing motion; however, without
L2C2 the actuators produce audible high-frequency oscillations. We quantify this via four deployment-critical
metrics (Figure 6): RMS joint acceleration, RMS joint jerk, joint limit violations, and high-frequency energy
ratio. L2C2 consistently reduces all four metrics, with the benefit increasing along the noise level.

11

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

Figure 6: Effect of L2C2 on motion smoothness under increasing observation noise. Subplots: RMS joint
acceleration, RMS joint jerk, position limit violations, and high-frequency energy ratio (fraction of joint-
trajectory energy above 10 Hz).

5.1.3. Value-Bootstrapped Terminations

Figure 7(b) compares value-bootstrapped terminations (𝜎=5) against a manually tuned termination penalty
on Booster T1 stand-up (5 seeds). The bootstrapped variant converges to a higher time-out ratio (fewer bad
terminations) with substantially lower seed variance (min/max shown), indicating more robust training. The
bootstrapped version requires no per-task penalty tuning; the same 𝜎 works across all tasks.

5.1.4. Virtual Harness

Figure 7(c) shows the effect of the virtual harness on Unitree G1 height-controlled locomotion (5 seeds). With
the harness (decayed over the first 2k iterations), training recovers from the initial negative-reward phase
faster and converges to higher final reward. Without the harness, the policy spends longer in unstable regimes
and converges lower, with higher variance across seeds.

5.1.5. Symmetry Augmentation

Figure 7(d) shows symmetry augmentation on Booster T1 velocity tracking. Mirroring observations and
actions doubles effective data per batch and enforces symmetric gaits. The reward improvement is modest but
consistent across all seeds; the primary benefit is behavioral symmetry, not captured by the reward curve.

12

1.01.52.02.530354045RMS(rad/s²)JointAcceleration1.01.52.02.51000120014001600RMS(rad/s³)JointJerk1.01.52.02.5NoiseScale0816243240485664CountPositionLimitViolations1.01.52.02.5NoiseScale0.060.080.100.120.14RatioHFEnergyRatio(>10Hz)WithoutL2C2WithL2C2AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

1std unless noted). (a) Reward normalization; dashed curves
Figure 7: Ablation studies (5 seeds, shaded =
before training and rescale for comparability. (b) Value-bootstrapped vs. tuned
scale all rewards by 100
termination penalty (shaded = min/max). (c) Virtual harness on height-controlled locomotion. (d) Symmetry
augmentation.

±

×

5.2. Sim-to-Real Transfer

All five tasks transfer to real hardware—with success defined by stable execution, absence of controller instability,
and the completion of the designated task—while the loco-manipulation task is additionally validated in
simulation via the VLA pipeline. Figure 8 shows stand-up on both robots and dancing on Unitree G1; Figure 4
and Table 3 report sim-to-sim tracking metrics for height-controlled locomotion. The main failure modes
during development were sim-to-real gaps (actuator modeling, contact dynamics) and overly aggressive policies
producing motions that real actuators cannot follow. Both were addressed by the domain randomization and
policy regularization described in Section 3. Since no external motion-capture system was available, sim-to-real
transfer is validated qualitatively through hardware demonstrations; quantitative tracking metrics are reported
via the MuJoCo pipeline (Table 3). The sim-to-real pipeline will also be released in the near future separately.
A supplementary video demonstrating all tasks on hardware is attached.

5.3. Limitations & Outlook

AGILE is currently validated on two humanoid platforms (Unitree G1 and Booster T1), and broader hardware
validation remains future work. The framework builds on Isaac Lab, which simplifies integration with GPU-
based simulation but introduces dependency on upstream APIs. In addition, the tasks studied here are primarily
proprioceptive; perception-driven manipulation and more dynamic locomotion behaviors (e.g., running or stair
climbing) are not yet included. Future work will expand robot and task coverage while continuing to validate

13

0500100015002000Iteration0100200300Reward(a)G1VelocityTracking1x,normon1x,normoff100×,normon(/100)100×,normoff(/100)010002000300040005000Iteration0.20.40.60.8Time-OutTermination(b)T1Stand-UpManuallytunedterminationpenaltyValue-bootstrappedterminationpenalty0200040006000800010000Iteration−200−1000100Reward(c)G1Velocity+HeightTrackingWithharnessNoharness010002000300040005000Iteration050100150Reward(d)T1VelocityTrackingSymmetryonSymmetryoffAGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

Figure 8: Sim-to-real transfer across five tasks on two robot platforms. (a) Velocity and height controlled
locomotion on Unitree G1. (b) Velocity controlled locomotion on Booster T1. (c) Stand-up on Unitree G1.
(d) Stand-up on Booster T1. (e) Motion imitation (dancing) on Unitree G1.

new capabilities through real-world deployment.

6. Acknowledgment

We thank Zhengyi Luo, Chenran Li and Xinghao Zhu for their discussion on modeling and training. We thank
Rafael Wiltz, Sergey Grizan, Lotus Li, Tiffany Chen, David Chu and John Welsh for their discussion and feedback
on tele-operation and data pipeline integration. We also thank H. Hawkeye King, Stephan Pleines and Vishal
Kulkarni for their support on experiment and code release.

References

[1] N. Rudin, D. Hoeller, P. Reist, and M. Hutter, “Learning to walk in minutes using massively parallel deep

reinforcement learning,” in Conference on Robot Learning (CoRL), 2022. 1, 8

[2] X. Cheng, K. Shi, A. Agarwal, and D. Pathak, “Expressive whole-body control for humanoid robots,” arXiv

preprint arXiv:2402.16796, 2024. 1

[3] I. Radosavovic, B. Zhang, B. Shi, J. Rajasegaran, S. Kamath, T. Darrell, K. Sreenath, and J. Malik,

“Humanoid locomotion as next token prediction,” arXiv preprint arXiv:2402.19469, 2024. 1

14

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

[4] T. He, Z. Luo, X. He, W. Xiao, C. Zhang, W. Zhang, K. Kitani, C. Liu, and G. Shi, “Learning human-to-

humanoid real-time whole-body teleoperation,” arXiv preprint arXiv:2403.04436, 2024. 1

[5] Z. Chen, M. Ji, X. Cheng, X. Peng, X. B. Peng, and X. Wang, “Gmt: General motion tracking for humanoid

whole-body control,” 2025. [Online]. Available: https://arxiv.org/abs/2506.14770 1

[6] Z. Luo, Y. Yuan, T. Wang, C. Li et al., “Sonic: Supersizing motion tracking for natural humanoid

whole-body control,” 2025. [Online]. Available: https://arxiv.org/abs/2511.07820 1

[7] T. Kobayashi, “L2C2: Locally Lipschitz continuous constraint towards stable and smooth reinforcement
learning,” in 2022 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), 2022. 2, 3,
5

[8] M. Mittal, N. Rudin, V. Klemm, A. Allshire, and M. Hutter, “Symmetry considerations for learning task
symmetric robot policies,” in 2024 IEEE International Conference on Robotics and Automation (ICRA),
2024, pp. 7433–7439. 2, 6

[9] Q. Ben, F. Jia, J. Zeng, J. Dong, D. Lin, and J. Pang, “Homie: Humanoid loco-manipulation with
isomorphic exoskeleton cockpit,” 2025. [Online]. Available: https://arxiv.org/abs/2502.13013 2, 3

[10] J. Li, X. Cheng, T. Huang, S. Yang, R.-Z. Qiu, and X. Wang, “Amo: Adaptive motion optimization for hyper-
dexterous humanoid whole-body control,” 2025. [Online]. Available: https://arxiv.org/abs/2505.03738
2

[11] C. Lu, X. Cheng, J. Li, S. Yang, M. Ji, C. Yuan, G. Yang, S. Yi, and X. Wang, “Mobile-
television: Predictive motion priors for humanoid whole-body control,” 2025. [Online]. Available:
https://arxiv.org/abs/2412.07773 3

[12] T. Huang, J. Ren, H. Wang, Z. Wang, Q. Ben, M. Wen, X. Chen, J. Li, and J. Pang, “Learning humanoid
standing-up control across diverse postures,” 2025. [Online]. Available: https://arxiv.org/abs/2502.08378
3, 5, 10

[13] X. He, R. Dong, Z. Chen, and S. Gupta, “Learning getting-up policies for real-world humanoid robots,”

2025. [Online]. Available: https://arxiv.org/abs/2502.12152 3

[14] M. Ji, X. Peng, F. Liu, J. Li, G. Yang, X. Cheng, and X. Wang, “Exbody2: Advanced expressive humanoid

whole-body control,” 2025. [Online]. Available: https://arxiv.org/abs/2412.13196 3

[15] Z. Sun, Y. Peng, Y. Meng, X. Li, B.-S. Huang, Z. Bing, X. Wang, and A. Knoll, “Robotdancing:
Residual-action reinforcement learning enables robust long-horizon humanoid motion tracking,” 2025.
[Online]. Available: https://arxiv.org/abs/2509.20717 3

[16] X. Xu, Y. Zhang, Y.-L. Li, L. Han, and C. Lu, “Humanvla: Towards vision-language directed object
rearrangement by physical humanoid,” 2024. [Online]. Available: https://arxiv.org/abs/2406.19972 3

[17] V. Makoviychuk, L. Wawrzyniak, Y. Guo, M. Lu, K. Storey, M. Macklin, D. Hoeller, N. Rudin, A. Allshire,
A. Handa, and G. State, “Isaac gym: High performance gpu-based physics simulation for robot learning,”
in Advances in Neural Information Processing Systems (NeurIPS) Datasets and Benchmarks, 2021. 3

[18] NVIDIA, M. Mittal, P. Roth, J. Tigue, A. Richard, O. Zhang et al., “Isaac lab: A gpu-accelerated simulation
framework for multi-modal robot learning,” 2025. [Online]. Available: https://arxiv.org/abs/2511.04831
3

[19] K. Zakka, B. Tabanpour, Q. Liao, M. Haiderbhai, S. Holt, J. Y. Luo, A. Allshire, E. Frey, K. Sreenath, L. A.
Kahrs, C. Sferrazza, Y. Tassa, and P. Abbeel, “Mujoco playground,” arXiv preprint arXiv:2502.08844, 2025.
3

15

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

[20] Amazon FAR, “Holosoma: An open-source framework for humanoid robot learning,” https://github.com/

amazon-far/holosoma, 2025. 3

[21] Y. Seo, C. Sferrazza, H. Geng, M. Nauman, Z.-H. Yin, and P. Abbeel, “Fasttd3: Simple, fast, and capable

reinforcement learning for humanoid control,” arXiv preprint arXiv:2505.22642, 2025. 3

[22] LeCAR-Lab, “Humanoidverse: A multi-simulator framework for humanoid robot sim-to-real learning,”

https://github.com/LeCAR-Lab/HumanoidVerse, 2025. 3

[23] C. Tessler*, Y. Jiang*, X. B. Peng, E. Coumans, Y. Shi, H. Zhang, D. Rempe, G. Chechik†, and S. Fidler†,
“Protomotions3: An open-source framework for humanoid simulation and control,” https://github.com/
NVLabs/ProtoMotions/, 2025. 3

[24] H. Geng, F. Wang, S. Wei et al., “Roboverse: Towards a unified platform, dataset and benchmark for
scalable and generalizable robot learning,” 2025. [Online]. Available: https://arxiv.org/abs/2504.18904
3

[25] S. Mysore, B. Mabsout, R. Mansell et al., “Regularizing action policies for smooth control with reinforce-

ment learning,” in IEEE International Conference on Robotics and Automation (ICRA), 2021. 3

[26] J. Song et al., “Asap: Action smoothing by aligning actions with predictions from preceding states,” 2025.

[Online]. Available: https://arxiv.org/html/2502.01143v1 4

[27] G. Brockman, V. Cheung, L. Pettersson, J. Schneider, J. Schulman, J. Tang, and W. Zaremba, “Openai

gym,” arXiv preprint arXiv:1606.01540, 2016. 4

[28] Y. Tassa, Y. Doron, A. Muldal, T. Erez, Y. Li, D. Casas, D. Budden, A. Abdolmaleki, J. Merel, A. Lefrancq

et al., “Deepmind control suite,” arXiv preprint arXiv:1801.00690, 2018. 4

[29] S. Gu et al., “Humanoidbench: Simulated humanoid benchmark for whole-body locomotion and manipu-

lation,” in Robotics: Science and Systems (RSS), 2024. 4

[30] T. Wu, H. Guo, Y. Wang, J. Yang, X. Sui, J. Xie, X. Chen, Z. Liu, and X. Lan, “Toward reliable sim-to-real
predictability for moe-based robust quadrupedal locomotion,” arXiv preprint arXiv:2602.00678, 2026. 4

[31] M. Andrychowicz, A. Raichuk, P. Stańczyk, M. Orsini, S. Girgin, R. Marinier, L. Hussenot, M. Geist,
O. Pietquin, M. Michalski, S. Gelly, and O. Bachem, “What matters in on-policy reinforcement learning? A
large-scale empirical study,” in International Conference on Learning Representations (ICLR), 2021. 6

[32] A. Y. Ng, D. Harada, and S. Russell, “Policy invariance under reward transformations: Theory and
application to reward shaping,” in Proceedings of the Sixteenth International Conference on Machine
Learning (ICML), 1999, pp. 278–287. 6

[33] J. Tobin, R. Fong, A. Ray, J. Schneider, W. Zaremba, and P. Abbeel, “Domain randomization for transferring
deep neural networks from simulation to the real world,” in IEEE/RSJ International Conference on Intelligent
Robots and Systems (IROS), 2017. 7

[34] X. B. Peng, M. Andrychowicz, W. Zaremba, and P. Abbeel, “Sim-to-real transfer of robotic control with
dynamics randomization,” in IEEE International Conference on Robotics and Automation (ICRA), 2018. 7

[35] Q. Liao, T. E. Truong, X. Huang, Y. Gao, G. Tevet, K. Sreenath, and C. K. Liu, “Beyondmimic:
From motion tracking to versatile humanoid control via guided diffusion,” 2025. [Online]. Available:
https://arxiv.org/abs/2508.08241 10

16

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

A. Appendix

A.1. Best Practices

Based on extensive experimentation across tasks and robots, we distill the following practical guidelines:

1. Robot model validation. Validate the USD model before any training. Spawn the robot on a flat ground
plane in an interactive simulator, let it settle under gravity, and manually perturb it—the behavior should
look physically plausible. Sweep all joints to their limits to verify correct signs and clamping, and use
agile’s joint debug GUI with symmetry mode to catch mirrored sign errors. A wrong joint axis wastes
more GPU hours than any hyperparameter misconfiguration.

2. MDP validation. Once the robot model is verified, validate the training environment before launching
long runs. Confirm that a zero-action command produces a stable stand (catches incorrect default poses
or action offsets), use the reward visualizer to verify that each reward term activates as expected, and
check that observations have plausible values and ranges. These checks take minutes and prevent days of
wasted training.

3. Reward composition. Structure rewards into three groups: task (what to achieve), style (how it should
look), and regularization (what to avoid). As a rule of thumb, start simple: task rewards plus basic
regularization to prevent unsafe behaviors, then incrementally add style and further regularization terms
once the core task is solved.

4. Termination design. If mean episode length collapses to near zero, the agent has become “suicidal”:
the expected return from continuing (accumulating negative rewards) is worse than terminating and
resetting. The immediate fix is to increase the termination penalty (make it more negative), but this
requires per-task tuning and can break as the value landscape shifts during training. Value-bootstrapped
terminations (Section 5.1.3) offer a more principled solution by making termination value-neutral and
adding a fixed offset 𝜎, removing the need for per-task penalty tuning. However, because the value
function’s own predictions are bootstrapped at terminal states, inaccurate estimates can feed back into
training targets. If value loss increases after enabling bootstrapped terminations, reduce 𝜎 or address the
underlying reward signal first. Conversely, always terminate episodes when the robot enters unrecoverable
states (e.g. fallen) to avoid wasting training compute on hopeless trajectories.

5. Curriculum design. Two strategies: fading guidance (start with assistance, remove it) and increasing diffi-
culty (start easy, ramp up penalties or terrain complexity). The harness force (Section 3.3.2) implements
the former; terrain progression implements the latter.

6. Observation design. Train teachers with privileged observations (terrain scans, contact forces, true
velocities). Distill to students using only sensor-realistic inputs. Always add noise to policy observations
matching expected sensor characteristics.

7. Training monitoring. Track task metrics alongside reward curves: rising reward with stagnant task
performance indicates reward hacking. Monitor value loss (should converge well below 1.0; if too high,
scale down reward magnitudes or enable reward normalization to stabilize bootstrapping) and policy
noise standard deviation (may increase initially during exploration but should decrease over the course
of training; persistent growth signals that the entropy bonus dominates the task gradient). If noise
keeps growing, first improve the reward function (cleaner advantages outweigh the entropy gradient),
then reduce the entropy coefficient, or run a fraction of environments without domain randomization
to guarantee clean gradient signal in every batch. Record periodic rollout videos—plots alone can be
misleading.

8. Seed robustness. Test across

5 random seeds before drawing conclusions. A single lucky seed does not
validate an MDP design. RL training is inherently sensitive to random seeds, and designing seed-robust
environments is difficult; high variance across seeds often points to a fragile reward or curriculum design
rather than bad luck.

≥

17

AGILE: A Comprehensive Workflow
for Humanoid Loco-Manipulation Learning

9. Sim-to-real transfer. Successful transfer rests on two pillars: robustness via domain randomization
and smoothness via action regularization. For regularization, directly regularize the policy output via
action norm, action rate (consecutive differences), and action acceleration (second-order differences)
penalties; L2C2 further enforces smooth observation-to-action mappings. A policy that appears smooth in
simulation may be relying on high simulated damping to mask aggressive actions—the policy itself must
output smooth commands. Domain randomization combined with these regularization terms were the
most effective levers in our experience. History-based or recurrent policies can implicitly adapt to real
dynamics at inference time, partially compensating for remaining sim-to-real gaps. If hardware behavior
diverges significantly from simulation, the simulation is likely wrong: fix the simulation to match reality
rather than compensating with reward shaping.

Finally, no single technique listed above works universally. Reinforcement learning offers no magic trick that
reliably helps across all tasks and robots. agile provides a toolbox of composable modules, but each must be
evaluated empirically for the problem at hand.

A.2. Hyperparameter Tables

Table 4: PPO hyperparameters. Task-specific overrides in parentheses.

Parameter

Value

Actor network
Critic network
Activation
Learning rate
Discount 𝛾
GAE 𝜆
Clip ratio
Mini-batches
Learning epochs
Entropy coeff.
Num. environments
Symmetry augmentation
L2C2
Reward normalizer

[256, 256, 128] (pick&place: [256, 128, 64])
[512, 256, 128] (pick&place: [256, 128, 64])
ELU
10−3
0.99 (stand-up: 0.995)
0.95
0.2
4
5
0.005 (height: 0.01, stand-up: 0.0025)
4096
L-R mirror (except pick&place)
𝜆𝜋=1.0, 𝜆𝑉 =0.1
𝛽=0.999, 𝜖=0.01

18
