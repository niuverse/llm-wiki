| PAC-NERF: |     |          | PHYSICS |     | AUGMENTED |     |     | CONTINUUM |     |
| --------- | --- | -------- | ------- | --- | --------- | --- | --- | --------- | --- |
| NEURAL    |     | RADIANCE |         |     | FIELDS    |     |     | GEOMETRY- |     |
FOR
| AGNOSTIC |     | SYSTEM |     | IDENTIFICATION |     |     |     |     |     |
| -------- | --- | ------ | --- | -------------- | --- | --- | --- | --- | --- |
XuanLi1,∗,Yi-LingQiao2,PeterYichenChen3,4,KrishnaMurthyJatavallabhula3,
MingLin2,ChenfanfuJiang1,ChuangGan5,6
1UCLosAngeles,2UniversityofMaryland,3MITCSAIL,4ColumbiaUniversity,
5UMassAmherst,6MIT-IBMWatsonAILab
3202 raM 9  ]VC.sc[  1v21550.3032:viXra ABSTRACT
|     | Existing                                          | approaches |     | to system | identification | (estimating | the | physical           | parameters |
| --- | ------------------------------------------------- | ---------- | --- | --------- | -------------- | ----------- | --- | ------------------ | ---------- |
|     | ofanobject)fromvideosassumeknownobjectgeometries. |            |     |           |                |             |     | Thisprecludestheir |            |
applicabilityinavastmajorityofsceneswhereobjectgeometriesarecomplexor
|     | unknown. | In  | this work, | we aim | to identify | parameters | characterizing |     | a physical |
| --- | -------- | --- | ---------- | ------ | ----------- | ---------- | -------------- | --- | ---------- |
systemfromasetofmulti-viewvideoswithoutanyassumptiononobjectgeome-
|     | tryortopology. |     | Tothisend,wepropose“PhysicsAugmentedContinuumNeural |     |     |     |     |     |     |
| --- | -------------- | --- | --------------------------------------------------- | --- | --- | --- | --- | --- | --- |
RadianceFields”(PAC-NeRF),toestimateboththeunknowngeometryandphys-
|     | ical parameters |     | of highly | dynamic | objects | from multi-view |     | videos. | We design |
| --- | --------------- | --- | --------- | ------- | ------- | --------------- | --- | ------- | --------- |
PAC-NeRFtoonlyeverproducephysicallyplausiblestatesbyenforcingtheneu-
|     | ral radiance | field  | to       | follow the          | conservation | laws of        | continuum | mechanics. | For          |
| --- | ------------ | ------ | -------- | ------------------- | ------------ | -------------- | --------- | ---------- | ------------ |
|     | this, we     | design | a hybrid | Eulerian-Lagrangian |              | representation |           | of the     | neural radi- |
ancefield,i.e.,weusetheEuleriangridrepresentationforNeRFdensityandcolor
|     | fields, | while | advecting | the neural | radiance | fields via | Lagrangian | particles. | This |
| --- | ------- | ----- | --------- | ---------- | -------- | ---------- | ---------- | ---------- | ---- |
hybridEulerian-Lagrangianrepresentationseamlesslyblendsefficientneuralren-
|     | dering | with the | material | point | method | (MPM) for robust | differentiable |     | physics |
| --- | ------ | -------- | -------- | ----- | ------ | ---------------- | -------------- | --- | ------- |
simulation.Wevalidatetheeffectivenessofourproposedframeworkongeometry
andphysicalparameterestimationoveravastrangeofmaterials,includingelastic
|     | bodies, | plasticine, | sand, | Newtonian | and | non-Newtonian | fluids, | and | demonstrate |
| --- | ------- | ----------- | ----- | --------- | --- | ------------- | ------- | --- | ----------- |
significantperformancegainonmosttasks1.
1 INTRODUCTION
Inferring the geometric and physical properties of an object directly from visual observations is a
long-standingchallengeincomputervisionandartificialintelligence. Currentmachinevisionsys-
temsareunabletodisentanglethegeometricstructureofthescene,thedynamicsofmovingobjects,
and the mechanisms underlying the imaging process – an innate cognitive process in human per-
ception. For example, by merely watching someone kneading and rolling dough, we are able to
disentanglethedoughfrombackgroundclutter, formapredictivemodelofitsdynamics, andesti-
mate physical properties, such as its consistency to be able to replicate the recipe. There exists a
large body of work on inferring the geometric (extrinsic) structure of the world from multiple im-
ages(e.g.,structure-from-motion(Hartley&Zisserman,2003)). Thishasbeenbolsteredbyrecent
approachesleveragingdifferentiablerenderingpipelines(Tewarietal.,2022)andneuralscenerepre-
sentations(Xieetal.,2022),unlockinganewlevelofperformanceandvisualrealism. Ontheother
hand, approaches to extract the physical (intrinsic) properties (e.g., mass, friction, viscosity) from
imagesareyetnascent(Jatavallabhulaetal.,2020;Maetal.,2021;Jaquesetal.,2022;2020)–all
assumefullknowledgeofthegeometricstructureofthescene,therebylimitingtheirapplicability.
Thekeyquestionweaskinthisworkis“canwerecoverboththegeometricstructureandthephysi-
calpropertiesofawiderangeofobjectsfrommulti-viewvideosequences”? Thisdispenseswithall
oftheassumptionsmadebystate-of-the-artapproachestovideo-basedsystemidentification(known
geometries in Ma et al. (2021) and additionally rendering configurations in Jatavallabhula et al.
∗ThisworkwasdoneduringaninternshipattheMIT-IBMWatsonAILab
1Demosareavailableontheprojectwebpage:https://sites.google.com/view/PAC-NeRF
1

(2020)). Additionally,thebestperformingapproachestorecovergeometries(butnotphysicalprop-
erties) of dynamic objects in videos include variants of neural radiance fields (NeRF) (Mildenhall
etal.,2020),suchas(Pumarolaetal.,2021;Tretschketal.,2021;Parketal.,2021). However,all
suchneuralrepresentationsofdynamicscenesneedtolearnobjectdynamicsfromscratch,requiring
asignificantamountofdatatodoso,whilealsobeinguninterpretable. Weinsteademployadiffer-
entiablephysicssimulatorasamoreprescriptive,data-efficient,andgeneralizabledynamicsmodel;
enablingparameterestimationsolelyfromvideos.
Our approach—Physics Augmented Continuum Neural Radiance Fields (PAC-NeRF)—is a novel
system identification technique that assumes nothing about the geometric structure of a system.
PAC-NeRF is extremely general – operating on deformable solids, granular media, plastics, and
Newtonian/non-Newtonianfluids. PAC-NeRFbringstogetherthebestofbothworlds;differentiable
physicsandneuralradiancefieldsfordynamicscenes. ByaugmentingaNeRFwithadifferentiable
continuum dynamics model, we obtain a unified model that estimates object geometries and their
physicalpropertiesinasingleframework.
Specifically,aPAC-NeRFF isaNeRF,comprisingavolumedensityfieldandacolorfield,coupled
with a velocity field v that admits the continuum conservation law: DF = 0 (Spencer, 2004). In
Dt
conjunctionwithahybridEulerian-Lagrangianformulation,thisallowsustoadvectgeometryand
appearanceattributestoallframesinavideosequence, enablingthespecificationofareconstruc-
tionerrorintheimagespace. Thiserrortermisminimizedbygradient-basedoptimization, lever-
aging the differentiability of the entire computation graph, and enables system identification over
awiderangeofphysicalsystems,whereneitherthegeometrynortherenderingconfigurationsare
known.OurhybridrepresentationconsiderablyspeedsuptheoriginalMLP-basedNeRFbyefficient
voxeldiscretizationSunetal.(2022),andalsoconvenientlyhandlescollisionsincontinuumsimula-
tions,followingtheMPMpipelineJiangetal.(2015). Thejointdifferentiablerendering-simulation
pipeline with a unified Eulerian-Lagrangian conversion is highly optimized for high-performance
computingonGPU.
Insummary,wemakethefollowingcontributions.
• WeproposePAC-NeRF–adynamicneuralradiancefieldthatsatisfiesthecontinuumconserva-
tionlaw(Section3.1).
• We introduce a hybrid Eulerian-Lagrangian representation, seamlessly blending the Eulerian
natureofNeRFwithMPM’sLagrangianparticledynamics. (Section3.3).
• Ourframeworkestimatesboththegeometricstructureandphysicalparametersofawidevariety
ofcomplexsystems,includingelasticmaterials,plasticine,sand,andNewtonian/non-Newtonian
fluids,outperformingstate-of-the-artapproachesbyuptotwoordersofmagnitude. (Section5).
2 RELATED WORK
Neuralradiancefields(NeRF),introducedinMildenhalletal.(2020),areawidelyadoptedtech-
niquetoencodescenegeometryinacompactneuralnetwork;enablingphoto-realisticrenderingand
depthestimationfromnovelviews.AcomprehensivesurveyofneuralfieldsisavailableinXieetal.
(2022). In this work, we adopt the voxel representation proposed by Sun et al. (2022) as these do
notrequirepositionalinformationandnaturallyfittheEulerianstageoftheMaterialPointMethod
(MPM)usedinourphysicsprior.
Forperceptionofdynamicscenes,Lietal.(2021)introduceforwardandbackwardmotionfields
toenforceconsistencyintherepresentationspaceofneighboringframes. D-NeRF(Pumarolaetal.,
2021)introducesacanonicalframewithauniqueneuralfieldfordensitiesandcolors,andatime-
dependentbackwarddeformationmaptoquerythecanonicalframe. Thisrepresentationhassince
beenadoptedinTretschketal.(2021)andParketal.(2021). Chuetal.(2022)targetssmokescenes
andadvectsthedensityfieldbythevelocityfieldofsmoke.Thismethoddoesnotdealwithboundary
conditions,soitcannotmodelsolidsandcontact. Guanetal.(2022)presentacombinationofNeRF
with intuitive fluid dynamics leveraging neural simulators; whereas we provided a principled, and
interpretiblesimulation-and-renderingframework.
Systemidentificationofsoftbodiesisanextremelychallengingtask,owingtoitshighdimension-
alityandthepresenceoflargedeformations. Neural(Sanchez-Gonzalezetal.,2020;Lietal.,2019;
Xu et al., 2019) or gradient-free methods (Wang et al., 2015; Takahashi & Lin, 2019) struggle to
2

Static Voxel NeRF Ground Truth
Voxel Volume
Random sampling P2G Rendering
Loss
G2P (R, T, K)
Advections
(DiffMPM)
Physical Params
Voxel Volume
Lagrangian P2G Rendering
Loss
Eulerian (R', T', K')
Figure 1: PAC-NeRF uses both Lagrangian (particle; material-space) and Eulerian (grid; world-space) rep-
resentationsforanaccurateyettractablecomputationalmodelofcontinuummaterials. P2GandG2Pdenote
particle-to-gridandgrid-to-particletransforms,respectively. Renderablequantities(volumedensities,colors)
arerepresentedintheworldspace(firstframe)usingavoxelNeRF(Sunetal.,2022). Thesequantitiesare
boundtoparticles(byasamplingscheme)whosedynamicsaresimulatedbyusingadifferentiablematerial
pointmethod(MPM)(Jiangetal.,2015). The(Eulerian)voxelrepresentationenablesefficientcollisionhan-
dling and rendering. Since the entire simulation and rendering pipeline are differentiable, rendered (color)
imagesareabletooptimizeboththegeometricandphysicalpropertiesofobjects. PAC-NeRF(1)accelerates
NeRFrenderingwithEulerianrepresentation,(2)lendsphysicalplausibility,interpretability,anddataefficiency
indynamicscenes,and(3)enablesphysicalparameterestimationforcontinuummaterials.
achievehighaccuracyontheseproblems,owingtotheirblack-boxnature. Recentprogressindif-
ferentiablephysicssimulationhasdemonstratedgreatpromiseQiaoetal.(2021);Duetal.(2021);
Rojas et al. (2021); Geilinger et al. (2020); Heiden et al. (2021); Jatavallabhula et al. (2020); Ma
et al. (2021), but assumes that watertight geometric mesh representations of objects are available.
Recently,Chenetal.(2022)estimateelasticobjectpropertiesfromvideos. Ourhybridrepresenta-
tionandsimulation-renderingisgeneral,andspeedsupneuralrenderingbytwoordersofmagnitude.
WeusetheMaterialPointMethod(MPM)duetoitsabilitytohandletopologychangesandfric-
tional contacts; allowing the simulation of a wide range of materials, including elastic objects,
sand (Kla´r et al., 2016), to fluids (Jiang et al., 2015) and foam (Yue et al., 2015). While MPM
haspreviouslybeenusedfordifferentiablephysicssimulation(Huetal.,2020;Huangetal.,2021;
Fang et al., 2022), a watertight, non-degenerate mesh model was assumed to be available. Our
method solves the long-standing challenge of perceiving geometric and physical properties solely
fromvideos.
3 METHOD
Problemspecification: Givenasetof(posed)multi-viewvideosofadynamicscene,weaimtore-
cover(1)anexplicitgeometricrepresentation,and(2)physicalproperties(suchasYoung’smodulus,
fluidviscosity,frictionangles,etc.) ofthedynamicobjectofinterest.
Unlikeexistingsystemidentificationmethodsthatoperateonimages,wedonotrequireknownob-
jectgeometries. Ourapproachisgeneralandworksonawiderangeofmaterialtypes(fluids,sand,
plasticine, etc.). Our proposed approach, Physics Augmented Continuum Neural Radiance Fields
PAC-NeRF,seamlesslyblendsneuralscenerepresentationsandexplicitdifferentiablephysicsen-
gines for continuum materials. The core components of PAC-NeRF include a continuum NeRF, a
particle-gridinterconverter,andaLagrangianfield. Wedetailtheseinthissection(seeFigure1).
3.1 CONTINUUMNEURALRADIANCEFIELDS
Recall that a (static) NeRF comprises a view-independent volume density field σ(x) and a view-
dependent appearance (color) field c(x,ω) for each point x ∈ R3, and directions ω = (θ,φ) ∈
S2 (spherical coordinates). A dynamic (time-dependent) NeRF extends the fields above with an
additional time variable t ∈ R+, denoted σ(x,t) and c(x,ω,t) respectively. We use the efficient
voxel discretization from Sun et al. (2022) to specify a dynamic Eulerian (world-frame) NeRF.
Colorimagesarerenderedfromtheabovetime-dependentfieldsbysamplingpointsalongaray,for
3

eachpixelintheresultantimage. TheappearanceC(r,t)ofapixelspecifiedbyraydirectionr(s)
(s∈[s ,s ])isgivenbythevolumerenderingintegral(Mildenhalletal.,2020)
min max
| (cid:90) sf |     |     |     |     |     |     | (cid:18) (cid:90) s | (cid:19) |
| ----------- | --- | --- | --- | --- | --- | --- | ------------------- | -------- |
C(r,t)= T(s,t)σ(r(s),t)c(r(s),ω,t)ds+c bg T(s f ,t), T(s,t)=exp − σ(r(s¯),t)ds¯
| sn  |     |     |     |     |     |     | sn  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
(1)
ThedynamicNeRFcanbetrainedbyenforcingtherenderedpixelcolorstomatchthoseinthevideo.
|     |     |          | 1 N−1 1  |                |          |              |     |     |
| --- | --- | -------- | -------- | -------------- | -------- | ------------ | --- | --- |
|     |     |          | (cid:88) | (cid:88)       | )−Cˆ(r,t | )(cid:107)2, |     |     |
|     | L   | render = |          | (cid:107)C(r,t | i        | i            |     | (2) |
|     |     |          | N |R|    |                |          |              |     |     |
|     |     |          | i=0      | r∈R            |          |              |     |     |
isthenumberofframesofvideos,Cˆ(r,t)isthegroundtruthcolorobservation.
whereN
Additionally, we enforce that the appearance and volume density fields admit conservation laws
characterizedbythevelocityfieldoftheunderlyingphysicalsystem:
|     |     |     | Dσ  | Dc  |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|     |     |     | =0, |     | =0, |     |     | (3) |
|     |     |     | Dt  | Dt  |     |     |     |     |
Dφ ∂φ
with = +v·∇φbeingthematerialderivativeofanarbitrarytime-dependentfieldφ(x,t).
Dt ∂t
Here,visavelocityfield,whichinturnmustobeymomentumconservationforcontinuummaterials
Dv
|     |     |     | ρ =∇·T | +ρg, |     |     |     | (4) |
| --- | --- | --- | ------ | ---- | --- | --- | --- | --- |
Dt
where ρ is the physical density field, T is the internal Cauchy stress tensor, and g is the acceler-
ation due to gravity. We use the differentiable Material Point Method (Hu et al., 2020) to evolve
Equation(4).
3.2 PARTICLE-GRIDINTERCONVERTERS
While a Lagrangian representation is ideal for advection by the material point method (MPM), an
Eulerian frame is required for rendering the advected particle states to image space. We therefore
employahybridrepresentationtoblendthebestofbothworlds. Akeyrequirementistobeableto
seamlesslytraversetheEulerian(grid)viewtotheLagrangian(particle)view(andviceversa).
DenotingtheEulerianandLagrangianviewsGandP respectively,afieldFG(t)={σ(x,t),¸(x,t)}
∗
attimetmaybeinterconvertedasfollows:
(cid:80)
|     |     |     | (cid:88) |     | w        | F P |     |     |
| --- | --- | --- | -------- | --- | -------- | --- | --- | --- |
|     |     | FP  | FG,      | FG  | p ip     | p   |     |     |
|     |     | ≈   | w ip     | ≈   | (cid:80) | ,   |     | (5) |
|     |     | p   | i        | i   | w        |     |     |     |
|     |     |     | i        |     | p        | ip  |     |     |
where i indices grid nodes and p indices particles, and w is the weight of the trilinear shape
ip
function defined on node i and evaluated at the location of particle p. We use P2G and G2P to
denotetheparticle-to-gridandgrid-to-particleconversionprocessesrespectively.
3.3 LAGRANGIANFIELD
AnEulerianvoxelfieldFG(t )isinitializedoverthefirstframeofthesequence.
|     |     | 0   |     |     |     |     | Fromthisfield, |     |
| --- | --- | --- | --- | --- | --- | --- | -------------- | --- |
FP(t
we use the G2P process to obtain a Lagrangian particle field 0 ). We advect this field using
an initial guess physical parameter set Θ and the material point method (Equation (3)) to obtain
FP(t )att =t +δt(whereδtisthedurationofeachsimulationtimestep). Theadvectedfieldis
1 1 0
thenmappedtotheEulerianviewusingtheP2Gprocess, resultinginFG(t ), whichisemployed
1
forcollisionhandlingandneuralrendering. TheEulerianvoxelgridrepresentationusedhereisat
leasttwoordersofmagnitude(100×)fasterintermsofimagerenderingtime(Sunetal.,2022).
FollowingSunetal.(2022),therenderingdensityfieldσandcolorfieldcattimetare:
| σ(x,t)=softplus(Interp(x,σˆ)), |     |     |     | c(x,d,t)=MLP(Interp(x,cˆ),d), |     |     |     |     |
| ------------------------------ | --- | --- | --- | ----------------------------- | --- | --- | --- | --- |
(6)
whereσˆ isascalarfieldandcˆisavectorfield,botharediscretizedonafixedvoxelgrid. Interp(·)
denotestrilinearinterpolation.Advectionisperformedbyfirstadvectingthegridsσˆandcˆ,followed
bycomputingtheinterpolationfunctionsandevaluatingtheMLP(orthesoftplus).
4

TheinitializationofforwardsimulationrequiresgeneratingLagrangianrepresentationsofσˆ andcˆ.
We randomly sample 8 particles within each voxel grid and use Equation (5) to bind the density
and color values onto particles. Additionally, we associate with each particle a scalar value α =
p
1−e−softplus(σˆp)in(0,1).Alowerαvaluedenotesasmallercontributiontotheradiancefields.We
make particles with lower values of α softer by scaling the physical density field ρ (Equation (4))
andthephysicalstressfieldT byafactorα3. Weremoveaparticlepifα < (cid:15) max α ,where
p p p
weset(cid:15)=10−3asaconstantthreshold.
3.4 PAC-NERFFORGEOMETRY-AGNOSTICSYSTEMIDENTIFICATION
Our pipeline for geometry-agnostic system identification comprises three distinct phases for com-
putationaltractability. Wefirstpreprocessdatausingvideomattingtechniquestoextractforeground
objects of interest. This is followed by a geometry seeding phase, where we employ a coarse-to-
fine approach to recover object geometry. The extracted geometry is then used to perform system
identification by rendering out future video frames based on a guessed set of physical properties,
computing an error term with respect to the true videos, and updating the physical properties by
gradient-basedoptimization.
Data Preprocessing: We assume a set of static cameras with known intrinsics and extrinsics. To
focus rendering computationon the object ofinterest, we run the videomatting framework in Lin
etal.(2021)toremovestaticbackgroundobjects. Thisalsoprovidesuswithasegmentationmask
oftheforegroundobjectofinterest.
reziraluger
ecafrus
tuohtiW
reziraluger
ecafrus
htiW
GeometrySeeding: Wefirstobtainacoarsegeometryofthe
foregroundobject(s)ofinterestbyemployingthestaticvoxel
fields. Thecontentsoftheforegroundsegmentationmaskare
renderedtoproduceanappearancelosstermoptimizedusing
gradient descent. We employ a coarse-to-fine strategy to en-
able easier optimization. We noticed that, as opposed to di-
rectly rendering the initial voxel radiance field, running the
G2P converter followed by a P2G converter ensures that ren-
deringforalltheframes(includingtheinitialframe)isconsis-
tentlybasedonthesamegroupofparticles(implicitlyprovid- Figure 2: Our surface regularizer im-
ingasetofconsistentcorrespondencesacrosstime). Inaddi- proves reconstruction quality, by pro-
tion to the rendering loss Equation (2), we employ a surface ducingatight-fitshapetothesegmen-
tationmask.
regularizertoregularizethegeometricdensityfield:
(cid:88) ∆x
L = clamp(α ,10−4,10−1)( )2. (7)
surf p 2
p
This regularizer minimizes the total surface area, and as shown in Figure 2, this tends to improve
thequalityofreconstructedgeometriesbymakingthereconstructedpointcloudmorecompactand
fitthegroundtruthboundarymoreclosely.
System Identification: Upon convergence of the geometry seeding phase, we freeze the parame-
ters of the field (for the initial time step t ). To minimize scenarios where one or more variables
0
of interest become unobservable under unknown initial conditions, we use the first 2-3 frames to
estimate the initial velocity of observed particles. We then optimize for physical parameters with
eachsubsequentframe. Tomitigateconvergenceissuesinparameterspaceswithlargerdegreesof
freedom, wefound it helpfulto warm startthe optimizer after initial collisionevents, followed by
anoptimizationovertheentiresequence.
4 IMPLEMENTATION DETAILS
The architecture of voxel discretization of NeRF follows Sun et al. (2022), which stores density
value and color feature within 1603 voxels, only contraining an extra 2-layer MLP with a hidden
dimension 128 for view-dependent color fields. The dimension of color feature on each voxel is
12. Positionalembeddingisappliedtotheinputs(queryposition,viewdirectionandcolorfeature)
totheshallowMLP,leadingtoainputdimension39. OurdifferentiableMPMisusingDiffTaichi
(Hu et al., 2020). Both the rendering and simulation are optimized for GPU. The entire training
5

Figure 3: The photorealistic dataset used to evaluate system identification and geometry estimation. The
datasetincludesavarietyofcontinuummaterials,includingNewtonianfluids(Droplet,Letter),non-Newtonian
fluids (Cream, Toothpaste), granular media (Trophy), deformable solids (Torus, Bird), and plasticine (Cat,
Playdoh). Allobjectsfreelyfallundertheinfluenceofgravity, undergoingcollisions. Objectsarerendered
undercomplexenvironmentallightingconditionsforphotorealism.
takes∼1.5hoursonasingleNvidia3090GPU.Simulation+renderingofoneframetakes∼1s(vs.
∼10minforChenetal.(2022)).
5 EXPERIMENTS
WeconductvariousexperimentstostudytheefficacyofPAC-NeRFonsystemidentificationtasks
andfindthat:
• PAC-NeRFcanrecoverhigh-qualityobjectgeometriessolelyfromvideos.
• PAC-NeRFperformssignificantlybetteronsystemidentificationtaskscomparedtofullylearned
approaches.
• PAC-NeRFalleviatestheassumptionsthatothertechniquesrequire(i.e.,knownobjectgeometry),
whileoutperformingthem.
• Purelypixel-basedlossfunctionsproviderichgradientsthatenablephysicalparameterestimation.
5.1 EXPERIMENTSETUP
Dataset: Toevaluatedifferentsystemidentificationmethods,wesimulateandrenderawiderange
ofobjectsusingaphoto-realsticsimulationenginewithvaryingenvironmentlightingconditionsand
groundtextures. Ourdatasetincludesdeformableobjects,plastics,granularmedia,Newtonianand
non-Newtonianfluids. Figure3demonstratesafewexamplescenarios. Ineachscene,objectsfreely
fall under the influence of gravity, undergoing (self and external) collisions. For convenience, we
assumethatthecollisionobjectssuchasthegroundplaneareknown(however,thiscanalsobeeasily
estimatedfromobservedimages). Eachsceneiscapturedfrom11uniformlysampledviewpoints,
with the cameras evenly spaced on the upper hemisphere containing the object. All ground truth
simulationdataaregeneratedbyMLS-MPMframework(Huetal.,2018b).
Physical Parameters: Our differentiable MPM implementation supports five kinds of common
materials, including elasticity, plasticine, granular media (e.g., sand), Newtonian fluids and non-
Newtonianfluids.
• Elasticity: Young’s modulus (E) (material stiffness), Poisson’s ration (ν) (ability to preserve
volumeunderdeformation).
• Plasticine: Young’s modulus (E), Poisson’s ration (ν), and yield stress (τ ) (stress required to
Y
causepermanentdeformation/yielding).
• Newtonianfluid: fluidviscosity(µ)(oppositiontovelocitychange),bulkmodulus(κ)(abilityto
preservevolume).
6

| Newtonian | Non-Newtonian | Elasticity | Plasticine | Sand |
| --------- | ------------- | ---------- | ---------- | ---- |
hturT dnuorG
FReN-CAP
weiV elcitraP
Droplet Letter Cream Toothpaste Torus Bird Playdoh Cat Trophy
Figure 4: Qualitative results: Our experiments cover a wide range of continuums, from Newtonian fluids
andnon-Newtonianfluids,toelastic/plasticsolidsandgranularmedia(sand). Existingapproaches(including
dynamic NeRF and variants) are unable to reconstruct these highly dynamic objects. PAC-NeRF not only
reconstructsthemwithhighaccuracybutalsopreciselydeterminestheunderlyingphysicalproperties.
| InitialGuess      | Optimized             |     | GroundTruth |     |
| ----------------- | --------------------- | --- | ----------- | --- |
| Droplet µ=1,κ=103 | µ=2.09×102,κ=1.08×105 |     | µ=200,κ=105 |     |
| Letter µ=1,κ=106  | µ=83.85,κ=1.35×105    |     | µ=100,κ=105 |     |
Cream µ=102,κ=104,τY =10,η=1 µ=1.21×105,κ=1.57×106,τY =3.16×103,η=5.6 µ=104,κ=106,τY =3×103,η=10
| µ=102,κ=104,τY    | µ=6.51×103,κ=2.22×105,τY |             | µ=5×103,κ=105,τY |           |
| ----------------- | ------------------------ | ----------- | ---------------- | --------- |
| Toothpaste        | =10,η=1                  | =228,η=9.77 |                  | =200,η=10 |
| Torus E=105,ν=0.1 | E=1.04×106,ν=0.322       |             | E=106,ν=0.3      |           |
| Bird E=103,ν=0.1  | E=2.78×105,ν=0.273       |             | E=3×105,ν=0.3    |           |
Playdoh E=105,ν=0.4,τY =103 E=3.84×106,ν=0.272,τY =1.69×104 E=2×106,ν=0.3,τY =1.54×104
Cat E=103,ν=0.2,τY =102 E=1.61×105,ν=0.293,τY =3.57×103 E=106,ν=0.3,τY =3.85×103
| θ0 =10◦     | θ0 =36.1◦ |     | θ0 =40◦ |     |
| ----------- | --------- | --- | ------- | --- |
| Trophy fric | fric      |     | fric    |     |
Table1:PAC-NeRFestimatesphysicalparametersveryaccurately.
• Non-Newtonianfluid: shearmodulus(µ),bulkmodulus(κ),yieldstress(τ ),andplasticityvis-
Y
cosity(η)(decayedtemporaryresistancetoyielding).
• Sand: frictionangle(θ fric )(proportionalityconstantdeterminingslopeofasandpile).
SystemIdentificationPipeline: WefirsttrainastaticvoxelNeRFusingdatafromthefirstframe
(followingSunetal.(2022))withtheAdamoptimizer. TheinitialvelocityestimatorusesL-BFGS,
which we experimentally find to be better than Adam for this sub-task. For all other physical pa-
rametersofinterest,weusetheAdamoptimizer.
5.2 SYSTEMIDENTIFICATIONEVALUATION
SyntheticData: WereportsystemidentificationresultsusingPAC-NeRFover9syntheticproblem
instances. The qualitative results are shown in Figure 4. And the quantitative results are listed in
Table1.Eachrowliststheinitialguess,thevaluesobtainedafteroptimization,andthegroundtruth.
Weseethat,ineachcase,theoptimizedphysicalparameterscloselyagreewiththegroundtruth.
RealData: WealsoevaluatePAC-NeRFonreal-worlddata(Figure5). Webuiltacapturesystem
comprisingfoursynchronizedIntelRealSenseD455camerascapableofstreamingRGBimagesata
resolutionof640×480andatarateof60framespersecond. NotethatweDONOTuseanydepth
datarecordedfromthesecamerasinourexperiments,forfairevaluation. Wecapturedadeformable
ball falling onto a table and manually segmented the data. Our reconstructed scene qualitatively
matches the target videos. We note that, due to the limited number of views (here, 4) we could
7

Figure5: WetestPAC-NeRFonasetofreal-worldmultiviewvideos. Ourreconstructedscenequalitatively
matchesthetargetvideos,whichvalidatesthattherenderinglossiseffectivelyminimized.
acquire, there are slight errors in surface geometry estimation. These issues may be mitigated by
increasingthenumberofviewsfromwhichdataiscaptured.
5.3 COMPARISONS
Since there are no existing approaches that estimate both geometry and material properties from
videos,wemakeabest-effortcomparisonbyblendingcombinationsofstate-of-the-artapproaches
for each sub-task. For each material type discussed above, we generate 10 problem instances by
varying object orientations, initial velocities, and physical parameters. The comparisons are con-
ductedonthisdataset. Notethatourapproach(andmostofthebaselinesherein)doesnotrequirea
separatetrainingphase–theyperforminference-timeoptimizationoneachtestsequence.
5.3.1 APPROACHESEVALUATED
Multi-view LSTM: To evaluate amortized physical parameter inference schemes, we use a pre-
trained ResNet feature extractor to extract features from all views and feed them into a 2-layer
LSTM.Thisbaselineusesprivilegedinformationintheformoftrainingvideosequences(whileall
otherbaselinesbeginwitharandominitializationoneachtestsequence).
D-NeRF+DiffSim: ToassesstheimpactofconservationlawenforcementinPAC-NeRF,wecom-
parewithVEO(Chenetal.,2022)(abest-effortcomparison)byimplementingD-NeRF(dynamic
NeRF)andintegratingitwithourdifferentiablesimulator. AdynamicvoxelNeRFlearnsboththe
forwardandbackwarddeformationfieldforeachframe. Thelearnedforwarddeformationfieldis
thenusedtoprovidethedifferentiablesimulatorwith3Dsupervision.
NeRF+∇Sim: Wealsocomparewith∇Sim–astate-of-the-artapproachforestimatingphysical
properties with both the geometry and rendering configuration known. (By contrast, we assume
neither.) Weimplementabest-effortcomparisonwhereweuseastaticvoxelNeRFtorecoverthe
geometry and directly provide the rendering color configuration. Note that ∇Sim only supports
FEMsimulationforcontinuummaterials.Therefore,thisbaselineonlyrunsonasmallsubsetofour
scenarios. Moreover, to run this baseline, we extract a surface mesh from our reconstructed point
cloud from voxel NeRF and then use TetWild (Hu et al., 2018a) to generate a tetrahedral mesh.
Further,wemanuallychooseanoptimalcameraviewingdirectiontofacilitateoptimization.
Random: We also evaluate the performance of these approaches against random chance, by em-
ployingabaselinethatpredictsauniformlyrandomlychosenvalueovertheparameterrangesused.
Oracle: Weimplementanoraclethatusesprivileged3Dgeometricinformation. Theoracleknows
the ground truth point clouds, and employs 3D supervision (Chamfer distance) to infer physical
properties. Ofthe10probleminstancesforeachmaterialtype,weruntheoracleon4.
5.3.2 ANALYSISOFRESULTS
TheperformancesofallapproachesonthesystemidentificationtasksarelistedinTable2. Foreach
material,wereportthemeanabsoluteerroranditsstandarddeviationovertheevaluatedinstances.
We see that compared to all other methods, PAC-NeRF achieves the best results in 14 of the 17
categoriesofphysicalpropertiesestimated.
Themulti-viewLSTMmethodisadaptedfromDensePhysNet(Xuetal.,2019)andlearnsthemap-
pingfromvideostophysicalparametersimplicitly. Notably,thisbaselinerequiresprivilegedinfor-
mationintheformoftrainingsequences–notavailabletotheotherapproaches.
TheD-NeRF+DiffsimisadaptedfromVEO(Chenetal.,2022),wheretheforwarddeformationfield
isusedtooptimizeadifferentiablesimulation. Theaccuracyofthisapproachthereforereliesonthe
qualityofthelearnedforwarddeformationfield. However,thislearneddeformationfield(Tretschk
8

|     |                   |                | D-NeRF NeRF    |                      |
| --- | ----------------- | -------------- | -------------- | -------------------- |
|     | Ours              | Multi-viewLSTM | +DiffSim +∇Sim | Random Oracle(×10−2) |
|     | log (µ) 11.6±6.60 | 14.1±9.26      | >291.3         | 64.1±31.3 19.4±6.95  |
10
Newtonian log (κ) 16.7±5.37 28.2±19.8 >85.2 Notsupported 72.8±42.5 258.9±25.2
|           | 10 v 0.86±1.45        | 23.1±17.8 | 25.5              | 55.5±22.6 2.82±1.72  |
| --------- | --------------------- | --------- | ----------------- | -------------------- |
|           | log 10 (µ) 24.1±21.9  | 39.4±26.9 | >276.7            | 34.2±19.9 24.0±17.1  |
|           | log (κ) 44.0±26.3     | 25.1±22.6 | >262.5            | 67.6±49.4 82.90±21.0 |
| Non-      | log 10 (τY) 5.09±7.41 | 7.19±7.88 | >359.6            | 30.0±15.0 9.75±11.3  |
| Newtonian | 10                    |           | Notsupported      |                      |
|           | log (η) 28.7±23.3     | 39.9±21.1 | >86.1             | 64.3±43.7 90.6±37.2  |
|           | 10 v 0.29±0.13        | 24.4±14.2 | 25.9              | 52.2±21.6 2.60±0.39  |
|           | log 10 (E) 3.02±3.72  | 17.7±9.25 | >437.5 151.6±42.6 | 96.2±46.9 4.39±4.54  |
Elasticity ν 4.35±5.08 81.8±58.4 7.67 16.4±6.58 10.9±6.37 3.65±2.88
|            | v 0.50±0.23          | 6.10±3.27 | 30.7 182.4±74.1 | 43.6±25.4 2.69±0.97  |
| ---------- | -------------------- | --------- | --------------- | -------------------- |
|            | log 10 (E) 83.8±68.4 | 41.1±31.4 | 23.2            | 42.9±38.0 56.2±30.7  |
|            | log (τY) 11.2±14.5   | 28.6±17.3 | >268.9          | 82.7±43.1 8.13±3.61  |
| Plasticine | 10                   |           | Notsupported    |                      |
|            | ν 18.9±15.7          | 5.40±3.49 | 10.36           | 10.6±6.15 4.44±3.61  |
|            | v 0.56±0.17          | 22.0±14.8 | >384.6          | 47.7±17.53 4.06±1.87 |
|            | θfric 4.89±1.10      | 20.1±2.06 | 64.5            | 22.5±14.7 0.44±0.42  |
| Sand       |                      |           | Notsupported    |                      |
|            | v 0.21±0.08          | 14.6±6.25 | 40.6            | 38.7±21.1 1.17±0.42  |
Table2: Systemidentificationperformance: Meansandthestandardderivationsofabsoluteerrorsarere-
portedforeachmetric.Wecomparewithfivebaselines,includingapurevision-basedmethod(ResNet+LSTM
regression),D-NeRF+DIffSim(similartoVEO(Chenetal.,2022)),NeRF+∇Sim(Jatavallabhulaetal.,2020),
randomsamplingfromparameterdistribution,andoraclepointcloudplusChamferdistanceminimization.Our
methodobtainsthebestresults(highlightedinboldfacefont)in14/17entries,excludingtheOracle.
etal.,2021)cannotguaranteephysicalcorrectness, unlikePAC-NeRFwhichisconstrainedbythe
conservationlaws(Equation(3)andEquation(4)). Inourexperiments,weobservedthatthisleads
toverynoisydeformation,andimpedessystemidentificationperformance.Duetotheseinstabilities
ofthisapproach,weonlyrunthisononescenariopermaterialtypeandreportitsperformance.
The NeRF+∇Sim (Jatavallabhula et al., 2020) baseline only supports FEM simulations for elastic
materialsandissensitivetotimeintegrationstepsize. TostabilizethesymplecticFEMandthecon-
tactmodelusedin∇Sim,tensofthousandsofsubstepsarerequiredtosimulatetheentiresequence.
Notwithstandingtheerrorsinducedduetogeometricinaccuraciesandunknownrenderingconfigu-
rations,errorsaccumulatedfromlongtimesteppingsequencesalsocontributetothefailureof∇Sim
on our scenarios. PAC-NeRF, with its Eulerian-Lagrangian representation, is more robust under
largerdeformations(e.g.,fluidsandsand)andpermitslargertimestepsizesthanaFEMsimulation
withasymplecticintegrator(usedin∇Sim).
TheOraclebaselineassumesknown3D(pointcloud)geometryandcomputesaChamferdistance
error term per-timestep. We note, surprisingly, that in several scenarios, a pixel-wise color loss
outperforms this 3D supervision signal. The results show the effectiveness of the differentiable
rendering-simulationpipeline,wherea2Dpixel-levelsupervisionbetteroptimizesthephysicalpa-
rameters,opposedtoa3DChamferdistancemetric.
6 CONCLUSION
WepresentedPhysicsAugmentedContinuumNeuralRadianceFields(PAC-NeRF),anovelrepre-
sentation for system identification without geometry priors. The continuum reformulation of dy-
namicNeRFnaturallyunifiesphysicalsimulationandrendering,enablingdifferentiablesimulators
to estimate both geometry and physical properties from image space signals (such as multi-view
videos). AhybridrepresentationisusedtodiscretizeourPAC-NeRFimplementation,whichlever-
agesthehighefficiencyofanEulerianvoxel-basedNeRFandtheflexibilityofMPM.
Despite its promising result, this work is not without its limitations. It assumes a set of synchro-
nizedandaccuratelycalibratedcamerastoensurethatNeRFprovidesagood-qualityreconstruction.
Italsoassumesscenesthatareeasilyamenabletovideomatting(backgroundremoval)or withfore-
groundmasks. Itassumestheunderlyingphysicalphenomenonfollowscontinuummechanicsand
cannotautomaticallydistinguishbetweendifferentmaterials.TheextensionoftheMPMframework
beyond volumetric continuum materials (e.g., thin-shell objects like cloth), implicit MPM for stiff
materials, and integrating other differentiable simulators (e.g., articulated body simulators) are all
interesting avenues for future work. Interactions with rigid bodies can also enable manipulation
tasks(Huangetal.,2021)onNeRF-representedsoft-bodies.
9

ACKNOWLEDGMENTS
ThisprojectwassupportedbytheDARPAMCSprogram,MIT-IBMWatsonAILab,NSFCAREER
2153851,CCF2153863,ECCS-2023780,andgiftfundingfromMERL,Cisco,andAmazon.
REFERENCES
Hsiao-yu Chen, Edith Tretschk, Tuur Stuyck, Petr Kadlecek, Ladislav Kavan, Etienne Vouga, and
ChristophLassner. Virtualelasticobjects. InProceedingsoftheIEEE/CVFConferenceonCom-
puterVisionandPatternRecognition,pp.15827–15837,2022.
3,6,8,9
Mengyu Chu, Lingjie Liu, Quan Zheng, Erik Franz, Hans-Peter Seidel, Christian Theobalt, and
ACM
Rhaleb Zayer. Physics informed neural fields for smoke reconstruction with sparse data.
| TransactionsonGraphics(TOG),41(4):1–14,2022. |     | 2   |     |     |
| -------------------------------------------- | --- | --- | --- | --- |
Tao Du, Kui Wu, Pingchuan Ma, Sebastien Wah, Andrew Spielberg, Daniela Rus, and Wojciech
Matusik. DiffPD:Differentiableprojectivedynamicswithcontact. arXiv:2101.05917,2021. 3
YuFang,JianchengLiu,MingruiZhang,JiashengZhang,YidongMa,MinchenLi,YuanmingHu,
ChenfanfuJiang,andTiantianLiu. Complexlocomotionskilllearningviadifferentiablephysics.
| arXivpreprintarXiv:2206.02341,2022. | 3   |     |     |     |
| ----------------------------------- | --- | --- | --- | --- |
MoritzGeilinger,DavidHahn,JonasZehnder,MoritzBa¨cher,BernhardThomaszewski,andStelian
Coros.ADD:Analyticallydifferentiabledynamicsformulti-bodysystemswithfrictionalcontact.
| ACMTransactionsonGraphics(TOG),39(6),2020. |     | 3   |     |     |
| ------------------------------------------ | --- | --- | --- | --- |
Shanyan Guan, Huayu Deng, Yunbo Wang, and Xiaokang Yang. Neurofluid: Fluid dynamics
| groundingwithparticle-drivenneuralradiancefields. |     | InICML,2022. | 2   |     |
| ------------------------------------------------- | --- | ------------ | --- | --- |
Richard Hartley and Andrew Zisserman. Multiple view geometry in computer vision. Cambridge
| universitypress,2003. | 1   |     |     |     |
| --------------------- | --- | --- | --- | --- |
EricHeiden,MilesMacklin,YashrajSNarang,DieterFox,AnimeshGarg,andFabioRamos. Di-
SECt: ADifferentiableSimulationEngineforAutonomousRoboticCutting. InProceedingsof
Robotics: ScienceandSystems,Virtual,July2021. doi: 10.15607/RSS.2021.XVII.067. 3
YixinHu,QingnanZhou,XifengGao,AlecJacobson,DenisZorin,andDanielePanozzo. Tetrahe-
| dralmeshinginthewild. | ACMTrans.Graph.,37(4):60–1,2018a. |     | 8   |     |
| --------------------- | --------------------------------- | --- | --- | --- |
YuanmingHu,YuFang,ZihengGe,ZiyinQu,YixinZhu,AndrePradhana,andChenfanfuJiang. A
moving least squares material point method with displacement discontinuity and two-way rigid
| bodycoupling. | ACMTransactionsonGraphics(TOG),37(4):1–14,2018b. |     |     | 6   |
| ------------- | ------------------------------------------------ | --- | --- | --- |
Yuanming Hu, Luke Anderson, Tzu-Mao Li, Qi Sun, Nathan Carr, Jonathan Ragan-Kelley, and
Fre´doDurand. Difftaichi: Differentiableprogrammingforphysicalsimulation. ICLR,2020. 3,
4,5
Zhiao Huang, Yuanming Hu, Tao Du, Siyuan Zhou, Hao Su, Joshua B. Tenenbaum, and Chuang
InInterna-
Gan. Plasticinelab: Asoft-bodymanipulationbenchmarkwithdifferentiablephysics.
tional Conference on Learning Representations, 2021. URL https://openreview.net/
forum?id=xCcdBRQEDW. 3,9
Miguel Jaques, Michael Burke, and Timothy Hospedales. Physics-as-inverse-graphics: Unsuper-
| visedphysicalparameterestimationfromvideo. |     | ICLR,2020. | 1   |     |
| ------------------------------------------ | --- | ---------- | --- | --- |
Miguel Jaques, Martin Asenov, Michael Burke, and Timothy Hospedales. Vision-based system
identificationand3dkeypointdiscoveryusingdynamicsconstraints. InLearningforDynamics
| andControlConference,pp.316–329.PMLR,2022. |     | 1   |     |     |
| ------------------------------------------ | --- | --- | --- | --- |
KrishnaMurthyJatavallabhula,MilesMacklin,FlorianGolemo,VikramVoleti,LindaPetrini,Mar-
tinWeiss,BreandanConsidine,Je´roˆmeParent-Le´vesque,KevinXie,KennyErleben,etal. grad-
sim: Differentiablesimulationforsystemidentificationandvisuomotorcontrol. InInternational
| ConferenceonLearningRepresentations,2020. |     | 1,3,9 |     |     |
| ----------------------------------------- | --- | ----- | --- | --- |
10

ChenfanfuJiang,CraigSchroeder,AndrewSelle,JosephTeran,andAlexeyStomakhin. Theaffine
particle-in-cellmethod. ACMTransactionsonGraphics(TOG),34(4):1–10,2015. 2,3
GergelyKla´r,TheodoreGast,AndrePradhana,ChuyuanFu,CraigSchroeder,ChenfanfuJiang,and
JosephTeran.Drucker-pragerelastoplasticityforsandanimation.ACMTransactionsonGraphics
(TOG),35(4):1–12,2016. 3,13
YunzhuLi, JiajunWu, RussTedrake, JoshuaB.Tenenbaum, andAntonioTorralba. Learningpar-
ticle dynamics for manipulating rigid bodies, deformable objects, and fluids. In International
ConferenceonLearningRepresentations,2019. 2
Zhengqi Li, Simon Niklaus, Noah Snavely, and Oliver Wang. Neural scene flow fields for space-
timeviewsynthesisofdynamicscenes.InProceedingsoftheIEEE/CVFConferenceonComputer
VisionandPatternRecognition(CVPR),2021. 2
ShanchuanLin, AndreyRyabtsev, SoumyadipSengupta, BrianLCurless, StevenMSeitz, andIra
Kemelmacher-Shlizerman. Real-timehigh-resolutionbackgroundmatting. InProceedingsofthe
IEEE/CVFConferenceonComputerVisionandPatternRecognition,pp.8762–8771,2021. 5
Pingchuan Ma, Tao Du, Joshua B Tenenbaum, Wojciech Matusik, and Chuang Gan. Risp:
Rendering-invariantstatepredictorwithdifferentiablesimulationandrenderingforcross-domain
parameterestimation. InInternationalConferenceonLearningRepresentations,2021. 1,3
BenMildenhall,PratulP.Srinivasan,MatthewTancik,JonathanT.Barron,RaviRamamoorthi,and
RenNg. Nerf: Representingscenesasneuralradiancefieldsforviewsynthesis. InECCV,2020.
2,4
Keunhong Park, Utkarsh Sinha, Jonathan T. Barron, Sofien Bouaziz, Dan B Goldman, Steven M.
Seitz, and Ricardo Martin-Brualla. Nerfies: Deformable neural radiance fields. In Proceedings
oftheIEEE/CVFInternationalConferenceonComputerVision(ICCV),pp.5865–5874,October
2021. 2
AlbertPumarola,EnricCorona,GerardPons-Moll,andFrancescMoreno-Noguer. D-nerf: Neural
radiance fields for dynamic scenes. In Proceedings of the IEEE/CVF Conference on Computer
VisionandPatternRecognition(CVPR),pp.10318–10327,June2021. 2
YilingQiao,JunbangLiang,VladlenKoltun,andMingLin. Differentiablesimulationofsoftmulti-
bodysystems. AdvancesinNeuralInformationProcessingSystems,34:17123–17135,2021. 3
Junior Rojas, Eftychios Sifakis, and Ladislav Kavan. Differentiable implicit soft-body physics.
arXivpreprintarXiv:2102.05791,2021. 3
Alvaro Sanchez-Gonzalez, Jonathan Godwin, Tobias Pfaff, Rex Ying, Jure Leskovec, and Peter
Battaglia. Learningtosimulatecomplexphysicswithgraphnetworks. InInternationalConfer-
enceonMachineLearning,pp.8459–8468.PMLR,2020. 2
AnthonyJamesMerrillSpencer. Continuummechanics. CourierCorporation,2004. 2
Cheng Sun, Min Sun, and Hwann-Tzong Chen. Direct voxel grid optimization: Super-fast con-
vergence for radiance fields reconstruction. In Proceedings of the IEEE/CVF Conference on
ComputerVisionandPatternRecognition,pp.5459–5469,2022. 2,3,4,5,7
Tetsuya Takahashi and Ming C Lin. Video-guided real-to-virtual parameter transfer for viscous
fluids. ACMTransactionsonGraphics(TOG),38(6):1–12,2019. 2
AyushTewari,JustusThies,BenMildenhall,PratulSrinivasan,EdgarTretschk,WYifan,Christoph
Lassner,VincentSitzmann,RicardoMartin-Brualla,StephenLombardi,etal. Advancesinneural
rendering. InComputerGraphicsForum,volume41,pp.703–735.WileyOnlineLibrary,2022.
1
Edgar Tretschk, Ayush Tewari, Vladislav Golyanik, Michael Zollho¨fer, Christoph Lassner, and
Christian Theobalt. Non-rigid neural radiance fields: Reconstruction and novel view synthesis
ofadynamicscenefrommonocularvideo. InIEEEInternationalConferenceonComputerVi-
sion(ICCV).IEEE,2021. 2,8
11

BinWang, LonghuaWu, KangKangYin, UriMAscher, LibinLiu, andHuiHuang. Deformation
| captureandmodelingofsoftobjects. |     | ACMTrans.Graph.,34(4):94–1,2015. |     |     |     | 2   |     |
| -------------------------------- | --- | -------------------------------- | --- | --- | --- | --- | --- |
Yiheng Xie, Towaki Takikawa, Shunsuke Saito, Or Litany, Shiqin Yan, Numair Khan, Federico
Tombari,JamesTompkin,VincentSitzmann,andSrinathSridhar. Neuralfieldsinvisualcomput-
ComputerGraphicsForum,2022.
| ingandbeyond. |     |     | ISSN1467-8659. |     | doi: | 10.1111/cgf.14505. | 1,  |
| ------------- | --- | --- | -------------- | --- | ---- | ------------------ | --- |
2
ZhenjiaXu,JiajunWu,AndyZeng,JoshuaBTenenbaum,andShuranSong. Densephysnet: Learn-
ing dense physical object representations via multi-step dynamic interactions. arXiv preprint
| arXiv:1906.03853,2019. | 2,8 |     |     |     |     |     |     |
| ---------------------- | --- | --- | --- | --- | --- | --- | --- |
YonghaoYue,BreannanSmith,ChristopherBatty,ChangxiZheng,andEitanGrinspun. Continuum
foam:Amaterialpointmethodforshear-dependentflows.ACMTransactionsonGraphics(TOG),
| 34(5):1–20,2015. | 3,13 |     |     |     |     |     |     |
| ---------------- | ---- | --- | --- | --- | --- | --- | --- |
A APPENDIX
A.1 PHYSICALMODELS
MPMsupportsallkindsofconstitutivemodelsandplasticitymodels. Incontinuumphysicsframe-
work,theinternalforceisprovidedbyCauchystressT,atensorfielddefinedbydeformationgradi-
entF. ThedeformationgradientistrackedonMPMparticlestomeasuretheirdistortioncompared
toitsinitialstate. Forplasticity,thedeformationgradientisconstrainedwithinanelasticregion. A
returnmappingZ isappliedtopulldeformationgradientbackontotheyieldsurface.
Elasticity We use neo-Hookean elasticity to model elastic objects. The Cauchy stress for this
modelisdefinedby
|     | JT(F)=µ(FF(cid:62))+(λlog(J)−µ)I, |     |     |     |     |     | (8) |
| --- | --------------------------------- | --- | --- | --- | --- | --- | --- |
whereJ = det(F). µ,λareLameparameters,relatedtoYoung’smodulus(E)andPoisson’sratio
(ν)by
|     |     | E      |             | νE  |     |     |     |
| --- | --- | ------ | ----------- | --- | --- | --- | --- |
|     | µ=  | , λ=   |             |     | .   |     | (9) |
|     |     | 2(1+λ) | (1+ν)(1−2ν) |     |     |     |     |
NewtonianFluid WeuseJ-basedfluidcombinedwithviscositytermtomodelNewtonianfluid.
Thestressforthismodelisdefinedby
|     |     | 1   |     | 1   |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- |
µ(∇v+∇v(cid:62))+κ(J
|     | JT(F)= |     |     | −   | ).  |     | (10) |
| --- | ------ | --- | --- | --- | --- | --- | ---- |
|     |        | 2   |     | J6  |     |     |      |
Plasticine Tosimulateplasticine,weuseSt.Venant-Kirchhoff(StVK)constitutivemodelcombine
withvon-Misesplasticreturnmapping. Thestressassociatedwiththemodelisdefinedby
|     | JT(F)=U(2µ(cid:15)+λTr((cid:15)))U(cid:62), |     |     |     |     |     | (11) |
| --- | ------------------------------------------- | --- | --- | --- | --- | --- | ---- |
withF=UΣVbeingtheSVDdecompositionofFand(cid:15)=log(Σ)beingtheHenckystrain.
Thevon-Misesyieldingconditionis
τ Y
|     |     | δγ =(cid:107)(cid:15)ˆ(cid:107)− | >0, |     |     |     | (12) |
| --- | --- | -------------------------------- | --- | --- | --- | --- | ---- |
2µ
where (cid:15)ˆis the normalized Hencky strain. τ is the yield stress, which is the parameter for this
Y
model. δγ > 0 means the deformation gradient is outside the elastic region. The deformation
gradientwillbeprojectedbackontotheboundaryofelasticregion(yieldsurface)bythefollowing
returnmapping:
(cid:40)
|     |       | F                |                      | δγ ≤0     |     |     |      |
| --- | ----- | ---------------- | -------------------- | --------- | --- | --- | ---- |
|     | Z(F)= |                  |                      |           | .   |     | (13) |
|     |       | Uexp((cid:15)−δγ | (cid:15)ˆ )V(cid:62) | otherwise |     |     |      |
(cid:107)(cid:15)ˆ(cid:107)
12

Non-Newtonian Fluid Non-Newtonian fluid also has a yield stress. We use viscoplastic model
(Yue et al., 2015) to model non-Newtonian fluid. We still use von-Mises criteria to define elastic
region. However,theexistenceofviscoplasticmeansthedeformationwillnotbedirectlyprojected
| backontotheyieldsurface. |     | Define |     |     |     |     |     |     |
| ------------------------ | --- | ------ | --- | --- | --- | --- | --- | --- |
µ
Tr(Σ2)
µˆ =
d
s=2µ(cid:15)ˆ
(14)
δγ
sˆ=(cid:107)s(cid:107)−
η
1+
2µˆ∆t
(cid:40)
|     |       |     | F     |               |                          | δγ        | ≤0  |      |
| --- | ----- | --- | ----- | ------------- | ------------------------ | --------- | --- | ---- |
|     | Z(F)= |     |       |               |                          |           | .   | (15) |
|     |       |     | Uexp( | sˆ (cid:15)ˆ+ | 1Tr((cid:15))1)V(cid:62) | otherwise |     |      |
|     |       |     |       | 2µ            | d                        |           |     |      |
Sand Drucker-Prageryieldcriteriaisusedtosimulategranularmaterials(Kla´retal.,2016). The
underlyingconstitutivemodelisstillStVK.Theyieldingcriteriaisdefinedby
(dλ+2µ)tr((cid:15))
|     | tr((cid:15))>0, |     | or  | δγ =(cid:107)(cid:15)ˆ(cid:107) | F +α |     | >0. | (16) |
| --- | --------------- | --- | --- | ------------------------------- | ---- | --- | --- | ---- |
2µ
(cid:113)
whereα = 2 2sinθfric andθ isthefrictionangle. Weusethefollowingreturnmappingin
fric
33−sinθfric
sandsimulations:

|     |       |                  | UV(cid:62) |     | tr((cid:15))>0                 |                    |     |      |
| --- | ----- | ------------------ | ---------- | --- | ------------------------------ | ------------------ | --- | ---- |
|     |       |                    | F          |     | δγ                             | ≤0,tr((cid:15))≤0. |     |      |
|     | Z(F)= |                    |            |     |                                |                    |     | (17) |
|     |       | Uexp((cid:15)−δγ |            |     | (cid:15)ˆ )V(cid:62) otherwise |                    |     |      |
(cid:107)(cid:15)ˆ(cid:107)
| B COMPLEX | BOUNDARY |     | CONDITIONS |     |     |     |     |     |
| --------- | -------- | --- | ---------- | --- | --- | --- | --- | --- |
Pre-knownboundaryconditionsaretriviallytobeaddedinMPMsimulations,justliketheground.
Here we shown examples of elastic rope falling onto two rigid cylinders in Figure 6. The initial
guess,optimizedvaluesandthegroundtruthvaluesofphysicalparametersarelistedinTable3.
Figure6: Examplesofelasticropesfallingontocylinders. Thetoprowisthegroundtruthvideo. PAC-NeRF
istrainedonthesegmenteddata,whoserenderingoutputsarevisualizedinthemiddlerow.Thebottomrowis
thereconstructedMPMparticles.
|     |     |             | InitialGuess |     | Optimized         |     | GroundTruth |     |
| --- | --- | ----------- | ------------ | --- | ----------------- | --- | ----------- | --- |
|     |     | E=103,ν=0.4 |              |     | E=1.12×105,ν=0.22 |     | E=105,ν=0.3 |     |
Rope(Short)
|     | Rope(Long) | E=104,ν=0.4 |     |     | E=1.09×106,ν=0.31 |     | E=106,ν=0.3 |     |
| --- | ---------- | ----------- | --- | --- | ----------------- | --- | ----------- | --- |
Table3:Quantitativeresultsofelasticropeexample.
| C RECONSTRUCTION |     | QUALITY |     | COMPARISON |     |     | D-NERF |     |
| ---------------- | --- | ------- | --- | ---------- | --- | --- | ------ | --- |
WITH
When evaluating the D-NeRF+Diffsim baseline, we observe that D-NeRF is sensitive to sudden,
large deformations (see Figure 7). As the simulation progresses, D-NeRF suffers from artificial
13

D-NeRF PAC-NeRF
Figure7:D-NeRFsuffersfrommajorartifactsastheobjectundergoessuddenlargedeformations.Noticehow
theobjectbecomespartiallyabsentinthemiddletwoframes.
extreme deformation, resulting in the object breaking apart. This degrades the simulation to the
extentthatpartsoftheobjectevenpartiallydisappear(violatingphysicalplausibility). Thisartifact
is due to the learned backward deformation map points to an empty area in the canonical space,
resulting in zero volume density. By contrast, our PAC-NeRF constrains forward deformations to
followthephysicalconservationlawanddoesnotexperiencethiskindofunphysicalresult.
D QUALITATIVE COMPARISON WITH ∇SIM ON REAL-WORLD DATA
We also tried ∇Sim on our real-world data. The qualitative comparison between PAC-NeRF and
∇SimisshowninFigure8. Aswedointhebaselinecomparisons,weextractasurfacemeshfrom
our reconstructed point cloud from voxel NeRF and then generate a tetrahedral mesh, manually
pick an optimal camera and set an approximate rendering configuration. As we discussed in our
baselinecomparison,explicitFEMusedin∇Simsuffersfromtinytimesteps,leadingtosignificant
numerical errors in backpropagations. Combining with errors from the geometry reconstructions
andtheapproximaterenderingconfigurations,allthesefactorscontributetothefailureof∇Sim.
Figure8:Qualitativecomparisonwith∇Simonreal-worlddata.
14
