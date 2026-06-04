| EUROGRAPHICS2026/I.LimandP.Musialski |     |         |             |     |                  |            |        |                 |     |     |     |     | ShortPaper |
| ------------------------------------ | --- | ------- | ----------- | --- | ---------------- | ---------- | ------ | --------------- | --- | --- | --- | --- | ---------- |
|                                      |     | VisACD: |             |     | Visibility-Based |            |        | GPU-Accelerated |     |     |     |     |            |
|                                      |     |         | Approximate |     |                  |            | Convex | Decomposition   |     |     |     |     |            |
|                                      |     |         |             |     |                  | EgorFokin1 |        | ManolisSavva1   |     |     |     |     |            |
1SimonFraserUniversity
3dlg-hcvc.github.io/visacd
6202 rpA 5  ]RG.sc[  1v44240.4062:viXra
| 144 |     | 87    |     |     | 60  |     |     | 28            |     |     |     |     |     |
| --- | --- | ----- | --- | --- | --- | --- | --- | ------------- | --- | --- | --- | --- | --- |
|     | 42  |       | 146 |     |     | 16  |     | 61            |     |     |     |     |     |
|     |     | CoACD |     |     |     |     |     | VisACD (Ours) |     |     |     |     |     |
Figure1:WepresentVisACD,avisibility-basedGPU-acceleratedintersection-freeapproximateconvexdecomposition(ACD)algorithm.
VisACD is rotation-equivariant and thus not sensitive to input mesh orientation. Our experiments show that VisACD outperforms prior
methodsproducingaccuratedecompositionswithfewerparts(indicatedbynumbers).
Abstract
Physics-based simulation involves trade-offs between performance and accuracy. In collision detection, one trade-off is the
granularityofcollidergeometry.Primitive-basedcolliderssuchasboundingboxesareefficient,whileusingtheoriginalmesh
ismoreaccuratebutoftencomputationallyexpensive.ApproximateConvexDecomposition(ACD)methodsstriveforabalance
ofefficiencyandaccuracy.Priorworkscanproducehigh-qualitydecompositionsbutrequirelargenumbersofconvexparts
andaresensitivetotheorientationoftheinputmesh.WeaddresstheseweaknesseswithVisACD,avisibility-based,rotation-
equivariant,andintersection-freeACDalgorithmwithGPUacceleration.Ourapproachproduceshigh-qualitydecompositions
withfewerconvexparts,isnotsensitivetoshapeorientation,andismoreefficientthanpriorwork.
CCSConcepts
•Computingmethodologies → Collisiondetection;Meshgeometrymodels;Meshmodels;Parallelalgorithms;
1. Introduction Exactconvexdecomposition[Cha81]attemptstodecomposea
shapeintoconvexhullssuchthattheshapeofthedecomposition
Representingshapesasasetofconvexhullsisanaccelerationtech-
|     |     |     |     |     |     |     |     | is exactly | the same | as the input | mesh. | Such algorithms | are slow |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | -------- | ------------ | ----- | --------------- | -------- |
niqueusedwidelyinphysicsandgameengines.Thisrepresenta-
|     |     |     |     |     |     |     |     | and produce | thousands | of parts | negating | the intended | efficiency |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | --------- | -------- | -------- | ------------ | ---------- |
tionenablesefficientalgorithmssuchascheckingwhetherapoint
|     |     |     |     |     |     |     |     | gains. A | different approach |     | is Approximate | Convex | Decomposi- |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | ------------------ | --- | -------------- | ------ | ---------- |
liesinsidethemesh[Sno17],computingdistancesbetweentwoob-
tion(ACD)[LA04],whichdecomposesobjectsintopartsthatap-
jects[GJK02]orcheckingwhethertwomeshesintersect[Ber99]. proximatelymatchtheinitialshape.Thisrelaxedconditionallows
Inpractice,setsofconvexhull‘colliders’areauthoredbycontent
algorithmsthatarefasterandproducedecompositionswithorders
| creators | through fitting | primitives |     | such as boxes | or  | capsules | to a |     |     |     |     |     |     |
| -------- | --------------- | ---------- | --- | ------------- | --- | -------- | ---- | --- | --- | --- | --- | --- | --- |
ofmagnitudefewerparts.
| mesh asset. | This is | a time-consuming |     | process, | and | the resulting |     |     |     |     |     |     |     |
| ----------- | ------- | ---------------- | --- | -------- | --- | ------------- | --- | --- | --- | --- | --- | --- | --- |
colliderscandiffersubstantiallyfromtheoriginalmeshasset.Mul- In this paper, we present a) VisACD, a method that produces
tiplealgorithmswerecreatedtoautomatethisprocessandproduce convex decompositions closer to the initial mesh and with lower
moreaccurateconvexdecompositions. partnumbers, that isnot sensitiveto meshorientation andthat is
©2026TheAuthor(s).
ProceedingspublishedbyEurographics-TheEuropeanAssociationforComputerGraphics.
ThisisanopenaccessarticleunderthetermsoftheCreativeCommonsAttributionLicense,which
permitsuse,distributionandreproductioninanymedium,providedtheoriginalworkisproperly
cited.

2of4 EgorFokin&ManolisSavva/VisACD:Visibility-BasedGPU-AcceleratedApproximateConvexDecomposition
moreefficient,comparedtobaselinesfrompriorwork.b)Acon-
cavitymetrictailoredforefficientcuttingplanecomputation.c)A
parallelizationofouralgorithmusingNVidiaOptiXandCUDA.
2. RelatedWork
| Applications | for | ACD | methods. | Recent | works | [LHG*24; |     |     |           |     |     |           |     |
| ------------ | --- | --- | -------- | ------ | ----- | -------- | --- | --- | --------- | --- | --- | --------- | --- |
|              |     |     |          |        |       |          |     |     | parts: 33 |     |     | parts: 71 |     |
GXL*23]useACDtocreatecollidersfordifferentobjectsinrobot
| grasping | simulations. | NERF-Texture |     | [HCL*23] |     | uses CoACD | as  |     |     |     |     |     |     |
| -------- | ------------ | ------------ | --- | -------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- |
Figure2:Sensitivityofaxis-alignedplanemethodstoorientation.
volume-preservingsmoothing.V-HACD[MLP16]wasadaptedby
UnrealEngine4forautomaticcollidercreationof3Dobjects.The
qualityofthedecompositionsdirectlyimpactstheaccuracyandef-
ofresultingpieces,whichishighlyinefficient,limitingthenumber
ficiencyinthementionedapplications.
ofplanesthatcanbesampledateveryiteration.
| Concavity    | measures      | for      | ACD. | ACD algorithms     |            | use a concavity |        |                  |             |         |              |           |               |
| ------------ | ------------- | -------- | ---- | ------------------ | ---------- | --------------- | ------ | ---------------- | ----------- | ------- | ------------ | --------- | ------------- |
|              |               |          |      |                    |            |                 |        | Our approach     | also uses   | cutting | planes.      | However,  | by using      |
| measure      | that they     | minimize | and  | use in evaluation. |            | Some            | meth-  |                  |             |         |              |           |               |
|              |               |          |      |                    |            |                 |        | visibility-based | concavity   | we can  | compute      | a plane   | value without |
| ods use      | surface-based | metrics  | to   | measure            | concavity. | These           | met-   |                  |             |         |              |           |               |
|              |               |          |      |                    |            |                 |        | cutting the      | mesh, which | allows  | us to sample | thousands | of planes     |
| rics include | distances     | between  | the  | mesh               | surface    | and its         | convex |                  |             |         |              |           |               |
periterationandachievebetterresults.Ourplanesamplingstrategy
| hull [LA04; | GALL13], |     | or between | the shortest | geodesic |     | path on |     |     |     |     |     |     |
| ----------- | -------- | --- | ---------- | ------------ | -------- | --- | ------- | --- | --- | --- | --- | --- | --- |
alsomakesthemethodrotation-equivariant,eliminatingsensitivity
| the mesh | and the | convex | hull [LXL16]. | HACD | [MG09] |     | projects |     |     |     |     |     |     |
| -------- | ------- | ------ | ------------- | ---- | ------ | --- | -------- | --- | --- | --- | --- | --- | --- |
tomeshorientationinaxis-alignedplanemethods(Figure2).
| the vertices | onto | the convex | hull | and measures | the | distances | be- |     |     |     |     |     |     |
| ------------ | ---- | ---------- | ---- | ------------ | --- | --------- | --- | --- | --- | --- | --- | --- | --- |
tweenthepointsandtheirprojections.Weietal.[WLLS22]show
| that these | metrics | fail to | capture | differences | of  | volume | proper- | 3. Method |     |     |     |     |     |
| ---------- | ------- | ------- | ------- | ----------- | --- | ------ | ------- | --------- | --- | --- | --- | --- | --- |
ties.Othermethodsusevolume-basedmetrics,suchasvolumera-
|     |     |     |     |     |     |     |     | 3.1. Visibility-BasedConcavityMetric |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------ | --- | --- | --- | --- | --- |
tiobetweenameshanditshull[AMSF08;MLP16;TLJP18],and
| CoACD | [WLLS22] | uses | a mixture | of volume-based |     | and | surface- |           |                   |           |     |          |                |
| ----- | -------- | ---- | --------- | --------------- | --- | --- | -------- | --------- | ----------------- | --------- | --- | -------- | -------------- |
|       |          |      |           |                 |     |     |          | We usethe | definition ofweak | convexity |     | proposed | byAsafi et al. |
based metrics. Another family of metrics uses pairwise visibility [AGC13]anddefinevisibilityedgese iasedgesbetweentwomesh
ofsurfacepoints(twopointsareconsideredvisibletoeachotherif verticesthatlieoutsideofthemeshanddonotintersectit.Anim-
thesegmentbetweenthemliesfullyoutsidethemesh).Someworks portantpropertyisthataconvexmeshhaszerovisibilityedgesand
[KFK*14;AGC13]useapercentageofpairsthataremutuallyvisi- themoreconcavitiesthereareinamesh,themorevisibilityedges.
ble.Otherworks[LLL10;RYLL11]calculatethedistancebetween
Onewaytomeasuretheconcavityofthemeshistousethenum-
thoseconnectionsandthesurfaceofthemesh.Thismetriccanbe
berofsuchedges.However,notallvisibilityedgesareequallyim-
easilycomputedandhasusefulpropertiesthatwediscusslater.Our
portant.Abetterwaytocomputethecostofavisibilityedgewas
methodusesanefficientvisibility-basedmetricatitscore,comput-
proposedbyRenetal.[RYLL11].Theytakethemaximumperpen-
| ing the total | combined |     | length of | all segments | between | mutually |     |     |     |     |     |     |     |
| ------------- | -------- | --- | --------- | ------------ | ------- | -------- | --- | --- | --- | --- | --- | --- | --- |
diculardistancebetweentheedgeandthemeshsurface.Unfortu-
visiblevertices.
nately,thisisexpensivetocompute,especiallyin3D.Instead,we
Prior work on ACD algorithms. Lien and Amato [LA04] in- usethelengthofanedgeasthecost.Thisismotivatedbytheobser-
troduced a surface-based approach that cuts meshes at regions of vationthatedgesfartherawayfromthesurfacetendtohavehigher
high concavity, with later works improving concavity measures length. We compute the concavity of the meshC∗ using a com-
[GALL13],cutpaths[LXL16],orusingtrianglemerging[MG09; binedlengthofallvisibilityedgese i:C∗(M)=∑i ∥e ∥ .Wealso
i 2
KS24].However,surface-basedmethodsstruggletopreservevol- definetheconcavityofthedecompositionD={M 1 ,M 2 ,...,Mn}as:
|     |     |     |     |     |     |     |     | C∗(D)=∑M∈D | C∗(M).Becausethisconcavitymeasureisbased |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------- | ---------------------------------------- | --- | --- | --- | --- |
ume,especiallyinmesheswithholesorcavities.Toaddressthis,
volumetric ACD methods were proposed, including tetrahedral onmeshverticesratherthanthevolumeenclosedbythemesh,it
merging [AMSF08], point-patch clustering [KFK*14], spectral dependsonmeshtopologyandcannotbeusedtocomparedecom-
clustering [AGC13], and Reeb-graph-based approaches [LLL10; positions across different meshes. Therefore, for evaluation pur-
|     |     |     |     |     |     |     |     |     | collision-aware |     | concavity | measureC |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --------------- | --- | --------- | -------- | --- |
RYLL11].Whilethesemethodsbetterpreservevolume,theydonot poses we use the by Wei et
preventconvexhullintersections,limitingtheirapplicabilityinan- al.[WLLS22].ThismetrictakestheminimumbetweenHausdorff
imationandsimulation.Morerecentworksutilizecuttingplanesas distanceandscaledvolumedifference.
amaintoolofdecompositiontopreventconvexhullintersections.
V-HACD[MG09]usesaxis-alignedcuttingplanestodecomposea
|     |     |     |     |     |     |     |     | 3.2. VisibilityEdgeComputation |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------ | --- | --- | --- | --- | --- |
voxelizedrepresentationofthemesh.CoACD[WLLS22]improves
onthisbyusinganMCTSalgorithminsteadofagreedyoneand Ourmaininsightisthat“pointvisibility”algorithmsarehighlypar-
by employing a regular mesh representation together with a vol- allelizable.Priorworkdoesnotleveragethisandinsteadextrapo-
umetricconcavitymeasuretopreservevolumeproperties.Thulet latesfromasubsetofvisibilityedges[KFK*14]orusesvisibility
al.[TLJP18]andAndrews[And24]additionallysampleplanesthat betweenReebgraphvertices[LLL10;RYLL11]Weimplementa
parallelGPU-acceleratedalgorithmtocomputeallvisibilityedges,
containedgesofmaximumconcavity.Suchmethodsevaluatethe
cuttingplanesbyperformingthecutandcomputingtheconcavity leadingtohighprecisionwithoutincreasingcomputationtime.
©2026TheAuthor(s).
ProceedingspublishedbyEurographics-TheEuropeanAssociationforComputerGraphics.

EgorFokin&ManolisSavva/VisACD:Visibility-BasedGPU-AcceleratedApproximateConvexDecomposition 3of4
Compute pairs with mutual Find the best cutting Dataset Method Concavity↓ Parts↓
visibility line (plane) Cut
VisACD(Ours) 0.043 28.4
CoACD[WLLS22] 0.048 31.6
V-HACD
V-HACD[MLP16] 0.118 57.6
Thuletal.[TLJP18] 0.069 34.4
VisACD(Ours) 0.046 35.1
PartNet-Mobility
CoACD 0.046 35.6
Repeat
VisACD(Ours) 0.047 45.4
Figure3:Weusepairwisepointvisibilitytocomputethevisibility Objaverse
CoACD 0.047 58.3
edges and approximate the concavity of the mesh. We sample k
visibilityedgesandcomputebisectingorthogonalplanesforeach.
ThevalueoftheplaneQp(M,E)isthesumofcutvisibilityedge Table1:Quantitativecomparisons.VisACDoutperformsbaselines,
lengths.Weselecttheplanewithhighestvaluetomakethecut. especiallyonObjaversewheremesheshavemoreirregularorienta-
tionandgeometricstructure.
To compute the visibility edges of a mesh M, we first con-
struct a cage mesh Mc offset by ε = 0.03 from the surface of al.[TLJP18]usesplanesthatintersectconcaveedges.Thereason
M. An edge e is classified as a visibility edge if and only if behindthesechoicesisthatthenumberofplanestheycancheck
(e∩Mc̸=∅) ∧ (e∩M=∅).Inpractice,theseintersectiontests ateachstepisquitelow(60forCoACD),whichmotivatessetting
are efficiently evaluated using ray–mesh queries implemented in strictlimitationsontheplanessampled.Ourefficientvaluefunction
NVIDIA OptiX. This method of computing visibility edges also enablessamplingmanymoreplanes(1000+)ateachstep.Similarly
filtersoutedgesthataretooclosetothemeshanddonotsignif- to our concavity measure and value function, we sample cutting
icantly impact the concavity. By changing ε, one can manipulate
planesbasedonvisibilityedges.Wepickkrandomedgesandas-
howmanysuchedgesarefilteredout. signaplanetoeachofthemsuchthateachplaneisorthogonalto
thecorrespondingedgeandbisectsit.Additionally,theplanesthat
correspondtothelargestflatsurfacesofthemesharemorelikely
3.3. PlaneValue tobecuttingplanes.Forthisreason,weextracttheseplanes,add
GivenameshM,acuttingplanepsplitsitintotwomeshesM and themtothesetofcandidates,anddoubletheirvalue.
1
M .Wewanttofindaplane pthatminimizesC∗({M ,M }).Let
2 1 2
I P (e i )∈{0,1}betheindicatorthatpcutsthevisibilityedgee iand 3.5. GreedyAlgorithm
e′bethenewvisibilityedgescreatedafterthecut.Then:
i
ToarriveatthefinaldecompositionDfromtheinitialmeshM,we
C∗({M 1 ,M 2 })=C∗(M)−∑I P (e i )||e i || 2 +∑||e′ i || 2 (1) followasimplegreedyalgorithm(Figure3).Ateachstep,wepick
i i thepartwiththehighestconcavity(BothC(M)andC∗(M)canbe
Thecombinedlengthofthenewlycreatededges∑e′||e′
i
||
2
iscom- used,butwefindthatusingC(M)producesbetterresults).Wecom-
i
plextocomputeand,forhighvertexdensities,contributeslittleto puteallvisibilityedgesforthatpartandsamplekcandidatecutting
theoverallconcavity.Therefore,wecansimplify: planes. Each sampled plane is evaluated according to the objec-
C∗({M 1 ,M 2 })≈C∗(M)−∑I P (e i )||e i || 2 (2) t i i s v s e el f e u c n t c e t d i . o T n h Q e p m (M es , h E is ) s ( u 3 b ), se a q n u d en th tl e y p p l a a r n t e iti w on it e h d t u h s e in h g ig th h i e s st cu v t a ti l n u g e
i
plane. In cases where the cut yields more than two disconnected
Then:
components,wefurtherseparatethesecomponentsusingtriangle-
(cid:32) (cid:33)
levelconnectivity.Thestoppingcriteriatoterminatethedecompo-
argm p inC∗({M 1 ,M 2 })≈argm p in C∗(M)−∑Ip(e i )∥e i ∥ 2 sitionprocessare:a)thetargetconcavitythresholdisreached;b)
i
theprescribednumberofpartshasbeenobtained;orc)thecurrent
=argmax∑Ip(e
i
)∥e
i
∥
2
.
partcontainsnoremainingvisibilityedges.
p
i
Fromthis,wegetthevaluefunctionQp(M,E)ofaplanep:
4. ResultsandExperiments
Qp(M,E)=∑Ip(e i )∥e i ∥ 2 (3)
Task Definition. We decompose an input 3D mesh into a set of
i
convexhullsusingoneoftheACDalgorithms.Wethenreportthe
Thisvalueisinterpretableasthecombinedlengthofallvisibility
quality of the decomposition through the number of convex hull
edgesthattheplanepcuts.
parts,andconcavitymeasuringdistancefromtheinput.
Setup. We evaluate on V-HACD [MLP16], PartNet-
3.4. CandidatePlanes
Mobility [XQM*20] and Objaverse [DSS*23]. For Objaverse
Choosing plane candidates is a crucial step in ACD algorithms. weusearandomlysampledsubsetof1,000meshes.Wecompare
CoACD [WLLS22] and V-HACD [MLP16] consider only axis- results with CoACD [WLLS22], V-HACD[MLP16] and Thul
alignedcuttingplanesspacedbysmallepsilonvaluesandThulet etal.[TLJP18](resultsreproducedfromCoACDpaperassource
©2026TheAuthor(s).
ProceedingspublishedbyEurographics-TheEuropeanAssociationforComputerGraphics.

4of4 EgorFokin&ManolisSavva/VisACD:Visibility-BasedGPU-AcceleratedApproximateConvexDecomposition
V- HACD CoACD VisACD (Ours) [AMSF08] ATTENE, MARCO, MORTARA, MICHELA, SPAGNUOLO,
MICHELA,andFALCIDIENO,BIANCA.“Hierarchicalconvexapproxi-
mationof3Dshapesforfastregionselection”.CGF.20082.
|     |     |     |     |     |     |     | [And24] | ANDREWS,JAMES.“Navigation-drivenapproximateconvexde- |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------- | ---------------------------------------------------- | --- | --- | --- | --- | --- |
composition”.TOG.2024,1–92.
|     |     |     |     |     |     |     | [Ber99] BERGEN,GINOVANDEN.“AfastandrobustGJKimplementa- |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
|     | 64  | 18  |     |     | 16  |     |                                                         |     |     |     |     |     |     |
tionforcollisiondetectionofconvexobjects”.Journalofgraphicstools
(1999)1.
|     |     |     |     |     |     |     | [Cha81] | CHAZELLE, | BERNARD | M.“Convexdecompositionsofpolyhe- |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------- | --------- | ------- | -------------------------------- | --- | --- | --- |
dra”.ACMsymposiumonTheoryofcomputing.19811.
|     |     |     |     |     |     |     | [DSS*23] | DEITKE, MATT, | SCHWENK, |     | DUSTIN, | SALVADOR, | JORDI, et |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------------- | -------- | --- | ------- | --------- | --------- |
64 17 14 al.“Objaverse:Auniverseofannotated3dobjects”.CVPR.20233.
|     |     |     |     |     |     |     | [GALL13] | GHOSH,MUKULIKA,AMATO,NANCYM.,LU,YANYAN,and |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------------------------------------------ | --- | --- | --- | --- | --- |
LIEN,JYH-MING.“Fastapproximateconvexdecompositionusingrela-
tiveconcavity”.Computer-AidedDesign(2013)2.
|     |     |     |     |     |     |     | [GJK02] | GILBERT,ELMER | G,JOHNSON,DANIEL |     |     | W,andKEERTHI,S |     |
| --- | --- | --- | --- | --- | --- | --- | ------- | ------------- | ---------------- | --- | --- | -------------- | --- |
64 36 22 SATHIYA.“Afastprocedureforcomputingthedistancebetweencom-
plexobjectsinthree-dimensionalspace”.IEEEJournalonRoboticsand
Figure4:QualitativeComparisons.WeseethatVisACDisnotlim-
Automation(2002)1.
| itedbyaxis-aligned | planesandcanproduce |     |     | accurate | decomposi- |     |          |              |        |        |              |     |           |
| ------------------ | ------------------- | --- | --- | -------- | ---------- | --- | -------- | ------------ | ------ | ------ | ------------ | --- | --------- |
|                    |                     |     |     |          |            |     | [GXL*23] | GU, JIAYUAN, | XIANG, | FANBO, | LI, XUANLIN, | et  | al. “Man- |
tionswithfewerparts(indicatedinnumbers). iskill2: A unified benchmark for generalizable manipulation skills”.
arXivpreprintarXiv:2302.04659(2023)2.
|     |     |     |     |     |     |     | [HCL*23] | HUANG, | YI-HUA, | CAO, YAN-PEI, |     | LAI, YU-KUN, | et al. |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------ | ------- | ------------- | --- | ------------ | ------ |
code is not publicly released). We do not evaluate methods “NeRF-texture: Texture synthesis with neural radiance fields”. TOG.
| that produce | decompositions | with | intersecting |     | convex hulls. | We  | 20232. |     |     |     |     |     |     |
| ------------ | -------------- | ---- | ------------ | --- | ------------- | --- | ------ | --- | --- | --- | --- | --- | --- |
evaluate CoACD without the merging step, as merging produces [KFK*14] KAICK, OLIVER VAN, FISH, NOA, KLEIMAN, YANIR, et
|     |     |     |     |     |     |     | al. “Shape | segmentation | by  | approximate | convexity | analysis”. | TOG |
| --- | --- | --- | --- | --- | --- | --- | ---------- | ------------ | --- | ----------- | --------- | ---------- | --- |
intersectingconvexhullsin35%ofcases.Wedonotusemerging
(2014)2.
| in our algorithm | for the | same | reason. | We use | C(M) | for the |     |     |     |     |     |     |     |
| ---------------- | ------- | ---- | ------- | ------ | ---- | ------- | --- | --- | --- | --- | --- | --- | --- |
evaluation. We also preprocess the meshes using SDF remeshing [KS24] KUS¸KONMAZ, ONAT ZEYBEK and SAHILLIOG˘LU, YUSUF. “A
|         |                        |       |     |        |              |     | surface-based | approach | for | 3D approximate | convex | decomposition”. |     |
| ------- | ---------------------- | ----- | --- | ------ | ------------ | --- | ------------- | -------- | --- | -------------- | ------ | --------------- | --- |
| to make | the meshes watertight, | limit | the | number | of vertices, | and |               |          |     |                |        |                 |     |
TurkishJournalofElectricalEngineeringandComputerSciences32.6
| makevertexdensitymoreuniform. |            |             |          |     |            |      | (2024),774–7892. |          |     |        |       |                 |      |
| ----------------------------- | ---------- | ----------- | -------- | --- | ---------- | ---- | ---------------- | -------- | --- | ------ | ----- | --------------- | ---- |
|                               |            |             |          |     |            |      | [LA04] LIEN,     | JYH-MING | and | AMATO, | NANCY | M. “Approximate | con- |
| Discussion.                   | We present | the results | in Table | 1.  | Our method | out- |                  |          |     |        |       |                 |      |
vexdecomposition”.ProceedingsoftheTwentiethAnnualSymposium
performsallbaselinesonalldatasetswhilehavinglowercomputa-
onComputationalGeometry.20041,2.
tiontime(16.97secondsonaverageperPartNet-Mobilitymodelvs
|     |     |     |     |     |     |     | [LHG*24] | LI,XUANLIN,HSU,KYLE,GU,JIAYUAN,etal.“Evaluating |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | -------- | ----------------------------------------------- | --- | --- | --- | --- | --- |
36.31forCoACD).WeattributethesmallerdifferencesonPartNet-
|     |     |     |     |     |     |     | real-world | robot manipulation |     | policies | in simulation”. | arXiv | preprint |
| --- | --- | --- | --- | --- | --- | --- | ---------- | ------------------ | --- | -------- | --------------- | ----- | -------- |
Mobilitytotheprevalenceofhighlyregularobjectssuchastables, arXiv:2405.05941(2024)2.
chairs,andbookcases,thatcanbedecomposedintonearlyperfect [LLL10] LIU, HAIRONG, LIU, WENYU, and LATECKI, LONGIN JAN.
convexcomponentsusingonlyaxis-alignedcuttingplanes.Incon- “Convexshapedecomposition”.2010IEEEComputerSocietyConfer-
trast,theV-HACDandObjaversedatasetscontainmodelswithdi- enceonComputerVisionandPatternRecognition.20102.
verse,non-standardorientationsandmoreorganicshapes,includ- [LXL16] LIU,GUILIN,XI,ZHONGHUA,andLIEN,JYH-MING.“Nearly
inghumansandanimals,forwhichourmethodiswellsuited. convex segmentation of polyhedra through convex ridge separation”.
Computer-AidedDesign(2016)2.
|     |     |     |     |     |     |     | [MG09] | MAMOU,KHALEDandGHORBEL,FAOUZI.“Asimpleandeffi- |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------ | ---------------------------------------------- | --- | --- | --- | --- | --- |
5. ConclusionandFutureWork cientapproachfor3Dmeshapproximateconvexdecomposition”.ICIP.
20092.
| We presented | an approximate   | convex       | decomposition |     | method   | that     |         |                                              |     |     |     |     |     |
| ------------ | ---------------- | ------------ | ------------- | --- | -------- | -------- | ------- | -------------------------------------------- | --- | --- | --- | --- | --- |
|              |                  |              |               |     |          |          | [MLP16] | MAMOU,KHALED,LENGYEL,E,andPETERS,A.“Volumet- |     |     |     |     |     |
| combines     | point visibility | with cutting | planes.       | It  | achieves | a favor- |         |                                              |     |     |     |     |     |
richierarchicalapproximateconvexdecomposition”.Gameenginegems
abletrade-offbetweenconcavityandpartcount,whilebeingsig-
(2016)2,3.
nificantlyfasterthanpriorwork.Atthesametime,therearelimita-
|     |     |     |     |     |     |     | [RYLL11] | REN, ZHOU, | YUAN, | JUNSONG, | LI, CHUNYUAN, |     | and LIU, |
| --- | --- | --- | --- | --- | --- | --- | -------- | ---------- | ----- | -------- | ------------- | --- | -------- |
tionstoaddress.Thecurrentpipelinereliesonagreedyalgorithm WENYU.“Minimumnear-convexdecompositionforrobustshaperep-
thatcanproducesub-optimalsolutions.Ouralgorithmisalsosensi- resentation”.ICCV.20112.
tivetothetopologyoftheoriginalmesh,andrequiresremeshingfor Handbook of discrete and
|     |     |     |     |     |     |     | [Sno17] SNOEYINK, |     | JACK. “Point | location”. |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ----------------- | --- | ------------ | ---------- | --- | --- | --- |
optimalperformance.Futureworkmayattempttocomeupwithan computationalgeometry.20171.
algorithmthatconsidersthebestpossibledecompositionnotonly
|     |     |     |     |     |     |     | [TLJP18] | THUL, DANIEL, | LADICKY, | LUBOR, | JEONG, | SOHYEON, | and |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------------- | -------- | ------ | ------ | -------- | --- |
onthecurrentstep,butalsointhefuture(e.g.throughMonte-Carlo POLLEFEYS,MARC.“Approximateconvexdecompositionandtransfer
foranimatedmeshes.”TOG(2018)2,3.
TreeSearch),whilestillutilizingtheefficienciesofourapproach.
|     |     |     |     |     |     |     | [WLLS22] | WEI,XINYUE,LIU,MINGHUA,LING,ZHAN,andSU,HAO. |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | -------- | ------------------------------------------- | --- | --- | --- | --- | --- |
“Approximateconvexdecompositionfor3dmesheswithcollision-aware
| References |     |     |     |     |     |     | concavityandtreesearch”.TOG(2022)2,3. |     |     |     |     |     |     |
| ---------- | --- | --- | --- | --- | --- | --- | ------------------------------------- | --- | --- | --- | --- | --- | --- |
[AGC13] ASAFI, SHMUEL, GOREN, AVI, and COHEN-OR, DANIEL. [XQM*20] XIANG,FANBO,QIN,YUZHE,MO,KAICHUN,etal.“Sapien:
“Weakconvexdecompositionbylines-of-sight”.CGF.20132. Asimulatedpart-basedinteractiveenvironment”.CVPR.20203.
©2026TheAuthor(s).
ProceedingspublishedbyEurographics-TheEuropeanAssociationforComputerGraphics.
