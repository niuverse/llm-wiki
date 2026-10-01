Closing the Sim-to-Real Loop:
Adapting Simulation Randomization with Real World Experience
Yevgen Chebotar1,2 Ankur Handa1 Viktor Makoviychuk1
Miles Macklin1,3 Jan Issac1 Nathan Ratliff1 Dieter Fox1,4
Fig.1.Policiesforopeningacabinetdrawerandswing-peg-in-holetaskstrainedbyalternativelyperformingreinforcementlearningwithmultipleagents
insimulationandupdatingsimulationparameterdistributionusingafewrealworldpolicyexecutions.
Abstract—We consider the problem of transferring policies therealworldtransferinarangeofrecentworks[6,7,8,9].
to the real world by training on a distribution of simulated However, design of the appropriate simulation parameter
scenarios. Rather than manually tuning the randomization of
distributions remains a tedious task and often requires a
simulations, we adapt the simulation parameter distribution
substantial expert knowledge. Moreover, there are no guar-
usingafewrealworldroll-outsinterleavedwithpolicytraining.
Indoingso,weareabletochangethedistributionofsimulations antees that the applied randomization would actually lead to
toimprovethepolicytransferbymatchingthepolicybehavior a sensible real world policy as the design choices made in
insimulationandtherealworld.Weshowthatpoliciestrained randomizing the parameters tend to be somewhat biased by
withourmethodareabletoreliablytransfertodifferentrobots
the expertise of the practitioner. In this work, we apply a
intworealworldtasks:swing-peg-in-holeandopeningacabinet
data-driven approach and use real world data to adapt sim-
drawer.Thevideoofourexperimentscanbefoundathttps:
//sites.google.com/view/simopt. ulation randomization such that the behavior of the policies
trained in simulation better matches their behavior in the
I. INTRODUCTION
real world. Therefore, starting with some initial distribution
Learning continuous control in real world complex en-
of the simulation parameters, we can perform learning in
vironments has seen a wide interest in the past few years
simulation and use real world roll-outs of learned policies
and in particular focusing on learning policies in simula-
to gradually change the simulation randomization such that
tors and transferring them to the real world, as we still
the learned policies transfer better to the real world without
struggle with finding ways to acquire the necessary amount
requiring the exact replication of the real world scene in
of experience and data in the real world directly. While
simulation. This approach falls into the domain of model-
there have been recent attempts on learning by collecting
based reinforcement learning. However, we leverage recent
large scale data directly on real robots [1, 2, 3, 4], such an
developments in physics simulations to provide a strong
approach still remains challenging as collecting real world
prior of the world model in order to accelerate the learning
data is prohibitively laborious and expensive. Simulators
process. Our system uses partial observations of the real
offer several advantages, e.g. they can run faster than real-
world and only needs to compute rewards in simulation,
time and allow for acquiring large diversity of training data.
therefore lifting the requirement for full state knowledge or
However, due to the imprecise simulation models and lack
reward instrumentation in the real world.
of high fidelity replication of real world scenes, policies
learned in simulations often cannot be directly applied on II. RELATEDWORK
real world systems, a phenomenon also known as the reality
The problem of finding accurate models of the robot and
gap [5]. In this work, we focus on closing the reality gap by
theenvironmentthatcanfacilitatethedesignofroboticcon-
learning policies on distributions of simulated scenarios that
trollers in the real world dates back to the original works on
are optimized for a better policy transfer.
systemidentification[10,11].Inthecontextofreinforcement
Training policies on a large diversity of simulated sce-
learning(RL),model-basedRLexploredoptimizingpolicies
narios by randomizing relevant parameters, also known as
using learned models [12]. In [13, 14], the data from real
domainrandomization,hasshownaconsiderablepromisefor
worldpolicyexecutionsisusedtofitaprobabilisticdynamics
1NVIDIA,USA model, which is then used for learning an optimal policy.
2UniversityofSouthernCalifornia,LosAngeles,CA,USA Although our work follows the general principle of model-
3UniversityofCopenhagen,Copenhagen,Denmark
based reinforcement learning, we aim at using a simulation
4UniversityofWashington,Seattle,WA,USA
engine as a form of parameterized model that can help us to
@ychebota@usc.edu,{ahanda,vmakoviychuk,
mmacklin,jissac,nratliff,dieterf}@nvidia.com embed prior knowledge about the world.
9102
raM
5
]OR.sc[
4v78650.0181:viXra

Overcoming the discrepancy between simulated models world dynamics might not be feasible, however a suitable
and the real world has been addressed through identifying randomization of the simulated scenarios can still lead to
simulation parameters [15], finding common feature rep- a successful policy transfer. In addition, our approach does
resentations of real and synthetic data [16], using genera- not require estimating the reward in the real world, which
tive models to make synthetic images more realistic [17], might be challenging if some of the reward components
fine-tuning the policies trained in simulation in the real can not be observed. [32] and [33] consider grounding the
world [18], learning inverse dynamics models [19], multi- simulator using real world data. However, [32] requires a
objective optimization of task fitness and transferability to human in the loop to select the best simulation parameters,
the real world [20], training on ensembles of dynamics and [33] needs to fit additional models for the real robot
models [21] and training on a large variety of simulated forward dynamics and simulator inverse dynamics. Finally,
scenarios [6]. Domain randomization of textures was used our work is closest to the adaptive EPOpt framework of
in [7] to learn to fly a real quadcopter by training an image Rajeswaran et al. [34], which optimizes a policy over an
|     |     |     |     |     | et  | al. |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
based policy entirely in simulation. Peng [22] use ensemble of models and adapts the model distribution using
randomization of physical parameters of the scene to learn a datafromthetargetdomain.EPOptoptimizesarisk-sensitive
policyinsimulationandtransferittoarealrobotforpushing objective to obtain robust policies, whereas we optimize
a puck to a target position. In [9], randomization of physical the average performance which is a risk-neutral objective.
properties and object appearance is used to train a dexterous Additionally, EPOpt updates the model distribution by em-
robotichandtoperformin-handmanipulation.Yuetal.[23] ploying Bayesian inference with a particle filter, whereas
propose to not only train a policy on a distribution of simu- we update the model distribution using an iterative KL-
latedparameters,butalsolearnacomponentthatpredictsthe divergence constrained procedure. More importantly, they
system parameters from the current states and actions, and focus on simulated environments while in our work, we
use the prediction as an additional input to the policy. In develop an approach that is shown to work in the real world
[24],anupperconfidenceboundontheestimatedsimulation and apply it to two real robot tasks.
| optimization | bias is     | used           | as a stopping |         | criterion | for a        | robust |               |                           |     |     |     |     |
| ------------ | ----------- | -------------- | ------------- | ------- | --------- | ------------ | ------ | ------------- | ------------------------- | --- | --- | --- | --- |
|              |             |                |               |         |           |              |        | III.          | CLOSINGTHESIM-TO-REALLOOP |     |     |     |     |
| training     | with domain | randomization. |               | In      | [25],     | an auxiliary |        |               |                           |     |     |     |     |
|              |             |                |               |         |           |              |        | A. Simulation | randomization             |     |     |     |     |
| reward is    | used to     | encourage      | policies      | trained | in        | source       | and    |               |                           |     |     |     |     |
target environments to visit the same states. LetM=(S,A,P,R,p ,γ,T)beafinite-horizonMarkov
0
Combination of system identification and dynamics ran- DecisionProcess(MDP),whereS andAarestateandaction
→R
domization has been used in the past to learn locomotion spaces, P :S×A×S + is a state-transition probability
for a real quadruped [26], non-prehensile object manipula- function or probabilistic system dynamics, R : S×A → R
|     |     |     |     |     |     |     |     | a reward function, |     | p :S | →R  | an initial | state distribution, |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------ | --- | ---- | --- | ---------- | ------------------- |
tion [27] and in-hand object pivoting [28]. In our work, we 0 +
recognize domain randomization and system identification γ a reward discount factor, and T a fixed horizon. Let τ =
as powerful tools for training general policies in simulation. (s ,a ,...,s ,a ) be a trajectory of states and actions and
|     |     |     |     |     |     |     |     | 0 0       | T     | T   |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --------- | ----- | --- | --- | --- | --- |
|     |     |     |     |     |     |     |     | (cid:80)T | γtR(s |     |     |     |     |
However, we address the problem of automatically learning R(τ) = t ,a t ) the trajectory reward. The goal
t=0
simulationparameterdistributionsthatimprovepolicytrans- of reinforcement learning methods is to find parameters θ
|                                                       |     |     |     |     |     |     |     | of a policy | π (a|s) | that | maximize | the | expected discounted |
| ----------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | ----------- | ------- | ---- | -------- | --- | ------------------- |
| fer,asitremainschallengingtodoitmanually.Furthermore, |     |     |     |     |     |     |     |             | θ       |      |          |     |                     |
E
as also noticed in [29], simulators have an advantage of reward over trajectories induced by the policy: πθ [R(τ)]
providing a full state of the system compared to partial where s ∼p ,s ∼P(s |s ,a ) and a ∼π (a |s ).
|              |        |      |        |       |         |      |        | 0      | 0     | t+1        | t+1 | t t      | t θ t t            |
| ------------ | ------ | ---- | ------ | ----- | ------- | ---- | ------ | ------ | ----- | ---------- | --- | -------- | ------------------ |
|              |        |      |        |       |         |      |        | In our | work, | the system |     | dynamics | are either induced |
| observations | of the | real | world, | which | is also | used | in our |        |       |            |     |          |                    |
work for designing better reward functions. by a simulation engine or real world. As the simulation
The closest to our approach are the methods from [30, engine itself is deterministic, a reparameterization trick [35]
31, 32, 33, 34] that propose to iteratively learn simulation can be applied to introduce probabilistic dynamics. In par-
parameters and train policies. In [30], an iterative system ticular, we define a distribution of simulation parameters
|                |           |     |         |             |     |              |     | ξ ∼ p (ξ) | parameterized |     | by  | φ. The resulting | probabilistic |
| -------------- | --------- | --- | ------- | ----------- | --- | ------------ | --- | --------- | ------------- | --- | --- | ---------------- | ------------- |
| identification | framework |     | is used | to optimize |     | trajectories |     | φ         |               |     |     |                  |               |
of a bipedal robot in simulation and calibrate the simu- system dynamics of the simulation engine are P =
ξ∼pφ
| lation parameters |     | by minimizing |     | the discrepancy |     | between |     | P(s |s | ,a ,ξ). |     |     |     |     |
| ----------------- | --- | ------------- | --- | --------------- | --- | ------- | --- | ------ | ------- | --- | --- | --- | --- |
|                   |     |               |     |                 |     |         |     | t+1 t  | t       |     |     |     |     |
the real world and simulated execution of the trajectories. As it was shown in [6, 7, 9], it is possible to design
Although we also use the real world data to compute the a distribution of simulation parameters p (ξ), such that a
φ
|             |        |           |             |     |     |          |     | policy trained | on  | P    | would | perform | well on a real |
| ----------- | ------ | --------- | ----------- | --- | --- | -------- | --- | -------------- | --- | ---- | ----- | ------- | -------------- |
| discrepancy | of the | simulated | executions, |     | we  | are able | to  |                |     | ξ∼pφ |       |         |                |
use partial observations of the real world instead of the world dynamics distribution. This approach is also known
full states and we concentrate on learning general policies as domain randomization and the policy training maximizes
by finding simulation parameter distribution that leads to the expected reward under the dynamics induced by the
a better transfer without the need for exact replication of distribution of simulation parameters p (ξ):
φ
the real world environment. [31] suggests to optimize the maxE [E [R(τ)]] (1)
|            |            |      |      |           |          |     |      |     |     |     | Pξ∼pφ | πθ  |     |
| ---------- | ---------- | ---- | ---- | --------- | -------- | --- | ---- | --- | --- | --- | ----- | --- | --- |
| simulation | parameters | such | that | the value | function | is  | well |     |     | θ   |       |     |     |
approximatedinsimulationwithoutreplicatingtherealworld Domain randomization requires a significant expertise and
dynamics.Wealsorecognizethatexactreplicationofthereal tedious manual fine-tuning to design the simulation param-

Algorithm 1 SimOpt framework
RL SimOpt
simdistribution
1: p φ0 ←Initial simulation parameter distribution
2: (cid:15)←KL-divergence step for updating p φ
Training 3: for iteration i∈{0,...,N} do
4: env←Simulation(p φi )
5: π θ,pφi ←RL(env)
Simulation Reality 6: τ r o e b al ∼RealRollout(π θ,pφi )
7: ξ ∼Sample(p φi )
8: τ ξ ob ∼SimRollout(π θ,pφi ,ξ)
9: c(ξ)←D(τob,τob )
ξ real
10: p φi+1 ←UpdateDistribution(p φi ,ξ,c(ξ),(cid:15))
forboth,samplingtherealworldobservationsandoptimizing
the new simulation parameter distribution p :
φi+1
(cid:104) (cid:104) (cid:105)(cid:105)
minE E D(τob ,τob ) (3)
φi+1
Pξi+1∼pφi+1 πθ,pφi ξi+1 real
Fig.3. Thepipelineforoptimizingthesimulationparameterdistribution. (cid:0) (cid:1)
s.t. D p (cid:107)p ≤(cid:15),
Aftertrainingapolicyoncurrentdistribution,wesamplethepolicybothin KL φi+1 φi
therealworldandforarangeofparametersinsimulation.Thediscrepancy
where we introduce a KL-divergence step (cid:15) between the
betweenthesimulatedandrealobservationsisusedtoupdatethesimulation
parameterdistributioninSimOpt. old simulation parameter distribution p and the updated
φi
distribution p to avoid going out of the trust region of
φi+1
eter distribution p φ (ξ). Furthermore, as we show in our thepolicyπ θ,pφi trainedontheoldsimulationparameterdis-
experiments, it is often disadvantageous to use overly wide tribution.Fig.3showsthegeneralstructureofouralgorithm
distributions of simulation parameters as they can include that we call SimOpt.
scenarios with infeasible solutions that hinder successful
C. Implementation
policy learning, or lead to exceedingly conservative policies.
Here we describe particular implementation choices for
Instead, in the next section, we present a way to automate
the components of our framework used in this work. How-
the learning of p (ξ) that makes it possible to shape a
φ
ever, it should be noted that each of the components is
suitablerandomizationwithouttheneedtotrainonverywide
replaceable. Algorithm 1 describes the order of running all
distributions.
the components in our implementation. The RL training is
performed on a GPU based simulator using a parallelized
B. Learning simulation randomization
version of proximal policy optimization (PPO) [36] on a
The goal of our framework is to find a distribution of
multi-GPU cluster [37]. We parameterize our simulation
simulation parameters that brings observations or partial
parameter distribution as a Gaussian, i.e. p (ξ) ∼ N(µ,Σ)
φ
observations induced by the policy trained under this distri-
with φ = (µ,Σ). We choose weighted (cid:96) and (cid:96) norms
1 2
butioncloser tothe observationsof thereal world.Let π
θ,pφ between simulation and real world observations for our
beapolicytrainedunderthesimulateddynamicsdistribution
observation discrepancy function D:
P asintheobjective(1),andletD(τob,τob )beamea-
su ξ r ∼ e p o φ f discrepancy between real world o ξ bserv re a a ti l on trajecto- D(τ ξ ob,τ r o e b al )= (4)
ries τ r o e b al = (o 0,real ...,o T,real ) and simulated observation (cid:88) T (cid:88) T
trajectoriesτ
ξ
ob =(o
0,ξ
...,o
T,ξ
)sampledusingpolicyπ
θ,pφ
w
(cid:96)1
|W(o
i,ξ
−o
i,real
)|+w
(cid:96)2
(cid:107)W(o
i,ξ
−o
i,real
)(cid:107)2
2
,
and the dynamics distribution P ξ∼pφ . It should be noted i=0 i=0
t t h o a c t o t m he pu i t n e pu D ts (τ o o f b, t τ h o e b p ) ol a ic r y e n π o θ t ,p r φ eq a u n i d red ob t s o er b v e ati t o h n e s sa u m se e d . w an h d er W e w (cid:96) a 1 re an t d he w (cid:96) im 2 p a o re rta th n e ce we w ig e h ig ts ht o s f f t o h r e e (cid:96) a 1 c a h nd ob (cid:96) s 2 er n v o a r t m io s n ,
ξ real
Thegoalofoptimizingthesimulationparameterdistribution dimension. We additionally apply a Gaussian filter to the
is to minimize the following objective: distance computation to account for misalignments of the
trajectories.
m
φ
inE Pξ∼pφ (cid:104) E πθ,pφ (cid:2) D(τ ξ ob,τ r o e b al ) (cid:3)(cid:105) (2) As we use a non-differentiable simulator we employ a
sampling-based gradient-free algorithm based on relative
Thisoptimizationwouldentailtrainingandrealrobotevalua- entropy policy search [38] for optimizing the objective (3),
tionofthepolicyπ foreachφ.Thiswouldrequirealarge which is able to perform updates of p with an upper
θ,pφ φ
amount of RL iterations and more critically real robot trials. boundontheKL-divergencestep.Bydoingso,thesimulator
Hence, we develop an iterative approach to approximate the can be treated as a black-box, as in this case p can be
φ
optimization by training a policy π on the simulation optimized directly by only using samples ξ ∼ p and
parameterdistributionfromtheprevio θ u ,p s φ i i terationandusingit the corresponding costs c(ξ) coming from D(τob,τ φ ob ).
ξ real

| Sampling          | of simulation |                | parameters      |              | and the      | corresponding    |            |     |     |     |     |     |     |     |
| ----------------- | ------------- | -------------- | --------------- | ------------ | ------------ | ---------------- | ---------- | --- | --- | --- | --- | --- | --- | --- |
| policy roll-outs  |               | is highly      | parallelizable, |              |              | which            | we use in  |     |     |     |     |     |     |     |
| our experiments   |               | to evaluate    |                 | large        | amounts      | of               | simulation |     |     |     |     |     |     |     |
| parameter         | samples.      |                |                 |              |              |                  |            |     |     |     |     |     |     |     |
| As noted          | above,        | single         | components      |              | of           | our              | framework  |     |     |     |     |     |     |     |
| can be exchanged. |               | In             | case of         | availability | of           | a differentiable |            |     |     |     |     |     |     |     |
| simulator,        | the           | objective      | (3) can         | be defined   |              | as a loss        | function   |     |     |     |     |     |     |     |
| for optimizing    |               | with gradient  |                 | descent.     | Furthermore, |                  | for cases  |     |     |     |     |     |     |     |
| where (cid:96)    | and           | (cid:96) norms | are not         | applicable,  |              | we can           | employ     |     |     |     |     |     |     |     |
|                   | 1             | 2              |                 |              |              |                  |            |     |     |     |     |     |     |     |
| other forms       | of            | discrepancy    |                 | functions,   | e.g.         | to account       | for        |     |     |     |     |     |     |     |
| potential         | domain        | shifts         | between         | observations |              | [16,             | 39, 40].   |     |     |     |     |     |     |     |
Alternatively,realworldandsimulationdatacanbeaddition-
D(τob,τob
| ally used | to train |     |        | ) to discriminate |     | between | the |     |     |     |     |     |     |     |
| --------- | -------- | --- | ------ | ----------------- | --- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
|           |          |     | ξ real |                   |     |         |     |     |     |     |     |     |     |     |
observationsbyminimizingthepredictionlossofclassifying
observationsassimulatedorreal,similartothediscriminator
traininginthegenerativeadversarialframework[41,42,43].
Finally, a higher-dimensional generative model p (ξ) can Fig.4. Anexampleofawidedistributionofsimulationparametersinthe
φ
swing-peg-in-holetaskwhereitisnotpossibletofindasolutionformany
| be employed | to  | provide | a multi-modal |     | randomization |     | of the |     |     |     |     |     |     |     |
| ----------- | --- | ------- | ------------- | --- | ------------- | --- | ------ | --- | --- | --- | --- | --- | --- | --- |
ofthetaskinstances.
| simulated | environments. |     |             |     |     |     |     |                   |                |          |              |            |        |      |
| --------- | ------------- | --- | ----------- | --- | --- | --- | --- | ----------------- | -------------- | -------- | ------------ | ---------- | ------ | ---- |
|           |               |     |             |     |     |     |     | motion of         | the peg, which | makes    | the dynamics |            | of the | task |
|           |               | IV. | EXPERIMENTS |     |     |     |     |                   |                |          |              |            |        |      |
|           |               |     |             |     |     |     |     | more challenging. | The            | task set | up in the    | simulation | and    | real |
In our experiments we aim at answering the following world using a 7-DoF Yumi robot from ABB is depicted in
questions: (1) How does our method compare to standard Fig. 1 on the right. Our observation space consists of 7-DoF
| domain | randomization? |     | (2) How | learning |     | a simulation | pa- |           |                |     |             |     |          |     |
| ------ | -------------- | --- | ------- | -------- | --- | ------------ | --- | --------- | -------------- | --- | ----------- | --- | -------- | --- |
|        |                |     |         |          |     |              |     | arm joint | configurations | and | 3D position | of  | the peg. | The |
rameter distribution compares to training on a very wide reward function for the RL training in simulation includes
parameterdistribution?(3)HowmanySimOpt iterationsand the distance of the peg from the hole, angle alignment with
real world trials are required for a successful transfer of the hole and a binary reward for solving the task.
robotic manipulation policies? (4) Does our method work 2) Draweropening: Inthedraweropeningtask,therobot
for different real world tasks and robots? has to open a drawer of a cabinet by grasping and pulling it
We start by performing an ablation study in simulation withitsfingers.Thistaskinvolvesanabilitytohandlecontact
by transferring policies between scenes with different initial dynamicswhengraspingthedrawerhandle.Forthistask,we
| state distributions, |     | such | as different |     | poses | of the | cabinet in |             |           |      |               |           |     |     |
| -------------------- | --- | ---- | ------------ | --- | ----- | ------ | ---------- | ----------- | --------- | ---- | ------------- | --------- | --- | --- |
|                      |     |      |              |     |       |        |            | use a 7-DoF | Panda arm | from | Franka Emika. | Simulated |     | and |
the drawer opening task. We demonstrate that updating the realworldsettingsareshowninFig.1ontheleft.Thistaskis
distribution of simulation parameters leads to a successful operated on a 10D observation space: 7D robot joint angles
policy transfer in contrast to just using an initial distribution and 3D position of the cabinet drawer handle. The reward
of the parameters without any updates as done in standard function consists of the distance penalty between the handle
domainrandomization.Asweobserve,trainingonverywide
|     |     |     |     |     |     |     |     | and end-effector | positions, | the | angle alignment |     | of the | end- |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------------- | ---------- | --- | --------------- | --- | ------ | ---- |
parameter distributions is significantly more difficult and effector and the drawer handle, the opening distance of the
prone to fail compared to initializing with a conservative drawer and an indicator function ensuring that both robot
parameter distribution and updating it using SimOpt after- fingers are on the handle.
| wards. |         |      |        |              |     |          |          | We would | like to | emphasize | that our | method | does | not |
| ------ | ------- | ---- | ------ | ------------ | --- | -------- | -------- | -------- | ------- | --------- | -------- | ------ | ---- | --- |
| Next,  | we show | that | we can | successfully |     | transfer | policies |          |         |           |          |        |      |     |
requirethefullstateinformationoftherealworld,e.g.wedo
to real robots, such as ABB Yumi and Franka Panda, for not need to estimate the rope diameter, rope compliance etc.
complex articulated tasks such as cabinet drawer opening, toupdatethesimulationparameterdistributionintheswing-
andtaskswithnon-rigidbodiesandcomplexdynamics,such peg-in-holetask.Theoutputofourpoliciesconsistsof7joint
as swing-peg-in-hole task with the peg swinging on a soft velocity commands and an additional gripper command for
| rope. The | policies | can | be  | transferred | with | a very | small |            |               |     |     |     |     |     |
| --------- | -------- | --- | --- | ----------- | ---- | ------ | ----- | ---------- | ------------- | --- | --- | --- | --- | --- |
|           |          |     |     |             |      |        |       | the drawer | opening task. |     |     |     |     |     |
amountofrealrobottrialsandleveraginglarge-scaletraining
| on a multi-GPU |     | cluster. |     |     |     |     |     | B. Simulation | engine |     |     |     |     |     |
| -------------- | --- | -------- | --- | --- | --- | --- | --- | ------------- | ------ | --- | --- | --- | --- | --- |
WeuseNVIDIAFlexasahigh-fidelityGPUbasedphysics
A. Tasks
|     |     |     |     |     |     |     |     | simulator | that uses | maximal | coordinate | representation |     | to  |
| --- | --- | --- | --- | --- | --- | --- | --- | --------- | --------- | ------- | ---------- | -------------- | --- | --- |
We evaluate our approach on two robot manipulation simulate rigid body dynamics. Flex allows a highly parallel
tasks: cabinet drawer opening and swing-peg-in-hole. implementation and can simulate multiple instances of the
1) Swing-peg-in-hole: Thegoalofthistaskistoputapeg scene on a single GPU. We use the multi-GPU based
attached to a robot hand on a rope into a hole placed at a 45 RL infrastructure developed in [37] to leverage the highly
degrees angle. Manipulating a soft rope leads to a swinging parallel nature of the simulator.

| C. Comparison     |                 | to standard    | domain          |                   | randomization |              |            |                                                                |              |                  |                         |
| ----------------- | --------------- | -------------- | --------------- | ----------------- | ------------- | ------------ | ---------- | -------------------------------------------------------------- | ------------ | ---------------- | ----------------------- |
| We aim            | at              | understanding  |                 | what              | effect        | a wide       | simulation |                                                                |              |                  |                         |
| parameter         | distribution    |                | can have        | on                | learning      | robust       | poli-      |                                                                |              |                  |                         |
| cies, and         | how             | we can         | improve         | the               | learning      | performance  |            |                                                                |              |                  |                         |
| and the           | transferability |                | of the          | policies          | using         | our          | method to  |                                                                |              |                  |                         |
| adjust simulation |                 | randomization. |                 | Fig.              | 4 shows       | an           | example    |                                                                |              |                  |                         |
| of training       | a policy        | on             | a significantly |                   | wide          | distribution | of         |                                                                |              |                  |                         |
| simulation        | parameters      |                | for the         | swing-peg-in-hole |               | task.        | In this    |                                                                |              |                  |                         |
| case, peg         | size,           | rope           | properties      | and               | size          | of the       | peg box    |                                                                |              |                  |                         |
| were randomized.  |                 | As             | we can          | observe,          | a             | large part   | of the     |                                                                |              |                  |                         |
| randomized        | instances       |                | does not        | have              | a feasible    | solution,    | i.e.       |                                                                |              |                  |                         |
| when the          | peg             | is too         | large for       | the               | hole or       | the rope     | is too     |                                                                |              |                  |                         |
| short. Finding    |                 | a suitably     | wide            | parameter         |               | distribution | would      |                                                                |              |                  |                         |
| require           | manual          | fine-tuning    | of              | the randomization |               | parameters.  |            |                                                                |              |                  |                         |
| Moreover,         | learning        |                | performance     |                   | of standard   | domain       | ran-       |                                                                |              |                  |                         |
|                   |                 |                |                 |                   |               |              |            | Fig.5. Performanceofthepolicytrainingwithstandarddomainrandom- |              |                  |                         |
|                   |                 |                |                 |                   |               |              |            | ization for different                                          | variances of | the distribution | of the cabinet position |
domizationdependsstronglyonthevarianceoftheparameter
alongtheX-axisinthedraweropeningtask.
distribution.Weinvestigatethisinasimulatedcabinetdrawer
| opening     | task with  | a Franka       | arm       | which       | is        | placed       | in front of |     |     |     |     |
| ----------- | ---------- | -------------- | --------- | ----------- | --------- | ------------ | ----------- | --- | --- | --- | --- |
| a cabinet.  | We         | randomize      | the       | position    | of        | the cabinet  | along       |     |     |     |     |
| the lateral | direction  | (X-coordinate) |           |             | while     | keeping      | all other   |     |     |     |     |
| simulation  | parameters |                | constant. | We          | train     | our policies | on          | a   |     |     |     |
| 2 layer     | neural     | network        | with      | fully       | connected | layers       | of 64       |     |     |     |     |
| units each  | with       | PPO for        | 200       | iterations. | As        | we increase  | the         |     |     |     |     |
varianceofthecabinetposition,weobservethatthepolicies
| learned       | tend to   | be conservative |            | i.e.    | they do       | end up    | reaching  |     |     |     |     |
| ------------- | --------- | --------------- | ---------- | ------- | ------------- | --------- | --------- | --- | --- | --- | --- |
| the handle    | of        | the drawer      | but        | fail to | open          | it. This  | is shown  |     |     |     |     |
| in Fig. 5     | where     | we plot         | the reward |         | as a function |           | of number |     |     |     |     |
| of iterations | used      | to              | train the  | RL      | policy.       | We start  | with      | a   |     |     |     |
| standard      | deviation | of              | 2cm (σ2    | =       | 7e −          | 4) and    | increase  | it  |     |     |     |
| to 10cm       | (σ2 =     | 0.01).          | As shown   | in      | the           | plot, the | policy is |     |     |     |     |
sensitivetothechoiceofthisparameterandonlymanagesto
openthedrawerwhenthestandarddeviationis2cm.Wenote
that the reward difference may not seem that significant but Fig.6. Initialdistributionofthecabinetpositioninthesourceenvironment,
|     |     |     |     |     |     |     |     | located at extreme | left, slowly starts | to change | to the target environment |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------ | ------------------- | --------- | ------------------------- |
realizethatitisdominatedbythereachingreward.Increasing
distributionasafunctionofrunning5iterationsofSimOpt.
| variance | further, | in an | attempt | to  | cover | a wider | operating |     |     |     |     |
| -------- | -------- | ----- | ------- | --- | ----- | ------- | --------- | --- | --- | --- | --- |
range, can often lead to simulating unrealistic scenarios the weights from the previous SimOpt iteration, effectively
and catastrophic breakdown of the physics simulation with reducingthenumberofneededPPOiterationsfrom200to10
| various | joints | of the | robot | reaching | their | limits. | We also |     |     |     |     |
| ------- | ------ | ------ | ----- | -------- | ----- | ------- | ------- | --- | --- | --- | --- |
afterthefirstSimOptiteration.Thewholeprocessisrepeated
observedthatthepolicyisextremelysensitivetothevariance untilthelearnedpolicystartstosuccessfullyopenthedrawer
in all three axes of the cabinet position i.e. policy only ever in the target scene. We found that it took overall 3 iterations
converges when the standard deviation is 2cm and fails to of doing RL and SimOpt to learn to open the drawer when
learn even reaching the handle otherwise. the cabinet was offset by 15cm. We further note that the
In our next set of experiments, we show that our method number of iterations increases to 5 as we increase the target
is able to perform policy transfer from the source to target cabinetdistanceto22cmhighlightingthatourmethodisable
drawer opening scene where position of the cabinet in the tooperateonawiderrangeofmismatchbetweenthecurrent
target scene is offset by a distance of 15cm and 22cm. Such scene and the target scene. Fig. 6 shows how the source
largedistanceswouldhaverequiredthestandarddeviationof distributionvarianceadaptstothetargetdistributionvariance
thecabinetpositiontobeatleast10cmforanyna¨ıvedomain for this experiment and Fig. 7 shows that our method starts
randomizationbasedtrainingwhichfailstoproduceapolicy with a conservative guess of the initial distribution of the
that opens the drawer as shown in Fig. 5. The policy is first parameters and changes it using target scene roll-outs until
trained with RL on a conservative initial simulation param- policy behavior in target and source scenes starts to match.
| eter distribution. |            | Afterwards, |           | it is run | on   | the target | scene to   |               |             |     |     |
| ------------------ | ---------- | ----------- | --------- | --------- | ---- | ---------- | ---------- | ------------- | ----------- | --- | --- |
|                    |            |             |           |           |      |            |            | D. Real robot | experiments |     |     |
| collect            | roll-outs. | These       | roll-outs | are       | then | used       | to perform |               |             |     |     |
several SimOpt iterations to optimize simulation parameters In our real robot experiments, SimOpt is used to learn
that best explain the current roll-outs. We noticed that the simulation parameter distribution of the manipulated objects
RL training can be sped up by initializing the policy with and the robot. We run our experiments on 7-DoF Franka

Fig.7. PolicyperformanceinthetargetdraweropeningenvironmenttrainedonrandomizedsimulationparametersatdifferentiterationsofSimOpt.As
thesourceenvironmentdistributiongetsadjusted,thepolicytransferimprovesuntiltherobotcansuccessfullysolvethetaskinthefourthSimOptiteration.
Fig.8. RunningpoliciestrainedinsimulationatdifferentiterationsofSimOptforrealworldswing-peg-in-holeanddraweropeningtasks.Left:SimOpt
adjusts physical parameter distribution of the soft rope, peg and the robot, which results in a successful execution of the task on a real robot after two
SimOptiterations.Right:SimOptadjustsphysicalparameterdistributionoftherobotandthedrawer.Beforeupdatingtheparameters,therobotpushestoo
muchonthedrawerhandlewithoneofitsfingers,whichleadstoopeningthegripper.AfteroneSimOptiteration,therobotcanbettercontrolitsgripper
orientation,whichleadstoanaccuratetaskexecution.
| Panda and  | ABB       | Yumi robots. | The           | RL training |            | and SimOpt |     |     |     |     |     |     |     |
| ---------- | --------- | ------------ | ------------- | ----------- | ---------- | ---------- | --- | --- | --- | --- | --- | --- | --- |
| simulation | parameter | sampling     | is            | performed   | using      | a cluster  |     |     |     |     |     |     |     |
| of 64 GPUs | for       | running      | the simulator |             | with 150   | simulated  |     |     |     |     |     |     |     |
| agents per | GPU.      | In the       | real world,   | we          | use object | tracking   |     |     |     |     |     |     |     |
withDART[44]tocontinuouslytrackthe3Dpositionsofthe
| peg in the | swing-peg-in-hole |     | task | and the | handle | of the cab- |     |     |     |     |     |     |     |
| ---------- | ----------------- | --- | ---- | ------- | ------ | ----------- | --- | --- | --- | --- | --- | --- | --- |
Fig.9. Covariancematrixheatmapsover3SimOptupdatesoftheswing-
| inet drawer | in the | drawer | opening | task, | as well | as initialize |     |     |     |     |     |     |     |
| ----------- | ------ | ------ | ------- | ----- | ------- | ------------- | --- | --- | --- | --- | --- | --- | --- |
peg-in-holetaskbeginningwiththeinitialcovariancematrix.
positionsofthepegboxandthecabinetinsimulation.DART
operatesondepthimagesandrequires3Darticulatedmodels
|     |     |     |     |     |     |     | updated | Gaussian | distribution | parameters |     | can be | found in |
| --- | --- | --- | --- | --- | --- | --- | ------- | -------- | ------------ | ---------- | --- | ------ | -------- |
of the objects. We learn multi-variate Gaussian distributions AppendixB.Fig.9showsthedevelopmentofthecovariance
| of the simulation |     | parameters | parameterized |         | by      | a mean and |             |      |             |             |                   |      |             |
| ----------------- | --- | ---------- | ------------- | ------- | ------- | ---------- | ----------- | ---- | ----------- | ----------- | ----------------- | ---- | ----------- |
|                   |     |            |               |         |         |            | matrix over | the  | iterations. | We can      | observe           | some | correlation |
| a full covariance |     | matrix,    | and perform   | several | updates | of the     |             |      |             |             |                   |      |             |
|                   |     |            |               |         |         |            | in the top  | left | block of    | the matrix, | which corresponds |      | to the      |
simulation parameter distribution per SimOpt iteration using robotjointcomplianceanddampingvalues.Thisreflectsthe
thesamerealworldroll-outstominimizethenumberofreal
|     |     |     |     |     |     |     | fact that | these | values | have somewhat | opposite | effect | on the |
| --- | --- | --- | --- | --- | --- | --- | --------- | ----- | ------ | ------------- | -------- | ------ | ------ |
world trials.
robotbehavior,i.e.ifweovershootinthecompliancewecan
| 1) Swing-peg-in-hole: |     |     | Fig. 8 | (left) demonstrates |     | the be- |            |      |           |          |     |     |     |
| --------------------- | --- | --- | ------ | ------------------- | --- | ------- | ---------- | ---- | --------- | -------- | --- | --- | --- |
|                       |     |     |        |                     |     |         | compensate | with | increased | damping. |     |     |     |
havior of real robot execution of the policy trained in 2) Drawer opening: For drawer opening, we learn a
simulation over 3 iterations of SimOpt. At each iteration, Gaussian distribution of the robot and cabinet simulation
weperform100iterationsofRLinapproximately7minutes
|     |     |     |     |     |     |     | parameters. | More | details | on the | learned | distribution | and |
| --- | --- | --- | --- | --- | --- | --- | ----------- | ---- | ------- | ------ | ------- | ------------ | --- |
and 3 roll-outs on the real robot using the currently trained its initialization are provided in Appendix B. Fig. 8 (right)
policy to collect real world observations. Then, we run 3 showsthedraweropeningbehaviorbeforeandafterperform-
update steps of the simulation parameter distribution with ing a SimOpt update. During each SimOpt iteration, we run
9600 simulation samples per update. In the beginning, the 200iterationsofRLforapproximately22minutes,perform3
| robot misses | the | hole due | to the | discrepancy |     | of the simu- |     |     |     |     |     |     |     |
| ------------ | --- | -------- | ------ | ----------- | --- | ------------ | --- | --- | --- | --- | --- | --- | --- |
realrobotroll-outsandrun20updatestepsofthesimulation
lation parameters and the real world. After a single SimOpt distribution using 9600 samples per update step. Before
iteration, the robot is able to get much closer to the hole, updatingtheparameterdistribution,therobotisabletoreach
howevernotbeingabletoinsertthepegasitrequiresaslight the handle and start opening the drawer. However, it cannot
angletogointothehole,whichisnon-trivialtoachieveusing exactly replicate the learned behavior from simulation and
| a soft rope. | Finally, | after | two SimOpt | iterations, |     | the policy |          |      |             |            |        |         |       |
| ------------ | -------- | ----- | ---------- | ----------- | --- | ---------- | -------- | ---- | ----------- | ---------- | ------ | ------- | ----- |
|              |          |       |            |             |     |            | does not | keep | the gripper | orthogonal | to the | drawer, | which |
trained on a resulting simulation parameter distribution is results in pushing too much on the handle from the bottom
able to swing the peg into the hole in 90% of the times with one of the robot fingers. As the finger gripping force
when evaluated on 20 trials. is limited, the fingers begin to open due to a larger pushing
We observe that the most significant changes of the simu- force. After adjusting the simulation parameter distribution
lationparameterdistributionoccurinthephysicalparameters that includes robot and drawer properties, the robot is able
of the rope that influence its dynamical behavior and the to better control its gripper orientation and by evaluating on
robot parameters that influence the policy behavior, such as 20trialscanopenthedraweratalltimeskeepingthegripper
scaling of the policy actions. More details on the initial and orthogonal to the handle.

V. CONCLUSIONS robotics. In European Conference on Artificial Life.
|         |     |            |     |         |          |         |        | Springer, | 1995. |     |     |     |     |     |     |
| ------- | --- | ---------- | --- | ------- | -------- | ------- | ------ | --------- | ----- | --- | --- | --- | --- | --- | --- |
| Closing | the | simulation | to  | reality | transfer | loop is | an im- |           |       |     |     |     |     |     |     |
portant component for a robust transfer of robotic policies. [6] J. Tobin, R. Fong, A. Ray, J. Schneider, W. Zaremba,
|         |       |                 |     |      |          |            |     | and | P. Abbeel. | Domain | randomization |     |     | for transferring |     |
| ------- | ----- | --------------- | --- | ---- | -------- | ---------- | --- | --- | ---------- | ------ | ------------- | --- | --- | ---------------- | --- |
| In this | work, | we demonstrated |     | that | adapting | simulation |     |     |            |        |               |     |     |                  |     |
deepneuralnetworksfromsimulationtotherealworld.
| randomization |     | using real | world | data | can | help in | learning |     |     |     |     |     |     |     |     |
| ------------- | --- | ---------- | ----- | ---- | --- | ------- | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
simulationparameterdistributionsthatareparticularlysuited In IROS, 2017.
|                  |     |        |          |         |     |          |       | [7] F. | Sadeghi | and S. | Levine. | Cad2rl: | Real | single-image |     |
| ---------------- | --- | ------ | -------- | ------- | --- | -------- | ----- | ------ | ------- | ------ | ------- | ------- | ---- | ------------ | --- |
| for a successful |     | policy | transfer | without | the | need for | exact |        |         |        |         |         |      |              |     |
replication of the real world environment. In contrast to flight without a single real image. RSS, 2017.
|                     |       |          |       |           |               |            |         | [8] S.     | James, | A. J. Davison, |         | and E. | Johns.     | Transferring |         |
| ------------------- | ----- | -------- | ----- | --------- | ------------- | ---------- | ------- | ---------- | ------ | -------------- | ------- | ------ | ---------- | ------------ | ------- |
| trying to           | learn | policies | using | very wide | distributions |            | of sim- |            |        |                |         |        |            |              |         |
|                     |       |          |       |           |               |            |         | end-to-end |        | visuomotor     | control | from   | simulation |              | to real |
| ulation parameters, |       | which    | can   | simulate  | infeasible    | scenarios, |         |            |        |                |         |        |            |              |         |
we are able to start with distributions that can be efficiently world for a multi-stage task. CoRR, abs/1707.02267,
2017.
| learned | with reinforcement |     | learning, |     | and modify | them | for |     |     |     |     |     |     |     |     |
| ------- | ------------------ | --- | --------- | --- | ---------- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
a better transfer to the real world scenario. Our framework [9] M. Andrychowicz, B. Baker, M. Chociej, R. Jozefow-
|     |     |     |     |     |     |     |     | icz, | B. McGrew, | J.  | Pachocki, | A.  | Petron, | M. Plappert, |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---------- | --- | --------- | --- | ------- | ------------ | --- |
doesnotrequirefullstateoftherealenvironmentandreward
|           |          |        |     |             |     |           |      | G.  | Powell, | A. Ray, | J. Schneider, |     | S. Sidor, | J.  | Tobin, |
| --------- | -------- | ------ | --- | ----------- | --- | --------- | ---- | --- | ------- | ------- | ------------- | --- | --------- | --- | ------ |
| functions | are only | needed | in  | simulation. |     | We showed | that |     |         |         |               |     |           |     |        |
updating simulation distributions is possible using partial P. Welinder, L. Weng, and W. Zaremba. Learning dex-
|     |     |     |     |     |     |     |     | terous | in-hand | manipulation. |     | CoRR, | abs/1808.00177, |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------ | ------- | ------------- | --- | ----- | --------------- | --- | --- |
observationsoftherealworldwhilethefullstatestillcanbe
2018.
usedfortherewardcomputationinsimulation.Weevaluated
|               |     |                |            |         |        |                |        | [10] L.  | Ljung. | System | identification |     | – theory | for the | user. |
| ------------- | --- | -------------- | ---------- | ------- | ------ | -------------- | ------ | -------- | ------ | ------ | -------------- | --- | -------- | ------- | ----- |
| our approach  | on  | two            | real world | robotic | tasks  | and            | showed |          |        |        |                |     |          |         |       |
|               |     |                |            |         |        |                |        | Prentice | Hall,  | 1999.  |                |     |          |         |       |
| that policies | can | be transferred |            | with    | only a | few iterations | of     |          |        |        |                |     |          |         |       |
simulation updates using a small number of real robot trials. [11] F.GiriandE.-W.Bai. Block-orientedNonlinearSystem
|     |     |     |     |     |     |     |     | Identification. |     | London: | Springer-Verlag |     |     | London, | 2010. |
| --- | --- | --- | --- | --- | --- | --- | --- | --------------- | --- | ------- | --------------- | --- | --- | ------- | ----- |
Inthiswork,weappliedourmethodtolearninguni-modal
|            |                |                |               |           |         |              |         | [12] M.P.Deisenroth,G.Neumann,andJ.Peters. |           |            |           |             |     | Asurvey |        |
| ---------- | -------------- | -------------- | ------------- | --------- | ------- | ------------ | ------- | ------------------------------------------ | --------- | ---------- | --------- | ----------- | --- | ------- | ------ |
| simulation | parameter      | distributions. |               |           | We plan | to extend    | our     |                                            |           |            |           |             |     |         |        |
|            |                |                |               |           |         |              |         | on                                         | policy    | search for | robotics. | Foundations |     | and     | Trends |
| framework  | to multi-modal |                | distributions |           | and     | more         | complex |                                            |           |            |           |             |     |         |        |
|            |                |                |               |           |         |              |         | in                                         | Robotics, | pages      | 388–403,  | 2013.       |     |         |        |
| generative | simulation     |                | models        | in future | work.   | Furthermore, |         |                                            |           |            |           |             |     |         |        |
weplantoincorporatehigher-dimensionalsensormodalities, [13] M.P.DeisenrothandC.E.Rasmussen. Pilco:Amodel-
|            |            |                |     |      |        |              |     | based   | and            | data-efficient | approach |            | to policy | search. | In      |
| ---------- | ---------- | -------------- | --- | ---- | ------ | ------------ | --- | ------- | -------------- | -------------- | -------- | ---------- | --------- | ------- | ------- |
| such as    | vision     | and touch,     | for | both | policy | observations | and |         |                |                |          |            |           |         |         |
|            |            |                |     |      |        |              |     | ICML,   | 2011.          |                |          |            |           |         |         |
| factors of | simulation | randomization. |     |      |        |              |     |         |                |                |          |            |           |         |         |
|            |            |                |     |      |        |              |     | [14] M. | P. Deisenroth, |                | C. E.    | Rasmussen, |           | and     | D. Fox. |
ACKNOWLEDGEMENTS Learning to control a low-cost manipulator using data-
We would like to thank Alexander Lambert, Balakumar efficient reinforcement learning. In RSS, 2011.
Sundaralingam and Giovanni Sutanto for their help with the [15] S. Kolev and E. Todorov. Physically consistent state
|                    |     |     |       |     |                 |     |        | estimation |     | and system | identification |     | for | contacts. | In  |
| ------------------ | --- | --- | ----- | --- | --------------- | --- | ------ | ---------- | --- | ---------- | -------------- | --- | --- | --------- | --- |
| robot experiments, |     | and | David | Ha, | James Davidson, |     | Lerrel |            |     |            |                |     |     |           |     |
Pinto and Fabio Ramos for their helpful feedback on the Humanoids, 2015.
draft of the paper. We would also like to thank the GPU [16] E. Tzeng, C. Devin, J. Hoffman, C. Finn, X. Peng,
cluster and infrastucture team at NVIDIA for their help all S.Levine,K.Saenko,andT.Darrell. Towardsadapting
the way through this project. deepvisuomotorrepresentationsfromsimulatedtoreal
|     |     |     |     |     |     |     |     | environments. |     | CoRR, | abs/1511.07111, |     |     | 2015. |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------- | --- | ----- | --------------- | --- | --- | ----- | --- |
REFERENCES
|     |     |     |     |     |     |     |     | [17] K. | Bousmalis, | A. Irpan, | P.  | Wohlhart, | Y.  | Bai, | M. Kel- |
| --- | --- | --- | --- | --- | --- | --- | --- | ------- | ---------- | --------- | --- | --------- | --- | ---- | ------- |
[1] S. Levine, P. Pastor, A. Krizhevsky, J. Ibarz, and cey, M. Kalakrishnan, L. Downs, J. Ibarz, P. Pastor,
D.Quillen. Learninghand-eyecoordinationforrobotic K. Konolige, S. Levine, and V. Vanhoucke. Using
grasping with deep learning and large-scale data col- simulationanddomainadaptationtoimproveefficiency
lection. I. J. Robotics Res., 37(4-5):421–436, 2018. ofdeeproboticgrasping. CoRR,abs/1709.07857,2017.
[2] L. Pinto and A. Gupta. Supersizing self-supervision: [18] A. A. Rusu, M. Vecerik, T. Rothrl, N. Heess, R. Pas-
Learning to grasp from 50k tries and 700 robot hours. canu, and R. Hadsell. Sim-to-real robot learning from
| In  | ICRA, | 2016. |     |     |     |     |     | pixels | with | progressive | nets. | In  | CoRL, | 2017. |     |
| --- | ----- | ----- | --- | --- | --- | --- | --- | ------ | ---- | ----------- | ----- | --- | ----- | ----- | --- |
[3] A. Yahya, A. Li, M. Kalakrishnan, Y. Chebotar, and [19] P. F. Christiano, Z. Shah, I. Mordatch, J. Schneider,
S.Levine. Collectiverobotreinforcementlearningwith T. Blackwell, J. Tobin, P. Abbeel, and W. Zaremba.
distributedasynchronousguidedpolicysearch.InIROS, Transferfromsimulationtorealworldthroughlearning
| 2017.  |              |     |           |     |            |        |         | deep  | inverse | dynamics | model. | CoRR, | abs/1610.03518, |     |     |
| ------ | ------------ | --- | --------- | --- | ---------- | ------ | ------- | ----- | ------- | -------- | ------ | ----- | --------------- | --- | --- |
| [4] D. | Kalashnikov, |     | A. Irpan, | P.  | Pastor, J. | Ibarz, | A. Her- | 2016. |         |          |        |       |                 |     |     |
zog, E. Jang, D. Quillen, E. Holly, M. Kalakrishnan, [20] S. Koos, J.-B. Mouret, and S. Doncieux. Crossing
V. Vanhoucke, and S. Levine. Qt-opt: Scalable deep the reality gap in evolutionary robotics by promoting
reinforcement learning for vision-based robotic manip- transferable controllers. In GECCO. ACM, 2010.
ulation. CoRR, abs/1806.10293, 2018. [21] I. Mordatch, K. Lowrey, and E. Todorov. Ensemble-
[5] N. Jakobi, P. Husbands, and I. Harvey. Noise and cio: Full-body dynamic motion planning that transfers
the reality gap: The use of simulation in evolutionary to physical humanoids. In IROS, 2015.

[22] X. B. Peng, M. Andrychowicz, W. Zaremba, and Self-supervised learning from video. In ICRA, 2018.
P. Abbeel. Sim-to-real transfer of robotic control with [41] I. J. Goodfellow, J. Pouget-Abadie, M. Mirza, B. Xu,
dynamics randomization. In ICRA, 2018. D.Warde-Farley,S.Ozair,A.C.Courville,andY.Ben-
[23] W. Yu, J. Tan, C. K. Liu, and G. Turk. Preparing for gio. Generative adversarial nets. In NIPS, 2014.
the unknown: Learning a universal policy with online [42] J. Ho and S. Ermon. Generative adversarial imitation
system identification. In RSS, 2017. learning. In NIPS, 2016.
[24] F. Muratore, F. Treede, M. Gienger, and J. Peters. [43] K. Hausman, Y. Chebotar, S. Schaal, G. S. Sukhatme,
Domain randomization for simulation-based policy op- and J. J. Lim. Multi-modal imitation learning from un-
timization with transferability assessment. In CoRL, structured demonstrations using generative adversarial
| 2018. |     |     |     |     |     |     |     | nets. In NIPS, | 2017. |
| ----- | --- | --- | --- | --- | --- | --- | --- | -------------- | ----- |
[25] M. Wulfmeier, I. Posner, and P. Abbeel. Mutual [44] T.Schmidt,R.A.Newcombe,andD.Fox. Dart:Dense
alignment transfer learning. CoRR, abs/1707.07907, articulated real-time tracking. In RSS, 2014.
2017.
| [26] J.  | Tan, T.  | Zhang,        | E.         | Coumans, |            | A. Iscen,          | Y. Bai,      |     |     |
| -------- | -------- | ------------- | ---------- | -------- | ---------- | ------------------ | ------------ | --- | --- |
| D.       | Hafner,  | S. Bohez,     |            | and V.   | Vanhoucke. |                    | Sim-to-real: |     |     |
| Learning |          | agile         | locomotion | for      | quadruped  |                    | robots. In   |     |     |
| RSS,     | 2018.    |               |            |          |            |                    |              |     |     |
| [27] K.  | Lowrey,  | S.            | Kolev,     | J. Dao,  | A.         | Rajeswaran,        | and          |     |     |
| E.       | Todorov. | Reinforcement |            | learning |            | for non-prehensile |              |     |     |
manipulation:Transferfromsimulationtophysicalsys-
| tem.            | In SIMPAR, |                                     | 2018.     |                 |              |         |               |     |     |
| --------------- | ---------- | ----------------------------------- | --------- | --------------- | ------------ | ------- | ------------- | --- | --- |
| [28] R.         | Antonova,  | S.                                  | Cruciani, | C.              | Smith,       | and     | D. Kragic.    |     |     |
| Reinforcement   |            |                                     | learning  | for             | pivoting     | task.   | CoRR,         |     |     |
| abs/1703.00472, |            |                                     | 2017.     |                 |              |         |               |     |     |
| [29] L.         | Pinto,     | M. Andrychowicz,                    |           |                 | P. Welinder, |         | W. Zaremba,   |     |     |
| andP.Abbeel.    |            | Asymmetricactorcriticforimage-based |           |                 |              |         |               |     |     |
| robot           | learning.  |                                     | CoRR,     | abs/1710.06542, |              | 2017.   |               |     |     |
| [30] J. Tan,    | Z.         | Xie,                                | B. Boots, | and             | C. K.        | Liu.    | Simulation-   |     |     |
| based           | design     | of                                  | dynamic   |                 | controllers  | for     | humanoid      |     |     |
| balancing.      |            | In IROS,                            | 2016.     |                 |              |         |               |     |     |
| [31] S.         | Zhu, A.    | Kimmel,                             | K.        | E.              | Bekris,      | and     | A. Boularias. |     |     |
| Fast            | model      | identification                      |           | via             | physics      | engines | for data-     |     |     |
| efficient       | policy     |                                     | search.   | In IJCAI.       | ijcai.org,   |         | 2018.         |     |     |
| [32] A.         | Farchy,    | S.                                  | Barrett,  | P. MacAlpine,   |              | and     | P. Stone.     |     |     |
Humanoidrobotslearningtowalkfaster:Fromthereal
AAMAS,
| world                   | to    | simulation | and            | back.                        | In  |       | 2013. |     |     |
| ----------------------- | ----- | ---------- | -------------- | ---------------------------- | --- | ----- | ----- | --- | --- |
| [33] J.HannaandP.Stone. |       |            |                | Groundedactiontransformation |     |       |       |     |     |
| for                     | robot | learning   | in simulation. |                              | In  | AAAI, | 2017. |     |     |
[34] A.Rajeswaran,S.Ghotra,S.Levine,andB.Ravindran.
| Epopt:            | Learning        |                 | robust         | neural          | network       | policies  | using        |     |     |
| ----------------- | --------------- | --------------- | -------------- | --------------- | ------------- | --------- | ------------ | --- | --- |
| model             | ensembles.      |                 | CoRR,          | abs/1610.01283, |               |           | 2016.        |     |     |
| [35] D.           | P. Kingma       | and             | M.             | Welling.        | Auto-encoding |           | varia-       |     |     |
| tional            | Bayes.          | CoRR,           | abs/1312.6114, |                 |               | 2013.     |              |     |     |
| [36] J. Schulman, |                 | F.              | Wolski,        | P. Dhariwal,    |               | A.        | Radford, and |     |     |
| O.                | Klimov.         | Proximal        |                | policy          | optimization  |           | algorithms.  |     |     |
| CoRR,             | abs/1707.06347, |                 |                | 2017.           |               |           |              |     |     |
| [37] J. Liang,    |                 | V. Makoviychuk, |                |                 | A. Handa,     | N.        | Chentanez,   |     |     |
| M.                | Macklin,        | and             | D. Fox.        | Gpu-accelerated |               |           | robotic sim- |     |     |
| ulation           | for             | distributed     |                | reinforcement   |               | learning. | CoRL,        |     |     |
2018.
| [38] J. Peters,   |         | K. Mlling,  |            | and Y.           | Altun.   | Relative | entropy    |     |     |
| ----------------- | ------- | ----------- | ---------- | ---------------- | -------- | -------- | ---------- | --- | --- |
| policy            | search. | In          | AAAI,      | 2010.            |          |          |            |     |     |
| [39] E.           | Tzeng,  | J. Hoffman, |            | T.               | Darrell, | and      | K. Saenko. |     |     |
| Simultaneous      |         | deep        | transfer   | across           |          | domains  | and tasks. |     |     |
| In                | ICCV,   | 2015.       |            |                  |          |          |            |     |     |
| [40] P. Sermanet, |         | C.          | Lynch,     | Y. Chebotar,     |          | J. Hsu,  | E. Jang,   |     |     |
| S.                | Schaal, | and         | S. Levine. | Time-contrastive |          |          | networks:  |     |     |

APPENDIX
| A. Comparison |     | to trajectory-based |     |     | parameter | learning |     |     |       |             |     |
| ------------- | --- | ------------------- | --- | --- | --------- | -------- | --- | --- | ----- | ----------- | --- |
|               |     |                     |     |     |           |          |     |     | µinit | diag(Σinit) | µ   |
final
| In our | work, | we run | a closed-loop |     | policy | in  | simulation |     |     |     |     |
| ------ | ----- | ------ | ------------- | --- | ------ | --- | ---------- | --- | --- | --- | --- |
Robotproperties
| to obtain    | simulated     | roll-outs |          | for SimOpt |              | optimization. | Al-        |                        |               |      |               |
| ------------ | ------------- | --------- | -------- | ---------- | ------------ | ------------- | ---------- | ---------------------- | ------------- | ---- | ------------- |
|              |               |           |          |            |              |               |            | Jointcompliance(7D)    | [-8.0...-8.0] | 1.0  | [-8.2...-7.8] |
| ternatively, | we            | could     | directly | set the    | simulator    | to            | states and |                        |               |      |               |
|              |               |           |          |            |              |               |            | Jointdamping(7D)       | [-3.0...-3.0] | 1.0  | [-3.0...-2.6] |
| execute      | actions       | from      | the real | world      | trajectories | as            | proposed   |                        |               |      |               |
|              |               |           |          |            |              |               |            | Jointactionscaling(7D) | [0.5...0.5]   | 0.02 | [0.25...0.44] |
| in [30,      | 31]. However, |           | such     | a setting  | is not       | always        | possible   |                        |               |      |               |
Ropeproperties
| as we might           | not             | be       | able to   | observe       | all required |         | variables   |                       |        |       |         |
| --------------------- | --------------- | -------- | --------- | ------------- | ------------ | ------- | ----------- | --------------------- | ------ | ----- | ------- |
|                       |                 |          |           |               |              |         |             | Ropetorsioncompliance | 2.0    | 0.07  | 1.89    |
| for setting           | the             | internal | state     | of the        | simulator    | at      | each time   |                       |        |       |         |
|                       |                 |          |           |               |              |         |             | Ropetorsiondamping    | 0.1    | 0.07  | 0.48    |
| point, e.g.           | the             | current  | bending   | configuration |              | of the  | rope in     |                       |        |       |         |
|                       |                 |          |           |               |              |         |             | Ropebendingcompliance | 10.0   | 0.5   | 9.97    |
| the swing-peg-in-hole |                 |          | task,     | which         | we are       | able to | initialize  |                       |        |       |         |
|                       |                 |          |           |               |              |         |             | Ropebendingdamping    | 0.01   | 0.05  | 0.49    |
| but can               | not continually |          | track     | with          | our real     | world   | set up.     |                       |        |       |         |
|                       |                 |          |           |               |              |         |             | Ropesegmentwidth      | 0.004  | 2e-4  | 0.007   |
| Without               | being           | able     | to set    | the simulator |              | to the  | real world  |                       |        |       |         |
|                       |                 |          |           |               |              |         |             | Ropesegmentlength     | 0.016  | 0.004 | 0.017   |
| states continuously,  |                 | we       | still     | can try       | to copy      | the     | real world  |                       |        |       |         |
|                       |                 |          |           |               |              |         |             | Ropesegmentfriction   | 0.25   | 0.03  | 0.29    |
| actions               | and execute     | them     | inan      | open-loop     | manner       |         | in simula-  |                       |        |       |         |
|                       |                 |          |           |               |              |         |             | Ropedensity           | 2500.0 | 8.0   | 2500.12 |
| tion. However,        |                 | in our   | simulated | experiments   |              | we      | notice that |                       |        |       |         |
Pegproperties
| especially  | when       | making     | particular    |     | state dimensions |               | unob-     |                    |       |      |        |
| ----------- | ---------- | ---------- | ------------- | --- | ---------------- | ------------- | --------- | ------------------ | ----- | ---- | ------ |
|             |            |            |               |     |                  |               |           | Pegscale           | 0.33  | 0.01 | 0.30   |
| servable    | for SimOpt | cost       | computation,  |     | such             | as X-position | of        |                    |       |      |        |
|             |            |            |               |     |                  |               |           | Pegfriction        | 1.0   | 0.06 | 1.0    |
| the cabinet | in         | the drawer | opening       |     | task, executing  |               | a closed- |                    |       |      |        |
|             |            |            |               |     |                  |               |           | Pegmasscoefficient | 1.0   | 0.06 | 1.06   |
| loop policy | still      | leads      | to meaningful |     | simulation       |               | parameter |                    |       |      |        |
|             |            |            |               |     |                  |               |           | Pegdensity         | 400.0 | 10.0 | 400.07 |
| updates     | compared   | to         | the open-loop |     | execution.       | We            | believe   |                    |       |      |        |
Pegboxproperties
| in this | case the | robot | behavior | is  | still dependent |     | on the |             |       |      |       |
| ------- | -------- | ----- | -------- | --- | --------------- | --- | ------ | ----------- | ----- | ---- | ----- |
|         |          |       |          |     |                 |     |        | Pegboxscale | 0.029 | 0.01 | 0.034 |
particularsimulatedscenarioduetotheclosed-loopnatureof
|             |       |      |          |        |       |              |        | Pegboxfriction | 1.0 | 0.2 | 1.01 |
| ----------- | ----- | ---- | -------- | ------ | ----- | ------------ | ------ | -------------- | --- | --- | ---- |
| the policy, | which | also | reflects | in the | joint | trajectories | of the |                |     |     |      |
robotthatarestillincludedintheSimOptcostfunction.This
TABLEII
| means that | by  | using a | closed-loop | policy | we  | can still | update |     |     |     |     |
| ---------- | --- | ------- | ----------- | ------ | --- | --------- | ------ | --- | --- | --- | --- |
SWING-PEG-IN-HOLE:SIMULATIONPARAMETERDISTRIBUTION.
| the simulation |      | parameter | distribution |              | even | without | explicitly |     |     |     |     |
| -------------- | ---- | --------- | ------------ | ------------ | ---- | ------- | ---------- | --- | --- | --- | --- |
| including      | some | of the    | relevant     | observations |      | in the  | SimOpt     |     |     |     |     |
cost computation.
| B. Simulation     |            | parameters |           |               |             |          |           |     |     |     |     |
| ----------------- | ---------- | ---------- | --------- | ------------- | ----------- | -------- | --------- | --- | --- | --- | --- |
| Tables            | I and      | II show    | the       | initial       | mean,       | diagonal | values    |     |     |     |     |
| of the initial    | covariance |            | matrix    | and           | the final   | mean     | of the    |     |     |     |     |
| Gaussian          | simulation |            | parameter | distributions |             | that     | have been |     |     |     |     |
| optimized         | with       | SimOpt     | in        | drawer        | opening     | (Table   | I) and    |     |     |     |     |
| swing-peg-in-hole |            | (Table     | II)       | tasks.        |             |          |           |     |     |     |     |
|                   |            |            | µinit     |               | diag(Σinit) |          | µ         |     |     |     |     |
final
Robotproperties
| Jointcompliance(7D)    |     |     | [-6.0...-6.0] |     | 0.5  | [-6.5...-6.1] |       |     |     |     |     |
| ---------------------- | --- | --- | ------------- | --- | ---- | ------------- | ----- | --- | --- | --- | --- |
| Jointdamping(7D)       |     |     | [3.0...3.0]   |     | 0.5  | [2.4...2.7]   |       |     |     |     |     |
| Grippercompliance      |     |     | -11.0         |     | 0.5  |               | -10.9 |     |     |     |     |
| Gripperdamping         |     |     | 0.0           |     | 0.5  |               | 0.34  |     |     |     |     |
| Jointactionscaling(7D) |     |     | [0.26...0.26] |     | 0.01 | [0.19...0.35] |       |     |     |     |     |
Cabinetproperties
| Drawerjointcompliance |     |     | 7.0   |     | 1.0 |     | 8.3  |     |     |     |     |
| --------------------- | --- | --- | ----- | --- | --- | --- | ---- | --- | --- | --- | --- |
| Drawerjointdamping    |     |     | 2.0   |     | 0.5 |     | 0.81 |     |     |     |     |
| Drawerhandlefriction  |     |     | 0.001 |     | 0.5 |     | 2.13 |     |     |     |     |
TABLEI
DRAWEROPENING:SIMULATIONPARAMETERDISTRIBUTION.

| C. SimOpt | parameters |     |     |     |     |     |
| --------- | ---------- | --- | --- | --- | --- | --- |
Simulationdistributionupdateparameters
| Tables      | III and               | IV show          | the SimOpt distribution | update          |                                             |       |
| ----------- | --------------------- | ---------------- | ----------------------- | --------------- | ------------------------------------------- | ----- |
|             |                       |                  |                         |                 | NumberofREPSupdatesperSimOptiteration       | 20    |
| parameters  | for swing-peg-in-hole |                  | and drawer              | opening tasks   |                                             |       |
|             |                       |                  |                         |                 | Numberofsimulationparametersamplesperupdate | 9600  |
| including   | REPS                  | [38] parameters, | settings of             | the discrepancy |                                             |       |
|             |                       |                  |                         |                 | Timestepspersimulationparametersample       | 453   |
| function    | D(τob,τob             | ), weights       | of each observation     | dimen-          |                                             |       |
|             | ξ                     | real             |                         |                 | KL-threshold                                | 1.0   |
| sion in the | discrepancy           | function,        | and reinforcement       | learning        |                                             |       |
|             |                       |                  |                         |                 | Minimumtemperatureofsampleweights           | 0.001 |
settingssuchasparallelizedPPO[36,37]trainingparameters
Discrepancyfunctionparameters
| and task | reward | weights. |     |     |               |     |
| -------- | ------ | -------- | --- | --- | ------------- | --- |
|          |        |          |     |     | L1-costweight | 0.5 |
|          |        |          |     |     | L2-costweight | 1.0 |
Simulationdistributionupdateparameters
NumberofREPSupdatesperSimOptiteration 3 Gaussiansmoothingstandarddeviation(timesteps) 5
|                                             |     |     |     |      | Gaussiansmoothingtruncation(timesteps) | 4   |
| ------------------------------------------- | --- | --- | --- | ---- | -------------------------------------- | --- |
| Numberofsimulationparametersamplesperupdate |     |     |     | 9600 |                                        |     |
Observationdimensionscostweights
| Timestepspersimulationparametersample |     |     |     | 453   |                    |     |
| ------------------------------------- | --- | --- | --- | ----- | ------------------ | --- |
|                                       |     |     |     |       | Jointangles(7D)    | 0.5 |
| KL-threshold                          |     |     |     | 1.0   |                    |     |
|                                       |     |     |     |       | Drawerposition(3D) | 1.0 |
| Minimumtemperatureofsampleweights     |     |     |     | 0.001 |                    |     |
PPOparameters
Discrepancyfunctionparameters
|                                               |     |     |     |     | Numberofagents    | 400  |
| --------------------------------------------- | --- | --- | --- | --- | ----------------- | ---- |
| L1-costweight                                 |     |     |     | 0.5 |                   |      |
|                                               |     |     |     |     | Episodelength     | 150  |
| L2-costweight                                 |     |     |     | 1.0 |                   |      |
|                                               |     |     |     |     | Timestepsperbatch | 151  |
| Gaussiansmoothingstandarddeviation(timesteps) |     |     |     | 5   |                   |      |
|                                               |     |     |     |     | Clipparameter     | 0.2  |
| Gaussiansmoothingtruncation(timesteps)        |     |     |     | 4   |                   |      |
|                                               |     |     |     |     | γ                 | 0.99 |
Observationdimensionscostweights
|                                      |     |     |     |      | λ                             | 0.95 |
| ------------------------------------ | --- | --- | --- | ---- | ----------------------------- | ---- |
| Jointangles(7D)                      |     |     |     | 0.05 |                               |      |
|                                      |     |     |     |      | Entropycoefficient            | 0.0  |
| Pegposition(3D)                      |     |     |     | 1.0  |                               |      |
|                                      |     |     |     |      | Optimizationepochs            | 5    |
| Pegpositionintheprevioustimestep(3D) |     |     |     | 1.0  |                               |      |
|                                      |     |     |     |      | Optimizationbatchsizeperagent | 8    |
PPOparameters
|                               |     |     |     |      | Optimizationstepsize                           | 5e-4   |
| ----------------------------- | --- | --- | --- | ---- | ---------------------------------------------- | ------ |
| Numberofagents                |     |     |     | 100  |                                                |        |
|                               |     |     |     |      | DesiredKL-step                                 | 0.01   |
| Episodelength                 |     |     |     | 150  |                                                |        |
| Timestepsperbatch             |     |     |     | 64   | RLrewardweights                                |        |
|                               |     |     |     |      | L2-distancebetweenend-effectoranddrawerhandle  | -0.5   |
| Clipparameter                 |     |     |     | 0.2  |                                                |        |
|                               |     |     |     |      | Angularalignmentofend-effectorwithdrawerhandle | -0.07  |
| γ                             |     |     |     | 0.99 |                                                |        |
|                               |     |     |     |      | Openingdistanceofthedrawer                     | -0.4   |
| λ                             |     |     |     | 0.95 |                                                |        |
|                               |     |     |     |      | Keepingfingersaroundthedrawerhandlebonus       | 0.005  |
| Entropycoefficient            |     |     |     | 0.0  |                                                |        |
|                               |     |     |     |      | Actionpenalty                                  | -0.005 |
| Optimizationepochs            |     |     |     | 10   |                                                |        |
| Optimizationbatchsizeperagent |     |     |     | 8    |                                                |        |
TABLEIV
| Optimizationstepsize |     |     |     | 5e-4 |     |     |
| -------------------- | --- | --- | --- | ---- | --- | --- |
DRAWEROPENING:SIMOPTPARAMETERS.
| DesiredKL-step |     |     |     | 0.01 |     |     |
| -------------- | --- | --- | --- | ---- | --- | --- |
RLrewardweights
| L1-distancebetweenthepegandthehole      |     |     |     | -10.0 |     |     |
| --------------------------------------- | --- | --- | --- | ----- | --- | --- |
| L2-distancebetweenthepegandthehole      |     |     |     | -4.0  |     |     |
| Tasksolved(pegcompletelyinthehole)bonus |     |     |     | 0.1   |     |     |
| Actionpenalty                           |     |     |     | -0.7  |     |     |
TABLEIII
SWING-PEG-IN-HOLE:SIMOPTPARAMETERS.
