UniLab: A Heterogeneous Architecture for Robot RL
Beyond GPU-Dominant Paradigms
YufeiJia1*,ZhanxiangCao2,3*,MingruiYu1*,HengZhang4*,ShenyuChen5*,DixuanJiang6*,
MengLi7,XiaofanLi7,YiyangLiu1,JunzheWu1,ZhengLi11,XiLinFang8,
Ting-YuTsui1,ShengchengFu9,3,HaoyangLi2,3,AnqiWang10,ZifanWang11,DongjieZhu1,
ChenyuCao12,ZhenbiaoHuang13,ZiangZheng1,JieLu14,XinMa15,ZhengyangWei15,
XiangZhao4,TianyueZhan2,3,YeHe16,YuxiangChen17,YizhouJiang1,YueLi10,
HaizhouGe1,YuhangDong18,FanJia19,ZihengZhang19,MengZhang19,XiwaDeng4,
ZhixingChen1,HanyangShao10,ChenxinDong19,YixuanLi6,YizhiChen9,3,
BokuiChen1,KaifengZhang20,HanqingCui4,YusenQin21,RuqiHuang1,
LeiHan10†,TiancaiWang19†,XiangLi1†,YueGao2,3†,GuyueZhou1†
1THU,2SJTU,3SII,4Motphys,5HITSZ,6BIT,7NEU,8SUSTech,9TJU,10DISCOVERRobotics,11HKUST(GZ),
12Galbot,13NUS,14WTU,15HBUT,16AMD,17NJU,18ZJU,19Dexmal,20Sharpa,21D-Robotics
*Corecontributors.†Advising.Correspondenceto:YufeiJia<jyf23@mails.tsinghua.edu.cn>.
Figure1:Teaser.Representativerobot-controltasksinUniLab;“Uni”meansunifiedcross-platformtraining.
TeaserimagerenderedwithMotrixSim.
Abstract:
Simulation-based RL for contemporary robot control is increasingly organized
around GPU-resident simulation: physics, rollout collection, and learning are
placed on a single GPU-centric execution path. This paradigm has greatly
improved training speed, but it has also encouraged a default assumption that
efficienttrainingrequiresphysicstoresideontheGPU.Werevisitthisassumption.
Our view is that, in simulation-dominated robot control, the essential question
is not which processor runs physics, but whether simulation throughput, policy
learning, and runtime synchronization form an efficient end-to-end loop. We
present UniLab, a heterogeneous CPU-simulation / GPU-learning architecture
that decouples CPU-parallel simulation from GPU policy updates through a
unified runtime for data movement, buffering, and synchronization. UniLab is
implemented as a complete and extensible training system using MuJoCoUni
and MotrixSim CPU-batched physics backends, supporting PPO, FastSAC,
FlashSAC, and APPO. On representative simulation-based robot control tasks,
UniLab improves end-to-end training efficiency by 3–10× under the same
hardwareconfiguration,whilereducingdependenceontheNVIDIACUDA-based
software stack and supporting cross-platform execution on the Apple macOS
platformandtheAMDROCmandIntelXPUacceleratorbackends. Theseresults
show that GPU simulation is an effective path to efficient training, but not a
6202
nuJ
2
]OR.sc[
3v31303.5062:viXra

necessary one, broadening the practical system choices available for robot RL
training. Projectpage: https://unilabsim.github.io.
Keywords: RobotReinforcementLearning,Systems,HeterogeneousTraining
1 Introduction
Traininginfrastructurehasbecomeafirst-orderfactorinsimulation-basedrobotRL:fastertraining
reducesthewall-clockcostofasingleexperiment,shortenssystemandalgorithmiterationcycles,
andexpandstherangeoftasksthatcanbestudiedunderpracticalhardwarebudgets. Thedominant
answerinrecentyearshasbeenclear: placephysicssimulation,rolloutcollection,andlearningon
aGPU-centricexecutionpath;IsaacGym,IsaacLab,MuJoCoPlayground,mjlab,ManiSkill3,and
Genesis show that large-scale GPU-resident environment parallelism can greatly accelerate robot
controltraining[1,2,3,4,5,6].Thissuccesshasshapedthecurrentcommunitydefaultthatefficient
trainingshouldbeorganizedaroundGPU-residentphysics,tyinghigh-throughputexperimentation
toanarrowersetofGPU-residentsoftwareenvironments.
Robot RL training, however, is a closed-loop system coupling data generation, policy updates,
and synchronization constraints, not a simulator benchmark alone. In simulation-dominated
tasks,end-to-endefficiencydependsonsimulationthroughput,learnerutilization,collector–learner
synchronization, datamovementandbufferingoverhead, andwhetherhardwareisallocatedtothe
stagethatactuallylimitswall-clocktime: thelearnermaywaitforrollouts,collectorsmaywaitfor
newparameters,anddatamovementorbufferingmayeraseparallelgains. Whetherphysicsrunson
theGPUisthereforeonedesignchoicewithinabroadersystemsorganizationproblem.
High-throughputenvironmentexecutionisalsopossibleoutsideGPU-residentphysics. GeneralRL
systemshavelongusedCPU-sidevectorizedorbatchedenvironments,androbotRLhasprecedents
forCPU-distributedorCPU-parallelsimulation,includingOpenAI’sRubik’s-cubehandsystemand
recent RaiSim-based locomotion work [7, 8, 9, 10, 11, 12, 13]. Algorithmic data dependencies
further shape this organization: PPO preserves the strongest rollout/update synchronization
constraint; APPOallowscollectionandlearningtooverlapwhileremainingclosetotheon-policy
setting; and off-policy methods such as FastSAC and FlashSAC further relax the dependence of
eachupdateontrajectoriesfromthelatestpolicy[14,15]. Thisorderingletsusstudyalgorithmsas
synchronizationregimesratherthanasseparatealgorithmiccontributions: PPOtestswhetherCPU
simulation can sustain strictly synchronized training, APPO tests collector–learner overlap once
synchronizationisrelaxed,andFastSAC/FlashSACtestthereplay-basedproducer–consumerpath.
This motivates the systems question studied here: can CPU-side batched rigid-body simulation,
GPU-sidepolicylearning,andtheruntimepathbetweenthemformanefficienttrainingloop?
Thispaperaskswhetherefficientsimulation-basedrobotcontroltrainingmustrelyonGPU-resident
simulation. Ourthesisisthatsimulation-dominatedrobotcontroltrainingrequireshigh-throughput,
well-coordinated simulation-learning execution, rather than GPU-resident simulation itself.
We focus on representative robot control tasks in simulation, leaving real-world RL and
vision-dominatedsettingsoutsidethescopeofthispaper.
We present UniLab, a heterogeneous CPU-simulation / GPU-learning training architecture. CPU-
sideMuJoCoUni[16]andMotrixSim[17]backendsperformbatchedrigid-bodysimulationanddata
generation, GPU resources perform policy and value learning, and a unified runtime coordinates
data movement, buffering, and synchronization. UniLab is a training-system organization rather
than a newpolicy optimization algorithm; itis implemented as acomplete and extensible training
systemwithunifiedtrainingandevaluationentrypointsandexplicittask/backendinterfaces, while
supportingPPO,FastSAC,FlashSAC,andAPPOinoneframework.
Across representative simulated robot-control benchmarks, UniLab improves end-to-end training
efficiencyby3–10×onthesamesingle-GPU/single-CPUworkstation,whilereducingdependence
on the NVIDIA CUDA-based software stack and supporting execution on Apple macOS, AMD
ROCm,andIntelXPUbackends. Ourcontributionsarethreefold:
2

Systemsframing. WerecastefficientrobotRLtrainingasasystemsorganizationproblemforthe
simulation-learningclosedloop,ratherthanaconsequenceofGPU-residentphysicsalone.
Heterogeneoustrainingarchitecture. WepresentUniLab,whichconnectsCPU-batchedphysics
backends,aGPUlearner,databuffering,andparametersynchronizationthroughaunifiedruntime,
whilesupportingPPO,FastSAC,FlashSAC,andAPPOinoneframework.
End-to-end evidence. We show 3–10× wall-clock gains across robot embodiments, control
workloads,andpracticalalgorithms,togetherwithexecutionevidenceonmacOS,ROCm,andXPU
backends.
2 RelatedWork
2.1 GPU-residentrobotlearning. Table1:RepresentativerobotRLtrainingsystems.
The dominant systems path for efficient robot
System Phys. Batch Coupling
RL training has been to place physics sim- IsaacGym PhysX GPU-C GPU-sync
ulation, rollout collection, and learning on IsaacLab PhysX GPU-C GPU-sync
Genesis Taichi GPU-C/M/R GPU-sync
a GPU-centric execution path [1, 18, 19].
MJP MJX GPU-C GPU-sync
MuJoCo provides a widely used foundation MjLab MJWarp GPU-C GPU-sync
for robot control simulation [20], while Isaac UniLab MJU/Mtx CPU H-async/sync
Note.GPU-C/M/R:GPUbatchedphysicsonCUDA/Metal/ROCm.
Gym, Isaac Lab, MuJoCo Playground, mjlab,
GPU-sync:synchronizedGPUsimulation–learning;H-async/sync:
ManiSkill3,andGenesishavemadelarge-scale CPUsimulationwithGPUlearning.MJU/Mtx/MJP:
MuJoCoUni/MotrixSim/MuJoCoplayground.
GPU-resident environment parallelism a stan-
dard practice for robot learning [1, 2, 3, 4, 5, 6]. Table 1 summarizes these systems along the
axes most relevant to this paper: physics execution path, simulation–learning organization, and
algorithmicdatadependency.
2.2 SystemslessonfromGPUsimulation.
The central lesson from GPU-resident systems is the integration of fast physics execution with
tightly coupled rollout collection and learner updates. For on-policy methods such as PPO,
this organization fits synchronized batched rollout/update cycles and has proven effective across
robot-control workloads [14, 21, 22, 23, 24, 25, 26, 27, 28]. We adopt this systems lesson
but separate the training-system principle from one hardware path: efficient training requires
low-overheaddatageneration,learning,andsynchronization,whileGPUkernelsaremosteffective
forregular,dense,andstaticallyshapedexecution;dynamicactivecontactsets,sparseinteractions,
collision handling, contact solving, closed-chain or other constraint handling, and contact-rich
manipulationallstressthisexecutionmodel.
2.3 CPU-parallelenvironmentexecution.
High-throughputenvironmentexecutionalsohasahistoryoutsideGPU-residentphysics. Ingeneral
RL,EnvPool,RLlib,Tianshou,andPufferLibuseCPU-sidevectorized,batched,orparallelrollout
collection as core system components [7, 8, 9, 10]. Robot RL also has CPU-distributed or
CPU-parallel precedents, includingOpenAI’s Rubik’s-cube handsystem andrecent RaiSim-based
locomotionwork[11,12]. TheseexamplesshowthatCPU-sideenvironmentparallelismisviable;
UniLabaskswhether,underthesamehardwaresetting,modernCPU-batchedsimulationandaGPU
learner can form an efficient end-to-end training path through a low-overhead runtime rather than
onlyatextremeworker-clusterscale.
2.4 Replay-basedrobot-controlacceleration.
Algorithmicdatadependenciesfurthershapethesystemorganization.PPOisthepracticaldefaultin
manylarge-scalerobot-trainingworkloads,butitson-policyupdatespreservestrongsynchronization
betweenrolloutgenerationandlearnerupdates. Replay-basedmethodssuchasSACandTD3can
reusepastexperienceandrelaxthisdependence,whileFastTD3,FastSAC,andFlashSACshowthat
3

Figure2: UniLabsystemarchitecture. Thefigureshowsthedata,scheduling,andparameter-synchronization
pathsbetweenCPU-sidebatchedphysicsbackends,theunifiedruntime,andtheGPUlearner.
thisdirectioncanacceleratehigh-dimensionalrobotcontrol[15,29,30,31,32]. UniLabstudiesthe
complementary systems question: when data dependencies are relaxed, how can CPU simulation
andGPUlearningbecoordinatedtoimproveend-to-endwall-clockefficiency?
3 UniLabArchitecture
ThissectiondescribesUniLabasanend-to-endtrainingloopthatcombinesCPU-sidebatchedrigid-
bodysimulation,GPU-sidepolicyandvaluelearning,andaunifiedruntimeforcoordinatingthedata
pathbetweenthem.
3.1 DesignObjectiveandRequirements
The design objective is to improve the efficiency of the full simulation-learning loop without
requiring GPU-resident simulation. UniLab follows hardware roles: CPUs generate large-scale
simulation data, GPUs perform dense learning updates, and the runtime minimizes coordination
cost. Thisobjectiveinducesthreerequirements.
CPU-side simulation throughput. CPU-side batched rigid-body simulation must sustain enough
throughputtocontinuouslygeneratedatafortheworkloadsstudiedhere.
Non-blocking GPU learning. The GPU learner should consume buffered experience rather than
idlingbehindrolloutgeneration.
Controlled runtime overhead. Data movement, buffering, and parameter synchronization must
remainlow-overheadsothattheheterogeneoussplitdoesnotdegenerateintoblockinghandoffs.
3.2 UniLabExecutionArchitecture
Figure 2 summarizes the system organization: CPU workers generate trajectories or transitions,
the GPU learner performs policy and value updates, and the unified runtime coordinates data
movement,buffering,scheduling,andparametersynchronization.
| Collection–update | timing | and | overlap. | Uni- |     |     |     |     |     |
| ----------------- | ------ | --- | -------- | ---- | --- | --- | --- | --- | --- |
Lab supports both synchronized and loosely Time Inside One Mean Learne rCycle
|          |                   |                |          |     | Collector     | en v  i n t e r a c t i o     | n    | current weight sync end |     |
| -------- | ----------------- | -------------- | -------- | --- | ------------- | ----------------------------- | ---- | ----------------------- | --- |
| coupled  | collection–update | timing.        | Standard |     |               | ac to rI nf e r+ e n vS t e p |      |                         |     |
| PPO uses | a synchronized    | rollout/update |          | cy- |               |                               |      |                         |     |
|          |                   |                |          |     | CPU Pack data |                               | pack |                         |     |
cle. Our APPO implementation follows the packed batch available
|              |           |             |           |     | H2D async |     | H2D |     |     |
| ------------ | --------- | ----------- | --------- | --- | --------- | --- | --- | --- | --- |
| asynchronous | on-policy | formulation | described |     |           |     |     |     |     |
async H2D overlaps learner update
by Luo et al. [33]: the collector writes l e a r n e r   u p d a te   c o m p u t e
|     |     |     |     |     | Actor update | cri tic/ ac t or |  /  ta rg e t  i  nt er na |  ls in te n tio  na ll y co llaps ed |     |
| --- | --- | --- | --- | --- | ------------ | ---------------- | -------------------------- | ------------------------------------ | --- |
weight sync ends cycle
| fixed-horizon | rollouts, | behavior-policy |     | log |     |               |               |                    |         |
| ------------- | --------- | --------------- | --- | --- | --- | ------------- | ------------- | ------------------ | ------- |
|               |           |                 |     |     |     | E n v P a c k | a s y n c H 2 | D L e ar n e r u p | d a te  |
probabilities, and bootstrap information into a W e ights  y n c H a n d o  ff / w ait    P ip e li n e e d g e
|             |              |            |     |          |     |     |     |     |     |
| ----------- | ------------ | ---------- | --- | -------- | --- | --- | --- | --- | --- |
| shared ring | buffer while | continuing | to  | step the |     |     |     |     |     |
Figure3:Collection–updatetimingandoverlap.
4

106
105
256 512 1024 2048 4096 8192
Batch Size
dnoceS
rep
spetS
vnE
Physics Step Throughput Across Backends
UniLab (MuJoCoUni) UniLab (MotrixSim) Isaac Sim Isaac Gym Genesis MJWarp
Go2 G1 Sharpa-Hand
256 512 1024 2048 4096 8192 256 512 1024 2048 4096 8192
Batch Size Batch Size
Figure 4: CPU simulation throughput across representative robot control scenes. The figure establishes the
simulator-sidecapacitythatunderliestheend-to-endtrainingresults.
next rollout on the CPU; the learner drains
available rollouts and performs V-trace correction and PPO-style updates on the GPU, with the
V-trace clipping values listed in Appendix C.4.2. CPU collection and GPU learning therefore
overlap in wall-clock time with parameter synchronization near rollout boundaries. FastSAC and
FlashSAC use replay-based timing: collectors insert transition batches into a shared replay buffer,
while the learner performs multiple updates from device batches; both variants use the same
optimizedruntimepath,whichrequestsCPUreplaypackinganddevicetransferforthenextbatch
onetickaheadsotheyoverlapwithcurrentlearnerupdates.
Figure3showstheFastSACcase,wherecollector-sideworkisstagedaheadoflearnercomputation
andthemainvisiblesynchronizationpointisactor-weighthandoff.
Runtimeabstraction. Theunifiedruntimeletssynchronizedandlooselycoupledexecutionshare
one system stack, connecting robot assets, task configurations, simulation backends, and learning
algorithmsthroughexplicitinterfaces.
3.3 CPUPhysicsBackendsandTaskInterface
Batched CPU physics. UniLab realizes CPU-side throughput through backend-native batched
environment execution: CPU workers advance environments at batch granularity and generate
trajectoriesortransitionsforthedownstreamlearner.
Backendcontract.ThecurrentsystemconnectstwopracticalCPU-sidesimulationbackendsunder
a shared runtime contract. MuJoCoUni provides a CPU-batched MuJoCo runtime backend [16];
theMotrixSimbackendmapsthesametaskandruntimecontractontotheMotrixSimphysicsand
renderingstack[17].
Task and randomization interface. This contract covers task state, actions, observation-related
data, reset and interval randomization hooks, terrain context, and playback capabilities, allowing
physicalparameters, observationperturbations, andtask-conditionchangestobescheduledbythe
trainingsystemratherthanscatteredacrosstaskscripts.
Thisdesignseparatesphysicssemantics,determinedbythebackendmodelandsolver,fromtraining
throughput,determinedbybatchedexecution,datamovement,andruntimecoordination;thesame
learner binding can also target macOS, ROCm, and XPU, with backend-dependent throughput
evaluatedinSection4.5.
4 Experiments
We evaluate three questions: whether CPU simulation provides enough throughput, whether
heterogeneous CPU-simulation / GPU-learning improves end-to-end wall-clock efficiency, and
whethertheresultisrobustacrosstaskfamiliesandalgorithms. Theprimarymetricisend-to-end
trainingefficiency;throughputmeasurementsexplainthemechanism.
5

Training Efficiency Comparison
|                    | (a) G1 Flip Tracking |                     | (b) G1 Walk Flat |          |                  | (c) G1 Motion Tracking |                   | (d) Sharpa Inhand Rotation |          |
| ------------------ | -------------------- | ------------------- | ---------------- | -------- | ---------------- | ---------------------- | ----------------- | -------------------------- | -------- |
|                    |                      | 109.3 min 120.5 min |                  |          |                  |                        |                   |                            |          |
| 1.0                | 32.9 min 49.3 min    |                     | 3.0 min          | 25.1 min | 16.2 min20.9 min |                        | 58.8 min178.0 min | 20.3 min                   |          |
| draweR naeM delacS |                      | 109.2 min111.4 min  | 5.3 min          | 32.7 min |                  |                        | 67.9 min          |                            | 37.9 min |
0.8
| 0.6 |     |     |     | 18.3 min |     |     |     |     |     |
| --- | --- | --- | --- | -------- | --- | --- | --- | --- | --- |
UniLab (PPO) — Flip
0.4 U n i L a b   ( P P O ) —  W a l l  Flip U n i L a b   ( F a s t S A C ) U n i L a b   ( F a s t S A C )   —   B o x  L if ti n g 98.8 min
|     |     | U UniLab (APPO) — Wall Flip n i L a b   ( A P PO ) —  F l i p |     | U Holosoma (FastSAC) n i L a b   ( F la s h S A C ) |     | U Holosoma (FastSAC) — Box Lifting n i L a b   ( F a s t | S A C )   —   C ra w l  S l o pe |     | UniLab (APPO) |
| --- | --- | ------------------------------------------------------------- | --- | --------------------------------------------------- | --- | -------------------------------------------------------- | -------------------------------- | --- | ------------- |
0.2 MJLab (PPO) — Flip FlashSAC (original) Holosoma (FastSAC) — Crawl Slope UniLab (FastSAC)
|     |     | MJLab (PPO) — Wall Flip |     | MJLab (PPO) |     | MJLab (PPO) — Box Lifting |     |     | Sharpa-RL-Lab (PPO) |
| --- | --- | ----------------------- | --- | ----------- | --- | ------------------------- | --- | --- | ------------------- |
0.0
0 20 Training Time (minutes) 40 60 80 100 120 0 5 10 Training Time (minutes) 15 20 25 30 35 0 20 Training Time (minutes) 40 60 70 130 190 0 20 Training Time (minutes) 40 60 80 100
3.3×
Figure5: End-to-endtrainingefficiencyonrepresentativerobotcontroltasks. Representativespeedups:
onG1Flip,8.4×onG1WalkFlat,and11.0×onG1MotionTracking.
4.1 ExperimentalSetup
Controlled comparisons use the same default Linux hardware: one NVIDIA RTX 4090 GPU,
one AMD Ryzen 9 9950X3D CPU, and 64 GB of 4800 MT/s memory. Unless otherwise
stated, UniLab results in the main experiments use the MuJoCoUni backend, while Apple
macOS, AMD ROCm, and Intel XPU results are included as portability evidence. The task set
spanslocomotion,motiontracking,manipulation,andmanipulation-locomotionacrossquadruped,
wheeled-quadruped, humanoid, and dexterous-hand / in-hand manipulation embodiments. We
organizealgorithmsbytheirsynchronizationconstraints:PPOisthestrictlysynchronizedon-policy
baseline, APPO is the near-on-policy case where rollout collection can overlap with learning,
and FastSAC/FlashSAC provides replay-based producer–consumer off-policy evidence. For
comparisons against external baselines, we use their public task-resolved configurations and align
controllable factors including observation spaces, action spaces, rewards, sensor noise, and the
maindomain-randomizationsettings,whilepreservingeachsystem’snativeexecutiondetails. The
reported results therefore reflect practical system-level wall-clock performance under the same
hardware setting on representative task configurations. Detailed experimental setup is provided
inAppendixC.
4.2 CanCPUSimulationProvideEnoughThroughputforRobotRL?
Incommonrobot-RLtrainingsettings,CPUphysicsdoesnotnecessarilyprovidelowerthroughput
thanGPU-basedsimulation;itsrelativeadvantageismorepronouncedinworkloadswithcomplex
contact and dexterous manipulation. Figure 4 and Table 2 show that batched CPU simulation
provides the simulator-side capacity required by the heterogeneous execution model over the
environmentcountsstudiedhere.
Table2:CPUenv-stepthroughput(103steps/s)bytaskandchip.
| End-to-end     | training | gives        | complemen- |        |      |           |      |        |             |
| -------------- | -------- | ------------ | ---------- | ------ | ---- | --------- | ---- | ------ | ----------- |
| tary evidence. |          | In Figure    | 5(a), GPU- |        |      | Go2       |      | G1     | Hand        |
| resident       | MjLab    | and CPU-step | / GPU-     |        |      |           |      |        |             |
|                |          |              |            | Chip   |      | MJ Motrix | MJ   | Motrix | MJ Motrix   |
| learner        | UniLab   | achieve      | comparable |        |      |           |      |        |             |
|                |          |              |            | A18Pro | 55.7 | 122.9     | 28.4 | 18.1   | 183.9 134.1 |
efficiency on the same PPO task M5Max 288.0 797.8 178.8 127.7 1118.4 982.9
(Time Usage: 120.5/111.4 min vs. R9-8945HX 246.2 704.2 154.6 113.6 434.1 542.2
|     |     |     |     | TR-9980X | 915.9 | 2662.7 | 517.9 | 410.4 | 1991.5 2622.6 |
| --- | --- | --- | --- | -------- | ----- | ------ | ----- | ----- | ------------- |
109.3/109.2 min). Since synchronized i7-11800H 82.1 162.0 34.7 23.8 176.8 151.6
PPO leaves little opportunity to hide Xeon8558 1002.4 847.2 424.6 379.5 2566.3 397.7
rollout latency, PPO serves here as the Note.Valuesare103envsteps/s;MJ=MuJoCoUnibackend.
strict synchronization stress test: this result indicates that CPU simulation is not the dominant
bottleneckforthisworkload.
4.3 CanCPU-Sim/GPU-LearnImproveEnd-to-EndEfficiency?
Given sufficient CPU-side throughput for strictly synchronized PPO, the next question is whether
heterogeneous organization translates into end-to-end gains as data dependencies become looser.
APPO remains near the on-policy regime but overlaps rollout collection with learning through
correction;FastSAC/FlashSACorganizedatagenerationasreplay-basedproducer–consumerpaths.
Oncetheruntimedecouplesthelearnerfromthecollector,thesemorelooselycoupledsettingsobtain
3–10×improvementsinend-to-endtrainingefficiencyacrossmultiplerobotcontroltasks.
6

Training-Cycle Placement Ablation
cycle end: 39.25 ms
UniLab Collector (CPU)
MuJoCoUni Learner update
cycle end: 102.37 ms
UniLab Collector (GPU)
MJWarp Learner update
cycle end: 94.61 ms
Collector (GPU)
Holosoma
MJWarp Learner update
0 20 40 60 80 100 120
time (ms)
Collection Learner wait Learner weight sync Holosoma learning
Collector replay Learner train Holosoma collection
Figure6:Training-cycleplacementablation.HolosomaistheFastSACcodebaseusedhere,andMjWarpisits
MuJoCoWarpbackend. Thefigurecompareswheresimulationcollectionandlearningareplacedduringone
learnercycle.
A D
B E
C F
Figure7:To-realexperimentoverviewacrosssixreal-robottasks.
Figure 5 spans humanoid, motion-tracking, and dexterous-in-hand manipulation tasks and follows
theprogressionfromPPOtoAPPOandreplay-basedFastSAC/FlashSAC,indicatingthatthegain
comesfromlearner–collectordecouplingratherthanasingletaskoralgorithmconfiguration.
To further explain this gain, we add a learner-cycle ablation. Holosoma is the FastSAC codebase
usedhere,andMjWarpdenotesitsMuJoCoWarpbackend[34]; Figure6separatesheterogeneous
placement from runtime engineering alone: UniLab-MuJoCoUni completes collector work before
the learner update ends, while attaching the same runtime to MjWarp lengthens the cycle because
collector-side GPU simulation and learner updates share the same accelerator and contend for
resources.
Figure7givesanoverviewofthesixto-realexperimentsandcomplementstheend-to-endsimulation
resultswithdeployment-sidecoverage.
4.4 DexterousIn-HandRotationasaSystemsStressTest
SharpaWaveHand in-hand rotation adds contact-rich evidence beyond locomotion and motion
tracking. The baseline starts from the public Sharpa-rl-lab PPO recipe on Isaac Lab, with
object-scalerandomizationadjustedtomatchUniLab;itusesafixedgravitydirectionwithabuilt-in
curriculum,whereasUniLabtrainsdirectlyunderrandomizedgravitydirectionswithoutcurriculum.
In this task, the CPU MuJoCo version trains better, and UniLab reaches stronger HORA teacher
policies within a shorter wall-clock budget; under the same-number friction setting, UniLab-SAC
still reaches 1000+ reward in comparable time. The task uses a 22-DOF tactile hand to rotate
a randomized free object and shows that UniLab supports dense simulation, stable learning, and
differentsynchronizationconstraintsindexterousteachertraining.
7

Cross-platform Training Portability
RTX 4090 + AMD 9950X3D AMD 8060S + AMD AI MAX 395 AMD W7900 + AMD 7900X AMD MI300X + Intel 8568Y M4 M5 MAX A18 Pro XPU 185H
|     | FastSAC G1 WBT |     | FastSAC G1 Walk Flat |     |     | FlashSAC Go2 Joystick Flat |     |     | PPO G1 Flip Tracking |     |
| --- | -------------- | --- | -------------------- | --- | --- | -------------------------- | --- | --- | -------------------- | --- |
| 30  |                | 300 |                      |     |     | 50                         |     |     |                      |     |
60
40
| draweR naeM 20 |     | 200 |     |     |     |     |     |     |     |     |
| -------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|                |     |     |     |     |     | 30  |     | 40  |     |     |
20
| 10  |     | 100 |     |     |     |     |     | 20  |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
10
| 0   |     |     | 0   |     |     | 0   |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
0 2 4 0.00 0.25 0.50 0.75 1.00 0 1 2 3 4 0.00 0.25 0.50 0.75 1.00
|     |               | 1e7 |     |               | 1e7 |               |     | 1e6 |               | 1e3 |
| --- | ------------- | --- | --- | ------------- | --- | ------------- | --- | --- | ------------- | --- |
|     | Training Step |     |     | Training Step |     | Training Step |     |     | Training Step |     |
Figure8: Cross-platformtrainingoverviewonrepresentativedevices. Thefigureshowstrainingcurvesand
finalperformanceondifferentplatforms,complementingTable3.
Table3:Wall-clocktrainingtime(min.).
|     | Device               |     | FastSAC/G1WBT |      |     | FastSAC/G1Walk | FlashSAC/Go2Joy. |     | PPO/G1Flip |     |
| --- | -------------------- | --- | ------------- | ---- | --- | -------------- | ---------------- | --- | ---------- | --- |
|     | RTX4090(Baseline)    |     |               | 58.8 |     | 18.3           |                  | 6.0 | 109.0      |     |
|     | RTX4090+AMD9950X3D   |     |               | 18.5 |     | 3.0            |                  | 1.1 | 16.4       |     |
|     | AMD8060S+AMDAIMAX395 |     |               | 33.6 |     | 9.4            |                  | 4.2 | 19.6       |     |
|     | M5Max                |     |               | 75.0 |     | 18.8           |                  | 4.5 | 16.8       |     |
4.5 Cross-PlatformEvidence
Finally,wereportApplemacOS,AMDROCm,andIntelXPUresultstoshowpracticaltrainability
outside a single CUDA-centric setup, without claiming absolute throughput parity with the main
Linux/CUDA workstation. Table 3 summarizes wall-clock training time across representative
devices and tasks. Cross-platform execution is a practical consequence of the UniLab interface
design.
5 Conclusion
This paper presented UniLab, a heterogeneous CPU-simulation / GPU-learning architecture for
robot RL. By coordinating data movement, buffering, and synchronization through a unified
runtime, UniLab improves end-to-end training efficiency by 3–10× across multiple robot
embodiments, control workloads, and practical algorithms, while reducing dependence on the
NVIDIACUDA-basedsoftwarestackandsupportingApplemacOS,AMDROCm,andIntelXPU
backends. Theseresultsshowthatefficienttrainingdependsonhigh-throughput,well-coordinated
simulation-learningexecution,ratherthanrequiringphysicstoresideontheGPU;UniLabtherefore
provides a systems counterexample showing that the design space for efficient training is broader
thanthecurrentGPU-centricdefaultsuggests.
6 Discussion
OurclaimisnotthatGPU-residentsimulationisobsolete. GPUsimulationmayremainpreferable
whensimulatorthroughputisnolongerthebottleneckorwhenlargeraccelerator-richconfigurations
areabetterfit. UniLabbroadensthedesignspaceforsimulation-dominatedrobotcontrol.
ThespeedofaGPU-centricstackcomesfromtwocoupleddesigns: simulation,rolloutcollection,
and learning share a low-overhead execution path, while the physics backend is organized as
GPU-friendly parallel computation. The former is a training-system organization principle; the
latter is one hardware path for realizing it. This path is effective for regular, dense, and statically
shaped computation, but dynamic contacts, sparse interactions, collision handling, and constraint
solving can increase backend engineering pressure and make implementations depend more on
specialization,buffertuning,andstatic-allocationassumptions. Thus,thispaperdoesnotchallenge
thevalueofGPUsimulators;itchallengesthenecessityclaimthatefficientrobotRLtrainingmust
useGPU-residentphysics.
8

7 Limitations
The main limitations follow from three assumptions. First, UniLab is most advantageous when
trainingissimulation-dominatedandsimulationcanbemeaningfullydecoupledfromlearning; on
strictlysynchronizedpipelinesorvision-basedworkloadsdominatedbyrendering,perception,and
representation learning, CPU/GPU decoupling may not hide the dominant cost and may therefore
yield smaller gains. Second, our claim concerns end-to-end training efficiency in a controlled
single-CPU/single-GPUsetting,notabsolutepeakthroughputatextremescale;multi-GPUorlarger
distributed configurations may change the bottleneck and the hardware-allocation tradeoff. Third,
thecurrentimplementationfocusesonrigid-bodyrobotcontrolratherthandeformableobjects,soft
bodies, orfluids. Futureworkshouldextendthesameruntimeanalysistovision-dominatedtasks,
larger systems, and non-rigid physics to identify where the heterogeneous design fails and what
scheduling,communication,orbackendchangesareneeded.
Acknowledgments
We thank Apple and AMD for providing hardware platforms for development and evaluation,
and for assisting with platform adaptation. We are also sincerely grateful to the mjlab team for
open-sourcing their excellent work, whose engineering practices provided valuable reference for
thisproject. WealsothankearlyusersofUniLabandthestudentsinTsinghuaUniversity’sSpring
2026DeepReinforcementLearningcoursefortheiruseandfeedback.
References
[1] V.Makoviychuk,L.Wawrzyniak,Y.Guo,M.Lu,K.Storey,M.Macklin,D.Hoeller,N.Rudin,
A.Allshire,A.Handa,etal. Isaacgym: Highperformancegpu-basedphysicssimulationfor
robotlearning. arXivpreprintarXiv:2108.10470,2021.
[2] M. Mittal, P. Roth, J. Tigue, A. Richard, O. Zhang, P. Du, A. Serrano-Mun˜oz, X. Yao,
R. Zurbru¨gg, N. Rudin, et al. Isaac lab: A gpu-accelerated simulation framework for
multi-modalrobotlearning. arXivpreprintarXiv:2511.04831,2025.
[3] K. Zakka, B. Tabanpour, Q. Liao, M. Haiderbhai, S. Holt, J. Y. Luo, A. Allshire, E. Frey,
K.Sreenath,L.A.Kahrs,etal. Mujocoplayground. arXivpreprintarXiv:2502.08844,2025.
[4] K. Zakka, Q. Liao, B. Yi, L. Le Lay, K. Sreenath, and P. Abbeel. mjlab: A Lightweight
Framework for GPU-Accelerated Robot Learning. 2026. URL https://arxiv.org/abs/
2601.22074.
[5] S.Tao,F.Xiang,A.Shukla,Y.Qin,X.Hinrichsen,X.Yuan,C.Bao,X.Lin,Y.Liu,T.kaiChan,
Y. Gao, X. Li, T. Mu, N. Xiao, A. Gurha, V. N. Rajesh, Y. W. Choi, Y.-R. Chen, Z. Huang,
R.Calandra,R.Chen,S.Luo,andH.Su.Maniskill3:Gpuparallelizedroboticssimulationand
renderingforgeneralizableembodiedai. Robotics: ScienceandSystems,2025.
[6] G. Authors. Genesis: A generative and universal physics engine for robotics and beyond,
December2024. URLhttps://github.com/Genesis-Embodied-AI/Genesis.
[7] J.Weng,M.Lin,S.Huang,B.Liu,D.Makoviichuk,V.Makoviychuk,Z.Liu,Y.Song,T.Luo,
Y. Jiang, et al. Envpool: A highly parallel reinforcement learning environment execution
engine. AdvancesinNeuralInformationProcessingSystems,35:22409–22421,2022.
[8] Z. Wu, E. Liang, M. Luo, S. Mika, J. E. Gonzalez, and I. Stoica. RLlib flow: Distributed
reinforcementlearningisadataflowproblem.InConferenceonNeuralInformationProcessing
Systems(NeurIPS),2021. URLhttps://proceedings.neurips.cc/paper/2021/file/
2bce32ed409f5ebcee2a7b417ad9beed-Paper.pdf.
9

[9] J.Weng,H.Chen,D.Yan,K.You,A.Duburcq,M.Zhang,Y.Su,H.Su,andJ.Zhu. Tianshou:
A highly modularized deep reinforcement learning library. Journal of Machine Learning
Research,23(267):1–6,2022. URLhttp://jmlr.org/papers/v23/21-1127.html.
[10] J. Suarez. PufferLib 2.0: Reinforcement learning at 1m steps/s. Reinforcement Learning
Journal,6:1378–1388,2025.
[11] I. Akkaya, M. Andrychowicz, M. Chociej, M. Litwin, B. McGrew, A. Petron, A. Paino,
M.Plappert,G.Powell,R.Ribas,etal. Solvingrubik’scubewitharobothand. arXivpreprint
arXiv:1910.07113,2019.
[12] Y.Kim,H.Oh,J.Lee,J.Choi,G.Ji,M.Jung,D.Youm,andJ.Hwangbo.Notonlyrewardsbut
also constraints: Applications on legged robot locomotion. IEEE Transactions on Robotics,
40:2984–3003,2024.
[13] O. Pearce. Exploring utilization options of heterogeneous architectures for multi-physics
simulations. ParallelComputing,87:35–45,2019.
[14] J.Schulman,F.Wolski,P.Dhariwal,A.Radford,andO.Klimov.Proximalpolicyoptimization
algorithms. arXivpreprintarXiv:1707.06347,2017.
[15] T.Haarnoja,A.Zhou,P.Abbeel,andS.Levine.Softactor-critic:Off-policymaximumentropy
deep reinforcement learning with a stochastic actor. In International conference on machine
learning,pages1861–1870.Pmlr,2018.
[16] Y.JiaandJ.Wu. Mujocouni:Persistentbatchedruntimeprimitivesformujoco. arXivpreprint
arXiv:2605.24922,2026.
[17] MotphysTeam. Motrixsim: Aphysicssimulationengineforroboticsandembodiedai,2026.
URLhttps://motrixsim.readthedocs.io/. Pythonbinarypackage.
[18] C. D. Freeman, E. Frey, A. Raichuk, S. Girgin, I. Mordatch, and O. Bachem. Brax–a
differentiable physics engine for large scale rigid body simulation. arXiv preprint
arXiv:2106.13281,2021.
[19] J.Liang,V.Makoviychuk,A.Handa,N.Chentanez,M.Macklin,andD.Fox.Gpu-accelerated
robotic simulation for distributed reinforcement learning. In Conference on Robot Learning,
pages270–282.PMLR,2018.
[20] E.Todorov,T.Erez,andY.Tassa. Mujoco:Aphysicsengineformodel-basedcontrol. In2012
IEEE/RSJinternationalconferenceonintelligentrobotsandsystems,pages5026–5033.IEEE,
2012.
[21] J. Hwangbo, J. Lee, A. Dosovitskiy, D. Bellicoso, V. Tsounis, V. Koltun, and M. Hutter.
Learningagileanddynamicmotorskillsforleggedrobots. ScienceRobotics,4(26):eaau5872,
2019.
[22] G.B.MargolisandP.Agrawal. Walktheseways: Tuningrobotcontrolforgeneralizationwith
multiplicityofbehavior. InConferenceonRobotLearning,pages22–31.PMLR,2023.
[23] G. B. Margolis, G. Yang, K. Paigwar, T. Chen, and P. Agrawal. Rapid locomotion via
reinforcementlearning.TheInternationalJournalofRoboticsResearch,43(4):572–587,2024.
[24] Z.Wang,Y.Jia,L.Shi,H.Wang,H.Zhao,X.Li,J.Zhou,J.Ma,andG.Zhou.Arm-constrained
curriculum learning for loco-manipulation of a wheel-legged robot. In 2024 IEEE/RSJ
International Conference on Intelligent Robots and Systems (IROS), pages 10770–10776.
IEEE,2024.
10

[25] T.He,J.Gao,W.Xiao,Y.Zhang,Z.Wang,J.Wang,Z.Luo,G.He,N.Sobanbab,C.Pan,etal.
Asap: Aligning simulation and real-world physics for learning agile humanoid whole-body
skills. arXivpreprintarXiv:2502.01143,2025.
[26] Z.Cao, L.Yan, Y.Zhang, S.Chen, J.Ma, T.Zhan, S.Fu, Y.Jia, C.Lu, andY.Gao. Hiwet:
Hierarchicalworld-frameend-effectortrackingforlong-horizonhumanoidloco-manipulation.
arXivpreprintarXiv:2602.06341,2026.
[27] S.Bharthulwar, S.Tao, andH.Su. Staggeredenvironmentresetsimprovemassivelyparallel
on-policy reinforcement learning. Advances in Neural Information Processing Systems, 38:
133342–133375,2026.
[28] A. A. Shahid, Y. Narang, V. Petrone, E. Ferrentino, A. Handa, D. Fox, M. Pavone, and
L.Roveda. Scalingpopulation-basedreinforcementlearningwithgpuacceleratedsimulation.
arXivpreprintarXiv,2404,2024.
[29] S.Fujimoto,H.Hoof,andD.Meger. Addressingfunctionapproximationerrorinactor-critic
methods. InInternationalconferenceonmachinelearning,pages1587–1596.PMLR,2018.
[30] Y.Seo, C.Sferrazza, H.Geng, M.Nauman, Z.-H.Yin, andP.Abbeel. Fasttd3: Simple, fast,
andcapablereinforcementlearningforhumanoidcontrol. arXivpreprintarXiv:2505.22642,
2025.
[31] Y.Seo,C.Sferrazza,J.Chen,G.Shi,R.Duan,andP.Abbeel. Learningsim-to-realhumanoid
locomotionin15minutes. arXivpreprintarXiv:2512.01996,2025.
[32] D. Kim, Y. Lee, M. Park, K. Kim, I. Nahendra, T. Seno, S. Min, D. Palenicek,
F. Vogt, D. Kragic, et al. Flashsac: Fast and stable off-policy reinforcement learning for
high-dimensionalrobotcontrol. arXivpreprintarXiv:2604.04539,2026.
[33] M.Luo,J.Yao,R.Liaw,E.Liang,andI.Stoica. Impact: Importanceweightedasynchronous
architectureswithclippedtargetnetworks. arXivpreprintarXiv:1912.00167,2019.
[34] Google DeepMind. Mujoco warp (mjwarp), 2026. URL https://mujoco.readthedocs.
io/en/3.3.7/mjwarp/. Softwaredocumentation.
11

Appendix
TableofContents
A Off-PolicyReplayPathCaseStudy 12
A.1 BaselineGPU-CacheSACPath. . . . . . . . . . . . . . . . . . . . . . . . . . . . 13
A.2 Sample-Before-TransferReplayPipeline . . . . . . . . . . . . . . . . . . . . . . . 13
A.3 Trace-BasedAttribution. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 13
A.4 AblatingthePathfromGPU-CacheSACtoSample-Before-Transfer . . . . . . . . 15
A.5 BufferandCommunicationOverhead . . . . . . . . . . . . . . . . . . . . . . . . 17
A.6 WhattheTracesDoandDoNotEstablish . . . . . . . . . . . . . . . . . . . . . . 17
B DomainRandomizationBackendsandLifecycle 17
B.1 RuntimeLifecycle . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 17
B.2 BackendImplementation . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 18
B.3 SupportedRandomizationFamilies. . . . . . . . . . . . . . . . . . . . . . . . . . 19
B.4 ImplicationsforCross-BackendExperiments . . . . . . . . . . . . . . . . . . . . 19
C TaskandAlgorithmDetails 20
C.1 TrainingCurves . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 20
C.2 BidirectionalSim2SimCross-BackendValidation . . . . . . . . . . . . . . . . . . 22
C.3 TaskSpecifications . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23
C.3.1 Locomotion . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 23
C.3.2 MotionTracking . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 30
C.3.3 Manipulation-Locomotion . . . . . . . . . . . . . . . . . . . . . . . . . . 32
C.3.4 Dexterous-HandandIn-HandManipulation . . . . . . . . . . . . . . . . . 34
C.4 AlgorithmHyperparameters . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 35
C.4.1 PPO . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 35
C.4.2 APPO . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 38
C.4.3 SAC . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 38
A Off-PolicyReplayPathCaseStudy
Thissectioncomplementsthesystem-attributionanalysisinSection4.3withadetailedcasestudy
oftheSACreplay-basedexecutionpath.
Unless otherwise stated, all timeline statistics in this section (Appendix A) are computed from
Perfetto traces collected on the same A100 machine: one NVIDIA A100 80GB PCIe GPU
with driver 560.35.05 and CUDA 12.6, two Intel Xeon Gold 5320 CPUs with 104 logical
CPU threads, and 188GiB system memory. A learner cycle is measured from the end of one
learner/weight sync write event to the end of the next such event; the first five cycles are
12

discarded as warmup, and each retained cycle corresponds to 2048 environment steps. Reported
per-cyclevaluesaremeansovertheretainedcycles.
A.1 BaselineGPU-CacheSACPath
WeuseSAC-AtodenotethestraightforwardSACbaselineusedforcomparisoninthiscasestudy,
not a separate SAC algorithm. It corresponds to the GPU-cache replay path before the sample-
before-transferpipeline. Thisbaselineisalreadyaheterogeneousdesign: aCPUcollectorprocess
runsaCPUactorsynchronizedfromlearnerweights,advancesthebatchedenvironment,andwrites
transitions into shared CPU replay storage. The learner process holds the SAC actor and critic
networksontheacceleratorandperiodicallypublishesupdatedactorweightsbacktothecollector.
ThisorganizationalreadyseparatesCPUsimulationfromGPUlearning.
Theremainingcostliesinthereplayboundary. IntheCUDApath,thelearnermaintainsadevice-
sidereplaycache. Whenthelearnersamples,newlyappendedreplayrowsarelazilysynchronized
intothisGPUcache,randomindicesaremovedtothedevice,andthesampledbatchisgatheredfrom
thecachedreplaytensorsbeforeSACupdatesareperformed. Thus,replay-cachemaintenanceand
randomreplayaccessarepartofthelearner’shotupdatepath. ThisincreasesGPU-residentreplay
storageandinsertsreplay-managementworkbeforethecritic,actor,andtarget-networkupdates.
A.2 Sample-Before-TransferReplayPipeline
UniLab moves the replay boundary from the replay buffer to the sampled batch. The collector
still performs CPU actor inference, environment stepping, and replay insertion. Once the learner
requeststhenexttrainingbatch,thecollectorsamplesrowsfromareplaysnapshotontheCPUand
packsthemintooneoftwosharedpackslots. OnCUDA,thesepackslotsareregisteredaspinned
host-memorysourcesforasynchronousH2Dtransfer.Alearner-sidebackgroundH2Dsubmitthread
thentransfersthepackedbatchintothecoldGPUbatchslotwhilethelearnerconsumesthecurrent
hotslot.
This distinction matters for interpreting the memory path. The main replay storage remains CPU
sharedreplaystorage;theCUDA-specificpinned-memorypathappliestothesharedpackslotsused
asH2Dsources. Thelearnerconsumesdevice-residentviewsfromthehotGPUbatchslot,executes
SACcritic,actor,entropy-temperature,andtarget-networkupdates,andswapsthehotandcoldslots
atthenextbatchhandoff.
Figure 9 places the baseline and double-buffer paths on the same retained learner-cycle time axis.
In the figure, env, replay, H2D, sync, stall, and gap denote environment stepping, replay-buffer
insertion, host-to-device transfer, actor-weight publication or consumption, waiting, and the delay
from learner weight publication to the next first learner update, respectively. The key comparison
is the change in replay ownership and timing: the baseline keeps replay sampling and lazy
synchronization on the learner-side critical path, whereas the double-buffer path prepares the next
sampledbatchearlyenoughtooverlapCPUpackingandH2DtransferwithGPUlearnerupdates.
A.3 Trace-BasedAttribution
We analyze A100 Perfetto traces for the baseline GPU-cache SAC path and the UniLab
double-bufferpath. Thesetracesprovidemechanismandtimingevidence: theyshowwherereplay
sampling, H2D transfer, learner updates, and weight publication occur. Because learner-update
kernelsalsodifferindurationacrosstraces,theattributionisinterpretedtogetherwiththeablation
below.
Figure 10 summarizes the optimized trace from four complementary views. Panel A compares
standalone simulator throughput with throughput inside the SAC training pipeline; the reported
efficiency is their ratio. Panels B–D use the retained learner-cycle definition above and report
per-cycle means. In Panel B, Lrn, Env, Pack, Inf, H2D, Add, and Sync denote learner update,
environment stepping, CPU replay sampling and batch packing, collector CPU actor inference,
13

Cycle: 211ms → 136ms Collector stall: 103ms → <1ms Resume gap: 12.3ms → 2.9ms
0 105 136 211 ms
Baseline SAC-A: GPU-cache learner path read ~4ms
CPU actor env + replay ~105ms trainer stall ~103ms
+ env
GPU learner GPU updates ~196ms
+ sync
stall + sample/H2D ~4ms resume gap 12.3ms
Optimized SAC: overlapped sampling with asynchronous H2D
CPU actor CPU/env+replay ~83ms
+ env
Sampling CPU sample + H2D ~9.4ms
+ H2D stall 0.18ms
GPU learner GPU learner updates ~132ms resume gap 2.9ms
+ sync
GPU learner overlaps CPU sampling + H2D 75ms reduction per cycle
CPU/env sample/H2D GPU update wait/gap
A100 mean cycle, 2048 steps/cycle
Figure 9: Baseline SAC-A and optimized SAC learner-cycle timelines on A100. Durations are means per
retainedlearnercycleusingthecycledefinitionabove;eachcyclecorrespondsto2048environmentsteps.The
optimizeddouble-bufferpathreducescycletimefrom211msto136ms,collectorstallfrom103mstobelow
1ms,andresumegapfrom12.3msto2.9ms.
49.7k Efficiency 30.3% learnerUpdate 131.6 ms (96.7%)
50.0k envStep 75.0 ms (55.1%)
replayPack 6.3 ms (4.6%)
actorInfer 6.3 ms (4.6%)
25.0k 15.0k H2D 3.1 ms (2.3%)
replayAdd 2.0 ms (1.5%)
weightSync 0.9 ms (0.7%) ms/cycle
0
Standalone Training 0 50 100 150
A. Batching B. Runtime
65.5% cycle, 99.5% collector
actorInfer
cycle 136.1 ms 6.3 ms
7.0%
learnerUpdate 131.6 ms
Other
collectorActive 89.5 ms 83.3 ms
Collector 89.5 ms
overlap 89.1 ms ms/cycle Median 6.2 ms
0 50 100 150 0 20 40 60 80
C. Overlap D. Inference
Figure 10: System-attribution summary for the optimized SAC trace. Panel A reports batching efficiency,
with Eff. defined as training-pipeline throughput divided by standalone simulator throughput. Panels B–D
summarizeruntimecomponents,simulation-learningoverlap,andcollector-sideCPUactor-inferencecost.
14

host-to-devicebatchtransfer,replay-bufferinsertion,andactor-weightpublicationorconsumption.
PanelCgroupsthecycle-leveltimingterms: Cyc,Lrn,Col,andOvldenotelearner-cycleduration,
learner-update time, collector-active time, and their overlap. Panel D isolates collector-side actor
inferencebycomparingitwithtotalcollector-activetime.
In the traced 500-iteration window, the double-buffer path reduces training time from 107.50s to
70.58s,a34.34%reductioninwall-clocktime. Afterdroppingthefirstfivecycles,themeanlearner
cycledecreasesfrom211.31msto136.10ms. With2048environmentstepsperlearnercycle,this
correspondstoanincreasefrom9.69kto15.05kenvironmentstepspersecond.
The clearest change is on the replay hot path. In the baseline trace, learner/replay sample
takes3.64msonaverageandincludeslazyreplaysynchronization, withreplay/h2d lazy sync
taking1.88msontheCPUwrapperpathandgpu/replay h2d lazy synctaking1.84msonthe
GPU event path. In the UniLab trace, learner-side replay consumption is reduced to 0.23ms on
average. Replay preparation still exists, but it is moved out of the learner hot path: CPU packing
takes6.30ms,andGPUH2Dtransfertakes3.13ms,while99.50%ofcollector-activetimeoverlaps
withlearnerupdates. TheremainingH2Dhandoffwaitisabout0.055mspercycle.
A.4 AblatingthePathfromGPU-CacheSACtoSample-Before-Transfer
Thetrace-basedattributiongivestimingevidenceforthereplay-pathchange,butitdoesnotbyitself
separate replay-data residency from transfer orchestration. We run a SAC replay-path ablation on
thesameA100machine. ThefourvariantspreserveSAC’sobjectiveandupdateequations;onlythe
replay boundary changes, moving from learner-side GPU-cache replay to sampled-batch transfer
andthentotheCPU-pinneddouble-bufferpath.
The variants form a controlled migration chain. C is the old-SAC-like GPU-cache compatibility
control: replay samples are still served through a learner-side GPU replay cache with lazy
synchronization of newly appended rows and random gather from cached replay tensors. B keeps
thesameGPU-cachereplayorganization,butusesthemodernablationframework;itsimprovement
over C therefore primarily reflects scheduling and runner-level overlap rather than a change in
replayresidency. AremovestheGPU-cacheresidentreplaycomponentandmovestheboundaryto
sampled-batchtransfer,butitusesasynchronous/pageabletransferpathratherthanthefullpinned
asynchronous pipeline. The baseline keeps A’s CPU-resident sampled-batch boundary and adds
registeredpinnedpackslots,one-tickasynchronousH2D,andhot/coldGPUbatchslots.
The figure reports four complementary measurements. Panel A reports wall-clock E2E time as
means over three seeds, with sample-standard-deviation error bars. Panel B reports learner-cycle
medians, with diamonds marking p95 cycle time. Panel C focuses on the learner-side replay
boundary. WereportReplaysamplemeanusingthelearner-sidelearner/replay sampleevent:
in GPU-cache variants, this event includes learner-side sampling, gather, and lazy replay-cache
synchronization; in sampled-batch variants, it measures the learner-side batch handoff and
consumption path, not the CPU packing work that is scheduled earlier. GPU wait mean reports
learner-sideboundarywaitingbeforeupdatecomputation,includingwaitingfordataorreplay-batch
readiness,andshouldnotbereadastotalkernel-levelGPUidletime. Theblackmarksindicatethe
correspondingmedians. PanelDreportsthemeanpeakCUDAreservedmemoryandseparatesthe
replay-cacheportionastheGPU-cachecomponent. ThiscomponentispresentinCandBbecause
thelearnermaintainsafullGPUreplaycache,andabsentinAandthebaselinebecausetheykeep
replayCPU-residentandretainonlysampledGPUbatchslots.
Withthesedefinitions,Figure11showsthatthevariantsaffectdifferentmetricsfordifferentreasons.
MovingfromCtoBimproveswall-clocktimewithintheGPU-cachefamily,whileCUDAreserved
memoryremainsunchanged;thisisconsistentwithaschedulingimprovementratherthanamemory-
residencychange. MovingfromBtoAremovesthemeasuredGPU-cachecomponentandreduces
peak CUDA reserved memory from 2362MB to 692MB, but the synchronous/pageable sampled-
batchhandoffbecomesvisibleonthelearnerboundary,increasingreplay-sampletimeandhurting
E2Etime. MovingfromAtothebaselinekeepsthelow-memoryCPU-residentreplaydesignand
15

)s( emit E2E llaW
|     | 101.2 |     |      |     |     | )sm( emit elcyC |       |     |     |     |
| --- | ----- | --- | ---- | --- | --- | --------------- | ----- | --- | --- | --- |
|     | 100   |     |      |     |     |                 | 195.6 |     |     | p95 |
|     |       |     | 94.0 |     |     | 200             |       |     |     |     |
179.3
89.7
|     | 90                |     |     |          |     | 175                     |                  | 170.5 |     |          |
| --- | ----------------- | --- | --- | -------- | --- | ----------------------- | ---------------- | ----- | --- | -------- |
|     |                   |     |     | 85.0     |     |                         |                  |       |     | 160.6    |
|     | 80                |     |     |          |     | 150                     |                  |       |     |          |
|     | C                 |     | B A | baseline |     |                         | C                | B     | A   | baseline |
|     | A. Wall-clock E2E |     |     |          |     | )BM( devreser ADUC kaeP | B. Learner cycle |       |     |          |
)sm( tiaw UPG / yalpeR
|     |     | Replay mean |     |     |     | 3k  |      |      | CUDA reserved |     |
| --- | --- | ----------- | --- | --- | --- | --- | ---- | ---- | ------------- | --- |
|     | 15  | GPU wait    |     |     |     |     | 2362 | 2362 |               |     |
GPU cache
|     |     | Median | 10.19 |     |     | 2k  |     |     |     |     |
| --- | --- | ------ | ----- | --- | --- | --- | --- | --- | --- | --- |
10
|     | 4.75 | 4.73 | 4.56 4.71 | 4.15 |     | 1k  |     |     | 692 | 692 |
| --- | ---- | ---- | --------- | ---- | --- | --- | --- | --- | --- | --- |
|     | 5    | 2.86 |           |      |     |     |     |     |     |     |
0.35
|     | 0                 |     |     |          |     | 0   |                     |     |     |          |
| --- | ----------------- | --- | --- | -------- | --- | --- | ------------------- | --- | --- | -------- |
|     | C                 |     | B A | baseline |     |     | C                   | B   | A   | baseline |
|     | C. Replay handoff |     |     |          |     |     | D. Memory footprint |     |     |          |
Figure 11: C-to-baseline ablation for the SAC replay path. Wall-clock E2E bars are three-seed means with
sample-standard-deviationerrorbars.Learner-cyclebarsaremedians,withdiamondsmarkingp95cycletime.
PanelCreportslearner-sidereplay-sampleandboundary-waitstatistics;PanelDreportspeakCUDAreserved
memoryandthemeasuredGPU-cachecomponent.
changesthetransfermechanisminstead:pinnedsharedpackslots,one-tickasynchronousH2D,and
hot/cold GPU slots reduce learner-side replay consumption from 10.19ms to 0.35ms and reduce
wall time from 94.04s to 85.04s without reintroducing the GPU-cache component. Relative to
C,thefinalbaselinereduceswalltimefrom101.23sto85.04swhilealsoremovingthemeasured
GPU-cachefootprint.
This ablation connects the trace-based attribution to the end-to-end result. The gain comes from
relocatingthereplay-runtimeboundary,notfromchangingtheSACloss. Replayworkremains,but
shifts in ownership and timing: the learner consumes ready device batches instead of maintaining
andsamplingacapacity-scaledGPUreplaycacheonthehotupdatepath.
|     |     |     |     |     |     |     |     | Incremental H2D | CPU pre-sample |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --------------- | -------------- | --- |
|     |     |     |     |     |     |     |     | Device sample   | Sampled H2D    |     |
)sm( kcit renrael rep emit naeM
6
CPU pre-sample = 2.34x current
| Headline total |     |     | 11.6%  (15.8 ms) |     |     |     |     |     |     |     |
| -------------- | --- | --- | ---------------- | --- | --- | --- | --- | --- | --- | --- |
4.81 ms
|               |             |     |                | 7.4%  (10.1 ms) |     |     | 4   |         |     |      |
| ------------- | ----------- | --- | -------------- | --------------- | --- | --- | --- | ------- | --- | ---- |
| Data movement |             |     |                |                 |     |     |     |         |     | 2.25 |
|               | Weight sync |     | 3.5%  (4.8 ms) |                 |     |     |     | 2.05 ms |     |      |
2
2.56
| Boundary wait |     | 0.7%  (1.0 ms) |     |     |     |     |     | 1.84 |     |     |
| ------------- | --- | -------------- | --- | --- | --- | --- | --- | ---- | --- | --- |
0
|     |     | 0 2 | 4 6 | 8 10 | 12  |     |     | Current | CPU pre-sample |     |
| --- | --- | --- | --- | ---- | --- | --- | --- | ------- | -------------- | --- |
Share of learner cycle (%)
|     |     | A. Timeline overhead share |     |     |     |     | B. Replay placement cost |     |     |     |
| --- | --- | -------------------------- | --- | --- | --- | --- | ------------------------ | --- | --- | --- |
Figure 12: SAC buffer and communication overhead. Values in Panel A are means per retained learner
cyclefromtheoptimizedSACtimeline;PanelAgroupscounteddata-movement,weight-synchronization,and
boundary-waitoverheadbyshareofthemeanlearnercycle,withsignal-readycontextshownseparately.Panel
B reports an auxiliary replay-placement benchmark comparing current incremental-transfer/device-sampling
andCPUpre-sampleplussampled-batchH2Dschemes.
16

A.5 BufferandCommunicationOverhead
Figure12combinesatimelineoverheadbreakdownwithanauxiliaryreplay-placementbenchmark.
Panel A breaks down the data movement, synchronization, and residual waiting observed inside
theoptimizedSACtimeline. Weseparatethecountedoverheadintothreegroups. Datamovement
coversCPU-sidereplaysamplingandbatchpacking,H2Dsubmission,H2Dtransfer,andtransfer-
completionwait. Weightsynccoverslearnerweightpublication,device-to-host(D2H)weightcopy,
andcollector-sideweightread/updatechecking. Boundarywaitcoverscollectorandlearnerwaiting
at the cycle boundary. The figure also reports signal-ready context separately: the collector has
already prepared the next batch and issued a ready signal, while the learner has not yet reached
thenextbatchboundary. Wetreatthisintervalasschedulingandbackpressurecontextratherthan
data-copycostorlearner-updatewaiting,soitisexcludedfromthecountedoverheadtotal.
In this trace, the counted data-movement, synchronization, and boundary-wait overhead total is
15.82mspercycle, or11.62%ofthe136.10msmeanlearnercycle. Datamovementisthelargest
countedcomponentat10.07mspercycle,weightsynchronizationcontributes4.79ms,andresidual
boundarywaitingcontributes0.96ms. Thesignal-readyintervalislarger,butitisreportedoutside
theheadlinetotalbecauseitdescribesreadinessandbackpressurecontextratherthanadirectdata-
copyorlearner-waitcost.
PanelBprovidesanauxiliaryreplay-placementbenchmarkunderthesameconfiguration,separate
fromtheretained-cycleaccountinginPanelA.Inthisbenchmark,thecurrentplacementcombines
incremental H2D with device-side random sampling and costs 2.05ms per learner tick. A CPU
pre-sampleplussampled-batchH2Dplacementcosts4.81msperlearnertick,or2.34×thecurrent
placementcost. Thiscomparisonisnotpartofthecountedtimelineoverhead;instead,itshowswhy
replayplacementmustbeinterpretedtogetherwiththeoverlapandschedulingstructureofthefull
pipeline.
A.6 WhattheTracesDoandDoNotEstablish
The traces establish the execution-path change and its timing consequences: replay preparation
moves from learner-side GPU-cache sampling to collector-side CPU packing plus asynchronous
H2D staging, new-batch preparation is almost fully overlapped with learner computation, and
actor-weightpublicationremainsanexplicitsynchronizationboundary.Theydonot,bythemselves,
establishstrongerclaimsaboutpeakGPUmemory,exactH2Dvolumereduction,orcross-algorithm
generality;thoseclaimsrequirememorycounters,bytecountersforthebaselinelazy-syncpath,or
correspondingTD3/FlashSACmeasurements.
B DomainRandomizationBackendsandLifecycle
Domain randomization in UniLab is implemented as a task/backend contract rather than as an
algorithm-level feature. A task-owned DomainRandomizationProvider samples the quantities
that are meaningful for the workload, while the simulator backend advertises which physical
overrides it can apply. The runtime mediator, DomainRandomizationManager, validates this
contract,appliescold-startmodelvariantsbeforebackendmaterialization,injectsresetpayloadsinto
sparseenvironmentresets,andschedulesintervalperturbationsbeforephysicsstepping. Thiskeeps
randomizationtiedtothesamelifecyclethatalreadycontrolsstateresetandbatchedsimulation.
B.1 RuntimeLifecycle
Table 5 separates the lifecycle stages used by the current implementation. The important systems
detailisthatreset-timerandomizationissparse: onlytheenvironmentslistedinenv idsreceivea
newstateandanewrandomizationpayload. Intervalrandomizationisdifferent: itischeckedonce
per vectorized environment step, before the backend advances physics. Per-observation noise and
17

Table4: Trace-basedattributionsummaryfortheSACreplaypath. Thetablereportswhatcanbesupported
directlybytheA100timelinetracesandwhereadditionalevidenceisneeded.
| Mechanism | Evidencefromtraces | Strength | Safeinterpretation |
| --------- | ------------------ | -------- | ------------------ |
End-to-endcycle Tracedwindowdecreasesfrom Strong Thedouble-bufferpathis
| reduction | 107.50sto70.58s;post-warmup  |     | 1.52×fasteroverthe   |
| --------- | ---------------------------- | --- | -------------------- |
|           | cycledecreasesfrom211.31msto |     | tracedwindowand1.55× |
|           | 136.10ms.                    |     | fasterperpost-warmup |
cycle.
Learnerreplayhot learner/replay sampledecreases Strong Replaysamplingnolonger
| path | from3.64msto0.23msonaverage. |     | dominatesthelearner-side |
| ---- | ---------------------------- | --- | ------------------------ |
handoffbeforeSAC
updates.
Collector-sideCPU OptimizedtracerecordsCPU-side Strong Randomreplaypackingis
| packing | replaypackingwith32768sampled |     | performedontheCPUside |
| ------- | ----------------------------- | --- | --------------------- |
|         | transitionsperbatch.          |     | beforetransfer.       |
AsynchronousH2D CPUpacktakes6.30msandGPU Strong Replaypreparationisstill
| preparation | H2Dtakes3.13ms;99.50%of          |     | present,butitislargely |
| ----------- | -------------------------------- | --- | ---------------------- |
|             | collector-activetimeoverlapswith |     | hiddenbehindGPUlearner |
|             | learnerupdates.                  |     | computation.           |
Hot/coldGPUbatch Optimizedtracerecordsalternating Strong Thelearnerconsumesone
| slots | hot/coldbatch-slotswapsbetween |     | devicebatchwhilethenext |
| ----- | ------------------------------ | --- | ----------------------- |
|       | thetwodeviceslots.             |     | batchispreparedinthe    |
coldslot.
Pinnedsharedpack Tracemetadatareportsregistered Medium–strong Thetracesupportspinned
| slots | pinnedsharedhostmemory,with |     | H2Dsourceslots;the     |
| ----- | --------------------------- | --- | ---------------------- |
|       | pinnedanddirect-pinnedflags |     | implementationshouldbe |
|       | enabled.                    |     | citedforthe            |
cudaHostRegister
detail.
Actor-weight learner/weight sync write Strong Actor-weightpublication
| publication | decreasesfrom1.71msto0.94ms;    |     | remainsasynchronous   |
| ----------- | ------------------------------- | --- | --------------------- |
|             | weight-copyeventsremainvisible. |     | boundary,althoughitis |
smallinthistrace.
GPUreplaymemory Thenewtracetransfers56.36MBfor Estimate Thissupportsa
footprint 32768samples;twosampledbatch memory-footprintestimate,
|     | slotsareabout112.7MBunderthis |     | notameasured      |
| --- | ----------------------------- | --- | ----------------- |
|     | layout.                       |     | peak-memoryclaim. |
commandsamplingaretask-sideoperationsanddonotrequirebackend-specificphysicaloverrides,
althoughtheymaydependonbackendsensorreadsthatmustcompletefirst.
B.2 BackendImplementation
MuJoCoUni. MuJoCoUni implements reset-time randomization through
BatchEnvPool.reset(env ids, initial state, randomization=None) which receives
both the new physics state and an optional dictionary of model-field patches. Each payload has
leading dimension len(env ids), so reset cost and randomization work scale with the number
of environments that actually terminate. Fields that affect MuJoCo derived constants are patched
before the reset/forward path and refreshed with mj setConst; other fields are written directly.
Geometry-level changes are handled before runtime execution by compiling compatible model
variantsandassigningeachvectorizedenvironmenttoonevariantbeforethepoolismaterialized.
MotrixSim. MotrixSim implements the same task/backend contract with MotrixSim-native
override APIs. During set state, the backend resets the selected data slice, clears staged
body forces for those environments, applies init-time geometry-size overrides, applies supported
18

| Lifecycle | Trigger | Owner | Randomizedstate |
| --------- | ------- | ----- | --------------- |
Backend DRinithookbefore Taskproviderbuilds Persistentmodelorgeometry
| initialization | backend | aninitplan;backend   | variantsassignedper |
| -------------- | ------- | -------------------- | ------------------- |
|                |         | materializesvariants | environment,suchas  |
materialize()
object-scalevariantsexpressed
throughGeomSizeOverride.
Sparsereset Environmentcreation Taskprovidersamples Initialpose,velocity,commands,
|           | andanylaterresetof   | resetstateandoptional | cachedobject/graspstate,mass,  |
| --------- | -------------------- | --------------------- | ------------------------------ |
|           | terminatedor         | resetpayload;backend  | COM,gravity,friction,actuator  |
|           | truncatedenv         | ids appliessupported  | gains,andothersupported        |
|           |                      | fields                | physicalfields.                |
| Scheduled | Eachvectorizedstep;  | Taskproviderbuilds    | Pushforcesandbody-force        |
| interval  | activeatthe          | anintervalplan;       | perturbations.Thecurrent       |
|           | configuredintervalor | backendstagesthe      | capabilitycontractincludesbody |
|           | whenanequivalent     | perturbationforthe    | velocitydeltas,butneither      |
|           | taskplanisnon-empty  | upcomingphysicsstep   | backendadvertisessupportfor    |
them.
| Observation  | Everytaskobservation | Taskcode | Actorobservationnoise, |
| ------------ | -------------------- | -------- | ---------------------- |
| construction | update               |          | history/biasterms,and  |
task-specificobservation
perturbations.Theseare
backend-independentunlessthey
requirebackendsensorstobe
readfirst.
Evaluation Sameenvironment Training/evaluation Thebackenddoesnotreinterpret
andplayback contractastraining entrypointandtask randomizationforevaluation;
|     | unlessthe       | config | trainingandevaluationsharethe |
| --- | --------------- | ------ | ----------------------------- |
|     | configurationis |        | sameenvironmentcontractto     |
|     | changed         |        | avoidimplicitbehavioral       |
differencesbetweenthetwo
modes.Deterministicruns
shoulddisabletherelevanttask
switchesorsetdegenerate
rangesandfixedseeds.
Table5:Domain-randomizationlifecycleusedbythecurrentUniLabruntime.
reset randomization, writes the new DOF state, and runs forward kinematics. Mass and COM
randomization use link mass and center-of-mass overrides. Friction, gravity, and actuator-gain
randomizationareconditionalcapabilities:theyareenabledonlywhentheloadedMotrixSimmodel
exposes the corresponding override methods, and gain randomization requires all actuators to be
positionactuators. Objectorgeom-sizevariantsarerepresentedasper-environmentsizeoverrides
ratherthanseparateMuJoComodelbinaries.
B.3 SupportedRandomizationFamilies
Table6listsbackendcapabilitiesandcurrenttask-sidecoverage.Thetabledistinguishesabackend’s
abilitytoapplyafieldfromwhetheraparticulartaskconfigurationenablesthatfield. Whenatask
requestsresettermsthatabackenddoesnotsupport,themanagerfiltersunsupportedresetpayload
entriesandlogstheskippedterms;sometaskprovidersadditionallyfailvalidationwhenthetermis
requiredforthatworkload.
B.4 ImplicationsforCross-BackendExperiments
The shared contract lets a task express randomization once, but the effective randomization set
is still backend-dependent. For cross-backend experiments, we therefore report the resolved task
configurationseparatelyfrombackendcapabilities. Arandomizationitemshouldbeinterpretedas
19

| Family | Lifecycle MuJoCoUni | MotrixSim | Currenttaskcoverage |
| ------ | ------------------- | --------- | ------------------- |
Modelor Init PrecompiledMjModel Per-envgeometry-size Sharpain-handobject-scalevariants.
| geometryvariants | variantswithper-env | overridesappliedtothe |     |
| ---------------- | ------------------- | --------------------- | --- |
|                  | assignments.        | MotrixSimdata/model   |     |
path.
Initialstateand Reset Backendreceivesthe Sametask-levelreset Locomotioncommandsandspawnpose;
taskconditions sampledqpos/qvel; contractafterconversion motion-trackingreferenceframes;in-hand
|     | taskproviderownspose, | toMotrixSimDOF | grasp/objectresets. |
| --- | --------------------- | -------------- | ------------------- |
|     | velocity,command,     | layout.        |                     |
grasp,motion-frame,and
terrain-spawnsampling.
Base/bodymass Reset basemassdeltaand Base-linkmassdeltaand Locomotion,manipulation-locomotion,
|     | fullbodymass. | fulllink-massoverride. | motiontracking,anddexterous-handtasks |
| --- | ------------- | ---------------------- | ------------------------------------- |
whereconfigenablesmassDR.
Base/bodyCOM Reset basecomoffsetand Base-linkCOMoffset Locomotion,motiontracking,and
|     | fullbodyipos. | andfulllinkCOM | hand/objecttaskswhereconfigenables |
| --- | ------------- | -------------- | ---------------------------------- |
|     |               | override.      | COMDR.                             |
Gravity Reset gravitypayload. Conditionalgravity Motion-trackinganddexterous-hand
|     |     | overridesupport. | configsthatenablegravityor |
| --- | --- | ---------------- | -------------------------- |
gravity-directionDR.
| Contactfriction | Reset Fullgeomfriction | Conditional             | Groundfrictionin                       |
| --------------- | ---------------------- | ----------------------- | -------------------------------------- |
|                 | payload.               | collision-geomfriction  | manipulation-locomotion;footfrictionin |
|                 |                        | overrides;non-collision | G1tracking;objectfrictionin            |
|                 |                        | geomsmustremainat       | dexterous-handtasks.                   |
defaultsbecausethe
MotrixSimfriction
overrideAPIisonly
exposedongeomswith
nonzerocollisiongroup
oraffinity.
Actuatorgains Reset kpandkdpayloadsfor Conditionalper-actuator Go2/G1locomotionandtrackingtasks
|     | positionactuators. | Kp/dampingoverrides; | whenrandomizekporrandomizekdis |
| --- | ------------------ | -------------------- | ------------------------------ |
|     |                    | availableonlyfor     | enabled.                       |
all-position-actuator
models.
Inertiaand Reset bodyiquat, Notadvertisedinthe Armaturerandomizationisusedby
armature bodyinertia,and currentcapabilityset. manipulation-locomotionconfigswhen
|     | dofarmature. |     | enabled;bodyinertialtensorsarebackend |
| --- | ------------ | --- | ------------------------------------- |
capabilityratherthanbroadtaskcoverage.
External Interval Pushandarbitrary Pushforcesare Locomotionpushperturbations;Sharpa
| perturbations | body-forcepayloadsare | supportedthroughlink    | objectforceperturbations. |
| ------------- | --------------------- | ----------------------- | ------------------------- |
|               | stagedthrough         | externalforce;arbitrary |                           |
|               | xfrcapplied.          | bodyforceisconditional  |                           |
onlink
addexternalforce.
Observationnoise Observation Task-sideNumPynoise Sametask-sidepath. Locomotionactornoise;G1trackingactor
andbiases stepor afterbackendsensor noiseandresetbiases;handjoint/contact
|     | reset reads. |     | observationnoisewhereconfigured. |
| --- | ------------ | --- | -------------------------------- |
Table6:Supporteddomain-randomizationfamiliesandbackend-specificlimits.
active only when the task configuration enables it and the selected backend advertises support for
the corresponding field. This distinction matters for fair comparison: for example, MuJoCoUni
exposesawiderreset-fieldsurfaceforinertialfields,whereasMotrixSimcanmatchmanycommon
locomotion and manipulation settings through link, geom, gravity, actuator, and external-force
overrideAPIswhentheloadedmodelsupportsthem.
C TaskandAlgorithmDetails
C.1 TrainingCurves
This subsection collects per-task training curves for the three on-policy and off-policy algorithm
families used in the main paper. Each panel plots episode reward against environment steps; the
curves are aggregated over seeds and smoothed with a fixed-width moving average. Rewards use
20

the same task-side scales as in Section C.3, so absolute values are comparable across seeds for
the same task but not across tasks. The task subsets shown for each algorithm match the per-task
override tables in Section C.4: PPO is reported on all sixteen benchmark tasks, APPO on the six
tasks with a registered APPO configuration, and SAC / FlashSAC on the five tasks with a replay
configuration.
300 250
200
150 100
50
0
0.0 0.2 0.4 0.6 0.8 1.0
1e7
draweR
edosipE
G1 Walk Flat Go1 Joystick Flat Go1 Joystick Rough Go2 Joystick Flat
50 −200 36 40 34
−400
30 32 20 −600 30
10 −800 28
PPO Mean 0 −1000 26
0 1 2 3 4 5 1 2 3 4 5 1.0 1.5 2.0 2.5 3.0 3.5
1e8 1e7 1e6
80
60
40
20
0.2 0.4 0.6 0.8 1.0
1e8
draweR
edosipE
Go2 Joystick Rough Go2w Joystick Flat Go2w Joystick Rough Go2 Handstand
100 125 30
80 100
20 60 75
40 50 10
20 25 0
0 0
0 1 2 3 0 1 2 3 4 5 0 2 4 6
1e6 1e8 1e7
50
40
30
20
10
0
2.0 2.2 2.4 2.6 2.8
1e8
draweR
edosipE
Go2 Arm Manip Loco G1 Dance Tracking G1 Box Tracking G1 Climb Tracking
30
30 60
20 20 40
10 10 20
0 0 0
0 1 2 3 0 2 4 6 0 1 2 3
1e8 1e8 1e8
80
60
40
20
0
0.0 0.5 1.0 1.5 2.0 2.5
Env Steps 1e8
draweR
edosipE
G1 Flip Tracking G1 Wall Flip Tracking Allegro Inhand Sharpa Inhand
80 5 20
60 4 15
3
40 10
2
20 1 5
0
0 0
0.0 0.5 1.0 1.5 2.0 2.5 0 2 4 6 0 1 2 3 4 5
Env Steps 1e8 Env Steps 1e8 Env Steps 1e6
Figure13:PPOtrainingcurvesacrossthesixteenbenchmarktasks.Eachpanelreportsepisoderewardagainst
environmentsteps;thex-axisunitsdifferperpanelbecauseenvironment-stepbudgetsaretask-dependent(see
SectionC.4).
15
10
5
0
0 2 4 6
1e6
draweR
edosipE
Go1 Joystick Flat Go2 Joystick Flat G1 Flip Tracking
50 50
40 40
30 30
20 20
10 10
APPO Mean 0 0
0 2 4 6 0 2 4 6 8
1e6 1e7
40
30
20
10
0
0.0 0.5 1.0 1.5
Env Steps 1e8
draweR
edosipE
G1 Wall Flip Tracking Allegro Inhand Sharpa Inhand
60
1.5 50
40
1.0
30
20
0.5
10
0.0 0
0.0 0.5 1.0 1.5 2.0 2.5 0.0 0.5 1.0 1.5 2.0
Env Steps 1e7 Env Steps 1e7
Figure14: APPOtrainingcurvesforthesixtaskswitharegisteredAPPOconfiguration: Go1/Go2Joystick
Flat,G1FlipandWallFlipTracking,AllegroInhand,andSharpaInhand(HORAteacher).
21

|     | G1 Walk Flat |     |     | G1 Walk Rough |     |     | Go2 Joystick Flat |     |
| --- | ------------ | --- | --- | ------------- | --- | --- | ----------------- | --- |
| 300 |              |     |     |               |     | 50  |                   |     |
250
| draweR edosipE |     |     |     |     |     | 40  |     |     |
| -------------- | --- | --- | --- | --- | --- | --- | --- | --- |
200
| 200 |     |     |     |     |     | 30  |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
150
20
| 100 |     |     | 100 |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
10
|     |     | FastSAC Mean | 50  |     |     |     |     |     |
| --- | --- | ------------ | --- | --- | --- | --- | --- | --- |
FlashSAC Mean
| 0   |                 |         | 0   |               |             | 0   |           |     |
| --- | --------------- | ------- | --- | ------------- | ----------- | --- | --------- | --- |
| 0.0 | 0.5 1.0         | 1.5 2.0 | 0.0 | 0.2 0.4       | 0.6 0.8 1.0 | 0   | 1 2       | 3 4 |
|     |                 | 1e7     |     |               | 1e7         |     | Env Steps | 1e6 |
|     | G1 Box Tracking |         |     | Sharpa Inhand |             |     |           |     |
12
60
10
| draweR edosipE |           |       | 50  |           |     |     |     |     |
| -------------- | --------- | ----- | --- | --------- | --- | --- | --- | --- |
| 8              |           |       | 40  |           |     |     |     |     |
| 6              |           |       | 30  |           |     |     |     |     |
| 4              |           |       | 20  |           |     |     |     |     |
| 2              |           |       | 10  |           |     |     |     |     |
| 0              |           |       | 0   |           |     |     |     |     |
| 0              | 1 2       | 3 4 5 | 0   | 1         | 2 3 |     |     |     |
|                | Env Steps | 1e7   |     | Env Steps | 1e7 |     |     |     |
Figure15:FastSACandFlashSACtrainingcurvesforthefivetaskswithareplayconfiguration.G1WalkFlat
reportsbothFastSACandFlashSAC;theremainingfourtasks(G1WalkRough,Go2JoystickFlat,G1Box
Tracking,SharpaInhand)reportFastSAConly.
C.2 BidirectionalSim2SimCross-BackendValidation
Objective. This subsection evaluates whether a policy trained against one simulation backend
transfers to the other without retraining. We rollout each checkpoint on both MuJoCoUni and
MotrixSim and compare its behaviour. Because each task uses backend-specific reward shaping
at training time, the absolute reward values from different training backends are not directly
comparable;whatismeaningfulisthechangeofeachmetricwhenthesamepolicyismovedbetween
backends,sincethisisolatesthegapintroducedbythesimulatorratherthanbythepolicy.
Metrics. Wereportthreequantitiesper(policy,evaluation-backend)pair:
• Mean episodic return: the mean cumulative reward over 100 evaluation episodes,
computedwiththerewardscalestoredwiththecheckpointattrainingtime.
• Successrate: thefractionofthe100episodesthatfinishwithoutearlytermination.
• MPJPE (m): the mean per-joint position error against the reference trajectory, averaged
over time and joints. MPJPE is only defined for motion-tracking tasks; locomotion rows
reportadash.
Protocol. All numbers come from zero-shot rollouts of a single trained checkpoint per policy:
no fine-tuning, no retraining, and no per-backend adaptation. For each task we evaluate two
checkpoints—onetrainedonMuJoCoUniandonetrainedonMotrixSim—andruneachcheckpoint
onbothbackends,yieldingfourrowspertask. Thenativerows(trainbackend=testbackend)act
as the reference; the cross rows (train backend ̸= test backend) measure the sim2sim gap. Each
cellaggregates100episodes. Cross-backendevaluationusestherewardweightsandnormalization
constants associated with the policy’s training backend, ensuring that changes reflect simulator
transferratherthanreward-definitionchanges.
Across the four tasks, success rate stays at 1.00 for both locomotion and the two acyclic tracking
tasks (dance and wall flip); only the shuttle-run policies drop noticeably (0.97/1.00 native vs.
0.92/0.91 cross), and MPJPE remains within 0.0030m of the native baseline for the dance clip,
within 0.0053m for the shuttle run, and within 0.0189m for the wall flip. These margins are
small relative to the per-joint reference scale and indicate that the policies generalize across the
twobackendswithoutbackend-specificadaptation.
22

Table 7: Bidirectional sim2sim cross-backend evaluation. For each task, the four rows correspond to:
native MotrixSim (train=test=MotrixSim), forward transfer (MotrixSim→MuJoCoUni), native MuJoCoUni
(train=test=MuJoCoUni), andreversetransfer(MuJoCoUni→MotrixSim). Meanreturniscomparableonly
within the four rows of a single task: reward scales are task- and training-backend-specific. A dash in the
MPJPEcolumnmarkslocomotionrows,wherenoreferencetrajectoryexists.
Testtype Task Trainbackend Testbackend Meanreturn Success MPJPE(m) Episodes
G1WalkFlat(SAC)
| Native  | G1WalkFlat | MotrixSim | MotrixSim | 408.38 |     | 1.00 — | 100 |
| ------- | ---------- | --------- | --------- | ------ | --- | ------ | --- |
| Forward | G1WalkFlat | MotrixSim | MuJoCoUni | 405.46 |     | 1.00 — | 100 |
| Native  | G1WalkFlat | MuJoCoUni | MuJoCoUni | 354.41 |     | 1.00 — | 100 |
| Reverse | G1WalkFlat | MuJoCoUni | MotrixSim | 354.00 |     | 1.00 — | 100 |
G1MotionTracking,dancereference(SAC)
Native G1MotionTracking MotrixSim MotrixSim 45.26 1.00 0.0217 100
Forward G1MotionTracking MotrixSim MuJoCoUni 45.17 1.00 0.0219 100
Native G1MotionTracking MuJoCoUni MuJoCoUni 45.36 1.00 0.0197 100
Reverse G1MotionTracking MuJoCoUni MotrixSim 45.34 1.00 0.0204 100
G1Shuttle-RunTracking(PPO)
Native G1Shuttle-Run MotrixSim MotrixSim 45.80 1.00 0.0515 100
Forward G1Shuttle-Run MotrixSim MuJoCoUni 42.28 0.92 0.0568 100
Native G1Shuttle-Run MuJoCoUni MuJoCoUni 32.64 0.97 0.0519 100
Reverse G1Shuttle-Run MuJoCoUni MotrixSim 31.95 0.91 0.0532 100
G1WallFlipTracking(PPO)
| Native  | G1WallFlip | MotrixSim | MotrixSim | 84.46 |     | 1.00 0.0447 | 100 |
| ------- | ---------- | --------- | --------- | ----- | --- | ----------- | --- |
| Forward | G1WallFlip | MotrixSim | MuJoCoUni | 79.46 |     | 1.00 0.0596 | 100 |
| Native  | G1WallFlip | MuJoCoUni | MuJoCoUni | 80.61 |     | 1.00 0.0431 | 100 |
| Reverse | G1WallFlip | MuJoCoUni | MotrixSim | 77.44 |     | 1.00 0.0620 | 100 |
C.3 TaskSpecifications
Thissubsectionliststheper-taskobservationspace,actionspace,commandandterminationlogic,
domain randomization, and reward weights for every task evaluated in the main paper. Tasks are
grouped by family: locomotion, motion tracking, manipulation-locomotion, and dexterous-hand
in-handmanipulation.WhenMuJoCoUniandMotrixSimshareavalueitisreportedonce;backend-
specificdifferencesarecalledoutexplicitly.
C.3.1 Locomotion
Go1JoystickFlat. Go1JoystickFlatrunsontheflatGo1scenewithsimulationstep∆t =
sim
0.01s,controlstep∆t ctrl =0.02s,maximumepisode20s,andinitialbaseposition(0,0,0.34).
| Observationspace. | Theactorobservationis49-dimensional: |           |                         |                |             |     |     |
| ----------------- | ------------------------------------ | --------- | ----------------------- | -------------- | ----------- | --- | --- |
|                   |                                      | o t =[ω t | , −g t , q t −q default | , q˙ t , a t−1 | , c t , ϕ t | ],  | (1) |
where ω ∈ R3 is the body-frame gyro, g ∈ R3 is the up-vector sensor, q −q ∈ R12 is
|     | t   |     | t   |     |     | t default |     |
| --- | --- | --- | --- | --- | --- | --------- | --- |
|     |     | R12 |     | R12 |     |           | R3  |
the joint-position offset, q˙ t ∈ is joint velocity, a t−1 ∈ is the previous action, c t ∈ is
thevelocitycommand,andϕ ∈R4 isthefour-leggaitphase. Thecriticobservationappendslocal
t
linearvelocity,giving52dimensions.
Actionspace. Theaction isa12-dimensional joint-positionoffset. The environmentmaps policy
outputa toactuatortargetsbyqcmd =q +0.25a ,usingPDgainsK =35.0,K =0.5.
|     | t   | t   | default | t   |     | p d |     |
| --- | --- | --- | ------- | --- | --- | --- | --- |
Commandsandtermination.Thevelocity-commandrangeis[(−0.6,−0.4,−0.8),(1.0,0.4,0.8)].
Anepisodeterminatesearlywhentheup-vectorz componentsatisfiesgz ≤ 0.5. Gaitfrequencyis
t
2Hz.
Domainrandomization. Reset-timedomainrandomizationisappliedaslistedinTable8.
(cid:80)
Rewarddesign. Therewardis∆t ctrl w i r i . Table9liststheactiverewardscales.
i
Thevelocity-trackingtermsuseexp(−e2/σ2)withσ = 0.25;thebase-heightpenaltyusesatarget
of0.3m;theswing-foottermusesexp(−e2/0.01)gatedbytheswingphase(ϕ ≥0.6).
|     |     |     | z   |     |     | i   |     |
| --- | --- | --- | --- | --- | --- | --- | --- |
23

|     |     | Table8:Domainrandomizationforgo1 |                            |     |                                  |               | joystick flat. |     |
| --- | --- | -------------------------------- | -------------------------- | --- | -------------------------------- | ------------- | -------------- | --- |
|     |     | Item                             |                            |     |                                  | MuJoCoUni     |                |     |
|     |     | Velocity-commandrange            |                            |     | [(−0.6,−0.4,−0.8),(1.0,0.4,0.8)] |               |                |     |
|     |     | randomize                        | kp                         |     |                                  | true(default) |                |     |
|     |     | randomize                        | kd                         |     |                                  | true(default) |                |     |
|     |     | Kp/Kdmultiplierrange             |                            |     |                                  | [0.9,1.1]     |                |     |
|     |     |                                  | Table9:Rewardtermsforgo1   |     |                                  | joystick      | flat.          |     |
|     |     |                                  | Term                       |     |                                  |               | MuJoCoUni      |     |
|     |     |                                  | Linearvelocitytracking     |     |                                  |               | 1.0            |     |
|     |     |                                  | Yawangularvelocitytracking |     |                                  |               | 0.2            |     |
|     |     |                                  | Verticallinearvelocity     |     |                                  |               | -5.0           |     |
|     |     |                                  | Roll/pitchangularvelocity  |     |                                  |               | -0.1           |     |
|     |     |                                  | Baseheight                 |     |                                  |               | -100.0         |     |
|     |     |                                  | Actionrate                 |     |                                  |               | -0.005         |     |
|     |     |                                  | Jointdeviationfromdefault  |     |                                  |               | -0.1           |     |
|     |     |                                  | Contactphaseagreement      |     |                                  |               | 0.24           |     |
|     |     |                                  | Swing-footheight           |     |                                  |               | 4.0            |     |
Go1 Joystick Rough. Go1JoystickRough adds procedurally generated terrain to the Go1
quadruped. Theconfigurationisidenticalacrossthetwobackends. Simulationstep∆t =0.01s,
sim
| controlstep∆t |     | =0.02s,maximumepisode20s. |     |     |     |     |     |     |
| ------------- | --- | ------------------------- | --- | --- | --- | --- | --- | --- |
ctrl
| Observationspace. |     | Theactorobservationis45-dimensional(policygroup): |         |        |          |         |                 |     |
| ----------------- | --- | ------------------------------------------------- | ------- | ------ | -------- | ------- | --------------- | --- |
|                   |     | o                                                 | =[0.25ω | , −g , | c , q −q |         | , 0.05q˙ , a ], | (2) |
|                   |     | t                                                 |         | t t    | t t      | default | t t−1           |     |
where gyro and joint velocity are pre-scaled. The critic observation is 48-dimensional (adds base
linearvelocity)plusaheight-scanvector(default187pointsfroman11×17gridaroundtherobot
base).
Action space. The action is 12-dimensional with per-joint scaling: hip joints use
hip action scale= 0.125, non-hipjointsusenon hip action scale= 0.25. PDgainsK p =
| 35.0,K | =0.5. | Actionsareclippedto[−100,100]. |     |     |     |     |     |     |
| ------ | ----- | ------------------------------ | --- | --- | --- | --- | --- | --- |
d
| Commands | and | termination. |     |                      |     |     | [(−1,−1,−1),(1,1,1)] |      |
| -------- | --- | ------------ | --- | -------------------- | --- | --- | -------------------- | ---- |
|          |     |              |     | The velocity-command |     |     | range is             | with |
heading command enabled and resampling every 10s. Terrain is procedurally generated on an
8 × 8m cell grid (6 × 6 cells, border width 20m). Termination occurs when the robot moves
morethan3mbeyonditsterraincellboundary. Nogravity-basedterminationisused.
| Domainrandomization. |     |                                    | Reset-timedomainrandomizationislistedinTable10. |           |               |      |                 |     |
| -------------------- | --- | ---------------------------------- | ----------------------------------------------- | --------- | ------------- | ---- | --------------- | --- |
|                      |     | Table10:Domainrandomizationforgo1  |                                                 |           |               |      | joystick rough. |     |
|                      |     | Item                               |                                                 |           | MuJoCoUni     |      | MotrixSim       |     |
|                      |     | randomize                          |                                                 | base mass |               | true | true            |     |
|                      |     | Addedmassrange                     |                                                 |           | [−1.0,3.0]    |      | [−1.0,3.0]      |     |
|                      |     | random                             | com                                             |           |               | true | true            |     |
|                      |     | randomize                          |                                                 | kp        |               | true | true            |     |
|                      |     | Kpmultiplierrange                  |                                                 |           | [0.5,2.0]     |      | [0.5,2.0]       |     |
|                      |     | randomize                          |                                                 | kd        |               | true | true            |     |
|                      |     | Kdmultiplierrange                  |                                                 |           | [0.5,2.0]     |      | [0.5,2.0]       |     |
|                      |     | push                               | robots                                          |           |               | true | true            |     |
|                      |     | Pushinterval(steps)                |                                                 |           |               | 625  | 625             |     |
|                      |     | Maxpushforce                       |                                                 |           | [1.0,1.0,0.5] |      | [1.0,1.0,0.5]   |     |
| Rewarddesign.        |     | Table11liststheactiverewardscales. |                                                 |           |               |      |                 |     |
24

|     | Table11:Rewardtermsforgo1  |     | joystick  | rough.    |     |     |
| --- | -------------------------- | --- | --------- | --------- | --- | --- |
|     | Term                       |     | MuJoCoUni | MotrixSim |     |     |
|     | Linearvelocitytracking     |     | 3.0       | 3.0       |     |     |
|     | Yawangularvelocitytracking |     | 1.5       | 1.5       |     |     |
|     | Verticallinearvelocity     |     | -2.0      | -2.0      |     |     |
|     | Roll/pitchangularvelocity  |     | -0.05     | -0.05     |     |     |
|     |                            |     | −2.5×10−5 | −2.5×10−5 |     |     |
JointtorquesL2
|     |     |     | −2.5×10−7 | −2.5×10−7 |     |     |
| --- | --- | --- | --------- | --------- | --- | --- |
JointaccelerationL2
|     | Jointpositionlimits   |     | -5.0      | -5.0      |     |     |
| --- | --------------------- | --- | --------- | --------- | --- | --- |
|     | Jointpower            |     | −2.0×10−5 | −2.0×10−5 |     |     |
|     | Standstill            |     | -2.0      | -2.0      |     |     |
|     | Hipposition           |     | -0.5      | -0.5      |     |     |
|     | Jointpositionpenalty  |     | -1.0      | -1.0      |     |     |
|     | Jointmirror           |     | -0.05     | -0.05     |     |     |
|     | Actionrate            |     | -0.01     | -0.01     |     |     |
|     | Undesiredcontacts     |     | -1.0      | -1.0      |     |     |
|     | Contactforces         |     | −1.5×10−4 | −1.5×10−4 |     |     |
|     | Feetairtime           |     | 0.5       | 0.5       |     |     |
|     | Feetairtimevariance   |     | -1.0      | -1.0      |     |     |
|     | Feetcontactwithoutcmd |     | 0.1       | 0.1       |     |     |
|     | Feetslide             |     | -0.1      | -0.1      |     |     |
|     | Feetheightbody        |     | -5.0      | -5.0      |     |     |
|     | Feetgait              |     | 0.5       | 0.5       |     |     |
|     | Upward                |     | 1.0       | 1.0       |     |     |
Tracking-style terms use σ = 0.25 and the base-height penalty uses a target of 0.33m on both
backends.
Go2JoystickFlat. Go2JoystickFlatrunsontheflatGo2scenewithsimulationstep∆t =
sim
0.01s,controlstep∆t =0.02s,maximumepisode20s,andinitialbaseposition(0,0,0.42).
ctrl
| Observationspace.               | Theactorobservationis49-dimensional: |                |                                |                |           |     |
| ------------------------------- | ------------------------------------ | -------------- | ------------------------------ | -------------- | --------- | --- |
|                                 | o t =[ω                              | t , −g t , q t | −q default , q˙ t , a t−1      | , c t , ϕ t ], |           | (3) |
| ∈R3isthebody-framegyroreading,g |                                      |                | ∈R3istheup-vectorsensorvalue,q |                |           |     |
| whereω                          |                                      |                |                                |                | −q        | ∈   |
| t                               |                                      |                | t                              |                | t default |     |
R12 is the joint-position offset from the default pose, q˙ ∈ R12 is joint velocity, a ∈ R12
|     |     |     | t   |     | t−1 |     |
| --- | --- | --- | --- | --- | --- | --- |
|     | R3  |     |     | R4  |     |     |
is the previous action, c t ∈ is the velocity command, and ϕ t ∈ is the foot phase. The
critic observation appends local linear velocity, giving a 52-dimensional privileged observation.
Observationnoiseusesthedefaultlevel.
Action space. The action is a 12-dimensional joint-position command offset. The environment
| mapspolicyoutputa | toactuatortargetsby |     |     |     |     |     |
| ----------------- | ------------------- | --- | --- | --- | --- | --- |
t
qcmd
|                           |     | t =q      | default +0.25a t | ,   |     | (4) |
| ------------------------- | --- | --------- | ---------------- | --- | --- | --- |
| usingthesharedGo2PDgainsK |     | =35.0andK | =0.5.            |     |     |     |
|                           |     | p         | d                |     |     |     |
Commandsandtermination.Thevelocity-commandrangeis[(−0.6,−0.4,−0.8),(1.0,0.4,0.8)].
Anepisodeterminatesearlywhentheup-vectorzcomponentsatisfiesgz
≤0.5.
t
Domainrandomization. Reset-timedomainrandomizationisappliedaslistedinTable12.
(cid:80)
Rewarddesign. Therewardisthecontrol-step-scaledsum∆t ctrl w i r i . Table13liststheactive
i
rewardscales.
Tracking-styletermsuseσ =0.25andthebase-heightpenaltyusesatargetof0.3m.Theswing-foot
term rewards swing feet near 0.1m height; the contact term compares measured foot contact with
thegaitphase.
Go2 JoystickRough. Go2JoystickRough sharesthe samearchitecture as Go1Joystick Rough
(proceduralterrain,heightscan,headingcommand)butusestheGo2robotmodel.Theconfiguration
25

|     |                       | Table12:Domainrandomizationforgo2 |     |     |                                  |           | joystick  | flat. |     |
| --- | --------------------- | --------------------------------- | --- | --- | -------------------------------- | --------- | --------- | ----- | --- |
|     | Item                  |                                   |     |     |                                  | MuJoCoUni |           |       |     |
|     | Velocity-commandrange |                                   |     |     | [(−0.6,−0.4,−0.8),(1.0,0.4,0.8)] |           |           |       |     |
|     | randomize             |                                   | kp  |     |                                  |           | true      |       |     |
|     | randomize             |                                   | kd  |     |                                  |           | true      |       |     |
|     | Kp/Kdmultiplierrange  |                                   |     |     |                                  | [0.9,1.1] |           |       |     |
|     |                       | Table13:Rewardtermsforgo2         |     |     |                                  | joystick  | flat.     |       |     |
|     |                       | Term                              |     |     |                                  |           | MuJoCoUni |       |     |
|     |                       | Linearvelocitytracking            |     |     |                                  |           | 1.0       |       |     |
|     |                       | Yawangularvelocitytracking        |     |     |                                  |           | 0.2       |       |     |
|     |                       | Verticallinearvelocity            |     |     |                                  |           | -5.0      |       |     |
|     |                       | Roll/pitchangularvelocity         |     |     |                                  |           | -0.1      |       |     |
|     |                       | Baseheight                        |     |     |                                  |           | -100.0    |       |     |
|     |                       | Actionrate                        |     |     |                                  |           | -0.005    |       |     |
|     |                       | Jointdeviationfromdefaultpose     |     |     |                                  |           | -0.1      |       |     |
|     |                       | Contactphaseagreement             |     |     |                                  |           | 0.24      |       |     |
|     |                       | Swing-footheight                  |     |     |                                  |           | 4.0       |       |     |
isidenticalacrossthetwobackends. Simulationstep∆t sim = 0.01s,controlstep∆t ctrl = 0.02s,
maximumepisode20s.
Observationspace. SamestructureasGo1JoystickRough:actor45-dimensional(pre-scaledgyro,
gravity, command, joint offset, joint velocity, last action), critic 48-dimensional plus height-scan
(187points).
Actionspace. 12-dimensionalwithhip action scale= 0.125,non hip action scale= 0.25.
| PDgainsK | =35.0,K | =0.5. | Clipto[−100,100]. |     |     |     |     |     |     |
| -------- | ------- | ----- | ----------------- | --- | --- | --- | --- | --- | --- |
|          | p       | d     |                   |     |     |     |     |     |     |
Commands and termination. Velocity-command range [(−1,−1,−1),(1,1,1)], heading
command enabled, resampling every 10s. Terrain: 8 × 8m cells, 6 × 6 grid, border 20m.
| Termination: | terrainout-of-bounds(3mbuffer). |     |     |     | Nogravity-basedtermination. |     |     |     |     |
| ------------ | ------------------------------- | --- | --- | --- | --------------------------- | --- | --- | --- | --- |
Domainrandomization. IdenticaltoGo1JoystickRough(Table10): basemass[−1,3]kg,COM
offset,Kp/Kd[0.5,2.0],pushrobotsevery625stepswithforce[1,1,0.5].
Reward design. Same reward terms and weights as Go1 Joystick Rough (Table 11), with base-
heighttarget0.33mandtrackingsigma0.25.
Go2WJoystickFlat. Go2WJoystickFlatisawheeled-leggedquadrupedwith12legjointsand
2 wheel joints. The configuration is identical across the two backends. Simulation step ∆t sim =
| 0.01s,controlstep∆t |     | =0.02s,maximumepisode20s. |     |     |     |     |     |     |     |
| ------------------- | --- | ------------------------- | --- | --- | --- | --- | --- | --- | --- |
ctrl
| Observationspace. |     | Theactorobservationis53-dimensional: |      |              |        |          |     |        |     |
| ----------------- | --- | ------------------------------------ | ---- | ------------ | ------ | -------- | --- | ------ | --- |
|                   |     | o =[ω                                | , −g | , qleg−qleg, | q˙leg, | q˙wheel, | a   | , c ], |     |
|                   |     | t                                    | t    | t t          | t      | t        | t−1 | t      | (5) |
def
where the leg joint offset and velocity are 12-dimensional each, wheel velocity is 2-dimensional,
and actions include both leg (12) and wheel (2) outputs. The critic observation is 72-dimensional
(addslinearvelocity,motorcontroltargets,andwheelcontroltargets).
Action space. 14-dimensional: 12 leg joints with action scale= 0.5 and 2 wheel joints with
wheel action scale= 10.0. Leg PD gains K = 50.0, K = 1.5; wheel uses velocity control
|     |     |     |     |     | p   |     | d   |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
withKwheel
=0.5.
d
Commands and termination. Velocity-command range [(0,0,−1),(1,0,1)] (forward and yaw
| only). Anepisodeterminatesearlywhengz |     |     |     |     | ≤0.5. |     |     |     |     |
| ------------------------------------- | --- | --- | --- | --- | ----- | --- | --- | --- | --- |
t
26

Domain randomization. Kp/Kd randomization is disabled. No other domain randomization is
enabledintheflatvariant.
Rewarddesign. Table14liststheactiverewardscales.
| Table14:Rewardtermsforgo2w |     |     | joystick  |     | flat.     |     |
| -------------------------- | --- | --- | --------- | --- | --------- | --- |
| Term                       |     |     | MuJoCoUni |     | MotrixSim |     |
| Linearvelocitytracking     |     |     | 1.0       |     | 1.0       |     |
| Yawangularvelocitytracking |     |     | 0.75      |     | 0.75      |     |
| Verticallinearvelocity     |     |     | -5.0      |     | -5.0      |     |
| Roll/pitchangularvelocity  |     |     | -0.1      |     | -0.1      |     |
| Baseheight                 |     |     | -100.0    |     | -100.0    |     |
| Orientation                |     |     | -2.0      |     | -2.0      |     |
| Actionrate                 |     |     | -0.005    |     | -0.005    |     |
| Jointdeviationfromdefault  |     |     | -0.5      |     | -0.5      |     |
|                            |     |     | −2.0×10−4 |     | −2.0×10−4 |     |
Torques
| Alive  |     |     | 0.5 |     | 0.5 |     |
| ------ | --- | --- | --- | --- | --- | --- |
| Upward |     |     | 1.0 |     | 1.0 |     |
Tracking-style terms use σ = 0.25 and the base-height penalty uses a target of 0.4m on both
backends.
Go2W Joystick Rough. Go2WJoystickRough adds procedural terrain to the wheeled-legged
Go2W.Simulationstep∆t sim =0.01s,controlstep∆t ctrl =0.02s,maximumepisode20s.
Observation space. The actor observation is 53-dimensional (pre-scaled gyro 0.25ω, gravity,
command,legjointoffset,legvelocity0.05q˙,lastactionincludingwheel). Thecriticobservationis
56-dimensional(addslinearvelocity)plusheight-scan(187points).
Action space. 14-dimensional: 12 leg joints with scale= 0.5 and 2 wheel joints with
action
wheel action scale= 10.0. LegPDgainsK = 35.0,K = 0.5;wheelKwheel = 0.5. Clipto
|     |     | p   |     | d   |     | d   |
| --- | --- | --- | --- | --- | --- | --- |
[−100,100].
Commands and termination. Velocity-command range [(−1,−1,−1),(1,1,1)], heading
command enabled, resampling every 10s. Terrain: 8 × 8m cells, 6 × 6 grid, border 20m.
Termination: terrainout-of-bounds(3mbuffer).
Domainrandomization. Table15liststhedomain-randomizationsettings. Kp/Kdrandomization
isenabledunderMotrixSimanddisabledunderMuJoCoUni.
| Table15:Domainrandomizationforgo2w |           |               |           | joystick      | rough.    |     |
| ---------------------------------- | --------- | ------------- | --------- | ------------- | --------- | --- |
| Item                               |           | MuJoCoUni     |           | MotrixSim     |           |     |
| randomize                          | base mass |               | true      |               | true      |     |
| Addedmassrange                     |           | [−1.0,3.0]    |           | [−1.0,3.0]    |           |     |
| random                             | com       |               | true      |               | true      |     |
| COMoffsetx                         |           | [−0.05,0.05]  |           | [−0.05,0.05]  |           |     |
| randomize                          | kp        |               | false     |               | true      |     |
| Kpmultiplierrange                  |           |               | [0.5,1.0] |               | [0.5,1.0] |     |
| randomize                          | kd        |               | false     |               | true      |     |
| Kdmultiplierrange                  |           |               | [0.5,1.0] |               | [0.5,1.0] |     |
| push robots                        |           |               | true      |               | true      |     |
| Pushinterval(steps)                |           |               | 500       |               | 625       |     |
| Maxpushforce                       |           | [0.5,0.5,0.0] |           | [1.0,1.0,0.5] |           |     |
| Pushbody                           |           | base          | link      | base          | link      |     |
Rewarddesign. Table16liststheactiverewardscales. MotrixSimaddsanorientationpenaltythat
MuJoCoUnidoesnotuse,andthetwobackendsdifferonthehip-positionpenaltyweight.
27

| Table16:Rewardtermsforgo2w |     | joystick  | rough.    |     |
| -------------------------- | --- | --------- | --------- | --- |
| Term                       |     | MuJoCoUni | MotrixSim |     |
| Linearvelocitytracking     |     | 3.0       | 3.0       |     |
| Yawangularvelocitytracking |     | 1.5       | 1.5       |     |
| Verticallinearvelocity     |     | -2.0      | -2.0      |     |
| Roll/pitchangularvelocity  |     | -0.05     | -0.05     |     |
| Orientation                |     | /         | -2.0      |     |
|                            |     | −2.5×10−5 | −2.5×10−5 |     |
JointtorquesL2
|     |     | −2.5×10−7 | −2.5×10−7 |     |
| --- | --- | --------- | --------- | --- |
JointaccelerationL2
| Wheel-jointaccelerationL2 |     | −2.5×10−9 | −2.5×10−9 |     |
| ------------------------- | --- | --------- | --------- | --- |
| Jointpositionlimits       |     | -5.0      | -5.0      |     |
| Jointpower                |     | −2.0×10−5 | −2.0×10−5 |     |
| Actionrate                |     | -0.01     | -0.01     |     |
| Standstill                |     | -2.0      | -2.0      |     |
| Hipposition               |     | -2.0      | -0.5      |     |
| Jointpositionpenalty      |     | -1.0      | -1.0      |     |
| Jointmirror               |     | -0.05     | -0.05     |     |
| Upward                    |     | 1.0       | 1.0       |     |
Tracking-style terms use σ = 0.25 and the base-height penalty uses a target of 0.4m on both
backends.
G1 Walk Flat. G1WalkFlat is a 29-DOF humanoid locomotion task on the flat G1 scene.
Simulation step ∆t = 0.01s, control step ∆t = 0.02s, maximum episode 20s, initial base
| sim |     | ctrl |     |     |
| --- | --- | ---- | --- | --- |
position(0,0,0.754).
Observationspace. Theactorobservationis98-dimensional:
| o =[ω , | −g , q −q | , q˙ , a      | , c , ϕ ], | (6) |
| ------- | --------- | ------------- | ---------- | --- |
| t t     | t t       | default t t−1 | t t        |     |
∈R2isthebipedal
wherejointoffset,jointvelocity,andlastactionare29-dimensionaleach,andϕ
t
gaitphase(left,right). Thecriticobservationis101-dimensional(addsbaselinearvelocity).
Action space. 29-dimensional joint-position offset. Action mapping qcmd = q +sa with
|     |     |     | t default | t   |
| --- | --- | --- | --------- | --- |
backend-dependent scale: MuJoCoUni uses s = 0.25, MotrixSim uses s = 0.5. PD gains K =
p
50.0,K d =1.0(fromG1baseconfig).
Commands and termination. Under MuJoCoUni the velocity-command range follows the task
default; underMotrixSimitisfixedto[(0.4,0,0),(0.7,0,0)](forwardwalkingonly)withthegait
phaseinitializedattheconfiguredoffsetandtheresetbase-velocitylimitedto0.05m/s. Termination
occurs when body tilt exceeds the configured maximum or the base height drops below the
MuJoCoUniuses25◦and0.55m,MotrixSimuses35◦and0.5m.
configuredminimum:
Domain randomization. The velocity curriculum is disabled. Under MotrixSim Kp/Kd
randomization is additionally disabled. Observation noise is configured identically on both
backends: noiselevel1.0,joint-anglescale0.01,joint-velocityscale1.5,gyroscale0.2.
Rewarddesign. Table17liststheactiverewardscales. MotrixSimintroducesseveralgait-shaping
terms (feet phase contrast, feet phase contact, double-stance penalty, under-speed penalty, upper-
bodypose)thatarenotusedunderMuJoCoUni.
Shapingparametersusedbythetableabove:velocity-trackingσ =0.25,gaitfrequency1.5Hz,feet-
phaseswingheight0.09m,feet-phasetrackingσ =0.008,base-heighttarget0.754m(MuJoCoUni)
/ 0.765m (MotrixSim). The 29-entry pose-weight vector is identical on both backends. Under
MotrixSim,thegaitrewardisgatedbyaminimumforwardspeedof0.05m/s.
G1WalkRough. G1WalkRoughistherough-terrainvarianttrainedwithSAConbothbackends.
Theenvironmentsharesthesame29-DOFhumanoidstructureasG1WalkFlatwithterrain-aware
resetbehaviour.
28

|     |                            | Table17:Rewardtermsforg1 | walk      | flat.     |
| --- | -------------------------- | ------------------------ | --------- | --------- |
|     | Term                       |                          | MuJoCoUni | MotrixSim |
|     | Linearvelocitytracking     |                          | 2.0       | 2.0       |
|     | Yawangularvelocitytracking |                          | 0.2       | 0.25      |
|     | Feetphase                  |                          | 1.0       | 1.2       |
|     | Feetphasecontrast          |                          | /         | 1.5       |
|     | Feetphasecontact           |                          | /         | 1.0       |
|     | Feetdoublestance           |                          | /         | -1.0      |
|     | Underspeed                 |                          | /         | -0.2      |
|     | Upperbodypose              |                          | /         | -0.05     |
|     | Verticallinearvelocity     |                          | -1.0      | -1.0      |
|     | Roll/pitchangularvelocity  |                          | -0.25     | -0.2      |
|     | Baseheight                 |                          | -500.0    | -120.0    |
|     | Orientation                |                          | -5.0      | -2.5      |
|     | Actionrate                 |                          | -0.01     | -0.005    |
|     | Pose(weighted)             |                          | -0.1      | -0.05     |
Observationspace. SamestructureasG1WalkFlat: actor98-dimensional,critic101-dimensional.
RefertotheG1WalkFlatparagraphforthelayout.
Actionspace. 29-dimensionaljoint-positionoffsetwithactionscales = 1.0(raisedfromthetask
| default0.25). | PDgainsK | p =50.0,K d =1.0. |     |     |
| ------------- | -------- | ----------------- | --- | --- |
Commands and termination. The gait phase is initialized at the configured offset and the reset
base-velocity is limited to 0.5m/s. A base-velocity curriculum is enabled with initial scale 0.5,
maximum scale 1.0, level-down threshold 150, level-up threshold 750, and degree 0.001. Under
MotrixSim, Kp/Kd randomization isdisabled andthe simulationstep isset to0.01s. Termination
usesamaximumtiltof65◦andaminimumbaseheightof0.3m.
Domainrandomization.UnderMuJoCoUni,observationnoiseuseslevel1.0withjoint-anglescale
0.01andjoint-velocityscale0.1(otherchannelszero). UnderMotrixSim,thedefaultnoiselevelis
used. MuJoCoUni enables policy symmetry at the algorithm level; MotrixSim does not. Mass,
COM,andpushrandomizationarenotenabledoneitherbackend.
Rewarddesign.Table18liststheactiverewardscales.MotrixSimusesatighterfeet-phasetracking
sigmathanMuJoCoUni.
|     |                            | Table18:Rewardtermsforg1 | walk      | rough.    |
| --- | -------------------------- | ------------------------ | --------- | --------- |
|     | Term                       |                          | MuJoCoUni | MotrixSim |
|     | Linearvelocitytracking     |                          | 2.0       | 2.2       |
|     | Yawangularvelocitytracking |                          | 1.5       | 1.8       |
|     | Penaltyangvelxy            |                          | -1.0      | -1.2      |
|     | Penaltyorientation         |                          | -10.0     | -12.0     |
|     | Penaltyactionrate          |                          | -4.0      | -2.5      |
|     | Pose(weighted)             |                          | -0.5      | -0.6      |
|     | Penaltyfeetorientation     |                          | -20.0     | -5.0      |
|     | Feetphase                  |                          | 5.0       | 6.0       |
|     | Alive                      |                          | 10.0      | 12.0      |
Shaping parameters used by the table above: velocity-tracking σ = 0.25, gait frequency 1.5Hz,
feet-phaseswingheight0.09m, feet-phasetrackingσ = 0.04(MuJoCoUni)/0.008(MotrixSim),
Terminationthresholds(maximumtilt65◦,
close-feetthreshold0.15m,base-heighttarget0.754m.
minimumbaseheight0.3m)arerepeatedherefromtheCommandsandterminationparagraphfor
reference.
29

C.3.2 MotionTracking
The motion-tracking family imitates a reference motion clip on the 29-DOF G1 hu-
manoid. All five tasks (g1 motion tracking, g1 climb tracking, g1 flip tracking,
g1 wall flip tracking, g1 box tracking) share the same observation/action layout and
reward-term library; they differ in reference motion clip, scene, sampling mode, and termination
thresholds. The shared structure is described once under G1 Motion Tracking; per-variant deltas
follow.
G1MotionTracking. G1MotionTrackingrunsontheflatG1scenewithadancereferenceclip.
The configuration is identical across the two backends. Simulation step from the G1 base config,
| controlstep∆t | =0.02s,maximumepisode10s. |     |     |     |     |     |
| ------------- | ------------------------- | --- | --- | --- | --- | --- |
ctrl
| Observationspace. | Theactorobservationis176-dimensional: |             |          |             |             |     |
| ----------------- | ------------------------------------- | ----------- | -------- | ----------- | ----------- | --- |
|                   | oactor =[mjoint,                      | pref, Rref, | vbase, ω | , q −q      | , q˙ , a ], | (7) |
|                   | t t                                   | b,t         | b,t t    | t t default | t t−1       |     |
where mjoint ∈ R58 is the reference joint position and velocity (29+29), pref ∈ R3 is the
| t   |     |     |     |     | b,t |     |
| --- | --- | --- | --- | --- | --- | --- |
referenceanchorpositioninbodyframe,Rref ∈R6isthereferenceanchororientation(6Drotation
b,t
representation),andtheremainingchannelsmirrorthelocomotionobservationlayoutfor29joints.
Thecriticobservationappendsper-bodyprivilegedtransformsforall14trackedbodies(3Dposition
+6Dorientationeach,14×9=126extradims),givinga302-dimensionalcritic.
The14trackedbodiesare: pelvis, left/right{hip roll link, knee link, ankle roll link},
torso link(anchorbody),left/right{shoulder roll link,elbow link,wrist yaw link}.
Action space. 29-dimensional joint-position offset with a per-joint 29-element action scale (not a
| singlescalar). | PDgainsfromtheG1baseconfig(K |     | =50.0,K | =1.0). |     |     |
| -------------- | ---------------------------- | --- | ------- | ------ | --- | --- |
|                |                              |     | p       | d      |     |     |
Commandsandtermination. Thereisnojoystickcommandchannel; thereferencemotionplays
theroleofcommand. Terminationoccurswhenanyofthefollowingholds: anchor-positionz-error
exceeds 0.25m, end-effector z-error exceeds 0.25m, or a non-EE body falls below 0.05m when
undesired-contactterminationisenabled. Anchor-orientationterminationisdisabled.
Reference-clipsampling. Theper-environmentstartframeischosenatresetbyoneoffourmodes:
always frame zero, random clip start, uniform over all frames, or failure-weighted adaptive bin
| sampling. | G1MotionTrackingusestheadaptivemode. |     |     |     |     |     |
| --------- | ------------------------------------ | --- | --- | --- | --- | --- |
Domain randomization. Under MuJoCoUni, observation noise uses the environment defaults.
Under MotrixSim, noise level 1.0 is enabled with joint-angle scale 0.01, joint-velocity scale 1.5,
andgyroscale0.2. Base-mass,COM,gravity,push,andKp/Kdrandomizationarenotenabled.
Reward design. Each motion-tracking term has the form exp(−e2/σ2) where e is the reference-
trackingerrorinthecorrespondingchannel;non-trackingpenaltiesusesquared/L2formsidentical
| tothelocomotionlibrary. | Table19liststheactivescales. |              |           |           |     |     |
| ----------------------- | ---------------------------- | ------------ | --------- | --------- | --- | --- |
|                         | Table19:Rewardtermsforg1     |              | motion    | tracking. |     |     |
|                         | Term                         |              | MuJoCoUni | MotrixSim |     |     |
|                         | motion                       | global root  | pos 0.5   | 1.0       |     |     |
|                         | motion                       | global root  | ori 0.5   | 0.5       |     |     |
|                         | motion                       | body pos     | 1.0       | 1.0       |     |     |
|                         | motion                       | body ori     | 1.0       | 1.0       |     |     |
|                         | motion                       | body lin vel | 1.0       | 1.0       |     |     |
|                         | motion                       | body ang vel | 1.0       | 1.0       |     |     |
|                         | action rate                  | l2           | -0.1      | -0.05     |     |     |
|                         | joint limit                  |              | -10.0     | -10.0     |     |     |
|                         | undesired                    | contacts     | /         | -0.1      |     |     |
30

Shapingparameters(per-channeltrackingσusedinsidetheexp(−e2/σ2)form)areidenticalonthe
| two backends: | σ       | =   | 0.3, σ  |     | = 0.4, | σ       | = 0.3, | σ       | = 0.4, | σ          | =   |
| ------------- | ------- | --- | ------- | --- | ------ | ------- | ------ | ------- | ------ | ---------- | --- |
|               | rootpos |     | rootori |     |        | bodypos |        | bodyori |        | bodylinvel |     |
1.0, σ bodyangvel = 3.14, σ jointpos = 0.2, σ jointvel = 1.0. The joint-position and joint-velocity
trackingtermsarenotusedinthisconfiguration.
G1 Climb Tracking. The climb variant uses a scene with a 20-rung wall and a matched
climbingreferenceclip. Maximumepisodeis15s,samplingisadaptive,simulationstepis0.005s,
undesired-contactterminationisenabled,andanchor/end-effectorz-errorthresholdsareboth0.3m.
Theepisodeisnottruncatedwhentheclipends.
Theper-jointactionscaleisroughly0.55forhipandanklejoints,0.35fortheknee,0.44forwaist
andshoulderjoints,and0.07forwristjoints. Observation,action,andterminationstructurematch
G1MotionTracking.
Rewarddesign. Rewardscalesareidenticalacrossthetwobackends(Table20). ComparedtoG1
MotionTracking,theclimbvariantadditionallyweightsend-effectorverticaltracking,joint-position
tracking,andjoint-velocitytrackingtoencouragelimbcoordinationwiththereferenceclip.
|     |     | Table20:Rewardtermsforg1 |           |        | climb    | tracking(mj/mxidentical). |        |     |     |     |     |
| --- | --- | ------------------------ | --------- | ------ | -------- | ------------------------- | ------ | --- | --- | --- | --- |
|     |     |                          | Term      |        |          |                           | Weight |     |     |     |     |
|     |     |                          | motion    | global | root     | pos                       | 0.5    |     |     |     |     |
|     |     |                          | motion    | global | root     | ori                       | 0.5    |     |     |     |     |
|     |     |                          | motion    | body   | pos      |                           | 2.0    |     |     |     |     |
|     |     |                          | motion    | body   | ori      |                           | 1.5    |     |     |     |     |
|     |     |                          | motion    | body   | lin      | vel                       | 1.0    |     |     |     |     |
|     |     |                          | motion    | body   | ang      | vel                       | 1.0    |     |     |     |     |
|     |     |                          | motion    | ee     | body     | pos z                     | 2.0    |     |     |     |     |
|     |     |                          | motion    | joint  | pos      |                           | 0.5    |     |     |     |     |
|     |     |                          | motion    | joint  | vel      |                           | 0.25   |     |     |     |     |
|     |     |                          | action    | rate   | l2       |                           | -0.005 |     |     |     |     |
|     |     |                          | joint     | limit  |          |                           | -10.0  |     |     |     |     |
|     |     |                          | undesired |        | contacts |                           | -0.1   |     |     |     |     |
ThesigmavaluesmatchtheG1MotionTrackingdefaults(Table19).
G1 Flip Tracking. The flip variant uses the flat G1 scene with a 360-degree flip reference clip.
Sampling always starts from frame zero, the episode is not truncated when the clip ends, and the
simulationstepis0.005s.
UnderMuJoCoUni,theanchorandend-effectorz-errorthresholdsareboth0.5m,undesired-contact
terminationisenabled,andtheper-jointactionscalematchesG1ClimbTracking.UnderMotrixSim,
thecorrespondingthresholdsandactionscaleusethebaselineenvironmentsettings.
|     |     | Table21:Rewardtermsforg1 |          |         |     |           | flip tracking. |           |     |     |     |
| --- | --- | ------------------------ | -------- | ------- | --- | --------- | -------------- | --------- | --- | --- | --- |
|     |     | Term                     |          |         |     | MuJoCoUni |                | MotrixSim |     |     |     |
|     |     | motion                   | global   | root    | pos | 0.5       |                | 1.0       |     |     |     |
|     |     | motion                   | global   | root    | ori | 0.5       |                | 0.5       |     |     |     |
|     |     | motion                   | body     | pos     |     | 2.0       |                | 1.0       |     |     |     |
|     |     | motion                   | body     | ori     |     | 1.5       |                | 1.0       |     |     |     |
|     |     | motion                   | body     | lin vel |     | 1.0       |                | 1.0       |     |     |     |
|     |     | motion                   | body     | ang vel |     | 1.0       |                | 1.0       |     |     |     |
|     |     | motion                   | ee body  | pos     | z   | 2.0       |                | /         |     |     |     |
|     |     | action                   | rate l2  |         |     | -0.005    |                | -0.05     |     |     |     |
|     |     | joint                    | limit    |         |     | -10.0     |                | -10.0     |     |     |     |
|     |     | undesired                | contacts |         |     | -0.1      |                | /         |     |     |     |
31

G1WallFlipTracking. Thewall-flipvariantusesaflatscenewithawallandawall-flipreference
clip. Samplingalwaysstartsfromframezero, theepisodeisnottruncatedwhentheclipends, the
simulation step is 0.005s, anchor and end-effector z-error thresholds are both 0.5m, undesired-
contact termination is enabled, and the per-joint action scale matches G1 Climb Tracking. Under
MotrixSim,thesolverrunsthreesubstepiterationspercontrolstep.
Reward scales are identical across the two backends and match the climb-tracking weights
(Table20);onlythereferenceclipandthewall-sceneterminationgeometrychange.
G1 Box Tracking. The box variant uses a flat scene with a large box and a box-manipulation
reference clip. It extends G1 Motion Tracking with explicit object-state tracking: the critic
observation appends 12 extra dimensions (object position, object 6D orientation, object linear
velocity, all in body frame) for a 314-dimensional critic. The actor observation remains
176-dimensional. Under MuJoCoUni, the simulation step is 0.005s; under MotrixSim, the base
stepisused.
Under MotrixSim, empirical normalization is enabled, an asymmetric critic observation group is
declared, and observation noise uses level 1.0 with joint-angle scale 0.01, joint-velocity scale 1.5,
andgyroscale0.2.
|     |               | Table22:Rewardtermsforg1 |           | box tracking. |           |     |
| --- | ------------- | ------------------------ | --------- | ------------- | --------- | --- |
|     | Term          |                          |           | MuJoCoUni     | MotrixSim |     |
|     | motion        | global root pos          |           | 0.5           | 1.0       |     |
|     | motion        | global root ori          |           | 0.5           | 0.5       |     |
|     | motion        | body pos                 |           | 1.0           | 1.0       |     |
|     | motion        | body ori                 |           | 1.0           | 1.5       |     |
|     | motion        | body lin vel             |           | 1.0           | 1.0       |     |
|     | motion        | body ang vel             |           | 1.0           | 1.5       |     |
|     | action rate   | l2                       |           | -0.1          | -0.1      |     |
|     | joint limit   |                          |           | -10.0         | -10.0     |     |
|     | undesired     | contacts                 |           | -0.1          | -0.1      |     |
|     | object global | ref position             | error exp | 2.0           | 4.0       |     |
|     | object global | ref orientation          | error exp | 2.0           | 3.0       |     |
Body-tracking sigmas inherit the G1 Motion Tracking defaults; the object-tracking sigmas used
insideexp(−e2/σ2)differbetweenbackends: σ = 0.2(MuJoCoUni)/0.12(MotrixSim),
objectpos
| σ =0.3(MuJoCoUni)/0.2(MotrixSim). |     |     |     |     |     |     |
| --------------------------------- | --- | --- | --- | --- | --- | --- |
objectori
C.3.3 Manipulation-Locomotion
This subsection covers tasks where locomotion is coupled with an upper-body manipulation or
postureobjective. Twotasksareincluded: Go2HandStand(rear-legbalance)andGo2ArmManip
Loco(locomotionwitha6-DOFarmtrackinganend-effectorgoal).
Go2 Hand Stand. Go2HandStand rewards the robot for inverting onto its front legs while
maintaining a target torso height. Under MuJoCoUni the simulation step is 0.005s; under
| MotrixSimitis0.01s. | Controlstep∆t |     | =0.02s,maximumepisode20s. |     |     |     |
| ------------------- | ------------- | --- | ------------------------- | --- | --- | --- |
ctrl
| Observationspace. | Theactorobservationis42-dimensional: |       |             |               |     |     |
| ----------------- | ------------------------------------ | ----- | ----------- | ------------- | --- | --- |
|                   |                                      | o =[ω | , −g , q −q | , q˙ , a      | ],  | (8) |
|                   |                                      | t t   | t t         | default t t−1 |     |     |
where joint offset, joint velocity, and last action are 12-dimensional each. No velocity command
channel; the task is a fixed posture-tracking objective. The critic observation is 46-dimensional
(addsbaselinearvelocity3andtorsoheight1).
Action space. 12-dimensional joint-position offset with default action scale. PD gains K =
p
35.0,K =0.5.
d
32

Commands and termination. The target pose is inverted handstand: target torso height z =
des
0.55m, desired gravity g = (−1,0,0) (body x-axis aligned with world gravity). Termination
des
occurswhentheup-vectorz-componentsatisfiesgz
≤ −0.25(robotfullyinvertedpastthetarget)
t
orwhenundesiredcontactsonfrontlegs/hips/thighsoccur. Arear-leggaitat2Hz(RLphase0,RR
phase0.5)providesaphasesignalforthegait-awarerewardterms.
Domain randomization. Under MotrixSim, Kp/Kd randomization is disabled. No additional
domainrandomizationisenabledontopoftheenvironmentdefaults.
Rewarddesign.Table23liststheactiverewardscales.Thetwobackendsdifferonlyinthefront-leg
contactweight.
|     |                                       |     | Table23:Rewardtermsforgo2 |     |     | handstand. |       |           |     |     |
| --- | ------------------------------------- | --- | ------------------------- | --- | --- | ---------- | ----- | --------- | --- | --- |
|     | Term                                  |     |                           |     |     | MuJoCoUni  |       | MotrixSim |     |     |
|     | Contact(front-leg)                    |     |                           |     |     |            | -1.0  | -0.5      |     |     |
|     | Height                                |     |                           |     |     |            | 1.0   | 1.0       |     |     |
|     | Orientation(alignmenttotargetgravity) |     |                           |     |     |            | 1.0   | 1.0       |     |     |
|     | Pose(deviationfromdefault)            |     |                           |     |     |            | -0.3  | -0.3      |     |     |
|     | Penaltycontact(penaltybodies)         |     |                           |     |     |            | -0.2  | -0.2      |     |     |
|     | Actionrate                            |     |                           |     |     |            | -0.01 | -0.01     |     |     |
|     | Targetpose(tar)                       |     |                           |     |     |            | 0.3   | 0.3       |     |     |
|     | Feetairtime(rearlegs)                 |     |                           |     |     |            | 1.0   | 1.0       |     |     |
|     | Worldz-velocitypenalty                |     |                           |     |     |            | -1.0  | -1.0      |     |     |
Shapingparameters:velocity-trackingσ =0.25andbase-heighttarget0.3monbothbackends.The
|                                |     |     |               |     | theorientationtermuses[0.5cos∠(g,g |     |     |     |     | )+0.5]2, |
| ------------------------------ | --- | --- | ------------- | --- | ---------------------------------- | --- | --- | --- | --- | -------- |
| heighttermusesexp(−|z          |     |     | des −h|/0.1), |     |                                    |     |     |     | des |          |
| andthetarrewardisgatedbyh≥0.8z |     |     |               |     | .                                  |     |     |     |     |          |
des
Go2 Arm Manip Loco. Go2ArmManipLoco is available only on the MuJoCoUni backend.
Simulationstep∆t =0.01s,controlstep∆t =0.02s,maximumepisode20s.
|                   |     | sim                                     |     |     | ctrl |     |     |     |     |     |
| ----------------- | --- | --------------------------------------- | --- | --- | ---- | --- | --- | --- | --- | --- |
| Observationspace. |     | Theper-stepobservationis79-dimensional: |     |     |      |     |     |     |     |     |
pgoal,
|     | o =[vbase, |     | ω , −g | , c , ϕ | , q −q      | , q˙ , | pee, | eee, a | ],  | (9) |
| --- | ---------- | --- | ------ | ------- | ----------- | ------ | ---- | ------ | --- | --- |
|     | t          | t   | t      | t t     | t t default | t      | t t  | t t−1  |     |     |
whereϕ ∈ R4 isthefour-footgaitphase,jointoffset/velocityare18-dimensionaleach(12leg+6
t
arm),pee, pgoal, eee ∈ R3 areend-effectorposition,goal,anderrorinbodyframe,andtheaction
| t   | t   | t   |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
historyis18-dimensional. Theactorobservationdropsbaselinearvelocity(toavoidbypassingthe
on-board estimator) and uses a per-step history of H frames; the critic observation keeps linear
a
| velocityandusesH |     | c frames. | DefaulthistorylengthisH |     |     | a =H | c =1. |     |     |     |
| ---------------- | --- | --------- | ----------------------- | --- | --- | ---- | ----- | --- | --- | --- |
Actionspace.18-dimensional:12leg-jointoffsetswithactionscale0.25(hip-jointscale0.125)and
6arm-jointoffsetswitharmactionscalezero. LegPDgainsK = 35.0,K = 0.5. Withthearm
|     |     |     |     |     |     |     | p   | d   |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
scale set to zero, the policy controls only the legs; the arm follows the IK-derived target from the
end-effectorgoal.
End-effectorgoalsampling. Theend-effectorgoalissampledinsphericalcoordinatesaroundthe
body:radius∈[0.3,0.6]m,azimuth∈[−1.26,1.05]rad,polarangle∈[−2.36,2.36]rad.Trajectory
| ∈ [1.0,3.0]s, |     |           | ∈   | [0.5,2.0]s. |           |         |       | [0.3,0.15,−0.115], |     |       |
| ------------- | --- | --------- | --- | ----------- | --------- | ------- | ----- | ------------------ | --- | ----- |
| time          |     | hold time |     |             | Collision | bounds: | upper |                    |     | lower |
[−0.2,−0.15,−0.515],undergroundlimitz =−0.57.TheIKusesdamping0.05,gain1.0,∆q-clip
0.2,withtarget-orientationtracking.
Commandsandtermination. Velocity-commandrange[(−0.6,−0.4,−0.8),(1.0,0.4,0.8)],zero-
command probability 0.15 (for stable standing), command resampling every 4.0s. The velocity
gz
| curriculumisdisabled. |     | Termination: |     | t ≤0.5. |     |     |     |     |     |     |
| --------------------- | --- | ------------ | --- | ------- | --- | --- | --- | --- | --- | --- |
Domainrandomization. Thefollowingtermsareenabled:body-massmultiplier[0.9,1.1],random
COM offset x ∈ [−0.03,0.03], ground-friction multiplier [0.8,1.2], DOF-armature multiplier
33

[0.8,1.2], base pushes every 500 steps with maximum force [1.2,1.2,0.6], and Kp/Kd multipliers
[0.9,1.1]. Base-massandgravityrandomizationarenotenabled.
Rewarddesign. Table24liststheactiverewardscales.
Table24:Rewardtermsforgo2 arm manip loco.
Term MuJoCoUni
Linearvelocitytracking 2.0
Yawangularvelocitytracking 0.5
Verticallinearvelocity -5.0
Roll/pitchangularvelocity -0.1
Roll -5.0
Baseheight -100.0
Legpose -0.1
Actionrate -0.005
Standstill -0.5
Contactphaseagreement 0.24
Swing-footheight 4.0
Footdrag -0.1
Objectdistance(toEEgoal) 2.0
ObjectdistanceL2 -0.5
Armcollision -1.0
Shaping parameters: velocity-tracking σ = 0.25, base-height target 0.3m, object-distance kernel
σ =0.1.
C.3.4 Dexterous-HandandIn-HandManipulation
This subsection covers in-hand manipulation tasks where a multi-finger hand rotates a free object
about a specified axis. Two tasks are included: Allegro Inhand Rotation (16-DOF hand, ball) and
SharpaInhandRotation(22-DOFhandwithtactilesensing).
AllegroInhandRotation. AllegroInhandRotationrotatesafreeballaboutafixedworld-axis
usingthe16-DOFAllegrohand. Theconfigurationisidenticalacrossthetwobackends. Simulation
step∆t = 0.005s,controlstep∆t = 0.05s(10simulatorstepspercontrolstep),maximum
sim ctrl
episode20s.
Observationspace. Theobservationis105-dimensional,organizedasalag-historyof3stepsofa
35-dimensionalper-stepframe:
f =[qhand, qtarget, pball], (10)
t (cid:101)t t t
where qhand ∈ R16 is the normalized hand joint position (mapped from joint limits to [−2,2]),
(cid:101)t
qtarget ∈ R16 isthecurrentincrementaljointtarget,andpball ∈ R3 istheballposition. Actorand
t t
criticshareasingleobservationgroup;thecritichasnoprivilegedchannel.
Action space. 16-dimensional in [−1,1]. The environment maps actions to actuator targets
incrementally: qtarget = qtarget + sclip(a ) with s = 1/24 ≈ 0.0417, then clipped to the
t t−1 t
actuator-rangelimits. PDgainsK =1.0,K =0.1. Torqueisclippedto[−0.5,0.5].
p d
Commands and termination. The rotation axis is the world z-axis, nˆ = (0,0,1). The episode
terminateswhentheballheightdropsbelow0.125m.
Domainrandomization. Allonlinedomainrandomizationisdisabled(base-mass,COM,gravity,
push,jointnoise,ball-velocitynoise,ball-z offset). Reset-timegraspvariationistheonlysourceof
initializationdiversity.
Rewarddesign. Rewardscalesareidenticalacrossthetwobackends(Table25).
34

|     | Table25:Rewardtermsforallegro   |     | inhand(mj/mxidentical). |        |     |
| --- | ------------------------------- | --- | ----------------------- | ------ | --- |
|     | Term                            |     |                         | Weight |     |
|     | rotate(clip(ωball·nˆ,−0.5,0.5)) |     |                         | 1.25   |     |
(cid:80)
|     | obj  | linvel( |vball|) |           | -0.3 |     |
| --- | ---- | ---------------- | --------- | ---- | --- |
|     |      | (cid:80)i        | i         |      |     |
|     | pose | diff( (q         | −qinit)2) | -0.3 |     |
|     |      | j                | j j       |      |     |
(cid:80)
|     | torque( | τ2) |     | -0.1 |     |
| --- | ------- | --- | --- | ---- | --- |
j j
|     | work(( | (cid:80) τ q˙ | )2) | -2.0 |     |
| --- | ------ | ------------- | --- | ---- | --- |
j j j
Shaping parameters: angular-velocity clip range [−0.5,0.5]rad/s inside the rotate term, and ball-
(cid:80)
heightresetthreshold0.125musedbytheterminationcheck. Therewardis∆t w r .
ctrl i i i
SharpaInhandRotation. SharpaInhandRotationrotatesacylinderusingthe22-DOFSharpa
handwithtactilesensing. ThenumbersreportedherecorrespondtotheMuJoCoUniHORAteacher
configuration,whichissharedbytheAPPO,SAC,andPPOHORAcomparisons. Simulationstep
| 1/240s,controlstep∆t | =12/240=0.05s,maximumepisode20s. |     |     |     |     |
| -------------------- | -------------------------------- | --- | --- | --- | --- |
ctrl
| Observationspace. | Theper-steppolicyframeis49-dimensional: |              |                     |     |      |
| ----------------- | --------------------------------------- | ------------ | ------------------- | --- | ---- |
|                   |                                         | f =[qhand,   | qtarget, Ftactile], |     | (11) |
|                   |                                         | t (cid:101)t | t t                 |     |      |
withqhand ∈ R22, qtarget ∈ R22, andtactileforcesFtactile ∈ R5 (oneperfingertip). Theframe
| (cid:101)t | t   |     | t   |     |     |
| ---------- | --- | --- | --- | --- | --- |
is stacked over a 3-step lag history, giving a 147-dimensional policy observation. The privileged
tail is 9-dimensional: object position delta (3), friction scale (1), mass (1), COM offset (3), and
objectscale(1). Inflattenedmodethesingleobservationgroupis147+9 = 156-dimensional. In
separatedmodetheactorreceivesthe147-dimensionalpolicyobservation,whilethecriticreceives
the156-dimensionalconcatenation.
qtarget qtarget
Action space. 22-dimensional in [−1,1]. Incremental position control: = +
t t−1
sclip(a ),s = 1/24,withjointlimitsscaledby0.9. PDgainsaresetperactuatorandrandomized
t
atresetwithin[0.5,2.0]aroundtheirnominalvalues.
Commandsandtermination. Rotationaxisnˆ =(0,0,1). Terminationusesobjectworld-z height
bounds [pobj − 0.5∆h,pobj + 0.5∆h] with ∆h = 0.04m centered on the reset object position;
| z   | z   |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
the fallback bounds are [0.59906,0.63906]m. The rotation rollout does not use angular-violation
termination;angulardeviationisusedonlyduringofflinegrasp-statefiltering.
Domainrandomization. Arichrandomizationstackisenabledonbothbackends(Table26). The
reported Sharpa teacher runs use eight cylinder scales {0.8...1.5}, excluding 1.6 to align with
the external baseline setup. Theactive gravity settingis fixed-magnitude direction randomization;
full-vectorgravityrandomizationisdisabled.
| Rewarddesign. | Rewardscalesareidenticalacrossthetwobackends(Table27). |     |     |     |     |
| ------------- | ------------------------------------------------------ | --- | --- | --- | --- |
Therotatetermclipsitsangular-velocityargumentto[−0.5,0.5]rad/sbeforeapplyingtheweight.
C.4 AlgorithmHyperparameters
Thissubsectionliststheper-algorithmglobaldefaultsandtheper-taskoverridesappliedontopof
them. Rewardweightsandenvironment-sidehyperparametersaredocumentedinSectionC.3;only
algorithm-sidetraininghyperparametersappearhere.
C.4.1 PPO
WereportPPOhyperparametersasglobaldefaultsfollowedbyper-taskoverrides.
PPO global defaults. Table 28 lists the global defaults inherited by every PPO task before any
per-taskoverride.
35

|                                    | Table26:Domainrandomizationforsharpa |                |                         | inhand.      |
| ---------------------------------- | ------------------------------------ | -------------- | ----------------------- | ------------ |
| Item                               |                                      |                | MuJoCoUni               | MotrixSim    |
| Scalelist(cylindersizes)           |                                      |                | {0.8...1.5}             | {0.8...1.5}  |
| randomize                          | gravity                              | direction      | true                    | true         |
| Gravitymagnitude                   |                                      |                | 9.81                    | 9.81         |
| randomize                          | gravity(fullvector)                  |                | false                   | false        |
| randomize                          | pd gains                             |                | true                    | true         |
| K p scalerange                     |                                      |                | [0.5,2.0]               | [0.5,2.0]    |
| K d scalerange                     |                                      |                | [0.5,2.0]               | [0.5,2.0]    |
| randomize                          | friction                             |                | true                    | true         |
| Frictionscalerange                 |                                      |                | [0.75,1.25]             | [0.75,1.25]  |
| Elastomer/metal/objectbasefriction |                                      |                | 2.0,1.0,2.0             | 2.0,1.0,2.0  |
| randomize                          | com                                  |                | true                    | true         |
| COMoffsetrange                     |                                      |                | [−0.01,0.01]            | [−0.01,0.01] |
| randomize                          | mass                                 |                | true                    | true         |
| Massrange                          |                                      |                | [0.01,0.25]             | [0.01,0.25]  |
| Forceperturbationscale             |                                      |                | 2.0                     | 2.0          |
| Forceprobabilityperstep            |                                      |                | 0.25                    | 0.25         |
| Forcedecay/interval                |                                      |                | 0.9/0.08                | 0.9/0.08     |
| Jointobservationnoisescale         |                                      |                | 0.02                    | 0.02         |
| Contactlatency                     |                                      |                | 0.005                   | 0.005        |
| Contactsensornoise                 |                                      |                | 0.01                    | 0.01         |
| Table27:Rewardtermsforsharpa       |                                      |                | inhand(mj/mxidentical). |              |
|                                    | Term                                 |                |                         | Weight       |
|                                    | rotate(clip(ωobj                     | ·nˆ,−0.5,0.5)) |                         | 2.5          |
(cid:80)
|     | obj linvel(                  | |vobj|)           |     | -0.3  |
| --- | ---------------------------- | ----------------- | --- | ----- |
|     |                              | i i               |     |       |
|     |                              | (cid:80) −qdef)2) |     |       |
|     | pose diff(                   | (q j              |     | -0.4  |
|     |                              | j j               |     |       |
|     | torque(squaredvirtualtorque) |                   |     | -0.1  |
|     | work(( (cid:80)              | τ q˙ )2)          |     | -0.5  |
|     |                              | j j j             |     |       |
|     | object pos(1/(∥pobj          | −panchor∥+10−3))  |     | 0.003 |
PPO overrides across tasks. Tables 29–31 summarize the PPO-side overrides for each task.
Fields not listed are inherited from Table 28. When the two backends differ, the value is written
as“mj/mx”;identicalvaluesarewrittenonce.
For Go1 Joystick Flat, empirical normalization, the lower action-noise std, and the lower learning
rate/entropycoefficientareappliedonlyunderMotrixSim.Go2JoystickFlatusesthesamelowered
valuesonbothbackends. Go1/Go2JoystickRoughshareasinglehyperparametersetbetweenthe
twobackendswithaction-noisestd1.0andentropycoefficient0.01.Go2WJoystickFlatandRough
usethesamehyperparametersonbothbackendsapartfromrolloutlengthanditerationcountinthe
Roughcase.
Asymmetric observation groups means the actor and critic see different channels, enabling
privilegedcriticobservations. G1WalkFlatenablesthisonlyunderMotrixSim. G1BoxTracking
uses num envs= 1024, max iterations= 30000/40000, empirical normalization false / true,
entropy coefficient 0.005/0.002, save interval 500, and asymmetric observation groups under
MotrixSim.
Go2ArmManipLocoisavailableonlyunderMuJoCoUni;theMotrixSimcolumndoesnotapply.
Allegro Inhand and generic Sharpa Inhand use identical hyperparameters on both backends. The
SharpacolumnreportstheHORAPPOsettingusedforthemainSharpaPPOcomparison.
36

Table28:PPOglobaldefaulthyperparameters.
|     | Field |     |     | DefaultValue |     |     |
| --- | ----- | --- | --- | ------------ | --- | --- |
Runner/Environment
|     | algo               |               |     | ppo            |     |     |
| --- | ------------------ | ------------- | --- | -------------- | --- | --- |
|     | algo log           | name          |     | rsl rl ppo     |     |     |
|     | seed               |               |     | 1              |     |     |
|     | num envs           |               |     | 4096           |     |     |
|     | num steps          | per env       |     | 24             |     |     |
|     | max iterations     |               |     | 101            |     |     |
|     | save interval      |               |     | 100            |     |     |
|     | empirical          | normalization |     | false          |     |     |
|     | runner class       | name          |     | OnPolicyRunner |     |     |
|     | obs groups.default |               |     | [policy]       |     |     |
Policynetwork
|     | policy.class      | name        |     | ActorCritic   |     |     |
| --- | ----------------- | ----------- | --- | ------------- | --- | --- |
|     | policy.actor      | hidden dims |     | [512,256,128] |     |     |
|     | policy.critic     | hidden dims |     | [512,256,128] |     |     |
|     | policy.activation |             |     | elu           |     |     |
|     | policy.init       | noise std   |     | 1.0           |     |     |
Algorithm
|     | algorithm.class    | name            |          | FinalObservationAwarePPO |     |     |
| --- | ------------------ | --------------- | -------- | ------------------------ | --- | --- |
|     | algorithm.value    | loss coef       |          | 1.0                      |     |     |
|     | algorithm.use      | clipped value   | loss     | true                     |     |     |
|     | algorithm.clip     | param           |          | 0.2                      |     |     |
|     | algorithm.entropy  | coef            |          | 0.01                     |     |     |
|     | algorithm.num      | learning epochs |          | 5                        |     |     |
|     | algorithm.num      | mini batches    |          | 4                        |     |     |
|     | algorithm.learning | rate            |          | 1.0×10−3                 |     |     |
|     | algorithm.schedule |                 |          | adaptive                 |     |     |
|     | algorithm.gamma    |                 |          | 0.99                     |     |     |
|     | algorithm.lam      |                 |          | 0.95                     |     |     |
|     | algorithm.desired  | kl              |          | 0.01                     |     |     |
|     | algorithm.max      | grad norm       |          | 1.0                      |     |     |
|     | algorithm.adaptive | kl beta         |          | 0.9                      |     |     |
|     | algorithm.adaptive | lr growth       |          | 1.1                      |     |     |
|     | algorithm.adaptive | lr decay        |          | 1.2                      |     |     |
|     | algorithm.adaptive | lr update       | interval | 5                        |     |     |
Table29:PPOoverridesforlocomotiontasks(Go1,Go2,Go2Wfamilies).Cellswithaslashreport“mj/mx”
values;singlevaluesaresharedbetweenthetwobackends.
| Field          |         | Go1Flat | Go1Rough | Go2Flat Go2Rough | Go2WFlat | Go2WRough |
| -------------- | ------- | ------- | -------- | ---------------- | -------- | --------- |
| num envs       |         | 4096    | 4096     | 1024 4096        | 1024     | 2048      |
| num steps      | per env | 24      | 24       | 24 24            | 24       | 48/24     |
| max iterations |         | 151     | 600      | 151 1000         | 151      | 5000/2000 |
empirical normalization false/true false true false true false
| init noise | std  | inherited/0.5 | 1.0  | 0.5 1.0     | 0.5    | inherited |
| ---------- | ---- | ------------- | ---- | ----------- | ------ | --------- |
| learning   | rate | 10−3/3×10−4   | 10−3 | 3×10−4 10−3 | 3×10−4 | inherited |
| entropy    | coef | 0.01/10−3     | 0.01 | 10−3 0.01   | 10−3   | inherited |
37

Table 30: PPO overrides for humanoid locomotion and tracking tasks. Cells with a slash report “mj / mx”
values;singlevaluesaresharedbetweenthetwobackends.
| Field          |         | G1WalkFlat | G1Motion | G1Climb | G1Flip      | G1WallFlip  |
| -------------- | ------- | ---------- | -------- | ------- | ----------- | ----------- |
| num envs       |         | 2048       | 1024     | 1024    | 1024        | 1024        |
| num steps      | per env | 24         | 24       | 24      | 24          | 24          |
| max iterations |         | 2200       | 15000    | 20000   | 20000/30000 | 20000/12000 |
empirical normalization false/true false true true/false true
init noise std inherited/0.5 inherited inherited inherited inherited
| learning      | rate | 10−3/3×10−4 | 10−3      | 10−3  | 10−3      | 10−3  |
| ------------- | ---- | ----------- | --------- | ----- | --------- | ----- |
| entropy       | coef | 0.01/5×10−3 | 0.005     | 0.005 | 0.005     | 0.005 |
| desired       | kl   | inherited   | inherited | 0.01  | 0.01/inh. | 0.01  |
| save interval |      | 100         | 500       | 500   | 500       | 500   |
obs groups symmetric/asymmetric symmetric asymmetric asymmetric asymmetric
Table31:PPOoverridesforhandstand,arm-loco,anddexteroustasks.
| Field          |               | Go2HandStand | Go2ArmLoco | Allegro   | SharpaHORAPPO |           |
| -------------- | ------------- | ------------ | ---------- | --------- | ------------- | --------- |
| num envs       |               | 1024         | 4096       | 16384     |               | 2048      |
| num steps      | per env       | 24           | 24         | 8         |               | 24        |
| max iterations |               | 3000         | 151        | 201       |               | 301       |
| empirical      | normalization | inherited    | true       | true      |               | true      |
|                |               | 0.5          | 0.5        |           |               |           |
| init noise     | std           |              |            | inherited |               | inherited |
|                |               |              | 3×10−4     |           |               | 10−3      |
| learning       | rate          | inherited    |            | inherited |               |           |
| entropy        | coef          | 0.005        | 10−3       | 0.01      |               | 0.01      |
| value loss     | coef          | inherited    | inherited  | 4.0       |               | 4.0       |
| desired        | kl            | inherited    | inherited  | 0.02      |               | 0.02      |
| save interval  |               | inherited    | inherited  | inherited |               | 50        |
obs groups asymmetric symmetric symmetric actor/criticboth[actor]
C.4.2 APPO
APPO is the asynchronous on-policy variant used in UniLab; it shares PPO’s clipped-surrogate
objective but allows the learner to consume rollouts produced with a slightly stale policy. Only
APPOtraininghyperparametersappearhere; task-sidevalues(rewards, observation/actionspaces,
domainrandomization)aredocumentedinthetaskspecificationsabove.
APPOglobaldefaults.
Table32liststheglobaldefaultsinheritedbyeveryAPPOtaskbeforeany
per-taskoverride.
APPOoverridesacrosstasks. Tables33and 34listtheper-taskoverrides. Fieldsnotlistedare
inheritedfromTable32. Whenthetwobackendsdiffer,thevalueiswrittenas“mj/mx”;identical
valuesappearonce.
Go1/Go2 Joystick Flat run under MuJoCoUni only. The Sharpa HORA setting uses
runtime impl=hora appo, separated actor/critic observations, a 9-dimensional privileged
embedding,andHORAactor/criticmodelclasses. Thegenericnon-HORASharpaAPPOsettingis
nottheteacherrecipereportedfortheSharpaHORAcurves.
All four motion-tracking tasks use the same APPO configuration on both backends. G1 Box
TrackingisnotavailableunderAPPO.
C.4.3 SAC
SACistheentropy-regularizedoff-policyactor-criticusedinUniLabforreplay-bufferexperiments.
Thesharedfamilycontainstwoimplementationvariants: thestandardSACtrainer(algo: sac)
and the FlashSAC accelerated variant (algo: flashsac). Both consume rollouts via a replay
bufferandrespecttheoff-policyproducer/consumerprotocoldescribedinthemaintext.
38

Table32:APPOglobaldefaulthyperparameters.
|     | Field |     |     |     |     | DefaultValue |     |     |
| --- | ----- | --- | --- | --- | --- | ------------ | --- | --- |
Runner/Environment
|     | algo  |              |     |     |     | appo     |     |     |
| --- | ----- | ------------ | --- | --- | --- | -------- | --- | --- |
|     | algo  | log name     |     |     |     | appo     |     |     |
|     | seed  |              |     |     |     | 1        |     |     |
|     | num   | envs         |     |     |     | 2048     |     |     |
|     | steps | per env      |     |     |     | 24       |     |     |
|     | max   | iterations   |     |     |     | 150      |     |     |
|     | save  | interval     |     |     |     | 50       |     |     |
|     | obs   | groups.actor |     |     |     | {policy: | 0}  |     |
Actor/Criticnetworks
|     | actor.class        |     | name          |           |      | rsl                  | rl.models.MLPModel |     |
| --- | ------------------ | --- | ------------- | --------- | ---- | -------------------- | ------------------ | --- |
|     | actor.hidden       |     | dims          |           |      | [512,256,128]        |                    |     |
|     | actor.activation   |     |               |           |      | elu                  |                    |     |
|     | actor.obs          |     | normalization |           |      | false                |                    |     |
|     | actor.distribution |     |               | cfg.class | name | GaussianDistribution |                    |     |
|     | actor.distribution |     |               | cfg.init  | std  | 1.0                  |                    |     |
|     | actor.distribution |     |               | cfg.std   | type | scalar               |                    |     |
|     | critic.class       |     | name          |           |      | rsl                  | rl.models.MLPModel |     |
|     | critic.hidden      |     | dims          |           |      | [512,256,128]        |                    |     |
|     | critic.activation  |     |               |           |      | elu                  |                    |     |
|     | critic.obs         |     | normalization |           |      | false                |                    |     |
Algorithm
|     | algorithm.num               |     | learning | epochs    |      | 5        |     |     |
| --- | --------------------------- | --- | -------- | --------- | ---- | -------- | --- | --- |
|     | algorithm.num               |     | mini     | batches   |      | 4        |     |     |
|     | algorithm.clip              |     | param    |           |      | 0.2      |     |     |
|     | algorithm.gamma             |     |          |           |      | 0.99     |     |     |
|     | algorithm.lam               |     |          |           |      | 0.95     |     |     |
|     | algorithm.value             |     |          | loss coef |      | 1.0      |     |     |
|     | algorithm.entropy           |     |          | coef      |      | 0.01     |     |     |
|     | algorithm.learning          |     |          | rate      |      | 1.0×10−3 |     |     |
|     | algorithm.max               |     | grad     | norm      |      | 1.0      |     |     |
|     | algorithm.use               |     | clipped  | value     | loss | true     |     |     |
|     | algorithm.schedule          |     |          |           |      | adaptive |     |     |
|     | algorithm.desired           |     |          | kl        |      | 0.01     |     |     |
|     | algorithm.adaptive          |     |          | kl factor |      | 1.2      |     |     |
|     | algorithm.adaptive          |     |          | lr factor |      | 1.1      |     |     |
|     | algorithm.optimizer         |     |          |           |      | adam     |     |     |
|     | algorithm.tau(targetupdate) |     |          |           |      | 1.0      |     |     |
|     | algorithm.target            |     |          | update    | freq | 1        |     |     |
|     | algorithm.vtrace            |     |          | clip rho  |      | 1.0      |     |     |
|     | algorithm.vtrace            |     |          | clip c    |      | 1.0      |     |     |
Table33:APPOoverridesforlocomotionanddexteroustasks.
| Field             |               |       |      | Go1Flat   | Go2Flat   |     | AllegroMuJoCo | SharpaHORA |
| ----------------- | ------------- | ----- | ---- | --------- | --------- | --- | ------------- | ---------- |
| num envs          |               |       |      | inherited | inherited |     | 1024          | 2048       |
| steps             | per env       |       |      | inherited | inherited |     | 8             | 8          |
| max iterations    |               |       |      | 150       |           | 150 | 3000          | 1360       |
| save              | interval      |       |      | inherited | inherited |     | 5000          | 170        |
| training.replay   |               | queue | size | inherited | inherited |     | 4             | 8          |
| actor.obs         | normalization |       |      | inherited | inherited |     | true          | true       |
| critic.obs        | normalization |       |      | inherited | inherited |     | true          | true       |
| algorithm.value   |               | loss  | coef | inherited | inherited |     | 4.0           | 4.0        |
| algorithm.desired |               |       | kl   | inherited | inherited |     | 0.025         | 0.04       |
39

Table34:APPOoverridesformotion-trackingtasks(mj/mxidenticalforallfour).
| Field          | G1Motion  | G1Climb   | G1Flip    | G1WallFlip |
| -------------- | --------- | --------- | --------- | ---------- |
| num envs       | 1024      | 1024      | 1024      | 1024       |
| steps per env  | inherited | inherited | inherited | inherited  |
| max iterations | 5000      | 20000     | 5000      | 5000       |
| save interval  | 500       | 500       | 500       | 500        |
SAC global defaults. Table 35 lists the global defaults inherited by every SAC task before any
per-taskoverride.
Table35:SACglobaldefaulthyperparameters.
| Field |     |     | DefaultValue |     |
| ----- | --- | --- | ------------ | --- |
Runner/Replay
| algo           |           |     | sac  |     |
| -------------- | --------- | --- | ---- | --- |
| algo log       | name      |     | fast | sac |
| seed           |           |     | 1    |     |
| num envs       |           |     | 4096 |     |
| batch size     |           |     | 8192 |     |
| replay         | buffer n  |     | 512  |     |
| updates        | per step  |     | 4    |     |
| learning       | starts    |     | 1    |     |
| policy         | frequency |     | 4    |     |
| env steps      | per sync  |     | 1    |     |
| max iterations |           |     | 500  |     |
| save interval  |           |     | 500  |     |
Network
| actor hidden      | dim        |     | 512   |     |
| ----------------- | ---------- | --- | ----- | --- |
| critic            | hidden dim |     | 768   |     |
| num atoms         |            |     | 101   |     |
| obs normalization |            |     | true  |     |
| use layer         | norm       |     | true  |     |
| use symmetry      |            |     | false |     |
Algorithm
| gamma    |     |     | 0.97     |     |
| -------- | --- | --- | -------- | --- |
| tau      |     |     | 0.125    |     |
| actor lr |     |     | 3.0×10−4 |     |
| critic   | lr  |     | 3.0×10−4 |     |
3.0×10−4
| algo params.alpha |     | lr  |     |     |
| ----------------- | --- | --- | --- | --- |
0.01
| algo params.alpha  |     | init          |      |     |
| ------------------ | --- | ------------- | ---- | --- |
| algo params.target |     | entropy ratio | 0.0  |     |
| algo params.max    |     | grad norm     | 0.0  |     |
| algo params.amp    |     | dtype         | auto |     |
| algo params.use    |     | compile       | true |     |
FlashSACglobaldefaults. Table36givestheresolvedFlashSACdefaults. Thetworecipesdiffer
inactor/criticcapacity,replay-bufferwarmuplength,andtheadditionofFlashSAC-specificreward
/temperatureparameters.
SACandFlashSACoverridesacrosstasks. Tables37and 39summarizetheper-taskoverrides.
Fieldsnotlistedareinheritedfromthecorrespondingdefaulttables. Whenthetwobackendsdiffer,
thevalueiswrittenas“mj/mx”;identicalvaluesappearonce.
G1 Motion Tracking under SAC shares the same environment as the PPO/APPO version;
under MotrixSim only the backend identity and the Kp/Kd randomization switches differ from
MuJoCoUni.
40

Table36:FlashSACglobaldefaulthyperparameters.
| Field |     |     |     |     | DefaultValue |     |     |
| ----- | --- | --- | --- | --- | ------------ | --- | --- |
Runner/Replay
| algo     |            |      |     |     | flashsac  |     |     |
| -------- | ---------- | ---- | --- | --- | --------- | --- | --- |
| algo     | log name   |      |     |     | flash sac |     |     |
| num      | envs       |      |     |     | 1024      |     |     |
| batch    | size       |      |     |     | 2048      |     |     |
| replay   | buffer     | n    |     |     | 512       |     |     |
| updates  | per        | step |     |     | 2         |     |     |
| learning | starts     |      |     |     | 98        |     |     |
| policy   | frequency  |      |     |     | 2         |     |     |
| max      | iterations |      |     |     | 5000      |     |     |
| save     | interval   |      |     |     | 1000      |     |     |
Network
| actor  | hidden        | dim |            |     | 128   |     |     |
| ------ | ------------- | --- | ---------- | --- | ----- | --- | --- |
| critic | hidden        | dim |            |     | 256   |     |     |
| num    | atoms         |     |            |     | 101   |     |     |
| obs    | normalization |     |            |     | false |     |     |
| use    | layer norm    |     |            |     | false |     |     |
| algo   | params.actor  |     | num blocks |     | 2     |     |     |
| algo   | params.critic |     | num blocks |     | 2     |     |     |
Algorithm
| gamma  |                   |         |              |               | 0.97                       |     |     |
| ------ | ----------------- | ------- | ------------ | ------------- | -------------------------- | --- | --- |
| tau    |                   |         |              |               | 0.01                       |     |     |
| actor  | lr                |         |              |               | 3.0×10−4                   |     |     |
| critic | lr                |         |              |               | 3.0×10−4                   |     |     |
| algo   | params.normalize  |         | reward       |               | true                       |     |     |
| algo   | params.normalized |         | g max        |               | 5.0                        |     |     |
| algo   | params.actor      |         | bc alpha     |               | 0.0                        |     |     |
| algo   | params.actor      |         | noise zeta   | mu            | 2.0                        |     |     |
| algo   | params.actor      |         | noise zeta   | max           | 16                         |     |     |
| algo   | params.critic     |         | min v/critic | max v         | −5.0/5.0                   |     |     |
| algo   | params.temp       | initial | value        |               | 0.01                       |     |     |
| algo   | params.temp       | target  | sigma        |               | 0.15                       |     |     |
| algo   | params.temp       | target  | entropy      |               | null                       |     |     |
| algo   | params.learning   |         | rate         | init / peak / | end 3×10−4/3×10−4/1.5×10−4 |     |     |
| algo   | params.learning   |         | rate         | warmup steps  | 0                          |     |     |
| algo   | params.learning   |         | rate         | decay steps   | 500,000                    |     |     |
| algo   | params.n          | step    |              |               | 1                          |     |     |
Table37:SACoverridesforG1walkandmotion-trackingtasks.
| Field              |          |           |       | G1WalkFlat | G1WalkRough | G1MotionTracking |           |
| ------------------ | -------- | --------- | ----- | ---------- | ----------- | ---------------- | --------- |
| num envs           |          |           |       | 2048       | 2048        |                  | 2048      |
| learning           | starts   |           |       | 10/1       | 10/1        |                  | inherited |
| max iterations     |          |           |       | 5000       | 5000        |                  | 25000     |
| save interval      |          |           |       | 1000       | 1000        |                  | 1000      |
| updates            | per step |           |       | 8          | 8           |                  | 4         |
| policy frequency   |          |           |       | inherited  | inherited   |                  | 2         |
| use symmetry       |          |           |       | true/false | true/false  |                  | false     |
| gamma              |          |           |       | inherited  | inherited   |                  | 0.99      |
| tau                |          |           |       | inherited  | inherited   |                  | 0.05      |
| num atoms          |          |           |       | inherited  | inherited   |                  | 501       |
| algo params.alpha  |          | init      |       | 0.001      | 0.001       |                  | 0.1       |
| algo params.target |          | entropy   | ratio | 0.0        | 0.0         |                  | 0.5       |
| algo params.max    |          | grad norm |       | inherited  | inherited   |                  | 10.0      |
41

Table38:HORASACoverridesforSharpaInhandRotation.
| Field            |          |          | SharpaHORASAC |     |
| ---------------- | -------- | -------- | ------------- | --- |
| runtime          | impl     |          | hora          | sac |
| num envs         |          |          | 1024          |     |
| batch size       |          |          | 2048          |     |
| replay buffer    | n        |          | 1280          |     |
| training.env     | steps    | per sync | 2             |     |
| updates          | per step |          | 14            |     |
| policy frequency |          |          | 2             |     |
| learning         | starts   |          | 1             |     |
| max iterations   |          |          | 39063         |     |
| save interval    |          |          | 1000          |     |
4.5×10−4
| actor lr,critic |     | lr,alpha lr |      |     |
| --------------- | --- | ----------- | ---- | --- |
| training.use    | amp |             | true |     |
| algo params.use |     | compile     | true |     |
9
| actor.priv | info | embed dim |     |     |
| ---------- | ---- | --------- | --- | --- |
[256,128,9]
| actor.priv | mlp | hidden dims |     |     |
| ---------- | --- | ----------- | --- | --- |
The Sharpa HORA SAC setting keeps the standard SAC replay objective and uses a HORA-style
SAC actor that consumes the 9-dimensional privileged tail described in Section C.3.4. Task-side
reward,observation,action,anddomain-randomizationvaluesarethereforedocumentedonceinthe
Sharpatasksubsectionratherthanrepeatedhere.
Table39:FlashSACoverridesforG1WalkFlatandGo2JoystickFlat.
| Field          |          | G1WalkFlat | Go2JoystickFlat |           |
| -------------- | -------- | ---------- | --------------- | --------- |
| num envs       |          | 4096       |                 | 1024      |
| batch size     |          | inherited  |                 | inherited |
| replay buffer  | n        | 256        |                 | 4096      |
| learning       | starts   | 49         |                 | 50        |
| updates        | per step | 8          |                 | 2         |
| max iterations |          | 5000       |                 | 4000      |
| save interval  |          | 1000       |                 | 1000      |
| tau            |          | 0.05       |                 | 0.05      |
BothFlashSACtasksareavailableonlyunderMuJoCoUni.
42
