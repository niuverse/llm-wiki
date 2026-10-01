[![Northwestern University](https://modernrobotics.northwestern.edu/wp-content/themes/nu_gm_modern_robotics/library/assets/images/northwestern-black.svg)
Northwestern University](http://www.northwestern.edu/)

Search for:

Search

[Search](#mobile-search)

Search for:

Search

[Menu](#mobile-nav)

* [Book, Software, etc.](http://modernrobotics.org/)
* [Online Courses (Coursera)](https://www.coursera.org/specializations/modernrobotics)

# Video Supplements for

## Modern Robotics

# Kevin M. Lynch and Frank C. Park

# Cambridge University Press

* [Book, Software, etc.](http://modernrobotics.org/)
* [Online Courses (Coursera)](https://www.coursera.org/specializations/modernrobotics)

## 3.3.1. Homogeneous Transformation Matrices

#### 3.3.1. Homogeneous Transformation Matrices

* [Description](#tab-panel-description)
* [Transcript](#tab-panel-transcript)

This video introduces the 4×4 homogeneous transformation matrix representation of a rigid-body configuration and the special Euclidean group SE(3), the space of all transformation matrices. It also introduces three common uses of transformation matrices: representing a rigid-body configuration, changing the frame of reference of a frame or a vector, and displacing a frame or a vector.

We can represent the configuration of a body frame {b} in the fixed space frame {s} by specifying the position p of the frame {b}, in {s} coordinates, and the rotation matrix R specifying the orientation of {b}, also in {s} coordinates. We gather these together in a single 4 by 4 matrix T, called a homogeneous transformation matrix, or just a transformation matrix for short. The bottom row, which consists of three zeros and a one, is included to simplify matrix operations, as we'll see soon.

The set of all transformation matrices is called the special Euclidean group SE(3). Transformation matrices satisfy properties analogous to those for rotation matrices. Each transformation matrix has an inverse such that T times its inverse is the 4 by 4 identity matrix. The product of two transformation matrices is also a transformation matrix. Matrix multiplication is associative, but not generally commutative.

Also analogous to rotation matrices, transformation matrices have three common uses: The first is to represent a rigid-body configuration. The second is to change the frame of reference of a vector or a frame. The third is to displace a vector or a frame.

To represent a frame {b} relative to a frame {s}, we construct the matrix T\_sb consisting of the rotation matrix R\_sb, as we saw in previous videos, and the position p of the {b} frame origin in {s} frame coordinates. The representation of the {s} frame relative to the {b} frame is just the inverse. As with the rotation matrix, the matrix inverse corresponds to switching the order of the subscripts.

To change the frame of reference of a configuration, we can use the same subscript cancellation rule as for rotation matrices. If we know T\_sb and T\_bc, we can calculate T\_sc, representing the configuration of frame {c} in frame {s}, by multiplying T\_sb by T\_bc. The inverse of T\_sc is T\_cs. Just as we followed T\_sb and then T\_bc to get to T\_sc, we can follow Tbc inverse and T\_sb inverse to get T\_cs.

We can also change the frame of reference for a point p in space. Let p\_b and p\_s be the representations of the point in the {b} and {s} frames. We could naively try our subscript cancellation rule again, but this doesn't work: T\_sb and p\_b have a dimension mismatch. To fix this, we simply append a 1 to the end of each vector, making the 3-vector into a 4-vector. This is called the homogeneous coordinate representation of the 3-vector.

Finally, a transformation matrix can be used to displace a point or a frame. Consider the fact that any configuration can be achieved from the initial configuration by first rotating, and then translating. In this animation, a frame initially at the zero orientation rotates about a fixed axis omega-hat a distance theta. It then translates according to the vector p, which is expressed in the coordinates of the initial frame T\_zero. Its final configuration is given by T, where the Translation and Rotation operators are expressed by these matrices. T can be viewed not only as a configuration, but also as the transformation that takes the identity matrix to T.

Let's consider a specific example of using a transformation matrix T to move a frame. Our transformation T is defined by a translation of 2 units along the y-axis, a rotation axis aligned with the z-axis, and a rotation angle of 90 degrees, or pi over 2. We will use the transformation T to move the {b} frame relative to the {s} frame. The {b} frame is initially represented by T\_sb.

Since we have two frames, we need to know whether the transformation vectors p and omega-hat are expressed in the {b} frame or the {s} frame. The answer depends on whether T right-multiplies or left-multiplies T\_sb.

If we left-multiply T\_sb by T, the vectors p and omega-hat are considered to be expressed in the frame of the first subscript of T\_sb, the {s} frame. Let's animate the transformation T. The rotation axis z and the translation axis y, expressed in the {s} frame, are shown. First the {b} frame will rotate 90 degrees about the z-axis of the {s} frame, and then it will translate 2 units along the y-direction of the {s} frame. Let's run the animation. And now one more time. Notice where the {b} frame ends up. We call this new frame {b-prime}.

If instead we right-multiply T\_sb by T, the vectors p and omega-hat are considered to be expressed in the frame of the second subscript of T\_sb, the {b} frame. Also, the order of the operations is reversed: first we translate T\_sb, and then we rotate it. Let's animate the motion. Watch how the {b} frame first translates by 2 units in the y-direction of the {b} frame, then rotates about the z-axis of the {b} frame. Let's run the animation. Notice that the body z-axis, used for rotation in the second step, moved along with the frame during the initial translation. And now one more time. Notice where the {b} frame ends up. We call this new frame {b-double-prime}.

In summary, if the transformation T is applied on the right, the vectors p and omega-hat are considered to be expressed in the body frame, moving the frame {b} to the new frame {b-double-prime}. If the transformation T is applied on the left, p and omega-hat are considered to be expressed in the space frame, moving the frame {b} to the new frame {b-prime}.

In the next video we introduce our representation of a rigid-body linear and angular velocity, called a twist.

## Table of Contents

### Introduction

* [Introduction Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/introduction-autoplay/#department)
* [Introduction to the Lightboard](https://modernrobotics.northwestern.edu/nu-gm-book-resource/introduction-to-the-lightboard/#department)
* [Acknowledgments](https://modernrobotics.northwestern.edu/nu-gm-book-resource/acknowledgments/#department)

### Chapter 2 Configuration Space

* [Chapter 2 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-2-playlist/#department)
* [Foundations of Robot Motion](https://modernrobotics.northwestern.edu/nu-gm-book-resource/foundations-of-robot-motion/#department)
* [2.1. Degrees of Freedom of a Rigid Body](https://modernrobotics.northwestern.edu/nu-gm-book-resource/2-1-degrees-of-freedom-of-a-rigid-body/#department)
* [2.2. Degrees of Freedom of a Robot](https://modernrobotics.northwestern.edu/nu-gm-book-resource/2-2-degrees-of-freedom-of-a-robot/#department)
* [2.3.1. Configuration Space Topology](https://modernrobotics.northwestern.edu/nu-gm-book-resource/2-3-1-configuration-space-topology/#department)
* [2.3.2. Configuration Space Representation](https://modernrobotics.northwestern.edu/nu-gm-book-resource/2-3-2-configuration-space-representation/#department)
* [2.4. Configuration and Velocity Constraints](https://modernrobotics.northwestern.edu/nu-gm-book-resource/2-4-configuration-and-velocity-constraints/#department)
* [2.5. Task Space and Workspace](https://modernrobotics.northwestern.edu/nu-gm-book-resource/2-5-task-space-and-workspace/#department)

### Chapter 3 Rigid-Body Motions

* [Chapter 3 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-3-autoplay/#department)
* [Introduction to Rigid-Body Motions](https://modernrobotics.northwestern.edu/nu-gm-book-resource/introduction-to-rigid-body-motions/#department)
* [3.2.1. Rotation Matrices (Part 1 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-2-1-rotation-matrices-part-1-of-2/#department)
* [3.2.1. Rotation Matrices (Part 2 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-2-1-rotation-matrices-part-2-of-2/#department)
* [3.2.2. Angular Velocities](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-2-2-angular-velocities/#department)
* [3.2.3. Exponential Coordinates of Rotation (Part 1 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-2-3-exponential-coordinates-of-rotation-part-1-of-2/#department)
* [3.2.3. Exponential Coordinates of Rotation (Part 2 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-2-3-exponential-coordinates-of-rotation-part-2-of-2/#department)
* [3.3.1. Homogeneous Transformation Matrices](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-3-1-homogeneous-transformation-matrices/#department)
* [3.3.2. Twists (Part 1 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-3-2-twists-part-1-of-2/#department)
* [3.3.2. Twists (Part 2 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-3-2-twists-part-2-of-2/#department)
* [3.3.3. Exponential Coordinates of Rigid-Body Motion](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-3-3-exponential-coordinates-of-rigid-body-motion/#department)
* [3.4. Wrenches](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-4-wrenches/#department)

### Chapter 4 Forward Kinematics

* [Chapter 4 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-4-autoplay/#department)
* [4.1.1. Product of Exponentials Formula in the Space Frame](https://modernrobotics.northwestern.edu/nu-gm-book-resource/4-1-1-product-of-exponentials-formula-in-the-space-frame/#department)
* [4.1.2. Product of Exponentials Formula in the End-Effector Frame](https://modernrobotics.northwestern.edu/nu-gm-book-resource/4-1-2-product-of-exponentials-formula-in-the-end-effector-frame/#department)
* [Forward Kinematics Example](https://modernrobotics.northwestern.edu/nu-gm-book-resource/forward-kinematics-example/#department)

### Chapter 5 Velocity Kinematics and Statics

* [Chapter 5 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-5-autoplay/#department)
* [Velocity Kinematics and Statics](https://modernrobotics.northwestern.edu/nu-gm-book-resource/velocity-kinematics-and-statics/#department)
* [5.1.1. Space Jacobian](https://modernrobotics.northwestern.edu/nu-gm-book-resource/5-1-1-space-jacobian/#department)
* [5.1.2. Body Jacobian](https://modernrobotics.northwestern.edu/nu-gm-book-resource/5-1-2-body-jacobian/#department)
* [5.2. Statics of Open Chains](https://modernrobotics.northwestern.edu/nu-gm-book-resource/5-2-statics-of-open-chains/#department)
* [5.3. Singularities](https://modernrobotics.northwestern.edu/nu-gm-book-resource/5-3-singularities/#department)
* [5.4. Manipulability](https://modernrobotics.northwestern.edu/nu-gm-book-resource/5-4-manipulability/#department)

### Chapter 6 Inverse Kinematics

* [Chapter 6 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-6-autoplay/#department)
* [Inverse Kinematics of Open Chains](https://modernrobotics.northwestern.edu/nu-gm-book-resource/inverse-kinematics-of-open-chains/#department)
* [6.2. Numerical Inverse Kinematics (Part 1 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/6-2-numerical-inverse-kinematics-part-1-of-2/#department)
* [6.2. Numerical Inverse Kinematics (Part 2 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/6-2-numerical-inverse-kinematics-part-2-of-2/#department)

### Chapter 7 Kinematics of Closed Chains

* [Chapter 7 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-7-autoplay/#department)
* [Kinematics of Closed Chains](https://modernrobotics.northwestern.edu/nu-gm-book-resource/kinematics-of-closed-chains/#department)

### Chapter 8 Dynamics of Open Chains

* [Chapter 8 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-8-autoplay/#department)
* [8.1. Lagrangian Formulation of Dynamics (Part 1 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-8-1-lagrangian-formulation-of-dynamics-part-1-of-2/#department)
* [8.1. Lagrangian Formulation of Dynamics (Part 2 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/8-1-lagrangian-formulation-of-dynamics-part-2-of-2/#department)
* [8.1.3. Understanding the Mass Matrix](https://modernrobotics.northwestern.edu/nu-gm-book-resource/8-1-3-understanding-the-mass-matrix/#department)
* [8.2. Dynamics of a Single Rigid Body (Part 1 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/8-2-dynamics-of-a-single-rigid-body-part-1-of-2/#department)
* [8.2. Dynamics of a Single Rigid Body (Part 2 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/8-2-dynamics-of-a-single-rigid-body-part-2-of-2/#department)
* [8.3. Newton-Euler Inverse Dynamics](https://modernrobotics.northwestern.edu/nu-gm-book-resource/8-3-newton-euler-inverse-dynamics/#department)
* [8.5. Forward Dynamics of Open Chains](https://modernrobotics.northwestern.edu/nu-gm-book-resource/8-5-forward-dynamics-of-open-chains/#department)
* [8.6. Dynamics in the Task Space](https://modernrobotics.northwestern.edu/nu-gm-book-resource/8-6-dynamics-in-the-task-space/#department)
* [8.7. Constrained Dynamics](https://modernrobotics.northwestern.edu/nu-gm-book-resource/8-7-constrained-dynamics/#department)
* [8.9. Actuation, Gearing, and Friction](https://modernrobotics.northwestern.edu/nu-gm-book-resource/8-9-actuation-gearing-and-friction/#department)

### Chapter 9 Trajectory Generation

* [Chapter 9 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-9-autoplay/#department)
* [9.1 and 9.2. Point-to-Point Trajectories (Part 1 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/9-1-and-9-2-point-to-point-trajectories-part-1-of-2/#department)
* [9.1 and 9.2. Point-to-Point Trajectories (Part 2 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/9-1-and-9-2-point-to-point-trajectories-part-2-of-2/#department)
* [9.3. Polynomial Via Point Trajectories](https://modernrobotics.northwestern.edu/nu-gm-book-resource/9-3-polynomial-via-point-trajectories/#department)
* [9.4. Time-Optimal Time Scaling (Part 1 of 3)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/9-4-time-optimal-time-scaling-part-1-of-3/#department)
* [9.4. Time-Optimal Time Scaling (Part 2 of 3)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/9-4-time-optimal-time-scaling-part-2-of-3/#department)
* [9.4. Time-Optimal Time Scaling (Part 3 of 3)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/9-4-time-optimal-time-scaling-part-3-of-3/#department)

### Chapter 10 Motion Planning

* [Chapter 10 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-10-autoplay/#department)
* [10.1. Overview of Motion Planning](https://modernrobotics.northwestern.edu/nu-gm-book-resource/10-1-overview-of-motion-planning/#department)
* [10.2.1. C-Space Obstacles](https://modernrobotics.northwestern.edu/nu-gm-book-resource/10-2-c-space-obstacles/#department)
* [10.2.3. Graphs and Trees](https://modernrobotics.northwestern.edu/nu-gm-book-resource/10-2-3-graphs-and-trees/#department)
* [10.2.4. Graph Search](https://modernrobotics.northwestern.edu/nu-gm-book-resource/10-2-4-graph-search/#department)
* [10.3. Complete Path Planners](https://modernrobotics.northwestern.edu/nu-gm-book-resource/10-3-complete-path-planners/#department)
* [10.4. Grid Methods for Motion Planning](https://modernrobotics.northwestern.edu/nu-gm-book-resource/10-4-grid-methods-for-motion-planning/#department)
* [10.5. Sampling Methods for Motion Planning (Part 1 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/10-5-sampling-methods-for-motion-planning-part-1-of-2/#department)
* [10.5. Sampling Methods for Motion Planning (Part 2 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/10-5-sampling-methods-for-motion-planning-part-2-of-2/#department)
* [10.6. Virtual Potential Fields](https://modernrobotics.northwestern.edu/nu-gm-book-resource/10-6-virtual-potential-fields/#department)
* [10.7. Nonlinear Optimization](https://modernrobotics.northwestern.edu/nu-gm-book-resource/10-7-nonlinear-optimization/#department)

### Chapter 11 Robot Control

* [Chapter 11 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-11-autoplay/#department)
* [11.1. Control System Overview](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-1-control-system-overview/#department)
* [11.2.1. Error Response](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-2-1-error-response/#department)
* [11.2.2. Linear Error Dynamics](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-2-2-linear-error-dynamics/#department)
* [11.2.2.1. First-Order Error Dynamics](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-2-2-1-first-order-error-dynamics/#department)
* [11.2.2.2. Second-Order Error Dynamics](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-2-2-2-second-order-error-dynamics/#department)
* [11.3. Motion Control with Velocity Inputs (Part 1 of 3)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-3-motion-control-with-velocity-inputs-part-1-of-3/#department)
* [11.3. Motion Control with Velocity Inputs (Part 2 of 3)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-3-motion-control-with-velocity-inputs-part-2-of-3/#department)
* [11.3. Motion Control with Velocity Inputs (Part 3 of 3)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-3-motion-control-with-velocity-inputs-part-3-of-3/#department)
* [11.4. Motion Control with Torque or Force Inputs (Part 1 of 3)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-4-motion-control-with-torque-or-force-inputs-part-1-of-3/#department)
* [11.4. Motion Control with Torque or Force Inputs (Part 2 of 3)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-4-motion-control-with-torque-or-force-inputs-part-2-of-3/#department)
* [11.4. Motion Control with Torque or Force Inputs (Part 3 of 3)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-4-motion-control-with-torque-or-force-inputs-part-3-of-3/#department)
* [11.5. Force Control](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-5-force-control/#department)
* [11.6. Hybrid Motion-Force Control](https://modernrobotics.northwestern.edu/nu-gm-book-resource/11-6-hybrid-motion-force-control/#department)

### Chapter 12 Grasping and Manipulation

* [Chapter 12 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-12-autoplay/#department)
* [Grasping and Manipulation](https://modernrobotics.northwestern.edu/nu-gm-book-resource/grasping-and-manipulation/#department)
* [12.1.1. First-Order Analysis of a Single Contact](https://modernrobotics.northwestern.edu/nu-gm-book-resource/12-1-1-first-order-analysis-of-a-single-contact/#department)
* [12.1.2. Contact Types: Rolling, Sliding, and Breaking](https://modernrobotics.northwestern.edu/nu-gm-book-resource/12-1-2-contact-types-rolling-sliding-and-breaking/#department)
* [12.1.3. Multiple Contacts](https://modernrobotics.northwestern.edu/nu-gm-book-resource/12-1-3-multiple-contacts/#department)
* [12.1.6. Planar Graphical Methods (Part 1 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/12-1-6-planar-graphical-methods-part-1-of-2/#department)
* [12.1.6. Planar Graphical Methods (Part 2 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/12-1-6-planar-graphical-methods-part-2-of-2/#department)
* [12.1.7. Form Closure](https://modernrobotics.northwestern.edu/nu-gm-book-resource/12-1-7-form-closure/#department)
* [12.2.1. Friction](https://modernrobotics.northwestern.edu/nu-gm-book-resource/12-2-1-friction/#department)
* [12.2.2. Planar Graphical Methods](https://modernrobotics.northwestern.edu/nu-gm-book-resource/12-2-2-planar-graphical-methods/#department)
* [12.2.3. Force Closure](https://modernrobotics.northwestern.edu/nu-gm-book-resource/12-2-3-force-closure/#department)
* [12.2.4. Duality of Force and Motion Freedoms](https://modernrobotics.northwestern.edu/nu-gm-book-resource/12-2-4-duality-of-force-and-motion-freedoms/#department)
* [12.3. Manipulation and the Meter-Stick Trick](https://modernrobotics.northwestern.edu/nu-gm-book-resource/12-3-manipulation-and-the-meter-stick-trick/#department)
* [12.3. Transport of an Assembly](https://modernrobotics.northwestern.edu/nu-gm-book-resource/12-3-transport-of-an-assembly/#department)

### Chapter 13 Wheeled Mobile Robots

* [Chapter 13 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-13-autoplay/#department)
* [13.1. Wheeled Mobile Robots](https://modernrobotics.northwestern.edu/nu-gm-book-resource/13-1-wheeled-mobile-robots/#department)
* [13.2. Omnidirectional Wheeled Mobile Robots (Part 1 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/13-2-omnidirectional-wheeled-mobile-robots-part-1-of-2/#department)
* [13.2. Omnidirectional Wheeled Mobile Robots (Part 2 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/13-2-omnidirectional-wheeled-mobile-robots-part-2-of-2/#department)
* [13.3.1. Modeling of Nonholonomic Wheeled Mobile Robots](https://modernrobotics.northwestern.edu/nu-gm-book-resource/13-3-1-modeling-of-nonholonomic-wheeled-mobile-robots/#department)
* [13.3.2. Controllability of Wheeled Mobile Robots (Part 1 of 4)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/13-3-2-controllability-of-wheeled-mobile-robots-part-1-of-4/#department)
* [13.3.2. Controllability of Wheeled Mobile Robots (Part 2 of 4)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/13-3-2-controllability-of-wheeled-mobile-robots-part-2-of-4/#department)
* [13.3.2. Controllability of Wheeled Mobile Robots (Part 3 of 4)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/13-3-2-controllability-of-wheeled-mobile-robots-part-3-of-4/#department)
* [13.3.2. Controllability of Wheeled Mobile Robots (Part 4 of 4)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/13-3-2-controllability-of-wheeled-mobile-robots-part-4-of-4/#department)
* [13.3.3. Motion Planning for Nonholonomic Mobile Robots](https://modernrobotics.northwestern.edu/nu-gm-book-resource/13-3-3-motion-planning-for-nonholonomic-mobile-robots/#department)
* [13.3.4. Feedback Control for Nonholonomic Mobile Robots](https://modernrobotics.northwestern.edu/nu-gm-book-resource/13-3-4-feedback-control-for-nonholonomic-mobile-robots/#department)
* [13.4. Odometry](https://modernrobotics.northwestern.edu/nu-gm-book-resource/13-4-odometry/#department)
* [13.5. Mobile Manipulation](https://modernrobotics.northwestern.edu/nu-gm-book-resource/13-5-mobile-manipulation/#department)

[Chapter 3.3.2. Twists (Part 1 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-3-2-twists-part-1-of-2/ "Chapter 3.3.2. <small class='resource-subtitle'>Twists (Part 1 of 2)</small>")

[Chapter 3.2.3. Exponential Coordinates of Rotation (Part 2 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/3-2-3-exponential-coordinates-of-rotation-part-2-of-2/ "Chapter 3.2.3. <small class='resource-subtitle'>Exponential Coordinates of Rotation (Part 2 of 2)</small>")

[![Northwestern University logo](https://modernrobotics.northwestern.edu/wp-content/themes/nu_gm/library/images/northwestern-university.svg)](http://www.northwestern.edu/)

* © 2026 Northwestern University
* [Disclaimer](http://www.northwestern.edu/disclaimer.html)
* [Contact Northwestern University](http://www.northwestern.edu/contact.html)
* [Careers](http://www.northwestern.edu/hr/careers/)
* [Campus Emergency Information](http://www.northwestern.edu/emergency/index.html)
* [University Policies](http://policies.northwestern.edu/)

* Address
* 633 Clark Street
  Evanston, IL 60208

* Phone number
* **Evanston**
* (847) 491-3741

* **Chicago**
* (312) 503-8649

**Social Media**

* [Book, Software, etc.](http://modernrobotics.org/)
* [Online Courses (Coursera)](https://www.coursera.org/specializations/modernrobotics)
