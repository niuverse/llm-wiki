##### Report GitHub Issue

×

Title:

Content selection saved. Describe the issue below:

Description:

Submit without GitHub
Submit in GitHub

[![arXiv logo](/static/browse/0.3.4/images/arxiv-logo-one-color-white.svg)
Back to arXiv](/)

[Why HTML?](https://info.arxiv.org/about/accessible_HTML.html)
Report Issue

[Back to Abstract](/abs/2603.20147v1 "Back to abstract page")

[Download PDF](/pdf/2603.20147v1 "Download PDF")

1. [Abstract](#abstract1 "In AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
2. [1 Introduction](#S1 "In AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
3. [2 Related Work](#S2 "In AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   1. [2.1 GPU-Accelerated Simulation Primitives](#S2.SS1 "In 2 Related Work ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   2. [2.2 Humanoid Learning Frameworks](#S2.SS2 "In 2 Related Work ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   3. [2.3 Algorithmic Techniques for Sim-to-Real Transfer](#S2.SS3 "In 2 Related Work ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   4. [2.4 Evaluation and Benchmarking](#S2.SS4 "In 2 Related Work ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
4. [3 System Design](#S3 "In AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   1. [3.1 Overview](#S3.SS1 "In 3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   2. [3.2 Training Preparation](#S3.SS2 "In 3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   3. [3.3 Training](#S3.SS3 "In 3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
      1. [3.3.1 Training Infrastructure](#S3.SS3.SSS1 "In 3.3 Training ‣ 3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
      2. [3.3.2 Algorithmic Toolbox](#S3.SS3.SSS2 "In 3.3 Training ‣ 3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   4. [3.4 Evaluation](#S3.SS4 "In 3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   5. [3.5 Deployment](#S3.SS5 "In 3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
5. [4 Case Studies & Results](#S4 "In AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   1. [4.1 Velocity Tracking on Unitree G1 and Booster T1](#S4.SS1 "In 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   2. [4.2 Height-Controlled Locomotion on Unitree G1](#S4.SS2 "In 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   3. [4.3 Stand-Up on Booster T1 & Unitree G1](#S4.SS3 "In 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   4. [4.4 Motion Imitation on Unitree G1](#S4.SS4 "In 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   5. [4.5 Loco-Manipulation & VLA Fine-Tuning](#S4.SS5 "In 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
6. [5 Discussion & Limitations](#S5 "In AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   1. [5.1 Ablation Studies](#S5.SS1 "In 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
      1. [5.1.1 Reward Normalizer](#S5.SS1.SSS1 "In 5.1 Ablation Studies ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
      2. [5.1.2 L2C2](#S5.SS1.SSS2 "In 5.1 Ablation Studies ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
      3. [5.1.3 Value-Bootstrapped Terminations](#S5.SS1.SSS3 "In 5.1 Ablation Studies ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
      4. [5.1.4 Virtual Harness](#S5.SS1.SSS4 "In 5.1 Ablation Studies ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
      5. [5.1.5 Symmetry Augmentation](#S5.SS1.SSS5 "In 5.1 Ablation Studies ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   2. [5.2 Sim-to-Real Transfer](#S5.SS2 "In 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   3. [5.3 Limitations & Outlook](#S5.SS3 "In 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
7. [6 Acknowledgment](#S6 "In AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
8. [References](#bib "In AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
9. [A Appendix](#A1 "In AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   1. [A.1 Best Practices](#A1.SS1 "In Appendix A Appendix ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")
   2. [A.2 Hyperparameter Tables](#A1.SS2 "In Appendix A Appendix ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")

[License: CC BY-SA 4.0](https://info.arxiv.org/help/license/index.html#licenses-available)

arXiv:2603.20147v1 [cs.RO] 20 Mar 2026

# AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning

Huihua Zhao\*

Rafael Cathomen\*

Lionel Gulich

Wei Liu

Efe Arda Ongan

Michael Lin

Shalin Jain

Soha Pouya

Yan Chang

\*Equal contribution.

###### Abstract

Recent advances in reinforcement learning (RL) have enabled impressive humanoid behaviors in simulation, yet transferring these results to new robots remains challenging. In many real deployments, the primary bottleneck is no longer simulation throughput or algorithm design, but the absence of systematic infrastructure that links environment verification, training, evaluation, and deployment in a coherent loop.

To address this gap, we present AGILE, an end-to-end workflow for humanoid RL that standardizes the policy-development lifecycle to mitigate common sim-to-real failure modes. AGILE comprises four stages: (1) interactive environment verification, (2) reproducible training, (3) unified evaluation, and (4) descriptor-driven deployment via robot/task configuration descriptors. For evaluation stage, AGILE supports both scenario-based tests and randomized rollouts under a shared suite of motion-quality diagnostics, enabling automated regression testing and principled robustness assessment. AGILE also incorporates a set of training stabilizations and algorithmic enhancements in training stage to improve optimization stability and sim-to-real transfer.

With this pipeline in place, we validate AGILE across five representative humanoid skills spanning locomotion, recovery, motion imitation, and loco-manipulation on two hardware platforms (Unitree G1 and Booster T1), achieving consistent sim-to-real transfer. Overall, AGILE shows that a standardized, end-to-end workflow can substantially improve the reliability and reproducibility of humanoid RL development.

Code: <https://github.com/nvidia-isaac/WBC-AGILE>

\abscontent

## 1 Introduction

Reinforcement learning has enabled increasingly capable humanoid locomotion and manipulation policies [rudin2022learning, cheng2024expressive, radosavovic2024humanoid, he2024learning, chen2025gmtgeneralmotiontracking, luo2025sonicsupersizingmotiontracking], yet translating these results to new robots and tasks remains fragile and labor-intensive. In practice, failures rarely stem from insufficient simulation throughput or algorithmic novelty, but from the absence of structured infrastructure connecting environment verification, scalable training, systematic evaluation, and deployment.

The Workflow Gap: Humanoid RL development is often built on fragmented and ad hoc workflows. Basic environment issues, such as reversed joint axes or incorrect reward terms, are frequently discovered only after costly training runs. Policy evaluation is also commonly performed through stochastic rollouts, which measure average task performance under randomized commands but can make it difficult to diagnose hardware-critical behaviors such as joint limit violations or high-frequency actuation. As a result, the lifecycle of humanoid RL development, from environment verification to deployment, remains poorly structured and hard to reproduce.

The Transfer Gap: Exporting a learned policy for external validation or hardware deployment is a notoriously fragile process. Without a standardized I/O contract, researchers must manually resolve joint order mismatches, reconstruct observation history buffers, and align action scaling. This ad hoc translation introduces silent bugs and prevents the use of a unified evaluation pipeline across secondary simulators (like MuJoCo), forcing researchers to risk physical deployment without rigorous, quantitative pre-validation.

![Refer to caption](2603.20147v1/x1.png)

Figure 1: Overview of agile learning workflow. The workflow covers prepare-training, batch cloud training with reproducible logging and deployment-oriented features, evaluation using quantitative motion metrics and automated HTML reports, and deployment by exporting the learned policy and I/O descriptors for Sim2Sim and Sim2Real transfer. Example applications include locomotion, loco-manipulation, DeepMimic-style imitation, and synthetic data generation (SDG) for VLA training, supported by an algorithmic enhancements library (e.g., curricula, regularization, adaptive sampling, reward normalization, symmetry augmentation, and distillation).

To resolve these bottlenecks, we present AGILE (A Generic Isaac-Lab based Engine), an open-source workflow built on Isaac Lab and RSL-RL that covers the full path from a new robot to a deployed policy. AGILE bridges the workflow and transfer gaps through a four-stage pipeline (Figure [1](#S1.F1 "Figure 1 ‣ 1 Introduction ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")):

1. 1.

   Prepare: Interactive debug GUIs (for joint control, object manipulation, and reward visualization) allow researchers to catch robot model and MDP misconfigurations in minutes before committing GPU hours.
2. 2.

   Train: A scalable, reproducible training environment featuring automated hyperparameter sweeps, experiment tracking, and a suite of independently toggleable algorithmic enhancements.
3. 3.

   Evaluate: A unified evaluation pipeline combining deterministic scenario-based tests and stochastic rollouts. Parallel environments receive scripted or randomized commands to evaluate deployment-critical motion metrics such as joint jerk and limit violations.
4. 4.

   Deploy: Trained policies are auto-exported alongside self-contained YAML I/O descriptors that resolve joint ordering and action scaling. This powers a unified inference pipeline for both quantitative sim-to-sim validation in MuJoCo and real-world hardware deployment.

Beyond infrastructure, agile also packages a suite of training enhancements for sim-to-real transfer (L2C2 [kobayashi2022l2c2], reward normalization, value-bootstrapped terminations, symmetry augmentation [mittal2024symmetry], virtual harness), each validated through thorough ablations. To further showcase agile’s modularity, we present a decoupled whole-body control application [ben2025homiehumanoidlocomanipulationisomorphic, li2025amoadaptivemotionoptimization], in which a frozen locomotion policy serves as a lower-body API while an independent upper-body expert collects demonstration data for VLA fine-tuning [lu2025mobiletelevisionpredictivemotionpriors].

Conceptually, AGILE reframes humanoid reinforcement learning as a structured engineering lifecycle rather than a collection of loosely connected scripts. By formalizing interfaces across verification, training, evaluation, and deployment, the framework enables deterministic regression testing, deployment-oriented motion diagnostics, and descriptor-consistent policy export prior to hardware trials. This shifts humanoid RL development from empirical trial-and-error toward repeatable, quantitatively validated engineering.

We validate the complete workflow across five tasks on the Unitree G1 and Booster T1: velocity tracking, height-controlled locomotion [ben2025homiehumanoidlocomanipulationisomorphic], stand-up [huang2025learninghumanoidstandingupcontrol, he2025learninggettinguppoliciesrealworld], motion imitation [ji2025exbody2advancedexpressivehumanoid, sun2025robotdancingresidualactionreinforcementlearning], and loco-manipulation with VLA [xu2024humanvlavisionlanguagedirectedobject]. Our contributions are:

* •

  A structured lifecycle for humanoid RL, integrating environment verification, training, evaluation, and descriptor-driven deployment into a unified workflow.
* •

  A unified evaluation framework combining deterministic scenario tests and stochastic rollouts with per-joint motion-quality metrics (jerk, limit violations) for quantitatively regression test and deployment-oriented policy validation.
* •

  Validation across five tasks and two platforms, with sim-to-real transfer for locomotion, recovery, imitation, and loco-manipulation, released as open-source with pre-trained checkpoints.

## 2 Related Work

We categorize related work into simulation platforms, humanoid learning frameworks, algorithmic techniques for sim-to-real transfer, and evaluation methodologies.

### 2.1 GPU-Accelerated Simulation Primitives

GPU-based simulators have significantly accelerated reinforcement learning for robotics. Isaac Gym [makoviychuk2021isaac] introduced tensor-based simulation pipelines that eliminate CPU–GPU bottlenecks, while Isaac Lab [nvidia2025isaaclabgpuacceleratedsimulation] extends this approach with a modular manager-based architecture and USD-based scene configuration. Parallel efforts such as MuJoCo Playground [zakka2025mujoco] bring GPU acceleration to the MuJoCo physics engine. While these platforms provide powerful simulation primitives, they primarily focus on simulation performance and environment modeling rather than the workflow surrounding debugging, evaluation, and deployment.

### 2.2 Humanoid Learning Frameworks

Several recent frameworks aim to scale humanoid learning pipelines. Holosoma focuses on large-scale infrastructure and fast off-policy learning for humanoid locomotion [amazon-holosoam, seo2025fasttd3]. HumanoidVerse emphasizes cross-simulator compatibility through abstraction layers across multiple physics engines [humanoidverse2025], ProtoMotions provides an Isaac Lab-native framework for motion tracking and humanoid control [ProtoMotions], and RoboVerse provides unified interfaces for scalable robot learning across tasks and embodiments [geng2025roboverse]. These frameworks primarily address training scalability and simulator interoperability. In contrast, agile focuses on the broader development lifecycle of humanoid RL policies, including environment verification, deterministic evaluation, and deployment. Table [1](#S2.T1 "Table 1 ‣ 2.2 Humanoid Learning Frameworks ‣ 2 Related Work ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning") summarizes key differences.

Table 1: Feature comparison of humanoid RL frameworks. ✓= supported, ∼\sim= partial, – = not supported.

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| Feature | agile | Holosoma | H.Verse | Proto. |
| Env. debugging | ✓ | – | – | – |
| Algo. enhancements | ✓ | ∼\sim | – | ∼\sim |
| Determ. evaluation | ✓ | ∼\sim | – | ✓ |
| Sim-to-sim pipeline | ✓ | ✓ | ✓ | ✓ |
| Descriptor-driven export | ✓ | – | – | – |
| Sim-to-real validation | ✓ | ✓ | ✓ | ✓ |
| Multi-sim backend support | – | – | ✓ | ✓ |

### 2.3 Algorithmic Techniques for Sim-to-Real Transfer

A number of approaches improve policy robustness for real-world deployment. CAPS encourages smoother control policies through action regularization [mysore2021caps], while L2C2 enforces local Lipschitz continuity to improve stability under observation perturbations [kobayashi2022l2c2]. Other approaches such as ASAP use data from real world deployments to learn a residual action policy that enables simulation dynamics to better align with real world dynamics [song2025asap]. While these techniques improve policy stability, they are typically applied independently. AGILE instead integrates such stabilization methods within a unified training and evaluation workflow.

### 2.4 Evaluation and Benchmarking

Earlier benchmark suites such as OpenAI Gym [brockman2016gym] and the DeepMind Control Suite [tassa2018dmcontrol] established standardized task evaluation in simulation, motivating similar rigor for humanoid systems. HumanoidBench provides simulation benchmarks for locomotion and manipulation tasks [gu2024humanoidbench], while RoboGauge proposes a predictive assessment suite for quantifying sim-to-real transferability in quadrupedal locomotion [wu2026robogauge]. Related efforts from the IEEE Humanoid Study Group seek standardized metrics for stability and safety in humanoid systems. AGILE builds on this direction by incorporating a unified evaluation framework into the RL development workflow, supporting deterministic scenario tests and stochastic rollouts with motion-quality diagnostics.

## 3 System Design

### 3.1 Overview

agile is a comprehensive workflow layer built on top of Isaac Lab (providing parallel GPU simulation and MDP primitives) and RSL-RL (providing RL algorithms). It adds a four-stage pipeline (Figure [1](#S1.F1 "Figure 1 ‣ 1 Introduction ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")) that wraps the training loop with tooling for verification, reproducibility, evaluation, and deployment.

The workflow follows a configuration-driven, flat architecture: every task is a self-contained file specifying the scene, observations, actions, rewards, terminations, and curriculum. Because every MDP parameter can be modified directly via configuration, researchers can rapidly prototype, sweep parameters, and deploy policies without structural code changes.

### 3.2 Training Preparation

Misconfigurations such as incorrect joint directions, collision geometries, or reward terms can waste days of GPU time. agile provides three composable GUI plugins, built on Isaac Lab’s manager terms, that attach to any environment for interactive pre-training validation:

Joint Position GUI. Per-joint slider control with real-time torque readout; an optional symmetry mode displays mirrored robots side by side to spot sign errors in roll/yaw axes.

Object Manipulation GUI. 6-DOF object positioning with live contact-sensor visualization for verifying that manipulation-based rewards activate correctly.

Reward Visualizer. Per-term reward overlay showing each component’s weight and contribution while users manipulate the scene, confirming reward behavior without running a training loop.

![Refer to caption](2603.20147v1/figures/eval_pipeline_idea2.jpg)

Figure 2: Deterministic Evaluation Pipeline. A unified framework for assessing humanoid policies across Isaac Lab (GPU) and MuJoCo (CPU) backends.

### 3.3 Training

A unified entry point manages training, evaluation, and parameter sweeps, supporting both local execution and cloud deployment.

#### 3.3.1 Training Infrastructure

To ensure reproducibility, agile records a lightweight git snapshot (commit hash, branch, and uncommitted diffs) together with YAML configuration dumps for every run. Combined with Docker-based orchestration and W&B logging, experiments are exactly reproducible.

AGILE also supports structured hyperparameter sweeps through *scaled-dict parameters*. Instead of independently sweeping each entry of structured parameter groups (e.g., leg PD gains), scaled-dict allowed for joint-parameter sweeping by scaling a single scaling parameter that is applied to the entire dictionary, preserving relative structure while collapsing the search into a one-dimensional variable. Because AGILE builds on Isaac Lab’s manager architecture, any MDP parameter, not only RL hyperparameters, can participate in these sweeps.

#### 3.3.2 Algorithmic Toolbox

AGILE integrates several commonly used stabilization techniques as independently toggleable modules within the training pipeline.

L2C2 Regularization.
Given consecutive observations (𝐱t,𝐱t+1)(\mathbf{x}\_{t},\mathbf{x}\_{t+1}), we form an
interpolated input
𝐱~=𝐱t+α​(𝐱t+1−𝐱t)\tilde{\mathbf{x}}=\mathbf{x}\_{t}+\alpha\,(\mathbf{x}\_{t+1}-\mathbf{x}\_{t}) with
α∼𝒰​(0,1)\alpha\sim\mathcal{U}(0,1) and penalize the output change:

|  |  |  |  |
| --- | --- | --- | --- |
|  | ℒ=λπ​‖π​(𝐱~)−π​(𝐱t)‖2+λV​‖V​(𝐱p~)−V​(𝐱tp)‖2,\mathcal{L}=\lambda\_{\pi}\left\lVert\pi(\tilde{\mathbf{x}})-\pi(\mathbf{x}\_{t})\right\rVert^{2}+\lambda\_{V}\left\lVert V(\tilde{\mathbf{x}^{\mathrm{p}}})-V(\mathbf{x}^{\mathrm{p}}\_{t})\right\rVert^{2}, |  | (1) |

enforcing local Lipschitz continuity [kobayashi2022l2c2] for smooth,
hardware-safe actions, also used
in [huang2025learninghumanoidstandingupcontrol].

Online Reward Normalization.
Rewards are normalized [andrychowicz2021matters] by a running standard deviation,

|  |  |  |  |
| --- | --- | --- | --- |
|  | r^t=rtσr⋅ϕγ⋅c+ϵ,\hat{r}\_{t}=\frac{r\_{t}}{\sigma\_{r}\cdot\phi\_{\gamma}\cdot c+\epsilon}, |  | (2) |

where ϵ=10−2\epsilon=10^{-2} prevents division by zero, σr\sigma\_{r} is an EMA standard deviation across the environment batch, ϕγ=1/1−γ2\phi\_{\gamma}=1/\sqrt{1-\gamma^{2}} accounts for discounted return variance, and cc is a return-scale correction updated as c←β​c+(1−β)​σG⋅cc\leftarrow\beta\,c+(1-\beta)\,\sigma\_{G}\cdot c, where σG\sigma\_{G} is the GAE return standard deviation. Because rewards are divided by cc, the product σG⋅c\sigma\_{G}\cdot c is invariant to the current normalization, making training largely invariant to reward magnitude changes during curriculum.

Value-Bootstrapped Terminations.
Standard GAE bootstraps the value to zero at termination. The conventional remedy—a sparse penalty pp—is fragile: pp must satisfy p<V​(𝐱T)p<V(\mathbf{x}\_{T}) for all terminal states, otherwise the agent prefers dying over continuing when expected returns are negative. We instead modify the terminal reward as

|  |  |  |  |
| --- | --- | --- | --- |
|  | r^T←r^T+γ​V​(𝐱T)+{−σbad (e.g. falling)+σgood (e.g. reaching goal)0neutral (e.g. timeout)\hat{r}\_{T}\leftarrow\hat{r}\_{T}+\gamma\,V(\mathbf{x}\_{T})+\begin{cases}-\sigma&\text{bad (e.g.\ falling)}\\ +\sigma&\text{good (e.g.\ reaching goal)}\\ \phantom{+}0&\text{neutral (e.g.\ timeout)}\end{cases} |  | (3) |

The γ​V​(𝐱T)\gamma V(\mathbf{x}\_{T}) term makes termination value-neutral (as if the episode continued), while σ>0\sigma>0 shifts the outcome to be strictly worse or better than continuing. Because σ\sigma operates after reward normalization, it remains scale-invariant (σ=5\sigma{=}5 for all tasks). This is related to potential-based shaping [ng1999policy], applied only at terminal states. The modified Bellman operator is a γ\gamma-contraction; with γ=0.99\gamma{=}0.99, a bad termination offset of σ=5\sigma{=}5 amplifies to an effective shift of 500500 in value space.

Virtual Harness.
Much like a physical harness that supports a person learning to walk, external PD forces applied to the root body stabilize the robot during early training, preventing immediate collapse before the policy can discover useful behaviors:
𝝉h=Kp​𝐞q−Kd​𝝎\boldsymbol{\tau}\_{\mathrm{h}}=K\_{p}\,\mathbf{e}\_{q}-K\_{d}\,\boldsymbol{\omega},
𝐟h=Kp​(h∗−h)−Kd​h˙\mathbf{f}\_{\mathrm{h}}=K\_{p}\,(h^{\*}-h)-K\_{d}\,\dot{h},
where KpK\_{p}/KdK\_{d} are proportional/derivative gains, 𝐞q\mathbf{e}\_{q} is
the orientation error to upright, 𝝎\boldsymbol{\omega} the angular
velocity, and h∗h^{\*}/hh the desired/current root height. A curriculum scale
s∈[0,1]s\in[0,1] multiplies all gains and limits; supported schedules
are linear decay (s=1−t/Ts=1-t/T), exponential decay
(s=e(t/T)​ln⁡0.01s=e^{(t/T)\ln 0.01}), and an adaptive variant that decreases
ss only when the standing ratio exceeds a threshold.

![Refer to caption](2603.20147v1/figures/decoupled_wbc_white_bg.jpg)

Figure 3: Decoupled whole-body control: upper- and lower-body policies are trained separately. This design allows greater flexibility to meet different application requirements. For example, an IK policy can be used for high-accuracy tasks while a VLA upper-body policy enables autonomous execution with language input.

Velocity Profile.
When randomizing upper-body joint targets during locomotion training, abrupt
position jumps can destabilize the lower-body policy. agile provides
pluggable velocity profiles that interpolate between the current position
𝐪t\mathbf{q}\_{t} and a sampled target 𝐪∗\mathbf{q}^{\*}:

* •

  EMA. Exponential smoothing:
  𝐪t+1=αema​𝐪∗+(1−αema)​𝐪t\mathbf{q}\_{t+1}=\alpha\_{\mathrm{ema}}\,\mathbf{q}^{\*}+(1-\alpha\_{\mathrm{ema}})\,\mathbf{q}\_{t}, with
  αema\alpha\_{\mathrm{ema}} sampled uniformly per trajectory. Smooth, zero-overshoot.
* •

  Trapezoidal. Three-phase motion with bounded
  amaxa\_{\max} and vmaxv\_{\max}: accelerate, cruise, decelerate. Joints can be
  synchronized to finish simultaneously. Physically realistic.
* •

  Linear. Constant-velocity interpolation. Simplest;
  suitable for non-critical joints.

All profiles support per-joint position and velocity limits.

Symmetry Augmentation. Observations and actions are mirrored to encourage symmetric locomotion and effectively double training data [mittal2024symmetry]. The mapping is configuration-driven rather than index-based, enabling adaptation to new observation spaces and robot morphologies.

Table 2: MDP overview and training time (on a single L40) per task.

| Task | Robot | Actions | Observation (pol/crit) | Reward dim | Episode | Terrain | Training |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Locomotion | G1 | Leg pos (12) | noisy / + scans | 15 | 30 s | rough | 10h |
| Locomotion | T1 | Leg pos (10) | noisy / + vel,ht | 20 | 30 s | rough | 10h |
| Loco + Height | G1 | Leg pos (12) | noisy / + scans | 22 | 30 s | rough | 10h |
| Stand-up | G1 | All joints (rel) | noisy / + forces | 18 | 15 s | stand-up | 25h |
| Stand-up | T1 | All joints (rel) | noisy / + forces | 18 | 15 s | stand-up | 15h |
| Motion Imitation | G1 | All joints (rel) | noisy / + vel | 9 | 8 s | flat | 6h |
| Pick & Place | G1 | Upper body | tracking / – | 10 | 25 s | flat | 10h |

Additional Modules.
These include adaptive command
sampling (biasing toward low-speed balancing), upper-body velocity
profiles (EMA, trapezoidal, linear interpolation), state caching for efficient resets (a one-time rollout collects diverse initial states, e.g. fallen poses, avoiding repeated drop simulations during training), and teacher-student distillation following RSL-RL with symmetry mirror loss.

Transferring policies to real hardware requires both *smooth* and *robust* control. AGILE encourages smoothness through action regularization penalties (norm, rate, acceleration) and L2C2, reducing high-frequency actions that real actuators cannot reliably track. Robustness is improved through domain randomization—randomizing dynamics, mass properties, contact parameters, and actuator delays—as established in sim-to-real transfer literature [tobin2017domain, peng2018sim2real], together with external perturbations and sensor noise injection. These techniques are not new learning algorithms; instead, AGILE provides a unified implementation and empirical characterization of commonly used stabilization methods within a reproducible humanoid RL workflow.

### 3.4 Evaluation

Comparing policies solely with stochastic rollouts can mask failure modes that become visible only under controlled conditions. agile therefore complements stochastic rollouts with deterministic scenario-driven testing, where parallel environments receive identical scripted command sequences (e.g., velocity sweeps or height ramps). The resulting evaluation pipeline combines stochastic rollouts, deterministic scenario tests, and motion-quality diagnostics within a unified workflow. Crucially, this pipeline operates seamlessly in both Isaac Lab and MuJoCo, allowing the same evaluation scenarios and metrics to be applied during sim-to-sim validation (Figure [2](#S3.F2 "Figure 2 ‣ 3.2 Training Preparation ‣ 3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")).

Beyond aggregate task tracking, the pipeline analyzes deployment-critical per-joint motion-quality metrics such as RMS acceleration, jerk, and joint-limit violations. Deterministic scenarios provide reproducible, lower-variance benchmarks for regression testing, while stochastic rollouts evaluate robustness under randomized command distributions. All evaluation results are exported as standalone interactive HTML reports, enabling rapid diagnosis of behaviors that may threaten hardware safety prior to deployment.

### 3.5 Deployment

agile builds on Isaac Lab’s I/O descriptor system, which exports trained policies to TorchScript alongside auto-generated YAML configurations capturing the full I/O contract (joint names, observation ordering, history buffers, action scaling). On top of this, agile provides export tooling and a complete sim-to-sim validation pipeline in MuJoCo that reads the descriptors to automatically reconstruct observation assembly, action mapping, and history buffers for inference. Hardware-specific driver integrations reuse the same I/O contract, so the core inference logic remains identical; only the state provider changes. The descriptor also facilitates translating the inference stack from Python to C++ for real-time execution on hardware.

## 4 Case Studies & Results

![Refer to caption](2603.20147v1/x2.png)

Figure 4: Velocity and height command tracking in MuJoCo. Each subplot shows a sweep of commanded values (dashed) versus actual robot response (solid) for forward velocity, lateral velocity, yaw rate, and standing height. The solid line is smoothed with the actual showing as the lighter shadow for easier visualization.

We validate agile across five representative tasks using the Unitree G1 and Booster T1 platforms. Table [2](#S3.T2 "Table 2 ‣ 3.3.2 Algorithmic Toolbox ‣ 3.3 Training ‣ 3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning") provides a comprehensive summary of the MDP configurations and the estimated training hours required for each task on a single L40. Although the reward signal often reaches convergence relatively early, we typically extend training runs until 2020k steps reached to ensure optimal policy performance and stability.

### 4.1 Velocity Tracking on Unitree G1 and Booster T1

The baseline locomotion policy tracks commanded (vx,vy,ωz)(v\_{x},v\_{y},\omega\_{z}) using leg-joint position offsets (Figure [8](#S5.F8 "Figure 8 ‣ 5.2 Sim-to-Real Transfer ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")a,b).
To encourage robustness, upper-body joints receive random targets via trapezoidal velocity profiles. This task demonstrates agile’s generic configuration architecture. Both the Unitree G1 and Booster T1 use the exact same MDP template and training pipeline. We utilize a preparation module to ensure the defined symmetry terms are correct, allowing us to safely apply agile’s symmetry augmentation to double the effective training data and enforce symmetric gaits. Additionally, the virtual harness is utilized for early stabilization, preventing initial episode collapse. All locomotion tasks train on procedurally generated rough terrain with an adaptive difficulty curriculum [rudin2022learning].

### 4.2 Height-Controlled Locomotion on Unitree G1

Table 3: Sim-to-Sim evaluation of tracking on Unitree G1 velocity+height control.
Left: deterministic sweep (50 s) vs. random commands at
increasing durations (2 s resample interval) over 10 runs.
Right: teacher vs. distilled student policies
(deterministic sweep, 50 s).

|  | Teacher (Privileged) | | | | Student (Distilled) | |
| --- | --- | --- | --- | --- | --- | --- |
|  | Det. | Random | | | Deterministic | |
| Duration | 50s | 50s | 200s | 500s | RNN (50s) | Hist. (50s) |
| vxv\_{x} (m/s) | 0.070 | 0.1420.142±\pm0.019 | 0.1360.136±\pm0.010 | 0.1360.136±\pm0.003 | 0.116 | 0.097 |
| vyv\_{y} (m/s) | 0.083 | 0.1180.118±\pm0.013 | 0.1100.110±\pm0.006 | 0.1100.110±\pm0.002 | 0.110 | 0.087 |
| ωz\omega\_{z} (rad/s) | 0.074 | 0.1160.116±\pm0.013 | 0.1130.113±\pm0.007 | 0.1120.112±\pm0.003 | 0.117 | 0.079 |
| hh (m) | 0.035 | 0.0460.046±\pm0.007 | 0.0390.039±\pm0.003 | 0.0360.036±\pm0.001 | 0.037 | 0.037 |

This task extends velocity tracking by introducing a commanded pelvis height, requiring the robot to maintain stable locomotion across postures ranging from a deep crouch to a full stance (Figure [8](#S5.F8 "Figure 8 ‣ 5.2 Sim-to-Real Transfer ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")a).

Decoupled WBC architecture. A critical design choice is “separated body control.” The RL policy controls the leg joints exclusively, while the waist and upper-body joints are randomized using a trapezoidal velocity profile during training. This deliberately reserves the upper degrees of freedom, enabling an independent Inverse Kinematics (IK) or Vision-Language-Action (VLA) controller to take full ownership of the torso and arms at deployment (Figure [3](#S3.F3 "Figure 3 ‣ 3.3.2 Algorithmic Toolbox ‣ 3.3 Training ‣ 3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")).

This task also serves as a case study for agile’s unified evaluation pipeline (Section [3.4](#S3.SS4 "3.4 Evaluation ‣ 3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")), which combines deterministic scenario tests, stochastic rollouts, and shared motion-quality diagnostics. Policies are first evaluated in IsaacLab; we observed that consistent violations of joint limits reliably preclude successful sim-to-sim transfer; policies are thus fine-tuned using these feedback signals. The pipeline then transitions to MuJoCo, employing scripted height-ramp and velocity-sweep scenarios to provide reproducible, low-variance benchmarks for controlled comparison, while stochastic command sampling assesses robustness. As shown in Table [3](#S4.T3 "Table 3 ‣ 4.2 Height-Controlled Locomotion on Unitree G1 ‣ 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning"), deterministic scenarios produce consistent tracking metrics over short horizons, whereas stochastic rollouts have bigger variance (std is computed with 1010 runs) and require substantially longer durations to converge. This unified evaluation enables consistent quantitative comparisons between the privileged teacher policy and distilled LSTM and history-MLP student architectures (Figure [4](#S4.F4 "Figure 4 ‣ 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning") and Table [3](#S4.T3 "Table 3 ‣ 4.2 Height-Controlled Locomotion on Unitree G1 ‣ 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")), demonstrating that the evaluation pipeline generalizes across different policy structures.

### 4.3 Stand-Up on Booster T1 & Unitree G1

Fall recovery is a complex whole-body control problem where the policy must coordinate all joints to transition from a random fallen configuration to a stable standing pose [huang2025learninghumanoidstandingupcontrol]. Both policies successfully transfer to real hardware (Figure [8](#S5.F8 "Figure 8 ‣ 5.2 Sim-to-Real Transfer ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")c,d). To handle the massive scale differences between fine-grained postural rewards and the large sparse bonus for standing, this task relies on online reward normalization. A pre-collected dataset of diverse fallen poses (via agile’s state caching) provides varied initial configurations without wasting training compute on repeated drops.

### 4.4 Motion Imitation on Unitree G1

We formulate a BeyondMimic-style [liao2025beyondmimicmotiontrackingversatile] motion imitation task to demonstrate that agile generalizes beyond standard command-tracking. The policy tracks an 8​s8s dancing sequence by sampling harder segments more frequently. Because the actor uses only hardware-available observations (no privileged state), the policy deploys directly to the real Unitree G1 hardware without distillation (Figure [8](#S5.F8 "Figure 8 ‣ 5.2 Sim-to-Real Transfer ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")e). The default BeyondMimic setup with our motion reference data failed to transfer even to simulation. Therefore, we applied additional domain randomization and L2C2 regularization to support sim-to-real transfer and suppress high-frequency actuator oscillations during real-world deployment.

### 4.5 Loco-Manipulation & VLA Fine-Tuning

![Refer to caption](2603.20147v1/figures/vla_post_training.jpg)

Figure 5: GR00T post-training pipeline.
(1) RL expert trained with physics randomization.
(2) Demonstration collection via tiled parallel rendering with scene randomization.
(3) VLA fine-tuning on the collected dataset.
(4) Closed-loop evaluation in simulation.

agile’s modular architecture freezes the locomotion policy from
Section [4.2](#S4.SS2 "4.2 Height-Controlled Locomotion on Unitree G1 ‣ 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning") as a lower-body controller while an
upper-body module is developed independently. We demonstrate this with a
pick-and-place task on Unitree G1, followed by VLA fine-tuning
(Figure [5](#S4.F5 "Figure 5 ‣ 4.5 Loco-Manipulation & VLA Fine-Tuning ‣ 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")).

RL expert.
An RL policy controls the right arm and waist only, guided by reference
trajectories and privileged simulation state (object pose, hand–object
distance). Restricting the action space to the upper body reduces training to
20k iterations. Object identity is varied across environments to promote
visual diversity in the resulting demonstrations.

VLA data collection and fine-tuning.
The RL expert generates 100 successful trajectories via tiled parallel
simulation under physics and visual domain randomization, producing paired
RGB observations, proprioception, and actions without human teleoperation.
A GR00T N1.5 VLA model is fine-tuned on this dataset, replacing privileged
inputs with RGB and language task descriptions. At deployment, the VLA
predicts upper-body targets while the frozen locomotion policy maintains
lower-body stability.

In closed-loop simulation, the post-trained VLA reliably picks up the target object and places it to the side, achieving a 90% success rate across 100 test cases with randomly sampled initial robot states. These results validate effective transfer from privileged RL to perception-driven control.

## 5 Discussion & Limitations

### 5.1 Ablation Studies

We ablate five key enhancements independently.

#### 5.1.1 Reward Normalizer

Online reward normalization makes training magnitude-agnostic, which is useful when reward scales shift during curriculum progression or when porting configurations across robots.
Figure [7](#S5.F7 "Figure 7 ‣ 5.1.5 Symmetry Augmentation ‣ 5.1 Ablation Studies ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")(a) validates this on Unitree G1 velocity tracking: at the original scale (1×\times), the normalizer provides a modest improvement, while at 100×\times scale it recovers near-original performance.

#### 5.1.2 L2C2

![Refer to caption](2603.20147v1/x3.png)

Figure 6: Effect of L2C2 on motion smoothness under increasing
observation noise. Subplots: RMS joint acceleration, RMS joint jerk,
position limit violations, and high-frequency energy ratio (fraction of
joint-trajectory energy above 10 Hz).

We evaluate L2C2 on a mimic-style task using our MuJoCo evaluation pipeline (1515 deterministic rollouts, 8​s8s each). Both policies successfully transfer to real hardware for the same dancing motion; however, without L2C2 the actuators produce audible high-frequency oscillations. We quantify this via four deployment-critical metrics (Figure [6](#S5.F6 "Figure 6 ‣ 5.1.2 L2C2 ‣ 5.1 Ablation Studies ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")): RMS joint acceleration, RMS joint jerk, joint limit violations, and high-frequency energy ratio. L2C2 consistently reduces all four metrics, with the benefit increasing along the noise level.

#### 5.1.3 Value-Bootstrapped Terminations

Figure [7](#S5.F7 "Figure 7 ‣ 5.1.5 Symmetry Augmentation ‣ 5.1 Ablation Studies ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")(b) compares value-bootstrapped terminations
(σ=5\sigma{=}5) against a manually tuned termination penalty on Booster T1
stand-up (5 seeds). The bootstrapped variant converges to a higher
time-out ratio (fewer bad terminations) with substantially lower
seed variance (min/max shown), indicating more robust training. The
bootstrapped version requires no per-task penalty tuning; the same
σ\sigma works across all tasks.

#### 5.1.4 Virtual Harness

Figure [7](#S5.F7 "Figure 7 ‣ 5.1.5 Symmetry Augmentation ‣ 5.1 Ablation Studies ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")(c) shows the effect of the virtual harness on
Unitree G1 height-controlled locomotion (5 seeds). With the harness (decayed over
the first 2k iterations), training recovers from the initial negative-reward
phase faster and converges to higher final reward. Without the harness, the
policy spends longer in unstable regimes and converges lower, with higher
variance across seeds.

#### 5.1.5 Symmetry Augmentation

Figure [7](#S5.F7 "Figure 7 ‣ 5.1.5 Symmetry Augmentation ‣ 5.1 Ablation Studies ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")(d) shows symmetry augmentation on Booster T1
velocity tracking. Mirroring observations and actions doubles effective data per batch and enforces symmetric gaits. The reward improvement is modest but consistent across all seeds; the primary benefit is behavioral symmetry, not captured by the reward curve.

![Refer to caption](2603.20147v1/x4.png)

Figure 7: Ablation studies (5 seeds, shaded = ±1\pm 1std unless noted).
(a) Reward normalization; dashed curves scale all rewards by 100×\times
before training and rescale for comparability.
(b) Value-bootstrapped vs. tuned termination penalty
(shaded = min/max).
(c) Virtual harness on height-controlled locomotion.
(d) Symmetry augmentation.

### 5.2 Sim-to-Real Transfer

![Refer to caption](2603.20147v1/figures/robot_motion.jpg)

Figure 8: Sim-to-real transfer across five tasks on two robot platforms.
(a) Velocity and height controlled locomotion on Unitree G1.
(b) Velocity controlled locomotion on Booster T1.
(c) Stand-up on Unitree G1.
(d) Stand-up on Booster T1.
(e) Motion imitation (dancing) on Unitree G1.

All five tasks transfer to real hardware—with success defined by stable execution, absence of controller instability, and the completion of the designated task—while the loco-manipulation task is additionally validated in simulation via the VLA pipeline. Figure [8](#S5.F8 "Figure 8 ‣ 5.2 Sim-to-Real Transfer ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning") shows
stand-up on both robots and dancing on Unitree G1;
Figure [4](#S4.F4 "Figure 4 ‣ 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning") and Table [3](#S4.T3 "Table 3 ‣ 4.2 Height-Controlled Locomotion on Unitree G1 ‣ 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning") report
sim-to-sim tracking metrics for height-controlled locomotion. The main
failure modes during development were sim-to-real gaps (actuator modeling,
contact dynamics) and overly aggressive policies producing motions that
real actuators cannot follow. Both were addressed by the domain
randomization and policy regularization described in
Section [3](#S3 "3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning"). Since no external motion-capture system was available, sim-to-real transfer is validated qualitatively through hardware demonstrations; quantitative tracking metrics are reported via the MuJoCo pipeline (Table [3](#S4.T3 "Table 3 ‣ 4.2 Height-Controlled Locomotion on Unitree G1 ‣ 4 Case Studies & Results ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")). The sim-to-real pipeline will also be released in the near future separately. A supplementary video demonstrating all tasks on hardware is attached.

### 5.3 Limitations & Outlook

AGILE is currently validated on two humanoid platforms (Unitree G1 and Booster T1), and broader hardware validation remains future work. The framework builds on Isaac Lab, which simplifies integration with GPU-based simulation but introduces dependency on upstream APIs. In addition, the tasks studied here are primarily proprioceptive; perception-driven manipulation and more dynamic locomotion behaviors (e.g., running or stair climbing) are not yet included. Future work will expand robot and task coverage while continuing to validate new capabilities through real-world deployment.

## 6 Acknowledgment

We thank Zhengyi Luo, Chenran Li and Xinghao Zhu for their discussion on modeling and training. We thank Rafael Wiltz, Sergey Grizan, Lotus Li, Tiffany Chen, David Chu and John Welsh for their discussion and feedback on tele-operation and data pipeline integration. We also thank H. Hawkeye King, Stephan Pleines and Vishal Kulkarni for their support on experiment and code release.

## References

## Appendix A Appendix

### A.1 Best Practices

Based on extensive experimentation across tasks and robots, we distill the
following practical guidelines:

1. 1.

   Robot model validation. Validate the USD model before any
   training. Spawn the robot on a flat ground plane in an interactive
   simulator, let it settle under gravity, and manually perturb
   it—the behavior should look physically plausible. Sweep all
   joints to their limits to verify correct signs and clamping,
   and use agile’s joint debug GUI with symmetry mode to catch
   mirrored sign errors. A wrong joint axis wastes more GPU hours
   than any hyperparameter misconfiguration.
2. 2.

   MDP validation. Once the robot model is verified, validate
   the training environment before launching long runs. Confirm that a
   zero-action command produces a stable stand (catches incorrect
   default poses or action offsets), use the reward visualizer to
   verify that each reward term activates as expected, and check that
   observations have plausible values and ranges. These checks take
   minutes and prevent days of wasted training.
3. 3.

   Reward composition. Structure rewards into three groups:
   *task* (what to achieve), *style* (how it should look),
   and *regularization* (what to avoid). As a rule of thumb,
   start simple: task rewards plus basic regularization to prevent
   unsafe behaviors, then incrementally add style and further
   regularization terms once the core task is solved.
4. 4.

   Termination design. If mean episode length collapses to
   near zero, the agent has become “suicidal”: the expected return
   from continuing (accumulating negative rewards) is worse than
   terminating and resetting. The immediate fix is to increase the termination penalty
   (make it more negative), but this requires per-task tuning and
   can break as the value landscape shifts during training.
   Value-bootstrapped terminations (Section [5.1.3](#S5.SS1.SSS3 "5.1.3 Value-Bootstrapped Terminations ‣ 5.1 Ablation Studies ‣ 5 Discussion & Limitations ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning"))
   offer a more principled solution by making termination
   value-neutral and adding a fixed offset σ\sigma, removing
   the need for per-task penalty tuning. However, because the
   value function’s own predictions are bootstrapped at terminal
   states, inaccurate estimates can feed back into training
   targets. If value loss increases after enabling bootstrapped
   terminations, reduce σ\sigma or address the underlying
   reward signal first.
   Conversely, always terminate episodes when the robot enters
   unrecoverable states (e.g. fallen) to avoid wasting training
   compute on hopeless trajectories.
5. 5.

   Curriculum design. Two strategies: *fading guidance*
   (start with assistance, remove it) and *increasing difficulty*
   (start easy, ramp up penalties or terrain complexity). The harness
   force (Section [3.3.2](#S3.SS3.SSS2 "3.3.2 Algorithmic Toolbox ‣ 3.3 Training ‣ 3 System Design ‣ AGILE: A Comprehensive Workflow for Humanoid Loco-Manipulation Learning")) implements the former; terrain
   progression implements the latter.
6. 6.

   Observation design. Train teachers with privileged
   observations (terrain scans, contact forces, true velocities). Distill
   to students using only sensor-realistic inputs. Always add noise to
   policy observations matching expected sensor characteristics.
7. 7.

   Training monitoring. Track task metrics alongside reward
   curves: rising reward with stagnant task performance indicates reward
   hacking. Monitor value loss (should converge well below 1.01.0; if
   too high, scale down reward magnitudes or enable reward
   normalization to stabilize bootstrapping) and policy noise
   standard deviation (may increase initially during exploration but
   should decrease over the course of training; persistent growth
   signals that the entropy bonus dominates the task gradient). If noise keeps
   growing, first improve the reward function (cleaner advantages
   outweigh the entropy gradient), then reduce the entropy
   coefficient, or run a fraction of environments without domain
   randomization to guarantee clean gradient signal in every batch.
   Record periodic rollout videos—plots alone can be misleading.
8. 8.

   Seed robustness. Test across ≥5\geq 5 random seeds before
   drawing conclusions. A single lucky seed does not validate an MDP
   design. RL training is inherently sensitive to random seeds, and
   designing seed-robust environments is difficult; high variance
   across seeds often points to a fragile reward or curriculum
   design rather than bad luck.
9. 9.

   Sim-to-real transfer. Successful transfer rests on two
   pillars: *robustness* via domain randomization and
   *smoothness* via action regularization. For regularization,
   directly regularize the policy output via action norm,
   action rate (consecutive differences), and action acceleration
   (second-order differences) penalties; L2C2 further enforces
   smooth observation-to-action mappings. A policy that appears smooth in
   simulation may be relying on high simulated damping to mask
   aggressive actions—the policy *itself* must output smooth
   commands. Domain randomization combined with these regularization
   terms were the most effective levers in our experience.
   History-based or recurrent policies can implicitly adapt to
   real dynamics at inference time, partially compensating for
   remaining sim-to-real gaps. If hardware behavior diverges
   significantly from simulation, the simulation is likely wrong:
   fix the simulation to match reality rather than compensating
   with reward shaping.

Finally, no single technique listed above works universally.
Reinforcement learning offers no magic trick that reliably helps across
all tasks and robots. agile provides a toolbox of composable
modules, but each must be evaluated empirically for the problem at hand.

### A.2 Hyperparameter Tables

Table 4: PPO hyperparameters. Task-specific overrides in parentheses.

|  |  |
| --- | --- |
| Parameter | Value |
| Actor network | [256,256,128][256,256,128] (pick&place: [256,128,64][256,128,64]) |
| Critic network | [512,256,128][512,256,128] (pick&place: [256,128,64][256,128,64]) |
| Activation | ELU |
| Learning rate | 10−310^{-3} |
| Discount γ\gamma | 0.990.99 (stand-up: 0.9950.995) |
| GAE λ\lambda | 0.950.95 |
| Clip ratio | 0.20.2 |
| Mini-batches | 4 |
| Learning epochs | 5 |
| Entropy coeff. | 0.0050.005 (height: 0.010.01, stand-up: 0.00250.0025) |
| Num. environments | 4096 |
| Symmetry augmentation | L-R mirror (except pick&place) |
| L2C2 | λπ=1.0\lambda\_{\pi}{=}1.0, λV=0.1\lambda\_{V}{=}0.1 |
| Reward normalizer | β=0.999\beta{=}0.999, ϵ=0.01\epsilon{=}0.01 |

Experimental support, please
[view the build logs](./2603.20147v1/__stdout.txt)
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

BETA
