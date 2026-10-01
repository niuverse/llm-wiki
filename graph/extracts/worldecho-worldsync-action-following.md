|     |     | Do  | Robotic |     | World | Models | Really | Follow | Actions? |     |     |     |     |     |
| --- | --- | --- | ------- | --- | ----- | ------ | ------ | ------ | -------- | --- | --- | --- | --- | --- |
Diagnosing and Aligning Action-Conditioned Generation for Policy Learning
SixiangChen1,JiamingLiu1*,JixianWu2,3*,YichenGuo5*,TinghaoWang2,4*,
SiyuanQian1,HaoChen6,JiajunCao2,1,JianTang2(cid:66),ShanghangZhang1(cid:66)
1StateKeyLaboratoryofMultimediaInformationProcessing,SchoolofComputerScience,PekingUniversity
2BeijingInnovationCenterofHumanoidRobotics
3NewYorkUniversity 4UniversityofElectronicScienceandTechnologyofChina
|     |     | 5NanyangTechnologicalUniversity |     |     |     |     | 6TheChineseUniversityofHongKong |     |     |     |     |     |     |     |
| --- | --- | ------------------------------- | --- | --- | --- | --- | ------------------------------- | --- | --- | --- | --- | --- | --- | --- |
6202 guA 52  ]OR.sc[  1v58842.8062:viXra Abstract etal.2026;Lietal.2025b).Subsequentstudieshavelever-
|     |     |     |     |     |     |     | aged AC-WMs |     | to provide | synthetic | experience |     | for | policy |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --- | ---------- | --------- | ---------- | --- | --- | ------ |
Action-conditioned world models are increasingly used as post-training (Guo et al. 2026a; Yu et al. 2026; Xiao et al.
learnedsimulatorsforpolicyevaluationandimprovement,yet
2026;Lietal.2025a;Jiangetal.2026b),leadingtoimproved
theireffectivenessrestsonanunverifiedassumption:gener-
policyperformanceinreal-worlddeployment.Nevertheless,
atedfuturesfaithfullyreflectarbitraryvalidactions.Existing
|     |     |     |     |     |     |     | these approaches |     | rest | upon a | critical yet | largely | unverified |     |
| --- | --- | --- | --- | --- | --- | --- | ---------------- | --- | ---- | ------ | ------------ | ------- | ---------- | --- |
benchmarksaretypicallyconfinedtoexpertdemonstrations,
assumption:AC-WMsgenuinelycaptureworlddynamics
leavingoff-expertactionfollowinginadequatelyevaluated.To
andproduceaccurateresponsestoarbitraryvalidaction
addressthisgap,weintroduceWorldEcho,whichprobesac-
tionfollowingoverabroaderactiondistributionusingvisual inputs (Quevedo et al. 2026; Guo et al. 2026a; Yang et al.
| integrityandSE(3)trajectoryalignment.Ourdiagnosisshows |     |     |     |     |     |     | 2026a). |     |     |     |     |     |     |     |
| ------------------------------------------------------ | --- | --- | --- | --- | --- | --- | ------- | --- | --- | --- | --- | --- | --- | --- |
thatcurrentworldmodelsreasonablyexecuteexpertactions Faithful action following is a prerequisite for using AC-
butstrugglewithdiverseoff-experttrajectories,eitherignor- WMs as reliable simulators for policy evaluation and post-
ingthecommandedactionsorproducingvisuallyinvalidroll-
training(Lietal.2026b).Forevaluation,plausiblebutaction-
outs.WefurtherproposeWorldSync,whichstrengthensac-
|     |     |     |     |     |     |     | inconsistent | futures | can | misrepresent |     | the consequences |     | of  |
| --- | --- | --- | --- | --- | --- | --- | ------------ | ------- | --- | ------------ | --- | ---------------- | --- | --- |
tionfollowingalongthreecomplementaryaxes:distributional
candidateactions,creatingagapbetweensimulatedandreal-
coverage,representationalgrounding,andintervention-effect
alignment. It broadens the training distribution over action world policy performance (Quevedo et al. 2026; Li et al.
consequences,groundsintermediatevideorepresentationsin 2025b). For post-training, unreliable rollouts require addi-
| action-induced |     | robot dynamics | through | an  | Action-Forcing |     |     |     |     |     |     |     |     |     |
| -------------- | --- | -------------- | ------- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
tionalverification,rejection,orfilteringbeforetheycanpro-
| Expert, | and aligns | predicted | changes | under | action | interven- |                  |     |             |     |         |            |     |        |
| ------- | ---------- | --------- | ------- | ----- | ------ | --------- | ---------------- | --- | ----------- | --- | ------- | ---------- | --- | ------ |
|         |            |           |         |       |        |           | vide trustworthy |     | supervision |     | (Guo et | al. 2026a; | Yu  | et al. |
tionswiththecorrespondingchangesinground-truthfutures.
|             |     |          |            |     |            |       | 2026), increasing |     | overhead  | and    | reducing  | the | yield         | of us- |
| ----------- | --- | -------- | ---------- | --- | ---------- | ----- | ----------------- | --- | --------- | ------ | --------- | --- | ------------- | ------ |
| Experiments | on  | RoboTwin | benchmarks | and | real-robot | tasks |                   |     |           |        |           |     |               |        |
|             |     |          |            |     |            |       | able experience.  |     | Improving | action | following |     | can therefore |        |
showthatWorldSyncimprovesWorldEchometricsandserves
enhanceevaluationfidelityanddelivermoreusefultraining
asamorereliablesimulatorforiterativepolicyimprovement,
enablingpoliciestoachievehighersuccessrates. dataunderafixedinteractionandgenerationbudget.Exist-
|     |     |     |     |     |     |     | ing world | model | benchmarks |     | mainly assess | perceptual |     | and |
| --- | --- | --- | --- | --- | --- | --- | --------- | ----- | ---------- | --- | ------------- | ---------- | --- | --- |
semanticquality,similaritytoreferencebehaviors,ordown-
1 Introduction stream executability (Hu et al. 2025; Shang et al. 2026a;
|     |     |     |     |     |     |     | Jiang et | al. 2026a). | Recent | studies | have | begun | to  | exam- |
| --- | --- | --- | --- | --- | --- | --- | -------- | ----------- | ------ | ------- | ---- | ----- | --- | ----- |
Recently, Vision-Language-Action (VLA) (Zitkovich et al. ineout-of-distributionorfailure-inducingactions(Quevedo
2023;O’Neilletal.2024;Blacketal.2025)andWorldAc-
|     |     |     |     |     |     |     | et al. 2026; | Yang | et al. | 2026a), | but continuous |     | action | fol- |
| --- | --- | --- | --- | --- | --- | --- | ------------ | ---- | ------ | ------- | -------------- | --- | ------ | ---- |
tionModels(WAM)(Wuetal.2024;Lietal.2026a;Yeetal.
|            |              |     |           |         |       |          | lowing across | broad | numerical |     | queries | with action-specific |     |     |
| ---------- | ------------ | --- | --------- | ------- | ----- | -------- | ------------- | ----- | --------- | --- | ------- | -------------------- | --- | --- |
| 2026) have | demonstrated |     | promising | success | rates | and gen- |               |       |           |     |         |                      |     |     |
SE(3)groundtruthremainsunderexplored.Suchoff-expert
eralizationacrossdiversescenariosandtasksthroughlarge-
actionsareessentialforpolicyimprovementbecauselearned
scalepretraining.Despitetheseadvances,priorworks(Physi- policies inevitably induce state–action distributions beyond
calIntelligenceetal.2025;Panetal.2026;Guoetal.2026a)
expertdemonstrations(Ross,Gordon,andBagnell2011;Yu
| have shown | that | task-specific | online | post-training |     | remains |     |     |     |     |     |     |     |     |
| ---------- | ---- | ------------- | ------ | ------------- | --- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
etal.2026;Guoetal.2026a).
| essential           | for achieving | optimal       |          | downstream | performance. |             |                |              |          |        |                           |         |              |       |
| ------------------- | ------------- | ------------- | -------- | ---------- | ------------ | ----------- | -------------- | ------------ | -------- | ------ | ------------------------- | ------- | ------------ | ----- |
|                     |               |               |          |            |              |             | Figure         | 1 summarizes |          | our    | diagnose–improve–validate |         |              |       |
| Such post-training, |               | however,      | requires | extensive  |              | interaction |                |              |          |        |                           |         |              |       |
|                     |               |               |          |            |              |             | workflow:      | WorldEcho    |          | probes | AC-WMs                    | with    | demonstrated |       |
| with real-world     |               | environments, | which    | is         | costly       | and time-   |                |              |          |        |                           |         |              |       |
|                     |               |               |          |            |              |             | and off-expert | action       | queries, |        | WorldSync                 | targets | the          | diag- |
consuming(Xiaoetal.2026).Toreducethisburden,action-
|     |     |     |     |     |     |     | nosed visual | and | action-alignment |     | errors, | and | downstream |     |
| --- | --- | --- | --- | --- | --- | --- | ------------ | --- | ---------------- | --- | ------- | --- | ---------- | --- |
conditionedworldmodels(AC-WMs)(Zhuetal.2025;Guo
|               |      |      |            |     |         |            | policy improvement |     | evaluates |     | the utility | of  | the resulting |     |
| ------------- | ---- | ---- | ---------- | --- | ------- | ---------- | ------------------ | --- | --------- | --- | ----------- | --- | ------------- | --- |
| et al. 2026b) | have | been | introduced | as  | learned | simulators |                    |     |           |     |             |     |               |     |
model.Tofillthisevaluationgap,weintroduceWorldEcho,
tosupportefficientclosed-looppolicyinteraction(Quevedo
|     |     |     |     |     |     |     | which evaluates |     | action | following | across | five | complemen- |     |
| --- | --- | --- | --- | --- | --- | --- | --------------- | --- | ------ | --------- | ------ | ---- | ---------- | --- |
∗Corecontributors.
taryaction-querycategories.Inadditiontodemonstratedac-
(cid:66)Correspondingauthors.
|     |     |     |     |     |     |     | tions as | an in-distribution |     | baseline, | we  | construct | four | off- |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------------------ | --- | --------- | --- | --------- | ---- | ---- |

|     |  DIAGNOSE |     |  IMPROVE |           |     |  VALIDATE         |     |
| --- | ---------- | --- | --------- | --------- | --- | ------------------ | --- |
|     | WorldEcho  |     |           | WorldSync |     | Policy Improvement |     |
Policy
|     | Expert + Off-Expert Query |     | Action Coverage Expansion |     |     |     |     |
| --- | ------------------------- | --- | ------------------------- | --- | --- | --- | --- |
Close-Loop
Next Round
Imagination
|     |     |     |     |     |     | Updated Policy | WM Rollouts |
| --- | --- | --- | --- | --- | --- | -------------- | ----------- |
Reward Filter
Policy SFT
Action-Forcing Expert Intervention-Effect Supervision
Visual Integrity
Trajectory
|        |          | Queries         |     |              | denoitidnoC-noitcA |     |     |
| ------ | -------- | --------------- | --- | ------------ | ------------------ | --- | --- |
| AC-WMs |          | SE(3) Alignment |     | Obs Action A | ledoM dlroW        |     |     |
|        | Diagnose |                 | AFE |              | Predicted A-B      |     |     |
Intermediate features
 of AC-WM
|                 |     |                 |     | Noise Action B | GT A-B |     |     |
| --------------- | --- | --------------- | --- | -------------- | ------ | --- | --- |
| Visual collapse |     | Action mismatch |     |                |        |     |     |
WorldEcho Evaluation
|     |     | Visual Gate Pass |     | Raw NDTW |     |     |     |
| --- | --- | ---------------- | --- | -------- | --- | --- | --- |
Figure 1: Overview of our diagnose–improve–validate pipeline. WorldEcho probes action-conditioned world models with
demonstrated and diverse off-expert queries, jointly evaluating visual integrity and SE(3) end-effector alignment to expose
visual collapse and action mismatch. Guided by this diagnosis, WorldSync broadens the training distribution over action
consequences,groundsintermediatevideorepresentationsinaction-inducedrobotdynamicsthroughanAction-ForcingExpert,
andalignspredictedchangesunderactioninterventionswiththecorrespondingchangesinground-truthfutures.Insimulation
andreal-robotpolicy-improvementexperiments,thesegainstranslateintohigherpolicysuccessrates.
expert categories that progressively reduce their reliance tion consequences, we unify diverse simulated expert and
onexpertbehavior:Cross-StateReplay,LocalPerturbation, off-experttrajectorieswithasmallamountoftarget-domain
Policy Rollout, and Feasible-Space Sampling. These cate- real-world data in a shared action space, broadening action
gories respectively diagnose reliance on state-conditioned supportwhilepreservingreal-worldvisualfidelity.Withthis
expert priors, sensitivity to local action variations, fidelity broadersupportestablished,weintroduceanAction-Forcing
under policy-induced deviations, and controllability across Expert(AFE)thatdecodesfuturerobotstatesfrominterme-
thebroaderfeasibleactionspace.Tocapturedistinctsources diate video representations, thereby grounding the learned
of simulation error, WorldEcho jointly evaluates the visual features in the robot dynamics induced by the conditioned
integrity of generated videos and the SE(3) alignment be- actions. Yet feature-level grounding supervises each roll-
tweenend-effectortrajectoriesextractedfromgeneratedand out in isolation and does not explicitly constrain how pre-
correspondingground-truthvideos.Ourdiagnosisrevealsan dictions should change across actions. We thus introduce
off-expertsupportgap:expert-onlyAC-WMsfollowdemon- Intervention-Effect (IE) supervision, which uses paired tra-
stratedactionsreasonablywellbutexhibittwocharacteristic jectories with the same observation but different actions to
failuremodesunderoff-expertactions.Theyeitherproduce align predicted changes under an action intervention with
visually plausible yet overly optimistic futures that deviate thecorrespondingchangesinground-truthfutures.Inshort,
fromtheconditionedactions,orlosevisualintegritythrough coverageexpansionbroadenstheactionconsequencesfrom
severedegradation,suchasdistortedrobotarmsanddisap- which the model learns, AFE grounds what its representa-
pearing grippers. Together, these failures expose two lim- tions encode in robot dynamics, and IE aligns how its pre-
itations of expert-only AC-WMs: narrow support over off- dictionschangewithhowtheground-truthfutureschange.
expertactionconsequencesandweakdependenceofgener-
|     |     |     |     | Experiments | on RoboTwin | (Chen | et al. 2026b) and real- |
| --- | --- | --- | --- | ----------- | ----------- | ----- | ----------------------- |
ateddynamicsontheconditionedactions.
|     |     |     |     | robot tasks | demonstrate | that WorldSync | improves WorldE- |
| --- | --- | --- | --- | ----------- | ----------- | -------------- | ---------------- |
Guided by this diagnosis, we propose WorldSync, a sys- cho performance across both demonstrated and off-expert
tematic training recipe that strengthens action-conditioned actionquerieswhilemaintainingvisualintegrity.Moreim-
generation along three complementary axes: distributional portantly,whenusedasalearnedsimulatorforiterativepol-
coverage,representationalgrounding,andintervention-effect icyimprovement,WorldSyncprovidesmorereliableaction-
alignment.First,toexpandthetrainingdistributionoverac- dependent feedback and enables policies to achieve higher

success rates, demonstrating the practical value of faithful from expert-dominated AC-WM data (Jiang et al. 2026b;
actionfollowing. Yin et al. 2026; Liu et al. 2026; Yu et al. 2026). To mit-
Ourcontributionsareasfollows: igate this mismatch, existing systems expand training with
• exploratory or corrective interactions (Yin et al. 2026; Li
WeintroduceWorldEcho,whichevaluatesactionfollow-
etal.2026b;Xiaoetal.2026),filterunreliablegenerations,
| ing across |     | demonstrated | actions |     | and four | complemen- |     |     |     |     |     |     |     |     |
| ---------- | --- | ------------ | ------- | --- | -------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
orco-evolvethepolicyandworldmodel(Jiangetal.2026b;
taryoff-expertaction-querycategoriesthroughvisualin-
|     |     |     |     |     |     |     | Guo et | al. 2026a; | Liu | et al. | 2026). | While | these strategies |     |
| --- | --- | --- | --- | --- | --- | --- | ------ | ---------- | --- | ------ | ------ | ----- | ---------------- | --- |
tegrityandSE(3)trajectoryalignment.
improvedownstreampolicyperformance,policygainsalone
| • We identify |     | two characteristic |     | failures |     | of expert-only |        |        |         |           |       |            |          |     |
| ------------- | --- | ------------------ | --- | -------- | --- | -------------- | ------ | ------ | ------- | --------- | ----- | ---------- | -------- | --- |
|               |     |                    |     |          |     |                | do not | reveal | whether | the world | model | faithfully | responds |     |
AC-WMsunderoff-expertactions:visuallyplausiblebut
tothequeriedactionsormerelyservesasusefulvisualaug-
| overly | optimistic | futures | that | disregard |     | the conditioned |     |     |     |     |     |     |     |     |
| ------ | ---------- | ------- | ---- | --------- | --- | --------------- | --- | --- | --- | --- | --- | --- | --- | --- |
mentation(Guoetal.2026a;Jiangetal.2026b;Xiaoetal.
actions, and severe visual degradation that renders the 2026; Li et al. 2025a). This ambiguity calls for directly as-
generatedrolloutsunusable.
|     |     |     |     |     |     |     | sessing | whether | policy-facing |     | AC-WMs | faithfully |     | respond |
| --- | --- | --- | --- | --- | --- | --- | ------- | ------- | ------------- | --- | ------ | ---------- | --- | ------- |
•
We propose WorldSync to broaden the training distri- totheactionsqueriedbythepolicy.
| bution | over | action consequences, |     |     | ground | video repre- |     |     |     |     |     |     |     |     |
| ------ | ---- | -------------------- | --- | --- | ------ | ------------ | --- | --- | --- | --- | --- | --- | --- | --- |
sentations in action-induced robot dynamics, and align 2.3 RoboticWorldModelEvaluation
predicted changes under action interventions with their Robotic world-model evaluation has expanded beyond
| ground-truth |     | counterparts, | enabling |     | more | faithful simu- |         |       |         |            |          |     |              |     |
| ------------ | --- | ------------- | -------- | --- | ---- | -------------- | ------- | ----- | ------- | ---------- | -------- | --- | ------------ | --- |
|              |     |               |          |     |      |                | generic | video | quality | to motion, | physical |     | consistency, | and |
lationandmoreeffectivepolicyimprovement. embodiedfunctionality(Huetal.2025;Shangetal.2026a,b).
Existingbenchmarkscomparegeneratedmotionwithrefer-
2 RelatedWork ence trajectories (Hu et al. 2025; Shang et al. 2026a) or
recoveractionsfromgeneratedvideostotestembodiedexe-
2.1 Action-ConditionedRoboticWorldModels
cutability(Jiangetal.2026a;Fanetal.2026).Mostclosely
Action-conditionedroboticworldmodelspredictfutureob-
|            |      |                  |     |                |     |            | related,              | MiraBench | evaluates |               | action-conditioned |             | reliability |       |
| ---------- | ---- | ---------------- | --- | -------------- | --- | ---------- | --------------------- | --------- | --------- | ------------- | ------------------ | ----------- | ----------- | ----- |
| servations | from | visual histories |     | and continuous |     | robot com- |                       |           |           |               |                    |             |             |       |
|            |      |                  |     |                |     |            | with failure-inducing |           |           | perturbations |                    | and reveals | that        | visu- |
mands,supportingimaginedrolloutsforplanningandpolicy ally plausible predictions may ignore commanded failures
learning (Zhu et al. 2025; Guo et al. 2026b). Building on orexhibitoptimismbias(Yangetal.2026a).However,these
| this formulation, |     | subsequent | work | has | advanced | AC-WMs |     |     |     |     |     |     |     |     |
| ----------------- | --- | ---------- | ---- | --- | -------- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
evaluationsrelyprimarilyonimage-spacemotion,recovered-
througharchitecturalinnovationsforstrongeractioncontrol
actionexecution,ortask-levelfailurejudgmentsratherthan
| and long-horizon |     | generation | (Zhu | et  | al. 2025; | Guo et al. |            |              |     |        |     |       |              |     |
| ---------------- | --- | ---------- | ---- | --- | --------- | ---------- | ---------- | ------------ | --- | ------ | --- | ----- | ------------ | --- |
|                  |     |            |      |     |           |            | continuous | end-effector |     | motion | in  | SE(3) | across broad | nu- |
2026b;Zhengetal.2026),aswellasbroaderpretrainingfor mericalactionqueries(Shangetal.2026a;Jiangetal.2026a;
transferring interaction dynamics across tasks and embodi- Yangetal.2026a).Ourbenchmarkinsteadalignsgenerated
ments(Gaoetal.2026;WuandGao2026;Huangetal.2026).
|        |           |               |     |     |               |         | end-effector | trajectories |     | with  | the corresponding |               | simulator- |         |
| ------ | --------- | ------------- | --- | --- | ------------- | ------- | ------------ | ------------ | --- | ----- | ----------------- | ------------- | ---------- | ------- |
| Beyond | improving | architectures |     | and | data, several | methods |              |              |     |       |                   |               |            |         |
|        |           |               |     |     |               |         | replayed     | trajectories | in  | SE(3) | across            | progressively |            | broader |
addresstherepresentationgapbetweennumericalcommands
numericalactionqueries.
| and pixel-space |     | motion | using | spatially | grounded | represen- |     |     |     |     |     |     |     |     |
| --------------- | --- | ------ | ----- | --------- | -------- | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
tations of robot kinematics (Wu and Gao 2026; Chen et al. 3 Method
2026c,a;Yangetal.2026b).Controlledactionperturbations
3.1 ProblemFormulation
andcounterfactualbehaviorshavealsobeguntoprobemod-
els beyond standard action replay (Gao et al. 2026; Huang Weconsideranaction-conditionedroboticworldmodel,pa-
|              |          |     |           |     |        |             | rameterized | by  | θ, that | generates | future | visual | observations |     |
| ------------ | -------- | --- | --------- | --- | ------ | ----------- | ----------- | --- | ------- | --------- | ------ | ------ | ------------ | --- |
| et al. 2026; | Feingold | et  | al. 2026; | Zhu | et al. | 2025). How- |             |     |         |           |        |        |              |     |
conditionedonthecurrentobservation,taskinstruction,and
ever,thesestudiescoverlimitedactionvariationsandprovide
|                                                       |     |     |     |     |     |     | robotactions.Leto |     | denotethecurrentmulti-viewobserva- |     |     |     |     |     |
| ----------------------------------------------------- | --- | --- | --- | --- | --- | --- | ----------------- | --- | ---------------------------------- | --- | --- | --- | --- | --- |
| mostlyindirectorcoarse-grainedevidenceofactionfollow- |     |     |     |     |     |     |                   |     | 0                                  |     |     |     |     |     |
ingratherthanground-truthmotionforeachcommand(Zhu tion, c the language instruction, and a 1:H = (a 1 ,...,a H )
etal.2025;Gaoetal.2026;Huangetal.2026;Feingoldetal. a sequence of numerical robot actions over a horizon of H
|                       |     |     |     |     |     |     | steps. We | model | the future | multi-view |     | video | I   | with the |
| --------------------- | --- | --- | --- | --- | --- | --- | --------- | ----- | ---------- | ---------- | --- | ----- | --- | -------- |
| 2026;Yangetal.2026a). |     |     |     |     |     |     |           |       |            |            |     |       | 1:H |          |
conditionaldistribution
2.2 WorldModelsforPolicyEvaluationand p (I |o ,c,a ), Iˆ ∼p (·|o ,c,a ). (1)
|     |     |     |     |     |     |     | θ 1:H | 0   | 1:H |     | 1:H | θ   | 0 1:H |     |
| --- | --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- | ----- | --- |
Improvement
Executingthesameactionsequencefromthecorresponding
AC-WMs are increasingly used as policy-facing simulators initialenvironmentstateyieldstheground-truthfutureIGT.
1:H
thatreducecostlyreal-robotinteraction(Quevedoetal.2026;
|           |        |         |           |     |        |                | Let Φ extract |     | the end-effector |     | trajectory | from | a multi-view |     |
| --------- | ------ | ------- | --------- | --- | ------ | -------------- | ------------- | --- | ---------------- | --- | ---------- | ---- | ------------ | --- |
| Li et al. | 2025b; | Jeon et | al. 2026; | Ma  | et al. | 2026). In this |               |     |                  |     |            |      |              |     |
video.Thegeneratedandground-truthtrajectoriesare
| role, imagined |     | rollouts support |     | policy | evaluation | and rank- |     |         |     |     |     |          |     |     |
| -------------- | --- | ---------------- | --- | ------ | ---------- | --------- | --- | ------- | --- | --- | --- | -------- | --- | --- |
|                |     |                  |     |        |            |           |     | τˆ=Φ(Iˆ |     | ),  | τGT | =Φ(IGT). |     | (2) |
ing (Quevedo et al. 2026; Li et al. 2025b; Jeon et al. 2026; 1:H 1:H
Ma et al. 2026). Beyond evaluation, they provide synthetic Areliableworldmodelshouldgenerateavisuallyvalidfuture
experience or optimization signals for policy improvement whoseinducedrobottrajectoryagreeswiththeground-truth
(Yuetal.2026;Xiaoetal.2026;Lietal.2025a;Jiangetal. consequenceofthequeriedactions.Westudyhowtoevaluate
2026b). These applications, however, expose a distribution and improve this property when a 1:H extends beyond the
shift when policy exploration, failures, or updates depart expertactiondistribution.

Input GT Output Failure Mode 1 Failure Mode 2 whether the model captures state-dependent action effects
Obs + Action Final Frame Visual collapse Action mismatch ratherthanequatingexpert-likeactionswithsuccess.Local
Perturbationappliesboundedperturbationstodemonstrated
|     |     |     |     |     |     |     | actions, | probing   | sensitivity |         | to local | changes | around   | the ex- |
| --- | --- | --- | --- | --- | --- | --- | -------- | --------- | ----------- | ------- | -------- | ------- | -------- | ------- |
|     |     |     |     |     |     |     | pert     | manifold. | Policy      | Rollout | uses     | actions | produced | by a    |
learnedpolicy,reflectingthedeviationsencounteredduring
policyevaluationandimprovement.Finally,Feasible-Space
Figure2:Action-followingfailuresunderoff-expertactions.
Samplingdrawsvalidactionsfromthebroaderrobotaction
Comparedwiththegroundtruth,anexpert-trainedAC-WM
spacetoassesscontrollabilitywithminimalrelianceonex-
| either suffers | visual | collapse | (Failure | Mode | 1) or | generates |      |           |     |            |         |     |          |            |
| -------------- | ------ | -------- | -------- | ---- | ----- | --------- | ---- | --------- | --- | ---------- | ------- | --- | -------- | ---------- |
|                |        |          |          |      |       |           | pert | behavior. | All | off-expert | queries | are | filtered | for action |
plausiblebutaction-inconsistentmotion(FailureMode2).
|     |     |     |     |     |     |     | feasibility |     | and replayed | in  | RoboTwin | from | the | same initial |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --- | ------------ | --- | -------- | ---- | --- | ------------ |
stateastheworld-modelquery,producinganaction-specific
ground-truthrollout.
3.2 Motivation
|     |     |     |     |     |     |     | Visual | Integrity |     | Assessment |     | Trajectory | agreement | is  |
| --- | --- | --- | --- | --- | --- | --- | ------ | --------- | --- | ---------- | --- | ---------- | --------- | --- |
Mostroboticworldmodelsaretrainedonexpertdemonstra-
|     |     |     |     |     |     |     | meaningful |     | only when | the | generated | video | remains | a valid |
| --- | --- | --- | --- | --- | --- | --- | ---------- | --- | --------- | --- | --------- | ----- | ------- | ------- |
tions(Zhuetal.2025;Guoetal.2026b;NVIDIAetal.2025).
|     |     |     |     |     |     |     | depiction |     | of the robot | and | scene. | We therefore |     | assess four |
| --- | --- | --- | --- | --- | --- | --- | --------- | --- | ------------ | --- | ------ | ------------ | --- | ----------- |
Yetpolicyevaluationandimprovementinevitablyqueryac- complementaryaspectsofvisualintegrity.FollowingWorl-
| tions beyond | the | expert | distribution | (Quevedo | et  | al. 2026; |        |        |     |             |     |       |            |        |
| ------------ | --- | ------ | ------------ | -------- | --- | --------- | ------ | ------ | --- | ----------- | --- | ----- | ---------- | ------ |
|              |     |        |              |          |     |           | dArena | (Shang | et  | al. 2026a), | we  | adopt | continuous | scores |
Lietal.2025b;Yuetal.2026;Xiaoetal.2026),requiring
|           |            |            |        |         |                   |             | for         | image | quality                                    | and motion | smoothness. |     | Specifically, | im- |
| --------- | ---------- | ---------- | ------ | ------- | ----------------- | ----------- | ----------- | ----- | ------------------------------------------ | ---------- | ----------- | --- | ------------- | --- |
| the model | to respond | faithfully | to     | diverse | valid             | actions. To |             |       |                                            |            |             |     |               |     |
|           |            |            |        |         |                   |             | agequalityq |       | measuresframe-levelperceptualfidelityusing |            |             |     |               |     |
| examine   | whether    | existing   | models | satisfy | this requirement, |             |             |       |                                            |            |             |     |               |     |
MUSIQ(Keetal.2021),whilemotionsmoothnessmeval-
| we fine-tune | Cosmos-Predict2.5 |     |     | (NVIDIA | et al. | 2025) on |       |          |            |     |         |                     |     |      |
| ------------ | ----------------- | --- | --- | ------- | ------ | -------- | ----- | -------- | ---------- | --- | ------- | ------------------- | --- | ---- |
|              |                   |     |     |         |        |          | uates | temporal | continuity |     | through | frame-interpolation |     | con- |
expertdemonstrationscollectedintheRoboTwinsimulation sistency (Zhang et al. 2024). To integrate these scores into
benchmark(Muetal.2025;Chenetal.2026b).Startingfrom
|     |     |     |     |     |     |     | our | integrity-gated |     | protocol, | we  | convert | them | into binary |
| --- | --- | --- | --- | --- | --- | --- | --- | --------------- | --- | --------- | --- | ------- | ---- | ----------- |
thesameobservation,weconditionitoneitherexpertorfea-
decisionsusingprespecifiedthresholds:
sibleoff-expertactionsandcompareitspredictionswiththe
|     |     |     |     |     |     |     |     |     | =I[q |     |     | =I[m≥τ |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | --- | --- | ------ | --- | --- |
ground-truthrollouts obtainedbyexecuting thequeriedac- G quality ≥τ q ], G motion m ]. (3)
|                                                     |     |     |     |     |     |     | where | I is | the indicator | function |     | and τ | ,τ are | the respec- |
| --------------------------------------------------- | --- | --- | --- | --- | --- | --- | ----- | ---- | ------------- | -------- | --- | ----- | ------ | ----------- |
| tionsinRoboTwin.Themodelaccuratelyreplaysexperttra- |     |     |     |     |     |     |       |      |               |          |     | q     | m      |             |
G
jectories, but exhibits two distinct failures under off-expert tive thresholds. End-effector visibility EEF and arm in-
actions,asshowninFigure2:thegeneratedvideoeitherloses tegrityG arm directlyproducebinarydecisions.Theformer
visualintegrity,withdistortedarmsordisappearinggrippers, tracksthegrippersthroughouttherolloutusingSAM-based
orremainsvisuallyplausiblewhiledepictingmotionincon- videotracking(Carionetal.2026);thelatterdetectsblurred,
broken,ordisappearingrobotarmsusingavision-language
sistentwiththequeriedactions.Theseobservationsmotivate
|     |     |     |     |     |     |     | evaluator |     | (Bai et | al. 2025). | All | criteria | and thresholds | are |
| --- | --- | --- | --- | --- | --- | --- | --------- | --- | ------- | ---------- | --- | -------- | -------------- | --- |
abenchmarkthatprobesworldmodelsoverabroaderaction
distributionandjointlyevaluatesvisualintegrityandthefi- fixed across evaluated models. The overall visual-integrity
| delityofaction-inducedmotion. |     |     |     |     |     |     | gateis |       |            |     |        |        |     |           |
| ----------------------------- | --- | --- | --- | --- | --- | --- | ------ | ----- | ---------- | --- | ------ | ------ | --- | --------- |
|                               |     |     |     |     |     |     |        | G vis | =G quality | ∧G  | motion | ∧G EEF | ∧G  | arm . (4) |
3.3 WorldEcho:BenchmarkingActionFollowing
|             |         |          |        |              |           |        | A                               | rollout | passes the | gate | only when | all                 | four conditions | are |
| ----------- | ------- | -------- | ------ | ------------ | --------- | ------ | ------------------------------- | ------- | ---------- | ---- | --------- | ------------------- | --------------- | --- |
| Motivated   | by the  | failures | above, | we introduce | WorldEcho |        | satisfied.                      |         |            |      |           |                     |                 |     |
| to evaluate | whether | an AC-WM |        | faithfully   | responds  | to nu- |                                 |         |            |      |           |                     |                 |     |
|             |         |          |        |              |           |        | End-EffectorTrajectoryAlignment |         |            |      |           | Avisuallyvalidroll- |                 |     |
mericalrobotactionsbeyondexpertreplay.Asillustratedin
|     |     |     |     |     |     |     | out | may nevertheless |     | ignore | the | conditioned | actions. | We  |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------------- | --- | ------ | --- | ----------- | -------- | --- |
Figure3,WorldEchoexpandsthequeriedactiondistribution
|     |     |     |     |     |     |     | therefore |     | directly | compare | the robot | motion | in  | the gener- |
| --- | --- | --- | --- | --- | --- | --- | --------- | --- | -------- | ------- | --------- | ------ | --- | ---------- |
fromdemonstratedactionstofourcomplementaryoff-expert
atedandground-truthvideos.GivenavideoI,thetrajectory
categories.Foreveryquery,weexecutethesameactionse- extractorΦ(Tanetal.2026)recoverstheper-frameposition
quence from the corresponding initial state in RoboTwin to pe R3 andorientationRe
|                                                      |     |     |     |     |     |     |     | ∈     |       |            | ∈ SO(3)foreachendeffector |             |       |         |
| ---------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | ----- | ----- | ---------- | ------------------------- | ----------- | ----- | ------- |
| obtainaground-truthfuture.Wethenevaluatethegenerated |     |     |     |     |     |     | t   |       |       |            | t                         |             |       |         |
|                                                      |     |     |     |     |     |     | e ∈ | {L,R} | (left | or right). | For                       | a generated | frame | i and a |
rolloutfromtwocomplementaryperspectives:whetheritre-
|     |     |     |     |     |     |     | ground-truth |     | frame | j, we | define | the local | pose discrepancy |     |
| --- | --- | --- | --- | --- | --- | --- | ------------ | --- | ----- | ----- | ------ | --------- | ---------------- | --- |
mainsvisuallyvalidandwhetheritsinducedend-effectormo-
as
(cid:104)
tionagreeswiththeground-truthconsequenceofthequeried w2∥pˆe−pe,GT∥2
|          |     |     |     |     |     |     |     | d   | (i,j)= |     |     |     |     |     |
| -------- | --- | --- | --- | --- | --- | --- | --- | --- | ------ | --- | --- | --- | --- | --- |
| actions. |     |     |     |     |     |     |     |     | e      | p   | i j | 2   |     |     |
(5)
(cid:105)1/2
Action Query Construction We construct five action- +w2d2 (Rˆe,Re,GT)
,
|     |     |     |     |     |     |     |     |     |     |     | R SO(3) | i   | j   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------- | --- | --- | --- |
querycategorieswithdecreasingrelianceonthejointexpert
wherehattedandGTquantitiesarethegeneratedandground-
distributionoverstatesandactions.DemonstratedActionre-
|                                                      |     |     |     |     |     |     | truthposes,andw |     |     | ,w weighttranslationandrotation.The |     |     |     |     |
| ---------------------------------------------------- | --- | --- | --- | --- | --- | --- | --------------- | --- | --- | ----------------------------------- | --- | --- | --- | --- |
| playstheexpertactionsequenceassociatedwiththecurrent |     |     |     |     |     |     |                 |     |     | p R                                 |     |     |     |     |
rotationaldiscrepancyis
observationandservesasthein-distributionbaseline.Cross-
StateReplayappliesanexpertactionsequencefromanother d (R ,R )=arccos(clip(ξ,−1,1)),
|     |     |     |     |     |     |     |     |     | SO(3) | 1 2 |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- |
state. Although the actions remain expert-distributed, their tr(R⊤R )−1 (6)
|     |     |     |     |     |     |     |     |     |     | ξ   | = 1 | 2   | ,   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
mismatchwiththecurrentstateinducestaskfailure,testing
2

① Action Queries Construction ② Matched Rollouts Generation ③ Integrity-Gated Evaluation
if ✅ ✅ ✅ ✅ :
Demonstrated Action
(  0,   ) S G i r m o u u l n a d to T r ruth Quality EEF Visibility Pass
Cross-State Replay else :
(  0 ′ ,   ) SmoothnessArm Integrity Fail κ
Local Perturbation Visual Integrity Gate
(  0,   +  ) SE(3) Alignment
Policy Rollout  1:H G C o a o se d C B a a s d e IDM
Feasible-Space Sampling (  0,  (  0)) W Pr o e r d l i d c - t M ion odel  1  :   Gated Error
(  0,  ∼     )          ↓ ↓
1:
Figure3:OverviewofWorldEcho.Fiveactionquerycategoriesspandemonstratedandoff-expertactions.Eachactionsequence
producesmatchedsimulatorreferenceandworldmodelrollouts.VisualintegrityandSE(3)endeffectortrajectoryalignment
arejointlyevaluated.ThegatederrorusesNDTWforvalidrolloutsandafixedpenaltyκotherwise.
where tr is the matrix trace and clip clamps its argument Algorithm1:Integrity-GatedAction-FollowingEvaluation
to[−1,1].Toaccommodatedifferencesintemporalprogres-
Require: AC-WMW ,actionqueriesQ,failurepenaltyκ
θ
s iz io ed n, d w yn e a a m lig ic n ti t m he e t w w a o rp tr i a n j g ec (N to D rie T s W us ) i ( n S g ak p o o e se a - n a d w C ar h e ib n a o 1 rm 97 a 8 l- ; 1: foreachqueryn:(o 0 ,c,a 1:H ,I 1 G :H T)∈Qdo
SalvadorandChan2007;Huetal.2025;Shangetal.2026a). 2: GenerateIˆ 1:H ∼p θ (·|o 0 ,c,a 1:H )
Let π e denote the optimal warping path for end effector e. 3: EvaluateG n =G vis (Iˆ 1:H )
Thesample-levelNDTWerroris 4: Extractτˆ=Φ(Iˆ 1:H )andτGT =Φ(I 1 G :H T)
5: Computepose-awareNDTWerrorDNDTW
D NDTW = |A 1 | (cid:88) |π 1 e | (cid:88) d e (i,j), (7) 6 7 : : en S d e f t o S r n ←D n NDTW ifG n =1;otherw n iseS n ←κ
e∈A (i,j)∈πe
8: Aggregate{S n }withineachtaskandthenacrosstasks
where A is the set of valid end effectors. We normalize 9: return task-macrointegrity-gatederror,visualpassrate,
the cumulative cost by alignment-path length, but not by andungatedNDTWerrors
the spatial extent of the reference trajectory. This choice
retains the absolute metric scale of the pose discrepancy,
preventingshort-rangemotionsfromdisproportionatelyam-
groundingwithinindividualrolloutsandintervention-effect
plifying pose-estimation noise and preserving a consistent
alignment across paired rollouts. As illustrated in Figure4,
physical interpretation across action queries. Lower values
WorldSyncrealizesthesethreerequirementsthroughaction
indicate stronger agreement between generated motion and
coverage expansion, an Action-Forcing Expert (AFE), and
theaction-specificgroundtruth.
Intervention-Effect (IE) supervision, respectively. In short,
Integrity-GatedEvaluationProtocol Foreveryqueryn, coverageexpansionbroadenstheactionconsequencesfrom
we retain both the visual-gate result G and the ungated which the model learns, AFE grounds what its representa-
n
NDTWerrorDNDTW.WecomputeNDTWforallsamples, tions encode in robot dynamics, and IE aligns how its pre-
n
includingthosethatfailthevisualgate,topreservediagnostic dictionschangewithhowtheground-truthfutureschange.
information. For the official aggregate error, we define the Wetrainthevideobackbonewithflowmatching.Letx
0
per-queryintegrity-gatederrorS ,assigningafixedpenalty denote the clean latent of the target future video and ϵ ∼
n
κtovisuallyinvalidrollouts: N(0,I)Gaussiannoise.Atflowtimet∈[0,1],weconstruct
x =(1−t)x +tϵandoptimize
(cid:26) DNDTW, G =1, t 0
S = n n (8) (cid:104) (cid:105)
n κ, G =0. L =E ∥v (x ,t|o ,c,a )−(ϵ−x )∥2 ,
n FM x0,ϵ,t θ t 0 1:H 0 2
(9)
We first average S within each task and then report the
n wherev istheaction-conditionedflowvelocitypredictedby
macro-averageacrosstasks,preventingtaskswithmoresam- θ
theworldmodel.
plesfromdominatingtheranking.Alongsidethisintegrity-
gatederror,WorldEchoreportsthevisual-gatepassrate,un- ActionCoverageExpansionStrategy Expertdemonstra-
gated NDTW error, and results stratified by action-query
tions cover only a narrow subset of feasible action conse-
category.Algorithm1summarizestheevaluationprocedure.
quences,leavingtheoff-expertsupportgapidentifiedbyour
diagnosis.Tobroadenthissupport,wetrainwithmulti-task
3.4 WorldSync:ImprovingActionFollowing
simulatedtrajectoriesthatspanexpertbehavior,localpertur-
Takentogether,thefailuresidentifiedabovepointtoanoff- bations,cross-statereplays,policyrollouts,andbroadfeasi-
expertsupportgapandweakactiondependenceingenerated bleactions.Asmallsetoftarget-taskreal-robotdemonstra-
dynamics. Closing the former calls for distributional cov- tions is mixed with these simulated data to preserve target-
erage; addressing the latter calls for both representational domain visual fidelity. To transfer action-following knowl-

Intervention-Effect Supervision
|     |     |     |     |     |     |     | Predicted Future |     | Ground-Truth Future |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ---------------- | --- | ------------------- | --- | --- | --- |
denoitidnoC-noitcA
Action A
|                           |     |     |     |     |     |     | ledoM dlroW |     |     |     |     | IE Objective |
| ------------------------- | --- | --- | --- | --- | --- | --- | ----------- | --- | --- | --- | --- | ------------ |
| Action Coverage Expansion |     |     |     |     |     |     |             |     | Δθ  |     | Δ*  |              |
Same Observation
Real Robot
Action B
Specific Task
Same Noise
Demonstrated Action
Action-Conditioned World Model
Wan DiT Block ×30
Shared Action Space Visual Condition Joint Training Objective
EAV
Video Self-Attn
AdaLN
Text Condition
|     |     |     |     |     |     | 5T  | Text Cross-Attn |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --------------- | --- | --- | --- | --- | --- |
Task Instruction
| Simulation |     | ··· |     |     |     |     |     |     |     |     |     |     |
| ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
FFN
Task1 Task2 TaskN
|     |     |     |     | Action Condition |     | redocnE |     |     |     |     |     |     |
| --- | --- | --- | --- | ---------------- | --- | ------- | --- | --- | --- | --- | --- | --- |
Demonstrated Action
|     |                    |     |     |                       |     | ...   | AdaLN |     |     |     |     |     |
| --- | ------------------ | --- | --- | --------------------- | --- | ----- | ----- | --- | --- | --- | --- | --- |
|     | Cross-State Replay |     |     |                       |     | :  +ℎ |       |     |     |     |     |     |
|     | Local Perturbation |     |     | Action-Forcing Expert |     |       |       |     |     |     |     |     |
Intermediate features of AC-WM
|     |     |     |     | Trajectory Queries |     |     |     |     |     |     | AFE Objective |     |
| --- | --- | --- | --- | ------------------ | --- | --- | --- | --- | --- | --- | ------------- | --- |
Policy Rollout
|     |     |     |     | q1 q2 | qM  | -fleS nttA -ssorC nttA | NFF |     |     |     |     |     |
| --- | --- | --- | --- | ----- | --- | ---------------------- | --- | --- | --- | --- | --- | --- |
...
Feasible-Space Sampling
Block × N
Figure4:OverviewofWorldSync.Weexpandactioncoveragebyunifyingdiversesimulatedexpertandoff-experttrajectories
withtarget-domainreal-robotdemonstrationsinasharedSE(3)end-effectoractionspace.TheAC-WMgeneratesfuturevideos
fromvisual,language,andactionconditions.AFEgroundsintermediatevideorepresentationsinfuturerobottrajectories,while
IE supervision aligns predicted and ground-truth intervention effects under shared observations and noise. All objectives are
jointlyoptimizedforfaithfulactionfollowing.
edge across the two domains, we represent both simulated conditionedactionchanges.IEthereforeprovidesacomple-
andreal-robotactionsasrelativeCartesianend-effectorpose mentaryrelationalsignalusingpairedtrajectoriesthatshare
displacementsexpressedintherobotbaseframe,providing the current observation and instruction but execute differ-
asharedactionspaceforlearningrelationshipsbetweenac- ent actions. Both branches use the same noise at the flow-
tionsandtheirconsequencesacrosssimulationandreality. matching noise endpoint, isolating the action as the only
differingmodelinput.Thepredictedandtargetintervention
| Action-Forcing |     | Expert | Distributional |     | coverage | is neces- |     |     |     |     |     |     |
| -------------- | --- | ------ | -------------- | --- | -------- | --------- | --- | --- | --- | --- | --- | --- |
effectsare
| sary but | does | not ensure | that intermediate |     | video | represen- |     |     |     |     |     |     |
| -------- | ---- | ---------- | ----------------- | --- | ----- | --------- | --- | --- | --- | --- | --- | --- |
tations encode the robot dynamics induced by the condi- =vA−vB, ∆∗ =xB −xA,
|     |     |     |     |     |     |     |     | ∆ θ |     |     |     | (11) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- |
|     |     |     |     |     |     |     |     |     | θ θ |     | 0   | 0    |
tionedactions.Toprovideanauxiliaryfeature-levelground-
andwealignthemoverfuturevideolatentsusing
| ing signal,                                         | AFE        | maintains | trajectory   | queries |            | that progres- |              |         |             |                |     |           |
| --------------------------------------------------- | ---------- | --------- | ------------ | ------- | ---------- | ------------- | ------------ | ------- | ----------- | -------------- | --- | --------- |
| sively cross-attend                                 |            | to the    | intermediate |         | features   | of succes-    |              |         |             |                |     |           |
|                                                     |            |           |              |         |            |               |              |         | L =∥∆       | −∆∗∥2.         |     | (12)      |
| sivevideoblocksanddecodetheaction-inducedfutureend- |            |           |              |         |            |               |              |         | IE          | θ              | 2   |           |
| effector                                            | trajectory | in SE(3). | Given        | its     | prediction | τˆ and        |              |         |             |                |     |           |
|                                                     |            |           |              |         |            | 1:H           | Thus, beyond | fitting | each future | independently, |     | the model |
theground-truthtrajectoryτ 1:H ,weoptimize learnshowitspredictionshouldchangewhentheconditioned
actionchanges.
H
|     |     | 1   | (cid:88)   |     | )∥2, |      |     |     |     |     |     |     |
| --- | --- | --- | ---------- | --- | ---- | ---- | --- | --- | --- | --- | --- | --- |
|     | L   | =   | ∥ρ(τˆ)−ρ(τ |     |      | (10) |     |     |     |     |     |     |
AFE H t t 2 Joint Training Objective Combining the standard flow-
t=1 matching generation loss with the two auxiliary objectives
| where ρ | denotes | the numerical |     | pose representation |     | used to | gives |     |     |     |     |     |
| ------- | ------- | ------------- | --- | ------------------- | --- | ------- | ----- | --- | --- | --- | --- | --- |
parameterize translation and orientation. AFE does not di- L=L FM +λ AFE L AFE +λ IE L IE . (13)
rectlyreadtheactionsorwritebacktothevideostream;its
L isappliedwhenfuturetrajectorylabelsareavailable,
| lossinsteadupdatesthebackbonethroughthevideofeatures. |     |     |     |     |     |     | AFE     |            |                 |     |        |               |
| ----------------------------------------------------- | --- | --- | --- | --- | --- | --- | ------- | ---------- | --------------- | --- | ------ | ------------- |
|                                                       |     |     |     |     |     |     | while L | is applied | to intervention |     | pairs. | Together with |
| Itisremovedatinferencetime.                           |     |     |     |     |     |     | IE      |            |                 |     |        |               |
expandedactioncoverage,thetwoauxiliaryobjectivescom-
Intervention-EffectSupervision AFEgroundsindividual plement the standard flow-matching objective with repre-
rollouts at the representation level but does not directly su- sentational grounding and intervention-effect alignment for
pervise how the generated future should change when the faithfulaction-conditionedgeneration.

4 Experiments varied: some models mainly lost visual integrity, whereas
othersremainedvisuallyplausiblebutfollowedtherequested
Webeginbydescribingthecommonbenchmarks,compari-
sonprotocols,andevaluationmetrics(§4.1).Buildingonthis motion poorly. Thus, either component metric alone would
protocol, we use WorldEcho to determine whether evalua- misspartofthefailure.
tionondemonstratedactionsmasksfailuresunderoff-expert ExpandedEvaluationCoverage. Figure5cvisualizesthe
control (§4.2). We then benchmark WorldSync against six distributionalcoverageoftheevaluationqueries.Expertac-
baseline world models and quantify the effect of expanded tions occupy a relatively compact region of the projected
actioncoverage(§4.3).Toassessdownstreamutility,weex-
|     |     |     |     |     |     |     | action space, | whereas | the | four off-expert |     | query categories |     |
| --- | --- | --- | --- | --- | --- | --- | ------------- | ------- | --- | --------------- | --- | ---------------- | --- |
aminewhetherstrongeractionfollowingtranslatesintomore
extendevaluationtoamuchbroaderregion.Thus,WorldE-
effectivepolicyimprovementundermatchedbudgets(§4.4). cho evaluates action following over a wider action distri-
Finally,wedisentanglethecontributionsofexpandedaction butionthanexpert-onlyprotocols.Togetherwiththefailure
coverage, Intervention-Effect supervision, and the Action- decompositionabove,thisbroaderquerydistributionexposes
ForcingExpert(§4.5).
twolimitationsofexpert-onlyAC-WMs:limitedsupportfor
off-expertactionconsequencesandweakdependenceofgen-
4.1 ExperimentalSetup
erateddynamicsonthequeriedactions.
| Benchmarks | and | evaluation | sets. | The | main evaluation |     |     |     |     |     |     |     |     |
| ---------- | --- | ---------- | ----- | --- | --------------- | --- | --- | --- | --- | --- | --- | --- | --- |
covers 50 RoboTwin manipulation tasks (Mu et al. 2025; 4.3 MainAction-FollowingEvaluation
Chenetal.2026b)usingthefiveaction-querycategoriesde-
|     |     |     |     |     |     |     | Table 1 | examines | whether | Expanded | Action | Coverage | im- |
| --- | --- | --- | --- | --- | --- | --- | ------- | -------- | ------- | -------- | ------ | -------- | --- |
fined by WorldEcho (§4.2, §4.3). Component analysis uses proves action following across different world-model back-
four RoboTwin tasks under the same five-category proto- bones and how the complete WorldSync compares with all
col (§4.5). We separately evaluate policy improvement in baselineconfigurationsunderthecommonWorldEchopro-
RoboTwinandonrealrobots(§4.4).
tocol.
Baselines. We compare WorldSync against six baselines EffectofExpandedActionCoverage. Attheirdesignated
spanning complementary robotic world-model paradigms. endpoints,allsixbaselinebackbonestrainedwithExpanded
CtrlWorld (Guo et al. 2026b) serves as a dedicated action- ActionCoverageachievedlowerintegrity-gatederrorandraw
conditioned world model for robot manipulation. Cosmos- NDTW than their counterparts trained on Expert Demon-
| Predict2.5 | (NVIDIA | et  | al. 2025) and | Cosmos3 | (NVIDIA |     |     |     |     |     |     |     |     |
| ---------- | ------- | --- | ------------- | ------- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
strations.Visualpassrateimprovedforthreebackbones,re-
2026)bringlargephysical-AIfoundationmodelsforaction- mained nearly unchanged for two, and decreased for one.
conditioned generation into the comparison, while Dream- Expanded Action Coverage therefore consistently strength-
Dojo (Gao et al. 2026) provides a generalist robot world ened trajectory alignment across architectures, whereas its
model pretrained on large-scale human video. Motus (Bi effectonvisualintegrityremainedbackbone-dependent.
etal.2025)andLingBotVA(Lietal.2026a)furtherbroaden
|                |     |         |              |           |       |     | ComparisonwithBaselines. |     |     | Amongallevaluatedconfig- |     |     |     |
| -------------- | --- | ------- | ------------ | --------- | ----- | --- | ------------------------ | --- | --- | ------------------------ | --- | --- | --- |
| the comparison | to  | unified | world-action | modeling, | using | a   |                          |     |     |                          |     |     |     |
urations,WorldSyncachievedthelowestintegrity-gatederror
| Mixture-of-Transformers |     |     | (MoT) architecture |     | and a causal |     |                 |          |       |      |           |        |        |
| ----------------------- | --- | --- | ------------------ | --- | ------------ | --- | --------------- | -------- | ----- | ---- | --------- | ------ | ------ |
|                         |     |     |                    |     |              |     | point estimate, | slightly | lower | than | CtrlWorld | (0.066 | versus |
autoregressiveformulation,respectively.Foreachbackbone,
|             |          |         |             |        |            |     | 0.067), and  | the highest | visual  | pass | rate,          | slightly | exceeding |
| ----------- | -------- | ------- | ----------- | ------ | ---------- | --- | ------------ | ----------- | ------- | ---- | -------------- | -------- | --------- |
| we evaluate | variants | trained | with either | Expert | Demonstra- |     |              |             |         |      |                |          |           |
|             |          |         |             |        |            |     | Motus (84.5% | versus      | 84.3%). | The  | component-wise |          | rank-     |
tionsorExpandedActionCoverageonthesametasksplitand
action-queryset.Table1reportstheirdesignatedendpoints ingwasmorenuanced:Cosmos-Predict2.5attainedalower
|     |     |     |     |     |     |     | raw NDTW | than | WorldSync | (0.013 | versus | 0.022). | Thus, |
| --- | --- | --- | --- | --- | --- | --- | -------- | ---- | --------- | ------ | ------ | ------- | ----- |
underthecommonWorldEchoprotocol.
|     |     |     |     |     |     |     | WorldSync’s | leading | integrity-gated |     | result | reflects | a strong |
| --- | --- | --- | --- | --- | --- | --- | ----------- | ------- | --------------- | --- | ------ | -------- | -------- |
Metrics. Theprimarymetricisintegrity-gatederror.Raw balance between trajectory alignment and visual integrity
pose-awareNDTWandvisual-integritypassrateseparately ratherthanuniformdominanceacrossindividualmetrics.
characterizeactionmismatchandvisualfailure.Allmetrics
|     |     |     |     |     |     |     | 4.4 PolicyImprovement |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --------------------- | --- | --- | --- | --- | --- | --- |
aremacro-averagedovertasks.
|     |     |     |     |     |     |     | Policy-Improvement |     | Protocol. |     | We adapt | VLAW | (Guo |
| --- | --- | --- | --- | --- | --- | --- | ------------------ | --- | --------- | --- | -------- | ---- | ---- |
4.2 BenchmarkDiagnosis et al. 2026a) for two matched policy-improvement rounds.
Off-Expert Performance Gap. We evaluated whether Within each domain, we hold the initial policy and the in-
demonstrated-action performance reflects behavior under teraction, world-model rollout, and policy-training budgets
broaderfeasiblecontrol.Acrossallsixexpert-trainedmod- fixed, varying only the world-model condition. Simulation
els,integrity-gatederrorincreasedby0.029–0.099monoff- comparesWorldSyncwithCtrlWorldtrainedusingExpanded
expert queries (Figure 5a). Evaluation on demonstrated ac- ActionCoverageorExpertDemonstrations;real-roboteval-
tionsthereforesystematicallyunderstatederrorsunderfeasi- uationusestheexpert-trainedCtrlWorldasthebaseline.
blebutunseencontrols.
|     |     |     |     |     |     |     | SimulationResults. |     | Fromcomparableinitialsuccessrates |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------ | --- | --------------------------------- | --- | --- | --- | --- |
FailureDecomposition. Thegapreflectedbothtrajectory of51–52%ontheRoboTwintask,WorldSyncreached65%
inconsistency and visual degradation. Across models, raw after two rounds, gaining 13 percentage points (Figure 6).
NDTWincreasedby0.010–0.043mandvisualfailurerateby CtrlWorldreached56%withExpandedActionCoverageand
6.3–28.1 percentage points; both increases were consistent 57% with Expert Demonstrations, gaining 5 points in both
across all models (Figure 5b). Their relative contributions casesandfinishing8–9pointsbehindWorldSync.

a Off-expert gap b Failure landscape c Expanded evaluation coverage
|     |     |     |     |     |     |     |     |     | Expert | Cross-state replay | Local perturbation |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ------ | ------------------ | ------------------ | --- |
Expert Off-expert average Policy rollout Feasible-space sampling
|     |     |     |     |     |     |     |     |     | Expert 95% HDR | Off-expert 95% HDR |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | -------------- | ------------------ | --- | --- |
80
CtrlWorld
|                   |     |     |     | )%( etar eruliaf lausiV |     |     |     |     | )ecnairav %0.81( 2CP |     |     |     |
| ----------------- | --- | --- | --- | ----------------------- | --- | --- | --- | --- | -------------------- | --- | --- | --- |
| Cosmos-Predict2.5 |     |     |     | 60                      |     |     |     |     |                      |     |     |     |
Cosmos3
40
DreamDojo
|     | Motus |     |     | 20  |     |     |     |     |     |     |     |     |
| --- | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
LingBotVA
0
|     | 0.0 | 0.1                       | 0.2 | 0.00 | 0.02         | 0.04 | 0.06 |     |     |                      |     |     |
| --- | --- | ------------------------- | --- | ---- | ------------ | ---- | ---- | --- | --- | -------------------- | --- | --- |
|     |     | Integrity-gated error (m) |     |      | Raw NDTW (m) |      |      |     |     | PC1 (22.9% variance) |     |     |
Figure 5: Diagnosing off-expert action following and evaluation coverage. (a) Integrity-gated error on expert and off-expert
actions across six world models; error bars show task-bootstrap 95% confidence intervals. (b) Changes in raw NDTW and
visualfailureratefromexperttooff-expertactions.(c)PCAvisualizationshowingthatoff-expertqueriescoverabroaderaction
distributionthanexpertactions.
Table 1: Main WorldEcho comparison on 50 RoboTwin tasks under the frozen evaluation protocol. Baseline models use 20k
updateswithExpertDemonstrationsand40kupdateswithExpandedActionCoverage,whileWorldSyncuses60kupdates.All
valuesaretask-macroaverages.Thebestresultineachcolumnisshowninboldred,andthesecondbestresultisshowninblue.
|     |     | Model | Trainingregime |     |     | Gatederror↓ |     | RawNDTW↓ | Visualpass(%)↑ |     |     |     |
| --- | --- | ----- | -------------- | --- | --- | ----------- | --- | -------- | -------------- | --- | --- | --- |
Baselineworldmodels
|     |     | CtrlWorld         | ExpertDemonstrations   |     |     | 0.0716 |     | 0.0266 |     | 83.89 |     |     |
| --- | --- | ----------------- | ---------------------- | --- | --- | ------ | --- | ------ | --- | ----- | --- | --- |
|     |     | CtrlWorld         | ExpandedActionCoverage |     |     | 0.0670 |     | 0.0210 |     | 83.71 |     |     |
|     |     | Cosmos-Predict2.5 | ExpertDemonstrations   |     |     | 0.0894 |     | 0.0190 |     | 75.09 |     |     |
|     |     | Cosmos-Predict2.5 | ExpandedActionCoverage |     |     | 0.0842 |     | 0.0127 |     | 75.03 |     |     |
|     |     | Cosmos3           | ExpertDemonstrations   |     |     | 0.1432 |     | 0.0572 |     | 63.94 |     |     |
|     |     | Cosmos3           | ExpandedActionCoverage |     |     | 0.1218 |     | 0.0419 |     | 68.97 |     |     |
|     |     | DreamDojo         | ExpertDemonstrations   |     |     | 0.0805 |     | 0.0210 |     | 78.97 |     |     |
|     |     | DreamDojo         | ExpandedActionCoverage |     |     | 0.0801 |     | 0.0151 |     | 77.20 |     |     |
|     |     | Motus             | ExpertDemonstrations   |     |     | 0.1116 |     | 0.0548 |     | 75.09 |     |     |
|     |     | Motus             | ExpandedActionCoverage |     |     | 0.0731 |     | 0.0292 |     | 84.34 |     |     |
|     |     | LingBotVA         | ExpertDemonstrations   |     |     | 0.1148 |     | 0.0473 |     | 71.83 |     |     |
|     |     | LingBotVA         | ExpandedActionCoverage |     |     | 0.0897 |     | 0.0340 |     | 79.71 |     |     |
|     |     | WorldSync         | ExpandedActionCoverage |     |     | 0.0661 |     | 0.0223 |     | 84.51 |     |     |
Real-RobotResults. Onthereal-robotstacking-cupstask, 4.5 ComponentContributionsandInteractions
| both conditions |     | started at | 48% success. After | two rounds, |     |     |     |     |     |     |     |     |
| --------------- | --- | ---------- | ------------------ | ----------- | --- | --- | --- | --- | --- | --- | --- | --- |
WorldSyncreached68%,comparedwith56%forCtrlWorld,
|               |     |          |                     |         |     | Table | 2: WorldSync |     | ablation | of expanded | action | coverage, |
| ------------- | --- | -------- | ------------------- | ------- | --- | ----- | ------------ | --- | -------- | ----------- | ------ | --------- |
| corresponding | to  | gains of | 20 and 8 percentage | points. | In  |       |              |     |          |             |        |           |
intervention-effect(IE)supervision,andtheAction-Forcing
bothdomains,thecompleteWorldSyncconditioncombined
Expert(AFE)onfourRoboTwintasks.Resultsareaveraged
| stronger | WorldEcho | performance | with larger | downstream |     |     |     |     |     |     |     |     |
| -------- | --------- | ----------- | ----------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
overeightcommoncheckpoints.
policygainsthanthecomparedCtrlWorldconditions.
|     |     |     |     |     |     |                         | Variant | Coverage     | Gated↓   | Raw↓                  | Visual(%)↑ |           |
| --- | --- | --- | --- | --- | --- | ----------------------- | ------- | ------------ | -------- | --------------------- | ---------- | --------- |
|     |     |     |     |     |     |                         | Base    | Expert       | 0.0781   | 0.0306                |            | 82.41     |
|     |     |     |     |     |     |                         | Base    | Expanded     | 0.0738   | 0.0258                |            | 82.68     |
|     |     |     |     |     |     |                         | +IE     | Expanded     | 0.0700   | 0.0170                |            | 81.25     |
|     |     |     |     |     |     |                         | +AFE    | Expanded     | 0.0753   | 0.0284                |            | 83.04     |
|     |     |     |     |     |     |                         | Full    | Expanded     | 0.0695   | 0.0189                |            | 81.96     |
|     |     |     |     |     |     | ExpandedActionCoverage. |         |              |          | WithIEandAFEdisabled, |            |           |
|     |     |     |     |     |     | expanding               |         | the training | coverage | reduced               | mean       | gated er- |

Figure 6: Policy improvement under matched budgets on a RoboTwin bin-dumping task and a real-robot stacking-cups task.
Successratesarereportedfortheinitialpoliciesandaftereachoftworefinementrounds.
ror from 0.0781 to 0.0738 and raw NDTW from 0.0306 directionforfuturework.
| to 0.0258, | while the visual | pass | rate remained | nearly | un- |     |     |     |     |     |
| ---------- | ---------------- | ---- | ------------- | ------ | --- | --- | --- | --- | --- | --- |
changed. This isolates broader coverage as a source of im- References
provedactionconsistencyratherthanvisual-qualitygains.
|     |     |     |     |     |     | Bai, S.; | Cai, Y.; Chen, | R.; Chen, K.; Chen, | X.; Cheng, | Z.; |
| --- | --- | --- | --- | --- | --- | -------- | -------------- | ------------------- | ---------- | --- |
Roles and Interaction of IE and AFE. Under expanded Deng,L.;Ding,W.;Gao,C.;Ge,C.;Ge,W.;Guo,Z.;Huang,
action coverage, IE produced the main trajectory gains and Q.; Huang, J.; Huang, F.; Hui, B.; Jiang, S.; Li, Z.; Li, M.;
Li,M.;Li,K.;Lin,Z.;Lin,J.;Liu,X.;Liu,J.;Liu,C.;Liu,
| achieved | the lowest raw | NDTW | of 0.0170. | AFE alone | im- |     |     |     |     |     |
| -------- | -------------- | ---- | ---------- | --------- | --- | --- | --- | --- | --- | --- |
Y.;Liu,D.;Liu,S.;Lu,D.;Luo,R.;Lv,C.;Men,R.;Meng,
provedneitheractionmetric,althoughityieldedthehighest
L.;Ren,X.;Ren,X.;Song,S.;Sun,Y.;Tang,J.;Tu,J.;Wan,
| visual pass | rate. Adding | AFE to | IE slightly | lowered | gated |     |     |     |     |     |
| ----------- | ------------ | ------ | ----------- | ------- | ----- | --- | --- | --- | --- | --- |
error and partially recovered the visual pass rate relative to J.; Wang, P.; Wang, P.; Wang, Q.; Wang, Y.; Xie, T.; Xu,
IEalone,yieldingthebestgatedresultforthefullmodelat Y.; Xu, H.; Xu, J.; Yang, Z.; Yang, M.; Yang, J.; Yang, A.;
Yu,B.;Zhang,F.;Zhang,H.;Zhang,X.;Zheng,B.;Zhong,
0.0695.ThesecomparisonsidentifyIEastheprimarydriver
H.;Zhou,J.;Zhou,F.;Zhou,J.;Zhu,Y.;andZhu,K.2025.
oftrajectoryalignment,whereasAFEcontributescondition-
|         |               |         |         |                    |     | Qwen3-VLTechnicalReport. |     | arXiv:2511.21631. |     |     |
| ------- | ------------- | ------- | ------- | ------------------ | --- | ------------------------ | --- | ----------------- | --- | --- |
| ally by | improving the | balance | between | action consistency |     |                          |     |                   |     |     |
andvisualvalidity. Bi,H.;Tan,H.;Xie,S.;Wang,Z.;Huang,S.;Liu,H.;Zhao,
R.;Feng,Y.;Xiang,C.;Rong,Y.;Zhao,H.;Liu,H.;Su,Z.;
5 ConclusionandLimitations Ma,L.;Su,H.;andZhu,J.2025. Motus:AUnifiedLatent
|               |               |           |     |             |         | ActionWorldModel. |     | arXiv:2512.13030. |     |     |
| ------------- | ------------- | --------- | --- | ----------- | ------- | ----------------- | --- | ----------------- | --- | --- |
| In this work, | we introduced | WorldEcho |     | to evaluate | action- |                   |     |                   |     |     |
Black,K.;Brown,N.;Darpinian,J.;Dhabalia,K.;Driess,D.;
| conditioned | world models | beyond | the narrow | distribution |     |     |     |     |     |     |
| ----------- | ------------ | ------ | ---------- | ------------ | --- | --- | --- | --- | --- | --- |
ofexpertdemonstrations,jointlymeasuringvisualintegrity Esmail,A.;Equi,M.R.;Finn,C.;Fusai,N.;Galliker,M.Y.;
andaction-inducedtrajectoryalignment.Ourevaluationre- Ghosh,D.;Groom,L.;Hausman,K.;ichter,b.;Jakubczak,
|            |               |        |              |         |     | S.; Jones, | T.; Ke, L.; | LeBlanc, D.; Levine, | S.; Li-Bell, | A.; |
| ---------- | ------------- | ------ | ------------ | ------- | --- | ---------- | ----------- | -------------------- | ------------ | --- |
| veals that | the evaluated | models | consistently | degrade | un- |            |             |                      |              |     |
Mothukuri,M.;Nair,S.;Pertsch,K.;Ren,A.Z.;Shi,L.X.;
derfeasibleoff-expertactions,exposingfailuresoverlooked
|                |            |        |         |            |     | Smith, L.; | Springenberg, | J. T.; Stachowicz, | K.; Tanner, | J.; |
| -------------- | ---------- | ------ | ------- | ---------- | --- | ---------- | ------------- | ------------------ | ----------- | --- |
| by expert-only | protocols. | Guided | by this | diagnosis, | we  |            |               |                    |             |     |
proposed WorldSync, which combines distributional cov- Vuong, Q.; Walke, H.; Walling, A.; Wang, H.; Yu, L.; and
erage, representational grounding, and intervention-effect Zhilinsky,U.2025. π :aVision-Language-ActionModel
0.5
alignmentforfaithfulaction-conditionedgeneration.Across with Open-World Generalization. In Lim, J.; Song, S.; and
|          |                |              |       |              |     | Park, H.-W.,    | eds., Proceedings | of The             | 9th Conference | on  |
| -------- | -------------- | ------------ | ----- | ------------ | --- | --------------- | ----------------- | ------------------ | -------------- | --- |
| RoboTwin | and real-robot | experiments, | these | improvements |     |                 |                   |                    |                |     |
|          |                |              |       |              |     | Robot Learning, | volume            | 305 of Proceedings | of Machine     |     |
producedmorereliableworld-modelrolloutsandtranslated
into greater gains during iterative policy improvement. Al- LearningResearch,17–40.PMLR.
though WorldEcho substantially broadens evaluation cov- Carion, N.; Gustafson, L.; Hu, Y.-T.; Debnath, S.; Hu, R.;
erage, comprehensively probing long-horizon interactions Coll-Vinent, D. S.; Ryali, C.; Alwala, K. V.; Khedr, H.;
across diverse embodiments and open-world environments Huang, A.; Lei, J.; Ma, T.; Guo, B.; Kalla, A.; Marks,
remains a shared challenge for the field and an important M.; Greer, J.; Wang, M.; Sun, P.; Rädle, R.; Afouras, T.;

Mavroudi, E.; Xu, K.; Wu, T.-H.; Zhou, Y.; Momeni, L.; Jeon,B.;Ye,S.;Doo,J.;Kim,S.;Seo,M.;Son,H.;andLee,
Hazra,R.;Ding,S.;Vaze,S.;Porcher,F.;Li,F.;Li,S.;Ka- K. 2026. RoboWorld: Fast and Reliable Neural Simulators
math, A.; Cheng, H. K.; Dollár, P.; Ravi, N.; Saenko, K.; forGeneralistRobotPolicyEvaluation. arXiv:2607.01060.
Zhang, P.; and Feichtenhofer, C. 2026. SAM 3: Segment Jiang,F.;Chen,Y.;Xu,K.;Liu,Y.;Wang,H.;Shen,Z.;Lu,J.;
| Anything | with Concepts. |     | In The | Fourteenth |     | International |     |                                        |     |     |     |     |     |         |     |
| -------- | -------------- | --- | ------ | ---------- | --- | ------------- | --- | -------------------------------------- | --- | --- | --- | --- | --- | ------- | --- |
|          |                |     |        |            |     |               |     | Huang,S.;Wang,Y.;Xie,C.;andWu,R.2026a. |     |     |     |     |     | RoboWM- |     |
ConferenceonLearningRepresentations.
|     |     |     |     |     |     |     |     | Bench: | A Benchmark |     | for | Evaluating | World | Models | in  |
| --- | --- | --- | --- | --- | --- | --- | --- | ------ | ----------- | --- | --- | ---------- | ----- | ------ | --- |
Chen, L.; Li, H.; Yang, W.; Zhao, M.; and Jiang, D. Robotic Manipulation. In Proceedings of the IEEE/CVF
2026a. ViPSim:CollaboratingVisualandParameterSpaces Conference on Computer Vision and Pattern Recognition
for Consistent Long-Horizon Embodied World Model. In (CVPR)Workshops,4455–4460.
Robotics:ScienceandSystems.
Jiang,Z.;Zhou,S.;Jiang,Y.;Huang,Z.;Wei,M.;Chen,Y.;
Chen,T.;Chen,Z.;Chen,B.;Cai,Z.;Liu,Y.;Li,Z.;Liang, Zhou,T.;Guo,Z.;Lin,H.;Zhang,Q.;Wang,Y.;Li,H.;Yu,
| Q.; Lin, | X.; Ge, | Y.; Gu, | Z.; Deng, | W.; | Guo, | Y.; Nian, | T.; |                     |     |     |                            |     |     |     |     |
| -------- | ------- | ------- | --------- | --- | ---- | --------- | --- | ------------------- | --- | --- | -------------------------- | --- | --- | --- | --- |
|          |         |         |           |     |      |           |     | C.;andZhao,D.2026b. |     |     | WoVR:WorldModelsasReliable |     |     |     |     |
Xie, X.; Chen, Q.; Su, K.; Xu, T.; Liu, G.; Hu, M.; ang Simulators for Post-Training VLA Policies with RL. arXiv
Gao, H.; Wang, K.; Liang, Z.; Qin, Y.; Yang, X.; Luo, P.; preprintarXiv:2602.13977.
| and Mu, | Y. 2026b. | RoboTwin |     | 2.0: A | Scalable | Data | Gen- |     |     |     |     |     |     |     |     |
| ------- | --------- | -------- | --- | ------ | -------- | ---- | ---- | --- | --- | --- | --- | --- | --- | --- | --- |
Ke,J.;Wang,Q.;Wang,Y.;Milanfar,P.;andYang,F.2021.
| erator andBenchmark |          | with    | Strong        | DomainRandomization |     |                |     |          |               |     |            |         |              |     |        |
| ------------------- | -------- | ------- | ------------- | ------------------- | --- | -------------- | --- | -------- | ------------- | --- | ---------- | ------- | ------------ | --- | ------ |
|                     |          |         |               |                     |     |                |     | MUSIQ:   | Multi-scale   |     | Image      | Quality | Transformer. | In  | 2021   |
| for Robust          | Bimanual | Robotic | Manipulation. |                     |     | In Forty-third |     |          |               |     |            |         |              |     |        |
|                     |          |         |               |                     |     |                |     | IEEE/CVF | International |     | Conference |         | on Computer  |     | Vision |
InternationalConferenceonMachineLearning.
(ICCV),5128–5137.Montreal,QC,Canada:IEEE.
Chen,Y.;Li,P.;Yang,J.;He,K.;Wu,X.;Xu,Y.;Wang,K.;
Li,H.;Ding,P.;Suo,R.;Wang,Y.;Ge,Z.;Zang,D.;Yu,K.;
Liu,J.;Liu,N.;Huang,Y.;andWang,L.2026c.BridgeV2W:
Sun,M.;Zhang,H.;Wang,D.;andSu,W.2025a.VLA-RFT:
Bridging Video Generation Models to Embodied World Vision-Language-Action Reinforcement Fine-tuning with
| ModelsviaEmbodimentMasks. |      |         |         | arXiv:2602.03793. |     |       |        |                                   |     |     |     |     |                   |     |     |
| ------------------------- | ---- | ------- | ------- | ----------------- | --- | ----- | ------ | --------------------------------- | --- | --- | --- | --- | ----------------- | --- | --- |
|                           |      |         |         |                   |     |       |        | VerifiedRewardsinWorldSimulators. |     |     |     |     | arXiv:2510.00406. |     |     |
| Fan, C.-K.;               | Chi, | X.; Ju, | X.; Li, | H.; Bao,          | Y.; | Wang, | Y.-K.; |                                   |     |     |     |     |                   |     |     |
Li,L.;Zhang,Q.;Luo,Y.;Yang,S.;Wang,R.;Zhang,L.;Yu,
| Chen, L.;     | Jiang,     | Z.; Ge, | K.;      | Li, Y.;  | Mi, W.; | Wuwu,    | Q.;  |          |                                            |        |        |          |           |     |       |
| ------------- | ---------- | ------- | -------- | -------- | ------- | -------- | ---- | -------- | ------------------------------------------ | ------ | ------ | -------- | --------- | --- | ----- |
|               |            |         |          |          |         |          |      | M.; Gao, | Z.; Xue,                                   | N.;    | Zhou,  | B.; Zhu, | X.; Ding, | M.; | Shen, |
| Jia, P.; Luo, | Y.; Zhang, |         | K.; Qin, | Z.; Dai, | Y.;     | Han, S.; | Guo, |          |                                            |        |        |          |           |     |       |
|               |            |         |          |          |         |          |      | Y.; and  | Xu, Y.                                     | 2026a. | Causal | World    | Modeling  | for | Robot |
| Y.; Zhang,    | S.; and    | Tang,   | J. 2026. | Wow,     | wo,     | val!: A  | Com- |          |                                            |        |        |          |           |     |       |
|               |            |         |          |          |         |          |      | Control. | InProceedingsofRobotics:ScienceandSystems. |        |        |          |           |     |       |
prehensiveEmbodiedWorldModelEvaluationTuringTest.
arXiv:2601.04137. Li,Y.;Zhou,Z.;Chen,Y.;Guo,Y.;Liu,J.;Zhang,S.;Chen,
|           |        |          |           |     |         |              |     | J.;andZhu,Y.2026b.             |     |     | Hi-WM:Human-in-the-World-Model |                   |     |     |     |
| --------- | ------ | -------- | --------- | --- | ------- | ------------ | --- | ------------------------------ | --- | --- | ------------------------------ | ----------------- | --- | --- | --- |
| Feingold, | R. O.; | Liconti, | D.; Yang, |     | C.; and | Katzschmann, |     |                                |     |     |                                |                   |     |     |     |
|           |        |          |           |     |         |              |     | forScalableRobotPost-Training. |     |     |                                | arXiv:2604.21741. |     |     |     |
R.K.2026.Mask2Real-WM:SegmentationMasksasaSim-
to-Real Bridge for Controllable Dexterous World Models. Li,Y.;Zhu,Y.;Wen,J.;Shen,C.;andXu,Y.2025b.WorldE-
|     |     |     |     |     |     |     |     | val: World | Model | as  | Real-World | Robot | Policies | Evaluator. |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | ----- | --- | ---------- | ----- | -------- | ---------- | --- |
arXiv:2607.04546.
arXivpreprintarXiv:2505.19017.
| Gao, S.; | Liang, W.; | Zheng, | K.; | Malik, | A.; | Ye, S.; | Yu, S.; |     |     |     |     |     |     |     |     |
| -------- | ---------- | ------ | --- | ------ | --- | ------- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
Tseng, W.-C.; Dong, Y.; Mo, K.; Lin, C.-H.; Ma, Q.; Nah, Liu, X.; Bai, Z.; Ci, H.; Ma, K. Y.; and Shou, M. Z. 2026.
|            |            |     |      |            |     |          |      | World-VLA-Loop:    |     | Closed-Loop |                   | Learning | of  | Video | World |
| ---------- | ---------- | --- | ---- | ---------- | --- | -------- | ---- | ------------------ | --- | ----------- | ----------------- | -------- | --- | ----- | ----- |
| S.; Magne, | L.; Xiang, | J.; | Xie, | Y.; Zheng, | R.; | Niu, D.; | Tan, |                    |     |             |                   |          |     |       |       |
|            |            |     |      |            |     |          |      | ModelandVLAPolicy. |     |             | arXiv:2602.06508. |          |     |       |       |
Y.L.;Zentner,K.R.;Kurian,G.;Indupuru,S.;Jannaty,P.;
Gu, J.; Zhang, J.; Malik, J.; Abbeel, P.; Liu, M.-Y.; Zhu, Ma, C.; Su, T.; Zhu, J.; Zhang, J.; Huang, Z.; Xu, Y.; and
Y.;Jang,J.;andFan,L.J.2026. DreamDojo:AGeneralist Wang,H.2026. PiL-World:AChunk-WiseWorldModelfor
| Robot World | Model | from | Large-Scale |     | Human | Videos. | In  |                                  |     |     |     |     |                   |     |     |
| ----------- | ----- | ---- | ----------- | --- | ----- | ------- | --- | -------------------------------- | --- | --- | --- | --- | ----------------- | --- | --- |
|             |       |      |             |     |       |         |     | VLAPolicy-in-the-LoopEvaluation. |     |     |     |     | arXiv:2606.05773. |     |     |
Forty-thirdInternationalConferenceonMachineLearning. Mu,Y.;Chen,T.;Chen,Z.;Peng,S.;Lan,Z.;Gao,Z.;Liang,
| Guo, Y.; | Lee, T.; | Shi, L. | X.; Chen, | J.; | Liang, | P.; and | Finn, |     |     |     |     |     |     |     |     |
| -------- | -------- | ------- | --------- | --- | ------ | ------- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
Z.;Yu,Q.;Zou,Y.;Xu,M.;Lin,L.;Xie,Z.;Ding,M.;and
C. 2026a. VLAW: Iterative Co-Improvement of Vision- Luo,P.2025. RoboTwin:Dual-ArmRobotBenchmarkwith
Language-Action Policy and World Model. In Forty-third GenerativeDigitalTwins. InProceedingsoftheIEEE/CVF
InternationalConferenceonMachineLearning. Conference on Computer Vision and Pattern Recognition
(CVPR),27649–27660.IEEE.
| Guo, Y.; | Shi, L. | X.; Chen, | J.; | and Finn, | C.  | 2026b. | Ctrl- |     |     |     |     |     |     |     |     |
| -------- | ------- | --------- | --- | --------- | --- | ------ | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
World: A Controllable Generative World Model for Robot NVIDIA. 2026. Cosmos 3: Omnimodal World Models for
Manipulation. In The Fourteenth International Conference PhysicalAI. arXiv:2606.02800.
onLearningRepresentations.
NVIDIA;Ali,A.;Bai,J.;Bala,M.;Balaji,Y.;Blakeman,A.;
Hu, Y.; Huang, S.; Liao, Y.; Chen, S.; Zhou, P.; Chen, L.; Cai, T.; Cao, J.; Cao, T.; Cha, E.; Chao, Y.-W.; Chattopad-
Ren,G.;andYao,M.2025. EWMBench:EvaluatingScene, hyay, P.; Chen, M.; Chen, Y.; Chen, Y.; Cheng, S.; Cui, Y.;
Motion,andSemanticQualityinEmbodiedWorldModels.
Diamond,J.;Ding,Y.;Fan,J.;Fan,L.;Feng,L.;Ferroni,F.;
In36thBritishMachineVisionConference.BMVA.
Fidler,S.;Fu,X.;Gao,R.;Ge,Y.;Gu,J.;Gupta,A.;Gururani,
Huang, Z.; Zhang, J.; Liu, H.; Zhang, C.; Cheng, R.; and S.;ElHanafi,I.;Hassani,A.;Hao,Z.;Huffman,J.;Jang,J.;
Zhang, L. 2026. Learning Transferable Dynamics Priors Jannaty,P.;Kautz,J.;Lam,G.;Li,X.;Li,Z.;Liao,M.;Lin,
fromActiontoWorldModeling. AcceptedtoECCV2026; C.-H.; Lin, T.-Y.; Lin, Y.-C.; Ling, H.; Liu, M.-Y.; Liu, X.;
proceedings version not yet available as of 2026-07-15, Lu,Y.;Luo,A.;Ma,Q.;Mao,H.;Mo,K.;Nah,S.;Narang,
arXiv:2606.29501. Y.;Panaskar,A.;Pavao,L.;Pham,T.;Ramezanali,M.;Reda,

F.;Reed,S.;Ren,X.;Shao,H.;Shen,Y.;Shi,S.;Song,S.; Z. 2024. Open X-Embodiment: Robotic Learning Datasets
Stefaniak, B.; Sun, S.; Tang, S.; Tasmeen, S.; Tchapmi, L.; andRT-XModels. In2024IEEEInternationalConference
Tseng, W.-C.; Varghese, J.; Wang, A. Z.; Wang, H.; Wang, onRoboticsandAutomation(ICRA),6892–6903.IEEE.
H.;Wang,H.;Wang,T.-C.;Wei,F.;Xu,J.;Yang,D.;Yang,
Pan,M.;Feng,S.;Zhang,Q.;Li,X.;Song,J.;Qu,C.;Wang,
| X.; Ye, | H.; Ye, | S.; Zeng, | X.; Zhang, | J.; | Zhang, | Q.; Zheng, |             |        |           |     |          |         |      |          |
| ------- | ------- | --------- | ---------- | --- | ------ | ---------- | ----------- | ------ | --------- | --- | -------- | ------- | ---- | -------- |
|         |         |           |            |     |        |            | Y.; Li, C.; | Xiong, | Z.; Chen, |     | Z.; Liu, | Y.; and | Luo, | J. 2026. |
K.;Zhu,A.;andZhu,Y.2025.WorldSimulationwithVideo
|                                |     |         |                |                   |     |            | SOP: A                 | Scalable      | Online | Post-Training     |              | System | for          | Vision- |
| ------------------------------ | --- | ------- | -------------- | ----------------- | --- | ---------- | ---------------------- | ------------- | ------ | ----------------- | ------------ | ------ | ------------ | ------- |
| FoundationModelsforPhysicalAI. |     |         |                | arXiv:2511.00062. |     |            |                        |               |        |                   |              |        |              |         |
|                                |     |         |                |                   |     |            | Language-ActionModels. |               |        | arXiv:2601.03044. |              |        |              |         |
| O’Neill,                       | A.; | Rehman, | A.; Maddukuri, |                   | A.; | Gupta, A.; |                        |               |        |                   |              |        |              |         |
|                                |     |         |                |                   |     |            | Physical               | Intelligence; | Amin,  |                   | A.; Aniceto, | R.;    | Balakrishna, |         |
Padalkar,A.;Lee,A.;Pooley,A.;Gupta,A.;Mandlekar,A.;
A.;Black,K.;Conley,K.;Connors,G.;Darpinian,J.;Dha-
Jain,A.;Tung,A.;Bewley,A.;Herzog,A.;Irpan,A.;Khaz-
|     |     |     |     |     |     |     | balia, K.; | DiCarlo, | J.; | Driess, | D.; | Equi, M.; | Esmail, | A.; |
| --- | --- | --- | --- | --- | --- | --- | ---------- | -------- | --- | ------- | --- | --------- | ------- | --- |
atsky,A.;Rai,A.;Gupta,A.;Wang,A.;Singh,A.;Garg,A.;
|     |     |     |     |     |     |     | Fang, Y.; | Finn, | C.; Glossop, | C.; | Godden, | T.; | Goryachev, | I.; |
| --- | --- | --- | --- | --- | --- | --- | --------- | ----- | ------------ | --- | ------- | --- | ---------- | --- |
Kembhavi,A.;Xie,A.;Brohan,A.;Raffin,A.;Sharma,A.;
Groom,L.;Hancock,H.;Hausman,K.;Hussein,G.;Ichter,
| Yavary, | A.; Jain, | A.; Balakrishna, |     | A.; | Wahid, | A.; Burgess- |     |     |     |     |     |     |     |     |
| ------- | --------- | ---------------- | --- | --- | ------ | ------------ | --- | --- | --- | --- | --- | --- | --- | --- |
B.;Jakubczak,S.;Jen,R.;Jones,T.;Katz,B.;Ke,L.;Kuchi,
Limerick,B.;Kim,B.;Schölkopf,B.;Wulfe,B.;Ichter,B.;
C.;Lamb,M.;LeBlanc,D.;Levine,S.;Li-Bell,A.;Lu,Y.;
Lu,C.;Xu,C.;Le,C.;Finn,C.;Wang,C.;Xu,C.;Chi,C.;
Mano,V.;Mothukuri,M.;Nair,S.;Pertsch,K.;Ren,A.Z.;
| Huang, | C.; Chan, | C.; Agia, | C.; | Pan, C.; | Fu, C.; | Devin, C.; |         |          |        |        |                   |     |     |          |
| ------ | --------- | --------- | --- | -------- | ------- | ---------- | ------- | -------- | ------ | ------ | ----------------- | --- | --- | -------- |
|        |           |           |     |          |         |            | Sharma, | C.; Shi, | L. X.; | Smith, | L.; Springenberg, |     | J.  | T.; Sta- |
Xu,D.;Morton,D.;Driess,D.;Chen,D.;Pathak,D.;Shah,
chowicz,K.;Stoeckle,W.;Swerdlow,A.;Tanner,J.;Torne,
D.;Büchler,D.;Jayaraman,D.;Kalashnikov,D.;Sadigh,D.;
|                                                    |         |          |     |            |      |               | M.; Vuong,                | Q.;        | Walling, | A.; | Wang,             | H.; Williams, | B.;  | Yoo,  |
| -------------------------------------------------- | ------- | -------- | --- | ---------- | ---- | ------------- | ------------------------- | ---------- | -------- | --- | ----------------- | ------------- | ---- | ----- |
| Johns, E.;                                         | Foster, | E.; Liu, | F.; | Ceola, F.; | Xia, | F.; Zhao, F.; |                           |            |          |     |                   |               |      |       |
|                                                    |         |          |     |            |      |               | S.; Yu, L.;               | Zhilinsky, | U.;      | and | Zhou,             | Z. 2025.      | π∗ : | a VLA |
| Stulp,F.;Zhou,G.;Sukhatme,G.S.;Salhotra,G.;Yan,G.; |         |          |     |            |      |               |                           |            |          |     |                   |               | 0.6  |       |
|                                                    |         |          |     |            |      |               | ThatLearnsFromExperience. |            |          |     | arXiv:2511.14759. |               |      |       |
Feng,G.;Schiavi,G.;Berseth,G.;Kahn,G.;Wang,G.;Su,
|     |     |     |     |     |     |     | Quevedo, | J. H.; | Sharma, | A.  | K.; Sun, | Y.; Suryavanshi, |     | V.; |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------ | ------- | --- | -------- | ---------------- | --- | --- |
H.;Fang,H.-S.;Shi,H.;Bao,H.;BenAmor,H.;Christensen,
|     |     |     |     |     |     |     | Liang, P.; | and Yang, | S.  | 2026. | WorldGym: | World | Model | as  |
| --- | --- | --- | --- | --- | --- | --- | ---------- | --------- | --- | ----- | --------- | ----- | ----- | --- |
H.I.;Furuta,H.;Walke,H.;Fang,H.;Ha,H.;Mordatch,I.;
Radosavovic,I.;Leal,I.;Liang,J.;Abou-Chakra,J.;Kim,J.; An Environment for Policy Evaluation. In The Fourteenth
Drake,J.;Peters,J.;Schneider,J.;Hsu,J.;Bohg,J.;Bingham, InternationalConferenceonLearningRepresentations.
J.;Wu,J.;Gao,J.;Hu,J.;Wu,J.;Wu,J.;Sun,J.;Luo,J.;Gu, Ross, S.; Gordon, G. J.; and Bagnell, J. A. 2011. A Re-
J.;Tan,J.;Oh,J.;Wu,J.;Lu,J.;Yang,J.;Malik,J.;Silvério, duction of Imitation Learning and Structured Prediction to
J.;Hejna,J.;Booher,J.;Tompson,J.;Yang,J.;Salvador,J.; No-Regret Online Learning. In Gordon, G.; Dunson, D.;
Lim,J.J.;Han,J.;Wang,K.;Rao,K.;Pertsch,K.;Hausman, and Dudík, M., eds., Proceedings of the Fourteenth Inter-
K.; Go, K.; Gopalakrishnan, K.; Goldberg, K.; Byrne, K.; nationalConferenceonArtificialIntelligenceandStatistics,
| Oslund,                                              | K.; Kawaharazuka, |     | K.; | Black, | K.; Lin, | K.; Zhang, |               |                   |     |     |         |          |           |     |
| ---------------------------------------------------- | ----------------- | --- | --- | ------ | -------- | ---------- | ------------- | ----------------- | --- | --- | ------- | -------- | --------- | --- |
|                                                      |                   |     |     |        |          |            | volume        | 15 of Proceedings |     | of  | Machine | Learning | Research, |     |
| K.;Ehsani,K.;Lekkala,K.;Ellis,K.;Rana,K.;Srinivasan, |                   |     |     |        |          |            | 627–635.PMLR. |                   |     |     |         |          |           |     |
K.;Fang,K.;Singh,K.P.;Zeng,K.-H.;Hatch,K.;Hsu,K.;
|     |     |     |     |     |     |     | Sakoe,H.;andChiba,S.1978. |     |     |     | DynamicProgrammingAl- |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------- | --- | --- | --- | --------------------- | --- | --- | --- |
Itti,L.;Chen,L.Y.;Pinto,L.;Fei-Fei,L.;Tan,L.;Fan,L.J.;
|     |     |     |     |     |     |     | gorithmOptimizationforSpokenWordRecognition. |     |     |     |     |     |     | IEEE |
| --- | --- | --- | --- | --- | --- | --- | -------------------------------------------- | --- | --- | --- | --- | --- | --- | ---- |
Ott,L.;Lee,L.;Weihs,L.;Chen,M.;Lepert,M.;Memmel,
|     |     |     |     |     |     |     | Transactions | on  | Acoustics, | Speech, |     | and Signal | Processing, |     |
| --- | --- | --- | --- | --- | --- | --- | ------------ | --- | ---------- | ------- | --- | ---------- | ----------- | --- |
M.;Tomizuka,M.;Itkina,M.;Castro,M.G.;Spero,M.;Du,
26(1):43–49.
M.;Ahn,M.;Yip,M.C.;Zhang,M.;Ding,M.;Heo,M.;Sri-
|     |     |     |     |     |     |     | Salvador,S.;andChan,P.2007. |     |     |     | TowardAccurateDynamic |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --------------------------- | --- | --- | --- | --------------------- | --- | --- | --- |
rama,M.K.;Sharma,M.;Kim,M.J.;Kanazawa,N.;Hansen,
|     |     |     |     |     |     |     | Time Warping |     | in Linear | Time | and | Space. Intelligent |     | Data |
| --- | --- | --- | --- | --- | --- | --- | ------------ | --- | --------- | ---- | --- | ------------------ | --- | ---- |
N.;Heess,N.;Joshi,N.J.;Suenderhauf,N.;Liu,N.;DiPalo,
N.;Shafiullah,N.M.M.;Mees,O.;Kroemer,O.;Bastani,O.; Analysis,11(5):561–580.
Sanketi,P.R.;Miller,P.T.;Yin,P.;Wohlhart,P.;Xu,P.;Fa- Shang,Y.;Li,Z.;Ma,Y.;Su,W.;Jin,X.;Wang,Z.;Jin,L.;
gan,P.D.;Mitrano,P.;Sermanet,P.;Abbeel,P.;Sundaresan, Zhang,X.;Tang,Y.;Su,H.;Gao,C.;Wu,W.;Liu,X.;Shah,
P.; Chen, Q.; Vuong, Q.; Rafailov, R.; Tian, R.; Doshi, R.; D.;Zhang,Z.;Chen,Z.;Zhu,J.;Tian,Y.;Chua,T.-S.;Zhu,
Martín-Martín,R.;Baijal,R.;Scalise,R.;Hendrix,R.;Lin, W.;andLi,Y.2026a.WorldArena:AUnifiedBenchmarkfor
R.;Qian,R.;Zhang,R.;Mendonca,R.;Shah,R.;Hoque,R.; Evaluating Perception and Functional Utility of Embodied
Julian,R.;Bustamante,S.;Kirmani,S.;Levine,S.;Lin,S.; WorldModels. arXivpreprintarXiv:2602.08971.
Moore,S.;Bahl,S.;Dass,S.;Sonawani,S.;Song,S.;Xu,S.; Shang, Y.; Tang, Y.; Ma, Y.; Li, Z.; Jin, L.; Su, W.; Jin,
Haldar,S.;Karamcheti,S.;Adebola,S.;Guist,S.;Nasiriany,
|     |     |     |     |     |     |     | X.; Wang, | Z.; | Wang, Z.; | Zhang, | X.; | Su, H.; | He, W.; | Wu, |
| --- | --- | --- | --- | --- | --- | --- | --------- | --- | --------- | ------ | --- | ------- | ------- | --- |
S.;Schaal,S.;Welker,S.;Tian,S.;Ramamoorthy,S.;Dasari,
|     |     |     |     |     |     |     | W.; Duan, | H.; Wetzstein, |     | G.; | Liu, X.; | Shah, | D.; Zhang, | Z.; |
| --- | --- | --- | --- | --- | --- | --- | --------- | -------------- | --- | --- | -------- | ----- | ---------- | --- |
S.;Belkhale,S.;Park,S.;Nair,S.;Mirchandani,S.;Osa,T.;
|            |           |                 |     |          |                |                 | Chen, Z.; | Zhu,      | J.; Tian,  | Y.; Chua, | T.-S.; | Zhu,      | W.; Gao, | C.; |
| ---------- | --------- | --------------- | --- | -------- | -------------- | --------------- | --------- | --------- | ---------- | --------- | ------ | --------- | -------- | --- |
| Gupta, T.; | Harada,   | T.; Matsushima, |     | T.;      | Xiao,          | T.; Kollar, T.; |           |           |            |           |        |           |          |     |
|            |           |                 |     |          |                |                 | and Li,   | Y. 2026b. | WorldArena |           | 2.0:   | Extending | Embodied |     |
| Yu, T.;    | Ding, T.; | Davchev,        | T.; | Zhao, T. | Z.; Armstrong, | T.;             |           |           |            |           |        |           |          |     |
WorldModelBenchmarkingonModality,Functionalityand
Darrell, T.; Chung, T.; Jain, V.; Vanhoucke, V.; Zhan, W.; Platform. arXiv:2605.17912.
Zhou,W.;Burgard,W.;Chen,X.;Wang,X.;Zhu,X.;Geng,
Tan,H.;Feng,Y.;Mao,X.;Huang,S.;Liu,G.;Hao,Z.;Su,
X.;Liu,X.;Liangwei,X.;Li,X.;Lu,Y.;Ma,Y.J.;Kim,Y.;
Chebotar, Y.; Zhou, Y.; Zhu, Y.; Wu, Y.; Xu, Y.; Wang, Y.; H.; and Zhu, J. 2026. AnyPos: Automated Task-Agnostic
Bisk,Y.;Cho,Y.;Lee,Y.;Cui,Y.;Cao,Y.;Wu,Y.-H.;Tang, ActionsforBimanualManipulation. arXiv:2507.12768.
Y.;Zhu,Y.;Zhang,Y.;Jiang,Y.;Li,Y.;Li,Y.;Iwasawa,Y.; Wu,H.;Jing,Y.;Cheang,C.;Chen,G.;Xu,J.;Li,X.;Liu,
Matsuo, Y.; Ma, Z.; Xu, Z.; Cui, Z. J.; Zhang, Z.; and Lin, M.; Li, H.; and Kong, T. 2024. Unleashing Large-Scale

Video Generative Pre-training for Visual Robot Manipula- Fu, C.; Florence, P.; Finn, C.; Dubey, K. A.; Driess, D.;
tion. In The Twelfth International Conference on Learning Ding,T.;Choromanski,K.M.;Chen,X.;Chebotar,Y.;Car-
Representations. bajal,J.;Brown,N.;Brohan,A.;Arenas,M.G.;andHan,K.
Wu, Z.; and Gao, J. 2026. OSCAR: Omni- 2023. RT-2:Vision-Language-ActionModelsTransferWeb
EmbodimentAction-ConditionedWorldModelforRobotics. Knowledge to Robotic Control. In Tan, J.; Toussaint, M.;
|     |     |     |     |     |     |     | and Darvish, | K., eds., Proceedings | of The 7th Conference |
| --- | --- | --- | --- | --- | --- | --- | ------------ | --------------------- | --------------------- |
arXiv:2606.04463.
onRobotLearning,volume229ofProceedingsofMachine
Xiao,J.;Yang,Y.;Chang,X.;Chen,R.;Xiong,F.;Xu,M.;
Zheng,W.-S.;andZhang,Q.2026.RehearseVLA:Simulated LearningResearch,2165–2183.PMLR.
| Post-Training | for VLAs       | with   | Physically-Consistent |     |            | World |     |     |     |
| ------------- | -------------- | ------ | --------------------- | --- | ---------- | ----- | --- | --- | --- |
| Model.        | In Proceedings | of the | IEEE/CVF              |     | Conference | on    |     |     |     |
ComputerVisionandPatternRecognition(CVPR),20867–
20877.
| Yang, T.; | Shen, Z.; Mi, | Z.; Zhang, | Z.; | Zhou,  | J.; Ji,    | J.; Dai, |     |     |     |
| --------- | ------------- | ---------- | --- | ------ | ---------- | -------- | --- | --- | --- |
| J.; Chen, | J.; Chen, B.; | and Yang,  | Y.  | 2026a. | MiraBench: |          |     |     |     |
EvaluatingAction-ConditionedReliabilityinRoboticWorld
Models. arXivpreprintarXiv:2605.29360.
Yang,Z.;Jin,Y.;Qi,L.;Huang,C.;andChen,K.2026b.EA-
WM:Event-AwareGenerativeWorldModelwithStructured
| Kinematic-to-VisualActionFields. |                |     | arXiv:2605.06192. |     |             |     |     |     |     |
| -------------------------------- | -------------- | --- | ----------------- | --- | ----------- | --- | --- | --- | --- |
| Ye, S.;                          | Ge, Y.; Zheng, | K.; | Gao, S.;          | Yu, | S.; Kurian, | G.; |     |     |     |
Indupuru,S.;Tan,Y.L.;Zhu,C.;Xiang,J.;Malik,A.;Lee,
| K.; Liang, | W.; Ranawaka, | N.; | Gu, | J.; Xu, | Y.; Wang, | G.; |     |     |     |
| ---------- | ------------- | --- | --- | ------- | --------- | --- | --- | --- | --- |
Hu,F.;Narayan,A.;Bjorck,J.;Wang,J.;Kim,G.;Niu,D.;
Zheng,R.;Xie,Y.;Wu,J.;Wang,Q.;Julian,R.;Xu,D.;Du,
Y.;Chebotar,Y.;Reed,S.;Kautz,J.;Zhu,Y.;Fan,L.J.;and
| Jang,J.2026. | WorldActionModelsareZero-shotPolicies. |     |     |     |     |     |     |     |     |
| ------------ | -------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
arXiv:2602.15922.
Yin,T.;Mei,Z.;Zheng,Z.;Yamane,M.;Wang,D.;Sceats,
| J.; Bateman,              | S. M.;          | Zha, L.;                     | Badithela,        | A.;       | Shorinwa,  | O.;    |     |     |     |
| ------------------------- | --------------- | ---------------------------- | ----------------- | --------- | ---------- | ------ | --- | --- | --- |
| andMajumdar,A.2026.       |                 | PlayWorld:LearningRobotWorld |                   |           |            |        |     |     |     |
| ModelsfromAutonomousPlay. |                 |                              | arXiv:2603.09030. |           |            |        |     |     |     |
| Yu, A.;                   | Chen, Z.; Song, | P.;                          | Hong,             | Z.; Wang, | H.;        | Zhang, |     |     |     |
| D.; He,                   | T.; Ding, Y.;   | and Zhang,                   | D.                | 2026.     | WM-DAgger: |        |     |     |     |
EnablingEfficientDataAggregationforImitationLearning
| withWorldModels. |               | arXivpreprintarXiv:2604.11351. |           |     |         |       |     |     |     |
| ---------------- | ------------- | ------------------------------ | --------- | --- | ------- | ----- | --- | --- | --- |
| Zhang, G.;       | Liu, C.; Cui, | Y.;                            | Zhao, X.; | Ma, | K.; and | Wang, |     |     |     |
L.2024. VFIMamba:VideoFrameInterpolationwithState
| Space Models. | In Globerson, |              | A.;        | Mackey,    | L.; Belgrave, |           |     |     |     |
| ------------- | ------------- | ------------ | ---------- | ---------- | ------------- | --------- | --- | --- | --- |
| D.; Fan,      | A.; Paquet,   | U.; Tomczak, | J.;        | and Zhang, |               | C., eds., |     |     |     |
| Advances      | in Neural     | Information  | Processing |            | Systems,      | vol-      |     |     |     |
ume37,107225–107248.CurranAssociates,Inc.
Zheng,Z.;Yu,J.;Peng,X.;Shi,J.;Li,M.;Zhang,C.;Li,W.;
| Wang,D.;Lu,H.;andJia,X.2026. |     |     |     | Mem-World:Memory- |     |     |     |     |     |
| ---------------------------- | --- | --- | --- | ----------------- | --- | --- | --- | --- | --- |
AugmentedAction-ConditionedWorldModelsforPersistent
| RobotManipulation. |     | arXiv:2606.18960. |     |     |     |     |     |     |     |
| ------------------ | --- | ----------------- | --- | --- | --- | --- | --- | --- | --- |
Zhu,F.;Wu,H.;Guo,S.;Liu,Y.;Cheang,C.;andKong,T.
2025.IRASim:AFine-GrainedWorldModelforRobotMa-
| nipulation. | In Proceedings | of  | the IEEE/CVF |     | International |     |     |     |     |
| ----------- | -------------- | --- | ------------ | --- | ------------- | --- | --- | --- | --- |
ConferenceonComputerVision,9834–9844.
Zitkovich,B.;Yu,T.;Xu,S.;Xu,P.;Xiao,T.;Xia,F.;Wu,J.;
Wohlhart,P.;Welker,S.;Wahid,A.;Vuong,Q.;Vanhoucke,
| V.; Tran,    | H.; Soricut,    | R.; Singh, | A.;       | Singh,       | J.; Sermanet, |         |     |     |     |
| ------------ | --------------- | ---------- | --------- | ------------ | ------------- | ------- | --- | --- | --- |
| P.; Sanketi, | P. R.; Salazar, | G.;        | Ryoo,     | M. S.;       | Reymann,      | K.;     |     |     |     |
| Rao, K.;     | Pertsch, K.;    | Mordatch,  | I.;       | Michalewski, |               | H.; Lu, |     |     |     |
| Y.; Levine,  | S.; Lee,        | L.; Lee,   | T.-W. E.; | Leal,        | I.; Kuang,    | Y.;     |     |     |     |
| Kalashnikov, | D.; Julian,     | R.;        | Joshi, N. | J.; Irpan,   | A.;           | Ichter, |     |     |     |
B.;Hsu,J.;Herzog,A.;Hausman,K.;Gopalakrishnan,K.;
