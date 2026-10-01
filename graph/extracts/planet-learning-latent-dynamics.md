|     |     | Learning |                 |     | Latent            | Dynamics    | for Planning   |     | from            | Pixels |     |
| --- | --- | -------- | --------------- | --- | ----------------- | ----------- | -------------- | --- | --------------- | ------ | --- |
|     |     |          | DanijarHafner12 |     | TimothyLillicrap3 |             | IanFischer4    |     | RubenVillegas15 |        |     |
|     |     |          |                 |     | DavidHa1          | HonglakLee1 | JamesDavidson1 |     |                 |        |     |
Abstract enough for planning has been a long-standing challenge.
Keydifficultiesincludemodelinaccuracies,accumulating
| Planning |     | has been | very | successful | for | control |     |     |     |     |     |
| -------- | --- | -------- | ---- | ---------- | --- | ------- | --- | --- | --- | --- | --- |
tasks with known environment dynamics. To errorsofmulti-steppredictions,failuretocapturemultiple
9102 nuJ 4  ]GL.sc[  5v15540.1181:viXra
possiblefutures,andoverconfidentpredictionsoutsideof
| leverage |     | planning | in  | unknown | environments, |     |     |     |     |     |     |
| -------- | --- | -------- | --- | ------- | ------------- | --- | --- | --- | --- | --- | --- |
thetrainingdistribution.
| the          | agent | needs | to learn   | the      | dynamics | from     |     |     |     |     |     |
| ------------ | ----- | ----- | ---------- | -------- | -------- | -------- | --- | --- | --- | --- | --- |
| interactions |       | with  | the world. | However, |          | learning |     |     |     |     |     |
Planningusinglearnedmodelsoffersseveralbenefitsover
dynamics models that are accurate enough for model-freereinforcementlearning. First,model-basedplan-
| planning |     | has been | a long-standing |     | challenge, |     |     |     |     |     |     |
| -------- | --- | -------- | --------------- | --- | ---------- | --- | --- | --- | --- | --- | --- |
ningcanbemoredataefficientbecauseitleveragesaricher
especiallyinimage-baseddomains. Wepropose training signal and does not require propagating rewards
| the         | Deep | Planning | Network | (PlaNet), |                 | a purely |                        |     |     |                             |     |
| ----------- | ---- | -------- | ------- | --------- | --------------- | -------- | ---------------------- | --- | --- | --------------------------- | --- |
|             |      |          |         |           |                 |          | throughBellmanbackups. |     |     | Moreover,planningcarriesthe |     |
| model-based |      | agent    | that    | learns    | the environment |          |                        |     |     |                             |     |
promiseofincreasingperformancejustbyincreasingthe
dynamics from images and chooses actions computationalbudgetforsearchingforactions,asshown
| throughfastonlineplanninginlatentspace. |     |     |     |     |     | To  |           |        |         |                           |        |
| --------------------------------------- | --- | --- | --- | --- | --- | --- | --------- | ------ | ------- | ------------------------- | ------ |
|                                         |     |     |     |     |     |     | by Silver | et al. | (2017). | Finally, learned dynamics | can be |
achievehighperformance, thedynamicsmodel independentofanyspecifictaskandthushavethepotential
| must | accurately |     | predict | the rewards | ahead | for |     |     |     |     |     |
| ---- | ---------- | --- | ------- | ----------- | ----- | --- | --- | --- | --- | --- | --- |
totransferwelltoothertasksintheenvironment.
| multiple | time | steps. | We  | approach | this | using a |     |     |     |     |     |
| -------- | ---- | ------ | --- | -------- | ---- | ------- | --- | --- | --- | --- | --- |
Recentworkhasshownpromiseinlearningthedynamicsof
| latent | dynamics |     | model | with both | deterministic |     |     |     |     |     |     |
| ------ | -------- | --- | ----- | --------- | ------------- | --- | --- | --- | --- | --- | --- |
andstochastictransitioncomponents. Moreover, simplelow-dimensionalenvironments(Deisenroth&Ras-
|     |         |              |     |             |           |     | mussen, | 2011; | Gal et al., | 2016; Amos et | al., 2018; Chua |
| --- | ------- | ------------ | --- | ----------- | --------- | --- | ------- | ----- | ----------- | ------------- | --------------- |
| we  | propose | a multi-step |     | variational | inference |     |         |       |             |               |                 |
etal.,2018;Henaffetal.,2018).However,theseapproaches
| objective |     | that we | name | latent | overshooting. |     |     |     |     |     |     |
| --------- | --- | ------- | ---- | ------ | ------------- | --- | --- | --- | --- | --- | --- |
Usingonlypixelobservations,ouragentsolves typicallyassumeaccesstotheunderlyingstateoftheworld
andtherewardfunction,whichmaynotbeavailableinprac-
continuouscontroltaskswithcontactdynamics,
tice. Inhigh-dimensionalenvironments,wewouldliketo
partialobservability,andsparserewards,which
exceedthedifficultyoftasksthatwerepreviously learnthedynamicsinacompactlatentspacetoenablefast
|                                    |     |     |     |     |     |        | planning. | Thesuccessofsuchlatentmodelshaspreviously |     |     |     |
| ---------------------------------- | --- | --- | --- | --- | --- | ------ | --------- | ----------------------------------------- | --- | --- | --- |
| solvedbyplanningwithlearnedmodels. |     |     |     |     |     | PlaNet |           |                                           |     |     |     |
usessubstantiallyfewerepisodesandreachesfinal beenlimitedtosimpletaskssuchasbalancingcartpolesand
controlling2-linkarmsfromdenserewards(Watteretal.,
performanceclosetoandsometimeshigherthan
2015;Banijamalietal.,2017).
strongmodel-freealgorithms.
|     |     |     |     |     |     |     | In this | paper, | we propose | the Deep Planning | Network |
| --- | --- | --- | --- | --- | --- | --- | ------- | ------ | ---------- | ----------------- | ------- |
(PlaNet),amodel-basedagentthatlearnstheenvironment
1.Introduction
dynamicsfrompixelsandchoosesactionsthroughonline
|          |      |         |              |     |          |             | planninginacompactlatentspace. |     |     | Tolearnthedynamics, |     |
| -------- | ---- | ------- | ------------ | --- | -------- | ----------- | ------------------------------ | --- | --- | ------------------- | --- |
| Planning | is a | natural | and powerful |     | approach | to decision |                                |     |     |                     |     |
makingproblemswithknowndynamics,suchasgameplay- weuseatransitionmodelwithbothstochasticanddetermin-
|     |     |     |     |     |     |     | isticcomponents. |     | Moreover,weexperimentwithanovel |     |     |
| --- | --- | --- | --- | --- | --- | --- | ---------------- | --- | ------------------------------- | --- | --- |
ingandsimulatedrobotcontrol(Tassaetal.,2012;Silver
generalizedvariationalobjectivethatencouragesmulti-step
| et al., 2017; | Moravcˇík |     | et al., | 2017). | To plan | in unknown |     |     |     |     |     |
| ------------- | --------- | --- | ------- | ------ | ------- | ---------- | --- | --- | --- | --- | --- |
environments,theagentneedstolearnthedynamicsfrom predictions. PlaNet solves continuous control tasks from
pixelsthataremoredifficultthanthosepreviouslysolved
| experience. | Learning |     | dynamics | models | that | are accurate |     |     |     |     |     |
| ----------- | -------- | --- | -------- | ------ | ---- | ------------ | --- | --- | --- | --- | --- |
byplanningwithlearnedmodels.
| 1Google |       | 2University |     |            | 3DeepMind | 4Google |     |     |     |     |     |
| ------- | ----- | ----------- | --- | ---------- | --------- | ------- | --- | --- | --- | --- | --- |
|         | Brain |             |     | of Toronto |           |         |     |     |     |     |     |
Research5UniversityofMichigan. Keycontributionsofthisworkaresummarizedasfollows:
|     |     |     |     | Correspondenceto: |     | Danijar |     |     |     |     |     |
| --- | --- | --- | --- | ----------------- | --- | ------- | --- | --- | --- | --- | --- |
Hafner<mail@danijar.com>.
|             |     | 36th |               |     |            |            | • Planninginlatentspaces |     |     | Wesolveavarietyoftasks |     |
| ----------- | --- | ---- | ------------- | --- | ---------- | ---------- | ------------------------ | --- | --- | ---------------------- | --- |
| Proceedings | of  | the  | International |     | Conference | on Machine |                          |     |     |                        |     |
fromtheDeepMindcontrolsuite,showninFigure1,by
| Learning,LongBeach,California,PMLR97,2019. |     |     |     |     |     | Copyright |     |     |     |     |     |
| ------------------------------------------ | --- | --- | --- | --- | --- | --------- | --- | --- | --- | --- | --- |
learningadynamicsmodelandefficientlyplanningin
2019bytheauthor(s).

LearningLatentDynamicsforPlanningfromPixels
| (a)Cartpole |     | (b)Reacher |     | (c)Cheetah |     | (d)Finger |     | (e)Cup |     | (f)Walker |
| ----------- | --- | ---------- | --- | ---------- | --- | --------- | --- | ------ | --- | --------- |
Figure1: Image-basedcontroldomainsusedinourexperiments. Theimagesshowagentobservationsbeforedownscaling
to64×64×3pixels. (a)Thecartpoleswinguptaskhasafixedcamerasothecartcanmoveoutofsight. (b)Thereacher
taskhasonlyasparsereward. (c)Thecheetahrunningtaskincludesbothcontactsandalargernumberofjoints. (d)The
fingerspinningtaskincludescontactsbetweenthefingerandtheobject. (e)Thecuptaskhasasparserewardthatisonly
givenoncetheballiscaught. (f)Thewalkertaskrequiresbalanceandpredictingdifficultinteractionswiththegroundwhen
therobotislyingdown.
| itslatentspace. |     | Ouragentsubstantiallyoutperformsthe |     |     |     |     |     |     |     |     |
| --------------- | --- | ----------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
Algorithm1:DeepPlanningNetwork(PlaNet)
| model-freeA3CandinsomecasesD4PGalgorithmin |     |     |     |     |     | Input: |     |     |     |     |
| ------------------------------------------ | --- | --- | --- | --- | --- | ------ | --- | --- | --- | --- |
finalperformance,withonaverage200×lessenviron-
|                                           |     |     |     |     |     | R Actionrepeat |     | p(s |s   | ,a ) Transitionmodel |     |
| ----------------------------------------- | --- | --- | --- | --- | --- | -------------- | --- | -------- | -------------------- | --- |
| mentinteractionandsimilarcomputationtime. |     |     |     |     |     |                |     | t t−1    | t−1                  |     |
|                                           |     |     |     |     |     | S Seedepisodes |     | p(o |s ) | Observationmodel     |     |
|                                           |     |     |     |     |     |                |     | t t      |                      |     |
• Recurrentstatespacemodel Wedesignalatentdy- C Collectinterval p(r t |s t ) Rewardmodel
|              |      |      |               |     |            | B Batchsize |     | q(s |o      | ,a ) Encoder |     |
| ------------ | ---- | ---- | ------------- | --- | ---------- | ----------- | --- | ----------- | ------------ | --- |
| namics model | with | both | deterministic | and | stochastic |             |     | t ≤t        | <t           |     |
|              |      |      |               |     |            | L           |     | p((cid:15)) |              |     |
components(Buesingetal.,2018;Chungetal.,2015). Chunklength Explorationnoise
| Ourexperimentsindicatehavingbothcomponentstobe |     |     |     |     |     | α Learningrate |     |     |     |     |
| ---------------------------------------------- | --- | --- | --- | --- | --- | -------------- | --- | --- | --- | --- |
crucialforhighplanningperformance. InitializedatasetDwithS randomseedepisodes.
1
|                      |     |                              |     |     |     | 2 Initializemodelparametersθrandomly. |     |     |     |     |
| -------------------- | --- | ---------------------------- | --- | --- | --- | ------------------------------------- | --- | --- | --- | --- |
| • Latentovershooting |     | Wegeneralizethestandardvari- |     |     |     |                                       |     |     |     |     |
whilenotconvergeddo
| ationalboundtoincludemulti-steppredictions. |     |     |     |     | Using | 3   |     |     |     |     |
| ------------------------------------------- | --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- |
only terms in latent space results in a fast regularizer // Model fitting
thatcanimprovelong-termpredictionsandiscompati- 4 forupdatesteps=1..C do
blewithanylatentsequencemodel. Drawsequencechunks{(o ,a ,r )L+k}B ∼D
|     |     |     |     |     |     | 5   |     |     | t t | t t=k i=1 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --------- |
uniformlyatrandomfromthedataset.
ComputelossL(θ)fromEquation3.
| 2.LatentSpacePlanning |     |     |     |     |     | 6   |                        |     |       |       |
| --------------------- | --- | --- | --- | --- | --- | --- | ---------------------- | --- | ----- | ----- |
|                       |     |     |     |     |     |     | Updatemodelparametersθ |     | ←θ−α∇ | L(θ). |
|                       |     |     |     |     |     | 7   |                        |     |       | θ     |
Tosolveunknownenvironmentsviaplanning,weneedto
|                                            |     |     |     |     |        | //  | Data | collection |     |     |
| ------------------------------------------ | --- | --- | --- | --- | ------ | --- | ---- | ---------- | --- | --- |
| modeltheenvironmentdynamicsfromexperience. |     |     |     |     | PlaNet |     |      |            |     |     |
o ←env.reset()
|     |     |     |     |     |     | 8 1 |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
does so by iteratively collecting data using planning and (cid:6)T(cid:7)
|                                            |     |     |     |     |        | fo rtimestept=1.. |                                |     | do  |             |
| ------------------------------------------ | --- | --- | --- | --- | ------ | ----------------- | ------------------------------ | --- | --- | ----------- |
| trainingthedynamicsmodelonthegathereddata. |     |     |     |     | Inthis | 9                 |                                | R   |     |             |
|                                            |     |     |     |     |        |                   | Inferbeliefovercurrentstateq(s |     |     | |o ,a )from |
section,weintroducenotationfortheenvironmentandde- 10 t ≤t <t
thehistory.
scribethegeneralimplementationofourmodel-basedagent.
|     |     |     |     |     |     |     | a ←planner(q(s |     | |o ,a | ),p),see |
| --- | --- | --- | --- | --- | --- | --- | -------------- | --- | ----- | -------- |
In this section, we assume access to a learned dynamics 11 t t ≤t <t
Algorithm2intheappendixfordetails.
model. Ourdesignandtrainingobjectiveforthismodelare
Addexplorationnoise(cid:15)∼p((cid:15))totheaction.
| detailedinSection3. |     |     |     |     |     | 12  |                  |         |     |     |
| ------------------- | --- | --- | --- | --- | --- | --- | ---------------- | ------- | --- | --- |
|                     |     |     |     |     |     |     | foractionrepeatk | =1..Rdo |     |     |
13
rk,ok
|              |                                      |     |     |     |     | 14  |     | ←env.step(a     | t ) |     |
| ------------ | ------------------------------------ | --- | --- | --- | --- | --- | --- | --------------- | --- | --- |
| Problemsetup | Sinceindividualimageobservationsgen- |     |     |     |     |     | t   | t+1             |     |     |
|              |                                      |     |     |     |     |     |     | (cid:80)R rk,oR |     |     |
erally do not reveal the full state of the environment, we 15 r t ,o t+1 ← t t+1
k=1
|     |     |     |     |     |     | D ←D∪{(o |     | ,a ,r )T | }   |     |
| --- | --- | --- | --- | --- | --- | -------- | --- | -------- | --- | --- |
consider a partially observable Markov decision process 16 t t t t=1
(POMDP).Wedefineadiscretetimestept,hiddenstates
| s ,imageobservationso |                                    | ,continuousactionvectorsa |          |      | ,and       |                                  |                                |     |                     |         |
| --------------------- | ---------------------------------- | ------------------------- | -------- | ---- | ---------- | -------------------------------- | ------------------------------ | --- | ------------------- | ------- |
| t                     |                                    | t                         |          |      | t          |                                  |                                |     |                     |         |
| scalarrewardsr        | t ,thatfollowthestochasticdynamics |                           |          |      |            |                                  |                                |     |                     |         |
|                       |                                    |                           |          |      |            | whereweassumeafixedinitialstates |                                |     | 0 withoutlossofgen- |         |
| Transitionfunction:   |                                    |                           | s t ∼p(s | t |s | t−1 ,a t−1 | )                                |                                |     |                     |         |
|                       |                                    |                           |          |      |            | erality.                         | Thegoalistoimplementapolicyp(a |     |                     | |o ,a ) |
t ≤t <t
Observationfunction: o t ∼p(o t |s t ) (cid:2)(cid:80)T (cid:3)
|     |     |     |     |     |     | (1) thatmaximizestheexpectedsumofrewardsE |     |     |     | p r t , |
| --- | --- | --- | --- | --- | --- | ----------------------------------------- | --- | --- | --- | ------- |
t=1
Rewardfunction: r t ∼p(r t |s t ) wheretheexpectationisoverthedistributionsoftheenvi-
ronmentandthepolicy.
| Policy: |     |     | a t ∼p(a | t |o | ≤t ,a <t ), |     |     |     |     |     |
| ------- | --- | --- | -------- | ---- | ----------- | --- | --- | --- | --- | --- |
2

LearningLatentDynamicsforPlanningfromPixels
Model-basedplanning PlaNetlearnsatransitionmodel we found it sufficient to consider a single trajectory per
p(s |s ,a ),observationmodelp(o |s ),andreward actionsequenceandthusfocusthecomputationalbudgeton
| t t−1 | t−1 |     |     |     | t t |     |     |     |     |     |     |     |     |
| ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
model p(r t | s t ) from previously experienced episodes evaluatingalargernumberofdifferentsequences. Because
(noteitaliclettersforthemodelcomparedtouprightletters therewardismodeledasafunctionofthelatentstate,the
forthetruedynamics). Theobservationmodelprovidesa plannercanoperatepurelyinlatentspacewithoutgenerating
richtrainingsignalbutisnotusedforplanning. Wealso images, which allows for fast evaluation of large batches
learnanencoderq(s | o ,a )toinferanapproximate ofactionsequences. Thenextsectionintroducesthelatent
|     |     | t   | ≤t <t |     |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
beliefoverthecurrenthiddenstatefromthehistoryusing dynamicsmodelthattheplanneruses.
filtering. Giventhesecomponents,weimplementthepolicy
asaplanningalgorithmthatsearchesforthebestsequence
3.RecurrentStateSpaceModel
| offutureactions. |     | Weusemodel-predictivecontrol(MPC; |     |     |     |     |     |     |     |     |     |     |     |
| ---------------- | --- | --------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Richards,2005)toallowtheagenttoadaptitsplanbased Forplanning,weneedtoevaluatethousandsofactionse-
onnewobservations, meaningwereplanateachstep. In quencesateverytimestepoftheagent. Therefore,weuse
contrasttomodel-freeandhybridreinforcementlearning arecurrentstate-spacemodel(RSSM)thatcanpredictfor-
algorithms,wedonotuseapolicyorvaluenetwork. ward purely in latent space, similar to recently proposed
models(Karletal.,2016;Buesingetal.,2018;Doerretal.,
2018).Thismodelcanbethoughtofasanon-linearKalman
| Experiencecollection |     |     | Sincetheagentmaynotinitially |     |     |     |     |     |     |     |     |     |     |
| -------------------- | --- | --- | ---------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
filterorsequentialVAE.Insteadofanextensivecomparison
| visit all                                      | parts of | the environment, |     | we need | to iteratively |     |                                     |                |     |           |     |                |          |
| ---------------------------------------------- | -------- | ---------------- | --- | ------- | -------------- | --- | ----------------------------------- | -------------- | --- | --------- | --- | -------------- | -------- |
|                                                |          |                  |     |         |                |     | to prior                            | architectures, | we  | highlight | two | findings       | that can |
| collectnewexperienceandrefinethedynamicsmodel. |          |                  |     |         |                | We  |                                     |                |     |           |     |                |          |
|                                                |          |                  |     |         |                |     | guidefuturedesignsofdynamicsmodels: |                |     |           |     | ourexperiments |          |
dosobyplanningwiththepartiallytrainedmodel,asshown
|              |     |          |      |                |     |        | show that                                       | both | stochastic | and | deterministic |     | paths in the |
| ------------ | --- | -------- | ---- | -------------- | --- | ------ | ----------------------------------------------- | ---- | ---------- | --- | ------------- | --- | ------------ |
| in Algorithm | 1.  | Starting | from | a small amount | of  | S seed |                                                 |      |            |     |               |     |              |
|              |     |          |      |                |     |        | transitionmodelarecrucialforsuccessfulplanning. |      |            |     |               |     | Inthis       |
episodescollectedunderrandomactions,wetrainthemodel
section,weremindthereaderoflatentstate-spacemodels
andaddoneadditionalepisodetothedataseteveryCupdate
andthendescribeourdynamicsmodel.
| steps. When                               | collecting |     | episodes | for the | data set, | we add |     |     |     |     |     |     |     |
| ----------------------------------------- | ---------- | --- | -------- | ------- | --------- | ------ | --- | --- | --- | --- | --- | --- | --- |
| smallGaussianexplorationnoisetotheaction. |            |     |          |         | Toreduce  |        |     |     |     |     |     |     |     |
}T
|                                                    |     |     |     |     |     |     | Latentdynamics                           |     | Weconsidersequences{o |     |     |     | t ,a t ,r t |
| -------------------------------------------------- | --- | --- | --- | --- | --- | --- | ---------------------------------------- | --- | --------------------- | --- | --- | --- | ----------- |
| theplanninghorizonandprovideaclearerlearningsignal |     |     |     |     |     |     |                                          |     |                       |     |     |     | t=1         |
|                                                    |     |     |     |     |     |     | withdiscretetimestept,imageobservationso |     |                       |     |     |     | ,continuous |
| tothemodel,werepeateachactionRtimes,ascommonin     |     |     |     |     |     |     |                                          |     |                       |     |     |     | t           |
|                                                    |     |     |     |     |     |     |                                          |     | a                     |     | r   |     |             |
reinforcementlearning(Mnihetal.,2015;2016). action vectors t , and scalar rewards t . A typical latent
state-spacemodelisshowninFigure2bandresemblesthe
structureofapartiallyobservableMarkovdecisionprocess.
| Planning | algorithm | We  | use | the cross | entropy | method |     |     |     |     |     |     |     |
| -------- | --------- | --- | --- | --------- | ------- | ------ | --- | --- | --- | --- | --- | --- | --- |
Itdefinesthegenerativeprocessoftheimagesandrewards
(CEM;Rubinstein,1997;Chuaetal.,2018)tosearchfor usingahiddenstatesequence{s }T ,
t t=1
| the best                                           | action                               | sequence | under | the model, | as outlined | in  |                   |     |     |     |        |     |         |
| -------------------------------------------------- | ------------------------------------ | -------- | ----- | ---------- | ----------- | --- | ----------------- | --- | --- | --- | ------ | --- | ------- |
|                                                    |                                      |          |       |            |             |     | Transitionmodel:  |     |     |     | s ∼p(s | |s  | ,a )    |
| Algorithm2.                                        | Wedecidedonthisalgorithmbecauseofits |          |       |            |             |     |                   |     |     |     | t      | t   | t−1 t−1 |
|                                                    |                                      |          |       |            |             |     | Observationmodel: |     |     |     | o ∼p(o | |s  | )       |
| robustnessandbecauseitsolvedallconsideredtaskswhen |                                      |          |       |            |             |     |                   |     |     |     | t      | t   | t       |
(2)
giventhetruedynamicsforplanning. CEMisapopulation- Rewardmodel: r ∼p(r |s ),
|     |     |     |     |     |     |     |     |     |     |     | t   | t   | t   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
basedoptimizationalgorithmthatinfersadistributionover where we assume a fixed initial state s without loss of
0
actionsequencesthatmaximizetheobjective.Asdetailedin
|     |     |     |     |     |     |     | generality. | ThetransitionmodelisGaussianwithmeanand |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --------------------------------------- | --- | --- | --- | --- | --- |
Algorithm2intheappendix,weinitializeatime-dependent
varianceparameterizedbyafeed-forwardneuralnetwork,
| diagonal | Gaussian | belief | over | optimal | action sequences |     |     |     |     |     |     |     |     |
| -------- | -------- | ------ | ---- | ------- | ---------------- | --- | --- | --- | --- | --- | --- | --- | --- |
theobservationmodelisGaussianwithmeanparameterized
| a ∼Normal(µ |     |     | ,σ2 | I),wheretisthecurrent |     |     |     |     |     |     |     |     |     |
| ----------- | --- | --- | --- | --------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
t:t+H t:t+H t:t+H byadeconvolutionalneuralnetworkandidentitycovariance,
timestepoftheagentandH isthelengthoftheplanning andtherewardmodelisascalarGaussianwithmeanparam-
| horizon. | Starting | from | zero mean | and | unit variance, | we  |     |     |     |     |     |     |     |
| -------- | -------- | ---- | --------- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- | --- |
eterizedbyafeed-forwardneuralnetworkandunitvariance.
| repeatedlysampleJ |     | candidateactionsequences,evaluate |     |     |     |     |     |     |     |     |     |     |     |
| ----------------- | --- | --------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Notethatthelog-likelihoodunderaGaussiandistribution
| them under       | the | model, | and re-fit                      | the belief | to the | top K |           |          |        |          |         |     |               |
| ---------------- | --- | ------ | ------------------------------- | ---------- | ------ | ----- | --------- | -------- | ------ | -------- | ------- | --- | ------------- |
|                  |     |        |                                 |            |        |       | with unit | variance | equals | the mean | squared |     | error up to a |
| actionsequences. |     | AfterI | iterations,theplannerreturnsthe |            |        |       |           |          |        |          |         |     |               |
constant.
meanofthebeliefforthecurrenttimestep,µ
|     |     |     |     |     | t . Importantly, |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | ---------------- | --- | --- | --- | --- | --- | --- | --- | --- |
afterreceivingthenextobservation,thebeliefoveraction
|     |     |     |     |     |     |     | Variational | encoder | Since | the | model | is non-linear, | we  |
| --- | --- | --- | --- | --- | --- | --- | ----------- | ------- | ----- | --- | ----- | -------------- | --- |
sequencesstartsfromzeromeanandunitvarianceagainto
cannotdirectlycomputethestateposteriorsthatareneeded
avoidlocaloptima.
|     |     |     |     |     |     |     | forparameterlearning. |     | Instead,weuseanencoderq(s |     |     |     | 1:T | |
| --- | --- | --- | --- | --- | --- | --- | --------------------- | --- | ------------------------- | --- | --- | --- | ----- |
Toevaluateacandidateactionsequenceunderthelearned o ,a ) = (cid:81)T q(s | s ,a ,o )toinferapprox-
|     |     |     |     |     |     |     | 1:T 1:T |     | t=1 t | t−1 | t−1 | t   |     |
| --- | --- | --- | --- | --- | --- | --- | ------- | --- | ----- | --- | --- | --- | --- |
model,wesampleastatetrajectorystartingfromthecurrent imatestateposteriorsfrompastobservationsandactions,
state belief, and sum the mean rewards predicted along where q(s | s ,a ,o ) is a diagonal Gaussian with
|     |     |     |     |     |     |     |     | t   | t−1 t−1 | t   |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ------- | --- | --- | --- | --- |
thesequence. Sinceweuseapopulation-basedoptimizer, meanandvarianceparameterizedbyaconvolutionalneural
3

LearningLatentDynamicsforPlanningfromPixels
|     |     |       |       |     |       |     |       |       |       |     | a1    | a2    |       |     |
| --- | --- | ----- | ----- | --- | ----- | --- | ----- | ----- | ----- | --- | ----- | ----- | ----- | --- |
|     |     | a1    |       | a2  |       |     | a1    |       | a2    |     | h1    | h2    | h3    |     |
|     |     | h1    |       | h2  | h3    |     | s1    |       | s2 s3 |     | s1    | s2    | s3    |     |
|     |     | o1,r1 | o2,r2 |     | o3,r3 |     | o1,r1 | o2,r2 | o3,r3 |     | o1,r1 | o2,r2 | o3,r3 |     |
(a)Deterministicmodel(RNN) (b)Stochasticmodel(SSM) (c)Recurrentstate-spacemodel(RSSM)
Figure2: Latentdynamicsmodeldesigns. Inthisexample,themodelobservesthefirsttwotimestepsandpredictsthe
third. Circlesrepresentstochasticvariablesandsquaresdeterministicvariables. Solidlinesdenotethegenerativeprocess
anddashedlinestheinferencemodel. (a)Transitionsinarecurrentneuralnetworkarepurelydeterministic. Thisprevents
themodelfromcapturingmultiplefuturesandmakesiteasyfortheplannertoexploitinaccuracies. (b)Transitionsina
state-spacemodelarepurelystochastic. Thismakesitdifficulttorememberinformationovermultipletimesteps. (c)We
splitthestateintostochasticanddeterministicparts,allowingthemodeltorobustlylearntopredictmultiplefutures.
networkfollowedbyafeed-forwardneuralnetwork.Weuse wenamerecurrentstate-spacemodel(RSSM),
thefilteringposteriorthatconditionsonpastobservations Deterministicstatemodel: h =f(h ,s ,a )
|                                                    |     |                |       |            |              |           |           |     |                       |         |      | t              | t−1 | t−1 t−1     |
| -------------------------------------------------- | --- | -------------- | ----- | ---------- | ------------ | --------- | --------- | --- | --------------------- | ------- | ---- | -------------- | --- | ----------- |
| since                                              | we  | are ultimately |       | interested | in           | using the | model     | for |                       |         |      |                |     |             |
|                                                    |     |                |       |            |              |           |           |     | Stochasticstatemodel: |         |      | s ∼p(s         | |h  | )           |
| planning,butonemayalsousethefullsmoothingposterior |     |                |       |            |              |           |           |     |                       |         |      | t              | t t | (4)         |
|                                                    |     |                |       |            |              |           |           |     | Observationmodel:     |         |      | o ∼p(o         | |h  | ,s )        |
| duringtraining(Babaeizadehetal.,2017;Gregor&Besse, |     |                |       |            |              |           |           |     |                       |         |      | t              | t t | t           |
| 2018).                                             |     |                |       |            |              |           |           |     | Rewardmodel:          |         |      | r ∼p(r         | |h  | ,s ),       |
|                                                    |     |                |       |            |              |           |           |     |                       |         |      | t              | t t | t           |
|                                                    |     |                |       |            |              |           |           |     | where f(h             | ,s      | ,a ) | is implemented | as  | a recurrent |
|                                                    |     |                |       |            |              |           |           |     |                       | t−1 t−1 | t−1  |                |     |             |
| Training                                           |     | objective      | Using |            | the encoder, | we        | construct | a   |                       |         |      |                |     |             |
neuralnetwork(RNN).Intuitively,wecanunderstandthis
| variationalboundonthedatalog-likelihood.          |        |        |     |          |     | Forsimplicity, |       |     |                                              |                                      |     |     |     |         |
| ------------------------------------------------- | ------ | ------ | --- | -------- | --- | -------------- | ----- | --- | -------------------------------------------- | ------------------------------------ | --- | --- | --- | ------- |
|                                                   |        |        |     |          |     |                |       |     | modelassplittingthestateintoastochasticparts |                                      |     |     |     | andade- |
| wewritelossesforpredictingonlytheobservations—the |        |        |     |          |     |                |       |     |                                              |                                      |     |     |     | t       |
|                                                   |        |        |     |          |     |                |       |     | terministicparth                             | ,whichdependonthestochasticanddeter- |     |     |     |         |
| reward                                            | losses | follow | by  | analogy. | The | variational    | bound |     |                                              | t                                    |     |     |     |         |
obtainedusingJensen’sinequalityis ministicpartsattheprevioustimestepthroughtheRNN.We
|     |       |     |             |                   |        |         |     |     | usetheencoderq(s |     | | o     | ,a ) = | (cid:81)T q(s | | h ,o ) |
| --- | ----- | --- | ----------- | ----------------- | ------ | ------- | --- | --- | ---------------- | --- | ------- | ------ | ------------- | -------- |
|     |       |     |             | (cid:90) (cid:89) |        |         |     |     |                  |     | 1:T 1:T | 1:T    | t=1           | t t t    |
|     | lnp(o | |a  | )(cid:44)ln |                   | p(s |s | ,a )p(o | |s  | )ds |                  |     |         |        |               |          |
1:T 1:T t t−1 t−1 t t 1:T to parameterize the approximate state posteriors. Impor-
|     | T        |          |     | t   |     |     |     |     | tantly, all | information | about | the observations |     | must pass |
| --- | -------- | -------- | --- | --- | --- | --- | --- | --- | ----------- | ----------- | ----- | ---------------- | --- | --------- |
|     | (cid:88) | (cid:16) |     |     |     |     |     |     |             |             |       |                  |     |           |
≥ E [lnp(o |s )] ←(cid:45) throughthesamplingstepoftheencodertoavoidadeter-
|     |     | q(st|o≤t,a<t) |     |     | t t |     |     |     |     |     |     |     |     |     |
| --- | --- | ------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
t=1 reconstruction (cid:3)(cid:17) (3) ministicshortcutfrominputstoreconstructions.
(cid:2)
|     | −E  | KL[q(s | t |o | ≤t ,a <t | )(cid:107)p(s t |s | t−1 ,a t−1 | )]  | .   |     |     |     |     |     |     |
| --- | --- | ------ | ---- | -------- | ------------------ | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
Inthenextsection,weidentifyalimitationofthestandard
q(st−1|o≤t−1,a<t−1)
complexity objectiveforlatentsequencemodelsandproposeageneral-
Forthederivation,pleaseseeEquation8intheappendix. izationofitthatimproveslong-termpredictions.
Estimatingtheouterexpectationsusingasinglereparam-
eterizedsampleyieldsanefficientobjectiveforinference
4.LatentOvershooting
andlearninginnon-linearlatentvariablemodelsthatcanbe
optimizedusinggradientascent(Kingma&Welling,2013; Intheprevioussection,wederivedthetypicalvariational
Rezendeetal.,2014;Krishnanetal.,2017). boundforlearningandinferenceinlatentsequencemodels
|     |     |     |     |     |     |     |     |     | (Equation3). | AsshowinFigure3a,thisobjectivefunction |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ------------ | -------------------------------------- | --- | --- | --- | --- |
Deterministic path Despite its generality, the purely containsreconstructiontermsfortheobservationsandKL-
stochastic transitions make it difficult for the transition divergenceregularizersfortheapproximateposteriors. A
modeltoreliablyrememberinformationformultipletime limitationofthisobjectiveisthatthestochasticpathofthe
steps. Intheory,thismodelcouldlearntosetthevariance transitionfunctionp(s |s ,a )isonlytrainedviathe
|     |     |     |     |     |     |     |     |     |     |     | t t−1 | t−1 |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- |
tozeroforsomestatecomponents,buttheoptimizationpro- KL-divergenceregularizersforone-steppredictions:thegra-
ceduremaynotfindthissolution. Thismotivatesincluding dientflowsthroughp(s |s ,a )directlyintoq(s )
|     |     |     |     |     |     |     |     |     |     |     | t   | t−1 t−1 |     | t−1 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------- | --- | --- |
adeterministicsequenceofactivationvectors{h }T that butnevertraversesachainofmultiplep(s | s ,a ).
|     |     |     |     |     |     |     | t t=1 |     |     |     |     |     | t   | t−1 t−1 |
| --- | --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- | ------- |
allowthemodeltoaccessnotjustthelaststatebutallpre- Inthissection,wegeneralizethisvariationalboundtolatent
viousstatesdeterministically(Chungetal.,2015;Buesing overshooting,whichtrainsallmulti-steppredictionsinla-
etal.,2018). Weusesuchamodel,showninFigure2c,that tentspace. Wefoundthatseveraldynamicsmodelsbenefit
4

LearningLatentDynamicsforPlanningfromPixels
|     |       |       |       |       |       | s3|1  |     |     |       |       | s3|1  |     |     |
| --- | ----- | ----- | ----- | ----- | ----- | ----- | --- | --- | ----- | ----- | ----- | --- | --- |
|     |       | s2|1  | s3|2  |       | s2|1  | s3|2  |     |     |       | s2|1  | s3|2  |     |     |
|     | s1|1  | s2|2  | s3|3  | s1|1  | s2|2  | s3|3  |     |     | s1|1  | s2|2  | s3|3  |     |     |
|     | o1,r1 | o2,r2 | o3,r3 | o1,r1 | o2,r2 | o3,r3 |     |     | o1,r1 | o2,r2 | o3,r3 |     |     |
(a)Standardvariationalbound (b)Observationovershooting (c)Latentovershooting
Figure 3: Unrolling schemes. The labels s are short for the state at time i conditioned on observations up to time j.
i|j
Arrowspointingatshadedcirclesindicatelog-likelihoodlossterms. WavyarrowsindicateKL-divergencelossterms. (a)
Thestandardvariationalobjectivesdecodestheposteriorateverysteptocomputethereconstructionloss. Italsoplacesa
KLonthepriorandposteriorateverystep,whichtrainsthetransitionfunctionforone-steppredictions. (b)Observation
overshooting (Amos et al., 2018) decodes all multi-step predictions to apply additional reconstruction losses. This is
typicallytooexpensiveinimagedomains. (c)Latentovershootingpredictsallmulti-steppriors. Thesestatebeliefsare
trainedtowardstheircorrespondingposteriorsinlatentspacetoencourageaccuratemulti-steppredictions.
fromlatentovershooting,althoughourfinalagentusingthe tion,wegeneralizeEquation3tothevariationalboundon
themulti-steppredictivedistributionp
| RSSMmodeldoesnotrequireit(seeAppendixD). |     |     |     |     |     |     |     |          |     |     | d , |     |     |
| ---------------------------------------- | --- | --- | --- | --- | --- | --- | --- | -------- | --- | --- | --- | --- | --- |
|                                          |     |     |     |     |     |     |     | (cid:90) | T   |     |     |     |     |
Limitedcapacity Ifwecouldtrainourmodeltomakeper- )(cid:44)ln (cid:89)
|     |     |     |     |     |     | lnp | (o  |     | p(s | |s  | )p(o |s | )ds   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------- | ----- | --- |
|     |     |     |     |     |     | d   | 1:T |     | t   | t−d | t       | t 1:T |     |
fectone-steppredictions,itwouldalsomakeperfectmulti-
|                                                     |         |              |          |                |     | T                |           | t=1            |               |              |                 |     |     |
| --------------------------------------------------- | ------- | ------------ | -------- | -------------- | --- | ---------------- | --------- | -------------- | ------------- | ------------ | --------------- | --- | --- |
| steppredictions,sothiswouldnotbeaproblem.           |         |              |          | However,       |     | (cid:88)(cid:16) |           |                |               |              |                 |     |     |
|                                                     |         |              |          |                |     | ≥                | E         | [lnp(o         | |s            | )] ←(cid:45) |                 |     |     |
|                                                     |         |              |          |                |     |                  | q(st|o≤t) |                | t             | t            |                 |     | (6) |
| when using                                          | a model | with limited | capacity | and restricted |     |                  |           |                |               |              |                 |     |     |
|                                                     |         |              |          |                |     | t=1              |           | reconstruction |               |              | (cid:3)(cid:17) |     |     |
| distributionalfamily,trainingthemodelonlyonone-step |         |              |          |                |     |                  | (cid:2)   |                |               |              |                 |     |     |
|                                                     |         |              |          |                |     | −E               | KL[q(s    | |o             | )(cid:107)p(s | |s           | )]              | .   |     |
predictionsuntilconvergencedoesingeneralnotcoincide t ≤t t t−1
p(st−1|st−d)q(st−d|o≤t−d)
withthemodelthatisbestatmulti-steppredictions. Forsuc- multi-stepprediction
cessfulplanning,weneedaccuratemulti-steppredictions.
Forthederivation,pleaseseeEquation9intheappendix.
Therefore,wetakeinspirationfromAmosetal.(2018)and Maximizingthisobjectivetrainsthemulti-steppredictive
| earlier related | ideas | (Krishnan | et al., 2015; | Lamb et | al., |               |                                           |     |     |     |     |     |     |
| --------------- | ----- | --------- | ------------- | ------- | ---- | ------------- | ----------------------------------------- | --- | --- | --- | --- | --- | --- |
|                 |       |           |               |         |      | distribution. | Thisreflectsthefactthatduringplanning,the |     |     |     |     |     |     |
2016;Chiappaetal.,2017),andtrainthemodelonmulti-
modelmakespredictionswithouthavingaccesstoallthe
steppredictionsofalldistances. Wedevelopthisideafor precedingobservations.
latentsequencemodels,showingthatmulti-steppredictions
|     |     |     |     |     |     | We conjecture |     | that Equation | 6   | is also | a lower | bound | on  |
| --- | --- | --- | --- | --- | --- | ------------- | --- | ------------- | --- | ------- | ------- | ----- | --- |
canbeimprovedbyalossinlatentspace,withouthavingto
|                           |     |     |     |     |     | lnp(o      | ) based | on the   | data processing |          | inequality. |     | Since |
| ------------------------- | --- | --- | --- | --- | --- | ---------- | ------- | -------- | --------------- | -------- | ----------- | --- | ----- |
| generateadditionalimages. |     |     |     |     |     | 1:T        |         |          |                 |          |             |     |       |
|                           |     |     |     |     |     | the latent | state   | sequence | is Markovian,   |          | for         | d ≥ | 1 we  |
|                           |     |     |     |     |     | have I(s   | ;s      | ) ≤ I(s  | ;s )            | and thus | E[lnp       | (o  | )] ≤  |
Multi-stepprediction Westartbygeneralizingthestan- t t−d t t−1 d 1:T
dardvariationalbound(Equation3)fromtrainingone-step E[lnp(o 1:T )]. Hence,everyboundonthemulti-steppredic-
tivedistributionisalsoaboundontheone-steppredictive
predictionstotrainingmulti-steppredictionsofafixeddis-
|     |     |     |     |     |     | distribution | in  | expectation | over | the data | set. | For | details, |
| --- | --- | --- | --- | --- | --- | ------------ | --- | ----------- | ---- | -------- | ---- | --- | -------- |
tanced. Foreaseofnotation,weomitactionsinthecon-
ditioningsethere;everydistributionovers isconditioned pleaseseeEquation10intheappendix. Inthenextpara-
t
|          |                                               |     |     |     |     | graph,wealleviatethelimitationthataparticularp |     |     |     |     |     |     | only |
| -------- | --------------------------------------------- | --- | --- | --- | --- | ---------------------------------------------- | --- | --- | --- | --- | --- | --- | ---- |
| upona <t | . Wefirstdefinemulti-steppredictions,whichare |     |     |     |     |                                                |     |     |     |     |     |     | d    |
computedbyrepeatedlyapplyingthetransitionmodeland trains predictions of one distance and arrive at our final
objective.
integratingouttheintermediatestates,
(cid:90) (cid:89) t Latentovershooting Weintroducedaboundonpredic-
)(cid:44)
p(s t |s t−d p(s τ |s τ−1 )ds t−d+1:t−1 tionsofagivendistanced. However,forplanningweneed
(5)
τ=t−d+1 accurate predictions not just for a fixed distance but for
|     |     |     |         |     |     | alldistancesuptotheplanninghorizon. |     |     |     |     | Weintroducela- |     |     |
| --- | --- | --- | ------- | --- | --- | ----------------------------------- | --- | --- | --- | --- | -------------- | --- | --- |
|     | =E  |     | [p(s |s | )]. |     |                                     |     |     |     |     |                |     |     |
p(st−1|st−d) t t−1 tentovershootingforthis,anobjectivefunctionforlatent
Thecased=1recoverstheone-steptransitionsusedinthe sequencemodelsthatgeneralizesthestandardvariational
originalmodel. Giventhisdefinitionofamulti-steppredic- bound(Equation3)totrainthemodelonmulti-steppredic-
5

LearningLatentDynamicsforPlanningfromPixels
tionsofalldistances1≤d≤D, Comparisontomodel-freemethods Figure4compares
theperformanceofPlaNettothemodel-freealgorithmsre-
|     | D          |     |     | T                 |     |     |     |     | portedbyTassaetal.(2018). |     |     | Within100episodes,PlaNet |     |     |
| --- | ---------- | --- | --- | ----------------- | --- | --- | --- | --- | ------------------------- | --- | --- | ------------------------ | --- | --- |
|     | 1 (cid:88) |     |     | (cid:88) (cid:16) |     |     |     |     |                           |     |     |                          |     |     |
lnp (o )≥ E [lnp(o |s )] ←(cid:45) outperformsthepolicy-gradientmethodA3Ctrainedfrom
|     | D   | d   | 1:T | q(st|o≤t) |                |     | t t |                 |                                                    |     |     |     |     |     |
| --- | --- | --- | --- | --------- | -------------- | --- | --- | --------------- | -------------------------------------------------- | --- | --- | --- | --- | --- |
|     |     |     |     |           |                |     |     |                 | proprioceptivestatesfor100,000episodes,onalltasks. |     |     |     |     | Af- |
|     | d=1 |     |     | t=1       | reconstruction |     |     |                 |                                                    |     |     |     |     |     |
|     |     | D   |     |           |                |     |     | (cid:3)(cid:17) |                                                    |     |     |     |     |     |
1 (cid:88) (cid:2) ter500episodes,itachievesperformancesimilartoD4PG,
|     | −   |     | β d E       | KL[q(s t | |o ≤ t )(cid:107)p(s | t   | |s t−1 )] | . (7) |              |            |         |           |        |         |
| --- | --- | --- | ----------- | -------- | -------------------- | --- | --------- | ----- | ------------ | ---------- | ------- | --------- | ------ | ------- |
|     |     | D   |             |          |                      |     |           |       | trained from | images for | 100,000 | episodes, | except | for the |
|     |     | d=1 | p(st−1|st−d | )q(st    | − d|o≤t−d            | )   |           |       |              |            |         |           |        |         |
latentovershooting fingertask.PlaNetsurpassesthefinalperformanceofD4PG
witharelativeimprovementof26%onthecheetahrunning
Latentovershootingcanbeinterpretedasaregularizerin task. WerefertoTable1fornumericalresults,whichalso
latentspacethatencouragesconsistencybetweenone-step
|     |     |     |     |     |     |     |     |     | includes | theperformance | ofCEM | planningwith |     | thetrue |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | -------- | -------------- | ----- | ------------ | --- | ------- |
andmulti-steppredictions,whichweknowshouldbeequiv- dynamicsofthesimulator.
| alentinexpectationoverthedataset. |     |     |     |     |     | Weincludeweighting |     |     |     |     |     |     |     |     |
| --------------------------------- | --- | --- | --- | --- | --- | ------------------ | --- | --- | --- | --- | --- | --- | --- | --- |
}D
factors{β d analogouslytotheβ-VAE(Higginsetal., Model designs Figure 4 additionally compares design
d=1
| 2016). |     | While | we set | all β | to the | same | value | for sim- |         |                 |        |     |              |       |
| ------ | --- | ----- | ------ | ----- | ------ | ---- | ----- | -------- | ------- | --------------- | ------ | --- | ------------ | ----- |
|        |     |       |        | >1    |        |      |       |          | choices | of the dynamics | model. | We  | train PlaNet | using |
plicity, theycouldbechosentoletthemodelfocusmore
|     |     |     |     |     |     |     |     |     | our recurrent | state-space | model | (RSSM), | as  | well as ver- |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ------------- | ----------- | ----- | ------- | --- | ------------ |
on long-term or short-term predictions. In practice, we sionswithpurelydeterministicGRU(Choetal.,2014),and
stopgradientsoftheposteriordistributionsforovershoot-
purelystochasticstate-spacemodel(SSM).Weobservethe
ingdistancesd > 1,sothatthemulti-steppredictionsare importanceofbothstochasticanddeterministicelements
trainedtowardstheinformedposteriors,butnottheother
|     |     |     |     |     |     |     |     |     | in the transition | function | on  | all tasks. | The deterministic |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ----------------- | -------- | --- | ---------- | ----------------- | --- |
wayaround.
partallowsthemodeltorememberinformationovermany
|     |     |     |     |     |     |     |     |     | timesteps. | Thestochasticcomponentisevenmoreimpor- |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---------- | -------------------------------------- | --- | --- | --- | --- |
5.Experiments tant – the agent does not learn without it. This could be
becausethetasksarestochasticfromtheagent’sperspective
| We      | evaluate                               | PlaNet | on  | six continuous |     | control | tasks | from |                                              |     |     |     |     |          |
| ------- | -------------------------------------- | ------ | --- | -------------- | --- | ------- | ----- | ---- | -------------------------------------------- | --- | --- | --- | --- | -------- |
|         |                                        |        |     |                |     |         |       |      | duetopartialobservabilityoftheinitialstates. |     |     |     |     | Thenoise |
| pixels. | Weexploremultipledesignaxesoftheagent: |        |     |                |     |         |       | the  |                                              |     |     |     |     |          |
mightalsoaddasafetymargintotheplanningobjectivethat
stochasticanddeterministicpathsinthedynamicsmodel, resultsinmorerobustactionsequences.
| iterative |     | planning,    | and | online    | experience |     | collection. | We  |              |                                    |     |     |     |     |
| --------- | --- | ------------ | --- | --------- | ---------- | --- | ----------- | --- | ------------ | ---------------------------------- | --- | --- | --- | --- |
| refer     | to  | the appendix |     | for hyper | parameters |     | (Appendix   | A)  |              |                                    |     |     |     |     |
|           |     |              |     |           |            |     |             |     | Agentdesigns | Figure5comparesPlaNet,aversioncol- |     |     |     |     |
andadditionalexperiments(AppendicesCtoE).Besides
lectingepisodesunderrandomactionsratherthanbyplan-
theactionrepeat,weusethesamehyperparametersforall
ning,andaversionthatateachenvironmentstepselectsthe
tasks. Withinlessthanonehundredththeepisodes,PlaNet bestactionoutof1000sequencesratherthaniterativelyre-
| outperforms |     | A3C | (Mnih | et al., | 2016) | and | achieves | sim- |     |     |     |     |     |     |
| ----------- | --- | --- | ----- | ------- | ----- | --- | -------- | ---- | --- | --- | --- | --- | --- | --- |
finingplansviaCEM.Weobservethatonlinedatacollection
| ilar | performance |     | to the | top model-free |     | algorithm |     | D4PG |     |     |     |     |     |     |
| ---- | ----------- | --- | ------ | -------------- | --- | --------- | --- | ---- | --- | --- | --- | --- | --- | --- |
helpsforalltasksandisnecessaryforthecartpole,finger,
| (Barth-Maronetal.,2018). |     |     |     | Thetrainingtimeof10to20 |     |     |     |     |     |     |     |     |     |     |
| ------------------------ | --- | --- | --- | ----------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
andwalkertasks.Iterativesearchforactionsequencesusing
| hours | (depending |     | on  | the task) | on a | single | Nvidia | V100 |     |     |     |     |     |     |
| ----- | ---------- | --- | --- | --------- | ---- | ------ | ------ | ---- | --- | --- | --- | --- | --- | --- |
CEMimprovesperformanceonalltasks.
| GPU | compares |     | favorably | to that | of  | A3C and | D4PG. | Our |     |     |     |     |     |     |
| --- | -------- | --- | --------- | ------- | --- | ------- | ----- | --- | --- | --- | --- | --- | --- | --- |
implementationusesTensorFlowProbability(Dillonetal.,
|        |             |     |                            |     |     |     |     |     | Oneagentalltasks                               |     | Figure7intheappendixshowsthe |     |     |     |
| ------ | ----------- | --- | -------------------------- | --- | --- | --- | --- | --- | ---------------------------------------------- | --- | ---------------------------- | --- | --- | --- |
| 2017). | Pleasevisit |     | https://danijar.com/planet |     |     |     |     |     |                                                |     |                              |     |     |     |
|        |             |     |                            |     |     |     |     |     | performanceofasingleagenttrainedonallsixtasks. |     |                              |     |     | The |
foraccesstothecodeandvideosofthetrainedagent.
|     |     |     |     |     |     |     |     |     | agent is | not told which | task | it is facing; | it needs | to infer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | -------- | -------------- | ---- | ------------- | -------- | -------- |
Forourevaluation,weconsidersiximage-basedcontinuous thisfromtheimageobservations. Wepadtheactionspaces
control tasks of the DeepMind control suite (Tassa et al., withunusedelementstomakethemcompatibleandadapt
2018), shown in Figure 1. These environments provide Algorithm 1 to collect one episode of each task every C
qualitatively different challenges. The cartpole swingup updatesteps. Weusethesamehyperparametersasforthe
taskrequiresalongplanninghorizonandtomemorizethe mainexperimentsabove. Theagentsolvesalltaskswhile
cart when it is out of view, reacher has a sparse reward learning slower compared to individually trained agents.
givenwhenthehandandgoalareaoverlap,fingerspinning Thisindicatesthatthemodelcanlearntopredictmultiple
includescontactdynamicsbetweenthefingerandtheobject, domains,regardlessoftheconceptuallydifferentvisuals.
cheetahexhibitslargerstateandactionspaces,thecuptask
| onlyhasasparserewardforwhentheballiscaught,andthe |     |     |     |     |     |     |     |     | 6.RelatedWork |     |     |     |     |     |
| ------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | ------------- | --- | --- | --- | --- | --- |
walkerischallengingbecausetherobotfirsthastostandup
andthenwalk,resultingincollisionswiththegroundthat Previous work in model-based reinforcement learning
aredifficulttopredict. Inalltasks,theonlyobservationsare has focused on planning in low-dimensional state spaces
third-personcameraimagesofsize64×64×3pixels. (Galetal.,2016;Higueraetal.,2018;Henaffetal.,2018;
6

LearningLatentDynamicsforPlanningfromPixels
CartpoleSwingUp ReacherEasy CheetahRun
1000 1000 1000
800 800 800
600 600 600
400 400 400
200 200 200
0 0 0
5 250 500 750 1000 5 250 500 750 1000 5 250 500 750 1000
FingerSpin CupCatch WalkerWalk
1000 1000 1000
800 800 800
600 600 600
400 400 400
200 200 200
0 0 0
5 250 500 750 1000 5 250 500 750 1000 5 250 500 750 1000
PlaNet (RSSM) Stochastic (SSM) D4PG (100k episodes)
Deterministic (GRU) A3C (100k episodes, proprio)
Figure4: ComparisonofPlaNettomodel-freealgorithmsandothermodeldesigns. Plotsshowtestperformanceoverthe
numberofcollectedepisodes. WecomparePlaNetusingourRSSM(Section3)topurelydeterministic(GRU)andpurely
stochasticmodels(SSM).TheRNNdoesnotuselatentovershooting,asitdoesnothavestochasticlatents. Thelinesshow
mediansandtheareasshowpercentiles5to95over5seedsand10trajectories. Theshadedareasarelargeontwoofthe
tasksduetothesparserewards.
Table1: ComparisonofPlaNettothemodel-freealgorithmsA3CandD4PGreportedbyTassaetal.(2018). Thetraining
curvesfortheseareshownasorangelinesinFigure4andassolidgreenlinesinFigure6intheirpaper. Fromthese,we
estimatethenumberofepisodesthatD4PGtakestoachievethefinalperformanceofPlaNettoestimatethedataefficiency
gain. WefurtherincludeCEMplanning(H =12,I =10,J =1000,K =100)withthetruesimulatorinsteadoflearned
dynamicsasanestimatedupperboundonperformance. Numbersindicatemeanfinalperformanceover5seedsand10
trajectories.
Method Modality Episodes
eloptraC
pUgniwS
rehcaeR
ysaE
hateehC
nuR regniF nipS puC hctaC reklaW klaW
A3C proprioceptive 100,000 558 285 214 129 105 311
D4PG pixels 100,000 862 967 524 985 980 968
PlaNet(ours) pixels 1,000 821 832 662 700 930 951
CEM+truesimulator simulatorstate 0 850 964 656 825 993 994
DataefficiencygainPlaNetoverD4PG(factor) 250 40 500+ 300 100 90
Chuaetal.,2018),combiningthebenefitsofmodel-based gor&Besse,2018). AppendixGreviewstheseorthogonal
andmodel-freeapproaches(Kalweit&Boedecker,2017; researchdirectionsinmoredetail.
Nagabandietal.,2017;Weberetal.,2017;Kurutachetal.,
Relatively few works have demonstrated successful plan-
2018; Buckman et al., 2018; Ha & Schmidhuber, 2018;
ning from pixels using learned dynamics models. The
Wayneetal.,2018;Igletal.,2018;Srinivasetal.,2018),
robotics community focuses on video prediction models
andpurevideopredictionwithoutplanning(Ohetal.,2015;
forplanning(Agrawaletal.,2016;Finn&Levine,2017;
Krishnanetal.,2015;Karletal.,2016;Chiappaetal.,2017;
Ebert et al., 2018; Zhang et al., 2018) that deal with the
Babaeizadeh et al., 2017; Gemici et al., 2017; Denton &
visual complexity of the real world and solve tasks with
Fergus,2018;Buesingetal.,2018;Doerretal.,2018;Gre-
7

LearningLatentDynamicsforPlanningfromPixels
|     |      | CartpoleSwingUp |            |     |      |                   | ReacherEasy |          |                              |      |       | CheetahRun |     |      |
| --- | ---- | --------------- | ---------- | --- | ---- | ----------------- | ----------- | -------- | ---------------------------- | ---- | ----- | ---------- | --- | ---- |
|     | 1000 |                 |            |     |      | 1000              |             |          |                              | 1000 |       |            |     |      |
|     | 800  |                 |            |     |      | 800               |             |          |                              | 800  |       |            |     |      |
|     | 600  |                 |            |     |      | 600               |             |          |                              | 600  |       |            |     |      |
|     | 400  |                 |            |     |      | 400               |             |          |                              | 400  |       |            |     |      |
|     | 200  |                 |            |     |      | 200               |             |          |                              | 200  |       |            |     |      |
|     |      | 0               |            |     |      |                   | 0           |          |                              | 0    |       |            |     |      |
|     |      | 5 250           | 500        | 750 | 1000 |                   | 5 250       | 500      | 750 1000                     |      | 5 250 | 500        | 750 | 1000 |
|     |      |                 | FingerSpin |     |      |                   |             | CupCatch |                              |      |       | WalkerWalk |     |      |
|     | 1000 |                 |            |     |      | 1000              |             |          |                              | 1000 |       |            |     |      |
|     | 800  |                 |            |     |      | 800               |             |          |                              | 800  |       |            |     |      |
|     | 600  |                 |            |     |      | 600               |             |          |                              | 600  |       |            |     |      |
|     | 400  |                 |            |     |      | 400               |             |          |                              | 400  |       |            |     |      |
|     | 200  |                 |            |     |      | 200               |             |          |                              | 200  |       |            |     |      |
|     |      | 0               |            |     |      |                   | 0           |          |                              | 0    |       |            |     |      |
|     |      | 5 250           | 500        | 750 | 1000 |                   | 5 250       | 500      | 750 1000                     |      | 5 250 | 500        | 750 | 1000 |
|     |      |                 | PlaNet     |     |      | Random collection |             |          | D4PG (100k episodes)         |      |       |            |     |      |
|     |      |                 |            |     |      | Random shooting   |             |          | A3C (100k episodes, proprio) |      |       |            |     |      |
Figure5: Comparisonofagentdesigns. Plotsshowtestperformanceoverthenumberofcollectedepisodes. Wecompare
PlaNet,aversionthatcollectsdataunderrandomactions(randomcollection),andaversionthatchoosesthebestactionout
of1000sequencesateachenvironmentstep(randomshooting)withoutiterativelyrefiningplansviaCEM.Thelinesshow
mediansandtheareasshowpercentiles5to95over5seedsand10trajectories.
asimplegripper, suchasgraspingorpushingobjects. In showthatlearninglatentdynamicsmodelsforplanningin
comparison, wefocusonsimulatedenvironments, where imagedomainsisapromisingapproach.
weleveragelatentplanningtoscaletolargerstateandac-
|              |         |                                     |     |           |     |      |           | Directions                 | for     | future work | include                   | learning |         | temporal ab- |
| ------------ | ------- | ----------------------------------- | --- | --------- | --- | ---- | --------- | -------------------------- | ------- | ----------- | ------------------------- | -------- | ------- | ------------ |
| tion         | spaces, | longer planning                     |     | horizons, | as  | well | as sparse |                            |         |             |                           |          |         |              |
|              |         |                                     |     |           |     |      |           | straction                  | instead | of using    | a fixed                   | action   | repeat, | possibly     |
| rewardtasks. |         | E2C(Watteretal.,2015)andRCE(Banija- |     |           |     |      |           |                            |         |             |                           |          |         |              |
|              |         |                                     |     |           |     |      |           | throughhierarchicalmodels. |         |             | Tofurtherimprovefinalper- |          |         |              |
malietal.,2017)embedimagesintoalatentspace,where
formance,onecouldlearnavaluefunctiontoapproximate
theylearnlocal-linearlatenttransitionsandplanforactions
|     |     |     |     |     |     |     |     | thesumofrewardsbeyondtheplanninghorizon. |     |     |     |     |     | Moreover, |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------------------------------------- | --- | --- | --- | --- | --- | --------- |
usingLQR.Thesemethodsbalancesimulatedcartpolesand
gradient-basedplanningcouldincreasethecomputational
control2-linkarmsfromimages,buthavebeendifficultto
efficiencyoftheagentandlearningrepresentationswithout
scaleup. WelifttheMarkovassumptionofthesemodels,
reconstructioncouldhelptosolvetaskswithhighervisual
makingourmethodapplicableunderpartialobservability,
diversity. Ourworkprovidesastartingpointformulti-task
andpresentresultsonmorechallengingenvironmentsthat
controlbysharingthedynamicsmodel.
| include | longer | planning | horizons, |     | contact | dynamics, | and |     |     |     |     |     |     |     |
| ------- | ------ | -------- | --------- | --- | ------- | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
sparserewards.
|     |     |     |     |     |     |     |     | Acknowledgements |      | WethankJacobBuckman,Nicolas |         |          |     |               |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------------- | ---- | --------------------------- | ------- | -------- | --- | ------------- |
|     |     |     |     |     |     |     |     | Heess,           | John | Schulman,                   | Rishabh | Agarwal, |     | Silviu Pitis, |
7.Discussion
|     |         |           |             |     |       |             |       | Mohammad |     | Norouzi,      | George | Tucker, | David  | Duvenaud, |
| --- | ------- | --------- | ----------- | --- | ----- | ----------- | ----- | -------- | --- | ------------- | ------ | ------- | ------ | --------- |
|     |         |           |             |     |       |             |       | Shane    | Gu, | Chelsea Finn, | Steven |         | Bohez, | Jimmy Ba, |
| We  | present | PlaNet, a | model-based |     | agent | that learns | a la- |          |     |               |        |         |        |           |
StephanieChan,andJennyLiuforhelpfuldiscussions.
tentdynamicsmodelfromimageobservationsandchooses
| actions                          | by        | fast planning      | in  | latent    | space.             | To enable | accu-     |     |     |     |     |     |     |     |
| -------------------------------- | --------- | ------------------ | --- | --------- | ------------------ | --------- | --------- | --- | --- | --- | --- | --- | --- | --- |
| rate                             | long-term | predictions,       |     | we design | a                  | model     | with both |     |     |     |     |     |     |     |
| stochasticanddeterministicpaths. |           |                    |     |           | Weshowthatouragent |           |           |     |     |     |     |     |     |     |
| succeeds                         | at        | several continuous |     | control   | tasks              | from      | image     |     |     |     |     |     |     |     |
observations,reachingperformancethatiscomparableto
| the                                      | best model-free |     | algorithms | while | using | 200×       | fewer |     |     |     |     |     |     |     |
| ---------------------------------------- | --------------- | --- | ---------- | ----- | ----- | ---------- | ----- | --- | --- | --- | --- | --- | --- | --- |
| episodesandsimilarorlesscomputationtime. |                 |     |            |       |       | Theresults |       |     |     |     |     |     |     |     |
8

LearningLatentDynamicsforPlanningfromPixels
References Chung,J.,Kastner,K.,Dinh,L.,Goel,K.,Courville,A.C.,
|     |     |     |     |     |     |     | and Bengio, | Y.  | A recurrent | latent | variable | model for |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --- | ----------- | ------ | -------- | --------- |
Agrawal,P.,Nair,A.V.,Abbeel,P.,Malik,J.,andLevine,
|     |     |     |     |     |     |     | sequentialdata. | InAdvancesinneuralinformationpro- |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --------------- | --------------------------------- | --- | --- | --- | --- |
S. Learning to poke by poking: Experiential learning cessingsystems,pp.2980–2988,2015.
| ofintuitivephysics. |     | InAdvancesinNeuralInformation |     |     |     |     |     |     |     |     |     |     |
| ------------------- | --- | ----------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
ProcessingSystems,pp.5074–5082,2016.
|     |     |     |     |     |     |     | Clevert, D.-A., | Unterthiner, |     | T., and Hochreiter, |     | S. Fast |
| --- | --- | --- | --- | --- | --- | --- | --------------- | ------------ | --- | ------------------- | --- | ------- |
andaccuratedeepnetworklearningbyexponentiallinear
Amos,B.,Dinh,L.,Cabi,S.,Rothörl,T.,Muldal,A.,Erez, units(elus). arXivpreprintarXiv:1511.07289,2015.
| T., Tassa, | Y., de | Freitas, | N., and | Denil, | M. Learning |     |     |     |     |     |     |     |
| ---------- | ------ | -------- | ------- | ------ | ----------- | --- | --- | --- | --- | --- | --- | --- |
awarenessmodels. InInternationalConferenceonLearn- Deisenroth,M.andRasmussen,C.E. Pilco:Amodel-based
ingRepresentations,2018. anddata-efficientapproachtopolicysearch. InProceed-
|     |     |     |     |     |     |     | ings of the | 28th | International | Conference |     | on machine |
| --- | --- | --- | --- | --- | --- | --- | ----------- | ---- | ------------- | ---------- | --- | ---------- |
Babaeizadeh,M.,Finn,C.,Erhan,D.,Campbell,R.H.,and learning(ICML-11),pp.465–472,2011.
| Levine,S. | Stochasticvariationalvideoprediction. |     |     |     |     | arXiv |     |     |     |     |     |     |
| --------- | ------------------------------------- | --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- |
preprintarXiv:1710.11252,2017. Denton,E.andFergus,R. Stochasticvideogenerationwith
|             |          |     |              |     |      |         | alearnedprior. | arXivpreprintarXiv:1802.07687,2018. |     |     |     |     |
| ----------- | -------- | --- | ------------ | --- | ---- | ------- | -------------- | ----------------------------------- | --- | --- | --- | --- |
| Banijamali, | E., Shu, | R., | Ghavamzadeh, | M., | Bui, | H., and |                |                                     |     |     |     |     |
Ghodsi,A. Robustlocally-linearcontrollableembedding. Dillon,J.V.,Langmore,I.,Tran,D.,Brevdo,E.,Vasudevan,
arXivpreprintarXiv:1710.05373,2017. S.,Moore,D.,Patton,B.,Alemi,A.,Hoffman,M.,and
|     |     |     |     |     |     |     | Saurous,R.A. | Tensorflowdistributions. |     |     | arXivpreprint |     |
| --- | --- | --- | --- | --- | --- | --- | ------------ | ------------------------ | --- | --- | ------------- | --- |
Barth-Maron, G., Hoffman, M. W., Budden, D., Dabney, arXiv:1711.10604,2017.
W.,Horgan,D.,Muldal,A.,Heess,N.,andLillicrap,T.
Distributeddistributionaldeterministicpolicygradients. Doerr, A., Daniel, C., Schiegg, M., Nguyen-Tuong, D.,
arXivpreprintarXiv:1804.08617,2018. Schaal, S., Toussaint, M., and Trimpe, S. Proba-
|                                              |     |     |     |     |     |        | bilistic recurrent |     | state-space | models. | arXiv | preprint |
| -------------------------------------------- | --- | --- | --- | --- | --- | ------ | ------------------ | --- | ----------- | ------- | ----- | -------- |
| Bengio,S.,Vinyals,O.,Jaitly,N.,andShazeer,N. |     |     |     |     |     | Sched- |                    |     |             |         |       |          |
arXiv:1801.10395,2018.
uledsamplingforsequencepredictionwithrecurrentneu-
ralnetworks. InAdvancesinNeuralInformationProcess- Ebert,F.,Finn,C.,Dasari,S.,Xie,A.,Lee,A.,andLevine,
ingSystems,pp.1171–1179,2015.
|     |     |     |     |     |     |     | S. Visual                              | foresight: | Model-based |     | deep reinforcement |     |
| --- | --- | --- | --- | --- | --- | --- | -------------------------------------- | ---------- | ----------- | --- | ------------------ | --- |
|     |     |     |     |     |     |     | learningforvision-basedroboticcontrol. |            |             |     | arXivpreprint      |     |
Buckman, J., Hafner, D., Tucker, G., Brevdo, E., and arXiv:1812.00568,2018.
| Lee, | H. Sample-efficient |     | reinforcement |     | learning | with |     |     |     |     |     |     |
| ---- | ------------------- | --- | ------------- | --- | -------- | ---- | --- | --- | --- | --- | --- | --- |
stochastic ensemble value expansion. arXiv preprint Finn,C.andLevine,S. Deepvisualforesightforplanning
arXiv:1807.01675,2018. robotmotion. InRoboticsandAutomation(ICRA),2017
IEEEInternationalConferenceon,pp.2786–2793.IEEE,
| Buesing,L.,Weber,T.,Racaniere,S.,Eslami,S.,Rezende, |     |     |            |        |             |     | 2017. |     |     |     |     |     |
| --------------------------------------------------- | --- | --- | ---------- | ------ | ----------- | --- | ----- | --- | --- | --- | --- | --- |
| D., Reichert,                                       | D.  | P., | Viola, F., | Besse, | F., Gregor, | K., |       |     |     |     |     |     |
Hassabis, D., et al. Learning and querying fast gener- Gal,Y.,McAllister,R.,andRasmussen,C.E. Improving
ativemodelsforreinforcementlearning. arXivpreprint pilcowithbayesianneuralnetworkdynamicsmodels. In
arXiv:1802.03006,2018. Data-EfficientMachineLearningworkshop,ICML,2016.
Chiappa, S., Racaniere, S., Wierstra, D., and Mohamed, Gemici, M., Hung, C.-C., Santoro, A., Wayne, G., Mo-
S. Recurrent environment simulators. arXiv preprint hamed, S., Rezende, D. J., Amos, D., and Lillicrap, T.
arXiv:1704.02254,2017. Generativetemporalmodelswithmemory.arXivpreprint
arXiv:1702.04649,2017.
| Cho, K., | Van Merriënboer, |     | B., Gulcehre, |     | C., Bahdanau, |     |     |     |     |     |     |     |
| -------- | ---------------- | --- | ------------- | --- | ------------- | --- | --- | --- | --- | --- | --- | --- |
D., Bougares, F., Schwenk, H., and Bengio, Y. Learn- Gregor,K.andBesse,F. Temporaldifferencevariational
ing phrase representations using rnn encoder-decoder auto-encoder. arXivpreprintarXiv:1806.03107,2018.
| for statistical |     | machine | translation. |     | arXiv | preprint |     |     |     |     |     |     |
| --------------- | --- | ------- | ------------ | --- | ----- | -------- | --- | --- | --- | --- | --- | --- |
arXiv:1406.1078,2014. Ha,D.andSchmidhuber,J. Worldmodels. arXivpreprint
arXiv:1803.10122,2018.
| Chua, K., | Calandra, | R., | McAllister, | R., | and Levine, | S.  |     |     |     |     |     |     |
| --------- | --------- | --- | ----------- | --- | ----------- | --- | --- | --- | --- | --- | --- | --- |
Deep reinforcement learning in a handful of trials us- Henaff,M.,Whitney,W.F.,andLeCun,Y. Model-based
ing probabilistic dynamics models. arXiv preprint planning with discrete and continuous actions. arXiv
preprintarXiv:1705.07177,2018.
arXiv:1805.12114,2018.
9

LearningLatentDynamicsforPlanningfromPixels
Higgins, I., Matthey, L., Pal, A., Burgess, C., Glorot, X., Mnih,V.,Kavukcuoglu,K.,Silver,D.,Rusu,A.A.,Veness,
Botvinick, M., Mohamed, S., and Lerchner, A. beta- J.,Bellemare,M.G.,Graves,A.,Riedmiller,M.,Fidje-
vae: Learningbasicvisualconceptswithaconstrained land, A. K., Ostrovski, G., et al. Human-level control
variationalframework. InInternationalConferenceon throughdeepreinforcementlearning. Nature,518(7540):
| LearningRepresentations,2016.       |     |     |     |     |              | 529,2015. |        |        |        |             |     |            |
| ----------------------------------- | --- | --- | --- | --- | ------------ | --------- | ------ | ------ | ------ | ----------- | --- | ---------- |
| Higuera,J.C.G.,Meger,D.,andDudek,G. |     |     |     |     | Synthesizing |           |        |        |        |             |     |            |
|                                     |     |     |     |     |              | Mnih, V., | Badia, | A. P., | Mirza, | M., Graves, | A., | Lillicrap, |
neuralnetworkcontrollerswithprobabilisticmodelbased T., Harley, T., Silver, D., and Kavukcuoglu, K. Asyn-
reinforcementlearning.arXivpreprintarXiv:1803.02291, chronousmethodsfordeepreinforcementlearning. In
| 2018. |     |     |     |     |     | InternationalConferenceonMachineLearning,pp.1928– |     |     |     |     |     |     |
| ----- | --- | --- | --- | --- | --- | ------------------------------------------------- | --- | --- | --- | --- | --- | --- |
1937,2016.
| Igl, M., | Zintgraf, | L., Le, | T. A., Wood, | F., and | Whiteson, |     |     |     |     |     |     |     |
| -------- | --------- | ------- | ------------ | ------- | --------- | --- | --- | --- | --- | --- | --- | --- |
S. Deepvariationalreinforcementlearningforpomdps. Moerland,T.M.,Broekens,J.,andJonker,C.M. Learning
arXivpreprintarXiv:1806.02426,2018.
|                                                    |     |                                     |     |     |       | multimodal |           | transition | dynamics | for model-based            |     | rein- |
| -------------------------------------------------- | --- | ----------------------------------- | --- | --- | ----- | ---------- | --------- | ---------- | -------- | -------------------------- | --- | ----- |
|                                                    |     |                                     |     |     |       | forcement  | learning. |            | arXiv    | preprint arXiv:1705.00470, |     |       |
| Kalchbrenner,N.,Oord,A.v.d.,Simonyan,K.,Danihelka, |     |                                     |     |     |       | 2017.      |           |            |          |                            |     |       |
| I.,Vinyals,O.,Graves,A.,andKavukcuoglu,K.          |     |                                     |     |     | Video |            |           |            |          |                            |     |       |
| pixelnetworks.                                     |     | arXivpreprintarXiv:1610.00527,2016. |     |     |       |            |           |            |          |                            |     |       |
Moravcˇík,M.,Schmid,M.,Burch,N.,Lisy`,V.,Morrill,D.,
Bard,N.,Davis,T.,Waugh,K.,Johanson,M.,andBowl-
| Kalweit, | G. and         | Boedecker, | J. Uncertainty-driven |     | imagi-       |                        |            |                                      |          |                    |     |     |
| -------- | -------------- | ---------- | --------------------- | --- | ------------ | ---------------------- | ---------- | ------------------------------------ | -------- | ------------------ | --- | --- |
|          |                |            |                       |     |              | ing,M.                 | Deepstack: | Expert-levelartificialintelligencein |          |                    |     |     |
| nation   | for continuous |            | deep reinforcement    |     | learning. In |                        |            |                                      |          |                    |     |     |
|          |                |            |                       |     |              | heads-upno-limitpoker. |            |                                      | Science, | 356(6337):508–513, |     |     |
ConferenceonRobotLearning,pp.195–206,2017.
2017.
| Karl, M., | Soelch,     | M., Bayer, | J., and               | van der | Smagt, P. |                                             |         |          |              |                 |             |       |
| --------- | ----------- | ---------- | --------------------- | ------- | --------- | ------------------------------------------- | ------- | -------- | ------------ | --------------- | ----------- | ----- |
|           |             |            |                       |         |           | Nagabandi,                                  | A.,     | Kahn,    | G., Fearing, | R. S.,          | and Levine, | S.    |
| Deep      | variational | bayes      | filters: Unsupervised |         | learning  |                                             |         |          |              |                 |             |       |
|           |             |            |                       |         |           | Neural                                      | network | dynamics |              | for model-based | deep        | rein- |
| of state  | space       | models     | from raw data.        | arXiv   | preprint  |                                             |         |          |              |                 |             |       |
|           |             |            |                       |         |           | forcementlearningwithmodel-freefine-tuning. |         |          |              |                 |             | arXiv |
arXiv:1605.06432,2016.
preprintarXiv:1708.02596,2017.
| Kingma,D.P.andBa,J. |     |                                    | Adam: Amethodforstochastic |     |     |                       |     |     |                             |     |     |     |
| ------------------- | --- | ---------------------------------- | -------------------------- | --- | --- | --------------------- | --- | --- | --------------------------- | --- | --- | --- |
|                     |     |                                    |                            |     |     | Nair,V.andHinton,G.E. |     |     | Rectifiedlinearunitsimprove |     |     |     |
| optimization.       |     | arXivpreprintarXiv:1412.6980,2014. |                            |     |     |                       |     |     |                             |     |     |     |
restrictedboltzmannmachines.InProceedingsofthe27th
internationalconferenceonmachinelearning(ICML-10),
| Kingma, | D. P.           | and Dhariwal, | P.            | Glow: | Generative |                  |     |     |     |     |     |     |
| ------- | --------------- | ------------- | ------------- | ----- | ---------- | ---------------- | --- | --- | --- | --- | --- | --- |
| flow    | with invertible | 1x1           | convolutions. | arXiv | preprint   | pp.807–814,2010. |     |     |     |     |     |     |
arXiv:1807.03039,2018.
|     |     |     |     |     |     | Oh,J.,Guo,X.,Lee,H.,Lewis,R.L.,andSingh,S. |     |     |     |     |     | Action- |
| --- | --- | --- | --- | --- | --- | ------------------------------------------ | --- | --- | --- | --- | --- | ------- |
conditionalvideopredictionusingdeepnetworksinatari
| Kingma,D.P.andWelling,M. |     |     | Auto-encodingvariational |     |     |     |     |     |     |     |     |     |
| ------------------------ | --- | --- | ------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
bayes. arXivpreprintarXiv:1312.6114,2013. games. InAdvancesinNeuralInformationProcessing
Systems,pp.2863–2871,2015.
| Krishnan,R.G.,Shalit,U.,andSontag,D. |     |     |     | Deepkalman |     |                                        |     |     |     |     |            |     |
| ------------------------------------ | --- | --- | --- | ---------- | --- | -------------------------------------- | --- | --- | --- | --- | ---------- | --- |
|                                      |     |     |     |            |     | Rezende,D.J.,Mohamed,S.,andWierstra,D. |     |     |     |     | Stochastic |     |
filters. arXivpreprintarXiv:1511.05121,2015.
backpropagationandapproximateinferenceindeepgen-
Krishnan, R. G., Shalit, U., and Sontag, D. Structured erativemodels. arXivpreprintarXiv:1401.4082,2014.
| inferencenetworksfornonlinearstatespacemodels. |     |     |     |     | In  |     |     |     |     |     |     |     |
| ---------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Richards,A.G.Robustconstrainedmodelpredictivecontrol.
AAAI,pp.2101–2109,2017.
PhDthesis,MassachusettsInstituteofTechnology,2005.
Kurutach,T.,Clavera,I.,Duan,Y.,Tamar,A.,andAbbeel,P.
Model-ensembletrust-regionpolicyoptimization. arXiv Rubinstein,R.Y.Optimizationofcomputersimulationmod-
preprintarXiv:1802.10592,2018. elswithrareevents. EuropeanJournalofOperational
Research,99(1):89–112,1997.
Lamb,A.M.,GOYAL,A.G.A.P.,Zhang,Y.,Zhang,S.,
Courville,A.C.,andBengio,Y.Professorforcing:Anew Silver, D., Schrittwieser, J., Simonyan, K., Antonoglou,
algorithmfortrainingrecurrentnetworks. InAdvancesIn I.,Huang,A.,Guez,A.,Hubert,T.,Baker,L.,Lai,M.,
NeuralInformationProcessingSystems,pp.4601–4609, Bolton, A., et al. Mastering the game of go without
| 2016. |     |     |     |     |     | humanknowledge. |     | Nature,550(7676):354,2017. |     |     |     |     |
| ----- | --- | --- | --- | --- | --- | --------------- | --- | -------------------------- | --- | --- | --- | --- |
Mathieu, M., Couprie, C., and LeCun, Y. Deep multi- Srinivas, A., Jabri, A., Abbeel, P., Levine, S., and Finn,
scalevideopredictionbeyondmeansquareerror. arXiv C. Universal planning networks. arXiv preprint
| preprintarXiv:1511.05440,2015. |     |     |     |     |     | arXiv:1804.00645,2018. |     |     |     |     |     |     |
| ------------------------------ | --- | --- | --- | --- | --- | ---------------------- | --- | --- | --- | --- | --- | --- |
10

LearningLatentDynamicsforPlanningfromPixels
| Talvitie,E. | Modelregularizationforstablesamplerollouts. |     |     |     |     |
| ----------- | ------------------------------------------- | --- | --- | --- | --- |
InUAI,pp.780–789,2014.
| Tassa, Y., | Erez, T., and | Todorov, | E. Synthesis |     | and stabi- |
| ---------- | ------------- | -------- | ------------ | --- | ---------- |
lizationofcomplexbehaviorsthroughonlinetrajectory
| optimization. | InIntelligentRobotsandSystems(IROS), |     |     |     |     |
| ------------- | ------------------------------------ | --- | --- | --- | --- |
2012IEEE/RSJInternationalConferenceon,pp.4906–
4913.IEEE,2012.
Tassa,Y.,Doron,Y.,Muldal,A.,Erez,T.,Li,Y.,Casas,D.
d.L.,Budden,D.,Abdolmaleki,A.,Merel,J.,Lefrancq,
| A., et | al. Deepmind | control | suite. | arXiv | preprint |
| ------ | ------------ | ------- | ------ | ----- | -------- |
arXiv:1801.00690,2018.
| vandenOord,A.,Vinyals,O.,etal. |     |                               | Neuraldiscreterepre- |     |     |
| ------------------------------ | --- | ----------------------------- | -------------------- | --- | --- |
| sentationlearning.             |     | InAdvancesinNeuralInformation |                      |     |     |
ProcessingSystems,pp.6309–6318,2017.
| Venkatraman,A.,Hebert,M.,andBagnell,J.A.       |     |     |     |     | Improving |
| ---------------------------------------------- | --- | --- | --- | --- | --------- |
| multi-steppredictionoflearnedtimeseriesmodels. |     |     |     |     | In        |
AAAI,pp.3024–3030,2015.
| Vondrick,C.,Pirsiavash,H.,andTorralba,A. |                      |     |             |     | Generating |
| ---------------------------------------- | -------------------- | --- | ----------- | --- | ---------- |
| videos                                   | with scene dynamics. |     | In Advances |     | In Neural  |
InformationProcessingSystems,2016.
Watter,M.,Springenberg,J.,Boedecker,J.,andRiedmiller,
| M. Embedtocontrol: |     | Alocallylinearlatentdynamics |     |     |     |
| ------------------ | --- | ---------------------------- | --- | --- | --- |
modelforcontrolfromrawimages.InAdvancesinneural
informationprocessingsystems,pp.2746–2754,2015.
| Wayne,                 | G., Hung, C.-C.,   | Amos, | D.,                 | Mirza,        | M., Ahuja, |
| ---------------------- | ------------------ | ----- | ------------------- | ------------- | ---------- |
| A., Grabska-Barwinska, |                    | A.,   | Rae,                | J., Mirowski, | P.,        |
| Leibo,                 | J. Z., Santoro,    | A.,   | et al. Unsupervised |               | predic-    |
| tive memory            | in a goal-directed |       | agent.              | arXiv         | preprint   |
arXiv:1803.10760,2018.
Weber,T.,Racanière,S.,Reichert,D.P.,Buesing,L.,Guez,
| A., Rezende,   | D. J.,                             | Badia, | A. P., Vinyals, |     | O., Heess, |
| -------------- | ---------------------------------- | ------ | --------------- | --- | ---------- |
| N.,Li,Y.,etal. | Imagination-augmentedagentsfordeep |        |                 |     |            |
reinforcementlearning.arXivpreprintarXiv:1707.06203,
2017.
Zhang,M.,Vikram,S.,Smith,L.,Abbeel,P.,Johnson,M.,
| andLevine,S.                         | SOLAR:deepstructuredrepresentations |     |     |               |     |
| ------------------------------------ | ----------------------------------- | --- | --- | ------------- | --- |
| formodel-basedreinforcementlearning. |                                     |     |     | arXivpreprint |     |
arXiv:1808.09105,2018.
11

LearningLatentDynamicsforPlanningfromPixels
A.HyperParameters
WeusetheconvolutionalanddeconvolutionalnetworksfromHa&Schmidhuber(2018),aGRU(Choetal.,2014)with200
unitsasdeterministicpathinthedynamicsmodel,andimplementallotherfunctionsastwofullyconnectedlayersofsize
200withReLUactivations(Nair&Hinton,2010). Distributionsinlatentspaceare30-dimensionaldiagonalGaussianswith
predictedmeanandstandarddeviation.
Wepre-processimagesbyreducingthebitdepthto5bitsasinKingma&Dhariwal(2018). Themodelistrainedusing
theAdamoptimizer(Kingma&Ba,2014)withalearningrateof10−3,(cid:15) = 10−4,andgradientclippingnormof1000
on batches of B = 50 sequence chunks of length L = 50. We do not scale the KL divergence terms relatively to the
reconstructiontermsbutgrantthemodel3freenatsbyclippingthedivergencelossbelowthisvalue. Inapreviousversion
oftheagent,weusedlatentovershootingandanadditionalfixedglobalprior,butwefoundthistonotbenecessary.
Forplanning,weuseCEMwithhorizonlengthH =12,optimizationiterationsI =10,candidatesamplesJ =1000,and
refittingtothebestK =100. WestartfromS =5seedepisodeswithrandomactionsandcollectanotherepisodeevery
C =100updatestepsunder(cid:15)∼Normal(0,0.3)actionnoise. Theactionrepeatdiffersbetweendomains: cartpole(R=8),
reacher(R=4),cheetah(R=4),finger(R=2),cup(R=4),walker(R=2). Wefoundimportanthyperparametersto
betheactionrepeat,theKL-divergencescalesβ,andthelearningrate.
B.PlanningAlgorithm
Algorithm2:LatentplanningwithCEM
Input: H Planninghorizondistance q(s |o ,a ) Currentstatebelief
t ≤t <t
I Optimizationiterations p(s |s ,a ) Transitionmodel
t t−1 t−1
J Candidatesperiteration p(r |s ) Rewardmodel
t t
K Numberoftopcandidatestofit
Initializefactorizedbeliefoveractionsequencesq(a )←Normal(0,I).
1 t:t+H
foroptimizationiterationi=1..I do
2
// Evaluate J action sequences from the current belief.
forcandidateactionsequencej =1..J do
3
a(j) ∼q(a )
4 t:t+H t:t+H
s(j) ∼q(s |o ,a ) (cid:81)t+H+1p(s |s ,a(j) )
5 t:t+H+1 t 1:t 1:t−1 τ=t+1 τ τ−1 τ−1
R(j) = (cid:80)t+H+1E[p(r |s(j))]
6 τ=t+1 τ τ
// Re-fit belief to the K best action sequences.
K←argsort({R(j)}J )
7 j=1 1:K
µ = 1 (cid:80) a(k) , σ = 1 (cid:80) |a(k) −µ |.
8 t:t+H K k∈K t:t+H t:t+H K−1 k∈K t:t+H t:t+H
q(a )←Normal(µ ,σ2 I)
9 t:t+H t:t+H t:t+H
returnfirstactionmeanµ .
10 t
12

LearningLatentDynamicsforPlanningfromPixels
C.Multi-TaskLearning
Averageovertasks
1000
800
600
400
200
0
|     |     |     | 5   | 250 500 | 750 | 1000 |     |     |     |
| --- | --- | --- | --- | ------- | --- | ---- | --- | --- | --- |
Figure6:WecompareasinglePlaNetagenttrainedonalltaskstoindividualPlaNetagents. Theplotshowstestperformance
overthenumberofepisodescollectedforeachtask. Thesingleagentlearnstosolveallthetaskswhilelearningmoreslowly
comparedtotheindividualagents. Thelinesshowmeanandonestandarddeviationover6tasks,5seeds,and10trajectories.
|      | CartpoleSwingUp |                 |      | ReacherEasy |                              |      |     | CheetahRun  |      |
| ---- | --------------- | --------------- | ---- | ----------- | ---------------------------- | ---- | --- | ----------- | ---- |
| 1000 |                 |                 | 1000 |             |                              | 1000 |     |             |      |
| 800  |                 |                 | 800  |             |                              |      | 800 |             |      |
| 600  |                 |                 | 600  |             |                              |      | 600 |             |      |
| 400  |                 |                 | 400  |             |                              |      | 400 |             |      |
| 200  |                 |                 | 200  |             |                              |      | 200 |             |      |
| 0    |                 |                 | 0    |             |                              |      | 0   |             |      |
| 5    | 250 500 750     | 1000            | 5    | 250 500     | 750                          | 1000 | 5   | 250 500 750 | 1000 |
|      | FingerSpin      |                 |      | CupCatch    |                              |      |     | WalkerWalk  |      |
| 1000 |                 |                 | 1000 |             |                              | 1000 |     |             |      |
| 800  |                 |                 | 800  |             |                              |      | 800 |             |      |
| 600  |                 |                 | 600  |             |                              |      | 600 |             |      |
| 400  |                 |                 | 400  |             |                              |      | 400 |             |      |
| 200  |                 |                 | 200  |             |                              |      | 200 |             |      |
| 0    |                 |                 | 0    |             |                              |      | 0   |             |      |
| 5    | 250 500 750     | 1000            | 5    | 250 500     | 750                          | 1000 | 5   | 250 500 750 | 1000 |
|      |                 | Separate agents |      |             | D4PG (100k episodes)         |      |     |             |      |
|      |                 | Single agent    |      |             | A3C (100k episodes, proprio) |      |     |             |      |
Figure7: Per-taskperformanceofasinglePlaNetagenttrainedonthesixtasks. Plotsshowtestperformanceoverthe
numberofepisodescollectedpertask. Theagentisnottoldwhichtaskitissolvinganditneedstoinferthisfromtheimage
observations. Theagentlearnstodistinguishthetasksandsolvethemwithjustamoderateslowdowninlearning. Thelines
showmediansandtheareasshowpercentiles5to95over4seedsand10trajectories.
13

LearningLatentDynamicsforPlanningfromPixels
D.LatentOvershooting
|      | CartpoleSwingUp |            |      |      | ReacherEasy |          |                      | CheetahRun  |      |
| ---- | --------------- | ---------- | ---- | ---- | ----------- | -------- | -------------------- | ----------- | ---- |
| 1000 |                 |            |      | 1000 |             |          | 1000                 |             |      |
| 800  |                 |            |      | 800  |             |          | 800                  |             |      |
| 600  |                 |            |      | 600  |             |          | 600                  |             |      |
| 400  |                 |            |      | 400  |             |          | 400                  |             |      |
| 200  |                 |            |      | 200  |             |          | 200                  |             |      |
| 0    |                 |            |      | 0    |             |          | 0                    |             |      |
| 5    | 250             | 500 750    | 1000 | 5    | 250 500     | 750 1000 | 5                    | 250 500 750 | 1000 |
|      |                 | FingerSpin |      |      | CupCatch    |          |                      | WalkerWalk  |      |
| 1000 |                 |            |      | 1000 |             |          | 1000                 |             |      |
| 800  |                 |            |      | 800  |             |          | 800                  |             |      |
| 600  |                 |            |      | 600  |             |          | 600                  |             |      |
| 400  |                 |            |      | 400  |             |          | 400                  |             |      |
| 200  |                 |            |      | 200  |             |          | 200                  |             |      |
| 0    |                 |            |      | 0    |             |          | 0                    |             |      |
| 5    | 250             | 500 750    | 1000 | 5    | 250 500     | 750 1000 | 5                    | 250 500 750 | 1000 |
|      |                 | RSSM       |      |      | DRNN        |          | D4PG (100k episodes) |             |      |
RSSM + Overshooting DRNN + Overshooting A3C (100k episodes, proprio)
Figure8: WecomparethestandardvariationalobjectivewithlatentovershootingonourproposedRSSMandanothermodel
calledDRNNthatusestwoRNNsasencoderanddecoderwithastochasticstatesequenceinbetween. Latentovershooting
cansubstantiallyimprovetheperformanceoftheDRNNandothermodelswehaveexperimentedwith(notshown),but
slightlyreducesperformanceofourRSSM.Thelinesshowmediansandtheareasshowpercentiles5to95over5seedsand
10trajectories.
14

LearningLatentDynamicsforPlanningfromPixels
E.ActivationFunction
|      | CartpoleSwingUp |               |      |      |            | ReacherEasy |                              |      | CheetahRun  |      |
| ---- | --------------- | ------------- | ---- | ---- | ---------- | ----------- | ---------------------------- | ---- | ----------- | ---- |
| 1000 |                 |               |      | 1000 |            |             |                              | 1000 |             |      |
| 800  |                 |               |      | 800  |            |             |                              | 800  |             |      |
| 600  |                 |               |      | 600  |            |             |                              | 600  |             |      |
| 400  |                 |               |      | 400  |            |             |                              | 400  |             |      |
| 200  |                 |               |      | 200  |            |             |                              | 200  |             |      |
| 0    |                 |               |      | 0    |            |             |                              | 0    |             |      |
| 5    | 250             | 500 750       | 1000 |      | 5          | 250 500     | 750 1000                     | 5    | 250 500 750 | 1000 |
|      |                 | FingerSpin    |      |      |            | CupCatch    |                              |      | WalkerWalk  |      |
| 1000 |                 |               |      | 1000 |            |             |                              | 1000 |             |      |
| 800  |                 |               |      | 800  |            |             |                              | 800  |             |      |
| 600  |                 |               |      | 600  |            |             |                              | 600  |             |      |
| 400  |                 |               |      | 400  |            |             |                              | 400  |             |      |
| 200  |                 |               |      | 200  |            |             |                              | 200  |             |      |
| 0    |                 |               |      | 0    |            |             |                              | 0    |             |      |
| 5    | 250             | 500 750       | 1000 |      | 5          | 250 500     | 750 1000                     | 5    | 250 500 750 | 1000 |
|      |                 | PlaNet (ReLU) |      |      | SSM (ReLU) |             | D4PG (100k episodes)         |      |             |      |
|      |                 | PlaNet (ELU)  |      |      | SSM (ELU)  |             | A3C (100k episodes, proprio) |      |             |      |
Figure9: ComparisonofhardReLU(Nair&Hinton,2010)andsmoothELU(Clevertetal.,2015)activationfunctions. We
findthatsmoothactivationshelpimproveperformanceofthepurelystochasticmodel(andthepurelydeterministicmodel;
notshown)whileourproposedRSSMisrobusttothechoiceofactivationfunction. Thelinesshowmediansandtheareas
showpercentiles5to95over5seedsand10trajectories.
15

LearningLatentDynamicsforPlanningfromPixels
F.BoundDerivations
(cid:81)
One-steppredictivedistribution Thevariationalboundforlatentdynamicsmodelsp(o ,s | a ) = p(s |
1:T 1:T 1:T t t
(cid:81)
s ,a )p(o | s ) and a variational posterior q(s | o ,a ) = q(s | o ,a ) follows from importance
t−1 t−1 t t 1:T 1:T 1:T t t ≤t <t
weightingandJensen’sinequalityasshown,
(cid:20) T (cid:21)
(cid:89)
lnp(o |a )(cid:44)lnE p(o |s )
1:T 1:T p(s1:T|a1:T) t t
t=1
(cid:20) T (cid:21)
(cid:89)
=lnE p(o |s )p(s |s ,a )/q(s |o ,a )
q(s1:T|o1:T,a1:T) t t t t−1 t−1 t ≤t <t
t=1
(cid:20) T (cid:21) (8)
(cid:88)
≥E lnp(o |s )+lnp(s |s ,a )−lnq(s |o ,a )
q(s1:T|o1:T,a1:T) t t t t−1 t−1 t ≤t <t
t=1
T
(cid:88)(cid:16) (cid:2) (cid:3)(cid:17)
= E[lnp(o |s )]−E KL[q(s |o ,a )(cid:107)p(s |s ,a )] .
t t t ≤t <t t t−1 t−1
t=1
q(st|o≤t,a<t) q(st−1|o≤t−1,a<a−1 )
reconstruction complexity
Multi-steppredictivedistribution Thevariationalboundonthed-steppredictivedistributionp (o ,s | a ) =
d 1:T 1:T 1:T
(cid:81) (cid:81)
p(s | s ,a )p(o | s ) and a variational posterior q(s | o ,a ) = q(s | o ,a ) follows anal-
t t t−d t−1 t t 1:T 1:T 1:T t t ≤t <t
ogously. The second bound comes from moving the log inside the multi-step priors, which satisfy the recursion
p(s |s ,a )=E [p(s |s ,a )].
t t−d t−d−1:t−1 p(st−1|st−d,at−d−1:t−2) t t−1 t−1
(cid:20) T (cid:21)
(cid:89)
lnp (o |a )(cid:44)lnE p(o |s )
d 1:T 1:T pd(s1:T|a1:T) t t
t=1
(cid:20) T (cid:21)
(cid:89)
=lnE p(o |s )p(s |s ,a )/q(s |o ,a )
q(s1:T|o1:T,a1:T) t t t t−d t−d−1:t−1 t ≤t <t
t=1
(cid:20) T (cid:21)
(cid:88)
≥E lnp(o |s )+lnp(s |s ,a )−lnq(s |o ,a )
q(s1:T|o1:T,a1:T) t t t t−d t−d−1:t−1 t ≤t <t (9)
t=1
(cid:20) T (cid:21)
(cid:88)
≥E lnp(o |s )+E[lnp(s |s ,a )]−lnq(s |o ,a )
q(s1:T|o1:T,a1:T) t t t t−1 t−1 t ≤t <t
t=1
p(st−1|st−d,at−d−1:t−2)
T
(cid:88)(cid:16) (cid:2) (cid:3)(cid:17)
= E [lnp(o |s )]−E KL[q(s |o ,a )(cid:107)p(s |s ,a )] .
q(st|o≤t,a<t) t t t ≤t <t t t−1 t−1
t=1 reconstruction
p(st−1|st−d,at−d−1:t−2)q(st−d|o≤t−d,a<t−d)
multi-stepprediction
Since all expectations are on the outside of the objective, we can easily obtain an unbiased estimator of this bound by
changingexpectationstosampleaverages.
Relationbetweenone-stepandmulti-steppredictivedistributions Weconjecturethatthemulti-steppredictivedis-
tributionp (o )lowerboundstheone-steppredictivedistributionp(o )ofthesamelatentsequencemodelmodelin
d 1:T 1:T
expectationoverthedataset. SincethelatentstatesequenceisMarkovian,ford≥1wehavethedataprocessinginequality
I(s ;s )≤I(s ;s )
t t−d t t−1
H(s )−H(s |s )≤H(s )−H(s |s )
t t t−d t t t−1
(10)
E[lnp(s |s )]≤E[lnp(s |s )]
t t−d t t−1
E[lnp (o )]≤E[lnp(o )].
d 1:T 1:T
Therefore,anyboundonthemulti-steppredictivedistribution,includingEquation9andEquation7,isalsoaboundonthe
one-steppredictivedistribution.
16

LearningLatentDynamicsforPlanningfromPixels
G.AdditionalRelatedWork
Planninginstatespace Whenlow-dimensionalstatesoftheenvironmentareavailabletotheagent,itispossibletolearn
thedynamicsdirectlyinstatespace. Intheregimeofcontroltaskswithonlyafewstatevariables,suchasthecartpole
andmountaincartasks,PILCO(Deisenroth&Rasmussen,2011)achievesremarkablesampleefficiencyusingGaussian
processestomodelthedynamics. Similarapproachesusingneuralnetworksdynamicsmodelscansolvetwo-linkbalancing
problems(Galetal.,2016;Higueraetal.,2018)andimplementplanningviagradients(Henaffetal.,2018). Chuaetal.
(2018)useensemblesofneuralnetworks,scalinguptothecheetahrunningtask. Thelimitationofthesemethodsisthat
theyaccessthelow-dimensionalMarkovianstateoftheunderlyingsystemandsometimestherewardfunction. Amosetal.
(2018)trainadeterministicmodelusingovershootinginobservationspaceforactiveexplorationwitharoboticshand. We
movebeyondlow-dimensionalstaterepresentationsandusealatentdynamicsmodeltosolvecontroltasksfromimages.
Hybrid agents The challenges of model-based RL have motivated the research community to develop hybrid agents
thatacceleratepolicylearningbytrainingonimaginedexperience(Kalweit&Boedecker,2017;Nagabandietal.,2017;
Kurutachetal.,2018;Buckmanetal.,2018;Ha&Schmidhuber,2018),improvingfeaturerepresentations(Wayneetal.,
2018;Igletal.,2018),orleveragingtheinformationcontentofthemodeldirectly(Weberetal.,2017). Srinivasetal.(2018)
learnapolicynetworkwithintegratedplanningcomputationusingreinforcementlearningandwithoutpredictionloss,yet
requireexpertdemonstrationsfortraining.
Multi-steppredictions Trainingsequencemodelsonmulti-steppredictionshasbeenexploredforseveralyears.Scheduled
sampling(Bengioetal.,2015)changestherolloutdistanceofthesequencemodeloverthecourseoftraining. Hallucinated
replay(Talvitie,2014)mixespredictionsintothedatasettoindirectlytrainmulti-steppredictions. Venkatramanetal.(2015)
takeanimitationlearningapproach. Recently,Amosetal.(2018)trainadynamicsmodelonallmulti-steppredictionsat
once. Wegeneralizethisideatolatentsequencemodelstrainedviavariationalinference.
Latentsequencemodels Classicworkhasexploredmodelsfornon-Markovianobservationsequences,includingrecurrent
neuralnetworks(RNNs)withdeterministichiddenstateandprobabilisticstate-spacemodels(SSMs). Theideasbehind
variationalautoencoders(Kingma&Welling,2013;Rezendeetal.,2014)haveenablednon-linearSSMsthataretrainedvia
variationalinference(Krishnanetal.,2015). TheVRNN(Chungetal.,2015)combinesRNNsandSSMsandistrainedvia
variationalinference. IncontrasttoourRSSM,itfeedsgeneratedobservationsbackintothemodelwhichmakesforward
predictionsexpensive. Karletal.(2016)addressmodecollapsetoasinglefuturebyrestrictingthetransitionfunction,
(Moerlandetal.,2017)focusonmulti-modaltransitions, andDoerretal.(2018)stabilizetrainingofpurelystochastic
models. Buesingetal.(2018)proposeamodelsimilartooursbutuseinahybridagentinsteadforexplicitplanning.
Videoprediction Videopredictionisanactiveareaofresearchindeeplearning. Ohetal.(2015)andChiappaetal.(2017)
achievevisuallyplausiblepredictionsonAtarigamesusingdeterministicmodels. Kalchbrenneretal.(2016)introduce
anautoregressivevideopredictionmodelusinggatedCNNsandLSTMs. Recentapproachesintroducestochasticityto
themodeltocapturemultiplefutures(Babaeizadehetal.,2017;Denton&Fergus,2018). Toobtainrealisticpredictions,
Mathieuetal.(2015)andVondricketal.(2016)useadversariallosses. Insimulatedenvironments,Gemicietal.(2017)
augmentdynamicsmodelswithanexternalmemorytorememberlong-timecontexts. vandenOordetal.(2017)proposea
variationalmodelthatavoidssamplingusinganearestneighborlook-up,yieldinghighfidelityimagepredictions. These
modelsarecomplimentarytoourapproach.
17

LearningLatentDynamicsforPlanningfromPixels
H.VideoPredictions
teNalP
eurT
Context 6 10 15 20 25 30 35 40 45 50
gnitoohsrevO+teNalP
ledoM
eurT
ledoM
eurT
ledoM
eurT
Context 6 10 15 20 25 30 35 40 45 50
)URG(citsinimreteD
ledoM
eurT
ledoM
eurT
ledoM
eurT
Context 6 10 15 20 25 30 35 40 45 50
)MSS(citsahcotS
ledoM
eurT
ledoM
eurT
ledoM
eurT
Context 6 10 15 20 25 30 35 40 45 50
ledoM
eurT
ledoM
eurT
ledoM
Figure10: Open-loopvideopredictionsfortestepisodes. Thecolumns1–5showreconstructedcontextframesandthe
remainingimagesaregeneratedopen-loop. OurRSSMachievespixel-accuratepredictionsfor50stepsintothefutureinthe
cheetahenvironment. Werandomlyselectedactionsequencesfromtestepisodescollectedwithactionnoisealongsidethe
trainingepisodes.
18

LearningLatentDynamicsforPlanningfromPixels
I.StateDiagnostics
Figure11: Open-loopstatediagnostics. WefreezethedynamicsmodelofaPlaNetagentandlearnsmallneuralnetworksto
predictthetruepositions,velocities,andrewardofthesimulator. Theopen-looppredictionsofthesequantitiesshowthat
mostinformationabouttheunderlyingsystemispresentinthelearnedlatentspaceandcanbeaccuratelypredictedforward
furtherthantheplanninghorizonsusedinthiswork.
19

LearningLatentDynamicsforPlanningfromPixels
J.PlanningParameters
3.0
5.0
10.0
15.0
snoitareti
fraction=0.05 horizon=6.0 fraction=0.05 horizon=8.0 fraction=0.05 horizon=10.0 fraction=0.05 horizon=12.0 fraction=0.05 horizon=14.0
3.0
5.0
10.0
15.0
snoitareti
fraction=0.1 horizon=6.0 fraction=0.1 horizon=8.0 fraction=0.1 horizon=10.0 fraction=0.1 horizon=12.0 fraction=0.1 horizon=14.0
3.0
5.0
10.0
15.0
snoitareti
fraction=0.3 horizon=6.0 fraction=0.3 horizon=8.0 fraction=0.3 horizon=10.0 fraction=0.3 horizon=12.0 fraction=0.3 horizon=14.0
3.0
5.0
10.0
15.0
100.0 300.0 500.0 1000.0
proposals
snoitareti
fraction=0.5 horizon=6.0 fraction=0.5 horizon=8.0 fraction=0.5 horizon=10.0 fraction=0.5 horizon=12.0 fraction=0.5 horizon=14.0
100.0 300.0 500.0 1000.0 100.0 300.0 500.0 1000.0 100.0 300.0 500.0 1000.0 100.0 300.0 500.0 1000.0
proposals proposals proposals proposals
Figure 12: Planning performance on the cheetah running task with the true simulator using different planner settings.
Performancerangesfrom132(blue)to837(yellow). Evaluatingmoreactionsequences,optimizingformoreiterations,and
re-fittingtofewerofthebestproposalstendtoimproveperformance. Aplanninghorizonlengthof6isnotsufficientand
resultsinpoorperformance. Muchlongerplanninghorizonshurtperformancebecauseoftheincreasedsearchspace. For
thisenvironment,bestplanninghorizonlengthisnear8steps.
20
