DiffPills: Differentiable Collision Detection
for Capsules and Padded Polygons

Kevin Tracy1, Taylor A. Howell2, Zachary Manchester1

1

2
2
0
2

l
u
J

1

]

O
R
.
s
c
[

1
v
2
0
2
0
0
.
7
0
2
2
:
v
i
X
r
a

Abstract—Collision detection plays an important role in sim-
ulation, control, and learning for robotic systems. However, no
existing method is differentiable with respect to the conﬁgurations
of the objects, greatly limiting the sort of algorithms that can be
built on top of collision detection. In this work, we propose a set of
differentiable collision detection algorithms between capsules and
padded polygons by formulating these problems as differentiable
convex quadratic programs. The resulting algorithms are able to
return a proximity value indicating if a collision has taken place,
as well as the closest points between objects, all of which are
differentiable. As a result, they can be used reliably within other
gradient-based optimization methods, including trajectory opti-
mization, state estimation, and reinforcement learning methods.

I. INTRODUCTION

Collision detection algorithms are used to determine if two
abstract shapes have an intersection. This problem has been
the subject of great interest from the computer graphics and
video game communities, where accurate collision detection
is a key part of both the simulation as well as the visualization
of complex shapes [1], [2]. Robotics shares a similar interest
in collision detection, as it plays a role in both the accurate
simulation of systems that make and break contact [3], as well
as a tool for constrained motion planning [4].

Popular algorithms for collision detection are the Gilbert,
Johnson, and Keerthi (GJK) algorithm [5], its updated variant
enhanced-GJK [6], and Minkowski Portal Reﬁnement (MPR)
[7], [8]. All of these algorithms rely on a set of primitives and
corresponding support mappings to calculate either the shortest
distance between two objects, or the existence of a collision.
While these methods are highly efﬁcient, robust, and mature,
there are inherently non-differentiable due to the logic control
ﬂow.

it

While the differentiability of a collision detection algorithm
is not as relevant in the computer graphics and video game
communities,
is a key enabling technology in robotics.
Highly accurate contact physics formulations like that in Dojo
[3] rely on differentiable collision detection to simulate realis-
tic contact behavior. This requirement currently limits Dojo to
only simple contact interactions between basic primitives like
spheres and a ﬂoor. In motion planning, collision avoidance
constraints are most often formulated with naive spherical

1Kevin Tracy and Zachary Manchester

are with The Robotics
Institute, Carnegie Mellon University, Pittsburgh, PA 15213, USA
{ktracy,zacm}@cmu.edu

2Taylor A. Howell is with the Department of Mechanical Engineering, Stan-
ford University, Stanford, CA 94305, USA thowell@stanford.edu

Fig. 1. Visualization of a padded polygon (blue) and a capsule (orange).
The differential collision detection algorithm computed the proximity value
indicating there is no collision, as well as the closest point between the objects
in red. Both of these operations are fully differentiable with respect to the
position and orientation of each shape.

keep-out zones [4]. A differentiable collision detection algo-
rithm enables a variety of more expressive primitives to be
utilized in robotic simulation, planning, and learning.

In this work, a new approach to collision detection is
taken by formulating the routine as a differentiable convex
optimization problem. By describing abstract objects as a
collection of two primitive types, a capsule and what we call a
“padded” polygon, a variety of more complex geometries can
be constructed. For example, arbitrary non-convex geometry
can be decomposed into our primitives. An example of these
two primitives is shown in Fig 1. The resulting algorithms
for collision detection between these primitives work by
formulating and solving convex optimization problems that
return a continuous proximity value that is positive when there
is no collision, and negative when a collision is detected. Using
recent advances in differentiable convex optimization, deriva-
tives of this proximity value and the closest points between
shapes are calculated with respect to the conﬁgurations of the
objects.

II. DIFFERENTIABLE CONVEX OPTIMIZATION

In this work, a core part of each collision detection function
is the solution to a convex optimization problem. These prob-
lems can be solved quickly in polynomial time [9], and recent
developments in differentiable convex optimization allow for
efﬁcient computation of derivatives through these optimization
problems [10], [11].

A. Quadratic Programming

C. Differentiating Through a Quadratic Program

2

In computing the collision information for the convex
primitives in this work, we will speciﬁcally utilize inequality-
constrained convex quadratic programs of the following form
[9]:

minimize
x

xT P x + cT x

(1)

1
2

subject to Gx ≤ h.

+

With a primal variable x ∈ Rn, quadratic and linear cost terms
P ∈ Sn×n
and c ∈ Rn, and an inequality constraint described
by G ∈ Rl×n and h ∈ Rl. A dual variable λ ∈ Rl is introduced
for the inequality constraint, and the the Lagrangian for this
problem is the following:

L(x, z) =

1
2

xT P x + cT x + λT (Gx − h).

(2)

The resulting KKT conditions for stationarity, complementary
slackness, primal feasibility, and dual feasibility are:

P x + c + GT λ = 0,
D(Gx − h)λ = 0,

Gx ≤ h,

λ ≥ 0,

(3)

(4)

(5)

(6)

where D(·) creates a diagonal matrix from the input vector.
In this work, a function x, λ = solve qp(P, c, G, h) will be
the mapping between the description of the problem and the
primal and dual solutions to (1).

B. Primal-dual Interior-point Methods

Problem (1), can be solved with a primal-dual interior-point
method [9]. As shown in [12], a primal-dual method with a
Mehrotra predictor-corrector [13] uses a variant of Newton’s
method to iteratively minimize the residuals from (3)-(4).

By introducing a slack variable s ∈ Rl for the inequality
constraints, and initializing both s > 0 and λ > 0, the Newton
steps are the following for the afﬁne step:


 = K −1





∆xaff
∆saff
∆λaff





−(P x + c + GT λ)
−D(s)λ
−(Gx + s − h)



 ,

and for the centering and correcting step:


 = K −1





∆xcc
∆scc
∆λcc





0
σµ1 − D(∆saff)∆λaff
0



 ,

where σ ∈ R and µ ∈ R are deﬁned in [12], and

GT
P
0 D(λ) D(s)
G

K =

 .





0

0

I

(7)

(8)

(9)

These two search directions are then added and a line search
is used to ensure the positivity of both s and λ. Convergence
criteria is often based on the norm of the KKT conditions
captured in the right-hand side vector in equation (7).

There are various methods for solving the linear systems in
equations (7) and (8), and they all exploit the fact that the two
linear systems have the same coefﬁcient matrix. This means
factorizations only need to take place once and can be re-used
in the centering and correcting step computation [14], [15].

At the core of differentiable convex optimization is the
implicit function theorem [11]. An implicit function g :
Ra × Rb → Ra is deﬁned as:

g(y∗, ρ) = 0,
(10)
for a solution y∗ ∈ Ra, and problem parameters ρ ∈ Rb. By
approximating (10) with a ﬁrst-order Taylor series, we see

∂g
∂ρ
which can be re-arranged to solve for the sensitivities of the
solution with respect to the problem parameters:

δρ = 0,

∂g
∂y

δy +

(11)

∂y
∂ρ

= −

(cid:18) ∂g
∂y

(cid:19)−1 ∂g
∂ρ

,

(12)

when ∂g/∂y is invertible. Problem (1) can now be differ-
entiated in a similar fashion by treating the stationarity and
complementary slackness optimality conditions in (3)-(4) as an
implicit function of solution variables x and λ, and problem
parameters P , w, G, and h. Using this, the sensitivities of
the primal and dual variables with respect to the problem
parameters can be computed using equation (12).

Instead of naively using the implicit function theorem on
(3)-(4) to calculate the sensitivities, we can leverage the fact
that only the left matrix-vector product with another derivative
is needed. This means that if we have an arbitrary function
(cid:96)(x) : Rn → R and we have the derivative of this function ∂(cid:96)
∂x ,
we can form the derivatives of (cid:96) with respect to the problem
parameters directly using only the primal and dual solutions
x∗ and λ∗:

∂(cid:96)
∂(P )v
∂(cid:96)
∂(G)v
∂(cid:96)
∂w
∂(cid:96)
∂h

=

1
2

(dxx∗T + λ∗dT

x )v,

= (D(λ∗)dλx∗T + λ∗dT

x )v,

= dx,

= −D(λ∗)dλ,

where (·)v is the input matrix vectorized, and
(cid:20)P
(cid:21) (cid:20)( ∂(cid:96)
∂x )T
G D(Gx∗ − h)
0

GT D(λ∗)

(cid:20)dx
dλ

= −

(cid:21)

(13)

(14)

(15)

(16)

(17)

(cid:21)

.

The solution to the linear system in (17) can be obtained using
the already computed factorization to the primal-dual interior-
point steps, meaning all of these derivatives can be computed
without any new linear system factorizations [11].

III. CAPSULES
A capsule i in this work will be uniquely described by
endpoints ai ∈ R3 and bi ∈ R3, and radius Ri ∈ R. In
this section, the line segment between points ai and bi will be
referred to as the central line segment of the capsule, where the
line segment can be described by θai +(1−θ)bi for θ ∈ [0, 1].
Mathematically, we can describe the set of points inside of a
capsule as any point x ∈ R3 that is within a distance Ri of
this central line segment:

{x | (cid:107)x − (θai + (1 − θ)bi)(cid:107) ≤ Ri, ∃ θ ∈ [0, 1]}.

(18)

3

B. Implementation

When dealing with robotic systems, it is most convenient
to express the conﬁguration of a capsule i as a rigid body
with an attached reference frame as described with a Cartesian
position ri ∈ R3 and orientation qi ∈ S3 [16]. From here, a
simple function EndPoints can be constructed that generates
the endpoints of the capsule from this rigid body description:

ai = ri + W QCi (cid:2)Li/2
bi = ri + W QCi (cid:2)−Li/2

0

0(cid:3)T

,
0(cid:3)T

,

0

(23)

(24)

where W QCi ∈ R3×3 is the rotation matrix relating the world
frame W to the reference frame on capsule i, Ci.

The equality constraints in the QP (19) can be eliminated by
substituting in the values for p1 and p2 in the cost function.
The resulting QP can be formulated in the canonical form
presented in (1) with the following problem data:

Pc = F T F,
Gc = (cid:2)I2 −I2

(cid:3)T

,

cc = F T (b1 − b2),
hc = (cid:2)1

0

1

0(cid:3)T

(25)

(26)

,

where F = [(a1−b1), (b2−a2)] and the primal variables are θ1
and θ2. The resulting algorithm for collision detection between
two capsules is outlined in algorithm 1. This algorithm takes
in a description of two capsules and returns a proximity value
φ where φ > 0 indicates there is no collision. All of the

Algorithm 1 Capsule-Capsule Collision Detection

1: input: r1, q1, r2, q2, R1, R2
2: a1, b1, a2, b2 ← EndPoints(r1, q1, r2, q2, L1, L2)
3: Pc, cc, Gc, hc ← (25) - (26)
4: θ1, θ2 ← solve qp(Pc, cc, Gc, hc)
5: p1, p2 ← recover from (19)
6: φ ← (20)
7: return: φ

operations in Algorithm 1 are readily differentiable, including
the solve qp function as detailed in section II-C. The resulting
Jacobians of this proximity value φ with respect to the position
and orientation of the capsule are

dφ
dri
dφ
dqi

=

=

∂φ
∂ai
∂φ
∂ai

+

∂φ
∂bi

+

∂ai
∂qi

+

∂φ
∂bi

∂φ
∂(Pc)v
∂bi
∂qi

+

∂(Pc)v
∂ri
∂φ
∂(Pc)v

+

∂φ
∂wcc
∂(Pc)v
∂qi

∂wc
∂ri

,

(27)

+

∂φ
∂wc

∂wc
∂qi

,

(28)

where ∂φ/∂(Pc)v and ∂φ/∂wc are both computed using the
formulation in (13) and (15).

IV. PADDED POLYGONS

This section will examine a primitive that is deﬁned by a
two-dimensional polygon in three-dimensional space with a
uniform “padding” radius of Ri ∈ R around polygon i. In
order to represent this mathematically, let us deﬁne a polygon
in two dimensions with some basis Bi such that a point y ∈ R2
is within the polygon if Ciy ≤ di. The origin of the basis Bi
is within the polygon, and the plane that the polygon exists
on is spanned by the ﬁrst two basis vectors of Bi. The origin

Fig. 2. Geometrical description of two capsules as deﬁned by their centroids
ri, orthogonal basis Bi, lengths Li, radii Ri, and end points ai and bi.
Internal to each capsule is a line segment connecting points ai and bi.

A. Collision Detection

As shown in Fig. 2, we will now consider two capsules
in the same world frame, each described by end points ai,
bi, and radii Ri. To solve the collision detection problem for
these capsules, an optimization problem is formed that solves
for the closest points on the two central line segments:

minimize
p1, p2, θ1, θ2
subject to

(cid:107)p1 − p2(cid:107)2

p1 = θ1a1 + (1 − θ1)b1,
p2 = θ2a2 + (1 − θ2)b2,
0 ≤ θ1 ≤ 1,
0 ≤ θ2 ≤ 1,

(19)

where pi ∈ R3 is constrained to be on the central line segment
of capsule i, and θi ∈ [0, 1] is introduced to deﬁne the line
segment in the optimization problem. The resulting quadratic
program in 19 can be reformulated to eliminate the equality
constraints and only solve for (θ1, θ2) efﬁciently with either a
custom active-set method shown in algorithm 4, or an interior
point method as shown in II-B. From the solution of this
problem, a proximity value φ ∈ R will be deﬁned as the
following:

φ = (cid:107)p1 − p2(cid:107)2 − (R1 + R2)2

(20)

which is the squared distance between the closest points on
the two central line segments, with the squared sum of the
radii subtracted. This results in φ > 0 for no collision, and
φ ≤ 0 for a collision.

On top of our newly introduced proximity value, it is also
useful to return the closest point in each capsule. The closest
point in capsule i to the opposing capsule is denoted ˜pi ∈ R3,
and can be trivially computed given the solution to problem
(19):

˜p1 = p1 + R1

˜p2 = p2 + R2

p2 − p1
(cid:107)p2 − p1(cid:107)
p1 − p2
(cid:107)p1 − p2(cid:107)

,

.

(21)

(22)

variables for this new problem are (y1, y2), and the following
problem data are used:

4

Pp = F T F,
(cid:20)C1

Gp =

0
0 C2

(cid:21)

,

cp = F T (r1 − r2),
(cid:21)

hp =

(cid:20)d1
dT
2

,

(31)

(32)

where F = [ ˜Q1, − ˜Q2]. With this, the collision detection
algorithm for two padded polygons is expressed in algorithm 2.
This algorithm is made up of entirely differentiable operations

Algorithm 2 Padded Polygon Collision Detection
1: input: r1, q1, r2, q2, C1, d1, C2, d2, R1, R2
2: Pp, cp, Gp, hp ← (31) - (32)
3: y1, y2 ← solve qp(Pp, cp, Gp, hp)
4: p1, p2 ← recover from (30)
5: φ ← (20)
6: return: φ

and can be differentiated through in the same way as in
algorithm 1. The Jacobians of the proximity value to the state
and orientation of each padded polygon is as follows:

dφ
dri
dφ
dqi

=

=

∂φ
∂ri
∂φ
∂qi

+

+

∂wp
∂ri

∂φ
∂wp
∂φ
∂(Pp)v

,

∂(Pp)v
∂qi

+

∂φ
∂wp

∂wp
∂qi

,

(33)

(34)

where once again ∂φ/∂(Pp)v and ∂φ/∂wp are both computed
using the formulation from (13) and (15). It’s important to note
that φ is a function of p1 and p2, which are different for the
padded polygon than it is for the capsule. To calculate the
derivatives of φ, simply substitute in the values of p1 and p2
from (30) into (20) and differentiate.

C. Polygon and Capsule Detection

Collisions between a padded polygon and a capsule can be
computed in the same way (19) and (30). The main idea is
the same in that we are ﬁnding the closest points between the
central line segment of the capsule, and the two-dimensional
polygon. If the distance between these two closest points is
greater than the sum of the radii, there is no collision. This
optimization problem is as follows:

(30)

minimize
p1, p2, θ1, y2
subject to

(cid:107)p1 − p2(cid:107)2

p1 = θ1a1 + (1 − θ1)b1,
p2 = r2 + ˜Q2y2,
0 ≤ θ1 ≤ 1,

(35)

C2y2 ≤ d2,

where again p1 and p2 can be eliminated resulting in an
inequality-only QP that is solving for [θ1, yT ]T . The problem
data for this QP are the following:

Pcp = F T F,

Gcp =

(cid:20)D([1, −1])
0

(cid:21)

,

0
C2

ccp = F T (b1 − r2),
(cid:3)T
hcp = (cid:2)1

0 dT
2

(36)

,

(37)

Fig. 3. Description of a“padded” polygon, where the shape is deﬁned as the
set of points within some radius R of a two-dimensional polygon. A reference
frame B is deﬁned in the center of the polygon, and the polygon exists in the
ﬁrst two basis vectors of B.

of basis Bi is ri ∈ R3 in the world frame, and W QBi ∈ R3×3
relates this basis to the world frame.

A point x ∈ R3 is said to be within this padded polygon i

if it can be represented as the following:

x = ri + W ˜QBiy,

(29)

where Ciy ≤ di and W ˜QBi ∈ R3×2 is the ﬁrst two columns
of W QBi. In the rest of this section, ˜Qi will be shorthand for
W ˜QBi.

A. Collision Detection

In a similar fashion to section III, the collision detection
between two padded polygons will be performed with a
convex optimization problem. By specifying the underlying
two-dimensional polygons, a quadratic program will solve for
the closest points between these polygons. If these points are
closer than the sum of the two padding radii, then the two
shapes intersect.

Similar to (19), we can formulate this optimization problem
by introducing variables pi ∈ R3 that are constrained to be
on the two-dimensional polygons, and solving for the closest
points on these polygons:

minimize
p1, p2, y1, y2
subject to

(cid:107)p1 − p2(cid:107)2

p1 = r1 + ˜Q1y1,
p2 = r2 + ˜Q2y2,

C1y1 ≤ d1,
C2y2 ≤ d2.

The proximity value φ is calculated in the same way as in
(20), and the closest points between the two padded polygons
can be again computed using (21) - (22).

B. Implementation

The variables p1 and p2 and the equality constraints can
be eliminated in (30), and the optimization problem can be
reformulated in our inequality-only QP form (1). The primal

where F = [(a1 − b1), − ˜Q2]. The algorithm for collision
detection between these two primitives is detailed in Algorithm
3, where again it is made up of entirely differentiable oper-
ations. The Jacobians of the proximity value with respect to
the position and orientation of the capsule are calculated with
equations (27)-(28), and the Jacobians of the proximity value
with respect to the padded polygon’s position and orientation
are calculated with equations (33)-(34).

Algorithm 3 Padded Polygon and Capsule Collision Detection

1: input: r1, q1, r2, q2, a1, b1, C2, d2, R1, R2
2: Pcp, ccp, Gcp, hcp ← (36) - (37)
3: θ1, y2 ← solve qp(Pcp, ccp, Gcp, hcp)
4: p1, p2 ← recover from (35)
5: φ ← (20)
6: return: φ

V. MOTION PLANNING EXAMPLE

To demonstrate the utility of differentiable collision de-
tection between these primitives, the formulation presented
in section III will be used for a motion planning problem.
Two cars are modeled as capsules, with one larger car being
stationary, and another smaller car being controlled with
acceleration and steering-angle rate commands. The equations
of motion for this simple car are as follows:

˙px = v cos(θ),
˙py = v sin(θ),

˙v = u1,
˙γ = u2,

(38)

(39)

where px, py ∈ R is the position of the car, v ∈ R is the
velocity, γ ∈ R is the steering angle, and u ∈ R2 are the
control inputs. A trajectory optimization problem is formed
where the objective is encouraging the controlled car to hit a
desired conﬁguration, but the stationary car is directly in the
way. To incorporate this collision avoidance constraint into the
problem, the differential collision detection algorithm 1 was
used where the proximity value was constrained to be φ ≥ 0.
The trajectory optimizer ALTRO [4] was used for this prob-
lem, where derivatives of the collision avoidance constraint
were required. As shown in Fig. 4, the optimal trajectory from
ALTRO shows the car starting on the left and traveling to the
right towards the goal while avoiding the stationary car.

Fig. 4. Trajectory optimization for a car with a collision avoidance constraint.
The car starts on the left side and is trying to get to the lower right side, but
it must avoid colliding with the yellow school bus. By explicitly specifying
this collision avoidance constraint with our proposed differential collision
detection algorithm, a trajectory optimizer is able to converge on a feasible
and optimal solution.

5

A. Open Source Implementation

An open source implementation of these algorithms in Julia
[17] is available at https://github.com/kevin-tracy/DiffPills.jl.

REFERENCES

[1] L. Olv˚ang, “Real-time Collision Detection with Implicit

Objects,” undeﬁned, 2010.

[2] G. J. A. van den Bergen, Collision Detection in In-
teractive 3D Environments. Amsterdam; Boston: Else-
vier/Morgan Kaufman, 2004.

[3] T. A. Howell, S. Le Cleac’, J. Z. Kolter, M. Schwager,
and Z. Manchester, “Dojo: A Differentiable Simulator
for Robotics,” 2022.

[4] T. A. Howell, B. E. Jackson, and Z. Manchester, “AL-
TRO: A Fast Solver for Constrained Trajectory Opti-
mization,” IEEE International Conference on Intelligent
Robots and Systems, pp. 7674–7679, Nov. 2019.
[5] E. Gilbert, D. Johnson, and S. Keerthi, “A fast pro-
cedure for computing the distance between complex
objects in three-dimensional space,” IEEE Journal on
Robotics and Automation, vol. 4, no. 2, pp. 193–203,
Apr. 1988.

[6] S. Cameron, “Enhancing GJK: Computing minimum
and penetration distances between convex polyhedra,”
in Proceedings of International Conference on Robotics
and Automation, vol. 4, Albuquerque, NM, USA: IEEE,
1997, pp. 3112–3117.

[7] G. Snethen, “XenoCollide: Complex Collision Made

[8]

Simple,” undeﬁned, 2008.
J. Newth, “Minkowski Portal Reﬁnement and Specula-
tive Contacts in Box2D,” Master of Science, San Jose
State University, San Jose, CA, USA, Apr. 2013.
[9] S. Boyd and L. Vandenberghe, Convex Optimization.

Cambridge University Press, 2004.

[10] A. Agrawal, B. Amos, S. Barratt, S. Boyd, S. Diamond,
and Z. Kolter, “Differentiable Convex Optimization
Layers,” Advances in Neural Information Processing
Systems, pp. 9558–9570, 2019.

[11] B. Amos and J. Z. Kolter, “OptNet: Differen-
tiable Optimization as a Layer in Neural Networks,”
arXiv:1703.00443 [cs, math, stat], Oct. 2019.
J. Mattingley and S. Boyd, “CVXGEN: A code genera-
tor for embedded convex optimization,” in Optimization
Engineering, 2012, pp. 1–27.

[12]

[13] S. Mehrotra, “On the Implementation of a Primal-Dual
Interior Point Method,” SIAM Journal on Optimization,
vol. 2, no. 4, pp. 575–601, Nov. 1992.
J. Nocedal and S. J. Wright, Numerical Optimization,
Second. Springer, 2006.

[14]

[15] A. S. Nemirovski and M. J. Todd, “Interior-point meth-
ods for optimization,” Acta Numerica, vol. 17, pp. 191–
234, May 2008.

[16] B. E. Jackson, K. Tracy, and Z. Manchester, “Planning
With Attitude,” IEEE Robotics and Automation Letters,
pp. 1–1, 2021.

[17]

J. Bezanson, A. Edelman, S. Karpinski, and V. B. Shah,
“Julia: A Fresh Approach to Numerical Computing,”
SIAM Review, vol. 59, no. 1, pp. 65–98, Jan. 2017.

6

APPENDIX A
ACTIVE SET QP SOLVER
For quadratic programs where the only constraints are
inequality bound constraints on two primal variables x ∈ R2,
an active set method is able to outperform primal-dual interior-
point methods. This optimization problem looks like the
following:

minimize
x

subject to

1
2
(cid:20) I
−I

xT P x + cT x
(cid:21)

(cid:21)

x ≤

(cid:20)1
0

(40)

is a two-dimensional box,

And since the feasible set
the
solution must be either in the middle of the box, one of the
four corners, or on one of the four sides of the box. The active-
set method shown in algorithm 4 calculates these 9 points and
returns the feasible one with minimum cost. The dual variables
λ ∈ R4 are then backed out using algorithm 5.

Algorithm 4 Two-dimensional Active Set QP Solver

(cid:46) compute unconstrained solution
(cid:46) return solution if feasible

(cid:46) generate 8 candidate solutions

λ ← 0

1: function active set 2D(P, c)
2: x∗ ← −P −1c
3: if 0 ≤ x∗ ≤ 1 then
4:
5: else
6:
7:
8:
9:
10:
11:

x(1) = [1, −(P2 + c2)/P3]
x(2) = [0, −c2/P3]
x(3) = [−(P2 + c1)/P1, 1]
x(4) = [−c1/P1, 0]
x(5) = [0, 0]
x(6) = [0, 1]
x(7) = [1, 0]
x(8) = [1, 1]
x∗ ← feasible x(i) with minimum cost
λ ← recover duals(x∗, P, c)

12:
13:
14:
15:
16: end if
17: return x∗, λ

APPENDIX B
INTERIOR-POINT LINEAR SYSTEM SOLVER

In our primal-dual

interior-point method, we solve two
linear systems ((7) and (8)) to compute the Newton steps.
This linear system takes the following form for an arbitrary
right hand side vector designated by v1, v2, v3.
v1
v2
v3

GT
P
0 D(λ) D(s)
G

∆x
∆s
∆λ

 =

(41)

 ,





















0

0

I

The resulting algorithm for solving this linear system via a
single Cholesky decomposition is shown in 6, where it is
important to note that the Cholesky factorization only needs
to take place during the ﬁrst solving of (7), and can be cached
and reused for the subsequent solve of (8).

Algorithm 5 Recover Duals from Primal Solution

λ1 ← y1

1: function recover duals(x∗, P, c)
2: y ← −P x∗ − c
3: λ ← 0
4: (cid:15) ← 1 · 10−12
5: if y1 ≥ (cid:15) then
6:
7: end if
8: if y2 ≥ (cid:15) then
9:
10: end if
11: if y1 ≤ −(cid:15) then
12:
13: end if
14: if y2 ≤ −(cid:15) then
15:
16: end if
17: return λ

λ4 ← −y2

λ3 ← −y1

λ2 ← y2

Algorithm 6 Interior-Point Linear System Solver

1: function solve pdip linear system(P, G, λ, s, v1, v2, v3)
2: W ← D(λ/s)
3: L ← cholesky(P + GT W G)
4: ∆x ← L−T L−1(−v1 + GT W (−v3 + v2/λ))
5: ∆s ← −G∆x − v3
6: ∆λ ← −(v2 + (z ◦ ∆s))/s
7: return: ∆x, ∆s, ∆λ
