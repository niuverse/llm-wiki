Contact Models in Robotics:
a Comparative Analysis

Quentin Le Lidec1,†, Wilson Jallet1,2, Louis Montaut1,3, Ivan Laptev1, Cordelia Schmid1, and Justin Carpentier1

1

4
2
0
2

l
u
J

1
2

]

O
R
.
s
c
[

3
v
2
7
3
6
0
.
4
0
3
2
:
v
i
X
r
a

Abstract—Physics simulation is ubiquitous in robotics. Whether
in model-based approaches (e.g., trajectory optimization), or
model-free algorithms (e.g., reinforcement learning), physics
simulators are a central component of modern control pipelines
in robotics. Over the past decades, several robotic simulators
have been developed, each with dedicated contact modeling
assumptions and algorithmic solutions. In this article, we survey
the main contact models and the associated numerical methods
commonly used in robotics for simulating advanced robot motions
involving contact interactions. In particular, we recall the physical
laws underlying contacts and friction (i.e., Signorini condition,
Coulomb’s law, and the maximum dissipation principle), and
how they are transcribed in current simulators. For each physics
engine, we expose their inherent physical relaxations along with
their limitations due to the numerical techniques employed. Based
on our study, we propose theoretically grounded quantitative
criteria on which we build benchmarks assessing both the physical
and computational aspects of simulation. We support our work
with an open-source and efficient C++ implementation of the
existing algorithmic variations. Our results demonstrate that
some approximations or algorithms commonly used in robotics
can severely widen the reality gap and impact target applications.
We hope this work will help motivate the development of new
contact models, contact solvers, and robotic simulators in general,
at the root of recent progress in motion generation in robotics.

Index Terms—Physical simulation, Numerical optimization.

I. INTRODUCTION

S IMULATION is a fundamental tool in robotics. Control

algorithms, like trajectory optimization (TO) or model
predictive control (MPC), rely on physics simulators to evaluate
the dynamics of the controlled system. Reinforcement Learning
(RL) algorithms operate by trial and error and require a
simulator to avoid time-consuming and costly failures on real
hardware. Robot co-design aims at finding optimal hardware de-
sign and morphology, and thus extensively relies on simulation
to prevent tedious physical validation. In practice, roboticists
also usually perform simulated safety checks before running a
new controller on their robots. These applications are evidence
for a wide range of research areas in robotics where simulation
is critical.

To be effective and valuable in practice, robot simulators
must meet some fidelity or efficiency levels, depending on the
use case. For instance, trajectory optimization algorithms, e.g.,
iLQR[1] or DDP [2], [3], use physics simulation to evaluate the

1Inria - Département d’Informatique de l’École normale supérieure, PSL

Research University. Email: firstname.lastname@inria.fr

2LAAS-CNRS, 7 av. du Colonel Roche, 31400 Toulouse
3Czech Institute of Informatics, Robotics and Cybernetics, Czech Technical

University, Prague, Czech Republic

†Corresponding author

Illustration of the dynamics of frictional contacts between rigid
Fig. 1.
bodies, which are governed by the Signorini condition, Coulomb’s law, and
the maximum dissipation principle. Combining these three principles leads to
the Non-linear Complementarity Problem (15).

system dynamics and leverage finite differences or the recent
advent of differentiable simulators [4], [5], [6], [7], [8] to
compute derivatives. If the solution lacks precision, the real and
planned trajectories may quickly diverge, impacting de facto
the capacity of such control solutions to be deployed on real
hardware. To absorb such errors, the Model Predictive Control
(MPC) [9], [10] paradigm exploits state feedback by repeatedly
running Optimal Control (OC) algorithms at high-frequency
rates (e.g., 1kHz) [11], [12]. The frequency rate is one factor
determining the robustness of this closed-loop algorithm to
modeling errors and perturbations; thus, the efficiency of the
simulation becomes critical. Although RL [13] is considered
a model-free approach, physical models are still at work to
generate the samples that are indispensable for learning control
policies. In fact, the vast number of required samples is the main
bottleneck during training, as days or years of simulation, which
corresponds to billions of calls to a simulator, are necessary
[14], [15], [16]. Therefore, the efficiency of the simulator
directly determines the computational and, thus, the energetic

2

cost of learning a control policy. Physical accuracy plays an
important role after training as well, as more physically accurate
simulations will result in a smaller reality gap to cross for the
learned policy to transfer to a real robot [14].

Many manipulation tasks can be tackled by assuming quasi-
staticity and considering only a restricted variety of contact
events [17], [18]. The recent robotics efforts, highlighted, for
instance, by the athletic motions performed by the humanoid
robots of Boston Dynamics [19], focus on very dynamic tasks
for which these simplification hypotheses cannot hold. In fact,
tasks like agile locomotion or dexterous manipulation require
the robot to quickly plan and finely exploit, at best, the contact
interactions with its environment to shape the movements [20],
[21], [22]. In this respect, the ability to handle impacts and
friction, physical phenomena at the core of contact interactions,
becomes fundamental for robotic simulators.

Physics simulation is often considered a solved problem
with several well-known simulators that are available off the
shelf. However, simulating a physical system raises several
complex issues that are usually circumvented at the cost of
approximations or costly computation. When simulating a
system evolving freely, rigid body dynamics algorithms [23],
[24] are now established as the way to go due to their high
efficiency. For robotics, one has to consider interactions through
contact between the robot and its environment, thus constraining
the movement. However, due to the creation of the breaking
of contacts along a trajectory, the dynamics switch from one
mode to the other, making the problem of simulating a system
with contacts and friction highly non-smooth [25], [26], [27].
Numerical integration schemes for non-smooth systems fall into
two main categories: event-driven and time-stepping methods
[28]. Most modern robotics simulators are part of the latter
category because predicting collisions is intractable due to the
complexity of the scenes. Therefore, we will restrict our study
to this type of method.

More precisely, contact dynamics between rigid objects are
governed by three main principles: the Signorini condition
specifies the unilaterality nature of contact interactions, while
Coulomb’s law of friction and the maximum dissipation
principle (MDP) of Moreau state that friction force should
lie inside a second-order cone and oppose the movement.
Altogether, these three principles correspond to a so-called
nonlinear complementarity problem (NCP). The complementar-
ity constraints define a non-convex set while being non-smooth,
this problem is difficult to solve in general [28].

Historically, the Open Dynamic Engine (ODE) [29] is one
of the first open-source simulators with a large impact on
the community, which was then followed by Bullet [30].
Both of them, in their original version, relied on maximal
coordinates to depict the state of the objects, and kinematic
constraints imposed by the articulations are tackled explicitly.
Such a choice leads to large-dimensional problems to solve,
impacting de facto the computational performances. To lower
the computational burden, alternative simulators rooted in
generalized coordinates, like DART [31] and MuJoCo [32],
appeared shortly after. Since then, Bullet also made this choice
the default one. In practice, these simulators are rarely used to
tackle engineering problems but rather as physics engines for

graphical purposes (Bullet) or research in the RL community
(MuJoCo). More recently, RaiSim [33] and Drake [34] were
developed as robotic-driven software. RaiSim [33] emerged as
one of the first simulators enabling RL policies to transfer to
real quadrupedal robots. Its implementation being closed source,
we provide what constitutes, to the best of our knowledge,
the first in-depth study and open-source re-implementation of
this contact solver. Drake also demonstrated some promising
results on challenging manipulation [35] as regards the sim-
to-real requirements. Still today, the number of alternative
algorithms available is growing fast, in an effort to improve
the properties of the existing ones, in terms of accuracy and
robustness [36], [37], [38], [6], [39], [35], [8]. In a parallel
line of work, Isaac Gym [40] and Brax [41] simulators use
elementary contact models and rather focus on exploiting
the parallelization abilities from GPUs or TPUs for batch
computation.

In general, these simulators differ at their very core: one
should be aware of the contact modeling embedded in the
simulator they are using and how it can impact the applications
they aim at. Some high-level benchmarks of simulators exist
[42], evaluating the whole simulation pipeline and its multiple
internal routines, e.g., rigid-body dynamics algorithms, collision
detection, and contact problem-solving. Our work closely
relates to [43]. It separately assesses the various contact
models and their associated algorithms. We achieve this by
decoupling the contact models from their implementations and
re-implemented the solvers with a unique back-end based on
the Pinocchio toolbox [24], [44] for evaluating the dynamic
quantities and on HPP-FCL [45], [46], [47] for computing
the collisions. We pursue the effort of [43] by studying
recent algorithms and adding advanced evaluation criteria. Our
experiments are done in both illustrative and realistic robotics
setups.
We make the following contributions:

(cid:44)→ we make a detailed survey of contact models and their
associated algorithms, including established and more
recent robotics simulators;

(cid:44)→ we expose the main limitations of existing simulators
by inspecting both the physical approximations and the
numerical methods that are at work;

(cid:44)→ we develop an open source and generic implementation

of the main robotic contact solvers in C++;

(cid:44)→ based on our implementation and the theoretical study,
we propose quantitative criteria that allow performing an
in-depth evaluation of both physical and computational
aspects of contact models and solvers.

(cid:44)→ we explore the impacts of the simulation choices on the
practical application of MPC for quadruped locomotion.

The article is organized as follows: we first recall the
background of contact simulation: the physical principles
behind contact modeling (Sec. II) and the numerical algorithms
allowing us to solve the resulting equations (Sec. III). In the
experimental part (Sec. IV), we propose an exhaustive empirical
evaluation of the various existing contact models and solvers
to assess both their physicality (Sec. IV-A), self-consistency
(Sec. IV-B) and computational efficiency (Sec. IV-C). At last,

Sec. IV-D investigates the consequences of the contact models
in the context of quadruped locomotion. It is finally worth
mentioning that the authors are linked to the Pinocchio and
HPP-FCL open-source projects.

II. RIGID CONTACT MODELLING

We start by stating the physical principles commonly
admitted for rigid body simulation with point contact. If these
principles remain hypothetical and can still be discussed, they
have been, in general, empirically tested and are arguably better
than their relaxations. Once the modeling is done, we transcribe
these physical laws into a numerical problem, which should be
solved via optimization-based techniques to simulate a system
with contacts and frictions. We also present the various open-
source tools that allow computing all the intermediate quantities
necessary to build a physics simulator.

In this paper, we describe the state of a system with
its generalized coordinates q ∈ Q ∼= Rnq . We denote by
v ∈ TqQ = Rnv the joint velocity, where TqQ is the tangent
space of Q.

Free motion. The principle of least constraint [48], [49], [50]
induces the celebrated equations of motion:

M (q) ˙v + b(q, v) = τ

(1)

where M ∈ Rnv×nv represents the joint space inertia matrix
of the system, b(q, v) accounts for the centrifugal and Coriolis
effects, and for the generalized gravity. This Lagrangian
equation of motion naturally accounts for the kinematic
constraints induced by the articulations of the rigid-body
dynamical system. When applied to a robot, i.e., a system
of multiple rigid bodies, the inertia matrix M becomes sparse.
Rigid body dynamic algorithms exploit this sparsity at best
[23], [24] making it possible to compute the free acceleration
in a few microseconds on modern CPUs for robots as complex
as a 36-dof humanoid. As done by time-stepping approaches
[28], we will express the problem in terms of velocities rather
than accelerations, thus discretizing (1) into:

M (qt)vt+1 = M (qt)vt + (τ t − b(qt, vt))∆t

(2)

which corresponds to a semi-implicit Euler integration scheme
[51]. More advanced implicit integrators [32], [35], [8] come
with stability guarantees even in the presence of stiff forces.
However, as time-stepping schemes, their order of integration
is inherently degraded due to the non-smoothness of the
dynamics [52]. For this reason, we restrict our study to a
simple scheme, as integrators are not the main focus of this
work. In the following, we often drop the instant at which
quantities are evaluated for readability purposes. We denote
the free velocity vf , which is defined as the solution of (2).

Bilateral contact. When the system is subject to constraints,
e.g. kinematic loop closures or anchor points, it is convenient
to represent them implicitly:

Φ(q) = 0.
(3)
where Φ : Rnq (cid:55)→ Rm is a holonomic constraint function of
dimension m, which depends on the nature of the constraint.

3

Fig. 2. The separation vector Φ allows formulating the non-penetration
constraint, which leads to the Signorini condition (8). This vector is computed
by the GJK or EPA algorithms, which are internal blocks of the simulator. We
refer to [56] for a tutorial introduction on the topic.

For solving, it is more practical to proceed to an index reduction
[53] by differentiating (3) w.r.t. time, in order to express it as
a constraint on joint velocities:

c − c∗ = 0.

(4)

where c = J(qt)vt+1 ∈ Rm is the constraint velocity, J =
∂Φ/∂q is the constraint Jacobian explicitly formed at time t,
which can be computed efficiently via rigid body dynamics
algorithms [23], [54]; and c∗ is the reference velocity which
stabilizes the constraint. Such a constraint (4) is enforced by
the action of the environment on the system via the contact
vector impulse λ ∈ Rm. These considerations lead to Gauss’s
principle of least constraint [55], [48]. By duality, the contact
impulses are spanned by the transpose of the constraint Jacobian
and should be incorporated in the Lagrangian equations (2)
via:

M vt+1 = M vf + J ⊤λ

(5)

Regarding bilateral contacts, the contact efforts, corresponding
to the Lagrange multipliers associated with the constraint
is well
(3), are unconstrained.
suited to model kinematic closures,
to model
interactions between the robot and its environment, which are
better represented by unilateral contacts. This paper focuses
on the latter, for which we provide a more detailed presentation.

If a bilateral constraint

is not

it

Unilateral contact. When a system is in contact with its
environment, the non-penetration constraint enforces the signed
distance between the two objects to be non-negative [57].
Defining the separation vector as the vector of minimum norm
separating two shapes in contact [58], [56](Fig. 2), the signed
distance function corresponds to its normal component. By
overloading the notation of the bilateral case, the constraint
function Φ now maps to the separation vector (Fig. 2) and
describes a unilateral constraint:

Φ(q)N ≥ 0
(6)
where Φ(q) ∈ R3nc, nc is the number of contacts; the subscripts
N and T respectively account for the normal and tangential
components. In practice, Φ can be computed efficiently via the
Gilbert-Johnson-Keerthi (GJK) [59], [47] and the Expanding
Polytope Algorithm (EPA) algorithms[60]. GJK operates on
convex shapes, but non-convex shapes can also be handled
by proceeding to decomposition into convex sub-shapes [61]
during an offline preprocessing step. To ease the solving, one

can write (6) in terms of velocities, and supposing that shapes
are in contact, i.e. Φ(qt)N ≤ 0, the Taylor expansion of the
condition (6) leads to:

cN − c∗

N ≥ 0

(7)

where c = J(qt)vt+1 ∈ R3nc is the velocity of contact points.
It should be noted that J is evaluated at qt as it avoids computing
Φ and its Jacobian several times when solving for qt+1 and vt+1
which significantly decreases the computational burden. We
explain later how c∗
N is set to model physical effects or improve
the numerical accuracy of the solutions. As in the bilateral
case, the transpose of the contact Jacobian J spans the contact
forces, which leads again to (5) the constrained equations of
motion. Unlike the bilateral case, unilateral contacts constrain
the possible contact impulses λ. In a frictionless situation,
the tangential forces are null, which implies that λT = 0. In
addition, the contact forces λ can only be repulsive i.e., they
should not act in a glue-like fashion (the environment can only
push and not pull on the feet of a legged robot) and, thus, are
forced to be non-negative. An impulse cannot occur when an
object takes off, i.e., the normal velocity and impulse cannot
be non-null simultaneously. Combining these conditions, we
obtain the so called Signorini condition [62] at the velocity
level [25]:

0 ≤ λN ⊥ cN − c∗

N ≥ 0.

(8)

where a ⊥ b for vectors a and b means a⊤b = 0. However, such
a condition does not define a mapping between λN and cN , i.e.,
the contact forces are not a function of the penetration error.
Indeed, their representation is an infinitely steep graph that
may be relaxed into a mapping via a spring damper accounting
for local deformation of the materials (see Fig. 3). Substituting,
vt+1 by its expression from the Lagrangian equations (5), we
obtain a Linear Complementarity Problem (LCP) [63]:

0 ≤ λN ⊥ (Gλ + g)N − c∗

N ≥ 0

(9)

∆t

where G = JM −1J ⊤ is the so-called Delassus matrix, and
g = Jvf is the free velocity of contact points (the velocity
of the contact points in the unconstrained cases). It is worth
mentioning at this stage that several approaches [23], [64],
[54] have been developed in the computational dynamics and
robotics literature to efficiently evaluate the Delassus matrix.
In the case of rigid bodies, the reference velocity c∗
N can
be set to Φ(qt)
to complete the Taylor expansion of (6).
However, adding bias terms to this velocity may be useful
to improve modeling on both physical and numerical aspects.
A first benefit is the possibility of accounting for impacts that
may occur when two objects collide with non-null relative
normal velocity. The most common impact law stipulates to
introduce a bias term −ect where e is the restitution coefficient,
which adjusts the quantity of energy dissipated during the
collision. When time-stepping methods are employed, one
cannot avoid penetration errors, i.e. Φ(q)N < 0, without
using stabilization by reprojection techniques [65] which
are computationally expensive to use in robotics due to the
cost of detecting a collision. However, it is still possible to
prevent these errors from dramatically growing over time via a
Baumgarte correction [66] which adds kB max(0, −Φ(qt)N ) to

4

Fig. 3. Both the Signorini condition (Left) and Coulomb’s law (Right) induce
infinitely steep graphs, which make the contact problem hard to solve.

the reference velocity c∗ and where the Baumgarte coefficient
kB is set to be proportional to 1

∆t .
In addition, in many cases in robotics, Delassus’ matrix
G is rank deficient. Such physical systems are said to be
hyperstatic, and because rank(J) > nv, several λ values may
lead to the same trajectory. This under-determination can be
circumvented by relaxing the rigid-body hypothesis, e.g. the
Signorini condition, and considering compliant contacts via a
reference velocity linearly depending on λ as represented in
Fig. 3. Indeed, by adding −Rλ to c∗ where R is a diagonal
matrix with non-null and positive elements only on the normal
components, called compliance and whose value is a property
of the material, the original Delassus matrix G is replaced by
the damped matrix ˜G = G + R which is full rank. At this
stage, one should note that the physical compliance acts on the
conditioning in an equivalent way to a numerical regularization.

Friction phenomena are at the core of contact modeling,
as they precisely enable manipulation or locomotion tasks.
Coulomb’s law for dry friction represents the most common
way to model friction forces. This phenomenological law states
that the maximum friction forces ∥λT ∥ should be proportional
to the normal contact forces λN and the friction coefficient
µ. Mathematically, this suggests that contact forces should lie
inside an ice cream cone whose aperture is set by the coefficient
of friction µ:

nc(cid:89)

λ ∈ Kµ =

Kµ(i)

(10)

i=1

ith

the

refers

to the

product

is Cartesian,
contact point

the
superscript
where
and Kµ(i) =
(i)
(cid:8)λ|λ ∈ R3, λN ≥ 0, ∥λT ∥2 ≤ µ(i)λN
(cid:9). Additionally, when
sliding occurs, the maximum dissipation principle formulated
by Jean-Jacques Moreau [25] implies that the frictional forces
should maximize the dissipated power:

∀i, λ(i)

T = arg min

∥γT ∥≤µ(i)λ(i)
N

T c(i)
γ⊤

T

(11)

whose optimality conditions yield the following equation in
the sliding case:

∀i, λ(i)

T = −µ(i) λ(i)

N

c(i)
T
∥c(i)
T ∥

, if ∥c(i)

T ∥ > 0.

(12)

As for the Signorini condition, Coulomb’s law does not
describe a mapping but an infinitely steep graph (Fig. 3).
Relaxing this law via viscous frictions, i.e., assuming the

Signorini conditionrelaxed Signorini conditionDistance (m)Normal contact force (N)Coulomb lawrelaxed Coulomb lawTangent velocity (m/s)Friction force (N)tangent contact forces to be proportional
velocities, allows defining a mapping between λT and cT .

to the tangent

The Non-linear Complementarity Problem. Combining the
Coulomb’s law for friction with the Signorini condition evoked
earlier, we finally get three distinct cases corresponding to a
sticking contact point (13a), a sliding contact point (13c) or a
take-off (13b):

5






λ(i) ∈ ∂Kµ(i) , ∃α > 0, λ(i)

λ(i) ∈ Kµ(i), if c(i) = 0
λ(i) = 0, if c(i)
N > 0
T otherwise.

T = −αc(i)

Fig. 4. Underdetermined contact problem. The left and right contact forces
are solutions of the NCP (15) and lead to the same system velocity. Such an
undetermined problem can also occur on normal forces.

(13a)

(13b)

(13c)

where ∂K indicates the boundary of the cone. The equations
(13) are referred to as the disjunctive formulation of the contact
problem. However, such a formulation is unsuitable in practice
for solving, as the switching condition depends on the contact
point velocity c. As this quantity is an unknown of the problem,
one cannot know in which case of (13) one is standing. For
this reason, the problem is often reformulated as a nonlinear
complementarity problem (NCP). Indeed, using de Saxcé’s
bipotential function [67] defined as:

Γ : (c, µ) ∈ R3 × R (cid:55)→ [0, 0, µ∥cT ∥2]

(14)

one can show that (13) is equivalent to the following [27], [68]
(Fig. 1):

∀i, Kµ(i) ∋ λ(i) ⊥ c(i) + Γ

(cid:16)

c(i), µ(i)(cid:17)

∈ K ∗

µ(i) .

(15)

In (15), K ∗
and c ∈ K ∗
scalar product. It is worth noting that the relation K ∗
stands for second-order cones.

µ refers to the dual cone of Kµ, such that if λ ∈ Kµ
µ, then ⟨λ, c⟩ ≥ 0, where ⟨·, ·⟩ is the canonical
µ = K1/µ

a

is

(cid:74)
µ(i)

function w.r.t.

µ(i)
the distance

residuals as ϵ(i)

(cid:12)⟨λ(i), c(i) + Γ (cid:0)c(i), µ(i)(cid:1)⟩(cid:12)

Eq. (15) allows defining, for each contact i ∈
p = distK

1, nc
,
(cid:0)λ(i)(cid:1)
(cid:75)
the primal and dual
(cid:0)c(i) + Γ (cid:0)c(i), µ(i)(cid:1)(cid:1) respectively, where
and ϵ(i)
d = distK∗
distC
convex set
C.
It also induces a contact complementarity criterion
c = (cid:12)
ϵ(i)
(cid:12). From these per-contact cri-
teria, it is then possible to introduce a well-posed absolute
convergence criterion ϵabs for (15), as the maximum of ϵ(i)
p ,ϵ(i)
d
and ϵ(i)
for all i. We use this criterion as a stopping criterion
c
in our implementation of NCP solvers, but also as a measure
of physical accuracy in our experiments of Section IV. All the
previous derivations were made with λ being an impulse which
causes it, and thus the criteria ϵp,c, to be proportional to the
time step ∆t. However, it is preferable from the user-side to
have ϵc and ϵp not correlated to ∆t so the precision threshold
of the simulation ϵabs can be set independently of the time-step.
In practice, before solving we operate a change of variable to
directly work on the equivalent contact forces λ
∆t . This is done
∆t and c∗
by replacing g and c∗ by their scaled counterpart g
∆t
in the formulation of (15). For readability purposes, equations
are still written in impulse in what follows.

At this point, it is worth mentioning that the problem
(15), which we refer to as NCP, does not derive from a
convex optimization problem, thus making its solving complex.

Alternatively, one can see the frictional contact problem as
two interleaved convex optimization problems [69], [70], [36],
[71], [6] whose unknowns, λ and v, appear in both. Other
formulations exist and we refer to [68] for a more complete
review on the NCP. Practically, the non-convexity can induce
the existence of multiple, or even an infinite number of contact
forces satisfying (15). As mentioned earlier, this can be due to
normal forces, but tangential components can also cause under-
determination (Fig. 4). In this situation, it would be preferable
for a simulator to provide the minimum norm solution in forces.
This property can prevent a simulator from exhibiting internal
friction forces compressing or stretching the objects (Fig. 4,
right). Indeed, such forces may not coincide with the forces
observed by force sensors and would rather correspond to
some internal deformations of the objects, which should thus
be considered soft and no more rigid. In the following, we will
use the term “internal forces” to denote the force component
deviating from the minimum norm solution. Additionally, these
internal forces might also be problematic as it is difficult to
characterize them. This may induce inconsistent derivatives,
which become critical in the context of differentiable simulation.

Open-source frameworks for contact simulation. To con-
clude this section, we propose to review the open-source
software that
is popular in the robotics community and
that can be used for simulating contact. Simulating contact
interactions, as illustrated in Fig. 5, involves two main stages,
corresponding to the collision detection step (which objects are
in contact) and the collision resolution (which contact forces
are applied through the contact interaction). These frameworks
are enumerated in Tab. I.

More precisely, at each time step, a simulator must first detect
which geometries are colliding and compute their separation
vector Φ. The GJK and EPA algorithms are widely adopted
for their low computational cost. HPP-FCL [45], [46], [47],
an extension of the Flexible Collision Library (FCL) [72] and
libccd [73] implement them efficiently. Some simulators such
as Bullet [30], ODE [29] or PhysX [74] also re-implement the
same algorithm as an internal routine.

Once collisions are evaluated, one still requires the contact
points free velocity vf and Jacobians J to formulate (15).
These two quantities are efficiently computed via rigid body
algorithms [23]. The RBDL [75] or the Pinocchio library [24]
provide efficient implementations to evaluate them. In addition,

-mg𝝺(2)𝝺(1)-mg𝝺(2)𝝺(1)6

TABLE II
CHARACTERISTICS OF VARIOUS CONTACT MODELS.

Signorini

Coulomb MDP

LCP
CCP
RaiSim [33]
NCP

✓

✓
✓

✓
✓
✓

✓

✓

the various approximations and algorithmic techniques in the
literature to tackle this problem. As summarized in Tab. III, this
section is organized into subsections describing the four contact
models most commonly used in robotics, namely the linear
complementarity problem (LCP), the cone complementary
problem (CCP), RaiSim, and the nonlinear complementarity
problem (NCP). For each contact model, we also report the
related algorithmic variants. If each tick in Tab. III represents
a positive point for the concerned algorithm, Sec. IV shows
that even one missing tick may be prohibitive and can cause a
solver to be unusable in practice. Finally, we also mention a
set of useful implementation tricks that can be used to build
an efficient simulator.

A. Linear Complementarity Problem

A first way to simplify the solving of problem (15) is to
linearize the NCP problem by approximating the second-order
cone constraint from Coulomb’s law with a pyramid, typically
composed of four facets. This is done by replacing Kµ(i)
(cid:9). Doing so allows
by ˜Kµ(i) = (cid:8)λ|λN ≥ 0, ∥λT ∥∞ ≤ µ(i)λN
retrieving a linear complementarity problem (LCP), often easier
to solve [63]. Such a problem is more standard and better-
studied than its nonlinear counterpart as it already has a long
history of applications to frictional contacts [77], [78], [79],
[80].

Direct methods for LCP date back to the 1960s and are
available options in well-known simulators such as ODE [29]
and Bullet [30] which implement respectively the Lemke’s [81]
and Dantzig’s [82] algorithms. Under specific circumstances
[83], the algorithm is guaranteed to find a solution.

Projected Gauss-Seidel. Due to its easy implementation and
the possibility to early-stop it, the projected Gauss-Seidel (PGS)
algorithm (Alg. 1) algorithm represents an attractive alternative
and was widely adopted as the default solver by many physics
engines, such as in Bullet [30], PhysX [74], ODE [29], and
DART [31], [7] simulators. This iterative algorithm loops on
contact points and successively updates the normal and tangent
contact forces. Because PGS works separately on each contact
point, the update compensates for the current errors due to the
estimated forces from other contact points. Yet, as illustrated in
the experimental section IV, this process induces the emergence
of internal forces during the solving. Moreover, Gauss-Seidel-
based approaches are similar to what is also known as block
coordinate descent in the optimization literature. As first-order
algorithms, they do not benefit from improved convergence

Fig. 5. Simulation routines. When simulating rigid bodies with frictional
contacts, a physics engine goes through a sequence of potentially challenging
sub-problems: collision detection, contact forces computation, and integration
time step.

TABLE I
OPEN SOURCE TOOLS FOR PHYSICS SIMULATION IN ROBOTICS.

License

API

Used by

FCL [72]

Collision detection
BSD

C++

libccd [73]

BSD

C++, Python

HPP-FCL [45]
Bullet [30]
ODE [29]
PhysX [74]

BSD
BSD
BSD/GPL
BSD 3

C++, Python
C++, Python
C++, Python
C++, Python

DART, Drake
MuJoCo, Drake,
FCL, Bullet, ODE
Pinocchio
DART
DART

Rigid body dynamics algorithms

Pinocchio [24]
RBDL [75]
Drake [34]

BSD
zlib
BSD3

C++, Python
C++, Python
C++, Python

MuJoCo [32]
DART [31]
Bullet [30]
Drake [34]
ODE [34]
PhysX [74]

Forces computation
C++, Python
C++, Python
C++, Python
C++, Python
C++, Python
C++, Python

Apache 2.0
BSD 2
BSD
BSD 3
BSD/GPL
BSD 3

Pinocchio proposes a direct and robust way to compute the
Cholesky decomposition of the Delassus matrix G [54]. These
algorithms are also embedded as internal routines in various
simulators such as MuJoCo [32], DART [31], Drake [34], Bul-
let [30] or ODE [29], but they often are only partially exposed
to the user.

Eventually, when all quantities necessary to formulate the
NCP (15) are computed, the simulator has to call a solver.
Every simulator, i.e. MuJoCo [32], DART [31], Bullet [30],
Drake [34] and ODE [29], proposes its own implementation.
This procedure varies greatly depending on the physics engine,
as each has its own physical and numerical choices. In the
next section, we detail the existing algorithms.

III. ALGORITHMIC VARIATIONS OF THE CONTACT PROBLEM

As explained in the previous section, the nonlinear com-
plementarity problem (15) does not derive from a variational
principle but can be formulated as variational inequalities
[68]. Thus, classical numerical optimization solvers cannot
be used straightforwardly to solve it. This section studies

7

TABLE III
CHARACTERISTICS OF NUMERICAL ALGORITHMS.

Hard contacts

No internal forces

Robust

Convergence guarantees

LCP
PGS [30], [29], [74], [31]
Staggered projections [36]

CCP

PGS [76]
MuJoCo [32]
ADMM (Alg. 3)
Drake [35]

RaiSim [33]
NCP

PGS
Staggered projections [6]

✓
✓

✓

✓

✓

✓
✓

✓

✓
✓
✓

✓

✓

✓
✓
✓

✓

✓
✓
✓
✓

Algorithm 1: Pseudocode of the projected Gauss-Seidel
(PGS) algorithm for solving LCPs.

Input: Delassus matrix: G, free velocity: g, friction

cones: Kµ
Output: Contact forces: λ

3

1 for k = 1 to niter do
for i = 1 to nc do
2
λ(i)
N ← λ(i)
N − 1
G(ii)
N N
N ← max(0, λ(i)
λ(i)
N );
T ← λ(i)
λ(i)
T −
T ← clamp(λ(i)
λ(i)

4

5

6

1
min(G(ii)
T , µiλN );

TxTx

,G(ii)

Ty Ty

(Gλ + g)(i)
N ;

end

7
8 end

(Gλ + g)(i)
T ;

)

Fig. 6. Cone linear approximation. Linearizing the friction cone induces
a bias in the direction of friction forces. The MDP tends to push tangential
forces toward the corners of the pyramid.

rates or robustness with respect to their conditioning, unlike
second-order algorithms.

In parallel, the linearization of the second-order cone causes
the loss of the isotropy for friction, as stated by Coulomb’s law.
By choosing the axes for the facets of the pyramid and due to
the maximum dissipation principle, it is established that one
incidentally biases the friction forces towards the corners [84],
[85], as illustrated in Fig. 6. This error is sometimes mitigated
by increasing the number of facets, which also comes at the
cost of more computations.

B. Cone Complementarity Problem.

An alternative approach consists of approximating the
NCP problem in order to transform it into a more classical
convex optimization problem. By relaxing the complementarity
constraint from (15), one can obtain a Cone Complementarity
Problem (CCP) [86]:

Kµ ∋ λ ⊥ c ∈ K ∗
µ

(16)

If this relaxation preserves the Maximum Dissipation Principle
(MDP) and the second-order friction cone, it loses the Signorini

condition (8). Indeed, re-writing the complementarity of (16)
yields:

N + λ(i)
and if the ith contact point is sliding, the MDP (12) leads to:

c(i)
T = 0,

∀i, λ(i)

N c(i)

(17)

T

⊤

N c(i)
λ(i)

N − µ(i)λ(i)

N ∥c(i)

T ∥2 = 0,

(18)

which is equivalent to the following complementarity condition:

N ⊥ (c(i)
λ(i)

N − µ∥c(i)

T ∥2).

(19)

(19) indicates that the CCP approximation allows for simulta-
neous normal velocity and forces, contrary to (8). In practice,
this results in objects interacting at distance when contact
points are sliding. In its seminal work [86], Anitescu shows
the interaction distance to be ∆tµ∥c(i)
T ∥. It is worth insisting
on the fact that such an artifact only emerges in the case of
a sliding contact and can be mitigated, and even controlled,
with smaller time steps and sliding velocities. Moreover, it is
still under debate to determine if this behavior is prohibitive
for robotics applications.

Because CCP (16) approximates the NCP (15), the con-
vergence is checked via a different criterion. In fact, in the
same way, the De Saxcé correction was ignored in (16),
a convergence criterion is obtained by removing this term

Algorithm 2: Projected Gauss-Seidel (PGS) algorithm
for the dual Cone Complementarity Problem (CCP)
Input: Delassus matrix: G, free velocity: g, friction

Algorithm 3: ADMM algorithm for the dual Cone
Complementarity Problem (CCP)
Input: Delassus matrix: G, free velocity: g, friction

8

cones: Kµ
Output: Contact forces: λ

1 for k = 1 to niter do
for i = 1 to nc do
2
λ(i) ← λ(i) −
λ(i) ← projKµi

3

4

3
G(ii)
N N +G(ii)
(λ(i));

TxTx

end

5
6 end

(Gλ + g)(i);

+G(ii)

Ty Ty

cones: Kµ
Output: Contact forces: λ

1 ˜G−1 ← (G + ρId)−1 ;
2 for k = 1 to niter do
3

λ ← − ˜G−1(g − ρz + γ);
(λ + γ
z ← projKµ
ρ );
γ ← γ + ρ(λ − z);

4

5
6 end

from the dual convergence criterion ϵd of the NCP introduced
previously.

PGS. The PGS algorithm can be directly adapted to handle
the CCP problem [76] (Alg. 2) but inherits from the first-order
convergence rates ([76] exhibits in the order of hundreds of
iterations to converge in general). In the light of what follows,
the algorithm even becomes equivalent to a projected gradient
descent which is a classical constrained optimization technique.

Optimization on the dual. The problem (16) can, in fact, be
viewed as the Karush-Kuhn-Tucker conditions of an equivalent
Quadratically Constrained Quadratic Programming (QCQP)
problem:

min
λ∈Kµ

1
2

λ⊤Gλ + g⊤λ

(20)

Once the contact problem is formulated as an optimization
problem, any optimization algorithms can be employed to
solve it and classical optimization theory provides convergence
guarantees. Here, we propose to study an ADMM algorithm
[87], an advanced first-order algorithm known to be efficient to
reach mild accuracy and which can stall when further improving
the solution. As pointed out in [32], Interior Point algorithms
[88] could also be used to reach higher precision solutions even
though we do not find them in any of the robotics simulators
here mentioned. A benefit of using the family of proximal
algorithms like ADMM is their natural ability to handle the
numerical issues coming from ill-conditioned and hyper-static
cases [89], [90]. This property makes it possible to accurately
simulate hard contacts, i.e., without any shift due to compliance
R = 0, and is reported in Tab. III by the "hard contacts"
column. Another by-product of such methods is the implicit
regularization they induce on the found solution, which removes
the potential internal forces. This last property is an empirical
observation resulting from the experimental section IV and, to
our knowledge, has not yet been proven by the literature of
proximal optimization. Therefore, it remains to be confirmed
by subsequent work.

One may argue that such algorithms require to compute G−1
(Alg. 3, line 3) while per contact approaches repeatedly solve
for each contact point individually, and thus only require the
cheap inverse of diagonal blocks from G (Alg. 1, lines 3,5,
Alg. 2, line 3, Alg. 5, line 4, Alg. 6, lines 3,5). However, the

recent progress [54] demonstrated the Cholesky decomposition
of G can be computed efficiently and robustly. We detail this
point later when discussing implementation tricks, at the end
of this section. Exploiting the knowledge of G−1 and not the
block components as in the "per-contact" approaches mentioned
earlier allows us to capture the coupling between all contact
points.

Optimization on the primal. By reverse engineering, it is
possible to form an optimization problem on joint velocities
v whose dual would be (20). This approach is adopted in
both MuJoCo[32] and Drake[35] and results in the following
optimization problem:

min
v,y

1
(cid:13)v − vf (cid:13)
(cid:13)
2
M +
(cid:13)
2
s.t. Jv − y ∈ K ∗
µ
√

1
2

∥y − c∗∥2

R−1

(21)

x⊤Xx with X ≻ 0. Working on the
where ∥x∥X =
equations, this problem can be formulated as an unconstrained
optimization problem:

min
v

lp(v) =

1
2

(cid:13)v − vf (cid:13)
(cid:13)
2
M +
(cid:13)

1
2

∥P R
Kµ

(y(Jv))∥2
R

(22)

(y) = arg minγ∈Kµ ∥γ − y∥2

where P R
R; y(c) = −R−1(c −
Kµ
c∗); and which is viable only when R is non-null. The latter
condition makes it impossible to model hard contacts. As
evoked earlier, this is equivalent to replacing G by ˜G = G + R
in the quadratic part of (20), which is justified by a compliant
contact hypothesis. Indeed, R corresponds to a compliance,
which should be a material property of the objects involved
in the collision. However, MuJoCo arbitrarily sets this to the
diagonal of αG, where α ∈ [0, 1] is close to 0. This choice
has no physical justification (at least, without making strong
assumptions that are not met in practice), and its only intent is
to improve the conditioning of the problem to ease the solving
and artificially make the solution unique. Moreover, R has non-
null tangential components and thus may also introduce some
tangential "compliance" which corresponds to the relaxation
of Coulomb’s law (Fig. 3). In fact, this should instead be
interpreted as a Tikhonov regularization term enforcing the
strict convexity of the problem to facilitate the numerics
and the existence of both the forward and inverse dynamics
computation at the cost of shifting, even more, the solution.
Drake’s algorithm [35] improves this point by providing a more
physical way of setting R.

Algorithm 4: Newton algorithm for the primal Cone
Complementarity Problem (CCP)
Input: Inertia matrix: M , Jacobian of contacts: J,

compliance: R, free velocity: vf , friction cones:
Kµ

Output: Joint velocity: v

9

(y(Jv));

1 for k = 1 to niter do
2

∇vlp ← M (v − vf ) − J ⊤P R
Kµ
H ← M + J ⊤∇vP R
Kµ
∆v ← −H −1∇vlp ;
α ← arg minβ lp(v + β∆v) ;
v ← v + α∆v ;

(y(Jv))J ;

3

4

5

6
7 end

Both Drake and MuJoCo use a Newton solver to tackle
(22) (Alg. 4). Due to the non-linearity of the second term
of (22), this approach requires updating the inverse of the
Hessian at every iteration (Alg. 4,line 3). As proposed in
[35], the use of advanced algebra routines allows to reduce
the computational burden of each step. In this work, we
provide an implementation of the Newton algorithm with an
Armijo backtracking line search (using parameters from [35]).
MuJoCo and Drake additionally implement an exact line search
which improves performance and this difference should be
kept in mind when interpreting the results obtained with our
implementation.

C. Raisim contact model

A contact model

introduced in [91] and implemented
in the RaiSim simulator [33] aims at partially correcting
the drawbacks from the CCP contact model exploited in
MuJoCo [32] and Drake [34]. As explained earlier, the CCP
formulation relaxes the Signorini condition for sliding contacts,
leading to positive power from normal contact forces. The
contact model proposed in [91] fixes this by explicitly enforcing
the Signorini condition by constraining λ(i) to remain in the
N = {λ|G(ii)
null normal velocity hyper-plane V (i)
N = 0}
where ˜g(i) = g(i) + (cid:80)
j̸=i G(ij)λ(j) is the ith contact point
velocity as if it were free. Here, we generalize the use of the
subscript and the superscript introduced previously to matrices,
where a second superscript (or subscript) corresponds to a
slicing operation on the columns e.g. G(ij) ∈ R3×3 denotes
the sub-block of G whose rows are associated to the ith contact
and columns to the jth contact. For a sliding contact point, the
problem (20) becomes:

N λ + ˜g(i)

min
µ(i) ∩V (i)

N

λ∈K

1
2

λ⊤G(i)λ + ˜g(i)⊤λ

(23)

The new problem (23) remains a QCQP and [33] leverages
the analytical formula of the ellipse Kµ(i) ∩ V (i)
N in polar
coordinates to tackle it as a 1D problem via the bisection
algorithm [92] (Alg. 5, line 10). We refer to the original
publication for a more detailed description of the bisection
routine [33].

This approach implies several drawbacks. Indeed, it requires
knowing whether a contact point is sliding, which cannot be

Fig. 7. Bisection algorithm. When the contact point is sliding, λ(i)
v0 (Alg. 5,
line 4) lies outside the friction cone Kµ(i) , leading to a non-null tangential
contact velocity c(i). In this case, RaiSim solves (23). This is equivalent to
finding the λ ∈ Kµ(i) ∩ V (i)
v0 under the metric
defined by G(ii). The constraint set being an ellipse, the problem boils down
to a 1D problem on θ using polar coordinates. This figure is inspired from
Fig. 2 of [33].

N which is the closest to λ(i)

known in advance as the contact point velocity depends on the
contact forces. Thus, some heuristics, based on the disjunctive
formulation of the contact problem (13), are introduced to try
to guess the type of contact which will occur, i.e. take-off
(Alg. 5, line 5), sticking (Alg. 5, line 7) or sliding (Alg. 5,
line 9). Such heuristics may be wrong, which may cause the
algorithms to get stuck and lose convergence guarantees. This
effect is strengthened by the caveats of the per-contact loop,
which additionally make RaiSim not robust to conditioning and
prone to internal forces. Eventually, if adding the constraint
λ(i) ∈ V (i)
N allows retrieving the Signorini condition from the
CCP model, it also induces the loss of the maximum dissipation
principle. Writing the Karush Kuhn Tucker (KKT) conditions
of the problem (23) and some algebra manipulations yields:

T ∝ −λ(i)
c(i)

T −

µ(i)2
λ(i)
N
G(ii)
N N

G(ii)
N T

(24)

which contradicts (12).

The problem solved by RaiSim depends on the contact mode,
e.g. (23) is solved only for a sliding contact and would require
the computation of the unknown dual variable. Therefore, it is
more complex to define a proper convergence criterion than
in previous cases (15) and (16). In this respect, either a fix-
point criterion i.e the distance between two consecutive iterates,
or the previously defined NCP criterion (15) can be used to
coarsely monitor convergence. We chose the latest in order to
have a criterion homogeneous to the ones used for (15) and
(16).

D. Tackling the NCP

Despite the non-smooth and non-convex issues described
previously, some simulation algorithms aim to directly solve
the original NCP problem [79], [68], [37], [8].
PGS. The PGS algorithm exploited for LCP and CCP problems

Algorithm 5: Per-contact bisection algorithm

Algorithm 7: Staggered projections algorithm

Input: Delassus matrix: G, free velocity: g, friction

Input: Delassus matrix: G, free velocity: g, friction

cones: Kµ

cones: Kµ

Output: Contact forces: λ, velocity: v

Output: Contact forces: λ, velocity: v

10

3

4

1 for k = 1 to niter do
for i = 1 to nc do
2
˜g(i) ← g(i) + (cid:80)
v0 ← −G(ii)−1
λ(i)
if ˜g(i)
N > 0 then
// takeoff
λ∗ ← 0;
else if λ(i)

7

6

5

j̸=i G(ij)λ(j);
˜g(i);

v0 ∈ Kµ(i) then

// stiction
λ∗ ← λ(i)
v0 ;

else

// sliding
λ∗ ← bisection(G(ii), ˜g(i), Kµ(i) , λ(i)
v0 );

end
λ(i) ← (1 − α)λ(i) + αλ∗;
α ← γα + (1 − γ)αmin ;

8

9

10

11

12

13

end

14
15 end

Algorithm 6: Projected Gauss-Seidel (PGS) algorithm
for Non-linear Complementarity Problem (NCP)
Input: Delassus matrix: G, free velocity: g, friction

cones: Kµ

Output: Contact forces: λ, velocity: v

3

1 for k = 1 to niter do
for i = 1 to nc do
2
λ(i)
N ← λ(i)
N − 1
G(ii)
N N
N ← max(0, λ(i)
λ(i)
N );
T ← λ(i)
λ(i)
T −
λ(i)
T ← projµiλ(i)

1
min(G(ii)
(λ(i)
T );

5

4

6

TxTx

N

end

7
8 end

(Gλ + g)(i)
N ;

(Gλ + g)(i)
T ;

,G(ii)

Ty Ty

)

can easily be adapted to the NCP case by changing the
clamping step (Alg. 1,line 6) or the normal projection (Alg. 2,
line 4) for a horizontal projection on the cone (Alg. 6, line 6).
However, it is worth noting that such approaches have fewer
convergence guarantees than their relaxed counterpart [27]. As
with every Gauss-Seidel approach, the methods inherited from
the sensitivity to ill-conditioning and jamming internal forces.

Staggered-projections. The staggered projections (Alg. 7)
approach, appearing in [69], [70] and implemented in a
simulator in [36], [6], proceeds by rewriting the NCP as
two interleaved optimization problems. This interconnection is
solved via a fix-point algorithm that repeatedly injects one
problem’s solution into the formulation of the other. The
staggered projection algorithm has no convergence guarantees
but was heavily tested and seems, in practice, to converge most

1 for k = 1 to niter do
2

˜gN ← gT + GN T λT ;
1
λN ← arg minλ≥0
˜gT ← gT + GT N λN ;
λT ← arg min∥λ(i)∥≤µiλ(i)

N

3

4

5

6 end

2 λ⊤GN λ + ˜gN

⊤λ;

1

2 λ⊤GT λ + ˜gT

⊤λ;

of the time in a few iterations (typically five iterations [6]).
Solving a cascade of optimization problems allows the use
of robust optimization algorithms (e.g., ADMM), but remains
more costly than other approaches.

E. Implementation details

In practice, the performances of contact solvers can be

improved by a few simple tricks.

Warm-starting the solver by providing the contact forces from
the previous time step allows to greatly reduce the required
computation. Indeed, in the case of a persisting contact between
two objects, the contact forces are being cached and reused
as an initial guess when solving for the contact forces of the
next time step. This relies on the ability of the contact solver
algorithm to be warm-started. This excludes Interior Point [88]
algorithms, as they would only benefit from an initial guess
close to the so-called central path [89]. By contrast, the feasible
set of contact forces may change from one time step to the
other, even in the case of a persisting contact point. On the
opposite, ADMM and, more generally, Augmented Lagrangian
(AL) methods can naturally be warm started: not only the
primal (i.e., contact velocities) and dual (i.e., contact forces)
variables, but also the proximal parameter is initialized with
the previous values.

Cholesky computation. In addition, second-order algorithms
can further exploit the recent progress in rigid body algorithms
[54]. This work takes advantage of the sparse structure of the
kinematic chains in order to efficiently compute the Cholesky
decomposition of the Delassus matrix G. This approach is
robust enough to handle the case of hyperstatic systems
and reduces the cost of the computation of matrix-vector
products involving G−1 (Alg. 3, line 3). This also indicates
that evaluating G from its Cholesky decomposition, as required
by per-contact approaches, actually constitutes an additional
cost.

Proximal parameter adaptation. In the context of ADMM
(Alg. 3),
the algorithm from [54] can also be favorably
combined with the adaptation of the proximal parameter. Indeed,
updating the regularized Cholesky can be done at almost no
cost by using [54]. In our implementation, we follow the work
from [93] to detect when and how ρ should be adapted. More

11

Fig. 8. Robotics systems used for the experiments. The Solo-12 quadruped (Left), the Talos humanoid (Center), and the Allegro hand (Right) allow to
respectively exhibit locomotion, high-dimensional, and manipulation contact scenario.

precisely, whenever the primal residual is significantly greater
than the dual one (a threshold for the ratio has to be set,
a typical value being 10), ρ should be increased in order to
better enforce the constraint of the problem and thus, reduce the
primal residual. The proximal parameter ρ is then updated via a
spectral rule which multiplies it by κ0.05, κ being the condition
number of the Delassus matrix, defined as the ratio between the
largest and the smallest eigenvalues. Conversely, whenever the
dual residual dominates the primal one, ρ should be decreased
by dividing it with the same factor. The condition number κ
can be efficiently evaluated beforehand via a power-iteration
algorithm whose iterates have a computational cost equivalent
to the ones from the ADMM algorithm. This procedure is
detailed and evaluated in [93]. Alternatively, we could use a
linear update rule for ρ as it is done in OSQP [94] which
would be less efficient in the case of ill-conditioned problems.

Over-relaxation. Additionally, over-relaxation is often em-
ployed to accelerate the convergence of both Gauss-Seidel
and ADMM algorithms. This technique applies the following
update:

λ ← αλ− + (1 − α)λ,

(25)

where α ∈ ]0, 2[ and λ− denotes the previous iteration. For
α > 1, over-relaxing consists of an extrapolation step and
should be carefully used, as it may also hinder convergence.
Typically, setting α to 0.8 improved convergence of the PGS
algorithm.

Several factors may hinder the correctness and accuracy of

simulators based on time-stepping methods:

i) the low accuracy of the solver of the contact problem;
ii) the limitation from the contact model itself;
iii) or the numerical integration due to the time discretization

scheme.

In this section, we first evaluate the error from sources
i) and ii) (Sec. IV-A). The source of error i) is evaluated
by measuring the time taken to reach a given accuracy. The
errors from ii) are analyzed by measuring the residual for
an (approximately) infinite time budget. We further assess i)
and iii) by examining the sensitivity of the contact solvers
with respect to respectively the stopping criterion value ϵabs
and the time-step ∆t (Sec. IV-B). Sec. IV-C evaluates their
computational efficiency. Finally, Sec. IV-D explores how the
contact models and their implementations can impact the final
robotics applications, in the case of the MPC for quadruped
locomotion.

Except where expressly indicated, we use the following
values for the solvers’ parameters: an absolute convergence
criterion ϵabs = 10−6, a maximum number of iteration niter =
104 and a time-step ∆t = 1ms. For the ADMM algorithm,
the proximal parameter ρ is adapted dynamically as previously
detailed (Sec. III-E).

A. Evaluation of physical correctness

IV. EXPERIMENTS

In this section, we evaluate the performances and behaviors
of the formulations explained in Sec. III. To fairly compare
and benchmark the various algorithmic formulations, we
have implemented them in a unified C++ framework called
ContactBench. In the following, we denote by RaiSim and
Drake our re-implementation of the contact solvers described
in the corresponding papers [33], [35]. For Drake, it is worth
noting that our implementation uses a backtracking line-search
with an Armijo condition instead of the line-search proposed in
the original paper [35]. Our framework extensively relies on the
Pinocchio library [24] for rigid body algorithms and HPP-FCL
[45], [56] implementation of GJK and EPA for collision detec-
tion. Our code is made open-source in the Contactbench C++
library (https://github.com/Simple-Robotics/contactbench).

LCP relaxation. The linearization of the friction cone loses the
isotropy and biases the friction forces towards some specific
directions, as shown in Fig. 6. This observation has already been
raised in the literature [84], [95], [85], [6], [8]. As expected, the
bias on the contact forces significantly impairs the simulation
by deviating the trajectory of the simulated system (Fig. 9).

CCP relaxation. As detailed previously, the CCP contact
model relaxes the Signorini condition. As shown in Fig. 10,
this results in non-null normal contact forces and velocities
when a contact point is sliding. As a consequence, the contact
points start to bounce, which modifies the trajectory of the
system (Fig. 10, left), which also impacts the overall dissipated
energy (Fig. 10, right). The model adopted by Raisim aims
at correcting this undesired phenomenon by enforcing the

12

Fig. 9. Trajectory of a cube sliding on a plane. The cube is initialized
with an initial tangential velocity along the x-axis. Right: The bias of friction
forces (Fig.6) introduces a tangential velocity along the y-axis, which deviates
the cube from the expected straight-line trajectory.

Fig. 10. A cube is initialized on a plane with a tangential velocity along
the x-axis, similarly to the case studied in Fig. 9. Left: The CCP contact
model relaxes the Signorini condition, which induces unphysical forces leading
to the vertical bouncing of the cube. Right: From the MDP, it is possible to
determine the evolution of the energy of the system analytically and compare it
to what is computed by the various simulation algorithms. The CCP relaxation
induces a significant gap with the analytical solution. The RaiSim contact
model narrows this gap but dissipates less power than expected, as it does not
always enforce the MDP. The NCP formulation, solved using the PGS solver,
is the only formulation that closely matches the expected analytical behavior
of the system.

Signorini condition but still does not match the analytical
solution due to its relaxation of the MDP (24) (Fig. 10, right).
In Figure 11, we simulate a cube dragged on a plane and
measure the integral error between the trajectory obtained with
the CCP/ADMM solver with various ∆t and a reference one
computed via the NCP/PGS solver with small time step ∆t =
10−5s. The deviation from the reference trajectory is quantified
via the integral consistency error defined as (cid:80)T
τ =0 ∥qτ −qτ ∥∆t.
As detailed in Sec. III-B, the error between the trajectories
obtained with the CCP and NCP models is proportional to the
time step ∆t.

Underdetermined contact problems. Underdetermination

Fig. 11. Applying a linearly growing force along the x-axis to a cube
on a plane. The cube has a mass of 1kg, a side length of 0.2m, a friction
coefficient of 0.4 and the external force grows linearly from 0 to 20N over 1s.
This induces relatively high velocities in a robotic context that are useful for
illustrative purposes here.

Fig. 12. A cube is dragged on a plane along the x-axis similarly to the
case studied in Fig. 11. Left: The cube is at stiction before it starts sliding
after approximately 0.25s. The tangential velocity differs depending on the
contact model e.g. RaiSim violates the MDP leading to contact points sliding
faster than in the case of NCP. Right: At stiction, multiple combinations of
tangential forces may lead to the same trajectory. There are four curves for
each contact model, each curve accounting for the y-component from one of
the four contact forces on the cube. Gauss-Seidel-like solvers, e.g. RaiSim and
PGS, exhibit internal forces "stretching" the cube at stiction before the MDP
enforces these forces to disappear when the cube starts to slide. RaiSim relaxes
the maximum dissipation principle so the friction forces are not opposed to the
movements, and internal forces persist when the cube is sliding. Eventually,
ADMM avoids injecting jamming internal forces even at stiction.

occurs when infinite combinations of contact forces lead to
the same trajectory. These artifacts happen on the normal
and tangential components of contact forces, as depicted in
Fig. 12. As shown in Fig. 12, the solution found depends on the
numerical scheme. We observe that the per-contact approaches
(Alg. 2,5 and 6) exhibit jamming internal forces at stiction,
values which are not controlled by the algorithms. On the
opposite, the algorithms working directly on the global contact
problem with a proximal regularization (Alg. 3 and 7) seem to
avoid injecting such artifacts in the contact forces (Fig. ,12).
As future work, it would be interesting to investigate the theory
behind the latter conjecture.

This phenomenon may seem innocuous as forward dynamics
are not affected. However, it makes the inverse dynamics ill-
posed, as there is no way to predict such numerical artifacts.
Additionally, in the context of differentiable physics, we believe
these spurious contact forces may catastrophically impact the
computation of derivatives, but we also leave this study as
future work. Finally, it is worth mentioning that such under-
determined cases are ubiquitous in robotics (e.g., legged robots
making redundant contact with their environments).

Robustness to ill-conditioned contact problems. More
generally, the contact problem becomes challenging when the
ratio between the biggest and the smallest eigenvalue of the
Delassus matrix grows. The experiment of Fig. 13 exhibits the
convergence issues of per-contact approaches when simulating
systems with a strong coupling between the different contact
points, which causes large off-diagonal terms on the matrix
G. In this situation, the latter approaches hit the maximum
number of iterations before convergence, leading to unrealistic
trajectories. Such a behavior can be expected as supposing
the matrix to be diagonally dominant is a classical hypothesis
ensuring the convergence of Gauss-Seidel methods. On the
contrary, the proximal algorithms account for off-diagonal terms
of G, and only rely on a regularized inverse of G (Alg. 3,
line 1), and thus robustly converge towards an optimal solution.

v0yzxg1.00.80.60.40.20.00.20.40.6x coordinate (m)0.000.020.040.060.080.100.120.14y coordinate (m)LCP/PGSNCP/PGSAnalytical0.00.10.20.30.40.5Time (s)0.0000.0020.0040.0060.0080.0100.012z coordinate (m)CCP/PGSNCP/PGS0.00.10.20.30.40.5Time (s)0.00.10.20.30.40.5Mechanical energy (J)CCP/PGSNCP/PGSRaiSimAnalytical105104103102101t104103102101Error (m)CCP/ADMM0.00.10.20.30.40.5Time (s)0.00.20.40.60.81.01.21.4Velocity (m/s)NCP/PGSCCP/ADMMCCP/PGSRaiSim0.00.10.20.30.40.5Time (s)21012Internal forces (N)CCP/ADMMCCP/PGSRaiSim13

when increasing ∆t while CCP leads to a nonphysical and
inconsistent behavior.

C. Performance benchmarks

As evoked earlier, in addition to being physically accurate,
it
in
is also essential for a simulator to be fast, which,
general, constitutes two adversarial requirements. To evaluate
the computational footprint of the various solvers, we measure
both the number of iterations and the time taken to reach a fixed
accuracy on dynamic trajectories involving robotics systems
(Fig. 8). This is done on three different robotics scenarios: the
quadruped Solo (12-dof) and the humanoid Talos (32-dof) are
in a standing position and perturbed by applying an external
force (of respectively 10N and 80N) at their center of mass,
while a ball is dropped in the Allegro hand (16-dof), so the
trajectories are not static.

Looking at the number of iterations required to converge
(Fig. 16), PGS approaches appear to be reasonably fast to
reach mild accuracy (ϵabs = 10−5) while they eventually
saturate before reaching high precision in complex scenarii
(Fig. 16, bottom). We show later this can be insufficient for
challenging tasks (Fig. 19). On the other hand, ADMM, Newton
and Staggered Projections algorithms can find high-accuracy
solutions using only a few, but more costly, iterations. As
mentioned earlier, our implementation of Drake’s solver uses
a backtracking line search with an Armijo condition while the
original algorithm [35] uses a more advanced routine. This
difference could lead to degraded performances here which
should be kept in mind when interpreting the results.

The latter analysis does not account for the per-iteration
computational cost, so we report a study on final timings in
Fig. 17. As they work with various contact model hypotheses
and thus have different convergence criteria, it is challenging
to make a fair comparison between the solvers. Therefore,
we choose to run the solvers in the setup they are usually
used in practice: the solver is stopped whenever it reaches an
absolute convergence threshold (ϵabs = 10−6) or otherwise, it is
early-stopped if a maximum number of iteration (niter = 104) is
reached or stalling is detected via relative convergence criterion
(ϵabs = 10−8). For this reason, Fig. 17 is only informative about
the computational cost but not about the accuracy of solvers.
When the contact solvers are cold started, we observe that
the second-order optimization techniques [32], [35] are less
efficient than the PGS solvers and their cheap per-contact
iterations (Fig. 17, left). The advanced first-order algorithms
like ADMM (Alg. 3) working on the dual CCP problem
(20) stands in-between as they leverage the very efficient
Featherstone algebra [54] for the computation of the Cholesky
factorization of G (Sec. III-E). However, leveraging the solution
from the previous time step to warm-start the solvers — a
common strategy in practice — allows for significantly reducing
this gap (Fig. 17, right). Therefore, regarding the study of
Sec. IV-A, a trade-off appears for algorithms like ADMM,
which treat all the contact points globally. In practice, they
might be slower than their PGS counterpart while they benefit
from better behaviors on ill-conditioned problems.

Fig. 13. Simulation of ill-conditioned systems. Left: Stacking a heavy
cube (103kg) on a light one (10−3kg) makes the problem ill-conditioned
and, therefore, not solvable via per-contact algorithms (CCP/PGS, NCP/PGS
and RaiSim) which results in the violation of the contact complementarity
criterion (15). By contrast, the ADMM, staggered projections, and Newton
approaches appear to be robust in this case. Right: The accuracy of the
simulators improves when the ratio between the masses of the two cubes gets
close to one. The ADMM and Newton algorithms are less affected by this
ratio than PGS.

Effects of compliance. As demonstrated by Fig. 14, the
normal forces vary linearly with the compliance parameter
R. Moreover, adding compliance to the tangential components
induces the vanishing of dry friction, resulting in tangential
oscillations instead of a null velocity. These compliant effects
regularize the infinitely steep graphs due to the Signorini
condition and Coulomb’s law and replace them with locally
linear mapping, which also eases the numerics. Therefore, the
compliance added in MuJoCo has no physical purpose and
should be considered a numerical trick designed to circumvent
the issues due to hyper-staticity or ill-conditioning at the cost
of impairing the simulation.

B. Self-consistency of the solvers

The accuracy of simulators can be affected by the numerical
resolution induced by two "hyper-parameters": the value of the
stopping criterion for the contact solver desired accuracy (ϵabs)
and the time-step value (∆t). We measure their effect on
the simulation quality when varying them independently. A
simulator is said to be self-consistent when this deviation
remains limited.
Time-stepping simulators are sensitive to the choice of the
time-step ∆t. Here, we intend to assess the self-consistency
of the various contact solvers by examining their deviation
when ∆t grows. Because time discretization also affects the
collision detection process, our study is done on the trajectory
of a cube dragged on a plane by a growing tangential force
and whose contact points should remain constant (as done in
Fig. 11). This scenario also allows to asses both sticking and
sliding modes. For each simulator, a trajectory q obtained by
simulating the system with a small time-step (∆t = 10−2ms)
serves as a reference to compute the state consistency error
along the trajectories simulated with larger time-steps (Fig. 15).
Looking at Fig. 15, we observe that the CCP contact model
is more sensitive with respect to the time step in the considered
scenario. Indeed, because CCP relaxes the Signorini condition,
the cube slides at a height proportional to ∆t. Similarly,
as shown by Fig. 15, the energy evolution of the system
simulated via NCP and RaiSim models is only a little modified

0.000.020.040.060.080.10Time (s)1016101410121010108106104102100102104Contact complementarity (c)CCP/ADMMCCP/PGSNCP/PGSNCP/StagProjRaiSimCCP/Newton100101102103104105106Mass ratio10131010107104101102NCP criterionCCP/ADMMCCP/PGSDrake14

Fig. 14. Simulation of Solo-12 with varying compliance for the contacts with the floor. The robot is in a standing position and perturbed with an external
horizontal force. Left: Adding a compliance to the contact model relaxes the Signorini condition. Center: This compliance also relaxes the Coulomb’s law of
friction. Right: Compliance also regularizes the problem, removing the jamming internal forces in the under-determined cases.

Fig. 16. Convergence for contact problems on Solo (Top) and Talos
(Bottom) robots. The considered contact problems are extracted from one
time step of the full trajectory. PGS is fast to reach a mild accuracy before
saturating, while ADMM and second-order algorithms can get to higher
precision.

Fig. 15. Self-consistency w.r.t. time-stepping when simulating a cube
dragged on a plane by a growing tangential force. The CCP contact model
appears to be more sensitive to the time step ∆t. This sensitivity can also be
observed through the evolution of mechanical energy.

D. MPC for quadruped locomotion

The previous examples already illustrate the differences
among the various simulators in terms of both physical accuracy
and computational efficiency. However, such scenarios may not
represent the richness of contacts in practical robotics situations.
For this purpose, we use the implementation of MPC on the
Solo-12 system introduced in [96] to generate locomotion
trajectories on flat and bumpy terrains. These experiments are
designed to involve a wide variety of contacts (i.e., sticking,
sliding, and taking-off) and see how the simulation choices
impact the final task (i.e., horizontal translation of the robot).
For a flat and barely slippery (µ = 0.9) ground, we observe
that the choice of simulator hardly affects the base velocity
tracked by the MPC controller (Fig. 18, top right). In this case,
the contacts are mainly sticking, leading to low violation of
the NCP criterion (15) (Fig. 18, bottom left).

When the terrain is bumpy (roughness of 10−1m) and
slippery (µ = 0.3), the locomotion velocity generated from
the RaiSim and CCP models significantly deviates from the
NCP one (Fig. 19, top right). This can be expected, in light

Fig. 17. Computational timings measured along a trajectory for three
robotic systems (c.f. Fig. 8). The represented timings are obtained by averaging
on the entire trajectory. The contact solvers are tested in both cold-start (Left)
and warm-start (Right) modes. We simulate the same trajectories to evaluate
the benefit of warm-starting, but we use the solution of the previous time step
as an initial guess. This leads to significant improvements in the computational
timings.

of our previous study, as both the RaiSim and CCP contact
models make physical approximations when contact points
are sliding (Fig. 19, bottom left). However, we occasionally
observe that NCP/PGS also violates the NCP criterion (15)
(Fig. 19, bottom left) but for a different reason: PGS was not
able to converge before the maximum number of iterations
was reached. Therefore, Gauss-Seidel-like approaches appear
to be sufficient for mild conditions (Fig. 18) but are not robust
enough to ensure convergence of the simulation when the

0103102101100Compliance (m/N)1031041051060Normal velocity (m/s)CCP/ADMMCCP/PGSAnalytical0103102101100Compliance (m/N)0106105104Tangent velocity (m/s)CCP/ADMMCCP/PGSAnalytical0103102101100Compliance (m/N)02468Internal forces (N)CCP/ADMMCCP/PGSAnalytical0.00.20.40.60.81.0Time (s)0510152025303540Mechanical energy (J)0.1ms1ms10ms100msNCP/PGSCCP/ADMMRaiSim104103102101t105104103102Consistency error (m)NCP/PGSCCP/ADMMRaiSim020406080Iterations10151012109106103100Dual feasibility (d)CCP/ADMMCCP/PGSNCP/PGSCCP/Newton020406080Iterations101710141011108105102Contact complementarity (c)CCP/ADMMCCP/PGSNCP/PGSCCP/Newton020406080100Iterations1010108106104102Dual feasibility (d)CCP/ADMMCCP/PGSNCP/PGSCCP/Newton020406080100Iterations1011109107105103Contact complementarity (c)CCP/ADMMCCP/PGSNCP/PGSCCP/Newtonsoloallegro handtalos100101102103Runtime (s)CCP/ADMMCCP/PGSNCP/PGSRaiSimNCP/StagProjDrakesoloallegro handtalos100101102103Runtime (s)CCP/ADMMCCP/PGSNCP/PGSRaiSimNCP/StagProjDrake15

to unrealistic behaviors when the simulator is later used for
practical robotics applications. Our experiments show that there
is no fully satisfactory approach at the moment, as all existing
solutions compromise either accuracy, robustness, or efficiency.
This indicates that there may still be room for improvements
in contact simulation. It is also worth mentionning that, for
robotics, simulation samples of lesser but controlled accuracy
are already valuable for many applications, e.g. RL and MPC,
while a failed simulation represent a waste of ressources. This
paper showcases that situations prone to failure of simulation
are not only corner cases but can become quite common when
adressing challenging tasks such as locomotion. This justifies
the emphasis put by modern simulators [32], [37], [35] on
robustness when modeling contacts and implementing the
associated solvers.

Beyond contact simulation, differentiable physics constitutes
an emergent and closely related topic. However, the impact of
forward simulation artifacts on gradient computation remains
unexplored. In particular, some of the relaxations at work,
e.g. the artificial compliance added in MuJoCo, result in
crucial differences in gradients, which then affect downstream
applications like trajectory optimization [97], [98]. We leave
the study of the various existing differentiable simulators [5],
[6], [7], [99], [8] through this lens as future work.

For all these reasons, we believe it would be highly beneficial
for the robotics community to take up such low-level topics
around simulation, as they could lead to substantial progress
in the field. The work of [43] is an inspiring first step in this
direction. With this article, we intend to go further by also
providing open-source implementations and benchmarks to the
community.

ACKNOWLEDGMENTS

We warmly thank Jemin Hwangbo for providing useful
details on the algorithm of the RaiSim simulator, Stéphane
Caron and Nicolas Mansard for helpful discussions. This work
was supported in part by L’Agence d’Innovation Défense,
the French government under the management of Agence
Nationale de la Recherche through the project INEXACT
(ANR-22-CE33-0007-01) and as part of the "Investissements
d’avenir" program, reference ANR-19-P3IA-0001 (PRAIRIE
3IA Institute), by the European Union through the AGIMUS
project (GA no.101070165) and the Louis Vuitton ENS Chair
on Artificial Intelligence. Views and opinions expressed are
those of the author(s) only and do not necessarily reflect those
of the European Union or the European Commission. Neither
the European Union nor the European Commission can be held
responsible for them.

Fig. 18. MPC for locomotion on a flat terrain (Top left). The target horizontal
translation velocity of the base is similarly reached by the controller with the
different simulators (Top right). However, they do not equally respect the
contact complementarity criterion (15) (Bottom left). Per-contact approaches,
e.g. PGS and RaiSim, are more efficient (Bottom right).

Fig. 19. MPC for locomotion on a bumpy terrain (Top left). The tracked
velocity of the base quickly differs depending on the used simulator (Top
right). Slippery contact points violate the contact complementarity criterion
(15) for the RaiSim and CCP contact modelings (Bottom left). The complexity
of contacts also hampers the solvers and reduces the gap between per-contact
and ADMM approaches (Bottom right).

locomotion tasks become more challenging (Fig. 19). This also
causes increased computations from the solvers, particularly
for RaiSim (Fig. 19, bottom right). These observations indicate
that the combination of low-level choices on both the contact
model and solver may induce significant differences in the
high-level behaviors of locomotion controllers on complex
terrains.

V. DISCUSSION AND CONCLUSION

REFERENCES

NCP is known to be complex to solve and thus is often
relaxed to find approximate solutions. In this article, we report a
deeper study on how the various rigid contact models commonly
employed in robotics and their associated solvers can impact
the resulting simulation. We have notably established and
experimentally highlighted that these choices may induce
unphysical artifacts, thus widening the reality gap, leading

[1] W. Li and E. Todorov, “Iterative linear quadratic regulator design for
nonlinear biological movement systems.,” vol. 1, pp. 222–229, 01 2004.
[2] D. Mayne, “A second-order gradient method for determining optimal
trajectories of non-linear discrete-time systems,” International Journal
of Control, vol. 3, no. 1, pp. 85–95, 1966.

[3] Y. Tassa, T. Erez, and E. Todorov, “Synthesis and stabilization of complex
behaviors through online trajectory optimization,” in 2012 IEEE/RSJ
International Conference on Intelligent Robots and Systems, pp. 4906–
4913, IEEE, 2012.

012345Time (s)0.20.00.20.40.60.81.0Base velocity (m/s)CCP/ADMMNCP/PGSRaiSimtarget velocity012345Time (s)0104103102101100101102Contact complementarity (c)CCP/ADMMRaiSimNCP/PGSsolo0246810Runtime (s)CCP/ADMMNCP/PGSRaiSim012345Time (s)1.00.50.00.51.01.5Base velocity (m/s)CCP/ADMMNCP/PGSRaiSimtarget velocity012345Time (s)0104103102101100101102Contact complementarity (c)CCP/ADMMRaiSimNCP/PGSsolo0510152025Runtime (s)CCP/ADMMNCP/PGSRaiSim[4] J. Carpentier and N. Mansard, “Analytical derivatives of rigid body
dynamics algorithms,” in Robotics: Science and systems (RSS 2018),
2018.

[5] F. de Avila Belbute-Peres, K. Smith, K. Allen, J. Tenenbaum, and
J. Z. Kolter, “End-to-end differentiable physics for learning and control,”
Advances in neural information processing systems, vol. 31, 2018.
[6] Q. Le Lidec, I. Kalevatykh, I. Laptev, C. Schmid, and J. Carpentier,
“Differentiable simulation for physical system identification,” IEEE
Robotics and Automation Letters, vol. 6, no. 2, pp. 3413–3420, 2021.

[7] K. Werling, D. Omens, J. Lee, I. Exarchos, and C. K. Liu, “Fast and
feature-complete differentiable physics engine for articulated rigid bodies
with contact constraints,” in Robotics: Science and Systems, 2021.
[8] T. Howell, S. Le Cleac’h, J. Brüdigam, Z. Kolter, M. Schwager, and
Z. Manchester, “Dojo: A differentiable simulator for robotics,” arXiv
preprint arXiv:2203.00806, 2022.

[9] M. Diehl, H. G. Bock, H. Diedam, and P.-B. Wieber, “Fast direct
multiple shooting algorithms for optimal robot control,” in Fast motions
in biomechanics and robotics, pp. 65–93, Springer, 2006.

[10] D. Q. Mayne, “Model predictive control: Recent developments and future

promise,” Automatica, vol. 50, no. 12, pp. 2967–2986, 2014.

[11] S. Kleff, A. Meduri, R. Budhiraja, N. Mansard, and L. Righetti, “High-
frequency nonlinear model predictive control of a manipulator,” in 2021
IEEE International Conference on Robotics and Automation (ICRA),
pp. 7330–7336, IEEE, 2021.

[12] E. Dantec, M. Taix, and N. Mansard, “First order approximation of
model predictive control solutions for high frequency feedback,” IEEE
Robotics and Automation Letters, vol. 7, no. 2, pp. 4448–4455, 2022.

[13] R. S. Sutton and A. G. Barto, Reinforcement learning: An introduction.

MIT press, 2018.

[14] J. Tan, T. Zhang, E. Coumans, A. Iscen, Y. Bai, D. Hafner, S. Bohez, and
V. Vanhoucke, “Sim-to-real: Learning agile locomotion for quadruped
robots.,” in Robotics: Science and Systems, 2018.

[15] I. Akkaya, M. Andrychowicz, M. Chociej, M. Litwin, B. McGrew,
A. Petron, A. Paino, M. Plappert, G. Powell, R. Ribas, et al., “Solving
rubik’s cube with a robot hand,” arXiv preprint arXiv:1910.07113, 2019.
[16] J. Hwangbo, J. Lee, A. Dosovitskiy, D. Bellicoso, V. Tsounis, V. Koltun,
and M. Hutter, “Learning agile and dynamic motor skills for legged
robots,” Science Robotics, vol. 4, no. 26, p. eaau5872, 2019.

[17] M. T. Mason and J. K. Salisbury Jr, Robot hands and the mechanics of

manipulation. The MIT Press, Cambridge, MA, 1985.

[18] J. Ponce, S. Sullivan, A. Sudsang, J.-D. Boissonnat, and J.-P. Merlet, “On
computing four-finger equilibrium and force-closure grasps of polyhedral
objects,” The International Journal of Robotics Research, vol. 16, no. 1,
pp. 11–35, 1997.

[19] B. Dynamics, “Atlas gets a grip | boston dynamics.” https://youtu.be/

-e1_QhJ1EhQ.

[20] I. Mordatch, E. Todorov, and Z. Popovi´c, “Discovery of complex
behaviors through contact-invariant optimization,” ACM Transactions on
Graphics (ToG), vol. 31, no. 4, pp. 1–8, 2012.

[21] M. Posa, C. Cantu, and R. Tedrake, “A direct method for trajectory
optimization of rigid bodies through contact,” The International Journal
of Robotics Research, vol. 33, no. 1, pp. 69–81, 2014.

[22] M. A. Toussaint, K. R. Allen, K. A. Smith, and J. B. Tenenbaum,
“Differentiable physics and stable modes for tool-use and manipulation
planning,” 2018.

[23] R. Featherstone, Rigid body dynamics algorithms. Springer, 2014.
[24] J. Carpentier, G. Saurel, G. Buondonno, J. Mirabel, F. Lamiraux,
O. Stasse, and N. Mansard, “The pinocchio c++ library: A fast and
flexible implementation of rigid body dynamics algorithms and their
analytical derivatives,” in 2019 IEEE/SICE International Symposium on
System Integration (SII), pp. 614–619, IEEE, 2019.

[25] J. J. Moreau, “Unilateral Contact and Dry Friction in Finite Freedom
Dynamics,” in Nonsmooth Mechanics and Applications (M. J.J. and
P. P.D., eds.), vol. 302 of International Centre for Mechanical Sciences
(Courses and Lectures), pp. 1–82, Springer, 1988.

[26] M. Jean, “The non-smooth contact dynamics method,” Computer methods
in applied mechanics and engineering, vol. 177, no. 3-4, pp. 235–257,
1999.

[27] V. Acary, F. Cadoux, C. Lemaréchal, and J. Malick, “A formulation
of the linear discrete Coulomb friction problem via convex optimiza-
tion,” Journal of Applied Mathematics and Mechanics / Zeitschrift für
Angewandte Mathematik und Mechanik, vol. 91, pp. 155–175, Feb. 2011.
[28] B. Brogliato, A. Ten Dam, L. Paoli, F. Génot, and M. Abadie, “Numerical
simulation of finite dimensional multibody nonsmooth mechanical
systems,” Appl. Mech. Rev., vol. 55, no. 2, pp. 107–150, 2002.
[29] R. Smith, “Open dynamics engine,” 2008. http://www.ode.org/.

16

[30] E. Coumans and Y. Bai, “Pybullet, a python module for physics simulation
for games, robotics and machine learning.” http://pybullet.org, 2016–2021.
[31] J. Lee, M. X. Grey, S. Ha, T. Kunz, S. Jain, Y. Ye, S. S. Srinivasa,
M. Stilman, and C. K. Liu, “DART: Dynamic animation and robotics
toolkit,” The Journal of Open Source Software, vol. 3, p. 500, Feb 2018.
[32] E. Todorov, T. Erez, and Y. Tassa, “Mujoco: A physics engine for model-
based control,” in 2012 IEEE/RSJ international conference on intelligent
robots and systems, pp. 5026–5033, IEEE, 2012.

[33] J. Hwangbo, J. Lee, and M. Hutter, “Per-contact iteration method for
solving contact dynamics,” IEEE Robotics and Automation Letters, vol. 3,
no. 2, pp. 895–902, 2018.

[34] R. Tedrake and the Drake Development Team, “Drake: Model-based

design and verification for robotics,” 2019.

[35] A. M. Castro, F. N. Permenter, and X. Han, “An unconstrained convex
formulation of compliant contact,” IEEE Transactions on Robotics,
vol. 39, no. 2, pp. 1301–1320, 2022.

[36] D. M. Kaufman, S. Sueda, D. L. James, and D. K. Pai, “Staggered
projections for frictional contact in multibody systems,” pp. 1–11, 2008.
[37] M. Macklin, K. Erleben, M. Müller, N. Chentanez, S. Jeschke, and
V. Makoviychuk, “Non-smooth newton methods for deformable multi-
body dynamics,” ACM Transactions on Graphics (TOG), vol. 38, no. 5,
pp. 1–20, 2019.

[38] A. Enzenhöfer, N. Lefebvre, and S. Andrews, “Efficient block pivoting
for multibody simulations with contact,” in Proceedings of the ACM
SIGGRAPH Symposium on Interactive 3D Graphics and Games, pp. 1–9,
2019.

[39] Z. Ferguson, M. Li, T. Schneider, F. Gil-Ureta, T. Langlois, C. Jiang,
D. Zorin, D. M. Kaufman, and D. Panozzo, “Intersection-free rigid body
dynamics,” ACM Trans. Graph., vol. 40, jul 2021.

[40] V. Makoviychuk, L. Wawrzyniak, Y. Guo, M. Lu, K. Storey, M. Macklin,
D. Hoeller, N. Rudin, A. Allshire, A. Handa, et al., “Isaac gym: High
performance gpu based physics simulation for robot learning,” in Thirty-
fifth Conference on Neural Information Processing Systems Datasets and
Benchmarks Track (Round 2), 2021.

[41] C. D. Freeman, E. Frey, A. Raichuk, S. Girgin, I. Mordatch, and
O. Bachem, “Brax-a differentiable physics engine for large scale rigid
body simulation,” in Thirty-fifth Conference on Neural Information
Processing Systems Datasets and Benchmarks Track (Round 1), 2021.
[42] T. Erez, Y. Tassa, and E. Todorov, “Simulation tools for model-based
robotics: Comparison of bullet, havok, mujoco, ode and physx,” in 2015
IEEE International Conference on Robotics and Automation (ICRA),
pp. 4397–4404, 2015.

[43] P. Horak and J. C. Trinkle, “On the similarities and differences among
contact models in robot simulation,” IEEE Robotics and Automation
Letters, vol. 4, pp. 493–499, 2019.

[44] J. Carpentier, F. Valenza, N. Mansard, et al., “Pinocchio: fast forward
and inverse dynamics for poly-articulated systems.” https://stack-of-
tasks.github.io/pinocchio, 2015–2021.

[45] J. Pan, S. Chitta, D. Manocha, F. Lamiraux, J. Mirabel, J. Carpentier,
et al., “HPP-FCL: an extension of the Flexible Collision Library.”
https://github.com/humanoid-path-planner/hpp-fcl, 2015–2022.

[46] J. Mirabel, S. Tonneau, P. Fernbach, A.-K. Seppälä, M. Campana,
N. Mansard, and F. Lamiraux, “HPP: A new software for constrained
motion planning,” in International Conference on Intelligent Robots and
Systems, 2016.

[47] L. Montaut, Q. Le Lidec, V. Petrík, J. Sivic, and J. Carpentier, “Collision
Detection Accelerated: An Optimization Perspective,” in Proceedings of
Robotics: Science and Systems, (New York City, NY, USA), June 2022.
[48] F. E. Udwadia and R. E. Kalaba, “A new perspective on constrained
motion,” Proceedings of the Royal Society of London. Series A: Mathe-
matical and Physical Sciences, vol. 439, no. 1906, pp. 407–410, 1992.
[49] H. Bruyninckx and O. Khatib, “Gauss’ principle and the dynamics of
redundant and constrained manipulators,” in Proceedings 2000 ICRA.
Millennium Conference. IEEE International Conference on Robotics
and Automation. Symposia Proceedings (Cat. No. 00CH37065), vol. 3,
pp. 2563–2568, IEEE, 2000.

[50] S. Redon, A. Kheddar, and S. Coquillart, “Gauss’ least constraints
principle and rigid body simulations,” in Robotics and Automation,
2002. Proceedings. ICRA’02. IEEE International Conference on, vol. 1,
(Washington, DC, United States), pp. 517–522, 2002.

[51] E. Todorov, “A convex, smooth and invertible contact model for trajectory
optimization,” in 2011 IEEE International Conference on Robotics and
Automation, pp. 1071–1076, IEEE, 2011.

[52] C. Studer, R. Leine, and C. Glocker, “Step size adjustment and extrapo-
lation for time-stepping schemes in non-smooth dynamics,” International
journal for numerical methods in engineering, vol. 76, no. 11, pp. 1747–
1781, 2008.

17

[53] S. L. Campbell and C. W. Gear, “The index of general nonlinear DAEs,”

Numerische Mathematik, vol. 72, pp. 173–196, 1995.

[54] J. Carpentier, R. Budhiraja, and N. Mansard, “Proximal and sparse
resolution of constrained dynamic equations,” in Robotics: Science and
Systems, 2021.

[55] C. F. Gauß, “Über ein neues allgemeines grundgesetz der mechanik.,”

1829.

[56] L. Montaut, Q. Le Lidec, V. Petrik, J. Sivic, and J. Carpentier, “Collision
detection accelerated: An optimization perspective,” in RSS 2022-
Robotics: Science and Systems, 2022.

[57] F. Pfeiffer and C. Glocker, Multibody Dynamics with Unilateral Contacts.

CISM International Centre for Mechanical Sciences, Springer, 2000.

[58] C. Ericson, Real-time collision detection. Crc Press, 2004.
[59] E. G. Gilbert, D. W. Johnson, and S. S. Keerthi, “A fast procedure for
computing the distance between complex objects in three-dimensional
space,” IEEE Journal on Robotics and Automation, vol. 4, no. 2, pp. 193–
203, 1988.

[60] C. Ericson, Real-Time Collision Detection. The Morgan Kaufmann Series,

2004.

[61] K. Mamou and F. Ghorbel, “A simple and efficient approach for 3d mesh
approximate convex decomposition,” in 2009 16th IEEE International
Conference on Image Processing (ICIP), pp. 3501–3504, 2009.

[62] A. Signorini, “Questioni di elasticità non linearizzata e semilinearizzata,”
Rendiconti di Matematica e delle sue applicazioni, vol. 18, no. 5, pp. 95–
139, 1959.

[63] R. W. Cottle, J.-S. Pang, and R. E. Stone, The Linear Complementarity
Problem. Society for Industrial and Applied Mathematics, 2009.
[64] P. Wensing, R. Featherstone, and D. E. Orin, “A reduced-order recursive
algorithm for the computation of the operational-space inertia matrix,”
in 2012 IEEE International Conference on Robotics and Automation,
pp. 4911–4917, IEEE, 2012.

[65] O. A. Bauchau and A. Laulusa, “Review of contemporary approaches

for constraint enforcement in multibody systems,” 2008.

[66] J. Baumgarte, “Stabilization of constraints and integrals of motion
in dynamical systems,” Computer methods in applied mechanics and
engineering, vol. 1, no. 1, pp. 1–16, 1972.

[67] G. de Saxcé and Z.-Q. Feng, “The bipotential method: A constructive
approach to design the complete contact law with friction and improved
numerical algorithms,” Mathematical and Computer Modelling, vol. 28,
pp. 225–245, Aug. 1998.

[68] V. Acary, M. Brémond, and O. Huber, “On solving contact problems with
Coulomb friction: formulations and numerical comparisons,” Research
Report RR-9118, INRIA, Nov. 2017.

[69] H. Barbosa and R. Feijóo, “A numerical algorithm for signorini’s problem
with coulomb friction,” in Unilateral Problems in Structural Analysis—2:
Proceedings of the Second Meeting on Unilateral Problems in Structural
Analysis, Prescudin, June 17–20, 1985, pp. 33–45, Springer, 1987.
[70] M. A. Tzaferopoulos, “On an efficient new numerical method for the
frictional contact problem of structures with convex energy density,”
Computers & structures, vol. 48, no. 1, pp. 87–106, 1993.

[71] K. Erleben, “Rigid body contact problems using proximal operators,”
in Proceedings of the ACM SIGGRAPH / Eurographics Symposium on
Computer Animation, SCA ’17, (New York, NY, USA), Association for
Computing Machinery, 2017.

[72] J. Pan, S. Chitta, and D. Manocha, “FCL: A General Purpose Library for
Collision and Proximity Queries,” in 2012 IEEE International Conference
on Robotics and Automation, IEEE, 2012.

[73] D. Fiser, “libccd.” https://github.com/danfis/libccd.
[74] M. Macklin, K. Storey, M. Lu, P. Terdiman, N. Chentanez, S. Jeschke,
and M. Müller, “Small steps in physics simulation,” in Proceedings of the
18th Annual ACM SIGGRAPH/Eurographics Symposium on Computer
Animation, SCA ’19, (New York, NY, USA), Association for Computing
Machinery, 2019.

[75] M. L. Felis, “Rbdl: an efficient rigid-body dynamics library using
recursive algorithms,” Autonomous Robots, vol. 41, no. 2, pp. 495–511,
2017.

[76] M. Anitescu and A. Tasora, “An iterative approach for cone complemen-
tarity problems for nonsmooth dynamics,” Computational Optimization
and Applications, vol. 47, no. 2, pp. 207–235, 2010.

[77] E. Mitsopoulou and I. Doudoumis, “A contribution to the analysis of
unilateral contact problems with friction,” Solid Mechanics Archives,
vol. 12, no. 3, pp. 165–186, 1987.

[78] I. Doudoumis and E. Mitsopoulou, “On the solution of the unilateral con-
tact frictional problem for general static loading conditions,” Computers
& structures, vol. 30, no. 5, pp. 1111–1126, 1988.

[79] F. Jourdan, P. Alart, and M. Jean, “A gauss-seidel like algorithm to solve
frictional contact problems,” Computer methods in applied mechanics
and engineering, vol. 155, no. 1-2, pp. 31–47, 1998.

[80] K. Erleben, “Numerical methods for linear complementarity prob-
lems in physics-based animation,” in ACM SIGGRAPH 2013 Courses,
SIGGRAPH ’13, (New York, NY, USA), Association for Computing
Machinery, 2013.

[81] C. E. Lemke, “Bimatrix equilibrium points and mathematical program-
ming,” Management science, vol. 11, no. 7, pp. 681–689, 1965.
[82] G. B. Dantzig and R. W. Cottle, “Positive (semi-) definite matrices and

mathematical programming,” Report ORC, vol. 13, pp. 63–18, 1963.

[83] M. Anitescu and F. Potra, “Formulating dynamic multi-rigid-body contact
problems with friction as solvable linear complementarity problems,”
Nonlinear Dynamics, vol. 14, 03 1997.

[84] J. Trinkle, J.-S. Pang, S. Sudarsky, and G. Lo, “On dynamic multi-rigid-
body contact problems with coulomb friction,” Zeitschrift Angewandte
Mathematik und Mechanik, vol. 77, no. 4, pp. 267–279, 1997.

[85] V. Acary and B. Brogliato, Numerical methods for nonsmooth dynamical
systems: applications in mechanics and electronics. Springer Science &
Business Media, 2008.

[86] M. Anitescu, “Optimization-based simulation of nonsmooth rigid multi-
body dynamics,” Mathematical Programming, vol. 105, pp. 113–143,
2006.

[87] S. Boyd, N. Parikh, E. Chu, B. Peleato, J. Eckstein, et al., “Distributed
optimization and statistical learning via the alternating direction method
of multipliers,” Foundations and Trends® in Machine learning, vol. 3,
no. 1, pp. 1–122, 2011.

[88] S. Mehrotra, “On the implementation of a primal-dual interior point
method,” SIAM Journal on optimization, vol. 2, no. 4, pp. 575–601,
1992.

[89] J. Nocedal and S. J. Wright, Numerical optimization. Springer, 1999.
[90] N. Parikh, S. Boyd, et al., “Proximal algorithms,” Foundations and

trends® in Optimization, vol. 1, no. 3, pp. 127–239, 2014.

[91] T. Preclik, Models and algorithms for ultrascale simulations of non-
smooth granular dynamics. Friedrich-Alexander-Universitaet Erlangen-
Nuernberg (Germany), 2014.

[92] S. Boyd and L. Vandenberghe, “Localization and cutting-plane methods,”

From Stanford EE 364b lecture notes, 2007.

[93] J. Carpentier, Q. Le Lidec, and L. Montaut, “From compliant to rigid
contact simulation: a unified and efficient approach,” in 20th edition of
the “Robotics: Science and Systems”(RSS) Conference, 2024.

[94] B. Stellato, G. Banjac, P. Goulart, A. Bemporad, and S. Boyd, “OSQP:
an operator splitting solver for quadratic programs,” Mathematical
Programming Computation, vol. 12, no. 4, pp. 637–672, 2020.

[95] M. Renouf, V. Acary, and G. Dumont, “3d frictional contact and impact
multibody dynamics. a comparison of algorithms suitable for real-
time applications,” in Mutlibody Dynamics 2005, ECCOMAS Thematic
Conference, 2005.

[96] P.-A. Léziart, T. Flayols, F. Grimminger, N. Mansard, and P. Souères,
“Implementation of a Reactive Walking Controller for the New Open-
Hardware Quadruped Solo-12,” in 2021 IEEE International Conference
on Robotics and Automation - ICRA, (Xi’an, China), May 2021.
[97] H. J. T. Suh, T. Pang, and R. Tedrake, “Bundled gradients through
contact via randomized smoothing,” IEEE Robotics and Automation
Letters, vol. 7, no. 2, pp. 4000–4007, 2022.

[98] Q. Le Lidec, F. Schramm, L. Montaut, C. Schmid, I. Laptev, and
J. Carpentier, “Leveraging randomized smoothing for optimal control
of nonsmooth dynamical systems,” Nonlinear Analysis: Hybrid Systems,
vol. 52, p. 101468, 2024.

[99] E. Heiden, D. Millard, E. Coumans, Y. Sheng, and G. S. Sukhatme,
“NeuralSim: Augmenting differentiable simulators with neural networks,”
in Proceedings of the IEEE International Conference on Robotics and
Automation (ICRA), 2021.
