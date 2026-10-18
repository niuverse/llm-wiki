|     |     | A Reduction  |     | of Imitation |           | Learning         | and             | Structured |     |                 | Prediction |     |     |     |
| --- | --- | ------------ | --- | ------------ | --------- | ---------------- | --------------- | ---------- | --- | --------------- | ---------- | --- | --- | --- |
|     |     |              |     | to           | No-Regret |                  | Online Learning |            |     |                 |            |     |     |     |
|     |     | StéphaneRoss |     |              |           | GeoffreyJ.Gordon |                 |            |     | J.AndrewBagnell |            |     |     |     |
RoboticsInstitute MachineLearningDepartment RoboticsInstitute
CarnegieMellonUniversity CarnegieMellonUniversity CarnegieMellonUniversity
Pittsburgh,PA15213,USA Pittsburgh,PA15213,USA Pittsburgh,PA15213,USA
|     | stephaneross@cmu.edu |     |     |     |     | ggordon@cs.cmu.edu |     |     |     | dbagnell@ri.cmu.edu |     |     |     |     |
| --- | -------------------- | --- | --- | --- | --- | ------------------ | --- | --- | --- | ------------------- | --- | --- | --- | --- |
Abstract
|     |     |     |     |     |     |     | strations   | of good | behavior |     | are used | to learn | a controller, |        |
| --- | --- | --- | --- | --- | --- | --- | ----------- | ------- | -------- | --- | -------- | -------- | ------------- | ------ |
|     |     |     |     |     |     |     | have proven | very    | useful   | in  | practice | and have | led to        | state- |
of-theartperformanceinavarietyofapplications(Schaal,
Sequentialpredictionproblemssuchasimitation
|     |           |       |        |              |        |     | 1999; Abbeel |     | and Ng, | 2004; | Ratliff | et al., | 2006; | Silver |
| --- | --------- | ----- | ------ | ------------ | ------ | --- | ------------ | --- | ------- | ----- | ------- | ------- | ----- | ------ |
|     | learning, | where | future | observations | depend | on  |              |     |         |       |         |         |       |        |
etal.,2008;Argalletal.,2009;ChernovaandVeloso,2009;
|     | previous  | predictions                        | (actions), | violate | the | com- |          |          |        |     |         |          |              |     |
| --- | --------- | ---------------------------------- | ---------- | ------- | --- | ---- | -------- | -------- | ------ | --- | ------- | -------- | ------------ | --- |
|     |           |                                    |            |         |     |      | Ross and | Bagnell, | 2010). | A   | typical | approach | to imitation |     |
|     | moni.i.d. | assumptionsmadeinstatisticallearn- |            |         |     |      |          |          |        |     |         |          |              |     |
learningistotrainaclassifierorregressortopredictanex-
|     | ing. This | leads        | to poor | performance | in         | theory |                 |     |       |          |      |                    |     |     |
| --- | --------- | ------------ | ------- | ----------- | ---------- | ------ | --------------- | --- | ----- | -------- | ---- | ------------------ | --- | --- |
|     |           |              |         |             |            |        | pert’s behavior |     | given | training | data | of the encountered |     | ob- |
|     | and often | in practice. |         | Some recent | approaches |        |                 |     |       |          |      |                    |     |     |
servations(input)andactions(output)performedbytheex-
(DauméIIIetal.,2009;RossandBagnell,2010)
|     |     |     |     |     |     |     | pert. However |     | since | the learner’s | prediction |     | affects | future |
| --- | --- | --- | --- | --- | --- | --- | ------------- | --- | ----- | ------------- | ---------- | --- | ------- | ------ |
providestrongerguaranteesinthissetting,butre-
|     |     |     |     |     |     |     | input observations/states |     |     | during | execution | of  | the | learned |
| --- | --- | --- | --- | --- | --- | --- | ------------------------- | --- | --- | ------ | --------- | --- | --- | ------- |
mainsomewhatunsatisfactoryastheytraineither
|     |                |     |            |          |     |         | policy, this | violate | the | crucial | i.i.d. | assumption | made | by  |
| --- | -------------- | --- | ---------- | -------- | --- | ------- | ------------ | ------- | --- | ------- | ------ | ---------- | ---- | --- |
|     | non-stationary | or  | stochastic | policies | and | require |              |         |     |         |        |            |      |     |
moststatisticallearningapproaches.
|     | a large | number | of iterations. | In  | this paper, | we  |     |     |     |     |     |     |     |     |
| --- | ------- | ------ | -------------- | --- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
proposeanewiterativealgorithm,whichtrainsa Ignoring this issue leads to poor performance both in the-
stationary deterministic policy, that can be seen ory and practice (Ross and Bagnell, 2010). In particular,
asanoregretalgorithminanonlinelearningset-
|     |     |     |     |     |     |     | a classifier | that | makes | a mistake | with | probability | (cid:15) | under |
| --- | --- | --- | --- | --- | --- | --- | ------------ | ---- | ----- | --------- | ---- | ----------- | -------- | ----- |
ting. Weshowthatanysuchnoregretalgorithm, the distribution of states/observations encountered by the
combinedwithadditionalreductionassumptions, expert can make as many as T2(cid:15) mistakes in expectation
mustfindapolicywithgoodperformanceunder over T-steps under the distribution of states the classifier
thedistributionofobservationsitinducesinsuch itselfinduces(RossandBagnell,2010). Intuitivelythisis
|     | sequential | settings. | We  | demonstrate |     | that this |     |     |     |     |     |     |     |     |
| --- | ---------- | --------- | --- | ----------- | --- | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
becauseassoonasthelearnermakesamistake,itmayen-
new approach outperforms previous approaches countercompletelydifferentobservationsthanthoseunder
on two challenging imitation learning problems expertdemonstration,leadingtoacompoundingoferrors.
andabenchmarksequencelabelingproblem.
Recentapproaches(RossandBagnell,2010)canguarantee
anexpectednumberofmistakeslinear(ornearlyso)inthe
|     |     |     |     |     |     |     | task horizon | T   | and error | (cid:15) | by training | over | several | itera- |
| --- | --- | --- | --- | --- | --- | --- | ------------ | --- | --------- | -------- | ----------- | ---- | ------- | ------ |
1 INTRODUCTION
tionsandallowingthelearnertoinfluencetheinputstates
whereexpertdemonstrationisprovided(throughexecution
SequencePredictionproblemsarisecommonlyinpractice.
|               |     |              |         |      |     |              | ofitsowncontrolsinthesystem). |       |        |                  | Oneapproach(Rossand |        |             |     |
| ------------- | --- | ------------ | ------- | ---- | --- | ------------ | ----------------------------- | ----- | ------ | ---------------- | ------------------- | ------ | ----------- | --- |
| For instance, |     | most robotic | systems | must | be  | able to pre- |                               |       |        |                  |                     |        |             |     |
|               |     |              |         |      |     |              | Bagnell,                      | 2010) | learns | a non-stationary |                     | policy | by training |     |
dict/makeasequenceofactionsgivenasequenceofobser-
|     |     |     |     |     |     |     | a different | policy | for | each time | step | in sequence, |     | starting |
| --- | --- | --- | --- | --- | --- | --- | ----------- | ------ | --- | --------- | ---- | ------------ | --- | -------- |
vationsrevealedtothemovertime.Incomplexroboticsys-
|     |     |     |     |     |     |     | fromthefirststep. |     | Unfortunatelythisisimpracticalwhen |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ----------------- | --- | ---------------------------------- | --- | --- | --- | --- | --- |
tems where standard control methods fail, we must often T is large or ill-defined. Another approach called SMILe
| resort | to learning | a controller |     | that can | make | such predic- |           |          |        |         |     |          |        |     |
| ------ | ----------- | ------------ | --- | -------- | ---- | ------------ | --------- | -------- | ------ | ------- | --- | -------- | ------ | --- |
|        |             |              |     |          |      |              | (Ross and | Bagnell, | 2010), | similar |     | to SEARN | (Daumé | III |
tions. Imitationlearningtechniques,whereexpertdemon-
etal.,2009)andCPI(KakadeandLangford,2002),trains
|     |     |     |     |     |     |     | a stationary | stochastic |     | policy | (a finite | mixture | of policies) |     |
| --- | --- | --- | --- | --- | --- | --- | ------------ | ---------- | --- | ------ | --------- | ------- | ------------ | --- |
AppearinginProceedingsofthe14thInternationalConferenceon
|     |     |     |     |     |     |     | by adding | a new | policy | to the | mixture | at each | iteration | of  |
| --- | --- | --- | --- | --- | --- | --- | --------- | ----- | ------ | ------ | ------- | ------- | --------- | --- |
ArtificialIntelligenceandStatistics(AISTATS)2011,FortLaud-
training. Howeverthismaybeunsatisfactoryforpractical
| erdale, | FL, USA. | Volume | 15 of | JMLR: | W&CP | 15. Copyright |     |     |     |     |     |     |     |     |
| ------- | -------- | ------ | ----- | ----- | ---- | ------------- | --- | --- | --- | --- | --- | --- | --- | --- |
2011bytheauthors. applicationsassomepoliciesinthemixtureareworsethan
     627

AReductionofImitationLearningandStructuredPredictiontoNo-RegretOnlineLearning
othersandthelearnedcontrollermaybeunstable. Inimitationlearning,wemaynotnecessarilyknoworob-
|            |     |                    |     |     |               |          | serve true | costs | C(s,a) | for the | particular | task. |     | Instead, |
| ---------- | --- | ------------------ | --- | --- | ------------- | -------- | ---------- | ----- | ------ | ------- | ---------- | ----- | --- | -------- |
| We propose | a   | new meta-algorithm |     |     | for imitation | learning |            |       |        |         |            |       |     |          |
weobserveexpertdemonstrationsandseektoboundJ(π)
| which learns                 | a                 | stationary | deterministic                  |       | policy       | guaranteed |          |               |            |          |              |              |           |               |
| ---------------------------- | ----------------- | ---------- | ------------------------------ | ----- | ------------ | ---------- | -------- | ------------- | ---------- | -------- | ------------ | ------------ | --------- | ------------- |
|                              |                   |            |                                |       |              |            | for any  | cost function | C          | based    | on how       | well         | π mimics  | the           |
| to perform                   | well              | under      | its induced                    |       | distribution | of states  |          |               |            |          |              |              |           |               |
|                              |                   |            |                                |       |              |            | expert’s | policy        | π∗. Denote | (cid:96) | the observed |              | surrogate | loss          |
| (number                      | of mistakes/costs |            | that                           | grows | linearly     | in T and   |          |               |            |          |              |              |           |               |
|                              |                   |            |                                |       |              |            | function | we minimize   |            | instead  | of C.        | For instance |           | (cid:96)(s,π) |
| classificationcost(cid:15)). |                   |            | Wetakeareduction-basedapproach |       |              |            |          |               |            |          |              |              |           |               |
|                              |                   |            |                                |       |              |            | may be   | the expected  | 0-1        | loss     | of π with    | respect      | to        | π∗ in         |
(Beygelzimeretal.,2005)thatenablesreusingexistingsu-
states,orasquared/hingelossofπwithrespecttoπ∗ins.
| pervised   | learning | algorithms. |            | Our | approach | is simple to   |              |     |                 |     |       |              |        |      |
| ---------- | -------- | ----------- | ---------- | --- | -------- | -------------- | ------------ | --- | --------------- | --- | ----- | ------------ | ------ | ---- |
|            |          |             |            |     |          |                | Importantly, | in  | many instances, |     | C and | (cid:96) may | be the | same |
| implement, | has      | no free     | parameters |     | except   | the supervised |              |     |                 |     |       |              |        |      |
function–forinstance,ifweareinterestedinoptimizingthe
| learning | algorithm | sub-routine, |     | and | requires | a number of |     |     |     |     |     |     |     |     |
| -------- | --------- | ------------ | --- | --- | -------- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- |
learner’sabilitytopredicttheactionschosenbyanexpert.
iterationsthatscalesnearlylinearlywiththeeffectivehori-
zonoftheproblem. Itnaturallyhandlescontinuousaswell Ourgoalistofindapolicyπˆwhichminimizestheobserved
as discrete predictions. Our approach is closely related to surrogatelossunderitsinduceddistributionofstates,i.e.:
| no regret   | online | learning | algorithms   |     | (Cesa-Bianchi       | et al., |     |     |             |     |                 |     |     |     |
| ----------- | ------ | -------- | ------------ | --- | ------------------- | ------- | --- | --- | ----------- | --- | --------------- | --- | --- | --- |
|             |        |          |              |     |                     |         |     |     | πˆ =argminE |     | [(cid:96)(s,π)] |     |     | (1) |
| 2004; Hazan | et     | al.,     | 2006; Kakade |     | and Shalev-Shwartz, |         |     |     |             |     | s∼dπ            |     |     |     |
π∈Π
| 2008) (in | particular | Follow-The-Leader) |          |               | but | better lever- |     |     |     |     |     |     |     |     |
| --------- | ---------- | ------------------ | -------- | ------------- | --- | ------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| ages the  | expert     | in our             | setting. | Additionally, |     | we show that  |     |     |     |     |     |     |     |     |
Assystemdynamicsareassumedbothunknownandcom-
anyno-regretlearnercanbeusedinaparticularfashionto plex,wecannotcomputed andcanonlysampleitbyexe-
π
learnapolicythatachievessimilarguarantees. cutingπinthesystem.Hencethisisanon-i.i.d.supervised
learningproblemduetothedependenceoftheinputdistri-
Webeginbyestablishingournotationandsetting,discuss
|               |     |      |         |            |     |              | butiononthepolicyπ |     | itself. | Theinteractionbetweenpol- |     |     |     |     |
| ------------- | --- | ---- | ------- | ---------- | --- | ------------ | ------------------ | --- | ------- | ------------------------- | --- | --- | --- | --- |
| related work, | and | then | present | the DAGGER |     | (Dataset Ag- |                    |     |         |                           |     |     |     |     |
gregation) method. We analyze this approach using a no- icyandtheresultingdistributionmakesoptimizationdiffi-
cultasitresultsinanon-convexobjectiveeveniftheloss
regretandareductionapproach(Beygelzimeretal.,2005).
|        |               |     |           |     |          |            | (cid:96)(s,·)isconvexinπforallstatess. |     |     |     | Wenowbrieflyreview |     |     |     |
| ------ | ------------- | --- | --------- | --- | -------- | ---------- | -------------------------------------- | --- | --- | --- | ------------------ | --- | --- | --- |
| Beyond | the reduction |     | analysis, | we  | consider | the sample |                                        |     |     |     |                    |     |     |     |
previousapproachesandtheirguarantees.
| complexity | of  | our approach |     | using | online-to-batch | (Cesa- |     |     |     |     |     |     |     |     |
| ---------- | --- | ------------ | --- | ----- | --------------- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
Bianchietal.,2004)techniques.WedemonstrateDAGGER
isscalableandoutperformspreviousapproachesinpractice 2.1 SupervisedApproachtoImitation
| on two challenging |     | imitation |     | learning | problems: | 1) learn- |                 |     |          |              |     |          |         |     |
| ------------------ | --- | --------- | --- | -------- | --------- | --------- | --------------- | --- | -------- | ------------ | --- | -------- | ------- | --- |
|                    |     |           |     |          |           |           | The traditional |     | approach | to imitation |     | learning | ignores | the |
ingtosteeracarina3Dracinggame(SuperTuxKart)and
changeindistributionandsimplytrainsapolicyπthatper-
2)andlearningtoplaySuperMarioBros.,giveninputim-
formswellunderthedistributionofstatesencounteredby
agefeaturesandcorrespondingactionsbyahumanexpert
and near-optimal planner respectively. Following Daumé the expert d π∗ . This can be achieved using any standard
|     |     |     |     |     |     |     | supervisedlearningalgorithm. |     |     |     | Itfindsthepolicyπˆ |     |     | :   |
| --- | --- | --- | --- | --- | --- | --- | ---------------------------- | --- | --- | --- | ------------------ | --- | --- | --- |
III et al. (2009) in treating structured prediction as a de- sup
generateimitationlearningproblem,weapplyDAGGERto
|                                                  |     |         |             |      |     |                  |     | πˆ  | =argminE |     |       | [(cid:96)(s,π)] |     | (2) |
| ------------------------------------------------ | --- | ------- | ----------- | ---- | --- | ---------------- | --- | --- | -------- | --- | ----- | --------------- | --- | --- |
|                                                  |     |         |             |      |     |                  |     | sup |          |     | s∼dπ∗ |                 |     |     |
| theOCR(Taskaretal.,2003)benchmarkpredictionprob- |     |         |             |      |     |                  |     |     |          | π∈Π |       |                 |     |     |
| lem achieving                                    |     | results | competitive | with | the | state-of-the-art |     |     |          |     |       |                 |     |     |
(Taskar et al., 2003; Ratliff et al., 2007; Daumé III et al., Assuming(cid:96)(s,π)isthe0-1loss(orupperboundonthe0-
|     |     |     |     |     |     |     | 1 loss) implies |     | the following |     | performance | guarantee |     | with |
| --- | --- | --- | --- | --- | --- | --- | --------------- | --- | ------------- | --- | ----------- | --------- | --- | ---- |
2009)usingonlysingle-pass,greedyprediction.
|     |     |     |     |     |     |     | respecttoanytaskcostfunctionC |      |       |     | boundedin[0,1]: |     |       |     |
| --- | --- | --- | --- | --- | --- | --- | ----------------------------- | ---- | ----- | --- | --------------- | --- | ----- | --- |
|     |     |     |     |     |     |     | Theorem                       | 2.1. | (Ross | and | Bagnell,        |     | 2010) | Let |
2 PRELIMINARIES
E [(cid:96)(s,π)]=(cid:15),thenJ(π)≤J(π∗)+T2(cid:15).
s∼dπ∗
| We begin | by introducing |     | notation | relevant |     | to our setting. |                |     |             |     |      |             |     |        |
| -------- | -------------- | --- | -------- | -------- | --- | --------------- | -------------- | --- | ----------- | --- | ---- | ----------- | --- | ------ |
|          |                |     |          |          |     |                 | Proof. Follows |     | from result | in  | Ross | and Bagnell |     | (2010) |
WedenotebyΠtheclassofpoliciesthelearnerisconsid-
|           |                 |     |     |                |     |         | since(cid:15)isanupperboundonthe0-1lossofπind |     |     |     |     |     |     | .   |
| --------- | --------------- | --- | --- | -------------- | --- | ------- | --------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
| eringandT | thetaskhorizon. |     |     | Foranypolicyπ, |     | weletdt |                                               |     |     |     |     |     | π∗  |     |
π
denotethedistributionofstatesattimetifthelearnerexe-
|                   |     |                     |                                   |               |                |       | Note that    | this       | bound is      | tight,       | i.e.       | there exist | problems  |        |
| ----------------- | --- | ------------------- | --------------------------------- | ------------- | -------------- | ----- | ------------ | ---------- | ------------- | ------------ | ---------- | ----------- | --------- | ------ |
| cutedpolicyπ      |     | fromtimestep1tot−1. |                                   |               | Furthermore,we |       |              |            |               |              |            |             |           |        |
|                   |     |                     |                                   |               |                |       | such that    | a policy   | π with        | (cid:15) 0-1 | loss       | on d        | can incur | ex-    |
| denoted           | = 1 | (cid:80)T           | dt theaveragedistributionofstates |               |                |       |              |            |               |              |            | π∗          |           |        |
|                   | π T | t=1                 | π                                 |               |                |       |              |            |               |              |            |             |           |        |
|                   |     |                     |                                   |               |                |       | tra cost     | that grows | quadratically |              | in T.      | Kääriäinen  |           | (2006) |
| ifwefollowpolicyπ |     |                     | forT steps.                       | Givenastates, |                | wede- |              |            |               |              |            |             |           |        |
|                   |     |                     |                                   |               |                |       | demonstrated | this       | in a          | sequence     | prediction |             | setting1  | and    |
noteC(s,a)theexpectedimmediatecostofperformingac-
tionainstatesforthetaskweareconsideringanddenote
|     |     |     |     |     |     |     | 1In their | example, | an  | error rate | of (cid:15) | > 0 when | trained | to  |
| --- | --- | --- | --- | --- | --- | --- | --------- | -------- | --- | ---------- | ----------- | -------- | ------- | --- |
E
C (s) = [C(s,a)]theexpectedimmediatecostof predict the next output in sequence with the previous correct
| π   | a∼π(s) |     |     |     |     |     |     |     |     |     |     |     |     |     |
| --- | ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
π in s. We assume C is bounded in [0,1]. The total cost output as input can lead to an expected number of mistakes of
1−(1−2(cid:15))T+1
of executing policy π for T-steps (i.e., the cost-to-go) is T − + 1 oversequencesoflengthT attesttime.
|     |     | (cid:80)T |     |     |     |     | 2   | 4(cid:15) | 2   |     |     |     |     |     |
| --- | --- | --------- | --- | --- | --- | --- | --- | --------- | --- | --- | --- | --- | --- | --- |
denotedJ(π)= E [C (s)]=TE [C (s)]. T hisisboun dedbyT2 (cid:15)andbehavesasΘ(T2(cid:15))forsmall(cid:15).
|     |     | t=1 | s∼dt | π   |     | s∼dπ π |     |     |     |     |     |     |     |     |
| --- | --- | --- | ---- | --- | --- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
π
     628

StéphaneRoss, GeoffreyJ.Gordon, J.AndrewBagnell
RossandBagnell(2010)providedanimitationlearningex- ditional supervised learning approach. However, in many
amplewhereJ(πˆ )=(1−(cid:15)T)J(π∗)+T2(cid:15). Hencethe cases u is O(1) or sub-linear in T and the forward algo-
sup
traditional supervised learning approach has poor perfor- rithmleadstoimprovedperformance. ForinstanceifC is
manceguaranteesduetothequadraticgrowthinT.Instead the0-1losswithrespecttotheexpert, thenu ≤ 1. Addi-
wewouldpreferapproachesthatcanguaranteegrowthlin- tionallyifπ∗isabletorecoverfrommistakesmadebyπ,in
earornear-linearinT and(cid:15).Thefollowingtwoapproaches thesensethatwithinafewsteps,π∗isbackinadistribution
fromRossandBagnell(2010)achievethisonsomeclasses ofstatesthatisclosetowhatπ∗wouldbeinifπ∗hadbeen
of imitation learning problems, including all those where executed initially instead of π, then u will be O(1). 2 A
surrogateloss(cid:96)upperboundsC. drawbackoftheforwardalgorithmisthatitisimpractical
whenT islarge(orundefined)aswemusttrainT different
2.2 ForwardTraining policiessequentiallyandcannotstopthealgorithmbefore
we complete all T iterations. Hence it can not be applied
The forward training algorithm introduced by Ross and tomostreal-worldapplications.
Bagnell (2010) trains a non-stationary policy (one policy
π foreachtimestept)iterativelyoverT iterations,where
t 2.3 StochasticMixingIterativeLearning
atiterationt, π istrainedtomimicπ∗ onthedistribution
t
of states at time t induced by the previously trained poli- SMILe, proposed by Ross and Bagnell (2010), alleviates
cies π 1 ,π 2 ,...,π t−1 . By doing so, π t is trained on the this problem and can be applied in practice when T is
actual distribution of states it will encounter during exe- large or undefined by adopting an approach similar to
cutionofthelearnedpolicy. Hencetheforwardalgorithm SEARN (Daumé III et al., 2009) where a stochastic sta-
guarantees that the expected loss under the distribution of tionary policy is trained over several iterations. Initially
states induced by the learned policy matches the average SMILe starts with a policy π which always queries and
0
lossduringtraining,andhenceimprovesperformance. executes the expert’s action choice. At iteration n, a pol-
icy πˆ is trained to mimic the expert under the distribu-
We here provide a theorem slightly more general than the n
tion of trajectories π induces and then updates π =
one provided by Ross and Bagnell (2010) that applies to n−1 n
π +α(1−α)n−1(πˆ −π ). Thisupdateisinterpreted
any policy π that can guarantee (cid:15) surrogate loss under its n−1 n 0
asaddingprobabilityα(1−α)n−1 toexecutingpolicyπˆ
owndistributionofstates. Thiswillbeusefultoboundthe n
at any step and removing probability α(1−α)n−1 of ex-
performanceofournewapproachpresentedinSection3.
ecuting the queried expert’s action. At iteration n, π is
n
LetQπ
t
(cid:48)(s,π)denotethet-stepcostofexecutingπininitial
a mixture of n policies and the probability of using the
state s and thenfollowing policy π(cid:48) and assume (cid:96)(s,π) is queried expert’s action is (1 − α)n. We can stop the al-
the 0-1 loss (or an upper bound on the 0-1 loss), then we gorithm at any iteration N by returning the re-normalized
have the following performance guarantee with respect to
policyπ˜ =
πN−(1−α)Nπ0
whichdoesn’tquerytheexpert
anytaskcostfunctionC boundedin[0,1]: N 1−(1−α)N
anymore. Ross and Bagnell (2010) showed that choosing
Q Th π T e ∗ − o t r + e 1 m (s 2 , . a 2 ) . − Le Q t π T π ∗ − b t e +1 su (s c , h π t ∗ h ) at ≤ E s u ∼ f d o π r [(cid:96) a ( l s l , a π c ) t ] io = na (cid:15), , a t n ∈ d α reg in ret O i ( n T T 1 2 ) an a d nd (cid:15) N for i s n o O m ( e T c 2 la l s o s g o T f ) pr g o u b a l r e a m n s te . es near-linear
{1,2,...,T},dt(s)>0,thenJ(π)≤J(π∗)+uT(cid:15).
π
3 DATASETAGGREGATION
Proof. WeherefollowasimilarprooftoRossandBagnell
(2010). Givenourpolicyπ,considerthepolicyπ ,which
1:t
executes π in the first t-steps and then execute the expert We now present DAGGER (Dataset Aggregation), an it-
π∗. Then erative algorithm that trains a deterministic policy that
achieves good performance guarantees under its induced
J(π)
distributionofstates.
=J(π∗)+ (cid:80)T−1[J(π )−J(π )]
t=0 1:T−t 1:T−t−1
=J(π∗)+ (cid:80)T E [Qπ∗ (s,π)−Qπ∗ (s,π∗)] In its simplest form, the algorithm proceeds as follows.
≤J(π∗)+u (cid:80) t= T 1 s E ∼dt π [(cid:96) T ( − s t , + π 1 )] T−t+1 At the first iteration, it uses the expert’s policy to gather
=J(π∗)+uT(cid:15) t=1 s∼dt π a dataset of trajectories D and train a policy πˆ 2 that best
mimics the expert on those trajectories. Then at iteration
The inequality follows from the fact that (cid:96)(s,π) upper n, it uses πˆ n to collect more trajectories and adds those
bounds the 0-1 loss, and hence the probability π and π∗ trajectories to the dataset D. The next policy πˆ n+1 is the
pickdifferentactionsins;whentheypickdifferentactions, policythatbestmimicstheexpertonthewholedatasetD.
theincreaseincost-to-go≤u.
2This is the case for instance in Markov Desision Processes
(MDPs)whentheMarkovChaindefinedbythesystemdynamics
In the worst case, u could be O(T) and the forward al- and policy π∗ is rapidly mixing. In particular, if it is α-mixing
gorithm wouldn’t provide any improvement over the tra- withexponentialdecayrateδthenuisO( 1 ).
1−exp(−δ)
629

AReductionofImitationLearningandStructuredPredictiontoNo-RegretOnlineLearning
InitializeD ←∅. In particular, this holds for the policy πˆ =
Initializeπˆ toanypolicyinΠ. argmin E [(cid:96)(s,π)]. 3 If the task cost
|     | 1   |     |     |     |     |     |     | π∈πˆ1:N | s∼dπ |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------- | ---- | --- | --- | --- | --- | --- |
fori=1toN do function C corresponds to (or is upper bounded by) the
Letπ =β π∗+(1−β )πˆ . surrogate loss (cid:96) then this bound tells us directly that
|                                | i   | i   | i i |     |     |     |         |                  |     |               |     |           |          |     |
| ------------------------------ | --- | --- | --- | --- | --- | --- | ------- | ---------------- | --- | ------------- | --- | --------- | -------- | --- |
|                                |     |     |     |     |     |     | J(πˆ) ≤ | T(cid:15) +O(1). |     | For arbitrary |     | task cost | function | C,  |
| SampleT-steptrajectoriesusingπ |     |     |     | i . |     |     |         | N                |     |               |     |           |          |     |
GetdatasetD = {(s,π∗(s))}ofvisitedstatesbyπ thenif(cid:96)isanupperboundonthe0-1losswithrespectto
|     |     | i   |     |     |     | i   |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
andactionsgivenbyexpert. π∗,combiningthisresultwithTheorem2.2yieldsthat:
(cid:83)
| Aggregatedatasets: |     | D    | ←D  | D i . |     |     |             |     |                             |     | isO˜(uT)thereexistsa |     |        |     |
| ------------------ | --- | ---- | --- | ----- | --- | --- | ----------- | --- | --------------------------- | --- | -------------------- | --- | ------ | --- |
|                    |     |      |     |       |     |     | Theorem3.2. |     | For DAGGER,ifN              |     |                      |     |        |     |
| Trainclassifierπˆ  |     | onD. |     |       |     |     |             |     |                             |     |                      |     |        |     |
|                    |     | i+1  |     |       |     |     | policyπˆ    | ∈πˆ | s.t. J(πˆ)≤J(π∗)+uT(cid:15) |     |                      |     | +O(1). |     |
|                    |     |      |     |       |     |     |             | 1:N |                             |     |                      | N   |        |     |
endfor
| Returnbestπˆ |               | onvalidation. |                  |     |     |     |         |             |         |                                       |         |        |           |             |
| ------------ | ------------- | ------------- | ---------------- | --- | --- | --- | ------- | ----------- | ------- | ------------------------------------- | ------- | ------ | --------- | ----------- |
|              |               | i             |                  |     |     |     | Finite  | Sample      | Results | In the                                | finite  | sample | case,     | sup-        |
|              | Algorithm3.1: |               | DAGGERAlgorithm. |     |     |     |         |             |         |                                       |         |        |           |             |
|              |               |               |                  |     |     |     | pose we | sample      | m       | trajectories                          | with    | π      | i at each | it-         |
|              |               |               |                  |     |     |     | eration | i, and      | denote  | this                                  | dataset | D .    | Let       | (cid:15)ˆ = |
|              |               |               |                  |     |     |     |         |             |         |                                       |         | i      |           | N           |
|              |               |               |                  |     |     |     | min     | 1 (cid:80)N | E       | [(cid:96)(s,π)]bethetraininglossofthe |         |        |           |             |
|              |               |               |                  |     |     |     | π∈Π     |             | s∼Di    |                                       |         |        |           |             |
|              |               |               |                  |     |     |     |         | N i=1       |         |                                       |         |        |           |             |
bestpolicyonthesampledtrajectories,thenusingAzuma-
| Inotherwords, |     | DAGGER | proceedsbycollectingadataset |     |     |     |     |     |     |     |     |     |     |     |
| ------------- | --- | ------ | ---------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Hoeffding’sinequalityleadstothefollowingguarantee:
ateachiterationunderthecurrentpolicyandtrainsthenext
policyundertheaggregateofallcollecteddatasets. Thein- isO(T2log(1/δ))and
|     |     |     |     |     |     |     | Theorem3.3. |     | For DAGGER,ifN |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --- | -------------- | --- | --- | --- | --- | --- |
tuitionbehindthisalgorithmisthatovertheiterations,we misO(1)thenwithprobabilityatleast1−δthereexistsa
are building up the set of inputs that the learned policy is policyπˆ ∈πˆ s.t. E [(cid:96)(s,πˆ)]≤(cid:15)ˆ +O(1/T)
|     |     |     |     |     |     |     |     | 1:N | s∼dπˆ |     |     | N   |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- |
likelytoencounterduringitsexecutionbasedonprevious
experience (training iterations). This algorithm can be in- Amorerefinedanalysistakingadvantageofthestrongcon-
terpretedasaFollow-The-Leaderalgorithminthatatitera- vexityofthelossfunction(KakadeandTewari,2009)may
tionnwepickthebestpolicyπˆ inhindsight,i.e. under leadtotightergeneralizationboundsthatrequireN onlyof
n+1
alltrajectoriesseensofarovertheiterations. orderO˜(T log(1/δ)). Similarly:
O(u2T2log(1/δ))
To better leverage the presence of the expert in our imita- Theorem 3.4. For DAGGER, if N is
tion learning setting, we optionally allow the algorithm to and m is O(1) then with probability at least 1−δ there
useamodifiedpolicyπ = β π∗+(1−β )πˆ existsapolicyπˆ ∈πˆ s.t.J(πˆ)≤J(π∗)+uT(cid:15)ˆ +O(1).
|     |     | i   | i   |     | i i | atiteration |     |     | 1:N |     |     |     | N   |     |
| --- | --- | --- | --- | --- | --- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- |
ithatqueriestheexperttochoosecontrolsafractionofthe
| timewhilecollectingthenextdataset. |     |     |     | Thisisoftendesir- |     |     |     |     |     |     |     |     |     |     |
| ---------------------------------- | --- | --- | --- | ----------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
4 THEORETICALANALYSIS
ableinpracticeasthefirstfewpolicies,withrelativelyfew
datapoints,maymakemanymoremistakesandvisitstates
thatareirrelevantasthepolicyimproves. ThetheoreticalanalysisofDAGGERonlyreliesontheno-
regretpropertyoftheunderlyingFollow-The-Leaderalgo-
| Wewilltypicallyuseβ  |     | =1sothatwedonothavetospec-       |     |     |     |     |                                                   |     |     |     |     |                |     |     |
| -------------------- | --- | -------------------------------- | --- | --- | --- | --- | ------------------------------------------------- | --- | --- | --- | --- | -------------- | --- | --- |
|                      |     | 1                                |     |     |     |     | rithmonstronglyconvexlosses(KakadeandTewari,2009) |     |     |     |     |                |     |     |
| ifyaninitialpolicyπˆ |     | beforegettingdatafromtheexpert’s |     |     |     |     |                                                   |     |     |     |     |                |     |     |
|                      |     | 1                                |     |     |     |     | whichpicksthesequenceofpoliciesπˆ                 |     |     |     |     | . Hencethepre- |     |     |
1:N
behavior. Thenwecouldchooseβ =pi−1tohaveaprob- sentedresultsalsoholdforanyothernoregretonlinelearn-
i
| ability of | using | the expert | that decays | exponentially |     | as in |     |     |     |     |     |     |     |     |
| ---------- | ----- | ---------- | ----------- | ------------- | --- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
ingalgorithmwewouldapplytoourimitationlearningset-
SMILeandSEARN.Weshowbelowtheonlyrequirement ting. In particular, we can consider the results here a re-
(cid:80)N
| isthat{β | }beasequencesuchthatβ |     |     | =   | 1   | β →0 |     |     |     |     |     |     |     |     |
| -------- | --------------------- | --- | --- | --- | --- | ---- | --- | --- | --- | --- | --- | --- | --- | --- |
i N N i=1 i duction of imitation learning to no-regret online learning
| asN → | ∞. Thesimple,parameter-freeversionoftheal- |     |     |     |     |     |       |          |              |     |              |     |         |        |
| ----- | ------------------------------------------ | --- | --- | --- | --- | --- | ----- | -------- | ------------ | --- | ------------ | --- | ------- | ------ |
|       |                                            |     |     |     |     |     | where | we treat | mini-batches | of  | trajectories |     | under a | single |
gorithmdescribedaboveisthespecialcaseβ = I(i = 1) policyasasingleonline-learningexample. Wefirstbriefly
i
| for I the | indicator | function, | which | often | performs | best in |        |          |           |          |     |           |      |      |
| --------- | --------- | --------- | ----- | ----- | -------- | ------- | ------ | -------- | --------- | -------- | --- | --------- | ---- | ---- |
|           |           |           |       |       |          |         | review | concepts | of online | learning | and | no regret | that | will |
practice(seeSection5).ThegeneralDAGGERalgorithmis beusedforthisanalysis.
| detailedinAlgorithm3.1. |     |     | Themainresultofouranalysis |     |     |     |     |     |     |     |     |     |     |     |
| ----------------------- | --- | --- | -------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
inthenextsectionisthefollowingguaranteeforDAGGER.
4.1 OnlineLearning
| Let π | denote | the sequence | of  | policies | π ,π | ,...,π . |     |     |     |     |     |     |     |     |
| ----- | ------ | ------------ | --- | -------- | ---- | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1:N   |        |              |     |          | 1    | 2 N      |     |     |     |     |     |     |     |     |
Assume(cid:96)isstronglyconvexandboundedoverΠ.Suppose
|           |     |                                    |     |     |     |     | Inonlinelearning,analgorithmmustprovideapolicyπ |     |     |     |     |     |     | at  |
| --------- | --- | ---------------------------------- | --- | --- | --- | --- | ----------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
| ≤(1−α)i−1 |     |                                    |     |     |     |     |                                                 |     |     |     |     |     |     | n   |
| β i       |     | foralliforsomeconstantαindependent |     |     |     |     |                                                 |     |     |     |     |     |     |     |
(cid:80)N iterationnwhichincursaloss(cid:96) n (π n ).Afterobservingthis
| of T. Let | (cid:15) | = min | 1   | E   | [(cid:96)(s,π)] | be the |     |     |     |     |     |     |     |     |
| --------- | -------- | ----- | --- | --- | --------------- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
N π∈Π N i=1 s∼dπi loss,thealgorithmcanprovideadifferentpolicyπ for
n+1
truelossofthebestpolicyinhindsight. Thenthefollowing the next iteration which will incur loss (cid:96) (π ). The
|     |     |     |     |     |     |     |     |     |     |     |     | n+1 | n+1 |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
holdsintheinfinitesamplecase(infinitenumberofsample
trajectoriesateachiteration):
|     |     |     |     |     |     |     | 3It is | not necessary | to  | find the | best | policy | in the sequence |     |
| --- | --- | --- | --- | --- | --- | --- | ------ | ------------- | --- | -------- | ---- | ------ | --------------- | --- |
thatminimizesthelossunderitsdistribution;thesameguarantee
O˜(T)
Theorem 3.1. For DAGGER, if N is there exists a holdsforthepolicywhichuniformlyrandomlypicksonepolicy
policyπˆ ∈πˆ s.t. E [(cid:96)(s,πˆ)]≤(cid:15) +O(1/T) inthesequenceπˆ andexecutesthatpolicyforT steps.
|     | 1:N | s∼dπˆ |     | N   |     |     |     |     | 1:N |     |     |     |     |     |
| --- | --- | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
     630

StéphaneRoss, GeoffreyJ.Gordon, J.AndrewBagnell
lossfunctions(cid:96) n+1 mayvaryinanunknownorevenadver- min πˆ∈πˆ1:N E s∼dπˆ [(cid:96)(s,πˆ)]
sarialfashionovertime. Ano-regretalgorithmisanalgo- ≤ 1 (cid:80)N E ((cid:96)(s,πˆ ))
r s in i u th c h h m in t d h th s a i a t g t t h h p t e r g o a o d v e u e s c r e t a o s ge 0 a r a s e s e g q N r u e e t g n w o c i e e t s h o t f r o e p s ∞ o p l e : i c c t ie t s o π th 1 e ,π b 2 e , s . t . p . o , l π ic N y ≤ ≤ =γ γ N N 1 N N (cid:80) + + i N i = = (cid:15) 2 N (cid:96) 1 1 N m [E + ax s s ∼ [ ∼ 2 n d (cid:96) d β N m πˆ π i a i + x ((cid:96) [ T n (s β (cid:80) , + πˆ i N i i = ) T ) n (cid:80) + β+ 2 N i 1 = (cid:96) β n m i β a ] + x + 1 m β m i i n i ] n (1 π , ∈ T Π β (cid:80) i )] N i=1 (cid:96) i (π)
N N
1 (cid:88) 1 (cid:88)
(cid:96) (π )−min (cid:96) (π)≤γ (3)
N i i π∈Π N i N
i=1 i=1 Underanerrorreductionassumptionthatforanyinputdis-
tribution, there is some policy π ∈ Π that achieves sur-
for lim γ = 0. Many no-regret algorithms guar-
N→∞ N rogate loss of (cid:15), this implies we are guaranteed to find a
antee that γ is O˜(1) (e.g. when (cid:96) is strongly convex)
N N policy πˆ which achieves (cid:15) surrogate loss under its own
(Hazan et al., 2006; Kakade and Shalev-Shwartz, 2008;
state distribution in the limit, provided β → 0. For in-
KakadeandTewari,2009). N
stance,ifwechooseβ tobeoftheform(1−α)i−1,then
i
1[n +T (cid:80)N β ] ≤ 1 [logT +1] and this extra
4.2 NoRegretAlgorithmsGuarantees N β i=nβ+1 i Nα
penalty becomes negligible for N as O˜(T). As we need
Nowweshowthatno-regretalgorithmscanbeusedtofind at least O˜(T) iterations to make γ N negligible, the num-
apolicywhichhasgoodperformanceguaranteesunderits berofiterationsrequiredbyDAGGERissimilartothatre-
owndistributionofstatesinourimitationlearningsetting. quired by any no-regret algorithm. Note that this is not
Todoso,wemustchoosethelossfunctionstobetheloss as strong as the general error or regret reductions consid-
underthedistributionofstatesofthecurrentpolicychosen eredin(Beygelzimeretal.,2005;RossandBagnell,2010;
bytheonlinealgorithm: (cid:96) (π)=E [(cid:96)(s,π)]. Daumé III et al., 2009) which require only classification:
i s∼dπi
werequireano-regretmethodorstronglyconvexsurrogate
For our analysis of DAGGER, we need to bound the to-
lossfunction,astronger(albeitcommon)assumption.
talvariationdistancebetweenthedistributionofstatesen-
counteredbyπˆ andπ ,whichcontinuestocalltheexpert.
i i FiniteSampleCase: Thepreviousresultsholdiftheon-
Thefollowinglemmaisuseful:
line learning algorithm observes the infinite sample loss,
Lemma4.1. ||d πi −d πˆi || 1 ≤2Tβ i . i.e. thelossonthetruedistributionoftrajectoriesinduced
bythecurrentpolicyπ . Inpracticehoweverthealgorithm
i
Proof. Let d the distribution of states over T steps condi- would onlyobserve its losson asmall sampleof trajecto-
tionedonπ pickingπ∗atleastonceoverT steps.Sinceπ riesateachiteration. Wewishtoboundthetruelossunder
i i
alwaysexecutesπˆ overT stepswithprobability(1−β )T itsowndistributionofthebestpolicyinthesequenceasa
i i
wehaved =(1−β )Td +(1−(1−β )T)d. Thus functionoftheregretonthefinitesampleoftrajectories.
πi i πˆi i
At each iteration i, we assume the algorithm samples m
||d −d ||
=( π 1 i −(1 πˆi − 1 β )T)||d−d || trajectories using π i and then observes the loss (cid:96) i (π) =
≤ ≤ 2 2( T 1 β − i (1−β i i )T) πˆi 1 E Th s∼ e D o i n ( l (cid:96) in (s e , l π ea )) rn , e fo r r g D ua i ra th n e te d e a s ta N 1 se (cid:80) to N i f = t 1 h E os s e ∼ m Di ( t (cid:96) ra ( j s e , c π to i ) r ) ie − s.
min 1 (cid:80)N E ((cid:96)(s,π)) ≤ γ . Let (cid:15)ˆ =
π∈Π N i=1 s∼Di N N
The last inequality follows from the fact that (1−β)T ≥ min 1 (cid:80)N E [(cid:96)(s,π)] the training loss of the
1−βT foranyβ ∈[0,1]. best π p ∈ o Π lic N y in i= hi 1 nds s i ∼ g D ht i . Following a similar analysis to
Cesa-Bianchietal.(2004),weobtain:
Thisisonlybetterthanthetrivialbound||d −d || ≤2
πi πˆi 1 Theorem4.2. ForDAGGER,withprobabilityatleast1−δ,
n m fo β r in t β π h ∈ i e Π ≤ la N 1 rg (cid:80) T e 1 s . t N i= n 1 A E s ≤ s s u ∼ m N dπ e i [ s β (cid:96) u ( i c s h i , s π th ) n ] a o t t n h - β e i n n l c o r > s e s as o i T 1 f n . g the a L n e b d t es (cid:15) d t N e p fi o n = l e - γ t γ h N er t + e h e e x 2 a (cid:96) i N s m v t e a s x ra a [n g p e β o r l + e ic g y T re πˆ t (cid:80) o ∈ f N i= πˆ πˆ n 1 β :N + . 1 s β .t i . ] E + s∼ (cid:96) m dπˆ a [ x (cid:96) (cid:113) (s, 2 πˆ lo ) m g ] ( N 1 ≤ /δ) (cid:15)ˆ N , fo + r
icyinhindsightafterN iterationsandlet(cid:96) beanupper N 1:N
max
boundontheloss,i.e. (cid:96) (s,πˆ ) ≤ (cid:96) forallpoliciesπˆ ,
i i max i
andstatessuchthatd (s)>0. Wehavethefollowing: Proof. LetY ij bethedifferencebetweentheexpectedper
πˆi
step loss of πˆ under state distribution d and the aver-
Theorem 4.1. For DAGGER, there exists a policy πˆ ∈
age per step l
i
oss of πˆ under the jth sa
π
m
i
ple trajectory
T πˆ 1 (cid:80) :N N i= s n .t β . +1 E β s i ∼ ], d f πˆ o [ r (cid:96)( γ s N ,πˆ th )] ea ≤ vera (cid:15) N ge + reg γ re N to + fπˆ 2 1 (cid:96) :N N ma . x[n β + i wi ∈ th π { i 1, a 2 t , i . te . r . a , t N ion } i a . nd T i h j e ∈ rand { o 1 m ,2, v . a . r . ia , b m le } s a Y r i e j a o l v l e z r e a r l o l
mean, bounded in [−(cid:96) ,(cid:96) ] and form a martingale
max max
Proof. The last lemma implies E ((cid:96) (s,πˆ )) ≤ (considering the order Y ,Y ,...,Y ,Y ,...,Y ).
E ((cid:96) (s,πˆ )) + 2(cid:96) min(1,
s
T
∼
β
dπˆi
).
i i
Then: ByAzuma-Hoeffding’sin
11
equa
12
lity 1
1
(cid:80)
m
N
21
(cid:80)m Y
Nm
≤
s∼dπi i i max i mN i=1 j=1 ij
631

AReductionofImitationLearningandStructuredPredictiontoNo-RegretOnlineLearning
(cid:113)
(cid:96) 2log(1/δ) withprobabilityatleast1−δ. Hence,we WecompareperformanceonaracetrackcalledStarTrack.
max
|     |     | mN  |     |     |     |     | Asthistrackfloatsinspace,thekartcanfalloffthetrackat |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ---------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
obtainthatwithprobabilityatleast1−δ:
anypoint(thekartisrepositionedatthecenterofthetrack
E
min πˆ∈πˆ1:N s∼dπˆ [(cid:96)(s,πˆ)] whenthisoccurs).Wemeasureperformanceintermsofthe
≤ 1 (cid:80) N E [ (cid:96) ( s , π ˆ ) ] a v e r a g e n u m be r o f f a l l s p e r la p . F o r S M I L e a n d D A ,
|     |            | i = 1 s ∼ | d    | i   |     |          |     |     |     |     |     |     |     | G G E R |
| --- | ---------- | --------- | ---- | --- | --- | -------- | --- | --- | --- | --- | --- | --- | --- | ------- |
|     | N (cid:80) |           | π ˆi |     |     | (cid:80) |     |     |     |     |     |     |     |         |
≤ 1 N E [ (cid:96) ( s , π ˆ ) ] + 2 (cid:96) ma x[n + T N β ] w e u s e d 1 l a p o f t r a i n i n g p e r i te r a ti o n (∼ 1 0 0 0 d a ta p o in t s )
|     | N   | i = 1 s ∼ | d π | i   | N β | i=nβ+1 | i   |     |     |     |     |     |     |     |
| --- | --- | --------- | --- | --- | --- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
(cid:80) i (cid:80) (cid:80) a n d r u n b o th m e t h o d s f o r 2 0 i t e r a ti o n s . F o r S M I L e w e
| =   | 1                | N E      | [ (cid:96) ( s , | πˆ ) ] + | 1 N       | m Y    |                           |     |     |     |                              |             |     |        |
| --- | ---------------- | -------- | ---------------- | -------- | --------- | ------ | ------------------------- | --- | --- | --- | ---------------------------- | ----------- | --- | ------ |
|     | N                | i=1 s∼Di |                  | i        | mN i=1    | j=1 ij |                           |     |     |     |                              |             |     |        |
|     |                  |          | (cid:80)N        |          |           |        | chooseparameterα          |     |     | =   | 0.1asinRossandBagnell(2010), |             |     |        |
|     | +2(cid:96) max[n | +T       |                  | β        | ]         |        |                           |     |     |     |                              |             |     |        |
|     | N                | β        | i=nβ+1           |          | i         |        | andforDAGGERtheparameterβ |     |     |     |                              | =I(i=1)forI |     | thein- |
|     |                  |          |                  |          | (cid:113) |        |                           |     |     |     |                              | i           |     |        |
1 (cid:80)N E 2log(1/δ) dicatorfunction. Figure2shows95%confidenceintervals
| ≤   |     | s∼Di | [(cid:96)(s,πˆ | i )]+(cid:96) | max |     |     |     |     |     |     |     |     |     |
| --- | --- | ---- | -------------- | ------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|     | N   | i=1  |                |               |     | mN  |     |     |     |     |     |     |     |     |
+2(cid:96) (cid:80) N o n th e a v e r a g e fa l ls p e r l ap o f ea c h m e t h o d a ft er 1 , 5 , 1 0 , 1 5
|     | max[n | β +T |     | β   | i ] |     |     |     |     |     |     |     |     |     |
| --- | ----- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
N i=nβ+1 an d 2 0 i te r a t i on s a s a f u n ct io n o f th e t o t a ln u m b e r o f t ra i n -
|            |     |           | (cid:113) |         |                   | (cid:80)N |     |     |     |     |     |     |     |     |
| ---------- | --- | --------- | --------- | ------- | ----------------- | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
| ≤(cid:15)ˆ | +γ  | +(cid:96) | 2lo       | g( 1/δ) | + 2(cid:96) max[n | +T        | β ] |     |     |     |     |     |     |     |
N N max m N N β i=nβ+1 i ing data collected. We first observe that with the baseline
|                                                   |     |               |     |         |                |          |     | 4.5 |     |     |     |     |     |     |
| ------------------------------------------------- | --- | ------------- | --- | ------- | -------------- | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
| TheuseofAzuma-Hoeffding’sinequalitysuggestsweneed |     |               |     |         |                |          |     | 4   |     |     |     |     |     |     |
| Nm                                                | in  | O(T2log(1/δ)) |     | for the | generalization | error to | be  |     |     |     |     |     |     |     |
3.5
| O(1/T)andnegligibleoverT |     |     |     |     | steps.Leveragingthestrong |     |     |     |     |     |     |     |     |     |
| ------------------------ | --- | --- | --- | --- | ------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
paL reP sllaF egarevA
| convexityof(cid:96)asin(KakadeandTewari,2009)mayleadto |     |     |     |     |                        |     |     | 3   |     |     |     |     |     |     |
| ------------------------------------------------------ | --- | --- | --- | --- | ---------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| atighterboundrequiringonlyO(T                          |     |     |     |     | log(T/δ))trajectories. |     |     |     |     |     |     |     |     |     |
2.5
2
5 EXPERIMENTS
1.5
TodemonstratetheefficacyandscalabilityofDAGGER,we
| applyittotwochallengingimitationlearningproblemsand |     |     |     |     |     |     |     | 1   |     |     |     |     |     |     |
| --------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
DAgger (β = I(i=1))
| asequencelabelingtask(handwritingrecognition). |     |     |     |     |     |     |     | 0.5 |     |     |     |     |     | i   |
| ---------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
SMILe (α = 0.1)
Supervised
0
| 5.1 | SuperTuxKart |     |     |     |     |     |     |     | 0   | 0.5                     | 1   | 1.5 | 2   | 2.5   |
| --- | ------------ | --- | --- | --- | --- | --- | --- | --- | --- | ----------------------- | --- | --- | --- | ----- |
|     |              |     |     |     |     |     |     |     |     | Number of Training Data |     |     |     | x 104 |
SuperTuxKartisa3Dracinggamesimilartothepopular
Mario Kart. Our goal is to train the computer to steer the Figure2: Averagefalls/lapasafunctionoftrainingdata.
kartmovingatfixedspeedonaparticularracetrack,based
onthecurrentgameimagefeaturesasinput(seeFigure1). supervised approach where training always occurs under
A human expert is used to provide demonstrations of the theexpert’strajectoriesthatperformancedoesnotimprove
correctsteering(analogjoystickvaluein[-1,1])foreachof asmoredataiscollected. Thisisbecausemostofthetrain-
theobservedgameimages.Forallmethods,weusealinear ing lapsareall verysimilar anddo nothelp thelearner to
|     |     |     |     |     |     |     | learnhowtorecoverfrommistakesitmakes. |     |     |     |     |     | WithSMILe |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------------------- | --- | --- | --- | --- | --- | --------- | --- |
weobtainsomeimprovementsbutthepolicyafter20iter-
|     |     |     |     |     |     |     | ations                                  | still | falls     | off the  | track about | twice         | per lap         | on aver-   |
| --- | --- | --- | --- | --- | --- | --- | --------------------------------------- | ----- | --------- | -------- | ----------- | ------------- | --------------- | ---------- |
|     |     |     |     |     |     |     | age.                                    | This  | is in     | part due | to the      | stochasticity | of              | the policy |
|     |     |     |     |     |     |     | whichsometimesmakesbadchoicesofactions. |       |           |          |             |               |                 | ForDAG-    |
|     |     |     |     |     |     |     | GER,                                    | we    | were able | to       | obtain      | a policy      | that never      | falls off  |
|     |     |     |     |     |     |     | thetrackafter15iterationsoftraining.    |       |           |          |             |               | Thoughevenafter |            |
5iterations,thepolicyweobtainalmostneverfallsoffthe
|     |     |     |     |     |     |     | track                          | and | is significantly |     | outperforming |                       | both SMILe          | and |
| --- | --- | --- | --- | --- | --- | --- | ------------------------------ | --- | ---------------- | --- | ------------- | --------------------- | ------------------- | --- |
|     |     |     |     |     |     |     | thebaselinesupervisedapproach. |     |                  |     |               | Furthermore,thepolicy |                     |     |
|     |     |     |     |     |     |     | obtained                       |     | by DAGGER        | is  | smoother      | and                   | looks qualitatively |     |
Figure1: ImagefromSuperTuxKart’sStarTrack. betterthanthepolicyobtainedwithSMILe. Avideoavail-
|     |     |     |     |     |     |     | able | on  | YouTube | (Ross, | 2010a) | shows | a qualitative | com- |
| --- | --- | --- | --- | --- | --- | --- | ---- | --- | ------- | ------ | ------ | ----- | ------------- | ---- |
controllerasthebaselearnerwhichupdatesthesteeringat parisonofthebehaviorobtainedwitheachmethod.
5Hzbasedonthevectorofimagefeatures4.
5.2 SuperMarioBros.
|     | 4Features | x: LAB | color | values | of each pixel | in a 25x19 | re- |     |     |     |     |     |     |     |
| --- | --------- | ------ | ----- | ------ | ------------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
sizedimageofthe800x600image;outputsteering:yˆ=wTx+b
where w, b minimizes ridge regression objective: L(w,b) = Super Mario Bros. is a platform video game where the
1 Pn (wTx +b−y )2+ λwTw,forregularizerλ=10−3. character, Mario, must move across each stage by avoid-
| n   | i=1 | i   | i   | 2   |     |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
     632

StéphaneRoss, GeoffreyJ.Gordon, J.AndrewBagnell
ingbeinghitbyenemiesandfallingintogaps, andbefore nell (2010). For DAGGER we obtain results with differ-
running out of time. We used the simulator from a recent ent choice of the parameter β : 1) β = I(i = 1) for I
i i
Mario Bros. AI competition (Togelius and Karakovskiy, the indicator function (D0); 2) β = pi−1 for all values
i
2009)whichcanrandomlygeneratestagesofvaryingdiffi- of p ∈ {0.1,0.2,...,0.9}. We report the best results ob-
culty(moredifficultgapsandtypesofenemies). Ourgoal tainedwithp=0.5(D0.5). Wealsoreporttheresultswith
istotrainthecomputertoplaythisgamebasedonthecur- p = 0.9 (D0.9) which shows the slower convergence of
rentgameimagefeaturesasinput(seeFigure3). Ourex- using the expert more frequently at later iterations. Simi-
pert in this scenario is a near-optimal planning algorithm larlyforSEARN,weobtainresultswithallchoiceofαin
that has full access to the game’s internal state and can {0.1,0.2,...,1}. Wereportthebestresultsobtainedwith
simulateexactlytheconsequenceoffutureactions. Anac- α = 0.4 (Se0.4). We also report results with α = 1.0
tionconsistsof4binaryvariablesindicatingwhichsubset (Se1), which shows the unstability of such a pure policy
ofbuttonsweshouldpressin{left,right,jump,speed}. For iteration approach. Figure 4 shows 95% confidence inter-
vals on the average distance travelled per stage at each it-
eration as a function of the total number of training data
collected. Againhereweobservethatwiththesupervised
3200
3000
2800
2600
2400
2200
Figure3: CapturedimagefromSuperMarioBros. 2000
1800
allmethods,weuse4independentlinearSVMasthebase 1600
learnerwhichupdatethe4binaryactionsat5Hzbasedon
1400
thevectorofimagefeatures5.
1200
Wecompareperformanceintermsoftheaveragedistance
1000
0 1 2 3 4 5 6 7 8 9 10
travelled by Mario per stage before dying, running out of Number of Training Data x 104
timeorcompletingthestage,onrandomlygeneratedstages
ofdifficulty1withatimelimitof60secondstocomplete
the stage. The total distance of each stage varies but is
around 4200-4300 on average, so performance can vary
roughly in [0,4300]. Stages of difficulty 1 are fairly easy
foranaveragehumanplayerbutcontainmosttypesofen-
emies and gaps, except with fewer enemies and gaps than
stages of harder difficulties. We compare performance of
DAgger, SMILe and SEARN6 to the supervised approach
(Sup). Witheachapproachwecollect5000datapointsper
iteration(eachstageisabout150datapointsifruntocom-
pletion)andrunthemethodsfor20iterations. ForSMILe
wechooseparameterα=0.1(Sm0.1)asinRossandBag-
5Fortheinputfeaturesx: eachimageisdiscretizedinagrid
of 22x22 cells centered around Mario; 14 binary features de-
scribeeachcell(typesofground,enemies,blocksandotherspe-
cial items); a history of those features over the last 4 images is
used, in addition to other features describing the last 6 actions
and the state of Mario (small,big,fire,touches ground), for a to-
talof27152binaryfeatures(verysparse). Thekthoutputbinary
variable yˆ = I(wTx+b > 0), where w ,b optimizes the k k k k k
SVMobjectivewithregularizerλ=10−4usingstochasticgradi-
entdescent(Ratliffetal.,2007;Bottou,2009).
6Weusethesamecost-to-goapproximationinDauméIIIetal.
(2009); inthiscaseSMILeandSEARNdiffersonlyinhowthe
weightsinthemixtureareupdatedateachiteration.
633
egatS
reP
dellevarT
ecnatsiD
egarevA
D0 D0.5 D0.9 Se1 Se0.4 Sm0.1 Sup
Figure4: Averagedistance/stageasafunctionofdata.
approach, performance stagnates as we collect more data
from the expert demonstrations, as this does not help the
particular errors the learned controller makes. In particu-
lar,areasonthesupervisedapproachgetssuchalowscore
isthatunderthelearnedcontroller,Marioisoftenstuckat
somelocationagainstanobstacleinsteadofjumpingover
it. Since the expert always jumps over obstacles at a sig-
nificant distance away, the controller did not learn how to
get unstuck in situations where it is right next to an ob-
stacle. On the other hand, all the other iterative methods
performmuchbetterastheyeventuallylearntogetunstuck
in those situations by encountering them at the later iter-
ations. Again in this experiment, DAGGER outperforms
SMILe, and also outperforms SEARN for all choice of α
we considered. When using β = 0.9i−1, convergence is
i
significantlyslowercouldhavebenefitedfrommoreitera-
tions asperformance wasstill improving at the endof the
20 iterations. Choosing 0.5i−1 yields slightly better per-
formance (3030) then with the indicator function (2980).
This is potentially due to the large number of data gener-
atedwheremarioisstuckatthesamelocationintheearly
iterations when using the indicator; whereas using the ex-

AReductionofImitationLearningandStructuredPredictiontoNo-RegretOnlineLearning
0.86
| pertasmallfractionofthetimestillallowstoobservethose |          |          |       |     |       |              |     |     |     |     |     |     |     |
| ---------------------------------------------------- | -------- | -------- | ----- | --- | ----- | ------------ | --- | --- | --- | --- | --- | --- | --- |
| locations                                            | but also | unstucks | mario | and | makes | it collect a |     |     |     |     |     |     |     |
0.855
| widervarietyofusefuldata. |      |       | AvideoavailableonYouTube |     |            |        |                                    |     |     |     |     |     |     |
| ------------------------- | ---- | ----- | ------------------------ | --- | ---------- | ------ | ---------------------------------- | --- | --- | --- | --- | --- | --- |
| (Ross, 2010b)             | also | shows | a qualitative            |     | comparison | of the | ycaruccA retcarahC sdloF tseT 0.85 |     |     |     |     |     |     |
behaviorobtainedwitheachmethod.
0.845
0.84
5.3 HandwritingRecognition
0.835
| Finally, we | demonstrate |     | the efficacy | of  | our approach | on a |     |     |     |     |     |     |     |
| ----------- | ----------- | --- | ------------ | --- | ------------ | ---- | --- | --- | --- | --- | --- | --- | --- |
0.83
structuredpredictionprobleminvolvingrecognizinghand-
writtenwordsgiventhesequenceofimagesofeachcharac- 0.825 DAgger (β=I(i=1))
i
| terintheword.WefollowDauméIIIetal.(2009)inadopt- |     |     |     |     |     |     |      |     |     |     |     | SEARN (α=1)   |     |
| ------------------------------------------------ | --- | --- | --- | --- | --- | --- | ---- | --- | --- | --- | --- | ------------- | --- |
|                                                  |     |     |     |     |     |     | 0.82 |     |     |     |     | SEARN (α=0.8) |     |
ingaviewofstructuredpredictionasadegenerateformof SEARN (α=0.1)
imitation learning where the system dynamics are deter- SMILe (α=0.1)
|     |     |     |     |     |     |     | 0.815 |     |     |     |     | Supervised |     |
| --- | --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- | ---------- | --- |
ministicandtrivialinsimplypassingonearlierpredictions No Structure
0.81
made as inputs for future predictions. We use the dataset 0 2 4 6 8 10 12 14 16 18 20
Training Iteration
ofTaskaretal.(2003)whichhasbeenusedextensivelyin
the literature to compare several structured prediction ap- Figure5: Characteraccuracyasafunctionofiteration.
| proaches.  | This | dataset           | contains | roughly     | 6600 | words (for   |     |     |     |     |     |     |     |
| ---------- | ---- | ----------------- | -------- | ----------- | ---- | ------------ | --- | --- | --- | --- | --- | --- | --- |
| a total of | over | 52000 characters) |          | partitioned |      | in 10 folds. |     |     |     |     |     |     |     |
Weconsiderthelargedatasetexperimentwhichconsistsof predicted character feature) this makes this approach not
trainingon9foldsandtestingon1foldandrepeatingthis as unstable as in general reinforcement/imitation learning
over all folds. Performance is measured in terms of the problems(aswesawinthepreviousexperiment). SEARN
characteraccuracyonthetestfolds. andSMILewithsmallα=0.1performssimilarlybutsig-
|     |     |     |     |     |     |     | nificantlyworsethanDAgger. |     |     |     | Notethatwechosethesim- |     |     |
| --- | --- | --- | --- | --- | --- | --- | -------------------------- | --- | --- | --- | ---------------------- | --- | --- |
Weconsiderpredictingthewordbypredictingeachcharac-
|     |     |     |     |     |     |     | plest (greedy, | one-pass) |     | decoding | to illustrate | the | benefits |
| --- | --- | --- | --- | --- | --- | --- | -------------- | --------- | --- | -------- | ------------- | --- | -------- |
terinsequenceinalefttorightorder,usingthepreviously
|                 |           |                                |              |     |          |              | of the DAGGER  |          | approach   | with | respect    | to existing   | reduc-   |
| --------------- | --------- | ------------------------------ | ------------ | --- | -------- | ------------ | -------------- | -------- | ---------- | ---- | ---------- | ------------- | -------- |
| predicted       | character | to                             | help predict | the | next     | and a linear |                |          |            |      |            |               |          |
|                 |           |                                |              |     |          |              | tions. Similar |          | techniques | can  | be applied | to multi-pass | or       |
| SVM7, following |           | the greedy                     | SEARN        |     | approach | in Daumé     |                |          |            |      |            |               |          |
|                 |           |                                |              |     |          |              | beam-search    | decoding | leading    |      | to results | that are      | competi- |
| IIIetal.(2009). |           | HerewecompareourmethodtoSMILe, |              |     |          |              |                |          |            |      |            |               |          |
tivewiththestate-of-the-art.
| as well as | SEARN  | (using       | the | same    | approximations | used      |     |     |     |     |     |     |     |
| ---------- | ------ | ------------ | --- | ------- | -------------- | --------- | --- | --- | --- | --- | --- | --- | --- |
| in Daumé   | III et | al. (2009)). |     | We also | compare        | these ap- |     |     |     |     |     |     |     |
proachestotwobaseline,anon-structuredapproachwhich 6 FUTUREWORK
| simply predicts |          | each character |       | independently |     | and the su-  |         |      |             |      |            |     |             |
| --------------- | -------- | -------------- | ----- | ------------- | --- | ------------ | ------- | ---- | ----------- | ---- | ---------- | --- | ----------- |
| pervised        | training | approach       | where | training      |     | is conducted |         |      |             |      |            |     |             |
|                 |          |                |       |               |     |              | We show | that | by batching | over | iterations | of  | interaction |
withthepreviouscharacteralwayscorrectlylabeled.Again withasystem, no-regretmethods, includingthepresented
wetryallchoiceofα∈{0.1,0.2,...,1}forSEARN,and
|                |     |     |        |           |        |            | DAGGER             | approach | can        | provide | a learning | reduction | with     |
| -------------- | --- | --- | ------ | --------- | ------ | ---------- | ------------------ | -------- | ---------- | ------- | ---------- | --------- | -------- |
| report results | for | α = | 0.1, α | = 1 (pure | policy | iteration) |                    |          |            |         |            |           |          |
|                |     |     |        |           |        |            | strong performance |          | guarantees |         | in both    | imitation | learning |
andthebestα = 0.8, andrunallapproachesfor20itera- andstructuredprediction. Infuturework,wewillconsider
tions. Figure5showstheperformanceofeachapproachon
|     |     |     |     |     |     |     | more sophisticated |     | strategies |     | than simple | greedy | forward |
| --- | --- | --- | --- | --- | --- | --- | ------------------ | --- | ---------- | --- | ----------- | ------ | ------- |
the test folds after each iteration as a function of training decoding for structured prediction, as well as using base
| data. The | baseline | result | without | structure |     | achieves 82% |     |     |     |     |     |     |     |
| --------- | -------- | ------ | ------- | --------- | --- | ------------ | --- | --- | --- | --- | --- | --- | --- |
classifiersthatrelyonInverseOptimalControl(Abbeeland
characteraccuracybyjustusinganSVMthatpredictseach
|     |     |     |     |     |     |     | Ng, 2004; | Ratliff | et al., | 2006) | techniques | to learn | a cost |
| --- | --- | --- | --- | --- | --- | --- | --------- | ------- | ------- | ----- | ---------- | -------- | ------ |
characterindependently.Whenaddingthepreviouscharac- function for a planner to aid prediction in imitation learn-
terfeature,buttrainingwithalwaysthepreviouscharacter
|     |     |     |     |     |     |     | ing. Further | we  | believe | techniques | similar | to  | those pre- |
| --- | --- | --- | --- | --- | --- | --- | ------------ | --- | ------- | ---------- | ------- | --- | ---------- |
correctly labeled (supervised approach), performance in- sented, by leveraging a cost-to-go estimate, may provide
| creasesupto83.6%. |     | UsingDAggerincreasesperformance |     |     |     |     |     |     |     |     |     |     |     |
| ----------------- | --- | ------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
anunderstandingofthesuccessofonlinemethodsforrein-
| further to | 85.5%. | Surprisingly, |     | we observe |     | SEARN with |     |     |     |     |     |     |     |
| ---------- | ------ | ------------- | --- | ---------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- |
forcementlearningandsuggestasimilardata-aggregation
α = 1,whichisapurepolicyiterationapproachperforms methodthatcanguaranteeperformanceinsuchsettings.
| verywellonthisexperiment,similarlytothebestα |         |       |     |        |       | =0.8            |     |     |     |     |     |     |     |
| -------------------------------------------- | ------- | ----- | --- | ------ | ----- | --------------- | --- | --- | --- | --- | --- | --- | --- |
| and DAgger.                                  | Because | there | is  | only a | small | part of the in- |     |     |     |     |     |     |     |
Acknowledgements
| put that is | influenced | by  | the | current | policy | (the previous |     |     |     |     |     |     |     |
| ----------- | ---------- | --- | --- | ------- | ------ | ------------- | --- | --- | --- | --- | --- | --- | --- |
ThisworkissupportedbytheONRMURIgrantN00014-
7Eachcharacteris8x16binarypixels(128inputfeatures);26
09-1-1052,ReasoninginReducedInformationSpaces,and
| binary features | are | used to | encode | the previously |     | predicted let- |     |     |     |     |     |     |     |
| --------------- | --- | ------- | ------ | -------------- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- |
terintheword. WetrainthemulticlassSVMusingtheall-pairs bytheNationalSciencesandEngineeringResearchCoun-
reductiontobinaryclassification(Beygelzimeretal.,2005). cilofCanada(NSERC).
     634

|     |     |     |     | StéphaneRoss, |     | GeoffreyJ.Gordon, |     | J.AndrewBagnell |     |     |     |     |     |
| --- | --- | --- | --- | ------------- | --- | ----------------- | --- | --------------- | --- | --- | --- | --- | --- |
References S. Ross. Comparison of imitation learning approaches
|     |     |     |     |     |     |     |     | on Super | Mario | Bros, | 2010b. | URL http://www. |     |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | ----- | ----- | ------ | --------------- | --- |
P. Abbeel and A. Y. Ng. Apprenticeship learning via in- youtube.com/watch?v=anOI0xZ3kGM.
| versereinforcementlearning. |     |     | InProceedingsofthe21st |     |     |     |     |     |     |     |     |     |     |
| --------------------------- | --- | --- | ---------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
InternationalConferenceonMachineLearning(ICML), S. Ross and J. A. Bagnell. Efficient reductions for imita-
|     |     |     |     |     |     |     |     | tion learning. | In  | Proceedings |     | of the 13th | International |
| --- | --- | --- | --- | --- | --- | --- | --- | -------------- | --- | ----------- | --- | ----------- | ------------- |
2004.
ConferenceonArtificialIntelligenceandStatistics(AIS-
| B.D.Argall,S.Chernova,M.Veloso,andB.Browning. |     |     |     |     |     | A   |     |     |     |     |     |     |     |
| --------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
TATS),2010.
| survey | of robot learning |     | from | demonstration. |     | Robotics |     |         |              |     |          |           |             |
| ------ | ----------------- | --- | ---- | -------------- | --- | -------- | --- | ------- | ------------ | --- | -------- | --------- | ----------- |
|        |                   |     |      |                |     |          | S.  | Schaal. | Is imitation |     | learning | the route | to humanoid |
andAutonomousSystems,2009.
|                 |                                     |          |            |     |              |         |                                   | robots?   | InTrendsinCognitiveSciences,1999. |      |          |                  |           |
| --------------- | ----------------------------------- | -------- | ---------- | --- | ------------ | ------- | --------------------------------- | --------- | --------------------------------- | ---- | -------- | ---------------- | --------- |
| A. Beygelzimer, | V.                                  | Dani,    | T. Hayes,  |     | J. Langford, | and     |                                   |           |                                   |      |          |                  |           |
|                 |                                     |          |            |     |              |         | D.Silver,J.A.Bagnell,andA.Stentz. |           |                                   |      |          | Highperformance  |           |
| B. Zadrozny.    | Error                               | limiting | reductions |     | between      | classi- |                                   |           |                                   |      |          |                  |           |
|                 |                                     |          |            |     |              |         |                                   | outdoor   | navigation                        | from | overhead | data using       | imitation |
| ficationtasks.  | InProceedingsofthe22ndInternational |          |            |     |              |         |                                   |           |                                   |      |          |                  |           |
|                 |                                     |          |            |     |              |         |                                   |           | Proceedings                       |      | of       | Robotics Science | and Sys-  |
|                 |                                     |          |            |     |              |         |                                   | learning. | In                                |      |          |                  |           |
ConferenceonMachineLearning(ICML),2005.
tems(RSS),2008.
| L. Bottou. | sgd code, | 2009. | URL | http://www.leon. |     |     |                                  |     |     |     |     |                 |     |
| ---------- | --------- | ----- | --- | ---------------- | --- | --- | -------------------------------- | --- | --- | --- | --- | --------------- | --- |
|            |           |       |     |                  |     |     | B.Taskar,C.Guestrin,andD.Koller. |     |     |     |     | Maxmarginmarkov |     |
bottou.org/projects/sgd.
networks.InAdvancesinNeuralInformationProcessing
N.Cesa-Bianchi,A.Conconi,andC.Gentile. Onthegen- Systems(NIPS),2003.
| eralizationabilityofon-linelearningalgorithms.  |                   |                       |             |             |              | 2004.     |     |                       |        |                             |     |          |              |
| ----------------------------------------------- | ----------------- | --------------------- | ----------- | ----------- | ------------ | --------- | --- | --------------------- | ------ | --------------------------- | --- | -------- | ------------ |
|                                                 |                   |                       |             |             |              |           | J.  | Togelius              | and S. | Karakovskiy.                |     | Mario AI | Competition, |
|                                                 |                   |                       |             |             |              |           |     | 2009.                 | URL    | http://julian.togelius.com/ |     |          |              |
| S. Chernova                                     | and M.            | Veloso.               | Interactive |             | policy       | learning  |     |                       |        |                             |     |          |              |
| throughconfidence-basedautonomy.                |                   |                       |             | 2009.       |              |           |     | mariocompetition2009. |        |                             |     |          |              |
| H. Daumé                                        | III, J. Langford, |                       | and         | D. Marcu.   | Search-based |           |     |                       |        |                             |     |          |              |
| structuredprediction.                           |                   | MachineLearning,2009. |             |             |              |           |     |                       |        |                             |     |          |              |
| E. Hazan,                                       | A. Kalai,         | S. Kale,              | and         | A. Agarwal. |              | Logarith- |     |                       |        |                             |     |          |              |
| micregretalgorithmsforonlineconvexoptimization. |                   |                       |             |             |              | In        |     |                       |        |                             |     |          |              |
Proceedingsofthe19thannualconferenceonComputa-
tionalLearningTheory(COLT),2006.
| M. Kääriäinen. |     | Lower | bounds | for | reductions, | 2006. |     |     |     |     |     |     |     |
| -------------- | --- | ----- | ------ | --- | ----------- | ----- | --- | --- | --- | --- | --- | --- | --- |
AtomicLearningworkshop.
| S. Kakade | and J. Langford. |     | Approximately |     | optimal     | ap- |     |     |     |     |     |     |     |
| --------- | ---------------- | --- | ------------- | --- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- |
|           |                  |     |               |     | Proceedings | of  |     |     |     |     |     |     |     |
| proximate | reinforcement    |     | learning.     | In  |             |     |     |     |     |     |     |     |     |
the19thInternationalConferenceonMachineLearning
(ICML),2002.
| S. Kakade   | and S. Shalev-Shwartz. |            |             | Mind       | the duality   | gap:    |     |     |     |     |     |     |     |
| ----------- | ---------------------- | ---------- | ----------- | ---------- | ------------- | ------- | --- | --- | --- | --- | --- | --- | --- |
| Logarithmic | regret                 | algorithms |             | for online | optimization. |         |     |     |     |     |     |     |     |
| Advances    | in Neural              |            | Information | Processing |               | Systems |     |     |     |     |     |     |     |
In
(NIPS),2008.
| S. Kakade   | and A.          | Tewari. | On          | the generalization |     | abil-       |     |     |     |     |     |     |     |
| ----------- | --------------- | ------- | ----------- | ------------------ | --- | ----------- | --- | --- | --- | --- | --- | --- | --- |
| ity of      | online strongly | convex  | programming |                    |     | algorithms. |     |     |     |     |     |     |     |
| In Advances | in Neural       |         | Information | Processing         |     | Systems     |     |     |     |     |     |     |     |
(NIPS),2009.
| N. Ratliff, | D. Bradley, | J.         | A. Bagnell, |               | and J. | Chestnutt. |     |     |     |     |     |     |     |
| ----------- | ----------- | ---------- | ----------- | ------------- | ------ | ---------- | --- | --- | --- | --- | --- | --- | --- |
| Boosting    | structured  | prediction |             | for imitation |        | learning.  |     |     |     |     |     |     |     |
| In Advances | in Neural   |            | Information | Processing    |        | Systems    |     |     |     |     |     |     |     |
(NIPS),2006.
| N.Ratliff,J.A.Bagnell,andM.Zinkevich.   |     |     |     |     | (Online)sub- |     |     |     |     |     |     |     |     |
| --------------------------------------- | --- | --- | --- | --- | ------------ | --- | --- | --- | --- | --- | --- | --- | --- |
| gradientmethodsforstructuredprediction. |     |     |     |     | InProceed-   |     |     |     |     |     |     |     |     |
ingsoftheInternationalConferenceonArtificialIntelli-
genceandStatistics(AISTATS),2007.
| S. Ross. | Comparison | of    | imitation | learning |             | approaches |     |     |     |     |     |     |     |
| -------- | ---------- | ----- | --------- | -------- | ----------- | ---------- | --- | --- | --- | --- | --- | --- | --- |
| on Super | Tux        | Kart, | 2010a.    | URL      | http://www. |            |     |     |     |     |     |     |     |
youtube.com/watch?v=V00npNnWzSU.
     635
