4
2
0
2

t
c
O
1
3

]

V
C
.
s
c
[

3
v
7
2
9
4
1
.
6
0
4
2
:
v
i
X
r
a

GIC: Gaussian-Informed Continuum for Physical
Property Identification and Simulation

Junhao Cai1∗ Yuji Yang2∗ Weihao Yuan3† Yisheng He3
Zilong Dong3 Liefeng Bo3 Hui Cheng2 Qifeng Chen1
1The Hong Kong University of Science and Technology, 2Sun Yat-sen University, 3Alibaba Group
∗ Equal contribution, order determined by coin toss. † Corresponding author.

Abstract

This paper studies the problem of estimating physical properties (system identi-
fication) through visual observations. To facilitate geometry-aware guidance in
physical property estimation, we introduce a novel hybrid framework that leverages
3D Gaussian representation to not only capture explicit shapes but also enable
the simulated continuum to render object masks as 2D shape surrogates during
training. We propose a new dynamic 3D Gaussian framework based on motion
factorization to recover the object as 3D Gaussian point sets across different time
states. Furthermore, we develop a coarse-to-fine filling strategy to generate the
density fields of the object from the Gaussian reconstruction, allowing for the
extraction of object continuums along with their surfaces and the integration of
Gaussian attributes into these continuums. In addition to the extracted object
surfaces, the Gaussian-informed continuum also enables the rendering of object
masks during simulations, serving as 2D-shape guidance for physical property
estimation. Extensive experimental evaluations demonstrate that our pipeline
achieves state-of-the-art performance across multiple benchmarks and metrics.
Additionally, we illustrate the effectiveness of the proposed method through real-
world demonstrations, showcasing its practical utility. Our project page is at
https://jukgei.github.io/project/gic.

1

Introduction

Identifying the physical properties of objects (i.e., system identification) is essential for numerous
applications such as games, digital twins, and robotic manipulation [1–3]. Although humans can
intuitively deduce the underlying physical properties with a single glance when the object under-
goes deformation, estimating the properties with only visual observations remains challenging for
computational perceptual algorithms.

To tackle this challenge, many established methods [4–6] adopt the assumption of elastic material [7]
and perform physics-based modeling based on mass-spring systems (MSS) or finite element method
(FEM) to model and simulate the dynamics of the objects. Such an assumption inevitably restricts
the ability to simulate more general types beyond elastic materials, such as fluids or granular media.
Another problem of previous methods lies in that many methods [8–10] require the ground-truth
full knowledge of object geometry for the identification, which limits their practicality. Some
subsequent methods [5, 4] turn to recover the geometries and physical properties from observations
in a decoupled manner. Specifically, these methods first extract object geometries by making use
of stereo observations or dynamic neural reconstruction [11] from RGB video sequences, and then
perform simulation directly on the point clouds or after the tetrahedral mesh conversion. While
these methods introduce explicit geometries to guide the estimation of physical properties, the noisy
reconstruction results usually lead to degraded system identification performance.

38th Conference on Neural Information Processing Systems (NeurIPS 2024).

Recently, PAC-NeRF [12] integrates neural radiance fields (NeRF) [13] with a continuum dynamic
model to tackle the above problems. The object geometries and physical properties are captured
in a unified framework. Despite its effectiveness, this method possesses two limitations. Firstly,
the implicit shapes represented by NeRF often lead to inferior geometries, which might cause
inaccurate trajectories during simulation. Secondly, PAC-NeRF renders the novel views of deformed
objects based on the appearance radiance field reconstructed from the static scene, which might
introduce texture distortion, particularly when objects undergo significant deformations, resulting in
discrepancies between the rendered and the observed images [14].

To address these limitations, this paper proposes a novel hybrid solution based on 3D Gaussians [15,
16] and material point method (MPM) [17, 18]. The core strength of this work is that we make
use of both 3D shapes from dynamic 3D Gaussian reconstruction and 2D shapes rendered by the
Gaussian-informed continuum for physical property estimation.

To generate more precise shapes to reason physical property, we first propose a motion-factorized
dynamic 3D Gaussian network to conduct dynamic scene reconstruction. We then extract the
continuum from the recovered 3D Gaussians at each frame by leveraging a coarse-to-fine filling
strategy to generate the density field of the object progressively. The resulting density fields can be
used to sample continuum particles for simulation and extract object surfaces as 3D-shape supervision
in physical property estimation. To eliminate the appearance distortion caused by large deformation
in PAC-NeRF, we further assign Gaussian attributes to the continuum particles where the opacity and
scale attributes are evaluated from the density field. Such Gaussian-informed continuum are able to
render object masks during simulation, which can be regarded as a 2D-shape representation to guide
the estimation and effectively avoid using inferior rendering results for learning physical properties.

To demonstrate the superiority of the proposed method over other baselines, we conduct three types
of experiments, including evaluations of physical properties, dynamic reconstruction, and future state
simulation. We also demonstrate a real-world application in digital twins and robotic manipulation,
showing the applicability of the proposed method in real-world scenarios.

Our contributions are summarized as follows.

• We propose a novel hybrid pipeline that takes advantage of the 3D Gaussian representation of the
object to both acquire 3D shapes and empower the simulated continuum to render 2D shapes for
physical property estimation.

• We propose a novel dynamic 3D Gaussian framework with motion factorization to achieve more
precise dynamic reconstruction. We also propose a coarse-to-fine filling strategy to generate the
density field of the object, which can be utilized to extract object surfaces and obtain Gaussian-
informed continuum particles.

• Extensive experiments show that our pipeline attains state-of-the-art performance on existing
benchmarks with a wide range of metrics. We also present a real-world demonstration to show the
efficiency of the proposed method.

2 Related Work

Dynamic reconstruction. Reconstructing dynamic scenes from monocular or multi-view video(s) is
a long-standing problem in the computer vision community [19, 20]. Previous works exploit neural
implicit representation [21, 22] for non-rigid reconstruction. These methods either reconstruct the
scene in a frame-wise manner [23, 24] or maintain a canonical shape and model the deformation
with a neural network [25, 26, 11, 27]. While effective for novel view synthesis, these methods
often require extensive training time and can result in noisy deformations owing to the implicit
representation, which may compromise the utility of the recovered geometries for physical property
estimation [12]. Recent progress in 3D Gaussian Splatting (3DGS) technique [15] stands out to be a
prevalent method for 3D reconstruction and novel view synthesis because of the abilities of explicit
shape modeling and extremely fast view rendering. Similar to non-rigid NeRF, many follow-up
works extend the 3DGS into 4D by treating each frame separately [28] or decomposing a scene
into a canonical 3D Gaussian point cloud and a deformation model that warps the canonical shape
into a specific scene [16, 29, 30]. In this paper, we draw upon these prior studies [16, 29] and
propose a novel motion-factorized dynamic 3D Gaussian network to achieve better performance on
reconstruction and novel view synthesis.

2

System identification. Understanding the physics laws of the 3D world is beneficial for simula-
tion [31–35, 6] and manipulation [2, 3, 36–38]. However, unveiling these properties from visual
information is an extremely difficult task due to the ambiguity introduced by incomplete obser-
vation and the high degrees of freedom of the scene. Early works [39, 40] study the problem by
learning physical properties via interactions. With recent improvements in differentiable physics
simulation [17, 18, 41–45], many methods turn to evaluate the physical properties by comparing the
rendering results with 2D ground truth given the prior knowledge about the object geometry. VEO [5]
presents a differentiable simulator to learn patterns from 4D reconstruction and force-displacement
measurements. Another approach [4] eliminates the dependence of captured forces by proposing an
iteration framework between deformation tracking and parameter optimization. While these methods
demonstrate promising results, the inferior reconstruction might lead to degraded performance, and
the assumption of elastic material restricts the applicability. PAC-NeRF [12] instead proposes a single
framework to recover both the unknown geometry and physical properties of deformable objects
from multi-view video sequences. However, the inferior geometries and blurry rendered images
might have detrimental effects on physical property reasoning. In this work, we adopt MPM as our
simulation framework following the approach used in PAC-NeRF due to its ability to simulate a
variety of materials [6, 46–48]. Unlike previous approaches, we utilize dynamic 3D Gaussians to
reconstruct explicit 3D geometries and generate simulatable continuum particles. Furthermore, we
enhance the particles with Gaussian attributes, facilitating the rendering of 2D shapes, and thereby
improving physical parameter estimation.

3 Preliminary

In this section, we briefly review the core idea of 3D Gaussian Splatting (3DGS) [15] and introduce
its point-based alpha blending to render depth maps and foreground masks. Typically, 3DGS utilizes
3D Gaussians, each defined by a central point µ0, a covariance matrix Σ0, a density value σ, and a
color attribute c, to efficiently render images from specific viewpoints. Each point is denoted as

G(x) = exp(−

0 (x − µ0)),

(x − µ0)T Σ−1

1
2
where Σ0 can be factorized as Σ0 = R0S0ST
0 RT
0 , in which R0 is a rotation matrix represented by
a quaternion vector r0 ∈ R4, and S0 is a a diagonal scaling matrix characterized by a 3D vector
s0 ∈ R3. If we consider isotropic Gaussian representation, the scaling matrix can be written as s0I,
where s0 is a scalar and I is the identity matrix. When performing splatting, the 3D Gaussians are
projected into 2D with the covariance matrix defined as Σ′
0 = JW Σ0W T J T , where J is the Jacobian
of affine approximation of the projective transformation [49], and W is the viewing transformation
matrix. The rendered color I(u) with its foreground mask A(u) at pixel u are then evaluated by
integrating N ordered slatted Gaussians via the point-based alpha blending. Since the depth of each
Gaussian point at a specific view can be obtained according to its transformation matrix, we can
further render the depth map D using the same blending method [16, 50], as
(cid:88)

(cid:88)

(cid:88)

(1)

I(u) =

Tiαici,

A(u) =

Tiαi,

D(u) =

Tiαidi,

(2)

i∈N

i∈N

i∈N

where Ti = (cid:81)i−1
point i, and di is the depth of the Gaussian point at the specific view.

j=1(1 − αj) is the accumulated transmittance, αi is the probability of termination at

4 Method

4.1 Problem Definition and Overview

In this work, we aim to reconstruct the geometries and the physical properties of various object types
from multi-view videos. Formally, given a set of video sequences {Vi|i = 1...n} with moving object
and the corresponding camera extrinsic and intrinsic parameters {(Ti, Ki)|i = 1...n}, the goal of this
task is to recover the explicit geometries of the object represented by continuum particles P (t) and
its corresponding physical parameters Θ (e.g., Young’s modulus E and Poisson’s ratio ν for elastic
objects). We follow the assumption in PAC-NeRF and PhysGaussian [12, 51] that the object types
(e.g., elastic, granular, Newtonian/non-Newtonian, plastic) are known and the physical phenomenon
follows continuum mechanics [17, 52].

3

Figure 1: Overview. (a) Continuum Generation: Given a series of multi-view images capturing a moving
object, the motion-factorized dynamic 3D Gaussian network is trained to reconstruct the dynamic object as 3D
Gaussian point sets across different time states. From the reconstructed results, we employ a coarse-to-fine
strategy to generate density fields to recover the continuums and extract object surfaces. The continuum is
endowed with Gaussian attributes to allow mask rendering. (b) Identification: The MPM simulates the trajectory
with the initial continuum P(0) and the physical parameters Θ. The simulated object surfaces and the rendered
masks are then compared against the previously extracted surfaces (colored in blue) and the corresponding masks
from the dataset. The differences are quantified to guide the parameter estimation process. (c) Simulation:
Digital twin demonstrations are displayed. Simulated objects (colored by stress increasing from blue to red),
characterized by the properties estimated from observation, exhibit behavior consistent with real-world objects.

The overview of the proposed pipeline is illustrated in Fig. 1, which consists of three modules: a
motion-factorized dynamic 3D Gaussian network (Sec. 4.2) for 4D reconstruction of the object, a
coarse-to-fine density field generation strategy (Sec. 4.3) for continuum generation, surface extraction,
and Gaussian attribute assignment, and a procedure (Sec. 4.4) showing how we leverage Gaussian-
informed continuum and extracted surfaces to estimate physical properties.

4.2 Motion-factorized Dynamic 3D Gaussian Network

Our dynamic 3D Gaussian network follows existing frameworks [16, 29, 30] that simultaneously
maintain a canonical 3D Gaussian set and a deformation field modeled by a neural network to warp
the canonical shape into object states at specific times. The core idea of this pipeline, presented in
Fig. 2, is that the motion of every point in the object can be decomposed into a small range of motion
bases.

Architecture. We first factorize the entire motion into Nm bases that are modeled by a fully connected
neural network, where every basis shares a common backbone except the final layer. The output
of each basis consists of the deformations at position dµi(t) ∈ R3 and at scale dsi(t) ∈ R. To
model the exact deformation for each position, we next propose a lightweight coefficient network that
maps the positions at canonical space with specific time to their corresponding motion coefficients
w(µ0, t) ∈ RNm. Therefore, the deformed position and the scale for each Gaussian point are
evaluated by the linear combination of the motion basis according to the motion coefficients:

µ(t) = µ0 +

Nm(cid:88)

i=1

wi(µ0, t)dµi(t),

s(t) = s0 +

Nm(cid:88)

i=1

wi(µ0, t)dsi(t).

(3)

In this work, we regard all the Gaussians as isotropic kernels, which has been demonstrated as an
effective way to simplify the model and better reconstruct the scene [6, 53]. We should note that

4

Motion-factorized Dynamic 3D Gaussian NetworkMulti-view Video Capture3D GaussiansContinuumsSurfacesLossSimulatedContinuumsSimulatedSurfaces and MasksTargetSurfaces and MasksGaussian-informed Continuum GenerationCoarse-to-fine density field generation strategy Gaussian attribute injectionIsotropic kernelMaterial Point Method(MPM)Physical Parameterforwardbackward(a)(b)(c)()0ObservationGrasping in simulatorGrasping in real worldhighlowFigure 2: The pipeline of the proposed dynamic 3D Gaussian network. The motion network backbone consists
of 8 fully connected (FC) layers. The output of the motion block is fed to Nm heads to generate motion residuals.
The coefficient network contains 4 FC layers.

although previous works [29, 54] also perform motion decomposition modeling, our pipeline shows
two major differences: 1) instead of modeling each basis with an independent neural network, our
module shares a common backbone. Our key observation is that for reconstructing a dynamic object,
all points on the object should follow a similar moving tendency, and the final heads of the neural
network are sufficient to model the details of different parts of the object; 2) to increase the ability to
fit high rank of the dynamic scene [16], we model the motion coefficients as time-variant variables
rather than constant Gaussian attributes [29].

Optimization. We employ the same setting in [16] to train our pipeline. Concretely, the canonical
3D Gaussians are initialized with points randomly sampled from the given bounding box of the
scene. We start training the deformation network after 3,000 iterations of warm-up for the 3D
Gaussians. Similar to previous works [16, 29], we optimize the pipeline by computing the L1 norm
and Structural Similarity Index Measure (SSIM) between the rendered image I and the ground truth
image ˜I. Moreover, since large scales may lead to inaccurate reconstructed shapes [55], we thus
perform L1 norm on the scale attributes of all the points to recover more fine-grand shapes of the
object. Therefore, the overall loss function is defined as:

Lgs = L1(I, ˜I) + λ1Lssim(I, ˜I) + λ2L1(s(t)),

(4)

where λ1 and λ2 are balancing hyperparameters. More in-depth analysis of the proposed pipeline,
including implementation details and effects of scale regularization, are presented in Appendix A.1.

4.3 Gaussian-informed Continnum Generation

Coarse-to-fine density field generation. Since the reconstructed Gaussian particles are served for
rendering only, meaning that they are not evenly distributed on the objects, they cannot be directly
used for simulation [51]. Therefore, we propose a novel coarse-to-fine filling strategy to iteratively
generate density fields of the object based on the reconstructed Gaussian particles from Eqn. 3 and
the internal particles filtered by the rendered depth maps. The proposed strategy is presented in Alg. 1.
The implementation details and visual results are illustrated in Appendix A.2.

Concretely, the internal particles, initialized by uniform sampling from the bounding box of Gaussian
particles, are filtered by projecting the particles to various images to compare the projected depth
with rendered depth values (lines 1-6 in Alg. 1). The resulting particles can roughly represent the
shape of the object. However, as denoted in Eqn. 2, the rendered depth maps are evaluated in an
accumulated manner, making them less precise in representing the object surface.

Therefore, We employ a coarse-to-fine filling strategy by iteratively upsampling the density field and
reassigning the densities on the indices computed from both the Gaussian and internal particles (lines
8-16 in Alg. 1). Fig. 3 provides a sketch illustration of the proposed strategy. Specifically, due to
the large grid size at the initial stage, the object is completely inside the voxels with high densities.
Next, we sequentially perform upsampling (line 10), mean filtering (line 13), and reassigning the

5

Motion-factorized Dynamic 3D Gaussian NetworkMotion NetworkCoefficient NetworkMotion NetworkCoefficient NetworkMotion-factorized Dynamic 3D Gaussian NetworkMotion NetworkCoefficient Network: Add: Multiply: Add: Multiplyt00d1dmNdmNdsmNw1w1ds0ds0w0s()t0Motion-factorized Dynamic 3D Gaussian NetworkMotion NetworkCoefficient Network: Add: Multiplyt00d1dmNdmNdsmNw1w1ds0ds0w0s()t0()t0()(a)

(b)

(c)

(d)

(e)

Figure 3: Sketch illustration of the coarse-to-fine filling strategy. Gaussian and internal particles are depicted
in green and blue, respectively. (a) Voxels containing particles are assigned high densities. (b) Following the
upsampling and smoothing of the field, densities near boundaries become blurred (indicated in light yellow). (c)
The particles are again used to correct the voxels that contain particles with high densities. (d) and (e) repeat the
previous operations to achieve a more detailed shape.

field (line 14) at each iteration. The first two operations produce more fine-grained shapes, and the
reassigning operation ensures high densities at the surface to avoid over-erosion caused by the first
two steps. Finally, the continuum particles with the corresponding object surfaces can be extracted by
thresholding the density field (lines 16-17 in Alg. 1).

Algorithm 1 Pseudo code for coarse-to-fine filling
Input:

Gaussian particles at time t: PG(t) = {(µ(t), s(t), σ, c)};
n pairs of camera extrinsic and intrinsic parameters: {(Ti, Ki)|i = 1...n};
parameters: grid size ∆x; number of upsampling steps nu; thresholds thmin, thmin;

Output:

˜Di = GaussianSplatting(PG(t), Ti, Ki);
(uin, vin), din ← P roj(Pin, Ti, Ki);
Pin ← Pin[ ˜Di(uin, vin) ≤ din];

Continuum particles ˜P (t) and the corresponding surface ˜S(t);
1: Randomly sample an initial particle set Pin from the bounding box of {µ(t)};
2: for i ← 1, n do
3:
4:
5:
6: end for
7: Initialize the zero-value density field F (t) with ∆x and the bounding box of {µ(t)};
8: for j ← 1, nu do
if j ̸= 1 then
9:
10:
11:
12:
13:
14:
15: end for
16: ˜P (t) ← GetP osition(thmin ≤ F (t));
17: ˜S(t) ← GetP osition(thmin ≤ F (t) ≤ thmax);

end if
F (t) ← M eanF iltering(F (t));
F (t)[p, q, r] = 1, where p, q, r ← Discretize(Pin ∪ {µ(t)});

F (t) ← T rilinearInterpolation(F (t), 2)
F (t)[p, q, r] = 1, where p, q, r ← Discretize(Pin ∪ {µ(t)});

▷ render depth map at view i
▷ obtain image indices and depths of Pin at view i
▷ filter out particles that are outside the object

▷ upsample F (t) with scale factor 2

Gaussian-informed continuum. In PAC-NeRF, the particles are equipped with appearance features
to enable image rendering for the continuum at different states. We can also achieve this function by
treating the particles as Gaussian kernels and re-train the particles using the visual data. However,
this process is cumbersome and will also face the same issue in PAC-NeRF where distorted RGB
images will be rendered when large deformation occurs. Therefore, instead of injecting appearance
attributes, we opt to assign density and scale attributes to the particles where the densities originate
from the density field, and the scale attributes can be directly obtained by the field grid size. The
Gaussian-informed continuum is defined as a set of triplets:

P ˜P = {(˜p, s∆x, σF )},

(5)

where ˜p ∈ ˜P , s∆x = ∆x/2nu , and σF = F [Discretize(˜p)] (we neglect t in the notation for
simplicity). Therefore, we only render object masks as 2D shape surrogates for supervision.

6

4.4 Geometry-aware Physical Property Estimation

With the Gaussian-informed continuum at initial state P ˜P (0) and the extracted surfaces ˜S(t) in place,
we can employ MPM to perform simulation on the continuum and evaluate the difference in terms
of both the 3D and 2D shapes. Concretely, after a rollout by MPM given the current estimation of
physical parameters, we obtain a trajectory P (t) with corresponding object surfaces S(t). We thus
can render object masks over the trajectory. Then the loss of the current rollout can be computed as:

Lppe =

1
m

m
(cid:88)

i=1

[LCD(S(ti), ˜S(ti)) +

1
n

n
(cid:88)

j=1

L1(Aj(ti), ˜Aj(ti))],

(6)

where LCD and L1 are chamfer distance and L1 norm respectively, S(ti) denotes the simulated
surface at time ti, Aj(ti) is the rendered mask at view j, and ˜Aj(ti) represents the object mask of
the image extracted from video Vj at time ti. Due to the differential property of the simulator, the
evaluated loss is used to optimize the target physical parameters Θ.

5 Experiments

Datasets. To thoroughly assess our proposed method, we employ two sources of data introduced
by PAC-NeRF [12] and Spring-Gaus [6]. Concretely, PAC-NeRF contributes two synthetic datasets
generated by MLS-MPM framework [18]. Each object in both datasets includes RGB images from
11 distinct viewpoints, with approximately 14 frames per viewpoint. The datasets feature a range
of materials, including elastic and plastic objects, granular media, and both Newtonian and non-
Newtonian fluids. The first dataset contains 45 cross-shape objects with different initial conditions and
ground-truth values of physical properties, while the second one consists of 9 objects with different
shapes. The interpretation of the physical parameters is listed in Appendix A.9 and A.10. Spring-Gaus
generates a synthetic dataset of elastic objects and collects a real-world dataset containing both static
and dynamic scenes. The synthetic data contains 30 frames in each of 10 viewpoints. While the
real-world data only contains 3 viewpoints for each object in the dynamic scene, it captures 50-70
images from various viewpoints for the static scene. Moreover, we follow previous works [12, 6] and
use the off-the-shelf matting [56] or segmentation [57] techniques to obtain object masks.

Baselines. For dynamic reconstruction, we compare with PAC-NeRF and the current state-of-the-art
deformable 3D Gaussian method DefGS [16] on the PAC-NeRF synthetic dataset. More comparison
of our dynamic 3D Gaussian pipeline on other widely-used datasets such as D-NeRF [25] is presented
in Appendix A.1.3. For system identification, we employ PAC-NeRF as the baseline and evaluate the
performance using the two datasets introduced in PAC-NeRF. To further demonstrate the precision of
the proposed method in terms of geometry recovery and future prediction, we perform experiments
on the Spring-Gaus synthetic dataset and compare the results with PAC-NeRF and Spring-Gaus.

Metrics. The evaluation metrics in the experiments include 1) Chamfer Distance (CD), with units
expressed in 103mm2; 2) Earth Mover’s Distance (EMD); 3) Peak Signal-to-Noise Ratio (PSNR); 4)
Structural Similarity Index Metric (SSIM) [58]; and 5) Mean Absolute Error (MAE), with values
scaled by a factor of 100. The first two metrics are used to evaluate discrepancies between the
reconstructed and ground-truth point clouds. PSNR and SSIM are leveraged on the Spring-Gaus
dataset to validate the precision of future state prediction. We compute the mean absolute error for
the evaluation of physical property estimation.

5.1 Evaluation on PAC-NeRF Synthetic Dataset

Comparison on dynamic reconstruction. In this experiment, we first perform dynamic Gaussian
reconstruction on the cross-shaped object dataset using DefGS and our proposed method, respectively.
We then employ the same filling strategy on the reconstructed Gaussians at each time state to generate
the continuum, which is regarded as the final recovered geometry of the object and used to make
comparisons with the oracle shape to compute CD and EMD. Since PAC-NeRF jointly recovers both
geometries and physical parameters, we use the final estimated results to generate the trajectory for
evaluation.

The results, reported in Tab. 1, show that our method outperforms the baselines on both metrics
and achieves more precise reconstruction performance on most objects. Specifically, we find that

7

Figure 4: Comparison between rendered and ground-truth images. (a) Rendered RGB images by PAC-NeRF. (b)
Rendered masks by our method. (c)-(d) Ground-truth RGB images and masks. The mask-based supervision can
introduce fewer discrepancies compared with the RGB-based guidance when the estimated shapes are correct.

Table 1: Dynamic Reconstruction on PAC-NeRF Dataset

Metrics

CD ↓

EMD ↓

Methods

PAC-NeRF [12] DefGS [16]

Ours

PAC-NeRF [12] DefGS [16]

Ours

Newtonian
Non-Newtonian
Elasticity
Plasticine
Sand
Mean

0.277
0.236
0.238
0.429
0.212
0.278

0.269
0.216
0.191
0.213
0.281
0.234

0.243
0.195
0.178
0.196
0.25
0.212

0.027
0.025
0.025
0.029
0.025
0.026

0.027
0.024
0.022
0.024
0.028
0.025

0.025
0.022
0.02
0.022
0.025
0.023

the NeRF representation used by PAC-NeRF usually leads to overly large shape generation. While
DefGS performs well on elastic objects, its performance degenerates when modeling objects with
large deformations, such as granular media and fluids. Our method can better handle these objects
due to the flexibility of trajectory representation.

Comparison on system identification.
We evaluate the performance of system
identification of the two datasets proposed
by PAC-NeRF. For the first dataset, we
compute the MAE of the parameters for
each type of object. To demonstrate the ef-
fectiveness of the 2D shape representation,
we also conduct experiments on the second
dataset by only using masks for supervi-
sion on our method, namely “Ours*”. For
the second dataset, we execute 10 times of
our method with different random seeds for
each object instance and report the mean
value of the estimation results. The training
details are illustrated in Appendix A.3.

Table 2: System identification performance on PAC-NeRF
cross-shaped object Dataset

Type

Parameters PAC-NeRF Ours*

Ours

Newtonian

log10(µ)
log10(κ)
v

11.6±6.60
16.7±5.37
0.86±1.45

1.53±1.45
16.0±22.4
0.20±0.08

1.53±1.31
14.8±19.2
0.20±0.07

Non-
Newtonian

Elasticity

log10(µ)
log10(κ)
log10(τY )
log10(η)
v

24.1±21.9
44.0±26.3
5.09±7.41
28.7±23.3
0.29±0.13

32.9±44.6
17.7±20.2
3.74±3.72
34.9±24.1
0.68±0.28

13.5±18.2
12.9±16.8
4.80±3.92
40.7±24.6
0.19±0.09

log10(E)
ν
v

3.02±3.72
4.35±5.08
0.50±0.23

3.27±4.13
3.10±2.00
0.78±0.26

2.43±3.29
2.52±2.03
0.82±0.32

The results, reported in Tab. 2 and Tab. 3,
show that the proposed hybrid pipeline
can achieve more accurate estimation
over a wide range of entries and objects,
which demonstrate the effectiveness of the
geometry-aware guidance. Fig. 4 visual-
izes the RGB images rendered by PAC-
NeRF and the masks rendered by our
method. We can see that when large de-
formation occurs, the rendered RGB image
becomes distorted, while the rendered mask can effectively reduce such effect and get better perfor-

28.1±24.4
1.24±0.90
10.2±5.34
0.13±0.04

83.8±68.4
11.2±14.5
18.9±15.7
0.56±0.17

25.6±29.4
1.67±1.21
9.59±5.00
0.22±0.10

log10(E)
log10(τY )
ν
v

4.21±0.08
0.24±0.08

4.89±1.10
0.21±0.08

4.18±0.52
0.17±0.05

θf ric
v

Plasticine

Sand

8

(a)(b)(c)(d)Table 3: System Identification Performance on PAC-NeRF Dataset

Droplet
Letter

Cream

PAC-NeRF [12]
µ = 2.09 × 102, κ = 1.08 × 105
µ = 83.85, κ = 1.35 × 105
µ = 1.21 × 105, κ = 1.57 × 106 ,
τY = 3.16 × 103, η = 5.6

Ours
µ = 2.01 × 102, κ = 0.18 × 105
µ = 95.05, κ = 1.00 × 105
µ = 1.03 × 104, κ = 1.48 × 106,
τY = 2.98 × 103, η = 6.6
µ = 4.19 × 103, κ = 9.24 × 104,
τY = 226, η = 9.1
E = 0.99 × 106, ν = 0.295
E = 3.08 × 105, ν = 0.284

Ground Truth
µ = 200, κ = 105
µ = 100, κ = 105
µ = 104, κ = 106 ,
τY = 3 × 103, η = 10
µ = 5 × 103, κ = 105 ,
τY = 200, η = 10
E = 106, ν = 0.3
E = 3 × 105, ν = 0.3

Torus
Bird

Toothpaste µ = 6.51 × 103, κ = 2.22 × 105 ,
τY = 228, η = 9.77
E = 1.04 × 106, ν = 0.322
E = 2.78 × 105, ν = 0.273
E = 3.84 × 106, ν = 0.272, τY = 1.69 × 104 E = 1.58 × 106, ν = 0.322, τY = 1.56 × 104 E = 2 × 106, ν = 0.3, τY = 1.54 × 104
E = 1.61 × 105, ν = 0.293, τY = 3.57 × 103 E = 0.98 × 106, ν = 0.296, τY = 3.76 × 103 E = 106, ν = 0.3, τY = 3.85 × 103
f ric = 36.1◦
θ0

f ric = 38.0◦
θ0

Playdoh
Cat

f ric = 40◦
θ0

Trophy

Table 4: Future State Simulation on Spring-Gaus Synthetic Dataset

torus

cross

cream apple

paste

chess

banana Mean

↓ Spring-Gaus [6]
D
PAC-NeRF [12]
C
Ours

↓ Spring-Gaus [6]
D
PAC-NeRF [12]
M
Ours
E

↑ Spring-Gaus [6]
R
PAC-NeRF [12]
N
S
Ours
P

↑ Spring-Gaus [6]
M
PAC-NeRF [12]
I
S
Ours
S

2.38
2.47
0.75

0.087
0.055
0.034

16.83
17.46
20.24

0.919
0.913
0.942

1.57
3.87
1.09

0.051
0.111
0.058

16.93
14.15
30.51

0.940
0.906
0.939

2.22
2.21
0.94

0.094
0.083
0.050

15.42
15.37
19.15

0.862
0.858
0.909

1.87
4.69
0.22

0.076
0.108
0.030

21.55
19.94
26.89

0.902
0.878
0.948

7.03
37.7
2.79

0.126
0.192
0.096

14.71
12.32
16.31

0.872
0.819
0.894

2.59
8.2
0.77

0.095
0.155
0.059

16.08
15.08
18.44

0.881
0.848
0.912

18.48
66.43
0.12

0.135
0.234
0.017

17.89
16.04
29.29

0.904
0.886
0.964

5.16
17.94
0.95

0.095
0.134
0.049

17.06
15.77
22.98

0.897
0.870
0.930

mance. By leveraging both 3D and 2D shape guidance, our method obtains the best results on most
entries. More qualitative results are available in the supplementary video.

5.2 Evaluation on Spring-Gaus Synthetic Dataset

Comparison on future state simulation. To further demonstrate the performance of our proposed
method, we follow the setting in Spring-Gaus [6] that uses the first 20 frames as training data and the
subsequent 10 frames for evaluation. Concretely, we first perform system identification based on our
method and then use the estimated physical parameters and the continuum to simulate a trajectory
that includes the states of the 30 frames. Therefore, we can compute CD and EMD between the
simulated continuum and the ground-truth point cloud. Since we know the exact position of the
continuum at each time state after estimation, we can assign time-invariant Gaussian attributes by
training Gaussians on the continuum using the first 20 frames of RGB images, which enable image
rendering at novel views and states. Therefore, we can compute PSNR and SSIM at any time state.

The results of future state prediction are presented in Tab. 4, and the results of reconstruction on the
training states are reported in Appendix A.4. We observe that our method significantly outperforms
the baselines on CD and EMD metrics over almost all object instances, which shows the superiority
of our method for both geometry recovery and system identification. The results of PSNR and SSIM
show that leveraging dynamic visual data to train the Gaussian attributes on the continuum improves
rendering quality. This further reveals that the generated trajectories are precise such that the particles
are consistent to contribute to the rendering for the same region of the object at different time states.

5.3 Real-world Application: Digital Twins in Robotic Grasping Scenario

To demonstrate the efficacy of the proposed method in real-world scenarios, we perform system
identification on the real-world dataset collected by Spring-Gaus [6], as shown in Fig. 5. Since the
real-world dataset consists of static and dynamic scenes for each object, we follow the procedure
introduced by Spring-Gaus to progressively 1) reconstruct a Gaussian set of the object from the

9

Figure 5: Real-world application. Left: Identification and future state simulation. Right: Grasping simulation.
The stress on the simulated object is indicated by blue (low) to red (high). The gripper widths from top to bottom
are set to 6cm, 4.5cm, and 3.5cm, respectively.

static scene, 2) transform the static Gaussian set to the initial state of the dynamic scene based on a
registration network similar as iNeRF [6, 59], and 3) perform system identification from the dynamic
observation by our method “Ours*” due to the lack of sufficient images for dynamic reconstruction.
Subsequently, we establish robotic platforms in both simulated and real-world environments, each
equipped with UR10 robot arms configured identically. We then execute grasp attempts on both the
reconstructed objects with the estimated properties in the simulation and the corresponding real-world
objects under the same configuration. The results of more objects, and more details about the training
and the experiment setting are presented in Appendix A.5. From the results shown in Fig. 5, we see
that our method demonstrates its capability to effectively model the deformation experienced by the
objects upon impact with a surface. Furthermore, by applying identical gripper forces to both the
simulated and real-world versions of the objects, we observe similar deformation behaviors. This
consistency in deformation under identical conditions supports that the estimated physical parameters
closely mirror the real-world properties of the objects.

6 Conclusion and Limitations

This paper proposes a novel solution that leverages the 3D Gaussian representation of objects to
acquire explicit shapes while concurrently enabling the simulated continuum to render 2D shapes
to facilitate the estimation of physical properties. A novel motion-factorized dynamic 3D Gaussian
framework is proposed to reconstruct precise dynamic scenes. Object surfaces and Gaussian-informed
continuum are obtained by utilizing the proposed coarse-to-fine density field generation strategy.
Extensive experiments demonstrate the efficacy and applicability of our method.

Despite the performance we achieve, this method still suffers from limitations, such as the assumption
of continuum mechanics, the requirements of multi-view images with known camera poses, and the
need for prior knowledge of object constitutive models. Integrating the pose-free method [60] or
generalized constitutive [61] model with our method will be an interesting direction for future work.

From the perspective of application, while this method can yield accurate estimations, it may pose
risks for fragile objects, as the interaction required for property inference could potentially cause
damage. Moreover, the computational demands of our framework are substantial which require
at least 1.5 hours to simultaneously recover both the geometry and physical properties of each
object. Future work could explore leveraging multi-model large language models [62] and large
reconstruction models [63–66] to facilitate the recovery process.

7 Acknowledgements

This research was supported by the Research Grant Council of the Hong Kong Special Administrative
Region under grant number 16212623. We thank Licheng Zhong for providing us with details about
real data collection and links for purchasing objects for real-world experiments.

10

Spring-GausOursReal worldIdentification and reconstructionFuture state simulationGrasp demonstrationsReal worldSimulationReferences

[1] Hang Yin, Anastasia Varava, and Danica Kragic. Modeling, learning, perception, and control

methods for deformable object manipulation. Science Robotics, 6(54):eabd8803, 2021.

[2] Haochen Shi, Huazhe Xu, Samuel Clarke, Yunzhu Li, and Jiajun Wu. Robocook: Long-horizon
elasto-plastic object manipulation with diverse tools. In Proceedings of the Conference on
Robot Learning (CoRL), pages 642–660. PMLR, 2023.

[3] Haochen Shi, Huazhe Xu, Zhiao Huang, Yunzhu Li, and Jiajun Wu. Robocraft: Learning to see,
simulate, and shape elasto-plastic objects in 3d with graph networks. The International Journal
of Robotics Research (IJRR), 43(4):533–549, 2024.

[4] Bin Wang, Longhua Wu, KangKang Yin, Uri Ascher, Libin Liu, and Hui Huang. Deformation
capture and modeling of soft objects. ACM Transactions on Graphics (TOG), 34(4):1–12, 2015.

[5] Hsiao-yu Chen, Edith Tretschk, Tuur Stuyck, Petr Kadlecek, Ladislav Kavan, Etienne Vouga,
and Christoph Lassner. Virtual elastic objects. In Proceedings of the IEEE/CVF Conference on
Computer Vision and Pattern Recognition (CVPR), pages 15827–15837, 2022.

[6] Licheng Zhong, Hong-Xing Yu, Jiajun Wu, and Yunzhu Li. Reconstruction and simulation of

elastic objects with spring-mass 3d gaussians. arXiv preprint arXiv:2403.09434, 2024.

[7] Matthias Müller and Markus H Gross. Interactive virtual materials. In Graphics interface,

volume 2004, pages 239–246, 2004.

[8] Miguel Jaques, Michael Burke, and Timothy Hospedales. Physics-as-inverse-graphics: Unsuper-
vised physical parameter estimation from video. In Proceedings of the International Conference
on Learning Representations (ICLR), 2020.

[9] Pingchuan Ma, Tao Du, Joshua B Tenenbaum, Wojciech Matusik, and Chuang Gan. Risp:
Rendering-invariant state predictor with differentiable simulation and rendering for cross-
domain parameter estimation. In Proceedings of the International Conference on Learning
Representations (ICLR), 2021.

[10] Pingchuan Ma, Peter Yichen Chen, Bolei Deng, Joshua B Tenenbaum, Tao Du, Chuang Gan, and
Wojciech Matusik. Learning neural constitutive laws from motion observations for generalizable
pde dynamics. In International Conference on Machine Learning (ICML), pages 23279–23300.
PMLR, 2023.

[11] Edgar Tretschk, Ayush Tewari, Vladislav Golyanik, Michael Zollhöfer, Christoph Lassner, and
Christian Theobalt. Non-rigid neural radiance fields: Reconstruction and novel view synthesis
of a dynamic scene from monocular video. In Proceedings of the IEEE/CVF International
Conference on Computer Vision (CVPR), pages 12959–12970, 2021.

[12] Xuan Li, Yi-Ling Qiao, Peter Yichen Chen, Krishna Murthy Jatavallabhula, Ming Lin, Chen-
fanfu Jiang, and Chuang Gan. Pac-nerf: Physics augmented continuum neural radiance fields
for geometry-agnostic system identification. In Proceedings of the International Conference on
Learning Representations (ICLR), 2022.

[13] Cheng Sun, Min Sun, and Hwann-Tzong Chen. Direct voxel grid optimization: Super-fast
convergence for radiance fields reconstruction. In Proceedings of the IEEE/CVF Conference on
Computer Vision and Pattern Recognition (CVPR), pages 5459–5469, 2022.

[14] Yutao Feng, Yintong Shang, Xuan Li, Tianjia Shao, Chenfanfu Jiang, and Yin Yang. Pie-
nerf: Physics-based interactive elastodynamics with nerf. In Proceedings of the IEEE/CVF
Conference on Computer Vision and Pattern Recognition (CVPR), 2024.

[15] Bernhard Kerbl, Georgios Kopanas, Thomas Leimkühler, and George Drettakis. 3d gaussian
splatting for real-time radiance field rendering. ACM Transactions on Graphics (TOG), 42(4):1–
14, 2023.

[16] Ziyi Yang, Xinyu Gao, Wen Zhou, Shaohui Jiao, Yuqing Zhang, and Xiaogang Jin. Deformable
3d gaussians for high-fidelity monocular dynamic scene reconstruction. In Proceedings of the
IEEE/CVF International Conference on Computer Vision (CVPR), 2024.

11

[17] Chenfanfu Jiang, Craig Schroeder, Joseph Teran, Alexey Stomakhin, and Andrew Selle. The
material point method for simulating continuum materials. In Acm siggraph 2016 courses,
pages 1–52. ACM New York, NY, USA, 2016.

[18] Yuanming Hu, Yu Fang, Ziheng Ge, Ziyin Qu, Yixin Zhu, Andre Pradhana, and Chenfanfu Jiang.
A moving least squares material point method with displacement discontinuity and two-way
rigid body coupling. ACM Transactions on Graphics (TOG), 37(4):1–14, 2018.

[19] Li Zhang, Brian Curless, and Steven M Seitz. Spacetime stereo: Shape recovery for dynamic
scenes. In Proceedings of the IEEE/CVF International Conference on Computer Vision (CVPR),
volume 2, pages II–367. IEEE, 2003.

[20] Richard A Newcombe, Dieter Fox, and Steven M Seitz. Dynamicfusion: Reconstruction
and tracking of non-rigid scenes in real-time. In Proceedings of the IEEE/CVF International
Conference on Computer Vision (CVPR), pages 343–352, 2015.

[21] Ben Mildenhall, Pratul P Srinivasan, Matthew Tancik, Jonathan T Barron, Ravi Ramamoor-
thi, and Ren Ng. Nerf: Representing scenes as neural radiance fields for view synthesis.
Communications of the ACM, 65(1):99–106, 2021.

[22] Peng Wang, Lingjie Liu, Yuan Liu, Christian Theobalt, Taku Komura, and Wenping Wang.
Neus: Learning neural implicit surfaces by volume rendering for multi-view reconstruction.
Advances in Neural Information Processing Systems (NeurIPS), 34:27171–27183, 2021.

[23] Tianye Li, Mira Slavcheva, Michael Zollhoefer, Simon Green, Christoph Lassner, Changil
Kim, Tanner Schmidt, Steven Lovegrove, Michael Goesele, Richard Newcombe, et al. Neural
3d video synthesis from multi-view video. In Proceedings of the IEEE/CVF Conference on
Computer Vision and Pattern Recognition (CVPR), pages 5521–5531, 2022.

[24] Yiming Wang, Qin Han, Marc Habermann, Kostas Daniilidis, Christian Theobalt, and Lingjie
Liu. Neus2: Fast learning of neural implicit surfaces for multi-view reconstruction. In Proceed-
ings of the IEEE/CVF International Conference on Computer Vision (ICCV), pages 3295–3306,
2023.

[25] Albert Pumarola, Enric Corona, Gerard Pons-Moll, and Francesc Moreno-Noguer. D-nerf:
Neural radiance fields for dynamic scenes. In Proceedings of the IEEE/CVF Conference on
Computer Vision and Pattern Recognition (CVPR), pages 10318–10327, 2021.

[26] Keunhong Park, Utkarsh Sinha, Peter Hedman, Jonathan T Barron, Sofien Bouaziz, Dan B
Goldman, Ricardo Martin-Brualla, and Steven M Seitz. Hypernerf: a higher-dimensional
representation for topologically varying neural radiance fields. ACM Transactions on Graphics
(TOG), 40(6):1–12, 2021.

[27] Ang Cao and Justin Johnson. Hexplane: A fast representation for dynamic scenes. In Proceed-
ings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pages
130–141, 2023.

[28] Jonathon Luiten, Georgios Kopanas, Bastian Leibe, and Deva Ramanan. Dynamic 3d gaussians:
Tracking by persistent dynamic view synthesis. In Proceedings of the International Conference
on 3D Vision (3DV), 2024.

[29] Agelos Kratimenos, Jiahui Lei, and Kostas Daniilidis. Dynmf: Neural motion factorization for
real-time dynamic view synthesis with 3d gaussian splatting. arXiv preprint arXiv:2312.00112,
2023.

[30] Guanjun Wu, Taoran Yi, Jiemin Fang, Lingxi Xie, Xiaopeng Zhang, Wei Wei, Wenyu Liu,
Qi Tian, and Wang Xinggang. 4d gaussian splatting for real-time dynamic scene rendering. In
Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR),
2024.

[31] Junbang Liang, Ming Lin, and Vladlen Koltun. Differentiable cloth simulation for inverse

problems. Advances in Neural Information Processing Systems (NeurIPS), 32, 2019.

12

[32] Maziar Raissi, Paris Perdikaris, and George E Karniadakis. Physics-informed neural networks:
A deep learning framework for solving forward and inverse problems involving nonlinear partial
differential equations. Journal of Computational physics, 378:686–707, 2019.

[33] Priya Sundaresan, Rika Antonova, and Jeannette Bohgl. Diffcloud: Real-to-sim from point
clouds with differentiable simulation and rendering of deformable objects. In Proceedings
of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS), pages
10828–10835. IEEE, 2022.

[34] Yifei Li, Tao Du, Kui Wu, Jie Xu, and Wojciech Matusik. Diffcloth: Differentiable cloth
simulation with dry frictional contact. ACM Transactions on Graphics (TOG), 42(1):1–20,
2022.

[35] Jinxi Li, Ziyang Song, and Bo Yang. Nvfi: Neural velocity fields for 3d physics learning from

dynamic videos. Advances in Neural Information Processing Systems (NeurIPS), 36, 2024.

[36] Xiao Liang, Fei Liu, Yutong Zhang, Yuelei Li, Shan Lin, and Michael Yip. Real-to-sim
deformable object manipulation: Optimizing physics models with residual mappings for robotic
surgery. In Proceedings of the IEEE International Conference on Robotics and Automation
(ICRA), pages 15471–15477. IEEE, 2024.

[37] Dongzhe Zheng, Siqiong Yao, Wenqiang Xu, and Cewu Lu. Differentiable cloth parameter
identification and state estimation in manipulation. IEEE Robotics and Automation Letters
(RA-L), 2024.

[38] Yi-Ling Qiao, Alexander Gao, and Ming Lin. Neuphysics: Editable neural geometry and
physics from monocular videos. Advances in Neural Information Processing Systems (NeurIPS),
35:12841–12854, 2022.

[39] Barbara Frank, Rüdiger Schmedding, Cyrill Stachniss, Matthias Teschner, and Wolfram Bur-
gard. Learning the elasticity parameters of deformable objects with a manipulation robot.
In Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems
(IROS), pages 1877–1883. IEEE, 2010.

[40] Zhenjia Xu, Jiajun Wu, Andy Zeng, Joshua B Tenenbaum, and Shuran Song. Densephys-
net: Learning dense physical object representations via multi-step dynamic interactions. In
Proceedings of the Robotics: Science and Systems, 2019.

[41] J Krishna Murthy, Miles Macklin, Florian Golemo, Vikram Voleti, Linda Petrini, Martin Weiss,
Breandan Considine, Jérôme Parent-Lévesque, Kevin Xie, Kenny Erleben, et al. gradsim:
Differentiable simulation for system identification and visuomotor control. In Proceedings of
the International Conference on Learning Representations (ICLR), 2020.

[42] Moritz Geilinger, David Hahn, Jonas Zehnder, Moritz Bächer, Bernhard Thomaszewski, and
Stelian Coros. Add: Analytically differentiable dynamics for multi-body systems with frictional
contact. ACM Transactions on Graphics (TOG), 39(6):1–15, 2020.

[43] Eric Heiden, Miles Macklin, Yashraj Narang, Dieter Fox, Animesh Garg, and Fabio Ramos.
Disect: A differentiable simulation engine for autonomous robotic cutting. In Proceedings of
the Robotics: Science and Systems, 2021.

[44] Tao Du, Kui Wu, Pingchuan Ma, Sebastien Wah, Andrew Spielberg, Daniela Rus, and Wojciech
Matusik. Diffpd: Differentiable projective dynamics. ACM Transactions on Graphics (TOG),
41(2):1–21, 2021.

[45] Yiling Qiao, Junbang Liang, Vladlen Koltun, and Ming Lin. Differentiable simulation of
soft multi-body systems. Advances in Neural Information Processing Systems (NeurIPS),
34:17123–17135, 2021.

[46] Chenfanfu Jiang, Craig Schroeder, Andrew Selle, Joseph Teran, and Alexey Stomakhin. The
affine particle-in-cell method. ACM Transactions on Graphics (TOG), 34(4):1–10, 2015.

13

[47] Yonghao Yue, Breannan Smith, Christopher Batty, Changxi Zheng, and Eitan Grinspun. Contin-
uum foam: A material point method for shear-dependent flows. ACM Transactions on Graphics
(TOG), 34(5):1–20, 2015.

[48] Gergely Klár, Theodore Gast, Andre Pradhana, Chuyuan Fu, Craig Schroeder, Chenfanfu Jiang,
and Joseph Teran. Drucker-prager elastoplasticity for sand animation. ACM Transactions on
Graphics (TOG), 35(4):1–12, 2016.

[49] Matthias Zwicker, Hanspeter Pfister, Jeroen Van Baar, and Markus Gross. Surface splatting. In
Proceedings of the 28th annual conference on Computer graphics and interactive techniques,
pages 371–378, 2001.

[50] Youtian Lin, Zuozhuo Dai, Siyu Zhu, and Yao Yao. Gaussian-flow: 4d reconstruction with
dynamic 3d gaussian particle. In Proceedings of the IEEE/CVF Conference on Computer Vision
and Pattern Recognition (CVPR), 2024.

[51] Tianyi Xie, Zeshun Zong, Yuxin Qiu, Xuan Li, Yutao Feng, Yin Yang, and Chenfanfu Jiang.
Physgaussian: Physics-integrated 3d gaussians for generative dynamics. In Proceedings of the
IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), 2024.

[52] Eduardo WV Chaves. Notes on continuum mechanics. Springer Science & Business Media,

2013.

[53] Vladimir Yugay, Yue Li, Theo Gevers, and Martin R Oswald. Gaussian-slam: Photo-realistic

dense slam with gaussian splatting. arXiv preprint arXiv:2312.10070, 2023.

[54] Kai Katsumata, Duc Minh Vo, and Hideki Nakayama. An efficient 3d gaussian representation

for monocular/multi-view dynamic scenes. arXiv preprint arXiv:2311.12897, 2023.

[55] Hanlin Chen, Chen Li, and Gim Hee Lee. Neusg: Neural implicit surface reconstruction with

3d gaussian splatting guidance. arXiv preprint arXiv:2312.00846, 2023.

[56] Shanchuan Lin, Andrey Ryabtsev, Soumyadip Sengupta, Brian L Curless, Steven M Seitz, and
Ira Kemelmacher-Shlizerman. Real-time high-resolution background matting. In Proceedings
of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pages
8762–8771, 2021.

[57] Alexander Kirillov, Eric Mintun, Nikhila Ravi, Hanzi Mao, Chloe Rolland, Laura Gustafson,
Tete Xiao, Spencer Whitehead, Alexander C Berg, Wan-Yen Lo, et al. Segment anything. In
Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV), pages
4015–4026, 2023.

[58] Zhou Wang, Alan C Bovik, Hamid R Sheikh, and Eero P Simoncelli. Image quality assessment:
from error visibility to structural similarity. IEEE transactions on image processing, 13(4):600–
612, 2004.

[59] Lin Yen-Chen, Pete Florence, Jonathan T Barron, Alberto Rodriguez, Phillip Isola, and Tsung-Yi
Lin. inerf: Inverting neural radiance fields for pose estimation. In Proceedings of the IEEE/RSJ
International Conference on Intelligent Robots and Systems (IROS), pages 1323–1330. IEEE,
2021.

[60] Yang Fu, Sifei Liu, Amey Kulkarni, Jan Kautz, Alexei A Efros, and Xiaolong Wang. Colmap-
free 3d gaussian splatting. In Proceedings of the IEEE/CVF Conference on Computer Vision
and Pattern Recognition (CVPR), 2024.

[61] Haozhe Su, Xuan Li, Tao Xue, Chenfanfu Jiang, and Mridul Aanjaneya. A generalized
constitutive model for versatile mpm simulation and inverse learning with differentiable physics.
Proceedings of the ACM on Computer Graphics and Interactive Techniques, 6(3):1–20, 2023.

[62] Josh Achiam, Steven Adler, Sandhini Agarwal, Lama Ahmad, Ilge Akkaya, Florencia Leoni
Aleman, Diogo Almeida, Janko Altenschmidt, Sam Altman, Shyamal Anadkat, et al. Gpt-4
technical report. arXiv preprint arXiv:2303.08774, 2023.

14

[63] Dmitry Tochilkin, David Pankratz, Zexiang Liu, Zixuan Huang, Adam Letts, Yangguang Li,
Ding Liang, Christian Laforte, Varun Jampani, and Yan-Pei Cao. Triposr: Fast 3d object
reconstruction from a single image. arXiv preprint arXiv:2403.02151, 2024.

[64] Jiaxiang Tang, Zhaoxi Chen, Xiaokang Chen, Tengfei Wang, Gang Zeng, and Ziwei Liu.
Lgm: Large multi-view gaussian model for high-resolution 3d content creation. In European
Conference on Computer Vision (ECCV), pages 1–18. Springer, 2024.

[65] Zhengyi Wang, Yikai Wang, Yifei Chen, Chendong Xiang, Shuo Chen, Dajiang Yu, Chongxuan
Li, Hang Su, and Jun Zhu. Crm: Single image to 3d textured mesh with convolutional
reconstruction model. arXiv preprint arXiv:2403.05034, 2024.

[66] Jiale Xu, Weihao Cheng, Yiming Gao, Xintao Wang, Shenghua Gao, and Ying Shan.

In-
stantmesh: Efficient 3d mesh generation from a single image with sparse-view large reconstruc-
tion models. arXiv preprint arXiv:2404.07191, 2024.

[67] Diederik P Kingma and Jimmy Ba. Adam: A method for stochastic optimization. In Proceedings

of the International Conference on Learning Representations (ICLR), 2015.

[68] Ruizhi Shao, Zerong Zheng, Hanzhang Tu, Boning Liu, Hongwen Zhang, and Yebin Liu.
Tensor4d: Efficient neural 4d decomposition for high-fidelity dynamic reconstruction and
In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern
rendering.
Recognition (CVPR), pages 16632–16642, 2023.

[69] Sara Fridovich-Keil, Giacomo Meanti, Frederik Rahbæk Warburg, Benjamin Recht, and Angjoo
Kanazawa. K-planes: Explicit radiance fields in space, time, and appearance. In Proceedings
of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR), pages
12479–12488, 2023.

[70] Jiemin Fang, Taoran Yi, Xinggang Wang, Lingxi Xie, Xiaopeng Zhang, Wenyu Liu, Matthias
Nießner, and Qi Tian. Fast dynamic radiance fields with time-aware neural voxels. In SIG-
GRAPH Asia 2022 Conference Papers, pages 1–9, 2022.

[71] Viktor Makoviychuk, Lukasz Wawrzyniak, Yunrong Guo, Michelle Lu, Kier Storey, Miles
Macklin, David Hoeller, Nikita Rudin, Arthur Allshire, Ankur Handa, et al. Isaac gym: High
performance gpu-based physics simulation for robot learning. arXiv preprint arXiv:2108.10470,
2021.

[72] Isabella Huang, Yashraj Narang, Clemens Eppner, Balakumar Sundaralingam, Miles Macklin,
Ruzena Bajcsy, Tucker Hermans, and Dieter Fox. Defgraspsim: Physics-based simulation of
grasp outcomes for 3d deformable objects. IEEE Robotics and Automation Letters, 7(3):6274–
6281, 2022.

[73] William E. Lorensen and Harvey E. Cline. Marching cubes: A high resolution 3d surface

construction algorithm. ACM SIGGRAPH Computer Graphics, page 163–169, 1998.

[74] Yixin Hu, Teseo Schneider, Bolun Wang, Denis Zorin, and Daniele Panozzo. Fast tetrahedral

meshing in the wild. ACM Transactions on Graphics (TOG), 39(4):117–1, 2020.

15

A Appendix

A.1 Motion-factorized Dynamic 3D Gaussian Network

A.1.1

Implementation details

k=0 , where L = 10 for both t and µ0.

We employ temporal and positional encoding to the time t and position µ0, respectively, to
introduce features with various frequencies. Specifically, the encoding module is denoted as
γ(x) = (cid:0)sin(2kπx), cos(2kπx)(cid:1)L−1
All the modules within the proposed network are composed of fully connected layers. The intermedi-
ate layers are uniformly designed, featuring both input and output channels configured to 256, and
employ ReLU activation. For training, we adhere to the protocol established in [16], utilizing the
Adam optimizer [67] with the same learning rate as specified in [16]. The total number of iterations
is set at 40,000, with densification and pruning operations conducted every 500 steps until reaching
15,000 iterations. Additionally, the number of motions Nm is set to 8 for all objects in our network.
λ1 and λ2 in Eqn. 4 are all set to 1. All the experiments are conducted on a single A10 GPU.

A.1.2 Effects of scale regularization

Figure 6: Visualization of trophy sequences. Row 1: rendering results from the network trained without scale
regularization. Row 1: rendering results from the network trained with scale regularization.

When addressing the deformation of objects such as fluids or granular media, the network may
struggle to fit transformations accurately due to significant discrepancies between the canonical and
target shapes. As a compensatory mechanism, the network may employ Gaussians with enlarged
scales to mitigate shape distortions during image rendering. This effect is visualized in the top row
of Fig. 6. To rectify this issue, we implement scale regularization during network training, which
enforces Gaussian kernels to maintain smaller scales. The efficacy of this operation is demonstrated
in the second row of Fig. 6, where it is evident that scale regularization enables the reconstruction of
more precise shapes for rendering.

A.1.3 Evaluation on D-NeRF Dataset

To further evaluate the performance of our method in terms of novel view synthesis, we conduct the
experiment on the D-NeRF [25] dataset, which is a widely used benchmark consisting of moving
items with data captured by a monocular camera. We compute PSNR on the D-NeRF test set and
compare our method with previous dynamic approaches, including Tensor4D [68], K-Planes [69],
TiNeuVox [70], and DefGS [16]. The results, reported in Tab. 5, demonstrate the proposed dynamic
3D Gaussian pipeline can also achieve superior performance on rendering.

16

Table 5: Results of PSNR (↑) on D-NeRF [25] Dataset

Method

Tensor4D [68]
K-Planes [69]
TiNeuVox [70]
DefGS [16]
Ours

Hell
Warrior

31.26
24.58
27.1
41.54
41.97

Mutant Hook

29.11
32.5
31.87
42.63
42.93

28.63
28.12
30.61
37.42
38.04

Bouncing
Balls

T-Rex Stand Up

24.47
40.05
40.23
41.01
41.26

23.86
30.43
31.25
38.1
37.54

30.56
33.1
34.61
44.62
45.32

Jumping
Jacks

24.2
31.11
33.49
37.72
38.86

Mean

27.44
31.41
32.74
40.43
40.85

A.2 Gaussian-informed Continnum Generation

A.2.1

Implementation details

In Alg. 1, the number of iterations, denoted as nu, is uniformly set to 4 for all objects. We set the
initial grid size ∆x according to the volume of the object. For most objects, ∆x = 0.1, while for
small items such as toothpaste in PAC-NeRF dataset, ∆x = 0.01. The parameters thmin and thmax
are set to 0.5 and 0.8, respectively. The resulting particle count ranges from approximately 50,000 to
100,000.

A.2.2 Visualization of coarse-to-fine filling

Fig. 7 visualizes the filling results of our proposed coarse-to-fine strategy with different numbers of
iterations, along with the results from PAC-NeRF and ground-truth shapes. The qualitative results
show that our method can generate more accurate shapes compared with PAC-NeRF, which tends to
recover over-large shapes. We should note that we cannot recover the cat-shaped object as in [12],
though we use the code officially implemented by PAC-NeRF without any modification.

A.3 Training details on PAC-NeRF Dataset

The training process is divided into two sub-processes, where we perform system identification after
estimating the initial velocity of the object using the first three frames of data. Both processes use
Adam [67] optimizer to tune the parameters.

A.4 More Experiments on Spring-Gaus Synthetic Dataset

Besides performing evaluation on the simulated future states in Sec. 5.2, we also evaluate CD and
EMD on states existing in the training data, and the results are reported in Tab. 6. It is obvious to
see that our method outperforms the baselines by a large margin, which further demonstrates the
performance of our method in terms of reconstruction and identification.

Table 6: Dynamic Reconstruction on Spring-Gaus Synthetic Dataset

torus

cross

cream apple

paste

chess

banana Mean

↓ Spring-Gaus [6]
D
PAC-NeRF [12]
C
Ours

↓ Spring-Gaus [6]
D
PAC-NeRF [12]
M
Ours
E

0.17
4.92
0.13

0.040
0.056
0.020

0.48
1.10
0.13

0.037
0.052
0.020

0.36
0.77
0.14

0.031
0.041
0.019

0.38
1.11
0.15

0.033
0.045
0.020

0.19
3.14
0.17

0.022
0.054
0.025

1.80
0.96
0.41

0.063
0.052
0.036

2.60
2.77
0.03

0.052
0.062
0.011

0.85
2.11
0.17

0.040
0.052
0.022

A.5 Experiment Setting for Spring-Gaus Real-world Dataset

Training details. The dynamic scenes in Spring-Gaus [6] contain only three viewpoints, which are
insufficient for dynamic 3D Gaussian reconstruction. Conversely, the static scenes incorporate 50 to
70 images captured from various viewpoints. Following the protocol established in Spring-Gaus, we
reconstruct 3D Gaussian points from the static scenes using the traditional 3D Gaussian Splatting

17

(a) nu = 2

(b) nu = 3

(c) nu = 4

(d) nu = 5

(e) PAC-NeRF

(f) Oracle

Figure 7: Visualization of Coarse-to-fine Filling. (a)-(d) are the filling results by our method with different times
of upsampling operations. (e) visualize the point clouds recovered by PAC-NeRF. (f) shows the ground-truth
shapes.

18

(3DGS) technique [15]. Subsequently, we transform the static Gaussian set to the initial configuration
of the dynamic scene, guided by the relative pose between the two scenes. The pose is estimated
iteratively based on the discrepancies observed between the rendered images and the actual images at
the initial state of the dynamic scene. After pose estimation, we implement our methodology, which
leverages only implicit shape guidance, to conduct system identification.

Experimental setting. We conducted grasping experiments using the UR10 robotic arm equipped
with the Robotiq140 dexterous gripper in both simulated and real-world settings, ensuring consistency
in the mass of the objects and their grasping poses across both environments. For the simulations,
we employed the FEM-based Isaac Gym simulator [71] for its advanced capabilities in realistically
simulating deformable objects [72]. To facilitate the simulation of deformable objects, we apply
the Marching Cubes algorithm [73] to the generated density fields to derive the object meshes.
Subsequently, we utilize fTetWild [74] for the tetrahedralization of these meshes.

More results. Qualitative results of grasp demonstrations on pig and dog objects are shown in Fig. 8.

Figure 8: The stress on the simulated objects is indicated by blue (low) to red (high). The gripper widths from
left to right for each object are set to 5.5cm, 4.5cm, and 3.5cm, respectively.

A.6 System Identification Result on PAC-NeRF Dataset

Table 7: System Identification Result on PAC-NeRF Dataset
Newtonian (Init. Guess: µ = 10, κ = 1.0 × 104)

Prediction

µ = 17.43
κ = 218085.89

µ = 449.45
κ = 148550.15

µ = 160.74
κ = 177748.93

µ = 123.07
κ = 223551.76

µ = 48.48
κ = 483821.18

µ = 40.57
κ = 14668.64

µ = 68.24
κ = 336795.04

Ground Truth

µ = 19.46
κ = 56075.55

µ = 436.62
κ = 152696.25

µ = 155.83
κ = 193525.59

µ = 121.76
κ = 257356.05

µ = 49.09
κ = 518012.47

µ = 38.44
κ = 13772.52

µ = 64.16
κ = 358237.13

µ = 230.46
κ = 30713.74

µ = 228.71
κ = 11041.06

µ = 563.53
κ = 24459.41

µ = 552.98
κ = 16789.77

µ = 104.92
κ = 139609.16

µ = 106.93
κ = 112569.73

Non-newtonian (Init. Guess: µ = 100.0, κ = 1.0 × 105, τY = 10, η = 1)

Prediction

Ground Truth

µ = 13201.66
κ = 218085.89
τY = 1246.56
η = 4.34

µ = 13209.25
κ = 201566.59
τY = 1151.42
η = 6.68

µ = 67041.05
κ = 148550.15
τY = 7679.39
η = 24.21

µ = 65351.08
κ = 171054.03
τY = 7491.70
η = 26.69

µ = 40092.22
κ = 177748.93
τY = 4238.86
η = 12.85

µ = 43757.04
κ = 249639.94
τY = 3964.94
η = 23.27

µ = 35080.68
κ = 223551.76
τY = 5289.52
η = 5.99

µ = 36027.61
κ = 134751.55
τY = 5061.12
η = 22.31

µ = 22017.29
κ = 483821.18
τY = 1037.84
η = 70.84

µ = 19593.71
κ = 121836.33
τY = 1462.78
η = 38.83

µ = 20142.84
κ = 14668.64
τY = 3930.36
η = 48.23

µ = 20522.72
κ = 14494.30
τY = 4153.38
η = 27.24

µ = 26122.95
κ = 336795.04
τY = 3604.00
η = 5.19

µ = 51549.45
κ = 370317.66
τY = 3203.67
η = 20.43

µ = 48006.58
κ = 30713.74
τY = 1441.98
η = 1.22

µ = 121865.90
κ = 32859.59
τY = 1192.76
η = 10.27

µ = 75068.35
κ = 24459.41
τY = 1422.56
η = 4.07

µ = 241579.97
κ = 30324.98
τY = 1251.29
η = 10.62

µ = 32390.85
κ = 139609.16
τY = 4960.55
η = 6.26

µ = 33764.59
κ = 122896.10
τY = 4689.16
η = 22.89

Prediction

E = 23008.38
ν = 0.3008

E = 3013161.44
ν = 0.2758

E = 644436.88
ν = 0.2875

E = 431721.84
ν = 0.3024

E = 106731.23
ν = 0.3527

E = 81726.40
ν = 0.1250

E = 178265.23
ν = 0.3291

E = 1106374.86
ν = 0.1731

E = 4230293.75
ν = 0.1583

E = 339834.14
ν = 0.2717

Ground Truth

E = 21905.91
ν = 0.2969

E = 3844263.25
ν = 0.2892

E = 648705.38
ν = 0.3066

E = 459804.63
ν = 0.2476

E = 103565.68
ν = 0.2954

E = 81467.34
ν = 0.1798

E = 179237.53
ν = 0.3456

E = 1117086.13
ν = 0.1829

E = 3650610.75
ν = 0.1684

E = 340267.00
ν = 0.2597

Elasticity (Init. Guess: E = 316227.77, ν = 0.25)

Prediction

Ground Truth

E = 174283.92
ν = 0.3008
τY = 1553.91
E = 219037.98
ν = 0.2620
τY = 1521.82

E = 4494502.24
ν = 0.2758
τY = 58973.06
E = 4974443.00
ν = 0.1410
τY = 64508.23

E = 1607386.28
ν = 0.2875
τY = 17967.93
E = 3795741.25
ν = 0.1842
τY = 16983.20

Plasticine (Init. Guess: E = 10000, ν = 0.25, τY = 1000)
E = 1230654.13
ν = 0.3024
τY = 27979.03
E = 1661460.38
ν = 0.1078
τY = 28502.29

E = 484760.99
ν = 0.3527
τY = 1077.11
E = 456356.41
ν = 0.2499
τY = 1070.41

E = 405734.16
ν = 0.1250
τY = 15447.70
E = 427719.28
ν = 0.1566
τY = 14766.65

E = 682408.49
ν = 0.3291
τY = 12988.84
E = 5106352.50
ν = 0.1743
τY = 12059.57

E = 2304631.70
ν = 0.1731
τY = 2079.31
E = 1382011.00
ν = 0.2312
τY = 2050.87

E = 5635256.43
ν = 0.1583
τY = 2023.68
E = 1045986.31
ν = 0.2258
τY = 2131.80

E = 1049167.13
ν = 0.2717
τY = 24607.02
E = 1144808.88
ν = 0.1988
τY = 24397.29

Prediction

Ground Truth

θ0
f ric = 32.9184
θ0
f ric = 30.6577

θ0
f ric = 34.4715
θ0
f ric = 32.3751

Sand (Init. Guess: θ0

f ric = 10)
θ0
f ric = 29.1305
θ0
f ric = 26.8816

θ0
f ric = 31.7486
θ0
f ric = 29.3458

θ0
f ric = 45.2390
θ0
f ric = 42.2861

Each material contains 10 instances (5 for granular material) with various object orientations, initial velocities, and physical parameters.

19

Operator or symbol
PG(t)
˜P (t)
˜S(t)
F (t)
P roj
Discretize
GetP osition

Table 8: Notation of Algorithm 1
Explanation

Gaussian particle set at time t
Sampled continuum particles at time t
Sampled surface particles at time t, ˜S(t) ⊂ ˜P (t)
3D Density field at time t
Operation projecting 3D particles into 2D image indices according to the camera parameters
Operation mapping particle positions to voxel indices on the density field
Operation returning 3D positions of the binary field

A.7 Notation of Algorithm 1

A.8 Necessity of 2D mask supervision

To evaluate the necessity of 2D mask supervision, we perform system identification on 45 cross-
shaped object instances in the PAC-NeRF dataset by our method but with only object surface
supervision. The results are reported in Tab. 9. It is obvious to see that combining both 2D and 3D
shapes as supervision can achieve more accurate performance compared to using 3D shapes only.
Therefore, we believe that utilizing 2D mask supervision to some extent makes up for the errors
introduced by the 3D object surfaces extracted from dynamic 3D Gaussians.

Table 9: System identification with/without mask supervision

Type

Parameters w/o masks w/ masks

Newtonian

Non-
Newtonian

Elasticity

Plasticine

log10(µ)
log10(κ)
v

log10(µ)
log10(κ)
log10(τY )
log10(η)
v

log10(E)
ν
v

log10(E)
log10(τY )
v

2.19±2.90
24.2±22.2
0.20±0.08

19.4±27.7
24.0±24.8
4.58±9.11
49.1±40.5
1.33±0.54

2.85±1.94
3.97±2.64
0.22±0.10

25.6±27.4
9.04±2.37
1.16±0.00

1.53±1.31
14.8±19.2
0.20±0.07

13.5±18.2
12.9±16.8
4.80±3.92
40.7±24.6
0.19±0.09

2.43±3.29
2.52±2.03
0.82±0.32

25.6±29.4
1.67±1.21
0.22±0.10

Sand

θf ric
v

2.55±2.03
0.31±0.18

4.18±0.52
0.17±0.05

A.9 Physical Properties

In this work, we simulate five types of materials, including elasticity, plasticine, granular media,
Newtonian fluids, and non-Newtonian fluids. Each material exhibits distinct physical properties. We
provide a brief introduction to the properties of each material.

Elasticity: The Young’s modulus (E) is a measure of the stiffness of a solid material, quantifying the
relationship between stress and strain in a material under elastic deformation. The Poisson’s ratio
(ν) describes the tendency of a material to expand or contract along its width when it is stretched or
compressed along its length.

Plasticine: The yield stress (τY ) is the minimum stress that a material requires to transition from
elastic deformation to plastic deformation, marking the onset of permanent deformation. Both Young’s
modulus (E) and Poisson’s ratio (ν) exhibit characteristics similar to those of elastic materials.

Granular Media: The friction angle (θf ric) is a measure of the inherent resistance of a granular
material to sliding or shearing, directly related to the angle at which a material can be piled without
slumping.

20

Newtonian fluids: The bulk modulus (κ) is a measure of a material’s resistance to uniform compression,
quantifying how much it compresses under a given amount of external pressure. Fluid viscosity (µ)
describes a fluid’s resistance to flow, quantifying how much it resists deformation at a given rate.

Non-Newtonian fluids: The plasticity viscosity (η) refers to the measure of a viscoplastic material’s
resistance to deformation, which defines how it behaves under stress beyond its yield point. The bulk
modulus (κ) and fluid viscosity (µ) are comparable to those of Newtonian fluids, while the yield
stress (τY ) is akin to that of plasticine.

A.10 Constitutive Models

A constitutive model describes how a material responds to stress, strain, or other external forces. It
defines the material’s behavior by relating stress and strain through constitutive equations, which can
capture complex behaviors such as elasticity, plasticity, and fracture. The MPM simulator is capable
of modeling a diverse range of materials by employing various constitutive models. In this work,
we have implemented simulations for five distinct types of materials: elasticity, plasticine, granular,
Newtonian fluids, and non-Newtonian fluids.

Elasticity. We use the Neo-Hookean model, which is a common nonlinear hyperelastic model, to
simulate the elasticity of materials and predict deformations. The Cauchy stress for this model is
defined by

Jσ = µ (FF⊺) + [λ log(J ) − µ] I,
(7)
where the F is the deformation gradient, J = det(F) and µ, λ are the Lamé parameters, which are
related to the material properties of Young’s modulus (E) and Poisson’s ratio (ν) as:

µ =

E
2(1 + ν)

,

λ =

Eν
(1 + ν)(1 − 2ν)

.

(8)

Plasticine. We use the Saint Venant-Kirchhoff Model (StVK) together with von Mises yield criterion
to simulate the plasticine. For this model, the stess is defined as:
Jσ = F [2µG + λTr(G)I] F⊺,

(9)
2 (F⊺F − I) is the Green strain. The von Mises yield criterion serves as a tool to assess
where G = 1
whether the deformation exceeds the recoverable limit. The deformation gradient will be mapped
back onto the boundary of elastic region using the following projection:

Z(F) =

(cid:40)

F
U exp(ϵ − δγ ˆϵ

∥|ˆϵ∥ )V⊺

δγ ≤ 0
otherwise

,

(10)

where the δγ = ∥ˆϵ∥ − τY
obtained by performing Singular Value Decomposition (SVD) on deformation gradient F.

2µ , ϵ = log(Σ) is the normalized Hencky strain. The U, Σ and V can be

Granular Media. Similar to plasticine, the StVK constitutive model is used to simulate granular
media. Drucker-Prager yield criteria [48] is selected as the yielding condition. It is defined as
follows:

Tr(ϵ) > 0,

or

δγ = ∥ˆϵ∥F + α

> 0,

(11)

(dλ + 2µ)Tr(ϵ)
2µ

(cid:113) 2
3

2 sin θf ric
3−sin θf ric

where d is the spatial dimension, α =
gradient return mapping is defined by
UV⊺
F
U exp (ϵ − δγ ˆϵ

Z(F) =






∥|ˆϵ∥ )V⊺

and θf ric is the friction angle. The deformation

Tr(ϵ) > 0
δγ ≤ 0, Tr(ϵ) ≤ 0
otherwise

.

(12)

Newtonian Fluid. We adopt the approach used in PAC-NeRF [12], which employs a J-based fluid
model combined with a viscosity term to simulate Newtonian fluids. The stress for this model is
defined by

Jσ =

1
2

µ(∇v + ∇v⊺) + κ(J −

21

1
J 6 ),

(13)

where µ and κ represent the fluid viscosity and the bulk modulus, respectively.

Non-Newtonian Fluid. We employ the viscoplastic model [47] to simulate non-Newtonian fluids.
Although we continue to utilize the von Mises criteria to delineate the elastic region, the presence of
viscoplasticity implies that deformation will not be immediately reverted onto the yield surface. It is
defined as follows:

(cid:40)

Z(F) =

d Tr(ϵ)I)V⊺

F
U exp( ˆs
2µ ˆϵ + 1
µ
d
s = 2µˆϵ,

ˆµ =

Tr(Σ2),

ˆs = ∥s∥ −

δγ
1 + η

2ˆµ∆t

δγ ≤ 0
otherwise

,

(14)

(15)

where d is the spatial dimension. The U, Σ and V can be obtained by performing Singular Value
Decomposition (SVD) on deformation gradient F.

22
