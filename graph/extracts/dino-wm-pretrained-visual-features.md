|     | DINO-WM: |             | World | Models           | on Pre-trained | Visual       | Features |     |     |     |
| --- | -------- | ----------- | ----- | ---------------- | -------------- | ------------ | -------- | --- | --- | --- |
|     |          |             |       | enable Zero-shot | Planning       |              |          |     |     |     |
|     |          | GaoyueZhou1 |       | HengkaiPan1      | YannLeCun12    | LerrelPinto1 |          |     |     |     |
Abstract 2024; Hansen et al., 2024; Haldar et al., 2024; Jia et al.,
|     |     |     |     |     | 2024). Despitethisprogress,generalizationremainsama- |     |     |     |     |     |
| --- | --- | --- | --- | --- | ---------------------------------------------------- | --- | --- | --- | --- | --- |
Theabilitytopredictfutureoutcomesgivencon-
|     |     |     |     |     | jorchallenge(Zhouetal.,2023). |     | Existingapproachespre- |     |     |     |
| --- | --- | --- | --- | --- | ----------------------------- | --- | ---------------------- | --- | --- | --- |
trolactionsisfundamentalforphysicalreasoning.
|          |      |            |         |              | dominantly | rely on policies | that, once | trained, | operate | in  |
| -------- | ---- | ---------- | ------- | ------------ | ---------- | ---------------- | ---------- | -------- | ------- | --- |
| However, | such | predictive | models, | often called |            |                  |            |          |         |     |
afeed-forwardmannerduringdeployment—mappingob-
| world | models, remain | challenging |     | to learn and |            |                    |             |              |     |     |
| ----- | -------------- | ----------- | --- | ------------ | ---------- | ------------------ | ----------- | ------------ | --- | --- |
|       |                |             |     |              | servations | to actions without | any further | optimization |     | or  |
aretypicallydevelopedfortask-specificsolutions
|     |     |     |     |     | reasoning. | Underthisframework,successfulgeneralization |     |     |     |     |
| --- | --- | --- | --- | --- | ---------- | ------------------------------------------- | --- | --- | --- | --- |
withonlinepolicylearning.Tounlockworldmod-
inherentlyrequiresagentstopossesssolutionstoallpossi-
| els’truepotential, |     | wearguethattheyshould1) |     |     |     |     |     |     |     |     |
| ------------------ | --- | ----------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
bletasksandscenariosoncetrainingiscomplete,whichis
betrainableonoffline,pre-collectedtrajectories,
onlypossibleiftheagenthasseensimilarscenariosduring
| 2) support | test-time | behavior | optimization, | and |     |     |     |     |     |     |
| ---------- | --------- | -------- | ------------- | --- | --- | --- | --- | --- | --- | --- |
training(Reedetal.,2022;Brohanetal.,2023b;a;Etukuru
| 3)facilitatetask-agnosticreasoning. |     |     |     | Tothisend, |              |                                           |     |     |     |     |
| ----------------------------------- | --- | --- | --- | ---------- | ------------ | ----------------------------------------- | --- | --- | --- | --- |
|                                     |     |     |     |            | etal.,2024). | However,itisneitherfeasiblenorefficientto |     |     |     |     |
wepresentDINOWorldModel(DINO-WM),a
learnsolutionsforallpotentialtasksandenvironmentsin
| new method | to  | model visual | dynamics | without |     |     |     |     |     |     |
| ---------- | --- | ------------ | -------- | ------- | --- | --- | --- | --- | --- | --- |
advance.
reconstructingthevisualworld.DINO-WMlever-
ages spatial patch features pre-trained with DI- Insteadoflearningthesolutionstoall possible tasksdur-
NOv2,enablingittolearnfromofflinebehavioral ing training, an alternative is to fit a dynamics model on
| trajectories | by predicting |     | future patch | features. |     |     |     |     |     |     |
| ------------ | ------------- | --- | ------------ | --------- | --- | --- | --- | --- | --- | --- |
trainingdataandoptimizetask-specificbehavioratruntime.
ThisallowsDINO-WMtoachieveobservational Thesedynamicsmodels,alsocalledworldmodels(Ha&
goals through action sequence optimization, fa- Schmidhuber, 2018), have a long history in robotics and
cilitatingtask-agnosticplanningbytreatinggoal control(Sutton,1991;Todorov&Li,2005;Williamsetal.,
features as prediction targets. We demonstrate 2017). Morerecently,severalworkshaveshownthatworld
thatDINO-WMachieveszero-shotbehavioralso- modelscanbetrainedonrawsensorydata(Hafneretal.,
lutionsattesttimeonsixenvironmentswithout 2019; Micheli et al., 2023; Robine et al., 2023; Hansen
expertdemonstrations,rewardmodeling,orpre- etal.,2024;Hafneretal.,2024). Thisenablesflexibleuse
learnedinversemodels,outperformingpriorstate- ofmodel-basedoptimizationtoobtainpoliciesasitcircum-
of-the-artworkacrossdiversetaskfamiliessuch vents the need for explicit state-estimation. Despite this,
asarbitrarilyconfiguredmazes, pushmanipula- significantchallengesremaininitsuseforsolvinggeneral-
| tionwithvariedobjectshapes,andmulti-particle |     |     |     |     | purposetasks. |     |     |     |     |     |
| -------------------------------------------- | --- | --- | --- | --- | ------------- | --- | --- | --- | --- | --- |
scenarios.
Tounderstandthechallengesinworldmodeling,letuscon-
|     |     |     |     |     | sider the         | two broad paradigms                 | in learning |     | world models: |     |
| --- | --- | --- | --- | --- | ----------------- | ----------------------------------- | ----------- | --- | ------------- | --- |
|     |     |     |     |     | onlineandoffline. | Intheonlinesetting,accesstotheenvi- |             |     |               |     |
1.Introduction
ronmentisoftenrequiredsodatacanbecontinuouslycol-
RoboticsandembodiedAIhaveseentremendousprogress lectedtoimprovetheworldmodel,whichinturnimproves
|                  |          |     |           |              | the policy | and the subsequent | data collection. |     | However, |     |
| ---------------- | -------- | --- | --------- | ------------ | ---------- | ------------------ | ---------------- | --- | -------- | --- |
| in recent years. | Advances | in  | imitation | learning and | rein-      |                    |                  |     |          |     |
forcementlearninghaveenabledagentstolearncomplex theonlineworldmodelisonlyaccurateinthecoverofthe
behaviorsacrossdiversetasks(Agarwaletal.,2022;Zhao policy that was being optimized. Hence, while it can be
etal.,2023;Leeetal.,2024;Maetal.,2024;Hafneretal., usedtotrainpowerfultask-specificpolicies,itrequiresre-
trainingforeverynewtaskeveninthesameenvironment.
1CourantInstitute,NewYorkUniversity2MetaAI.Correspon-
|     |     |     |     |     | Instead, in | the offline setting, | the world | model | is  | trained |
| --- | --- | --- | --- | --- | ----------- | -------------------- | --------- | ----- | --- | ------- |
denceto:GaoyueZhou<gz2123@nyu.edu>.
onanofflinedatasetofcollectedtrajectoriesintheenviron-
Proceedingsofthe42nd ment,whichremovesitsdependenceonthetaskspecificity
InternationalConferenceonMachine
|     |     |     |     |     | given sufficient | coverage | in the dataset. | However, |     | when |
| --- | --- | --- | --- | --- | ---------------- | -------- | --------------- | -------- | --- | ---- |
Learning,Vancouver,Canada.PMLR267,2025.Copyright2025
bytheauthor(s).
1

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
required to solve a task, methods in this domain require available on our project website: https://dino-wm.
strongauxiliaryinformationwhichcantaketheformofex- github.io/.
pertdemonstrations(Pathaketal.,2018;Wangetal.,2023),
structuredkeypoints(Koetal.,2023;Wenetal.,2024),ac-
2.RelatedWork
cesstopretrainedinversemodels(Duetal.,2023;Koetal.,
2023)ordenserewardfunctions(Dingetal.,2024),allof Webuildontopofseveralworksindevelopingworldmod-
whichreducethegeneralityofusingofflineworldmodels. els,optimizingbehaviorsfromthem,andleveragingcom-
Thecentralquestioninbuildingbetterofflineworldmodels pactvisualrepresentations. Forconciseness,weonlydis-
is if there is alternate auxiliary information that does not cusstheonesmostrelevanttoDINO-WM.
compromiseitsgenerality?
Model-basedLearning: Learningfrommodelsofdynam-
In this work, we present DINO-WM, a new and simple icshasarichliteraturespanningthefieldsofcontrol,plan-
methodtobuildtask-agnosticworldmodelsfromanoffline ning,androbotics(Sutton,1991;Todorov&Li,2005;As-
datasetoftrajectories(Figure1). DINO-WMmodelsthe tolfietal.,2008;Holkar&Waghmare,2010;Williamsetal.,
worlddynamicsoncompactembeddingsoftheworld,rather 2017). Recent works have shown that modeling dynam-
thantherawobservationsthemselves. Fortheembedding, ics and predicting future states can significantly enhance
weusepretrainedpatch-featuresfromtheDINOv2model, vision-basedlearningforembodiedagentsacrossvariousap-
whichprovidesbothaspatialandobject-centricrepresenta- plications,includingonlinereinforcementlearning(Micheli
tionprior. Weconjecturethatthispretrainedrepresentation etal.,2023;Robineetal.,2023;Hansenetal.,2024;Hafner
enables robust and consistent world modeling, which re- et al., 2024), exploration (Sekar et al., 2020; Mendonca
laxesthenecessityfortask-specificdatacoverage. Given et al., 2021; 2023a), planning (Watter et al., 2015) (Finn
thesevisualembeddingsandactions,DINO-WMusesthe & Levine, 2017; Ebert et al., 2018; Hafner et al., 2019),
ViTarchitecturetopredictfutureembeddings. Oncethis and imitation learning (Pathak et al., 2018). Several of
model is trained on the offline dataset, planning to solve theseapproachesinitiallyfocusedonstate-spacedynamics
tasksisconstructedasvisualgoalreaching,i.e. toreacha (Deisenroth&Rasmussen,2011;Lenzetal.,2015;Chua
futuredesiredgoalgiventhecurrentobservation. Sincethe etal.,2018;Nagabandietal.,2019),andhavesincebeen
predictionsbyDINO-WMarehighquality(seeFigure4), extendedtohandleimage-basedinputs,whichweaddressin
wecansimplyusemodelpredictivecontrolwithinference- thiswork. Theseworldmodelscanpredictfuturestatesin
timeoptimizationtoreachdesiredgoalswithoutanyextra eitherpixelspace(Finn&Levine,2017;Ebertetal.,2018;
informationduringtesting. Ko et al., 2023; Du et al., 2023) or latent representation
space(Yanetal.,2021). Predictinginpixelspace,however,
DINO-WM is experimentally evaluated on six environ-
iscomputationallyexpensiveduetotheneedforimagere-
mentsuitesspanningmazenavigation,slidingmanipulation,
construction and the overhead of using diffusion models
robotic arm control, and deformable object manipulation
(Koetal.,2023). Ontheotherhand,latent-spaceprediction
tasks. Ourexperimentsrevealthefollowingfindings:
istypicallytiedtoimagereconstructionobjectives(Hafner
etal.,2019;Michelietal.,2023;Hafneretal.,2024),which
• DINO-WMproduceshigh-qualityfutureworldmodeling raisesconcernsaboutwhetherthelearnedfeaturescontain
thatcanbemeasuredbyimprovedvisualreconstruction sufficientinformationaboutthetask. Moreover,manyof
fromtraineddecoders. OnLPIPSmetricsforourhardest thesemodelsincorporaterewardprediction(Michelietal.,
tasks,thisimprovesuponpriorstate-of-the-artworkby 2023;Robineetal.,2023;Hafneretal.,2024),orusereward
56%(SeeSection4.7). predictionasanauxiliaryobjectivetolearnthelatentrepre-
sentation(Hansenetal.,2022;2024),inherentlymakingthe
• GiventhelatentworldmodelstrainedusingDINO-WM,
worldmodeltask-specific. Inthiswork,weaimtodecou-
we show high success for reaching arbitrary goals on
pletask-dependentinformationfromlatent-spaceprediction,
ourhardesttasks,improvinguponpriorworkby45%on
strivingtodevelopaversatileandtask-agnosticworldmodel
average(SeeSection4.3).
capableofgeneralizingacrossdifferentscenarios.
• DINO-WMcanbetrainedacrossenvironmentvariations Generative Models as World Models: With the recent
withinataskfamily(e.g. differentmazelayoutsfornav- excitement of large scale foundation models, there have
igationordifferentobjectshapesformanipulation)and been initiatives on building large-scale video generation
achievehigherratesofsuccesscomparedtopriorwork world models conditioned on agent’s actions in the do-
(SeeSection4.5). mainofself-driving(Huetal.,2023),control(Yangetal.,
2023;Bruceetal.,2024),andgeneral-purposevideogen-
eration (Liu et al., 2024). These models aim to generate
Code and models for DINO-WM are open-sourced to
videopredictionsconditionedontextorhigh-levelaction
ensure reproducibility and videos of planning are made
2

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
Figure1.WepresentDINO-WM,amethodfortrainingvisualmodelsbyusingpretrainedDINOv2embeddingsofimageframes(a).
Oncetrained,givenatargetobservationo ,wecandirectlyoptimizeagentbehaviorbyplanningthroughDINO-WMusingmodel
T
predictivecontrol(b).Theuseofpretrainedembeddingssignificantlyimprovesperformanceoverpriorstate-of-the-artworldmodels(c).
3.DINOWorldModels
| sequences. | Whilethesemodelshavedemonstratedutilityin |     |     |     |     |     |     |     |     |     |     |     |
| ---------- | ----------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
downstreamtaskslikedataaugmentations,theirrelianceon
|     |     |     |     |     | OverviewandProblemFormulation: |     |     |     |     | Ourworkfollows |     |     |
| --- | --- | --- | --- | --- | ------------------------------ | --- | --- | --- | --- | -------------- | --- | --- |
languageconditioninglimitstheirapplicationwhenprecise
|                                         |     |     |     |               | the | vision-based | control | task      | framework, |     | which  | models |
| --------------------------------------- | --- | --- | --- | ------------- | --- | ------------ | ------- | --------- | ---------- | --- | ------ | ------ |
| visuallyindicativegoalsneedtobereached. |     |     |     | Additionally, |     |              |         |           |            |     |        |        |
|                                         |     |     |     |               | the | environment  | as a    | partially | observable |     | Markov | deci-  |
theuseofdiffusionmodelsforvideogenerationmakesthem
computationallyexpensive,furtherrestrictingtheirapplica- sionprocess(POMDP).ThePOMDPisdefinedbythetu-
|     |     |     |     |     | ple | (O,A,p), | where | O represents |     | the observation |     | space, |
| --- | --- | --- | --- | --- | --- | -------- | ----- | ------------ | --- | --------------- | --- | ------ |
bilityfortest-timeoptimizationtechniquessuchasMPC.
|     |     |     |     |     | and | A denotes | the action |     | space. | The dynamics |     | of the |
| --- | --- | --- | --- | --- | --- | --------- | ---------- | --- | ------ | ------------ | --- | ------ |
Inthiswork,weaimtobuildaworldmodelinlatentspace
|     |     |     |     |     | environment |     | are modeled |     | by the | transition | distribution |     |
| --- | --- | --- | --- | --- | ----------- | --- | ----------- | --- | ------ | ---------- | ------------ | --- |
insteadofrawpixelspace,enablingmorepreciseplanning
|             |     |     |     |     | p(o | |   | o ,a ), | which | predicts | future | observations |     |
| ----------- | --- | --- | --- | --- | --- | --- | ------- | ----- | -------- | ------ | ------------ | --- |
| andcontrol. |     |     |     |     |     | t+1 | ≤t ≤t   |       |          |        |              |     |
basedonpastactionsandobservations.
| PretrainedVisualRepresentations: |     |     | Significantadvance- |     |     |     |     |     |     |     |     |     |
| -------------------------------- | --- | --- | ------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Inthiswork,weaimtolearntask-agnosticworldmodels
| ments have | been made | in the field | of visual | representa- |     |     |     |     |     |     |     |     |
| ---------- | --------- | ------------ | --------- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- |
tionlearning,wherecompactfeaturesthatcapturespatial fromprecollectedofflinedatasets,andusetheseworldmod-
|              |             |        |              |           | elstoperformvisualreasoningandcontrolattesttime. |     |     |     |     |     |     | At  |
| ------------ | ----------- | ------ | ------------ | --------- | ------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- |
| and semantic | information | can be | readily used | for down- |                                                  |     |     |     |     |     |     |     |
testtime,oursystemstartsfromanarbitraryenvironment
| streamtasks. | Pre-trainedmodelslikeImageNetpre-trained |     |     |     |     |     |     |     |     |     |     |     |
| ------------ | ---------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
stateandisprovidedwithagoalobservationintheformof
ResNet(Heetal.,2016),I-JEPA(Assranetal.,2023),and
anRGBimage,inlinewithpriorworks(Ebertetal.,2018;
DINO(Caronetal.,2021;Oquabetal.,2024)forimages,
Wuetal.,2020;Mendoncaetal.,2023b),andisaskedto
aswellasV-JEPA(Bardesetal.,2024)forvideos,andR3M
|                                                     |     |     |     |     | performasequenceofactionsa |     |     |     | ,...,a | toreachthegoal |     |     |
| --------------------------------------------------- | --- | --- | --- | --- | -------------------------- | --- | --- | --- | ------ | -------------- | --- | --- |
| (Nairetal.,2022),MVP(Xiaoetal.,2022)forroboticshave |     |     |     |     |                            |     |     |     | 0      | T              |     |     |
state. Thisapproachdiffersfromtheworldmodelsusedin
allowedfastadaptationtodownstreamtasksastheycontain
onlinereinforcementlearning(RL)wheretheobjectiveisto
| richspatialandsemanticinformation. |     |     | Whilemanyofthese |     |     |     |     |     |     |     |     |     |
| ---------------------------------- | --- | --- | ---------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
optimizetherewardsforafixedsetoftasksathand(Hafner
modelsrepresentimagesusingasingleglobalfeature,the
etal.,2024;Hansenetal.,2024),orfromtext-conditioned
| introduction  | of Vision   | Transformers | (ViTs)         | (Dosovitskiy |       |         |       |           |     |           |         |      |
| ------------- | ----------- | ------------ | -------------- | ------------ | ----- | ------- | ----- | --------- | --- | --------- | ------- | ---- |
|               |             |              |                |              | world | models, | where | the goals | are | specified | through | text |
| et al., 2021) | has enabled | the use      | of pre-trained | patch fea-   |       |         |       |           |     |           |         |      |
prompts(Duetal.,2023;Koetal.,2023).
tures,asdemonstratedbyDINO(Caronetal.,2021;Oquab
| et al., 2024). | DINO | employs a | self-distillation | loss that |     |     |     |     |     |     |     |     |
| -------------- | ---- | --------- | ----------------- | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
3.1.DINO-basedWorldModels(DINO-WM)
allowsthemodeltolearnrepresentationseffectively,captur-
ingsemanticlayoutsandimprovingspatialunderstanding
|     |     |     |     |     | We  | model | the dynamics | of  | the environment |     | in  | the latent |
| --- | --- | --- | --- | --- | --- | ----- | ------------ | --- | --------------- | --- | --- | ---------- |
withinimages. Inthiswork,weleverageDINOv2’spatch space. More specifically, at each time step t, our world
embeddingstotrainourworldmodel,anddemonstratethat
modelconsistsofthefollowingcomponents:
itservesasaversatileencodercapableofhandlingvarious
|               |     |     |     |     |     | Observationmodel: |     | z   | ∼enc  | (z |o | )     |       |
| ------------- | --- | --- | --- | --- | --- | ----------------- | --- | --- | ----- | ----- | ----- | ----- |
| precisetasks. |     |     |     |     |     |                   |     | t   |       | θ t   | t     |       |
|               |     |     |     |     |     | Transitionmodel:  |     | z   | ∼p    | (z    | |z    | ,a )  |
|               |     |     |     |     |     |                   |     | t+1 |       | θ t+1 | t−H:t | t−H:t |
|               |     |     |     |     |     | Decodermodel:     |     | oˆ  | ∼q (o | |z )  |       |       |
|               |     |     |     |     |     |                   |     | t   | θ     | t t   |       |       |
(optionalforvisualization)
3

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
|     | o   |     |     |     | Actions optimized at test-time |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | ------------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|     | t−k |     |     |     |                                |     |     |     |     |     |     | o   |     |     |
g
⋯
|     | o   |     |     |     |     |     |     | ⋯   |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
t
|     |        |     |     |     |     | a   |     |     |     |     | a   |     |        |     |
| --- | ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------ | --- |
|     |        |     | a t |     |     | t+1 |     |     | ⋯   |     | T−1 |     |        |     |
|     | DINOv2 |     |     |     |     |     |     |     |     |     |     |     | DINOv2 |     |
z
g
Planning loss
|     | z   |     |     | θ   |     |     | θ   |       |     |     |     | θ   |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- |
|     | t−k |     |     | p   |     | p   |     |       |     | ⋯   |     | p   |     |     |
|     | z   |     |     |     | z   |     |     | z     |     |     |     |     | z   |     |
|     | t   |     |     |     | t̂  | +1  |     | t̂ +2 |     |     |     |     | T̂  |     |
Figure2.ArchitectureofDINO-WM.Givenobservationso t−k:t ,weoptimizethesequenceofactionsa t:T−1 tominimizethepredicted
losstothedesiredgoalo g . Allforwardcomputationisdoneinthelatentspacez. Herep θ indicatesDINO-WM’sdynamicsmodel,
whichisusedformakingfuturepredictions.
wheretheobservationmodelencodesimageobservationsto each time step t, it encodes an image o to patch embed-
t
∈RN×E,whereN
latentstatesz ,andthetransitionmodeltakesinahistoryof dingsz denotesthenumberofpatches,
|     | t   |     |     |     |     |     |     | t   |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
pastlatentstatesoflengthH. Thedecodermodeltakesin andE denotestheembeddingdimension. Thisprocessis
alatentz t ,andreconstructstheimageobservationo t . We visualizedinFigure2.
| useθtodenotetheparametersofthesemodels. |     |     |     |     |     | Notethat |     |     |     |     |     |     |     |     |
| --------------------------------------- | --- | --- | --- | --- | --- | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
ourdecoderisentirelyoptional,asthetrainingobjectives 3.1.2.TRANSITIONMODEL
forthedecoderareindependentfortrainingtherestpartof
|                |     |                                    |     |     |     |     | We  | adopt | the ViT | architecture |     | (Dosovitskiy |     | et al., 2021) |
| -------------- | --- | ---------------------------------- | --- | --- | --- | --- | --- | ----- | ------- | ------------ | --- | ------------ | --- | ------------- |
| theworldmodel. |     | Thiseliminatestheneedtoreconstruct |     |     |     |     |     |       |         |              |     |              |     |               |
forthetransitionmodelduetoitssuitabilityforprocessing
imagesbothduringtrainingandtesting,whichreducescom-
|     |     |     |     |     |     |     | patch | features. |     | We remove |     | the tokenization |     | layer, as it |
| --- | --- | --- | --- | --- | --- | --- | ----- | --------- | --- | --------- | --- | ---------------- | --- | ------------ |
putationalcostscomparedtootherwisecouplingtogether
operatesonpatchembeddings,effectivelytransformingit
thetrainingoftheobservationalmodelandthedecoder,as
|                                         |     |     |     |     |             |     | into          | a decoder-only |     | transformer.     |     | We       | further | make a few |
| --------------------------------------- | --- | --- | --- | --- | ----------- | --- | ------------- | -------------- | --- | ---------------- | --- | -------- | ------- | ---------- |
| in(Michelietal.,2023;Hafneretal.,2024). |     |     |     |     | Weablateand |     |               |                |     |                  |     |          |         |            |
|                                         |     |     |     |     |             |     | modifications |                | to  | the architecture |     | to allow | for     | additional |
showtheeffectivenessofthischoiceinAppendixA.4.2.
conditioningonproprioceptionandcontrolleractions.
| DINO-WM | models | only | the information |     | available | from |     |     |     |     |     |     |     |     |
| ------- | ------ | ---- | --------------- | --- | --------- | ---- | --- | --- | --- | --- | --- | --- | --- | --- |
Ourtransitionmodeltakesinahistoryofpastlatentstates
offlinetrajectorydatainanenvironment,incontrasttore-
|     |     |     |     |     |     |     | z       |     | andactionsa |         |     | ,whereH | isahyperparam- |     |
| --- | --- | --- | --- | --- | --- | --- | ------- | --- | ----------- | ------- | --- | ------- | -------------- | --- |
|     |     |     |     |     |     |     | t−H:t−1 |     |             | t−H:t−1 |     |         |                |     |
centonlineRLworldmodelsthatalsorequiretask-relevant
eterdenotingthecontextlengthofthemodel,andpredicts
information,suchasrewards(Hafneretal.,2020;Hansen
|     |     |     |     |     |     |     | the | latent | state at | next | time step | z . To | properly | capture |
| --- | --- | --- | --- | --- | --- | --- | --- | ------ | -------- | ---- | --------- | ------ | -------- | ------- |
et al., 2022; 2024), discount factors (Hafner et al., 2022; t
thetemporaldependencies,wheretheworldstateattimet
Robineetal.,2023),andterminationconditions(Micheli
shouldonlydependonpreviousobservationsandactions,
etal.,2023;Hafneretal.,2024).
|     |     |     |     |     |     |     | we     | implement | a   | causal    | attention | mechanism |         | in the ViT  |
| --- | --- | --- | --- | --- | --- | --- | ------ | --------- | --- | --------- | --------- | --------- | ------- | ----------- |
|     |     |     |     |     |     |     | model, | enabling  |     | the model | to        | predict   | latents | autoregres- |
3.1.1.OBSERVATIONMODEL
|     |     |     |     |     |     |     | sivelyataframelevel. |     |     |     | Specifically, | eachpatchvectorzi |     |     |
| --- | --- | --- | --- | --- | --- | --- | -------------------- | --- | --- | --- | ------------- | ----------------- | --- | --- |
t
|     |     |     |     |     |     |     |     |     |     |     |     | {zi | }N  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Tolearnagenericworldmodelacrossmanyenvironments for the latent state z t attends to . This is
|     |     |     |     |     |     |     |     |     |     |     |     | t−H:t−1 | i=1 |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------- | --- | --- |
and the real world, we argue that the observation model differentfrompastworkIRIS(Michelietal.,2023)which
should 1) be task and environment independent, and 2) similarlyrepresentseachobservationasasequenceofvec-
tors,butautoregressivelypredictzi
capturerichspatialinformationfornavigationandmanip- atatokenlevel,attend-
t
ulation. Contrarytopreviousworkwheretheobservation ing to {zi }N as well as {zi}<k. We argue that
|     |     |     |     |     |     |     |     | t−H:t−1 |     | i=1 |     | t   | i=1 |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------- | --- | --- | --- | --- | --- | --- |
modelisalwayslearnedforthetaskathand(Hafneretal., predicting at a frame level and treating patch vectors of
2024),weargueinsteadthatitcanbeinefficientandoften oneobservationasawholebettercapturesglobalstructure
notpossibletolearnagoodobservationmodelfromscratch andtemporaldynamics,modelingdependenciesacrossthe
whenfacinganewenvironment,asperceptionisageneral entire observation rather than isolated tokens, leading to
taskthatbenefitsfromlarge-scaleinternetdata. Therefore, improvedtemporalgeneralization. Theeffectivenessofthis
weusethepre-trainedDINOv2modelasourworldmodel’s attentionmaskhasbeenshowninourablationexperiments
| observationmodel,leveragingitsstrongspatialunderstand- |     |     |     |     |     |     | inAppendixA.4.1 |     |     |     |     |     |     |     |
| ------------------------------------------------------ | --- | --- | --- | --- | --- | --- | --------------- | --- | --- | --- | --- | --- | --- | --- |
ingfortaskslikeobjectdetection,semanticsegmentation,
|     |                  |        |     |             |     |          | To  | model | the effect | of  | the agent’s | action | to  | the environ- |
| --- | ---------------- | ------ | --- | ----------- | --- | -------- | --- | ----- | ---------- | --- | ----------- | ------ | --- | ------------ |
| and | depth estimation | (Oquab | et  | al., 2024). | The | observa- |     |       |            |     |             |        |     |              |
ment,weconditiontheworldmodel’spredictionsonthese
| tionmodelremainsfrozenduringtrainingandtesting. |     |     |     |     |     | At  |     |     |     |     |     |     |     |     |
| ----------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
4

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
actions. Specifically,weconcatenatetheK-dimensionalac- Weutilizethecross-entropymethod(CEM)tooptimizethe
tionvector,mappedfromtheoriginalactionrepresentation sequence of actions at each iteration. The planning cost
usingamulti-layerperceptron(MLP),toeachpatchvector is defined as the mean squared error (MSE) between the
zi fori = 1,...,N. Whenproprioceptiveinformationis currentlatentstateandthegoal’slatentstate,givenby
t
available,weincorporateitsimilarlybyconcatenatingitto
|     |     |     |     |     |     |     |     |     |     |     | zˆ =p(zˆ | ,a  | ),  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | -------- | --- | --- |
theobservationlatents,therebyintegratingitintothelatent t t−1 t−1
| states.   |           |                  |         |          |        |        | C =∥zˆ | −z  | ∥2, | where | zˆ =enc(o | ),  |     |
| --------- | --------- | ---------------- | ------- | -------- | ------ | ------ | ------ | --- | --- | ----- | --------- | --- | --- |
|           |           |                  |         |          |        |        |        | T g |     |       | 0         | 0   |     |
|           |           |                  |         |          |        |        |        |     |     |       | z =enc(o  | ).  |     |
| We train  | the world | model with       | teacher | forcing. | During |        |        |     |     |       | g         | g   |     |
| training, | we slice  | the trajectories | into    | segments | of     | length |        |     |     |       |           |     |     |
TheMPCframeworkandCEMoptimizationprocedureare
H+1,andcomputealatentconsistencylossoneachofthe
|                    |     |                        |     |     |     |     | detailedinAppendixA.5.1. |     |     | Sinceourworldmodelisdiffer- |     |     |     |
| ------------------ | --- | ---------------------- | --- | --- | --- | --- | ------------------------ | --- | --- | --------------------------- | --- | --- | --- |
| H predictedframes. |     | Foreachframe,wecompute |     |     |     |     |                          |     |     |                             |     |     |     |
entiable,apossiblymoreefficientapproachistooptimize
)∥2
L pred =∥p θ (enc θ (o t−H:t ),ϕ(a t−H:t ))−enc θ (o t+1 thisobjectivethroughgradientdescent(GD),allowingthe
|     |     |     |     |     |     | (1) | worldmodeltodirectlyguidetheagenttowardaspecific |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------ | --- | --- | --- | --- | --- | --- |
whereϕistheactionencodermodelthatcanmapactions
|     |     |     |     |     |     |     | goal. The | details | of GD | are provided | in  | Appendix | A.5.2. |
| --- | --- | --- | --- | --- | --- | --- | --------- | ------- | ----- | ------------ | --- | -------- | ------ |
tohigherdimensions. Notethatourworldmodeltraining However, we empirically observe that CEM outperforms
| is entirely | performed | in latent | space, | without | the need | to  |     |     |     |     |     |     |     |
| ----------- | --------- | --------- | ------ | ------- | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
GDinourexperimentswithfullresultsinAppendixA.5.3.
reconstructtheoriginalpixelimages. We hypothesize that incorporating regularizations during
trainingandintheplanningobjectivescouldfurtherimprove
3.1.3.DECODERFORINTERPRETABILITY
performance,andleavethisforfuturework.
Toaidinvisualizationandinterpretability,weuseastack
| oftransposedconvolutionlayerstodecodethepatchrepre- |     |     |     |     |     |     | 4.Experiments |     |     |     |     |     |     |
| --------------------------------------------------- | --- | --- | --- | --- | --- | --- | ------------- | --- | --- | --- | --- | --- | --- |
sentationsbacktoimagepixels,similarasin(Razavietal.,
Ourexperimentsaredesignedtoaddressthefollowingkey
2019). Givenapre-collecteddataset,weoptimizethepa-
|                        |     |     |                           |     |     |     | questions:                   | 1)Canweeffectivelytrain |     |                        | DINO-WM |     | using |
| ---------------------- | --- | --- | ------------------------- | --- | --- | --- | ---------------------------- | ----------------------- | --- | ---------------------- | ------- | --- | ----- |
| rametersθofthedecoderq |     | θ   | withasimplereconstruction |     |     |     |                              |                         |     |                        |         |     |       |
|                        |     |     |                           |     |     |     | precollectedofflinedatasets? |                         |     | 2)Oncetrained,canDINO- |         |     |       |
lossdefinedas:
3)Towhatextentdoes
WMbeusedforvisualplanning?
∥2,
L =∥q (z )−o where z =enc (o ) (2) the quality of the world model depend on pre-trained vi-
| rec | θ t | t   |     | t   | θ t |     |                       |     |     |              |     |            |     |
| --- | --- | --- | --- | --- | --- | --- | --------------------- | --- | --- | ------------ | --- | ---------- | --- |
|     |     |     |     |     |     |     | sual representations? |     | 4)  | Does DINO-WM |     | generalize | to  |
Thetrainingofthedecoderisentirelyindependentofthe
newconfigurations,suchasvariationsinspatiallayoutsand
| transition | model | training, offering | several | advantages: |     | 1)  |                     |     |           |     |                  |     |     |
| ---------- | ----- | ------------------ | ------- | ----------- | --- | --- | ------------------- | --- | --------- | --- | ---------------- | --- | --- |
|            |       |                    |         |             |     |     | objectarrangements? |     | 5)Howdoes |     | DINO-WM’sperfor- |     |     |
Thedecoderdoesnotaffecttheworldmodel’sreasoningand
|     |     |     |     |     |     |     | mancescalewithofflinedatasetsize? |     |     |     | Wetrainandevaluate |     |     |
| --- | --- | --- | --- | --- | --- | --- | --------------------------------- | --- | --- | --- | ------------------ | --- | --- |
planningcapabilitiesforsolvingdownstreamtasks,and2)
DINO-WMacrosssixenvironmentsuites(fulldescription
Thereisnoneedtoreconstructrawpixelimagesduringplan-
|                                         |     |     |     |     |               |     | in Appendix | A.1), | comparing | it  | to state-of-the-art |     | world |
| --------------------------------------- | --- | --- | --- | --- | ------------- | --- | ----------- | ----- | --------- | --- | ------------------- | --- | ----- |
| ning,therebyreducingcomputationalcosts. |     |     |     |     | Nevertheless, |     |             |       |           |     |                     |     |       |
modelsthatpredictineitherlatentspaceorrawpixelspace.
thedecoderremainsvaluableasitenhancestheinterpretabil-
ityoftheworldmodel’spredictions.Whilebackpropagating
4.1.EnvironmentsandTasks
thisdecoderlosstothepredictorispossible,weablatethis
choiceandfindthatitnegativelyimpactsperformancecom- We evaluate six environment suites with varying dynam-
| paredtoomittingthedecoderloss. |     |     | Fulldetailsareprovided |     |     |     |                 |      |     |       |           |      |          |
| ------------------------------ | --- | --- | ---------------------- | --- | --- | --- | --------------- | ---- | --- | ----- | --------- | ---- | -------- |
|                                |     |     |                        |     |     |     | ics complexity, | some | of  | which | are drawn | from | standard |
inAppendixA.4.2. roboticsbenchmarks,suchasD4RL(Fuetal.,2021)and
DeepMindControlSuite(Tassaetal.,2018),asshownin
3.2.VisualPlanningwithDINO-WM Figure 3. These environments include maze navigation
|     |     |     |     |     |     |     | (Maze, Wall), | fine-grained |     | control | for | tabletop | pushing |
| --- | --- | --- | --- | --- | --- | --- | ------------- | ------------ | --- | ------- | --- | -------- | ------- |
Toevaluatethequalityoftheworldmodel,weperformtra-
(PushT)androboticarmcontrol(Reach),anddeformable
jectoryoptimizationattesttimeandmeasureperformance.
objectmanipulationwithanXArm(Rope,Granular).
Whiletheplanningmethodsthemselvesarefairlystandard,
theyserveasmeanstoemphasizethequalityoftheworld Inallenvironments,thetaskistoreacharandomlysampled
models. For this purpose, our world model receives the goal statespecified by a target observation, startingfrom
currentobservationo andagoalobservationo ,bothrep- arbitraryinitialstates. ForPushT,targetconfigurationsare
|     |     | 0   |     |     | g   |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
resented as RGB images. We formulate planning as the sampledtoensurefeasibilitywithin25steps. ForGranu-
processofsearchingforasequenceofactionsthattheagent lar,targetsrequiregatheringallparticlesintoasquarewith
wouldtaketoreacho g . Weemploymodelpredictivecon- randomizedlocationsandsizes. Observationsinallenviron-
trol(MPC),whichfacilitatesplanningbyconsideringthe mentsareRGBimagesofsize(224,224).Afulldescription
outcomesoffutureactions. oftheenvironmentsisprovidedinAppendixA.1.
5

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
|     |     |     |     |     |     | Distance(CD)on10instancesforthem. |     |     |     |     | InGranular,we |     |
| --- | --- | --- | --- | --- | --- | --------------------------------- | --- | --- | --- | --- | ------------- | --- |
samplearandomconfigurationfromthevalidationset,with
thegoalofpushingthematerialsintoasquareshapeata
randomlyselectedlocationandscale.
Table1.Planningresultsforofflineworldmodelsonsixcontrol
environments.
|     |     |     |     |     |     | Model     | Maze | Wall | Reach | PushT | Rope | Granular |
| --- | --- | --- | --- | --- | --- | --------- | ---- | ---- | ----- | ----- | ---- | -------- |
|     |     |     |     |     |     |           | SR↑  | SR↑  | SR↑   | SR↑   | CD↓  | CD↓      |
|     |     |     |     |     |     | IRIS      | 0.74 | 0.04 | 0.18  | 0.32  | 1.11 | 0.37     |
|     |     |     |     |     |     | DreamerV3 | 1.00 | 1.00 | 0.64  | 0.30  | 2.49 | 1.05     |
|     |     |     |     |     |     | TD-MPC2   | 0.00 | 0.00 | 0.00  | 0.00  | 2.52 | 1.21     |
|     |     |     |     |     |     | Ours      | 0.98 | 0.96 | 0.92  | 0.90  | 0.41 | 0.26     |
Figure3.WeevaluateDINO-WMonsixenvironmentsuites,from
AsseeninTable1,onsimplerenvironmentssuchasWall
| left to right, | top to bottom: | Maze, | Reach, | Wall, | Push-T, Rope |                |     |         |     |       |          |              |
| -------------- | -------------- | ----- | ------ | ----- | ------------ | -------------- | --- | ------- | --- | ----- | -------- | ------------ |
|                |                |       |        |       |              | and PointMaze, |     | DINO-WM |     | is on | par with | state-of-art |
Manipulation,andGranularManipulation.
|     |     |     |     |     |     | worldmodelslikeDreamerV3. |     |     |     | However,DINO-WMsig- |     |     |
| --- | --- | --- | --- | --- | --- | ------------------------- | --- | --- | --- | ------------------- | --- | --- |
nificantlyoutperformspriorworkatmanipulationenviron-
4.2.Baselines mentswhererichcontactinformationandobjectdynamics
|     |     |     |     |     |     | needtobeaccuratelyinferredfortaskcompletion. |     |     |     |     |     | Weno- |
| --- | --- | --- | --- | --- | --- | -------------------------------------------- | --- | --- | --- | --- | --- | ----- |
WecompareDINO-WMwiththefollowingstate-of-the-art
|                               |     |     |     |                    |     | tice that | for TD-MPC2, |     | the | lack of | reward | signal makes |
| ----------------------------- | --- | --- | --- | ------------------ | --- | --------- | ------------ | --- | --- | ------- | ------ | ------------ |
| modelscommonlyusedforcontrol. |     |     |     | ForIRIS,DreamerV3, |     |           |              |     |     |         |        |              |
itdifficulttolearngoodlatentrepresentations,whichsub-
andTD-MPC2,wetrainthemodelswithourofflinedatasets sequently results in poor performance. Visualizations of
withoutanyrewardortaskinformation,andperformMPC
planningonallenvironmentscanbefoundinAppendixA.8.
onthelearnedworldmodelforsolvingdownstreamtasks.
|                             |     |     |     |                      |     | Does DINO-WM             |     | learn | better | environment             |     | dynamics as |
| --------------------------- | --- | --- | --- | -------------------- | --- | ------------------------ | --- | ----- | ------ | ----------------------- | --- | ----------- |
|                             |     |     |     |                      |     | moredatabecomeavailable? |     |       |        | Weconductasetofablation |     |             |
| a) IRIS(Michelietal.,2023): |     |     |     | IRISencodesvisualin- |     |                          |     |       |        |                         |     |             |
experimentsinSection4.8,showingthattheplanningper-
putsintotokensviaadiscreteautoencoderandpredicts
futuretokensusingaGPTTransformer,enablingpolicy formancescalespositivelywiththeamountoftrainingdata.
|     |     |     |     |     |     | We also | present | the full | inference | and | planning | times for |
| --- | --- | --- | --- | --- | --- | ------- | ------- | -------- | --------- | --- | -------- | --------- |
andvaluelearningthroughimagination.
DINO-WMinAppendixA.6,showingsignificantspeedup
b) DreamerV3 (Hafner et al., 2024): DreamerV3 en- overtraditionalsimulation,particularlyinthecomputation-
codesvisualinputsintocategoricalrepresentations,pre- allyintensivedeformableenvironments.
dictsfuturestatesandrewards,andtrainsanactor-critic
policyfromimaginedtrajectories. 4.4.Doespre-trainedvisualrepresentationsmatter?
c) TD-MPC2(Hansenetal.,2024): TD-MPC2learns Weusedifferentpre-trainedgeneral-purposeencodersasthe
observationmodeloftheworldmodel,andevaluatetheir
| a decoder-free | world | model | in  | latent | space and uses |     |     |     |     |     |     |     |
| -------------- | ----- | ----- | --- | ------ | -------------- | --- | --- | --- | --- | --- | --- | --- |
rewardsignalstooptimizethelatents. downstream planning performance. Specifically, we use
thefollowingencoderscommonlyusedinroboticscontrol
d) AVDC(Koetal.,2023): AVDCusesadiffusionmodel andgeneralperception: R3M(Nairetal.,2022),ImageNet
togeneratetaskexecutionvideosfromaninitialobserva- pretrainedResNet-18(Russakovskyetal.,2015;Heetal.,
tionandtextualgoal.Weprovidequalitativeevaluations 2016)andDINOCLS(Caronetal.,2021).Detaileddescrip-
| and MPC | planning | results | for | an action-conditioned |     |     |     |     |     |     |     |     |
| ------- | -------- | ------- | --- | --------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
tionsoftheseencodersareinAppendixA.3.
variantinSection4.6.
Table2.Planningresultsforworldmodelswithvariouspre-trained
encoders.
4.3.OptimizingBehaviorswithDINO-WM
|     |     |     |     |     |     | Model |     | Maze | Wall | Reach PushT | Rope | Granular |
| --- | --- | --- | --- | --- | --- | ----- | --- | ---- | ---- | ----------- | ---- | -------- |
Withatrainedworldmodel,westudyifDINO-WMcanbe SR↑ SR↑ SR↑ SR↑ CD↓ CD↓
usedforzero-shotplanningdirectlyinthelatentspace. R3M 0.94 0.34 0.40 0.42 1.13 0.95
|     |     |     |     |     |     | ResNet |     | 0.98 | 0.12 | 0.06 | 0.20 | 1.08 0.90 |
| --- | --- | --- | --- | --- | --- | ------ | --- | ---- | ---- | ---- | ---- | --------- |
ForMaze,Reach,PushT,andWallenvironments,wesample
|     |     |     |     |     |     | DINOCLS         |     | 0.96 | 0.58 | 0.60 | 0.44 | 0.84 0.79 |
| --- | --- | --- | --- | --- | --- | --------------- | --- | ---- | ---- | ---- | ---- | --------- |
|     |     |     |     |     |     | DINOPatch(Ours) |     | 0.98 | 0.96 | 0.92 | 0.90 | 0.41 0.26 |
50initialandgoalstatesandmeasurethesuccessrateacross
| allinstances. | Duetotheenvironmentsteppingtimeforthe |     |     |     |     |     |     |     |     |     |     |     |
| ------------- | ------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
RopeandGranularenvironments,weevaluatetheChamfer WereporttheplanningperformanceinTable2. InthePoint-
6

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
Figure4.Open-looprolloutsofworldmodelsonPush-TandGranular.Giventhefirstframeandactionsequence,eachmodelpredicts
futureframes,reconstructedbyitsdecoder.Foreachenvironment,thebottomrowdenotesthegroundtruth. DINO-WM(Ours)rollouts
areboldedandarevisuallyindistinguishablefromthegroundtruthobservations.
Maze task, which involves simple dynamics and control, wecomparethelinearproberesultsonthreeenvironments
weobservethatworldmodelswithvariousobservationen- acrossbothpatch-basedfeatures(DINOv2ofvariousViT
codersallachievenear-perfectsuccessrates. However,as sizes,pre-trainedMAE(Heetal.,2021)andglobalfeatures
the environment’s complexity increases—requiring more (DINO CLS, R3M). The validation loss for these linear
precisecontrolandspatialunderstanding—worldmodels probes is reported in Table 3, where DINO-S Patch and
that encode observations as a single latent vector show a DINO-BPatchachievethelowestvalidationloss,indicating
significantdropinperformance. Wepositthatpatch-based their superior task representation capabilities. While the
representationsbettercapturespatialinformation, incon- pre-trainedMAEalsohaspatch-basedfeatures,ithasmuch
trasttomodelslikeR3M,ResNet,andDINOCLS,which highervalidationloss. WehypothesizethisisbecauseMAE
reduceobservationstoasingleglobalfeaturevector,losing prioritizesreconstructionovertaskrelevance,makingita
crucialspatialdetailsnecessaryformanipulationtasks. lesspreferablechoiceforcontroltasks.
Tobetterunderstandthestrongplanningperformanceen-
4.5.GeneralizingtoNovelEnvironmentConfigurations
abledbyDINOv2features,weanalyzethefeaturesdirectly.
A well-established method for evaluating feature quality We evaluate the generalization of our world models not
indownstreamcontroltasksislinearprobingfromthefea- only across different goals but also across various en-
tures to environment states, which assesses how well the vironment configurations. We construct three environ-
featuresencodetask-relevantstateinformation. Tothisend, mentfamilies—WallRandom,PushObj,andGranularRan-
7

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
encountersfewerthanhalftheparticlespresentduringtrain-
Table3.LinearProbeValidationLossforPre-trainedEncoders.
ing,resultinginout-of-distributionimagescomparedtothe
Weevaluatethelinearprobeperformancebymappingtheembed-
|     |     |     |     |     | training | instances. | Nevertheless, |     | DINO-WM | accurately |     |
| --- | --- | --- | --- | --- | -------- | ---------- | ------------- | --- | ------- | ---------- | --- |
dingsfromeachencodertothestatevectorofeachenvironment.
|     |     |     |     |     | encodes | the scene | and successfully |     | gathers | the | particles |
| --- | --- | --- | --- | --- | ------- | --------- | ---------------- | --- | ------- | --- | --------- |
DINO-SandDINO-BdenoteDINOv2modelswithViT-Small
intoadesignatedsquarelocationwiththelowestChamfer
andViT-Basearchitectures,respectively.Forpatch-basedfeatures
(DINO-SPatch,DINO-BPatch,andPre-trainedMAE),wefirst Distance (CD) compared to the baselines, demonstrating
flattenthepatchembeddings,projectthemtoa1536-dimensional bettersceneunderstanding. Wehypothesizethatthisisdue
vector,andthenfeedthemintoalinearprobemodel.Ourresults toDINO-WM’sobservationmodelencodingthesceneas
showthatDINO-SPatchandDINO-BPatchachievethelowest patchfeatures,makingthevarianceinparticlenumberstill
| validationloss. |     |           |       |      | withinthedistributionforeachimagepatch. |     |     |     |     |     |     |
| --------------- | --- | --------- | ----- | ---- | --------------------------------------- | --- | --- | --- | --- | --- | --- |
| Method          |     | PointMaze | PushT | Wall |                                         |     |     |     |     |     |     |
4.6.QualitativeComparisonswithGenerativeVideo
| DINO-SPatch |     | 0.017 | 0.434 | 0.184 |        |     |     |     |     |     |     |
| ----------- | --- | ----- | ----- | ----- | ------ | --- | --- | --- | --- | --- | --- |
| DINO-BPatch |     | 0.014 | 0.504 | 0.163 | Models |     |     |     |     |     |     |
| DINO-SCLS   |     | 0.475 | 0.833 | 0.519 |        |     |     |     |     |     |     |
Giventheprominenceofgenerativevideomodels,it’snatu-
| Pre-trainedMAE |     | 0.856 | 0.804 | 0.711 |     |     |     |     |     |     |     |
| -------------- | --- | ----- | ----- | ----- | --- | --- | --- | --- | --- | --- | --- |
raltoassumetheycouldserveasworldmodels.Wecompare
| R3M |     | 0.192 | 0.902 | 0.539 |     |     |     |     |     |     |     |
| --- | --- | ----- | ----- | ----- | --- | --- | --- | --- | --- | --- | --- |
DINO-WMwithAVDC(Koetal.,2023),adiffusion-based
|     |     |     |     |     | generativemodel. |     | AsshowninFigure6,whileAVDCcan |     |     |     |     |
| --- | --- | --- | --- | --- | ---------------- | --- | ----------------------------- | --- | --- | --- | --- |
generatevisuallyrealisticfutureimages,theseimageslack
|     |     |     |     |     | physicalplausibility. |     | Large,unrealisticchangescanoccur |     |     |     |     |
| --- | --- | --- | --- | --- | --------------------- | --- | -------------------------------- | --- | --- | --- | --- |
withinasingletimestep,andthemodelstrugglestoreach
|     |     |     |     |     | the exact | goal | state. Future | advancements |     | in generative |     |
| --- | --- | --- | --- | --- | --------- | ---- | ------------- | ------------ | --- | ------------- | --- |
modelsmayhelpaddresstheseissues.
Figure5.TrainingandtestingsetupsforWallRandom,PushObj
andGranularRandom.Testsetupsarehighlightedinblue.
dom—wherethemodelistestedonunseenconfigurations
| withrandomgoals. |     | Visualizationsoftrainingandtesting |     |     |     |     |     |     |     |     |     |
| ---------------- | --- | ---------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
examplesareshowninFigure5,anddetaileddescriptions
oftheenvironmentscanbefoundinAppendixA.2.
|     |     |     |     |     | Figure6. | PlansgeneratedbyDINO-WMandAVDC. |     |     |     |     |     |
| --- | --- | --- | --- | --- | -------- | ------------------------------- | --- | --- | --- | --- | --- |
WefurthercompareDINO-WMwithavariantofAVDC,
Table4.Planningresultsforofflineworldmodelsonthreesuites
|     |     |     |     |     | where the | diffusion | model | is trained | to  | generate | the next |
| --- | --- | --- | --- | --- | --------- | --------- | ----- | ---------- | --- | -------- | -------- |
withunseenenvironmentconfigurations.
|       |            |         |                |      | observationo                              |                                         | conditionedonthecurrentobservationo |               |     |              |       |
| ----- | ---------- | ------- | -------------- | ---- | ----------------------------------------- | --------------------------------------- | ----------------------------------- | ------------- | --- | ------------ | ----- |
| Model | WallRandom | PushObj | GranularRandom |      |                                           | t+1                                     |                                     |               |     |              | t     |
|       |            |         |                |      | andactiona                                | ,ratherthangeneratinganentiresequenceof |                                     |               |     |              |       |
|       | SR↑        | SR↑     |                | CD↓  |                                           | t                                       |                                     |               |     |              |       |
|       |            |         |                |      | observationsatonceconditionedonatextgoal. |                                         |                                     |               |     | Wepresent    |       |
| IRIS  | 0.06       | 0.14    |                | 0.86 |                                           |                                         |                                     |               |     |              |       |
|       |            |         |                |      | open-loop                                 | rollout                                 | results                             | on validation |     | trajectories | using |
DreamerV3 0.76 0.18 1.53 thisaction-conditionedAVDC,withvisualizationsshownin
| R3M | 0.40 | 0.16 |     | 1.12 |     |     |     |     |     |     |     |
| --- | ---- | ---- | --- | ---- | --- | --- | --- | --- | --- | --- | --- |
Figure7. Itcanbeseenthattheaction-conditionedAVDC
| ResNet | 0.40 | 0.14 |     | 0.98 |     |     |     |     |     |     |     |
| ------ | ---- | ---- | --- | ---- | --- | --- | --- | --- | --- | --- | --- |
divergesfromthegroundtruthobservationsoverlong-term
| DINOCLS | 0.64 | 0.18 |     | 1.36 |     |     |     |     |     |     |     |
| ------- | ---- | ---- | --- | ---- | --- | --- | --- | --- | --- | --- | --- |
predictions,makingitinsufficientforaccuratetaskplanning.
| Ours | 0.82 | 0.34 |     | 0.63 |     |     |     |     |     |     |     |
| ---- | ---- | ---- | --- | ---- | --- | --- | --- | --- | --- | --- | --- |
4.7.DecodingandInterpretingtheLatents
FromTable4,weobservethatDINO-WMdemonstrates
significantly better performance in WallRandom, indicat- AlthoughDINO-WMoperatesinlatentspaceandtheob-
ingthatmodelhaseffectivelylearnedthegeneralconcepts servationmodelisnottrainedwithpixelreconstructionob-
of walls and doors, even when they are positioned in lo- jectives,trainingadecoderaidsininterpretingpredictions.
cationsunseenduringtraining. Incontrast,othermethods Weevaluatetheimagequalityofpredictedfuturesacrossall
struggletoaccuratelyidentifythedoor’spositionandnav- modelsandfindthatourapproachoutperformsothers,even
igate through it. The PushObj task remains challenging thosewhoseencodersaretrainedwithenvironment-specific
forallmethods,asthemodelwasonlytrainedonthefour reconstructionobjectives. Open-looprolloutsinFigure4
objectshapes,whichmakesitdifficulttopreciselyinferrel- demonstrate DINO-WM’srobustnessdespitethelackof
evantphysicalparameters. InGranularRandom,theagent explicitpixelsupervision. WereporttheLearnedPerceptual
8

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
4.8.ScalingLawsofDINO-WM
ToanalyzethescalingbehaviorofDINO-WM,wetrained
|     |     |     |     | world | models | and | performed | planning |     | using datasets | of  |
| --- | --- | --- | --- | ----- | ------ | --- | --------- | -------- | --- | -------------- | --- |
varyingsizes,rangingfrom200to18500trajectoriesonthe
|     |     |     |     | PushTenvironment.                       |           |                            | OurresultsinTable7demonstratea |     |         |                |     |
| --- | --- | --- | --- | --------------------------------------- | --------- | -------------------------- | ------------------------------ | --- | ------- | -------------- | --- |
|     |     |     |     | cleartrend:                             |           | asthedatasetsizeincreases, |                                |     |         | boththequality |     |
|     |     |     |     | of                                      | the world | model’s                    | predictions                    |     | and the | performance    | of  |
|     |     |     |     | theplannedbehaviorimprovesignificantly. |           |                            |                                |     |         | Largerdatasets |     |
enabletheworldmodeltocapturemorediversedynamics
andnuancesoftheenvironment,leadingtomoreaccurate
predictionsandbetter-informedplanning.
Table7.PlanningperformanceandpredictionqualityonPushT
withDINO-WMtrainedondatasetsofvarioussizes.SSIMand
LPIPSaremeasuredonthepredictedfuturelatentsafterdecoding.
Weobserveconsistentimprovementinperformanceasweincrease
thedatasetsize.
|     |     |     |     |     | DatasetSize |     | SR↑  | SSIM↑ | LPIPS↓ |       |     |
| --- | --- | --- | --- | --- | ----------- | --- | ---- | ----- | ------ | ----- | --- |
|     |     |     |     |     | n=200       |     | 0.08 | 0.949 |        | 0.056 |     |
Figure7.Open-looprolloutonPushTwithDINO-WMandaction-
|     |     |     |     |     | n=1000 |     | 0.48 | 0.973 |     | 0.013 |     |
| --- | --- | --- | --- | --- | ------ | --- | ---- | ----- | --- | ----- | --- |
conditionedAVDC(AVDC-AC).Foreachtrajectory,themodel
|     |     |     |     |     | n=5000 |     | 0.72 | 0.981 |     | 0.007 |     |
| --- | --- | --- | --- | --- | ------ | --- | ---- | ----- | --- | ----- | --- |
isgiventhefirstframeaswellassequenceofactions.Theworld
|     |     |     |     |     | n=10000 |     | 0.88 | 0.984 |     | 0.006 |     |
| --- | --- | --- | --- | --- | ------- | --- | ---- | ----- | --- | ----- | --- |
modelsperformopen-looprolloutwiththeseactions.
|             |                    |           |                |     | n=18500 |     | 0.92 | 0.987 |     | 0.005 |     |
| ----------- | ------------------ | --------- | -------------- | --- | ------- | --- | ---- | ----- | --- | ----- | --- |
| Image Patch | Similarity (LPIPS) | (Zhang et | al., 2018) and |     |         |     |      |       |     |       |     |
StructuralSimilarityIndex(SSIM)(Wangetal.,2004)on
| theworldmodels’predictedfutureframesinTable5and |     |     |     | 5.Conclusion |     |     |     |     |     |     |     |
| ----------------------------------------------- | --- | --- | --- | ------------ | --- | --- | --- | --- | --- | --- | --- |
Table6. SSIMmeasurestheperceivedqualityofimagesby
WeintroduceDINO-WM,asimpleyeteffectivetechnique
evaluatingstructuralinformationandluminanceconsistency
|                                    |                            |                      |             | formodeling                       |     | visualdynamicsinlatent |     |     |                    | spacewithoutthe |     |
| ---------------------------------- | -------------------------- | -------------------- | ----------- | --------------------------------- | --- | ---------------------- | --- | --- | ------------------ | --------------- | --- |
| between                            | predicted and ground-truth | images,              | with higher |                                   |     |                        |     |     |                    |                 |     |
|                                    |                            |                      |             | needforpixel-spacereconstruction. |     |                        |     |     | Wehavedemonstrated |                 |     |
| valuesindicatinggreatersimilarity. |                            | LPIPSassessespercep- |             |                                   |     |                        |     |     |                    |                 |     |
thatDINO-WMcapturesenvironmentaldynamicsandgen-
tualsimilaritybycomparingdeeprepresentationsofimages,
withlowerscoresreflectingcloservisualsimilarity. eralizestounseenconfigurations,independentoftaskspec-
|     |     |     |     | ifications, |           | enabling | visual    | reasoning      | at  | test time | and gen- |
| --- | --- | --- | --- | ----------- | --------- | -------- | --------- | -------------- | --- | --------- | -------- |
|     |     |     |     | erating     | zero-shot |          | solutions | for downstream |     | tasks     | through  |
Table5.ComparisonofworldmodelprecitionsonLPIPS(↓).
|     |     |     |     | planning. |     | DINO-WM | takes | a   | step toward | bridging | the |
| --- | --- | --- | --- | --------- | --- | ------- | ----- | --- | ----------- | -------- | --- |
Method PushT Wall Rope Granular gapbetweentask-agnosticworldmodelingandreasoning
andcontrol,offeringpromisingprospectsforgenericworld
| R3M | 0.045 0.008 | 0.023 | 0.080 |     |     |     |     |     |     |     |     |
| --- | ----------- | ----- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
modelsinreal-worldapplications.
| ResNet  | 0.063 0.002 | 0.025 | 0.080 |     |     |     |     |     |     |     |     |
| ------- | ----------- | ----- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
| DINOCLS | 0.039 0.004 | 0.029 | 0.086 |     |     |     |     |     |     |     |     |
LimitationsandFutureWork:First,DINO-WMassumes
AVDC 0.046 0.030 0.060 0.106 accesstoofflinedatasetswithsufficientstate-actioncover-
Ours 0.007 0.0016 0.009 0.035 age,whichcanbechallengingtoobtainforhighlycomplex
|     |     |     |     | environments.                         |         | Thiscanpotentiallybeaddressedbycombin- |     |     |     |              |     |
| --- | --- | --- | --- | ------------------------------------- | ------- | -------------------------------------- | --- | --- | --- | ------------ | --- |
|     |     |     |     | ing                                   | DINO-WM | withexplorationstrategiesandupdating   |     |     |     |              |     |
|     |     |     |     | themodelasnewexperiencesareavailable. |         |                                        |     |     |     | Second,DINO- |     |
Table6.ComparisonofworldmodelprecitionsonSSIM(↑).
WMstillreliesontheavailabilityofgroundtruthactions
Method PushT Wall Rope Granular fromagents,whichmaynotalwaysbefeasiblewhentrain-
R3M 0.956 0.994 0.982 0.917 ing with vast video data from the internet. Lastly, while
wecurrentlyplaninactionspacefordownstreamtasksolv-
| ResNet  | 0.950 0.996 | 0.980 | 0.915 |      |              |     |         |            |         |            |     |
| ------- | ----------- | ----- | ----- | ---- | ------------ | --- | ------- | ---------- | ------- | ---------- | --- |
|         |             |       |       | ing, | an extension |     | of this | work could | involve | developing |     |
| DINOCLS | 0.973 0.996 | 0.980 | 0.912 |      |              |     |         |            |         |            |     |
ahierarchicalstructurethatintegrateshigh-levelplanning
| AVDC | 0.959 0.983 | 0.979 | 0.909 |     |     |     |     |     |     |     |     |
| ---- | ----------- | ----- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
withlow-levelcontrolpoliciestoenablesolvingmorefine-
| Ours | 0.985 0.997 | 0.985 | 0.940 |     |     |     |     |     |     |     |     |
| ---- | ----------- | ----- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
grainedcontroltasks.
9

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
Acknowledgements Brohan, A., Brown, N., Carbajal, J., Chebotar, Y., Dabis,
J.,Finn,C.,Gopalakrishnan,K.,Hausman,K.,Herzog,
WewouldliketothankAdemiAdeniji,AlfredoCanziani,
|     |     |     |     |     |     | A., Hsu, | J., | Ibarz, J., Ichter, |     | B., Irpan, | A., Jackson, | T., |
| --- | --- | --- | --- | --- | --- | -------- | --- | ------------------ | --- | ---------- | ------------ | --- |
AmirBar,KevinZhang,MidoAssran,VladSobal,Zichen
|                                               |     |     |     |     |      | Jesmonth, | S., | Joshi, N. | J., Julian, | R., Kalashnikov, |     | D., |
| --------------------------------------------- | --- | --- | --- | --- | ---- | --------- | --- | --------- | ----------- | ---------------- | --- | --- |
| JeffCuifortheirvaluablediscussionandfeedback. |     |     |     |     | This |           |     |           |             |                  |     |     |
Kuang,Y.,Leal,I.,Lee,K.-H.,Levine,S.,Lu,Y.,Malla,
workwassupportedbygrantsfromHonda,Hyundai,NSF
U.,Manjunath,D.,Mordatch,I.,Nachum,O.,Parada,C.,
award2339096andONRawardsN00014-21-1-2758and
Peralta,J.,Perez,E.,Pertsch,K.,Quiambao,J.,Rao,K.,
| N00014-22-1-2773. |     | LPissupportedbythePackardFellow- |     |     |     |     |     |     |     |     |     |     |
| ----------------- | --- | -------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Ryoo,M.,Salazar,G.,Sanketi,P.,Sayed,K.,Singh,J.,
ship.
|     |     |     |     |     |     | Sontakke, | S., | Stone, A., | Tan, | C., Tran, | H., Vanhoucke, |         |
| --- | --- | --- | --- | --- | --- | --------- | --- | ---------- | ---- | --------- | -------------- | ------- |
|     |     |     |     |     |     | V., Vega, | S., | Vuong, Q., | Xia, | F., Xiao, | T., Xu,        | P., Xu, |
ImpactStatement
|     |     |     |     |     |     | S.,Yu,T.,andZitkovich,B. |     |         | Rt-1:     | Roboticstransformer |            |     |
| --- | --- | --- | --- | --- | --- | ------------------------ | --- | ------- | --------- | ------------------- | ---------- | --- |
|     |     |     |     |     |     | for real-world           |     | control | at scale, | 2023b.              | URL https: |     |
This paper presents work whose goal is to facilitate the //arxiv.org/abs/2212.06817.
| learning | and applications | of task-agnostic |     | world | models. |     |     |     |     |     |     |     |
| -------- | ---------------- | ---------------- | --- | ----- | ------- | --- | --- | --- | --- | --- | --- | --- |
Therearemanypotentialsocietalconsequencesofourwork,
|     |     |     |     |     |     | Bruce, J., | Dennis, | M., | Edwards, | A., Parker-Holder, |     | J., |
| --- | --- | --- | --- | --- | --- | ---------- | ------- | --- | -------- | ------------------ | --- | --- |
nonewhichwefeelmustbespecificallyhighlightedhere. Shi, Y., Hughes, E., Lai, M., Mavalankar, A., Steiger-
|     |     |     |     |     |     | wald, | R., Apps, | C., Aytar, | Y., | Bechtle, | S., Behbahani, |     |
| --- | --- | --- | --- | --- | --- | ----- | --------- | ---------- | --- | -------- | -------------- | --- |
References F., Chan, S., Heess, N., Gonzalez, L., Osindero, S.,
|                                           |     |     |     |     |        | Ozair,      | S., Reed, | S., Zhang, |         | J., Zolna,    | K., Clune, | J., |
| ----------------------------------------- | --- | --- | --- | --- | ------ | ----------- | --------- | ---------- | ------- | ------------- | ---------- | --- |
| Agarwal,A.,Kumar,A.,Malik,J.,andPathak,D. |     |     |     |     | Legged |             |           |            |         |               |            |     |
|                                           |     |     |     |     |        | de Freitas, |           | N., Singh, | S., and | Rockta¨schel, | T.         | Ge- |
locomotion in challenging terrains using egocentric vi- nie: Generative interactive environments, 2024. URL
sion,2022.URLhttps://arxiv.org/abs/2211.
https://arxiv.org/abs/2402.15391.
07638.
|     |     |     |     |     |     | Caron, M., | Touvron, | H., | Misra, | I., Je´gou, | H., Mairal, | J., |
| --- | --- | --- | --- | --- | --- | ---------- | -------- | --- | ------ | ----------- | ----------- | --- |
Assran,M.,Duval,Q.,Misra,I.,Bojanowski,P.,Vincent,
|                                    |     |     |     |                 |     | Bojanowski,                             |     | P., andJoulin, | A.  | Emergingpropertiesin |           |     |
| ---------------------------------- | --- | --- | --- | --------------- | --- | --------------------------------------- | --- | -------------- | --- | -------------------- | --------- | --- |
| P.,Rabbat,M.,LeCun,Y.,andBallas,N. |     |     |     | Self-supervised |     |                                         |     |                |     |                      |           |     |
|                                    |     |     |     |                 |     | self-supervisedvisiontransformers,2021. |     |                |     |                      | URLhttps: |     |
learningfromimageswithajoint-embeddingpredictive //arxiv.org/abs/2104.14294.
architecture.InProceedingsoftheIEEE/CVFConference
onComputerVisionandPatternRecognition,pp.15619– Chi,C.,Xu,Z.,Feng,S.,Cousineau,E.,Du,Y.,Burchfiel,
15629,2023.
|     |     |     |     |     |     | B., Tedrake,                                |     | R., andSong, | S.  | Diffusionpolicy: |     | Visuo- |
| --- | --- | --- | --- | --- | --- | ------------------------------------------- | --- | ------------ | --- | ---------------- | --- | ------ |
|     |     |     |     |     |     | motorpolicylearningviaactiondiffusion,2024. |     |              |     |                  |     | URL    |
Astolfi,A.,Karagiannis,D.,andOrtega,R. Nonlinearand https://arxiv.org/abs/2303.04137.
| adaptivecontrolwithapplications,volume187. |     |     |     |     | Springer, |     |     |     |     |     |     |     |
| ------------------------------------------ | --- | --- | --- | --- | --------- | --- | --- | --- | --- | --- | --- | --- |
2008.
|         |              |            |           |     |             | Chua, K.,                            | Calandra,     | R.,      | McAllister, | R.,          | and Levine, | S.  |
| ------- | ------------ | ---------- | --------- | --- | ----------- | ------------------------------------ | ------------- | -------- | ----------- | ------------ | ----------- | --- |
|         |              |            |           |     |             | Deep                                 | reinforcement | learning |             | in a handful | of trials   | us- |
| Bardes, | A., Garrido, | Q., Ponce, | J., Chen, | X., | Rabbat, M., |                                      |               |          |             |              |             |     |
|         |              |            |           |     |             | ingprobabilisticdynamicsmodels,2018. |               |          |             |              | URLhttps:   |     |
LeCun, Y., Assran, M., and Ballas, N. V-JEPA: La- //arxiv.org/abs/1805.12114.
tentvideopredictionforvisualrepresentationlearning,
2024. URLhttps://openreview.net/forum?
|     |     |     |     |     |     | Deisenroth, | M.  | P. and | Rasmussen, | C.  | E. Pilco: | A   |
| --- | --- | --- | --- | --- | --- | ----------- | --- | ------ | ---------- | --- | --------- | --- |
id=WFYbBOEOtv. model-basedanddata-efficientapproachtopolicysearch.
|         |            |               |               |     |           | In International |     | Conference                   |     | on Machine | Learning, |     |
| ------- | ---------- | ------------- | ------------- | --- | --------- | ---------------- | --- | ---------------------------- | --- | ---------- | --------- | --- |
| Brohan, | A., Brown, | N., Carbajal, | J., Chebotar, |     | Y., Chen, |                  |     |                              |     |            |           |     |
|         |            |               |               |     |           | 2011.            | URL | https://api.semanticscholar. |     |            |           |     |
X., Choromanski, K., Ding, T., Driess, D., Dubey, A., org/CorpusID:14273320.
Finn,C.,Florence,P.,Fu,C.,Arenas,M.G.,Gopalakr-
ishnan,K.,Han,K.,Hausman,K.,Herzog,A.,Hsu,J., Ding,Z.,Zhang,A.,Tian,Y.,andZheng,Q.Diffusionworld
Ichter,B.,Irpan,A.,Joshi,N.,Julian,R.,Kalashnikov, model: Futuremodelingbeyondstep-by-steprolloutfor
D., Kuang, Y., Leal, I., Lee, L., Lee, T.-W. E., Levine, URLhttps://
offlinereinforcementlearning,2024.
S., Lu, Y., Michalewski, H., Mordatch, I., Pertsch, K., arxiv.org/abs/2402.03570.
| Rao, | K., Reymann, | K., Ryoo, | M., Salazar, |     | G., Sanketi, |     |     |     |     |     |     |     |
| ---- | ------------ | --------- | ------------ | --- | ------------ | --- | --- | --- | --- | --- | --- | --- |
P.,Sermanet,P.,Singh,J.,Singh,A.,Soricut,R.,Tran, Dosovitskiy, A., Beyer, L., Kolesnikov, A., Weissenborn,
H., Vanhoucke, V., Vuong, Q., Wahid, A., Welker, S., D., Zhai, X., Unterthiner, T., Dehghani, M., Minderer,
Wohlhart, P., Wu, J., Xia, F., Xiao, T., Xu, P., Xu, S., M., Heigold, G., Gelly, S., Uszkoreit, J., and Houlsby,
Yu,T.,andZitkovich,B. Rt-2: Vision-language-action N. An image is worth 16x16 words: Transformers
modelstransferwebknowledgetoroboticcontrol,2023a. for image recognition at scale, 2021. URL https:
URLhttps://arxiv.org/abs/2307.15818. //arxiv.org/abs/2010.11929.
10

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
Du,Y.,Yang,M.,Dai,B.,Dai,H.,Nachum,O.,Tenenbaum, He,K.,Zhang,X.,Ren,S.,andSun,J. Deepresiduallearn-
J.B.,Schuurmans,D.,andAbbeel,P. Learninguniversal ingforimagerecognition. InProceedingsoftheIEEE
policies via text-guided video generation, 2023. URL conferenceoncomputervisionandpatternrecognition,
| https://arxiv.org/abs/2302.00111. |     |     |     |     | pp.770–778,2016. |     |     |     |     |     |
| --------------------------------- | --- | --- | --- | --- | ---------------- | --- | --- | --- | --- | --- |
Ebert,F.,Finn,C.,Dasari,S.,Xie,A.,Lee,A.,andLevine, He,K.,Chen,X.,Xie,S.,Li,Y.,Dolla´r,P.,andGirshick,R.
Maskedautoencodersarescalablevisionlearners,2021.
| S. Visual | foresight: Model-based | deep | reinforcement |     |     |     |     |     |     |     |
| --------- | ---------------------- | ---- | ------------- | --- | --- | --- | --- | --- | --- | --- |
learning for vision-based robotic control, 2018. URL URLhttps://arxiv.org/abs/2111.06377.
https://arxiv.org/abs/1812.00568.
|     |     |     |     |     | Holkar,            | K.andWaghmare,                   | L.M. | Anoverviewofmodel |     |     |
| --- | --- | --- | --- | --- | ------------------ | -------------------------------- | ---- | ----------------- | --- | --- |
|     |     |     |     |     | predictivecontrol. | InternationalJournalofcontroland |      |                   |     |     |
Etukuru,H.,Naka,N.,Hu,Z.,Lee,S.,Mehu,J.,Edsinger,
A.,Paxton,C.,Chintala,S.,Pinto,L.,andShafiullah,N. automation,3(4):47–63,2010.
| M.M. Robotutilitymodels: |        | Generalpoliciesforzero- |       |          |          |                   |         |          |               |     |
| ------------------------ | ------ | ----------------------- | ----- | -------- | -------- | ----------------- | ------- | -------- | ------------- | --- |
|                          |        |                         |       |          | Hu, A.,  | Russell, L., Yeo, | H.,     | Murez,   | Z., Fedoseev, | G., |
| shot deployment          | in new | environments.           | arXiv | preprint |          |                   |         |          |               |     |
|                          |        |                         |       |          | Kendall, | A., Shotton,      | J., and | Corrado, | G. Gaia-1:    | A   |
arXiv:2409.05865,2024.
generativeworldmodelforautonomousdriving,2023.
Finn,C.andLevine,S. Deepvisualforesightforplanning Jia, Z., Thumuluri, V., Liu, F., Chen, L., Huang, Z., and
| robot motion, | 2017. URL | https://arxiv.org/ |     |     |       |                                         |     |     |     |     |
| ------------- | --------- | ------------------ | --- | --- | ----- | --------------------------------------- | --- | --- | --- | --- |
|               |           |                    |     |     | Su,H. | Chain-of-thoughtpredictivecontrol,2024. |     |     |     | URL |
abs/1610.00696.
https://arxiv.org/abs/2304.00776.
Fu, J., Kumar, A., Nachum, O., Tucker, G., and Levine, Ko,P.-C.,Mao,J.,Du,Y.,Sun,S.-H.,andTenenbaum,J.B.
S. D4rl: Datasets for deep data-driven reinforcement Learning to act from actionless videos through dense
| learning, 2021. | URL https://arxiv.org/abs/ |     |     |     |                       |     |                       |     |     |     |
| --------------- | -------------------------- | --- | --- | --- | --------------------- | --- | --------------------- | --- | --- | --- |
|                 |                            |     |     |     | correspondences,2023. |     | URLhttps://arxiv.org/ |     |     |     |
| 2004.07219.     |                            |     |     |     | abs/2310.08576.       |     |                       |     |     |     |
Ha, D. and Schmidhuber, J. World models. 2018. doi: Lee,S.,Wang,Y.,Etukuru,H.,Kim,H.J.,Shafiullah,N.
| 10.5281/ZENODO.1207631. |     | URLhttps://zenodo. |     |     |        |               |          |            |      |        |
| ----------------------- | --- | ------------------ | --- | --- | ------ | ------------- | -------- | ---------- | ---- | ------ |
|                         |     |                    |     |     | M. M., | and Pinto, L. | Behavior | generation | with | latent |
org/record/1207631. actions, 2024. URL https://arxiv.org/abs/
2403.03181.
| Hafner, D., Lillicrap, | T., Fischer, | I., Villegas, |     | R., Ha, D., |     |     |     |     |     |     |
| ---------------------- | ------------ | ------------- | --- | ----------- | --- | --- | --- | --- | --- | --- |
Lee,H.,andDavidson,J. Learninglatentdynamicsfor Lenz, I., Knepper, R. A., and Saxena, A. Deepmpc:
planning from pixels, 2019. URL https://arxiv. Learning deep latent features for model predic-
org/abs/1811.04551. tive control. In Robotics: Science and Systems,
https://api.semanticscholar.
|                                            |     |     |     |         | 2015. | URL |     |     |     |     |
| ------------------------------------------ | --- | --- | --- | ------- | ----- | --- | --- | --- | --- | --- |
| Hafner,D.,Lillicrap,T.,Ba,J.,andNorouzi,M. |     |     |     | Dreamto |       |     |     |     |     |     |
org/CorpusID:10130184.
| control: Learningbehaviorsbylatentimagination,2020. |     |     |     |     |     |     |     |     |     |     |
| --------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
URLhttps://arxiv.org/abs/1912.01603. Liu, Y., Zhang, K., Li, Y., Yan, Z., Gao, C., Chen, R.,
Yuan,Z.,Huang,Y.,Sun,H.,Gao,J.,He,L.,andSun,L.
Hafner,D.,Lillicrap,T.,Norouzi,M.,andBa,J. Mastering Sora: Areviewonbackground,technology,limitations,
atari with discrete world models, 2022. URL https: and opportunities of large vision models, 2024. URL
//arxiv.org/abs/2010.02193. https://arxiv.org/abs/2402.17177.
Hafner,D.,Pasukonis,J.,Ba,J.,andLillicrap,T. Master- Ma, Y. J., Liang, W., Wang, G., Huang, D.-A., Bastani,
ingdiversedomainsthroughworldmodels,2024. URL O., Jayaraman, D., Zhu, Y., Fan, L., and Anandkumar,
https://arxiv.org/abs/2301.04104. A. Eureka: Human-levelrewarddesignviacodinglarge
|     |     |     |     |     | languagemodels,2024. |     | URLhttps://arxiv.org/ |     |     |     |
| --- | --- | --- | --- | --- | -------------------- | --- | --------------------- | --- | --- | --- |
Haldar, S., Peng, Z., and Pinto, L. Baku: An efficient abs/2310.12931.
| transformerformulti-taskpolicylearning, |     |     |     | 2024. URL |     |     |     |     |     |     |
| --------------------------------------- | --- | --- | --- | --------- | --- | --- | --- | --- | --- | --- |
https://arxiv.org/abs/2406.07539. Mendonca,R.,Rybkin,O.,Daniilidis,K.,Hafner,D.,and
|     |     |     |     |     | Pathak, | D. Discoveringandachievinggoalsviaworld |     |     |     |     |
| --- | --- | --- | --- | --- | ------- | --------------------------------------- | --- | --- | --- | --- |
Hansen, N., Wang, X., and Su, H. Temporal differ- models, 2021. URL https://arxiv.org/abs/
| encelearningformodelpredictivecontrol,2022. |     |     |     | URL | 2110.09514. |     |     |     |     |     |
| ------------------------------------------- | --- | --- | --- | --- | ----------- | --- | --- | --- | --- | --- |
https://arxiv.org/abs/2203.04955.
|     |     |     |     |     | Mendonca, | R., Bahl, | S., and | Pathak, | D. Alan: | Au- |
| --- | --- | --- | --- | --- | --------- | --------- | ------- | ------- | -------- | --- |
Hansen, N., Su, H., and Wang, X. Td-mpc2: Scalable, tonomously exploring robotic agents in the real world,
robustworldmodelsforcontinuouscontrol,2024. URL 2023a. URL https://arxiv.org/abs/2302.
| https://arxiv.org/abs/2310.16828. |     |     |     |     | 06604. |     |     |     |     |     |
| --------------------------------- | --- | --- | --- | --- | ------ | --- | --- | --- | --- | --- |
11

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
Mendonca,R.,Bahl,S.,andPathak,D. Structuredworld Sutton,R.S. Dyna,anintegratedarchitectureforlearning,
models from human videos, 2023b. URL https:// planning,andreacting. ACMSigartBulletin,2(4):160–
arxiv.org/abs/2308.10901.
163,1991.
Micheli,V.,Alonso,E.,andFleuret,F. Transformersare Tassa, Y., Doron, Y., Muldal, A., Erez, T., Li, Y.,
sample-efficientworldmodels,2023. URLhttps:// deLasCasas,D.,Budden,D.,Abdolmaleki,A.,Merel,J.,
arxiv.org/abs/2209.00588. Lefrancq,A.,Lillicrap,T.,andRiedmiller,M. Deepmind
https://arxiv.org/
|            |               |     |             |     |            |     | control | suite, 2018. |     | URL |     |     |
| ---------- | ------------- | --- | ----------- | --- | ---------- | --- | ------- | ------------ | --- | --- | --- | --- |
| Nagabandi, | A., Konoglie, |     | K., Levine, | S., | and Kumar, | V.  |         |              |     |     |     |     |
abs/1801.00690.
Deepdynamicsmodelsforlearningdexterousmanipula-
URLhttps://arxiv.org/abs/1909.
| tion,2019. |     |     |     |     |     |     | Todorov,E.andLi,W.                                 |     | Ageneralizediterativelqgmethod |             |     |              |
| ---------- | --- | --- | --- | --- | --- | --- | -------------------------------------------------- | --- | ------------------------------ | ----------- | --- | ------------ |
| 11652.     |     |     |     |     |     |     | forlocally-optimalfeedbackcontrolofconstrainednon- |     |                                |             |     |              |
|            |     |     |     |     |     |     |                                                    |     |                                | Proceedings |     | of the 2005, |
|            |     |     |     |     |     |     | linear stochastic                                  |     | systems.                       | In          |     |              |
Nair,S.,Rajeswaran,A.,Kumar,V.,Finn,C.,andGupta,
AmericanControlConference,2005.,pp.300–306.IEEE,
| A. R3m: | Auniversalvisualrepresentationforrobotma- |     |     |     |     |     |     |     |     |     |     |     |
| ------- | ----------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
2005.
| nipulation,2022. |     | URLhttps://arxiv.org/abs/ |     |     |     |     |     |     |     |     |     |     |
| ---------------- | --- | ------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
2203.12601. Wang,J.,Dasari,S.,Srirama,M.K.,Tulsiani,S.,andGupta,
|     |     |     |     |     |     |     | A. Manipulate |     | by seeing: | Creating | manipulation | con- |
| --- | --- | --- | --- | --- | --- | --- | ------------- | --- | ---------- | -------- | ------------ | ---- |
Oquab,M.,Darcet,T.,Moutakanni,T.,Vo,H.,Szafraniec,
|               |     |            |     |         |            |     | trollers | from pre-trained |     | representations, |     | 2023. URL |
| ------------- | --- | ---------- | --- | ------- | ---------- | --- | -------- | ---------------- | --- | ---------------- | --- | --------- |
| M., Khalidov, | V., | Fernandez, | P., | Haziza, | D., Massa, | F., |          |                  |     |                  |     |           |
https://arxiv.org/abs/2303.08135.
El-Nouby,A.,Assran,M.,Ballas,N.,Galuba,W.,Howes,
R.,Huang,P.-Y.,Li,S.-W.,Misra,I.,Rabbat,M.,Sharma, Wang,Z.,Bovik,A.,Sheikh,H.,andSimoncelli,E. Image
V.,Synnaeve,G.,Xu,H.,Jegou,H.,Mairal,J.,Labatut, quality assessment: from error visibility to structural
| P., Joulin, | A., and | Bojanowski, |     | P. Dinov2: | Learning |     |             |                                      |     |     |     |     |
| ----------- | ------- | ----------- | --- | ---------- | -------- | --- | ----------- | ------------------------------------ | --- | --- | --- | --- |
|             |         |             |     |            |          |     | similarity. | IEEETransactionsonImageProcessing,13 |     |     |     |     |
robustvisualfeatureswithoutsupervision,2024. URL (4):600–612,2004. doi: 10.1109/TIP.2003.819861.
https://arxiv.org/abs/2304.07193.
|     |     |     |     |     |     |     | Watter, M., | Springenberg, |     | J. T., Boedecker, |     | J., and Ried- |
| --- | --- | --- | --- | --- | --- | --- | ----------- | ------------- | --- | ----------------- | --- | ------------- |
Pathak, D., Mahmoudieh, P., Luo, G., Agrawal, P., Chen, miller, M. Embed to control: A locally linear latent
| D., Shentu, | Y., | Shelhamer, | E., Malik, | J., | Efros, | A. A., |     |     |     |     |     |     |
| ----------- | --- | ---------- | ---------- | --- | ------ | ------ | --- | --- | --- | --- | --- | --- |
dynamicsmodelforcontrolfromrawimages,2015.URL
andDarrell,T. Zero-shotvisualimitation,2018. URL https://arxiv.org/abs/1506.07365.
https://arxiv.org/abs/1804.08606.
Wen,C.,Lin,X.,So,J.,Chen,K.,Dou,Q.,Gao,Y.,and
Razavi,A.,vandenOord,A.,andVinyals,O. Generating Abbeel,P.Any-pointtrajectorymodelingforpolicylearn-
| diversehigh-fidelityimageswithvq-vae-2,2019. |     |     |     |     |     | URL |           |                                |     |     |     |     |
| -------------------------------------------- | --- | --- | --- | --- | --- | --- | --------- | ------------------------------ | --- | --- | --- | --- |
|                                              |     |     |     |     |     |     | ing,2024. | URLhttps://arxiv.org/abs/2401. |     |     |     |     |
https://arxiv.org/abs/1906.00446.
00025.
| Reed, S., | Zolna, | K., Parisotto, | E., | Colmenarejo, |     | S. G., |     |     |     |     |     |     |
| --------- | ------ | -------------- | --- | ------------ | --- | ------ | --- | --- | --- | --- | --- | --- |
Williams,G.,Wagener,N.,Goldfain,B.,Drews,P.,Rehg,
Novikov, A., Barth-Maron, G., Gimenez, M., Sulsky, J. M., Boots, B., and Theodorou, E. A. Information
| Y., Kay, | J., Springenberg, |     | J. T., | Eccles, | T., Bruce, | J., |           |         |             |               |     |           |
| -------- | ----------------- | --- | ------ | ------- | ---------- | --- | --------- | ------- | ----------- | ------------- | --- | --------- |
|          |                   |     |        |         |            |     | theoretic | mpc for | model-based | reinforcement |     | learning. |
Razavi,A.,Edwards,A.,Heess,N.,Chen,Y.,Hadsell,
In2017IEEEinternationalconferenceonroboticsand
R.,Vinyals,O.,Bordbar,M.,anddeFreitas,N. Agener- automation(ICRA),pp.1714–1721.IEEE,2017.
| alistagent,2022. |     | URLhttps://arxiv.org/abs/ |     |     |     |     |     |     |     |     |     |     |
| ---------------- | --- | ------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
2205.06175. Wu, Y., Yan, W., Kurutach, T., Pinto, L., and Abbeel,
|         |                |     |         |         |            |     | P. Learning          | to manipulate |     | deformable            | objects | without |
| ------- | -------------- | --- | ------- | ------- | ---------- | --- | -------------------- | ------------- | --- | --------------------- | ------- | ------- |
| Robine, | J., Ho¨ftmann, | M., | Uelwer, | T., and | Harmeling, | S.  |                      |               |     |                       |         |         |
|         |                |     |         |         |            |     | demonstrations,2020. |               |     | URLhttps://arxiv.org/ |         |         |
Transformer-basedworldmodelsarehappywith100kin- abs/1910.13439.
| teractions,2023. |     | URLhttps://arxiv.org/abs/ |     |     |     |     |     |     |     |     |     |     |
| ---------------- | --- | ------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
2303.07109. Xiao,T.,Radosavovic,I.,Darrell,T.,andMalik,J. Masked
visualpre-trainingformotorcontrol,2022.URLhttps:
Russakovsky,O.,Deng,J.,Su,H.,Krause,J.,Satheesh,S.,
//arxiv.org/abs/2203.06173.
Ma,S.,Huang,Z.,Karpathy,A.,Khosla,A.,Bernstein,
M., Berg, A. C., and Fei-Fei, L. Imagenet large scale Yan,W.,Vangipuram,A.,Abbeel,P.,andPinto,L.Learning
visual recognition challenge, 2015. URL https:// predictiverepresentationsfordeformableobjectsusing
| arxiv.org/abs/1409.0575. |     |     |     |     |     |     |     |     | InConferenceonRobotLearning, |     |     |     |
| ------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | ---------------------------- | --- | --- | --- |
contrastiveestimation.
pp.564–574.PMLR,2021.
Sekar,R.,Rybkin,O.,Daniilidis,K.,Abbeel,P.,Hafner,D.,
andPathak,D. Planningtoexploreviaself-supervised Yang,M.,Du,Y.,Ghasemipour,K.,Tompson,J.,Schuur-
world models, 2020. URL https://arxiv.org/ mans,D.,andAbbeel,P. Learninginteractivereal-world
| abs/2005.05960. |     |     |     |     |     |     | simulators,2023. |     |     |     |     |     |
| --------------- | --- | --- | --- | --- | --- | --- | ---------------- | --- | --- | --- | --- | --- |
12

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
| Zhang, | K., Li, | B., Hauser, | K., | and | Li, Y. | Adapti- |
| ------ | ------- | ----------- | --- | --- | ------ | ------- |
graph: Material-adaptivegraph-basedneuraldynamics
forroboticmanipulation,2024.URLhttps://arxiv.
org/abs/2407.07889.
Zhang,R.,Isola,P.,Efros,A.A.,Shechtman,E.,andWang,
O. Theunreasonableeffectivenessofdeepfeaturesasa
| perceptualmetric. |     | CoRR,abs/1801.03924,2018. |     |     |     | URL |
| ----------------- | --- | ------------------------- | --- | --- | --- | --- |
http://arxiv.org/abs/1801.03924.
| Zhao, T.         | Z., Kumar, | V., Levine,               |              | S., and | Finn, C. | Learn-   |
| ---------------- | ---------- | ------------------------- | ------------ | ------- | -------- | -------- |
| ing fine-grained |            | bimanual                  | manipulation |         | with     | low-cost |
| hardware,2023.   |            | URLhttps://arxiv.org/abs/ |              |         |          |          |
2304.13705.
Zhou,G.,Dean,V.,Srirama,M.K.,Rajeswaran,A.,Pari,
J.,Hatch,K.,Jain,A.,Yu,T.,Abbeel,P.,Pinto,L.,Finn,
| C.,andGupta,A. |            | Trainoffline,testonline: |     |                | Arealrobot |     |
| -------------- | ---------- | ------------------------ | --- | -------------- | ---------- | --- |
| learning       | benchmark, | 2023.                    | URL | https://arxiv. |            |     |
org/abs/2306.00942.
13

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
A.Appendix
A.1.EnvironmentsandDatasetGeneration
a) PointMaze: Inthisenvironmentintroducedby(Fuetal.,2021),thetaskisforaforce-actuated2-DoFballinthe
Cartesian directions x and y to reach a target goal. The agent’s dynamics incorporate physical properties such as
velocity,acceleration,andinertia,makingthemovementrealistic. Wegenerate2000fullyrandomtrajectoriestotrain
ourworldmodels. WerefertothistaskasMazeforbrevityinourtables.
b) Wall: Thiscustom2Dnavigationenvironmentfeaturestworoomsseparatedbyawallwithadoor. Theagent’staskis
tonavigatefromarandomizedstartinglocationinoneroomtoagoalintheother,passingthroughthedoor. Wepresent
avariantwherewallanddoorpositionsarerandomized,testingthemodel’sgeneralizationtonovelconfigurations. For
thefixedwallsetting,wetrainonafullyrandomdatasetof1920trajectorieseachwith50timesteps. Forthevariant
withmultipletrainingenvironmentconfigurations,wegenerate10240randomtrajectories.
c) Reacher: AcontinuouscontroltaskfromDeepMindControlSuite(Tassaetal.,2018),wherea2-jointroboticarm
reachesatargetin2Dspace. Weincreasedifficultybyrequiringtheentirearm,notjusttheend-effector,tomatch
arbitrarytargetposes. Totraintheworldmodel,wegenerate3000trajectorieswith100steps. Werefertothistaskas
Reachforbrevityinourtables.
d) Push-T: Thisenvironmentintroducedby(Chietal.,2024)featuresapusheragentinteractingwithaT-shapedblock.
The goal is to guide both the agent and the T-block from a randomly initialized state to a known feasible target
configurationwithin25steps. ThetaskrequiresboththeagentandtheTtomatchthetargetlocations. Unlikeprevious
setups,thefixedgreenTnolongerrepresentsthetargetpositionfortheT-blockbutservespurelyasavisualanchor
forreference. Successrequirespreciseunderstandingofthecontact-richdynamicsbetweentheagentandtheobject,
makingitachallengingtestforvisuomotorcontrolandobjectmanipulation. Wegenerateadatasetof18500samples
replayedtheoriginalreleasedexperttrajectorieswithvariouslevelofnoise. Additionally,weintroducevariationsby
alteringtheshapeandcoloroftheobjecttoassessthemodel’scapabilitytoadapttonoveltasks. Forthisvariant,we
generate20000randomlysampledtrajectorieswith100steps.
e) RopeManipulation: Introducedin(Zhangetal.,2024),thistaskissimulatedwithNvidiaFlex(Zhangetal.,2024)
andconsistsofanXArminteractingwithasoftropeplacedonatabletop. Theobjectiveistomovetheropefroman
arbitrarystartingconfigurationtoagoalconfigurationspecifiedattesttime. Fortraining,wegeneratearandomdataset
of1000trajectoriesof20timestepsofrandomactionsfromrandomstartingpositions,whiletestinginvolvesgoal
configurationssetfromvariedinitialpositions,incorporatingrandomvariationsinorientationandspatialdisplacement.
f) Granular Manipulation: This environment uses the same simulation setup as Rope Manipulation and involves
manipulatingaboutahundredparticlestoformdesiredshapes. Thetrainingdataconsistsof1000trajectoriesof20
timestepsofrandomactionsstartingfromthesameinitialconfiguration,whiletestingisperformedonspecificgoal
shapesfromdiversestartingpositions,alongwithrandomvariationsinparticledistribution,spacing,andorientation.
A.2.EnvironmentFamiliesforTestingGeneralization
1. WallRandom: BasedontheWallenvironment,butwithrandomizedwallanddoorpositions. Attesttime,thetask
requiresnavigatingfromarandomstartingpositionononesideofthewalltoarandompositionontheotherside,with
non-overlappingwallanddoorpositionsseenduringtraining.
2. PushObj: DerivedfromthePush-Tenvironment,whereweintroducenovelblockshapes,includingTetris-likeblocks
anda”+”shape. Wetrainthemodelwithfourshapesandevaluateontwounseenshapes. Thetaskinvolvesboththe
agentandobjectreachingtargetlocations.
3. GranularRandom: DerivedfromtheGranularenvironment,whereweinitializethescenewithadifferentamountof
particles. Thetaskrequirestherobottogatherallparticlestoasquareshapeatarandomlysampledlocation. Forthis
task,wedirectlytakethemodelsthataretrainedwithafixedamountofmaterialsusedinSection4.3.
VisualizationscanbefoundinFigure5.
14

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
A.3.PretrainingFeatures
a) R3M: AResNet-18modelpre-trainedonawiderangeofreal-worldhumanmanipulationvideos(Nairetal.,2022).
b) ImageNet: AResNet-18modelpre-trainedontheImageNet-1Kdataset(Russakovskyetal.,2015).
c) DINOCLS: Thepre-trainedDINOv2modelprovidestwotypesofembeddings: PatchandCLS.TheCLSembedding
isa1-dimensionalvectorthatencapsulatestheglobalinformationofanimage.
d) Pre-trainedMAE: AViTmodeltrainedusingMaskedAutoencoding(Heetal.,2021),wherealargeportionofinput
imagepatchesaremaskedandthemodellearnstoreconstructthem. WeuseaViT-Basecheckpoint,whichhasafeature
dimensionof768andapproximately86millionparameters.
A.4.Ablations
A.4.1.DINO-WMWITHVS. WITHOUTCAUSALATTENTIONMASK
WeintroduceacausalattentionmaskinSection3.1.2. WeablatethischoiceonPushTbytrainingDINO-WMwithand
withoutthiscausalattentionmaskwithvaryinghistorylengthh,suchthatthemodeltakesininputo ,o ,...o ,
t−h+1 t−h+2 t
andoutputo ,...o . Formodelswithmask,themodelcanonlyattendtopastobservationsforpredictingeacho ,
t−h+2 t+1 t
whereasinthew/omaskcase,predictinganyobservationintheoutputsequencecanattendtotheentireinputsequence
ofobservations. WeshowplanningsuccessrateonourPushTsettingsinTable8. Whenh = 1wherethemodelwith
andwithoutthiscausalmaskisequivalent,bothmodelsgetdecentandequivalentsuccessrate. However,asweincrease
thehistorylength, weseearapiddropinthew/omask case, sincethemodelcancheatduringtrainingbyattendingto
futureframes,whichisnotavailableattesttime. Addingthecausalmasksolvesthisissue,andweobserveimprovementin
performanceaslongerhistorycouldbettercapturedynamicsinformationlikevelocity,acceleration,andobjectmomentum.
Table8.ComparisonofDINO-WMwithandwithoutcausalattentionmaskonPushT.Wetrainmodelswithvaryinghistoryh,representing
thenumberofpastobservationsthemodeltakesasinput.
h=1 h=2 h=3
w/omask 0.76 0.36 0.08
withmask 0.76 0.88 0.92
A.4.2.DINO-WMWITHRECONSTRUCTIONLOSS
WhileDINO-WMeliminatestheneedtotrainworldmodelswithapixelreconstructionloss—avoidingtheriskoflearning
featuresirrelevanttodownstreamtasks—weconductanablationstudywherethepredictoristrainedusingareconstruction
losspropagatedfromthedecoder. AsshowninTable9,thisapproachperformsreasonablywellonthePushTtaskbutfalls
slightlyshortofourmethod,wherethepredictoristrainedentirelyindependentlyofthedecoder. Thisunderscoresthe
advantageofdisentanglingfeaturelearningfromreconstructionobjectives.
Table9.ComparisonofDINO-WMtrainedwithandwithoutlossfromthedecoderonPushT,highlightingtheadvantageofdisentangling
featurelearningfromreconstructionobjectives.
SuccessRate
w/odecoderloss 0.92
withdecoderloss 0.80
A.5.PlanningOptimization
Inthissection,wedetailtheoptimizationproceduresforplanninginourexperiments.
15

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
A.5.1.MODELPREDICTIVECONTROLWITHCROSS-ENTROPYMETHOD
a) Giventhecurrentobservationo 0 andthegoalobservationo g ,bothrepresentedasRGBimages,theobservationsare
firstencodedintolatentstates:
|     |     | zˆ =enc(o | ),  | z =enc(o | ).  |     | (3) |
| --- | --- | --------- | --- | -------- | --- | --- | --- |
|     |     | 0         | 0   | g        | g   |     |     |
b) The planning objective is defined as the mean squared error (MSE) between the predicted latent state at the final
timestepT andthegoallatentstate:
∥2,
C =∥zˆ T −z g where zˆ t =p(zˆ t−1 ,a t−1 ), zˆ 0 =enc(o 0 ). (4)
c) Ateachplanningiteration,CEMsamplesapopulationofN actionsequences,eachoflengthT,fromadistribution.
TheinitialdistributionissettobeGaussian.
d) Foreachsampledactionsequence{a ,a ,...,a },theworldmodelisusedtopredicttheresultingtrajectoryinthe
0 1 T−1
latentspace:
|     |     | zˆ =p(zˆ | ,a  | ), t=1,...,T. |     |     | (5) |
| --- | --- | -------- | --- | ------------- | --- | --- | --- |
|     |     | t t−1    | t−1 |               |     |     |     |
AndthecostC iscalculatedforeachtrajectory.
e) ThetopK actionsequenceswiththelowestcostareselected,andthemeanandcovarianceofthedistributionare
updatedaccordingly.
f) AnewsetofN actionsequencesissampledfromtheupdateddistribution,andtheprocessrepeatsuntilsuccessis
achievedorafterafixednumberofiterationsthatwesetashyperparameter.
g) Aftertheoptimizationprocessisdone,thefirstkactionsa ,...a isexecutedintheenvironment. Theprocessthen
|     |     |     |     | 0 k |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- |
repeatsatthenexttimestepwiththenewobservation.
A.5.2.GRADIENTDESCENT:
Sinceourworldmodelisdifferentiable,wealsoconsideranoptimizationapproachusingGradientDescent(GD)which
directlyminimizesthecostbyoptimizingtheactionsthroughbackpropagation.
| Wefirstencodethecurrentobservationo |     | andgoalobservationo |     |                     |     |     |     |
| ----------------------------------- | --- | ------------------- | --- | ------------------- | --- | --- | --- |
| a)                                  |     | 0                   |     | g intolatentspaces: |     |     |     |
|                                     |     | zˆ =enc(o           | ),  | z =enc(o            | ).  |     | (6) |
|                                     |     | 0                   | 0   | g                   | g   |     |     |
b) TheobjectiveremainsthesameasforCEM:
|     | C =∥zˆ | −z ∥2,  | zˆ =p(zˆ | ,a  | ), zˆ =enc(o | ).  |     |
| --- | ------ | ------- | -------- | --- | ------------ | --- | --- |
|     | T      | g where | t        | t−1 | t−1 0        | 0   | (7) |
c) Using the gradients of the cost with respect to the action sequence {a 0 ,a 1 ,...,a T−1 }, the actions are updated
iteratively:
∂C
|     |     | a ←a −η | ,   | t=0,...,T | −1, |     |     |
| --- | --- | ------- | --- | --------- | --- | --- | --- |
|     |     | t t     |     |           |     |     | (8) |
∂a
t
whereηisthelearningrate
d) Theprocessrepeatsuntilafixednumberofiteractionsisreached,andweexecutethefirstkactionsa ,...,a inthe
0 k
enviornment,wherekisapre-determinedhyperparameter.
A.5.3.PLANNINGRESULTS
HerewepresentthefullplanningperformanceusingvariousplanningoptimizationmethodsinTable10. CEMdenotesthe
settingwhereweuseCEMtooptimizeasequenceofactions,andexecutethoseactionsintheenvironmentwithoutany
correctionorreplan. Similarly,GDdenotesoptimizingwithgradientdecentandexecuteallplannedactionsatonceinan
open-loopway. MPCdenotesallowingreplanandrecedinghorizonwithCEMforoptimization.
16

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
Table10. PlanningresultsofDINO-WMwithvariousplanningoptimizationmethods.
PointMaze Push-T Wall Rope Granular
CEM 0.8 0.86 0.74 NA NA
GD 0.22 0.28 NA NA NA
MPC 0.98 0.90 0.96 0.41 0.26
A.6.InferenceTime
Inferencetimeisacriticalfactorwhendeployingamodelforreal-timedecision-making. Table11reportsthetimerequired
onanNVIDIAA6000GPUforasingleinferencestep,theenvironmentrollouttimeforadvancingonestepinthesimulator,
andtheoverallplanningtimeforgeneratinganoptimalactionsequenceusingtheCross-EntropyMethod(CEM).The
inferencetimeofDINO-WMremainsconstantacrossenvironmentsduetothefixedmodelsizeandinputimageresolution,
resultinginsignificantspeedupovertraditionalsimulationrollouts. Notably,inenvironmentswithhighcomputational
demands,suchasdeformableobjectmanipulation,simulationrolloutsrequireseveralsecondsperstepwhileDINO-WM
enablesrapidinferenceandefficientplanning. PlanningtimeismeasuredwithCEMusing100samplesperiterationand10
optimizationsteps,demonstratingthatDINO-WMcanachievefeasibleplanningtimeswhilemaintainingaccuracyand
adaptabilityacrosstasks.
Table11.InferencetimeandplanningtimeforDINO-WM.Inferencetimerepresentsthetimerequiredforasingleforwardpassforone
step,whileenvironmentrollouttimemeasuresthesimulator’sspeedforadvancingonestep.PlanningtimecorrespondstoCross-Entropy
Method(CEM)with100samplesperiterationand10optimizationsteps.
Metric Time(s)
Inference(Batch32) 0.014
SimulationRollout(Batch1) 3.0
Planning(CEM,100x10) 15.89
A.7.HyperparametersandImplementation
WepresenttheDINO-WMhyperparametersandrelevantimplementationreposbelow. Wetraintheworldmodelsforall
environmentswiththesamehyperparametersshowninTable13.
Theworldmodelarchitectureisconsistentacrossallenvironments. WeuseanencoderbasedonDINOv2,whichextracts
featureswithashapeof(14×14,384)frominputimagesresizedto196×196pixels. TheViTbackbonehasadepthof6,
16attentionheads,andanMLPdimensionof2048,amountingtoapproximately19Mparameters.
Toensurethepredictiontaskismeaningful,asnearbyobservationscanbehighlysimilar,weintroduceaframeskipparameter
duringdataprocessing. Thisparameterspecifieshowfarintothefuturethemodelispredicting. Theframeskipvaluesfor
eachenvironmentareprovidedinTable12.
• DINOv2: https://github.com/facebookresearch/dinov2
• DreamerV3: https://github.com/NM512/dreamerv3-torch
• AVDC:https://github.com/flow-diffusion/AVDC
• R3M:https://github.com/facebookresearch/r3m/
Webaseourpredictorimplementationonhttps://github.com/lucidrains/vit-pytorch/.
A.8.AdditionalPlanningVisualizations
WeshowvisualizationsofplanninginstancesforDINO-WMandourbaselinesinFigure8. Forcomparison,weshowthe
bestperformingworldmodelsDINOCLSandDreamerV3. WealsoshowvisualizationsofDINO-WMonalltasksin
17

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
Table12.Environment-dependenthyperparametersforDINO-
| WM training. | We report | the number of trajectories | in the |     |     |
| ------------ | --------- | -------------------------- | ------ | --- | --- |
Table13.SharedhyperparametersforDINO-WMtraining
datasetunderDatasetSize,andthelengthoftrajectoriesunder
|     |     |     |     | Name | Value |
| --- | --- | --- | --- | ---- | ----- |
Traj.Len.
|            | H Frameskip | DatasetSize | Traj. Len. | Imagesize       | 224   |
| ---------- | ----------- | ----------- | ---------- | --------------- | ----- |
|            |             |             |            | Optimizer       | AdamW |
| PointMaze  | 3           | 5 2000      | 100        |                 |       |
|            |             |             |            | Decoderlr       | 3e-4  |
| Reacher    | 3           | 5 3000      | 100        |                 |       |
|            |             |             |            | Predictorlr     | 5e-5  |
| Push-T     | 3           | 5 18500     | 100-300    |                 |       |
|            |             |             |            | Actionencoderlr | 5e-4  |
| PushObj    | 3           | 5 20000     | 100        |                 |       |
|            |             |             |            | Actionembdim    | 10    |
| Wall       | 1           | 5 1920      | 50         |                 |       |
|            |             |             |            | Epochs          | 100   |
| WallRandom | 1           | 5 10240     | 50         |                 |       |
|            |             |             |            | Batchsize       | 32    |
| Rope       | 1           | 1 1000      | 5          |                 |       |
| Granular   | 1           | 1 1000      | 5          |                 |       |
Figure8.PlanningvisualizationsforPointMaze,Push-T,andGranular,onrandomlysampledinitialandgoalconfigurations.Thetaskis
definedbyStartandGoal,denotingtheinitialandgoalobservations.Finalshowsthefinalstatethesystemarrivesatafterplanningwith
eachworldmodel.Forcomparison,weshowthebestperformingworldmodelsDINOCLSandDreamerV3.
Figure9. Foreachenvironment,thetop(shaded)rowshowstheenvironment’sobservationafterexecutingtheplanned
actions,andthebottomrowshowstheworldmodel’simaginedobservations.
Todemonstrate DINO-WM’sabilitytogeneralizetodifferentgoalsattesttime,weshowadditionalvisualizationsfor
DINO-WMwhenprovidedwiththesameinitialobservationbutdifferentgoalobservationsinFigure10andFigure11.
Similarly,weshowtrajectorypairstocomparetheenvironment’sobservations(topshadedrows)afterexecutingasequence
of planned actions with DINO-WM’s imagined trajectories (bottom rows). The left-most column denotes the initial
observations,andtheright-mostshadedcolumndenotesthegoalobservations.
18

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
Figure9.Trajectories planned with DINO-WM on all six environments. For each environment, the top (shaded) row shows the
environment’sobservationafterexecutingtheplannedactions,andthebottomrowshowstheworldmodel’simaginedobservations.
19

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
Figure10. TrajectoriesplannedwithDINO-WMonPushTwiththesameinitialstatesbutdifferentgoalstates.
20

DINO-WM:WorldModelsonPre-trainedVisualFeaturesenableZero-shotPlanning
Figure11. TrajectoriesplannedwithDINO-WMonPointMazewiththesameinitialstatesbutdifferentgoalstates.
21
