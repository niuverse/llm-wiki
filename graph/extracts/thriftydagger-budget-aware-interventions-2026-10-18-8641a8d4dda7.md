<!-- 原始证据：raw/thriftydagger-budget-aware-interventions-2026-10-18-8641a8d4dda7.pdf；标准提取产生NUL，使用PyMuPDF逐页get_text(sort=True)重建；公式以原PDF为准。 -->

## PDF 第 1 页

  ThriftyDAgger: Budget-Aware Novelty and Risk
     Gating for Interactive Imitation Learning

              Ryan Hoque1, Ashwin Balakrishna1, Ellen Novoseller1,
                   Albert Wilcox1, Daniel S. Brown1, Ken Goldberg1



        Abstract: Effective robot learning often requires online human feedback and inter-
        ventions that can cost signiﬁcant human time, giving rise to the central challenge
         in interactive imitation learning: is it possible to control the timing and length
         of interventions to both facilitate learning and limit burden on the human super-
         visor? This paper presents ThriftyDAgger, an algorithm for actively querying a
       human supervisor given a desired budget of human interventions. ThriftyDAgger
        uses a learned switching policy to solicit interventions only at states that are suf-
         ﬁciently (1) novel, where the robot policy has no reference behavior to imitate,
         or (2) risky, where the robot has low conﬁdence in task completion. To detect
         the latter, we introduce a novel metric for estimating risk under the current robot
         policy. Experiments in simulation and on a physical cable routing experiment
        suggest that ThriftyDAgger’s intervention criteria balances task performance and
         supervisor burden more effectively than prior algorithms. ThriftyDAgger can
         also be applied at execution time, where it achieves a 100% success rate on both
         the simulation and physical tasks. A user study (N = 10) in which users con-
          trol a three-robot ﬂeet while also performing a concentration task suggests that
        ThriftyDAgger increases human and robot performance by 58% and 80% respec-
          tively compared to the next best algorithm while reducing supervisor burden. See
       https://tinyurl.com/thrifty-dagger for supplementary material.

       Keywords: Imitation Learning, Fleet Learning, Human Robot Interaction

1  Introduction
Imitation learning (IL) [1, 2, 3] has seen success in a variety of robotic tasks ranging from autonomous
driving [4, 5, 6] to robotic manipulation [7, 8, 9, 10, 11]. In its simplest form, the human provides
an ofﬂine set of task demonstrations to the robot, which the robot uses to match human behavior.
However, this ofﬂine approach can lead to low task performance due to a mismatch between the
state distribution encountered in the demonstrations and that visited by the robot [12, 13], resulting
in brittle policies that cannot be effectively deployed in real-world applications [14]. Interactive
imitation learning, in which the robot periodically cedes control to a human supervisor for corrective
interventions, has emerged as a promising technique to address these challenges [15, 16, 17, 18].
However, while interventions make it possible to learn robust policies, these interventions require
signiﬁcant human time. Thus, the central challenge in interactive IL algorithms is to control the
timing and length of interventions to balance task performance with the burden imposed on the
human supervisor [19, 18]. Achieving this balance is even more critical if the human supervisor must
oversee multiple robots at once [20, 21, 22], for instance supervising a ﬂeet of self-driving taxis [6]
or robots in a warehouse [23]. Since even relatively reliable robot policies inevitably encounter
new situations that must fall back on human expertise, this problem is immediately relevant to
contemporary companies such as Waymo and Plus One Robotics.
One way to determine when to solicit interventions is to allow the human supervisor to decide
when to provide the corrective interventions. However, these approaches—termed “human-gated”
interactive IL algorithms [15, 16, 24]—require the human supervisor to continuously monitor the
robot to determine when to intervene. This imposes signiﬁcant burden on the supervisor and cannot

   1AUTOLAB at the University of California, Berkeley
    Correspondence to ryanhoque@berkeley.edu


5th Conference on Robot Learning (CoRL 2021), London, UK.

## PDF 第 2 页

Figure 1: ThriftyDAgger: Given a desired context switching rate ↵h, ThriftyDAgger transfers control to a
human supervisor if the current state st is (1) sufﬁciently novel or (2) sufﬁciently risky, indicating that the
probability of task success is low under robot policy ⇡r. Intuitively, one should not only distrust ⇡r in states
signiﬁcantly out of the distribution of previously encountered states, but should also cede control to a human
supervisor in more familiar states where the robot predicts that it is unlikely to successfully complete the task.

effectively scale to settings in which a small number of humans supervise a large number of robots.
To address this challenge, there has been recent interest in approaches that enable the robot to actively
query humans for interventions, called “robot-gated” algorithms [19, 25, 26, 18]. Robot-gated
methods allow the robot to reduce burden on the human supervisor by only requesting interventions
when necessary, switching between robot control and human control based on some intervention
criteria. Hoque et al. [18] formalize the idea of supervisor burden as the expected total cost incurred
by the human in providing interventions, which consists of the expected cost due to context switching
between autonomous and human control and the time spent actually providing interventions. However,
it is difﬁcult to design intervention criteria that limit this burden while ensuring that the robot gains
sufﬁcient information to imitate the supervisor’s policy.
This paper makes several contributions. First, we develop intervention criteria based on a synthesis of
two estimated properties of a given state: novelty, which measures whether the state is signiﬁcantly
out of the distribution of previously encountered states, indicating that the robot policy should not be
trusted; and risk, which measures the likelihood of the robot successfully completing the task on its
own. While state novelty has been considered in prior work [26], the key insight in our intervention
criteria lies in combining novelty with a new risk metric to estimate the probability of task success.
Second, we present a new robot-gated interactive IL algorithm, ThriftyDAgger (Figure 1), which
employs these measures jointly to solicit human interventions only when necessary. Third, while prior
robot-gated algorithms [19, 18] require careful parameter tuning to modulate the timing and frequency
of human intervention requests, ThriftyDAgger only requires the supervisor to specify a desired
context switching rate and sets thresholds accordingly. Fourth, experimental results demonstrate
ThriftyDAgger’s effectiveness for reducing supervisor burden while learning challenging tasks both
in simulation and in an image-based cable routing task on a physical robot. Finally, the results of
a human user study applying ThriftyDAgger to control a ﬂeet of three simulated robots suggest
that ThriftyDAgger signiﬁcantly improves performance on both the robots’ task and an independent
human task while imposing fewer context switches, fewer human intervention actions, and lower
mental load and frustration than prior algorithms.

2  Related Work

Imitation Learning from Human Feedback: There has been signiﬁcant prior work in ofﬂine
imitation learning, in which the agent leverages an ofﬂine dataset of expert demonstrations either
to directly match the distribution of trajectories in the ofﬂine dataset [4, 27, 1, 3, 28, 29, 30], for
instance via Behavior Cloning [31, 32], or to learn a reward function that can then be optimized
via reinforcement learning [33, 27, 34]. However, while these approaches have shown signiﬁcant
success in a number of domains [7, 10, 9, 32], learning from purely ofﬂine data leads to a trajectory
distribution mismatch which yields suboptimal performance both in theory and practice [12, 13]. To
address this problem, there have been a number of approaches that utilize online human feedback
while the agent acts in the environment, such as providing suggested actions [12, 35, 36, 17] or
preferences [37, 38, 39, 40, 41, 42]. However, many of these forms of human feedback may be
unreliable if the robot visits states that signiﬁcantly differ from those the human supervisor would

                                       2

## PDF 第 3 页

themselves visit; in such situations, it is challenging for the supervisor to determine what correct
behavior should look like without directly interacting with the environment [16, 43].
Interactive Imitation Learning: A natural way to collect reliable online feedback for imitation
learning is to periodically cede control to a human supervisor, who then provides a corrective
intervention to illustrate desired behavior. Human-gated interactive IL algorithms [15, 16, 24] such
as HG-DAgger [15] require the human to determine when to engage in interventions. However, these
algorithms require a human to continuously monitor the robot to determine when to intervene, which
imposes signiﬁcant burden on the supervisor and is particularly impractical if a small number of
humans must supervise a large number of robots. Furthermore, it requires the human to determine
when the robot needs help and when to cede control, which can be unintuitive and unreliable.
By contrast, robot-gated interactive IL algorithms, such as EnsembleDAgger [26], SafeDAgger [19],
and LazyDAgger [18], allow the robot to actively query for human interventions.  In practice,
these algorithms estimate various quantities correlated with task performance [19, 18, 44, 25] and
uncertainty [26] and use them to determine when to solicit interventions. Prior work has proposed
intervention criteria which use the novelty of states visited by the robot [26] or the predicted
discrepancy between the actions proposed by the robot policy and those of the supervisor [19, 18].
However, while state novelty provides a valuable signal for soliciting interventions, we argue that
this alone is insufﬁcient, as a state’s novelty does not convey information about the level of precision
with which actions must be executed in that state. In practice, many robotic tasks involve moving
through critical “bottlenecks” [24], which, though not necessarily novel, still present challenges.
Examples include moving an eating utensil close to a person’s mouth or placing an object on a shelf
without disturbing nearby objects. Similarly, even if predicted accurately, action discrepancy is often
a ﬂawed risk measure, as high action discrepancy between the robot and the supervisor may be
permissible when ﬁne-grained control is not necessary (e.g. a robot gripper moving in free space) but
impermissible when precision is critical (e.g. a robot gripper actively trying to grasp an object). In
contrast, ThriftyDAgger presents an intervention criteria incorporating both state novelty and a novel
risk metric and automatically tunes key parameters, allowing efﬁcient use of human supervision.
3  Problem Statement
Given a robot, a task for the robot to accomplish, and a human supervisor with a speciﬁed context
switching budget, the goal is to train the robot to imitate supervisor performance within the budget. We
model the robot environment as a discrete-time Markov Decision Process (MDP) M with continuous
states s 2 S, continuous actions a 2 A, and time horizon T [45]. We consider the interactiveimitation learning (IL) setting [15], where the robot does not have access to a shaped reward function
or to the MDP’s transition dynamics but can temporarily cede control to a supervisor who uses policy
⇡h : S ! A. We speciﬁcally focus on tasks where there is a goal set G which determines success, butthat can be challenging and long-horizon, making direct application of RL highly sample inefﬁcient.
We assume that the human and robot utilize the same action space (e.g. through a teleoperation
interface) and that task success can be speciﬁed by convergence to some goal set G ✓S within the
time horizon (i.e., the task is successful if G is reached within T timesteps). We further assume access
to an indicator function 1G : S ! {0, 1}, which indicates whether a state belongs to the goal set G.
The IL objective is to minimize a surrogate loss function J(⇡r) to encourage the robot policy
⇡r : S ! A to match ⇡h:
          XT


                                                                    t                       J(⇡r) =    Est⇠d⇡r                                                [L(⇡r(st), ⇡h(st))] ,                          (1)
                                   t=1
where L(⇡r(s), ⇡h(s)) is an action discrepancy measure between ⇡r(s) and ⇡h(s) (e.g. MSE loss),
and d⇡rt   is the marginal state distribution at timestep t induced by the robot policy ⇡r in M.
In the interactive IL setting, in addition to optimizing Equation (1), a key design goal is to minimize
the imposed burden on the human supervisor. To formalize this, we deﬁne a switching policy ⇡,
which determines whether the system is under robot control ⇡r (which we call autonomous mode)
or human supervisor control ⇡h (which we call supervisor mode). Following prior work [18], we
deﬁne C(⇡), the expected number of context switches in an episode under policy ⇡, as follows:
     PT
                               t [mI(st; ⇡)], where mI(st; ⇡) is an indicator for whether or not a contextC(⇡) =   t=1 Est⇠d⇡
switch occurs from autonomous to supervisor control. Similarly, we deﬁne I(⇡) as the expected

                                       3

## PDF 第 4 页

number of supervisor actions in an intervention solicited by ⇡. We then deﬁne the total burden B(⇡)
imposed on the human supervisor as follows:                                             #        $
                          B(⇡) = C(⇡) · L + I(⇡)  ,                                 (2)
where L is the latency of a context switch between control modes (summed over both switching
directions) in units of timesteps, where each action takes one timestep. The interactive IL objective is
to minimize the discrepancy from the supervisor policy while limiting supervisor burden within some
Γb:
                                                                                                    (3)               ⇡= arg min {J(⇡r) | B(⇡0) Γb}.                                ⇡02⇧
Because it is challenging to explicitly optimize policies to satisfy the supervisor burden constraint in
Equation (3), we present novel intervention criteria that enable reduction of supervisor burden by
limiting the total number of interventions to a user-speciﬁed budget. Given sufﬁciently high latency
L, limiting the interventions C(⇡) directly corresponds to limiting supervisor burden B(⇡).
4  ThriftyDAgger
ThriftyDAgger determines when to switch between autonomous and human supervisor control
modes by leveraging estimates of both the novelty and risk of states. Below, Sections 4.1 and
4.2 discuss the estimation of state novelty and risk of task failure, respectively, while Section 4.3
discusses ThriftyDAgger’s integration of these measures to determine when to switch control modes.
Section 4.4 then describes an online procedure to set thresholds for switching between control modes.
Finally, Section 4.5 describes the full control ﬂow of ThriftyDAgger.
4.1  Novelty Estimation
When the robot policy visits states that lie signiﬁcantly outside the distribution of those encountered in
the supervisor trajectories, it does not have any reference behavior to imitate. This motivates initiating
interventions to illustrate desired recovery behaviors in these states. However, estimating the support
of the state distribution visited by the human supervisor is challenging in the high-dimensional
state spaces common in robotics. Following prior work [26], we train an ensemble of policies with
bootstrapped samples of transitions from supervisor trajectories. We then measure the novelty of a
given state s by calculating the variance of the policy outputs at state s across ensemble members.
In practice, the action a 2 A outputted by each policy is a vector; thus, we measure state noveltyby computing the variance of each component of the action vector a across the ensemble members
and then averaging over the components. We denote this quantity by Novelty(s). Once in supervisor
mode, as noted in Hoque et al. [18], we can obtain a more precise correlate of novelty by computing
the ground truth action discrepancy between the supervisor’s actions and those of the robot policy.
4.2  Risk Estimation
Interventions may be required not only in novel states outside the distribution of supervisor trajectories,
but also in familiar states that are prone to result in task failure. For example, a task might have a
“bottleneck” region with low tolerance for error, which has low novelty but nevertheless requires more
supervision to learn a reliable robot policy. To address this challenge, we propose a novel measure of
a state’s “riskiness,” capturing the likelihood that the robot cannot successfully converge to the goal
set G. We ﬁrst deﬁne a Q-function to quantify the discounted probability of successful convergence
to G from a given state and action under the robot" policy:           #
              X1
                  Q⇡r (st, at) =                               at   ,                      (4)                      G           Est0⇠d⇡rt0       γt0−t1G(st0)|st,
                                                      t0=t
where 1G(st) is equal to 1 if st belongs to G. We estimate Q⇡rG (st, at) via a function approximator
ˆQ⇡r  parameterized by φ, and deﬁne a state’s riskiness in terms of this learned Q-function:
  φ,G
                                Risk⇡r(s, a) = 1 −ˆQ⇡rφ,G(s, a).                                (5)
In practice, we train ˆQ⇡r on transitions (st, at, st+1) from both autonomous mode and supervisor
                       φ,Gmode by minimizing the following MSE loss inspired by [46]:
                  ⇣                                                   ⌘2                   1
 JQ (st, at, st+1; φ) =    ˆQ⇡r     at)             (1            ˆQ⇡r       ⇡r(st+1)))    . (6)   G                2    φ,G(st,   −(1G(st)+   −1G(st))γ  φ,G(st+1,
Note that since ˆQ⇡r   is only used to solicit interventions,  it must only be accurate enough to
                   φ,Gdistinguish risky states from others, rather than be able to make the ﬁne-grained distinctions between
different states required for accurate policy learning in reinforcement learning.

                                        4

## PDF 第 5 页

4.3  Regulating Switches in Control Modes
We now describe how ThriftyDAgger leverages the novelty estimator from Section 4.1 and the risk
estimator from Section 4.2 to regulate switches between autonomous and supervisor control. While
in autonomous mode, the switching policy ⇡initiates a switch to supervisor mode at timestep t if
either (1) state st is sufﬁciently unfamiliar or (2) the robot policy has a low probability of task success
from st. Stated precisely, ⇡initiates a switch to supervisor mode from autonomous mode at timestep
t if the predicate Intervene(st, δh, βh) evaluates to TRUE, where Intervene(st, δh, βh) is TRUE if (1)
Novelty(st) > δh or (2) Risk⇡r(st, ⇡r(st)) > βh, and FALSE otherwise. Note that the proposed
switching policy only depends on Risk⇡r for states which are not novel (as novel states already
initiate switches to supervisor control regardless of risk), since the learned risk measure should only
be trusted on states in the neighborhood of those on which it has been trained.
In supervisor mode, ⇡switches to autonomous mode if the action discrepancy between the human and
robot policy and the robot’s task failure risk are both below threshold values (Section 4.4), indicating
that the robot is in a familiar and safe region. Stated precisely, ⇡switches to autonomous mode from
supervisor mode if the predicate Cede(st, δr, βr) evaluates to TRUE, where Cede(st, δr, βr) is TRUE
                         2 < δr and (2) Risk⇡r(st, ⇡r(st)) < βr, and FALSE otherwise. Here, theif (1) ||⇡r(st) −⇡h(st)||2risk metric ensures that the robot has a high probability of autonomously completing the task, while
the coarser 1-step action discrepancy metric veriﬁes that we are in a familiar region of the state space
where the ˆQ⇡r  values can be trusted. Motivated by prior work [18] and hysteresis control [47], we
            φ,Guse asymmetric switching criteria with stricter thresholds in supervisor mode (βr < βh) to encourage
lengthier interventions and reduce context switches experienced by the human supervisor.

4.4  Computing Risk and Novelty Thresholds from Data
One challenge of the control strategy presented in Section 4.3 lies in tuning the key parameters
(δh, δr, βh, βr) governing when context switching occurs. As noted in prior work [26], performance
and supervisor burden can be sensitive to these thresholds. To address this difﬁculty, we assume that
the user speciﬁes their availability in the form of a desired intervention budget ↵h 2 [0, 1], indicatingthe desired proportion of timesteps in which interventions will be requested. This desired context
switching rate can be interpreted in the context of supervisor burden as deﬁned in Equation (2): if the
latency of a context switch dominates the time cost of the intervention itself, limiting the expected
number of context switches to within some intervention budget directly limits supervisor burden.
Given ↵h, we set βh to be the (1 −↵h)-quantile of Risk⇡r(s, ⇡r(s)) for all states previously visited
by ⇡r and set δh to be the (1 −↵h)-quantile of Novelty(s) for all states previously visited by ⇡r. Weset δr to be the mean action discrepancy on the states visited by the supervisor after ⇡r is trained and
set βr to be the median of Risk⇡r(s, ⇡r(s)) for all states previously visited by ⇡r. (Note that βr can
easily be set to different quantiles to adjust mean intervention length if desired.) We ﬁnd that these
settings strike a balance between informative interventions and imposed supervisor burden.

4.5  ThriftyDAgger Overview
We now summarize the ThriftyDAgger procedure, with full pseudocode available in the supplement.
ThriftyDAgger ﬁrst initializes ⇡r via Behavior Cloning on ofﬂine transitions (Dh from the human
supervisor, ⇡h). Then, ⇡r collects an initial ofﬂine dataset Dr from the resulting ⇡r, initializes ˆQ⇡rφ,G
by optimizing Equation (5) on Dr [Dh, and initializes parameters βh, βr, δh, and δr as in Section 4.4.We then collect data for N episodes, each with up to T timesteps. In each timestep of each episode, we
determine whether robot policy ⇡r or human supervisor ⇡h should be in control using the procedure
in Section 4.3. Transitions in autonomous mode are aggregated into Dr while transitions in supervisor
mode are aggregated into Dh. After each episode, ⇡r is updated via supervised learning on Dh, andˆQ⇡r       is then updated on Dr [ Dh to reﬂect the probability of task success of the updated ⇡r.  φ,G
5  Experiments
In the following experiments, we study whether ThriftyDAgger can balance task performance and
supervisor burden more effectively than prior IL algorithms in three contexts: (1) training a simulated
robot to perform a peg insertion task (Section 5.3); (2) supervising a ﬂeet of three simulated robots
to perform the peg insertion task in a human user study (Section 5.4); and (3) training a physical
surgical robot to perform a cable routing task (Section 5.5). In the supplementary material, we also
include results from an additional simulation experiment on a challenging block stacking task.

                                       5

## PDF 第 6 页

5.1  Evaluation Metrics
We consider ThriftyDAgger’s performance during training and execution. For the latter, we evaluate
both the (1) autonomous success rate, or success rate when deployed after training without access
to a human supervisor, and (2) intervention-aided success rate, or success rate when deployed after
training with a human supervisor in the loop. These metrics are reported in the Peg Insertion study
(Section 5.3) and the Physical Cable Routing study (Section 5.5). For all experiments, during both
training and intervention-aided execution, we evaluate the number of interventions, human actions,
and robot actions per episode. These metrics are computed over successful episodes only to prevent
biasing the metrics by the maximum episode horizon length T; such bias occurs, for instance, when
less successful policies appear to take more actions due to hitting the time boundary more often.
Additional metrics including cumulative statistics across all episodes are reported in the supplement.
In our user study (Section 5.4), we also report the following quantities: throughput (total number of
task successes across the three robots), performance on an independent human task, the idle time of
the robots in the ﬂeet, and users’ qualitative ratings of mental load and frustration. By comparing
the amount of human supervision and success rates across different algorithms, we are interested in
evaluating how effectively each algorithm balances supervision with policy performance.

5.2  Comparisons
We compare ThriftyDAgger to the following algorithms: Behavior Cloning, which does not use inter-
ventions; HG-DAgger [15], which is human-gated and always requires supervision; SafeDAgger [19],
which is robot-gated and performs interventions based on estimated action discrepancy between
the human supervisor and robot policy; and LazyDAgger [18], which builds on SafeDAgger by
introducing asymmetric switching criteria to encourage lengthier interventions. We also implement
two ablations: one that does not use a novelty measure to regulate context switches (ThriftyDAgger
(-Novelty)) and one that does not use risk to regulate context switches (ThriftyDAgger (-Risk)).

5.3  Peg Insertion in Simulation
We ﬁrst evaluate ThriftyDAgger on a long-horizon (100+ timesteps) peg insertion task (Figure 2)
from the Robosuite simulation environment [48]. The goal is to grasp a ring in a random initial
pose and thread it over a cylinder at a ﬁxed target location. This task has two bottlenecks which
motivate learning from interventions: (1) correctly grasping the ring and (2) correctly placing it over
the cylinder. A human teleoperates the robot through a keyboard interface to provide interventions.
The states consist of the robot’s joint angles and ring’s pose, while the actions specify 3D translation,
rotation, and opening or closing the gripper. For ThriftyDAgger and its ablations, we use target
intervention frequency ↵h = 0.01 (Section 4.4). We collect 30 ofﬂine task demos (2,687 state-action
pairs) from a human supervisor to initialize the robot policy for all compared algorithms. Behavior
Cloning is given additional state-action pairs roughly equivalent to the average amount of supervisor
actions solicited by the interactive algorithms (Table 4 in the appendix). For ThriftyDAgger and
each interactive IL baseline, we perform 10,000 environment steps, during which each episode takes
at most 175 timesteps and system control switches between the human and robot. Hyperparameter
settings for all algorithms are detailed in the supplement.
Results (Table 1) suggest that ThriftyDAgger simultaneously solicits fewer interventions and achieves
a signiﬁcantly higher autonomous success rate than prior robot-gated algorithms, although it does
request more human actions due to its conservative exit criterion for interventions (Cede(st, δr, βr)).
The number of human actions falls signiﬁcantly at execution time (Table 1), when the robot policy
has been trained on online data and is therefore less risky. We ﬁnd that all interactive IL algorithms
substantially outperform Behavior Cloning, which does not have access to supervisor interventions.
Notably, ThriftyDAgger achieves a higher autonomous success rate than even HG-DAgger, in
which the supervisor is able to decide the timing and length of interventions. This indicates that
ThriftyDAgger’s intervention criteria enable it to autonomously solicit interventions as informative as
those chosen by a human supervisor with expert knowledge of the task. Furthermore, ThriftyDAgger
achieves a 100% intervention-aided success rate at execution time, suggesting that ThriftyDAgger
successfully identiﬁes the required states at which to solicit interventions. We ﬁnd that both ablations
of ThriftyDAgger (Ours (-Novelty) and Ours (-Risk)) achieve signiﬁcantly lower autonomous success
rates, indicating that both the novelty and risk measures are critical to ThriftyDAgger’s performance.
We calculate ThriftyDAgger’s context switching rate to be 1.15% novelty switches and 0.79% risk
switches, both approximately within the budget of ↵h = 0.01.

                                       6

## PDF 第 7 页

Figure 2: Experimental Domains: We visualize the peg insertion simulation domain (top row) and the cable
routing domain with the physical robot (bottom row). We visualize sample start and goal states, in addition to
states which ThriftyDAgger categorizes as novel, risky, or neither. ThriftyDAgger marks states as novel if they
are far from states that the supervisor visited and risky if the robot is stuck in a bottleneck, e.g. if the ring is
wedged against the side of the cylinder (top) or the cable is near all four obstacles (bottom).
Table 1: Peg Insertion in Simulation Results: We ﬁrst report training performance (number of interventions
(Ints), number of human actions (Acts (H)), and number of robot actions (Acts (R))) and report the success rate
of the fully-trained policy at execution time when no interventions are allowed (Auto Succ.). We then evaluate
the fully-trained policies with interventions allowed and report the same intervention statistics and the success
rate (Int-Aided Succ.). We ﬁnd that ThriftyDAgger achieves the highest autonomous and intervention-aided
success rates among all algorithms compared. Notably, ThriftyDAgger even achieves a higher autonomous
success rate than HG-DAgger, in which the human decides when to intervene during training.
      Algorithm                   Training Interventions            Auto Succ.            Execution Interventions             Int-Aided Succ.
                                  Ints        Acts (H)      Acts (R)                           Ints        Acts (H)      Acts (R)
                                                   108.0  Behavior          Cloning                         N/A                                   N/A
                         3.89   1.44                                        19.8                                                 9.9                                                     88.8 ± 15.919.4      24/10024/100    4.00   1.37N/A    19.5 N/A5.3    77.5   11.7N/A           17/20N/A SafeDAgger
 LazyDAgger            1.46 ± 1.15   13.2 ±12.4   102.1 ± 18.2      48/100    1.73 ± 1.29   12.6 ±14.4    91.7 ± 24.0           11/20
 HG-DAgger            1.49 ± 0.88   20.3 ± 15.6    97.1 ± 17.5      57/100    1.15 ± 0.73   17.1 ± 11.6   103.6 ± 14.0         20/20
 Ours (-Novelty)       0.79 ±0.81   35.1 ± 23.1    70.0 ± 35.8      49/100   0.33 ±0.62     2.5±  5.0   114.0 ± 26.0           12/20
 Ours (-Risk)            0.99± 0.96    7.8 ± 12.0   104.2 ± 19.2      49/100    1.39± 0.95    9.8 ±12.0   109.1 ± 22.9           18/20
  Ours: ThriftyDAgger    0.88 ± 1.01   43.6 ± 24.5    60.0 ± 32.8     73/100    1.35 ± 0.66   21.3 ± 15.0    84.8 ± 21.8         20/20                 ±       ±       ±               ±       ±       ±
5.4  User Study: Controlling A Fleet of Three Robots in Simulation

We conduct a user study with 10 participants (7 male and 3 female, aged 18-37). Participants supervise
a ﬂeet of three simulated robots, each performing the peg insertion task from Section 5.3. We evaluate
how different interactive IL algorithms affect the participants’ (1) ability to provide effective robot
interventions, (2) performance on a distractor task performed between robot interventions, and (3)
levels of mental demand and frustration. For the distractor task, we use the game Concentration (also
known as Memory or Matching Pairs), in which participants identify as many pairs of matching cards
as possible among a set of face-down cards. This is intended to emulate tasks which require continual
focus, such as cooking a meal or writing a research paper, in which frequent context switches between
performing the task and helping the robots is frustrating and degrades performance.
The participants teleoperate the robots using three robot-gated interactive IL algorithms: SafeDAgger,
LazyDAgger, and ThriftyDAgger. The participant is instructed to make progress on the distractor
task only when no robot requests an intervention. When an intervention is requested, the participant
is instructed to pause the distractor task, provide an intervention from the requested state until the
robot (or multiple robots queued after each other) no longer requires assistance, and then return to the
distractor task. The participants also teleoperate with HG-DAgger, where they no longer perform the
distractor task and are instructed to continually monitor all three robots simultaneously and decide on
the length and timing of interventions themselves. Each algorithm runs for 350 timesteps, where in
each timestep, all robots in autonomous mode execute one action and the human executes one action
on the currently supervised robot (if applicable). The supplement illustrates the user study interface
and fully details the experiment protocol. All algorithms are initialized as in Section 5.3.
Results (Table 2) suggest that ThriftyDAgger achieves signiﬁcantly higher throughput than all prior
algorithms while requiring fewer interventions and fewer human actions, indicating that ThriftyDAg-
ger requests interventions more judiciously than prior algorithms. Furthermore, ThriftyDAgger also
enables a lower mean idle time for robots and higher performance on the distractor task. Notably,
ThriftyDAgger solicits fewer interventions and total actions while achieving a higher throughput than
HG-DAgger, in which the participant chooses when to intervene. We also report metrics of users’

                                       7

## PDF 第 8 页

Table 2: Three-Robot Fleet Control User Study Results:  Results for experiments with 10 human subjects
and 3 simulated robots on the peg insertion task. We report the total numbers of interventions, human actions,
and robot actions, as well as the throughput, or total task successes achieved across robots, for all algorithms.
Additionally, for robot-gated algorithms, we report the Concentration score (number of pairs found) and the
mean idle time of robots in the ﬂeet in timesteps. Results suggest that ThriftyDAgger outperforms all prior
algorithms across all metrics, requesting fewer interventions and total human actions while achieving higher
throughput, lowering the robots’ mean idle time, and enabling higher performance on the Concentration task.
  Algorithm              Interventions  Human Actions  Robot Actions   Concentration Pairs   Throughput  Mean Idle Time
 HG-DAgger             10.6 ± 2.5     198.0 ± 32.1    834.4 ± 38.1             N/A     5.1 ± 1.9          N/A
 SafeDAgger             22.1 ± 4.8     234.1 ± 31.8    700.7 ± 70.4           17.7 ± 8.2     3.0 ± 2.4      38.4 ± 14.1 LazyDAgger                          10.0
  Ours: ThriftyDAgger                         7.9 ± 2.12.1   179.4219.5 ±34.943.3    719.2793.2 ± 89.786.6         33.020.9 ± 8.57.9    9.25.1 ± 2.01.7     25.837.1 ±19.320.5                 ±        ±        ±           ±       ±        ±

Table 3: Physical Cable Routing Results: We ﬁrst report intervention statistics during training (number of
interventions (Ints), number of human actions (Acts (H)), and number of robot actions (Acts (R))) and report the
success rate of the fully-trained policy at execution time when no interventions are allowed (Auto Succ.). We
then evaluate the fully-trained policies with interventions allowed and report the same intervention statistics
and the success rate (Int-Aided Succ.). We ﬁnd that ThriftyDAgger achieves the highest autonomous and
intervention-aided success rates among all algorithms compared. Notably, ThriftyDAgger achieves a comparable
autonomous success rate to HG-DAgger, in which the human decides when to intervene during training.
      Algorithm                  Training Interventions           Auto Succ.          Execution Interventions           Int-Aided Succ.
                                  Ints        Acts (H)      Acts (R)                           Ints       Acts (H)    Acts (R)
  Behavior Cloning           N/A       N/A       N/A        0/15         N/A      N/A       N/A           N/A
 HG-DAgger
                         1.55 ±1.141.16   13.915.2 ± 10.912.4   55.545.5 ± 10.918.3      12/1510/15   0.400.40± 0.490.71   2.71.5 ± 3.53.1   73.961.3 ± 7.96.5         15/1515/15  Ours: ThriftyDAgger   1.42                 ±       ±       ±               ±      ±      ±
mental workload and frustration using the NASA-TLX scale [49] in the supplement. Results suggest
that users experience lower degrees of frustration and mental load when interacting with ThriftyDAg-
ger and LazyDAgger compared to HG-DAgger and SafeDAgger. We hypothesize that participants
struggle with HG-DAgger due to the difﬁcultly of monitoring multiple robots simultaneously, while
SafeDAgger’s frequent context switches lead to user frustration during experiments.

5.5  Physical Experiment: Visuomotor Cable Routing
Finally, we evaluate ThriftyDAgger on a long-horizon cable routing task with a da Vinci surgical
robot [50]. Here, the objective is to route a red cable into a Figure-8 pattern around 4 pegs via
teleoperation with the robot’s master controllers (see supplement). The algorithm only observes
high-dimensional 64 ⇥64 ⇥3 RGB images of the workspace and generates continuous actionsrepresenting delta-positions in (x, y). As in Section 5.3, ThriftyDAgger uses a target intervention
frequency of ↵h = 0.01. We collect 25 ofﬂine task demonstrations (1,381 state-action pairs) from a
human supervisor to initialize the robot policy for ThriftyDAgger and all comparisons. We perform
1,500 environment steps, where each episode has at most 100 timesteps and system control can switch
between the human and robot. The supplement details the hyperparameter settings for all algorithms.
Results (Table 3) suggest that both ThriftyDAgger and HG-DAgger achieve a signiﬁcantly higher au-
tonomous success rate than Behavior Cloning, which is never able to complete the task. Furthermore,
ThriftyDAgger achieves a comparable autonomous success rate to HG-DAgger while requesting fewer
interventions and a similar number of total human actions. This again suggests that ThriftyDAgger’s
intervention criteria enable it to solicit interventions equally as informative or more informative
than those chosen by a human supervisor.  Finally, at execution time ThriftyDAgger achieves a
100% intervention-aided success rate with minimal supervision, again indicating that ThriftyDAgger
successfully identiﬁes the timing and length of interventions to increase policy reliability.
6  Discussion and Future Work
We present ThriftyDAgger, a scalable robot-gated interactive imitation learning algorithm that
leverages learned estimates of state novelty and risk of task failure to reduce burden on a human
supervisor during training and execution. Experiments suggest that ThriftyDAgger effectively enables
long-horizon robotic manipulation tasks in simulation, on a physical robot, and for a three-robot
ﬂeet while limiting burden on a human supervisor. In future work, we hope to apply ideas from
ThriftyDAgger to interactive reinforcement learning and larger scale ﬂeets of physical robots. We also
hope to study how ThriftyDAgger’s performance varies with the target supervisor burden speciﬁed
via ↵h. In practice, ↵h could even be time-varying: for instance, ↵h may be signiﬁcantly lower at
night, when human operators may have limited availability. Similarly, ↵h may be set to a higher
value during training than at deployment, when the robot policy is typically higher quality.

                                       8

## PDF 第 9 页

Acknowledgments
This research was performed at the AUTOLAB at UC Berkeley in afﬁliation with the Berkeley AI
Research (BAIR) Lab and the CITRIS “People and Robots” (CPAR) Initiative. The authors were
supported in part by the Scalable Collaborative Human-Robot Learning (SCHooL) Project, NSF
National Robotics Initiative Award 1734633, and by donations from Google, Siemens, Amazon
Robotics, Toyota Research Institute, Autodesk, Honda, Intel, and Hewlett-Packard and by equipment
grants from PhotoNeo, NVidia, and Intuitive Surgical. Any opinions, ﬁndings, and conclusions
or recommendations expressed in this material are those of the author(s) and do not necessarily
reﬂect the views of the sponsors. We thank our colleagues who provided helpful feedback, code, and
suggestions, especially Anca Dragan, Vincent Lim, and Zaynah Javed.
References
 [1] B. D. Argall, S. Chernova, M. Veloso, and B. Browning. A survey of robot learning from
     demonstration. Robotics and autonomous systems, 57(5):469–483, 2009.

 [2]  J. A. Bagnell. An invitation to imitation. Technical Report CMU-RI-TR-15-08, Carnegie
     Mellon University, Pittsburgh, PA, 3 2015.

 [3] T. Osa, J. Pajarinen, G. Neumann, J. A. Bagnell, P. Abbeel, and J. Peters. An algorithmic
     perspective on imitation learning. arXiv preprint arXiv:1811.06711, 2018.

 [4] D. A. Pomerleau. Efﬁcient training of artiﬁcial neural networks for autonomous navigation.
     Neural Computation, 3(1), 1991.

 [5] Y. Pan, C.-A. Cheng, K. Saigol, K. Lee, X. Yan, E. Theodorou, and B. Boots. Agile autonomous
     driving using end-to-end deep imitation learning. In Proc. Robotics: Science and Systems (RSS),
     2018.

 [6] F. Codevilla, M. M¨uller, A. L´opez, V. Koltun, and A. Dosovitskiy. End-to-end driving via
     conditional imitation learning.  In 2018 IEEE International Conference on Robotics and
     Automation (ICRA), pages 4693–4700. IEEE, 2018.

 [7] C. Finn, T. Yu, T. Zhang, P. Abbeel, and S. Levine. One-shot visual imitation learning via
     meta-learning. Conf. on Robot Learning (CoRL), 2017.

 [8] B. Fang, S. Jia, D. Guo, M. Xu, S. Wen, and F. Sun. Survey of imitation learning for robotic
     manipulation. International Journal of Intelligent Robotics and Applications, 3(4):362–369,
     2019.

 [9] A. Ganapathi, P. Sundaresan, B. Thananjeyan, A. Balakrishna, D. Seita, J. Grannen, M. Hwang,
     R. Hoque, J. E. Gonzalez, N. Jamali, K. Yamane, S. Iba, and K. Goldberg. Learning Dense
     Visual Correspondences in Simulation to Smooth and Fold Real Fabrics. In Proc. IEEE Int.
     Conf. Robotics and Automation (ICRA), 2021.

[10] P. Sundaresan, P. Grannen, B. Thananjeyan, A. Balakrishna, M. Laskey, K. Stone, J. E. Gonzalez,
     and K. Goldberg. Learning interpretable and transferable rope manipulation policies using depth
     sensing and dense object descriptors. In International Conference on Robotics and Automation
     (ICRA). IEEE, 2020.

[11] O. Kroemer, S. Niekum, and G. Konidaris. A review of robot learning for manipulation:
     Challenges, representations, and algorithms. J. Mach. Learn. Res., 22:30–1, 2021.

[12] S. Ross, G. J. Gordon, and J. A. Bagnell. A reduction of imitation learning and structured
     prediction to no-regret online learning. In International Conference on Artiﬁcial Intelligence
    and Statistics (AISTATS), 2011.

[13] M. Laskey, J. Lee, R. Fox, A. Dragan, and K. Goldberg. DART: Noise injection for robust
     imitation learning. In Conf. on Robot Learning (CoRL), 2017.

[14] A. Irpan. Deep reinforcement learning doesn’t work yet. https://www.alexirpan.com/
    2018/02/14/rl-hard.html, 2018.

                                       9

## PDF 第 10 页

[15] M. Kelly, C. Sidrane, K. Driggs-Campbell, and M. J. Kochenderfer. HG-DAgger: Interactive
     imitation learning with human experts. In Proc. IEEE Int. Conf. Robotics and Automation
     (ICRA), 2019.

[16]  J. Spencer, S. Choudhury, M. Barnes, M. Schmittle, M. Chiang, P. Ramadge, and S. Srinivasa.
     Learning from interventions: Human-robot interaction as both explicit and implicit feedback.
     In Proc. Robotics: Science and Systems (RSS), 2020.

[17] S. Jauhri, C. Celemin, and J. Kober. Interactive imitation learning in state-space. In Conference
    on Robot Learning (CoRL). PMLR, 2020.

[18] R. Hoque, A. Balakrishna, C. Putterman, M. Luo, D. S. Brown, D. Seita, B. Thananjeyan,
     E. Novoseller, and K. Goldberg. LazyDAgger: Reducing context switching in interactive
     imitation learning.  In International Conference on Automation Sciences and Engineering
    (CASE), 2021.

[19]  J. Zhang and K. Cho. Query-efﬁcient imitation learning for end-to-end autonomous driving. In
     Association for the Advancement of Artiﬁcial Intelligence (AAAI), 2017.

[20]  J. W. Crandall, M. A. Goodrich, D. R. Olsen, and C. W. Nielsen. Validating human-robot
     interaction schemes in multitasking environments. IEEE Transactions on Systems, Man, and
     Cybernetics-Part A: Systems and Humans, 35(4):438–449, 2005.

[21]  J. Y. Chen, M. J. Barnes, and M. Harper-Sciarini. Supervisory control of multiple robots:
     Human-performance issues and user-interface design. IEEE Transactions on Systems, Man, and
     Cybernetics, Part C (Applications and Reviews), 41(4):435–454, 2010.

[22] G. Swamy, S. Reddy, S. Levine, and A. D. Dragan. Scaled autonomy: Enabling human operators
     to control robot ﬂeets. In 2020 IEEE International Conference on Robotics and Automation
     (ICRA), pages 5942–5948. IEEE, 2020.

[23] D. Kalashnikov, A. Irpan, P. Pastor, J. Ibarz, A. Herzog, E. Jang, D. Quillen, E. Holly, M. Kalakr-
     ishnan, V. Vanhoucke, and S. Levine. Qt-opt: Scalable deep reinforcement learning for vision-
     based robotic manipulation. Conference on Robot Learning (CoRL), 2018.

[24] A. Mandlekar, D. Xu, R. Mart´ın-Mart´ın, Y. Zhu, L. Fei-Fei, and S. Savarese. Human-in-the-loop
     imitation learning using remote teleoperation, 2020.

[25] M. Laskey, S. Staszak, W. Hsieh, J. Mahler, F. Pokorny, A. Dragan, and K. Goldberg. SHIV:
     Reducing supervisor burden using support vectors for efﬁcient learning from demonstrations in
     high dimensional state spaces. In Proc. IEEE Int. Conf. Robotics and Automation (ICRA), 2016.

[26] K. Menda, K. Driggs-Campbell, and M. J. Kochenderfer. EnsembleDAgger: A Bayesian
    Approach to Safe Imitation Learning. In Proc. IEEE/RSJ Int. Conf. on Intelligent Robots and
     Systems (IROS), 2019.

[27]  J. Ho and S. Ermon. Generative adversarial imitation learning. In Advances in Neural Informa-
      tion Processing Systems, 2016.

[28] S. Arora and P. Doshi. A survey of inverse reinforcement learning: Challenges, methods and
     progress. arXiv preprint arXiv:1806.06877, 2018.

[29] A. J. Ijspeert, J. Nakanishi, H. Hoffmann, P. Pastor, and S. Schaal. Dynamical movement
      primitives: learning attractor models for motor behaviors. Neural computation, 25(2), 2013.

[30] A. Paraschos, C. Daniel, J. R. Peters, and G. Neumann. Probabilistic movement primitives. In
    Advances in neural information processing systems, pages 2616–2624, 2013.

[31] F. Torabi, G. Warnell, and P. Stone. Behavioral cloning from observation. In Proceedings of the
     27th International Joint Conference on Artiﬁcial Intelligence (IJCAI), 7 2018.

[32] F. Codevilla, E. Santana, L. A. M., and A. Gaidon. Exploring the limitations of behavior cloning
      for autonomous driving. International Conference on Computer Vision, 2019.

                                       10

## PDF 第 11 页

[33] P. Abbeel and A. Y. Ng.  Apprenticeship learning via inverse reinforcement learning.  In
     Proceedings of the twenty-ﬁrst international conference on Machine learning, page 1, 2004.

[34] D. S. Brown, W. Goo, and S. Niekum.  Better-than-demonstrator imitation learning via
     automaticaly-ranked demonstrations. In Conference on Robot Learning (CoRL), 2019.

[35] A. Balakrishna*, B. Thananjeyan*, J. Lee, F. Li, A. Zahed, J. E. Gonzalez, and K. Goldberg.
     On-policy robot imitation learning from a converging supervisor. In Conference on Robot
     Learning (CoRL). PMLR, 2019.

[36] K. Judah, A. Fern, and T. Dietterich. Active imitation learning via state queries. In Proceedings
      of the ICML workshop on combining learning strategies to reduce label cost. Citeseer, 2011.

[37] D. Sadigh, A. D. Dragan, S. S. Sastry, and S. A. Seshia. Active preference-based learning of
     reward functions. In Proceedings of Robotics: Science and Systems (RSS), 2017.

[38] P. F. Christiano, J. Leike, T. Brown, M. Martic, S. Legg, and D. Amodei. Deep reinforcement
     learning from human preferences. In Proc. Advances in Neural Information Processing Systems
     (NeurIPS), 2017.

[39] B. Ibarz, J. Leike, T. Pohlen, G. Irving, S. Legg, and D. Amodei. Reward learning from human
     preferences and demonstrations in Atari. In Advances in Neural Information Processing Systems,
     2018.

[40] M. Palan, N. C. Landolﬁ, G. Shevchuk, and D. Sadigh. Learning reward functions by integrating
    human demonstrations and preferences. In Proceedings of Robotics: Science and Systems (RSS),
     2019.

[41] E. Bıyık, M. Palan, N. C. Landolﬁ, D. P. Losey, and D. Sadigh. Asking easy questions: A
     user-friendly approach to active reward learning. arXiv preprint arXiv:1910.04365, 2019.

[42] D. Brown, R. Coleman, R. Srinivasan, and S. Niekum. Safe imitation learning via fast Bayesian
     reward inference from preferences. In International Conference on Machine Learning, pages
    1165–1177. PMLR, 2020.

[43] S. Reddy, A. D. Dragan, and S. Levine. Shared autonomy via deep reinforcement learning.
     Proc. Robotics: Science and Systems (RSS), 2018.

[44] S. Ross and J. A. Bagnell. Reinforcement and imitation learning via interactive no-regret
      learning, 2014.

[45] M. L. Puterman. Markov decision processes: discrete stochastic dynamic programming. John
    Wiley & Sons, 2014.

[46] B. Thananjeyan*, A. Balakrishna*, S. Nair, M. Luo, K. Srinivasan, M. Hwang, and J. E.
     Gonzalez. Recovery rl: Safe reinforcement learning with learned recovery zones. 2020.

[47] B. K. Bose. An adaptive hysteresis-band current control technique of a voltage-fed PWM
      inverter for machine drive system. IEEE Transactions on Industrial Electronics, 37(5), 1990.
     doi:10.1109/41.103436.

[48] Y. Zhu, J. Wong, A. Mandlekar, and R. Mart´ın-Mart´ın. Robosuite: A modular simulation
    framework and benchmark for robot learning. In arXiv preprint arXiv:2009.12293, 2020.

[49] S. G. Hart. NASA-task load index (NASA-TLX); 20 years later. In Proceedings of the human
     factors and ergonomics society annual meeting, volume 50, pages 904–908. Sage publications
    Sage CA: Los Angeles, CA, 2006.

[50] P. Kazanzides, Z. Chen, A. Deguet, G. S. Fischer, R. H. Taylor, and S. P. DiMaio. An open-
     source research kit for the da Vinci® surgical system. In 2014 IEEE international conference
    on robotics and automation (ICRA), pages 6434–6439. IEEE, 2014.

[51] E. Todorov, T. Erez, and Y. Tassa. MuJoCo: A Physics Engine for Model-Based Control. In
     Proc. IEEE/RSJ Int. Conf. on Intelligent Robots and Systems (IROS), 2012.


                                       11
