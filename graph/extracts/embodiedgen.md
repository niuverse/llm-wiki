| EmbodiedGen:                |                  | Towards      | a Generative |                           | 3D          | World Engine |
| --------------------------- | ---------------- | ------------ | ------------ | ------------------------- | ----------- | ------------ |
|                             |                  | for Embodied |              | Intelligence              |             |              |
| XinjieWang1                 |                  | LiuLiu1      | YuCao2       | RuiqiWu5,1                |             | WenkangQin2  |
|                             | DehuiWang4,3     |              | WeiSui3      | ZhizhongSu1               |             |              |
|                             | 1HorizonRobotics |              | 2GigaAI      |                           | 3D-Robotics |              |
| 4ShanghaiJiaoTongUniversity |                  |              |              | 5VCIP,CS,NankaiUniversity |             |              |
5202 nuJ 61  ]OR.sc[  2v00601.6052:viXra
Alarm clock
Robot holds
a sign
Electric drill
Ceramic vase
……
Object & Texture Generation
Articulated Object Generation 3D Scene Generation
A living room with a  A modern kitchen
ceiling fan and curtains with warm lighting
Figure1. EmbodiedGen,atoolkitforembodiedintelligenceinteractive3Dworldgeneration. EmbodiedGenenablescontrollablegen-
erationofrigidandarticulatedassetswithaccuratereal-worldscaleandphysicalproperties,alongwithstylisticallydiversebackground
generation and visually rich texture generation and editing. These assets can be seamlessly integrated into various simulators such as
OpenAIGym[4],IsaacLab[26],MuJoCo[42]andSAPIEN[49].Thesecapabilitiesformafoundationfordigitaltwinning,large-scaledata
augmentationandembodiedintelligencetaskssuchasmanipulationandnavigationacrossawiderangeofsimulationenvironments.
1

Abstract basedgenerativemodels[16,29,37,47]and3Dassetgen-
eration [5, 11, 12, 23, 31, 57] have sparked growing inter-
Constructing a physically realistic and accurately scaled est in bridging this gap. However, existing 3D generation
simulated 3D world is crucial for the training and evalu- toolkitoftenfallshortforroboticsapplications,asconven-
ationofembodiedintelligencetasks. Thediversity,realism, tionalgraphicsassetstypicallylackphysicalrealism,water-
low cost accessibility and affordability of 3D data assets tightgeometryandaccuratescale,leadingtounreliablecol-
are critical for achieving generalization and scalability in lision modeling and unrealistic interactions in simulators.
embodiedAI.However,mostcurrentembodiedintelligence We introduce EmbodiedGen, a toolkit for interactive 3D
tasksstillrelyheavilyontraditional3Dcomputergraphics worldgeneration,enableslow-cost,high-quality,andhighly
assets manually created and annotated, which suffer from controllable asset generation in URDF, complete with wa-
high production costs and limited realism. These limita- tertight geometry and physically plausible properties. Our
tions significantly hinder the scalability of data driven ap- maincontributionsare:
proaches. We present EmbodiedGen, a foundational plat- 1. Toolkit for interactive 3Dworld generation. Embod-
form for interactive 3D world generation. It enables the iedGen is the first comprehensive toolkit for generating
scalable generation of high-quality, controllable and pho- interactive 3D worlds to the needs of embodied intel-
torealistic3Dassetswithaccuratephysicalpropertiesand ligence related research. It supports real-to-sim digital
real-worldscaleintheUnifiedRoboticsDescriptionFormat twincreationandenablesthecontrollablegenerationof
(URDF)atlowcost. Theseassetscanbedirectlyimported diverse3Dassets,whichcanbeseamlesslyimportedinto
into various physics simulation engines for fine-grained simulators.
physical control, supporting downstream tasks in train- 2. Physicallyaccurate,simulator-readyassetswithhigh
ing and evaluation. EmbodiedGen is an easy-to-use, full- fidelity. EmbodiedGen generates assets that not only
featuredtoolkitcomposedofsixkeymodules:Image-to-3D, achievestate-of-the-artvisualqualitybutarealsophysi-
Text-to-3D,TextureGeneration,ArticulatedObjectGenera- callyplausibleandreadyfordirectuseinsimulationen-
tion,SceneGenerationandLayoutGeneration. Embodied- vironments.Eachassetisenrichedwithphysicalproper-
Gengeneratesdiverseandinteractive3Dworldscomposed ties,inspectionmetadata,textualdescriptions,watertight
ofgenerative3Dassets,leveraginggenerativeAItoaddress geometryanddualrepresentationsinboth3DGaussian
thechallengesofgeneralizationandevaluationtotheneeds Splatting(3DGS)andmeshformats.
ofembodiedintelligencerelatedresearch. EmbodiedGen1 3. Accessible and open-source. We release easy-to-use,
arepubliclyavailabletofosterfutureresearch. open-sourcedpipelinesandservicestofacilitatecommu-
nitydevelopmentandresearchinembodiedintelligence.
2.RelatedWork
1.Introduction
3D Asset Generation The goal of 3D object generation
Despitetheremarkablesuccessoffoundationmodelssuch
is to produce a corresponding 3D representation from an
as CLIP [35] and GPT [1, 34], which leverage large-
input image or a textual description. Existing approaches
scale internet data, extending this paradigm to the needs
to this task can be broadly categorized into three repre-
of embodied intelligence related research presents signif-
sentativeparadigms: feedforwardgeneration,optimization-
icant challenges. Data collection for embodied AI tasks
based generation, and view reconstruction. Feedforward
is substantially more expensive and constrained, often re-
generation leverages large models to produce a 3D repre-
quiring real world interaction, involving complex physi-
sentationoftheinputpromptinasingleforwardpass. This
cal dynamics, making each data point several orders of
categoryincludesmethodssuchasLRM[11],PixelSplat[5],
magnitude more costly. Moreover, robotic data is of-
GRM[52], and MVSplat[6], which are notable for their
ten context-specific and non-transferable across tasks or
inference time efficiency. Optimization-based genera-
embodiments, severely limiting reusability and scalabil-
tion,asexemplifiedbymethodslikeDreamFusion[30]and
ity. Achieving general-purpose embodied intelligence in
DreamMat[58], directly optimizes the parameters of the
thephysicalworldrequirestechniquessuchasdigitaltwins,
3D representation using score distillation sampling (SDS)
simulation-basedaugmentation,andreinforcementlearning
guided by diffusion models and differentiable rendering.
in physically realistic environments. These goals demand
This often results in higher-quality outputs at the cost of
accesstolarge-scale,diverse,andhigh-quality3Dassetli-
increased computation time. View reconstruction methods
braries,aswellasefficientpipelinesforrapidlyconstructing
generate multi-view 2D images and reconstruct the final
interactive3Denvironments. Recentadvancesindiffusion
3D representation via sparse-view geometry. Representa-
1https://horizonrobotics.github.io/robot_lab/ tiveworksinthislineincludeZero123[22],Unique3d[46],
embodied_gen/index.html MVDream[39], and MV-Adapter[17]. Driven by the
2

|     | User Input |     |     | SceneDesigner |     |     | AssetsGenerator |     |     | Scene Composer |     |
| --- | ---------- | --- | --- | ------------- | --- | --- | --------------- | --- | --- | -------------- | --- |
Real World Image  Identify all interactable  Object&Texture Generation DigitalTwins
objects and background.
Img-to-3D Object
Laptop
Generation (Sec. 3.1)
Water bottle
Rectangular box
Headphones
Text-to-3D Object
Smartphone
Generation  (Sec. 3.2)
Power bank
|     |     |     | Canned Coke   |     |     |     |                    |     | InteractiveScenes |     |     |
| --- | --- | --- | ------------- | --- | --- | --- | ------------------ | --- | ----------------- | --- | --- |
|     |     |     | Phone holder  |     |     |     | Texture Generation |     |                   |     |     |
(Sec. 3.4)
Setup the scene composition
TaskDescription
and layout for the task.
Task1: PiPERrobotic arm  Task: Dual-arm grasping Articulated Object
| picks shoes |     |     | Robot: PiPERrobotic arm  |     |     |     | Generation (Sec. 3.3) |     |     |     |     |
| ----------- | --- | --- | ------------------------ | --- | --- | --- | --------------------- | --- | --- | --- | --- |
Background: Bedroom
| Task2: FRANKArobotic arm  |     |     | Context: Table |     |     |     |     |     |     |     |     |
| ------------------------- | --- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- | --- |
places a banana
|                          |     |     | Objects: {            |     |     |     | 3D Scene Generation   |            |     |     |     |
| ------------------------ | --- | --- | --------------------- | --- | --- | --- | --------------------- | ---------- | --- | --- | --- |
| Task3: PiPERrobotic arm  |     |     | manipulated: Shoes, … |     |     |     |                       | (Sec. 3.5) |     |     |     |
distractors: …
opens a drawer to put fruit in
}
Figure2. TheframeworkofEmbodiedGen. Itenablesthecreationofadigitaltwinwithinasimulationenvironmentfromasingleimage.
Alternatively,givenataskdescription,EmbodiedGenautonomouslygeneratesthescenelayout,synthesizesdetailed3Dobjectassets,and
arrangestheminsemanticallyandphysicallyplausibleconfigurations.Thisfacilitatestheeffortlessconstructionofaninteractive3Dworld,
supportingawiderangeofembodiedintelligencerelatedresearchindiversevirtualenvironments.
demand for higher-quality 3D objects, recent methods Embodied Intelligence Tasks Prior works such as
such as CLAY[56], Hunyuan3D[41], Meta3DGen[3], and RoboTwin[28], Gen2Sim[18], MatchMaker[45] and
Trellis[50] have adopted a decoupled pipeline separating ACDC[9] have explored using 3D generation techniques
geometry and texture generation into two stages, followed to augment asset libraries within simulators. However,
by texture reprojection tofuse geometry with realistic tex- due to limitations in the quality and efficiency of 3D
tures. Beyond rigid object generation, methods such as generation, the diversity of assets remains limited, and the
URDFormer[7] and SINGAPO[21] have been proposed to environmentsareoftenrestrictedtosimplisticbackgrounds,
generate articulated objects. However, these methods are which are insufficient for large-scale data generation and
primarilylimitedtographics-centricobjectgeneration. The evaluationinembodiedintelligencetasks. Toaddressthese
resulting objects lack real-world scale and physical prop- challenges,weproposeEmbodiedGen,adata-centricfoun-
erties, and there is no guarantee of watertightness or geo- dation for embodied AI, enables the generation of diverse
metricintegrity. Theselimitationssignificantlyhindertheir object and background assets from either images or text
directapplicabilityinphysics-basedsimulators. prompts, and supports texture editing for enhanced visual
|     |     |     |     |     |     | richness. | This      | framework     | effectively | supports          | real-to-sim |
| --- | --- | --- | --- | --- | --- | --------- | --------- | ------------- | ----------- | ----------------- | ----------- |
|     |     |     |     |     |     | transfer, | data      | augmentation, | and         | physics-based     | simulation  |
|     |     |     |     |     |     | in        | different | simulators[4, | 26, 42,     | 49], accelerating | the         |
developmentofembodiedintelligencesystems.
| 3D              | Scene | Generation | Recent   | methods      | like |     |     |     |     |     |     |
| --------------- | ----- | ---------- | -------- | ------------ | ---- | --- | --- | --- | --- | --- | --- |
| LucidDreamer[8] |       | adopt      | 3DGS[19] | for flexible | and  |     |     |     |     |     |     |
consistent scene rendering, but are mainly limited to 3.Generative3DWorldEngine
| forwardfacingviews. |     | Toenablefull360°scenegeneration, |     |     |     |     |     |     |     |     |     |
| ------------------- | --- | -------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
panoramic representations have been explored. PERF[43] We present EmbodiedGen, a novel framework for gener-
|     |     |     |     |     |     | ating | interactive | 3D worlds | to the | needs of | embodied in- |
| --- | --- | --- | --- | --- | --- | ----- | ----------- | --------- | ------ | -------- | ------------ |
pioneeredpanoramicNeRFsfornovelviewsynthesisfrom
asinglepanorama. DreamScene360[60],HoloDreamer[59] telligence related research. Leveraging generative AI, our
andWorldGen[51]extendedthiswithpanoramicGaussian approachenables thecreationofdiverse, customizable en-
vironmentsthatsupportthedevelopmentandevaluationof
| splatting, | while | LayerPano3D[53] |     | introduced | layered |     |     |     |     |     |     |
| ---------- | ----- | --------------- | --- | ---------- | ------- | --- | --- | --- | --- | --- | --- |
panoramas that are lifted into 3D splatting for handling embodiedagents(seeFigure2).
complex scenes. However, these methods are limited to Inthissection,wefirstpresentthe3Dobjectgeneration
generating static 3D scenes without interactivity, mak- modules, including Image-to-3D, which generates physi-
ing them unsuitable for the requirements of embodied callyrealistic3Dobjectassetsfromasingleimagetofacil-
intelligencerelatedresearch. itatedigitaltwincreation(Sec.3.1),andText-to-3D,which
3

Input Image-to-3D Quality Inspection Physics Restoration Data Storage
|     |     |     |     |     |     | fail | success |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | ---- | ------- | --- | --- | --- | --- | --- |
Real height: 1.2m
Mass: 60kg
Aesthetic score: 4.62
|     |     |     |     |     |     |     |     | Friction coefficient: 0.8 |     |     |     | URDF  |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------- | --- | --- | --- | ----- |
Segmentation: Pass
|     |     |     |     |     |     |     |     | Category: humanoid  |     |     |     | Convertor |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------- | --- | --- | --- | --------- |
Geometric Rationality:No
robot
Conclusion:
Text description:
The object lacks feet or a
bipedal robot with
stable base, making it
|     |     |     |     |     |     |     |     | articulated limbs and  |     |     |     | 3D Assets  |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------------------- | --- | --- | --- | ---------- |
unable to stand stably on
|           |     |     |                   |     |     |             |     | sleek design    |     |     |     | URDF |
| --------- | --- | --- | ----------------- | --- | --- | ----------- | --- | --------------- | --- | --- | --- | ---- |
|           |     |     |                   |     |     | the ground. |     | Version: v1.0.0 |     |     |     |      |
| Raw Image |     |     | Mesh & 3DGS repr. |     |     |             |     |                 |     |     |     |      |
Figure3. OverviewofEmbodiedGenImage-to-3DPipeline. Fromasingleimage,thesystemgeneratesmeshand3DGSassets,conducts
automatic quality inspectioin (aesthetics, segmentation, geometry), and re-generate failed outputs by auto-adjusted settings. A physics
expertmodulerestoresreal-worldscaleandphysicalsemantics,andtheassetsaresavedinURDFformat.
generates 3D objects from text descriptions for low cost, textures;(3)developingadiffusion-basedmodelforarticu-
high-quality data augmentation (Sec.3.2). We then intro- lated3Dobjectgenerationtomeetthegrowingdemandfor
duce Articulated Object Generation (Sec.3.3), which pro- complexdataassetsindiversesimulationtasks.
| duces manipulable |     | articulated |     | 3D assets | from | either dual- |     |     |     |     |     |     |
| ----------------- | --- | ----------- | --- | --------- | ---- | ------------ | --- | --- | --- | --- | --- | --- |
state image pairs or text descriptions. Texture Generation PhysicallyRealistic3DAssetGeneration Asillustrated
| is described | in  | Sec.3.4, | enabling | highly | controllable | and |           |       |          |             |             |           |
| ------------ | --- | -------- | -------- | ------ | ------------ | --- | --------- | ----- | -------- | ----------- | ----------- | --------- |
|              |     |          |          |        |              |     | in Figure | 3, we | leverage | Trellis[50] | to generate | 3D repre- |
multi-styletextureeditingfor3Dassets.Finally,wepresent
|     |     |     |     |     |     |     | sentations | of input | images. | We  | further employ | GPT-4o[1] |
| --- | --- | --- | --- | --- | --- | --- | ---------- | -------- | ------- | --- | -------------- | --------- |
SceneGeneration(Sec.3.5),whichgeneratesdiverseback- andQwen[10]tobuildaphysicsexpertagent. Specifically,
groundenvironmentsandsupportsthecompositionofinter-
|     |     |     |     |     |     |     | the agent | estimates | the | real-world | height | of the asset by |
| --- | --- | --- | --- | --- | --- | --- | --------- | --------- | --- | ---------- | ------ | --------------- |
active3Dscenes. renderingafrontalviewofthegeneratedobjectandapply-
|     |     |     |     |     |     |     | ing text | prompt | constraints. | Given | that width, | length, and |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------ | ------------ | ----- | ----------- | ----------- |
3.1.Image-to-3DObjectGeneration
|                |     |                                   |     |     |     |     | heightareinterdependent,                      |     |     | scalingtheheightenablesaccu- |     |     |
| -------------- | --- | --------------------------------- | --- | --- | --- | --- | --------------------------------------------- | --- | --- | ---------------------------- | --- | --- |
|                |     |                                   |     |     |     |     | raterecoveryofthemeshand3DGS’struedimensions. |     |     |                              |     | For |
| MethodOverview |     | Thecapabilitiesofcommunity-driven |     |     |     |     |                                               |     |     |                              |     |     |
3D object asset generation are rapidly advancing and are assetswithinherentambiguityinsize,atext-guidedphysi-
calpropertyrestorationinterfaceisavailable,allowingusers
| expected  | to continue |     | improving. | To             | fully leverage | this      |            |         |        |          |            |                  |
| --------- | ----------- | --- | ---------- | -------------- | -------------- | --------- | ---------- | ------- | ------ | -------- | ---------- | ---------------- |
|           |             |     |            |                |                |           | to specify | context | (e.g., | “a tiger | plush toy” | or “a tiger ani- |
| progress, | we focus    | on  | building   | an image-to-3D |                | system to |            |         |        |          |            |                  |
theneedsofembodiedintelligencerelatedresearch.Forthe mal”)formoreaccuratesizeprediction. Givenfourortho-
|                  |     |     |          |             |         |      | graphic | views of | a rendered | 3D  | asset as input, | the physics |
| ---------------- | --- | --- | -------- | ----------- | ------- | ---- | ------- | -------- | ---------- | --- | --------------- | ----------- |
| model component, |     | we  | leverage | open-source | models. | This |         |          |            |     |                 |             |
approach ensures that our image-to-3D capabilities can be expert agent can further estimate physical properties such
asfrictioncoefficientandmass,associatethemwithseman-
| easily extended |     | as community |     | models | improve. | Specifi- |     |     |     |     |     |     |
| --------------- | --- | ------------ | --- | ------ | -------- | -------- | --- | --- | --- | --- | --- | --- |
ticdescriptions,andcategorizetheobject3Dassetsaccord-
cally,weuseTrellis[50]duetoitssuperiorgeometricgen-
| erationqualityanditsabilitytoproduceconsistent3Drep- |     |           |     |          |          |      | ingly. |     |     |     |     |     |
| ---------------------------------------------------- | --- | --------- | --- | -------- | -------- | ---- | ------ | --- | --- | --- | --- | --- |
| resentations                                         | in  | both mesh | and | 3DGS[19] | formats. | How- |        |     |     |     |     |     |
ever,Trellishasseverallimitationsthathinderitsdirectuse Automated Quality Inspection We develop an auto-
in embodied AI tasks: the generated textures exhibit poor mated quality inspection module, utilizing the Aesthetic-
visual quality, particularly due to excessive highlights that Checker [38] as a measure of visual quality, as it has a
result in noticeable whitening when baked onto the mesh. positivecorrelationwithtexturerichness,seeFigure4. We
Additionally, the resulting files are purely graphical assets foundthatthequalityofforegroundsegmentationhasasig-
withoutreal-worldscale,physicalproperties,orphysically nificant impact on the quality of 3D asset generation, so
wefurtherbuildaImageSegCheckerusingGPT-4oforfore-
| plausible | geometry, | making | them | unsuitable | for | direct use |     |     |     |     |     |     |
| --------- | --------- | ------ | ---- | ---------- | --- | ---------- | --- | --- | --- | --- | --- | --- |
in physics simulators[26, 42, 49]. We focus on three key groundextractionqualityassessment, seeFigure5. Toen-
improvements: (1) developing a complete data twinning sure robust segmentation quality across different domains,
pipelineforembodiedintelligenceassetgeneration,capable weprovidethreedifferentforegroundsegmentationmodels,
of producing data assets with realistic properties, accurate SAM[20],REMBG[15],RMBG14[2].IfImageSegChecker
scale, and physically consistent watertight geometry that detectsasegmentationfailure,thesystemswitchestoanal-
can be directly imported into simulation engines; (2) en- ternativemodelforretry. AMeshGeoChecker inspectsthe
hancing texture quality by applying highlight removal and assetbyrenderingfourorthogonalviewsandassessingge-
super-resolution, resulting in high-quality, high-resolution ometriccompletenessandrationality, seeFigure6. Assets
4

that pass the quality inspection are converted into URDF presentinFigure7theimprovementinmeshtexturequality
formatandstored. Thosethatfailanystageofthepipeline achievedbytheoptimizedtextureback-projectionmodule.
aresentbacktothecorrespondinggenerationstepusingad-
justedsettingsandseeds.
|     |     |     |     |     |     | Algorithm |     | 1: Compute | Texture | by Multi-View |
| --- | --- | --- | --- | --- | --- | --------- | --- | ---------- | ------- | ------------- |
ColorImagesBack-Projection
∈RN×H0×W0×3:
|     |     |     |     |     |     | Input: | I   |     |     | multi-viewcolor |
| --- | --- | --- | --- | --- | --- | ------ | --- | --- | --- | --------------- |
images;
|      |     |      |      |      |      | M=(V,F): |                    | inputmesh,where |              |     |
| ---- | --- | ---- | ---- | ---- | ---- | -------- | ------------------ | --------------- | ------------ | --- |
| 5.31 |     | 5.32 | 5.11 | 4.50 | 4.58 |          |                    |                 |              |     |
|      |     |      |      |      |      |          | V ismeshvertices,F |                 | ismeshfaces; |     |
Figure4. AestheticCheckerisusedtoevaluatethetexturequality
|     |     |     |     |     |     | W   | ∈RN: | viewconfidenceweights; |     |     |
| --- | --- | --- | --- | --- | --- | --- | ---- | ---------------------- | --- | --- |
ofgeneratedassets.Assetsdisplayingrichertexturedetailsreceiv-
70◦).
| inghigherscores. |     |     |     |     |     | θ:      | anglethreshold(default: |                  |     |               |
| ---------------- | --- | --- | --- | --- | --- | ------- | ----------------------- | ---------------- | --- | ------------- |
|                  |     |     |     |     |     | Output: |                         | T ∈RHtex×Wtex×3: |     | textureuvmap. |
1. DelightingColorImage
1
|     |     |     |     |     |     |     | ∈R(N×H0)×W0×3 |     |     | ∈RN×H0×W0×3 |
| --- | --- | --- | --- | --- | --- | --- | ------------- | --- | --- | ----------- |
|     |     |     |     |     |     | 2   | I             |     |     | ←I          |
grid
|     |     |     |     |     |     |     | I ′ =DELIGHT(I |     | )    |                 |
| --- | --- | --- | --- | --- | --- | --- | -------------- | --- | ---- | --------------- |
|     |     |     |     |     |     | 3   | g rid          |     | grid |                 |
|     |     |     |     |     |     | 4   | I ∈RN×H0×W0×3  |     | ←I   | ′ ∈R(N×H0)×W0×3 |
|     |     |     |     |     |     |     | d              |     |      | g rid           |
5 2. SuperResolutionColorImage
NO. The segmentation has truncated
the bottom part of the chair's legs. NO. The legs of the chair are significantly truncated. I ={SR(I )|i=1,...,N}
|     |     |     |     |     |     | 6   | sr  | d,i |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
∈RN×H×W×3
Figure 5. Examples of segmentation failure cases automatically 7 I sr where H =
| filteredbyImageSegChecker. |     |     |     |     |     |     | H ×upscale |     | h, W =W | ×upscale w |
| -------------------------- | --- | --- | --- | --- | --- | --- | ---------- | --- | ------- | ---------- |
|                            |     |     |     |     |     |     | 0          |     |         | 0          |
3. MeshGeometryBufferRendering
8
∈{0,1}N×H×W:
|     |     |     |     |     |     | 9   | M              |     | per-pixelvisibilitymask; |     |
| --- | --- | --- | --- | --- | --- | --- | -------------- | --- | ------------------------ | --- |
|     |     |     |     |     |     |     | D ∈[0,1]N×H×W: |     | normalizeddepthmap;      |     |
10
|     |     |     |     |     |     | 11  | N ∈RN×H×W×3: |     | view-spacenormals; |     |
| --- | --- | --- | --- | --- | --- | --- | ------------ | --- | ------------------ | --- |
∈[0,1]N×H×W×2:
|     |     |     |     |     |     | 12  | U   |     | per-pixelUV; |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ------------ | --- |
4. Back-ProjectionperViewthenFusion
13
|                      |     |                                     |     |     |      |     | v=[0,0,1]T |     |     | ▷Cameraviewdirection |
| -------------------- | --- | ----------------------------------- | --- | --- | ---- | --- | ---------- | --- | --- | -------------------- |
| No. The cup has two  |     | NO. The images show a black object  |     |     | Pass | 14  |            |     |     |                      |
h an d l e s ,  w h i c h  is   u n u s u a l  i n t e rs e c t in g  w i t h   th e  c h a ir ' s  l eg s ,  15 InitializeT =0andC =0 ▷Textureand
| an d  li k e l y  u | n i n te n d e d   fo | r  a   i n d ic     | a ti n g  t h at   t h e  g e | o m e t r y  m a y  be  |     |     |               |     |     |     |
| ------------------- | --------------------- | ------------------- | ----------------------------- | ----------------------- | --- | --- | ------------- | --- | --- | --- |
| typical cup design. |                       | improperly modeled. |                               |                         |     |     | confidencemap |     |     |     |
ExamplesofgeometricrationalityinspectionbyMesh- 16 foreachviewi=1toN do
Figure6.
|             |     |     |     |     |     |     | C   | ←max(0,N | ·v) |     |
| ----------- | --- | --- | --- | --- | --- | --- | --- | -------- | --- | --- |
| GeoChecker. |     |     |     |     |     | 17  |     | i        | i   |     |
C [C <cos(θ)]←0▷Excludelargeangles
|     |     |     |     |     |     | 18  |     | i i      |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | --- | --- |
|     |     |     |     |     |     | 19  | E   | ←Canny(D | )   |     |
|     |     |     |     |     |     |     |     | i        | i   |     |
Texture Back Projection Optimization Unlike meth- M ′ ←M ∧(E <0.5) ▷Excludeedge
|     |     |     |     |     |     | 20  |     | i i | i   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
′
ods like Trellis that rely on optimization-based baking of 21 C i [M =0]←0
i
| multi-viewRGBimagesrenderedfrom3DGS[19]backinto |     |           |          |         |             |     | C                        | ←C ×W |     |          |
| ----------------------------------------------- | --- | --------- | -------- | ------- | ----------- | --- | ------------------------ | ----- | --- | -------- |
|                                                 |     |           |          |         |             | 22  |                          | i i   | i   |          |
|                                                 |     |           |          |         |             |     | foreachvalidpixelpwhereM |       |     | ′[p]=1do |
| 3D space,                                       | our | optimized | approach | employs | a geometry- | 23  |                          |       |     | i        |
determined projection scheme fused with view normals. 24 (u,v)←U [p]×[W ,H ] ▷Map
|     |     |     |     |     |     |     |     |     | i   | tex tex |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------- |
Beforere-projectingtexturesbackinto3Dspace,weapply UVtotexturespace
global highlight removal and super-resolution to the RGB 25 ScatterI i [p]×C i [p]toT(u,v) ▷Scatter
images,resultinginhigh-quality,2KresolutiontextureUV colorwithconfidenceweight
|     |     |     |     |     |     |     |     | ScatterC | [p]toC(u,v) | ▷Scatter |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | ----------- | -------- |
maps. Specifically, we use a delighting model[41] to re- 26 i
move lighting effects from the multi-view textures while confidencemap
| maintaining | consistent |     | style and | brightness | across views. |     | end |     |     |     |
| ----------- | ---------- | --- | --------- | ---------- | ------------- | --- | --- | --- | --- | --- |
27
| WefurtherapplyReal-ESRGAN[44]toindependentlyper- |     |     |     |     |     | 28  | end |     |     |     |
| ------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
form 4x super-resolution on each view, enhancing the res- T = T ▷Texturefusionbyconfidence
|         |               |     |                 |     |                 | 29  | C+ϵ |     |     |     |
| ------- | ------------- | --- | --------------- | --- | --------------- | --- | --- | --- | --- | --- |
| olution | to 2048x2048. |     | Our experiments |     | show that inde- |     |     |     |     |     |
returnT
30
| pendent | super-resolution |     | for each | view | does not compro- |     |     |     |     |     |
| ------- | ---------------- | --- | -------- | ---- | ---------------- | --- | --- | --- | --- | --- |
misetheconsistencyorqualityofthefinal3Dassettexture.
| ThealgorithmicworkflowisillustratedinAlgorithm1. |     |     |     |     | We  |     |     |     |     |     |
| ------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
5

|           |                  |                  |                                 |     |            |       |           | Bohemian terracotta cup with colorful glaze |     |     | Sleek black drone, red sensors |     |
| --------- | ---------------- | ---------------- | ------------------------------- | --- | ---------- | ----- | --------- | ------------------------------------------- | --- | --- | ------------------------------ | --- |
| Figure7.  | Fromlefttoright: |                  | theoriginalimage,theresultofour |     |            |       |           |                                             |     |     |                                |     |
| optimized | texture          | back-projection, |                                 | and | the result | using | Trellis’s |                                             |     |     |                                |     |
originaltextureback-projection.Ourmethodeffectivelymitigates
theinfluenceofhighlightsandshadowsonthemeshtexturewhile
|     |     |     |     |     |     |     |     | Antique brass key, intricate filigree |     |     | Antique pocket watch, exposed gears |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------- | --- | --- | ----------------------------------- | --- |
producingsignificantlysharpertexturedetails.
3.2.Text-to-3DObjectGeneration
| Method | Overview | The | Text-to-3D |     | module | is designed |     |     |     |     |     |     |
| ------ | -------- | --- | ---------- | --- | ------ | ----------- | --- | --- | --- | --- | --- | --- |
forhighlycontrollablegenerationof3Dobjectassetswith
| diverse geometry |               | and  | textures.  | To  | achieve | this, the     | text-  |                                       |     |     |                                      |     |
| ---------------- | ------------- | ---- | ---------- | --- | ------- | ------------- | ------ | ------------------------------------- | --- | --- | ------------------------------------ | --- |
|                  |               |      |            |     |         |               |        | Screwdriver with bright orange handle |     |     | European style wooden dressing table |     |
| to-3D task       | is decomposed |      | into       | two | stages: | text-to-image |        |                                       |     |     |                                      |     |
| and image-to-3D. |               | This | decoupling |     | brings  | several       | advan- |                                       |     |     |                                      |     |
tages. Inlarge-scaleassetproduction,itenablesearly-stage
| automatic       | quality | inspection, |            | allowing     | the | system | to fil- |     |     |     |     |     |
| --------------- | ------- | ----------- | ---------- | ------------ | --- | ------ | ------- | --- | --- | --- | --- | --- |
| ter out samples |         | that fail   | foreground | segmentation |     | check  | or      |     |     |     |     |     |
containsemanticsinconsistentwiththetextdescriptionbe- Heavy-duty drill with metal casing Pastel pink fascinator with lace and pearls
|     |     |     |     |     |     |     |     | Ours  | Trellis-text-xlarge |     | Ours  | Trellis-text-xlarge |
| --- | --- | --- | --- | --- | --- | --- | --- | ----- | ------------------- | --- | ----- | ------------------- |
forecommittingcomputationalresourcesto3Dgeneration.
More importantly, this modular design improves iteration Figure 8. Qualitative comparison of Text-to-3D result. The left
flexibility and reduces maintenance costs. It also allows column shows results generated by our method, while the right
|              |     |               |      |         |     |              |     | column shows | results | from TRELLIS-text-xlarge. |     | Our method |
| ------------ | --- | ------------- | ---- | ------- | --- | ------------ | --- | ------------ | ------- | ------------------------- | --- | ---------- |
| the pipeline | to  | fully benefit | from | ongoing |     | advancements |     |              |         |                           |     |            |
in the text-to-image and image-to-3D communities, sup- producessignificantlyhigher-qualityoutputsthatbetteralignwith
theinputtextdescriptions.
portingcontinuousimprovementincontrollability,scalabil-
| ity, and | asset generation |     | quality. | Specifically, |     | Kolors[40] |     |                   |     |               |             |              |
| -------- | ---------------- | --- | -------- | ------------- | --- | ---------- | --- | ----------------- | --- | ------------- | ----------- | ------------ |
|          |                  |     |          |               |     |            |     | Prompt Generation |     | Text to Image | Image to 3D | Data Storage |
is used as our text-to-image generation model, as it sup- 100, different styles cups success Quality
fail Inspection
| portshigh-qualityimagegenerationfrombothChineseand |          |     |                 |     |        |     |       |                             |     |     |     | success     |
| -------------------------------------------------- | -------- | --- | --------------- | --- | ------ | --- | ----- | --------------------------- | --- | --- | --- | ----------- |
|                                                    |          |     |                 |     |        |     |       | •Minimalist white ceramic   |     |     |     | Physics     |
| English                                            | prompts. | For | the image-to-3D |     | stage, | we  | main- | cup with sleek handle.      |     |     |     |             |
|                                                    |          |     |                 |     |        |     |       | •Industrial stainless steel |     |     |     | Restoration |
tainasingleunifiedservice,EmbodiedGenImage-to-3D,to mug with matte finish. URDF
•Vintage crystal glass with
streamlinesystemcomplexity. AsshowninFigure8,com- intricate cut patterns. convertor
•Bohemian terracotta cup
pared to Trellis-text-xlarge[50], our two-stage design of- 3D Assets
with colorful glaze.
|               |     |                 |     |            |     |          |       | •…… |     | ……  | ……  | URDF |
| ------------- | --- | --------------- | --- | ---------- | --- | -------- | ----- | --- | --- | --- | --- | ---- |
| fers improved |     | controllability | and | generation |     | quality, | while |     |     |     |     |      |
significantlyreducingthemaintenancecostassociatedwith Figure9.EmbodiedGenText-to-3Dmoduleforlarge-scale3Das-
setgeneration.Apromptgeneratordecomposesuserrequirements
| end-to-endtext-to-3Dmodels. |     |     |     | Thelarge-scaleassetgener- |     |     |     |     |     |     |     |     |
| --------------------------- | --- | --- | --- | ------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
intopromptstargetingdifferentassetstyles.Thepipelineproceeds
ationworkflowfortext-to-3DisillustratedinFigure9.
|     |     |     |     |     |     |     |     | through text-to-image |     | and image-to-3D | stages, | each equipped |
| --- | --- | --- | --- | --- | --- | --- | --- | --------------------- | --- | --------------- | ------- | ------------- |
withautomaticqualityinspectionandretrymechanisms.Thefinal
EvaluationofAutomatedQualityInspection Weevalu- URDFassetwithcompletegeometry,realisticscale,andphysical
atetheefficiencyoftheautomatedqualityinspectionmod- properties,ispersistentlystored.
| ule in large-scale |     | 3d asset | generation. |     | We  | construct | the |     |     |     |     |     |
| ------------------ | --- | -------- | ----------- | --- | --- | --------- | --- | --- | --- | --- | --- | --- |
automated quality inspection pipeline based on Aesthetic- unusable assets that are correctly flagged by the checkers.
| Checker, | ImageSegChecker, |     |     | MeshGeoChecker, |     |     |     |     |     |     |     |     |
| -------- | ---------------- | --- | --- | --------------- | --- | --- | --- | --- | --- | --- | --- | --- |
and as in- We generated 150 cup 3d assets and manually annotated
troducedinSection3.1. Duringevaluation,ageneratedas- them. Amongthese, 107werelabeledasusableand43as
set is considered usable if it satisfies the following crite- unusable. Theautomatedqualityinspectionachievedapre-
ria: geometric and textural consistency with the input text cisionof68.7%andarecallof76.7%. Whilethesemetrics
description, geometric completeness, texture richness, and arenotyetabove90%,thecurrentsystemsubstantiallyre-
compatibilitywithsimulationengines.Otherwise,itisclas- ducesthemanualeffortrequiredforassetscreening. More-
sifiedasunusable. Wedefineprecisionastheproportionof over, we expect that this pipeline will continue to improve
assetsidentifiedasunusablebytheautomatedcheckersthat asmulti-modallargemodelsadvance,furtherenhancingau-
areindeedunusable,andrecallastheproportionofalltruly tomatedqualityassessmentinthefuture.
6

3.3.ArticulatedObjectGeneration
Articulatedobjectssuchascabinets,drawersandappliances
| are common | in  | real world | environments. |     | Modeling | these |     |     |     |     |     |     |     |
| ---------- | --- | ---------- | ------------- | --- | -------- | ----- | --- | --- | --- | --- | --- | --- | --- |
objectsaccuratelyrequiresnotonlycapturingtheirgeomet- A   s t o r a g e  f u r n i t u r e  w it h  t w o  d o o r s  o n   t h e  t o p ,  A   s to r a g e  f u r n i tu r e  w it h   f o u r   d o o r s  o n   t h e  t o p ,
|               |               |                    |                 |       |                |          | t h r e e   d r a | w e r s  i n   t h e  m id | d l e,  a n d  o n e   d r a w e | r  a t   | t h r e e  d r a w e r              | s  i n  t h e  m i d d | l e ,  a n d   s ix   d r a w e r s  a t   |
| ------------- | ------------- | ------------------ | --------------- | ----- | -------------- | -------- | ----------------- | -------------------------- | -------------------------------- | -------- | ----------------------------------- | ---------------------- | ------------------------------------------ |
|               |               |                    |                 |       |                |          |                   | the bottom.                |                                  |          | the bottom arranged in two columns. |                        |                                            |
| ric structure | but           | also understanding |                 | their | motion         | behavior |                   |                            |                                  |          |                                     |                        |                                            |
| and part      | connectivity. |                    | This capability |       | is fundamental | for      |                   |                            |                                  |          |                                     |                        |                                            |
| tasks in      | virtual       | simulation,        | robotics,       | and   | interactive    | envi-    |                   |                            |                                  |          |                                     |                        |                                            |
ronments[14,27,33]. A  s t o r a g e   f u r n i t u r e   w i t h   t w o   l a r g e   d o o r s  a t   t h e   t o p ,
|     |     |     |     |     |     |     | e i g h t   s m a l l  | d r a w e r s  i n   t h   | e   m i d d le   a r r a n g e d   i | n   t w o   d A r a   | s w t e o r r s a   g in e     t f h u e r   n m i | t i u d r d e le   w   a i t r h r a   f n o g u e | r d   d  i o n o   t r w s o  a  r t o  t w h s e     o t f o   p t , h   s r i e x e   ,  |
| --- | --- | --- | --- | --- | --- | --- | ---------------------- | -------------------------- | ------------------------------------ | --------------------- | -------------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------ |
|     |     |     |     |     |     |     | co l u m n s   o f   f | o u r ,  a n d   o n e   w | id e   d r a w e r   a t  t h e   b  | o t t o m . t w       | o  l a r g e r   d r a w                           | e r s   i n   t h e   m i                          | d d l e ,   a n d  t w o   s m a l le r                                                    |
drawers on the left and right sides at the bottom.
| MethodOverview |           | WeuseDIPO[48],acontrollablegen- |            |             |     |            |     |     |     |     |     |     |     |
| -------------- | --------- | ------------------------------- | ---------- | ----------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- |
| eration        | framework | that                            | constructs | articulated |     | 3D objects |     |     |     |     |     |     |     |
from a dual-state image pair. One image shows the object A table with a base, eight drawers evenly distributed  A table with one drawer in the middle, two drawers on
|     |     |     |     |     |     |     | on both sides, and one large drawer in the middle  |     |     |     | the left side, and one drawer on the right side. |     |     |
| --- | --- | --- | --- | --- | --- | --- | -------------------------------------------------- | --- | --- | --- | ------------------------------------------------ | --- | --- |
in a resting state, and the other shows it in an articulated just beneath the tabletop.
state. This dual-state input format encodes both structural Figure10. Visualexamplesofarticulatedobjectsconstructedby
theLLMagentbasedworkflow.
andkinematicinformation,enablingthemodeltobetterre-
solvemotionambiguityandpredictjointbehavior.Thegen-
|     |     |     |     |     |     |     | paradigm | allows | us to | capitalize | on continuous |     | improve- |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------ | ----- | ---------- | ------------- | --- | -------- |
erationprocessisbasedonadiffusiontransformerthatin-
|     |     |     |     |     |     |     | ments in | community | foundation |     | models, | enabling | cost- |
| --- | --- | --- | --- | --- | --- | --- | -------- | --------- | ---------- | --- | ------- | -------- | ----- |
tegratesthesetwoimagesusingaspecializeddual-statein-
jection module at each layer. DIPO also includes a chain- effectiveandscalablegenerationofview-consistenttextures
withminimalretrainingeffort.
| of-thought   | based   | Graph        | Reasoner | that          | infers  | connectivity |              |     |            |         |     |       |              |
| ------------ | ------- | ------------ | -------- | ------------- | ------- | ------------ | ------------ | --- | ---------- | ------- | --- | ----- | ------------ |
| relationship | between | each         | part.    | The resulting |         | articulation |              |     |            |         |     |       |              |
| graph is     | used as | an attention |          | prior to      | enhance | generation   |              |     |            |         |     |       |              |
|              |         |              |          |               |         |              | Model Design |     | We develop | a model |     | named | GeoLifter, a |
consistencyandplausibility.
|     |     |     |     |     |     |     | module          | that extends | the    | capabilities  | of  | foundation | text-to- |
| --- | --- | --- | --- | --- | --- | --- | --------------- | ------------ | ------ | ------------- | --- | ---------- | -------- |
|     |     |     |     |     |     |     | image diffusion |              | models | to multi-view |     | generation | with ge- |
AutomaticArticulatedObjectDataAugmentation Be- ometric consistency. GeoLifter injects geometric control
intothebasediffusionmodelthroughcross-attentionmech-
| yond model | design, | to  | improve | generalization |     | on complex |     |     |     |     |     |     |     |
| ---------- | ------- | --- | ------- | -------------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- |
articulatedobjectgeneration,weuseanautomaticdataaug- anisms,enablingview-consistenttexturegenerationcondi-
mentation pipeline to synthesize articulated object layouts tionedon3Dgeometry. WeadoptKolorstext-to-image[40]
|     |     |     |     |     |     |     | asthebasediffusionmodel. |     |     | Incontrasttoapproachessuch |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------ | --- | --- | -------------------------- | --- | --- | --- |
fromnaturallanguagepromptsusinggrid-basedspatialrea-
soningandpartretrievalfromexisting3Ddatasets. There- asControlNet[55],whichduplicateandtrainaseparateen-
|     |     |     |     |     |     |     | coderbranchofthebasemodel’sU-Net. |     |     |     |     | GeoLifterremains |     |
| --- | --- | --- | --- | --- | --- | --- | --------------------------------- | --- | --- | --- | --- | ---------------- | --- |
sultingPM-Xdatasetcomprises600structurallydiversear-
ticulatedobjects,eachannotatedwithrenderedimagesand lightweight and highly extensible. Its parameter size does
physical properties. Figure 10 shows representative exam- notgrowwiththedepthofthebasemodel,makingitmore
|     |     |     |     |     |     |     | efficient | and easier | to integrate | with | evolving |     | diffusion ar- |
| --- | --- | --- | --- | --- | --- | --- | --------- | ---------- | ------------ | ---- | -------- | --- | ------------- |
plesfromthePM-Xdataset.
chitectures.
|                       |              |     |                                |                 |     |           | Given       | an input | mesh,       | we render     |      | normal | maps, po-  |
| --------------------- | ------------ | --- | ------------------------------ | --------------- | --- | --------- | ----------- | -------- | ----------- | ------------- | ---- | ------ | ---------- |
| Qualitativecomparison |              |     | Figures1illustratesrepresenta- |                 |     |           |             |          |             |               |      |        |            |
|                       |              |     |                                |                 |     |           | sition maps |          | and binary  | masks         | from | six    | predefined |
| tive results          | of generated |     | objects                        | with real-world |     | image in- |             |          |             |               |      |        |            |
|                       |              |     |                                |                 |     |           | camera      | views    | (elevations | ∈ {20◦,−10◦}, |      |        | azimuths ∈ |
puts. Exploremoredemosofdynamicarticulatedobjecton {0◦,60◦,120◦,180◦,240◦,300◦}).
Foreachview,thenor-
ourprojectpage.
|     |     |     |     |     |     |     | mal and | position | maps | are rendered | in  | image | space from |
| --- | --- | --- | --- | --- | --- | --- | ------- | -------- | ---- | ------------ | --- | ----- | ---------- |
cameraview,andconcatenatedalongthespatial(heightand
3.4.TextureGeneration
|     |     |     |     |     |     |     | width) dimensions |     | within | each attribute. |     | The | different at- |
| --- | --- | --- | --- | --- | --- | --- | ----------------- | --- | ------ | --------------- | --- | --- | ------------- |
MethodOverview Thetexture generationmodule isde- tributetypes(normal,position,mask)arethenconcatenated
signedtoperformmulti-styletexturegenerationandediting along the channel dimension to form the geometric condi-
tioninputG∈RH×W×7.Thenormalmapencodessurface
| for3Dobjectassets. |     | Givena3Dmeshasinput, |     |     |     | itoutputs |     |     |     |     |     |     |     |
| ------------------ | --- | -------------------- | --- | --- | --- | --------- | --- | --- | --- | --- | --- | --- | --- |
a textured 3D mesh with generated visual appearance. In- normalsinterpolatedpervertexandprojectedtotheimage
steadoftrainingamulti-viewdiffusionmodelfromscratch, plane. ThepositionmapstorestheXYZcoordinates(inob-
we design a plug-gable and extensible module that lever- jectspace)ofvisiblevertices.Themaskisabinarysegmen-
ages existing 2D text-to-image foundation models and ex- tation map. The geometric condition G is then implicitly
tends their capabilities into the 3D domain. Our approach encoded into a feature embedding, which is progressively
enablesthegenerationofdiverseandhigh-qualitytextures injected into the denoising process of the diffusion model
thataregeometricallyconsistentacrossviews. Thisdesign via cross-attention, leveraging zero convolution to ensure
7

Style reference
(optional)
GeoLifter
cross attn
normal&mask map
|     |     |     |     |     | 𝑍!  |     |     |     | Delight & SR |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ------------ | --- | --- | --- |
Base model
Input mesh
Text prompt : A pinkrobot
holding a sign with a hearton it.
|     |     |     |     |     | Neg prompt: blur, specular. |     |     |     |     | Back |     |     |
| --- | --- | --- | --- | --- | --------------------------- | --- | --- | --- | --- | ---- | --- | --- |
project
Textured mesh
position map
|     |     |     |     |     | Frozen layers | Trainablelayers |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | ------------- | --------------- | --- | --- | --- | --- | --- | --- |
Figure 11. Overview of EmbodiedGen Texture Generation Module. Given a mesh and a text prompt, the module generates six-view
consistenttextureswithcontrollablestylesviatext,referenceimage,orboth. Geometry-awareconditions(normals,positions,masks)are
extracted and injected into a diffusion model via the GeoLifter module. The outputs are refined with illumination removal and super-
resolution,thenback-projectedtothemeshasdescribedinAlgorithm1.
| minimal          | interference | with | the | base model | decoder | at the |     |     |     |     |     |               |
| ---------------- | ------------ | ---- | --- | ---------- | ------- | ------ | --- | --- | --- | --- | --- | ------------- |
| startoftraining. |              |      |     |            |         |        |     |     |     |     |     | Point matches |
Search points
The text prompt supports both positive and negative Reference points
| prompts, | and accepts | multi-lingual |     | input, | including | both |     |     |     |     |     |     |
| -------- | ----------- | ------------- | --- | ------ | --------- | ---- | --- | --- | --- | --- | --- | --- |
ChineseandEnglishdescriptions,tospecifythedesiredtex-
| ture style | and appearance. |     | In addition |     | to textual | prompts, |     |     |     |     |     |     |
| ---------- | --------------- | --- | ----------- | --- | ---------- | -------- | --- | --- | --- | --- | --- | --- |
usersmayoptionallyprovideanRGBimageasareference Figure12. Bluedots: referencepoints;reddots: projectedcorre-
style, which serves as a complementary control signal to spondencesinotherviews;greenlines: matches. Thespatialloss
the language input. Users can provide a text prompt only, is applied to let the latent features of matched points closer, en-
a reference image only, or both simultaneously. This de- hancingcross-viewalignment.
signenableshighlycontrollableandexpressivetexturegen-
|            |         |            |          |     |          |            | hancingcross-viewcoherence. |       |       | Thefinalloss3isobtained |              |          |
| ---------- | ------- | ---------- | -------- | --- | -------- | ---------- | --------------------------- | ----- | ----- | ----------------------- | ------------ | -------- |
| eration by | jointly | leveraging | semantic |     | guidance | and visual |                             |       |       |                         |              |          |
|            |         |            |          |     |          |            | by adding                   | L LDM | and L | spatial , λ ldm and     | λ spatial is | set to 1 |
stylecues.
and0.02respectively.
WeobservethatGeoLifter,withitslightweightgeomet-
ric conditioning design, effectively preserves the texture (cid:104) (cid:105)
|     |     |     |     |     |     |     |     |     | =E  |         | ,t,c)∥2 |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------- | ------- | --- |
|     |     |     |     |     |     |     |     | L   |     | ∥ϵ−ϵ (z |         | (1) |
generation capability of the underlying foundation model, LDM x,ϵ,t θ t
whilesignificantlyimprovingspatialandgeometricconsis-
| tencyacrossviews.Followingthemulti-viewtexturegener- |     |     |     |     |     |     |     |     | B   |     |     |     |
| ---------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
1 (cid:88)
ation, we apply illumination removal and super-resolution L = 1 ·SmoothL1(f (r ),f (s ))
|            |             |     |         |          |      |         | spatial |     | {|rb|>0∧|sb|>0} |     | b b | b b |
| ---------- | ----------- | --- | ------- | -------- | ---- | ------- | ------- | --- | --------------- | --- | --- | --- |
| techniques | and project | the | refined | textures | back | into 3D |         | B   |                 |     |     |     |
b=1
| space to | obtain the | final | textured | mesh, | equipped | with a |     |     |     |     |     | (2) |
| -------- | ---------- | ----- | -------- | ----- | -------- | ------ | --- | --- | --- | --- | --- | --- |
high-resolution2KUVmapasdescribedinAlgorithm1.
|             |     |        |              |     |             |           |             |            | L=λ | L +λ        | L       | (3) |
| ----------- | --- | ------ | ------------ | --- | ----------- | --------- | ----------- | ---------- | --- | ----------- | ------- | --- |
|             |     |        |              |     |             |           |             |            | LDM | LDM spatial | spatial |     |
| Loss Design | On  | top of | the original |     | loss 1 used | in latent |             |            |     |             |         |     |
|             |     |        |              |     |             |           | Qualitative | Comparison |     |             |         |     |
diffusionmodels[37], weintroducespatialloss2asageo- We conduct a qualitative com-
metricconsistencyconstraintinthelatentspace,whereBis parison between our method and several state-of-the-
thebatchsize,r ands arethereferenceandsearchpoint art texture generation methods, including TEXTure[36],
|     | b   | b   |     |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
sets for the b-th sample(visualized in Figure 12). f b (·) ∈ SyncMVD[24], Paint3D[54], Meshy[25], andHunyuan3d-
RC×Nb denotes the extracted feature vectors at the corre- 2[12]. As shown in Figure 13, our method consistently
sponding coordinates. Standard element-wise smooth L1 produceshigher-quality3Dtextures,withsuperiorgeomet-
loss is applied to encourages the latent features of pixels ric consistency across views. Furthermore, our method
correspondingtothesame3Dpoint(projectedacrossmul- uniquelysupportsspecifiedtexttobedirectlygeneratedon
| tiple views) | to remain | close | in  | feature | space, | thereby en- | 3Dsurfaces. |     |     |     |     |     |
| ------------ | --------- | ----- | --- | ------- | ------ | ----------- | ----------- | --- | --- | --- | --- | --- |
8

A grayhorse head with flying mane and browneyes
A brownhorse head with a classictexture and flying mane, and blackeyes
A black alarm clock with a retroRoman numeraldial, with a classic charm
A wooden alarm clock, showing the time in Arabic numerals
A realistic 3D robotholding a wooden sign,redmain body purpleeyes, the sign says "中国"
A robot with a yellowbody and blueeyes holding a sign, word "Hello" written on the sign
TEXTure SyncMVD Paint3D Meshy Hunyuan3d-2 Ours
Figure13. EmbodiedGentexturegenerationmoduleeffectivelyadherestotextdescriptions,generatinghigh-qualitytextureswithstrong
spatial and geometric consistency. It also demonstrates robust control over text generation on textures, accurately rendering common
ChineseandEnglishtext.
3.5.3DSceneGeneration ical role. We develop a scalable and efficient framework
for 3D scene generation. The system follows a modular
Method Overview Beyond 3D object asset generation, pipelinethattransformsmulti-modalinputsintopanoramic
scenediversityasbackgroundcontextplaysanequallycrit- images, which are then used to generate 3D scenes with
9

Panorama Generation Scene 3DGS & Mesh Generation Physics restoration
| Text prompt |     |     | PanoSelector |     |     |     |     |     |     |     |     |     |     |
| ----------- | --- | --- | ------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Modern minimalist
Novelview
interiorscene,grey
Synthesis
cabinet before
Inpainting
frosted glass.
Mesh
| Image prompt |     |     |     |     |     |     |     |     |     |     | Real Scale Restoration  |     |     |
| ------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ----------------------- | --- | --- |
& Coordinate System
Alignment
Mesh
|              |     |     |     |     |     |     |      | repair | Super-resolution cubemap |      |     |       |     |
| ------------ | --- | --- | --- | --- | --- | --- | ---- | ------ | ------------------------ | ---- | --- | ----- | --- |
|              |     |     |     |     |     |     | Init |        | refined                  |      |     | Mesh& |     |
| Style prompt |     |     |     |     |     |     | 3DGS |        |                          | 3DGS |     | 3DGS  |     |
Figure14.OverviewofEmbodiedGen3DSceneGeneration.Apanoramaisgeneratedfromatextpromptorinputimage,guidedbyastyle
prompt.Afterqualityassessmentviavlm-basedselector,arefinedmeshand3DGS[19]aregeneratedbypanoramaprojection,inpainting,
andrepair.Super-resolutionisusedtoenhance3DGSappearancedetails,followedbyrealscaleandalignmentadjustments.
consistent real-world scale. The framework consists of scene1
| three main                                       | stages: |     | (1) panoramic |     | image | generation, | (2) |          |     |     |     |     |     |
| ------------------------------------------------ | ------- | --- | ------------- | --- | ----- | ----------- | --- | -------- | --- | --- | --- | --- | --- |
| 3Dscenegenerationin3DGS[19]andmeshrepresentation |         |     |               |     |       |             |     | w/ostyle |     |     |     |     |     |
prompt
| from panorama, |     | and | (3)scale | alignment | and | standardized |     |     |     |     |     |     |     |
| -------------- | --- | --- | -------- | --------- | --- | ------------ | --- | --- | --- | --- | --- | --- | --- |
output,asillustratedinFigure14.
| Panoramic | Image |     | Generation | Our | method |     | supports |     |     |     |     |     |     |
| --------- | ----- | --- | ---------- | --- | ------ | --- | -------- | --- | --- | --- | --- | --- | --- |
Ours
| both text- | and      | image-based |          | input modalities, |               | or  | a com-  |     |     |     |     |     |     |
| ---------- | -------- | ----------- | -------- | ----------------- | ------------- | --- | ------- | --- | --- | --- | --- | --- | --- |
| bination   | of both, | enabling    | flexible |                   | and efficient |     | genera- |     |     |     |     |     |     |
tion of high-quality panoramic images. For text-driven scene2
| generation, | user-provided |     | scene | descriptions |     | are translated |     |     |     |     |     |     |     |
| ----------- | ------------- | --- | ----- | ------------ | --- | -------------- | --- | --- | --- | --- | --- | --- | --- |
intopanoramicviewsusingDiffusion360model[13],which
w/ostyle
| have demonstrated                      |             | strong  | performance |        | in       | this task.  | For     | prompt |     |     |     |     |     |
| -------------------------------------- | ----------- | ------- | ----------- | ------ | -------- | ----------- | ------- | ------ | --- | --- | --- | --- | --- |
| image-driven                           | generation, |         | we          | employ | Qwen     | [10] to     | extract |        |     |     |     |     |     |
| semanticdescriptionsfromtheinputimage. |             |         |             |        |          | Theimageand |         |        |     |     |     |     |     |
| its corresponding                      |             | textual | description |        | are then | jointly     | pro-    |        |     |     |     |     |     |
Ours
| cessed by                                  | the | panorama | generation |     | model[13] | to       | generate |     |     |     |     |     |     |
| ------------------------------------------ | --- | -------- | ---------- | --- | --------- | -------- | -------- | --- | --- | --- | --- | --- | --- |
| semanticallyalignedpanoramas(seeFigure15). |     |          |            |     |           | Toensure |          |     |     |     |     |     |     |
qualityandreliability,weintroducethePanoSelectormod-
|     |     |     |     |     |     |     |     | Figure 15. | Qualitative | Comparison | With | and Without | Style |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | ----------- | ---------- | ---- | ----------- | ----- |
ule, which is built upon Qwen [10], automatically evalu- Prompts. “w/ostyleprompt”lacksexplicitstyleguidance,while
atesandfiltersthegeneratedpanoramasbasedonstructural
|     |     |     |     |     |     |     |     | “Ours” uses | style-aware | prompting, | yielding | more coherent | tex- |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | ----------- | ---------- | -------- | ------------- | ---- |
quality metrics, such as floor and wall consistency. This turesandbetterstylisticalignmentacrossscenes.
| guarantees | that | only | high-quality | outputs | are | forwarded | to  |     |     |     |     |     |     |
| ---------- | ---- | ---- | ------------ | ------- | --- | --------- | --- | --- | --- | --- | --- | --- | --- |
thegeometrygenerationstage.
therrefinetheinitial3DGS,effectivelyenhancingthedetail
|     |     |     |     |     |     |     |     | qualityofthefinal3DGSoutputasinFigure16. |     |     |     |     | Weshow |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------------------------------------- | --- | --- | --- | --- | ------ |
Scene 3D Representation Generation After obtaining generated3Dscenequalitycomparisonwithworldgen[51]
| high-quality      | panoramas,     |     | the            | system     | proceeds | to      | generate | inFigure17. |     |     |     |     |     |
| ----------------- | -------------- | --- | -------------- | ---------- | -------- | ------- | -------- | ----------- | --- | --- | --- | --- | --- |
| the corresponding |                | 3D  | representation |            | in 3DGS  | and     | mesh     |             |     |     |     |     |     |
| based on          | Pano2Room[32]. |     |                | An initial |          | mesh is | gener-   |             |     |     |     |     |     |
ated from the panoramic input and further refined through Physics Restoration To produce realistic and metrically
meshoptimizationtoimprovebothgeometricaccuracyand consistent 3D scenes, the system performs absolute scale
reconstruct-ability. The optimized mesh is then converted estimation by predicting real-world dimensions such as
into a 3DGS representation. To enhance visual fidelity, buildingheightfromtheinputpanoramasandtheirseman-
views rendered from the optimized mesh are converted ticdescriptions. Adedicatedscaleestimationmodule,built
into cubemaps and passed through the super-resolution upon the Qwen model [10], infers these scale factors to
model[44]. Thesuper-resolvedimagesarethenusedtofur- enable lossless rescaling of both the mesh and 3DGS[19]
10

scene1 scene2 trated in Figure 21, with the generated 3D assets evalu-
w/osuper ated via closed loop simulation in the Isaac Lab[26] envi-
resolution
|     |     |     |     |     |     |     | ronment. | Figure | 23  | shows how | assets | generated |     | by Em- |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------ | --- | --------- | ------ | --------- | --- | ------ |
bodiedGenText-to-3Dcanbeusedinnavigationandobsta-
|      |     |     |     |     |     |     | cle avoidance | tasks      | within      | the      | OpenAI     | Gym[4]    | simulation    |      |
| ---- | --- | --- | --- | --- | --- | --- | ------------- | ---------- | ----------- | -------- | ---------- | --------- | ------------- | ---- |
| Ours |     |     |     |     |     |     | framework.    |            |             |          |            |           |               |      |
|      |     |     |     |     |     |     | RoboSplatter: |            | Integration |          | of 3DGS    | Rendering |               | into |
|      |     |     |     |     |     |     | Physical      | Simulation |             | Existing | simulators |           | are typically |      |
Figure 16. Qualitative comparison with and without super- builtupontraditionalOpenGL-basedrenderingtechniques,
resolution. The generated 3D scene show sharper and high- which involve complex environment modeling, lighting
frequencydetailedwithsuper-resolution.Zoominfordetails. setup, and ray-based rendering calculations. These ap-
|     |     |     |     |     |     |     | proaches | often | suffer | from | high computational |     | cost | and |
| --- | --- | --- | --- | --- | --- | --- | -------- | ----- | ------ | ---- | ------------------ | --- | ---- | --- |
Text input
|     |     |     |     |     |     |     | limited | photorealism. |     | With | the rapid | advancement |     | of  |
| --- | --- | --- | --- | --- | --- | --- | ------- | ------------- | --- | ---- | --------- | ----------- | --- | --- |
A living
room with
a wooden  3DGS[19], more realistic and efficient rendering solutions
floor and  have emerged. We integrate 3DGS rendering with estab-
a rug in
middle
|     |     |     |     |     |     |     | lished physical |          | simulators | such | as MuJoCo |            | [42] and | Isaac |
| --- | --- | --- | --- | --- | --- | --- | --------------- | -------- | ---------- | ---- | --------- | ---------- | -------- | ----- |
|     |     |     |     |     |     |     | Lab [26],       | enabling | visually   |      | rich and  | physically | accurate |       |
Image input simulations. To this end, we develop RoboSplatter, a
|     |     |     |     |     |     |     | 3DGS-based | simulation  |     | rendering | framework |     | tailored     | for |
| --- | --- | --- | --- | --- | --- | --- | ---------- | ----------- | --- | --------- | --------- | --- | ------------ | --- |
|     |     |     |     |     |     |     | robotics   | simulation. | As  | shown     | in Figure | 20, | RoboSplatter |     |
Ours WorldGen worksseamlesslywithMuJoCotosimulateroboticmanip-
Figure 17. Qualitative Comparison with WorldGen[51] Our ulationtasks,suchasroboticarmgrasping,whiledelivering
method produces more detailed textures and more complete ge- highvisualfidelitypoweredby3DGStechnology.
ometrythanWorldGen,underbothtextandimageinputsettings.
5.Conclusion
| representations. |        | Additionally, |     | the coordinate | system | is re-   |               |     |         |              |     |     |               |     |
| ---------------- | ------ | ------------- | --- | -------------- | ------ | -------- | ------------- | --- | ------- | ------------ | --- | --- | ------------- | --- |
|                  |        |               |     |                |        |          | In this work, | we  | present | EmbodiedGen, |     | the | first compre- |     |
| centered         | to the | floor plane   | of  | the scene,     | with   | the axes |               |     |         |              |     |     |               |     |
hensiveplatformforinteractive3Dworldgenerationtothe
alignedaccordingtoeitherthecameradirectionfromthein-
|     |     |     |     |     |     |     | needs of | embodied | intelligence |     | related | research. | Our | sys- |
| --- | --- | --- | --- | --- | --- | --- | -------- | -------- | ------------ | --- | ------- | --------- | --- | ---- |
putimageortheorientationimpliedbythetextualdescrip-
|           |           |           |            |                |        |               | tem enables | controllable |           | and    | diverse     | creation   | of      | real-to- |
| --------- | --------- | --------- | ---------- | -------------- | ------ | ------------- | ----------- | ------------ | --------- | ------ | ----------- | ---------- | ------- | -------- |
| tion. The | resulting | output    | is a       | scale-aligned, |        | high-fidelity |             |              |           |        |             |            |         |          |
|           |           |           |            |                |        |               | sim digital | twins,       | alongside |        | large-scale | generation |         | of 3D    |
| 3D scene  | asset,    | ready for | downstream |                | use in | virtual and   |             |              |           |        |             |            |         |          |
|           |           |           |            |                |        |               | rigid and   | articulated  |           | object | and 3D      | scene      | assets. | These    |
augmentedrealityandrobotics.
|     |     |     |     |     |     |     | assets can | be  | seamlessly | integrated |     | into various |     | simula- |
| --- | --- | --- | --- | --- | --- | --- | ---------- | --- | ---------- | ---------- | --- | ------------ | --- | ------- |
4.Application tors such as OpenAI Gym[4], Isaac Lab[26], MuJoCo[42]
andSAPIEN[49]fortaskssuchasground-truthgeneration,
|             |     |                  |     |     |           |           | evaluation, | and | reinforcement |     | learning. | The | generated | as- |
| ----------- | --- | ---------------- | --- | --- | --------- | --------- | ----------- | --- | ------------- | --- | --------- | --- | --------- | --- |
| Large-scale | 3D  | Asset Generation |     |     | Figure 18 | showcases |             |     |               |     |           |     |           |     |
the capability of the EmbodiedGen Text-to-3D module to sets achieve state-of-the-art quality in both visual fidelity
generate large-scale 3D assets for embodied intelligence andphysicalrealism, andareenrichedwithdetailedanno-
tasks,producingwatertightandstylisticallydiversemeshes tations, including quality inspection labels, watertight ge-
aligned with textual descriptions. This capability enables ometry,anddual3Drepresentationsinboth3DGS[19]and
|          |              |     |             |     |        |             | meshformats. |     | Topromoteresearchandpracticaladoption, |     |     |     |     |     |
| -------- | ------------ | --- | ----------- | --- | ------ | ----------- | ------------ | --- | -------------------------------------- | --- | --- | --- | --- | --- |
| low-cost | augmentation | of  | interactive | 3D  | assets | for simula- |              |     |                                        |     |     |     |     |     |
tionanddownstreamtrainingandevaluation. we release the pipeline as an open-source, user-friendly
toolkitandservice.
| Visual       | Appearance | Editing         |     | of 3D           | Mesh           | Figure 19 |     |     |     |     |     |     |     |     |
| ------------ | ---------- | --------------- | --- | --------------- | -------------- | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
| demonstrates | the        | capability      | of  | the EmbodiedGen |                | texture   |     |     |     |     |     |     |     |     |
| generation   | module     | to generate     |     | and edit        | photorealistic | tex-      |     |     |     |     |     |     |     |     |
| tures with   | rich       | visual details. | The | edited          | 3D assets      | can be    |     |     |     |     |     |     |     |     |
usedfortrainingdataaugmentation,enhancingmodelgen-
eralizationinvisualappearanceunderstanding.
| Real-to-Sim:DigitalTwinscreation |                |     |             |     | Thereal-to-simca- |           |     |     |     |     |     |     |     |     |
| -------------------------------- | -------------- | --- | ----------- | --- | ----------------- | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
| pabilities                       | of EmbodiedGen |     | Image-to-3D |     | module            | is illus- |     |     |     |     |     |     |     |     |
11

Figure18.EmbodiedGenImage-to-3D:large-scaleanddiverse3Dobjectassetgeneration.
Figure19.EmbodiedGentexturegenerationmoduleenablesrichandflexiblevisualtextureediting.
12

Figure20.EmbodiedGenImage-to-3D:DigitaltwincreationandsimulationinRoboSplatterandMuJoCo[42].
13

Figure21.EmbodiedGenImage-to-3D:Real-to-simclosed-loopsimulationevaluationofagraspingmodelinIsaacLabenvironment[26].
Figure22.Interaction3DWorldGenerationwithEmbodiedGen.EmbodiedGenenableseasyconstructionofdiverseinteractive3Dworlds
forsimulatingandevaluatingdual-armshoe-graspingtasksinRoboTwin[28].
Figure23.EmbodiedGenText-to-3D:Real-to-simobjecttransferandquadrupednavigationwithobstacleavoidanceinOpenAIGym[4].
14

References [16] JonathanHo,AjayJain,andPieterAbbeel. Denoisingdif-
|     |     |     |     |     |     | fusionprobabilisticmodels. |     |     | Advancesinneuralinformation |     |     |     |
| --- | --- | --- | --- | --- | --- | -------------------------- | --- | --- | --------------------------- | --- | --- | --- |
[1] Josh Achiam, Steven Adler, Sandhini Agarwal, Lama Ah- processingsystems,33:6840–6851,2020. 2
mad,IlgeAkkaya,FlorenciaLeoniAleman,DiogoAlmeida,
|                    |           |               |                 |                   |       | [17] Zehuan                                       | Huang,  | Yuan-Chen |       | Guo, Haoran | Wang,    | Ran Yi,      |
| ------------------ | --------- | ------------- | --------------- | ----------------- | ----- | ------------------------------------------------- | ------- | --------- | ----- | ----------- | -------- | ------------ |
| JankoAltenschmidt, |           | SamAltman,    | ShyamalAnadkat, |                   | etal. |                                                   |         |           |       |             |          |              |
|                    |           |               |                 |                   |       | Lizhuang                                          | Ma,     | Yan-Pei   | Cao,  | and Lu      | Sheng.   | Mv-adapter:  |
| Gpt-4              | technical | report. arXiv | preprint        | arXiv:2303.08774, |       |                                                   |         |           |       |             |          |              |
|                    |           |               |                 |                   |       | Multi-viewconsistentimagegenerationmadeeasy,2024. |         |           |       |             |          | 2            |
| 2023.              | 2,4       |               |                 |                   |       |                                                   |         |           |       |             |          |              |
|                    |           |               |                 |                   |       | [18] Pushkal                                      | Katara, | Zhou      | Xian, | and         | Katerina | Fragkiadaki. |
[2] BRIAAI.Rmbg-1.4:Backgroundremovalmodel.https:
|                                        |     |     |     |     |     | Gen2sim:            | Scalinguprobotlearninginsimulationwithgen- |          |          |     |        |              |
| -------------------------------------- | --- | --- | --- | --- | --- | ------------------- | ------------------------------------------ | -------- | -------- | --- | ------ | ------------ |
| //huggingface.co/briaai/RMBG-1.4,2023. |     |     |     |     | Ac- |                     |                                            |          |          |     |        |              |
|                                        |     |     |     |     |     | erativemodels,2023. |                                            |          | 3        |     |        |              |
| cessed:2025-05-19.                     |     | 4   |     |     |     |                     |                                            |          |          |     |        |              |
|                                        |     |     |     |     |     | [19] Bernhard       | Kerbl,                                     | Georgios | Kopanas, |     | Thomas | Leimku¨hler, |
[3] RaphaelBensadoun,TomMonnier,YanirKleiman,Filippos and George Drettakis. 3d gaussian splatting for real-time
Kokkinos,YawarSiddiqui,MahendraKariya,OmriHarosh,
|       |             |          |         |         |          | radiancefieldrendering,2023. |     |     |     | 3,4,5,10,11 |     |     |
| ----- | ----------- | -------- | ------- | ------- | -------- | ---------------------------- | --- | --- | --- | ----------- | --- | --- |
| Roman | Shapovalov, | Benjamin | Graham, | Emilien | Garreau, |                              |     |     |     |             |     |     |
[20] AlexanderKirillov,EricMintun,NikhilaRavi,HanziMao,
Animesh Karnewar, Ang Cao, Idan Azuri, Iurii Makarov, ChloeRolland,LauraGustafson,TeteXiao,SpencerWhite-
Eric-TuanLe,AntoineToisoul,DavidNovotny,OranGafni, head, Alexander C. Berg, Wan-Yen Lo, Piotr Dolla´r, and
| NataliaNeverova,andAndreaVedaldi. |     |     |     | Meta3dgen,2024. |     |               |     |                  |     |                        |     |     |
| --------------------------------- | --- | --- | --- | --------------- | --- | ------------- | --- | ---------------- | --- | ---------------------- | --- | --- |
|                                   |     |     |     |                 |     | RossGirshick. |     | Segmentanything. |     | arXiv:2304.02643,2023. |     |     |
3
4
[4] Greg Brockman, Vicki Cheung, Ludwig Pettersson, Jonas [21] JiayiLiu,DenysIliash,AngelX.Chang,ManolisSavva,and
Schneider,JohnSchulman,JieTang,andWojciechZaremba. AliMahdavi-Amiri. Singapo: Singleimagecontrolledgen-
| Openaigym,2016. |     | 1,3,11,14 |     |     |     |                                          |     |     |     |     |     |     |
| --------------- | --- | --------- | --- | --- | --- | ---------------------------------------- | --- | --- | --- | --- | --- | --- |
|                 |     |           |     |     |     | erationofarticulatedpartsinobjects,2025. |     |     |     |     | 3   |     |
[5] DavidCharatan,SizheLi,AndreaTagliasacchi,andVincent [22] Ruoshi Liu, Rundi Wu, Basile Van Hoorick, Pavel Tok-
Sitzmann. pixelsplat: 3d gaussian splats from image pairs makov, Sergey Zakharov, and Carl Vondrick. Zero-1-to-3:
forscalablegeneralizable3dreconstruction,2024. 2 Zero-shotoneimageto3dobject,2023. 2
[6] YuedongChen,HaofeiXu,ChuanxiaZheng,BohanZhuang, [23] Ruoshi Liu, Rundi Wu, Basile Van Hoorick, Pavel Tok-
MarcPollefeys,AndreasGeiger,Tat-JenCham,andJianfei makov, Sergey Zakharov, and Carl Vondrick. Zero-1-to-3:
Cai. MVSplat: Efficient3DGaussianSplattingfromSparse Zero-shotoneimageto3dobject,2023. 2
Multi-viewImages,page370–386.SpringerNatureSwitzer-
[24] YuxinLiu,MinshanXie,HanyuanLiu,andTien-TsinWong.
land,2024. 2 Text-guidedtexturingbysynchronizedmulti-viewdiffusion.
[7] ZoeyChen,AaronWalsman,MariusMemmel,KaichunMo, arXivpreprintarXiv:2311.12891,2023. 8
Alex Fang, Karthikeya Vemuri, Alan Wu, Dieter Fox, and [25] Meshy.ai. Meshy.ai:Ai-powered3dmeshgeneration,2025.
|          |        |            |            |     |              | Accessed:2025-05-09. |     |     | 8   |     |     |     |
| -------- | ------ | ---------- | ---------- | --- | ------------ | -------------------- | --- | --- | --- | --- | --- | --- |
| Abhishek | Gupta. | Urdformer: | A pipeline | for | constructing |                      |     |     |     |     |     |     |
articulatedsimulationenvironmentsfromreal-worldimages, [26] MayankMittal, CalvinYu, QinxiYu, JingzhouLiu, Nikita
2024. 3 Rudin, David Hoeller, Jia Lin Yuan, Ritvik Singh, Yun-
rongGuo,HammadMazhar,AjayMandlekar,BuckBabich,
[8] JaeyoungChung,SuyoungLee,HyeongjinNam,JaerinLee,
|                 |     |               |     |                    |     | GavrielState, |     | MarcoHutter, |     | andAnimeshGarg. |     | Orbit: A |
| --------------- | --- | ------------- | --- | ------------------ | --- | ------------- | --- | ------------ | --- | --------------- | --- | -------- |
| andKyoungMuLee. |     | Luciddreamer: |     | Domain-freegenera- |     |               |     |              |     |                 |     |          |
tionof3dgaussiansplattingscenes,2023. 3 unified simulation framework for interactive robot learning
|     |     |     |     |     |     | environments. |     | IEEERoboticsandAutomationLetters,8(6): |     |     |     |     |
| --- | --- | --- | --- | --- | --- | ------------- | --- | -------------------------------------- | --- | --- | --- | --- |
[9] TianyuanDai,JosiahWong,YunfanJiang,ChenWang,Cem
|                                           |     |     |     |     |       | 3740–3747,2023. |     | 1,3,4,11,14 |     |     |     |     |
| ----------------------------------------- | --- | --- | --- | --- | ----- | --------------- | --- | ----------- | --- | --- | --- | --- |
| Gokmen,RuohanZhang,JiajunWu,andLiFei-Fei. |     |     |     |     | Auto- |                 |     |             |     |     |     |     |
[27] KaichunMo,LeonidasJGuibas,MustafaMukadam,Abhi-
matedcreationofdigitalcousinsforrobustpolicylearning,
| 2024.                  | 3      |                    |                        |     |                | navGupta,andShubhamTulsiani.      |                                           |               |              | Where2act: |                    | Frompixels |
| ---------------------- | ------ | ------------------ | ---------------------- | --- | -------------- | --------------------------------- | ----------------------------------------- | ------------- | ------------ | ---------- | ------------------ | ---------- |
|                        |        |                    |                        |     |                | toactionsforarticulated3dobjects. |                                           |               |              |            | InProceedingsofthe |            |
| [10] Jinze             | Bai et | al. Qwen technical | report.                |     | arXiv preprint |                                   |                                           |               |              |            |                    |            |
|                        |        |                    |                        |     |                | IEEE/CVF                          |                                           | International | Conference   |            | on Computer        | Vision,    |
| arXiv:2309.16609,2023. |        | 4,10               |                        |     |                |                                   |                                           |               |              |            |                    |            |
|                        |        |                    |                        |     |                | pages6813–6823,2021.              |                                           |               | 7            |            |                    |            |
| [11] Yicong            | Hong   | et al. Lrm:        | Large reconstruction   |     | model for      |                                   |                                           |               |              |            |                    |            |
|                        |        |                    |                        |     |                | [28] Yao                          | Mu, Tianxing                              |               | Chen, Shijia | Peng,      | Zanxin             | Chen, Zeyu |
| singleimageto3d,2024.  |        | 2                  |                        |     |                |                                   |                                           |               |              |            |                    |            |
|                        |        |                    |                        |     |                | Gao,                              | Yude Zou,                                 | Lunkai        | Lin,         | Zhiqiang   | Xie, and           | Ping Luo.  |
| [12] ZiboZhaoetal.     |        | Hunyuan3d2.0:      | Scalingdiffusionmodels |     |                |                                   |                                           |               |              |            |                    |            |
|                        |        |                    |                        |     |                | Robotwin:                         | Dual-armrobotbenchmarkwithgenerativedigi- |               |              |            |                    |            |
forhighresolutiontextured3dassetsgeneration,2025. 2,8 taltwins(earlyversion),2025. 3,14
[13] Mengyang Feng, Jinlin Liu, Miaomiao Cui, and Xuansong [29] Alexander Quinn Nichol and Prafulla Dhariwal. Improved
| Xie. | Diffusion360: | Seamless360degreepanoramicimage |     |     |     |           |           |     |               |         |     |               |
| ---- | ------------- | ------------------------------- | --- | --- | --- | --------- | --------- | --- | ------------- | ------- | --- | ------------- |
|      |               |                                 |     |     |     | denoising | diffusion |     | probabilistic | models. | In  | International |
generationbasedondiffusionmodels,2023. 10 conferenceonmachinelearning,pages8162–8171.PMLR,
| [14] SamirYitzhakGadre,KianaEhsani,andShuranSong. |     |     |     |     | Act | 2021. | 2   |     |     |     |     |     |
| ------------------------------------------------- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- |
thepart:Learninginteractionstrategiesforarticulatedobject [30] BenPoole,AjayJain,JonathanT.Barron,andBenMilden-
part discovery. In Proceedings of the IEEE/CVF Interna- hall. Dreamfusion:Text-to-3dusing2ddiffusion,2022. 2
tionalConferenceonComputerVision,pages15752–15761, [31] BenPoole,AjayJain,JonathanT.Barron,andBenMilden-
| 2021. | 7   |     |     |     |     | hall. | Dreamfusion:Text-to-3dusing2ddiffusion,2022. |     |     |     |     | 2   |
| ----- | --- | --- | --- | --- | --- | ----- | -------------------------------------------- | --- | --- | --- | --- | --- |
[15] DanielGatis. rembg,2025. Atooltoremoveimagesback- [32] Guo Pu, Yiming Zhao, and Zhouhui Lian. Pano2room:
| ground. | 4   |     |     |     |     | Novelviewsynthesisfromasingleindoorpanorama.InSIG- |     |     |     |     |     |     |
| ------- | --- | --- | --- | --- | --- | -------------------------------------------------- | --- | --- | --- | --- | --- | --- |
15

GRAPH Asia 2024 Conference Papers, page 1–11. ACM, [48] RuiqiWu,XinjieWang,LiuLiu,ChunleGuo,JiaxiongQiu,
2024. 10 Chongyi Li, Lichao Huang, Zhizhong Su, and Ming-Ming
[33] Shengyi Qian and David F Fouhey. Understanding 3d ob- Cheng.Dipo:Dual-stateimagescontrolledarticulatedobject
jectinteractionfromasingleimage. InProceedingsofthe generationpoweredbydiversedata,2025. 7
IEEE/CVF International Conference on Computer Vision, [49] Fanbo Xiang, Yuzhe Qin, Kaichun Mo, Yikuan Xia, Hao
pages21753–21763,2023. 7 Zhu,FangchenLiu,MinghuaLiu,HanxiaoJiang,YifuYuan,
[34] Alec Radford, Jeff Wu, Rewon Child, David Luan, Dario HeWang,LiYi,AngelX.Chang,LeonidasJ.Guibas,and
| Amodei,andIlyaSutskever. |     |     |     | Languagemodelsareunsuper- |     |     |        |                                             |     |     |     |     |     |
| ------------------------ | --- | --- | --- | ------------------------- | --- | --- | ------ | ------------------------------------------- | --- | --- | --- | --- | --- |
|                          |     |     |     |                           |     |     | HaoSu. | SAPIEN:Asimulatedpart-basedinteractiveenvi- |     |     |     |     |     |
visedmultitasklearners. 2019. 2 ronment. InTheIEEEConferenceonComputerVisionand
[35] Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya PatternRecognition(CVPR),2020. 1,3,4,11
Ramesh, Gabriel Goh, Sandhini Agarwal, Girish Sastry, [50] JianfengXiang,ZelongLv,SichengXu,YuDeng,Ruicheng
Amanda Askell, Pamela Mishkin, Jack Clark, Gretchen Wang, Bowen Zhang, DongChen, XinTong, andJiaolong
| Krueger, | and | Ilya Sutskever. |     | Learning | transferable | visual |     |     |     |     |     |     |     |
| -------- | --- | --------------- | --- | -------- | ------------ | ------ | --- | --- | --- | --- | --- | --- | --- |
Yang.Structured3dlatentsforscalableandversatile3dgen-
modelsfromnaturallanguagesupervision,2021. 2 eration. arXivpreprintarXiv:2412.01506,2024. 3,4,6
[36] Elad Richardson, Gal Metzer, Yuval Alaluf, Raja Giryes, [51] ZiyangXie. Worldgen: Generateany3dsceneinseconds.
andDanielCohen-Or. Texture: Text-guidedtexturingof3d https://github.com/ZiYang-xie/WorldGen,
| shapes,2023. |     | 8   |     |     |     |     |       |         |     |     |     |     |     |
| ------------ | --- | --- | --- | --- | --- | --- | ----- | ------- | --- | --- | --- | --- | --- |
|              |     |     |     |     |     |     | 2025. | 3,10,11 |     |     |     |     |     |
[37] Robin Rombach, Andreas Blattmann, Dominik Lorenz, [52] Yinghao Xu, Zifan Shi, Wang Yifan, Hansheng Chen,
Patrick Esser, and Bjo¨rn Ommer. High-resolution image Ceyuan Yang, Sida Peng, Yujun Shen, and Gordon Wet-
synthesis with latent diffusion models. In Proceedings of zstein. Grm: Large gaussian reconstruction model for ef-
| the                                | IEEE/CVF | conference |     | on computer | vision | and pattern |                                            |     |     |     |     |     |     |
| ---------------------------------- | -------- | ---------- | --- | ----------- | ------ | ----------- | ------------------------------------------ | --- | --- | --- | --- | --- | --- |
|                                    |          |            |     |             |        |             | ficient3dreconstructionandgeneration,2024. |     |     |     |     | 2   |     |
| recognition,pages10684–10695,2022. |          |            |     |             | 2,8    |             |                                            |     |     |     |     |     |     |
[53] ShuaiYang,JingTan,MengchenZhang,TongWu,Yixuan
[38] Christoph Schuhmann. Aesthetic subsets in laion Li, Gordon Wetzstein, Ziwei Liu, and Dahua Lin. Layer-
2170337258samples,2025. RetrievedMay16,2025. 4 pano3d: Layered 3d panorama for hyper-immersive scene
[39] YichunShi,PengWang,JianglongYe,MaiLong,KejieLi,
|              |     |                                      |     |     |     |     | generation,2025. |     | 3   |     |     |     |     |
| ------------ | --- | ------------------------------------ | --- | --- | --- | --- | ---------------- | --- | --- | --- | --- | --- | --- |
| andXiaoYang. |     | Mvdream:Multi-viewdiffusionfor3dgen- |     |     |     |     |                  |     |     |     |     |     |     |
[54] XianfangZeng,XinChen,ZhongqiQi,WenLiu,ZiboZhao,
| eration,2024. |     | 2   |     |     |     |     |        |       |              |      |          |     |          |
| ------------- | --- | --- | --- | --- | --- | --- | ------ | ----- | ------------ | ---- | -------- | --- | -------- |
|               |     |     |     |     |     |     | Zhibin | Wang, | Bin Fu, Yong | Liu, | and Gang | Yu. | Paint3d: |
[40] KolorsTeam. Kolors: Effectivetrainingofdiffusionmodel Paintanything3dwithlighting-lesstexturediffusionmodels.
| for          | photorealistic | text-to-image |       | synthesis. |          | arXiv preprint, |                                                  |     |                 |                     |            |     |          |
| ------------ | -------------- | ------------- | ----- | ---------- | -------- | --------------- | ------------------------------------------------ | --- | --------------- | ------------------- | ---------- | --- | -------- |
|              |                |               |       |            |          |                 | In Proceedings                                   |     | of the IEEE/CVF |                     | Conference | on  | Computer |
| 2024.        | 6,7            |               |       |            |          |                 |                                                  |     |                 |                     |            |     |          |
|              |                |               |       |            |          |                 | VisionandPatternRecognition,pages4252–4262,2024. |     |                 |                     |            |     | 8        |
| [41] Tencent | Hunyuan3D      |               | Team. | Hunyuan3d  |          | 2.0: Scaling    |                                                  |     |                 |                     |            |     |          |
|              |                |               |       |            |          |                 | [55] LvminZhang,                                 |     | AnyiRao,        | andManeeshAgrawala. |            |     | Adding   |
| diffusion    | models         | for           | high  | resolution | textured | 3d assets       |                                                  |     |                 |                     |            |     |          |
conditionalcontroltotext-to-imagediffusionmodels,2023.
| generation, |     | 2025. | https://huggingface.co/ |     |     |     |     |     |     |     |     |     |     |
| ----------- | --- | ----- | ----------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
7
tencent/Hunyuan3D-2/tree/main/hunyuan3d-
|                                            |     |     |     |     |                |           | [56] Longwen                       | Zhang,       | Ziyu Wang,   | Qixuan      | Zhang,     |     | Qiwei Qiu, |
| ------------------------------------------ | --- | --- | --- | --- | -------------- | --------- | ---------------------------------- | ------------ | ------------ | ----------- | ---------- | --- | ---------- |
| delight-v2-0.                              |     | 3,5 |     |     |                |           |                                    |              |              |             |            |     |            |
|                                            |     |     |     |     |                |           | Anqi                               | Pang, Haoran | Jiang,       | Wei         | Yang, Lan  | Xu, | and Jingyi |
| [42] EmanuelTodorov,TomErez,andYuvalTassa. |     |     |     |     |                | Mujoco: A |                                    |              |              |             |            |     |            |
|                                            |     |     |     |     |                |           | Yu.                                | Clay: A      | controllable | large-scale | generative |     | model for  |
| physicsengineformodel-basedcontrol.        |     |     |     |     | In2012IEEE/RSJ |           |                                    |              |              |             |            |     |            |
|                                            |     |     |     |     |                |           | creatinghigh-quality3dassets,2024. |              |              |             | 3          |     |            |
InternationalConferenceonIntelligentRobotsandSystems,
|                                              |                |     |              |             |        |                 | [57] Longwen                       | Zhang,       | Ziyu Wang,   | Qixuan      | Zhang,     |     | Qiwei Qiu, |
| -------------------------------------------- | -------------- | --- | ------------ | ----------- | ------ | --------------- | ---------------------------------- | ------------ | ------------ | ----------- | ---------- | --- | ---------- |
| pages5026–5033.IEEE,2012.                    |                |     |              | 1,3,4,11,13 |        |                 |                                    |              |              |             |            |     |            |
|                                              |                |     |              |             |        |                 | Anqi                               | Pang, Haoran | Jiang,       | Wei         | Yang, Lan  | Xu, | and Jingyi |
| [43] Guangcong                               | Wang,          |     | Peng Wang,   |             | Zhaoxi | Chen, Wenping   |                                    |              |              |             |            |     |            |
|                                              |                |     |              |             |        |                 | Yu.                                | Clay: A      | controllable | large-scale | generative |     | model for  |
| Wang,                                        | ChenChangeLoy, |     | andZiweiLiu. |             |        | Perf: Panoramic |                                    |              |              |             |            |     |            |
|                                              |                |     |              |             |        |                 | creatinghigh-quality3dassets,2024. |              |              |             | 2          |     |            |
| neuralradiancefieldfromasinglepanorama,2023. |                |     |              |             |        | 3               |                                    |              |              |             |            |     |            |
[58] YuqingZhang,YuanLiu,ZhiyuXie,LeiYang,Zhongyuan
| [44] Xintao | Wang, | Liangbin | Xie, | Chao | Dong, | and Ying Shan. |     |     |     |     |     |     |     |
| ----------- | ----- | -------- | ---- | ---- | ----- | -------------- | --- | --- | --- | --- | --- | --- | --- |
Liu,MengzhouYang,RunzeZhang,QilongKou,ChengLin,
Real-esrgan:Trainingreal-worldblindsuper-resolutionwith
|      |           |       |                  |     |            |         | WenpingWang,andXiaogangJin. |     |     |     | Dreammat:High-quality |     |     |
| ---- | --------- | ----- | ---------------- | --- | ---------- | ------- | --------------------------- | --- | --- | --- | --------------------- | --- | --- |
| pure | synthetic | data. | In International |     | Conference | on Com- |                             |     |     |     |                       |     |     |
pbrmaterialgenerationwithgeometry-andlight-awaredif-
| puterVisionWorkshops(ICCVW). |     |     |     | 5,10 |     |     |                    |     |     |     |     |     |     |
| ---------------------------- | --- | --- | --- | ---- | --- | --- | ------------------ | --- | --- | --- | --- | --- | --- |
|                              |     |     |     |      |     |     | fusionmodels,2024. |     | 2   |     |     |     |     |
[45] YianWang,BingjieTang,ChuangGan,DieterFox,Kaichun
[59] HaiyangZhou,XinhuaCheng,WangboYu,YonghongTian,
| Mo,                                              | Yashraj    | Narang, | and    | Iretiayo | Akinola. | Matchmaker:  |                                      |       |              |          |     |           |       |
| ------------------------------------------------ | ---------- | ------- | ------ | -------- | -------- | ------------ | ------------------------------------ | ----- | ------------ | -------- | --- | --------- | ----- |
|                                                  |            |         |        |          |          |              | and Li                               | Yuan. | Holodreamer: | Holistic | 3d  | panoramic | world |
| Automatedassetgenerationforroboticassembly,2025. |            |         |        |          |          | 3            |                                      |       |              |          |     |           |       |
|                                                  |            |         |        |          |          |              | generationfromtextdescriptions,2024. |       |              |          | 3   |           |       |
| [46] Kailu                                       | Wu, Fangfu | Liu,    | Zhihan | Cai,     | Runjie   | Yan, Hanyang |                                      |       |              |          |     |           |       |
Wang,YatingHu,YueqiDuan,andKaishengMa.Unique3d: [60] Shijie Zhou, Zhiwen Fan, Dejia Xu, Haoran Chang,
|     |     |     |     |     |     |     | Pradyumna | Chari, | Tejas | Bharadwaj, | SuyaYou, |     | Zhangyang |
| --- | --- | --- | --- | --- | --- | --- | --------- | ------ | ----- | ---------- | -------- | --- | --------- |
High-qualityandefficient3dmeshgenerationfromasingle
|             |     |     |     |     |     |     | Wang, | and Achuta | Kadambi. |     | Dreamscene360: |     | Uncon- |
| ----------- | --- | --- | --- | --- | --- | --- | ----- | ---------- | -------- | --- | -------------- | --- | ------ |
| image,2024. |     | 2   |     |     |     |     |       |            |          |     |                |     |        |
strainedtext-to-3dscenegenerationwithpanoramicgaussian
[47] RuiqiWu,LiangyuChen,TongYang,ChunleGuo,Chongyi
| Li,andXiangyuZhang.      |     |          | Lamp:  | Learnamotionpatternfor     |         |              | splatting,2024. |     | 3   |     |     |     |     |
| ------------------------ | --- | -------- | ------ | -------------------------- | ------- | ------------ | --------------- | --- | --- | --- | --- | --- | --- |
| few-shotvideogeneration. |     |          |        | InProceedingsoftheIEEE/CVF |         |              |                 |     |     |     |     |     |     |
| Conference               | on  | Computer | Vision | and                        | Pattern | Recognition, |                 |     |     |     |     |     |     |
| pages7089–7098,2024.     |     |          | 2      |                            |         |              |                 |     |     |     |     |     |     |
16
