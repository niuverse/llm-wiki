# PyRUA-Lean fdf6e870654254e2c0c891ee407313fa48bdd0f9 — archived file excerpts

## README.md:1-169

```text
1: <p align="center">
2:   <picture>
3:     <source media="(prefers-color-scheme: dark)" srcset="docs/assets/logo-dark.svg">
4:     <img src="docs/assets/logo.svg" width="70%" alt="PyRUA-Lean: Python for Lean Robot-Use Agents"/>
5:   </picture>
6: </p>
7:
8: <h3 align="center">
9: <a href="https://dagroup-pku.github.io/PyRUA-Lean/"><b>🌐 Project Page</b></a> |
10: <a href="https://arxiv.org/abs/2610.01939"><b>📄 Paper</b></a> |
11: <a href="https://dagroup-pku.github.io/PyRUA-Lean/docs/"><b>📚 Docs</b></a> |
12: <a href="https://huggingface.co/DAGroup-PKU/PyRUA-Lean-Coder-v0.1-4B"><b>🤗 Model</b></a>
13: </h3>
14:
15: <p align="center">
16:   <a href="https://dagroup-pku.github.io/PyRUA-Lean/"><img src="https://img.shields.io/badge/Project-Page-8C0000.svg"></a> &ensp;
17:   <a href="https://arxiv.org/abs/2610.01939"><img src="https://img.shields.io/badge/arXiv-2610.01939-b31b1b.svg"></a> &ensp;
18:   <a href="https://huggingface.co/DAGroup-PKU/PyRUA-Lean-Coder-v0.1-4B"><img src="https://img.shields.io/badge/🤗%20HuggingFace-Model-yellow.svg"></a> &ensp;
19:   <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"></a> &ensp;
20:   <a href="pyproject.toml"><img src="https://img.shields.io/badge/Python-3.10%2B-3776ab?logo=python&logoColor=white"></a>
21: </p>
22:
23: **PyRUA-Lean** (*Py*thon for lean *R*obot-*U*se *A*gents, the robot counterpart of computer-use agents)
24: turns a robot into a Python object. A tool-calling agent spends a full LLM call on every small step of a task
25: and re-sends everything before it each time. A PyRUA-Lean agent writes code against `robo` instead, so one call
26: can find an object, move above it, grasp, check the gripper and try again.
27:
28: <p align="center">
29:   <picture>
30:     <source media="(prefers-color-scheme: dark)" srcset="docs/assets/overview-dark.png">
31:     <img src="docs/assets/overview.png" width="100%"
32:          alt="PyRUA-Lean at a glance. Top: against tool calling with the same planner and primitives, success rate 63.1% to 71.7% overall, 65% fewer input tokens and 2.2x cheaper per solved episode. Bottom left: RoboDojo, 51.6% average success rate against 32.3% for the best entry of the public leaderboard. Bottom right: PyRUA-Lean Coder v0.1-4B, 18.8% to 44.1% on unseen task instances after GRPO training on 45 LIBERO-PRO instances">
33:   </picture>
34: </p>
35:
36: ## 🔥 News
37:
38: - [Coming soon] 🔁 **PyRUA-RSI**.
39: - [2026/10/24] 🏔️ **#1 on the RoboDojo-Sim leaderboard**: PyRUA-Lean is now listed on the official leaderboard with
40:   Score 55.26 and a **50.35%** average success rate, the first entry above 50%.
41:   [[Leaderboard]](https://robodojo-benchmark.com/leaderboard)
42:   <br><img src="docs/assets/robodojo-leaderboard.jpg" width="90%"
43:        alt="RoboDojo-Sim leaderboard on October 24, 2026: PyRUA-Lean is the highest of 62 models on the summit chart">
44: - [2026/10/21] 🏆 **RoboDojo official evaluation**: run by the RoboDojo team, PyRUA-Lean reaches a **50.35%** average
45:   success rate (Score 55.26) on all 42 tasks, **rank 1** against the current RoboDojo-Sim leaderboard.
46:   [[Official results]](integrations/xpolicylab/evaluation/robodojo_summary_official.md)
47: - [2026/10/21] 🦾 **Real robot**: on an AF8 dual-arm robot, GPT-6 Astra writes every Python cell and puts all five
48:   tabletop blocks into a bowl, in two independent uncut episodes (41 and 42 cells, about 22 minutes each).
49:   [[Videos]](https://dagroup-pku.github.io/PyRUA-Lean/#real-robot)
50: - [2026/10/15] 🤗 **PyRUA-Lean Coder v0.1-4B** is on Hugging Face. [[Model]](https://huggingface.co/DAGroup-PKU/PyRUA-Lean-Coder-v0.1-4B)
51: - [2026/10/13] 📄 **arXiv v2** is out as a technical report: it adds RoboDojo and PyRUA-Lean Coder v0.1-4B.
52:   [[Paper]](https://arxiv.org/abs/2610.01939)
53: - [2026/10/13] 🤖 **RoboDojo**: without any VLA policy or privileged information, PyRUA-Lean reaches a **51.62%**
54:   average success rate (Score 58.20), 19.4 points above the best entry of the public leaderboard (snapshot of October 9, 2026).
55:   The adapter is open as a pull request to XPolicyLab for RoboDojo's official evaluation
56:   ([XPolicyLab#168](https://github.com/XPolicyLab/XPolicyLab/pull/168)).
57:   [[Adapter]](integrations/xpolicylab)
58: - [2026/10/01] 📄 **arXiv v1** is out. [[Paper]](https://arxiv.org/abs/2610.01939v1)
59:
60: ## 💡 Introduction
61:
62: PyRUA-Lean has three parts so far:
63:
64: - **The framework.** The agent composes robot primitives, VLA policies among them, into Python cells that check
65:   and retry locally and return only the images and state it asks for. On 700 task instances from LIBERO-PRO,
66:   RoboTwin 2.0 and RoboCasa365, with the same GPT-6 Astra planner and the same primitives as tool calling, success
67:   goes from **63.1% to 71.7%**, with **49% fewer LLM calls** and **65% fewer input tokens** on the instances both
68:   agents solve.
69: - **RoboDojo.** With this library's own motion, gripper and perception primitives and the colour images of the
70:   benchmark's default observation, PyRUA-Lean reaches **51.62% average success rate (Score 58.20)**, first on all
71:   five dimensions of the public leaderboard (snapshot of October 9, 2026).
72: - **[PyRUA-Lean Coder v0.1-4B](https://huggingface.co/DAGroup-PKU/PyRUA-Lean-Coder-v0.1-4B).** Qwen3.5-4B trained with GRPO in the PyRUA-Lean framework, on 45 LIBERO-PRO
73:   instances, goes from **18.8% to 44.1%** on 655 task instances it never saw in training, above the Qwen3.5-27B base
74:   model (29.2%).
75:
76: ## 🚀 Quick start
77:
78: LIBERO-PRO, RoboTwin 2.0 and RoboCasa365 run on the robot stacks of [RPent](https://github.com/RLinf/RPent): install
79: RPent with the robot you want first (the [Quick Start](https://dagroup-pku.github.io/PyRUA-Lean/docs/getting-started/quickstart/) goes through it step by step).
80: RoboDojo runs through XPolicyLab and needs no RPent ([RoboDojo](https://dagroup-pku.github.io/PyRUA-Lean/docs/robots/robodojo/)). Agents run through the
81: [Codex CLI](https://github.com/openai/codex) 0.155.1, Claude Code, or any OpenAI-compatible endpoint.
82:
83: ```bash
84: git clone https://github.com/DAGroup-PKU/PyRUA-Lean.git && cd PyRUA-Lean
85: uv pip install -e .       # into the Python environment of your RPent robot stack (or pip)
86: pyrualean api             # the robot API the agent sees; no simulator needed
87: npm install -g @openai/codex@0.155.1 && codex login      # the agent runtime
88:
89: # one LIBERO-PRO episode: GPT-6 Astra writes code against robo, at most 40 code cells
90: export RPENT_ROOT=/path/to/rpent
91: pyrualean play --arm cells --suite libero_spatial_swap --task 7 --seed 2 \
92:     --model gpt-6-astra --max-turns 40 --budget-s 7200 --out runs/demo --cuda-device 0
93: pyrualean summarize runs/demo
94: ```
95:
96: The run directory keeps the episode video, every cell the agent ran with its output, the ledger of primitive
97: calls, the token usage and the benchmark's own verdict.
98:
99: ## 🦾 Robots
100:
101: | Robot | Benchmark | Runs on | Robot and skills |
102: |---|---|---|---|
103: | `robodojo_xpl_rgb` | [RoboDojo](https://dagroup-pku.github.io/PyRUA-Lean/docs/robots/robodojo/) | [XPolicyLab](https://github.com/XPolicyLab/XPolicyLab), under RoboDojo's own evaluation client | two ARX-X5 arms; this library's own motion, gripper and perception primitives, SAM3; the three colour images of the default observation; no VLA |
104: | `libero` (default) | [LIBERO-PRO](https://dagroup-pku.github.io/PyRUA-Lean/docs/robots/libero/) | RPent | Franka arm; scripted servos, Pi0.5 VLA, SAM3 perception |
105: | `robotwin` | [RoboTwin 2.0](https://dagroup-pku.github.io/PyRUA-Lean/docs/robots/robotwin/) | RPent | two arms; LingBot-VLA |
106: | `robocasa` | [RoboCasa365](https://dagroup-pku.github.io/PyRUA-Lean/docs/robots/robocasa/) | RPent | mobile manipulator; RLDX-1 VLA, navigation |
107: | *real robot* | [Demos](https://dagroup-pku.github.io/PyRUA-Lean/#real-robot) | AF8 dual-arm robot | two arms, a head camera and two RGB-D wrist cameras; motion planning, gripper and perception primitives with force and torque guards; no VLA; integration coming soon |
108:
109: New robots are added through XPolicyLab ([Adding a Robot](https://dagroup-pku.github.io/PyRUA-Lean/docs/robots/adding-a-robot/)).
110:
111: ## 📊 Performance
112:
113: **Code cells against tool calling** (GPT-6 Astra, same primitives; calls, tokens and cost per solved episode on
114: the task instances both agents solved):
115:
116: | Benchmark | Success, tool calling | Success, PyRUA-Lean | LLM calls | Input tokens | Cost |
117: |---|---|---|---|---|---|
118: | LIBERO-PRO | 83.0 | **94.0** | 21.4 → 8.4 | 1.23M → 273k | $2.49 → $0.79 |
119: | RoboTwin 2.0 | 60.0 | **69.2** | 12.2 → 8.9 | 415k → 245k | $1.00 → $0.66 |
120: | RC365 atomic | 78.9 | **86.7** | 10.4 → 5.6 | 261k → 171k | $0.62 → $0.54 |
121: | RC365 composite | 34.4 | **39.4** | 28.4 → 14.9 | 1.22M → 603k | $2.01 → $1.25 |
122: | **All** | 63.1 | **71.7** | 17.0 → 8.7 | 788k → 276k | $1.63 → $0.74 |
123:
124: **RoboDojo** (success rate %, the leaderboard's average over its five dimensions; top entries of a snapshot
125: of the public leaderboard taken on October 9, 2026; the official evaluation was run by the RoboDojo team,
126: [full results](integrations/xpolicylab/evaluation/robodojo_summary_official.md)):
127:
128: | Entry | Type | Average | Gen. | Prec. | Long-Hor. | Memory | Open |
129: |---|---|---|---|---|---|---|---|
130: | **PyRUA-Lean** (GPT-6 Astra), official evaluation | Agent | **50.35** | 43.17 | **38.25** | 43.75 | **68.33** | 58.25 |
131: | **PyRUA-Lean** (GPT-6 Astra), our run | Agent | **51.62** | **45.83** | 37.25 | **48.00** | 63.00 | **64.00** |
132: | VPP2 | WAM | 32.26 | 29.50 | 35.17 | 37.00 | 55.56 | 4.08 |
133: | PhysicalRSI | Agent + VLA | 31.38 | 15.62 | 32.50 | 37.33 | 46.56 | 24.92 |
134: | Awomo-0.5 | WAM | 29.64 | 23.84 | 33.50 | 26.75 | 41.22 | 22.92 |
135: | Simate-beta | VLA | 27.96 | 27.95 | 26.92 | 43.42 | 33.00 | 8.50 |
136:
137: **PyRUA-Lean Coder v0.1-4B** (success rate %, PyRUA-Lean framework):
138:
139: | Planner | Trained on (45) | LIBERO-PRO other (155) | RoboTwin 2.0 (250) | RC365 atomic (90) | RC365 composite (160) | All unseen (655) |
140: |---|---|---|---|---|---|---|
141: | Qwen3.5-4B | 37.8 | 13.5 | 14.0 | 52.2 | 12.5 | 18.8 |
142: | Qwen3.5-27B | 64.4 | **38.1** | 20.8 | 65.6 | 13.1 | 29.2 |
143: | **PyRUA-Lean Coder v0.1-4B** | **71.1** | 37.4 | **52.4** | **76.7** | **19.4** | **44.1** |
144:
145: ## 📖 Citation
146:
147: If you use PyRUA-Lean, please cite our paper:
148:
149: ```bibtex
150: @article{si2026fewer,
151:   title={Fewer tokens, better action: GPT-6 Astra robot agents with 14\% higher success rate but 65\% fewer tokens},
152:   author={Si, Ruiyang and Bi, Jianxin and Yang, Shunyu and Ni, Rui and Huang, Wenbo and Wang, Qiang and Jiang, Shulong and Zhang, Yintianrun and Ruan, Feixiang and Zhang, Kewei and Wang, Duomin and Li, Xiuyu and Feng, Haiwen and Dong, Zhen and Zhou, Daquan},
153:   journal={arXiv preprint arXiv:2610.01939},
154:   year={2026}
155: }
156: ```
157:
158: ## 🤗 License and acknowledgements
159:
160: Apache License 2.0 ([LICENSE](LICENSE)). PyRUA-Lean builds on [RPent](https://github.com/RLinf/RPent)
161: (Apache-2.0): on LIBERO-PRO, RoboTwin 2.0 and RoboCasa365 its robot stacks, services and primitive implementations
162: do the work behind `robo`, the tool-calling baseline is RPent itself, and parts of this repository are adapted from
163: it; see `NOTICE`. If you use
164: RPent, please cite its paper, [Harness VLA: Steering Frozen VLAs into Reliable Manipulation Primitives via
165: Memory-Guided Agents](https://arxiv.org/abs/2607.08448).
166:
167: ## 🌟 Star History
168:
169: [![Star History Chart](https://api.star-history.com/svg?repos=DAGroup-PKU/PyRUA-Lean&type=Date)](https://star-history.com/#DAGroup-PKU/PyRUA-Lean&Date)
```

## docs/getting-started/how-it-works.md:1-67

```text
1: # How It Works
2:
3: A tool-calling agent spends a full LLM call on every small step of a task and re-sends everything before it each
4: time. A PyRUA-Lean agent writes code against a robot object, `robo`, instead: one call can find an object, move
5: above it, grasp, check the gripper and try again.
6:
7: ## What the agent gets
8:
9: One tool, `python(code)`, over a persistent namespace that holds `robo` (and `np`, `math`, `time`). Variables,
10: functions and files the agent made stay there from one cell to the next. A second tool, `finish`, ends the episode.
11: The code runs in a sandbox: a fixed set of imports, file access confined to its workspace, and no handle to the
12: simulator behind `robo`.
13:
14: This is one cell exactly as GPT-6 Astra wrote it in a LIBERO-PRO episode, placing a held bowl on a plate; the three
15: comment lines are ours, and `plate` was located by an earlier cell:
16:
17: ```python
18: # compose: compute a placement target from the scene geometry
19: held_at_plate = robo.segment(point=(314, 795))
20: print('bowl above plate', held_at_plate)
21: assert held_at_plate.found
22: correction = np.array(plate.world_xyz[:2]) - np.array(held_at_plate.world_xyz[:2])
23: place_xy = np.array(robo.state().eef_pos[:2]) + correction
24: surface_map = robo.world_map()
25: bowl_patch = surface_map[290:365, 740:850]
26: bowl_heights = bowl_patch[:,:,2]
27: bowl_heights = bowl_heights[(bowl_heights>1.04) & (bowl_heights<1.17)]
28: bottom_z = float(np.quantile(bowl_heights, 0.02))
29: placement_z = plate.world_xyz[2] + robo.state().eef_pos[2] - bottom_z + 0.007
30: print('correction', correction, 'bottom', bottom_z, 'placement z', placement_z)
31: assert np.linalg.norm(correction)<0.07 and 0.95<placement_z<1.05
32: # compose: lower, check, and release within the cell
33: lower = robo.move_to([*place_xy, placement_z], gripper=+1, step_clip=0.012, tol=0.005, max_steps=100)
34: print('lower', lower)
35: if lower.reached and not robo.done:
36:     print('release', robo.release())
37: print('done', robo.done)
38: # select: ask for an image only if the task is unfinished
39: if not robo.done:
40:     robo.show('agentview')
41: ```
42:
43: The cell printed five lines and asked for no image: the bowl was on the plate and the task was done. With tool
44: calling, the same step took four LLM calls, and every move returned three camera images.
45:
46: ## What `robo` returns
47:
48: - **Results, not exceptions.** A motion blocks until it is done and returns what actually happened
49:   (`Move.reached`, `Pick.success`, ...); a mask that was not found is a result too. Only misuse raises.
50: - **A finished episode stops everything.** Once the benchmark's success check fires, `robo.done` is true and every
51:   further motion is refused. RoboDojo judges only the final scene: its robot has no `done`, and RoboDojo's client
52:   ends the episode itself when the task is solved.
53: - **Every call is recorded**, with its arguments, its outcome and the simulator steps it took.
54:
55: Each [robot page](../robots/index.md) lists that robot's primitives and the full API reference.
56:
57: ## What the model reads
58:
59: 1. The contract: what to do, how the code is run, how the episode is judged.
60: 2. The API reference of `robo`, generated from the robot class itself, so it cannot drift from the code
61:    (`pyrualean api` prints LIBERO-PRO's; each robot page shows its own).
62: 3. The robot's knowledge text: frames, units, how the primitives behave, what to watch out for. The same for every
63:    task; no task recipes.
64: 4. A task card: the instruction, the first camera images and the robot's starting state. Nothing privileged.
65:
66: A `play` episode saves the whole prompt its model read as `prompt.txt` in the run directory; `pyrualean prompt`
67: prints the prompt of a single shot (`generate`).
```

## docs/models/coder.md:1-49

```text
1: # PyRUA-Lean Coder v0.1-4B
2:
3: [:simple-huggingface: DAGroup-PKU/PyRUA-Lean-Coder-v0.1-4B](https://huggingface.co/DAGroup-PKU/PyRUA-Lean-Coder-v0.1-4B){ .md-button .md-button--primary }
4:
5: **PyRUA-Lean Coder v0.1-4B** is Qwen3.5-4B trained with GRPO in the PyRUA-Lean framework, on 45 LIBERO-PRO task
6: instances, as its planner: it writes the cells, the primitives do the rest. On 655 task instances it never saw in
7: training it goes from **18.8% to 44.1%**, above the Qwen3.5-27B base model (29.2%).
8:
9: ## Results
10:
11: Success rate (%), PyRUA-Lean framework:
12:
13: | Planner | Trained on (45) | LIBERO-PRO other (155) | RoboTwin 2.0 (250) | RC365 atomic (90) | RC365 composite (160) | All unseen (655) |
14: |---|---|---|---|---|---|---|
15: | Qwen3.5-4B | 37.8 | 13.5 | 14.0 | 52.2 | 12.5 | 18.8 |
16: | Qwen3.5-27B | 64.4 | **38.1** | 20.8 | 65.6 | 13.1 | 29.2 |
17: | **PyRUA-Lean Coder v0.1-4B** | **71.1** | 37.4 | **52.4** | **76.7** | **19.4** | **44.1** |
18:
19: RoboTwin 2.0 and both RoboCasa365 sets are benchmarks it was not trained on at all; the LIBERO-PRO column of the
20: unseen part holds that benchmark's other tasks.
21:
22: ## Running the model
23:
24: An open model runs behind any OpenAI-compatible endpoint (a local SGLang or vLLM server, for example) and is driven
25: by the in-process loop of `pyrualean play --runtime openai` ([Agent Configuration](../guide/agents.md)). With SGLang:
26:
27: ```bash
28: python -m sglang.launch_server --model-path DAGroup-PKU/PyRUA-Lean-Coder-v0.1-4B --port 30000 \
29:     --context-length 65536 --tool-call-parser qwen3_coder --reasoning-parser qwen3 \
30:     --constrained-json-disable-any-whitespace
31: ```
32:
33: Then one LIBERO-PRO episode, on a task the model never saw in training (RPent's LIBERO-PRO stack installed as the
34: [Quick Start](../getting-started/quickstart.md) describes):
35:
36: ```bash
37: export RPENT_ROOT=/path/to/rpent OPENAI_API_KEY=none
38: pyrualean play --robot libero --arm cells --suite libero_goal_swap --task 3 --seed 0 \
39:     --runtime openai --base-url http://127.0.0.1:30000/v1 --api-key-env OPENAI_API_KEY \
40:     --model DAGroup-PKU/PyRUA-Lean-Coder-v0.1-4B \
41:     --openai-max-tokens 8192 --openai-tool-choice required --openai-temperature 1.0 \
42:     --openai-extra-body '{"top_p": 0.95, "top_k": 20}' \
43:     --images on-demand --feedback pure --guides --max-turns 40 --budget-s 5400 \
44:     --out runs/coder-demo --cuda-device 0
45: pyrualean summarize runs/coder-demo
46: ```
47:
48: These are the settings of the paper's evaluation: a reply of at most 8,192 tokens, a context of 65,536 tokens (an
49: episode that outgrows it ends there), at most 40 code cells and 90 minutes.
```

## integrations/xpolicylab/PyRUA_Lean/deploy.yml:1-42

```text
1: policy_name: PyRUA_Lean
2: protocol: ws
3: host: localhost
4: port: null
5: bench_name: null
6: task_name: null
7: ckpt_name: null
8: env_cfg_type: null
9: seed: null
10: action_type: joint
11: gpu_id: null
12: eval_batch: false
13:
14: # The robot the programs are written against, as `pyrualean play --robot` names it:
15: # RoboDojo's default observation, three colour images and the robot's state.  A depth image
16: # or camera matrices, should a client send them, are not read.
17: robot: robodojo_xpl_rgb
18: primitives: no-vla
19:
20: # The agent that writes the programs: an OpenAI-compatible chat endpoint (OPENAI_BASE_URL,
21: # OPENAI_API_KEY) and a model name (here, or PYRUALEAN_MODEL).
22: runtime: openai
23: model: null
24: max_turns: 100
25: budget_s: 5400
26: images: on-demand
27: feedback: pure
28: openai_options:
29:   max_tokens: 8192
30:   nudges: 20
31:   extra_body:
32:     reasoning_effort: high
33:
34: # One conversation drives one environment.  The policy server answers get_action within
35: # poll_s seconds whether or not the program has stepped (deploy.py asks again), so the
36: # client never waits on one request for as long as a model thinks.
37: poll_s: 20.0
38: # The verdict is acknowledged when the episode's record is written, at most this long (keep it
39: # far below the client's 120 s request timeout): the client exits after its last trial, and
40: # the policy server is stopped with it.
41: wrap_up_s: 30.0
42: result_dir: ./results
```

## integrations/xpolicylab/evaluation/robodojo_summary_official.md:1-104

```text
1: # RoboDojo Evaluation Summary (official)
2:
3: Run by the RoboDojo team with the `PyRUA_Lean` adapter in this directory, on all 42 tasks with seed 3; the file is
4: reproduced as they sent it. Our own run of the same adapter is in [robodojo_summary_rgb.md](robodojo_summary_rgb.md).
5:
6: ## Overview (by capability dimension)
7:
8: Progress † marks incomplete evaluation (42 = 42 tasks × seed 3). Cells show `mean ±std` across seeds; scores reflect completed cells only. Avg is the mean of all five dimension means. Policies are sorted by overall Avg SR.
9:
10: | Policy | Progress | Generalization SR (%) | Generalization Score | Precision SR (%) | Precision Score | Long-Horizon SR (%) | Long-Horizon Score | Memory SR (%) | Memory Score | Open SR (%) | Open Score | Avg SR (%) | Avg Score |
11: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
12: | PyRUA_Lean | 100% | 43.17 ±0.00 | 48.27 ±0.00 | 38.25 ±0.00 | 44.77 ±0.00 | 43.75 ±0.00 | 54.30 ±0.00 | 68.33 ±0.00 | 68.40 ±0.00 | 58.25 ±0.00 | 60.56 ±0.00 | 50.35 ±0.00 | 55.26 ±0.00 |
13:
14: ## Generalization: Standard vs Random (25 episodes each)
15:
16: Each cell shows `mean ±std` across seeds, averaged over the 12 Generalization tasks with completed data for that half. Δ = Random − Standard (mean SR). Sorted by Standard SR.
17:
18: | Policy | Standard SR (%) | Standard Score | Random SR (%) | Random Score | Δ SR | Δ Score |
19: | --- | ---: | ---: | ---: | ---: | ---: | ---: |
20: | PyRUA_Lean | 45.33 ±0.00 | 50.47 ±0.00 | 41.00 ±0.00 | 46.07 ±0.00 | -4.33 | -4.40 |
21:
22: ### Per-task Standard vs Random
23:
24: Additional view only: each of the 12 Generalization tasks is listed as the 25-episode standard split and its `_random` sibling. Columns match the per-policy all-task tables. Existing merged 50-episode scores are unchanged.
25:
26: #### PyRUA_Lean
27:
28: | Task | Seed 3 SR (%) | Seed 3 Score | Avg SR (%) | Avg Score |
29: | --- | ---: | ---: | ---: | ---: |
30: | <nobr>stack_bowls</nobr> | 80.00 | 82.40 | 80.00 ±0.00 | 82.40 ±0.00 |
31: | <nobr>stack_bowls_random</nobr> | 60.00 | 65.40 | 60.00 ±0.00 | 65.40 ±0.00 |
32: | <nobr>push_T</nobr> | 80.00 | 80.00 | 80.00 ±0.00 | 80.00 ±0.00 |
33: | <nobr>push_T_random</nobr> | 92.00 | 92.00 | 92.00 ±0.00 | 92.00 ±0.00 |
34: | <nobr>pack_objects_into_box</nobr> | 40.00 | 52.80 | 40.00 ±0.00 | 52.80 ±0.00 |
35: | <nobr>pack_objects_into_box_random</nobr> | 20.00 | 39.20 | 20.00 ±0.00 | 39.20 ±0.00 |
36: | <nobr>fold_clothes</nobr> | 52.00 | 58.40 | 52.00 ±0.00 | 58.40 ±0.00 |
37: | <nobr>fold_clothes_random</nobr> | 52.00 | 60.00 | 52.00 ±0.00 | 60.00 ±0.00 |
38: | <nobr>hang_mugs</nobr> | 4.00 | 27.00 | 4.00 ±0.00 | 27.00 ±0.00 |
39: | <nobr>hang_mugs_random</nobr> | 20.00 | 28.40 | 20.00 ±0.00 | 28.40 ±0.00 |
40: | <nobr>sweep_blocks</nobr> | 4.00 | 4.00 | 4.00 ±0.00 | 4.00 ±0.00 |
41: | <nobr>sweep_blocks_random</nobr> | 8.00 | 8.00 | 8.00 ±0.00 | 8.00 ±0.00 |
42: | <nobr>pour_liquid_into_cup</nobr> | 4.00 | 4.00 | 4.00 ±0.00 | 4.00 ±0.00 |
43: | <nobr>pour_liquid_into_cup_random</nobr> | 4.00 | 4.00 | 4.00 ±0.00 | 4.00 ±0.00 |
44: | <nobr>make_toast</nobr> | 16.00 | 26.00 | 16.00 ±0.00 | 26.00 ±0.00 |
45: | <nobr>make_toast_random</nobr> | 12.00 | 17.00 | 12.00 ±0.00 | 17.00 ±0.00 |
46: | <nobr>arrange_largest_number</nobr> | 80.00 | 83.80 | 80.00 ±0.00 | 83.80 ±0.00 |
47: | <nobr>arrange_largest_number_random</nobr> | 68.00 | 76.40 | 68.00 ±0.00 | 76.40 ±0.00 |
48: | <nobr>sort_nesting_dolls_by_size</nobr> | 84.00 | 84.00 | 84.00 ±0.00 | 84.00 ±0.00 |
49: | <nobr>sort_nesting_dolls_by_size_random</nobr> | 56.00 | 56.00 | 56.00 ±0.00 | 56.00 ±0.00 |
50: | <nobr>store_laptop_and_headphones</nobr> | 0.00 | 3.20 | 0.00 ±0.00 | 3.20 ±0.00 |
51: | <nobr>store_laptop_and_headphones_random</nobr> | 0.00 | 6.40 | 0.00 ±0.00 | 6.40 ±0.00 |
52: | <nobr>stack_blocks</nobr> | 100.00 | 100.00 | 100.00 ±0.00 | 100.00 ±0.00 |
53: | <nobr>stack_blocks_random</nobr> | 100.00 | 100.00 | 100.00 ±0.00 | 100.00 ±0.00 |
54: | **Avg Standard** | 45.33 | 50.47 | 45.33 ±0.00 | 50.47 ±0.00 |
55: | **Avg Random** | 41.00 | 46.07 | 41.00 ±0.00 | 46.07 ±0.00 |
56:
57: ## PyRUA_Lean
58:
59: | Task | Seed 3 SR (%) | Seed 3 Score | Avg SR (%) | Avg Score |
60: | --- | ---: | ---: | ---: | ---: |
61: | <nobr>align_blocks</nobr> | 76.00 | 76.00 | 76.00 ±0.00 | 76.00 ±0.00 |
62: | <nobr>arrange_largest_number</nobr> | 74.00 | 80.10 | 74.00 ±0.00 | 80.10 ±0.00 |
63: | <nobr>build_tower</nobr> | 4.00 | 23.20 | 4.00 ±0.00 | 23.20 ±0.00 |
64: | <nobr>classify_objects</nobr> | 96.00 | 97.10 | 96.00 ±0.00 | 97.10 ±0.00 |
65: | <nobr>classify_objects_by_language</nobr> | 92.00 | 94.60 | 92.00 ±0.00 | 94.60 ±0.00 |
66: | <nobr>cover_blocks</nobr> | 100.00 | 100.00 | 100.00 ±0.00 | 100.00 ±0.00 |
67: | <nobr>deposit_coin</nobr> | 40.00 | 44.00 | 40.00 ±0.00 | 44.00 ±0.00 |
68: | <nobr>fasten_screws</nobr> | 68.00 | 80.60 | 68.00 ±0.00 | 80.60 ±0.00 |
69: | <nobr>fill_egg_holder</nobr> | 6.00 | 21.20 | 6.00 ±0.00 | 21.20 ±0.00 |
70: | <nobr>fill_pen_holder</nobr> | 8.00 | 23.50 | 8.00 ±0.00 | 23.50 ±0.00 |
71: | <nobr>fold_clothes</nobr> | 52.00 | 59.20 | 52.00 ±0.00 | 59.20 ±0.00 |
72: | <nobr>general_pickup</nobr> | 86.00 | 86.00 | 86.00 ±0.00 | 86.00 ±0.00 |
73: | <nobr>hang_mugs</nobr> | 12.00 | 27.70 | 12.00 ±0.00 | 27.70 ±0.00 |
74: | <nobr>imitate_sorting_sequence</nobr> | 92.00 | 92.40 | 92.00 ±0.00 | 92.40 ±0.00 |
75: | <nobr>insert_key</nobr> | 0.00 | 0.00 | 0.00 ±0.00 | 0.00 ±0.00 |
76: | <nobr>insert_tubes</nobr> | 50.00 | 66.40 | 50.00 ±0.00 | 66.40 ±0.00 |
77: | <nobr>make_kong</nobr> | 0.00 | 0.00 | 0.00 ±0.00 | 0.00 ±0.00 |
78: | <nobr>make_toast</nobr> | 14.00 | 21.50 | 14.00 ±0.00 | 21.50 ±0.00 |
79: | <nobr>match_and_pick_from_conveyor</nobr> | 86.00 | 86.00 | 86.00 ±0.00 | 86.00 ±0.00 |
80: | <nobr>organize_table</nobr> | 4.00 | 25.00 | 4.00 ±0.00 | 25.00 ±0.00 |
81: | <nobr>pack_objects_into_box</nobr> | 30.00 | 46.00 | 30.00 ±0.00 | 46.00 ±0.00 |
82: | <nobr>pick_from_conveyor_by_image</nobr> | 22.00 | 22.00 | 22.00 ±0.00 | 22.00 ±0.00 |
83: | <nobr>play_Xylophone</nobr> | 62.00 | 62.00 | 62.00 ±0.00 | 62.00 ±0.00 |
84: | <nobr>play_stacking_toy</nobr> | 54.00 | 78.20 | 54.00 ±0.00 | 78.20 ±0.00 |
85: | <nobr>play_tic_tac_toe</nobr> | 94.00 | 97.20 | 94.00 ±0.00 | 97.20 ±0.00 |
86: | <nobr>plug_in_charger</nobr> | 16.00 | 16.00 | 16.00 ±0.00 | 16.00 ±0.00 |
87: | <nobr>pour_balls_into_vase</nobr> | 66.00 | 66.00 | 66.00 ±0.00 | 66.00 ±0.00 |
88: | <nobr>pour_by_language</nobr> | 18.00 | 18.40 | 18.00 ±0.00 | 18.40 ±0.00 |
89: | <nobr>pour_liquid_into_cup</nobr> | 4.00 | 4.00 | 4.00 ±0.00 | 4.00 ±0.00 |
90: | <nobr>press_by_number</nobr> | 0.00 | 0.00 | 0.00 ±0.00 | 0.00 ±0.00 |
91: | <nobr>push_T</nobr> | 86.00 | 86.00 | 86.00 ±0.00 | 86.00 ±0.00 |
92: | <nobr>put_bottles_into_dustbin</nobr> | 88.00 | 92.20 | 88.00 ±0.00 | 92.20 ±0.00 |
93: | <nobr>solve_equation</nobr> | 72.00 | 72.00 | 72.00 ±0.00 | 72.00 ±0.00 |
94: | <nobr>sort_nesting_dolls_by_size</nobr> | 70.00 | 70.00 | 70.00 ±0.00 | 70.00 ±0.00 |
95: | <nobr>stack_blocks</nobr> | 100.00 | 100.00 | 100.00 ±0.00 | 100.00 ±0.00 |
96: | <nobr>stack_blocks_by_language</nobr> | 100.00 | 100.00 | 100.00 ±0.00 | 100.00 ±0.00 |
97: | <nobr>stack_bowls</nobr> | 70.00 | 73.90 | 70.00 ±0.00 | 73.90 ±0.00 |
98: | <nobr>store_laptop_and_headphones</nobr> | 0.00 | 4.80 | 0.00 ±0.00 | 4.80 ±0.00 |
99: | <nobr>store_tools_in_toolbox</nobr> | 0.00 | 15.50 | 0.00 ±0.00 | 15.50 ±0.00 |
100: | <nobr>swap_T</nobr> | 92.00 | 92.00 | 92.00 ±0.00 | 92.00 ±0.00 |
101: | <nobr>swap_blocks</nobr> | 40.00 | 40.00 | 40.00 ±0.00 | 40.00 ±0.00 |
102: | <nobr>sweep_blocks</nobr> | 6.00 | 6.00 | 6.00 ±0.00 | 6.00 ±0.00 |
103: | **Avg (per seed)** | 48.81 | 53.97 | 48.81 ±0.00 | 53.97 ±0.00 |
104:
```

## src/pyrualean/play.py:580-643

```text
580:     toolkit = None
581:     daemons: list[Any] = []
582:     server = None
583:     ledger = Ledger()
584:     arm_toolkit: ArmToolkit | None = None
585:     try:
586:         toolkit, daemons = host.boot(cell, out_dir, rpent_root=rpent_root, **boot_options)
587:         result["host"]["boot_options"] = _recordable(boot_options)
588:         if runtime == "codex":
589:             result["host"]["codex_context"] = _codex_context_config(codex_home)
590:         result["host"]["sandbox"] = SANDBOX_DESCRIPTION
591:         with contextlib.suppress(FileNotFoundError):  # a host that runs nothing of RPent's
592:             result["host"]["rpent_root"] = str(resolve_rpent_root(rpent_root))
593:         result["startup_s"] = time.perf_counter() - started
594:         backend = _make_backend(host, toolkit)
595:         card = host.dump_card(toolkit, cell, out_dir)
596:         result["task_language"] = card.task_language
597:         robo = adapter.robot_cls(backend, ledger=ledger, primitives=primitives)
598:         # The contract tells the agent its working directory is the scratch
599:         # workspace; make that true for code run by the `python` tool as well
600:         # (Codex's own shell already runs there via `-C`).  Everything the
601:         # host touches from here on uses absolute paths.
602:         os.chdir(workspace)
603:         arm_toolkit = ArmToolkit(
604:             robo,
605:             arm=arm,
606:             workspace=workspace,
607:             max_programs=max_programs,
608:             program_timeout_s=budget_s,
609:             images=images,
610:             feedback=feedback,
611:             max_turns=max_turns,
612:         )
613:         from .mcp_server import ArmMcpServer
614:
615:         # Tools are published as read-only/non-destructive so Codex executes
616:         # them under ``approval_policy = "never"`` without a reviewer model.
617:         server = ArmMcpServer(
618:             arm_toolkit,
619:             annotations={"readOnlyHint": True, "destructiveHint": False, "openWorldHint": False},
620:         )
621:         mcp_url = server.start()
622:         prompt = build_prompt(
623:             arm,
624:             card,
625:             budget_s=int(budget_s),
626:             max_programs=max_programs,
627:             images=images,
628:             feedback=feedback,
629:             guides=guides,
630:             budget_mode="calls" if max_turns else "wall",
631:             adapter=adapter,
632:             primitives=primitives,
633:         )
634:         (out_dir / "prompt.txt").write_text(prompt, encoding="utf-8")
635:         result["prompt"] = {
636:             "chars": len(prompt),
637:             "sha256": hashlib.sha256(prompt.encode("utf-8")).hexdigest(),
638:             "images": list(card.images.values()),
639:         }
640:         events_path = out_dir / f"{runtime}_events.jsonl"
641:         stderr_path = out_dir / f"{runtime}_stderr.txt"
642:         # Fresh event/stderr logs for this episode; retries below append.
643:         events_path.write_bytes(b"")
```

## src/pyrualean/arms.py:134-198

```text
134: class ArmToolkit:
135:     """MCP-servable tool surface around one robot (a :class:`RobotBase`)."""
136:
137:     def __init__(
138:         self,
139:         robo: RobotBase,
140:         *,
141:         arm: str,
142:         workspace: Path,
143:         max_programs: int | None = None,
144:         program_timeout_s: float | None = None,
145:         images: bool | str = True,
146:         feedback: str = "rich",
147:         max_turns: int | None = None,
148:     ) -> None:
149:         if arm not in ARMS:
150:             raise ValueError(f"arm must be one of {ARMS}, got {arm!r}")
151:         if images is True:
152:             images = "on-motion"
153:         elif images is False:
154:             images = "none"
155:         if images not in IMAGE_POLICIES:
156:             raise ValueError(f"images must be one of {IMAGE_POLICIES}, got {images!r}")
157:         if feedback not in FEEDBACK_MODES:
158:             raise ValueError(f"feedback must be one of {FEEDBACK_MODES}, got {feedback!r}")
159:         self.feedback = feedback
160:         self.robo = robo
161:         self.arm = arm
162:         self.workspace = Path(workspace)
163:         self.workspace.mkdir(parents=True, exist_ok=True)
164:         self.max_programs = max_programs
165:         self.program_timeout_s = program_timeout_s
166:         #: Decision budget: at most this many `python` / `run_program` calls.
167:         self.max_turns = max_turns
168:         self.turn_budget_exhausted = False
169:         self.images = images
170:         self.finish: dict[str, Any] | None = None
171:         self.turns: list[dict[str, Any]] = []
172:         self._lock = threading.Lock()
173:         self._displayed: list[Any] = []
174:         #: Audit flags of every cell / program that raised any (host-side only).
175:         self.sandbox_flags: list[dict[str, Any]] = []
176:         self._last_flags: list[str] = []
177:         self._builtins = make_builtins(self.workspace)
178:         self._globals: dict[str, Any] = {
179:             "__name__": "__policy__",
180:             "__builtins__": self._builtins,
181:             "robo": robo,
182:             "math": math,
183:             "time": time,
184:             "display": self._display,
185:             "log": print,
186:         }
187:         try:
188:             import numpy as np
189:
190:             self._globals["np"] = np
191:             self._globals["numpy"] = np
192:         except ImportError:  # pragma: no cover - numpy is expected at runtime
193:             pass
194:         self._cell_index = 0
195:         self._program_index = 0
196:
197:     def _display(self, image: Any) -> None:
198:         """Attach an image (numpy array, PIL image or PNG bytes) to this turn's result."""
```

## src/pyrualean/arms.py:263-441

```text
263:     def execute_tool(self, name: str, input_dict: dict[str, Any]) -> ArmResult:
264:         with self._lock:
265:             started = time.perf_counter()
266:             calls_before = len(self.robo._ledger)
267:             steps_before = self.robo._backend.env_steps()
268:             try:
269:                 if name == "finish":
270:                     result = self._finish(input_dict)
271:                 elif name == "python" and self.arm == "cells":
272:                     result = self._python(str(input_dict.get("code", "")))
273:                 elif name == "run_program" and self.arm == "program":
274:                     result = self._run_program(input_dict)
275:                 else:
276:                     result = ArmResult({"error": f"unknown tool: {name}"})
277:             except Exception as exc:  # noqa: BLE001 - never crash the server
278:                 result = ArmResult({"error": f"{type(exc).__name__}: {exc}"})
279:             moved_flag = any(r.stateful for r in self.robo._ledger.records[calls_before:])
280:             steps_after = self.robo._backend.env_steps()
281:             steps_delta = (
282:                 steps_after - steps_before
283:                 if steps_before is not None and steps_after is not None
284:                 else None
285:             )
286:             flags, self._last_flags = self._last_flags, []
287:             self.turns.append(
288:                 {
289:                     "index": len(self.turns),
290:                     "tool": name,
291:                     "elapsed_s": round(time.perf_counter() - started, 3),
292:                     "ok": "error" not in result.result,
293:                     "moved": bool(result.result.get("moved", moved_flag)),
294:                     "env_steps": result.result.get("env_steps", steps_delta),
295:                     "terminated": self.robo._reported_success(),
296:                     "sandbox_flags": flags,
297:                 }
298:             )
299:             if flags:
300:                 self.sandbox_flags.append({"turn": len(self.turns) - 1, "flags": flags})
301:             return result
302:
303:     # -- tools ----------------------------------------------------------------
304:
305:     def _finish(self, args: dict[str, Any]) -> ArmResult:
306:         self.finish = {
307:             "status": str(args.get("status", "")),
308:             "summary": str(args.get("summary", "")),
309:         }
310:         if self._live_success():
311:             self.finish["environment_terminated"] = self.robo._reported_success()
312:         return ArmResult({"ok": True, **self.finish})
313:
314:     def _live_success(self) -> bool:
315:         """Whether the robot reports task success during the episode (it has ``done``).
316:
317:         Without it the feedback carries no success field at all: a constant
318:         False would read as "not solved yet".
319:         """
320:         return "done" not in getattr(self.robo, "ABSENT_MEMBERS", ())
321:
322:     def _snapshot(self) -> tuple[int, int | None]:
323:         return len(self.robo._ledger), self.robo._backend.env_steps()
324:
325:     def _feedback(self, before: tuple[int, int | None], extra: dict[str, Any]) -> ArmResult:
326:         calls_before, steps_before = before
327:         records = self.robo._ledger.records[calls_before:]
328:         moved = any(r.stateful for r in records)
329:         steps_after = self.robo._backend.env_steps()
330:         result: dict[str, Any] = dict(extra)
331:         if self.feedback == "pure":
332:             return self._attach_images(result, moved, {})
333:         result["primitive_calls"] = [
334:             {
335:                 "tool": r.tool,
336:                 "kwargs": r.kwargs,
337:                 "ok": r.ok,
338:                 "error": r.error,
339:                 **{k: v for k, v in r.summary.items() if k != "eef_pos"},
340:             }
341:             for r in records
342:             if r.tool not in ("artifact",)
343:         ][-40:]
344:         result["moved"] = moved
345:         result["env_steps"] = (
346:             steps_after - steps_before
347:             if steps_before is not None and steps_after is not None
348:             else None
349:         )
350:         result["state"] = _state_dict(self.robo)
351:         if self._live_success():
352:             result["episode_done"] = self.robo._reported_success()
353:         return self._attach_images(result, moved, result)
354:
355:     def _attach_images(
356:         self, result: dict[str, Any], moved: bool, _unused: dict[str, Any]
357:     ) -> ArmResult:
358:         images: list[bytes] = []
359:         requested = self.robo._take_show_requests()
360:         if self.images == "on-motion" and moved:
361:             wanted = list(type(self.robo).ON_MOTION_IMAGES)
362:         elif self.images == "on-demand":
363:             wanted = self.robo._show_artifacts(requested)
364:         else:
365:             wanted = []
366:         attached: list[str] = []
367:         for name in wanted:
368:             try:
369:                 images.append(self.robo.artifact(name))
370:                 attached.append(name)
371:             except Exception:  # noqa: BLE001 - image is optional
372:                 continue
373:         displayed, self._displayed = self._displayed, []
374:         for index, item in enumerate(displayed):
375:             try:
376:                 images.append(_to_png(item))
377:                 attached.append(f"display_{index}")
378:             except Exception as exc:  # noqa: BLE001 - reported, not fatal
379:                 result.setdefault("display_errors", []).append(f"{type(exc).__name__}: {exc}")
380:         if attached:
381:             result["images"] = attached
382:         return ArmResult(result, images)
383:
384:     def _budget_left(self, used: int) -> bool:
385:         """False once the decision budget is spent; ends the episode on the robot."""
386:         if self.max_turns is None or used < self.max_turns:
387:             return True
388:         if not self.turn_budget_exhausted:
389:             self.turn_budget_exhausted = True
390:             self.robo._stop_episode("call_budget")
391:         return False
392:
393:     def _python(self, code: str) -> ArmResult:
394:         if not self._budget_left(self._cell_index):
395:             return ArmResult(
396:                 {
397:                     "error": "call budget exhausted: the episode is over, call finish",
398:                     "cell": self._cell_index,
399:                 }
400:             )
401:         self._cell_index += 1
402:         index = self._cell_index
403:         (self.workspace / f"cell_{index:03d}.py").write_text(code, encoding="utf-8")
404:         self._last_flags = audit_source(code, workspace=self.workspace)
405:         before = self._snapshot()
406:         stdout, stderr = io.StringIO(), io.StringIO()
407:         extra: dict[str, Any] = {"cell": index}
408:         blocked = blocked_names(code)
409:         if blocked:
410:             extra["exception"] = _blocked_message(blocked, "cell")
411:             return self._feedback(before, extra)
412:         started = time.perf_counter()
413:         try:
414:             tree = ast.parse(code, filename=f"<cell {index}>")
415:         except SyntaxError as exc:
416:             extra["exception"] = f"SyntaxError: {exc}"
417:             return self._feedback(before, extra)
418:         tail: ast.Expr | None = None
419:         if tree.body and isinstance(tree.body[-1], ast.Expr):
420:             tail = tree.body.pop()  # type: ignore[assignment]
421:         try:
422:             with contextlib.redirect_stdout(stdout), contextlib.redirect_stderr(stderr):
423:                 exec(  # noqa: S102 - the whole point of this arm
424:                     compile(tree, f"<cell {index}>", "exec"), self._globals
425:                 )
426:                 if tail is not None:
427:                     value = eval(  # noqa: S307 - trailing expression echo
428:                         compile(ast.Expression(tail.value), f"<cell {index}>", "eval"),
429:                         self._globals,
430:                     )
431:                     if value is not None:
432:                         extra["value"] = _trim(repr(value), 4000)
433:         except EpisodeFinished as exc:
434:             extra["episode_finished"] = exc.reason
435:         except SystemExit as exc:  # exit()/quit() are removed, sys is not importable
436:             extra["exception"] = f"SystemExit: {exc}"
437:         except Exception:  # noqa: BLE001 - reported to the agent
438:             extra["exception"] = _trim(traceback.format_exc(), 4000)
439:         extra["stdout"] = _trim(stdout.getvalue())
440:         extra["stderr"] = _trim(stderr.getvalue())
441:         extra["elapsed_s"] = round(time.perf_counter() - started, 2)
```

## src/pyrualean/_robot.py:46-340

```text
46: class RobotBase:
47:     """Shared machinery of every robot class (see the module docstring)."""
48:
49:     #: RPent robot name (``rpent --robot <NAME>``) and the knowledge file stem.
50:     NAME: ClassVar[str] = ""
51:     #: Public methods that run a learned VLA policy.  Under the ``no-vla``
52:     #: primitive set they are left out of the API reference (with the result
53:     #: types only they return) and every call raises :data:`NO_VLA_MESSAGE`.
54:     VLA_PRIMITIVES: ClassVar[tuple[str, ...]] = ()
55:     #: ``(old, new)`` edits applied to the rendered API reference under
56:     #: ``no-vla``: the sentences of the *remaining* docstrings that describe
57:     #: the VLA.  Each ``old`` must occur exactly once, so a docstring change
58:     #: fails loudly instead of leaking a VLA mention.
59:     VLA_REFERENCE_EDITS: ClassVar[tuple[tuple[str, str], ...]] = ()
60:     #: Camera names accepted by :meth:`image`, :meth:`world_map` and :meth:`show`.
61:     CAMERAS: ClassVar[tuple[str, ...]] = ()
62:     #: ``(camera, resolution) -> recorded image artifact name``.
63:     IMAGE_ARTIFACTS: ClassVar[dict[tuple[str, str], str]] = {}
64:     #: ``(camera, resolution) -> recorded world-map artifact name`` (``.npz``).
65:     WORLD_MAP_ARTIFACTS: ClassVar[dict[tuple[str, str], str]] = {}
66:     #: Artifacts attached to a tool result after a turn that moved the robot
67:     #: (the ``on-motion`` image policy) and the resolution ``show`` uses.
68:     ON_MOTION_IMAGES: ClassVar[tuple[str, ...]] = ()
69:     SHOW_RESOLUTION: ClassVar[str] = "high"
70:     #: Tools that advance the simulator (recorded as stateful in the ledger).
71:     STATEFUL_TOOLS: ClassVar[frozenset[str]] = frozenset()
72:     #: Payload keys copied into the ledger summary of a call.
73:     SUMMARY_KEYS: ClassVar[tuple[str, ...]] = (
74:         "terminated",
75:         "truncated",
76:         "success",
77:         "final_dist_m",
78:         "final_eef_pos",
79:         "steps_used",
80:         "chunks_used",
81:         "found",
82:         "score",
83:         "world_xyz",
84:         "center_xyz",
85:         "step",
86:     )
87:     #: Read-only tool that returns the observation envelope of a recorded step.
88:     STATE_TOOL: ClassVar[str] = "view_env_state"
89:     #: Members of this base class that the robot does not have (``"done"`` when
90:     #: its benchmark reports no success while the episode runs, ``"world_map"``
91:     #: when it records none).  They are left out of the API reference, and the
92:     #: robot class makes them raise instead of answering with a constant.
93:     ABSENT_MEMBERS: ClassVar[frozenset[str]] = frozenset()
94:
95:     def __init__(self, backend: Backend, *, ledger: Ledger | None = None, primitives: str = "full"):
96:         if primitives not in PRIMITIVE_SETS:
97:             raise ValueError(f"primitives must be one of {PRIMITIVE_SETS}, got {primitives!r}")
98:         self._backend = backend
99:         self._ledger = ledger if ledger is not None else Ledger()
100:         self._last_state: Any = None
101:         self._done = False
102:         self._truncated = False
103:         self._stop_reason: str | None = None
104:         self._show_requests: list[str] = []
105:         self._primitives = primitives
106:         self._hidden: frozenset[str] = (
107:             frozenset(self.VLA_PRIMITIVES) if primitives == "no-vla" else frozenset()
108:         )
109:         # Instance attributes shadow the class methods, so a hidden primitive
110:         # is refused before any argument validation, whatever it was called with.
111:         for name in self._hidden:
112:             setattr(self, name, functools.partial(self._refuse_hidden, name))
113:
114:     # -- host-facing helpers (not part of the policy API) -------------------
115:
116:     def _refuse_hidden(self, name: str, *args: Any, **kwargs: Any) -> Any:
117:         """Record and refuse a call to a primitive outside the run's primitive set."""
118:         message = NO_VLA_MESSAGE.format(name=name)
119:         record = self._ledger.open(
120:             name, {"args": list(args), **kwargs} if args else kwargs, stateful=False
121:         )
122:         record.error = f"RuntimeError: {message}"
123:         raise RuntimeError(message)
124:
125:     def _take_show_requests(self) -> list[str]:
126:         """Return and clear the cameras requested through :meth:`show`."""
127:         requests, self._show_requests = self._show_requests, []
128:         return requests
129:
130:     def _show_artifacts(self, cameras: list[str]) -> list[str]:
131:         """Artifact names to attach for ``show`` requests."""
132:         return [
133:             self.IMAGE_ARTIFACTS[(camera, self.SHOW_RESOLUTION)]
134:             for camera in cameras
135:             if (camera, self.SHOW_RESOLUTION) in self.IMAGE_ARTIFACTS
136:         ]
137:
138:     def _reported_success(self) -> bool:
139:         """Whether the benchmark has reported task success during the episode.
140:
141:         The hosts ask this instead of ``done``: a robot whose benchmark judges
142:         only the final scene has no ``done`` at all and answers False here.
143:         """
144:         return self._done or bool(self._backend.solved())
145:
146:     def _stop_episode(self, reason: str) -> None:
147:         """Make every further motion call raise ``EpisodeFinished``."""
148:         self._stop_reason = reason
149:         try:
150:             self._backend.cancel()
151:         except Exception:  # noqa: BLE001 - best effort during shutdown
152:             pass
153:
154:     # -- to be provided by each robot ---------------------------------------
155:
156:     def _state_from_envelope(self, envelope: dict[str, Any]) -> Any:
157:         raise NotImplementedError
158:
159:     def _summary_dict(self) -> dict[str, Any]:
160:         """A few numbers describing the current state (host-facing, shown per turn)."""
161:         raise NotImplementedError
162:
163:     # -- observation shared by every robot ----------------------------------
164:
165:     @property
166:     def task(self) -> str:
167:         """The task instruction given by the benchmark (authoritative)."""
168:         return str(getattr(self._current_state(), "task", ""))
169:
170:     @property
171:     def done(self) -> bool:
172:         """True once the benchmark's success predicate has fired (sticky)."""
173:         return self._reported_success()
174:
175:     def state(self, step: int = -1) -> Any:
176:         """Read the recorded proprioceptive state of step ``step`` (``-1`` = latest)."""
177:         payload = self._readonly(self.STATE_TOOL, {"step": int(step)})
178:         state = self._state_from_envelope(payload)
179:         if step == -1:
180:             self._last_state = state
181:         return state
182:
183:     def image(self, camera: str, *, resolution: str = "high", step: int = -1) -> Any:
184:         """Load a recorded camera image as a ``numpy`` uint8 array (H, W, 3), RGB.
185:
186:         Pixel coordinates are (row, col) with row 0 at the top and col 0 at the
187:         left; pass the same ``camera`` and ``resolution`` to the back-projection
188:         helpers.  ``step`` selects the recorded step (``-1`` = latest).
189:         """
190:         data = self.artifact(self._image_name(camera, resolution), step=step)
191:         import numpy as np
192:         from PIL import Image
193:
194:         with Image.open(io.BytesIO(data)) as img:
195:             return np.asarray(img.convert("RGB"))
196:
197:     def world_map(self, camera: str, *, resolution: str = "high", step: int = -1) -> Any:
198:         """Load the per-pixel world coordinates of a recorded image.
199:
200:         Returns a ``numpy`` float array (H, W, 3): ``world_map[row, col]`` is
201:         the [x, y, z] of the surface seen at that pixel (zeros / non-finite
202:         where depth is invalid).  Load it to reason about many pixels at once.
203:         """
204:         key = (camera, resolution)
205:         if key not in self.WORLD_MAP_ARTIFACTS:
206:             raise ValueError(
207:                 f"no world map for camera={camera!r} resolution={resolution!r}; "
208:                 f"available: {sorted(self.WORLD_MAP_ARTIFACTS)}"
209:             )
210:         data = self.artifact(self.WORLD_MAP_ARTIFACTS[key], step=step)
211:         import numpy as np
212:
213:         loaded = np.load(io.BytesIO(data))
214:         if isinstance(loaded, np.ndarray):  # a bare .npy array
215:             return loaded
216:         with loaded as archive:  # an .npz archive: "array" or its first member
217:             name = "array" if "array" in archive.files else archive.files[0]
218:             return np.asarray(archive[name])
219:
220:     def show(self, camera: str) -> None:
221:         """Attach the current image of ``camera`` to the feedback of this turn.
222:
223:         Images are not returned automatically: call ``show(<camera>)`` when
224:         *you* (the author) need to look at the scene before writing the next
225:         turn.  Costs tokens: look only when a decision depends on it.
226:         """
227:         if camera not in self.CAMERAS:
228:             raise ValueError(f"camera must be one of {self.CAMERAS}")
229:         if camera not in self._show_requests:
230:             self._show_requests.append(camera)
231:
232:     def artifact(self, name: str, *, step: int = -1) -> bytes:
233:         """Return the raw bytes of a recorded artifact by name (advanced)."""
234:         record = self._ledger.open("artifact", {"name": name, "step": step}, stateful=False)
235:         started = time.perf_counter()
236:         try:
237:             data = self._backend.artifact(name, step=int(step))
238:             record.ok = True
239:             record.summary = {"bytes": len(data)}
240:             return data
241:         except BaseException as exc:
242:             record.error = f"{type(exc).__name__}: {exc}"
243:             raise
244:         finally:
245:             record.elapsed_s = time.perf_counter() - started
246:
247:     # -- internals ----------------------------------------------------------
248:
249:     @classmethod
250:     def _image_name(cls, camera: str, resolution: str) -> str:
251:         key = (camera, resolution)
252:         if key not in cls.IMAGE_ARTIFACTS:
253:             raise ValueError(
254:                 f"camera must be one of {cls.CAMERAS} and resolution one of "
255:                 f"{sorted({r for _, r in cls.IMAGE_ARTIFACTS})}"
256:             )
257:         return cls.IMAGE_ARTIFACTS[key]
258:
259:     def _current_state(self) -> Any:
260:         if self._last_state is None:
261:             return self.state()
262:         return self._last_state
263:
264:     def _guard(self) -> None:
265:         if self._stop_reason is not None:
266:             raise EpisodeFinished(self._stop_reason)
267:         if self._done:
268:             raise EpisodeFinished("terminated")
269:         if self._truncated:
270:             raise EpisodeFinished("truncated")
271:
272:     def _absorb(self, envelope: dict[str, Any] | None) -> None:
273:         """Record the latest state and latch the episode flags.
274:
275:         ``terminated`` / ``truncated`` come from the envelope and from the
276:         parsed state when it has attributes of those names, so a robot whose
277:         success flag RPent names differently (``eval_success``) or whose step
278:         budget RPent never reports maps them in ``_state_from_envelope``
279:         instead of overriding this method.
280:         """
281:         if envelope is None:
282:             return
283:         state = self._state_from_envelope(envelope)
284:         self._last_state = state
285:         if envelope.get("terminated") or getattr(state, "terminated", False):
286:             self._done = True
287:         if envelope.get("truncated") or getattr(state, "truncated", False):
288:             self._truncated = True
289:
290:     def _summary(self, tool: str, payload: dict[str, Any]) -> dict[str, Any]:
291:         return {key: payload[key] for key in self.SUMMARY_KEYS if key in payload}
292:
293:     def _readonly(
294:         self, tool: str, kwargs: dict[str, Any], *, allow_error_key: str | None = None
295:     ) -> dict[str, Any]:
296:         record = self._ledger.open(tool, kwargs, stateful=False)
297:         started = time.perf_counter()
298:         try:
299:             payload, envelope = unwrap(self._backend.execute_tool(tool, kwargs), tool)
300:             if envelope is not None:
301:                 # The state tool returns the observation envelope itself; for a
302:                 # read-only tool that envelope *is* the payload.
303:                 self._absorb(envelope)
304:                 payload = envelope
305:             if allow_error_key is None or allow_error_key not in payload:
306:                 raise_for_error(tool, payload)
307:             record.ok = True
308:             record.summary = self._summary(tool, payload)
309:             return payload
310:         except BaseException as exc:
311:             record.error = f"{type(exc).__name__}: {exc}"
312:             raise
313:         finally:
314:             record.elapsed_s = time.perf_counter() - started
315:
316:     def _stateful(
317:         self,
318:         tool: str,
319:         kwargs: dict[str, Any],
320:         build: Callable[[dict[str, Any]], Any],
321:     ) -> Any:
322:         self._guard()
323:         record = self._ledger.open(tool, kwargs, stateful=True)
324:         steps_before = self._backend.env_steps()
325:         started = time.perf_counter()
326:         try:
327:             payload, envelope = unwrap(self._backend.execute_tool(tool, kwargs), tool)
328:             self._absorb(envelope)
329:             if payload.get("interrupted") or payload.get("code") == "tool_cancelled":
330:                 raise EpisodeFinished(self._stop_reason or "cancelled")
331:             raise_for_error(tool, payload)
332:             result = build(payload)
333:             record.ok = True
334:             record.summary = self._summary(tool, payload)
335:             return result
336:         except BaseException as exc:
337:             record.error = f"{type(exc).__name__}: {exc}"
338:             raise
339:         finally:
340:             record.elapsed_s = time.perf_counter() - started
```

## src/pyrualean/openai_runtime.py:470-590

```text
470:             if response is None:
471:                 if over():
472:                     pass  # ended from outside while a request was being retried
473:                 elif remaining() <= 0:
474:                     status, returncode = "timeout", None
475:                 else:
476:                     status, returncode = "error", 2
477:                 break
478:             usage = _usage_fields(response.get("usage"))
479:             for key in totals:
480:                 totals[key] += usage[key]
481:             request_profile.append(totals["prompt"])  # cumulative, as the Claude runtime reports it
482:             choice = response["choices"][0]
483:             finish_reasons.append(choice.get("finish_reason"))
484:             message = choice.get("message") or {}
485:             calls = message.get("tool_calls") or []
486:             content = message.get("content")
487:             # A reply with no tool calls must replay with a string content: providers reject
488:             # {"role": "assistant", "content": null} without tool_calls (a thinking model that
489:             # spent its whole budget reasoning produces exactly that).
490:             assistant: dict[str, Any] = {
491:                 "role": "assistant",
492:                 "content": content if (calls or isinstance(content, str)) else "",
493:             }
494:             if calls:
495:                 assistant["tool_calls"] = calls
496:             reasoning = message.get("reasoning_content") or message.get("reasoning")
497:             recorded_extra = {"reasoning_content": reasoning} if reasoning else {}
498:             transcript.messages.append(assistant)
499:             transcript.recorded.append({**assistant, **recorded_extra})
500:             if isinstance(assistant["content"], str) and assistant["content"]:
501:                 last_text = assistant["content"]
502:             event(
503:                 "assistant",
504:                 tool_calls=[c.get("function", {}).get("name") for c in calls],
505:                 text_chars=len(assistant["content"] or "")
506:                 if isinstance(assistant["content"], str)
507:                 else 0,
508:                 reasoning_chars=len(reasoning or ""),
509:                 finish_reason=choice.get("finish_reason"),
510:                 usage=usage,
511:             )
512:             if not calls:
513:                 if tool_choice == "required":
514:                     warnings.append(
515:                         f"request {requests}: no tool call despite tool_choice=required "
516:                         f"(finish_reason={choice.get('finish_reason')!r})"
517:                     )
518:                 done = (
519:                     arm_toolkit.finish is not None
520:                     or arm_toolkit.robo._reported_success()
521:                     or arm_toolkit.turn_budget_exhausted
522:                 )
523:                 if done or nudges_left == 0:
524:                     break
525:                 nudges_left -= 1
526:                 transcript.add({"role": "user", "content": NUDGE_TEXT})
527:                 event("nudge", left=nudges_left)
528:                 continue
529:             # Images cannot ride in a `tool` message, and a `tool` message may not be separated
530:             # from its `tool_calls` by another role, so every call's images wait until the last
531:             # tool reply has been appended and then travel together in one `user` message.
532:             pending_images: list[tuple[str, bytes]] = []
533:             image_sources: list[str] = []
534:             malformed = 0
535:             for index, call in enumerate(calls):
536:                 function = call.get("function") or {}
537:                 name = function.get("name") or ""
538:                 call_id = call.get("id") or f"call_{requests}_{index}"
539:                 call["id"] = call_id  # the replayed assistant message must carry the id we answer
540:                 tool_calls[name] = tool_calls.get(name, 0) + 1
541:                 arguments, problem = _parse_arguments(function.get("arguments"))
542:                 t0 = time.perf_counter()
543:                 if problem:
544:                     malformed += 1
545:                     result = ArmResult({"error": problem})
546:                 else:
547:                     result = _execute_with_deadline(
548:                         arm_toolkit, name, arguments or {}, remaining(), stop_once
549:                     )
550:                 elapsed = time.perf_counter() - t0
551:                 tool_requests.append(
552:                     {"request": requests, "tool": name, "elapsed_s": round(elapsed, 3)}
553:                 )
554:                 transcript.add(
555:                     {"role": "tool", "tool_call_id": call_id, "content": _tool_result_text(result)}
556:                 )
557:                 names = result.result.get("images") or []
558:                 call_images: list[tuple[str, bytes]] = []
559:                 for position, data in enumerate(result.images):
560:                     label = names[position] if position < len(names) else f"image_{position}"
561:                     png, _ = _resize_png(data, image_max_side)
562:                     call_images.append(
563:                         (f"{label}.png" if not label.endswith(".png") else label, png)
564:                     )
565:                 if call_images:
566:                     image_sources.append(
567:                         f"{call_id} ({', '.join(name for name, _ in call_images)})"
568:                     )
569:                     pending_images.extend(call_images)
570:                 event(
571:                     "tool",
572:                     tool=name,
573:                     call_id=call_id,
574:                     elapsed_s=round(elapsed, 3),
575:                     ok="error" not in result.result,
576:                     images=len(call_images),
577:                     terminated=arm_toolkit.robo._reported_success(),
578:                 )
579:             if pending_images:
580:                 transcript.add(
581:                     {
582:                         "role": "user",
583:                         "content": IMAGE_NOTE.format(sources="; ".join(image_sources)),
584:                     },
585:                     pending_images,
586:                 )
587:             # `finish` only ends the episode when the toolkit actually recorded it: a call whose
588:             # arguments did not parse never reached the tool, and the agent must see the error.
589:             if arm_toolkit.finish is not None:
590:                 break
```

## src/pyrualean/sandbox.py:9-148

```text
9: """Execution sandbox and audit for model-written policy code.
10:
11: In-process Python cannot be sealed, so the sandbox does three things: it
12: removes the convenient routes out of the documented ``robo`` API (importing
13: ``os`` / ``subprocess`` / ``pathlib``, opening files outside the workspace,
14: ``eval`` / ``exec`` with fresh builtins), it refuses to run code that names
15: Python's introspection routes (``__globals__``, ``__func__``,
16: ``__subclasses__``, ...: :data:`BLOCKED_NAMES`, checked by
17: ``blocked_names``), and it records what a cell *tried* (``audit_source``),
18: so an episode that reached for the simulator's internals is visible in
19: ``result.json`` instead of silently counting as a success.
20: """
21:
22: from __future__ import annotations
23:
24: import ast
25: import builtins as _builtins
26: import os
27: from pathlib import Path
28: from typing import Any
29:
30: #: Top-level modules policy code may import: pure computation only.
31: ALLOWED_MODULES = frozenset(
32:     {
33:         "__future__",
34:         "abc",
35:         "array",
36:         "bisect",
37:         "cmath",
38:         "collections",
39:         "contextlib",
40:         "copy",
41:         "cv2",
42:         "dataclasses",
43:         "datetime",
44:         "decimal",
45:         "enum",
46:         "fractions",
47:         "functools",
48:         "heapq",
49:         "io",
50:         "itertools",
51:         "json",
52:         "math",
53:         "numbers",
54:         "numpy",
55:         "operator",
56:         "PIL",
57:         "pprint",
58:         "random",
59:         "re",
60:         "scipy",
61:         "skimage",
62:         "statistics",
63:         "string",
64:         "struct",
65:         "textwrap",
66:         "time",
67:         "traceback",
68:         "types",
69:         "typing",
70:         "warnings",
71:     }
72: )
73:
74: #: Builtins withheld from policy code (``open`` and ``__import__`` are
75: #: replaced by guarded versions).
76: REMOVED_BUILTINS = frozenset(
77:     {"exec", "eval", "compile", "__import__", "open", "breakpoint", "input", "help", "exit", "quit"}
78: )
79:
80: #: Introspection routes out of the documented API that policy code may not
81: #: name at all: a cell or program that reads one of these (as an attribute, a
82: #: bare name or a string constant) is refused before it runs.  ``__globals__``
83: #: / ``__func__`` were once used to patch the library at runtime;
84: #: ``__subclasses__`` reaches every loaded class.
85: BLOCKED_NAMES = frozenset(
86:     {
87:         "__builtins__",
88:         "__closure__",
89:         "__code__",
90:         "__func__",
91:         "__globals__",
92:         "__import__",
93:         "__loader__",
94:         "__self__",
95:         "__spec__",
96:         "__subclasses__",
97:         "__wrapped__",
98:     }
99: )
100:
101: DESCRIPTION = (
102:     "imports limited to pure-computation modules and workspace files, open() confined to "
103:     "the workspace, exec/eval/compile removed, code naming __globals__/__func__/__subclasses__-"
104:     "style introspection refused before it runs; every cell is audited (sandbox_flags)"
105: )
106:
107:
108: def _workspace_module(root: Path, top: str) -> bool:
109:     return bool(top) and ((root / f"{top}.py").is_file() or (root / top / "__init__.py").is_file())
110:
111:
112: def make_builtins(workspace: str | Path) -> dict[str, Any]:
113:     """Return a ``__builtins__`` mapping for code that runs on behalf of the model."""
114:
115:     root = Path(workspace).resolve()
116:     real_import = _builtins.__import__
117:     real_open = _builtins.open
118:
119:     def guarded_import(
120:         name: str,
121:         globals: Any = None,  # noqa: A002 - signature of builtins.__import__
122:         locals: Any = None,  # noqa: A002
123:         fromlist: Any = (),
124:         level: int = 0,
125:     ) -> Any:
126:         top = name.split(".")[0] if name else ""
127:         if level == 0 and top not in ALLOWED_MODULES and not _workspace_module(root, top):
128:             raise ImportError(
129:                 f"module {top!r} is not available inside the policy sandbox; available: "
130:                 f"{', '.join(sorted(ALLOWED_MODULES))}, and .py files in your workspace"
131:             )
132:         return real_import(name, globals, locals, fromlist, level)
133:
134:     def guarded_open(file: Any, mode: str = "r", *args: Any, **kwargs: Any) -> Any:
135:         if isinstance(file, int):
136:             raise PermissionError("policy code may not open file descriptors")
137:         target = Path(os.fspath(file))
138:         resolved = target.resolve() if target.is_absolute() else (root / target).resolve()
139:         if resolved != root and root not in resolved.parents:
140:             raise PermissionError(
141:                 f"policy code may only open files inside its workspace ({root}); got {file!r}"
142:             )
143:         return real_open(resolved, mode, *args, **kwargs)
144:
145:     namespace = {k: v for k, v in vars(_builtins).items() if k not in REMOVED_BUILTINS}
146:     namespace["__import__"] = guarded_import
147:     namespace["open"] = guarded_open
148:     return namespace
```

## src/pyrualean/hosts/xpolicylab_bridge.py:9-186

```text
9: """Between XPolicyLab's two calls and an environment a program steps.
10:
11: XPolicyLab's evaluation client owns the simulator and asks a policy for actions: it sends an
12: observation (``update_obs``) and asks what to do (``get_action``).  A PyRUA-Lean episode is the
13: other way round: a program calls a tool, the tool steps the environment and reads what came
14: of it.  :class:`Bridge` turns one into the other.  The policy server answers ``get_action``
15: with the next native action a tool has asked for; the tool's ``step`` returns when the client
16: has taken it and sent the observation that followed.
17:
18: A model thinks for minutes between two actions, far longer than the client waits for one
19: answer, so ``get_action`` never holds the client longer than ``poll_s``: when no tool has
20: stepped by then it answers :data:`WAIT`, and the adapter's ``deploy.py`` asks again.  An empty
21: answer means the program has finished.  ``deploy.py`` adds the episode's step count and limit
22: to each observation (``additional_info["pyrualean"]``) and reports the benchmark's verdict
23: when the episode is over (the protocol's ``trial_end``, which the server hands to
24: ``on_trial_end``).
25:
26: An older RoboDojo client's pictures run one observation behind its state (fixed upstream
27: in 6e3190f).  ``deploy.py`` says which client it is, and the bridge adds to each observation
28: the state its pictures show (``image_state``: the previous observation's for such a client),
29: which is what the tools take a wrist camera's pose from; where the client sends the cameras'
30: matrices, a late picture gets the matrix of the observation before as well.
31:
32: :class:`PolicyModel` is the object XPolicyLab's policy server serves (its ``Model``);
33: :func:`serve` runs that server in this process.
34: """
35:
36: from __future__ import annotations
37:
38: import asyncio
39: import threading
40: import time
41: from typing import Any
42:
43: #: ``get_action``'s answer while the program is still thinking.
44: WAIT = [{"pyrualean": "wait"}]
45: #: The key ``deploy.py`` puts the episode's status under, in an observation's additional_info.
46: STATUS_KEY = "pyrualean"
47:
48:
49: class EpisodeOver(RuntimeError):
50:     """The evaluation client has ended the episode: no observation will follow."""
51:
52:
53: class Bridge:
54:     """One episode's meeting point of the evaluation client and the tools."""
55:
56:     def __init__(self, poll_s: float = 20.0) -> None:
57:         self._cv = threading.Condition()
58:         self.poll_s = poll_s
59:         self._obs: dict[str, Any] | None = None
60:         self._serial = 0
61:         self._action: dict[str, Any] | None = None
62:         self._finished = False
63:         self._over: dict[str, Any] | None = None
64:         self._status: dict[str, Any] = {}
65:         self._pictured: Any = None
66:         self.resets = 0
67:
68:     # -- the evaluation client's side (the policy server calls these) -------------------------
69:
70:     def reset(self) -> None:
71:         with self._cv:
72:             self.resets += 1
73:             self._cv.notify_all()
74:
75:     def update_obs(self, obs: dict[str, Any]) -> None:
76:         with self._cv:
77:             info = (obs.get("additional_info") or {}).get(STATUS_KEY)
78:             if isinstance(info, dict):
79:                 self._status = dict(info)
80:             # An older RoboDojo client hands out the frame rendered before the current
81:             # physics state: its pictures are of the robot as the previous observation's
82:             # state has it (a wrist camera's picture fits that end-effector pose to a
83:             # millimetre, and the current one only while the arm stands still).  deploy.py
84:             # says which client this is; a current one's pictures show the state they come with.
85:             state = obs.get("state")
86:             poses = {
87:                 name: cam.get(key)
88:                 for name, cam in (obs.get("vision") or {}).items()
89:                 for key in ("extrinsic_matrix", "extrinsics_matrix")
90:                 if isinstance(cam, dict) and cam.get(key) is not None
91:             }
92:             behind = int(self._status.get("pictures_behind") or 0)
93:             if behind >= 1 and self._pictured is not None:
94:                 # ... and so are the camera poses it sends along (RoboDojo issue 38): a wrist
95:                 # camera's depth image belongs with the pose of the observation before
96:                 obs["image_state"], then = self._pictured
97:                 for name, cam in (obs.get("vision") or {}).items():
98:                     if name in then and isinstance(cam, dict):
99:                         for key in ("extrinsic_matrix", "extrinsics_matrix"):
100:                             if cam.get(key) is not None:
101:                                 cam[key] = then[name]
102:             else:
103:                 obs["image_state"] = state
104:             self._pictured = (state, poses)
105:             self._obs = obs
106:             self._serial += 1
107:             self._cv.notify_all()
108:
109:     def get_action(self) -> list[dict[str, Any]]:
110:         with self._cv:
111:             self._cv.wait_for(lambda: self._action is not None or self._finished, self.poll_s)
112:             if self._action is not None:
113:                 action, self._action = self._action, None
114:                 self._cv.notify_all()
115:                 return [action]
116:             return [] if self._finished else WAIT
117:
118:     def episode_end(self, info: dict[str, Any] | None) -> None:
119:         with self._cv:
120:             self._over = dict(info or {})
121:             self._cv.notify_all()
122:
123:     # -- the tools' side ------------------------------------------------------------------------
124:
125:     def first_obs(self, timeout_s: float, alive: Any = None) -> dict[str, Any]:
126:         """The first observation of the episode; ``alive()`` false means the client died."""
127:
128:         deadline = time.monotonic() + timeout_s
129:         with self._cv:
130:             while self._obs is None:
131:                 if self._over is not None:
132:                     raise EpisodeOver("the episode ended before it began")
133:                 if alive is not None and not alive():
134:                     raise RuntimeError("the evaluation client exited before its first observation")
135:                 left = deadline - time.monotonic()
136:                 if left <= 0:
137:                     raise TimeoutError(
138:                         f"no observation from the evaluation client in {timeout_s:.0f} s"
139:                     )
140:                 self._cv.wait(min(left, 2.0))
141:             return self._obs
142:
143:     def get_obs(self) -> dict[str, Any]:
144:         with self._cv:
145:             if self._obs is None:
146:                 raise RuntimeError("no observation yet")
147:             return self._obs
148:
149:     def status(self) -> dict[str, Any]:
150:         with self._cv:
151:             status = dict(self._status)
152:             if self._over is not None:
153:                 status["over"] = True
154:                 # nothing more can be done: the budget is what has been spent
155:                 status["step_limit"] = status.get("step", 0)
156:             return status
157:
158:     @property
159:     def over(self) -> dict[str, Any] | None:
160:         with self._cv:
161:             return None if self._over is None else dict(self._over)
162:
163:     def step(self, action: dict[str, Any], timeout_s: float = 600.0) -> dict[str, Any]:
164:         """Have the client take one native action; returns the observation that follows.
165:
166:         Raises :class:`EpisodeOver` when the client ended the episode on that action (the task
167:         is solved, or the budget is spent) or had ended it before.
168:         """
169:
170:         deadline = time.monotonic() + timeout_s
171:         with self._cv:
172:             if self._over is not None or self._finished:
173:                 raise EpisodeOver("the episode is over")
174:             before = self._serial
175:             self._action = action
176:             self._cv.notify_all()
177:             while self._serial == before and self._over is None:
178:                 left = deadline - time.monotonic()
179:                 if left <= 0:
180:                     self._action = None
181:                     raise TimeoutError(f"the evaluation client did not answer in {timeout_s:.0f} s")
182:                 self._cv.wait(min(left, 2.0))
183:             if self._serial == before:
184:                 raise EpisodeOver("the episode ended on this action")
185:             assert self._obs is not None
186:             return self._obs
```

## src/pyrualean/hosts/xpolicylab_robodojo_rgb.py:1-44

```text
1: # Copyright 2026 PyRUA-Lean Contributors.
2: #
3: # Licensed under the Apache License, Version 2.0 (the "License");
4: # you may not use this file except in compliance with the License.
5: # You may obtain a copy of the License at
6: #
7: #     https://www.apache.org/licenses/LICENSE-2.0
8:
9: """RoboDojo's evaluation client as it is configured: colour images and the robot's state.
10:
11: The host of ``--robot robodojo_xpl_rgb``: everything :mod:`.xpolicylab_robodojo` does, with
12: the client's configuration left alone and nothing read that it does not send by default (no
13: depth image, no camera matrices).
14: """
15:
16: from __future__ import annotations
17:
18: from pathlib import Path
19: from typing import Any
20:
21: from . import xpolicylab_robodojo as _base
22: from .xpolicylab_robodojo import (  # noqa: F401 - the host interface
23:     Cell,
24:     add_boot_args,
25:     add_cell_args,
26:     boot_options,
27:     cell_from_args,
28:     make_backend,
29: )
30:
31: ROBOT = "robodojo_xpl_rgb"
32:
33:
34: def boot(cell: Cell, out_dir: Path, **options: Any) -> tuple[Any, list[Any]]:
35:     """:func:`.xpolicylab_robodojo.boot` on the client's default observation."""
36:
37:     options["depth"] = False
38:     return _base.boot(cell, out_dir, **options)
39:
40:
41: def dump_card(toolkit: Any, cell: Cell, out_dir: Path) -> Any:
42:     return _base.dump_card(toolkit, cell, out_dir, robot=ROBOT)
43:
44:
```

## src/pyrualean/robodojo_xpl_rgb.py:102-320

```text
102: class RobodojoOfficialColourRobot(RobodojoRobot):
103:     """The RoboDojo dual-arm station: two 6-DoF ARX-X5 arms with parallel grippers at a table.
104:
105:     World frame: x runs across the table (the LEFT arm is at negative x and
106:     appears on the LEFT of the head image), y points away from the robot
107:     towards the far edge of the table, z is up; metres.  Orientations are unit
108:     quaternions ordered [w, x, y, z].  The arms are ``"left"`` and ``"right"``
109:     (``robo.LEFT`` / ``robo.RIGHT``); a motion call names one arm and holds
110:     the other where it is.
111:
112:     ``move_to`` drives an arm's GRASP POINT, the middle of the finger pads
113:     (``state().left.tcp_pos``), to a world position, with an orientation given
114:     in degrees: ``pitch`` is how far the gripper points below the horizontal
115:     (0 level, 90 straight down), ``yaw`` the heading of the pointing direction
116:     on the table (0 away from the robot, +90 towards the robot's left, -90
117:     towards its right) and ``roll`` the turn of the fingers about the pointing
118:     direction (0: side by side, as at the start).  Pointing straight down, the
119:     fingers close along the line at ``yaw`` degrees from +x (counter-clockwise
120:     seen from above): ``locate``'s ``grasp_yaw`` is that line across an
121:     object's narrow side.  The table
122:     surface is at z = 0.765; the arms stand on it at x = -0.30 and +0.30,
123:     y = -0.45.
124:
125:     Two gripper conventions, do not mix them up.  COMMANDS are signed:
126:     ``robo.CLOSE`` (1) closes, ``robo.OPEN`` (-1) opens, ``robo.KEEP`` (0)
127:     leaves the gripper as it is.  MEASUREMENTS (``state().left.gripper``,
128:     ``Gripper.opening``) are openings: 1.0 = open, 0.0 = closed on nothing.
129:
130:     Every native action (one step of ``move_to``, ``set_gripper`` or
131:     ``home``, one VLA action) counts against the episode's
132:     native-action budget; when it is spent the state reports ``truncated``
133:     and motion calls raise ``EpisodeFinished``.  Motion calls block until the
134:     primitive finishes and return a typed result; nothing is queued.
135:
136:     Perception is from colour images alone; there is no depth image.  A fixed
137:     head camera (``cam_head``, the whole table) and one wrist camera per arm
138:     (``cam_left_wrist``, ``cam_right_wrist``), 640x480 each, and where each
139:     one is, is known from the robot's state.  ``locate`` finds an object by a
140:     text prompt and measures it in 3D (centre, top, footprint, heading) from
141:     the cameras that see it: it takes two of them to measure a height.
142:     ``segment`` / ``back_project`` give a mask centroid and the world point at
143:     one pixel.  Object poses are never given.
144:
145:     The frozen Pi0.5 VLA (``pi0_pick``) is a learned dual-arm policy trained on
146:     demonstrations of this benchmark's tasks.
147:     """
148:
149:     NAME: ClassVar[str] = "robodojo_xpl_rgb"
150:     RESULT_TYPES: ClassVar[tuple[type, ...]] = (
151:         State,
152:         ArmState,
153:         Move,
154:         Gripper,
155:         Home,
156:         ObjectSight,
157:         Pick,
158:         Segment,
159:         SeenPoint,
160:     )
161:     SUMMARY_KEYS: ClassVar[tuple[str, ...]] = (*RobodojoRobot.SUMMARY_KEYS, "views", "surface")
162:
163:     def _reported_success(self) -> bool:
164:         # RoboDojo's client ends the episode itself the moment the task is solved, and reports
165:         # that verdict; by then no action is taken any more, so the hosts may stop there too
166:         return bool(self._backend.solved())
167:
168:     def camera_meta(self, camera: str = "cam_head", *, step: int = -1) -> dict[str, Any]:
169:         """Return the calibration of one camera at a recorded step as a dict.
170:
171:         Keys: ``shape`` (image shape), ``intrinsic_matrix`` (3x3) and
172:         ``extrinsic_matrix`` (4x4 camera-to-world; the camera looks down its
173:         own -z axis with +y up).  The head camera is fixed; a wrist camera
174:         moves with its arm, and its pose is worked out from that arm's state.
175:         """
176:         from .hosts import robodojo_sight as sight
177:
178:         camera = _camera(camera, self.CAMERAS)
179:         if camera == "cam_head":
180:             view = sight.head_view()
181:         else:
182:             arm = self.state(step).arm("left" if camera == "cam_left_wrist" else "right")
183:             view = sight.wrist_view([*arm.eef_pos, *arm.eef_quat])
184:         k = [[view.fx, 0.0, view.cx], [0.0, view.fy, view.cy], [0.0, 0.0, 1.0]]
185:         return {
186:             "shape": [view.shape[0], view.shape[1], 3],
187:             "intrinsic_matrix": k,
188:             "extrinsic_matrix": [[float(v) for v in row] for row in view.pose],
189:         }
190:
191:     def back_project(self, row: int, col: int, camera: str = "cam_head") -> SeenPoint:
192:         """Return the world point seen at one pixel of the current image of ``camera``.
193:
194:         There is no depth image, so a pixel alone is only a ray.  The object
195:         under the pixel is segmented from that pixel (SAM3) and measured as
196:         ``locate`` measures one, and the answer is where the pixel's ray
197:         meets it.  A pixel on the table top itself gives the point of the
198:         table it shows, exactly.
199:
200:         Args:
201:             row / col: pixel, row 0 at the top, col 0 at the left (images are
202:                 480 rows x 640 cols).
203:             camera: the camera the pixel was read from (default ``"cam_head"``).
204:         Returns:
205:             SeenPoint; check ``surface``.  ``"object"``: ``xyz`` is on the
206:             object under the pixel, as well as ``locate`` would measure that
207:             object from this camera and the others that see it.
208:             ``"table"``: ``xyz`` is on the table top; a pixel that shows
209:             something too flat or too far to measure also answers so.  A thin
210:             part in mid-air (a peg, a handle, a cable) is not measured
211:             reliably: reason from the image and from ``locate`` of the whole
212:             object instead.
213:         Raises:
214:             ToolError: pixel out of range, or it looks past the table.
215:         """
216:         camera = _camera(camera, self.CAMERAS)
217:         kwargs: dict[str, Any] = {"row": int(row), "col": int(col), "camera": camera}
218:         p = self._readonly("back_project", kwargs)
219:         pixel = p.get("pixel") or (int(row), int(col))
220:         return SeenPoint(
221:             pixel=(int(pixel[0]), int(pixel[1])),
222:             xyz=_tuple3(p.get("world_xyz")),
223:             depth_m=float(p.get("depth_m", math.nan)),
224:             camera=str(p.get("camera", camera)),
225:             surface=str(p.get("surface") or "table"),
226:         )
227:
228:     def locate(
229:         self, text_prompt: str, camera: str = "cam_head", min_score: float = 0.2
230:     ) -> ObjectSight:
231:         """Find an object by a text prompt and measure it in 3D from the colour cameras.
232:
233:         SAM3 segments the current image of ``camera`` (as ``segment``); the
234:         same object is then looked for in the other two cameras, and its
235:         height and footprint are those that fit every camera that shows it.
236:         One camera cannot measure a height: a low deep thing and a tall
237:         shallow one look alike from it.  ``views`` says how many cameras
238:         agreed.  Nothing moves.
239:
240:         Args:
241:             text_prompt: one object by its visible properties, e.g. ``"the
242:                 small red cube on the left"``.
243:             camera: ``"cam_head"`` (default; the whole table),
244:                 ``"cam_left_wrist"`` or ``"cam_right_wrist"`` (close up, from
245:                 the gripper).
246:             min_score: masks scoring below this are reported as not found.
247:         Returns:
248:             ObjectSight.  For a top grasp: ``move_to([x, y, top_z + 0.09],
249:             pitch=90)`` above it, ``locate`` it again from there (the wrist
250:             camera then looks down on it and the reading is good to 1-2 mm),
251:             turn to ``yaw=grasp_yaw`` and go down to the height to hold it
252:             at.  With ``views >= 2`` and no ``note`` a block, a can, a bowl
253:             or the body of a bottle is measured to 1-3 mm; a ``note`` that
254:             the cameras agree only roughly leaves the height uncertain.  With
255:             ``views == 1`` the height is a guess, the tallest upright shape
256:             that fits the one image: close for a box or a can, wrong for a
257:             bowl, a cup or anything wider above than below, and for a tall
258:             thing that tapers; ``center_xyz`` is then off, along the line
259:             away from the robot, by about half of what the height is wrong
260:             by.  An object once measured with ``views >= 2`` keeps that height
261:             in later calls with the same prompt.  No position comes back
262:             (``center_xyz`` None, ``note`` says why) for a mask on the robot's
263:             own arm or on something that is not on the table.  The mask is
264:             the best match for the text, not proof of identity: check it
265:             against the image.
266:         Raises:
267:             ToolError: the camera image or the SAM3 service is unavailable.
268:         """
269:         camera = _camera(camera, self.CAMERAS)
270:         prompt = str(text_prompt)
271:         if not prompt.strip():
272:             raise ValueError("text_prompt must not be empty")
273:         kwargs: dict[str, Any] = {
274:             "text_prompt": prompt,
275:             "camera": camera,
276:             "min_score": float(min_score),
277:         }
278:         p = self._readonly("locate", kwargs)
279:         centroid = p.get("centroid_rc") or ()
280:
281:         def num(key: str) -> float | None:
282:             return float(p[key]) if p.get(key) is not None else None
283:
284:         center = p.get("center_xyz")
285:         note = p.get("geometry_error") or p.get("height_guess")
286:         return ObjectSight(
287:             found=bool(p.get("found")),
288:             center_xyz=_tuple3(center) if center is not None else None,
289:             top_z=num("top_z"),
290:             height_m=num("height_m"),
291:             length_m=num("length_m"),
292:             width_m=num("width_m"),
293:             long_axis_deg=num("long_axis_deg"),
294:             grasp_yaw=num("grasp_yaw"),
295:             score=num("score"),
296:             centroid=(int(centroid[0]), int(centroid[1])) if len(centroid) == 2 else None,
297:             area_px=int(p.get("area_px") or 0),
298:             camera=str(p.get("camera", camera)),
299:             note=str(note) if note else None,
300:             views=int(p.get("views") or 1),
301:         )
302:
303:
304: ADAPTER = RobotAdapter(
305:     name="robodojo_xpl_rgb",
306:     robot_cls=RobodojoOfficialColourRobot,
307:     host="pyrualean.hosts.xpolicylab_robodojo_rgb",
308:     knowledge="robodojo_xpl_rgb",
309:     blurb="a dual-arm ARX-X5 robot in the RoboDojo benchmark",
310:     guides_subdir="",
311:     guide_names=(),
312:     show_examples=(
313:         "`robo.show('cam_head')`, `robo.show('cam_left_wrist')` or `robo.show('cam_right_wrist')`"
314:     ),
315:     services="a frozen Pi0.5 VLA and a SAM3 segmentation service",
316:     services_novla="a SAM3 segmentation service",
317: )
318:
319:
320: __all__ = ["ADAPTER", "ObjectSight", "RobodojoOfficialColourRobot", "SeenPoint"]
```

## src/pyrualean/hosts/robodojo_sight.py:9-96

```text
9: """An object's 3D extent from its masks in colour cameras alone: no depth image.
10:
11: RoboDojo's evaluation client, as configured, hands a policy three colour images and the
12: robot's state: depth and camera matrices are switched off in its config.  The cameras' poses
13: are nevertheless known.  The head
14: camera never moves, and each wrist camera is bolted to its arm's end-effector link, whose pose
15: is part of the state (:func:`head_view`, :func:`wrist_view`; the numbers were read off the
16: simulator once).  So every pixel is a known ray, and an object that stands on a known plane
17: (the table) can be measured from where the rays of its mask go:
18:
19: *   A mask in ONE camera says where the object's shadow falls on the table as seen from that
20:     camera: the object fills some of the space between the camera and that shadow.  How tall it
21:     is cannot be read from it: a low deep thing and a tall shallow one cast the same shadow.
22: *   For a height ``h`` there are two readings of one mask.  An upright ``prism``: the table cells
23:     that are in the shadow and whose column up to ``h`` stays in the mask; for a box or a can
24:     of that height these cells are its footprint, exactly.  Something that ``hangs`` from that
25:     height: every cell whose point at ``h`` is in the mask, with as much below it as the mask
26:     allows, standing on the table or not; that is a bowl from its rim down, or anything wider
27:     above than below.
28: *   A SECOND camera that sees the object from elsewhere settles the height: the solid a reading
29:     describes is projected into it and compared with the object's mask there.  The reading and
30:     height that match best are taken (:func:`measure`); the hanging one only where it matches
31:     clearly better, since whatever stands on its own footprint is a prism.  With only one mask
32:     the height is the tallest prism that still accounts for the whole mask, which is right for
33:     boxes and cans and a guess for a bowl.
34:
35: :func:`measure` answers with the world point each pixel of the mask shows on that solid: what a
36: depth image would have given for an object of that shape.
37:
38: A wrist camera always sees its own two fingers, and sometimes the other arm.  Those pixels
39: (:func:`robot_pixels`) are ``unknown`` in that view: what a reading puts behind them counts
40: neither for nor against it, and a mask that lies on them is the robot's, not the object's.
41: """
42:
43: from __future__ import annotations
44:
45: import math
46: from collections.abc import Sequence
47: from dataclasses import dataclass
48: from typing import Any
49:
50: import numpy as np
51:
52: from . import robodojo_kinematics as kin
53:
54: #: RoboDojo's cameras (``env_cfg/camera``; read off the simulator, which reports them when
55: #: asked): 640 x 480 pinhole images, looking down their own -z with +y up.  The head camera
56: #: stands above the robot's edge of the table and looks 60 degrees below the horizontal.
57: IMAGE_SHAPE = (480, 640)
58: HEAD_FOCAL_PX = 288.1325
59: HEAD_POSITION = (0.0, -0.41, 1.308)
60: HEAD_PITCH_DOWN_DEG = 60.0
61: #: A wrist camera in its arm's end-effector frame (the pose in ``<arm>_ee_pose``): 8.5 cm ahead
62: #: of it and 5.1 cm above, looking 30 degrees below the direction the gripper points.  The same
63: #: for both arms, and constant to a micrometre over every pose tried.
64: WRIST_FOCAL_PX = 397.0413
65: WRIST_MOUNT = (
66:     (0.0, 0.5, -0.8660254, 0.084842),
67:     (-1.0, 0.0, 0.0, 0.0),
68:     (0.0, 0.8660254, 0.5, 0.05094),
69:     (0.0, 0.0, 0.0, 1.0),
70: )
71: #: What a wrist camera sees of its own gripper: the inner faces of the two fingers, in the
72: #: end-effector frame (x ahead, y the closing axis, z up; metres).  Fully open they stand 4.45 cm
73: #: to either side (measured in the simulator's depth image) and they meet when closed.
74: OWN_FINGER_INNER_M = 0.0445
75: OWN_FINGER_THICK_M = 0.012
76: OWN_FINGER_X_M = (0.10, 0.165)
77: OWN_FINGER_Z_M = (-0.02, 0.011)
78: #: The robot's outline in an image is drawn from the capsules ``locate`` drops depth points by,
79: #: shrunk to this share: those are wide on purpose (a point near the arm is the arm's), while a
80: #: pixel is unknown only where the arm really is in front.
81: ROBOT_OUTLINE = 0.75
82: #: The gripper's body with the wrist camera on it, in the end-effector frame: a capsule along x
83: #: at this height above the axis, from / to these x, of this radius (metres; the camera itself
84: #: is at x 0.085, z 0.051).
85: BODY_Z_M = 0.045
86: BODY_X_M = (0.0, 0.11)
87: BODY_RADIUS_M = 0.04
88: #: A measurement is made on a grid of the supporting plane with at most this many cells, each
89: #: at least CELL_MIN_M wide.
90: GRID_CELLS = 40000
91: CELL_MIN_M = 0.001
92: #: An object is read level by level, this far apart, up to SWEEP_MAX_M above its plane
93: #: (metres); every SWEEP_EVERY-th level is tried as its height, then the levels around the best.
94: LEVEL_M = 0.002
95: SWEEP_EVERY = 2
96: SWEEP_MAX_M = 0.36
```

## src/pyrualean/hosts/robodojo_sight.py:818-897

```text
818: def measure(
819:     head: Sight,
820:     others: Sequence[Sight | Sequence[Sight]] = (),
821:     base_z: float = kin.TABLE_Z,
822:     known: Sequence[Any] | None = None,
823: ) -> dict[str, Any] | None:
824:     """Where an object's surface is, from its mask in one view and, if any, in others.
825:
826:     ``head`` is the view the object is read from (a camera that looks down on it).  ``others``
827:     see the same object from elsewhere and settle its height; an entry may be a list of masks
828:     from one camera, of which the one that fits is taken.  ``known`` is the object's height,
829:     reading and match from an earlier measurement that two views agreed on (``(height_m, kind)``
830:     or ``(height_m, kind, match)``): it is used when no other view sees the object now, and
831:     when the views that do agree on it less well than those did; never when a prism that tall
832:     no longer fits the mask (the object has fallen over).  Returns ``points`` (N x 3), the world
833:     point each pixel of the head mask shows on the solid the reading describes (what a depth
834:     image would have given, for an object of that shape) with those pixels (``rows``,
835:     ``cols``), its ``height_m`` above ``base_z``, the reading taken (``kind``: ``"prism"`` or
836:     ``"hang"``), the number of ``views`` that agreed and their ``match``, whether the height is
837:     the ``remembered`` one, and whether a known height was ``outgrown`` (it no longer fits the
838:     mask); or ``None`` when the mask gives no footprint.
839:     """
840:
841:     head = Sight(head.view, largest_part(head.mask))
842:     rows, cols = np.nonzero(head.mask)
843:     if len(rows) < MIN_PIXELS:
844:         return None
845:     shadow, ok = head.view.on_plane(rows, cols, base_z)
846:     shadow = shadow[ok]
847:     above = float(head.view.pos[2] - base_z)
848:     if len(shadow) < MIN_PIXELS or above <= 0.05:
849:         return None
850:     foot = head.view.pos[:2]
851:     top_height = min(SWEEP_MAX_M, above - 0.05)
852:     # every reading lies between the shadow and the shadow drawn in towards the camera's foot
853:     shrunk = foot + (shadow - foot) * (1.0 - top_height / above)
854:     lo = np.minimum(shadow.min(axis=0), shrunk.min(axis=0)) - 0.006
855:     hi = np.maximum(shadow.max(axis=0), shrunk.max(axis=0)) + 0.006
856:     if np.any(hi - lo > 1.6):
857:         return None
858:     grid = _Grid(lo, hi, base_z)
859:     levels = _Levels(head, grid, top_height)
860:     if levels.inside[0].sum() < MIN_CELLS:
861:         return None
862:     full_shadow = shadow
863:     if len(shadow) > 2500:
864:         shadow = shadow[:: len(shadow) // 2500 + 1]
865:
866:     cone = levels.cone()
867:     seconds: list[list[tuple[Sight, tuple[np.ndarray, np.ndarray]]]] = []
868:     for entry in others:
869:         candidates = []
870:         for sight in entry if isinstance(entry, (list, tuple)) else [entry]:
871:             r2, c2 = np.nonzero(sight.mask)
872:             if len(r2) < MIN_PIXELS or len(r2) > SECOND_VIEW_MAX_SHARE * sight.mask.size:
873:                 continue
874:             if sight.robot is not None and sight.robot[r2, c2].mean() > SECOND_VIEW_ON_ROBOT:
875:                 continue
876:             if len(r2) > 1500:
877:                 pick = slice(None, None, len(r2) // 1500 + 1)
878:                 r2, c2 = r2[pick], c2[pick]
879:             # the object's mask in another view lies within what the head mask allows
880:             within = float(np.isfinite(_march(sight.view, r2, c2, cone)).mean())
881:             if within >= SECOND_VIEW_WITHIN:
882:                 candidates.append((sight, (r2, c2)))
883:         if candidates:
884:             seconds.append(candidates)
885:
886:     kinds = ("prism", "hang")
887:     tried = list(range(0, levels.count, SWEEP_EVERY))
888:     solids: dict[tuple[str, int], _Solid] = {}
889:
890:     def solid_of(kind: str, level: int) -> _Solid:
891:         if (kind, level) not in solids:
892:             solids[kind, level] = levels.solid(kind, level)
893:         return solids[kind, level]
894:
895:     # each other view by itself first: a mask of something else matches no reading well.  Of
896:     # several masks from one camera the one that matches best is the object's.
897:     trusted = []
```

## src/pyrualean/hosts/robodojo_tools.py:260-508

```text
260: # motion
261: # ---------------------------------------------------------------------------
262:
263:
264: def _target(arm: str, q: Sequence[float], xyz, pitch, yaw, roll) -> tuple[np.ndarray, tuple]:
265:     cur = kin.angles(kin.fk(arm, q)[:3, :3])
266:     want = tuple(
267:         float(v) if v is not None else c for v, c in zip((pitch, yaw, roll), cur, strict=True)
268:     )
269:     t = np.eye(4)
270:     t[:3, :3] = kin.orientation(*want)
271:     t[:3, 3] = [float(v) for v in xyz]
272:     return t, want
273:
274:
275: def _joint_path_clear(arm: str, q0: Sequence[float], q1: Sequence[float]) -> bool:
276:     a, b = np.asarray(q0, float), np.asarray(q1, float)
277:     return all(
278:         not kin.clearance_violations(arm, a + (b - a) * t) for t in np.linspace(0, 1, 11)[1:]
279:     )
280:
281:
282: def _pose_of(arm: str, q: Sequence[float]) -> np.ndarray:
283:     """The grasp-point pose (rotation of link6, position of the grasp point) of joints ``q``."""
284:
285:     t = kin.fk(arm, q)
286:     out = np.eye(4)
287:     out[:3, :3] = t[:3, :3]
288:     out[:3, 3] = kin.tcp(t)
289:     return out
290:
291:
292: def _plan(
293:     arm: str, q: Sequence[float], target: np.ndarray, path: str, start_joints
294: ) -> tuple[list, str | None, str | None, str | None]:
295:     """(joint waypoints, the path taken, why nothing can be done, a note) for one target pose.
296:
297:     The pose itself is solved first, so a refusal says whether the TARGET is out of reach or
298:     only the straight line to it.  A target missed by at most NEAR_M / NEAR_DEG is replaced by
299:     the closest reachable pose, and the note says so.
300:     """
301:
302:     res = kin.best_solution(arm, target, q, extra_seeds=[start_joints[arm]])
303:     near = res.pos_err_m <= NEAR_M and res.rot_err_deg <= NEAR_DEG
304:     if not res.ok and not near:
305:         return [], None, _unreachable(res), None
306:     if res.collides:
307:         return [], None, "every solution puts part of the arm into the table", None
308:     note = None
309:     goal = target
310:     if not res.ok:
311:         goal = _pose_of(arm, res.q)
312:         note = (
313:             f"the exact pose is out of reach; went to the closest one, {res.pos_err_m:.3f} m "
314:             f"and {res.rot_err_deg:.0f} deg from it"
315:         )
316:     if path in ("line", "auto"):
317:         ways, why = kin.line_path(arm, q, goal)
318:         if why is None:
319:             return _followable(q, ways), "line", None, note
320:         if path == "line":
321:             return [], "line", why + " (the target itself is reachable: path='auto' swings)", None
322:     if not _joint_path_clear(arm, q, res.q):
323:         return [], "joint", "the joint-space swing to this pose passes through the table", None
324:     return _followable(q, [res.q]), "joint", None, note
325:
326:
327: def _unreachable(res: kin.IKResult) -> str:
328:     return (
329:         f"out of reach: the closest pose the arm can take is {res.pos_err_m:.3f} m and "
330:         f"{res.rot_err_deg:.0f} deg away"
331:     )
332:
333:
334: def _alternatives(
335:     arm: str, q: Sequence[float], xyz: Sequence[float], want: tuple, start_joints
336: ) -> list[str]:
337:     """Nearby poses that ARE reachable: a less steep pitch here, or this pose higher / lower."""
338:
339:     def ok(p: tuple[float, float, float], angles: tuple[float, float, float]) -> bool:
340:         t = np.eye(4)
341:         t[:3, :3] = kin.orientation(*angles)
342:         t[:3, 3] = p
343:         res = kin.best_solution(arm, t, q, extra_seeds=[start_joints[arm]])
344:         return res.ok and not res.collides
345:
346:     out = []
347:     pitch, yaw, roll = want
348:     for p in (60.0, 45.0, 30.0, 0.0):
349:         if p < pitch - 5.0 and ok(tuple(xyz), (p, yaw, roll)):
350:             out.append(f"pitch={p:.0f} at this position")
351:             break
352:     for dz in (-0.03, -0.06, -0.10, 0.03, 0.06):
353:         z = xyz[2] + dz
354:         if z > kin.TABLE_Z + 0.015 and ok((xyz[0], xyz[1], z), want):
355:             out.append(f"z={z:.3f} with this orientation")
356:             break
357:     return out
358:
359:
360: def _followable(q: Sequence[float], ways: Sequence[Sequence[float]]) -> list[list[float]]:
361:     """Waypoints split into steps the simulator can follow in one action each.
362:
363:     It turns a joint about 0.2 rad per action; an arm that then falls behind its waypoints is
364:     one that something stopped.
365:     """
366:
367:     out: list[list[float]] = []
368:     a = np.asarray(q, float)
369:     for way in ways:
370:         b = np.asarray(way, float)
371:         n = max(1, math.ceil(float(np.max(np.abs(b - a))) / JOINT_STEP_RAD))
372:         out.extend(list(a + (b - a) * (i / n)) for i in range(1, n + 1))
373:         a = b
374:     return out
375:
376:
377: def move_pose(
378:     primitives: Any,
379:     start_joints: dict[str, list[float]],
380:     xyz: Sequence[float],
381:     arm: str = "right",
382:     gripper: float = 0,
383:     pitch: float | None = None,
384:     yaw: float | None = None,
385:     roll: float | None = None,
386:     path: str = "auto",
387: ) -> dict[str, Any]:
388:     """Move one arm's grasp point to ``xyz`` and an orientation: the tool behind ``move_to``.
389:
390:     ``pitch`` / ``yaw`` / ``roll`` in degrees (:mod:`.robodojo_kinematics`); an angle left None
391:     keeps its current value, so a plain position move no longer turns the wrist.  The two
392:     fingers are interchangeable, so the target turned half a turn about the pointing axis is
393:     tried too and the one needing less joint travel is taken.  ``path``: ``"line"`` moves the
394:     grasp point along a straight line (waypoints every 2.5 cm or 8 degrees, each solved from the
395:     last), ``"joint"`` swings the joints straight to the solution, ``"auto"`` takes the line and
396:     falls back to the swing when the line cannot be followed.  Nothing moves when the target is
397:     out of reach or the motion would take the arm into the table: the result says why.
398:     """
399:
400:     if arm not in ARMS:
401:         return {"error": "arm must be 'left' or 'right'"}
402:     if path not in ("auto", "line", "joint"):
403:         return {"error": "path must be 'auto', 'line' or 'joint'"}
404:     try:
405:         xyz = [float(v) for v in xyz]
406:     except (TypeError, ValueError):
407:         return {"error": "xyz must be three numbers"}
408:     if len(xyz) != 3 or not all(math.isfinite(v) for v in xyz):
409:         return {"error": "xyz must be three finite numbers"}
410:     grip = _command(gripper)
411:     state = _obs(primitives)["state"]
412:     q = _joints(state, arm)
413:     start = _tcp(arm, q)
414:     target, want = _target(arm, q, xyz, pitch, yaw, roll)
415:     flipped, _ = _target(arm, q, xyz, want[0], want[1], want[2] + 180.0)
416:     # The fingers are interchangeable only while they hold nothing: with an object in the hand
417:     # the half-turned pose turns the object (172 of 3373 moves made holding something arrived
418:     # turned 180 degrees: pours tipped the wrong way, a laptop stood up upside down).
419:     empty = _opening(state, arm) >= OPEN_FOR_HALF_TURN and grip != 0.0
420:     options = []
421:     first_why: str | None = None
422:     for t in (target, flipped) if empty else (target,):
423:         ways, taken, why, note = _plan(arm, q, t, path, start_joints)
424:         if why is None:
425:             travel = float(np.sum(np.abs(np.asarray(ways[-1]) - np.asarray(q))))
426:             # an exact solution beats a near miss
427:             options.append((note is not None, travel, ways, taken, t, note))
428:         elif first_why is None or first_why.startswith("out of reach"):
429:             first_why = why
430:     result: dict[str, Any] = {
431:         "arm": arm,
432:         "target_xyz": [round(v, 4) for v in xyz],
433:         "target_angles": {
434:             "pitch": round(want[0], 1),
435:             "yaw": round(want[1], 1),
436:             "roll": round(want[2], 1),
437:         },
438:         "start_xyz": start,
439:         "steps_used": 0,
440:         "path": None,
441:     }
442:     if not options:
443:         if first_why and first_why.startswith("out of reach"):
444:             alts = _alternatives(arm, q, xyz, want, start_joints)
445:             first_why += (
446:                 "; reachable instead: " + ", or ".join(alts)
447:                 if alts
448:                 else "; nothing close is reachable either: use the other arm or move the object"
449:             )
450:         now = _pose_summary(arm, q)
451:         result.update(
452:             final_xyz=now["xyz"],
453:             final_angles={k: now[k] for k in ("pitch", "yaw", "roll")},
454:             dist_to_target_m=round(float(np.linalg.norm(np.asarray(now["xyz"]) - xyz)), 4),
455:             orientation_error_deg=round(
456:                 kin.rotation_error(kin.fk(arm, q)[:3, :3], target[:3, :3]), 1
457:             ),
458:             reached=False,
459:             ik_error=first_why,
460:         )
461:         return result
462:     _near, _travel, ways, taken, goal, note = min(options, key=lambda o: (o[0], o[1]))
463:     result["path"] = taken
464:     if goal is flipped:
465:         half = (
466:             "took the pose turned half a turn about the pointing direction (the empty "
467:             "fingers are interchangeable): yaw / roll read 180 off"
468:         )
469:         note = f"{note}; {half}" if note else half
470:     if note:
471:         result["note"] = note
472:     steps = 0
473:     status: dict[str, Any] = {}
474:     for way in ways:
475:         primitives._check_cancelled()
476:         state, status = _act(primitives, state, {arm: way}, {arm: grip})
477:         steps += 1
478:         if _spent(status):
479:             break
480:     final_q = ways[-1]
481:     for _ in range(SETTLE_ACTIONS):
482:         if _spent(status):
483:             break
484:         err = max(abs(a - b) for a, b in zip(_joints(state, arm), final_q, strict=True))
485:         if err < 0.01:
486:             break
487:         primitives._check_cancelled()
488:         state, status = _act(primitives, state, {arm: final_q}, {arm: grip})
489:         steps += 1
490:     q_now = _joints(state, arm)
491:     now = _pose_summary(arm, q_now)
492:     dist = float(np.linalg.norm(np.asarray(kin.tcp(kin.fk(arm, q_now))) - np.asarray(xyz)))
493:     turn = kin.rotation_error(kin.fk(arm, q_now)[:3, :3], goal[:3, :3])
494:     result.update(
495:         final_xyz=now["xyz"],
496:         final_angles={k: now[k] for k in ("pitch", "yaw", "roll")},
497:         dist_to_target_m=round(dist, 4),
498:         orientation_error_deg=round(turn, 1),
499:         reached=bool(dist <= ARRIVE_M and turn <= ARRIVE_DEG),
500:         steps_used=steps,
501:         ik_error=None,
502:     )
503:     # behind the planned pose by more than a few mm: a joint lag of 0.03 rad is already ~1 cm
504:     # at the grasp point (a press stalled 1.5 cm short read as no lag at all)
505:     planned = kin.tcp(kin.fk(arm, final_q))
506:     lag_m = float(np.linalg.norm(np.asarray(kin.tcp(kin.fk(arm, q_now))) - planned))
507:     if lag_m > 0.005 and not _spent(status):
508:         result["blocked"] = "the arm stopped short of the planned pose: something is in the way"
```

## src/pyrualean/hosts/robodojo_tools.py:959-1059

```text
959:     primitives: Any,
960:     obs: dict[str, Any],
961:     camera: str,
962:     mask: np.ndarray,
963:     text_prompt: str | None,
964:     min_score: float,
965: ) -> tuple[dict[str, Any] | None, dict[str, Any]]:
966:     """An object's geometry from its mask in ``camera`` and whatever the other cameras show of it.
967:
968:     The other cameras are asked for the object twice: by the same words, and by the pixels
969:     where points of the first mask's rays fall in their image (:func:`.robodojo_sight.seeds`);
970:     :func:`.robodojo_sight.measure` takes of those masks the one that is the same object.
971:     Returns the geometry (``object_geometry`` of the surface points) and what was seen.
972:     """
973:
974:     state = _shown(obs)
975:     vision = obs.get("vision") or {}
976:     seen: dict[str, Any] = {"views": 1}
977:     view = _view(camera, state)
978:     if view is None:
979:         return None, seen
980:     first = sight.Sight(view, mask)
981:     sam3 = getattr(primitives, "sam3_client", None)
982:     others = []
983:     spots = sight.seeds(first)
984:     for name in vision:
985:         if name == camera or sam3 is None:
986:             continue
987:         other = _view(name, state)
988:         color = (vision[name] or {}).get("color")
989:         if other is None or color is None:
990:             continue
991:         robot = sight.robot_pixels(other, state, own=_WRISTS.get(name))
992:         masks = []
993:         if text_prompt:
994:             res = sam3.segment(color, text_prompt=text_prompt, min_score=min_score)
995:             if res.found:
996:                 masks.append(np.asarray(res.mask, dtype=bool))
997:         tried: list[tuple[int, int]] = []
998:         if len(spots):
999:             r, c, depth = other.project(spots)
1000:             for ri, ci, di in zip(r, c, depth, strict=True):
1001:                 at = (int(round(float(ri))), int(round(float(ci))))
1002:                 inside = 0 <= at[0] < other.shape[0] and 0 <= at[1] < other.shape[1]
1003:                 if di <= 0.02 or not inside or robot[at]:
1004:                     continue
1005:                 if any(abs(at[0] - a) + abs(at[1] - b) < SEED_APART_PX for a, b in tried):
1006:                     continue
1007:                 if any(m[at] for m in masks):
1008:                     continue  # the mask there is already a candidate
1009:                 tried.append(at)
1010:                 res = sam3.segment(color, point=[at[0], at[1]], min_score=min_score)
1011:                 if res.found:
1012:                     masks.append(np.asarray(res.mask, dtype=bool))
1013:         if masks:
1014:             others.append([sight.Sight(other, m, robot) for m in masks])
1015:     key = " ".join(str(text_prompt or "").lower().split())
1016:     known = _heights(primitives).get(key) if key else None
1017:     res = sight.measure(first, others, known=known)
1018:     if res is None:
1019:         return None, seen
1020:     seen["views"] = int(res["views"])
1021:     if res["views"] == 1 and not res.get("remembered"):
1022:         # one camera, nothing to check it against: has the robot got in front of the object?
1023:         outline = sight.robot_pixels(view, state, own=_WRISTS.get(camera), scale=1.0, between=False)
1024:         if _behind_robot(np.asarray(mask, dtype=bool), outline):
1025:             if res.get("outgrown"):
1026:                 # two cameras measured it taller than what shows now: the rest is behind the arm
1027:                 seen["hidden"] = (
1028:                     "the robot's arm hides part of it now (move the arm away and locate again)"
1029:                 )
1030:                 return None, seen
1031:             seen["guess"] = (
1032:                 "one camera sees it and the robot's arm is in front of part of it: its size and "
1033:                 "place may be off (move the arm away and locate again)"
1034:             )
1035:             points = np.asarray(res["points"], dtype=np.float64)
1036:             return object_geometry(points), seen
1037:     if res["views"] >= 2:
1038:         rough = res["match"] is not None and res["match"] < ROUGH_MATCH
1039:         if key and not rough:
1040:             # only what the cameras agreed on well is kept: a rough reading (an object in the
1041:             # gripper read as a column down to the table) would spoil every later one
1042:             _heights(primitives)[key] = (float(res["height_m"]), str(res["kind"]), res["match"])
1043:         if rough:
1044:             seen["guess"] = (
1045:                 "the cameras agree only roughly: its height may be centimetres off "
1046:                 "(locate it again from above before a grasp)"
1047:             )
1048:     elif res.get("remembered"):
1049:         seen["guess"] = "its height as measured before"
1050:     else:
1051:         seen["guess"] = (
1052:             "one camera sees it: its height is a guess (locate it again from above before a grasp)"
1053:         )
1054:     points = np.asarray(res["points"], dtype=np.float64)
1055:     _scene(primitives, obs)["regions"].append(
1056:         {"camera": camera, "rows": res["rows"], "cols": res["cols"], "points": points}
1057:     )
1058:     return object_geometry(points), seen
1059:
```

## src/pyrualean/hosts/robodojo_tools.py:1185-1249

```text
1185: def locate(
1186:     primitives: Any,
1187:     text_prompt: str,
1188:     camera: str = "cam_head",
1189:     min_score: float = 0.2,
1190: ) -> dict[str, Any]:
1191:     """Segment an object by text and measure it in 3D from the depth image."""
1192:
1193:     if not isinstance(text_prompt, str) or not text_prompt.strip():
1194:         return {"error": "text_prompt must be a non-empty string"}
1195:     obs = _obs(primitives)
1196:     cam = _camera(obs, camera)
1197:     if cam is None:
1198:         return {"error": f"camera {camera!r} not in observation"}
1199:     color = cam.get("color")
1200:     if color is None:
1201:         return {"error": "camera color image missing"}
1202:     sam3 = getattr(primitives, "sam3_client", None)
1203:     if sam3 is None:
1204:         return {"error": "sam3_client not configured"}
1205:     res = sam3.segment(color, text_prompt=text_prompt, min_score=float(min_score))
1206:     if not res.found:
1207:         return {"camera": camera, "found": False, "text_prompt": text_prompt}
1208:     mask = np.asarray(res.mask, dtype=bool)
1209:     rows, cols = np.nonzero(mask)
1210:     out: dict[str, Any] = {
1211:         "camera": camera,
1212:         "found": True,
1213:         "text_prompt": text_prompt,
1214:         "score": round(float(res.score), 3),
1215:         "area_px": int(mask.sum()),
1216:         "centroid_rc": [int(rows.mean()), int(cols.mean())] if len(rows) else None,
1217:     }
1218:     if colour_only(primitives, cam):
1219:         view = _view(camera, _shown(obs))
1220:         if view is not None:
1221:             outline = sight.robot_pixels(
1222:                 view, _shown(obs), own=_WRISTS.get(camera), scale=1.0, between=False
1223:             )
1224:             share = float(outline[mask].mean()) if mask.any() else 0.0
1225:             if share > 0:
1226:                 out["robot_px_fraction"] = round(share, 3)
1227:             if share >= ROBOT_MASK_SHARE and float(res.score) < ROBOT_MASK_SCORE:
1228:                 out["views"] = 1
1229:                 out["geometry_error"] = "the mask lies on the robot's own arm or gripper"
1230:                 return out
1231:         geo, seen = _measure_in_colour(primitives, obs, camera, mask, text_prompt, float(min_score))
1232:         out["views"] = seen["views"]
1233:         if seen.get("guess"):
1234:             out["height_guess"] = seen["guess"]
1235:         if geo is None:
1236:             out["geometry_error"] = (
1237:                 seen.get("hidden") or "too little of it above the table (flat, far or hidden)"
1238:             )
1239:             return out
1240:         x, y = float(geo["center_xyz"][0]), float(geo["center_xyz"][1])
1241:         if not (
1242:             kin.TABLE_X[0] - OFF_TABLE_M <= x <= kin.TABLE_X[1] + OFF_TABLE_M
1243:             and kin.TABLE_Y[0] - OFF_TABLE_M <= y <= kin.TABLE_Y[1] + OFF_TABLE_M
1244:         ):
1245:             out["geometry_error"] = "what the mask shows is not on the table"
1246:             return out
1247:         out.update(geo)
1248:         return out
1249:     try:
```
