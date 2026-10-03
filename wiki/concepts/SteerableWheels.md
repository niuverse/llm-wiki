---
title: "可转向轮"
type: concept
tags: [robotics, wheeled-robots]
sources: ["[[structural-properties-and-classification-of-wheeled-mobile-robots]]", "[[modern-robotics-chapter-13-wheeled-mobile-robots]]"]
modified: 2026-10-04
topics: ["topics/planning-and-control", "topics/wheeled-robot-modeling"]
---

# 可转向轮

可转向轮通过改变轮平面方向改变滚动约束。最先要区分的是**转向轴是否穿过轮心**：中心式可转向轮与偏置脚轮的侧向约束不同，不能按转向电机数量直接推断底盘自由度。[[structural-properties-and-classification-of-wheeled-mobile-robots|轮式分类论文 §II.B]]

## 中心转向改变方向，偏置脚轮还改变轮心速度

对中心式轮，设固定轮心位置为 $(x_i,y_i)$，底盘局部速度为 $(v_x,v_y,\omega)$，转向角为 $\beta_i$。轮心平移速度与侧向约束为

$$
v_i=\begin{bmatrix}v_x-\omega y_i\\v_y+\omega x_i\end{bmatrix},\qquad
n_i(\beta_i)^\top v_i=0.
$$

$n_i$ 是轮平面横向单位向量；滚动方向 $t_i$ 与半径 $r_i$ 决定自转角速度 $\dot\theta_i$：$t_i^\top v_i=r_i\dot\theta_i$。中心转向不改变轮心位置，但改变允许速度方向。[[WheeledRobotKinematics|轮式运动学]]、[[structural-properties-and-classification-of-wheeled-mobile-robots|式 5–6]]

偏置脚轮的轮心会绕转向轴运动。用原文极坐标参数 $l,\alpha$ 描述转向轴位置，$d\ne0$ 为偏置，底盘速度按 $v_b=(v_x,v_y,\omega)^\top$ 排列，其侧向约束为

$$
[\cos(\alpha+\beta),\sin(\alpha+\beta),d+l\sin\beta]v_b+d\dot\beta=0.
$$

因此给定底盘运动后，脚轮可通过 $\dot\beta$ 满足约束；它不是固定轮，也不能把其角度直接算作中心转向自由度。小偏置下角速度关系可能敏感，但本式本身不提供瞬态接触力或真实轮胎侧滑模型。[[structural-properties-and-classification-of-wheeled-mobile-robots|式 8、29]]

## 多个轮角必须共同允许一项底盘运动

把中心转向轮的侧向约束组成 $C_{1c}(\beta_c)$，可转向度为 $\delta_s=\operatorname{rank}C_{1c}$，适用条件见 [[WheeledMobileRobotClassification|非退化轮系分类]]。额外轮角要协调，使轮轴指向共同瞬时转动中心；平移对应平行轮轴的极限情况。$\delta_s$ 不是独立电机数量，也不表示轮子可以无时间代价地重新定向。[[structural-properties-and-classification-of-wheeled-mobile-robots|§II.C、§IV.B]]

汽车式转向是这种协调约束的直观例子；即便允许改变轮角，当前状态的底盘速度仍受限制。汽车、差速等的允许控制集合差异见 [[modern-robotics-chapter-13-wheeled-mobile-robots|《现代机器人学》§13.3]]。

### 从目标底盘速度反推中心轮角

**由前述几何得到的教学公式。** 对非零轮心速度 $v_i=(a_i,b_i)^\top$，可取

$$
\beta_i^*=\operatorname{atan2}(b_i,a_i),\qquad \dot\theta_i^*=\frac{\sqrt{a_i^2+b_i^2}}{r_i}.
$$

因为这让 $t_i=(\cos\beta_i^*,\sin\beta_i^*)$ 平行于 $v_i$，所以 $n_i^\top v_i=0$ 自动成立。所有目标轮角都应由**同一个**底盘旋量计算，而非各自随意指定。

例如轮心在 $(L,0)$，目标是 $v_x=1$ m/s、$v_y=0$、$\omega=1$ rad/s，取 $L=0.5$ m，则 $v_i=(1,0.5)$ m/s，目标轮角约 $26.6^\circ$。若实际轮角还在 $0^\circ$，该轮横向速度就是 0.5 m/s；此时立即执行目标底盘运动会违反无侧滑假设。算法需要同时处理目标角和达到该角的过程。依据为 [[structural-properties-and-classification-of-wheeled-mobile-robots|中心转向轮约束]]；这是教学推论，不是原文执行器实验。

## 从几何到实现的检查

以下是**由几何关系提出的实现建议**，不是上述论文已经测得的硬件失效统计：求转向角时，应处理零接触速度下方向不定；同一速度可由角度 $\beta$ 与正轮速，或 $\beta+\pi$ 与反轮速实现，选支需要考虑角度限位与连续性；目标轮角还须满足实际转向速率，不能假设即时到位。

现代独立转向模块的具体分类应按偏置、车轮约束和协调方式推导，不能仅凭 swerve 名称指定类别。接触、轮胎变形和执行器能力还需相应证据。估计中的轮角与滑移影响见 [[MobileRobotOdometry|里程计]]、[[SimulationRealityGap|仿真—现实差距]]。

## 研究归属

[[topics/planning-and-control|规划与控制]] · [[topics/wheeled-robot-modeling|轮式机器人如何建模与分类]]。
