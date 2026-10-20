S-Space: Exploring Spatial Workspace in
Multimodal Language Models
MirroS Technical Report
Abstract
Multimodal language models (MLLMs) exhibit promising spatial reasoning capabilities, yet the
internal mechanisms supporting them remain poorly understood. We uncover S-Space, a linear
representationsubspaceinwhichobject-tokenrepresentationsencodecontinuouscoordinatesalong
horizontal, vertical, and distance axes. Although we identify these axes by differentiating spatial-
answer scores with respect to object-token activations, S-Space is intrinsic rather than induced
by specific data or prompts, remaining readable under non-spatial questions. We show that S-
Space functions as an internal spatial workspace of MLLMs. Perception encodes object locations
into it, forming spatial representations that can be directly read out to support accurate spatial
judgments. Internal reasoning transforms it for changing viewpoints. Verbal responses selectively
access it, evidenced by causal interventions that alter spatial judgments while largely preserving
non-spatial responses. Case studies further show that S-Space assigns locations to unseen entities
and the observer, and connects physical directions with abstract linguistic meanings, suggesting
both the capabilities and limitations of large-scale language training. Finally, we use S-Space as a
diagnostic tool for spatial reasoning failures. Direction-word readouts reveal systematic coupling
betweencardinalandimage-relativereferenceframes. Moreimportantly,aperception-computation
decompositionexposesakeybottleneck: MLLMscanformcapablespatialrepresentations,yetfall
short in the spatial transformations required to reason reliably across viewpoint changes.
Date: October 8, 2026
ProjectPage: https://mirros.ai/blog/s-space
Code: https://github.com/mirros-lab/s-space
1 Introduction
Multimodal large language models (MLLMs) [1–4] have rapidly advanced in spatial intelligence [5, 6],
demonstrating utility in reconstruction [7, 8], planning [9], navigation [10], and manipulation [11, 12]
in the physical world. Despite this growing range of applications, robust spatial reasoning remains a
fundamental challenge for MLLMs, with substantial performance gaps persisting on tasks that humans
solve effortlessly [13–15]. Interpreting these limitations requires looking beyond end-to-end performance:
external behaviors such as answers and actions alone reveal little about where failures arise, while the
internal representations and mechanisms remain poorly understood and underdiagnosed.
How is spatial information represented inside an MLLM, and how does it shape the model’s responses?
Research on human visual cognition offers a useful perspective: there is a mental workspace in which
internal representations are maintained and manipulated in the human brain [16, 17]. While existing
workshaveexploredspatialencodingsandrepresentationalbiasesinMLLMs[18,19],asimpleandunified
explanationofhowspatialinformationisencoded,transformed,andultimatelyusedtoproduceresponses
remains to be established. We ask whether MLLMs similarly possess an internal spatial workspace akin
to that of the human brain. Uncovering such a mechanism could help explain spatial reasoning failures
and point toward targeted improvements.
In this work, we uncover S-Space, a three-dimensional linear subspace of intermediate representations
that functions as an internal spatial workspace in MLLMs. Using a simple gradient-based procedure, we
1
6202
tcO
9
]VC.sc[
1v72531.0162:viXra

|     |     | S-Space: | Exploring | Spatial | Workspace |     | in Multimodal | Language |     | Models |     |
| --- | --- | -------- | --------- | ------- | --------- | --- | ------------- | -------- | --- | ------ | --- |
identify fixed spatial orientations that generalize across datasets, tasks, and prompts, defining axes for
left-right, above-below, and close-far directions. As illustrated in Figure 1, object locations can then be
directlyreadoutascontinuouscoordinatesthroughlinearprojectionoftheirrepresentations[20]. Exper-
iments demonstrate that S-Space accurately encodes object locations and provides spatial information
that causally shapes the model’s judgments, while remaining readable across prompts even when the
| model | is answering | questions | unrelated |     | to space. |     |       |     |     |     |           |
| ----- | ------------ | --------- | --------- | --- | --------- | --- | ----- | --- | --- | --- | --------- |
|       |              |           | +V        |     |           |     |       | +V  |     |     | +V        |
|       |              |           | 2         |     |           |     |       |     |     | 4   | 4         |
|       |              |           | -D        |     | 4         |     | 4     | -5D |     |     | -D        |
|       |              |           |           |     | 5         |     |       | 6   | 2   | 3   | 2 3       |
|       |              | -H        | 1 +H      |     |           |     | -H 1  | +H  |     | 5   | -H 1 5 +H |
| 2     |              |           | 3         |     |           | 6   |       | 2   | 1   |     | 6         |
| 1     |              |           | 4         |     | 1         |     | +D7 3 |     |     | 6   |           |
|       |              | 4         | +D        |     | 3         | 2   |       |     |     | 7   | +D        |
|       | 3            |           | -V        |     | 7         |     |       | -V  |     |     | 7 -V      |
A large wooden ship1 with three masts2 A modern living room features a white sectional sofa1, A police car1 with flashing lights2 is parked on a
sails on a lake3 near a red torii gate4 and a a green armchair2, a wooden coffee table3, a large grassy hillside3 near a lighthouse4 and ocean,
snow-capped mountain in the background tree4, a painting5, and a floor lamp6 on a dark rug7. with a man5 on a bicycle6 and a dog7 nearby
|     | (a) Molmo2-ER. |     |     |     | (b) Qwen3.5-4B. |     |     |     |     | (c) Qwen3.6-27B. |     |
| --- | -------------- | --- | --- | --- | --------------- | --- | --- | --- | --- | ---------------- | --- |
Figure1 Object coordinates read out from S-Space across MLLMs. For each input image and caption,
the intermediate representations of object-name tokens are linearly projected onto the three axes of S-Space to
obtain continuous coordinates. Colors and numbers link object names, image regions, and their corresponding
coordinates.
With S-Space, we examine the spatial content represented within MLLMs. Through case studies, we
show that the workspace brings visual evidence and linguistic meanings into a shared spatial geometry,
extending its content beyond directly visible objects. Our final analysis comes as a diagnosis of spatial
reasoning failures, building on S-Space’s ability to separate spatial perception from subsequent compu-
tation. We study viewpoint-changing problems [15] by constructing an oracle that transforms S-Space
coordinates, revealing that the encoded spatial information supports accurate answers even when the
model fails to generate them. Direction-word readouts further reveal systematic coupling between car-
dinal and image-relative directions, offering insight into reference-frame confusion [21]. These diagnoses
expose a key bottleneck in spatial reasoning: MLLMs can form accurate perceptual representations yet
| fail | to draw       | reliable | spatial conclusions |     | from them.  |     |     |     |     |     |     |
| ---- | ------------- | -------- | ------------------- | --- | ----------- | --- | --- | --- | --- | --- | --- |
| Our  | contributions | can      | be summarized       |     | as follows: |     |     |     |     |     |     |
• To the best of our knowledge, we are the first to systematically identify and characterize an internal
spatialworkspaceinMLLMs,revealinghowspatialinformationcanbeencoded,updated,andcausally
| used | within | the model’s | internal | representations. |     |     |     |     |     |     |     |
| ---- | ------ | ----------- | -------- | ---------------- | --- | --- | --- | --- | --- | --- | --- |
• We propose a simple gradient-based method for identifying S-Space, enabling accurate and generaliz-
| able | continuous | coordinate | readouts |     | along fixed | spatial | directions. |     |     |     |     |
| ---- | ---------- | ---------- | -------- | --- | ----------- | ------- | ----------- | --- | --- | --- | --- |
• We establish S-Space as a diagnostic tool for spatial reasoning failures, separating spatial perception
fromsubsequentcomputationandexposinglimitationsinhowmodelsuseavailablespatialinformation.
2 Method
Takeaway: S-Space is a three-dimensional linear subspace of intermediate representations in
MLLMs, in which object locations are linearly encoded and can be directly read out.
In this section, we describe how we formulate, identify, and read out S-Space.
2.1 S-SpaceFormulation
Largelanguagemodelsarewidelyhypothesizedtorepresentconceptslinearlyintheirinternalrepresenta-
tions [22, 23]. Similarly, we hypothesize that anobject’sspatial coordinates, defined ina viewer-centered
2

|     |     | S-Space: | Exploring |     | Spatial | Workspace | in Multimodal | Language Models |     |
| --- | --- | -------- | --------- | --- | ------- | --------- | ------------- | --------------- | --- |
Physical 3D Space Model Activation Space Spatial Readout from S-Space
Read coordinates along the
spatial directions
|     |     |     |           | i n p u t   | the | red apple | is on the |         |     |
| --- | --- | --- | --------- | ----------- | --- | --------- | --------- | ------- | --- |
|     |     |     |           | t o k e n s |     |           |           |         |     |
|     |     |     | Linear    |             |     |           |           | Linear  |     |
|     |     |     | Represent |             |     |           |           | Readout |     |
Spatial Linear subspace
Physical coordinates
Recovered 3D coordinates
|     |     |     |     | activations |     | other dimensions | 3D spatial subspace |     |     |
| --- | --- | --- | --- | ----------- | --- | ---------------- | ------------------- | --- | --- |
Figure2 Linear spatial representation in S-Space. An object’s spatial coordinates (left) are linearly
embeddedinitshigh-dimensionaltokenrepresentation. Horizontal,vertical,anddistancedirectionsspanathree-
dimensional S-Space (middle). Projections onto them recover viewer-centered coordinates (right).
frame1,
(or egocentric) reference are linearly encoded in the hidden representation of its object-name
token [18].
Concretely, for a given model and layer ℓ, we define S-Space as a three-dimensional linear subspace of
hidden representations h ∈ ℝdmodel. S-Space is specific to the model and layer, but shared across all
ℓ,t
token positions t within that layer. We search for S-Space in the model’s middle layers, as early layers
remainrelativelyanchoredtotheinputrepresentations,andlaterlayersbecomeincreasinglyalignedwith
next-token prediction for the production of a verbal response (see layer-wise analysis in Appendix C.1).
| We  | fix a layer | ℓ and omit | its index | below | for | notational | simplicity. |     |     |
| --- | ----------- | ---------- | --------- | ----- | --- | ---------- | ----------- | --- | --- |
2.2 IdentifyingS-Space
WeidentifythreeS-Spacedirectionscorrespondingtothehorizontal,vertical,anddistanceaxes2 bydiffer-
entiating the models’ responses to relative spatial questions with respect to object-token activations [24].
Specifically, each relative spatial question example p consists of an image and a prompt comparing a
query object with a reference along one axis g ∈ {x,y,z}, e.g., “Is the apple to the left or right of the
cup?" Let q and r denote the respective token positions of the query and reference object names3, we
define an answer contrast for each axis as the corresponding logit difference:
s =logit(right)−logit(left), s =logit(above)−logit(below), s =logit(close)−logit(far). (1)
|     | p,x |     |     |     | p,y |     |     | p,z |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
The gradient ∇ ht s p,g therefore specifies the direction along which perturbing the object representation
would most increase the corresponding answer contrast. We then form a role-antisymmetric gradient
difference and average it across prompt templates, original/swapped object orders, and examples:
|          |     |              |            | ∇         | s −∇ | s      |                |          |     |
| -------- | --- | ------------ | ---------- | --------- | ---- | ------ | -------------- | -------- | --- |
|          |     |              |            | hq        | p,g  | hr p,g | =unit(𝔼        |          |     |
|          |     |              | a          | =         |      |        | , v            | [a ]).   | (2) |
|          |     |              | p,g        |           | 2    |        | g              | p p,g    |     |
| Appendix |     | C.1 provides | the prompt | templates |      | and    | implementation | details. |     |
The resulting unit vectors establish the three S-Space directions: 𝒮=span{v ,v ,v }.
x y z
Theoretical sketch. We offer two intuition for Equation (2). (1) Relative spatial judgments treat the
queryandreferenceoppositely: achangethatmakesthequerymoretotherightshouldfavorright,while
1AswewillseeinSection5.2andC.7, thisreferenceframeisnotfixed: itcanbesteeredbycontextandprogressively
reorientedoverthecourseofchain-of-thoughtreasoning.
2Forthehorizontalandverticalaxes,weuseimage-planecoordinatesratherthanworldcoordinates,withoutexplicitly
disentanglingdepth-dependentperspectiveeffects. Theseprojectedcoordinatessufficeformostspatialreasoningquestions
consideredinthiswork.
3Whenanobjectnameconsistsofmultipletokens,weuseitslasttoken.
3

|     |     | S-Space: | Exploring | Spatial | Workspace | in  | Multimodal | Language Models |     |
| --- | --- | -------- | --------- | ------- | --------- | --- | ---------- | --------------- | --- |
the same change to the reference should favor left. Taking the role-antisymmetric difference between
gradients therefore reinforces such oppositely acting spatial signals. (2) Other effects arising from object
identity, prompt phrasing, token roles, or scene context may not cancel for an individual example, so we
further average across prompt templates, original/swapped object orders, and examples. The resulting
direction captures the sensitivity that is most consistently associated with the queried spatial relation.
| See Appendix |     | B for detailed | theoretical | insights. |     |     |     |     |     |
| ------------ | --- | -------------- | ----------- | --------- | --- | --- | --- | --- | --- |
2.3 ReadingoutS-Space
Once we identify the three axes, reading out S-Space requires only a forward pass. Importantly, this
readout is not restricted to the spatial QA prompts used for identification: the same fixed directions
applytoobject-tokenrepresentationselicitedbyotherpromptsandtasks(seeSection3.3). Westackthe
directions into V and project each object token t to get its coordinate in S-Space:
|     |     |     |       |             | ]∈ℝdmodel×3 |     | =V⊤h | ∈ℝ3 |     |
| --- | --- | --- | ----- | ----------- | ----------- | --- | ---- | --- | --- |
|     |     |     | V =[v | x ,v y ,v z |             | ,   | c t  | t . | (3) |
Relative spatial judgment. Readingoutthesecoordinatessupportsspatialjudgmentswithoutrequir-
ingthemodeltoverbalizearesponse. Forarelativespatialquestion,wecomparethequeryandreference
| coordinates | along | the queried | axis: |         |     |        |     |     |     |
| ----------- | ----- | ----------- | ----- | ------- | --- | ------ | --- | --- | --- |
|             |       |             |       | m =v⊤(h |     | −h )=c | −c  | .   | (4) |
|             |       |             |       | g       | g q | r      | q,g | r,g |     |
The sign of margin m g directly selects the predicted endpoint: a positive value indicates right, above, or
| close, whereas |     | a negative | value indicates | left, | below, | or far. |     |     |     |
| -------------- | --- | ---------- | --------------- | ----- | ------ | ------- | --- | --- | --- |
3 S-SpaceasInternalSpatialWorkspace
Takeaway: Across diverse contexts, S-Space functions as a persistent internal spatial workspace
in MLLMs, where spatial information is accurately encoded into it (§3.1), transformed through
| internal | reasoning | (§5.2), | and | causally | used for | verbal | responses | (§3.2). |     |
| -------- | --------- | ------- | --- | -------- | -------- | ------ | --------- | ------- | --- |
In this section, we characterize S-Space as an internal spatial workspace in MLLMs by examining its ac-
curacy, causal role, and persistence across prompting contexts. We identify S-Space for Molmo2-ER [25],
Qwen3.5-4B [3], and Qwen3.6-27B [26] using constructed relative spatial questions from COCO [27]. To
assess the generalizability, we evaluate their readouts on CV-Bench [28], EmbSpatial [29], and Spatial-
| Tunnel | [19]. All | experimental | details | are | provided | in Appendix |     | C.  |     |
| ------ | --------- | ------------ | ------- | --- | -------- | ----------- | --- | --- | --- |
3.1 Accuracy
We first examine how accurately S-Space represents object locations and their spatial relations.
S-Space encodes object coordinates. We project each object-token representation onto S-Space
and compare the resulting coordinates with ground-truth object positions. As illustrated in Figure 3a
and 3b, both individual object coordinates and pairwise coordinate differences strongly correlate with
their ground-truth counterparts along the horizontal, vertical, and distance axes.
S-Space supports spatial QA. We next answer spatial-relation questions using only the coordinates
read from S-Space, without relying on the model’s verbal response, following Section 2.3. As shown in
Figure3c,thissimplecoordinate-basedreadoutachievesaccuracycomparabletothemodels’directverbal
answers. Moreover, it generalizes across CV-Bench, EmbSpatial-Bench, and SpatialTunnel, including
| benchmarks | outside | the | distribution | used | to identify | it. |     |     |     |
| ---------- | ------- | --- | ------------ | ---- | ----------- | --- | --- | --- | --- |
Together, these results show that S-Space encodes spatial information with high fidelity.
4

|     |     |     | S-Space: | Exploring | Spatial | Workspace | in Multimodal | Language Models |     |     |
| --- | --- | --- | -------- | --------- | ------- | --------- | ------------- | --------------- | --- | --- |
Horizontal: 0.789 Vertical: 0.774 Distance: 0.521 Horizontal: 0.871 Vertical: 0.872 Distance: 0.688
|     | 20                 |     | 20  |     | 20  |     | 30                    | 30  | 30  |     |
| --- | ------------------ | --- | --- | --- | --- | --- | --------------------- | --- | --- | --- |
|     | noitcejorp ecapS-S |     |     |     |     |     | ecnereffid noitcejorP |     |     |     |
|     | 10                 |     | 10  |     | 10  |     | 15                    | 15  | 15  |     |
|     | 0                  |     | 0   |     | 0   |     | 0                     | 0   | 0   |     |
|     | -10                |     | -10 |     | -10 |     | -15                   | -15 | -15 |     |
|     | -20                |     | -20 |     | -20 |     | -30                   | -30 | -30 |     |
-1 -0.5 0 0.5 1 -1 -0.5 0 0.5 1 -0.6 -0.3 0 0.3 0.6 -2 -1 0 1 2 -2 -1 0 1 2 -1 -0.5 0 0.5 1
|     |     |     | Reference coordinates   |     |                                                         |                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                 | Reference differences     |     |     |
| --- | --- | --- | ----------------------- | --- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | --- | --- |
|     |     |     | (a) Object coordinates. |     |                                                         |                                                                                                                                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                 | (b) Pairwise differences. |     |     |
|     |     |     |                         |     | Direct Answer Direct Answer                             | Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer                                                                                                                               | S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout                                                                                                                                                                                 |                           |     |     |
|     |     |     |                         |     | Direct Answer Direct Answer Direct Answer Direct Answer | Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer Direct Answer | S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout S-Space Readout |                           |     |     |
CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel
CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel
100 100 100 100 ↑ )%( ycarucca llarevO 100 100 10 0 9 4 .4091.92 CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench 9 3 .7 691.84 EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial 97.8396.50 97.8396.50 9 97.8396.50 97.8396.50 7 .8 3 97.8396.50 97.8396.50 9 97.8396.50 97.8396.50 6 .50 97.8396.50 97.8396.50 97.8396.50 97.8396.50 SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel 96.8392.92 96.8392.92 9 6 . 96.8392.92 96.8392.92 8 3 96.8392.92 96.8392.92 9 2 96.8392.92 96.8392.92 . 9 2 96.8392.92 96.8392.92 96.8392.92 96.8392.92
100 100 100 100 100 100 100 100 100 100 100 100 100 100 94.4091.92 94.4 94.4091.92 94.4100091.92 9 100 100 100 100 100 4.4091 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 100 100 1 100 0 00 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 94.4091.92 89.36 89.36 89.36 89.36 89.36 89.36 89.36 89.36 89.36 89.36 89.36 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.769 89.36 89.36 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 93.7691.84 90.4286.92 90.4286.92 90.4286.92 90.4286.92 9 90.4286.92 90.4286.92 0 .4 90.4286.92 90.4286.92 2 90.4286.92 90.4286.92 86.92 90.4286.92 90.4286.92 8 6.42 91.3389.00 91.3389.00 91.3389.00 91.3389.00 9 1. 91.3389.00 91.3389.00 3 3 91.3389.00 91.3389.00 8 9.00 91.3389.00 91.3389.00 91.3389.00 91.3389.00 97.8396.50 97.8396.50 97 97.8396.50 .8 97.8396.50 97.8396.50 97.8396.50 97.8396.50 3 9 97.8396.50 97.8396.50 97.8396.50 97.8396.50 6 97.8396.50 97.8396.50 97.8396.50 .5 0 97.8396.50 97.8396.50 97.8396.50 97.8396.50 97.8396.50 97.8396.50 86.3390.08 86.3390.08 8 6 86.3390.08 86.3390.08 . 33 86.3390.08 86.3390.08 9 86.3390.08 86.3390.08 0 .0 86.3390.08 86.3390.08 8 86.3390.08 86.3390.08 96.8392.92 96.8392.92 9 6 . 8 96.8392.92 96.8392.92 96.8392.92 3 96.8392.92 96.8392.92 96.8392.92 9 2 96.8392.92 96.8392.92 96.8392.92 . 9 2 96.8392.92 96.8392.92 96.8392.92 96.8392.92 96.8392.92 96.8392.92
)%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO 100 )%( ycarucca llarevO )%( ycarucca llarevO 100 100 100 8 94.4091.92 100 0 94.4091.92 100 94.4091.92 91.92 94.4091.92 .9 2 94.4091.92 94.4091.92 89.36 89.36 8973.3.660 89.36 89.36 89.36 89.36 89.36 89.36 89.36 89.36 89.36 89.36 89.36 89.36 93.7691.84 89.36 89.36 89.36 93.7691.84 93.7691.84 1 93.7691.84 .8 4 93.7691.84 93.7691.84 90.4286.92 90.4286.92 90.42 90.4286.92 90.4286.92 90.4286.92 90.4286.92 90.4286.92 90.4286.92 8 6 90.4286.92 90.4286.92 90.4286.92 .9 2 90.4286.92 90.4286.92 90.4286.92 90.4286.92 90.4286.92 90.4286.92 788.560.4 86.42 86.42 86.42 86.42 86.42 86.42 86.42 86.42 86.42 2 86.42 86.42 86.42 86.42 86.42 86.42 86.42 86.42 86.42 91.3389.00 91.3389.00 91.3 91.3389.00 86.42 86.42 91.3389.00 91.3389.00 91.3389.00 91.3389.00 3 8 91.3389.00 91.3389.00 91.3389.00 91.3389.00 9 91.3389.00 91.3389.00 91.3389.00 .0 0 91.3389.00 91.3389.00 91.3389.00 91.3389.00 91.3389.00 91.3389.00 97.8396.50 97.8396.50 97.8396.50 86.3390.08 86.3390.08 86 . 3 86.3390.08 86.3390.08 86.3390.08 3 9 86.3390.08 86.3390.08 86.3390.08 0 86.3390.08 86.3390.08 86.3390.08 .0 8 86.3390.08 86.3390.08 86.3390.08 86.3390.08 86.3390.08 86.3390.08 96.8392.92 96.8392.92 96.8392.92 96.8392.92 96.8392.92 96.8392.92
)%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO 80 80 )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO 80 80 )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO 80 80 )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO 89.36 89.36 89.36 89.36 89.36 89.36 90.4286.92 90.4286.92 90.4286.92 90.4286.92 90.4286.92 90.4286.92 78.50 78.50 78.50 78.50 86.42 78.50 78.50 78.50 78.50 86.42 78.50 78.50 86.42 86.42 86.42 86.42 86.42 78.50 78.50 86.42 86.42 86.42 86.42 86.42 86.42 86.42 86.42 91.3389.00 91.3389.00 91.3389.00 86.3390.08 86.3390.08 86.3390.08 86.3390.08 86.3390.08 86.3390.08
| )%( ycarucca llarevO )%( ycarucca llarevO | 80 80 80 )%( ycarucca llarevO )%( ycarucca llarevO 80 80 80 )%( ycarucca llarevO 80 80 80 80 80 80 80 80 )%( ycarucca llarevO 60 80 80 80 80 80 | 80 80 80 80 80 | 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 73.60 |     |     |     | 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 78.50 |     |     |     |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --- | --- | --- |
|                                           | 80 80 80 80 80                                                                                                                                  | 80             | 73.60 73.60 73.60 73.60 73.60 73.60                                                                                                                                                 |     |     |     |                                                                                                                                                 |     |     |     |
|                                           | 60 60 60 60 60 60 60 60 60 60                                                                                                                   | 60 60          |                                                                                                                                                                                     |     |     |     |                                                                                                                                                 |     |     |     |
|                                           | 60 60 60 60 60 60 60 60 60 60 60 60 40 60 60 60                                                                                                 | 60 60 60       |                                                                                                                                                                                     |     |     |     |                                                                                                                                                 |     |     |     |
|                                           | 60 60 60 60 60                                                                                                                                  | 60             |                                                                                                                                                                                     |     |     |     |                                                                                                                                                 |     |     |     |
|                                           | 40 40 40 40 40 40 40 40 20 40 40                                                                                                                | 40 40          |                                                                                                                                                                                     |     |     |     |                                                                                                                                                 |     |     |     |
|                                           | 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40                                                                                                    | 40 40 40       |                                                                                                                                                                                     |     |     |     |                                                                                                                                                 |     |     |     |
|                                           | 40 40 40 40 0 40                                                                                                                                | 40             |                                                                                                                                                                                     |     |     |     |                                                                                                                                                 |     |     |     |
20 20 20 20 20 20 20 20 20 20 20 20 Molmo2-ER Qwen3.5-4B Qwen3.6-27B Molmo2-ER Qwen3.5-4B Qwen3.6-27B Molmo2-ER Qwen3.5-4B Qwen3.6-27B
|     | 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 | 20 20 20    |     |     |                                    |     |     |     |     |     |
| --- | -------------------------------------------- | ----------- | --- | --- | ---------------------------------- | --- | --- | --- | --- | --- |
|     | 20 20 20 20 20                               | 20          |     |     |                                    |     |     |     |     |     |
|     | 0 0 0 0 0 0 0 0                              | 0 0 0 0     |     |     | (c) Spatial QA benchmark accuracy. |     |     |     |     |     |
|     | 0 0 0 0 0 0 0 0 0 0 0 0                      | 0 0 0 0 0 0 |     |     |                                    |     |     |     |     |     |
0 Figure3 0 0 0 Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER 0 Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER 0 Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER AccuracyofS-Space. Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B (a-b)S- Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER S p Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER a Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER c Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER e Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER coor Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B d i Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B n a Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B t Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B e Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B s rea Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B d Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B f r Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B o Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B m Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B l ayer21of Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER M Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER o Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER l m Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER o Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER 2-E Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B R Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B v Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B e r Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B s u Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B sgr Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B o Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B u n Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B d Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B - t Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B r uth Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B
Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B M o Molmo2-ER lm o Molmo2-ER 2- Molmo2-ER ER Molmo2-ER Molmo2-ER Q w Qwen3.5-4B e n Qwen3.5-4B 3. Qwen3.5-4B 5 -4 Qwen3.5-4B B Qwen3.5-4B Q we Qwen3.6-27B n Qwen3.6-27B 3 .6 Qwen3.6-27B -27 Qwen3.6-27B B Qwen3.6-27B M olm Molmo2-ER o Molmo2-ER 2 Molmo2-ER -E R Molmo2-ER Molmo2-ER Q we Qwen3.5-4B n3 Qwen3.5-4B . 5- Qwen3.5-4B 4 Qwen3.5-4B B Qwen3.5-4B Q w Qwen3.6-27B en Qwen3.6-27B 3. 6- Qwen3.6-27B 2 Qwen3.6-27B 7 B Qwen3.6-27B
object positions, with Spearman correlations and least-squares fits. (c) Spatial QA accuracy across benchmarks
|     | and models, |              | comparing S-Space | readouts | with      | models’ | direct answers. |     |     |     |
| --- | ----------- | ------------ | ----------------- | -------- | --------- | ------- | --------------- | --- | --- | --- |
|     |             | Edit methods |                   |          | Questions |         |                 |     |     |     |
A Shift one object's coordinate 1 Absolute position 100 99.8% D2
x′ q=xq+β
|     |     |     |     | “Is the {query} to the left or |     |     | )%( noitneter rewsnA |     |       |     |
| --- | --- | --- | --- | ------------------------------ | --- | --- | -------------------- | --- | ----- | --- |
|     |     |     |     |                                |     |     |                      |     | 80.4% | B2  |
B Shift both objects' coordinates right of the image center?” 78.1%
|     | x′  | q=xq+β, | x′ r=xr+β |     |     |     | 75  |     |     | A3  |
| --- | --- | ------- | --------- | --- | --- | --- | --- | --- | --- | --- |
2 Relative position
C Swap object coordinates
|     |     | x′ q=xq+α(xr−xq), |     | “Is the {query} to the left or |     |     | 50  |     |       |     |
| --- | --- | ----------------- | --- | ------------------------------ | --- | --- | --- | --- | ----- | --- |
|     |     |                   |     | right of the {reference}?”     |     |     |     |     | 43.9% | C2  |
|     |     | x′ r=xr−α(xr−xq)  |     |                                |     |     |     |     | 41.0% |     |
A1
|     | D Add random noise |      |                          | 3 Object color               |     |     | 25  |                       |     |     |
| --- | ------------------ | ---- | ------------------------ | ---------------------------- | --- | --- | --- | --------------------- | --- | --- |
|     | h′ q=hq+α          | ·u,  | h′ r=hr−α·u              |                              |     |     |     |                       |     |     |
|     |                    | g    |                          | “What color is the {query}?” |     |     | 0   |                       |     |     |
|     |                    | u=   | , g∼N(0,I)               |                              |     |     |     |                       |     |     |
|     |                    | ∥g∥2 |                          |                              |     |     |     | S-Space edit scale    |     |     |
|     |                    |      | (a) Edits and questions. |                              |     |     |     | (b) Answer retention. |     |     |
Figure4 Causal intervention of S-Space. (a) Different coordinate-editing and question configurations. (b)
Answer retention under different interventions and edit scales. Experiments use Molmo2-ER at layer 17 (L17).
|     | See Appendix |           | C.3 for details. |     |     |     |     |     |     |     |
| --- | ------------ | --------- | ---------------- | --- | --- | --- | --- | --- | --- | --- |
|     | 3.2          | Causality |                  |     |     |     |     |     |     |     |
Accurate readout alone does not necessarily imply that the model itself uses S-Space. To test its causal
role, we read out object coordinates from S-Space, edit these coordinates, write the modified values
back into the hidden representations, and then resume generation while leaving the image, question, and
|     | representation |     | components | outside | S-Space | unchanged. |     |     |     |     |
| --- | -------------- | --- | ---------- | ------- | ------- | ---------- | --- | --- | --- | --- |
Editing S-Space coordinates changes spatial judgments. As shown in Figure 4, S-Space interven-
tionbycoordinateeditingsubstantiallyalterspatialjudgmentscomparedwithrandomediting. Theonly
exception is relative questions under common shifts, where shifting both objects together preserves their
|     | relative | positions | and therefore |     | leaves the | judgment | merely unchanged. |     |     |     |
| --- | -------- | --------- | ------------- | --- | ---------- | -------- | ----------------- | --- | --- | --- |
Non-spatial judgments are largely preserved. The same intervention that strongly alters spatial
answershavelittleeffectonunrelatedcolorjudgments. ThiseffectsuggeststhateditingS-Spaceselectively
modifiesspatialinformationwithoutbroadlydisruptingtheobjectrepresentation. Together,theseresults
show that S-Space is causally and selectively used when the model produces verbal spatial judgments.
|     | 3.3 | Persistence |     |     |     |     |     |     |     |     |
| --- | --- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- |
Beyond the dataset generalization shown in Section 3.1, we further replace the relative-comparison
prompts with independent single-object queries and even non-spatial questions that ask about colors.
Object coordinates are read out in the same way and compared for relative spatial QA.
S-Space persists without explicit spatial questions. As shown in Figure 5, despite substantial
5

|     |     |     | S-Space: | Exploring | Spatial | Workspace | in  | Multimodal | Language |     | Models |     |     |
| --- | --- | --- | -------- | --------- | ------- | --------- | --- | ---------- | -------- | --- | ------ | --- | --- |
S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Relative Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial
S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts S-Space Persists Across Prompts Relative Relative Single-object Single-object Non-spatial Non-spatial
S-Space Persists Across Prompts S-Space Persists Across Prompts Relative Relative Single-object Single-object Non-spatial Non-spatial
|     |     |     |     |     |     |     | Relative Relative Relative | Single-object | Single-object Single-object | Non-spatial Non-spatial Non-spatial |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | -------------------------- | ------------- | --------------------------- | ----------------------------------- | --- | --- | --- |
Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats Prompt Formats CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench CV-Bench EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial EmbSpatial SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel SpatialTunnel
Prompt Formats Prompt Formats CV-Bench CV-Bench EmbSpatial EmbSpatial SpatialTunnel SpatialTunnel
Prompt Formats Prompt Formats Relative CV-Bench CV-Bench 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 91.92 91.92 EmbSpatial EmbSpatial SpatialTunnel SpatialTunnel 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92 92.92
R R R R R R R R R R R R R R R R R R R R R Relative R R R R R R Relative Relative R Relative Relative R R R R R R e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t i i i i i i i i i i i i i i i i i i i i i i i i i i i i i i i i i i v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e 100 100 100 100 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 91.92 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 92.92 92.92 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58 88.4289.58
“Is the {query} to the left Relative Relative “I “I “I “I “I “I “I “I “I “I “I “I “I “I “I “I “I “I “I “I “I “Is the {query} to the left or right “I “I “I “I “I “I “I “I “I “I “I “I “I “I “I s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s  s s s s  s  s  s  s  s   t    t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t t h h h h h h h h h h h h h h h h h h h h h h h h h h h h h h h h h h h h 100 100 e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e e                                                        {    {             {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q {q { {q {q {q {q {q {q q q q uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right u u u uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right uery} to the left or right e e e r r r y y y } }  }     t to t o o       t t t h h h e e left or right e  l  l e e ft ft     o o r r r r ig ig h h t t ↑ )%( ycarucca llarevO 91.92 91.92 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 83.68 87.2889.3686.5688.4091.8489.5290.00 87.2889.3686.5688.4091.8489.5290.00 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 96.5094.6792.9290.0887.6787.83 96.5094.6792.9290.0887.6787.83 92.92 92.92 88.4289.58 88.4289.58 88.4289.58 88.4289.58
Relative Relative of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” o o o of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” of the {reference}?” “Is the {query} to the left or right “Is the {query} to the left or right f f f  t  t  t h h h e e e  {  {  { r r r e e e fe fe fe r r r e e e 9n 9n n 1 1 c c c .9 .9 e2 e e2 } } } ? ? ? ” ” ” 8 8 9. 9. 3 3 686.5688.4091.8489.5290.0080 686.5688.4091.8489.5290.0080 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 86.9283.8385.6786.4288.0888.7589.0089.3389.50 86.9283.8385.6786.4288.0888.7589.0089.3389.50 83.68 83.68 83.68 83.68 92.92 92.92 88.4289.58 88.4289.58
|                                                                           | or right of the {reference}?” of the {reference}?” of the {reference}?” “Is the {query} to the left or right “Is the {query} to the left or right                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 8 8 3 3 .6 .6 8 8 8 8 7 7 . . 28 28 |     | )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO )%( ycarucca llarevO 80 80 |     |     |     |     |     |     |     |     |     |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| “Is the {query} to the left or right “Is the {query} to the left or right | of the {reference}?” of the {reference}?”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                     |     | )%( ycarucca llarevO )%( ycarucca llarevO 80 80                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |     |     |     |     |     |     |     |     |     |
| of the {reference}?” of the {reference}?”                                 | )%( ycarucca llarevO )%( ycarucca llarevO 80 80                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                     |     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |     |     |     |     |     |     |     |     |     |
|                                                                           | Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object Single-object                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                     |     | 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60 60                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |     |     |     |     |     |     |     |     |     |
|                                                                           | Single-object Single-object “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” +                                                                                                                                   |                                     |     | 60 60                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |     |     |     |     |     |     |     |     |     |
| Single-object Single-object                                               | “Where is the {query}?” + “Where is the {query}?” + “Where is the {query}?” + “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” “Where is the {reference}?” 60 60 |                                     |     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |     |     |     |     |     |     |     |     |     |
|                                                                           | “Where is the {reference}?” “Where is the {query}?” + “Where is the {query}?” + “Where is the {reference}?” “Where is the {reference}?”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                                     |     | 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40 40                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |     |     |     |     |     |     |     |     |     |
| “Where is the {query}?” + “Where is the {query}?” +                       | “Where is the {reference}?” “Where is the {reference}?”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |                                     |     | 40 40                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |     |     |     |     |     |     |     |     |     |
| “Where is the {reference}?” “Where is the {reference}?”                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                     |     | 40 40                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |     |     |     |     |     |     |     |     |     |
|                                                                           | Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial Non-spatial 40 40                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |                                     |     | 20 20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |     |     |     |     |     |     |     |     |     |
|                                                                           | Non-spatial Non-spatial “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query} “What colors are the {query}                        |                                     |     | 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |     |     |     |     |     |     |     |     |     |
| Non-spatial Non-spatial                                                   | “What colors are the {query} and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” and the {reference}?” “What colors are the {query} “What colors are the {query}                                                                                                                                                                                                                            |                                     |     | 20 20                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |     |     |     |     |     |     |     |     |     |
and the {reference}?” and the {reference}?” “What colors are the {query} “What colors are the {query} 20 20
| “What colors are the {query} “What colors are the {query} | and the {reference}?” and the {reference}?” and the {reference}?” |     |     | 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |     |     |     |     |     |     |     |     |     |
| --------------------------------------------------------- | ----------------------------------------------------------------- | --- | --- | ------------------------------------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
and the {reference}?” and the {reference}?” 0 0 0 0 Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B Qwen3.6-27B
0 0 Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B
|     |     |     |     |     | Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B | Qwen3.6-27B Qwen3.6-27B |     | Molmo2-ER Molmo2-ER | Qwen3.5-4B Qwen3.5-4B | Qwen3.6-27B Qwen3.6-27B | Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B | Qwen3.6-27B Qwen3.6-27B |     |
| --- | --- | --- | --- | --- | ----------------------------------------- | ----------------------- | --- | ------------------- | --------------------- | ----------------------- | ----------------------------------------- | ----------------------- | --- |
(a) Prompt formats. Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B Molmo2-ER Molmo2-ER (b) CV-Bench. Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B (c) EmbSpatial. Molmo2-ER Molmo2-ER Qwen3.5-4B Qwen3.5-4B Qwen3.6-27B Qwen3.6-27B (d) SpatialTunnel.
Figure5 S-Space persists across prompts. ThesameS-Spacereadoutcontinuestosupportaccuratespatial
judgments on CV-Bench, EmbSpatial, and SpatialTunnel (b-d) across pairwise spatial, single-object, and non-
|     | spatial prompts | (a). |     |     |     |     |     |     |     |     |     |     |     |
| --- | --------------- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Q:Compared with curtains,
|     |     |                      | Q:The goalkeeper   |                            |                |       |     |     |                        |                      | is the desk farther from   |          |       |
| --- | --- | -------------------- | ------------------ | -------------------------- | -------------- | ----- | --- | --- | ---------------------- | -------------------- | -------------------------- | -------- | ----- |
|     |     |                      |                    | dives toward the ball.     |                |       |     |     |                        |                      | or closer to you?          |          |       |
|     |     |                      |                    | ball                       | goalkeeper     |       |     |     |                        |                      | you desk                   | curtains |       |
|     |     |                      | −3                 |                            | 0              |       | 3   |     |                        | −3                   | 0                          |          | 8     |
|     |     |                      | left               |                            |                | right |     |     |                        |                      |                            |          |       |
|     |     |                      |                    |                            |                |       |     |     |                        | far                  |                            |          | close |
|     |     |                      | (a) Unseen ball.   |                            |                |       |     |     | (b) Viewing observer.  |                      |                            |          |       |
|     |     |                      | Q:Moving past you, |                            |                |       |     |     |                        | Q:Moving toward you, |                            |          |       |
|     |     |                      |                    | the delivery robot         |                |       |     |     |                        |                      | the delivery robot         |          |       |
|     |     |                      |                    | continues along its route. |                |       |     |     |                        |                      | continues along its route. |          |       |
|     |     |                      |                    | you                        | delivery robot |       |     |     |                        |                      | you delivery robot         |          |       |
|     |     |                      | −1                 | 0                          |                |       | 5   |     |                        | −1                   | 0                          |          | 5     |
|     |     |                      | far                |                            |                | close |     |     |                        | far                  |                            |          | close |
|     |     | (c) Moving past you. |                    |                            |                |       |     |     | (d) Moving toward you. |                      |                            |          |       |
Figure6 S-Space beyond visible objects. Itlocalizesoff-screenentities(a),placestheinvisibleobserver(b),
andreflectsrelationsimpliedbylanguage(c-d). ReadoutfromMolmo2-ERL17. Barsshow95%prompt-template
|     | bootstrap | intervals. |     |     |     |     |     |     |     |     |     |     |     |
| --- | --------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
change in prompt structure and computational context, the resulting coordinates continue to support
accurate spatial judgments. This robustness suggests that S-Space is an intrinsic and persistent
organization of the model’s representations, rather than an artifact induced by a particular dataset,
|     | prompt template, |     | or pairwise-query |     | format. |     |     |     |     |     |     |     |     |
| --- | ---------------- | --- | ----------------- | --- | ------- | --- | --- | --- | --- | --- | --- | --- | --- |
4 HowDoesS-SpaceEmerge?ACaseStudy
Takeaway: S-Space is hypothesized to emerge from predicting spatial language, which also endows
|     | it with | broader | structure | beyond | visible | objects | and | physical | space. |     |     |     |     |
| --- | ------- | ------- | --------- | ------ | ------- | ------- | --- | -------- | ------ | --- | --- | --- | --- |
We hypothesize that S-Space emerges from the objective of predicting spatial language during large-
scale training. To predict tokens such as left and right, an MLLM must bind visible entities to their
relativepositionsandmakethisinformationaccessibletolanguagegeneration. Thistrainingpressuremay
organizeinternalactivationsintostablespatialaxeswithoutexplicitcoordinatesupervision. Intriguingly,
the resulting structure inherited from language may extend beyond visible objects and physical space, as
|     | illustrated | by the | following | showcases. |     |     |     |     |     |     |     |     |     |
| --- | ----------- | ------ | --------- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
S-Spacereflectsrelationsimpliedbyvisualevidence. Evenwhenanentityitselfisnotvisible,itsposition
in S-Space can be inferred from visual evidence. As shown in Figure 6a, a goalkeeper diving toward
an unseen ball places the token ball in the direction of the dive. Beyond unseen objects, even the
observer, represented by the abstract token you, projects toward the close end of the distance axis
6

S-Space: Exploring Spatial Workspace in Multimodal Language Models
Molmo2-ER
Q: During the debate, a {identity}
speaker responded to a Qwen3.5-4B
moderator member.
socialist moderate conservative Qwen3.6-27B
left 0 right
Figure7 S-Space beyond physical space. Socialist and conservative project toward opposite ends of the
horizontal axis of S-Space, mirroring the linguistic metaphor of political left and right.
(Figure6b). ThesecasessuggestthatS-Spacedoesnotmerelyregisterdetectedobjects,butcancomplete
the surrounding spatial world.
S-Spacereflectsrelationsimpliedbylanguage. Linguisticcontextcanlikewisedeterminewhereanentity
is represented in S-Space. As shown in Figure 6c and 6d, we keep the delivery-robot image fixed while
replacing moving past you with moving toward you. Correspondingly, the token you shifts from a farther
to a closer distance coordinate relative to the robot, while the robot’s own coordinate remains nearly
unchanged.
S-Spaceblendsphysicalandabstractconcepts. Language is a highly abstract representation of the
world: spatial terms describe physical geometry, but are also routinely repurposed to express abstract
meanings. Models trained on language may therefore inherit associations that do not cleanly separate
physical positions from their abstract uses. Strikingly, as illustrated in Figure 7, socialist—a concept
conventionally associated with the political left—also projects toward the left end of the horizontal axis,
and conservative toward the right. These cases illustrate both the capabilities and limitations of spatial
structure inherited from large-scale language training.
5 DiagnosingSpatialReasoningFailureswithS-Space
Takeaway: MLLMs often possess sufficiently accurate egocentric spatial representations in S-
Space, yet still fail in downstream spatial reasoning. These failures reveal two key bottlenecks: (1)
imperfect spatial computation over accurate representations (§5.1), and (2) reference-frame
coupling when reconciling different coordinate systems (§5.3).
Modern MLLMs still struggle with spatial reasoning, especially when they must build a coherent spatial
understandingfrompartialviewpoints. Thisrequirescorrectlytransformingbetweenviewpointsandrec-
oncilingdifferentcoordinateframes. S-Spaceoffersadirectviewofthemodel’sinternalspatialstructure,
enabling us to diagnose where and how these reasoning failures arise.
5.1 Perception-ComputationDecompositionviaS-Space
Perspective-taking questions require judging object relations after an imagined change of viewpoint. We
use SpinBench [15] as our evaluation benchmark, which asks which of two objects would appear to the
left, orclosertotheobserver, fromaleft, right, orbackview. YetfrontierVLMsarereportedtoperform
surprisingly poorly on these seemingly simple transformations. This raises a natural question: does the
failure arise from spatial perception, or from the computation performed to transform the perceived
spatial representation?
S-Space allows us to disentangle these two sources of error by reading the model’s internal coordinates
independently of its final answer. As shown in Figure 8, we construct a decomposed pipeline that reads
theobjects’coordinatesfromS-Space,appliesafixedrotationcorrespondingtothetargetviewpoint,and
derives the answer with the same deterministic spatial rule as in Section 2.3. We compare this method
with the model’s native answer generation, both with and without chain-of-thought reasoning [30].
ExplicittransformationoverS-Spacesubstantiallyimprovesperspective-taking. As shown in Table 1,
direct generation remains limited across all three models. Chain-of-thought improves performance with
7

|     |     |     | S-Space:        | Exploring | Spatial | Workspace                                                        |     | in Multimodal     | Language | Models |                                                                  |                                                  |
| --- | --- | --- | --------------- | --------- | ------- | ---------------------------------------------------------------- | --- | ----------------- | -------- | ------ | ---------------------------------------------------------------- | ------------------------------------------------ |
|     |     | Q:  | Imagine viewing |           |         |                                                                  |     | view_rotations.py |          |        |                                                                  |                                                  |
|     |     |     |                 |           |         | ((((((((((((((((uuuuuuuuuuuuuuuupppppppppppppppp)))))))))))))))) |     |                   |          |        | ((((((((((((((((uuuuuuuuuuuuuuuupppppppppppppppp)))))))))))))))) | mmmmmmmmmmmmmmmmuuuuuuuuuuuuuuuugggggggggggggggg |
it from the left side. VI E W _ R O TA T I O N S   =   { oooooooooooooooolllllllllllllllldddddddddddddddd
|     |     |                  |     |     |     |     |                                                  |                 | " l e f t " :   n p . | a r r a y([ |     |     |
| --- | --- | ---------------- | --- | --- | --- | --- | ------------------------------------------------ | --------------- | --------------------- | ----------- | --- | --- |
|     |     | Which object now |     |     |     |     | mmmmmmmmmmmmmmmmuuuuuuuuuuuuuuuugggggggggggggggg |     [ 0, 0, 1], |                       |             |     |     |
appears on the left?     [ 0, 1, 0], bbbbbbbbbbbbbbbboooooooooooooooottttttttttttttttttttttttttttttttlllllllllllllllleeeeeeeeeeeeeeee
|     |     |                   |     |     | bbbbbbbbbbbbbbbboooooooooooooooottttttttttttttttttttttttttttttttlllllllllllllllleeeeeeeeeeeeeeee |     |     |     [-1, 0, 0]])                                                                                                              |                        |     |     |                                                                                                                  |
| --- | --- | ----------------- | --- | --- | ------------------------------------------------------------------------------------------------ | --- | --- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------- | --- | --- | ---------------------------------------------------------------------------------------------------------------- |
|     |     | A. mug            |     |     |                                                                                                  |     |     | }                                                                                                                             |                        |     |     |                                                                                                                  |
|     |     | B. mustard bottle |     |     |                                                                                                  |     |     |                                                                                                                               | source_hvd = np.array( |     |     |                                                                                                                  |
|     |     |                   |     |     |                                                                                                  |     |     | ((((((((((((((((rrrrrrrrrrrrrrrriiiiiiiiiiiiiiiigggggggggggggggghhhhhhhhhhhhhhhhtttttttttttttttt))))))))))))))))   [x, y, z]) |                        |     |     | ((((((((((((((((rrrrrrrrrrrrrrrriiiiiiiiiiiiiiiigggggggggggggggghhhhhhhhhhhhhhhhtttttttttttttttt)))))))))))))))) |
Original front view ((((((((((((((((ddddddddddddddddeeeeeeeeeeeeeeeepppppppppppppppptttttttttttttttthhhhhhhhhhhhhhhh)))))))))))))))) t a r g e t _ h v d   =   ( ((((((((((((((((ddddddddddddddddeeeeeeeeeeeeeeeepppppppppppppppptttttttttttttttthhhhhhhhhhhhhhhh)))))))))))))))) oooooooooooooooolllllllllllllllldddddddddddddddd
|                      |     |     |     |     |     |     |     |                  |   V I E W _ R O T A T I ONS[ |     |     |     |
| -------------------- | --- | --- | --- | --- | --- | --- | --- | ---------------- | ---------------------------- | --- | --- | --- |
| With-premise setting |     |     |     |     |     |     |     |     target_view] |                              |     |     |     |
  @ source_hvd
| "The mustard bottle is closer; |     |     |     |     |                           |     |     | )   |     |     |                     |     |
| ------------------------------ | --- | --- | --- | --- | ------------------------- | --- | --- | --- | --- | --- | ------------------- | --- |
|                                |     |     |     |     | Left in the original view |     |     |     |     |     | Left after rotation |     |
tthhee  mmuugg  iiss  ffaarrtthheerr  ffrroomm  tthhee  vviieewweerr..""
|     |     |     |     |     | A   | Mustard bottle |     | e   |     |     | Answer: A. mug |     |
| --- | --- | --- | --- | --- | --- | -------------- | --- | --- | --- | --- | -------------- | --- |
(a) Scene and spatial evidence. (b) S-Space readout and viewpoint rotation.
Figure8 Perception-Computation decomposition via S-Space. (a) Perspective-taking question and the
optional w/ premise setting. (b) We separate spatial perception from spatial computation by reading object
coordinates from S-Space, applying the viewpoint transformation explicitly, and deriving the answer with a
| deterministic |     | spatial | rule. |            |     |     |     |     |     |           |     |     |
| ------------- | --- | ------- | ----- | ---------- | --- | --- | --- | --- | --- | --------- | --- | --- |
|               |     |         |       | w/opremise |     |     |     |     |     | w/premise |     |     |
Model Direct Reasoning S-Space+Rotation Direct Reasoning S-Space+Rotation
| Molmo2-ER |     | 60.96 |     | —   |     | 94.52 | (+33.56) |     | 61.81 | —   | 99.31 (+37.50) |     |
| --------- | --- | ----- | --- | --- | --- | ----- | -------- | --- | ----- | --- | -------------- | --- |
Qwen3.5-4B 60.96 62.33 (+1.37) 91.10 (+30.14) 60.42 72.22 (+11.80) 97.92 (+37.50)
Qwen3.6-27B 60.96 83.56 (+22.60) 95.21 (+34.25) 72.92 91.67 (+18.75) 99.31 (+26.39)
Table1 SpinBench perspective-taking accuracy. Numbers in parentheses show gains over direct answers
| in the | same | setting, | in percentage |     | points; dashes | indicate |     | no reasoning | mode. |     |     |     |
| ------ | ---- | -------- | ------------- | --- | -------------- | -------- | --- | ------------ | ----- | --- | --- | --- |
additionaltest-timecomputation,butnotableerrorspersist. Incontrast,theprespecifiedS-Spacereadout
followed by explicit coordinate transformation yields consistently stronger results, which shows that the
| models | encode | sufficient |     | spatial | information | for | accurate | judgments. |     |     |     |     |
| ------ | ------ | ---------- | --- | ------- | ----------- | --- | -------- | ---------- | --- | --- | --- | --- |
Reasoningerrorspersistwithexplicitspatialpremises. Following the premise setting in SpinBench, we
further provide the correct source-view relation serves as an oracle for spatial perception, bypassing the
model’s own perceptual inference (Figure 8a). Even with this relation supplied, models often fail to
producethecorrecttarget-viewanswer. Meanwhile, theirS-Spacerepresentationsbecomemoreaccurate
with language implication, consistent with Section 4, and support near-perfect accuracy. This further
highlights a key bottleneck in reliably transforming and operating on correct spatial information during
| viewpoint |     | reasoning. |     |     |     |     |     |     |     |     |     |     |
| --------- | --- | ---------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
5.2 TrackingS-SpaceTransformationthroughReasoning
Although still imperfect, chain-of-thought reasoning indeed improves over direct answer generation. We
therefore track object coordinates in S-Space throughout the chain of thought to examine how these
Direct readout
Rotated readout Direct readout
Rotated readout Direct readout Direct readout
Early Early Analyze current view Analyze current view Middle Middle Imagine new view Imagine new view Late Late Conclude Conclude 100 Rotated readout Rotated readout
|     | Early Early Analyze current view Analyze current view |     |     | Middle Middle Imagine new view Imagine new view |     |     | Late Late | Conclude Conclude |     | 100 |     |     |
| --- | ----------------------------------------------------- | --- | --- | ----------------------------------------------- | --- | --- | --------- | ----------------- | --- | --- | --- | --- |
In the front view In the front view the the I now imagine viewing the I now imagine viewing the From this perspective From this perspective the the 100 100 96.6 89.0
sugar box sugar box In the front view In the front view is farther is farther the the sugar box I now imagine viewing the I now imagine viewing the from the back sugar box sugar box From this perspective From this perspective is closer is closer the the 90 90 96.6 89.0 86.3
sugar box sugar box (up) is farther is farther sugar box (up) from the back sugar box sugar box (up) is closer is closer master chef can master chef can 96.6 96.6 89.0 89.0 86.3
(up) sugar box sugar box (up) from the back from the back (up) master chef can master chef can 90 90 80 86.3 86.3
|     |     | (up) (up)                                 |         |     | (up) (up)                       |                             | sugar box               | (up) (up) | old     | )%( ycaruccA )%( ycaruccA 80    |      |           |
| --- | --- | ----------------------------------------- | ------- | --- | ------------------------------- | --------------------------- | ----------------------- | --------- | ------- | ------------------------------- | ---- | --------- |
|     |     | master chef can                           |         |     | master chef can                 |                             | sugar box               |           | old     | )%( ycaruccA )%( ycaruccA 80 80 |      |           |
|     |     | master chef can                           |         |     | master chef can                 | sugar box                   | old sugar box sugar box |           | old old | 70                              |      |           |
|     |     | master chef can master chef can sugar box |         |     | master chef can master chef can | sugar box old old           | old                     |           |         | 70                              |      |           |
|     |     | sugar box                                 |         |     |                                 | sugar box sugar box old old | old old                 |           |         | 70 70                           |      | 67.1      |
|     |     | sugar box sugar box                       |         |     |                                 |                             |                         |           |         | 60                              |      | 67.1      |
|     |     |                                           |         |     |                                 |                             |                         |           |         | 60                              |      | 67.1 67.1 |
|     |     |                                           | (right) |     |                                 | (right)                     |                         |           | (right) | 60 60                           | 54.8 | Chance    |
|     |     |                                           | (right) |     |                                 | (right)                     |                         |           | (right) | 50 50                           | 54.8 | Chance    |
(depth) (right) (right) (depth) (right) (right) (depth) (right) (right) 50 5 0 54.8 54.8 Chance Chance
|     | (depth) |     |     | (depth) | old |     | (depth) |     |     | 4 0 44 44 .  55 |     |     |
| --- | ------- | --- | --- | ------- | --- | --- | ------- | --- | --- | --------------- | --- | --- |
(depth) (depth) (depth) (depth) old (depth) (depth) 40 E 4444. 55 a r l y Middle Late
<think> old old </think> 40 40 Early 4444. 55 4444. 55 Middle Late
<think> </think> Early Early CoT stage CoT stage Middle Middle Late Late
| <think> <think> |     |     |                                  |     |     |     |     |     | </think> </think> |                       | CoT stage CoT stage |     |
| --------------- | --- | --- | -------------------------------- | --- | --- | --- | --- | --- | ----------------- | --------------------- | ------------------- | --- |
|                 |     |     | (a) S-Space across supplied CoT. |     |     |     |     |     |                   | (b) Readout accuracy. |                     |     |
Figure9 Chain-of-thought progressively transforms S-Space. (a) S-Space coordinates read out from
objectnamesatsuccessivestagesofacontrolledCoT.(b)Qwen3.6-27BL43readoutaccuracyonSpinBenchwith
| and | without | explicit | viewpoint | rotation. |     |     |     |     |     |     |     |     |
| --- | ------- | -------- | --------- | --------- | --- | --- | --- | --- | --- | --- | --- | --- |
8

|     | S-Space: | Exploring | Spatial Workspace | in Multimodal | Language | Models |     |
| --- | -------- | --------- | ----------------- | ------------- | -------- | ------ | --- |
spatial representations change during the model’s own reasoning process. This analysis complements the
internal-workspace perspective in Section 3 by revealing internal transformation of spatial information
in S-Space.
We conduct a controlled analysis on Qwen3.6-27B. Specifically, as shown in Figure 9a, we manually
construct a CoT template that explicitly identifies the original spatial relation, imagines the target
viewpoint, and derives the transformed relation. By probing repeated object mentions across these
stages,weevaluatehowS-Spaceupdatesaccordingly. Ateachstage,wereadouttheS-Spacecoordinates
andusethemtoanswerthecorrespondingSpinBenchperspective-takingquestion,eitherdirectlyorafter
| applying | the optimal viewpoint | rotation. |     |     |     |     |     |
| -------- | --------------------- | --------- | --- | --- | --- | --- | --- |
ReasoningprogressivelytransformsS-Space. Asthechain-of-thoughtunfolds,theobjects’relativecoor-
dinatesbecomeincreasinglyalignedwiththeviewpointrequestedbythequestion. Thistransformationis
reflectedinaprogressiveshiftfromanadvantagefortherotatedreadoutatearlierstagestoanadvantage
forthedirectreadoutatlaterstages, asshowninFigure9b. Thissuggeststhatthemodelinternallysim-
ulates part of the required perspective transformation. However, this transformation remains imperfect
| and does | not always produce | the correct | verbal answer. |     |     |     |     |
| -------- | ------------------ | ----------- | -------------- | --- | --- | --- | --- |
5.3 DiagnosingReference-FrameCouplinginS-Space
S-Spacealsohelpsinterpretotherreasoningerrors. Incardinal-directionspatialreasoning, werepeatedly
observe reference-frame coupling: models often infer cardinal directions from image-relative relations,
mapping right to east or above to north, as showcased in Figure 10a. To investigate this phenomenon,
usingpositionalrelationshiptasksofMMSI-Bench[21],wecollectcardinal-directiontokens(north,south,
etc.) from Qwen3.6-27B’s chain-of-thought and read out their coordinates in S-Space.
Cardinalandimage-relativedirectionsarecoupledinS-Space. As shown in Figure 10b, the resulting
geometry makes the coupling explicit: east aligns with right in S-Space, north with above, and northeast
reflects both directions. This suggests that the model represents cardinal and image-relative directions
through partially shared spatial features rather than fully independent concepts. Inspired by Section 4,
we hypothesize that this coupling may partly reflect biases in web-scale pretraining data, where cardinal
directions frequently appear in map-like reference frames aligned with horizontal and vertical axes.
Q:What is the position of the brown
ceramic pot relative to the potted
plant? (The black box is to the
|     | north of the potted plant.)                                    |     |     | 4   |     |     |     |
| --- | -------------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
| A:  | <think> ...Since the black box is north of the potted plant,   |     |     |     |     |     |     |
|     | and the brown ceramic pot is to the right (east) of the black  |     |     | 2   |     |     |     |
lacitreV ecapS-S
box, the brown ceramic pot is northeast of the potted plant.
... </think>  Northeast.
Correct answer: North.
0
Q:In what direction from the bathtub
is the apple on the cabinet? (The
bathtub plug is to the east of the
|     | center of the bathtub.)                                        |     |     | −2  |     |     |     |
| --- | -------------------------------------------------------------- | --- | --- | --- | --- | --- | --- |
| A:  | <think> ... The tub (right of Image 2) is at the far right of  |     |     |     |     |     |     |
|     | the room. So the apple is to the left (West) of the tub. And   |     |     | −4  |     |     |     |
the counter is "above" (North) the floor level where the tub
|     | is.... </think>  Northwest. |                            |     |     | −4 −2                            | 0 2 | 4   |
| --- | --------------------------- | -------------------------- | --- | --- | -------------------------------- | --- | --- |
|     |                             | Correct answer: Northeast. |     |     | S-Space Horizontal               |     |     |
|     | (a) Reference-frame errors. |                            |     |     | (b) Cardinal-direction readouts. |     |     |
Figure10 DirectioncouplinginS-Space. (a)Representativereasoningfailureswhereimage-relativerelations
are incorrectly reused as cardinal directions. (b) S-Space coordinates of cardinal-direction tokens from Qwen3.6-
| 27B chain-of-thought | on MMSI-Bench. |     |     |     |     |     |     |
| -------------------- | -------------- | --- | --- | --- | --- | --- | --- |
6 Discussions
We identified S-Space as an internal spatial workspace whose contents can be measured and operated
on to investigate spatial reasoning failures. More broadly, such mechanistic analysis (see related work in
AppendixA)helpsrevealwhichkeycapabilitiesdoanddonotemergethroughscaling,andforcapabilities
thatremainunreliable,diagnosethemissingingredients. Ourresultshaveuncoveredbiasesinheritedfrom
9

|     |     | S-Space: | Exploring | Spatial | Workspace | in Multimodal |     | Language Models |
| --- | --- | -------- | --------- | ------- | --------- | ------------- | --- | --------------- |
pre-training. AnotherimplicationisthatfuturesystemsneednotrelyonamonolithicMLLMtoperform
every spatial operation internally. Instead, agentic spatial reasoning [31, 32] can connect dedicated tools
fortransformation,simulation,andmemory,ultimatelyturningcapableperceptionintoreliablereasoning
and action.
Authors
Zhiyuan Shi*, Xiang Li*, Xingzhuo Guo*, Shangchen Miao, Weiliang Chen, Qiyu Dai, Jinshan Ren,
| Jiangran Lyu, | Fangfu | Liu, Mingsheng |     | Long, | Jialong | Wu† |     |     |
| ------------- | ------ | -------------- | --- | ----- | ------- | --- | --- | --- |
Affiliations
| MirroS, Tsinghua |     | University, | Peking | University |     |     |     |     |
| ---------------- | --- | ----------- | ------ | ---------- | --- | --- | --- | --- |
References
[1] ByteDanceSeed.“Seed2.0ModelCard:TowardsIntelligenceFrontierforReal-WorldComplexity”.In:arXiv
| preprint | arXiv:2607.00248 |     | (2026). |     |     |     |     |     |
| -------- | ---------------- | --- | ------- | --- | --- | --- | --- | --- |
[2] Kimi Team, T. Bai, Y. Bai, Y. Bao, S. H. Cai, Y. Cao, et al. “Kimi K2.5: Visual Agentic Intelligence”. In:
| arXiv | preprint | arXiv:2602.02276 |     | (2026). |     |     |     |     |
| ----- | -------- | ---------------- | --- | ------- | --- | --- | --- | --- |
[3] Qwen Team. Qwen3.5: Towards Native Multimodal Agents. Feb. 2026. url: https://www.alibabacloud.
com/blog/602894.
[4] Google DeepMind. Gemini 3.5 Flash: Model Card. Model Card. Google DeepMind, May 2026. url: https:
//deepmind.google/models/model-cards/gemini-3-5-flash/.
[5] J.Yang,S.Yang,A.W.Gupta,R.Han,L.Fei-Fei,andS.Xie.“ThinkinginSpace:HowMultimodalLarge
| Language | Models | See, Remember, |     | and | Recall Spaces”. | In: | CVPR. | 2025. |
| -------- | ------ | -------------- | --- | --- | --------------- | --- | ----- | ----- |
[6] B. Chen, Z. Xu, S. Kirmani, B. Ichter, D. Sadigh, L. Guibas, and F. Xia. “SpatialVLM: Endowing Vision-
| Language | Models | with Spatial | Reasoning |     | Capabilities”. | In: | CVPR. | 2024. |
| -------- | ------ | ------------ | --------- | --- | -------------- | --- | ----- | ----- |
[7] S. Yin, J. Ge, Z. Z. Wang, C. Wang, X. Li, M. J. Black, T. Darrell, A. Kanazawa, and H. Feng. “Vision-as-
Inverse-Graphics Agent via Interleaved Multimodal Reasoning”. In: ECCV. 2026.
[8] H.Wang,Y.Cai,W.Chen,J.Chi,H.Sun,Q.Dai,etal.“CodeasWorlds:AgenticDiscoveryofExecutable
World Representations for Physical Reasoning”. In: arXiv preprint arXiv:2608.27549 (2026).
[9] GeminiRoboticsTeam,S.Abeyruwan,J.Ainslie,J.-B.Alayrac,M.G.Arenas,T.Armstrong,etal.“Gemini
Robotics: Bringing AI into the Physical World”. In: arXiv preprint arXiv:2503.20020 (2025).
[10] J.Zhang,K.Wang,R.Xu,G.Zhou,Y.Hong,X.Fang,Q.Wu,Z.Zhang,andH.Wang.“NaVid:Video-based
| VLM | Plans the | Next Step | for Vision-and-Language |     |     | Navigation”. |     | In: RSS. 2024. |
| --- | --------- | --------- | ----------------------- | --- | --- | ------------ | --- | -------------- |
[11] A. Brohan, N. Brown, J. Carbajal, Y. Chebotar, X. Chen, K. Choromanski, et al. “RT-2: Vision-Language-
| Action | Models | Transfer Web | Knowledge |     | to Robotic | Control”. | In: | CoRL. 2023. |
| ------ | ------ | ------------ | --------- | --- | ---------- | --------- | --- | ----------- |
[12] W.Yuan,J.Duan,V.Blukis,W.Pumacay,R.Krishna,A.Murali,A.Mousavian,andD.Fox.“RoboPoint:
A Vision-Language Model for Spatial Affordance Prediction in Robotics”. In: CoRL. 2024.
[13] L.Chen,W.Xie,Y.Liang,H.He,H.Zhao,Z.Yang,etal.“BabyVision:VisualReasoningBeyondLanguage”.
| In: ICML. | 2026. |     |     |     |     |     |     |     |
| --------- | ----- | --- | --- | --- | --- | --- | --- | --- |
[14] Q.Wang,B.Yin,P.Zhang,J.Zhang,K.Wang,Z.Wang,etal.“MindCube:SpatialMentalModelingfrom
| Limited | Views”. | In: ICLR. | 2026. |     |     |     |     |     |
| ------- | ------- | --------- | ----- | --- | --- | --- | --- | --- |
[15] Y.Zhang,R.Corcodel,C.Hori,A.Cherian,andD.Zhao.“SpinBench:PerspectiveandRotationasaLens
| on Spatial | Reasoning | in  | VLMs”. | In: ICLR. | 2026. |     |     |     |
| ---------- | --------- | --- | ------ | --------- | ----- | --- | --- | --- |
[16] S.Dehaene,M.Kerszberg,andJ.-P.Changeux.“Aneuronalmodelofaglobalworkspaceineffortfulcognitive
tasks”. In: Proceedings of the National Academy of Sciences 95.24 (1998), pp. 14529–14534.
[17] A. Schlegel, P. J. Kohler, S. V. Fogelson, P. Alexander, D. Konuthula, and P. U. Tse. “Network structure
anddynamicsofthementalworkspace”.In:Proceedings of the National Academy of Sciences 110.40(2013),
pp. 16277–16282.
∗Equalcontribution.
†Projectlead.
10

|     | S-Space: |     | Exploring | Spatial | Workspace | in Multimodal | Language Models |
| --- | -------- | --- | --------- | ------- | --------- | ------------- | --------------- |
[18] R.Kang,H.Chen,G.Gkioxari,andP.Perona.“LinearMechanismsforSpatiotemporalReasoninginVision
| Language | Models”. | In: ICLR. | 2026. |     |     |     |     |
| -------- | -------- | --------- | ----- | --- | --- | --- | --- |
[19] C.Min,J.Jung,D.Lee,H.Jeon,Y.Su,J.Tremblay,C.H.Song,andJ.Park.“WhyFarLooksUp:Probing
| Spatial Representation |     | in  | Vision-Language |     | Models”. | In: ECCV. | 2026. |
| ---------------------- | --- | --- | --------------- | --- | -------- | --------- | ----- |
[20] K. Park, Y. J. Choe, and V. Veitch. “The Linear Representation Hypothesis and the Geometry of Large
| Language | Models”. | In: ICML. |     | 2024. |     |     |     |
| -------- | -------- | --------- | --- | ----- | --- | --- | --- |
[21] S. Yang, R. Xu, Y. Xie, S. Yang, M. Li, J. Lin, et al. “MMSI-Bench: A Benchmark for Multi-Image Spatial
| Intelligence”. | In: | ICLR. | 2026. |     |     |     |     |
| -------------- | --- | ----- | ----- | --- | --- | --- | --- |
[22] N. Elhage, T. Hume, C. Olsson, N. Schiefer, T. Henighan, S. Kravec, et al. “Toy Models of Superposition”.
| In: Transformer |     | Circuits | Thread | (2022). |     |     |     |
| --------------- | --- | -------- | ------ | ------- | --- | --- | --- |
[23] T. Bricken, A. Templeton, J. Batson, B. Chen, A. Jermyn, T. Conerly, et al. “Towards Monosemanticity:
Decomposing Language Models With Dictionary Learning”. In: Transformer Circuits Thread (2023).
[24] W.Gurnee,N.Sofroniew,A.Pearce,M.Piotrowski,I.Kauvar,R.Chen,etal.“VerbalizableRepresentations
FormaGlobalWorkspaceinLanguageModels”.In:TransformerCircuitsThread (2026).arXiv:2607.15495
url:
| [cs.CL]. | https://transformer-circuits.pub/2026/workspace/. |     |     |     |     |     |     |
| -------- | ------------------------------------------------- | --- | --- | --- | --- | --- | --- |
[25] H. Fang, J. Duan, D. Clay, S. Wang, S. Liu, W. Huang, et al. “MolmoAct2: Action Reasoning Models for
| Real-world | Deployment”. |     | In: CoRL. | 2026. |     |     |     |
| ---------- | ------------ | --- | --------- | ----- | --- | --- | --- |
url:
[26] Qwen Team. Qwen3.6-27B: Flagship-Level Coding in a 27B Dense Model. Apr. 2026. https://
huggingface.co/Qwen/Qwen3.6-27B.
[27] T.-Y.Lin,M.Maire,S.Belongie,J.Hays,P.Perona,D.Ramanan,P.Dollár,andC.L.Zitnick.“Microsoft
| COCO: | Common | Objects | in Context”. |     | In: ECCV. | 2014. |     |
| ----- | ------ | ------- | ------------ | --- | --------- | ----- | --- |
[28] S. Tong, E. Brown, P. Wu, S. Woo, M. Middepogu, S. C. Akula, et al. “Cambrian-1: A Fully Open, Vision-
| Centric | Exploration | of Multimodal |     | LLMs”. | In: NeurIPS. | 2024. |     |
| ------- | ----------- | ------------- | --- | ------ | ------------ | ----- | --- |
[29] M.Du, B.Wu,Z. Li,X. Huang,and Z.Wei.“EmbSpatial-Bench: Benchmarking SpatialUnderstanding for
| Embodied | Tasks | with Large | Vision-Language |     | Models”. | In: ACL. | 2024. |
| -------- | ----- | ---------- | --------------- | --- | -------- | -------- | ----- |
[30] J. Wei, X. Wang, D. Schuurmans, M. Bosma, B. Ichter, F. Xia, E. H. Chi, Q. V. Le, and D. Zhou. “Chain-
of-Thought Prompting Elicits Reasoning in Large Language Models”. In: NeurIPS. 2022.
[31] S. Cho, R. Hachiuma, A. Badki, H. Su, B.-K. Lee, C. H. Song, et al. “SpatialClaw: Rethinking Action
| Interface | for Agentic | Spatial | Reasoning”. |     | In: NeurIPS. | 2026. |     |
| --------- | ----------- | ------- | ----------- | --- | ------------ | ----- | --- |
[32] Z.Luo,C.Zhang,S.Yong,C.Dai,Q.Wang,H.Ran,G.Shi,K.Sycara,andY.Xie.“pySpatial:Generating
| 3D Visual | Programs | for | Zero-Shot | Spatial | Reasoning”. | In: ICLR. | 2026. |
| --------- | -------- | --- | --------- | ------- | ----------- | --------- | ----- |
[33] J. Lin, R. Xu, S. Zhu, S. Yang, P. Cao, Y. Ran, et al. “MMSI-Video-Bench: A Holistic Benchmark for
| Video-Based | Spatial | Intelligence”. |     | In: arXiv | preprint | arXiv:2512.10863 | (2025). |
| ----------- | ------- | -------------- | --- | --------- | -------- | ---------------- | ------- |
[34] Y.Hong,J.Liu,H.Yin,M.Li,L.Guibas,L.Fei-Fei,J.Wu,andY.Choi.“ESI-Bench:TowardsEmbodied
Spatial Intelligence that Closes the Perception-Action Loop”. In: arXiv preprint arXiv:2605.18746 (2026).
[35] P.Zhang,Z.Huang,Y.Wang,J.Zhang,L.Xue,Z.Wang,etal.“TheoryofSpace:CanFoundationModels
| Construct | Spatial | Beliefs | through | Active | Exploration?” | In: ICLR. | 2026. |
| --------- | ------- | ------- | ------- | ------ | ------------- | --------- | ----- |
[36] S. Wang, M. Pei, L. Sun, C. Deng, Y. Li, K. Shao, Z. Tian, H. Zhang, and J. Wang. “SpatialViz-Bench: A
Cognitively-Grounded Benchmark for Diagnosing Spatial Visualization in MLLMs”. In: ICLR. 2026.
[37] R. Huben, H. Cunningham, L. Smith, A. Ewart, and L. Sharkey. “Sparse Autoencoders Find Highly Inter-
| pretable | Features | in Language |     | Models”. | In: ICLR. | 2024. |     |
| -------- | -------- | ----------- | --- | -------- | --------- | ----- | --- |
[38] A. Templeton, T. Conerly, J. Marcus, J. Lindsey, T. Bricken, B. Chen, et al. “Scaling Monosemanticity:
Extracting Interpretable Features from Claude 3 Sonnet”. In: Transformer Circuits Thread (2024).
[39] J. Dunefsky, P. Chlenski, and N. Nanda. “Transcoders Find Interpretable LLM Feature Circuits”. In:
| NeurIPS. | 2024. |     |     |     |     |     |     |
| -------- | ----- | --- | --- | --- | --- | --- | --- |
[40] E. Ameisen, J. Lindsey, A. Pearce, W. Gurnee, N. L. Turner, B. Chen, et al. “Circuit Tracing: Revealing
Computational Graphs in Language Models”. In: Transformer Circuits Thread (2025).
[41] K.Cui,N.Prakash,S.Messica,A.Raina,D.Bau,A.Torralba,andT.R.Shaham.“TheDualMechanisms
of Spatial Variable Binding in Vision-Language Models”. In: arXiv preprint arXiv:2603.22278 (2026).
[42] S.Chen,T.Zhu,R.Zhou,J.Zhang,S.Gao,J.C.Niebles,etal.“WhyIsSpatialReasoningHardforVLMs?
| An Attention | Mechanism |     | Perspective | on  | Focus Areas”. | In: ICML. | 2025. |
| ------------ | --------- | --- | ----------- | --- | ------------- | --------- | ----- |
[43] S.Fu,E.A.Goldberg,Y.N.Wu,andH.Lu.“MultimodalFunctionVectorsforVisualRelations”.In:ICML.
2026.
[44] L. Yang, B. Kang, Z. Huang, Z. Zhao, X. Xu, J. Feng, and H. Zhao. “Depth Anything V2”. In: NeurIPS.
2024.
11

|     | S-Space: Exploring | Spatial Workspace | in Multimodal | Language Models |
| --- | ------------------ | ----------------- | ------------- | --------------- |
[45] Z. Wan, Y. Xie, C. Zhang, Z. Lin, Z. Wang, S. Stepputtis, D. Ramanan, and K. P. Sycara. “InstructPart:
| Task-Oriented | Part Segmentation | with Instruction | Reasoning”. | In: ACL. 2025. |
| ------------- | ----------------- | ---------------- | ----------- | -------------- |
[46] H. Yu, Y. Han, X. Zhang, B. Yin, B. Chang, X. Han, et al. “Thinking in 360◦: Humanoid Visual Search in
| the Wild”. | In: CVPR. 2026. |     |     |     |
| ---------- | --------------- | --- | --- | --- |
12

|     |     | S-Space: | Exploring |     | Spatial | Workspace | in  | Multimodal | Language Models |
| --- | --- | -------- | --------- | --- | ------- | --------- | --- | ---------- | --------------- |
Appendix
A RelatedWork
Evaluatingspatialreasoning. BenchmarksforevaluatingthespatialcapabilitiesofMLLMshavebecome
increasingly challenging and comprehensive. Early efforts focused primarily on single-image spatial un-
derstanding [28, 29], including relative position reasoning and object size estimation. Subsequent studies
extended evaluation to multi-view [14, 21] and video [5, 15, 33] settings, requiring models to integrate
observationsintocoherentspatialrepresentations. Thesespatialcapabilitieshavebeenincorporatedinto
embodiedtasksinvolvinggrounding[9,12]andactiveexploration[34,35]. Nevertheless,spatialreasoning
remainsafundamentalchallengeforMLLMs: visualspatialpuzzles[13,36]continuetorevealsubstantial
performancegapsrelativetohumans,motivatingdeeperdiagnosisandmechanisticinterpretationofthese
limitations.
Mechanisticinterpretability. Internal representation in LLMs are hypothesized to composed linearly [20,
22]. Sparse autoencoders (SAEs) learn dictionaries that recover interpretable features from model acti-
vations [23, 37, 38]. Moving from representation to computation, transcoders approximate MLP com-
putations with sparse features, enabling circuit tracing to identify interactions underlying intermediate
reasoningsteps[39,40]. Mostcloselyrelatedtoourwork,J-Space[24]introducestheJacobianlens,which
uses Jacobians to map intermediate activations into the output vocabulary, thereby verbalizing internal
representations. Applyingthislensacrosslayersrevealsinternalconceptsandintermediatecomputations.
S-SpaceextendsthisJacobian-basedperspectivetospatialrepresentationsinMLLMs,focusingoncontin-
uous spatial coordinates rather than discrete verbalizable concepts to investigate how models internally
| represent | and | reason | about | space. |     |     |     |     |     |
| --------- | --- | ------ | ----- | ------ | --- | --- | --- | --- | --- |
Interpretingspatialrepresentations. MLLMs bind spatial information from visual inputs to the textual
representations of object names, enabling both spatial readout and causal intervention [18]. Prior work
haveexaminedspatialbinding[41],thefunctionalroleofattention[42,43],andbiassuchasvertical-depth
coupling [19]. Much of this work focuses on synthetic settings and two-dimensional pairwise relations. S-
Spaceoperatesonreal-worldimagesandthree-dimensionalspatialcoordinates,providingasimple,unified
interface for spatial information readout, causal intervention, and tracking viewpoint transformation.
B TheoreticalInsightsofS-Space
We now formalize the intuition underlying our procedure for identifying S-Space.
Let𝒮⋆ denotethelatentthree-dimensionalspatialsubspacehypothesizedinSection2.1, whereu ,u ,u
x y z
are unit directions corresponding to the horizontal, vertical, and distance axes. Our procedure in Sec-
tion 2.2 produces estimated directions v ,v ,v . Below, we give sufficient conditions under which these
|           |            |     |         |                   | x   | y z    |         |             |     |
| --------- | ---------- | --- | ------- | ----------------- | --- | ------ | ------- | ----------- | --- |
| estimated | directions |     | recover | the corresponding |     | latent | spatial | directions. |     |
Following the linear representation hypothesis [18, 20], we assume that distinct types of semantic infor-
mation are linearly composed within hidden representations. Since object-token representations encode
bothspatialandnon-spatialinformation,recoveringspatialdirectionsrequiresseparatingtheirrespective
contributions. We introduce the following assumptions to characterize this structure.
Assumption 1 (Representation decomposition). At an object-token position t, the hidden state can be
| conceptually | decomposed |     | into | a spatial | component |                   | and two | non-spatial: |     |
| ------------ | ---------- | --- | ---- | --------- | --------- | ----------------- | ------- | ------------ | --- |
|              |            |     |      |           | h =h      | 𝒮⋆ +h non-spatial |         | +h context   | ,   |
|              |            |     |      |           | t         | t t               |         | t            |     |
(5)
|     |     |     |     | 𝒮⋆  | ∈𝒮⋆, | non-spatial |     | context | ∈(𝒮⋆)⊥.     |
| --- | --- | --- | --- | --- | ---- | ----------- | --- | ------- | ----------- |
|     |     |     |     | h   |      | h           | ,h  |         |             |
|     |     |     |     | t   |      | t           |     | t       |             |
| h𝒮⋆ |     |     |     |     |      |             |     |         | non-spatial |
Here, encodes the object’s viewer-centered spatial attributes; h captures its non-spatial
| t   |     |     |     |     |     |     |     |     | t   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
attributes, such as identity, appearance, and function; and hcontext captures information contributed by
t
| the question | semantics, |     | prompt | phrasing, |     | and broader | scene | context. |     |
| ------------ | ---------- | --- | ------ | --------- | --- | ----------- | ----- | -------- | --- |
Assumption 2 (Gradient decomposition). Denote d =∇ s , the gradient are analogously decom-
|     |     |     |     |     |     |     | p,t,g | ht  | p,g |
| --- | --- | --- | --- | --- | --- | --- | ----- | --- | --- |
13

|     |     | S-Space: | Exploring |     | Spatial | Workspace | in  | Multimodal | Language Models |     |
| --- | --- | -------- | --------- | --- | ------- | --------- | --- | ---------- | --------------- | --- |
posed into components associated with spatial, non-spatial, and contextual information:
|     |     |     |     |       |     | 𝒮⋆    | non-spatial | context |     |     |
| --- | --- | --- | --- | ----- | --- | ----- | ----------- | ------- | --- | --- |
|     |     |     |     | d     | =d  | +d    |             | +d      | .   | (6) |
|     |     |     |     | p,t,g |     | p,t,g | p,t,g       | p,t,g   |     |     |
Assumption 3 (Gradient behavior). For a relative spatial question along axis g, the spatial component
of the answer-contrast is aligned with the corresponding latent direction u and changes sign between the
g
| query and | reference: |            |             |       |             |           |       |                 |                |     |
| --------- | ---------- | ---------- | ----------- | ----- | ----------- | --------- | ----- | --------------- | -------------- | --- |
|           |            |            |             | 𝒮⋆    |             |           | 𝒮⋆    |                 |                |     |
|           |            |            |             | d     | =β          | p,g u g , | d     | =−β             | p,g u g ,      | (7) |
|           |            |            |             | p,q,g |             |           | p,r,g |                 |                |     |
| where 𝔼   | [β ]>0.    | Meanwhile: |             |       |             |           |       |                 |                |     |
| p         | p,g        |            |             |       |             |           |       |                 |                |     |
|           |            |            | non-spatial |       | non-spatial |           | 𝔼     | (cid:2) context | context(cid:3) |     |
|           |            |            | d           | =d    |             | =0,       |       | p d             | −d =0.         | (8) |
|           |            |            | p,q,g       |       | p,r,g       |           |       | p,q,g           | p,r,g          |     |
These conditions capture three intuitions. First, the spatial contributions have opposite signs for the
query and reference. Second, non-spatial object attributes do not affect the answer contrast. Third,
role-asymmetric contextual effects may vary across examples but cancel in expectation. Together, they
motivate antisymmetrizing the two object gradients and averaging across prompts and examples.
Property 1. Under Assumptions 1–3, role antisymmetrization recovers the latent spatial direction u in
g
expectation:
|     |     |     |     |     | 𝔼   | ]=𝔼   |     |       |     |     |
| --- | --- | --- | --- | --- | --- | ----- | --- | ----- | --- | --- |
|     |     |     |     |     |     | [a    | [β  | ]u .  |     | (9) |
|     |     |     |     |     |     | p p,g | p   | p,g g |     |     |
Consequently, the estimator in Eq. (2) satisfies v =u , up to the choice of orientation, and the recovered
|          |          |     |         |         |            | g       | g   |          |     |     |
| -------- | -------- | --- | ------- | ------- | ---------- | ------- | --- | -------- | --- | --- |
|          | 𝒮=span{v |     |         |         |            |         |     |          | 𝒮⋆. |     |
| subspace |          |     | ,v ,v } | matches | the latent | spatial |     | subspace |     |     |
|          |          |     | x y z   |         |            |         |     |          |     |     |
Proof. Substituting the gradient decomposition into Eq. (2) and applying Eq. (7), we obtain
|     |     |     |     | 1(cid:16) |       | (cid:17) | 1(cid:0) |             |                    |     |
| --- | --- | --- | --- | --------- | ----- | -------- | -------- | ----------- | ------------------ | --- |
|     |     |     |     |           | 𝒮⋆    | 𝒮⋆       |          | non-spatial | non-spatial(cid:1) |     |
|     |     |     | a   | = d       | −d    |          | + d      |             | −d                 |     |
|     |     |     | p,g | 2         | p,q,g | p,r,g    | 2        | p,q,g       | p,r,g              |     |
1(cid:0)
|     |     |     |     |     | context | context(cid:1) |     |     |     | (10) |
| --- | --- | --- | --- | --- | ------- | -------------- | --- | --- | --- | ---- |
|     |     |     |     | +   | d       | −d             |     |     |     |      |
|     |     |     |     | 2   | p,q,g   | p,r,g          |     |     |     |      |
1(cid:0)
|     |     |     |     | =β u | +   | d context | −d context(cid:1) | .   |     |     |
| --- | --- | --- | --- | ---- | --- | --------- | ----------------- | --- | --- | --- |
|     |     |     |     | p,g  | g   | p,q,g     | p,r,g             |     |     |     |
2
The non-spatial terms vanish. Taking expectations eliminates the remaining contextual difference, yield-
𝔼
| ing Eq. | (9). Since | p   | [β p,g ]>0, | normalization |     | recovers | u   | g . |     |     |
| ------- | ---------- | --- | ----------- | ------------- | --- | -------- | --- | --- | --- | --- |
C ImplementationDetailsandExtendedResults
C.1 IdentifyingS-Space
Modelsanddata. We evaluate Molmo2-ER, MolmoAct2-Pretrain, MolmoAct2 [25], Qwen3.5-4B, and
Qwen3.6-27B [3, 26]. MolmoAct2-Pretrain and MolmoAct2 are VLA models derived from Molmo2-ER
after successive stages of action training, allowing us to examine how spatial representations change
across these stages. Axis identification and layer selection use disjoint sets of 6,000 and 1,800 COCO-
2017 training images, with one object pair per image. For each of the six spatial relations (left, right,
above, below, far, and close), we use 1,000 examples to identify the axes and 300 examples to select the
layer. The supplementary code provides the image IDs and object pair records for both sets.
We obtain each object’s ground truth horizontal and vertical positions from the center of its annotated
bounding box, divided by the image width and height, respectively. For depth, we average the inverse
depth predicted by Depth Anything V2-Small [44] over pixels within each COCO instance mask. Larger
| values indicate |     | closer | objects. |     |     |     |     |     |     |     |
| --------------- | --- | ------ | -------- | --- | --- | --- | --- | --- | --- | --- |
We use the five templates below for each spatial axis. For each object pair, we
Identificationprompts.
filleverytemplatetwice,exchangingwhichobjectisnamedin{query}andwhichisnamedin{reference}.
We compute gradients with respect to the hidden state at the token that ends each object name in the
prompt.
14

|     | S-Space: | Exploring Spatial Workspace | in Multimodal | Language Models |
| --- | -------- | --------------------------- | ------------- | --------------- |
Horizontal:left/right
1. Is the {query} to the left or right of the {reference}? Answer with left or right.
2. Where is the {query} relative to the {reference}: left or right? Answer with left or right.
3. In the image, is the {query} to the left or right of the {reference}? Answer with left or right.
4. Which describes the position of the {query} relative to the {reference}: left or right? Answer
| with | left or right. |     |     |     |
| ---- | -------------- | --- | --- | --- |
5. Relative to the {reference}, is the {query} on the left or right? Answer with left or right.
Vertical:above/below
1. Is the {query} above or below the {reference}? Answer with above or below.
2. Where is the {query} relative to the {reference}: above or below? Answer with above or below.
3. In the image, is the {query} above or below the {reference}? Answer with above or below.
4. Which describes the position of the {query} relative to the {reference}: above or below? Answer
| with | above or below. |     |     |     |
| ---- | --------------- | --- | --- | --- |
5. Relative to the {reference}, is the {query} above or below? Answer with above or below.
Distance:far/close
1. Is the {query} farther from or closer to the camera than the {reference}? Answer with far or close.
2. Considering only depth, is the {query} farther from or closer to the camera than the {reference}?
| Answer | far or close. |     |     |     |
| ------ | ------------- | --- | --- | --- |
3. In the image, is the {query} farther from or closer to the camera than the {reference}? Answer with
| far or | close. |     |     |     |
| ------ | ------ | --- | --- | --- |
4. Choose far or close: is the {query} farther from or closer to the camera than the {reference}?
| Answer | with far or | close. |     |     |
| ------ | ----------- | ------ | --- | --- |
5. Is the {query} farther from the camera than the {reference}, or closer? Answer far or close.
Layerselection. We evaluate validation accuracy for each layer on the 1,800 relative spatial question
examples constructed from COCO. For each example, we average S-Space coordinate differences across
the five prompt templates for spatial judgments. We select the layer with the highest overall accuracy
across the three axes. Table 3 lists the selected layers, indexed from zero after each transformer block.
| We use these | layers unless | specified otherwise. |     |     |
| ------------ | ------------- | -------------------- | --- | --- |
We report S-Space accuracy at every evaluated layer on the COCO selection set in Table 2.
15

|     | S-Space: Exploring | Spatial Workspace | in Multimodal | Language Models |     |
| --- | ------------------ | ----------------- | ------------- | --------------- | --- |
MolmoAct2
| Molmo2-ER | Pretrain | MolmoAct2 | Qwen3.5-4B | Qwen3.6-27B |     |
| --------- | -------- | --------- | ---------- | ----------- | --- |
Layer Acc. Layer Acc. Layer Acc. Layer Acc. Layers0–31 Layers32–62
|     |                |          |          | Layer Acc. | Layer Acc. |
| --- | -------------- | -------- | -------- | ---------- | ---------- |
| 0   | 55.17 0 57.67  | 0 56.28  | 0 52.61  | 0 58.22    | 32 88.50   |
| 1   | 55.44 1 58.72  | 1 58.56  | 1 52.50  | 1 57.11    | 33 87.28   |
| 2   | 56.72 2 59.33  | 2 57.94  | 2 54.50  | 2 57.67    | 34 87.00   |
| 3   | 57.11 3 59.83  | 3 58.06  | 3 56.33  | 3 56.50    | 35 90.78   |
| 4   | 57.33 4 59.50  | 4 59.50  | 4 56.89  | 4 56.89    | 36 90.22   |
| 5   | 55.89 5 60.94  | 5 60.17  | 5 56.33  | 5 57.44    | 37 90.22   |
| 6   | 57.56 6 61.39  | 6 61.00  | 6 60.17  | 6 57.67    | 38 89.50   |
| 7   | 58.06 7 62.17  | 7 60.22  | 7 77.28  | 7 57.94    | 39 90.06   |
| 8   | 58.11 8 62.33  | 8 60.39  | 8 70.72  | 8 59.28    | 40 89.78   |
| 9   | 65.56 9 66.33  | 9 66.78  | 9 65.67  | 9 59.44    | 41 87.83   |
| 10  | 64.11 10 67.89 | 10 67.00 | 10 74.61 | 10 59.89   | 42 90.28   |
| 11  | 67.33 11 69.83 | 11 68.94 | 11 87.94 | 11 60.28   | 43 91.78   |
| 12  | 66.72 12 68.39 | 12 68.83 | 12 81.94 | 12 60.11   | 44 90.72   |
| 13  | 80.44 13 82.28 | 13 81.83 | 13 78.39 | 13 59.28   | 45 90.22   |
| 14  | 77.78 14 80.44 | 14 77.83 | 14 80.39 | 14 58.61   | 46 90.28   |
| 15  | 82.83 15 86.22 | 15 84.00 | 15 88.83 | 15 64.67   | 47 88.28   |
| 16  | 87.00 16 87.83 | 16 88.11 | 16 85.11 | 16 64.78   | 48 88.06   |
| 17  | 89.67 17 88.72 | 17 88.67 | 17 82.67 | 17 68.56   | 49 85.06   |
| 18  | 92.28 18 92.22 | 18 91.89 | 18 80.28 | 18 67.50   | 50 87.17   |
| 19  | 92.50 19 92.00 | 19 92.17 | 19 78.28 | 19 69.50   | 51 73.39   |
| 20  | 90.67 20 91.61 | 20 91.94 | 20 45.61 | 20 68.78   | 52 52.94   |
| 21  | 92.28 21 91.94 | 21 91.39 | 21 44.56 | 21 68.39   | 53 52.50   |
| 22  | 93.39 22 90.72 | 22 89.39 | 22 45.67 | 22 67.22   | 54 48.56   |
| 23  | 77.00 23 67.22 | 23 64.44 | 23 50.72 | 23 69.17   | 55 47.17   |
| 24  | 68.11 24 61.17 | 24 56.89 | 24 51.61 | 24 69.22   | 56 47.67   |
| 25  | 70.78 25 65.00 | 25 61.89 | 25 50.67 | 25 68.22   | 57 46.44   |
| 26  | 32.17 26 35.06 | 26 33.22 | 26 49.83 | 26 74.22   | 58 47.72   |
| 27  | 40.50 27 41.50 | 27 39.83 | 27 51.28 | 27 86.72   | 59 44.78   |
| 28  | 46.89 28 52.44 | 28 51.89 | 28 49.50 | 28 84.11   | 60 45.56   |
| 29  | 48.83 29 53.72 | 29 54.61 | 29 49.72 | 29 81.17   | 61 46.06   |
| 30  | 47.17 30 51.72 | 30 53.11 | 30 50.50 | 30 79.72   | 62 44.89   |
| 31  | 48.44 31 52.56 | 31 53.72 |          | 31 89.50   |            |
| 32  | 51.17 32 53.22 | 32 53.56 |          |            |            |
| 33  | 54.00 33 53.33 | 33 55.39 |          |            |            |
| 34  | 54.94 34 51.67 | 34 50.28 |          |            |            |
Table2 Layer sweeping accuracy on the COCO validation set. Layer indices start at zero. Darker
purple indicates higher accuracy, and bold marks the selected layer. Qwen3.6-27B is split into two consecutive
layer ranges.
Coordinatesandcorrelations. For the correlations in Figure 3a and 3b, each object’s horizontal and
vertical ground truth coordinates come from the center of its annotated bounding box. For centering,
we linearly map each normalized horizontal and vertical coordinate from [0,1] to [−1,1], and center
the depth coordinate by subtracting its median. Each axis has 2,116 held-out COCO pairs. Absolute
position correlations use the query and reference coordinates from every pair, giving 4,232 readouts.
Relative position correlations use the 2,116 differences between query and reference coordinates.
C.2 ReadingoutS-SpaceforSpatialQA
We evaluate all five models at their selected layers using the same questions from each benchmark. For
CV-Bench [28], we use all 1,250 questions in the “Relation” and “Depth” categories. Relation questions
compare the horizontal or vertical positions of two objects. Depth questions ask which of two objects is
closer to the camera.
For EmbSpatial [29], we construct a subset of 1,200 questions from the evaluation data released by Min
etal.[19]. Weuseafixedrandomseedtoselect200questionsforeachofsixdirections(left,right,above,
below, far, and close). For SpatialTunnel [19], we use all 1,200 questions in the evaluation file, which
contains200questionsforeachofthesamesixdirections. Overallaccuracyisthepercentageofcorrectly
| answered questions | in each benchmark. |     |     |     |     |
| ------------------ | ------------------ | --- | --- | --- | --- |
16

|     |     | S-Space: | Exploring | Spatial |     | Workspace | in Multimodal |     | Language | Models |     |     |     |
| --- | --- | -------- | --------- | ------- | --- | --------- | ------------- | --- | -------- | ------ | --- | --- | --- |
Results. We compare direct generation and S-Space readouts for all five models on CV-Bench, Emb-
Spatial, and SpatialTunnel. Overall accuracy is reported in Table 3, followed by results for each spatial
| direction          | in Tables | 4, 5, | and 6. |        |          |         |     |            |         |       |        |               |         |
| ------------------ | --------- | ----- | ------ | ------ | -------- | ------- | --- | ---------- | ------- | ----- | ------ | ------------- | ------- |
|                    |           |       |        |        | CV-Bench |         |     | EmbSpatial |         |       |        | SpatialTunnel |         |
| Model              |           |       | Layer  | Direct |          | S-Space |     | Direct     | S-Space |       | Direct |               | S-Space |
| Molmo2-ER          |           |       | 22     | 94.40  |          | 91.92   |     | 90.42      |         | 86.92 | 97.83  |               | 96.50   |
| MolmoAct2-Pretrain |           |       | 18     | 92.32  |          | 91.76   |     | 85.33      |         | 90.67 | 89.50  |               | 91.25   |
| MolmoAct2          |           |       | 19     | 91.76  |          | 91.44   |     | 88.58      |         | 89.92 | 89.00  |               | 92.75   |
| Qwen3.5-4B         |           |       | 15     | 73.60  |          | 89.36   |     | 78.50      |         | 86.42 | 86.33  |               | 90.08   |
| Qwen3.6-27B        |           |       | 43     | 93.76  |          | 91.84   |     | 91.33      |         | 89.00 | 96.83  |               | 92.92   |
Table3 SpatialQAaccuracy(%). Directgeneratesanswers,andS-Spacecomparesobjectcoordinates. Each
| model uses | its layer | selected | on COCO. | Bold    | marks | the   | better | method. |       |       |     |       |       |
| ---------- | --------- | -------- | -------- | ------- | ----- | ----- | ------ | ------- | ----- | ----- | --- | ----- | ----- |
| Model      |           |          | Method   | Overall |       | Left  | Right  |         | Above | Below |     | Far   | Close |
| Molmo2-ER  |           |          | Direct   | 94.40   |       | 89.07 | 97.00  |         | 94.44 | 95.93 |     | 96.33 | 93.33 |
|            |           |          | S-Space  |         | 91.92 | 89.62 | 91.50  |         | 94.44 | 95.93 |     | 90.33 | 92.33 |
MolmoAct2-Pretrain Direct 92.32 92.35 96.50 93.06 99.19 99.67 79.00
|             |     |     | S-Space |       | 91.76 | 88.52 | 92.00 |     | 90.97 | 94.31 |     | 92.67  | 92.00 |
| ----------- | --- | --- | ------- | ----- | ----- | ----- | ----- | --- | ----- | ----- | --- | ------ | ----- |
| MolmoAct2   |     |     | Direct  | 91.76 |       | 94.54 | 95.00 |     | 95.14 | 96.75 |     | 100.00 | 76.00 |
|             |     |     | S-Space |       | 91.44 | 90.71 | 90.00 |     | 90.28 | 91.06 |     | 91.33  | 93.67 |
| Qwen3.5-4B  |     |     | Direct  |       | 73.60 | 99.45 | 84.50 |     | 97.92 | 56.10 |     | 99.67  | 20.00 |
|             |     |     | S-Space | 89.36 |       | 89.62 | 89.00 |     | 94.44 | 81.30 |     | 85.67  | 94.00 |
| Qwen3.6-27B |     |     | Direct  | 93.76 |       | 98.36 | 92.50 |     | 97.92 | 92.68 |     | 93.00  | 91.00 |
|             |     |     | S-Space |       | 91.84 | 90.16 | 91.50 |     | 95.14 | 95.93 |     | 84.33  | 97.33 |
Table4 CV-Bench accuracy splitted by answer direction. S-Space uses the selected layer. Bold marks
| the better | method | within | each model | and     | column, | including | ties. |     |       |       |       |       |       |
| ---------- | ------ | ------ | ---------- | ------- | ------- | --------- | ----- | --- | ----- | ----- | ----- | ----- | ----- |
| Model      |        |        | Method     | Overall |         | Left      | Right |     | Above | Below |       | Far   | Close |
| Molmo2-ER  |        |        | Direct     | 90.42   |         | 92.50     | 95.50 |     | 97.50 | 97.50 |       | 88.50 | 71.00 |
|            |        |        | S-Space    |         | 86.92   | 92.50     | 88.50 |     | 97.50 |       | 96.00 | 73.00 | 74.00 |
MolmoAct2-Pretrain Direct 85.33 92.50 94.00 98.00 98.50 87.50 41.50
|             |     |     | S-Space | 90.67 |       | 95.50 | 92.50 |     | 98.50 |       | 97.00 | 79.50 | 81.00 |
| ----------- | --- | --- | ------- | ----- | ----- | ----- | ----- | --- | ----- | ----- | ----- | ----- | ----- |
| MolmoAct2   |     |     | Direct  |       | 88.58 | 95.50 | 94.00 |     | 97.00 | 99.00 |       | 93.50 | 52.50 |
|             |     |     | S-Space | 89.92 |       | 92.50 | 90.00 |     | 98.50 |       | 96.50 | 78.00 | 84.00 |
| Qwen3.5-4B  |     |     | Direct  |       | 78.50 | 99.00 | 84.50 |     | 99.50 |       | 68.50 | 99.00 | 20.50 |
|             |     |     | S-Space | 86.42 |       | 90.50 | 94.00 |     | 98.50 | 98.00 |       | 47.50 | 90.00 |
| Qwen3.6-27B |     |     | Direct  | 91.33 |       | 96.50 | 93.00 |     | 97.50 |       | 96.00 | 87.00 | 78.00 |
|             |     |     | S-Space |       | 89.00 | 93.50 | 93.50 |     | 99.00 | 97.50 |       | 59.50 | 91.00 |
Table5 EmbSpatial accuracy splitted by answer direction. S-Space uses the selected layer. Bold marks
| the better | method | within | each model | and | column, | including | ties. |     |     |     |     |     |     |
| ---------- | ------ | ------ | ---------- | --- | ------- | --------- | ----- | --- | --- | --- | --- | --- | --- |
17

|       |     | S-Space: |        | Exploring | Spatial | Workspace | in Multimodal |     | Language | Models |     |       |
| ----- | --- | -------- | ------ | --------- | ------- | --------- | ------------- | --- | -------- | ------ | --- | ----- |
| Model |     |          | Method |           | Overall | Left      | Right         |     | Above    | Below  | Far | Close |
Molmo2-ER Direct 97.83 99.00 100.00 100.00 98.50 100.00 89.50
|     |     |     | S-Space |     | 96.50 | 99.50 |     | 99.00 | 99.50 | 100.00 | 85.50 | 95.50 |
| --- | --- | --- | ------- | --- | ----- | ----- | --- | ----- | ----- | ------ | ----- | ----- |
MolmoAct2-Pretrain Direct 89.50 100.00 100.00 100.00 99.00 100.00 38.00
|     |     |     | S-Space |     | 91.25 | 99.50 |     | 99.50 | 97.00 | 100.00 | 72.00 | 79.50 |
| --- | --- | --- | ------- | --- | ----- | ----- | --- | ----- | ----- | ------ | ----- | ----- |
MolmoAct2 Direct 89.00 100.00 100.00 100.00 99.00 100.00 35.00
|     |     |     | S-Space |     | 92.75 | 99.50 |     | 99.00 | 96.50 | 100.00 | 75.50 | 86.00 |
| --- | --- | --- | ------- | --- | ----- | ----- | --- | ----- | ----- | ------ | ----- | ----- |
Qwen3.5-4B Direct 86.33 100.00 95.50 100.00 94.50 100.00 28.00
|     |     |     | S-Space |     | 90.08 | 100.00 | 100.00 |     | 100.00 | 100.00 | 41.00 | 99.50 |
| --- | --- | --- | ------- | --- | ----- | ------ | ------ | --- | ------ | ------ | ----- | ----- |
Qwen3.6-27B Direct 96.83 100.00 100.00 100.00 100.00 94.50 86.50
|     |     |     | S-Space |     | 92.92 | 100.00 |     | 99.50 | 100.00 | 100.00 | 80.00 | 78.00 |
| --- | --- | --- | ------- | --- | ----- | ------ | --- | ----- | ------ | ------ | ----- | ----- |
Table6 SpatialTunnel accuracy splitted by answer direction. S-Space uses the selected layer. Bold
| marks the | better | method | within | each | model | and column, | including | ties. |     |     |     |     |
| --------- | ------ | ------ | ------ | ---- | ----- | ----------- | --------- | ----- | --- | --- | --- | --- |
C.3 CausalInterventions
Editinghiddenstates. We edit an object’s hidden state to change its S-Space coordinates. Let h denote
this hidden state and V = [v x ,v y ,v z ] contain the spatial readout directions. To change the coordinates
| from c=V⊤h |     | to c′, | we apply |     |           |     |                |     |     |     |     |      |
| ---------- | --- | ------ | -------- | --- | --------- | --- | -------------- | --- | --- | --- | --- | ---- |
|            |     |        |          | B   | =V(V⊤V)−1 | ,   | h′ =h+B(c′−c). |     |     |     |     | (11) |
This update gives V⊤h′ = c′ when the three axes are linearly independent. It preserves the component
| of the hidden | state | orthogonal |     | to  | S-Space. |     |     |     |     |     |     |     |
| ------------- | ----- | ---------- | --- | --- | -------- | --- | --- | --- | --- | --- | --- | --- |
Let c and c denote the query and reference coordinates on the edited axis, and h ,h ∈ℝd their
| Edits. | q       | r            |        |             |        |            |      |       |          |       | q r |     |
| ------ | ------- | ------------ | ------ | ----------- | ------ | ---------- | ---- | ----- | -------- | ----- | --- | --- |
| hidden | states. | We implement |        | four        | edits: |            |      |       |          |       |     |     |
|        |         |              | Shift  | one object: |        | c′ =c +β,  | c′   | =c    | ,        |       |     |     |
|        |         |              |        |             |        | q q        |      | r r   |          |       |     |     |
|        |         | Shift        | both   | objects:    |        | c′ =c +β,  | c′   | =c    | +β,      |       |     |     |
|        |         |              |        |             |        | q q        |      | r r   |          |       |     |     |
|        |         |              |        |             | Swap:  | c′ =c +α(c | −c   | ), c′ | =c −α(c  | −c ), |     |     |
|        |         |              |        |             |        | q q        | r    | q     | r r      | r q   |     |     |
|        |         |              |        |             |        | h′         |      | h′    |          |       |     |     |
|        |         |              | Random |             | edit:  | =h q +αm   | q u, |       | =h r −αm | r u.  |     |     |
|        |         |              |        |             |        | q          |      | r     |          |       |     |     |
Here, β is a signed offset. Shifting both objects preserves their coordinate difference c −c . For swaps,
|     |     |     |     |     |     |     |     |     |     |     | q r |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
α = 0 leaves the coordinates unchanged, α = 1 exchanges them, and larger values move them farther
apartinthereversedorder. Wenotethatamplifiedinterventionisacommonpracticeinrelatedliterature
of mechanistic analysis [18, 24]. The shifts and swaps keep the other two coordinates fixed.
For random edits, m ,m are the norms of the query and reference swap updates at α=1. We multiply
|             |     |      | q r     |        |      |              |     |          |     |     |     |     |
| ----------- | --- | ---- | ------- | ------ | ---- | ------------ | --- | -------- | --- | --- | --- | --- |
| these norms | by  | α to | set the | random | edit | magnitudes:  |     |          |     |     |     |     |
|             |     |      |         | m      | =∥h  | swap (α=1)−h | ∥2, | t∈{q,r}, |     |     |     |     |
|             |     |      |         |        | t    | t            | t   |          |     |     |     |     |
g
|     |     |     |     | u=  |     | , g∼𝒩(0,I). |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | ----------- | --- | --- | --- | --- | --- | --- |
∥g∥2
swap
Here, h (α = 1) denotes the hidden state after a swap with α = 1. The query and reference receive
t
opposite directions, each with the same norm as the corresponding swap update at strength α. For each
| example, | we keep | u   | fixed across |     | edit strengths. |     |     |     |     |     |     |     |
| -------- | ------- | --- | ------------ | --- | --------------- | --- | --- | --- | --- | --- | --- | --- |
Questions. Weaskaboutabsoluteposition,relativeposition,orobjectcolorusingthefollowingprompts.
| The position | questions |     | below | showcase |     | the horizontal | axis. |     |     |     |     |     |
| ------------ | --------- | --- | ----- | -------- | --- | -------------- | ----- | --- | --- | --- | --- | --- |
1.Absoluteposition
Is the {query} to the left or right of the image center? Answer with only one word.
18

|     |     | S-Space: | Exploring |     | Spatial Workspace |     | in Multimodal | Language | Models |     |     |
| --- | --- | -------- | --------- | --- | ----------------- | --- | ------------- | -------- | ------ | --- | --- |
2.Relativeposition
Is the {query} to the left or right of the {reference}? Answer with only one word.
3.Objectcolor
| What color | is  | the {query}? | Answer | with | only one | word. |     |     |     |     |     |
| ---------- | --- | ------------ | ------ | ---- | -------- | ----- | --- | --- | --- | --- | --- |
Mainresults. We use Molmo2-ER for all interventions. Figure 4 uses 800 EmbSpatial examples at L17.
In Figure 4, swaps and random edits use α = 0,1,...,6, and shifts use β = 0,±5,...,±30. Table 7
| reports    | the answer | retention | values   | plotted | in Figure | 4.                                |       |     |             |       |       |
| ---------- | ---------- | --------- | -------- | ------- | --------- | --------------------------------- | ----- | --- | ----------- | ----- | ----- |
| Editmethod |            | Question  |          |         |           | Editingscaleandanswerretention(%) |       |     |             |       |       |
|            |            |           |          |         | β =0      | ±5                                | ±10   |     | ±15 ±20     | ±25   | ±30   |
|            |            | Absolute  | position |         |           |                                   |       |     |             |       |       |
|            |            |           |          |         | 100.00    | 95.15                             | 89.23 |     | 80.62 68.37 | 52.49 | 41.05 |
Shift one object
|     |     |     |     |     | β =0 | ±5  | ±10 |     | ±15 ±20 | ±25 | ±30 |
| --- | --- | --- | --- | --- | ---- | --- | --- | --- | ------- | --- | --- |
Color
|            |         |           |          |         | 100.00       | 97.00  | 93.50   |     | 89.88 86.38 | 82.50 | 78.13 |
| ---------- | ------- | --------- | -------- | ------- | ------------ | ------ | ------- | --- | ----------- | ----- | ----- |
|            |         |           |          |         | β =0         | ±5     | ±10     |     | ±15 ±20     | ±25   | ±30   |
| Shift both | objects | Relative  | position |         |              |        |         |     |             |       |       |
|            |         |           |          |         | 100.00       | 97.67  | 94.32   |     | 88.50 83.98 | 81.91 | 80.36 |
|            |         |           |          |         | α=0          |        | 1 2     |     | 3 4         | 5     | 6     |
| Swap       |         | Relative  | position |         |              |        |         |     |             |       |       |
|            |         |           |          |         | 100.00       | 98.71  | 85.66   |     | 59.82 51.16 | 45.87 | 43.93 |
|            |         |           |          |         | α=0          |        | 1 2     |     | 3 4         | 5     | 6     |
| Random     | edit    | Relative  | position |         |              |        |         |     |             |       |       |
|            |         |           |          |         | 100.00       | 100.00 | 99.91   |     | 99.91 99.87 | 99.83 | 99.83 |
| Table7     | Answer  | retention | under    | S-Space | intervention |        | (Figure | 4). |             |       |       |
Layersweep. Theinterventionsat L17 showthat editing S-Space changes spatialjudgments. Werepeat
these interventions across layers to examine where this causal effect appears.
We use Molmo2-ER at L13–L20, with 80 examples per task at each layer. For Table 8, we apply the
Swap andShift both objects editsandaskRelative position questions. ForTable9,weapplytheShift one
object edit along the horizontal axis and ask Absolute position and Object color questions.
Layer Swap(α=5) Shiftbothobject(β =−30) Shiftbothobject(β =+30)
|     | 13  | 73.75 |     |     | 85.00 |     |     |     | 81.25 |     |     |
| --- | --- | ----- | --- | --- | ----- | --- | --- | --- | ----- | --- | --- |
|     | 14  | 85.00 |     |     | 81.25 |     |     |     | 83.75 |     |     |
|     | 15  | 50.00 |     |     | 75.00 |     |     |     | 80.00 |     |     |
|     | 16  | 60.00 |     |     | 92.50 |     |     |     | 93.75 |     |     |
|     | 17  | 62.50 |     |     | 93.75 |     |     |     | 93.75 |     |     |
|     | 18  | 43.75 |     |     | 96.25 |     |     |     | 91.25 |     |     |
|     | 19  | 85.00 |     |     | 96.25 |     |     |     | 95.00 |     |     |
|     | 20  | 72.50 |     |     | 96.25 |     |     |     | 92.50 |     |     |
Table8 Layer-sweeping results for relative position interventions. Number refers to the accuracy (%)
of relative position questions under corresponding interventions on 80 examples per layer. Unedited accuracy is
97.50%.
19

|     | S-Space: | Exploring | Spatial          | Workspace | in  | Multimodal | Language Models |
| --- | -------- | --------- | ---------------- | --------- | --- | ---------- | --------------- |
|     |          |           | Absoluteposition |           |     |            | Color           |
|     |          | Layer     | |β|=10           | |β|=30    |     | |β|=50     | |β|=30          |
|     |          | 13        | 1.25             | 30.00     |     | 76.25      | 11.25           |
|     |          | 14        | 5.00             | 47.50     |     | 83.75      | 12.50           |
|     |          | 15        | 11.25            | 75.00     |     | 93.75      | 17.50           |
|     |          | 16        | 11.25            | 57.50     |     | 73.75      | 13.75           |
|     |          | 17        | 10.00            | 52.50     |     | 55.00      | 11.25           |
|     |          | 18        | 5.00             | 35.00     |     | 43.75      | 13.75           |
|     |          | 19        | 2.50             | 8.75      |     | 6.25       | 8.75            |
|     |          | 20        | 2.50             | 12.50     |     | 11.25      | 2.50            |
Table9 Layer-sweeping results for absolute position and color interventions. Number refers to the
ratio (%) of samples for which the answer changes under either a +β or a −β intervention at the corresponding
layer.
C.4 CaseStudies
Unseenentitiesandtheobserver. WepresentadditionalexamplesofS-Spacereadoutsforunseenentities
| and the | observer in Figure | 11. |     |     |     |     |     |
| ------- | ------------------ | --- | --- | --- | --- | --- | --- |
Politicalsemantics. The political semantic results in Figure 12 include MolmoAct2-Pretrain and Mol-
moAct2 alongside the three models in Figure 7, with the readouts standardized. All five models preserve
| the ordering | of socialist, | moderate, | and conservative. |     |     |     |     |
| ------------ | ------------- | --------- | ----------------- | --- | --- | --- | --- |
Cardinaldirectionreadouts. We select 191 of the 1,000 MMSI-Bench questions [21] by matching the
correct option text to one of eight cardinal directions. The supplementary code includes the selected
| question | IDs. We give | Qwen3.6-27B | the following | instruction. |     |     |     |
| -------- | ------------ | ----------- | ------------- | ------------ | --- | --- | --- |
Cardinaldirectionreadouts
Give a concise step-by-step spatial explanation in at most five steps. End exactly with ’Answer: X’,
| where X | is the option | letter. |     |     |     |     |     |
| ------- | ------------- | ------- | --- | --- | --- | --- | --- |
Wereplayeachgeneratedtokensequencewiththeoriginalimagesandprompttoextracthiddenstatesat
L43. For each occurrence of a direction word, we average the hidden states of its subtokens and project
the result onto the horizontal and vertical axes identified on COCO. Compound directions written as
one word, with a hyphen, or with a space are assigned to the same category and counted as a single
occurrence.
Figure 10b presents 1,311 occurrences from both correct and incorrect responses. For each direction, we
first average its occurrences within each question, then average the results across questions with equal
weight.
20

|     | S-Space: | Exploring Spatial | Workspace | in Multimodal | Language Models |
| --- | -------- | ----------------- | --------- | ------------- | --------------- |
With 'past,' 'you' has a lower proximity readout than the robot.
With 'toward,' 'you' has a higher proximity readout than the robot.
Figure11 S-Spacebeyondvisibleobjects. Images,prompts,andhorizontalordistancereadoutsforanunseen
ball, owner, train, the observer, and a robot moving past or toward. Readouts use Molmo2-ER L17. Means and
| 95% bootstrap | intervals | are computed across | prompt templates. |     |     |
| ------------- | --------- | ------------------- | ----------------- | --- | --- |
21

|     | S-Space: | Exploring |     | Spatial Workspace |     | in Multimodal | Language | Models |     |     |
| --- | -------- | --------- | --- | ----------------- | --- | ------------- | -------- | ------ | --- | --- |
Molmo2-ER (L21)
|     |     |     |     |     |     |     |     | −1.410 | +0.615+0.796 |     |
| --- | --- | --- | --- | --- | --- | --- | --- | ------ | ------------ | --- |
MolmoAct2-Pretrain (L18)
|     |     |     |     |     |     |     |     | −1.115 | −0.196 | +1.311 |
| --- | --- | --- | --- | --- | --- | --- | --- | ------ | ------ | ------ |
Q:During the debate, a
| {identity}speaker responded |                       |     |     |     |     | MolmoAct2 (L19)  |     |               |        |        |
| --------------------------- | --------------------- | --- | --- | --- | --- | ---------------- | --- | ------------- | ------ | ------ |
| to a moderator member.      |                       |     |     |     |     |                  |     | −0.963 −0.415 |        | +1.378 |
| socialist                   | moderate conservative |     |     |     |     | Qwen3.5-4B (L15) |     |               |        |        |
|                             |                       |     |     |     |     |                  |     | −1.183        | −0.079 | +1.262 |
Qwen3.6-27B (L43)
|     |     |     |     |     |     |     |      | −1.082 | −0.248 | +1.330   |
| --- | --- | --- | --- | --- | --- | --- | ---- | ------ | ------ | -------- |
|     |     |     |     |     |     |     | left | −1     | 0      | +1 right |
Standardized horizontal coordinate
Figure12 Political semantics in S-Space. Standardized horizontal readouts across five models.
C.5 Perspective-TakingSpatialReasoning
Dataandgeneration. We use the official SpinBench split consisting of 146 questions without a premise
and 144 with a premise. Each question provides one image and asks which object would appear on the
left or closer to the observer when viewed from the left, right, or back. Direct generation uses greedy
decodingwithalimitof128tokens. TheQwenReasoningbaselinesusechain-of-thoughtgenerationwith
a limit of 32,768 tokens. S-Space + Rotation uses the layers selected on COCO in Table 3. All methods
| use the same | examples | and object | order. |     |     |     |     |     |     |     |
| ------------ | -------- | ---------- | ------ | --- | --- | --- | --- | --- | --- | --- |
Viewpointcomputation. For objects A and B in the benchmark options, we compute the coordinate
| difference | along axis | g in the | original | view as |       |       |     |     |     |     |
| ---------- | ---------- | -------- | -------- | ------- | ----- | ----- | --- | --- | --- | --- |
|            |            |          |          | m       | =v⊤(h | −h ). |     |     |     |     |
|            |            |          |          | g       | g A   | B     |     |     |     |     |
With x increasing to the right and z increasing toward the camera, we transform the coordinates using
|     | Rleft(x,z)=(z,−x), |     |     | Rright(x,z)=(−z,x), |     |     | Rback(x,z)=(−x,−z). |     |     |     |
| --- | ------------------ | --- | --- | ------------------- | --- | --- | ------------------- | --- | --- | --- |
|     |                    |     | x′  |                     |     |     |                     |     |     | z′  |
After rotation, we select A if < 0 when the question asks which object appears on the left, or > 0
when it asks which object is closer to the observer. We select B otherwise. The implementation applies
| the following | matrices. |     |     |     |     |     |     |     |     |     |
| ------------- | --------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Viewpointtransformation
| VIEW_ROTATIONS | = {              |       |          |             |              |       |     |     |     |     |
| -------------- | ---------------- | ----- | -------- | ----------- | ------------ | ----- | --- | --- | --- | --- |
| "front":       | np.array([[      | 1, 0, | 0], [0,  | 1, 0], [    | 0, 0,        | 1]]), |     |     |     |     |
| "left"         | : np.array([[    | 0, 0, | 1], [0,  | 1, 0], [-1, | 0,           | 0]]), |     |     |     |     |
| "right":       | np.array([[      | 0, 0, | -1], [0, | 1, 0], [    | 1, 0,        | 0]]), |     |     |     |     |
| "back"         | : np.array([[-1, | 0,    | 0], [0,  | 1, 0], [    | 0, 0, -1]]), |       |     |     |     |     |
}
| source_hvd | = np.array([x,                | y,  | z]) # | right, below, | close |     |     |     |     |     |
| ---------- | ----------------------------- | --- | ----- | ------------- | ----- | --- | --- | --- | --- | --- |
| target_hvd | = VIEW_ROTATIONS[target_view] |     |       | @ source_hvd  |       |     |     |     |     |     |
ControlledCoT. For Figure 9, we supply the following reasoning sequence: the relation in the original
view, the target viewpoint, and the relation after rotation. We fill in both relations using the benchmark
labels.
ControlledCoT
The user wants me to determine {TARGET_QUESTION} if the scene were viewed from the {TARGET_VIEW}.
| 1. **Analyze | the current | view:**        |     |                       |     |                  |     |     |     |     |
| ------------ | ----------- | -------------- | --- | --------------------- | --- | ---------------- | --- | --- | --- | --- |
| * In the     | front view, | the {QUERY}    | is  | {FRONT_VIEW_RELATION} |     | the {REFERENCE}. |     |     |     |     |
| 2. **Imagine | the new     | perspective:** |     |                       |     |                  |     |     |     |     |
* I now imagine viewing the {QUERY} and the {REFERENCE} from the {TARGET_VIEW}.
3. **Conclusion:**
22

|     |     | S-Space: |     | Exploring | Spatial | Workspace |     | in Multimodal |     | Language | Models |     |
| --- | --- | -------- | --- | --------- | ------- | --------- | --- | ------------- | --- | -------- | ------ | --- |
* From this perspective, the {QUERY} is {ROTATED_VIEW_RELATION} the {REFERENCE}.
Mainresults. SpinBench results for all five models are reported in Table 10. The comparison covers
Direct, Reasoning, and S-Space + Rotation, with and without spatial premises.
|                    |     |     |        | Withoutpremise(n=146) |           |     |           |     |        | Withpremise(n=144) |           |           |
| ------------------ | --- | --- | ------ | --------------------- | --------- | --- | --------- | --- | ------ | ------------------ | --------- | --------- |
|                    |     |     |        |                       |           |     | S-Space   |     |        |                    |           | S-Space   |
| Model              |     |     | Direct |                       | Reasoning |     | +Rotation |     | Direct |                    | Reasoning | +Rotation |
| Molmo2-ER          |     |     | 60.96  |                       | –         |     | 94.52     |     | 61.81  |                    | –         | 99.31     |
| MolmoAct2-Pretrain |     |     | 66.44  |                       | –         |     | 96.58     |     | 56.25  |                    | –         | 99.31     |
| MolmoAct2          |     |     | 71.23  |                       | –         |     | 95.89     |     | 64.58  |                    | –         | 99.31     |
| Qwen3.5-4B         |     |     | 60.96  |                       | 62.33     |     | 91.10     |     | 60.42  |                    | 72.22     | 97.92     |
| Qwen3.6-27B        |     |     | 60.96  |                       | 83.56     |     | 95.21     |     | 72.92  |                    | 91.67     | 99.31     |
Table10 SpinBench accuracy across all five models. Direct generates an answer without intermediate
reasoning. Reasoning uses chain-of-thought. S-Space + Rotation applies the requested viewpoint rotation to the
readout coordinates. A premise supplies the correct spatial relation in the original view. Dashes indicate no
| reasoning | mode. | Bold | marks | the best | method. |     |     |     |     |     |     |     |
| --------- | ----- | ---- | ----- | -------- | ------- | --- | --- | --- | --- | --- | --- | --- |
S-Spacewithadditionalevidence. For Molmo2-ER, we further compare S-Space accuracy across layers
withandwithoutspatialpremises. AsshowninFigure13,withthepremiseincluded,thecoordinatesread
from S-Space become more accurate, allowing the readout-and-rotation pipeline to answer perspective-
| taking questions |     | more | reliably. |     |     |     |     |     |     |     |     |     |
| ---------------- | --- | ---- | --------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
a a a a a a What the Premise Adds What the Premise Adds What the Premise Adds What the Premise Adds What the Premise Adds What the Premise Adds b b b b b b S-Space Readout Accuracy S-Space Readout Accuracy S-Space Readout Accuracy S-Space Readout Accuracy S-Space Readout Accuracy S-Space Readout Accuracy Without premise Without premise Without premise Without premise Without premise Without premise With premise With premise With premise With premise With premise With premise c c c c c c With Minus Without Premise With Minus Without Premise With Minus Without Premise With Minus Without Premise With Minus Without Premise With Minus Without Premise
|     | W Without premise W Without premise W Without premise i i i th th th | o o o u u u t  t  t  p p p r r r e e e m m m ise ise ise |     | front view front view front view front view front view front view | 100 100 100 100 100 100 |     |     |     |     | 25 25 25 25 25 25 |     |     |
| --- | -------------------------------------------------------------------- | -------------------------------------------------------- | --- | ----------------------------------------------------------------- | ----------------------- | --- | --- | --- | --- | ----------------- | --- | --- |
a a a Wh Wh Wh a a a t t t  t  t  t h h h e e e       P P P r r r e e e m m m ise Adds ise Adds ise Adds b b b S-Space Readout Accuracy S-Space Readout Accuracy S-Space Readout Accuracy 100% 100% 100% 100% 100% 100% 144/144 144/144 144/144 144/144 144/144 144/144 Without premise Without premise Without premise With premise With premise With premise c c c With Minus Without Premise With Minus Without Premise With Minus Without Premise
|     | Question Question Question Question Question Question                                                                                                                                                                                                                |     |                                                                         |                                  |                                                                                        |                |                         |     |     | 20 20 20 20 20 20                                                                                                                                              |     |     |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------- | -------------- | ----------------------- | --- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --- |
|     | Without premise Without premise Without premise                                                                                                                                                                                                                      |     |                                                                         | front view front view front view | 100 100 100 90 90 90 90 90 90                                                          |                |                         |     |     | )pp( ecnereffid ycaruccA )pp( ecnereffid ycaruccA )pp( ecnereffid ycaruccA )pp( ecnereffid ycaruccA )pp( ecnereffid ycaruccA )pp( ecnereffid ycaruccA 25 25 25 |     |     |
|     | when viewed from the viewer's left when viewed from the viewer's left when viewed from the viewer's left when viewed from the viewer's left when viewed from the viewer's left when viewed from the viewer's left                                                    |     |                                                                         |                                  |                                                                                        | 100% 100% 100% | 144/144 144/144 144/144 |     |     | 15 15 15 15 15 15                                                                                                                                              |     |     |
|     | side, which object appears on the left side, which object appears on the left side, which object appears on the left side, which object appears on the left side, which object appears on the left side, which object appears on the left Question Question Question |     |                                                                         |                                  |                                                                                        |                |                         |     |     | 20 20 20                                                                                                                                                       |     |     |
|     | from the new perspective? from the new perspective? from the new perspective? from the new perspective? from the new perspective? from the new perspective?                                                                                                          |     |                                                                         |                                  | )%( ycaruccA )%( ycaruccA )%( ycaruccA )%( ycaruccA )%( ycaruccA )%( ycaruccA 90 90 90 |                |                         |     |     | )pp( ecnereffid ycaruccA )pp( ecnereffid ycaruccA )pp( ecnereffid ycaruccA                                                                                     |     |     |
|     | when viewed from the viewer's left when viewed from the viewer's left when viewed from the viewer's left                                                                                                                                                             |     |                                                                         |                                  | 80 80 80 80 80 80                                                                      |                |                         |     |     | 10 10 10 10 10 10                                                                                                                                              |     |     |
|     | side, which object appears on the left side, which object appears on the left side, which object appears on the left                                                                                                                                                 |     |                                                                         |                                  |                                                                                        |                |                         |     |     | 15 15 15                                                                                                                                                       |     |     |
|     | from the new perspective? from the new perspective? from the new perspective?                                                                                                                                                                                        |     | add premise add premise add premise add premise add premise add premise |                                  | )%( ycaruccA )%( ycaruccA )%( ycaruccA                                                 |                |                         |     |     | 5 5 5 5 5 5                                                                                                                                                    |     |     |
|     | With premise With premise With premise With premise With premise With premise                                                                                                                                                                                        |     |                                                                         |                                  | 80 80 80 70 70 70 70 70 70                                                             |                |                         |     |     | 10 10 10                                                                                                                                                       |     |     |
Same image and question, plus: Same image and question, plus: Same image and question, plus: Same image and question, plus: Same image and question, plus: Same image and question, plus:
|     |                                                                                                                        |                                                                                                             | add premise add premise add premise                                                                                                                                                                   |                                                                               |                            |     |                                           |     |                                           | 0 0 0 0 0 0 5 5         |     |     |
| --- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------- | --- | ----------------------------------------- | --- | ----------------------------------------- | ----------------------- | --- | --- |
|     | Premise Premise Premise Premise Premise Premise                                                                        | “ “ “ “ “ “ T T T T T T h h h h h h e e e e e e  m  m  m  m  m  m u u u u u u s s s s s s                   | ta ta ta ta ta ta r r r r r r d d d d d d  b  b  b  b  b  b o o o o o o t t t t t t t t t t t t l l l l l l e e e e e e  i  i  i  i  i  i s c s c s c s c s c s c l l l l l l o o o o o o s s s s s s | e e e e e e r r r r r r ; ; ; ; ; ;                                           | 60 60 60 60 60 60 70 70 70 |     |                                           |     |                                           | 5                       |     |     |
|     | With premise With premise With premise                                                                                 | t t t t t t h h h h h h e e e e e e             m m m m m m ug ug ug ug ug ug             is is is is is is |  f  f  f  f  f  f a a a a a a rt rt rt rt rt rt h h h h h h e e e e e e r r r r r r  f  f  f  f  f  f r r r r r r o o o o o o m m m m m m  t  t  t  t  t  t h h h h h h e e e e e e                   |             v v v v v v ie ie ie ie ie ie wer.” wer.” wer.” wer.” wer.” wer.” |                            |     |                                           |     |                                           | −5 −5 −5 −5 −5 −5       |     |     |
|     | Image and question, plus: Same image and question, plus: Same image and question, plus: Same image and question, plus: |                                                                                                             |                                                                                                                                                                                                       |                                                                               |                            |     |                                           |     |                                           | 0 0 0                   |     |     |
|     |                                                                                                                        | “ “ “ T T T h h h e e e  m  m  m u u u s s s                                                                | ta ta ta r r r d d d  b  b  b o o o t t t t t t l l l e e e  i  i  i s c s c s c l l l o o o s s s                                                                                                    | e e e r r r ; ; ;                                                             | 60 60 60 50 50 50 50 50 50 |     | L16 17 L16 17 L16 17 L16 17 L16 17 L16 17 |     | Chance Chance Chance Chance Chance Chance | −10 −10 −10 −10 −10 −10 |     |     |
Premise Premise Premise t t t h h h e e e       m m m ug ug ug       is is is  f  f  f a a a rt rt rt h h h e e e r r r  f  f  f r r r o o o m m m  t  t  t h h h e e e       v v v ie ie ie wer.” wer.” wer.” 0 0 0 0 0 0 4 4 4 4 4 4 8 8 8 8 8 8 12 12 12 12 12 12 16 16 16 16 16 16 20 20 20 20 20 20 24 24 24 24 24 24 28 28 28 28 28 28 32 32 32 32 32 32 −5 −5 −5 0 0 0 0 0 0 4 4 4 4 4 4 8 8 8 8 8 8 12 12 12 12 12 12 16 16 16 16 16 16 20 20 20 20 20 20 24 24 24 24 24 24 28 28 28 28 28 28 32 32 32 32 32 32
|     |     |     |     |     |          |     | Layer index Layer index Layer index Layer index Layer index Layer index L16 17 L16 17 L16 17 |     | Chance Chance Chance |             | Layer index Layer index Layer index Layer index Layer index Layer index |     |
| --- | --- | --- | --- | --- | -------- | --- | -------------------------------------------------------------------------------------------- | --- | -------------------- | ----------- | ----------------------------------------------------------------------- | --- |
|     |     |     |     |     | 50 50 50 |     |                                                                                              |     |                      | −10 −10 −10 |                                                                         |     |
(a) Source-view premise 0 0 0 4 4 4 (b) 8 8 8 Layerwise 12 12 12 16 16 16 20 20 20 accuracy 24 24 24 28 28 28 32 32 32 (c) 0 0 0 Accuracy 4 4 4 8 8 8 12 12 12 16 16 16 difference 20 20 20 24 24 24 28 28 28 32 32 32
|     |     |     |     |     |     |     | Layer index Layer index Layer index |     |     |     | Layer index Layer index Layer index |     |
| --- | --- | --- | --- | --- | --- | --- | ----------------------------------- | --- | --- | --- | ----------------------------------- | --- |
Figure13 Molmo2-ER readouts with spatial premises. (a) Source-view premise. (b) Layerwise accuracy
| with (n=144) |     | and without |     | (n=146) | premises. | (c) | Accuracy | difference. |     |     |     |     |
| ------------ | --- | ----------- | --- | ------- | --------- | --- | -------- | ----------- | --- | --- | --- | --- |
C.6 S-SpaceunderActionTraining
AsshowninSection4,languagetranslatesspaceintowordsandshapestheemergenceofS-Space. Action,
by contrast, translates space into movement, providing a more precise interface with the physical world.
To reach, grasp, or manipulate an object, a model must resolve both the geometry of the scene and the
functional parts through which interaction occurs. We therefore ask whether learning to act sharpens
the geometry in S-Space by comparing a VLM with its fine-tuned VLA models.
Modelsanddata. We examine Molmo2-ER, MolmoAct2-Pretrain, and MolmoAct2 on images from the
InstructPart dataset [45], in which a manipulable object contains a characteristic functional part with
estimated depth of the part and the whole object. We construct prompts such as “... Locate the [object]"
and assess the S-Space readout on the distance axis by comparison between the part and the whole,
as in Section 2.3. Ground-truth depth comparison use the provided object and part masks and Depth
| Anything | V2-Small | [44]. |     |     |     |     |     |     |     |     |     |     |
| -------- | -------- | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
Results. As shown in Figure 14, we find an orderly progression along the model family: from the VLM
through the action-model pretrain to the VLA, this local geometry becomes increasingly faithful to the
| physical | relation | between | them. |     |     |     |     |     |     |     |     |     |
| -------- | -------- | ------- | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
23

|     |     | S-Space: | Exploring | Spatial | Workspace | in  | Multimodal | Language |     | Models |     |     |
| --- | --- | -------- | --------- | ------- | --------- | --- | ---------- | -------- | --- | ------ | --- | --- |
69.0%
|     |     |     |     | Given the instruction "hold the kettle", |     |     |     |     | 70                   |     |       |     |
| --- | --- | --- | --- | ---------------------------------------- | --- | --- | --- | --- | -------------------- | --- | ----- | --- |
|     |     |     |     |                                          |     |     |     |     | ↑ )%( ycarucca htpeD |     | 67.1% |     |
locate the handle.
|     |     |     |     |     |     | whole object | functional part |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | ------------ | --------------- | --- | --- | --- | --- | --- |
65 63.1%
Molmo2-ER
MolmoAct2-Pretrain
|     |     |     |     | MolmoAct2 |     |     |     |     | 60        |            |     |           |
| --- | --- | --- | --- | --------- | --- | --- | --- | --- | --------- | ---------- | --- | --------- |
|     |     |     |     |           |     |     |     |     | Molmo2-ER | MolmoAct2- |     | MolmoAct2 |
Pretrain
|     |     | (a) | Object | and part | readouts |     |     |     | (b) Depth-comparison |     | accuracy |     |
| --- | --- | --- | ------ | -------- | -------- | --- | --- | --- | -------------------- | --- | -------- | --- |
Action training sharpens part–whole depth geometry in S-Space. (a) Depth readouts for
Figure14
the kettle and its handle. (b) Depth comparison accuracy at L18 for all three models. Error bars indicate 95%
| confidence | intervals | across | prompts. |     |     |     |     |     |     |     |     |     |
| ---------- | --------- | ------ | -------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
C.7 S-SpaceinMulti-ViewContexts
Although S-Space is identified entirely from single-view examples, a workspace should still provide mean-
ingful spatial coordinates when multiple views of the same scene are presented. We examine whether the
model can use the prompt to select which view defines the observer-centered frame.
Viewpairsandpromptsteering. We construct 600 view pairs in panoramic scenes from Yu et al. [46],
with100perdirection. Thesameobjectappearsinbothviews. Asillustratedintheprompt-steeringtest
(Figure15a),wekeepthepromptfixedon“InView1”whileswappingwhichimageisdesignatedasView
1, and test whether the resulting change in an object’s S-Space coordinates follows the corresponding
change in viewpoint.
Results. Across models, steering accuracy is consistently well above random choice along the horizontal,
SS--SSppaaccee  FFoolllloowwss  tthhee  PPrroommpptt--SSeelleecctteedd  VViieeww
vSe-rStpiaccael ,Foallnodwsd thiset Paronmcepta-Sxeelesct(eFdi Vgiuewre 15b). These results suggest that S-Space is not tied to a single visual
SSwwaappppiinngg  wwhhiicchh  iimmaaggee  ooccccuuppiieess  VViieeww  11  sstteeeerrss  tthhee  oobbjjeecctt  ccoooorrddiinnaattee  eennccooddeedd  aatt  iittss  ttookkeenn..
inSwpapupitng, wbhiucht imcagae noccubpeies Vdieywn 1 satemers ithcea olbljeyct caoonrdcinhatoe renecdodetd oat itts htoekenv.
|                                                                                   |     |     |     |     |     | iewpoint                              | selected | through | language. |     |     |     |
| --------------------------------------------------------------------------------- | --- | --- | --- | --- | --- | ------------------------------------- | -------- | ------- | --------- | --- | --- | --- |
| aa TThhee  PPrroommpptt  SSeelleeccttss  tthhee  CCoooorrddiinnaattee  FFrraammee |     |     |     |     |     | bb SStteeeerriinngg  AAccccuurraaccyy |          |         |           |     |     |     |
| a The Prompt Selects the Coordinate Frame                                         |     |     |     |     |     | b Steering Accuracy                   |          |         |           |     |     |     |
VV ii ee ww    11    AA VV ii ee ww    22    BB HH oo rr ii zz oo nn tt aa ll    (( HH )) VV ee rr tt ii cc aa ll    (( VV )) DD ee pp tt hh    (( DD ))
|                 |         |         | PP rr oo mm pp tt                |     |     | H o                        | r i z o n t a l   ( H ) |     | V e r t i c a | l   ( V ) | D e p | t h   ( D ) |
| --------------- | ------- | ------- | -------------------------------- | --- | --- | -------------------------- | ----------------------- | --- | ------------- | --------- | ----- | ----------- |
| V i e w   1   A | V i e w |   2   B | IIP nnr   o VVm iieep wwt   11,, |     |     | bbiinnaarryy  cchh aann cc | ee                      |     |               |           |       |             |
binary chance
|     |     |     | Iwwnhh Veeirreeew  iiss 1  tt,hhee |     | QQwweenn33..55--44BB |     |     | 9955..00 |     | 9944..55 | 5577..00 |     |
| --- | --- | --- | ---------------------------------- | --- | -------------------- | --- | --- | -------- | --- | -------- | -------- | --- |
|     |     |     | mmwhaannernneee iqqsuu tiihnne??   |     | Qwen3.5-4B           |     |     | 95.0     |     | 94.5     | 57.0     |     |
mannequin?
|     |     |     |     |     | QQwweenn33..66--2277BB |     |     | 9966..55 |     | 9977..55 | 5599..00 |     |
| --- | --- | --- | --- | --- | ---------------------- | --- | --- | -------- | --- | -------- | -------- | --- |
|     |     |     |     |     | Qwen3.6-27B            |     |     | 96.5     |     | 97.5     | 59.0     |     |
VV ii ee ww    11    BB VV ii ee ww    22    AA MM oo ll mm oo 22 -- EE RR 99 33 .. 00 99 00 .. 00 66 88 .. 00
|                 |         |         | PP rr oo mm pp tt                        |              | M o l m                          | o 2 - E R            |             | 9 3 . 0 |     | 9 0 . 0     | 6           | 8 . 0 |
| --------------- | ------- | ------- | ---------------------------------------- | ------------ | -------------------------------- | -------------------- | ----------- | ------- | --- | ----------- | ----------- | ----- |
| V i e w   1   B | V i e w |   2   A | IIP nnr   o VVm iieep wwt   11,,         |              |                                  |                      |             |         |     |             |             |       |
|                 |         |         |                                          |              | MM oo ll mm oo AA cc tt 22 -- PP | rr ee tt rr aa ii nn | 88 22 .. 00 |         |     | 77 66 .. 55 | 66 22 .. 00 |       |
|                 |         |         | I wwn hh  V eei rr e ee w    ii ss  1    | tt, hh ee    | M o l m o A c t 2 - P            | r e t r a i n        | 8 2 . 0     |         |     | 7 6 . 5     | 6 2 . 0     |       |
|                 |         |         | mmw h aa nne r nn e ee   i qqs uu        | t iih nne ?? |                                  |                      |             |         |     |             |             |       |
mannequin?
|     |     |     |     |     | MMoollmmooAAcctt22 |           | 8811..00       |             | 7733..55  |                       | 6633..55  |                  |
| --- | --- | --- | --- | --- | ------------------ | --------- | -------------- | ----------- | --------- | --------------------- | --------- | ---------------- |
|     |     |     |     |     | MolmoAct2          |           | 81.0           |             | 73.5      |                       | 63.5      |                  |
|     |     |     |     |     |                    | 5500 6600 | 7700 8800 9900 | 110000 5500 | 6600 7700 | 8800 9900 110000 5500 | 6600 7700 | 8800 9900 110000 |
PPrroommpptt  sstteeeerriinngg  tteesstt 50 60 70 80 90 100 50 60 70 80 90 100 50 60 70 80 90 100
|     | Prompt steering test |     |     |     |     |     |     | PPrroommpptt  sstteeeerriinngg  tteesstt  aaccccuurraaccyy |     |     |     |     |
| --- | -------------------- | --- | --- | --- | --- | --- | --- | ---------------------------------------------------------- | --- | --- | --- | --- |
Prompt steering test accuracy
|     | (a) | Prompt | steering | test |     |     |     | (b) | Steer | accuracy |     |     |
| --- | --- | ------ | -------- | ---- | --- | --- | --- | --- | ----- | -------- | --- | --- |
Figure15 Prompt steering test of S-Space in multi-view contexts. (a) Each example is evaluated twice
withthesameView-1querywhilethetwoinputimagesareswapped. (b)Weevaluatethesignagreementbetween
theresultingchangeintheS-Spacecoordinatesandtheobject’sground-truthdisplacementbetweenthetwoviews.
24
