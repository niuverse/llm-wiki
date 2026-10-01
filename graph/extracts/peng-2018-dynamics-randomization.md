Sim-to-Real Transfer of Robotic Control with Dynamics Randomization
Xue Bin Peng1,2, Marcin Andrychowicz1, Wojciech Zaremba1, and Pieter Abbeel1,2
Abstract—Simulationsareattractiveenvironmentsfortrain-
ing agents as they provide an abundant source of data and
alleviate certain safety concerns during the training process.
Butthebehavioursdevelopedbyagentsinsimulationareoften
specifictothecharacteristicsofthesimulator.Duetomodeling
error, strategies that are successful in simulation may not
transfer to their real world counterparts. In this paper, we
demonstrate a simple method to bridge this “reality gap”. By
Fig. 1. A recurrent neural network policy trained for a pushing task in
randomizingthedynamicsofthesimulatorduringtraining,we
simulation is deployed directly on a Fetch Robotics arm. The red marker
are able to develop policies that are capable of adapting to
indicatesthetargetlocationforthepuck.
verydifferentdynamics,includingonesthatdiffersignificantly
from the dynamics on which the policies were trained. This approach to develop policies that can be transferred directly
adaptivity enables the policies to generalize to the dynamics of
to the real world. The effectiveness of our approach is
therealworldwithoutanytrainingonthephysicalsystem.Our
demonstrated on an object pushing task, where a policy
approach is demonstrated on an object pushing task using a
roboticarm.Despitebeingtrainedexclusivelyinsimulation,our trained exclusively in simulation is able to successfully
policiesareabletomaintainasimilarlevelofperformancewhen performthetaskwitharealrobotwithoutadditionaltraining
deployedonarealrobot,reliablymovinganobjecttoadesired on the physical system.
location from random initial configurations. We explore the
impact of various design decisions and show that the resulting II. RELATEDWORK
policies are robust to significant calibration error.
Recent years have seen the application of deep reinforce-
I. INTRODUCTION ment learning to a growing repertoire of control problems.
The framework has enabled simulated agents to develop
Deep reinforcement learning (DeepRL) has been shown
highly dynamic motor skills [4], [5], [6], [7]. But due to
to be an effective framework for solving a rich reper-
the high sample complexity of RL algorithms and other
toire of complex control problems. In simulated domains,
physical limitations, many of the capabilities demonstrated
agents have been developed to perform a diverse array of
insimulationhaveyettobereplicatedinthephysicalworld.
challenging tasks [1], [2], [3]. Unfortunately, many of the
Guided Policy Search (GPS) [8] represents one of the few
capabilities demonstrated by simulated agents have often
algorithms capable of training policies directly on a real
not been realized by their physical counterparts. Many of
robot.Byleveragingtrajectoryoptimizationwithlearnedlin-
the modern DeepRL algorithms, which have spurred recent
eardynamicsmodels,themethodisabletodevelopcomplex
breakthroughs, pose high sample complexities, therefore
manipulation skills with relatively few interactions with the
often precluding their direct application to physical systems.
environment.Themethodhasalsobeenextendedtolearning
In addition to sample complexity, deploying RL algorithms
vision-basedmanipulationpolicies[9].Researchershavealso
in the real world also raises a number of safety concerns
explored parallelizing training across multiple robots [10].
both for the agent and its surroundings. Since exploration
Nonetheless,successfulexamplesoftrainingpoliciesdirectly
is a key component of the learning process, an agent can at
on physical robots have so far been demonstrated only on
timesperformactionsthatendangeritselforitsenvironment.
relatively restrictive domains.
Training agents in simulation is a promising approach that
circumvents some of these obstacles. However, transferring A. Domain Adaptation
policies from simulation to the real world entails challenges
The problem of transferring control policies from sim-
in bridging the ”reality gap”, the mismatch between the
ulation to the real world can be viewed as an instance
simulated and real world environments. Narrowing this gap
of domain adaptation, where a model trained in a source
has been a subject of intense interest in robotics, as it offers
domain is transfered to a new target domain. One of the
the potential of applying powerful algorithms that have so
key assumptions behind these methods is that the different
far been relegated to simulated domains.
domains share common characteristics such that representa-
While significant efforts have been devoted to building
tionsand behaviourslearned inone willprove usefulfor the
higher fidelity simulators, we show that dynamics random-
other.Learninginvariantfeatureshasemergedasapromising
izationusinglowfidelitysimulationscanalsobeaneffective
approach of taking advantage of these commonalities [11],
[12]. Tzeng et al. [11] and Gupta et al. [13] explored using
1OpenAI
pairwise constraints to encourage networks to learn similar
2UC Berkeley, Department of Electrical Engineering and Computer
Science embeddings for samples from different domains that are
8102
raM
3
]OR.sc[
3v73560.0171:viXra

labeled as being similar. Daftry et al. [14] applied a similar their policies were modeled using memoryless feedforward
approach to transfer policies for controlling aerial vehicles networks,andwhilethepoliciesdevelopedrobuststrategies,
to different environments and vehicle models. In the context the lack of internal state limits the feedforward policies’
of RL, adversarial losses have been used to transfer policies ability to adapt to mismatch between the simulated and real
betweendifferentsimulateddomains,byencouragingagents environment. We show that memory-based policies are able
to adopt similar behaviours across the various environments tocopewithgreatervariabilityduringtrainingandalsobetter
[15].Alternatively,progressivenetworkshavealsobeenused generalizetothedynamicsoftherealworld.Unlikeprevious
to transfer policies for a robotic arm from simulation to the methods which often require meticulous calibration of the
real world [16]. By reusing features learned in simulation, simulation to closely conform to the physical system, our
their method was able to significantly reduce the amount policies are able to adapt to significant calibration error.
of data needed from the physical system. Christiano et al.
[17] transfered policies from simulation to a real robot by C. Non-prehensile Manipulation
training an inverse-dynamics model from real world data.
Pushing, a form of non-prehensile manipulation, is an
Whilepromising,thesemethodsnonethelessstillrequiredata
effective strategy for positioning and orienting objects that
from the target domain during training.
aretoolargeorheavytobegrasped[26].Thoughpushinghas
B. Domain Randomization attracted much interest from the robotics community [27],
[28], [29], it remains a challenging skill for robots to adopt.
Domain randomization is a complementary class of tech-
Part of the difficulty stems from accurately modeling the
niques for adaptation that is particularly well suited for sim-
complex contact dynamics between surfaces. Characteristics
ulation. With domain randomization, discrepancies between
suchasfrictioncanvarysignificantlyacrossthesurfaceofan
the source and target domains are modeled as variability
object, and the resulting motions can be highly sensitive to
in the source domain. Randomization in the visual domain
the initial configuration of the contact surfaces [26]. Models
has been used to directly transfer vision-based policies from
have been proposed to facilitate planning algorithms [27],
simulation to the real world without requiring real images
[30], [28], but they tend to rely on simplifying assumptions
during training [18], [19]. Sadeghi and Levine [18] trained
thatareoftenviolatedinpractice.Morerecently,deeplearn-
vision-based controllers for a quadrotor using only synthet-
ingmethodshavebeenappliedtotrainpredictivemodelsfor
ically rendered scenes, and Tobin et al. [19] demonstrated
pushing [31]. While data-driven methods overcome some of
transferring image-based object detectors. Unlike previous
themodelingchallengesfacedbypreviousframeworks,they
methods, which sought to bridge the reality gap with high
require a large corpus of real world data during training.
fidelity rendering [20], their systems used only low fidelity
Such a dataset can be costly to collect, and may become
rendering and modeled differences in visual appearance by
prohibitive for more complex tasks. Clavera et al. demon-
randomizing scene properties such as lighting, textures, and
strated transferring pushing policies trained in simulation to
camera placement. In addition to randomizing the visual
a real PR2 [32]. Their approach took advantage of shaped
features of a simulation, randomized dynamics have also
reward functions and careful calibration to ensure that the
beenusedtodevelopcontrollersthatarerobusttouncertainty
behaviour of the simulation conforms to that of the physical
in the dynamics of the system. Mordatch et al. [21] used a
system. In contrast, we will show that adaptive policies can
trajectory optimizer to plan across an ensemble of dynamics
be trained exclusively in simulation and using only sparse
models, to produce robust trajectories that are then executed
rewards. The resulting policies are able accommodate large
on a real robot. Their method allowed a Darwin robot to
calibration errors when deployed on a real robot and also
perform a variety of locomotion skills. But due to the cost
generalize to variability in the dynamics of the physical
ofthetrajectoryoptimizationstep,theplanningisperformed
system.
offline. Other methods have also been proposed to develop
robust policies through adversarial training schemes [22],
III. BACKGROUND
[23]. Yu et al. [24] trained a system identification module
to explicitly predict parameters of interest, such as mass and In this section we will provide a review of the RL
friction.Thepredictedparametersarethenprovidedasinput framework and notation used in the following sections. We
to a policy to compute the appropriate controls. While the consider a standard RL problem where an agent interacts
resultsareencouraging,thesemethodshavesofaronlybeen with an environment according to a policy in order to
demonstrated on transfer between different simulators. maximizeareward.Thestateoftheenvironmentattimestep
The work most reminiscent to our proposed method is t is denoted by s ∈ S. For simplicity, we assume that
t
that of Antonova et al. [25], where randomized dynamics the state is fully observable. A policy π(a|s) defines a
was used to transfer manipulation policies from simulation distributionovertheactionspaceAgivenaparticularstates,
to the real world. By randomizing physical parameters such whereeachquerytothepolicysamplesanactionafromthe
as friction and latency, they were able to train policies in conditional distribution. The reward function r : S ×A →
simulation for pivoting objects held by a gripper, and later R provides a scalar signal that reflects the desirability of
transferthepoliciesdirectlytoaBaxterrobotwithoutrequir- performing an action at a given state. For convenience, we
ing additional fine-tuning on the physical system. However denote r =r(s ,a ). The goal of the agent is to maximize
t t t

the multi-step return R = (cid:80)T γt(cid:48)−tr , where γ ∈ [0,1] Learning from a sparse binary reward is known to be chal-
t t(cid:48)=t t(cid:48)
is a discount factor and T is the horizon of each episode. lenging for most modern RL algorithms. We will therefore
The objective during learning is to find an optimal policy leverage a recent innovation, Hindsight Experience Relay
π∗ that maximize the expected return of the agent J(π) (HER) [35], to train policies using sparse rewards. Consider
an episode with trajectory τ ∈ (s ,a ,...,a ,s ), where
0 0 T−1 T
π∗ =arg maxJ(π)
the goal g was not satisfied over the course the trajectory.
π
Since the goal was not satisfied, the reward will be −1
If each episode starts in a fixed initial state, expected return
at every timestep, therefore providing the agent with little
can be rewritten as the expected return starting at the first
information on how to adjust its actions to procure more
step
rewards. But suppose that we are provided with a mapping
(cid:34)T−1 (cid:35) m : S → G, that maps a state to the corresponding
J(π)=E[R 0 |π]=E τ∼p(τ|π) (cid:88) r(s t ,a t ) goal satisfied in the given state. For example, m(s T ) = g(cid:48)
represents the goal that is satisfied in the final state of the
t=0
trajectory.Onceanewgoalhasbeendetermined,rewardscan
where p(τ|π) represents the likelihood of a trajectory
be recomputedfor theoriginal trajectoryunder thenew goal
τ =(s ,a ,s ,...,a ,s ) under the policy π,
0 0 1 T−1 T g(cid:48). While the trajectory was unsuccessful under the original
goal, it becomes a successful trajectory under the new goal.
T−1
p(τ|π)=p(s ) (cid:89) p(s |s ,a )π(s ,a ) Therefore, the rewards computed with respect to g(cid:48) will not
0 t+1 t t t t
be−1foreverytimestep.Byreplayingpastexperienceswith
t=0
HER,theagentcanbetrainedwithmoresuccessfulexamples
with the state transition model p(s |s ,a ) being deter-
t+1 t t than is available in the original recorded trajectories. So far,
mined by the dynamics of the environment. The dynamics
we have only considered replaying goals from the final state
is therefore of crucial importance, as it determines the
of a trajectory. But HER is also amenable to other replay
consequencesoftheagent’sactions,aswellasthebehaviours
strategies, and we refer interested readers to the original
that can be realized.
paper [35] for more details.
A. Policy Gradient Methods
IV. METHOD
Foraparametricpolicyπ withparametersθ,theobjective
θ Our objective is to train policies that can perform a task
is to find the optimal parameters θ∗ that maximizes the under the dynamics of the real world p∗(s |s ,a ). Since
t+1 t t
expected return θ∗ = arg max J(π ). Policy gradient
θ θ sampling from the real world dynamics can be prohibitive,
methods [33] is a popular class of algorithms for learning
we instead train a policy using an approximate dynamics
parametric policies, where an estimate of the gradient of model pˆ(s |s ,a ) ≈ p∗(s |s ,a ) that is easier to
the objective (cid:79) J(π ) is used to perform gradient ascent to t+1 t t t+1 t t
θ θ samplefrom.Forallofourexperiments,pˆassumestheform
maximize the expected return. While the previous definition
of a physics simulation. Due to modeling and other forms
of a policy is suitable for tasks where the goal is common
of calibration error, behaviours that successfully accomplish
across all episodes, it can be generalized to tasks where an
a task in simulation may not be successful once deployed
agent is presented with a different goal every episode by
in the real world. Furthermore, it has been observed that
constructing a universal policy [34]. A universal policy is
DeepRLpoliciesarepronetoexploitingidiosyncrasiesofthe
a simple extension where the goal g ∈ G is provided as
simulator to realize behaviours that are infeasible in the real
an additional input to the policy π(a|s,g). The reward is
world [2], [7]. Therefore, instead of training a policy under
then also dispensed according to the goal r(s ,a ,g). In our
t t one particular dynamics model, we train a policy that can
framework, a random goal will be sampled at the start of
performataskunderavarietyofdifferentdynamicsmodels.
each episode, and held fixed over the course the episode.
First we introduce a set of dynamics parameters µ that pa-
For the pushing task, the goal specifies the target location
rameterizesthedynamicsofthesimulationpˆ(s |s ,a ,µ).
t+1 t t
for an object.
The objective is then modified to maximize the expected
return across a distribution of dynamics models ρ ,
B. Hindsight Experience Replay µ
During training, RL algorithms often benefit from care-
(cid:34) (cid:34)T−1 (cid:35)(cid:35)
(cid:88)
E E r(s ,a )
fully shaped reward functions that help guide the agent to- τ∼p(τ|π,µ) t t
wardsfulfillingtheoverallobjectiveofatask.Butdesigning
µ∼ρµ
t=0
a reward function can be challenging for more complex By training policies to adapt to variability in the dynamics
tasks,andmaybiasthepolicytowardsadoptinglessoptimal of the environment, the resulting policy might then better
behaviours. An alternative is to use a binary reward r(s,g) generalize to the dynamics of real world.
that only indicates if a goal is satisfied in a given state,
A. Tasks
(cid:40)
0, if g is satisfied in s
Our experiments are conducted on a puck pushing task
r(s,g)=
−1, otherwise usinga7-DOFFetchRoboticsarm.Imagesoftherealrobot

|     |     |     |     |     |     |     | friction,   | and       | characteristics |            | of the     | actuators). | In       | order to  |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --------- | --------------- | ---------- | ---------- | ----------- | -------- | --------- |
|     |     |     |     |     |     |     | determine   | the       | appropriate     | actions,   | a          | policy      | requires | some      |
|     |     |     |     |     |     |     | means of    | inferring | the             | underlying | dynamics   |             | of its   | environ-  |
|     |     |     |     |     |     |     | ment. While | the       | dynamics        |            | parameters | are         | readily  | available |
insimulation,thesamedoesnotholdonceapolicyhasbeen
|     |     |     |     |     |     |     | deployed | in the          | real world. |     | In the absence |        | of direct | knowl- |
| --- | --- | --- | --- | --- | --- | --- | -------- | --------------- | ----------- | --- | -------------- | ------ | --------- | ------ |
|     |     |     |     |     |     |     | edge of  | the parameters, |             | the | dynamics       | can be | inferred  | from a |
historyofpaststatesandactions.Systemidentificationusing
ahistoryofpasttrajectorieshasbeenpreviouslyexploredby
|     |     |     |     |     |     |     | Yu et al.      | [24].  | Their       | system   | incorporates | an    | online   | system    |
| --- | --- | --- | --- | --- | --- | --- | -------------- | ------ | ----------- | -------- | ------------ | ----- | -------- | --------- |
|     |     |     |     |     |     |     | identification | module |             | φ(s t ,h | t )=µˆ,      | which | utilizes | a history |
|     |     |     |     |     |     |     | of past        | states | and actions | h        | =[a          | ,s ,a | ,s       | ,...] to  |
Fig.2. Ourexperimentsareconductedona7-DOFFetchRoboticsarm. t t−1 t−1 t−2 t−2
Left:Realrobot.Right:SimulatedMuJoComodel. predictthedynamicsparametersµ.Thepredictedparameters
|               |           |              |        |          |        |            | are then         | used     | as inputs | to a               | universal | policy       | that samples | an        |
| ------------- | --------- | ------------ | ------ | -------- | ------ | ---------- | ---------------- | -------- | --------- | ------------------ | --------- | ------------ | ------------ | --------- |
| and simulated | model     | is available | in     | Figure   | 2. The | goal g for |                  |          |           |                    |           |              |              |           |
|               |           |              |        |          |        |            | action according |          | to the    | current            | state     | and inferred |              | dynamics  |
| each episode  | specifies | a random     | target | position | on     | the table  |                  |          |           |                    |           |              |              |           |
|               |           |              |        |          |        |            | π(a t |s t ,µˆ). | However, |           | this decomposition |           | requires     |              | identify- |
thatthepuckshouldbemovedto.Therewardisbinarywith
|          |             |        |         |          |     |             | ing the  | dynamics | parameters |           | of interest | to           | be predicted | at       |
| -------- | ----------- | ------ | ------- | -------- | --- | ----------- | -------- | -------- | ---------- | --------- | ----------- | ------------ | ------------ | -------- |
| r = 0 if | the puck is | within | a given | distance | of  | the target, |          |          |            |           |             |              |              |          |
| t        |             |        |         |          |     |             | runtime, | which    | may be     | difficult | for         | more complex |              | systems. |
andr =−1otherwise.Atthestartofeachepisode,thearm
t
|                |              |      |     |             |          |        | Constructing | such | a   | set of | parameters | necessarily |     | requires |
| -------------- | ------------ | ---- | --- | ----------- | -------- | ------ | ------------ | ---- | --- | ------ | ---------- | ----------- | --- | -------- |
| is initialized | to a default | pose | and | the initial | location | of the |              |      |     |        |            |             |     |          |
somestructuralassumptionsaboutthedynamicsofasystem,
| puck is randomly | placed | within | a   | fixed bound | on  | the table. |           |     |         |     |             |                |     |       |
| ---------------- | ------ | ------ | --- | ----------- | --- | ---------- | --------- | --- | ------- | --- | ----------- | -------------- | --- | ----- |
|                  |        |        |     |             |     |            | which may | not | hold in | the | real world. | Alternatively, |     | SysID |
B. State and Action canbeimplicitlyembeddedintoapolicybyusingarecurrent
|     |     |     |     |     |     |     | model π(a | |s  | ,z ,g), | where | the internal | memory | z   | =z(h ) |
| --- | --- | --- | --- | --- | --- | --- | --------- | --- | ------- | ----- | ------------ | ------ | --- | ------ |
The state is represented using the joint positions and t t t t t
velocities of the arm, the position of the gripper, as well as acts as a summary of past states and actions, thereby pro-
|     |     |     |     |     |     |     | viding a | mechanism | with | which | the | policy | can use | to infer |
| --- | --- | --- | --- | --- | --- | --- | -------- | --------- | ---- | ----- | --- | ------ | ------- | -------- |
thepuck’sposition,orientation,linearandangularvelocities.
The combined features result in a 52D state space. Actions the dynamics of the system. This model can then be trained
from the policy specify target joint angles for a position end-to-endandtherepresentationoftheinternalmemorycan
|     |     |     |     |     |     |     | be learned | without | requiring |     | manual | identification |     | of a set |
| --- | --- | --- | --- | --- | --- | --- | ---------- | ------- | --------- | --- | ------ | -------------- | --- | -------- |
controller.Targetanglesarespecifiedasrelativeoffsetsfrom
the current joint rotations. This yields a 7D action space. of dynamics parameters to be inferred at runtime.
C. Dynamics Randomization E. Recurrent Deterministic Policy Gradient
During training, rollouts are organized into episodes of a Since HER augments the original training data recorded
fixed length. At the start of each episode, a random set of from rollouts of the policy with additional data generated
dynamicsparametersµaresampledaccordingtoρ µ andheld from replayed goals, it requires off-policy learning. Deep
fixed for the duration of the episode. The parameters which Deterministic Policy Gradient (DDPG) [2] is a popular off-
we randomize include: policy algorithm for continuous control. Its extension to
Mass of each link in the robot’s body recurrent policies, Recurrent Deterministic Policy Gradient
•
Damping of each joint (RDPG) [36], provides a method to train recurrent poli-
•
• Mass, friction, and damping of the puck cies with off-policy data. To apply RDPG, we denote a
Height of the table deterministic policy as π(s ,z ,g) = a . In additional to
| •       |                  |     |            |     |     |     |             |     |           |       | t t         | t   |           |       |
| ------- | ---------------- | --- | ---------- | --- | --- | --- | ----------- | --- | --------- | ----- | ----------- | --- | --------- | ----- |
|         |                  |     |            |     |     |     | the policy, | we  | will also | model | a recurrent |     | universal | value |
| • Gains | for the position |     | controller |     |     |     |             |     |           |       |             |     |           |       |
• Timestep between actions function as Q(s ,a ,y ,g,µ), where y =y(h ) is the value
|     |     |     |     |     |     |     |     |     | t t | t   |     | t   | t   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Observation noise function’s internal memory. Since the value function is used
•
which results in a total of 95 randomized parameters. The only during training and the dynamics parameters µ of the
|          |                 |           |     |            |     |         | simulator | are      | known, | µ is provided | as          | an additional |      | input to   |
| -------- | --------------- | --------- | --- | ---------- | --- | ------- | --------- | -------- | ------ | ------------- | ----------- | ------------- | ---- | ---------- |
| timestep | between actions | specifies |     | the amount | of  | time an |           |          |        |               |             |               |      |            |
|          |                 |           |     |            |     |         | the value | function | but    | not to        | the policy. | We            | will | refer to a |
actionisappliedbeforethepolicyisqueriedagaintosample
a new action. This serves as a simple model of the latency value function with knowledge of the dynamics parameters
|           |                 |             |     |     |             |       | as an omniscient |     | critic. | This | follows | the approach |     | of [37], |
| --------- | --------------- | ----------- | --- | --- | ----------- | ----- | ---------------- | --- | ------- | ---- | ------- | ------------ | --- | -------- |
| exhibited | by the physical | controller. |     | The | observation | noise |                  |     |         |      |         |              |     |          |
models uncertainty in the sensors and is implemented as [38], where additional information is provided to the value
|                  |          |         |         |         |            |          | function   | during    | training | in    | order to  | reduce   | the variance | of      |
| ---------------- | -------- | ------- | ------- | ------- | ---------- | -------- | ---------- | --------- | -------- | ----- | --------- | -------- | ------------ | ------- |
| independent      | Gaussian | noise   | applied | to      | each state | feature. |            |           |          |       |           |          |              |         |
|                  |          |         |         |         |            |          | the policy | gradients | and      | allow | the value | function | to           | provide |
| While parameters | such     | as mass | and     | damping | are        | constant |            |           |          |       |           |          |              |         |
over the course of an episode, the action timestep and the more meaningful feedback for improving the policy.
|             |              |          |     |                |     |     | Algorithm    |     | 1 summarizes |        | the training | procedure, |       | where   |
| ----------- | ------------ | -------- | --- | -------------- | --- | --- | ------------ | --- | ------------ | ------ | ------------ | ---------- | ----- | ------- |
| observation | noise varies | randomly |     | each timestep. |     |     |              |     |              |        |              |            |       |         |
|             |              |          |     |                |     |     | M represents |     | a replay     | buffer | [2],         | and θ      | and ϕ | are the |
| D. Adaptive | Policy       |          |     |                |     |     |              |     |              |        |              |            |       |         |
parametersforthepolicyandvaluefunctionrespectively.We
Manipulationtasks,suchaspushing,haveastrongdepen- also incorporate target networks [2], but they are excluded
| dency on | the physical | properties |     | of the | system (e.g. | mass, | for brevity. |     |     |     |     |     |     |     |
| -------- | ------------ | ---------- | --- | ------ | ------------ | ----- | ------------ | --- | --- | --- | --- | --- | --- | --- |

| Algorithm |     | 1 Dynamics |     | Randomization |     | with HER | and |     |     |     |     |     |
| --------- | --- | ---------- | --- | ------------- | --- | -------- | --- | --- | --- | --- | --- | --- |
RDPG
| 1: θ | ← random | weights |     |     |     |     |     |     |     |     |     |     |
| ---- | -------- | ------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ϕ←   | random   | weights |     |     |     |     |     |     |     |     |     |     |
2:
| 3: while | not      | done     | do       |     |        |                |     |     |     |     |     |     |
| -------- | -------- | -------- | -------- | --- | ------ | -------------- | --- | --- | --- | --- | --- | --- |
|          | g ∼ρ     | sample   | goal     |     |        |                |     |     |     |     |     |     |
| 4:       | g        |          |          |     |        |                |     |     |     |     |     |     |
| 5:       | µ∼ρ      | µ sample | dynamics |     |        |                |     |     |     |     |     |     |
| 6:       | Generate | rollout  | τ =(s    | ,a  | ,...,s | )with dynamics | µ   |     |     |     |     |     |
|          |          |          |          | 0   | 0      | T              |     |     |     |     |     |     |
|          | for each | s ,a     | in τ     | do  |        |                |     |     |     |     |     |     |
| 7:       |          | t        | t        |     |        |                |     |     |     |     |     |     |
| 8:       | r ←r(s   | ,g)      |          |     |        |                |     |     |     |     |     |     |
t t
|     | end for |     |     |     |     |     |     |     |     |     |     |     |
| --- | ------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
9:
| 10: | Store  | (τ,{r t },g,µ) |       | in M   |      |     |     |     |     |     |     |     |
| --- | ------ | -------------- | ----- | ------ | ---- | --- | --- | --- | --- | --- | --- | --- |
| 11: | Sample | episode        | (τ,{r | },g,µ) | from | M   |     |     |     |     |     |     |
t
|     | with probability |     | k   |     |     |     |     |     |     |     |     |     |
| --- | ---------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
12:
| 13: | g ←    | replay | new goal | with   | HER |     |     |     |     |     |     |     |
| --- | ------ | ------ | -------- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| 14: | r ←r(s | ,g)    | for      | each t |     |     |     |     |     |     |     |     |
t t
15: endwith
|     | for each | t do |     |     |     |     |     |     |     |     |     |     |
| --- | -------- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
16:
| 17: | Compute | memories |     | z t and | y t |     |     |     |     |     |     |     |
| --- | ------- | -------- | --- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
| 18: | aˆ      | ←π (s    | ,z  | ,g)     |     |     |     |     |     |     |     |     |
t+1 θ t+1 t+1 Fig. 3. LSTM policy deployed on the Fetch arm. Bottom: The contact
aˆ ←π (s ,z ,g) dynamics of the puck was modified by attaching a packet of chips to the
| 19: | t   | θ t | t   |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
bottom.
| 20: | q ←r      | +γQ   | (s  | ,aˆ     | ,y    | ,g,µ) |     |     |     |     |     |     |
| --- | --------- | ----- | --- | ------- | ----- | ----- | --- | --- | --- | --- | --- | --- |
|     | t         | t     | ϕ   | t+1 t+1 | t+1   |       |     |     |     |     |     |     |
|     | (cid:52)q | ←q −Q | (s  | ,a ,y   | ,g,µ) |       |     |     |     |     |     |     |
21: t t ϕ t t t each hidden layer (apart from the LSTM). The output layer
22: end for of Q consists of linear units, while π consists of tanh output
|     |     | (cid:80) | ∂Qϕ(st, | a t,yt,g,µ) |     |     |     |     |     |     |     |     |
| --- | --- | -------- | ------- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- |
23: (cid:79) = 1 (cid:52)q units scaled to span the bounds of each action parameter.
|     | ϕ   | T t | t   | ∂ ϕ |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
(cid:80)
| 2 4 : | (cid:79) = | 1 ∂Q | ϕ ( st , a ˆ | t ,y t, g ,µ) | ∂ a ˆ t |     |     |     |     |     |     |     |
| ----- | ---------- | ---- | ------------ | ------------- | ------- | --- | --- | --- | --- | --- | --- | --- |
|       | θ          | T t  | ∂            | a             | ∂ θ     |     |     |     |     |     |     |     |
Up d ate v alu e fu n c ti o n a n d po l i cy with (cid:79) and (cid:79) V. EXPERIMENTS
| 2 5 : |     |     |     |     |     | θ   | ϕ   |     |     |     |     |     |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
26: end while Results are best seen in the supplemental video
|     |     |     |     |     |     |     |     | https://youtu.be/XUW0cnvqbwM. |                |     | Snapshots | of policies de-  |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------------------------- | -------------- | --- | --------- | ---------------- |
|     |     |     |     |     |     |     |     | ployed on                     | the real robot | are | available | in Figure 3. All |
simulationsareperformedusingtheMuJoCophysicsengine
| F. Network | Architecture |     |     |     |     |     |     |           |              |          |            |               |
| ---------- | ------------ | --- | --- | --- | --- | --- | --- | --------- | ------------ | -------- | ---------- | ------------- |
|            |              |     |     |     |     |     |     | [39] with | a simulation | timestep | of 0.002s. | 20 simulation |
Aschematicillustrationsofthepolicyandvaluenetworks timesteps are performed for every control timestep. Each
areavailableinFigure4.Theinputstothenetworkconsistof episode consists of 100 control timestep, corresponding to
| thecurrentstates |     | andpreviousactiona |     |     |     |     |     |     |     |     |     |     |
| ---------------- | --- | ------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
t t−1 ,andtheinternal approximately 4 seconds per episode, but may vary as a
memoryisupdatedincrementallyateverystep.Eachnetwork result of the random timesteps between actions. Table I
| consists | of a | feedforward | branch |     | and recurrent | branch, | with |             |                 |     |               |            |
| -------- | ---- | ----------- | ------ | --- | ------------- | ------- | ---- | ----------- | --------------- | --- | ------------- | ---------- |
|          |      |             |        |     |               |         |      | details the | range of values | for | each dynamics | parameter. |
the latter being tasked with inferring the dynamics from At the start of each episode, a new set of parameters µ is
past observations. The internal memory is modeled using a sampled by drawing values for each parameter from their
| layer | of LSTM | units | and is | provided | only | with information |     |     |     |     |     |     |
| ----- | ------- | ----- | ------ | -------- | ---- | ---------------- | --- | --- | --- | --- | --- | --- |
respectiverange.Parameterssuchasmass,damping,friction,
required to infer the dynamics (e.g. s and a ). The andcontrollergainsarelogarithmicallysampled,whileother
|     |     |     |     |     |     | t t−1 |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- |
recurrentbranchconsistsofanembeddinglayerof128fully-
parametersareuniformlysampled.Thetimestep(cid:52)tbetween
connected units followed by 128 LSTM units. The goal g actions varies every step according to (cid:52)t∼(cid:52)t +Exp(λ),
0
doesnotholdanyinformationregardingthedynamicsofthe where (cid:52)t = 0.04s is the default control timestep, and
0
| system, | and | is therefore | processed |     | only | by the feedforward |     |        |                   |              |      |                |
| ------- | --- | ------------ | --------- | --- | ---- | ------------------ | --- | ------ | ----------------- | ------------ | ---- | -------------- |
|         |     |              |           |     |      |                    |     | Exp(λ) | is an exponential | distribution | with | rate parameter |
branch.Furthermore,sincethecurrentstates isofparticular λ. While (cid:52)t varies every timestep, λ is fixed within each
t
| importance  | for           | determining |             | the      | appropriate | action            | for the |              |                                    |                                |             |     |
| ----------- | ------------- | ----------- | ----------- | -------- | ----------- | ----------------- | ------- | ------------ | ---------------------------------- | ------------------------------ | ----------- | --- |
|             |               |             |             |          |             |                   |         | Parameter    |                                    |                                | Range       |     |
| current     | timestep,     | a           | copy        | is also  | provided    | as input          | to the  |              |                                    |                                |             |     |
|             |               |             |             |          |             |                   |         | LinkMass     |                                    | [0.25,4]×defaultmassofeachlink |             |     |
| feedforward |               | branch.     | This        | presents | subsequent  | layers            | with    |              |                                    |                                |             |     |
|             |               |             |             |          |             |                   |         | JointDamping | [0.2,20]×defaultdampingofeachjoint |                                |             |     |
| more        | direct access | to          | the current |          | state,      | without requiring | in-     |              |                                    |                                |             |     |
|             |               |             |             |          |             |                   |         | PuckMass     |                                    |                                | [0.1,0.4]kg |     |
formationtofilterthroughtheLSTM.Thefeaturescomputed PuckFriction [0.1,5]
[0.01,0.2]Ns/m
| by both | branches | are | then | concatenated |     | and processed | by  | 2 PuckDamping |     |     |              |     |
| ------- | -------- | --- | ---- | ------------ | --- | ------------- | --- | ------------- | --- | --- | ------------ | --- |
|         |          |     |      |              |     |               |     | TableHeight   |     |     | [0.73,0.77]m |     |
additionalfully-connectedlayersof128unitseach.Thevalue ControllerGains [0.5,2]×defaultgains
network Q(s ,a ,a ,g,µ) follows a similar architecture, ActionTimestepλ [125,1000]s−1
t t t−1
| with | the query | action | a and | parameters |     | µ being processed |     |     |     |        |     |     |
| ---- | --------- | ------ | ----- | ---------- | --- | ----------------- | --- | --- | --- | ------ | --- | --- |
|      |           |        | t     |            |     |                   |     |     |     | TABLEI |     |     |
by the feedforward branch. ReLU activations are used after DYNAMICSPARAMETERSANDTHEIRRESPECTIVERANGES.

consistsof200timesteps.Littlecalibrationwasperformedto
ensurethatthebehaviourofthesimulationcloselyconforms
to that of the real robot. While more extensive calibration
will likely improve performance, we show that our policy
is nonetheless able to adapt to the physical system despite
poor calibration. To illustrate the discrepancies between the
dynamics of the real world and simulation we executed the
same target trajectory on the real and simulated robot, and
recorded the resulting joint trajectories. Figure 5 illustrates
the recorded trajectories. Given the same target trajectory,
the pose trajectories of the simulated and real robot differ
significantly,withvaryingdegreesofmismatchacrossjoints.
During training, parameter updates are performed using
the ADAM optimizer [40] with a stepsize of 5×10−4 for
both the policy and value function. Updates are performed
using batches of 128 episodes with 100 steps per episode.
NewgoalsaresampledusingHERwithaprobabilityofk =
0.8. Each policy is trained for approximately 8000 update
iterations using about 100 million samples, which requires
approximately 8 hours to simulate on a 100 core cluster.
Fig. 4. Schematic illustrations of the policy network (top), and value
network(bottom).Featuresthatarerelevantforinferringthedynamicsof
theenvironmentareprocessedbytherecurrentbranch,whiletheotherinputs A. Comparison of Architectures
areprocessedbythefeedforwardbranch.
To evaluate the impact of different architectural choices,
episode. In addition to randomizing the physical properties
we compared policies modeled using different architectures
of the simulated environment, we also simulate sensor noise
and tested their performance in simulation and on the real
by applying gaussian noise to the observed state features at
robot.ThefirstisanLSTMpolicyfollowingthearchitecture
every step. The noise has a mean of zero and a standard
illustrated in Figure 4. Next we consider a memoryless
deviation of 5% of the running standard deviation of each
feedforwardnetwork(FF)thatreceivesonlythecurrentstate
feature. Gaussian action exploration noise is added at every
s and goal g as input. As a baseline, we also trained
t
step with a standard deviation of 0.01rad.
a memoryless feedforward network without randomization
The real puck has a mass of approximately 0.2kg and (FF no Rand), then evaluated the performance with ran-
a radius of 0.065m. The goal is considered satisfied if the domization. To provide the feedforward network with more
puck is within 0.07m of the target. The location of the information to infer the dynamics, we augmented the inputs
puck is tracked using the PhaseSpace mocap system. When withahistoryofthe8previouslyobservedstatesandactions
evaluatingperformanceonthephysicalsystem,eachepisode (FF+ Hist). Thesuccess rateis determinedas theportion of
episodeswherethegoalisfulfilledattheendoftheepisode.
In simulation, performance of each policy is evaluated over
100 episodes, with randomized dynamics parameters for
each episode. Learning curves comparing the performance
of different model architectures in simulation are available
in Figure 6. Four policies initialized with different random
seeds are trained for each architecture. The LSTM learns
faster while also converging to a higher success rate than
Fig.5. Jointtrajectoriesrecordedfromthesimulatedandrealrobotwhen
Fig. 6. Learning curves of different network architectures. Four policies
executingthesametargettrajectories.Thejointscorrespondtotheshoulder,
aretrainedforeacharchitecturewithdifferentrandomseeds.Performance
elbow,andwristoftheFetcharm.
isevaluatedover100episodesinsimulationwithrandomdynamics.

|     |     |     |     |     | Model    |     | Success(Sim) |     | Success(Real) | Trials(Real) |
| --- | --- | --- | --- | --- | -------- | --- | ------------ | --- | ------------- | ------------ |
|     |     |     |     |     | LSTM     |     | 0.91±0.03    |     | 0.89±0.06     | 28           |
|     |     |     |     |     | FFnoRand |     | 0.51±0.05    |     | 0.0±0.0       | 10           |
|     |     |     |     |     | FF       |     | 0.83±0.04    |     | 0.67±0.14     | 12           |
|     |     |     |     |     | FF+Hist  |     | 0.87±0.03    |     | 0.70±0.10     | 20           |
TABLEII
PERFORMANCEOFTHEPOLICIESWHENDEPLOYEDONTHESIMULATED
ANDREALROBOT.PERFORMANCEINSIMULATIONISEVALUATEDOVER
100TRIALSWITHRANDOMIZEDDYNAMICSPARAMETERS.
|     |     |     |     |     |     | Model |     |           | Success | Trials |
| --- | --- | --- | --- | --- | --- | ----- | --- | --------- | ------- | ------ |
|     |     |     |     |     |     | all   |     | 0.89±0.06 |         | 28     |
Fig.7. Performanceofdifferentmodelswhendeployedonthesimulated
andrealrobotforthepushingtask.Policiesaretrainedusingonlydatafrom fixedactiontimestep 0.29±0.11 17
| simulation. |     |     |     |     |     | noobservationnoise |     |     | 0.25±0.12 | 12  |
| ----------- | --- | --- | --- | --- | --- | ------------------ | --- | --- | --------- | --- |
|             |     |     |     |     |     | fixedlinkmass      |     |     | 0.64±0.10 | 22  |
the feedforward models. The feedforward network trained fixedpuckfriction 0.48±0.10 27
without randomization is unable to cope with unfamiliar TABLEIII
| dynamics | during evaluation. | While | training a | memoryless |     |     |     |     |     |     |
| -------- | ------------------ | ----- | ---------- | ---------- | --- | --- | --- | --- | --- | --- |
PERFORMANCEOFLSTMPOLICIESONTHEREALROBOT,WHERETHE
policy with randomization improves robustness to random POLICIESARETRAINEDWITHSUBSETSOFPARAMETERSHELDFIXED.
| dynamics, | it is still unable | to perform | the task | consistently. |     |     |     |     |     |     |
| --------- | ------------------ | ---------- | -------- | ------------- | --- | --- | --- | --- | --- | --- |
Next,weevaluatetheperformanceofthedifferentmodels also develops clever strategies to make fine adjustments to
when deployed on the real Fetch arm. Figure 7 compares position the puck over the target. One such strategy involves
the performance of the final policies when deployed in pressing on one side of the puck in order to partially upend
simulation and the real world. Table II summarizes the it before sliding it to the target. Other strategies including
performance of the models. The target and initial location manipulatingthepuckfromthetoporsidesdependingonthe
|     |     |     | 0.3m | × 0.3m |     |     |     |     |     |     |
| --- | --- | --- | ---- | ------ | --- | --- | --- | --- | --- | --- |
of the puck is randomly placed within a requiredadjustments,andcorrectingforcasewherethepuck
bound. While the performance of LSTM and FF + Hist overshoots the target. These behaviours emerged naturally
policies are comparable in simulation, the LSTM is able to fromthelearningprocessusingonlyasparsebinaryreward.
bettergeneralizetothedynamicsofthephysicalsystem.The
|     |     |     |     |     |     |     | VI. | CONCLUSIONS |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | --- | --- |
feedforwardnetworktrainedwithoutrandomizationisunable
to perform the task under the real world dynamics. We demonstrated the use of dynamics randomization
|     |     |     |     |     | to train | recurrent | policies | that | are capable | of adapting |
| --- | --- | --- | --- | --- | -------- | --------- | -------- | ---- | ----------- | ----------- |
B. Ablation
|     |     |     |     |     | to unfamiliar | dynamics |     | at runtime. | Training | policies with |
| --- | --- | --- | --- | --- | ------------- | -------- | --- | ----------- | -------- | ------------- |
To evaluate the effects of randomizing the various dy- randomized dynamics in simulation enables the resulting
namics parameters, we trained policies with subsets of the policies to be deployed directly on a physical robot despite
parameters held fixed. A complete list of the dynamics poor calibrations. By training exclusively in simulation, we
parameters are available in Table I. The configurations we are able to leverage simulators to generate a large volume
consider include training with a fixed timestep between of training data, thereby enabling us to use powerful RL
actions, training without observation noise, or with fixed techniques that are not yet feasible to apply directly on a
mass for each link. Table III summarizes the performance physical system. Our experiments with a real world pushing
of the resulting policies when deployed on the real robot. tasks showed comparable performance to simulation and the
Disabling randomization of the action timestep, observation ability to adapt to changes in contact dynamics. We also
noise, link mass, and friction impairs the policies’ ability to evaluated the importance of design decisions pertaining to
adapt to the physical environment. Policies trained without choices of architecture and parameters which to randomize
randomizing the action timestep and observation noise show during training. We intend to extend this work to a richer
particularly noticeable drops in performance. This suggests repertoire tasks and incorporate more modalities such as
thatcopingwiththelatencyofthecontrollerandsensornoise vision. We hope this approach will open more opportunities
are important factors in adapting to the physical system. fordevelopingskillfulagentsinsimulationthatarethenable
|     |     |     |     |     | to be | deployed | in the physical |     | world. |     |
| --- | --- | --- | --- | --- | ----- | -------- | --------------- | --- | ------ | --- |
C. Robustness
|     |     |     |     |     |     |     | VII. ACKNOWLEDGEMENT |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | -------------------- | --- | --- | --- |
ToevaluatetherobustnessoftheLSTMpolicytodifferent
dynamicswhendeployedontherealrobot,weexperimented WewouldliketothankAnkurHanda,VikashKumar,Bob
with changing the contact dynamics of the physical system McGrew, Matthias Plappert, Alex Ray, Jonas Schneider, and
by attaching a packet of chips to the bottom of the puck. PeterWelinderfortheirsupportandfeedbackonthisproject.
| The texture | of the bag | reduces the | friction between | the puck |     |     |     |     |     |     |
| ----------- | ---------- | ----------- | ---------------- | -------- | --- | --- | --- | --- | --- | --- |
REFERENCES
| and the table, | while the | contents | of the bag further | alters the |     |     |     |     |     |     |
| -------------- | --------- | -------- | ------------------ | ---------- | --- | --- | --- | --- | --- | --- |
contact dynamics. Nonetheless, the LSTM policy achieves [1] V. Mnih, K. Kavukcuoglu, D. Silver, A. A. Rusu, J. Veness,
|           |                    |       |               |        | M.  | G. Bellemare, | A.           | Graves, | M. Riedmiller, | A. K. Fidjeland,      |
| --------- | ------------------ | ----- | ------------- | ------ | --- | ------------- | ------------ | ------- | -------------- | --------------------- |
| a success | rate of 0.91±0.04, | which | is comparable | to the |     |               |              |         |                |                       |
|           |                    |       |               |        | G.  | Ostrovski,    | S. Petersen, | C.      | Beattie, A.    | Sadik, I. Antonoglou, |
success rate without the attachment 0.89±0.06. The policy H. King, D. Kumaran, D. Wierstra, S. Legg, and D. Hassabis,

“Human-level control through deep reinforcement learning,” Nature, with deep q-learning,” CoRR, vol. abs/1609.03759, 2016. [Online].
vol. 518, no. 7540, pp. 529–533, 02 2015. [Online]. Available: Available:http://arxiv.org/abs/1609.03759
http://dx.doi.org/10.1038/nature14236 [21] I. Mordatch, K. Lowrey, and E. Todorov, “Ensemble-cio: Full-body
[2] T. P. Lillicrap, J. J. Hunt, A. Pritzel, N. Heess, T. Erez, dynamic motion planning that transfers to physical humanoids,”
Y. Tassa, D. Silver, and D. Wierstra, “Continuous control with deep in 2015 IEEE/RSJ International Conference on Intelligent Robots
reinforcement learning,” CoRR, vol. abs/1509.02971, 2015. [Online]. and Systems, IROS 2015, Hamburg, Germany, September 28
Available:http://arxiv.org/abs/1509.02971 - October 2, 2015, 2015, pp. 5307–5314. [Online]. Available:
[3] Y. Duan, X. Chen, R. Houthooft, J. Schulman, and P. Abbeel, https://doi.org/10.1109/IROS.2015.7354126
“Benchmarking deep reinforcement learning for continuous control,” [22] A. Rajeswaran, S. Ghotra, S. Levine, and B. Ravindran, “Epopt:
|       |                      |     |     |                 |            |     |               | Learning | robust | neural | network | policies | using | model ensembles,” |     |
| ----- | -------------------- | --- | --- | --------------- | ---------- | --- | ------------- | -------- | ------ | ------ | ------- | -------- | ----- | ----------------- | --- |
| CoRR, | vol. abs/1604.06778, |     |     | 2016. [Online]. | Available: |     | http://arxiv. |          |        |        |         |          |       |                   |     |
org/abs/1604.06778 CoRR, vol. abs/1610.01283, 2016. [Online]. Available: http://arxiv.
[4] X.B.Peng,G.Berseth,andM.vandePanne,“Terrain-adaptiveloco- org/abs/1610.01283
motion skills using deep reinforcement learning,” ACM Transactions [23] L. Pinto, J. Davidson, R. Sukthankar, and A. Gupta, “Robust
|     |     |     |     |     |     |     |     | adversarial | reinforcement |     | learning,” | CoRR, | vol. | abs/1703.02702, |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | ------------- | --- | ---------- | ----- | ---- | --------------- | --- |
onGraphics(Proc.SIGGRAPH2016),vol.35,no.4,2016.
2017.[Online].Available:http://arxiv.org/abs/1703.02702
| [5] X. B. | Peng, G.   | Berseth, | K. Yin, | and                | M. van de | Panne, | “Deeploco:    |                                                              |     |     |     |     |     |     |     |
| --------- | ---------- | -------- | ------- | ------------------ | --------- | ------ | ------------- | ------------------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- |
|           |            |          |         |                    |           |        |               | [24] W.Yu,C.K.Liu,andG.Turk,“Preparingfortheunknown:Learning |     |     |     |     |     |     |     |
| Dynamic   | locomotion |          | skills  | using hierarchical |           | deep   | reinforcement |                                                              |     |     |     |     |     |     |     |
learning,” ACM Transactions on Graphics (Proc. SIGGRAPH 2017), a universal policy with online system identification,” CoRR, vol.
vol.36,no.4,2017. abs/1702.02453, 2017. [Online]. Available: http://arxiv.org/abs/1702.
02453
| [6] L. Liu | and J. | Hodgins, | “Learning | to  | schedule | control | fragments for |                   |     |              |           |     |            |                |     |
| ---------- | ------ | -------- | --------- | --- | -------- | ------- | ------------- | ----------------- | --- | ------------ | --------- | --- | ---------- | -------------- | --- |
|            |        |          |           |     |          |         |               | [25] R. Antonova, |     | S. Cruciani, | C. Smith, | and | D. Kragic, | “Reinforcement |     |
physics-basedcharactersusingdeepq-learning,”ACMTrans.Graph.,
|      |         |        |             |      |       |           |            | learning | for | pivoting | task,” | CoRR, | vol. abs/1703.00472, |     | 2017. |
| ---- | ------- | ------ | ----------- | ---- | ----- | --------- | ---------- | -------- | --- | -------- | ------ | ----- | -------------------- | --- | ----- |
| vol. | 36, no. | 3, pp. | 29:1–29:14, | Jun. | 2017. | [Online]. | Available: |          |     |          |        |       |                      |     |       |
[Online].Available:http://arxiv.org/abs/1703.00472
http://doi.acm.org/10.1145/3083723
|     |     |     |     |     |     |     |     | [26] K.Yu,M.Bauza´,N.Fazeli,andA.Rodriguez,“Morethanamillion |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- |
[7] N. Heess, D. TB, S. Sriram, J. Lemmon, J. Merel, G. Wayne, ways to be pushed: A high-fidelity experimental data set of planar
| Y. Tassa, | T.         | Erez, Z.   | Wang, | S. M.         | A. Eslami, | M. A.      | Riedmiller, |           |       |      |                 |     |                 |     |            |
| --------- | ---------- | ---------- | ----- | ------------- | ---------- | ---------- | ----------- | --------- | ----- | ---- | --------------- | --- | --------------- | --- | ---------- |
|           |            |            |       |               |            |            |             | pushing,” | CoRR, | vol. | abs/1604.04038, |     | 2016. [Online]. |     | Available: |
| and       | D. Silver, | “Emergence |       | of locomotion |            | behaviours | in rich     |           |       |      |                 |     |                 |     |            |
http://arxiv.org/abs/1604.04038
environments,”CoRR,vol.abs/1707.02286,2017.[Online].Available:
|     |     |     |     |     |     |     |     | [27] K.M.LynchandM.T.Mason,“Stablepushing:Mechanics,controlla- |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | -------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
http://arxiv.org/abs/1707.02286
bility,andplanning,”TheInternationalJournalofRoboticsResearch,
[8] S. Levine, N. Wagener, and P. Abbeel, “Learning contact- vol.15,no.6,pp.533–556,1996.
| rich            | manipulation | skills | with      | guided     | policy                     | search,” | CoRR, vol. |                                                                   |     |             |         |      |             |     |            |
| --------------- | ------------ | ------ | --------- | ---------- | -------------------------- | -------- | ---------- | ----------------------------------------------------------------- | --- | ----------- | ------- | ---- | ----------- | --- | ---------- |
|                 |              |        |           |            |                            |          |            | [28] M.DogarandS.Srinivasa,“Aframeworkforpush-graspinginclutter,” |     |             |         |      |             |     |            |
| abs/1501.05611, |              | 2015.  | [Online]. | Available: | http://arxiv.org/abs/1501. |          |            |                                                                   |     |             |         |      |             |     |            |
|                 |              |        |           |            |                            |          |            | in Robotics:                                                      |     | Science and | Systems | VII. | Pittsburgh, | PA: | MIT Press, |
05611
July2011.
| [9] S. Levine, | C.  | Finn, T. | Darrell, | and P. | Abbeel, | “End-to-end | training |                                                                |     |     |     |     |     |     |     |
| -------------- | --- | -------- | -------- | ------ | ------- | ----------- | -------- | -------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
|                |     |          |          |        |         |             |          | [29] N.Fazeli,R.Kolbert,R.Tedrake,andA.Rodriguez,“Parameterand |     |     |     |     |     |     |     |
of deep visuomotor policies,” CoRR, vol. abs/1504.00702, 2015. contact force estimation of planar rigid-bodies undergoing frictional
[Online].Available:http://arxiv.org/abs/1504.00702 contact,”TheInternationalJournalofRoboticsResearch,vol.0,no.0,
[10] S. Levine, P. Pastor, A. Krizhevsky, and D. Quillen, “Learning p.0278364917698749,2016.
| hand-eye | coordination |     | for | robotic | grasping | with deep | learning |                |     |              |         |           |         |     |           |
| -------- | ------------ | --- | --- | ------- | -------- | --------- | -------- | -------------- | --- | ------------ | ------- | --------- | ------- | --- | --------- |
|          |              |     |     |         |          |           |          | [30] S. Akella | and | M. T. Mason, | “Posing | polygonal | objects | in  | the plane |
and large-scale data collection,” CoRR, vol. abs/1603.02199, 2016. bypushing,”TheInternationalJournalofRoboticsResearch,vol.17,
| [Online].Available:http://arxiv.org/abs/1603.02199 |     |     |     |     |     |     |     | no.1,pp.70–88,1998. |     |     |     |     |     |     |     |
| -------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | ------------------- | --- | --- | --- | --- | --- | --- | --- |
[11] E. Tzeng, C. Devin, J. Hoffman, C. Finn, X. Peng, S. Levine, [31] C. Finn, I. J. Goodfellow, and S. Levine, “Unsupervised learning
K.Saenko,andT.Darrell,“Adaptingdeepvisuomotorrepresentations for physical interaction through video prediction,” CoRR, vol.
| with                                               | weak pairwise | constraints,” |     | CoRR, | vol. abs/1511.07111, |     | 2015. |                 |     |       |           |            |                            |     |     |
| -------------------------------------------------- | ------------- | ------------- | --- | ----- | -------------------- | --- | ----- | --------------- | --- | ----- | --------- | ---------- | -------------------------- | --- | --- |
|                                                    |               |               |     |       |                      |     |       | abs/1605.07157, |     | 2016. | [Online]. | Available: | http://arxiv.org/abs/1605. |     |     |
| [Online].Available:http://arxiv.org/abs/1511.07111 |               |               |     |       |                      |     |       | 07157           |     |       |           |            |                            |     |     |
[12] Y. Ganin, E. Ustinova, H. Ajakan, P. Germain, H. Larochelle, [32] D.H.IgnasiClaveraandP.Abbeel,“Policytransferviamodularity,”
| F. Laviolette, |     | M. Marchand, |     | and V. Lempitsky, |     | “Domain-adversarial |     | inIROS. | IEEE,2017. |     |     |     |     |     |     |
| -------------- | --- | ------------ | --- | ----------------- | --- | ------------------- | --- | ------- | ---------- | --- | --- | --- | --- | --- | --- |
training of neural networks,” J. Mach. Learn. Res., vol. 17, [33] R.S.Sutton,D.Mcallester,S.Singh,andY.Mansour,“Policygradient
no. 1, pp. 2096–2030, Jan. 2016. [Online]. Available: http: methods forreinforcement learning withfunction approximation,” in
//dl.acm.org/citation.cfm?id=2946645.2946704 In Advances in Neural Information Processing Systems 12. MIT
[13] A. Gupta, C. Devin, Y. Liu, P. Abbeel, and S. Levine, “Learning Press,2000,pp.1057–1063.
invariant feature spaces to transfer skills with reinforcement [34] T. Schaul, D. Horgan, K. Gregor, and D. Silver, “Universal value
learning,” CoRR, vol. abs/1703.02949, 2017. [Online]. Available: function approximators,” in Proceedings of the 32nd International
http://arxiv.org/abs/1703.02949 Conference on Machine Learning, ser. Proceedings of Machine
|     |     |     |     |     |     |     |     | Learning | Research, | F.  | Bach and | D.  | Blei, Eds., | vol. | 37. Lille, |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | --------- | --- | -------- | --- | ----------- | ---- | ---------- |
[14] S.Daftry,J.A.Bagnell,andM.Hebert,“Learningtransferablepolicies
for monocular reactive MAV control,” CoRR, vol. abs/1608.00627, France:PMLR,07–09Jul2015,pp.1312–1320.[Online].Available:
2016.[Online].Available:http://arxiv.org/abs/1608.00627 http://proceedings.mlr.press/v37/schaul15.html
[15] M. Wulfmeier, I. Posner, and P. Abbeel, “Mutual alignment transfer [35] M.Andrychowicz,F.Wolski,A.Ray,J.Schneider,R.Fong,P.Welin-
learning,” CoRR, vol. abs/1707.07907, 2017. [Online]. Available: der, B. McGrew, J. Tobin, P. Abbeel, and W. Zaremba, “Hindsight
|     |     |     |     |     |     |     |     | experience | replay,” | in  | Advances | in Neural | Information |     | Processing |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | -------- | --- | -------- | --------- | ----------- | --- | ---------- |
http://arxiv.org/abs/1707.07907
Systems,2017.
| [16] A. A. | Rusu,       | M. Vecerik,  |     | T. Rotho¨rl, | N.       | Heess, | R. Pascanu, |                |     |          |                  |     |            |               |     |
| ---------- | ----------- | ------------ | --- | ------------ | -------- | ------ | ----------- | -------------- | --- | -------- | ---------------- | --- | ---------- | ------------- | --- |
|            |             |              |     |              |          |        |             | [36] N. Heess, | J.  | J. Hunt, | T. P. Lillicrap, | and | D. Silver, | “Memory-based |     |
| and        | R. Hadsell, | “Sim-to-real |     | robot        | learning | from   | pixels with |                |     |          |                  |     |            |               |     |
progressive nets,” CoRR, vol. abs/1610.04286, 2016. [Online]. control with recurrent neural networks,” CoRR, vol. abs/1512.04455,
Available:http://arxiv.org/abs/1610.04286 2015.[Online].Available:http://arxiv.org/abs/1512.04455
|                     |            |          |              |              |               |         |               | [37] J. N. | Foerster, | Y. M.       | Assael,         | N. de | Freitas,        | and S.        | Whiteson,  |
| ------------------- | ---------- | -------- | ------------ | ------------ | ------------- | ------- | ------------- | ---------- | --------- | ----------- | --------------- | ----- | --------------- | ------------- | ---------- |
| [17] P. Christiano, |            | Z. Shah, | I. Mordatch, |              | J. Schneider, | T.      | Blackwell,    |            |           |             |                 |       |                 |               |            |
|                     |            |          |              |              |               |         |               | “Learning  | to        | communicate | with            | deep  | multi-agent     | reinforcement |            |
| J. Tobin,           | P. Abbeel, |          | and W.       | Zaremba,     | “Transfer     | from    | simulation to |            |           |             |                 |       |                 |               |            |
|                     |            |          |              |              |               |         |               | learning,” | CoRR,     | vol.        | abs/1605.06676, |       | 2016. [Online]. |               | Available: |
| real world          | through    | learning |              | deep inverse | dynamics      | model,” | CoRR,         |            |           |             |                 |       |                 |               |            |
vol. abs/1610.03518, 2016. [Online]. Available: http://arxiv.org/abs/ http://arxiv.org/abs/1605.06676
1610.03518 [38] R. Lowe, Y. Wu, A. Tamar, J. Harb, P. Abbeel, and
|                 |      |            |          |                      |              |       |                | I. Mordatch, |     | “Multi-agent   | actor-critic |      | for mixed       | cooperative- |       |
| --------------- | ---- | ---------- | -------- | -------------------- | ------------ | ----- | -------------- | ------------ | --- | -------------- | ------------ | ---- | --------------- | ------------ | ----- |
| [18] F. Sadeghi | and  | S. Levine, | “Cad2rl: | Real                 | single-image |       | flight without |              |     |                |              |      |                 |              |       |
|                 |      |            |          |                      |              |       |                | competitive  |     | environments,” | CoRR,        | vol. | abs/1706.02275, |              | 2017. |
| a single        | real | image,”    | CoRR,    | vol. abs/1611.04201, |              | 2016. | [Online].      |              |     |                |              |      |                 |              |       |
[Online].Available:http://arxiv.org/abs/1706.02275
Available:http://arxiv.org/abs/1611.04201
|     |     |     |     |     |     |     |     | [39] E. Todorov, |     | T. Erez, | and Y. Tassa, | “Mujoco: | A   | physics | engine for |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------------- | --- | -------- | ------------- | -------- | --- | ------- | ---------- |
[19] J.Tobin,R.Fong,A.Ray,J.Schneider,W.Zaremba,andP.Abbeel, model-basedcontrol.”inIROS. IEEE,2012,pp.5026–5033.
“Domain randomization for transferring deep neural networks from [40] D. P. Kingma and J. Ba, “Adam: A method for stochastic
| simulation | to  | the real | world,” | CoRR, | vol. abs/1703.06907, |     | 2017. |                |     |       |                     |     |                 |     |            |
| ---------- | --- | -------- | ------- | ----- | -------------------- | --- | ----- | -------------- | --- | ----- | ------------------- | --- | --------------- | --- | ---------- |
|            |     |          |         |       |                      |     |       | optimization,” |     | CoRR, | vol. abs/1412.6980, |     | 2014. [Online]. |     | Available: |
[Online].Available:http://arxiv.org/abs/1703.06907
http://arxiv.org/abs/1412.6980
| [20] S. James | and | E. Johns, | “3d | simulation | for | robot | arm control |     |     |     |     |     |     |     |     |
| ------------- | --- | --------- | --- | ---------- | --- | ----- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- |
