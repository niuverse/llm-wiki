|     |     | VISTA:     |     | A       | Visual |             | Harness   | for     | Reasoning |           |     |     |
| --- | --- | ---------- | --- | ------- | ------ | ----------- | --------- | ------- | --------- | --------- | --- | --- |
|     |     |            |     | in      | an     | Interactive |           | World   |           |           |     |     |
|     |     | QiushiHan* |     | KeyaHu* |        |             | LinluQiu* |         |           |           |     |     |
|     |     |            |     |         |        |             |           | CathyWu |           | KaimingHe |     |     |
MassachusettsInstituteofTechnology
|     |     |     | Code: | https://github.com/joshhhhhan/VISTA |     |     |     |     |     |     |     |     |
| --- | --- | --- | ----- | ----------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
6202 tcO 1  ]IA.sc[  1v00220.0162:viXra Abstract
We show that multimodal models possess strong reasoning abilities and that an appropriate har-
nesscanunlocktheirpotentialtosolvetasksacrossdiverseinteractiveenvironments. Weintroduce
VISTA,avisualharnessthatgivesageneral-purposemultimodalmodellong-horizonvision.VISTA
allowsthemodeltodirectlyperceivetheenvironmentthroughvisualobservationsandmaintainsa
lossless visual memory that preserves past observations in their original form. The model can ac-
tively retrieve these observations and reorganize its visual input as it reasons. On ARC-AGI-3,
VISTA improves Claude Opus 5.0’sRelative Human Action Efficiency score from 40.68 to a per-
fect100.00,withthemodelcompletingall25publicgamesusing57.4%feweractionsthanfirst-time
humanparticipants. VISTA’ssimpledesignalsoallowsittoextendnaturallytodiversevisualenvi-
ronmentswithminimaladaptation. Acrossthreeadditionalbenchmarkscoveringadiverserangeof
visual games and puzzles, it substantially outperforms baselines using the same underlying model
withminimalharnesses. OurresultshighlightVISTA’spotentialasageneral-purposevisualharness
foradvancingmultimodalagentsincomplexvisualenvironments.
1 Introduction
| Weliveinadynamic,high-dimensionalworld. |     |     |     |     |     | Ashumans, |     |     |     |     |     |     |
| --------------------------------------- | --- | --- | --- | --- | --- | --------- | --- | --- | --- | --- | --- | --- |
(a)Languageagent
| we perceive | our       | surroundings, |                   | reason | about | what we | ob-     |     |      |     |     |     |
| ----------- | --------- | ------------- | ----------------- | ------ | ----- | ------- | ------- | --- | ---- | --- | --- | --- |
|             |           |               |                   |        |       |         |         |     | Text | LLM | Act |     |
| serve, and  | act based | on            | our understanding |        | and   | past    | experi- |     |      |     |     |     |
ence[48,56]. However,itremainsunclearwhetherexisting (b)Multimodalagent VLM
| artificial | intelligence | (AI) | systems  | have | a similar  | ability    | to  |     |           |     |     |     |
| ---------- | ------------ | ---- | -------- | ---- | ---------- | ---------- | --- | --- | --------- | --- | --- | --- |
|            |              |      |          |      |            |            |     |     | Image ViT | LLM | Act |     |
| understand | and interact |      | robustly | with | the world, | especially |     |     |           |     |     |     |
inunfamiliarenvironments.
(c)VISTA(ours)
| To study | this question, |     | we use | ARC-AGI-3 |     | [4], a suite | of    |     |          |       |     |     |
| -------- | -------------- | --- | ------ | --------- | --- | ------------ | ----- | --- | -------- | ----- | --- | --- |
|          |                |     |        |           |     |              | Image |     | VLM tool | Views | VLM | Act |
interactivevisualgamesinwhichanagentneedstodiscover
therulesandgoalsofunfamiliarworldsthroughinteraction. iterativevisualtoolcallsbeforeeachaction
Thisbenchmarkistypicallyapproachedasalanguage-based
|                  |            |                                   |     |        |                  |           | Figure1:   | Comparisonofdifferentagentdesigns. |               |                       |               | (a)    |
| ---------------- | ---------- | --------------------------------- | --- | ------ | ---------------- | --------- | ---------- | ---------------------------------- | ------------- | --------------------- | ------------- | ------ |
| problem,         | with large | language                          |     | models | (LLMs)           | receiving | a          |                                    |               |                       |               |        |
|                  |            |                                   |     |        |                  |           | Language   | agents                             | reason        | over textual          | observations. | (b)    |
| textual or       | structured | representation                    |     | of     | the environment, |           | as         |                                    |               |                       |               |        |
|                  |            |                                   |     |        |                  |           | Multimodal |                                    | agents encode | images                | into visual   | repre- |
| showninFigure1a. |            | Buildingonthissetup,acommonstrat- |     |        |                  |           |            |                                    |               |                       |               |        |
|                  |            |                                   |     |        |                  |           | sentations | only                               | once, but     | these representations |               | may be |
egyistousecode-basedmethodsthatconstructaexecutable
|     |     |     |     |     |     |     | compressed, |     | lossy, andinsufficientforsubsequentrea- |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --- | --------------------------------------- | --- | --- | --- |
worldmodelusingsymbolicprograms[11,25,39,62].
|     |     |     |     |     |     |     | soning, | potentially | limiting | the models’ | reasoning | ca- |
| --- | --- | --- | --- | --- | --- | --- | ------- | ----------- | -------- | ----------- | --------- | --- |
We instead reframe ARC-AGI-3 as a vision-based prob- pabilities. (c) VISTA allows the multimodal model to
lem and address it using multimodal models. However, iteratively call visual tools to retrieve past visual ob-
asillustratedinFigure1b,existingvision-languagemodels servationsandreorganizeitsvisualinputasitreasons.
(VLMs)typicallyencodeeachimageonceintovisualrepre- For simplicity, we show the VLM as a vision trans-
sentations [2, 28]. These representations may not preserve former (ViT) encoder followed by an LLM. The two
the details needed as reasoning evolves. Moreover, earlier VLMblocksrepresentthesameunderlyingmodel.
*Co-firstauthors.Email: joshhan, keya hu, linluqiu, cathywu, kaiming @mit.edu
|     |     | {   |     |     |     |     |     |     | }   |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
1

|                    |                          | ARC-AGI-3       |     |     |       |                    |                     | GameWorld            |     |     |       |
| ------------------ | ------------------------ | --------------- | --- | --- | ----- | ------------------ | ------------------- | -------------------- | --- | --- | ----- |
| VISTAharness       |                          |                 |     |     | Agent | VISTAharness       |                     |                      |     |     | Agent |
| Currentobservation | turn67,level3begins      |                 |     |     |       | Currentobservation | turn11,level3,00:07 |                      |     |     |       |
|                    | T h el a ·s t fr a m e o | f tu rn 6 6 i s |     |     |       |                    | T ·a sk : 1 0       | r e d d ia m o n d s |     |     |       |
no w t h e c u r re nt o b se rv at io n . Agent reasoning fo r F ir eb o y , 1 0 b lu e f o r Agent reasoning
|     |     |     | “Newlevelwithnewelements:orangeblobs · |     |     |     |     |     | “Fireboylaunchedstronglyleftandisair- · |     |     |
| --- | --- | --- | -------------------------------------- | --- | --- | --- | --- | --- | --------------------------------------- | --- | --- |
Availableactions: a n d o r a n g e ‘X ’ m a r k e r s. . . . a n o ra n g e b l ob Watergirl.Rolesalter- b o r n e a t x 4 9 7 , y 4 9 0 a b o v e t h e l e f t l o w e r
|     |                              |     | a t ( b c 5 , b r 6 ) b lo | c k s t h e w a y r i g | h t . T e s ti n g |     | n a te e v e r    | y ac tio n; now | p l a t f o r m ; h ≈ e s h | o u ld≈ s e t tl e s a f e l y | a s t i m e a d - |
| --- | ---------------------------- | --- | -------------------------- | ----------------------- | ------------------ | --- | ----------------- | --------------- | --------------------------- | ------------------------------ | ----------------- |
|     | L e v el 3 o f 9 . Norulesor |     |                            |                         |                    |     | W a t e r g i r l | .               |                             |                                |                   |
go a l ar e g iv e n. w h a t a c l i c k d o e s t o a n o r a n g e b l o b .” W a t e r g i r l W A S D v a n c e s . I e x p e c t W a te r g i r l ’ s s y m m e t r i c j u m p
|              |               |     | playclick(264,312) |     | 1gameaction |     | Fireboy |     | ri lowerplatfor≈mforlanding.” g h t f r o m x 6 | 6 2 t o p u t h e r a b | o v e t h e r i g h t |
| ------------ | ------------- | --- | ------------------ | --- | ----------- | --- | ------- | --- | ----------------------------------------------- | ----------------------- | --------------------- |
| Resultofplay | · t u r n 6 7 |     |                    |     |             |     |         |     | WDactW+D0.5s                                    |                         |                       |
6 f r a m e s r et u r n e d a n d Resultofact turn 1 1 1gameaction
|     | a rc h i v e d i n v i s u a | l m e mory, | Agent · reasoning |     |     |     | · 1 f ramereturnedand |     |     |     |     |
| --- | ---------------------------- | ----------- | ----------------- | --- | --- | --- | --------------------- | --- | --- | --- | --- |
eachindexedbyturnand “TheorangeblobturnedintoanXmarker, archived;timer00:07. Agent lookscloserbeforejudging
|     | frame(heret67f0–f5);the |     | andtheonebelowitbecameasolidorange |     |     |     | NowFireboy’sturn. |     | ·   |     |     |
| --- | ----------------------- | --- | ---------------------------------- | --- | --- | --- | ----------------- | --- | --- | --- | --- |
l a s t o n e b e c omesthecurrent s q u a r e . L e t m e i n s pe ct th e a n i m a t i onframes i n s p e c t th e t w o d as h e d re g i o n s : the
o b s e rv a ti o n . (f r e e ) t o u n d er st a n d th is m e c h a ni c . ” W a te r g irlWASD land i n g a re a so f F i re bo y a n d W a t e r g i rl
|     |     |     |     |     |     |     | Fir e b o y |     |     |     | free |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --- | --- | --- | ---- |
inspectthedashedregionoft66f27,
| Resultofinspect | 4archivedviews |     | t67f0,t67f2andt67f5      |                      | free               | R e s u ltofins | p e c t 2re g i o n  | s , en la r g e d   |                                       |                              |                   |
| --------------- | -------------- | --- | ------------------------ | -------------------- | ------------------ | --------------- | -------------------- | ------------------- | ------------------------------------- | ---------------------------- | ----------------- |
|                 | ·              |     |                          |                      |                    |                 | ·                    |                     | Agent reasoning                       |                              |                   |
|                 |                |     |                          |                      |                    | fir eb o y      | wa te rg irl F i r e | b o y is g o n e :  | ·                                     |                              |                   |
|                 |                |     | Agent · reasoning        |                      |                    |                 | agraypuffatthe       |                     | “Watergirlisairborneoverthenarrowsafe |                              |                   |
|                 |                |     | “ C o nfi r m e d : or a | ng e b l o bs p op   | l i k e gr e e n   |                 | p o o l              | ’ s e dg e . W a -  | s t o n e l ip a t x U≈n              | 7 5 1 , j u s t l e f t o f  | t h e re d l ava, |
|                 |                |     | o ne s bu tl e a ve a    | n o ra n g e ‘X ’ re | s i d ue . . . Now |                 | te r g i             | r li s ai r bo rn e | a s i n te n de d .                   | e x p e c t e d l y , F i re | b o y v an -      |
t ( 6 b 6 ef f o 2 r 7 e) t67f0 t67f2 t ( 6 fi 7 na f l 5 ) openingthebc6chimney.” abovethelip. i s h e d i n t o a g ra y p u f f at x 4 9 8— h i s sp r it e
|     |     |     |                                     |                    |                  |     |     |     | o v e r la p p e d th e               | e d g e o f th e≈b lu e | po o l — s o h e       |
| --- | --- | --- | ----------------------------------- | ------------------ | ---------------- | --- | --- | --- | ------------------------------------- | ----------------------- | ---------------------- |
|     |     |     | G UI D E . m d                      | ( tu rn 7 9 ) “ O  | R A N G E        |     |     |     | l i k e l y di e d . I e x            | p e c t a br ie f F ire | b o y w a i t to       |
|     |     |     | blo ck .. . c li c kr               | e m ov e s it←an d | l ea v es a nor- |     |     |     | r e s o l ve t h e d ea t             | h / re s e tw h il e W  | a te r gi rl e i th er |
|     |     |     | angeXmarker(emptyslot)...clickingit |                    |                  |     |     |     | landsonhersafeliporthelevelrestarts.” |                         |                        |
RE-CREATEStheorangeblock.”
|     |     |     |                    |     | free        |     |     |     | actwait0.4s(Fireboy) |     | 1gameaction |
| --- | --- | --- | ------------------ | --- | ----------- | --- | --- | --- | -------------------- | --- | ----------- |
|     |     |     | playclick(312,264) |     | 1gameaction |     |     |     |                      |     |             |
Figure2: VISTAtrajectoriesonARC-AGI-3(left)andGameWorld(right). Theharnessallowstheagenttodirectly
observe the visual states, reason in natural language, and inspect its lossless visual memory at the original level of
detailwhenneeded.
observations may be removed from the context or replaced by textual summaries to stay within the model’s context
limit[27,29,36].Theselimitationsmayconstrainthemodels’reasoningcapabilitiesduringlong-horizoninteractions.
To this end, we introduce VISTA, a visual harness that allows the model to actively reorganize its visual input dur-
ing long-horizon interactions (Figure 1c). The model receives visual observations of the environment that preserve
the appearance and spatial relations of objects. It develops its understanding of the environment through free-form
languagereasoning[42,55]andusesthisunderstandingtopredictactionoutcomesandplansubsequentactions[59].
Insteadofrelyingsolelyonvisualrepresentationsretainedinthemodel’scontext, whichmaybecompressed, lossy,
andinsufficientforsubsequentreasoning,VISTAmaintainsalosslessvisualmemory.Thismemorystoreseveryframe
returned by the environment, including intermediate animation frames, in its original form. The model can retrieve
observationsfromthismemorythroughvisualinspection,selectingframestocompareandspatialregionstoexamine
atdifferentlevelsofdetailbasedonitscurrentreasoningneeds[47,48].Figure2showstwoexampleagenttrajectories
withVISTA,illustratinghowobservation,reasoning,inspection,andactionareinterleaved.
WithVISTA,ClaudeOpus5.0[3]completesall25publicARC-AGI-3gameswithaRelativeHumanActionEfficiency
(RHAE)scoreof100.00withxhighreasoningeffort, using57.4%feweractionsthanthefirst-timehumanbaseline.
VISTAwithGPT-5.6Sol[33]likewisecompletesall25games,achievinganRHAEscoreof99.00withmaxreasoning
effort. To our knowledge, VISTA is the first vision-based system to achieve perfect or near-perfect performance on
ARC-AGI-3 without program synthesis. For comparison, the organizers’ official baselines, which also do not use
programs,achieveRHAEscoresof40.68withOpus5.0highand13.33withGPT-5.6Solmax[5,34].
ThesimplicityofVISTAalsoallowsittoextendnaturallytoothervisualenvironmentswithminimaladaptation. We
applythesamevisualharnessto34browsergamesfromGameWorld[35],10browsergamesfromAIGameStore[60],
and39visualtrackingproblemsfromBabyVision[12]. Together,thesebenchmarkscoverawiderangeofgamesand
visualreasoningtasksthatrequireskillssuchascomplexreasoning,spatialnavigation,andstrategicplanning. GPT-
5.6 Sol with VISTA substantially outperforms baselines that use the same model with minimal harnesses. It also
outperforms the novice human baseline on GameWorld and the human median baseline on AI GameStore. Overall,
theseresultsdemonstrateVISTA’seffectivenessacrossdiversevisualenvironmentsandhighlightvisualharnessdesign
asanimportantdirectionforimprovingmultimodalagents.
2 RelatedWork
ARC-AGIbenchmarks. ARC-AGI-1[14]andARC-AGI-2[15]arebenchmarksdesignedtoevaluateabstractrea-
soning over static input–output grids [16]. Approaches to these benchmarks often use pretrained large language
models[1,8,9,19,26,37],recurrentmodels[23,50],orvision-basedmodels[22].ARC-AGI-3[4]makesthissetting
interactive: an agent must explore novel environments, adapt continuously from its interactions, and take actions to
achieveitsgoals[24]. ExistingapproachestoARC-AGI-3largelyrelyonprogramsynthesis[11,25,39,40,62],in
2

whichagentsperceivetheenvironmentthroughtextualorsymbolicrepresentationsandabstractitintoprogramsthat
canbeexecuted,verified,andsearchedovertoguideactions.WhileeffectiveonARC-AGI-3,theseapproachesrelyon
constructingexplicitprogrammaticabstractionsoftheenvironment. Asenvironmentsbecomemorevisuallycomplex,
representing their states, transition dynamics, and goal conditions with explicit programs may become increasingly
difficult. Incontrast,VISTAoperatesdirectlyonvisualobservationsandreasonsinnaturallanguage.
Computer-useagents. Recentworkhasexploredagentsthatinteractwithcomputersandgraphicaluserinterfacesto
completecomplextasks. Existingapproachesbroadlydifferintheirobservationspace.Text-basedapproachesoperate
overstructuredrepresentationsoftheinterface,suchasHTML,DOMtrees,accessibilitytrees,orelementidentifiers,
and use language models to reason over these representations and take symbolic actions [17, 32, 64]. Vision-based
computer-useagentsinteractdirectlywithscreenshotsandtakegroundedactionssuchasclicks, mousemovements,
andkeyboardinputs[13,30,38,52,57]. VISTAfollowsthevision-basedparadigm: theagentreasonsdirectlyfrom
visualobservationsratherthantextualorsymbolicrepresentationsoftheenvironment. Itfocusesonavisual-centric
harnessforreasoningininteractiveworldsandprovidesasimpleinterfaceforagentstoobserveandinteractwiththe
environment.
Game-playing agents. Games have long served as testbeds for developing agents that learn to perceive, reason,
andactininteractiveenvironments. Classicalapproacheslearnpoliciesthroughreinforcementlearning[31,43,44]or
learnenvironmentdynamicstosupportpredictionandplanning[21,41].Whilethesemethodsprovidegenerallearning
algorithms, they typically require training a separate agent for each game. More recently, foundation models have
enabledmoregeneral-purposeagentsthatoperateinrichergameenvironments. Voyagerusesalargelanguagemodel
together with structured Minecraft observations and an executable skill library [51], while JARVIS-1 incorporates
visual observations and retrieves similar past experiences for planning in Minecraft [53]. Generalist agents such as
SIMAandSIMA2[45,46],Cradle[49],andGame-TARS[54]furtheroperatedirectlyfromvisualobservationsacross
multipleenvironments. Acentralchallengeinthesesystemsisretaininginformationoverlonginteractionhorizons:
prior agents typically maintain only a bounded visual context or selectively store and compress past experiences.
VISTA instead preserves the complete visual interaction history losslessly and allows the agent to actively revisit
arbitrarypreviousframesandregionsduringreasoning.
3 VISTA:AVisualHarness
VISTAletsthemodeldirectlyperceivetheenvironmentthroughvisualinputs. However,existingmultimodalsystems
typicallyencodevisualobservationsonceanddiscardtherawinputs. Asthecontextfills,theserepresentationsmay
beremovedorreplacedbytextualsummaries,andthemodelmaynotcontrolwhatisretained. Moreimportantly,the
model may not know at encoding time which visual information will matter later: a representation sufficient at one
stagemayomitdetailsrequiredinsubsequentreasoningsteps.
These limitations directly motivate the design of VISTA, which preserves original observations in a lossless visual
memory and provides tools for the model to retrieve and inspect them during interaction. This allows the model to
revisit visual evidence and reorganize its visual input as it reasons, without requiring all relevant information to be
capturedintheinitialvisualencodingandretainedinthemodel’scontext.
3.1 VisualHarnessComponents
Weintroducethreekeyvisualharnesscomponents: visualobservations,whichallowstheagenttoperceivetheenvi-
ronmentthroughrenderedimages;losslessvisualmemory,whichpreservesvisualobservationsintheiroriginalform;
andvisualinspection,whichallowsthemodeltorevisitvisualevidenceandexaminedetailsasneeded.Together,these
componentsprovidethemodelwithanexplicitattentionmechanismovertheinteractionhistory,allowingittoselect
whichframesandregionstoexamineduringreasoning.
Visualobservation. Themodelreceivesvisualobservationsfromtheenvironment(Figure.3a). Theseobservations
preservetheappearanceandspatialrelationofobjects,allowingthemodeltouseitslearnedvisualpriorstointerpret
andreasonabouttheenvironment.
Losslessvisualmemory. Theharnessstoreseveryframereturnedbytheenvironment,includingintermediateani-
mationframes,initsoriginalform(Figure.3b).Eachframeisindexedbyturnandframenumberandremainsavailable
throughouttheinteraction,independentlyofwhatisretainedinthemodel’scurrentcontext.
Visualinspection. Buildingonthevisualmemory,weprovidetheagentwithtoolstoactivelyinspectvisualinfor-
mationinspaceandacrosstime(Figure3c). Inspace,itcanrequestanenlargedviewofanyrectangularregionfrom
3

| (a)Visualobservations |     | (b)Losslessmemory |     | (c)Visualinspection |     |     |
| --------------------- | --- | ----------------- | --- | ------------------- | --- | --- |
64 64textgrid renderedimage everyframetheworldhasreturned inspace:anyregionofaframe
×
returnedmagnified,atfullresolution
|     |     | ··· | ··· | acrosstime: severalframes,fromanyearlierturns |     |     |
| --- | --- | --- | --- | --------------------------------------------- | --- | --- |
|     |     |     |     | ···                                           | ··· | ··· |
Everyframeiskeptatfullresolutionand
| eachcellisadigit | eachcellisapixel |                                         |     |                 |         |     |
| ---------------- | ---------------- | --------------------------------------- | --- | --------------- | ------- | --- |
|                  |                  | staysaddressablebyitsturnandframeindex. |     | turn125 turn128 | turn139 |     |
(d)Per-turnpipeline
Agentnotes Losslessvisualmemory
|     | GUIDE.md:thedurablerulesofthegame |     |     | everyreturnedframe, |     |     |
| --- | --------------------------------- | --- | --- | ------------------- | --- | --- |
atfullresolution
|     | WORKING.md:ascratchpadforthelevel |     |     |     |     | ··· |
| --- | --------------------------------- | --- | --- | --- | --- | --- |
optional
|     |           | optional                 |          |            | allframes         |     |
| --- | --------- | ------------------------ | -------- | ---------- | ----------------- | --- |
|     |           | read update              | inspect  | readpixels |                   |     |
|     |           | ·                        |          | ·          |                   |     |
|     | 1 Observe |                          | 2 Reason |            | 3 Act             |     |
|     |           | free-formnaturallanguage |          | play       | executesoneaction |     |
currentframe availableactions hypothesize predict plan theonlystepthatcostsanaction
|     | ·   |     | · · |     |     |     |
| --- | --- | --- | --- | --- | --- | --- |
thelastreturnedframebecomesthenextobservation
Figure3: VISTA’skeydesigncomponentsandper-turnpipeline. WeuseARC-AGI-3asanexample. (a)Visual
observations: Themodelreceivesrenderedvisualstates. (b)Losslessvisualmemory: Everyreturnedframeisstored
in its original form. (c) Model-directed visual inspection: The model selects frames and regions to examine during
reasoning. (d) Per-turn pipeline: The agent observes, reasons, and acts, while each returned frame is preserved in
visualmemory. Revisitingpastobservationsandupdatingnotesareoptionalstepsdirectedbythemodel.
theoriginalframe,allowingittoexaminefine-graineddetailsthatmaybedifficulttoperceiveinthefullimage.Across
time, it can retrieve and inspect multiple frames from arbitrary earlier turns to revisit past visual evidence, compare
states,andreplayhowanactionunfoldedthroughitsintermediateanimationframes. Ateachturn,themodelisfree
todecidewhethertoinspectitsvisualmemoryandwhichframesorregionstoexamine.
3.2 Pipeline
Inourpipeline,themodelandtheharnessinteractthroughamulti-turnconversation(Figure2). Theharnessispurely
mechanicalanddoesnotinvolveanytrainedmodel:itexecutestoolcallsrequestedbythemodel,returnsoutputssuch
asimagesorpixelvalues,andreportserrorsforinvalidrequests. Themodelreasonsovertheseoutputsandissuesits
nextrequesttotheharnessifneeded.
Asingleagentinteractswitheachgamethroughouttherun. Eachgameturnmayincludemultipleexchangeswiththe
harness before the agent executes one game action (Figure 3d). At the start of a turn, the agent receives the current
visual state and available actions. It can also consult two notes that it maintains: GUIDE.md, which records its
understandingofthegameandinformationthatmayremainusefulacrosslevels,andWORKING.md,whichservesas
ascratchpadforthecurrentstate.Throughinspect,theagentcanrevisitearlierobservations,includingintermediate
animationframesproducedbyitspreviousactions. Itcanalsouseread pixelstoexaminepixelvalueswithina
selectedregion. Consultingthenotesandusingtheinspectiontoolsareoptionalandlefttotheagent’sdecision.
Theagentusesfree-formlanguagetoreasonandplan. Itpredictstheoutcomeofitsplannedaction,revisesitsnotes
toreflectitsupdatedunderstandingoftheenvironment,andcallsplaytoexecutethechosenactionandadvanceto
thenextgameturn. Whenitscontextapproachesthelimit,theagentwritesaconcisehandoffsummaryandresumes
fromthecurrentstateinafreshcontext. Itsnotes(GUIDE.mdandWORKING.md),visualmemory,andactionhistory
remainavailable.
EverygameusesthesameinterfaceandshortpromptasshowninAppendixA.5. Theavailabletools(e.g.,inspect,
read pixels,andplay),togetherwiththeirpseudocodeandcorrespondingdescriptionsareprovidedtotheagent,
asshowninAppendixA.4).
4

| level1                          |     |     |     |     | level3                          |     |     |     |     |     |
| ------------------------------- | --- | --- | --- | --- | ------------------------------- | --- | --- | --- | --- | --- |
| #actions:VISTAagent:16,human:32 |     |     |     |     | #actions:VISTAagent:41,human:75 |     |     |     |     |     |
cleared cleared
| start |     |     |     |     | start |     |     |     |     |     |
| ----- | --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- |
turns3–7 turns8–16 turns34–41 turns42–47 turns48–59 turns60–67 turns68–74
|     |     | 5   |     | 9   |     |     | 7   | 5   | 12  | 7 7 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|     |     | ×   |     | ×   |     |     | ×   | ×   | ×   | × × |
Figure4: ExampletrajectoryinARC-AGI-3. Eachframeislabeledwithitsturnandaction;×N denotesrepeated
actions. Boxes mark targets, and rings mark the agent’s clicks. The agent must infer the rules: black pieces move
together with their reflections across the mirror line, and all yellow targets must be covered. Level 3 introduces a
movablehorizontalmirrorlineandselectablepieces.
4 VISTAonARC-AGI-3
4.1 Setup
Dataset. ARC-AGI-3[4]consistsofinteractivevisualgameswhoserulesandobjectivesarenotprovidedexplicitly.
We evaluate on the 25 public games. At each step, the agent observes the current visual state, selects an available
action,andusestheresultingobservationtoinferobjectroles,transitionrules,hiddenstates,andpossiblegoals. Each
game contains multiple levels that share underlying mechanics while introducing new concepts, objects, layouts, or
constraints. Theagentthereforeneedstoretainandapplypreviouslyinferredknowledgeacrosslevelswhilecontinu-
allyadaptingitsunderstandingthroughinteraction. Figure4showsanexampleagenttrajectory.
Evaluationmetrics. PerformanceismeasuredbyRelativeHumanActionEfficiency(RHAE)[6],whichcompares
an agent’s action efficiency with that of first-time human players. A completed level receives 100% credit when its
actioncountmatchesthehumanbaseline,upto115%whenitusesfeweractions,andpartialcreditwhenitusesmore
actions. Unfinishedlevelsreceivezerocredit. Laterlevelsreceivegreaterweight,andeachgamescoreiscappedby
| theweightedfractionoflevelscompleted. |     |     |     |     | SeeAppendixA.3fordetails. |     |     |     |     |     |
| ------------------------------------- | --- | --- | --- | --- | ------------------------- | --- | --- | --- | --- | --- |
Models. We instantiate VISTA with two general-purpose, closed-weight multimodal model backends commonly
used in prior work. Each backend is evaluated independently under the same interaction protocol. We use Claude
Opus5.0[3]runwithextra-highreasoningeffortthroughtheClaudeCodeCLIandGPT-5.6Sol[33]runwithmax
reasoningeffortthroughtheCodexCLI.
4.2 Results
Table1showsasystem-levelcomparisononthe25pub-
|               |     |        |        |           |        |      | Table1: System-levelcomparisonon25publicgamesof |           |                   |                |
| ------------- | --- | ------ | ------ | --------- | ------ | ---- | ----------------------------------------------- | --------- | ----------------- | -------------- |
| lic ARC-AGI-3 |     | games, | unless | otherwise | noted. | With |                                                 |           |                   |                |
|               |     |        |        |           |        |      | ARC-AGI-3.                                      | VISTA is, | to our knowledge, | the first sys- |
ClaudeOpus5.0,VISTAachievesaperfectRHAEscore
temtoachieveperfectornear-perfectperformancewithout
| of 100.00, | matching | other | state-of-the-art |     | systems. |     | It  |     |     |     |
| ---------- | -------- | ----- | ---------------- | --- | -------- | --- | --- | --- | --- | --- |
programsynthesis.
uses7,302actionsintotal,57.4%fewerthanthehuman
referenceof17,135actions.
|     |     |     |     |     |     |     | System | Program | Model | Effort RHAE |
| --- | --- | --- | --- | --- | --- | --- | ------ | ------- | ----- | ----------- |
Most of the compared systems come from concurrent GPT-5.6Sol[34] max 13.33
|     |     |     |     |     |     |     | Officialimpl.[4] | No  |     |     |
| --- | --- | --- | --- | --- | --- | --- | ---------------- | --- | --- | --- |
work. These systems typically represent observations Opus5.0† high 40.68
| as text-based | numerical |     | grids | and often | reason | using | a   |     |            |                 |
| ------------- | --------- | --- | ----- | --------- | ------ | ----- | --- | --- | ---------- | --------------- |
|               |           |     |       |           |        |       |     |     | GPT-5.6Sol | xhigh max 95.35 |
code-basedworldmodel:theagentabstractstheenviron- Schema[62] Yes →
|     |     |     |     |     |     |     |     |     | Opus4.8 Fable5 | max 98.98 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | -------------- | --------- |
→
| ment into      | symbolic | programs     |     | that can       | be executed | and   |                |     |            |             |
| -------------- | -------- | ------------ | --- | -------------- | ----------- | ----- | -------------- | --- | ---------- | ----------- |
|                |          |              |     |                |             |       | ewmasvv1.6[39] | Yes | GPT-5.6Sol | xhigh 98.97 |
| checked during |          | exploration. | To  | our knowledge, |             | VISTA |                |     |            |             |
isthefirstsystemtoachieveperfectornear-perfectper- Retrodict[11] Yes GPT-5.6Sol max 99.86
| formance | on ARC-AGI-3 |     | without | program |     | synthesis. |           |     |            |            |
| -------- | ------------ | --- | ------- | ------- | --- | ---------- | --------- | --- | ---------- | ---------- |
|          |              |     |         |         |     |            | Tycho[25] | Yes | GPT-5.6Sol | max 100.00 |
For comparison, the same model scores only 40.68 un- Opus5.0 xhigh 100.00
| der the official |         | implementation. |          | In Figure | 6,    | we also  |       |     |            |              |
| ---------------- | ------- | --------------- | -------- | --------- | ----- | -------- | ----- | --- | ---------- | ------------ |
|                  |         |                 |          |           |       |          |       |     | GPT-5.6Sol | max 99.00    |
| compare          | textual | grids           | with our | default   | image | observa- | VISTA | No  |            |              |
|                  |         |                 |          |           |       |          |       |     | Opus5.0    | xhigh 100.00 |
tions. Wefindthatvisualobservationsachievecompara-
ble performance with fewer actions while using signifi- †Calculatedfromtheofficiallyreportedper-gamescoresforthe25publicgames[7].
cantlyfewertokens.
5

Officialimplementation(textgrid) 13.33 10,619 4
(i)Officialimplementation(imageobservations) 47.32 16,343 36
(ii)+increasedactionandtimelimits 51.66 22,544 44
(iii)+continuousconversation 65.82 28,626 60
(iv)+GUIDE.mdandWORKING.md 70.05 23,702 76
(v)+losslessmemoryandinspection 94.10 12,261 96
(vi)+pixelreadout(fullVISTA) 99.00 9,126 100
0 25 50 75 100 0 10K 20K 30K 0 25 50 75 100
RHAE(%) #actions Gamescompleted(%)
(a) (b) (c)
Figure5: HarnessconfigurationsonARC-AGI-3. GPT-5.6Solunderprogressivelyricherharnessconfigurations,
evaluated using (a) RHAE, (b) the total number of actions taken across the 25 games, and (c) the percentage of
the25gamescompleted. Forreference,theofficialimplementationusingtextualgrids(hatchedgraybars)achievesa
reportedRHAEscoreof13.33with10,619actions[5,34].(i)TheofficialimplementationwithPNGimagesreplacing
its textual grid observations. (ii) Increases the action and time limits to match our evaluation protocol (up to 2,000
actionspergame)insteadoftheofficialstoppingcriteria.(iii)Addsacontinuousconversation,usingthemodel’snative
compactiontocontinuepastitscontextlimit.(iv)Addsthetwonotes,GUIDE.mdandWORKING.md,andencourages
theagenttobuildacompactandrevisablemodelofthegame. (v)Addslosslessvisualmemoryandinspection. (vi)
Adds exact pixel readout, completing VISTA. Configurations (i)–(iv) automatically receive up to seven frames per
action, following the official protocol; configurations (v)–(vi) introduce VISTA’s key visual components: the agent
automaticallyreceivesonlythefinalframeandcanactivelyinspectitsvisualmemoryasitreasons. SeeAppendixA.2
fordetails.
Textgrid 2Dimage RHAE(%) #actions #tokenspergame
100 96.75 99.00 12K 75M 71.9M
10,614
9,126
75
8K 50M
50 30.7M
4K 25M
25
0 0 0
Text Image Text Image Text Image
(a) (b)
Figure 6: Comparison of observation representations on ARC-AGI-3. (a) An example game state shown as a
flattened text grid and a 2D image; the displayed text grid is cropped from the full 64×64 grid. (b) RHAE, total
actionsacrossthe25games,andaveragetokenusagepergameforthetwoobservationrepresentations.
4.3 Ablations
Forallablations,weuseGPT-5.6Solwithmaxreasoningeffortanda200K-tokencontextlimitasthedefaultsetting.
Theagentreceivesa512×512PNGimageofthecurrentrenderedstate,obtainedby8×nearest-neighborupscaling
oftheofficial64×64frame.
Effects of VISTA components. We compare GPT-5.6 Sol under progressively richer harness configurations in
Figure 5. The official implementation uses textual grids and has a reported RHAE score of 13.33 with 10,619 ac-
tions[5,34]. ReplacingthesetextualgridswithrenderedPNGimages(i)increasesthescoreto47.32,demonstrating
the importance of visual observations. The low action count is partly due to runs reaching the action or time limit
beforecompletingthegames,assuggestedbythelowcompletionrateinthisconfiguration. Increasingtheactionand
timelimitsimprovesthescoreto51.66(ii). In(iii),weintroduceaminimalagentharnessthatmaintainsacontinuous
conversationandusesnativecompactiontocontinuebeyonditscontextlimit,improvingthescoreto65.82. Configu-
ration(iv)addstwonotefiles,GUIDE.mdandWORKING.md,alongwithinstructionsencouragingtheagenttobuild
acompactandrevisablemodelofthegame,furtherimprovingthescoreto70.05(seethepromptinAppendixA.5).
Finally,configurations(v)–(vi)introduceVISTA’skeyvisualharnesscomponents:addinglosslessvisualmemoryand
model-directedinspection(v)improvesthescoreto94.10, whileexactpixelreadout(vi), whichprovidesnumerical
RGBvaluesforselectedpixels,completestheVISTAharnessandincreasesthescoreto99.00.
Reasoning directly from images. Prior approaches to ARC-AGI-3 commonly represent each frame as a textual
grid, encoding observations as rows of integer color indices [11, 25, 39, 62]. In contrast, VISTA reasons directly
6

|     |     | RHAE(%) |     |     |     |     | #actions |     |     |     |     | #tokenspergame |     |     |
| --- | --- | ------- | --- | --- | --- | --- | -------- | --- | --- | --- | --- | -------------- | --- | --- |
105.7M
|     | 98.6 | 99.0 |     |     |     |     |     |        |     |      |     |     | 84.1M |     |
| --- | ---- | ---- | --- | --- | --- | --- | --- | ------ | --- | ---- | --- | --- | ----- | --- |
| 100 |      |      |     |     | 16K |     |     |        |     | 100M |     |     |       |     |
|     |      |      |     |     | 14K |     |     | 12,391 |     |      |     |     |       |     |
95
|     |      |      | 94.4 |      | 12K |       |       |      |        | 50M | 17.3M | 30.7M |           |      |
| --- | ---- | ---- | ---- | ---- | --- | ----- | ----- | ---- | ------ | --- | ----- | ----- | --------- | ---- |
|     | 90   |      |      | 93.9 | 10K | 8,395 | 9,126 |      | 12,321 |     |       |       |           |      |
|     | 85   |      |      |      | 8K  |       |       |      |        |     | 0     |       |           |      |
|     | 100K | 200K | 500K | 780K |     | 100K  | 200K  | 500K | 780K   |     | 100K  |       | 200K 500K | 780K |
Maximumcontextsize(tokens)
(a)
|     |      | RHAE(%) |     |     |     |     | #actions |     |        |      |     | #tokenspergame |     |     |
| --- | ---- | ------- | --- | --- | --- | --- | -------- | --- | ------ | ---- | --- | -------------- | --- | --- |
|     |      | 99.7    |     |     |     |     |          |     | 15,331 |      |     |                |     |     |
| 100 | 96.6 |         |     |     | 16K |     |          |     |        | 100M |     |                |     |     |
71.1M
|     | 95  |     | 99.0 |     | 1 4 | K 12,590 |     |       |     |     |       |     |       |     |
| --- | --- | --- | ---- | --- | --- | -------- | --- | ----- | --- | --- | ----- | --- | ----- | --- |
|     |     |     |      |     | 1 2 | K        |     |       |     | 50M | 39.8M |     | 30.7M |     |
|     | 90  |     |      |     |     |          |     | 9,126 |     |     |       |     |       |     |
10K
28.2M
|     | 85  |     |     | 88.3 | 8K  |     | 8,849 |     |     |     | 0   |     |     |     |
| --- | --- | --- | --- | ---- | --- | --- | ----- | --- | --- | --- | --- | --- | --- | --- |
|     | 2   | 4   | 8   | 16   |     | 2   | 4     | 8   | 16  |     | 2   |     | 4 8 | 16  |
|     | ×   | ×   | ×   | ×    |     | ×   | ×     | ×   |     | ×   | ×   |     | × × | ×   |
Inputimagescale(pixelsperside)
(b)
Figure7: AblationsonARC-AGI-3. Leftcolumn: RHAE.Middlecolumn: thetotalnumberofactionstakenacross
the25games. Rightcolumn: theaveragenumberoftokenspergame. (a): maximumcontextsize, whichsetswhen
|                          |     |     |     | inputimagescalerelativetotheofficial64×64frame; |     |     |     |     |     |     |     | scalesof2×, | 4×, | 8×, |
| ------------------------ | --- | --- | --- | ----------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | ----------- | --- | --- |
| contextcompactionoccurs. |     |     |     | (b):                                            |     |     |     |     |     |     |     |             |     | and |
16× correspond to 128, 256, 512, and 1,024 pixels per side and roughly 20, 77, 308, and 1,229 image tokens per
frame,respectively.
fromrenderedimages. WeablatethisdesignchoicebyreplacingVISTA’simageobservationswithtextualgridswhile
keeping the rest of the harness unchanged. As shown in Figure 6, using textual grids maintains comparable perfor-
mancebutslightlyincreasesthetotalnumberofactions. Textualgridsarealsosubstantiallymoretoken-intensive: a
64×64gridrequiresroughly4,000tokens,comparedwithapproximately308imagetokensforourdefault512×512
observation. Tokenusagepergameis71.9Mwithtextualgridsand30.7Mwithimageobservations.
WevaryVISTA’smaximumcontextsize,whichdetermineshowmuchinteraction
Effectofmaximumcontextsize.
history is retained before the agent compacts its history and resumes in a fresh context. As shown in Figure 7a, the
default 200K setting achieves the highest RHAE of 99.00. Larger contexts are substantially more expensive: 780K
consumes105.7Mtokenspergame,comparedwith30.7Mat200K.Reducingthecontextto100KlowersRHAEby
only0.4whileroughlyhalvingtokenusage,showingthattheharnessremainseffectiveevenwithshortercontexts.
Effect of input image scale. We vary the input image scale to study the trade-off between visual resolution and
imagetokenusage. The2×,4×,8×,and16×scalescorrespondto128,256,512,and1,024pixelsperside,requiring
approximately 20, 77, 308, and 1,229 image tokens per frame, respectively. As shown in Figure 7b, 4× uses 75%
fewerimagetokensthanthedefault8×whileachievingcomparableperformance. Reducingthescaleto2×degrades
performance,whileincreasingitto16×providesnoadditionalbenefitandcostsmoretokenspergame,likelybecause
theextraimagetokensconsumecontextwithoutimprovingvisualreasoning.
| Resultswithanopen-weightmodel. |     |     |     |     | Weadditionally |     |     |     |     |     |     |     |     |     |
| ------------------------------ | --- | --- | --- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
evaluate VISTA with the open-weight backend GLM- GLM-5.3Flash320B
| 5.3Flash320B[20,63].   |          |                 | Thisgivesafullyopen-source |     |             |          |                       |                        |     |     |      |     |     |     |
| ---------------------- | -------- | --------------- | -------------------------- | --- | ----------- | -------- | --------------------- | ---------------------- | --- | --- | ---- | --- | --- | --- |
|                        |          |                 |                            |     |             |          |                       | Officialimplementation |     |     | 1.89 |     |     |     |
| andreproduciblesystem. |          |                 | Figure8comparestheRHAE     |     |             |          |                       |                        |     |     |      |     |     |     |
| scores                 | of three | configurations: |                            | the | organizers’ | official | VISTAw/ovisualharness |                        |     |     |      |     |     |     |
13.27
implementation,whichweranwithitsminimalharness;
|       |         |            |          |       |         |     |      |     | VISTA |     |     |     | 66.93 |     |
| ----- | ------- | ---------- | -------- | ----- | ------- | --- | ---- | --- | ----- | --- | --- | --- | ----- | --- |
| VISTA | without | the visual | harness, | which | removes |     | only |     |       |     |     |     |       |     |
inspect and read pixels tools; and full VISTA. 0 25 50 75 100
| VISTAachievesanRHAEscoreof66.93,  |     |     |     |                     |     | substantially |        |     |            |     |           |     | RHAE(%)   |       |
| --------------------------------- | --- | --- | --- | ------------------- | --- | ------------- | ------ | --- | ---------- | --- | --------- | --- | --------- | ----- |
| outperformingtheofficialbaseline. |     |     |     | Theseresultsfurther |     |               |        |     |            |     |           |     |           |       |
|                                   |     |     |     |                     |     |               | Figure |     | 8: Results | on  | ARC-AGI-3 |     | using the | open- |
supportVISTA’seffectivenessacrossmodelbackends.
|     |     |     |     |     |     |     | weightGLM-5.3Flash320Bmodel. |     |              |                |     |     | WecompareVISTA  |      |
| --- | --- | --- | --- | --- | --- | --- | ---------------------------- | --- | ------------ | -------------- | --- | --- | --------------- | ---- |
|     |     |     |     |     |     |     | against                      |     | the official | implementation |     |     | using a minimal | har- |
Effects of 3D rendering. We evaluate VISTA under ness, as well as a VISTA variant with inspect and
more challenging visual conditions by rendering the read pixelsremoved. VISTA’svisualharnessleadsto
same games in 3D. As shown in Figure 9, the model asignificantperformanceimprovement.
7

|     | SP80 |     |     | LF52 |     |     | RHAE(%) |     | #actions |
| --- | ---- | --- | --- | ---- | --- | --- | ------- | --- | -------- |
99.00
|     |     |     |     |     |     | 100 |       | 24K |        |
| --- | --- | --- | --- | --- | --- | --- | ----- | --- | ------ |
|     |     |     |     |     |     |     | 84.12 |     | 20,640 |
75
16K
50
9,126
8K
25
|     |     |     |     |     |     |     | 0     | 0   |       |
| --- | --- | --- | --- | --- | --- | --- | ----- | --- | ----- |
|     |     |     |     |     |     |     | 2D 3D |     | 2D 3D |
|     |     |     | (a) |     |     |     |       | (b) |       |
Figure9:3DrenderingsofARC-AGI-3. (a)Twogamesrenderedin3D.(b)RHAEscoresandtotalactioncountsfor
VISTAusing2Dimagesand3Drenderings.
| (a)Acrossspaceandtime |     |                      |     |     |     |     | (b)Localvisualdetails |     |     |
| --------------------- | --- | -------------------- | --- | --- | --- | --- | --------------------- | --- | --- |
| Losslessvisualmemory  |     | 1,472frameskeptsofar |     |     |     |     |                       |     |     |
| ···                   |     |                      | ··· | ··· |     |     |                       |     |     |
turn122 turn125 turn128 turn139 turn145 now Currentview Returnedbyoneinspectcall,
enlargedabout13
×
|     |     |     |     |     |     |     |     | A B | C   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
A B
|     | ↓   | ↓   | ↓   | ↓   |     | ↑   |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
C
|               |           |     |               |          |                 |     |                    | guardAat(1,2) guardBat(1,3) | guardCat(3,0) |
| ------------- | --------- | --- | ------------- | -------- | --------------- | --- | ------------------ | --------------------------- | ------------- |
| turn125       | turn128   |     | turn139       | turn145  | turn147         |     | turn33 · fullframe |                             |               |
| afterredclick | beforered |     | afterredclick | gameover | justafterareset |     |                    |                             |               |
Recalledfrommemorybyoneinspectcall
Currentview
i n s p e ct t he qu e s tio n it a s k s i n sp e c t t h e qu e s t i o n it a s k s
|     | ·   |     |     |     |     |     | ·   |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
“Wh a t d o es the m ap lo o k li ke a f t er thegravityflip(redclicked) “Wh i ch fa c e (u p / d ow n /l e f t /r ig ht ) d o eseach
redguard’spurplemarkersiton?”
—wheredidtheplayerlandandwhatisbelow?”
|     | A g e n t w h a | t it co n cl u d es |     |     |     |     | A g e n t · w h a | t i t c o n cl ud e s |     |
| --- | --------------- | ------------------- | --- | --- | --- | --- | ----------------- | --------------------- | --- |
· “F a c in g s c o n fi r m e d : A (1 , 2) right,B(1,3) down,
“I ’l l t es t w h e th er th e r e d blockissolidorpassable. First,moverightto- → →
wardit. Expectation: theplayermovesonecellrighteachaction,staying C(3,0) right. Theirfacedcells(1,3),(2,3),(3,1)are
allontheonlyroutes,soeachguardmustbedestroyed →
onrow6undertherockceiling.”
|     |     |     |     |     |     |     | fromasafeside,intheorderA | →   | B → C.” |
| --- | --- | --- | --- | --- | --- | --- | ------------------------- | --- | ------- |
Figure10:Model-directeduseofvisualmemory. (a)Inspectacrossspaceandtime:aftertheboardresets,themodel
retrievesfourframesfromthepreceding22turnsinasingleinspectcalltoreconstructthemap. (b)Inspectlocal
visualdetails: themodelusesinspecttozoominonthreesmallblocksbyabout13×. Theenlargedviewsreveal
whichsideofeachblockcarriesapurplemarker,allowingthemodeltoidentifyeachblock’sorientation.
achieves an RHAE score of 84.12 with 20,640 actions. Although VISTA requires substantially more interaction
with these renderings than with the default 2D images, it still achieves strong performance and outperforms official
textualbaselinesbyalargemargin. Theseresultsdemonstrateitsrobustnesstomorecomplexvisualrepresentations
and its ability to generalize beyond 2D representations. As we further show in Section 5, VISTA remains effective
acrossabroaderrangeofvisualenvironments,including3Dgames.
4.4 QualitativeAnalysis
ThekeycomponentsoftheVISTAharnessarelosslessvisualmemoryandvisualinspection,whichallowtheagentto
revisitstoredvisualinformationatanypointduringinteraction.Thesecomponentsprovideaformofexplicitattention
overinteractionhistory. Here,weshowqualitativeexamplesofhowagentsbenefitfromthisre-attentionmechanism.
Figure10aillustratesre-attentionacrossspaceandtime. Theagentrevisitsearlierframestorecoverinformationthat
isnolongervisibleinitscurrentobservation. Inthisexample,itinspectsframesfromdifferentpointsinthetrajectory
andintegratestheirinformationtoreconstructtheoverallmap.Figure10billustratesre-attentiontolocalvisualdetails.
The agent selectively zooms into a small region of a stored observation to determine a block’s orientation, which is
difficulttoseeclearlyinthefull512×512frame. Together,theseexamplesillustratetwocomplementaryformsofre-
attentionenabledbylosslessvisualmemory: integratingvisualevidenceacrosstheinteractionhistoryandinspecting
localdetailsatthegranularityrequiredbythecurrenttask.
8

| GameWorld |     |     |     |     | AIGameStore |     |     |     | BabyVision |     |     |     |
| --------- | --- | --- | --- | --- | ----------- | --- | --- | --- | ---------- | --- | --- | --- |
34interactivegames,170tasks 10interactivegames 39staticquestions
Pac-Man Mario 2048 Snake AquaSort BubbleCash Jetpack connectlines
| GeoDash | Tetris | Breakout |     | FlappyBird | FlingFeathers | CheeseChase | Megaman |     |     |     |     |     |
| ------- | ------ | -------- | --- | ---------- | ------------- | ----------- | ------- | --- | --- | --- | --- | --- |
maze
| Run3 | TempleRun2 | Minecraft |     | Fireboy | AoOni | BattleZone | RedHotVeng. |     |     |     |     |     |
| ---- | ---------- | --------- | --- | ------- | ----- | ---------- | ----------- | --- | --- | --- | --- | --- |
Freshhumanplayers Officialimplementation VISTA Bestpreviouslyreported
|     | GameWorld      |      |     | GameWorld   |      |     | AIGameStore   |       |     |      | BabyVision  |      |
| --- | -------------- | ---- | --- | ----------- | ---- | --- | ------------- | ----- | --- | ---- | ----------- | ---- |
|     | Successrate(%) |      |     | Progress(%) |      |     | Geometricmean |       |     |      | Accuracy(%) |      |
| 100 |                |      | 100 |             |      | 150 |               | 140.3 | 100 | 92.3 |             |      |
| 75  |                |      | 75  |             | 79.3 |     |               |       | 75  |      |             |      |
|     |                | 63.3 |     | 64.1 62.9   |      | 100 | 100           |       |     |      |             | 63.2 |
55.3
| 50  |      |     | 50      |     |     |      |      |     | 50  |     |      |      |
| --- | ---- | --- | ------- | --- | --- | ---- | ---- | --- | --- | --- | ---- | ---- |
|     | 40.0 |     |         |     |     | 39.8 |      |     |     |     | 41.0 |      |
|     |      |     |         |     |     | 50   | 47.3 |     |     |     |      | 25.7 |
| 25  |      |     | 20.0 25 |     |     |      |      |     | 25  |     |      |      |
| 0   |      |     |         | 0   |     | 0    |      |     | 9.0 | 0   |      |      |
Figure11: Evaluationenvironmentsandresults. Top: examplesfromthethreebenchmarks. GameWorldandAI
GameStoreareinteractive,whileBabyVisionisstatic. Bottom:VISTAwithGPT-5.6Solcomparedwithhumanplay-
ersandtheofficialimplementationusingaminimalharness. WereportsuccessrateandprogressforGameWorld,the
geometricmeanofhuman-normalizedscores(humanmedian=100)forAIGameStore,andaccuracyforBabyVision.
Thedashedlinemarksthebestpreviouslyreportedresult.
5 GeneralVisualEnvironments
VISTA’sgeneral-purposedesignallowsustonaturallyapplythesamevisualharnesstootherbenchmarkswithminimal
adaptation. WeevaluateVISTAontwointeractivegamebenchmarks: GameWorld[35]andAIGameStore[60]. We
alsoevaluateonastaticvisualreasoningbenchmark,BabyVision[12],toexaminetheroleofvisualinspectionwithout
interactionwithadynamicenvironment. Foreachbenchmark, wecompareVISTAwiththeofficialimplementation
usingthesamemodel. Wealsoreporthumanperformanceandthebestpreviouslyreportedresultasreferences. See
AppendicesA.3andA.6fordetails. Figure11showsanoverviewoftheseenvironments. AppendixFigure14shows
exampleVISTAtrajectoriesonbothinteractiveandstatictasks.
5.1 Setup
GameWorld. GameWorld [35] contains 34 browser games with 170 tasks across five genres: arcade, platformer,
puzzle,runner,andsimulation. Theagentreceivesonlytheofficialtaskprompt,availablecontrols,andscreenshots.
WeevaluateVISTAusingthecomputer-useinterface, throughwhichtheagentinteractswiththegamesdirectlyvia
keyboard and mouse actions. We report success rate (SR), defined as the fraction of the 170 tasks completed, and
progress(PG),whichalsocreditspartialcompletion.Bothmetricsarecomputedbythebenchmark’sofficialevaluator.
AI GameStore [60] contains 10 public browser games. The agent receives only the public game
AI GameStore.
description, controls, and visual observations. Through interaction, it must infer the game dynamics and determine
howtoachievetheobjectives.Eachgameusesitsownscoringsystem.Followingthebenchmark’sofficialprotocol,we
normalizeeachrawscoresothatthecorrespondingpublishedhumanmedianequals100,thencomputethegeometric
meanofthenormalizedscoresacrossthetengames.
BabyVision. BabyVision[12]contains388staticvisualreasoningtasksacross22subclasses. Eachtaskconsistsof
asinglestaticimageandaquestion. Theagentperceivestheimageandcandecidewhichvisualregionstoinspectand
whichindividualpixelstoread. Weevaluateonthe39questionsfromtwoVisualTrackingsubtypes: 20mazetasks
| and19connecting-linestasks. |     |     | Wereportaccuracyacrossthesetasks. |     |     |     |     |     |     |     |     |     |
| --------------------------- | --- | --- | --------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
5.2 Results
Figure11showsourresults. Acrossallthreebenchmarks, VISTAconsistentlyoutperformsthecorrespondingbase-
lineswithminimalharness. VISTAalsoexceedsthereportedperformanceoffreshhumanplayersonGameWorldand
9

AIGameStore. OnBabyVision,whereobservationsarestaticandnointeractionhistoryisinvolved,VISTAimproves
accuracyfrom41.0%withtheofficialimplementationto63.2%,highlightingthebenefitofvisualinspection,which
allowstheagenttoselectivelyinspectregionswithinasingleimage.
6 Limitations
We acknowledge that the models’ existing capabilities remain a key factor in this success, and VISTA provides a
simple but effective way to elicit them [18, 58, 61]. Its substantial gains over the baselines highlight visual harness
designasadirectionthatcomplementsmodelimprovements. Additionally,becausethemodelsweusewerereleased
afterthepublicbenchmarks,wecannotruleoutthepossibilitythatthesegameswereincludedintheirtrainingdata.
Evaluationonnovelgames, suchasthoseintheprivatesetofARC-AGI-3[4], wouldprovidea strongertestofour
system’sgeneralization.
7 Conclusion
VISTAshowsthatasimplevisualharnesscanunlockthepotentialofexistingmultimodalmodelstocompletecomplex
tasks in interactive visual environments. It provides the model with raw visual observations, preserves them in a
lossless visual memory, and allows the model to revisit past visual experience at the original level of detail during
interaction. Weshowthatthissimpledesignissufficientfortheagenttocompleteall25publicARC-AGI-3games
with a perfect score. The same harness extends naturally to other environments covering a diverse set of visual
gamesandpuzzles,withminimaladaptation. Overall,VISTA’ssimpledesignandstrongperformanceacrossdiverse
benchmarks suggest its potential as a general-purpose harness for tasks beyond games. Future work could evaluate
VISTAonmorecomplexandrealistictasks,suchasembodiedtasksinenvironmentsthatmorecloselyresemblethe
physicalworld[10].
Acknowledgments
WethankItamarPresandAlanSunfortheirhelpfulfeedbackandinsightfuldiscussions,andYung-SungChuangand
ZhaofengWufortheirgeneroussupport.
References
[1] Ekin Akyu¨rek, Mehul Damani, Adam Zweiger, Linlu Qiu, Han Guo, Jyothish Pari, Yoon Kim, and Jacob An-
dreas. Thesurprisingeffectivenessoftest-timetrainingforfew-shotlearning. InICML,2025.
[2] Jean-BaptisteAlayrac,JeffDonahue,PaulineLuc,AntoineMiech,IainBarr,YanaHasson,KarelLenc,Arthur
Mensch,KatieMillican,MalcolmReynolds,RomanRing,ElizaRutherford,SerkanCabi,TengdaHan,Zhitao
Gong, Sina Samangooei, Marianne Monteiro, Jacob Menick, Sebastian Borgeaud, Andrew Brock, Aida Ne-
matzadeh, Sahand Sharifzadeh, Mikolaj Binkowski, Ricardo Barreira, Oriol Vinyals, Andrew Zisserman, and
KarenSimonyan. Flamingo: Avisuallanguagemodelforfew-shotlearning. InNeurIPS,2022.
[3] Anthropic. Introducing Claude Opus 5. https://www.anthropic.com/news/claude-opus-5,
2026.
[4] ARC Prize Foundation. ARC-AGI-3: A new challenge for frontier agentic intelligence. arXiv preprint
arXiv:2603.24621,2026.
[5] ARC Prize Foundation. GPT-5.6 Sol – ARC-AGI results. https://arcprize.org/results/
openai-gpt-5-6-sol,2026.
[6] ARC Prize Foundation. ARC-AGI-3 scoring methodology. https://docs.arcprize.org/
methodology,2026.
[7] ARC Prize Foundation. Claude Opus 5 – ARC-AGI results. https://arcprize.org/results/
anthropic-claude-opus-5,2026.
[8] JeremyBerman. HowIcameinfirstonARC-AGI-PubusingSonnet3.5withevolutionarytest-timecompute.
https://jeremyberman.substack.com/p/how-i-got-a-record-536-on-arc-agi,2024.
10

[9] Jeremy Berman. How I got the highest score on ARC-AGI again swapping Python for English. https://
jeremyberman.substack.com/p/how-i-got-the-highest-score-on-arc-agi-again,
2025.
[10] Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Xi Chen, Krzysztof Choromanski, Tianli
Ding, Danny Driess, Avinava Dubey, Chelsea Finn, Pete Florence, Chuyuan Fu, Montse Gonzalez Arenas,
Keerthana Gopalakrishnan, Kehang Han, Karol Hausman, Alexander Herzog, Jasmine Hsu, Brian Ichter, Alex
Irpan, Nikhil Joshi, Ryan Julian, Dmitry Kalashnikov, Yuheng Kuang, Isabel Leal, Lisa Lee, Tsang-Wei Ed-
ward Lee, Sergey Levine, Yao Lu, Henryk Michalewski, Igor Mordatch, Karl Pertsch, Kanishka Rao, Krista
Reymann,MichaelRyoo,GreciaSalazar,PannagSanketi,PierreSermanet,JaspiarSingh,AnikaitSingh,Radu
Soricut, Huong Tran, Vincent Vanhoucke, Quan Vuong, Ayzaan Wahid, Stefan Welker, Paul Wohlhart, Jialin
Wu,FeiXia,TedXiao,PengXu,SichunXu,TianheYu,andBriannaZitkovich. RT-2: Vision-language-action
modelstransferwebknowledgetoroboticcontrol. InCoRL,2023.
[11] RyanBrown.Retrodict:FrontierARC-AGI-3agent.https://github.com/ryanbbrown/Retrodict,
2026.
[12] Liang Chen, Weichu Xie, Yiyan Liang, Hongfeng He, Haozhe Zhao, Zhibo Yang, Zhiqi Huang, Haoning Wu,
HaoyuLu,Y.Charles,YipingBao,YuantaoFan,GuopengLi,HaiyangShen,XuanzhongChen,WendongXu,
ShuzhengSi,ZefanCai,WenhaoChai,ZiqiHuang,FangfuLiu,TianyuLiu,BaobaoChang,MingWu,Xiaobo
Hu, Kaiyuan Chen, Yixin Ren, Yang Liu, Yuan Gong, and Kuan Li. BabyVision: Visual reasoning beyond
language. InICML,2026.
[13] KanzhiCheng,QiushiSun,YougangChu,FangzhiXu,YantaoLi,JianbingZhang,andZhiyongWu. SeeClick:
HarnessingGUIgroundingforadvancedvisualGUIagents. InACL,2024.
[14] Franc¸oisChollet. Onthemeasureofintelligence. arXivpreprintarXiv:1911.01547,2019.
[15] Franc¸ois Chollet, Mike Knoop, Gregory Kamradt, Bryan Landers, and Henry Pinkard. ARC-AGI-2: A new
challengeforfrontierAIreasoningsystems. arXivpreprintarXiv:2505.11831,2025.
[16] Franc¸oisChollet,MikeKnoop,GregoryKamradt,andBryanLanders. ARCPrize2025: Technicalreport. arXiv
preprintarXiv:2601.10904,2026.
[17] Xiang Deng, Yu Gu, Boyuan Zheng, Shijie Chen, Samuel Stevens, Boshi Wang, Huan Sun, and Yu Su.
Mind2Web: Towardsageneralistagentfortheweb. InNeurIPSDatasetsandBenchmarks,2023.
[18] SiqiFan,MinghaoLi,XiaoqianMa,WenhuiTan,XiushengHuang,JuntongWu,LiujieZhang,ShuoShang,and
WeihangChen. Screenshotsortools? elicitingtooluseandmanagingmultimodalcontextinhybridGUI-MCP
computer-useagents. arXivpreprintarXiv:2608.03327,2026.
[19] DanielFranzen,JanDisselhoff,andDavidHartmann. ProductofexpertswithLLMs: Boostingperformanceon
ARCisamatterofperspective. InICML,2025.
[20] GLM-5Team. GLM-5: fromvibecodingtoagenticengineering. arXivpreprintarXiv:2602.15763,2026.
[21] Danijar Hafner, Jurgis Pasukonis, Jimmy Ba, and Timothy Lillicrap. Mastering diverse control tasks through
worldmodels. Nature,2025.
[22] KeyaHu,AliCy,LinluQiu,XiaomanDeloresDing,RunqianWang,YeyinEvaZhu,JacobAndreas,andKaim-
ingHe. ARCisavisionproblem! InCVPR,2026.
[23] Alexia Jolicoeur-Martineau. Less is more: Recursive reasoning with tiny networks. arXiv preprint
arXiv:2510.04871,2025.
[24] SolimLeGris,WaiKeenVong,BrendenM.Lake,andToddM.Gureckis. H-ARC:Arobustestimateofhuman
performanceontheabstractionandreasoningcorpusbenchmark. arXivpreprintarXiv:2409.01374,2024.
[25] JensLehmann,AndreiAioanei,andSaharVahdati. Tycho: Activeabstractionwithprogrammaticworldmodels
forARC-AGI-3. arXivpreprintarXiv:2607.28287,2026.
[26] Wen-Ding Li, Keya Hu, Carter Larsen, Yuqing Wu, Simon Alford, Caleb Woo, Spencer M. Dunn, Hao Tang,
Michelangelo Naim, Dat Nguyen, Wei-Long Zheng, Zenna Tavares, Yewen Pu, and Kevin Ellis. Combining
inductionandtransductionforabstractreasoning. InICLR,2025.
11

[27] ChenLiu, LingChen, HanzhangZhou, XuZhang, QuyuKong, PanrongTong, WenhaoWang, XinYu, Steven
Hoi,andYueWang.WhatmemorydoGUIagentsreallyneed?frompassiverecordstoactivetask-drivingstates.
arXivpreprintarXiv:2606.31612,2026.
[28] HaotianLiu,ChunyuanLi,QingyangWu,andYongJaeLee. Visualinstructiontuning. InNeurIPS,2023.
[29] NelsonF.Liu,KevinLin,JohnHewitt,AshwinParanjape,MicheleBevilacqua,FabioPetroni,andPercyLiang.
Lostinthemiddle: Howlanguagemodelsuselongcontexts. TACL,2024.
[30] Dunjie Lu, Shuai Bai, Tianyi Bai, Sicheng Fan, Chang Gao, Jian Guan, Feng Hu, Mianqiu Huang, Xingyang
Huang, Yizhen Jiang, Yuheng Jing, Dehui Kong, Ning Li, Dayiheng Liu, Shixuan Liu, Zheng Liu, Que Shen,
Bowen Wang, Junli Wang, Chencan Wu, Rui Xie, Tianbao Xie, Zhihui Xie, Haiyang Xu, An Yang, Tao Yu,
WenzhenYuan,XiZhang,ZhenruZhang,MingkangZhu,ZhaoqingZhu,YizhongCao,KaiDang,BinyuanHui,
KaixinLi,JunyangLin,HaiquanWang,ZekunWang,YihengXu,FanYan,MengqiYuan,DanyangZhang,Jia-
junZhang,ZhipengZhang,FanZhou,andFanZhou. Qwen-CUA:Nativecomputerusefor(almost)everything.
arXivpreprintarXiv:2608.02352,2026.
[31] Volodymyr Mnih, Koray Kavukcuoglu, David Silver, Andrei A. Rusu, Joel Veness, Marc G. Bellemare, Alex
Graves,MartinRiedmiller,AndreasK.Fidjeland,GeorgOstrovski,StigPetersen,CharlesBeattie,AmirSadik,
IoannisAntonoglou,HelenKing,DharshanKumaran,DaanWierstra,ShaneLegg,andDemisHassabis.Human-
levelcontrolthroughdeepreinforcementlearning. Nature,2015.
[32] ReiichiroNakano,JacobHilton,SuchirBalaji,JeffWu,LongOuyang,ChristinaKim,ChristopherHesse,Shan-
tanuJain,VineetKosaraju,WilliamSaunders,XuJiang,KarlCobbe,TynaEloundou,GretchenKrueger,Kevin
Button,MatthewKnight,BenjaminChess,andJohnSchulman. WebGPT:Browser-assistedquestion-answering
withhumanfeedback. arXivpreprintarXiv:2112.09332,2021.
[33] OpenAI. GPT-5.6: Frontier intelligence that scales with your ambition. https://openai.com/index/
gpt-5-6/,2026.
[34] OpenAI. How enabling two settings tripled our scores on the ARC-AGI-3 benchmark. https://openai.
com/index/how-two-settings-tripled-our-arc-agi-3-scores/,2026.
[35] MingyuOuyang,SiyuanHu,KevinQinghongLin,HweeTouNg,andMikeZhengShou. GameWorld: Towards
standardizedandverifiableevaluationofmultimodalgameagents. InECCV,2026.
[36] CharlesPacker, SarahWooders, KevinLin, VivianFang, ShishirG.Patil, IonStoica, andJosephE.Gonzalez.
MemGPT:TowardsLLMsasoperatingsystems. arXivpreprintarXiv:2310.08560,2023.
[37] Jean-Francois Puget. A 2D nGPT model for ARC Prize. https://github.com/jfpuget/
ARC-AGI-Challenge-2024,2024.
[38] YujiaQin,YiningYe,JunjieFang,HaomingWang,ShihaoLiang,ShizuoTian,JundaZhang,JiahaoLi,Yunxin
Li,ShijueHuang,WanjunZhong,KuanyeLi,JialeYang,YuMiao,WoyuLin,LongxiangLiu,XuJiang,Qianli
Ma, JingyuLi, XiaojunXiao, KaiCai, ChuangLi, YaoweiZheng, ChaolinJin, ChenLi, XiaoZhou, Minchao
Wang, Haoli Chen, Zhaojian Li, Haihua Yang, Haifeng Liu, Feng Lin, Tao Peng, Xin Liu, and Guang Shi.
UI-TARS:PioneeringautomatedGUIinteractionwithnativeagents. arXivpreprintarXiv:2501.12326,2025.
[39] Sergey Rodionov. Do coding agents need executable world models, simplification, and verification to solve
ARC-AGI-3? arXivpreprintarXiv:2607.15439,2026.
[40] SergeyRodionov. ExecutableworldmodelsforARC-AGI-3intheeraofcodingagents. InAGI,2026.
[41] Julian Schrittwieser, Ioannis Antonoglou, Thomas Hubert, Karen Simonyan, Laurent Sifre, Simon Schmitt,
Arthur Guez, Edward Lockhart, Demis Hassabis, Thore Graepel, Timothy Lillicrap, and David Silver. Mas-
teringAtari,Go,chessandshogibyplanningwithalearnedmodel. Nature,2020.
[42] NoahShinn,FedericoCassano,AshwinGopinath,KarthikNarasimhan,andShunyuYao. Reflexion: Language
agentswithverbalreinforcementlearning. InNeurIPS,2023.
[43] David Silver, Aja Huang, Chris J. Maddison, Arthur Guez, Laurent Sifre, George van den Driessche, Julian
Schrittwieser, Ioannis Antonoglou, Veda Panneershelvam, Marc Lanctot, Sander Dieleman, Dominik Grewe,
JohnNham,NalKalchbrenner,IlyaSutskever,TimothyLillicrap,MadeleineLeach,KorayKavukcuoglu,Thore
Graepel, and Demis Hassabis. Mastering the game of Go with deep neural networks and tree search. Nature,
2016.
12

[44] DavidSilver,ThomasHubert,JulianSchrittwieser,IoannisAntonoglou,MatthewLai,ArthurGuez,MarcLanc-
tot, Laurent Sifre, Dharshan Kumaran, Thore Graepel, Timothy Lillicrap, Karen Simonyan, and Demis Hass-
abis. Mastering chess and shogi by self-play with a general reinforcement learning algorithm. arXiv preprint
arXiv:1712.01815,2017.
[45] SIMA Team, Maria Abi Raad, Arun Ahuja, Catarina Barros, Frederic Besse, Andrew Bolt, Adrian Bolton,
Bethanie Brownfield, Gavin Buttimore, Max Cant, Sarah Chakera, Stephanie C. Y. Chan, Jeff Clune, Adrian
Collister, Vikki Copeman, Alex Cullum, Ishita Dasgupta, Dario de Cesare, Julia Di Trapani, Yani Donchev,
Emma Dunleavy, Martin Engelcke, Ryan Faulkner, Frankie Garcia, Charles Gbadamosi, Zhitao Gong, Lucy
Gonzales, Kshitij Gupta, Karol Gregor, Arne Olav Hallingstad, Tim Harley, Sam Haves, Felix Hill, Ed Hirst,
Drew A. Hudson, Jony Hudson, Steph Hughes-Fitt, Danilo J. Rezende, Mimi Jasarevic, Laura Kampis, Rose-
mary Ke, Thomas Keck, Junkyung Kim, Oscar Knagg, Kavya Kopparapu, Rory Lawton, Andrew Lampinen,
ShaneLegg,AlexanderLerchner,MarjorieLimont,YulanLiu,MariaLoks-Thompson,JosephMarino,Kathryn
MartinCussons,LoicMatthey,SiobhanMcloughlin,PiermariaMendolicchio,HamzaMerzic,AnnaMitenkova,
Alexandre Moufarek, Valeria Oliveira, Yanko Oliveira, Hannah Openshaw, Renke Pan, Aneesh Pappu, Alex
Platonov, Ollie Purkiss, David Reichert, John Reid, Pierre Harvey Richemond, Tyson Roberts, Giles Ruscoe,
Jaume Sanchez Elias, Tasha Sandars, Daniel P. Sawyer, Tim Scholtes, Guy Simmons, Daniel Slater, Hubert
Soyer, Heiko Strathmann, Peter Stys, Allison C. Tam, Denis Teplyashin, Tayfun Terzi, Davide Vercelli, Bojan
Vujatovic, Marcus Wainwright, Jane X. Wang, Zhengdong Wang, Daan Wierstra, Duncan Williams, Nathaniel
Wong,SarahYork,andNickYoung. Scalinginstructableagentsacrossmanysimulatedworlds. arXivpreprint
arXiv:2404.10179,2024.
[46] SIMATeam, AdrianBolton, AlexanderLerchner, AlexandraCordell, AlexandreMoufarek, AndrewBolt, An-
drewLampinen,AnnaMitenkova,ArneOlavHallingstad,BojanVujatovic,BonnieLi,CongLu,DaanWierstra,
Daniel P. Sawyer, Daniel Slater, David Reichert, Davide Vercelli, Demis Hassabis, Drew A. Hudson, Duncan
Williams, Ed Hirst, Fabio Pardo, Felix Hill, Frederic Besse, Hannah Openshaw, Harris Chan, Hubert Soyer,
Jane X. Wang, Jeff Clune, John Agapiou, John Reid, Joseph Marino, Junkyung Kim, Karol Gregor, Kaustubh
Sridhar,KayMcKinney,LauraKampis,LeiM.Zhang,LoicMatthey,LuyuWang,MariaAbiRaad,MariaLoks-
Thompson,MartinEngelcke,MatijaKecman,MatthewJackson,MaximeGazeau,OlliePurkiss,OscarKnagg,
PeterStys,PiermariaMendolicchio,RaiaHadsell,RosemaryKe,RyanFaulkner,SarahChakera,SatinderSingh
Baveja,ShaneLegg,SheleemKashem,TayfunTerzi,ThomasKeck,TimHarley,TimScholtes,TysonRoberts,
VolodymyrMnih,YulanLiu,ZhengdongWang,andZoubinGhahramani. SIMA2:Ageneralistembodiedagent
forvirtualworlds. arXivpreprintarXiv:2512.04797,2025.
[47] Alex Su, Haozhe Wang, Weiming Ren, Fangzhen Lin, and Wenhu Chen. Pixel reasoner: Incentivizing pixel
spacereasoningviacuriosity-drivenreinforcementlearning. InNeurIPS,2025.
[48] Zhaochen Su, Peng Xia, Hangyu Guo, Zhenhua Liu, Yan Ma, Xiaoye Qu, Jiaqi Liu, Yanshu Li, Kaide Zeng,
ZhengyuanYang,LinjieLi,YuCheng,HengJi,JunxianHe,andYiR.Fung. Thinkingwithimagesformulti-
modalreasoning: Foundations,methods,andfuturefrontiers. arXivpreprintarXiv:2506.23918,2025.
[49] Weihao Tan, Wentao Zhang, Xinrun Xu, Haochong Xia, Ziluo Ding, Boyu Li, Bohan Zhou, Junpeng Yue,
Jiechuan Jiang, Yewen Li, Ruyi An, Molei Qin, Chuqiao Zong, Longtao Zheng, Yujie Wu, Xiaoqiang Chai,
YifeiBi, TianbaoXie, PengjieGu, XiyunLi, CeyaoZhang, LongTian, ChaojieWang, XinrunWang, Bo¨rjeF.
Karlsson, Bo An, Shuicheng Yan, and Zongqing Lu. Cradle: Empowering foundation agents towards general
computercontrol. InICML,2025.
[50] GuanWang,JinLi,YuhaoSun,XingChen,ChanglingLiu,YueWu,MengLu,SenSong,andYasinAbbasiYad-
kori. Hierarchicalreasoningmodel. arXivpreprintarXiv:2506.21734,2025.
[51] Guanzhi Wang, Yuqi Xie, Yunfan Jiang, Ajay Mandlekar, Chaowei Xiao, Yuke Zhu, Linxi Fan, and Anima
Anandkumar. Voyager: Anopen-endedembodiedagentwithlargelanguagemodels. TMLR,2024.
[52] Xinyuan Wang, Bowen Wang, Dunjie Lu, Junlin Yang, Tianbao Xie, Junli Wang, Jiaqi Deng, Xiaole Guo,
YihengXu,ChenHenryWu,ZhennanShen,ZhuokaiLi,RyanLi,XiaochuanLi,JundaChen,BoyuanZheng,
PeihangLi,FangyuLei,RuishengCao,YeqiaoFu,DongchanShin,MartinShin,JiaruiHu,YuyanWang,Jixuan
Chen,YuxiaoYe,DanyangZhang,DikangDu,HaoHu,HuarongChen,ZaidaZhou,HaotianYao,ZiweiChen,
QizhengGu,YipuWang,HengWang,DiyiYang,VictorZhong,FloodSung,Y.Charles,ZhilinYang,andTao
Yu. OpenCUA:Openfoundationsforcomputer-useagents. InNeurIPS,2025.
[53] Zihao Wang, Shaofei Cai, Anji Liu, Yonggang Jin, Jinbing Hou, Bowei Zhang, Haowei Lin, Zhaofeng He,
Zilong Zheng, Yaodong Yang, Xiaojian Ma, and Yitao Liang. JARVIS-1: Open-world multi-task agents with
memory-augmentedmultimodallanguagemodels. IEEETPAMI,2025.
13

[54] Zihao Wang, Xujing Li, Yining Ye, Junjie Fang, Haoming Wang, Longxiang Liu, Shihao Liang, Junting Lu,
Zhiyong Wu, Jiazhan Feng, Wanjun Zhong, Zili Li, Yu Wang, Yu Miao, Bo Zhou, Yuanfan Li, Hao Wang,
ZhongkaiZhao,FamingWu,ZhengxuanJiang,WeihaoTan,HeyuanYao,ShiYan,XiangyangLi,YitaoLiang,
YujiaQin,andGuangShi. Game-TARS:Pretrainedfoundationmodelsforscalablegeneralistmultimodalgame
agents. arXivpreprintarXiv:2510.23691,2025.
[55] Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Brian Ichter, Fei Xia, Ed Chi, Quoc V. Le, and
DennyZhou. Chain-of-thoughtpromptingelicitsreasoninginlargelanguagemodels. InNeurIPS,2022.
[56] PenghaoWuandSainingXie. V*: GuidedvisualsearchasacoremechanisminmultimodalLLMs. InCVPR,
2024.
[57] YihengXu,ZekunWang,JunliWang,DunjieLu,TianbaoXie,AmritaSaha,DoyenSahoo,TaoYu,andCaiming
Xiong. Aguvis: UnifiedpurevisionagentsforautonomousGUIinteraction. InICML,2025.
[58] John Yang, Carlos E. Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, and Ofir
Press. SWE-agent: Agent-computerinterfacesenableautomatedsoftwareengineering. InNeurIPS,2024.
[59] Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, and Yuan Cao. ReAct:
Synergizingreasoningandactinginlanguagemodels. InICLR,2023.
[60] LanceYing,RyanTruong,PrafullSharma,KaiyaIvyZhao,NathanCloos,KelseyR.Allen,ThomasL.Griffiths,
KatherineM.Collins,Jose´Herna´ndez-Orallo,PhillipIsola,SamuelJ.Gershman,andJoshuaB.Tenenbaum. AI
Gamestore: Scalable,open-endedevaluationofmachinegeneralintelligencewithhumangames. arXivpreprint
arXiv:2602.17594,2026.
[61] XiaoYu,BaolinPeng,RuizeXu,HaoZou,QianhuiWu,HaoCheng,WenlinYao,NikhilSingh,ZhouYu,and
JianfengGao.OpenForgeRL:Trainharness-nativeagentsinanyenvironment.arXivpreprintarXiv:2607.21557,
2026.
[62] GuanningZeng,JianiWang,WenjieMa,ShaofengYin,ChenyangWang,ShichenLiu,AngjooKanazawa,Wode
Ni,XiuyuLi,AndreaZanette,andHaiwenFeng.[schema]:Frontiermodelswiththerightharnessachieve∼99%
onARC-AGI-3public. https://schema-harness.github.io/,2026.
[63] ZhipuAI. GLM-5.3-Flash. https://huggingface.co/zai-org/GLM-5.3-Flash,2026.
[64] Shuyan Zhou, Frank F. Xu, Hao Zhu, Xuhui Zhou, Robert Lo, Abishek Sridhar, Xianyi Cheng, Tianyue Ou,
YonatanBisk,DanielFried,UriAlon,andGrahamNeubig.WebArena:Arealisticwebenvironmentforbuilding
autonomousagents. InICLR,2024.
14

A ExperimentalDetails
A.1 Baselines: OfficialImplementations
Foreachbenchmark,weusetheauthors’reportedresultswhenavailable. Otherwise,wereruntheofficialimplemen-
tationfollowingthereportedagentconfiguration. Weusethemodelsthroughtheirsubscription-basedCLIinterfaces
(ClaudeOpus5.0throughtheClaudeCodeCLIandGPT-5.6SolthroughtheCodexCLI)ratherthanthroughdirect
APIcalls. Fortheopen-weightGLM-5.3Flash320B,wealsousetheCodexCLI,withGLMasthemodelbackend.
ARC-AGI-3. OnARC-AGI-3,theorganizers’minimalagentinterfacerepresentseachobservationasatextualgrid
andprovidesalistofavailableactions. Whenanactionproducesmultipleframes,itretainsuptosevenintermediate
states.Itmaintainsa175K-tokencontextwindow;oncethewindowisexceeded,theearliestturnsarediscarded,sothe
agenthasnolong-termmemory. Welimitthenumberofactionspergameto2,000forClaudeOpus5.0andGPT-5.6
Sol,andto3,000forGLM-5.3Flash320B.Table1reportstheorganizers’publishedresultsforClaudeOpus5.0and
GPT-5.6Sol[5,7,34]. Figure8showsourresultsforGLM-5.3Flash320B,obtainedusingtheoriginalcodebase.
GameWorld. OnGameWorld[35], wereproducetheofficialcomputer-useagentwithGPT-5.6Sol, followingthe
officialinteractionandevaluationprotocols. Theagentoperatesdirectlyfromscreenshotsusingkeyboardandmouse
actions,witheachmodelrequestincludingthescreenshots,reasoning,andactionsfromthetwoprecedingsteps. Each
taskislimitedto100actions.
AI GameStore. On AI GameStore [60], we reproduce the official evaluation loop. The agent makes one decision
per game second, receiving five frames sampled at 0.2s intervals. Each model request includes only these current
frames as visual input, together with the scratchpad, action, and result from the preceding decision. A run has 120
decisions,withthegamepausedduringmodelinference.
BabyVision. On BabyVision [12], the baseline is the official one-shot setting: the model receives the image and
question in a single request and answers without additional visual inspection or interaction. We extract the final
answerusingthebenchmark’sreferencecode.
A.2 AblationDetails
We incrementally modify the official ARC-AGI-3 implementation to examine the contributions of VISTA’s compo-
nents(Figure5). TheofficialimplementationaccessesthemodelthroughtheAPI,whereasourexperimentsusethe
CodexCLIthroughthesubscriptioninterface. Therefore,theofficiallyreportedresultshouldbetreatedasanexternal
reference. However, we use the same underlying model and reasoning effort to match the official configuration as
closelyaspossible. Allconfigurations(i)–(vi)usethesamemodelaccessinterfaceandaredirectlycomparablewith
oneanother.
(i): Imageobservations. Wefirstreplacethetextualgridobservationswithrenderedimages. ThisleadstoanRHAE
scoreof47.32,demonstratingtheimportanceofvisualobservations. Wehypothesizethatimprovedtokenefficiency
contributes to this gain: each image observation requires approximately 308 image tokens, compared with roughly
4Ktexttokensforanequivalent64×64textualgrid. Arequestcontainingsevenframesthereforeusesroughly28K
tokensfortextualobservations,comparedwithabout2.2Kforimages. Imageobservationsleavemoreofthemodel’s
limitedcontextwindowavailableforreasoningwithineachrequest.
(i)→(ii): Increased action and time limits. The official implementation uses a per-section action limit of 5× the
humanbaselineanda12-hourruntimelimit. Wefindthatmanyrunsterminateuponreachingtheselimits,leavingthe
gamesunfinished. Wethereforeincreasethelimitsto2,000totalactionsand48hourspergame,improvingtheRHAE
scoreto51.66. Wedonotobservesubstantialadditionalbenefitsfromfurtherincreasingtheselimits.
(ii)→(iii): Continuousconversation. Wenextallowtheagenttointeractwiththeenvironmentthroughacontinuous
conversation. In the official implementation, each model request produces at most one environment action, and the
interaction history is provided again with the next request. When this history exceeds the context limit, the oldest
interactions are truncated, leaving only a sliding window of recent experience. Our setting allows multiple play
calls within the same conversation and uses native context compaction when the context limit is reached. This pre-
serves a compressed representation of earlier interactions, allowing information from past turns to remain available
forsubsequentreasoning.
15

(iii)→(iv): Add notes. We introduce a minimal memory mechanism by adding two note files: GUIDE.md
and WORKING.md. GUIDE.md stores reusable knowledge about the game across levels and sessions, while
WORKING.md stores temporary state and plans for the current level. When the context approaches its limit, the
agentwritesahandoffsummaryinWORKING.mdbeforeresuminginafreshcontext.
Thesenotesremainavailable
acrosscontextboundaries,allowingtheagenttocarryforwarditsunderstandingofthegameanditscurrentstate.
(iv)→(vi): Add VISTA’s visual harness. Finally, we add VISTA’s key visual harness components: lossless visual
memory,model-directedinspection(inspect),andexactpixelreadout(read pixels). Theagentreceivesonly
thefinalframeaftereachactionandcandecidewhentousethesetoolstorevisititsvisualmemoryasitreasons.These
additionscompletetheVISTAharness.
A.3 EvaluationMetrics
ARC-AGI-3. WereportRelativeHumanActionEfficiency(RHAE)usingtheofficialARC-AGI-3scorer[4,6]. For
acompletedlevelℓingameg,thelevelscoreis
|     |     |     | (cid:32) | (cid:18) (cid:19)2 | (cid:33) |     |
| --- | --- | --- | -------- | ------------------ | -------- | --- |
h
|     |     | S =min |     | 1.15, ℓ,g | ,   | (1) |
| --- | --- | ------ | --- | --------- | --- | --- |
ℓ,g
a ℓ,g
wherea istheagent’sactioncountandh istheupper-medianactioncountamongfirst-timehumanplayerswho
| ℓ,g |     | ℓ,g |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- |
completedthatlevel. Unfinishedlevelsreceiveascoreofzero.
| n   | ℓ   |     |     | w = ℓ, |     |     |
| --- | --- | --- | --- | ------ | --- | --- |
For a game with levels, each level is assigned a weight ℓ giving later levels greater weight. If the agent
completesthefirstklevels,thegamescoreis
|     |     |     | (cid:32)(cid:80)k |     | (cid:33) |     |
| --- | --- | --- | ----------------- | --- | -------- | --- |
(cid:80)n
|     |     |      |            | w ℓ, w       | ℓ S ℓ,g |     |
| --- | --- | ---- | ---------- | ------------ | ------- | --- |
|     | S   | =min | ℓ =1       | ℓ= 1         | .       | (2) |
|     | g   |      | (cid:80) n | w (cid:80) n | w       |     |
|     |     |      |            | ℓ            | ℓ       |     |
|     |     |      | ℓ=1        | ℓ=1          |         |     |
The second term is the weighted average of the level scores, while the first caps the game score by the weighted
fractionoflevelscompleted. WereportthemeanS g acrossthe25publicgames,multipliedby100. Weadditionally
reporttotalactionstodistinguishtheefficiencyofrunsthatreceivethesameRHAEscore.
GameWorld. GameWorld reports success rate (SR) and progress (PG) [35]. Success rate is the fraction of tasks
completedsuccessfully,whileprogressaveragesthebenchmark’sper-taskprogressscores,providingcreditforpartial
completion:
N
1 (cid:88)
|     |     | SR= | I[taskisucceeded], |     |     | (3) |
| --- | --- | --- | ------------------ | --- | --- | --- |
N
i=1
N
1 (cid:88)
|     |     |     | PG= | p . |     |     |
| --- | --- | --- | --- | --- | --- | --- |
|     |     |     |     | i   |     | (4) |
N
i=1
Here,p ∈ [0,1]denotesthehighestnormalizedprogressreachedduringtherunfortaski.
i Weaveragebothmetrics
overallN =170tasks. Tasksuccessandprogressarecomputedbythebenchmark’sofficialevaluatorfromserialized
game-statefields.
AI GameStore. Following AI GameStore’s evaluation protocol [60], we normalize each game’s raw score r g by
itspublishedhumanmedianm , suchthatmedianhumanperformancecorrespondsto100. Weclipthenormalized
g
scoresto[1,104]:
|     |     |     | (cid:18) 100×r |     | (cid:19) |     |
| --- | --- | --- | -------------- | --- | -------- | --- |
g,
|     |     | n =clip |     | 1, 104 | .   | (5) |
| --- | --- | ------- | --- | ------ | --- | --- |
|     |     | g       |     | m      |     |     |
g
Wereportthegeometricmeanofthesenormalizedscoresacrossthetenpublicgamesusedinourevaluation:
|     |     |     | (cid:32) | 10 (cid:33)1/10 |     |     |
| --- | --- | --- | -------- | --------------- | --- | --- |
(cid:89)
|     |     | Score= |     | n   | .   | (6) |
| --- | --- | ------ | --- | --- | --- | --- |
g
g=1
BabyVision. Wereportaccuracyontheevaluatedvisualtrackingquestions[12],usingexactmatchingandanLLM
judgetoassesscorrectness. Failedrunsarecountedasincorrect.
16

A.4 AgentTools
Theagentaccessestoolsonlythroughstructuredfunctioncalls;plaintextgeneratedbythemodelcannottriggertool
execution. In Claude Code, we expose these tools through an MCP server and disable all built-in tools, preventing
directshellorfile-systemaccess. InCodex,weregisterthesametoolsdirectlywiththeappserver. Inbothcases,the
agentrunsinasandboxedcontainerwithoutaccesstoenvironmentcredentials.
A single host-side controller handles all tool calls. The controller maintains the environment connection, archived
frames, GUIDE.md, and WORKING.md, and is the only component allowed to advance the game. It also enforces
sequentialinteraction: anewplaycallisacceptedonlyaftertheresultofthepreviousactionhasbeenreturnedtothe
agent. Eachreturnedimageislabeledwithitsturnandframeindex. ClaudeCodereceivestheseimagesdirectlyinthe
MCPresult. InourCodexintegration,tooloutputsaretext-only,andthecontrollerprovidesthecorrespondingimages
separatelyaspartofthesameturn.
When the context is nearly full, the controller pauses normal tool use until the agent saves the state needed to con-
tinue. InCodex,theagentusessave compact checkpoint;inClaudeCode,apre-compactionhookrequestsa
write workingcall. TheagentthenresumesinafreshcontextcontainingGUIDE.md,WORKING.md,theaction
history,andthecurrentframe.
TheVISTAtoolinterfaceinpseudocode. playistheonlytoolthatchangesthegameenvironment, note-writing
toolsupdateonlytheagent’sstorednotes,andallothertoolsareread-only.
# −−−−−−−−−−−−−−−− Action −−−−−−−−−−−−−−−−
play(action, x=None, y=None) −> (frame, n frames, available actions)
# Execute exactly one game action. The action set is defined by each
# benchmark and game (e.g. ARC−AGI−3: RESET, ACTION1..7, where ACTION6
# is a click at (x, y); GameWorld and AI GameStore use their own inputs).
# Returns the final frame. All intermediate frames are archived.
# −−−−−−−−−−−−− Visual memory −−−−−−−−−−−−−
inspect(question, views) −> images
# question: the visual question the views should answer
# view = {label, turn, frame=final, region=full},
# region = {x, y, w, h}, each view returns one image
# Retrieve any archived frame, crop the region, and enlarge it
read pixels(question, views) −> (palette, samples[])
# question: the visual question the views should answer
# view = {label, turn, frame=final, region=full},
# region = {x, y, w, h}, each view returns one image
# Split the region into rows x columns cells and read the pixel value
# of each cell. Return the values as a list of numbers.
# −−−−−−−−−−−−−−−− History −−−−−−−−−−−−−−−−
history(view, start turn=None, end turn=None, limit=64) −> records[]
# view = "events": exact action/result records for turns [start, end)
# view = "attempts": one summary for each attempt in the current level. An
# attempt starts when the level is entered or RESET is
# issued, and ends at GAME OVER, WIN, or TERMINAL.
# −−−−−−−−−−−−−−−−− Notes −−−−−−−−−−−−−−−−−
# GUIDE.md stores reusable knowledge about the game across levels and sessions.
# WORKING.md stores temporary state and plans for the current level.
# It is retained across RESETs and context restarts, cleared when the level advances
read guide() −> text # read GUIDE.md
write guide(content) # replace GUIDE.md
read working() −> text # read WORKING.md
write working(content) # replace WORKING.md
save compact checkpoint(guide, working memory)
# Atomically save the state needed to resume after context compaction.
# Write WORKING.md with working memory. If guide is not null, also
# write GUIDE.md; otherwise leave it unchanged.
17

A.5 AgentPrompts
Eachbenchmarkusesashortpromptfollowingthesametemplate, differingonlyinbenchmark-specificinstructions
fortheactionspace,taskobjective,andnotes.
ARC-AGI-3. ThesamepromptisusedforeveryARC-AGI-3game.
Prompt1ARC-AGI-3.
# Visual game task
Complete the game with as few game actions as possible.
Build and use a compact, revisable model of the game and its current state. Update
it as new evidence changes what is supported.
Before each ‘play‘, briefly state what you expect to see. Afterward, briefly state
all visible changes, expected or not.
Keep concise, durable, revisable game understanding in ‘GUIDE.md‘; use ‘WORKING.md‘
as a scratchpad when useful.
GameWorld and AI GameStore. GameWorld and AI GameStore use the same environment-neutral prompt. We
replaceplaywithactandusethebenchmark-providedtaskobjective. OnGameWorld,thesystempromptincludes
thebenchmark-providedtaskpromptverbatim,specifyingtheobjectiveforeachtask.
Prompt2GameWorldandAIGameStore.
# Interactive world task
Pursue the supplied objective.
Build and use a compact, revisable model of the environment and its current state.
Update it as new evidence changes what is supported.
Before each ‘act‘, briefly state what you expect to observe. Afterward, briefly
state all observable changes, expected or not.
Keep concise, durable, revisable understanding in ‘GUIDE.md‘; use ‘WORKING.md‘ as a
scratchpad when useful.
BabyVision. We use a shorter prompt for BabyVision because each task consists of a single static image. Since
tasks are independent, we omit the persistent notes. The agent can gather visual evidence through inspect and
read pixelsbeforeanswering.
Prompt3BabyVision.
# Visual question task
Before answering, gather the evidence the question actually needs from the supplied
image. Use ‘inspect‘ to view enlarged regions where detail matters, and
‘read pixels‘ to measure exact colors where a judgement depends on them. Say what
each view is meant to settle, then check whether it did.
Build a short, revisable account of what the image shows and update it as the
evidence changes what is supported. Answer only when the evidence supports one
answer.
18

A.6 HumanReferences
ARC-AGI-3. The organizers’ study involved 486 participants from the general public with diverse demographics.
Participantswerenotselectedforspecializedtrainingorskills[4]. Eachgamewastestedbytenparticipantsencoun-
teringitforthefirsttime,withouttask-specificinstructions. Testingtookplacein90-minutesessions,withasofttime
limitof20minutesandahardcutoffof30minutespergame. Agamewasincludedonlyifatleasttwoparticipants
independently completed all levels. For each level, the official RHAE human baseline is the upper-median action
countamongfirst-timehumanplayerswhocompletedthatlevel[6].
GameWorld. GameWorldreportsresultsfortwohumanplayers,bothcomputersciencegraduatestudents,eachof
whom attempted all 170 tasks under the same budget of 100 actions per task as the agents [35]. The novice player
hadnopriorexposuretothegamesortasks, whiletheexpertplayerhadstudiedtherulesandpracticedthecontrols
beforehand. Weusethenoviceplayer’sperformanceasourreferenceforfirst-timehumanplay.
AIGameStore. Thebenchmark’shumanstudyrecruited106participantsthroughProlific(meanage=38.81)[60]
to play each game over a customized game interface. Each participant was randomly assigned ten games, and was
given two minutes per game. We use the median score among participants who played each game as the human
reference,normalizedto100asdescribedabove.
BabyVision. BabyVision’s human evaluation involved 16 adult participants, each holding at least a bachelor’s de-
gree,whocompletedall388questions[12]. Thereportedhumanaccuracyis95.0%ontheMazesubtypeand89.5%
onConnecttheLines. WecomputethehumanreferenceinFigure11,92.3%,astheweightedmeanofthesesubtype
scores,usingthe20mazeand19connecting-linesquestionsinourevaluation.
B AdditionalResults
B.1 Run-to-runVariation
Werepeatourmainevaluationsthreetimestomeasurerun-to-runvariation.OnARC-AGI-3,VISTAwithGPT-5.6Sol
atmaximumreasoningeffortachievesRHAEscoresof99.00,98.90,and99.23acrossthethreeruns,correspondingto
99.04±0.17(mean±standarddeviation). OnGameWorld,thethreerunsachievesuccessratesof64.7%,64.7%,and
60.6%,andprogressscoresof81.0%,80.0%,and76.9%,correspondingto63.33±2.37%successrateand79.30±
2.14%progress. OnBabyVision,thethreerunsachieve61.5%,61.5%,and66.7%,correspondingto63.23±3.00%.
ForAIGameStore,thethreerunsobtainaggregatescoresof119.99,148.58,and140.06. Wefollowthebenchmark’s
officialmulti-runevaluationprotocolratherthanaveragingthesethreefinalaggregatescoresdirectly: foreachgame,
we first average its raw score across the three runs, and then apply the benchmark’s normalization and aggregation
proceduretotheseper-gamemeans.
B.2 Per-gameResultsonARC-AGI-3
Table 2 reports per-game results for VISTA with Claude Opus 5.0 and GPT-5.6 Sol, alongside the first-time human
actionreference.
B.3 Interactiontrajectories
WeshowadditionalVISTAtrajectoriesonBP35fromARC-AGI-3inFigures12and13. Wealsoshowtrajectories
from visual environments beyond ARC-AGI-3 in Figure 14, including two interactive games from GameWorld and
twostaticvisualreasoningtasksfromBabyVision.
19

Table 2: Per-game results on the 25 public ARC-AGI-3 games. We evaluate VISTA with Claude Opus 5.0 and
GPT-5.6Sol. Foreachgame,humanactionsarethesumoftheper-levelhumanbaselines,eachdefinedastheupper-
median action count among first-time human players who completed that level. The action ratio is the agent’s total
actionsdividedbythisreference. ClaudeOpus5.0achievesanRHAEscoreof100.00oneverygame. GPT-5.6Sol
completeseverygameandachievesameanRHAEscoreof99.00.
|                |              |        | ClaudeOpus5.0 |         |         | GPT-5.6Sol |               |
| -------------- | ------------ | ------ | ------------- | ------- | ------- | ---------- | ------------- |
| Game           | Humanactions |        | Score         | Actions | Ratio   | Score      | Actions Ratio |
| ar25           |              | 748    | 100.00        | 256     | 0.34    | 100.00     | 260 0.35      |
|                |              |        |               |         |         | ×          | ×             |
| bp35           |              | 651    | 100.00        | 521     | 0.80    | 100.00     | 534 0.82      |
|                |              |        |               |         |         | ×          | ×             |
| cd82           |              | 171    | 100.00        | 112     | 0.65    | 100.00     | 100 0.58      |
|                |              |        |               |         |         | ×          | ×             |
| cn04           |              | 789    | 100.00        | 225     | 0.29    | 100.00     | 200 0.25      |
|                |              |        |               |         |         | ×          | ×             |
| dc22           |              | 1,228  | 100.00        | 547     | 0.45    | 100.00     | 560 0.46      |
|                |              |        |               |         |         | ×          | ×             |
| ft09           |              | 208    | 100.00        |         | 75 0.36 | 100.00     | 77 0.37       |
|                |              |        |               |         |         | ×          | ×             |
| g50t           |              | 879    | 100.00        | 338     | 0.38    | 100.00     | 486 0.55      |
|                |              |        |               |         |         | ×          | ×             |
| ka59           |              | 730    | 100.00        | 303     | 0.42    | 100.00     | 396 0.54      |
|                |              |        |               |         |         | ×          | ×             |
| lf52           |              | 1,339  | 100.00        | 1,008   | 0.75    | 100.00     | 936 0.70      |
|                |              |        |               |         |         | ×          | ×             |
| lp85           |              | 388    | 100.00        | 104     | 0.27    | 100.00     | 97 0.25       |
|                |              |        |               |         |         | ×          | ×             |
| ls20           |              | 776    | 100.00        | 458     | 0.59    | 75.03      | 1,135 1.46    |
|                |              |        |               |         |         | ×          | ×             |
| m0r0           |              | 1,107  | 100.00        | 219     | 0.20    | 100.00     | 224 0.20      |
|                |              |        |               |         |         | ×          | ×             |
| r11l           |              | 233    | 100.00        |         | 75 0.32 | 100.00     | 93 0.40       |
|                |              |        |               |         |         | ×          | ×             |
| re86           |              | 1,255  | 100.00        | 628     | 0.50    | 100.00     | 582 0.46      |
|                |              |        |               |         |         | ×          | ×             |
| s5i5           |              | 638    | 100.00        | 254     | 0.40    | 100.00     | 293 0.46      |
|                |              |        |               |         |         | ×          | ×             |
| sb26           |              | 213    | 100.00        | 125     | 0.59    | 100.00     | 124 0.58      |
|                |              |        |               |         |         | ×          | ×             |
| sc25           |              | 350    | 100.00        | 153     | 0.44    | 100.00     | 228 0.65      |
|                |              |        |               |         |         | ×          | ×             |
| sk48           |              | 1,070  | 100.00        | 413     | 0.39    | 100.00     | 605 0.57      |
|                |              |        |               |         |         | ×          | ×             |
| sp80           |              | 518    | 100.00        | 119     | 0.23    | 100.00     | 184 0.36      |
|                |              |        |               |         |         | ×          | ×             |
| su15           |              | 361    | 100.00        |         | 99 0.27 | 100.00     | 123 0.34      |
|                |              |        |               |         |         | ×          | ×             |
| tn36           |              | 317    | 100.00        | 143     | 0.45    | 100.00     | 225 0.71      |
|                |              |        |               |         |         | ×          | ×             |
| tr87           |              | 414    | 100.00        | 140     | 0.34    | 100.00     | 209 0.50      |
|                |              |        |               |         |         | ×          | ×             |
| tu93           |              | 462    | 100.00        | 193     | 0.42    | 100.00     | 197 0.43      |
|                |              |        |               |         |         | ×          | ×             |
| vc33           |              | 447    | 100.00        | 182     | 0.41    | 100.00     | 272 0.61      |
|                |              |        |               |         |         | ×          | ×             |
| wa30           |              | 1,843  | 100.00        | 612     | 0.33    | 100.00     | 986 0.53      |
|                |              |        |               |         |         | ×          | ×             |
| Total(25games) |              | 17,135 | 100.00        | 7,302   | 0.43    | 99.00      | 9,126 0.53    |
|                |              |        |               |         |         | ×          | ×             |
20

| BP35 level1 |     |     |     | 16actionsintotal;afirst-timehumantakes21 |     |     |
| ----------- | --- | --- | --- | ---------------------------------------- | --- | --- |
theactionsthisgameexposes
·
| start | t1  | t2  | t3  | t4  | t5  | t6  |
| ----- | --- | --- | --- | --- | --- | --- |
thebubble,ina
|                  |     |     | itfloatsupwhen  |     |     | aclickpops |
| ---------------- | --- | --- | --------------- | --- | --- | ---------- |
| cavityunderwater |     |     | nothingblocksit |     |     | agreenblob |
| t7               | t8  | t9  | t10             | t11 | t12 | t13        |
theshaftopens thepinkgoalappears
| t14 | t15 | t16 |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- |
reached
Agent, GUIDE.md(turn7) “BUBBLERISESAUTOMATICALLY:afteranyaction,playerfloatsupuntilblockedbyrock
←
| (black)oragreenblob... | Clickonagreenblobpops/removesit. |     | Clickonwater=no-op(wastedaction).” |     |     |     |
| ---------------------- | -------------------------------- | --- | ---------------------------------- | --- | --- | --- |
Figure12: AfullVISTAtrajectoryonanARC-AGI-3task(IDBP35),oneframeperaction(level1). Theplayer
beginsunderupwardgravityandcanmoveleftorright. Clickingagreenblockremovesit,allowingtheplayertoclear
obstaclesandnavigatethroughotherwiseblockedpassages. Thegoalistoreachthepinkobject. Eachframeshows
thestateafterthelabeledaction;ringsindicateclicks. Readlefttoright,toptobottom.
21

| BP35 level3 |     |     |     | 34actionsintotal;afirst-timehumantakes44 |     |     |
| ----------- | --- | --- | --- | ---------------------------------------- | --- | --- |
theactionsthisgameexposes
·
| start | t67 | t68 | t69 | t70 | t71 | t72 |
| ----- | --- | --- | --- | --- | --- | --- |
orangeblocks
|                   |               | ablockbe-          |     |     |            | a4-rowrise |
| ----------------- | ------------- | ------------------ | --- | --- | ---------- | ---------- |
| and‘X'slots       |               | comesanX           |     |     |            |            |
| t73               | t74           | t75                | t76 | t77 | t78        | t79        |
| purplespikesabove |               | ceilingbuilt       |     |     | a5-rowrise |            |
| t80               | t81           | t82                | t83 | t84 | t85        | t86        |
| t87               | t88           | t89                | t90 | t91 | t92        | t93        |
| a5-rowrise        |               | thepinkgoalappears |     |     |            |            |
| t94               | t95           | t96                | t97 | t98 | t99        | t100       |
|                   | thelongascent |                    |     |     |            | reached    |
Agent,turn73: “Confirmed—clickinganXspawnsanorangeblock(toggle: clickblock X,clickX block). That'sthetoolI
|     |     |     |     | →   | →   |     |
| --- | --- | --- | --- | --- | --- | --- |
need: buildceilingstostopfatalrises.”
Figure 13: A full VISTA trajectory on an ARC-AGI-3 task (ID BP35), one frame per action (level 3). Level 3
introducesanorangeblockthatdisappearswhenclickedandreappearswhenclickedagain. Theagentcanremoveit
topassthroughablockedpath,orrestoreittopreventtheplayerfromrisingintothedeadlypurplespikes.
22

| MinecraftClonetrajectoryGameWorld |     |     |     |     | Pac-MantrajectoryGameWorld |     |     |     |     |
| --------------------------------- | --- | --- | --- | --- | -------------------------- | --- | --- | --- | --- |
Inspectingacrossspace.Prompt:“Secureatleast5ironoreblocks...” Inspectingacrosstime.Prompt:“Scoreatleast1500points...” Solvedin
| Solvedin21actions. |                                                 |                          |     |     | 42actions. |                                    |        |     |     |
| ------------------ | ----------------------------------------------- | ------------------------ | --- | --- | ---------- | ---------------------------------- | ------ | --- | --- |
| afterturn4         | Agent turn5                                     |                          |     |     | atturn36   | Agent                              | turn36 |     |     |
|                    | ·                                               |                          |     |     |            | ·                                  |        |     |     |
|                    | “Theholdremovedseveralaligneddirt/grassblocksat |                          |     |     |            | “Pac-Manclimbedtoabout(451,271)and |        |     |     |
|                    | once,openingashaftaboutfiveblocksdeep.”         |                          |     |     |            | addedfivedots,score1010.”          |        |     |     |
|                    | GUIDE.md                                        | “Asingle2sholdonoutlined |     |     |            | inspectthedashedband—butinthe      |        |     |     |
grassminedrepe←atedlyalongray,openinga1-block
|     |                               |     |             |      |                | openingframe,36turnsback |                  |     | free |
| --- | ----------------------------- | --- | ----------- | ---- | -------------- | ------------------------ | ---------------- | --- | ---- |
|     | verticalshaftroughly5deep...” |     |             | free |                |                          |                  |     |      |
|     | actArrowUp,0.3s               |     | 1gameaction |      | turn0,returned | Agent                    | turn36,continued |     |      |
·
“Theinspectedinitialmazeconfirmsthisouter
afterturn13 Agent turn14 columncontinuesupwardalongtheleftsideof
|     | ·   |     |     |     |            | themid-maze;norightturnopensatthecurrent |     |     |     |
| --- | --- | --- | --- | --- | ---------- | ---------------------------------------- | --- | --- | --- |
|     |     |     |     |     | turn36,now | wall.”                                   |     |     |     |
inspectthetwodashedregions:thehotbar
|     | countsandthetan-speckledvein |     |     | free |     | actArrowUp,0.6s |     | 1gameaction |     |
| --- | ---------------------------- | --- | --- | ---- | --- | --------------- | --- | ----------- | --- |
returned
“Slot9nowcontainsonematchingtan-speckedblock,
identifyingtheiron-orestack.” thedotsarethemap:theymarkeverycorridorandvanishastheyare
→collected,soonlytheopeningframestillshowsthefulllayout.Theagent
|     | actholdleftclick,2s |     | 1gameaction |     | returnstoitagainatturn13. |     |     |     |     |
| --- | ------------------- | --- | ----------- | --- | ------------------------- | --- | --- | --- | --- |
turn21:thefifthironoreismined(hotbarslot9reaches5);taskcom-
→pleteafter21actions.
| Connect-the-LinestrajectoryBabyVisionitem770 |     |     |     |     | MazetrajectoryBabyVisionitem666 |     |     |     |     |
| -------------------------------------------- | --- | --- | --- | --- | ------------------------------- | --- | --- | --- | --- |
Question:whichanimal(A–C)isjoinedbyitslinetowhichhabitat(1–3)? Question:whichyellowentrancecanreachthegreenexit(A–C)?Answered
| Answeredatturn13. |               |                     |                        |     | atturn4.  |                                 |     |     |     |
| ----------------- | ------------- | ------------------- | ---------------------- | --- | --------- | ------------------------------- | --- | --- | --- |
| taskimage         |               |                     |                        |     | taskimage |                                 |     |     |     |
|                   | Agent turn2   |                     |                        |     |           | Agent turn1                     |     |     |     |
|                   | ·             |                     |                        |     |           | ·                               |     |     |     |
|                   | i n s p e c t | th e t w o d a sh e | d r egions(“center-rig | h t |           | inspect“maze”,thewholeboard,at2 |     |     |     |
× free
|     | maze ” , “ le ft -c | en te r m a z e” ) a t | 4   | fr e e |     |     |     |     |     |
| --- | ------------------- | ---------------------- | --- | ------ | --- | --- | --- | --- | --- |
×
| returned,4x | Agent turns4–5 |     |     |     |             |                |     |     |     |
| ----------- | -------------- | --- | --- | --- | ----------- | -------------- | --- | --- | --- |
|             | ·              |     |     |     | returned,2x | Agent turns2–3 |     |     |     |
·
inspect“rabbitpathjunction”at4
|     |     |     |     | × free |     | readpixelsa33 | 33“gridprobe” |     | free |
| --- | --- | --- | --- | ------ | --- | ------------- | ------------- | --- | ---- |
×
r e adpixels“mazeschematic”,54
|             |               |     |     | × 108 |     | r e a d p i              | x e l s th e w a l l s : | “v e rtic a lboundari | e s ”   |
| ----------- | ------------- | --- | --- | ----- | --- | ------------------------ | ------------------------ | --------------------- | ------- |
|             | samp l es     |     |     | free  |     | 16 1 7 , “ho r iz        | o n ta lb o un d a r i e | s” 1 7 1 6            |         |
|             |               |     |     |       |     | ×                        |                          | ×                     | f r e e |
| returned,4x | Agent turn13  |     |     |       |     | Agent turn4              |                          |                       |         |
|             | ·             |     |     |       |     | ·                        |                          |                       |         |
|             | “A-2,B-3,C-1” |     |     |       |     | “(B)Bottom-leftentrance” |                          |                       |         |
correct.One-shot,withoutinspectorreadpixels,thesamemodelan-
→swered(C)Bottom-rightentrance.
→sweredA-2,B-1,C-3(mooseandrabbitswapped). correct.One-shot,withoutinspectorreadpixels,thesamemodelan-
Figure14: FourVISTAtrajectoriesbeyondARC-AGI-3withGPT-5.6Sol. ThetoprowshowsGameWorldgames,
andthebottomrowshowsBabyVisiontasks.Topleft:inMinecraftClone,theagentinspectsacrossspace,magnifying
the hotbar and ore vein to distinguish iron from stone. Top right: in Pac-Man, it inspects across time, revisiting the
currentandinitialframestoviewthefullmaze. Bottomleft: inConnecttheLines,theagentmagnifiestworegionsto
traceapaththatisdifficulttofollowatthesuppliedimageresolution,thenreadsexactpixelvaluesbeforeanswering.
Bottomright: inMaze,itrenderstheboardat2×scaleandthenreadsthewallgridaspixelvalues.
23
