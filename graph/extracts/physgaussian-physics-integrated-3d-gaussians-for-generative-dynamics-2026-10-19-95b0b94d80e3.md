PhysGaussian: Physics-Integrated 3D Gaussians for Generative Dynamics
|     |     |     | TianyiXie1∗ |              | ZeshunZong1∗         |          | YuxingQiu1∗     |     | XuanLi1∗ |     |     |     |     |
| --- | --- | --- | ----------- | ------------ | -------------------- | -------- | --------------- | --- | -------- | --- | --- | --- | --- |
|     |     |     |             | YutaoFeng2,3 |                      | YinYang3 | ChenfanfuJiang1 |     |          |     |     |     |     |
|     |     |     | 1           | UCLA,2       | ZhejiangUniversity,3 |          |                 |     |          |     |     |     |     |
UniversityofUtah
4202 rpA 51  ]RG.sc[  3v89121.1132:viXra
WhatYouSee
|     |     |     |     |     |     |     |     |     |     | t   |     | WhatYouSimulate |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --------------- | --- |
Figure1.PhysGaussianisaunifiedsimulation-renderingpipelinebasedon3DGaussiansandcontinuummechanics.
|     |     |     | Abstract |     |     |     | 1.Introduction |         |           |          |        |         |      |
| --- | --- | --- | -------- | --- | --- | --- | -------------- | ------- | --------- | -------- | ------ | ------- | ---- |
|     |     |     |          |     |     |     | Recent         | strides | in Neural | Radiance | Fields | (NeRFs) | have |
WeintroducePhysGaussian,anewmethodthatseamlessly
|     |     |     |     |     |     |     | showcased | significant |     | advancements | in  | 3D graphics | and |
| --- | --- | --- | --- | --- | --- | --- | --------- | ----------- | --- | ------------ | --- | ----------- | --- |
integratesphysicallygroundedNewtoniandynamicswithin vision [24]. Such gains have been further augmented by
3DGaussianstoachievehigh-qualitynovelmotionsynthe-
|     |     |     |     |     |     |     | the cutting-edge |     | 3D  | Gaussian | Splatting | (GS) framework |     |
| --- | --- | --- | --- | --- | --- | --- | ---------------- | --- | --- | -------- | --------- | -------------- | --- |
sis. Employing a custom Material Point Method (MPM), [16]. Despite many achievements, a noticeable gap re-
ourapproachenriches3DGaussiankernelswithphysically mains in the application towards generating novel dynam-
| meaningful | kinematic | deformation |     | and | mechanical | stress |     |     |     |     |     |     |     |
| ---------- | --------- | ----------- | --- | --- | ---------- | ------ | --- | --- | --- | --- | --- | --- | --- |
ics. Whilethereexistendeavorsthatgeneratenewposesfor
attributes, all evolved in line with continuum mechanics NeRFs, they typically cater to quasi-static geometry shape
principles. A defining characteristic of our method is the editing tasks and often require meshing or embedding vi-
| seamless                                          | integration | between              | physical |     | simulation  | and vi-  |                |     |                                          |       |        |         |            |
| ------------------------------------------------- | ----------- | -------------------- | -------- | --- | ----------- | -------- | -------------- | --- | ---------------------------------------- | ----- | ------ | ------- | ---------- |
|                                                   |             |                      |          |     |             |          | sual geometry  |     | in coarse                                | proxy | meshes | such as | tetrahedra |
| sualrendering:bothcomponentsutilizethesame3DGaus- |             |                      |          |     |             |          | [12,28,47,51]. |     |                                          |       |        |         |            |
| siankernelsastheirdiscreterepresentations.        |             |                      |          |     | Thisnegates |          |                |     |                                          |       |        |         |            |
|                                                   |             |                      |          |     |             |          | Meanwhile,     |     | thetraditionalphysics-basedvisualcontent |       |        |         |            |
| the necessity                                     | for         | triangle/tetrahedron |          |     | meshing,    | marching |                |     |                                          |       |        |         |            |
generationpipelinehasbeenatediousmulti-stageprocess:
| cubes, “cage | meshes,” |     | or any | other geometry | embedding, |     |     |     |     |     |     |     |     |
| ------------ | -------- | --- | ------ | -------------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
constructingthegeometry,makingitsimulation-ready(of-
highlightingtheprincipleof“whatyouseeiswhatyousim-
|               |     |        |              |     |             |      | ten through | techniques |     | like tetrahedralization), |     | simulating |          |
| ------------- | --- | ------ | ------------ | --- | ----------- | ---- | ----------- | ---------- | --- | ------------------------- | --- | ---------- | -------- |
| ulate (WS2).” | Our | method | demonstrates |     | exceptional | ver- |             |            |     |                           |     |            |          |
|               |     |        |              |     |             |      | it with     | physics,   | and | finally rendering         | the | scene.     | This se- |
satilityacrossawidevarietyofmaterials–includingelastic
quence,whileeffective,introducesintermediarystagesthat
entities,plasticmetals,non-Newtonianfluids,andgranular
|     |     |     |     |     |     |     | can lead | to discrepancies |     | between | simulation | and | final vi- |
| --- | --- | --- | --- | --- | --- | --- | -------- | ---------------- | --- | ------- | ---------- | --- | --------- |
materials–showcasingitsstrongcapabilitiesincreatingdi-
|     |     |     |     |     |     |     | sualization. | Even | within | the | NeRF paradigm, |     | a similar |
| --- | --- | --- | --- | --- | --- | --- | ------------ | ---- | ------ | --- | -------------- | --- | --------- |
versevisualcontentwithnovelviewpointsandmovements.
|     |     |     |     |     |     |     | trend is | observed, | as  | the rendering | geometry | is  | embedded |
| --- | --- | --- | --- | --- | --- | --- | -------- | --------- | --- | ------------- | -------- | --- | -------- |
Ourprojectpageisat:https://xpandora.github.
|     |     |     |     |     |     |     | intoasimulationgeometry. |     |     | Thisdivision,inessence,con- |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------ | --- | --- | --------------------------- | --- | --- | --- |
io/PhysGaussian/.
|     |     |     |     |     |     |     | trasts with | the        | natural     | world, where | the                    | physical      | behavior |
| --- | --- | --- | --- | --- | --- | --- | ----------- | ---------- | ----------- | ------------ | ---------------------- | ------------- | -------- |
|     |     |     |     |     |     |     | and visual  | appearance |             | of materials | are                    | intrinsically | inter-   |
|     |     |     |     |     |     |     | twined.     | Our        | overarching | philosophy   | seeks                  | to align      | these    |
|     |     |     |     |     |     |     | two facets  | by         | advocating  | for a        | unified representation |               | of a     |
*indicatesequalcontributions. material substance, employed for both simulation and ren-
1

dering.Inessence,ourapproachchampionstheprincipleof lized in image generation through volume rendering tech-
“whatyouseeiswhatyousimulate”(WS2)[25],aimingfor niques. Building upon the achievements of NeRF, further
a more coherent integration of simulation, capturing, and studies have focused on enhancing reconstruction quality
rendering. andimprovingtrainingspeeds[1,7,20,26,40,46]. Onthe
Buildingtowardsthisgoal,weintroducePhysGaussian: otherhand,researchershavealsoinvestigateddifferentiable
physics-integrated 3D Gaussians for generative dynamics. point-basedmethodsforreal-timerenderingofunbounded
This novel approach empowers 3D Gaussians to encapsu- scenes. Amongthecurrentinvestigations, thestate-of-the-
latephysicallysoundNewtoniandynamics,includingreal- artresultsareachievedbytherecentlypublished3DGaus-
istic behaviors and inertia effects inherent in solid materi- sian Splatting framework [16]. Contrary to prior implicit
als. More specifically, we impart physics to 3D Gaussian neuralrepresentations,GSemploysanexplicitandunstruc-
kernels, endowing them with kinematic attributes such as tured representation of one scene, offering the advantage
velocity and strain, along with mechanical properties like of straightforward extension to post-manipulation. More-
elasticenergy,stress,andplasticity. Notably,throughcon- over, its fast visibility-aware rendering algorithm also en-
tinuum mechanics principles and a custom Material Point ablesreal-worlddynamicsgenerations.
| Method | (MPM), | PhysGaussian |     | ensures | that | both physical |     |     |     |     |     |     |     |
| ------ | ------ | ------------ | --- | ------- | ---- | ------------- | --- | --- | --- | --- | --- | --- | --- |
simulation and visual rendering are driven by 3D Gaus- DynamicNeuralRadianceField. Aninherentevolution
| sians. This | eradicates |             | the necessity |               | for any | embedding     |             |           |     |             |             |     |           |
| ----------- | ---------- | ----------- | ------------- | ------------- | ------- | ------------- | ----------- | --------- | --- | ----------- | ----------- | --- | --------- |
|             |            |             |               |               |         |               | of the NeRF | framework |     | entails the | integration |     | of a tem- |
| mechanisms, | thus       | eliminating |               | any disparity |         | or resolution |             |           |     |             |             |     |           |
poraldimensiontofacilitatetherepresentationofdynamic
mismatchbetweenthesimulatedandtherendered.
|            |                |     |     |           |           |         | scenes.     | For example, |     | both Pumarola  | et  | al. [30] | and Park    |
| ---------- | -------------- | --- | --- | --------- | --------- | ------- | ----------- | ------------ | --- | -------------- | --- | -------- | ----------- |
| We present | PhysGaussian’s |     |     | versatile | adeptness | in syn- |             |              |     |                |     |          |             |
|            |                |     |     |           |           |         | et al. [27] | decompose    |     | time-dependent |     | neural   | fields into |
thesizing generative dynamics across various materials, an inverse displacement field and canonical time-invariant
suchaselasticobjects,metals,non-Newtonianviscoplastic
|              |                                     |         |       |              |         |             | neural fields. |         | In this context, | the            | trajectory | of         | query rays |
| ------------ | ----------------------------------- | ------- | ----- | ------------ | ------- | ----------- | -------------- | ------- | ---------------- | -------------- | ---------- | ---------- | ---------- |
| substances   | (e.g.                               | foam or | gel), | and granular | mediums | (e.g.       |                |         |                  |                |            |            |            |
|              |                                     |         |       |              |         |             | is altered     | by the  | inverse          | displacement   | field      | and        | then po-   |
| sandorsoil). | Tosummarize,ourcontributionsinclude |         |       |              |         |             |                |         |                  |                |            |            |            |
|              |                                     |         |       |              |         |             | sitioned       | within  | the canonical    | space.         |            | Subsequent | stud-      |
| • Continuum  | Mechanics                           |         | for   | 3D Gaussian  |         | Kinematics: |                |         |                  |                |            |            |            |
|              |                                     |         |       |              |         |             | ies have       | adhered | to the           | aforementioned |            | design     | when ex-   |
Weintroduceacontinuummechanics-basedstrategytai- ploring applications related to NeRF deformations, such
loredforevolving3DGaussiankernelsandtheirassoci-
|                |     |           |     |          |         |              | as static | scene | editing | and dynamic | scene | reconstruction |     |
| -------------- | --- | --------- | --- | -------- | ------- | ------------ | --------- | ----- | ------- | ----------- | ----- | -------------- | --- |
| ated spherical |     | harmonics | in  | physical | Partial | Differential |           |       |         |             |       |                |     |
[5,19,21,28,31,32,51].Additionally,Liuetal.[21],Qiao
Equation(PDE)-drivendisplacementfields.
etal.[31],Yuanetal.[51]havecontributedtotheincorpo-
| • UnifiedSimulation-RenderingPipeline: |     |     |     |     | Wepresentan |     |     |     |     |     |     |     |     |
| -------------------------------------- | --- | --- | --- | --- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- |
rationofphysics-baseddeformationsintotheNeRFframe-
efficientsimulationandrenderingpipelinewithaunified work. However, the effectiveness of these methodologies
| 3DGaussianrepresentation. |     |     |     | Eliminatingtheextraeffort |     |     |     |     |     |     |     |     |     |
| ------------------------- | --- | --- | --- | ------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
reliesontheusageofexportedmeshesderivedfromNeRFs.
forexplicitobjectmeshing,themotiongenerationprocess
Tocircumventthisrestriction,explicitgeometricrepresen-
issignificantlysimplified. tations have beenexplored for forward displacement mod-
| • Versatile | Benchmarking |     | and | Experiments: |     | We con- |            |      |                |      |        |             |        |
| ----------- | ------------ | --- | --- | ------------ | --- | ------- | ---------- | ---- | -------------- | ---- | ------ | ----------- | ------ |
|             |              |     |     |              |     |         | eling [16, | 46]. | In particular, | Chen | et al. | [6], Luiten | et al. |
duct a comprehensive suite of benchmarks and experi- [22],Wuetal.[45],Yangetal.[48,49]directlymanipulate
| ments | across | various | materials. | Enhanced |     | by real-time |             |                                         |     |     |     |     |     |
| ----- | ------ | ------- | ---------- | -------- | --- | ------------ | ----------- | --------------------------------------- | --- | --- | --- | --- | --- |
|       |        |         |            |          |     |              | NeRFfields. | Lietal.[18]extendsthisapproachbyinclud- |     |     |     |     |     |
GSrenderingandefficientMPMsimulations,weachieve
ingphysicalsimulatorstoachievemoredynamicbehaviors.
real-timeperformanceforsceneswithsimpledynamics. In this study, we leverage the explicit 3D Gaussian Splat-
|     |     |     |     |     |     |     | ting ellipsoids |     | as a unified | representation |     | for both | physics |
| --- | --- | --- | --- | --- | --- | --- | --------------- | --- | ------------ | -------------- | --- | -------- | ------- |
2.RelatedWork
|     |     |     |     |     |     |     | and graphics. |     | In contrast | to previous | dynamic |     | GS frame- |
| --- | --- | --- | --- | --- | --- | --- | ------------- | --- | ----------- | ----------- | ------- | --- | --------- |
Radiance Fields Rendering for View Synthesis. Radi- works,whicheithermaintaintheshapesofGaussiankernels
|     |     |     |     |     |     |     | or learn | to modify | them, | our approach | uniquely |     | leverages |
| --- | --- | --- | --- | --- | --- | --- | -------- | --------- | ----- | ------------ | -------- | --- | --------- |
ancefieldmethodshavegainedconsiderableinterestinre-
thefirst-orderinformationfromthedisplacementmap(de-
| cent years | due    | to their | extraordinary |           | ability | to generate  |           |           |     |                |              |     |         |
| ---------- | ------ | -------- | ------------- | --------- | ------- | ------------ | --------- | --------- | --- | -------------- | ------------ | --- | ------- |
|            |        |          |               |           |         |              | formation | gradient) | to  | assist dynamic | simulations. |     | In this |
| novel-view | scenes | and      | their great   | potential |         | in 3D recon- |           |           |     |                |              |     |         |
way,weareabletodeformtheGaussiankernelsandseam-
| struction. | The | adoption | of deep | learning | techniques | has |     |     |     |     |     |     |     |
| ---------- | --- | -------- | ------- | -------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
led to the prominence of neural rendering and point-based lesslyintegratethesimulationwithintheGSframework.
| rendering | methods, | both | of which | have | inspired | a multi- |     |     |     |     |     |     |     |
| --------- | -------- | ---- | -------- | ---- | -------- | -------- | --- | --- | --- | --- | --- | --- | --- |
tude of subsequent works. On the one hand, the NeRF Material Point Method. The Material Point Method
framework employs a fully-connected network to model (MPM)isawidelyusedsimulationframeworkforabroad
one scene [24]. The network takes spatial position and rangeofmulti-physicsphenomena[10]. Theinherentcapa-
viewing direction as inputs and produces the volume den- bilityoftheMPMsystemallowsfortopologychangesand
sityandradiancecolor. Theseoutputsaresubsequentlyuti- frictionalinteractions,makingitsuitableforsimulatingvar-
2

Input Images Optimization Gaussian Ellipsoids Physics Integration Physics-grounded
+ Camera Info as Continuum Novel Motion
Kinematics
3D Gaussian
Splatting Gaussian Evolution
Harmonics Transform
Anisotropic
Loss Term
Dynamics
Continuum Mechanics
Time Integration
3D Gaussian
Kernel Filling
Optional Step
Multiple-Viewpoint Renderer
Figure2.MethodOverview.PhysGaussian isaunifiedsimulation-renderingpipelinethatincorporates3DGaussiansplattingrepresenta-
tionandcontinuummechanicstogeneratephysics-baseddynamicsandphoto-realisticrenderingssimultaneouslyandseamlessly.
ious materials, including but not limited to elastic objects, ofeachpixeliscomputedas
fluids, sand, and snow [13, 17, 39]. MPM can also be ex-
k−1
pandedtosimulateobjectsthatpossesscodimensionalchar- (cid:88) (cid:89)
C = α SH(d ;C ) (1−α ). (1)
k k k j
acteristics[15].Inaddition,theefficacyofutilizingGPU(s)
k∈P j=1
toaccelerateMPMimplementationshasalsobeendemon-
stratedin[8,11,33,44]. Owingtoitswell-documentedad-
Hereα
k
representsthez-depthorderedeffectiveopacities,
vantages, we employ the MPM to support the latent phys- i.e., products of the 2D Gaussian weights and their over-
ical dynamics. This choice allows us to efficiently import all opacities σ k ; d k stands for the view direction from the
dynamicsintovariousscenarioswithasharedparticlerep- camera to x k . Per-view optimizations are performed us-
resentationalongsidetheGaussianSplattingframework. ing L 1 loss and SSIM loss. This explicit representation of
thescenenotonlysignificantlyacceleratestrainingandren-
dering speeds, but also enables direct manipulation of the
3.MethodOverview NeRF scene. The data-driven dynamics are supported by
making x ,A time-dependent [45] and minimizing ren-
p p
We propose PhysGaussian (Fig. 2), a unified simulation- dering losses over videos. In Sec. 3.1, we show that this
renderingframeworkforgenerativedynamicsbasedoncon- time-dependent evolution can be given by the continuum
tinuum mechanics and 3D GS. Adopted from Kerbl et al. deformationmap.
[16], we first reconstruct a GS representation of a static
3.2.ContinuumMechanics
scene, with an optional anisotropic loss term to regularize
over-skinnykernels.TheseGaussiansareviewedasthedis- Continuum mechanics describes motions by a time-
cretization of the scene to be simulated. Under our novel dependent continuous deformation map x = ϕ(X,t)
kinematics, we directly splat the deformed Gaussians for between the undeformed material space Ω0 and the de-
photo-realistic renderings. For better physics compliance, formedworldspaceΩt attimet. Thedeformationgradient
we also optionally fill the internal regions of objects. We F(X,t) = ∇ X ϕ(X,t) encodes local transformations in-
detailtheseinthissection. cludingstretch,rotation,andshear[2]. Theevolutionofthe
deformationϕisgovernedbytheconservationofmassand
momentum. Conservation of mass ensures that the mass
3.1.3DGaussianSplatting within any infinitesimal region B0 ∈ Ω0 remains constant
ϵ
overtime:
3D Gaussian Splatting method [16] reparameterizes NeRF
(cid:90) (cid:90)
[24] using a set of unstructured 3D Gaussian kernels ρ(x,t)≡ ρ(ϕ−1(x,t),0), (2)
{x p ,σ p ,A p ,C p } p∈P , where x p , σ p , A p , and C p represent B ϵ t B ϵ 0
the centers, opacities, covariance matrices, and spherical
whereBt = ϕ(B0,t)andρ(x,t)isthedensityfieldchar-
harmonic coefficients of the Gaussians, respectively. To ϵ ϵ
acterizingmaterialdistribution. Denotingthevelocityfield
renderaview,GSprojectsthese3DGaussiansontotheim-
withv(x,t),theconservationofmomentumisgivenby
ageplaneas2DGaussians,differingfromtraditionalNeRF
techniquesthatemitraysfromthecamera. Thefinalcolor ρ(x,t)v˙(x,t)=∇·σ(x,t)+fext, (3)
3

∂Ψ(FE)FET
where σ = 1 is the Cauchy stress ten- is not necessarily Gaussian in the world space, which vio-
det(F)∂F
|     |     |     |     |     |     |     |     | latestherequirementsofthesplattingprocess. |     |     |     |     |     | Fortunately, |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------------ | --- | --- | --- | --- | --- | ------------ | --- |
sorassociatedwithahyperelasticenergydensityΨ(F),and
fext istheexternalforceperunitvolume[2,14]. Herethe ifweassumeparticlesundergolocalaffinetransformations
totaldeformationgradientcanbedecomposedintoanelas- characterizedbythefirst-orderapproximation
| ticpartandaplasticpartF |     |     |     | =FEFP | tosupportpermanent |     |     |     |     |            |     |     |      |     |     |
| ----------------------- | --- | --- | --- | ----- | ------------------ | --- | --- | --- | --- | ---------- | --- | --- | ---- | --- | --- |
|                         |     |     |     |       |                    |     |     |     |     | ϕ˜ (X,t)=x |     | +F  | (X−X | ),  | (6) |
rest shape changes caused by plasticity. The evolution of p p p p
FE
followssomespecificplasticflowsuchthatitisalways
thedeformedkernelbecomesGaussianasdesired:
constrainedwithinapredefinedelasticregion[2].
|                         |     |     |     |     |     |     |     |      |                | (x,t)=e− | 1(x−xp)T(FpApF |     | T)−1(x−xp). |     |     |
| ----------------------- | --- | --- | --- | --- | --- | --- | --- | ---- | -------------- | -------- | -------------- | --- | ----------- | --- | --- |
|                         |     |     |     |     |     |     |     |      | G              |          | 2              |     | p           |     | (7) |
| 3.3.MaterialPointMethod |     |     |     |     |     |     |     |      | p              |          |                |     |             |     |     |
|                         |     |     |     |     |     |     |     | This | transformation |          | naturally      |     |             |     |     |
MaterialPointMethod(MPM)solvestheabovegoverning
|           |     |              |     |               |      |                 |     | provides |     | a time-dependent |       |     |     |     |     |
| --------- | --- | ------------ | --- | ------------- | ---- | --------------- | --- | -------- | --- | ---------------- | ----- | --- | --- | --- | --- |
| equations |     | by combining |     | the strengths | of   | both Lagrangian |     |          |     |                  |       |     |     |     |     |
|           |     |              |     |               |      |                 |     | version  | of  | x and            | A for | the |     |     |     |
| particles |     | and Eulerian |     | grids [14,    | 39]. | The continuum   | is  |          |     | p                | p     |     |     |     |     |
3DGSframework:
| discretized           |     | by a | collection | of particles,                   |     | each representing |     |     |           |        |     |     |     |     |     |
| --------------------- | --- | ---- | ---------- | ------------------------------- | --- | ----------------- | --- | --- | --------- | ------ | --- | --- | --- | --- | --- |
| asmallmaterialregion. |     |      |            | Theseparticlestrackseveraltime- |     |                   |     | x   | p (t)=ϕ(X | p ,t), |     |     |     |     |     |
(8)
| varying | Lagrangian |     | quantities | such | as position | x   | , veloc- |     |       |      |         |     |     |     |     |
| ------- | ---------- | --- | ---------- | ---- | ----------- | --- | -------- | --- | ----- | ---- | ------- | --- | --- | --- | --- |
|         |            |     |            |      |             | p   |          | a   | (t)=F | (t)A | F (t)T. |     |     |     |     |
ity v , and deformation gradient F . The mass conserva- p p p p
|     | p   |     |     |     | p   |     |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
tion in Lagrangian particles ensures the constancy of total In summary, given the 3D GS of a static scene
massduringmovement. Conversely,momentumconserva- {X ,A ,σ ,C },weusesimulationtodynamizethescene
|     |     |     |     |     |     |     |     |     | p p | p p |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
byevolvingtheseGaussianstoproducedynamicGaussians
tionismorenaturalinEulerianrepresentation,whichavoids
mesh construction. We follow Stomakhin et al. [39] to in- {x (t),a (t),σ ,C }.Hereweassumethattheopacityand
|     |     |     |     |     |     |     |     |     | p p | p   | p   |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
tegratetheserepresentationsusingC1 continuousB-spline the coefficients of spherical harmonics are invariant over
kernelsfortwo-waytransfer.Fromtimesteptntotn+1,the time, but the harmonics will be rotated as discussed in the
momentum conservation, discretized by the forward Euler nextsection. Wealsoinitializeotherphysicalquantitiesin
|                        |     |     |     |     |     |     |     | Eq.(4):  | therepresentingvolumeofeachparticleV0 |            |      |        |         |        | isini- |
| ---------------------- | --- | --- | --- | --- | --- | --- | --- | -------- | ------------------------------------- | ---------- | ---- | ------ | ------- | ------ | ------ |
| scheme,isrepresentedas |     |     |     |     |     |     |     |          |                                       |            |      |        |         | p      |        |
|                        |     |     |     |     |     |     |     | tialized | as                                    | background | cell | volume | divided | by the | number |
m i(v n+1−v n)=−(cid:80) V 0 ∂ Ψ(F E,n)F E,nT∇w n +f ext. (4) of contained particles; the mass m is then inferred from
|     | ∆t i | i   |     | p p ∂ F | p p | i p i |     |                |     |         |      |     | p      |        |       |
| --- | ---- | --- | --- | ------- | --- | ----- | --- | -------------- | --- | ------- | ---- | --- | ------ | ------ | ----- |
|     |      |     |     |         |     |       |     |                |     |         | ρ    | m = | ρ V0.  |        |       |
|     |      |     |     |         |     |       |     | user-specified |     | density | p as | p   | p p To | render | these |
Here i and p represent the fields on the Eulerian grid and deformed Gaussian kernels, we use the splatting from the
the Lagrangian particles respectively; wn is the B-spline original GS framework [16]. It should be highlighted that
ip
kernel defined on i-th grid evaluated at xn; V0 is the the integration of physics into 3D Gaussians is seamless:
|     |     |     |     |     |     | p p |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
initial representing volume, and ∆t is the time step size. on the one hand, the Gaussians themselves are viewed as
|     |         |      |          |       | vn+1 |             |      | thediscretizationofthecontinuum,whichcanbesimulated |     |     |     |     |     |     |     |
| --- | ------- | ---- | -------- | ----- | ---- | ----------- | ---- | --------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
| The | updated | grid | velocity | field | is   | transferred | back |                                                     |     |     |     |     |     |     |     |
i
onto particle to vn+1, updating the particles’ positions to directly;ontheotherhand,thedeformedGaussianscanbe
p
xn+1 xn ∆tvn+1. FE directly rendered by the splatting procedure, avoiding the
|     | =   | +   |     | We  | track | rather than | both |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | ----- | ----------- | ---- | --- | --- | --- | --- | --- | --- | --- | --- |
|     | p   | p   | p   |     |       |             |      |     |     |     |     |     |     |     |     |
F and FP [37], which is updated by FE,n+1 = (I + need for commercial rendering software in traditional ani-
p
(cid:80) mationpipelines. Mostimportantly, wecandirectlysimu-
| ∆t∇v | )FE,n | =   | (I +∆t | vn+1∇wnT)FE,n |     | andreg- |     |     |     |     |     |     |     |     |     |
| ---- | ----- | --- | ------ | ------------- | --- | ------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
p p i i ip p latescenesreconstructedfromrealdata,achievingWS2.
ularizedbyanadditionalreturnmappingtosupportplastic-
ityevolution: FE,n+1 ← Z(FE,n+1). Differentplasticity 3.5.EvolvingOrientationsofSphericalHarmonics
|        |        |           | p   | p                |     |          |        |     |     |     |     |     |     |     |     |
| ------ | ------ | --------- | --- | ---------------- | --- | -------- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| models | define | different |     | return mappings. |     | We refer | to the |     |     |     |     |     |     |     |     |
Renderingtheworld-space
| supplemental |     | document |     | for details | of the | simulation | algo- |     |           |     |         |         |      |              |     |
| ------------ | --- | -------- | --- | ----------- | ------ | ---------- | ----- | --- | --------- | --- | ------- | ------- | ---- | ------------ | --- |
|              |     |          |     |             |        |            |       | 3D  | Gaussians | can | already | Surface | View | Rotated View |     |
rithmanddifferentreturnmappings.
obtainhigh-qualityresults.
| 3.4.Physics-Integrated3DGaussians |       |          |         |             |          |        |     | However, |           | when       | the ob- |     |     |     |     |
| --------------------------------- | ----- | -------- | ------- | ----------- | -------- | ------ | --- | -------- | --------- | ---------- | ------- | --- | --- | --- | --- |
|                                   |       |          |         |             |          |        |     | ject     | undergoes | rotations, |         |     |     |     |     |
| We                                | treat | Gaussian | kernels | as discrete | particle | clouds | for |          |           |            |         |     |     |     |     |
thesphericalharmonicbasesarestillrepresentedinthema-
spatiallydiscretizingthesimulatedcontinuum. Asthecon- terial space, resulting in varying appearances even if the
tinuumdeforms,welettheGaussiankernelsdeformaswell.
|          |     |       |          |        |         |         |         | viewdirectionisfixedrelativelytotheobject. |     |                                           |     |     |     | Thesolution |     |
| -------- | --- | ----- | -------- | ------ | ------- | ------- | ------- | ------------------------------------------ | --- | ----------------------------------------- | --- | --- | --- | ----------- | --- |
| However, |     | for a | Gaussian | kernel | defined | at X in | the ma- |                                            |     |                                           |     |     |     |             |     |
|          |     |       |          |        |         | p       |         | issimple:                                  |     | whenanellipsoidisrotatedovertime,werotate |     |     |     |             |     |
terial space, G (X) = e−1 (X−Xp)TA− 1(X−Xp), the de- the orientations of its spherical harmonics as well. How-
|     |     | p   |     | 2   | p   |     |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
formedkernelunderthedeformationmapϕ(X,t), ever,thebasesarehard-codedinsidetheGSframework.We
equivalentlyachievethisevolutionbyapplyinginverserota-
|     | (x,t)=e−1 |     | (ϕ−1(x,t)−Xp)TA− |     | 1(ϕ−1(x,t)−Xp) |     |     |     |     |     |     |     |     |     |     |
| --- | --------- | --- | ---------------- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
G p 2 p (5) tiononviewdirections. Thiseffectisillustratedintheinset
4

figure. Weremarkthattherotationofviewdirectionsisnot along6axesandcheckingintersections(condition1). Rays
considered in Wu et al. [45]. Chen et al. [6] tackles this originatingfrominternalcellswillalwaysintersectwiththe
issue in the Point-NeRF framework, but requires tracking surface. To further refine our selection of candidate grids,
ofsurfaceorientation. Inourframework,thelocalrotation weemployanadditionalraytoassesstheintersectionnum-
isreadilyobtainedinthedeformationgradientF . Denote ber(condition2),thusensuringgreateraccuracy.
p
f0(d)asasphericalharmonicbasisinmaterialspace,with Visualization of these internal particles is also crucial
d being a point on the unit sphere (indicating view direc- as they may get exposed due to large deformation. Those
tion). The polar decomposition, F p = R p S p , leads us to filledparticlesinheritσ p ,C p fromtheirclosetGaussianker-
therotatedharmonicbasis: nels. Each particle’s covariance matrix is initialized as
|     |     |     |                |     |     |     |     | diag(r2,r2,r2), |            | where r | is the particle |                         | radius | calculated |
| --- | --- | --- | -------------- | --- | --- | --- | --- | --------------- | ---------- | ------- | --------------- | ----------------------- | ------ | ---------- |
|     |     |     |                |     |     |     |     |                 | p p p      |         |                 |                         |        |            |
|     |     |     | ft(d)=f0(RTd). |     |     |     | (9) |                 |            |         |                 |                         |        |            |
|     |     |     |                |     |     |     |     | fromit          | svo lum e: | r =(3V  | 0/4π)3          | 1. Alternatively,onemay |        |            |
|     |     |     |                |     |     |     |     |                 |            | p       | p               |                         |        |            |
alsoconsideremployinggenerativemodelsforinternalfill-
3.6.IncrementalEvolutionofGaussians
ing,potentiallyleadingtomorerealisticresults.
| We also | propose | an  | alternative | way | for | Gaussian | kinemat- |     |     |     |     |     |     |     |
| ------- | ------- | --- | ----------- | --- | --- | -------- | -------- | --- | --- | --- | --- | --- | --- | --- |
3.8.AnisotropyRegularizer
icsthatbetterfitstheupdatedLagrangianframework,which
| avoids | the dependency |     | on  | the total | deformation |     | gradient |     |     |     |     |     |     |     |
| ------ | -------------- | --- | --- | --------- | ----------- | --- | -------- | --- | --- | --- | --- | --- | --- | --- |
TheanisotropyofGaussiankernelsincreasestheefficiency
| F. This     | approach  |          | also paves  | the          | way                | for physical | mate-         |         |                |                |             |       |               |           |
| ----------- | --------- | -------- | ----------- | ------------ | ------------------ | ------------ | ------------- | ------- | -------------- | -------------- | ----------- | ----- | ------------- | --------- |
|             |           |          |             |              |                    |              |               | of 3D   | representation | while          | over-skinny |       | kernels       | may point |
| rial models |           | that do  | not rely    | on employing |                    | F            | as the strain |         |                |                |             |       |               |           |
|             |           |          |             |              |                    |              |               | outward | from the       | object surface | under       | large | deformations, |           |
| measure.    | Following |          | conventions |              | from computational |              | fluid         |         |                |                |             |       |               |           |
|             |           |          |             |              |                    |              |               | leading | to unexpected  | plush          | artifacts.  | We    | propose       | the fol-  |
| dynamics    | [4,       | 23], the | update      | rule         | for the            | world-space  | co-           |         |                |                |             |       |               |           |
lowingtraininglossduring3DGaussianreconstruction:
| variance               | matrix | a can | also | be derived     |     | by discretizing | the |     |     |     |     |     |     |     |
| ---------------------- | ------ | ----- | ---- | -------------- | --- | --------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| rateformofkinematicsa˙ |        |       |      | =(∇v)a+a(∇v)T: |     |                 |     |     |     |     |     |     |     |     |
1 (cid:88)
|     |     |        |        |     |        |     |      | L     | =   | max{max(S |     | )/min(S | ),r}−r, | (12) |
| --- | --- | ------ | ------ | --- | ------ | --- | ---- | ----- | --- | --------- | --- | ------- | ------- | ---- |
|     |     |        |        |     |        |     |      | aniso |     |           | p   |         | p       |      |
|     | an  | +1 =an |        |     | an +an | T). |      |       | |P| |           |     |         |         |      |
|     |     |        | +∆t(∇v |     |        | ∇v  | (10) |       |     | p∈P       |     |         |         |      |
|     | p   |        | i      | p   | p      | p p |      |       |     |           |     |         |         |      |
This formulation facilitates the incremental update of the whereS arethescalingsof3DGaussians[16]. Thisloss
p
|          |        |        |      |      |      | tn  | tn+1  | essentiallyconstrainsthattheratiobetweenthemajoraxis |     |     |     |     |     |     |
| -------- | ------ | ------ | ---- | ---- | ---- | --- | ----- | ---------------------------------------------------- | --- | --- | --- | --- | --- | --- |
| Gaussian | kernel | shapes | from | time | step | to  | with- |                                                      |     |     |     |     |     |     |
outtheneedtoobtainF . TherotationmatrixR ofeach lengthandminoraxislengthdoesnotexceedr.Ifdesired,
|     |     |     | p   |     |     |     | p   |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
spherical harmonics basis can be incrementally updated in thistermcanbeaddedtothetrainingloss.
R0
| a similar | manner. | Starting |     | from | =   | I, we | extract the |     |     |     |     |     |     |     |
| --------- | ------- | -------- | --- | ---- | --- | ----- | ----------- | --- | --- | --- | --- | --- | --- | --- |
p
| rotationmatrixRn+1 |     |     | from(I | +∆tv | )Rn | usingthepolar |     | 4.Experiments |     |     |     |     |     |     |
| ------------------ | --- | --- | ------ | ---- | --- | ------------- | --- | ------------- | --- | --- | --- | --- | --- | --- |
|                    |     | p   |        |      | p   | p             |     |               |     |     |     |     |     |     |
decomposition.
|     |     |     |     |     |     |     |     | In this | section, | we show | the versatility |     | of our | approach |
| --- | --- | --- | --- | --- | --- | --- | --- | ------- | -------- | ------- | --------------- | --- | ------ | -------- |
3.7.InternalFilling
|              |     |           |             |     |        |          |          | across      | a wide range | of materials. |        | We also         | evaluate | the ef-  |
| ------------ | --- | --------- | ----------- | --- | ------ | -------- | -------- | ----------- | ------------ | ------------- | ------ | --------------- | -------- | -------- |
|              |     |           |             |     |        |          |          | fectiveness | of our       | method        | across | a comprehensive |          | suite of |
| The internal |     | structure | is occluded |     | by the | object’s | surface, |             |              |               |        |                 |          |          |
benchmarks.
| as the | reconstructed |     | Gaussians | tend | to  | distribute | near the |     |     |     |     |     |     |     |
| ------ | ------------- | --- | --------- | ---- | --- | ---------- | -------- | --- | --- | --- | --- | --- | --- | --- |
surface,resultingininaccuratebehaviorsofvolumetricob-
4.1.EvaluationofGenerativeDynamics
jects. Tofillparticlesintothevoidinternalregion,inspired
byTangetal.[42],weborrowthe3Dopacityfieldfrom3D Datasets We evaluate our method for generating diverse
Gaussians dynamicsusingseveralsourcesofinput. Inadditiontothe
syntheticdata(sofasuite)generatedbyBlenderNeRF[34],
| d(x)= | (cid:80) | σ exp | (cid:0) − 1(x−x |     | )TA− | 1(x−x | ) (cid:1) . (11) |     |     |     |     |     |     |     |
| ----- | -------- | ----- | --------------- | --- | ---- | ----- | ---------------- | --- | --- | --- | --- | --- | --- | --- |
p p p p p weutilizefox,plane,andruinsfromthedatasetsofInstant-
2
|     |     |     |     |     |     |     |     | NGP [26], | Nerfstudio | [41] | and | the DroneDeploy |     | NeRF |
| --- | --- | --- | --- | --- | --- | --- | --- | --------- | ---------- | ---- | --- | --------------- | --- | ---- |
This continuous field is Condition 1 Condition 2 [29], respectively. Furthermore, we collect two real-world
| discretized |     | onto a | 3D  |     |     |     |     |                                                |     |     |     |     |     |      |
| ----------- | --- | ------ | --- | --- | --- | --- | --- | ---------------------------------------------- | --- | --- | --- | --- | --- | ---- |
|             |     |        |     |     |     |     |     | datasets(referredtoastoastandjam)withaniPhone. |     |     |     |     |     | Each |
grid. To achieve ro- scene contains 150 photos. The initial point clouds and
| bust internal |     | filling, | we  |     |     |     |     |     |     |     |     |     |     |     |
| ------------- | --- | -------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
cameraparametersareobtainedusingCOLMAP[35,36].
| first define |     | the concept |     |     |     |     |     |     |     |     |     |     |     |     |
| ------------ | --- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
of “intersection” within Simulation Setups We build upon the MPM from Zong
theopacityfield,guided External Grid Internal Grid Ray et al. [53]. To generate novel physics-based dynamics of
byauser-definedthresholdσ . Specifically,weconsiderit a 3D Gaussian scene, we manually select a simulation re-
th
anintersectionwhenaraypassesfromaloweropacitygrid gion and normalize it to a cube with edge length 2. The
(σ < σ ) to a higher opacity one (σ > σ ). Based on internalparticlefillingcanbeperformedbeforesimulation.
| i   | th  |     |     |     | j   | th  |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
this definition, we identify candidate grids by casting rays Thecuboidsimulationdomainisdiscretizedbya3Ddense
5

|     | Static |     |     | Physics-based Dynamics |     |     |     |
| --- | ------ | --- | --- | ---------------------- | --- | --- | --- |
yticitsalE
lateM
erutcarF
dnaS
etsaP
noisilloC
Figure3. MaterialVersatility. Wedemonstrateexceptionalversatilityofourapproachacrossawidevarietyofexamples: fox(elastic
entity),plane(plasticmetal),toast(fracture),ruins(granularmaterial),jam(viscoplasticmaterial),andsofasuite(collision).
grid. Weselectivelymodifythevelocitiesofspecificparti- ample with its initial scene and deformation sequence, as
cles to induce controlled movement. The remaining parti- shown in Fig. 3. Additional experiments are included in
cles follow natural motion patterns governed by the estab- the supplemental document. The dynamics include: Elas-
lishedphysicallaws. Allourexperimentsareperformedon ticity refers to the property where the rest shape of the
a24-core3.50GHzInteli9-10920XmachinewithaNvidia object remains invariant during deformation, representing
RTX3090GPU. the simplest form of daily-life dynamics. Metal can un-
|         |               |              |                  | dergo permanent       | rest shape changes,            | which follows | von- |
| ------- | ------------- | ------------ | ---------------- | --------------------- | ------------------------------ | ------------- | ---- |
| Results | We simulate   | a wide range | of physics-based | dy-                   |                                |               |      |
|         |               |              |                  | Misesplasticitymodel. | Fractureisnaturallysupportedby |               |      |
| namics. | For each type | of dynamics, | we visualize     | one ex-               |                                |               |      |
6

Ground Truth Ours Deforming-NeRF NeRF-Editing PAC-NeRF Ground Truth Ours Fixed Cov. Rigid Cov. Fixed Harmonics
)dneb( floW
)tsiwt( floW
Figure5.AblationStudies.Non-extensibleGaussianscanleadto
|     |     |     |     | severevisualartifactsduringdeformations. |     |     | Althoughdirectren- |     |
| --- | --- | --- | --- | ---------------------------------------- | --- | --- | ------------------ | --- |
deringthedeformedGaussiankernelscanalreadyobtaingoodre-
sults,additionalrotationsonsphericalharmonicscanimprovethe
| )dneb( lootS |     |     |     | renderingquality.                 |     |     |                  |     |
| ------------ | --- | --- | --- | --------------------------------- | --- | --- | ---------------- | --- |
|              |     |     |     | asgroundtruthforthedeformedNeRFs. |     |     | Thelatticedefor- |     |
)tsiwt( lootS
mationsaresetasinputtoallmethodsforfaircomparisons.
|     |     |     |     | Comparisons | Wecompareourmethodwithseveralstate- |     |     |     |
| --- | --- | --- | --- | ----------- | ----------------------------------- | --- | --- | --- |
of-the-artNeRFframeworksthatsupportmanualdeforma-
)dneb( tnalP tions: 1) NeRF-Editing [51] deforms NeRF using an ex-
|     |     |     |     | tracted surface | mesh, 2) Deforming-NeRF |     | [47] utilizes | a   |
| --- | --- | --- | --- | --------------- | ----------------------- | --- | ------------- | --- |
cagemeshfordeformation,and3)PAC-NeRF[18]manip-
ulatesindividualinitialparticles.
)tsiwt( tnalP WeshowqualitativeresultsinFig.4andquantitativere-
|     |     |     |     | sultsinTab.1. | NeRF-EditingusesNeuS[43]asthescene |     |     |     |
| --- | --- | --- | --- | ------------- | ---------------------------------- | --- | --- | --- |
representation,whichismoresuitedforsurfacereconstruc-
|          |                                               |     |     | tionsratherthanhigh-fidelityrenderings. |                       |            | Consequently,its |     |
| -------- | --------------------------------------------- | --- | --- | --------------------------------------- | --------------------- | ---------- | ---------------- | --- |
|          |                                               |     |     | rendering                               | quality is inherently | lower than | that of 3DGS.    |     |
| Figure4. | Comparisons. Foreachbenchmarkcase,weselectone |     |     |                                         |                       |            |                  |     |
testviewpointandvisualizeallcomparisons.Wezoominonsome Furthermore, the deformation highly depends on the pre-
|            |                       |               |                   | cision of | the extracted surface | mesh and  | the dilated   | cage |
| ---------- | --------------------- | ------------- | ----------------- | --------- | --------------------- | --------- | ------------- | ---- |
| regions to | highlight the ability | of our method | to maintain high- |           |                       |           |               |      |
|            |                       |               |                   | mesh – an | overly tight mesh     | might not | encompass the | en-  |
fidelityrenderingqualityafterdeformations.Weuseablackback-
groundtoavoidtheinterferenceofthebackground. tireradiancefield,whileanexcessivelylargeonecouldre-
|     |     |     |     | sult in a      | void border, as observed | in the     | twisting stool | and  |
| --- | --- | --- | --- | -------------- | ------------------------ | ---------- | -------------- | ---- |
|     |     |     |     | plantexamples. | Deforming-NeRF,          | ontheother | hand,          | pro- |
MPMsimulation,wherelargedeformationscancauseparti- videsclearrenderingsandpotentiallyleadstoenhancedre-
clestoseparateintomultiplegroups. SandfollowsDruker- sults if higher-resolution deformation cages are provided.
Prager plasticity model [17], which can capture granular- However, it employs a smooth interpolation from all cage
level frictional effects among particles. Paste is modeled vertices, thus filtering out fine local details and failing to
asviscoplasticnon-Newtonianfluid,adheringtoHerschel-
|     |     |     |     | match lattice | deformations. | PAC-NeRF | is designed | for |
| --- | --- | --- | --- | ------------- | ------------- | -------- | ----------- | --- |
Bulkleyplasticitymodel[52]. Collisionisanotherkeyfea- simpler objects and textures in system identification tasks.
tureofMPMsimulation,whichisautomaticallyhandledby Whileofferingflexibilitythroughitsparticlerepresentation,
grid time integration. Explicit MPM can be highly opti- it does not achieve high rendering fidelity. Our method
mizedtorunonGPUs. Wehighlightthatsomeofthecases utilizesbothzero-orderinformation(thedeformationmap)
| can achieve | real-time based | on the 1/24-s | frame duration: |     |     |     |     |     |
| ----------- | --------------- | ------------- | --------------- | --- | --- | --- | --- | --- |
andfirst-orderinformation(thedeformationgradient)from
plane(30FPS),toast(25FPS)andjam(36FPS).Whileuti- eachlatticecell.Itoutperformstheothermethodsacrossall
lizingFEMmayfurtheracceleratetheelasticitysimulation, cases, as high rendering qualities are well preserved after
itwillinvolveanadditionalstepofmeshextractionandlose deformations. Althoughnotprimarilydesignedforediting
thegeneralizabilityofMPMininelasticitysimulation. tasks, this comparison showcases our method’s significant
potentialforrealisticeditingofstaticNeRFscenes.
4.2.LatticeDeformationBenchmarks
|     |     |     |     | Ablation | Studies We further | conduct | several ablation |     |
| --- | --- | --- | --- | -------- | ------------------ | ------- | ---------------- | --- |
Dataset Due to the absence of ground truth for post- studies on these benchmark scenes to validate the neces-
deformation, we utilize BlenderNeRF [34] to synthesize sity of the kinematics of Gaussian kernels and spherical
severalscenes, applyingbendingandtwistingwiththelat- harmonics: 1)FixedCovarianceonlytranslatestheGaus-
ticedeformationtool. Foreachscene,wecreate100multi- siankernels. 2)RigidCovarianceonlyappliesrigidtrans-
view renderings of the undeformed state for training, and formations on the Gaussians, as assumed in Luiten et al.
100 multi-view renderings of each deformed state to serve [22]. 3)FixedHarmonicsdoesnotrotatetheorientations
7

Table 1. We synthesize a lattice deformation benchmark dataset Ours NeRF-Editing
tocomparewithbaselinesandconductablationstudiestovalidate
| ourdesignchoices.                            |     | PSNRscoresarereported(higherisbetter). |      |       |     |       |         |     |     |         |     |     |     |
| -------------------------------------------- | --- | -------------------------------------- | ---- | ----- | --- | ----- | ------- | --- | --- | ------- | --- | --- | --- |
| Ourmethodoutperformstheothersacrossallcases. |     |                                        |      |       |     |       | Stretch |     |     | Stretch |     |     |     |
| TestCase                                     |     |                                        | Wolf | Stool |     | Plant |         |     |     |         |     |     |     |
DeformationOperator Bend Twist Bend Twist Bend Twist Figure 7. Volume Conservation. Compared to the geometry-
NeRF-Editing[51] 26.74 24.37 25.00 21.10 19.85 19.08 based editing method [51], our physics-based method is able to
| Deforming-NeRF[47] |     | 21.65 | 21.72 | 22.32 | 21.16 | 17.90 18.63 |     |     |     |     |     |     |     |
| ------------------ | --- | ----- | ----- | ----- | ----- | ----------- | --- | --- | --- | --- | --- | --- | --- |
capturevolumetricbehaviors,leadingtomorerealisticdynamics.
| PAC-NeRF[18]    |     | 26.91 | 25.27 | 21.83 | 21.26 | 18.50 17.78 |     |     |     |     |     |     |     |
| --------------- | --- | ----- | ----- | ----- | ----- | ----------- | --- | --- | --- | --- | --- | --- | --- |
| FixedCovariance |     | 26.77 | 26.02 | 29.94 | 25.31 | 23.95 23.09 |     |     |     |     |     |     |     |
RigidCovariance 26.84 26.16 30.28 25.70 24.09 23.53 w/ Regularizer w/o Regularizer
| FixedHarmonics       |     | 26.83 | 26.02 | 30.87 | 25.75               | 25.09 23.69 |     |     |     |     |     |     |     |
| -------------------- | --- | ----- | ----- | ----- | ------------------- | ----------- | --- | --- | --- | --- | --- | --- | --- |
| Ours                 |     | 26.96 | 26.46 | 31.15 | 26.15               | 25.81 23.87 |     |     |     |     |     |     |     |
| w/o Internal Filling |     |       |       |       | w/ Internal Filling |             |     |     |     |     |     |     |     |
ν↑
|     |     |     |     |     |     |     | Figure8. | AnisotropyRegularizer. |     |     | Weintroduceananisotropy |     |     |
| --- | --- | --- | --- | --- | --- | --- | -------- | ---------------------- | --- | --- | ----------------------- | --- | --- |
constraintforGaussiankernels,effectivelyenhancingthefidelity
E↑ E↑ oftheGaussian-basedrepresentationunderdynamicconditions.
Figure6.Internalfillingenablesmorerealisticsimulationresults.
Ourmethodalsosupportsflexiblecontrolofdynamicsviamaterial
|     |     |     |     |     |     |     | VolumeConservation |     |     | ExistingapproachestoNeRFma- |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------ | --- | --- | --------------------------- | --- | --- | --- |
parameters.AlargerYoung’smodulusEindicateshigherstiffness
whilealargerpoissionratioνleadstobettervolumepreservation. nipulation focus primarily on geometric adjustments with-
|     |     |     |     |     |     |     | out incorporating |         | physical | properties. | A       | key attribute | of   |
| --- | --- | --- | --- | --- | --- | --- | ----------------- | ------- | -------- | ----------- | ------- | ------------- | ---- |
|     |     |     |     |     |     |     | real-world        | objects | is their | inherent    | ability | to conserve   | vol- |
ofsphericalharmonics,asassumedinWuetal.[45]. ume during deformation. In Fig. 7, we conduct a com-
Here we visualize one example in Fig. 5. We can ob- parisonstudybetweenourmethodandNeRF-Editing[51],
whichutilizessurfaceAs-Rigid-As-Possible(ARAP)defor-
servethatGaussianswillnotproperlycoverthesurfaceaf-
terdeformationiftheyarenon-extensible,leadingtosevere mation[38].UnlikeNeRF-Editing,ourapproachaccurately
capturesandmaintainsthevolumeofthedeformedobjects.
| visualartifacts. |          | Enablingtherotationofsphericalharmon- |     |             |        |               |                       |     |     |                            |     |     |     |
| ---------------- | -------- | ------------------------------------- | --- | ----------- | ------ | ------------- | --------------------- | --- | --- | -------------------------- | --- | --- | --- |
| ics can          | slightly | improve                               | the | consistency | with   | the ground    |                       |     |     |                            |     |     |     |
| truth. We        | include  | quantitative                          |     | results     | on all | test cases in |                       |     |     |                            |     |     |     |
|                  |          |                                       |     |             |        |               | AnisotropyRegularizer |     |     | 3DGaussianmodelsinherently |     |     |     |
Tab.1,whichshowsthatalltheseenhancementsareneeded
|     |     |     |     |     |     |     | representanisotropicellipsoids. |     |     |     | However,excessivelyslen- |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------------- | --- | --- | --- | ------------------------ | --- | --- |
toachievethebestperformanceofourmethod.
|     |     |     |     |     |     |     | der Gaussian | kernels | can | lead | to burr-like | visual | artifacts, |
| --- | --- | --- | --- | --- | --- | --- | ------------ | ------- | --- | ---- | ------------ | ------ | ---------- |
4.3.AdditionalQualitativeStudies especiallypronouncedduringlargedeformationsTotackle
|     |     |     |     |     |     |     | this issue, | we introduce |     | an additional | regularization |     | loss |
| --- | --- | --- | --- | --- | --- | --- | ----------- | ------------ | --- | ------------- | -------------- | --- | ---- |
Internal Filling Typically, the 3D Gaussian splatting Eq.(12)toconstrainanisotropy. AsdemonstratedinFig.8,
frameworkfocusesonthesurfaceappearanceofobjectsand
|     |     |     |     |     |     |     | this additional | loss | function | effectively |     | mitigates | the arti- |
| --- | --- | --- | --- | --- | --- | --- | --------------- | ---- | -------- | ----------- | --- | --------- | --------- |
oftenfailstocapturetheirinternalstructure. Consequently, factsinducedbyextremeanisotropy.
| the interior     | of  | the modeled                         | object | remains | hollow, | resem- |     |     |     |     |     |     |     |
| ---------------- | --- | ----------------------------------- | ------ | ------- | ------- | ------ | --- | --- | --- | --- | --- | --- | --- |
| blingamereshell. |     | Thisisusuallynottrueintherealworld, |        |         |         |        |     |     |     |     |     |     |     |
5.Discussion
| leading | to unrealistic |     | simulation | results. | To  | address this |     |     |     |     |     |     |     |
| ------- | -------------- | --- | ---------- | -------- | --- | ------------ | --- | --- | --- | --- | --- | --- | --- |
challenge, weintroduceaninternalfillingmethodleverag- Conclusion This paper introduces PhysGaussian, a uni-
ingareconstructeddensityfield,whichisderivedfromthe fied simulation-rendering pipeline that generates physics-
opacityofGaussiankernels. Fig.6showcasesoursimula- based dynamics and photo-realistic renderings simultane-
tion results with varying physical parameters. Objects de- ouslyandseamlessly.
voidofinternalparticlestendtocollapsewhensubjectedto
|     |     |     |     |     |     |     | Limitation | In our | framework, |     | the evolution | of  | shadows |
| --- | --- | --- | --- | --- | --- | --- | ---------- | ------ | ---------- | --- | ------------- | --- | ------- |
gravityforces,irrespectiveofthematerialparametersused.
|     |     |     |     |     |     |     | is not considered, |     | and | material | parameters | are | manually |
| --- | --- | --- | --- | --- | --- | --- | ------------------ | --- | --- | -------- | ---------- | --- | -------- |
Incontrast,ourapproachassistedbyinternalfillingallows
set.Automaticparameterassignmentcouldbederivedfrom
| for nuanced | control | over | object | dynamics, | effectively | ad- |           |           |     |              |     |          |        |
| ----------- | ------- | ---- | ------ | --------- | ----------- | --- | --------- | --------- | --- | ------------ | --- | -------- | ------ |
|             |         |      |        |           |             |     | videos by | combining | GS  | segmentation | [3, | 50] with | a dif- |
justingtodifferentmaterialcharacteristics.
|     |     |     |     |     |     |     | ferentiable | MPM | simulator. |     | Additionally, | incorporating |     |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --- | ---------- | --- | ------------- | ------------- | --- |
8

| geometry-aware     | 3DGS | reconstruction |        | methods | [9]       | could | References   |     |         |                 |     |     |         |          |
| ------------------ | ---- | -------------- | ------ | ------- | --------- | ----- | ------------ | --- | ------- | --------------- | --- | --- | ------- | -------- |
| enhance generative |      | dynamics.      | Future | work    | will also | ex-   |              |     |         |                 |     |     |         |          |
|                    |      |                |        |         |           |       | [1] Jonathan | T   | Barron, | Ben Mildenhall, |     | Dor | Verbin, | Pratul P |
plorehandlingmoreversatilematerialslikeliquidsandin-
|                |           |      |           |          |            |     | Srinivasan,  | and | Peter  | Hedman.  | Mip-nerf |     | 360:        | Unbounded |
| -------------- | --------- | ---- | --------- | -------- | ---------- | --- | ------------ | --- | ------ | -------- | -------- | --- | ----------- | --------- |
| tegrating more | intuitive | user | controls, | possibly | leveraging |     |              |     |        |          |          |     |             |           |
|                |           |      |           |          |            |     | anti-aliased |     | neural | radiance | fields.  | In  | Proceedings | of the    |
advancementsinLargeLanguageModels(LLMs).
|                  |     |     |            |      |        |      | IEEE/CVF                         |     | Conference | on  | Computer | Vision |     | and Pattern |
| ---------------- | --- | --- | ---------- | ---- | ------ | ---- | -------------------------------- | --- | ---------- | --- | -------- | ------ | --- | ----------- |
|                  |     |     |            |      |        |      | Recognition,pages5470–5479,2022. |     |            |     |          | 2      |     |             |
| Acknowledgements |     | We  | thank Ying | Nian | Wu and | Feng |                                  |     |            |     |          |        |     |             |
Gaoforusefuldiscussions. Weacknowledgesupportfrom [2] Javier Bonet and Richard D Wood. Nonlinear continuum
NSF (2301040, 2008915, 2244651, 2008564, 2153851, mechanicsforfiniteelementanalysis. Cambridgeuniversity
|     |     |     |     |     |     |     | press,1997. |     | 3,4 |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --- | --- | --- | --- | --- | --- | --- |
2023780),UC-MRPI,Sony,Amazon,andTRI.
|     |     |     |     |     |     |     | [3] Jiazhong                                              | Cen,                                | Jiemin | Fang, | Chen   | Yang, | Lingxi  | Xie, Xi- |
| --- | --- | --- | --- | --- | --- | --- | --------------------------------------------------------- | ----------------------------------- | ------ | ----- | ------ | ----- | ------- | -------- |
|     |     |     |     |     |     |     | aopeng                                                    | Zhang,                              | Wei    | Shen, | and Qi | Tian. | Segment | any 3d   |
|     |     |     |     |     |     |     | gaussians.                                                | arXivpreprintarXiv:2312.00860,2023. |        |       |        |       |         | 8        |
|     |     |     |     |     |     |     | [4] SChandrasekhar.Ellipsoidalfiguresofequilibrium—anhis- |                                     |        |       |        |       |         |          |
toricalaccount.CommunicationsonPureandAppliedMath-
|     |     |     |     |     |     |     | ematics,20(2):251–265,1967.                             |     |     |                                | 5   |     |     |      |
| --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------------- | --- | --- | ------------------------------ | --- | --- | --- | ---- |
|     |     |     |     |     |     |     | [5] Hsiao-yuChen,EdithTretschk,TuurStuyck,PetrKadlecek, |     |     |                                |     |     |     |      |
|     |     |     |     |     |     |     | LadislavKavan,EtienneVouga,andChristophLassner.         |     |     |                                |     |     |     | Vir- |
|     |     |     |     |     |     |     | tualelasticobjects.                                     |     |     | InProceedingsoftheIEEE/CVFCon- |     |     |     |      |
ferenceonComputerVisionandPatternRecognition,pages
|     |     |     |     |     |     |     | 15827–15837,2022.                          |                 |             | 2                  |              |          |                 |            |
| --- | --- | --- | --- | --- | --- | --- | ------------------------------------------ | --------------- | ----------- | ------------------ | ------------ | -------- | --------------- | ---------- |
|     |     |     |     |     |     |     | [6] Jun-KunChen,JipengLyu,andYu-XiongWang. |                 |             |                    |              |          |                 | Neuraled-  |
|     |     |     |     |     |     |     | itor:                                      | Editing         | neural      | radiance           | fields       | via      | manipulating    | point      |
|     |     |     |     |     |     |     | clouds.                                    | In              | Proceedings | of                 | the          | IEEE/CVF | Conference      | on         |
|     |     |     |     |     |     |     | Computer                                   | Vision          | and         | Pattern            | Recognition, |          | pages           | 12439–     |
|     |     |     |     |     |     |     | 12448,2023.                                |                 | 2,5         |                    |              |          |                 |            |
|     |     |     |     |     |     |     | [7] Sara                                   | Fridovich-Keil, |             | Alex               | Yu, Matthew  |          | Tancik,         | Qinhong    |
|     |     |     |     |     |     |     | Chen,                                      | BenjaminRecht,  |             | andAngjooKanazawa. |              |          |                 | Plenoxels: |
|     |     |     |     |     |     |     | Radiancefieldswithoutneuralnetworks.       |                 |             |                    |              |          | InProceedingsof |            |
theIEEE/CVFConferenceonComputerVisionandPattern
|     |     |     |     |     |     |     | Recognition,pages5501–5510,2022.          |                                          |                  |              |              | 2                 |                  |             |
| --- | --- | --- | --- | --- | --- | --- | ----------------------------------------- | ---------------------------------------- | ---------------- | ------------ | ------------ | ----------------- | ---------------- | ----------- |
|     |     |     |     |     |     |     | [8] Ming                                  | Gao,                                     | Xinlei           | Wang,        | Kui Wu,      | Andre             | Pradhana,        | Efty-       |
|     |     |     |     |     |     |     | chiosSifakis,CemYuksel,andChenfanfuJiang. |                                          |                  |              |              |                   |                  | Gpuopti-    |
|     |     |     |     |     |     |     | mizationofmaterialpointmethods.           |                                          |                  |              |              | ACMTransactionson |                  |             |
|     |     |     |     |     |     |     | Graphics(TOG),37(6):1–12,2018.            |                                          |                  |              |              | 3                 |                  |             |
|     |     |     |     |     |     |     | [9] Antoine                               | Gue´don                                  | and              | Vincent      | Lepetit.     |                   | Sugar:           | Surface-    |
|     |     |     |     |     |     |     | aligned                                   | gaussian                                 | splatting        |              | for          | efficient         | 3d mesh          | recon-      |
|     |     |     |     |     |     |     | struction                                 | and                                      | high-quality     |              | mesh         | rendering.        | arXiv            | preprint    |
|     |     |     |     |     |     |     | arXiv:2311.12775,2023.                    |                                          |                  | 9            |              |                   |                  |             |
|     |     |     |     |     |     |     | [10] Yuanming                             | Hu,                                      | Yu               | Fang, Ziheng |              | Ge, Ziyin         | Qu,              | Yixin Zhu,  |
|     |     |     |     |     |     |     | Andre                                     | Pradhana,                                | and              | Chenfanfu    |              | Jiang.            | A moving         | least       |
|     |     |     |     |     |     |     | squares                                   | material                                 | point            | method       | with         | displacement      |                  | disconti-   |
|     |     |     |     |     |     |     | nuityandtwo-wayrigidbodycoupling.         |                                          |                  |              |              |                   | ACMTransactions  |             |
|     |     |     |     |     |     |     | onGraphics(TOG),37(4):1–14,2018.          |                                          |                  |              |              | 2                 |                  |             |
|     |     |     |     |     |     |     | [11] Yuanming                             | Hu,                                      | Tzu-Mao          |              | Li, Luke     | Anderson,         |                  | Jonathan    |
|     |     |     |     |     |     |     | Ragan-Kelley,                             |                                          | and              | Fre´do       | Durand.      | Taichi:           |                  | a language  |
|     |     |     |     |     |     |     | for high-performance                      |                                          |                  | computation  |              | on spatially      |                  | sparse data |
|     |     |     |     |     |     |     | structures.                               |                                          | ACM Transactions |              | on           | Graphics          | (TOG),           | 38(6):      |
|     |     |     |     |     |     |     | 1–16,2019.                                |                                          | 3                |              |              |                   |                  |             |
|     |     |     |     |     |     |     | [12] Cle´ment                             | Jambon,                                  |                  | Bernhard     | Kerbl,       | Georgios          |                  | Kopanas,    |
|     |     |     |     |     |     |     | Stavros                                   | Diolatzis,                               | Thomas           |              | Leimku¨hler, |                   | and George”      | Dret-       |
|     |     |     |     |     |     |     | takis.                                    | Nerfshop:                                |                  | Interactive  | editing      |                   | of neural        | radiance    |
|     |     |     |     |     |     |     | fields”.                                  | ProceedingsoftheACMonComputerGraphicsand |                  |              |              |                   |                  |             |
|     |     |     |     |     |     |     | InteractiveTechniques,6(1),2023.          |                                          |                  |              |              | 1                 |                  |             |
|     |     |     |     |     |     |     | [13] Chenfanfu                            | Jiang,                                   | Craig            | Schroeder,   |              | Andrew            | Selle,           | Joseph      |
|     |     |     |     |     |     |     | Teran,                                    | and                                      | Alexey           | Stomakhin.   |              | The affine        | particle-in-cell |             |
method.ACMTransactionsonGraphics(TOG),34(4):1–10,
|     |     |     |     |     |     |     | 2015. | 3,11,12 |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ----- | ------- | --- | --- | --- | --- | --- | --- |
9

[14] Chenfanfu Jiang, Craig Schroeder, Joseph Teran, Alexey [27] Keunhong Park, Utkarsh Sinha, Jonathan T Barron, Sofien
Stomakhin, and Andrew Selle. The material point method Bouaziz, Dan B Goldman, Steven M Seitz, and Ricardo
forsimulatingcontinuummaterials. InAcmsiggraph2016 Martin-Brualla. Nerfies: Deformableneuralradiancefields.
courses,pages1–52.2016. 4,11 In Proceedings of the IEEE/CVF International Conference
[15] Chenfanfu Jiang, Theodore Gast, and Joseph Teran. onComputerVision,pages5865–5874,2021. 2
Anisotropicelastoplasticityforcloth,knitandhairfrictional [28] Yicong Peng, Yichao Yan, Shengqi Liu, Yuhao Cheng,
contact.ACMTransactionsonGraphics(TOG),36(4):1–14, Shanyan Guan, Bowen Pan, Guangtao Zhai, and Xiaokang
| 2017. | 3   |     |     |     | Yang. Cagenerf: | Cage-basedneuralradiancefieldforgen- |     |     |
| ----- | --- | --- | --- | --- | --------------- | ------------------------------------ | --- | --- |
[16] Bernhard Kerbl, Georgios Kopanas, Thomas Leimku¨hler, eralized3ddeformationandanimation. AdvancesinNeural
and George Drettakis. 3d gaussian splatting for real-time InformationProcessingSystems,35:31402–31415,2022. 1,
| radiance | field | rendering. ACM | Transactions | on Graphics | 2   |     |     |     |
| -------- | ----- | -------------- | ------------ | ----------- | --- | --- | --- | --- |
(ToG),42(4):1–14,2023. 1,2,3,4,5 [29] NicholasPilkington. Dronedeploynerfdataset,2022. 5
[17] Gergely Kla´r, Theodore Gast, Andre Pradhana, Chuyuan [30] Albert Pumarola, Enric Corona, Gerard Pons-Moll, and
Fu, Craig Schroeder, Chenfanfu Jiang, and Joseph Teran. Francesc Moreno-Noguer. D-nerf: Neural radiance fields
Drucker-prager elastoplasticity for sand animation. ACM fordynamicscenes. InProceedingsoftheIEEE/CVFCon-
ferenceonComputerVisionandPatternRecognition,pages
| Transactions |     | on Graphics (TOG), | 35(4):1–12, | 2016. 3, 7, |                   |     |     |     |
| ------------ | --- | ------------------ | ----------- | ----------- | ----------------- | --- | --- | --- |
| 12           |     |                    |             |             | 10318–10327,2021. | 2   |     |     |
[18] XuanLi,Yi-LingQiao,PeterYichenChen,KrishnaMurthy [31] Yi-Ling Qiao, Alexander Gao, and Ming Lin. Neu-
Jatavallabhula, Ming Lin, Chenfanfu Jiang, and Chuang physics:Editableneuralgeometryandphysicsfrommonoc-
ularvideos.AdvancesinNeuralInformationProcessingSys-
| Gan. | PAC-neRF:Physicsaugmentedcontinuumneuralra- |     |     |     |     |     |     |     |
| ---- | ------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
diancefieldsforgeometry-agnosticsystemidentification. In tems,35:12841–12854,2022. 2
TheEleventhInternationalConferenceonLearningRepre- [32] Yi-LingQiao,AlexanderGao,YiranXu,YueFeng,Jia-Bin
sentations,2023. 2,7,8 Huang, and Ming C Lin. Dynamic mesh-aware radiance
fields. InProceedingsoftheIEEE/CVFInternationalCon-
| [19] Yuan | Li, Zhi-Hao | Lin, David | Forsyth, Jia-Bin | Huang, and |     |     |     |     |
| --------- | ----------- | ---------- | ---------------- | ---------- | --- | --- | --- | --- |
Shenlong Wang. Climatenerf: Extreme weather synthesis ferenceonComputerVision,pages385–396,2023. 2
in neural radiance field. In Proceedings of the IEEE/CVF [33] YuxingQiu,SamuelTempleReeve,MinchenLi,YinYang,
InternationalConferenceonComputerVision,pages3227– Stuart Ryan Slattery, and Chenfanfu Jiang. A sparse dis-
3238,2023. 2 tributed gigascale resolution material point method. ACM
[20] Zhi-HaoLin,Wei-ChiuMa,Hao-YuHsu,Yu-ChiangFrank TransactionsonGraphics,42(2):1–21,2023. 3
Wang, and Shenlong Wang. Neurmips: Neural mixture [34] MaximeRaafat. BlenderNeRF,2023. 5,7,12
of planar experts for view synthesis. In Proceedings of [35] Johannes Lutz Scho¨nberger and Jan-Michael Frahm.
theIEEE/CVFConferenceonComputerVisionandPattern
|     |     |     |     |     | Structure-from-motion | revisited. | In Conference | on Com- |
| --- | --- | --- | --- | --- | --------------------- | ---------- | ------------- | ------- |
Recognition,pages15702–15712,2022. 2 puterVisionandPatternRecognition(CVPR),2016. 5
[21] RuiyangLiu,JinxuXiang,BowenZhao,RanZhang,Jingyi [36] JohannesLutzScho¨nberger,EnliangZheng,MarcPollefeys,
Yu, and Changxi Zheng. Neural impostor: Editing neu- and Jan-Michael Frahm. Pixelwise view selection for un-
| ral radiance | fields | with explicit | shape manipulation. | arXiv |                       |            |                     |     |
| ------------ | ------ | ------------- | ------------------- | ----- | --------------------- | ---------- | ------------------- | --- |
|              |        |               |                     |       | structured multi-view | stereo. In | European Conference | on  |
preprintarXiv:2310.05391,2023. 2 ComputerVision(ECCV),2016. 5
[22] Jonathon Luiten, Georgios Kopanas, Bastian Leibe, and [37] JuanCSimoandThomasJRHughes.Computationalinelas-
Deva Ramanan. Dynamic 3d gaussians: Tracking ticity. SpringerScience&BusinessMedia,2006. 4
arXiv preprint
by persistent dynamic view synthesis. [38] OlgaSorkineandMarcAlexa. As-rigid-as-possiblesurface
arXiv:2308.09713,2023. 2,7 modeling. In Symposium on Geometry processing, pages
[23] WILLIAM J McKIVER and David G Dritschel. The mo- 109–116.Citeseer,2007. 8
tionofafluidellipsoidinagenerallinearbackgroundflow.
[39] AlexeyStomakhin,CraigSchroeder,LawrenceChai,Joseph
JournalofFluidMechanics,474:147–173,2003.
|     |     |     |     | 5   | Teran,andAndrewSelle. | Amaterialpointmethodforsnow |     |     |
| --- | --- | --- | --- | --- | --------------------- | --------------------------- | --- | --- |
[24] Ben Mildenhall, Pratul P Srinivasan, Matthew Tancik, simulation. ACM Transactions on Graphics (TOG), 32(4):
| JonathanTBarron,RaviRamamoorthi,andRenNg. |     |     |     | Nerf: | 1–10,2013. | 3,4 |     |     |
| ----------------------------------------- | --- | --- | --- | ----- | ---------- | --- | --- | --- |
Representingscenesasneuralradiancefieldsforviewsyn-
[40] ChengSun,MinSun,andHwann-TzongChen.Directvoxel
thesis.CommunicationsoftheACM,65(1):99–106,2021.1, gridoptimization:Super-fastconvergenceforradiancefields
| 2,3,12 |     |     |     |     | reconstruction.InProceedingsoftheIEEE/CVFConference |     |     |     |
| ------ | --- | --- | --- | --- | --------------------------------------------------- | --- | --- | --- |
[25] MatthiasMu¨ller,NuttapongChentanez,andMilesMacklin. on Computer Vision and Pattern Recognition, pages 5459–
| Simulating | visual | geometry. | In Proceedings | of the 9th In- | 5469,2022. | 2   |     |     |
| ---------- | ------ | --------- | -------------- | -------------- | ---------- | --- | --- | --- |
ternational Conference on Motion in Games, pages 31–38, [41] Matthew Tancik, Ethan Weber, Evonne Ng, Ruilong Li,
2016. 2 Brent Yi, Terrance Wang, Alexander Kristoffersen, Jake
[26] ThomasMu¨ller,AlexEvans,ChristophSchied,andAlexan- Austin, KamyarSalahi, AbhikAhuja, etal. Nerfstudio: A
der Keller. Instant neural graphics primitives with a mul- modular framework for neural radiance field development.
tiresolutionhashencoding. ACMTransactionsonGraphics In ACM SIGGRAPH 2023 Conference Proceedings, pages
| (ToG),41(4):1–15,2022. |     | 2,5 |     |     | 1–12,2023. | 5   |     |     |
| ---------------------- | --- | --- | --- | --- | ---------- | --- | --- | --- |
10

Appendix
[42] JiaxiangTang,JiaweiRen,HangZhou,ZiweiLiu,andGang
Zeng.Dreamgaussian:Generativegaussiansplattingforeffi-
A.MPMAlgorithm
cient3dcontentcreation. arXivpreprintarXiv:2309.16653,
2023. 5
InMPM,acontinuumbodyisdiscretizedintoasetofLa-
[43] PengWang,LingjieLiu,YuanLiu,ChristianTheobalt,Taku
grangianparticlesp,andtimeisdiscretizedintoasequence
Komura, and Wenping Wang. Neus: Learning neural im-
oftimestepst = 0,t1,t2,.... Herewetakeafixedstepsize
plicit surfaces by volume rendering for multi-view recon-
struction. In Advances in Neural Information Processing ∆t,sotn =n∆t.
Systems,2021. 7 At each time step, masses and momentums on particles
[44] Xinlei Wang, Yuxing Qiu, Stuart R Slattery, Yu Fang, are first transferred to grid nodes. Grid velocities are then
MinchenLi,Song-ChunZhu,YixinZhu,MinTang,Dinesh updatedusingforwardEuler’smethodandtransferredback
Manocha, and Chenfanfu Jiang. A massively parallel and toparticlesforsubsequentadvection. Letm ,xn,vn,Fn,
p p p p
scalable multi-gpu material point method. ACM Transac- τn, and Cn denote the mass, position, velocity, deforma-
p p
tionsonGraphics(TOG),39(4):30–1,2020. 3 tion gradient, Kirchhoff stress, and affine momentum on
[45] GuanjunWu,TaoranYi,JieminFang,LingxiXie,Xiaopeng particle p at time t . Let m , xn and vn denote the mass,
n i i i
Zhang,WeiWei,WenyuLiu,QiTian,andXinggangWang. position,andvelocityongridnodeiattimetn. Here,par-
4dgaussiansplattingforreal-timedynamicscenerendering.
ticlemassesareinvariantduetomassconservationlaw. Let
arXivpreprintarXiv:2310.08528,2023. 2,3,5,8
mn, xn andvn denotethemass, position, andvelocityon
[46] Qiangeng Xu, Zexiang Xu, Julien Philip, Sai Bi, Zhixin i i i
grid node i at time tn. We summarize the explicit MPM
Shu, Kalyan Sunkavalli, and Ulrich Neumann. Point-nerf:
algorithmasfollows:
Point-based neural radiance fields. In Proceedings of the
IEEE/CVF Conference on Computer Vision and Pattern 1. TransferParticlestoGrid. Transfermassandmomen-
Recognition,pages5438–5448,2022. 2 tumfromparticlestogridsas
[47] TianhanXuandTatsuyaHarada. Deformingradiancefields (cid:88)
mn = wnm ,
with cages. In European Conference on Computer Vision, i ip p
pages159–175.Springer,2022. 1,7,8 p (13)
[48] Ziyi Yang, Xinyu Gao, Wen Zhou, Shaohui Jiao, Yuqing mnvn = (cid:88) wnm (cid:0) vn+Cn(cid:0) x −xn(cid:1)(cid:1) .
i i ip p p p i p
Zhang, and Xiaogang Jin. Deformable 3d gaussians for
p
high-fidelitymonoculardynamicscenereconstruction.arXiv
WeadopttheAPICscheme[13]formomentumtransfer.
preprintarXiv:2309.13101,2023. 2
2. GridUpdate. Updategridvelocitiesbasedonforcesat
[49] Zeyu Yang, Hongye Yang, Zijie Pan, Xiatian Zhu, and Li
thenexttimestepby
Zhang. Real-timephotorealisticdynamicscenerepresenta-
tionandrenderingwith4dgaussiansplatting.arXivpreprint ∆t(cid:88)
vn+1 =vn− τn∇wnV0+∆tg. (14)
arXiv:2310.10642,2023. 2 i i m p ip p
i
[50] Mingqiao Ye, Martin Danelljan, Fisher Yu, and Lei Ke. p
Gaussiangrouping:Segmentandeditanythingin3dscenes. 3. TransferGridtoParticles. Transfervelocitiesbackto
arXivpreprintarXiv:2312.00732,2023. 8 particlesandupdateparticlestates.
[51] Yu-Jie Yuan, Yang-Tian Sun, Yu-Kun Lai, Yuewen Ma,
(cid:88)
RongfeiJia,andLinGao. Nerf-editing:geometryeditingof vn+1 = vn+1wn,
p i ip
neuralradiancefields.InProceedingsoftheIEEE/CVFCon- i
ferenceonComputerVisionandPatternRecognition,pages xn+1 =xn+∆tvn+1,
p p p
18353–18364,2022. 1,2,7,8
[52] YonghaoYue,BreannanSmith,ChristopherBatty,Changxi Cn+1 = 12 (cid:88) wnvn+1(cid:0) xn−xn(cid:1)T ,
p ∆x2(b+1) ip i i p
Zheng, and Eitan Grinspun. Continuum foam: A material
i
pointmethodforshear-dependentflows. ACMTransactions (cid:88)
∇vn+1 = vn+1∇wnT,
onGraphics(TOG),34(5):1–20,2015. 7,12 p i ip
i
[53] Zeshun Zong, Xuan Li, Minchen Li, Maurizio M Chiara-
monte,WojciechMatusik,EitanGrinspun,KevinCarlberg, F p E,tr =(I+∇v p n+1)FE,n,
Chenfanfu Jiang, and Peter Yichen Chen. Neural stress FE,n+1 =Z(FE,tr),
fieldsforreduced-orderelastoplasticityandfracture. arXiv p p
preprintarXiv:2310.17790,2023. 5,12 τ p n+1 =τ(F p E,n+1).
(15)
HerebistheB-splinedegree,and∆xistheEuleriangrid
spacing. The computation of the return map Z and the
Kirchhoff stress τ is outlined in Appendix B. We refer
the readers to [14] for the detailed derivations from the
continuousconservationlawtoitsMPMdiscretization.
11

|     |          | Table2.ModelSettings. |        |                   |     |     | B.3.Neo-HookeanElasticity |     |                      |             |              |       |     |     |      |
| --- | -------- | --------------------- | ------ | ----------------- | --- | --- | ------------------------- | --- | -------------------- | ----------- | ------------ | ----- | --- | --- | ---- |
|     |          |                       |        |                   |     |     | TheKirchhoffstressτ       |     |                      | isdefinedas |              |       |     |     |      |
|     | Scene    |                       | Figure | ConstitutiveModel |     |     |                           |     |                      |             |              |       |     |     |      |
|     | Vasedeck |                       | Fig.1  | Fixedcorotated    |     |     |                           |     |                      |             |              |       |     |     |      |
|     |          |                       |        |                   |     |     |                           |     | τ =µ(FEFET           |             | −I)+log(J)I, |       |     |     | (18) |
|     | Ficus    |                       | Fig.2  | Fixedcorotated    |     |     |                           |     |                      |             |              |       |     |     |      |
|     | Fox      |                       | Fig.3  | Fixedcorotated    |     |     | whereJ                    |     | isthedeterminantofFE |             |              | [13]. |     |     |      |
|     | Plane    |                       | Fig.3  | vonMises          |     |     |                           |     |                      |             |              |       |     |     |      |
B.4.Drucker-PragerPlasticity
|     | Toast      |     | Fig.3 | Fixedcorotated   |     |     |               |        |         |       |                |     |            |     |      |
| --- | ---------- | --- | ----- | ---------------- | --- | --- | ------------- | ------ | ------- | ----- | -------------- | --- | ---------- | --- | ---- |
|     | Ruins      |     | Fig.3 | Drucker-Prager   |     |     |               |        |         |       |                |     |            |     |      |
|     |            |     |       |                  |     |     | The           | return | mapping | of    | Drucker-Prager |     | plasticity | for | sand |
|     | Jam        |     | Fig.3 | Herschel-Bulkley |     |     | [17]is,givenF |        |         | =UΣVT | andϵ=log(Σ),   |     |            |     |      |
|     | SofaSuite  |     | Fig.3 | Fixedcorotated   |     |     |               |        |         |       |                |     |            |     |      |
|     | Materials  |     | Fig.6 | Fixedcorotated   |     |     |               |        |         | FE    | =UZ(Σ)VT,      |     |            |     | (19) |
|     | Microphone |     | Fig.7 | Neo-Hookean      |     |     |               |        |         |       |                |     |            |     |      |
|     | Bread      |     | Fig.9 | Fixedcorotated   |     |     |               |        |         |       |                |     |            |     |      |

|     | Cake |     | Fig.9 | Herschel-Bulkley |     |     |     |     | 1,  |     |     | sum(ϵ)>0, |     |     |     |
| --- | ---- | --- | ----- | ---------------- | --- | --- | --- | --- | --- | --- | --- | --------- | --- | --- | --- |

|     | Can |     | Fig.9 | vonMises |     |     |     |     | Σ,  |     |     | δγ ≤0, | and | sum(ϵ)≤0, |     |
| --- | --- | --- | ----- | -------- | --- | --- | --- | --- | --- | --- | --- | ------ | --- | --------- | --- |
Z(Σ)=
|     | Wolf |     | Fig.9 | Drucker-Prager |     |     |     |     |        | (cid:16) | (cid:17) |            |     |     |     |
| --- | ---- | --- | ----- | -------------- | --- | --- | --- | --- | ------ | -------- | -------- | ---------- | --- | --- | --- |
|     |      |     |       |                |     |     |     |     |  exp | ϵ−δγ     | ϵˆ ,     | otherwise. |     |     |     |
∥ϵˆ∥
(20)
|     |     | Table3.MaterialParameters. |     |     |     |     |     |     |     |     |     |     | (cid:113) |     |     |
| --- | --- | -------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --------- | --- | --- |
2sinϕf
|     |          |         |     |               |     |     | Hereδγ |                     | = ∥ϵˆ∥+α(dλ+2µ)sum(ϵ),α |     |            |     | = 2      |     | ,and |
| --- | -------- | ------- | --- | ------------- | --- | --- | ------ | ------------------- | ----------------------- | --- | ---------- | --- | -------- | --- | ---- |
|     |          |         |     |               |     |     |        |                     |                         |     | 2µ         |     | 33−sinϕf |     |      |
|     | Notation | Meaning |     | RelationtoE,ν |     |     |        |                     |                         |     |            |     |          |     |      |
|     |          |         |     |               |     |     | ϕ      | isthefrictionangle. |                         |     | ϵˆ=dev(ϵ). |     |          |     |      |
f
|     | E   | Young’smodulus |     | /   |     |     |                        |     |     |     |     |     |     |     |     |
| --- | --- | -------------- | --- | --- | --- | --- | ---------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
|     | ν   | Poisson’sratio |     | /   |     |     | B.5.vonMisesPlasticity |     |     |     |     |     |     |     |     |
|     | µ   |                |     | µ=  | E   |     |                        |     |     |     |     |     |     |     |     |
Shearmodulus Similar to Drucker-Prager plasticity, given F = UΣVT
|                                 |     |             |         |     | 2(1 +ν)     |     |              |     |     |     |           |     |     |     |     |
| ------------------------------- | --- | ----------- | ------- | --- | ----------- | --- | ------------ | --- | --- | --- | --------- | --- | --- | --- | --- |
|                                 | λ   | Lame´       | modulus | λ=  | Eν          |     |              |     |     |     |           |     |     |     |     |
|                                 |     |             |         |     | (1+ν)(1−2ν) |     | andϵ=log(Σ), |     |     |     |           |     |     |     |     |
|                                 | κ   | Bulkmodulus |         | κ=  | E           |     |              |     |     |     |           |     |     |     |     |
|                                 |     |             |         |     | 3(1−2ν)     |     |              |     |     | FE  | =UZ(Σ)VT, |     |     |     |     |
| B.ElasticityandPlasticityModels |     |             |         |     |             |     | where        |     |     |     |           |     |     |     |     |
(cid:40)
|                                                 |     |     |     |     |           |     |     |       |     | Σ,       |     | δγ           | ≤0, |     |      |
| ----------------------------------------------- | --- | --- | --- | --- | --------- | --- | --- | ----- | --- | -------- | --- | ------------ | --- | --- | ---- |
| Weadopttheconstitutivemodelsusedin[53].         |     |     |     |     | Welistthe |     |     |       |     |          |     |              |     |     |      |
|                                                 |     |     |     |     |           |     |     | Z(Σ)= |     | (cid:16) |     | (cid:17)     |     |     | (21) |
|                                                 |     |     |     |     |           |     |     |       |     | exp ϵ−δγ | ϵˆ  | , otherwise, |     |     |      |
| modelsusedforeachsceneinTab.2andsummarizeallthe |     |     |     |     |           |     |     |       |     |          | ∥ϵ  | ∥            |     |     |      |
parametersneededindiscussingtheconstitutivemodelsin
|        |     |     |     |     |     |     | andδγ | =∥ϵˆ∥ |     | − τ Y .Hereτ |     | istheyieldstress. |     |     |     |
| ------ | --- | --- | --- | --- | --- | --- | ----- | ----- | --- | ------------ | --- | ----------------- | --- | --- | --- |
| Tab.3. |     |     |     |     |     |     |       |       | F   | 2 µ          | Y   |                   |     |     |     |
Inallplasticitymodelsusedinourwork,thedeformation
B.6.Herschel-BulkleyPlasticity
| gradient | ismultiplicatively |     | decomposedinto |     | F = | FEFP |     |     |     |     |     |     |     |     |     |
| -------- | ------------------ | --- | -------------- | --- | --- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
followingsomeyieldstresscondition. Ahyperelasticcon- We follow Yue et al. [52] and take the simple case where
stitutive model is applied to FE to compute the Kirch- h = 1.Denotestrial = dev(τtrial),andstrial = ||strial||.The
(cid:113)
hoffstressτ.Forapureelasticcontinuum,wesimplytake yieldconditionisΦ(s)=s− 2σ ≤0.Ifitisviolated,
3 Y
FE =F.
wemodifystrialby
| B.1.FixedCorotatedElasticity |     |     |             |     |     |     |     |           |     | (cid:32) |           | (cid:33) |      |          |     |
| ---------------------------- | --- | --- | ----------- | --- | --- | --- | --- | --------- | --- | -------- | --------- | -------- | ---- | -------- | --- |
|                              |     |     |             |     |     |     |     |           |     |          | (cid:114) | (cid:18) |      | (cid:19) |     |
|                              |     |     |             |     |     |     |     |           |     |          | 2         |          |      | η        |     |
| TheKirchhoffstressτ          |     |     | isdefinedas |     |     |     |     | s=strial− |     | strial−  | σ         | /        | 1+   |          | .   |
|                              |     |     |             |     |     |     |     |           |     |          | 3         | Y        | 2µ∆t |          |     |
−R)FET
|     | τ   | =2µ(FE |     | +λ(J | −1)J, | (16) |     |          |              |     |        |     |          |        |      |
| --- | --- | ------ | --- | ---- | ----- | ---- | --- | -------- | ------------ | --- | ------ | --- | -------- | ------ | ---- |
|     |     |        |     |      |       |      | s   | can then | be recovered |     | as s = | s · | strial . | Define | bE = |
||strial||
| whereR=UVT |     | andFE | =UΣVT | isthesingularvalue |     |     |     |     |     |     |     |     |     |     |     |
| ---------- | --- | ----- | ----- | ------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
FEFET
decompositionofelasticdeformationgradient. J isthede- .TheKirchhoffstressτ iscomputedas
terminantofFE
|                    |     | [13]. |     |     |     |     |     |     | κ(cid:0) | (cid:1) |        | (cid:104) |     | (cid:105) |     |
| ------------------ | --- | ----- | --- | --- | --- | --- | --- | --- | -------- | ------- | ------ | --------- | --- | --------- | --- |
|                    |     |       |     |     |     |     |     | τ   | = J2−1   |         | I+µdev | det(bE)−1 |     | 3bE .     |     |
| B.2.StVKElasticity |     |       |     |     |     |     |     |     | 2        |         |        |           |     |           |     |
C.AdditionalEvaluations
| TheKirchhoffstressτ |     |     | isdefinedas |     |     |     |     |     |     |     |     |     |     |     |     |
| ------------------- | --- | --- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
=U(2µϵ+λsum(ϵ)1)VT, We present additional evaluations of our method in Fig. 9.
|     |     | τ   |     |     |     | (17) |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
ThevasedeckdataisfromtheNerfdataset[24]andtheoth-
| whereϵ=log(Σ)andFE |     |     | =UΣVT |       |     |     |                                                    |     |     |     |     |     |     |     |     |
| ------------------ | --- | --- | ----- | ----- | --- | --- | -------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
|                    |     |     |       | [17]. |     |     | ersaresyntheticdata,generatedusingBlenderNeRF[34]. |     |     |     |     |     |     |     |     |
12

Static Physics-based Dynamics
Figure9.AdditionalEvaluation.Examplesfromtoptobottomare:vasedeck(elasticentity),bread(fracture),cake(viscoplasticmaterial),
can(metal)andwolf (granularmaterial).
13
