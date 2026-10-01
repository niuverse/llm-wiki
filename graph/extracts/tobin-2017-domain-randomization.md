Domain Randomization for Transferring Deep Neural Networks from
Simulation to the Real World
Josh Tobin1, Rachel Fong2, Alex Ray2, Jonas Schneider2, Wojciech Zaremba2, Pieter Abbeel3
Abstract—Bridgingthe‘realitygap’thatseparatessimulated Training Test
roboticsfromexperimentsonhardwarecouldacceleraterobotic
research through improved data availability. This paper ex-
plores domain randomization, a simple technique for training
modelsonsimulatedimagesthattransfertorealimagesbyran-
domizingrenderinginthesimulator.Withenoughvariabilityin
the simulator, the real world may appear to the model as just
another variation. We focus on the task of object localization,
which is a stepping stone to general robotic manipulation
skills. We find that it is possible to train a real-world object
detector that is accurate to 1.5cm and robust to distractors
and partial occlusions using only data from a simulator with
non-realistic random textures. To demonstrate the capabilities
…
ofourdetectors,weshowtheycanbeusedtoperformgrasping
in a cluttered environment. To our knowledge, this is the first
successful transfer of a deep neural network trained only on
simulated RGB images (without pre-training on real images)
to the real world for the purpose of robotic control.
I. INTRODUCTION
Performing robotic learning in a physics simulator could
accelerate the impact of machine learning on robotics by Fig. 1. Illustration of our approach. An object detector is trained on
hundredsofthousandsoflow-fidelityrenderedimageswithrandomcamera
allowingfaster,morescalable,andlower-costdatacollection
positions, lighting conditions, object positions, and non-realistic textures.
than is possible with physical robots. Learning in simula- Attesttime,thesamedetectorisusedintherealworldwithnoadditional
tion is especially promising for building on recent results training.
using deep reinforcement learning to achieve human-level
performance on tasks like Atari [27] and robotic control
the reality gap, form the barrier to using simulated data on
[21], [38]. Deep reinforcement learning employs random
real robots.
exploration,whichcanbedangerousonphysicalhardware.It
This paper explores domain randomization, a simple but
often requires hundreds of thousands or millions of samples
promising method for addressing the reality gap. Instead of
[27],whichcouldtakethousandsofhourstocollect,making
training a model on a single simulated environment, we
it impractical for many applications. Ideally, we could learn
randomize the simulator to expose the model to a wide
policiesthatencodecomplexbehaviorsentirelyinsimulation
range of environments at training time. The purpose of this
and successfully run those policies on physical robots with
work is to test the following hypothesis: if the variability in
minimal additional training.
simulationissignificantenough,modelstrainedinsimulation
Unfortunately, discrepancies between physics simulators
will generalize to the real world with no additional training.
and the real world make transferring behaviors from sim-
Though in principle domain randomization could be ap-
ulation challenging. System identification, the process of
plied to any component of the reality gap, we focus on the
tuningtheparametersofthesimulationtomatchthebehavior
challenge of transferring from low-fidelity simulated camera
of the physical system, is time-consuming and error-prone.
images. Robotic control from camera pixels is attractive due
Even with strong system identification, the real world has
tothelowcostofcamerasandtherichdatatheyprovide,but
unmodeled physical effects like nonrigidity, gear backlash,
challenging because it involves processing high-dimensional
wear-and-tear, and fluid dynamics that are not captured by
input data. Recent work has shown that supervised learning
current physics simulators. Furthermore, low-fidelity sim-
with deep neural networks is a powerful tool for learning
ulated sensors like image renderers are often unable to
generalizable representations from high-dimensional inputs
reproduce the richness and noise produced by their real-
[20], but deep learning relies on a large amount of labeled
world counterparts. These differences, known collectively as
data. Labeled data is difficult to obtain in the real world
for precise robotic manipulation behaviors, but it is easy to
1OpenAIandUCBerkeleyEECS,josh@openai.com
2OpenAI,{rfong, aray, jonas, woj}@openai.com generate in a physics simulator.
3OpenAI,UCBerkeleyEECS&ICSI,pieter@openai.com We focus on the task of training a neural network to
7102
raM
02
]OR.sc[
1v70960.3071:viXra

detect the location of an object. Object localization from of approaches have been proposed, including re-training the
pixels is a well-studied problem in robotics, and state-of- model in the target domain (e.g., [52]), adapting the weights
the-art methods employ complex, hand-engineered image of the model based on the statistics of the source and target
processing pipelines (e.g., [6], [5], [44]). This work is a first domains (e.g., [22]), learning invariant features between
step toward the goal of using deep learning to improve the domains (e.g., [47]), and learning a mapping from the target
accuracyofobjectdetectionpipelines.Moreover,weseesim- domain to the source domain (e.g., [43]). Researchers in
to-real transfer for object localization as a stepping stone to the reinforcement learning community have also studied the
transferring general-purpose manipulation behaviors. problem of domain adaptation by learning invariant feature
We find that for a range of geometric objects, we are able representations [13], adapting pretrained networks [35], and
to train a detector that is accurate to around 1.5cm in the other methods. See [13] for a more complete treatment of
real world using only simulated data rendered with simple, domain adaptation in the reinforcement learning literature.
algorithmically generated textures. Although previous work In this paper we study the possibility of transfer from
demonstrated the ability to perform robotic control using a simulation to the real world without performing domain
| neural network | pretrained |     | on ImageNet |     | and fine-tuned | on  | adaptation. |     |     |     |     |     |     |     |
| -------------- | ---------- | --- | ----------- | --- | -------------- | --- | ----------- | --- | --- | --- | --- | --- | --- | --- |
randomizedrenderedpixels[37],thispaperprovidesthefirst
|               |      |        |               |     |        |            | C. Bridging | the | reality | gap |     |     |     |     |
| ------------- | ---- | ------ | ------------- | --- | ------ | ---------- | ----------- | --- | ------- | --- | --- | --- | --- | --- |
| demonstration | that | domain | randomization |     | can be | useful for |             |     |         |     |     |     |     |     |
robotictasksrequiringprecision.Wealsoprovideanablation Previous work on leveraging simulated data for physical
study of the impact of different choices of randomization robotic experiments explored several strategies for bridging
| and training | method | on the | success | of  | transfer. We | find that | the reality | gap. |     |     |     |     |     |     |
| ------------ | ------ | ------ | ------- | --- | ------------ | --------- | ----------- | ---- | --- | --- | --- | --- | --- | --- |
with a sufficient number of textures, pre-training the object One approach is to make the simulator closely match
detectorusingrealimagesisunnecessary.Toourknowledge, the physical reality by performing system identification and
this is the first successful transfer of a deep neural network using high-quality rendering. Though using realistic RGB
trained only on simulated RGB images to the real world for rendering alone has had limited success for transferring to
the purpose of robotic control. real robotic tasks [16], incorporating realistic simulation of
|     |     |     |     |     |     |     | depth information |     | can | allow models |     | trained | on rendered |     |
| --- | --- | --- | --- | --- | --- | --- | ----------------- | --- | --- | ------------ | --- | ------- | ----------- | --- |
II. RELATEDWORK
|     |     |     |     |     |     |     | images | to transfer | reasonably | well | to  | the real | world | [32]. |
| --- | --- | --- | --- | --- | --- | --- | ------ | ----------- | ---------- | ---- | --- | -------- | ----- | ----- |
A. Object detection and pose estimation for robotics Combining data from high-quality simulators with other
|     |     |     |     |     |     |     | approaches | like | fine-tuning | can | also reduce |     | the number | of  |
| --- | --- | --- | --- | --- | --- | --- | ---------- | ---- | ----------- | --- | ----------- | --- | ---------- | --- |
Objectdetectionandposeestimationforroboticsisawell-
studied problem in the literature (see, e.g., [4], [5], [6], [10], labeled samples required in the real world [34].
|             |               |            |     |           |         |         | Unlike | these | approaches, | ours | allows | the | use of | low- |
| ----------- | ------------- | ---------- | --- | --------- | ------- | ------- | ------ | ----- | ----------- | ---- | ------ | --- | ------ | ---- |
| [44], [50], | [54]). Recent | approaches |     | typically | involve | offline |        |       |             |      |        |     |        |      |
construction or learning of a 3D model of objects in the quality renderers optimized for speed and not carefully
scene(e.g.,afull3Dmeshmodel[44]ora3Dmetricfeature matched to real-world textures, lighting, and scene config-
urations.
| representation | [5]). | At test | time, | features | from the | test data |     |     |     |     |     |     |     |     |
| -------------- | ----- | ------- | ----- | -------- | -------- | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
(e.g.,Scale-InvariantFeatureTransform[SIFT]features[12] Other work explores using domain adaptation techniques
orcolorco-occurrencehistograms[10])arematchedwiththe to bridge the reality gap. It is often faster to fine-tune a
3D models (or features from the 3D models). For example, controllerlearnedinsimulationthantolearnfromscratchin
a black-box nonlinear optimization algorithm can be used therealworld[7],[18].In[11],theauthorsuseavariational
|             |                   |     |       |     |          |             | autoencoder | trained | on  | simulated | data | to encode | trajectories |     |
| ----------- | ----------------- | --- | ----- | --- | -------- | ----------- | ----------- | ------- | --- | --------- | ---- | --------- | ------------ | --- |
| to minimize | the re-projection |     | error | of  | the SIFT | points from |             |         |     |           |      |           |              |     |
the object model and the 2D points in the test image [4]. of motor outputs corresponding to a desired behavior type
Most successful approaches rely on using multiple camera (e.g., reaching, grasping) as a low-dimensional latent code.
|            |          |             |     |       |           |           | A policy | is learned | on  | real data | mapping | features | to  | distri- |
| ---------- | -------- | ----------- | --- | ----- | --------- | --------- | -------- | ---------- | --- | --------- | ------- | -------- | --- | ------- |
| frames [6] | or depth | information |     | [44]. | There has | also been |          |            |     |           |         |          |     |         |
some success with only monocular camera images [4]. butions over latent codes. The learned policy overcomes the
|          |        |         |             |     |            |         | reality gap | by  | choosing | latent codes | that | correspond |     | to the |
| -------- | ------ | ------- | ----------- | --- | ---------- | ------- | ----------- | --- | -------- | ------------ | ---- | ---------- | --- | ------ |
| Compared | to our | method, | traditional |     | approaches | require |             |     |          |              |      |            |     |        |
less extensive training and take advantage of richer sensory desired physical behavior via exploration.
data, allowing them to detect the full 3D pose of objects Domainadaptationhasalsobeenappliedtoroboticvision.
|           |                  |     |         |     |             |       | Rusu et | al. [36] | explore | using | the | progressive | network |     |
| --------- | ---------------- | --- | ------- | --- | ----------- | ----- | ------- | -------- | ------- | ----- | --- | ----------- | ------- | --- |
| (position | and orientation) |     | without | any | assumptions | about |         |          |         |       |     |             |         |     |
the location or size of the surface on which the objects architecturetoadaptamodelthatispre-trainedonsimulated
|             |          |     |          |        |     |             | pixels, | and find | it has | better sample |     | efficiency | than | fine- |
| ----------- | -------- | --- | -------- | ------ | --- | ----------- | ------- | -------- | ------ | ------------- | --- | ---------- | ---- | ----- |
| are placed. | However, | our | approach | avoids | the | challenging |         |          |        |               |     |            |      |       |
problem of 3D reconstruction, and employs a simple, easy tuningortraininginthereal-worldalone.In[46],theauthors
to implement deep learning-based pipeline that may scale explore learning a correspondence between domains that
allowstherealimagestobemappedintoaspaceunderstood
| better to | more challenging |     | problems. |     |     |     |         |        |           |            |               |       |            |        |
| --------- | ---------------- | --- | --------- | --- | --- | --- | ------- | ------ | --------- | ---------- | ------------- | ----- | ---------- | ------ |
|           |                  |     |           |     |     |     | by the  | model. | While     | both of    | the preceding |       | approaches |        |
| B. Domain | adaptation       |     |           |     |     |     |         |        |           |            |               |       |            |        |
|           |                  |     |           |     |     |     | require | reward | functions | or labeled |               | data, | which      | can be |
The computer vision community has devoted significant difficulttoobtainintherealworld,Mitashandcollaborators
studytotheproblemofadaptingvision-basedmodelstrained [26] explore pretraining an object detector using realistic
in a source domain to a previously unseen target domain rendered images with randomized lighting from 3D models
(see, e.g., [9], [14], [15], [19], [23], [25], [51]). A variety tobootstrapanautomatedlearninglearningprocessthatdoes

notrequiremanuallylabelingdataandusesonlyaround500 Sadeghi and Levine’s work [37] is the most similar to our
real-world samples. own. The authors demonstrate that a policy mapping images
A related idea, iterative learning control, employs real- to controls learned in a simulator with varied 3D scenes and
worlddatatoimprovethedynamicsmodelusedtodetermine textures can be applied successfully to real-world quadrotor
the optimal control behavior, rather than using real-world flight. However, their experiments – collision avoidance in
datatoimprovethecontrollerdirectly.Iterativelearningcon- hallwaysandopenspaces–donotdemonstratetheabilityto
trol starts with a dynamics model, applies the corresponding deal with high-precision tasks. Our approach also does not
controlbehaviorontherealsystem,andthenclosestheloop rely on precise camera information or calibration, instead
by using the resulting data to improve the dynamics model. randomizing the position, orientation, and field of view
Iterative learning control has been applied to a variety of of the camera in the simulator. Whereas their approach
robotic control problems, from model car control (e.g., [1] chooses textures from a dataset of around 200 pre-generated
and [8]) to surgical robotics (e.g., [48]). materials,mostofwhicharerealistic,ourapproachisthefirst
Domain adaptation and iterative learning control are im- touseonlynon-realistictexturescreatedbyasimplerandom
portant tools for addressing the reality gap, but in contrast generation process, which allows us to train on hundreds of
to these approaches, ours requires no additional training on thousands (or more) of unique texturizations of the scene.
real-world data. Our method can also be combined easily
III. METHOD
with most domain adaptation techniques.
Severalauthorshavepreviouslyexploredtheideaofusing Givensomeobjectsofinterest{s } ,ourgoalistotrainan
i i
domain randomization to bridge the reality gap. object detector d(I ) that maps a single monocular camera
0
Inthecontextofphysicsadaptation,Mordatchandcollab- frame I to the Cartesian coordinates {(x ,y ,z )} of each
0 i i i i
orators [28] show that training a policy on an ensemble of object. In addition to the objects of interest, our scenes
dynamicsmodelscanmakethecontrollerrobusttomodeling sometimescontaindistractorobjectsthatmustbeignoredby
error and improve transfer to a real robot. Similarly, in [2], the network. Our approach is to train a deep neural network
the authors train a policy to pivot a tool held in the robot’s insimulationusingdomainrandomization.Theremainderof
gripper in a simulator with randomized friction and action thissectiondescribesthespecificdomainrandomizationand
delays, and find that it works in the real world and is robust neural network training methodology we use.
to errors in estimation of the system parameters.
Ratherthanrelyingoncontrollerrobustness,Yuetal.[53] A. Domain randomization
use a model trained on varied physics to perform system The purpose of domain randomization is to provide
identification using online trajectory data, but their approach enough simulated variability at training time such that at
is not shown to succeed in the real world. Rajeswaran et al. test time the model is able to generalize to real-world data.
[33] explore different training strategies for learning from We randomize the following aspects of the domain for each
an ensemble of models, including adversarial training and sample used during training:
adaptingtheensembledistributionusingdatafromthetarget
• Number and shape of distractor objects on the table
domain, but also do not demonstrate successful real-world
• Position and texture of all objects on the table
transfer.
• Textures of the table, floor, skybox, and robot
Researchers in computer vision have used 3D models as
• Position, orientation, and field of view of the camera
a tool to improve performance on real images since the
• Number of lights in the scene
earliest days of the field (e.g., [30], [24]). More recently,
• Position, orientation, and specular characteristics of the
3D models have been used to augment training data to
lights
aid transferring deep neural networks between datasets and
• Type and amount of random noise added to images
preventover-fittingonsmalldatasetsfortaskslikeviewpoint
Since we use a single monocular camera image from an
estimation [40] and object detection [42], [29]. Recent work
uncalibrated camera to estimate object positions, we fix the
hasexploredusingonlysyntheticdatafortraining2Dobject
height of the table in simulation, effectively creating a 2D
detectors (i.e., predicting a bounding box for objects in the
poseestimationtask.Randomtexturesarechosenamongthe
scene).In[31],theauthorsfindthatbypretraininganetwork
following:
on ImageNet and fine-tuning on synthetic data created from
3D models, better detection performance on the PASCAL (a) A random RGB value
datasetcanbeachievedthantrainingwithonlyafewlabeled (b) A gradient between two random RGB values
examples from the real dataset. (c) A checker pattern between two random RGB values
In contrast to our work, most object detection results The textures of all objects are chosen uniformly at random
in computer vision use realistic textures, but do not create – the detector does not have access to the color of the
coherent 3D scenes. Instead, objects are rendered against a object(s) of interest at training time, only their size and
solid background or a randomly chosen photograph. As a shape.WerenderimagesusingtheMuJoCoPhysicsEngine’s
result,ourapproachallowsourmodelstounderstandthe3D [45] built-in renderer. This renderer is not intended to be
spatial information necessary for rich interactions with the photo-realistic, and physically plausible choices of textures
physical world. and lighting are not needed.

Between 0 and 10 distractor objects are added to the
table in each scene. Distractor objects on the floor or in
the background are unnecessary, despite some clutter (e.g.,
cables) on the floor in our real images.
Our method avoids calibration and precise placement of
the camera in the real world by randomizing characteristics
of the cameras used to render images in training. We manu-
allyplaceacamerainthesimulatedscenethatapproximately
matches the viewpoint and field of view of the real camera.
Each training sample places the camera randomly within a
(10×5×10) cm box around this initial point. The viewing
angle of the camera is calculated analytically to point at a
fixed point on the table, and then offset by up to 0.1 radians
in each direction. The field of view is also scaled by up to Fig.3. Thegeometricobjectsusedinourexperiments.
5% from the starting point.
B. Model architecture and training the object and one or more distractors (also from among the
geometric object set) on a simulated tabletop and (b) a label
Convolutional layers Fully connected layers corresponding to the Cartesian coordinates of the center of
mass of the object in the world frame.
For each experiment, we performed a small hyperparam-
(x, y, z)
eter search, evaluating combinations of two learning rates
(1e−4 and 2e−4) and three batch sizes (25, 50, and 100).
We report the performance of the best network.
(224 x 224 x 64)(112 x 112 x 128)(56 x 56 x 256)(28 x 28 x 512)(14 x 14 x 512)(1 x 1 x 256)(1 x 1 x 64)
The goals of our experiments are:
Fig. 2. The model architecture used in our experiments. Each vertical
bar corresponds to a layer of the model. ReLU nonlinearities are used (a) Evaluate the localization accuracy of our trained de-
throughout, and max pooling occurs between each of the groupings of tectors in the real world, including in the presence of
convolutional layers. The input is an image from an external webcam
distractor objects and partial occlusions
downsized to (224×224) and the output of the network predicts the
(x,y,z)coordinatesofobject(s)ofinterest. (b) Assess which elements of our approach are most
critical for achieving transfer from simulation to the
We parametrize our object detector with a deep convo- real world
lutional neural network. In particular, we use a modified (c) Determine whether the learned detectors are accurate
version the VGG-16 architecture [39] shown in Figure 2. enough to perform robotic manipulation tasks
We chose this architecture because it performs well on a
variety of computer vision tasks, and because it has a wide TABLEI
availability of pretrained weights. We use the standard VGG
Detectionerrorforvariousobjects,cm
convolutional layers, but use smaller fully connected layers
Evaluationtype Objectonly Distractors Occlusions
ofsizes256and64anddonotusedropout.Forthemajority
Cone 1.3±1.11 1.5±1.0 1.4±0.6
of our experiments, we use weights obtained by pretraining Cube 1.3±0.6 1.8±1.2 1.4±0.61
on ImageNet to initialize the convolutional layers, which Cylinder 1.1±0.91 1.9±2.8 1.9±2.9
we hypothesized would be essential to achieving transfer. HexagonalPrism 0.7±0.5 0.6±0.31 1.0±1.01
Inpractice,wefoundthatusingrandomweightinitialization Pyramid 0.9±0.31 1.0±0.51 1.1±0.71
works as well in most cases. RectangularPrism 1.3±0.7 1.2±0.41 0.9±0.6
We train the detector through stochastic gradient descent Tetrahedron 0.8±0.41 1.0±0.41 3.2±5.8
TriangularPrism 0.9±0.41 0.9±0.41 1.9±2.2
on the L loss between the object positions estimated by
2
the network and the true object positions using the Adam
optimizer[17].Wefoundthatusingalearningrateofaround
B. Localization accuracy
1e−4(asopposedtothestandard1e−3forAdam)improved
To evaluate the accuracy of learned detectors in the real
convergence and helped avoid a common local optimum,
world, we captured 480 webcam images of one or more
mapping all objects to the center of the table.
geometricobjectsonatableatadistanceof70cmto105cm
IV. EXPERIMENTS from the camera. The camera position remains constant
A. Experimental Setup across all images. We did not control for lighting conditions
or the rest of the scene around the table (e.g., all images
We evaluated our approach by training object detectors
contain part of the robot and tape and wires on the floor).
for each of eight geometric objects. We constructed mesh
representations for each object to render in the simulator.
1Categories for which the best final performance was achieved for
Each training sample consists of (a) a rendered image of detectortrainedfromscratch.

We measured ground truth positions for a single object per fewas5,000trainingsamples,butperformanceimprovesup
image by aligning the object on a grid on the tabletop. Each to around 50,000 samples.
of the eight geometric objects has 60 labeled images in the Figure 4 also compares to the performance of a model
dataset: 20 with the object alone on the table, 20 in which trainedfromscratch(i.e.,withoutusingpre-trainedImageNet
one or more distractor objects are present on the table, and weights).Ourhypothesisthatpre-trainingwouldbeessential
20 in which the object is also partially occluded by another to generalizing to the real world proved to be false. With a
object. large amount of training data, random weight initialization
TableI summarizesthe performanceof ourmodelson the can achieve nearly the same performance in transferring to
test set. Our object detectors are able to localize objects to the real world as does pre-trained weight initialization. The
within1.5cm(onaverage)intherealworldandperformwell best detectors for a given object were often those initialized
in the presence of clutter and partial occlusions. Though the with random weights. However, using a pre-trained model
accuracyofourtraineddetectorsispromising,notethatthey can significantly improve performance when less training
over-fitting2
| are still |     | the | simulated | training |     | data, where | error | data is used. |     |     |     |     |     |     |
| --------- | --- | --- | --------- | -------- | --- | ----------- | ----- | ------------- | --- | --- | --- | --- | --- | --- |
is 0.3cm to 0.5cm. Even with over-fitting, the accuracy is Figure 5 shows the sensitivity to the number of unique
comparable at a similar distance to the translation error in texturizations of the scene when trained on a fixed number
traditional techniques for pose estimation in clutter from a (10,000) of training examples. We found that performance
singlemonocularcameraframe[5]thatusehigher-resolution degrades significantly when fewer than 1,000 textures are
|     |     |     |     |     |     |     |     | used, indicating |     | that | for our | experiments, | using | a large |
| --- | --- | --- | --- | --- | --- | --- | --- | ---------------- | --- | ---- | ------- | ------------ | ----- | ------- |
images.
numberofrandomtextures(inadditiontorandomdistractors
| C. Ablation | study |     |     |     |     |     |     |     |     |     |     |     |     |     |
| ----------- | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
andobjectpositions)isnecessarytoachievingtransfer.Note
To evaluate the importance of different factors of our that when 1,000 random textures are used in training, the
training methodology, we assessed the sensitivity of the performance using 10,000 images is comparable to that
algorithm to the following: of using only 1,000 images, indicating that in the low
Number of training images data regime, texture randomization is more important than
•
|          |           |                |          |                |             |     |     | randomization | of  | object | positions.3 |     |     |     |
| -------- | --------- | -------------- | -------- | -------------- | ----------- | --- | --- | ------------- | --- | ------ | ----------- | --- | --- | --- |
| • Number | of        | unique         | textures | seen           | in training |     |     |               |     |        |             |     |     |     |
| • Use    | of random | noise          | in       | pre-processing |             |     |     |               |     |        |             |     |     |     |
| Presence |           | of distractors | in       | training       |             |     |     |               |     |        |             |     |     |     |
•
| • Randomization |                | of  | camera  | position | in        | training |     |     |     |     |     |     |     |     |
| --------------- | -------------- | --- | ------- | -------- | --------- | -------- | --- | --- | --- | --- | --- | --- | --- | --- |
| Use             | of pre-trained |     | weights | in the   | detection | model    |     |     |     |     |     |     |     |     |
•
| We found  | that        | the method |     | is at | least somewhat | sensitive |     |                                                                 |         |              |        |        |           |              |
| --------- | ----------- | ---------- | --- | ----- | -------------- | --------- | --- | --------------------------------------------------------------- | ------- | ------------ | ------ | ------ | --------- | ------------ |
| to all of | the factors | except     | the | use   | of random      | noise.    |     |                                                                 |         |              |        |        |           |              |
|           |             |            |     |       |                |           |     | Fig.5. Sensitivitytoamountoftexturerandomization.Ineachcase,the |         |              |        |        |           |              |
|           |             |            |     |       |                |           |     | detector was                                                    | trained | using 10,000 | random | object | positions | and combina- |
tionsofdistractors,butonlythegivennumberofuniquetexturizationsand
lightingconditionswereused.
|     |     |     |     |     |     |     |     | Table  | II examines         | the | performance | of the | algorithm     | when |
| --- | --- | --- | --- | --- | --- | --- | --- | ------ | ------------------- | --- | ----------- | ------ | ------------- | ---- |
|     |     |     |     |     |     |     |     | random | noise, distractors, |     | and         | camera | randomization | are  |
Fig.4. Sensitivityoftesterroronrealimagestothenumberofsimulated removedintraining.Incorporatingdistractorsduringtraining
training examples used. Each training example corresponds to a single appears to be critical to resilience to distractors in the
labeledexampleofanobjectonthetablewithbetween0and10distractor
|     |     |     |     |     |     |     |     | real world. | Randomizing |     | the | position of | the | camera also |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | ----------- | --- | --- | ----------- | --- | ----------- |
objects.Lightingandalltexturesarerandomizedbetweeniterations.
|        |         |     |             |     |            |             |     | consistently  | provides | a          | slight accuracy | boost,     | but | reasonably   |
| ------ | ------- | --- | ----------- | --- | ---------- | ----------- | --- | ------------- | -------- | ---------- | --------------- | ---------- | --- | ------------ |
|        |         |     |             |     |            |             |     | high accuracy | is       | achievable | without         | it. Adding |     | noise during |
| Figure | 4 shows | the | sensitivity | to  | the number | of training |     |               |          |            |                 |            |     |              |
samplesusedforpre-trainedmodelsandmodelstrainedfrom pretraining appears to have a negligible effect. In practice,
|          |       |               |     |        |        |                 |     | we found | that adding |     | a small | amount of | random | noise to |
| -------- | ----- | ------------- | --- | ------ | ------ | --------------- | --- | -------- | ----------- | --- | ------- | --------- | ------ | -------- |
| scratch. | Using | a pre-trained |     | model, | we are | able to achieve |     |          |             |     |         |           |        |          |
relatively accurate real-world detection performance with as images at training time improves convergence and makes
|     |     |     |     |     |     |     |     | training | less susceptible |     | to local | minima. |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | -------- | ---------------- | --- | -------- | ------- | --- | --- |
2Overfittinginthissettingismoresubtlethaninthestandardsupervised
|     |     |     |     |     |     |     |     | D. Robotics | experiments |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ----------- | ----------- | --- | --- | --- | --- | --- |
learningwheretrainandtestdatacomefromthesamedistribution.Inthe
| standard supervised |     | learning | setting | overfitting | can | be avoided by | using a |     |     |     |     |     |     |     |
| ------------------- | --- | -------- | ------- | ----------- | --- | ------------- | ------- | --- | --- | --- | --- | --- | --- | --- |
Todemonstratethepotentialofthistechniquefortransfer-
| hold-out set | during | training. | We do | apply this | idea | to ensure that | we are |     |     |     |     |     |     |     |
| ------------ | ------ | --------- | ----- | ---------- | ---- | -------------- | ------ | --- | --- | --- | --- | --- | --- | --- |
ringroboticbehaviorslearnedinsimulationtotherealworld,
| not overfitting | on   | the simulated | data.  | However,  | since | our goal is   | to learn  |     |     |     |     |     |     |     |
| --------------- | ---- | ------------- | ------ | --------- | ----- | ------------- | --------- | --- | --- | --- | --- | --- | --- | --- |
| from training   | data | originated    | in the | simulator | and   | generalize to | test data |     |     |     |     |     |     |     |
originatedfromtherealworld,weassumetonothaveanyrealworlddata 3Notethetotalnumberoftexturesishigherthanthenumberoftraining
availableduringtraining.Thereforenovalidationonrealdatacanbedone examples in some of these experiments because every scene has many
| duringtraining. |     |     |     |     |     |     |     | surfaces,eachwithitsowntexture. |     |     |     |     |     |     |
| --------------- | --- | --- | --- | --- | --- | --- | --- | ------------------------------- | --- | --- | --- | --- | --- | --- |

TABLEII
Averagedetectionerrorongeometricshapesbymethod,cm4
Evaluation Realimages
type Objectonly Distractors Occlusions
Fullmethod 1.3±0.6 1.8±1.7 2.4±3.0
Nonoiseadded 1.4±0.7 1.9±2.0 2.4±2.8
Nocamerarandomization 2.0±2.1 2.4±2.3 2.9±3.5
Nodistractorsintraining 1.5±0.6 7.2±4.5 7.4±5.3
we evaluated the use of our object detection networks for
localizing an object in clutter and performing a prescribed
Fig. 6. Two representative executions of grasping objects using vision
grasp. For two of our most consistently accurate detectors,
learned in simulation only. The object detector network estimates the
we evaluated the ability to pick up the detected object in 20 positionsoftheobjectofinterest,andthenamotionplannerplansasimple
increasingly cluttered scenes using the positions estimated sequenceofmotionstograsptheobjectatthatlocation.
by the detector and off-the-shelf motion planning software
[41]. To test the robustness of our method to discrepancies
• Introducing additional forms of texture, lighting, and
in object distributions between training and test time, some
rendering randomization to the simulation and training
of our test images contain distractors placed at orientations
on more data
not seen during training (e.g., a hexagonal prism placed on
• Incorporatingmultiplecameraviewpoints,stereovision,
its side).
or depth information
WedeployedthepipelineonaFetchrobot[49],andfound
• Combining domain randomization with domain adapta-
itwasabletosuccessfullydetectandpickupthetargetobject
tion
in 38 out of 40 trials, including in highly cluttered scenes
Domain randomization is a promising research direction
with significant occlusion of the target object. Note that the
toward bridging the realitygap for robotic behaviors learned
trained detectors have no prior information about the color
in simulation. Deep reinforcement learning may allow more
of the target object, only its shape and size, and are able
complex policies to be learned in simulation through large-
to detect objects placed closely to other objects of the same
scale exploration and optimization, and domain randomiza-
color.
tion could be an important tool for making such policies
To test the performance of our object detectors on real-
useful on real robots.
worldobjectswithnon-uniformtextures,wetrainedanobject
detectortolocalizeacanofSpamfromtheYCBDataset[3].
REFERENCES
Attrainingtime,thecanwaspresentonthetablealongwith
geometric object distractors. At test time, instead of using [1] PieterAbbeel,MorganQuigley,andAndrewYNg. Usinginaccurate
geometricobjectdistractors,weplacedotherfooditemsfrom models in reinforcement learning. In Proceedings of the 23rd inter-
nationalconferenceonMachinelearning,pages1–8.ACM,2006.
the YCB set on the table. The detector was able to ignore
[2] Rika Antonova, Silvia Cruciani, Christian Smith, and Danica
the previously unseen distractors and pick up the target in 9 Kragic. Reinforcement learning for pivoting task. arXiv preprint
of 10 trials. arXiv:1703.00472,2017.
[3] BerkCalli,ArjunSingh,AaronWalsman,SiddharthaSrinivasa,Pieter
Figure 6 shows examples of the robot grasping trials. For
Abbeel,andAaronMDollar. Theycbobjectandmodelset:Towards
videos,pleasevisitthewebpageassociatedwiththispaper.5 commonbenchmarksformanipulationresearch.InAdvancedRobotics
(ICAR), 2015 International Conference on, pages 510–517. IEEE,
2015.
V. CONCLUSION
[4] Alvaro Collet, Dmitry Berenson, Siddhartha S Srinivasa, and Dave
Ferguson. Objectrecognitionandfullposeregistrationfromasingle
We demonstrated that an object detector trained only in image for robotic manipulation. In Robotics and Automation, 2009.
simulation can achieve high enough accuracy in the real ICRA’09. IEEE International Conference on, pages 48–55. IEEE,
2009.
worldtoperformgraspinginclutter.Futureworkwillexplore
[5] Alvaro Collet, Manuel Martinez, and Siddhartha S Srinivasa. The
how to make this technique reliable and effective enough mopedframework:Objectrecognitionandposeestimationformanip-
to perform tasks that require contact-rich manipulation or ulation.TheInternationalJournalofRoboticsResearch,30(10):1284–
1306,2011.
higher precision.
[6] AlvaroColletandSiddharthaSSrinivasa. Efficientmulti-viewobject
Futuredirectionsthatcouldimprovetheaccuracyofobject recognition and full pose estimation. In Robotics and Automation
detectors trained using domain randomization include: (ICRA), 2010 IEEE International Conference on, pages 2050–2055.
IEEE,2010.
• Using higher resolution camera frames [7] MarkCutlerandJonathanPHow.Efficientreinforcementlearningfor
• Optimizing model architecture choice robotsusinginformativesimulatedpriors.InRoboticsandAutomation
(ICRA), 2015 IEEE International Conference on, pages 2605–2612.
IEEE,2015.
4Eachofthemodelscomparedwastrainedwith20,000trainingexam- [8] Mark Cutler, Thomas J Walsh, and Jonathan P How. Reinforcement
ples learning with multi-fidelity simulators. In Robotics and Automation
5https://sites.google.com/view/ (ICRA), 2014 IEEE International Conference on, pages 3888–3895.
domainrandomization/ IEEE,2014.

[9] Lixin Duan, Dong Xu, and Ivor Tsang. Learning with aug- eration from cad models for 2.5 d recognition. arXiv preprint
mentedfeaturesforheterogeneousdomainadaptation. arXivpreprint arXiv:1702.08558,2017.
arXiv:1206.4660,2012. [33] AravindRajeswaran,SarvjeetGhotra,SergeyLevine,andBalaraman
[10] Staffan Ekvall, Danica Kragic, and Frank Hoffmann. Object recog- Ravindran. Epopt: Learning robust neural network policies using
nition and pose estimation using color cooccurrence histograms and modelensembles. arXivpreprintarXiv:1610.01283,2016.
geometric modeling. Image and Vision Computing, 23(11):943–955, [34] StephanRRichter,VibhavVineet,StefanRoth,andVladlenKoltun.
2005. Playing for data: Ground truth from computer games. In European
[11] AliGhadirzadeh,AtsutoMaki,DanicaKragic,andMa˚rtenBjo¨rkman. ConferenceonComputerVision,pages102–118.Springer,2016.
Deep predictive policy training using reinforcement learning. arXiv [35] Andrei A Rusu, Neil C Rabinowitz, Guillaume Desjardins, Hubert
preprintarXiv:1703.00727,2017.
|     |     |     |     |     |     |     |     | Soyer, | James | Kirkpatrick, |     | Koray Kavukcuoglu, |     | Razvan | Pascanu, |
| --- | --- | --- | --- | --- | --- | --- | --- | ------ | ----- | ------------ | --- | ------------------ | --- | ------ | -------- |
[12] Iryna Gordon and David G Lowe. What and where: 3d object and Raia Hadsell. Progressive neural networks. arXiv preprint
recognition with accurate pose. In Toward category-level object arXiv:1606.04671,2016.
recognition,pages67–82.Springer,2006. [36] Andrei A Rusu, Matej Vecerik, Thomas Rotho¨rl, Nicolas Heess,
[13] Abhishek Gupta, Coline Devin, YuXuan Liu, Pieter Abbeel, and Razvan Pascanu, and Raia Hadsell. Sim-to-real robot learning from
| Sergey                     | Levine. | Learning | invariant               | feature | spaces | to transfer | skills |                                       |     |     |     |                                     |     |     |     |
| -------------------------- | ------- | -------- | ----------------------- | ------- | ------ | ----------- | ------ | ------------------------------------- | --- | --- | --- | ----------------------------------- | --- | --- | --- |
|                            |         |          |                         |         |        |             |        | pixelswithprogressivenets.            |     |     |     | arXivpreprintarXiv:1610.04286,2016. |     |     |     |
| withreinforcementlearning. |         |          | ICLR2017,toappear,2017. |         |        |             |        |                                       |     |     |     |                                     |     |     |     |
|                            |         |          |                         |         |        |             |        | [37] FereshtehSadeghiandSergeyLevine. |     |     |     | (cad)2RL:Realsingle-image           |     |     |     |
[14] Judy Hoffman, Sergio Guadarrama, Eric Tzeng, Ronghang Hu, Jeff arXiv preprint arXiv:1611.04201,
|                                                             |     |     |     |     |     |     |     | flight | without | a single | real | image. |     |     |     |
| ----------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | ------ | ------- | -------- | ---- | ------ | --- | --- | --- |
| Donahue,RossGirshick,TrevorDarrell,andKateSaenko.Lsda:Large |     |     |     |     |     |     |     | 2016.  |         |          |      |        |     |     |     |
scaledetectionthroughadaptation. InNeuralInformationProcessing [38] JohnSchulman,SergeyLevine,PieterAbbeel,MichaelIJordan,and
Symposium(NIPS),2014.
|           |          |              |      |          |        |          |          | Philipp | Moritz. | Trust | region | policy optimization. |     | In ICML, | pages |
| --------- | -------- | ------------ | ---- | -------- | ------ | -------- | -------- | ------- | ------- | ----- | ------ | -------------------- | --- | -------- | ----- |
| [15] Judy | Hoffman, | Erik Rodner, | Jeff | Donahue, | Trevor | Darrell, | and Kate |         |         |       |        |                      |     |          |       |
1889–1897,2015.
| Saenko. | Efficientlearningofdomain-invariantimagerepresentations. |     |     |     |     |     |     |            |          |     |            |            |      |      |          |
| ------- | -------------------------------------------------------- | --- | --- | --- | --- | --- | --- | ---------- | -------- | --- | ---------- | ---------- | ---- | ---- | -------- |
|         |                                                          |     |     |     |     |     |     | [39] Karen | Simonyan |     | and Andrew | Zisserman. | Very | deep | convolu- |
arXivpreprintarXiv:1301.3224,2013.
|     |     |     |     |     |     |     |     | tional | networks | for | large-scale | image recognition. |     | arXiv | preprint |
| --- | --- | --- | --- | --- | --- | --- | --- | ------ | -------- | --- | ----------- | ------------------ | --- | ----- | -------- |
[16] StephenJamesandEdwardJohns.3dsimulationforrobotarmcontrol arXiv:1409.1556,2014.
withdeepq-learning. arXivpreprintarXiv:1609.03759,2016. [40] HaoSu,CharlesRQi,YangyanLi,andLeonidasJGuibas.Renderfor
| [17] Diederik | Kingma | and Jimmy | Ba. | Adam: | A method | for | stochastic |     |     |     |     |     |     |     |     |
| ------------- | ------ | --------- | --- | ----- | -------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
cnn:Viewpointestimationinimagesusingcnnstrainedwithrendered
| optimization. |     | arXivpreprintarXiv:1412.6980,2014. |     |     |     |     |     |     |     |     |     |     |     |     |     |
| ------------- | --- | ---------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
3dmodelviews.InProceedingsoftheIEEEInternationalConference
| [18] J Zico | Kolter | and Andrew | Y   | Ng. Learning | omnidirectional |     | path |     |     |     |     |     |     |     |     |
| ----------- | ------ | ---------- | --- | ------------ | --------------- | --- | ---- | --- | --- | --- | --- | --- | --- | --- | --- |
onComputerVision,pages2686–2694,2015.
| following | using | dimensionality |     | reduction. | In Robotics: |     | Science and |                                 |     |     |     |         |                        |     |     |
| --------- | ----- | -------------- | --- | ---------- | ------------ | --- | ----------- | ------------------------------- | --- | --- | --- | ------- | ---------------------- | --- | --- |
|           |       |                |     |            |              |     |             | [41] IoanASucanandSachinChitta. |     |     |     | Moveit! | http://moveit.ros.org. |     |     |
Systems,2007.
[19] Brian Kulis, Kate Saenko, and Trevor Darrell. What you saw is not [42] BaochenSunandKateSaenko.Fromvirtualtoreality:Fastadaptation
ofvirtualobjectdetectorstorealdomains.InBMVC,volume1,page3,
whatyouget:Domainadaptationusingasymmetrickerneltransforms.
2014.
| In Computer |     | Vision and | Pattern | Recognition | (CVPR), |     | 2011 IEEE |            |          |      |         |          |                    |     |        |
| ----------- | --- | ---------- | ------- | ----------- | ------- | --- | --------- | ---------- | -------- | ---- | ------- | -------- | ------------------ | --- | ------ |
|             |     |            |         |             |         |     |           | [43] Yaniv | Taigman, | Adam | Polyak, | and Lior | Wolf. Unsupervised |     | cross- |
Conferenceon,pages1785–1792.IEEE,2011.
|           |        |                |     |          |         |      |           | domainimagegeneration. |     |     |     | arXivpreprintarXiv:1611.02200,2016. |     |     |     |
| --------- | ------ | -------------- | --- | -------- | ------- | ---- | --------- | ---------------------- | --- | --- | --- | ----------------------------------- | --- | --- | --- |
| [20] Yann | LeCun, | Yoshua Bengio, | and | Geoffrey | Hinton. | Deep | learning. |                        |     |     |     |                                     |     |     |     |
Nature,521(7553):436–444,2015. [44] JieTang,StephenMiller,ArjunSingh,andPieterAbbeel. Atextured
[21] SergeyLevine,ChelseaFinn,TrevorDarrell,andPieterAbbeel. End- objectrecognitionpipelineforcoloranddepthimagedata.InRobotics
|        |          |         |            |           |     |         |            | and | Automation | (ICRA), | 2012 | IEEE International |     | Conference | on, |
| ------ | -------- | ------- | ---------- | --------- | --- | ------- | ---------- | --- | ---------- | ------- | ---- | ------------------ | --- | ---------- | --- |
| to-end | training | of deep | visuomotor | policies. |     | Journal | of Machine |     |            |         |      |                    |     |            |     |
pages3467–3474.IEEE,2012.
LearningResearch,17(39):1–40,2016.
|     |     |     |     |     |     |     |     | [45] Emanuel | Todorov, |     | Tom Erez, | and Yuval | Tassa. Mujoco: | A   | physics |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------ | -------- | --- | --------- | --------- | -------------- | --- | ------- |
[22] YanghaoLi,NaiyanWang,JianpingShi,JiayingLiu,andXiaodiHou.
|                                                           |     |     |     |     |     |     |       | engine | for | model-based | control. | In Intelligent | Robots | and | Systems |
| --------------------------------------------------------- | --- | --- | --- | --- | --- | --- | ----- | ------ | --- | ----------- | -------- | -------------- | ------ | --- | ------- |
| Revisitingbatchnormalizationforpracticaldomainadaptation. |     |     |     |     |     |     | arXiv |        |     |             |          |                |        |     |         |
preprintarXiv:1603.04779,2016. (IROS), 2012 IEEE/RSJ International Conference on, pages 5026–
5033.IEEE,2012.
| [23] Mingsheng |              | Long, Yue | Cao, Jianmin | Wang,     | and        | Michael   | I Jordan. |                                                                  |         |      |         |            |          |          |          |
| -------------- | ------------ | --------- | ------------ | --------- | ---------- | --------- | --------- | ---------------------------------------------------------------- | ------- | ---- | ------- | ---------- | -------- | -------- | -------- |
|                |              |           |              |           |            |           |           | [46] EricTzeng,ColineDevin,JudyHoffman,ChelseaFinn,PieterAbbeel, |         |      |         |            |          |          |          |
| Learning       | transferable | features  |              | with deep | adaptation | networks. | In        |                                                                  |         |      |         |            |          |          |          |
|                |              |           |              |           |            |           |           | Sergey                                                           | Levine, | Kate | Saenko, | and Trevor | Darrell. | Adapting | deep vi- |
ICML,pages97–105,2015.
suomotorrepresentationswithweakpairwiseconstraints.InWorkshop
| [24] David | G Lowe. | Three-dimensional |     | object | recognition |     | from single |     |     |     |     |     |     |     |     |
| ---------- | ------- | ----------------- | --- | ------ | ----------- | --- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- |
two-dimensionalimages. Artificialintelligence,31(3):355–395,1987. ontheAlgorithmicFoundationsofRobotics(WAFR),2016.
[25] Yishay Mansour, Mehryar Mohri, and Afshin Rostamizadeh. Do- [47] Eric Tzeng, Judy Hoffman, Ning Zhang, Kate Saenko, and Trevor
|      |             |          |        |     |             |       |          | Darrell. | Deepdomainconfusion:Maximizingfordomaininvariance. |     |     |     |     |     |     |
| ---- | ----------- | -------- | ------ | --- | ----------- | ----- | -------- | -------- | -------------------------------------------------- | --- | --- | --- | --- | --- | --- |
| main | adaptation: | Learning | bounds | and | algorithms. | arXiv | preprint |          |                                                    |     |     |     |     |     |     |
arXivpreprintarXiv:1412.3474,2014.
arXiv:0902.3430,2009.
|                                                          |     |     |     |     |     |     |        | [48] JurVanDenBerg,StephenMiller,DanielDuckworth,HumphreyHu, |     |     |     |     |     |     |     |
| -------------------------------------------------------- | --- | --- | --- | --- | --- | --- | ------ | ------------------------------------------------------------ | --- | --- | --- | --- | --- | --- | --- |
| [26] ChaitanyaMitash,KostasEBekris,andAbdeslamBoularias. |     |     |     |     |     |     | Aself- |                                                              |     |     |     |     |     |     |     |
supervisedlearningsystemforobjectdetectionusingphysicssimula- AndrewWan,Xiao-YuFu,KenGoldberg,andPieterAbbeel. Super-
tionandmulti-viewposeestimation.arXivpreprintarXiv:1703.03347, humanperformanceofsurgicaltasksbyrobotsusingiterativelearning
2017. from human-guided demonstrations. In Robotics and Automation
|     |     |     |     |     |     |     |     | (ICRA), | 2010 | IEEE | International | Conference | on, | pages 2074–2081. |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------- | ---- | ---- | ------------- | ---------- | --- | ---------------- | --- |
[27] VolodymyrMnih,KorayKavukcuoglu,DavidSilver,AndreiARusu,
IEEE,2010.
| Joel    | Veness, | Marc G Bellemare, |            | Alex | Graves, | Martin      | Riedmiller, |                                                               |     |     |     |     |     |     |     |
| ------- | ------- | ----------------- | ---------- | ---- | ------- | ----------- | ----------- | ------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- |
|         |         |                   |            |      |         |             |             | [49] MeloneeWise,MichaelFerguson,DerekKing,EricDiehr,andDavid |     |     |     |     |     |     |     |
| Andreas | K       | Fidjeland, Georg  | Ostrovski, |      | et al.  | Human-level | control     |                                                               |     |     |     |     |     |     |     |
through deep reinforcement learning. Nature, 518(7540):529–533, Dymesich. Fetch and freight: Standard platforms for service robot
2015. applications. In Workshop on Autonomous Mobile Service Robots,
2016.
| [28] Igor | Mordatch, | Kendall | Lowrey, | and Emanuel | Todorov.       |     | Ensemble-   |              |        |     |      |                      |     |                 |     |
| --------- | --------- | ------- | ------- | ----------- | -------------- | --- | ----------- | ------------ | ------ | --- | ---- | -------------------- | --- | --------------- | --- |
|           |           |         |         |             |                |     |             | [50] Patrick | Wunsch | and | Gerd | Hirzinger. Real-time |     | visual tracking | of  |
| cio:      | Full-body | dynamic | motion  | planning    | that transfers |     | to physical |              |        |     |      |                      |     |                 |     |
humanoids.InIntelligentRobotsandSystems(IROS),2015IEEE/RSJ 3d objects with dynamic handling of occlusion. In Robotics and
InternationalConferenceon,pages5307–5314.IEEE,2015. Automation,1997.Proceedings.,1997IEEEInternationalConference
[29] YairMovshovitz-Attias,TakeoKanade,andYaserSheikh.Howuseful on,volume4,pages2868–2873.IEEE,1997.
isphoto-realisticrenderingforvisuallearning? InComputerVision– [51] Jun Yang, Rong Yan, and Alexander G Hauptmann. Cross-domain
|     |     |     |     |     |     |     |     |     |     |     |     |     |     | Proceedings | of the |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ----------- | ------ |
ECCV2016Workshops,pages202–217.Springer,2016. video concept detection using adaptive svms. In
|     |     |     |     |     |     |     |     | 15th | ACM | international | conference | on Multimedia, |     | pages | 188–197. |
| --- | --- | --- | --- | --- | --- | --- | --- | ---- | --- | ------------- | ---------- | -------------- | --- | ----- | -------- |
[30] RamakantNevatiaandThomasOBinford.Descriptionandrecognition
| ofcurvedobjects. |     | ArtificialIntelligence,8(1):77–98,1977. |     |     |     |     |     | ACM,2007. |     |     |     |     |     |     |     |
| ---------------- | --- | --------------------------------------- | --- | --- | --- | --- | --- | --------- | --- | --- | --- | --- | --- | --- | --- |
[31] XingchaoPeng,BaochenSun,KarimAli,andKateSaenko. Learning [52] Jason Yosinski, Jeff Clune, Yoshua Bengio, and Hod Lipson. How
deep object detectors from 3d models. In Proceedings of the IEEE transferable are features in deep neural networks? In Advances in
International Conference on Computer Vision, pages 1278–1286, neuralinformationprocessingsystems,pages3320–3328,2014.
2015. [53] WenhaoYu,CKarenLiu,andGregTurk.Preparingfortheunknown:
[32] BenjaminPlanche,ZiyanWu,KaiMa,ShanhuiSun,StefanKluckner, Learning a universal policy with online system identification. arXiv
Terrence Chen, Andreas Hutter, Sergey Zakharov, Harald Kosch, preprintarXiv:1702.02453,2017.
and Jan Ernst. Depthsynth: Real-time realistic synthetic data gen- [54] Stefan Zickler and Manuela M Veloso. Detection and localization

| of multiple | objects. | In Humanoid | Robots, | 2006 6th IEEE-RAS |
| ----------- | -------- | ----------- | ------- | ----------------- |
InternationalConferenceon,pages20–25.IEEE,2006.
APPENDIX
| A. Randomly  | generated  | samples     | from our      | method      |
| ------------ | ---------- | ----------- | ------------- | ----------- |
| Figure       | 7 displays | a selection | of the images | used during |
| training for | the object | detectors   | detailed in   | the paper.  |
Fig.7. Aselectionofrandomlytexturedscenesusedinthetrainingphase
ofourmethod
