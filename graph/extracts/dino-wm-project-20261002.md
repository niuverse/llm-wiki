# **DINO-WM**: World Models on Pre-trained

# Visual Features enable Zero-shot Planning

[**Paper**](https://arxiv.org/abs/2411.04983)

[**Code**](https://github.com/gaoyuezhou/dino_wm)

[Gaoyue Zhou1](https://gaoyuezhou.github.io/)

[Hengkai Pan1](https://hengkaipan.github.io/)

[Yann LeCun1,2](https://yann.lecun.com/)

[Lerrel Pinto1](https://lerrelpinto.com)

**New York University**1

**Meta-FAIR**2

[

](./mfiles/figs/teaser_video_small.mp4)

## Abstract

The ability to predict future outcomes given control actions is fundamental for physical reasoning. However,
such predictive models, often called world models, remains challenging to learn and are typically developed
for task-specific solutions with online policy learning. To unlock world models' true potential, we argue
that they should 1) be trainable on offline, pre-collected trajectories, 2) support test-time behavior
optimization, and 3) facilitate task-agnostic reasoning.

To this end, we present DINO World Model (**DINO-WM**), a new method to model
visual dynamics without reconstructing the visual world. DINO-WM leverages spatial patch features
pre-trained with DINOv2, enabling it to learn from offline behavioral trajectories by predicting future
patch features. This allows DINO-WM to achieve observational goals through action sequence optimization,
facilitating task-agnostic planning by treating goal features as prediction targets. We demonstrate that
DINO-WM achieves zero-shot behavioral solutions at test time on six environments without expert
demonstrations, reward modeling, or pre-learned inverse models, outperforming prior state-of-the-art work
across diverse task families such as arbitrarily configured mazes, push manipulation with varied object
shapes, and multi-particle scenarios.

![](./mfiles/figs/intro.png)

## Method

In this work, we present a new and simple method to build task-agnostic world models from an
offline dataset of trajectories. **DINO-WM** models the world dynamics on compact
embeddings of the world,
rather than the raw observations themselves. For the embedding, we use pretrained patch-features from the
DINOv2 model, which provides both a spatial and object-centric representation prior. We conjecture that this
pretrained representation enables robust and consistent world modeling, which relaxes the necessity for
task-specific data coverage. Given these visual embeddings and actions, **DINO-WM** uses the ViT architecture
to predict future embeddings. Once this model is trained on the offline dataset, planning to solve tasks is
constructed as visual goal reaching, i.e. to reach a future desired goal given the current observation.
Since the predictions by **DINO-WM** are high quality, we can simply use
model predictive control with inference-time optimization to reach desired goals without any extra
information during testing.

![](./mfiles/figs/model_arch.png)

## Optimizing Behaviors with DINO-WM

\*For all the images and videos below, the top row shows ground truth rollouts in the environment, while the
bottom row presents world model-imagined rollouts. The images on the right represent the goal states in both
cases.

[

](./mfiles/env/media/exp1_all5envs/pusht_ours.mp4)

#### PushT

[

](./mfiles/env/media/exp1_all5envs/wall_ours.mp4)

#### Wall

[

](./mfiles/env/media/exp1_all5envs/pointmaze_ours.mp4)

#### PointMaze

[

](./mfiles/env/media/exp1_all5envs/rope_ours.mp4)

#### Rope

[

](./mfiles/env/media/exp1_all5envs/granular_ours(dino-wm).mp4)

#### Granular

[

](./mfiles/env/dmcontrol_reacher/ours/plan0_6_success.mp4)

#### Reacher

## Comparing planning performance with baselines

#### PushT: horizon = 25 Ours DINO CLS Dreamer V3 IRIS Granular: Ours DINO CLS R3M ResNet DM Control Reacher: Ours Success Ours Failure Dreamer V3 Success Dreamer V3 Failure

## Unconditioned DINO-WM on CLEVRER

\*For the videos in this section, the top row shows ground truth rollouts in the environment, while the
bottom row presents world model-imagined rollouts.

1-frame rollouts are conditioned on the first frame only, while 3-frame rollouts are conditioned on the
first three frames. This allows the model to better capture physical properties like velocity and
trajectories. This added context improves prediction accuracy, whereas conditioning on a single frame leads
to open-ended assumptions about object movements and predictions. Both are taken from the validation set.

[

](./mfiles/env/clevrer_videos/video_e15_val_s1_2 copy.mp4)

#### 3-Frame Context Example 1

[

](./mfiles/env/clevrer_videos/video_e15_val_s1_2_1framestart.mp4)

#### 1-Frame Context Example 1

[

](./mfiles/env/clevrer_videos/video_e15_val_s1_5.mp4)

#### 3-Frame Context Example 2

[

](./mfiles/env/clevrer_videos/video_e15_val_s1_5_1framestart.mp4)

#### 1-Frame Context Example 2

[

](./mfiles/env/clevrer_videos/video_e15_val_s1_6.mp4)

#### 3-Frame Context Example 3

[

](./mfiles/env/clevrer_videos/video_e15_val_s1_6_1framestart.mp4)

#### 1-Frame Context Example 3

## Generalizing to Novel Environment Configurations

[

](./mfiles/env/media/exp3/WallRandom_ours.mp4)

#### WallRandom

[

](./mfiles/env/media/exp3/PushObj_ours_2.mp4)

#### PushObj

[

](./mfiles/env/media/exp3/PushObj_ours_1.mp4)

#### PushObj

[

](./mfiles/env/media/exp3/GranularRandom_ours.mp4)

#### GranularRandom

Previous

Next

## Additional Planning Results

#### PushT: horizon = 25

[

](./mfiles/env/pusht/output_final_3_success.mp4)

#### Success1

[

](./mfiles/env/pusht/output_final_4_success.mp4)

#### Success2

Previous

Next

[

](./mfiles/env/pusht/output_final_0_failure.mp4)

#### Failure1

[

](./mfiles/env/pusht/output_final_1_failure.mp4)

#### Failure2

Previous

Next

#### PushT: horizon = 50

[

](./mfiles/env/media/exp1_pusht_50_steps/pusht_ours_success_1.mp4)

#### Success1

[

](./mfiles/env/media/exp1_pusht_50_steps/pusht_ours_success_2.mp4)

#### Success2

Previous

Next

[

](./mfiles/env/media/exp1_pusht_50_steps/pusht_ours_failure_3.mp4)

#### Failure1

[

](./mfiles/env/media/exp1_pusht_50_steps/pusht_ours_failure_4.mp4)

#### Failure2

Previous

Next

#### PointMaze:

[

](./mfiles/env/point_maze/PointMaze_H5_3.mp4)

#### Success1

[

](./mfiles/env/point_maze/PointMaze_H5_1.mp4)

#### Success2

[

](./mfiles/env/point_maze/PointMaze_H5_2.mp4)

#### Success3

[

](./mfiles/env/point_maze/PointMaze_H5_1.mp4)

#### Failure1

Previous

Next

[

](./mfiles/env/point_maze/PointMaze_H5_1.mp4)

#### Failure1

Previous

Next

#### DM Control Reacher:

[

](./mfiles/env/dmcontrol_reacher/ours/plan0_4_success.mp4)

#### Success1

[

](./mfiles/env/dmcontrol_reacher/ours/plan0_6_success.mp4)

#### Success2

Previous

Next

[

](./mfiles/env/dmcontrol_reacher/ours/plan0_2_failure.mp4)

#### Failure1

[

](./mfiles/env/dmcontrol_reacher/ours/plan0_8_failure.mp4)

#### Failure2

Previous

Next

#### Rope:

[

](./mfiles/env/rope/rope_concat_0.mp4)

[

](./mfiles/env/rope/rope_concat_1.mp4)

[

](./mfiles/env/rope/rope_concat_2.mp4)

[

](./mfiles/env/rope/rope_concat_3.mp4)

Previous

Next

## Deformable Dataset Visualizations

[

](./mfiles/env/deformable_full/granular1.mp4)

#### Granular Example 1

[

](./mfiles/env/deformable_full/granular2.mp4)

#### Granular Example 2

Previous

Next

[

](./mfiles/env/deformable_full/rope1.mp4)

#### Rope Example 1

[

](./mfiles/env/deformable_full/rope2.mp4)

#### Rope Example 2

Previous

Next

## Genie Openloop Rollouts

![](./mfiles/figs/genie.png)

## Citation (BibTeX)

```
  @misc{zhou2024dinowmworldmodelspretrained,
    title={DINO-WM: World Models on Pre-trained Visual Features enable Zero-shot Planning},
    author={Gaoyue Zhou and Hengkai Pan and Yann LeCun and Lerrel Pinto},
    year={2024},
    eprint={2411.04983},
    archivePrefix={arXiv},
    primaryClass={cs.RO},
    url={https://arxiv.org/abs/2411.04983}
  }
```
