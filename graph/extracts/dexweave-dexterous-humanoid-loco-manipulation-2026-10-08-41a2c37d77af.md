DEXWEAVE:
LEARNING DEXTEROUS HUMANOID
LOCO-MANIPULATION FROM HUMAN DEMONSTRA-
TIONS

Naichuan Sun1,2∗ Haotian Shen1∗ Yizhang Zhang1 Luying Feng1 Haoze Wang1
Yuanbo Xiangli2 Yaochu Jin1
1Department of Artificial Intelligence, School of Engineering, Westlake University
2School of Artificial Intelligence, Shanghai Jiao Tong University
naichuan.sun@sjtu.edu.cn
{shenhaotian,liupeidong}@westlake.edu.cn

Peidong Liu1†

Figure 1: DexWeave translates human demonstrations into executable dexterous humanoid loco-
manipulation skills.

ABSTRACT

Learning dexterous humanoid loco-manipulation from human demonstrations re-
quires transferring not only human motion, but also the coordinated interaction
structure underlying the demonstrated behavior. This is challenging because em-
bodiment differences distort the coupling among body motion, wrist placement,
finger articulation, and object interaction, while kinematically accurate references
may still be difficult to realize under robot dynamics. We present DexWeave,
a unified framework that connects interaction-consistent motion retargeting with
anatomy-aware whole-body policy learning. DexWeave first employs a two-stage
retargeting procedure that initializes body and hand motions with specialized
solvers and subsequently performs coupled refinement over the upper-body in-
teraction chain while preserving lower-body support. The resulting references
are tracked by an anatomy-aware Transformer policy that represents anatomical
regions as structured tokens and uses directed masked attention to model their de-
pendencies, with object information selectively conditioning the upper-body path-
way for dexterous interaction. The policy jointly outputs body and dexterous-hand
actions and is trained directly with reinforcement learning, without pretrained
tracking policies, teacher–student distillation, or subsequent residual refinement.
DexWeave improves retargeting fidelity and interaction consistency while achiev-
ing higher manipulation performance and faster policy convergence than MLP
baselines. We further deploy the learned policies on a physical Unitree G1 hu-
manoid equipped with Inspire dexterous hands, demonstrating dexterous whole-
body loco-manipulation in the real world. See our project page for videos.

∗Equal contribution.
†Corresponding author.

1

arXiv:2609.34724v1  [cs.RO]  28 Sep 20261

INTRODUCTION

Dexterous humanoid loco-manipulation could enable a wide range of real-world tasks, but requires
tight coordination between locomotion, whole-body support, and articulated hand–object interac-
tion. Learning from demonstrations has emerged as a scalable approach to acquiring robot ma-
nipulation and humanoid whole-body skills (Chi et al., 2023; Zitkovich et al., 2023; Kim et al.,
2025; Allshire et al., 2025; Heng et al., 2026). In particular, abundant human motion and video data
provide rich demonstrations of coordinated whole-body behaviors without requiring costly robot
teleoperation (He et al., 2025; Heng et al., 2026; Allshire et al., 2025; Jiang et al., 2026). Leverag-
ing such data for dexterous humanoids, however, requires retargeting both body motion and hand
articulation to the robot’s morphology while preserving the demonstrated interactions, together with
a control policy that can realize these interactions under robot dynamics.

A common challenge underlies both retargeting and control: wrist placement and finger articu-
lation jointly determine hand–object interaction, yet they are often optimized at different levels
of the motion hierarchy. Whole-body retargeting approaches improve motion fidelity and kine-
matic feasibility, while dexterous-hand methods primarily optimize hand-level kinematics and local
hand–object geometry (Handa et al., 2020; Xin et al., 2026; Wu et al., 2026). Despite advances in
teleoperation and physics-based refinement (Heng et al., 2026; Pan et al., 2025), these levels can
remain weakly coupled: differences in arm reach, palm geometry, and finger dimensions may make
wrist placement and finger articulation mutually inconsistent even when each is locally well retar-
geted. The same coupling reappears during control: manipulation forces perturb whole-body bal-
ance, while locomotion continuously changes wrist placement and can disrupt hand–object contact.
Existing policies address whole-body coordination through jointly trained upper- and lower-body
agents (Zhang et al., 2026a), unified policies for locomotion and upper-body control (Sun et al.,
2025), or pretrained body and hand priors coordinated through a residual policy (Li et al., 2026a).
While these approaches make high-dimensional control more tractable, fine-grained coordination
between whole-body motion and articulated hand interaction remains challenging. Our key insight
is that successful human-to-humanoid dexterous skill transfer requires preserving demonstrated in-
teraction structure across embodiments and exploiting anatomical structure as an inductive bias for
whole-body policy learning.

Guided by this insight, we present DexWeave, an integrated framework that bridges interaction-
consistent motion retargeting and anatomy-aware whole-body policy learning. A two-stage retarget-
ing pipeline first initializes robot motion using specialized body and hand solvers with contact-aware
wrist blending, and then jointly refines the arms, wrists, and fingers along the upper-body interaction
chain to preserve wrist–finger–object coordination while maintaining feasible lower-body support.
An anatomy-aware Transformer organizes whole-body control through regional body tokens and
directed masked attention that captures structured dependencies across anatomical regions. Object
information is selectively injected into the upper-body pathway, conditioning dexterous interaction
while leaving the lower-body pathway unconditioned on direct object observations. For each refer-
ence motion, a single policy network jointly outputs body and dexterous-hand actions and is trained
with Proximal Policy Optimization (PPO), without tracking-policy pretraining, teacher–student dis-
tillation, or subsequent residual refinement.

We evaluate DexWeave primarily on whole-body interactions involving fine-grained dexterous
hand–object contact from GRAB (Taheri et al., 2020) and HUMOTO (Lu et al., 2025), with addi-
tional evaluations on whole-body object interaction from OMOMO (Li et al., 2023) and body-only
motion from LAFAN1 (Harvey et al., 2020). Retargeting comparisons show improved kinematic
feasibility, with reduced penetration and foot skating, while more accurately preserving hand–object
interactions. For closed-loop control, evaluations on representative dexterous loco-manipulation
motions show that our policy achieves higher manipulation performance and approximately 2×
faster convergence than MLP baselines. We further deploy DexWeave on a physical Unitree
G1 humanoid equipped with Inspire dexterous hands, demonstrating dexterous whole-body loco-
manipulation in the real world. Beyond the policies studied here, DexWeave provides a potential
pathway for converting abundant human interaction data into embodiment-specific, physically exe-
cutable robot data for future embodied foundation models.

2

2 RELATED WORK

Learning Humanoid Skills from Human Demonstrations. Human demonstrations provide a
scalable source of whole-body behaviors without requiring extensive robot-specific teleoperation.
OmniH2O (He et al., 2025) combines large-scale human motion retargeting with reinforcement
learning to acquire whole-body humanoid skills, while VideoMimic (Allshire et al., 2025) re-
constructs humans and their surrounding environments from videos to learn context-aware hu-
manoid control. More recent systems extend this direction toward whole-body manipulation.
HumDex (Heng et al., 2026) leverages whole-body human motion to learn transferable motion pri-
ors before adapting them with robot data. These works demonstrate the potential of human data
for scalable humanoid skill acquisition. DexWeave focuses on a complementary challenge: trans-
ferring demonstrations with coordinated body, hand, and object motion across embodiments while
preserving the interactions needed for physically executable dexterous whole-body skills.

Human-to-Robot Motion Retargeting. Motion retargeting bridges the substantial morphology
gap between human demonstrations and humanoid robots. Whole-body methods adapt human mo-
tion to robot kinematics while explicitly enforcing constraints such as joint limits, collisions, con-
tacts, and support feasibility (Araujo et al., 2026; Yang et al., 2026; NVIDIA, 2026). In parallel,
dexterous-hand methods focus on transferring fine-grained finger articulation and hand–object rela-
tionships (Handa et al., 2020; Xin et al., 2026; Wu et al., 2026). TopoRetarget (Wu et al., 2026), for
example, explicitly preserves task-relevant hand–object interaction structure, while SPIDER (Pan
et al., 2025) employs physics-informed refinement to transform kinematic human demonstrations
into dynamically feasible robot trajectories. Despite this progress, whole-body and dexterous-hand
retargeting are often optimized with different objectives or at separate stages. Across embodiments,
differences in arm reach, palm geometry, and finger proportions can therefore make wrist place-
ment and finger articulation mutually inconsistent even when each is locally well retargeted. This
motivates preserving interaction structure across the entire upper-body interaction chain rather than
only at the body or hand level. DexWeave jointly refines the arms, wrists, and fingers to maintain
wrist–finger–object coordination while preserving feasible lower-body support.

Humanoid Loco-Manipulation. Humanoid loco-manipulation requires coordinating locomotion,
balance, upper-body motion, and object interaction within a high-dimensional action space. Exist-
ing approaches make this problem tractable through control decomposition, unified whole-body
policies, or learned motion priors. FALCON (Zhang et al., 2026a) decomposes force-adaptive
loco-manipulation into jointly trained lower-body locomotion and upper-body manipulation agents.
ULC (Sun et al., 2025) demonstrates unified locomotion and upper-body control within a sin-
gle policy, while CoorDex (Li et al., 2026a) extends loco-manipulation to dexterous hands us-
ing separately trained and distilled body and hand priors coordinated through downstream resid-
ual reinforcement learning. More recently, vision–language–action (VLA) and world-action mod-
els (WAMs) have extended humanoid loco-manipulation toward generalizable visuomotor control.
WholeBodyVLA (Jiang et al., 2026) leverages action-free human videos to alleviate the scarcity
of humanoid loco-manipulation data, while OpenHLM (Hu et al., 2026) maps visual and lan-
guage observations to whole-body humanoid actions. MotionWAM (Zheng et al., 2026), ω-0 (Li
et al., 2026b), and related work (Li et al., 2026c) further exploit large-scale visual or motion priors
for whole-body action generation. These developments expose a complementary data bottleneck:
human motion and interaction data are abundant, yet embodiment-specific, physically executable
whole-body dexterous trajectories remain costly to acquire. DexWeave addresses this conversion
gap by grounding coordinated human body–hand–object demonstrations into interaction-consistent,
physically executable robot behaviors, providing a complementary source of whole-body supervi-
sion for future embodied models.

3 DEXWEAVE

3.1 OVERVIEW

Given a human body–hand–object demonstration, DexWeave converts it into a physically executable
dexterous humanoid skill by preserving interaction structure across embodiments and exploiting
anatomical structure for control. As shown in Fig. 2, the framework first constructs an interaction-

3

Figure 2: Overview of DexWeave. Given a human body–hand–object demonstration, DexWeave
first constructs an interaction-consistent robot reference through specialized body–hand initializa-
tion and coupled refinement of the upper-body interaction chain. An anatomy-aware whole-body
loco-manipulation policy then realizes the reference under robot dynamics using regional anatomi-
cal tokens, directed masked attention, and selective object conditioning, producing executable dex-
terous humanoid loco-manipulation skills.

consistent robot reference and then learns a policy to execute it under physical robot dynamics.
Interaction-consistent motion retargeting uses specialized body–hand initialization and coupled
upper-body refinement to preserve hand–object relationships while maintaining the established sup-
port motion (Sec. 3.2). Anatomy-aware loco-manipulation policy learning then uses regional
tokens, directed information flow, and selective object conditioning to coordinate locomotion and
dexterous manipulation (Sec. 3.3).

3.2

INTERACTION-CONSISTENT MOTION RETARGETING

Retargeting human demonstrations to a robot must reconcile whole-body reachability, hand–object
contact fidelity, and physical feasibility. Optimizing all three jointly is ill-conditioned, because
body-scale differences, finger-dimension mismatches, and collision constraints interact across the
full kinematic chain. DexWeave therefore decomposes the problem according to interaction locality.
A decoupled initialization stage first establishes body motion and hand shape where each is locally
well-posed (Sec. 3.2.1), and a subsequent refinement stage closes the residual misalignment on the
compact upper-limb chain that mediates contact (Sec. 3.2.2).
A demonstration provides human body poses XH
t for s ∈ {L, R}, and rigid-
t , θR
object poses XO
t ) consists of
t together with the independent hand drivers θs
the floating base and non-finger joints qB
t , from which
dependent finger joints are determined by the robot’s mimic relations. The pipeline first constructs a
decoupled initialization ¯q1:T and then refines its upper-body coordinates to produce q∗
1:T . Together
with the original object trajectory, this yields the reference R1:T = (cid:8)(q∗
t=1 for downstream
policy learning.

t over frames t = 1, . . . , T . The robot configuration qt = (qB

t , hand keypoints Hs

t )(cid:9)T

t , XO

t , θL

3.2.1 DECOUPLED BODY–HAND INITIALIZATION

The initialization stage solves body motion and hand articulation using specialized solvers before
coupling them during interaction refinement. This decomposition reflects the different structure
of the two subproblems: body retargeting is dominated by large-scale morphology adaptation and
support constraints, whereas hand fitting depends on local finger geometry and kinematic coupling.
Solving each component in the representation where it is locally well posed provides a robust ini-
tialization for subsequent joint refinement.

Contact-Aware Body Retargeting. The wrist is the point at which whole-body retargeting most
directly affects manipulation. Rescaling human motion to robot proportions can displace the wrist
relative to nearby objects and break contact even when the overall body pose is well retargeted. We
therefore blend two wrist targets: a robot-scaled morphology-preserving target (Araujo et al., 2026)

4

Body Pose&Hand KeypointObjectMesh& PoseTrajectoryRobot Kinematics & LimitsBodyRetargetingAdaptiveWristTargetsConstrainedBodySolveProximity-weighted BlendMorphologyWristTrajectoryDexterousHandRetargetingConfigurationCodebookRetrieveWrist-localHandRefinementRemaining Body Coordinates FixedColliding&ErroneousCollision-free& PreciseRefineBlendTop-KHuman-ObjectDemonstrationDecoupled EmbodimentRetargetingWorld-frameUpper-body InteractionRefinementDexterousWhole-body MotionLocomotion: lafan1Loco-Manipulation：HUMOTOGRAB(w/ hand ref.)OMOMO(w/o hand ref)ConstrainedInteraction SolveStable SupportCorrecttopologyrelationshipCollision-avoidanceFine-grainedand precise targetPick & PlaceCarryJumpKickOptimizingUpper-body ChainAnatomy-aware Loco-manipulation PolicyAnatomy-aware Transformer(Masked Attention)Action DecoderBodyactionRobotStateRef.MotionLastActionObj.StateObject&Body Obs.Obj. & Robot Obs. EncoderEnd-to-endtrainingW/o any pretraining &refinementInteraction-consistent Motion Retargetingand a world-aligned interaction-preserving target. Their contribution is controlled by a per-hand
weight αt,s ∈ [0, 1] determined by persistent hand–object proximity. When the hand is far from
the object, the target favors morphology adaptation; as sustained interaction emerges, the blend
gradually shifts toward scene alignment. This provides a smooth transition without introducing a
discrete contact mode switch. Wrist orientations remain fully mapped and the object trajectory is
kept unchanged. Support constraints inferred from source foot kinematics suppress unintended foot
sliding, while clearance penalties handle self-, ground-, and body–object collisions. At each frame,
the body configuration is obtained by solving:

¯qB

t = arg min
qB ∈QB
t

λtrackLtrack + λclrLclr + λtempLtemp + Lreg,

(1)

where Ltrack penalizes deviation from body landmarks and the blended wrist targets (cid:99)Wt, Lclr col-
lects soft collision terms, Ltemp regularizes temporal posture, and Lreg denotes a regularization
term. The feasible set QB

t encodes joint limits, support equalities, and body-collision boundaries.

Retrieval-Based Dexterous Hand Fitting. Nonlinear finger kinematics and mimic coupling make
direct geometric fitting sensitive to initialization (Handa et al., 2020; Xin et al., 2026). We address
NB
n, gs,R
this using a precomputed codebook Bs = (θs
n )
n=1, which pairs feasible hand-driver config-
urations with wrist-local geometric descriptors. These descriptors encode fingertip positions, chain
directions, and inter-finger relations computed through forward kinematics. Given observed human
hand keypoints, we construct the corresponding descriptor gs,H
in the same wrist-local frame and
retrieve the K nearest codebook entries. Their driver configurations are blended using normalized
distance weights to obtain (cid:98)θs
t , which serves as both a warm start and a soft anchor for continuous
fitting of the independent drivers within their mimic-consistent bounds. Sequences without articu-
lated hand references default to a neutral configuration θs
neutral. Combining the fitted hands with the
retargeted body trajectory yields the whole-body initialization ¯q1:T .

t

3.2.2 COUPLED UPPER-BODY INTERACTION REFINEMENT

The previous initialization can still exhibit residual hand–object misalignment because embodiment
differences propagate jointly through arm reach, palm geometry, and finger proportions. Correcting
such errors only at the wrist or fingers can therefore distort another part of the interaction chain.
DexWeave instead jointly refines the upper-body kinematic chain that governs hand–object interac-
t ]⊤ that contains the
tion. In particular, we define a compact set of joint variables zt = [qU
t , θR
bilateral arm and wrist joints (i.e. qU
t ).
All other body joints retain their initialized values in ¯qt, preserving the lower-body support motion.

t ) together with both hands’ independent drivers (i.e. θL

t , θR

t , θL

Three design choices shape this refinement. (i) Compact active set. Restricting optimization to the
upper-body interaction chain confines corrections to joints that directly influence contact and pre-
vents unnecessary drift in lower-body support. (ii) Priority-weighted fingertip alignment. Following
precision-grasping principles (Handa et al., 2020), we assign larger weights to the thumb and index
fingertips, which often dominate interaction geometry, while the remaining fingertips provide com-
plementary grasp and support cues. (iii) Relaxed wrist anchoring. Rather than fixing the wrist at its
initialized position, we soften its positional anchor while retaining palm-orientation objectives (Xin
et al., 2026). This allows residual mismatch to be distributed across wrist placement and finger
articulation instead of forcing the fingers alone to absorb the correction.

Let ¯zt denote the initialized active coordinates. At each frame, the refinement solves

z∗
t = arg min
z∈Zt

λtipLtip + λoriLori + λclrLclr + λtempLtemp + Lreg,

(2)

where Ltip penalizes priority-weighted fingertip position error, Lori tracks the palm normal, wrist-
forward direction, and hand-lateral direction, Lclr collects soft collision-clearance and recovery
penalties, Ltemp regularizes the correction zt − ¯zt over time, , and Lreg denotes a regularization
term. Replacing the active joint values of ¯qt with z∗
1:T .
Through this coupled refinement, wrist placement and finger articulation are optimized as a single
interaction structure rather than as independent targets. Loss decompositions, dataset-specific target
assignments, and the complete definitions of QB

t yields the refined whole-body trajectory q∗

t and Zt are provided in Appendix A.

5

Figure 3: Anatomy-aware policy architecture. Left: Robot observations are factorized into
anatomical tokens and coordinated by a masked whole-body Transformer. Object information is
fused one-way into the waist, arm, and hand branches, while the original waist feature is retained for
object-independent leg control. Seven group-specific action heads produce the full body-and-hand
action. Right: Attention-mask visualization. Rows attend to columns. Light and dark green indicate
allowed attention in the robot Transformer and object-fusion Transformer, respectively.

3.3 ANATOMY-AWARE LOCO-MANIPULATION POLICY LEARNING

Retargeting provides interaction-consistent references, but realizing them under robot dynamics re-
quires coordinated control of locomotion, whole-body posture, and articulated hands. DexWeave
explicitly incorporates humanoid anatomy into both representation and information flow using
an asymmetric actor–critic architecture. The actor receives a 238-dimensional observation ot =
[orobot
], comprising a 211-dimensional robot observation and a 27-dimensional object ob-
t
servation, while the critic uses privileged simulation observations during training. The network
architecture is shown in Figure 3 .

, oobject
t

3.3.1 REGIONAL TOKENIZATION AND DIRECTED COORDINATION

The robot observation is factorized into eight anatomical regions corresponding to the base, bilat-
eral legs, waist, bilateral arms, and bilateral hands. Region-specific encoders Ei map each regional
observation xi into a shared d-dimensional space (d = 128), with a learned body-part embedding
pi:

H = [h1, . . . , h8]⊤.

(3)

hi = Ei(xi) + pi,

A two-layer masked Transformer produces

Z = Frobot(H; MR),
where the anatomical mask MR allows bidirectional communication among the base, legs, waist,
and arms, while preventing body tokens from attending to the hands. Each hand token attends to
the waist, both arms, and itself. This directed structure provides finger control with upstream body
context without feeding hand-specific features back into the body-control representation.

(4)

3.3.2 SELECTIVE OBJECT CONDITIONING

The object observation contains the current pose, reference pose, and their discrepancy in the torso
frame, where each pose uses a 3D position and a 6D rotation representation from the first two
columns of the rotation matrix. It is encoded as

ho = Eo(oobject

t

) + po,

(5)

where po is a learned object-token embedding.

Object information is fused only into the waist, arm, and hand tokens. Let IU denote these five
regions. A one-layer fusion Transformer computes

(cid:104)
(cid:101)ZIU , (cid:101)ho

(cid:105)

= Ffuse

(cid:0)[ZIU , ho]; Mo

(cid:1) ,

(6)

where each selected robot token attends only to itself and the object token, and the object token
attends only to itself. The base and leg tokens bypass object fusion. Importantly, the original object-
independent waist token is retained for the leg-action heads, making leg actions structurally inde-
pendent of direct object observations.

6

Object State𝑝!,𝑅!,𝑝!"#$⋯BaseL legR legWaistL armR armL handR handRobot State𝑞,̇𝑞,ω,̇ω⋯Ref. Motion𝑞"#$,̇𝑞"#$⋯Last Action𝑎%&'ObjectLearnableEmbed.⨁⨁⨁⨁⨁⨁⨁⨁⨁Object TokenAnatomy-awareTransformerWhole-bodyTrackerUpper-bodyAdapterConditionObservation Input𝒟ActionDecoderL leg 6DR leg 6DWaist 3DL arm 7DR arm 7DL hand 6DR hand 6DAction OutputℰRegionalEncoderObj. Encoder𝐹)*+*,(𝑀()ℰ!ObservationToken𝐹0123(𝑀))BypassConnectionBaseL legR legWaistL armR armL handR handObjectBaseL legR legWaistL armR armL handR handObjectAllow Attention (Whole-body tracking)Masked Attention (Whole-body tracking)Allow Attention (Upper-body Adapter)Masked Attention (Upper-body Adapter)𝑀"𝑀#3.3.3 GROUPED ACTION DECODING

Seven group-specific MLP heads decode the structured features into a 41-dimensional action mean.
Each head receives anatomically relevant context: leg heads use the base, corresponding leg, and
object-independent waist tokens; the waist and arm heads use object-conditioned upper-body fea-
tures; and each hand head uses the corresponding arm and hand features. Collectively,

µt = D

(cid:16)

Zt, (cid:101)ZIU
t

(cid:17)

.

(7)

The actor parameterizes a diagonal Gaussian policy,

πθ(at | ot) = N (cid:0)µt, diag(σ2)(cid:1) ,
with independently learned standard deviations. The 41 outputs represent normalized joint-position
commands rather than joint torques. They are converted to joint-position targets using joint-specific
scales and offsets and subsequently executed by joint-level PD controllers; the 12 independent hand
commands are expanded through fixed mimic-joint relations.

(8)

3.3.4 SINGLE-STAGE ACTOR–CRITIC LEARNING

All actor components are jointly optimized with PPO (Schulman et al., 2017). Tracking rewards
supervise the retargeted body and hand motion, while manipulation rewards supervise object inter-
action. The actor uses deployable observations, including noisy and delayed object measurements,
whereas the critic receives privileged simulation state. DexWeave therefore learns whole-body track-
ing and dexterous interaction in a single training stage, without tracking-policy pretraining, teacher–
student distillation, or subsequent residual-policy refinement. Further implementation and training
details are provided in Appendix B.

4 EXPERIMENTS

We evaluate DexWeave at two levels on a Unitree G1 with Inspire hands: retargeting quality and
closed-loop control. Section 4.1 evaluates whole-body feasibility and hand–object geometry, while
Section 4.2 examines whether the retargeted references enable effective policy learning. Ablation
results are reported in Appendix E.

4.1 RETARGETING EVALUATION

interaction settings:
body motion in
We evaluate DexWeave across progressively richer
LAFAN1 (Harvey et al., 2020), whole-body object
interaction without finger references in
OMOMO (Li et al., 2023), and articulated hand–object interaction in GRAB (Taheri et al., 2020)
and HUMOTO (Lu et al., 2025). This progression evaluates whether whole-body support remains
feasible as increasingly detailed interaction geometry is introduced. Appendix A provides the details
on retargeting settings, and Appendix C defines the evaluation metrics and aggregation protocol.

Whole-body feasibility and coarse contact preservation. LAFAN1 and OMOMO evaluate
whole-body feasibility before introducing fine-grained finger geometry, with OMOMO additionally
providing hand–object contact information. Because OMOMO does not contain observed finger-
tip targets, hand refinement primarily encourages contact between the robot hand and object sur-
faces. We compare DexWeave with OmniRetarget (Yang et al., 2026), GMR (Araujo et al., 2026),
and SOMA (NVIDIA, 2026). Table 1 shows the lowest penetration and near-zero foot skating for
DexWeave on both datasets. On OMOMO, contact duration reaches 0.999 and contact distance falls
to 2.944 cm, compared with 0.879 and 7.677 cm for the strongest contact baseline, GMR. The con-
tact gain is accompanied by a penetration duration of only 0.002, showing that closer hand–object
alignment is achieved while retaining whole-body feasibility under the measured criteria.

Fine-grained interaction retargeting. We compare DexWeave with OmniRetarget paired with
DexPilot (Handa et al., 2020) or SBR (Malate et al., 2026), each followed by arm–wrist IK that
adjusts hand placement while keeping finger articulation fixed. Table 2 shows that DexWeave lowers
primary-fingertip error to 4.342 mm on GRAB and 7.198 mm on HUMOTO, compared with 14.925

7

Table 1: Whole-body feasibility and coarse interaction preservation on LAFAN1 and
OMOMO. Penetration and foot skating measure feasibility; contact preservation is evaluated only
on OMOMO. Durations are fractions, and ∼ 0 denotes a near-zero value. Yellow and underlined
mark the best and second-best values within each dataset.

Dataset

Method

Penetration

Foot Skating

Contact Preservation

Duration
↓

Max Depth
(cm) ↓

Duration
↓

Max Vel.
(m/s) ↓

Duration
↑

Distance
(cm) ↓

LAFAN1

OMOMO

OmniRetarget
GMR
SOMA
DexWeave (Ours)

OmniRetarget
GMR
SOMA
DexWeave (Ours)

0.125
0.183
0.968
∼ 0

0.131
0.916
0.746
0.002

2.934
4.314
6.379
2.575

2.735
3.117
4.163
2.117

0.091
0.010
0.115
0

∼ 0
0.008
0.034
∼ 0

0.416
0.548
0.565
0

1.455
0.802
0.467
0.355

N/A
N/A
N/A
N/A

0.644
0.879
0.577
0.999

N/A
N/A
N/A
N/A

10.289
7.677
16.205
2.944

Table 2: Fine-grained interaction retargeting on GRAB and HUMOTO. Penetration duration is
the fraction of colliding frames. Primary and secondary errors measure thumb/index and remaining-
finger positions; palm error measures normal alignment. Lower is better. Yellow and underlined
mark the best and second-best values within each dataset. Full comparison can be found in Ap-
pendix D.

Dataset

Method

Penetration

Hand Alignment

Duration
↓

Max Depth
(cm) ↓

Pri. Err.
(mm) ↓

Sec. Err.
(mm) ↓

Palm Err.
(°) ↓

GRAB

HUMOTO

OmniRetarget + DexPilot + IK
OmniRetarget + SBR + IK
DexWeave (Ours)

OmniRetarget + DexPilot + IK
OmniRetarget + SBR + IK
DexWeave (Ours)

0.212
0.190
0.001

0.522
0.511
0.007

2.269
2.362
1.263

3.597
3.582
2.854

16.585
14.925
4.342

32.389
29.999
7.198

13.368
14.659
14.476

31.018
28.436
11.702

11.555
9.530
3.652

14.444
12.476
4.439

and 29.999 mm for the best IK variants, while achieving the lowest penetration duration and palm
error. Its secondary-fingertip error ranks first on HUMOTO and second on GRAB. These joint gains
are consistent with refining the arm, wrist, and fingers as one interaction chain. Figure 4 shows
representative whole-body motions and hand–object close-ups.

4.2 POLICY EVALUATION

The policy study asks whether the retargeted references can be executed under dynamics, first in
body-only tracking and then in dexterous loco-manipulation. We train one policy per reference
and compare actors with matched task-specific observations, actions, rewards, reset and termination
rules, domain randomization, and training budgets. Reported values summarize the common final
training window for each comparison; Appendices B and C provide the details on training and
aggregation settings.

Motion tracking. To isolate body coordination without object conditioning, we compare
DexWeave with Any2Track (Zhang et al., 2026b), GMT (Chen et al., 2025), and Beyond-
Mimic (Liao et al., 2025) on LAFAN1 motions (Harvey et al., 2020). As shown in Table 3,
DexWeave achieves a 100% completion ratio, matching BeyondMimic while outperforming all
baselines in tracking accuracy. Compared with BeyondMimic, DexWeave reduces body-position
error from 2.82 to 2.62 cm, torso-anchor position error from 5.19 to 4.82 cm, and anchor rotation
error from 2.48◦ to 2.34◦. Any2Track and GMT achieve lower completion ratios of 72.82% and
69.86%, respectively.

Dexterous loco-manipulation. The main control evaluation combines whole-body motion with
articulated hand–object interaction on reference motions. We compare DexWeave with InterMimic

8

Figure 4: Qualitative retargeting results across interaction levels. Each row shows a sequence
overview (left) and hand–object close-ups (right).
Body-only motion tracking

Actor

Any2Track
GMT
BeyondMimic
DexWeave (Ours)

Complete Ratio
(%) ↑

Body pos.
(cm) ↓

Anchor pos.
(cm) ↓

Anchor rot.
(deg) ↓

72.82
69.86
100
100

6.09
5.85
2.82
2.62

44.88
36.06
5.19
4.82

32.07
21.92
2.48
2.34

Dexterous loco-manipulation

Actor

Success rate
(%) ↑

Body pos.
(cm) ↓

Object pos.
(cm) ↓

Object rot.
(deg) ↓

InterMimic
Object MLP
DexWeave (Ours)

57.74
85.00
97.50

6.51
5.69
4.93

3.58
3.84
3.43

7.71
6.16
6.83

Table 3: Policy performance under MuJoCo
sim-to-sim evaluation. Results are averaged
equally over five tracking motions and five loco-
manipulation references. Any2Track and GMT
serve as general motion tracking baselines. Fol-
lowing InterMimic’s official human-model setup,
we evaluate it using an SMPL-X skeleton as
a cross-embodiment reference. DexWeave and
Object MLP share the G1–Inspire embodiment.
Completion and success rates indicate the percent-
age of evaluation episodes reaching the reference
end or time limit. Best values are in bold.

Figure 5: Policy learning curves. The top row
shows tracking episode length (1a) and body-
position (solid) and anchor-position (dashed)
errors (1b);
the bottom row shows loco-
manipulation episode length (2a) and object-
position (solid) and orientation (dashed) errors
(2b). Blue denotes the MLP and orange denotes
DexWeave.

(Xu et al., 2025) and an object-conditioned MLP baseline, i.e. we replace DexWeave’s Transformer
network with an MLP of comparable parameter count. As shown in Table 3, DexWeave achieves
the highest success rate of 97.5%, compared with 85.0% for the MLP baseline and 57.74% for Inter-
Mimic. It also attains the lowest body-position error (4.93 cm) and object-position error (3.43 cm).
The MLP baseline achieves a slightly lower object-rotation error (6.16◦ versus 6.83◦). Overall,
DexWeave improves task success while maintaining more accurate body and object tracking. Fig-
ure 5 shows the corresponding training curves, further demonstrating that DexWeave converges
faster than its MLP counterpart.

Sim-to-sim and hardware evaluation. We evaluate DexWeave through both sim-to-sim and sim-
to-real transfer on several dexterous loco-manipulation tasks. Figure 6 shows corresponding execu-
tions across simulation environments and on a physical Unitree G1 equipped with Inspire dexterous
hands. The results show that the learned policies preserve coordinated whole-body motion and dex-

9

(a) Bimanual basket transfer1(b) Tidying up the room(c) Lowering a tray and drinking from a mug(d) Packing up for a picnic and peeling mango21. Bimanual grasp2. Place basket on the cart121. Pickup two trash2. Grasp the mug2. Hold the mug1. Grasp the peeler2. Peel the mango 1212Sequence OverviewInteraction Details1. Place tray on the ground~1.5x(1a)(1b)~2x(2a)(2b)terous object interaction across simulators and transfer to the physical platform, providing qualitative
evidence that the human-derived references can be realized as executable robot skills.

Figure 6: Sim-to-sim and sim-to-real transfer of dexterous loco-manipulation policies. Policies
are trained in IsaacLab, evaluated in MuJoCo for sim-to-sim transfer, and deployed on a physical
Unitree G1 with Inspire dexterous hands for sim-to-real transfer.

5 CONCLUSION

We introduced DexWeave, which transfers human demonstrations into executable dexterous hu-
manoid loco-manipulation skills by combining interaction-consistent retargeting with anatomy-
aware policy learning. Experiments in simulation and on a physical humanoid demonstrate its effec-
tiveness in generating embodiment-specific training data for future embodied foundation models.

REFERENCES

Arthur Allshire, Hongsuk Choi, Junyi Zhang, David McAllister, Anthony Zhang, Chung Min Kim,
Trevor Darrell, Pieter Abbeel, Jitendra Malik, and Angjoo Kanazawa. Visual imitation enables
contextual humanoid control. In Conference on Robot Learning, 2025.

Joao Pedro Araujo, Yanjie Ze, Pei Xu, Jiajun Wu, and C. Karen Liu. Retargeting matters: General
motion retargeting for humanoid motion tracking. In IEEE International Conference on Robotics
and Automation, 2026.

Daniel Arnstr¨om, Alberto Bemporad, and Daniel Axehill. A dual active-set solver for embedded
quadratic programming using recursive LDLT updates. IEEE Transactions on Automatic Control,
67(8):4362–4369, 2022. doi: 10.1109/TAC.2022.3176430.

Zixuan Chen, Mazeyu Ji, Xuxin Cheng, Xuanbin Peng, Xue Bin Peng, and Xiaolong Wang. GMT:
General motion tracking for humanoid whole-body control. arXiv preprint arXiv:2506.14770,
2025. doi: 10.48550/arXiv.2506.14770. URL https://arxiv.org/abs/2506.14770.

Cheng Chi, Siyuan Feng, Yilun Du, Zhenjia Xu, Eric Cousineau, Benjamin C. M. Burchfiel,
In
and Shuran Song. Diffusion policy: Visuomotor policy learning via action diffusion.
doi: 10.15607/RSS.2023.XIX.026. URL https:
Robotics: Science and Systems, 2023.
//roboticsproceedings.org/rss19/p026.html.

10

t=0.00st=1.78st=2.86st=3.94st=5.72st=6.80st=0.00st=1.92st=3.36st=4.78st=7.66st=9.10st=0.00st=0.62st=1.52st=2.44st=3.96st=5.80st=6.67st=8.17st=9.33st=11.67st=14.00st=22.17st=6.33st=8.73st=9.53st=12.70st=14.27st=15.87st=3.43st=6.83st=8.53st=10.27st=11.97st=15.37sSim2SimSim2RealAnkur Handa, Karl Van Wyk, Wei Yang, Jacky Liang, Yu-Wei Chao, Qian Wan, Stan Birchfield,
Nathan Ratliff, and Dieter Fox. DexPilot: Vision-based teleoperation of dexterous robotic hand-
In IEEE International Conference on Robotics and Automation, pp. 9164–9170,
arm system.
2020. doi: 10.1109/ICRA40945.2020.9197124.

F´elix G. Harvey, Mike Yurick, Derek Nowrouzezahrai, and Christopher Pal. Robust motion in-
betweening. ACM Transactions on Graphics, 39(4), 2020. doi: 10.1145/3386569.3392480. URL
https://github.com/ubisoft/ubisoft-laforge-animation-dataset.

Tairan He, Zhengyi Luo, Xialin He, Wenli Xiao, Chong Zhang, Weinan Zhang, Kris M. Kitani,
Changliu Liu, and Guanya Shi. OmniH2O: Universal and dexterous human-to-humanoid whole-
body teleoperation and learning. In Proceedings of The 8th Conference on Robot Learning, vol-
ume 270 of Proceedings of Machine Learning Research, pp. 1516–1540. PMLR, 2025. URL
https://proceedings.mlr.press/v270/he25b.html.

Liang Heng, Yihe Tang, Jiajun Xu, Henghui Bao, Di Huang, and Yue Wang. HumDex: Humanoid

dexterous manipulation made easy. arXiv preprint arXiv:2603.12260, 2026.

Yingdong Hu, Haodong Zhu, Boyuan Zheng, Yihang Hu, Tong Zhang, Zunhao Chen, Junming
Zhao, Ruiqian Nai, and Yang Gao. OpenHLM: An empirical recipe for whole-body humanoid
loco-manipulation. arXiv preprint arXiv:2606.22174, 2026.

Haoran Jiang, Jin Chen, Qingwen Bu, Li Chen, Modi Shi, Yanjie Zhang, Delong Li, Chuanzhe Suo,
Chuang Wang, Zhihui Peng, and Hongyang Li. WholeBodyVLA: Towards unified latent VLA
for whole-body loco-manipulation control. In International Conference on Learning Representa-
tions, 2026. URL https://iclr.cc/virtual/2026/poster/10009805.

Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, Ashwin Balakrishna, Suraj Nair,
Rafael Rafailov, Ethan P. Foster, Pannag R. Sanketi, Quan Vuong, Thomas Kollar, Benjamin
Burchfiel, Russ Tedrake, Dorsa Sadigh, Sergey Levine, Percy Liang, and Chelsea Finn. Open-
In Conference on Robot Learning, vol-
VLA: An open-source vision-language-action model.
ume 270 of Proceedings of Machine Learning Research, pp. 2679–2713, 2025. URL https:
//proceedings.mlr.press/v270/kim25c.html.

Jiaman Li, Jiajun Wu, and C. Karen Liu. Object motion guided human motion synthesis.
ACM Transactions on Graphics, 42(6):1–11, 2023. doi: 10.1145/3618333. URL https:
//lijiaman.github.io/projects/omomo/.

Sikai Li, Shuning Li, Zhenyu Wei, Yunchao Yao, Chenran Li, and Mingyu Ding. CoorDex: Co-
ordinating body and hand priors for continuous dexterous humanoid loco-manipulation. arXiv
preprint arXiv:2606.23680, 2026a. URL https://arxiv.org/abs/2606.23680.

Zhe Li, Zhenzhe Zhang, Yangyang Wei, Wenjie Zhang, Xichen Yuan, Peiyuan Zhi, Gen Li, Xinying
Guo, Fengjie Gao, Jianfei Yang, and Shanghang Zhang. ω-0: A latent predictive world action
model for concurrent humanoid loco-manipulation. arXiv preprint arXiv:2608.06375, 2026b.

Zhuo Li, Yiming Yao, Jim Tan, Mengjie Jing, Zhipeng Dong, and Fei Chen. WholeBodyWAM:
Generalizing pre-trained world-action priors to humanoid loco-manipulation via WBC-grounded
coordination. arXiv preprint arXiv:2609.16644, 2026c.

Qiayuan Liao, Takara E. Truong, Xiaoyu Huang, Yuman Gao, Guy Tevet, Koushil Sreenath, and
C. Karen Liu. BeyondMimic: From motion tracking to versatile humanoid control via guided
diffusion. arXiv preprint arXiv:2508.08241, 2025.

Jiaxin Lu, Chun-Hao Paul Huang, Uttaran Bhattacharya, Qixing Huang, and Yi Zhou. HUMOTO:
A 4D dataset of mocap human object interactions. In Proceedings of the IEEE/CVF International
Conference on Computer Vision, pp. 10886–10897, 2025. doi: 10.1109/ICCV51701.2025.01013.
URL https://jiaxin-lu.github.io/humoto/.

Robert Jomar Malate, Erik Bauer, Norica Bacuieti, Stefanos Charalambous, Elvis Nava, Robert K.
Katzschmann, and Benedek Forrai. Smooth operator: A real-time sampling-based algorithm for
kinematic hand retargeting. arXiv preprint arXiv:2607.07491, 2026. URL https://arxiv.
org/abs/2607.07491.

11

NVIDIA.

SOMA retargeter.

Software, 2026. URL https://github.com/NVIDIA/

soma-retargeter.

Chaoyi Pan, Changhao Wang, Haozhi Qi, Zixi Liu, Homanga Bharadhwaj, Akash Sharma, Tingfan
Wu, Guanya Shi, Jitendra Malik, and Francois Hogan. SPIDER: Scalable physics-informed dex-
terous retargeting. arXiv preprint arXiv:2511.09484, 2025. URL https://arxiv.org/
abs/2511.09484.

John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, and Oleg Klimov. Proximal policy
optimization algorithms. arXiv preprint arXiv:1707.06347, 2017. doi: 10.48550/arXiv.1707.
06347. URL https://arxiv.org/abs/1707.06347.

Wandong Sun, Luying Feng, Baoshi Cao, Yang Liu, Yaochu Jin, and Zongwu Xie. ULC: A unified
and fine-grained controller for humanoid loco-manipulation. arXiv preprint arXiv:2507.06905,
2025. URL https://arxiv.org/abs/2507.06905.

Omid Taheri, Nima Ghorbani, Michael J. Black, and Dimitrios Tzionas. GRAB: A dataset of whole-
In European Conference on Computer Vision, pp. 581–600,

body human grasping of objects.
2020. doi: 10.1007/978-3-030-58548-8 34. URL https://grab.is.tue.mpg.de/.

Jielin Wu, Shenzhe Yao, Guanqi He, Xiaohan Liu, Zhaoqing Zeng, Xiangrui Jiang, Han Yang,
Wentao Zhang, and Hang Zhao. TopoRetarget: Interaction-preserving retargeting for dexterous
manipulation. arXiv preprint arXiv:2606.16272, 2026.

Chendong Xin, Mingrui Yu, Yongpeng Jiang, Zhefeng Zhang, and Xiang Li. Analyzing key objec-
tives in human-to-robot retargeting for dexterous manipulation. IEEE Robotics and Automation
Practice, 1:29–34, 2026. doi: 10.1109/RAP.2026.3656110.

Sirui Xu, Hung Yu Ling, Yu-Xiong Wang, and Liang-Yan Gui.

InterMimic: Towards univer-
In Proceedings of the
sal whole-body control for physics-based human-object interactions.
IEEE/CVF Conference on Computer Vision and Pattern Recognition, pp. 12266–12277, 2025.
URL https://sirui-xu.github.io/InterMimic/.

Lujie Yang, Xiaoyu Huang, Zhen Wu, Angjoo Kanazawa, Pieter Abbeel, Carmelo Sferrazza,
C. Karen Liu, Rocky Duan, and Guanya Shi. OmniRetarget: Interaction-preserving data gener-
ation for humanoid whole-body loco-manipulation and scene interaction. In IEEE International
Conference on Robotics and Automation, 2026.

Kevin Zakka. Mink: Python inverse kinematics based on MuJoCo, 2026. URL https:

//github.com/kevinzakka/mink. Software, version 1.1.0.

Yuanhang Zhang, Yifu Yuan, Prajwal Gurunath, Ishita Gupta, Shayegan Omidshafiei, Ali-akbar
Agha-mohammadi, Marcell Vazquez-Chanlatte, Liam Pedersen, Tairan He, and Guanya Shi.
FALCON: Learning force-adaptive humanoid loco-manipulation. In Proceedings of the 8th An-
nual Learning for Dynamics and Control Conference, volume 331 of Proceedings of Machine
Learning Research, pp. 265–281, 2026a. URL https://proceedings.mlr.press/
v331/zhang26a.html.

Zhikai Zhang, Jun Guo, Chao Chen, Jilong Wang, Chenghuai Lin, Yunrui Lian, Han Xue, Zhenrong
Wang, Maoqi Liu, Jiangran Lyu, Huaping Liu, He Wang, and Li Yi. Track any motions under
any disturbances. In IEEE International Conference on Robotics and Automation, 2026b. URL
https://arxiv.org/abs/2509.13833.

Jia Zheng, Teli Ma, Yudong Fan, Zifan Wang, Shuo Yang, and Junwei Liang. MotionWAM: To-
wards foundation world action models for real-time humanoid loco-manipulation. arXiv preprint
arXiv:2606.09215, 2026.

Brianna Zitkovich, Tianhe Yu, Sichun Xu, Peng Xu, Ted Xiao, Fei Xia, Jialin Wu, Paul Wohlhart,
Stefan Welker, Ayzaan Wahid, Quan Vuong, Vincent Vanhoucke, Huong Tran, Radu Soricut,
Anikait Singh, Jaspiar Singh, Pierre Sermanet, Pannag R. Sanketi, Grecia Salazar, Michael S.
Ryoo, Krista Reymann, Kanishka Rao, Karl Pertsch, Igor Mordatch, Henryk Michalewski, Yao
Lu, Sergey Levine, Lisa Lee, Tsang-Wei Edward Lee, Isabel Leal, Yuheng Kuang, Dmitry Kalash-
nikov, Ryan Julian, Nikhil J. Joshi, Alex Irpan, Brian Ichter, Jasmine Hsu, Alexander Herzog,

12

Karol Hausman, Keerthana Gopalakrishnan, Chuyuan Fu, Pete Florence, Chelsea Finn, Ku-
mar Avinava Dubey, Danny Driess, Tianli Ding, Krzysztof Marcin Choromanski, Xi Chen, Yev-
gen Chebotar, Justice Carbajal, Noah Brown, Anthony Brohan, Montserrat Gonzalez Arenas, and
Kehang Han. RT-2: Vision-language-action models transfer web knowledge to robotic control. In
Conference on Robot Learning, volume 229 of Proceedings of Machine Learning Research, pp.
2165–2183, 2023. URL https://proceedings.mlr.press/v229/zitkovich23a.
html.

13

A RETARGETING DETAILS

A.1 REFERENCE PREPROCESSING AND DATASET TARGETS

Time and coordinate conventions. All human, robot, and object trajectories are represented at
50 Hz (∆t = 0.02 s), preserving their original timing. Using zero-based frame indices, output
frame k corresponds to the fractional source index kfsrc/50, where fsrc is the source frame rate.
Rotations are interpolated on SO(3). A shared heading alignment and ground-height translation are
applied to all trajectories and world-space targets. The original scene scale is preserved by default
(sscene = 1). When real-world interaction targets exceed the robot’s reach, we adjust the scene scale
only as needed, applying p′ = a+sscene(p−a) to the human and all objects about a common ground
anchor a. Object mesh dimensions use the same scale factor; their orientations are unaffected by
scaling. The resulting object trajectories remain fixed throughout retargeting.

Interaction-dependent targets. For sequences with articulated hand observations, let pmorph
note the morphology-adapted wrist target and pscene
t,s
cessed scene, for hand s ∈ {L, R}. The wrist position target is

de-
the corresponding wrist position in the prepro-

t,s

(cid:98)pt,s = (1 − αt,s)pmorph

t,s

+ αt,spscene

t,s

.

(9)

The morphology-adapted target follows the torso. The scene target follows the preprocessed demon-
stration in the shared world frame and is not modified by retargeting. The blend applies only to
wrist positions,while wrist orientation targets retain their mapped values. The interaction weight
αt,s ∈ [0, 1] is determined from persistent hand–object proximity, using a 5 cm threshold and a
nominal persistence/transition interval of 4/30 s, discretized to seven frames at 50 Hz. GRAB and
HUMOTO additionally use source finger-contact labels to activate scene tracking, with a smooth
proximity-based ramp during approach. The same interaction weight balances world-frame finger-
tip alignment and wrist-local hand-shape preservation during refinement.

Dataset-specific targets. GRAB and HUMOTO provide articulated hand observations for fin-
gertip and hand-orientation fitting. Their evaluation masks are defined directly from source finger-
contact labels, independently of the smoothed target activations used during optimization. OMOMO
provides body–object motion without observed fingertip targets, while its SMPL-H joint centers are
therefore not treated as fingertip observations. Instead, refinement retains the observed wrist posi-
tions and initialized hand orientations, and uses robot-surface contact targets in place of fingertip
tracking. LAFAN1 provides body-only motion, which fingers remain in a neutral configuration,
and refinement updates only the arm and wrist joints. The corresponding refinement objectives and
contact-construction details are provided in Appendix A.3.

A.2 DECOUPLED BODY–HAND INITIALIZATION SETTINGS

A.2.1 BODY OPTIMIZATION AND SUPPORT CONSTRAINTS

The body solver in Eq. 1 optimizes the floating base and non-finger joints, with finger joints fixed.
Table 4 summarizes its soft objectives. The feasible set is

QB

t =




qB :


act ≤ q+,

q− ≤ qB
bs(qB) ≥ 0
cs,xy(qB) = at,s
dc(qB) ≥ −ϵc

(s ∈ {L, R}),

(s ∈ St),
(c ∈ CB
t )






,

(10)

where qB
bending side through

act contains the actuated body coordinates. The elbow constraint preserves the physical

bs =

n⊤

s [(pw − pe) × (pe − psh)]
∥pw − pe∥2∥pe − psh∥2

,

with wrist, elbow, and shoulder positions pw, pe, and psh, and the robot elbow’s world-frame
bending axis ns.

14

Fixed-foot detection in the source. The sole-stick mask is inferred once from the unscaled source
toe-base positions, ankle positions, and foot headings on the 50 Hz time grid, before morphology
adaptation. Toe height above the inferred support surface, ankle lift relative to its stable-contact
height, horizontal and vertical toe speeds, and foot yaw rate determine continuous contact, support,
stance, settling, motion, swing, liftoff, and landing scores in [0, 1], with causal smoothing. For
ground support, the stationarity gate requires horizontal toe speed at most 0.15 m/s and absolute
yaw rate at most 30◦/s. Contact and transition scores additionally distinguish a planted foot from a
slowly moving airborne foot.

The fixed-foot flag requires this stationarity gate, contact score at least 0.50 or support score at least
0.55, aggregate support strength at least 0.55, and motion, swing, liftoff, and landing scores all
below 0.25. Aggregate support strength is the maximum of the support, stance, and settling scores
and the release-attenuated contact score c(1−r3), where c is the contact score and r is the maximum
motion, swing, and liftoff score. Only contiguous runs lasting at least 0.12 s (six frames at 50 Hz)
are retained. Each retained run receives a separate episode identifier, and the active feet define St.
The mask and identifiers remain fixed during optimization.

Support height is inferred per episode to include feet planted on raised surfaces. Candidate raised
plateaus lie more than 12 cm above the global floor, persist for at least 0.12 s, and have a 5th–
95th percentile height range at most 2.5 cm; their acceptance also checks descent onto the surface
and subsequent departure. An accepted raised-support episode supplies the stationarity gate for the
interaction datasets. LAFAN1 additionally requires horizontal and vertical toe speeds at most 0.30
and 0.25 m/s and yaw rate at most 100◦/s. The same contact, transition, and persistence conditions
still apply.

Hard horizontal support constraints. At each frame, the body solver reads the fixed source mask
to acquire, retain, or release a foot constraint. The constrained robot toe point cs(q) is located at
[0.14, 0, −0.03]⊤ m in the G1 foot frame. At episode entry te, the solver stores its position ce,s from
the entry robot configuration and the corresponding mapped source contact pose ( (cid:98)Rte,s, (cid:98)pte,s). The
first output frame establishes the initial anchors. During an episode, the desired horizontal anchor is

at,s = Πxy

(cid:104)
(cid:98)pt,s + (cid:98)Rt,s (cid:98)R⊤

(cid:105)
te,s (ce,s − (cid:98)pte,s)

,

(11)

where Πxy selects the horizontal coordinates. LAFAN1 uses its independently constructed source
toe target with an episode-constant horizontal offset acquired from the entry configuration. Thus the
constraint preserves the robot’s contact offset relative to source support motion; a stationary source
target gives a constant world-space anchor. The anchor is released when the source sole-stick flag
becomes inactive.

For every s ∈ St, the equality cs,xy(q) = at,s enters both body IK passes as a hard QP constraint.
At iterate q(k), its linearization is

Js,xy(q(k))∆ξ = at,s − cs,xy(q(k)),

(12)

where ∆ξ is the tangent-space configuration increment. Joint and collision bounds are enforced in
the same solve. Toe forward kinematics is checked again after integration; nonlinear step correction
controls the equality residual with a nominal per-coordinate tolerance of 10−4 m. Finite outputs that
retain a larger residual are recorded as support-quality violations and remain subject to output-based
skating evaluation. The equality constrains only horizontal toe position: height follows the support
surface and nonpenetration constraints, while foot orientation is tracked through soft objectives.
Subsequent hand fitting and upper-body refinement leave the floating base and legs fixed, preserving
the attained support configuration.

Collision boundaries. The signed separation dc is positive outside collision. The set CB
includes
t
ground and support-surface boundaries, filtered body self-collision pairs, and enabled body–object
boundaries; detailed finger geometry is excluded. We use ϵc = 0, except for the GRAB and HU-
MOTO non-arm body–object check, which allows ϵc = 0.02 m. Collision and support-equality
tolerances are 10−5 m and 10−4 m, respectively. These optimization settings are distinct from eval-
uation thresholds.

15

Table 4: Body-optimization objectives. Position and orientation-axis terms use squared Euclidean
and squared angular errors, respectively; posture terms act on joint coordinates. Weights are per
landmark, axis, or joint, with k = 103. Foot and knee weights are listed before support/contact
modulation. Lengths are in meters and angles in radians unless stated otherwise.

Term

Target

World position; mapped x/y/z axes.
World position; mapped axes.

Body and support tracking
Pelvis pose
Torso pose
Shoulder / elbow positions World-frame shoulders; torso-relative elbows.
Interaction-dependent position; mapped axes.
Wrist pose
Support-aware sole center; heel and toe positions; sole-
Foot positions
corner heights.
Forward axis; sole normal.
World positions during ground-contact motion.

Foot orientation
Knee position

Temporal regularization (t > 1)
Root orientation

Torso / elbow corrections

Non-arm joint posture

Arm joint posture

Posture and bending priors
Leg bending

Arm joint margins

Initial body posture

Soft collision clearance
Self / ground clearance

Object clearance

Previous root correction transported by the source rota-
tion change.
Previous pose/position corrections transported with the
current reference.
Previous leg-twist, other leg, waist, and remaining non-
arm joint angles.
Previous arm/wrist angles.

Source bending direction/branch; optional knee-flexion
targets outside ground episodes.
Neutral posture in joint-margin coordinates: wrist,
shoulder/elbow, and other arm joints.
Neutral non-arm joint angles at the first frame.

Body geometry and arm proxies; self-clearance margin
of 5 mm and zero penetration into the ground or active
support plane.
Surface/material distance;
patches and 3 mm elsewhere.

zero margin at contact

Exact object penetration

Robot collision convexes against object meshes;
smooth zero-penetration penalty.

Weight or distance scale

82k; (2.4, 2.4, 3.2)k
11k; (1.05, 1.05, 1.45)k
4.2k ; 1.2k
240k; (2.1, 1.7, 0.9)k
115k; 48k each; 260k
each
1.8k; 2.8k
115k

(1.2, 1.2, 1.6)k

wtrackτB/∆t

1.20, 0.16, 0.12, 0.045

τBhj/(2∆t)

420o2; 420

1.20, 0.03, 0.025

0.018

35 mm

body
35 mm for

3 mm for fine
geometry;
coarse/arm geometry
0.1 mm

Axis-weight triples follow x, y, z. Here τB = 0.1 s, giving τB/∆t = 5 at 50 Hz; wtrack is the corresponding
tracking weight. The quantity hj is the Gauss–Newton curvature of the arm-margin term at the previous con-
figuration, and o ∈ [0, 1] measures source leg-bend observability. Clearance residuals are based on [mc − dc]+
and the listed distance scales, where [x]+ = max(x, 0). Exact penetration uses a smoothed boundary transi-
tion. Terms are enabled only when the required references or geometry are available.

A.2.2 HAND CODEBOOK AND CONTINUOUS FITTING

Each hand is parameterized by six independent drivers. Dependent joints follow the mimic relation
qj = ajθd(j) + bj. Driver bounds are intersected with the bounds implied by all dependent joints.
Forward kinematics yields wrist-local descriptors of finger directions, accumulated bending angles,
reach-to-chain-length ratios, and normalized inter-finger distances. Retrieval uses the mean squared
distance over observed components selected by the validity mask mt:

Dtn =

(cid:98)θs
t =

∥mt ⊙ (gs,H

n )∥2
2

t − gs,R
j mt,j

,

(cid:80)

(cid:80)

exp(−Dtn/τ )θs
n
exp(−Dtn/τ )

n∈Is
t

(cid:80)

n∈Is
t

.

(13)

Here I s

t contains the K = 12 nearest entries and τ = 0.06.

Starting from (cid:98)θs
t , continuous fitting combines wrist-local fingertip and chain position residuals, a
posture prior informed by the retrieved configurations and observed finger shape, and first- and

16

Table 5: Hand-initialization settings. Fitting weights are per landmark or driver and multiply
squared position or driver-coordinate errors. Position targets are wrist-local; lengths are in meters
and angles in radians. Here k = 103.

Term

Target and activation

Weight or setting

Codebook and retrieval
Driver sampling

Finger descriptors

Inter-finger distances

Masked retrieval

Geometric fitting
Fingertip positions
Finger-chain positions

Posture and support priors
Shape posture

Support hold

Target hold

Thumb support

Six mimic-feasible drivers: thumb yaw/pitch and
four finger flexions; interval sampling followed by
forward kinematics.
Wrist-to-tip, chain-root, and up to three segment
unit vectors; accumulated bending and tip reach di-
vided by chain length.
Selected tip-to-tip distances normalized by the
mean wrist-to-tip radius.
Observed-component distance and exponential
driver blending in Eq. equation 13.

{0.15, 0.50, 0.85}; NB =
36 = 729 per hand

Up to 15 + 2 components per
finger

6 pairs; at most 91 descriptor
components overall
K = 12; τ = 0.06

Observed thumb, index, and remaining fingertips.
Observed j1, j2, j3, and fingertip landmarks.

4.5k ftiprp
2.25k fchainℓjp

Six-driver reference informed by observed geome-
try and retrieved configurations.
Shape-reference driver angles during stable hand
support.
Previous driver angles while holding an interaction
target.
Thumb yaw/pitch when a support pitch target is
available.

170(1 + 3σ + 6η)

374 αcsup

510 ηctgt

1.2k β(0.78, 1.35)

Temporal regularization
First-order smoothness
Second-order smoothness Extrapolated driver configuration 2θt−1 − θt−2.

Previous driver configuration, after the first frame. 460(1 + 4σ + 10η)

180(1 + 3σ + 7η)

Thumb/index/other-finger factors are (1.45, 1.25, 0.78) for ftip and (1.25, 1.08, 0.82) for fchain. For j1, j2, j3,
and tip, respectively, ℓj takes 0.40, 0.72, 0.95, and 0.85; non-thumb j3 landmarks receive an additional factor
of 0.35. The pass factor is p = 0.72 for coarse fitting and p = 1.18 for fine fitting; r = 1.45 for the optional
fingertip-focused solve and r = 1 otherwise. The strengths σ, η, α, and β denote support stability, target
hold, support hold, and thumb support, respectively. The per-driver factors csup = (2, 2, 2.6, 2.8, 2.8, 2.8)
and ctgt = (1.8, 2.1, 2.8, 3, 3, 3) follow the six-driver order. Coarse and fine IK use eight iterations each with
damping 0.5, subject to driver bounds and mimic relations. Unavailable observations and inactive support terms
contribute no residual; fingers remain neutral without articulated hand observations.

second-order driver smoothness. Optimization updates only the independent drivers within their
bounds, with dependent joints reconstructed through the mimic relations. Table 5 details the code-
book construction, retrieval, and continuous-fitting settings. The fitted hands and body trajectory
together form the decoupled initialization ¯q1:T . Sequences without articulated hand references use
neutral fingers at this stage.

A.3 COUPLED UPPER-BODY INTERACTION REFINEMENT

Refinement jointly optimizes 14 arm/wrist joints and 12 independent hand drivers for OMOMO,
GRAB, and HUMOTO. LAFAN1 updates only the arm/wrist joints and keeps the fingers neutral.
The floating base, legs, and waist retain their initialized trajectories, and the preprocessed object
trajectories remain unchanged.

Interaction objectives. For articulated-hand inputs, let pt,sf and ut,sf denote the world-frame
and wrist-local positions of fingertip f on hand s. Their corresponding targets are yt,sf and vt,sf ,
and ℓt,s denotes the target hand scale. Using the interaction weight αt,s from reference construction,
fingertip alignment is defined as

Ltip =

(cid:88)

s,f

(cid:104)

ωf
ℓ2
t,s

t,s∥pt,sf − yt,sf ∥2
α2

2 + (1 − αt,s)2∥ut,sf − vt,sf ∥2
2

(cid:105)

.

(14)

17

Table 6: Coupled-refinement objectives. Position weights are divided by ℓ2
t,s and joint-coordinate
weights by squared feasible ranges. Activation factors are applied as described in the text. Angular
residuals use radians.

Term

Target and activation

Weight or setting

Interaction alignment
Thumb / index fingertips World-frame and wrist-local targets in Eq. equa-

2.0 each

Other fingertips

Hand orientation

tion 14.
Corresponding targets for the middle, ring, and lit-
tle fingers.
Palm normal, wrist-forward direction, and lateral
axis.

0.20 each

0.55, 0.42, 0.12

Position and posture anchors
Wrist / palm / elbow posi-
tions
Arm posture
Hand posture

Soft position anchors; wrist and palm anchors relax
with increasing interaction activation.
Posture prior in joint-limit-aware coordinates.
Initialized hand-driver configuration.

Temporal regularization (t > 1)
Arm correction

Hand drivers

Soft object clearance
Hand–object clearance

Noncontact margin

Previous correction relative to the current initial-
ization.
Previous independent driver configuration.

Clearance residual with an additional penalty in-
side material.
Desired separation for noncontact samples.

1.80

3 mm

0.08 / 0.06 / 0.0125

0.60
0.035

λU = 80.0

λH = 0.40

World-frame alignment preserves interaction placement, whereas wrist-local alignment preserves
free-hand shape. Orientation terms use squared angles between corresponding palm-normal, wrist-
forward, and lateral directions. Soft position and posture anchors in Lother are listed in Table 6.
Wrist and palm position weights are additionally multiplied by (1 − αt,s)2, relaxing their anchors
as scene alignment becomes dominant.

Temporal regularization. Let δU
tion. We regularize changes in this correction and in the hand drivers:
∥DH (θs

Ltemp = λU ∥DU (δU

t = qU

t − ¯qU

(cid:88)

t − δU

t−1)∥2

2 + λH

t denote the arm correction relative to the initializa-

t − θs

t−1)∥2
2,

(15)

where DU and DH normalize each coordinate by its feasible range. The arm term preserves the
previous correction relative to the current initialization rather than anchoring the arm to its previous
pose. The hand term directly smooths driver motion. Both terms are omitted at the first frame.

s

Feasibility and collision handling. The refinement feasible set is

q− ≤ qact(z; ¯qt) ≤ q+,

qj = ajθd(j) + bj,
bs ≥ 0

dc ≥ 0

(s ∈ {L, R}),
(c ∈ CU
t )





Zt =

z :

,

(16)

where qact(z; ¯qt) contains the reconstructed actuated coordinates, with all inactive coordinates fixed
to their initialized values. Mimic relations and elbow-bending constraints use the definitions from
body–hand initialization. The set CU
t contains active upper-limb self-collision boundaries and en-
abled ground constraints. HUMOTO and OMOMO enable ground checks for the full arm, palm, and
finger geometry; LAFAN1 excludes palm and finger geometry for the reason of non-finger dataset.
Adjacent and allowed robot pairs are filtered out, and fine self-collision uses URDF collision con-
vexes. Ground and self-collision checks use a numerical tolerance of 10−5 m.
Object clearance and contact recovery are soft objectives, rather than constraints in CU
t . For a sam-
pled object distance di and clearance margin mi, the clearance residual is ri = [mi − di]+ + [−di]+,
where [x]+ = max(x, 0). The second term increases the penalty inside object material. Material
penetration and visible-surface proximity use distinct geometric queries.

18

Table 7: Actor and critic observations for dexterous loco-manipulation. Dimensions count scalar
inputs before encoding. The last column specifies regional assignments for actor inputs and feature
composition for critic inputs.

Observation

Dimension

Input details

Actor observations
Reference body and hand joint positions
Reference non-finger joint velocities
Reference-anchor position history relative to torso
Reference-anchor orientation relative to torso
Base angular velocity
Current independent joint positions
Current non-finger joint velocities
Previous applied normalized action

Robot subtotal
Current and reference object poses and their
coordinate difference
Actor total

Privileged critic observations (training only)
Reference joint states
Anchor pose
Tracked-link poses
Base velocities
Current joint states
Previous actions
Object features

Critic total

41
29
7 × 3
6
3
41
29
41

211

Corresponding joint groups
Legs, waist, arms
Base
Base
Base
Corresponding joint groups
Legs, waist, arms
Corresponding joint groups

Eight regional tokens

9 + 9 + 9 Object token

238

82
9
216
6
82
41
27

463

41 positions and 41 velocities
Position and orientation
24 link positions and orientations
Linear and angular velocities
41 positions and 41 velocities
Previous action vector
Current and reference poses and their
coordinate difference

Independent value-network input

Actor regional input dimensions are 30 for the base, 30 per leg, 15 for the waist, 35 per arm, and 18 per hand.
The actor omits finger velocities, whereas the critic includes velocities for all 41 independent joint coordinates.

A.4 NUMERICAL IMPLEMENTATION

Frames are processed in temporal order using damped differential IK with Mink (Zakka, 2026) and
DAQP (Arnstr¨om et al., 2022). The nominal coarse/fine iteration limits are 22/30 for body optimiza-
tion and 8/8 for hand fitting; refinement uses 40 iterations per solve. Body damping is 0.30/0.25 for
the coarse/fine passes, and hand fitting and refinement use 0.50. The body stage additionally uses
constrained SLSQP for arm optimization. Feasibility recovery may require additional iterations.
After each integration step, nonlinear geometry is re-evaluated, inactive coordinates remain fixed,
and mimic relations are enforced in both configuration and tangent coordinates.

B POLICY IMPLEMENTATION AND TRAINING

Policies are trained in IsaacLab Simulator for a Unitree G1 equipped with Inspire RH56DFQ hands,
with a separate policy for each retargeted reference. The network architecture is shown in Figure 3.
The loco-manipulation comparison evaluates DexWeave and an object-conditioned MLP on differ-
ent tasks. Within each reference, the actors share observations, action interfaces, rewards, privileged
critics, randomization, and episode settings.

B.1 OBSERVATIONS AND NETWORK CONFIGURATION

Actor observations. The loco-manipulation actor receives 238 inputs: 211 robot features and
27 object features, as detailed in Table 7. The torso serves as the reference anchor. Current joint
positions are expressed relative to the default configuration, whereas reference joint positions remain
absolute targets. Base angular velocity is expressed in the base frame, while anchor and object
features use the current torso frame. The anchor position history contains seven samples spanning
120 ms at 50 Hz. Finger velocities are omitted from the actor input.

19

Object observations. For a pose T = (R, p), define r6(R) = [R11, R12, R21, R22, R31, R32]⊤
and ϕ(T ) = [p⊤, r6(R)⊤]⊤. The object observation is

xo =





ϕ(To)
ϕ(T ref
o )
ϕ(To) − ϕ(T ref
o )


 ∈ R27.

(17)

Both poses are expressed in the same measured torso frame. The final nine components are
coordinate-wise differences of the pose representations, rather than a relative rigid-body transform.
The reference object trajectory remains prescribed in the scene and the simulated object moves dy-
namically.

Privileged critic observations. During training, the critic receives privileged observations, in-
cluding finger velocities, tracked-link poses, and base linear velocity that are unavailable to the
actor. Robot and object states are obtained directly from simulation without the observation noise or
delay applied to the actor. The critic inputs are concatenated and processed by an independent value
network. Table 7 lists the complete critic observations.

Network configuration. Each regional encoder has one 128-unit hidden layer and produces a 128-
dimensional token. The object encoder receives the separate 27-dimensional object observation. The
robot Transformer contains two blocks and the object-fusion Transformer contains one. Each block
uses four attention heads, a feed-forward width of 256, residual connections, layer normalization,
ELU activations, and no dropout. Each action head has one 128-unit hidden layer. The independent
value network has hidden widths (512, 256, 128). Empirical observation normalization is applied to
network inputs. The object-conditioned MLP baseline has three hidden layers of width 621 and uses
the same critic.

Auxiliary motion tracking task. The body-only actor uses 157 inputs, six body tokens, and 29
actions. It retains one anchor-position sample and omits hand observations, hand actions, and object
conditioning. Its privileged critic receives 286 inputs. The attention-mask ablations change only the
permitted connections described in Sec. E.

B.2 ACTION INTERFACE AND REWARD DESIGN

Joint-position control. The policy outputs 41 normalized commands: 12 for the legs, three for
the waist, 14 for the arms and wrists, and 12 for the independent hand drivers. These commands
define joint position targets as

t = qdefault + s ⊙ at,
qcmd

(18)
where sj = 0.25τ max
/kp,j for body joints and sj = 0.25 for hand drivers. Joint-level PD controllers
execute the targets, with nominal hand-load gravity compensation applied to the waist and arms.
Finger gains are kp = 20 N m/rad and kd = 1 N m s/rad, with torque and velocity limits of 2 N m
and 5 rad/s. Leg and waist target velocities are limited to 16 rad/s, except for hip yaw at 20 rad/s.
The previous-action observation records the normalized target after this command processing.

j

The 12 independent hand commands are expanded through fixed mimic relations into 24 articu-
lated finger joints, yielding 53 simulated joints in total. The thumb’s intermediate and distal joints
use ratios of 1.6 and 2.4 relative to the pitch driver; the other four fingers use unit-ratio coupling.
Reference observations and action decoding use consistent anatomical joint groups.

Reward terms. Tracking rewards take the form rk = exp(−Ek/σ2
k), where Ek is a squared
position, joint-angle, velocity, or rotation-angle error. Orientation errors use geodesic angles on
SO(3). For multi-link and joint terms, squared errors are averaged over the selected elements before
applying the exponential. Body-pose rewards use the aligned reference defined in Appendix C. Hand
poses are evaluated relative to their respective wrists, and wrist–object terms compare relative poses.
Table 8 gives the tracking weights, error scales, and control penalties.

The undesired-contact penalty excludes permitted foot and hand contacts. Second-order action
penalties are computed from policy outputs before command processing. For body-only track-
ing, we omit hand and object rewardsand the second-order leg-action penalty. The torso position

20

Table 8: Reward configuration for dexterous loco-manipulation. Tracking rewards use the listed
weights and error scales σ, and penalty terms use direct coefficients. Lengths are in meters and
angles in radians.

Term

Whole-body tracking
Global torso position / orientation
Aligned body position / orientation
Global body linear / angular velocity
Body joint positions

Hand and object interaction
Independent hand-driver positions
Wrist-relative hand position / orientation
Wrist–object relative position / orientation
Object position / orientation

Control regularization
Action first difference, squared norm
Policy-output second difference, waist / legs
Joint-limit violation
Undesired contacts above 1 N

Weight

1.5/1.5
1.0/1.0
1.0/1.0
1.0

0.3
0.3/0.3
1.2/1.0
1.2/1.0

−0.10
−0.05/ − 0.01
−10.0
−0.10

Table 9: PPO and simulation settings.

Setting

Value

Setting

4,096
24

Parallel environments
Steps per environment
Learning epochs / minibatches 5 / 4
PPO clipping parameter
Discount γ / GAE λ
Maximum gradient norm
Entropy coefficient, tracking /
manipulation

0.2
0.99 / 0.95
1.0
0.005 / 0.002

Physics / control frequency
Samples per update
Initial learning rate
Target KL divergence
Value-loss coefficient
Initial action standard deviation

Scale σ

0.20/0.20
0.30/0.40
1.0/3.14
0.40

0.50
0.10/0.40
0.20/0.40
0.15/0.90

–
–
–
–

Value

200 / 50 Hz
98,304
10−3
0.01
1.0
1.0

and orientation rewards use weights of 1.0 and 0.75, with corresponding error scales of 0.20 m and
0.30 rad.

B.3 POLICY OPTIMIZATION AND DOMAIN RANDOMIZATION

PPO training. All actor components and the privileged critic are optimized jointly with PPO using
the settings in Table 9. Each update partitions the collected transitions into four minibatches of
24,576 samples. The learning rate is adapted using the target KL divergence, and the value loss uses
clipping. Loco-manipulation metrics are aggregated over the common training window specified in
Appendix C.

Dynamics and observations domain randomization. During training, we randomize contact and
inertial properties, actuation and control parameters, and actuator delays. External disturbances are
applied as velocity perturbations at randomized intervals. Actor observations additionally include
measurement noise and delays, with object poses sampled at a fixed frequency. The critic receives
the corresponding states from the same randomized simulation without the observation noise or
delays applied to the actor. Table 10 summarizes the randomization models and ranges, together
with the fixed measurement settings.

B.4 EPISODE INITIALIZATION AND TERMINATION

Reference-phase initialization. The default initialization scheme uses equal proportions of first-
frame and sampled-phase starts. Robot and object poses are initialized at the same reference phase,
and their velocities follow the reference without added impulses. For sampled starts, phases are
drawn using 70% uniform sampling and 30% failure-adaptive sampling. The adaptive weights use

21

Table 10: Domain randomization and measurement settings. Randomized quantities are sampled
uniformly over the listed ranges; ±a denotes [−a, a]. Multiplicative factors are relative to nominal
values. Fixed settings are marked explicitly.

Quantity

Model

Range or value

Contact and inertial properties
Static friction
Dynamic friction
Restitution
Foot contact offset
Body mass
Hand payload
Torso center of mass
Hand center of mass

Actuation and control
Motor strength
Joint armature
PD stiffness
PD damping
Default joint position
Joint friction
Actuator delay

External disturbances
Push interval
Horizontal velocity
Roll/pitch angular velocity
Yaw angular velocity

Actor observation noise
Joint position
Joint velocity
Base angular velocity
Anchor position
Anchor orientation
Object position
Object orientation

Actor measurement timing
Anchor-position delay
Object measurement rate
Object measurement latency

Coefficient
Coefficient
Fixed coefficient
Distance parameter
Multiplicative
Multiplicative
Position offset
Position offset

Multiplicative
Multiplicative
Multiplicative
Multiplicative
Additive offset
Parameter value
Physics-step delay

[0.4, 1.8]
[0.35, 1.5]
0
[5, 20] mm
[0.9, 1.1]
[0.8, 1.25]
±(0.025, 0.05, 0.05) m
±0.03 m per axis

[0.8, 1.2]
[0.8, 1.2]
[0.85, 1.15]
[0.75, 1.25]
±0.02 rad
[0, 0.08]
0–2 steps (0–10 ms)

Event interval
Velocity disturbance
Velocity disturbance
Velocity disturbance

[1.5, 3.0] s
±0.4 m/s in x and y
±0.15 rad/s
±0.25 rad/s

Additive noise
Additive noise
Additive noise
Additive noise
Representation noise
Translation perturbation ±0.01 m
Rotation perturbation

±0.01 rad
±0.5 rad/s
±0.2 rad/s
±0.05 m
±0.05 per component

±0.035 rad

Measurement delay
Fixed sampling rate
Measurement delay

[0, 120] ms
30 Hz
[20, 60] ms

Static and dynamic friction use consistent coefficients. Torso center-of-mass offsets follow the x, y, z axes.
Anchor orientation noise acts on rotation-representation components, whereas object orientation perturbations
are specified in radians. The critic receives simulation observations without the noise or measurement delays
applied to the actor.

the square root of phase-wise failure rates, with phase-bin probabilities capped at 0.28. Sampled-
start episodes use 0.5–1.5 s of pre-roll and last at most 10 s.

Termination conditions. Episodes end at the reference end or the applicable time limit, or earlier
when a failure condition is met. Both loco-manipulation and body-only tracking terminate when
the torso or end-effector height error exceeds 0.25 m. For loco-manipulation, additional failure
thresholds are 0.50 m for torso horizontal position error and 0.70 rad for torso orientation error.
Object position and orientation errors are limited to 0.30 m and 2.0 rad, respectively. Body-only
tracking additionally terminates when the vertical projected-gravity discrepancy exceeds 0.8 and
has a time limit of 500 control steps.

22

C EVALUATION DEFINITIONS

C.1 RETARGETING METRICS

Evaluation setup. Each method is evaluated using its corresponding robot and hand geometry
and physical sampling interval. Source contact and support schedules are temporally aligned with
the output frames. For the modular baselines, DexPilot or SBR initializes finger articulation on the
OmniRetarget body trajectory. The additional IK variants optimize the two seven-joint arm–wrist
chains using world-frame wrist and fingertip position objectives, with the fingers, floating base,
waist, and legs fixed. The refinement ablation compares DexWeave’s initialized and refined outputs
on matched sequences, verifying that all inactive body coordinates and object trajectories remain
identical.

Penetration. Penetration is recomputed from the saved output configuration at every frame. For
each applicable component c ∈ {ground, self, object}, let pt,c ≥ 0 be the deepest detected pen-
etration at frame t. Ground and filtered self-penetration use each method’s MuJoCo G1 collision
geometry, excluding structurally allowed pairs, while palm and finger geometry are excluded for
LAFAN1. OMOMO evaluates robot collision-surface points against its material signed distance
field, whereas GRAB and HUMOTO compare robot URDF collision convexes against the original
object triangle meshes. The component thresholds are τground = τself = 1 cm and τobject = 2 cm
for all interaction datasets. LAFAN1 has no object component. For a sequence of T output frames,

Dpen =

1
T

T
(cid:88)

t=1

1[∃c : pt,c > τc] .

(19)

Here 1[·] is the indicator function. A frame is counted once even if several components violate their
thresholds. Raw penetration depths are retained without subtracting the thresholds. These evalu-
ation thresholds are applied to the returned trajectory independently of the optimizer’s clearance
objectives, feasibility tolerances, or convergence status.

Foot skating. The fixed-foot mask and episode identifiers are derived from source motion as de-
tailed in Appendix A.2.1, then sampled at each method’s output times. They are independent of the
optimized robot toe speed. At t > 1, let Vt contain the feet whose source sole-stick flag is active at
both t − 1 and t with the same episode identifier. The first frame and transitions into a new episode
provide no valid within-episode displacement for that foot. Using the robot toe point defined in
Appendix A.2.1, its horizontal speed is

vt,s =

∥cs,xy(qt) − cs,xy(qt−1)∥2
∆t

,

(20)

where ∆t is the evaluated output’s physical sampling interval. A frame is classified as skating when
any s ∈ Vt has vt,s > 0.30 m/s. The sequence-level duration is

T
(cid:88)

t=2

Dskate =

1[∃s ∈ Vt : vt,s > 0.30 m/s]

T
(cid:88)

t=2

1[Vt ̸= ∅]

.

(21)

The denominator counts frames with at least one eligible support foot, counting double support
once. Sequences with a zero denominator have undefined skating metrics and are excluded from
skating averages. The 0.30 m/s threshold classifies output violations; source support activation and
hard optimization constraints use the separate rules in Appendix A.2.1.

Contact preservation and hand alignment. Evaluation frames are determined by source interac-
tions, independently of robot contact. OMOMO detects contact using unsigned distance threshold
to the visible object surface. Source detection uses the minimum distance over five reconstructed
distal-finger proxies per hand and robot detection uses samples of its native hand collision surface.
GRAB and HUMOTO instead select each hand’s interaction frames using positive source finger-
contact labels.

23

On OMOMO, contact preservation is the fraction of source-contact frames in which either robot
hand contacts any active object part, without requiring the same hand or part as in the source. Contact
distance averages unsigned distances from all five robot fingertips to the nearest active object surface
on frames when the corresponding source hand is in contact. SOMA uses five fixed surface proxies
on its rigid rubber hand. For finer alignment on GRAB and HUMOTO, primary and secondary errors
measure world-frame fingertip distances for the thumb, index and remaining fingers, respectively.
Palm error measures the angle between semantic palm normals. Targets come from the source scene
before morphology blending or optimization adjustments.

C.2 POLICY METRICS AND AGGREGATION

Geometric errors. Let a denote the torso anchor and b a tracked link. Body-position error uses
the yaw-aligned, height-preserving reference transform of BeyondMimic (Liao et al., 2025):

t,a)⊤(cid:1)(cid:1) ,

R∆,t = Rz


(cid:101)pref
t,b =





(cid:0)yaw(cid:0)Rt,a(Rref
pt,a,x
pt,a,y
pref
t,a,z

 + R∆,t

(cid:0)pref

t,b − pref
t,a

(cid:1) .

(22)

This transform aligns the reference yaw and horizontal anchor position with the robot while preserv-
ing the reference height. The body-position error at frame t is

ebody,t =

1
|B|

(cid:88)

b∈B

(cid:13)
(cid:13)pt,b − (cid:101)pref

t,b

(cid:13)
(cid:13)2

.

(23)

For body-only tracking, B contains 14 links: the pelvis, torso, and bilateral hip-roll, knee, ankle-
roll, shoulder-roll, elbow, and wrist-yaw links. Loco-manipulation additionally includes ten hand
landmarks.

Anchor and object errors are evaluated directly in the world frame, without reference alignment.
Position error is the Euclidean distance between corresponding positions, and orientation error is

dSO(3)(R1, R2) = arccos

(cid:18)

clip

(cid:18) tr(R⊤

1 R2) − 1

(cid:19)(cid:19)

, −1, 1

.

(24)

2

Episode statistics. Episode length is measured in control steps, with a maximum of 500 steps
for body-only tracking. An episode is considered complete if it reaches the reference end or the
prescribed time limit without early failure termination. Completion ratio for body-only tracking
and success rate for loco-manipulation report the percentage of completed evaluation episodes. For
sampled-phase starts, completion refers to the evaluated segment rather than necessarily the entire
reference.

Evaluation protocol and aggregation. Body-only tracking and loco-manipulation policies are
trained for 8k and 12k PPO iterations, respectively. During the final 1k iterations, policy checkpoints
are saved every 100 iterations. For each reference sequence, every saved checkpoint is evaluated in
MuJoCo five times using different evaluation seeds, with policy weights fixed throughout evalua-
tion. All tabulated policy results are computed from these evaluation runs rather than training logs.
For each metric, we first average across the five evaluation runs for each checkpoint, then across
checkpoints within each sequence, and finally equally across reference sequences within each task
setting.

D ADDITIONAL RETARGETING RESULTS

Table 11 gives the full comparison, including baselines with and without arm–wrist IK. Adding IK
substantially lowers fingertip error but increases penetration duration on both datasets. DexWeave
improves primary-fingertip alignment and reduces penetration duration relative to both variants.

24

Table 11: Complete fine-grained interaction retargeting results on GRAB and HUMOTO.
Penetration duration is the fraction of colliding frames. Primary and secondary errors measure
thumb/index and remaining-finger positions; palm error measures normal alignment. Lower is bet-
ter. Yellow and underlined mark the best and second-best values within each dataset.

Penetration

Hand Alignment

Dataset

Method

Duration
↓

Max Depth
(cm) ↓

GRAB

HUMOTO

OmniRetarget + DexPilot
OmniRetarget + DexPilot + IK
OmniRetarget + SBR
OmniRetarget + SBR + IK
DexWeave (Ours)

OmniRetarget + DexPilot
OmniRetarget + DexPilot + IK
OmniRetarget + SBR
OmniRetarget + SBR + IK
DexWeave (Ours)

0.183
0.212
0.184
0.190
0.001

0.370
0.522
0.370
0.511
0.007

2.123
2.269
2.120
2.362
1.263

3.638
3.597
3.638
3.582
2.854

Pri. Err.
(mm) ↓

209.353
16.585
210.524
14.925
4.342

292.886
32.389
292.750
29.999
7.198

Sec. Err.
(mm) ↓

Palm Err.
(°) ↓

207.745
13.368
212.985
14.659
14.476

278.574
31.018
283.381
28.436
11.702

52.122
11.555
52.122
9.530
3.652

47.815
14.444
47.815
12.476
4.439

Table 12: Retargeting-stage ablation. Decoupled is the body-and-hand initialization; refined is the
final output.

Penetration

Hand Alignment

Dataset

Stage

Duration
↓

Max Depth
(cm) ↓

GRAB

HUMOTO

Decoupled
Refined

Decoupled
Refined

0.157
0.001

0.204
0.007

1.778
1.263

2.568
2.854

Pri. Err.
(mm) ↓

36.033
4.342

32.703
7.198

Sec. Err.
(mm) ↓

Palm Err.
(deg) ↓

36.995
14.476

26.090
11.702

0.189
3.652

0.159
4.439

E ABLATION STUDY

Effect of upper-limb refinement. We compare the decoupled initialization and refined output on
matched GRAB and HUMOTO sequences to isolate the contribution of coupled refinement (Ta-
ble 12). Refinement reduces primary-fingertip error by 87.9% on GRAB and 78.0% on HUMOTO,
together with lower secondary-fingertip errors. Penetration duration decreases from 0.157 to 0.001
and from 0.204 to 0.007, respectively. These improvements are accompanied by larger palm-normal
errors on both datasets. On HUMOTO, Max Depth also increases from 2.568 to 2.854 cm. Because
this metric averages frame-wise maximum depths only over violating frames, the increase reflects
the severity of the remaining violations rather than their frequency. Overall, refinement improves
fingertip alignment and reduces penetration frequency, with a trade-off in palm orientation and con-
ditional penetration depth on HUMOTO.

Effect of the attention masks. We relax each attention mask separately, keeping the remaining
architecture and training settings fixed. Dense MR enables unrestricted attention among all eight
robot-region tokens. Bidirectional MO enables dense attention among the object token and five
upper-body tokens, retaining the lower-body bypass. Table 13 shows that the full design achieves
the highest completion ratio of 100% and the lowest body-position error of 4.58 cm. Dense MR

Table 13: Policy-mask ablation. Results are averaged over two reference motions using check-
points saved every 100 iterations during the final 1,000 training iterations, with five evaluation seeds
per checkpoint and reference. Dense MR and bidirectional MO each relax one attention mask.

Attention setting

MR dense
MO bidirectional
MR and MO (DexWeave)

Complete Ratio
(%) ↑

Body pos.
(cm) ↓

Object pos.
(cm) ↓

Object rot.
(deg) ↓

91.30
99.71
100

4.79
4.63
4.58

3.62
3.88
3.81

8.23
9.19
8.47

25

yields lower object-position and orientation errors (3.62 cm and 8.23◦, compared with 3.81 cm and
8.47◦ for DexWeave), but its completion ratio falls to 91.30%. Bidirectional MO achieves a similar
completion ratio of 99.71%, with higher body-position and object-pose errors than the full design.
These results support directed attention for episode completion and body tracking, without showing
a uniform advantage in object-pose accuracy.

26
