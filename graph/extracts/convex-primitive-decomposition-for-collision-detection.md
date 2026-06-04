EUROGRAPHICS2026/B.MasiaandJ.Thies COMPUTERGRAPHICSforum
(GuestEditors) Volume45(2026),Number2
Convex Primitive Decomposition for Collision Detection
JulianKnodt andXifengGao
LightspeedStudios,Bellevue,Washington,USA
Abstract
Creationofcollisionobjectsfor3Dmodelsisatime-consumingtask,requiringmodelerstomanuallyplaceprimitivessuchas
boundingboxes,capsules,spheres,andotherconvexprimitivestoapproximatecomplexmeshes.Whiletherehasbeenwork
in automatic approximate convex decompositions of meshes using convex hulls, they are not practical for applications with
tightperformancebudgetssuchasgamesduetoslowercollisiondetectionandinabilitytomanuallymodifytheoutputwhile
maintaining convexity as compared to manually placed primitives. Rather than convex decomposition with convex hulls, we
deviseanapproachforbottom-updecompositionofaninputmeshintoconvexprimitivesspecificallyforrigidbodysimulation
inspired by quadric mesh simplification. This approach fits primitives to complex, real-world meshes that provide plausible
simulationperformanceandareguaranteedtoenclosetheinputsurface.Wetestconvexprimitivedecompositiononover60
modelsfromSketchfab,showingthealgorithm’seffectiveness.Onthisdataset,convexprimitivedecompositionhaslowerone-
way mean and median Hausdorff and Chamfer distance from the collider to the input compared to V-HACD and CoACD,
withlessthanone-thirdofthecomplexityasmeasuredbytotalbytesforeachcollider.Ontopofthat,rigid-bodysimulation
performancemeasuredbywall-clocktimeisconsistentlyimprovedacross24testedmodels.
1. Introduction beroffacesandvertices.Second,decompositionisdifficulttocon-
trol,sometimesproducingpoorapproximationsinconcaveregions,
Collisionobjectsareanimportantcomponentof3Dgames,defin- fillingholesinemptyspace,andcuttingupplanarsurfaces.Finally,
ing the interactions between the player and the world. The cur- theoutputprimitivesarenotsimilartoartistcreatedcolliders,due
rent flow for game developers and artists for constructing col- torelianceonplanecutting,asymmetryofoutputshapes,andover-
lider meshes can be slow and time-consuming, requiring manual complexity of each component. While this final reason may not
placement of primitives such as capsules, boxes, and spheres, or appearaproblem,itpreventsartistsfromeasilymodifyingcollid-
constructionofconvexhullsandback-and-forthtuningofperfor- ersusingtoolssuchasBlender[Ble18]orUnrealEngine[Epi22].
mance.Priorworkinthisareafocusesonconvexdecompositionof Forthesereasons,wedivergefromthepriorapproachofapprox-
inputmeshes[WLLS22,LA07,MG09,TLJP18]intoconvexhulls, imateconvexdecompositionandfocusinsteadonfittingasubset
andtherehasnotbeenmuchemphasisonfittingprimitivessuchas ofparametricconvexprimitivestorepresentaninputmesh,which
boxes,capsules,andotherconvexprimitivesshapestoapproximate canbeeasilymanipulatedwithexistingtoolsandcloselymatches
aninputmesh.Ontheotherhand,supportwithinphysicsengines artist’smanualworkflow.
such as PhysX [Nvi17] for collision with primitives (boxes, cap-
sules,spheres)isheavilyoptimized,andisconsideredfasterthan Our approach takes inspiration from Quadric Mesh Reduc-
convexhulls.Becauseofthisbelief,artistswillmanuallybuildcol- tion [GH97,Hop99,GH98] and Spherical Quadric Error Met-
lidersdespitetheeffortrequiredtodoso,especiallycomparedto rics[TGB13,TGBE16],witheachmeshfacerepresentingaprimi-
the minimal effort required to use prior fully-automatic collider tive.Theseprimitivesarethengreedilycombinedtogetherbottom-
meshgenerationapproaches. up,producingasimplifiedrepresentation.Thissimplifiedrepresen-
tation,consistingofasetofprimitivesthatcoverthesurfaceofan
Previous approaches for automatic collision object construc- inputmesh,issimilartoOrientedBoundingBoxTrees[GLM96],
tionfocusmostlyonconvexhulldecomposition[WLLS22,MG09, whileallowingformorediversityinprimitives.
TLJP18,And24]forstaticandanimatedmeshes.Theseapproaches
Ourapproachisefficientandcancomputeanarbitrarynumber
generate approximately convex components for an input mesh
of primitives for meshes that have millions of faces. The meshes
basedonconcavitymetricswhichmeasurehowconcaveeachcom-
producedaresuitableforaccurateandefficientcollisiondetection,
ponentis.Priorworkgeneratesasmallnumberofconvexcompo-
whichweverifyusinganoff-the-shelfcollisionsimulation.
nentswhichlookgoodatfirstglance,butsufferfromafewpractical
problems.First,thedecompositionmayhidecomplexitythatslows We collect and test our approach on a dataset of models
simulation,aseachconvexcomponentcanhaveanarbitrarynum- from Sketchfab [Ske22], showing our approach is efficient and
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.
6202
beF
7
]RG.sc[
1v96370.2062:viXra

2of24 J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection
|     | Input |     |     |     | Ours |     | CoACD[WLLS22] |     |     |     | V-HACD[MG09] |     |     |
| --- | ----- | --- | --- | --- | ---- | --- | ------------- | --- | --- | --- | ------------ | --- | --- |
Hausdorff/ChamferNewtoInput↓
|     |     |     |     | 0.0384/9.58×10−3 |     |     | 0.0391/9.42×10−3 |     |     |     | 0.0507/8.51×10−3 |     |     |
| --- | --- | --- | --- | ---------------- | --- | --- | ---------------- | --- | --- | --- | ---------------- | --- | --- |
∥BoundingBoxDiag∥2
|     | |F|=264328 |     |     |     |     |     | 107Hulls(|F|=11812) |     |     |     | 75Hulls(|F|=12408) |     |     |
| --- | ---------- | --- | --- | --- | --- | --- | ------------------- | --- | --- | --- | ------------------ | --- | --- |
1387Boxes,80Spheres,1Cap,1Cyl,11Prism
)sm( emiT Ours
20
CoACD
10 V-HACD
|     |     | 0   |     | 200 |     | 400 | 600 |     |     | 800 |     | 1000 |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | --- |
Frame #
Figure1: Convexprimitivedecompositiononacomplexnon-manifoldmeshwithboundaries.Outputprimitivestightlyadheretotheinput,
andismoreefficientinsimulationthanconvexhulls.Totestperformance,wedropspheresoneachcolliderandmeasureframetimes↓.Our
approach has the closest simulation to the original mesh (i.e. balls in the stairwell), but with higher efficiency than CoACD or V-HACD
shownintheplot,wherex-axisindicatestheframenumber,y-axisindicatestimetaken.Greeninourapproachindicatesaboundingbox,
yellow a cylinder, dark blue a trapezoidal prism, light blue a sphere, and red a capsule. For CoACD and V-HACD, colors are randomly
assignedperconvexcomponent.RenderingartifactsonV-HACDareduetoflippedfaces.cbsin_nass.
robust in practice. We compare our approach to prior approx- Q∗=Q +Q ,andtheoptimalpositionofacombinationofver-
|     |     |     |     |     |     |     | 1   | 2   |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
imate convex decomposition algorithms V-HACD [MG09] and ticescanbecomputedbysolving:
CoACD [WLLS22] on distance from the input mesh, complexity    
|     |     |     |     |     |     |     |     | Q 00 | Q 01 | Q 02 | Q 03 | 0   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---- | ---- | ---- | ---- | --- | --- |
ofoutputcollider,andperformanceindownstreamcollisiondetec- (cid:20) (cid:21)
|                 |     |     |     |     |     |     |     |  Q  | Q   | Q   | Q 13 v |  0  |     |
| --------------- | --- | --- | --- | --- | --- | --- | --- | ---- | --- | --- | ------- | ----- | --- |
| tionsimulation. |     |     |     |     |     |     |     |  10 | 11  | 12  |        | =   | (1) |
|                 |     |     |     |     |     |     |     | Q   | Q   | Q   | Q 23 1 | 0   |     |
|                 |     |     |     |     |     |     |     | 20   | 21  | 22  |         |       |     |
Insummary,wehopetodemonstratethatconvexprimitivede- 0 0 0 1 1
compositionservestofillthegapbetweenresearchincreatingef-
|     |     |     |     |     |     |     | Because | of the simplicity |     | of combining |     | Q due to | its linearity, |
| --- | --- | --- | --- | --- | --- | --- | ------- | ----------------- | --- | ------------ | --- | -------- | -------------- |
ficientcollidersandactualartisticmodelingofcollidermeshesfor
|     |     |     |     |     |     |     | this approach | scales | well | as the size | of the | input mesh | increases. |
| --- | --- | --- | --- | --- | --- | --- | ------------- | ------ | ---- | ----------- | ------ | ---------- | ---------- |
rigidbodysimulation.Ourtestsvalidatethatourapproachissuit-
|     |     |     |     |     |     |     | Edgesaremergedgreedily,basedontheerrorv⊤(Qv0 |     |     |     |     |     | +Qv1 )v,and |
| --- | --- | --- | --- | --- | --- | --- | -------------------------------------------- | --- | --- | --- | --- | --- | ----------- |
ableforcollisiondetectionandmorecloselyadherestotheinput
|     |     |     |     |     |     |     | are used | to build | progressively | coarser | representations |     | of the in- |
| --- | --- | --- | --- | --- | --- | --- | -------- | -------- | ------------- | ------- | --------------- | --- | ---------- |
meshthanpriorworkwhileatthesametimehasreducedcomplex-
|     |     |     |     |     |     |     | putmesh,similar |     | inspiritto | [GH97,SGG∗00,TGB13].Quadric |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --------------- | --- | ---------- | --------------------------- | --- | --- | --- |
ityandbetterperformance.
|     |     |     |     |     |     |     | mesh reduction | is  | used in | industry | and research | as  | a way to re- |
| --- | --- | --- | --- | --- | --- | --- | -------------- | --- | ------- | -------- | ------------ | --- | ------------ |
ducethenumberofelementsincomplexmeshes.Ithasalsobeen
extendedtohandleotherattributesonmeshes,includingvertexcol-
2. RelatedWork
ors,normals,andtexturecoordinates.Quadricshavebeenapplied
2.1. QuadricMeshReduction tomanyproblems,includinghandlingtopologycomputationsthat
[ZBCS∗23],
|     |     |     |     |     |     |     | rely on | mass [HLW24], |     | shape reconstruction |     |     | spec- |
| --- | --- | --- | --- | --- | --- | --- | ------- | ------------- | --- | -------------------- | --- | --- | ----- |
OurapproachislooselybasedonQuadricMeshReduction[GH97, tralsimplification[LLT∗20],andvertexpositionsindualcontour-
| GH98, | Hop99, TK20], | which | reduces | the | number of | triangles |     |     |     |     |     |     |     |
| ----- | ------------- | ----- | ------- | --- | --------- | --------- | --- | --- | --- | --- | --- | --- | --- |
ing[JLSW02].
throughedgecollapse[LT98,HDD∗93]byrepresentingverticesof
trianglesaslinearoperatorsoftheformQv=Σpp⊤,with p∈R4 Quadrics have also been adapted to handle approximation of
defined as the equation of the plane of each face containing ver- meshesasalinearinterpolationofspheres[TGB13,TGBE16].In-
texv∈R3.Theselinearoperatorscanbeefficientlycombinedas
|     |     |     |     |     |     |     | stead of | the standard | quadric | metric, | a newly | proposed | quadric |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------------ | ------- | ------- | ------- | -------- | ------- |
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection 3of24
metric is based on the signed distance to a sphere: d =n⊤(p− splittingapproaches [PS24,ZLGW15].Priorworkmaytargetdif-
c )−r . From this formulation, an approach that solves ferentoutputs,suchasclusteringfacesintoprimitivesrepresented
sphere sphere
forthecenterc andradiusr isderived,andelementscan byquadrics[YLW06,YWLY12,BBN∗20],asmallnon-generalset
sphere sphere
bemergedtogetherinasimilarwayasstandardquadrics.Unlike of primitives [BK02,YJ20,LD17,ZLGW15,LCWK07], oriented
standard quadrics though, the cost function is replaced with the boundingboxes[GLM96,PS24,WHX∗22,LCWK07,BH11],and
sum of squared oriented distances of each sphere to the faces of ellipsoids[LCWK07,BK02].Ourapproachisclosetopriorwork
theverticesthatitsubsumes.SphericalQuadrics(SQEM)leadto thatproducesprimitives,butourapproachismoregeneralasany
acoarseapproximationoftheinputmeshasaninterconnectedse- parametricshapethatsatisfiesasimpleinterfacecanbeused.This
riesofspheres,whichcanthenbeusedforanimation.Becauseof includes, spheres, capsules, boxes, frustums, trapezoidal prisms
itssimplicityandsimilaritytoourgoalofabstractinganinputwith and cylinders, which no previous approach can produce together.
coarseshapes,wedrawinspirationforourapproachfromSpherical Furthermore,priorworkreliesonprimitivespecificfeaturesforfit-
QuadricErrorMetrics.NotethatSQEMisnotcomparabletoour ting.Ourworkintroducestheuseoftheeigendecompositionforthe
method in rigid body simulation, since the parameters of spheres primitive’s orientation, which can be used to fit other parameters
are linearly interpolated along mesh faces and edges and thus it usingtheenclosedpoints,withlessrelianceonprimitivespecific
cannotberepresentedasdiscretecomponentsforcollision. features. Our work also focuses on the specific problem of rigid
bodysimulation.Foracomprehensiveanalysisonpriorwork,see
Our approach builds on the edge collapse operator, replacing
arecentsurveyongeometricprimitivefitting[KYZB19].
theverticesusuallymergedtogetherformeshsimplificationwith
primitivesforeachfacethatareprogressivelymergedtogetherto
formalargerprimitive.Ourformulationisalsosimplerthannormal
2.3. ApproximateConvexDecomposition
quadrics,asweonlyneedtomaintainasinglematrixinR3×3.
Priorworkonconvexdecompositionforcollisiondetectionhasre-
A few mesh simplification approaches in theory could be ap-
volvedaroundapproximateconvexdecomposition[KJS07,MG09,
plied to collision detection [CB17,SGG∗00], but in practice tri- And24,LA07,TLJP18,KFK∗15,AMSF08]. Approximate convex
anglemeshesuseddirectlyinrigidbodysimulationoftenleadto
decompositionreliesonsplittinganinputmeshintoconvexhulls,
objectsclippingthroughfacesandpoorperformance.
approximatingtheshapeoftheinputmeshusingaconcavitymet-
rictodeterminewhethertoasplitashapeintosubparts.Manyof
theseapproachesremeshorvoxelizetheinputtomakeitmanifold,
2.2. ShapeAbstraction
then partition the manifold mesh top-down along cutting planes,
Another approach to simplifying meshes is abstraction using tightlymatchingtheinputshape.Whatwefoundwheninvestigat-
simpler geometric primitives. Geometric primitives, often repre- ingwhetherthisapproachissuitableforgamedevelopmentisthat
sented as parametric models such as signed distance functions, convex hulls are more complex than the count of hulls indicates,
quadrics, or explicit primitives, are used in constructive solid ge- canoccasionallybeimprecise,andarenoteasytomodifywithin
ometry for computer aided design [Lys07] along with paramet- existing DCC tools or engines while maintaining convexity. This
riccurves[MZL∗09].Thereareanumberofdifferentapproaches motivatesourdivergencefromconvexhulldecomposition.
to recovering shapes from input meshes such as random sam-
pling(RANSAC)[SWK07,BBN∗20]anddata-drivenapproaches Onecomponentofpriorwork(andspecificallyCoACD)istheir
[SZTL19,PUG19,LWRC23,LLY∗23].Theseapproachesprimarily useofplane-cuttingofhullsintoseparatecomponents,relyingon
MonteCarlosearchtofindagoodcuttingplane.Duetotheinfinite
workonsimpleinputsandcannotpreservehighfrequencydetails.
numberofcuttingplanecandidates,priorapproachescutonalim-
Oneworkrelatedtoourapproachis [YLW06],whichfitsquadrics
itedsetofaxes,leadingtoexcessiveandpoorcuts.Weevadethis
toasurfacewithLloyd’salgorithmandaEuclideandistancemet-
problementirelybyperformingbottom-upmergingofprimitives.
ric.Theirfittingalsorequiresthecomputationofeigenvectorstofit
Thisallowsustotakeintoaccountlocalcoordinateframes,ridding
quadrics,distinctfromourapproachwhichusesthemforalignment
ourselvesofsuboptimalaxis-alignedconstraints.
only. A number of works stemmed from that work [LCWK07].
Another similar work is [AFS06] which seeks to perform shape Wealsonotethatourapproach’serrormetricusingvolumedif-
approximationbymergingfaces,similartoourapproach.Incon- ferencesisbuiltonpriorworkssuchas [TLJP18]whichusesvol-
trastthough,thispriorworkonlyshows3shapeswithcustomcost umetodeterminewhentosplitahull.Onekeydifferenceisthat
functionspershape(whereasthisworkshows6withthesamecost priorworkoftenrequireswatertightmeshestocomputethevolume
function), and is not guaranteed to enclose the input shape. Fur- oftheinputmesh.Ourapproachdoesnotrequireawatertightinput,
thermore,thatworkdoesnothaveaspecifictargetapplicationand sinceweusethevolumeofthealreadycomputedprimitivesrather
tested on a much smaller dataset, whereas this work has a large thanthemeshitself.
emphasisonvalidationspecificallyforcollisiondetection.
There are also many works using clustering for shape abstrac-
3. Method
tion.Forsuchapproaches,thereareafewdesignchoices.Firstis
choiceofclusteringalgorithm,usuallyLloyd’salgorithm/iterative Given an input mesh M=(V,F),Vi ∈R3,F i ⊆V,|F i |≥3, with
region growing [YLW06,YWLY12,JKS05,LCWK07,MDKK07, eachfaceapolygonofthreeormorevertices,weoutputasetof
WHX∗22],agreedyapproachwhichmergeselementstogetherbot- primitivesP,|P|≤N whereN∈Z + isauser-definedtargetposi-
tomup(similartoourapproach)[GWH01,GH97,YJ20,AFS06],or tivenumberofprimitives.Inourimplementation,Pcanbeacapped
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

4of24 J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection
|     |     |     |     |     |     |     | A   | visualization of | the area |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------------- | -------- | --- | --- | --- |
cylinder,acapsule,asphere,anisoscelestrapezoidalprism,afrus-
tum,oranorientedboundingbox.Ourapproachfollowstraditional weighted Q of an input mesh
quadricmeshreduction[GH97]andconstructsalinearoperator,in (shown in blue), and our
our case a 3×3 matrix, corresponding to each primitive. Linear approach’s output primitives.
Theoutputprimitivesfromour
| operators | support | addition, | (f                                 | +g)(x)= | f(x)+g(x), | and scalar |                           |     |     |     |     |     |
| --------- | ------- | --------- | ---------------------------------- | ------- | ---------- | ---------- | ------------------------- | --- | --- | --- | --- | --- |
|           |         |           | f(kx),k∈R.Boldtextindicatesavector |         |            |            | approacharealignedwiththe |     |     |     |     |     |
multiplication,kf(x)=
inR3.
facestheyenclose.Intheout-
put,cylindersareyellow,ori-
Weoutlineourapproach,startingfrominitializinglinearoper-
|     |     |     |     |     |     |     | ented | boxes are green, | and |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ----- | ---------------- | --- | --- | --- | --- |
ators(Sec.3.1)foreachfaceoftheinputmesh,correspondingto
|     |     |     |     |     |     |     | eigenvectorsoftheinputQfor |     |     | Input | Output |     |
| --- | --- | --- | --- | --- | --- | --- | -------------------------- | --- | --- | ----- | ------ | --- |
oneprimitiveperface,anddescribehowtoconvertlinearoperators eachfaceareredarrows. |F|=216 1Box,2Cyl.
intoprimitivesinSec.3.2.Wethendescribeourgreedyapproach
tocombinetopologicallyadjacentlinearoperators,usingtheinput
mesh’sfaceadjacencyastopology.AkintoQEM’sedge-collapse,
|     |     |     |     |     |     |     | addinganotherfaceQa+Q |     | ,thelargesteigenvectorw |     |     | corre- |
| --- | --- | --- | --- | --- | --- | --- | --------------------- | --- | ----------------------- | --- | --- | ------ |
weuseaminimalexcessvolumecostfunctiontoselectprimitives b 2,a+b
spondstothelargestshareddirectionofbothfaces’normals,and
to merge (Sec. 3.3), and terminate once there are either no more thesecondw willbethesharedcomponentorthogonaltothe
1,a+b
elementstosimplifyorauser-definedcriteriaismet(Sec.3.3).We
first.Whenaddingfaces,thelargesteigenvectorcorrespondstothe
| discuss the | implementation |     | details | in  | Sec. 3.4, and | the full algo- |     |     |     |     |     |     |
| ----------- | -------------- | --- | ------- | --- | ------------- | -------------- | --- | --- | --- | --- | --- | --- |
largestarea-weighteddirectionthatthefacesareorientedtowards,
rithmforourapproachisgiveninAlg.1.
andtheotherswillbeorthogonal.Theorthogonalbasisofeigenvec-
|     |     |     |     |     |     |     | torsw | ,w ,w definesanorientedboundingboxwhichboundsthe |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ----- | ------------------------------------------------ | --- | --- | --- | --- |
|     |     |     |     |     |     |     |       | 2 1 0                                            |     |     |     |     |
Algorithm1ConvexPrimitiveDecomposition correspondingsetoffaces.WeprovideavisualizationofQdefined
Input: Mesh=V ∈R3,F ⊆V,#PrimsN∈Z perinputfaceandtheeigendecompositionofoutputprimitivesin
|     |     |     |     | i   |     | +   |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
de fault t h e i n se t fi g u r e. A n a n a l y s is o f th is o p e ra to r s e ig e nd e c om p o sition
| VolumeThresholdM∈R |                      |     |     | + = | inf |     |            |                           |                    |               |                |          |
| ------------------ | -------------------- | --- | --- | --- | --- | --- | ---------- | ------------------------- | ------------------ | ------------- | -------------- | -------- |
|                    |                      |     |     |     |     |     | a n d i ts | r el a ti o n to p ri n c | i p a l cu r va tu | re i s p ro v | i de d i n [ G | H 99 ] . |
| Output:            | PrimitivesPs.t.|P|≤N |     |     |     |     |     |            |                           |                    |               |                |          |
Preprocessing ▷Removeoverlappedvertices We arrived upon this generalization while crafting an operator
ni =normal(F ),ti =tangent(F ) forcylinders.Insteadofmoreparameters,thesmallesteigenvalue’s
| 1:  |     | i   |     | i   |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
i)(nin⊤ +ϵtit⊤
2: Q i=area(F i i ),P i=Prim(Q i),Vol(f i )=Vol(P i ) eigenvector closely aligns with the cylinder’s axis. We then ob-
3: pq:PriorityQueue servedothereigenvectorsalignwithreasonableboundingboxesfor
4: foradjacentfaces f ,f ∈Fdo ▷InitializePriorityQueue shapesandcanserveasorientations.Thisoperatoridentifiesanori-
|     |     |     | 0 1 |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
5: P∗=Prim(f +f ) entationthatalignscloselywiththelargestarea-weightedtangent
|     |     | 0   | 1   |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
ifVol(P∗)-(Vol(f )+Vol(f ))>Mthencontinue andnormaloftheenclosedfaces.Thisoperatorisnotgloballyop-
| 6:  |     |     | 0   | 1   |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
7: pq.push(priority = Vol(P∗) - (Vol(f ) + Vol(f )), (P∗, f , timal,butgivesgoodapproximations.Anillustrationoftheeigen-
|     |     |     |     |     | 0   | 1 0 |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
f )) vectorsthatcorrespondtoprimitivesisshownintheinsetbelow.
1
8: while!pq.empty()and|P|>Ndo ▷GreedilyMerge For OBBs and isosceles
| 9: (P∗, | f , | f )=pq.pop() |     |     |     |     |     |     | trapezoidal |     | prisms | eigenvectors |
| ------- | --- | ------------ | --- | --- | --- | --- | --- | --- | ----------- | --- | ------ | ------------ |
0 1
| 10: Vol(f | )=Vol(f |     | )=Vol(P∗) |     |     |     |     |     | align | with | faces. For | capsules |
| --------- | ------- | --- | --------- | --- | --- | --- | --- | --- | ----- | ---- | ---------- | -------- |
0 1
| P   | =P    | =P∗ |     | ▷Setbothfacestonewprimitive |     |     |     |     |     |            |     |             |
| --- | ----- | --- | --- | --------------------------- | --- | --- | --- | --- | --- | ---------- | --- | ----------- |
| 11: | f0 f1 |     |     |                             |     |     |     |     | and | cylinders, | one | eigenvector |
12: UpdateCostsofAdjacentPrimitives is aligned with the cylinder’s
Postprocessing ▷Removeprimitivesenclosedbyotherprimitives direction, and other eigenvectors
13: returnUniquePrimitivesP OBB/Prism Cyl/Cap willlieorthogonaltothisaxis.
i
|     |     |     |     |     |     |     | FaceNormalComputation               |                   | Foratrianglev  |     | ,v ,v ,thenormalis |            |
| --- | --- | --- | --- | --- | --- | --- | ----------------------------------- | ----------------- | -------------- | --- | ------------------ | ---------- |
|     |     |     |     |     |     |     |                                     |                   |                |     | 0 1 2              |            |
|     |     |     |     |     |     |     | givenbythecross-productoftheedges:n |                   |                | tri | =(v 2 −v           | 0 )×(v 1 − |
|     |     |     |     |     |     |     | v 0 ). For                          | quads (faces with | four vertices) | the | face’s normal      | is not     |
3.1. LinearOperator
well-definedifthequadisnon-planar.Tocomputeanapproximate
Our linear operator corresponding to a primitive is a 3×3 area- normal for both planar and non-planar quads, we define the nor-
weighted matrix per face of the input mesh, Q. We define Q= malofaquadv ,v ,v ,v asthecross-productofthediagonals:
|     |     |     |     |     |     |     |     | 0 1 | 2 3 |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
nn⊤, n⊤n = 1,n ∈ R3. nn⊤ ∈ R3×3 is the outer product of (v0−v2)×(v1−v3)
|     |     |     |     |     |     |     | n   | =   | .Forplanarquads,thisisexactlycor- |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --------------------------------- | --- | --- | --- |
quad ∥(v0−v2)×(v1−v3)∥2
the normal of a face with itself, which characterizes each face’s rect.Forpolygonswithmorethanfourvertices,wecreateatriangle
QEM(x)=x⊤(nn⊤)x−
| plane. Q | is a subset | of  | QEM’s | metric, |     |     |     |     |     |     |     |     |
| -------- | ----------- | --- | ----- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
2n⊤(p⊤x)x+(p−x)⊤(p−x),withthelinearandconstantterms fanrootedatthe0thvertexwithseparatenormalspertriangle.
| dropped | since they | identify | position. |     | We do not | need positions |     |     |     |     |     |     |
| ------- | ---------- | -------- | --------- | --- | --------- | -------------- | --- | --- | --- | --- | --- | --- |
since we use the vertices within each primitive to compute posi- 3.2. PrimitiveConstructionfromLinearOperators
| tions directly. | To  | derive | a primitive |     | from Q, we | use Q’s eigen- |     |     |     |     |     |     |
| --------------- | --- | ------ | ----------- | --- | ---------- | -------------- | --- | --- | --- | --- | --- | --- |
ToconvertQintoaprimitive,wefirstdecomposeitintoitseigen-
|     |     | WΛW−1,Λ |     |     | (cid:2) | (cid:3) |     |     |     |     |     |     |
| --- | --- | ------- | --- | --- | ------- | ------- | --- | --- | --- | --- | --- | --- |
decomposition Q = = diag( λ 2 λ 1 λ 0 ),W = vectors: w ,w ,w ∈R3,w⊤ wj =0iffi̸= j,w⊤ wi =1, Qwi =
|     |     |     |     |     |     |     |     | 0 1 2 | i   |     | i   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- |
(cid:2) w w w (cid:3)⊤ ,|λ |≥|λ |≥|λ |:forasingleface,Q’slargest ,|λ |≤|λ |≤|λ |,
| 2 1 | 0   | 2   | 1   | 0   |     |     | λiwi | 0 1 2 | implemented | using | the eigendecomposi- |     |
| --- | --- | --- | --- | --- | --- | --- | ---- | ----- | ----------- | ----- | ------------------- | --- |
[MST∗11].Withtheseeigenvectorsastheaxes,
| eigenvectorQw | 2   | =λ 2 w | 2 istheface’sarea-weightednormal.When |     |     |     | tiondescribedin |     |     |     |     |     |
| ------------- | --- | ------ | ------------------------------------- | --- | --- | --- | --------------- | --- | --- | --- | --- | --- |
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection 5of24
|     | Eigenvectors |     | AABB |     | Trapezoidal Prism |     |        |           |     |            |           |     |              |      |
| --- | ------------ | --- | ---- | --- | ----------------- | --- | ------ | --------- | --- | ---------- | --------- | --- | ------------ | ---- |
|     |              |     |      |     |                   |     | Capped | Cylinders |     | For capped | cylinders |     | with a fixed | axis |
a,a⊤a=1andapointontheaxis,p
,wederivetheheightand
cyl
radius:
|     |     | a z |     |     |     |     |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
r=max(∥(I−aa⊤)(p−p
|     |     |     |     | h   |       |     |     |     |          |     |      | cyl )∥ 2 ) |     |     |
| --- | --- | --- | --- | --- | ----- | --- | --- | --- | -------- | --- | ---- | ---------- | --- | --- |
|     |     |     |     |     | z     |     |     |     | p∈P      |     |      |            |     |     |
|     |     | a   |     |     | h     |     |     |     |          |     |      |            |     |     |
|     |     | y   |     |     | z,bot |     |     |     | x(a⊤(p−p |     |      | n(a⊤(p−p   |     |     |
|     |     |     |     | h   |       |     |     | h=m | a        |     | ))−m | i          | ))  | (2) |
|     | a x |     | c   | x   |       | h   |     |     | p∈ P     | cyl | p∈   | P          | cyl |     |
z,top
h y
Thecylinder’svolumeisπr2h.Wecompute1cylinderperaxis,and
choosethecylinderwithminimalcost.
|     |     |     |     |     |     | r   | Capsules | Capsules |     | are similar | to cylinders, |     | with a fixed | axis |
| --- | --- | --- | --- | --- | --- | --- | -------- | -------- | --- | ----------- | ------------- | --- | ------------ | ---- |
top
|     |     | r   |     |     |     |     | asuchthata⊤a=1andpointona,p |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --------------------------- | --- | --- | --- | --- | --- | --- | --- |
cap ,theradiuscomputation
|     |     |     |     |     | h   |     | isthesameasacappedcylinder.Thereisaslightdifferenceforthe |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
r
h r h r height,takingintoconsiderationthattheendsofthecapsulesare
bot
spheres,andtheequationfortheheightisadjustedasfollows:
|     |     | Sphere | Cylinder | Capsule |     | Frustum |     |     |     |     |     |     |     |     |
| --- | --- | ------ | -------- | ------- | --- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
r(p)=∥(I−aa⊤)(p−p
|     |     |     |     |     |     |     |     |     |     |     |     | )∥  | 2   | (3) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
cap
Figure 2: Primitives supported in our approach. First, axes are (cid:113)
h(p)=a⊤(p−p
computedastheeigendecompositionofaquadric,az corresponds )− r2−r(p)2
cap
to the minimum eigenvalue’s eigenvector, ax the max. These axes height=max(h(p))−min(h(p))
are then used to compute an oriented bounding box (OBB). The p∈P p∈P
OBB’scentercandtheaxesarethenusedtofitallotherprimitives.
Capsulesaresupportedindownstreamphysicsapplicationsdueto
theireaseofcomputingdistance,whichiswhyweincludethem.
| we  | fit all | additional parameters |     | for each | primitive | by expanding |     |     |     |     |     |     |     |     |
| --- | ------- | --------------------- | --- | -------- | --------- | ------------ | --- | --- | --- | --- | --- | --- | --- | --- |
Similartocylinders,wecomputeonecapsuleperaxis.
themtofullyenclosethecorrespondingmeshfaces.
|     |     |     |     |     |     |     | Frustum | To  | capture | conical | structures, | we  | also implement | frus- |
| --- | --- | --- | --- | --- | --- | --- | ------- | --- | ------- | ------- | ----------- | --- | -------------- | ----- |
Ourapproachsupportsarbitraryprimitiveswhichsatisfyanin-
terface.Primitivesmusthaveefficientvolumecomputation,becon- tums.Frustumsareinitializedfromtheaxisoftheminimumcost
structibleaszero-volumeelementswithagivenorientationandpo- cylinder,withapositiononthebasep,andaxisa.Theheightisset
identicallytocylinders.Theradiusofthetopandbottomfacesare
| sition, | and | support strictly | increasing |     | their parameters | to enclose |     |     |     |     |     |     |     |     |
| ------- | --- | ---------------- | ---------- | --- | ---------------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
setusingthealgorithmshownin.Alg.2.Thevolumeoftheoutput
| an  | unordered | set of points. | For | our implementation, |     | we use ori- |                  |     |     |              |     |      |     |     |
| --- | --------- | -------------- | --- | ------------------- | --- | ----------- | ---------------- | --- | --- | ------------ | --- | ---- | --- | --- |
|     |           |                |     |                     |     |             | frustumisgivenby |     | π   | h(r 2 +rtopr | +r  | 2 ). |     |     |
ented bounding boxes, spheres, capped cylinders, capsules, frus- 3 t op bot b ot
tums,andisoscelestrapezoidalprisms,showninFig.2.Weoutline
ourimplementationoftheinterfaceforeachprimitivebelow.For Isosceles Trapezoidal Prisms Finally, we implement isosceles
|      |            |            |             |     |             | ∈Rn×3. | trapezoidalprisms.Nopriorworkusesexplicittrapezoidalprisms, |     |     |     |     |     |     |     |
| ---- | ---------- | ---------- | ----------- | --- | ----------- | ------ | ----------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
| each | primitive, | the points | it subsumes |     | are denoted | as p i |                                                             |     |     |     |     |     |     |     |
butwefoundbuildingsoftenhavegableroofsthatresembleatrian-
Weinformallydefinesubsumingaswhenaprimitivemustenclose
apoint.Thisdoesnotincludepointsprimitivesenclosebutarenot gularprismandarepoorlymodeledbyotherprimitives.Wefound
requiredto. isosceles triangular prisms to be numerically unstable because of
thesingularity(zero-widthside)forsubsumingsetsofpoints.In-
stead,isoscelestrapezoidalprismscancloselyapproximateatrian-
| OrientedBoundingBoxes |     |     | Orientedboundingboxesarethefoun- |     |     |     |     |     |     |     |     |     |     |     |
| --------------------- | --- | --- | -------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
gularprismandarenumericallystable.
| dation   | of all | other primitives | since | they    | do not    | require an initial |       |     |            |       |          |     |           |          |
| -------- | ------ | ---------------- | ----- | ------- | --------- | ------------------ | ----- | --- | ---------- | ----- | -------- | --- | --------- | -------- |
| position | and    | their position   | can   | be used | for other | primitives. The    |       |     |            |       |          |     |           |          |
|          |        |                  |       |         |           |                    | Given | the | orthogonal | basis | ax,ay,az | and | center c, | we check |
bounds(ux,uy,uz,lx,ly,lz∈R)ofOBBsarecomputedperaxisas
|     |     |     |     |     |     |     | all 6 | possible | orderings | of axes | and | compute | the half-extents |     |
| --- | --- | --- | --- | --- | --- | --- | ----- | -------- | --------- | ------- | --- | ------- | ---------------- | --- |
|     |     | (v⊤ |     | (v⊤ |     |     |       |          |           |         |     |         |                  |     |
u i =maxp∈P i p)andl i =minp∈P i p),i∈{x,y,z}.Thehalf- (hx,hy,hzt,h ∈ R), where hzt, h are along the axis az on
|     |     |     |     |     |     |     |     | zb  |     |     | zb  |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
extent along each axis is h =max(1 (u −l ),1×10−3), where +ay,−ayrespectively.hxandhyarecomputedidenticallytoOBBs
|     |     |     | i   | 2   | i   | i   |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
1×10−3isincludedtopreventdegeneratevolumes.Weapplythe asmax(a⊤ max(a⊤
|     |     |     |     |     |     |     |     | x (p−c))and |     |     | y (p−c)).Pseudocodeforcomput- |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | --- | --- | ----------------------------- | --- | --- | --- |
same clamping to parameters for other shapes. The center of the ing hzt,h zb is given in the Appendix, Alg. 3. The volume of the
OBBisc = 1 (u +l ),thevolumeis8Π3 h i,withafactorof8 resultingtrapezoidalprismis4hxhy(hzt+h ),withthefactorof4
|     | i   | 2 i i |     |     | i=1 |     |     |     |     |     |     | zb  |     |     |
| --- | --- | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
sinceh iarehalf-extents.OBBsarefitfirst,asotherprimitivesini- ash•arehalf-extents.
tializetheirpositiontothecenteroftheOBB.
Ourconstructionofisoscelestrapezoidalprismsisfastbecause
itusesanunorderedstreamofpointswithoutallocation,butisnot
Spheres Spheresarethesimplestprimitive,startingfromafixed
optimal.Wechosethistradeoffasitisrecomputedeverycollapse.
| center | c (from | the previously | computed |     | OBB), | the radius is r= |     |     |     |     |     |     |     |     |
| ------ | ------- | -------------- | -------- | --- | ----- | ---------------- | --- | --- | --- | --- | --- | --- | --- | --- |
maxp∈P (∥c−p∥ ).Thevolumeofasphereis 4πr3.Spheresare Animplementationcanbeextendedwithadditionalshapesde-
|     |     | 2   |     |     |     | 3   |     |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
thecheapestprimitiveforcollisiondetection,andareuseddespite pending on what is accepted in the downstream application. Our
theircoarseshape. approach does not require that primitives be optimal, since only
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

6of24 J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection
relativecostsbetweenprimitivesmatters.Furthermore,forspecific computedexactlyusingmeshbooleans,andweexperimentallyfind
kindsofshapesitispossiblethatmoreoptimalalgorithmscanbe littlequalityincreasewhenaddinginthisterm.Evenanapproxi-
used,suchasexactOBBsandspheres[O’R85],butfortheother mateapproach,suchasrejectionsampling,incursahighpenalty.
primitivesexactalgorithmsareunknown.Sinceonlyafewprimi- In practice, primitives do not overlap much, especially for clean
tiveshaveexactalgorithmourapproachusesamoregeneralfit. meshesdesignedforgames.DespiteEq.4’ssimplicity,itperforms
wellinpractice,andweleaveexplorationofalternativestofuture
Face-BasedMeshReduction [GH97]and[TGB13]relyonmerg- work. We ablate Eq. 4 against Eq. 5 using rejection sampling in
ing vertices to approximate positions on the input mesh, and the Sec.5,Fig.16,andfindminusculeimprovementbuthighcompu-
surfaceisdefinedbytheedgesandfacesconnectingthesevertices, tationalcost,atleast30×thewall-clocktime.
but our approach uses discrete primitives to represent the input’s
surface.Allowingeachvertextobecoveredbyonlyoneprimitive HandlingDifferentPrimitiveCosts. Indownstreamapplications,
doesnotcoverthesurface,leavingholesintheoutput.Forexample, geometricfitisnottheonlyconsideration,asprimitivevariantsin-
considertheoutputprimitivesifnoedgesarecontracted:theoutput cur different costs. For example, physics engines have primitives
wouldbesmallprimitivesaroundeachvertex,apoorapproxima- for boxes, capsules, and spheres giving them better performance.
tionoftheinputshape.Toremedythis,primitivessubsumefacesof Whenmergingprimitivesbasedonlyonvolumethough,prismsof-
themesh,similarto[GWH01].Eachprimitivecoversallvertices tenhavelowervolumethanOBBs,asubsetoftrapezoidalprisms
ofeachfaceitsubsumes,allowingverticestobecoveredbymul- withhzt =h
zb
,whichmayleadtolowersimulationperformance.
tiple primitives and the union of all primitives covers the mesh’s To incorporate preferences over shape variants, we combine our
surface.Weshowthepooroutputofusingoneprimitivepervertex costfunctionwithauser-providedweighting:V′(p)=k(p)V(p).
inSec.5,Fig.11. k(p)dependsonthetypeofprimitive,andcanbesetpertargetap-
plication.Weuseaweightof1.05forcylinders,1.4fortrapezoidal
prisms,1.0forcapsules,spheresandboundingboxes,and2.1for
3.3. OptimalPrimitiveSelection
frustums.Ourweightingheavilyprefersboundingboxes,capsules
Givenpossibleprimitivesthatencloseapointset,wemustdecide and spheres due to their support in physics engines. We penalize
whichprimitiveisbest.Wemeasurebestintwoways:thegeomet- cylinders, as when they have small radius and large height there
rictightnessoftheprimitive,asmeasuredbytheadditionalvolume islittlevisibledifferencebetweencylindersandcapsules,butcap-
introducedwhenmergingtwoshapesandanabstractcostfunction sulesaremoreperformant.Dependingonusecase,thisweighting
fordownstreamapplications,suchasthecostofcollisiondetection. canbetuned,butthesevaluesstrikeagoodbalancebetweenperfor-
Forourimplementation,weselectparametersthatbalancegeomet- manceandgeometricaccuracy.Weablateourchoiceofweightsas
ricsimilarityandsupportinphysicsengines. comparedtoauniformandalternativeweightinginSec.5,Fig.14.
The choice of primitives in downstream applications is depen-
Collapse Cost Function Our end-goal is to approximate the in-
dent on use case. For example, in a platformer or first-person
put mesh as closely as possible for collisions; we want collision
shooterwhichrequiresprecisecontrolitmaybebettertouseex-
primitivestobeastight-fittingtotheinputsurfaceaspossible.To
pensivecolliderstokeepaccuracy.Forcasessuchasapuzzlegame,
measurethis,weminimizetheexcessvolumeintroducedbyeach
itmaybefinetousecoarserboxes.Webelievethatcurrentlythere
primitivemerge.Thisleadstothefollowingcostfunctionformerg-
is no one correct answer for which primitives to use in all cases,
ingtwoprimitivesp ,p :
0 1
andthatconsiderationmustbetakencasebycase.
C(p ,p )=V(merge(p ,p ))−(V(p )+V(p )) (4)
0 1 0 1 0 1
where V(p) is the volume defined by the primitive p. This cost Termination Termination happens when there are no more col-
functionpenalizesexcessvolumeintroducedbymergingtwoprim- lapsibleedgesorthetargetnumberofprimitivesisreached.Since
itives,andpromotesremovingprimitiveswhichoverlap.Whenthis our approach always decreases the number of primitives, our ap-
cost-functionis0,thereisnopenaltytomergetwoprimitivesto- proachisguaranteedtoterminate.Aftertermination,weoutputpa-
gether, and when it is negative it will reduce the total volume of rametersforallprimitivesorquantizeprimitivestoamesh.
theshape.Usually,thiscost-functionwillbepositive,indicatingan
LikeQEM[GH97],ourapproachreliesontheuserprovidingthe
increaseinvolumeduetomerging.LikeQEM,wecollectalledges
targetnumberofprimitives,whichaffectstheabilitytorepresent
betweenmeshelementsinonepriorityqueue,anditerativelytake
theinputmesh.
theminimumcostcontraction.Foreachmeshelement,westorethe
volumeofitsprimitiveandupdatethevolumeaftereachcollapse.
Excess Volume Thresholding Manually tuning the number of
primitivesgivesgoodresults,butmayprovideinsufficientcontrol
Overlapping Primitives Eq. 4 does not account for double-
over order of merges. Furthermore, some merges introduce more
counted volume of intersecting primitives, which would instead
volumethanmergingtwodisconnectedcomponents.Toallowbet-
leadtothefollowingcostfunction:
ter control of order, we add an optional user-defined excess vol-
C(p ,p )=V(merge(p ,p ))−(V(p )+V(p )−V(p ∩p )) umethreshold,relativetothevolumeoftheaxis-alignedbounding
0 1 0 1 0 1 0 1
(5) boxoftheinput.Ifcombiningtwoprimitivesincreasesthevolume
This primary reason we do not include the volume of the inter- abovethisthreshold,thatmergeisprevented.Thiscanbeusedto
section is because such a computation is expensive, especially if pruneundesirablemergeswithlessmanualtuning.
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection 7of24
3.4. ImplementationDetails caseswhereitisintractable,edgescanbeculledbasedonexcess
volumethresholdingfromSec.3.3.
RemovingRedundantPrimitives Aftertermination,weobserve
that sometimes the points subsumed by one primitive are fully We find if the input mesh has separate components, this may
enclosed by a larger primitive, and there is no point to maintain help our approach, as separate components often delineate dis-
nestedprimitivessincetheyincurcomputationwithoutfunctional- tinct convex objects which should not be merged, and note that
ity.Theseprimitivescanbeculledafterourapproach,bychecking constrainingcollapsestoexistingtopologyhasnothinderedprior
ifallpointssubsumedforeachprimitiveareentirelywithinanother work[Hop99,TGB13,SGG∗00,GWH01].Vertexdeduplicationand
primitive.Weperformaconcurrentpairwisecheckaftersimplifica- pairwisemergesalsomitigateeffectsofinputtopology.
tionandcullinternalprimitives,withnegligibleimpacttothetotal
executioncost. Collapsible Primitive Data Structure Triangle mesh reduction
requiresbookkeepingforeachfaces’indices,butourimplementa-
CoplanarVertices Forcoplanarfaces,thequadricmayhavede- tiondoesnotneedtoretainfaces.Instead,wemustmanagewhich
generateeigenvectors,aprobleminheritedfromtheoriginalQEM. facesaresubsumedbywhichprimitive,forwhichweuseaforest
To fix this, we add a quadric in the tangent space. For quads, ofcycliclinked-lists.Weinitializeonelistperprimitive,witheach
we define a tangent basis that follows the directions of the quad. primitivesubsumingasingleface.Whenmergingtwoprimitives,
To handle general quads including non-planar ones, we use the we select an arbitrary node from each list, and swap pointers to
following as the tangent direction t given vertices v ,v ,v ,v : theirnextelement,mergingthetwoliststogether.Thisallowsfor
0 1 2 3
t=v −v +v −v .Thisisthehalfwayvectorbetweenthequad’s O(1)mergingwithefficientiterationofgroupsatthecostofpointer
0 2 1 3
twodiagonals,whichfollowthedirectionofthequad’sedgesifitis chasing.WealsouseDisjointSetUnions[TvL84]forquicklyiden-
regularandplanar,andgivesareasonablevalueotherwise.Quads tifying which faces have been merged together, allowing for fast
arespeciallyhandledduetotheirprevalenceingameassets. pruningofdeletededgesinthepriorityqueue.
We treat triangles t with counterclockwise edges e ,e ,e ∈
0 1 2
R3,∥e 0 ∥ 2 <∥e 1 ∥ 2 <∥e 2 ∥ 2 ashalfofaregularquad,wheree 2 cor- 4. Results
respondstooneofthequadsdiagonals,bycomputingtheequiva-
lentoftheaboveequationusingthetriangle’sedges:t = 1(e − Toevaluateourapproach,wefocusontwoprimarymetrics:simi-
0 2 0
e +e ). We flip the sign of the tangent based on the orientation larityofsimulationofthenewmeshtotheoriginal(correctness),
1 2
o w o f f h t t e h h r e e e v v n e e r r i t t s i e c x t e h s v e o ∈ n / f o e e r 2 m . : a T t l h = o is f ( i − t s h t e d 0 e ) c s o i i g f rr n ( e e v s d p − o fo n v r d ∈ i q e n 2 u g ) a · d f ( a m e c 2 e e × s a h n n e d s ) w v < ∈ h 0 e i 2 c e h i l s s w e o e t n r 0 e e , a t b i n y o d t n e , s ef t u h fi s e c e n i d e , n s a c e n y c d o m n t d h e a e a r s n i u l u y r m ed t b h e e fi r r c s a t o n - m d an p k d l i - e n f x d o i r t o e y f m e o o a f s c t c h o b c l y l o i m d ti e m p r o s in n m g en e i t n a . s F u s o i r m r ed c u o l i a r n - -
2
rectness, our primary metric is qualitative appearance in simula-
triangulated,suchaswhenameshisimportedintoUE[Epi22].
tion. If the simulation plausibly resembles the original, our ap-
We add the weighted outer product of t to Q, to help improve proach is good enough for downstream usage, since there are no
stability: Q′ =Q+ϵtt⊤. This reduces error in ambiguous cases, goodmeasuresforsimilarityofsimulation.Wealsomeasureone-
butmayreduceadherencetotheinputinothercases.Weshowan directionaldistancefrompointsonthesurfaceofthenewmeshto
ablation of one example where it improves the output quality in theoriginal,whichhasbeenusedinpriorworksuchas [TLJP18],
Sec.5,Fig.10.Wedecidepermeshwhethertoincludethisfactor. but we note that other prior works have ignored geometric dis-
tance[WLLS22,And24].Wechoosetomeasuretheone-directional
Vertex Deduplication A common pitfall we find when running distancefromthenewcollidermeshtotheoriginal,asitpenalizes
our approach on uncleaned meshes is that vertices may be over- falselyfillinginholesandconcaveregions.
lapped. This can happen due to kitbashing or modeling of parts
To measure rigid body simulation efficiency, we test collision
whicharelatercombined.Weshowdeduplicatingsuchverticescan
performance directly in simulation by dropping 5000 spheres on
changetheoutputresultinSec.5,Fig.11.Mergingtheseduplicate
eachmeshandmeasuretheframedurationinthefirst1000frames
verticesbydistanceissimilartonon-edgecontractionsin [GH97]
ofsimulation.Framedurationmeasurementsreflecttwothings:dif-
(alsoknownasvirtualedgecollapses).Arecentpreprint[LZY24]
ferentoutcomesofcollisiondetectionanddifferentperformanceof
exploredvirtualedgecollapsesbetweendistinctcomponents,and
colliders.Weincludeourrigidbodysimulatorinthesupplemental
weleaveexplorationofalternativevirtualedgecollapsestofuture
asanexecutable,withconvexdecompositionsfromourapproach.
work.
Wedonotuseframe-rate(framespersecond),becauseitchanges
non-linearlywithperformance,andframetimeiseasiertoreason
PairwiseComponentMerging Afterperformingreductionbased
about when budgeting time while containing equivalent informa-
ontheconnectivityofprimitives,theremaybenoremainingedges
tiontoframe-rate.
even if the target number of primitives is not met due to discon-
nectedcomponents.Tomeetthetargetnumberofprimitives,edges WetestourapproachonmeshesfromSketchfab,whichhavea
areaddedtocreateafully-connectedgraphanddecimationiscon- mix of triangle, quad, and polygonal faces, and some other data
tinued. Theoretically, this is costly since the number of edges is shown in the appendix. We test on props, buildings, characters,
1|C|(|C|−1)≈O(C2),where|C|isthenumberofcomponentsin plants, and levels/environments. Unlike prior work, our approach
2
the input. In practice, we observe the number of components for handlesnon-manifold,non-watertightmeshesdirectlywithoutpre-
many meshes is small, and all pairs can be computed quickly. In processing.Ourfocusisprimarilyonmeshesforgameswhichhave
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

8of24 J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection
cleantopologyandamixoftrisandquads,butwealsotestona perframe(60fps),thatsavedtimeismeaningful,givingmoretime
few noisy scanned models. For each model, we manually decide forothercomputations.
howmanyprimitivestokeep.
4.2. ComparingComplexity/CostsofColliders
4.1. EfficiencyofCollisionObjects It is difficult to provide an apples-to-apples comparison of com-
plexityofourapproachandCoACD/V-HACD,sincetheirfunda-
Todemonstratetheusabilityofourapproachinrigidbodysimula-
mentalcomponentsareconvexhullswithverticesandfaces,versus
tion,ourprimarymetricisin-simulationwall-timebenchmarking ourparametricprimitives.Evenworse,sincecapsules,spheresand
| to  | validate | collider | performance | and correctness. |     | We caveat that |     |     |     |     |     |     |
| --- | -------- | -------- | ----------- | ---------------- | --- | -------------- | --- | --- | --- | --- | --- | --- |
cylindersdonothaveafinitenumberoffaces,itisnotpossibleto
| performance |     | of any | simulation | is heavily | dependent | on hardware |         |              |                |         |           |           |
| ----------- | --- | ------ | ---------- | ---------- | --------- | ----------- | ------- | ------------ | -------------- | ------- | --------- | --------- |
|             |     |        |            |            |           |             | compare | face counts. | To demonstrate | that we | are using | fewer re- |
andphysicsengine,buttrendsshouldbesimilaracrosssystems.To
sourcesthanCoACD/V-HACD,eventhoughtheprimitivecountis
determineifacollisionissimilartotheinput,wemanuallyinspect
higherthanthehullcount,weusethelowestcommondenomina-
thebehavior,similartopriorworkonsimulation. tor,thenumberofbytesofeachapproach.Wecomputethenumber
|     |     |     |     |     |     |     | of bytes | for all methods, | showing | our approach | is  | less complex, |
| --- | --- | --- | --- | --- | --- | --- | -------- | ---------------- | ------- | ------------ | --- | ------------- |
Simulationdetails Werunallmethodsona8-coreAMDRyzen whileatthesametimeisgeometricallyclosertotheinputwithbet-
7800X3D processor with all processing done on the CPU, using tersimulationwall-clocktimes.Tomeasurecomplexity,wecount
Rapier.Whilemostphysicsenginessupportboxes,capsules,and thenumberofbytespercomponentasperTab.1,withtotalcosts
spheres,supportforcylindersismixed,andnoenginesknownto forallmodelsshownintheAppendix,Tab.5.Noteweunderesti-
theauthorssupporttrapezoidalprismsorfrustums.Rapiersupports matethecostofconvexhullsbyassumingthatintegersfitintwo
(uint_16t),
cylinders,otherwisetheycanbediscretizedandrepresentedascon- bytes when in some rarer cases it is necessary to
vexhulls,whichistheapproachwetookfortrapezoidalprismsand usefourbytes(uint_32t).Whencomparingaggregatestatistics
frustums. on our dataset, convex primitive decomposition, CoACD, and V-
|     |     | Input |     | Ours |     | CoACD |     |     |     |     |     |     |
| --- | --- | ----- | --- | ---- | --- | ----- | --- | --- | --- | --- | --- | --- |
HACDusesonaverage22523.7,93809.3,and68934.1bytes,and
|     |     |     |     |     |     |     | a median         | of 6362,      | 76572, and | 44592 bytes         | respectively. | Clearly,    |
| --- | --- | --- | --- | --- | --- | --- | ---------------- | ------------- | ---------- | ------------------- | ------------- | ----------- |
|     |     |     |     |     |     |     | convex primitive | decomposition |            | creates colliders   | with          | fewer re-   |
|     |     |     |     |     |     |     | sources than     | approximate   | convex     | hull decomposition, |               | with better |
simulationframedurationsthanconvexhulls.Sinceeachprimitive
ischeaperthaneachconvexhull,eventhoughourapproachhasa
largernumberofprimitivescomparedtothenumberofhulls,over-
allitischeaper.Furthermore,evenwithanequalnumberofprim-
|     | |F|=47790 |     |     | 298Prim. | 46Hulls,|F|=9774 |     |     |     |     |     |     |     |
| --- | --------- | --- | --- | -------- | ---------------- | --- | --- | --- | --- | --- | --- | --- |
itivesandhulls,weshowprimitiveshavelowerwall-clocksimula-
138Boxes,146Cyl.,12Sph.
tiontimeinSec.5,Fig.13.
|     | Haus/ChamNewtoInput↓ |     | 0.0112/1.15×10−3 |     | 0.0340/7.10×10−3 |     |     |     |     |     |     |     |
| --- | -------------------- | --- | ---------------- | --- | ---------------- | --- | --- | --- | --- | --- | --- | --- |
∥BoundingBoxDiag∥2 PrimitiveKind MinimumFloatsRequired Total Engine
|     | 20  |     |     |     |     |     | OrientedBox | 3position,3length,4orientation |     |     |     | 10 Yes |
| --- | --- | --- | --- | --- | --- | --- | ----------- | ------------------------------ | --- | --- | --- | ------ |
)sm( emiT Ours
CoACD
|     | 10  | V-HACD |     |         |     |          | Capsule  | 3start-point,3end-point,1radius |                 |     |     | 7 Yes       |
| --- | --- | ------ | --- | ------- | --- | -------- | -------- | ------------------------------- | --------------- | --- | --- | ----------- |
|     |     |        |     |         |     |          | Sphere   |                                 | 3center,1radius |     |     | 4 Yes       |
|     | 0   | 200    |     | 400     | 600 | 800 1000 |          |                                 |                 |     |     |             |
|     |     |        |     | Frame # |     |          | Cylinder | 3start-point,3end-point,1radius |                 |     |     | 7 Some      |
|     |     |        |     |         |     |          | Frustum  | 3start-point3end-point,2radii   |                 |     |     | 8 Quantized |
Figure3:TheRobotVeramodel,testedincollisionsimulationby
|     |     |     |     |     |     |     | Prism | 3position,4length,4orientation |     |     |     | 11 AsHull |
| --- | --- | --- | --- | --- | --- | --- | ----- | ------------------------------ | --- | --- | --- | --------- |
dropping5000spheresontopofit.Asnapshotofourtestsimula-
|     |     |     |     |     |     |     | ConvexHull | 3floatspervertex,3intspertri |     |     |     | - Yes |
| --- | --- | --- | --- | --- | --- | --- | ---------- | ---------------------------- | --- | --- | --- | ----- |
tionisshownontheright,withthemodelfromourapproach.Our
approachisclosertotheinputmodelthanCoACD,whilehaving
betterperformanceasshownintheplotabove.Moremodelcom- Table1:Memorycostsrequiredforeachprimitiveandforconvex
parisonsareinFig.20.cbJohnMesplay. hulls.Orientationsarestoredasquaternions.Forcylinders,some
physicsengineshavedirectsupport.Frustumsarenotsupported,
|     | We evaluated | collision |     | time on 24 | meshes such | as the robot |     |     |     |     |     |     |
| --- | ------------ | --------- | --- | ---------- | ----------- | ------------ | --- | --- | --- | --- | --- | --- |
butcanbequantizedforusage,andprismscanberepresentedas
| shown | in  | Fig. 3, with | more | results in | Fig. 20. | When comparing | convexhulls. |     |     |     |     |     |
| ----- | --- | ------------ | ---- | ---------- | -------- | -------------- | ------------ | --- | --- | --- | --- | --- |
ourapproachwithCoACDandV-HACDonthetwokeyfactorsof
simulationsimilarityandwall-clocktime,ourapproachhasmore ImplementationsofRigid-BodyCollision Tounderstandtheper-
similarcollisionsascomparedtotheinputwithbetterperformance. formance of rigid body simulation with many primitives/convex
Forexample,forthemeshfromFig.1ourapproachholdsspheres hulls, it is useful to understand collision detection’s implementa-
insidethestairwellandonplatforms.Ontheotherhand,CoACD tion.Collisiondetectionhappensintwophases,abroadphasefol-
and V-HACD produce coarse outputs, causing spheres to roll off lowed by a narrowphase. In the broad phase, many comparisons
themesh.Thisbooststheirperformancesincetherearefewercol- areculledusingcoarsecheckssuchasaxis-alignedboundingboxes
lisions but with inaccurate behavior. Despite our approach being and axis overlap checks. The broad phase is independent of the
moresimilartotheinputthanCoACDandV-HACD,ourapproach complexity of each collider, and thus is more agnostic to primi-
hasbetterperformance,oftenbyatleastonetotwomillisecondsper tivesversushulls.Inthenarrowphase,precisealgorithmssuchas
frame.Whendealingwithaperformancebudgetof16milliseconds GJK [GJK88], or primitive-to-primitive checks are used. Due to
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection 9of24
broadphaseculling,itisdifficulttopredictperformance,asusually SummaryStatistics Ours CoACD V-HACD
collisiondetectionskipsmostchecks,andthereareonlyafewex- #Modelsw/Lowest1-wayHausdorff↑ 44 20 4
pensivecomparisons.Intheworstcasethough,objectsmaycollide #Modelsw/Lowest1-wayChamfer↑ 43 3 22
withallprimitivesinthescene,nullifyingthebroadphase.Inour Mean1-wayChamfer↓ 6.95×10−39.91×10−38.82×10−3
|     |     |     |     |     |     |     |     | Median1-wayChamfer↓ |     |     | 5.40×10−39.41×10−37.60×10−3 |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------- | --- | --- | --------------------------- | --- | --- | --- |
case,sincecollisionwithprimitivesischeaperthancollisionwith
|        |       |            |       |                  |     |        |           | Mean1-wayHausdorff↓   |     |     |     | 0.0445 0.0514 |     | 0.0710 |
| ------ | ----- | ---------- | ----- | ---------------- | --- | ------ | --------- | --------------------- | --- | --- | --- | ------------- | --- | ------ |
| convex | hulls | and only a | small | set of expensive |     | checks | are used, |                       |     |     |     |               |     |        |
|        |       |            |       |                  |     |        |           | Median1-wayHausdorff↓ |     |     |     | 0.0346 0.0383 |     | 0.0593 |
convexprimitivedecompositionisfasterthanapproximateconvex
hulldecomposition.
|     |     |     |     |     |     |     |     | Table 2: | Our approach |     | has more | lower 1-way | distances | on our |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | ------------ | --- | -------- | ----------- | --------- | ------ |
datasetfromthegeneratedmeshtotheinputmeshascomparedto
4.3. MeasuringSimilarityofCollisionObjects CoACD[WLLS22]andV-HACD[MG09].
| To demonstrate |     | that our | approach | is robust | at  | producing | faithful |     |     |     |     |     |     |     |
| -------------- | --- | -------- | -------- | --------- | --- | --------- | -------- | --- | --- | --- | --- | --- | --- | --- |
decompositions, we show results on a variety of cases, including replacedwithboxcolliders.Yet,currenttoolscannotautomatically
inputswithholes,multiplecomponents,andenvironments. fitboxes,requiringartiststoplacethemandbalancetrade-offsin
precisionversusruntime,assomeapplicationsneeddetailssuchas
| We  | compare | our approach’s |     | preservation | of  | sharp edges | on a |     |     |     |     |     |     |     |
| --- | ------- | -------------- | --- | ------------ | --- | ----------- | ---- | --- | --- | --- | --- | --- | --- | --- |
heightchangesinthefloorandothersuseoneboxforperformance.
fractal shape as compared to CoACD in Fig. 4. On this model, To reflect the ability to control this trade-off, we show two gran-
our approach is two orders of magnitude closer to the input than ularity of output on an environment in Fig. 6, and one output on
| CoACD, | since | CoACD | rounds | the edges | of the | input shape. | We  |     |     |     |     |     |     |     |
| ------ | ----- | ----- | ------ | --------- | ------ | ------------ | --- | --- | --- | --- | --- | --- | --- | --- |
theBistro[Lum17]sceneintheAppendix,Fig.22.Ouroutputsare
alsocomparethesimulationframeduration,showingthatevenwith
visuallyandquantitativelyfaithfultotheoriginalmeshatbothres-
amoreprecisedecomposition,ourapproachisfaster.
olutions,andpreserveitemssuchasthebarrelsandboxesinFig.6,
|     | Input | ConvexPrim.Decomp. |     |     |     | CoACD |     |     |     |     |     |     |     |     |
| --- | ----- | ------------------ | --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
andwineglassesandutensilsinFig.22.Thevariationinthefloors
|     |     |     |     |     |     |     |     | and walls | show | how our | approach | can be used | to tune | precision. |
| --- | --- | --- | --- | --- | --- | --- | --- | --------- | ---- | ------- | -------- | ----------- | ------- | ---------- |
Bycomparison,convexdecompositionsmoothsoverthepropsand
floorwitharbitrarycuts,givingimplausiblesimulation.
|     |     |     |     |     |     |     |     | We measure         |     | frame    | dura-     |     |     |                |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------ | --- | -------- | --------- | --- | --- | -------------- |
|     |     |     |     |     |     |     |     |                    |     |          |           | 20  |     | Ours (Precise) |
|     |     |     |     |     |     |     |     | tion of simulation |     | of CoACD | )sm( emiT |     |     |                |
Ours (Coarse)
CoACD
|     |     |     |     |     |     |     |     | andourapproachfromFig.6 |     |     |     | 10  |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------------------- | --- | --- | --- | --- | --- | --- |
|F|=8184 5456Boxes 1126Hulls(|F|=53148) shownintheinset.Ourcoarse
|     |     | ut↓ |     |     |     |     |     | andprecisemeshesbothhave |     |     |     | 0 200 | 400 600 | 800 1000 |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------ | --- | --- | --- | ----- | ------- | -------- |
H a us . /C h a m . N e w to I n p 3.34×10−5/3.25×10−5 3.07×10−2/8.02×10−3 Frame #
∥ B o u n d in g B o x D ia g ∥ betterperformancethanCoACD,withbettergeometricsimilarity.
2
|     | )sm( emiT 30 | Ours |     |     |     |     |     |     |     |     |     |     |     |     |
| --- | ------------ | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
20
CoACD
10
4.4. DistancetoOriginalMesh
|     | 0   | 200 | 400 |     | 600 | 800 | 1000 |     |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ---- | --- | --- | --- | --- | --- | --- | --- |
Frame #
|        |        |          |            |     |       |           |        | We measure | geometric |      | similarity | by the one-way | Hausdorff | and        |
| ------ | ------ | -------- | ---------- | --- | ----- | --------- | ------ | ---------- | --------- | ---- | ---------- | -------------- | --------- | ---------- |
| Figure | 4: Our | approach | decomposes | the | input | mesh into | a num- |            |           |      |            |                |           |            |
|        |        |          |            |     |       |           |        | Chamfer    | distances | from | the        | collider to    | the input | mesh, like |
berofprimitiveswhichmorecloselyadheretotheinputmeshthan
[TLJP18].Thekeymotivationforchoosingthismetricisthateach
CoACD,whileallowingfastercollisiondetection.Darkregionson
|     |     |     |     |     |     |     |     | point on | the collider | should | be  | as close to | the input | as possible. |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | ------------ | ------ | --- | ----------- | --------- | ------------ |
theinputmeshareduetooverlappingnon-manifoldfaces.Frame
CompleteresultsareprovidedinTab.4.Acrossourtestedmeshes,
durationcomparisonsforsimulationofcollisionwith5000drop-
ourapproachhasthelowestHausdorffdistancefor44meshes,and
| ping | balls | are shown below; | our | approach | has | faster simulation |     |     |     |     |     |     |     |     |
| ---- | ----- | ---------------- | --- | -------- | --- | ----------------- | --- | --- | --- | --- | --- | --- | --- | --- |
lowestChamferdistancefor43,showninTab.2.Theaverageone-
thanCoACDonallframes.cbnDixbit.
wayhausdorffdistanceonourdatasetforconvexprimitivedecom-
Wealsodemonstrateourapproach’sgenerationofcolliderswith
|     |     |     |     |     |     |     |     | position, | CoACD, | and | V-HACD | are 0.0445, | 0.0514, | and 0.0710, |
| --- | --- | --- | --- | --- | --- | --- | --- | --------- | ------ | --- | ------ | ----------- | ------- | ----------- |
holesbyrunningonamazewhilepreservingtraversabilityinFig.5.
andmedian0.0346,0.0383,and0.0593respectively.Theaverage
| To compare |     | fairly to alternatives, |     | we  | increase | CoACD’s | resolu- |     |     |     |     |     |     |     |
| ---------- | --- | ----------------------- | --- | --- | -------- | ------- | ------- | --- | --- | --- | --- | --- | --- | --- |
chamferdistancesare6.95×10−3,9.91×10−3,8.82×10−3,and
| tion | from 30 | units to 80  | units,  | and set | the concavity | to            | its min- |                                     |     |     |     |     |                   |     |
| ---- | ------- | ------------ | ------- | ------- | ------------- | ------------- | -------- | ----------------------------------- | --- | --- | --- | --- | ----------------- | --- |
|      |         |              |         |         |               |               |          | median5.40×10−3,9.41×10−3,7.60×10−3 |     |     |     |     | respectively.This |     |
| imum | value   | of 0.01. For | V-HACD, | we      | use the       | off-the-shelf | set-     |                                     |     |     |     |     |                   |     |
showsthatconvexprimitivedecompositionconsistentlyhascloser
| tings. | While | CoACD preserves |     | some holes, | the | gaps are | thinned |     |     |     |     |     |     |     |
| ------ | ----- | --------------- | --- | ----------- | --- | -------- | ------- | --- | --- | --- | --- | --- | --- | --- |
geometrytotheoriginal,withlesstotalcomplexity,measuredby
andedgesrounded,whereasourapproachpreservesmostholes.V-
|      |        |             |        |               |     |               |     | byte count. | This    | also shows | how     | CoACD’s           | optimization | for max |
| ---- | ------ | ----------- | ------ | ------------- | --- | ------------- | --- | ----------- | ------- | ---------- | ------- | ----------------- | ------------ | ------- |
| HACD | closes | most holes, | making | it unsuitable |     | for replacing | the |             |         |            |         |                   |              |         |
|      |        |             |        |               |     |               |     | distance    | does so | at the     | cost of | average distance, | whereas      | our ap- |
originalmesh.Wevisualizedifferencesinsimulation,bydropping
proachiscloseronbothmetrics,eventhoughitoptimizesforvol-
| 500 | balls in | Blender [Ble18] | (5000 | is  | used in | simulation, | 500 is |     |     |     |     |     |     |     |
| --- | -------- | --------------- | ----- | --- | ------- | ----------- | ------ | --- | --- | --- | --- | --- | --- | --- |
ume.
onlyforvisualization).Theballspassthroughouroutputandthe
originalmostlyunfettered,whereasCoACDandV-HACDprevent
|     |     |     |     |     |     |     |     | Level of | Detail | Collision | Objects | To demonstrate |     | our approach |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | ------ | --------- | ------- | -------------- | --- | ------------ |
manyfromgoingthrough.
forgeneratingdifferentlevelsofdetailforcolliders,wecreatemul-
Wethendemonstrateourapproachonenvironments.Forgame tiple resolutions for one mesh in Fig. 7, all tested in simulation.
levels,convexdecompositionisoverkillsincefloorsandwallsare Ateachlevelourapproachmaintainsthesimilarityofballsrolling
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

10of24 J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection
Input ConvexPrim.Decomp. CoACD V-HACD
|F|=37191 6982Boxes 669Hulls(|F|=69962) 105Hulls(|F|=3628)
Haus./Cham.NewtoInput↓ 5.72×10−4/4.35×10−4 0.0111/5.524×10−3 0.0163/1.94×10−3
∥BoundingBoxDiag∥2
Figure5:Ourapproachcancleanlypreserveholesinthenon-manifold,non-watertightinputmesh,maintainingitstraversabilityasshown
by the number of balls that can pass through in the second row. Prior convex decomposition approaches reduce the size of holes due to
voxelizationandpreprocessingneededtomakethemeshmanifoldandwatertight,changingthecollisionbehavioroftheoutputcollider.
cbTalaei-dev.
Input,|F|=17986 Ours(Coarse),54Boxes,5Cylinders Ours(Precise),536Boxes,5Cylinders CoACD,90Hulls(|F|=6984) V-HACD,17Hulls(|F|=1298)
Hausdorff/ChamferNewtoInput↓ 3.09×10−2/5.47×10−3 3.06×10−2/1.55×10−3 1.67×10−2/5.48×10−3 5.48×10−2/4.83×10−3
∥BoundingBoxDiag∥2
Figure6:Ourapproachcanautomaticallyfitcollidersforenvironmentsatmultipleresolutions,whilemorecloselyadheringtotheinputas
comparedtoCoACDandV-HACD,maintainingsharpfeaturessuchastheboxes,barrels,andchest,andcanbeeditedeasily.cbKarthik
Naidu.
LevelOfDetailComparisonofOurApproachForSimulation
Input DecreasingResolution→
15
10
5
0 200 400 600 800 1000
Frame #
)sm(
emiT
20 Primitives
100 Primitives
299 Primitives
483 Primitives
|F|=4569 470Boxes,1Cap,8Cyl,4Prism 292Boxes,3Cyl,4Prism 94Boxes,6Prism 19Boxes,1Prism
GenerationTime(sec): 0.208 0.977 1.408 1.640
Figure7:Wecompareourapproachatmultiplelevelsofdetailforasinglemesh,varyingonlythetargetnumberofoutputprimitives.Our
approachgracefullydegradesfromahigh-resolutionapproximationoftheinputtoalowerresolutionapproximation.Atdifferentresolutions,
thesimulationusingourcolliderstillresemblestheinputmesh.Rigid-bodycollisiontimeforeachresolutionisshownintheplot.Themore
precisemeshesaregeneratedfasterthancoarsemeshes,asourapproachisbottomup.cbMikailKaraca.
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection 11of24
|     |     | Input |     |     | NoMaxAddedVolume |     |     | 5.  | Ablations |     |     |     |     |     |     |
| --- | --- | ----- | --- | --- | ---------------- | --- | --- | --- | --------- | --- | --- | --- | --- | --- | --- |
↓
|     | #Primitives, | ChamferNewtoInput |     |     | 13Boxes,2.37×10−3 |     |     |     |     |     |     |     |     |     |     |
| --- | ------------ | ----------------- | --- | --- | ----------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
∥BoundingBoxDiag∥2 Inthefollowingsections,weablatesomeofourdesignchoices.
|     |                      |     |     |     |                      |     |     |     | Input     |     | Weight=0 |     |     | Weight=1×10−2 |     |
| --- | -------------------- | --- | --- | --- | -------------------- | --- | --- | --- | --------- | --- | -------- | --- | --- | ------------- | --- |
|     | 1×10−2BoundingVolume |     |     |     | 1×10−4BoundingVolume |     |     |     | |F|=15965 |     |          |     |     |               |     |
25Boxes,10Prisms,2.35×10−3 107Boxes,1.21×10−7 1272Boxes,12Cap,116Cyl,2Sph1327Boxes,12Cap,53Cyl,2Sph
|     |     |     |     |     |     |     |     | Haus./ChamferNewtoInput↓ |     |     | 6.33×10−2/5.95×10−3 |     |     | 5.54×10−2/4.38×10−3 |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------ | --- | --- | ------------------- | --- | --- | ------------------- | --- |
∥BoundingBoxDiag∥2
Figure8:Ourapproachcanbecontrolledusingthemaximumal-
Figure10:Comparisonofourapproachwithandwithouttangent
lowedvolumeaddedwhenmergingtwoprimitives.Ifmergingtwo
weightsforeachinputface’squadric.Withouttangents,primitives
primitivestogetherexceedssome(Seelabelaboveimagesforthis
|     |     |     |     |     |     |     |     | may | not properly | align | with | planar faces, | resulting | in worse | ap- |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ------------ | ----- | ---- | ------------- | --------- | -------- | --- |
example’svalues)fractionoftheinputmesh’saxis-alignedbound- proximationsasshownbythecylinders.Withanaddedquadricin
ingbox’svolume,mergingisforbidden.Thisallowscloseradher- thelongestedge’sdirection,primitivesalignmorecloselywitheach
| encetotheoriginalmesh.cbjellystuff. |     |     |     |        |            |         |     | face.cbLokomoto. |     |     |     |     |     |     |     |
| ----------------------------------- | --- | --- | --- | ------ | ---------- | ------- | --- | ---------------- | --- | --- | --- | --- | --- | --- | --- |
|                                     |     |     |     | 9: The | wall-clock | runtime | of  |                  |     |     |     |     |     |     |     |
our implementation scales lin- Coplanar Vertices Tangent Quadric To demonstrate adding a
earlywiththeinputmesh’snum- tangentweightfromSec.3.4,wevisualizeoutputswithandwith-
|     |     |     |     |        |        |              |     | out | tangent edge | weights | in  | Fig. 10. | Many coplanar | faces | in the |
| --- | --- | --- | --- | ------ | ------ | ------------ | --- | --- | ------------ | ------- | --- | -------- | ------------- | ----- | ------ |
| 200 |     |     |     | ber of | faces, | which allows | our |     |              |         |     |          |               |       |        |
inputareconvertedtocylindersduetoambiguitywithnoweight,
| )sdnoces( emiT 150 |     |     |     | approach | to  | scale, processing |     |     |     |     |     |     |     |     |     |
| ------------------ | --- | --- | --- | -------- | --- | ----------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
mesheswithmillionsoffaces.In butwithedge-weightstheseprimitivesmorecloselyalignwiththe
100
theworstcase,performancemay inputmesh’sfaces,allowingthemtobetighterOBBs.
50 be O(|V|2) if one primitive con- Input VertexDedup. NoDedup.
| 0   |          |                      |         | tains nearly | all | vertices, | but we |     |     |     |     |     |     |     |     |
| --- | -------- | -------------------- | ------- | ------------ | --- | --------- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
|     | 0 200000 | 400000 600000 800000 | 1000000 |              |     |           |        |     |     |     |     |     |     |     |     |
neverobservethisinpractice.
Input #Faces
offtheroof,demonstratingourapproach’sversatility.Thesimula-
| tion | run-time | at each level | also shows | that | varying | the resolution |     |     |     |     |     |     |     |     |     |
| ---- | -------- | ------------- | ---------- | ---- | ------- | -------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
providesawaytotuneperformanceversusgeometricsimilarity.
|            |        |        |            |       |       |                |         |        | |F|=20816 |            | 8Boxes,19Cyl |              | 18Boxes,12Cyl |             |      |
| ---------- | ------ | ------ | ---------- | ----- | ----- | -------------- | ------- | ------ | --------- | ---------- | ------------ | ------------ | ------------- | ----------- | ---- |
| Limiting   | Excess | Volume | To control | how   | close | the collection | of      |        |           |            |              |              |               |             |      |
|            |        |        |            |       |       |                |         | Figure | 11:       | Comparison | of           | our approach | with          | and without | ver- |
| primitives | should | adhere | to the the | input | mesh, | users can      | control |        |           |            |              |              |               |             |      |
theoutputmesh’sadherencetotheoriginalusingamaximalexcess tex deduplication and the same number of target primitives. The
volume.InFig.8,theinputmeshisacollectionofcardboardboxes deduplicated model has additional primitives enclosed, leading
withflapsinvariouspositions.Bylimitingtheexcessvolumeintro- to a lower final number of primitives. Deduplicating vertices
changesthetopologyoftheinputmesh,leadingtodifferentresults.
ducedpercollapse,theoutputhashighergeometricsimilarity,but
cb“FinBeenWhere?”.
moreprimitives.Dependingontheuser’sgoal,excessvolumecan
betunedtobalancethetrade-offbetweenprecisionandefficiency.
|     |     |     |     |     |     |     |     | VertexDeduplication |     |     | Wetestourapproachwithandwithoutver- |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------- | --- | --- | ----------------------------------- | --- | --- | --- | --- |
texdeduplicationinFig.11.Deduplicatingverticescanchangere-
| Timing | Our | implementation | efficiently |     | decomposes | meshes | and |     |     |     |     |     |     |     |     |
| ------ | --- | -------------- | ----------- | --- | ---------- | ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
sultssinceitincreasespossibleedgecollapses.Withoutdeduplicat-
eventhoughthetheoreticaltimecomplexityofcollapseisatleast
ing,componentssuchasbarrelhoopsarenotmergedwiththebody,
O(nlogn)duetoreorderingthepriorityqueuethewall-clocktime
butotherregionssuchasthehatarepreserveddifferently.Formost
| scales | linearly | with the | size of the | input | mesh. | We visualize | the |     |     |     |     |     |     |     |     |
| ------ | -------- | -------- | ----------- | ----- | ----- | ------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- |
cases,wefindexactlyoverlappedvertexmergingimprovestheout-
| time | to decompose | an input | mesh | in Fig. | 9, with | exact | time per |     |     |     |     |     |     |     |     |
| ---- | ------------ | -------- | ---- | ------- | ------- | ----- | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
putqualityoftheresult.
meshinTab.3.Forsmallmeshes,ourapproachcompletesinunder
asecond.Thisisacceptableastheapproachisdesignedtoprocess
meshes offline. In the worst case, our algorithm may be slow if Vertexvs.FaceMerging Toshoweachvertexmustcorrespondto
oneprimitiverepeatedlymergesandnoothersdo,asitwillhave multipleprimitives,weshowourapproachonalekythoswithprim-
manyneighborsandenclosealargenumberofpointswithO(|V|2) itivespervertexorfaceinFig.12.Vertexmergingleavesmuchof
complexity. In practice this case does not appear, since it would theinputsurfaceuncovered,unsuitableforuseasacollider,show-
leadtoahighvolumeerror. ingtheimportanceofusingfacestorepresentprimitives.
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

12of24 J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection
Input VertexMerging FaceMerging
|F|=1075 86Boxes,1Cyl,13Prisms 62Boxes,3Cyl,35Prisms
Figure 12: Our approach using per-vertex merging and per-face
merging. Per-vertex merging leaves large portions of the input
(shown in white) uncovered, whereas merging faces covers the
wholesurface.cbnGlobalDigitalHeritageandGDH-Afrika.
Input Ours CoACD
|F|=4861 70Prim.(57OBB,7Cyl,6Prism) 70Hull(|F|=10462)
Haus./ChamferNewtoInput↓ 3.57×10−2/1.26×10−2 5.53×10−2/1.06×10−2
∥BoundingBoxDiag∥2
15
10
5
0 200 400 600 800 1000 Frame #
)sm(
emiT
ComparisonofWeightingPerPrimitiveKind
Input OurWeighting
|F|=106464 221Boxes,11Cap,126Cyl,9Prism
Haus./ChamferNewtoInput↓ 9.62×10−3/1.92×10−3
∥BoundingBoxDiag∥2
Uniform(All=1) Sph(0.5)/Cap(0.75)/OBB(1)
25Boxes,139Cyl,201Prism 147Boxes,142Cap,66Spheres
7.33×10−3/2.87×10−3 1.17×10−2/4.01×10−3
20
10
0 200 400 600 800 1000
Frame #
Ours
CoACD
Figure 13: Our approach compared to CoACD with an identical
numberofprimitivesandconvexhulls,andsimilargeometricsim-
ilarity. Our approach has faster simulation than CoACD, as the
collisionwithhullsdependsonthenumberofverticesandfaces.
cbGiora.
Comparing Primitive & Hull Counts We show hull and prim-
itive counts do not reflect cost by comparing simulation with an
equalnumberofprimitivesandhullsinFig.13.Despitematching
counts,primitivesarefasterinsimulation,asthenumberofhulls
masksthenumberoffacesandverticesusedinGJK.
Primitive Variant Cost Ablation We ablate our set of costs for
eachvariantofprimitive,bycomparingourweightingtouniform
weighting(allweightssetto1)andaweightingwithonlyspheres,
capsules, and OBBs in Fig. 14. When using uniform weighting,
many prisms are output. We also test a weighting that only uses
the common primitives, where spheres, capsules and OBBs have
weightsof0.5,0.75,and1.5respectively.Theoutputofthisweight-
ingisalsoreasonable,butiscoarserinsomeregionslikethelegs,
comparedtoourweighting.Weplotthesimulationtimeforeach
weighting, to highlight the trade-off of geometric similarity and
simulationperformance.Astheuniformweightinghasprismsthat
areconvertedtohulls,itisslowerthanourweighting.Ontheother
hand,usingonlydirectlysupportedprimitivesleadstofastersim-
)sm(
emiT
Ours Sph/Cap/OBB
Uniform
Figure 14: Our approach with different sets of weights. Uniform
weightingoutputsmoreisoscelestrapezoidalprisms,reducingper-
formance in simulation as shown in the plot. We also compare a
weightingwhichheavilyfavorsspheres(0.5),capsules(0.75),and
OBBs(1)witheverythingelsedisabled,andobservethatthiscan
improvesimulationperformancebutwithlessgeometricsimilarity.
OBBsareshowningreen,capsulesinorange,cylindersinyellow,
prismsinblue,andspheresinlightblue.cbAdoni.
ulationtime,butwithlessgeometricsimilarity.Ourweightingbal-
ancesthetwoapproaches.
Scanned Data To demonstrate our approach on noisy data, we
benchmarkourapproachona3DscanoftheWatBenchamabophit
inFig.15.Thisscancontains999956faces,withholesonthebot-
tom.Ourapproachstillaccuratelydecomposestheinputmesh,and
preservesholesevenwiththehighdensity,whilemaintainingsmall
featuressuchascolumnsoftheinnergateandchofaontheroof.
IntersectingPrimitiveAblation Weablatethecostfunctionfrom
Eq.4versusEq.5inFig.16,byapproximatingtheintersection’s
volumeusingdenserejectionsampling.Wesamplepointsfromin-
side the smaller primitive, and estimate the intersection’s volume
asthefractionofpointscontainedintheotherprimitivetimesthe
smaller primitive’s volume. We do not see significant gains from
Eq. 5, but sampling even with a small number of points is 30×
slower.Sincethereislittlebenefitwithlargecost,wedonotuse
Eq.5.
6. Discussion
Our approach decomposes an input mesh into a number of con-
vexprimitives,suitableforrigid-bodycollision,drasticallyandro-
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection 13of24
|     | Original |     |     | Ours |     |     |     |     |     |     |     |     |     |     |
| --- | -------- | --- | --- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
CoarseDecompositionFailureCase
|     |     |     |     |     |     |     |     |     | Input    |     | Precise       |     | Coarse  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | -------- | --- | ------------- | --- | ------- | --- |
|     |     |     |     |     |     |     |     |     | |F|=5756 |     | 6Boxes,209Cap |     | 1Sphere |     |
|F|=999956
1620Boxes,55Cyl,17Cap,8Prisms,6Sph Figure 17: While our approach can decompose each component
| Haus./Cham.NewtoInput↓ |     |     | 1.64×10−2/1.95×10−3 |     |     |     |     |     |     |     |     |     |     |     |
| ---------------------- | --- | --- | ------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
oftheinputwellseparately(middle),whencombiningthemitdoes
∥BoundingBoxDiag∥2
notrecoveratightboundingbox(right).Thisisbecauseinternal
Figure 15: Our approach on a noisy scanned 3D model with an componentsunnecessarilyaffecttheorientationoftheoutputprim-
itive.cbdeslancer.
openbottom.Despitetheinput’sdensity,ourapproachadheresto
| its structure | including | small | details | such | as columns | and | chofa. |     |     |     |     |     |     |     |
| ------------- | --------- | ----- | ------- | ---- | ---------- | --- | ------ | --- | --- | --- | --- | --- | --- | --- |
cbnaGoodScan3D.
|     |     |     |     |     |     |     |     | 7.  | Limitations |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ----------- | --- | --- | --- | --- | --- |
Onelimitationofourapproachismesheswithinternalcomponents
Input Eq.4 Eq.5(Dense) Eq.5(Sparse) willhavecoarserboundingprimitives,becausenormalsofenclosed
facesaffecttheeigendecompositionofeachprimitive.Weshowan
exampleofthisfailurecaseinFig.17onacubewithtwistedcubes
insideofit.Itisclearthatthetightestboundingboxonlyneedsto
fitthelargestcube,butourapproachdoesnotrecoverthatdueto
theinfluenceoftheothercubes.
| H a u s NewtoInput | ↓   | 2.43×10−2  |     | 2.39×10−2  |     | 2.44×10−2  |     |     |     |     |     |     |     |     |
| ------------------ | --- | ---------- | --- | ---------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
| C h a m            |     | 5.031×10−3 |     | 5.019×10−3 |     | 5.028×10−3 |     |     |     |     |     |     |     |     |
∥BoundingBoxDiag∥2 Anotherlimitationisthatprimitivesthatsubsumecoplanarfaces
|     |     |                |     |                |     |                |     | may | be degenerate | and | depend | on the input | mesh’s orientation. |     |
| --- | --- | -------------- | --- | -------------- | --- | -------------- | --- | --- | ------------- | --- | ------ | ------------ | ------------------- | --- |
|     |     | 235Boxes,21Cyl |     | 238Boxes,20Cyl |     | 238Boxes,20Cyl |     |     |               |     |        |              |                     |     |
|F|=11926 1Cap,26Prism,3Sph1Cap,21Prism,3Sph1Cap,22Prism,3Sph Thiscanbemitigatedbyaddingthetangentdirection(Sec.5),but
Time(sec) 1.29 523.53 34.045 doesnotalwaysremovetheinfluenceoftheinputorientation.Fur-
thermore,perfectlycoplanarfacesmaybeovereagerlymergedto-
| Figure 16: | We compare | the | cost function |     | from Eq. | 4 with | an ap- |     |     |     |     |     |     |     |
| ---------- | ---------- | --- | ------------- | --- | -------- | ------ | ------ | --- | --- | --- | --- | --- | --- | --- |
gether.Thisisbecausethesefaceshavenowidthalongtheirshared
proximation of Eq. 5 using rejection sampling. For dense sam- plane,introducingnear-zerovolumewhentheyaremerged.
| pling, we      | sample   | 1,000,000 | points    | for every | pair    | of primitives, |          |     |                |        |                |               |     |           |
| -------------- | -------- | --------- | --------- | --------- | ------- | -------------- | -------- | --- | -------------- | ------ | -------------- | ------------- | --- | --------- |
|                |          |           |           |           |         |                |          |     | One limitation | due to | the coarseness | of primitives | is  | that they |
| and for sparse | sampling |           | we sample | 50,000    | points. | In             | practice |     |                |        |                |               |     |           |
maybelesssuitableforhighfrequencydetails.Fororganicobjects
| there is little | benefit        | using | Eq. 5, | with           | no visible | improvement, |        |       |       |           |            |            |           |          |
| --------------- | -------------- | ----- | ------ | -------------- | ---------- | ------------ | ------ | ----- | ----- | --------- | ---------- | ---------- | --------- | -------- |
|                 |                |       |        |                |            |              |        | which | often | have more | detail and | curvature, | primitive | decompo- |
| and the cost    | of computation |       | makes  | it intractable |            | for real     | usage. |       |       |           |            |            |           |          |
sitionmustoutputmoreprimitivestomaintaingeometricsimilar-
cbnTasha.Lime.
ity.Asonefuturedirection,thisapproachcouldbeextendedwith
|     |     |     |     |     |     |     |     | curved | primitives, | or for | those | portions of the | mesh convex | hulls |
| --- | --- | --- | --- | --- | --- | --- | --- | ------ | ----------- | ------ | ----- | --------------- | ----------- | ----- |
canbeusedtopreservedetail.
Finally,itmaybeconsideredalimitationthatconvexprimitive
| bustly simplifying |     | complex | real-world | meshes. | Convex | primitive |     |     |     |     |     |     |     |     |
| ------------------ | --- | ------- | ---------- | ------- | ------ | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
decompositionreliesonthetopologyoftheinput.Smallmodifica-
decompositionscaleswithmeshsizeandcanhandlesmillionsof
tionsinthetopologyoftheinputmeshcanchangetheoutputmesh
triangles.
ascanbeseenbyvertexdeduplicationinFig.11.Wedonotfind
Whilepreviousapproachesfocusontightdecompositionsusing this to be a problem, and perform vertex deduplication and pair-
wisecollapsetomitigatetheeffectsoftopology.Often,topology
convexhulls,theyareimpracticalduetoslowersimulationandim-
alsoservesasagoodindicatorastowheretosplitthemeshinto
precisionduetovoxelizationandplanarcuts.Weflipthetop-down
approachwithbottom-upmerging,removingthecomplexityofcut- differentcomponents,soitcanbeconsideredawayforartiststo
tingwhileproducingefficientdecompositions. indicatewheretoseparatecolliders.
Unlikepriorapproachesinprimitiveabstraction,wedonotuse Future Work We are able to handle cases where disconnected
deeplearning,RANSAC,ordifferentiability,makingourapproach componentsofthemesharefusedtogether,usingsomethingsim-
robustandfastforquickartisticiteration.Ourapproachcanbebuilt ilartonon-edgecontractionfromGarlandandHeckbert [GH97].
intoexistingtoolingforartiststoquicklygeneratecollisionobjects In collision generation though, disconnected components may be
whichcanthenbedirectlymanipulated. more amenable to merging as compared to mesh simplification.
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

14of24 J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection
We leave it to future work to explore edge collapses not defined [GH98] GARLAND M., HECKBERT P. S.: Simplifying surfaces with
bytheinputtopology,usingtechniquessuchastheonefromLiuet colorandtextureusingquadricerrormetrics.InProceedingsoftheCon-
|             |     |     |     |     |     |     | ference | on Visualization | ’98 |              |     |             |          |
| ----------- | --- | --- | --- | --- | --- | --- | ------- | ---------------- | --- | ------------ | --- | ----------- | -------- |
| al.[LZY24]. |     |     |     |     |     |     |         |                  |     | (Washington, | DC, | USA, 1998), | VIS ’98, |
IEEEComputerSocietyPress,p.263–269.doi:10.1109/VISUAL.
1998.745312.1,2
Quadric-basedpolygonalsur-
| 8. Conclusion |     |     |     |     |     |     | [GH99] | GARLAND | M., HECKBERT | P.: |     |     |     |
| ------------- | --- | --- | --- | --- | --- | --- | ------ | ------- | ------------ | --- | --- | --- | --- |
facesimplification.PhDthesis,USA,1999.AAI9950005.4
| In summary, | we develop | a concise |     | and robust | algorithm | for de- |         |                                |     |     |     |                   |     |
| ----------- | ---------- | --------- | --- | ---------- | --------- | ------- | ------- | ------------------------------ | --- | --- | --- | ----------------- | --- |
|             |            |           |     |            |           |         | [GJK88] | GILBERTE.,JOHNSOND.,KEERTHIS.: |     |     |     | Afastprocedurefor |     |
composing an arbitrary mesh into a number of convex prim- computingthedistancebetweencomplexobjectsinthree-dimensional
itives usable in downstream applications such as collision de- space.IEEEJournalonRoboticsandAutomation4,2(1988),193–203.
tection. Our approach produces a small number of tight-fitting doi:10.1109/56.2083.8
[GLM96] GOTTSCHALKS.,LINM.C.,MANOCHAD.:Obbtree:ahier-
| primitives | designed  | for efficiency | at   | runtime.    | We hope    | that our |                                                 |     |     |     |     |                    |     |
| ---------- | --------- | -------------- | ---- | ----------- | ---------- | -------- | ----------------------------------------------- | --- | --- | --- | --- | ------------------ | --- |
|            |           |                |      |             |            |          | archicalstructureforrapidinterferencedetection. |     |     |     |     | InProceedingsofthe |     |
| approach   | motivates | further        | work | into simple | algorithms | that     |                                                 |     |     |     |     |                    |     |
23rdAnnualConferenceonComputerGraphicsandInteractiveTech-
closelyalignwiththeprocessesartiststake,andthatthisworkis
niques(NewYork,NY,USA,1996),SIGGRAPH’96,Associationfor
| adapted into | game | engines | and physics/collider |     | generation | tool- |                                                  |         |            |                         |              |     |             |
| ------------ | ---- | ------- | -------------------- | --- | ---------- | ----- | ------------------------------------------------ | ------- | ---------- | ----------------------- | ------------ | --- | ----------- |
|              |      |         |                      |     |            |       | ComputingMachinery,p.171–180.                    |         |            | URL:https://doi.org/10. |              |     |             |
| ing.         |      |         |                      |     |            |       | 1145/237170.237244,doi:10.1145/237170.237244.1,3 |         |            |                         |              |     |             |
|              |      |         |                      |     |            |       | [GWH01]                                          | GARLAND | M.,        | WILLMOTT                | A., HECKBERT | P.  | S.: Hi-     |
|              |      |         |                      |     |            |       | erarchical                                       | face    | clustering | on polygonal            | surfaces.    | In  | Proceedings |
References of the 2001 Symposium on Interactive 3D Graphics (New York,
|         |        |                |     |               |     |             | NY, USA, | 2001), | I3D ’01, | Association | for | Computing | Machinery, |
| ------- | ------ | -------------- | --- | ------------- | --- | ----------- | -------- | ------ | -------- | ----------- | --- | --------- | ---------- |
| [AFS06] | ATTENE | M., FALCIDIENO |     | B., SPAGNUOLO |     | M.: Hierar- |          |        |          |             |     |           |            |
p.49–58.URL:https://doi.org/10.1145/364338.364345,
| chical mesh | segmentation | based | on  | fitting primitives. |     | The Visual |     |     |     |     |     |     |     |
| ----------- | ------------ | ----- | --- | ------------------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- |
computer. 22, 3 (2006). URL: https://doi.org/10.1007/ doi:10.1145/364338.364345.3,6,7
s00371-006-0375-x, doi:10.1007/s00371-006-0375-x. [HDD∗93] HOPPE H., DEROSE T., DUCHAMP T., MCDONALD J.,
3 STUETZLE W.: Mesh optimization. In Proceedings of the 20th An-
|          |        |             |     |               |     |            | nual Conference |     | on Computer | Graphics | and | Interactive | Techniques |
| -------- | ------ | ----------- | --- | ------------- | --- | ---------- | --------------- | --- | ----------- | -------- | --- | ----------- | ---------- |
| [AMSF08] | ATTENE | M., MORTARA |     | M., SPAGNUOLO |     | M., FALCI- |                 |     |             |          |     |             |            |
B.: Hierarchical convex approximation of 3d shapes for fast (NewYork,NY,USA,1993),SIGGRAPH’93,AssociationforCom-
| DIENO             |     |          |          |       |       |               | putingMachinery,p.19–26. |     |     | URL:https://doi.org/10.1145/ |     |     |     |
| ----------------- | --- | -------- | -------- | ----- | ----- | ------------- | ------------------------ | --- | --- | ---------------------------- | --- | --- | --- |
| region selection. |     | Computer | Graphics | Forum | 27, 5 | (2008), 1323– |                          |     |     |                              |     |     |     |
166117.166119,doi:10.1145/166117.166119.2
| 1332. | URL: | https://onlinelibrary.wiley.com/doi/ |     |     |     |     |     |     |     |     |     |     |     |
| ----- | ---- | ------------------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
abs/10.1111/j.1467-8659.2008.01271.x, doi:https: [HLW24] HAFNER C., LY M., WOJTAN C.: Spin-it faster: Quadrics
solvealltopologyoptimizationproblemsthatdependonlyonmassmo-
//doi.org/10.1111/j.1467-8659.2008.01271.x.3
|                 |     |                                              |     |     |     |     | ments. | ACMTrans.Graph.43,4(jul2024). |     |     | URL:https://doi. |     |     |
| --------------- | --- | -------------------------------------------- | --- | --- | --- | --- | ------ | ----------------------------- | --- | --- | ---------------- | --- | --- |
| [And24] ANDREWS |     | J.: Navigation-drivenapproximateconvexdecom- |     |     |     |     |        |                               |     |     |                  |     |     |
org/10.1145/3658194,doi:10.1145/3658194.2
| position. | In ACM | SIGGRAPH | 2024 | Conference | Papers | (New York, |         |       |                                               |     |     |     |     |
| --------- | ------ | -------- | ---- | ---------- | ------ | ---------- | ------- | ----- | --------------------------------------------- | --- | --- | --- | --- |
|           |        |          |      |            |        |            | [Hop99] | HOPPE | H.: Newquadricmetricforsimplifiyingmesheswith |     |     |     |     |
NY,USA,2024),SIGGRAPH’24,AssociationforComputingMachin-
https://doi.org/10.1145/3641519.3657479, appearanceattributes. InProceedingsoftheConferenceonVisualiza-
ery. URL:
doi:10.1145/3641519.3657479.1,3,7 tion’99:CelebratingTenYears(Washington,DC,USA,1999),VIS’99,
IEEEComputerSocietyPress,p.59–66.1,2,7
| [BBN∗20] | BIRDAL | T., BUSAM | B., | NAVAB N., | ILIC S., | STURM P.: |         |        |             |     |         |               |        |
| -------- | ------ | --------- | --- | --------- | -------- | --------- | ------- | ------ | ----------- | --- | ------- | ------------- | ------ |
|          |        |           |     |           |          |           | [JKS05] | JULIUS | D., KRAEVOY | V., | SHEFFER | A.: D-Charts: | Quasi- |
Genericprimitivedetectioninpointcloudsusingnovelminimalquadric
IEEETransactionsonPatternAnalysisandMachineIntelligence Developable Mesh Segmentation. Computer Graphics Forum (2005).
fits.
42,6(2020),1333–1347. doi:10.1109/TPAMI.2019.2900309. doi:10.1111/j.1467-8659.2005.00883.x.3
| 3          |     |         |     |             |          |         | [JLSW02]   | JU T., | LOSASSO       | F., SCHAEFER | S.,    | WARREN | J.: Dual   |
| ---------- | --- | ------- | --- | ----------- | -------- | ------- | ---------- | ------ | ------------- | ------------ | ------ | ------ | ---------- |
|            |     |         |     |             |          |         | contouring | of     | hermite data. | ACM          | Trans. | Graph. | 21, 3 (jul |
| [BH11] BAO | H., | HUA W.: |     | Variational | OBB-Tree | Approx- |            |        |               |              |        |        |            |
imation for Solid Objects. Springer Berlin Heidelberg, 2002), 339–346. URL: https://doi.org/10.1145/566654.
566586,doi:10.1145/566654.566586.2
| Berlin, | Heidelberg, | 2011, | pp. | 281–293. | URL: | https: |     |     |     |     |     |     |     |
| ------- | ----------- | ----- | --- | -------- | ---- | ------ | --- | --- | --- | --- | --- | --- | --- |
//doi.org/10.1007/978-3-642-18342-3_6, doi: [KFK∗15] KAICKO.V.,FISHN.,KLEIMANY.,ASAFIS.,COHEN-OR
10.1007/978-3-642-18342-3_6.3 D.:Shapesegmentationbyapproximateconvexityanalysis.ACMTrans.
|                 |     |             |     |           |               |        | Graph. | 34, 1 (Dec. | 2015). | URL: https://doi.org/10.1145/ |     |     |     |
| --------------- | --- | ----------- | --- | --------- | ------------- | ------ | ------ | ----------- | ------ | ----------------------------- | --- | --- | --- |
| [BK02] BISCHOFF |     | S., KOBBELT | L.: | Ellipsoid | decomposition | of 3d- |        |             |        |                               |     |     |     |
2611811,doi:10.1145/2611811.3
| models. | In Proceedings. | First | International | Symposium |     | on 3D Data |     |     |     |     |     |     |     |
| ------- | --------------- | ----- | ------------- | --------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- |
ProcessingVisualizationandTransmission(2002),pp.480–488. doi: [KJS07] KREAVOY V., JULIUS D., SHEFFER A.: Modelcomposition
|     |     |     |     |     |     |     | frominterchangeablecomponents. |     |     | InProceedingsofthe15thPacific |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------------ | --- | --- | ----------------------------- | --- | --- | --- |
10.1109/TDPVT.2002.1024103.3
ConferenceonComputerGraphicsandApplications(USA,2007),PG
[Ble18] BLENDERONLINECOMMUNITY:Blender-a3Dmodellingand
’07,IEEEComputerSociety,p.129–138.URL:https://doi.org/
| renderingpackage. |     | BlenderFoundation,StichtingBlenderFoundation, |     |     |     |     |     |     |     |     |     |     |     |
| ----------------- | --- | --------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
10.1109/PG.2007.43,doi:10.1109/PG.2007.43.3
Amsterdam,2018.URL:http://www.blender.org.1,9
|     |     |     |     |     |     |     | [KYZB19] | KAISER | A., YBANEZ | ZEPEDA | J. A., | BOUBEKEUR | T.: A |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------ | ---------- | ------ | ------ | --------- | ----- |
[CB17] CALDERONS.,BOUBEKEURT.:Boundingproxiesforshapeap- SurveyofSimpleGeometricPrimitivesDetectionMethodsforCaptured
| proximation.                                        | ACMTransactionsonGraphics(Proc.SIGGRAPH2017) |     |     |     |     |     |         |                              |     |     |                  |     |     |
| --------------------------------------------------- | -------------------------------------------- | --- | --- | --- | --- | --- | ------- | ---------------------------- | --- | --- | ---------------- | --- | --- |
|                                                     |                                              |     |     |     |     |     | 3DData. | ComputerGraphicsForum(2019). |     |     | doi:10.1111/cgf. |     |     |
| 36,5(july2017).URL:https://doi.org/10.1145/3072959. |                                              |     |     |     |     |     | 13451.3 |                              |     |     |                  |     |     |
3073714,doi:10.1145/3072959.3073714.3
|     |     |     |     |     |     |     | [LA07] | LIEN J.-M., | AMATO | N. M.: | Approximateconvexdecomposi- |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------ | ----------- | ----- | ------ | --------------------------- | --- | --- |
URL:https://www.
[Epi22] EPICGAMES: Unrealengine5,2022. tionofpolyhedra.InProceedingsofthe2007ACMSymposiumonSolid
unrealengine.com/en-US/unreal-engine-5.1,7 andPhysicalModeling(NewYork,NY,USA,2007),SPM’07,Associ-
|                 |       |              |          |             |             |                | ationforComputingMachinery,p.121–131. |     |     |     | URL:https://doi.     |     |     |
| --------------- | ----- | ------------ | -------- | ----------- | ----------- | -------------- | ------------------------------------- | --- | --- | --- | -------------------- | --- | --- |
| [GH97] GARLAND  |       | M., HECKBERT |          | P. S.:      | Surface     | simplification |                                       |     |     |     |                      |     |     |
|                 |       |              |          |             |             |                | org/10.1145/1236246.1236265,          |     |     |     | doi:10.1145/1236246. |     |     |
| using quadric   | error | metrics.     | In       | Proceedings | of          | the 24th An-   |                                       |     |     |     |                      |     |     |
| nual Conference |       | on Computer  | Graphics | and         | Interactive | Techniques     | 1236265.1,3                           |     |     |     |                      |     |     |
(USA,1997),SIGGRAPH’97,ACMPress/Addison-WesleyPublishing [LCWK07] LU L., CHOI Y.-K., WANG W., KIM M.-S.: Vari-
Co.,p.209–216. URL:https://doi.org/10.1145/258734. ational 3d shape segmentation for bounding volume compu-
258849,doi:10.1145/258734.258849.1,2,3,4,6,7,13 tation. Computer Graphics Forum 26, 3 (2007), 329–338.
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection 15of24
URL: https://onlinelibrary.wiley.com/doi/abs/ [O’R85] O’ROURKEJ.: Findingminimalenclosingboxes. Int.J.Paral-
10.1111/j.1467-8659.2007.01055.x, doi:https: lelProgram.14,3(1985),183–199. URL:https://doi.org/10.
//doi.org/10.1111/j.1467-8659.2007.01055.x.3
1007/BF00991005,doi:10.1007/BF00991005.6
| [LD17] LET.,DUANY.: |                                     | Aprimitive-based3dsegmentationalgorithm |          |       |           |        |     |             |       |                       |            |        |                   |               |
| ------------------- | ----------------------------------- | --------------------------------------- | -------- | ----- | --------- | ------ | --- | ----------- | ----- | --------------------- | ---------- | ------ | ----------------- | ------------- |
|                     |                                     |                                         |          |       |           |        |     | [PS24] PARK | C.,   | SUNG                  | M.: Split, | merge, | and refine:       | Fitting tight |
| for mechanical      | cad                                 | models.                                 | Computer | Aided | Geometric | Design | 52  |             |       |                       |            |        |                   |               |
|                     |                                     |                                         |          |       |           |        |     | bounding    | boxes | via over-segmentation |            | and    | iterative search. | In 2024       |
| (2017),231–246.     | URL:https://doi.org/10.1016/j.cagd. |                                         |          |       |           |        |     |             |       |                       |            |        |                   |               |
2017.02.009,doi:10.1016/j.cagd.2017.02.009.3 InternationalConferenceon3DVision(3DV)(2024),pp.1468–1477.
doi:10.1109/3DV62453.2024.00146.3
| [LLT∗20] LESCOAT |     | T., LIU | H.-T. | D., THIERY | J.-M., | JACOBSON |     |     |     |     |     |     |     |     |
| ---------------- | --- | ------- | ----- | ---------- | ------ | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
A., BOUBEKEUR T., OVSJANIKOV M.: Spectral mesh simpli- [PUG19] PASCHALIDOU D., ULUSOY A. O., GEIGER A.: Su-
fication. Computer Graphics Forum (Proc. of EUROGRAPHICS perquadrics revisited: Learning 3d shape parsing beyond cuboids. In
| 2020) 39,2 | (2020),315–324. |     | URL: | https://onlinelibrary. |     |     |     |     |     |     |     |     |     |     |
| ---------- | --------------- | --- | ---- | ---------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
ProceedingsIEEEConf.onComputerVisionandPatternRecognition
wiley.com/doi/abs/10.1111/cgf.13932, doi:https:// (CVPR)(June2019).doi:10.1109/CVPR.2019.01059.3
doi.org/10.1111/cgf.13932.2
|     |     |     |     |     |     |     |     | [SGG∗00] | SANDER | P. V., | GU X., | GORTLER | S. J., HOPPE | H., SNY- |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | ------ | ------ | ------ | ------- | ------------ | -------- |
[LLY∗23]
LI Y., LIU S., YANG X., GUO J., GUO J., GUO Y.: Sur- J.: Silhouette clipping. In Proceedings of the 27th An-
| face and     | edge detection | for             | primitive | fitting     | of point | clouds. | In  | DER             |     |             |          |     |             |            |
| ------------ | -------------- | --------------- | --------- | ----------- | -------- | ------- | --- | --------------- | --- | ----------- | -------- | --- | ----------- | ---------- |
|              |                |                 |           |             |          |         |     | nual Conference |     | on Computer | Graphics | and | Interactive | Techniques |
| ACM SIGGRAPH |                | 2023 Conference |           | Proceedings | (New     | York,   | NY, |                 |     |             |          |     |             |            |
(USA,2000),SIGGRAPH’00,ACMPress/Addison-WesleyPublishing
USA,2023),SIGGRAPH’23,AssociationforComputingMachinery.
|     |     |     |     |     |     |     |     | Co.,p.327–334. |     | URL:https://doi.org/10.1145/344779. |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | -------------- | --- | ----------------------------------- | --- | --- | --- | --- |
URL:https://doi.org/10.1145/3588432.3591522,doi:
10.1145/3588432.3591522.3 344935,doi:10.1145/344779.344935.2,3,7
[LT98] LINDSTROMP.,TURKG.: Fastandmemoryefficientpolygonal [Ske22] SKETCHFAB: The best 3d viewer on the web, 2022. URL:
simplification. InProceedingsoftheConferenceonVisualization’98 https://sketchfab.com/.1
(Washington,DC,USA,1998),VIS’98,IEEEComputerSocietyPress,
p.279–286.doi:10.1109/VISUAL.1998.745314.2 [SWK07] SCHNABEL R., WAHL R., KLEIN R.: Efficient ransac for
|                    |          |     |         |         |         |            |       | point-cloudshapedetection.            |      |                                      | ComputerGraphicsForum26,2(2007), |     |     |            |
| ------------------ | -------- | --- | ------- | ------- | ------- | ---------- | ----- | ------------------------------------- | ---- | ------------------------------------ | -------------------------------- | --- | --- | ---------- |
| [Lum17] LUMBERYARD |          |     | A.:     |         | Amazon  | lumberyard |       |                                       |      |                                      |                                  |     |     |            |
|                    |          |     |         |         |         |            |       | 214–226.                              | URL: | https://onlinelibrary.wiley.com/doi/ |                                  |     |     |            |
| bistro, open       | research |     | content | archive | (orca), | July       | 2017. |                                       |      |                                      |                                  |     |     |            |
|                    |          |     |         |         |         |            |       | abs/10.1111/j.1467-8659.2007.01016.x, |      |                                      |                                  |     |     | doi:https: |
http://developer.nvidia.com/orca/amazon-
//doi.org/10.1111/j.1467-8659.2007.01016.x.3
| lumberyard-bistro. |     |     | URL: | http://developer.nvidia. |     |     |     |     |     |     |     |     |     |     |
| ------------------ | --- | --- | ---- | ------------------------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
com/orca/amazon-lumberyard-bistro.9,16,23 [SZTL19] SUNC.,ZOUQ.,TONGX.,LIUY.: Learningadaptivehier-
|          |         |        |      |                |     |               |     | archicalcuboidabstractionsof3dshapecollections. |     |     |     |     | ACMTransactions  |     |
| -------- | ------- | ------ | ---- | -------------- | --- | ------------- | --- | ----------------------------------------------- | --- | --- | --- | --- | ---------------- | --- |
| [LWRC23] | LIU W., | WU Y., | RUAN | S., CHIRIKJIAN |     | G.: Marching- |     |                                                 |     |     |     |     |                  |     |
|          |         |        |      |                |     |               |     | onGraphics(SIGGRAPHAsia)38,6(2019).             |     |     |     |     | URL:https://doi. |     |
primitives:Shapeabstractionfromsigneddistancefunction.InProceed-
|     |     |     |     |     |     |     |     | org/10.1145/3355089.3356529, |     |     |     | doi:10.1145/3355089. |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------------------------- | --- | --- | --- | -------------------- | --- | --- |
ingsIEEEConf.onComputerVisionandPatternRecognition(CVPR)
3356529.3
(2023).doi:10.1109/CVPR52729.2023.00847.3
|                 |     |          |     |              |       |           |     | [TGB13] | THIERY | J.-M., | GUY E., | BOUBEKEUR | T.: | Sphere-meshes: |
| --------------- | --- | -------- | --- | ------------ | ----- | --------- | --- | ------- | ------ | ------ | ------- | --------- | --- | -------------- |
| [Lys07] LYSENKO | M.: | Realtime |     | constructive | solid | geometry. | In  |         |        |        |         |           |     |                |
Shapeapproximationusingsphericalquadricerrormetrics.ACMTrans-
| ACM SIGGRAPH |     | 2007 Sketches |     | (New York, | NY, | USA, | 2007), |     |     |     |     |     |     |     |
| ------------ | --- | ------------- | --- | ---------- | --- | ---- | ------ | --- | --- | --- | --- | --- | --- | --- |
actiononGraphics(Proc.SIGGRAPHAsia2013)32,6(2013),Art.No.
| SIGGRAPH | ’07, Association |     | for | Computing | Machinery, |     | p. 7–es. |     |     |     |     |     |     |     |
| -------- | ---------------- | --- | --- | --------- | ---------- | --- | -------- | --- | --- | --- | --- | --- | --- | --- |
URL:https://doi.org/10.1145/1278780.1278789,doi: 178. URL: https://doi.org/10.1145/2508363.2508384,
10.1145/1278780.1278789.3 doi:10.1145/2508363.2508384.1,2,6,7
[LZY24] LIU H.-T. D., ZHANG X., YUKSEL C.: Simplifying trian- [TGBE16] THIERY J.-M., GUY E., BOUBEKEUR T., EISEMANN E.:
glemeshesinthewild,2024. URL:https://arxiv.org/abs/ Animatedmeshapproximationwithsphere-meshes.ACMTrans.Graph.
2409.15458,arXiv:2409.15458.7,14 35,3(May2016),30:1–30:13. URL:http://doi.acm.org/10.
1145/2898350,doi:10.1145/2898350.1,2
| [MDKK07] | MIZOGUCHI | T., | DATE | H., KANAI | S., | KISHINAMI | T.: |     |     |     |     |     |     |     |
| -------- | --------- | --- | ---- | --------- | --- | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
Quasi-optimalmeshsegmentationviaregiongrowing/merging.InInter- [TK20] TRETTNERP.,KOBBELTL.:FastandRobustQEFMinimization
|     |     |     |     |     |     |     |     |     |     |     | ComputerGraphicsForum(2020). |     |     | doi: |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---------------------------- | --- | --- | ---- |
nationalDesignEngineeringTechnicalConferencesandComputersand usingProbabilisticQuadrics.
10.1111/cgf.13933.2
InformationinEngineeringConference(2007),vol.48078,pp.547–556.
doi:10.1115/DETC2007-35171.3 [TLJP18] THUL D., LADICKÝ L., JEONG S., POLLEFEYS M.: Ap-
|              |             |         |                |          |               |           |      | proximate                    | convex | decomposition |        | and transfer         | for animated      | meshes. |
| ------------ | ----------- | ------- | -------------- | -------- | ------------- | --------- | ---- | ---------------------------- | ------ | ------------- | ------ | -------------------- | ----------------- | ------- |
| [MG09] MAMOU | K.,         | GHORBEL | F.:            | A simple | and efficient | approach  |      |                              |        |               |        |                      |                   |         |
|              |             |         |                |          |               |           |      | ACM Trans.                   | Graph. | 37,           | 6 (dec | 2018).               | URL: https://doi. |         |
| for 3d mesh  | approximate | convex  | decomposition. |          | In            | 2009 16th | IEEE |                              |        |               |        |                      |                   |         |
|              |             |         |                |          |               |           |      | org/10.1145/3272127.3275029, |        |               |        | doi:10.1145/3272127. |                   |         |
InternationalConferenceonImageProcessing(ICIP)(2009),pp.3501–
3275029.1,3,7,9
3504.doi:10.1109/ICIP.2009.5414068.1,2,3,9,16,19,20,
24 [TvL84] TARJAN R. E., VAN LEEUWEN J.: Worst-caseanalysisofset
[MST∗11] MCADAMS A., SELLE A., TAMSTORF R., TERAN J., unionalgorithms. J.ACM31,2(mar1984),245–281. URL:https:
SIFAKIS E.: Computing the singular value decomposition of //doi.org/10.1145/62.2160,doi:10.1145/62.2160.7
| 3x3 matrices | with | minimal                          | branching | and | elementary | floating | point |          |                                |     |     |     |     |             |
| ------------ | ---- | -------------------------------- | --------- | --- | ---------- | -------- | ----- | -------- | ------------------------------ | --- | --- | --- | --- | ----------- |
|              |      |                                  |           |     |            |          |       | [WHX∗22] | WANGR.,HUAW.,XUG.,HUOY.,BAOH.: |     |     |     |     | Variational |
| operations.  | URL: | https://api.semanticscholar.org/ |           |     |            |          |       |          |                                |     |     |     |     |             |
hierarchicaldirectedboundingboxconstructionforsolidmeshmodels,
CorpusID:18183079.4
2022. URL:https://arxiv.org/abs/2203.10521,arXiv:
[MZL∗09] MEHRAR.,ZHOUQ.,LONGJ.,SHEFFERA.,GOOCHA., 2203.10521.3
| MITRA N.   | J.: Abstractionofman-madeshapes. |       |      |                          | ACMTrans.Graph. |     |     |               |         |           |          |                 |                 |          |
| ---------- | -------------------------------- | ----- | ---- | ------------------------ | --------------- | --- | --- | ------------- | ------- | --------- | -------- | --------------- | --------------- | -------- |
|            |                                  |       |      |                          |                 |     |     | [WLLS22]      | WEI X., | LIU       | M., LING | Z., SU          | H.: Approximate | convex   |
| 28, 5 (dec | 2009),                           | 1–10. | URL: | https://doi.org/10.1145/ |                 |     |     |               |         |           |          |                 |                 |          |
|            |                                  |       |      |                          |                 |     |     | decomposition | for     | 3d meshes | with     | collision-aware | concavity       | and tree |
1618452.1618483,doi:10.1145/1618452.1618483.3
|     |     |     |     |     |     |     |     | search. | ACM Transactions |     | on Graphics | (TOG) | 41, | 4 (2022), 1–18. |
| --- | --- | --- | --- | --- | --- | --- | --- | ------- | ---------------- | --- | ----------- | ----- | --- | --------------- |
[Nvi17] NVIDIA CORPORATION: Physx,042017. URL:https:// URL:https://doi.org/10.1145/3528223.3530103,doi:
developer.nvidia.com/physx-sdk.1 10.1145/3528223.3530103.1,2,7,9,19,20
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

16of24 J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection
[YJ20] YANGX.,JIAX.: Simpleprimitiverecognitionviahierarchical Algorithm2FrustumPointSubsuming
| faceclustering. | ComputationalVisualMedia6(2020),431–443. |     |     |     |     | doi: |     |        |                              |     |     |
| --------------- | ---------------------------------------- | --- | --- | --- | --- | ---- | --- | ------ | ---------------------------- | --- | --- |
|                 |                                          |     |     |     |     |      |     | Input: | Points∈RN×3,BasePointc,Axisa |     |     |
10.1007/s41095-020-0192-6.3
|     |     |     |     |     |     |     |     | Output: | heighth,topandbottomradiusrtop,r |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------- | -------------------------------- | --- | --- |
bot
[YL W 0 6 ] Y A N D . -M . , L I U Y . , W A N G W . : Q u a d r ic s u rf ac e e x t r a c ti o n b y h=0,r =0,rtop=0
|     |     |     |     |     |     |     | 1:  |     | bot |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
v ari a ti ona l sh ap e a pp r o xi m a ti o n . In P ro c e e di n g s o f th e 4 th I n t e r n a t io n a l forp∈Pointsdoh=max(h,|(p−c)⊤a|)
2:
ConferenceonGeometricModelingandProcessing(Berlin,Heidelberg,
|     |     |     |     |     |     |     |     | ∗ =0,y∗ | ∗ =0,y∗ |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------- | ------- | --- | --- |
2006), GMP’06, Springer-Verlag, p. 73–86. URL: https://doi. 3: r t op top =1,r b ot bot =0 ▷Approx.constraints
| org/10.1007/11802914_6,doi:10.1007/11802914_6.3 |                                              |     |     |     |     |     |     |                      |                              | (p−c)⊤a |     |
| ----------------------------------------------- | -------------------------------------------- | --- | --- | --- | --- | --- | --- | -------------------- | ---------------------------- | ------- | --- |
|                                                 |                                              |     |     |     |     |     | 4:  | procedureY(p):return |                              | h       |     |
| [YWLY12]                                        | YAND.-M.,WANGW.,LIUY.,YANGZ.:Variationalmesh |     |     |     |     |     |     |                      |                              |         |     |
|                                                 |                                              |     |     |     |     |     |     | procedureR           | (r,y,ropp):returnifsideisbot |         |     |
segmentationviaquadricsurfacefitting.Computer-AidedDesign44,11 5: SIDE
|     |     |     |     |     |     |     |     | r− rop py | r−ropp (1−y) |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --------- | ------------ | --- | --- |
(2012),1072–1082. doi:https://doi.org/10.1016/j.cad. 6: | |else| |
|     |     |     |     |     |     |     |     | 1− y | y   |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---- | --- | --- | --- |
2012.04.005.3
7: forp∈Pointsdo:
[ZBCS∗23] ZHAO T., BUSÉ L., COHEN-STEINER D., BOUBEKEUR side,opp=ifY(p)≤0.5{bot,top}else{top,bot}
8:
T., THIERY J.-M., ALLIEZ P.: Variational shape reconstruction via r=∥(p−c)−h(p−c)⊤a∥
|               |          |          |                 |      |                  |      | 9:  |           |                    | 2   |     |
| ------------- | -------- | -------- | --------------- | ---- | ---------------- | ---- | --- | --------- | ------------------ | --- | --- |
| quadric error | metrics. | In ACM   | SIGGRAPH        | 2023 | Conference       | Pro- |     |           |                    |     |     |
|               |          |          |                 |      |                  |      | 10: | next=R    | side (r,Y(p),ropp) |     |     |
| ceedings (New | York,    | NY, USA, | 2023), SIGGRAPH |      | ’23, Association |      |     | ifnext>r∗ |                    |     |     |
|               |          |          |                 |      |                  |      | 11: |           | then               |     |     |
f o r C o m p u ti n g M ac h i n er y . U R L : h t t p s : / / d o i . o r g / 1 0 . 1 145/ s id e
|     |     |     |     |     |     |     | 12: |     | r ∗ = r , y∗ =Y(p),r | =next |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | -------------------- | ----- | --- |
3 5 8 8 4 3 2 . 3 5 9 15 2 9 , d o i : 10 . 1 1 4 5 / 3 5 8 8 4 3 2 . 3 5 9 1 5 2 9 . 2 s ide side side
|          |       |            |         |      |                  |     |     |     | r ∗ =Ropp(r ∗ | ,y∗ ,r ∗ ) |     |
| -------- | ----- | ---------- | ------- | ---- | ---------------- | --- | --- | --- | ------------- | ---------- | --- |
|          |       |            |         |      |                  |     | 13: |     | o pp o pp     | opp s ide  |     |
| [ZLGW15] | ZHANG | H., LI C., | GAO L., | WANG | G.: Hierarchical |     |     |     |               |            |     |
SimilarFixSide(...)ProcedureasAlg.3
| mesh segmentation |     | based on | quadric surface | fitting. | In  | 2015 14th |     |     |     |     |     |
| ----------------- | --- | -------- | --------------- | -------- | --- | --------- | --- | --- | --- | --- | --- |
returnh,rtop,r
International Conference on Computer-Aided Design and Computer 14: bot
| Graphics(CAD/Graphics)(2015),IEEE,pp.33–40. |     |     |     |     | doi:10.1109/ |     |     |     |     |     |     |
| ------------------------------------------- | --- | --- | --- | --- | ------------ | --- | --- | --- | --- | --- | --- |
CADGRAPHICS.2015.26.3
| MeshingofCylindersandCapsules |     |     | Ourapproachoutputscylin- |     |     |     |     |     |     |     |     |
| ----------------------------- | --- | --- | ------------------------ | --- | --- | --- | --- | --- | --- | --- | --- |
ders,capsules,spheres,andfrustumsmodeledasparametricfunc-
tions.Forsomeapplicationsthough(suchasrendering),allinputs
mustbegivenasamesh,soweconverttheseprimitivestoquan-
tizedmeshes.Forcylindersandfrustums,weoutputprismscapped
byonefaceoneachend.Forspheres,weuseaUVsphereapprox-
imation.Forcapsules,weoutputprismscappedwithUVspheres
oneachend.Thismakesourapproachsuitableforanydownstream
applications.
Algorithm3IsoscelesTrapezoidPointSubsuming
AppendixA: AdditionalResults Input: Points∈RN×3,Centerc,Axesax,ay,az
|                                                         |     |     |     |     |     |     |     | Output:       | Half-radiihx,hy,hzt,h |     |     |
| ------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | ------------- | --------------------- | --- | --- |
| Weshowadditionalresultsfromourapproachandprovidepseudo- |     |     |     |     |     |     |     |               |                       | zb  |     |
|                                                         |     |     |     |     |     |     |     | hx=0,hy=0,hzt | =0,h                  | =0  |     |
|                                                         |     |     |     |     |     |     | 1:  |               |                       | zb  |     |
codeforfittingfrustumsinAlg.2andisoscelestrapezoidalprisms
|     |     |     |     |     |     |     | 2:  | forp∈Pointsdo |     |     | ▷Computehx,hy |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------- | --- | --- | ------------- |
inAlg.3.Then,weplotframedurationsforcollisionswith5000
3: hx=max(hx,|(p−c)⊤ax|),hy=max(hy,|(p−c)⊤ay|)
| spheres for | many meshes | in  | Fig. 20, and | Fig. 21. | We show | out- |     |          |             |     |     |
| ----------- | ----------- | --- | ------------ | -------- | ------- | ---- | --- | -------- | ----------- | --- | --- |
|             |             |     |              |          |         |      |     | z∗ =0,y∗ | =1,z∗ =0,y∗ |     |     |
putsonbuildings,characters,props,andenvironmentsinFig.18. 4: zt zt zb zb =0 ▷Currentapprox.constraints
WeincludemorecomparisonstoCoACDandV-HACDinFig.19. 5: forp∈Pointsdo:
6: procedureUPDATECONSTRAINT(side∈{zt,zb})
Completestatisticsfortheprimitivesgeneratedonourdatasetare
|     |     |     |     |     |     |     | 7:  |     | opp=ifsideiszt{zb}else{zt} |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | -------------------------- | --- | --- |
inTab.3,withall1-waydistancesinTab.4.Weshowbytecounts
|     |     |     |     |     |     |     |     |     | next=h (z(p),y(p),hopp) |     | ▷hzt orh |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ----------------------- | --- | -------- |
for all models in Tab. 5. We show our approach on a complex 8: side zb
scene[Lum17],togenerateaninitialdecomposition,thenautomat- 9: ifnext>h side then
|     |     |     |     |     |     |     |     |     | z∗ =z(p),y∗ |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ----------- | --- | --- |
icallydeletethinboundingboxestogettheoutputshowninFig.22. 10: =y(p),h =next
|     |     |     |     |     |     |     |     |     | side          | side side |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ------------- | --------- | --- |
|     |     |     |     |     |     |     | 11: |     | hopp=|hopp(z∗ | ,y∗ ,h    | )|  |
WethenshowourapproachontwoorganicobjectsinFig.23,and opp opp side
onecomplexexampleinFig.24.Finally,weshowadditionalex- 12: UPDATECONSTRAINT(ify(p)≤0.5{zb}else{zt})
amples with collision detection comparisons from the V-HACD procedureFIXSIDE(top∈bool)
13:
dataset[MG09]inFig.26.
|     |     |     |     |     |     |     | 14: | ▷Fixoneside,findmin.thatsubsumesallpointsforother. |                                           |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | -------------------------------------------------- | ----------------------------------------- | --- | --- |
|     |     |     |     |     |     |     | 15: |                                                    | ▷Guaranteesthatallinputpointsaresubsumed. |     |     |
|     |     |     |     |     |     |     | 16: | v,o=iftop{zt,zb}else{zb,zt}                        |                                           |     |     |
|     |     |     |     |     |     |     | 17: | hv=0                                               |                                           |     |     |
forp∈Pointsdo:hv=max(hv,hv(z(p),y(p),ho))
18:
|     |     |     |     |     |     |     | 19: | FixSide(hzt | <h ) | ▷Fixlargersideandsetsmaller |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | ---- | --------------------------- | --- |
zb
|     |     |     |     |     |     |     | 20: | FixSide(hzt | ≥h ) |     | ▷Thenvice-versa |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | ---- | --- | --------------- |
zb
returnhx,hy,hzt,h
|     |     |     |     |     |     |     | 21: |     | bt  |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection 17of24
AdditionalResults
| InputMesh | ConvexPrim.Decomp. | InputMesh | ConvexPrim.Decomp. |
| --------- | ------------------ | --------- | ------------------ |
|F|=3404 1Box,2Cylinders,3Frustums |F|=6358 24boxes,40Capsules,16Prisms
| |F|=233965 | 409Boxes,1Cap,2Prism | |F|=119639 |     |
| ---------- | -------------------- | ---------- | --- |
645Boxes,22Cap,145Cyl,118Prisms,22Sph
|F|=54995 50Boxes,34Cap,22Cyl,2Prism |F|=20875 94Boxes,17Cap,67Cyl,2Sph
| |F|=6280 | 77Boxes,6Capsules,40Cylinders | |F|=267267 |     |
| -------- | ----------------------------- | ---------- | --- |
3675Boxes,223Cap,131Cyl,2Prisms
Figure18:Additionalresultsfromrunningourapproachonavarietyofinputmeshes.Greenindicatesboundingboxes,yellowforcylinders,
bluefortrapezoidalprisms,andredforcapsules,lightblueforspherres.Ourapproachgreatlycutsdownonthenumberofinputelements.
cbBlenderFace,cbRubaQewar,cbneos_nelia,cbDeerex,cbHoody468,cbNathanSioui,cbneih.D,cbScritta.
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

18of24 J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection
AdditionalComparisons
InputMesh ConvexPrimitiveDecomposition CoACD V-HACD
|F|=7256 132Boxes,40Cap,170Cyl,16Sph 279Hulls(|F|=12246) 27Hulls(|F|=2376)
|F|=66 11Boxes 11Hulls(|F|=1210) 12Hulls(|F|=266)
|F|=5756 4Boxes,191Cap,21Cyl 86Hulls(|F|=7294) 44Hulls(|F|=7459)
|F|=15306 16Boxes,7Cylinders 19Hulls(|F|=4784) 17Hulls(|F|=3672)
|F|=1360 17Boxes,6Cylinders,4Prisms 5Hulls(|F|=716) 8Hulls(|F|=394)
|F|=1545 44Boxes,31Cap.,25Cyl. 70Hulls(|F|=7564) 35Hulls(|F|=1840)
|F|=35288 273Boxes,5Cap,18Cyl,8Prisms 3Hulls(|F|=596) 9Hulls(|F|=10182)
Figure19:Additionalcomparisonfromrunningourapproachonavarietyofinputmeshes.Greenindicatesboundingboxes,yellowcylinders,
bluetrapezoidalprisms,redcapsules,lightbluespheres,andlightorangefrustums.Ourapproachmorecloselyadherestotheinputmesh
whilecontainingfewerelementsthanapproximateconvexdecompositionapproaches.Ourapproachalsousesthefewestbytesonallmodels
shown.cblucq,cbtoAflame,cbmaxpsr,cbBlenderolokos,cbAerial_Knight,cbRitorDP.
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection 19of24
|     |     | Input |     |     |     | Ours |     |     | CoACD | V-HACD |     |
| --- | --- | ----- | --- | --- | --- | ---- | --- | --- | ----- | ------ | --- |
Name #F #V Mani. WT #Box #Cap #Sph #Cyl #Fru #Pri Time(s) #F #Hull #F #Hull
| Armadillo | 99976 | 49990 | ✓ ✓ | 195 |     | 4   | 1 12.303 | 9632 | 24  | 11275 | 15  |
| --------- | ----- | ----- | --- | --- | --- | --- | -------- | ---- | --- | ----- | --- |
ArmoredCharizard 4649 3273 ✓ × 144 2 10 32 0.417 7170 41 2402 26
| Bell           | 10686 | 10578  | ✓ × | 47  | 4   | 2   | 1.418    | 11546 | 63  | 6198 | 22  |
| -------------- | ----- | ------ | --- | --- | --- | --- | -------- | ----- | --- | ---- | --- |
| Bicycle        | 54995 | 102354 | ✓ × | 50  | 34  | 22  | 2 9.373  | 4904  | 30  | 9106 | 23  |
| CanonAt1       | 9624  | 13094  | ✓ × | 8   |     | 4   | 1.531    | 7484  | 28  | 3174 | 15  |
| CardboardBoxes | 119   | 202    | × × | 34  |     |     | 10 0.006 | 5568  | 65  | 496  | 40  |
| CasioKeyboard  | 2804  | 3730   | ✓ × | 16  |     |     | 0.511    | 440   | 1   | 658  | 6   |
| ChimneyPipe    | 3404  | 4864   | ✓ × | 1   |     | 2 3 | 0.641    | 5354  | 27  | 2334 | 30  |
ChitinousKnight 87258 89239 ✓ × 47 1 1 16.084 4316 16 13019 14
ChuoHouse 173163 209450 × × 1023 10 22 18 32.894 3198 29 5200 27
| ChurchOrgan | 20875 | 26902 | ✓ × | 94  | 17  | 2 67 | 2.392 | 5550 | 54  | 3122 | 39  |
| ----------- | ----- | ----- | --- | --- | --- | ---- | ----- | ---- | --- | ---- | --- |
CinemaScan 423713 351719 ✓ × 475 1 17 5 62.922 8384 87 6030 37
| Cube         | 5756 | 7401  | ✓ × | 4   | 191 | 24  | 0.516 | 7286 | 87  | 7076 | 44  |
| ------------ | ---- | ----- | --- | --- | --- | --- | ----- | ---- | --- | ---- | --- |
| CyberpunkAtm | 6566 | 10447 | ✓ × | 63  |     | 24  | 0.659 | 3912 | 25  | 1458 | 16  |
CyberpunkBike 31916 37040 ✓ × 34 3 4 16 1 4.379 4614 15 9626 42
| Dojo             | 4569  | 4133  | ✓ × | 470 | 1   | 8   | 4 0.208 | 9866 | 149 | 2354 | 50  |
| ---------------- | ----- | ----- | --- | --- | --- | --- | ------- | ---- | --- | ---- | --- |
| Dungeon(Precise) | 17986 | 59852 | ✓ × | 532 |     | 9   | 1.680   | 6984 | 90  | 1298 | 17  |
EspressoMachine 19738 29059 ✓ × 60 16 1 101 2.500 10878 93 4668 35
FantasyAsianHouse 267627 289886 ✓ × 3675 223 131 2 39.965 3548 28 10940 35
| Fps-Hands | 4076 | 4600 | ✓ × | 145  |     | 5   | 0.533 | 2472  | 12   | 2440 | 14  |
| --------- | ---- | ---- | --- | ---- | --- | --- | ----- | ----- | ---- | ---- | --- |
| Fractal   | 8184 | 7816 | × × | 5434 |     |     | 0.168 | 53148 | 1126 | 3010 | 52  |
FrenchHalfbasket 35288 41255 ✓ × 273 5 18 5.383 596 3 10182 9
| GreekVase   | 12545 | 14464 | × × | 379 |     |     | 0.713   | 18624 | 62  | 12790 | 51  |
| ----------- | ----- | ----- | --- | --- | --- | --- | ------- | ----- | --- | ----- | --- |
| Gun         | 10256 | 8994  | ✓ × | 112 |     | 13  | 8 1.203 | 3354  | 17  | 2308  | 20  |
| HoverBike   | 9327  | 7025  | ✓ × | 66  |     | 6   | 1.011   | 3924  | 16  | 2850  | 19  |
| JpnCorridor | 200   | 308   | ✓ × | 33  |     |     | 0.011   | 4754  | 34  | 542   | 20  |
JpnHouse 119620 141206 ✓ × 645 22 22 145 118 17.247 6332 75 4010 34
| JpnHouse2 | 233965 | 235330 | × × | 409 | 1   |     | 2 50.214 | 3876 | 39  | 2184 | 24  |
| --------- | ------ | ------ | --- | --- | --- | --- | -------- | ---- | --- | ---- | --- |
| JpnHouse3 | 41462  | 42444  | ✓ ✓ | 645 |     | 1   | 3 4.282  | 1970 | 13  | 1404 | 13  |
JpnPaddleCrab 567566 550825 ✓ × 1146 14 3 134.896 11484 64 16579 22
✓
| ShintoShrine | 6280 | 6638 | ×   | 77  | 6   | 40  | 0.780 | 7116 | 69  | 2270 | 26  |
| ------------ | ---- | ---- | --- | --- | --- | --- | ----- | ---- | --- | ---- | --- |
KagiyaEdoTokyo 22819 18820 × × 668 1 207 19 2.400 1088 7 652 8
✓
| Lantern  | 1360 | 1862 | ×   | 17  |     | 6   | 4 0.148 | 716  | 5   | 392  | 8   |
| -------- | ---- | ---- | --- | --- | --- | --- | ------- | ---- | --- | ---- | --- |
| Lekythos | 1075 | 1148 | ✓ × | 110 |     | 3   | 7 0.106 | 9056 | 40  | 3498 | 42  |
✓
| Lethe | 4782 | 8219 | ×   | 112 | 1   | 13 62 | 10 0.490 | 4172 | 25  | 2140 | 18  |
| ----- | ---- | ---- | --- | --- | --- | ----- | -------- | ---- | --- | ---- | --- |
MarbleTrack 32558 47029 ✓ × 106 1 4 117 10 5.460 7594 50 3946 18
✓
| Maze | 37191 | 40663 | ×   | 7000 |     |     | 1.450   | 70674 | 684 | 3628 | 105 |
| ---- | ----- | ----- | --- | ---- | --- | --- | ------- | ----- | --- | ---- | --- |
| Mech | 8732  | 15771 | ✓ × | 42   | 2   | 5   | 4 1.130 | 5618  | 29  | 2632 | 22  |
✓
| MelonPallet   | 45016 | 45342 | ×   | 38  |     |     | 6.015 | 9790  | 54  | 4900 | 23  |
| ------------- | ----- | ----- | --- | --- | --- | --- | ----- | ----- | --- | ---- | --- |
| MilitechRobot | 52373 | 29422 | ✓ × | 116 |     | 68  | 5.925 | 13050 | 66  | 5784 | 25  |
✓
| ModularFenceCorner | 4642 | 3257 | ×   | 3   |     | 5   | 0.592   | 5240 | 13  | 1602 | 10  |
| ------------------ | ---- | ---- | --- | --- | --- | --- | ------- | ---- | --- | ---- | --- |
| OldTree            | 4226 | 4921 | ✓ × | 98  | 1   |     | 1 0.476 | 6204 | 38  | 3079 | 15  |
✓
| PipeWall | 1545 | 1791 | ×   | 44  | 31  | 25  | 0.131   | 7564 | 70  | 1840 | 35  |
| -------- | ---- | ---- | --- | --- | --- | --- | ------- | ---- | --- | ---- | --- |
| Pipes    | 1200 | 2154 | ✓ × | 21  |     | 22  | 7 0.127 | 5666 | 27  | 3032 | 42  |
✓
| PottedPlant | 4861 | 6830 | ×   | 57  | 2   | 8   | 5 0.535 | 10560 | 70  | 4600 | 46  |
| ----------- | ---- | ---- | --- | --- | --- | --- | ------- | ----- | --- | ---- | --- |
RaspberryPlant 487445 427594 ✓ × 245 3 5 1 135.427 8724 76 9640 34
✓
| Road | 306 | 522 | ×   | 5   |     |     | 0.044 | 132 | 1   | 66  | 6   |
| ---- | --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- |
RopeBridge 7256 7624 ✓ × 132 40 16 170 0.515 12254 279 2376 27
ShintoWatchtower 131367 134770 × × 1387 1 80 1 11 16.909 12968 122 12408 75
ShirakawagoHouse 15965 21329 ✓ × 1299 11 2 80 1.487 11424 100 3009 41
|              |       |       | ✓ ✓ |      |     |     |          |       |     |       |     |
| ------------ | ----- | ----- | --- | ---- | --- | --- | -------- | ----- | --- | ----- | --- |
| SnowflakeOrb | 77418 | 38395 |     | 1273 |     | 156 | 66 7.822 | 22768 | 78  | 39433 | 39  |
| SonyPc       | 15512 | 24533 | ✓ × | 171  | 6   | 42  | 5 2.341  | 3440  | 30  | 3864  | 18  |
✓
| SpaceFighter | 34965 | 55060 | ×   | 158 |     | 4 23 | 8.472 | 4512 | 16  | 5593 | 39  |
| ------------ | ----- | ----- | --- | --- | --- | ---- | ----- | ---- | --- | ---- | --- |
SpacestationV3 35488 89668 ✓ × 1667 8 91 181 3.808 6170 165 2132 28
✓
SpeederBike 11926 15152 × 239 1 3 20 20 1.305 3924 20 6096 42
SpiderTank 106464 204581 ✓ × 244 11 3 125 2 15.844 7560 41 4104 19
| SpiralStaircase | 6358  | 7437  | × × | 24  | 40  |     | 16 0.861 | 3556 | 35  | 4502 | 30  |
| --------------- | ----- | ----- | --- | --- | --- | --- | -------- | ---- | --- | ---- | --- |
| GuardRail       | 14744 | 14559 | ✓ × | 16  | 13  | 11  | 1.985    | 2428 | 29  | 2836 | 14  |
✓
| Table | 66    | 154   | ×   | 11  |     |     | 0.005 | 1210 | 11  | 266  | 12  |
| ----- | ----- | ----- | --- | --- | --- | --- | ----- | ---- | --- | ---- | --- |
| Tank  | 15306 | 21338 | ✓ × | 16  |     | 7   | 2.636 | 4784 | 19  | 3672 | 17  |
✓
| Teacup        | 1465  | 2360  | ×   | 117 |     | 3   | 0.076 | 10670 | 37  | 3554 | 39  |
| ------------- | ----- | ----- | --- | --- | --- | --- | ----- | ----- | --- | ---- | --- |
| TrainingDummy | 20816 | 17483 | ✓ × | 8   |     | 19  | 2.981 | 4586  | 14  | 4108 | 17  |
✓
TurtleCastle 378627 405918 × 384 1 56 6 64.410 7852 49 7942 24
| RobotVera | 47790 | 66243 | ✓ × | 138 |     | 12 146 | 5.829 | 9774 | 46  | 7874 | 24  |
| --------- | ----- | ----- | --- | --- | --- | ------ | ----- | ---- | --- | ---- | --- |
| WarTank   | 18477 | 26601 | × × | 57  | 3   | 5      | 2.474 | 7992 | 98  | 2236 | 29  |
WatBenchamabophit 999956 1115136 ✓ × 1621 17 6 54 8 178.146 6376 56 6096 44
✓
WhiteHeadedVulture 115998 65304 × 198 2 16.866 4006 15 6488 18
Yeahright 377344 377084 ✓ ✓ 761 13 4 22 70.787 4860 47 38432 30
Table3:PrimitivecountsofourapproachonourdatasetfromSketchfab,comparedtoCoACD[WLLS22]andV-HACD[MG09].Empty
cellsindicate0.Non-manifoldnessindicatesifthereareanynon-manifoldedges,and(WT)watertightnessindicatesiftherearenoboundary
edges.Convexprimitivedecomposition’soutputvariesheavilywiththestructureoftheinputmesh,sometimesfavoringonekindofprimitive
overothers.
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

20of24 J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection
1-way(New→Input)Dist.↓
|                       | Ours              | CoACD             | V-HACD            |
| --------------------- | ----------------- | ----------------- | ----------------- |
| Name                  | Hausdorff Chamfer | Hausdorff Chamfer | Hausdorff Chamfer |
| Armadillo             | 0.10065 0.01314   | 0.08252 0.01008   | 0.07888 0.00848   |
| ArmoredCharizard      | 0.01523 0.00071   | 0.07099 0.01056   | 0.07472 0.01009   |
| Bell                  | 0.06347 0.01062   | 0.03188 0.00663   | 0.09992 0.01308   |
| Bicycle               | 0.01196 0.00221   | 0.03536 0.00935   | 0.04943 0.00718   |
| CanonAt1              | 0.12554 0.02809   | 0.12344 0.01619   | 0.12567 0.01438   |
| CardboardBoxes        | 0.01531 0.00236   | 0.03449 0.00758   | 0.05353 0.00563   |
| CasioKeyboard         | 0.01388 0.00296   | 0.02015 0.00997   | 0.04523 0.00490   |
| ChimneyPipe           | 0.13351 0.02427   | 0.08515 0.01136   | 0.08925 0.00826   |
| ChitinousKnight       | 0.07392 0.01502   | 0.06393 0.01201   | 0.06716 0.00719   |
| ChuoHouse             | 0.10229 0.00340   | 0.08021 0.01410   | 0.08105 0.01114   |
| ChurchOrgan           | 0.03531 0.00746   | 0.03630 0.00946   | 0.03745 0.00493   |
| CinemaScan            | 0.07168 0.00214   | 0.03566 0.00906   | 0.05282 0.00793   |
| Cube                  | 0.00260 0.00025   | 0.02967 0.00810   | 0.04041 0.00707   |
| CyberpunkAtm          | 0.04043 0.00746   | 0.07036 0.01175   | 0.05880 0.00847   |
| CyberpunkBike         | 0.07587 0.01264   | 0.03430 0.00912   | 0.04883 0.00599   |
| Dojo                  | 0.11107 0.01811   | 0.03127 0.00792   | 0.09150 0.00762   |
| DungeonLevel(Precise) | 0.00570 0.00294   | 0.01758 0.00548   | 0.05483 0.00483   |
| EspressoMachine       | 0.02850 0.00691   | 0.07415 0.01195   | 0.06583 0.01048   |
| FantasyAsianHouse     | 0.06878 0.00547   | 0.05872 0.01137   | 0.05344 0.00748   |
| Fps-Hands             | 0.01239 0.00383   | 0.03822 0.00944   | 0.04366 0.00614   |
| Fractal               | 0.00003 0.00003   | 0.02123 0.00506   | 0.03494 0.00619   |
| FrenchHalfbasket      | 0.00596 0.00065   | 0.03245 0.00838   | 0.01955 0.00204   |
| GreekVase             | 0.00669 0.00176   | 0.03433 0.00998   | 0.11744 0.01602   |
0.03779 0.00673
| Gun                |                 | 0.05785 0.01105 | 0.05903 0.00723 |
| ------------------ | --------------- | --------------- | --------------- |
| HoverBike          | 0.05884 0.00960 | 0.06923 0.01254 | 0.07398 0.01110 |
| JpnCorridor        | 0.00770 0.00003 | 0.02189 0.00832 | 0.12483 0.00890 |
| JpnHouse           | 0.09144 0.02295 | 0.03314 0.00817 | 0.25382 0.00716 |
| JpnHouse2          | 0.01592 0.00195 | 0.03046 0.00715 | 0.03925 0.00452 |
| JpnHouse3          | 0.01791 0.00021 | 0.12074 0.01888 | 0.12718 0.01599 |
| JpnPaddleCrab      | 0.02933 0.00562 | 0.07334 0.00910 | 0.08255 0.00969 |
| ShintoShrine       | 0.04818 0.00908 | 0.04068 0.00880 | 0.05948 0.00786 |
| KagiyaEdoTokyo     | 0.00642 0.00176 | 0.10794 0.02253 | 0.10737 0.01558 |
| Lantern            | 0.11232 0.01439 | 0.10980 0.01612 | 0.11202 0.01331 |
| Lekythos           | 0.04035 0.00738 | 0.04216 0.01160 | 0.06151 0.00709 |
| Lethe              | 0.07164 0.00751 | 0.04467 0.00822 | 0.09024 0.00923 |
| MarbleTrack        | 0.01486 0.00053 | 0.02851 0.00630 | 0.10007 0.00621 |
| Maze               | 0.00057 0.00043 | 0.00701 0.00247 | 0.01625 0.00194 |
| Mech               | 0.08841 0.01407 | 0.06509 0.00984 | 0.05552 0.00670 |
| MelonPallet        | 0.01604 0.00334 | 0.05276 0.00656 | 0.05174 0.00426 |
| MilitechRobot      | 0.00808 0.00221 | 0.04393 0.00707 | 0.05294 0.00760 |
| ModularFenceCorner | 0.25632 0.02719 | 0.02813 0.00839 | 0.06559 0.00594 |
| OldTree            | 0.08825 0.00616 | 0.03537 0.00410 | 0.06434 0.01040 |
| PipeWall           | 0.00977 0.00240 | 0.03148 0.00733 | 0.05593 0.00590 |
| Pipes              | 0.01968 0.00718 | 0.03984 0.00967 | 0.04104 0.00656 |
| PottedPlant        | 0.05526 0.01271 | 0.05503 0.01049 | 0.08425 0.01146 |
| RaspberryPlant     | 0.06606 0.00817 | 0.03220 0.00833 | 0.04783 0.00877 |
| Road               | 0.00153 0.00066 | 0.01749 0.01075 | 0.00344 0.00006 |
| RopeBridge         | 0.05778 0.01795 | 0.01827 0.00678 | 0.03575 0.00648 |
| ShintoWatchtower   | 0.03843 0.00958 | 0.03871 0.00944 | 0.05066 0.00851 |
| ShirakawagoHouse   | 0.06299 0.00490 | 0.12086 0.01269 | 0.12261 0.01411 |
| SnowflakeOrb       | 0.01533 0.00449 | 0.02962 0.00795 | 0.03527 0.00569 |
| SonyPc             | 0.05983 0.00839 | 0.04663 0.01307 | 0.11451 0.01695 |
| SpaceFighter       | 0.04089 0.00609 | 0.03990 0.00673 | 0.03338 0.00309 |
| SpacestationV3     | 0.02719 0.00248 | 0.02855 0.00641 | 0.11113 0.03307 |
| SpeederBike        | 0.05146 0.00897 | 0.05253 0.00956 | 0.05333 0.00728 |
| SpiderTank         | 0.00962 0.00192 | 0.03645 0.00769 | 0.05948 0.00760 |
| SpiralStaircase    | 0.13282 0.01846 | 0.03745 0.00972 | 0.05840 0.00797 |
| GuardRail          | 0.00502 0.00173 | 0.03474 0.00778 | 0.04421 0.00988 |
| Table              | 0.00207 0.00098 | 0.03840 0.01053 | 0.03449 0.00234 |
| Tank               | 0.02078 0.00533 | 0.16587 0.02053 | 0.16880 0.02079 |
| Teacup             | 0.01361 0.00415 | 0.03497 0.00972 | 0.08308 0.00593 |
| TrainingDummy      | 0.03855 0.01072 | 0.09124 0.01129 | 0.05419 0.00929 |
| TurtleCastle       | 0.05321 0.00784 | 0.09978 0.01941 | 0.10281 0.01814 |
| RobotVera          | 0.01120 0.00115 | 0.03402 0.00710 | 0.04165 0.00605 |
| WarTank            | 0.04930 0.00802 | 0.04800 0.00721 | 0.05458 0.00662 |
| WatBenchamabophit  | 0.01643 0.00196 | 0.03528 0.00801 | 0.08985 0.00699 |
| WhiteHeadedVulture | 0.03381 0.00180 | 0.09739 0.01401 | 0.09997 0.01310 |
| Yeahright          | 0.00333 0.00092 | 0.03685 0.00939 | 0.06662 0.01072 |
Table 4: Full set of comparisons of our approach on our dataset. Convex primitive decomposition is on average closer to the in-
put mesh than CoACD [WLLS22] and V-HACD [MG09] on both the chamfer and hausdorff distance. Distances are normalized as
Hausdorff/ChamferNew→Input.
∥BoundingBoxDiag∥2
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection 21of24
| ModelName          |        | Ours   |        | CoACD  |        |        | V-HACD |        |
| ------------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
|                    | Floats | Total  | Floats | Ints   | Total  | Floats | Ints   | Total  |
| BytesUsed          | 4      | Bytes  | 4      | 2      | Bytes  | 4      | 2      | Bytes  |
| Armadillo          | 1989   | 7956   | 14592  | 28896  | 116160 | 17835  | 33825  | 138990 |
| ArmoredCharizard   | 1876   | 7504   | 11001  | 21510  | 87024  | 3810   | 7206   | 29652  |
| Bell               | 512    | 2048   | 17697  | 34638  | 140064 | 9726   | 18594  | 76092  |
| Bicycle            | 914    | 3656   | 7536   | 14712  | 59568  | 14268  | 27318  | 111708 |
| CanonAt1           | 108    | 432    | 11394  | 22452  | 90480  | 4959   | 9522   | 38880  |
| CardboardBoxes     | 450    | 1800   | 8742   | 16704  | 68376  | 987    | 1488   | 6924   |
| CasioKeyboard      | 160    | 640    | 666    | 1320   | 5304   | 1065   | 1974   | 8208   |
| ChimneyPipe        | 48     | 192    | 8193   | 16062  | 64896  | 3813   | 7002   | 29256  |
| ChitinousKnight    | 484    | 1936   | 6570   | 12948  | 52176  | 20706  | 39057  | 160938 |
| ChuoHouse          | 10652  | 42608  | 4971   | 9594   | 39072  | 8142   | 15600  | 63768  |
| ChurchOrgan        | 1536   | 6144   | 8649   | 16650  | 67896  | 5019   | 9366   | 38808  |
| CinemaScan         | 4931   | 19724  | 13098  | 25152  | 102696 | 9882   | 18090  | 75708  |
| Cube               | 1545   | 6180   | 11451  | 21858  | 89520  | 11013  | 21228  | 86508  |
| CyberpunkAtm       | 798    | 3192   | 6018   | 11736  | 47544  | 2346   | 4374   | 18132  |
| CyberpunkBike      | 500    | 2000   | 7011   | 13842  | 55728  | 15357  | 28878  | 119184 |
| Dojo               | 4807   | 19228  | 15693  | 29598  | 121968 | 3894   | 7062   | 29700  |
| Dungeon(Precise)   | 5383   | 21532  | 11016  | 20952  | 85968  | 2127   | 3894   | 16296  |
| EspressoMachine    | 1423   | 5692   | 16875  | 32634  | 132768 | 7389   | 14004  | 57564  |
| FantasyAsianHouse  | 39250  | 157000 | 5490   | 10644  | 43248  | 16524  | 32820  | 131736 |
| Fps-Hands          | 1485   | 5940   | 3780   | 7416   | 29952  | 3813   | 7320   | 29892  |
| Fractal            | 54340  | 217360 | 86478  | 159444 | 664800 | 4845   | 9030   | 37440  |
| FrenchHalfbasket   | 2891   | 11564  | 912    | 1788   | 7224   | 16737  | 30546  | 128040 |
| GreekVase          | 3790   | 15160  | 28308  | 55872  | 224976 | 19779  | 38370  | 155856 |
| Gun                | 1299   | 5196   | 5133   | 10062  | 40656  | 3627   | 6924   | 28356  |
| HoverBike          | 702    | 2808   | 5982   | 11772  | 47472  | 4491   | 8550   | 35064  |
| JpnCorridor        | 330    | 1320   | 7335   | 14262  | 57864  | 936    | 1626   | 6996   |
| JpnHouse           | 9005   | 36020  | 9948   | 18996  | 77784  | 6360   | 12030  | 49500  |
| JpnHouse2          | 4119   | 16476  | 6048   | 11628  | 47448  | 3552   | 6552   | 27312  |
| JpnHouse3          | 6490   | 25960  | 3033   | 5910   | 23952  | 2316   | 4212   | 17688  |
| JpnPaddleCrab      | 11591  | 46364  | 17610  | 34452  | 139344 | 27912  | 49737  | 211122 |
| ShintoShrine       | 1092   | 4368   | 11088  | 21348  | 87048  | 3660   | 6810   | 28260  |
| KagiyaEdoTokyo     | 8345   | 33380  | 1674   | 3264   | 13224  | 1068   | 1956   | 8184   |
| Lantern            | 256    | 1024   | 1104   | 2148   | 8712   | 636    | 1176   | 4896   |
| Lekythos           | 1198   | 4792   | 13824  | 27168  | 109632 | 5598   | 10494  | 43380  |
| Lethe              | 1723   | 6892   | 6408   | 12516  | 50664  | 3420   | 6420   | 26520  |
| MarbleTrack        | 2012   | 8048   | 11691  | 22782  | 92328  | 6438   | 11838  | 49428  |
| Maze               | 70000  | 280000 | 330    | 212022 | 425364 | 6105   | 10884  | 46188  |
| Mech               | 513    | 2052   | 8601   | 16854  | 68112  | 4185   | 7896   | 32532  |
| MelonPallet        | 380    | 1520   | 15009  | 29370  | 118776 | 8127   | 14700  | 61908  |
| MilitechRobot      | 1636   | 6544   | 19971  | 39150  | 158184 | 9144   | 17352  | 71280  |
| ModularFenceCorner | 65     | 260    | 7938   | 15720  | 63192  | 2472   | 4806   | 19500  |
| OldTree            | 998    | 3992   | 9534   | 18612  | 75360  | 4878   | 9237   | 37986  |
| Pipes              | 441    | 1764   | 8661   | 16998  | 68640  | 4872   | 9096   | 37680  |
| PipeWall           | 832    | 3328   | 11766  | 22692  | 92448  | 3069   | 5520   | 23316  |
| PottedPlant        | 695    | 2780   | 16260  | 31680  | 128400 | 7437   | 13800  | 57348  |
| RaspberryPlant     | 2517   | 10068  | 13542  | 26172  | 106512 | 16023  | 28920  | 121932 |
| Road               | 50     | 200    | 204    | 396    | 1608   | 135    | 198    | 936    |
| RopeBridge         | 2854   | 11416  | 20055  | 36762  | 153744 | 3891   | 7128   | 29820  |
| ShintoWatchtower   | 14325  | 57300  | 20184  | 38904  | 158544 | 19698  | 37224  | 153240 |
| ShirakawagoHouse   | 13635  | 54540  | 17736  | 34272  | 139488 | 4854   | 9027   | 37470  |
| SnowflakeOrb       | 14548  | 58192  | 34620  | 68304  | 275088 | 67422  | 118299 | 506286 |
| SonyPc             | 2101   | 8404   | 5340   | 10320  | 42000  | 6336   | 11592  | 48528  |
| SpacestationV3     | 18357  | 73428  | 10245  | 18510  | 78000  | 3432   | 6396   | 26520  |
| SpaceFighter       | 1757   | 7028   | 6864   | 13536  | 54528  | 8802   | 16779  | 68766  |
| SpeederBike        | 2769   | 11076  | 6006   | 11772  | 47568  | 9642   | 18288  | 75144  |
13704
| SpiderTank         | 3426  |       | 11586 | 22680 | 91704  | 6510  | 12312  | 50664  |
| ------------------ | ----- | ----- | ----- | ----- | ------ | ----- | ------ | ------ |
| SpiralStaircase    | 696   | 2784  | 5544  | 10668 | 43512  | 7110  | 13506  | 55452  |
| GuardRail          | 328   | 1312  | 3816  | 7284  | 29832  | 4473  | 8508   | 34908  |
| Table              | 110   | 440   | 1881  | 3630  | 14784  | 471   | 798    | 3480   |
| Tank               | 209   | 836   | 7290  | 14352 | 57864  | 5781  | 11016  | 45156  |
| Teacup             | 1191  | 4764  | 16227 | 32010 | 128928 | 5676  | 10662  | 44028  |
| TrainingDummy      | 213   | 852   | 6963  | 13758 | 55368  | 6375  | 12324  | 50148  |
| TurtleCastle       | 4305  | 17220 | 12072 | 23556 | 95400  | 12660 | 23826  | 98292  |
| RobotVera          | 2450  | 9800  | 14937 | 29322 | 118392 | 12339 | 23622  | 96600  |
| WarTank            | 626   | 2504  | 12576 | 23976 | 98256  | 3564  | 6708   | 27672  |
| WatBenchamabophit  | 16819 | 67276 | 9900  | 19128 | 77856  | 9624  | 18288  | 75072  |
| WhiteHeadedVulture | 2002  | 8008  | 6099  | 12018 | 48432  | 10590 | 19464  | 81288  |
| Yeahright          | 7871  | 31484 | 7572  | 14580 | 59448  | 59139 | 115296 | 467148 |
Table5: Comparisonofmemorycostforeachmodelinourdataset,measuredinbytes.Ourapproachonwholeuseslessmemorythan
theotherapproaches.Forfloats,wetreatthemas4bytes(single-precisionfloatinC),andforintegerswetreatthemasunsigned2byte
integers(uint16_tinC),eventhoughinsomecasesitwouldoverflow.
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

22of24 J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection
FrameTime↓DuringBall-DroppingSim.ofOurs,CoACD,V-HACD
SimilarBehaviorforAllMeshes OursHasCloserBehaviorToInput
TrainingDummy(VertexMergingFig.11) ShintoWatchtower(Fig.1)
25
| )sdnocesilliM( emiT |     | Ours   | )sdnocesilliM( emiT |     | Ours   |
| ------------------- | --- | ------ | ------------------- | --- | ------ |
| 15                  |     | CoACD  | 20                  |     | CoACD  |
|                     |     | V-HACD |                     |     | V-HACD |
15
10
10
| 5                            |         |          | 5                   |                    |          |
| ---------------------------- | ------- | -------- | ------------------- | ------------------ | -------- |
| 0 200                        | 400 600 | 800 1000 | 0 200               | 400 600            | 800 1000 |
|                              | Frame # |          |                     | Frame #            |          |
| CylindricalWaterTank(Fig.19) |         |          |                     | RopeBridge(Fig.19) |          |
| )sdnocesilliM( emiT          |         | Ours     | )sdnocesilliM( emiT |                    | Ours     |
| 15                           |         | CoACD    | 20                  |                    | CoACD    |
|                              |         | V-HACD   |                     |                    | V-HACD   |
15
10
10
| 5     |         |          | 5     |               |          |
| ----- | ------- | -------- | ----- | ------------- | -------- |
| 0 200 | 400 600 | 800 1000 | 0 200 | 400 600       | 800 1000 |
|       | Frame # |          |       | Frame #       |          |
|       | Bell    |          |       | Table(Fig.19) |          |
30
| )sdnocesilliM( emiT |     | Ours   | )sdnocesilliM( emiT |     | Ours   |
| ------------------- | --- | ------ | ------------------- | --- | ------ |
| 20                  |     | CoACD  |                     |     | CoACD  |
|                     |     | V-HACD | 20                  |     | V-HACD |
15
10
10
5
| 0 200 | 400 600        | 800 1000 | 0 200                 | 400 600 | 800 1000 |
| ----- | -------------- | -------- | --------------------- | ------- | -------- |
|       | Frame #        |          |                       | Frame # |          |
|       | CanonAT1Camera |          | Cube(Precise)(Fig.17) |         |          |
25
| )sdnocesilliM( emiT 40 |     | Ours   | )sdnocesilliM( emiT |     | Ours   |
| ---------------------- | --- | ------ | ------------------- | --- | ------ |
|                        |     | CoACD  | 20                  |     | CoACD  |
| 30                     |     | V-HACD |                     |     | V-HACD |
15
20
10
10
5
| 0 200               | 400 600 | 800 1000 | 0 200                   | 400 600 | 800 1000 |
| ------------------- | ------- | -------- | ----------------------- | ------- | -------- |
|                     | Frame # |          |                         | Frame # |          |
|                     | WarTank |          | SpiralStaircase(Fig.18) |         |          |
| )sdnocesilliM( emiT |         | Ours     | )sdnocesilliM( emiT 30  |         | Ours     |
|                     |         | CoACD    |                         |         | CoACD    |
40
|     |     | V-HACD |     |     | V-HACD |
| --- | --- | ------ | --- | --- | ------ |
20
20
10
| 0 200 | 400 600 | 800 1000 | 0 200 | 400 600 | 800 1000 |
| ----- | ------- | -------- | ----- | ------- | -------- |
|       | Frame # |          |       | Frame # |          |
Figure20:Comparisonofframedurationforcollisiondetectionwhendropping5000spheresondifferentmeshes,wheretheleft-columnis
mesheswherethebehaviorofallcollidersisrelativelysimilar,andtherightcolumnistheperformancewhenourcolliderhasvisuallymore
similarperformancetotheinput.Inbothcases,ourapproachhascomparableorbetterperformancethanCoACDandV-HACD.
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection 23of24
FrameTime↓DuringBall-DroppingSim.ofOurs,CoACD,V-HACD(AllsimilartoInput)
JpnCorridor,Ours=35Primitives,CoACD=34Hulls EspressoMachine,Ours=178Primitives,CoACD=93Hulls
| 16  |     | Ours   | 25  |     | Ours   |
| --- | --- | ------ | --- | --- | ------ |
|     |     | CoACD  |     |     | CoACD  |
| 14  |     | V-HACD |     |     | V-HACD |
20
| )sdnocesilliM( emiT 12 |     |     | )sdnocesilliM( emiT |     |     |
| ---------------------- | --- | --- | ------------------- | --- | --- |
| 10                     |     |     | 15                  |     |     |
8
10
6
| 4     |         |          | 5     |         |          |
| ----- | ------- | -------- | ----- | ------- | -------- |
| 0 200 | 400 600 | 800 1000 | 0 200 | 400 600 | 800 1000 |
|       | Frame # |          |       | Frame # |          |
MelonPallet,Ours=38Primitives,CoACD=54Hulls JpnPaddleCrab,Fig.23,Ours=1165Primitives,CoACD=64Hulls
40
Ours
| 35  |     | C o A C D  | )sdnocesilliM( emiT 30 |     | Ours  |
| --- | --- | ---------- | ---------------------- | --- | ----- |
|     |     | V -H A C D |                        |     | CoACD |
)sdnocesilliM( emiT 30
| 25  |     |     |     |     | V-HACD |
| --- | --- | --- | --- | --- | ------ |
20
20
15
10
10
5
| 0 200 | 400 600 | 800 1000 | 0 200 | 400 600 | 800 1000 |
| ----- | ------- | -------- | ----- | ------- | -------- |
|       | Frame # |          |       | Frame # |          |
ChurchOrgan,Fig.18,Ours=180Primitives,CoACD=57 SpaceFighter,Ours=158Primitives,CoACD=16Hulls
40
| 18                  |     | Ours       |                     |     | Ours   |
| ------------------- | --- | ---------- | ------------------- | --- | ------ |
| 16                  |     | C o A C D  | 35                  |     | CoACD  |
|                     |     | V -H A C D |                     |     | V-HACD |
| 14                  |     |            | 30                  |     |        |
| )sdnocesilliM( emiT |     |            | )sdnocesilliM( emiT |     |        |
| 12                  |     |            | 25                  |     |        |
| 10                  |     |            | 20                  |     |        |
15
8
| 6     |         |          | 10    |         |          |
| ----- | ------- | -------- | ----- | ------- | -------- |
| 4     |         |          | 5     |         |          |
| 0 200 | 400 600 | 800 1000 | 0 200 | 400 600 | 800 1000 |
|       | Frame # |          |       | Frame # |          |
Figure 21: Comparison of our approach against CoACD and V-HACD, considering the number of components in our approach versus
CoACD.Ourapproachisalwaysfasterorequaltoapproximateconvexdecomposition,regardlessofthenumberofcomponents.
|     | |F|=570588 |     | 2343Boxes,115Capsules,1343Cylinders |     |     |
| --- | ---------- | --- | ----------------------------------- | --- | --- |
An additional example of our approach on a dense, complex scene [Lum17]. The entire scene is processed in one pass in
Figure 22:
under2minutes,andnaturallydecomposesobjectsintoconstituentparts.Weuseourapproachtogenerateaninitialdecomposition,then
automaticallydeleteanyextremelythinboundingboxeswhichhaveradiusonanyaxis≤1×10−4.Thispostprocessingisincludedbecause
aroundtheplacematsthereareanumberoffrillswhichcontributealargenumberofprimitivesbuthaveessentially0volume.Furthermore,
manywallsareentirelyplanarbutmaynotberectangular,leadingtoregionsjuttingout.Removingthinboundingboxesfixesbothproblems.
Greenindicatesboundingboxes,yellowforcylinders,andredforcapsules.
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.

24of24 J.Knodt&X.Gao/ConvexPrimitiveDecompositionforCollisionDetection
|     | Input |     | Ours |     | Input | Ours |     |
| --- | ----- | --- | ---- | --- | ----- | ---- | --- |
|F|=497084 288Boxes,8Cap,4Cyl,4Sph |F|=375224 311Boxes,12Cap,5Cyl,3Sph
Figure23:Weshowourapproachonorganicmeshes,whicharenotrepresentedheavilyinourdataset.Ourapproachisprimarilydesigned
for artist created meshes for games, but can capture coarse details on organic meshes. A larger number of primitives are used, as each
primitivealonecannotcapturecurvedsurfaceswell.Forthesemodels,wechangeweightssothatspheresare0.7,capsulesare0.85,and
isoscelesprismsaredisallowed.Thecurrentapproachforthesekindsofmeshismanualcreation,convexhulls,orcoarseapproximations.
czffish.asia/floraZia.com.
|     | Input(|F|=377344) |     | 761Boxes,13Cap,22Cyl,4Spheres |     |     |     |     |
| --- | ----------------- | --- | ----------------------------- | --- | --- | --- | --- |
Figure 24: Our approach on a particularly challenging mesh, Figure25:Visualizationofmanytraining
“Yeahright”. Our approach can preserve thin structures and holes. dummiesfromFig.11,collidinginsideof
| czKeenanCrane. |     |      |        |     | “Jpn.CorridorMiddle”. |      |        |
| -------------- | --- | ---- | ------ | --- | --------------------- | ---- | ------ |
| Input          |     | Ours | V-HACD |     | Input                 | Ours | V-HACD |
|F|=1884 69Boxes,7Cap,6Cyl,8Prism50Hulls(|F|=4272) |F|=33872 48Boxes,14Cap,5Cyl 47Hulls(|F|=5606)
| )sdnocesilliM( emiT 30 |     |     |     | O u rs   | )sdnocesilliM( emiT |     | Ours   |
| ---------------------- | --- | --- | --- | -------- | ------------------- | --- | ------ |
|                        |     |     |     | V- H ACD | 15                  |     | V-HACD |
20
| 10  |     |     |     |     | 10  |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- |
5
| 0   | 200 | 400 600 | 800 | 1000 | 0 200 | 400 600 | 800 1000 |
| --- | --- | ------- | --- | ---- | ----- | ------- | -------- |
|     |     | Frame # |     |      |       | Frame # |          |
|F|=576 54Boxes,1Prism 21Hulls(|F|=2340) |F|=100028 11Boxes,3Cyl,2Prism72Hulls(|F|=8812)
| )sdnocesilliM( emiT 40 |     |         |     | Ours   | )sdnocesilliM( emiT |         | Ours     |
| ---------------------- | --- | ------- | --- | ------ | ------------------- | ------- | -------- |
|                        |     |         |     | V-HACD | 20                  |         | V-HACD   |
| 20                     |     |         |     |        | 10                  |         |          |
| 0                      | 200 | 400 600 | 800 | 1000   | 0 200               | 400 600 | 800 1000 |
|                        |     | Frame # |     |        |                     | Frame # |          |
Figure 26: Comparison of our approach to V-HACD [MG09] on a few models from their dataset. Our approach’s decomposition often
breaksuptheinputmeshinsimilarpositionstoV-HACD,whileimprovingcollisionperformance.
©2026Eurographics-TheEuropeanAssociation
forComputerGraphicsandJohnWiley&SonsLtd.
