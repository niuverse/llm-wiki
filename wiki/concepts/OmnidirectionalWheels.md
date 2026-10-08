---
title: "全向轮"
type: concept
tags: [robotics, wheeled-robots]
sources: ["[[modern-robotics-chapter-13-wheeled-mobile-robots]]", "[[structural-properties-and-classification-of-wheeled-mobile-robots]]"]
modified: 2026-10-04
topics: ["topics/planning-and-control", "topics/wheeled-robot-modeling"]
---

# 全向轮

全向轮与麦克纳姆轮通过被动滚子允许一个方向的相对运动。**单个全向轮不提供完整的底盘全向能力**；只有车轮布局与驱动映射满足条件，底盘才能直接选择平面中的纵向、横向和旋转速度。[[modern-robotics-chapter-13-wheeled-mobile-robots|《现代机器人学》§13.1–13.2]]

## 滚子如何改变速度关系

在轮子坐标系中，$x$ 轴沿驱动方向。设轮心平移速度为 $(v_x,v_y)$，轮半径 $r_i$，滚子允许的被动运动角为 $\gamma_i$。按教材的角度约定，驱动角速度为

$$
u_i=\frac{v_x+v_y\tan\gamma_i}{r_i}.
$$

普通全向轮对应 $\gamma_i=0$；典型麦克纳姆轮对应 $\pm45^\circ$。角度正负和轮子坐标约定决定矩阵符号，不宜脱离示意图复制整车公式。[[modern-robotics-chapter-13-wheeled-mobile-robots|式 13.3–13.5]]

将轮心速度从底盘旋量 $V_b=(\omega,v_x^b,v_y^b)^\top$ 变换过来，所有轮子形成

$$
u=H V_b,\qquad \operatorname{rank}H=3.
$$

$u$ 为轮驱动角速度向量，$H$ 包含轮几何与半径。满秩意味着三个底盘速度方向可由轮速控制，不表示速度可以无限大。若 $|u_i|\le u_{i,\max}$，则

$$
-u_{i,\max}\le h_iV_b\le u_{i,\max}
$$

定义可行旋量的半空间交集，其中 $h_i$ 是 $H$ 第 $i$ 行。[[modern-robotics-chapter-13-wheeled-mobile-robots|§13.2.1]]

### 为什么投影中出现 $\tan\gamma$

**对教材式 13.3–13.4 的代数展开。** 按该角度正方向，允许的被动相对运动单位方向为 $s=(-\sin\gamma,\cos\gamma)^\top$，驱动方向为 $e_x=(1,0)^\top$。轮心运动可分解成

$$
v=r_i u_i e_x+v_{\rm slide}s.
$$

第二行给出 $v_{\rm slide}=v_y/\cos\gamma$，代回第一行得到 $r_i u_i=v_x+v_y\tan\gamma$；前提为 $\cos\gamma\ne0$。因此 $u_i$ 只控制去掉被动分量后的驱动速度，不独立控制任意二维轮心运动。[[modern-robotics-chapter-13-wheeled-mobile-robots|§13.2.1]]

**教学例子。** $r=0.1$ m、轮系中某轮速度为 $(0,0.2)$ m/s。普通全向轮 $\gamma=0$ 时该轮无需驱动自转，运动由被动滚子承担；$\gamma=45^\circ$ 时须 $u=2$ rad/s，驱动产生的纵向分量与斜向被动分量恰好抵消。其余轮是否允许整车这么运动，仍由整车矩阵决定。

## 四轮系统为何可能自相矛盾

三轮满秩时可以用方阵反解；四轮及更多轮的任意速度向量不一定在 $H$ 的列空间内。控制应先选择可行 $V_b$，再由 $HV_b$ 生成一致轮速。从测得轮速反算 $H^\dagger u$ 只是最小二乘估计；不相容残差不能靠伪逆变成满足无滑移的真实运动。[[WheeledRobotKinematics|轮式运动学]]、[[modern-robotics-chapter-13-wheeled-mobile-robots|§13.2、§13.4]]

**我们的实现建议。** 遇到速度上限，可统一缩放整组一致轮速，或在旋量可行域中重新选择命令；各轮独立截断可能破坏一致性。动力学与摩擦仍应另查，运动学满秩没有检验所需接触力能否实现。

## 全向不等于无约束或无漂移

滚子释放一个被动方向，其余接触和驱动关系仍须满足。教材将适用地面限定为硬、平地面；离开这个模型时，车轮滑移会令编码器不再对应真实位移，里程计误差累积。[[modern-robotics-chapter-13-wheeled-mobile-robots|§13.1、§13.4]]

Campion 的 $(3,0)$ 表示**底盘位姿层面**的即时全向；把轮子自转角也加入状态后，完整配置仍可有非完整约束。也有由适当驱动的偏置脚轮实现的 $(3,0)$，所以“全向底盘”不是某一种轮子名称的同义词。[[structural-properties-and-classification-of-wheeled-mobile-robots|§III、§V]]

轮角增量应先转换成积分旋量，再更新位姿，不能把未除采样时间的增量直接叫速度；计算见 [[MobileRobotOdometry|移动机器人里程计]]。真实接触与理想关系的差异见 [[SimulationRealityGap|Sim-to-Real Gap]]、[[ContactSolvers|Contact Solvers]]。

## 研究归属

[[topics/planning-and-control|规划与控制]] · [[topics/wheeled-robot-modeling|轮式机器人]]。
