<!-- 原始证据：raw/vr-gs-physical-dynamics-aware-interactive-gaussian-splatting-2026-10-19-294b63f0d0e0.pdf；标准提取产生NUL，使用PyMuPDF逐页get_text(sort=True)重建；公式以原PDF为准。 -->

## PDF 第 1 页

     VR-GS: A Physical Dynamics-Aware Interactive Gaussian Splatting
     System in Virtual Reality

      YING JIANG∗, UCLA, USA and HKU, Hong Kong
     CHANG YU∗, UCLA, USA
       TIANYI XIE∗, UCLA, USA
     XUAN LI∗, UCLA, USA
     YUTAO FENG, University of Utah, USA and Zhejiang University, China
     HUAMIN WANG, Style3D Research, China
     MINCHEN LI, CMU, USA
     HENRY LAU, HKU, Hong Kong2024  FENG GAO†, Amazon, USA
      YIN YANG, University of Utah, USA
     CHENFANFU JIANG, UCLA, USAMay
4
[cs.HC]





              Fig. 1. Animal Crossing. Utilizing our system, individuals can engage in intuitive and interactive physics-based game-play with deformable virtual animals
          and realistic environments represented with 3D Gaussian Splatting.

         As 3D content becomes increasingly prevalent, there’s a growing focus on      system also incorporates real-time deformation embedding and dynamic
            the development of engagements with 3D virtual content. Unfortunately,      shadow casting, ensuring a comprehensive and engaging virtual experience.
             traditional techniques for creating, editing, and interacting with this con-
                                                                 CCS Concepts: • Computing methodologies →Virtual reality.            tent are fraught with difficulties. They tend to be not only engineering-
             intensive but also require extensive expertise, which adds to the frustration                                                                                       Additional Key Words and Phrases: Gaussian Splatting, Neural Radiance
          and inefficiency in virtual object manipulation. Our proposed VR-GS sys-                                                                                                        Fields, Real-Time Interactions
          tem represents a leap forward in human-centered 3D content interaction,
             offering a seamless and intuitive user experience. By developing a physical
           dynamics-aware interactive Gaussian Splatting (GS) in a Virtual Reality (VR)     1  INTRODUCTION
             setting, and constructing a highly efficient two-level embedding strategy     As digital technology advances, the importance of 3D content isarXiv:2401.16663v2    alongside deformable body simulations, VR-GS ensures real-time execution                                                                   becoming increasingly prominent across various industries, from
           with highly realistic dynamic responses. The components of our system are
                                                                           entertainment to education. This growth is driving the demand
           designed for high efficiency and effectiveness, starting from detailed scene
                                                                                     for high-fidelity 3D content within the Computer Graphics (CG)            reconstruction and object segmentation, advancing through multi-view im-
           age in-painting, and extending to interactive physics-based editing. The     and Computer Vision (CV) communities. Despite their capabilities
                                                                                  of being rendered efficiently, traditional 3D/4D content creation,
              ∗indicates equal contributions.                                                                                        reliant on 3D modeling tools and game engines, is time-intensive
             †This work is not related to F. Gao’s position at Amazon.
                                                                   and complex, often beyond the reach of non-expert users. This
             Authors’ Contact Information: Ying Jiang, UCLA, USA  and HKU, Hong Kong,       accessibility barrier limits broader user engagement in high-quality
            anajymua@gmail.com; Chang Yu, UCLA, USA, g1n0st@live.com; Tianyi Xie, UCLA,      content creation.           USA, tianyixie77@g.ucla.edu; Xuan Li, UCLA, USA, xuanli1@g.ucla.edu; Yutao Feng,
              University of Utah, USA and Zhejiang University, China, fytal0n@gmail.com; Huamin        Recognizing the advantages and limitations of the traditional
           Wang, Style3D Research, China, wanghmin@gmail.com; Minchen Li, CMU, USA,      graphics pipeline, our goal is to find a modern variant. To enhance
            minchernl@gmail.com; Henry Lau, HKU, Hong Kong, hyklau@hku.hk; Feng Gao,
           Amazon, USA, fenggo@amazon.com; Yin Yang, University of Utah, USA, yangzzzy@      the visual quality and ease of creation for non-expert users, we
             gmail.com; Chenfanfu Jiang, UCLA, USA, cffjiang@ucla.edu.                  move away from traditional 3D models in graphics pipelines and

## PDF 第 2 页

2   •   Y. Jiang, C. Yu, T. Xie, X. Li, Y. Feng, H. Wang, M. Li, H. Lau, F. Gao, Y. Yang, C. Jiang


instead, adopt state-of-the-art radiance field techniques for render-     2  RELATED WORK
ing. In this context, Neural Radiance Fields (NeRF) emerge as a      2.1  Radiance Fields Rendering
natural choice. Despite its versatility, NeRF’s volume rendering falls
                                           A variety of 3D representations, such as mesh [Sorkine and Cohen-
short in efficiency for interactive applications, which demand high
                                                        Or 2004], point clouds [Qi et al. 2017], signed distance fields [Wangframe rates. Additionally, NeRF’s approach to handling deforma-
                                                                               et al. 2021], and grids [Zhu and Bridson 2005] are exploited in earlytions—requiring bending of query rays via an inverse deformation
                                                       work for visual computing tasks, including synthesis, estimation,map—is slow [Pumarola et al. 2021]. Fortunately, 3D Gaussian Splat-
                                                                    manipulation, animation, reconstruction, and transmission of datating (GS) [Kerbl et al. 2023] has been recently introduced as an
                                                                  about objects and scenes [Gao et al. 2023; Kerbl et al. 2023; Xie et al.efficient and explicit alternative to NeRF. This method not only ex-
                                                                        2022]. Since neural radiance fields (NeRF) [Mildenhall et al. 2021]cels in rendering efficiency but also provides an explicit geometric
                                                       was proposed for novel view synthesis with differentiable volume
representation that can be directly deformed or edited. The explicit
                                                                     rendering, it has been applied to versatile computer graphics andnature of 3D GS can simplify the direct manipulation of geometry
                                                            computer vision tasks, such as scene reconstruction [Meng et al.by solving a Partial Differentiable Equation (PDE) that governs the
                                                                      2023; Oechsle et al. 2021; Yariv et al. 2021], synthesis [Huang et al.motions of Gaussian kernels. Furthermore, GS eliminates the need
                                                                     2023a; Sun et al. 2023], rendering [Lombardi et al. 2021; Wu et al.for high-fidelity meshes, UV maps, and textures, offering the poten-
                                                                           2023], interactive games [Xia et al. 2024] and animation [Chen et al.
tial for naturally photorealistic appearances. It is worth noting that
                                                                        2021; Peng et al. 2021], simulation [Li et al. 2023a], etc. While Neuralmany studies have already demonstrated the use of 3D GS for 4D
                                                               Radiance Fields (NeRF) have achieved remarkable image quality,dynamics [Park et al. 2021; Pumarola et al. 2021; Yang et al. 2023]
                                                                   they suffer from significant time and memory inefficiencies [Lindell
and the integration of physics-based simulations for more realistic
                                                                            et al. 2021]. To mitigate these issues, various methods have been4D content generation [Feng et al. 2024b; Xie et al. 2024], as well
                                                                     introduced. Sparse representations [Liu et al. 2020], decomposedas for creating animatable avatars [Xu et al. 2023b; Zielonka et al.
                                                                              strategies [Niemeyer and Geiger 2021; Rebain et al. 2021], and multi-
2023].
                                                                       resolution encoding [Müller et al. 2022] have all been proposed to
   In this paper, we introduce a physics-aware interactive system for
                                                              enhance volume rendering efficiency while maintaining high quality.
immersive manipulation of 3D content represented with GS. To en-
                                                               However, NeRFs are implicit representations, making it challenging
sure an interactive experience, we utilize eXtended Position-based
                                                                          to detect and resolve collisions [Qiao et al. 2023]. Recently, 3D Gauss-Dynamics (XPBD) [Macklin et al. 2016], a highly adaptable and uni-
                                                                     ian splatting (GS) proposed by [Kerbl et al. 2023] utilizes an array
fied physical simulator, for real-time deformation simulation. Direct
                                                                        of 3D Gaussian kernels to represent scenes explicitly, facilitatingincorporation of a simulator onto GS kernels presents challenges,
                                                                              faster optimization and achieving state-of-the-art results.
as the simulation and rendering processes have distinct geometrical
representations. To address this, we construct a tetrahedral cage for
each segmented GS kernel group and embed these kernel groups
into corresponding meshes. The deformed mesh, driven by XPBD,      2.2  Editing in Radiance-based Scene
subsequently guides the deformation of the GS kernels. Noticing    A natural extension of NeRF is to support user-guided editing. Li
that simplistic embedding techniques can lead to undesirable, spiky     and Pan [2023] made use of two proxy cages to offer interactive
deformations in GS kernels, we propose a novel two-level embed-      control of the shape deformation of NeRF. Besides geometry editing,
ding approach. This method allows each Gaussian kernel to adapt       text prompts [Wang et al. 2023] or a user-edited image [Bao et al.
to a smoothed average deformation of the surrounding tetrahedra.      2023] can also be adopted to conduct style transfer of NeRF. Besides,
The intricate combination of GS and XPBD through our two-level      Lin et al. [2023] put forward exploiting 2D sketches to edit high-
embedding not only achieves real-time physics-based dynamics       quality facial NeRF. Concerning NeRF texture editing, Huang et al.
but also upholds high-quality, realistic rendering. In summary, our      [2023a] utilized a coarse-fine disentanglement representation and a
contributions include:                                              patch-matching algorithm to synthesize textures of different shapes
                                                              from multi-view images. De-Nerf [Wu et al. 2023] exploited a hybrid
                                                                               light representation that enables users to relight NeRF. In contrast,
                                                                 Gaussian Splatting is more appropriate for post-editing tasks thanks
    • A Physics-Aware Interactive System: Development of a system
                                                                       to its explicit nature and has inspired a series of follow-up works
        that enables interactive, physics-aware manipulation of 3D
                                                          [Chen et al. 2023; Duisterhof et al. 2023; Fang et al. 2023; Huang
       content represented with GS.
                                                                              et al. 2023b; Ye et al. 2023].
    • Two-Level Deformation Embedding: Introduction of a novel
                                                               Another significant direction in NeRF research is the incorpora-
       two-level embedding approach that allows Gaussians to
                                                                       tion of dynamic components into static scenes. To achieve this, a
       adapt smoothly to the mesh, enhancing the deformation
                                                                   popular strategy [Park et al. 2021; Pumarola et al. 2021] is to consider
       realism and preventing undesirable spiky artifacts.
                                                                time as an additional input to the system, This method typically
                                                                                     splits a dynamic NeRF into a canonical static field and a deformation
                                                                                          field, with the latter mapping this canonical representation to a de-
We deploy our system on VR devices, enriched by segmentation,     formed one. More recently, Yang et al. [2023] drew inspiration from
inpainting, and shadow map, offering users a rich platform for 3D     3D GS to reconstruct a dynamic scene using 4D Gaussian primitives
content manipulation.                                                  that change over time. However, the dynamics in these methods

## PDF 第 3 页

                                                                VR-GS: A Physical Dynamics-Aware Interactive Gaussian Splatting System in Virtual Reality   •  3


are generally confined to motions captured from input data, limit-       offers users real-time physics-based interaction. To our knowledge,
ing their ability to synthesize unseen dynamics. To generate novel     VR-GS represents the first interactive physics-based GS editor. To
dynamics, Xie et al. [2024] and Feng et al. [2024b] have integrated      achieve both real-time performance and physically realistic editing,
physics-based simulations into 3D static representations, paving the     we implement a reduced representation model and parallel-friendly
way for generating physically plausible and novel dynamic scenes.      algorithms within our frame budget. While the per-Gaussian-based
                                                                          discretization as done in PhysGaussian [Xie et al. 2024] offers de-
2.3  Real-time Neural Radiance Fields                                tailed dynamics, its time cost is impractical for our system’s needs.
                                                                         Instead, we utilize a tetrahedral mesh embedding reconstructedRendering NeRF is computationally expensive for real-time appli-
                                                           from Gaussian kernels to drive GS motion. We adopt XPBD withcations, such as VR, which causes high latency and low quality [Li
                                                                         finite-element constraints to achieve real-time simulations.et al. 2022b; Song et al. 2023]. To address these challenges and enable
high-fidelity rendering with minimal latency on a single GPU, vari-         Unified Framework. VR-GS is a framework that integrates render-
ous techniques have been proposed. These include gaze-contingent      ing and simulation within a unified pipeline. Our design principles
3D neural representations [Deng et al. 2022], variable rate shad-     adhere to the goal of “what you see is what you simulate” [Müller
ing [Rolffet al. 2023], and hybrid surface-volume representations       et al. 2016]. Unlike Xie et al. [2024], our system employs a hybrid
[Turki et al. 2023], all aimed at accelerating NeRF. In contrast to      approach, combining cage mesh and Gaussian kernels, to achieve
single-GPU solutions, VR-NeRF [Xu et al. 2023a] leveraged multiple       real-time performance. The deformation gradient field of Gaussian
GPUs to achieve high-quality volumetric rendering of NeRF. Be-      kernels is embedded in the cage mesh through piecewise constant
yond software acceleration techniques, RT-NeRF [Li et al. 2022a]       interpolation. With each Gaussian kernel resembling a rotated ellip-
utilized an algorithm-hardware co-design framework to provide       soid, this simple embedding strategy leads to spiky artifacts during
real-time NeRF solutions for immersive VR rendering. While these      large deformation, a challenge highlighted in [Xie et al. 2024]. To
methods primarily focus on enhancing NeRF rendering, our work      mitigate this, we employ a two-level interpolation scheme: initially
is dedicated to facilitating interactive editing.                      embedding each Gaussian within an individual bounding tetrahe-
   Li et al. [2023c] integrated affine transformation with NeRF to      dron, followed by embedding these tetrahedra within the simulated
enable interactive features, such as exocentric manipulation, editing,      cage mesh to elevate the smoothness of the deformation field.
and VR tunneling effects. However, their approach is limited to
filter-based edits such as edge blurring and fails to support the         Additional Components. Our framework is designed to construct
deformation of virtual objects’ geometry. RealityGit [Li et al. 2023b]      VR-compatible interactive settings derived from real-world captures.
and Magic NeRF Lens [Li et al. 2023d] modified a NeRF model      Consequently, it introduces complexities associated with facilitating
by erasing or revealing a portion of NeRF. Nevertheless, neither       intuitive user interactions and delivering real-time feedback that
system permits deforming the geometrical structure of the model. In      meets user expectations and common sense perceptions [Gabbard
contrast to these works which concentrate on interactive editing of       et al. 1999; Hale and Stanney 2014; Stanney et al. 2003]. In particular,
NeRF, our system enables users to interact with 3D GS in a physically    when users engage with objects within a scene, they anticipate
realistic way in real time.                                               natural movements and realistic appearances from both the selected
                                                                          objects and the surrounding environment. Moreover, it is necessary
3  SYSTEM DESIGN                                                to address voids when an object is removed from its supporting
                                                                            base. To manage these challenges, our system additionally integrates
We propose a unified physics dynamics-aware interactive VR system
                                                                            functionalities for object segmentation and scene inpainting.
for real-time interactions with Gaussian Splatting (GS).

                                                          4 METHOD  Immersive and Realistic Generative Dynamics. Our targeted sys-
tem aims to offer users an immersive and realistic experience, char-      4.1  Gaussian Splatting
acterized by dynamic motions, 3D virtual shapes, and illuminations                                                               Gaussian splatting, proposed by Kerbl et al. [2023], is an explicit
that closely mirror the real world [Kalawsky 1999]. This goal sets                                                   3D representation to encapsulate 3D scene information using a set
our system apart, especially in how it handles physics-based 3D                                                                        of 3D anisotropic Gaussian kernels, each with learnable mean 𝜇,
deformations and dynamics, as opposed to those that rely solely                                                                      opacity 𝜎, covariance matrix Σ, and spherical harmonic coefficients
on geometric deformation. The proposed system leverages physics-      C. Spherical harmonics (SH) are expansions of the view-dependent
based simulation techniques to produce realistic dynamics and facili-                                                                        color function defined on the unit sphere. To render a view, the 3D
tate 3D shape editing. Unlike methods that reconstruct motion from                                                                              splats are projected to 2D screen space ordered by their 𝑧-depth. The
time-dependent datasets or utilize generative AI to drive Gaussian                                                                         color 𝐶of a pixel is computed by 𝛼-blending of these 2D Gaussians
models, our system adheres to physical principles. To create an                                                            from near to far:
immersive experience, we choose VR as the interaction platform.                                                                                                       𝑖−1
                                                 𝐶= ∑︁ 𝑐𝑖𝛼𝑖 Ö (1 −𝛼𝑗),                     (1)  Real-Time Interaction. For an interactive system, low latency is
                                                                                    𝑖∈𝑁      𝑗=1crucial to prevent disorientation or motion sickness [Deng et al.
2022; Sutcliffe et al. 2019]. To offer instantaneous output and feed-     where 𝑐𝑖is the evaluated color by SHs viewed from the camera
back, most interactive systems support basic transformations in-      to the kernel’s mean. 𝛼𝑖is the product of the kernel’s opacity and
cluding rotation, scaling, and translation. Our system additionally    2D Gaussian weight evaluated at the pixel coordinate. Leveraging

## PDF 第 4 页

4   •   Y. Jiang, C. Yu, T. Xie, X. Li, Y. Feng, H. Wang, M. Li, H. Lau, F. Gao, Y. Yang, C. Jiang



    Object–level 3D Scene Reconstruction         GS Embedded Geometry Reconstruction        VR-GS Simulation and Rendering

                                                     Two-level
                                  Real Scene
                                              Embedding
                                 Capture
                                                          LocalLocal EmbeddingEmbedding
                           COLMAP
                                           Calibration         Global Embedding


                         3D Gaussian          Mesh
                                      Splatting         Reconstruction
                                                                                                Dynamics and Illuminations
                                  Segmentation     VDB Reconstruction                                           Extended Position-based Dynamics

                                                                                                                                             Collision Handing
                                       Inpainting           Tet Generation
                                                                                                                  Gaussian Rasterizer with Shadow Ray



Fig. 2. VR-GS is an interactive system designed to integrate 3D Gaussian Splatting (GS) and eXtended Position-based Dynamics (XPBD) for generating a
real-time interactive experience. Beginning with multi-view images, the pipeline combines scene reconstruction, segmentation, and inpainting using Gaussian
kernels. These kernels form the foundation for VR-GS’s utilization of the sparse volumetric data structure VDB, facilitating bounding mesh reconstruction and
subsequent tetrahedralization. VR-GS further harnesses a novel two-level Gaussian embedding, XPBD, collision detection, and shadow casting techniques, all
converging to deliver a captivating and immersive user experience.

a differentiable implementation, the rendering loss towards the     where 𝑀2𝑑represents colored 2D segmentation results and 𝐼denotes
ground truth image can be backpropagated to Gaussians’ parameters      the rendering of 3D Gaussian kernels with colors replaced by the
for optimization.                                                 extended RGB attributes instead of evaluated from SHs. Thus, the
   In contrast to traditional NeRFs based on implicit scene represen-       total loss becomes
tations, GS provides an explicit representation that can be seamlessly
integrated with post-processing manipulations, such as animating
                                                                                                         𝐿total = (1 −𝜆)𝐿1 + 𝜆𝐿SSIM + 𝜆seg𝐿seg,              (3)and editing. Moreover, the efficient rasterization and superior ren-
dering quality of 3D Gaussians facilitate their integration with VR.
                                                          where 𝐿1 and 𝐿SSIM are computed between the normally rendered
4.2  VR-GS Assets Preparation                                images and the multi-view ground truths. We use 𝜆= 0.2 and
Each 3D asset in our VR system consists of a high-fidelity 3D GS       𝜆seg = 0.1 in all our experiments.
reconstruction and an envoloping simulatable tetrahedral mesh in
a moderate resolution to enable real-time physics-aware dynamics.       4.2.2   Inpainting. After 3D GS segmentation, we extract all objects
These preparations are conducted offline before immersive and      separately from the scene. This process of object removal, however,
interactive editings within our VR environment, which includes:         results in the emergence of holes within the regions that are pre-
                                                                     viously occluded. To alleviate the issue, we utilize a 2D inpainting
    • Segmented GS Generation: we support interactions with in-                                                                            tool LaMa [Suvorov et al. 2022] to guide the 3D inpainting of Gauss-
        dividual objects in a large scene, achieved by segmented GS                                                                     ian kernels. We freeze the Gaussian kernels located outside of the
        reconstructions.                                                                    holes and then use an inpainting loss 𝐿inpaint = 𝐿1(𝐼inpainted, 𝐼) to
    • Inpainting: The occluded parts between the objects and their                                                                  optimize a Gaussian kernel patch under the guidance of the 2D
       supporting planes usually have no texture. We inpaint 3D                                                                    inpainted images 𝐼inpainted for the current 3D GS rendering 𝐼. The
     GS representations leveraging a 2D inpainting technique.                                                                             result of our inpainting is validated in Section 5.
    • Mesh Generation: A simulation-ready tetrahedral mesh is
       generated for each object.
                                                                                  4.2.3  Mesh Generation. Due to our design choice to use mesh-
4.2.1  Segmentation. The segmented GS is constructed during GS      based simulation, we generate a tetrahedral mesh for each group of
training. We first generate 2D masks on the multi-view RGB images      the segmented 3D GS kernels. These meshes will not be rendered
by utilizing a 2D segmentation model [Cheng et al. 2023]. Each      during the interaction but only serve as the media of dynamics.
segmented part is assigned a different color that is consistent across     Hence we can use a moderate mesh resolution which does not
different views. Subsequently, we enhance the scene representation      hinder performance. To construct a simulation mesh, we first use
by integrating three additional learnable RGB attributes into the       internal filling proposed by [Xie et al. 2024] to fill particles into the
3D Gaussian kernels. During the reconstruction process, each 3D      void internal region that is not reconstructed by GS. Then we treat
Gaussian kernel will automatically learn what object it belongs to      centers of Gaussians as a point cloud and convert it to a voxelized
utilizing a segmentation loss function 𝐿seg:                   VDB representation [Museth 2013]. A water-tight surface mesh is
                                                                  then extracted using marching cubes [Lorensen and Cline 1987] and
                         𝐿seg = 𝐿1(𝑀2𝑑, 𝐼),                         (2)      tetrahedralized into a finite element mesh using TetGen [Si 2015].

## PDF 第 5 页

                                                                VR-GS: A Physical Dynamics-Aware Interactive Gaussian Splatting System in Virtual Reality   •  5


           Rest Shape                         Stretched
Naive                                                                  GaussianGaussian         Embedding                                                               Embedding                             Embedding
                                                                          Local tet                                                                        Global tet                   NaiveTwo-level Embedding


Fig. 3. Our two-level embedding effectively resolves spiky artifacts. Each
Gaussian kernel is embedded into a local tetrahedron. The vertices of the                                                                                                                                                                                                                                                                                                                                             Embedding
local tetrahedron are independently embedded into the global mesh.
                                                                                                                                                                                                                                                                                                                                             Two-level4.3  Unified Framework for Simulation and Rendering

As shown in Xie et al. [2024], Gaussian kernels can be deformed by
                                                                                            Fig. 4. Two-level Embedding Evaluation. Our two-level embedding alle-
the simulated deformation field. We follow the Gaussian kinematics
                                                                                    viates the commonly seen spiky artifacts for deformed GS kernels.
of this work but replace the simulator with XPBD [Macklin et al.
2016] to achieve real-time interactions. We employ the strain energy
constraint as the elastic model and adopt the velocity-based damping
model in the XPBD framework.

4.3.1  Physical Parameters. The physical parameters, such as densi-
ties and material stiffness, are tunable hyperparameters. Following
PhysGaussian [Xie et al. 2024], we manually set physical parameters
for all interactable objects, including Young’s modules (𝐸), Poisson                  Original               Removed                   Inpainted
ratio (𝜈), and density (𝜌). We start from an initial configuration
𝐸= 1000 Pa,𝜈= 0.3, 𝜌= 1000 kg for each object, then tune them to        Fig. 5. Inpainting Evaluation. GS struggles to reconstruct occluded sur-
produce visually plausible dynamics. The Young’s modulus governs        faces. By leveraging LAMA [Suvorov et al. 2022], we produce 2D inpainted
the overall stiffness of an object and is manually adjusted by ana-       results that guide the 3D scene inpainting, enhancing the realism of the 3D
lyzing the severity of deformation of its free fall collision with the       representation.
ground. Additionally, we adjust the relative density between two
objects based on their deformations under collision. In practice we
usually arrive at a finalized parameter setting that gives visually
                                                                                        (1) Local embedding: we independently envelope every Gauss-plausible results within 10 iterations of this manual process.
                                                                             ian kernel by an as-tight-as-possible tetrahedron. There is
4.3.2  Embedding. In our mesh-based simulation, the deformation           no connectivity between these local tetrahedra.
map is piece-wise linear, with the resulting deformation gradient            (2) Global embedding: we embed the vertices of local tetrahedra
piece-wise constant within each tetrahedron. Given a tetrahedron              into the global simulation mesh.
with the rest-shape configuration {𝒙00, 𝒙01, 𝒙02, 𝒙03} and the current                                                      As the global mesh is deformed by the simulation, the vertices ofconfiguration {𝒙0, 𝒙1, 𝒙2, 𝒙3}, the deformation gradient is defined
                                                                            local tetrahedra are kept inside the boundary, driving the kinetic
as
                                                                    evolution of Gaussian kernels. A local tetrahedron could overlap
 𝑭=  𝒙1 −𝒙0, 𝒙2 −𝒙0, 𝒙3 −𝒙0  𝒙01 −𝒙00, 𝒙02 −𝒙00, 𝒙03 −𝒙00 −1 , (4)     with multiple global tetrahedra. The deformation map on it can be
where the inverse of the rest-shape basis can be computed pre-     understood as the average of the surrounding global tetrahedra,
simulation. The mean and the covariance matrix of the deformed      hence eliminating sharp, spiky artifacts, as validated in Section 5.
Gaussian kernel inside this tetrahedron is given by
                                                                                   4.3.3  Shadow Map. While the original global illumination of the
           𝝁= ∑︁ 𝑤𝑖𝒙𝑖,  𝚺= 𝑭𝚺0𝑭𝑇,                   (5)      scene can be accurately learned and baked by the spherical har-
                                         𝑖                                       monics on each Gaussian, the shadow will no longer be aligned
where 𝑤𝑖is the barycentric coordinates of the initial center 𝝁0 in the      with the object when it is moving or deforming. Bringing shadow
rest-shape configuration, and 𝚺0 is the initial covariance matrix [Xie    map [Wanger et al. 1992] into the GS framework can enhance the
et al. 2024]. The deformed Gaussian kernels can be directly rendered      immersive experience in VR. More importantly, it can guide human
by the point splatting procedure. However, the direct embedding      perception of the spatial relationships between objects: during ma-
of Gaussian centers cannot guarantee that every ellipse shape is       nipulation, users will rely on the shadow to determine the distance
completely enveloped by some tetrahedron inside the simulation     between objects. The shadow map is a fast real-time algorithm and
mesh. As shown in Figure 3, this can lead to spiky artifacts. Observe        is well-aligned with the GS rasterization pipeline. We follow Equa-
that kernels that are completely inside the tetrahedron will always       tion (1) to estimate the depth map from the light source and test the
be inside. This motivates us to propose a two-level embedding pro-       visibility for each Gaussian using this depth map. The influence of
cedure:                                                   shadow maps is studied in Section 5.

## PDF 第 6 页

6   •   Y. Jiang, C. Yu, T. Xie, X. Li, Y. Feng, H. Wang, M. Li, H. Lau, F. Gao, Y. Yang, C. Jiang


5  EVALUATION

In this section, we assess the essential components of our proposed
system, including two-level GS embedding and shadow map.

   Two-level Embedding. The two-level embedding is a crucial com-
ponent in our physical dynamics-aware system, integrating the
tetrahedra cage mesh with the embedded Gaussian. In Figure 4, we
conduct an ablation study to validate the effectiveness of our two-
level embedding approach. Under conditions of extreme stretching
or twisting, the naive embedding method, which simply embeds
the Gaussian kernel within the closest tetrahedron, leads to severe
spiky artifacts. Our two-level embedding strategy addresses this
by initially embedding each Gaussian into a localized, independent
                                                                            w/o Shadow Map                 w/ Shadow Maptetrahedron, followed by embedding the vertices of this tetrahedron
into the cage mesh. The deformation of each Gaussian kernel is de-
                                                                                         Fig. 6. Shadow Map Evaluation. GS traditionally models shadows astermined by averaging the deformations at these vertices, resulting
                                                                                          static surface textures. Our approach, employing a shadow map, generates
in a smoother deformation gradient field than the naive approach
                                                                  dynamic shadows for a more immersive experience.
and significantly reducing spiky artifacts.

   Inpainting. With the guidance of 2D image segmentation results,
our system achieves object-level 3D scene reconstruction, facilitat-
ing convenient post-physics-based manipulation. However, GS is       details. Conversely, a higher-resolution mesh inevitably increases
limited to reconstructing surfaces visible in the provided multi-view      the computational cost. Moreover, XPBD also requires much more
training images. Consequently, some object and background areas,      iterations to achieve convergence for finer meshes. Without suffi-
unseen in these images, remain unreconstructed by GS, leading to       cient iterations, the simulated object may appear to be overly soft,
“black hole” like artifacts when foreground objects are moved. To       yielding unrealistic dynamics. In practice, we constrain the number
address this, our system integrates the object segmentation mask      of mesh vertices to between 10K and 30K to maintain a balance
with LAMA [Suvorov et al. 2022], a 2D inpainting model, to gen-     between high frame rates and accurate physical dynamics.
erate inpainted multi-view images. These images then guide the     We then compare VR-
fine-tuning and inpainting of our 3D GS scene, yielding a more    GS against two  state-of-             PAC-   Phys-     VR-GS
complete and realistic user experience, as evidenced in Figure 5.         the-art NeRF/GS physics-    Example   NeRF  Gaussian  (Ours)
                                                                based manipulation meth-     Stool       0.750     0.112      0.017  Shadow Map. Furthermore, we take advantage of the shadow
                                                                       ods: PAC-NeRF [Li et  al.     Chair       0.813     0.219      0.022map to add extra time-dependent shadows into the GS scene, as
                                                                  2023a] and PhysGaussian      Materials   0.625      0.39      0.021shown in 6. Original GS represents shadows as textures and thus
                                                                      [Xie et al. 2024]. PAC-NeRFfails to provide dynamic shadows when objects move. VR-GS allows
                                                                     primarily concentrates on estimating material parameters fromusers to choose the parameters, e.g. position and direction, of the
                                                                    multi-view videos in reconstructed NeRF scenes. Although it offerslight source to reproduce the lighting setting of the original scene,
                                                                 novel dynamic generation capabilities, the resulting visuals oftenleading to a more realistic VR environment.
                                                                                              fall short in rendering quality. In contrast, PhysGaussian, leveraging
6  EXPERIMENT                                               GS, produces superior photorealistic dynamics. However, the Mate-
                                                                                       rial Point Method (MPM) used by both systems can limit real-time
In this section, we benchmark our VR-GS system’s simulation per-
                                                                performance in complex scenes. For a fair comparison, we standard-
formance against other methods in GS and NeRF manipulation.
                                                                                ize the frame time (Δ𝑡frame = 1/25 sec) and the simulation step timeAdditionally, we showcase interactive demonstrations on VR de-
                                                                                (Δ𝑡step = 0.0001 sec) across all methods. For VR-GS, we set the XPBDvices. Our prototype, developed in Unity with a CUDA-implemented
                                                                           iteration per substep to 1, as the small Δ𝑡step sufficiently resolvesplugin, is tested using a Quest Pro Head-Mounted Display (HMD)
                                                                      the dynamics. As depicted in Figure 7 and the inset table, VR-GS not
and corresponding controllers, on an Intel Core i9-14900KF CPU
                                                                only matches the visual quality of PhysGaussian but also outper-
with 32GB memory and an NVIDIA GeForce RTX 4090 GPU.
                                                                forms PAC-NeRF in clarity and realism. Crucially, our XPBD-based
6.1  Performance                                                 simulation framework allows for significantly faster simulations,
                                                          making VR-GS ideal for real-time physics-aware interactions.
VR-GS is designed for real-time, physics-aware interactions by inte-
grating Gaussian kernels within a cage mesh for simulation. This
                                                                      6.2  VR Demoscage mesh is derived from the VDB representation of Gaussians,
with adjustable mesh resolution to influence quality. We first con-    We then showcase VR-GS’s capability to replicate real-world scenar-
duct experiments to explore the trade-offs between mesh quality       ios through several representative demos in VR. Detailed simulation
and system performance. As shown in Figure 12, using a coarse cage      setups and a timing breakdown for these demos are provided in
mesh facilitates higher frame rates but may lead to the loss of fine      Table 1 and Figure 13.

## PDF 第 7 页

                                                                VR-GS: A Physical Dynamics-Aware Interactive Gaussian Splatting System in Virtual Reality   •  7


              Chair                        Stool                       Materials                for the simulation, finally producing the GS human animation that
                                                              can be viewed in our immersive system. PAC-NeRF

                                                                      6.3  Modeling Details

                                             We employ the Toy Collection (Figure 11) as a case study to demon-  PhysGaussian                                                                          strate the time and labor required to create a fully interactive VR
                                                              environment from scratch. The setup process is as follows:

                                                                                        (1) The initial stage involves setting up the real-world scene. For  VR-GS(Ours)
                                                                          the Toy Collection, the indoor scene was captured directly
                                                                             as one scene, with all toys separately hung with strings as
Fig. 7. Visual Quality Comparison. Our method synthesizes competitive                                                                        another scene. We completed it within 20 minutes.
visual results compared to PhysGuassian [Xie et al. 2024] and significantly
                                                                                        (2) Next, we capture multi-view images for Gaussian Splatting
outperforms PAC-NeRF [Li et al. 2023a].
                                                                  by recording videos of the two scenes with a consumer-level
                                                                 camera and converting them into image sequences. Cam-
     Table 1. Parameters and Timings of Demos in Section 6.2.
                                                                            era intrinsic and extrinsic parameters are collected using
                                                        COLMAP, with the entire process taking around 60 minutes,
     Example                     #Gaussians   #Verts.   #Iter*  CD*   FPS
                                                                                 of which COLMAP occupies approximately 40 minutes.      (Figure 9) Fox                     304,875   28,205    1        /    161.2
      (Figure 9) Bear                   2,525,891   19,472    5        /     76.9                  (3) We then proceed to image processing for segmentation and
      (Figure 9) Horse                  1,295,223   10,611    5        /    115.4                   inpainting. Object classes are manually designated in the
      (Figure 10) Ring Toss             1,456,209    9,002    10     10    37.7                        first video frame. Subsequent frames are automatically seg-      (Figure 10) Table Brick Game     1,866,835   33,279    10     10    41.4
      (Figure 11) Toy Collection        1,665,128   46,428    20     20    24.3               mented using the method from Cheng et al. [2023], taking
      (Figure 5) Box Moving            1,769,412    1,434    10        /     73.8                 about 2 minutes. The inpainting of what’s below the bas-
      (Figure 1) Animal Crossing       1,312,670   36,386    10     5     34.7                  ket is fully automated [Suvorov et al. 2022] and requires 5      (Figure 8) Just Dance             1,059,054   13,936    50        /     33.9
   *#Iter: XPBD iterations per substep; CD: collision detections per step.               minutes.
                                                                                        (4) GS reconstruction is performed on the processed images,
                                                                      undergoing 30,000 training steps as specified by Kerbl et al.
   Fox, Bear, and Horse Manipulation. VR-GS empowers users to edit              [2023] without additional treatment for the number of Gaus-
3D Gaussian kernels intuitively and efficiently, utilizing our XPBD-               sians, which takes about 30 minutes on a single RTX 4090.
based physics engine for dynamic manipulation. We demonstrate            (5) After generating 3D GS, we execute internal filling, VDB
this through three examples as depicted in Figure 9: a fox, a bear,              reconstruction, and TetGen, all within 10 minutes.
and a horse, reconstructed from the Instant-NGP dataset [Müller            (6) Lastly, object world positions and physical parameters are
et al. 2022], the Instruct-NeRF2NeRF [Haque et al. 2023], and the               specified and estimated in Unity, as detailed in Section 4.3.1,
Tanks and Temples dataset [Knapitsch et al. 2017], respectively.                taking 20 minutes.

  Ring Toss and Table Brick Game. In this example, we demonstrate
                                                                     In summary, the total preparation time for the Toy Collection isthe system’s ability to seamlessly integrate new virtual objects into
                                                                  approximately 2 hours and 30 minutes. Manual tasks include sceneexisting scenes. We use a room scene reconstructed from real-world
                                                                           staging, video recording, object class specification, and physical pa-footage and virtual objects (rings and bricks modeled in Blender)
                                                                  rameter selection. All other processes are automated. Once modeled,to create ring tossing and table brick game (Figure 10). The dining
                                                                     the scene is ready for a physics-aware interactive VR experience.table and objects on it serve as collision boundaries for the elastic
ring and rigid bricks [Deul et al. 2016].
  Toy Collection and Animal Crossing. We reconstructed a living     7  USER STUDY
room scene and a set of plush toys (Figure 11) for users to inter-    We conducted a user study including two tasks with 10 participants:
act with. The yellow spherical toy is generated using a text-to-3D      2 professionals (P1–P2) with 5 and 7 years of experience in 3D VFX
generator LucidDreamer [Liang et al. 2023], while the others are      software (including Houdini and Blender), and 8 novices (P3–P10),
reconstructed. Additionally, four animal plush toys were placed      with P2 also having 2 years of VR experience. Our study used the
on chairs, allowing users to manipulate and deform them freely     hardware specified in the experimental section and included the
(Figure 1).                                                              Fox, Bear, House, Ring Toss, and Toy Collection demos. Participants
                                                                       received a 10-minute video tutorial on our system before completing
   Just Dance. VR-GS also supports animation of reconstructed GS
                                                        two tasks. After task 2, they answered a questionnaire covering
humans (Figure 8). Utilizing a reconstructed human character, we
                                                                              usability (System Usability Scale [Bangor et al. 2009]) and subjectiveleverage Mixamo1’s auto-rig to generate motion sequences of its
                                                                feedback on individual and overall system features, as shown in
surface mesh. These sequences then serve as the boundary condition
                                                                       Section 7.2. Additionally, we conducted a 20-minute semi-structured
1https://www.mixamo.com/                                                interview for more in-depth feedback.

## PDF 第 8 页

8   •   Y. Jiang, C. Yu, T. Xie, X. Li, Y. Feng, H. Wang, M. Li, H. Lau, F. Gao, Y. Yang, C. Jiang





                                   Fig. 8. Just Dance. VR-GS generates high-fidelity dance given a reconstructed human body.


7.1  Tasks                                                8  CONCLUSION AND FUTURE WORK

   Task 1: Goal-directed (30 minutes). The participants were required    We presented a physical dynamics-aware interactive Gaussian Splat-
to play two VR games developed by our system: ring toss and toy      ting system for addressing challenges in editing real-time high-
collection (Figure 11) in two different settings (S1: physics-based and       fidelity virtual content. By leveraging the advancements in Gauss-
S2: transform-based interaction). Each game had a 5-minute duration      ian Splatting, VR-GS bridges the quality gap traditionally observed
under each configuration. A 5-minute break was allowed between     between machine-generated and manually created 3D content. Our
sessions. The arrangement of sessions and tasks used a Latin square      system not only enhances the realism and immersion via physically-
design to counter potential learning effects. We requested users to      based dynamics, but also provides fine-grained interaction and ma-
rate the immersive and realistic experience in VR using a 7-point      nipulation controllability.
Likert scale.                                                      Although all the study participants appreciated the efficiency and
                                                                          effectiveness of our system, it still remains to be improved. Firstly,
                                                                   rendering high-fidelity Gaussian kernels in VR is computationally
                                                             demanding. As a result, rendering generative dynamics in a large
   Task 2: Open-ended (30 minutes). The participants are asked to edit                                                                 scene with 2K resolution might lead to potential latency issues in
the scene and generate dynamics freely in aforementioned scenes                                                              our system. Secondly, the physical parameters in our system are
(shown in Figure 9), Figure 10 and Figure 11) with our prototype                                                             manually defined. Estimating parameters from videos like PAC-
system, which includes geometry-based editing, physics-based edit-                                                     NeRF [Li et al. 2023a], or leveraging large-vision models, would
ing, transform, rotation, duplicating, undoing, rescaling, etc. Task 2                                                              be interesting directions to automate this process. In future work,
is designed to evaluate the detailed potential factors impacting VR                                                 we aim to incorporate a broader range of materials, such as fluid
immersive experience.                                                               [Feng et al. 2024a] and cloth, to enhance the system’s capabilities.
                                                                 Furthermore, it is also interesting to explore how to utilize large
                                                                 multimodal models to assess the fidelity of the generated dynamics.

7.2  Results and Discussion                       ACKNOWLEDGMENTS
According to a paired t-test conducted on the score collected from    We thank the anonymous reviewers for their valuable feedback. We
task 1, it could be noticed that physics-based interaction significantly      acknowledge support from NSF (2301040, 2008915, 2244651, 2008564,
enhanced user immersion and realism compared to transform-based      2153851, 2023780), UC-MRPI, Sony, Amazon, and TRI.
interaction (physics-based: 6.1 vs transform-based: 4.8 on average,
p = .0227). As shown in Figure 14, our system has received overall    REFERENCES
positive opinions. Users spoke highly of the placement of virtual       Aaron Bangor, Philip Kortum, and James Miller. 2009. Determining what individual
content. Transforming objects without physics rules resulted in         SUS scores mean: Adding an adjective rating scale. Journal of usability studies 4, 3
                                                                                                        (2009), 114–123.
floating objects, while in our system, all virtual content placements,      Chong Bao, Yinda Zhang, Bangbang Yang, Tianxing Fan, Zesong Yang, Hujun Bao,
such as putting toys onto a sofa, are followed by physics rules and         Guofeng Zhang, and Zhaopeng Cui. 2023. Sine: Semantic-driven image-based nerf
are consistent with the user’s understanding. P7 commented, “I love            editing with prior-guided editing field. In Proceedings of the IEEE/CVF Conference on
                                                                                 Computer Vision and Pattern Recognition. 20919–20929.
this a lot. I have a dog. Petting the fox is really like what I did to        Jianchuan Chen, Ying Zhang, Di Kang, Xuefei Zhe, Linchao Bao, Xu Jia, and Huchuan
my dog at home. I felt so real. Moreover, the placement of the toy is           Lu. 2021. Animatable neural radiance fields from monocular rgb videos. arXiv
                                                                                                    preprint arXiv:2106.13629 (2021).
awesome. After they all fell to the basket, the basket even shook for       Yiwen Chen, Zilong Chen, Chi Zhang, Feng Wang, Xiaofeng Yang, Yikai Wang, Zhon-
a while.” The VR-GS system’s realistic lighting and physics-based         gang Cai, Lei Yang, Huaping Liu, and Guosheng Lin. 2023. Gaussianeditor: Swift
dynamics create an immersive experience. As a professional user, P2          and controllable 3d editing with gaussian splatting. arXiv preprint arXiv:2311.14521
                                                                                                        (2023).
spoke highly of high-fidelity generative dynamics and illumination.     Ho Kei Cheng, Seoung Wug Oh, Brian Price, Joon-Young Lee, and Alexander Schwing.
“Those motions of virtual content are just like what I see in the physical           2023. Putting the Object Back into Video Object Segmentation. arXiv preprint
world. I can’t wait to take photos of my own house and then put them           arXiv:2310.12982 (2023).                                                                             Nianchen Deng, Zhenyi  He,  Jiannan  Ye, Budmonde  Duinkharjav,  Praneeth
in VR with my video game character.” Users rated the system highly          Chakravarthula, Xubo Yang, and Qi Sun. 2022.  Fov-nerf: Foveated neural radi-
on ease of use (4.6/5) and overall satisfaction (4.8/5). With a System          ance fields for virtual reality. IEEE Transactions on Visualization and Computer
                                                                                          Graphics 28, 11 (2022), 3854–3864.
Usability Scale (SUS) score of 83.5, VR-GS is classified as “excellent”        Crispin Deul, Patrick Charrier, and Jan Bender. 2016. Position-based rigid-body dynam-
according to [Bangor et al. 2009].                                                                    ics. Computer Animation and Virtual Worlds 27, 2 (2016), 103–112.

## PDF 第 9 页

                                                                VR-GS: A Physical Dynamics-Aware Interactive Gaussian Splatting System in Virtual Reality   •  9



Bardienus P Duisterhof, Zhao Mandi, Yunchao Yao, Jia-Wei Liu, Mike Zheng Shou, Shu-       Stephen Lombardi, Tomas Simon, Gabriel Schwartz, Michael Zollhoefer, Yaser Sheikh,
   ran Song, and Jeffrey Ichnowski. 2023. MD-Splatting: Learning Metric Deformation         and Jason Saragih. 2021.  Mixture of volumetric primitives for efficient neural
   from 4D Gaussians in Highly Deformable Scenes. arXiv preprint arXiv:2312.00583           rendering. ACM Transactions on Graphics (ToG) 40, 4 (2021), 1–13.
   (2023).                                                                        William E. Lorensen and Harvey E. Cline. 1987. Marching cubes: A high resolution
Jiemin Fang, Junjie Wang, Xiaopeng Zhang, Lingxi Xie, and Qi Tian. 2023. Gaus-        3D surface construction algorithm. SIGGRAPH Comput. Graph. 21, 4 (aug 1987),
   sianeditor: Editing 3d gaussians delicately with text instructions. arXiv preprint           163–169.
   arXiv:2311.16037 (2023).                                                               Miles Macklin, Matthias Müller, and Nuttapong Chentanez. 2016. XPBD: position-based
Yutao Feng, Xiang Feng, Yintong Shang, Ying Jiang, Chang Yu, Zeshun Zong, Tianjia           simulation of compliant constrained dynamics. In Proceedings of the 9th International
   Shao, Hongzhi Wu, Kun Zhou, Chenfanfu Jiang, et al. 2024a. Gaussian Splashing:           Conference on Motion in Games (Burlingame, California) (MIG ’16). Association for
  Dynamic Fluid Synthesis with Gaussian Splatting. arXiv preprint arXiv:2401.15318         Computing Machinery, New York, NY, USA, 49–54.
   (2024).                                                                        Xiaoxu Meng, Weikai Chen, and Bo Yang. 2023. NeAT: Learning Neural Implicit Surfaces
Yutao Feng, Yintong Shang, Xuan Li, Tianjia Shao, Chenfanfu Jiang, and Yin Yang. 2024b.          with Arbitrary Topologies from Multi-view Images. In Proceedings of the IEEE/CVF
   PIE-NeRF: Physics-based Interactive Elastodynamics with NeRF. In Proceedings of           Conference on Computer Vision and Pattern Recognition. 248–258.
   the IEEE/CVF International Conference on Computer Vision.                         Ben Mildenhall, Pratul P Srinivasan, Matthew Tancik, Jonathan T Barron, Ravi Ra-
Joseph L Gabbard, Deborah Hix, and J Edward Swan. 1999. User-centered design and          mamoorthi, and Ren Ng. 2021. Nerf: Representing scenes as neural radiance fields
   evaluation of virtual environments. IEEE computer Graphics and Applications 19, 6            for view synthesis. Commun. ACM 65, 1 (2021), 99–106.
   (1999), 51–59.                                                                     Matthias Müller, Nuttapong Chentanez, and Miles Macklin. 2016. Simulating visual
Lin Gao, Jia-Mu Sun, Kaichun Mo, Yu-Kun Lai, Leonidas J Guibas, and Jie Yang. 2023.          geometry. In Proceedings of the 9th International Conference on Motion in Games
   SceneHGN: Hierarchical Graph Networks for 3D Indoor Scene Generation with Fine-          (Burlingame, California) (MIG ’16). Association for Computing Machinery, New
   Grained Geometry. IEEE Transactions on Pattern Analysis and Machine Intelligence           York, NY, USA, 31–38.
   (2023).                                                             Thomas Müller, Alex Evans, Christoph Schied, and Alexander Keller. 2022. Instant
Kelly S Hale and Kay M Stanney. 2014. Handbook of virtual environments: Design,           neural graphics primitives with a multiresolution hash encoding. ACM Transactions
   implementation, and applications. CRC Press.                                         on Graphics (ToG) 41, 4 (2022), 1–15.
Ayaan Haque, Matthew Tancik, Alexei A Efros, Aleksander Holynski, and Angjoo       Ken Museth. 2013. VDB: High-resolution sparse volumes with dynamic topology. ACM
   Kanazawa. 2023. Instruct-nerf2nerf: Editing 3d scenes with instructions. arXiv            Trans. Graph. 32, 3, Article 27 (jul 2013), 22 pages.
   preprint arXiv:2303.12789.                                                        Michael Niemeyer and Andreas Geiger. 2021. Campari: Camera-aware decomposed
Yi-Hua Huang, Yan-Pei Cao, Yu-Kun Lai, Ying Shan, and Lin Gao. 2023a. NeRF-texture:           generative neural radiance fields. In 2021 International Conference on 3D Vision (3DV).
   Texture synthesis with neural radiance fields. In ACM SIGGRAPH 2023 Conference           IEEE, 951–961.
   Proceedings. 1–10.                                                               Michael Oechsle, Songyou Peng, and Andreas Geiger. 2021. Unisurf: Unifying neural
Yi-Hua Huang, Yang-Tian Sun, Ziyi Yang, Xiaoyang Lyu, Yan-Pei Cao, and Xiaojuan Qi.            implicit surfaces and radiance fields for multi-view reconstruction. In Proceedings of
   2023b. SC-GS: Sparse-Controlled Gaussian Splatting for Editable Dynamic Scenes.           the IEEE/CVF International Conference on Computer Vision. 5589–5599.
   arXiv preprint arXiv:2312.14937 (2023).                                        Keunhong Park, Utkarsh Sinha, Jonathan T Barron, Sofien Bouaziz, Dan B Goldman,
Roy S Kalawsky. 1999. VRUSE—a computerised diagnostic tool: for usability evaluation          Steven M Seitz, and Ricardo Martin-Brualla. 2021.  Nerfies: Deformable neural
   of virtual/synthetic environment systems. Applied ergonomics 30, 1 (1999), 11–25.            radiance fields. In Proceedings of the IEEE/CVF International Conference on Computer
Bernhard Kerbl, Georgios Kopanas, Thomas Leimkühler, and George Drettakis. 2023.            Vision. 5865–5874.
  3D Gaussian Splatting for Real-Time Radiance Field Rendering. ACM Transactions        Sida Peng, Junting Dong, Qianqian Wang, Shangzhan Zhang, Qing Shuai, Xiaowei
   on Graphics 42, 4 (2023).                                                            Zhou, and Hujun Bao. 2021. Animatable neural radiance fields for modeling dynamic
Arno Knapitsch, Jaesik Park, Qian-Yi Zhou, and Vladlen Koltun. 2017. Tanks and        human bodies. In Proceedings of the IEEE/CVF International Conference on Computer
   temples: Benchmarking large-scale scene reconstruction. ACM Transactions on            Vision. 14314–14323.
   Graphics (ToG) 36, 4, 1–13.                                                             Albert Pumarola, Enric Corona, Gerard Pons-Moll, and Francesc Moreno-Noguer. 2021.
Chaojian Li, Sixu Li, Yang Zhao, Wenbo Zhu, and Yingyan Lin. 2022a. RT-NeRF: Real-           D-nerf: Neural radiance fields for dynamic scenes. In Proceedings of the IEEE/CVF
  Time On-Device Neural Radiance Fields Towards Immersive AR/VR Rendering. In           Conference on Computer Vision and Pattern Recognition. 10318–10327.
   Proceedings of the 41st IEEE/ACM International Conference on Computer-Aided Design.       Charles R Qi, Hao Su, Kaichun Mo, and Leonidas J Guibas. 2017.  Pointnet: Deep
   1–9.                                                                                      learning on point sets for 3d classification and segmentation. In Proceedings of the
Ke Li, Tim Rolff, Reinhard Bacher, and Frank Steinicke. 2023b. RealityGit: Cross Reality          IEEE conference on computer vision and pattern recognition. 652–660.
   Version Control of R&D Optical Workbench. In 2023 IEEE International Symposium        Yi-Ling Qiao, Alexander Gao, Yiran Xu, Yue Feng, Jia-Bin Huang, and Ming C Lin. 2023.
   on Mixed and Augmented Reality Adjunct (ISMAR-Adjunct). IEEE, 807–808.               Dynamic mesh-aware radiance fields. In Proceedings of the IEEE/CVF International
Ke Li, Tim Rolff, Susanne Schmidt, Reinhard Bacher, Simone Frintrop, Wim Leemans,           Conference on Computer Vision. 385–396.
   and Frank Steinicke. 2022b. Immersive Neural Graphics Primitives. arXiv preprint        Daniel Rebain, Wei Jiang, Soroosh Yazdani, Ke Li, Kwang Moo Yi, and Andrea Tagliasac-
   arXiv:2211.13494 (2022).                                                                               chi. 2021. Derf: Decomposed radiance fields. In Proceedings of the IEEE/CVF Confer-
Ke Li, Tim Rolff, Susanne Schmidt, Reinhard Bacher, Wim Leemans, and Frank Steinicke.           ence on Computer Vision and Pattern Recognition. 14153–14161.
   2023c. Interacting with Neural Radiance Fields in Immersive Virtual Reality. In      Tim Rolff, Susanne Schmidt, Ke Li, Frank Steinicke, and Simone Frintrop. 2023. VRS-
   Extended Abstracts of the 2023 CHI Conference on Human Factors in Computing          NeRF: Accelerating Neural Radiance Field Rendering with Variable Rate Shading. In
   Systems. 1–4.                                                                           2023 IEEE International Symposium on Mixed and Augmented Reality (ISMAR). IEEE,
Ke Li, Susanne Schmidt, Tim Rolff, Reinhard Bacher, Wim Leemans, and Frank Steinicke.          243–252.
   2023d. Magic nerf lens: Interactive fusion of neural radiance fields for virtual facility      Hang Si. 2015. TetGen, a Delaunay-Based Quality Tetrahedral Mesh Generator. ACM
   inspection. arXiv preprint arXiv:2307.09860 (2023).                                            Trans. Math. Softw. 41, 2, Article 11 (feb 2015), 36 pages.
Shaoxu Li and Ye Pan. 2023. Interactive Geometry Editing of Neural Radiance Fields.       Liangchen Song, Anpei Chen, Zhong Li, Zhang Chen, Lele Chen, Junsong Yuan, Yi Xu,
   arXiv preprint arXiv:2303.11537 (2023).                                             and Andreas Geiger. 2023. Nerfplayer: A streamable dynamic scene representation
Xuan Li, Yi-Ling Qiao, Peter Yichen Chen, Krishna Murthy Jatavallabhula, Ming Lin,          with decomposed neural radiance fields. IEEE Transactions on Visualization and
   Chenfanfu Jiang, and Chuang Gan. 2023a. PAC-neRF: Physics augmented continuum          Computer Graphics 29, 5 (2023), 2732–2742.
   neural radiance fields for geometry-agnostic system identification. arXiv preprint       Olga Sorkine and Daniel Cohen-Or. 2004. Least-squares meshes. In Proceedings Shape
   arXiv:2303.05512 (2023).                                                              Modeling Applications, 2004. IEEE, 191–199.
Yixun Liang, Xin Yang, Jiantao Lin, Haodong Li, Xiaogang Xu, and Yingcong Chen.      Kay M Stanney, Mansooreh Mollaghasemi, Leah Reeves, Robert Breaux, and David A
   2023. LucidDreamer: Towards High-Fidelity Text-to-3D Generation via Interval           Graeber. 2003. Usability engineering of virtual environments (VEs): identifying
   Score Matching. arXiv preprint arXiv:2311.11284 (2023).                                    multiple criteria that drive effective VE system design.  International Journal of
Gao Lin, Liu Feng-Lin, Chen Shu-Yu, Jiang Kaiwen, Li Chunpeng, Yukun Lai, and         Human-Computer Studies 58, 4 (2003), 447–481.
   Fu Hongbo. 2023. SketchFaceNeRF: Sketch-based facial generation and editing in       Jia-Mu Sun, Tong Wu, Yong-Liang Yang, Yu-Kun Lai, and Lin Gao. 2023. SOL-NeRF:
   neural radiance fields. ACM Transactions on Graphics (2023).                               Sunlight modeling for outdoor scene decomposition and relighting. In SIGGRAPH
David B Lindell, Julien NP Martel, and Gordon Wetzstein. 2021. Autoint: Automatic inte-          Asia 2023 Conference Papers. 1–11.
   gration for fast neural volume rendering. In Proceedings of the IEEE/CVF Conference         Alistair G Sutcliffe, Charalambos Poullis, Andreas Gregoriades, Irene Katsouri, Aimilia
   on Computer Vision and Pattern Recognition. 14556–14565.                                  Tzanavari, and Kyriakos Herakleous. 2019. Reflecting on the design process for
Lingjie Liu, Jiatao Gu, Kyaw Zaw Lin, Tat-Seng Chua, and Christian Theobalt. 2020.            virtual reality applications. International Journal of Human–Computer Interaction
   Neural sparse voxel fields. Advances in Neural Information Processing Systems 33            35, 2 (2019), 168–179.
   (2020), 15651–15663.                                                  Roman Suvorov, Elizaveta Logacheva, Anton Mashikhin, Anastasia Remizova, Arsenii
                                                                                   Ashukha, Aleksei Silvestrov, Naejin Kong, Harshith Goka, Kiwoong Park, and Victor

## PDF 第 10 页

10   •   Y. Jiang, C. Yu, T. Xie, X. Li, Y. Feng, H. Wang, M. Li, H. Lau, F. Gao, Y. Yang, C. Jiang



   Lempitsky. 2022. Resolution-robust large mask inpainting with fourier convolutions.
   In Proceedings of the IEEE/CVF winter conference on applications of computer vision.
   2149–2159.
Haithem Turki, Vasu Agrawal, Samuel Rota Bulò, Lorenzo Porzi, Peter Kontschieder,
   Deva Ramanan, Michael Zollhöfer, and Christian Richardt. 2023. HybridNeRF:
   Efficient Neural Rendering via Adaptive Volumetric Surfaces.  arXiv preprint
   arXiv:2312.03160 (2023).
Can Wang, Ruixiang Jiang, Menglei Chai, Mingming He, Dongdong Chen, and Jing
   Liao. 2023. Nerf-art: Text-driven neural radiance fields stylization. IEEE Transactions
   on Visualization and Computer Graphics (2023).
Peng Wang, Lingjie Liu, Yuan Liu, Christian Theobalt, Taku Komura, and Wenping
  Wang. 2021.  Neus: Learning neural implicit surfaces by volume rendering for
   multi-view reconstruction. arXiv preprint arXiv:2106.10689 (2021).
L.R. Wanger, J.A. Ferwerda, and D.P. Greenberg. 1992. Perceiving spatial relationships
   in computer-generated images. IEEE Computer Graphics and Applications 12, 3,
   44–58.
Tong Wu, Jia-Mu Sun, Yu-Kun Lai, and Lin Gao. 2023. De-nerf: Decoupled neural
   radiance fields for view-consistent appearance editing and high-frequency environ-
   mental relighting. In ACM SIGGRAPH 2023 conference proceedings. 1–11.
Hongchi Xia, Zhi-Hao Lin, Wei-Chiu Ma, and Shenlong Wang. 2024. Video2Game:
   Real-time, Interactive, Realistic and Browser-Compatible Environment from a Single
   Video. In CVPR.
Tianyi Xie, Zeshun Zong, Yuxin Qiu, Xuan Li, Yutao Feng, Yin Yang, and Chenfanfu
    Jiang. 2024. Physgaussian: Physics-integrated 3d gaussians for generative dynamics.
   In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recogni-
    tion.
Yiheng Xie, Towaki Takikawa, Shunsuke Saito, Or Litany, Shiqin Yan, Numair Khan,
   Federico Tombari, James Tompkin, Vincent Sitzmann, and Srinath Sridhar. 2022.
   Neural fields in visual computing and beyond. In Computer Graphics Forum, Vol. 41.
   Wiley Online Library, 641–676.
Linning Xu, Vasu Agrawal, William Laney, Tony Garcia, Aayush Bansal, Changil Kim,
   Samuel Rota Bulò, Lorenzo Porzi, Peter Kontschieder, Aljaž Božič, et al. 2023a. VR-
   NeRF: High-fidelity virtualized walkable spaces. In SIGGRAPH Asia 2023 Conference
   Papers. 1–12.
Yuelang Xu, Benwang Chen, Zhe Li, Hongwen Zhang, Lizhen Wang, Zerong Zheng,
   and Yebin Liu. 2023b. Gaussian Head Avatar: Ultra High-fidelity Head Avatar via
   Dynamic Gaussians. arXiv preprint arXiv:2312.03029 (2023).
Zeyu Yang, Hongye Yang, Zijie Pan, Xiatian Zhu, and Li Zhang. 2023. Real-time photo-
    realistic dynamic scene representation and rendering with 4d gaussian splatting.
   arXiv preprint arXiv:2310.10642 (2023).
Lior Yariv, Jiatao Gu, Yoni Kasten, and Yaron Lipman. 2021. Volume rendering of neural
   implicit surfaces. Advances in Neural Information Processing Systems 34 (2021),
   4805–4815.
Mingqiao Ye, Martin Danelljan, Fisher Yu, and Lei Ke. 2023. Gaussian grouping: Segment
   and edit anything in 3d scenes. arXiv preprint arXiv:2312.00732 (2023).
Yongning Zhu and Robert Bridson. 2005. Animating sand as a fluid. ACM Transactions
   on Graphics (TOG) 24, 3 (2005), 965–972.
Wojciech Zielonka, Timur Bagautdinov, Shunsuke Saito, Michael Zollhöfer, Justus
   Thies, and Javier Romero. 2023.  Drivable 3d gaussian avatars.  arXiv preprint
   arXiv:2311.08581 (2023).

## PDF 第 11 页

                                                               VR-GS: A Physical Dynamics-Aware Interactive Gaussian Splatting System in Virtual Reality   •  11





                Fig. 9. Fox, Bear, and Horse. VR-GS allows users to manipulate 3D GS at a real-time rate with physically plausible responses.





Fig. 10. Ring Toss and Table Brick Game. Participants can engage in interactive ring toss and table brick breakout games simulated within authentic
environments.





                             Fig. 11. Toy Collection. We place all the toys on the ground first, and then move them into the basket.

## PDF 第 12 页

12   •   Y. Jiang, C. Yu, T. Xie, X. Li, Y. Feng, H. Wang, M. Li, H. Lau, F. Gao, Y. Yang, C. Jiang


            #Verts: 2K               #Verts: 5K               #Verts: 7K               #Verts: 11K              #Verts: 20K             #Verts: 55K
             #Tets: 7K               #Tets: 14K              #Tets: 21K              #Tets: 41K              #Tets: 74K              #Tets: 242K





                   FPS:                                 FPS:                                  FPS:                                 FPS:                                 FPS:                                 FPS:
                135FPS: 135                   72 FPS: 72                   62  FPS: 62                  58 FPS: 58                  45 FPS: 45                   23 FPS: 23





Fig. 12. Trade-offs between Quality and Performance. The top row displays cage meshes at varying resolutions, and the bottom row illustrates the
corresponding simulation dynamics. Low-resolution meshes fail to capture fine dynamic details, whereas high-resolution meshes compromise real-time
performance and can result in overly soft artifacts in the simulated object due to non-converging simulations. We employ mid-resolution meshes in practice to
achieve an optimal balance between high frame rates and realistic physical dynamics.


                                                Collision Detection          Collision Constraint       GS Embedding Interpolation           Left Eye Rendering           Simulation Phase
                                FEM Constraint         XPBD Update            Shadow Map Rendering              Right Eye Rendering         Rendering Phase
                   Fox

                   Bear

                  Horse

               Ring Toss

         Table Brick Game

           Toy Collection

            Box Moving

         Animal Crossing

               Just Dance

                  0%                      20%                     40%                     60%                     80%                      100%


                                                       Fig. 13. Timing Breakdown of Demos in Section 6.2.





                                                                   Physics-based Interaction                    Transform-based Interaction

Fig. 14. Study Results. The left chart summarizes individual (M1-M5: object manipulation, scene inpainting, illumination, dynamics, physics placement) and
system feedback (M6-M9: ease of use, latency, functionality, satisfaction). The right two figures show that physics-based interaction enhances immersion and
realism in editing, whereas transform-based interaction yields less authentic outcomes, e.g. an undeformed and penetrated toys.
