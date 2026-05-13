Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation

[

](./static/videos/autonomous_skills/auto_48x.mp4)

[

](./static/videos/autonomous_skills/auto_48x.mp4)

[![PDF](./static/images/pdf.svg)
Paper](./static/viral-v2.pdf)
[![ArXiv](./static/images/arxiv.svg)
arXiv](https://arxiv.org/abs/2511.15200)

[Code](https://github.com/NVlabs/GR00T-VisualSim2Real)

# VIRAL

# Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation

[![PDF](./static/images/pdf.svg)
Paper](./static/viral.pdf)

[![ArXiv](./static/images/arxiv.svg)
arXiv](https://arxiv.org/abs/2511.15200)

[Code](https://github.com/NVlabs/GR00T-VisualSim2Real)

### Content

---

* [Autonomous Loco-Manipulation](#autonomous-locomanip)
* [Visual Randomization in Simulation](#visual-randomization)
* [Key Teacher-Student Elements](#teacher-student-elements)
* [Compute Scaling](#compute-scaling)
* [Key Sim2Real Elements](#sim2real-elements)
* [Generalization](#generalization-1)
* [#1: Tray Position - Y Axis](#generalization-1)
* [#2: Tray Position - X Axis](#generalization-2)
* [#3: Cylinder Position](#generalization-3)
* [#4: Robot Position - Y Axis](#generalization-4)
* [#5: Robot Position - X Axis](#generalization-5)
* [#6: Table Height](#generalization-6)
* [#7: Lighting Conditions](#generalization-7)
* [#8: Table Cloth Color](#generalization-8)
* [#9: Table Type](#generalization-9)
* [#10: Object](#generalization-10)
* [Our Visual Sim2Real Journey](#sim2real-journey)
* [Failure Cases](#failure-cases)
* [Abstract](#abstract)
* [Method](#method)
* [BibTeX](#BibTeX)

# VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation

[Tairan He](https://tairanhe.com/)\*
[Zi Wang](https://www.linkedin.com/in/zi-wang-b675aa236)\*
[Haoru Xue](https://haoruxue.github.io/)\*
[Qingwei Ben](https://www.qingweiben.com/)\*

[Zhengyi Luo](https://www.zhengyiluo.com/)
[Wenli Xiao](https://wenlixiao-cs.github.io)
[Ye Yuan](https://ye-yuan.com/)
[Xingye Da](https://www.linkedin.com/in/xingye-dennis-da-86242655/)
[Fernando Castañeda](https://scholar.google.com/citations?user=U9WUBC4AAAAJ&hl=es)

[Shankar Sastry](https://people.eecs.berkeley.edu/~sastry/)
[Changliu Liu](https://www.cs.cmu.edu/~cliu6/)
[Guanya Shi](https://www.gshi.me/)
[Linxi "Jim" Fan](https://jimfan.me)†
[Yuke Zhu](https://yukezhu.me)†

\*Equal Contributions;
†GEAR Team Leads

[PDF](./static/viral.pdf)

[ArXiv](https://arxiv.org/abs/2511.15200)

[Summary](https://x.com/TairanHe99/status/1991546857097687372)

[Code](https://github.com/NVlabs/GR00T-VisualSim2Real)

## Autonomous Loco-Manipulation

| Time Lapse  Consecutive Successes |

## Visual Randomization in Simulation

| All Randomization  Dome Light Rand |
| Image Rand  Material Rand |

## Key Teacher Elements

| Delta Action Space & Reference State Initialization (RSI)![Delta Action Space & Reference State](./static/images/delta_action_RSI.png) |

## Key Sim2Real Elements

| Finger SysID SysID vs. No SysID      FOV Alignment![FOV Alignment](./static/images/FOV_alignment.png) |

## Compute Scaling for Teacher-Student Training

| Scaling Compute for Teacher![Teacher Scaling Law](./static/images/teacher_scaling_law.png)  Scaling Compute for Student![Student Scaling Law](./static/images/student_scaling_law.png) |

## Generalization #1: Tray Position - Y Axis

[](./static/videos/general_1/general_1_cllip_2_cmps.mp4)

Tray on the left

[](./static/videos/general_1/general_1_clip_1_cmps.mp4)

Tray on the middle

[](./static/videos/general_1/general_1_clip_3_cmps.mp4)

Tray on the right

**Tray Position - Y Axis:** The robot demonstrates precise tray manipulation across different Y-axis positions, adapting to left, middle, and right placements.

## Generalization #2: Tray Position - X Axis

[](./static/videos/general_2/gereral_2_clip_inside_20cm_cmps.mp4)

20cm inside table

[](./static/videos/general_2/gereral_2_clip_inside_10cm_cmps.mp4)

10cm inside table

[](./static/videos/general_2/gereral_2_clip_inside_2cm_cmps.mp4)

2cm inside table

[](./static/videos/general_2/gereral_2_clip_outside_7cm_cmps.mp4)

7cm outside table

[](./static/videos/general_2/gereral_2_clip_outside_15cm_cmps.mp4)

15cm outside table

<
>

**Tray Position - X Axis:** The robot demonstrates adaptive manipulation across various X-axis positions, from 20cm inside the table to 15cm beyond the edge.

## Generalization #3: Cylinder Position

[](./static/videos/general_3/gereral_3_clip_right_near_cmps.mp4)

Right-Near

[](./static/videos/general_3/gereral_3_clip_right_middle_cmps.mp4)

Right-Middle

[](./static/videos/general_3/gereral_3_clip_right_far_cmps.mp4)

Right-Far

[](./static/videos/general_3/gereral_3_clip_left_near_cmps.mp4)

Left-Near

[](./static/videos/general_3/gereral_3_clip_left_middle_cmps.mp4)

Left-Middle

[](./static/videos/general_3/gereral_3_clip_left_far_cmps.mp4)

Left-Far

<
>

**Cylinder Position:** The robot precisely manipulates cylinders at varied positions, demonstrating adaptive positioning and control.

## Generalization #4: Robot Position - Y Axis

[](./static/videos/general_4/general_4_clip_robot_left_cmps.mp4)

Left

[](./static/videos/general_4/general_4_clip_robot_middle_cmps.mp4)

Middle

[](./static/videos/general_4/general_4_clip_robot_right_cmps.mp4)

Right

**Robot Position - Y Axis:** The robot performs manipulation tasks from different Y-axis positions, demonstrating adaptability to left, middle, and right positions.

## Generalization #5: Robot Position - X Axis

[](./static/videos/general_5/general_5_clip_robot_near_cmps.mp4)

Near

[](./static/videos/general_5/general_5_clip_robot_middle_cmps.mp4)

Middle

[](./static/videos/general_5/general_5_clip_robot_far_cmps.mp4)

Far

**Robot Position - X Axis:** The robot demonstrates consistent manipulation performance across different X-axis distances, from near to far positions relative to the table.

## Generalization #6: Table Height

[](./static/videos/general_6/general_6_clip_66.5cm_cmps.mp4)

66.5cm

[](./static/videos/general_6/general_6_clip_67.3cm_cmps.mp4)

67.3cm

[](./static/videos/general_6/general_6_clip_70.1cm_cmps.mp4)

70.1cm

[](./static/videos/general_6/general_6_clip_72.6cm_cmps.mp4)

72.6cm

[](./static/videos/general_6/general_6_clip_73.9cm_cmps.mp4)

73.9cm

[](./static/videos/general_6/general_6_clip_76.4cm_cmps.mp4)

76.4cm

[](./static/videos/general_6/general_6_clip_78.2cm_cmps.mp4)

78.2cm

[](./static/videos/general_6/general_6_clip_80.7cm_cmps.mp4)

80.7cm

<
>

**Table Height:** The robot demonstrates remarkable adaptability across various table heights, from 26.5 inches to 31.8 inches, showcasing robust manipulation capabilities.

## Generalization #7: Lightening Conditions

[](./static/videos/general_7/general_7_clip_light_cmps.mp4)

Light

[](./static/videos/general_7/general_7_clip_flashing_cmps.mp4)

Flashing

[](./static/videos/general_7/general_7_clip_dark_cmps.mp4)

Dark

**Lighting Conditions:** The robot maintains consistent manipulation performance across different lighting conditions, from bright to dark and flashing environments.

## Generalization #8: Table Cloth Color

[](./static/videos/general_8/general_8_clip_1_cmps.mp4)

Light Blue

[](./static/videos/general_8/general_8_clip_2_cmps.mp4)

Green

[](./static/videos/general_8/general_8_clip_3_cmps.mp4)

Yellow

[](./static/videos/general_8/general_8_clip_4_cmps.mp4)

Light Purple

[](./static/videos/general_8/general_8_clip_5_cmps.mp4)

Light Pink

[](./static/videos/general_8/general_8_clip_6_cmps.mp4)

Blue

[](./static/videos/general_8/general_8_clip_7_cmps.mp4)

Orange

[](./static/videos/general_8/general_8_clip_8_cmps.mp4)

Red

<
>

**Table Cloth Color:** The robot successfully adapts to various table cloth colors, from gray and green to bright colors like yellow, purple, cyan, blue, orange, and red.

## Generalization #9: Table Type

[](./static/videos/general_9/general_9_table_1_cmps.mp4)

Table #1

[](./static/videos/general_9/general_9_table_2_cmps.mp4)

Table #2

[](./static/videos/general_9/general_9_table_3_cmps.mp4)

Table #3

**Table Type:** The robot demonstrates versatility across different table types, showcasing consistent manipulation performance regardless of table material and design.

## Generalization #10: Object

[](./static/videos/general_10/general_10_clip_2_PlasticWaterBottle_cmps.mp4)

Plastic Water Bottle

[](./static/videos/general_10/general_10_clip_3_BowlingPin_cmps.mp4)

Bowling Pin

[](./static/videos/general_10/general_10_clip_4_SilverCan_cmps.mp4)

Silver Can

[](./static/videos/general_10/general_10_clip_5_PumpBottle_cmps.mp4)

Pump Bottle

[](./static/videos/general_10/general_10_clip_6_TennisCan_cmps.mp4)

Tennis Can

[](./static/videos/general_10/general_10_clip_7_VitaminBottle_cmps.mp4)

Vitamin Bottle

[](./static/videos/general_10/general_10_clip_8_SprayCan_cmps.mp4)

Spray Can

[](./static/videos/general_10/general_10_clip_9_MilkBottle_cmps.mp4)

Milk Bottle

[](./static/videos/general_10/general_10_clip_10_BubbleTea_cmps.mp4)

Bubble Tea

[](./static/videos/general_10/general_10_clip_11_HubBox_cmps.mp4)

Hub Box

[](./static/videos/general_10/general_10_clip_1_RedCan_cmps.mp4)

Red Can

[](./static/videos/general_10/general_10_clip_12_BlueCan_cmps.mp4)

Blue Can

[](./static/videos/general_10/general_10_clip_14_OrangeCup_cmps.mp4)

Orange Cup

<
>

**Object Variety:** The robot shows strong adaptability across objects of varying shapes, sizes, and materials.

## Our Visual Sim2Real Journey

[](./static/videos/journey/Journey-1-0530_cmps.mp4)

The first RGB-based sim2real deployment for visual arm reaching

May 30, 2025

[](./static/videos/journey/Journey-2-0611_cmps.mp4)

Visual IK Sim2Real: Sign of Life

June 11, 2025

[](./static/videos/journey/Journey-3-0619_cmps.mp4)

The first RGB-based sim2real deployment of visual grasping

June 19, 2025

[](./static/videos/journey/Journey-4-0708_cmps.mp4)

Open-loop relaying teacher action in real for sanity check

July 8, 2025

[](./static/videos/journey/Journey-5-0713_cmps.mp4)

First grasping semi-works

July 13, 2025

[](./static/videos/journey/Journey-7-0725_cmps.mp4)

Grasping does not work still

July 25, 2025

[](./static/videos/journey/Journey-8-0728_cmps.mp4)

Finger Primitive SysID

July 28, 2025

[](./static/videos/journey/Journey-9-0731_cmps.mp4)

From Grasping to PreGrasping

July 31, 2025

[](./static/videos/journey/Journey-10-0806_cmps.mp4)

Grasping finally works

Aug 06, 2025

[](./static/videos/journey/Journey-11-0807_cmps.mp4)

Grasping OOD Objects

Aug 07, 2025

[](./static/videos/journey/Journey-12-0815_cmps.mp4)

Exploration but no improvement

Aug 15, 2025

[](./static/videos/journey/Journey-13-0823_cmps.mp4)

Sim2Real works for walking to table and standing

Aug 23, 2025

[](./static/videos/journey/Journey-13.5-1005_cmps.mp4)

Walk-Stand-Grasp: Sim2Real works

Oct 05, 2025

[](./static/videos/journey/Journey-14-1020_cmps.mp4)

Walk-Stand-Drop-Grasp-Turn: First Sim2Real

Oct 20, 2025

[](./static/videos/journey/Journey-15-1023_cmps.mp4)

Walk-Stand-Drop-Grasp-Turn: Tuning and Trying Again

Oct 23, 2025

[](./static/videos/journey/Journey-16-1031_cmps.mp4)

Walk-Stand-Drop-Grasp-Turn: Sign of Life

Oct 31, 2025

[](./static/videos/autonomous_skills/auto_48x.mp4)

Walk-Stand-Drop-Grasp-Turn: 54 Cycles of Loco-Manipulation

Nov 10, 2025

<
>

### The First RGB-based Sim2Real for Reaching

May 30, 2025: The task is to reach the green/red box based on the visual input. Red box to close fingers, and green box to open fingers.

[](./static/videos/journey/Journey-1-0530_cmps.mp4)

## Failure Cases

[](./static/videos/failure_cases/failure-cases-3_cmps.mp4)

Unreliable Deployment

[](./static/videos/failure_cases/failure-cases-1_cmps.mp4)

Hand Stuck

[](./static/videos/failure_cases/failure-cases-2_cmps.mp4)

Accident Drop

[](./static/videos/failure_cases/failure-cases-4_cmps.mp4)

Failed OOD Object Generalization #1

[](./static/videos/failure_cases/failure-cases-5_cmps.mp4)

Failed OOD Object Generalization #2

[](./static/videos/failure_cases/failure-cases-6_cmps.mp4)

Failed OOD Object Generalization #3

<
>

**Failure Cases:** While the robot demonstrates robust performance, occasional failures occur including unreliable deployment, hand getting stuck, accidental drops, and challenges with out-of-distribution objects.

## Abstract

A key barrier to the real-world deployment of humanoid robots is the lack of autonomous loco-manipulation skills. We introduce VIRAL, a visual sim-to-real framework that learns humanoid loco-manipulation entirely in simulation and deploys it zero-shot to real hardware. VIRAL follows a teacher-student design: a privileged RL teacher, operating on full state, learns long-horizon loco-manipulation using a delta action space and reference state initialization. A vision-based student policy is then distilled from the teacher via large-scale simulation with tiled rendering, trained with a mixture of online DAgger and behavior cloning. We find that compute scale is critical: scaling simulation to tens of GPUs (up to 64) makes both teacher and student training reliable, while low-compute regimes often fail. To bridge the sim-to-real gap, VIRAL combines large-scale visual domain randomization over lighting, materials, camera parameters, image quality, and sensor delays—with real-to-sim alignment of the dexterous hands and cameras. Deployed on a Unitree G1 humanoid, the resulting RGB-based policy performs continuous loco-manipulation for up to 54 cycles, generalizing to diverse spatial and appearance variations without any real-world fine-tuning, and approaching expert-level teleoperation performance. Extensive ablations dissect the key design choices required to make RGB-based humanoid loco-manipulation work in practice.

## Method

There are three steps in the VIRAL framework:

1. **Teacher Training with Privileged Information**: A privileged RL teacher with full state access learns long-horizon loco-manipulation using delta action space and reference state initialization.
2. **Student Distillation at Scale**: A vision-based student policy is distilled from the teacher via large-scale simulation with tiled rendering, trained using a mixture of online DAgger and behavior cloning across tens of GPUs.
3. **Sim-to-Real Transfer**: Large-scale visual domain randomization combined with real-to-sim alignment of dexterous hand and camera parameters enables zero-shot deployment to real hardware.

![VIRAL Framework Pipeline](./static/images/VIRAL-Pipeline.png)

![Visual Randomization](./static/images/visual_randomization.png)

## BibTeX

```
@article{he2025viral,
              title={VIRAL: Visual Sim-to-Real at Scale for Humanoid Loco-Manipulation},
              author={He, Tairan and Wang, Zi and Xue, Haoru and Ben, Qingwei and Luo, Zhengyi and Xiao, Wenli and Yuan, Ye and Da, Xingye and Castañeda, Fernando and Sastry, Shankar and Liu, Changliu and Shi, Guanya and Fan, Linxi and Zhu, Yuke},
              journal={arXiv preprint arXiv:2511.15200},
              year={2025}
            }
```

Page template borrowed from [Nerfies](https://nerfies.github.io/) and [UMI-On-Legs](https://umi-on-legs.github.io).
