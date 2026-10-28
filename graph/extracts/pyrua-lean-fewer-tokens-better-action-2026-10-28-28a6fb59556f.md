|       |         |       | Fewer   |         | Tokens,    |        | Better |        | Action:  |       |         |        |
| ----- | ------- | ----- | ------- | ------- | ---------- | ------ | ------ | ------ | -------- | ----- | ------- | ------ |
| GPT-6 | Astra   |       | Robot   |         | Agents     |        | with   | 14%    | Higher   |       | Success | Rate   |
|       |         |       |         | but     | 65%        | Fewer  |        | Tokens |          |       |         |        |
|       | Ruiyang |       | Si1     | Jianxin | Bi1,2      | Shunyu | Yang1  |        | Rui Ni1  | Wenbo | Huang1  |        |
|       | Wang1   |       |         | Jiang1  |            |        | Zhang1 |        |          | Ruan1 |         | Zhang1 |
| Qiang |         |       | Shulong |         | Yintianrun |        |        |        | Feixiang |       | Kewei   |        |
|       |         | Wang3 |         |         | Li4        |        | Feng4  |        | Dong3    |       | Zhou1   |        |
6202 tcO 31  ]VC.sc[  2v93910.0162:viXra Duomin Xiuyu Haiwen Zhen Daquan
1PekingUniversity, 2NationalUniversityofSingapore, 3NVIDIA, 4ImpossibleResearch
Abstract
Vision-languagemodel(VLM)agentscancontrolrobotsthroughvisualfeedbackandactionprimitives,
but repeated LLM calls and redundant observations incur substantial token overhead. We introduce
PyRUA-Lean, aninteractivecode-executionframeworkinwhichtheagentcomposesrobotprimitives,
including vision-language-action (VLA) policies, into Python cells that check and retry locally and
return only the images and state they request. Across 700 simulated task instances from LIBERO-
PRO, RoboTwin 2.0, and RoboCasa365, it raises success from 63.1% to 71.7% over tool calling with
the same GPT-6 Astra planner and primitives, using 49% fewer LLM calls and 65% fewer input
tokens on jointly solved instances. On RoboDojo, without any VLA policy or privileged information,
it reaches 51.6% average success rate (Score 58.2), 19.4 points above the top entry of the public
leaderboard. Based on the PyRUA-Lean framework, we train PyRUA-Lean Coder v0.1-4B, an open
4B model, with GRPO on 45 LIBERO-PRO instances; it improves from 18.8% to 44.1% on unseen
|     | task instances,      |     | surpassing                                | the    | Qwen3.5-27B | base | model. |     |     |     |     |     |
| --- | -------------------- | --- | ----------------------------------------- | ------ | ----------- | ---- | ------ | --- | --- | --- | --- | --- |
|     | ProjectPage:         |     | https://dagroup-pku.github.io/PyRUA-Lean/ |        |             |      |        |     |     |     |     |     |
|     | GitHubRepo:          |     | https://github.com/DAGroup-PKU/PyRUA-Lean |        |             |      |        |     |     |     |     |     |
|     | CorrespondingAuthor: |     |                                           | Daquan | Zhou        |      |        |     |     |     |     |     |
1 Introduction
Vision-languagemodels(VLMs)canperformrobotmanipulationbyinterpretingvisualobservationsandrobot
state, then invoking motion, perception, and grasping primitives, including vision-language-action (VLA)
policies [1, 13, 38, 48]. Their efficiency depends partly on how these primitives are exposed to the planner. In
a tool-calling interface, an operation that depends on a previous tool’s result generally requires another LLM
call. Intermediate results also accumulate in the conversation and are processed again in every later LLM call;
in systems such as RPent [48], motion primitives automatically return multiple camera images at the end
of each step of execution. Tasks requiring repeated localization, motion, and recovery can therefore incur
| substantial | inference |     | overhead, | even | when individual |     | primitives |     | are reliable. |     |     |     |
| ----------- | --------- | --- | --------- | ---- | --------------- | --- | ---------- | --- | ------------- | --- | --- | --- |
Executable code can reduce this overhead. A program can compose primitives, inspect their outputs, and
execute conditional branches or retries before returning control to the LLM. Code-based robot control is well
established: Code as Policies and ProgPrompt generate robot programs from language instructions [17, 36],
1

Fewer tokens, better action
( a )   Su c c e s s  r a t e  ↑ (b)   T o k e n   usage ↓ 65 %   fewer tokens on average
|                 |                     |     |                | LIBERO-PRO |        |            |     |        |     |     |     | R a ti o |
| --------------- | ------------------- | --- | -------------- | ---------- | ------ | ---------- | --- | ------ | --- | --- | --- | -------- |
| 6 3 .1 %  →   7 | 1 .7 %  o v e ra ll |     | O b je c t     |            |        |            |     |        |     |     |     | 1.23M    |
|                 |                     |     | s em a n t i c |            | L I BE | R O -P R O |     | 2 73 k |     |     |     | 4. 5 ×   |
+ 0 . 0  p p
C o m p o s i te 1 0 0 S p a t i a l RC3 6 5  c o m p o s i t e 1.22M 2 . 0 ×
|     | C365 | l on g -h o r | i z o n | s e m a n t ic |              |                |      |      | 603k |     |     |         |
| --- | ---- | ------------- | ------- | -------------- | ------------ | -------------- | ---- | ---- | ---- | --- | --- | ------- |
|     |      | + 5 . 0   p   | p 7 5   | + 2 . 0   p p  |              |                |      | 415k |      |     |     | 1 . 7 × |
|     |      |               |         |                | R o b o      | T w in   2 . 0 |      | 245k |      |     |     |         |
|     | R    |               |         |                |              |                |      | 261k |      |     |     |         |
|     |      |               | 50      |                | RC365 atomic |                | 171k |      |      |     |     | 1.5×    |
Goal
|     |      | Atomic                | 25  | s em a n t ic |     |     |     |      |     | 788k |     |      |
| --- | ---- | --------------------- | --- | ------------- | --- | --- | --- | ---- | --- | ---- | --- | ---- |
|     | mobi | le ,  a rt i c ulated |     | + 6. 0  p p   |     | Avg |     | 276k |     |      |     | 2.9× |
+ 7 . 8   p p
(c) Cost ↓
|     |              |                 |                          |                     |                 | 2.2× cheaper on average |     |       |       |     |       | Ratio      |
| --- | ------------ | --------------- | ------------------------ | ------------------- | --------------- | ----------------------- | --- | ----- | ----- | --- | ----- | ---------- |
|     |              |                 |                          |                     | LIBERO-PRO      |                         |     |       |       |     |       | $2.49 3.1× |
|     | Pick & place |                 |                          | Long                |                 |                         |     | $0.79 |       |     |       |            |
|     | precis       | e  p la c ement |                          | lon g - h o r iz on |                 |                         |     |       |       |     | $2.01 |            |
|     |              | + 7 .1  p p     |                          | + 3 6 .0   p p      | RC365 composite |                         |     |       | $1.25 |     |       | 1.6×       |
|     |              |                 |                          |                     | RoboTwin 2.0    |                         |     |       | $1.00 |     |       | 1.5×       |
|     |              | Ar t            | i c .   &   t o o ls Sta | c k   &   o r der   |                 |                         |     | $0.66 |       |     |       |            |
c o n t a ct - r i c h m u l t i -s te p RC365 atomic $ 0 .62 1.2×
| Tool calling (RPent)     |                               |           |             |               |     |     |     | $0 .5 4 |     |       |     |      |
| ------------------------ | ----------------------------- | --------- | ----------- | ------------- | --- | --- | --- | ------- | --- | ----- | --- | ---- |
|                          |                               |           | + 0 .0  p p | + 4 0 .0  p p |     |     |     |         |     |       |     |      |
| C o d e                  |   (P y R U A - L e a          | n , ours) |             |               |     | Avg |     |         |     | $1.63 |     | 2.2× |
| Costs at list  pri ce s. |  p p : p e rce nta ge   po in | ts .      | RoboTwin    |               |     |     |     | $0.74   |     |       |     |      |
PyRUA-Lean
Python for Lean Robot-Use Agents
|     | State of the art on RoboDojo |     |     |     |     |     | PyRUA-Lean Coder v0.1-4B |     |     |     |     |     |
| --- | ---------------------------- | --- | --- | --- | --- | --- | ------------------------ | --- | --- | --- | --- | --- |
(d) Success rate ↑ 51.6% average, above all 33 board entries (e) Generalization to unseen tasks ↑
18.8% → 44.1% on unseen instances
Generalization
|     | 12 tasks |     |     | +19.4 pp |      |     |     |     |     |     |     |     |
| --- | -------- | --- | --- | -------- | ---- | --- | --- | --- | --- | --- | --- | --- |
|     | +15.3 pp |     |     |          | 100% |     |     |     |     |     |     |     |
51.62
| Open     | 80  | Precision | PyRUA-Lean   |       |     |      |      |      |      | 76.7 |      |      |
| -------- | --- | --------- | ------------ | ----- | --- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 8 tasks  |     | 8 tasks   |              |       |     |      |      |      |      |      |      |      |
| +33.0 pp | 40  | +2.1 pp   | VPP2         |       |     |      |      |      |      |      |      |      |
|          |     |           | 1            | 32.26 |     |      |      | 52.4 | 52.2 |      |      |      |
|          |     |           |              |       |     | 50   |      |      |      |      |      | 44.1 |
|          |     |           | 2PhysicalRSI | 31.38 |     |      | 37.4 |      |      |      |      |      |
|          |     |           | 3 Awomo-0.5  | 29.64 |     | 13.5 |      | 14.0 |      |      | 19.4 | 18.8 |
12.5
| Memory | Long-Horizon |     |               |       |     |     |     |     |     |     |     |     |
| ------ | ------------ | --- | ------------- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
|        |              |     | 4 Simate-beta | 27.96 |     | 0   |     |     |     |     |     |     |
6 tasks 8 tasks LIBERO-PRO RoboTwin 2.0 RC365 atomicRC365 composite All unseen
+7.4 pp +4.6 pp unseen tasks unseen benchmark unseen benchmark unseen benchmark 655 instances
Best board entry PyRUA-Lean (ours) Qwen3.5-4B (base) PyRUA-Lean Coder v0.1-4B (after GRPO)
Figure 1 PyRUA-Lean at a glance. Top, the interface against tool calling with the same GPT-6 Astra planner
and primitives: (a) success rate on all 700 instances, tagged by task property (semantic: perturbed layouts, objects,
goals), RoboTwin 2.0 split by skill from task names; (b, c) input tokens and GPT-6 Astra list-price dollars per solved
episode, on instances both agents solved (Avg: mean over all of them). Bottom left, RoboDojo, (d): success rate per
capability dimension against the best entry of the public leaderboard in each dimension, and the average success rate
of PyRUA-Lean and of the four highest-ranked of the board’s 33 entries. Bottom right, PyRUA-Lean Coder v0.1-4B,
(e): generalization. Qwen3.5-4B is trained with GRPO on 45 LIBERO-PRO task instances only; shown is its success
rateontasksandbenchmarksitneversaw,before(gray)andaftertraining(red). Allunseenpoolsthese655instances.
RC365: RoboCasa365.
while more recent systems incorporate execution feedback or refine programs across trials [10, 20]. Outside
robotics, code-based agent interfaces have shown benefits in task completion and context efficiency [2, 39, 41].
These findings motivate our central question: how can an LLM agent compose robot primitives to reliably
complete tasks while reducing token consumption through selective observation and context management?
We introduce PyRUA-Lean (Python for Lean Robot-Use Agents), an interactive code-execution interface
for feedback-driven primitive composition and selective observation. The agent generates Python programs
that compose robot primitives, check intermediate outcomes, and condition subsequent actions on execution
feedback. Intermediate results remain available in a persistent program state, while only explicitly printed
outputs and requested camera images are returned to the LLM. This allows the agent to handle intermediate
execution steps without additional LLM calls and to control which observations enter its context.
This report studies the interface from three sides (Figure 1). First, we compare it with tool calling under
controlled conditions. PyRUA-Lean builds on RPent’s robot stacks and primitive implementations [48], and
we compare it with RPent’s tool-calling agent under the same GPT-6 Astra planner, frozen VLA policies,
evaluation task instances, and LLM-call budgets, on 700 simulated task instances from LIBERO-PRO,
2

RoboTwin 2.0, and RoboCasa365. Both agents operate without cross-episode memory, and the comparison
evaluates the interfaces as a whole, including their support for control flow, persistent program state, and
observation delivery. Second, we ask how far the interface carries a frozen LLM on a benchmark built for
pretrained robot policies. On RoboDojo [8], we give the same planner a small library of geometric primitives
that we wrote ourselves, and follow the benchmark’s evaluation protocol. The agent uses no VLA policy, no
demonstrations, no fine-tuning, and no privileged information: everything it observes is the RGB observation
that the benchmark sends to every policy. Third, we ask whether a small open model can learn the interface.
Based on the PyRUA-Lean framework, we train Qwen3.5-4B [30] to write the cells itself, using GRPO [35]
with task success as the only reward, and call the resulting planner PyRUA-Lean Coder v0.1-4B.
Our contributions can be summarized as:
• The agent composes robot primitives, VLA
PyRUA-Lean,atoken-efficientcodeinterfaceforrobotagents.
policies included, into Python cells that check outcomes, keep state, and return only the observations they
request. With the same planner and primitives as tool calling, it raises success from 63.1% to 71.7% and,
on jointly solved instances, uses 49% fewer LLM calls and 65% fewer input tokens (Section 3).
• With GPT-6 Astra as the planner, no learned policy acting on
State-of-the-art results on RoboDojo.
the robot, and no privileged information, PyRUA-Lean reaches 51.6% average success rate (Score 58.2),
19.4 points above the top entry of the public leaderboard and 2.3 times the same LLM controlling the
end-effector directly, and is the highest on all five capability dimensions (Section 4).
• UsingthePyRUA-Leanframework,
PyRUA-LeanCoderv0.1-4B,anopenplannertrainedtousetheinterface.
we train Qwen3.5-4B with GRPO on only 45 LIBERO-PRO instances. On tasks and benchmarks it never
saw, its success rate rises from 18.8% to 44.1%, above the Qwen3.5-27B base model; on RoboTwin 2.0 alone,
from 14.0% to 52.4%. We will release the weights (Section 5).
2 Related Work
Language models have been used to select robot skills, interpret execution
LLM-based robot control.
feedback, andgeneratemotioncommands. SayCangroundsskillselectioninlanguageinstructionsandlearned
affordances [1], while Inner Monologue incorporates environment feedback into planning [13]. More recent
systems support finer-grained control: Show-Harness exposes discrete semantic actions to a VLM [9], and
GPT-6 Astra has been evaluated as an embodied policy that generates or corrects robot actions [38]. VLA
models provide learned visuomotor capabilities for language-conditioned control [4, 5, 16, 29]. Harness VLA
integratesfrozenVLApolicieswithanalyticprimitivesthroughRPent,amemory-guidedagentframework[48].
PyRUA-Lean builds on RPent’s robot stacks and primitive implementations, exposing these capabilities
through an interactive Python interface. We compare this interface with RPent’s tool-calling interface using
the same planner and underlying primitives, with cross-episode memory disabled in both agents.
Code as Policies and ProgPrompt generate executable robot programs from
Code-based robot control.
language instructions [17, 36], while VoxPoser generates code that constructs spatial value maps for motion
planning [14]. Subsequent work explores execution feedback and program adaptation. CaP-X benchmarks
coding agents across primitive abstraction levels and single- or multi-turn interaction modes [10], and VLCP
periodically regenerates a control function from updated observations within an episode [23]. Other systems
accumulate reusable capabilities across trials: Voyager develops a code-based skill library in Minecraft [40],
ASPIRE refines robot programs and consolidates experience into reusable skills [20], and RoboRSI converts
established tool-use workflows into executable routines as part of a robot self-improvement system [25]. These
studies establish program synthesis, feedback-driven execution, and skill reuse as complementary approaches
to embodied control. Our focus is the success and inference cost of interactive code execution relative to
tool calling over the same robot primitives, including VLA policies. We evaluate this comparison without
cross-episode skill accumulation, while allowing state and code reuse within each episode.
Researchongeneral-purposeagentsprovidesabroadermotivation
Code-basedinterfacesforefficientagents.
for this comparison. ReAct interleaves reasoning with environment interaction [45], and Toolformer studies
the use of external APIs by language models [34]. CodeAct shows that executable Python can improve agent
performance relative to text or JSON action interfaces [41], while SWE-agent demonstrates the importance of
3

PyRUA-Lean: Primitive Composition with Selective Feedback (c) Example: geometry-aware placement
Tool calling: four LLM calls; perception returns text, each move three images
(a) Tool calling LLM selects the next tool / skill from each updated observation 14back_project 15back_project 16move_to 17release
LLM Agent Images + state Locate the bowl 3 points Sample its base4 points Lower Release done
Selected Robot
| Observe + choose |     |     | Primitive |     | After each motion call | PyRUA-Lean: Single code cell replaces 4 LLM calls |     |     |
| ---------------- | --- | --- | --------- | --- | ---------------------- | ------------------------------------------------- | --- | --- |
Cell 6 | Python execution 6 primitive calls in one LLM call
Observe again; choose the next primitives
Compose | Compute a placement target from geometry
held_at_plate = robo.segment(point=(314, 795))
| (b) PyRUA-Lean |                |                     | Internal checks first + selective visual feedback to LLM |     |                       | p r i n t ( ' b o w l   a b o                                                                                    | v e   p l a t e ' ,   held_at_plate)                       |                       |
| -------------- | -------------- | ------------------- | -------------------------------------------------------- | --- | --------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------- |
|                |                |                     |                                                          |     |                       | a correction = np.array(plate.world_xyz[:2]) - np.array(held_at_plate.world_xyz[:2]) s s e r t   h e l d _ a t _ | p l a t e . f o u n d                                      |                       |
|                |                |                     |                                                          |     |                       | p l a c e _ x y   =   n p . a                                                                                    | r r a y ( r o b o . s t a t e ().eef_pos[:2]) + correction |                       |
|                | Python Runtime |                     |                                                          |     | Illustrative workflow | s u r f a c e _ m a p   =   r                                                                                    | o b o . w o r l d _ m a p ( )                              |                       |
|                |                | Composition by code |                                                          |     |                       | b o w l _ p a t c h   =   s u                                                                                    | r f a c e _ m a p [ 2 9 0 : 3 6 5 , 740:850]               |                       |
|                |                |                     |                                                          |     | pass                  | b o w l _ h e i g h t s   =                                                                                      | b o w l _ p a t c h [ : , : , 2 ]                          |                       |
| LLM Agent      |                |                     |                                                          |     |                       | bowl_heights = bowl_heights[(bowl_heights>1.04) & (bowl_heights<1.17)] b o t t o m _ z   =   f l o a             | t ( n p . q u a n t i l e ( b o w l _ h e i g              | h t s ,   0 . 0 2 ) ) |
Primitive 1 ⋯ Primitive N Check Place p l a c e m e n t _ z   =   p l a t e . w o r l d _ x y z [ 2 ]   +   r o b o . s t a t e ( ) . eef_pos[2] - bottom_z + 0.007
Write / revise print('correction', correction, 'bottom', bottom_z, 'placement z', placement_z)
a code cell fail: retry assert np.linalg.norm(correction)<0.07 and 0.95<placement_z<1.05
Compose | Lower, check, and release within the cell
Local retry: no LLM call or automatic image return lower = robo.move_to([*place_xy, placement_z], gripper=+1, step_clip=0.012, tol=0.005, max_steps=100)
|     |             |     |                             |                            |                                              | p r i n t ( ' l o w e r ' ,   | l o w e r )                              |     |
| --- | ----------- | --- | --------------------------- | -------------------------- | -------------------------------------------- | ----------------------------- | ---------------------------------------- | --- |
|     | Composition |     | P r im i t iv e   c o m p   | o s i ti o n  i n   P y th | o n  w it h   a d d i ti o n a l   h e lper  | i f   l o w e r . r e a c h e | d   a n d   n o t   r o b o . d o n e :  |     |
|     |             |     | fu n ct i o n s   f o r p e | r c e p t io n   a n d  t  | a sk -p r o g r e s s   c h e c k s .        |         p r i n t ( ' r e l e | a s e ' ,   r o b o . r e l e a s e ( )) |     |
print('done', robo.done)
Select | Request an image only if the task is unfinished
|     |     | Robot Primitives                     |     | Selected state + images        |     | if not robo.done:                                                             |     |     |
| --- | --- | ------------------------------------ | --- | ------------------------------ | --- | ----------------------------------------------------------------------------- | --- | --- |
|     |     | motion / perception / VLA            |     | Only if requested; at cell end |     |     robo.show('agentview')                                                    |     |     |
|     |     | Only selected feedback passed to LLM |     |                                |     | Returned at cell end: 5 printed lines; no image in this successful execution. |     |     |
Figure 2 PyRUA-Lean combines primitive composition with selective feedback. (a) The tool-calling agent
invokes robot primitives through tool calls. Operations that depend on preceding results generally require another
LLM call, and motion calls automatically return images and state. (b) PyRUA-Lean instead generates Python cells
that compose robot primitives with helper functions, conditional checks, and local retries. Intermediate execution
stays within the runtime, while explicitly requested images and state messages are recorded and returned at cell end
for replanning. (c) A recorded placement example illustrates both mechanisms: one PyRUA-Lean cell replaces the
baseline’sLLMcalls14–17,reducingfourLLMcallstoone. Thecellcomputesaplacementtargetfromscenegeometry
(compose), conditionally executes lowering and release (compose), and requests an image only if the task remains
unfinished(select). Thissuccessfulexecutionreturnsfiveprintedlinesandnoimage,demonstratinghowprogrammatic
composition and selective feedback reduce repeated LLM calls. Appendix A follows the whole episode.
interface design for software-engineering agents [44]. More recent systems use code to compose tool calls and
process intermediate results outside the model context, reducing the information returned to the LLM [2, 39].
PyRUA-Lean applies these interface principles to robot manipulation, where observations are visual and
primitiveexecutionmayfail. WemeasuretasksuccesstogetherwithLLM-callusage,input-tokenconsumption,
andinferencecost,andanalyzehowprogrammaticcompositionandobservationpassingcontributetothegains.
3 PyRUA-Lean: Primitive Composition with Selective Observation
PyRUA-Lean is an interactive code-execution interface for LLM-based robot agents. It supports two
complementary mechanisms: composing robot primitives into programs that respond to execution feedback,
and controlling which intermediate results and visual observations enter the LLM context. The interface
builds on RPent’s robot stacks and primitive implementations [48], including classical motion and perception
| primitives | and       | learned | VLA policies. |           |       |     |     |     |
| ---------- | --------- | ------- | ------------- | --------- | ----- | --- | --- | --- |
| 3.1 Robot  | Interface |         | and           | Execution | Model |     |     |     |
The robot is exposed as a Python object, robo, whose methods invoke primitives and return structured
results, such as object positions and motion outcomes. The agent receives an API reference (Table 1 lists the
primitives) and interacts with the robot through a python(code) tool. In an LLM call, the model generates a
code cell; the runtime executes it, and the returned feedback informs the next call. GPT-6 Astra writes one
cell per LLM call, but a call may hold several (Section 5.3). A persistent Python namespace retains variables
and helper functions across cells within an episode. Our evaluation uses no cross-episode memory.
An uncaught exception terminates the current cell and returns its traceback to the LLM. Variables assigned
before the exception remain in the persistent namespace, allowing the agent to revise the failed operation in
a subsequent cell. Before each primitive that acts on the robot, the runtime terminates the cell if the task
has already succeeded. An external watchdog enforces the two-hour episode limit by interrupting any active
primitive and stopping the planner. We impose no separate per-cell execution limit; in our setup, the Codex
4

Table1 The two agents’ interfaces: each primitive is an RPent tool for tool calling and a robo method with the same
name and arguments for code, both running RPent’s implementation. Names pooled over the benchmarks.
|     |             |     |          |         | Tool (RPent)                                           |                                    | Code (PyRUA-Lean) |
| --- | ----------- | --- | -------- | ------- | ------------------------------------------------------ | ---------------------------------- | ----------------- |
|     | Primitives, |     | the same | in both |                                                        |                                    |                   |
|     | Armmotion   |     |          |         | move_to,move_pose,move_delta,rotate_wrist,rotate_pitch |                                    |                   |
|     | Gripper     |     |          |         |                                                        | set_gripper,release,scripted_grasp |                   |
|     | VLApolicy   |     |          |         | pi0_pick,pi0_doubled,lingbot_act,rldx_skill,rldx_arm   |                                    |                   |
|     | Mobilebase  |     |          |         |                                                        | navigate_to,move_base              |                   |
Perception segment,back_project,back_project_batch,sample_world_xyz,query_world_map
Observations
|     | State,successflag |     |     | witheverymove,orview_env_state |     |     | robo.state(),robo.done    |
| --- | ----------------- | --- | --- | ------------------------------ | --- | --- | ------------------------- |
|     | Cameraimages      |     |     | threewitheverymove             |     |     | whenthecodecallsrobo.show |
Worldcoordinates throughtheperceptiontools thesame,orrobo.world_map()asonearray
CLI returns a tool-call timeout after 300 s without cancelling the cell, and subsequent cells are queued.
| 3.2 Feedback-Driven |     |     |     | Primitive | Composition |     |     |
| ------------------- | --- | --- | --- | --------- | ----------- | --- | --- |
Each cell can compose multiple primitives and condition subsequent operations on their outcomes. For
example, a program may approach an object, attempt a grasp only if the approach succeeds, and retry or
stop based on the resulting state. These checks and branches execute within the cell without additional LLM
calls. At the end of the cell, the returned feedback allows the LLM to revise subsequent actions, combining
| program-level |     | feedback | with | LLM-level | replanning. |     |     |
| ------------- | --- | -------- | ---- | --------- | ----------- | --- | --- |
Beyond composing primitive calls, programs can task-specific computations and control routines
compose
from existing observations and primitives, as illustrated by the geometric computation in Figure 2(c). For
example, the agent computes the bowl’s base height from a world-coordinate map to determine a placement
target that no individual primitive directly returns. It can also define helper functions for repeated operations,
such as a guarded descent. Computed values and helper functions remain available to later cells through the
| persistent    | namespace. |             |     |     |         |            |     |
| ------------- | ---------- | ----------- | --- | --- | ------- | ---------- | --- |
| 3.3 Selective |            | Observation |     | and | Context | Management |     |
Primitive results remain available in the runtime without being individually added to the LLM conversation.
The agent specifies which feedback to return through explicit output statements and camera requests such as
robo.show. Requested images and state messages are recorded at the points specified in the code and returned
together at the end of the cell. In the episode summarized in Appendix A, cell 5 requests a camera image after
transporting the bowl. The placement cell shown in Figure 2(c) requests an image only if the task remains
| unfinished | and | therefore | returns | no  | images after | successful placement. |     |
| ---------- | --- | --------- | ------- | --- | ------------ | --------------------- | --- |
Programmatic composition reduces the LLM calls needed for dependent operations, while selective feedback
limits the outputs and images added to subsequent prompts. Persistent program state retains intermediate
data outside the conversation. These mechanisms control new context rather than removing existing history:
both agents run in the Codex CLI [26], which keeps the full conversation and compacts it, summarizing its
| earlier        | part, only | when    | it approaches |      | 272k tokens. |     |     |
| -------------- | ---------- | ------- | ------------- | ---- | ------------ | --- | --- |
| 3.4 Evaluation |            | Against |               | Tool | Calling      |     |     |
Our central question is whether an LLM agent can compose robot primitives to improve task completion
while reducing token overhead through programmatic execution and selective feedback. We hold the planner,
the primitives, and the task instances fixed, and evaluate PyRUA-Lean against a tool-calling baseline through
| three hypotheses |     | ( H ): |     |     |     |     |     |
| ---------------- | --- | ------ | --- | --- | --- | --- | --- |
• H1: PyRUA-Lean achieves higher task success than tool calling under equal LLM-call budgets.
• PyRUA-Lean requires fewer LLM calls and input tokens to solve tasks.
H2:
• H3: PyRUA-Lean retains its token efficiency when VLA policies or operating guides are absent.
5

Table 2 Main results. Success rate on all task instances; LLM calls, input tokens and dollars at list prices per
solved episode, on the task instances both agents solved (means). Tool: tool calling (RPent); Code: PyRUA-Lean
(ours). Shaded: code’s gain, in points (∆) or how many times fewer (×). All pools the four benchmark groups, where
LIBERO-PRO’s long episodes dominate the token factor. RC365: RoboCasa365.
Alltaskinstances Persolvedepisode,onthetaskinstancesbothagentssolved
Successrate(%) LLMcalls Tokens Cost($)
Benchmark Tool Code ∆ Tool Code × Tool Code × Tool Code ×
LIBERO-PRO 83.0 94.0 +11.0 21.4 8.4 2.5× 1.23M 273k 4.5× 2.49 0.79 3.1×
RoboTwin2.0 60.0 69.2 +9.2 12.2 8.9 1.4× 415k 245k 1.7× 1.00 0.66 1.5×
RC365atomic 78.9 86.7 +7.8 10.4 5.6 1.8× 261k 171k 1.5× 0.62 0.54 1.2×
RC365composite 34.4 39.4 +5.0 28.4 14.9 1.9× 1.22M 603k 2.0× 2.01 1.25 1.6×
All 63.1 71.7 +8.6 17.0 8.7 2.0× 788k 276k 2.9× 1.63 0.74 2.2×
100
75
50
25
0
100k 1M 10M
)%(
etar
sseccuS
Tool calling (RPent) Code (PyRUA-Lean, ours) budget at which each reaches tool calling's final success rate
LIBERO-PRO RoboTwin 2.0 RC365 atomic RC365 composite
5.6× 4.0× 2.1× 2.9×
564k 3.18M 618k 2.46M 619k 1.32M 1.98M 5.71M
100k 1M 10M 100k 1M 10M 100k 1M 10M
Token budget per episode (log scale)
Figure3 Success rate if every episode were stopped once its token consumption reached the budget on the horizontal
axis. Dashed lines mark the budget at which each agent first reaches tool calling’s final success rate, with its value on
the axis; the large number is their ratio. RC365: RoboCasa365.
We evaluate 40 tasks from LIBERO-PRO’s four perturbed suites [19, 50], 50 dual-arm tasks
Benchmarks.
from RoboTwin 2.0 [7], and 50 tasks from RoboCasa365’s Target50 set [24]. Each task is evaluated at five
environment seeds, with one episode per agent for each task–seed pair, yielding 700 paired task instances and
1,400 episodes. More implementation details can be found in Appendix F.
Both agents use GPT-6 Astra [27] at high reasoning effort through the Codex CLI, with the same
Agents.
robot stacks, primitive implementations, and frozen VLA policies: π on LIBERO-PRO [29], LingBot-VLA
0.5
on RoboTwin 2.0 [42], and RLDX-1 on RoboCasa365 [15]. Both use SAM 3 for segmentation [6]. The baseline
invokes RPent’s primitives through tool calls; PyRUA-Lean composes them through its Python interface.
Both receive the same operating guides where available; RoboCasa365 has none. Both agents operate without
cross-episode memory.
Success rate is measured over all task instances using each benchmark’s success check, with budgets
Metrics.
of 40 LLM calls per episode, or 100 for RoboCasa365 composite tasks, and two hours. These budgets limit
LLM calls, not the number of primitive executions. We compare LLM calls, cumulative input tokens, and
estimated monetary cost on instances solved by both agents, reporting whole-episode means and ratios of
aggregate totals. Counts include post-success LLM calls and cached input tokens. Cost-accounting details
and all-episode costs are reported in Appendix E.
3.5 Task Success and Inference Cost
Table 2 and Figure 1(a–c) show that PyRUA-Lean
Tasksuccessimprovesacrossallbenchmarkgroups.
increases overall success from 63.1% to 71.7%, an improvement of 8.6 percentage points, or approximately
14% relative. The gains are 11.0 points on LIBERO-PRO, 9.2 on RoboTwin 2.0, 7.8 on RoboCasa365 atomic
tasks, and 5.0 on composite tasks. PyRUA-Lean alone solves 96 instances, whereas tool calling alone solves 36.
These results support Hypothesis 1 within the evaluated setting: PyRUA-Lean completes more tasks under
the same LLM-call budget. Figure 4 illustrates a recovery example in which PyRUA-Lean uses geometric
6

|             |     |           |     |       |           |     |     | python(code) thelid’snormal |     |     |     |
| ----------- | --- | --------- | --- | ----- | --------- | --- | --- | --------------------------- | --- | --- | --- |
| Toolcalling |     | Code,ours |     | wrist | Code,ours |     | 24  |                             |     |     |     |
_,singular,vectors=np.linalg.svd(points[best]-center,full_matrices=False)
normal=vectors[-1]
|     |     |     |     |     |     |     | 33  | python(code) thebase,notthegripper,overtheburner |     |     | ✓   |
| --- | --- | --- | --- | --- | --- | --- | --- | ------------------------------------------------ | --- | --- | --- |
base_center=current_knob-actual_normal*height
place_target=np.array(robo.state().eef_pos)+burner-base_center
| call32:givesup |     | call24:fitsaplane |     |     | call33:solved |     |     |     |     |     |     |
| -------------- | --- | ----------------- | --- | --- | ------------- | --- | --- | --- | --- | --- | --- |
Figure4 Only code solved this LIBERO-PRO instance (“turn on the stove and put the moka pot on it”): both agents
dropped the pot, and the code agent fitted a plane to the lid, turned the pot upright and set its base over the burner
| (Appendix | D). |     |     |     |     |     |     |     |     |     |     |
| --------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
computation to reposition a dropped object and complete the task. Appendix D provides further analysis of
| instances | solved | by only | one | agent. |     |     |     |            |                   |            |     |
| --------- | ------ | ------- | --- | ------ | --- | --- | --- | ---------- | ----------------- | ---------- | --- |
|           |        |         |     |        |     |     |     | On jointly | solved instances, | PyRUA-Lean |     |
CompletingthesametasksrequiresfewerLLMcallsandtokens.
reduces mean LLM calls from 17.0 to 8.7 and input tokens from 788k to 276k, corresponding to reductions of
49% and 65%. Estimated cost decreases from $1.63 to $0.74 per episode. The smaller monetary reduction
reflects, in part, caching discounts on the baseline’s repeatedly processed history. These findings support
Hypothesis 2 and show that the higher overall success rate is accompanied by lower inference overhead on
shared successes. The pooled token reduction is influenced strongly by LIBERO-PRO’s longer episodes;
| per-benchmark |     | results | are therefore |     | also reported. |     |     |     |     |     |     |
| ------------- | --- | ------- | ------------- | --- | -------------- | --- | --- | --- | --- | --- | --- |
Figure 3 complements this comparison with retrospective token-budget cutoffs on recorded trajectories. On
LIBERO-PRO, PyRUA-Lean reaches the baseline’s final success rate with 564k tokens per episode, compared
with 3.18M for tool calling. This connects success and efficiency beyond the jointly solved subset, although
| the agents   | were        | not rerun    | with      | these     | token       | budgets    | specified | beforehand. |                           |     |        |
| ------------ | ----------- | ------------ | --------- | --------- | ----------- | ---------- | --------- | ----------- | ------------------------- | --- | ------ |
| Section      | 4 evaluates | the          | interface | on        | a fourth    | benchmark, |           | RoboDojo.   |                           |     |        |
| 3.6 Analysis |             | of LLM       | Calls     | and       | Observation |            | Feedback  |             |                           |     |        |
|              |             |              |           |           |             |            |           |             | LLM calls tokens per call |     |        |
| Fewer LLM    | calls       | account      | for       | most      | of the      | token      | re-       |             |                           |     | tokens |
| duction.     | Figure      | 5 decomposes |           | the token | ratio       | into       | the       |             |                           |     |        |
2.55×
LLM-call ratio and the ratio of average input tokens LIBERO-PRO 4.48×
1.76×
| per LLM       | call. | On LIBERO-PRO, |                | the    | 4.48×  | token       | ra- |              |       |     |       |
| ------------- | ----- | -------------- | -------------- | ------ | ------ | ----------- | --- | ------------ | ----- | --- | ----- |
| tio comprises | 2.55× | fewer          | LLM            | calls  | and    | 1.76× fewer |     |              | 1.37× |     |       |
|               |       |                |                |        |        |             |     | RoboTwin 2.0 |       |     | 1.69× |
| tokens per    | LLM   | call.          | On RoboCasa365 |        | atomic | tasks,      |     |              | 1.23× |     |       |
| PyRUA-Lean’s  |       | LLM            | calls are      | larger | on     | average,    | yet |              |       |     |       |
1.84×
fewer of them still reduce total token usage. Thus, RC365 atomic 1.53×
0.83×
| Hypothesis | 2 is | supported | primarily |     | by reducing |     | the |     |     |     |     |
| ---------- | ---- | --------- | --------- | --- | ----------- | --- | --- | --- | --- | --- | --- |
number of LLM calls, rather than uniformly making 1.90× 2.03×
RC365 composite
| each prompt | smaller. |     |     |     |     |     |     |     | 1.06× |     |     |
| ----------- | -------- | --- | --- | --- | --- | --- | --- | --- | ----- | --- | --- |
Execution traces illustrate how programmatic com- 1× 1.5× 2× 2.5× 3×
| position | enables | this | reduction. | A   | cell | can execute |     |     |     |     |     |
| -------- | ------- | ---- | ---------- | --- | ---- | ----------- | --- | --- | --- | --- | --- |
Times fewer with code
| dependent          | motions, | check     | their | outcomes, |        | and retry |     |                                                   |     |        |          |
| ------------------ | -------- | --------- | ----- | --------- | ------ | --------- | --- | ------------------------------------------------- | --- | ------ | -------- |
|                    |          |           |       |           |        |           |     | Figure5 Token-savingsdecompositiononjointlysolved |     |        |          |
| a primitive        | before   | returning |       | control   | to the | LLM.      | In  |                                                   |     |        |          |
|                    |          |           |       |           |        |           |     | instances. Tool-calling-to-PyRUA-Lean             |     | ratios | quantify |
| the bowl-placement |          | example,  |       | the agent | also   | computes  |     |                                                   |     |        |          |
reductionsinLLMcalls(solid)andtokensperLLMcall
placement geometry directly from observations. These (light); their product gives the total token-reduction
behaviorsaddressthecentralresearchquestionbymov- factor(right). Ratiosbelow1×indicateincreasedusage
by PyRUA-Lean.
| ing intermediate |          | coordination |           | and           | computation | into |     |     |     |     |     |
| ---------------- | -------- | ------------ | --------- | ------------- | ----------- | ---- | --- | --- | --- | --- | --- |
| the execution    | runtime. |              | The token | decomposition |             | is   | an  |     |     |     |     |
accounting analysis, however, and does not independently isolate the causal contribution of each interface
feature.
|           |        |       |     |     |           |     |        | On LIBERO-PRO, | we additionally | modify | the |
| --------- | ------ | ----- | --- | --- | --------- | --- | ------ | -------------- | --------------- | ------ | --- |
| On-demand | images | alone | do  | not | reproduce | the | gains. |                |                 |        |     |
7

Table3 Ablations: the VLA policy, the operating guides or both removed from both agents, on every task instance.
Columns as in Table 2: success rate on all task instances, the other columns on the instances both agents solved in
that setting; each group’s first row is that table’s. RoboCasa365 has no operating guides (–).
Successrate(%) LLMcalls Tokens Cost($)
VLA Guides Tool Code ∆ Tool Code × Tool Code × Tool Code ×
LIBERO-PRO
✓ ✓ 83.0 94.0 +11.0 21.4 8.4 2.5× 1.23M 273k 4.5× 2.49 0.79 3.1×
✓ ✗ 84.0 88.0 +4.0 19.0 9.3 2.0× 901k 286k 3.1× 1.89 0.71 2.6×
✗ ✓ 73.0 80.5 +7.5 22.9 10.9 2.1× 1.34M 355k 3.8× 2.60 0.86 3.0×
✗ ✗ 74.0 82.0 +8.0 20.0 9.8 2.0× 943k 290k 3.2× 2.00 0.75 2.7×
RoboTwin2.0
✓ ✓ 60.0 69.2 +9.2 12.2 8.9 1.4× 415k 245k 1.7× 1.00 0.66 1.5×
✓ ✗ 64.0 66.8 +2.8 11.6 9.1 1.3× 392k 251k 1.6× 0.91 0.64 1.4×
✗ ✓ 42.8 68.8 +26.0 23.1 11.5 2.0× 1.03M 316k 3.2× 1.94 0.85 2.3×
✗ ✗ 60.4 66.4 +6.0 16.9 12.0 1.4× 620k 329k 1.9× 1.29 0.88 1.5×
RoboCasa365atomic
✓ – 78.9 86.7 +7.8 10.4 5.6 1.8× 261k 171k 1.5× 0.62 0.54 1.2×
✗ – 45.6 65.6 +20.0 26.5 18.7 1.4× 760k 627k 1.2× 1.48 1.37 1.1×
RoboCasa365composite
✓ – 34.4 39.4 +5.0 28.4 14.9 1.9× 1.22M 603k 2.0× 2.01 1.25 1.6×
✗ – 7.5 20.0 +12.5 58.5 31.1 1.9× 2.58M 1.14M 2.3× 5.50 3.08 1.8×
tool-calling baseline to return images only on request. As shown in Table 14, success decreases from 83.0% to
68.5%. On the 131 instances solved by all three configurations, the modified baseline makes more LLM calls
and consumes approximately the same total input tokens as the original baseline. This suggests that reducing
automatic visual feedback alone is insufficient: observation requests must be considered together with action
execution and replanning. The experiment does not separately quantify the contribution of selective feedback
within PyRUA-Lean.
3.7 Ablation Studies
We remove VLA policies, operating guides, or both
TokensavingspersistwithoutVLApoliciesorguides.
from each agent on the same task instances (Appendix G); RoboCasa365 has no guides, so only VLA policies
are ablated. Across these settings, PyRUA-Lean maintains higher overall success and lower input-token usage
on jointly solved instances (Table 3), supporting Hypothesis 3. Without VLA policies, it achieves 68.8%
success on RoboTwin 2.0 versus 42.8% for tool calling, with traces showing classical primitives composed into
approach, gripper control, and state checks.
OnRoboTwin2.0withoutVLApolicies,removingguidesincreases
Guidancehasinterface-dependenteffects.
tool-calling success from 42.8% to 60.4%, suggesting that guidance is not uniformly beneficial. Jointly solved
subsets also vary across settings, so their token costs do not isolate component effects on a fixed task subset.
3.8 Failure Cases and Limitations
Of the 96 instances solved only by
Improvedbudgetuseexplainssome,butnotall,additionalsuccesses.
PyRUA-Lean, the baseline exhausts its LLM-call budget in 52 and ends unsuccessfully before exhausting it
in 44. The former cases are consistent with programmatic composition enabling more execution within the
budget. The latter include examples of geometric reasoning and scripted recovery, but also cases where a
VLA succeeds in one run and fails in the other. The success difference therefore cannot be attributed entirely
to better recovery logic.
Gains are smallest on RoboCasa365 atomic tasks,
Efficiencygainsdependontaskstructureandfailures.
where a VLA policy often completes most of the task and the initial prompt accounts for much of the input.
PyRUA-Lean’s larger API description can offset part of the benefit from fewer LLM calls. Including failed
episodes, tool calling uses 1.1× the input tokens of PyRUA-Lean on RoboCasa365 atomic tasks, and the
estimated inference cost of the two agents is about the same (Appendix E). Efficiency on jointly solved
8

instances should therefore be distinguished from the cost of all attempts.
4 PyRUA-Lean on RoboDojo
Section 3 holds the planner and the primitives fixed and varies the interface. This section asks a different
question: how far does the interface carry a frozen LLM on a public benchmark built for pretrained robot
policies? RoboDojo [8] is such a benchmark, with a leaderboard led by VLA and world-action models [33].
Zhang et al. [47] recently showed that GPT-6 Astra, issuing one end-effector target per LLM call from RGB
images, reaches 22.5% average success on it without any robot training, above every pretrained policy listed
at the time but with almost no success where precision is needed. We evaluate the same LLM, on the same
RGB observation, acting through PyRUA-Lean.
4.1 Benchmark and Protocol
RoboDojo’ssimulationtrackhas42tabletoptasksforadual-armARX-X5station,groupedintofivecapability
dimensions: Generalization (12 tasks), Precision (8), Long-Horizon (8), Memory (6), and Open (8). A task is
evaluated on 50 public layouts per evaluation seed, and each seed has its own set of layouts; a Generalization
taskruns25episodesinitsstandardsceneand25withrandomizedroomandtableappearance. Oneevaluation
seed is therefore 2,100 episodes. The benchmark reports the success rate (SR), the percentage of episodes
that meet the task’s full-success criterion, and the Score, the mean process reward times 100, which gives
partial credit for completed stages. As on the leaderboard, a task’s values are averaged within its dimension,
and the Average is the unweighted mean of the five dimension values.
WefollowthisprotocolwithRoboDojo’sevaluationcode(scripts/robodojo.sh eval,commitcb2a37d,withthe
XPolicyLabreleaseitpins[43]). OuragentispackagedasanXPolicyLabpolicy,likeanypolicythebenchmark
evaluates: RoboDojo’s evaluation client runs the simulation, sends observations, executes the returned actions,
and judges success, and it ends an episode as soon as the success check passes or the task’s step limit is
reached. An observation is three RGB images, from a head camera and from a camera on each wrist, and the
joint and end-effector state of the two arms. We compare with the entries of the public leaderboard as of
October 9, 2026. We evaluate on one evaluation seed (seed 0), 2,100 episodes; the configuration with depth of
Section 4.4 was evaluated on three.
4.2 System
One fixed agent runs all tasks. The planner is GPT-6 Astra at high reasoning effort, the model of Section 3
and of [47]; its weights are untouched and it sees no demonstrations. It acts only through python(code), here
in a minimal agent loop of our own around an OpenAI-compatible endpoint instead of the Codex CLI, with a
budget of 100 LLM calls per episode (counted on the calls that run a code cell), images on demand, and no
memory across episodes (settings in Appendix H).
Where Section 3 runs RPent’s primitive implementations, the primitives of the RoboDojo agent
Primitives.
are our own: we wrote the library for the benchmark’s dual-arm station, and Table 4 lists everything in it
that the code can call. There is no pick, place, or grasp primitive: a grasp is a few lines of code that locate an
object, move above it with the measured heading, descend along a line, and close the gripper while checking
the reported width. Without a depth image, locate measures an object from its masks in the cameras that
see it: the fixed head camera bounds its footprint on the table, and a wrist camera that also sees it settles its
height, so a program often moves a wrist camera above an object and measures again before it grasps. We
added a primitive only when a program could not build its function from the others.
Unlike the agents of Section 3, this one has no VLA policy among its primitives, and that is a
NoVLApolicy.
choice. A VLA policy is a stochastic primitive: the same call may succeed in one episode and fail in the next,
and in Section 3 some of the instances that only one agent solved differ only in whether the same VLA call
succeeded (Appendix D). We did not want this variance in the result. (The configuration with depth varies
by a fraction of a point between evaluation seeds, Section 4.4.) The primitives of Table 4 are geometric and
report what they measured or reached, so a program can check every step, and what the result measures is
9

Table4 OurprimitivelibraryforRoboDojo: everythingtheagent’scodecancall. ThereisnoVLApolicyandnopick,
place, or grasp primitive; SAM 3 is the only learned component besides the LLM. Every method works from the RGB
imagesandtherobotstatethatRoboDojo’sevaluationclientsends; nonereadsadepthimageorthesimulator’sstate.
Methodof robo Whatitdoes
Motion move_to(xyz, arm, gripper, pitch, yaw, Drivesonearm’sgrasppointtoapose. Thelibrarysolvesthe
roll, path) inversekinematics;thepathisastraightlineofthegrasppoint
orajoint-spaceswing. Reportswhethertheposewasreached,
orwhichnearbyposesarereachable.
set_gripper(arm, command, opening) Runsafullgripperstroke;reportswhetherthefingersstopped
onsomethingandhowwideitis.
home(arm) Returnsanarmtoitsinitialjointangles.
Perception locate(text, camera) SegmentstheobjectnamedintextwithSAM3inonecamera’s
image,findsitintheothercameras,andmeasuresitin3Dfrom
theseviews: center,top,footprint,andtheheadingforagrasp
acrossitsnarrowside. Reportshowmanycamerasagreed: one
cameracannotmeasureaheight.
segment(text,camera),back_project(row, Themaskofanamedobject;theworldpointatapixel,onthe
col, camera) objectunderitoronthetable.
Observation state(), show(camera), image(camera), End-effectorposes,gripperopeningsandjointangles;attacha
artifact(name),camera_meta(camera) cameraimagetothecell’sfeedback;theimageasanarrayoras
filebytes;acamera’scalibration(awristcamera’sfollowsfrom
itsarm’sstate).
the programs the LLM writes. As in the LLM-as-policy setting of [47], no learned policy acts on the robot;
unlike that setting, our agent has a perception primitive built on a segmentation model [6].
Duringanepisode,everythingtheagentobservesistheobservationthatRoboDojo’s
Noprivilegedinformation.
evaluation client sends to every policy: the three RGB images and the joint and end-effector state. It reads
no depth image and nothing of the simulator’s scene state: it is given no object poses and no description of
the layout, so it measures where things are from the images, with locate. What the library knows in advance
is the station itself, that is, the calibration of its cameras, where its arms stand, and the height of its table,
which are the same in every episode. It also receives no success or progress signal while an episode runs:
unlike the agents of Section 3, which can read the benchmark’s success flag, it has to judge from the images
and the robot state whether the task is done.
ThepromptholdstheAPIreference,operatingnotesonhowthetoolsbehave(frames,reach,howthe
Prompt.
gripper reports a grasp, how to measure an object with the wrist cameras) and on how strictly the benchmark
judges a final scene, and a task card with the task’s name, the instruction the benchmark generates for the
layout, and the first camera images. Beyond that instruction, it contains no description of a task and no
recipe for solving one. The direct-control agent of [47], in contrast, receives for each task a description and its
scoring stages, derived from the benchmark’s wiki.
4.3 Results
Over 2,100 episodes (one evaluation seed), the agent reaches
PyRUA-Leanisaboveeveryentryoftheboard.
anAverageSRof51.6%andaScoreof58.2(Table5); pooledoverallepisodes, itsolves1,061of2,100(50.5%).
The highest-ranked entry of the board, VPP2, has 32.3% and 39.3; PhysicalRSI, the strongest agent entry,
has 31.4% and 36.3. PyRUA-Lean has the highest success rate on all five dimensions (Table 5), and on 22 of
the 42 tasks it is above every entry of the board (Appendix K).
Against GPT-6 Astra controlling the end-effector directly, the Average SR rises
SameLLM,anotherinterface.
from 22.5% to 51.6%, by a factor of 2.3 (Figure 6). The largest differences are where direct control is weakest:
Precision goes from 4.0% to 37.3% and Long-Horizon from 8.3% to 48.0%. PyRUA-Lean is higher on 34 of
the 42 tasks and lower on 2. The two systems share the LLM and the RGB observation and differ in several
things at once: the action interface (programs over primitives against one end-effector target per LLM call),
perception (a segmentation-based locate against the images as the LLM reads them), reasoning effort (high
against medium), and the prompt (tool notes against per-task descriptions). The gap therefore measures the
10

Table5 RoboDojo-Simintheleaderboard’sformat;eachvalueisScore/SR(%). First row: PyRUA-Lean(ours)over
one evaluation seed (2,100 episodes). Other rows: the first ten entries (the tenth is GPT-6 Astra with direct control)
of the public leaderboard [33] as of October 9, 2026, in its order (by Average Score, 33 entries). Gen. is the mean of
the standard and randomized halves; WAM: world-action model. Bold: the highest of a column.
Rank Entry Type Average Gen. Prec. Long-Hor. Memory Open
– PyRUA-Lean(ours,GPT-6Astra) Agent 58.20/51.62 50.65/45.83 47.02/37.25 63.26/48.00 63.00/63.00 67.09/64.00
1 VPP2[12] WAM 39.26/32.26 36.38/29.50 43.03/35.17 56.28/37.00 56.01/55.56 4.61/4.08
2 PhysicalRSI[22] Agent+VLA 36.27/31.38 21.30/15.62 38.05/32.50 46.37/37.33 46.74/46.56 28.88/24.92
3 Awomo-0.5[3] WAM 35.34/29.64 30.31/23.84 39.65/33.50 40.36/26.75 42.27/41.22 24.09/22.92
4 Simate-beta[37] VLA 33.95/27.96 35.09/27.95 34.35/26.92 57.84/43.42 33.33/33.00 9.12/8.50
5 Rex-M1Preview[11] VLA 33.79/27.44 34.05/26.05 32.82/23.83 46.89/33.00 48.53/48.22 6.67/6.08
6 VPP2-Preview[12] WAM 31.40/25.62 31.34/24.62 33.75/25.58 35.31/22.17 50.78/50.33 5.83/5.42
7 InternW0-∆[21] WAM 30.77/23.91 30.09/22.78 31.98/23.25 46.29/29.33 34.67/34.00 10.84/10.17
8 Liber-0Preview[18] VLM+WAM 30.74/25.52 24.99/18.61 38.28/33.17 45.98/33.17 37.77/37.33 6.68/5.33
9 Liber-0Lite[18] WAM 29.24/24.23 25.36/19.11 36.60/31.08 45.50/32.92 35.68/35.44 3.06/2.58
10 GPT-6Astra,directcontrol[47] Agent 28.97/22.48 33.36/30.50 12.65/4.00 21.45/8.25 43.04/38.67 34.36/31.00
80
60
40
20
0
Average Generalization Precision Long-Horizon Memory Open
)%(
etar
sseccuS
VPP2 (highest-ranked board entry) GPT-6 Astra, direct control (same LLM) PyRUA-Lean, GPT-6 Astra (ours)
63 64
56
52
46 48
35 37 37 39 32 30 31 31
22
8
4 4
Figure6 Success rate on RoboDojo, on average and per capability dimension: the highest-ranked entry of the public
board, GPT-6 Astra controlling the end-effector directly [47], and the same LLM acting through PyRUA-Lean (ours,
one evaluation seed).
systems as a whole, not the observation, which is the same.
Whereitfails.
Threetasksaresolvedineveryepisode(stack_blocks,cover_blocks,stack_blocks_by_language),
and six in none (store_laptop_and_headphones, insert_key, make_kong, swap_blocks, press_by_number, store_
tools_in_toolbox). The failures are not spread evenly (Table 6): pretrained policies reach 83–96% on pressing
buttons a given number of times (press_by_number), on a tile game against an opponent (make_kong), and on
building a tower from blocks and boards (build_tower), where our agent is at or near zero. The other tasks
without a success ask for a key to be handed over, inserted and turned, for a button to be pressed after each
move, or for objects to be stored in stands and fitted compartments. Several of these tasks involve contact
whose outcome the agent’s feedback does not report, such as a button press, or fits that are tight relative to
the accuracy of its perception. We have not analyzed these failures episode by episode.
An episode takes 25.7 LLM calls on average, 19.3 when it is solved and 32.2 when it is not; the longest
Cost.
took 76, and no episode ran more than 73 code cells, so none reached the budget of 100. An episode consumes
750k input tokens, cached input included, and 9.0k output tokens, and lasts about 12.7 minutes. At about
$2.4 per episode at our model gateway, the 2,100 episodes of the seed cost about $5,100. At this cost we
evaluated two configurations, this one and the one with depth of Section 4.4, which ran on three seeds; we did
not run the evaluation with a VLA policy added to the primitives.
4.4 The Same Agent with Depth
RoboDojo’s evaluation client can also add a depth image and the matrices of each camera to the observation.
The leaderboard does not admit this depth for agent entries, so the results above do not use it and this
configuration is not compared with the board. With depth, locate measures an object from the depth pixels
under its mask, back_project reads the depth at a pixel, and camera_meta returns the matrices the client sends;
11

Table6 Tasks with the largest differences between PyRUA-Lean and the best entry of the public board on that task
(SR in %; the board gives per-task results for 57 policies and ranks 33). Appendix K has all 42 tasks.
| Task                         |             | Ours Best        | Bestboardentry     |
| ---------------------------- | ----------- | ---------------- | ------------------ |
| Largest margins              | over the    | best board entry |                    |
| imitate_sorting_sequence     |             | 98.0 36.0        | GPT-6Astra(direct) |
| classify_objects_by_language |             | 92.0 30.0        | GPT-6Astra(direct) |
| stack_blocks_by_language     |             | 100.0 40.0       | GPT-6Astra(direct) |
| sort_nesting_dolls_by_size   |             | 74.0 18.7        | VPP2               |
| play_stacking_toy            |             | 66.0 23.3        | VPP2               |
| classify_objects             |             | 98.0 56.0        | GPT-6Astra(direct) |
| Largest deficits             | to the best | board entry      |                    |
| press_by_number              |             | 0.0 96.0         | VPP2               |
|                              |             | 0.0 90.0         | GalaxeaVLA(G0.5)   |
make_kong
| build_tower          |     | 2.0 83.3 | Simate-beta   |
| -------------------- | --- | -------- | ------------- |
| pour_liquid_into_cup |     | 8.0 67.3 | Rex-M1Preview |
| insert_key           |     | 0.0 39.3 | PhysicalRSI   |
| swap_blocks          |     | 0.0 38.7 | Simate-beta   |
Table7 PyRUA-LeanonRoboDojofromRGBimagesalone,andwiththesimulator’sdepthaddedtotheobservation:
each value Score/SR (%), as in Table 5. The configuration with depth was evaluated on three seeds; the standard
deviation over them is the population one, as in RoboDojo’s summary. The configuration with depth is not compared
with the leaderboard.
Observation Episodes Average Gen. Prec. Long-Hor. Memory Open
Thesameevaluationseed
RGB(Section4.3) 2,100 58.20/51.62 50.65/45.83 47.02/37.25 63.26/48.00 63.00/63.00 67.09/64.00
RGBanddepth 2,100 58.59/52.42 49.71/43.83 49.92/41.00 63.02/49.00 64.00/64.00 66.29/64.25
Threeevaluationseeds
RGBanddepth,mean 6,300 58.81/52.91 51.11/45.44 49.78/41.08 64.73/51.75 64.02/64.00 64.39/62.25
standarddeviationovertheseeds 0.15/0.35 1.10/1.23 0.57/0.51 1.39/2.15 0.02/0.00 2.16/2.16
the notes on measuring with the wrist cameras are dropped, and nothing else changes (Appendix I).
Depth helps: on the seed that both configurations ran, it raises the Average SR from 51.6% to 52.4% and the
Score from 58.2 to 58.6, most on Precision (37.3% to 41.0%; Table 7). Over three evaluation seeds (6,300
episodes), the configuration with depth reaches an Average SR of 52.9% and a Score of 58.8. The seeds, which
have different layouts, give 52.4%, 53.2% and 53.1%, a standard deviation of 0.35 points: one seed is a close
estimate of the success rate, and the lead over the leaderboard in Section 4.3 is not an effect of the seed.
5 PyRUA-Lean Coder: Training an Open Model to Use the Interface
Sections 3 and 4 use a frontier LLM behind an API. This section asks whether a small open-weight model can
learn to act through the same interface. We train the planner itself: the LLM that reads the task, writes a
cell, reads its output and the images it asked for, and decides what to do next. The primitives, including the
frozen VLA policies, stay as in Section 3. We call the trained planner .
PyRUA-LeanCoderv0.1-4B
5.1 Training
Model. We start from Qwen3.5-4B [30], an open-weight vision-language model with 4B parameters that
reasons before it answers.
Episodesandreward. A training episode is the interaction of Section 3: the prompt with the API reference,
the operating guides and the task card (instruction, initial robot state, first camera images), followed by
alternating LLM calls (the model reasons, then calls python) and tool results (text, and the images the code
requested). The reward is 1 if the benchmark’s success check passes and 0 otherwise, with no shaping and no
penalty for LLM calls or simulator steps. To keep rollouts short, a training episode is limited to 24 code cells
and 25 minutes, against 40 cells and 90 minutes when the same benchmark is evaluated, and an LLM call to
12

Table8 Successrate(%)ofQwen3.5-4Bbeforeandaftertraining(PyRUA-LeanCoderv0.1-4B),andofQwen3.5-27B,
on the 700 task instances of Section 3, one episode per instance. Training used 45 LIBERO-PRO instances only. Last
row: GPT-6 Astra with PyRUA-Lean from Table 2, with its LIBERO-PRO result split in the same way, run in a
differentagentloop(Section5.2),forreference. Bold: thehighestvalueofacolumnamongthefirstthreerows. RC365:
RoboCasa365.
|     |     | Trainedon  |            | Notseenintraining |       |       |               |
| --- | --- | ---------- | ---------- | ----------------- | ----- | ----- | ------------- |
|     |     | LIBERO-PRO | LIBERO-PRO | RoboTwin2.0       | RC365 | RC365 | Allunseen All |
Planner 45instances othertasks(155) (250) atomic(90) composite(160) (655) (700)
| Qwen3.5-4B             |         | 37.8  | 13.5 | 14.0 | 52.2 | 12.5 | 18.8 20.0 |
| ---------------------- | ------- | ----- | ---- | ---- | ---- | ---- | --------- |
| Qwen3.5-27B            |         | 64.4  | 38.1 | 20.8 | 65.6 | 13.1 | 29.2 31.4 |
| PyRUA-LeanCoderv0.1-4B |         | 71.1  | 37.4 | 52.4 | 76.7 | 19.4 | 44.1 45.9 |
| GPT-6Astra(Section3)   |         | 100.0 | 92.3 | 69.2 | 86.7 | 39.4 | 69.8 71.7 |
| 4,096 new              | tokens. |       |      |      |      |      |           |
Traininginstances. We train on 45 LIBERO-PRO task instances: three tasks from each of the goal, spatial,
and object suites at five seeds. The other 31 LIBERO-PRO tasks, among them the whole long-horizon suite,
| and all of | RoboTwin 2.0 | and RoboCasa365 | are never | used. |     |     |     |
| ---------- | ------------ | --------------- | --------- | ----- | --- | --- | --- |
We use group relative policy optimization (GRPO) [35], a reinforcement-learning algorithm. In
Algorithm.
each iteration, 16 instances are drawn and the current model plays each of them 8 times, 128 episodes in
all. An episode’s advantage is its reward normalized within its group of 8, and the clipped policy-gradient
loss (clip range 0.2 below and 0.28 above, as in [46]) is applied to every token the model generated in the
episode, reasoning and code alike. An iteration makes two optimizer steps of 64 episodes each, with Adam
at a constant learning rate of 10−6 and without a KL or an entropy term. The model is fine-tuned in full,
without adapters, starting from the base weights: there is no supervised stage and no demonstration data. A
group that loses an episode to an infrastructure failure is dropped and sampled again. Training runs for 30
iterations, that is 3,840 episodes and 60 optimizer steps, and the checkpoint after the last iteration is the one
| we evaluate | and will release | (Appendix | J lists all settings). |     |     |     |     |
| ----------- | ---------------- | --------- | ---------------------- | --- | --- | --- | --- |
Training uses the miles framework [32] with SGLang [49] serving the rollouts, on one node
Infrastructure.
with eight GPUs; the simulators and the frozen VLA and SAM 3 services run next to it. The run takes about
twelve hours.
| 5.2 Evaluation | Protocol |     |     |     |     |     |     |
| -------------- | -------- | --- | --- | --- | --- | --- | --- |
We evaluate on the 700 task instances of Section 3, one episode per instance, with that section’s prompt,
tools, primitives, frozen VLA policies and budgets. A budget counts the code cells of an episode, 40 or,
on RoboCasa365 composite tasks, 100; GPT-6 Astra writes one cell per LLM call, which makes it the
LLM-call budget of Section 3. The runs differ from Section 3’s GPT-6 Astra runs in the agent loop, which
is PyRUA-Lean’s own instead of the Codex CLI and requires a tool call in every LLM call; in the context,
which is 65,536 tokens (an episode that exceeds it ends there); and in the wall-clock limit, which is 90 minutes.
However an episode ends, the benchmark’s success check decides whether it is solved. Sampling follows the
model card’s settings for reasoning (temperature 1.0, top-p 0.95, top-k 20), with at most 8,192 new tokens per
LLM call. The base model, the trained model and Qwen3.5-27B [31] are evaluated identically.
LIBERO-PRO’s 200 instances contain the 45 training instances, so we report them separately from the 155
instances of tasks the model was not trained on. Together with RoboTwin 2.0 and RoboCasa365, these give
655 instances that training never saw. An instance whose episode failed on infrastructure is run again and
| does not | count until it | has a result. |     |     |     |     |     |
| -------- | -------------- | ------------- | --- | --- | --- | --- | --- |
5.3 Results
GRPOon45instancesliftsthe4Bmodeloneverybenchmark. On the training instances, Qwen3.5-4B goes
from 37.8% to 71.1% (Table 8). On LIBERO-PRO tasks it was not trained on, it goes from 13.5% to 37.4%;
on RoboTwin 2.0 from 14.0% to 52.4%; on RoboCasa365 atomic tasks from 52.2% to 76.7%; and on composite
tasks from 12.5% to 19.4%. Over all instances not seen in training, the success rate rises from 18.8% to 44.1%
13

Table9 How episodes run and end, on the instances not seen in training (means, except code cells per LLM call,
a median). Code cells counts the cells a model wrote, including those refused once its budget was spent. Images
requested leaves out the two or three pictures of the task card, which every episode starts with. Gave up: the model
ended the episode itself without success; Cell budget, Wall clock, Context overflow: the episode was stopped at that
limit without success. Every episode is in exactly one of the five columns on the right. An episode that reached a limit
with its task already complete counts as solved (three episodes of Qwen3.5-4B and one episode of Qwen3.5-27B).
|             |     |     |     |                  | Perepisode |          |           |      | Howtheepisodeended(%) |           |       |          |
| ----------- | --- | --- | --- | ---------------- | ---------- | -------- | --------- | ---- | --------------------- | --------- | ----- | -------- |
|             |     |     |     | LLM Codecellsper |            | Code     | Images    |      | Gave                  | Cell      | Wall  | Context  |
| Planner     |     |     |     |                  |            |          |           |      | Solved                |           |       |          |
|             |     |     |     | calls            | LLMcall    | cells    | requested |      |                       | up budget | clock | overflow |
| Qwen3.5-4B  |     |     |     | 9.4              |            | 9.0 89.4 |           | 19.3 | 18.8                  | 6.9 52.7  |       | 2.4 19.2 |
| Qwen3.5-27B |     |     |     | 35.5             |            | 1.0 34.9 |           | 22.5 | 29.2                  | 4.6 35.0  |       | 0.3 31.0 |
PyRUA-LeanCoderv0.1-4B 21.1 1.0 21.0 0.8 44.1 25.2 10.5 16.8 3.4
1.0
stuollor eht fo etar sseccuS
0.8
0.6
0.4
0.2
0.0
|     |     |     |     |     | 5   | 10  | 15 20 | 25  | 30  |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- |
GRPO iteration (128 episodes each)
Figure7 Training of PyRUA-Lean Coder v0.1-4B: success rate of the rollouts in each GRPO iteration (16 training
| instances | × 8 episodes, | under | the | training | limit of 24 | code cells). |     |     |     |     |     |     |
| --------- | ------------- | ----- | --- | -------- | ----------- | ------------ | --- | --- | --- | --- | --- | --- |
(Figure 1(e)). The trained 4B model is thereby above Qwen3.5-27B, which reaches 29.2% on these instances
| under the | same      | protocol. |             |     |             |     |           |          |     |          |          |           |
| --------- | --------- | --------- | ----------- | --- | ----------- | --- | --------- | -------- | --- | -------- | -------- | --------- |
|           |           |           |             |     |             |     |           | RoboTwin |     | 2.0 is a | dual-arm | benchmark |
| The gain  | transfers | across    | simulators, |     | robots, and | VLA | policies. |          |     |          |          |           |
in another simulator, with LingBot-VLA as its policy primitive; RoboCasa365 has a mobile manipulator
in kitchens, with RLDX-1. Neither appears in training, which saw one single-arm robot and π on nine
0.5
tabletop tasks. The transfer is therefore not explained by seeing the evaluation tasks, scenes, or robots.
Whatchangesishowthemodelusestheinterface. Table 9 shows the three models on the unseen instances.
The base model writes 9.0 code cells per LLM call (median over its episodes; more than 1.5 in 89% of them):
it commits a batch of actions before seeing the result of the first. Its episodes last 9.4 LLM calls on average;
52.7% of them end on the budget of code cells and 19.2% on a context overflow. Qwen3.5-27B writes one
cell per LLM call, but it requests 22.5 images per episode and ends 35.0% of its episodes on the cell budget
and 31.0% on a context overflow. After training, the 4B model writes one cell per LLM call and reads its
result before the next. It requests 0.8 images per episode instead of 19.3, and endings on the cell budget
and on a context overflow fall to 10.5% and 3.4%. In exchange, more episodes end because the model gives
up (25.2%) or runs into the wall clock (16.8%). This is the feedback-driven use of the interface described in
Section 3.2, which the frontier model shows without training; it would also explain why a gain learned on nine
tasks carries over to other benchmarks. We do not claim that training improved manipulation skill as such:
grasps and motions are still executed by the same primitives and frozen VLA policies.
Trainingdynamics. The success rate of the training rollouts rises from 0.30 in the first iteration to 0.70 over
the last five (Figure 7). These rollouts run on the 45 training instances and under the shorter training limits,
| so they | are not | comparable | with | the evaluation |       | numbers | above. |       |        |                |     |               |
| ------- | ------- | ---------- | ---- | -------------- | ----- | ------- | ------ | ----- | ------ | -------------- | --- | ------------- |
|         |         |            |      | PyRUA-Lean     | Coder | v0.1-4B | solves | 45.9% | of the | 700 instances, |     | against 71.7% |
Distancetothefrontiermodel.
for GPT-6 Astra with the same interface and primitives in Section 3. The two numbers come from different
agentloopsandlimitsandarenotacontrolledcomparison,butthegapislarge. ItissmallestonRoboCasa365
atomic tasks and RoboTwin 2.0 and largest on unseen LIBERO-PRO tasks (Table 8).
14

6 Limitations and Future Work
The comparison of Section 3 is limited to GPT-6 Astra, RPent’s robot stacks
Theinterfacecomparison.
and primitive libraries, and simulation, with one run per agent per task instance. Generalization to other
plannersandprimitiveconfigurations, variabilityacrossrepeatedruns, andphysical-robotperformanceremain
untested. The comparison evaluates the complete interfaces without fully isolating the effects of primitive
composition, persistent state, and selective feedback.
The RoboDojo agent is a system around a frontier LLM behind an API, with a segmentation
RoboDojo.
model, where most leaderboard entries are single pretrained policies, and we have not measured how much of
its margin over direct control comes from the perception primitive and how much from programs. Its failures
concentrate on tasks that involve contact it gets no feedback on, or tight fits, and we have not analyzed them
episode by episode. We left VLA policies out of the agent because of their run-to-run variance (Section 4.2).
An episode costs dollars and minutes, which is why we evaluated only two configurations, with and without
depth, and have not measured what a VLA policy would add as a further primitive.
PyRUA-Lean Coder v0.1-4B is a first version: one model size and one training run, on
PyRUA-LeanCoder.
45 instances of one benchmark and with success as the only reward. What the model demonstrably learned is
to use the interface step by step, and it remains far below the frontier model on the same tasks. We evaluated
it with the primitives and VLA policies of Section 3 only; whether it can drive the VLA-free primitives of
Section 4 is untested.
Futureworkwilladdresstheselimitations,measureexecutionlatencyandrecoveryonphysicalrobots,examine
how primitive granularity and cross-episode reuse of validated routines affect success, inference cost, and
adaptability, and train larger models, on more benchmarks and for longer.
7 Conclusion
We presented PyRUA-Lean, an interactive code-execution interface that composes existing robot primitives,
including VLA policies, and controls which execution feedback enters the LLM context. Across 700 simulated
task instances, PyRUA-Lean outperforms a tool-calling baseline using the same GPT-6 Astra planner and
underlying primitives under equal LLM-call budgets, increasing overall success from 63.1% to 71.7%, and on
instances solved by both agents it uses 49% fewer LLM calls and 65% fewer input tokens. With a handful of
geometric primitives, no learned policy acting on the robot, and no privileged information, the same planner
reaches 51.6% average success rate on RoboDojo, above every entry of the public leaderboard. And the
interface can be learned: GRPO on 45 task instances turns an open 4B model into a planner that solves
44.1% instead of 18.8% of the instances it never trained on, across three benchmarks. These results show the
value of programmatic primitive composition for frontier and small models alike, and motivate further study
of feedback management and of training in robot agents.
15

References
[1] Michael Ahn, Anthony Brohan, Noah Brown, Yevgen Chebotar, Omar Cortes, Byron David, Chelsea Finn,
Chuyuan Fu, et al. Do as I can, not as I say: Grounding language in robotic affordances. In Conference on Robot
| Learning | (CoRL), | 2022. |     |     |
| -------- | ------- | ----- | --- | --- |
[2] Anthropic. Code execution with MCP: Building more efficient agents. Anthropic Engineering Blog, https:
| //www.anthropic.com/engineering/code-execution-with-mcp, |     |     |     | 2025. |
| -------------------------------------------------------- | --- | --- | --- | ----- |
[3] Awomo-WAM Team. Awomo-0.5: World action model pre-trained at scale. https://github.com/Awomo-WestlakeDI/
| Awomo-0.5, | 2026. |     |     |     |
| ---------- | ----- | --- | --- | --- |
[4] Kevin Black, Noah Brown, Danny Driess, Adnan Esmail, Michael Equi, Chelsea Finn, Niccolo Fusai, Lachy
Groom,etal. π : Avision-language-actionflowmodelforgeneralrobotcontrol. InRobotics: Science and Systems
0
(RSS), 2025.
[5] Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, Xi Chen, Krzysztof Choromanski, Tianli
Ding, Danny Driess, et al. RT-2: Vision-language-action models transfer web knowledge to robotic control. In
| Conference | on Robot | Learning | (CoRL), 2023. |     |
| ---------- | -------- | -------- | ------------- | --- |
[6] NicolasCarion,LauraGustafson,Yuan-TingHu,ShoubhikDebnath,RonghangHu,DidacSuris,ChaitanyaRyali,
Kalyan Vasudev Alwala, et al. SAM 3: Segment anything with concepts. arXiv preprint arXiv:2511.16719, 2025.
[7] Tianxing Chen, Zanxin Chen, Baijun Chen, Zijian Cai, Yibin Liu, Zixuan Li, Qiwei Liang, Xianliang Lin, et al.
RoboTwin 2.0: A scalable data generator and benchmark with strong domain randomization for robust bimanual
| robotic | manipulation. | arXiv | preprint arXiv:2506.18088, | 2025. |
| ------- | ------------- | ----- | -------------------------- | ----- |
[8] Tianxing Chen, Yue Chen, Zixuan Li, Junyuan Tang, Kailun Su, Haoran Lu, Weijie Wan, Baijun Chen, Songling
Liu, Haowen Yan, et al. RoboDojo: A unified sim-and-real benchmark for comprehensive evaluation of generalist
| robot manipulation |     | policies. | arXiv preprint arXiv:2607.04434, | 2026. |
| ------------------ | --- | --------- | -------------------------------- | ----- |
[9] Yanzhe Chen, Zechen Bai, Zhijun Cao, Wenzheng Zeng, Kevin Qinghong Lin, Yiqi Lin, Guoqiang Liang,
Kevin Yuchen Ma, et al. Show-Harness: Just a VLM agent can play robots. arXiv preprint arXiv:2609.10522,
2026.
[10] Letian Fu, Justin Yu, Karim El-Refai, Ethan Kou, Haoru Xue, Huang Huang, Wenli Xiao, et al. CaP-X: A
framework for benchmarking and improving coding agents for robot manipulation. In International Conference
| on Machine | Learning | (ICML), | 2026. |     |
| ---------- | -------- | ------- | ----- | --- |
[11] Futian Lab and VisIncept. Rex-M1-preview: Policy adapter for RoboDojo in XPolicyLab.
https://github.com/
| XPolicyLab/XPolicyLab/tree/main/policy/Rex_M1_preview, |     |     |     | 2026. |
| ------------------------------------------------------ | --- | --- | --- | ----- |
[12] YanjiangGuo,HaodongYan,ZhideZhong,ZhongruZhang,QingyuanYang,QingzhouLu,XiaoyuChen,Yen-Jen
Wang, Shuying Deng, Chenghan Yang, Puzhen Yuan, Chenxin Liu, Tun Ban, Xiang Zhu, Yichen Liu, Kun
Feng, Haoang Li, and Jianyu Chen. Video prediction policy 2: Predict better, act better. arXiv preprint
| arXiv:2610.10270, |     | 2026. |     |     |
| ----------------- | --- | ----- | --- | --- |
[13] Wenlong Huang, Fei Xia, Ted Xiao, Harris Chan, Jacky Liang, Pete Florence, Andy Zeng, Jonathan Tompson,
et al. Inner monologue: Embodied reasoning through planning with language models. In Conference on Robot
| Learning | (CoRL), | 2022. |     |     |
| -------- | ------- | ----- | --- | --- |
[14] Wenlong Huang, Chen Wang, Ruohan Zhang, Yunzhu Li, Jiajun Wu, and Li Fei-Fei. VoxPoser: Composable 3D
value maps for robotic manipulation with language models. In Conference on Robot Learning (CoRL), 2023.
[15] Dongyoung Kim, Huiwon Jang, Myungkyu Koo, Suhyeok Jang, Taeyoung Kim, Beomjun Kim, Byungjun Yoon,
Changsung Jang, et al. RLDX-1 technical report. arXiv preprint arXiv:2605.03269, 2026.
[16] Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, Ashwin Balakrishna, Suraj Nair, Rafael Rafailov,
Ethan Foster, et al. OpenVLA: An open-source vision-language-action model. In Conference on Robot Learning
(CoRL), 2024.
[17] Jacky Liang, Wenlong Huang, Fei Xia, Peng Xu, Karol Hausman, Brian Ichter, Pete Florence, and Andy Zeng.
Code as policies: Language model programs for embodied control. In IEEE International Conference on Robotics
| and Automation | (ICRA), | 2023. |     |     |
| -------------- | ------- | ----- | --- | --- |
16

[18] LiberAI. Liber-0 Lite: RoboDojo evaluation checkpoint. https://huggingface.co/LiberAI/Liber0-Lite-Robodojo,
2026.
[19] Bo Liu, Yifeng Zhu, Chongkai Gao, Yihao Feng, Qiang Liu, Yuke Zhu, and Peter Stone. LIBERO: Benchmarking
knowledge transfer for lifelong robot learning. In Advances in Neural Information Processing Systems (NeurIPS),
| Datasets | and | Benchmarks | Track, 2023. |     |     |     |     |
| -------- | --- | ---------- | ------------ | --- | --- | --- | --- |
[20] Runyu Lu, Yubo Wu, Ethan Kou, Letian Fu, Wenli Xiao, Ajay Mandlekar, Yinzhen Xu, Guanya Shi, et al.
ASPIRE: Agentic /skills discovery for robotics. arXiv preprint arXiv:2607.00272, 2026.
[21] Xingyu Miao, Zizun Li, Baole Fang, Kaiwen Song, Tenghui Wang, Hanxue Zhang, Yating Wang, Xudong Li,
Yuping He, Xueyuan Wei, et al. InternW0-∆: A world action model bridging predictive dynamics and actions
| with | 20K+ hours | of open | data. arXiv | preprint arXiv:2609.31394, |     | 2026. |     |
| ---- | ---------- | ------- | ----------- | -------------------------- | --- | ----- | --- |
[22] MMLab & PhysicalRSI contributors. Physical RSI 1.0: Recursive self-harness for scaling embodied skills. Project
website and open-source software, https://mmlab.hk/research/PhysicalRSI, 2026. Preview release.
[23] Dhia Naouali, Minghan Wu, Claudia Wong, Abhinav Puthran, and Omar G. Younis. VLCP: Vision language
control policy closed-loop code replanning for robot manipulation. arXiv preprint arXiv:2608.16978, 2026.
[24] Soroush Nasiriany, Sepehr Nasiriany, Abhiram Maddukuri, and Yuke Zhu. RoboCasa365: A large-scale sim-
ulation framework for training and benchmarking generalist robots. In International Conference on Learning
| Representations |     | (ICLR), | 2026. |     |     |     |     |
| --------------- | --- | ------- | ----- | --- | --- | --- | --- |
[25] NoematrixTeam. RoboRSI:Stable,efficient,andreusablerobotself-evolutionincomplexreal-worldenvironments.
| Blog         | post, https://lab.noematrix.ai/blog/2-roborsi/, |      |                                  |     | 2026. |     |     |
| ------------ | ----------------------------------------------- | ---- | -------------------------------- | --- | ----- | --- | --- |
| [26] OpenAI. | Codex                                           | CLI. | https://github.com/openai/codex, |     | 2025. |     |     |
[27] OpenAI. GPT-6 Astra: A new generation of intelligence. https://openai.com/index/gpt-6-astra/, 2026.
[28] OpenAI. Pricing. OpenAI API documentation, https://developers.openai.com/api/docs/pricing, 2026.
[29] Physical Intelligence, Kevin Black, Noah Brown, James Darpinian, Karan Dhabalia, Danny Driess, Adnan
Esmail, Michael Equi, et al. π 0.5 : a vision-language-action model with open-world generalization. arXiv preprint
| arXiv:2504.16054, |     | 2025. |     |     |     |     |     |
| ----------------- | --- | ----- | --- | --- | --- | --- | --- |
[30] Qwen Team. Qwen3.5-4B model card. https://huggingface.co/Qwen/Qwen3.5-4B, 2026.
[31] Qwen Team. Qwen3.5-27B model card. https://huggingface.co/Qwen/Qwen3.5-27B, 2026.
[32] RadixArk. miles: A reinforcement-learning framework for large language models. https://github.com/radixark/
| miles, | 2026. |     |     |     |     |     |     |
| ------ | ----- | --- | --- | --- | --- | --- | --- |
[33] RoboDojo Team. RoboDojo sim leaderboard. https://robodojo-benchmark.com, 2026. Board dated 2026-10-09,
| accessed | 2026-10-12. |     |     |     |     |     |     |
| -------- | ----------- | --- | --- | --- | --- | --- | --- |
[34] Timo Schick, Jane Dwivedi-Yu, Roberto Dessì, Roberta Raileanu, Maria Lomeli, Luke Zettlemoyer, Nicola
Cancedda, and Thomas Scialom. Toolformer: Language models can teach themselves to use tools. In Advances in
| Neural | Information | Processing | Systems | (NeurIPS), | 2023. |     |     |
| ------ | ----------- | ---------- | ------- | ---------- | ----- | --- | --- |
[35] Zhihong Shao, Peiyi Wang, Qihao Zhu, Runxin Xu, Junxiao Song, Xiao Bi, Haowei Zhang, Mingchuan Zhang,
Y. K. Li, Y. Wu, and Daya Guo. DeepSeekMath: Pushing the limits of mathematical reasoning in open language
| models. | arXiv | preprint | arXiv:2402.03300, | 2024. |     |     |     |
| ------- | ----- | -------- | ----------------- | ----- | --- | --- | --- |
[36] Ishika Singh, Valts Blukis, Arsalan Mousavian, Ankit Goyal, Danfei Xu, Jonathan Tremblay, Dieter Fox, Jesse
Thomason, et al. ProgPrompt: Generating situated robot task plans using large language models. In IEEE
| International |     | Conference | on Robotics | and Automation | (ICRA), | 2023. |     |
| ------------- | --- | ---------- | ----------- | -------------- | ------- | ----- | --- |
[37] SIPAILab. Simate-beta: SIPAI model weights for RoboDojo evaluation. https://huggingface.co/SIPAILab/
| sipai-robodojo-eval-ae, |     |     | 2026. |     |     |     |     |
| ----------------------- | --- | --- | ----- | --- | --- | --- | --- |
[38] Jiayi Su, Yixin Zheng, Mi Yan, Li Yi, Zhizheng Zhang, and He Wang. GPT 6 Astra as an embodied policy.
| Technical | report, | https://anonymous-report-421.github.io/public-website/, |     |     |     |     | 2026. |
| --------- | ------- | ------------------------------------------------------- | --- | --- | --- | --- | ----- |
[39] Kenton Varda and Sunil Pai. Code Mode: the better way to use MCP. Cloudflare Blog, https://blog.cloudflare.
| com/code-mode/, |     | 2025. |     |     |     |     |     |
| --------------- | --- | ----- | --- | --- | --- | --- | --- |
17

[40] GuanzhiWang,YuqiXie,YunfanJiang,AjayMandlekar,ChaoweiXiao,YukeZhu,LinxiFan,andAnimaAnand-
kumar. Voyager: An open-ended embodied agent with large language models. arXiv preprint arXiv:2305.16291,
2023.
[41] Xingyao Wang, Yangyi Chen, Lifan Yuan, Yizhe Zhang, Yunzhu Li, Hao Peng, and Heng Ji. Executable code
actions elicit better LLM agents. In International Conference on Machine Learning (ICML), 2024.
[42] Wei Wu, Fan Lu, Yunnan Wang, Shuai Yang, Shi Liu, Fangjing Wang, Qian Zhu, He Sun, et al. A pragmatic
| VLA foundation |     | model. | arXiv preprint | arXiv:2601.18692, |     | 2026. |     |
| -------------- | --- | ------ | -------------- | ----------------- | --- | ----- | --- |
[43] XPolicyLab Community, Tianxing Chen, Yue Chen, Tian Nian, Zijian Cai, Guangyu Chen, Wenwei Lin, Qiwei
Liang, Zanxin Chen, Peicheng Xiang, et al. XPolicyLab: A unified standard and open ecosystem for robot policy
| evaluation | and deployment. |     | arXiv | preprint arXiv:2608.09892, |     | 2026. |     |
| ---------- | --------------- | --- | ----- | -------------------------- | --- | ----- | --- |
[44] John Yang, Carlos E. Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, and Ofir
Press. SWE-agent: Agent-computer interfaces enable automated software engineering. In Advances in Neural
| Information | Processing |     | Systems (NeurIPS), | 2024. |     |     |     |
| ----------- | ---------- | --- | ------------------ | ----- | --- | --- | --- |
[45] Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, and Yuan Cao. ReAct:
Synergizing reasoning and acting in language models. In International Conference on Learning Representations
(ICLR), 2023.
[46] Qiying Yu, Zheng Zhang, Ruofei Zhu, Yufeng Yuan, Xiaochen Zuo, Yu Yue, Weinan Dai, Tiantian Fan, Gaohong
Liu, Lingjun Liu, et al. DAPO: An open-source LLM reinforcement learning system at scale. arXiv preprint
| arXiv:2503.14476, |     | 2025. |     |     |     |     |     |
| ----------------- | --- | ----- | --- | --- | --- | --- | --- |
[47] Wenbo Zhang, Kaixuan Wang, Yutao Ouyang, Xiaoyu Huang, Liyang Li, Kailun Su, Weiyang Jin, Wenhao Chai,
Haotian Liang, Zhiyang Dou, Yue Chen, and Tianxing Chen. An unexpected robot policy: Early evaluations of
| GPT-6 Astra | on  | RoboDojo | and beyond. | arXiv preprint | arXiv:2609.24170, |     | 2026. |
| ----------- | --- | -------- | ----------- | -------------- | ----------------- | --- | ----- |
[48] Yixian Zhang, Huanming Zhang, Feng Gao, Xiao Li, Zhihao Liu, Yi Nie, Chunyang Zhu, Jiaxing Qiu, et al.
Harness VLA: Steering frozen VLAs into reliable manipulation primitives via memory-guided agents. arXiv
| preprint | arXiv:2607.08448, |     | 2026. |     |     |     |     |
| -------- | ----------------- | --- | ----- | --- | --- | --- | --- |
[49] Lianmin Zheng, Liangsheng Yin, Zhiqiang Xie, Chuyue Sun, Jeff Huang, Cody Hao Yu, Shiyi Cao, Christos
Kozyrakis, Ion Stoica, Joseph E. Gonzalez, Clark Barrett, and Ying Sheng. SGLang: Efficient execution of
| structured | language | model | programs. | arXiv preprint | arXiv:2312.07104, |     | 2023. |
| ---------- | -------- | ----- | --------- | -------------- | ----------------- | --- | ----- |
[50] XueyangZhou,YangmingXu,GuiyaoTie,YongchaoChen,GuowenZhang,DuanfengChu,PanZhou,andLichao
Sun. LIBERO-PRO: Towards robust and fair evaluation of vision-language-action models beyond memorization.
| arXiv preprint | arXiv:2510.03827, |     |     | 2025. |     |     |     |
| -------------- | ----------------- | --- | --- | ----- | --- | --- | --- |
18

Fewer Tokens, Better Action: GPT-6 Astra Robot Agents with 14%
|     |     | Higher | Success |     | Rate | but | 65% | Fewer | Tokens |     |     |     |
| --- | --- | ------ | ------- | --- | ---- | --- | --- | ----- | ------ | --- | --- | --- |
Appendix
| A The | episode | of  | Figure | 2, LLM | call | by LLM | call |     |     |     |     |     |
| ----- | ------- | --- | ------ | ------ | ---- | ------ | ---- | --- | --- | --- | --- | --- |
Figure 2 shows one stretch of an episode. Figure 8 and Table 10 follow the whole episode with each agent: it
is an instance both agents solved, close to the median cost of each on LIBERO-PRO (spatial swap, task 7,
seed 2). The tool-calling agent reads the guides, localizes, and then moves one step per LLM call, getting
three camera images back after every move; it solves the task in LLM call 17, after 33 images in all. The code
agent localizes both objects in its first cell, approaches and grasps in its second, closes the gripper and lifts
the bowl in its third, checks the grasp in its fourth, and carries and places the bowl in its fifth and sixth; it
solves the task in LLM call 6 and asks for 5 images in all. Appendix B follows further episodes in this way,
| and Appendix | C describes |     | what | the code | agent’s | cells do. |     |     |     |     |     |     |
| ------------ | ----------- | --- | ---- | -------- | ------- | --------- | --- | --- | --- | --- | --- | --- |
Task: “Pick the akita black bowl on the stove and place it on the plate”
| Start |     | Tool calling |     |     |      |     |     |       |     |     |       |     |
| ----- | --- | ------------ | --- | --- | ---- | --- | --- | ----- | --- | --- | ----- | --- |
|       |     |              |     | 3 1 | 12 1 | 3 1 | 1 6 | 1 1 1 | 1 1 | 3 4 | 1 1 2 | 1   |
(RPent)
Code, ours
|     |     |     |     | 4 5 | 5 3 | 5 6 |     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
(PyRUA-Lean)
1.00
)M( raf os snekoT
| Solved |     |     | 0.75 |     |     |     |     |     |     |     |     |     |
| ------ | --- | --- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
0.50
Tool calling: 1.04M tokens in 20 LLM calls
0.25
Code: 220k tokens in 8 LLM calls
0.00
|     |     |     |     | 1   |     | 5   |     | 10  |     | 15  |     | 20  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
LLM call
Figure8 The episode of Figure 2, whole. Top: each box is one LLM call; the number is how many tools (tool calling)
orprimitives(code)itcalled,darkboxesreturnedcameraimages,andtheoutlinedboxsolvedthetask. Bottom: token
consumption so far; circles mark the LLM call that solved the task, reached after 816k tokens with tool calling and
156k with code. Left: the agent-view camera at the start and when the task was solved.
Cells 1–6 of the code agent are reproduced exactly as generated by the model.
LLMcall1
print(robo.state())
| bowl = robo.segment('the  |                        | black patterned | bowl  | on the      | stove') |     |     |     |     |     |     |     |
| ------------------------- | ---------------------- | --------------- | ----- | ----------- | ------- | --- | --- | --- | --- | --- | --- | --- |
| plate = robo.segment('the |                        | white plate     | with  | red rings') |         |     |     |     |     |     |     |     |
| print('bowl',             | bowl)                  |                 |       |             |         |     |     |     |     |     |     |     |
| print('plate',            | plate)                 |                 |       |             |         |     |     |     |     |     |     |     |
| print('table',            | robo.back_project(630, |                 | 610)) |             |         |     |     |     |     |     |     |     |
LLMcall2
| assert bowl.found                           | and plate.found |     |     |                    |     |                          |     |             |     |     |     |     |
| ------------------------------------------- | --------------- | --- | --- | ------------------ | --- | ------------------------ | --- | ----------- | --- | --- | --- | --- |
| approach = robo.move_to([bowl.world_xyz[0], |                 |     |     | bowl.world_xyz[1], |     | bowl.world_xyz[2]+0.19], |     | gripper=-1) |     |     |     |     |
| print('approach',                           | approach)       |     |     |                    |     |                          |     |             |     |     |     |     |
if approach.reached:
| pick = robo.pi0_pick('pick |       | up  | the black | bowl on the | stove', | max_chunks=20) |     |     |     |     |     |     |
| -------------------------- | ----- | --- | --------- | ----------- | ------- | -------------- | --- | --- | --- | --- | --- | --- |
| print('pick',              | pick) |     |           |             |         |                |     |     |     |     |     |     |
print(robo.state())
robo.show('agentview')
robo.show('wrist')
19

Table10 The two episodes of Figure 8, LLM call by LLM call: what each call ran, and the token consumption so far.
A check mark is the call that solved the task. Cached input is included, as everywhere.
Call Toolcalling(RPent): toolscalled Tokens Code(PyRUA-Lean): whatthecellran Tokens
1 read_text_file×3 20k 4primitivecalls: back_project,segment, 22k
view_env_state
2 view_env_state;3imagesback 50k 5primitivecalls: move_to,pi0_pick, 44k
view_env_state;showsagentviewandwrist
|     | 3 back_project×12 |     |     |     | 83k 5primitivecalls: | move_to,segment, | 70k |
| --- | ----------------- | --- | --- | --- | -------------------- | ---------------- | --- |
set_gripper,view_env_state
4 move_to;3imagesback 118k 3primitivecalls: segment;showsagentview 96k
andwrist
|     | 5 back_project×3 |     |     |     | 157k 5primitivecalls: | move_to,segment, | 126k |
| --- | ---------------- | --- | --- | --- | --------------------- | ---------------- | ---- |
view_env_state;showsagentview
6 move_to;3imagesback 196k 6primitivecalls: move_to,release,segment, 156k
view_env_state✓
|     | 7 move_to;3imagesback      |     |     |     | 239k finish       |     | 188k |
| --- | -------------------------- | --- | --- | --- | ----------------- | --- | ---- |
|     | 8 back_project×6           |     |     |     | 284k finalmessage |     | 220k |
|     | 9 pi0_pick;3imagesback     |     |     |     | 331k              |     |      |
|     | 10 set_gripper;3imagesback |     |     |     | 382k              |     |      |
|     | 11 move_to;3imagesback     |     |     |     | 435k              |     |      |
|     | 12 move_to;3imagesback     |     |     |     | 492k              |     |      |
|     | 13 move_to;3imagesback     |     |     |     | 553k              |     |      |
|     | 14 back_project×3          |     |     |     | 616k              |     |      |
|     | 15 back_project×4          |     |     |     | 681k              |     |      |
|     | 16 move_to;3imagesback     |     |     |     | 746k              |     |      |
|     | 17 release;3imagesback✓    |     |     |     | 816k              |     |      |
|     | 18 write_text_file×2       |     |     |     | 888k              |     |      |
|     | 19 finish                  |     |     |     | 963k              |     |      |
|     | 20 finalmessage            |     |     |     | 1.04M             |     |      |
LLMcall3
| print(robo.set_gripper(+1, |              | steps=8)) |     |     |     |     |     |
| -------------------------- | ------------ | --------- | --- | --- | --- | --- | --- |
| held_state =               | robo.state() |           |     |     |     |     |     |
print('lift', robo.move_to([held_state.eef_pos[0], held_state.eef_pos[1], 1.18], gripper=+1, step_clip=0.012))
| held_bowl = | robo.segment('the | black | patterned | bowl held by | the gripper') |     |     |
| ----------- | ----------------- | ----- | --------- | ------------ | ------------- | --- | --- |
| print('held | bowl', held_bowl) |       |           |              |               |     |     |
print(robo.state())
LLMcall4
robo.show('agentview')
robo.show('wrist')
| print('bowl | now', robo.segment('the |     | black patterned | bowl | on the stove')) |     |     |
| ----------- | ----------------------- | --- | --------------- | ---- | --------------- | --- | --- |
LLMcall5
| held_bowl =                                 | robo.segment(point=(267,            |                        | 339))                    |                                     |                              |     |     |
| ------------------------------------------- | ----------------------------------- | ---------------------- | ------------------------ | ----------------------------------- | ---------------------------- | --- | --- |
| print('held                                 | localization',                      | held_bowl)             |                          |                                     |                              |     |     |
| assert held_bowl.found                      | and                                 | held_bowl.world_xyz[2] |                          | > 1.05                              |                              |     |     |
| carry_state                                 | = robo.state()                      |                        |                          |                                     |                              |     |     |
| grip_offset                                 | = np.array(carry_state.eef_pos[:2]) |                        |                          | - np.array(held_bowl.world_xyz[:2]) |                              |     |     |
| place_xy = np.array(plate.world_xyz[:2])    |                                     |                        | + grip_offset            |                                     |                              |     |     |
| print('grip                                 | offset', grip_offset,               |                        | 'place xy',              | place_xy)                           |                              |     |     |
| mid_xy = (np.array(carry_state.eef_pos[:2]) |                                     |                        |                          | + place_xy)/2                       |                              |     |     |
| for waypoint_xy                             | in [mid_xy,                         | place_xy]:             |                          |                                     |                              |     |     |
| move = robo.move_to([*waypoint_xy,          |                                     |                        | carry_state.eef_pos[2]], |                                     | gripper=+1, step_clip=0.012) |     |     |
| print('carry',                              | move)                               |                        |                          |                                     |                              |     |     |
| if not move.reached                         |                                     | or move.terminated:    |                          |                                     |                              |     |     |
break
robo.show('agentview')
20

LLMcall6
| held_at_plate | = robo.segment(point=(314,   | 795)) |     |     |     |     |
| ------------- | ---------------------------- | ----- | --- | --- | --- | --- |
| print('bowl   | above plate', held_at_plate) |       |     |     |     |     |
assert held_at_plate.found
| correction                             | = np.array(plate.world_xyz[:2])    | - np.array(held_at_plate.world_xyz[:2]) |                             |                           |     |     |
| -------------------------------------- | ---------------------------------- | --------------------------------------- | --------------------------- | ------------------------- | --- | --- |
| place_xy =                             | np.array(robo.state().eef_pos[:2]) | + correction                            |                             |                           |     |     |
| surface_map                            | = robo.world_map()                 |                                         |                             |                           |     |     |
| bowl_patch                             | = surface_map[290:365,             | 740:850]                                |                             |                           |     |     |
| bowl_heights                           | = bowl_patch[:,:,2]                |                                         |                             |                           |     |     |
| bowl_heights                           | = bowl_heights[(bowl_heights>1.04) | & (bowl_heights<1.17)]                  |                             |                           |     |     |
| bottom_z =                             | float(np.quantile(bowl_heights,    | 0.02))                                  |                             |                           |     |     |
| placement_z                            | = plate.world_xyz[2]               | + robo.state().eef_pos[2]               | - bottom_z                  | + 0.007                   |     |     |
| print('correction',                    | correction,                        | 'bottom', bottom_z,                     | 'placement z', placement_z) |                           |     |     |
| assert np.linalg.norm(correction)<0.07 |                                    | and 0.95<placement_z<1.05               |                             |                           |     |     |
| lower = robo.move_to([*place_xy,       |                                    | placement_z], gripper=+1,               | step_clip=0.012,            | tol=0.005, max_steps=100) |     |     |
| print('lower',                         | lower)                             |                                         |                             |                           |     |     |
| if lower.reached                       | and not robo.done:                 |                                         |                             |                           |     |     |
| print('release',                       | robo.release())                    |                                         |                             |                           |     |     |
| print('done',                          | robo.done)                         |                                         |                             |                           |     |     |
if not robo.done:
robo.show('agentview')
| B More | episodes |     |     |     |     |     |
| ------ | -------- | --- | --- | --- | --- | --- |
Table 11 and Figure 9 add five tasks per benchmark that both agents solved: on each benchmark, the task
instances whose token factor (tool calling’s token consumption over code’s, whole episodes) is closest to the
| benchmark’s | median, | at most one per task | and none | of Figure 8’s task. |     |     |
| ----------- | ------- | -------------------- | -------- | ------------------- | --- | --- |
Table11 The episodes of Figure 9: LLM calls and token consumption of each whole episode, with tool calling (Tool)
| and with | code (Code); | shaded: how many | times fewer tokens | code consumed. |           |        |
| -------- | ------------ | ---------------- | ------------------ | -------------- | --------- | ------ |
|          |              |                  |                    | LLMcalls       |           | Tokens |
|          | Benchmark    | Task             |                    | Seed Tool      | Code Tool | Code × |
LIBERO-PRO objectswap0: Pickthealphabet 1 21 8 1.09M 219k 5.0×
soupandplaceitinthebasket
|     |     | spatialswap5: | Picktheakita | 1 18 | 7 918k | 188k 4.9× |
| --- | --- | ------------- | ------------ | ---- | ------ | --------- |
blackbowlontheramekinand
placeitontheplate
|     |     | goalswap4: | Putthebowlonthe | 3 19 | 7 991k | 199k 5.0× |
| --- | --- | ---------- | --------------- | ---- | ------ | --------- |
topofthedrawer
|     |     | spatialswap9: | Picktheakita | 3 24 | 9 1.43M | 288k 5.0× |
| --- | --- | ------------- | ------------ | ---- | ------- | --------- |
blackbowlonthewoodencabinet
andplaceitontheplate
|     |     | objectswap3: | Pickthebbqsauce | 1 17 | 6 814k | 161k 5.0× |
| --- | --- | ------------ | --------------- | ---- | ------ | --------- |
andplaceitinthebasket
|     | RoboTwin2.0          | placecontainerplate       |     | 100000 | 7 4 151k | 89k 1.7×  |
| --- | -------------------- | ------------------------- | --- | ------ | -------- | --------- |
|     |                      | openlaptop                |     | 100008 | 7 4 149k | 88k 1.7×  |
|     |                      | placeemptycup             |     | 100001 | 7 4 150k | 89k 1.7×  |
|     |                      | rotateqrcode              |     | 100001 | 7 4 151k | 89k 1.7×  |
|     |                      | movepillbottlepad         |     | 100002 | 7 4 152k | 91k 1.7×  |
|     | RoboCasa365atomic    | CloseToasterOvenDoor      |     | 1      | 5 3 91k  | 74k 1.2×  |
|     |                      | PickPlaceToasterToCounter |     | 4      | 5 3 92k  | 75k 1.2×  |
|     |                      | CoffeeSetupMug            |     | 5      | 5 3 92k  | 75k 1.2×  |
|     |                      | TurnOnSinkFaucet          |     | 4      | 5 3 91k  | 74k 1.2×  |
|     |                      | TurnOnElectricKettle      |     | 4      | 5 3 91k  | 75k 1.2×  |
|     | RoboCasa365composite | ScrubCuttingBoard         |     | 3      | 8 4 159k | 101k 1.6× |
|     |                      | WashLettuce               |     | 1      | 8 4 162k | 100k 1.6× |
|     |                      | StackBowlsCabinet         |     | 1      | 6 3 117k | 78k 1.5×  |
|     |                      | CuttingToolSelection      |     | 2 18   | 9 438k   | 253k 1.7× |
|     |                      | LoadDishwasher            |     | 5 15   | 7 361k   | 193k 1.9× |
21

|               |      |            | Code (PyRUA-Lean, ours) |     |      |              | Tool calling (RPent) |     |              | LLM call that solved the task |      |                 |     |
| ------------- | ---- | ---------- | ----------------------- | --- | ---- | ------------ | -------------------- | --- | ------------ | ----------------------------- | ---- | --------------- | --- |
|               |      | LIBERO-PRO |                         |     |      | RoboTwin 2.0 |                      |     | RC365 atomic |                               |      | RC365 composite |     |
|               |      |            |                         |     | 150k |              |                      |     |              |                               | 450k |                 |     |
| raf os snekoT | 1.2M |            |                         |     |      |              |                      | 75k |              |                               |      |                 |     |
300k
100k
|     | 800k |     |     |     |     |     |     | 50k |     |     |     |     |     |
| --- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
150k
|     | 400k |     |     |     | 50k |     |     |     |     |     |     |     |     |
| --- | ---- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
25k
|     | 0   |     |     |       | 0   |     |     | 0   |     |     | 0   |     |       |
| --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- | --- | --- | ----- |
|     |     | 5   | 10  | 15 20 |     | 2   | 4 6 |     | 2   | 4   |     | 4 8 | 12 16 |
LLM call
Figure9 Token consumption so far of the episodes in Table 11, five per benchmark, LLM call by LLM call; circles
mark the solving call. On RoboTwin 2.0 and RoboCasa365’s atomic tasks the median episodes of both agents are
| nearly | identical |     | from | task to task, | so  | their lines | overlap. |     |     |     |     |     |     |
| ------ | --------- | --- | ---- | ------------- | --- | ----------- | -------- | --- | --- | --- | --- | --- | --- |
| C      | What      | the | code | agent         |     | writes      |          |     |     |     |     |     |     |
We read the code agent’s cells on every benchmark, in solved and failed episodes, with and without the VLA
policy, and then counted what they do over all 700 episodes of the main comparison, 11,145 cells, each episode
| cut | at its    | budget | (Table | 12).   |            |        |           |     |        |            |            |         |         |
| --- | --------- | ------ | ------ | ------ | ---------- | ------ | --------- | --- | ------ | ---------- | ---------- | ------- | ------- |
|     |           |        |        |        |            | A code | cell runs | 2.1 | acting | primitives | on average | (moves, | grasps, |
| A   | cell acts | more   | than   | a tool | call does. |        |           |     |        |            |            |         |         |
gripper commands and VLA calls), and 45% of cells run two or more; an LLM call of tool calling runs 0.65.
Of tool calling’s LLM calls that call a tool, 89% call exactly one; of the 1,907 that call several, 1,441 batch
back-projections and 292 read or write files, and only 45 of all 18,585 run two acting tools together. Five
habits of the code agent make up the difference, and none of them fits in one tool call: the first two fold steps
that tool calling spreads over several LLM calls into one, the next two build what the tool list does not offer,
| and | the | last decides |     | when to | look. |     |     |     |     |     |     |     |     |
| --- | --- | ------------ | --- | ------- | ----- | --- | --- | --- | --- | --- | --- | --- | --- |
(19% of cells, 45% on LIBERO-PRO). A cell runs several primitives in a row and makes each
Guardedchains
depend on the result of the one before (Listing 1): it moves above the bowl, grasps with the VLA policy only
if the move arrived and the task is not done, and looks only if it is still not done. With tool calling, each link
| of  | such | a chain | is an | LLM call. |     |     |     |     |     |     |     |     |     |
| --- | ---- | ------- | ----- | --------- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
(8% of cells, 18% on RoboCasa365’s atomic tasks). Where a VLA policy may stop short of the goal,
Retries
the cell runs it again until the task reports success (Listing 2). With tool calling, every retry is another LLM
| call, | which | brings | back | three | camera | images. |     |     |     |     |     |     |     |
| ----- | ----- | ------ | ---- | ----- | ------ | ------- | --- | --- | --- | --- | --- | --- | --- |
(30% of cells compute with NumPy, for perception or geometry). A cell can read
| Perception |     | of  | its own |     |     |     |     |     |     |     |     |     |     |
| ---------- | --- | --- | ------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
a camera’s image and point cloud as arrays and locate objects itself: a color mask for a block, the points
above a height for its top, the principal axis of those points for its orientation, and from that the yaw of the
grasp (Listing 3). A tool-calling agent gets what its tools compute (images, the 3D point at a pixel it names,
statistics of a box it names), and must work out anything else in its reasoning.
(2% of cells define a helper function, 7% call one that an earlier cell defined). In Listing 4, the
Skillsofitsown
agent writes a descent that moves down in 8mm steps and stops as soon as a step does not reach its target,
stops going down, or drifts sideways, and it reuses the function in its next cell. Helpers like this are how the
| code | agent | grasps | without | a   | VLA | policy (Section | 3.7). |     |     |     |     |     |     |
| ---- | ----- | ------ | ------- | --- | --- | --------------- | ----- | --- | --- | --- | --- | --- | --- |
(20% of cells). The code agent looks often, 84% of its cells ask for a camera image, but
Lookingwhenneeded
it chooses when and through which camera: 20% of its cells look only if the task is not yet done, where tool
| calling | gets | three | images | after | every | move whether | it needs | them | or  | not. |     |     |     |
| ------- | ---- | ----- | ------ | ----- | ----- | ------------ | -------- | ---- | --- | ---- | --- | --- | --- |
Andsinglesteps (35% of cells, 54% on RoboTwin 2.0). Many cells take one step and look, like a tool call. On
RoboTwin 2.0 the agent often runs the VLA policy one chunk at a time and checks the result after each; code
| saves | the | fewest | LLM | calls there | (Table | 2). |     |     |     |     |     |     |     |
| ----- | --- | ------ | --- | ----------- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
22

Table 12 What the code agent’s cells do, over all 700 episodes of the main comparison (each cut at its budget),
against what an LLM call of tool calling does on the same task instances. Acting primitives are moves, grasps, gripper
| commands                             | and VLA calls.  | RC365: | RoboCasa365. |      |            |             |             |                |
| ------------------------------------ | --------------- | ------ | ------------ | ---- | ---------- | ----------- | ----------- | -------------- |
|                                      |                 |        |              | All  | LIBERO-PRO | RoboTwin2.0 | RC365atomic | RC365composite |
| Actingprimitivespercodecell          |                 |        |              | 2.1  | 2.0        | 1.9         | 2.1         | 2.4            |
| ActingtoolsperLLMcalloftoolcalling   |                 |        |              | 0.65 | 0.60       | 0.69        | 0.56        | 0.67           |
| Share of code                        | cells that      |        |              |      |            |             |             |                |
| runtwoormoreactingprimitives         |                 |        |              | 45%  | 61%        | 24%         | 50%         | 56%            |
| takeasinglestepandlook               |                 |        |              | 35%  | 14%        | 54%         | 33%         | 28%            |
| makeanactiondependonanearlierresult  |                 |        |              | 19%  | 45%        | 12%         | 20%         | 14%            |
| loopovermotions                      |                 |        |              | 14%  | 6%         | 12%         | 22%         | 17%            |
| retryaVLApolicy                      |                 |        |              | 8%   | 0%         | 0%          | 18%         | 17%            |
| computewithNumPy                     |                 |        |              | 30%  | 25%        | 31%         | 29%         | 30%            |
| reuseavariablefromanearliercell      |                 |        |              | 19%  | 33%        | 18%         | 10%         | 14%            |
| callahelperfunctionfromanearliercell |                 |        |              | 7%   | 7%         | 6%          | 2%          | 9%             |
| askforacameraimage                   |                 |        |              | 84%  | 82%        | 78%         | 90%         | 90%            |
| lookonlyifthetaskisnotdone           |                 |        |              | 20%  | 19%        | 8%          | 58%         | 24%            |
| assert bowl.found                    | and plate.found |        |              |      |            |             |             |                |
bowl_xy = np.array(bowl.world_xyz[:2])
| plate_xyz = | np.array(plate.world_xyz) |     |     |     |     |     |     |     |
| ----------- | ------------------------- | --- | --- | --- | --- | --- | --- | --- |
table_z = robo.back_project(837,660).world_xyz[2]
prepose = [float(bowl_xy[0]),float(bowl_xy[1]),table_z+0.22]
approach = robo.move_to(prepose,gripper=robo.OPEN)
print('APPROACH',approach)
| if approach.reached | and not               | robo.done: |            |             |                         |                |     |     |
| ------------------- | --------------------- | ---------- | ---------- | ----------- | ----------------------- | -------------- | --- | --- |
| picked              | = robo.pi0_pick('pick | up the     | black bowl | between the | plate and the ramekin', | max_chunks=20) |     |     |
print('PICK',picked)
print('STATE',robo.state())
if not robo.done:
robo.show('agentview')
robo.show('wrist')
Listing1 A guarded chain: cell 2 of the code agent in LIBERO-PRO, spatial swap, task 0, seed 0, exactly as the
| model wrote | it.  |     |       |        |     |     |     |     |
| ----------- | ---- | --- | ----- | ------ | --- | --- | --- | --- |
| D Instances | only | one | agent | solved |     |     |     |     |
Code alone solves 96 task instances of the main comparison, and tool calling alone 36. In 52 of the 96, tool
calling ran out of LLM calls; in the other 44, it ended the episode itself and reported failure. We read both
episodes of each of those 44. In about a quarter, the code agent only called the VLA policy, and the policy
succeeded in its episode but not in tool calling’s. In most of the others, both agents met the same setback,
most often a VLA grasp that missed or an object that fell. Tool calling then asked the policy again, or
stopped with most of its budget left; the code agent closed the gripper itself, scripted the recovery from the
same primitives, checked each step, and in some episodes computed from the camera’s point cloud what no
tool returns. Figures 10 and 11 follow two instances, one where tool calling ended the episode itself and one
| where it | ran out of LLM | calls. |     |     |     |     |     |     |
| -------- | -------------- | ------ | --- | --- | --- | --- | --- | --- |
| E Cost   | accounting     |        |     |     |     |     |     |     |
Episode-levelaccounting. We removed memory-, recipe-, andaudit-related instructions from theprompts and
operating guides, while retaining the baseline’s original tool descriptions. These descriptions may still prompt
the baseline to save episode-local recipe and audit files after success. Such files are stored in the episode’s own
output directory, and inspection of the evaluation traces found no cross-episode file reads. Any associated
| post-success | LLM calls | are included |     | in the reported | whole-episode | metrics. |     |     |
| ------------ | --------- | ------------ | --- | --------------- | ------------- | -------- | --- | --- |
Prices. Every LLM call of every episode is billed from its own token usage at GPT-6 Astra’s list prices as of
September 2026 [28]: $10 per million input tokens, $1 for cached input, $12.50 for cache writes and $50 for
output, reasoning included. An LLM call above 272k input tokens would cost twice as much for input and 1.5
| times as | much for output; | none | reached | it. |     |     |     |     |
| -------- | ---------------- | ---- | ------- | --- | --- | --- | --- | --- |
23

print(robo.task)
print(robo.success_criteria())
for attempt in range(3):
result = robo.rldx_arm()
print(result)
print(robo.state())
if robo.done or result.status != 'cap':
break
if not robo.done:
robo.show('agentview')
robo.show('wrist')
Listing2 A retry: cell 1 of the code agent in RoboCasa365 atomic, CloseToasterOvenDoor, seed 1, exactly as the
model wrote it.
mask=red&(rows<92)&(cols>98)&(cols<165)&(world[...,2]>0.745)
points=world[mask]
upper=points[points[:,2]>0.794]
mean_xy=np.mean(upper[:,:2],axis=0)
eigenvalues,eigenvectors=np.linalg.eigh(np.cov(upper[:,:2].T))
long_axis=eigenvectors[:,1]
if long_axis[1]<0: long_axis=-long_axis
short_axis=np.array([long_axis[1],-long_axis[0]])
projection_long=upper[:,:2]@long_axis
projection_short=upper[:,:2]@short_axis
block_center=long_axis*((np.min(projection_long)+np.max(projection_long))/2)+short_axis*((np.min(projection_short)+np.max(projection_short))/2)
print('flat centre',block_center,'long axis',long_axis,'extents',np.ptp(projection_long),np.ptp(projection_short))
left_grasp_xy=block_center+0.045*long_axis
right_grasp_xy=block_center-0.05*long_axis
yaw=math.atan2(long_axis[1],long_axis[0])
q_down=np.array([math.cos(yaw/2)/math.sqrt(2),-math.sin(yaw/2)/math.sqrt(2),math.cos(yaw/2)/math.sqrt(2),math.sin(yaw/2)/math.sqrt(2)])
print('grasp',left_grasp_xy,'receive',right_grasp_xy,'quat',q_down)
safe=np.array(robo.state().left.eef_pos);safe[2]=1.03
if checked_move('left',safe,quat=robo.state().left.eef_quat,substeps=20):
waypoint=np.array([left_grasp_xy[0],0.015,1.03])
if checked_move('left',waypoint,quat=q_down,substeps=25):
print(robo.move_to('left',[left_grasp_xy[0],left_grasp_xy[1],0.97],quat=q_down,substeps=25))
print(robo.state().left)
robo.show('head')
Listing3 Perception of its own: cell 5 of the code agent in RoboTwin 2.0 without the VLA policy, handover block,
seed 100003, exactly as the model wrote it. checked_move, a helper it defined in an earlier cell, moves an arm and
reports whether the move arrived.
We count LLM calls rather than time episodes, because the latency of an LLM call on
LLMcalls,notseconds.
a shared model gateway varies too much from one call to the next to compare.
The efficiency metrics in Table 2 are computed on jointly solved instances, while
All-episodeaccounting.
success rates use all task instances. Aggregating over all episodes, including failures, the tool-calling-to-
PyRUA-Lean input-token ratios are 3.1× on LIBERO-PRO, 1.8× on RoboTwin 2.0, 1.6× on RoboCasa365
composite tasks, and 1.1× on RoboCasa365 atomic tasks; the ratios of the estimated inference costs are
2.5×, 1.6×, 1.4×, and 1.0×. On the atomic tasks an episode costs $0.94 with tool calling and $0.96 with
PyRUA-Lean: failed episodes on these tasks tend to approach the limit of 40 LLM calls for both agents, while
PyRUA-Lean uses more input tokens per LLM call.
The median first prompt, which holds the system prompt, the guides and the tool
Firstpromptsandoutput.
list or, for the code agent, the API reference and a task card with the first camera images, is 20k for tool
calling and 22k for code on LIBERO-PRO, 15k and 21k on RoboTwin 2.0, and 17k and 24k on RoboCasa365.
On jointly solved instances, output tokens, reasoning included, are at most 17% of either agent’s bill on any
benchmark.
F Benchmarks and task instances
Table13listswhatthemaincomparisonran: 700taskinstancesand1,400episodes. LIBERO-PROrunsevery
taskatseeds0–4, RoboTwin2.0atseeds100000–100004andRoboCasa365atseeds1–5. WhereRoboTwin2.0
cannot build a task at a seed, we use the next seed it can build, and an episode that ended because its
24

| def lower_guarded(arm_name, |     | target_tcp_z): |     |     |     |     |     |     |     |     |
| --------------------------- | --- | -------------- | --- | --- | --- | --- | --- | --- | --- | --- |
initial=robo.state().arm(arm_name)
target=np.array(initial.eef_pos)
final_eef_z=target_tcp_z-0.12*initial.approach[2]
| while | target[2]>final_eef_z+0.001 |     | and not | robo.done: |     |     |     |     |     |     |
| ----- | --------------------------- | --- | ------- | ---------- | --- | --- | --- | --- | --- | --- |
before=robo.state().arm(arm_name)
target[2]=max(final_eef_z,target[2]-0.008)
result=robo.move_to(arm_name,target,substeps=8)
after=robo.state().arm(arm_name)
|     | print('descent',result.reached,tuple(round(v,4) |     |     | for | v in after.tcp_pos)) |     |     |     |     |     |
| --- | ----------------------------------------------- | --- | --- | --- | -------------------- | --- | --- | --- | --- | --- |
if result.terminated or not result.planned or not result.reached or after.eef_pos[2]>=before.eef_pos[2]-0.001 or np.linalg.norm(np.array
(after.eef_pos[:2])-target[:2])>0.01:
print('stop',result)
break
lower_guarded('right',0.800)
robo.show('right_wrist')
robo.show('head')
Listing4 A skill of its own: cell 7 of the code agent in RoboTwin 2.0, place object stand, seed 100002, exactly as the
| model | wrote | it. |     |     |     |     |     |     |     |     |
| ----- | ----- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
simulator or VLA server stopped answering was run again; one RoboCasa365 instance (CoffeeSetupMug, seed
| 4) renders | only | noise on every | camera, | so that | task | runs at | seed 6 | instead. |     |     |
| ---------- | ---- | -------------- | ------- | ------- | ---- | ------- | ------ | -------- | --- | --- |
Table13 The task instances of the main comparison. Each instance runs once with each agent.
|     |          | Benchmark      |     | Tasks | Seedspertask |     | Taskinstances |     | LLM-callbudget |     |
| --- | -------- | -------------- | --- | ----- | ------------ | --- | ------------- | --- | -------------- | --- |
|     |          | LIBERO-PRO     |     | 40    |              | 5   | 200           |     | 40             |     |
|     |          | RoboTwin2.0    |     | 50    |              | 5   | 250           |     | 40             |     |
|     |          | RC365atomic    |     | 18    |              | 5   | 90            |     | 40             |     |
|     |          | RC365composite |     | 32    |              | 5   | 160           |     | 100            |     |
|     |          | All            |     | 140   |              |     | 700           |     |                |     |
| G   | Ablation | settings       |     |       |              |     |               |     |                |     |
The ablations of Table 3 run on every task instance of the main comparison, at its seeds. Every setting of a
group uses the same task instances, and its first setting reuses the episodes of the main comparison.
|     |     |     |     | On every | LIBERO-PRO |     | task | instance, | the tool-calling | agent ran once |
| --- | --- | --- | --- | -------- | ---------- | --- | ---- | --------- | ---------------- | -------------- |
Toolcallingwithimagesondemand.
more with one change: its tools return their text but no camera images, which it sees only when it calls
RPent’s camera tool (three views per call), and its prompt no longer promises images after every tool call.
Code needs no such run, since a PyRUA-Lean cell returns images only when it asks for them; the Code
column in Table 14 reuses the PyRUA-Lean episodes from the main comparison.
Table 14 Tool calling with camera images after every move (the LIBERO-PRO baseline of Table 3) and only on
∗On
demand, against code, on all 200 task instances of LIBERO-PRO. the 131 instances all three solved (means).
|     |                                 |                       |          |     | Tool,imagesaftereverymove |       |     | Tool,imagesondemand |       | Code |
| --- | ------------------------------- | --------------------- | -------- | --- | ------------------------- | ----- | --- | ------------------- | ----- | ---- |
|     | Successrate(%),alltaskinstances |                       |          |     |                           | 83.0  |     |                     | 68.5  | 94.0 |
|     | Failures:                       | gaveup/LLM-callbudget |          |     |                           | 9/25  |     |                     | 17/46 | 5/7  |
|     | LLMcallspersolvedepisode∗       |                       |          |     |                           | 19.9  |     |                     | 22.8  | 7.4  |
|     | Inputtokenspersolvedepisode∗    |                       |          |     |                           | 1.07M |     |                     | 1.07M | 222k |
| H   | RoboDojo:                       | agent                 | settings | and | checks                    |       |     |                     |       |      |
Agentsettings. The settings are the same for all tasks and for both configurations: a budget of 100 LLM
calls per episode, counted on the calls that run a code cell, the task’s own step limit, and a wall-clock limit of
90 minutes, which no episode reached; images only when the code asks for them; at most 8,192 output tokens
per LLM call, at high reasoning effort; no operating guide beyond the notes of Section 4.2; and a reminder, at
most 20 times per episode, when an LLM call returns no code. One LLM call returns at most one code cell:
25

Tool calling
(RPent)
call 20: the pot slips while carried call 26: Pi0 again, for the fallen pot call 32: gives up, pot on its side
wrist camera
Code, ours
(PyRUA-Lean)
call 8: the pot has fallen here too call 24: a plane fit to the lid call 33: base over the burner, solved
23 python(code) 2primitivecalls;anexcerpt 29 python(code) 7primitivecalls;anexcerpt
| world=robo.world_map('agentview') | composition | ... |
| --------------------------------- | ----------- | --- |
... yaw_delta=math.atan2(actual_normal[0],actual_normal[1]) composition
| points=region[(colors.mean(axis=2)>100)&(region[:,:,2]>1.24)&(region |     | ... |
| -------------------------------------------------------------------- | --- | --- |
, → [:,:,2]<1.32)][::8] print(robo.rotate_wrist(delta_yaw=yaw_delta,gripper=+1,max_steps=100,step_clip
| ...                       |     | , =0.035)) |
| ------------------------- | --- | ---------- |
| foriterationinrange(150): |     | ... →      |
sample=points[rng.choice(len(points),3,replace=False)] pitch_delta=math.atan2(actual_normal[1],actual_normal[2])
| normal=np.cross(sample[1]-sample[0],sample[2]-sample[0]) |     | ... |
| -------------------------------------------------------- | --- | --- |
... print(robo.rotate_pitch(delta_pitch=pitch_delta,gripper=+1,max_steps=100,
| residual=np.abs((points-sample[0])@normal) |     | , step_clip=0.035)) |
| ------------------------------------------ | --- | ------------------- |
→
| mask=residual<0.0015 |     | ... |
| -------------------- | --- | --- |
...
back:the7linesitprintedandtheimageitaskedfor
back:theerroritraised,TypeError
33 python(code) 10primitivecalls;anexcerpt ✓
python(code) 2primitivecalls;anexcerpt
| 24  |     | ... |
| --- | --- | --- |
... actual_normal=rotation_matrix(robo.state().eef_quat)@local_normal
center=points[best].mean(axis=0) height=initial_knob[2]-anchors['table'][2]
_,singular,vectors=np.linalg.svd(points[best]-center,full_matrices=False) base_center=current_knob-actual_normal*height composition
| normal=vectors[-1] | composition | ... |
| ------------------ | ----------- | --- |
... place_target=np.array(robo.state().eef_pos)+burner-base_center
place_target[2]+=0.007
| back:the3linesitprinted,noimage |     | ... |
| ------------------------------- | --- | --- |
print(robo.move_to(place_target.tolist(),gripper=+1,step_clip=0.006,max_steps
, =100,tol=0.006))
→
...
back:the5linesitprinted,noimage
Figure10 Aninstanceonlycodesolved: LIBERO-PRO,“turnonthestoveandputthemokapotonit” (10swap,task
2, seed3). Bothagentsturnedthestoveonanddroppedthepot. ToolcallingcalledtheVLApickprimitive(pi0_pick,
which runs π 0.5 ; “Pi0” in the labels) on the fallen pot four times and ended the episode; the code agent grasped it
itself,fittedaplanetothepointsofitslidtofindhowitleans,turneditupright,andsetitsbase,notthegripper,over
the burner. Top: the recorded camera views after the LLM calls named. Bottom: the code agent’s cells, excerpts
exactly as the model wrote them; “...” marks lines left out. The plane fit in LLM call 23 raised an error (NumPy’s
linear algebra refuses half-precision arrays); LLM call 24 cast the points and ran it again.
26

Tool calling
(RPent)
call 12: one short pull per call call 33: still pulling by hand call 40: budget spent, door ajar
Code, ours
(PyRUA-Lean)
call 27: hinge from a circle fit call 30: pulls along the arc call 34: door open, solved
27 python(code) 5primitivecalls;anexcerpt 28 python(code) 18primitivecalls;anexcerpt
| ... |     |     |     | current=np.array(robo.state().eef_pos) |     |     |
| --- | --- | --- | --- | -------------------------------------- | --- | --- |
handle=np.array(sample.median_xyz) arc_radius=np.linalg.norm(current[:2]-center) composition
observations=np.array([[0.43,-3.2447],[0.5879,-3.2852],handle[:2]]) arc_angle=math.atan2(current[0]-center[0],current[1]-center[1])
| center=np.linalg.solve(2*(observations[1:]-observations[0]),np.sum(observations |                                             |     |     | arc_height=current[2] |     |     |
| ------------------------------------------------------------------------------- | ------------------------------------------- | --- | --- | --------------------- | --- | --- |
| ,                                                                               | [1:]**2,axis=1)-np.sum(observations[0]**2)) |     |     | ...                   |     |     |
radiu→s=np.linalg.norm(observations[0]-center)
|     |     |     | composition | forincrementinrange(4): |                | composition |
| --- | --- | --- | ----------- | ----------------------- | -------------- | ----------- |
| ... |     |     |             |                         | arc_angle+=0.1 |             |
target=np.array([center[0]+arc_radius*math.sin(arc_angle),center[1]+
back:the4linesitprintedandtheimageitaskedfor
|     |     |     |     |     | , arc_radius*math.cos(arc_angle),arc_height]) |     |
| --- | --- | --- | --- | --- | --------------------------------------------- | --- |
m→oved=robo.move_to(target,gripper=robo.CLOSE,step_clip=0.005,max_steps=80,
|     |     |     |     |     | , tol=0.005) |     |
| --- | --- | --- | --- | --- | ------------ | --- |
... →
ifrobo.doneornotmoved.reachedorrobo.state().gripper_opening<0.008or
|     |     |     |     |     | , robo.state().gripper_opening>0.055: |     |
| --- | --- | --- | --- | --- | ------------------------------------- | --- |
|     |     |     |     |     | → break                               |     |
...
back:the9linesitprintedandthe2imagesitaskedfor
Figure11 Aninstanceonlycodesolved: RoboCasa365atomic,“Openthecabinetdoor.” (seed4). Bothagentslocated
the door’s hinge. Tool calling pulled the handle a few centimeters per LLM call and was still pulling when its 40
LLM calls ran out; the code agent took the hinge as the center of the circle through three positions of the handle,
two of which it copied from earlier outputs, and pulled along that arc in one cell, stopping if a move fell short or the
grip slipped. The door opened, and a VLA call in LLM call 34 completed the task. Top: the recorded camera views;
| bottom: | the code agent’s | cells, excerpts | exactly as | the model wrote | them. |     |
| ------- | ---------------- | --------------- | ---------- | --------------- | ----- | --- |
27

in the RGB configuration an episode runs 22.6 cells in its 25.7 LLM calls on average, and the remaining calls
| end the episode | or  | return | text only. |     |     |     |     |     |     |
| --------------- | --- | ------ | ---------- | --- | --- | --- | --- | --- | --- |
Checksontheevaluationruns. Forallfourseeds(oneoftheRGBconfiguration,threewithdepth),wechecked
that all 54 task names (a Generalization task and its randomized twin are two names) ran the protocol’s
number of episodes on distinct layouts, that the three camera videos of every episode exist, that no episode
ended on an error or a timeout of the evaluation client, and that the verdict our adapter recorded agrees with
the client’s own result file for every episode. The board-style values we compute from the episodes equal those
| of RoboDojo’s | own  | summary | script. |      |         |     |     |     |     |
| ------------- | ---- | ------- | ------- | ---- | ------- | --- | --- | --- | --- |
| I RoboDojo    | with | depth:  |         | what | differs |     |     |     |     |
The configuration of Section 4.4 is the agent of Section 4 with one change to its observation and to the
three primitives that read it (Table 15). The planner, the agent loop, the budgets, the motion and gripper
primitives, and the rest of the prompt are the same. Its success rate on each task is the third column of
Table 17. In this configuration an episode takes 23.9 LLM calls on average, and the three seeds cost about
| $14,000 at | our model | gateway,      |      | or $2.2 | per episode. |         |                |                         |        |
| ---------- | --------- | ------------- | ---- | ------- | ------------ | ------- | -------------- | ----------------------- | ------ |
|            | Table15   |               | What | differs | between      | the two | configurations | of the RoboDojo         | agent. |
|            |           | RGB(Section4) |      |         |              |         |                | RGBanddepth(Section4.4) |        |
Observation ThreeRGBimagesandtherobotstate. The same, plus a depth image and the intrinsic
andextrinsicmatricesofeachcamera,whichare
optionsoftheclient’sobservationconfiguration.
locate Takesthemaskoftheobjectinthecameraasked, Takesthe3Dpointsofthedepthpixelsunderthe
looksforthesameobjectintheothertwocameras, mask,fromonecamera: theygivecenter,top,and
|     |     | andreportsthefootprintandheightthatfitevery |     |     |                        |     |     | footprintdirectly. |     |
| --- | --- | ------------------------------------------- | --- | --- | ---------------------- | --- | --- | ------------------ | --- |
|     |     | camerathatshowsit.                          |     |     | Withonecameratheheight |     |     |                    |     |
isaguess,andtheresultsaysso.
back_project Segmentstheobjectunderthepixelandmeasures Readsthedepthatthepixel.
|     |     | it as locate | does; | the | answer is | where the | pixel’s |     |     |
| --- | --- | ------------ | ----- | --- | --------- | --------- | ------- | --- | --- |
raymeetsit,orthetable.
camera_meta Workedoutfromthefixedcalibrationofthestation Thematricestheclientsends.
and,forawristcamera,fromthearm’sstate.
| Operatingnotes |     | Sayhowtomeasurewiththewristcameras: |        |          |     |             | what  | Notneeded. |     |
| -------------- | --- | ----------------------------------- | ------ | -------- | --- | ----------- | ----- | ---------- | --- |
|                |     | one camera                          | cannot | measure, |     | and to look | again |            |     |
fromabovebeforeagrasp.
| J PyRUA-Lean |     | Coder: |     | training | settings |     |     |     |     |
| ------------ | --- | ------ | --- | -------- | -------- | --- | --- | --- | --- |
Table 16 lists the settings with which PyRUA-Lean Coder v0.1-4B was trained (Section 5.1).
|     |     |     |     | Training | settings | of  | PyRUA-Lean | Coder v0.1-4B. |     |
| --- | --- | --- | --- | -------- | -------- | --- | ---------- | -------------- | --- |
Table16
| Basemodel |     |     | Qwen3.5-4B,fine-tunedinfull |     |     |     |     |     |     |
| --------- | --- | --- | --------------------------- | --- | --- | --- | --- | --- | --- |
Algorithm GRPO;cliprange0.2below,0.28above;noKLterm,noentropyterm
| Reward |     |     | 1ifthebenchmark’ssuccesscheckpasses,0otherwise |     |     |     |     |     |     |
| ------ | --- | --- | ---------------------------------------------- | --- | --- | --- | --- | --- | --- |
Traininginstances 45: LIBERO-PROgoal,spatialandobjectsuites,3tasks×5seedseach
| Episodesperiteration       |     |     | 16instances×8rollouts=128 |     |     |     |     |     |     |
| -------------------------- | --- | --- | ------------------------- | --- | --- | --- | --- | --- | --- |
| Optimizerstepsperiteration |     |     | 2,of64episodeseach        |     |     |     |     |     |     |
Optimizer Adam,learningrate10−6 (constant),β=(0.9,0.98),weightdecay0.1
| Iterations      |     |     | 30(3,840episodes,60optimizersteps) |     |     |     |     |     |     |
| --------------- | --- | --- | ---------------------------------- | --- | --- | --- | --- | --- | --- |
| Rolloutsampling |     |     | temperature1.0                     |     |     |     |     |     |     |
Limitsofatrainingepisode 24codecells,30LLMcalls,25minutes;4,096newtokensperLLMcall
| Generatedtokensperepisode |     |     | atmost40,960;context65,536tokens |     |     |     |     |     |     |
| ------------------------- | --- | --- | -------------------------------- | --- | --- | --- | --- | --- | --- |
Hardwareandsoftware onenodewitheightGPUs;milesfortraining,SGLangforrollouts;abouttwelvehours
28

| K RoboDojo: | results per | task |     |     |
| ----------- | ----------- | ---- | --- | --- |
Table 17 lists the 42 tasks of RoboDojo with the success rate of PyRUA-Lean, of PyRUA-Lean with depth
(Section 4.4), of GPT-6 Astra controlling the end-effector directly, and of the best entry of the public board
on that task. PyRUA-Lean is above every entry on 22 tasks and level with the best on 3.
Table17 Success rate (%) per RoboDojo task: PyRUA-Lean (one evaluation seed), PyRUA-Lean with depth (three
evaluationseeds;Section4.4,notcomparedwiththeboard),GPT-6Astrawithdirectend-effectorcontrol[47](Astra),
and the best entry of the public board dated October 9, 2026 on that task (Best, among the 57 policies with per-task
results;whereseveralholdit,theirnumberisgiven,andadashwhereitis0.0). AGeneralizationtask’svaluepoolsits
standard and randomized episodes. Bold: PyRUA-Lean above every entry of the board.
Ours,
|     | Task | Ours | Astra | Best Bestboardentry |
| --- | ---- | ---- | ----- | ------------------- |
withdepth
|     | Generalization              | (12tasks) |            |                         |
| --- | --------------------------- | --------- | ---------- | ----------------------- |
|     | stack_bowls                 | 78.0      | 75.3 62.0  | 74.7 Simate-beta        |
|     | push_T                      | 76.0      | 78.0 60.0  | 60.0 GPT-6Astra(direct) |
|     | pack_objects_into_box       | 32.0      | 17.3 0.0   | 17.3 Simate-beta        |
|     | fold_clothes                | 70.0      | 48.7 72.0  | 78.0 Simate-beta        |
|     | hang_mugs                   | 2.0       | 14.0 0.0   | 32.0 VPP2               |
|     | sweep_blocks                | 18.0      | 24.7 4.0   | 14.0 Rex-M1Preview      |
|     | pour_liquid_into_cup        | 8.0       | 16.0 4.0   | 67.3 Rex-M1Preview      |
|     | make_toast                  | 6.0       | 18.7 0.0   | 39.3 VPP2               |
|     | arrange_largest_number      | 86.0      | 76.7 60.0  | 60.0 GPT-6Astra(direct) |
|     | sort_nesting_dolls_by_size  | 74.0      | 76.0 18.0  | 18.7 VPP2               |
|     | store_laptop_and_headphones | 0.0       | 0.0 0.0    | 34.0 Simate-beta        |
|     | stack_blocks                | 100.0     | 100.0 86.0 | 86.0 GPT-6Astra(direct) |
Precision (8tasks)
|     |     | 66.0 | 69.3 16.0 | 48.0 Awomo-0.5 |
| --- | --- | ---- | --------- | -------------- |
fasten_screws
|     | plug_in_charger      | 12.0 | 14.0 0.0 | 30.7 PhysicalRSI |
| --- | -------------------- | ---- | -------- | ---------------- |
|     | insert_tubes         | 44.0 | 70.7 0.0 | 74.7 VPP2        |
|     | pour_balls_into_vase | 76.0 | 69.3 4.0 | 60.7 VPP2        |
|     | play_Xylophone       | 64.0 | 67.3 8.0 | 30.7 Awomo-0.5   |
|     |                      | 34.0 | 34.0 2.0 | 56.0 PhysicalRSI |
deposit_coin
|     | insert_key               | 0.0  | 0.0 0.0   | 39.3 PhysicalRSI        |
| --- | ------------------------ | ---- | --------- | ----------------------- |
|     | build_tower              | 2.0  | 4.0 2.0   | 83.3 Simate-beta        |
|     | Long-Horizon (8tasks)    |      |           |                         |
|     | put_bottles_into_dustbin | 76.0 | 94.7 10.0 | 100.0 Simate-beta       |
|     | fill_pen_holder          | 14.0 | 16.7 0.0  | 42.0 InternW0-∆         |
|     | classify_objects         | 98.0 | 99.3 56.0 | 56.0 GPT-6Astra(direct) |
|     | play_tic_tac_toe         | 94.0 | 94.7 0.0  | 94.0 PhysicalRSI        |
|     | fill_egg_holder          | 2.0  | 2.0 0.0   | 1.0 Liber-0Lite         |
|     | organize_table           | 34.0 | 39.3 0.0  | 26.0 Simate-beta        |
|     | make_kong                | 0.0  | 0.0 0.0   | 90.0 GalaxeaVLA(G0.5)   |
|     | play_stacking_toy        | 66.0 | 67.3 0.0  | 23.3 VPP2               |
Memory (6tasks)
|     | cover_blocks                 | 100.0 | 100.0 46.0 | 100.0 8entries          |
| --- | ---------------------------- | ----- | ---------- | ----------------------- |
|     | match_and_pick_from_conveyor | 82.0  | 86.7 62.0  | 92.0 InternW0-∆         |
|     | swap_blocks                  | 0.0   | 0.0 0.0    | 38.7 Simate-beta        |
|     | swap_T                       | 98.0  | 100.0 18.0 | 92.7 PhysicalRSI        |
|     | press_by_number              | 0.0   | 0.0 70.0   | 96.0 VPP2               |
|     | imitate_sorting_sequence     | 98.0  | 97.3 36.0  | 36.0 GPT-6Astra(direct) |
Open (8tasks)
|     | align_blocks                 | 78.0  | 71.3 50.0  | 86.0 PhysicalRSI        |
| --- | ---------------------------- | ----- | ---------- | ----------------------- |
|     | general_pickup               | 98.0  | 93.3 84.0  | 84.0 GPT-6Astra(direct) |
|     | stack_blocks_by_language     | 100.0 | 100.0 40.0 | 40.0 GPT-6Astra(direct) |
|     | solve_equation               | 90.0  | 86.7 40.0  | 60.0 PhysicalRSI        |
|     | classify_objects_by_language | 92.0  | 90.7 30.0  | 30.0 GPT-6Astra(direct) |
|     | pick_from_conveyor_by_image  | 34.0  | 28.7 4.0   | 4.0 GPT-6Astra(direct)  |
|     | store_tools_in_toolbox       | 0.0   | 0.0 0.0    | 0.0 –                   |
|     |                              | 20.0  | 27.3 0.0   | 0.0 –                   |
pour_by_language
29
