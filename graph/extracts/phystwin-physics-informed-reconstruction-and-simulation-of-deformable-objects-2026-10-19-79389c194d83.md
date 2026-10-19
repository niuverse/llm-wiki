<!-- 原始证据：raw/phystwin-physics-informed-reconstruction-and-simulation-of-deformable-objects-2026-10-19-79389c194d83.pdf；标准提取产生NUL，使用PyMuPDF逐页get_text(sort=True)重建；公式以原PDF为准。 -->

## PDF 第 1 页

              PhysTwin: Physics-Informed Reconstruction and Simulation of
                           Deformable Objects from Videos


          Hanxiao Jiang1,2  Hao-Yu Hsu2  Kaifeng Zhang1  Hsin-Ni Yu2  Shenlong Wang2  Yunzhu Li1
                                        1Columbia University  2University of Illinois Urbana-Champaign

                                                                                                                         Teleoperation


                                                                                                                                                                Digital Twin2025                                                                                                                                 Overlay



                                                                                                       Model-Based Robot PlanningMar
23

                                                            Left Hand                                 Right Hand                                                                          Real-Time
                                                                          Physical Simulation
                                                       & Rendering
                      t  Input Video        PhysTwin                          Simulation                            Applications in Robotics
            Figure 1. PhysTwin takes sparse videos (three camera views) of deformable objects under interaction as input and reconstructs a simulatable[cs.CV]
               digital twin with complete geometry, high-fidelity appearance, and accurate physical parameters. This enables multiple applications, such as
             real-time interactive simulation using keyboards and robotic teleoperation devices, as well as model-based robot planning.

                          Abstract                          1. Introduction

                                                           The construction of interactive digital twins is essential for
           Creating a physical digital twin of a real-world object has
                                                                modeling the world and simulating future states, with ap-
         immense potential in robotics, content creation, and XR.
                                                                              plications in virtual reality, augmented reality, and robotic
           In this paper, we present PhysTwin, a novel framework
                                                                       manipulation. A physically realistic digital twin (PhysT-
            that uses sparse videos of dynamic objects under inter-
                                                                  win) should accurately capture the geometry, appearance,
           action to produce a photo- and physically realistic, real-
                                                               and physical properties of an object, allowing simulations
           time interactive virtual replica. Our approach centers on
                                                                                  that closely match observations in the real world. However,
          two key components: (1) a physics-informed representa-
                                                                           constructing such a representation from sparse observations
            tion that combines spring-mass models for realistic physi-
                                                                    remains a significant challenge.
            cal simulation, generative shape models for geometry, and
                                                             The creation of digital twins for deformable objects has
          Gaussian splats for rendering; and (2) a novel multi-stage,arXiv:2503.17973v1                                                              long been a challenging topic in the vision community.
           optimization-based inverse modeling framework that recon-
                                                              While dynamic 3D methods (e.g., dynamic NeRFs [2, 5, 8,
            structs complete geometry, infers dense physical proper-
                                                                         13, 14, 17, 27, 29–31, 39–41, 43, 55, 56, 58, 61], dynamic
              ties, and replicates realistic appearance from videos. Our
                                                   3D Gaussians [10, 20, 24, 33, 34, 59, 65, 66, 68]) capture ob-
          method integrates an inverse physics framework with vi-
                                                                        served motion, appearance, and geometry from videos, they
           sual perception cues, enabling high-fidelity reconstruction
                                                                    omit the underlying physics and are thus unsuitable for simu-
          even from partial, occluded, and limited viewpoints. PhysT-
                                                                                  lating outcomes in unseen interactions. While recent neural-
          win supports modeling various deformable objects, includ-
                                                                  based models [4, 11, 28, 32, 36, 42, 49, 51, 52, 60, 64, 69]
           ing ropes, stuffed animals, cloth, and delivery packages.
                                                                              learn intuitive physics models from videos, they require large
          Experiments show that PhysTwin outperforms competing
                                                              amounts of data and remain limited to specific objects or
          methods in reconstruction, rendering, future prediction, and
                                                                      motions, whereas physics-driven approaches [9, 12, 27, 44,
           simulation under novel interactions. We further demon-
                                                                          63, 71, 72] often rely on pre-scanned shapes or dense obser-
            strate its applications in interactive real-time simulation
                                                                          vations to mitigate ill-posedness. Additionally, it requires
         and model-based robotic motion planning. Project Page:
                                                                    dense viewpoint coverage and supports only limited motion
          https://jianghanxiao.github.io/phystwin-web/

## PDF 第 2 页

types, making it unsuitable for general dynamics modeling.    on dynamic scenes by optimizing a deformable field. Simi-
   In this work, we aim to build an interactive PhysTwin       larly, Deformable 3D-GS [66] optimizes a deformation field
from sparse-viewpoint RGB-D video sequences, capturing      of each Gaussian kernel. Dynamic 3D-GS [34] optimizes the
object geometry, non-rigid dynamic physics, and appear-    motion of Gaussian kernels for each frame to capture scene
ance for realistic physical simulation and rendering. We     dynamics. 4D-GS [59] modulates 3D Gaussians with 4D
model deformable object dynamics with a spring-mass-based     neural voxels for dynamic multi-view synthesis. Although
representation, enabling efficient physical simulation and      these methods achieve high-fidelity results in dynamic multi-
handling a wide range of common objects, such as ropes,    view synthesis, they primarily focus on reconstructing scene
stuffed animals, cloth, and delivery packages. To address     appearance and geometry without capturing real-world dy-
the challenges posed by sparse observations, we leverage     namics, limiting their ability to support action-conditioned
shape priors and motion estimation from advanced 3D gener-     future predictions and interactive simulations.
ative models [62] and vision foundation models [23, 46, 48]                                                           Physics-Based Simulation of Deformable Objects. An-
to estimate the topology, geometry, and physical parame-                                                              other line of work incorporates physical simulators to per-
ters of our physical representation. Since some physical                                                    form system identification of physical parameters during
parameters (such as topology-related properties) are non-                                                                reconstruction.   Earlier methods relied on pre-scanned
differentiable and optimizing them efficiently is non-trivial,                                                                         static objects and required clean point cloud observa-
we design a hierarchical sparse-to-dense optimization strat-                                                                    tions [9, 15, 19, 21, 35, 44, 47, 57]. Most recent approaches
egy. This strategy integrates zero-order optimization [18]                                                               build upon SDF [45], NeRF [3, 12, 27] or Gaussian Splat-
for non-differentiable topology and sparse physical param-                                                                    ting [22, 63, 71, 72] to support more flexible physical digital
eters (e.g., collision parameters and homogeneous spring                                                         twin reconstruction. Several works [12, 22, 63] manually
stiffness), while employing first-order gradient-based opti-                                                                specify physics parameters, resulting in a mismatch between
mization to refine dense spring stiffness and further optimize                                                               the simulation and real-world video observations. Other
collision parameters. For appearance modeling, we adopt                                                      works [3, 27, 45, 71, 72] attempt to estimate physical param-
a Gaussian blending strategy, initializing static Gaussians                                                                    eters from videos. However, they are often constrained to
from sparse observations in the first frame using shape pri-                                                                synthetic data, limited motion, or the need for dense view-
ors and deforming them with a linear blending algorithm to                                                               points to accurately reconstruct static geometry, limiting
generate realistic dynamic appearances.                                                                        their practical applicability. The closest related work to ours
  Our inverse modeling framework effectively constructs in-                                                                             is Spring-Gaus [72], which also utilizes a 3D Spring-Mass
teractive PhysTwin from videos of objects under interaction.                                                   model for learning from videos. However, their physical
We create a real-world deformable object interaction dataset                                                    model is overly regularized and violates real-world physics,
and evaluate our method on three key tasks: reconstruction                                                               lacking momentum conservation and realistic gravity. More-
and resimulation, future prediction, and generalization to                                                                  over, Spring-Gaus requires dense viewpoint coverage to re-
unseen interactions. Both quantitative and qualitative results                                                               construct the full geometry at the initial state, which is im-
demonstrate that our reconstructed PhysTwin aligns accu-                                                                    practical in many real-world settings. The motions are also
rately with real-world observations, achieves precise future                                                                 limited to tabletop collisions and lack action inputs, making
predictions, and generates realistic simulations under diverse                                                        Spring-Gaus unsuitable as a general dynamics model for
unseen interactions. Furthermore, the high computational ef-                                                      downstream applications.
ficiency of our physics simulator enables real-time dynamics
                                                       Learning-Based Simulation of Deformable Objects.and rendering of our constructed PhysTwin, facilitating mul-
                                                              Analytically modeling the dynamics of deformable objectstiple applications, including real-time interactive simulation
                                                                            is challenging due to the high complexity of the stateand model-based robotic motion planning.
                                                         space and the variability of physical properties.  Recent
                                                      works [4, 11, 36, 60, 64] have chosen to use neural network-2. Related Works
                                                        based simulators to model object dynamics. Specifically,
Dynamic Scene Reconstruction. Dynamic scene recon-     graph-based networks effectively learn the dynamics of vari-
struction aims to recover the underlying representation of     ous types of objects such as plasticine [51, 52], cloth [32, 42],
dynamic scenes from inputs like depth scans [6, 26], RGBD      fluid [28, 49], and stuffed animals [69]. GS-Dynamics [69]
videos [38], or monocular or multi-view videos [1, 5, 24, 31,     attempted to learn object dynamics directly from real-world
34, 39, 40, 43, 56, 58, 61, 67, 68]. Recent advancements     videos using tracking and appearance priors from Dynamic
in dynamic scene modeling have involved the adaptation     Gaussians [34], and generalized well to unseen actions. How-
of novel scene representations, including Neural Radiance      ever, these learned models need extensive training samples
Fields (NeRF) [2, 5, 8, 13, 14, 16, 17, 27, 29, 30, 30, 31, 39–    and are often limited to specific environments with limited
41, 43, 55, 56, 58, 61] and 3D Gaussian splats [10, 20, 24, 33,    motion ranges. In contrast, our method requires only one
34, 59, 65, 66, 68]. D-NeRF [43] extends a canonical NeRF      interaction trial while achieving a broader range of motions.

## PDF 第 3 页

                                 …                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                pcsXmi8JUEozJ9G/SF5ozlGNLKNPC3krYkGrK0KZTtCF4iy8vk+ZFxatWqveX5dpNHkcBjuEzsCDK6jBHdShAQwG8Ayv8OZI58V5dz7mrStOPnMEf+B8/gC9IY1</latexit>t          t     t + 1   …            Observation                                   −1                                                             Pseudo Track               GT Observation


                                            Reconstruction
                                                  Tracking


  PhysTwin                                           Stiffness         C = Cgeometry + Cmotion + Crender

                                                        Simulation
                                          Contact    Rendering
    *                                                 Optimization
  Topology        Geometry

  *Control Point                         Gaussians                  Simulated Geometry and Motion      Gaussian Rendering

Figure 2. Overview of Our PhysTwin Framework. We present an overview of our PhysTwin framework, where the core representation
includes geometry, topology, physical parameters (associated with springs and contacts), and Gaussian kernels. To optimize PhysTwin,
we minimize the rendering loss and the discrepancy between simulated and observed geometry/motion. The rendering loss optimizes the
Gaussian kernels, while the geometry and motion losses refine the overall geometry, topology, and physical parameters in PhysTwin.

                                                                                                                                              ,  xt+1i  = xti+∆t vt+1i    ,3. Preliminary: Spring-Mass Model                    for all i, vt+1i  = δ  vti + ∆t miFi
                                                    where Xt represents the system state at time t, and δ rep-Spring-mass models are widely used for simulating de-
                                                                resents the drag damping. In this formulation, α denotesformable objects due to their simplicity and computational
                                                                               all physical parameters of the spring-mass model, includingefficiency. A deformable object is represented as a set of
                                                             spring stiffness, collision parameters, and damping. It alsospring-connected mass nodes, forming a graph structure
                                                        encompasses the parameters related to the control interaction.
G = (V, E), where V is the set of mass points and E is the         represents the “canonical” geometry and topology for theset    of       springs.             Each mass                      node                                   a position                                       i has                                             xi ∈R3     G0spring-mass system1, and at represents the action at time t.and    velocity                   which                            evolve                                   over                                       time according            vi           ∈R3,to Newtonian dynamics. Springs are constructed between
neighboring nodes based on a predefined topology, defining     4. Method
the elastic structure of the object.                                                              In this section, we formulate the construction of PhysTwin
  The force on node i is the result of the combined effects                                                              as an optimization problem. We then present our two-stage
of adjacent nodes connected by springs:                                                                     strategy, where the first stage addresses the physics-related
                                                              optimization, followed by the appearance-based optimiza-
         Fi = X  Fspringi,j  + Fdashpoti,j  + Fexti  ,        (1)      tion in the second stage. Finally, we demonstrate the capabil-
                   (i,j)∈E                                               ity of our framework to perform real-time simulation using
                                                                the constructed PhysTwin.
where the spring force and dashpot damping force between
nodes                                                               4.1. Problem Formulation        i and j are given by Fspringi,j  = kij(∥xj −xi∥−    xj−xi
lij) ∥xj−xi∥and Fdashpoti,j  = −γ(vi −vj), respectively. Here,    Given three RGBD videos of a deformable object under in-
kij is the spring stiffness, lij is the rest length, and γ is      teraction, our objective is to construct a PhysTwin model that
the dashpot damping coefficient. The external force Fexti       captures the geometry, appearance, and physical parameters
accounts for factors such as gravity, collisions, and user in-                                                             of the object over time. At each time frame t, we denote
teractions. The spring force restores the system to its rest                                                                 the RGBD observations from the i-th camera as Ot,i, where
shape, while the dashpot damping dissipates energy, pre-                              O = (I, D) represents the RGB image I and depth map D.
venting oscillations. For collisions, we use impulse-based                                                     The goal of our optimization problem is to minimize the
collision handling when two mass points are very close, in-                                                            discrepancy between the predicted observation ˆOt,i and the
cluding collisions between the object and the collider, as                                                                   actual observation Ot,i. The predicted observation is derived
well as between two object points.                                                    by projecting and rendering the predicted state ˆXt onto im-
  The spring-mass model updates the system state with a dy-
                                                           ages through a function gθ, where θ encodes the appearance
namic model Xt+1 = fα,G0(Xt, at) by applying explicit Eu-
ler integration to both velocity and position. More formally,          1In practice, we use the first-frame object state as the canonical state.

## PDF 第 4 页

of the objects represented by Gaussian splats. The 3D state      (2) joint optimization of both the discrete topology and physi-
ˆXt evolves over time according to the Spring-Mass model,      cal parameters; and (3) discontinuities in the dynamic model,
which captures the deformable object’s dynamics and up-     along with the long time horizon and dense parameter space,
dates the state using the explicit Euler integration method.    which make continuous optimization difficult. To address
The optimization problem is formulated as:                     these challenges, we handle the geometry and other param-
                                                                    eters separately. Specifically, we first leverage generative
              min XC(ˆOt,i, Ot,i)                    shape initialization to obtain the full geometry, then em-
                    α,G0,θ
                                      t,i                             (2)     ploy our two-stage sparse-to-dense optimization to refine the
                                                          remaining parameters.    s.t.   ˆOt,i = gθ(ˆXt, i),     ˆXt+1 = fα,G(ˆXt, at),
                                                         Generative Shape Prior. Due to partial observations,
where α, G0, θ captures the physics, geometry, topology and     recovering the full geometry is challenging. We leverage aappearance parameters (Sec. 3); the cost function quantifies     shape prior from the image-to-3D generative model TREL-
the difference between the predicted observation ˆOt,i and the    LIS [62] to generate a complete mesh conditioned on a sin-
actual observation Ot,i. This cost function is decomposed     gle RGB observation of the masked object. To improve
into three components: C = Cgeometry +Cmotion+Crender,    mesh quality, the input to TRELLIS is first enhanced using
each capturing the discrepancy between the inferred system     a super-resolution model [48] that upscales the segmented
states and the corresponding observations from 3D geometry,     foreground (obtained via Grounded-SAM2 [46]). While the
3D motion tracking, and 2D color, respectively (we defer the      resulting mesh corresponds reasonably well with the camera
details of each cost component to Sec. 4.2.1 and Sec. 4.2.2).     observation, we can still observe inconsistencies in scale,
The function gθ is the observation model, describing the     pose, and deformation.
projection from the predicted state to the image plane and       To address this, we design a registration module that uses
rendering image-space sensory observation from the i-th    2D matching for scale estimation, rigid registration, and non-
camera. The fα,G models the dynamic evolution of the      rigid deformation. A coarse-to-fine strategy first estimates
object’s state under the Spring-Mass model (Sec. 3).               initial rotation via 2D correspondences matched using Su-
                                                          perGlue [50], followed by refinement with the Perspective-n-
4.2. PhysTwin Framework                                 Point (PnP) [25] algorithm. We resolve scale and translation
Given the complexity of the overall optimization defined     ambiguities by optimizing the distances between matched
in Eq. 2, our PhysTwin framework decomposes it into two     points in the camera coordinate system.  After applying
stages. The first stage focuses on optimizing the geometry     these transformations, the objects are aligned in pose, with
and physical parameters, while the second stage is dedicated    some deformations handled by as-rigid-as-possible registra-
to optimizing the appearance-related parameters.                tion [53].  Finally, ray-casting alignment ensures that ob-
                                                            served points match the deformed mesh without occlusions.
4.2.1. Physics and Geometry Optimization                                                        These steps yield a shape prior aligned with the first-
As outlined in our optimization formulation in Sec. 4.1, the     frame observations, which serves as a crucial initialization
objective is to minimize the discrepancy between the pre-     for the inverse physics and appearance optimization stages.
dicted observation ˆOt,i and the actual observation Ot,i. First,       Sparse-to-Dense Optimization. The Spring-Mass model
we convert the depth observations Dt at each time frame t      consists of both the topological structure (i.e., the connec-
into the observed partial 3D point cloud Xt. In the first stage,      tivity of the springs) and the physical parameters defined on
we consider the following formulation for the optimization:     the springs. As mentioned in Sec. 3, we also include control
                                                          parameters to connect springs between control points and
   min X  Cgeometry(ˆXt, Xt) + Cmotion(ˆXt, Xt)              object points, defined by a radius and a maximum number of
    α,G0
              t                                               (3)     neighbors. Similarly, for topology optimization, we employ
     s.t.  ˆXt+1 = fα,G0(ˆXt, at),                             a heuristic approach that connects nearest-neighbor points,
                                                                also parameterized by a connection radius and a maximum
where the Cgeometry function quantifies the single-direction    number of neighbors, thereby controlling the density of the
Chamfer distance between the partially observed point cloud      springs. To extract control points from video data, we uti-
Xt and the inferred state ˆXt, and Cmotion quantifies the track-      lize Grounded-SAM2 [46] to segment the hand mask and
ing error between the predicted point ˆxti and its correspond-    CoTracker3 [23] to track hand movements. After lifting the
ing observed tracking xti. The observed tracking is obtained      points to 3D, we apply farthest-point sampling to obtain the
using the vision foundation model CoTracker3 [23], fol-      final set of control points.
lowed by lifting the result to 3D via depth map unprojection.        All the aforementioned components constitute the param-
   There are three main challenges in the first-stage opti-      eter space we aim to optimize. The two main challenges are:
mization: (1) partial observations from sparse viewpoints;     (1) some parameters are non-differentiable (e.g., the radius

## PDF 第 5 页

and maximum number of neighbors); and (2) to represent a     4.3. Capabilities of PhysTwin
wide range of objects, we model dense spring stiffness, lead-
                                                  Our constructed PhysTwin supports real-time simulation of
ing to a parameter space with tens of thousands of springs.
                                                          deformable objects under various motions while maintaining
  To address these challenges, we introduce a hierarchi-
                                                                        realistic appearance. This real-time, photorealistic simula-
cal sparse-to-dense optimization strategy. Initially, we em-
                                                                   tion enables interactive exploration of object dynamics.
ploy zero-order, sampling-based optimization to estimate
                                              By introducing control points and dynamically connect-
the parameters, which naturally circumvents the issue of
                                                              ing them to object points via springs, our system can simulate
differentiability. However, zero-order optimization becomes
                                                                diverse motion patterns and interactions. These capabilities
inefficient when the parameter space is too large. Therefore,
                                                 make PhysTwin a powerful representation for real-time inter-
in the first stage, we assume homogeneous stiffness, allow-
                                                                   active simulation and model-based robotic motion planning,
ing the topology and other physical parameters to achieve
                                                     which are further described in Sec. 5.3.
a good initialization. In the second stage, we further refine
the parameters using first-order gradient descent, leveraging
                                                          5. Experimentsour custom-built differentiable spring-mass simulator. This
stage simultaneously optimizes the dense spring stiffness     In this section, we evaluate the performance of our PhysT-
and collision parameters.                                win framework across three distinct tasks involving different
  Beyond the optimization strategy, we incorporate addi-     types of objects. Our primary objective is to address the fol-
tional supervision by utilizing tracking priors from vision     lowing three questions: (1) How accurately does our frame-
foundation models. We lift the 2D tracking prediction into    work reconstruct and resimulate deformable objects and pre-
3D to obtain pseudo-ground-truth tracking data for the 3D      dict their future states? (2) How well does the constructed
points, which forms a crucial component of our cost function     PhysTwin generalize to unseen interactions? (3) What is the
as mentioned in Eq. (3).                                                utility of PhysTwin in downstream tasks?
  By integrating our optimization strategy with a cost func-
tion that leverages additional tracking priors, our PhysTwin     5.1. Experiment Settings
framework can effectively and efficiently model the dynam-
                                                               Dataset. We collect a dataset of RGBD videos capturing
ics of diverse interactable objects from videos.
                                               human interactions with various deformable objects with
4.2.2. Appearance Optimization                                 different physical properties, such as ropes, stuffed animals,
                                                                       cloth, and delivery packages. Three RealSense-D455 RGBDFor the second-stage appearance optimization, to model ob-
                                                       cameras are used to record the interactions. Each video is 1ject appearance, we construct a set of static 3D Gaussian
kernels parameterized by θ, with each Gaussian defined by      to 10 seconds long and captures different interactions, includ-
                                                            ing quick lifting, stretching, pushing, and squeezing witha 3D center position µ, a rotation matrix represented by a
                                                     one or both hands. We collect 22 scenarios encompassing
quaternion q ∈SO(3), a scaling matrix represented by a 3D     various object types, interaction types, and hand configura-vector s, an opacity value α, and color coefficients c. We
                                                                      tions. For each scenario, the RGBD videos are split into aoptimize θ here via
                                                                  training set and a test set following a 7:3 ratio, where only
     min X Crender(ˆIi,t, Ii,t) s.t. ˆIi,t = gθ(ˆXt, i),    (4)     the training set is used to construct PhysTwin. We manu-
        θ                 t,i                                                      ally annotate 9 ground-truth tracking points for each video
                                                                  to evaluate tracking performance with the semi-auto tool
where ˆXt is the optimized system states at time t, i is the     introduced in [7].
camera index, and Ii,t, ˆIi,t are the ground truth image and        Tasks. To assess the effectiveness of our PhysTwin frame-
rendered image from camera view i at time t, respectively.    work and the quality of our constructed PhysTwin, we formu-
Crender computes the L1 loss with a D-SSIM term between      late three tasks: (1) Reconstruction & Resimulation; (2) Fu-the rendering and ground truth image. For simplicity, we      ture Prediction; and (3) Generalization to Unseen Actions.
set t = 0 to optimize appearance only at the first frame. We        For the Reconstruction & Resimulation task, the objective
restrict the Gaussian shape to be isotropic to prevent spiky       is to construct PhysTwin such that it can accurately recon-
artifacts during deformation.                                        struct and resimulate the motion of deformable objects given
  To ensure realistic rendering under deformation, we need      the actions represented by the control point positions.
to dynamically adjust each Gaussian at each timestep t based        For the Future Prediction task, we aim to assess whether
on the transition between states ˆXt and ˆXt+1. To achieve     PhysTwin can perform well on unseen future frames during
this, we adopt a Gaussian updating algorithm using Linear       its construction. For the Generalization to Unseen Interac-
Blend Skinning (LBS) [20, 54, 69], which interpolates the      tions task, the goal is to assess whether PhysTwin can adapt
motions of 3D Gaussians using the motions of neighboring      to different interactions. To evaluate this, we construct a gen-
mass nodes. Please refer to the supplementary for details.        eralization dataset consisting of interaction pairs performed

## PDF 第 6 页

                        Reconstruction & Resimulation                          t                             Future Prediction                                   t
       Observation

    (Ours)
     PhysTwin
       GS-Dynamics
       Spring-Gaus

       Observation
     PhysTwin
       GS-Dynamics
       Spring-Gaus
       Observation

    (Ours)
     PhysTwin
       GS-Dynamics
       Spring-Gaus


Figure 3. Qualitative Results on Reconstruction & Resimulation and Future Prediction. We visualize the rendering results of different
methods on two tasks. For the reconstruction & resimulation task, our method achieves a better match with the observations. For the future
prediction task, our method accurately predicts the future state of the objects. In contrast, the baselines fail in most cases: GS-Dynamics [69]
tends to remain static, while Spring-Gauss [72] frequently causes the physical model to crash.

## PDF 第 7 页

        Observation                                                        Future Prediction                                                                      t
 (Ours)
 PhysTwin
 GS-Dynamics

 (Ours)
 PhysTwin
 GS-Dynamics

Figure 4. Qualitative Results on Generalization to Unseen Interactions. We visualize the simulation of a deformable object under unseen
interactions using our method and GS-Dynamics [69]. The leftmost image shows the interaction used to train the dynamics models, while
the images on the right demonstrate their generalization to unseen interactions. Our PhysTwin significantly outperforms prior work.


Table 1. Quantitative Results on Reconstruction & Resimulation and Future Prediction. We compare the performance of our method
with two prior work, GS-Dynamics [69] and Spring-Gaus [72], on two tasks: reconstruction & resimulation and future prediction. Our
PhysTwin framework consistently outperforms the baselines across all metrics.

 Task                                Reconstruction & Resimulation                                         Future Prediction
 Method        CD ↓   Track Error ↓  IoU % ↑  PSNR ↑  SSIM ↑  LPIPS ↓  CD ↓   Track Error ↓  IoU % ↑  PSNR ↑  SSIM ↑  LPIPS ↓
 Spring-Gaus [72]    0.041          0.050      57.6    23.445     0.928     0.102   0.062          0.094      46.4    22.488     0.924     0.113
 GS-Dynamics [69]   0.014          0.022      72.1    26.260     0.940     0.052   0.041          0.070      49.8    22.540     0.924     0.097
 PhysTwin (Ours)    0.005          0.009      84.4    28.214     0.945     0.034   0.012          0.022      72.5    25.617     0.941     0.055

Table 2.  Quantitative Results on Generalization to Unseen       The second baseline is a learning-based simulation ap-
Interactions. We compare our method with GS-Dynamics [69]     proach, GS-Dynamics [69], which employs a GNN-based
on generalization to unseen interactions. Both methods are trained                                                             neural dynamics model to learn system dynamics directly
on the same video with a specific interaction and tested on unseen
                                                       from partial observations. In their original setting, video pre-
interactions. Our method achieves significantly better results.
                                                            processing with Dyn3DGS [34] is required to obtain track-
 Method        CD ↓   Track Error ↓  IoU % ↑  PSNR ↑  SSIM ↑  LPIPS ↓      ing information. For a fairer comparison, we strengthened
 GS-Dynamics [69]   0.029          0.038      63.4    25.053     0.934     0.067         it by using our 3D-lifting tracker based on CoTracker3 [23],
 PhysTwin (Ours)    0.013          0.018     72.18    26.199     0.938     0.047
                                                    which provides more efficient and accurate supervision for
                                                                   training the neural dynamics model used by GS-Dynamics.
on the same object but with varying motions, including dif-                                                              Evaluation. To better understand whether our prediction
ferences in hand configuration and interaction type.                                                         matches the observations, we evaluate predictions in both 3D
   Baselines. To the best of our knowledge, there is cur-    and 2D. For the 3D evaluation, we use the single-direction
rently no existing work that demonstrates good performance    Chamfer Distance (partial ground truth with our full-state
across all three tasks. Therefore, we select two main research      prediction) and the tracking error (based on our manually
directions as baselines and further augment them to match     annotated ground-truth tracking points). For the 2D eval-
the tasks in our setting (full details in the supplementary).       uation, we assess image quality using PSNR, SSIM, and
  The first baseline we consider is a physics-based simu-    LPIPS [70], and silhouette alignment using IoU. We perform
lation method for identifying the material properties of de-   2D evaluation only at the center viewpoint due to optimal
formable objects, Spring-Gaus [72]. Their work has demon-      visibility of objects, with metrics averaged across all frames
strated strong capabilities in reconstruction, resimulation,    and scenarios. Specially, for the Spring-Gaus [72] baseline,
and future prediction in its original setting. However, their       its optimization process is unstable due to inaccurate physics
framework does not support external control inputs, so we     modeling. Therefore, we report the above metrics only for
augment it with additional control capabilities.                       its successful cases.

## PDF 第 8 页

Figure 5. Applications of our PhysTwin. Our constructed PhysTwin supports a variety of tasks, including real-time interactive simulation,
which can accept input from either a keyboard or a robot teleoperation setup. Meanwhile, PhysTwin also enables model-based robot planning
to accomplish tasks such as lifting a rope into some specific configuration.

5.2. Results                                              our method across different actions. In contrast, the neural
                                                       dynamics model struggles to adapt to environmental changes
To assess the performance of our framework and the quality
                                                       and diverse interactions as effectively as our approach. More-
of our constructed PhysTwin, we compare with two aug-
                                                                 over, in unseen interaction scenarios, our method achieves
mented baselines across three task settings. Our quantitative
                                                          performance comparable to that on the future prediction task,
analysis reveals that the PhysTwin framework consistently
                                                                highlighting the robustness and generalization capability of
outperforms the baselines across various tasks.
                                                           our constructed PhysTwin.
   Reconstruction & Resimulation. The quantitative re-
sults in Tab. 1 Reconstruction & Resimulation column
                                                               5.3. Application
demonstrate the superior performance of our PhysTwin
method over baselines. Our approach significantly improves    The efficient forward simulation capabilities of our Spring-
all evaluated metrics, including Chamfer Distance, track-    Mass simulator, implemented using Warp [37], enable a
ing error, and 2D IoU, confirming that our reconstruction      variety of downstream applications. Fig. 5 showcases key
and resimulation align more closely with the original ob-     applications enabled by our PhysTwin: (1) Interactive Sim-
servations. This highlights the effectiveness of our model      ulation: Users can interact with objects in real time using
in learning a more accurate dynamics model under sparse     keyboard controls, either with one or both hands. The sys-
observations.  Additionally, rendering metrics show that    tem also supports real-time simulation of an object’s future
our method produces more realistic 2D images, benefiting      state during human teleoperation with robotic arms. This
from the Gaussian blending strategy and enhanced dynamic      feature serves as a valuable tool for predicting object dynam-
modeling. Fig. 3 further provides qualitative visualizations      ics during manipulation. (2) Model-Based Robotic Planning:
across different objects, illustrating precise alignment with    Owing to the high fidelity of our constructed PhysTwin, it
original observations. Notably, our physics-based represen-    can be used as a dynamic model in planning pipelines. By
tation inherently improves point tracking. After physics-     integrating it with model-based planning techniques, we can
constrained optimization, our tracking surpasses the original     generate effective motion plans for robots to complete a
CoTracker3 [23] predictions used for training, achieving bet-     variety of tasks.
ter alignment after global optimization (See supplement for
more details).
                                                          6. Conclusion
  Future Prediction. Table 1, in the Future Prediction
column, demonstrates that our method achieves superior   We introduced PhysTwin, a novel framework for construct-
performance in predicting unseen frames, excelling in both     ing physical digital twins from sparse videos, enabling effec-
dynamics alignment and rendering quality. Fig. 3 further      tive reconstruction and resimulation of deformable objects.
provides qualitative results, illustrating the accuracy of our    Our approach excels in predicting future states and simu-
predictions on unseen frames.                                    lating object interactions that generalize to unseen actions.
   Generalization to Unseen Interactions. We also eval-   We showed the superior performance of our method across
uate the generalization performance to unseen interactions.     various object types, control configurations, and task set-
Our dataset includes transfers from one interaction (e.g., sin-      tings, significantly outperforming prior work. PhysTwin
gle lift) to significantly different interactions (e.g., double     enables various downstream tasks that demand high-speed
stretch). We directly use our constructed PhysTwin and lever-     simulation and accurate future prediction. Moreover, our
age our registration pipeline to align it with the first frame     approach provides valuable insights for robotic manipulation.
of the target case.  Fig. 4 shows that our method closely    By bridging perception and physics-based simulation, Phys-
matches the ground truth observations in terms of dynamics.    Twin serves as a crucial tool for guiding robot interactions,
Quantitative results further demonstrate the robustness of     making real-world deployment more efficient and reliable.

## PDF 第 9 页

Acknowledgement                                            [10] Yuanxing Duan, Fangyin Wei, Qiyu Dai, Yuhang He, Wen-
                                                                  zheng Chen, and Baoquan Chen. 4d-rotor gaussian splatting:
This work is partially supported by the Toyota Research In-          towards efficient novel view synthesis for dynamic scenes. In
stitute (TRI), the Sony Group Corporation, Google, Dalus       ACM SIGGRAPH 2024 Conference Papers, pages 1–11, 2024.
AI, the DARPA TIAMAT program (HR0011-24-9-0430),            1, 2
the Intel AI SRS gift, Amazon-Illinois AICE grant, Meta Re-      [11] Ben Evans, Abitha Thankaraj, and Lerrel Pinto. Context is
search Grant, IBM IIDAI Grant, and NSF Awards #2331878,           everything: Implicit identification for dynamics adaptation. In
#2340254, #2312102, #2414227, and #2404385. We greatly         2022 International Conference on Robotics and Automation
appreciate the NCSA for providing computing resources.          (ICRA), pages 2642–2648. IEEE, 2022. 1, 2
This article solely reflects the opinions and conclusions of      [12] Yutao Feng, Yintong Shang, Xuan Li, Tianjia Shao, Chen-
                                                                            fanfu Jiang, and Yin Yang. Pie-nerf: Physics-based interactiveits authors and should not be interpreted as necessarily rep-
                                                                      elastodynamics with nerf. In Proceedings of the IEEE/CVF
resenting the official policies, either expressed or implied, of
                                                                   Conference on Computer Vision and Pattern Recognition,
the sponsors.
                                                                    pages 4450–4461, 2024. 1, 2
                                                                     [13] Sara Fridovich-Keil, Giacomo Meanti, Frederik Rahbæk War-
References                                                                           burg, Benjamin Recht, and Angjoo Kanazawa.  K-planes:
 [1] Benjamin Attal, Jia-Bin Huang, Christian Richardt, Michael            Explicit radiance fields in space, time, and appearance. In
      Zollhoefer, Johannes Kopf, Matthew O’Toole, and Changil          Proceedings of the IEEE/CVF Conference on Computer Vi-
    Kim.   Hyperreel:  High-fidelity 6-dof video with ray-           sion and Pattern Recognition, pages 12479–12488, 2023. 1,
     conditioned sampling. In Proceedings of the IEEE/CVF Con-         2
     ference on Computer Vision and Pattern Recognition, pages      [14] Hang Gao, Ruilong Li, Shubham Tulsiani, Bryan Russell, and
     16610–16620, 2023. 2                                       Angjoo Kanazawa. Monocular dynamic view synthesis: A
 [2] Ang Cao and Justin Johnson. Hexplane: A fast representation             reality check. Advances in Neural Information Processing
      for dynamic scenes. In Proceedings of the IEEE/CVF Con-           Systems, 35:33768–33780, 2022. 1, 2
     ference on Computer Vision and Pattern Recognition, pages      [15] Moritz Geilinger, David Hahn, Jonas Zehnder, Moritz Bächer,
     130–141, 2023. 1, 2                                            Bernhard Thomaszewski, and Stelian Coros. Add: Analyt-
 [3] Hsiao-yu Chen, Edith Tretschk, Tuur Stuyck, Petr Kadle-            ically differentiable dynamics for multi-body systems with
     cek, Ladislav Kavan, Etienne Vouga, and Christoph Lassner.             frictional contact. ACM Transactions on Graphics (TOG), 39
      Virtual elastic objects. In Proceedings of the IEEE/CVF Con-           (6):1–15, 2020. 2
     ference on Computer Vision and Pattern Recognition, pages      [16] Shanyan Guan, Huayu Deng, Yunbo Wang, and Xiaokang
     15827–15837, 2022. 2                                          Yang. Neurofluid: Fluid dynamics grounding with particle-
 [4] Zhenfang Chen, Kexin Yi, Yunzhu Li, Mingyu Ding, Antonio           driven neural radiance fields. In International conference on
     Torralba, Joshua B Tenenbaum, and Chuang Gan. Comphy:          machine learning, pages 7919–7929. PMLR, 2022. 2
     Compositional physical reasoning of objects and events from      [17] Xiang Guo, Jiadai Sun, Yuchao Dai, Guanying Chen, Xiao-
     videos. arXiv preprint arXiv:2205.01089, 2022. 1, 2                  qing Ye, Xiao Tan, Errui Ding, Yumeng Zhang, and Jingdong
 [5] Mengyu Chu, Lingjie Liu, Quan Zheng, Erik Franz, Hans-         Wang. Forward flow for novel view synthesis of dynamic
     Peter Seidel, Christian Theobalt, and Rhaleb Zayer. Physics           scenes. In Proceedings of the IEEE/CVF International Con-
     informed neural fields for smoke reconstruction with sparse           ference on Computer Vision, pages 16022–16033, 2023. 1,
      data. ACM Transactions on Graphics, 41(4):119:1–119:14,         2
     2022. 1, 2                                                      [18] Nikolaus Hansen. The cma evolution strategy: a comparing
 [6] Brian Curless and Marc Levoy. A volumetric method for            review. Towards a new evolutionary computation: Advances
      building complex models from range images. In Proceedings            in the estimation of distribution algorithms, pages 75–102,
      of the 23rd annual conference on Computer graphics and           2006. 2
      interactive techniques, pages 303–312, 1996. 2                   [19] Eric Heiden, Miles Macklin, Yashraj Narang, Dieter Fox,
 [7] Carl Doersch, Yi Yang, Mel Vecerik, Dilara Gokay, Ankush         Animesh Garg, and Fabio Ramos. Disect: A differentiable
     Gupta, Yusuf Aytar, Joao Carreira, and Andrew Zisserman.           simulation engine for autonomous robotic cutting.  arXiv
    TAPIR: Tracking any point with per-frame initialization and            preprint arXiv:2105.12244, 2021. 2
     temporal refinement. In Proceedings of the IEEE/CVF In-      [20] Yi-Hua Huang, Yang-Tian Sun, Ziyi Yang, Xiaoyang Lyu,
     ternational Conference on Computer Vision, pages 10061–          Yan-Pei Cao, and Xiaojuan Qi. Sc-gs: Sparse-controlled gaus-
     10072, 2023. 5                                                        sian splatting for editable dynamic scenes. In Proceedings
 [8] Danny Driess, Zhiao Huang, Yunzhu Li, Russ Tedrake, and            of the IEEE/CVF conference on computer vision and pattern
    Marc Toussaint. Learning multi-object dynamics with com-           recognition, pages 4220–4230, 2024. 1, 2, 5, 12
      positional neural radiance fields.  In Conference on robot      [21] Krishna Murthy Jatavallabhula, Miles Macklin, Florian
      learning, pages 1755–1768. PMLR, 2023. 1, 2                    Golemo, Vikram Voleti, Linda Petrini, Martin Weiss, Bre-
 [9] Tao Du, Kui Wu, Pingchuan Ma, Sebastien Wah, Andrew          andan Considine, Jérôme Parent-Lévesque, Kevin Xie, Kenny
      Spielberg, Daniela Rus, and Wojciech Matusik. Diffpd: Dif-           Erleben, et al. gradsim: Differentiable simulation for sys-
      ferentiable projective dynamics. ACM Transactions on Graph-         tem identification and visuomotor control. arXiv preprint
      ics (ToG), 41(2):1–21, 2021. 1, 2                                   arXiv:2104.02646, 2021. 2

## PDF 第 10 页

[22] Ying Jiang, Chang Yu, Tianyi Xie, Xuan Li, Yutao Feng,      [35] Pingchuan Ma, Tao Du, Joshua B Tenenbaum, Wojciech
    Huamin Wang, Minchen Li, Henry Lau, Feng Gao, Yin Yang,          Matusik, and Chuang Gan.   Risp:  Rendering-invariant
      et al. Vr-gs: A physical dynamics-aware interactive gaussian             state predictor with differentiable simulation and render-
      splatting system in virtual reality. In ACM SIGGRAPH 2024           ing for cross-domain parameter estimation. arXiv preprint
     Conference Papers, pages 1–1, 2024. 2                              arXiv:2205.05678, 2022. 2
[23] Nikita Karaev,  Iurii Makarov, Jianyuan Wang,  Natalia      [36] Pingchuan Ma, Peter Yichen Chen, Bolei Deng, Joshua B
     Neverova, Andrea Vedaldi, and Christian Rupprecht. Co-         Tenenbaum, Tao Du, Chuang Gan, and Wojciech Matusik.
      tracker3:  Simpler and better point tracking by pseudo-          Learning neural constitutive laws from motion observations
      labelling real videos. arXiv preprint arXiv:2410.11831, 2024.            for generalizable pde dynamics. In International Conference
      2, 4, 7, 8, 12, 16                                             on Machine Learning, pages 23279–23300. PMLR, 2023. 1,
[24] Agelos Kratimenos, Jiahui Lei, and Kostas Daniilidis. Dynmf:         2
     Neural motion factorization for real-time dynamic view syn-      [37] Miles Macklin. Warp: A high-performance python framework
      thesis with 3d gaussian splatting. In European Conference on            for gpu simulation and graphics. https://github.com/
    Computer Vision, pages 252–269. Springer, 2024. 1, 2               nvidia/warp, 2022. NVIDIA GPU Technology Conference
[25] Vincent Lepetit, Francesc Moreno-Noguer, and Pascal Fua.         (GTC). 8
    Ep n p: An accurate o (n) solution to the p n p problem.      [38] Richard A Newcombe, Dieter Fox, and Steven M Seitz. Dy-
     International journal of computer vision, 81:155–166, 2009.           namicfusion: Reconstruction and tracking of non-rigid scenes
    4                                                                         in real-time. In Proceedings of the IEEE conference on com-
[26] Hao Li, Robert W Sumner, and Mark Pauly. Global corre-           puter vision and pattern recognition, pages 343–352, 2015.
     spondence optimization for non-rigid registration of depth         2
      scans. In Computer graphics forum, pages 1421–1430. Wiley      [39] Keunhong Park, Utkarsh Sinha, Jonathan T Barron, Sofien
     Online Library, 2008. 2                                           Bouaziz, Dan B Goldman, Steven M Seitz, and Ricardo
[27] Xuan Li, Yi-Ling Qiao, Peter Yichen Chen, Krishna Murthy           Martin-Brualla. Nerfies: Deformable neural radiance fields.
      Jatavallabhula, Ming Lin, Chenfanfu Jiang, and Chuang Gan.           In Proceedings of the IEEE/CVF international conference on
     Pac-nerf:  Physics augmented continuum neural radiance          computer vision, pages 5865–5874, 2021. 1, 2
      fields for geometry-agnostic system identification.  arXiv      [40] Keunhong Park, Utkarsh Sinha, Peter Hedman, Jonathan T
     preprint arXiv:2303.05512, 2023. 1, 2                              Barron, Sofien Bouaziz, Dan B Goldman, Ricardo Martin-
[28] Yunzhu Li, Jiajun Wu, Russ Tedrake, Joshua B Tenenbaum,           Brualla, and Steven M  Seitz.   Hypernerf: A higher-
     and Antonio Torralba. Learning particle dynamics for manip-          dimensional representation for topologically varying neural
     ulating rigid bodies, deformable objects, and fluids. arXiv           radiance fields. arXiv preprint arXiv:2106.13228, 2021. 2
     preprint arXiv:1810.01566, 2018. 1, 2                           [41] Yicong Peng, Yichao Yan, Shenqi Liu, Yuhao Cheng,
[29] Yunzhu Li, Shuang Li, Vincent Sitzmann, Pulkit Agrawal,         Shanyan Guan, Bowen Pan, Guangtao Zhai, and Xiaokang
     and Antonio Torralba. 3d neural scene representations for          Yang. Cagenerf: Cage-based neural radiance fields for gen-
     visuomotor control. In Conference on Robot Learning, pages            renlized 3d deformation and animation. In Thirty-Sixth Con-
     112–123. PMLR, 2022. 1, 2                                          ference on Neural Information Processing Systems, 2022. 1,
[30] Zhengqi Li, Simon Niklaus, Noah Snavely, and Oliver Wang.         2
     Neural scene flow fields for space-time view synthesis of      [42] Tobias Pfaff, Meire Fortunato, Alvaro Sanchez-Gonzalez,
     dynamic scenes. In Proceedings of the IEEE/CVF Conference          and Peter Battaglia. Learning mesh-based simulation with
    on Computer Vision and Pattern Recognition, pages 6498–          graph networks.  In International conference on learning
     6508, 2021. 2                                                          representations, 2020. 1, 2
[31] Zhengqi Li, Qianqian Wang, Forrester Cole, Richard Tucker,      [43] Albert Pumarola, Enric Corona, Gerard Pons-Moll, and
     and Noah Snavely. Dynibar: Neural dynamic image-based          Francesc Moreno-Noguer.  D-nerf: Neural radiance fields
     rendering. In Proceedings of the IEEE/CVF Conference on            for dynamic scenes. In Proceedings of the IEEE/CVF con-
    Computer Vision and Pattern Recognition, pages 4273–4284,           ference on computer vision and pattern recognition, pages
     2023. 1, 2                                                   10318–10327, 2021. 1, 2
[32] Xingyu Lin, Yufei Wang, Zixuan Huang, and David Held.      [44] Yi-Ling Qiao, Junbang Liang, Vladlen Koltun, and Ming C.
     Learning visible connectivity dynamics for cloth smoothing.           Lin. Differentiable simulation of soft multi-body systems.
     In Conference on Robot Learning, pages 256–266. PMLR,           In Conference on Neural Information Processing Systems
     2022. 1, 2                                                         (NeurIPS), 2021. 1, 2
[33] Youtian Lin, Zuozhuo Dai, Siyu Zhu, and Yao Yao. Gaussian-      [45] Yi-Ling Qiao, Alexander Gao, and Ming Lin. Neuphysics:
     flow: 4d reconstruction with dynamic 3d gaussian particle.           Editable neural geometry and physics from monocular videos.
     In Proceedings of the IEEE/CVF Conference on Computer          Advances in Neural Information Processing Systems, 35:
     Vision and Pattern Recognition, pages 21136–21145, 2024.         12841–12854, 2022. 2
      1, 2                                                             [46] Tianhe Ren, Shilong Liu, Ailing Zeng, Jing Lin, Kunchang
[34] Jonathon Luiten, Georgios Kopanas, Bastian Leibe, and Deva            Li, He Cao, Jiayu Chen, Xinyu Huang, Yukang Chen, Feng
    Ramanan. Dynamic 3d gaussians: Tracking by persistent          Yan, et al. Grounded sam: Assembling open-world models
    dynamic view synthesis. In 2024 International Conference            for diverse visual tasks. arXiv preprint arXiv:2401.14159,
    on 3D Vision (3DV), pages 800–809. IEEE, 2024. 1, 2, 7              2024. 2, 4

## PDF 第 11 页

[47] Junior Rojas, Eftychios Sifakis, and Ladislav Kavan. Dif-            vision and pattern recognition, pages 20310–20320, 2024. 1,
      ferentiable implicit soft-body physics.   arXiv preprint         2
     arXiv:2102.05791, 2021. 2                                      [60] Yilin Wu, Wilson Yan, Thanard Kurutach, Lerrel Pinto, and
[48] Robin Rombach, Andreas Blattmann, Dominik Lorenz,            Pieter Abbeel. Learning to manipulate deformable objects
     Patrick Esser, and Björn Ommer.  High-resolution image           without demonstrations. arXiv preprint arXiv:1910.13439,
     synthesis with latent diffusion models.  In Proceedings of           2019. 1, 2
     the IEEE/CVF conference on computer vision and pattern      [61] Wenqi Xian, Jia-Bin Huang, Johannes Kopf, and Changil Kim.
      recognition, pages 10684–10695, 2022. 2, 4                         Space-time neural irradiance fields for free-viewpoint video.
[49] Alvaro Sanchez-Gonzalez, Jonathan Godwin, Tobias Pfaff,           In Proceedings of the IEEE/CVF Conference on Computer
    Rex Ying, Jure Leskovec, and Peter Battaglia. Learning to           Vision and Pattern Recognition (CVPR), pages 9421–9431,
     simulate complex physics with graph networks. In Interna-          2021. 1, 2
      tional conference on machine learning, pages 8459–8468.      [62] Jianfeng Xiang, Zelong Lv, Sicheng Xu, Yu Deng, Ruicheng
    PMLR, 2020. 1, 2                                         Wang, Bowen Zhang, Dong Chen, Xin Tong, and Jiaolong
[50] Paul-Edouard Sarlin, Daniel DeTone, Tomasz Malisiewicz,          Yang.  Structured 3d latents for scalable and versatile 3d
     and Andrew Rabinovich. Superglue: Learning feature match-           generation. arXiv preprint arXiv:2412.01506, 2024. 2, 4, 12
     ing with graph neural networks.  In Proceedings of the      [63] Tianyi Xie, Zeshun Zong, Yuxing Qiu, Xuan Li, Yutao Feng,
    IEEE/CVF conference on computer vision and pattern recog-         Yin Yang, and Chenfanfu Jiang.  Physgaussian: Physics-
      nition, pages 4938–4947, 2020. 4, 12                                  integrated 3d gaussians for generative dynamics.  In Pro-
[51] Haochen Shi, Huazhe Xu, Samuel Clarke, Yunzhu Li, and Jia-          ceedings of the IEEE/CVF Conference on Computer Vision
     jun Wu. Robocook: Long-horizon elasto-plastic object manip-         and Pattern Recognition, pages 4389–4398, 2024. 1, 2
      ulation with diverse tools. arXiv preprint arXiv:2306.14447,      [64] Zhenjia Xu, Jiajun Wu, Andy Zeng, Joshua B Tenenbaum,
     2023. 1, 2                                                  and Shuran Song. Densephysnet: Learning dense physical
[52] Haochen Shi, Huazhe Xu, Zhiao Huang, Yunzhu Li, and Ji-           object representations via multi-step dynamic interactions.
     ajun Wu. Robocraft: Learning to see, simulate, and shape           arXiv preprint arXiv:1906.03853, 2019. 1, 2
      elasto-plastic objects in 3d with graph networks. The Interna-      [65] Zeyu Yang, Hongye Yang, Zijie Pan, and Li Zhang. Real-time
      tional Journal of Robotics Research, 43(4):533–549, 2024. 1,            photorealistic dynamic scene representation and rendering
    2                                                                with 4d gaussian splatting. arXiv preprint arXiv:2310.10642,
[53] Olga Sorkine and Marc Alexa. As-rigid-as-possible surface           2023. 1, 2
     modeling.  In Symposium on Geometry processing, pages      [66] Ziyi Yang, Xinyu Gao, Wen Zhou, Shaohui Jiao, Yuqing
     109–116. Citeseer, 2007. 4                                       Zhang, and Xiaogang Jin. Deformable 3d gaussians for high-
[54] Robert W Sumner, Johannes Schmid, and Mark Pauly. Em-             fidelity monocular dynamic scene reconstruction. In Proceed-
     bedded deformation for shape manipulation. In SIGGRAPH,           ings of the IEEE/CVF conference on computer vision and
     pages 80–es. 2007. 5, 12                                              pattern recognition, pages 20331–20341, 2024. 1, 2
[55] Edgar Tretschk, Ayush Tewari, Vladislav Golyanik, Michael      [67] Heng Yu, Joel Julin, Zoltan A Milacski, Koichiro Niinuma,
     Zollhöfer, Christoph Lassner, and Christian Theobalt. Non-         and Laszlo A Jeni. Dylin: Making light field networks dy-
      rigid neural radiance fields: Reconstruction and novel view          namic. arXiv preprint arXiv:2303.14243, 2023. 2
     synthesis of a dynamic scene from monocular video.  In      [68] Heng Yu, Joel Julin, Zoltán Á Milacski, Koichiro Niinuma,
     Proceedings of the IEEE/CVF International Conference on          and László A Jeni. Cogs: Controllable gaussian splatting.
    Computer Vision, pages 12959–12970, 2021. 1, 2                     In Proceedings of the IEEE/CVF Conference on Computer
[56] Edgar Tretschk, Ayush Tewari, Vladislav Golyanik, Michael           Vision and Pattern Recognition, pages 21624–21633, 2024.
     Zollhöfer, Christoph Lassner, and Christian Theobalt. Non-            1, 2
      rigid neural radiance fields: Reconstruction and novel view      [69] Mingtong Zhang, Kaifeng Zhang, and Yunzhu Li. Dynamic
      synthesis of a dynamic scene from monocular video. In IEEE          3d gaussian tracking for graph-based neural dynamics model-
     International Conference on Computer Vision (ICCV). IEEE,            ing. arXiv preprint arXiv:2410.18912, 2024. 1, 2, 5, 6, 7, 12,
     2021. 1, 2                                                 14
[57] Bin Wang, Longhua Wu, KangKang Yin, Uri M Ascher, Libin      [70] Richard Zhang, Phillip Isola, Alexei A Efros, Eli Shechtman,
     Liu, and Hui Huang. Deformation capture and modeling of          and Oliver Wang. The unreasonable effectiveness of deep
      soft objects. ACM Trans. Graph., 34(4):94–1, 2015. 2                  features as a perceptual metric. In CVPR, 2018. 7
[58] Chaoyang Wang, Lachlan Ewen MacDonald, Laszlo A Jeni,      [71] Tianyuan Zhang, Hong-Xing Yu, Rundi Wu, Brandon Y Feng,
     and Simon Lucey. Flow supervision for deformable nerf.         Changxi Zheng, Noah Snavely, Jiajun Wu, and William T
     In Proceedings of the IEEE/CVF Conference on Computer          Freeman. Physdreamer: Physics-based interaction with 3d
     Vision and Pattern Recognition, pages 21128–21137, 2023.           objects via video generation. In European Conference on
      1, 2                                                       Computer Vision, pages 388–406. Springer, 2024. 1, 2
[59] Guanjun Wu, Taoran Yi, Jiemin Fang, Lingxi Xie, Xiaopeng      [72] Licheng Zhong, Hong-Xing Yu, Jiajun Wu, and Yunzhu Li.
     Zhang, Wei Wei, Wenyu Liu, Qi Tian, and Xinggang Wang.           Reconstruction and simulation of elastic objects with spring-
    4d gaussian splatting for real-time dynamic scene rendering.         mass 3d gaussians. In European Conference on Computer
     In Proceedings of the IEEE/CVF conference on computer            Vision, pages 407–423. Springer, 2024. 1, 2, 6, 7, 14

## PDF 第 12 页

Supplement Index

A. Additional Details for the Shape Prior           12
B. Additional Details for 3D Gaussian Update       12
C. Additional Experimental Details                12
D. Future Work                                16

   In the supplement, we provide additional details of our
PhysTwin framework, more qualitative results across differ-
                                                                 Figure 6. Visualization of Tracking Results. We compare the
ent tasks, and further analysis of our methods. All the videos
                                                                     tracking results produced by our PhysTwin with the raw tracking
showcasing our results on various instances, interactions,                                                                               results from CoTracker3 [23]. Our PhysTwin achieves more natural
and tasks are available on our website.                        and smoother movement compared to the raw predictions from
                                                                CoTracker3.
A. Additional Details for the Shape Prior

As   mentioned               in                 the main                          paper,                       we                                   leverage                                TRELLIS                                                     [62]     node                                                                        For                                                        3D translations,                                                                      we                                                                                                      obtain                                                                                          them from                                                                                                                          the                                                                                             ˆµti ∈ˆXt.to generate            the                  full               mesh                      from a                                  single                        RGB                                              observation.                                                              predicted                                                             node                                                                                   translations                                                                 3D                                                                                                               rotations,                                                                                                                     for each                                                                T it . For
However, the potential non-rigid registration presents a non-     vertex ˆµti, we estimate a rigid local rotation Rti based on
trivial      challenge.
                                                        motions of its neighbors N(i) from time t to t + 1:  To address              these issues, we design a registration module
that leverages 2D matching to handle scale estimation, rigid    Rti = arg  min X         j     i)       j          i                                                                                     ∥R(ˆµt −ˆµt −(ˆµt+1 −ˆµt+1 )∥2.registration, and non-rigid deformation. First, to estimate             R∈SO(3) j∈N(i)
the initial rotation, we adopt a coarse-to-fine strategy. We                                                                (5)
use uniformly distributed virtual cameras placed on a sphere      In the next step, we transform Gaussian kernels using Linear
surrounding the object to render images and match 2D corre-    Blend Skinning (LBS) [20, 54, 69] by locally interpolating
spondences using SuperGlue [50]. Based on the number of      the transformations of their neighboring nodes. Specifically,
matches, we select the view with the maximum number of      for the 3D center and rotation of each Gaussian:
correspondences, providing a rough rotation estimate. We
                                                                                                       k + T k)t     (6)then apply the Perspective-n-Point (PNP) algorithm to re-          µt+1j  = X  wtjk(Rtk(µtj −ˆµtk) + ˆµtfine the 3D matched points on the generated mesh and the                  k∈N(j)
corresponding 2D pixels in the observation, estimating the
precise        rotation                matrix.
                                                                       qt+1j  = ( X  wtjkrtk) ⊗qtj,            (7)   After         estimating                    the rotation, translation and scale am-                                                                              k∈N(j)
biguities may still exist. To resolve these, we optimize the

                                                                                     kdistances between matched point pairs to solve for scale and    where Rtk ∈R3×3 and rt                                                    ∈R4 are the matrix and quater-
translation. This is simplified in the camera coordinate sys-     nion forms of the rotation of vertex k; ⊗denotes the quater-
tem, as after PNP, the matched points in the generated mesh     nion multiply operator; N(j) represents K-nearest vertices
and the corresponding points in the real observation point     of a Gaussian center µtj; wtjk is the interpolation weights be-
cloud lie along the same line connecting the origin. There-    tween a Gaussian µtj and a corresponding vertex ˆµtk, which
fore, the scale and translation optimization can be reduced      are derived inversely proportional to their 3D distance:
to optimizing only the scale. Once these transformations
are applied, the two objects should be in similar poses, with                                                                                                                  j                                                                          −ˆµk∥−1                 (8)                                                            wtjk =     ∥µt
                                                                                                                        jsome parts undergoing non-rigid deformations. To handle          Pk∈N(j) ∥µt                                                                              −ˆµk∥−1such deformations, we use an as-rigid-as-possible registra-
tion to deform the mesh into a non-rigid pose matching the      to ensure larger weights are assigned to the spatially closer
real observation. Finally, we perform ray-casting alignment,      pairs. Finally, with the updated Gaussian parameters, we
shooting rays from the camera to ensure that the observed     are able to perform rendering at timestep t + 1 with the
points align with the deformed mesh and are neither occluded     transformed 3D Gaussians.
nor occlude the mesh.
                                             C. Additional Experimental Details
B. Additional Details for 3D Gaussian Update
                                              Due to the page limit in the main paper, we provide addi-
Given the previous state ˆXt and the predicted state ˆXt+1,      tional qualitative results on different instances under various
we first solve for the 6-DoF transformation of each mass      interactions, as well as further analysis experiments.


                                                 12

## PDF 第 13 页

                       Reconstruction & Resimulation                          t                             Future Prediction                                   t
Observation

(Ours)
PhysTwin
GS-Dynamics
Spring-Gaus

Observation

(Ours)
PhysTwin
GS-Dynamics
Spring-Gaus

Observation

(Ours)
PhysTwin
GS-Dynamics
Spring-Gaus


              Figure 7. Additional Qualitative Results on Reconstruction & Resimulation and Future Prediction.

## PDF 第 14 页

Table 3. Ablations of Our Sparse-to-Dense Optimization. To better understand our optimization process, we conduct ablation experiments
comparing results with only zero-order optimization or first-order optimization. The results demonstrate that our sparse-to-dense optimization
strategy is effective in obtaining the most accurate physical parameters.


 Task                               Reconstruction & Resimulation                                         Future Prediction
 Method        CD ↓   Track Error ↓  IoU % ↑  PSNR ↑  SSIM ↑  LPIPS ↓  CD ↓   Track Error ↓  IoU % ↑  PSNR ↑  SSIM ↑  LPIPS ↓
 Zero-order Only    0.007          0.012      80.2    27.409     0.943     0.039   0.014          0.025      69.2    25.008     0.938     0.061
 First-order Only    0.008          0.012      82.7    27.913     0.944     0.037   0.019          0.034      65.7    24.572     0.936     0.067
 PhysTwin (Ours)   0.005          0.009      84.4    28.214     0.945     0.034   0.012          0.022      72.5    25.617     0.941     0.055


        Observation                                                        Future Prediction                                                                      tt
(Ours)
 PhysTwin
 GS-Dynamics

(Ours)
 PhysTwin
 GS-Dynamics

(Ours)
 PhysTwin
 GS-Dynamics

                       Figure 8. Additional Qualitative Results on Generalization to Unseen Interactions.


   Baselines. As described in the main paper, we select      setup, we incorporate our shape prior as the initialization for
two prior works for comparison: Spring-Gaus [72] and GS-      their static Gaussian construction. Since their constructed
Dynamics [69].                                           Gaussians lack the ability to generalize to different initial
   For Spring-Gaus, while it demonstrates reasonable perfor-     conditions, we evaluate their approach only on the first two
mance in modeling object-collision videos, its applicability      tasks: reconstruction & resimulation and future prediction.
is limited to relatively simple cases where objects primar-       For GS-Dynamics, we compare our method with theirs
ily deform under gravity, restricting the range of supported     across all three tasks. To enable the GNN-based dynamics
object types. To adapt Spring-Gaus [72] to our setting, we     model to produce realistic renderings, we augment it with our
extend it by introducing support for control points. Specif-     Gaussian blending strategy, enhancing its ability to generate
ically, we add additional springs that connect the control      high-quality images.
points to their neighboring object points within a prede-       Tasks. PhysTwin is constructed solely from the training
fined distance, enabling direct optimization on our dataset.      set of each data point, and its performance is evaluated based
Furthermore, to ensure compatibility with our sparse-view    on how well it matches the original video within the test set.

## PDF 第 15 页

                        Reconstruction & Resimulation                          t                             Future Prediction                                   t



 1
      Viewpoint





 2
      Viewpoint





 3
      Viewpoint





 1
      Viewpoint





 2
      Viewpoint





 3
      Viewpoint





 1
      Viewpoint





 2
      Viewpoint





 3
      Viewpoint


        Figure 9. Qualitative Results on Reconstruction & Resimulation and Future Prediction with different viewpoints.


For the generalization task, we create a dataset consisting      set of the source interaction but is applied across the entire
of interaction pairs performed on the same object. For ex-     sequence of the target interaction.
ample, we construct PhysTwin for a sloth toy based on a                                                              Qualitative Results. We present more qualitative re-
scenario where it is lifted with one hand and then evaluate                                                                     sults for different instances across various interactions on
its performance in a different scenario where its legs are                                                         our three tasks: reconstruction & resimulation, future pre-
stretched using both hands. The dataset includes 11 such                                                                diction (Fig. 7), and generalization to unseen interactions
pairs, and since each pair allows for two possible transfer                                                                     (Fig. 8). All results demonstrate the superior performance of
directions (i.e., from one interaction to another or vice versa),                                                          our method compared to prior work.
this results in a total of 22 generalization experiments. In this
                                                              Different Viewpoints. Fig. 9 presents the visualizationtask, PhysTwin is still constructed using only the training
                                                             of the rendering results from different viewpoints, demon-

## PDF 第 16 页

strating the robustness of our PhysTwin in handling various      ios. Furthermore, while our framework optimizes physical
viewpoints.                                                 parameters based on a single type of interaction, expanding
   Ablation Study on Hierarchical Optimization. To bet-     to multiple action modalities could further enhance the esti-
ter understand the importance of our hierarchical sparse-to-    mation of an object’s intrinsic properties. Learning from a
dense optimization strategy, we conduct ablation studies with     broader range of interactions may reveal richer physical char-
two variants: one using only zero-order optimization and the      acteristics and improve robustness. Beyond reconstruction
other using only first-order optimization. These experiments     and resimulation, our method opens up exciting possibilities
are performed on both the reconstruction & resimulation task      for downstream applications, particularly in robotics. By
and the future prediction task. Table 3 presents the results     providing a structured yet efficient digital twin, our approach
of different variants. Our complete pipeline achieves the      significantly simplifies real-to-sim transfer, reducing the re-
best performance across both tasks. The variant with only      liance on domain randomization for reinforcement learning.
zero-order optimization fails to capture fine-grained material     Additionally, the high-speed simulation and real-time ren-
properties, limiting its ability to represent different objects.     dering capabilities of our framework pave the way for more
On the other hand, the variant with only first-order dense      effective model-based robotic planning. By bridging the
optimization neglects the optimization of non-differentiable     gap between perception and physics-based simulation, our
parameters, such as the spring connections. The default    method lays a solid foundation for future advancements in
connections fail to accurately model the real object struc-     both computer vision and robotics.
ture, and the connection distances between control points
and object points cannot be effectively handled with a fixed
initialization value.
   Tracking Results. Fig. 6 shows the visualization of our
tracking results and the pseudo-GT tracking results from
CoTracker3 [23]. Even though our PhysTwin is optimized
with noisy GT tracking, our model achieves much better and
smoother tracking results during both the reconstruction &
resimulation and future prediction tasks.
  Data Efficiency Experiment. To further analyze the
performance difference between our method and the GNN-
based approach, we collected 29 additional data points on
the same motion (double-hand stretching and folding rope),
bringing the total to 30 data points for training the neural
dynamics model. In contrast, our method is trained using
only 1 data point. The results show that GS-Dynamics does
not show a performance boost even with 30 times more
data than our method. This indicates that their approach is
data-hungry, whereas our method demonstrates significantly
better data efficiency in learning a useful dynamics model.
Even with 30 times more data, the learning-based method
still struggles to capture precise dynamics as effectively as
our approach.

D. Future Work

Our work takes an important step towards constructing an
effective physical digital twin for deformable objects from
sparse video observations. Unlike existing methods that
primarily focus on geometric reconstruction, our approach
integrates physical properties, enabling accurate resimula-
tion, future prediction, and generalization to unseen interac-
tions. Despite using three RGBD views in our current setup,
our framework is inherently flexible and can extend to even
sparser observations. With appropriate priors, a single RGB
video could serve as a promising and scalable alternative,
making our approach more applicable to in-the-wild scenar-
