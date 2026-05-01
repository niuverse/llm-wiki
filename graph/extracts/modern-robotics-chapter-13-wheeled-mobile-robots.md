Chapter 13

Wheeled Mobile Robots

A kinematic model of a mobile robot governs how wheel speeds map to robot
velocities, while a dynamic model governs how wheel torques map to robot accel-
erations. In this chapter, we ignore the dynamics and focus on the kinematics.
We also assume that the robots roll on hard, flat, horizontal ground without
skidding (i.e., tanks and skid-steered vehicles are excluded). The mobile robot
is assumed to have a single rigid-body chassis (not articulated like a tractor-
trailer) with a configuration Tsb 2 SE(2) representing a chassis-fixed frame {b}
relative to a fixed space frame {s} in the horizontal plane. We represent Tsb
by the three coordinates q = ( , x, y). We also usually represent the velocity of
the chassis as the time derivative of the coordinates, q̇ = ( ˙ , ẋ, ẏ). Occasionally
it will be convenient to refer to the chassis’ planar twist Vb = (!bz , vbx , vby )
expressed in {b}, where
                      2       3    2                      32        3
                         !bz          1     0        0          ˙
              Vb = 4 vbx 5 = 4 0 cos              sin 5 4 ẋ 5 ,                 (13.1)
                         vby          0    sin    cos          ẏ
                       2     3     2                      32           3
                           ˙          1    0        0          !bz
                q̇ = 4 ẋ 5 = 4 0 cos              sin 5 4 vbx 5 .               (13.2)
                          ẏ          0 sin      cos           vby

    This chapter covers kinematic modeling, motion planning, and feedback con-
trol for wheeled mobile robots, and concludes with a brief introduction to mobile
manipulation, which is the problem of controlling the end-e↵ector motion of a
robot arm mounted on a mobile platform.



                                         515
516                                                     13.1. Types of Wheeled Mobile Robots




Figure 13.1: (Left) A typical wheel that rolls without sideways slip – here a unicycle
wheel. (Middle) An omniwheel. (Right) A mecanum wheel. Omniwheel and mecanum
wheel images from VEX Robotics, Inc., used with permission.


13.1        Types of Wheeled Mobile Robots
Wheeled mobile robots may be classified in two major categories, omnidirec-
tional and nonholonomic. Omnidirectional mobile robots have no equality
constraints on the chassis velocity q̇ = ( ˙ , ẋ, ẏ), while nonholonomic robots are
subject to a single Pfaffian velocity constraint A(q)q̇ = 0 (see Section 2.4 for an
introduction to Pfaffian constraints). For a car-like robot, this constraint pre-
vents the car from moving directly sideways. Despite this velocity constraint,
the car can reach any ( , x, y) configuration in an obstacle-free plane. In other
words, the velocity constraint cannot be integrated to an equivalent configura-
tion constraint, and therefore it is a nonholonomic constraint.
    Whether a wheeled mobile robot is omnidirectional or nonholonomic depends
in part on the type of wheels it employs (Figure 13.1). Nonholonomic mobile
robots employ conventional wheels, such as you might find on your car: the
wheel rotates about an axle perpendicular to the plane of the wheel at the
wheel’s center, and optionally it can be steered by spinning the wheel about an
axis perpendicular to the ground at the contact point. The wheel rolls without
sideways slip, which is the source of the nonholonomic constraint on the robot’s
chassis.
    Omnidirectional wheeled mobile robots typically employ either omniwheels
or mecanum wheels.1 An omniwheel is a typical wheel augmented with rollers
on its outer circumference. These rollers spin freely about axes in the plane of
  1 These types of wheels are often called “Swedish wheels,” as they were invented by Bengt

Ilon working at the Swedish company Mecanum AB. The usage of, and the di↵erentiation
between, the terms “omniwheel,” “mecanum wheel,” and “Swedish wheel” is not completely
standard, but here we use one popular choice.



      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     517


the wheel and tangential to the wheel’s outer circumference, and they allow
sideways sliding while the wheel drives forward or backward without slip in
that direction. Mecanum wheels are similar, except that the spin axes of the
circumferential rollers are not in the plane of the wheel (see Figure 13.1). The
sideways sliding allowed by omniwheels and mecanum wheels ensures that there
are no velocity constraints on the robot’s chassis.
    Omniwheels and mecanum wheels are not steered, only driven forward or
backward. Because of their small diameter rollers, omniwheels and mecanum
wheels work best on hard, flat ground.
    The issues in the modeling, motion planning, and control of wheeled mobile
robots depend intimately on whether the robot is omnidirectional or nonholo-
nomic, so we treat these two cases separately in the following sections.


13.2       Omnidirectional Wheeled Mobile Robots
13.2.1      Modeling
An omnidirectional mobile robot must have at least three wheels to achieve an
arbitrary three-dimensional chassis velocity q̇ = ( ˙ , ẋ, ẏ), since each wheel has
only one motor (controlling its forward–backward velocity). Figure 13.2 shows
two omnidirectional mobile robots, one with three omniwheels and one with
four mecanum wheels. Also shown are the wheel motions obtained by driving
the wheel motors as well as the free sliding motions allowed by the rollers.
   Two important questions in kinematic modeling are the following.
 (a) Given a desired chassis velocity q̇, at what speeds must the wheels be
     driven?

 (b) Given limits on the individual wheel driving speeds, what are the limits
     on the chassis velocity q̇?

    To answer these questions, we need to understand the wheel kinematics
illustrated in Figure 13.3. In a frame x̂w –ŷw at the center of the wheel, the
linear velocity of the center of the wheel is written v = (vx , vy ), which satisfies
                                                  
                       vx              1               sin
                            = vdrive       + vslide             ,             (13.3)
                       vy              0              cos

where denotes the angle at which free “sliding” occurs (allowed by the passive
rollers on the circumference of the wheel), vdrive is the driving speed, and vslide is



     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
518                                            13.2. Omnidirectional Wheeled Mobile Robots




                                                                                free
                                driving                                       “sliding”
                                                                                             driving


                                    free
                                 “sliding”


Figure 13.2: (Left) A mobile robot with three omniwheels. Also shown for one
omniwheel is the direction in which the wheel can freely slide due to the rollers, as
well as the direction in which the wheel rolls without slipping when driven by the wheel
motor. (The upper image is from www.superdroidrobots.com, used with permission.)
(Right) The KUKA youBot mobile manipulator system, which uses four mecanum
wheels for its mobile base. (The upper image is from KUKA Roboter GmbH, used
with permission.)


the sliding speed. For an omniwheel = 0 and, for a mecanum wheel, typically
  = ±45 . Solving Equation (13.3), we get
                                      vdrive = vx + vy tan ,
                                      vslide = vy / cos .
Letting r be the radius of the wheel and u be the driving angular speed of the
wheel,
                             vdrive   1
                         u=         = (vx + vy tan ).                       (13.4)
                               r      r
   To derive the full transformation from the chassis velocity q̇ = ( ˙ , ẋ, ẏ) to
the driving angular speed ui for wheel i, refer to the notation illustrated in

      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     519


                                                              driven component =
                                                                vx + vy tan

 free “sliding” direction
                                                          free                  ŷw        v = (vx , vy )
                                                     component =
                                                       vy / cos


                             driving direction                                                      x̂w

Figure 13.3: (Left) The driving direction and the direction in which the rollers
allow the wheel to slide freely. For an omniwheel = 0 and, for a mecanum wheel,
typically = ±45 . (Right) The driven and free sliding speeds for the wheel velocity
v = (vx , vy ) expressed in the wheel frame x̂w –ŷw , where the x̂w -axis is aligned with
the forward driving direction.


Figure 13.4. The chassis frame {b} is at q = ( , x, y) in the fixed space frame
{s}. The center of the wheel and its driving direction are given by ( i , xi , yi )
expressed in {b}, the wheel’s radius is ri , and the wheel’s sliding direction is
given by i . Then ui is related to q̇ by

ui = hi ( )q̇ =
                                                                2                              32     3
                                                               1        0            0           ˙
  1 tan i       cos i          sin i            yi    1   0     4 0                            5 4 ẋ 5 .
                                                                         cos          sin
  ri r i         sin i         cos i           xi     0   1
                                                                  0       sin         cos          ẏ
                                                                                                  (13.5)

Reading from right to left: the first transformation expresses q̇ as Vb ; the second
transformation produces the linear velocity at the wheel in {b}; the third trans-
formation expresses this linear velocity in the wheel frame x̂w –ŷw ; and the final
transformation calculates the driving angular velocity using Equation (13.4).
   Evaluating Equation (13.5) for hi ( ), we get
                                     2                                                3T
                                  xi sin( i + i ) yi cos( i +                   i)
                           1    4                                                     5 .
              hi ( ) =                    cos( i + i + )                                            (13.6)
                       ri cos i
                                          sin( i + i + )

For an omnidirectional robot with m        3 wheels, the matrix H( ) 2 Rm⇥3
mapping a desired chassis velocity q̇ 2 R to the vector of wheel driving speeds
                                         3




     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
520                                                 13.2. Omnidirectional Wheeled Mobile Robots


                                                          driving direction

                                                                      i
                                                       wheel i


                                   free “sliding”         i      (xi , yi )
                                    direction
                                         ŷb                         x̂b
                           ŷ
                                                         {b}

                                                        (x, y)

                          {s}                  x̂

Figure 13.4: The fixed space frame {s}, a chassis frame {b} at ( , x, y) in {s},
and wheel i at (xi , yi ) with driving direction i , both expressed in {b}. The sliding
direction of wheel i is defined by i .


u 2 Rm is constructed by stacking the m rows hi ( ):
                                    2        3
                                      h1 ( ) 2       3
                                    6 h2 ( ) 7     ˙
                                    6        74
                      u = H( )q̇ = 6     ..  7 ẋ 5 .                                             (13.7)
                                    4     .  5
                                                  ẏ
                                      hm ( )

  We can also express the relationship between u and the body twist Vb . This
mapping does not depend on the chassis orientation :
                                   2         3
                                      h1 (0) 2       3
                                   6 h2 (0) 7 !bz
                                   6         74
                   u = H(0)Vb = 6        ..  7 vbx 5 .                 (13.8)
                                   4      .  5
                                                 vby
                                      hm (0)

    The wheel positions and headings ( i , xi , yi ) in {b}, and their free slid-
ing directions i , must be chosen so that H(0) is rank 3. For example, if we
constructed a mobile robot of omniwheels whose driving directions and sliding
directions were all aligned, the rank of H(0) would be 2, and there would be no
way to controllably generate translational motion in the sliding direction.


      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     521


                 wheel 1
               1 = 0, 1 = 0
                                                                 wheel 4         wheel 1
                                                                 4 = ⇡/4         1 =  ⇡/4



                                                         w                 ŷb
                    ŷb
                                                                                    x̂b
                          x̂b
                   d

                                                               3 =   ⇡/4           2 = ⇡/4
     wheel 3                       wheel 2                       wheel 3         wheel 2
    3 = 0,    3 = 2⇡/3          2 = 0, 2 =        2⇡/3

Figure 13.5: Kinematic models for mobile robots with three omniwheels and four
mecanum wheels. The radius of all wheels is r and the driving direction for each of
the mecanum wheels is i = 0.


   In the case m > 3, as for the four-wheeled youBot of Figure 13.2, choosing
u such that Equation (13.8) is not satisfied for any Vb 2 R3 implies that the
wheels must skid in their driving directions.
   Using the notation in Figure 13.5, the kinematic model of the mobile robot
with three omniwheels is
        2     3                 2                         32      3
           u1                       d     1         0         !bz
                              1
    u = 4 u2 5 = H(0)Vb = 4 d             1/2    sin(⇡/3) 5 4 vbx 5    (13.9)
                              r
           u3                       d     1/2 sin(⇡/3)        vby

and the kinematic model of the mobile robot with four mecanum wheels is
           2    3               2                   3
             u1                      ` w 1        1 2       3
           6 u2 7                                       !
                               16
                                6 `+w 1           1 7    bz
      u=6       7
           4 u3 5 = H(0)Vb = r 4 ` + w 1
                                                    7 4 vbx 5 .    (13.10)
                                                  1 5
                                                        vby
             u4                      ` w 1        1

For the mecanum robot, to move in the direction +x̂b , all wheels drive forward
at the same speed; to move in the direction +ŷb , wheels 1 and 3 drive backward
and wheels 2 and 4 drive forward at the same speed; and to rotate in the
counterclockwise direction, wheels 1 and 4 drive backward and wheels 2 and 3
drive forward at the same speed. Note that the robot chassis is capable of the
same speeds in the forward and sideways directions.


     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
522                                              13.3. Nonholonomic Wheeled Mobile Robots


     If the driving angular velocity of wheel i is subject to the bound |ui |  ui,max ,
i.e.,
                            ui,max  ui = hi (0)Vb  ui,max ,
then two parallel constraint planes defined by ui,max = hi (0)Vb and ui,max =
hi (0)Vb are generated in the three-dimensional space of body twists. Any Vb
between these two planes does not violate the maximum driving speed of wheel
i, while any Vb outside this slice is too fast for wheel i. The normal direction to
the constraint planes is hTi (0), and the points on the planes closest to the origin
are ui,max hT i (0)/khi (0)k2
                              and ui,max hT              2
                                           i (0)/khi (0)k .
    If the robot has m wheels then the region of feasible body twists V is bounded
by the m pairs of parallel constraint planes. The region V is therefore a convex
three-dimensional polyhedron. The polyhedron has 2m faces and the origin
(corresponding to zero twist) is in the center. Visualizations of the six-sided
and eight-sided regions V for the three-wheeled and four-wheeled models in
Figure 13.5 are shown in Figure 13.6.

13.2.2       Motion Planning
Since omnidirectional mobile robots are free to move in any direction, any of
the trajectory planning methods for kinematic systems in Chapter 9, and most
of the motion planning methods of Chapter 10, can be adapted.

13.2.3       Feedback Control
Given a desired trajectory qd (t), we can adopt the feedforward plus PI feedback
controller (11.15) to track the trajectory:
                                                           Z t
          q̇(t) = q̇d (t) + Kp (qd (t)       q(t)) + Ki          (qd (t)   q(t)) dt,             (13.11)
                                                             0

where Kp = kp I 2 R3⇥3 and Ki = ki I 2 R3⇥3 have positive values along
the diagonal and q(t) is an estimate of the actual configuration derived from
sensors. Then q̇(t) can be converted to the commanded wheel driving velocities
u(t) using Equation (13.7).


13.3        Nonholonomic Wheeled Mobile Robots
In Section 2.4, the k Pfaffian velocity constraints acting on a system with con-
figuration q 2 Rn were written as A(q)q̇ = 0, where A(q) 2 Rk⇥n . Instead of
specifying the k directions in which velocities are not allowed, we can write the

      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     523




              !bz
                                                                     !bz
           vbx
                                                                  vbx v
                    vby                                                 by




              vby                                                    vby

                          vbx                                                   vbx




Figure 13.6: (Top row) Regions of feasible body twists V for the three-wheeled (left)
and four-wheeled (right) robots of Figure 13.5. Also shown for the three-wheeled robot
is the intersection with the !bz = 0 plane. (Bottom row) The bounds in the !bz = 0
plane (translational motions only).


allowable velocities of a kinematic system as a linear combination of n k veloc-
ity directions. This representation is equivalent, and it has the advantage that
the coefficients of the linear combinations are precisely the controls available to
us. We will see this representation in the kinematic models below.
    The title of this section implies that the velocity constraints are not inte-
grable to equivalent configuration constraints. We will establish this formally
in Section 13.3.2.

13.3.1      Modeling
13.3.1.1     The Unicycle
The simplest wheeled mobile robot is a single upright rolling wheel, or unicycle.
Let r be the radius of the wheel. We write the configuration of the wheel as


     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
524                                              13.3. Nonholonomic Wheeled Mobile Robots




                 ẑ                             ✓

                             ŷ
                                       (x, y)
                             x̂




               Figure 13.7: A wheel rolling on a plane without slipping.


q = ( , x, y, ✓), where (x, y) is the contact point,      is the heading direction,
and ✓ is the rolling angle of the wheel (Figure 13.7). The configuration of the
“chassis” (e.g., the seat of the unicycle) is ( , x, y). The kinematic equations of
motion are
       2     3 2                 3
           ˙            0     1 
       6 ẋ 7 6 r cos         0 7
  q̇ = 6     7=6                 7 u1 = G(q)u = g1 (q)u1 + g2 (q)u2 . (13.12)
       4 ẏ 5 4 r sin         0 5 u2
          ✓˙            1     0

The control inputs are u = (u1 , u2 ), with u1 the wheel’s forward–backward
driving speed and u2 the heading direction turning speed. The controls are
subject to the constraints u1,max  u1  u1,max and u2,max  u2  u2,max .
     The vector-valued functions gi (q) 2 R4 are the columns of the matrix G(q),
and they are called the tangent vector fields (also called the control vector
fields or simply the velocity vector fields) over q associated with the controls
ui = 1. Evaluated at a specific configuration q, gi (q) is a tangent vector (or
velocity vector) of the tangent vector field.
     An example of a vector field on R2 is illustrated in Figure 13.8.
     All our kinematic models of nonholonomic mobile robots will have the form
q̇ = G(q)u, as in Equation (13.12). Three things to notice about these models
are: (1) there is no drift – zero controls mean zero velocity; (2) the vector fields
gi (q) are generally functions of the configuration q; and (3) q̇ is linear in the
controls.
     Since we are not usually concerned with the rolling angle of the wheel, we



      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     525




                                                ŷ


                                                             x̂




                      Figure 13.8: The vector field (ẋ, ẏ) = ( y, x).


can drop the fourth row from (13.12) to get the simplified control system
                         2    3 2               3
                            ˙          0     1 
                                                   u1
                    q̇ = 4 ẋ 5 = 4 r cos    0 5          .             (13.13)
                                                   u2
                           ẏ       r sin    0

13.3.1.2     The Di↵erential-Drive Robot
The di↵erential-drive robot, or di↵-drive, is perhaps the simplest wheeled
mobile robot architecture. A di↵-drive robot consists of two independently
driven wheels of radius r that rotate about the same axis, as well as one or more
caster wheels, ball casters, or low-friction sliders that keep the robot horizontal.
Let the distance between the driven wheels be 2d and choose the (x, y) reference
point halfway between the wheels (Figure 13.9). Writing the configuration as
q = ( , x, y, ✓L , ✓R ), where ✓L and ✓R are the rolling angles of the left and right
wheels, respectively, the kinematic equations are
                          2 ˙ 3 2                       3
                                        r/2d     r/2d
                          6 ẋ 7 6 r cos        r       7
                          6     7 6 2r          2 cos   7 uL
                          6     7   6
                     q̇ = 6 ẏ 7 = 6 2 sin      r       7
                                                2 sin   7 uR ,                (13.14)
                          4 ✓˙L 5 4      1         0    5
                            ˙✓R          0         1



     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
526                                              13.3. Nonholonomic Wheeled Mobile Robots




                                                d
                                  ŷ            (x, y)



                                                   x̂

Figure 13.9: A di↵-drive robot consisting of two typical wheels and one ball caster
wheel, shaded gray.


where uL is the angular speed of the left wheel and uR that of the right. A
positive angular speed of each wheel corresponds to forward motion at that
wheel. The control value at each wheel is taken from the interval [ umax , umax ].
   Since we are not usually concerned with the rolling angles of the two wheels,
we can drop the last two rows to get the simplified control system
                      2    3 2                     3
                         ˙          r/2d     r/2d    
                 q̇ = 4 ẋ 5 = 4 2 cos
                                  r         r      5 uL .
                                            2 cos       uR
                                                                         (13.15)
                                  r         r
                        ẏ        2 sin     2 sin

    Two advantages of a di↵-drive robot are its simplicity (typically the motor
is attached directly to the axle of each wheel) and high maneuverability (the
robot can spin in place by rotating the wheels in opposite directions). Casters
are often not appropriate for outdoor use, however.

13.3.1.3      The Car-Like Robot
The most familiar wheeled vehicle is a car, with two steered front wheels and
two fixed-heading rear wheels. To prevent slipping of the front wheels, they are
steered using Ackermann steering, as illustrated in Figure 13.10. The center
of rotation of the car’s chassis lies on the line passing through the rear wheels
at the intersection with the perpendicular bisectors of the front wheels.
    To define the configuration of the car, we ignore the rolling angles of the four
wheels and write q = ( , x, y, ), where (x, y) is the location of the midpoint
between the rear wheels, is the car’s heading direction, and is the steering
angle of the car, defined at a virtual wheel at the midpoint between the front
wheels. The controls are the forward speed v of the car at its reference point


      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     527


                                         CoR




                                    rmin
            ŷ


                                                     (x, y)

           {s}                x̂

Figure 13.10: The two front wheels of a car are steered at di↵erent angles using
Ackermann steering such that all wheels roll without slipping (i.e., the wheel heading
direction is perpendicular to the line connecting the wheel to the CoR). The car is
shown executing a turn at its minimum turning radius rmin .


and the angular speed w of the steering angle. The car’s kinematics are
                        2    3 2                 3
                           ˙        (tan )/` 0 
                        6 ẋ 7 6 cos           0 7
                   q̇ = 6    7=6                 7 v ,                  (13.16)
                        4 ẏ 5 4      sin      0 5 w
                           ˙            0      1
where ` is the wheelbase between the front and rear wheels. The control v is
limited to a closed interval [vmin , vmax ] where vmin < 0 < vmax , the steering rate
is limited to [ wmax , wmax ] with wmax > 0, and the steering angle is limited
to [ max , max ] with max > 0.
     The kinematics (13.16) can be simplified if the steering control is actually
just the steering angle and not its rate w. This assumption is justified if the
steering rate limit wmax is high enough that the steering angle can be changed
nearly instantaneously by a lower-level controller. In this case, is eliminated
as a state variable, and the car’s configuration is simply q = ( , x, y). We use
the control inputs (v, !), where v is still the car’s forward speed and ! is now its
rate of rotation. These can be converted to the controls (v, ) by the relations
                                                    ✓ ◆
                                                  1   `!
                           v = v,          = tan          .                   (13.17)
                                                       v
The constraints on the controls (v, !) due to the constraints on (v, ) take a
somewhat complicated form, as we will see shortly.

     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
528                                                  13.3. Nonholonomic Wheeled Mobile Robots


      The simplified car kinematics can now be written
                         2    3           2           3
                            ˙                 0    1 
                                                        v
                    q̇ = 4 ẋ 5 = G(q)u = 4 cos    0 5                             .              (13.18)
                                                        !
                           ẏ               sin    0

The nonholonomic constraint implied by (13.18) can be derived using one of the
equations from (13.18),

                                                ẋ = v cos ,
                                                ẏ = v sin ,

to solve for v, then substituting the result into the other equation to get

                    A(q)q̇ = [0 sin             cos ]q̇ = ẋ sin        ẏ cos    = 0.

13.3.1.4       Canonical Simplified Model for Nonholonomic Mobile Robots
The kinematics (13.18) gives a canonical simplified model for nonholonomic mo-
bile robots. Using control transformations such as (13.17), the simplified uni-
cycle kinematics (13.13) and the simplified di↵erential-drive kinematics (13.15)
can also be expressed in this form. The control transformation for the simplified
unicycle kinematics (13.13) is
                                                 v
                                        u1 =       ,      u2 = !
                                                 r
and the transformation for the simplified di↵-drive kinematics (13.15) is
                                        v       !d               v + !d
                                uL =                 ,   uR =           .
                                            r                       r
With these input transformations, the only di↵erence between the simplified
unicycle, di↵-drive robot, and car kinematics is the control limits on (v, !).
These are illustrated in Figure 13.11.
    We can use the two control inputs (v, !) in the canonical model (13.18) to
directly control the two components of the linear velocity of a reference point
P fixed to the robot chassis. This is useful when a sensor is located at P , for
example. Let (xP , yP ) be the coordinates of P in the world frame, and (xr , yr )
be its (constant) coordinates in the chassis frame {b} (Figure 13.12). To find
the controls (v, !) needed to achieve a desired world-frame motion (ẋP , ẏP ), we
first write                                           
                    xP         x        cos      sin       xr
                         =         +                           .           (13.19)
                    yP         y        sin      cos       yr

       Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     529


       !                           !                             !                         !



                    v                              v                        v                           v


     unicycle              diff-drive robot                       car                forward-only car

Figure 13.11: The (v, !) control sets for the simplified unicycle, di↵-drive robot,
and car kinematics. For the car with a reverse gear, control set illustrates that it is
incapable of turning in place. The angle of the sloped lines in its bowtie control set
is determined by its minimum turning radius. If a car has no reverse gear, only the
right-hand half of the bowtie is available.


                                                       P (xr , yr )

                                         ŷb
                                                        x̂b
                                           (x, y)



  Figure 13.12: The point P is located at (xr , yr ) in the chassis-fixed frame {b}.


Di↵erentiating, we obtain
                                                                         
                 ẋP       ẋ                           sin           cos       xr
                      =                  + ˙                                          .         (13.20)
                 ẏP       ẏ                           cos           sin       yr

Substituting ! for ˙ and (v cos , v sin ) for (ẋ, ẏ) and solving, we get
                                                            
       v       1   xr cos      yr sin   xr sin + yr cos          ẋP
            =                                                         .    (13.21)
       !      xr           sin                cos                ẏP

This equation may be read as [v !]T = J 1 (q)[ẋP ẏP ]T , where J(q) is the
Jacobian relating (v, !) to the world-frame motion of P . Note that the Jacobian
J(q) is singular when P is chosen on the line xr = 0. Points on this line, such as
the midway point between the wheels of a di↵-drive robot or between the rear
wheels of a car, can only move in the heading direction of the vehicle.



     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
530                                              13.3. Nonholonomic Wheeled Mobile Robots


13.3.2       Controllability
The feedback control for an omnidirectional robot is simple, as there is a set
of wheel driving speeds for any desired chassis velocity q̇ (Equation (13.7)). In
fact, if the goal of the feedback controller is simply to stabilize the robot to the
origin q = (0, 0, 0), rather than trajectory tracking as in the control law (13.11),
we could use the even simpler feedback controller

                                           q̇(t) =    Kq(t)                                      (13.22)

for any positive-definite K. The feedback gain matrix K acts like a spring to
pull q to the origin, and Equation (13.7) is used to transform q̇(t) to u(t). The
same type of “linear spring” controller could be used to stabilize the point P on
the canonical nonholonomic robot (Figure 13.12) to (xP , yP ) = (0, 0) since, by
Equation (13.21), any desired (ẋP , ẏP ) can be achieved by the controls (v, !).2
    In short, the kinematics of the omnidirectional robot, as well as the kine-
matics of the point P for the nonholonomic robot, can be rewritten in the
single-integrator form
                                       ẋ = ⌫,                             (13.23)
where x is the configuration we are trying to control and ⌫ is a “virtual control”
that is actually implemented using the transformations in Equation (13.7) for
an omnidirectional robot or Equation (13.21) for the control of P by a nonholo-
nomic robot. Equation (13.23) is a simple example of the more general class of
linear control systems
                                 ẋ = Ax + B⌫,                             (13.24)
which are known to be linearly controllable if the Kalman rank condition
is satisfied:
              rank [B AB A2 B · · · An 1 B] = dim(x) = n,
where x 2 Rn , ⌫ 2 Rm , A 2 Rn⇥n , and B 2 Rn⇥m . In Equation (13.23), A = 0
and B is the identity matrix, trivially satisfying the rank condition for linear
controllability since m = n. Linear controllability implies the existence of the
simple linear control law
                                  ⌫ = Kx,
as in Equation (13.22), to stabilize the origin.
    There is no linear controller that can stabilize the full chassis configuration
to q = 0 for a nonholonomic robot, however; the nonholonomic robot is not
linearly controllable. In fact, there is no controller that is a continuous function
   2 For the moment we ignore the di↵erent constraints on (v, !) for the unicycle, di↵-drive

robot, and car-like robot, as they do not change the main result.


      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                      531


of q which can stabilize q = 0. This fact is embedded in the following well-known
result, which we state without proof.

Theorem 13.1. A system q̇ = G(q)u with rank G(0) < dim(q) cannot be
stabilized to q = 0 by a continuous time-invariant feedback control law.

This theorem applies to our canonical nonholonomic robot model, since the
rank of G(q) is 2 everywhere (there are only two control vector fields), while the
chassis configuration is three dimensional.
    For nonlinear systems of the form q̇ = G(q)u, there are other notions of
controllability. We consider a few of these next and show that, even though the
canonical nonholonomic robot is not linearly controllable, it still satisfies other
important notions of controllability. In particular, the velocity constraint does
not integrate to a configuration constraint – the set of reachable configurations
is not reduced because of the velocity constraint.

13.3.2.1      Definitions of Controllability
Our definitions of nonlinear controllability rely on the notion of the time- and
space-limited reachable sets of the nonholonomic robot from a configuration q.

Definition 13.2. Given a time T > 0 and a neighborhood3 W of an initial
configuration q, the reachable set of configurations from q at time T by feasible
trajectories remaining inside W is written RW (q, T ). We further define the
union of reachable sets at times t 2 [0, T ]:
                                           [
                         RW (q,  T ) =       RW (q, t).
                                                    0tT

    We now provide some standard definitions of nonlinear controllability.

Definition 13.3. A robot is controllable from q if, for any qgoal , there exists
a control trajectory u(t) that drives the robot from q to qgoal in finite time
T . The robot is small-time locally accessible (STLA) from q if, for any
time T > 0 and any neighborhood W , the reachable set RW (q,  T ) is a full-
dimensional subset of the configuration space. The robot is small-time locally
controllable (STLC) from q if, for any time T > 0 and any neighborhood W ,
the reachable set RW (q,  T ) is a neighborhood of q.
   3 A neighborhood W      of a configuration q is any full-dimensional subset of configuration
space containing q in its interior. For example, the set of configurations in a ball of radius
r > 0 centered at q (i.e., all qb satisfying kqb qk < r) is a neighborhood of q.




      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
532                                              13.3. Nonholonomic Wheeled Mobile Robots


                                    W

                                           q                   q
                                        STLA                STLC

Figure 13.13: Illustrations of small-time local accessibility (STLA) and small-time
local controllability (STLC) in a two-dimensional space. The shaded regions are the
reachable sets without leaving the neighborhood W .


     Small-time local accessibility and small-time local controllability are illus-
trated in Figure 13.13 for a two-dimensional configuration space. Clearly STLC
at q is a stronger condition than STLA at q. If a system is STLC at all q, then
it is controllable from any q by the patching together of paths in neighborhoods
from q to qgoal .
     For all the examples in this chapter, if a controllability property holds for
any q then it holds for all q, since the maneuverability of the robot does not
change with its configuration.
     Consider the examples of a car and of a forward-only car with no reverse
gear. A forward-only car is STLA, as we will see shortly, but it is not STLC:
if it is confined to a tight space (a small neighborhood W ), it cannot reach
configurations directly behind its initial configuration. A car with a reverse
gear is STLC, however. Both cars are controllable in an obstacle-free plane,
because even a forward-only car can drive anywhere.
     If there are obstacles in the plane, there may be some free-space configura-
tions that the forward-only car cannot reach but that the STLC car can reach.
(Consider an obstacle directly in front of the car, for example.) If the obstacles
are all defined as closed subsets of the plane containing their boundaries, the
STLC car can reach any configuration in its connected component of the free
space, despite its velocity constraint.
     It is worth thinking about this last statement for a moment. All free configu-
rations have collision-free neighborhoods, since the free space is defined as open
and the obstacles are defined as closed (containing their boundaries). Therefore
it is always possible to maneuver in any direction from any free configuration.
If your car is shorter than the available parking space, you can parallel park
into it, even if it takes a long time!
     If any controllability property holds (controllability, STLA, or STLC) then
the reachable configuration space is full dimensional, and therefore any velocity
constraints on the system are nonholonomic.



      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     533


13.3.2.2     Controllability Tests
Consider a driftless linear-in-the-control (control-affine) system
                     m
                     X
    q̇ = G(q)u =           gi (q)ui ,      q 2 Rn ,         u 2 U ⇢ Rm ,         m < n,         (13.25)
                     i=1

generalizing the canonical nonholonomic model where n = 3 and m = 2. The set
of feasible controls is U ⇢ Rm . For example, the control sets U for the unicycle,
di↵-drive, car-like, and forward-only car-like robots were shown in Figure 13.11.
In this chapter we consider two types of control sets U : those whose positive
linear span is Rm , i.e., pos(U ) = Rm , such as the control sets for the unicycle,
di↵-drive robot, and car in Figure 13.11, and those whose positive linear span
does not cover Rm but whose linear span does, i.e., span(U ) = Rm , such as the
control set for the forward-only car in Figure 13.11.
     The local controllability properties (STLA or STLC) of (13.25) depend on
the noncommutativity of motions along the vector fields gi . Let F✏gi (q) be the
configuration reached by following the vector field gi for time ✏ starting from q.
                                                        g                    g
Then two vector fields gi (q) and gj (q) commute if F✏ j (F✏gi (q)) = F✏gi (F✏ j (q)),
i.e., the order of following the vector fields does not matter. If they do not
                   g                   g
commute, i.e., F✏ j (F✏gi (q)) F✏gi (F✏ j (q)) 6= 0 then the order of application
of the vector fields a↵ects the final configuration. In addition, defining the
noncommutativity as

                     q = F✏gj (F✏gi (q))       F✏gi (F✏gj (q))       for small ✏,

if q is in a direction that cannot be achieved directly by any other vector
field gk then switching between gi and gj can create motion in a direction not
present in the original set of vector fields. A familiar example is parallel parking
a car: there is no vector field corresponding to direct sideways translation but,
by alternating forward and backward motion along two di↵erent vector fields,
it is possible to create a net motion to the side.
                              g
     To calculate q(2✏) = F✏ j (F✏gi (q(0))) for small ✏ approximately, we use a
Taylor expansion and truncate the expansion at O(✏3 ). We start by following gi
for a time ✏ and use the fact that q̇ = gi (q) and q̈ = (@gi /@q)q̇ = (@gi /@q)gi (q):
                                         1
                  q(✏) = q(0) + ✏q̇(0) + ✏2 q̈(0) + O(✏3 )
                                         2
                                             1 @gi
                       = q(0) + ✏gi (q(0)) + ✏2     gi (q(0)) + O(✏3 ).
                                             2 @q



     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
534                                               13.3. Nonholonomic Wheeled Mobile Robots


Now, after following gj for a time ✏:

                                  1 @gj
      q(2✏) = q(✏) + ✏gj (q(✏)) + ✏2       gj (q(✏)) + O(✏3 )
                                  2 @q
                                  1 @gi
            = q(0) + ✏gi (q(0)) + ✏2       gi (q(0))
                                  2 @q
                                              1 @gj
                + ✏gj q(0) + ✏gi (q(0)) + ✏2          gj (q(0)) + O(✏3 )
                                              2 @q
                                  1 @gi
            = q(0) + ✏gi (q(0)) + ✏2       gi (q(0))
                                  2 @q
                                  @gj              1 @gj
                + ✏gj (q(0)) + ✏2     gi (q(0)) + ✏2        gj (q(0)) + O(✏3 ).                   (13.26)
                                  @q               2 @q

Note the presence of ✏2 (@gj /@q)gi , the only term that depends on the order of
the vector fields. Using the expression (13.26), we can calculate the noncom-
mutativity:
                                          ✓              ◆
         gj   gi       gi   gj          2   @gj    @gi
   q = F✏ (F✏ (q)) F✏ (F✏ (q)) = ✏              gi     gj (q(0))+O(✏3 ). (13.27)
                                            @q     @q

In addition to measuring the noncommutativity, q is also equal to the net
motion (to order ✏2 ) obtained by following gi for time ✏, then gj for time ✏, then
  gi for time ✏, and then gj for time ✏.
    The term (@gj /@q)gi (@gi /@q)gj in Equation (13.27) is important enough
for us to give it its own name:

Definition 13.4. The Lie bracket of the vector fields gi (q) and gj (q) is
                                    ✓              ◆
                                      @gj    @gi
                    [gi , gj ](q) =       gi     gj (q).                (13.28)
                                      @q     @q

    This Lie bracket is the same as that for twists, introduced in Section 8.2.2.
The only di↵erence is that the Lie bracket in Section 8.2.2 was thought of as the
noncommutativity of two twists Vi , Vj defined at a given instant, rather than
of two velocity vector fields defined over all configurations q. The Lie bracket
from Section 8.2.2 would be identical to the expression in Equation (13.28) if the
constant twists were represented as vector fields gi (q), gj (q) in local coordinates
q. See Exercise 13.20, for example.
    The Lie bracket of two vector fields gi (q) and gj (q) should itself be thought
of as a vector field [gi , gj ](q), where approximate motion along the Lie bracket
vector field can be obtained by switching between the original two vector fields.

       Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     535


As we saw in our Taylor expansion, motion along the Lie bracket vector field is
slow relative to the motions along the original vector fields; for small times ✏,
motion of order ✏ can be obtained in the directions of the original vector fields,
while motion in the Lie bracket direction is only of order ✏2 . This agrees with
our common experience that moving a car sideways by parallel parking motions
is slow relative to forward and backward or turning motions, as discussed in the
next example.
Example 13.5. Consider the canonical nonholonomic robot with vector fields
g1 (q) = (0, cos , sin ) and g2 (q) = (1, 0, 0). Writing g1 (q) and g2 (q) as column
vectors, the Lie bracket vector field g3 (q) = [g1 , g2 ](q) is given by
                             ✓              ◆
                               @g2    @g1
    g3 (q) = [g1 , g2 ](q) =       g1     g2 (q)
                               @q     @q
                             2         32         3 2                    32      3
                                0 0 0         0                0     0 0      1
                           = 4 0 0 0 5 4 cos 5 4 sin                 0 0 54 0 5
                                0 0 0       sin             cos      0 0      0
                             2        3
                                   0
                           = 4   sin  5.
                                  cos

The Lie bracket direction is a sideways “parallel parking” motion, as illustrated
in Figure 13.14. The net motion obtained by following g1 for ✏, g2 for ✏, g1
for ✏, and g2 for ✏ is a motion of order ✏2 in this Lie bracket direction, plus a
term of order ✏3 .
     From the result of Example 13.5, no matter how small the maneuvering
space is for a car with a reverse gear, it can generate sideways motion. Thus
we have shown that the Pfaffian velocity constraint implicit in the kinematics
q̇ = G(q)u for the canonical nonholonomic mobile robot is not integrable to a
configuration constraint.
     A Lie bracket [gi , gj ] is called a Lie product of degree 2, because the original
vector fields appear twice in the bracket. For the canonical nonholonomic model,
it is only necessary to consider the degree-2 Lie product to show that there are no
configuration constraints. To test whether there are configuration constraints for
more general systems of the form (13.25), it may be necessary to consider nested
Lie brackets, such as [gi , [gj , gk ]] or [gi , [gi , [gi , gj ]]], which are Lie products of
degree 3 and 4, respectively. Just as it is possible to generate motions in Lie
bracket directions by switching between the original vector fields, it is possible to
generate motion in Lie product directions of degree greater than 2. Generating
motions in these directions is even slower than for degree-2 Lie products.

     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
536                                                           13.3. Nonholonomic Wheeled Mobile Robots


                                        ✓ˆ
                                                                           ŷ


                                                                                           x̂

                  g1              g2         2
                                                 [g1 , g2 ]
                                                                          Top View of Unicycle


               g2       O( 3 )
                                    g1
                                                                                ŷ


             x̂

Figure 13.14: The Lie bracket, [g1 , g2 ](q), of the forward–backward vector field g1 (q)
and the spin-in-place vector field g2 (q) is a sideways vector field.


   The Lie algebra of a set of vector fields is defined by all Lie products of all
degrees, including Lie products of degree 1 (the original vector fields themselves):

Definition 13.6. The Lie algebra of a set of vector fields G = {g1 , . . . , gm },
written Lie(G), is the linear span of all Lie products of degree 1, . . . , 1 of the
vector fields G.

   For example, for G = {g1 , g2 }, Lie(G) is given by the linear combinations of
the following Lie products:
 degree 1:          g 1 , g2
 degree 2:          [g1 , g2 ]
 degree 3:          [g1 , [g1 , g2 ]]; [g2 , [g1 , g2 ]]
 degree 4:          [g1 , [g1 , [g1 , g2 ]]]; [g1 , [g2 , [g1 , g2 ]]]; [g2 , [g1 , [g1 , g2 ]]]; [g2 , [g2 , [g1 , g2 ]]]
     ..                 ..
      .                  .
Since Lie products obey the following identities,

      • [gi , gi ] = 0,
      • [gi , gj ] =      [gj , gi ],


        Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     537


   • [gi , [gj , gk ]] + [gk , [gi , gj ]] + [gj , [gk , gi ]] = 0 (the Jacobi identity),

not all bracket combinations need to be considered at each degree level.
     In practice there will be a finite degree k beyond which higher-degree Lie
products yield no more information about the Lie algebra. This happens, for
example, when the dimension of the Lie products generated so far is n at all q,
i.e., dim(Lie(G)(q)) = dim(q) = n for all q; no further Lie brackets can yield new
motion directions, as all motion directions have already been obtained. If the
dimension of the Lie products generated so far is less than n, however, in general
there is no way to know when to stop trying higher-degree Lie products.4
     With all this as background, we are finally ready to state our main theorem
on controllability.

Theorem 13.7. The control system (13.25), with G = {g1 (q), . . . , gm (q)},
is small-time locally accessible from q if dim(Lie(G)(q)) = dim(q) = n and
span(U ) = Rm . If additionally pos(U ) = Rm then the system is small-time
locally controllable from q.

    We omit a formal proof, but intuitively we can argue as follows. If the Lie
algebra is full rank then the vector fields (followed both forward and backward)
locally permit motion in any direction. If pos(U ) = Rm (as for a car with a
reverse gear) then it is possible to directly follow all vector fields forward or
backward, or to switch between feasible controls in order to follow any vector
field forward and backward arbitrarily closely, and therefore the Lie algebra
rank condition implies STLC. If the controls satisfy only span(U ) = Rm (like
a forward-only car), then some vector fields may be followed only forward or
backward. Nevertheless, the Lie algebra rank condition ensures that there are
no equality constraints on the reachable set, so the system is STLA.
    For any system of the form (13.25), the question whether the velocity con-
straints are integrable is finally answered by Theorem 13.7. If the system is
STLA at any q, the constraints are not integrable.
    Let’s apply Theorem 13.7 to a few examples.

Example 13.8 (Controllability of the canonical nonholonomic mobile robot).
In Example 13.5 we computed the Lie bracket g3 = [g1 , g2 ] = (0, sin , cos )
for the canonical nonholonomic robot. Putting the column vectors g1 (q), g2 (q),
  4 When the system (13.25) is known to be regular, however, if there is a degree k that

yields no new motion directions not included at lower degrees then there is no need to look
at higher-degree Lie products.




     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
538                                              13.3. Nonholonomic Wheeled Mobile Robots


and g3 (q) side by side to form a matrix and calculating its determinant, we find
                                    2                  3
                                        0  1      0
  det[ g1 (q) g2 (q) g3 (q) ] = det 4 cos  0    sin    5 = cos2 + sin2 = 1,
                                      sin  0     cos
i.e., the three vector fields are linearly independent at all q, and therefore the
dimension of the Lie algebra is 3 at all q. By Theorem 13.7 and the control sets
illustrated in Figure 13.11, the unicycle, di↵-drive, and car with a reverse gear
are STLC at all q, while the forward-only car is only STLA at all q. Each of the
unicycle, di↵-drive, car, and forward-only car is controllable in an obstacle-free
plane.
Example 13.9 (Controllability of the full configuration of the unicycle). We al-
ready know from the previous example that the unicycle is STLC on its ( , x, y)
subspace; what if we include the rolling angle ✓ in the description of the con-
figuration? According to Equation (13.12), for q = ( , x, y, ✓), the two vector
fields are g1 (q) = (0, r cos , r sin , 1) and g2 (q) = (1, 0, 0, 0). Calculating the
degree-2 and degree-3 Lie brackets
                        g3 (q) = [g1 , g2 ](q) = (0, r sin , r cos , 0),
                        g4 (q) = [g2 , g3 ](q) = (0, r cos , r sin , 0),
we see that these directions correspond to sideways translation and to forward–
backward motion without a change in the wheel rolling angle ✓, respectively.
These directions are clearly linearly independent of g1 (q) and g2 (q), but we can
confirm this by again writing the gi (q) as column vectors and evaluating
                           det[ g1 (q) g2 (q) g3 (q) g4 (q) ] =           r2 ,
i.e., dim(Lie(G)(q)) = 4 for all q. Since pos(U ) = R2 for the unicycle, by Fig-
ure 13.11, the unicycle is STLC at all points in its four-dimensional configuration
space.
     You can come to this same conclusion by constructing a short “parallel
parking” type maneuver which results in a net change in the rolling angle ✓
with zero net change in the other configuration variables.
Example 13.10 (Controllability of the full configuration of the di↵-drive). The
full configuration of the di↵-drive is q = ( , x, y, ✓L , ✓R ), including the angles of
both wheels. The two control vector fields are given in Equation (13.14). Taking
the Lie brackets of these vector fields, we find that we can never create more
than four linearly independent vector fields, i.e.,
                                        dim(Lie(G)(q)) = 4

      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     539


at all q. This is because there is a fixed relationship between the two wheel
angles (✓L , ✓R ) and the angle of the robot chassis . Therefore the three velocity
constraints (dim(q) = 5, dim(u) = 2) implicit in the kinematics (13.14) can be
viewed as two nonholonomic constraints and one holonomic constraint. In the
full five-dimensional configuration space, the di↵-drive is nowhere STLA.
    Since usually we worry only about the configuration of the chassis, this
negative result is not of much concern.

13.3.3      Motion Planning
13.3.3.1     Obstacle-Free Plane
It is easy to find feasible motions between any two chassis configurations q0 and
qgoal in an obstacle-free plane for any of the four nonholonomic robot models (a
unicycle, a di↵-drive, a car with a reverse gear, and a forward-only car). The
problem gets more interesting when we try to optimize an objective function.
Below, we consider shortest paths for the forward-only car, shortest paths for
the car with a reverse gear, and fastest paths for the di↵-drive. The solutions to
these problems depend on optimal control theory, and the proofs can be found
in the original references (see Section 13.7).

Shortest Paths for the Forward-Only Car The shortest-path problem in-
volves finding a path from q0 to qgoal that minimizes the length of the path that is
followed by the robot’s reference point. This is not an interesting question for the
unicycle or the di↵-drive; a shortest path for each of them comprises a rotation
to point toward the goal position (xgoal , ygoal ), a translation,
                                                       p           and then a rotation
to the goal orientation. The total path length is (x0 xgoal )2 + (y0 ygoal )2 .
    The problem is more interesting for the forward-only car, sometimes called
the Dubins car in honor of the mathematician who first studied the structure of
the shortest planar curves with bounded curvature between two oriented points.

Theorem 13.11. For a forward-only car with the control set shown in Fig-
ure 13.11, the shortest paths consist only of arcs at the minimum turning radius
and straight-line segments. Denoting a circular arc segment as C and a straight-
line segment as S, the shortest path between any two configurations follows either
(a) the sequence CSC or (b) the sequence CC↵ C, where C↵ indicates a circular
arc of angle ↵ > ⇡. Any of the C or S segments can be of length zero.

   The two optimal path classes for a forward-only car are illustrated in Fig-
ure 13.15. We can calculate the shortest path by enumerating the possible CSC
and CC↵ C paths. First, construct two minimum-turning-radius circles for the


     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
540                                              13.3. Nonholonomic Wheeled Mobile Robots




                        CSC                                    CC↵ C


Figure 13.15: The two classes of shortest paths for a forward-only car. The CSC
path could be written RSL, and the CC↵ C path could be written LR↵ L.


vehicle at both q0 and qgoal and then solve for (a) the points where lines (with
the correct heading direction) are tangent to one of the circles at q0 and one of
the circles at qgoal , and (b) the points where a minimum-turning-radius circle
(with the correct heading direction) is tangent to one of the circles at q0 and one
of the circles at qgoal . The solutions to (a) correspond to CSC paths and the
solutions to (b) correspond to CC↵ C paths. The shortest of all the solutions is
the optimal path. The shortest path may not be unique.
    If we break the C segments into two categories, L (when the steering wheel
is pegged to the left) and R (when the steering wheel is pegged to the right),
we see that there are four types of CSC paths (LSL, LSR, RSL, and RSR)
and two types of CC↵ C paths (RL↵ R and LR↵ L).

Shortest Paths for the Car with a Reverse Gear The shortest paths for
a car with a reverse gear, sometimes called the Reeds–Shepp car in honor
of the mathematicians who first studied the problem, again use only straight-
line segments and minimum-turning-radius arcs. Using the notation C for a
minimum-turning-radius arc, Ca for an arc of angle a, S for a straight-line
segment, and | for a cusp (a reversal of the linear velocity), Theorem 13.12
enumerates the possible shortest path sequences.
Theorem 13.12. For a car with a reverse gear with the control set shown in
Figure 13.11, the shortest path between any two configurations is in one of the
following nine classes:
       C|C|C             CC|C                 C|CC                  CCa |Ca C        C|Ca Ca |C
      C|C⇡/2 SC         CSC⇡/2 |C         C|C⇡/2 SC⇡/2 |C            CSC
Any of the C or S segments can be of length zero.

      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     541




                  CSC                                        CC|C                            C|C|C

Figure 13.16: Three of the nine classes of shortest paths for a car with a reverse
gear.


    Three of the nine shortest path classes are illustrated in Figure 13.16. Again,
the actual shortest path may be found by enumerating the finite set of possible
solutions in the path classes in Theorem 13.12. The shortest path may not be
unique.
    If we break the C segments into four categories, L+ , L , R+ , and R , where
L and R mean that the steering wheel is turned all the way to the left or right
and the superscripts ‘+’ and ‘ ’ indicate the gear shift (forward or reverse), then
the nine path classes of Theorem 13.12 can be expressed as (6 ⇥ 4) + (3 ⇥ 8) = 48
di↵erent types:

      6 path classes, each          C|C|C, CC|C, C|CC, CCa |Ca C, C|Ca Ca |C,
       with 4 path types:           C|C⇡/2 SC⇡/2 |C
      3 path classes, each
       with 8 path types:           C|C⇡/2 SC, CSC⇡/2 |C, CSC

The four types for six path classes are determined by the four di↵erent initial
motion directions, L+ , L , R+ , and R . The eight types for three path classes
are determined by the four initial motion directions and whether the turn is to
the left or the right after the straight-line segment. There are only four types
in the C|C⇡/2 SC⇡/2 |C class because the turn after the S segment is always
opposite to the turn before the S segment.
    If it takes zero time to reverse the linear velocity, a shortest path is also a
minimum-time path for the control set for the car with a reverse gear illustrated
in Figure 13.11, where the only controls (v, !) ever used are the two controls
(±vmax , 0), an S segment, or the four controls (±vmax , ±!max ), a C segment.



     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
542                                              13.3. Nonholonomic Wheeled Mobile Robots


           motion         number
          segments        of types                  motion sequences
             1                4                        F , B, R, L
             2                8           F R, F L, BR, BL, RF , RB, LF , LB
             3               16               F RB, F LB, F R⇡ B, F L⇡ B,
                                              BRF , BLF , BR⇡ F , BL⇡ F ,
                                                RF R, RF L, RBR, RBL,
                                                 LF R, LF L, LBR, LBL
                4              8            F RBL, F LBR, BRF L, BLF R,
                                             RF LB, RBLF , LF RB, LBRF
                5              4         F RBLF , F LBRF , BRF LB, BLF RB


Table 13.1: The 40 time-optimal trajectory types for the di↵-drive. The notation
R⇡ and L⇡ indicate spins of angle ⇡.


Minimum-Time Motions for the Di↵-Drive For a di↵-drive robot with
the diamond-shaped control set in Figure 13.11, any minimum-time motion
consists of only translational motions and spins in place.

Theorem 13.13. For a di↵-drive robot with the control set illustrated in Fig-
ure 13.11, minimum-time motions consist of forward and backward translations
(F and B) at maximum speed ±vmax and spins in place (R and L for right
turns and left turns) at maximum angular speed ±!max . There are 40 types
of time-optimal motions, which are categorized in Table 13.1 by the number of
motion segments. The notations R⇡ and L⇡ indicate spins of angle ⇡.
    Note that Table 13.1 includes both F R⇡ B and F L⇡ B, which are equivalent,
as well as BR⇡ F and BL⇡ F . Each trajectory type is time optimal for some pair
{q0 , qgoal }, and the time-optimal trajectory may not be unique. Notably absent
are three-segment sequences where the first and last motions are translations in
the same direction (i.e., F RF , F LF , BRB, and BLB).
    While any reconfiguration of the di↵-drive can be achieved by spinning,
translating, and spinning, in some cases other three-segment sequences have a
shorter travel time. For example consider a di↵-drive with vmax = !max = 1,
q0 = 0, and qgoal = ( 7⇡/8, 1.924, 0.383), as shown in Figure 13.17. The time
needed for a spin of angle ↵ is |↵|/!max = |↵| and the time for a translation of
d is |d|/vmax = |d|. Therefore, the time needed for the LF R sequence is
                                   ⇡            15⇡
                                      + 1.962 +     = 5.103,
                                   16            16

      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     543




                                                                 (1.924, 0.383)
                                                     1
                                   1                          qgoal
                      q0
                                                               7⇡/8




              1.962                                                                          1
                                                                          1
               ⇡/16
                                       15⇡/16
                                                                                                 7⇡/8

                 LF R                                                             F RB

Figure 13.17: (Top) A motion planning problem specified as a motion from q0 =
(0, 0, 0) to qgoal = ( 7⇡/8, 1.924, 0.383). (Bottom left) A non-optimal LF R solution
taking time 5.103. (Bottom right) The time-optimal F RB solution, through a “via
point,” taking time 4.749.


while the time needed for the F RB sequence through a “via point” is
                                             7⇡
                                        1+      + 1 = 4.749.
                                              8


13.3.3.2     With Obstacles
If there are obstacles in the plane, the grid-based motion planning methods
of Section 10.4.2 can be applied to the unicycle, di↵-drive, car with a reverse
gear, or forward-only car using discretized versions of the control sets in Fig-
ure 13.11. See, for example, the discretizations in Figure 10.14, which use the
extremal controls from Figure 13.11. Using extremal controls takes advantage
of our observation that shortest paths for reverse-gear cars and the di↵-drive
consist of minimum-turning-radius turns and straight-line segments. Also, be-
cause the C-space is only three dimensional, the grid size should be manageable
for reasonable resolutions along each dimension.
    We can also apply the sampling methods of Section 10.5. For RRTs, we can
again use a discretization of the control set, as mentioned above or, for both

     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
544                                              13.3. Nonholonomic Wheeled Mobile Robots



                                        q(1)                                              q(1)


                                                                               q(1/4)

                                                                                          q(1/2)
                 q(0)                                              q(0)




Figure 13.18: (Left) The original path from q(0) to q(1) found by a motion planner
that does not respect the reverse-gear car’s motion constraints. (Right) The path
found by the recursive subdivision has via points at q(1/4) and q(1/2).


PRMs and RRTs, a local planner that attempts to connect two configurations
could use the shortest paths from Theorems 13.11, 13.12, or 13.13.
    Another option for a reverse-gear car is to use any efficient obstacle-avoiding
path planner, even if it ignores the motion constraints of the vehicle. Since
such a car is STLC and since the free configuration space is defined to be open
(obstacles are closed, containing their boundaries), the car can follow the path
found by the planner arbitrarily closely. To follow the path closely, however,
the motion may have to be slow – imagine using parallel parking to travel a
kilometer down the road.
    Alternatively, an initial constraint-free path can be quickly transformed into
a fast, feasible, path that respects the car’s motion constraints. To do this,
represent the initial path as q(s), s 2 [0, 1]. Then try to connect q(0) to q(1)
using a shortest path from Theorem 13.12. If this path is in collision, then
divide the original path in half and try to connect q(0) to q(1/2) and q(1/2) to
q(1) using shortest paths. If either of these paths are in collision, divide that
path, and so on. Because the car is STLC and the initial path lies in open free
space, the process will eventually terminate; the new path consists of a sequence
of subpaths from Theorem 13.12. The process is illustrated in Figure 13.18.

13.3.4       Feedback Control
We can consider three types of feedback control problems for the canonical
nonholonomic mobile robot (13.18) with controls (v, !):

 (a) Stabilization of a configuration. Given a desired configuration qd ,

      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     545


      drive the error qd q(t) to zero as time goes to infinity. As we saw in
      Theorem 13.1, no time-invariant feedback law that is continuous in the
      state variables can stabilize a configuration for a nonholonomic mobile
      robot. There do exist time-varying and discontinuous feedback laws that
      accomplish the task, but we do not consider this problem further here.
 (b) Trajectory tracking. Given a desired trajectory qd (t), drive the error
     qd (t) q(t) to zero as time goes to infinity.
  (c) Path tracking. Given a path q(s), follow the geometric path without
      regard to the time of the motion. This provides more control freedom
      than the trajectory tracking problem; essentially, we can choose the speed
      of the reference configuration along the path so as to help reduce the
      tracking error, in addition to choosing (v, !).
    Path tracking and trajectory tracking are “easier” than stabilizing a config-
uration, in the sense that there exist continuous time-invariant feedback laws
to stabilize the desired motions. In this section we consider the problem of
trajectory tracking.
    Assume that the reference trajectory is specified as qd (t) = ( d (t), xd (t), yd (t))
for t 2 [0, T ], with a corresponding nominal control (vd (t), !d (t)) 2 int(U) for
t 2 [0, T ]. The requirement that the nominal control be in the interior of the
feasible control set U ensures that some control e↵ort is “left over” to correct
small errors. This implies that the reference trajectory is neither a shortest path
nor a time-optimal trajectory, since optimal motions saturate the controls. The
reference trajectory could be planned using not-quite-extremal controls.
    A simple first controller idea is to choose a reference point P on the chassis
of the robot (but not on the axis of the two driving wheels), as in Figure 13.12.
The desired trajectory qd (t) is then represented by the desired trajectory of the
reference point (xP d (t), yP d (t)). To track this reference point trajectory, we can
use a proportional feedback controller
                                        
                               ẋP         kp (xP d xP )
                                      =                     ,                   (13.29)
                               ẏP         kp (yP d yP )

where kp > 0. This simple linear control law is guaranteed to pull the ac-
tual position p along with the moving desired position. The velocity (ẋP , ẏP )
calculated by the control law (13.29) is converted to (v, !) by Equation (13.21).
    The idea is that, as long as the reference point is moving, over time the
entire robot chassis will line up with the desired orientation of the chassis. The
problem is that the controller may choose the opposite orientation of what is
intended; there is nothing in the control law to prevent this. Figure 13.19 shows

     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
546                                              13.3. Nonholonomic Wheeled Mobile Robots


                   qd (0)
                                                                 qd (T )                               q(0)
                                              q(T ) qd (T )                   q(T )
                        q(0)                                                               qd (0)


Figure 13.19: (Left) A nonholonomic mobile robot with a reference point. (Middle)
A scenario where the linear control law (13.29) tracking a desired reference point
trajectory yields the desired trajectory tracking behavior for the entire chassis. (Right)
A scenario where the point-tracking control law causes an unintended cusp in the robot
motion. The reference point converges to the desired path but the robot’s orientation
is opposite to the intended orientation.


two simulations, one where the control law (13.29) produces the desired chassis
motion and one where the control law causes an unintended reversal in the sign
of the driving velocity v. In both simulations the controller succeeds in causing
the reference point to track the desired motion.
     To fix this, let us explicitly incorporate chassis angle error in the control law.
The fixed space frame is {s}, the chassis frame {b} is at the point between the
two wheels of the di↵-drive (or the two rear wheels for a reverse-gear car) with
the forward driving direction along the x̂b -axis, and the frame corresponding to
qd (t) is {d}. We define the error coordinates
                 2      3 2                           32           3
                      e         1       0        0               d
           qe = 4 xe 5 = 4 0 cos d            sin d 5 4 x xd 5 ,               (13.30)
                     ye         0      sin d cos d         y yd
as illustrated in Figure 13.20. The vector (xe , ye ) is the {s}-coordinate error
vector (x xd , y yd ) expressed in the reference frame {d}.
    Consider the nonlinear feedforward plus feedback control law
                    
              v        (vd k1 |vd |(xe + ye tan e ))/ cos e
                  =                                            ,          (13.31)
              !        !d (k2 vd ye + k3 |vd | tan e ) cos2 e
where k1 , k2 , k3 > 0. Note two things about this control law: (1) if the error
is zero, the control is simply the nominal control (vd , !d ); and (2) the controls
grow without bound as e approaches ⇡/2 or ⇡/2. In practice, we assume
that | e | is less than ⇡/2 during trajectory tracking.
    In the controller for v, the second term, k1 |vd |xe / cos e , attempts to reduce
xe by driving the robot so as to catch up with or slow down to the reference
frame. The third term, k1 |vd |ye tan e / cos e , attempts to reduce ye using the
component of the forward or backward velocity that impacts ye .

      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     547




                                       {b}
                        (x, y)
                                                    (xe , ye )
               {s}
                                                          {d}            d
                                    planned path


Figure 13.20: The space frame {s}, the robot frame {b}, and the desired config-
uration {d} driving forward along the planned path. The heading-direction error is
 e =      d.




                                                            qd (T )


                                                                      q(0)
                                               desired
                                                path
                                      actual
                                       path
                                                            qd (0)

  Figure 13.21: A mobile robot implementing the nonlinear control law (13.31).


    In the controller for the turning velocity !, the second term, k2 vd ye cos2 e ,
attempts to reduce ye in the future by turning the heading direction of the
robot toward the reference-frame origin. The third term, k3 |vd | tan e cos2 e ,
attempts to reduce the heading error e .
    A simulation of the control law (13.31) is shown in Figure 13.21.
    The control law requires vd 6= 0, so it is not appropriate for stabilizing “spin-
in-place” motions for a di↵-drive. The proof of the stability of the control law
requires methods beyond the scope of this book. In practice, the gains should
be chosen large enough to provide significant corrective action but not so large
that the controls chatter at the boundary of the feasible control set U .




     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
548                                                                                  13.4. Odometry


13.4        Odometry
Odometry is the process of estimating the chassis configuration q from the wheel
motions, essentially integrating the e↵ect of the wheel velocities. Since wheel-
rotation sensing is available on all mobile robots, odometry is cheap and con-
venient. Estimation errors tend to accumulate over time, though, due to unex-
pected slipping and skidding of the wheels and to numerical integration error.
Therefore, it is common to supplement odometry with other position sensors,
such as GPS, the visual recognition of landmarks, ultrasonic beacons, laser or
ultrasonic range sensing, etc. Those sensing modalities have their own measure-
ment uncertainty but errors do not accumulate over time. As a result, odometry
generally gives superior results on short time scales, but odometric estimates
should either (1) be periodically corrected by other sensing modalities or, prefer-
ably, (2) integrated with other sensing modalities in an estimation framework
based on a Kalman filter, particle filter, or similar.
     In this section we focus on odometry. We assume that each wheel of an
omnidirectional robot, and each rear wheel of a di↵-drive or car, has an encoder
that senses how far the wheel has rotated in its driving direction. If the wheels
are driven by stepper motors then we know the driving rotation of each wheel
from the steps we have commanded to it.
     The goal is to estimate the new chassis configuration qk+1 as a function of
the previous chassis configuration qk , given the change in wheel angles from the
instant k to the instant k + 1.
     Let ✓i be the change in wheel i’s driving angle since the wheel angle was
last queried a time t ago. Since we know only the net change in the wheel
driving angle, not the time history of how the wheel angle evolved during the
time interval, the simplest assumption is that the wheel’s angular velocity was
constant during the time interval, ✓˙i = ✓i / t. The choice of units used to
measure the time interval is not relevant (since we will eventually integrate
the chassis body twist Vb over the same time interval), so we set t = 1, i.e.,
✓˙i = ✓.
     For omnidirectional mobile robots, the vector of wheel speeds ✓,   ˙ and there-
fore ✓, is related to the body twist Vb = (!bz , vbx , vby ) of the chassis by Equa-
tion (13.8):
                                    ✓ = H(0)Vb ,
where H(0) for the three-omniwheel robot is given by Equation (13.9) and for
the four-mecanum-wheel robot is given by Equation (13.10). Therefore, the
body twist Vb corresponding to ✓ is

                                     Vb = H † (0) ✓ = F ✓,

      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     549



                                    left                      r✓˙L
                                   wheel
                                              d     ŷb
                                                           x̂b

                                    right d                   r✓˙R
                                    wheel

Figure 13.22: The left and right wheels of a di↵-drive or the left and right rear
wheels of a car.


where F = H † (0) is the pseudoinverse of H(0). For the three-omniwheel robot,
                  2                                             3
                       1/(3d)        1/(3d)           1/(3d)
  Vb = F ✓ = r 4        2/3            1/3             1/3      5 ✓ (13.32)
                         0       1/(2 sin(⇡/3)) 1/(2 sin(⇡/3))

and for the four-mecanum-wheel robot,
                   2                                                  3
                      1/(` + w) 1/(` + w)                     1/(` + w)
                                                            1/(` + w)
                 r4                                                   5 ✓.
  Vb = F ✓ =             1          1                          1  1
                 4
                          1         1                          1   1
                                                                        (13.33)
                            ˙
    The relationship Vb = F ✓ = F ✓ also holds for the di↵-drive robot and the
car (Figure 13.22), where ✓ = ( ✓L , ✓R ) (the increments for the left and
right wheels) and
                               2                  3
                                  1/(2d) 1/(2d) 
                                                         ✓L
                Vb = F ✓ = r 4     1/2      1/2 5             .         (13.34)
                                                         ✓R
                                    0        0

    Since the wheel speeds are assumed constant during the time interval, so
is the body twist Vb . Calling Vb6 the six-dimensional version of the planar
twist Vb (i.e., Vb6 = (0, 0, !bz , vbx , vby , 0)), Vb6 can be integrated to generate the
displacement created by the wheel-angle increment vector ✓:

                                           Tbb0 = e[Vb6 ] .

From Tbb0 2 SE(3), which expresses the new chassis frame {b0 } relative to the
initial frame {b}, we can extract the change in coordinates relative to the body



     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
550                                                                      13.5. Mobile Manipulation


frame {b},        qb = (      b,    xb ,  yb ), in terms of (!bz , vbx , vby ):
                                2         3 2            3
                                        b            0
 if !bz = 0,             qb = 4        xb 5 = 4 vbx 5 ;                               (13.35)
                                       yb           vby
                                2         3 2                                            3
                                        b                            !bz
 if !bz 6= 0,            qb = 4        xb 5 = 4 (vbx sin !bz + vby (cos !bz 1))/!bz 5 .
                                       yb           (vby sin !bz + vbx (1 cos !bz ))/!bz

      Transforming         qb in {b} to      q in the fixed frame {s} using the chassis angle
 k,                                  2                           3
                                    1            0          0
                                  4
                                q= 0          cos k        sin k 5 qb ,                           (13.36)
                                    0         sin k       cos k
the updated odometry estimate of the chassis configuration is finally

                                           qk+1 = qk +        q.

    In summary, q is calculated using Equations (13.35) and (13.36) as a func-
tion of Vb and the previous chassis angle k , and Equation (13.32), (13.33), or
(13.34) is used to calculate Vb as a function of the wheel-angle changes ✓ for
the three-omniwheel robot, the four-mecanum-wheel robot, or a nonholonomic
robot (the di↵-drive or the car), respectively.


13.5         Mobile Manipulation
For a robot arm mounted on a mobile base, mobile manipulation describes
the coordination of the motion of the base and the robot joints to achieve a
desired motion at the end-e↵ector. Typically the motion of the arm can be
controlled more precisely than the motion of the base, so the most popular type
of mobile manipulation involves driving the base, parking it, letting the arm
perform the precise motion task, then driving away.
    In some cases, however, it is advantageous, or even necessary, for the end-
e↵ector motion to be achieved by a combination of motion of the base and
motion of the arm. Defining the fixed space frame {s}, the chassis frame {b}, a
frame at the base of the arm {0}, and an end-e↵ector frame {e}, the configura-
tion of {e} in {s} is

                     X(q, ✓) = Tse (q, ✓) = Tsb (q) Tb0 T0e (✓) 2 SE(3),


       Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     551




                                                                                      {e}

                                                              {0}

                                                     {b}

              {s}


Figure 13.23: The space frame {s} and the frames {b}, {0}, and {e} attached to the
mobile manipulator.


where ✓ 2 Rn is the set of arm joint positions for the n-joint robot, T0e (✓)
is the forward kinematics of the arm, Tb0 is the fixed o↵set of {0} from {b},
q = ( , x, y) is the planar configuration of the mobile base, and
                                  2                      3
                                    cos      sin   0 x
                                  6 sin    cos     0 y 7
                        Tsb (q) = 6
                                  4 0
                                                         7,
                                              0    1 z 5
                                      0       0    0 1

where z is a constant indicating the height of the {b} frame above the floor.
See Figure 13.23.
    Let X(t) be the path of the end-e↵ector as a function of time. Then
[Ve (t)] = X 1 (t)Ẋ(t) is the se(3) representation of the end-e↵ector twist ex-
pressed in {e}. Further, let the vector of wheel velocities, whether the robot is
omnidirectional or nonholonomic, be written u 2 Rm . For kinematic control of
the end-e↵ector frame using the wheel and joint velocities, we need the Jacobian
Je (✓) 2 R6⇥(m+n) satisfying
                                                       
                                u                          u
                  Ve = Je (✓) ˙ = [Jbase (✓) Jarm (✓)] ˙ .
                                ✓                          ✓

Note that the Jacobian Je (✓) does not depend on q: the end-e↵ector velocity
expressed in {e} is independent of the configuration of the mobile base. Also,
we can partition Je (✓) into Jbase (✓) 2 R6⇥m and Jarm (✓) 2 R6⇥n . The term
Jbase (✓)u expresses the contribution of the wheel velocities u to the end-e↵ector’s
velocity, and the term Jarm (✓)✓˙ expresses the contribution of the joint velocities
to the end-e↵ector’s velocity.

     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
552                                                                      13.5. Mobile Manipulation


   In Chapter 5 we developed a method to derive Jarm (✓), which is called the
body Jacobian Jb (✓) in that chapter. All that remains is to find Jbase (✓). As
we saw in Section 13.4, for any type of mobile base there exists an F satisfying

                                                Vb = F u.

To create a six-dimensional twist Vb6 corresponding to the planar twist Vb , we
can define the 6 ⇥ m matrix
                                      2     3
                                        0m
                                      6 0m 7
                                F6 = 64 F 5,
                                            7

                                        0m

where two rows of m zeros are stacked above F and one row is situated below
it. Now we have
                                 Vb6 = F6 u.
This chassis twist can be expressed in the end-e↵ector frame as

        [AdTeb (✓) ]Vb6 = [AdT 1 (✓)T 1 ]Vb6 = [AdT 1 (✓)T 1 ]F6 u = Jbase (✓)u.
                                   0e      b0                  0e       b0


Therefore
                                  Jbase (✓) = [AdT 1 (✓)T 1 ]F6 .
                                                       0e      b0

    Now that we have the complete Jacobian Je (✓) = [ Jbase (✓) Jarm (✓) ], we
can perform numerical inverse kinematics (Section 6.2) or implement kinematic
feedback control laws to track a desired end-e↵ector trajectory. For example,
given a desired end-e↵ector trajectory Xd (t), we can choose the kinematic task-
space feedforward plus feedback control law (11.16),
                                                     Z t
         V(t) = [AdX 1 Xd ]Vd (t) + Kp Xerr (t) + Ki     Xerr (t) dt,   (13.37)
                                                                    0

where [Vd (t)] = Xd 1 (t)Ẋd (t), the transform [AdX 1 Xd ] changes the frame of
representation of the feedforward twist Vd from the frame at Xd to the ac-
tual end-e↵ector frame at X, and [Xerr ] = log(X 1 Xd ). The commanded end-
e↵ector-frame twist V(t) is implemented as
                                  
                                    u
                                         = Je† (✓)V.
                                    ✓˙

As discussed in Section 6.3, it is possible to use a weighted pseudoinverse to
penalize certain wheel or joint velocities.

      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     553




                      {e}

                               ✓1
                                     L1                                                Xd (1)
                                            Xd (0)              {s}
       2d     {b}
                       xr




Figure 13.24: A di↵-drive with a 1R planar arm with end-e↵ector frame {e}. (Top)
The initial configuration of the robot and the desired end-e↵ector trajectory Xd (t).
(Bottom) Trajectory tracking using the control law (13.37). The end-e↵ector shoots
past the desired path before settling into accurate trajectory tracking.


    An example is shown in Figure 13.24. The mobile base is a di↵-drive and the
arm moves in the plane with only one revolute joint. The desired motion of the
end-e↵ector Xd (t), t 2 [0, 1], is parametrized by ↵ = ⇡t, xd (t) = 3 cos(⇡t),
and yd (t) = 3 sin(⇡t), where ↵ indicates the planar angle from the x̂s -axis to
the x̂e -axis (see Figure 13.24). The performance in Figure 13.24 demonstrates a
bit of overshoot, indicating that the diagonal gain matrix Ki = ki I should use
somewhat lower gains. Alternatively, the gain matrix Kp = kp I could use larger
gains, provided that there are no practical problems with these larger gains (see


     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
554                                                                                    13.6. Summary


the discussion in Section 11.3.1.2).
   Note that, for an arbitrary Xd (t) to be feasible for the mobile manipulator,
the Jacobian Je (✓) should be full rank everywhere; see Exercise 13.30.


13.6         Summary
      • The chassis configuration of a wheeled mobile robot moving in the plane is
        q = ( , x, y). The velocity can be represented either as q̇ or as the planar
        twist Vb = (!bz , vbx , vby ) expressed in the chassis-fixed frame {b}, where
                            2         3 2                        32      3
                                !bz          1      0       0          ˙
                      Vb = 4 vbx 5 = 4 0 cos              sin 5 4 ẋ 5 .
                                 vby         0     sin    cos         ẏ

      • The chassis of a nonholonomic mobile robot is subject to a single noninte-
        grable Pfaffian velocity constraint A(q)q̇ = [0 sin    cos ]q̇ = ẋ sin
        ẏ cos = 0. An omnidirectional robot, employing omniwheels or mecanum
        wheels, has no such constraint.

      • For a properly constructed omnidirectional robot with m 3 wheels, there
        exists a rank 3 matrix H( ) 2 Rm⇥3 that maps the chassis velocity q̇ to
        the wheel driving velocities u:

                                                  u = H( )q̇.

        In terms of the body twist Vb ,

                                                 u = H(0)Vb .

        The driving speed limits of each wheel place two parallel planar constraints
        on the feasible body twists, creating a polyhedron V of feasible body
        twists.

      • Motion planning and feedback control for omnidirectional robots is sim-
        plified by the fact that there are no chassis velocity equality constraints.

      • Nonholonomic mobile robots are described as driftless linear-in-the-control
        systems
                            q̇ = G(q)u,      u 2 U ⇢ Rm ,
        where G(q) 2 Rn⇥m , n > m. The m columns gi (q) of G(q) are called the
        control vector fields.

       Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                    555


   • The canonical simplified nonholonomic mobile robot model is
                        2    3           2          3
                           ˙                 0    1 
                                                        v
                   q̇ = 4 ẋ 5 = G(q)u = 4 cos    0 5      .
                                                        !
                          ẏ               sin    0

     The control sets U di↵er for the unicycle, di↵-drive, reverse-gear car, and
     forward-only car.

   • A control system is small-time locally accessible (STLA) from q if, for any
     time T > 0 and any neighborhood W , the reachable set in time less than T
     without leaving W is a full-dimensional subset of the configuration space.
     A control system is small-time locally controllable (STLC) from q if, for
     any time T > 0 and any neighborhood W , the reachable set in time less
     than T without leaving W is a neighborhood of q. If the system is STLC
     from a given q, it can maneuver locally in any direction.

   • The Lie bracket of two vector fields g1 and g2 is the vector field
                                       ✓              ◆
                                         @g2    @g1
                          [g1 , g2 ] =       g1     g2 .
                                         @q     @q

   • A Lie product of degree k is a Lie bracket term where the original vector
     fields appear a total of k times. A Lie product of degree 1 is just one of
     the original vector fields.

   • The Lie algebra of a set of vector fields G = {g1 , . . . , gm }, written Lie(G),
     is the linear span of all Lie products of degree 1, . . . , 1 of the vector fields
     G.

   • A driftless control-affine system is small-time locally accessible from q
     if dim(Lie(G)(q)) = dim(q) = n and span(U ) = Rm . If additionally
     pos(U ) = Rm then the system is small-time locally controllable from q.

   • For a forward-only car in an obstacle-free plane, shortest paths always
     follow a turn at the tightest turning radius (C) or straight-line motions
     (S). There are two classes of shortest paths: CSC and CC↵ C, where C↵
     is a turn of angle |↵| > ⇡. Any C or S segment can be of length zero.

   • For a car with a reverse gear, shortest paths always consist of a sequence
     of straight-line segments or turns at the tightest turning radius. Shortest
     paths always belong to one of nine classes.


    Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
556                                                                      13.7. Notes and References


      • For the di↵-drive, minimum-time motions always consist of turn-in-place
        motions and straight-line motions.

      • For the canonical nonholonomic robot, there is no time-invariant control
        law which is continuous in the configuration and which will stabilize the
        origin configuration. Continuous time-invariant control laws exist that
        will stabilize a trajectory, however.

      • Odometry is the process of estimating the chassis configuration on the
        basis of how far the robot’s wheels have rotated in their driving direction,
        assuming no skidding in the driving direction and, for typical wheels (not
        omniwheels or mecanum wheels), no slip in the orthogonal direction.

      • For a mobile manipulator with m wheels and n joints in the robot arm,
        the end-e↵ector twist Ve in the end-e↵ector frame {e} is written
                                                          
                                    u                        u
                      Ve = Je (✓) ˙ = [Jbase (✓) Jarm (✓)] ˙ .
                                    ✓                         ✓

        The 6 ⇥ m Jacobian Jbase (✓) maps the wheel velocities u to a velocity
        at the end-e↵ector, and the 6 ⇥ n Jacobian Jarm (✓) is the body Jacobian
        derived in Chapter 5. The Jacobian Jbase (✓) is given by

                                       Jbase (✓) = [AdT 1 (✓)T 1 ]F6
                                                            0e      b0


        where F6 is the transformation from the wheel velocities to the chassis
        twist, Vb6 = F u.


13.7         Notes and References
Excellent references on modeling, motion planning, and control of mobile robots
include the books [33, 81], the chapters in the textbook [171] and the Handbook
of Robotics [121, 157], and the encyclopedia chapter [128].
    General references on nonholonomic systems, underactuated systems, and
notions of nonlinear controllability include [14, 21, 27, 63, 64, 122, 126, 158],
the Control Handbook chapter [101], and the encyclopedia chapter [100]. The-
orem 13.1 is a strengthening of a result originally reported by Brockett in [19].
Theorem 13.7 is an application of Chow’s theorem [28] considering di↵erent
possible control sets. A more general condition describing the conditions under
which Chow’s theorem can be used to determine local controllability was given
by Sussmann [182].


       Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     557


    The original results for the shortest paths for a forward-only car and for a car
with a reverse gear were given by Dubins [41] and Reeds and Shepp [146], respec-
tively. These results were extended and applied to motion planning problems
in [16, 175] and independently derived using principles of di↵erential geometry
in [183]. The minimum-time motions for a di↵-drive were derived by Balkcom
and Mason in [5]. The motion planner for a car-like mobile robot based on
replacing segments of an arbitrary path with shortest feasible paths for a car,
described in Section 13.3.3.2, was described in [82].
    The nonlinear control law (13.31) for tracking a reference trajectory for a
nonholonomic mobile robot is taken from [121, 157].


13.8       Exercises

Exercise 13.1 In the omnidirectional mobile robot kinematic modeling of
Section 13.2.1, we derived the relationship between wheel velocities and chassis
velocity in what seemed to be an unusual way. First, we specified the chassis ve-
locity, then we calculated how the wheels must be driving (and sliding). At first
glance, this approach does not seem to make sense causally; we should specify
the velocities of the wheels, then calculate the chassis velocity. Explain mathe-
matically why this modeling approach makes sense, and under what condition
the method cannot be used.

Exercise 13.2 According to the kinematic modeling of Section 13.2.1, each
wheel of an omnidirectional robot adds two more velocity constraints on the
chassis twist Vb . This might seem counterintuitive, since more wheels means
more motors and we might think that having more motors should result in
more motion capability, not more constraints. Explain clearly why having extra
wheels implies extra velocity constraints, in our kinematic modeling, and which
assumptions in the kinematic modeling may be unrealistic.

Exercise 13.3 For the three-omniwheel robot of Figure 13.5, is it possible to
drive the wheels so that they skid? (In other words, so that the wheels slip in
the driving direction.) If so, give an example set of wheel velocities.

Exercise 13.4 For the four-mecanum-wheel robot of Figure 13.5, is it possible
to drive the wheels so that they skid? (In other words, the wheels slip in the




     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
558                                                                                    13.8. Exercises


driving direction.) If so, give an example set of wheel velocities.

Exercise 13.5 Replace the wheels of the four-mecanum-wheel robot of Fig-
ure 13.5 by wheels with = ±60 . Derive the matrix H(0) in the relationship
u = H(0)Vb . Is it rank 3? If necessary, you can assume values for ` and w.

Exercise 13.6 Consider the three-omniwheel robot of Figure 13.5. If we
replace the omniwheels by mecanum wheels with = 45 , is it still a properly
constructed omnidirectional mobile robot? In other words, in the relationship
u = H(0)Vb , is H(0) rank 3?

Exercise 13.7 Consider a mobile robot with three mecanum wheels for which
   = ±45 at the points of an equilateral triangle. The chassis frame {b} is at
the center of the triangle. The driving directions of all three wheels are the
same (e.g., along the body x̂b -axis) and the free sliding directions are = 45
for two wheels and = 45 for the other wheel. Is this a properly constructed
omnidirectional mobile robot? In other words, in the relationship u = H(0)Vb ,
is H(0) rank 3?

Exercise 13.8 Using your favorite graphics software (e.g., MATLAB), plot
the two planes bounding the set of feasible body twists Vb for wheel 2 of the
three-omniwheel robot of Figure 13.5.

Exercise 13.9 Using your favorite graphics software (e.g., MATLAB), plot
the two planes bounding the set of feasible body twists Vb for wheel 1 of the
four-mecanum-wheel robot of Figure 13.5.

Exercise 13.10 Consider a four-omniwheel mobile robot with wheels at the
points of a square. The chassis frame {b} is at the center of the square, and the
driving direction of each wheel is in the direction 90 counterclockwise from the
vector from the the origin of {b} to the wheel. You may assume that the sides
of the squares have length 2. Find the matrix H(0). Is it rank 3?

Exercise 13.11 Implement a collision-free grid-based planner for an omni-
directional robot. You may assume that the robot has a circular chassis, so
for collision-detection purposes, you need to consider only the (x, y) location of
the robot. The obstacles are circles with random center locations and random
radii. You can use Dijkstra’s algorithm or A⇤ to find a shortest path that avoids


      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     559


obstacles.

Exercise 13.12 Implement an RRT planner for an omnidirectional robot. As
above, you may assume a circular chassis and circular obstacles.

Exercise 13.13 Implement a feedforward plus proportional feedback con-
troller to track a desired trajectory for an omnidirectional mobile robot. Test
it on the desired trajectory ( d (t), xd (t), yd (t)) = (t, 0, t) for t 2 [0, ⇡]. The
initial configuration of the robot is q(0) = ( ⇡/4, 0.5, 0.5). Plot the configu-
ration error as a function of time. You can also show an animation of the robot
converging to the trajectory.

Exercise 13.14 Write down the Pfaffian constraints A(q)q̇ = 0 corresponding
to the unicycle model in Equation (13.12).

Exercise 13.15 Write down the Pfaffian constraints corresponding to the di↵-
drive model in Equation (13.14).

Exercise 13.16 Write down the Pfaffian constraints corresponding to the car-
like model in Equation (13.16).

Exercise 13.17 Give examples of two systems that are STLA but not STLC.
The systems should not be wheeled mobile robots.

Exercise 13.18 Continue the Taylor expansion in Equation (13.26) to find
the net motion (to order ✏2 ) obtained by following gi for time ✏, then gj for time
✏, then gi for time ✏, then gj for time ✏. Show that it is equivalent to the
expression (13.27).

Exercise 13.19 Write down the canonical nonholonomic mobile robot model
(13.18) in the chassis-fixed form
                                         
                                           v
                                  Vb = B     ,
                                           !
where B is a 3 ⇥ 2 matrix whose columns correspond to the chassis twist assoc-
iated with the controls v and !.

Exercise 13.20 Throughout this book, we have been using the configuration
spaces SE(3) and SO(3), and their planar subsets SE(2) and SO(2). These are

     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
560                                                                                    13.8. Exercises


known as matrix Lie groups. Body and spatial twists are represented in matrix
form as elements of se(3) (or se(2) in the plane) and body and spatial angular
velocities are represented in matrix form as elements of so(3) (or so(2) in the
plane). The spaces se(3) and so(3) correspond to all possible Ṫ and Ṙ when
T or R is the identity matrix. Since these spaces correspond to all possible
velocities, each is called the Lie algebra of its respective matrix Lie group. Let
us call G a matrix Lie group and g its Lie algebra, and let X be an element of
G, and A and B be elements of g. In other words, A and B can be thought of
as possible values of Ẋ when X = I.
     Any “velocity” A in g can be “translated” to a velocity Ẋ at any X 2 G
by pre-multiplying or post-multiplying by X, i.e., Ẋ = XA or Ẋ = AX. If we
choose Ẋ = XA, i.e., A = X 1 Ẋ then we can think of A as a “body velocity”
(e.g., the matrix form of a body twist if G = SE(3)) and if we choose Ẋ = AX,
i.e., A = ẊX 1 , we can think of A as a “spatial velocity” (e.g., the matrix form
of a spatial twist if G = SE(3)). In this way, A can be extended to an entire
vector field over G. If the extension is obtained by multiplying by X on the left
then the vector field is called left-invariant (constant in the body frame), and if
the extension is by multiplying by X on the right then the vector field is called
right-invariant (constant in the space frame). Velocities that are constant in the
body frame, like the vector fields for the canonical nonholonomic mobile robot,
correspond to left-invariant vector fields.
     Just as we can define a Lie bracket of two vector fields, as in Equation (13.28),
we can define the Lie bracket of A, B 2 g as
                                       [A, B] = AB          BA,                                  (13.38)
as described in Section 8.2.2 for g = se(3). Confirm that this formula describes
the same Lie bracket vector field as Equation (13.28) for the canonical non-
holonomic vector fields g1 (q) = (0, cos , sin ) and g2 (q) = (1, 0, 0). To do
this, first express the two vector fields as A1 , A2 2 se(2), considered to be the
generators of the left-invariant vector fields g1 (q) and g2 (q) (since the vector
fields correspond to constant velocities in the chassis frame). Then take the
Lie bracket A3 = [A1 , A2 ] and extend A3 to a left-invariant vector field de-
fined at all X 2 SE(2). Show that this is the same result obtained using the
formula (13.28).
    The Lie bracket formula in Equation (13.28) is general for any vector fields
expressed as a function of coordinates q, while the formula (13.38) is particularly
for left- and right-invariant vector fields defined by elements of the Lie algebra
of a matrix Lie group.

Exercise 13.21           Using your favorite symbolic math software (e.g., Mathe-

      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                     561


matica), write or experiment with software that symbolically calculates the Lie
bracket of two vector fields. Show that it correctly calculates Lie brackets for
vector fields of any dimension.

Exercise 13.22 For the full five-dimensional di↵-drive model described by
Equation (13.14), calculate Lie products that generate two motion directions not
present in the original two vector fields. Write down the holonomic constraint
corresponding to the direction in which it is not possible to generate motions.

Exercise 13.23 Implement a collision-free grid-based motion planner for a
car-like robot among obstacles using techniques from Section 10.4.2. Decide
how to specify the obstacles.

Exercise 13.24 Implement a collision-free RRT-based motion planner for a
car-like robot among obstacles using techniques from Section 10.5. Decide how
to specify obstacles.

Exercise 13.25 Implement the reference point trajectory-tracking control law
(13.29) for a di↵-drive robot. Show in a simulation that it succeeds in tracking
a desired trajectory for the point.

Exercise 13.26 Implement the nonlinear feedforward plus feedback control
law (13.31). Demonstrate its performance in tracking a reference trajectory with
di↵erent sets of control gains, including one set that yields “good” performance.

Exercise 13.27 Write a program that accepts a time history of wheel encoder
values for the two rear wheels of a car and estimates the chassis configuration
as a function of time using odometry. Prove that it yields correct results for a
chassis motion that involves rotations and translations.

Exercise 13.28 Write a program that accepts a time history of wheel encoder
values for the three wheels of a three-omniwheel robot and estimates the chassis
configuration as a function of time using odometry. Prove that it yields correct
results for a chassis motion that involves rotations and translations.

Exercise 13.29 Write a program that accepts a time history of wheel encoder
values for the four wheels of a four-mecanum-wheel robot and estimates the
chassis configuration as a function of time using odometry. Prove that it yields


     Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
562                                                                                    13.8. Exercises


correct results for a chassis motion that involves rotations and translations.

Exercise 13.30 Consider the mobile manipulator in Figure 13.24. Write
down the Jacobian Je (✓) as a 3 ⇥ 3 matrix function of d, xr , L1 , and ✓1 . Is
the Jacobian rank 3 for all choices of d, xr , L1 , and ✓1 ? If not, under what
conditions is it not full rank?

Exercise 13.31 Write a simulation for a mobile manipulation controller sim-
ilar to that demonstrated in Figure 13.24. For this simulation you need to
include a simulation of odometry to keep track of the mobile base’s configura-
tion. Demonstrate your controller on the same example trajectory and initial
conditions shown in Figure 13.24 for good and bad choices of control gains.

Exercise 13.32 Wheel-based odometry can be supplemented by odometry
based on an inertial measurement unit (IMU). A typical IMU includes a three-
axis gyro, for sensing angular velocities of the chassis, and a three-axis ac-
celerometer, for sensing linear accelerations of the chassis. From a known initial
state of the mobile robot (e.g., at rest at a known position), the sensor data
from the IMU can be integrated over time to yield a position estimate of the
robot. Since the data are numerically integrated once in the case of angular
velocities, and twice in the case of linear accelerations, the estimate will drift
from the actual value over time, just as the wheel-based odometry estimate will.
     In a paragraph describe operating conditions for the mobile robot, including
properties of the wheels’ interactions with the ground, where IMU-based odom-
etry might be expected to yield better configuration estimates, and conditions
where wheel-based odometry might be expected to yield better estimates. In
another paragraph describe how the two methods can be used simultaneously,
to improve the performance beyond that of either method alone. You should
feel free to do an internet search and comment on specific data-fusion tools or
filtering techniques that might be useful.

Exercise 13.33 The KUKA youBot (Figure 13.25) is a mobile manipulator
consisting of a 5R arm mounted on an omnidirectional mobile base with four
mecanum wheels. The chassis frame {b} is centered between the four wheels
at a height z = 0.0963 m above the floor, and the configuration of the chassis




      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                        563


                                             ẑ e                  33 mm


                                     ŷe                                                     217.6 mm
                                                          x̂ e
                                                    {e}
                                                                                             joint 4

                                                                                             135.0 mm

         ẑ s                                                                                joint 3
  ŷs            x̂ s
                                                                                             155.0 mm
   {s}                                        {0}
                          {b}
                                                                                             joint 2

                                                                                             147.0 mm



Figure 13.25: (Left) The KUKA youBot mobile manipulator and the fixed space
frame {s}, the chassis frame {b}, the arm base frame {0}, and the end-e↵ector frame
{e}. The arm is at its zero configuration. (Right) A close-up of the arm at its zero
configuration. Joint axes 1 and 5 (not shown) point upward and joint axes 2, 3, and
4 are out of the page.


relative to a fixed space frame {s} is
                              2                                           3
                                cos     sin                      0    x
                              6 sin    cos                       0    y   7
                    Tsb (q) = 6
                              4 0
                                                                          7,
                                         0                       1 0.0963 5
                                  0      0                       0    1
where q = ( , x, y). The kinematics of the four-wheeled mobile base is described
in Figure 13.5 and the surrounding text, where the front–back distance between
the wheels is 2` = 0.47 m, the side-to-side distance between the wheels is 2w =
0.3 m, and the radius of each wheel is r = 0.0475 m.
    The fixed o↵set from the chassis frame {b} to the base frame of the arm {0}
is                              2                    3
                                  1 0 0 0.1662
                                6 0 1 0         0    7
                         Tb0 = 64 0 0 1 0.0026 5 ,
                                                     7

                                  0 0 0         1

        Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
564                                                                                    13.8. Exercises


i.e., the arm base frame {0} is aligned with the chassis frame {b} and is displaced
by 166.2 mm in x̂b and 2.6 mm in ẑb . The end-e↵ector frame {e} at the zero
configuration of the arm (as shown in Figure 13.25) relative to the base frame
{0} is                            2                    3
                                     1 0 0 0.0330
                                  6 0 1 0         0    7
                          M0e = 6 4 0 0 1 0.6546 5 .
                                                       7

                                     0 0 0        1
   You can ignore the arm joint limits in this exercise.
 (a) Examining the right-hand side of Figure 13.25 – and keeping in mind that
     (i) joint axes 1 and 5 point up on the page and joint axes 2, 3, and 4
     point out of the page, and (ii) positive rotation about an axis is by the
     right-hand rule – either confirm that the screw axes in the end-e↵ector
     frame Bi are as shown in the following table:
                                    i         !i                 vi
                                    1      (0, 0, 1)       (0, 0.0330, 0)
                                    2     (0, 1, 0)       ( 0.5076, 0, 0)
                                    3     (0, 1, 0)       ( 0.3526, 0, 0)
                                    4     (0, 1, 0)       ( 0.2176, 0, 0)
                                    5      (0, 0, 1)          (0, 0, 0)
     or provide the correct Bi .
 (b) The robot arm has only five joints, so it is incapable of generating an
     arbitrary end-e↵ector twist Ve 2 R6 when the mobile base is parked. If we
     are able to move the mobile base and the arm joints simultaneously, are
     there configurations ✓ of the arm at which arbitrary twists are not possible?
     If so, indicate these configurations. Also explain why the configuration
     q = ( , x, y) of the mobile base is irrelevant to this question.
 (c) Use numerical inverse kinematics to find a chassis and arm configuration
     (q, ✓) that places the end-e↵ector at
                                      2                   3
                                         1 0 0 0
                                      6 0 0 1 1.0 7
                           X(q, ✓) = 64 0
                                                          7.
                                               1 0 0.4 5
                                         0 0 0 1

     You can try q0 = ( 0 , x0 , y0 ) = (0, 0, 0) and ✓0 = (0, 0, ⇡/2, 0, 0) as your
     initial guess.
 (d) You will write a robot simulator to test the kinematic task-space feedfor-
     ward plus feedback control law (13.37) tracking the end-e↵ector trajectory

      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
Chapter 13. Wheeled Mobile Robots                                                                    565


     defined by the path
                    2                             3
                        sin(s⇡/2) 0 cos(s⇡/2) s
                    6       0     1     0     0 7
           Xd (s) = 6                             7
                    4 cos(s⇡/2) 0 sin(s⇡/2) 0.491 5 , s 2 [0, 1],
                            0     0     0     1
     and the time scaling
                                         3 2        2 3
                               s(t) =      t           t ,        t 2 [0, 5].
                                        25         125
     In other words, the total time of the motion is 5 s.
     Your program should take the trajectory and initial configuration of the
     robot as input, in addition to the control gains and any other parameters
     you see fit. In this exercise, due to initial error, the initial configuration
     of the robot is not on the path: q0 = ( 0 , x0 , y0 ) = ( ⇡/8, 0.5, 0.5) and
     ✓0 = (0, ⇡/4, ⇡/4, ⇡/2, 0).
     Your main program loop should run 100 times per simulated second, i.e.,
     each time step is t = 0.01 s, for a total of 500 time steps for the simula-
     tion. Each time through the loop, your program should:
        • Calculate the desired configuration Xd and twist Vd at the current
          time.
        • Calculate the current configuration error Xerr = (!err , verr ) and save
          Xerr in an array for later plotting.
        • Evaluate the control law (13.37) to find the commanded wheel speeds
                                   ˙
          and joint velocities (u, ✓).
        • Step the simulation of the robot’s motion forward in time by t to
          find the new configuration of the robot. You may use a simple first-
          order Euler integration for the arm: the new joint angle is just the
          old angle plus the commanded joint velocity multiplied by t. To
          calculate the new configuration of the chassis, use odometry from
          Section 13.4, remembering that the change in wheel angles during
          one simulation step is u t.
     You are encouraged to test the feedforward portion of your controller first.
     A starting configuration on the path is approximately q0 = ( 0 , x0 , y0 ) =
     (0, 0.526, 0) and ✓0 = (0, ⇡/4, ⇡/4, ⇡/2, 0). Once you have confirmed
     that your feedforward controller works as expected, add a nonzero pro-
     portional gain to get good performance from the configuration with initial
     error. Finally, you can add a nonzero integral gain to see transient e↵ects
     such as overshoot.

    Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
566                                                                                    13.8. Exercises


     After the simulation completes, plot the six components of Xerr as a func-
     tion of time. If possible, choose gains Kp and Ki such that it is possible
     to see typical features of a PI velocity controller: a little bit of overshoot
     and oscillation and eventually nearly zero error. You should choose control
     gains such that the 2% settling time is one or two seconds, so the transient
     response is clearly visible. If you have the visualization tools available,
     create a movie of the robot’s motion corresponding to your plots.
 (e) While retaining stability, choose a set of di↵erent control gains that gives
     a visibly di↵erent behavior of the robot. Provide the plots and movie and
     comment on why the di↵erent behavior agrees, or does not agree, with
     what you know about PI velocity control.

Exercise 13.34 One type of wheeled mobile robot, not considered in this
chapter, has three or more conventional wheels which are all individually steer-
able. Steerable conventional wheels allow the robot chassis to follow arbitrary
paths without relying on the passive sideways rolling of mecanum wheels or
omniwheels.
    In this exercise you will model a mobile robot with four steerable wheels.
Assume that each wheel has two actuators, one to steer it and one to drive
it. The wheel locations relative to the chassis frame {b} mimic the case of the
four-wheeled robot in Figure 13.5: they are located at the four points (±`, ±w)
in {b}. The steering angle ✓i of wheel i is zero when it rolls in the +x̂b -direction
for a positive driving speed ui > 0, and a positive rotation of the steering angle
is defined as counterclockwise on the page. The linear speed at wheel i is rui ,
where r is the radius of the wheel.
  (a) Given a desired chassis twist Vb , derive equations for the four wheel steer-
       ing angles ✓i and the four wheel driving speeds ui . (Note that the pair
       (✓i , ui ) yields the same linear motion at wheel i as ( ✓i , ui ).)
  (b) The “controls” for wheel i are the steering angle ✓i and the driving speed
       ui . In practice, however, there are bounds on how quickly the wheel
       steering angle can be changed. Comment on the implications for the
       modeling, path planning, and control of a steerable-wheel mobile robot.




      Dec 2019 preprint of updated first edition of Modern Robotics, 2017. http://modernrobotics.org
