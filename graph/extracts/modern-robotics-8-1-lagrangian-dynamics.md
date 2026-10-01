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

## 8.1. Lagrangian Formulation of Dynamics (Part 1 of 2)

#### 8.1. Lagrangian Formulation of Dynamics (Part 1 of 2)

* [Description](#tab-panel-description)
* [Transcript](#tab-panel-transcript)

This video introduces the Lagrangian approach to finding the dynamic equations of motion of robot and describes the structure of the dynamic equations, including the mass matrix, velocity-product terms (Coriolis and centripetal terms), and potential terms (e.g., gravity).

In Chapter 8, we study the dynamics of open-chain robots. For example, the forward dynamics problem is to calculate the joint accelerations theta-double-dot given the current joint positions theta, the joint velocities theta-dot, and the forces and torques tau applied at each joint. The forward dynamics is useful for simulation.

The inverse dynamics problem is to find the joint forces and torques tau needed to create the acceleration theta-double-dot for the given joint positions and velocities. The inverse dynamics is useful in control of robots.

Robot dynamics is necessary not just for simulation and control, but also for the analysis of robot motion planners and controllers, as we'll see in chapters 9 through 11.

In this book we study two approaches to solving the forward and inverse dynamics problems. The first is the Lagrangian formulation, a variational approach based on the kinetic and potential energy of the robot. The second approach is the Newton-Euler formulation, which relies on f equals m\_a applied to each individual link of the robot. The focus of Chapter 8 is primarily on the Newton-Euler formulation, because it uses some of the geometric tools we have already developed, and it results in an efficient recursive algorithm for calculating the inverse dynamics.

In this video, though, we start with the Lagrangian formulation, due to its conceptual simplicity. The key object in the Lagrangian formulation is the Lagrangian L. The Lagrangian for a mechanical system is its kinetic energy minus its potential energy. The potential energy P depends only on the configuration theta, while the kinetic energy K depends on theta and theta-dot.

I won't derive the Lagrangian equations of motion, which you can find in many textbooks on mechanics. I'll just state the result: the vector of joint forces and torques tau is equal to the time derivative of the partial derivative of L with respect to theta-dot minus the partial derivative of L with respect to theta. The joint forces and torques tau are dual to the joint velocities theta-dot, meaning that tau dotted with theta-dot represents the power consumed or produced by the joints.

We can write this vector equation in its components as shown here, where tau\_i is the i-th element of the n-vector tau.

Let's apply the formulation to a 2R robot in gravity. The lengths of the links are L\_1 and L\_2, and all the mass of the robot is concentrated in point masses m\_1 and m\_2 as shown. We need to calculate the kinetic and potential energy of the two-point masses, so first we calculate the position of mass\_1, given by the coordinates x\_1 and y\_1. We can take the derivative to get the velocity of m\_1. We can do the same for mass\_2, deriving its position and velocity. With this information, we can calculate the kinetic energy of link\_1 as one-half m\_1 v\_1-squared, where v\_1-squared is just x\_1-dot-squared plus y\_1-dot-squared. Applying our earlier derivation, the kinetic energy simplifies to one-half m\_1 L\_1-squared theta\_1-dot-squared. We can similarly calculate the kinetic energy of link\_2. The potential energy of each mass depends only on its height, or its y-coordinate.

Now we can calculate the Lagrangian as the sum of the kinetic energies minus the potential energies of the links, and express the joint torques in terms of the derivatives of the Lagrangian. This is tedious to do manually, but let's look at how we would calculate the derivatives for one particular component of the Lagrangian, which I'll call L\_comp. The impact of this component of the Lagrangian on the torque at the second joint is tau\_2comp. If we take the partial derivative of L\_comp with respect to theta\_2-dot, we get m\_2 L\_1 L\_2 theta\_1-dot cosine of theta\_2, and if we take the time derivative of that, we get the expression you see here. Now we can subtract the partial derivative of L\_comp with respect to theta\_2 to get this expression. The last two terms cancel, so the final torque at joint 2 due to L\_comp is m\_2 L\_1 L\_2 theta\_1-double-dot cosine theta\_2.

If we do these calculations for all the terms in the Lagrangian, we get these equations of motion. Even for a simple 2R robot, the equations are rather complicated. Notice that some terms are linear in the joint acceleration theta-double-dot, some terms do not depend on the joint acceleration but instead depend on a product of joint velocities, like theta\_1-dot times theta\_2-dot or theta\_2-dot-squared, and some terms have no dependence on the joint velocities or accelerations. With this observation, we can write the vector equation of motion in this form: tau equals M of theta times theta-double-dot plus c of (theta, theta-dot) plus g of theta, where the matrix M and the vectors c and g are shown here. We call M the mass matrix. For a robot with n joints, this matrix is n-by-n, and for our 2R example it is 2-by-2. We call the vector c a velocity-product term, since it is composed of terms with a theta\_i-squared or a theta\_i times theta\_j in it. Finally, we call the vector g the gravity term, since it depends on gravity. We call this a gravity term under the assumption that the potential energy comes only from gravity, but if there were springs at the robot joints, those springs would also contribute to the potential energy and therefore to g of theta.

Overall, this equation looks like f equals m-a plus a gravity force, except that the accelerations of the masses depend not only on the joint accelerations but also products of the joint velocities. These velocity-product terms appear because the joint coordinates are not inertial coordinates. We will explore velocity-product terms in more detail in the next video.

There is one more term we could add to the right-hand side, the Jacobian transpose times F\_tip, where F\_tip is the wrench that the end-effector applies to the environment. We learned about this term in Chapter 5.

In the next video we'll take a closer look at velocity-product terms.

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

[Chapter 8.1. Lagrangian Formulation of Dynamics (Part 2 of 2)](https://modernrobotics.northwestern.edu/nu-gm-book-resource/8-1-lagrangian-formulation-of-dynamics-part-2-of-2/ "Chapter 8.1. <small class='resource-subtitle'>Lagrangian Formulation of Dynamics (Part 2 of 2)</small>")

[Chapter 8 Autoplay](https://modernrobotics.northwestern.edu/nu-gm-book-resource/chapter-8-autoplay/ "Chapter 8 Autoplay")

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
