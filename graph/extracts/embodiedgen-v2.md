| EmbodiedGen |        | V2: | An  | Agentic, | Simulation-Ready |     |     |     |
| ----------- | ------ | --- | --- | -------- | ---------------- | --- | --- | --- |
| 3D World    | Engine |     | for | Embodied | AI               |     |     |     |
XinjieWang1,LiuLiu1,TaojunDing1,AndrewChoi1,ChaodongHuang1,MengaoZhao1,ZiangLi1,
JacksonJiang2,ChunleiYu2,ShengxiangLiu2,WeiXu1,ZhizhongSu1
| 1HorizonRobotics, |     | 2WuwenAI |     |     |     |     |     |     |
| ----------------- | --- | -------- | --- | --- | --- | --- | --- | --- |
We present EmbodiedGen V2, a generative 3D world engine for building executable sim-ready en-
vironments for embodied intelligence. Sim-ready 3D asset generation has advanced rapidly, yet
assemblingsuchassetsintopolicy-readytaskenvironmentsremainslargelymanual,limitingscalable
closed-looplearning. EmbodiedGenV2addressesthisgapthroughaunifiedsim-readyrepresentation
that connects cross-simulator assets, interaction affordances, task-driven worlds, large-scale multi-
room scenes, and stateful Vibe Coding into a generative, editable, and reusable simulation pipeline.
Thegeneratedenvironmentssupportmanipulation,navigation,mobilemanipulation,cross-simulator
deployment, and embodied policy training. In evaluation, the asset pipeline achieves 96.5% human
acceptance and 98.6% collision success, and 83.3% of task-driven worlds are directly usable for
downstream simulation without manual modification. Online reinforcement learning with generated
environments further improves simulation success from 9.7% to 79.8%, and transfers to real robots
with task success increasing from 21.7% to 75.0%. These results establish EmbodiedGen V2 as
scalable simulation infrastructure for training, evaluating, and deploying embodied policies.
Code: github.com/HorizonRobotics/EmbodiedGen
| Webpage: | horizonrobotics.github.io/EmbodiedGen |     |     |     |     |     |     |     |
| -------- | ------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
6202 luJ 8  ]OR.sc[  1v95470.7062:viXra
Task-Driven Generation Large-Scale Scenes Generation Vibe Coding 3D Worlds
| Task Instruction |     |     | Easy |     |     | Intent Parsing |     |     |
| ---------------- | --- | --- | ---- | --- | --- | -------------- | --- | --- |
Put the broccoli on thedish.
"Create a empty dining room“
"Add a table and four chairsaround it."
Scene Graph Generation
Agentic World Compiler
Background
| Context |     |     |     |     |     | [ vibe coding-simulator backend ] |     |     |
| ------- | --- | --- | --- | --- | --- | --------------------------------- | --- | --- |
D is t r a c tors
FLOOR IN [ s k i l l :   r o o m - c re a to r ]  [ s k ill :  as s e t - c r e a t o r ]
Ta r g e t s
|       |     |     |     |     |     | [ s k i l l :   a                                | s s et - re tr ie v e r ]  [ M | C P :  o ff l i n e   d a t a set] |
| ----- | --- | --- | --- | --- | --- | ------------------------------------------------ | ------------------------------ | ---------------------------------- |
| Robot |     |     |     |     |     | [skill: spatial-compute] sim.check_stable(scene) |                                |                                    |
Preflight simulation
Depth
| ON ON | ON  | ON  |     |     |     | Compile | Simulate | Repair Pass |
| ----- | --- | --- | --- | --- | --- | ------- | -------- | ----------- |
Medium
↻auto retry
|     |     |     |     |     |     | Preflight: errors found |           | Auto-corrected |
| --- | --- | --- | --- | --- | --- | ----------------------- | --------- | -------------- |
|     |     |     |     |     |     |                         | Collision | No collision   |
Stable
Floating
| Asset & Affordance Generation |     |     |     |     |     |     | Scale error | Correct scale |
| ----------------------------- | --- | --- | --- | --- | --- | --- | ----------- | ------------- |
x
✓
Final 3D World
Normal
Sim-Ready Environment
Hard
Put the broccoli Put the chess Pplaawcen  the red block
on the dish on the chessbionatord the blue box
Pick the pear and Move green cPubuet  the wooden
place it in basketon yellow cubsepoon on the plate
Segmentation
Consistent collision and texture across simulators
|     |     | Genesis |     | SAPIEN | IsaacSim | IsaacGym | MuJoCo | Bullet |
| --- | --- | ------- | --- | ------ | -------- | -------- | ------ | ------ |
Figure 1: Overview of EmbodiedGen V2. Left: natural-language task to sim-ready scene via Scene Graph and
affordance-annotated assets. Middle: large-scale multi-room generation at different controllable complexity tiers.
Right: Vibe Coding 3D world editing. All outputs deploy consistently across mainstream simulators.
1

1 Introduction
Generative 3D models have made rapid progress in producing visually plausible objects and scenes, but
embodiedpolicylearningrequiresmorethanvisual3Dcontent. Robotsandembodiedagentsneedexecutable
task environments: objects must carry physical and interaction properties, layouts must satisfy task and
navigation constraints, and the resulting worlds must be portable across simulators, editable, and usable
for closed-loop training and evaluation. We refer to environments that satisfy these requirements and can
be used in physics simulation without manual adaptation as sim-ready. Although recent pipelines have
made important progress on simulation-ready assets and generative 3D worlds, generating scalable sim-
ready environments for embodied tasks remains challenging. The key diﬀiculty is to preserve geometry,
physics, affordances, task semantics, and simulator interfaces within a unified world representation rather
than treating them as separate post-processing steps.
Building on EmbodiedGen V1 [1], we introduce EmbodiedGen V2, which advances from a generative 3D
content toolkit to a sim-ready 3D world engine for embodied task-environment generation, policy learning,
and evaluation. The system is organized around complete executable environments rather than isolated
generatedartifacts. Forlarge-scaleworldgeneration,EmbodiedGenV2generatesstructuredmulti-roomand
whole-housesceneswithexplicitroomtopology,traversableopenings,andindividuallyaddressablefurniture,
overcoming the limited camera translation of V1’s panorama-back-projected single-mesh backgrounds and
enabling long-horizon navigation and mobile manipulation. For asset and interaction generation, the asset
pipelinebecomespluggableacrossTRELLIS[2],SAM3D[3],andHunyuan3D[4],acceptspartiallyoccluded
images through in-place scene completion [5], augments objects with part-level affordances and physically
validatedgrasps, andextendsdeploymenttodeformablebodies. Fordeploymentandediting, EmbodiedGen
V2 standardizes export through URDF, simulator XML formats including MJCF, and USD for mainstream
simulators, whileVibeCodingprovidesstatefulnatural-languageeditingoverapersistent, physics-validated
world state. Finally, the system is evaluated beyond static generation quality: generated environments
support online reinforcement learning of VLA policies and sim-to-real policy transfer [6, 7].
Together, these capabilities connect generative 3D world generation to the main workflows of embodied
policy development. By preserving simulator portability, interaction semantics, task-conditioned layouts,
and editable world state in one representation, EmbodiedGen V2 supports cross-simulator reuse, policy
training, controlled environment variation, policy debugging, and closed-loop evaluation.
Our main contributions are summarized as follows:
• Unifiedsim-readyrepresentation. We introduce a shared representation that couples metric geometry,
physical validity, interaction semantics, and cross-simulator portability, providing a common interface
across the full generation and editing pipeline.
• Model-agnosticsimulationassetgeneration. We build a modular text/image-to-3D asset pipeline that
plugs TRELLIS [2], SAM3D [3], and Hunyuan3D [4] into a unified post-processing stack, converting raw
3D outputs into deployable simulation assets via quality checking, mesh repair, convex decomposition,
texture baking, physical property recovery, and cross-simulator export.
• Affordance-awareinteractionsemantics. We introduce an affordance autolabeling pipeline that aug-
mentsgeneratedassetswithsemanticinteractionattributes,turningvisualandcollision-awareobjectsinto
actionable, verifiable simulation entities. We further release a 4K+ asset collection with cross-simulator
formats and affordance annotations.
• Task-drivenworldandscenegeneration. Weparseopen-endednatural-languagetasksintoSceneGraphs
and generate executable interactive worlds through spatial constraints and physical stability solving; we
further extend the same representation to large-scale scenes with multi-room topology, navigable space,
and instance-level editability.
• StatefulVibeCodingfor3Dworldediting. We expose the shared world representation through a stateful
agent–skill harness, turning generation, composition, editing, and export into composable skills so that
2

natural-languageinstructionsbecomebounded,physics-validatededitsoverapersistent,deployableworld
state.
• Closed-looppolicyvalidation. We validate the generated environments beyond static asset and scene
quality: downstream VLA/RL studies [6] show that online fine-tuning purely with EmbodiedGen V2-
generatedenvironmentsimprovessimulationsuccessfrom9.7%to79.8%andreal-robottasksuccessfrom
21.7% to 75.0%.
2 Methodology
2.1 Preliminaries
We target simulation-ready 3D world generation: producing worlds that are not only visually plausible, but
also directly executable by embodied agents in physics simulation. Throughout this paper, we use sim-
ready to denote an output contract that couples four requirements: metric geometry, simulation-compatible
physical assets, task-level semantics and affordances, and standardized simulator interfaces.
EmbodiedGen V2 instantiates this contract with a two-level representation. At the object level, each sim-
ready asset bundles textured visual geometry, collision geometry, physical parameters, and affordance an-
notations. At the scene level, a typed Scene Graph specifies entities, task roles—background, contexts,
manipulated objects, distractors, and the robot—and their spatial and interaction relations, which are then
groundedintophysicallystable6-DoFposesinatargetsimulator. Thefollowingmodulesbuildthisrepresen-
tation progressively: sim-ready asset generation creates deployable objects, affordance autolabeling enriches
them with interaction semantics, task-driven interactive worlds generation and large-scale scenes generation
composeexecutableworlds,andVibeCodingexposesthesamerepresentationasastatefulnatural-language
editing interface.
2.2 Sim-Ready3DAssetGeneration
Problem definition. Existing image-to-3D and text-to-3D generative models [2, 8, 9, 10, 11] can pro-
duce visually plausible 3D objects, yet their outputs typically possess only visualization-level 3D usability
rather than simulation-level asset usability: meshes reside in a normalized coordinate space, lack real-world
scale, mass, and friction properties, may contain non-manifold faces or open surfaces, and carry neither
collision representations nor standardized simulation interfaces. We define sim-ready asset generation as
the task of automatically producing, from open-ended text or image conditions, object assets that jointly
contain simulation-compatible geometry, explicit textures, structured physical metadata, and standardized
simulation representations consumable by different physics engines.
Pipeline overview. AsshowninFig.2,weproposeaunifiedsim-readyassetgenerationpipelinethatmaps
three types of input—text prompts, unoccluded object images, and partially occluded object images—into
standardizedsimulationassetsthroughfivestages: (i)Input preparation: fortextinput,apluggabletext-
to-image model (SD3.5 [12] or Kolors [13]) generates candidate object images; for image input (including
occludedscenes),aforegroundsegmentationmodel(Rembg[14],SAM[15],orRMBG[16])extractsthetarget
object. (ii) 3D generation: theforegroundimageisfedintoapluggableimage-to-3Dmodel(TRELLIS[2],
SAM3D[3],orHunyuan3D[4]),yieldingbotha3DGaussian[17]andameshasintermediaterepresentations.
(iii) Geometry refinement & texture baking: themeshundergoestopologicalrepairandsimplification,
whilemulti-viewback-projectionbakestheGaussianappearanceintoanexplicittexturemap. (iv)Physical
property recovery: a vision-language model (VLM) infers real-world scale, mass, and friction coeﬀicients
from multi-view renderings, which are then used for metric rescaling. (v) Simulation asset packaging
& cross-format export: geometry, appearance, and physical information are assembled into a unified
intermediate representation and automatically converted to different simulator formats. Crucially, we do
not treat simulation compatibility as a separate export step appended after generation; instead, simulation-
oriented quality constraints are explicitly enforced at multiple stages—candidate screening, 3D generation,
3

1 Input Preparation
Text prompt Image prompt -unobstructed object Image prompt-obstructed object
ceramic fruit bowl with floral
patterns and polished white glaze
2 3D Generation & Quality Check
✓ Semantic Appearance Trellis Hunyuan3D V3.1 SAM3D x ↻Auto-retry
If check fail
✓ Mesh Geometry
✓ Cross-modal Alignment
✓ Aesthetic quality
RGB Normal RGB Normal RGB Metallic Roughness RGB Normal
3 Geometry & Physics Refinement
✓ mesh simplification
✓ mesh repair Phys. Props.
✓ convex decomposition 0.11m
0.04 kg
CoF
Sem.Desc.
…
4 Cross-Simulator Export
URDF XML USD
Asset Converter
Standard SAPIEN Bullet IsaacGym MuJoCo Genesis IsaacSim
URDF & 3DGS
Figure 2: The sim-ready 3D asset generation pipeline. From text or image inputs, the system produces
simulation-ready assets through input preparation, 3D generation, geometry refinement & texture baking,
VLM-driven physical property recovery, and cross-simulator export.
and physical recovery—forming a closed-loop generate–verify–retry pipeline.
Hierarchical quality gating. Rather than relying on a single forward pass to produce the final result, we
embedqualitygatesatmultiplepipelinestages. Attheinputstage,candidateimagesmustpassaforeground
quality check (a VLM validates semantic correctness and geometric completeness of the segmentation); for
thetext-drivenpath,thesystemadditionallyverifiesthatthegeneratedimageissemanticallyconsistentwith
the original text intent. Only qualified candidates proceed to 3D generation. At the 3D generation stage,
thesystemevaluatesgeometricintegrityfrommulti-viewrenderings,rejectingtruncatedgeometry,duplicate
bodies, and extraneous attached elements; failures trigger automatic retries with different random seeds. At
thepipeline’send,anaestheticscoringmodel[18]quantitativelyratestextureandgeometryquality,filtering
samples below a predefined threshold. We write all quality-check results as structured tags into the final
asset file, making each asset’s quality status queryable and filterable in downstream large-scale usage.
Geometryprocessing&physicalpropertyrecovery. Rawmeshesfrom3Dgenerativemodelstypically
contain non-manifold faces and open regions that are incompatible with collision detection and physics
simulation. After topological repair and simplification, we apply the CoACD algorithm [19] to compute an
approximate convex decomposition, producing a set of compact convex collision bodies; if decomposition
fails, the pipeline falls back to the original mesh. In Fig. 2, different colors indicate the decomposed mesh
4

Figure 3: Twelve text-conditioned garments deployed as deformable meshes in Genesis [24]. Inset heatmaps
showper-vertexdisplacementunderclothdynamics,confirmingthatgeneratedgeometrysupportssoft-body
simulation without manual preparation.
parts produced by this convex decomposition. Since Gaussian representations are unsuitable as texture
carriers for simulation assets, we bake the Gaussian model’s multi-view appearance into a high-resolution
explicit texture map via automatic UV unwrapping and differentiable rasterization. For physical properties,
aVLM inferssemanticreal-worldscale, mass, and frictionranges from multi-viewrenderings andthe object
category. Weusetheestimatedscaletocalibratethevisualmesh,collisionmesh,andGaussianrepresentation
consistently, then store the recovered mass and friction in the asset’s inertial and contact metadata for
downstream sampling or calibration.
Cross-simulator asset export. WeadoptURDFastheunifiedintermediaterepresentation,asitnatively
supportsstructuredpackagingofvisualmeshes,collisionmeshes,inertialparameters,andauxiliarymetadata,
makingitasuitablecanonicalrepresentationacrosssimulationback-ends. Aformatconverterautomatically
transformstheURDF(SAPIEN[20],Bullet[21],IsaacGym[22])intoXML(MuJoCo[23],Genesis[24])and
USD (Isaac Sim [25]), correctly handling visual/collision geometry separation, local coordinate transforms,
material mapping, and physics property injection. This design decouples object generation from simula-
tor adaptation, enabling the same generated asset to be instantiated across different embodied simulation
platforms with consistent physical behavior. We provide online usage examples in RoboVerse [26].1
Deformable-body simulation. Beyond rigid-body physics, the same generation and export path extends
naturally to soft-body simulation. Fig. 3 shows twelve garments generated from text prompts and exported
to Genesis [24] as deformable meshes; per-vertex displacement heatmaps confirm that the generated surface
geometry carries suﬀicient fidelity for cloth and soft-body dynamics without any manual mesh preparation.
Single-image in-place completion. To handle partially occluded inputs, we use 3D-Fixer [5], which
recoverscompleteobjectgeometryinplacebytreatingthefragmentedvisiblepointcloudasaspatialanchor.
It conditions a frozen TRELLIS backbone [2] through occlusion-robust feature alignment and coarse-to-fine
completion, avoiding explicit pose optimization.
2.3 AffordanceAutolabelingPipeline
Problemdefinition. Embodiedmanipulationrequiressemanticsnotonlyforobjectcategoriesorinstances,
but also for interaction-relevant parts. A manipulation policy must infer where to make contact, what
function the contacted region supports, and how the contact can be executed under geometric and physical
constraints [27, 28]. We define affordance autolabeling as converting a sim-ready 3D asset into a structured
part-level interaction representation: each mesh face receives a part identifier, and each part is annotated
with its semantic name, graspability, task-relevant grasp scenarios, functional labels, appearance semantics,
1https://roboverse.wiki/metasim/get_started/quick_start/14_real_asset
5

and simulation-validated candidate grasps. This representation connects language-level intent to localized
3D contact regions and executable robot actions.
Pipelineoverview. Startingfromthesim-readyassetsinSec.2.2,ouraffordanceautolabelingpipelineaug-
ments each generated object with a structured part-level schema for embodied manipulation. As illustrated
inFig.4,thepipelineproceedsthroughthreestages: (i) Functional part segmentation: P3-SAM[29]de-
composesthemeshintofunctionallymeaningfulpartregions,whichserveasgeometriccarriersforaffordance
annotation; (ii) Part-wise semantic annotation: conditioned on the part masks, a VLM (GPT-5.4 [30])
interprets aligned RGB and mask renderings to infer each region’s semantic name, functional role, gras-
pability, task-conditioned grasp scenarios, and appearance description; and (iii) Grasp generation and
physical validation: GraspGen[31]proposes6-DoFgraspcandidates,whichareassociatedwithcontacted
mesh parts and filtered through physics-based execution tests. The resulting face-level part segmentation
mesh and part-wise affordance annotations provide a simulator-grounded action interface, specifying which
part an instruction refers to, what interaction function the part supports, and how the robot can execute
the intended contact through simulation-filtered grasp groups.
1 Sim-readyAsset 2 Part Segmentation 3 Part-wise Semantic Annotation 4 Grasp Generation
ax w/o interaction regions a Face-level segment a Paired views render P P a ar r t t N Id am en e: t h it e y adband a Dense grasp generate
b w/o part semantics b Geometry-based refine b VLM part semantic annotate b Semantic part associate
Interaction Affordance
c w/o executable grasp c VLM-guided merge c Annotation verify and repair Graspable: True CPhysics-based validate
Grasp scenarios: Stabilize the
headphones by clamping the side of the
band during placement.
Confidence:0.74
Functional Semantics
Functional label: Rest on the top of the
head.
Semantic description: A large curved
pale pink padded band with a smooth
matte outer surface and lighter inner lining,
spanning the top and connecting both
sides.
Figure 4: The affordance autolabeling pipeline. From sim-ready assets, the system produces structured
part-level interaction representations through functional part segmentation, part-wise semantic annotation,
and grasp generation & physical validation.
Functional part segmentation. Foreachsim-readyasset, P3-SAM[29]decomposesthemeshintopoten-
tially functional part regions. It samples a point cloud from the mesh, infers the object’s part structure in
normalized 3D space, and projects the predicted point-cloud masks back onto the original mesh faces to ob-
tainaface-levelpartsegmentationmap. Thepredictedpartidentifiersareremappedtoafixedcolorpalette,
giving the subsequent VLM stages directly accessible color names. Raw P3-SAM predictions can still con-
tain boundary errors and overly fine-grained partitions, so we add geometry-consistent post-processing and
VLM-guided part merging. The geometry-based post-processing corrects local labels by merging smoothly
connected face components and relabeling small surrounded fragments, targeting projection noise without
collapsing genuine sharp part boundaries. For semantic over-segmentation, a VLM-based checker takes the
object category, all part color names, a 2×3 multi-view grid of RGB renderings, and the aligned part-mask
grid as input. When the checker identifies that the same functional part has been split into multiple inde-
pendent part regions, the pipeline automatically merges the corresponding regions and iterates this check-
and-merge process until no further merges are needed. The accepted output is a face-level segmentation
map that is both geometrically continuous and semantically aligned with functional object structure.
Part-wise semantic annotation. We further extract interaction-oriented semantics from the geometric
part regions. We reuse the segmentation-checker inputs: object category, part color names, and aligned
RGB and part-mask renderings. The RGB views provide appearance, material, and structure cues, while
the masks preserve region identities across viewpoints, enabling the VLM to associate visual cues with the
same 3D part.
These inputs are provided to a VLM (GPT-5.4 [30]) to infer structured attributes for each physically mean-
ingful part, including part name, graspability, task-conditioned grasp scenarios, functional labels, and a
fine-grained semantic description. Graspability and grasp scenarios specify whether the region is suitable as
a robotic contact target; functional labels characterize the part’s role; and the semantic description records
6

appearance-level cues such as color, material, texture, shape, and relative location. The VLM response uses
mask color names to associate each part-level annotation with its corresponding segmented region. We fur-
therapplyaVLM-basedcheckertojudgeandrevisetheresponse,producingthefinalaffordanceannotation.
The verified part-wise semantics form queryable part-level priors for downstream task planning.
Grasp generation and physical validation. GraspGen [31] generates confidence-scored 6-DoF grasp
candidates, which we map to the contacted semantic parts and rank by confidence. We validate these
candidates in SAPIEN [20] through simulated closing, lifting, perturbation, and lowering, retaining only
grasps that remain stable relative to the gripper. The resulting annotations pair part-level interaction
semantics with physically executable grasp proposals for downstream manipulation.
2.4 Task-DrivenInteractiveWorldsGeneration
Problem definition. We formulate task-driven interactive worlds generation as the task of mapping a
natural-language task description (e.g., “Place the fruit onto the plate on the table”) to a fully instantiated
3D world that is directly usable for simulation and satisfies execution constraints. The output comprises
two complementary representations: (i) a Scene Graph—a rooted multiway tree whose nodes correspond
to 3D assets and whose edges encode spatial parent–child relationships—and (ii) a composed interactive
3D world with real-scale geometry, physical properties, and 6-DoF poses for every object, directly loadable
into physics simulators. Unlike prior scene generation methods that take a room category or object list as
input [32, 33], our formulation is task-driven: the system autonomously reasons about which objects are
needed,howtheyrelatespatially,andwherearobotshouldbeplacedtoexecutethedescribedmanipulation
task. This factorization is analogous to green-screen production in filmmaking: instead of jointly generating
every world detail, we model an interactive environment as a background plus the minimal set of task-
relevant interactive assets. The abstraction preserves the semantic and physical constraints required by the
task while substantially reducing world synthesis complexity and rendering cost.
Pipeline overview. As shown in Fig. 5, given a natural-language task description, the pipeline proceeds
in three stages: (1) scene graph generation parses the task into semantic roles, organizes them into a Scene
Graph with explicit spatial relations, and generates per-object visual descriptions; (2) asset generation
instantiateseachnode asa sim-ready 3D asset; and (3) spatial placement computescollision-free, physically
| stable poses | via BFS traversal | and physics | settling. |     |     |     |     |
| ------------ | ----------------- | ----------- | --------- | --- | --- | --- | --- |
Input: Task Description SceneGraph Generation Asset Instantiation BFSSpatial Placement
|                              |     |                   |         | Online Generation | Offline Retrieval | Layout Arrangement |                   |
| ---------------------------- | --- | ----------------- | ------- | ----------------- | ----------------- | ------------------ | ----------------- |
| Task1: Put the fruit on the  |     | Background        |         |                   |                   |                    |                   |
|                              |     |                   |         | (Generation-cli)  | (Asset Gallery)   |                    | TouchabilityCheck |
| table on the plate.          |     | Context           | Kitchen |                   |                   |                    |                   |
|                              |     | D is t r a c tors |         |                   |                   | T D                |                   |
|                              |     |                   | FLOOR   |                   |                   |                    | Io U C h e c k    |
|                              |     | T a r g e t s     | IN      |                   |                   | R                  |                   |
Task2: Put the broccoli on the  R o b o t T P la ce a b i lit yCheck
white dish
|     |     | Table | Robot |     |     | T   |     |
| --- | --- | ----- | ----- | --- | --- | --- | --- |
D
Tasks: …
Layout Composition
|     |     | ON ON | ON ON ON |     |     |     |     |
| --- | --- | ----- | -------- | --- | --- | --- | --- |
Physical steady state
|     |     | Apple Banana | Plate Mug Fork |     |     | t=0 t=6 | t=12 |
| --- | --- | ------------ | -------------- | --- | --- | ------- | ---- |
Quality Assurance:
Physics, geometry, and appearance
|     |     | Shiny red apple   | Matte navy ceramic     |                    |     |     |                    |
| --- | --- | ----------------- | ---------------------- | ------------------ | --- | --- | ------------------ |
|     |     | with a green leaf | mug with curved handle |                    |     |     |                    |
|     |     |                   |                        | Sim-ready 3D Asset |     |     | Sim-ready 3D Scene |
Figure5: Task-driveninteractiveworldsgenerationpipeline: scenegraphgenerationfromanatural-language
task, sim-ready asset instantiation, and BFS-based spatial placement with physics settling.
Scene Graph Generation. Scene decomposition. Given a task description, we prompt an LLM to decom-
poseitintofivesemanticcategories: ROBOT,denotingtherobottype;BACKGROUND,theindoorenviron-
ment;CONTEXT,theprimarypieceoffurniturethatanchorstheinteraction;MANIPULATED_OBJS,the
objects the robot must act upon; and DISTRACTOR_OBJS, plausible scene props unrelated to the task.
7

Figure 6: The same task-driven interactive world layout instantiated across six physics simulators (Genesis,
Isaac Gym, Isaac Sim, MuJoCo, PyBullet, and SAPIEN3), shown in RGB (top) and depth (bottom). The
standardized layout description produced by our pipeline requires no manual adaptation to be loaded and
| executed | in each | back-end, | demonstrating |     | cross-simulator |     | portability. |     |     |     |     |
| -------- | ------- | --------- | ------------- | --- | --------------- | --- | ------------ | --- | --- | --- | --- |
The decomposition enforces semantic consistency: the context object must plausibly belong to the back-
ground. Forexample,akitchencounteriscompatiblewithakitchenbutnotabedroom. Thedecomposition
| also | restricts outputs | to  | rigid | bodies suitable |     | for physics | simulation. |     |     |     |     |
| ---- | ----------------- | --- | ----- | --------------- | --- | ----------- | ----------- | --- | --- | --- | --- |
Hierarchy generation & asset description. A second LLM query organizes the decomposed elements into
a shallow rooted Scene Graph: the background is the root, the context and robot are its children, and
manipulated and distractor objects attach to the context. Edges encode the ON, INSIDE, FLOOR, and IN
relations, while the single-parent structure reduces placement ambiguity. Each asset node also receives a
| visual | description | that | conditions | the | subsequent | generation | stage. |     |     |     |     |
| ------ | ----------- | ---- | ---------- | --- | ---------- | ---------- | ------ | --- | --- | --- | --- |
Asset acquisition. To balance diversity and eﬀiciency, both assets and backgrounds support two sourcing
modes: onlinegenerationandofflinedatabaseretrieval. EachassetnodeintheSceneGraphcanbeinstanti-
atedondemandusingthetext-to-3DpipelinedescribedinSec.2.2,orretrievedfromapre-builtassetlibrary
whenasuitableinstancealreadyexists. Allinstantiatedassetscarryreal-worldscale,mass,friction,collision
geometry, and URDF packaging. Background scenes likewise support both online generation and offline re-
trieval: wegeneratesimplebackgroundswiththebackgroundgenerationmethodofEmbodiedGen[1], while
the large-scale scenes generation module (Sec. 2.5) produces complex backgrounds.
BFS spatial placement. We instantiate the Scene Graph in breadth-first order so that each parent is
placed before its children, sorting siblings by footprint to reserve support space for larger objects. For each
spatial relation, a relation-specific sampler proposes a child position p c on or within the parent geometry
| subject | to support | and | collision | constraints: |     |     |     |     |     |     |     |
| ------- | ---------- | --- | --------- | ------------ | --- | --- | --- | --- | --- | --- | --- |
|         |            |     |           |              |     |     |     | (   |     | )   |     |
∪
|     |     | p ∈H | ,   | Support(B | (p  | ),H )=1, | IoU | B (p | ),    | B =0, | (1) |
| --- | --- | ---- | --- | --------- | --- | -------- | --- | ---- | ----- | ----- | --- |
|     |     | c    | p   |           | c c | p        |     | c    | c j∈P | j     |     |
p
| whereH |     |     |     |     | B   |     |     |     | andP |     |     |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | ---- | --- | --- |
istheparent’ssupportregion, istheprojectedchildfootprint, containssiblingsalready
|     | p   |     |     |     | c   |     |     |     |     | p   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
placed on p. The support predicate prevents unstable placement, while the IoU term avoids inter-object
collisions. Manipulatedobjectsmustadditionallyliewithintherobot’sreachable,forward-facinginteraction
region; when no feasible pose is found, the system resamples the candidate or invokes a relation-specific
fallback. After placement, we settle movable objects under gravity in SAPIEN [20] to resolve residual
penetrationsandfloatingartifacts. Wethenexportthestabilized6-DoFposestoastandardizedlayoutcon-
figurationthatcanbeloadedacrosssimulatorsforvisualizationandbatchedpolicytraining. RoboVerse[26]
providesanonlineexampleofdirectlyloadingthisstandardizedlayoutdescriptionacrossdifferentsimulators
(Fig. 6).2
2https://roboverse.wiki/metasim/get_started/quick_start/16_embodiedgen_layout
8

Input Scene Router World Solver Canonicalizer Sim-ready Scene
task or scene desc. scene blueprint feasible assembly sim-ready packaging S = (R, F, C)
Put the apple fromkitcheninto room semantics room topology sim-ready
the fruit bowl in living room. scene complexity furniture hierarchy scene
A bright modern bedroom.
……
Figure 7: Large-scale scenes generation. A task description is first distilled into a scene blueprint, then
assembled under spatial constraints as a feasible multi-room assembly, and finally canonicalized into a sim-
ready background that can serve as the Background node for task-driven foreground layouts.
2.5 Large-ScaleScenesGeneration
Problem definition. The task-driven interactive worlds generation module in Sec. 2.4 explicitly factors
out the task-relevant interactive foreground assets from the world, leaving an abstract interface occupied
by a placeholder background node. This section answers the other half of that interface: how to automati-
callysynthesize,behindthatplaceholder,alarge-scale, multi-room, navigablesimulation-readyindoorscene,
so that embodied agents are no longer confined to tabletop-scale geometry but can perform long-horizon
navigation and mobile manipulation within a unified physical world. Formally, given a task description T,
this module outputs a triple S = (R,F,C), where R is a room topology graph annotated with door and
window connections, F is a per-room, individually addressable set of furniture instances (each carrying a
visual mesh, a collision proxy, and physical parameters), and C is a globally consistent house-level coordi-
nate frame. Compared to the panorama-back-projected single-mesh background of EmbodiedGen V1 [1],
S simultaneously exposes a real room topology, traversable openings, and independently editable furniture
entities—the conditions such tasks require to be solvable in simulation.
Pipeline overview. We propose a three-stage pipeline that explicitly decouples natural-language-driven
semanticreasoningfromdeterministicgeometricconstraintsolving: (i)Task-conditionedroutingencodes
T into a small set of discrete control signals that specify which room semantics to instantiate and at what
targetcomplexity;(ii)Hierarchicalscenesolvingreshapesaproceduralindoorgenerationframework[34]
fromarender-orientedsynthesizerintoasimulation-orientedsolver,producingroom-orhouse-levelgeometry
populated with a furniture skeleton; (iii) Simulator-agnostic canonicalization performs per-instance
decomposition, collision-proxy generation, and coordinate normalization, then delivers the scene through
URDF as a standardized intermediate representation, reusing the unified format converter of Sec. 2.2 to
reach all major downstream simulators. This shifts the burden of spatial consistency onto a constrained
solver, complementing rather than replacing LLM-driven layout work [32, 33]: the language model makes
only discrete semantic decisions, while the solver guarantees geometric and topological feasibility.
Task-conditioned routing. A vision-language model maps the task T to two discrete controls: room
scopeandscenecomplexity. Localtasksselectaplausibleroomcategory,whereascross-roomorlong-horizon
tasks trigger a whole-house joint solve. The complexity level ℓ ∈ {Minimalist,Simple,Medium,Detail}
9

controls furniture and clutter density, providing an interpretable interface between task requirements and
solver cost.
Hierarchical scene solving. The solver places three semantic scales of furniture in a coarse-to-fine order
under floor-plan and cross-room traversability constraints: it first solves the placement and orientation of
skeleton-level furniture (large items such as beds, sofas, and cabinets that define a room’s function), then
mid-scaleobjectsontopoftheirsupportingsurfaces,andfinallytabletop-scaleclutter. Thecomplexitytierℓ
controlshowmanyoftheselevelsthesolveractivates, exposingscenedensityasasingletunableaxissothat
generation cost scales with task diﬀiculty, from near-empty rooms to fully decorated interiors. To make the
outputtrulyusableforphysicalsimulationratherthanofflinerendering,wereshapetheproceduralgenerator
from render-oriented to simulation-oriented: we suppress geometry that is unparseable to physics back-
ends or merely decorative, and reallocate the solver’s budget toward maintaining feasibility on large-scale
multi-room scenes. The solver resamples infeasible samples under room-connectivity and navigable-opening
constraints.
Simulator-agnostic canonicalization. The geometry produced by the solver is still in a render-oriented
representationandmustundergoasim-readypackagingstepbeforeitisconsumablebyphysicsengines. We
extend the scene-level export with three components: (i) Per-instance decomposition splits the house-
level geometry along furniture and architectural units into individually loadable, individually replaceable
instanceentities,sothatthebackgroundgeneratedherecanbeseamlesslymountedasaBackgroundnode
oftheSceneGraphinSec.2.4,withitsfurnitureinstancesreplaceableorextensiblebyforegroundobjectson
demand; (ii) Convex collision proxy batch-applies the same CoACD [19] convex decomposition used in
Sec. 2.2 across all furniture instances, replacing visual meshes with compact convex hulls as collision proxies
andavoidingthecontactinstabilityandperformancedegradationtypicalofnon-convexmeshesatscenescale;
(iii) Scene-level canonicalization aligns the centroid of the house-level geometry to the world origin,
eliminating the global pose drift that otherwise appears across random seeds and ensuring comparability
for downstream policy training under bulk data generation. The packaging stage natively produces both
URDF and USD and reuses the unified format converter of Sec. 2.2, so house-level backgrounds and object-
level assets reach all major simulators through the same delivery path, with consistent physical semantics
and contact behavior across back-ends. This section therefore delivers not a non-editable visual shell but a
routable, addressable, replaceable, and engine-portable structured sim-ready background. Together with the
object-level assets of Sec. 2.2 and the task-level layouts of Sec. 2.4, it forms the unified world representation
of EmbodiedGen V2: usable on its own for navigation and multi-room exploration, or composed as the
physical background of foreground layouts to constitute end-to-end embodied simulation worlds.
2.6 VibeCodingforStatefulSim-Ready3DWorldEditing
Motivation. We use the term Vibe Coding for iteratively generating and editing simulation-ready 3D
worlds through natural-language dialogue: the user expresses intent conversationally while deterministic,
physics-aware skill backends enforce feasibility and sim-ready output contracts—much as a developer vibes
with an AI coding assistant while the compiler enforces type correctness. Such authoring is intrinsically
iterative—refininginstances,adjustingspatialrelations,restylingassets,andvalidatingphysics—yetneither
conventional3Dpipelines(modeling,physicsannotation,format-specificexport)norprompt-to-scenegener-
ators,whichregeneratethewholesceneoneachprompt,supportstate-preservinglocaledits. Thegenerators
ofSec.2.2–2.5arelikewisesingle-shot,andmodernLLMagents,thoughabletoinvokedomainskillsthrough
typed tool calls, lack a self-describing skill suite for sim-ready 3D worlds. We therefore organize these mod-
ules under an agent–skill–harness abstraction: the solvers become callable sim-ready skills, and a shared
harness maintains a world state that evolves across dialogue turns, converting single-shot generation into an
online editing kernel that reuses the backbone of Eq. (1), CoACD collision proxies, and physics settling.
Architecture and world state. The editing engine contains three components. (i) The agent is an
LLM-based coordinator responsible for dialogue understanding, intent parsing, skill selection, argument
completion, and feedback explanation. (ii) The skills are self-contained capability units; each skill exposes a
natural-language description of its usage, inputs, outputs, and failure modes, and is backed by deterministic
generators, solvers, or exporters from Sec. 2.2–2.5. (iii) The harness is the runtime layer that bridges the
10

agent and skills, maintaining the skill registry, dispatch logic, shared world state, failure loop, and edit
log. Givenacontinuingdialoguestream{u ,u ,...,u },theharnessmaintainsanevolvingsimulation-ready
|             |     |     | 1   | 2 t       |         |     |     |
| ----------- | --- | --- | --- | --------- | ------- | --- | --- |
| world state |     |     |     | (         | )       |     |     |
|             |     |     | S   | = G , A , | P , H , |     | (2) |
|             |     |     |     | t t t     | t t     |     |     |
| G           |     |     | A   |           | P       | H   |     |
where t is the typed Scene Graph, t the sim-ready assets, t their 6-DoF poses, and t the dialogue and
skill-invocationhistory. Foreachinstruction,theagentselectsaskillandtheharnessvalidatesitsarguments,
executesthedeterministicbackend,andcommitsaboundedstateupdate. Everyupdatepreservesgeometric
andphysicalfeasibility,recordsanauditableeditinH
,andkeepsassetsandposesconsistentacrosssimulator
t
backends.
𝑢!Generate a simple kitchen init_background 𝑢"Add a dining table with four chairs gen_asset 𝑢#Have some fruit  𝑢$Remove two chairs
|     |     | inspect_state |     |     | retrieve_asset |     |     |
| --- | --- | ------------- | --- | --- | -------------- | --- | --- |
add_object
inspect_state
| 𝑆%=(𝐺%,𝐴%,𝑃%,𝐻%) |     |     | skills |     |     |     |     |
| ---------------- | --- | --- | ------ | --- | --- | --- | --- |
𝑢!Generate a simple living room 𝑢"Set up a TV, vase, table and chair 𝑢#Set the table for chess 𝑢$Sofa and chess
away, serve tea
𝑢!Generate a simple office 𝑢"Add two office chairs facing the desks 𝑢#Set up the desks 𝑢$Organize the shelf
with decorations
Figure 8: Three Vibe Coding 3D editing sessions (kitchen, top; living room, middle; oﬀice, bottom). From
a bare background S , each session proceeds through three natural-language turns in which typed skills
0
∆S (G,A,P,H).
commit bounded deltas to Green and red arrows indicate added and removed instances;
| all sessions | end as sim-ready, | exportable | scenes. |     |     |     |     |
| ------------ | ----------------- | ---------- | ------- | --- | --- | --- | --- |
Skill suite and runtime contract. We organize the skill suite around four abstractions required by
stateful sim-ready world generation: asset grounding, world composition, stateful editing, and execution
validation (Table 1). Each skill declares its trigger, typed arguments, outputs, and failure behavior. After
Parse and Ground, the harness validates the arguments, invokes the deterministic backend, and commits
the resulting bounded ∆S in the shared asset-and-layout representation. Failed calls return structured
diagnostics for retry, disambiguation, or fallback without modifying the world state. The harness is not
tied to a particular agent implementation: our reference adapter integrates with OpenAI Codex [35] and
Gemini CLI [36] through a shared plugin layer, and any agent framework supporting typed tool calls or
| slash-command | plugins | can connect | to the same | skill set. |     |     |     |
| ------------- | ------- | ----------- | ----------- | ---------- | --- | --- | --- |
Agent–skill editing loop. Algorithm 1 summarizes the Parse–Ground–Invoke–Commit loop. Each
instruction produces a bounded state delta under the current feasibility constraints; successful calls commit
and render the new state, while failed calls return diagnostics without changing it.
11

Table 1: Core skill abstractions exposed by the Vibe Coding agent–skill harness.
| Abstraction |     | Skill |     |     | Role in | the world-state | transition |     |     |     |     |
| ----------- | --- | ----- | --- | --- | ------- | --------------- | ---------- | --- | --- | --- | --- |
asset-creator Materializesopen-vocabularyobjectintentintosim-readyassetcandidates.
asset-retrieval Groundsobjectreferencestoreusableassetswhengenerationisunnecessary.
Assetgrounding
asset-process Preservesmetricandgeometricconsistencyunderasset-leveltransformations.
asset-converter Projectscanonicalassetrepresentationsintosimulator-specificformats.
background-creator Synthesizestask-compatiblebackgroundcontextforinteractivelayouts.
Worldcomposition room-creator Producesstructuredroom-andhouse-levelworldswithcanonicalsceneenti-
ties.
layout-creator Instantiates task semantics as physically grounded foreground–background
layouts.
Stateful
editing spatial-computing Commitsboundedsceneeditsbygroundinglanguagetoaddressableinstances
andcollision-awarespatialconstraints.
Execution
validation sim-runner Closestheloopbyexecutingthecurrentworldstateinsimulationandreturn-
ingvisualorpolicy-relevantfeedback.
| Algorithm | 1                    | Agent–Skill | Interactive |            | Editing Loop. |     |          |              |         |              |             |
| --------- | -------------------- | ----------- | ----------- | ---------- | ------------- | --- | -------- | ------------ | ------- | ------------ | ----------- |
| Require:  | dialogue             | stream      | {u          | }, initial | world state   | S   |          |              |         |              |             |
|           |                      |             |             | t          |               | 0   |          |              |         |              |             |
|           | for each instruction |             | u do        |            |               |     |          |              |         |              |             |
| 1:        |                      |             | t           |            |               |     |          |              |         |              |             |
|           |                      | )←Parse(u   |             | S          |               |     |          |              |         |              |             |
| 2:        | (ω, α                |             |             | , )        |               |     |          | ▷ select     | skill   | and NL       | arguments   |
|           | NL                   |             | t           | t          |               |     |          |              |         |              |             |
|           | α←Ground(α(NL        |             | , S         | )          |               |     |          | ▷ resolve    | typed   | world        | references  |
| 3:        |                      |             |             | t )        |               |     |          |              |         |              |             |
|           | ∆S ←Invoke           |             |             | C(S        |               |     |          |              |         |              |             |
| 4:        |                      |             | ω, α,       | t )        |               |     |          | ▷            | execute | under        | constraints |
| 5:        | if ∆S                | =⊥ then     |             |            |               |     |          |              |         |              |             |
|           | Diagnose(ω,          |             | α, S        | )          |               |     | ▷ return | diagnostics; |         | no state     | mutation    |
| 6:        |                      |             |             | t          |               |     |          |              |         |              |             |
| 7:        | continue             |             |             |            |               |     |          |              |         |              |             |
| 8:        | end if               |             |             |            |               |     |          |              |         |              |             |
|           | S ←Commit(S          |             | ∆S)         |            |               |     |          |              |         |              |             |
| 9:        | t+1                  |             | t ,         |            |               |     |          |              | ▷       | atomic state | update      |
| 10:       | Render(S             |             | )           |            |               |     |          | ▷            | refresh | simulation   | preview     |
t+1
end for
11:
Instance grounding and spatial editing. Ground, handled by the agent, is the interface between
open-ended language and the symbolic world state. It resolves category references (“the chair”), attribute
references (“the largest piece of furniture”), and historical anaphora (“the apple I just placed”) against the
current scene graph, instance appearance, spatial coordinates, and recent edits in H , producing typed ar-
t
guments α for the selected skill ω; low-confidence cases return top-k candidates for user disambiguation.
For spatial edits, Ground maps references to an instance_key and room_id and dispatches them to the
spatial-computing skill, which exposes the scene as a room-partitioned 2D floorplan of addressable in-
stances (Fig. 9) and resolves the ON/BESIDE/IN relations by reusing the collision-IoU term of Eq. (1), with
its support test generalized from object top-surfaces to room free-floor polygons. The offline placement
|     |     |     |     |     |     |     |     | G   |     | P   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
solver thus becomes the online core of this skill, and every committed edit keeps t and t consistent across
| downstream | simulators. |     |     |     |     |     |     |     |     |     |     |
| ---------- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
12

Figure 9: Floorplan canvas of the spatial-computing skill. Each pair shows a top-down rendering (left)
andthecorrespondingsymbolicfloorplanwithroomandinstancelabels(right). Open-vocabularyreferences
aregroundedagainstthiscanvas,andtheskillevaluatesEq.(1)onitsroompolygonsandinstancebounding
boxes.
3 Experiments
3.1 Sim-ReadyPipelineQualityEvaluation
Weablateeachstageofthesim-readypipelineon200held-outassetsspanningdiverseobjectcategories. The
default Full pipeline includes mesh fixing, convex decomposition, and the hierarchical quality checker; each
variant removes one component while keeping the rest unchanged. For this evaluation, we use SAM3D [3]
as the image-to-3D model, and run all experiments on a single NVIDIA RTX 4090 GPU.
Table 2: Ablation study on 200 held-out assets. Each row removes one component from the full pipeline.
±
| Time and      | mesh sizes | are reported | as mean | std. Best | results are in bold. |             |             |
| ------------- | ---------- | ------------ | ------- | --------- | -------------------- | ----------- | ----------- |
|               |            | Human        |         | Collision | Time                 | Visual      | Collision   |
| Setting       |            | Accept.      | ↑       | Success ↑ | (min) ↓              | Mesh (MB) ↓ | Mesh (MB) ↓ |
|               |            |              |         |           | ±                    | ±           | ±           |
| Full pipeline |            | 96.5%        |         | 98.6%     | 2.6 0.4              | 1.43 0.63   | 0.29 0.21   |
|               |            |              |         |           | ±                    | ±           | ±           |
| w/o Quality   | checker    | 91.0%        |         | 98.1%     | 2.2 0.4              | 1.44 0.63   | 0.30 0.22   |
w/o Mesh fixing 95.5% 98.3% 21.3 ± 22.8 51.63 ± 25.87 0.31 ± 0.26
w/o Convex decomp. 94.5% 96.5% 2.3 ± 0.3 1.45 ± 0.64 1.45 ± 0.64
Table 2 reports five metrics. Human Acceptance is the fraction of assets judged sim-ready by annotators,
considering consistency with the input condition, geometric plausibility, coherence of invisible surfaces, and
overall usability as a simulation asset. Collision Success is the average success rate of scripted Franka
Panda top-down grasp-and-lift trials in SAPIEN [20]: we run 4 trials per asset at evenly spaced yaw angles
and count a trial as successful if the object is lifted above an adaptive height threshold proportional to its
bounding-box height. The remaining columns report per-asset processing time and exported mesh sizes.
(96.5%→91.0%)
Quality checker. Removing the quality checker lowers Human Acceptance by 5.5 points
while saving only 0.4min per asset. Without the generate–verify–retry loop, defective samples pass through
uncorrected, degrading visual and semantic completeness. Mesh sizes and Collision Success remain largely
unchanged, confirming that the checker targets perceptual defects rather than geometric properties.
Mesh fixing. Without mesh fixing, downstream processing becomes substantially less eﬀicient: per-asset
|     |     |     | 8×, | 2.6±0.4 | 21.3±22.8min, |     |     |
| --- | --- | --- | --- | ------- | ------------- | --- | --- |
runtime increases by approximately from to and the visual mesh size grows
from1.43MBto51.63MB.Thisdegradationoccursbecauserawgenerativeoutputscontainredundantfaces
and topological defects that severely slow UV unwrapping, texture baking, and convex decomposition [19];
meshes exceeding 50MB per object are also impractical for simulators that batch-load hundreds of assets.
Convex decomposition. Without convex decomposition the collision mesh reverts to the full visual mesh
13

asthecollisionproxy(0.29→1.45MB),forcingthesimulatortooperateonnon-convexsurfaces.
Thisreduces
Collision Success from 98.6% to 96.5% due to unstable contact and grasp failure, while adding negligible
runtimeoverhead(2.6vs.2.3min). Althoughtheabsolutedropismodest,suchcontacterrorscanaccumulate
| in long-horizon | embodied | manipulation | pipelines. |     |     |     |     |     |     |     |
| --------------- | -------- | ------------ | ---------- | --- | --- | --- | --- | --- | --- | --- |
Overall, the three components address complementary failure modes—perceptual acceptance, deployment
eﬀiciency,andcontactreliability—andtogetheryield96.5%HumanAcceptanceand98.6%CollisionSuccess
| at 2.6min | per asset. |     |     |     |     |     |     |     |     |     |
| --------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
3.2 AffordancePipelineQualityEvaluation
We evaluate the affordance autolabeling pipeline on 200 sim-ready assets spanning diverse object categories
under three matched settings. The Baseline uses raw P3-SAM part segmentation [29], part-wise semantic
annotation,andgraspgeneration;thetwovariantsprogressivelyaddgeometry-consistentsegmentationpost-
processing and VLM-guided part merging. All variants use the same asset set and a cascaded protocol, in
which each stage is measured only on assets that pass the preceding stage. We run the evaluation on a
single NVIDIA RTX 4090 GPU and instantiate the VLM-assisted verification and merging module with
GPT-5.4 [30]. For grasp validation, each retained grasp is executed in SAPIEN, and we discard it if the
| object-to-gripper | slip exceeds | 5cm or | 30◦ | during the validation |     | sequence. |     |     |     |     |
| ----------------- | ------------ | ------ | --- | --------------------- | --- | --------- | --- | --- | --- | --- |
Table 3: Ablation study of the affordance autolabeling pipeline on 200 assets. Stage pass rates
are conditional on the previous successful stage, while the end-to-end pass rate is the product of part
segmentation, part semantic annotation, and object-level grasp coverage. Runtime is reported per asset as
±
| mean           | std over both successful | and          | failed | assets.       |     |               |     |            |     |          |
| -------------- | ------------------------ | ------------ | ------ | ------------- | --- | ------------- | --- | ---------- | --- | -------- |
|                |                          | Segmentation |        | Semantic      |     | Grasp         |     | Affordance |     | Runtime  |
|                |                          |              |        | ↑             | ↑   |               | ↑   |            | ↑   | ↓        |
| Setting        |                          | Pass         | Rate   | Validity Rate |     | Coverage Rate |     | Pass Rate  |     | (s)      |
| Baseline       |                          | 47.0%        |        | 98.9%         |     | 66.7%         |     | 31.0%      |     | 109 ± 45 |
| + Post-process |                          | 56.5%        |        | 97.3%         |     | 74.6%         |     | 41.0%      |     | 105 ± 41 |
| + Post-process | + VLM merging            | 69.5%        |        | 99.3%         |     | 72.5%         |     | 50.0%      |     | 94 ± 30  |
Table 3 reports stage-wise and end-to-end metrics. Segmentation Pass Rate measures whether the VLM
checkeracceptsthedecompositionasphysicallymeaningfulfunctionalpartsafterinspectingthealignedRGB
and mask grids, and whether the face-level masks are accurate enough for downstream labeling. Semantic
Validity Rate measures whether each accepted part receives a valid structured annotation with semantic
name, graspability flag, grasp scenarios, functional labels, and appearance description after the checker-
repair loop. Grasp Coverage Rate is computed on the semantic-passed assets and requires the whole object
tohaveatleastonesimulation-validatedcandidategraspposeinthefinalaffordanceannotation,whileassets
that are intrinsically unsuitable for mechanical parallel-jaw grasping and lifting, such as large household
appliances, are treated as satisfying this criterion. Segmentation Pass Rate and Semantic Validity Rate
are first screened by the VLM checker and then manually cross-validated, whereas Grasp Coverage Rate is
computed automatically from the final affordance annotations. Under this cascaded evaluation, Affordance
Pass Rate is computed as the product of the three stage-wise rates and represents the end-to-end yield
of assets with valid part-level semantics and either at least one physically executable grasp or an explicit
| graspability | exemption. |     |     |     |     |     |     |     |     |     |
| ------------ | ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Post-processing. Adding geometry-consistent post-processing improves Segmentation Pass Rate from
47.0%to56.5%,increasingthefractionofassetswithusableface-levelpartmasks. Thisimprovementreflects
theroleofsmooth-componentmergingandsurrounded-fragmentrelabeling,whichreduceprojection-induced
boundary noise and isolated part fragments without collapsing genuine geometric discontinuities. The Se-
manticValidityRateremainshighonthesegmentation-passedassets(98.9%→97.3%),whiletheconditional
GraspCoverageRateincreasesfrom66.7%to74.6%. Theseimprovementsinsegmentationqualityandgrasp
coverage propagate through the cascade, raising Affordance Pass Rate from 31.0% to 41.0%.
VLM verification. Adding VLM-based verification further raises Segmentation Pass Rate to 69.5%, sub-
14

stantially increasing the pool of assets that proceed to grasp generation. By merging regions that represent
thesamefunctionalpartbutareseparatedintherawsegmentation,theVLMcheckerproducespartdecom-
positions that better align with actionable object structure. The Semantic Validity Rate increases to 99.3%,
while the conditional Grasp Coverage Rate remains competitive at 72.5%, suggesting that the VLM module
primarily increases the number of reliable part-level carriers while preserving strong grasp coverage. At the
end-to-end level, the full configuration achieves a 50.0% Affordance Pass Rate, improving over the baseline
| by 19.0 percentage | points. |     |     |     |     |     |     |     |
| ------------------ | ------- | --- | --- | --- | --- | --- | --- | --- |
Eﬀiciency. All variants run in roughly 1.6–1.8 minutes per asset. The full variant is the fastest in this
measurement (94.0 ± 30.2s), compared with 108.5 ± 45.1s for the baseline. Post-processing and VLM
verification add cost to part segmentation because they require face-label refinement, checker rendering,
and up to three merge-and-recheck attempts. However, by suppressing redundant or over-fragmented parts,
thesecomponentsreducethedownstreamworkloadforpart-wisesemanticannotation,graspgeneration,and
simulation-based grasp validation; for example, VLM verification reduces the average number of parts from
5.3 to 3.6. This reduction in downstream computation outweighs the added segmentation overhead, leading
| to a lower | overall per-asset | runtime. |     |     |     |     |     |     |
| ---------- | ----------------- | -------- | --- | --- | --- | --- | --- | --- |
3.3 Task-DrivenInteractiveWorldsGenerationEvaluation
Experimental setup. We generate 150 diverse natural-language manipulation tasks covering different
indoor backgrounds, contexts, manipulated objects, and distractors. Each task is generated end-to-end
followingSec.2.4: anLLMfirstparsesthetaskintoaSceneGraph,thesystemthengeneratesthebackground
andrequiredsim-readyobjectassetsonline,andBFS-basedspatialplacementwithSAPIENphysicssettling
produces a directly loadable interactive world layout. Unless otherwise stated, all eﬀiciency numbers are
measuredunderfullyonlinesequentialgenerationonasingleNVIDIARTX4090GPU.Wemanuallyinspect
the final interactive worlds for direct usability in downstream simulation, using criteria of task-semantic
consistency, correct spatial relations, reasonable object scale, physical stability, and robot executability.
Table 4 reports evaluation results from four perspectives: task-to-graph generation, asset instantiation,
automated quality checking, and final world-level acceptance. The 150 generated interactive worlds contain
778 sim-ready object asset instances across 128 object categories, with an average of 5.19 interactive assets
per world. These results indicate that the Scene Graph representation stably decomposes open-ended tasks
| while maintaining | broad | world-composition | diversity. |     |     |     |     |     |
| ----------------- | ----- | ----------------- | ---------- | --- | --- | --- | --- | --- |
Table4: Stage-wiseprofiling ofthe task-driveninteractiveworldsgeneration pipeline(Sec. 2.4).
Resultsareaggregatedover150generatedinteractiveworldsundersequentialexecutiononasingleNVIDIA
RTX 4090 GPU. QA pass rates denote single-attempt pass rates across asset generation attempts.
|     | Category      |     | Metric           |                   |           |           | Value          |        |
| --- | ------------- | --- | ---------------- | ----------------- | --------- | --------- | -------------- | ------ |
|     | Task-to-Graph |     | Generated        | task-conditioned  |           | worlds    | 150            | worlds |
|     |               |     | Avg. interactive | asset             | instances | per world | 5.19 instances |        |
|     |               |     | Distinct         | object categories | covered   |           | 128 categories |        |
Asset Instantiation Background asset instances generated 150 instances
|     |     |     | Object asset | instances | generated |     | 778 instances |     |
| --- | --- | --- | ------------ | --------- | --------- | --- | ------------- | --- |
25.5±3.5
|     |             |         | Time per          | background   | asset       |      |          | min |
| --- | ----------- | ------- | ----------------- | ------------ | ----------- | ---- | -------- | --- |
|     |             |         | Time per          | object asset |             |      | 3.6±1.1  | min |
|     | Asset QA    |         | Semantic          | Appearance   |             |      | 76.2%    |     |
|     |             |         | Mesh Geometry     |              |             |      | 75.9%    |     |
|     |             |         | Cross-modal       | Text-to-3D   | Alignment   |      | 91.0%    |     |
|     |             |         | Avg. attempts     | per          | valid asset |      | 1.35     |     |
|     | World-Level | Outcome | Total time        | per world    |             |      | 47.7±5.4 | min |
|     |             |         | Final environment |              | acceptance  | rate | 83.3%    |     |
Fig. 10 shows representative layouts generated by the task-driven interactive worlds generation pipeline.
15

Figure 10: Qualitative examples of task-driven interactive worlds generation. Each world is generated from
a task description via a task-conditioned Scene Graph, and contains a background, contexts, manipulated
| objects, | and distractors arranged | into a simulation-ready | layout. |
| -------- | ------------------------ | ----------------------- | ------- |
16

Asset-level Failures
Semantic Appearance Checker Mesh Geometry Checker Cross-modal Text-to-3D Alignment Checker
Prompt: cylindrical mesh metal pen holder with Prompt: striped wooden table with smooth Prompt: glossy ceramic coffee mug with light
glossy black finish and minimalist design. varnish finish. brown speckled surface.
✗Two objects; pen holder and detached cylindrical cap. ✗The table is missing one leg. ✗Extra handles,inconsistent with a typical coffee mug.
Scene-level Failures
Task: Place the lemon into the metal bowl. Task: Pick the sponge and put it in the plate. Task: Put the toy carin the plastic bucket.
✗The lemon is initialized inside the bowl due ✗The sponge is too large for the robotic arm to ✗The bucket starts at the table edge and easily
to a scene-graph relation error. grasp. rolls off.
Figure 11: Representative failure cases in task-driven interactive worlds generation. Top: asset-level failures
filtered by the automated QA modules, including semantic appearance mismatch, mesh defects, and text-
to-3D drift. Bottom: major world-level failure cases corresponding to the non-accepted portion of the final
environment inspection, including task-constraint violation, object-scale mismatch and unstable placement.
Beyond these qualitative examples, the stage-wise profiling in Table 4 shows that fully online generation
takes 47.7±5.4 minutes per world, with background synthesis being the dominant cost (25.5±3.5min).
Each object asset takes 3.6±1.1min to generate. Since the Scene Graph explicitly separates backgrounds
from interactive assets, the system can reuse existing background or object instances from an offline asset
library in practical use, avoiding repeated execution of the most expensive generation steps and reducing
world generation to the order of minutes.
Automated quality checks mainly operate during asset instantiation and prevent errors from propagating
acrossintermediaterepresentations. TheSemanticAppearancecheckerverifieswhethertheforegroundimage
matches the target category and key visual attributes; the Mesh Geometry checker checks whether the
generatedmeshiscompleteandfreeofmajorgeometricdefects; andtheCross-modalText-to-3DAlignment
checkerverifieswhetherthefinal3Dassetremainssemanticallyconsistentwiththeoriginaltextdescription,
capturing semantic drift introduced during 3D generation. The three checkers achieve single-attempt pass
rates of 76.2%, 75.9%, and 91.0%, respectively. With the generate–verify–retry mechanism, each valid asset
requires only 1.35 generation attempts on average. Manual inspection shows that 83.3% of final interactive
worlds can be used for downstream simulation without manual modification. As shown in Fig. 11, the
remaining failures mainly arise from object-scale mismatch, local geometry defects, or imperfect initial
spatial placement, and can typically be corrected by resampling or minor manual adjustment.
3.4 DownstreamClosed-LoopValidation
Beyond static generation quality and manual usability inspection, we examine whether generated environ-
ments support policy learning in the loop by summarizing a separate downstream study. Choi et al. [6] use
EmbodiedGenV2-generatedinteractiveenvironmentsforonlinereinforcementlearning(RL)ofrobotvision-
language-action (VLA) policies, starting from a π -style imitation policy π pretrained on BridgeV2 [37].
0 pre
This places generated scenes inside an actual policy-optimization pipeline, where they must provide stable
interaction dynamics, task diversity, and transferable learning signals rather than merely being visually
plausible or physically loadable.
17

Figure 12: Visualizations from [6]. Left: parallelized RL snapshot for training general pick-and-place using
EmbodiedGenV2-generatedscenes. Right: sim-to-realdeploymentofanEmbodiedGenV2fine-tunedVLA.
Table 5 summarizes the closed-loop results reported by the downstream study. Using only generated scenes,
onlineRLimprovessimulationsuccessfrom9.7%to79.8%. Scalingthenumberofgeneratedtrainingscenes
from N = 1 to N = 50 increases out-of-distribution (OOD) success from 53.2% to 77.9% and reduces the
in-distribution/out-of-distribution (ID–OOD) gap from 41.1 to 2.6 percentage points. In contrast, a policy
trained on three hand-built SimplerEnv [38] scenes transfers poorly to EmbodiedGen V2 scenes, achieving
only36.0%success. Withdomainrandomization,policiestrainedingeneratedenvironmentsfurthertransfer
to real robots, improving overall task success from 21.7% to 75.0% and reducing dynamics failures from
| 66.7% to | 18.3% across 12 real-world | scenes and | 240 trials. |     |     |     |
| -------- | -------------------------- | ---------- | ----------- | --- | --- | --- |
Choi and Xu [7] further use EmbodiedGen V2-generated scenes to train sim-to-real VLA policies for cube
stacking via offline-to-online RL, raising real-world cube-stacking success from 43.1% to 88.9% across 144
trials. Collectively, these results position EmbodiedGen V2-generated environments as a scalable generative
| simulation | substrate for closed-loop | policy improvement. |     |     |     |     |
| ---------- | ------------------------- | ------------------- | --- | --- | --- | --- |
Table 5: Downstream closed-loop validation of generated environments. Results are summarized
from a large-scale sim-to-real vision-language-action (VLA) reinforcement learning study [6].
| Validation | Axis Downstream | Setting | Key Result |     |     |     |
| ---------- | --------------- | ------- | ---------- | --- | --- | --- |
Online trainability Fine-tune π pre using only Simulation success improves from 9.7% to 79.8%, and
|     | EmbodiedGen-generated |     | average completion | time decreases | from 10s | to 8s. |
| --- | --------------------- | --- | ------------------ | -------------- | -------- | ------ |
scenes
Scene-distribution Scale the number of OOD success improves from 53.2% to 77.9%, and the
scaling generated training scenes ID–OOD gap shrinks from 41.1 to 2.6 points.
|     | from N =1 | to N =50 |     |     |     |     |
| --- | --------- | -------- | --- | --- | --- | --- |
Hand-built scene Train on three hand-built The policy reaches 96.7% success on hand-built scenes, but
comparison SimplerEnv scenes and only 36.0% on EmbodiedGen scenes.
|     | evaluate on | EmbodiedGen |     |     |     |     |
| --- | ----------- | ----------- | --- | --- | --- | --- |
scenes
Real-robot transfer 12 real-world scenes and 240 Real-worldtasksuccessimprovesfrom21.7%to75.0%,while
real-robot trials the dynamics failure rate decreases from 66.7% to 18.3%.
18

4 RelatedWork
Priorworkhasadvancedindividualcomponentsofgenerative3Dassets,scenelayout,affordanceannotation,
natural-language editing, and embodied policy learning. EmbodiedGen V2 differs in treating these compo-
nents as one simulation infrastructure problem: generated worlds must satisfy a sim-ready asset contract,
exposeinteractionsemantics,instantiatetask-conditionedlayouts,remaineditableaspersistentworldstates,
and support downstream policy learning without manual scene authoring.
Sim-Ready 3D Asset Generation. 3D generation has evolved rapidly from score-distillation-based opti-
mization [39] to feed-forward generation paradigms (Zero-1-to-3 [40], LRM [41]); state-of-the-art methods
such as TRELLIS [2, 11], SAM3D [3], and Hunyuan3D [8, 10] now achieve end-to-end generation of high-
quality textured meshes. However, these methods optimize for visual fidelity, providing visualization-level
but not simulation-level usability [41]. Several works attempt to bridge this gap: Gen2Sim [42] combines
diffusion-generated meshes with LLM-estimated physical parameters to support robot RL training; PhysX-
3D[43]augmentsTRELLISwithaphysicsVAEtoproduceassetswithexplicitmassandfrictionattributes;
PhysX-Anything [44] employs a VLM-driven pipeline to predict physical properties from a single image;
PhysForge [45] targets interactive virtual environments and guides asset generation with physics simulation
constraints. These works move toward physical asset generation, but they do not jointly enforce the full
sim-ready contract used here: quality-gated generation, mesh repair, collision proxy generation, physical
metadata recovery, and standardized multi-simulator export from open-ended text or image inputs.
3DIndoorSceneLayoutandLarge-ScaleScenesGeneration. LayoutGPT [33] prompts language models
to directly predict object bounding-box coordinates; Holodeck [32] combines GPT-4 reasoning with Obja-
verse asset retrieval to produce navigable indoor environments; PhyScene [46] integrates collision, layout,
and accessibility constraints within a diffusion model, representing an early effort to incorporate physical-
interactivityguidanceatgenerationtime. Morerecently,Rein3D[47]appliesreinforcementlearningtorefine
panoramic diffusion-based indoor scene generation, while Agentic 3D Scene [48] leverages VLM agents for
spatiallycontextualizedreasoningduringscenesynthesis. Thesemethodsmainlytargetsceneplausibilityor
navigability, whereas EmbodiedGen V2 starts from embodied tasks and explicitly decomposes scenes into
robot, background, context, manipulated objects, and distractors before solving physical placement. For
large-scale generation, Infinigen [34] offers a constraint-driven procedural indoor generation framework, but
its collision proxies are not convex-decomposed and it does not accept natural language as a control input.
EmbodiedGen V1 [1] introduced panorama-based single-room background generation, but it lacks the task-
level semantic decomposition, robot reachability constraints, multi-room topology, addressable furniture
instances, and standardized simulator export required by the present world-generation stack.
3DAssetAffordanceLabeling. Earlyaffordanceannotationreliesonmanualeffort: 3DAffordanceNet[27]
establishesabenchmarkcovering23affordancecategories,whileWhere2Act[28]learnsactionableregionson
articulated objects from real robot interaction trajectories—both at high annotation cost and with limited
generalization to novel object categories. Recent work scales coverage through foundation models: P3-
SAM [29] extends SAM to native 3D part segmentation; SegViGen [49] repurposes the structural knowledge
embedded in 3D generative models for part segmentation; ManiTwin [50] scales manipulation annotation
to 100K simulation-ready assets. The key distinction is integration: prior methods provide labels or seg-
mentation pipelines around existing assets, while EmbodiedGen V2 co-produces sim-ready geometry and
structuredpart-levelaffordanceannotationssothatgeneratedobjectsenterscenegenerationwithqueryable
interaction semantics.
Natural-Language-Driven 3D Scene Editing. Chat-Edit-3D [51] enables dialogue-driven iterative scene
editingviavisualexpertmodels,butreliesona2DHash-Atlasmechanismanddoesnotmaintainaphysically
deployable 3D world state. LayoutGPT [33] and Holodeck [32] regenerate the entire scene on each prompt
update,precludingbounded,statefullocaledits. General-purposecodingagents[35,36]lackdomain-specific
19

skills and a persistent world state, while professional authoring tools such as Blender [52] and Maya [53]
do not expose natural-language interfaces. EmbodiedGen V2 connects these two sides: language agents
operate over a persistent typed world state, while domain skills commit bounded edits only after grounding,
collision-aware placement, physical validation, and simulator-compatible export.
EmbodiedPolicyLearningandSim-to-RealTransfer. Vision-language-action (VLA) models [54, 55, 56,
57, 58] marry pretrained vision-language backbones with robot action prediction and demonstrate strong
cross-task generalization; however, online RL fine-tuning demands large quantities of physically plausible
simulationenvironments[6]. EmbodiedbenchmarkssuchasRLBench[59]andManiSkill3[60]providestruc-
tured evaluation tasks, but their fixed scenes and limited asset pools are ill-suited for training generalizable
policies at scale. Domain randomization [61] partially closes the visual domain gap, and works such as
Embody4D [62] explore richer spatiotemporal modeling through 4D world models, yet neither solves the
data-supply problem of generating diverse, physically valid, task-conditioned training environments. Em-
bodiedGen V2 addresses this bottleneck from the environment side by producing sim-ready scenes that can
be used directly in downstream online policy-improvement loops.
5 Conclusion
Thisworkpositionsgenerative3Dworldbuildingassimulationinfrastructureforembodiedintelligence. The
central challenge is not only to produce plausible 3D content, but to generate worlds in which embodied
agents can operate, interact, be evaluated, and learn. Building on EmbodiedGen V1 [1], EmbodiedGen V2
operationalizesthisshiftthroughaunifiedsim-readyworldrepresentation. Thisrepresentationmakesmetric
scale,physicalvalidity,affordances,statefuleditability,andsimulatorinterfacespersistentpropertiesofeach
generated world, so that the output of one stage remains valid input for task generation, policy training,
and evaluation.
EmbodiedGen V2 realizes this view through an executable world-generation stack built on a pluggable sim-
readyassetpipeline. Ratherthantreatingrawgenerativeoutputsasfinalartifacts,theassetpipelinerepairs,
validates, annotates, and exports them as simulator-ready entities, which then compose into language-
conditioned task worlds, large-scale navigable scenes, and stateful Vibe Coding edits. This lets users change
simulationenvironmentsthroughcontrolled,physics-awareoperationsratherthancase-by-casemanualscene
editing. In this sense, the system upgrades sim-ready assets into reusable, policy-ready embodied task
environments.
The evaluation shows that this design improves not only generation quality, but also downstream exe-
cutability. The asset pipeline reaches 96.5% human acceptance and 98.6% collision success, while 83.3% of
task-driven interactive worlds can be used for downstream simulation without manual modification. These
results indicate that the pipeline preserves both perceptual quality and execution constraints across the
asset-to-world generation process. More importantly, the generated environments contribute to policy im-
provement: online reinforcement learning in generated worlds raises simulation success from 9.7% to 79.8%,
and the resulting policies improve real-robot task success from 21.7% to 75.0% [6]. This closes a practical
loop between 3D generation and embodied learning: open-ended intent can be converted into executable
environments, validated through physics and interaction semantics, edited through natural language, and
reused as scalable training and evaluation substrates.
Viewed more broadly, EmbodiedGen V2 points toward a next stage of 3D generative systems measured not
only by visual fidelity or diversity, but also by whether generated worlds can support closed-loop embodied
behavior. Executable world generation provides a path toward richer task curricula, broader sim-to-sim
reuse, and more scalable sim-to-real policy development. This direction can make generated 3D worlds an
increasinglypracticalinterfacebetweenhumantaskspecification,robotlearning,andreal-worlddeployment.
20

References
[1] XinjieWang,LiuLiu,YuCao,RuiqiWu,WenkangQin,DehuiWang,WeiSui,andZhizhongSu. Embodiedgen:
Towards a generative 3d world engine for embodied intelligence, 2025. URL https://arxiv.org/abs/2506.
10600.
[2] Jianfeng Xiang, Zelong Lv, Sicheng Xu, Yu Deng, Ruicheng Wang, Bowen Zhang, Dong Chen, Xin Tong, and
JiaolongYang. Structured3dlatentsforscalableandversatile3dgeneration. arXiv preprint arXiv:2412.01506,
2024.
[3] SAM 3D Team, Xingyu Chen, Fu-Jen Chu, Pierre Gleize, Kevin J Liang, Alexander Sax, Hao Tang, Weiyao
Wang, Michelle Guo, Thibaut Hardin, Xiang Li, Aohan Lin, Jiawei Liu, Ziqi Ma, Anushka Sagar, Bowen Song,
XiaodongWang,JianingYang,BowenZhang,PiotrDollár,GeorgiaGkioxari,MattFeiszli,andJitendraMalik.
Sam3d: 3dfyanythinginimages. arXivpreprintarXiv:2511.16624,2025. URLhttps://arxiv.org/abs/2511.
16624.
[4] Tencent Hunyuan3D Team. Hunyuan3d 2.1: From images to high-fidelity 3d assets with production-ready pbr
material, 2025.
[5] Ze-XinYin,LiuLiu,XinjieWang,WeiSui,ZhizhongSu,JianYang,andjinXie.3d-fixer: Coarse-to-finein-place
completion for 3d scenes from a single image. In Proceedings of the Computer Vision and Pattern Recognition
Conference, 2026.
[6] AndrewChoi,XinjieWang,ZhizhongSu,andWeiXu. Scalingsim-to-realreinforcementlearningforrobotvlas
with generative 3d worlds. arXiv preprint arXiv:2603.18532, 2026.
[7] Andrew Choi and Wei Xu. Rankq: Offline-to-online reinforcement learning via self-supervised action ranking.
arXiv preprint arXiv:2605.11151, 2026.
[8] ZiboZhao,ZeqiangLai,QingxiangLin,YunfeiZhao,HaolinLiu,ShuhuiYang,YifeiFeng,MingxinYang,Sheng
Zhang, Xianghui Yang, Huiwen Shi, Sicong Liu, Junta Wu, Yihang Lian, Fan Yang, Ruining Tang, Zebin He,
XinzhouWang,JianLiu,XuhuiZuo,ZhuoChen,BiwenLei,etal. Hunyuan3d2.0: Scalingdiffusionmodelsfor
high resolution textured 3d assets generation. arXiv preprint arXiv:2501.12202, 2025.
[9] Weiyu Li, Xuanyang Zhang, Zheng Sun, Di Qi, Hao Li, Wei Cheng, Weiwei Cai, Shihao Wu, Jiarui Liu, Zihao
Wang, Xiao Chen, Feipeng Tian, Jianxiong Pan, Zeming Li, Gang Yu, Xiangyu Zhang, Daxin Jiang, and
Ping Tan. Step1x-3d: Towards high-fidelity and controllable generation of textured 3d assets. arXiv preprint
arXiv:2505.07747, 2025.
[10] Zeqiang Lai, Yunfei Zhao, Haolin Liu, Zibo Zhao, Qingxiang Lin, Huiwen Shi, Xianghui Yang, Mingxin Yang,
ShuhuiYang,YifeiFeng,ShengZhang,XinHuang,DiLuo,FanYang,FangYang,LifuWang,SicongLiu,Yixuan
Tang, Yulin Cai, Zebin He, Tian Liu, Yuhong Liu, Jie Jiang, Linus, Jingwei Huang, and Chunchao Guo. Hun-
yuan3d 2.5: Towards high-fidelity 3d assets generation with ultimate details. arXiv preprint arXiv:2506.16504,
2025.
[11] Jianfeng Xiang, Xiaoxue Chen, Sicheng Xu, Ruicheng Wang, Zelong Lv, Yu Deng, Hongyuan Zhu, Yue Dong,
Hao Zhao, Nicholas Jing Yuan, and Jiaolong Yang. Native and compact structured latents for 3d generation.
arXiv preprint arXiv:2512.14692, 2025.
[12] Patrick Esser, Sumith Kulal, Andreas Blattmann, Rahim Entezari, Jonas Müller, Harry Saini, Yam Levi, Do-
minik Lorenz, Axel Sauer, Frederic Boesel, Dustin Podell, Tim Dockhorn, Zion English, Kyle Lacey, Alex
Goodwin, Yannik Marek, and Robin Rombach. Scaling rectified flow transformers for high-resolution image
synthesis. arXiv preprint arXiv:2403.03206, 2024. doi: 10.48550/arXiv.2403.03206.
[13] Kolors Team. Kolors: Effective training of diffusion model for photorealistic text-to-image synthesis. arXiv
preprint, 2024.
[14] Daniel Gatis. rembg. https://github.com/danielgatis/rembg, 2025. A tool to remove images background.
[15] Alexander Kirillov, Eric Mintun, Nikhila Ravi, Hanzi Mao, Chloe Rolland, Laura Gustafson, Tete Xiao,
Spencer Whitehead, Alexander C. Berg, Wan-Yen Lo, Piotr Dollár, and Ross Girshick. Segment anything.
arXiv:2304.02643, 2023.
[16] BRIAAI. Rmbg-1.4: Backgroundremovalmodel. https://huggingface.co/briaai/RMBG-1.4,2023. Accessed:
2025-05-19.
21

[17] Bernhard Kerbl, Georgios Kopanas, Thomas Leimkühler, and George Drettakis. 3d gaussian splatting for real-
time radiance field rendering, 2023. URL https://arxiv.org/abs/2308.04079.
[18] Christoph Schuhmann. Aesthetic subsets in laion 2170337258 samples, 2025. URL http://captions.
christoph-schuhmann.de/aesthetic_viz_laion_sac+logos+ava1-l14-linearMSE-en-2.37B.html. Retrieved
May 16, 2025.
[19] Xinyue Wei, Minghua Liu, Zhan Ling, and Hao Su. Approximate convex decomposition for 3d meshes with
collision-aware concavity and tree search. ACM Transactions on Graphics (TOG), 41(4):1–18, 2022.
[20] FanboXiang,YuzheQin,KaichunMo,YikuanXia,HaoZhu,FangchenLiu,MinghuaLiu,HanxiaoJiang,Yifu
Yuan, He Wang, Li Yi, Angel X. Chang, Leonidas J. Guibas, and Hao Su. SAPIEN: A simulated part-based
interactiveenvironment. InThe IEEE Conference on Computer Vision and Pattern Recognition (CVPR),June
2020.
[21] Erwin Coumans and Yunfei Bai. Pybullet, a python module for physics simulation for games, robotics and
machine learning. http://pybullet.org, 2016–2021.
[22] ViktorMakoviychuk,LukaszWawrzyniak,YunrongGuo,MichelleLu,KierStorey,MilesMacklin,DavidHoeller,
NikitaRudin,ArthurAllshire,AnkurHanda,andGavrielState.Isaacgym: Highperformancegpu-basedphysics
simulation for robot learning, 2021.
[23] Emanuel Todorov, Tom Erez, and Yuval Tassa. Mujoco: A physics engine for model-based control. In 2012
IEEE/RSJ International Conference on Intelligent Robots and Systems, pages 5026–5033. IEEE, 2012. doi:
10.1109/IROS.2012.6386109.
[24] Genesis Authors. Genesis: A generative and universal physics engine for robotics and beyond, December 2024.
URL https://github.com/Genesis-Embodied-AI/Genesis.
[25] NVIDIA. Isaac Sim. https://github.com/isaac-sim/IsaacSim, 2024. Version 5.1.0, Apache-2.0 License.
[26] HaoranGeng,FeishiWang,SonglinWei,YuyangLi,BangjunWang,BoshiAn,CharlieTianyueCheng,Haozhe
Lou, Peihao Li, Yen-Jen Wang, Yutong Liang, Dylan Goetting, Chaoyi Xu, Haozhe Chen, Yuxi Qian, Yiran
Geng,JiagengMao,WeikangWan,MingtongZhang,JiangranLyu,SihengZhao,JiazhaoZhang,JialiangZhang,
Chengyang Zhao, Haoran Lu, Yufei Ding, Ran Gong, Yuran Wang, Yuxuan Kuang, Ruihai Wu, Baoxiong
Jia, Carlo Sferrazza, Hao Dong, Siyuan Huang, Yue Wang, Jitendra Malik, and Pieter Abbeel. Roboverse:
Towards a unified platform, dataset and benchmark for scalable and generalizable robot learning, 2025. URL
https://arxiv.org/abs/2504.18904.
[27] Shengheng Deng, Xun Xu, Chaozheng Wu, Ke Chen, and Kui Jia. 3D AffordanceNet: A benchmark for visual
objectaffordanceunderstanding. InProceedingsoftheIEEE/CVFConferenceonComputerVisionandPattern
Recognition, 2021.
[28] Kaichun Mo, Leonidas J Guibas, Mustafa Mukadam, Abhinav Gupta, and Shubham Tulsiani. Where2Act:
Frompixelstoactionsforarticulated3Dobjects. InProceedingsof the IEEE/CVF International Conference on
Computer Vision, 2021.
[29] ChangfengMa,YangLi,XinhaoYan,JiachenXu,YunhanYang,ChunshiWang,ZiboZhao,YanwenGuo,Zhuo
Chen, and Chunchao Guo. P3-SAM: Native 3D part segmentation. arXiv preprint arXiv:2509.06784, 2025.
[30] OpenAI. gpt-5.4 model. https://developers.openai.com/api/docs/models/gpt-5.4, 2026. Accessed: 2026-
06-24.
[31] Adithyavairavan Murali, Balakumar Sundaralingam, Yu-Wei Chao, Wentao Yuan, Jun Yamada, Mark Carlson,
Fabio Ramos, Stan Birchfield, Dieter Fox, and Clemens Eppner. GraspGen: A diffusion-based framework for
6-DOF grasping with on-generator training. arXiv preprint arXiv:2507.13097, 2025.
[32] Yue Yang, Fan-Yun Sun, Luca Weihs, Eli VanderBilt, Alvaro Herrasti, Winson Han, Jiajun Wu, Nick Haber,
RanjayKrishna,LingjieLiu,ChrisCallison-Burch,MarkYatskar,AniruddhaKembhavi,andChristopherClark.
Holodeck: Language guided generation of 3d embodied ai environments. In Proceedings of the IEEE/CVF
Conference on Computer Vision and Pattern Recognition, pages 16227–16237, 2024.
[33] WeixiFeng,WanrongZhu,Tsu-JuiFu,VarunJampani,ArjunAkula,XuehaiHe,SugatoBasu,XinEricWang,
andWilliamYangWang. Layoutgpt: Compositionalvisualplanningandgenerationwithlargelanguagemodels.
In Advances in Neural Information Processing Systems, 2023.
22

[34] Alexander Raistrick, Lingjie Mei, Karhan Kayan, David Yan, Yiming Zuo, Beining Han, Hongyu Wen, Meenal
Parakh, Stamatis Alexandropoulos, Lahav Lipson, Zeyu Ma, and Jia Deng. Infinigen indoors: Photorealistic
indoor scenes using procedural generation. In Proceedings of the IEEE/CVF Conference on Computer Vision
| and Pattern | Recognition |     | (CVPR), | pages | 21783–21794, |     | June | 2024. |     |
| ----------- | ----------- | --- | ------- | ----- | ------------ | --- | ---- | ----- | --- |
[35] OpenAI. OpenAI Codex CLI. https://github.com/openai/codex, 2025. Accessed: 2026-05-11.
[36] Google. Gemini CLI. https://github.com/google-gemini/gemini-cli, 2025. Accessed: 2026-05-11.
[37] HomerWalke,KevinBlack,AbrahamLee,MooJinKim,MaxDu,ChongyiZheng,TonyZhao,PhilippeHansen-
Estruch,QuanVuong,AndreHe,etal. BridgeDataV2: Adatasetforrobotlearningatscale. InConference on
| Robot Learning |     | (CoRL), | 2023. |     |     |     |     |     |     |
| -------------- | --- | ------- | ----- | --- | --- | --- | --- | --- | --- |
[38] XuanlinLi,KyleHsu,JiayuanGu,KarlPertsch,OierMees,HomerRichWalke,ChuyuanFu,IshikaaLunawat,
Isabel Sieh, Sean Kirmani, Sergey Levine, Jiajun Wu, Chelsea Finn, Hao Su, Quan Vuong, and Ted Xiao.
Evaluating real-world robot manipulation policies in simulation. arXiv preprint arXiv:2405.05941, 2024.
[39] Ben Poole, Ajay Jain, Jonathan T Barron, and Ben Mildenhall. DreamFusion: Text-to-3D using 2D diffusion.
| In International |     | Conference | on  | Learning | Representations, |     | 2023. |     |     |
| ---------------- | --- | ---------- | --- | -------- | ---------------- | --- | ----- | --- | --- |
[40] RuoshiLiu,RundiWu,BasileVanHoorick,PavelTokmakov,SergeyZakharov,andCarlVondrick. Zero-1-to-3:
Zero-shot one image to 3D object. In Proceedings of the IEEE/CVF International Conference on Computer
| Vision, | pages 9298–9309, |     | 2023. |     |     |     |     |     |     |
| ------- | ---------------- | --- | ----- | --- | --- | --- | --- | --- | --- |
[41] Yicong Hong, Kai Zhang, Jiuxiang Gu, Sai Bi, Yang Zhou, Difan Liu, Feng Liu, Kalyan Sunkavalli, Trung Bui,
andHaoTan. LRM:Largereconstructionmodelforsingleimageto3D. InInternationalConferenceonLearning
| Representations, |     | 2024. |     |     |     |     |     |     |     |
| ---------------- | --- | ----- | --- | --- | --- | --- | --- | --- | --- |
[42] Pushkal Katara, Zhou Xian, and Katerina Fragkiadaki. Gen2Sim: Scaling up robot learning in simulationwith
| generative | models. | In International |     | Conference |     | on Robotics |     | and Automation, | 2024. |
| ---------- | ------- | ---------------- | --- | ---------- | --- | ----------- | --- | --------------- | ----- |
[43] Ziang Cao, Zhaoxi Chen, Liang Pan, and Ziwei Liu. PhysX-3D: Physical-grounded 3D asset generation. In
| Advances | in Neural | Information |     | Processing | Systems, | 2025. |     |     |     |
| -------- | --------- | ----------- | --- | ---------- | -------- | ----- | --- | --- | --- |
[44] ZiangCao,FangzhouHong,ZhaoxiChen,LiangPan,andZiweiLiu.PhysX-Anything: Simulation-readyphysical
| 3D assets | from | single image. | arXiv | preprint | arXiv:2511.13648, |     |     | 2025. |     |
| --------- | ---- | ------------- | ----- | -------- | ----------------- | --- | --- | ----- | --- |
[45] YunhanYang,ChunshiWang,JunliangYe,YangLi,ZanxinChen,ZehuanHuang,YaoMu,ZhuoChen,Chun-
chaoGuo,andXihuiLiu. PhysForge: Generatingphysics-grounded3Dassetsforinteractivevirtualworld. arXiv
| preprint | arXiv:2605.05163, |     | 2026. |     |     |     |     |     |     |
| -------- | ----------------- | --- | ----- | --- | --- | --- | --- | --- | --- |
[46] Yandan Yang, Baoxiong Jia, Peiyuan Zhi, and Siyuan Huang. PhyScene: Physically interactable 3D scene
synthesis for embodied AI. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern
| Recognition, | 2024. |     |     |     |     |     |     |     |     |
| ------------ | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
[47] DehuiWang,CongshengXu,RongWei,YueShi,ShoufaChen,DingxiangLuo,TianshuoYang,XiaokangYang,
Yusen Qin, Rui Tang, and Yao Mu. Rein3D: Reinforced 3D indoor scene generation with panoramic video
| diffusion | models. | arXiv preprint |     | arXiv:2604.10578, |     | 2026. |     |     |     |
| --------- | ------- | -------------- | --- | ----------------- | --- | ----- | --- | --- | --- |
[48] Xinhang Liu, Yu-Wing Tai, and Chi-Keung Tang. Agentic 3D scene generation with spatially contextualized
| VLMs. arXiv | preprint | arXiv:2505.20129, |     |     | 2025. |     |     |     |     |
| ----------- | -------- | ----------------- | --- | --- | ----- | --- | --- | --- | --- |
[49] Lin Li, Haoran Feng, Zehuan Huang, Haohua Chen, Wenbo Nie, Shaohua Hou, Keqing Fan, Pan Hu, Sheng
Wang, Buyu Li, and Lu Sheng. SegViGen: Repurposing 3D generative model for part segmentation. arXiv
| preprint | arXiv:2603.16869, |     | 2026. |     |     |     |     |     |     |
| -------- | ----------------- | --- | ----- | --- | --- | --- | --- | --- | --- |
[50] Kaixuan Wang, Tianxing Chen, Jiawei Liu, Honghao Su, Shaolong Zhu, Minxuan Wang, Zixuan Li, Yue Chen,
Huan-angGao,YusenQin,JiaweiWang,QixuanZhang,LanXu,JingyiYu,YaoMu,andPingLuo. ManiTwin:
Scaling data-generation-ready digital object dataset to 100K. arXiv preprint arXiv:2603.16866, 2026.
[51] ShuangkangFang,YufengWang,Yi-HsuanTsai,YiYang,WenruiDing,ShuchangZhou,andMing-HsuanYang.
Chat-Edit-3D:Interactive3Dsceneeditingviatextprompts.InEuropeanConferenceonComputerVision,2024.
[52] BlenderOnlineCommunity. Blender–a3Dmodellingandrenderingpackage. https://www.blender.org,2024.
[53] Autodesk Inc. Autodesk Maya. https://www.autodesk.com/products/maya, 2024.
[54] Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Xi Chen, Krzysztof Choromanski, Tianli
Ding, Danny Driess, Avinava Dubey, Chelsea Finn, et al. RT-2: Vision-language-action models transfer web
| knowledge | to robotic | control. | arXiv | preprint | arXiv:2307.15818, |     |     | 2023. |     |
| --------- | ---------- | -------- | ----- | -------- | ----------------- | --- | --- | ----- | --- |
23

[55] MooJinKim,KarlPertsch,SiddharthKaramcheti,OierMees,SurajGupta,HomerWalke,JoeyHejna,Ayzaan
Wahid, Quan Vuong, Adam Gleave, et al. OpenVLA: An open-source vision-language-action model. arXiv
| preprint arXiv:2406.09246, |     | 2024. |     |     |
| -------------------------- | --- | ----- | --- | --- |
[56] Kevin Black, Noah Brown, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Lachy
Groom, Karol Hausman, Brian Ichter, et al. π 0 : A vision-language-action flow model for general robot control.
| arXiv preprint | arXiv:2410.24164, | 2024. |     |     |
| -------------- | ----------------- | ----- | --- | --- |
[57] Angen Ye, Boyuan Wang, Chaojun Ni, Guan Huang, Guosheng Zhao, Haoyun Li, Jie Li, Jiagang Zhu,
Lv Feng, Peng Li, et al. GigaBrain-0: A world model-powered vision-language-action model. arXiv preprint
| arXiv:2510.19430, | 2025. |     |     |     |
| ----------------- | ----- | --- | --- | --- |
[58] Xuewu Lin, Tianwei Lin, Yun Du, Hongyu Xie, Yiwei Jin, Jiawei Li, Shijie Wu, Qingze Wang, Mengdi Li,
MengaoZhao,ZiangLi,ChaodongHuang,HongzheBi,LichaoHuang,andZhizhongSu. HoloBrain-0technical
| report. arXiv | preprint arXiv:2602.12062, |     | 2026. |     |
| ------------- | -------------------------- | --- | ----- | --- |
[59] Stephen James, Zicong Ma, David Rovick Arrojo, and Andrew J. Davison. RLBench: The robot learning
benchmark & learning environment. IEEE Robotics and Automation Letters, 5(2):3019–3026, 2020.
[60] Stone Tao, Fanbo Xiang, Arth Shukla, Yuzhe Qin, Xander Hinrichsen, Xiaodi Yuan, Chen Bao, Xinsong Lin,
YulinLiu,Tse-kaiChan,etal. ManiSkill3: GPUparallelizedroboticssimulationandrenderingforgeneralizable
| embodied | AI. arXiv preprint | arXiv:2410.00425, | 2024. |     |
| -------- | ------------------ | ----------------- | ----- | --- |
[61] Josh Tobin, Rachel Fong, Alex Ray, Jonas Schneider, Wojciech Zaremba, and Pieter Abbeel. Domain random-
ization for transferring deep neural networks from simulation to the real world. In IEEE/RSJ International
| Conference | on Intelligent | Robots and Systems | (IROS), pages | 23–30, 2017. |
| ---------- | -------------- | ------------------ | ------------- | ------------ |
[62] Peiyan Tu, Hanxin Zhu, Jingwen Sun, Shaojie Ren, Cong Wang, Jiayi Luo, Xiaoqian Cheng, and Zhibo Chen.
Embody4D: A generalist 4D world model for embodied AI. arXiv preprint arXiv:2605.01799, 2026.
24
