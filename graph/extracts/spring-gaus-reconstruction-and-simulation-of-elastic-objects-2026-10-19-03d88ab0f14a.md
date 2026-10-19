Reconstruction and Simulation of Elastic Objects
with Spring-Mass 3D Gaussians
Licheng Zhong1∗, Hong-Xing Yu1, Jiajun Wu1, and Yunzhu Li1,2,3
1 Stanford University, Stanford, USA
2 Columbia University, New York, USA
3 University of Illinois Urbana-Champaign, Champaign, USA
Abstract. Reconstructingandsimulatingelasticobjectsfromvisualob-
servations is crucial for applications in computer vision and robotics.
Existing methods, such as 3D Gaussians, model 3D appearance and ge-
ometry, but lack the ability to estimate physical properties for objects
and simulate them. The core challenge lies in integrating an expressive
yet efficient physical dynamics model. We propose Spring-Gaus, a 3D
physical object representation for reconstructing and simulating elastic
objects from videos of the object from multiple viewpoints. In particu-
lar,wedevelopandintegratea3DSpring-Massmodelinto3DGaussian
kernels,enablingthereconstructionofthevisualappearance,shape,and
physicaldynamicsoftheobject.Ourapproachenablesfutureprediction
and simulation under various initial states and environmental proper-
ties.WeevaluateSpring-Gausonbothsyntheticandreal-worlddatasets,
demonstratingaccuratereconstructionandsimulationofelasticobjects.
Project page: https://zlicheng.com/spring_gaus.
Keywords: System Identification · Spring-Mass Model · 3D Gaussians
1 Introduction
Reconstructing and simulating elastic objects from visual observations poses a
fundamental challenge in computer vision and robotics, with applications span-
ning virtual reality, augmented reality, and robotic manipulation. Accurately
modeling the elasticity of objects is crucial for creating immersive experiences
and enabling embodied agents to understand and interact with the elastic ob-
jects commonly encountered in our daily lives. However, accurately identifying
the dynamics from vision still presents considerable challenges.
Existing methods for dynamic scene reconstruction, such as 3D Gaussians
and their dynamic extensions [14,26,44,49], have made significant progress in
capturingthetemporalchangesoftheappearanceandgeometryofobjects.How-
ever, these methods do not capture the physical properties of the reconstructed
* TheworkwasdonewhileL.ZhongwasavisitingstudentatStanfordUniversity.L.
Zhong is now at Shanghai Jiao Tong University.
4202
luJ
91
]VC.sc[
3v43490.3042:viXra

2 L. Zhong et al.
Observations Spring-Gaus Simulatable Digital Assets
Static Gaussians
Spring-Mass
Fig.1: Spring-Gaus reconstructs the appearance, geometry, and physical dynamic
properties of elastic objects from video observations. Spring-Gaus enables future pre-
dictions and simulations under different initial states and environmental conditions.
objects;thus,theytypicallycannotpredictthefuturedynamicsoftheseobjects.
While a few recent approaches using MPM [11,39] have attempted to integrate
physics-based priors into 3D object representations, such as PAC-NeRF [18].
Their ability to handle real, especially heterogeneous, objects is limited, as they
assumeaknownmaterialmodelandonlyassignsaglobalphysicalparameterto
theentireobjectwhichrestrictsitsadaptabilitytorealobjects.Assigninglearn-
able physical parameters to each particle in an MPM is theoretically possible.
However,inpractice,itincursextremecomputationalcostssinceMPMrequires
tens of thousands of dense points. In addition, PAC-NeRF [18] use a implicit
grid representation, due to the computational demands, the resolution of the
grid is limited, which can lead to a loss of detail in the appearance modeling
when using real or noisy data. Thus, the core challenge in reconstructing and
predicting object dynamics lies in developing and integrating an expressive and
efficient physical model for the dynamics. The physical dynamics model should
be expressive enough to capture the motions of elastic objects, including col-
lisions, deformations, and bouncing. It must also be efficient and conducive to
inverse parameter estimation through gradient-based optimization.
In this work, we propose Spring-Gaus, a 3D object representation that in-
tegrates a 3D Spring-Mass model. Our model represents the elastic object dy-
namics properties through a learnable system of mass points and springs. Our
design is expressive in that it assumes a general and widely applicable physical
model class. With a learnable topology and physical parameters, Spring-Gaus
can model complex deformation and motion for heterogeneous elastic objects.
In addition to expressiveness, Spring-Gaus is also highly efficient for the inverse
optimization of physical parameters due to its differentiable nature.
Spring-Gausenablesreconstructingandsimulatingelasticobjectsfromsparse
multi-view videos (Fig. 1). To overcome the intrinsic difficulty in optimization,

Spring-Gaus 3
we propose a reconstruction pipeline that decouples physical parameter recon-
struction from appearance and geometry reconstruction. Spring-Gaus requires
only a few multi-view videos for physical parameter identification and is robust
to the quality of geometry reconstruction.
WeevaluatetheeffectivenessofSpring-Gausonbothsyntheticandreal-world
datasets, demonstrating its ability to accurately reconstruct and simulate elas-
tic objects. Our Spring-Gaus allows accurate future prediction and simulations
undervaryinginitialstatesandenvironmentalparameters,showcasingitspoten-
tial for applications in predictive visual perception and immersive experiences.
In summary, the main contributions of this work are threefold:
– We propose Spring-Gaus, which incorporates an expressive yet efficient 3D
Spring-Mass model for reconstructing and simulating elastic objects.
– We introduce a pipeline to reconstruct Spring-Gaus from multi-view videos
oftheobject.Wedecoupletheappearanceandgeometryreconstructionfrom
the physical dynamics reconstruction for more effective optimization.
– WedemonstratetheeffectivenessofSpring-Gausonbothsyntheticandreal-
worlddatasets,showcasingaccuratereconstructionandsimulationofelastic
objects.Thisincludescapabilitiesforfuturepredictionandsimulationunder
varying initial configurations.
2 Related Work
3D Object Representations: Traditionally,3Dobjectsareoftenrepresented
by point clouds, meshes, and voxels. Recently, neural 3D object representation
has become popular due to the efficiency and flexibility. For example, Scene
Representation Networks (SRNs) [38] and DeepSDF [29] represent significant
advancements in 3D scene and object representation, treating 3D objects as
continuous functions that map world coordinates to a feature representation
of local object properties. Over the past few years, NeRF [28] and its succes-
sors [1,2,25,47,50] have demonstrated the efficacy of neural networks in cap-
turing continuous 3D scenes and objects through implicit representation. Di-
rectVoxGO [40] accelerates NeRF’s approach by substituting the MLP with a
voxel grid. Furthermore, 3D Gaussian Splatting [14] has emerged as a method
for real-time differentiable rendering, representing scenes and objects with 3D
Gaussians. Extending this approach, DreamGaussian [41] applies 3D Gaussians
for3Dobjectgeneration.Unliketheseapproaches,ourmethodfocusesonrecon-
structing simulatable 3D objects. Recently, PhysGaussian [46] integrated phys-
ical simulation into 3D Gaussians using a customized Material Point Method,
allowing forward simulation of reconstructed objects. In contrast to PhysGaus-
sian, our work focuses on system identification from raw videos and supports
both the forward simulation and the inverse reconstruction of physical objects.
Dynamic Scene Reconstruction: The modeling of dynamic scenes has seen
significant progress with the adoption of NeRF [8,10,18,20,22,23,30–32,42,43]
and 3D Gaussian [12,16,24,26,44,48,49,51] representations. D-NeRF [32] intro-
ducesanextensiontoNeRF,capableofmodelingdynamicscenesfrommonocu-

4 L. Zhong et al.
lar views by optimizing an underlying deformable volumetric function. Further-
more, Dynamic 3D Gaussians [26] focus on optimizing the motion of Gaussian
kernelsforeachframe,presentinganefficientmethodtocapturescenedynamics.
Deformable 3D Gaussians [49] propose a novel approach by learning Gaussian
distributions in a canonical space, complemented with a deformation field for
modelingmonoculardynamicscenes.Meanwhile,4DGaussianSplatting[44]in-
troduces a hybrid model combining 3D Gaussians with 4D neural voxels. PAC-
NeRF[18]delvesintotheintegrationofLagrangianparticlesimulationwithEu-
lerian scene representation, exploring a new aspect of scene dynamics. Among
them,PAC-NeRF[18]isthemostrelevanttoourwork.PAC-NeRFlearnsphys-
ical parameters used in the Material Point Method (MPM) for better dynamic
reconstruction and prediction. However, PAC-NeRF assumes known material
models that restrict its adaptability and applicability to complex real objects.
Incontrast,ourworkintegratesa3DSpring-Massmodelthatisbothexpressive
and efficient, allowing reconstructing and simulating real elastic objects.
Physics-Informed Learning: Physics-Informed Learning has emerged as a
prominent research direction since the introduction of Physics-Informed Neural
Networks (PINNs) [33]. Li et al. [21] and Sanchez-Gonzalez et al. [34] intro-
duced Graph Network-based simulators within a machine learning framework.
INSR-PDE[3]tacklestime-dependentpartialdifferentialequations(PDEs)using
implicit neural spatial representations. NCLaw [27] focuses on learning neural
constitutive laws for PDE dynamics. DiffPD [9] presents a differentiable soft-
body simulator. Li et al. [19] have made strides in learning preconditioners for
conjugategradientPDEsolvers.Chuet al.[4]andYuet al.[52]modeledsmoke
in neural density and velocity fields. Neural Flow Maps [7] integrate fluid sim-
ulation with neural implicit representations. Deng et al. [6] introduced a novel
differentiable vortex particle method for fluid dynamics inference. DANO [17] is
the most relevant work to ours. In particular, DANO develops a differentiable
simulation for rigid objects represented by NeRFs, allowing reconstruction and
simulation from a few videos. In contrast, our work focuses on elastic objects,
which involve a fundamentally new set of challenges and require a redesign of
the physical models.
3 Approach
WeproposeSpring-Gausthatintegratesa3DSpring-Massmodelwith3DGaus-
sians for elastic object reconstruction and simulation. Specifically, we are given
a set of O calibrated videos from multiple viewpoints of an elastic object in
motion, denoted as {Io,f}O,F , where F is the number of video frames and
o=1,f=1
Io,f denotes a 2D image at video o and frame f. Our goal is to reconstruct the
appearance, geometry, and physical dynamics parameters of Spring-Gaus.
Inthefollowing,wefirstintroducetherepresentationforthestaticproperties,
i.e., appearance and geometry, and then the dynamics properties, i.e., the 3D
Spring-Mass model. Then we describe our reconstruction pipeline. We show an
overview of our reconstruction pipeline in Fig. 2.

|     |            |     |              |     |                |     |     | Spring-Gaus |     | 5   |
| --- | ---------- | --- | ------------ | --- | -------------- | --- | --- | ----------- | --- | --- |
| 3.1 | Appearance |     | and Geometry |     | Representation |     |     |             |     |     |
Following 3D Gaussians Splatting [14], we use a set of 3D Gaussian kernels to
representtheappearanceandshapeofanobject.Thesekernelsaredescribedby
a full 3D covariance matrix Σ, defined in world space and centered at point µ:
|     |     |     |     | G(τ)=e− | 1(τ)TΣ−1(τ), |     |     |     |     | (1) |
| --- | --- | --- | --- | ------- | ------------ | --- | --- | --- | --- | --- |
2
where µ is the mean of the Gaussian distribution, and τ is the independent
variableoftheGaussiandistribution.Inourformulation,weassumeallGaussian
kernelsareisotropic,thecovariancematrixΣcanbecontrolledbyascalars∈R.
| The | splatting | process, |     | designed | to render | Gaussian | kernels | into | a 2D | image, |
| --- | --------- | -------- | --- | -------- | --------- | -------- | ------- | ---- | ---- | ------ |
involves two main steps: (1) projecting the Gaussian kernels into camera space,
and(2)renderingtheprojectedkernelsintoimagespace.Theprojectionprocess
| is defined | as: |     |     |     |           |     |     |     |     |     |
| ---------- | --- | --- | --- | --- | --------- | --- | --- | --- | --- | --- |
|            |     |     |     | Σ′  | =JWΣWTJT, |     |     |     |     | (2) |
Σ′
where represents the covariance matrix in camera coordinates, W is the
transformation matrix, and J denotes the Jacobian of the affine approximation
| of the | projective | transformation. |     |     | The color | C of each | pixel | is rendered | as: |     |
| ------ | ---------- | --------------- | --- | --- | --------- | --------- | ----- | ----------- | --- | --- |
(cid:88)
|     |     |     |     | C   | =   | T α c , |     |     |     | (3) |
| --- | --- | --- | --- | --- | --- | ------- | --- | --- | --- | --- |
i i i
i∈N
where N is the total number of kernels and T represents the transmittance,
i
defined as Πi−1α . The term α denotes the alpha value for each Gaussian,
|     |     | j=1 j |     | i   |     |     |     |     |     |     |
| --- | --- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
which is calculated using the expression 1 − e−σiδi, where σ is the opacity
i
factor. Additionally, c refers to the color of the Gaussian along the ray within
i
| the interval |               | δ i .   |               |        |            |                |         |        |      |         |
| ------------ | ------------- | ------- | ------------- | ------ | ---------- | -------------- | ------- | ------ | ---- | ------- |
| For          | each          | kernel, | the learnable |        | parameters | include        | a point | center | µ, a | scaling |
| scalar       | s, a color    | vector  | c,            | and an | opacity    | value σ.       |         |        |      |         |
| 3.2          | Physics-Based |         | Dynamics      |        | with       | 3D Spring-Mass |         | Model  |      |         |
Weaimtodevelopandintegrateanexpressive yetefficient physics-baseddynam-
icsmodel.Withthesetwodesigngoalsinmind,weintroducethe3DSpring-Mass
model which represents the elastic object dynamics by a learnable spring-mass
system.OurSpring-Gausdoesnotassumeanymaterialtype,anditisexpressive
tomodelrealheterogeneouselasticobjects.Besidesbeingexpressive,ourdynam-
ics model should also be efficient and amenable to gradient-based optimization
| for parameter |      | estimation. |            |     |          |                 |     |     |           |        |
| ------------- | ---- | ----------- | ---------- | --- | -------- | --------------- | --- | --- | --------- | ------ |
| Recall        | that | the         | appearance | and | geometry | representations |     |     | include a | set of |
Gaussian kernels {G }N , parameterized by point centers X ={µ }N , scaling
|     |     |     | i i=1 |     |     |     |     |     | i i=1 |     |
| --- | --- | --- | ----- | --- | --- | --- | --- | --- | ----- | --- |
scalars {s }N , color vectors {c }N , and opacity values {σ }N . To manage
|     | i   | i=1 |     | i   | i=1 |     |     | i   | i=1 |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
complexity for efficient simulation, we introduce volume sampling to generate a
setofanchorpointsA={x }NA (eachxrepresentsaspatialpoint),definedby:
i i=1
|     |     |     |     | A={x | }NA | =V(X), |     |     |     | (4) |
| --- | --- | --- | --- | ---- | --- | ------ | --- | --- | --- | --- |
i i=1

6 L. Zhong et al.
Forward Gradient Output
a) Static Reconstruction b) Refine Gaussians
Volume
Sampling Interp.
Images Static Gaussians Anchor Points Static Gaussians
c) Dynamic Reconstruction
Spring-Gaus
Render Interp.
Simulatable
Videos Dynamic Gaussians Spring-Mass 3D Objects
Fig.2: Overview of Spring-Gaus reconstruction pipeline: (a) Static Scene
Reconstruction:Westartbyreconstructingstatic3DGaussiansfromthefirstframes
of the multiview videos. (b) Refining 3D Gaussians: We extract a set of anchor
points to allow efficient simulation, which leads to appearance drift. We refine the
3D Gaussians to better model the appearance during simulation. (c) Dynamic Re-
construction: Our 3D Spring-Mass model simulates anchor points and updates the
positions of Gaussian kernels. Upon completion of optimization, we obtain a simulat-
able 3D object that accurately models its dynamics.
whereN denotesthenumberofanchors,andV denotesthesamplingfunction.
A
Our3DSpring-Massphysicalmodelcansimulatethemotionofanchorpoints
A, assuming each anchor has a mass m and an initial velocity v . Each anchor
i i
x connects to its n nearest neighbors N ={x }nk through springs L:
i k i i,j j=1
L={l }NA,nk =knn(A,A,n ), (5)
i,j i=1,j=1 k
where l denotes the spring’s length between x and x , and knn denotes the
i,j i i,j
k-nearest neighbors function. Each spring is characterized by a stiffness k and
i,j
a damping factor ζ .
i,j
Toupdatethepositionsofthekernels,wefirstmeasurethedistancebetween
each kernel center and its n nearest anchors at the dynamic simulation’s onset:
b
{d }N,nb =knn(X,A,n ). (6)
i,j i=1,j=1 b
For each timestep t, the forces Ft acting on each anchor point xt are calculated
i i
as follows:
Ft =F t+F t+m g, (7)
i ki ζi i

|     |     |     |     |     |     |     |     | Spring-Gaus |     | 7   |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | --- | --- |
t, t,
where F ki F ζi and g represent the spring force, the damping force, and gravi-
| tational            | acceleration, | respectively.   |                  |      |                        |                |                       |                |              |       |
| ------------------- | ------------- | --------------- | ---------------- | ---- | ---------------------- | -------------- | --------------------- | -------------- | ------------ | ----- |
| Then,foreachspringL |               |                 | ,thespringforceF |      |                        | t              | anddampingforceF      |                |              | t are |
|                     |               |                 | i,j              |      |                        | ki,j           |                       |                |              | ζi,j  |
| determined          | by:           |                 |                  |      |                        |                |                       |                |              |       |
|                     |               | (cid:0)(cid:13) | (cid:13)         |      | x t                    | − x t          | (cid:12) (cid:13)     | (cid:13)       | (cid:12) pk  |       |
| F t =−η             | ·k            | (cid:13)xt      | −xt (cid:13)−l   |      | (cid:1) i              | i,j            | · (cid:12) (cid:13)xt | −xt (cid:13)−l | (cid:12)     | , (8) |
| k i,j               | j             | i,j             | i i,j            | i,j  | (cid:13)               | (cid:13)       | (cid:12) i            | i,j            | i,j (cid:12) |       |
|                     |               |                 |                  |      | (cid:13)x t            | − x t (cid:13) |                       |                |              |       |
|                     |               |                 |                  |      | i                      | i,j            |                       |                |              |       |
|                     |               | (cid:32)        |                  |      |                        | (cid:33)       |                       |                |              |       |
|                     |               |                 |                  |      | xt−xt                  |                | xt−xt                 |                |              |       |
|                     |               |                 | (cid:0)          |      | (cid:1) i              | i ,j           |                       | i i ,j         |              |       |
|                     | F             | t =             | −ζ v t−v         | t    |                        |                | ·                     | ,              |              | (9)   |
|                     | ζ             | i,j             | i,j i            | i ,j | (cid:13) (cid:13)xt −x | t (cid:13)     | (cid:13) (cid:13)x    | t−x t (cid:13) |              |       |
|                     |               |                 |                  |      | i                      | i,j (cid:13)   |                       | i i,j (cid:13) |              |       |
whereη isasoftvectorwhichwillbediscussedlaterandp isahyperparameter
k
thatdeterminesthenonlinearityofthespringforce.Whenp issetto0,Eq.(8)
k
becomes Hooke’s law, and for positive values of p k , the spring force becomes a
nonlinear function of the spring’s length. The cumulative forces acting on each
| anchor point | xt  | are expressed | as: |     |     |     |     |     |     |     |
| ------------ | --- | ------------- | --- | --- | --- | --- | --- | --- | --- | --- |
i
|     |     |     | nk       |      | nk       |        |     |     |     |      |
| --- | --- | --- | -------- | ---- | -------- | ------ | --- | --- | --- | ---- |
|     |     |     | (cid:88) |      | (cid:88) |        |     |     |     |      |
|     |     |     | Ft =     | F t  | +        | F t +m | g.  |     |     | (10) |
|     |     |     | i        | ki,j |          | ζi,j   | i   |     |     |      |
|     |     |     | j=1      |      | j=1      |        |     |     |     |      |
AnchorpointsA’spositionsandvelocitiesareupdatedusingsemi-implicitEuler
integration:
Ft
|     |     |     | vˆt+1 | =vt+ |     | i ∆t, |     |     |     | (11) |
| --- | --- | --- | ----- | ---- | --- | ----- | --- | --- | --- | ---- |
|     |     |     |       | i    | i   |       |     |     |     |      |
m
i
xˆt+1 =xt+vt+1∆t,
(12)
|     |     |     |     | i   | i   | i   |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
and a boundary condition B is applied to the anchor points A to model the
| interactions | with | the environment: |           |                  |     |     |     |     |     |     |
| ------------ | ---- | ---------------- | --------- | ---------------- | --- | --- | --- | --- | --- | --- |
|              |      |                  | xt+1,vt+1 | =B(xˆt+1,vˆt+1). |     |     |     |     |     |     |
(13)
|     |     |     | i   | i   | i   | i   |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
The position of each Gaussian kernel µ is updated through Inverse Distance
i
| Weighting | (IDW) | interpolation |     | to reflect | the        | dynamic | changes | accurately: |     |     |
| --------- | ----- | ------------- | --- | ---------- | ---------- | ------- | ------- | ----------- | --- | --- |
|           |       |               |     | (cid:80)nb | xt+1·(1/(d |         | )pb)    |             |     |     |
i,j
|     |     |     | µt+1 = | j=1        | i,j   |      | ,   |     |     | (14) |
| --- | --- | --- | ------ | ---------- | ----- | ---- | --- | --- | --- | ---- |
|     |     |     | i      | (cid:80)nb |       | )pb) |     |     |     |      |
|     |     |     |        |            | (1/(d | i,j  |     |     |     |      |
j=1
where p is a positive real number that determines the diminishing influence of
b
anchor points with distance. To render the image Iˆ at a specific camera and
frame, we use the updated positions of the Gaussian kernels following the ren-
| dering equation |     | Eq. (3). |     |     |     |     |     |     |     |     |
| --------------- | --- | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
Soft Vector for Springs Connection: In our formulation above, the n is
k
a hyperparameter which is the number of connected springs for each anchor.
However, the choice of n will directly affect the simulation results markedly.
k
The bigger value of n k , the object will behave more rigidly, and a smaller value
of n leads to a noticeably softer behavior of the point cloud. To address the
k

| 8 L. | Zhong | et al. |     |     |     |     |     |     |     |
| ---- | ----- | ------ | --- | --- | --- | --- | --- | --- | --- |
significant impact that the value of n k has on the simulation, we introduce
a mitigation strategy by applying a soft vector η = [η ,η ,...,η ]. This vector
|     |     |     |     |     |     | 0   | 1   | nk  |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
controlledbyalearnableparameterκ(sharedbyallanchors)isusedtomodulate
the number of connected springs, thereby adjusting the system’s response to a
different object. Given an empirical value n , the soft vector η is calculated as:
c
(cid:40)
|     |     | 1   |     |     |     |     | j ≤n , |     |     |
| --- | --- | --- | --- | --- | --- | --- | ------ | --- | --- |
c
|     | η = |     |     |     |     |     |     |     | (15) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- |
j clamp(2−exp(softplus(κ))j−nc,0,1)
|     |     |     |     |     |     |     | n c <j | ≤n k . |     |
| --- | --- | --- | --- | --- | --- | --- | ------ | ------ | --- |
3.3 Optimization
Toallowefficientoptimization,wesimplifyourmodelbyreducingthenumberof
learnable parameters without changing the essential expressiveness. In our sim-
plified approach, we standardize the mass of every anchor to a constant value
m , and control all damping factors using a singular parameter ζ . These two
| 0   |     |     |     |     |     |     |     | 0   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
parametersarefixed,eliminatingtheirvariabilityfromtheoptimizationprocess.
Furthermore, we introduce a unified parameter k for each anchor x to control
|     |     |     |     |     | i   |     |     | i   |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
the spring stiffness of the springs connected to it, simplifying the model with-
out compromising its functional integrity. The spring stiffness k and damping
i,j
| factor ζ | are thus | given | as follows: |     |     |     |     |     |     |
| -------- | -------- | ----- | ----------- | --- | --- | --- | --- | --- | --- |
i,j
|            |     |          |           | k =k | /l ,       |        |        |        | (16)    |
| ---------- | --- | -------- | --------- | ---- | ---------- | ------ | ------ | ------ | ------- |
|            |     |          |           | i,j  | i i,j      |        |        |        |         |
|            |     |          |           | ζ =ζ | /l .       |        |        |        | (17)    |
|            |     |          |           | i,j  | 0 i,j      |        |        |        |         |
| Note that, | in  | Eq. (17) | stiffness | is   | defined at | anchor | points | rather | than on |
springs themselves to simplify the optimization—we only need to optimize N
A
stiffness coefficients instead of all the springs, which is on the order of n ·N .
|     |     |     |     |     |     |     |     |     | k A |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Bythissimplification,ourmodelmaintainscomputationalefficiencyandeaseof
| optimization, | while | still         | capturing | the        | essential dynamics |       | of the       | object. |     |
| ------------- | ----- | ------------- | --------- | ---------- | ------------------ | ----- | ------------ | ------- | --- |
| Summarized,   |       | the learnable |           | parameters | in our             | model | now include: |         |     |
– v :theinitialvelocityvector,providingabaselinemovementpatternforthe
0
simulation;
– {k }NA: the individual stiffness parameters for each anchor, allowing for
i i=1
| localized | adjustments |     | to  | spring stiffness; |     |     |     |     |     |
| --------- | ----------- | --- | --- | ----------------- | --- | --- | --- | --- | --- |
– κ: a parameter governing the modulation of the soft vector, facilitating fine-
| tuned | control | over | the spring | dynamics; |     |     |     |     |     |
| ----- | ------- | ---- | ---------- | --------- | --- | --- | --- | --- | --- |
– Θ(B(·)): parameters defining the boundary conditions (Θ is learnable pa-
| rameters),  | such     | as                                                    | the friction | coefficient, | which | influence |     | the simulation’s |     |
| ----------- | -------- | ----------------------------------------------------- | ------------ | ------------ | ----- | --------- | --- | ---------------- | --- |
| physical    | realism. |                                                       |              |              |       |           |     |                  |     |
| Thereexistn |          | timestepsbetweeneachofthetwokeyframes.Ateachtimestep, |              |              |       |           |     |                  |     |
t
xt is computed from xt−1 using the update rule Eqs. (11) and (12). We only
optimize physical parameters at each keyframe (when t = 0,n ,2n ,3n ,...)
|     |     |     |     |     |     |     |     | t t | t   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
based on the visual observations until that time. We increase the value of n
t
as the parameters converge. This approach balances identification accuracy and
| computational | demand. |     |     |     |     |     |     |     |     |
| ------------- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |

|      |         |          |           |     |          |        | Spring-Gaus       | 9    |
| ---- | ------- | -------- | --------- | --- | -------- | ------ | ----------------- | ---- |
| Same | with 3D | Gaussian | Splatting |     | [14], we | define | our loss function | as a |
weighted combination of the L norm and the Structural Similarity Index Mea-
1
sure (D-SSIM) L , applied between the input images I and the rendered
d-ssim
Iˆ.
| images | This is | formally | expressed | as:       |             |          |     |      |
| ------ | ------- | -------- | --------- | --------- | ----------- | -------- | --- | ---- |
|        |         | L=(1−λ   |           | d-ssim )L | 1 +λ d-ssim | L d-ssim | ,   | (18) |
where λ is a weighting coefficient that balances the contribution of the L
| d-ssim |     |     |     |     |     |     |     | 1   |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- |
norm and the D-SSIM term to the overall loss. We decouple our optimization
| into a few | stages, | as illustrated | in  | Fig. | 2.  |     |     |     |
| ---------- | ------- | -------------- | --- | ---- | --- | --- | --- | --- |
Static Reconstruction: Our optimization starts by taking the first frames
of the multi-view videos and using them to reconstruct the appearance and
| geometry | of the object. |     |     |     |     |     |     |     |
| -------- | -------------- | --- | --- | --- | --- | --- | --- | --- |
3D Gaussians Refinement: Duringdynamicsimulationoftheanchorpoints,
the3DGaussiancentersX ={µ0}N arecomputedbyIDWinterpolationout-
|     |     |     | 0   | i i=1 |     |     |     |     |
| --- | --- | --- | --- | ----- | --- | --- | --- | --- |
lined in Eq. (14). This leads to a slight appearance drift from the static recon-
struction. Therefore, we refine the parameters of the Gaussian kernels—scaling
scalar s, color vector c, and opacity value σ, excluding points center µ—also at
the first frame, before the dynamic simulation. Since the Gaussian kernels’ po-
sition from IDW interpolation is slightly different from the static reconstruction
results, this refinement process enables the Gaussian kernels with the interpo-
| lated spatial | position | to render | the | correct | object | appearance. |     |     |
| ------------- | -------- | --------- | --- | ------- | ------ | ----------- | --- | --- |
Dynamic Reconstruction: Sinceourefficientdynamicssimulationisfullydif-
ferentiablewithrespecttothelearnableparameters,wecanoptimizethephysical
parameters through differentiable simulation and differentiable rendering with
| our loss function |     | L.  |     |     |     |     |     |     |
| ----------------- | --- | --- | --- | --- | --- | --- | --- | --- |
4 Experiment
4.1 Datasets
Synthetic Data. We evaluate Spring-Gaus using a synthetic dataset. We first
collectedfourteen3Dmodels,includingpointcloudsandmeshes,touseasinitial
pointcloudsforoursimulations.SomeofthemaresourcedfromPAC-NeRF[18]
and OmniObject3D [45]. Following PAC-NeRF, we employ the Material Point
Method[11,39]tosimulatethedynamicsofelasticobjectstogeneratesynthetic
data. Our dataset features elastic objects with various stiffness levels and di-
verse geometric forms. Multi-view RGB videos are rendered using Blender [5],
with each sequence comprising 10 viewpoints and 30 frames at a resolution of
512×512.Theinitial20framesareutilizedfordynamicreconstruction,whilethe
subsequent10framesarededicatedtoevaluatingfuturepredictionperformance.
Real-World Data. Inadditiontosyntheticdatasets,wefurtherassessSpring-
Gaus using captured real-world examples. Our collection process distinguishes
between static scenes and dynamic multi-view videos. For static scenes, we
position each object on a table and capture 50-70 images from various view-
points within the upper hemisphere surrounding the object. To obtain camera

| 10 L. | Zhong et | al. |     |     |     |     |     |     |
| ----- | -------- | --- | --- | --- | --- | --- | --- | --- |
registration
| Fig.3: | Registration | from | static scene | to  | dynamic scene | for real-world | sample. |     |
| ------ | ------------ | ---- | ------------ | --- | ------------- | -------------- | ------- | --- |
posesforstaticscenes,weutilizetheoff-the-shelfStructure-from-Motiontoolkit
COLMAP [35,36]. The dynamic aspect of our dataset is represented through
multi-view RGB videos, recorded from three distinct viewpoints, at a resolution
of 1920×1080. The camera parameters for dynamic scenes are obtained through
| calibration        | using a | checkerboard. | SAM | [15] | is used | to obtain | object masks. |     |
| ------------------ | ------- | ------------- | --- | ---- | ------- | --------- | ------------- | --- |
| 4.2 Implementation |         | Details       |     |      |         |           |               |     |
When learning the 3D Gaussians, the distribution of Gaussian kernels is highly
dependent on the initial points. Gaussian kernels tend to concentrate on the
surface if the initial points are derived from SfM results. However, we initialize
a large number of points inside a cube, resulting in a more uniform distribution
| of the final   | kernels. |          |            |        |             |        |            |     |
| -------------- | -------- | -------- | ---------- | ------ | ----------- | ------ | ---------- | --- |
| For real-world |          | samples, | we collect | static | and dynamic | scenes | separately | be- |
cause three viewpoints are insufficient for effective 3D Gaussian reconstruc-
tion [14]. This results in the Gaussian kernels for static and dynamic scenes
being in different coordinate systems. Therefore, for real samples, we employ a
registrationnetworkbeforedynamicreconstructiontoaligntheGaussiankernels
from static scene coordinates to dynamic scene coordinates, as shown in Fig. 3.
Specifically, we optimize a scale factor s r , a translation vector t r , and a rota-
tionvectorr fortheregistration.Werepresent3Drotationsusingacontinuous
r
6D vector r ∈ R6, which has been shown to be more amenable for gradient-
r
based optimization [53]. However, slight deformations of objects and variations
in lighting conditions and exposure times during data capture are inevitable.
These variations can result in color discrepancies between frames across time
and viewpoints. The color discrepancy is the major noise source that hinders
registration and reconstruction. Thus, we refine our approach by computing the
loss function between mask images, incorporating both mask center loss and
perceptual loss into our model. Consequently, the revised loss function for real
| samples is | expressed | as:   |               |     |               |        |        |      |
| ---------- | --------- | ----- | ------------- | --- | ------------- | ------ | ------ | ---- |
| L=(1−λ     |           | )L +λ | L             | +λ  | L             | +λ     | L ,    | (19) |
|            | d-ssim    | 1     | d-ssim d-ssim |     | center center | percep | percep |      |
where λ d-ssim = 0.8, λ center = 1.0, and λ percep = 0.1 are the weighting coeffi-
cients.Here,L quantifiesthediscrepancybetweenthecentercoordinatesof
center

|             |      |        |           |       |           |       |            | Spring-Gaus | 11    |
| ----------- | ---- | ------ | --------- | ----- | --------- | ----- | ---------- | ----------- | ----- |
|             |      | Torus  | Cross     | Cream | Apple     | Paste | Chess      | Banana      | Mean  |
| Spring-Gaus |      | (ours) |           |       | 2.22      |       |            |             |       |
| ↓DC         |      | 2.38   | 1.57      |       | 1.87      |       | 7.03 2.59  | 18.48       | 5.16  |
| PAC-NeRF    | [18] |        | 2.47 3.87 |       | 2.21 4.69 |       | 37.70 8.20 | 66.43       | 17.94 |
↓DME Spring-Gaus (ours) 0.087 0.051 0.094 0.076 0.126 0.095 0.135 0.095
| PAC-NeRF    | [18] |              | 0.111 |       | 0.108       |       | 0.192 0.155 | 0.234 | 0.134 |
| ----------- | ---- | ------------ | ----- | ----- | ----------- | ----- | ----------- | ----- | ----- |
|             |      | 0.055        |       | 0.083 |             |       |             |       |       |
| Spring-Gaus |      | (ours) 16.83 |       |       |             |       |             |       |       |
| ↑RNSP       |      |              | 16.93 | 15.42 | 21.55       | 14.71 | 16.08       | 17.89 | 17.06 |
| PAC-NeRF    | [18] | 17.46        | 14.15 |       | 15.37 19.94 |       | 12.32 15.08 | 16.04 | 15.77 |
↑MISS Spring-Gaus (ours) 0.919 0.940 0.862 0.902 0.872 0.881 0.904 0.897
| PAC-NeRF | [18] | 0.913 | 0.906 |     | 0.858 0.878 |     | 0.819 0.848 | 0.866 | 0.870 |
| -------- | ---- | ----- | ----- | --- | ----------- | --- | ----------- | ----- | ----- |
Table 1: Quantitative results of future prediction on synthetic data.Spring-
Gaus excels in short-term future prediction. Meanwhile, since we separate appearance
| and dynamics  | modeling, |        | Spring-Gaus | also  | maintains | good  | rendering | quality. |       |
| ------------- | --------- | ------ | ----------- | ----- | --------- | ----- | --------- | -------- | ----- |
|               |           |        | Torus Cross | Cream | Apple     | Paste | Chess     | Banana   | Mean  |
| Spring-Gaus   |           | (ours) |             |       |           |       | 1.80      |          |       |
|               |           |        | 0.17 0.48   |       | 0.36 0.38 | 0.19  |           | 2.60     | 0.85  |
| ↓DC PAC-NeRF  |           | [18]   | 4.92 1.10   |       | 0.77 1.11 | 3.14  | 0.96      | 2.77     | 2.11  |
| Dy-Gaus       | [26]      |        | 579         | 773   | 479 727   | 2849  | 764       | 2963     | 1305  |
| 4D-Gaus       | [44]      |        | 11.12 1.77  |       | 2.87 2.23 | 1.95  | 3.97      | 7.13     | 4.43  |
| Spring-Gaus   |           | (ours) |             |       |           |       | 0.063     |          |       |
|               |           |        | 0.040 0.037 | 0.031 | 0.033     | 0.022 |           | 0.052    | 0.040 |
| ↓DME PAC-NeRF |           | [18]   | 0.056 0.052 | 0.041 | 0.045     | 0.054 |           | 0.062    | 0.052 |
0.052
| Dy-Gaus | [26] |     | 0.857 0.955 | 0.783 | 0.903 | 1.739 | 0.985 | 1.591 | 1.116 |
| ------- | ---- | --- | ----------- | ----- | ----- | ----- | ----- | ----- | ----- |
| 4D-Gaus | [44] |     | 0.130 0.078 | 0.089 | 0.088 | 0.070 | 0.097 | 0.112 | 0.095 |
Table 2: Quantitative results of dynamic reconstruction on synthetic data.
| Spring-Gaus | has | excellent | geometric | accuracy | in  | dynamic | reconstruction. |     |     |
| ----------- | --- | --------- | --------- | -------- | --- | ------- | --------------- | --- | --- |
the rendered and ground truth images, while L represents the perceptual
percep
| loss [13],      | which | is based | on the       | VGG16 | architecture |     | [37]. |     |     |
| --------------- | ----- | -------- | ------------ | ----- | ------------ | --- | ----- | --- | --- |
| 4.3 Qualitative |       | and      | Quantitative |       | Results      |     |       |     |     |
We assess the performance of our approach using both synthetic and real-
world datasets. Firstly, we validate the effectiveness of our method on synthetic
datasets,utilizingthefirst20framesasourobservationsetfortrainingdynamic
modelingcapabilities.Forfutureprediction,weemploythesubsequent10frames,
comparing the ground truth with our model’s predictions of future frames. Ad-
ditionally,webenchmarkourapproachagainstthemostrelevantmethodsindy-
namicscenemodelingandphysics-informedlearning,includingPAC-NeRF[18],
| Dynamic | 3D Gaussians |         | [26], and | 4D        | Gaussian | Splatting | [44].   |                     |     |
| ------- | ------------ | ------- | --------- | --------- | -------- | --------- | ------- | ------------------- | --- |
| The     | qualitative  | results | are       | presented | in Fig.  | 4.        | We also | report quantitative |     |
results by computing the Chamfer Distance (CD) and Earth Mover’s Distance
(EMD). In all tables, the Chamfer Distance is measured based on squared dis-
tance,withunitsexpressedas1×103mm2.Thequantitativeanalysisofdynamic
reconstruction, shown in Tab. 2, reveals that Spring-Gaus can accurately simu-
| late object | dynamics | for | the synthetic |     | data. |     |     |     |     |
| ----------- | -------- | --- | ------------- | --- | ----- | --- | --- | --- | --- |

| 12 L. Zhong | et al. |     |     |     |
| ----------- | ------ | --- | --- | --- |
Time Time
| hturT dnuorG           |                   |     | hturT dnuorG           |                   |
| ---------------------- | ----------------- | --- | ---------------------- | ----------------- |
| sruO                   |                   |     | sruO                   |                   |
| FReN-CAP               |                   |     | FReN-CAP               |                   |
| suaG-yD                |                   |     | suaG-yD                |                   |
|                        | Not Applicable    |     |                        | Not Applicable    |
| suaG-D4                |                   |     | suaG-D4                |                   |
| Dynamic Reconstruction | Future Prediction |     | Dynamic Reconstruction | Future Prediction |
|                        | (a) Torus         |     | (b) Paste              |                   |
Time Time
| hturT dnuorG           |                   |     | hturT dnuorG           |                   |
| ---------------------- | ----------------- | --- | ---------------------- | ----------------- |
| sruO                   |                   |     | sruO                   |                   |
| FReN-CAP               |                   |     | FReN-CAP               |                   |
| suaG-yD                |                   |     | suaG-yD                |                   |
|                        | Not Applicable    |     |                        | Not Applicable    |
| suaG-D4                |                   |     | suaG-D4                |                   |
| Dynamic Reconstruction | Future Prediction |     | Dynamic Reconstruction | Future Prediction |
|                        | (c) Apple         |     | (d) Banana             |                   |
Fig.4: Qualitative results on synthetic data. Compared with PAC-NeRF [18],
Dynamic3DGaussians[26]and4DGaussianSplatting[44],Spring-Gauscanmaintain
| a good geometry | and appearance | while reconstructing | reasonable | dynamics. |
| --------------- | -------------- | -------------------- | ---------- | --------- |

Spring-Gaus 13
goD
regruB
Reference Images Ours
giP
nuB
Reference Images Ours
Fig.5: Qualitative results of future prediction on real-world samples. Pre-
dicted dynamics closely follow real observations.
In Tab. 1, we show our method’s capability in predicting future frames. Our
method outperforms PAC-NeRF across CD, EMD, Peak Signal-to-Noise Ratio
(PSNR), and Structural Similarity Index (SSIM) metrics. We show qualitative
results in Fig. 4. We observe that Spring-Gaus gives faithful reconstruction and
futurepredictionthatcloselyalignswiththegroundtruth,eventhoughthesim-
ulationenginesaredifferent.ThisshowsthatSpring-Gausisnotonlyexpressive
but also allows efficient identification through gradient-based optimization.
We also evaluate Spring-Gaus on real-world samples. It is difficult for both
NeRF [28] and 3D Gaussian Splatting [14] to reconstruct the correct geometric
information under extremely sparse camera views. However, due to 3D Gaus-
sians’ explicit representation that we can directly operate Gaussian kernels, we
could reconstruct the static scenes and dynamic scenes in a different coordinate
system and then align them using a registration network mentioned in Sec. 4.2,
which is hard to do under an implicit representation. We show the registration
processinFig.3.Resultsonreal-worldsamplescanbefoundinFig.5andFig.1.
4.4 Generalization to New Conditions
In addition to future prediction, we also show that our method essentially cre-
ates a digital asset of the object from the multi-view videos, allowing dynamic
simulation under different unseen environmental conditions. In Fig. 6, we edit
the boundary conditions, such as adjusting the positions and the stickiness of
thegroundplane.InFig.7,weeditphysicalconditions,initializationconditions,
and environmental conditions, such as object properties (making them softer or
harder), initial velocities, and environmental gravity. Please check our project
website∗ for videos of the results for a more expressive illustration.
* https://zlicheng.com/spring_gaus

| 14 L. Zhong | et al.     |            |     |             |     |            |     |            |
| ----------- | ---------- | ---------- | --- | ----------- | --- | ---------- | --- | ---------- |
| High ground | Mid ground | Low ground |     | High ground |     | Mid ground |     | Low ground |
| Normal      | Smooth     | Sticky     |     | Normal      |     | Smooth     |     | Sticky     |
Fig.6: We edit boundary conditions in these demos. Changing grounds’ position and
| using smooth | or sticky            | ground.              |         |            |     |              |     |                 |
| ------------ | -------------------- | -------------------- | ------- | ---------- | --- | ------------ | --- | --------------- |
| Original     | Random init velocity | Smaller & Softer     |         | Original   |     | Windy        |     | Bigger & Softer |
| Original     | Zero gravity         | Random init velocity |         | Original   |     | Hypergravity |     | Bigger & Softer |
| Fig.7: We    | edit physical        | conditions,          | initial | velocities | and | gravities    | in  | these demos.    |
5 Conclusion
In this paper, we introduce Spring-Gaus, a novel framework designed to acquire
simulatabledigitalassetsofelasticobjectsfromvideoobservations.Byintegrat-
inga3DSpring-Massmodel,Spring-Gausallowsthereconstructionofobjectap-
pearanceanddynamics.Akeyfeatureofourapproachisthedistinctseparation
between the learning processes for appearance and physics, thereby circumvent-
ing potential issues with optimization interference. We evaluate Spring-Gaus on
both synthetic and real-world datasets, demonstrating its capability to recon-
struct geometry, appearance, and physical dynamic properties. Moreover, our
method demonstrates improved capabilities by predicting short-term future dy-
namics under different environmental conditions. This showcases its strength in
identifying physical properties from observational data and predicting the dy-
| namics of reconstructed |     | digital | assets. |     |     |     |     |     |
| ----------------------- | --- | ------- | ------- | --- | --- | --- | --- | --- |

|     |     |     |     |     |     |     | Spring-Gaus | 15  |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --- |
Acknowledgments. The work is in part supported by the Amazon AICE
Award, NSF RI #2211258, #2338203, ONR YIP N00014-24-1-2117, and ONR
MURI N00014-22-1-2740.
References
1. Barron, J.T., Mildenhall, B., Tancik, M., Hedman, P., Martin-Brualla, R., Srini-
| vasan, P.P.: | Mip-NeRF: |      | A multiscale | representation |     | for anti-aliasing |     | neural radi- |
| ------------ | --------- | ---- | ------------ | -------------- | --- | ----------------- | --- | ------------ |
| ance fields. | In:       | CVPR | (2021)       |                |     |                   |     |              |
2. Chen, A., Xu, Z., Zhao, F., Zhang, X., Xiang, F., Yu, J., Su, H.: Mvsnerf: Fast
generalizableradiancefieldreconstructionfrommulti-viewstereo.In:ICCV(2021)
3. Chen, H., Wu, R., Grinspun, E., Zheng, C., Chen, P.Y.: Implicit neural spatial
| representations |     | for time-dependent |     | pdes. In: | ICML | (2023) |     |     |
| --------------- | --- | ------------------ | --- | --------- | ---- | ------ | --- | --- |
4. Chu,M.,Liu,L.,Zheng,Q.,Franz,E.,Seidel,H.P.,Theobalt,C.,Zayer,R.:Physics
informedneuralfieldsforsmokereconstructionwithsparsedata.ACMTOG41(4)
| (jul 2022). | https://doi.org/10.1145/3528223.3530169 |     |     |     |     |     |     |     |
| ----------- | --------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
5. Community,B.O.:Blender-a3Dmodellingandrenderingpackage.BlenderFoun-
| dation, | Stichting | Blender | Foundation, | Amsterdam |     | (2018), http://www.blender. |     |     |
| ------- | --------- | ------- | ----------- | --------- | --- | --------------------------- | --- | --- |
org
6. Deng, Y., Yu, H.X., Wu, J., Zhu, B.: Learning vortex dynamics for fluid inference
| and prediction. |     | In: ICLR | (2023) |     |     |     |     |     |
| --------------- | --- | -------- | ------ | --- | --- | --- | --- | --- |
7. Deng, Y., Yu, H.X., Zhang, D., Wu, J., Zhu, B.: Fluid simulation on neural flow
| maps. ACM | TOG | 42(6) | (2023) |     |     |     |     |     |
| --------- | --- | ----- | ------ | --- | --- | --- | --- | --- |
8. Driess,D.,Huang,Z.,Li,Y.,Tedrake,R.,Toussaint,M.:Learningmulti-objectdy-
namicswithcompositionalneuralradiancefields.In:ConferenceonRobotLearn-
| ing. pp. | 1755–1768. | PMLR | (2023) |     |     |     |     |     |
| -------- | ---------- | ---- | ------ | --- | --- | --- | --- | --- |
9. Du, T., Wu, K., Ma, P., Wah, S., Spielberg, A., Rus, D., Matusik, W.: Diffpd:
| Differentiable |     | projective | dynamics. | ACM TOG | 41(2) | (nov 2021). |     |     |
| -------------- | --- | ---------- | --------- | ------- | ----- | ----------- | --- | --- |
https://doi.
org/10.1145/3490168
10. Guan, S., Deng, H., Wang, Y., Yang, X.: Neurofluid: Fluid dynamics grounding
| with particle-driven |     | neural | radiance | fields. In: | ICML | (2022) |     |     |
| -------------------- | --- | ------ | -------- | ----------- | ---- | ------ | --- | --- |
11. Hu,Y.,Fang,Y.,Ge,Z.,Qu,Z.,Zhu,Y.,Pradhana,A.,Jiang,C.:Amovingleast
squaresmaterialpointmethodwithdisplacementdiscontinuityandtwo-wayrigid
bodycoupling.ACMTOG37(4)(jul2018).https://doi.org/10.1145/3197517.
3201293
12. Huang, Y.H., Sun, Y.T., Yang, Z., Lyu, X., Cao, Y.P., Qi, X.: Sc-gs: Sparse-
| controlled | gaussian | splatting | for | editable dynamic | scenes. | CVPR | (2024) |     |
| ---------- | -------- | --------- | --- | ---------------- | ------- | ---- | ------ | --- |
13. Johnson,J.,Alahi,A.,Fei-Fei,L.:Perceptuallossesforreal-timestyletransferand
| super-resolution. |     | In: ECCV | (2016) |     |     |     |     |     |
| ----------------- | --- | -------- | ------ | --- | --- | --- | --- | --- |
14. Kerbl, B., Kopanas, G., Leimkühler, T., Drettakis, G.: 3d gaussian splatting for
| real-time | radiance | field | rendering. | ACM TOG | 42(4) | (July 2023) |     |     |
| --------- | -------- | ----- | ---------- | ------- | ----- | ----------- | --- | --- |
15. Kirillov, A., Mintun, E., Ravi, N., Mao, H., Rolland, C., Gustafson, L., Xiao, T.,
Whitehead,S.,Berg,A.C.,Lo,W.Y.,Dollár,P.,Girshick,R.:SegmentAnything.
| arXiv preprint |     | arXiv:2304.02643 |     | (2023) |     |     |     |     |
| -------------- | --- | ---------------- | --- | ------ | --- | --- | --- | --- |
16. Kratimenos, A., Lei, J., Daniilidis, K.: Dynmf: Neural motion factorization for
| real-time        | dynamic | view   | synthesis | with 3d | gaussian | splatting. | arXiv | preprint |
| ---------------- | ------- | ------ | --------- | ------- | -------- | ---------- | ----- | -------- |
| arXiv:2312.00112 |         | (2023) |           |         |          |            |       |          |
17. Le Cleac’h, S., Yu, H.X., Guo, M., Howell, T., Gao, R., Wu, J., Manchester, Z.,
Schwager,M.:Differentiablephysicssimulationofdynamics-augmentedneuralob-
| jects. IEEE | Robotics | and | Automation | Letters | 8(5), | 2780–2787 | (2023) |     |
| ----------- | -------- | --- | ---------- | ------- | ----- | --------- | ------ | --- |

16 L. Zhong et al.
18. Li, X., Qiao, Y.L., Chen, P.Y., Jatavallabhula, K.M., Lin, M., Jiang, C., Gan, C.:
PAC-NeRF: Physics augmented continuum neural radiance fields for geometry-
agnostic system identification. In: ICLR (2023)
19. Li, Y., Chen, P.Y., Du, T., Matusik, W.: Learning preconditioners for conjugate
gradient pde solvers. In: ICML (2023)
20. Li, Y., Li, S., Sitzmann, V., Agrawal, P., Torralba, A.: 3d neural scene represen-
tations for visuomotor control. In: Conference on Robot Learning. pp. 112–123.
PMLR (2022)
21. Li, Y., Wu, J., Tedrake, R., Tenenbaum, J.B., Torralba, A.: Learning particle dy-
namicsformanipulatingrigidbodies,deformableobjects,andfluids.arXivpreprint
arXiv:1810.01566 (2018)
22. Li, Z., Niklaus, S., Snavely, N., Wang, O.: Neural scene flow fields for space-time
view synthesis of dynamic scenes. In: CVPR (2021)
23. Li,Z.,Wang,Q.,Cole,F.,Tucker,R.,Snavely,N.:Dynibar:Neuraldynamicimage-
basedrendering.In:ProceedingsoftheIEEE/CVFConferenceonComputerVision
and Pattern Recognition. pp. 4273–4284 (2023)
24. Lin, Y., Dai, Z., Zhu, S., Yao, Y.: Gaussian-flow: 4d reconstruction with dynamic
3d gaussian particle. arXiv preprint arXiv:2312.03431 (2023)
25. Liu,Y.,Peng,S.,Liu,L.,Wang,Q.,Wang,P.,Christian,T.,Zhou,X.,Wang,W.:
Neural rays for occlusion-aware image-based rendering. In: CVPR (2022)
26. Luiten,J.,Kopanas,G.,Leibe,B.,Ramanan,D.:Dynamic3dgaussians:Tracking
by persistent dynamic view synthesis. In: 3DV (2024)
27. Ma, P., Chen, P.Y., Deng, B., Tenenbaum, J.B., Du, T., Gan, C., Matusik, W.:
Learning neural constitutive laws from motion observations for generalizable pde
dynamics. In: ICML (2023)
28. Mildenhall, B., Srinivasan, P.P., Tancik, M., Barron, J.T., Ramamoorthi, R., Ng,
R.: NeRF: Representing scenes as neural radiance fields for view synthesis. In:
ECCV (2020)
29. Park,J.J.,Florence,P.,Straub,J.,Newcombe,R.,Lovegrove,S.:Deepsdf:Learning
continuous signed distance functions for shape representation. In: CVPR (2019)
30. Park,K.,Sinha,U.,Barron,J.T.,Bouaziz,S.,Goldman,D.B.,Seitz,S.M.,Martin-
Brualla, R.: Nerfies: Deformable neural radiance fields. In: ICCV (2021)
31. Park,K.,Sinha,U.,Hedman,P.,Barron,J.T.,Bouaziz,S.,Goldman,D.B.,Martin-
Brualla,R.,Seitz,S.M.:Hypernerf:Ahigher-dimensionalrepresentationfortopo-
logically varying neural radiance fields. arXiv preprint arXiv:2106.13228 (2021)
32. Pumarola, A., Corona, E., Pons-Moll, G., Moreno-Noguer, F.: D-NeRF: Neural
Radiance Fields for Dynamic Scenes. In: CVPR (2021)
33. Raissi, M., Perdikaris, P., Karniadakis, G.: Physics-informed neural networks: A
deeplearningframeworkforsolvingforwardandinverseproblemsinvolvingnonlin-
ear partial differential equations. Journal of Computational Physics 378, 686–707
(2019). https://doi.org/https://doi.org/10.1016/j.jcp.2018.10.045
34. Sanchez-Gonzalez, A., Godwin, J., Pfaff, T., Ying, R., Leskovec, J., Battaglia,
P.W.:Learningtosimulatecomplexphysicswithgraphnetworks.In:ICML(2020)
35. Schönberger,J.L.,Frahm,J.M.:Structure-from-motionrevisited.In:CVPR(2016)
36. Schönberger, J.L., Zheng, E., Pollefeys, M., Frahm, J.M.: Pixelwise view selection
for unstructured multi-view stereo. In: ECCV (2016)
37. Simonyan, K., Zisserman, A.: Very deep convolutional networks for large-scale
image recognition. arXiv preprint arXiv:1409.1556 (2014)
38. Sitzmann, V., Zollhöfer, M., Wetzstein, G.: Scene representation networks: Con-
tinuous 3d-structure-aware neural scene representations. In: NeurIPS (2019)

|     |     |     |     |     |     |     | Spring-Gaus | 17  |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --- |
39. Stomakhin, A., Schroeder, C., Chai, L., Teran, J., Selle, A.: A material point
| method | for snow | simulation. | ACM | TOG | 32(4) (jul | 2013). | https://doi.org/10. |     |
| ------ | -------- | ----------- | --- | --- | ---------- | ------ | ------------------- | --- |
1145/2461912.2461948
40. Sun,C.,Sun,M.,Chen,H.:Directvoxelgridoptimization:Super-fastconvergence
| for radiance | fields | reconstruction. |     | In: CVPR | (2022) |     |     |     |
| ------------ | ------ | --------------- | --- | -------- | ------ | --- | --- | --- |
41. Tang,J.,Ren,J.,Zhou,H.,Liu,Z.,Zeng,G.:Dreamgaussian:Generativegaussian
| splatting | for efficient | 3d  | content | creation. | ICLR (2024) |     |     |     |
| --------- | ------------- | --- | ------- | --------- | ----------- | --- | --- | --- |
42. Tretschk, E., Tewari, A., Golyanik, V., Zollhöfer, M., Lassner, C., Theobalt, C.:
| Non-rigid   | neural | radiance  | fields: | Reconstruction | and    | novel view | synthesis | of a dy- |
| ----------- | ------ | --------- | ------- | -------------- | ------ | ---------- | --------- | -------- |
| namic scene | from   | monocular | video.  | In: ICCV       | (2021) |            |           |          |
43. Wang,C.,MacDonald,L.E.,Jeni,L.A.,Lucey,S.:Flowsupervisionfordeformable
| nerf. In:         | Proceedings | of              | the IEEE/CVF | Conference |     | on Computer | Vision | and Pat- |
| ----------------- | ----------- | --------------- | ------------ | ---------- | --- | ----------- | ------ | -------- |
| tern Recognition. |             | pp. 21128–21137 |              | (2023)     |     |             |        |          |
44. Wu,G.,Yi,T.,Fang,J.,Xie,L.,Zhang,X.,Wei,W.,Liu,W.,Tian,Q.,Xinggang,
W.:4dgaussiansplattingforreal-timedynamicscenerendering.In:CVPR(2024)
45. Wu, T., Zhang, J., Fu, X., Wang, Y., Ren, J., Pan, L., Wu, W., Yang, L., Wang,
J.,Qian,C.,Lin,D.,Liu,Z.:OmniObject3D:Large-vocabulary3dobjectdataset
| for realistic | perception, |     | reconstruction | and | generation. | In: CVPR | (2023) |     |
| ------------- | ----------- | --- | -------------- | --- | ----------- | -------- | ------ | --- |
46. Xie, T., Zong, Z., Qiu, Y., Li, X., Feng, Y., Yang, Y., Jiang, C.: Physgaussian:
| Physics-integrated |     | 3d gaussians |     | for generative | dynamics. | In: | CVPR | (2024) |
| ------------------ | --- | ------------ | --- | -------------- | --------- | --- | ---- | ------ |
47. Xu,Q.,Xu,Z.,Philip,J.,Bi,S.,Shu,Z.,Sunkavalli,K.,Neumann,U.:Point-NeRF:
| Point-based | neural | radiance | fields. | In: CVPR | (2022) |     |     |     |
| ----------- | ------ | -------- | ------- | -------- | ------ | --- | --- | --- |
48. Yang, Z., Yang, H., Pan, Z., Zhang, L.: Real-time photorealistic dynamic scene
| representation |     | and rendering | with | 4d gaussian | splatting. | In: | ICLR (2024) |     |
| -------------- | --- | ------------- | ---- | ----------- | ---------- | --- | ----------- | --- |
49. Yang,Z.,Gao,X.,Zhou,W.,Jiao,S.,Zhang,Y.,Jin,X.:Deformable3dgaussians
| for high-fidelity |     | monocular | dynamic | scene | reconstruction. | In: | CVPR | (2024) |
| ----------------- | --- | --------- | ------- | ----- | --------------- | --- | ---- | ------ |
50. Yu,A.,Ye,V.,Tancik,M.,Kanazawa,A.:pixelNeRF:Neuralradiancefieldsfrom
| one or few | images. | In: CVPR | (2021) |     |     |     |     |     |
| ---------- | ------- | -------- | ------ | --- | --- | --- | --- | --- |
51. Yu,H.,Julin,J.,Milacski,Z.A.,Niinuma,K.,Jeni,L.A.:Cogs:Controllablegaus-
| sian splatting. |     | arXiv preprint | arXiv:2312.05664 |     | (2023) |     |     |     |
| --------------- | --- | -------------- | ---------------- | --- | ------ | --- | --- | --- |
52. Yu, H.X., Zheng, Y., Gao, Y., Deng, Y., Zhu, B., Wu, J.: Inferring hybrid neural
fluidfieldsfromvideos.AdvancesinNeuralInformationProcessingSystems(2023)
53. Zhou,Y.,Barnes,C.,Lu,J.,Yang,J.,Li,H.:Onthecontinuityofrotationrepre-
| sentations | in neural | networks. |     | In: CVPR | (2019) |     |     |     |
| ---------- | --------- | --------- | --- | -------- | ------ | --- | --- | --- |

| 18  | L.  | Zhong et | al. |     |     |     |     |     |
| --- | --- | -------- | --- | --- | --- | --- | --- | --- |
Appendix
| A   | Data | flow |     |     |     |     |     |     |
| --- | ---- | ---- | --- | --- | --- | --- | --- | --- |
To clarify the decoupling of appearance learning and physical learning, we pro-
| vide | a simpler | layour | of  | our pipeline, | as shown | in Fig. | 8.  |     |
| ---- | --------- | ------ | --- | ------------- | -------- | ------- | --- | --- |
Appearance Learning
Physics Learning
Sample
Interp.
|     |         | Inputs |     | Gaussians     |               | Anchors |           | Anchors              |
| --- | ------- | ------ | --- | ------------- | ------------- | ------- | --------- | -------------------- |
|     | Simpler | layout | of  | the pipeline. | In appearance |         | learning, | we optimize Gaussian |
Fig.8:
kernelsforstaticimagerendering.WesampleanchorsAfromGaussians’centerX.In
physicslearning,weoptimizephysicalparametersamonganchorsA.Aftersimulation,
| at time | t,   | the updated    | Gaussians’ |     | center X could | be  | interpolated | from A . |
| ------- | ---- | -------------- | ---------- | --- | -------------- | --- | ------------ | -------- |
|         |      |                |            |     | t              |     |              | t        |
| B       | More | Implementation |            |     | Details        |     |              |          |
We use a single NVIDIA RTX 3090 GPU for reconstruction. For static scene
reconstruction, we follow the configuration prescribed by 3D Gaussian Splat-
ting [14], which takes approximately 10 minutes to optimize for the synthetic
data. The dynamic reconstruction takes 300 iterations. We employ 2048 anchor
pointsforourSpring-Massmodel,witheachanchorlinkedton =256neighbors
k
throughsprings.Wesetn b =16andn c =16.Foreachsequence,weassumemass
m =1 and damping factor ζ =0.1. The weighting coefficient for the D-SSIM
| 0   |     |     |     | 0   |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
term λ is set to 0.2 for static reconstruction and 0.05 for dynamic recon-
d−ssim
struction. In our experiments, we use a nonlinear spring force, setting p k =0.5,
and for Inverse Distance Weighting (IDW) interpolation, we arbitrarily choose
p =0.5.
b
FollowingthepracticefromPAC-NeRF[18],wefirstindependentlyoptimize
the initial velocity vector v , utilizing only a few frames captured before the
0
| object | interacts | with | the | environment. |     |     |     |     |
| ------ | --------- | ---- | --- | ------------ | --- | --- | --- | --- |
IntermsoftheGaussiankernels’parameters,weoptimizeallofthemduring
static scene reconstruction while maintaining a constant scaling scalar s for
0
all kernels. We have found that uniform scaling across all kernels in static scene
reconstructionresultsinamoreevenlydistributedpointcloudandanchorpoints.
Thisconsistencymarkedlyimprovesthedynamicmodel’ssimulationcapabilities
bymakingthekernels’spatialdistributionmoreuniform.Itisimportanttonote

|     |     |     |     |     |     |     | Spring-Gaus | 19  |
| --- | --- | --- | --- | --- | --- | --- | ----------- | --- |
Time
hturT dnuorG
sruO
k elgnis sruO
FReN-CAP
|     |          | Dynamic Reconstruction |        |               |     | Future Prediction   |            |          |
| --- | -------- | ---------------------- | ------ | ------------- | --- | ------------------- | ---------- | -------- |
|     | Ablation | study                  | of the | effectiveness | of  | optimizing physical | parameters | for each |
Fig.9:
particle rather than optimizing a single global parameter, on a heterogeneity object.
The results shows that optimizing a single global parameter is not able to accurately
| model | objects | with | complex physical | properties. |     |     |     |     |
| ----- | ------- | ---- | ---------------- | ----------- | --- | --- | --- | --- |
that we do not preserve the scaling scalar as constant s 0 during this refinement
phase. Instead, we assign a unique scaling scalar s to each Gaussian kernel
i
| associated  |          | with each | anchor      | point.  |                |             |                   |       |
| ----------- | -------- | --------- | ----------- | ------- | -------------- | ----------- | ----------------- | ----- |
| C           | Ablation |           | Study       |         |                |             |                   |       |
|             |          |           |             | Dynamic | Reconstruction |             | Future Prediction |       |
|             |          |           |             | CD↓     | PSNR↑          | SSIM↑ CD↓   | PSNR↑             | SSIM↑ |
| Spring-Gaus |          | (ours)    |             |         |                |             |                   |       |
|             |          |           |             | 0.18    | 27.08          | 0.967 2.04  | 17.63             | 0.927 |
| Spring-Gaus |          | w/o       | soft vector | 0.56    | 25.36          | 0.959 13.28 | 13.91             | 0.881 |
η
| Spring-Gaus, |     | single | k   | 3.22 | 23.02 | 0.940 6.56 | 14.45 | 0.892 |
| ------------ | --- | ------ | --- | ---- | ----- | ---------- | ----- | ----- |
| PAC-NeRF     |     | [18]   |     | 8.66 | 19.87 | 0.916 5.70 | 15.65 | 0.894 |
Table3:Ablationstudy.Wedemonstratetheimportanceofoptimizingparametersfor
eachanchorpointindividuallyaswellasusingasoftvectorη.Optimizingparameters
foreachanchorpointallowsSpring-Gaustohaveahigherdegreeoffreedominmodeling
| physics, | and | the soft | vector η | gives a more | flexible | formulation. |     |     |
| -------- | --- | -------- | -------- | ------------ | -------- | ------------ | --- | --- |

| 20 L. Zhong |           | et al. |        |               |      |             |          |      |
| ----------- | --------- | ------ | ------ | ------------- | ---- | ----------- | -------- | ---- |
| In our      | approach, | we     | employ | a soft vector | η to | dynamically | regulate | both |
the quantity and intensity of springs linked to the anchor points. This strategy
is illustrated in Tab. 3, showcasing its effectiveness. Our method’s capability
to simulate using very sparse anchors allows for the individual optimization
of physical parameters for each anchor point. This contrasts with PAC-NeRF,
which utilizes tens of thousands of particles, making it challenging to optimize
the physical parameters for each particle infeasible. Consequently, PAC-NeRF
faces limitations in accurately modeling objects composed of heterogeneous ma-
terials. In contrast, our methodology is adept at handling such complexities.
As depicted in Fig. 9 and Tab. 3, we present the outcomes on a heterogeneous
object that is segmented into various sections, each with distinct physical prop-
erties,therebydemonstratingourmodel’ssuperioradaptabilityincapturingthe
| nuanced dynamics |     | of objects | with   | variable | material | composition. |     |     |
| ---------------- | --- | ---------- | ------ | -------- | -------- | ------------ | --- | --- |
| D Limitations    |     | and        | Future | Work     |          |              |     |     |
Currently, Spring-Gaus is constrained to modeling elastic objects due to fixed
spring lengths in our formulation; these lengths are constants established at
the onset of dynamic simulation. Future work should aim to incorporate plastic
deformation into the framework. This would involve developing a method to
dynamically adjust the original lengths of the springs, also can make and break
springrelationshipsduringthesimulation,allowingfortheaccuratemodelingof
| materials that | exhibit    | both | elastic | and plastic   | behavior. |        |           |          |
| -------------- | ---------- | ---- | ------- | ------------- | --------- | ------ | --------- | -------- |
| Besides,       | our method |      | focuses | on simulating | a single  | object | colliding | with the |
ground surface, while multi-object interaction is a fascinating topic but requires
newmodeldesign(e.g.,establishingnewsprings)andamorethoroughevaluation
under various challenging scenarios, which we identify as an excellent direction
to expand our method. Other directions include considering more complicated
| boundary | conditions | and         | external | actions.             |     |            |         |      |
| -------- | ---------- | ----------- | -------- | -------------------- | --- | ---------- | ------- | ---- |
| Lastly,  | for better | evaluation, |          | a more comprehensive |     | real world | dataset | with |
highspatialandtemporalresolutionsshouldbecollected,includingmorediverse
objects, materials, and interactions. This dataset should also include more chal-
lengingscenarios,suchasocclusions,lightingchanges,andcameramotion.This
kindofdatasetwillhelptoevaluatetherobustnessandgeneralizationofrelated
methods.
