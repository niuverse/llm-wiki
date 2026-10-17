# NVlabs/ASPIRE 固定版本原始文件读取缓存

标准提取器不支持 tgz；按成员路径逐字解码 UTF-8，未摘要。代码核查范围在来源页说明。

## README.md

````text
# ASPIRE: Agentic /Skills Discovery for Robotics

[Project Page](https://research.nvidia.com/labs/gear/aspire/) &ensp;|&ensp; [Paper](https://arxiv.org/abs/2607.00272)

<img src="assets/media/skill_discovery.gif" alt="ASPIRE discovering /skills across simulation and real-robot tasks" width="100%">

ASPIRE is a new type of continual learning: "training" is skill refinement instead of gradient descent. 

"Trained model" is a repo of sensorimotor skills instead of floating weights. 

“Distributed training” is a panel of agents each practicing a different skill instead of sharded minibatches.

## News

- **[2026-10] ASPIRE v1.0 is out!** ASPIRE can now solve a Rubik's Cube, and it achieves 99% success on 80 LIBERO-Pro Goal / Object / Spatial / Long tasks and selected Robosuite, BEHAVIOR-1K tasks.

- **[2026-06] ASPIRE is out!** We achieve SOTA results on LIBERO-Pro, Robosuite, and BEHAVIOR-1K with Claude Opus 4.6! Also check out our table bussing sim-to-real demos!

## Real-World Results

<table>
  <tr>
    <th width="50%">Cross-embodiment sim-to-real</th>
    <th width="50%">Online real-world learning</th>
  </tr>
  <tr>
    <td><video src="https://github.com/user-attachments/assets/ce86d1c1-582e-4388-9eb8-2b9027252eec" width="100%" controls></video></td>
    <td><video src="https://github.com/user-attachments/assets/7fa4ea5c-bcae-4eb8-b0e6-3109af08c94d" width="100%" controls></video></td>
  </tr>
  <tr>
    <td><a href="https://github.com/NVlabs/ASPIRE/blob/v0.1/aspire/real/README.md">Long Horizon Table Bussing</a><br>Claude Opus 4.6 (sim), GPT-5.5 (real)</td>
    <td><a href="https://github.com/NVlabs/ASPIRE/blob/main/docs/system2.md#solve-a-rubiks-cube">Rubik's Cube</a><br>GPT-6 Astra</td>
  </tr>
</table>

<table>
  <tr>
    <td width="33%"><video src="https://github.com/user-attachments/assets/15e5946f-b26d-466e-aa44-c971e5756933" width="100%" controls></video></td>
    <td width="33%"><video src="https://github.com/user-attachments/assets/620eb33d-b9da-40cb-8d84-eb487f264585" width="100%" controls></video></td>
    <td width="33%"><video src="https://github.com/user-attachments/assets/18a8484f-a0bd-4574-9891-f5c49d906bc5" width="100%" controls></video></td>
  </tr>
  <tr>
    <td><a href="https://github.com/NVlabs/ASPIRE/blob/main/docs/system2.md#inverted-cup-nesting">Stack Cups</a><br>GPT-6 Astra</td>
    <td><a href="https://github.com/NVlabs/ASPIRE/blob/main/docs/system2.md#unscrew-and-pour">Unscrew Bottle Cap</a><br>GPT-6 Astra</td>
    <td><a href="https://github.com/NVlabs/ASPIRE/blob/main/docs/system2.md#pill-insertion-and-bottle-closure">Pill in Bottle</a><br>GPT-6 Astra</td>
  </tr>
</table>

## Model Scaling

<table>
  <tr>
    <th width="50%">Success vs. API cost</th>
    <th width="50%">LIBERO-Pro, Robosuite, BEHAVIOR-1K</th>
  </tr>
  <tr>
    <td><img src="assets/media/success_vs_api_cost.gif" alt="ASPIRE success vs. API cost across twelve coding-agent models" width="100%"></td>
    <td><img src="assets/media/benchmark_results.gif" alt="ASPIRE success rates on LIBERO-Pro, Robosuite and BEHAVIOR-1K by model" width="100%"></td>
  </tr>
  <tr>
    <th colspan="2">Stronger models discover better strategies</th>
  </tr>
  <tr>
    <td><video src="https://github.com/user-attachments/assets/f4b77674-2ada-4f10-a3de-8126d9512342" width="100%" controls></video></td>
    <td><video src="https://github.com/user-attachments/assets/9645e221-7f6c-4c6d-99b2-dce515afbf6e" width="100%" controls></video></td>
  </tr>
  <tr>
    <td><b>Book under a shelf</b><br>Opus 5.5 and Astra let go of the book and push it under the low shelf.</td>
    <td><b>Push a plate</b><br>Opus 5.5 clears the clutter first; Astra lifts the plate over it.</td>
  </tr>
  <tr>
    <td><video src="https://github.com/user-attachments/assets/d66e195f-93f8-403d-ab47-e098cba2f58b" width="100%" controls></video></td>
    <td><video src="https://github.com/user-attachments/assets/9c795d80-761a-48b4-838e-d20bcd905fd5" width="100%" controls></video></td>
  </tr>
  <tr>
    <td><b>Open the bottom drawer</b><br>Opus 5.5 and Astra tilt the gripper and hook the low handle, as the human does.</td>
    <td><b>Mug in the microwave</b><br>Opus 5.5 and Astra grasp the handle and slide the mug in upright.</td>
  </tr>
</table>

ASPIRE improves with the underlying model. On 10 LIBERO-Pro tasks, success rises from 15% (GPT-6 Luna) to 99% (Claude Opus 5.5), and the strongest models are not the most expensive: the green line marks the cost/success frontier. Across LIBERO-Pro, Robosuite and BEHAVIOR-1K, Claude Opus 5.5 reaches 97–100% success on every task.

## Quick Start

### Run with a coding agent

To get started with ASPIRE, launch a coding agent such as Codex or Claude Code and enter the following prompt:

```text
Clone the main branch of https://github.com/NVlabs/ASPIRE/,
read the iterative-debugging skill (.claude/skills/iterative-debugging/SKILL.md) and
docs/libero-pro.md, and run the complete ASPIRE LIBERO-Pro Goal-Swap Quick Start for
all ten tasks in the libero_goal_swap suite.

Before executing, report the required GPUs, credentials, gated weights,
services, expected runtime, seed partitions, and output paths. Wait for
my confirmation before launching. Do not access real-robot code or instructions
(AGENTS.md, docs/system2*.md, docs/yam-real.md, src/cap_harness/yam_real/).
```

Before running, set up the host (CUDA, uv, and the Hugging Face token for the gated SAM3 weights) with [`docs/host-setup.md`](docs/host-setup.md).

**Reference agent environments:** ASPIRE is coding-agent agnostic. The simulation workflow is packaged as agent skills for Claude Code ([`.claude/skills/`](.claude/skills/)) and Codex ([`.codex/skills/`](.codex/skills/)): `iterative-debugging` and `evosearch`. [`AGENTS.md`](AGENTS.md) holds the execution rules for the real-robot System 2 agent ([operator runbook](docs/system2.md)) and is not needed for simulation runs.

### Reproduce full paper results

Name the suite and experiment explicitly. If neither is named, the agent should present this table and stop for selection.

<table>
  <thead>
    <tr>
      <th>Suite</th>
      <th>Experiment</th>
      <th>Runbook</th>
      <th>Video</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>LIBERO-Pro</td>
      <td>Iterative-debugging loop</td>
      <td><a href="https://github.com/NVlabs/ASPIRE/blob/main/.claude/skills/iterative-debugging/SKILL.md"><code>iterative-debugging/</code></a></td>
      <td rowspan="3"><video src="https://github.com/user-attachments/assets/15c0b425-9fe9-4313-8a5b-8c7da54c24b7" width="240" controls></video></td>
    </tr>
    <tr>
      <td>Robosuite</td>
      <td>Iterative-debugging loop</td>
      <td><a href="https://github.com/NVlabs/ASPIRE/blob/main/.claude/skills/iterative-debugging/SKILL.md"><code>iterative-debugging/</code></a></td>
    </tr>
    <tr>
      <td>BEHAVIOR-1K</td>
      <td>Iterative-debugging loop</td>
      <td><a href="https://github.com/NVlabs/ASPIRE/blob/main/.claude/skills/iterative-debugging/behavior/SKILL.md"><code>iterative-debugging/behavior/</code></a></td>
    </tr>
    <tr>
      <td>LIBERO-Pro</td>
      <td>Evolutionary Search</td>
      <td><a href="https://github.com/NVlabs/ASPIRE/blob/main/.claude/skills/evosearch/SKILL.md"><code>evosearch/</code></a></td>
      <td rowspan="2"><video src="https://github.com/user-attachments/assets/edd2e5e1-b7d6-408a-bb62-23729df14db2" width="240" controls></video></td>
    </tr>
    <tr>
      <td>Robosuite</td>
      <td>Evolutionary Search</td>
      <td><a href="https://github.com/NVlabs/ASPIRE/blob/main/.claude/skills/evosearch/SKILL.md"><code>evosearch/</code></a></td>
    </tr>
    <tr>
      <td>LIBERO</td>
      <td>Zero-Shot Transfer</td>
      <td><a href="https://github.com/NVlabs/ASPIRE/blob/v0.1/aspire/sim/.claude/libero/zeroshot-transfer/INSTRUCTIONS.md"><code>libero/zeroshot-transfer/</code></a></td>
      <td rowspan="4"><video src="https://github.com/user-attachments/assets/8676fa10-6719-477f-9d60-a4ad241a3de3" width="240" controls></video></td>
    </tr>
    <tr>
      <td>LIBERO-Long-Pro</td>
      <td>Library-Size Scaling</td>
      <td><a href="https://github.com/NVlabs/ASPIRE/blob/v0.1/aspire/sim/.claude/libero/library-size-scaling/INSTRUCTIONS.md"><code>libero/library-size-scaling/</code></a></td>
    </tr>
    <tr>
      <td>LIBERO-Long-Pro</td>
      <td>Inference-Time Scaling</td>
      <td><a href="https://github.com/NVlabs/ASPIRE/blob/v0.1/aspire/sim/.claude/libero/inference-time-scaling/INSTRUCTIONS.md"><code>libero/inference-time-scaling/</code></a></td>
    </tr>
    <tr>
      <td>Robosuite</td>
      <td>Debugging-Token-Ablation</td>
      <td><a href="https://github.com/NVlabs/ASPIRE/blob/v0.1/aspire/sim/.claude/robosuite/training-law/INSTRUCTIONS.md"><code>robosuite/training-law/</code></a></td>
    </tr>
  </tbody>
</table>


Before a paper-scale launch, the agent must report the selected tasks, seed schedule, expected trial count and runtime, GPU and credential requirements, services, and output paths, then wait for explicit confirmation.

### Reproduce the real-robot manipulation demos

Use the [System 2 operator runbook](docs/system2.md#reproduce-the-manipulation-demos)
to prepare a calibrated YAM station and launch a fresh agent with the appropriate
text-based task skill:

- [Rubik's Cube](examples/yam_real/rubiks_cube/TASK_CONTEXT.md).
- [Unscrew a bottle and pour](examples/yam_real/unscrew_bottle/TASK_CONTEXT.md).
- [Insert a pill and close the bottle](examples/yam_real/pill_in_bottle/TASK_CONTEXT.md).
- [Nest cups upside down](examples/yam_real/cup_stacking/TASK_CONTEXT.md).

The [manipulation skill entrypoint](.agents/skills/manipulation-tasks/SKILL.md)
routes the agent to these recipes. They provide grasp strategies, recovery, and
physical completion checks without requiring episode logs or fixed-coordinate
replays. The three new recipes are distilled from demo sessions, not a new
real-robot validation; the pill recipe explicitly distinguishes a seated cap from
verified final tightness. Re-ground the current scene and verify the actual outcome.

> [!WARNING]
> ASPIRE executes language-model-generated Python with full import access. Trial processes and watchdogs are not a security sandbox. Run generated code on an isolated host without credentials or sensitive mounts, restrict network access, and never grant a simulation agent access to physical hardware. Real-robot work requires the controls in [`aspire/real/AGENTS.md`](https://github.com/NVlabs/ASPIRE/blob/v0.1/aspire/real/AGENTS.md) and separate operator authorization.

## Contribution Guidelines

Start with [CONTRIBUTING.md](https://github.com/NVlabs/ASPIRE/blob/v0.1/CONTRIBUTING.md). Third-party contributions must include a Developer Certificate of Origin sign-off.

## License

ASPIRE material owned by NVIDIA or contributed under the project license is
available under the [Apache License 2.0](https://github.com/NVlabs/ASPIRE/blob/main/LICENSE). Third-party materials retain
their original terms. See [NOTICE](https://github.com/NVlabs/ASPIRE/blob/main/NOTICE) and the central
[licensing and compliance index](https://github.com/NVlabs/ASPIRE/blob/v0.1/LICENSES/README.md) before using or
redistributing the full stack.

## Citation

If you find ASPIRE useful in your research, please cite:

```bibtex
@article{lu2026aspire,
  title   = {ASPIRE: Agentic /Skills Discovery for Robotics},
  author  = {Runyu Lu and Yubo Wu and Ethan Kou and Haotian Lin and Letian Fu and Wenli Xiao and
             Ajay Mandlekar and Yinzhen Xu and Guanya Shi and Ken Goldberg and
             Ang Chen and Mosharaf Chowdhury and Jan Kautz and Yuke Zhu and Linxi "Jim" Fan and Guanzhi Wang},
  year    = {2026},
  journal = {arXiv preprint arXiv:2607.00272},
  url     = {https://arxiv.org/abs/2607.00272}
}
```

ASPIRE was developed by researchers from NVIDIA, the University of Michigan, the University of Illinois Urbana-Champaign, UC Berkeley, and Carnegie Mellon University.
````

## AGENTS.md

````text
# Real YAM System 2

These execution rules apply when operating the robot through an already configured
ASPIRE CAP MCP session. For installation and service startup, use the
[operator runbook](docs/system2.md).

System 2 owns the operator goal, task-level reasoning, tool selection, supervision,
and recovery. Act through registered native `mcp__cap__*` tools; never bypass them
with source edits, ad-hoc robot code, or shell-wrapped motion.

## Instruction priority and skills

The user's instructions take precedence over guidelines provided in a skill. If explicit user
instructions conflict with a skill's instructions, prioritize the user's instructions.
Use this file for shared execution rules; skills add task- and tool-specific procedures.

Infer routine details. Ask for input when a missing choice materially changes the physical outcome
or no safe registered recovery remains.

At fresh-session startup, read [cap-tool-usage](.agents/skills/cap-tool-usage/SKILL.md)
once before the first robot command. For a cube task, read
[manipulation-tasks](.agents/skills/manipulation-tasks/SKILL.md) and its linked task
context and cube guide before acting. Do not reread an unchanged skill later.

For bottle/pill or cup-stacking tasks, read the matching recipe linked from
[manipulation-tasks](.agents/skills/manipulation-tasks/SKILL.md) before acting;
do not load unrelated recipes.

Native MCP schemas are authoritative for tool names and arguments. Discover the capability graph
once per runtime and reuse it. Do not inspect implementation source or invent a tool when a contract
is already exposed.

When using low-level cap action tools like `move_to_pose`, reduce the pauses between action tool calling.
The system need more continous execution without significant delay.

## Initiative and follow-through

When the user expresses intent to perform new work or fix an existing issue, persist until the
user's intended goal is complete. Progress autonomously towards the user's goal unless they are
clearly destructive or irreversible.

## Startup and direct commands

Follow the launcher's session startup mode. A motion-enabled fresh session calls
`cap_program_go_home` once before the operator task; observation-only startup does
not home or move. Use the [agent operating guide](docs/system2-agent-guide.md) for
the startup result checks. Do not repeat startup Home when continuing a task.

For `Prepare the real-robot session and wait`, call `cap_program_go_home` once, report `READY` with
its `home_verified` value, and wait. For an immediate Home command, call `cap_program_go_home`
directly.

Treat an operator request for physical change as authorization for the bounded tool calls needed to
complete it. A correction, question, status request, or tool return does not cancel the active goal.
Answer incidental questions briefly, update relevant task state, and
resume unless the operator explicitly pauses, cancels, replaces the goal, or requests Home.

## Execution policy

Choose the smallest reliable unit of execution:

1. For a plainly short-horizon request, immediately execute the shortest dependency-ordered MCP
   sequence without a full planning report or source inspection. Reuse adequate evidence and skip
   preliminary observations when the tool acquires its own.
2. For a multi-stage goal, inspect provided task context, observe the live scene,
   and form one ordered plan before acting. Retain it; revise only the affected suffix when evidence
   invalidates a prerequisite or transition.

Before a multi-stage goal's first physical action, tell the operator only the active stage, next
tool, and decisive completion or failure evidence. Do not repeat this report at routine handoffs.
During ordinary progress, prefer tool calls over narration.
Optimize throughput by minimizing avoidable gaps between action calls. Use the retained plan and
fresh returned evidence to dispatch the next ready action promptly; reason further when new
uncertainty, failure, or risk can change that action. Preserve necessary verification.

## Task state and evidence

Maintain a compact object-centric working state for the active goal:

- original ordered plan and active stage;
- task-relevant object identities;
- last verified relations and their relevant view or action result;
- unresolved predicates and completed relations that later actions must preserve;
- the parent-stage return point of any recovery.

Plan object manipulation around the intended change to the object. After execution, assess the
affected relations from returned evidence, update what it establishes, and preserve verified
relations unless new evidence or intervening motion invalidates them. Mark uncertain relations unresolved.
Robot pose, gripper closure, and a bare success flag describe execution; they do not by themselves
prove grasp, placement, rotation, or task completion. For a request to move the robot itself, measured
robot postconditions can establish success. Keep each stage active until its physical predicate is met.
Reuse sufficient returned measurements, images, and verification; obtain more evidence when a
decision-critical relation remains unresolved, not as a routine extra check after every action.
A set-level predicate is complete only after every relevant member is accounted for.

An asynchronous receipt confirms acceptance, not completion: register its job ID and monitor as
appropriate while execution continues. Process a current job's terminal status, errors, returned
state, and images before the next dependent action. Terminal feedback includes images by default;
reuse fresh evidence. Request `observe` when a decision-critical relation is missing, stale,
occluded, contradictory, or changed after that evidence was acquired.

Do not insert sleeps, timers, or estimated-duration waits before handling action completion.
Pose and gripper tools return terminal results and images; use that evidence for the next action.
`get_job`/`observe` remain available for asynchronous execution and additional visual evidence.
Completion evidence does not override a newer operator instruction or revive a replaced job.

An occluded or narrow view makes a relation unknown; it does not prove absence or failure. Check a
useful second view or allow a safe occlusion to clear when that can change the next decision. Use
action forecasts only to focus monitoring, never as proof of physical state.

## Recovery

A failed attempt is not a blocked task. Preserve the goal and use measured errors or fresh visual
evidence to execute a feasible correction or materially different approach. Pause an unsafe action
without abandoning recovery. Report the task blocked when remaining alternatives require an
unavailable capability, new authorization, or external change; identify that dependency and the
evidence. Do not repeat unchanged failures, bypass collision constraints, or weaken success criteria.

Recovery is a temporary path back to the still-active parent stage. Preserve useful progress.
Do not count recovery motion as task progress or silently replace the original plan.

## Completion and communication

Advance directly to the preplanned successor once the active predicate is verified. Replan only
after a changed goal, contradicted prerequisite, confirmed failure, unavailable actor, or exhausted
useful retry. Continue autonomously while the goal remains reachable.

Keep operator communication concise. Report material stage transitions, interventions, recoveries,
completion, and concrete blockers. Do not expose routine monitoring narration or repeat settled
facts. End with Home only when requested or when the task contract explicitly requires it.
Home opens both grippers; when placement is requested, place and release the object before Home.
````

## pyproject.toml

````text
[build-system]
requires = ["setuptools>=77", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "cap-harness"
version = "0.1.0"
description = "Typed Code-as-Policy APIs for LIBERO-Pro, Robosuite, and real YAM."
readme = "README.md"
license = "Apache-2.0"
license-files = ["LICENSE", "NOTICE"]
requires-python = ">=3.10,<3.13"
dependencies = [
  "numpy>=1.26,<3",
  "requests>=2.32",
  "scipy>=1.12",
  "PyYAML>=6",
]

[project.optional-dependencies]
dev = [
  "pytest>=8",
  "pytest-timeout>=2.3",
  "ruff>=0.12",
]
agent = [
  "fastapi>=0.115",
  "uvicorn>=0.34",
  "viser[urdf]>=1.0.30,<2",
  "mcp>=1.26,<2",
  "pillow>=10",
  "jsonschema>=4",
]
yam-real = [
  "imageio[ffmpeg]>=2.34",
  "portal>=3.7.3",
  "mink>=0.0.4",
  "mujoco==3.3.0",
  "pyrealsense2>=2.55",
]
yam-real-server = [
  "damiao-motor>=1.0.7b1",
]
libero = [
  "gymnasium>=0.29",
  "imageio[ffmpeg]>=2.34",
  "matplotlib>=3.7",
  "opencv-python-headless<4.13",
  "termcolor>=2.4",
  "libero",
  "robosuite",
  "easydict==1.9",
  "robomimic==0.2.0",
  "einops==0.4.1",
  "thop==0.1.1-2209072238",
  "bddl==1.0.1",
  "future==0.18.2",
  "cloudpickle==2.1.0",
  "gym==0.25.2",
  "scikit-learn",
]
robosuite = [
  "gym==0.25.2",
  "imageio[ffmpeg]>=2.34",
  "opencv-python-headless<4.13",
  "termcolor>=2.4",
  "robosuite",
]
# Per-provider extras: each model server installs only its own dependencies so a
# provider venv (.venv-<name>) never carries unrelated model stacks and so
# simulator installs can stay client-only. cuRobo is compiled from source by its
# own bootstrap script and is intentionally not a pip extra.
providers-sam3 = [
  "sam3",
  "torch==2.9.1",
  "torchvision==0.24.1",
  "einops",
  "decord>=0.6",
  "psutil>=5.9",
  "open_clip_torch>=2.24",
  "opencv-python-headless<4.13",
  "pillow>=10",
  "pycocotools>=2.0",
  "fastapi>=0.115",
  "uvicorn>=0.34",
  "pydantic>=2.7",
  "setuptools<81",
]
providers-pyroki = [
  "pyroki",
  "fastapi>=0.115",
  "uvicorn>=0.34",
  "pydantic>=2.7",
]
providers-graspnet = [
  "contact-graspnet-pytorch",
  "torch==2.9.1",
  "torchvision==0.24.1",
  "open3d>=0.19",
  "trimesh>=4.4",
  "pyrender>=0.1.45",
  "matplotlib>=3.10",
  "decord>=0.6",
  "opencv-python-headless<4.13",
  "pillow>=10",
  "pycocotools>=2.0",
  "fastapi>=0.115",
  "uvicorn>=0.34",
  "pydantic>=2.7",
  "setuptools<81",
]
# Aggregate compatibility alias (temporary): union of the per-provider extras.
# Retained so existing bootstrap/supervisor commands keep working during
# migration; new bootstraps target the per-provider extras above.
providers = [
  "contact-graspnet-pytorch",
  "decord>=0.6",
  "einops",
  "fastapi>=0.115",
  "matplotlib>=3.10",
  "open3d>=0.19",
  "open_clip_torch>=2.24",
  "opencv-python-headless<4.13",
  "pillow>=10",
  "psutil>=5.9",
  "pycocotools>=2.0",
  "pydantic>=2.7",
  "pyrender>=0.1.45",
  "pyroki",
  "sam3",
  "setuptools<81",
  "torch==2.9.1",
  "torchvision==0.24.1",
  "trimesh>=4.4",
  "uvicorn>=0.34",
]
[project.scripts]
cap-harness = "cap_harness.cli:main"
cap-harness-agent = "cap_harness.agent.server:main"
yam-servers = "cap_harness.yam_real.server.launch:main"

[tool.setuptools.packages.find]
where = ["src"]

[tool.setuptools.package-data]
# Declared explicitly because a build copies .py files and NOTHING else. Before
# this, the wheel was 316 KB and carried no robot data at all: no station.xml,
# no meshes, no cuRobo config. It went unnoticed because every venv here uses an
# editable install, which points at the source tree rather than copying it -- so
# the omission was invisible until the first real `pip install`.
cap_harness = [
  # Validation manifests and any other packaged configuration.
  "configs/**/*.yaml",
  "configs/**/*.json",
  "yam_real/description/**/*.xml",
  "yam_real/description/**/*.urdf",
  "yam_real/description/**/*.yml",
  "yam_real/description/**/*.stl",
]
[tool.uv.sources]
contact-graspnet-pytorch = { path = "third_party/contact_graspnet_pytorch", editable = true }
libero = { path = "third_party/LIBERO-PRO", editable = true }
pyroki = { git = "https://github.com/chungmin99/pyroki.git", rev = "388e43e1fc0d0ee382968d3dd72970fd62a0450c" }
robosuite = { path = "third_party/robosuite", editable = true }
sam3 = { path = "third_party/sam3", editable = true }

[tool.uv]
environments = [
  "sys_platform == 'linux' and platform_machine == 'x86_64'",
]
override-dependencies = [
  "jax<0.4.30",
  "jaxlib<0.4.30",
  "mujoco==3.3.0",
  "numpy==1.26.4",
  "opencv-python ; sys_platform == 'never'",
  "opencv-python-headless<4.13",
  "PyOpenGL==3.1.6",
  "PyOpenGL-accelerate==3.1.6",
  # scipy 1.18 dropped numpy 1.x, which mujoco/LIBERO still require above.  Without this
  # bound, Python 3.12 resolves scipy 1.18 and `import scipy.sparse` fails on `np.long`.
  "scipy<1.18",
  "transformers<5.0",
]

[tool.uv.extra-build-dependencies]
contact-graspnet-pytorch = ["numpy"]
egl-probe = ["cmake<3.27"]
pointnet2 = ["torch"]

[tool.uv.workspace]
exclude = ["third_party/**"]

[tool.pytest.ini_options]
testpaths = ["tests"]

[tool.ruff]
# scene_snapshot.py is a generated-program template: like examples/, it uses
# the injected CaP tool globals, which look like undefined names to ruff.
extend-exclude = [
  "examples",
  "src/cap_harness/agent/programs",
  "third_party",
  ".claude/skills/iterative-debugging/scripts/scene_snapshot.py",
]
line-length = 100
target-version = "py310"

# ---------------------------------------------------------------------------
# Lint contract, stated here rather than inherited.
#
# This package previously carried a [tool.ruff] section with no lint settings, so
# what it was actually checked against depended on config discovery rather than
# on anything written down. A result from `ruff check` could not be reasoned
# about without first working out which file had supplied the rules.
#
# The select and ignore lists below are inherited from the tree this package
# was extracted from, copied deliberately so that a divergence is a visible
# edit here rather than an accident of layout.
# ---------------------------------------------------------------------------
[tool.ruff.lint]
select = [
    "A",      # flake8-builtins
    "ARG",    # flake8-unused-arguments
    "ASYNC",  # flake8-async
    "B",      # flake8-bugbear
    "BLE",    # flake8-blind-except
    "C4",     # flake8-comprehensions
    "COM818", # trailing-comma-on-bare-tuple
    "D",      # pydocstyle
    # "DOC" (pydoclint) omitted — ruff DOC rules require preview mode.
    # Using standalone pydoclint instead; see [tool.pydoclint] below.
    "DTZ",    # flake8-datetimez
    "E",      # pycodestyle errors
    "EXE",    # flake8-executable
    "F",      # pyflakes
    "FA",     # flake8-future-annotations
    "FAST",   # FastAPI
    "FURB",   # refurb
    "I",      # isort
    "ICN",    # flake8-import-conventions
    "ISC",    # flake8-implicit-str-concat
    "NPY",    # NumPy-specific rules
    "PD",     # pandas-vet
    "PGH",    # pygrep-hooks
    "PIE",    # flake8-pie
    "PLC",    # pylint convention
    "PLE",    # pylint error
    "PLR",    # pylint refactor
    "PLW",    # pylint warning
    "PT",     # flake8-pytest-style
    "PYI",    # flake8-pyi
    "RET",    # flake8-return
    "RSE",    # flake8-raise
    "RUF",    # Ruff-specific rules
    "S102",   # exec-builtin
    "S108",   # hardcoded-temp-file
    "S110",   # try-except-pass
    "S112",   # try-except-continue
    "S113",   # request-without-timeout
    "S301",   # suspicious-pickle-usage
    "S302",   # suspicious-marshal-usage
    "S306",   # suspicious-mktemp-usage
    "S307",   # suspicious-eval-usage
    "S605",   # start-process-with-a-shell
    "S606",   # start-process-with-no-shell
    "SIM",    # flake8-simplify
    "SLF",    # flake8-self
    "SLOT",   # flake8-slots
    "T100",   # flake8-debugger
    "T20",    # flake8-print
    "TC",     # flake8-type-checking
    "TD",     # flake8-todos
    "TID252", # flake8-tidy-imports (relative-imports)
    "TRY",    # tryceratops
    "UP",     # pyupgrade
    "W605",   # pycodestyle warnings (invalid-escape-sequence)
    "YTT",    # flake8-2020
]
ignore = [
    "D100",    # undocumented-public-module (not required by Google style)
    "D101",    # undocumented-public-class
    "D102",    # undocumented-public-method
    "D103",    # undocumented-public-function
    "D104",    # undocumented-public-package (not required by Google style)
    "D105",    # undocumented-magic-method
    "D106",    # undocumented-public-nested-class
    "D107",    # undocumented-public-init
    "PIE808",  # unnecessary-range-start (noisy, low value)
    "PIE810",  # multiple-starts-ends-with (not auto-fixable)
    "PLC0415", # import-outside-toplevel (tensorrt/transformers are optional deps)
    "PLR0911", # too-many-return-statements
    "PLR0912", # too-many-branches
    "PLR0913", # too-many-arguments (ML functions often have many params)
    "PLR0915", # too-many-statements
    "PLR2004", # magic-value-comparison (ruff-only rule, noisy in ML)
    "RET504",  # unnecessary-assign (assign before return is often clearer)
    "RET505",  # superfluous-else-return (common pattern, noisy)
    "RUF001",  # ambiguous-unicode-character-string
    "RUF002",  # ambiguous-unicode-character-docstring
    "RUF003",  # ambiguous-unicode-character-comment
    "SIM105",  # suppressible-exception (try-except-pass is more readable)
    "SIM108",  # if-else assignment is often clearer than ternary expressions
    "TC001",   # typing-only-first-party-import
    "TC002",   # typing-only-third-party-import
    "TC003",   # typing-only-standard-library-import
    "TC006",   # runtime-cast-value
    "TRY003",
    "TRY300",
    "TRY301",
]

# Two rule families are turned off for the whole package, with reasons, rather
# than sprinkled as ~96 `noqa` comments. Both are deliberate house style, and
# both are documented in docs/error_handling_philosophy.md.
extend-ignore = [
  # type-check-without-type-error. This package raises ValueError for bad DATA
  # -- a malformed station profile, an out-of-range gripper width -- and
  # reserves TypeError for a caller passing the wrong type. TRY004 cannot tell
  # those apart and wants TypeError for both. 68 occurrences, every one a
  # deliberate "bad value" rather than a mistaken type.
  "TRY004",
  # blind-except. The recorder, the episode sampler and the plant-failure
  # classifiers all swallow deliberately: recording must never be able to fail a
  # run, and a station fault has to reach the program as a typed result rather
  # than a traceback. 28 occurrences.
  #
  # This one is the weaker of the two and is worth revisiting -- a blind except
  # in a NON best-effort path would now be invisible. Narrowing it to the
  # recording and provider modules would be strictly better.
  "BLE001",

  # ------------------------------------------------------------------
  # Baseline, not endorsement. Everything below fires on code that predates
  # this config, which was never checked against these rules because the
  # package had no lint contract of its own. Turning them on and leaving 292
  # findings would mean `ruff check` never passes and so never gates anything;
  # baselining them means it passes today and catches the NEXT violation of
  # every other rule.
  #
  # Counts are as of 2026-08-06 so the burn-down is measurable. The first two
  # are the ones actually worth fixing: they flag real defects rather than
  # style.
  "B023",    # 11 - closure captures a loop variable. A genuine bug class.
  "B905",    # 11 - zip() without strict=; silently truncates on ragged input.
  "PT018",   # 53 - composite assert in tests; splitting them improves failures
  "E501",    #  37 - long lines, mostly measured tables in docstrings
  "TID252",  # 26 - parent-relative imports inside the provider packages
  "SLF001",  # 17 - private access, chiefly the recorder reading plant state
  "PT011",   # 16 - broad pytest.raises
  "T201",    # 15 - print outside server/ and scripts/
  "PLW0603", # 12 - global statement
  "NPY002",  # 10 - legacy numpy RandomState
  "PT007",   # 10 - parametrize value types
  "ARG004", "ARG002", "ARG001",  # 15 - unused arguments in protocol impls
  "PLW0108", #  9 - unnecessary lambda
  "S110",    #  5 - try/except/pass, all in best-effort recording paths
  "RUF059", "B007", "D205", "PLR0917", "PYI036", "RUF012", "RUF046",
  "S108", "SIM115", "FURB192", "PT006", "RUF005", "RUF007", "SIM102",
  "C408", "E731", "FURB171", "PLW1510", "PT012", "PYI034", "S102",
]

[tool.ruff.lint.per-file-ignores]
"__init__.py" = ["F401"]
"!tests/**" = ["PT"]
# Same exemptions the root grants tests/**, restated because this package's
# config is now the one in force for it.
"tests/**" = ["ARG001", "ARG002", "ARG005", "BLE001", "PLR1722", "PT017", "S108", "SLF001", "T201"]
# Read-only diagnostics run by hand from a shell; they print their findings,
# which is their entire purpose.
"scripts/**" = ["T201"]

[tool.ruff.lint.isort]
case-sensitive = false
combine-as-imports = false
force-sort-within-sections = true
from-first = false
single-line-exclusions = ["typing"]
section-order = ["future", "standard-library", "third-party", "first-party", "local-folder"]
known-first-party = ["cap_harness", "tests"]

[tool.ruff.lint.pydocstyle]
convention = "google"

# NOT the root's ban-relative-imports = "all". This package is a self-contained
# library whose modules import their siblings relatively throughout
# (`from .contracts import ...`), which is the established style here and in
# every provider package. Adopting the ban would rewrite 26 imports to say
# nothing new.
[tool.ruff.lint.flake8-tidy-imports]
ban-relative-imports = "parents"
````

## docs/api-reference.md

````text
# CaP API Reference

This document is the inventory of interfaces in the generated-program runtime. It also names the
host-side adapter and provider boundaries so that implementation methods are not mistaken for
policy tools. Benchmark setup and validation remain in the individual benchmark guides.

## Surface boundaries

| Surface | Consumer | Exposure |
| --- | --- | --- |
| Shared tools | Generated `program.py` | Injected as top-level functions for every benchmark. |
| Benchmark extensions | Generated `program.py` | Injected under `libero` or `robosuite`. |
| Contract constructors | Generated `program.py` | Six allowlisted constructors are injected by name. |
| Adapter lifecycle | Harness host | Reset, native conversion, evaluation, and cleanup; never injected. |
| Provider protocols | Harness host | Perception, grasp, IK, and planning backends; never injected. |

Generated programs cannot import modules and do not receive NumPy, filesystem, network, native
simulator, reward, or success-predicate access. Arrays returned by contracts are read-only. Pass
ordinary lists or tuples when constructing array-valued inputs.

## Shared generated-program tools

`shared_atomic` calls expose one primitive capability. `shared_high_level` calls are local
compositions of those primitives. The **Advances** column describes whether a successful call can
advance environment control time.

| Layer | Tool signature | Returns | Advances | Behavior |
| --- | --- | --- | --- | --- |
| `shared_atomic` | `get_task_context()` | `TaskContext` | No | Read the authoritative task identity and language. |
| `shared_atomic` | `get_observation(camera_names=None)` | `Observation` | No | Read calibrated public cameras and robot state, optionally filtered by camera name. |
| `shared_atomic` | `get_robot_state()` | `RobotState` | No | Read joint, gripper, end-effector, frame, and timestamp state. |
| `shared_atomic` | `segment_text(camera_name, text)` | `SegmentationSet` | No | Segment objects in one current camera image using a text prompt. |
| `shared_atomic` | `segment_points(camera_name, points_px)` | `SegmentationSet` | No | Segment from an `N x 2` list of image-space point prompts. |
| `shared_atomic` | `mask_to_point_cloud(mask, camera_name, target_frame="robot_base")` | `PointCloud` | No | Project a public depth mask into a named frame. |
| `shared_atomic` | `crop_point_cloud(point_cloud, lower_xyz, upper_xyz)` | `PointCloud` | No | Keep points inside inclusive framed XYZ bounds, preserving aligned colors. |
| `shared_atomic` | `estimate_geometry(point_cloud)` | `ObjectGeometry` | No | Estimate a framed center, orientation, and extents from a point cloud. |
| `shared_atomic` | `generate_grasps(camera_name, mask, backend="contact-graspnet", max_candidates=5)` | `GraspSet` | No | Generate up to `max_candidates` framed candidates with the selected configured backend. |
| `shared_atomic` | `solve_ik(target_pose, seed_joints=None, *, arm="primary", backend=None)` | `IKResult` | No | Solve one arm pose with the named IK backend; `None` means the benchmark's default (`pyroki`, or `curobo` on `behavior`). |
| `shared_atomic` | `plan_motion(goal, start_joints=None, *, arm="primary", strategy=None)` | `PlanResult` | No | Plan to a pose or joint goal using a `MotionStrategy`. |
| `shared_atomic` | `plan_synchronized_motion(targets, strategy=None)` | `SynchronizedPlanResult` | No | Plan same-tick motion for every arm in the current embodiment. |
| `shared_atomic` | `step(action)` | `StepResult` | One tick | Apply one normalized `RobotAction`; reward and sensitive diagnostics are removed. |
| `shared_atomic` | `execute_trajectory(trajectory, stop_on_termination=True)` | `ExecutionResult` | Many ticks | Execute a fixed-rate single- or multi-arm trajectory. |
| `shared_atomic` | `set_gripper(position, *, arm="primary")` | `ExecutionResult` | Many ticks | Drive one normalized gripper target, where `0` is closed and `1` is open. On LIBERO, Robosuite and RoboCasa only `0.0` and `1.0` are accepted -- see below. |
| `shared_atomic` | `set_grippers(positions)` | `ExecutionResult` | One tick | Command every arm's normalized gripper target in the same control tick. |
| `shared_high_level` | `localize_object(query, *, camera_name=None, target_frame=None)` | `LocalizationResult` | No | Compose text segmentation, RGB-D projection, and geometry estimation; `camera_name` defaults to the benchmark's wide camera (`agentview`, or `head` on BEHAVIOR-1K) and `target_frame` to the robot base frame. |
| `shared_high_level` | `select_grasp(grasps, strategy="top_down")` | `GraspCandidate | None` | No | Select `top_down` or `highest_score` from a successful grasp set. |
| `shared_high_level` | `move_to_joints(target, tolerance=0.01, max_steps=120, *, arm="primary")` | `ExecutionResult` | Many ticks | Servo repeatedly to an absolute joint target until the measured state converges. |
| `shared_high_level` | `move_to_pose(target_pose, tolerance=0.01, max_steps=120, *, arm="primary", strategy=None)` | `ExecutionResult` | Many ticks | Plan, execute, and verify one framed end-effector pose. `max_steps` caps the **planned** waypoint count as well as execution: a plan longer than it fails with `planned trajectory exceeds max_steps` and `steps_executed` 0, without moving the arm. On BEHAVIOR-1K a normal cuRobo reach exceeds the default of 120. |
| `shared_high_level` | `move_synchronized(targets, tolerance=0.01, max_steps=120, strategy=None)` | `ExecutionResult` | Many ticks | Plan, execute, and verify synchronized targets for all arms. |
| `shared_high_level` | `open_gripper(*, arm="primary")` | `ExecutionResult` | Many ticks | Set the normalized gripper target to `1`. |
| `shared_high_level` | `close_gripper(*, arm="primary")` | `ExecutionResult` | Many ticks | Close with adapter contact-aware completion when available. |
| `shared_high_level` | `go_home(*, arm="primary")` | `ExecutionResult` | Many ticks | Servo to the arm home captured or configured by the harness. |

### Gripper targets

On LIBERO, Robosuite and RoboCasa the gripper action is a **velocity**, not a position. Robosuite's
`simple_grip` controller assigns `goal_qvel`, so the sign of the command picks a direction and the
magnitude only picks how fast the jaw travels to its stop. The only widths the actuator can hold are
fully closed and fully open.

`set_gripper()` therefore accepts `0.0` and `1.0` on those embodiments and returns `unsupported`
for anything between, rather than spending its step budget waiting for a width that cannot occur.
Measured on `libero_10_swap/task_7`: `set_gripper(0.669)` and `set_gripper(0.933)` each burned
60 ticks and finished *fully open* -- 12% of the episode, spent moving away from the request.

Prefer `open_gripper()` and `close_gripper()`. A jaw cannot be pre-narrowed to reduce swing on
approach; control clearance with approach geometry instead. YAM commands a real position target and
accepts intermediate values normally.

### Homing

`go_home()` re-issues its joint move until the arm arrives, up to `GO_HOME_MAX_ATTEMPTS`. The
underlying `move_to_joints()` caps at `max_steps=120` and the joint servo droops on steps past
roughly 0.24 rad, so one call out of a folded pose does not converge -- measured on RoboCasa
`drawer_utensil_sort:0`, homing from a pulled-open drawer took three consecutive calls. Calls
accumulate, which is why repeating works.

`move_to_joints()` itself does **not** repeat: `max_steps` is a cap, not a guarantee, and a large
step can return `ok=False` having moved most of the way. Check the result and re-issue, or raise
`max_steps`.

### Motion strategies

`MotionStrategy()` defaults to PyRoki IK plus joint interpolation on LIBERO-Pro and Robosuite; on
BEHAVIOR-1K the harness sets the default to cuRobo for IK, trajectories and integrated pose
planning, and `solve_ik(backend=None)` follows that default (PyRoki is not registered there). Set
`trajectory_planner="curobo"` for cuRoboV2 c-space planning, or
`pose_planner="curobo-integrated"` for integrated pose planning. Requested unavailable backends
return typed failures; the harness never falls back implicitly. `move_to_joints()` and `go_home()`
are direct servo operations rather than collision-aware plans. Synchronized pose planning requires
targets for every arm and defaults to cuRobo-integrated.

### Cartesian pose inputs

`move_to_pose` accepts a Python `Pose` or a mapping with `position` in metres,
`frame`, and exactly one orientation field:

- `quaternion_wxyz`: a unit quaternion `[w, x, y, z]`.
- `rpy_deg`: `[roll, pitch, yaw]` in **degrees**, using fixed-axis XYZ rotations
  in the named pose frame: `R = Rz(yaw) @ Ry(pitch) @ Rx(roll)`.

The MCP `cap_move_to_pose` tool accepts the same mapping as `target_pose`:

```json
{
  "arm": "left",
  "target_pose": {
    "position": [0.5, 0.2, 0.9],
    "rpy_deg": [180, 0, 90],
    "frame": "world"
  },
  "strategy": {"ik_solver": "mink", "trajectory_planner": "curobo"}
}
```

The numbers above illustrate the format; select targets from the observed scene.
MCP pose targets in `cap_move_synchronized` accept either orientation format too.
Both formats describe absolute orientations, not relative rotations. Missing,
ambiguous, malformed, or nonfinite pose inputs are rejected before planning.
RPY is converted to the existing quaternion `Pose` internally. Returned poses
continue to use `quaternion_wxyz`.

## Benchmark extensions and differences

Each run injects only the namespace matching its selected benchmark. Metadata mappings are
read-only and intentionally retain benchmark-specific fields rather than claiming one common
schema.

| Layer | Tool | Current fields |
| --- | --- | --- |
| `extension` | `libero.get_task_metadata()` | `family`, `init_state_count`, `init_state_index`, `language`, `seed`, `suite`, `task_id`, `task_name`, `task_ref` |
| `extension` | `libero.get_controller_metadata()` | Action dimension/bounds, arms, cameras, frequency/period, controller, gripper and joint-command semantics, action modes |
| `extension` | `robosuite.get_task_metadata()` | `arms`, `camera_names`, `environment`, `family`, `language`, `robots`, `suite_name`, task identity |
| `extension` | `robosuite.get_controller_metadata()` | Action dimension/bounds, arms, base frame, cameras, frequency/period, controller, controllable grippers, action modes |
| `extension` | `behavior.get_task_metadata()` | `activity_name`, `arms`, `camera_names`, `family`, `instance_id`, `language`, `scene_model`, `suite_name`, `support_prompt`, `target_prompt`, task identity |
| `extension` | `behavior.get_controller_metadata()` | Action dimension/bounds, arms, base frame `odom`, `base_pose`, cameras, frequency/period, controller, controllable grippers, `torso_positions`, `torso_lower_bounds`, `torso_upper_bounds` |
| `extension` | `behavior.get_base_pose()` | `(x, y, yaw)` of the base footprint in `odom` |
| `extension` | `behavior.navigate_to_pose(x, y, yaw, *, planner="curobo", tolerance_m=0.05, tolerance_rad=0.1, max_steps=1500)` | Drives the holonomic base to an `odom` pose; `planner` is `curobo` (collision-aware plan) or `servo` (direct, for in-place turns and short hops); returns `ExecutionResult` with `moved_x`, `moved_y`, `moved_yaw` diagnostics plus, for `curobo`, `route` (`direct`, `traversability` or `none`), `hops`, `servo_hops` and `direct_status` |
| `extension` | `behavior.move_torso(target, *, tolerance=0.01, max_steps=300)` | Servo the four torso joints to `target` (radians); returns `ExecutionResult` |
| `extension` | `behavior.reset_torso()` | Return the torso to the instance's reset pose; returns `ExecutionResult` |
| `extension` | `behavior.plan_standoff_pose(support_cloud, object_cloud, standoff_m=0.3)` | Pure geometry: `(x, y, yaw)` in `odom` on the support surface's nearest edge, facing the object |
| `extension` | `behavior.plan_approach_pose(object_cloud, distance_m=0.7)` | Pure geometry: `(x, y, yaw)` in `odom` `distance_m` short of a free-standing object along the current line of sight, facing it |
| `extension` | `behavior.base_pose_is_free(x, y)` | Whether the base footprint fits at that `odom` position according to the scene's traversability map (`True` when the scene has no map); `navigate_to_pose` refuses a blocked goal before planning, so test candidate approach poses with this first |

| Benchmark | Arms | Public base frame | Cameras | Control notes |
| --- | --- | --- | --- | --- |
| LIBERO-Pro | `primary` | `robot_base` | `agentview`, `robot0_eye_in_hand` | Seven-joint Panda plus normalized gripper at 20 Hz. |
| Robosuite | `primary`, optionally `secondary` | `robot0_base` | Agent view and one eye-in-hand camera per robot | Single- or bimanual Panda joint control at 20 Hz. |
| BEHAVIOR-1K | `primary` (left), `secondary` (right) | `odom`, fixed where the base stood at instance load | `head`, `left_wrist`, `right_wrist` | R1 Pro seven-joint arms plus normalized grippers at 30 Hz; the holonomic base and the torso move only through the `behavior.*` extensions, and every pose stays valid after the base drives. |

`get_task_context().language` is the authoritative per-episode instruction.

## Injected constructors and returned contracts

Programs may `import math` (the only permitted import, without aliasing); every other name is
injected by the harness.

| Constructor | Signature |
| --- | --- |
| `ArmCommand` | `ArmCommand(mode, target, gripper_position=None)` |
| `MotionStrategy` | `MotionStrategy(ik_solver="pyroki", trajectory_planner="interpolation", pose_planner="composed")` |
| `Pose` | `Pose(position, quaternion_wxyz, frame)`; quaternion order is `wxyz` |
| `RobotAction` | `RobotAction(arms)` |
| `Trajectory` | `Trajectory(joint_positions, dt_s, joint_names, planner, collision_aware, expected_start, arm="primary", gripper_positions=None, embodiment=...)` |
| `SynchronizedTrajectory` | `SynchronizedTrajectory(joint_positions, dt_s, joint_names, planner, collision_aware, expected_start, gripper_positions=None, embodiment=...)` |

`embodiment` defaults to `"robosuite"`, which every other embodiment's adapter rejects at
execution. A hand-built `Trajectory` or `SynchronizedTrajectory` must pass
`embodiment=get_robot_state().embodiment`; prefer `move_to_pose()` / `move_to_joints()`, which
build it for you.

Returned objects expose validated attributes:

| Contract | Important public data |
| --- | --- |
| `TaskContext` | Suite, task id/name, language, family, and public metadata. |
| `Observation` | Camera mapping, `RobotState`, task context, and timestamp. |
| `RobotState` | Per-arm 7-DoF joints, velocities, end-effector poses, grippers, names, and base frame. |
| `SegmentationSet` | `ok`, masks, labels, scores, boxes, diagnostics, and typed error. |
| `PointCloud` / `ObjectGeometry` | Framed points; estimated pose, extents, and point count. |
| `GraspSet` / `GraspCandidate` | Framed candidate poses, scores, widths, diagnostics, and typed error. |
| `IKResult` | `ok`, arm, joint solution, diagnostics, and typed error. |
| `PlanResult` / `SynchronizedPlanResult` | `ok`, trajectory, diagnostics, and typed error. |
| `LocalizationResult` | `ok`, segmentation, point cloud, geometry, diagnostics, and typed error. |
| `StepResult` | Public observation, terminal flags, diagnostics, and typed error; reward is stripped. |
| `ExecutionResult` | `ok`, stable status, executed steps, per-arm final errors, final observation, terminal flags, diagnostics, and typed error. |

## Host-only adapter and provider interfaces

These names describe Python integration boundaries and are not generated-program tools.

- `EnvironmentAdapter` defines embodiment identity, reset, task/observation/state reads, one-tick
  stepping, trajectory execution, single- and same-tick multi-gripper control, and cleanup.
- The simulation runner additionally uses `check_success()` after program execution. Safe
  namespaced extensions use `get_task_metadata()` and `get_controller_metadata()`.
- Feature-detected adapter hooks include `get_planning_context()`, `action_bounds`, `ik_request()`,
  and contact-aware `close_gripper()`.
- `native_env`, `native_step()`, `compute_reward()`, and native timing/evaluation state remain
  validation-only and are never injected into a program.
- Provider protocols cover segmentation, grasp generation, IK, joint-trajectory planning, and
  integrated pose/synchronized planning.

The current source layout is deliberately recorded rather than hidden: LIBERO metadata is defined
in `libero/extensions.py` and forwarded by its adapter; Robosuite metadata lives on
`RobosuiteAdapter`. Concrete adapters remain host-side even
where a package currently re-exports their Python classes.

## Current limitations

- For cross-benchmark projection, pass `target_frame=get_robot_state().base_frame` because
  `mask_to_point_cloud()` currently defaults to LIBERO's `robot_base`.
- `segment_points()` does not expose provider point labels.
- `execute_trajectory(..., stop_on_termination=False)` returns an unsupported failure.
- Public step and execution results remove reward, success, and nested sensitive diagnostics.

## Real YAM

See [Real YAM](yam-real.md) for station setup, physical motion authorization,
arm aliases, local Mink IK, and recording. The shared API remains the same.

## System 2

The [MCP server](system2.md) exposes selected CAP tools, live observations,
job status, and operator steering.
````

## docs/run-artifacts.md

````text
# Recorded CaP Runs

`cap-harness run` executes one generated Python program and records an immutable episode.
Operational success is separate from benchmark task success.

```bash
cap-harness run \
  --suite libero_object_swap \
  --task-id 0 \
  --seed 1 \
  --program policy.py
```

The default step limit is 1000. Override it with `--max-steps`; use `--output-root` to move the
output tree. `--model-trace trace.jsonl` imports local model request/response records after secret
redaction. `--flat-run-dir` writes runs as `<output-root>/<seed>/<run-id>` — use it when the
output root is already task-scoped (e.g. the iterative-debugging task directories).
`--no-videos` skips per-camera MP4 capture for observation-only probe runs; keyframes, overlays,
and traces are still recorded, and `run.json`'s capture block records `"videos": false`.

Recorded runs default to 800x512 cameras, matching the pinned upstream LIBERO reference implementation (ASPIRE). Use
`--camera-width` and `--camera-height` to override this. Release validation continues using the
adapter's lightweight defaults because it validates structure rather than visual task completion.

## Artifact contract

```text
outputs/<benchmark>/<suite>/<task-id>-<task-slug>/<seed>/<run-id>/    # default
<output-root>/<seed>/<run-id>/                                        # with --flat-run-dir
```

Seeds use four digits. Run IDs contain a sortable UTC timestamp and a random collision suffix.
Every invocation creates a new directory and never overwrites an earlier run.

- `run.json`: identity, task, capture settings, timestamps, lifecycle status, and an optional
  campaign environment hash.
- `outcome.json`: program status, final task and protocol success, aggregate reward, durations,
  step count, termination reason, and a `timing` block attributing the wall clock (below).
- `manifest.json`: relative path, size, and SHA-256 for every finalized file.
- `source/`: exact generated program, public result, and Git/source provenance.
- `episode/`: reset data and one exact action/robot-state record per simulator tick.
- `evaluation/protocol.json`: optional summarized host-only protocol checks and witness step
  indices; it contains no raw native simulator state.
- `trace/`: parent-linked program and provider spans with typed inputs and outputs.
- `media/videos/`: one H.264 MP4 per camera, named `<camera>.mp4`. A frame is written per
  recorded step at the control rate (20 Hz on LIBERO-Pro and Robosuite; every third 30 Hz step on
  BEHAVIOR-1K, so 10 fps), and `media/video-index.json` records the effective fps.
- `media/keyframes/`: lossless RGB immediately before and after public motion API calls, plus one
  depth NPY attached to the first such keyframe in the run.
- `media/overlays/`: top-1 SAM mask rendered over RGB; raw masks are not retained.

`run.json` records the backend names configured for the program; it does not assert service health.
Program and provider spans record the
`MotionStrategy` or grasp backend requested on each call, including explicit fallback attempts.
The harness never substitutes a backend silently.

Large arrays are deduplicated by content under `payloads/` and referenced from readable JSON by
relative path, dtype, shape, and hash; small arrays are stored inline. Observations retain camera
metadata rather than duplicate RGB or depth arrays. SAM3 retains metadata, scores, and bounding-box
coordinates for its top five results, plus an RGB overlay for the top result; raw masks are not
persisted. Contact-GraspNet collections retain five candidates. Point-cloud artifacts retain only
frame, point count, and color-presence metadata; XYZ and RGB point arrays are not persisted.
Reward, benchmark success, and protocol predicates never appear in generated-program results, API
traces, or per-step records. The runtime writes only final aggregate outcomes and the separate
summarized evaluator evidence.

An active run has `status: in_progress`. JSON is replaced atomically, JSONL is flushed
incrementally, and videos remain hidden `*.partial.mp4` files until closed. A completed run has
`status: finalized`; a process that cannot finalize leaves an inspectable incomplete run.

## Where the time went

`outcome.json` carries a `timing` block: `wall_s`, `attributed_s`, `unattributed_s`, and a
`buckets` map of `{seconds, calls}`. The buckets are disjoint — a region is charged only the time
nothing nested inside it already claimed — so they sum to `attributed_s`, and what no bucket
claims is the generated program's own Python plus harness glue, reported as `unattributed_s`
rather than folded into a neighbour.

| Bucket | What it holds |
|---|---|
| `adapter_step` | Between asking the adapter to step and its answer: the simulator step and its observation normalization. |
| `setup` / `reset` | Environment construction; the reset that follows, less any keyframe or video frame it wrote. |
| `record_step` | The recorder's own per-step work: the `episode/steps.jsonl` record and its arrays. |
| `video_encode` | H.264 frames, including the writer flush at finalize. |
| `keyframe` / `overlay` | PNG (and first-depth NPY) writes. |
| `trace_write` | Span input/output JSON and `trace/events.jsonl`. |
| `provider.<name>` | One backend call, excluding the trace written around it. |
| `finalize` | Closing the run, up to writing `outcome.json`. |

The manifest's SHA-256 pass runs *after* `outcome.json` is written and so is in no bucket. It is
not worth a bucket: SHA-256 runs at ~1.3 GB/s, so a 100 MB run directory hashes in under a tenth
of a second.

Recording the block costs about 4 µs per step — 4 ms on a 1000-step episode.

There is no profiler command; the block is already the answer for one run, and totalling a
campaign is a few lines:

```bash
python3 -c '
import collections, json, sys
from pathlib import Path
total, wall = collections.Counter(), 0.0
for path in Path(sys.argv[1]).rglob("outcome.json"):
    outcome = json.loads(path.read_text())
    wall += outcome["wall_duration_s"]
    total.update({name: b["seconds"] for name, b in outcome["timing"]["buckets"].items()})
total["(program + glue)"] = wall - sum(total.values())
for name, seconds in total.most_common():
    print(f"{name:<20}{seconds:8.1f}s{100 * seconds / wall:6.1f}%")
' outputs/runs/LATEST
```

Runs recorded before this block have no `timing` key and must be skipped by such a loop; their
provider costs can still be recovered from `span_end` durations in `trace/events.jsonl`.

## Sweeping seeds

`cap-harness run-batch` runs one program over many seeds without an interpreter start per seed:

```bash
cap-harness run-batch \
  --suite libero_goal_swap --task-id 0 --seeds 51-65 \
  --program fix_code.py --output-root debug/initial --flat-run-dir \
  --init-mode seeded --workers 4
```

Every seed still builds and closes its own registry, adapter, environment, and recorder, exactly
as `cap-harness run` does, and still lands in its own `<seed>/<run-id>` directory with its own
log under `--log-dir`. A worker reuses the *imports*, never a live scene. Three rules keep a
seed's result independent of what ran before it: workers are spawned rather than forked, so no
CUDA/EGL/MuJoCo state is inherited; each seed re-seeds the global `random` and `numpy.random`
streams from its own seed; and a worker retires after `--recycle-after` seeds (default 10),
bounding any driver-side leak from repeated environment construction.

`--workers N` runs N seeds at once on the assigned GPU. They share that GPU and the perception
services, so the useful setting depends on the box — measure before trusting a number.

`--results-jsonl` gets one record per seed as it finishes, so an interrupted sweep keeps what it
completed; `--summary` gets the aggregate. `run-batch` supports only LIBERO-Pro and Robosuite.
BEHAVIOR must run each episode in a fresh process because closing Isaac ends the runtime.

Before using `--workers` for a campaign, confirm on the target machine that batching changes
nothing the campaign's conclusions rest on:

```bash
python3 scripts/check_batch_equivalence.py \
  --suite libero_goal_swap --task-id 0 --program fix_code.py \
  --gpu 3 --seeds 51-56 --workers 3
```

It runs the seeds unbatched twice and batched once, so the batched-vs-unbatched difference can be
read against the task's own run-to-run variation rather than against an assumption of determinism.

## Termination reasons

`termination_reason` says why execution stopped. It is distinct from `task_success`; a program can
return normally with `program_completed` and still have `task_success: true`.

| Code | Meaning |
|---|---|
| `program_completed` | Generated Python returned normally. |
| `task_succeeded` | The environment ended after benchmark success. |
| `environment_terminated` | The environment terminated without benchmark success. |
| `environment_truncated` | The environment reached its configured horizon. |
| `step_limit` | The run-wide simulator-step limit was reached. |
| `program_error` | Generated Python was rejected or raised an exception. |
| `provider_error` | An unrecoverable provider failure stopped execution. |
| `harness_error` | The adapter, serializer, or recorder failed. |
| `user_interrupt` | The user interrupted execution. |

The earliest stopping condition is retained. Cleanup problems are listed separately in
`finalization_errors` and do not rewrite it.

## Security boundary

Generated code cannot access native MuJoCo state, reward, success predicates, credentials, or
recorder internals. The recorder does not capture process environments, cookies, authorization
headers, or Hugging Face tokens. Imported model traces and serialized mappings redact common
credential keys and bearer/token-shaped text.

## BEHAVIOR-1K differences

Runs for the `behavior` benchmark record `head.mp4`, `left_wrist.mp4` and `right_wrist.mp4` at
every third simulator frame (10 fps at the 30 Hz control rate); `media/video-index.json` reports
the effective fps. `evaluation/protocol.json` carries the pickup witness (held, lifted, the step
both first held, the maximum clearance) and `outcome.json`'s `task_success` is that witness's
verdict, not the BDDL goal. Kit may exit with status 139 after the run directory is complete;
judge a run by `outcome.json`.
````

## docs/libero-pro.md

````text
# LIBERO-Pro

## Setup

```bash
cd /path/to/ASPIRE
scripts/bootstrap_libero.sh
source .venv-libero/bin/activate
export LIBERO_CONFIG_PATH="$PWD/.libero"
export TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1
export MUJOCO_GL=egl PYOPENGL_PLATFORM=egl EGL_PLATFORM=device
```

The bootstrap initializes pinned submodules and installs the frozen runtime into `.venv-libero`.
Do not repair it with unpinned package upgrades; update the lock and bootstrap deliberately.

Offscreen rendering needs the vendor-neutral GLVND dispatch library `libEGL.so.1` (Debian
`libegl1`). The NVIDIA driver alone is not enough — MuJoCo loads `libEGL.so.1`, and without it
`doctor` fails the EGL check with `'NoneType' object has no attribute 'eglQueryString'`.

### Selecting a GPU

EGL device enumeration ignores `CUDA_VISIBLE_DEVICES`, so MuJoCo renders on physical GPU 0 unless
`MUJOCO_EGL_DEVICE_ID` says otherwise. Set both when GPU 0 is busy or when placing episodes on a
specific device; a contended GPU 0 yields intermittent depth failures
(`depth conversion produced invalid metric values`, `point_cloud_failed`) that look like policy
bugs rather than resource contention:

```bash
CUDA_VISIBLE_DEVICES=$GPU MUJOCO_EGL_DEVICE_ID=$GPU cap-harness run ...
```

## Semantics

LIBERO-Pro contains 80 required `(suite, task)` pairs across Goal, Object, Spatial, and Long
families. The adapter publishes calibrated RGB-D, seven Panda joints, normalized gripper state, and
the end-effector pose in `robot_base`. A `RobotAction` advances exactly one 20 Hz simulator tick.
The pinned LIBERO robosuite fork is an implementation dependency, not a separate policy API.
The shared tools, LIBERO metadata extensions, and host-only adapter methods are catalogued in the
[API reference](api-reference.md).

## Validation

```bash
cap-harness doctor --reset --output validation-artifacts/libero/doctor.json
cap-harness validate --plan configs/validation/libero-smoke.yaml \
  --output-dir validation-artifacts/libero/smoke
cap-harness validate --plan configs/validation/libero-nightly.yaml \
  --output-dir validation-artifacts/libero/nightly
```

`cap-harness validate --plan` is the canonical, cross-embodiment validation entry point (the same
command validates RoboSuite via its plans). The smoke matrix runs seed 1; nightly
runs seeds 1–3. Each case verifies reset metadata, schemas, a 0.05-second hold tick, a
state-changing movement tick, clean close, and fingerprint-safe resume.
These are structural gates, not task-completion benchmarks.

## Recorded run

```bash
cap-harness run \
  --benchmark libero-pro \
  --suite libero_object_swap \
  --task-id 0 --seed 1 \
  --program examples/libero/object_swap_seed1.py \
  --output-root outputs
```

### Initial-state modes

`--init-mode` selects how the LIBERO-Pro adapter derives the initial scene from the seed:

- `saved` (default): restore saved initial state `(seed - 1) % N` after reset. Deterministic, but
  seeds wrap around the finite saved-state set (typically 50), so seeds 51+ repeat earlier states.
- `seeded`: seed the environment RNG and let reset sample procedural placements. Do **not**
  restore a saved state afterward: that would overwrite the sampled movable-object positions.
  This avoids wrapping around the finite saved-state set, but different seeds are not a guarantee
  of distinct layouts for every task (placement constraints still apply). No saved state is
  selected, so `init_state_index` is `null`. Tasks with no saved states require this mode.

The selected mode is recorded in `run.json` (`init_mode`), the task context, and
`libero.get_task_metadata()["init_mode"]`. Earlier buggy seeded runs restored saved state 0;
those results should not be treated as evaluation across independently sampled layouts.

SAM3 requires authorized access to its gated model; request access and log in to Hugging Face as
described in [Host setup](host-setup.md#sam3-model-weights-need-a-hugging-face-token). Missing
credentials are an explicit provider blocker; credentials must never be copied into the repository or
run artifacts.

## Task examples

The public-API-only examples cover perception-driven manipulation beyond the
object-swap smoke task. They contain no seed-specific behavior; validation
claims should name the exact task and seeds that were run.

| Program | Suite/task | Behavior |
| --- | --- | --- |
| `open_middle_drawer.py` | `libero_goal_swap:0` | Localize and pull the middle drawer. |
| `put_bowl_in_bottom_drawer.py` | `libero_10_swap:3` | Rim-grasp a bowl, place it in the open bottom drawer, and close the drawer. |
| `put_wine_bottle_on_drawer.py` | `libero_goal_swap:2` | Side-grasp a bottle and place it on the cabinet. |
| `put_wine_bottle_on_rack.py` | `libero_goal_swap:9` | Side-grasp a bottle and place it on the rack's sloped receiving plane. |
| `close_microwave.py` | `libero_90:33` | Close the open microwave with a staged door sweep. |

These programs intentionally compose the documented low-level tools
(`segment_text`, `mask_to_point_cloud`, `plan_motion`, and
`execute_trajectory`) where contact-rich behavior needs more control than a
single high-level move. See the [API reference](api-reference.md) for the
complete boundary.

The five programs above have fresh task-success evidence at seed 1. The
microwave sweep additionally passes seeds 2 and 3. This is selected-example
evidence, not a broad randomized-layout robustness claim.
````

## docs/robosuite.md

````text
# Robosuite

## Setup

```bash
cd /path/to/ASPIRE
scripts/bootstrap_robosuite.sh
source .venv-robosuite/bin/activate
export MUJOCO_GL=egl PYOPENGL_PLATFORM=egl EGL_PLATFORM=device
```

The canonical environment path is `.venv-robosuite`. When `CAP_HARNESS_VENV_ROOT` is set, this path
is a repository-local symlink to node-local storage. It uses this checkout as editable source but
remains independent of `.venv-libero`; provider services are shared over HTTP.

## Semantics

The registry contains `cube_lifting`, `cube_restack`, `cube_stack`, `nut_assembly`, `spill_wipe`,
`two_arm_lift`, and `two_arm_handover`. Single-arm Panda is `primary`; bimanual robot0 and robot1
are `primary` and `secondary`. Public poses use `robot0_base`; secondary transforms remain inside
the adapter/provider boundary.

A `RobotAction` advances one 20 Hz native tick. A bimanual action moves both arms in that tick, and
`SynchronizedTrajectory` requires equal waypoint counts. The generated program sees only normalized
observations and typed results, never native MuJoCo state or task-success data.
Synchronized requests and trajectories must name every arm in the embodiment. Trajectory joint
names must exactly match the controlled arm, and a gripper command for a fixed-tool arm is rejected
instead of being silently ignored.
Every trajectory carries its full expected `RobotState`; execution rejects active-arm,
inactive-arm, joint-name, or gripper drift before the first control tick. `set_grippers()` commands
all arm grippers in one tick while preserving cached joint targets. Terminal, truncated, timed-out,
cancelled, stale, planner-failed, and controller-failed motions have distinct typed statuses and
cannot be reported as successful execution.
The shared tools, Robosuite metadata extensions, and host-only adapter methods are catalogued in
the [API reference](api-reference.md).

## Validation

```bash
cap-harness doctor \
  --environment-root "$VIRTUAL_ENV" \
  --expected-environment-name .venv-robosuite \
  --runtime robosuite \
  --reset --reset-embodiment robosuite --reset-suite cube_lifting \
  --output validation-artifacts/robosuite/doctor.json

cap-harness validate --plan configs/validation/robosuite-structural.yaml \
  --output-dir validation-artifacts/robosuite/structural
cap-harness validate --plan configs/validation/robosuite-control.yaml \
  --output-dir validation-artifacts/robosuite/control
```

The structural matrix covers seven tasks with seeds 1–3. The control gate verifies independent and
same-tick bimanual motion, persistent gripper targets, and home error below 0.01 rad.

TwoArmLift and TwoArmHandover have a separate six-case task-success gate. It runs each task on seeds
1–3 in a fresh process and requires `program_ok=true`, `task_success=true`, and evaluator-only
`protocol_success=true`:

```bash
CAP_HARNESS_ROBOSUITE_GPU=3 scripts/validate_robosuite_bimanual.sh
```

To software-render the simulator, set `CAP_HARNESS_ROBOSUITE_RENDERER=cpu`; OSMesa must be
available to the process, either system-wide or through `CAP_HARNESS_OSMESA_LIBRARY_DIR`. This only
makes simulation rendering CPU-only: the policies still call the separately managed SAM3, PyRoki,
and cuRobo services (canonical ports 8114, 8116, and 8118) from the shared provider stack. Provider
placement, ports, and concurrency are defined by the declarative topology and profile overlays; see
[Environment architecture](environments.md).

The six-case gate refuses a dirty checkout or reused output directory. Each finalized run includes
three camera videos, public API/provider traces, native outcome, summarized protocol witnesses, a
content manifest, exact program/dependency/commit identity, and the campaign environment hash.
The verifier re-hashes every run artifact and writes `summary.json` plus a campaign-level
`artifact-manifest.json`. Privileged grasp and task predicates are consumed only by the host-side
protocol evaluator and never enter the generated-program registry or public traces.

## Recorded run

```bash
cap-harness run \
  --benchmark robosuite \
  --suite cube_lifting \
  --task-id 0 --seed 1 \
  --program examples/robosuite/cube_lifting_seed1.py \
  --output-root outputs \
  --max-steps 3000
```

cuRobo uses adapter calibration for its robot model. Integrated bimanual planning optimizes a
combined 14-DoF trajectory and checks self-, scene-, and inter-arm collision; see
[Optional Backends](optional-backends.md).
````

## docs/behavior.md

````text
# BEHAVIOR-1K

R1 Pro in OmniGibson on NVIDIA Isaac Sim, restricted to two pickup tasks that mirror the ASPIRE
reference: `turning_on_radio` ("pick up the red radio") and `picking_up_trash` ("pick up the blue
can of soda"), both in the `house_double_floor_lower` scene. The public API is the one documented
in the [API reference](api-reference.md); the extensions under `behavior.*` add the holonomic base
and the torso.

## Setup

```bash
cd /path/to/ASPIRE
scripts/bootstrap_behavior.sh --accept-dataset-tos       # Python 3.11, Isaac Sim 5.1, cuRobo, datasets
# cuRobo is compiled for the profile whose architecture matches GPU 0 (nvidia-smi compute
# capability); pass --profile <name> or CAP_HARNESS_PROFILE to build for another card.
source .venv-behavior/bin/activate
export OMNIGIBSON_DATA_PATH="$HOME/behavior-data" OMNIGIBSON_APPDATA_PATH="$PWD/.behavior-appdata"
export OMNIGIBSON_HEADLESS=1 OMNIGIBSON_GPU_ID=0
ulimit -c 0
```

The runtime is deliberately outside `uv.lock`: BEHAVIOR-1K v3.9.2 pins Isaac Sim 5.1.0 wheels,
which exist only for Python 3.11, plus torch 2.7 (CUDA 12.8) and `numpy<2`. The bootstrap replays
the upstream installer with `uv pip`, compiles cuRobo against a CUDA 12.x toolkit
(`CAP_HARNESS_CUDA_HOME` if it is not under `/usr/local/cuda-12*` or `~/cuda-12.8`), installs
`cap-harness` editable with `--no-deps`, and refuses to proceed without the datasets unless
`--skip-datasets` is given. Never run `uv sync` in `.venv-behavior`; it removes the Isaac wheels.

Datasets (about 40 GB) are downloaded only with `--accept-dataset-tos`, which accepts the BEHAVIOR
Data Bundle terms (non-commercial academic research, encrypted assets usable only inside
OmniGibson, never redistributed). They live under `CAP_HARNESS_BEHAVIOR_DATA` (default
`~/behavior-data`), outside the repository. Isaac selects its GPU through `OMNIGIBSON_GPU_ID`, not
`CUDA_VISIBLE_DEVICES`; the first launch on a machine compiles shaders for several minutes into
`OMNIGIBSON_APPDATA_PATH`, later launches take tens of seconds. Measured on an RTX 4090 with a
warm shader cache: Kit ready in 7 s, the first reset of a task about 190 s on a cold cache and about 35 s once the scene has
loaded on the machine before, later
task-instance reloads about 5 s, roughly 16 GB of system RAM and 12 GB of VRAM for the
simulator alone. Both tasks ship 300 training instances (ids 0–299).

## Semantics

Arms are `primary` (left) and `secondary` (right), seven joints each, with normalized grippers
(0 = closed, 1 = open) mapped onto the two finger joints. A `RobotAction` advances one 30 Hz tick;
every tick sends the full R1 Pro joint target through `robot.q_to_action`, so arms, torso and base
move together and nothing drifts while one of them is commanded.

The public base frame is `odom`: the base-footprint pose captured when the task instance was loaded,
with z on the floor and yaw only. Cameras (`head`, `left_wrist`, `right_wrist`, RGB-D with
intrinsics), end-effector poses, point clouds and navigation goals are all expressed in `odom`, so a
localized object stays valid after the base drives. `behavior.get_base_pose()` returns the current
`(x, y, yaw)`; `behavior.navigate_to_pose(x, y, yaw, planner="curobo" | "servo")` drives there and
reports `moved_x`, `moved_y`, `moved_yaw`; `behavior.move_torso(target)` and
`behavior.reset_torso()` servo the four torso joints; `behavior.plan_standoff_pose(support_cloud,
object_cloud, standoff_m)` and `behavior.plan_approach_pose(object_cloud, distance_m)` are pure
geometry: the first returns a base pose just outside the support surface's nearest edge, the second
a pose short of a free-standing object along the current line of sight, both facing the object;
`behavior.base_pose_is_free(x, y)` says whether the base footprint fits at an `odom` position
according to the scene's traversability map, and `navigate_to_pose` refuses a blocked goal before
planning. When cuRobo's direct base plan fails (its wrapper optimises trajectories without graph
search, so a goal behind furniture is out of reach in one plan), the harness follows the scene's
traversability map in 1 m hops, planning each hop with cuRobo and servoing a hop that cannot be
planned; the result's diagnostics report `route`, `hops`, `servo_hops` and cuRobo's `direct_status`.
The servo path steps its commanded pose toward the goal rather than commanding the goal outright,
so the base cannot move fast enough to sweep furniture aside, and navigation fails loudly if the
base leaves the floor, which a map cell with no ground geometry beneath it can otherwise cause
without the planar pose showing anything wrong.

Motion planning runs in-process on OmniGibson's cuRobo wrapper with the simulator's own robot model
and collision world, registered as the `curobo` and `curobo-integrated` backends and used by
default (`MotionStrategy(ik_solver="curobo", trajectory_planner="curobo",
pose_planner="curobo-integrated")`). Arm plans use upstream's arm embodiment, in which the four
torso joints move with the arm; the adapter executes the planned torso motion alongside the arm
targets (`CAP_HARNESS_BEHAVIOR_LOCK_TORSO=1` plans with the torso locked instead). A scene
object whose bounding box contains a pose goal (the
object the arm is reaching into) is left out of the collision world for that plan, as OmniGibson's
own grasp primitive does; the ignored objects are recorded in the plan's diagnostics. PyRoKi and
the HTTP cuRobo service are not used. SAM3 (8114)
and Contact-GraspNet (8115) are reached over HTTP as for the other benchmarks; grasp candidates
follow the harness convention (the pose's +Z column is the approach axis).

Seeds are challenge task-instance ids, one to one; the registry enumerates the ids present under
`2026-challenge-task-instances/scenes/house_double_floor_lower/json/` and rejects a seed that has
no instance. Success is the ASPIRE-comparable pickup rule evaluated by a host-side witness: the
robot's grasp holds the target object and the object is at least 5 mm above the height it had after
the instance load (baseline captured after the load, unlike the reference). The witness writes
`evaluation/protocol.json`; generated programs never see it, the BDDL predicates, the object
registry, or instance segmentation.

## Validation

```bash
cap-harness doctor --environment-root "$VIRTUAL_ENV" \
  --expected-environment-name .venv-behavior --runtime behavior \
  --reset --reset-embodiment behavior --reset-suite turning_on_radio --seed 1 \
  --output validation-artifacts/behavior/doctor.json

scripts/validate_behavior.sh structural      # both tasks, instances 1-3, no providers
scripts/validate_behavior.sh pickup          # example programs; needs SAM3 and Contact-GraspNet
```

The structural plan (`configs/validation/behavior-structural.yaml`) resets each task on instances
1–3, checks the observation schema, that one hold tick advances exactly 1/30 s, and that the
primary arm moves. The pickup plan (`configs/validation/behavior-pickup.yaml`) runs the example
programs in a fresh process per seed with `evaluator: behavior_pickup` and requires at least one
success per task. Episodes take minutes; run one Isaac process per GPU and read `outcome.json`
rather than the process exit code, which Kit can leave at 139 after every artifact is written.

Measured 2026-09-12 on an RTX 4090: the structural plan passed 6/6 (both tasks, instances 1-3)
in 197 s of wall time in one process, including the scene rebuild when the suite changes; the
process then exited 139 with `summary.json` complete.
The same doctor (with a live reset) and the structural plan (6/6, 204 s) also passed from a fresh
clone of the repository with its own `.venv-behavior` built by the bootstrap, sharing only the
downloaded datasets. The pickup plan passed twice the same day: prelude v8 radio 2/3 (seeds 2, 3) and trash 1/3
(seed 3) in 632 s; prelude v10 radio 2/3 (seeds 1, 3) and trash 2/3 (seeds 2, 3) in 708 s, six
fresh processes each. The misses were all at the grasp (fingers closing without an assisted
grasp); navigation, search and re-acquisition succeeded on every seed.

## Recorded run

```bash
OMNIGIBSON_HEADLESS=1 OMNIGIBSON_GPU_ID=0 \
  .venv-behavior/bin/cap-harness run \
  --benchmark behavior --suite turning_on_radio --task-id 0 --seed 1 \
  --program examples/behavior/turning_on_radio_seed1.py \
  --output-root outputs/examples --max-steps 6000 \
  --camera-width 512 --camera-height 512
```

Videos are recorded at every third simulator frame (10 fps) for the three cameras; everything else
in [Recorded runs](run-artifacts.md) applies unchanged.

A successful radio run on this bench takes 80-95 s of wall time (about 35 s of it Kit start-up
and scene load) and 370-440 ticks; a trash run 115-130 s and 650-780 ticks. `outcome.json` reports
`termination_reason: task_succeeded` the tick the witness sees the object held and 5 mm up, and
`evaluation/protocol.json` carries the tick indices and the measured clearance.
````

## docs/yam-real.md

````text
# Real YAM

The real-YAM adapter exposes the shared CAP API for two six-joint arms. Motion,
including home and gripper commands, goes through `RealYamEnv.execute_action_batch`.
Arm servers own CAN; the client runtime owns the cameras and recording.

## Install and configure

```bash
scripts/bootstrap_yam_real.sh
```

The `yam-real` extra installs the client, camera, recording, and local Mink IK
dependencies. The separate `yam-real-server` extra adds the motor driver. Model
services use the existing provider environments; YAM does not require PyRoki.

Use your station's camera serials, arm endpoints, home pose, limits, gripper
measurements, and calibration. Place custom profiles in a directory passed with
`--station-config-root`. Each station directory contains `station.yaml` and its
calibration bundle. The loader verifies the bundle hashes; update the manifest
and its hash when preparing a new calibration. Robot models are package-relative.

The packaged reference profile is
[`yam-example`](../src/cap_harness/configs/yam_real/yam-example/station.yaml),
which is also the default station ID. For camera capture and calibration, follow
the [calibration workflow](../src/cap_harness/yam_real/calibration/README.md).

The default deployment runs the arm services, camera client, and model services
on the same machine. Install both YAM extras and run one server per arm, with
SocketCAN and USB access already configured. Replace the placeholders and set
these variables in each terminal:

```bash
export ASPIRE_STATION="<station-id>"
export ASPIRE_CONFIG_ROOT="/absolute/path/to/station-profiles"
```

`--station` selects the profile whose `station` field matches that ID. The loader
searches `*/station.yaml` under the configuration root; directory names may
differ. It also accepts `<station-id>.yaml` directly under that root. The profile
and calibration manifest must declare the same ID. Without a custom root, it
searches the package's `configs/yam_real` directory.

Use `127.0.0.1` for both arm hosts and distinct ports. In separate terminals:

```bash
yam-servers left --station "$ASPIRE_STATION" --config-root "$ASPIRE_CONFIG_ROOT"
yam-servers right --station "$ASPIRE_STATION" --config-root "$ASPIRE_CONFIG_ROOT"
```

Starting an arm server energizes its motors. The CAP runner connects to existing
servers; it does not start them. Closing the client does not stop the servers.

## Run

```bash
.venv-yam-real/bin/cap-harness run \
  --benchmark yam_real --station "$ASPIRE_STATION" \
  --station-config-root "$ASPIRE_CONFIG_ROOT" --suite observe_station --task-id 0 \
  --program examples/yam_real/observe_station.py --output-root outputs
```

Without `--allow-motion`, observations work and physical commands return a
`safety_interlock` error before actuation. Add it when running the home or joint
motion example. An authorized run homes during adapter reset.
`--max-steps` counts submitted motions, not servo ticks.

Use physical arm names `left`/`right` or the profile's `primary`/`secondary`
aliases. Gripper positions are normalized: `0` closed, `1` open. The calibrated
camera provides metric RGB-D; uncalibrated auxiliary views are for visual
inspection only.

For Cartesian motion, select the YAM solver explicitly:

```python
strategy = MotionStrategy(ik_solver="mink", trajectory_planner="interpolation")
plan = plan_motion(target, arm="right", strategy=strategy)
```

Collision-aware planning uses the existing cuRobo service with the packaged
dual-arm YAM description. Collision checking stays enabled by default. Planner
refusals remain typed failures. No physical planning performance is implied by
the off-robot checks.

## Recording and off-robot checks

Runs retain the normal CAP trace and a clock-sampled episode under `episode/raw`.
Video uses the station control rate and goes under `media/videos`. `--no-videos`
disables video in both recorders. Sampling stops before the run manifest is sealed.

`build_sim_station()` substitutes a MuJoCo plant and synthetic cameras under the
same `RealYamEnv` and adapter. It is a control/packaging test fixture, not a visual
manipulation benchmark. Fake-arm tests cover motion refusal and transport errors.
````

## docs/system2.md

````text
# System 2 operator runbook

Start the arm services, SAM3/cuRobo, and CAP MCP, then attach a fresh coding agent.
All services run on the **same machine** by default. If they are already running,
skip to [Start a fresh agent](#3-start-a-fresh-agent--terminal-5).

This file is for the operator. The launcher supplies the separate
[agent operating guide](system2-agent-guide.md) to the coding agent automatically.
The repository's [AGENTS.md](../AGENTS.md) holds shared robot execution rules;
[CAP tool usage](../.agents/skills/cap-tool-usage/SKILL.md) supplies the observation
and low-level action instructions.

## What the two launchers do

| Command | Starts | Meaning of `--allow-motion` |
| --- | --- | --- |
| `scripts/start_system2.sh` | CAP environment, MCP server, and Viser page | Allows the server to execute physical commands. Without it, the server rejects actuation and disables the Home button. |
| `scripts/start_system2_agent.sh` | A fresh Codex agent connected to MCP | Requests Home at startup and preapproves Home, pose, synchronized motion, joint targets, and single-arm gripper tools for that agent. |

**A motion-enabled agent opens both grippers and homes both arms at startup.**
Starting the MCP server alone does not home. Omitting the flag from the agent
launcher requests observation-only startup, but later tool approvals still follow
your Codex settings. To enforce observation-only operation through MCP, omit the
flag from the **server** command.

## 1. First-time setup

Run all commands from this repository's root. Follow [Host setup](host-setup.md)
for GPU drivers, `uv`, model-weight access, and other machine prerequisites.
Configure SocketCAN and camera access, and install and authenticate the Codex CLI.

Use an existing calibrated station profile; this startup procedure does not
generate camera calibration. See [Real YAM](yam-real.md) for the profile format
and the packaged `yam-example` reference.
Replace these placeholders and set the variables in **each service terminal**:

```bash
export ASPIRE_PROFILE="<hardware-profile>"
export ASPIRE_STATION="<station-id>"
export ASPIRE_CONFIG_ROOT="/absolute/path/to/station-profiles"
```

- `ASPIRE_PROFILE` selects a GPU configuration in `configs/profiles/`, such as
  `rtx5090`. It is independent of the station ID.
- `ASPIRE_STATION` matches the `station` field in your calibrated `station.yaml`.
- `ASPIRE_CONFIG_ROOT` contains the station directories and their calibration
  bundles. Use `127.0.0.1` and distinct ports for the two arm endpoints.

Install the environments once, or after dependency changes:

```bash
scripts/bootstrap_system2.sh
scripts/bootstrap_providers.sh --providers sam3,curobo --profile "$ASPIRE_PROFILE"
```

These create `.venv-system2`, `.venv-sam3`, and `.venv-curobo` inside this checkout.
No manual virtual-environment activation is needed for the commands below.

For **Astra-low**, edit these existing top-level keys in `~/.codex/config.toml`
(add them if absent):

```toml
model = "gpt-6-astra"
model_reasoning_effort = "low"
```

The agent launcher inherits these settings. It accepts `--allow-motion`, optional
`exec`, and task text; it does not forward Codex options such as `-m` or `-c`.

Shell commands run without approval prompts, with writes limited to the workspace
and temporary directories and network access enabled for package installation.
The launcher puts the `uv` package cache in `.uv-cache/`. Install task dependencies
in a repository virtual environment or temporary directory. These settings apply
to newly launched agents.

## 2. Start the services

Keep each command running in its own terminal. Reuse services already running for
this station; do not start a second arm controller or camera owner.

### Terminal 1 — SAM3 and cuRobo

```bash
scripts/supervise_services.sh --providers sam3,curobo --profile "$ASPIRE_PROFILE"
```

Wait for `all provider services ready`. Default ports are SAM3 **8114** and cuRobo
**8118**. Provider logs are in `validation-artifacts/service-logs/`.

### Terminal 2 — left arm

```bash
.venv-system2/bin/yam-servers left --station "$ASPIRE_STATION" \
  --config-root "$ASPIRE_CONFIG_ROOT"
```

### Terminal 3 — right arm

```bash
.venv-system2/bin/yam-servers right --station "$ASPIRE_STATION" \
  --config-root "$ASPIRE_CONFIG_ROOT"
```

Starting an arm service energizes its motors. Normal starts load saved gripper
calibration. Only for initial gripper calibration, add `--calibrate-gripper` with
empty, clear fingers; it moves the fingers and saves their measured travel.

### Terminal 4 — CAP MCP and visualizer

```bash
scripts/start_system2.sh --station "$ASPIRE_STATION" \
  --station-config-root "$ASPIRE_CONFIG_ROOT" --allow-motion \
  --sam3-url http://127.0.0.1:8114 --curobo-url http://127.0.0.1:8118
```

This connects to the arm services and owns the cameras. It serves MCP at
`http://127.0.0.1:8222/mcp/`. Adjust provider URLs if your hardware profile changes
their ports. SAM3 supplies segmentation, local Mink solves IK, and cuRobo plans
collision-aware task trajectories.

Open **http://127.0.0.1:8080** for the Viser page: a live **3D robot model**, a
**Go home** button, and camera views. Drag to orbit the model and scroll to zoom.
Both arms and grippers follow measured joint state from the shared session cache;
the model is hidden when that state is missing or stale. The URDF and meshes ship
with this repository. The model is a nominal station view; use the camera images
to assess objects and the actual surroundings.

The viewer discovers the active station's cameras, including stations with
two or three cameras; camera names and count are not fixed. Missing and stale
views are labeled. The viewer reads the existing session cache and opens no
additional cameras or arm connections.

The button runs the same Home program as MCP and is disabled while another job is
running or when the server has no motion permission. Opening the page does not
move the arms. Use `--viser-port PORT` to change its port or `--no-viser` to disable
the page. Viser starts automatically with MCP; no additional terminal is needed.

Before launching the agent, check the HTTP services from another terminal:

```bash
curl --noproxy '*' --fail --silent --show-error http://127.0.0.1:8114/healthz
curl --noproxy '*' --fail --silent --show-error http://127.0.0.1:8118/healthz
curl --noproxy '*' --fail --silent --show-error http://127.0.0.1:8222/health
```

These establish service availability. The agent checks robot state and camera
freshness through MCP after connecting.

## 3. Start a fresh agent — Terminal 5

With the services running and Astra-low configured above:

```bash
scripts/start_system2_agent.sh --allow-motion
```

This creates a fresh interactive session. The expected startup sequence is:

1. Discover the CAP MCP tools.
2. Call `cap_program_go_home` once. Both grippers open, then both arms home.
3. Wait for the terminal result and inspect fresh camera views.
4. Report `READY`, the measured `home_verified` result, joint residuals, and gripper
   state, then wait for your task. A failed command or unopened gripper blocks the
   task; a home residual outside the reported tolerance is shown as a diagnostic.

Then type your task into that agent, for example:

```text
Pick up the cube using move_to_pose and the single-arm gripper tool.
Verify that it lifts from the table, then hold it.
```

The guide instructs the agent to use
`strategy={"ik_solver":"mink","trajectory_planner":"curobo"}` for pose planning
and verify the physical result from fresh evidence.

Pose targets accept either `rpy_deg: [roll, pitch, yaw]` in degrees or
`quaternion_wxyz: [w, x, y, z]`. Supply exactly one orientation format; see the
[Cartesian pose contract](api-reference.md#cartesian-pose-inputs) for an example.

To run a task noninteractively, use:

```bash
scripts/start_system2_agent.sh --allow-motion exec "Pick up the cube and hold it."
```

That also performs startup Home before the task. To start an agent that only
checks readiness and waits, omit `--allow-motion`. To attach another fresh agent,
rerun the launcher; services can remain running. Each motion-enabled fresh agent
performs Home again.

### Reproduce the manipulation demos

After completing the station setup above, select **one** task recipe for the
physical objects on the table. These text-based skills describe contact strategy,
recovery, and completion evidence; they do not require the original recordings,
Codex rollouts, or saved Cartesian targets.

| Task | Text-based task skill | Scene and completion evidence |
| --- | --- | --- |
| Rubik's Cube | [Task context](../examples/yam_real/rubiks_cube/TASK_CONTEXT.md) + [verified cube guide](../.agents/skills/manipulation-tasks/rubiks-cube.md) | A scrambled cube; verify all six faces uniform, aligned layers, and stable released placement. |
| Unscrew and pour | [Bottle-opening recipe](../examples/yam_real/unscrew_bottle/TASK_CONTEXT.md) | A rigid bottle with a conventional screw cap and a pill inside; verify detached cap, pill on the table, and released upright bottle. |
| Pill insertion and closure | [Pill-and-cap recipe](../examples/yam_real/pill_in_bottle/TASK_CONTEXT.md) | An open bottle, a loose pill that fits its mouth, and a compatible cap; verify containment and threaded seating, and report final tightness separately when unverified. |
| Inverted cup nesting | [Cup-stacking recipe](../examples/yam_real/cup_stacking/TASK_CONTEXT.md) | Compatible tapered cups; count all requested cups and verify one stable, opening-down nested stack after release. |

[AGENTS.md](../AGENTS.md) directs the agent to the
[manipulation skill entrypoint](../.agents/skills/manipulation-tasks/SKILL.md).
The original cube task context and manipulation guide are unchanged. The three
additional recipes are distilled from demo-session experience and checked against
the current tool contracts, but have not yet been revalidated with a fresh robot
session. In particular, retained cap seating does not establish final tightening
torque. Do not treat these instructions as a guarantee of success or skip the
recipe's physical verification.

Prepare the matching objects, leave the arms' startup Home paths clear, and run
one of the commands below from the repository root. Each fresh motion-enabled
agent opens both grippers and homes before acting; do not launch it while holding
an object. The recipes use the native low-level CAP tools, with no WAM checkpoint
or VLM supervisor required. Ground all poses in the current calibrated station.

For an already-ready agent, type the corresponding quoted task prompt into its
terminal instead of launching another session. For a reproducible trial, record the
model/reasoning settings, object setup and count, gripper type, operator
interventions, and verified final predicates; use the runbook's
[recording option](#stop-or-restart) to save the run.

### Unscrew and pour

```bash
scripts/start_system2_agent.sh --allow-motion \
  "Read examples/yam_real/unscrew_bottle/TASK_CONTEXT.md. Unscrew the bottle cap, place it separately, pour the pill onto the table, and leave the bottle upright and released."
```

### Pill insertion and bottle closure

```bash
scripts/start_system2_agent.sh --allow-motion \
  "Read examples/yam_real/pill_in_bottle/TASK_CONTEXT.md. Put the pill into the bottle, fit and tighten its cap, and leave the bottle standing on the table. Verify containment and cap seating; do not claim final tightness unless established."
```

### Inverted cup nesting

```bash
scripts/start_system2_agent.sh --allow-motion \
  "Read examples/yam_real/cup_stacking/TASK_CONTEXT.md. Nest all the cups upside down into one stable stack and release it."
```

### Solve a Rubik's Cube

With the same services running, start a fresh agent with the packaged task:

```bash
scripts/start_system2_agent.sh --allow-motion \
  "Read examples/yam_real/rubiks_cube/TASK_CONTEXT.md. Solve the physical Rubik's Cube and put it down on the table."
```

After startup Home, the agent reads the [task context](../examples/yam_real/rubiks_cube/TASK_CONTEXT.md)
and [cube strategy](../.agents/skills/manipulation-tasks/rubiks-cube.md). These cover
six-face reconstruction, supported layer turns, reorientation, recovery, and
verification of a solved cube released on the table. They use the live camera views
and existing low-level MCP actions. The agent needs an available symbolic cube
solver to compute and validate a solution for the current scramble.

## Home shortcut

Click **Go home** in Viser, or type **`go home`** in the agent terminal. Both use the
same session program. The agent calls the existing MCP tool:

```text
cap_program_go_home({})
```

Home opens each gripper through the single-arm tool, then moves both arms to the
profile's `home_joints` in one interpolated home motion. It reports the measured
joint residuals and `home_verified` using a 0.03 rad diagnostic tolerance.
ASPIRE's controller scales the motion duration with distance, from 1.5 to 8 seconds.
Home runs entirely inside this repository and does not need SAM3 or cuRobo.

Home releases anything held; it does not place an object. For placement first,
say **`Put the cube on the table, then go home`**. The home sweep uses joint
interpolation, so provide a clear path for both arms.

## Stop or restart

Exit the agent to end its conversation. MCP and the arm services remain running.
To shut down the stack, finish any motion, place held objects, and support the arms;
then stop MCP, the two arm services, and the provider supervisor with `Ctrl-C` in
their terminals. Stopping an arm service disables its motors. MCP shutdown waits
for in-flight execution and closes cameras; it is not an emergency stop.

For recording, add `--record-dir NEW_DIRECTORY` to the MCP command; add `--no-video`
to omit video. For an off-robot session, use MCP's `--sim` option instead of starting
the arm services; it still needs a configured station model.

## Included System 2 components

- `agent/server.py`: environment lifecycle, MCP HTTP endpoint, and operator steering.
- `agent/mcp.py`: tool schemas, dispatch, numeric results, and camera images.
- `agent/session.py`: serialized jobs, observations, and queued operator messages.
- `agent/embedded.py`: attaches the same session to a caller-owned CAP API.
- `agent/visualizer.py`: Viser robot model, camera views, and Home on the same session.
- `agent/programs/`: packaged observation and Home shortcuts.
- `yam_real/live_adapter.py` and `yam_real/control/runtime.py`: shared observations
  and one actuation worker.

Use `get_capability_graph` to discover the tools configured in the running session.

### Control path and dependencies

```text
Codex agent ── MCP ──> shared CAP session <── Viser Home button
                           │      └── cached state/images ──> Viser model and cameras
                           └── CAP API / live adapter / control worker
                                 └── RealYamEnv.execute_action_batch
                                       └── arm RPC clients
                                             └── left/right arm services
                                                   └── CAN motor drivers
```

`RealYamEnv` owns the station's RealSense camera readers. Pose tasks use SAM3 over
HTTP for segmentation, calibrated RGB-D for localization, local Mink for IK, and
cuRobo over HTTP for planning. Home uses the station's joint targets directly.

| Layer | Environment | Main dependencies |
| --- | --- | --- |
| Coding agent | Installed Codex CLI | Account authentication and selected model |
| MCP, session, and visualizer | `.venv-system2` | FastAPI, Uvicorn, MCP SDK, Viser, yourdfpy, Pillow |
| Real YAM environment and kinematics | `.venv-system2` | NumPy, SciPy, Portal RPC, RealSense SDK, MuJoCo, Mink |
| Arm services | `.venv-system2` | Packaged YAM controller, DaMiao motor library, SocketCAN |
| SAM3 service | `.venv-sam3` | SAM3, PyTorch, model weights |
| cuRobo service | `.venv-curobo` | cuRobo, CUDA, PyTorch, robot model |

The environment, arm server, session, and viewer implementations all live in this
repository. Station profiles supply arm endpoints, CAN interfaces, joint limits,
home targets, camera serials, and calibration; no other workspace checkout is used.
````

## docs/system2-agent-guide.md

````text
# System 2 agent operating guide

These instructions are for the coding agent operating an already configured CAP
MCP session. `scripts/start_system2_agent.sh` includes this file in the agent's
initial instructions. The operator uses [the runbook](system2.md) to install and
start the services; by default they all run on the same machine.

Follow the repository's [AGENTS.md](../AGENTS.md). Before the first robot command,
read [.agents/skills/cap-tool-usage/SKILL.md](../.agents/skills/cap-tool-usage/SKILL.md)
for observation, localization, and the ASPIRE low-level action contract. For a cube
task, read [manipulation-tasks](../.agents/skills/manipulation-tasks/SKILL.md) and its
linked task context and cube strategy. Read each once; reuse it through the session.

Discover the active station and available capabilities through MCP. Camera names
and count come from the runtime. Calibration and service addresses belong to the
operator's configuration.

Follow the launcher's session startup mode. For a motion-enabled fresh session,
discover the tools and call `cap_program_go_home` with `{}` exactly once before
starting the operator task. This opens both grippers and returns both arms to
the station's configured home pose. Wait for completion, inspect fresh views,
and report `READY` with `home_verified`, measured joint residuals, and gripper
state. A residual outside the reported home tolerance is diagnostic; report it
accurately. If the command fails or either gripper is not open, stop and report
the failure. For observation-only startup, observe and report without motion.

When the operator says "go home", call `cap_program_go_home` with `{}`. This is
the Home shortcut and releases both grippers; it does not place a held object.
If the operator asks to put an object down and then home, complete placement first.
Do not home again between tasks unless requested.

Camera frames include acquisition age and stale/missing flags. Cached pixels do
not become fresh merely because they were polled again. CAP motions finish
atomically; the session is not the controller's emergency-stop mechanism.
````

## docs/environments.md

````text
# Environment architecture: simulators, providers, profiles

Simulator environments and model-serving provider environments are separate.
Simulators (LIBERO, Robosuite, BEHAVIOR-1K) install only their simulator runtime
plus the cap-harness client, and reach a single, shared, long-lived provider
stack over HTTP. BEHAVIOR-1K is the exception that proves the rule: its Isaac Sim
runtime cannot live in `uv.lock`, so `scripts/bootstrap_behavior.sh` builds
`.venv-behavior` from the pinned upstream installer steps, and motion planning for
it runs in-process on the simulator's own cuRobo instead of the cuRobo service. This keeps simulator installs light (no torch/model-server
packages) and lets one provider instance serve every simulator client.

## Single source of truth

`configs/environments.json` is the declarative topology. It lists every
simulator and provider, their canonical `.venv-<name>` basenames, provider
service modules, canonical ports, the client-only dependency set, and the
acceptance-critical provider ports. The supervisor, doctor, bootstraps, and
structural tests all resolve their configuration through
`cap_harness.environments` instead of hard-coding these values.

`configs/profiles/<name>.json` binds the topology to hardware. A profile sets
GPU placement, the build architecture (resolved against `gpu_runtime.arches` in
`configs/dependency-lock.json`), bounded per-provider request concurrency,
optional port overrides, and an optional node-local venv backing root. Two
profiles ship: `rtx5090` (single Blackwell sm_120 GPU; providers share GPU 0
with serialized access) and `l40` (multi-GPU Ada sm_89 node). Dependency
*versions* are shared and hardware-neutral; only the build *target* is per-arch.

## Virtual environment paths

Canonical, user-facing paths are always `<repo>/.venv-<name>`. On local storage
these are real directories. When `CAP_HARNESS_VENV_ROOT` is set (shared
node-local storage), the real environment lives under that root and
`<repo>/.venv-<name>` is a symlink to it; the symlink target preserves the
`.venv-<name>` basename, so name checks and doctor diagnostics stay correct.

## Bootstrapping

Simulators are bootstrapped independently and never require LIBERO first:

```bash
scripts/bootstrap_libero.sh       # -> .venv-libero   (client-only)
scripts/bootstrap_robosuite.sh    # -> .venv-robosuite (client-only)
scripts/bootstrap_behavior.sh     # -> .venv-behavior  (Python 3.11, Isaac Sim 5.1; datasets with --accept-dataset-tos)
```

Providers are bootstrapped per provider, or selectively via the
orchestration-only aggregator (there is deliberately no `bootstrap_sim.sh`
mega-installer):

```bash
scripts/bootstrap_sam3.sh --profile rtx5090     # -> .venv-sam3
scripts/bootstrap_pyroki.sh --profile rtx5090   # -> .venv-pyroki
scripts/bootstrap_providers.sh \
  --providers sam3,pyroki,curobo --profile rtx5090
```

Each bootstrap writes `<venv>/.cap-fingerprint.json` (a hash of the resolved
deps, pins, architecture, and submodule commits). An unchanged bootstrap is a
no-op instead of a rebuild.

## Running and diagnosing the shared provider stack

```bash
# one long-lived stack for a profile; GPU/ports/concurrency come from the profile
scripts/supervise_services.sh --profile rtx5090 --providers sam3,pyroki,curobo

# five-provider health/diagnostics, ports resolved from the topology
cap-harness doctor --providers sam3,contact_graspnet,pyroki,curobo
```

"Long-lived" means as long as that shell. The supervisor runs in the foreground
and traps `INT`/`TERM`/`EXIT` to `kill -TERM` every child, so a closed terminal,
a dropped SSH session or a process reaper takes **all** the providers down at
once -- and it does not restart them. There is no persistence built in. To
survive a disconnect, detach it yourself:

```bash
setsid nohup scripts/supervise_services.sh --profile rtx5090 \
  --providers sam3,pyroki,curobo >/tmp/providers.log 2>&1 &
disown
```

Worth knowing on a shared bench: a run taking minutes will fail partway if the
stack goes with the terminal, and it surfaces as provider calls timing out
rather than as anything naming the supervisor.

Each provider bounds concurrent inference via `CAP_HARNESS_SERVICE_CONCURRENCY`
(set from the profile: 1 serializes GPU access; CPU providers run higher) and
exposes `/healthz`.
````

## .claude/skills/iterative-debugging/SKILL.md

````text
---
name: iterative-debugging
description: "Run the baseline-free CaP iterative debugging (fix loop) pipeline on a user-supplied list of benchmark tasks: inspect one initial observed scene per task, generate task-level code, debug failures on development seeds using recorded run artifacts, validate on the held-out partition, grade the skill library against what actually worked, and promote only those patterns a verifier could reproduce the fix from."
---

# Iterative Debugging (Fix Loop)

For BEHAVIOR-1K (R1 Pro on Isaac Sim) use the sibling folder
[behavior/SKILL.md](behavior/SKILL.md). It is a **different protocol**, not just different
prompts: those tasks are long-horizon, so each seed grows its own policy one code block at a
time, and the campaign freezes a skill library rather than a program. Everything below is for
the tabletop benchmarks (LIBERO-Pro, Robosuite).

Use this skill to run a coordinated debugging campaign over any list of CaP benchmark tasks.
No external baseline code or baseline output directory is used. Runs use
the benchmark's own `--init-mode` (LIBERO: `seeded`, so development seeds 51–65 and the
held-out partition are distinct scenes; Robosuite uses `saved`).

## Setup

1. Complete benchmark setup for the target embodiment (`docs/libero-pro.md`,
   or `docs/robosuite.md`), including the pinned environment (for LIBERO:
   `scripts/bootstrap_libero.sh` → `.venv-libero`) and SAM3 authentication.
2. Export the benchmark environment variables (for LIBERO: `LIBERO_CONFIG_PATH="$PWD/.libero"`,
   `MUJOCO_GL=egl`, `PYOPENGL_PLATFORM=egl`, `EGL_PLATFORM=device`,
   `TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1`).
3. Start perception services (`scripts/supervise_services.sh`) and a persistent coordinator
   session.
4. Read `docs/api-reference.md`, `docs/run-artifacts.md`, and
   [main-agent-prompt.md](main-agent-prompt.md).

## Run Order

1. Take the task list from the user (any set of `(benchmark, suite, task_id)` cases), write it
   to a JSON file (format in [scripts/gen_progress.py](scripts/gen_progress.py)), and initialize
   the campaign root:
   `python3 .claude/skills/iterative-debugging/scripts/init_run.py --tasks <tasks.json>`.
   This creates `RUN_ROOT=outputs/runs/<stamp>/` (and points `outputs/runs/LATEST` at it) —
   every artifact of this campaign lives under it, one folder per task at
   `$RUN_ROOT/<benchmark>/<suite>/task_<id>/`. Generate progress with
   `python3 .claude/skills/iterative-debugging/scripts/gen_progress.py`.
   For Robosuite, append `--dev-seeds $(seq 101 125) --unseen-seeds $(seq 126 130)
   --heldout-count 100` to initialization. LIBERO defaults remain development 51–65,
   unseen-check 66–80, and held-out 1–50. Read the assigned development seeds, unseen-check
   seeds, and HELDOUT_COUNT from `campaign.json`, preserving those settings when resuming.
2. Follow [main-agent-prompt.md](main-agent-prompt.md) as coordinator. You are also the
   curriculum: choose each round's tasks from what the library can currently teach, and record
   the decision in `$RUN_ROOT/curriculum.md`. Dispatch [subagent-prompt.md](subagent-prompt.md)
   once per `pending` task. Workers explore
   ([skills/task-exploration.md](skills/task-exploration.md)), generate initial code, debug
   the assigned development seeds without reading external baseline outputs, and grade the
   skills they used in `skill_report.json`. Debugging is organized by failure mode rather than
   by seed, and every version is scored on all assigned development seeds. The selected program
   is then measured once on the assigned unseen-check seeds (LIBERO: 66–80; Robosuite: 126–130)
   before being handed over.
3. The coordinator (not workers) runs the Stage 2 held-out evaluation (seeds 1–$HELDOUT_COUNT) for
   each `stage1-done` task with [scripts/run_validation.py](scripts/run_validation.py).
4. When a task proposes skills, dispatch [verifier-prompt.md](verifier-prompt.md) on the same
   task. The verifier re-solves it from the skill library and the proposals alone — without the
   proposer's code — on the first few assigned development seeds (LIBERO: 51–55) within two
   attempts. **Only `verified` proposals are promoted into [skills/](skills/).**
5. Use [clean-task-slate.md](clean-task-slate.md) before reruns.
6. Continue until every task has all $HELDOUT_COUNT held-out results, then run the phase-3 rerun
   sweep once: tasks that scored below threshold under a library that has since changed are
   re-run against the final library, into `rerun_02/` beside the original attempt.
````

## .claude/skills/iterative-debugging/main-agent-prompt.md

````text
# Iterative Debugging — Coordinator Agent Guide

> **What:** Each task goes through two stages. Stage 1 (a subagent): explore the scene once,
> generate initial code without an external baseline, debug the assigned development seeds
> (LIBERO: 51–65), select one fix, and grade the skills it used. Stage 2 (a script you run):
> validate the selected fix on held-out seeds 1–$HELDOUT_COUNT. Alongside those, a **verifier**
> subagent tests any skills the task proposed, and **you** choose what runs next and curate the
> library.
> **Your second job:** you are the curriculum. Task order is your decision, made from what the
> library can currently teach — see [Curriculum](#curriculum-choosing-what-runs-next).
> **Campaign root:** every pipeline invocation gets one timestamped directory,
> `RUN_ROOT=outputs/runs/<stamp>/`, created once at kickoff with `scripts/init_run.py`
> (which also points `outputs/runs/LATEST` at it). All task artifacts live under
> `$RUN_ROOT/<benchmark>/<suite>/task_<id>/`.
> **Tasks:** `$RUN_ROOT/tasks.json` — the campaign task list, written once at kickoff from the
> user's request (any `(benchmark, suite, task_id)` cases) via `init_run.py --tasks`.
> **Progress:** `$RUN_ROOT/progress.md` — single source of truth for task status; always
> regenerate it with `scripts/gen_progress.py` before reading it.
> **Subagent template:** [subagent-prompt.md](subagent-prompt.md)

For a Robosuite task list, initialize with:

```bash
python3 .claude/skills/iterative-debugging/scripts/init_run.py \
  --tasks <tasks.json> --dev-seeds $(seq 101 125) --unseen-seeds $(seq 126 130) \
  --heldout-count 100
```

LIBERO keeps the existing defaults: development 51–65, unseen-check 66–80, held-out 1–50.
Read `dev_seeds`, `unseen_seeds`, and `heldout_count` from `$RUN_ROOT/campaign.json` when
assigning or resuming work. Pass them as DEV_SEEDS, UNSEEN_SEEDS, and HELDOUT_COUNT. Keep
existing run settings.

---

## Task Lifecycle

Every task moves through exactly these states (as reported by `gen_progress.py`):

```
pending ──(dispatch Stage 1 subagent)──► stage1-done ──(run Stage 2 eval script)──► done
```

- **`pending`** → dispatch a subagent (Stage 1). Never run Stage 2 on a pending task.
- **`stage1-done`** → `fix_code.py` exists; verify the handoff gate below, then run the Stage 2
  validation **script** yourself in the background. **Never dispatch a subagent for a `stage1-done` task** — it would redo Stage 1
  from scratch and could overwrite a good `fix_code.py`.
- **`done`** → all $HELDOUT_COUNT held-out seeds on disk. **NEVER touch a `done` task.**
  Re-dispatching or re-evaluating creates duplicate run dirs and corrupts benchmark results. (The
  one exception is the end-of-campaign rerun sweep, which writes to a fresh directory and never
  overwrites — see [Rerun sweep](#phase-3-the-rerun-sweep).)

## Skill Lifecycle

Skills move on their own track, reported in the `Skills` column:

```
none ──(subagent proposes)──► proposed ──(dispatch verifier)──► verified ──(you promote)──► in library
                                                            └─► refuted ──► not promoted
```

**Skill verification gates promotion into the library, not the task's own Stage 2.** The two are
independent: start a task's eval as soon as its subagent returns, whether or not its skills have
been verified. Coupling them would stall benchmark results behind library bookkeeping for no gain.

---

## GPU Ownership Ledger

The user assigns the simulation GPU set at kickoff. Follow the configured provider placement
when identifying available simulation GPUs. You are the only allocator of the assigned
simulation GPUs. Keep an explicit ledger in your working notes, e.g.:

```
GPU <assigned id>: SUBAGENT  libero-pro/libero_goal_swap/task_02   (dispatched)
GPU <assigned id>: EVAL      libero-pro/libero_object_task/task_05 (background, started)
GPU <assigned id>: FREE
...
```

Rules:

1. **One job per GPU, ever.** A job is either a Stage 1 subagent or a Stage 2 eval.
2. **A GPU stays owned by its task from subagent dispatch until that task's Stage 2 eval
   finishes.** When a subagent returns, immediately start Stage 2 for that task on the **same
   GPU** — do not give that GPU to a new subagent until the eval completes.
3. **Never trust `nvidia-smi` to decide a GPU is free.** Subagents idle between runs and the eval
   script spawns a fresh process per seed, so an owned GPU often shows 0 processes. `nvidia-smi`
   is a sanity check only:

   ```bash
   nvidia-smi -i "$GPU" --query-compute-apps=pid --format=csv,noheader,nounits
   ```

   Check each assigned GPU (a) at session start, before claiming it, and (b) when a subagent's
   result is missing its `GPU:` line. Cross-check against your ledger.
4. If you are resuming a session and have no ledger, rebuild it: regenerate progress, check
   `nvidia-smi`, and check for running background tasks before dispatching anything.

---

## Initialization: Verify Perception Services

Before dispatching any subagents, confirm the services this campaign's benchmark needs are up
(200 = UP, 000 = DOWN):

```bash
for p in $SERVICE_PORTS; do
  echo "port $p: $(curl -s -o /dev/null -w '%{http_code}' --max-time 3 http://127.0.0.1:$p/openapi.json)"
done
```

| Port | Service | Needed by |
|---|---|---|
| 8114 | SAM3 | every benchmark |
| 8115 | Contact-GraspNet | libero-pro, robosuite |
| 8116 | PyRoki | libero-pro, robosuite |
| 8118 | cuRobo | programs that select a cuRobo strategy; the robosuite bimanual gate |

BEHAVIOR-1K campaigns use only 8114 and 8115 and their own guide,
[behavior/main-agent-prompt.md](behavior/main-agent-prompt.md).

The per-benchmark values of `$SERVICE_PORTS`, `$CAP_HARNESS`, `$INIT_MODE`, `$RUN_ENV` and
`$RUN_FLAGS` are in the Benchmark Profiles table of `subagent-prompt.md`; brief every subagent
with the row for this campaign's benchmark.

If any service is down, start them with `scripts/supervise_services.sh` (in a persistent
terminal such as tmux) before proceeding — subagents will fail silently without them.

**cuRobo answers its first request slowly.** The port serves 200 as soon as the process is up,
but the first plan for a given robot model builds a planner and warms CUDA graphs, which takes
around 50 s; later plans are tens of milliseconds. Send one throwaway plan after starting the
supervisor rather than letting a subagent's first real call absorb that cost and read as a hang.
If you wrap the supervisor in your own health-checking loop, give it a tolerance longer than that
build: a wrapper that restarts cuRobo mid-build presents to subagents as `provider_unavailable`,
which reads like a program bug and costs a debugging round to diagnose.

`scripts/supervise_services.sh` starts `sam3,pyroki,curobo` by default, so cuRobo is available to
every subagent without a flag.

---

## The Loop

```
pick next tasks (curriculum) → regenerate+read progress → fill assigned GPUs → GO IDLE
        ↑                        (pending→subagent, stage1-done→eval, proposed→verifier)   │
        │                                                                                  │
        │   on SUBAGENT completion:  act on skill grades, start Stage 2 eval on that same  │
        │                            GPU, dispatch a verifier if skills were proposed      │
        │   on VERIFIER completion:  verified → promote; refuted → do not promote          │
        │   on EVAL completion:      GPU is now free → assign it the next task             │
        └──────────────────────────────────────────────────────────────────────────────────┘
```

Repeat until every task is `done`, then run the rerun sweep once (phase 3).

---

## Coordinator Rules

1. **Dispatch subagents — never debug yourself.** Your only jobs: choose what runs next, dispatch
   subagents and verifiers, run Stage 2 evals, curate the skill library, keep the ledger.
2. **Go idle after dispatching.** You are notified automatically when a subagent, verifier, or
   background eval finishes. Do not poll, monitor processes, or watch GPUs while jobs are running.
3. **Keep every assigned GPU occupied** — with subagents, verifiers, *or* evals, one job per GPU
   (see ledger rules).
4. **Never read task-specific debug files.** Do not open `trace/events.jsonl`,
   `source/program.py`, `outcome.json`, or keyframe images of individual runs — that's subagent
   work. You may read `findings.md`, `skill_report.json`, `verification_report.json`, and
   `fix_code.py` — these are the curation record, and reading `fix_code.py` is expected: it is
   where you extract the code snippet being promoted.
5. **Route by state:** `pending` → subagent; `stage1-done` → Stage 2 eval script; `proposed` →
   verifier; `done` → never touch. Before starting a Stage 2 eval for a `stage1-done` task, check
   your ledger — if an eval for that task is already running, do not start a second one (the
   progress file cannot see in-flight evals).
7. **Only verified skills enter the library.** Never promote a proposal a verifier has not
   returned `verified` on, and never promote on a `void`. An unverified proposal that reads well
   is exactly the failure this pipeline exists to prevent.
6. **Enforce the non-privileged provenance gate.** Dispatch the complete subagent template,
   including its forbidden-API and provenance rules. A returned task must explicitly report
   `Non-privileged API audit: PASS` before Stage 2 or skill promotion. If the audit is missing or
   quarantined, do not evaluate, promote, or redispatch that task; preserve its artifacts and
   report it as invalid.

---

## Workflow

### 1. Regenerate and read progress

Always regenerate before reading — the file on disk is stale otherwise:

```bash
python3 .claude/skills/iterative-debugging/scripts/gen_progress.py
cat "$RUN_ROOT/progress.md"
```

(`gen_progress.py` targets `outputs/runs/LATEST` by default; pass `--run-root "$RUN_ROOT"` when
working with an older campaign.)

**Start the watchdog once, at kickoff, and re-arm it whenever it fires.** An agent blocked on an
approval prompt does not fail, it waits, and it looks exactly like one that is thinking — this
cost one campaign **29.5 hours**, including a single 14 h 18 m block. Keep `live_agents.txt`
current: rewrite it on every dispatch and every completion, because a watchdog that alarms on
agents which merely *finished* is one you will start ignoring.

```bash
python3 .claude/skills/iterative-debugging/scripts/watchdog.py \
    --live-file "$RUN_ROOT/live_agents.txt" &
```

It exits when something has been quiet past `--idle-limit`, printing the agent's last shell
command — which is almost always the thing awaiting approval.

### The other scripts, and when you want them

| Script | Use it when |
|---|---|
| `dispatch.py` | Staging any worker or verifier package (step 3 and step 7). |
| `lint_skills.py` | **After every skill promotion.** Fails on a fence the sandbox rejects, a helper defined nowhere, or a search with no empty case; warns on a loop with no tick cost. |
| `watchdog.py` | Continuously, from kickoff. |
| `trace_stats.py` | Reporting a campaign's cost. Run `--histogram` first and set `--stall-gap` from your own gap distribution, not from the default. |
| `audit_seeding.py` | Before trusting any headline number, and after any change to the adapter's reset path. Four checks; a campaign has already lost every pre-fix sweep to a seeding bug none of them was running. |

### 2. Fill every free GPU

For each GPU your ledger shows FREE, assign one job, choosing tasks in the order your curriculum
decision set ([Curriculum](#curriculum-choosing-what-runs-next)):

- Next `pending` task → dispatch a Stage 1 subagent (step 3).
- Next `stage1-done` task with no eval in flight → start a Stage 2 eval in the background (see
  Stage 2 section).
- Task with `proposed` skills and no verifier in flight → dispatch a verifier (step 7).

Update the ledger, send all dispatches in one message, then **stop and go idle**.

### 3. Dispatching a Stage 1 subagent

Assign MAX_STEPS once (default 1000 unless configured otherwise) and use it for
both development and evaluation, with the benchmark's INIT_MODE. Keep camera settings consistent
between stages; the existing defaults are 800×512.
Use the configured benchmark runtime/container.

Keep the worker on the first seed in DEV_SEEDS until actual success, then test and adapt on the rest.
Do not cap attempts while diagnostics make progress. On a plateau, review its
findings and suggest a new diagnostic or resolve the resource limit. Keep the task
pending before first-development-seed success. After generalization work, accept complete tested
coverage with honest remaining failures; 100% success is not required. Respect
user budgets.

Copy the template from [subagent-prompt.md](subagent-prompt.md), fill in BENCHMARK, SUITE,
TASK_ID, GPU, RUN_ROOT, MAX_STEPS, DEV_SEEDS, UNSEEN_SEEDS, and HELDOUT_COUNT:

```python
Agent(
    description="Fix loop: <suite>/task_<id>",
    subagent_type="general-purpose",
    prompt=<filled-in template from subagent-prompt.md>,
    run_in_background=True
)
```

Always pass the **full suite name** (see collision warning below).

### 4. On SUBAGENT completion

The result includes `GPU: <N>` (if missing, use your ledger + the nvidia-smi fallback). Then, in
order:

1. Confirm the returned summary says `Non-privileged API audit: PASS`. If it is missing or says
   `QUARANTINED`, preserve the artifacts, report the task as invalid, and do not run Stage 2,
   promote findings, or redispatch it; stop handling that task.
2. Check the worker's selected artifacts before evaluation: all seeds in $DEV_SEEDS have
   finalized, matching-source runs at the assigned settings with all published camera videos;
   reported flags match outcomes and the first development seed succeeded without a program
   error. The audit, numbered source and `fix_code.py` hashes must agree. Confirm
   findings, the absolute video index, and that all simulator children have exited.
   Return missing coverage/artifacts to the same worker. File existence alone is
   not readiness; regenerate progress and confirm `stage1-done` after these checks.
3. Compare the two rates in the summary: a program strong on development seeds but weak on the
   unseen-check seeds (LIBERO: 66–80; Robosuite: 126–130) is overfitted, and its held-out result
   will be poor. Still run Stage 2 -- that is the measurement -- but treat any skill it proposes
   with the same suspicion, since a pattern extracted from an overfitted program is a pattern
   that did not generalize to seeds it had never touched.
4. **Start the Stage 2 eval for this task, on this same GPU, in the background** (see Stage 2
   section). The GPU remains owned by this task — do NOT dispatch a new subagent on it.
5. Act on the skill grades in `skill_report.json` (step 6a). Repair anything graded `wrong`
   **before** dispatching another subagent — every task dispatched against a known-broken skill
   pays for it again.
6. If the task proposed skills, write `verification/proposed_skills.md` and dispatch a verifier
   (step 7).
7. Update the ledger (`SUBAGENT` → `EVAL`) and go idle.

### 4b. On VERIFIER completion

1. Read `verification_report.json`. On `verified`, promote the proposals (step 6c). On `refuted`,
   do not promote — record the `gaps` text against the proposal so a later task can rewrite it
   rather than rediscover the same dead end. On `void`, discard the result entirely and, if the
   cause was a breach of the reading rules, dispatch a fresh verifier.
2. If you promoted anything, the library hash has changed. Every task dispatched from now on sees
   the new library; tasks already done under the old one become rerun candidates for phase 3.
3. Update the ledger and go idle.

### 5. On EVAL completion

1. Regenerate progress and confirm the task shows `done` ($HELDOUT_COUNT/$HELDOUT_COUNT results). If seeds are missing,
   re-run the same eval command with `--resume` on the same GPU.
2. The GPU is now genuinely free — mark it FREE in the ledger and assign it the next job
   (step 2).
3. Go idle.

### 6. Update skills

After each subagent completion, read the task's `findings.md` and `skill_report.json` (the
subagent is required to write both) and act on them in this order. Subagents and verifiers never
write to `skills/` — only you do. If `findings.md` is missing, note it and use the subagent's
returned summary instead.

**6a. Act on the grades first.** `skill_report.json` says how the library performed. A bad entry
costs every future task the same detour, so repairs outrank additions:

| Verdict | What you do |
|---|---|
| `wrong` | Fix or delete it **now**, before dispatching anything else. It is actively breaking tasks. |
| `misleading` | Narrow the trigger, or add the counter-case the subagent hit. Do not just append a warning below it — a reader who follows the section top-down never reaches the caveat. |
| `useful` | Add the new evidence (task, seeds) to the existing entry. Repeated independent confirmation is what turns a pattern into a rule. |
| `not-applicable` | No action. It maps where the library's edges are. |

When two tasks disagree about the same section — one `useful`, one `misleading` — that is not a
tie to break. **Ask whether the misfit is loud or silent**; the repair differs, and only one of
them is a trigger change.

| Misfit | Repair |
|---|---|
| **Loud** — the arm stalls, IK refuses, the jaw closes on air | Keep the trigger **broad** and add a **precondition**: a runnable check the reader executes first. `solve_ik` costs zero simulator ticks. |
| **Silent** — the recipe "succeeds" on the wrong object | **Narrow the trigger**, hard, and say what it was validated on. |

Default to the precondition. Narrowing costs a prose renegotiation every time a new scene
disagrees — one entry had three of its four `misleading` grades keep *every line* of the recipe and
object only to scope — while a broad trigger is nearly free: `not-applicable` was 394 of 1,372
consultations and costs a read. The silent case is the one that earns a hard scope line: a
horizontal-wrist approach outside its validated range gripped the drawer one shelf up and reported
`jaw_after_close` 0.0188 m, a real bar diameter, so every sanity check passed and the task scored
**0/50**.

**A precondition is code or it is nothing.** A scope claim you cannot write as a runnable check is
a note; put it in the body where no one has to adjudicate it.

**6b. Send proposals to a verifier, do not promote them directly.** `proposed_new` and
`proposed_edits` are claims, not findings. Promote a proposal only after a verifier returns
`verified` (step 7). This is the difference between a library of what worked and a library of
what someone believed.

**6c. Promote verified proposals.** Route by topic: SAM3 prompts and disambiguation →
[skills/localize.md](skills/localize.md); grasp selection, offsets, verification →
[skills/grasp.md](skills/grasp.md); waypoints, transit, placement →
[skills/transport.md](skills/transport.md); drawer/knob/push techniques →
[skills/manipulation.md](skills/manipulation.md).

**Write each pattern in the richest form that fits — do not default to a table row.**

- **Default format: a freeform subsection**, modeled on the existing ones ("Pre-Probe IK
  Conditioning" in transport.md, "Disambiguation" in localize.md):
  - **Trigger** — the symptom or scene condition that calls for the pattern.
  - **Code** — the working snippet (5–20 lines). Open the task's `fix_code.py` (and the snippet
    in `findings.md`) and extract the real code, generalizing task-specific prompts and
    constants into placeholders. Do not paraphrase code into prose.
  - **Why it works + evidence** — one or two sentences, plus which task/seeds it fixed.
- **Table rows are only for one-line lookups** — a prompt string, a Z formula, a numeric
  threshold. If the Notes cell needs a sentence of procedure, it is not a table row: write a
  subsection (optionally with a table row pointing to it).
- **Merge, don't append.** If an existing section already covers the pattern, extend it — add
  the new evidence, widen the trigger, note the variant. Never add a table row that paraphrases
  an existing section.

**6d. An entry states what is TRUE NOW. Its history goes in the changelog.**

This rule exists because the previous campaign ignored it and `transport.md` reached 28,000 words
— 60% commentary, 31 headings against 191 correction blocks — before anyone noticed. Cost: one
task scored **0/5** by shipping the pre-correction form of a snippet whose correction sat one
section below it. "Merge, don't append" was already written above and was not enough, because
adding a blockquote *inside* a section technically merges. So, concretely:

| When a verifier or subagent corrects an entry | Do this |
|---|---|
| A claim is refuted | **Replace the claim.** The old wording goes to `<file>-changelog.md`, not into the entry under a strikethrough. |
| A number is re-measured | **Overwrite it.** One current band, not a lineage of three. |
| A correction belongs to a snippet | **Put it in the snippet as a comment.** Prose beside code does not protect the code — that is the 0/5 above. |
| Tasks genuinely disagree | Keep the disagreement, in one sentence, in a `**Limits.**` line. Unresolved is a legitimate state; four paragraphs arguing about it is not. |

An entry over ~400 words is a signal you are narrating rather than instructing. Run
`lint_skills.py` after every promotion; it fails the build on a search with no empty case and
flags entries that prescribe a loop with no tick cost or a reach figure with no gripper state.

**6f. An ablation the proposer ran on its OWN program is provenance, not evidence.** Record it
under `**Limits.**` with who measured it; never make it the `**Evidence.**` line, and never let it
turn a cost into a correctness claim. A one-line change to your own passing program varies *that
program's* tolerance for the line, not the line. Measured: a proposer ablated its drawer pull axis
to "toward the robot base" and reported **0/15**; a verifier re-ran the identical one-line change
on its own program and got **5/5**, at 882–916 ticks against 299–603. The axis was never a
correctness claim — it is a ~600-tick budget claim, free on a single-subgoal task and fatal on a
two-subgoal one. Both numbers were real; the proposer's was confounded, because on *its* program the
wrong axis also broke the standoff. Promote such a row to Evidence only if a verifier reproduced it
independently.

**6e. Do not promote a correction that has only agreeing evidence.** Four tasks agreeing is not
the same as one task disagreeing and losing. This campaign retired a descent test on three
contradicting measurements, replaced it with two rules, and had to retract one of them a day
later — the half that survived had faced disagreement, the half that failed had only ever been
confirmed. Before you write a new rule, ask which measurement would have refuted it, and whether
any task ran that measurement.

### 7. Dispatch a verifier for proposed skills

When a task's `skill_report.json` contains any `proposed_new` or `proposed_edits`,
`gen_progress.py` lists it under **Skill verification needed**. Dispatch one verifier per such
task **on a free GPU** — not on the one running that task's Stage 2 eval. A verifier is a full
job, and putting it beside an eval breaks the one-job-per-GPU rule and slows both. If no GPU is
free the verifier waits: it gates skill promotion, not the task's own result, so it is the thing
that can queue.

`scripts/dispatch.py` stages the package — the proposals, outside the task directory, plus the
verifier prompt with the standing addenda and disputes already filled in:

```bash
python3 .claude/skills/iterative-debugging/scripts/dispatch.py verify \
    --suite "$SUITE" --task-id "$TASK_ID" --gpu "$GPU"
```

It prints the prompt path. **Dispatch the agent with "read this file and follow it exactly" —
never paste the contents inline**, or the record of what an agent was told dies with the context.
The same script stages workers (`dispatch.py worker ...`).

It refuses politely when a task proposed nothing, which is a real state and not an error: one task
this campaign finished with no `skill_report.json` at all and there was nothing to verify.

**Then read what it staged, and edit it.** Two things the script cannot judge:

- **Keep the pass counts, drop the seed identities.** "11/15 → 14/15 on development seeds" is what
  makes a claim worth testing; "seeds 53, 55, 60 flipped" tells the verifier which scenes to target
  and turns the check into a lookup. Rewrite those lines by hand. A find-and-replace over the
  numbers has already produced evidence reading "from a majority to a majority (some development
  seeds flipped)" — which a verifier correctly reported as unpromotable, because the provenance the
  library requires had been erased along with the seed numbers.
- **Strip any cross-reference into the proposer's own directory.** One proposal pointed at "the
  snippet in findings.md" — a file the verifier may not open. If a proposal needs code to be
  usable, the code has to be *in* it.

**Do not put `TASK_DIR` in the verifier's prompt.** It works only in `$VERIFY_DIR` and is never
told where the proposer's artifacts live — an isolation that is a stated rule *and* a path it
does not have. Naming the task directory to explain what to avoid hands over the index instead.

For a phase-3 rerun, append the attempt to the workspace name
(`..._task_${TASK_ID}__rerun_02`) so a rerun's verification does not overwrite the original's.

```python
Agent(
    description="Verify skills: <suite>/task_<id>",
    subagent_type="general-purpose",
    prompt=<filled-in template from verifier-prompt.md>,
    run_in_background=True,
)
```

**On verifier completion:**

1. `verified` → promote the proposals into the library (step 6c). The verifier reproduced the fix
   from the skill text alone, so the text carries what it claims.
2. `refuted` → **do not promote.** Read `gaps` in `verification_report.json`: it names what the
   skill failed to convey. Either rewrite the proposal to close that gap and re-verify, or drop
   it. A refuted proposal is a good outcome — it is a bad skill caught before it misled anyone.
3. `void` → the run was broken or the reading rules were breached. The result says nothing about
   the skill. Fix the cause and dispatch a fresh verifier; never promote on a `void`.

A verifier passing on the task its skill came from means the skill **transmits** — a fresh agent
can follow it to the fix. It does **not** mean the skill generalizes; that evidence only arrives
when a later, different task reports the skill `useful` in its own `skill_report.json`. Do not
describe a verified skill as proven general in the library text.

---

## Curriculum: choosing what runs next

Task order is yours to choose, and it matters: skills compound, so a task run early pays into
every task after it, while a task run before the library can help it wastes that opportunity.
There is no fixed policy — you decide each round from what the library can currently teach.

**Every round, before dispatching, append your decision to `$RUN_ROOT/curriculum.md`:**

```markdown
## Round <n> — <UTC timestamp>

Library now covers: <the capabilities with verified entries, and how strong each is>
Thin or missing: <capabilities with no verified entry>
Remaining tasks: <count>

Picked: <task refs>
Why: <the reasoning — which library sections you expect these tasks to draw on, and what you
      expect them to teach back>
Deferred: <task refs> until <what has to exist first>
```

Write this even when the choice is obvious. It is the only record of *why* the campaign ran in
the order it did, and at the end it is what tells you whether ordering helped.

**What to weigh:**

- **Feed the library where it is thin.** A capability with no verified entry (check the `Skills`
  column and the library itself) is where the next task teaches the most.
- **Spend the library where it is strong.** A task whose failure modes match a verified section
  is likelier to succeed *and* to confirm that section independently — which is what turns a
  one-task pattern into a rule.
- **Prefer transfer within a family.** Skills move most reliably between tasks in the same LIBERO
  family; a `libero_goal_swap` finding helps another goal task before it helps a spatial one.
- **Defer, explicitly.** If a task needs a capability the library cannot yet teach, say so and
  name what has to exist first. A deferred task with a stated precondition is a plan; a skipped
  task is an accident.
- **Do not starve a family.** Deferring everything hard produces a library that only knows easy
  scenes. If a capability stays thin for two rounds, run a task that needs it anyway and let the
  failure teach you.

You are not required to fill every GPU from a single family or round. Keeping GPUs busy
([The Loop](#the-loop)) outranks curriculum tidiness — if your preferred next task is blocked,
dispatch the best available one and record why.

---

## Phase 3: the rerun sweep

The campaign runs in three phases. Phases 1 and 2 are the loop above; phase 3 happens once.

1. **Run every task**, growing the library as you go.
2. **Rank** — once nothing is `pending` or `stage1-done`, `gen_progress.py` lists a **Rerun
   sweep** section: tasks that scored below the threshold *and* ran under a library that has
   since changed. A task already at the current library hash is not a candidate; rerunning it
   would only reproduce its own result.
3. **Rerun** those tasks against the final library.

**Do not rerun before every task is done.** The whole value of a single sweep is that each rerun
sees the richest library the campaign produced; rerunning mid-campaign spends GPU time on a
library that is still moving.

A rerun **never overwrites the first attempt.** Dispatch the normal Stage 1 subagent template
with `TASK_DIR` pointed at `$RUN_ROOT/<benchmark>/<suite>/task_<id>/rerun_02`, then run Stage 2
against `rerun_02/fix_code.py` with `--output-root` inside that directory. The original evidence
stays exactly as it was, and the two results are directly comparable — same task, same seeds,
different library. Record both in your summary; a rerun that scores *worse* is a real signal that
something promoted into the library is harmful.

---

## Stage 2: Held-Out Evaluation (seeds 1–$HELDOUT_COUNT) — run by the coordinator

Set `VALIDATION_WORKERS=4` for LIBERO-Pro or Robosuite. BEHAVIOR must use
`VALIDATION_WORKERS=1` and its own benchmark guide: Isaac shutdown requires a fresh process
for every episode, not a reusable batch worker.

Run this yourself, in the background, on the GPU the task already owns (`$GPU` below = that GPU).
Subagents never run Stage 2.

```bash
python3 .claude/skills/iterative-debugging/scripts/run_validation.py \
  --benchmark "$BENCHMARK" --suite "$SUITE" --task-id "$TASK_ID" --gpu "$GPU" \
  --run-root "$RUN_ROOT" \
  --program "$RUN_ROOT/$BENCHMARK/$SUITE/task_$TASK_ID/fix_code.py" \
  --cap-harness "$CAP_HARNESS" --init-mode "$INIT_MODE" \
  --max-steps "$MAX_STEPS" \
  --seeds $(seq 1 $HELDOUT_COUNT) --resume --workers "$VALIDATION_WORKERS"
```

`--workers 4` runs the sweep through `cap-harness run-batch`: seeds share worker processes, but
each still builds and closes its own environment, and each is still scored from its own
`outcome.json`. Measured on one L40, fifty seeds cost ~37 min one-process-per-seed, ~18 min at
`--workers 1`, and ~7 min at `--workers 4`; past four the curve flattens (six workers bought 12%,
eight bought 19%, at half the efficiency). Lower it if the GPU is shared with a subagent.
`--workers 1` is the original one-process-per-seed path, unchanged.

Always pass `--run-root "$RUN_ROOT"` (as above) so the eval and its progress regeneration bind to
this campaign — otherwise the script defaults to `outputs/runs/LATEST`, which another concurrent
`init_run.py` could have repointed. `$HELDOUT_COUNT` is the campaign's held-out partition, written to `<run-root>/campaign.json` by
`init_run.py --heldout-count` (50 by default; Robosuite uses 100 with development seeds 101–125,
and an explicit reduced count remains supported). The script runs each seed with the benchmark's own init mode by default
and records an immutable manifest under
`$RUN_ROOT/$BENCHMARK/$SUITE/task_$TASK_ID/validation/runs/<run_id>/` (videos, rollout results,
and per-seed logs included). Freeze the selected policy throughout evaluation.
Never send evaluation failures back for development tuning. Disclose any reuse of
a previously exercised evaluation partition. Regenerate progress after it finishes.
A task is `done` only with all `$HELDOUT_COUNT` held-out results on disk.

---

## Single-GPU Operating Mode

When the campaign has one GPU (`GPUS=1`), this section overrides coordinator rules 1 and 4 —
those assume one subagent per free GPU:

- The ledger has exactly one row, and work is strictly serial: Stage 0 + Stage 1 for a task, then
  its Stage 2, then the next task. Never start a second task's episodes while one is running.
- **You run every `cap-harness run` yourself.** Subagents do read-only analysis of finished run
  directories: they read `outcome.json`, `trace/events.jsonl`, `source/program-result.json`,
  `logs/program.stdout` and the videos, and they write only inside `$TASK_DIR`. A subagent that
  needs an episode asks you for it and you run it.
- Budget by measured episode cost. A full development partition of a slow simulator can take over an hour
  of wall clock; plan the day around that.

---
## LIBERO Suite Name Collision Warning

All six LIBERO-Pro swap/task suite pairs share identical task ids:
- `libero_goal_swap` ↔ `libero_goal_task`
- `libero_object_swap` ↔ `libero_object_task`
- `libero_spatial_swap` ↔ `libero_spatial_task`

Always include the full SUITE name when briefing a subagent.
- **`_swap` suites:** object positions randomized per seed — SAM3 handles naturally
- **`_task` suites:** language goal remapped — the BDDL-derived task name is misleading, always
  use `get_task_context().language`
````

## .claude/skills/iterative-debugging/subagent-prompt.md

````text
---
name: iterative-debugging-subagent-prompt
description: Self-contained prompt template for task-level fix loop subagents. Copy, fill in the task, GPU, run settings and seed assignment, and pass to Agent tool.
---

# Fix Loop Subagent Prompt Template

When dispatching a subagent for one task, copy everything between the `TEMPLATE START` and
`TEMPLATE END` markers, fill in the assignment variables at the top, and pass it as the `prompt`
parameter to the Agent tool with `subagent_type: "general-purpose"` and
`run_in_background: True`. Dispatch instructions live in
[main-agent-prompt.md](main-agent-prompt.md).

<!-- ==================== TEMPLATE START ==================== -->

## Task Assignment

BENCHMARK: <libero-pro|robosuite>
SUITE:     <full suite name, e.g. libero_goal_swap>
TASK_ID:   <integer task id>
GPU:       <assigned simulation GPU>
RUN_ROOT:  <campaign root, e.g. outputs/runs/2026-07-09_14-32-00>

MAX_STEPS: <campaign comparison limit; default 1000 unless explicitly configured>
DEV_SEEDS: <development seed list from campaign.json>
UNSEEN_SEEDS: <unseen-check seed list from campaign.json>
HELDOUT_COUNT: <heldout_count from campaign.json; coordinator-owned seeds 1..N>

Working directory: $REPO_ROOT (the CaP harness repository root)

---

## What You Are

You are a fix loop subagent for the CaP (Code-as-Policy) robotics benchmark harness. Your job is
to debug failed robot trials for ONE task, write a generalizable fix program, and report results.
You have full tool access (Bash, Read, Write, Edit, Glob, Grep).

**Your scope — read carefully:**
- You own GPU $GPU exclusively. Run every episode with `CUDA_VISIBLE_DEVICES=$GPU $RUN_ENV`
  (see Benchmark Profiles). Never touch any other GPU. For the MuJoCo benchmarks `RUN_ENV`
  carries `MUJOCO_EGL_DEVICE_ID=$GPU`, which is required rather than redundant: EGL device
  enumeration ignores `CUDA_VISIBLE_DEVICES`, so omitting it renders on physical GPU 0 and
  corrupts depth when that GPU is busy.
- **When the coordinator says the campaign is single-GPU, you never launch an episode yourself.**
  Write the program, hand the coordinator the exact command, and analyse the run directory it
  reports back. Two simulator processes on one GPU is how a campaign loses an hour.
- You do Stage 0 (explore + initial code) and Stage 1 (debug $DEV_SEEDS) ONLY.
- **Seeds in $UNSEEN_SEEDS are for one measurement, at the end (Stage 1 Step 4).** Never debug
  against them and never run them twice: they are the only evidence you have that the program is
  not tuned to the seeds you did debug on, and tuning against them destroys it.
- **Do NOT run held-out seeds 1–$HELDOUT_COUNT. Do NOT run `run_validation.py`.** The coordinator runs
  Stage 2 validation after you return. Running held-out seeds yourself violates the benchmark
  protocol.
- Do NOT edit anything under `.claude/skills/iterative-debugging/skills/` — only the coordinator
  updates shared skills. Your channel for reusable knowledge is `findings.md` (Stage 1, Step 5).
- **Do NOT read any other task's directory under `$RUN_ROOT`** — not its `findings.md`, not its
  `task_analysis.md`, not its programs, not its run artifacts, even for a sibling task on the same
  scene. The shared skill library is the *only* sanctioned cross-task channel, because it is
  curated and graded; reading a sibling's notes launders unverified knowledge past that gate and
  makes it impossible to tell whether the library or the copy carried you. If a sibling's finding
  belongs in the library, the coordinator will have put it there.
- **Every file you create lives inside your task directory** (`$TASK_DIR`, defined in Stage 0).
  Every `cap-harness run` must use one of the exact `--output-root` values defined in Stage 0.
  Never create any other directory under `outputs/`, and never write run artifacts to `/tmp`.
- **If a tool refuses an action, do NOT reach for a different tool to accomplish the same thing.**
  A refusal is a decision, not an obstacle. Two workers have hit a `Write` refusal on
  `findings.md` and written the file with a shell heredoc instead; that is circumventing a
  permission boundary, and it is not sanctioned practice however convenient the result. **Write
  `findings_report.md` instead and say plainly in your returned summary that `Write` refused
  `findings.md`** — the coordinator will pick it up either way and will fix the underlying
  conflict. The same applies to any other refusal you meet.
- **Never run `rm`, and never run anything else that needs a human to approve it.** A campaign
  runs unattended: a command awaiting approval does not fail, it *waits*. One worker's `rm -rf`
  on five probe run directories blocked that agent for **14 h 18 min of its 15-hour run** — the
  task's real work took 44 minutes. To set something aside, `mv` it into `$TASK_DIR/archive/`.
  If something genuinely must be deleted, leave it and name it in `findings.md`. The same applies
  to `sudo`, to `nohup ... &` and other backgrounding (run commands in the foreground), and to any
  write outside `$TASK_DIR`.

---

## Context

CaP: LLMs write Python programs that control a robot arm via a typed public perception +
manipulation API, executed by `cap-harness run`. No external baseline is used. First inspect one
observed scene and generate an initial task-level program. Then diagnose its failures on
the assigned development seeds and select the single best generalizable fix. (Held-out validation
happens later, run by the coordinator — not you.)

**Program rules** (see `docs/api-reference.md` for the full contract):
- Programs may `import math` and nothing else; no NumPy, filesystem, or network access.
- Set a top-level `result` variable — it is recorded as the public program result.
- Only the documented public tools and the six injected constructors (`Pose`, `MotionStrategy`,
  `ArmCommand`, `RobotAction`, `Trajectory`, `SynchronizedTrajectory`) are available.

**FORBIDDEN** (use any of these and results are invalid): native simulator access or unwrapping
(`env.handle.env`, `sim.data.*`, `sim.model.*`, `sim.forward()`, `inner.parsed_problem`,
`inner._eval_predicate`, `inner.obj_body_id`, `env._step_once()`), raw reward/success inspection,
manual physics stepping, reading `.bddl`/`.xml`/`.urdf` asset files for geometry, hardcoded world
poses / object dimensions / pixel locations / seed-specific behavior that perception can derive.

This contract applies unchanged when `BENCHMARK` is `libero-pro` or `robosuite` (and remains the
default for every simulation benchmark). LIBERO-specific examples include the listed `inner.*`
state and BDDL-derived geometry. Robosuite-specific examples also include `env.sim.*`, raw
model/data/robot/observable objects, `_check_success()`, and reward access, whether reached
directly or through a wrapper, alias, or reflection.

This is a provenance rule, not only an API-name ban:

- Every task-dependent object choice, grasp or target pose, object dimension, and pixel location
  must be derived at runtime through the allowed public perception and CaP APIs.
- Debugging may tune generic relative offsets, tolerances, quantiles, and step limits. It must
  never copy observed coordinates, dimensions, pixel locations, raw reward/success values, or
  seed identities into executable constants or branches.
- Before writing `fix_code.py`, audit every task-dependent constant. If the selected program or
  its strategy used forbidden information, quarantine it, leave `fix_code.py` absent, and report
  the result as invalid; never rewrite it to hide its provenance.

**ALLOWED APIs** (the only tools available to robot programs — signatures in
`docs/api-reference.md`):

  Observation:  get_task_context(), get_observation(), get_robot_state()
  Perception:   segment_text(camera, text), segment_points(camera, points_px),
                mask_to_point_cloud(mask, camera, frame=...), estimate_geometry(point_cloud),
                localize_object(query, camera_name=..., target_frame=...)
  Grasping:     generate_grasps(camera, mask, backend="contact-graspnet"),
                select_grasp(grasps, strategy="top_down")
  Motion:       solve_ik(target_pose), plan_motion(goal, strategy=...),
                execute_trajectory(trajectory), move_to_joints(target),
                move_to_pose(target_pose), go_home(), step(action)
  Gripper:      open_gripper(), close_gripper(), set_gripper(position)
  Extensions:   libero.get_task_metadata() / robosuite... (metadata only)

`get_task_context().language` is the only reliable source for the actual goal — especially for
LIBERO `_task` suites where the task name is misleading.

For Robosuite, read camera names from `get_observation().cameras`: typically `agentview`
and `robot0_eye_in_hand`, plus `robot1_eye_in_hand` for bimanual tasks. Use
`get_robot_state().base_frame` (typically `robot0_base`) explicitly when converting a mask
to a point cloud or localizing a target; keep target poses and geometry in that frame.
Public arm names are `primary` and, when present, `secondary`. Check
`robosuite.get_controller_metadata()["controllable_gripper_arms"]` before gripper calls:
Wipe has a fixed tool. Use public joint-position commands to hold that tool for snapshot
keyframes. Task, robot, and controller metadata come from the documented public extensions.

**venv:** run `cap-harness` as `$CAP_HARNESS` (see Benchmark Profiles below). Never repair the
pinned environment with ad hoc dependency upgrades.

**Perception services must be running** before any run. Check (200 = UP, 000 = DOWN):
  for p in $SERVICE_PORTS; do echo "port $p: $(curl -s -o /dev/null -w '%{http_code}' --max-time 3 http://127.0.0.1:$p/openapi.json)"; done

**Every run uses `--init-mode $INIT_MODE`.** For LIBERO that is `seeded`, so each integer seed is
a distinct scene; omitting it collapses seeds onto the 50 saved initial states and corrupts the
seed protocol.

**Motion planning is not collision-aware unless you ask for it.** `MotionStrategy()` defaults to
PyRoki IK plus straight-line joint interpolation, which drives the arm along whatever path that
implies and will pass it through a countertop, an open drawer, or the object it is reaching for.
Nothing reports this: the motion returns `ok=True` and the arm ends up where it was asked to go,
having pushed the scene around on the way. Request planning explicitly when the transit is
free-space:

    strategy = MotionStrategy(trajectory_planner="curobo")     # PyRoki IK, planned transit
    strategy = MotionStrategy(pose_planner="curobo-integrated")  # cuRobo solves pose and path

Keep interpolation for segments where contact is the point — the final approach into a grasp, or
pressing a drawer closed. The target and any held object appear as obstacles in the observed
cloud, so a collision-aware planner refuses exactly the contact you intend. Whether cuRobo helps
is a property of a program's approach geometry, not of the task: a program that already
approaches along a clear axis pays cuRobo's latency for nothing, while one whose transit crosses
occupied space fails without it. Decide from a failure you have observed, not in advance.

A 422 from cuRobo is a diagnosis, not a bug — the body names which constraint failed
(`start_state_feasible`, `goal_ik_found`, per-constraint costs). Read it before rewriting the
program: `start_state_feasible: false` means the arm was already inside something before it
moved, which is a problem with the previous segment, not this one.
## Benchmark Profiles

Every command below is written with these five variables. Set them once, from the row for
`$BENCHMARK`, and use them verbatim afterwards. (`behavior` has its own template:
[behavior/subagent-prompt.md](behavior/subagent-prompt.md).)

| | `libero-pro` | `robosuite` |
|---|---|---|
| `CAP_HARNESS` | `.venv-libero/bin/cap-harness` | `.venv-robosuite/bin/cap-harness` |
| `INIT_MODE` | `seeded` | `saved` (`seeded` is a LIBERO-only switch) |
| Default seeds | development 51–65; unseen-check 66–80; held-out 1–50 | development 101–125; unseen-check 126–130; held-out 1–100 |
| `SERVICE_PORTS` | `8114 8115 8116` | `8114 8115 8116` (add `8118` for cuRobo programs) |
| `RUN_ENV` | `LIBERO_CONFIG_PATH=$PWD/.libero MUJOCO_GL=egl PYOPENGL_PLATFORM=egl EGL_PLATFORM=device TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1 MUJOCO_EGL_DEVICE_ID=$GPU` | `MUJOCO_GL=egl PYOPENGL_PLATFORM=egl EGL_PLATFORM=device MUJOCO_EGL_DEVICE_ID=$GPU` |

Use the coordinator's seed assignment from `campaign.json`, including when resuming an existing
run; the defaults above do not replace its saved settings. For the launch commands below, set
FIRST_DEV_SEED to the first entry in DEV_SEEDS. The commands expand RUN_ENV as space-separated
shell words, so its value must not contain literal quotes.

---

## Task Directory Layout (create first, use exactly these paths)

```bash
TASK_DIR="$RUN_ROOT/$BENCHMARK/$SUITE/task_$TASK_ID"
mkdir -p "$TASK_DIR/code" \
         "$TASK_DIR/debug/explore" "$TASK_DIR/debug/initial" \
         "$TASK_DIR/debug/attempts" "$TASK_DIR/debug/holdout" \
         "$TASK_DIR/debug/logs" "$TASK_DIR/debug/blocked"
```

| Path | Contents |
|---|---|
| `$TASK_DIR/task_analysis.md` | Stage 0 scene analysis |
| `$TASK_DIR/code/` | every program version: `v00_initial.py`, `v01_<slug>.py`, … + `CHANGELOG.md` |
| `$TASK_DIR/debug/explore/` | scene-snapshot + probe runs (`--output-root` for those runs) |
| `$TASK_DIR/debug/initial/` | v00 runs on the assigned development seeds (`--output-root` for those runs) |
| `$TASK_DIR/debug/attempts/` | one subdirectory per version, each a full development-seed sweep: `v01/`, `v02/`, … |
| `$TASK_DIR/debug/holdout/` | the single unseen-check run of the selected program (Step 4), on the seeds in `$UNSEEN_SEEDS` |
| `$TASK_DIR/debug/logs/` | one subdirectory per sweep: `v00/seed_<N>.log`, `v01/seed_<N>.log`, `holdout/seed_<N>.log` |
| `$TASK_DIR/debug/blocked/` | `<mode>.md` for a failure mode the budget ran out on |
| `$TASK_DIR/fix_code.py` | selected program (Step 3) — Stage 2 reads this exact path |
| `$TASK_DIR/findings.md` | Step 5 report for the coordinator |
| `$TASK_DIR/skill_report.json` | Step 6 grades and proposals |
| `$TASK_DIR/validation/` | Stage 2 held-out eval — coordinator-owned, never write here |

These are the ONLY output roots you may pass to `cap-harness run`. Always add `--flat-run-dir`
so runs nest as `<output-root>/<seed>/<run-id>`. Probe/exploration runs should also add
`--no-videos` (keyframes and overlays are still recorded); debug runs keep videos — they are
your evidence.

---

## Stage 0: Explore Once and Generate Initial Code

Follow [skills/task-exploration.md](skills/task-exploration.md), then read the relevant shared
skill library in [skills/](skills/). Save `task_analysis.md`.

**The initial analysis may be wrong.** It comes from one seed. Treat inferred identity, geometry,
free space, and strategy as hypotheses; revise them when later traces or keyframes disagree.
Never hardcode snapshot-specific coordinates or mask order.

Write `$TASK_DIR/code/v00_initial.py` using only allowed APIs, and start
`$TASK_DIR/code/CHANGELOG.md` with one line:
`v00 — initial program from scene analysis`. Run it across all assigned development seeds
via `run-batch` below. Preserve every executed version, including crashes; fixes get a new
numbered file.

```bash
CUDA_VISIBLE_DEVICES=$GPU MUJOCO_EGL_DEVICE_ID=$GPU \
"$CAP_HARNESS" run-batch \
  --benchmark $BENCHMARK --suite $SUITE --task-id $TASK_ID --seeds $DEV_SEEDS \
  --program "$TASK_DIR/code/v00_initial.py" \
  --output-root "$TASK_DIR/debug/initial" --flat-run-dir --init-mode "$INIT_MODE" \
  --workers 4 --log-dir "$TASK_DIR/debug/logs/v00" \
  --results-jsonl "$TASK_DIR/debug/initial/results.jsonl"
```

**Always `run-batch`, never a `for` loop over `cap-harness run`** — a loop restarts the
interpreter per seed and puts a large development sweep over the 10-minute command ceiling, where
it is killed mid-sweep. Each seed still builds its own environment and its own run directory; only
the interpreter is shared, and `results.jsonl` grows as seeds finish, so an interrupted sweep keeps
what it completed. Lower `--workers` if your GPU is shared.

---

## Stage 1: Debug on the Development Seeds

You are improving ONE program. Debug by **failure mode, not by seed**: a fix aimed at a single
seed is exactly what you would have to undo before selecting, and a program tuned to one scene
is what held-out evaluation exists to catch.

**Every version you write runs on all assigned development seeds** (`$DEV_SEEDS` from
`campaign.json`: LIBERO 51–65, Robosuite 101–125 by default). The number you are optimizing is
how many of them pass — not whether one seed flipped. A change that fixes one seed and breaks
three others is a regression, and running one seed cannot tell you that.

### Step 1 — Group the failures

Score a sweep by reading its `results.jsonl`. You will run this after every version, so keep it
to hand — `$SWEEP` is the sweep's `--output-root` (`debug/initial`, `debug/attempts/v01`, …):

```bash
python3 -c "
import json, sys
rows = [json.loads(l) for l in open(sys.argv[1] + '/results.jsonl')]
for r in sorted(rows, key=lambda r: r['seed']):
    if not r['run_dir']:
        print(r['seed'], 'NO ARTIFACT', r['error']); continue
    o = json.load(open(r['run_dir'] + '/outcome.json'))
    print(r['seed'], o['program_ok'], o['task_success'], o['termination_reason'])
print('passed', sum(1 for r in rows if r['run_dir'] and
      json.load(open(r['run_dir'] + '/outcome.json'))['task_success']), 'of', len(rows))
" "$SWEEP"
```

A seed passes on `task_success` alone — a crashed program that still completed the task counts,
though `program_ok: false` is a defect worth fixing. Now group the failures by what went wrong,
reading each failed seed's artifacts in this order (contract: `docs/run-artifacts.md`):

  - `outcome.json` — `program_ok`, `task_success`, `termination_reason`, `steps_executed`, `error`
  - `source/program-result.json` — which public calls ran and what the program concluded
  - `trace/events.jsonl` — every program/provider span with typed inputs and outputs: failed
    `solve_ik`/`plan_motion` spans, `segment_text` spans with zero segmentations (bad prompt),
    gripper/execution diagnostics, requested backends
  - `media/keyframes/` — lossless RGB before/after each motion call
  - `media/overlays/` — top-1 SAM mask rendered over RGB (verify segmentation targets)
  - `media/videos/` + `episode/steps.jsonl` — object motion, grasp retention, collisions, placement

| Mode | Evidence | Typical fix |
|---|---|---|
| Program | `program_error`, rejected AST, exception in `error` | Fix the smallest source defect. |
| Provider | Failed provider span or health error | Verify service and explicit backend request. |
| Perception | Wrong/missing mask or implausible geometry | Refine prompts, candidate filtering, or camera. |
| IK/planning | Failed `solve_ik`/`plan_motion` span | Stage the pose or change an explicitly selected backend. |
| Execution | Plan succeeds but robot does not converge | Adjust staging, tolerance, duration, or contact strategy. |
| Grasp retention | Object rises then slips during transport | Verify grasp, retain gripper commands, reduce abrupt motion. |
| Task predicate | Program completes but `task_success=false` | Inspect final geometry and incomplete subgoals. |

Write the grouping into `CHANGELOG.md`, most seeds first — that order is your work queue:

```
modes: perception 51,55,58 (3) | grasp-retention 53,57 (2) | ik 61 (1)
```

Two seeds failing the same way are one problem, and fixing it is worth three times fixing a
seed that fails alone.

### Step 2 — Fix the largest mode, then run all development seeds

Write the fix as the next numbered version — `$TASK_DIR/code/v<NN>_<slug>.py` — and append one
CHANGELOG line naming the **mode**, not the seeds: `v01 — perception: prompt fallback for
occluded can`. Never edit a version in place.

```bash
CUDA_VISIBLE_DEVICES=$GPU MUJOCO_EGL_DEVICE_ID=$GPU \
"$CAP_HARNESS" run-batch \
  --benchmark $BENCHMARK --suite $SUITE --task-id $TASK_ID --seeds $DEV_SEEDS \
  --program "$TASK_DIR/code/v<NN>_<slug>.py" \
  --output-root "$TASK_DIR/debug/attempts/v<NN>" --flat-run-dir --init-mode "$INIT_MODE" \
  --workers 4 --log-dir "$TASK_DIR/debug/logs/v<NN>" \
  --results-jsonl "$TASK_DIR/debug/attempts/v<NN>/results.jsonl"
```

Score it with the Step 1 command (`SWEEP="$TASK_DIR/debug/attempts/v<NN>"`), record the count
in CHANGELOG (`v01 — perception: ... → 9/15`), then:

- **More passes than the best so far** — keep it and move to the next mode.
- **Same or fewer** — the fix traded one mode for another. Say which seeds regressed, and either
  repair it or revert to the better version before continuing.

**Budget: 3 versions per mode, 8 in total.** A mode still unfixed after 3 is blocked; write
`$TASK_DIR/debug/blocked/<mode>.md` (`## Root Cause`, `## Details`, `## What Was Tried`) and move
to the next mode. Do not spend the remaining budget on it.

**Live inspection** — there is no REPL, so probe with an observation-only program: collect what
you need into `result`, run it with `--output-root "$TASK_DIR/debug/explore" --flat-run-dir
--no-videos --init-mode seeded`, and read `source/program-result.json` and `media/overlays/`.
Start from [scripts/scene_snapshot.py](scripts/scene_snapshot.py) (copy into `$TASK_DIR/code/` as
`probe_<slug>.py`; probes are not numbered versions).

### Step 3 — Select

Take the version with the most passes over the development seeds; break ties by fewer `program_ok: false`,
then by the simpler program. Do not assemble a new program from pieces of several — parts that
were never run together have no evidence behind them.

Run the non-privileged provenance audit before selecting; only a program that passes may become
`fix_code.py`. If every version crashes, write a minimal legal program (a single
`get_observation()` call and `result = {}`) so Stage 2 can still run.

Copy the selection to `$TASK_DIR/fix_code.py` — the coordinator's Stage 2 reads this exact path —
and record it: `SELECTED: v03 — 13/15 development seeds`.

### Step 4 — Check it on seeds you have never run

Run the selected program **once** on the seeds in `$UNSEEN_SEEDS`, which you have not seen:

```bash
CUDA_VISIBLE_DEVICES=$GPU MUJOCO_EGL_DEVICE_ID=$GPU \
"$CAP_HARNESS" run-batch \
  --benchmark $BENCHMARK --suite $SUITE --task-id $TASK_ID --seeds $UNSEEN_SEEDS \
  --program "$TASK_DIR/fix_code.py" \
  --output-root "$TASK_DIR/debug/holdout" --flat-run-dir --init-mode "$INIT_MODE" \
  --workers 4 --log-dir "$TASK_DIR/debug/logs/holdout" \
  --results-jsonl "$TASK_DIR/debug/holdout/results.jsonl"
```

A measurement, not another debugging round. **Do not fix anything against these seeds and do not
run them twice** — tune against them and they stop being unseen, and the check is worth nothing.

Report both numbers. A high rate on the debug seeds and a low one here is an overfitted program,
and saying so beats a confident hand-off: the coordinator can weigh it before promoting anything
you propose.

### Step 5 — Write findings.md (REQUIRED)

Write `$TASK_DIR/findings.md` for the coordinator to promote reusable findings. Format:

  # Findings: $BENCHMARK/$SUITE/task_$TASK_ID

  ## Root causes observed
  <one bullet per failure mode, with the seeds it cost>

  ## What fixed them
  <the change per mode, with evidence: the development rate before and after>

  ## Development vs unseen
  <n>/<total dev seeds> on the development seeds, <n>/<total unseen-check seeds> on the unseen-check
  seeds. <one line: does it generalize?>

  ## Generalizable patterns
  <patterns likely to help OTHER tasks — SAM3 prompts that worked, grasp selection tricks,
   waypoint/transport sequences, drawer/knob/push techniques. For EACH pattern give:
   - target skill file: localize.md | grasp.md | transport.md | manipulation.md
   - trigger: the symptom or scene condition that calls for it
   - the exact working code snippet (5–20 lines) copied from your fix, in a fenced code block —
     the coordinator promotes this snippet nearly verbatim; a prose description of code is not
     promotable
   - evidence: which seeds it flipped on this task
   If nothing generalizes beyond this task, write "none".>

  ## Skill report
  <How the shared library actually performed on this task — see Step 6. One line per skill
   section you consulted: name it, give a verdict, and give the evidence for that verdict.
   A library nobody grades silently accumulates advice that does not work.>

  ## Blocked modes
  <mode → root cause, or "none">

  ## Non-privileged API audit
  <PASS, or QUARANTINED with the forbidden dependency and all affected artifacts/results>

### Step 6 — Grade the skills you used (REQUIRED)

You consulted the shared library before writing code. Say how it did. A skill that misled you
costs every future task the same detour until someone reports it, and you are the only agent that
will ever see this evidence.

Write `$TASK_DIR/skill_report.json`:

Get the library hash first — it records which version of the library you actually worked from,
which is what lets the coordinator tell later whether a weak task deserves a rerun:

```bash
python3 .claude/skills/iterative-debugging/scripts/campaign.py --skill-library-sha
```

```json
{
  "schema_version": 1,
  "benchmark": "<benchmark>",
  "suite": "<suite>",
  "task_id": 0,
  "skill_library_sha": "<output of the command above>",
  "consulted": [
    {
      "skill": "grasp.md",
      "section": "Top-Down Grasp Selection",
      "verdict": "useful",
      "evidence": "applied verbatim; seeds 53 and 57 flipped to success"
    }
  ],
  "proposed_edits": [
    {
      "skill": "localize.md",
      "section": "Disambiguation",
      "change": "<what to change, concretely>",
      "why": "<the observation that motivates it>"
    }
  ],
  "proposed_new": [
    {
      "skill": "transport.md",
      "title": "<short name>",
      "trigger": "<symptom or scene condition>",
      "code": "<the working snippet, 5-20 lines, generalized>",
      "evidence": "<seeds it flipped on this task>"
    }
  ]
}
```

`verdict` is exactly one of:

| Verdict | Means |
|---|---|
| `useful` | You applied it and it helped. Give the seeds. |
| `misleading` | It sounded applicable, you followed it, and it cost you attempts. Say how. |
| `wrong` | It is factually incorrect — bad API, bad constant, code that cannot run as written. |
| `not-applicable` | You read it and correctly skipped it. No fault; it maps the library's edges. |

Rules:

- **Grade every section you opened**, the ones that helped included. A report of only complaints
  is as unbalanced as one of only praise.
- **`misleading` and `wrong` need specifics.** "grasp.md was confusing" is unactionable; "grasp.md
  §Top-Down says approach from +Z, but this handle is vertical and that grasp always slipped —
  seeds 52, 55, 61" is a repair order.
- **Write each proposal so a stranger can follow it, and propose only what you have evidence
  for.** It will be tested: a verifier re-solves this task from your proposal and the library
  alone — not your program, not your findings, not your run artifacts. Anything you leave implicit
  is not in the skill, and a proposal that fails that test is not promoted.
- Consulted nothing and propose nothing? Write the file with empty lists. An empty report is a
  result; a missing one is a hole in the record.

Then check it before you return — an unusable report strands everything you learned:

```bash
python3 .claude/skills/iterative-debugging/scripts/campaign.py \
  --validate-skill-report "$TASK_DIR/skill_report.json"
```

It exits nonzero and names each problem: an unknown skill file, a verdict outside the four, a
`misleading`/`wrong` grade too vague to act on, a proposal missing the code a verifier would
have to work from, a snippet raising an exception programs cannot use, a snippet that does not
parse, **a snippet that computes with a number it never derives**, or **a proposal that depends
on segmentation without naming a prompt**. Fix and re-run until it prints OK.

### What a proposal must carry

The verifier applies your snippet **literally**, so anything you leave implicit is not in the
skill. Ten verifications were refuted across this campaign and the causes cluster into seven
rules. This is the whole checklist:

| Rule | Why — each cost a real run |
|---|---|
| **Derive every scalar, or say what it is in the trigger.** | An undefined `fixture_z` read as `max(z)`, landed on edge noise, and the entry rejected the part it existed to select. Containers may stay open (`knob_points` says what it is); a *number* you compute with is the content. |
| **Give the literal prompt strings** wherever you segment. | A prompt quoted in prose is not one a reader can paste into `segment_text`, and `"agentview"` is a camera, not a prompt. |
| **Give the approach, not just the pose** — name the stand-off you reached it from. | Three refutations. A placement quaternion that is `planner_failed` from every stand-off outside the mouth is unusable however right the target is. |
| **Quote the tick cost** beside what it buys; "repeat until" needs a per-iteration cost. | Four attempts died at the 1000-tick ceiling with every geometric decision correct. A remedy that is correct and unaffordable reads exactly like one that is wrong. |
| **Say what was in the gripper** beside any reach or clearance figure. | An envelope measured empty froze the tool 7–9 cm short once it was carrying the object. |
| **Bound a selector at both ends; seed a search with `None`.** | The robot's own arm answers most prompts and beats every point-count, height and span rule. A search seeded with a plausible default proceeds silently when nothing matches. |
| **Publish how you measured, not only what you measured.** | Nearly every band this campaign published later widened or inverted. The method transfers; the number is a property of the scene you took it from. |

`lint_skills.py` enforces the seed-a-search rule and flags the tick and gripper omissions. The
rest are yours to get right.

---

## What to Return

You are done after Step 6. Do NOT run held-out seeds 1–$HELDOUT_COUNT or any validation script. Return exactly this
summary — the coordinator parses the `GPU:` line to schedule your GPU's next job:

```
BENCHMARK: <benchmark>
SUITE: <suite>
TASK_ID: <task id>
GPU: <N>

Stage 1 Results:
  Development seeds:  <n>/<total dev seeds>   (v00 was <n>/<total dev seeds>)
  Unseen check:        <n>/<total unseen-check seeds>
  Failure modes fixed:  <mode: seeds it cost>
  Failure modes blocked: <mode + root cause>
  fix_code.py written: yes/no
  findings.md written: yes/no
  skill_report.json written: yes/no
  Non-privileged API audit: PASS/QUARANTINED (<reason if quarantined>)

Skill report:
  Consulted: <n> section(s) — <n> useful, <n> misleading, <n> wrong, <n> not-applicable
  Flagged as misleading/wrong: <skill#section for each, or none>
  Proposed: <n> new, <n> edit(s)

Key findings:
  <1–3 bullet points: which failure mode cost the most seeds, and what fixed it>
  <if the unseen check is much worse than the development rate, say so plainly — that is
   an overfitted program and the coordinator needs to know before Stage 2>
```

<!-- ==================== TEMPLATE END ==================== -->
````

## .claude/skills/iterative-debugging/verifier-prompt.md

````text
# Skill Verifier — Subagent Template

> **What:** After a Stage 1 subagent proposes skills, one verifier re-attempts the *same* task
> armed with the skill library and those proposals — and with **no access to the solution the
> proposer found**. If the skill carries the knowledge, the verifier reaches the fix from it.
> If it does not, the skill is not promotable however good it reads.
>
> **What this proves, and what it does not.** Passing means the skill *transmits*: written down,
> on its own, it is enough for a fresh agent to reproduce the fix. It does **not** mean the skill
> generalizes — the skill was extracted from this very task, so success here is evidence about
> the writing, not about transfer. Treat a verified skill as promotable, not as proven general.
>
> **Dispatch:** one verifier per task that proposed skills, `run_in_background: True`, on a **free**
> GPU — never the one running that task's Stage 2 eval. Coordinator instructions:
> [main-agent-prompt.md](main-agent-prompt.md).

---

## Copy from here down, filling in the placeholders

<!-- ==================== TEMPLATE START ==================== -->

You are verifying whether a proposed robot-manipulation skill actually carries the knowledge it
claims. You are working on:

- BENCHMARK: `<benchmark>` (LIBERO-Pro or Robosuite)
- CAP_HARNESS and INIT_MODE: copy the assigned benchmark profile, not another task's files.
- SUITE: `<full suite name>`
- TASK_ID: `<task id>`
- GPU: `<N>`
- VERIFY_DIR: `<campaign root>/verification/<benchmark>__<suite>__task_<task id>`

Another agent already debugged this task and proposed skills from what it learned. **You must not
see its answer.** Your job is to solve the task using only the shared skill library plus those
proposals, so that whether you succeed says something about the skills rather than about copying.

---

## Ground rules

**Never run `rm`, and never run anything else that needs a human to approve it.** A campaign runs
unattended: a command awaiting approval does not fail, it *waits*. One worker's `rm -rf` on five
probe run directories blocked that agent for **14 h 18 min of its 15-hour run**. To set something
aside, `mv` it into an `archive/` directory inside your own working directory. The same applies to
`sudo`, to `nohup ... &` and other backgrounding (run commands in the foreground), and to any write
outside your assigned directory.

## Reading rules — the whole point of this job

`VERIFY_DIR` is your entire workspace, and it deliberately sits **outside** the campaign's task
directories, so nothing you are pointed at is one directory away from the answer. This template
used to hand over the task directory and then list what was inside it, which is an index of
exactly what not to look at.

Be clear about what that does and does not buy: you could still *derive* the proposer's directory
from the campaign root and the task identity above. Nothing stops you. The isolation rests on you
following the rule, not on the path being unavailable — so the rule is written to be worth
following, and the verdict is worth exactly as much as your compliance with it.

You **MAY** read:

- `.claude/skills/iterative-debugging/skills/` — the shared skill library
- `$VERIFY_DIR/proposed_skills.md` — the candidate skills under test, written by the coordinator
- `docs/api-reference.md`, `docs/run-artifacts.md`, and the benchmark docs
- Anything you yourself produce under `$VERIFY_DIR/`

You **MUST NOT** read, list, grep, glob, or open — directly or through any tool:

- Anything under the campaign's task directories: the proposer's `fix_code.py`, `findings.md`,
  `task_analysis.md`, `skill_report.json`, `code/`, `debug/`, or `validation/`
- Any other task's directory, or any other verifier's workspace
- **`examples/` — the repository ships worked solutions there, and the benchmark docs name them
  per suite and task.** `docs/libero-pro.md` is on your permitted list and will point you at one
  for this exact task. Reading it voids the measurement as surely as reading the proposer's
  program: you would be copying an answer either way. Follow the doc for API contracts, never to
  a program.
- Do not go looking for them. Do not search the filesystem for a program that solves this task,
  and do not read `progress.md` or `curriculum.md`, which name results you are not entitled to.

This is not a formality. If you read the proposer's program, the verification is void and the
skill gets promoted on no evidence — a bad skill then misleads every future task, which is the
one failure this whole pipeline exists to prevent. If you open one of these by accident, stop,
say so in your report, and set `verdict: void`. Reporting a breach costs one verification;
hiding one corrupts the library.

---

## Budget — deliberately tight

| | |
|---|---|
| Development seeds | **51, 52, 53, 54, 55** (five, not fifteen) |
| Program attempts | **2 maximum** (`v01`, `v02`) |
| Pass criterion | **≥ 4 of 5 seeds** with `task_success: true` |

The budget is the measurement. A skill that transmits well gets there quickly; one that needs
extensive rediscovery has not captured what it claims to. Do not exceed two attempts — a third
would be measuring your persistence rather than the skill.

---

## Procedure

### 1. Read the skills, then the scene

Read the shared library and `$VERIFY_DIR/proposed_skills.md` **first**, before looking at the
scene. Note which proposed skills you expect to apply and why; you will report on that prediction.

**The proposals are NOT in `skills/`, and that is deliberate** — promotion is what your verdict
decides, and an unverified entry must not reach the tasks running beside you. `proposed_skills.md`
is their only home. Do not go looking for them in the library and do not treat their absence as a
defect; several verifiers lost time to that, because the staging header used to claim the
opposite.

Then take one scene snapshot, exactly as normal task exploration does
([skills/task-exploration.md](skills/task-exploration.md)), writing only under `$VERIFY_DIR`:

```bash
CUDA_VISIBLE_DEVICES=$GPU MUJOCO_EGL_DEVICE_ID=$GPU \
"$CAP_HARNESS" run \
  --benchmark $BENCHMARK --suite $SUITE --task-id $TASK_ID --seed 51 \
  --program "$VERIFY_DIR/code/probe_scene.py" \
  --output-root "$VERIFY_DIR/debug/explore" --flat-run-dir --no-videos --init-mode "$INIT_MODE" \
  > "$VERIFY_DIR/logs/probe.log" 2>&1
```

### 2. Write `v01` from the skills

Write `$VERIFY_DIR/code/v01_from_skills.py`, applying the library and the proposals as literally
as they are written. Where a proposed skill gives a snippet, use it as given — substituting only
this task's objects and prompts. **Do not improve on it.** If a skill is wrong, the verification
must surface that, and it cannot if you quietly fix it on the way past.

Run all five seeds:

```bash
CUDA_VISIBLE_DEVICES=$GPU MUJOCO_EGL_DEVICE_ID=$GPU \
"$CAP_HARNESS" run-batch \
  --benchmark $BENCHMARK --suite $SUITE --task-id $TASK_ID --seeds 51-55 \
  --program "$VERIFY_DIR/code/v01_from_skills.py" \
  --output-root "$VERIFY_DIR/debug/v01" --flat-run-dir --init-mode "$INIT_MODE" \
  --workers 4 --log-dir "$VERIFY_DIR/logs"
```

Each seed still builds and closes its own environment and writes its own run directory and log;
only the interpreter is shared, which is what keeps five seeds to about a minute instead of four.

### 3. If `v01` misses, write `v02` — and record why

If fewer than 4 of 5 seeds pass, diagnose from your own run artifacts and write one more version,
`$VERIFY_DIR/code/v02_<slug>.py`. **Record what the skills failed to tell you** — that gap is the
most valuable thing this job produces. Then stop, whatever the result.

### 4. Report

Write `$VERIFY_DIR/verification_report.json`:

```json
{
  "schema_version": 1,
  "benchmark": "<benchmark>",
  "suite": "<suite>",
  "task_id": 0,
  "seeds": [51, 52, 53, 54, 55],
  "attempts_used": 1,
  "trials": 5,
  "passes": 4,
  "verdict": "verified",
  "skills_applied": ["grasp.md#Top-Down Grasp Selection", "proposed:transport.md#Pre-place probe"],
  "proposals": [
    {"title": "<proposal title>", "disposition": "sound", "note": "<what reproduced, with numbers>"},
    {"title": "<proposal title>", "disposition": "defective", "note": "<what breaks, and the fix>"}
  ],
  "gaps": ["<what a skill should have said but did not, or [] if none>"],
  "notes": "<one or two sentences a coordinator can act on>"
}
```

`verdict` is exactly one of:

- `verified` — ≥ 4 of 5 seeds passed within the attempt budget.
- `refuted` — the budget ran out first. Say in `gaps` what was missing; the gap text is what a
  rewrite would have to fix.
- `void` — you were unable to run the task at all (service down, environment broken), or the
  reading rules were breached. This is not a judgment on the skill; say what happened.

**`verdict` grades your ATTEMPT. `proposals[]` grades the ENTRIES, and it is the more useful
half — fill it in either way.** The two come apart in both directions, and often: a refuted
attempt on a task that is kinematically blocked can still carry three sound entries, and a 5/5
attempt has more than once been reached only by repairing the proposal on the way past. Give each
proposal `sound` (promote as written), `defective` (say what breaks and what the fix was), or
`untested` (your scene never exercised it — an entry can be correct and inert, and saying so is
worth more than a guess).

A `refuted` verdict is a good outcome, not a failure on your part. Keeping an unusable skill out
of the library is the job.

Also write `$VERIFY_DIR/verification.md` — the same story in prose, including which skills you
predicted you would need in step 1 and whether that prediction held.

---

## What to Return

```
VERIFIER
BENCHMARK: <benchmark>
SUITE: <suite>
TASK_ID: <task id>
GPU: <N>

Verdict: verified | refuted | void
Seeds passed: <n>/5 on attempt <1 or 2>
Skills applied: <list>
Proposals: <title> = sound | defective | untested  (one line each, with the number that decided it)
Gaps: <what the skills failed to convey, or none>
Reading rules: RESPECTED | BREACHED (<what was opened>)
```
<!-- ==================== TEMPLATE END ==================== -->
````

## .claude/skills/iterative-debugging/skills/README.md

````text
# Shared Robot Skills

These files contain reusable, observation-only robot-control knowledge shared across
iterative-debugging campaigns. Pipeline orchestration belongs in the pipeline files one level up.

| Skill | Purpose |
|---|---|
| [grasp.md](grasp.md) | Grasp selection, orientations, grasp verification, and pick/place skeletons |
| [localize.md](localize.md) | SAM3 prompting, disambiguation, and 3D localization helpers |
| [transport.md](transport.md) | Waypoints, collision-free transit, and placement approaches |
| [manipulation.md](manipulation.md) | Drawers, knobs, switches, pushing, and other contact tasks |

All snippets use only the documented public CaP program APIs (`docs/api-reference.md`): no
imports, no NumPy, no simulator internals, and a top-level `result` variable per program.

Promoted findings should include provenance: source benchmark/suite/task, development seeds,
held-out result when available, source code path, and date. Avoid universal claims from one
scene or seed.

## How an entry gets here

Nothing is written into these files by the agent that discovered it. An entry arrives only by
this route, and every step is on disk:

```
subagent proposes  →  verifier reproduces the fix   →  coordinator promotes
(skill_report.json)   from the proposal ALONE          (edits this directory)
                      (verification_report.json)
```

The verifier gets the library and the proposal, and is denied the proposer's program, findings,
and run artifacts. If it cannot reach the fix on five seeds within two attempts, the proposal is
**refuted** and stays out. So an entry here means: *written down, on its own, this was enough for
an agent that had never seen the solution.*

What that does **not** mean is that the entry generalizes. Proposals are verified on the task
they came from, so passing shows the text transmits, not that it transfers. Evidence of transfer
accumulates separately, as later tasks grade the entry `useful` in their own reports — which is
why the evidence lines matter and why they should name every task, not just the first.

Entries are also graded on the way out. Every subagent reports each section it opened as `useful`,
`misleading`, `wrong`, or `not-applicable`, and the coordinator repairs what comes back bad
before dispatching more work. An entry that keeps drawing `misleading` usually has a trigger
problem — it is being read by tasks it was never meant for — and the fix is to narrow the
trigger, not to bolt a warning onto the end.
````

## .claude/skills/iterative-debugging/skills/grasp.md

````text
---
name: grasp
description: Structural template for pick-and-place programs. Covers the standard grasp-lift-place code skeleton, top-down and cylindrical side grasps, staged approach, and post-lift grasp verification. No task-specific strategies — those are discovered through experiment.
---

# Grasp — Code Template

> This skill provides the **structural skeleton** for pick-and-place programs.
> Task-specific strategies (object-specific offsets, SAM3 prompts, placement geometry)
> are discovered through experiment and added here as the skill library grows — each new
> strategy as its own subsection (trigger → code → evidence), modeled on *Cylindrical Side
> Grasp* below; tables are only for one-line thresholds.
> Programs cannot import modules — all helpers below are pure Python over public contracts.

---

## Standard Pick-and-Place Template

```python
def quantile(values, fraction):
    ordered = sorted(float(value) for value in values)
    return ordered[int((len(ordered) - 1) * fraction)]

def cloud_quantiles(points, x_fraction=0.5, y_fraction=0.5, z_fraction=0.5):
    return (
        quantile((point[0] for point in points), x_fraction),
        quantile((point[1] for point in points), y_fraction),
        quantile((point[2] for point in points), z_fraction),
    )

base_frame = get_robot_state().base_frame
report = {"task": get_task_context().language}

# --- Localize pick object ---
picked = localize_object("<object prompt>", camera_name="agentview", target_frame=base_frame)
if not picked.ok or len(picked.point_cloud.points) < 20:
    raise ValueError("localization failed for pick object")
object_center = cloud_quantiles(picked.point_cloud.points)

# --- Grasp via grasp backend (preferred for irregular objects) ---
grasps = generate_grasps("agentview", picked.segmentation, backend="contact-graspnet")
grasp = select_grasp(grasps, strategy="top_down") if grasps.ok else None
if grasp is not None:
    grasp_pose = grasp.pose
else:
    # --- OR: top-down grasp from observed geometry (simple flat objects) ---
    downward = get_robot_state().end_effector_poses["primary"].quaternion_wxyz
    grasp_pose = Pose(
        (object_center[0], object_center[1], object_center[2] + 0.01),
        downward,
        base_frame,
    )

# --- Staged approach: pre-grasp above, descend, close ---
open_gripper()
pre_grasp = Pose(
    (grasp_pose.position[0], grasp_pose.position[1], grasp_pose.position[2] + 0.12),
    grasp_pose.quaternion_wxyz,
    grasp_pose.frame,
)
if not move_to_pose(pre_grasp, tolerance=0.02, max_steps=250).ok:
    raise ValueError("pre-grasp approach failed")
if not move_to_pose(grasp_pose, tolerance=0.015, max_steps=250).ok:
    raise ValueError("grasp approach failed")
close_gripper()

# --- Lift, then VERIFY the object actually moved with the gripper ---
before_z = quantile((point[2] for point in picked.point_cloud.points), 0.5)
lift = Pose(
    (grasp_pose.position[0], grasp_pose.position[1], grasp_pose.position[2] + 0.15),
    grasp_pose.quaternion_wxyz,
    grasp_pose.frame,
)
move_to_pose(lift, tolerance=0.02, max_steps=250)

after = localize_object("<object prompt>", camera_name="agentview", target_frame=base_frame)
grasp_verified = (
    after.ok
    and len(after.point_cloud.points) >= 20
    and quantile((point[2] for point in after.point_cloud.points), 0.5) - before_z > 0.02
)
report["grasp_verified"] = grasp_verified

# --- Re-observe for placement target ---
target = localize_object("<target prompt>", camera_name="agentview", target_frame=base_frame)
if not target.ok:
    raise ValueError("localization failed for placement target")
target_center = cloud_quantiles(target.point_cloud.points)
surface_z = quantile((point[2] for point in target.point_cloud.points), 0.9)

# --- Transport ---
above_target = Pose(
    (target_center[0], target_center[1], lift.position[2]),
    grasp_pose.quaternion_wxyz,
    base_frame,
)
move_to_pose(above_target, tolerance=0.02, max_steps=300)

# --- Place ---
release = Pose(
    (target_center[0], target_center[1], surface_z + 0.03),
    grasp_pose.quaternion_wxyz,
    base_frame,
)
move_to_pose(release, tolerance=0.02, max_steps=250)
open_gripper()

result = report
```

---

## Cylindrical Side Grasp (bottles, cans)

Derive the grasp height from robust point-cloud quantiles instead of a fixed world height.
Handwritten poses from observed geometry (OBB, side-grasp, top-down) are often more reliable
than backend candidates for specific object classes — record which per object below.

```python
zs = sorted(float(point[2]) for point in picked.point_cloud.points)
z_low = zs[len(zs) // 10]
z_high = zs[(9 * len(zs)) // 10]
grasp_z = z_low + 0.5 * (z_high - z_low)
```

Form pre-grasp, grasp, and lift poses from the observed center and extent. Stage the approach
outside the object, preserve the grasp orientation and closed-gripper command through the lift,
and avoid abrupt transport.

---

## Key Conventions

**Grasp with `close_gripper()`, never `set_gripper(0.0)`** — they are not equivalent. `close_gripper()` accepts a *contact stall* as success: the jaw stops on the object, the call returns `ok=True`, and the harness records the commanded gripper as closed.

```python
close_gripper()                      # correct: contact stall counts as closed
# set_gripper(0.0)                   # WRONG when grasping: times out, leaves stale open command
lift = move_to_pose(above_pose)      # keeps commanding closed, object is retained
```

**Never infer grasp success from a completed call** — `close_gripper()` returning does not mean
the object is held. Verify with the post-lift re-localization pattern above.

**Motion result guard** — every `move_to_pose` / `move_to_joints` / `plan_motion` returns a typed
result; check `.ok` before depending on the motion. Requested unavailable backends return typed
failures; the harness never falls back implicitly.

**Backend choice** — `MotionStrategy()` defaults to PyRoki IK plus straight-line joint
interpolation. That default is **not collision-aware**, and it does not say so: the arm sweeps
whatever the interpolated path crosses, the call returns `ok=True`, and the damage shows up later
as a missing object or an unexplained failure. Select `trajectory_planner="curobo"` (planned
transit, PyRoki IK) or `pose_planner="curobo-integrated"` (cuRobo solves pose and path together)
for free-space transit, and keep interpolation for segments where contact is intended — the
observed cloud contains the target and any held object, so a collision-aware planner refuses the
approach into a grasp by construction.

`ik_solver="curobo"` with `trajectory_planner="interpolation"` is checked *nowhere*: standalone
IK answers against an empty world, and interpolation checks nothing. The returned `Trajectory`
reports `collision_aware=False` — read it rather than assuming that naming cuRobo anywhere in the
strategy bought a scene check.

For `solve_ik`, PyRoki or cuRobo are usually needed.

**Quaternions are wxyz** in every `Pose`.

**Wrist vs fingertips**: a public `Pose` targets the **end-effector frame** (LIBERO's
`robot0_eef`) — the grasp point between the fingertips, not the wrist. The −0.1 m conversion to
`panda_hand` happens inside the IK provider (`providers/pyroki/client.py`, `PANDA_EEF_TO_HAND_OFFSET_M`),
so a program never applies it. Treating the target as the wrist and adding your own offset puts
the grip 10 cm off.

**Grasp verification thresholds** — add validated per-object entries here as you discover them.
This table is for one-line signals and numeric thresholds only; a grasp *strategy* that needs
procedure or code (e.g. constructing a manual grasp pose when a backend fails) gets its own
subsection like *Cylindrical Side Grasp* above, with the working snippet:

| Object | Verification signal | Threshold | Notes |
|---|---|---|---|

---

## Object Geometry Utilities

```python
geometry = estimate_geometry(picked.point_cloud)
# geometry.pose (framed center + orientation), geometry.extents, geometry.point_count

# Z range (grasp height tuning), pure Python:
zs = [float(point[2]) for point in picked.point_cloud.points]
height = max(zs) - min(zs)
```
````

## .claude/skills/iterative-debugging/skills/localize.md

````text
---
name: localize
description: Object localization via SAM3 — prompting strategies, multi-prompt fallback pattern, candidate disambiguation, and per-object prompt registry. Grows through experiment.
---

# Localize — SAM3 Prompting & Object Localization

> This skill tracks **what SAM3 prompts work for which objects** and the standard
> localization helper pattern. Prompt strings go in the registry table; any selection or
> filtering logic that needs code becomes its own subsection (trigger → code → evidence),
> modeled on *Disambiguation* below.
> Programs cannot import modules — all helpers below are pure Python over public contracts.

---

## Standard Localization Helper

`localize_object()` already composes text segmentation, RGB-D projection, and geometry
estimation. Wrap it with a prompt-fallback loop and a minimum-point guard:

```python
def locate(queries, camera_name="agentview"):
    """Try prompts in order, return the first LocalizationResult with >= 20 points."""
    base_frame = get_robot_state().base_frame
    for query in queries:
        found = localize_object(query, camera_name=camera_name, target_frame=base_frame)
        if found.ok and len(found.point_cloud.points) >= 20:
            return found
    return None

bottle = locate(("<specific prompt>", "<fallback prompt>"))
if bottle is None:
    raise ValueError("object not found")
center = bottle.geometry.pose.position   # framed center from estimate_geometry
```

**Why the geometry center over a raw mean:** `estimate_geometry` gives a more robust center
for elongated or partially occluded objects than averaging raw points.

---

## Prompt Registry

Discovered working prompts, indexed by object. Add entries as you find them.
List prompts in priority order — first hit wins. This table is for prompt strings and scores
only — if a finding needs procedure or code (candidate filtering, camera choice, occlusion
handling), write it as a subsection instead and keep at most a pointer row here.

| Object | Working Prompts | Benchmark/Suite/Task | Notes |
|---|---|---|---|

---

## Disambiguation: Two Similar Objects in Scene

When a scene contains two visually similar objects, the top-scored candidate is often the wrong
one. Inspect all candidates from `segment_text()` and discriminate by bbox pixel area, image
position, or projected 3D geometry:

```python
def smallest_box_candidate(camera_name, prompts, max_center_y=None):
    """Select the candidate with smallest bbox area (most compact matching shape).
    max_center_y: if set, only accept boxes whose center row is above it (upper image = farther).
    """
    for prompt in prompts:
        found = segment_text(camera_name, prompt)
        if not found.ok:
            continue
        best = None
        best_area = None
        for candidate in found.segmentations[:10]:
            if candidate.box_xyxy is None:
                continue
            x1, y1, x2, y2 = (float(value) for value in candidate.box_xyxy)
            area = (x2 - x1) * (y2 - y1)
            center_y = (y1 + y2) / 2.0
            if max_center_y is not None and center_y >= max_center_y:
                continue
            if best_area is None or area < best_area:
                best_area = area
                best = candidate
        if best is not None:
            return best
    return None
```

Project the selected candidate with `mask_to_point_cloud(candidate, camera_name)` and compare
observable geometry with `estimate_geometry()` — filter by 3D Z-height first when a taller or
larger object outranks the target, then pick the highest score among geometry-matching
candidates.

Never disambiguate with native simulator objects, hidden IDs, known seed coordinates, or fixed
pixel locations. Re-localize after contact or a failed grasp — the object may have moved; do not
reuse a stale center.

---

## Key Signals

- `segment_text(...).ok` false or zero `segmentations` → prompt not recognized — try a more
  specific or different description (the trace span records every candidate's score and box)
- `score < 0.5` → low confidence — try an alternative prompt before accepting
- `len(point_cloud.points) < 20` → mask too small or object occluded — try a different prompt
- `media/overlays/` in the recorded run renders the retained top-1 mask — verify it covers the
  intended object

---

## Prompting Strategy

1. **Be specific first** — include color + shape + material: `"blue rectangular box"`
2. **Fall back to generic** — shorter, simpler descriptions; prefer category or shape prompts
   when a product-specific prompt is unreliable
3. **For targets (bowls, plates, racks)** — a material descriptor helps: `"silver bowl"` > `"bowl"`
4. **Always confirm with `get_task_context().language`** — the authoritative instruction
   regardless of suite or task name
5. **Detect target BEFORE grasping** — post-lift re-observation is corrupted by the robot arm
   blocking the camera; detect both object and target while the arm is at home position and the
   view is clean
6. **ARM OCCLUSION PATTERN** — if the target object is in the CENTER of the table, it may be
   hidden behind the robot arm at home position. Move the arm to an observation pose with
   `move_to_pose` before observing. Symptom: SAM3 finds other objects but not the target, and
   scores are low (<0.2) for the intended object.

---

## Placement Z Notes

A mask's projected Z reflects the **camera-facing surface**, not the true top.
For targets with vertical extent (bowls, raised platforms), adjust placement Z from observed
run evidence.

| Target | Z formula | Notes |
|---|---|---|
````

## .claude/skills/iterative-debugging/skills/transport.md

````text
---
name: transport
description: Motion patterns for moving objects between locations — multi-step waypoints, safe transit sequences, staged Cartesian moves, collision avoidance during transport. Grows through experiment.
---

# Transport — Motion Patterns

> This skill covers **how to move** once an object is grasped: waypointing, safe transit,
> intermediate stops, and collision avoidance. Discovered through experiment — add each
> validated pattern as its own subsection (trigger → code → evidence), modeled on
> *Pre-Probe IK Conditioning* below; tables are only for one-line lookups.

---

## Waypoint Sequences

Add a subsection per multi-step motion pattern that prevents collisions, slip, or IK failures
during transport (trigger condition → waypoint code → why it works + evidence). Use the table
only for one-line pointers to those subsections.

| Pattern | Trigger | Section |
|---|---|---|
| IK pre-probe | Low-Z placement target | *Pre-Probe IK Conditioning* below |

---

## Pre-Probe IK Conditioning

Before grasping, pre-visit the placement target at multiple approach heights. This seeds the
IK solver so it stays on the correct branch when placing after the grasp.

```python
# BEFORE grasping, probe the target at decreasing heights:
for probe_z in (target_z + 0.08, target_z + 0.06, target_z + 0.04, target_z + 0.02):
    move_to_pose(Pose((target_x, target_y, probe_z), downward, base_frame),
                 tolerance=0.03, max_steps=200)
go_home()
# NOW grasp — IK is conditioned for placement
```

**Why it works**: IK solvers maintain local branch continuity from their last configuration.
Visiting the placement target before grasping seeds the solver on the branch that can reach
that XY at low Z — so after grasp + home reset, the arm finds the same branch.

**When to use**: Any task where the placement target is at low Z with an observed XY. When
branch conditioning is not enough, request collision-aware planning explicitly:
`move_to_pose(..., strategy=MotionStrategy(trajectory_planner="curobo"))`.

---

## Safe Transit (Lateral Escape Before Lift)

Add a subsection here (trigger → code → evidence) when the arm must move laterally before
lifting to avoid sweeping through obstacles (opened drawers, adjacent objects, cabinet edges).

---

## Placement Approach

Add a subsection here (trigger → code → evidence) for approach sequences above the target
(hover height, descent speed, drop vs. lower) that prevent bounce, tip, or miss.

### Physics Settling After Release

After releasing a grasped object, the object needs a few control ticks to settle before the
episode's success predicate is evaluated — observation calls do not advance time.

**`set_gripper(1.0)` does NOT buy those ticks.** When the jaw is already at the requested
width the adapter returns immediately with `steps_executed = 0`, so a program relying on it to
settle gets **no** ticks at all. Measured on `libero_goal_task/task_1` and independently on
`libero_spatial_task/task_4`, which lost a whole program version to the false hypothesis. On
LIBERO, Robosuite and RoboCasa `set_gripper` now also *refuses* any value between 0.0 and 1.0
with `unsupported`, so there is no partial-width call to fall back on either.

Advance time with something that actually steps. A one-tick hold of the arm's own measured
joints is the cheapest, and it commands the gripper explicitly rather than relying on a latched
value:

```python
open_gripper()
state = get_robot_state()
for tick in range(settle_ticks):       # measure how many you need; do not assume
    step(RobotAction(arms={"primary": ArmCommand(
        "joint_position",
        state.joint_positions["primary"],
        gripper_position=1.0,
        embodiment=state.embodiment,   # required: the default is "robosuite"
    )}))
```

Check `steps_executed` on whatever you use, rather than assuming a call advanced time.

---

## Basket / Container Placement

General rule: transit at `rim_z + 0.30`, release at `rim_z + 0.10`. Never descend inside the
container — drop from above.

**NEVER call `go_home()` while holding a grasped object.** Going home during transport opens the
arm configuration and drops the object. Transport in one continuous arc: lift → translate →
descend → release.

| Object type | Transit height | Release height | Notes |
|---|---|---|---|
````

## .claude/skills/iterative-debugging/skills/manipulation.md

````text
---
name: manipulation
description: Non-pick-and-place manipulation patterns — drawer opening/closing, knob/switch turning, pushing, and other articulated object interactions. Grows through experiment.
---

# Manipulation — Articulated Object Patterns

> This skill covers tasks that are **not** pick-and-place: interacting with drawers, knobs,
> switches, and other articulated objects. Discovered through experiment — add each validated
> pattern as a subsection or bolded principle with its working code snippet (trigger → code →
> evidence), like the *Drawer Interaction* principles below.

---

## Knob / Switch Turning

**General approach**: Localize the knob, approach top-down, close the gripper at the knob
surface, then rotate the wrist through sequential yaw angles using `solve_ik` +
`move_to_joints`.

**Guard every motion** — `solve_ik` and `move_to_pose` return typed results; check `.ok` and
stage the pose (or switch backend explicitly) instead of assuming the far workspace is
reachable:

```python
ik = solve_ik(grasp_pose)
if not ik.ok:
    raise ValueError("IK failed for grasp pose")
move_to_joints(ik.joint_positions, tolerance=0.02, max_steps=200)
```

**Z disambiguation**: When multiple objects match the same prompt, filter candidates by
projected max Z to select the correct one by height.

Add validated patterns here as you discover them — trigger condition, the working code snippet,
and which task/seeds it fixed.

---

## Hinged Door Opening / Closing

**General approach**: Localize the handle, compute hinge geometry from the observed object
center + handle position, then arc-pull (or arc-push) the door via a sequence of staged poses
along the arc (a sweep of small `move_to_pose` steps).

**Critical**: Door/object rotation in the scene affects hinge computation — confirm object
orientation from the scene keyframes before deriving hinge offsets.

Add validated patterns here as you discover them — trigger condition, the working code snippet,
and which task/seeds it fixed.

---

## Pushing / Sliding

Add a subsection here (trigger → code → evidence) for pushing objects without grasping: contact
approach, force direction, step size, distance control.

---

## General Notes

- Add observations about which joint (e.g. the wrist) is most useful for in-place rotation
- Add notes on approach directions that avoid wrist limits
- Add notes on contact detection via gripper diagnostics or motion-result failures
````

## .claude/skills/iterative-debugging/robosuite/SUCCESS_RATES.md

````text
# Robosuite fix_code success rates

Pulled from `archive_do_not_read/runs/.../validation_result.json` (100-seed pass rate) for each task's
selected fix.

| Task | Fix code file | Pass rate | Passes |
| --- | --- | --- | --- |
| cube_stack | cube_stack_fix_code.py | 0.97 | 97/100 |
| cube_lifting | cube_lifting_fix_code.py | 1.00 | 100/100 |
| cube_restack | cube_restack_fix_code.py | 1.00 | 100/100 |
| nut_assembly | nut_assembly_fix_code.py | 0.99 | 99/100 |
| spill_wipe | spill_wipe_fix_code.py | 0.95 | 95/100 |
| two_arm_handover | two_arm_handover_fix_code.py | 0.90 | 90/100 |
| two_arm_lift | two_arm_lift_fix_code.py | 1.00 | 100/100 |

Source runs:
- `archive_do_not_read/runs/2026-09-15_23-38-07_robosuite-cube-stack/robosuite/cube_stack/task_0`
- `archive_do_not_read/runs/2026-09-16_00-49-44_robosuite-six-tasks-astra-xhigh/robosuite/{cube_lifting,cube_restack,nut_assembly,spill_wipe,two_arm_handover,two_arm_lift}/task_0`
````

## .claude/skills/iterative-debugging/robosuite/nut_assembly_fix_code.py

````text
def quantile(values, fraction):
    ordered = sorted(float(value) for value in values)
    return ordered[int((len(ordered) - 1) * fraction)]

def rectangle(points):
    top = quantile((p[2] for p in points), 0.85)
    surface = [p for p in points if float(p[2]) > top - 0.002]
    surface = surface[::max(1, len(surface) // 700)]
    best = None
    for index in range(401):
        t = (index - 200) / 200.0
        norm = (1.0 + t * t) ** 0.5
        ux, uy = 1.0 / norm, t / norm
        aa = sorted(float(p[0]) * ux + float(p[1]) * uy for p in surface)
        bb = sorted(-float(p[0]) * uy + float(p[1]) * ux for p in surface)
        lowa, higha = aa[0], aa[-1]
        lowb, highb = bb[0], bb[-1]
        area = (higha - lowa) * (highb - lowb)
        if best is None or area < best[0]:
            best = (area, ux, uy, lowa, higha, lowb, highb)
    area, ux, uy, lowa, higha, lowb, highb = best
    if highb - lowb > higha - lowa:
        ux, uy, lowa, higha, lowb, highb = -uy, ux, lowb, highb, -higha, -lowa
    return {"axis": (ux, uy), "a": (lowa, higha), "b": (lowb, highb), "top": top, "bottom": quantile((p[2] for p in points), 0.06), "surface": surface}

def observe(prompt):
    located = localize_object(prompt, camera_name=camera, target_frame=frame)
    if not located.ok or len(located.point_cloud.points) < 30:
        raise Exception("Could not locate " + prompt)
    return rectangle(located.point_cloud.points)

def downward(axis, opening_sign):
    ox, oy = -axis[1] * opening_sign, axis[0] * opening_sign
    qy = ((1.0 - ox) * 0.5) ** 0.5
    if oy < 0:
        qy = -qy
    return (0.0, ((1.0 + ox) * 0.5) ** 0.5, qy, 0.0)

def move(position, orientation):
    for attempt in range(2):
        motion = move_to_pose(Pose(position, orientation, frame), tolerance=0.012, max_steps=120, strategy=MotionStrategy(ik_solver="pyroki", trajectory_planner="interpolation"))
        if motion.ok:
            return motion
    raise Exception("Motion failed: " + str(motion.status))

report = {"task": get_task_context().language, "moves": []}
frame = get_robot_state().base_frame
camera = "agentview"
if camera not in get_observation().cameras:
    raise Exception("Missing wide camera")
if "primary" not in robosuite.get_controller_metadata()["controllable_gripper_arms"]:
    raise Exception("Task requires a gripper")
open_gripper()
nut = observe("brown square metal nut")
peg = observe("square peg")
ux, uy = nut["axis"]
amin, amax = nut["a"]
bmin, bmax = nut["b"]
length, width = amax - amin, bmax - bmin
low_end = [(-float(p[0]) * uy + float(p[1]) * ux) for p in nut["surface"] if float(p[0]) * ux + float(p[1]) * uy < amin + length * 0.18]
high_end = [(-float(p[0]) * uy + float(p[1]) * ux) for p in nut["surface"] if float(p[0]) * ux + float(p[1]) * uy > amax - length * 0.18]
if max(low_end) - min(low_end) < max(high_end) - min(high_end):
    ux, uy, amin, amax, bmin, bmax = -ux, -uy, -amax, -amin, -bmax, -bmin
hole_a, center_b = amin + width * 0.5, (bmin + bmax) * 0.5
handle_a = amax - (length - width) * 0.25
hole = (ux * hole_a - uy * center_b, uy * hole_a + ux * center_b)
handle = (ux * handle_a - uy * center_b, uy * handle_a + ux * center_b)
pu, pv = peg["axis"]
pa, pb = sum(peg["a"]) * 0.5, sum(peg["b"]) * 0.5
target = (pu * pa - pv * pb, pv * pa + pu * pb)
directions = ((pu, pv), (-pv, pu), (-pu, -pv), (pv, -pu))
opening_sign = -1.0 if ux < 0 else 1.0
grasp_q = downward((ux, uy), opening_sign)
grasp_z = 0.5 * (nut["top"] + nut["bottom"]) - 0.003
hover = max(nut["top"], peg["top"]) + 0.14
offset = handle_a - hole_a
release_z = peg["top"] + (grasp_z - nut["bottom"]) + 0.012
dest_axis = None
for candidate_axis in sorted(directions, key=lambda axis: -(axis[0] * ux + axis[1] * uy)):
    candidate_q = downward(candidate_axis, opening_sign)
    candidate_handle = (target[0] + candidate_axis[0] * offset, target[1] + candidate_axis[1] * offset)
    high_ik = solve_ik(Pose((candidate_handle[0], candidate_handle[1], hover), candidate_q, frame), backend="pyroki")
    low_ik = solve_ik(Pose((candidate_handle[0], candidate_handle[1], release_z), candidate_q, frame), backend="pyroki")
    if high_ik.ok and low_ik.ok:
        dest_axis, dest_q, dest_handle = candidate_axis, candidate_q, candidate_handle
        break
if dest_axis is None:
    raise Exception("No reachable square-symmetric placement")
report["geometry"] = {"hole": hole, "handle": handle, "target": target, "nut_axis": (ux, uy), "dest_axis": dest_axis, "nut_size": (length, width), "nut_z": (nut["bottom"], nut["top"]), "peg_top": peg["top"], "grasp_z": grasp_z, "dest_handle": dest_handle}
print(report)
move((handle[0], handle[1], hover), grasp_q)
move((handle[0], handle[1], grasp_z), grasp_q)
report["close"] = close_gripper()
move((handle[0], handle[1], hover), grasp_q)
if ux * dest_axis[0] + uy * dest_axis[1] < 0.8:
    for fraction in (0.25, 0.5, 0.75):
        ax = (1.0 - fraction) * ux + fraction * dest_axis[0]
        ay = (1.0 - fraction) * uy + fraction * dest_axis[1]
        norm = (ax * ax + ay * ay) ** 0.5
        intermediate_q = downward((ax / norm, ay / norm), opening_sign)
        intermediate = ((1.0 - fraction) * handle[0] + fraction * dest_handle[0], (1.0 - fraction) * handle[1] + fraction * dest_handle[1], hover)
        move(intermediate, intermediate_q)
move((dest_handle[0], dest_handle[1], hover), dest_q)
release_z = peg["top"] + (grasp_z - nut["bottom"]) + 0.012
move((dest_handle[0], dest_handle[1], release_z), dest_q)
open_gripper()
move((dest_handle[0], dest_handle[1], hover), dest_q)
for settle_tick in range(3):
    set_gripper(1.0)
result = report
````

## .claude/skills/iterative-debugging/robosuite/two_arm_handover_fix_code.py

````text
def quantile(values, fraction):
    ordered = sorted(float(value) for value in values)
    return ordered[int((len(ordered) - 1) * fraction)]

def locate(query, reference=None):
    found = localize_object(query, camera_name="agentview", target_frame=frame)
    if not found.ok or len(found.point_cloud.points) < 20:
        raise Exception("Could not localize " + query)
    points = found.point_cloud.points
    if reference is not None:
        margin = max(0.015, reference["high"][2]-reference["low"][2])
        points = [p for p in points if reference["low"][2]-margin < float(p[2]) < reference["high"][2]+margin]
        if len(points) < 20:
            raise Exception("No head points near the observed handle height")
    top = quantile((p[2] for p in points), 0.90)
    points = [p for p in points if float(p[2]) > top-0.05]
    low = [quantile((p[a] for p in points), 0.02) for a in range(3)]
    high = [quantile((p[a] for p in points), 0.98) for a in range(3)]
    geometry = {"center": [(low[a]+high[a])*0.5 for a in range(3)], "low": low, "high": high}
    if reference is not None:
        center = geometry["center"]
        dx = reference["center"][0]-center[0]
        dy = reference["center"][1]-center[1]
        norm = (dx*dx+dy*dy)**0.5
        along = [-dy/norm, dx/norm]
        across = [dx/norm, dy/norm]
        coordinates = [(float(p[0])-center[0])*along[0]+(float(p[1])-center[1])*along[1] for p in points]
        first = quantile(coordinates,0.02)
        last = quantile(coordinates,0.98)
        options = []
        for fraction in (0.25,0.75):
            location = first+fraction*(last-first)
            band = [p for p,t in zip(points,coordinates) if abs(t-location)<0.08*(last-first)]
            if len(band)<10:
                continue
            offsets = [(float(p[0])-center[0])*across[0]+(float(p[1])-center[1])*across[1] for p in band]
            cross = (quantile(offsets,0.1)+quantile(offsets,0.9))*0.5
            ztop = quantile((p[2] for p in band),0.9)
            zbottom = quantile((p[2] for p in band),0.1)
            curvature = ztop-quantile((p[2] for p in band),0.5)
            options.append({"position":[center[0]+along[0]*location+across[0]*cross, center[1]+along[1]*location+across[1]*cross, ztop-0.4*(ztop-zbottom)], "curvature":curvature})
            outer = first+(0.15 if fraction < 0.5 else 0.85)*(last-first)
            outer_band = [p for p,t in zip(points,coordinates) if abs(t-outer)<0.08*(last-first)]
            if len(outer_band) >= 10:
                offsets = [(float(p[0])-center[0])*across[0]+(float(p[1])-center[1])*across[1] for p in outer_band]
                cross = (quantile(offsets,0.1)+quantile(offsets,0.9))*0.5
                ztop = quantile((p[2] for p in outer_band),0.9)
                zbottom = quantile((p[2] for p in outer_band),0.1)
                options[-1]["outer_position"] = [center[0]+along[0]*outer+across[0]*cross,center[1]+along[1]*outer+across[1]*cross,ztop-0.4*(ztop-zbottom)]
        geometry["grasp_options"] = options
    return geometry

def downward(x, y):
    magnitude = (x*x+y*y)**0.5
    x = x/magnitude
    y = y/magnitude
    return (0.0, ((1.0+x)*0.5)**0.5, (1.0 if y >= 0.0 else -1.0)*((1.0-x)*0.5)**0.5, 0.0)

def receiver_orientation(direction):
    q = downward(direction[1], -direction[0])
    span = max(handle["high"][a]-handle["low"][a] for a in range(2))
    separation = sum((wc[a]-grasp[a])**2 for a in range(2))**0.5+0.25*span
    if separation >= 0.17:
        return q
    r = (0.9238795325112867, -0.3826834323650898*direction[1], 0.3826834323650898*direction[0], 0.0)
    w, x, y, z = r
    a, b, c, d = q
    return (w*a-x*b-y*c-z*d, w*b+x*a+y*d-z*c, w*c-x*d+y*a+z*b, w*d+x*c-y*b+z*a)

def move(arm, position, orientation, contact=False):
    target = Pose(position, orientation, frame)
    for attempt in range(2):
        moved = move_to_pose(target, arm=arm, tolerance=0.015, max_steps=120)
        if moved.ok:
            return True
        actual_pose = get_robot_state().end_effector_poses[arm]
        distance = sum((float(actual_pose.position[a])-float(position[a]))**2 for a in range(3))**0.5
        alignment = abs(sum(float(actual_pose.quaternion_wxyz[a])*float(orientation[a]) for a in range(4)))
        if distance < 0.015 and alignment > 0.999:
            return True
        if contact:
            reached = get_robot_state().end_effector_poses[arm].position
            if sum((float(reached[a])-float(position[a]))**2 for a in range(3))**0.5 < 0.025:
                return False
        if str(moved.status) == "ExecutionStatus.PLANNER_FAILED":
            moved = move_to_pose(target, arm=arm, tolerance=0.015, max_steps=120, strategy=MotionStrategy(ik_solver="curobo", trajectory_planner="interpolation"))
            if moved.ok:
                return True
    raise Exception("Motion failed for " + arm + ": " + str(moved.status))

def paired_move(targets):
    start = get_robot_state()
    solutions = {}
    joints = {}
    grippers = {}
    for arm in targets:
        solved = solve_ik(targets[arm], seed_joints=state.joint_positions[arm], arm=arm)
        if not solved.ok:
            solved = solve_ik(targets[arm], seed_joints=state.joint_positions[arm], arm=arm, backend="curobo")
        if not solved.ok:
            raise Exception("Paired IK failed for " + arm)
        solutions[arm] = solved.joint_positions
        joints[arm] = [[float(start.joint_positions[arm][j]) + tick/180.0*(float(solutions[arm][j])-float(start.joint_positions[arm][j])) for j in range(7)] for tick in range(1,181)]
        grippers[arm] = [0.0 if arm == "primary" else 1.0 for tick in range(180)]
    trajectory = SynchronizedTrajectory(joints, 0.05, start.joint_names, "interpolation", False, start, grippers)
    executed = execute_trajectory(trajectory)
    report["paired_execution"] = {"ok": executed.ok, "status": str(executed.status), "steps": executed.steps_executed}
    for arm in targets:
        reached = get_robot_state().end_effector_poses[arm]
        actual = reached.position
        alignment = abs(sum(float(reached.quaternion_wxyz[a])*float(targets[arm].quaternion_wxyz[a]) for a in range(4)))
        if sum((float(actual[a])-float(targets[arm].position[a]))**2 for a in range(3))**0.5 > 0.025 or alignment < 0.999:
            move(arm, targets[arm].position, targets[arm].quaternion_wxyz)

context = get_task_context()
state = get_robot_state()
frame = state.base_frame
arms = robosuite.get_controller_metadata()["controllable_gripper_arms"]
report = {"language": context.language, "arms": list(arms)}
handle = locate("wooden handle")
head = locate("hammer head", handle)
report["head"] = head
report["handle"] = handle
hc = head["center"]
wc = handle["center"]
dx = wc[0]-hc[0]
dy = wc[1]-hc[1]
length = (dx*dx+dy*dy)**0.5
direction = [dx/length, dy/length]
# Select the equivalent finger-opening direction nearest the initial gripper yaw.
sign = 1.0 if direction[1] >= 0.0 else -1.0
grasp_q = downward(sign*direction[0], sign*direction[1])
head_axis = [-direction[1], direction[0]]
p0 = state.end_effector_poses["primary"].position
p1 = state.end_effector_poses["secondary"].position
if sum(head_axis[a]*(float(p1[a])-float(p0[a])) for a in range(2)) < 0.0:
    head_axis = [-head_axis[0], -head_axis[1]]
head_span = sum(abs(head_axis[a])*(head["high"][a]-head["low"][a]) for a in range(2))
grasp = [hc[0]+0.25*head_span*head_axis[0], hc[1]+0.25*head_span*head_axis[1], head["high"][2]-0.40*(head["high"][2]-head["low"][2])]
options = head["grasp_options"]
selected_option = None
if len(options) == 2 and abs(options[0]["curvature"]-options[1]["curvature"]) > 0.001:
    selected_option = max(options, key=lambda item: item["curvature"])
    grasp = selected_option["position"]
opening_direction = direction
arm_line = [float(p1[a])-float(p0[a]) for a in range(2)]
arm_span = sum(v*v for v in arm_line)**0.5
behind_home = sum((float(p0[a])-grasp[a])*arm_line[a]/arm_span for a in range(2))
radial_reach = sum(grasp[a]*grasp[a] for a in range(2))**0.5
home_reach = sum(float(p0[a])*float(p0[a]) for a in range(2))**0.5
# Include the requested Cartesian tolerance in the near-base clearance test.
handle_grasp = radial_reach-0.015 < 0.60*home_reach
if handle_grasp:
    handle_length = sum(abs(direction[a])*(handle["high"][a]-handle["low"][a]) for a in range(2))
    for fraction in (0.30,0.15,0.0,-0.15):
        grasp = [wc[0]-fraction*handle_length*direction[0], wc[1]-fraction*handle_length*direction[1], handle["high"][2]-0.45*(handle["high"][2]-handle["low"][2])]
        if sum(grasp[a]*grasp[a] for a in range(2))**0.5 >= 0.65*home_reach:
            break
    opening_direction = [-direction[1],direction[0]]
grasp_q = downward(sign*opening_direction[0],sign*opening_direction[1])
report["handle_grasp"] = handle_grasp
best_cost = None
for candidate_sign in (sign, -sign):
    candidate_q = downward(candidate_sign*opening_direction[0], candidate_sign*opening_direction[1])
    checked = solve_ik(Pose(grasp, candidate_q, frame), seed_joints=state.joint_positions["primary"], arm="primary")
    if checked.ok:
        changes = [abs(float(checked.joint_positions[j])-float(state.joint_positions["primary"][j])) for j in range(7)]
        cost = sum(v*v for v in changes)+2.0*max(changes)**2
        if best_cost is None or cost < best_cost:
            best_cost = cost
            sign = candidate_sign
            grasp_q = candidate_q
open_gripper(arm="primary")
move("primary", [grasp[0], grasp[1], head["high"][2]+0.12], grasp_q)
if handle_grasp:
    move("primary", [grasp[0],grasp[1],grasp[2]+0.065], grasp_q)
seated = move("primary", grasp, grasp_q, contact=not handle_grasp)
if not seated and not handle_grasp and selected_option is not None and "outer_position" in selected_option:
    move("primary", [grasp[0],grasp[1],grasp[2]+0.065], grasp_q)
    grasp = selected_option["outer_position"]
    move("primary",grasp,grasp_q,contact=True)
    report["outer_head_recovery"] = True
close_gripper(arm="primary")
move("primary", [grasp[0], grasp[1], grasp[2]+0.065], grasp_q)
lift_z = head["high"][2]+0.25

p0 = state.end_effector_poses["primary"].position
p1 = state.end_effector_poses["secondary"].position
rx = p1[0]-p0[0]
ry = p1[1]-p0[1]
norm = (rx*rx+ry*ry)**0.5
receiver = [rx/norm, ry/norm]
transfer_q = downward(sign*receiver[0], sign*receiver[1])
if handle_grasp:
    transfer_q = downward(-sign*receiver[1], sign*receiver[0])
transfer = [(p0[0]+p1[0])*0.5-length*0.5*receiver[0], (p0[1]+p1[1])*0.5-length*0.5*receiver[1], lift_z]
secondary_q = receiver_orientation(receiver)
cos_yaw = direction[0]*receiver[0]+direction[1]*receiver[1]
sin_yaw = direction[0]*receiver[1]-direction[1]*receiver[0]
offset_x = wc[0]-grasp[0]
offset_y = wc[1]-grasp[1]
predicted = [transfer[0]+cos_yaw*offset_x-sin_yaw*offset_y, transfer[1]+sin_yaw*offset_x+cos_yaw*offset_y, transfer[2]+wc[2]-grasp[2]+0.10]
handle_span = sum(abs(direction[a])*(handle["high"][a]-handle["low"][a]) for a in range(2))
for axis in range(2):
    predicted[axis] = predicted[axis]+0.25*handle_span*receiver[axis]
paired_move({"primary": Pose(transfer, transfer_q, frame), "secondary": Pose(predicted, secondary_q, frame)})
received_handle = locate("wooden handle")
report["handover_handle"] = received_handle
target = received_handle["center"]
receiver_span = sum(abs(receiver[a])*(received_handle["high"][a]-received_handle["low"][a]) for a in range(2))
target = [target[0]+0.25*receiver_span*receiver[0], target[1]+0.25*receiver_span*receiver[1], target[2]]
secondary_q = receiver_orientation(receiver)
move("secondary", [target[0], target[1], target[2]-0.004], secondary_q)
close_gripper(arm="secondary")
open_gripper(arm="primary")
move("primary", [transfer[0]-0.12*receiver[0], transfer[1]-0.12*receiver[1], transfer[2]+0.08], transfer_q)
for settle_tick in range(5):
    set_grippers({"primary": 1.0, "secondary": 0.0})
report["final_state"] = get_robot_state()
result = report
````

## .claude/skills/iterative-debugging/scripts/audit_seeding.py

````text
"""Audit that seeds are doing what a held-out split needs them to do.

A campaign's headline number is only meaningful if seeds 1-50 are 50 distinct layouts, reproducible
across processes, and disjoint from whatever the workers developed against. That is four separate
properties and none of them is implied by "the scene looks different each time".

This exists because the campaign it was written for had a real seeding bug — every seed resolving
to the same layout — which was fixed mid-run, invalidating every sweep taken before the fix. Run
all four checks before trusting a number, and again after any change to the adapter's reset path.

    uv run python .../audit_seeding.py vary    --suite libero_goal_swap --task-id 4
    uv run python .../audit_seeding.py repeat  --suite libero_goal_swap --task-id 4
    uv run python .../audit_seeding.py distinct --suite libero_goal_swap --task-id 4
    uv run python .../audit_seeding.py modes   --suite libero_goal_swap --task-id 4

- **vary**     — do objects actually move between seeds? Per-joint spread, so a task whose only
                 movable object is pinned shows up as such rather than as a passing check.
- **repeat**   — is seed -> layout stable within a process and reproducible in a fresh one? Run it
                 twice and diff; if the signatures differ, seeds are not a partition.
- **distinct** — are the held-out seeds N distinct layouts, and disjoint from the development set?
                 Collisions mean a "50-trial" score is fewer than 50 independent layouts.
- **modes**    — does `--init-mode seeded` differ from `saved`? `saved` replays a fixed bank of
                 recorded states and will happily look varied while ignoring the seed entirely.

Run under the LIBERO virtualenv, on a free GPU:

    CUDA_VISIBLE_DEVICES=3 MUJOCO_EGL_DEVICE_ID=3 .venv-libero/bin/python .../audit_seeding.py ...
"""

from __future__ import annotations

import argparse
import os
from pathlib import Path

CAP_ROOT = Path(__file__).resolve().parents[4]
os.environ.setdefault("LIBERO_CONFIG_PATH", str(CAP_ROOT / ".libero"))
os.environ.setdefault("MUJOCO_GL", "egl")
os.environ.setdefault("PYOPENGL_PLATFORM", "egl")
os.environ.setdefault("EGL_PLATFORM", "device")
os.environ.setdefault("TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD", "1")

from cap_harness.libero.adapter import LiberoAdapter  # noqa: E402


def free_joints(adapter) -> dict[str, tuple[float, ...]]:
    """Every free-joint xyz in the native sim, keyed by joint name.

    Free joints (`jnt_type == 0`) are the movable objects; everything else is fixture or robot.
    This reaches through the adapter deliberately — it is a diagnostic, not a program.
    """
    # Diagnostic-only simulator inspection; never exposed to task programs.
    inner = adapter._env
    inner = getattr(inner, "env", inner)
    sim = inner.sim
    out = {}
    for index in range(sim.model.njnt):
        if sim.model.jnt_type[index] != 0:
            continue
        addr = sim.model.jnt_qposadr[index]
        out[sim.model.joint_id2name(index)] = tuple(
            round(float(v), 5) for v in sim.data.qpos[addr : addr + 3]
        )
    return out


def signature(adapter) -> str:
    return "|".join(f"{name}:{xyz}" for name, xyz in sorted(free_joints(adapter).items()))


def check_vary(adapter, task: str, seeds: list[int]) -> None:
    rows = {}
    for seed in seeds:
        adapter.reset(task, seed)
        rows[seed] = free_joints(adapter)
    names = sorted(rows[seeds[0]])
    print(f"{'joint':<40} {'distinct':>9} {'spread (mm)':>12}")
    moving = 0
    for name in names:
        values = [rows[seed][name] for seed in seeds]
        distinct = len(set(values))
        spread = (
            max(max(abs(a[k] - b[k]) for k in range(3)) for a in values for b in values) * 1000.0
        )
        moving += distinct > 1
        print(f"{name:<40} {distinct:>9} {spread:>12.1f}")
    print(f"\n{moving} of {len(names)} free joints vary across {len(seeds)} seeds")
    if moving == 0:
        print("FAIL: nothing moves. Every seed is the same layout.")


def check_repeat(adapter, task: str, seeds: list[int]) -> None:
    first = {}
    for seed in seeds:
        adapter.reset(task, seed)
        first[seed] = signature(adapter)
    unstable = []
    for seed in seeds:  # same process, second visit
        adapter.reset(task, seed)
        if signature(adapter) != first[seed]:
            unstable.append(seed)
    for seed in seeds:
        print(f"seed {seed:>3}  {hash(first[seed]) & 0xFFFFFFFF:08x}")
    print(f"\nwithin this process: {'STABLE' if not unstable else f'UNSTABLE on {unstable}'}")
    print(
        "Now run this again in a FRESH process and diff the hashes — equal means the seed->layout"
        " map is reproducible, which is what makes seeds 1-50 a partition rather than a sample."
    )


def check_distinct(adapter, task: str, held_out: list[int], development: list[int]) -> None:
    held = {seed: (adapter.reset(task, seed), signature(adapter))[1] for seed in held_out}
    dev = {seed: (adapter.reset(task, seed), signature(adapter))[1] for seed in development}
    values = list(held.values())
    duplicated = sorted({seed for seed in held if values.count(held[seed]) > 1})
    overlap = sorted({seed for seed in held if held[seed] in set(dev.values())})
    print(f"distinct held-out layouts : {len(set(values))}/{len(held_out)}")
    print(f"duplicated held-out seeds : {duplicated or 'none'}")
    print(f"seeds shared with dev set : {overlap or 'none'}")
    if duplicated or overlap:
        print("FAIL: the held-out set is smaller than it looks, or it leaks into development.")


def check_modes(task: str, seeds: list[int]) -> None:
    signatures = {}
    for mode in ("seeded", "saved"):
        adapter = LiberoAdapter(init_mode=mode)
        signatures[mode] = [(adapter.reset(task, s), signature(adapter))[1] for s in seeds]
        distinct = len(set(signatures[mode]))
        print(f"init_mode={mode:<7} distinct layouts over {len(seeds)} seeds: {distinct}")
        adapter.close()
    if signatures["seeded"] == signatures["saved"]:
        print(
            "\nNOTE: the two modes agree on every seed here. That is possible, but it is also "
            "what you would see if the seed were being ignored — cross-check with `vary`."
        )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("check", choices=("vary", "repeat", "distinct", "modes"))
    parser.add_argument("--suite", required=True)
    parser.add_argument("--task-id", type=int, required=True)
    parser.add_argument("--init-mode", default="seeded")
    parser.add_argument(
        "--seeds", default="1,2,3,51,52,53", help="seeds for vary/repeat/modes (comma-separated)"
    )
    parser.add_argument("--held-out", default="1-50", help="held-out range for `distinct`")
    parser.add_argument("--development", default="51-70", help="development range for `distinct`")
    args = parser.parse_args()

    def expand(spec: str) -> list[int]:
        if "-" in spec and "," not in spec:
            low, high = spec.split("-")
            return list(range(int(low), int(high) + 1))
        return [int(s) for s in spec.split(",")]

    task = f"{args.suite}/{args.task_id}"
    seeds = expand(args.seeds)

    if args.check == "modes":
        check_modes(task, seeds)
        return 0

    adapter = LiberoAdapter(init_mode=args.init_mode)
    try:
        if args.check == "vary":
            check_vary(adapter, task, seeds)
        elif args.check == "repeat":
            check_repeat(adapter, task, seeds)
        else:
            check_distinct(adapter, task, expand(args.held_out), expand(args.development))
    finally:
        adapter.close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
````

## .claude/skills/iterative-debugging/scripts/lint_skills.py

````text
"""Lint the skill library the way the runtime and its readers will actually see it.

Every check here is retroactive: each one names a defect that cost a real run during the 80-task
campaign, and none was invented from first principles. Three are errors; the prose heuristics are
advisory and never fail the build.

Errors:

1. **Sandbox rejection.** Every ```python fence is parsed and pushed through the harness's own
   `_ProgramValidator`. A fence that the validator refuses is an entry that produces
   `program_error` on every seed for anyone who pastes it. One `getattr()` in the most-copied
   helper in the library did exactly that to three agents in a row.

2. **Undefined helpers.** A fence may call the public harness API, a Python builtin, or a
   function some fence in the library defines. Anything else is a `NameError` waiting for the
   next reader. `quantile()` was called 89 times across two files that never defined it, and
   three verifiers lost their first run to it.

3. **A search with no empty case.** A result variable seeded with a real value before a search
   loop, or a `min`/`max` over a name nothing checks for emptiness. Ten refutations, and this
   shape caused three of them: `quat = downward` before a tilt search meant "no tilt matched"
   proceeded with the one orientation the entry's own table ruled out, dropping the object in
   mid-air on 7 of 10 legs.

Advisory (heuristics over prose, never fail the build):

4. **A prescribed loop with no tick cost.** The 1000-tick ceiling decided more verification
   attempts than any geometric error -- including one entry recommending 4-5 strokes where a
   single stroke costs 550-630 ticks.
5. **A reach figure that never says what was in the gripper.** Two tasks published an envelope
   measured empty; carrying the object, the tool froze 7-9 cm short and the lip stripped it.

The undefined-name check also prints cross-file dependencies -- a helper defined in one skill and
called from another. Those are legal but are the ones readers miss, so entries relying on them
should say so explicitly.

Run from `groot/cap`:

    uv run python .claude/skills/iterative-debugging/scripts/lint_skills.py

Exits non-zero on any error-level finding. Changelog files are skipped: they are history, not
runtime guidance.
"""

from __future__ import annotations

import argparse
import ast
import builtins
import pathlib
import re
import sys

SKILLS = pathlib.Path(__file__).resolve().parents[1] / "skills"
API_REFERENCE = pathlib.Path(__file__).resolve().parents[4] / "docs" / "api-reference.md"

FENCE = re.compile(r"```python\n(.*?)```", re.DOTALL)
SAFE_NAMES = set(dir(builtins))


def public_api() -> set[str]:
    """Callable names the docs advertise, read from the api-reference table.

    Parsed rather than hardcoded so the lint does not drift from the contract it checks against.
    """
    if not API_REFERENCE.exists():
        return set()
    text = API_REFERENCE.read_text()
    # Tools are lower_snake_case; the injected contract objects are CapitalCase
    # constructors (Pose, MotionStrategy, RobotAction, ArmCommand, Trajectory,
    # SynchronizedTrajectory). Both are advertised in the same table, so read
    # both -- hardcoding only `Pose` made every proposal that used any of the
    # others fail as "defined nowhere". That went unnoticed until a campaign
    # required `MotionStrategy`, because no earlier proposal had named one.
    return set(re.findall(r"`([A-Za-z_][A-Za-z0-9_]*)\(", text))


def fences(path: pathlib.Path):
    """Yield (line_number, code) for each python fence, with blockquote markers stripped."""
    text = path.read_text()
    for match in FENCE.finditer(text):
        code = "\n".join(
            line[2:] if line.startswith("> ") else (line[1:] if line == ">" else line)
            for line in match.group(1).split("\n")
        )
        yield text[: match.start()].count("\n") + 2, code


def seeded_search(tree: ast.AST) -> list[str]:
    """A search loop whose result was pre-seeded with a real value instead of None.

    This is the exact shape of the most expensive defect the campaign found: `quat = downward`
    before a `for` loop that overwrites `quat` only on success, so "nothing matched" silently
    proceeds with the known-bad default. Cost: 7 of 10 legs, object dropped in mid-air, 0/5.
    Seeding with None forces the empty case to be handled.
    """
    seeded = {
        node.targets[0].id: node
        for node in ast.walk(tree)
        if isinstance(node, ast.Assign)
        and len(node.targets) == 1
        and isinstance(node.targets[0], ast.Name)
        and not (isinstance(node.value, ast.Constant) and node.value.value is None)
    }
    found = []
    for loop in [n for n in ast.walk(tree) if isinstance(n, ast.For | ast.While)]:
        if not any(isinstance(n, ast.Break) for n in ast.walk(loop)):
            continue
        for node in ast.walk(loop):
            if (
                isinstance(node, ast.Assign)
                and len(node.targets) == 1
                and isinstance(node.targets[0], ast.Name)
                and node.targets[0].id in seeded
                and seeded[node.targets[0].id].lineno < loop.lineno
            ):
                found.append(node.targets[0].id)
    return sorted(set(found))


def unguarded_reduction(tree: ast.AST, code: str) -> list[str]:
    """`min(...)`/`max(...)` with a `key=` over a name, with nothing checking it is non-empty.

    Two verifiers lost a run to this: a selector whose candidate list came back empty and the
    reduction raised. An emptiness branch is the fix, and it is also where the fallback goes.
    """
    found = []
    for node in ast.walk(tree):
        if (
            isinstance(node, ast.Call)
            and isinstance(node.func, ast.Name)
            and node.func.id in {"min", "max"}
            and any(kw.arg == "key" for kw in node.keywords)
            and node.args
            and isinstance(node.args[0], ast.Name)
        ):
            name = node.args[0].id
            if f"not {name}" not in code and f"len({name})" not in code:
                found.append(f"{node.func.id}({name}, key=...)")
    return sorted(set(found))


PRESCRIBES_LOOP = re.compile(
    r"\b(repeat|loop of|until it|strokes|rungs|increments)\b", re.IGNORECASE
)
# Deliberately narrow. "depth" and "clearance" are everywhere in a vision context, so an earlier
# version of this flagged the Prompt Registry and 13 other innocents -- a warning channel people
# learn to ignore is worse than no channel. Require a reach-ENVELOPE word next to a metre-scale
# number, which is what an empty-gripper measurement actually looks like.
QUOTES_REACH = re.compile(
    r"\b(reach(?:es|ed|able)?|insertion|envelope)\b[^.\n]{0,60}?\b0\.\d{2,4}\b", re.IGNORECASE
)
STATES_LOAD = re.compile(
    r"\b(empty|held|holding|carrying|loaded|in the jaw|gripper's contents|gripped)\b", re.IGNORECASE
)


SECTION_REF = re.compile(r"`?(\w+\.md)`?\s*§\*?([^*\n.,;)]{4,60})")


def dangling_refs(files: dict[str, str]) -> list[str]:
    """Cross-file `other.md` §*Section* pointers that no longer resolve to a heading.

    Entries reference each other constantly, and a reference a reader cannot follow is exactly how
    the campaign's worst failure happened: a snippet was shipped in its pre-correction form because
    the correction lived somewhere the reader never reached. Four parallel rewrites split, merged
    and renamed sections independently and left 15 of these behind, so this is now checked.

    Matching is prefix-based on purpose: headings get re-worded far more often than they get
    genuinely deleted, and a fuzzy match keeps this from crying wolf on a rename that still lands
    somewhere sensible.
    """

    def normalise(text: str) -> str:
        """Strip the markdown a heading and a reference to it spell differently.

        BOTH sides must go through this. The first version normalised only the headings, so a
        reference written with backticks -- §*`planner_failed` Mid-Carry* -- could never match
        anything and was reported dangling forever. A check with a permanent false positive is a
        check people switch off, which is worse than not having written it.
        """
        return re.sub(r"[`*~]", "", text).strip().lower()

    headings = {
        name: {normalise(h) for h in re.findall(r"^#{2,3} (.+)$", text, re.MULTILINE)}
        for name, text in files.items()
    }
    found = []
    for name, text in files.items():
        for match in SECTION_REF.finditer(text):
            target, section = match.group(1), normalise(match.group(2))
            if target not in headings:
                continue
            if not any(section[:30] in h or h[:30] in section for h in headings[target]):
                found.append(f"{name} -> {target} §{match.group(2).strip()[:46]}")
    return sorted(set(found))


def prose_warnings(path: pathlib.Path) -> list[str]:
    """Two heuristics over entry prose, for the causes that are not visible in the AST.

    Both are advisory: they flag an entry for a human to look at, and never fail the build.
    Derived from the refutation post-mortem -- five losses to an unstated tick budget, two to a
    reach figure measured with an empty gripper and applied to a loaded one.
    """
    warnings = []
    text = path.read_text()
    # Split on level-2 headings so each entry is judged on its own.
    entries = re.split(r"\n## ", text)
    for entry in entries[1:]:
        title = entry.split("\n", 1)[0].strip()
        if PRESCRIBES_LOOP.search(entry) and "tick" not in entry.lower():
            warnings.append(
                f"{path.name}: '{title[:54]}' prescribes repetition, quotes no tick cost"
            )
        if QUOTES_REACH.search(entry) and not STATES_LOAD.search(entry):
            warnings.append(
                f"{path.name}: '{title[:54]}' quotes reach/depth, never says what was held"
            )
    return warnings


def main() -> int:
    parser = argparse.ArgumentParser(description="Lint the skill library, or one staged proposal.")
    parser.add_argument(
        "--proposal",
        type=pathlib.Path,
        default=None,
        help="Lint a staged proposal (proposed_skills.md) instead of the library. The library is "
        "still parsed, so a helper it already defines counts as defined, but only problems "
        "originating in the proposal are reported. Use this BEFORE dispatching a verifier: "
        "three verifiers in one campaign each lost a run to a NameError this finds instantly.",
    )
    args = parser.parse_args()

    sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[4] / "src"))
    from cap_harness.runtime import _ProgramValidator

    library = [p for p in sorted(SKILLS.glob("*.md")) if not p.name.endswith("-changelog.md")]
    if args.proposal is not None:
        if not args.proposal.exists():
            raise SystemExit(f"no such proposal: {args.proposal}")
        targets, context = [args.proposal], library
    else:
        targets, context = library, []

    api = public_api()
    rejected: list[str] = []
    empty_case: list[str] = []
    defined: dict[str, set[str]] = {}
    called: dict[str, set[str]] = {}
    warnings: list[str] = []
    sources: dict[str, str] = {}

    for path in context + targets:
        report = path in targets  # context files are read for their definitions only
        if report:
            warnings.extend(prose_warnings(path))
        sources[path.name] = path.read_text()
        for line_no, code in fences(path):
            where = f"{path.name}:{line_no}"
            try:
                tree = ast.parse(code)
            except SyntaxError as error:
                if report:
                    rejected.append(f"{where}  SYNTAX: {error.msg}")
                continue
            if report:
                try:
                    _ProgramValidator().visit(tree)
                except ValueError as error:
                    rejected.append(f"{where}  REJECTED: {error}")
                for name in seeded_search(tree):
                    empty_case.append(
                        f"{where}  '{name}' seeded before a search loop -- seed it None"
                    )
                for call in unguarded_reduction(tree, code):
                    empty_case.append(f"{where}  {call} with no emptiness guard")
            for node in ast.walk(tree):
                if isinstance(node, ast.FunctionDef):
                    defined.setdefault(node.name, set()).add(path.name)
                if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and report:
                    called.setdefault(node.func.id, set()).add(where)

    undefined = {
        name: sites
        for name, sites in called.items()
        if name not in SAFE_NAMES and name not in api and name not in defined
    }

    print("=== sandbox validation ===")
    for line in rejected:
        print(f"  {line}")
    print(f"  {len(rejected)} rejection(s)")

    print("\n=== called but defined nowhere ===")
    for name in sorted(undefined):
        print(f"  {name:24s} {sorted(undefined[name])[:4]}")
    print(f"  {len(undefined)} undefined name(s)")

    print("\n=== a search with no empty case ===")
    for line in empty_case:
        print(f"  {line}")
    print(f"  {len(empty_case)} unhandled empty case(s)")

    print("\n=== cross-file helpers (legal, but say so in the entry) ===")
    for name, homes in sorted(defined.items()):
        users = {site.split(":")[0] for site in called.get(name, set())} - homes
        if users:
            print(f"  {name:24s} {sorted(homes)} -> {sorted(users)}")

    broken = [
        line
        for line in dangling_refs(sources)
        if args.proposal is None or any(t.name in line for t in targets)
    ]
    print("\n=== dangling cross-references ===")
    for line in broken:
        print(f"  {line}")
    print(f"  {len(broken)} reference(s) to a heading that no longer exists")

    print("\n=== advisory (heuristic, never fails the build) ===")
    for line in warnings:
        print(f"  {line}")
    print(f"  {len(warnings)} advisory warning(s)")

    return 1 if rejected or undefined or empty_case or broken else 0


if __name__ == "__main__":
    raise SystemExit(main())
````

## .claude/skills/iterative-debugging/scripts/watchdog.py

````text
"""Wake the coordinator when a live agent stops writing to its transcript.

An agent blocked on a permission prompt does not fail — it *waits*, and looks identical to one
that is thinking. This campaign lost **29.5 hours** that way, including single incidents of
14 h 18 m and 14 h 48 m, all of them an `rm` awaiting approval. The prompts now ban `rm`, but that
is the cause we know about; this catches the ones we do not.

Run it in the background and it exits as soon as something has been idle too long, which
re-invokes the coordinator with the diagnosis:

    uv run python .../watchdog.py --live-file /path/to/live_agents.txt &

`--live-file` holds one agent id per line and is **re-read every cycle**, so the coordinator just
rewrites it on each dispatch and each completion. An earlier version took a fixed list at launch,
so every agent that finished normally went idle and tripped a false alarm — three in one session.
A watchdog that cries wolf gets ignored, which is worse than not having one.
"""

from __future__ import annotations

import argparse
from pathlib import Path
import re
import sys
import time

# Claude Code writes one JSONL transcript per subagent; its mtime is the liveness signal.
DEFAULT_SUBAGENT_GLOB = "/root/.claude/projects/*/*/subagents"
COMMAND_RE = re.compile(r'"command"\s*:\s*"((?:[^"\\]|\\.){0,300})')


def transcript_for(subagent_dirs: list[Path], agent_id: str) -> Path | None:
    for directory in subagent_dirs:
        candidate = directory / f"agent-{agent_id}.jsonl"
        if candidate.exists():
            return candidate
    return None


def last_command(transcript: Path) -> str:
    """The most recent shell command in the transcript — usually the thing that is blocked."""
    try:
        tail = transcript.read_bytes()[-200_000:].decode("utf-8", "replace")
    except OSError:
        return "<unreadable>"
    matches = COMMAND_RE.findall(tail)
    return matches[-1][:300] if matches else "<no shell command in the recent transcript>"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--live-file", type=Path, required=True, help="one agent id per line; re-read every cycle"
    )
    parser.add_argument(
        "--subagent-dir",
        type=Path,
        action="append",
        default=None,
        help="directory of agent-<id>.jsonl transcripts (repeatable)",
    )
    parser.add_argument(
        "--idle-limit",
        type=int,
        default=1500,
        help="seconds of silence before waking the coordinator (default 1500)",
    )
    parser.add_argument("--poll", type=int, default=120, help="seconds between checks")
    parser.add_argument(
        "--once", action="store_true", help="check a single time and exit; for testing"
    )
    args = parser.parse_args()

    dirs = args.subagent_dir or list(Path("/").glob(DEFAULT_SUBAGENT_GLOB.lstrip("/")))
    if not dirs:
        print("no subagent transcript directory found; pass --subagent-dir", file=sys.stderr)
        return 2

    while True:
        if not args.live_file.exists():
            print(f"live file vanished: {args.live_file}", file=sys.stderr)
            return 2
        now = time.time()
        for line in args.live_file.read_text().splitlines():
            agent = line.strip()
            if not agent or agent.startswith("#"):
                continue
            transcript = transcript_for(dirs, agent)
            if transcript is None:
                continue  # not started yet, or already reaped
            idle = now - transcript.stat().st_mtime
            if idle > args.idle_limit:
                print(f"STALL: agent {agent} idle {idle / 60:.0f} min")
                print(f"transcript: {transcript}")
                print(f"last command: {last_command(transcript)}")
                print(
                    "\nIf it is awaiting approval, the agent cannot proceed and cannot report it. "
                    "Decide whether to answer it, kill the agent and re-dispatch the task, or "
                    "salvage its work yourself."
                )
                return 0
        if args.once:
            print("no stalls")
            return 0
        time.sleep(args.poll)


if __name__ == "__main__":
    raise SystemExit(main())
````

## .claude/skills/iterative-debugging/behavior/SKILL.md

````text
---
name: iterative-debugging-behavior
description: "Block-by-block fix loop on BEHAVIOR-1K (R1 Pro, OmniGibson on Isaac Sim). The policy is grown one code block at a time against what the robot actually did, and what carries across seeds is a skill library, not a program. Use for the two R1 Pro pickup tasks; Stage 1 learns on seeds 26-35, Stage 2 evaluates on 1-25 with a frozen library."
---

# Block-by-Block Fix Loop on BEHAVIOR-1K

The parent skill ([../SKILL.md](../SKILL.md)) writes one whole program per task, freezes it, and
replays that frozen program across the held-out seeds. **That protocol does not apply here.**
BEHAVIOR tasks are long-horizon: the robot starts in another room, cannot see the target, and
must search, drive, look down and grasp. A program authored up front is guessing at every stage
past the first.

So on this benchmark the policy is **grown**, not authored:

1. Write one `# Code block N` section.
2. Run the **whole** `policy.py` on the seed, from a fresh reset.
3. Read what actually happened: where the base ended up, what was localized, what the hand holds.
4. Write the next block against that observed state, and run the whole program again.
5. Repeat until the seed succeeds or the budget is spent.

The simulator resets on every attempt. Only `policy.py` persists and accumulates blocks.

What carries across seeds is the **skill library**, not any policy. Each seed's `policy.py` is
disposable. Stage 2 measures whether the frozen library is enough for a fresh agent to solve an
unseen seed, not whether one program generalizes.

**The library is shared by both tasks.** It lives at `$RUN_ROOT/behavior/skill-library/`, above the
suite directories, and a task's Stage 1 extends what the previous task left. This is a deliberate
departure from ASPIRE, which keeps one library per task. The reason is that most of what a campaign
learns here is about the harness, the robot and the simulator rather than about one object, and
re-discovering it per task wastes a bootstrap seed each time. It also asks a more interesting
question: does a library built on one task help on a different one.

It leaks nothing, because the partition is per task. Knowledge measured on the radio's seeds says
nothing about a soda-can instance, so the can's evaluation seeds stay unseen.

The cost is that **every entry must carry the task it was measured on**, and an entry from another
task is a hypothesis rather than a rule until this task's seeds confirm it.

| Difference from the parent | Consequence |
|---|---|
| Long horizon, target not visible at reset | Blocks are written against observed state, never predicted state |
| The deliverable is a library | Stage 1 promotes skills after every seed; policies are disposable |
| Stage 2 is agentic | A fresh agent per evaluation seed writes its own blocks against the frozen library |
| Frames: `odom` is fixed where the base stood at reset | Localized objects stay valid after the base drives |
| Episodes cost minutes, not seconds | Every attempt replays every earlier block; keep blocks lean |
| Isaac Sim, not MuJoCo | `OMNIGIBSON_*` variables, one Isaac process per GPU, exit 139 after a complete run is normal, judge by `outcome.json` |
| Planning runs in-process on cuRobo | `MotionStrategy()` already means cuRobo; PyRoKi and port 8118 are not involved |
| Two arms, a torso and a base | `behavior.*` extensions move base and torso; `RobotAction` moves arms |

## Setup

1. `scripts/bootstrap_behavior.sh --accept-dataset-tos` once per machine (see
   [docs/behavior.md](../../../../docs/behavior.md)); it prints the activation block.
2. Export the Benchmark Profile block from [subagent-prompt.md](subagent-prompt.md) verbatim in
   every shell that runs episodes. It sets `CAP_HARNESS`, `SERVICE_PORTS`, the `OMNIGIBSON_*`
   variables, `CUDA_VISIBLE_DEVICES` and `ulimit -c 0`. Run flags are spelled out in the run
   command rather than held in a variable, because zsh does not word-split one.
3. Bootstrap the two provider venvs once (`scripts/bootstrap_providers.sh --providers
   sam3,contact_graspnet --profile rtx4090`; profiles live in `configs/profiles/`), then start
   them: `scripts/supervise_services.sh --providers sam3,contact_graspnet --profile rtx4090`.
   On a single-GPU bench they share the card with Isaac (about 8 GB of VRAM together); leave
   PyRoKi and cuRobo services down, they are not used.
4. Read [docs/api-reference.md](../../../../docs/api-reference.md) (the `behavior.*` rows),
   [docs/behavior.md](../../../../docs/behavior.md) `## Semantics` (the `odom` paragraph),
   [docs/run-artifacts.md](../../../../docs/run-artifacts.md), and
   [main-agent-prompt.md](main-agent-prompt.md).

## Seeds

Seeds are task-instance ids; both tasks ship 300 training instances (0-299), so every partition
below is valid without any init-mode switch.

| Partition | Seeds | Rule |
|---|---|---|
| Stage 1, learning | 26-35 | Build the skill library here. Never inspect an evaluation seed. |
| Stage 2, evaluation | 1-25 | One fresh agent per seed, empty policy, frozen library, append-only. |
| Free diagnostics | 36-50 | One-off probes only; never reported. |

The shipped examples under `examples/behavior/` were verified on seeds 1-3, which are evaluation
seeds. They are API documentation, not campaign material: **a campaign never reads them**, and
the skill library starts empty.

## Campaign Layout

```
$RUN_ROOT/behavior/
├── skill-library/               # SHARED and cumulative across both tasks
└── <suite>/
├── campaign-state.md            # coordinator's ledger: seed, stage, attempts, outcome
├── skill-library-frozen/        # this task's read-only snapshot, taken at its freeze
├── frozen-manifest.sha256
├── stage1/seed_26 … seed_35/
│   ├── policy.py                # grows block by block
│   ├── attempts/attempt_001/ …  # one harness run directory per attempt
│   └── seed-summary.md
└── stage2/seed_01 … seed_25/    # same shape, frozen library, fresh agent each
```

## Run Order

1. Create the layout above for the suite you are running. If this is the **first** task of a
   campaign, seed the shared `skill-library/` with the topic files from [skills/](skills/) as
   templates only, headings without contents. If a previous task has already run, the shared
   library is what it left: use it as it stands, and do not reset it.
2. Stage 1: for each seed 26 to 35 in order, dispatch one worker with
   [subagent-prompt.md](subagent-prompt.md) at `STAGE: 1`. After each seed, fold what worked into
   `skill-library/` and record the seed in `campaign-state.md`.
3. Freeze after seed 35, following [main-agent-prompt.md](main-agent-prompt.md). Nothing in the
   library, the prompts, the config or the protocol changes after this point.
4. Stage 2: for each seed 1 to 25, dispatch one **fresh** worker at `STAGE: 2` with the frozen
   library. No information passes between evaluation seeds.
5. Score with `./score_campaign.py <campaign-dir>`. Do NOT hand-count attempts: the unit of
   scoring is the **final policy**, and the script finds it by hashing each run's
   `source/program.py`. Exactly two numbers are reported, both per seed: **success**, the seed's
   final policy succeeded at least once; and **navigation**, the seed's final policy reached the
   object. Reliability is not reported. Development attempts ran earlier programs with no grasp
   block and are excluded entirely. See **Scoring** in [main-agent-prompt.md](main-agent-prompt.md).
6. Use [clean-task-slate.md](clean-task-slate.md) before reruns.
7. Promote findings into this folder's [skills/](skills/) files only between campaigns, never
   during Stage 2.
````

## .claude/skills/iterative-debugging/behavior/skills/README.md

````text
# Shared BEHAVIOR-1K Robot Skills

Observation-only knowledge for the R1 Pro pickup tasks, separate from the parent skill's tabletop
files because a mobile robot in Isaac fails in different ways. Pipeline orchestration lives one
level up.

| Skill | Purpose |
|---|---|
| [search.md](search.md) | Finding the object: prompts, turning, torso tilt, when to give up |
| [navigation.md](navigation.md) | Standoff and approach poses, servo versus cuRobo, the odom frame |
| [mobile-grasp.md](mobile-grasp.md) | Grasp candidates on R1 Pro, arm choice, approach depth, the lift |
| [time-budget.md](time-budget.md) | What each call costs in steps and wall clock |
| [isaac-operations.md](isaac-operations.md) | Launch, crashes, memory, exit codes |

## How these files are used

These five files are the **topic template** for a campaign's skill library. A campaign copies
their filenames and headings into `$RUN_ROOT/behavior/<suite>/skill-library/` and starts with the
contents empty, so that nothing tuned outside the learning partition reaches an evaluation seed.
Stage 1 fills the library, the freeze locks it, and every Stage 2 seed reads it and nothing else.

A library entry is a **trigger**, a **snippet that actually ran**, and its **provenance**: task,
seed, attempt and date. An entry with no working snippet is a note, not a skill. Durable patterns
are promoted back into the files here between campaigns, never during one.

All snippets use only the documented public CaP program APIs (`docs/api-reference.md`): no
imports except `math`, no NumPy, no simulator internals, and a top-level `result` variable per
program.

Every entry carries provenance. Entries marked **unverified (ASPIRE prose)** were taken from the
ASPIRE reference runbooks and have not been reproduced through this harness; promote them to
verified only with a task, seeds, run path and date.
````

## .claude/skills/iterative-debugging/behavior/skills/navigation.md

````text
# Navigation: the odom frame, standoff and approach poses

## The frame does not move

`odom` is fixed where the base stood at reset. A radio localized before driving is still at the
same `odom` coordinates after driving; `behavior.get_base_pose()` returns where the base is now
in that same frame. Never re-express a stored point after a move.

## Two planners

| planner | use for | cost |
|---|---|---|
| `servo` | turns in place, hops under a metre, backing up | cheap, no collision check |
| `curobo` | room-scale moves, going around furniture | one cuRobo base plan (about 20 s when it fails, less when it succeeds), collision-checked against the scene; falls back to hops along the scene's traversability map |

`navigate_to_pose` reports `moved_x`, `moved_y`, `moved_yaw` in its diagnostics; a result that is
`ok` but barely moved means the goal was already reached, one that timed out with a large
remaining error means the base is blocked.

OmniGibson's cuRobo wrapper plans the base with trajectory optimisation only (no graph search),
so a single plan to a goal behind furniture or in another room fails with `TrajOpt Fail`
(verified 2026-09-12: the approach pose of a can 3.7 m away across the living room, and a
standoff pose behind the coffee table). The harness then asks the scene's traversability map
for the shortest path, splits it into 1 m hops, and plans each hop with cuRobo, servoing a hop
whose plan fails. The diagnostics say which happened: `route` is `direct`, `traversability` or
`none`, `hops` and `servo_hops` count the legs, `direct_status` is cuRobo's reason for the direct
plan (`TrajOpt Fail` = blocked path, `IK Fail` = the goal pose itself is in collision). An
`IK Fail` goal needs a different goal, not a route: stand farther off or on the other side.

## Standing off a table

**Trigger:** the target is on a surface (the radio on the table).

```python
radio = find_object("red radio")                       # prelude dict: {"point_cloud", "geometry", ...}
moved = go_to_standoff("table", radio, standoff_m=0.3)   # prelude: plan_standoff_pose + free check
```

**Why:** the pose sits 0.3 m outside the table edge nearest the object, facing it; the arm
reaches over the edge. **Verified 2026-09-12** (radio seeds 1–3): this geometry, taken from ASPIRE,
with a 0.3 m buffer.

`go_to_standoff` (prelude) tries 0.3, 0.45 and 0.6 m standoffs through `base_pose_is_free` and
then falls back to `approach_object(target, 0.65)`. Verified 2026-09-12 (radio, seed 1 in the
pickup plan): the head sees only part of the table, the hull's "nearest edge" was the far short
edge, and all three standoffs sat inside the couch; the run gave up after 40 ticks.

## Approaching a floor object

**Trigger:** the target stands free (a can on the floor).

```python
moved = approach_object(can, 0.7)      # prelude: free candidates around the line of sight
```

`approach_object` tries 0.7, 0.95 and 1.2 m short of the object at five angles around the line
of sight and skips every candidate `behavior.base_pose_is_free(x, y)` rejects (the scene's
traversability map eroded by the base footprint). Verified 2026-09-12: the plain line-of-sight
pose 0.7 m short of a can sat inside the coffee table twice; cuRobo needed 27 s to say `IK Fail`
and the map has no route to a blocked cell. `navigate_to_pose` now refuses such a goal in
milliseconds (`route: goal_blocked`), so the candidate loop is cheap.

**Why:** 0.7 m short of the object leaves the arm room to reach down in front of the base.
**unverified (ASPIRE prose)**: the reference stopped 0.7 m short and backed up 0.2 m to
re-acquire when the object dropped out of view.

## Backing up

```python
back_up(0.2)     # prelude: reverse along the current heading with the servo planner
```
````

## .claude/skills/evosearch/SKILL.md

````text
---
name: evosearch
description: "Run the CaP Fix Loop + Evolutionary Search experiment on a user-supplied list of low-performing benchmark tasks: iterative K=8 candidate search on development seeds 51–65, validation selection, and final held-out evaluation on seeds 1–50."
---

# Fix Loop + Evolutionary Search

Use this skill for intensive debugging of difficult tasks — Evolutionary Search's
multi-candidate search finds strategies the single-pass fix loop misses. It builds on the
`iterative-debugging` skill: each task's fix loop `fix_code.py` (when present) is the baseline
to beat, seeded verbatim as `candidate_A`. LIBERO-Pro runs use `--init-mode seeded` so
development seeds 51–65 and held-out seeds 1–50 are distinct scenes.

## Setup

1. Complete benchmark setup for the target embodiment (`docs/libero-pro.md`,
   or `docs/robosuite.md`), including the pinned environment (for LIBERO:
   `scripts/bootstrap_libero.sh` → `.venv-libero`) and SAM3 authentication.
2. Export the benchmark environment variables (for LIBERO: `LIBERO_CONFIG_PATH="$PWD/.libero"`,
   `MUJOCO_GL=egl`, `PYOPENGL_PLATFORM=egl`, `EGL_PLATFORM=device`,
   `TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD=1`).
3. Start perception services (`scripts/supervise_services.sh`) and a persistent coordinator
   session.
4. Confirm the Fix Loop experiment has produced `fix_code.py` (and a baseline held-out rate)
   for the target tasks when available.
5. Read `docs/api-reference.md`, `docs/run-artifacts.md`, and
   [main-agent-prompt.md](main-agent-prompt.md).

## Run Order

1. Take the task list from the user (tasks below the success threshold; any set of
   `(benchmark, suite, task_id)` cases) and follow
   [main-agent-prompt.md](main-agent-prompt.md) as the coordinator.
2. Fill [subagent-prompt.md](subagent-prompt.md) once per task and dispatch subagents on the
   available worker GPUs.
3. Subagents read the experiment-specific companion skills under [skills/](skills/) when
   generating candidates, iterate with [scripts/evosearch_eval.py](scripts/evosearch_eval.py),
   and run the Stage 2 held-out evaluation themselves with the shared
   `.claude/skills/iterative-debugging/scripts/run_validation.py` before returning.
4. Use [clean-task-slate.md](clean-task-slate.md) before rerunning a task or suite.

## Files

| File | Purpose |
|---|---|
| [main-agent-prompt.md](main-agent-prompt.md) | Coordinator runbook for task dispatch and result collection |
| [subagent-prompt.md](subagent-prompt.md) | Per-task Evolutionary Search iteration prompt |
| [clean-task-slate.md](clean-task-slate.md) | Reset checklist before reruns |
| [skills/evosearch-iteration.md](skills/evosearch-iteration.md) | Candidate/eval/keyframe iteration mechanics |
| [scripts/evosearch_eval.py](scripts/evosearch_eval.py) | Candidate × seed matrix evaluator |
| [scripts/analyze_evosearch_traces.py](scripts/analyze_evosearch_traces.py) | Post-eval per-candidate signal analysis |
| `docs/api-reference.md` | Public CaP program API reference |
| [../iterative-debugging/skills/](../iterative-debugging/skills/) | Shared robot skills (localize/grasp/transport/manipulation) |
````

## .claude/skills/evosearch/main-agent-prompt.md

````text
---
name: evosearch-main-agent-prompt
description: Coordinator guide for running Evolutionary Search-style iterative debugging on a list of low-performing CaP benchmark tasks. Each subagent iterates on seeds 51–65 and runs Stage 2 (seeds 1–50) itself; the coordinator just redispatches freed GPUs.
---

# Evolutionary Search Multi-Task — Coordinator Guide

> **What:** Run Evolutionary Search iterative debugging (K=8 candidates, seeds 51–65)
> autonomously on a list of tasks. Stage 2 (seeds 1–50) runs once per task after convergence,
> executed by the subagent before it returns.
> **Why:** Intensive debugging for difficult tasks — Evolutionary Search's multi-candidate
> search finds strategies the single-pass fix loop misses.
> **Subagent template:** [subagent-prompt.md](subagent-prompt.md)

---

## Initialization: Verify Perception Services

```bash
for p in 8114 8115 8116; do
  echo "port $p: $(curl -s -o /dev/null -w '%{http_code}' --max-time 3 http://127.0.0.1:$p/openapi.json)"
done
```
200 = UP, 000 = DOWN. All three must be UP before dispatching. If any is down, start them with
`scripts/supervise_services.sh` in a persistent terminal.

---

## Directory Layout

```
outputs/
  evosearch/
    <benchmark>/<suite>/task_<id>/<run_id>/   ← Evolutionary Search iteration artifacts
      task_analysis.md
      iter_00/ iter_01/ ...
        candidate_A/code.py
        iter_summary.json
    <benchmark>/<suite>/task_<id>/
      evosearch_best_code.py                  ← best code from Stage 1 iterations (written by subagent)
      findings.md                             ← subagent summary + Stage 2 result

  evosearch_eval/
    <benchmark>/<suite>/task_<id>/runs/<run_id>/manifest.json   ← Stage 2 results
                                                                  (run_validation.py manifests)
```

---

## Task List

Take the task list from the user — anything below the success threshold in the fix loop
held-out results is a candidate (default threshold: <90%). Verify exact task ids before
dispatch, e.g. for LIBERO:

```bash
.venv-libero/bin/python3 -c "
from cap_harness.libero.registry import LiberoSuiteRegistry
for task in LiberoSuiteRegistry().enumerate_tasks(['<suite>']):
    print(f'  {task.task_id:2d}: {task.task_name}')
"
```

---

## The Loop

```
read progress → assign free worker GPUs → dispatch subagents → GO IDLE
                                                                    ↑
on notification: redispatch freed GPU to next pending task → GO IDLE ┘
```

One task = one subagent = one GPU. The subagent runs Evolutionary Search iterations
(seeds 51–65) AND Stage 2 (seeds 1–50) before returning. When the coordinator gets a completion
notification, the GPU is already free — just dispatch the next task.

---

## Coordinator Rules

1. **Dispatch subagents — never run iterations yourself.**
2. **Go idle after dispatching.** You will be notified when a subagent finishes.
3. **Keep every assigned worker GPU occupied.**
4. **On each notification: check which GPU freed up, dispatch next pending task to it.**
5. **NEVER re-dispatch a done task** — `done` = Stage 2 complete (a full 1–50 manifest in
   `outputs/evosearch_eval/`).
6. **Enforce the non-privileged provenance gate.** Dispatch the complete subagent template,
   including its forbidden-API and provenance rules. A returned task must explicitly report
   `Non-privileged API audit: PASS`. If the audit is missing or quarantined, preserve its
   artifacts, do not accept its Stage 2 results, and report the task as invalid.

---

## Workflow

### 1. Check progress

```bash
# Stage 1 complete (evosearch_best_code.py exists) + Stage 2 manifest counts:
for task_dir in outputs/evosearch/*/*/task_*/; do
  ref=${task_dir#outputs/evosearch/}
  if [ -f "$task_dir/evosearch_best_code.py" ]; then
    python3 - "$ref" << 'EOF'
import json, sys
from pathlib import Path
ref = sys.argv[1].rstrip("/")
best = (0, 0)
for manifest_path in Path("outputs/evosearch_eval", ref, "runs").glob("*/manifest.json"):
    manifest = json.loads(manifest_path.read_text())
    if (manifest["trials"], manifest["passes"]) > best:
        best = (manifest["trials"], manifest["passes"])
print(f"{ref}: stage1-done, stage2={best[1]}/{best[0]} of 50")
EOF
  fi
done
```

### 2. Check free GPUs

```bash
for gpu in 3 4 5 6 7; do
  procs=$(nvidia-smi -i $gpu --query-compute-apps=pid --format=csv,noheader,nounits 2>/dev/null | grep -c '[0-9]')
  if [ "$procs" -eq 0 ]; then echo "GPU $gpu: FREE"; else echo "GPU $gpu: BUSY ($procs processes)"; fi
done
```

(Adjust the GPU list to the set the user assigned; perception services own GPUs 0–2 by
default.)

### 3. Dispatch subagents

Use a high-capability model for Evolutionary Search's multi-candidate trace diagnosis and
cross-iteration refinement.

```python
Agent(
    description="Evosearch actor: <suite_short>/task_<id> GPU<N>",
    subagent_type="general-purpose",
    model="opus",
    prompt=<filled template from subagent-prompt.md>,
    run_in_background=True
)
```

Send all dispatches in one message (one per free GPU), then stop.

### 4. On each completion: redispatch

When a subagent notification arrives (it has already completed both Stage 1 and Stage 2):

1. Confirm the returned summary says `Non-privileged API audit: PASS`. If it is missing or says
   `QUARANTINED`, preserve the artifacts, reject any derived Stage 2 results, and report the task
   as invalid; stop handling that task.
2. Read `outputs/evosearch/$BENCHMARK/$SUITE/task_$TASK_ID/findings.md` — note Stage 1 and
   Stage 2 rates
3. Check free GPUs (§2) — the completed subagent's GPU is already free
4. Dispatch the next pending task to that GPU
5. Go idle

---

## Stopping Criteria Reference

Subagents stop Stage 1 when:
- Best candidate ≥ **80%** on seeds 51–65 → **solved**
- **5 iterations** completed → **max iterations**
- Best improvement < **5pp** for 2 consecutive iterations → **plateau**

If Stage 1 is BLOCKED: subagent skips Stage 2 and returns immediately.
````

## .claude/skills/evosearch/subagent-prompt.md

````text
---
name: evosearch-subagent-prompt
description: Self-contained prompt template for Evolutionary Search multi-task actor subagents. Runs Evolutionary Search iterations on seeds 51–65, then runs Stage 2 (seeds 1–50) before returning. Coordinator just redispatches the freed GPU.
---

# Evolutionary Search Multi-Task Actor Subagent Prompt Template

Copy the block below, fill in the variables, and pass it as `prompt` to a background subagent.

> **Model:** Use a high-capability model. Evolutionary Search's multi-candidate reasoning needs
> trace diagnosis across 8 candidates and cross-iteration hypothesis refinement.

---

```
## Task Assignment

BENCHMARK:  <libero-pro|robosuite>
SUITE:      <full suite name>
TASK_ID:    <integer task id>
GPU:        <assigned simulation GPU>
TASKSHORT:  <short_unique_name_for_logs>
BASELINE_RATE: <e.g. "16% (50 seeds)">   # from the fix loop — what we're trying to beat
EVOSEARCH_DIR: outputs/evosearch             # change to outputs/evosearch_rerun for a clean rerun
EVALDIR:    outputs/evosearch_eval           # change to outputs/evosearch_eval_rerun for a clean rerun

Working directory: $REPO_ROOT (the CaP harness repository root)
Task workspace: TASK_DIR=$EVOSEARCH_DIR/$BENCHMARK/$SUITE/task_$TASK_ID

---

## ⛔ EVAL SET LOCKOUT — DURING ITERATIONS ONLY

**Seeds 1–50 are the held-out evaluation set. DO NOT run them during Evolutionary Search
iterations.**

- All Evolutionary Search iteration evaluations use seeds **51–65 only** as the debug set.
- Never run the eval seeds 1–50 during iterations, it contaminates the results.
- **Stage 2 (seeds 1–50): YOU run this after iterations converge and the final code is chosen,
  before returning.**
- **Every run uses `--init-mode seeded`** (the scripts default to it). Omitting it collapses
  seeds onto the 50 saved initial states and corrupts the seed protocol.

Violation invalidates the benchmark.

---

## What You Are

You are an Evolutionary Search debugging subagent. Your job:
1. Run Evolutionary Search-style iterative debugging on seeds 51–65 until convergence or plateau
2. Save the best code as `$TASK_DIR/evosearch_best_code.py`
3. **Run Stage 2: eval the best code on seeds 1–50**
4. Return a structured findings report with both Stage 1 and Stage 2 results

You have full tool access (Bash, Read, Write, Edit, Glob, Grep).
**`.venv-libero/bin/cap-harness`** — use the pinned benchmark environment for every episode.
You own GPU $GPU exclusively; run every episode with
`CUDA_VISIBLE_DEVICES=$GPU MUJOCO_EGL_DEVICE_ID=$GPU`. Both are required: EGL device enumeration
ignores `CUDA_VISIBLE_DEVICES`, so omitting `MUJOCO_EGL_DEVICE_ID` renders on physical GPU 0 and
corrupts depth when that GPU is busy.

---

## Context

**Baseline:** The fix loop achieved $BASELINE_RATE on this task. Your target: exceed that
significantly, ideally ≥80% on seeds 51–65.

**Skill library:** shared robot skills live in `.claude/skills/iterative-debugging/skills/`.
Read before writing any candidates.

**Program rules:** generated programs cannot `import` anything and have no NumPy, filesystem,
or network access; set a top-level `result` variable; only the documented public tools and the
six injected constructors are available. Full contract: `docs/api-reference.md`.

**Services:** 200 = UP on 8114 (SAM3), 8115 (Contact-GraspNet), 8116 (PyRoki). Check before
running:
```bash
for p in 8114 8115 8116; do echo "port $p: $(curl -s -o /dev/null -w '%{http_code}' --max-time 3 http://127.0.0.1:$p/openapi.json)"; done
```

---

## ⛔ FORBIDDEN APIs

Native simulator access or unwrapping (`env.handle.env`, `sim.data.*`, `sim.model.*`,
`sim.forward()`, `inner.parsed_problem`, `inner._eval_predicate`, `inner.obj_body_id`,
`env._step_once()`), raw reward/success inspection, manual physics stepping, reading
`.bddl`/`.xml`/`.urdf` asset files for geometry, and hardcoded world poses / object dimensions /
pixel locations / seed-specific behavior that perception can derive.

This contract applies unchanged when `BENCHMARK` is `libero-pro` or `robosuite` (and remains the
default for every simulation benchmark). LIBERO-specific examples include the listed `inner.*`
state and BDDL-derived geometry. Robosuite-specific examples also include `env.sim.*`, raw
model/data/robot/observable objects, `_check_success()`, and reward access, whether reached
directly or through a wrapper, alias, or reflection.

This is a provenance rule, not only an API-name ban:

- Every task-dependent object choice, grasp or target pose, object dimension, and pixel location
  must be derived at runtime through the allowed public perception and CaP APIs.
- Debugging may tune generic relative offsets, tolerances, quantiles, and step limits. It must
  never copy observed coordinates, dimensions, pixel locations, raw reward/success values, or
  seed identities into executable constants or branches.
- Before saving `evosearch_best_code.py`, audit every task-dependent constant. If a candidate or
  its strategy used forbidden information, quarantine that candidate and all results derived
  from it; never rewrite it to hide its provenance or run it in Stage 2.

---

## Stage 1: Evolutionary Search Iterations on Seeds 51–65

### Step 0 — Check if evosearch_best_code.py already exists

```bash
ls $TASK_DIR/evosearch_best_code.py 2>/dev/null && echo EXISTS || echo MISSING
```

If EXISTS → audit the existing program under the non-privileged provenance rules above. Skip
to **What to Return** only if it passes; otherwise quarantine it and mark the task BLOCKED.

---

### Step 0b — Task language check (MANDATORY)

**The task name might not match the actual goal.** Always read the `task_language` reported by
the scene snapshot (Step 2). If it differs from the task name, **task language is ground
truth** — base all strategy on it. Record the actual language in `task_analysis.md` before
writing any candidates. (LIBERO `_task` suites remap the goal; the BDDL-derived name is
misleading.)

---

### Step 1 — Read skills and existing baseline

```bash
cat .claude/skills/iterative-debugging/skills/grasp.md
cat .claude/skills/iterative-debugging/skills/localize.md
cat .claude/skills/iterative-debugging/skills/transport.md
cat .claude/skills/iterative-debugging/skills/manipulation.md
```

**Also read the existing fix_code.py if it exists** — this is your baseline to beat and **must
be seeded as candidate_A**:
```bash
cat $TASK_DIR/evosearch_best_code.py 2>/dev/null || \
cat outputs/runs/LATEST/$BENCHMARK/$SUITE/task_$TASK_ID/fix_code.py 2>/dev/null || \
cat "$(ls -t outputs/runs/*/$BENCHMARK/$SUITE/task_$TASK_ID/fix_code.py 2>/dev/null | head -1)" 2>/dev/null || \
cat outputs/iterative_debugging/$BENCHMARK/$SUITE/task_$TASK_ID/fix_code.py 2>/dev/null || \
echo "No baseline fix_code.py found"
```

**If a baseline code is found:** Record its path in `task_analysis.md`. Seed it as candidate_A
verbatim — do not modify it.

Also read [skills/evosearch-iteration.md](skills/evosearch-iteration.md) — §8 carries the
motion-call budget, contact-task patterns, and arm-blocking recovery guidance.

---

### Step 2 — Create run directory and scene snapshot

```bash
RUN_ID=$(date +%Y%m%d_%H%M%S)
RUN_DIR=$TASK_DIR/$RUN_ID
mkdir -p $RUN_DIR
```

**Scene snapshot** (REQUIRED before writing any candidates):
```bash
CUDA_VISIBLE_DEVICES=$GPU MUJOCO_EGL_DEVICE_ID=$GPU \
.venv-libero/bin/cap-harness run \
  --benchmark $BENCHMARK --suite $SUITE --task-id $TASK_ID --seed 51 \
  --program .claude/skills/iterative-debugging/scripts/scene_snapshot.py \
  --output-root $RUN_DIR/snapshot --init-mode seeded
```

The command prints `run: <run_dir>`. Read from that run with the Read tool:
- `source/program-result.json` — authoritative `task_language`, cameras, task metadata
- `media/keyframes/` — lossless RGB of the untouched scene from every camera (wide agentview
  for layout, eye-in-hand for close-up)

To validate SAM3 prompts, copy `scene_snapshot.py` into `$RUN_DIR`, fill `PROBE_PROMPTS`, re-run,
and read the probe scores plus `media/overlays/`. Fix any weak/failing prompts before writing
candidates.

Then populate `$RUN_DIR/task_analysis.md` (§1–5 from the images):
```bash
cat > $RUN_DIR/task_analysis.md << 'EOF'
# Task Analysis: <task_name>

## 1. Object Shape
...

## 2. Grasp/Approach Strategy
...

## 3. Goal Geometry
...

## 4. Placement/Movement Strategy
...

## 5. Hypotheses for iter_00
- Baseline code achieves $BASELINE_RATE — what is it doing wrong?
- Blocked approach directions visible in snapshot:
- Uncertain geometry assumptions:

## 6. Iteration Log
EOF
```

---

### Step 3 — Write K=8 candidates for iter_00

**Always seed candidate_A from the existing fix_code.py baseline** (if it exists) — this gives
a concrete performance floor and shows where the baseline fails.

Each candidate must test a distinct hypothesis. No two candidates should fail at the same stage
for the same reason.

```bash
mkdir -p $RUN_DIR/iter_00/candidate_{A,B,C,D,E,F,G,H}
# Write candidate_A/code.py through candidate_H/code.py
# Each has a docstring: Hypothesis / Differs from prior / Expected failure if wrong
```

See [skills/evosearch-iteration.md](skills/evosearch-iteration.md) §8 for the K=8 diversity
rule and template.

---

### Step 4 — Iteration eval (seeds 51–65)

```bash
python3 .claude/skills/evosearch/scripts/evosearch_eval.py \
    --iter-dir $RUN_DIR/iter_00 \
    --benchmark $BENCHMARK --suite $SUITE --task-id $TASK_ID \
    --trial-seeds 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 \
    --sim-gpus $GPU --parallel-per-gpu 2 \
    --cap-harness .venv-libero/bin/cap-harness \
    2>&1 | tee $RUN_DIR/iter_00/eval.log
```

**Set `run_in_background=True`** on this Bash call. Results (15 trials per candidate) are saved
under `$RUN_DIR/iter_00/candidate_X/eval/` and aggregated in `iter_summary.json`.

Read leaderboard after completion:
```bash
python3 .claude/skills/evosearch/scripts/analyze_evosearch_traces.py \
    --iter-dir $RUN_DIR/iter_00 --summary-only
```

Analyze traces:
```bash
python3 .claude/skills/evosearch/scripts/analyze_evosearch_traces.py --iter-dir $RUN_DIR/iter_00
```

---

### Step 6 — Iterate

**Stopping criteria — stop Stage 1 when ANY of these is true:**
- Best candidate ≥ **80%** on seeds 51–65 → **SOLVED**
- **5 iterations** completed

**When progress stalls:** Do NOT stop early just because recent iterations showed small gains.
Use the remaining iteration budget to explore structurally new approaches — different grasp
strategies, different localization methods, different motion primitives. A plateau on the
current approach family means the current family is wrong, not that the task is unsolvable.

**Generalization rule — think eval seeds, not debug seeds:**

The 15 debug seeds are a small, potentially unrepresentative sample. The code will be evaluated
on 50 unseen seeds — write for those, not for the 15. Prefer strategies that work for
mechanistic reasons (correct object identity, robust localization, physically sound grasp
geometry) over strategies that score well by exploiting patterns specific to seeds 51–65. Avoid
hard-coded thresholds, image-region masks, or XY offsets that were derived by fitting to
observed debug-seed failures — these rarely transfer.

**Per iteration:**
1. Update `task_analysis.md` §1–5 with any new geometry from keyframes
2. Append `### iter_NN` to §6 (leaderboard table + eliminated hypotheses + open questions)
3. Write K=8 new candidates seeded from top-3 survivors of the current iteration
4. Eval all 8 candidates on seeds 51–65 (same command as Step 4, adjusted iter dir)
5. Read `analyze_evosearch_traces.py` output — watch for failed motion spans, empty
   segmentation prompts, and wall-time anomalies (blocking)

```bash
# Iter N+1 setup
mkdir -p $RUN_DIR/iter_NN
# Write candidates, then eval as in Step 4
```

Use the same `--trial-seeds 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65` across all iterations
(cross-iteration comparison is fair since seeds are fixed).

---

### Step 7 — Save best code, run Stage 2, write findings

Before Step 7a, perform the non-privileged provenance audit above on the selected candidate. Only
a candidate that passes this audit may become `evosearch_best_code.py` or proceed to Stage 2. If
it fails, preserve the evidence, mark the task BLOCKED, and report the result as quarantined.

**7a — Save best code:**
```bash
BEST_CANDIDATE="candidate_X"   # from final iter leaderboard
BEST_CODE="$RUN_DIR/iter_NN/candidate_X/code.py"

# Sanity check: Evolutionary Search best must beat fix_code.py (candidate_A = fix_code verbatim)
# on seeds 51–65. If not, fall back to fix_code.py so Stage 2 uses the stronger baseline.
python3 - "$RUN_DIR" << 'PYEOF'
import json, sys
from pathlib import Path

rdir = Path(sys.argv[1])
baseline, best_rate = 0.0, 0.0
for f in sorted(rdir.rglob("iter_summary.json")):
    for c in json.loads(f.read_text()).get("candidates", []):
        best_rate = max(best_rate, c["pass_rate"])
        if c["candidate"] == "candidate_A":
            baseline = max(baseline, c["pass_rate"])

print(f"Best Evolutionary Search: {best_rate:.0%}  (seeds 51-65)")
print(f"Baseline fix_code.py:     {baseline:.0%}  (candidate_A verbatim)")
sys.exit(0 if best_rate > baseline else 1)
PYEOF

if [ $? -ne 0 ]; then
    echo "⚠ Evolutionary Search did not beat fix_code.py — using fix_code.py as evosearch_best_code.py"
    BEST_CODE="outputs/runs/LATEST/$BENCHMARK/$SUITE/task_$TASK_ID/fix_code.py"
    if [ ! -f "$BEST_CODE" ]; then
        # LATEST may point at a newer campaign that never debugged this task;
        # fall back to the newest fix_code.py across all campaign roots.
        BEST_CODE="$(ls -t outputs/runs/*/$BENCHMARK/$SUITE/task_$TASK_ID/fix_code.py 2>/dev/null | head -1)"
    fi
    if [ ! -f "$BEST_CODE" ]; then
        BEST_CODE="outputs/iterative_debugging/$BENCHMARK/$SUITE/task_$TASK_ID/fix_code.py"
    fi
    if [ ! -f "$BEST_CODE" ]; then
        echo "ERROR: fix_code.py not found at $BEST_CODE — marking BLOCKED"
        touch $TASK_DIR/BLOCKED
        exit 0
    fi
fi

cp "$BEST_CODE" $TASK_DIR/evosearch_best_code.py
mkdir -p outputs/working_codes
cp "$BEST_CODE" "outputs/working_codes/${BENCHMARK}_${SUITE}_task_${TASK_ID}_evosearch.py"
```

If all approaches failed → mark BLOCKED and stop:
```bash
touch $TASK_DIR/BLOCKED
```
(skip Stage 2 if BLOCKED)

---

**7b — Stage 2: eval best code on seeds 1–50**

Use the shared immutable-manifest validation script — it resumes safely and records one
manifest per (code, settings, seeds) identity:

```bash
nohup python3 .claude/skills/iterative-debugging/scripts/run_validation.py \
    --benchmark $BENCHMARK --suite $SUITE --task-id $TASK_ID --gpu $GPU \
    --program $TASK_DIR/evosearch_best_code.py \
    --output-root $EVALDIR \
    --cap-harness .venv-libero/bin/cap-harness \
    --seeds $(seq 1 50) --resume \
    > /tmp/evosearch_s2_${TASKSHORT}.log 2>&1 &
echo $! > /tmp/evosearch_s2_${TASKSHORT}.pid
```

Poll every ~5 min with a short Bash call until the final `run=` line appears:
```bash
tail -3 /tmp/evosearch_s2_${TASKSHORT}.log
grep -c "^seed" /tmp/evosearch_s2_${TASKSHORT}.log
```

Repeat this poll call until the log ends with `run=<id> status=complete passes=<N>/50`. Do not
run other Bash commands between polls — just wait and re-poll. If the process dies early,
re-run the same command with `--resume` (it skips completed seeds).

Read final results from the manifest printed on the last line
(`manifest=<path>`): `passes`, `trials`, `pass_rate`.

---

**7c — Write findings.md:**
```bash
cat > $TASK_DIR/findings.md << 'EOF'
## Task: $BENCHMARK / $SUITE / task_$TASK_ID
## Baseline rate (fix loop): $BASELINE_RATE
## Best Evolutionary Search rate (seeds 51–65): <N/15> (<pct>%)
## Stage 2 (seeds 1–50): <N/50> (<pct>%)

### Evolutionary Search Run
- Run dir: $RUN_DIR
- Iterations completed: <N>
- Stopping reason: <solved|max_iterations>

### What Fixed It vs Baseline
- <key strategy change>

### SAM3 Prompts That Worked
| Object | Prompts | Notes |
|---|---|---|

### Failure Modes Eliminated
- <approach that failed + why>

### Generalizable Patterns
- <anything worth adding to skill library>

### Non-privileged API audit
- <PASS, or QUARANTINED with the forbidden dependency and all affected artifacts/results>

### Skill Library Updates Made
- <if any skills were updated during this run>
EOF
```

---

## What to Return

```
BENCHMARK: <benchmark>
SUITE: <suite>
TASK_ID: <task id>
GPU: <N>
Baseline rate: <from fix loop>

Stage 1 (seeds 51–65):
  Best candidate: <candidate_X> at iter_NN
  Best pass rate: <N>/15 (<pct>%)
  Stopping reason: <solved|max_iterations|BLOCKED>
  Iterations run: <N>
  Run dir: $TASK_DIR/<run_id>/

Stage 2 (seeds 1–50): <N>/50 (<pct>%)
Non-privileged API audit: PASS/QUARANTINED (<reason if quarantined>)

Key findings (3 bullets):
  - <strategy that worked vs baseline failure mode>
  - <SAM3 prompts / grasp parameters>
  - <any generalizable pattern for skill library>
```
```
````

## .claude/skills/evosearch/scripts/evosearch_eval.py

````text
#!/usr/bin/env python3
"""Evaluate every Evolutionary Search candidate in an iteration directory.

Runs the full candidate x seed matrix through ``cap-harness run`` (one fresh
process per episode), scheduling episodes over a pool of GPU slots
(``--sim-gpus`` x ``--parallel-per-gpu``). A seed is skipped on resume only
when an existing finalized run matches the current identity — same program
bytes (``source/program.py`` hash) and same ``init_mode``/``max_steps``/camera
settings in ``run.json`` — so editing a candidate or changing settings always
re-runs its seeds.

Layout (input):
    <iter-dir>/candidate_A/code.py     (or bare <iter-dir>/candidate_A.py,
                                        normalized into candidate_A/code.py)

Layout (output):
    <iter-dir>/candidate_X/eval/       cap-harness --output-root (immutable runs)
    <iter-dir>/candidate_X/logs/       one log per seed
    <iter-dir>/candidate_X/eval_results.json
    <iter-dir>/iter_summary.json       leaderboard across all candidates

A trial passes on ``task_success`` alone (matching the original pipeline,
where a crashed-but-completed trial still counted); crashed programs are
tracked separately in the ``errors`` count. There is no highlight re-run
stage: cap-harness already records videos, keyframes, and overlays for every
episode.
"""

# This is a standalone CLI script; progress/status is reported to stdout by design.

from __future__ import annotations

import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import os
from pathlib import Path
import queue
import re
import subprocess
import threading

DEFAULT_SEEDS = list(range(51, 66))
CANDIDATE_RE = re.compile(r"^candidate_[A-Za-z0-9]+$")


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--iter-dir", required=True, type=Path)
    parser.add_argument("--benchmark", default="libero-pro")
    parser.add_argument("--suite", required=True)
    parser.add_argument("--task-id", type=int, required=True)
    parser.add_argument("--trial-seeds", type=int, nargs="+", default=DEFAULT_SEEDS)
    parser.add_argument("--sim-gpus", type=int, nargs="+", required=True)
    parser.add_argument("--parallel-per-gpu", type=int, default=2)
    parser.add_argument("--candidates", nargs="*", help="subset of candidate names to evaluate")
    parser.add_argument("--init-mode", default="seeded", choices=("saved", "seeded"))
    parser.add_argument("--max-steps", type=int, default=1000)
    parser.add_argument("--camera-width", type=int, default=800)
    parser.add_argument("--camera-height", type=int, default=512)
    parser.add_argument(
        "--cap-harness",
        default="cap-harness",
        help="cap-harness executable (e.g. .venv-libero/bin/cap-harness)",
    )
    return parser.parse_args()


def discover_candidates(iter_dir: Path, subset: list[str] | None) -> dict[str, Path]:
    """Map candidate name -> code path, normalizing bare candidate_X.py files."""
    candidates: dict[str, Path] = {}
    for path in sorted(iter_dir.glob("candidate_*.py")):
        name = path.stem
        if not CANDIDATE_RE.match(name):
            continue
        directory = iter_dir / name
        directory.mkdir(exist_ok=True)
        target = directory / "code.py"
        source_text = path.read_text()
        # Refresh on content change so edits to the bare file are never
        # silently ignored in favor of a stale code.py.
        if not target.exists() or target.read_text() != source_text:
            target.write_text(source_text)
    for directory in sorted(iter_dir.iterdir()):
        if directory.is_dir() and CANDIDATE_RE.match(directory.name):
            code = directory / "code.py"
            if code.is_file():
                candidates[directory.name] = code
    if subset:
        missing = sorted(set(subset) - set(candidates))
        if missing:
            raise SystemExit(f"unknown candidates: {missing}")
        candidates = {name: candidates[name] for name in subset}
    if not candidates:
        raise SystemExit(f"no candidate_*/code.py found in {iter_dir}")
    return candidates


def run_matches_identity(run_dir: Path, identity: dict) -> bool:
    """True when a recorded run was produced by the same program and settings.

    Runs recorded before run.json carried ``init_mode`` never match, so stale
    pre-identity results are re-run rather than silently reused.
    """
    run_json = run_dir / "run.json"
    program = run_dir / "source" / "program.py"
    if not run_json.is_file() or not program.is_file():
        return False
    try:
        recorded = json.loads(run_json.read_text())
    except (OSError, ValueError):
        return False
    capture = recorded.get("capture", {})
    return (
        recorded.get("init_mode") == identity["init_mode"]
        and capture.get("max_steps") == identity["max_steps"]
        and capture.get("camera_width") == identity["camera_width"]
        and capture.get("camera_height") == identity["camera_height"]
        and sha256_file(program) == identity["code_sha256"]
    )


def existing_outcome(
    eval_root: Path, benchmark: str, suite: str, seed: int, identity: dict | None = None
) -> dict | None:
    """Return the newest finalized outcome for a seed matching the identity."""
    best: tuple[float, dict] | None = None
    for outcome_path in eval_root.glob(f"{benchmark}/{suite}/*/{seed:04d}/*/outcome.json"):
        if identity is not None and not run_matches_identity(outcome_path.parent, identity):
            continue
        try:
            outcome = json.loads(outcome_path.read_text())
        except (OSError, ValueError):
            continue
        stamp = outcome_path.stat().st_mtime
        if best is None or stamp > best[0]:
            outcome["_run_dir"] = str(outcome_path.parent)
            best = (stamp, outcome)
    return best[1] if best else None


def trial_record(seed: int, outcome: dict | None, exit_code: int | None) -> dict:
    if outcome is None:
        return {
            "seed": seed,
            "program_ok": False,
            "task_success": False,
            "error": True,
            "termination_reason": "missing_artifact",
            "process_exit_code": exit_code,
        }
    return {
        "seed": seed,
        "program_ok": bool(outcome.get("program_ok")),
        "task_success": bool(outcome.get("task_success")),
        "error": not bool(outcome.get("program_ok")),
        "termination_reason": outcome.get("termination_reason"),
        "cumulative_reward": outcome.get("cumulative_reward"),
        "steps_executed": outcome.get("steps_executed"),
        "run_dir": outcome.get("_run_dir"),
        "process_exit_code": exit_code,
    }


def main() -> int:
    args = parse_args()
    if args.init_mode != "saved" and args.benchmark != "libero-pro":
        raise SystemExit(
            "init_mode 'seeded' is only supported for the libero-pro benchmark; "
            "pass --init-mode saved for other benchmarks"
        )
    iter_dir = args.iter_dir.resolve()
    seeds = sorted(set(args.trial_seeds))
    candidates = discover_candidates(iter_dir, args.candidates)

    identities = {
        name: {
            "code_sha256": sha256_file(code),
            "init_mode": args.init_mode,
            "max_steps": args.max_steps,
            "camera_width": args.camera_width,
            "camera_height": args.camera_height,
        }
        for name, code in candidates.items()
    }
    jobs: list[tuple[str, Path, int]] = []
    results: dict[str, dict[int, dict]] = {name: {} for name in candidates}
    for name, code in candidates.items():
        eval_root = iter_dir / name / "eval"
        for seed in seeds:
            outcome = existing_outcome(
                eval_root, args.benchmark, args.suite, seed, identities[name]
            )
            if outcome is not None:
                results[name][seed] = trial_record(seed, outcome, None)
                print(f"{name} seed {seed:02d}: SKIP matching existing run")
            else:
                jobs.append((name, code, seed))

    slots: queue.Queue[int] = queue.Queue()
    for gpu in args.sim_gpus:
        for _ in range(args.parallel_per_gpu):
            slots.put(gpu)

    lock = threading.Lock()

    def run_job(name: str, code: Path, seed: int) -> None:
        gpu = slots.get()
        try:
            candidate_dir = iter_dir / name
            logs = candidate_dir / "logs"
            logs.mkdir(exist_ok=True)
            log_path = logs / f"seed_{seed:02d}.log"
            command = [
                args.cap_harness,
                "run",
                "--benchmark",
                args.benchmark,
                "--suite",
                args.suite,
                "--task-id",
                str(args.task_id),
                "--seed",
                str(seed),
                "--program",
                str(code),
                "--output-root",
                str(candidate_dir / "eval"),
                "--max-steps",
                str(args.max_steps),
                "--camera-width",
                str(args.camera_width),
                "--camera-height",
                str(args.camera_height),
                "--init-mode",
                args.init_mode,
            ]
            env = os.environ.copy()
            env.update(
                MUJOCO_GL="egl",
                PYOPENGL_PLATFORM="egl",
                EGL_PLATFORM="device",
                CUDA_VISIBLE_DEVICES=str(gpu),
                # EGL device enumeration ignores CUDA_VISIBLE_DEVICES, so without this MuJoCo
                # renders every episode on physical GPU 0 no matter which GPU was assigned.
                MUJOCO_EGL_DEVICE_ID=str(gpu),
                TORCH_FORCE_NO_WEIGHTS_ONLY_LOAD="1",
            )
            with log_path.open("w") as log:
                process = subprocess.run(
                    command,
                    env=env,
                    stdout=log,
                    stderr=subprocess.STDOUT,
                    text=True,
                    check=False,
                )
            outcome = existing_outcome(
                candidate_dir / "eval", args.benchmark, args.suite, seed, identities[name]
            )
            record = trial_record(seed, outcome, process.returncode)
            with lock:
                results[name][seed] = record
                print(
                    f"{name} seed {seed:02d}: task_success={record['task_success']} "
                    f"program_ok={record['program_ok']} gpu={gpu}",
                    flush=True,
                )
        finally:
            slots.put(gpu)

    # Worker pool sized to the GPU slots; run_job pulls a GPU token per job.
    with ThreadPoolExecutor(max_workers=slots.qsize() or 1) as executor:
        for future in [executor.submit(run_job, *job) for job in jobs]:
            future.result()

    summary_candidates = []
    for name, code in candidates.items():
        rows = [results[name][seed] for seed in seeds if seed in results[name]]
        # A pass is task_success alone (matching the original pipeline); the
        # errors count tracks crashed programs separately.
        passes = sum(1 for row in rows if row["task_success"])
        errors = sum(1 for row in rows if row["error"])
        rewards = [
            row["cumulative_reward"]
            for row in rows
            if isinstance(row.get("cumulative_reward"), int | float)
        ]
        candidate_summary = {
            "candidate": name,
            "code_path": str(code),
            "trials": len(rows),
            "pass_count": passes,
            "pass_rate": round(passes / len(rows), 6) if rows else 0.0,
            "mean_reward": round(sum(rewards) / len(rewards), 6) if rewards else None,
            "errors": errors,
            "trial_results": rows,
        }
        summary_candidates.append(candidate_summary)
        (iter_dir / name / "eval_results.json").write_text(
            json.dumps(candidate_summary, indent=2) + "\n"
        )

    best = max(summary_candidates, key=lambda c: (c["pass_rate"], -c["errors"]))
    summary = {
        "benchmark": args.benchmark,
        "suite": args.suite,
        "task_id": args.task_id,
        "trial_seeds": seeds,
        "init_mode": args.init_mode,
        "candidates": summary_candidates,
        "best_candidate": best["candidate"],
        "best_pass_rate": best["pass_rate"],
    }
    (iter_dir / "iter_summary.json").write_text(json.dumps(summary, indent=2) + "\n")

    print(f"\nLeaderboard ({iter_dir}):")
    for candidate in sorted(summary_candidates, key=lambda c: -c["pass_rate"]):
        print(
            f"  {candidate['candidate']:<22} {candidate['pass_rate']:.0%}  "
            f"errors={candidate['errors']}  passes={candidate['pass_count']}/{candidate['trials']}"
        )
    print(f"  Best: {summary['best_candidate']} ({summary['best_pass_rate']:.0%})")
    incomplete = any(
        len([seed for seed in seeds if seed in results[name]]) != len(seeds) for name in candidates
    )
    return 1 if incomplete else 0


if __name__ == "__main__":
    raise SystemExit(main())
````

## .claude/skills/evosearch/scripts/analyze_evosearch_traces.py

````text
#!/usr/bin/env python3
"""Post-eval analysis for an Evolutionary Search iteration directory.

Reports outcome, span-failure, segmentation, and motion signals across success
vs failure trials for each candidate, from the recorded cap-harness artifacts:
``outcome.json``, ``trace/events.jsonl`` (span_end records), and
``trace/calls/*/{input,output}.json``. Task-agnostic: signals are derived from
span names present in the trace rather than assuming a fixed call structure.

Usage:
    python3 analyze_evosearch_traces.py --iter-dir outputs/evosearch/.../iter_01
    python3 analyze_evosearch_traces.py --iter-dir ... --candidate candidate_F
    python3 analyze_evosearch_traces.py --iter-dir ... --summary-only
"""

from __future__ import annotations

import argparse
from collections import Counter
import json
from pathlib import Path

MOTION_SPANS = {
    "move_to_pose",
    "move_to_joints",
    "plan_motion",
    "execute_trajectory",
    "solve_ik",
    "step",
    "go_home",
    "move_synchronized",
    "plan_synchronized_motion",
}
GRIPPER_SPANS = {"open_gripper", "close_gripper", "set_gripper"}
SEGMENT_SPANS = {"segment_text", "segment_points"}


def load_json(path: Path) -> dict | None:
    try:
        return json.loads(path.read_text())
    except (OSError, ValueError):
        return None


def load_trials(eval_root: Path) -> list[dict]:
    """Load the newest finalized run per seed from a candidate's eval root."""
    by_seed: dict[str, tuple[float, Path, dict]] = {}
    for outcome_path in eval_root.glob("*/*/*/*/*/outcome.json"):
        outcome = load_json(outcome_path)
        if outcome is None:
            continue
        seed = outcome_path.parent.parent.name
        stamp = outcome_path.stat().st_mtime
        if seed not in by_seed or stamp > by_seed[seed][0]:
            by_seed[seed] = (stamp, outcome_path.parent, outcome)
    trials = []
    for seed in sorted(by_seed):
        _, run_dir, outcome = by_seed[seed]
        trials.append(
            {
                "seed": seed,
                "run_dir": run_dir,
                "outcome": outcome,
                "success": bool(outcome.get("task_success")),
            }
        )
    return trials


def load_spans(run_dir: Path) -> list[dict]:
    events_path = run_dir / "trace" / "events.jsonl"
    spans = []
    if not events_path.is_file():
        return spans
    for line in events_path.read_text().splitlines():
        try:
            event = json.loads(line)
        except ValueError:
            continue
        if event.get("event") == "span_end" or event.get("type") == "span_end":
            spans.append(event)
    return spans


def span_call_dirs(run_dir: Path, name: str) -> list[Path]:
    # Call dirs are named call-NNNNNN-<slug(name)>; slug maps '_' to '-'.
    return sorted((run_dir / "trace" / "calls").glob(f"call-*-{name.replace('_', '-')}*"))


def extract_signals(trial: dict) -> dict:
    run_dir = trial["run_dir"]
    outcome = trial["outcome"]
    spans = load_spans(run_dir)
    sig = {
        "seed": trial["seed"],
        "success": trial["success"],
        "termination_reason": outcome.get("termination_reason"),
        "steps_executed": outcome.get("steps_executed"),
        "wall_duration_s": outcome.get("wall_duration_s"),
        "error": outcome.get("error"),
        "failed_spans": Counter(),
        "motion_calls": 0,
        "gripper_calls": 0,
        "segment_calls": 0,
        "empty_prompts": [],
        "prompts": [],
    }
    for span in spans:
        name = str(span.get("name", ""))
        base = name.rsplit(".", maxsplit=1)[-1]
        if base in MOTION_SPANS:
            sig["motion_calls"] += 1
        if base in GRIPPER_SPANS:
            sig["gripper_calls"] += 1
        if base in SEGMENT_SPANS:
            sig["segment_calls"] += 1
        if span.get("ok") is False:
            sig["failed_spans"][base] += 1
    # Prompt-level segmentation detail from call payloads. input.json is
    # serialized as {"args": [...], "kwargs": {...}} (RunRecorder.span inputs);
    # segment_text(camera_name, text) puts the prompt in kwargs["text"] or as
    # the second positional argument.
    for call_dir in span_call_dirs(run_dir, "segment_text"):
        call_input = load_json(call_dir / "input.json") or {}
        call_output = load_json(call_dir / "output.json") or {}
        prompt = None
        if isinstance(call_input, dict):
            kwargs = call_input.get("kwargs")
            if isinstance(kwargs, dict):
                prompt = kwargs.get("text") or kwargs.get("text_prompt")
            if prompt is None:
                args_list = call_input.get("args")
                if isinstance(args_list, list):
                    strings = [value for value in args_list if isinstance(value, str)]
                    # args = [camera_name, text]; the prompt is the second string.
                    if len(strings) >= 2:
                        prompt = strings[1]
        if not isinstance(prompt, str):
            continue
        sig["prompts"].append(prompt)
        segmentations = None
        if isinstance(call_output, dict):
            segmentations = call_output.get("segmentations")
        if isinstance(segmentations, list) and not segmentations:
            sig["empty_prompts"].append(prompt)
        if call_output.get("ok") is False:
            sig["empty_prompts"].append(prompt)
    return sig


def mean(values: list[float]) -> float:
    return sum(values) / len(values) if values else 0.0


def summarize_group(signals: list[dict], label: str) -> None:
    print(f"\n  {label} ({len(signals)} trials):")
    if not signals:
        print("    (none)")
        return
    terminations = Counter(sig["termination_reason"] for sig in signals)
    print(f"    termination_reason: {dict(terminations)}")
    steps = [sig["steps_executed"] for sig in signals if sig["steps_executed"] is not None]
    if steps:
        print(f"    steps_executed:  mean={mean(steps):.0f}  min={min(steps)}  max={max(steps)}")
    walls = [sig["wall_duration_s"] for sig in signals if sig["wall_duration_s"] is not None]
    if walls:
        # 30%+ faster than the group norm often means the arm hit an obstacle early.
        print(
            f"    wall_duration_s: mean={mean(walls):.0f}  min={min(walls):.0f}  max={max(walls):.0f}"
        )
    motion = [sig["motion_calls"] for sig in signals]
    print(f"    motion spans/trial: mean={mean(motion):.1f}  max={max(motion)}")
    failed = Counter()
    for sig in signals:
        failed.update(sig["failed_spans"])
    if failed:
        print(f"    *** FAILED SPANS: {dict(failed)} ***")
    empty = Counter(prompt for sig in signals for prompt in sig["empty_prompts"])
    if empty:
        print(f"    segment_text empty/failed prompts: {dict(empty)}")
    prompts = sorted({prompt for sig in signals for prompt in sig["prompts"]})
    if prompts:
        print(f"    prompts seen: {prompts}")
    errors = [sig for sig in signals if sig["error"]]
    if errors:
        print(f"    program errors: {len(errors)} (seeds {[sig['seed'] for sig in errors]})")


def analyze_candidate(candidate_dir: Path, verbose: bool = True) -> dict | None:
    eval_root = candidate_dir / "eval"
    if not eval_root.is_dir():
        print(f"  No eval/ directory in {candidate_dir}")
        return None
    trials = load_trials(eval_root)
    if not trials:
        print(f"  No finalized runs found in {eval_root}")
        return None
    signals = [extract_signals(trial) for trial in trials]
    successes = [sig for sig in signals if sig["success"]]
    failures = [sig for sig in signals if not sig["success"]]
    pass_rate = len(successes) / len(signals)
    print(f"\n{'=' * 60}")
    print(f"Candidate: {candidate_dir.name}  —  {pass_rate:.1%} ({len(successes)}/{len(signals)})")
    if verbose:
        summarize_group(successes, "SUCCESS")
        summarize_group(failures, "FAILURE")
    return {"candidate": candidate_dir.name, "pass_rate": pass_rate, "trials": len(signals)}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--iter-dir", required=True, type=Path)
    parser.add_argument("--candidate", help="analyze a single candidate")
    parser.add_argument("--summary-only", action="store_true")
    args = parser.parse_args()

    iter_dir = args.iter_dir.resolve()
    summary = (
        json.loads((iter_dir / "iter_summary.json").read_text())
        if (iter_dir / "iter_summary.json").is_file()
        else None
    )

    if args.summary_only:
        if summary is None:
            raise SystemExit(f"no iter_summary.json in {iter_dir} — run evosearch_eval.py first")
        print(f"\nLeaderboard ({iter_dir}):")
        for candidate in sorted(summary["candidates"], key=lambda c: -c["pass_rate"]):
            print(
                f"  {candidate['candidate']:<22} {candidate['pass_rate']:.1%}  "
                f"errors={candidate['errors']}"
            )
        print(f"  Winner: {summary['best_candidate']} ({summary['best_pass_rate']:.1%})")
        return

    if args.candidate:
        analyze_candidate(iter_dir / args.candidate)
        return
    for candidate_dir in sorted(iter_dir.glob("candidate_*")):
        if candidate_dir.is_dir():
            analyze_candidate(candidate_dir)


if __name__ == "__main__":
    main()
````

## .agents/skills/cap-tool-usage/SKILL.md

````text
---
name: cap-tool-usage
description: Localize objects and compose low-level CAP MCP actions using observations, Cartesian or synchronized motion, joint targets, and single-arm gripper control.
---

# CAP Tool Usage

Follow [AGENTS.md](../../../AGENTS.md). Use the native `mcp__cap__*` interface
attached to the ASPIRE CAP session. Keep that session as the only environment and
camera owner; do not create another robot or camera runtime during a physical task.

For a plainly short-horizon task, execute the shortest dependency-ordered MCP sequence immediately.
Skip source inspection, a full planning report, and redundant checks.

## ASPIRE action contract

Native MCP schemas are authoritative. The low-level action tools are:

| Tool | Target |
| --- | --- |
| `cap_move_to_pose` | `target_pose`, with `arm="left"` or `"right"` |
| `cap_move_synchronized` | `targets={"left": pose, "right": pose}` for jointly planned motion |
| `cap_move_to_joints` | `target` containing six joint angles in radians, with `arm` |
| `cap_set_gripper` | `position` from 0 closed to 1 open, with `arm` |

An absolute pose includes `position: [x, y, z]` in metres, `frame`, and exactly one
of `rpy_deg: [roll, pitch, yaw]` or `quaternion_wxyz: [w, x, y, z]`. RPY uses degrees
and fixed-axis XYZ: `R = Rz(yaw) @ Ry(pitch) @ Rx(roll)` in the declared frame.
Returned poses use WXYZ quaternions. Read measured arm poses with `cap_get_robot_state`.

For Cartesian or synchronized pose motion with cuRobo configured, select
`strategy={"ik_solver":"mink","trajectory_planner":"curobo"}`. Never disable
collision checking to force a failed plan through. Do not use direct joint motion
as implicit IK or to bypass a failed collision-aware Cartesian plan.

For a layer turn, derive successive absolute pose targets from the measured cube
axis and EEF pose. An offset EEF needs both its position and orientation rotated
about that axis. Verify contact and actual sticker motion from returned evidence.
Use separate `cap_set_gripper` calls for intended grip changes. Prefer synchronized
motion only when both targets are grounded and neither depends on the other's feedback.

## Object-approach tool chain

Use the MCP schemas as authoritative. The expected discoverable tools are:

`cap_localize_object` → `cap_move_to_pose` → optional `observe`

`cap_localize_object` performs one-shot SAM3 plus shared RGB-D localization. `cap_move_to_pose`
performs its own IK and motion planning. Observation and localization are read-only; only action
tools actuate the robot.

Read current arm state when a target depends on the measured EEF pose. Form a
full pose from grounded object geometry and the intended grasp orientation; an
object's estimated orientation is not automatically a suitable gripper orientation.

Use the runtime's available camera names; their names and count are not fixed.
`observe` and `get_job` accept an optional `cameras` list. World-frame localization
requires a calibrated RGB-D view. Check the installed pads before applying the
cube guide's soft UMI contact guidance.

## Pose evidence

1. Discover the current tool schemas from CAP MCP; do not infer arguments from this summary.
2. When object-relative metric geometry is needed, call `cap_localize_object` in a calibrated RGB-D view. Reuse that
   result when its identity, frame, geometry, and diagnostics are valid. Repeat only after concrete
   invalid or contradictory evidence, or after motion changed the scene; do not sample twice merely
   to estimate stability. Reject unreliable estimates, not the entire task: another view or a bounded
   correction grounded in measured EEF state and visible alignment may remain feasible.
3. Refresh grounding that motion invalidated. A new localization call is needed when the next action
   depends on object geometry that fresh returned evidence does not establish.

## Shared rules

- A job receipt is not a terminal result; handle execution and completion as described in AGENTS.md.
  Process terminal status, errors, state, and images before the next dependent action.
- Use successful measured postconditions as evidence of the metric effects they actually verify.
  Continue directly when they resolve the next decision. Call `observe` when a required relation is absent,
  stale, ambiguous, or contradicted; never use it as a routine acknowledgement of successful motion.
- Action feedback includes images by default. Reuse fresh returned evidence; numeric motion
  success alone does not verify grasp, placement, or task completion.
- When IK succeeds and motion executes, large measured tracking errors near an object, the table,
  or the other gripper can indicate contact. Use returned views to distinguish obstruction from
  free-space tracking error; do not push farther or loosen tolerance to get past suspected contact.
  An IK rejection by itself is not evidence of contact.
- For a supporting arm, retain the intended hold reference across calls; do not silently replace it
  with each drifted measurement. Plan corrections from the achieved state with contact and clearance
  checked. Distinguish a changed reference from failure to track an unchanged one before attributing
  drift to hardware or declaring the task blocked.
- Perception tools acquire their own fresh observation. Do not call `observe` first unless visual
  inspection is needed to select or disambiguate the subject or target.
- Ground geometry from a fresh official observation before a metric action.
- Require evidence sufficient for the next action's precision and contact risk, not a uniformly
  precise scene model. An endpoint miss measures that attempt, not the best achievable accuracy;
  missing camera extrinsics prevent world-frame localization, not use of its RGB view for alignment.
- Prefer one collision-aware motion whose returned terminal state verifies the requested effect.
- Preserve the current gripper through metric motion unless a change is intended. Gripper commands are
  actions, not acquisition probes: use them only when the gripper-state transition is the grounded
  subgoal, and verify support before releasing a load.
- Use `cap_set_gripper` for one arm. Position `0.0` is fully closed, `1.0` is fully open,
  and intermediate values are proportional. One successful call completes the transition;
  do not repeat it when the returned gripper state already
  verifies the target.
````

## .agents/skills/manipulation-tasks/SKILL.md

````text
---
name: manipulation-tasks
description: Perform task-specific real YAM manipulation with native CAP tools. Use for solving or turning a physical Rubik's Cube, bottle-cap removal and pouring, pill insertion and bottle closure, or inverted cup nesting.
---

# Manipulation tasks

Follow [AGENTS.md](../../../AGENTS.md) and the loaded CAP operational skills.
Read the guide for the requested task:

- [Rubik's Cube](rubiks-cube.md): reconstruct the cube, execute supported layer turns, reorient, and place the solved cube. Includes the reusable solve cycle.

Read the [cube task context](../../../examples/yam_real/rubiks_cube/TASK_CONTEXT.md)
for the requested outcome and the recipe for a new scene.

Other task recipes (read only the one matching the operator's task):

- [Unscrew and pour](../../../examples/yam_real/unscrew_bottle/TASK_CONTEXT.md): stabilize the table-supported bottle, turn and regrasp the cap, verify detachment, and pour onto the table.
- [Pill insertion and bottle closure](../../../examples/yam_real/pill_in_bottle/TASK_CONTEXT.md): acquire the pill, verify entry, seat the cap, and distinguish threaded seating from unverified final tightness.
- [Inverted cup nesting](../../../examples/yam_real/cup_stacking/TASK_CONTEXT.md): count all cups, orient the opening downward, establish insertion before release, and recover without disturbing the existing stack.
````

## .agents/skills/manipulation-tasks/rubiks-cube.md

````text
# Rubik's Cube

Solve or manipulate the physical cube with native CAP tools. A layer turn holds
two layers stationary while turning the remaining outer layer. Whole-cube
reorientation changes the presentation, not the puzzle state.

## Reusable solve cycle

1. **Scan and solve once.** Ground the new cube, pick it up with a whole-cube grasp,
   and inspect six faces through supported reorientations. Record each face as a
   3×3 grid with an explicit image-to-canonical rotation. Map colors using centers,
   serialize in the solver's URFDLB convention, and validate color counts, cubie
   identities, orientation, and parity. Compute and independently apply the solution
   in a symbolic cube model before physical execution. A legal reconstruction is
   not proof that an occluded sticker was observed; resolve alternatives with views.
2. **Choose the next presentation.** Retain the solution and track a separate
   canonical-face-to-world-normal map. Whole-cube motion updates this map without
   consuming a solver move. Choose either arm as turner, preserving useful support
   and enough joint-6 travel for the next turn. Use measured configurations as seeds.
3. **Establish support, then isolate.** If the holding hand needs a new grip, first
   let the other hand support the whole cube. Release and reposition the holding
   hand onto exactly the stationary two layers. Then set the turning hand on the
   free outer layer and check the closed-contact turn gate below.
4. **Turn and verify.** Apply the turn gate below, then verify the predicted sticker
   rows and square seams before consuming the move. Small seam corrections depend
   on visible residual angle, not a fixed extra-angle recipe.
5. **Release, withdraw, reuse.** Open the turner and clear its fingers along the
   approach direction before resetting the wrist. Retain or transfer support only
   as the next presentation requires. Continue from terminal evidence without
   redundant observations or a new plan for each action.
6. **Verify and place.** Account for all six uniform faces using supported
   whole-cube rotations. Place with a horizontal side grasp that leaves the bottom
   face and table-contact path clear; verify support, release, retract, and confirm
   the cube remains upright, aligned, and solved. Home only on request.

Maintain a compact ledger: canonical face grids; face-to-world mapping; current
support/turner and measured EEF poses; closed pad coverage; verified moves and
remaining suffix; unresolved stickers/seams; and the recovery return point.

### Turn sign and wrist range

Solver clockwise is viewed from outside the named face looking inward. Derive the
signed rotation from that face's current world normal and the actual EEF axis;
do not use a fixed sign for an arm. With local EEF +Z pointing inward through the
face, +90° is clockwise from outside and −90° is prime. Confirm the small initial
turn against the predicted sticker motion. Split a half-turn if needed for wrist
range or contact verification; a wrist reset requires release and clear withdrawal.

## Cube state and plan

Track sticker colors, layer alignment, cube orientation relative to the grippers,
the supporting hand, and remaining solution moves. For a full solve, reconstruct
the six faces from current evidence, validate the state, and compute a solution.
Keep that sequence through correctly tracked reorientations; reconcile unexpected
sticker changes before continuing. Historical images are not the current cube state.

## Check each action result, then continue or correct

Before executing an action, retain its expected cube alignment, cube-to-pad
contacts, and visible sticker colors from the current state and action plan.
After each action's terminal tool return:

1. **Check alignment and colors.** Compare the returned camera evidence with the
   expected result: cube orientation, pad contacts, layer coverage, square seams,
   and the affected sticker rows. Wrist angle, gripper closure, and a tool success
   flag do not prove the expected cube state.
2. **If they match, continue immediately.** Update the verified state and execute
   the next action in the existing plan. Do not rebuild the plan, repeat sufficient
   observations, or make unnecessary adjustments.
3. **If they do not match, diagnose and correct.** Identify what changed, such as
   slip, tilt, an off-center turn, contact across a seam, or a retraction collision.
   Make a targeted adjustment and check its returned evidence before resuming.
   Reconcile unexpected colors with the actual puzzle state; revise only the
   affected remainder of the plan. Do not count an unverified turn as progress.

If a decisive relation is occluded, use the smallest useful additional camera view;
do not imagine the missing state. Before every layer rotation, the latest evidence
must establish alignment with the actual cube and secure support of the two
stationary layers. Visible tilt or lost contact requires correction before turning.
If the cube is insecure in hand, restore support with the other hand when feasible;
otherwise set it on the table and regrasp. Avoid unsupported in-air adjustments.

## Grasp and alignment

1. **Flat opposing contacts.** Match wrist orientation to the measured cube edges,
   not the image frame or a nominal horizontal pose. The closing direction is
   normal to the opposing cube faces; pad contact surfaces lie against those
   faces, with finger edges aligned to the cubie rows. Both pads have useful flat
   contact, rather than diagonal, corner-only, or fingertip-only contact.
2. **Correct layer coverage.** Support contacts span the two stationary layers
   without bridging onto the free layer. Turning contacts engage only that outer
   layer without crossing its seam. Check insertion depth as well as jaw width;
   fingers closing in front of the face do not establish a grasp.
3. **No displacement during closure.** Close while watching the edges and seams.
   The cube must not tip, slide, or acquire a layer offset. A close command or a
   gripper-width reading alone is not evidence of secure contact. More closure
   does not repair an angular mismatch.
4. **Retention and axis alignment.** After a table pickup, a short lift verifies
   cube-to-pad retention and table clearance; after an in-air transfer, check
   retention as the giver releases. Release/retract conflicting contacts before
   a lift. The turning wrist is aligned with the measured face normal and
   centered on the layer axis, or its
   motion explicitly accounts for the offset. Check both pad contacts and the
   stationary-layer seam; obtain a second view if either is occluded.

Use enough grip to retain the cube without deforming it. Imbalanced pressure or
more closure does not fix poor alignment; gripper position is not calibrated force.
The current setup uses soft UMI grippers; establish a firm, visibly retained grasp.
Ground contact depth and closing position in these pads; use the broad pad area
and check coverage after compression without bridging the seam of the free layer.

## Preferred turn setup

### Required turn gate

Before applying torque, establish all four predicates from current complementary
views: broad opposing support contacts span both stationary layers; those contacts
leave the target layer and its swept path free; turning contacts engage only the
outer layer; and the rotation axis passes through the measured face center along
its normal. Check pad coverage after compression, including insertion depth on
both sides. A reachable EEF pose, closure reading, or nominal opposing-wrist
arrangement cannot satisfy this gate. Resolve any hidden contact with another view.

For a new or adjusted contact setup, execute a small initial rotation and inspect
the returned evidence before completing the quarter-turn. Continue only if the
target layer moves independently while both stationary layers and support contacts
remain fixed. On slip, middle-layer motion, obstruction, or cube tilt, stop the turn
and diagnose the geometry. Do not complete the commanded angle or blindly reverse
it: a reverse wrist motion need not undo a slipped or wide turn. Secure the cube,
correct the implicated grip or axis, and reconcile the actual sticker state first.

After an unintended brush, drop, ambiguous turn, or support slip, mark the affected
puzzle state unknown. Resolve the affected faces, validate the reconstructed state,
and update the remaining solution before another solution move. Preserve unaffected
verified information; do not assume either that progress survived or was reversed.

The operator has found an **opposing-gripper arrangement** useful. Prefer it when
reachable. Either hand can support the two stationary layers while the other turns
the free layer. Choose roles from the current valid grasp, reachability, wrist range,
and clearance to minimize regrasping and reorientation; there is no fixed left/right
assignment or mandatory handoff from an already useful grasp.

1. **Present the target face to the turning hand.** Support the cube from the
   opposite side, securing the two stationary layers and leaving the target layer
   and its seam clear. Reorient only as needed for this arrangement.
2. **Approach and turn with the free hand.** Bring the turning hand toward the exposed
   face, with the grippers pointing toward each other. Grip just that outer layer;
   keep the supporting hand fixed and rotate about the layer's center and face normal.
   Opposite-side wrists avoid crossing around the cube, but still need finger and
   camera-housing clearance and wrist range through the intended turn.
3. **Clear, retain, reuse.** Open the turning hand and withdraw along its approach
   direction until the full fingers clear the cube before changing wrist orientation.
   This avoids catching an adjacent layer during withdrawal. Retain a useful support
   grasp and bring subsequent target faces into the same proven turning arrangement,
   rather than inventing a new contact setup for each move.

## Transport, reorientation, and contact

Plan with the held cube's full size and observed pose relative to the gripper,
not just the EEF pose. Its swept volume must clear the tabletop and the other
gripper's fingers, palm, and camera housing, except for intended pad contact.

Before whole-cube reorientation, clear the other gripper from the intended motion.
If table clearance is marginal or uncertain, **lift while preserving the current
orientation, assess clearance from the returned view, then rotate**. Do not combine
that initial clearance lift with a large orientation change. Allow a clearance margin
for the cube's lowest swept corner and the fingers along the entire trajectory,
including intermediate dips toward the table.

Table contact can lever the cube out of a secure grasp or rotate it inside the pads.
When contact causes a drop or slip, correct the path and clearance rather than
assuming insufficient grip or tightening further. Re-establish cube-to-gripper
alignment before the next face turn. Unexpected cube deflection, stalled descent,
or tracking error near the tabletop warrants checking for contact before advancing;
do not push through it. During intentional placement, stop lowering once the cube
is supported by the table.

Align the turning gripper with the cube, not merely with the supporting gripper.
If the EEF is offset from the layer axis, rotate both its position and orientation
about that axis. Verify actual layer motion and square seams, not wrist angle alone;
restore lost contact or alignment rather than forcing a jammed cube.

For placement, reject implausibly broad or inconsistent tabletop localization even
when segmentation reports success. Use a clear side view for bounded descent,
reducing step size as the gap closes. Do not inherit table height from a historical
EEF pose. Watch the cube, finger undersides, palm, and camera housing; release only
at supported contact.

### Partially shifted slice recovery

For a small, understood slice offset, retain support and use an aligned, broad
parallel grasp across the affected layers to gently square them. Do not force a
jammed or unknown state. Stop if closure causes tilt, translation, or growing
misalignment. Squaring is not a solver move; verify colors afterward.

## Adjust cube-to-gripper pose with the other hand

Use `cap_move_synchronized(targets={left: pose, right: pose})` for jointly planned
clear staging motions, such as presenting the held cube while bringing the free
hand to a separated pregrasp. Keep support-transfer steps ordered; synchronized
timing does not maintain a fixed hand-to-hand transform while both grip the cube.

Moving a securely closed holding hand moves the cube with it; this does not change
their relative pose. To recenter, deepen, or change the grasp angle:

1. The free hand approaches exposed grasp faces with finger clearance and establishes
   secure temporary support without turning a layer.
2. The original hand releases and clears its contacts, then repositions its open
   fingers around the supported cube to the desired depth, center, and orientation.
3. Regrasp and verify the new cube-to-pad alignment and retention before releasing
   the helper. Clear released fingers before transporting or reorienting the cube.

Either hand can remain the support if that avoids an unnecessary transfer back.
Do not force a grasp adjustment by twisting the cube between two closed grips.
Use table-supported regrasping when a clear, secure in-air transfer is unavailable.

## Learn from failed motion

Retain failed approaches with their arm, target orientation, other-arm arrangement,
and reported cause. An IK/planner rejection is conditional evidence, not proof that
the XYZ position is unreachable. Change the implicated orientation, clearance, or
cube presentation instead of repeating nearby targets with the same failure cause.
Endpoint failure can follow real motion; continue from the achieved pose and cube
state. Do not relax contact constraints to obtain success.

## Throughput and completion

Optimize verified face turns per attempt, not merely call frequency. Keep a compact
record of proven setups: station and pad configuration, supporting/turning roles,
cube-to-EEF offsets, grip depths and layer coverage, face-axis alignment, wrist
range, clear withdrawal paths, and the images establishing success. Reuse these
as seeds with fresh alignment checks, not universal absolute targets. A retry must
correct an observed cause; repeated nearby pose guesses without resolving grip
depth, support, or axis alignment are not useful recovery.

Optimize throughput and reduce pauses between action calls. Use `cap_move_to_pose`
or `cap_move_synchronized`, continuing the grounded sequence from each terminal result.
Reuse fresh returned images and verified contact geometry instead of repeating
settled checks or rebuilding the setup after every
move. Correct from achieved poses and observed cube-to-gripper relations, not from
commanded targets treated as measurements.

Count verified layer turns as solving progress; staging and regrasping are not
solution moves. For a full solve, verify all six faces are uniform and seams
aligned, then place the cube stably, release, and confirm it remains solved.
````

## examples/yam_real/rubiks_cube/TASK_CONTEXT.md

````text
---
task: "Solve the physical Rubik's Cube and put it down on the table."
---

# Rubik's Cube manipulation

Use the current scene and native low-level CAP tools, including
`cap_move_to_pose`, `cap_move_synchronized`, and gripper tools. Follow the
[Rubik's Cube guide](../../../.agents/skills/manipulation-tasks/rubiks-cube.md)
for grasp, layer isolation, object-state tracking, and throughput.

Current hardware: soft UMI grippers. The flexible tips provide limited support;
use broad pad contact without bridging the layer to be turned. Re-ground grasp
depth and closing position after a gripper change; rigid-gripper settings are not
a reference calibration.

The requested outcome is a solved cube: all six faces uniform, all layers aligned,
and the cube released stably on the table. A solver solution or successful robot
motion alone does not establish that outcome.

Do not stop working if the cube is not verified to be solved. The task is fully-solvable
and existing tools are good enough to solve it.

## Recipe for a new session

Read the guide's **Reusable solve cycle**.

For each reset scene:

1. Reconstruct and validate the current six-face state; compute its own solution.
   Keep canonical sticker state separate from whole-cube orientation in world.
2. Reuse reachable presentations with fresh cube-to-pad alignment. Have the helper
   support the whole cube while adjusting the other hand's two-layer support grip.
3. Verify **closed** support pads cover both stationary layers, leaving the target
   outer layer free. The turning pads must touch only that layer. Open-pad geometry
   alone is insufficient.
4. Test a new grip with a small turn, then finish only if the intended outer layer
   moves independently. Check sticker motion and seams before consuming the move.
5. Open and withdraw the turner clear before changing its angle. Continue promptly
   from achieved poses and returned images; do not redo settled observations.
6. Verify every face, place with the bottom face unobstructed, release at supported
   table contact, retract, and confirm stability. Home only when requested.

Historical XYZ, gripper positions, and placement EEF height are seeds, not a calibration for the
new cube. Derive clockwise/prime from the currently presented face normal and EEF
axis. Keep collision planning and full pose constraints; adapt rejected poses from
their reported cause rather than weakening checks.
````

## examples/yam_real/pill_in_bottle/TASK_CONTEXT.md

````text
---
task: "Put the pill into the bottle, fit its cap, and tighten the cap."
---

# Pill insertion and bottle closure

## Goal and evidence boundary

Place the pill inside an upright bottle, engage its compatible screw cap, and
leave it closed and standing on the table after both hands withdraw. Keep three
distinct predicates: **pill contained**, **cap seated/threaded**, and **cap snug**.
A level cap that remains on the rim after release is not sufficient proof of the
last predicate. This recipe supports insertion and cap seating; it does not supply
a calibrated torque or force test for final tightness.

Assume a reachable stable tabletop, a pinchable pill that fits through the mouth
in an attainable release orientation, and a conventional right-hand thread unless
the actual closure establishes otherwise. Use native CAP observation,
localization, measured robot state, full Cartesian motion, and separate gripper
commands. Typical tools are `observe`, `cap_localize_object`, `cap_get_robot_state`,
`cap_move_to_pose`, and `cap_set_gripper`; use the current MCP schemas. Poses specify
metres in a declared frame and either fixed-axis XYZ `rpy_deg` or
`quaternion_wxyz`. Preserve collision-aware planning. No policy, visual supervisor,
historical coordinates, or external task guide is needed.
Joint targets use radians. Gripper position is normalized from 0 closed to 1 open,
not measured force; determine contact from the current pads and object.

## Ground the small object and support the bottle

Distinguish the actual pill from the cap using visible appearance and location.
Inspect the localization mask: a plausible point on the wrong object is still
wrong. Transparent bottle depth can be misleading; reconcile the mouth and table
with a useful side or wrist view before approaching. Reject inconsistent bounds
instead of averaging them into an apparently precise target.

Assign one hand to the bottle and the other to the pill/cap, based on current reach
and clearance. Side-grasp the body below its shoulder with broad opposing contact,
leaving the mouth accessible. Keep the base on the table throughout insertion and
tightening. Verify that closure does not tilt or displace the bottle. Do not use an
unsupported bottle lift just to satisfy a grasp-check ritual.

The EEF is not the fingertip or object center. Ground fingertip clearance, the pill
between the fingers, the mouth center, and the cap's offset within the grasp before
precise placement. Refresh the affected relation after slip or displacement.

## Insert the pill

1. With the bottle supported, approach the pill from above, orienting the jaws to
   pinch across its narrow dimension. Descend to side contact without driving the
   fingertips into the table, then close only enough to retain the object.
2. Lift clear and verify the pill follows the fingers. Closure or an empty-looking
   patch of table alone does not establish retention.
3. Carry the pill above the bottle mouth. Align the **held pill**, not merely the
   wrist, over the aperture using a view that resolves the rim and fingers.
4. Release over the opening with fingertip clearance. Verify the pill below the
   neck or at the bottle bottom. Disappearance behind the rim is ambiguous; retain
   bottle support and resolve that relation before closing the bottle.

## Fit and thread the cap

1. Identify the cap's open side. Acquire opposing exterior sidewalls with meaningful
   pad depth, not a shallow pinch on its upper edge. Verify it lifts and stays level.
   If its opening faces the wrong way, reorient with clearance and support before
   bringing it to the bottle.
2. Bring the cap above the mouth with matching axes. Lower toward an even meeting
   of cap and rim. Use a side view for tilt; top-view overlap cannot show whether
   one edge is perched above the other. Keep fingers clear of the bottle shoulder
   and body-holding gripper.
3. For a right-hand thread, tighten clockwise **viewed from above the cap looking
   down into the bottle**. Use bounded turns about the measured bottle axis while
   preserving alignment and table support. Derive the sign from the actual axis,
   not a fixed left/right wrist sign.
4. Watch cap features turn relative to the stationary body and the cap seat down
   the neck while staying level. Accommodate observed axial descent with small
   pose changes; do not force a fixed downward stroke or equate wrist travel with
   thread engagement.
5. To regain wrist travel, leave the cap supported on the neck, open the turning
   hand, withdraw until fingers clear, reset the unloaded wrist, and regrasp the
   sidewalls. Reversing while closed can undo tightening.

Use full position-and-orientation targets, including the orbit of an offset EEF
around the cap axis. Use bounded intermediate targets rather than assuming an
endpoint tool executes an exact circular contact path. A known aligned wrist joint
may provide a bounded rotation when its range and clearance are established; do
not bypass a collision rejection with joint commands.

## Correct seating failures

- **Tilted or binding cap:** stop tightening and retain body support. If threads
  may be engaged, use controlled counterclockwise backoff to establish disengagement
  before lifting; do not pull axially against a binding thread. Recenter and reseat
  once clear. A click or successful thread reset cannot be assumed. Check the
  subsequent level seating and relative motion.
- **Cap slips in the fingers:** correct depth, angular alignment, or side contact.
  More commanded rotation does not repair a missed grasp. If dropped, reacquire
  from its new resting pose before continuing.
- **Approach stops short:** inspect measured EEF pose and the scene; errors can
  follow partial motion. A commanded height does not establish contact. Change the
  implicated approach or orientation instead of repeating an unreachable target.
- **Bottle moves:** restore stable table support and recompute cap-to-mouth
  alignment. Do not tighten using coordinates that predate that displacement.

Keep successful geometry and use returned evidence for the next ready action;
avoid repetitive observations and long planning reports at routine transitions.

## Finish honestly

Verify containment and evidence of threaded, level seating. Release and withdraw
the cap hand without disturbing the closure, then release the bottle holder and
confirm independent stability. Do not describe a merely retained cap as securely
tightened or invent a torque measurement from gripper position. If snug closure
cannot be distinguished from slipping contact or a loose cap, retain that explicit
uncertainty and continue only with a grounded, non-damaging correction or a suitable
available verification method. If the runtime has no validated way to establish
snugness, report partial completion, not a tightened-bottle success; repeated turns
do not create the missing measurement. Report what is established and what remains
unresolved. Home only when separately requested.
````

## examples/yam_real/unscrew_bottle/TASK_CONTEXT.md

````text
---
task: "Unscrew the bottle cap and pour the pill onto the table."
---

# Unscrew a bottle and pour

## Goal and scope

Remove a conventional right-hand threaded cap, place it separately, pour the pill
onto a clear tabletop patch, and leave the empty bottle upright with both grippers
clear. This recipe assumes a small rigid bottle, a compatible screw cap, and a
pill that fits through the opening. Establish a different closure's mechanism
before applying torque; do not assume a push-and-turn closure behaves the same way.

Use native CAP tools in an already configured session. `observe` supplies views,
`cap_get_robot_state` supplies measured poses, and `cap_localize_object` supplies
geometry when needed. Use `cap_move_to_pose` for full Cartesian poses and
`cap_set_gripper` for separate grip changes. Position is in metres in the declared
frame; `rpy_deg` is fixed-axis XYZ in degrees, or use `quaternion_wxyz`, not both.
Current MCP schemas are authoritative. Preserve collision-aware planning. No WAM,
visual supervisor, recorded trajectory, or preselected absolute pose is required.
Joint targets are in radians; gripper position runs from 0 closed to 1 open and is
not a calibrated force. Derive the required opening from the actual pads and object.

## Establish two useful grasps

Identify the bottle body, shoulder, mouth, cap axis, table, and clear deposition
patches. Reject a transparent-bottle localization whose mask, depth, or dimensions
conflict with the images. A visible cap or rim and a complementary side view can
resolve alignment when the clear body has poor depth. Do not substitute image
pixels for calibrated world coordinates.

Use one hand as the body holder and the other as the cap turner. Choose roles from
reach, wrist travel, and clearance; left-body/right-cap is a useful arrangement,
not a requirement.

1. Side-approach the bottle below its shoulder. Seat the body between broad opposing
   pads without obstructing the cap hand. Close firmly enough to prevent co-rotation,
   without crushing or tilting the bottle. Keep its base supported on the table;
   lifting it before unscrewing is unnecessary.
2. Approach the cap from above along the bottle axis. Grip opposing cap sidewalls,
   not just its top edge, and do not clamp the neck or shoulder. Check the full
   fingers and camera housings against the supporting hand through the intended turn.
3. Verify contacts from returned views. Gripper position is not calibrated force;
   a close command is not proof of a secure grasp. Establish a comfortable wrist
   range for the first turn instead of starting at a limit.

## Unscrew without losing progress

For a right-hand thread, counterclockwise **viewed from above the cap looking
down the bottle axis** loosens it. Derive the tool rotation from that physical
axis; neither an arm-specific joint sign nor a rotated wrist image defines it.

- Begin with a bounded engaged turn. Turns of roughly 30–60 degrees are useful
  starting segments for a small bottle when clearance and wrist travel permit;
  shorten them if contact is uncertain. Verify cap motion relative to the bottle.
- Keep the bottle stationary and table-supported. If it co-rotates, improve body
  contact before continuing. If the fingers slip over the cap, correct sidewall
  depth or alignment rather than adding more wrist rotation.
- Maintain lateral alignment while accommodating observed thread rise. Do not
  pull the bottle upward or impose an assumed pitch as a downward/upward stroke.
- Before a wrist limit, open the cap hand, withdraw until the entire finger sweep
  clears the cap and neck, reset the unloaded wrist, then reapproach the cap at its
  current height and regrasp. Never rewind while still gripping.
- If the operator specifies a minimum rotation, count only observed cap rotation
  relative to the bottle: two full turns means 720 degrees. Exclude unloaded resets,
  visible slip, and bottle co-rotation. Turn count alone does not prove detachment;
  do not keep turning a cap already confirmed free merely to satisfy a counter.

Use full absolute pose targets. If the EEF is offset from the cap axis, its position
must follow that axis as well as its orientation. Several bounded endpoints may be
needed: a pose planner does not promise a contact-preserving circular path between
arbitrary endpoints. A joint-space wrist turn is appropriate only when its axis,
joint travel, and swept clearance are established; it is not a collision bypass.

## Remove, pour, and finish

1. With evidence of unthreading, test a small axial cap lift while holding the body
   steady. Require a separated cap and exposed mouth. If the bottle follows, stop
   pulling and reassess the thread and both grasps.
2. Move the held cap clear, lower near a grounded support patch, release, and confirm
   it rests separately. Account for fingers extending below the cap before lowering.
3. Preserve the body grasp. Lift the open bottle enough to clear the table through
   its full tipping sweep, then tilt toward the deposition patch using full poses.
   Check the lowest swept bottle corner, fingers, and wrist camera, not just EEF Z.
4. A pill at the shoulder or neck is not yet poured. If wrist travel limits the
   tilt, change the reachable arm presentation while retaining support and clearance.
   Do not free XYZ to obtain an orientation or prescribe shaking as a proven remedy.
5. Once the pill is visible on the tabletop and the bottle is empty, restore the
   bottle upright, lower to supported table contact, release, and retract.

Inspect achieved state after a motion error: a failed return can follow partial
motion, and a successful return may leave the pill inside. Reuse adequate terminal
images and dispatch the next grounded action promptly. Get another view only when
it resolves a decision-critical uncertainty. If a retry is needed, change the
observed cause rather than repeating an unchanged target.

Completion requires cap separation, pill deposition, and stable released bottle
placement. Do not claim a measured number of relative turns from wrist commands
alone. If an explicitly requested minimum turn count was not established before
detachment, report that condition unverified or unmet separately from cap removal;
unloaded rotations cannot satisfy it. Home is a separate operator request, not part
of this manipulation recipe.
````

## examples/yam_real/cup_stacking/TASK_CONTEXT.md

````text
---
task: "Nest all the cups upside down into one stable stack."
---

# Inverted cup nesting

## Goal and setup

Make one freestanding nested stack of all requested cups, with every opening facing
the table. Each added cup surrounds the cup beneath it; this is not a pyramid or a
cup balanced on another cup's closed end. Count the actual cups at the start and
maintain that inventory through recovery. Do not assume a fixed count of three.

Use compatible tapered cups on a stable reachable tabletop. Identify the opening,
closed end, body axis, and orientation of each cup. Prefer an already inverted cup
as the base and add other already inverted cups before those needing inversion.
Keep the surviving stack's count and location separate from the loose-cup inventory.
If none is already inverted, invert one with the procedure below, place it opening
down on the table, and verify independent stability before using it as the base.

Use native CAP views, measured robot state, and localization when metric grounding
is needed. Act through `cap_move_to_pose`, `cap_set_gripper`, and, when useful,
`cap_move_synchronized` or `cap_move_to_joints`; their current MCP schemas are
authoritative. Full poses use metres in a declared frame and either fixed-axis XYZ
`rpy_deg` or `quaternion_wxyz`. Use separate grip commands and preserve collision
planning. This is a low-level manipulation recipe without WAM or a VLM dependency.
Joint targets use radians. Gripper position runs from 0 closed to 1 open and does
not measure gripping force; choose closure from retained, non-crushing pad contact.

## Acquire a retained body grasp

1. Choose an approach that reaches opposing **external sidewalls** without landing
   a finger on the closed end or catching the rim. Leave the wide opening clear
   enough to surround the receiving cup later. Plan for the final placement, not
   just a reachable pickup.
2. Reject a localization mask on the wrong cup or implausible depth/size. Separate
   nearby cups with a discriminative query or another useful calibrated view. Do
   not descend toward a new estimate that conflicts with visible geometry.
3. Approach with open fingers, establish side contact, close without crushing, and
   lift clear. Verify the cup follows and does not slide or tilt in the pads. A
   closure value or successful EEF motion alone is not a grasp check.
4. If the fingers catch the rim and tip the cup, withdraw and locate the cup in its
   new orientation. A sideways cup can be regrasped at its exposed body; do not
   repeat the former approach as though it were still upright.

## Invert only as needed

Leave an already inverted cup inverted. For another cup, lift first until its full
swept volume, the fingers, and the wrist camera clear the table and other arm.
Then change its orientation using reachable full poses. Confirm the closed end is
above the opening from an external view; the rotating wrist camera and commanded
wrist angle do not establish the cup's world orientation.

Do not relax translation constraints to obtain a rotation. An orientation-only
goal can move the cup down into the table and invalidate the grasp. If a full pose
is unreachable, change the staging pose, divide the rotation into reachable parts,
or use a supported handoff instead of forcing wrist limits.
Dividing a rotation alone does not restore exhausted joint travel; change the
presentation or establish support for a regrasp when additional range is needed.

For a handoff, the receiving hand approaches exposed opposing sidewalls clear of
the donor, closes, and establishes support. Only then open the donor, verify
retention, and retract it before turning the receiver. Either arm can retain the
cup; transferring it back is unnecessary if the new grasp is useful. Do not twist
a cup between two rigidly closed grips. A table-supported regrasp is an alternative
when a clear handoff is unavailable.

## Align, insert, then release

1. Re-ground the current receiver after any contact or shift. Account for the
   stack's increased height. Align the held cup's **opening center and axis**, not
   the EEF origin, above the receiving cup's closed end. Correct tilt and lateral
   offset while separated.
2. Use top and side evidence together when needed: overlap in one projection can
   hide an edge-to-edge collision. Grasp offset can require a non-nominal wrist
   orientation even when the cup itself is vertical.
3. Lower in bounded steps while watching the receiver enter the opening and the
   walls overlap around it. The receiving stack should remain stationary. A rim
   touch, tilted perch, or apparent alignment is not yet insertion.
4. If an edge catches or the stack moves, **keep the cup gripped**, stop descent,
   and unload the contact with a bounded correction. Withdraw/lift clear only while
   the receiver remains table-supported; if it follows, stop rather than lifting a
   coupled stack. Check which earlier nesting relations survived, then correct
   against the now-visible opening and current receiver position.
5. Once insertion provides visible support, open the gripper, inspect the result,
   and retract without brushing the stack. Partial opening may fully release a
   cup: it is not a safe probe for an unresolved nesting relation.
6. Update the verified count and repeat for the remaining loose cups. Reuse
   sufficient returned views; add an observation only for unresolved identity,
   axis, insertion, support, or clearance.

## Recovery and completion

A planner rejection establishes no movement by itself; an endpoint failure can
follow partial movement. Continue from measured pose and observed object state.
If a descent stops short near the stack, inspect for obstruction rather than
pushing lower or opening because the desired pose was commanded. Do not bypass
collision checks or loosen tolerances to manufacture a successful return.

After a failed release, invalidate that placement, locate the loose cup, and check
which earlier nesting relations survived. Preserve the supported stack, reacquire
the loose cup, and change the demonstrated cause of failure before retrying.

Finish when the initial inventory is fully accounted for in one inverted nested
stack and it stays standing after both grippers withdraw. Visible rims, remembered
verified insertions, and a clear final view should agree; do not infer hidden extra
cups from a generic stack silhouette. Home is separate and only performed on request.
````

## src/cap_harness/run.py

````text
"""Orchestrate one recorded Code-as-Policy episode."""

from __future__ import annotations

from dataclasses import dataclass
import os
from pathlib import Path

from .api import CapApi
from .artifacts import RunRecorder, StepLimitReached, TracedProvider, redact
from .libero.adapter import LiberoAdapter
from .libero.registry import LiberoSuiteRegistry
from .providers.curobo.client import DEFAULT_CUROBO_URL, CuRoboProvider
from .providers.graspnet.client import ContactGraspNetProvider
from .providers.pyroki.client import PyRokiProvider
from .providers.sam3.client import DEFAULT_SAM3_URL, Sam3Provider
from .registry import ToolRegistry
from .runtime import ProgramExecutionResult, ProgramExecutor

DEFAULT_MAX_STEPS = 1000

_CLOSE_AFTER_RECORDING = frozenset({"behavior"})
"""Benchmarks whose simulator must outlive artifact finalization (Isaac Sim ends the process)."""
BEHAVIOR_VIDEO_FRAME_STRIDE = 3


@dataclass(frozen=True, slots=True)
class RunOutcome:
    run_dir: Path
    program_ok: bool
    task_success: bool | None
    protocol_success: bool | None
    termination_reason: str


def run_program_with_api(
    *,
    api: CapApi,
    program_path: Path,
    extension_allowlist: frozenset[str] | None = None,
    recorder: RunRecorder | None = None,
) -> ProgramExecutionResult:
    """Execute a program against a caller-owned API without owning its environment.

    ``recorder`` is optional so a caller that owns its embodiment -- one that runs
    the program inside its own control loop -- can still get the run trace that
    `run_program` produces. Without it a failed program leaves nothing but stdout,
    and "failure_stage: perception" cannot be told apart from a provider outage.
    """
    path = Path(program_path).expanduser().resolve()
    source = path.read_text(encoding="utf-8")
    if not source.strip():
        raise ValueError("program file must contain non-empty Python source")
    registry = (
        ToolRegistry(public_extension_allowlist=extension_allowlist)
        if extension_allowlist is not None
        else ToolRegistry()
    )
    tools = api.register_tools(registry)
    if recorder is None:
        return ProgramExecutor(tools).execute_program(source)
    recorder.save_program(path)
    return ProgramExecutor(tools, recorder=recorder).execute_program(source)


def run_program(
    *,
    benchmark: str,
    suite: str,
    task_id: int,
    seed: int,
    program_path: Path,
    output_root: Path,
    max_steps: int | None = None,
    camera_width: int = 800,
    camera_height: int = 512,
    model_trace: Path | None = None,
    init_mode: str = "saved",
    flat_layout: bool = False,
    capture_videos: bool = True,
    station: str = "yam-example",
    station_config_root: Path | None = None,
    allow_motion: bool = False,
) -> RunOutcome:
    """Run an episode, using its task horizon when max_steps is not supplied."""
    if benchmark not in {"behavior", "libero-pro", "robosuite", "yam_real"}:
        raise ValueError("benchmark must be behavior, libero-pro, robosuite, or yam_real")
    if init_mode not in {"saved", "seeded"}:
        raise ValueError("init_mode must be 'saved' or 'seeded'")
    if init_mode != "saved" and benchmark != "libero-pro":
        raise ValueError("init_mode 'seeded' is only supported for the libero-pro benchmark")
    if seed < 0:
        raise ValueError("seed must be non-negative")
    if max_steps is not None and max_steps <= 0:
        raise ValueError("max_steps must be positive")
    if camera_width <= 0 or camera_height <= 0:
        raise ValueError("camera dimensions must be positive")
    source = program_path.read_text(encoding="utf-8")
    if not source.strip():
        raise ValueError("program file must contain non-empty Python source")

    if benchmark == "libero-pro":
        registry = LiberoSuiteRegistry()
        metadata = registry.resolve(suite, task_id)
        adapter_type = LiberoAdapter
        extension_allowlist = None
    elif benchmark == "behavior":
        from .behavior.adapter import BehaviorAdapter
        from .behavior.registry import BehaviorTaskRegistry
        from .registry import BEHAVIOR_PUBLIC_TOOL_NAMES

        registry = BehaviorTaskRegistry()
        metadata = registry.resolve(suite, task_id)
        adapter_type = BehaviorAdapter
        extension_allowlist = BEHAVIOR_PUBLIC_TOOL_NAMES
    elif benchmark == "yam_real":
        from .registry import YAM_REAL_PUBLIC_TOOL_NAMES
        from .yam_real.adapter import YamRealAdapter
        from .yam_real.registry import YamRealTaskRegistry

        registry = YamRealTaskRegistry()
        metadata = registry.resolve(suite, task_id)
        adapter_type = YamRealAdapter
        extension_allowlist = YAM_REAL_PUBLIC_TOOL_NAMES
    else:
        from cap_harness.registry import ROBOSUITE_PUBLIC_TOOL_NAMES
        from cap_harness.robosuite.adapter import RobosuiteAdapter
        from cap_harness.robosuite.registry import RobosuiteTaskRegistry

        registry = RobosuiteTaskRegistry()
        metadata = registry.resolve(suite, task_id)
        adapter_type = RobosuiteAdapter
        extension_allowlist = ROBOSUITE_PUBLIC_TOOL_NAMES
    if max_steps is None:
        stated = getattr(metadata, "horizon", None)
        max_steps = int(stated) if stated else DEFAULT_MAX_STEPS

    if benchmark == "behavior":
        # Motion is planned in-process on the simulator's own robot model and world geometry.
        provider_capabilities: dict[str, object] = {
            "segmentation": "sam3",
            "grasping": ("contact-graspnet",),
            "ik": ("curobo",),
            "trajectory_planning": ("interpolation", "curobo"),
            "pose_planning": ("curobo-integrated",),
        }
    else:
        provider_capabilities = {
            "segmentation": "sam3",
            "grasping": ("contact-graspnet",),
            "ik": ("mink", "curobo") if benchmark == "yam_real" else ("pyroki", "curobo"),
            "trajectory_planning": ("interpolation", "curobo"),
            "pose_planning": ("composed", "curobo-integrated"),
        }
    recorder = RunRecorder(
        output_root=output_root,
        benchmark=benchmark,
        suite=metadata.suite_name,
        task_id=metadata.task_id,
        task_name=metadata.task_name,
        seed=seed,
        max_steps=max_steps,
        camera_width=camera_width,
        camera_height=camera_height,
        init_mode=init_mode,
        flat_layout=flat_layout,
        capture_videos=capture_videos,
        providers=provider_capabilities,
        # Isaac renders at 30 Hz; every third frame keeps videos at 10 fps.
        video_frame_stride=BEHAVIOR_VIDEO_FRAME_STRIDE if benchmark == "behavior" else 1,
        step_video=benchmark != "yam_real",
    )
    adapter: object | None = None
    execution: ProgramExecutionResult | None = None
    task_success: bool | None = None
    protocol_success: bool | None = None
    protocol_evaluator: object | None = None
    protocol_saved = False
    termination_reason = "harness_error"
    adapter_closed = False
    cleanup_errors: list[str] = []

    def close_adapter() -> None:
        nonlocal adapter_closed
        if adapter is None or adapter_closed:
            return
        adapter_closed = True
        try:
            adapter.close()  # type: ignore[attr-defined]
        # Record teardown errors without discarding the episode evidence.
        except Exception as exc:
            cleanup_errors.append(f"adapter close: {type(exc).__name__}: {exc}")

    def close_before_recording() -> None:
        # Stop any episode sampler first. It writes its arrays on finalize, and
        # the run manifest hashes whatever exists when it is built -- so a
        # sampler still running here leaves files that appear after the manifest
        # is sealed, unlisted, next to an mp4 whose recorded sha256 is of a
        # partial file. Embodiments in _CLOSE_AFTER_RECORDING keep their simulator
        # alive until the artifacts are finalized: tearing Isaac down can end the
        # process before outcome.json is written.
        finish_episode = getattr(adapter, "finish_episode_recording", None)
        if callable(finish_episode):
            try:
                finish_episode()
            # Record teardown errors without discarding the episode evidence.
            except Exception as exc:
                cleanup_errors.append(f"episode recording: {type(exc).__name__}: {exc}")
        if benchmark not in _CLOSE_AFTER_RECORDING:
            close_adapter()

    def save_protocol_evidence(final_native_success: bool) -> None:
        nonlocal protocol_saved, protocol_success
        if protocol_evaluator is None or protocol_saved:
            return
        try:
            evidence = protocol_evaluator.evidence(  # type: ignore[attr-defined]
                final_native_success=final_native_success
            )
        # Record teardown errors without discarding the episode evidence.
        except Exception as exc:
            evidence = {
                "schema_version": 1,
                "task": metadata.task_name,
                "protocol_success": False,
                "checks": {},
                "witness_steps": {},
                "final_native_success": bool(final_native_success),
                "evaluator_errors": (type(exc).__name__,),
            }
        recorder.save_protocol_evidence(evidence)
        protocol_success = bool(evidence["protocol_success"])
        protocol_saved = True

    try:
        recorder.save_program(program_path)
        recorder.import_model_trace(model_trace)
        with recorder.timing.measure("setup"):
            adapter_kwargs: dict[str, object] = {
                "registry": registry,
                "run_observer": recorder,
                "camera_width": camera_width,
                "camera_height": camera_height,
                "horizon": max_steps,
            }
            if benchmark == "libero-pro":
                adapter_kwargs["init_mode"] = init_mode
            if benchmark == "yam_real":
                from .yam_real.station import build_real_station

                adapter = adapter_type(
                    build_real_station(station, config_root=station_config_root),
                    registry=registry,
                    run_observer=recorder,
                    allow_physical_motion=allow_motion,
                )
                recorder.frequency = adapter.control_frequency
            else:
                adapter = adapter_type(**adapter_kwargs)
        with recorder.timing.measure("reset"):
            adapter.reset(metadata, seed)
        # Take the embodiment's real control rate before anything is recorded:
        # RunRecorder defaults to 20 Hz, and an adapter that knows its own rate
        # exposes control_frequency. Probed after reset, not before, because an
        # adapter can only know its rate once its environment exists; frequency
        # is read only at finalization, so this ordering is safe.
        rate = getattr(adapter, "control_frequency", None)
        if rate:
            recorder.frequency = float(rate)
        if benchmark == "robosuite" and metadata.task_name in {
            "two_arm_lift",
            "two_arm_handover",
        }:
            from cap_harness.validation.evaluators.robosuite_bimanual import (
                RobosuiteBimanualProtocolEvaluator,
            )

            protocol_evaluator = RobosuiteBimanualProtocolEvaluator(
                metadata.task_name,
                adapter.native_env,
            )
            adapter.bind_protocol_evaluator(protocol_evaluator)
        elif benchmark == "behavior":
            from .validation.evaluators.behavior_pickup import BehaviorPickupWitness

            protocol_evaluator = BehaviorPickupWitness(
                metadata.task_name,
                adapter.native_env,
                target_scope=metadata.target_scope,
            )
            adapter.bind_protocol_evaluator(protocol_evaluator)
        # Service URLs are overridable so a run can point at a private, freshly
        # started service (CAP_HARNESS_SAM3_URL, CAP_HARNESS_CUROBO_URL) instead
        # of the shared stack.
        segmentation = TracedProvider(
            Sam3Provider(base_url=os.environ.get("CAP_HARNESS_SAM3_URL", DEFAULT_SAM3_URL)),
            recorder,
            "sam3",
        )
        contact_graspnet = TracedProvider(ContactGraspNetProvider(), recorder, "contact_graspnet")
        if benchmark == "behavior":
            from .contracts import MotionStrategy

            planner = TracedProvider(adapter.planner(), recorder, "curobo")  # type: ignore[attr-defined]
            api = CapApi(
                adapter,
                segmentation_provider=segmentation,
                grasp_providers={"contact-graspnet": contact_graspnet},
                ik_providers={"curobo": planner},
                trajectory_planning_providers={"curobo": planner},
                integrated_pose_planning_providers={"curobo-integrated": planner},
                default_camera="head",
                default_motion_strategy=MotionStrategy(
                    ik_solver="curobo",
                    trajectory_planner="curobo",
                    pose_planner="curobo-integrated",
                ),
                recorder=recorder,
            )
        else:
            pyroki = TracedProvider(PyRokiProvider(), recorder, "pyroki")
            curobo = TracedProvider(
                CuRoboProvider(
                    base_url=os.environ.get("CAP_HARNESS_CUROBO_URL", DEFAULT_CUROBO_URL),
                    **(
                        {"control_period_s": adapter.control_period_s}
                        if benchmark == "yam_real"
                        else {}
                    ),
                ),
                recorder,
                "curobo",
            )
            ik_providers = {"pyroki": pyroki, "curobo": curobo}
            if benchmark == "yam_real":
                from .providers.yam_kinematics import YamKinematicsIKProvider
                from .yam_real.kinematics import YamKinematics

                ik_providers = {
                    "mink": TracedProvider(
                        YamKinematicsIKProvider(YamKinematics(adapter.native_env.config.model_xml)),
                        recorder,
                        "mink",
                    ),
                    "curobo": curobo,
                }
            api = CapApi(
                adapter,
                segmentation_provider=segmentation,
                grasp_providers={"contact-graspnet": contact_graspnet},
                ik_providers=ik_providers,
                trajectory_planning_providers={"curobo": curobo},
                integrated_pose_planning_providers={"curobo-integrated": curobo},
                default_camera=adapter.native_env.config.camera.role
                if benchmark == "yam_real"
                else "agentview",
                recorder=recorder,
            )
        tools = api.register_tools(
            ToolRegistry(public_extension_allowlist=extension_allowlist)
            if extension_allowlist is not None
            else ToolRegistry()
        )
        execution = ProgramExecutor(tools, recorder=recorder).execute_program(source)
        sanitized_stdout = redact(execution.stdout)
        (recorder.root / "logs/program.stdout").write_text(str(sanitized_stdout), encoding="utf-8")
        (recorder.root / "logs/program.stderr").write_text("", encoding="utf-8")
        task_success = adapter.check_success()  # type: ignore[attr-defined]
        save_protocol_evidence(bool(task_success))
        if recorder.terminal_reason == "step_limit":
            termination_reason = "step_limit"
        elif task_success:
            termination_reason = "task_succeeded"
        elif recorder.terminated:
            termination_reason = "environment_terminated"
        elif recorder.truncated:
            termination_reason = "environment_truncated"
        elif not execution.ok:
            termination_reason = "program_error"
        else:
            termination_reason = "program_completed"
        program_ok = execution.ok and termination_reason != "step_limit"
        error = execution.error if not execution.ok else None
        close_before_recording()
        recorder.finalize(
            program_ok=program_ok,
            task_success=task_success,
            protocol_success=protocol_success,
            termination_reason=termination_reason,
            program_result=execution,
            error=error,
            cleanup_errors=tuple(cleanup_errors),
            success_observed_step=getattr(adapter, "success_observed_step", None),
        )
    except KeyboardInterrupt:
        if adapter is not None:
            try:
                task_success = adapter.check_success()  # type: ignore[attr-defined]
            # Record teardown errors without discarding the episode evidence.
            except Exception:
                task_success = None
        save_protocol_evidence(bool(task_success))
        close_before_recording()
        recorder.finalize(
            program_ok=False,
            task_success=task_success,
            protocol_success=protocol_success,
            termination_reason="user_interrupt",
            program_result=execution,
            error={"type": "KeyboardInterrupt", "message": "execution interrupted"},
            cleanup_errors=tuple(cleanup_errors),
        )
        raise
    except StepLimitReached as exc:
        # Hitting the step budget says nothing about the task: a program that
        # completed the task and kept stepping still succeeded. Ask the adapter,
        # as the interrupt branch does, instead of asserting failure.
        termination_reason = "step_limit"
        task_success = None
        if adapter is not None:
            try:
                task_success = adapter.check_success()  # type: ignore[attr-defined]
            except Exception:
                task_success = None
        save_protocol_evidence(bool(task_success))
        close_before_recording()
        recorder.finalize(
            program_ok=False,
            task_success=task_success,
            protocol_success=protocol_success,
            termination_reason=termination_reason,
            program_result=execution,
            error={"type": type(exc).__name__, "message": str(exc)},
            cleanup_errors=tuple(cleanup_errors),
            success_observed_step=getattr(adapter, "success_observed_step", None),
        )
    except Exception as exc:
        save_protocol_evidence(False)
        close_before_recording()
        recorder.close_incomplete(exc, cleanup_errors=tuple(cleanup_errors))
        raise
    finally:
        close_adapter()
    return RunOutcome(
        run_dir=recorder.root,
        program_ok=bool(execution and execution.ok and termination_reason != "step_limit"),
        task_success=task_success,
        protocol_success=protocol_success,
        termination_reason=termination_reason,
    )


__all__ = ["RunOutcome", "run_program", "run_program_with_api"]
````

## src/cap_harness/runtime.py

````text
"""Restricted generated-program execution over a ToolRegistry allowlist."""

from __future__ import annotations

import ast
from collections.abc import Callable, Mapping
import contextlib
from dataclasses import dataclass
import importlib
import io
import time
from types import MappingProxyType

import numpy as np

from cap_harness.contracts import (
    ArmCommand,
    ExecutionResult,
    GraspSet,
    LocalizationResult,
    MotionStrategy,
    PlanResult,
    PointCloud,
    Pose,
    RobotAction,
    SegmentationSet,
    StepResult,
    SynchronizedPlanResult,
    SynchronizedTrajectory,
    Trajectory,
)
from cap_harness.errors import ApiError, ErrorCode
from cap_harness.registry import ToolRegistry

ALLOWED_IMPORTS = frozenset({"math"})
"""Modules a generated program may import; everything else is injected or forbidden."""


def _restricted_import(name: str, globals=None, locals=None, fromlist=(), level=0):  # noqa: A002
    if level != 0 or name not in ALLOWED_IMPORTS:
        raise ImportError(f"import of {name!r} is not allowed in generated programs")
    return importlib.import_module(name)


_SAFE_BUILTINS = MappingProxyType(
    {
        "__import__": _restricted_import,
        "Exception": Exception,
        "ValueError": ValueError,
        "TypeError": TypeError,
        "abs": abs,
        "all": all,
        "any": any,
        "bool": bool,
        "dict": dict,
        "enumerate": enumerate,
        "float": float,
        "int": int,
        "len": len,
        "list": list,
        "max": max,
        "min": min,
        "print": print,
        "range": range,
        "reversed": reversed,
        "round": round,
        "set": set,
        "sorted": sorted,
        "str": str,
        "sum": sum,
        "tuple": tuple,
        "zip": zip,
    }
)

_SAFE_CONSTRUCTORS = MappingProxyType(
    {
        "ArmCommand": ArmCommand,
        "MotionStrategy": MotionStrategy,
        "Pose": Pose,
        "RobotAction": RobotAction,
        "SynchronizedTrajectory": SynchronizedTrajectory,
        "Trajectory": Trajectory,
    }
)

_SENSITIVE_KEYS = (
    "ground_truth",
    "groundtruth",
    "mujoco",
    "native_env",
    "object_pose",
    "privileged",
    "qpos",
    "qvel",
    "raw_observation",
    "raw_state",
    "reward",
    "sim_state",
    "success",
)


@dataclass(frozen=True, slots=True)
class CallTrace:
    """One public tool invocation without raw arguments or privileged values."""

    index: int
    tool: str
    ok: bool
    duration_s: float
    positional_count: int
    keyword_names: tuple[str, ...]
    inputs_summary: Mapping[str, object]
    outputs_summary: Mapping[str, object] | None = None
    provider: str | None = None
    frame: str | None = None
    failure_code: str | None = None
    result_type: str | None = None
    error_type: str | None = None
    error_message: str | None = None


@dataclass(frozen=True, slots=True)
class ProgramExecutionResult:
    """Result of executing one complete generated Python program."""

    ok: bool
    result: object | None
    stdout: str
    calls: tuple[CallTrace, ...]
    error: ApiError | None = None

    @property
    def trace(self) -> tuple[CallTrace, ...]:
        return self.calls


class _ToolNamespace:
    __slots__ = ("_entries",)

    def __init__(self, entries: Mapping[str, object]) -> None:
        object.__setattr__(self, "_entries", MappingProxyType(dict(entries)))

    def __getattr__(self, name: str) -> object:
        try:
            return self._entries[name]
        except KeyError as exc:
            raise AttributeError(name) from exc

    def __setattr__(self, name: str, value: object) -> None:
        del name, value
        raise AttributeError("tool namespaces are immutable")

    def __repr__(self) -> str:
        return "<allowlisted tool namespace>"


class _ProgramValidator(ast.NodeVisitor):
    _forbidden_nodes = (
        ast.AsyncFunctionDef,
        ast.Await,
        ast.ClassDef,
        ast.Delete,
        ast.Global,
        ast.ImportFrom,
        ast.Nonlocal,
        ast.With,
    )
    # ``ast.Lambda`` is deliberately absent. ``ast.FunctionDef`` is allowed, so a
    # lambda grants nothing a two-line ``def`` did not already grant, and the
    # name and attribute guards below recurse into its body either way. Banning
    # it only pushed ordinary code -- a sort key, say -- into clumsier shapes.

    def generic_visit(self, node: ast.AST) -> None:
        if isinstance(node, self._forbidden_nodes):
            # Preserve the invalid-data ValueError contract.
            raise ValueError(f"{type(node).__name__} is not allowed in generated programs")
        super().generic_visit(node)

    def visit_Import(self, node: ast.Import) -> None:
        # ``import math`` is the one import a program may write; it grants nothing the
        # sandbox does not already allow and spares programs hand-rolled trigonometry.
        for alias in node.names:
            if alias.name not in ALLOWED_IMPORTS or alias.asname is not None:
                raise ValueError(
                    f"Import of {alias.name!r} is not allowed; only {sorted(ALLOWED_IMPORTS)} "
                    "may be imported, without aliasing"
                )
        self.generic_visit(node)

    def visit_Attribute(self, node: ast.Attribute) -> None:
        if node.attr.startswith("_"):
            raise ValueError("private and dunder attribute access is not allowed")
        self.generic_visit(node)

    def visit_Name(self, node: ast.Name) -> None:
        if node.id.startswith("_"):
            raise ValueError("private and dunder names are not allowed")
        self.generic_visit(node)


class ProgramExecutor:
    """Execute code against wrapped public tools, separately from robot ``step``."""

    def __init__(self, registry: ToolRegistry, *, recorder: object | None = None) -> None:
        if not isinstance(registry, ToolRegistry):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("registry must be a ToolRegistry")
        self._registry = registry
        self._recorder = recorder
        self._calls: list[CallTrace] = []

    def public_namespace(self) -> Mapping[str, object]:
        """Build a fresh hierarchical namespace from public registry entries."""
        root: dict[str, object] = {}
        branches: dict[tuple[str, ...], dict[str, object]] = {(): root}
        for spec in self._registry.all_specs(public_only=True):
            parts = tuple(spec.name.split("."))
            parent_path = parts[:-1]
            for depth in range(1, len(parts)):
                path = parts[:depth]
                branches.setdefault(path, {})
            branches[parent_path][parts[-1]] = self._wrapped_tool(spec.name, spec.function)

        for path in sorted(branches, key=len, reverse=True):
            if not path:
                continue
            parent = branches[path[:-1]]
            parent[path[-1]] = _ToolNamespace(branches[path])
        return MappingProxyType(root)

    def execute_program(self, code: str) -> ProgramExecutionResult:
        """Execute one complete program; this never performs an implicit robot step."""
        self._calls = []
        if not isinstance(code, str) or not code.strip():
            return self._failure(ErrorCode.INVALID_REQUEST, "code must be a non-empty string")
        try:
            tree = ast.parse(code, mode="exec")
            _ProgramValidator().visit(tree)
            compiled = compile(tree, "<generated-program>", "exec")
        except (SyntaxError, ValueError) as exc:
            return self._failure(
                ErrorCode.INVALID_REQUEST,
                f"program rejected: {exc}",
            )

        environment: dict[str, object] = {
            "__builtins__": _SAFE_BUILTINS,
            **_SAFE_CONSTRUCTORS,
            **self.public_namespace(),
        }
        output = io.StringIO()
        try:
            with contextlib.redirect_stdout(output):
                # Execute AST-validated programs; process isolation is still required for untrusted code.
                exec(compiled, environment, environment)
            result = _public_value(environment.get("result"))
        # Report generated-program failures as unsuccessful execution results.
        except Exception as exc:
            return ProgramExecutionResult(
                ok=False,
                result=None,
                stdout=output.getvalue(),
                calls=tuple(self._calls),
                error=ApiError(
                    code=ErrorCode.EXECUTION_FAILED,
                    message=f"program execution failed: {type(exc).__name__}: {exc}",
                    details={"exception_type": type(exc).__name__},
                ),
            )
        return ProgramExecutionResult(
            ok=True,
            result=result,
            stdout=output.getvalue(),
            calls=tuple(self._calls),
        )

    def _wrapped_tool(self, name: str, function: Callable[..., object]) -> Callable[..., object]:
        def invoke(*args: object, **kwargs: object) -> object:
            if self._recorder is not None:
                return self._recorded_tool_call(name, function, args, kwargs)
            return self._invoke_tool(name, function, args, kwargs)

        return invoke

    def _recorded_tool_call(
        self,
        name: str,
        function: Callable[..., object],
        args: tuple[object, ...],
        kwargs: Mapping[str, object],
    ) -> object:
        motion = name in {
            "step",
            "execute_trajectory",
            "set_gripper",
            "set_grippers",
            "move_to_joints",
            "move_to_pose",
            "move_synchronized",
            "open_gripper",
            "close_gripper",
            "go_home",
        }
        if motion:
            self._recorder.keyframe(f"before-{name}")  # type: ignore[attr-defined]
        with self._recorder.span(  # type: ignore[attr-defined]
            name,
            category="program",
            inputs={"args": args, "kwargs": kwargs},
        ) as span:
            result = self._invoke_tool(name, function, args, kwargs)
            ok = getattr(result, "ok", True)
            span.output(result, ok=ok if type(ok) is bool else True)
        if motion:
            self._recorder.keyframe(f"after-{name}")  # type: ignore[attr-defined]
        return result

    def _invoke_tool(
        self,
        name: str,
        function: Callable[..., object],
        args: tuple[object, ...],
        kwargs: Mapping[str, object],
    ) -> object:
        started = time.perf_counter()
        index = len(self._calls)
        inputs_summary = MappingProxyType(
            {
                "positional": tuple(_value_summary(item) for item in args),
                "keywords": MappingProxyType(
                    {key: _value_summary(value) for key, value in sorted(kwargs.items())}
                ),
            }
        )
        try:
            result = function(*args, **kwargs)
        except Exception as exc:
            error = getattr(exc, "error", None)
            self._calls.append(
                CallTrace(
                    index=index,
                    tool=name,
                    ok=False,
                    duration_s=time.perf_counter() - started,
                    positional_count=len(args),
                    keyword_names=tuple(sorted(kwargs)),
                    inputs_summary=inputs_summary,
                    failure_code=(error.code.value if isinstance(error, ApiError) else None),
                    error_type=type(exc).__name__,
                    error_message=str(exc)[:256],
                )
            )
            raise
        public_result = _public_value(result)
        provider = _result_provider(public_result)
        frame = _result_frame(public_result)
        failure_code = _result_failure_code(public_result)
        call_ok = getattr(public_result, "ok", True)
        if type(call_ok) is not bool:
            call_ok = True
        self._calls.append(
            CallTrace(
                index=index,
                tool=name,
                ok=call_ok,
                duration_s=time.perf_counter() - started,
                positional_count=len(args),
                keyword_names=tuple(sorted(kwargs)),
                inputs_summary=inputs_summary,
                outputs_summary=_value_summary(public_result),
                provider=provider,
                frame=frame,
                failure_code=failure_code,
                result_type=type(public_result).__name__,
            )
        )
        return public_result

    def _failure(self, code: ErrorCode, message: str) -> ProgramExecutionResult:
        return ProgramExecutionResult(
            ok=False,
            result=None,
            stdout="",
            calls=tuple(self._calls),
            error=ApiError(code=code, message=message),
        )


def _public_value(value: object) -> object:
    if isinstance(value, StepResult):
        return value.public_view()
    if isinstance(value, ExecutionResult):
        return value.public_view()
    if isinstance(value, Mapping):
        return MappingProxyType(
            {
                key: _public_value(item)
                for key, item in value.items()
                if isinstance(key, str) and not any(term in key.lower() for term in _SENSITIVE_KEYS)
            }
        )
    if isinstance(value, list):
        return tuple(_public_value(item) for item in value)
    if isinstance(value, tuple):
        return tuple(_public_value(item) for item in value)
    return value


def _value_summary(value: object) -> Mapping[str, object]:
    """Summarize values without retaining image, mask, depth, or joint contents."""
    summary: dict[str, object] = {"type": type(value).__name__}
    if value is None or isinstance(value, bool | int | float):
        summary["value"] = value
    elif isinstance(value, str):
        summary["length"] = len(value)
    elif isinstance(value, np.ndarray):
        summary.update(shape=tuple(value.shape), dtype=str(value.dtype))
    elif isinstance(value, Pose):
        summary["frame"] = value.frame
    elif isinstance(value, MotionStrategy):
        summary.update(
            ik_solver=value.ik_solver,
            trajectory_planner=value.trajectory_planner,
            pose_planner=value.pose_planner,
        )
    elif isinstance(value, ArmCommand):
        summary.update(mode=value.mode, has_gripper=value.gripper_position is not None)
    elif isinstance(value, RobotAction):
        summary["arms"] = tuple(sorted(value.arms))
    elif isinstance(value, Trajectory):
        summary.update(
            arm=value.arm,
            waypoint_count=len(value.joint_positions),
            planner=value.planner,
            collision_aware=value.collision_aware,
        )
    elif isinstance(value, SynchronizedTrajectory):
        summary.update(
            arms=tuple(sorted(value.joint_positions)),
            waypoint_count=value.waypoint_count,
            planner=value.planner,
            collision_aware=value.collision_aware,
        )
    elif isinstance(value, PointCloud):
        summary.update(frame=value.frame, point_count=len(value.points))
    elif isinstance(value, SegmentationSet):
        summary.update(ok=value.ok, count=len(value.segmentations))
        if value.segmentations:
            summary["frame"] = value.segmentations[0].frame
    elif isinstance(value, GraspSet):
        summary.update(ok=value.ok, count=len(value.grasps))
        if value.grasps:
            summary["frame"] = value.grasps[0].frame
    elif isinstance(value, LocalizationResult):
        summary["ok"] = value.ok
        if value.geometry is not None:
            summary["frame"] = value.geometry.frame
    elif isinstance(value, PlanResult):
        summary["ok"] = value.ok
        if value.trajectory is not None:
            summary["waypoint_count"] = len(value.trajectory.joint_positions)
    elif isinstance(value, SynchronizedPlanResult):
        summary["ok"] = value.ok
        if value.trajectory is not None:
            summary.update(
                arms=tuple(sorted(value.trajectory.joint_positions)),
                waypoint_count=value.trajectory.waypoint_count,
            )
    elif isinstance(value, StepResult):
        summary.update(ok=value.ok, terminated=value.terminated, truncated=value.truncated)
    elif isinstance(value, ExecutionResult):
        summary.update(
            ok=value.ok,
            steps_executed=value.steps_executed,
            terminated=value.terminated,
            truncated=value.truncated,
            status=value.status.value,
            final_errors=dict(value.final_errors),
        )
    elif isinstance(value, Mapping):
        summary["keys"] = tuple(
            sorted(
                key
                for key in value
                if isinstance(key, str) and not any(term in key.lower() for term in _SENSITIVE_KEYS)
            )
        )
    elif isinstance(value, list | tuple | set | frozenset):
        summary["length"] = len(value)
        summary["item_types"] = tuple(sorted({type(item).__name__ for item in value}))
    else:
        frame = getattr(value, "frame", None)
        if isinstance(frame, str):
            summary["frame"] = frame
        ok = getattr(value, "ok", None)
        if type(ok) is bool:
            summary["ok"] = ok
    return MappingProxyType(summary)


def _result_provider(value: object) -> str | None:
    diagnostics = getattr(value, "diagnostics", None)
    if isinstance(diagnostics, Mapping):
        provider = diagnostics.get("provider")
        if isinstance(provider, str):
            return provider
    return None


def _result_frame(value: object) -> str | None:
    frame = getattr(value, "frame", None)
    if isinstance(frame, str):
        return frame
    if isinstance(value, SegmentationSet) and value.segmentations:
        return value.segmentations[0].frame
    if isinstance(value, GraspSet) and value.grasps:
        return value.grasps[0].frame
    if isinstance(value, LocalizationResult) and value.geometry is not None:
        return value.geometry.frame
    if isinstance(value, PointCloud):
        return value.frame
    return None


def _result_failure_code(value: object) -> str | None:
    error = getattr(value, "error", None)
    return error.code.value if isinstance(error, ApiError) else None


ProgramResult = ProgramExecutionResult

__all__ = ["CallTrace", "ProgramExecutionResult", "ProgramExecutor", "ProgramResult"]
````

## src/cap_harness/registry.py

````text
"""Allowlisted registry for APIs exposed to generated programs."""

from __future__ import annotations

from collections.abc import Callable, Iterable, Iterator, Mapping
from dataclasses import dataclass
import inspect
import re
from types import MappingProxyType

SHARED_PUBLIC_TOOL_NAMES = frozenset(
    {
        "close_gripper",
        "crop_point_cloud",
        "estimate_geometry",
        "execute_trajectory",
        "generate_grasps",
        "get_observation",
        "get_robot_state",
        "get_task_context",
        "go_home",
        "localize_object",
        "mask_to_point_cloud",
        "move_to_joints",
        "move_to_pose",
        "move_synchronized",
        "open_gripper",
        "plan_motion",
        "plan_synchronized_motion",
        "segment_points",
        "segment_text",
        "select_grasp",
        "set_gripper",
        "set_grippers",
        "solve_ik",
        "step",
    }
)
"""Shared APIs that may be made public without an embodiment prefix."""

LIBERO_PUBLIC_TOOL_NAMES = frozenset(
    {
        "libero.get_controller_metadata",
        "libero.get_task_metadata",
    }
)
"""Nonprivileged LIBERO metadata extensions approved for V1."""

DEFAULT_LIBERO_PUBLIC_ALLOWLIST = LIBERO_PUBLIC_TOOL_NAMES

ROBOSUITE_PUBLIC_TOOL_NAMES = frozenset(
    {
        "robosuite.get_controller_metadata",
        "robosuite.get_task_metadata",
    }
)
"""Nonprivileged Robosuite metadata extensions."""

BEHAVIOR_PUBLIC_TOOL_NAMES = frozenset(
    {
        "behavior.get_base_pose",
        "behavior.get_controller_metadata",
        "behavior.get_task_metadata",
        "behavior.move_torso",
        "behavior.navigate_to_pose",
        "behavior.plan_approach_pose",
        "behavior.base_pose_is_free",
        "behavior.plan_standoff_pose",
        "behavior.reset_torso",
    }
)
"""Nonprivileged BEHAVIOR-1K (R1 Pro) metadata, base, torso and standoff-geometry extensions."""

YAM_REAL_PUBLIC_TOOL_NAMES = frozenset(
    {"yam_real.get_task_metadata", "yam_real.get_controller_metadata"}
)

_APPROVED_EMBODIMENT_PREFIXES = (
    "behavior.",
    "yam_real.",
    "libero.",
    "robosuite.",
)

_NAME_PATTERN = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*$")
_MEMORY_ADDRESS_PATTERN = re.compile(r"0x[0-9A-Fa-f]+")
_PRIVILEGED_EXTENSION_TERMS = (
    "ground_truth",
    "groundtruth",
    "mujoco",
    "object_pose",
    "privileged",
    "qpos",
    "qvel",
    "raw_observation",
    "raw_state",
    "reward",
    "sim_state",
    "success",
)


def _text(value: object, name: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


def _tool_name(value: object, name: str = "name") -> str:
    result = _text(value, name)
    if _NAME_PATTERN.fullmatch(result) is None:
        raise ValueError(f"{name} must be a dotted Python identifier")
    return result


def _is_privileged_extension_name(name: str) -> bool:
    normalized = name.lower()
    return any(term in normalized for term in _PRIVILEGED_EXTENSION_TERMS)


def _stable_signature(signature: inspect.Signature) -> str:
    """Remove process-specific addresses from otherwise stable signature text."""
    return _MEMORY_ADDRESS_PATTERN.sub("0xADDR", str(signature))


@dataclass(frozen=True, slots=True)
class ToolSpec:
    """One registered callable and the metadata used to expose and document it."""

    name: str
    function: Callable[..., object]
    layer: str
    capability: str
    public: bool
    signature: inspect.Signature
    docstring: str

    @property
    def func(self) -> Callable[..., object]:
        """Short alias for integrations that refer to a registered function."""
        return self.function

    @property
    def documented_signature(self) -> str:
        return f"{self.name}{_stable_signature(self.signature)}"


class ToolRegistry:
    """Register runtime tools while strictly constraining the public namespace."""

    def __init__(
        self,
        *,
        shared_public_names: Iterable[str] = SHARED_PUBLIC_TOOL_NAMES,
        libero_public_allowlist: Iterable[str] | None = None,
        public_extension_allowlist: Iterable[str] | None = None,
    ) -> None:
        if libero_public_allowlist is not None and public_extension_allowlist is not None:
            raise ValueError(
                "pass only one of libero_public_allowlist and public_extension_allowlist"
            )
        shared = frozenset(_tool_name(name, "shared public name") for name in shared_public_names)
        if any("." in name for name in shared):
            raise ValueError("shared public names must be unqualified identifiers")

        requested_extensions = (
            public_extension_allowlist
            if public_extension_allowlist is not None
            else libero_public_allowlist
        )
        if requested_extensions is None:
            requested_extensions = LIBERO_PUBLIC_TOOL_NAMES
        extensions = frozenset(
            _tool_name(name, "public extension name") for name in requested_extensions
        )
        for name in extensions:
            if not name.startswith(_APPROVED_EMBODIMENT_PREFIXES):
                raise ValueError("public extension names must begin with an approved embodiment")
            if _is_privileged_extension_name(name):
                raise ValueError(f"privileged extension cannot be public: {name!r}")

        self._shared_public_names = shared
        self._public_extension_allowlist = extensions
        self._specs: dict[str, ToolSpec] = {}

    @property
    def shared_public_names(self) -> frozenset[str]:
        return self._shared_public_names

    @property
    def public_extension_allowlist(self) -> frozenset[str]:
        return self._public_extension_allowlist

    def register(
        self,
        function: Callable[..., object] | None = None,
        *,
        name: str | None = None,
        public_name: str | None = None,
        layer: str,
        capability: str,
        public: bool = False,
    ) -> ToolSpec | Callable[[Callable[..., object]], Callable[..., object]]:
        """Register a callable directly or return a registration decorator.

        ``public_name`` is accepted as an explicit alias for ``name``.  Direct
        registration returns the resulting :class:`ToolSpec`; decorator use
        returns the original function after registering it.
        """
        if name is not None and public_name is not None:
            raise ValueError("pass only one of name and public_name")
        resolved_name = public_name if public_name is not None else name

        if function is None:
            if resolved_name is None:
                raise ValueError("decorator registration requires an explicit name")

            def decorator(target: Callable[..., object]) -> Callable[..., object]:
                self._register(
                    target,
                    name=resolved_name,
                    layer=layer,
                    capability=capability,
                    public=public,
                )
                return target

            return decorator

        if not callable(function):
            raise ValueError("function must be callable")
        if resolved_name is None:
            resolved_name = getattr(function, "__name__", None)
        return self._register(
            function,
            name=resolved_name,
            layer=layer,
            capability=capability,
            public=public,
        )

    def add(
        self,
        name: str,
        function: Callable[..., object],
        *,
        layer: str,
        capability: str,
        public: bool = False,
    ) -> ToolSpec:
        """Name-first registration form for callers assembling tools dynamically."""
        return self._register(
            function,
            name=name,
            layer=layer,
            capability=capability,
            public=public,
        )

    def _register(
        self,
        function: Callable[..., object],
        *,
        name: object,
        layer: object,
        capability: object,
        public: object,
    ) -> ToolSpec:
        if not callable(function):
            raise ValueError("function must be callable")
        normalized_name = _tool_name(name)
        normalized_layer = _text(layer, "layer")
        normalized_capability = _text(capability, "capability")
        if type(public) is not bool:
            raise ValueError("public must be a bool")
        if normalized_name in self._specs:
            raise ValueError(f"tool already registered: {normalized_name!r}")
        if public:
            self._validate_public_name(normalized_name)
        try:
            signature = inspect.signature(function)
        except (TypeError, ValueError) as exc:
            raise ValueError(f"cannot inspect signature for tool {normalized_name!r}") from exc
        docstring = inspect.cleandoc(inspect.getdoc(function) or "")
        spec = ToolSpec(
            name=normalized_name,
            function=function,
            layer=normalized_layer,
            capability=normalized_capability,
            public=public,
            signature=signature,
            docstring=docstring,
        )
        self._specs[normalized_name] = spec
        return spec

    def _validate_public_name(self, name: str) -> None:
        if "." not in name:
            if name not in self._shared_public_names:
                raise ValueError(f"unallowlisted shared public tool: {name!r}")
            return
        if not name.startswith(_APPROVED_EMBODIMENT_PREFIXES):
            raise ValueError("public extensions must begin with an approved embodiment")
        if name not in self._public_extension_allowlist:
            raise ValueError(f"unallowlisted public extension: {name!r}")
        if _is_privileged_extension_name(name):
            raise ValueError(f"privileged extension cannot be public: {name!r}")

    def get_spec(self, name: str) -> ToolSpec:
        """Return registration metadata or raise ``KeyError``."""
        return self._specs[name]

    def get(self, name: str) -> Callable[..., object]:
        """Resolve a registered callable or raise ``KeyError``."""
        return self.get_spec(name).function

    def all_specs(self, *, public_only: bool = False) -> tuple[ToolSpec, ...]:
        """Return specs in deterministic public-name order."""
        specs = (spec for spec in self._specs.values() if not public_only or spec.public)
        return tuple(sorted(specs, key=lambda spec: spec.name))

    def public_tools(self) -> Mapping[str, Callable[..., object]]:
        """Return a read-only, sorted generated-program namespace."""
        return MappingProxyType(
            {spec.name: spec.function for spec in self.all_specs(public_only=True)}
        )

    def public_namespace(self) -> Mapping[str, Callable[..., object]]:
        """Alias emphasizing that the mapping is suitable for code exposure."""
        return self.public_tools()

    def render_docs(self, *, public_only: bool = True) -> str:
        """Generate stable Markdown from registered signatures and docstrings."""
        specs = self.all_specs(public_only=public_only)
        lines = ["# Tool API"]
        for spec in specs:
            lines.extend(
                (
                    "",
                    f"## `{spec.documented_signature}`",
                    f"Layer: `{spec.layer}`",
                    f"Capability: `{spec.capability}`",
                    "",
                    spec.docstring or "No documentation provided.",
                )
            )
        return "\n".join(lines).rstrip() + "\n"

    def documentation(self, *, public_only: bool = True) -> str:
        """Alias for :meth:`render_docs`."""
        return self.render_docs(public_only=public_only)

    def __contains__(self, name: object) -> bool:
        return name in self._specs

    def __len__(self) -> int:
        return len(self._specs)

    def __iter__(self) -> Iterator[str]:
        return iter(sorted(self._specs))

    def __getitem__(self, name: str) -> Callable[..., object]:
        return self.get(name)


__all__ = [
    "BEHAVIOR_PUBLIC_TOOL_NAMES",
    "DEFAULT_LIBERO_PUBLIC_ALLOWLIST",
    "LIBERO_PUBLIC_TOOL_NAMES",
    "ROBOSUITE_PUBLIC_TOOL_NAMES",
    "SHARED_PUBLIC_TOOL_NAMES",
    "YAM_REAL_PUBLIC_TOOL_NAMES",
    "ToolRegistry",
    "ToolSpec",
]
````

## src/cap_harness/contracts.py

````text
"""Validated, frame-explicit dataclasses shared by CaP harness components."""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from dataclasses import dataclass, field, replace
from enum import Enum
from types import MappingProxyType

import numpy as np

from cap_harness.errors import ApiError, ErrorCode

DEFAULT_EMBODIMENT = "robosuite"
JOINT_DIMENSIONS: Mapping[str, int] = MappingProxyType(
    {
        "behavior": 7,
        "libero": 7,
        "robosuite": 7,
        "yam_real": 6,
    }
)
SUPPORTED_JOINT_DIMENSIONS = frozenset(JOINT_DIMENSIONS.values())
JOINT_DIMENSION = JOINT_DIMENSIONS[DEFAULT_EMBODIMENT]
DEFAULT_JOINT_NAMES = tuple(f"joint_{index}" for index in range(JOINT_DIMENSION))


def _non_empty_string(value: object, name: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} must be a non-empty string")
    return value.strip()


def _joint_dimension(embodiment: object) -> int:
    normalized = _non_empty_string(embodiment, "embodiment")
    try:
        return JOINT_DIMENSIONS[normalized]
    except KeyError as exc:
        supported = ", ".join(sorted(JOINT_DIMENSIONS))
        raise ValueError(
            f"unsupported embodiment {normalized!r}; expected one of: {supported}"
        ) from exc


def _bool(value: object, name: str) -> bool:
    if type(value) is not bool:
        raise ValueError(f"{name} must be a bool")
    return value


def _finite_float(
    value: object,
    name: str,
    *,
    minimum: float | None = None,
    maximum: float | None = None,
    strict_minimum: bool = False,
) -> float:
    if isinstance(value, bool | np.bool_):
        # Preserve the invalid-data ValueError contract.
        raise ValueError(f"{name} must be a finite number")
    try:
        result = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a finite number") from exc
    if not np.isfinite(result):
        raise ValueError(f"{name} must be finite")
    if minimum is not None:
        invalid = result <= minimum if strict_minimum else result < minimum
        if invalid:
            operator = ">" if strict_minimum else ">="
            raise ValueError(f"{name} must be {operator} {minimum}")
    if maximum is not None and result > maximum:
        raise ValueError(f"{name} must be <= {maximum}")
    return result


def _optional_timestamp(value: object, name: str = "timestamp_s") -> float | None:
    if value is None:
        return None
    return _finite_float(value, name, minimum=0.0)


def _array(
    value: object,
    name: str,
    *,
    shape: tuple[int | None, ...],
    dtype: np.dtype[object] | type[object] | None = np.float64,
    finite: bool = True,
) -> np.ndarray:
    try:
        result = np.asarray(value, dtype=dtype)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a numeric array") from exc
    if result.ndim != len(shape) or any(
        expected is not None and actual != expected
        for actual, expected in zip(result.shape, shape, strict=False)
    ):
        expected_shape = tuple("*" if item is None else item for item in shape)
        raise ValueError(f"{name} must have shape {expected_shape}, got {result.shape}")
    if finite:
        try:
            all_finite = bool(np.all(np.isfinite(result)))
        except TypeError as exc:
            raise ValueError(f"{name} must be numeric") from exc
        if not all_finite:
            raise ValueError(f"{name} must contain only finite values")
    result = np.array(result, copy=True, order="C")
    result.setflags(write=False)
    return result


def _string_tuple(value: Sequence[str], name: str, *, length: int | None = None) -> tuple[str, ...]:
    if isinstance(value, str | bytes) or not isinstance(value, Sequence):
        # Preserve the invalid-data ValueError contract.
        raise ValueError(f"{name} must be a sequence of strings")
    result = tuple(_non_empty_string(item, f"{name} item") for item in value)
    if length is not None and len(result) != length:
        raise ValueError(f"{name} must contain exactly {length} entries")
    if len(set(result)) != len(result):
        raise ValueError(f"{name} entries must be unique")
    return result


def _mapping(
    value: Mapping[str, object],
    name: str,
    *,
    allow_empty: bool = True,
) -> Mapping[str, object]:
    if not isinstance(value, Mapping):
        # Preserve the invalid-data ValueError contract.
        raise ValueError(f"{name} must be a mapping")
    copied: dict[str, object] = {}
    for key, item in value.items():
        normalized_key = _non_empty_string(key, f"{name} key")
        if normalized_key in copied:
            raise ValueError(f"{name} contains a duplicate normalized key: {normalized_key!r}")
        copied[normalized_key] = item
    if not allow_empty and not copied:
        raise ValueError(f"{name} must not be empty")
    return MappingProxyType(copied)


def _diagnostics(value: Mapping[str, object]) -> Mapping[str, object]:
    return _mapping(value, "diagnostics")


def _validate_result_status(ok: object, error: ApiError | None) -> bool:
    result = _bool(ok, "ok")
    if result and error is not None:
        raise ValueError("a successful result cannot carry an error")
    if not result and not isinstance(error, ApiError):
        raise ValueError("a failed result must carry an ApiError")
    return result


def _normalized_gripper(value: object, name: str = "gripper_position") -> float:
    result = _finite_float(value, name)
    if not 0.0 <= result <= 1.0:
        raise ValueError(f"{name} must be in [0, 1]")
    return result


def _arm_key(value: object, name: str = "arm") -> str:
    return _non_empty_string(value, name)


def _arm_vectors(
    value: Mapping[str, object] | object,
    name: str,
    *,
    joint_dimension: int,
) -> Mapping[str, np.ndarray]:
    source: Mapping[str, object]
    if isinstance(value, Mapping):
        source = value
    else:
        source = {"primary": value}
    source = _mapping(source, name, allow_empty=False)
    return MappingProxyType(
        {
            arm: _array(vector, f"{name}[{arm!r}]", shape=(joint_dimension,))
            for arm, vector in source.items()
        }
    )


def _joint_vector(value: object, name: str) -> np.ndarray:
    result = _array(value, name, shape=(None,))
    if result.shape[0] not in SUPPORTED_JOINT_DIMENSIONS:
        raise ValueError(f"{name} must contain 6 or 7 joints, got {result.shape[0]}")
    return result


def _joint_matrix(value: object, name: str) -> np.ndarray:
    result = _array(value, name, shape=(None, None))
    if result.shape[1] not in SUPPORTED_JOINT_DIMENSIONS:
        raise ValueError(f"{name} waypoints must contain 6 or 7 joints, got {result.shape[1]}")
    return result


def _arm_grippers(
    value: Mapping[str, object] | object,
    name: str,
) -> Mapping[str, float]:
    source: Mapping[str, object]
    if isinstance(value, Mapping):
        source = value
    else:
        source = {"primary": value}
    source = _mapping(source, name, allow_empty=False)
    return MappingProxyType(
        {arm: _normalized_gripper(item, f"{name}[{arm!r}]") for arm, item in source.items()}
    )


def _arm_poses(
    value: Mapping[str, Pose] | Pose,
    name: str,
) -> Mapping[str, Pose]:
    source: Mapping[str, Pose]
    if isinstance(value, Pose):
        source = {"primary": value}
    elif isinstance(value, Mapping):
        source = value
    else:
        # Preserve the invalid-data ValueError contract.
        raise ValueError(f"{name} must be a Pose or mapping of arm names to Pose")
    source = _mapping(source, name, allow_empty=False)  # type: ignore[arg-type]
    result: dict[str, Pose] = {}
    for arm, pose in source.items():
        if not isinstance(pose, Pose):
            # Preserve the invalid-data ValueError contract.
            raise ValueError(f"{name}[{arm!r}] must be a Pose")
        result[arm] = pose
    return MappingProxyType(result)


@dataclass(frozen=True, slots=True)
class Pose:
    """A rigid pose expressed in ``frame`` using a wxyz unit quaternion."""

    position: np.ndarray
    quaternion_wxyz: np.ndarray
    frame: str

    def __post_init__(self) -> None:
        position = _array(self.position, "position", shape=(3,))
        quaternion = _array(self.quaternion_wxyz, "quaternion_wxyz", shape=(4,))
        norm = float(np.linalg.norm(quaternion))
        if not np.isclose(norm, 1.0, rtol=0.0, atol=1e-5):
            raise ValueError("quaternion_wxyz must be normalized to unit length")
        object.__setattr__(self, "position", position)
        object.__setattr__(self, "quaternion_wxyz", quaternion)
        object.__setattr__(self, "frame", _non_empty_string(self.frame, "frame"))

    @property
    def position_m(self) -> np.ndarray:
        """Alias documenting that Cartesian positions use metres."""
        return self.position

    def as_matrix(self) -> np.ndarray:
        """Return a read-only 4x4 homogeneous transform in ``frame``."""
        w, x, y, z = self.quaternion_wxyz
        rotation = np.array(
            [
                [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
                [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
                [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)],
            ],
            dtype=np.float64,
        )
        transform = np.eye(4, dtype=np.float64)
        transform[:3, :3] = rotation
        transform[:3, 3] = self.position
        transform.setflags(write=False)
        return transform


@dataclass(frozen=True, slots=True)
class CameraObservation:
    """Calibrated RGB-D observation from a named coordinate frame."""

    rgb: np.ndarray
    depth_m: np.ndarray
    intrinsics: np.ndarray
    frame: str
    camera_pose: Pose
    timestamp_s: float | None = None

    def __post_init__(self) -> None:
        try:
            rgb = np.asarray(self.rgb)
        except (TypeError, ValueError) as exc:
            raise ValueError("rgb must be a numeric array") from exc
        if rgb.ndim != 3 or rgb.shape[2] != 3 or rgb.shape[0] == 0 or rgb.shape[1] == 0:
            raise ValueError("rgb must have non-empty shape (H, W, 3)")
        if np.issubdtype(rgb.dtype, np.bool_) or not (
            np.issubdtype(rgb.dtype, np.integer) or np.issubdtype(rgb.dtype, np.floating)
        ):
            raise ValueError("rgb must use an integer or floating dtype")
        if not bool(np.all(np.isfinite(rgb))):
            raise ValueError("rgb must contain only finite values")
        rgb_min = float(np.min(rgb))
        rgb_max = float(np.max(rgb))
        if np.issubdtype(rgb.dtype, np.integer):
            if rgb_min < 0.0 or rgb_max > 255.0:
                raise ValueError("integer rgb values must be in [0, 255]")
        elif rgb_min < 0.0 or rgb_max > 1.0:
            raise ValueError("floating rgb values must be in [0, 1]")
        rgb = np.array(rgb, copy=True, order="C")
        rgb.setflags(write=False)

        depth = _array(self.depth_m, "depth_m", shape=rgb.shape[:2])
        if bool(np.any(depth < 0.0)):
            raise ValueError("depth_m values must be non-negative")
        intrinsics = _array(self.intrinsics, "intrinsics", shape=(3, 3))
        if intrinsics[0, 0] <= 0.0 or intrinsics[1, 1] <= 0.0:
            raise ValueError("intrinsics focal lengths must be positive")
        if not np.allclose(intrinsics[2], (0.0, 0.0, 1.0), rtol=0.0, atol=1e-6):
            raise ValueError("intrinsics final row must be [0, 0, 1]")
        if not isinstance(self.camera_pose, Pose):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("camera_pose must be a Pose")

        object.__setattr__(self, "rgb", rgb)
        object.__setattr__(self, "depth_m", depth)
        object.__setattr__(self, "intrinsics", intrinsics)
        object.__setattr__(self, "frame", _non_empty_string(self.frame, "frame"))
        object.__setattr__(self, "timestamp_s", _optional_timestamp(self.timestamp_s))


@dataclass(frozen=True, slots=True)
class RobotState:
    """Per-arm robot state with end-effector poses expressed in ``base_frame``."""

    joint_positions: Mapping[str, np.ndarray] | np.ndarray
    joint_velocities: Mapping[str, np.ndarray] | np.ndarray
    end_effector_poses: Mapping[str, Pose] | Pose
    gripper_positions: Mapping[str, float] | float
    base_frame: str
    joint_names: Mapping[str, Sequence[str]] | Sequence[str] | None = None
    timestamp_s: float | None = None
    embodiment: str = DEFAULT_EMBODIMENT

    def __post_init__(self) -> None:
        embodiment = _non_empty_string(self.embodiment, "embodiment")
        joint_dimension = _joint_dimension(embodiment)
        positions = _arm_vectors(
            self.joint_positions,
            "joint_positions",
            joint_dimension=joint_dimension,
        )
        velocities = _arm_vectors(
            self.joint_velocities,
            "joint_velocities",
            joint_dimension=joint_dimension,
        )
        poses = _arm_poses(self.end_effector_poses, "end_effector_poses")
        grippers = _arm_grippers(self.gripper_positions, "gripper_positions")
        arms = set(positions)
        if set(velocities) != arms or set(poses) != arms or set(grippers) != arms:
            raise ValueError("all RobotState per-arm mappings must have identical arm names")
        for arm in arms:
            if velocities[arm].shape != positions[arm].shape:
                raise ValueError(
                    f"joint_velocities[{arm!r}] must match "
                    f"joint_positions[{arm!r}] shape {positions[arm].shape}"
                )

        base_frame = _non_empty_string(self.base_frame, "base_frame")
        for arm, pose in poses.items():
            if pose.frame != base_frame:
                raise ValueError(
                    f"end_effector_poses[{arm!r}] is in frame {pose.frame!r}, "
                    f"expected {base_frame!r}"
                )

        if self.joint_names is None:
            names = {
                arm: tuple(f"joint_{index}" for index in range(positions[arm].shape[0]))
                for arm in arms
            }
        elif isinstance(self.joint_names, Mapping):
            raw_names = _mapping(self.joint_names, "joint_names", allow_empty=False)
            if set(raw_names) != arms:
                raise ValueError("joint_names must have the same arm names as joint_positions")
            names = {
                arm: _string_tuple(
                    items,
                    f"joint_names[{arm!r}]",
                    length=positions[arm].shape[0],
                )
                for arm, items in raw_names.items()
            }
        else:
            dimensions = {positions[arm].shape[0] for arm in arms}
            if len(dimensions) != 1:
                raise ValueError("joint_names must be a per-arm mapping when arm dimensions differ")
            common_names = _string_tuple(
                self.joint_names,
                "joint_names",
                length=next(iter(dimensions)),
            )
            names = dict.fromkeys(arms, common_names)

        object.__setattr__(self, "joint_positions", positions)
        object.__setattr__(self, "joint_velocities", velocities)
        object.__setattr__(self, "end_effector_poses", poses)
        object.__setattr__(self, "gripper_positions", grippers)
        object.__setattr__(self, "base_frame", base_frame)
        object.__setattr__(self, "joint_names", MappingProxyType(names))
        object.__setattr__(self, "timestamp_s", _optional_timestamp(self.timestamp_s))
        object.__setattr__(self, "embodiment", embodiment)

    @property
    def arms(self) -> tuple[str, ...]:
        return tuple(sorted(self.joint_positions))


@dataclass(frozen=True, slots=True)
class TaskContext:
    """Authoritative benchmark task identity and natural-language instruction."""

    suite: str
    task_id: int
    task_name: str
    language: str
    family: str
    metadata: Mapping[str, object] = field(default_factory=dict)

    def __post_init__(self) -> None:
        if isinstance(self.task_id, bool) or not isinstance(self.task_id, int | np.integer):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("task_id must be a non-negative integer")
        task_id = int(self.task_id)
        if task_id < 0:
            raise ValueError("task_id must be a non-negative integer")
        object.__setattr__(self, "suite", _non_empty_string(self.suite, "suite"))
        object.__setattr__(self, "task_id", task_id)
        object.__setattr__(self, "task_name", _non_empty_string(self.task_name, "task_name"))
        object.__setattr__(self, "language", _non_empty_string(self.language, "language"))
        object.__setattr__(self, "family", _non_empty_string(self.family, "family"))
        object.__setattr__(self, "metadata", _mapping(self.metadata, "metadata"))


@dataclass(frozen=True, slots=True)
class Observation:
    """Synchronized public observation assembled by an environment adapter."""

    cameras: Mapping[str, CameraObservation]
    robot_state: RobotState
    task_context: TaskContext | None = None
    timestamp_s: float | None = None

    def __post_init__(self) -> None:
        raw_cameras = _mapping(self.cameras, "cameras", allow_empty=False)
        cameras: dict[str, CameraObservation] = {}
        for name, camera in raw_cameras.items():
            if not isinstance(camera, CameraObservation):
                # Preserve the invalid-data ValueError contract.
                raise ValueError(f"cameras[{name!r}] must be a CameraObservation")
            cameras[name] = camera
        if not isinstance(self.robot_state, RobotState):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("robot_state must be a RobotState")
        if self.task_context is not None and not isinstance(self.task_context, TaskContext):
            raise ValueError("task_context must be a TaskContext or None")
        object.__setattr__(self, "cameras", MappingProxyType(cameras))
        object.__setattr__(self, "timestamp_s", _optional_timestamp(self.timestamp_s))


@dataclass(frozen=True, slots=True)
class ArmCommand:
    """One control-period command for one supported robot arm."""

    mode: str
    target: np.ndarray
    gripper_position: float | None = None
    embodiment: str = DEFAULT_EMBODIMENT

    def __post_init__(self) -> None:
        if self.mode != "joint_position":
            raise ValueError("mode must be 'joint_position'")
        embodiment = _non_empty_string(self.embodiment, "embodiment")
        joint_dimension = _joint_dimension(embodiment)
        object.__setattr__(
            self,
            "target",
            _array(self.target, "target", shape=(joint_dimension,)),
        )
        if self.gripper_position is not None:
            object.__setattr__(
                self,
                "gripper_position",
                _normalized_gripper(self.gripper_position),
            )
        object.__setattr__(self, "embodiment", embodiment)


@dataclass(frozen=True, slots=True)
class RobotAction:
    """A mapping from embodiment arm names to synchronized commands."""

    arms: Mapping[str, ArmCommand]

    def __post_init__(self) -> None:
        raw_arms = _mapping(self.arms, "arms", allow_empty=False)
        arms: dict[str, ArmCommand] = {}
        for name, command in raw_arms.items():
            if not isinstance(command, ArmCommand):
                # Preserve the invalid-data ValueError contract.
                raise ValueError(f"arms[{name!r}] must be an ArmCommand")
            arms[name] = command
        embodiments = {command.embodiment for command in arms.values()}
        if len(embodiments) != 1:
            raise ValueError("all RobotAction arm commands must use the same embodiment")
        object.__setattr__(self, "arms", MappingProxyType(arms))

    @property
    def embodiment(self) -> str:
        return next(iter(self.arms.values())).embodiment


@dataclass(frozen=True, slots=True)
class Trajectory:
    """A fixed-rate trajectory bound to one arm's measured start state."""

    joint_positions: np.ndarray
    dt_s: float
    joint_names: Sequence[str]
    planner: str
    collision_aware: bool
    expected_start: RobotState
    arm: str = "primary"
    gripper_positions: np.ndarray | None = None
    embodiment: str = DEFAULT_EMBODIMENT

    def __post_init__(self) -> None:
        embodiment = _non_empty_string(self.embodiment, "embodiment")
        joint_dimension = _joint_dimension(embodiment)
        positions = _array(
            self.joint_positions,
            "joint_positions",
            shape=(None, joint_dimension),
        )
        if positions.shape[0] == 0:
            raise ValueError("joint_positions must contain at least one waypoint")
        object.__setattr__(self, "joint_positions", positions)
        object.__setattr__(
            self,
            "dt_s",
            _finite_float(self.dt_s, "dt_s", minimum=0.0, strict_minimum=True),
        )
        object.__setattr__(
            self,
            "joint_names",
            _string_tuple(self.joint_names, "joint_names", length=positions.shape[1]),
        )
        object.__setattr__(self, "planner", _non_empty_string(self.planner, "planner"))
        object.__setattr__(self, "collision_aware", _bool(self.collision_aware, "collision_aware"))
        object.__setattr__(self, "arm", _arm_key(self.arm))
        object.__setattr__(self, "embodiment", embodiment)
        if not isinstance(self.expected_start, RobotState):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("expected_start must be a RobotState")
        if self.expected_start.embodiment != embodiment:
            raise ValueError("expected_start embodiment must match the trajectory")
        if self.arm not in self.expected_start.joint_positions:
            raise ValueError("expected_start must contain the trajectory arm")
        if self.expected_start.joint_positions[self.arm].shape[0] != positions.shape[1]:
            raise ValueError("expected_start must match the trajectory joint dimension")
        if tuple(self.expected_start.joint_names[self.arm]) != tuple(self.joint_names):
            raise ValueError("expected_start joint names must match the trajectory")
        if self.gripper_positions is not None:
            grippers = _array(
                self.gripper_positions,
                "gripper_positions",
                shape=(positions.shape[0],),
            )
            if bool(np.any((grippers < 0.0) | (grippers > 1.0))):
                raise ValueError("gripper_positions values must be in [0, 1]")
            object.__setattr__(self, "gripper_positions", grippers)

    @property
    def waypoints(self) -> np.ndarray:
        return self.joint_positions


@dataclass(frozen=True, slots=True)
class SynchronizedTrajectory:
    """Equal-length per-arm waypoints executed in the same control ticks."""

    joint_positions: Mapping[str, np.ndarray]
    dt_s: float
    joint_names: Mapping[str, Sequence[str]]
    planner: str
    collision_aware: bool
    expected_start: RobotState
    gripper_positions: Mapping[str, np.ndarray] | None = None
    embodiment: str = DEFAULT_EMBODIMENT

    def __post_init__(self) -> None:
        embodiment = _non_empty_string(self.embodiment, "embodiment")
        joint_dimension = _joint_dimension(embodiment)
        raw_positions = _mapping(self.joint_positions, "joint_positions", allow_empty=False)
        positions = {
            arm: _array(
                value,
                f"joint_positions[{arm!r}]",
                shape=(None, joint_dimension),
            )
            for arm, value in raw_positions.items()
        }
        lengths = {value.shape[0] for value in positions.values()}
        if lengths == {0} or len(lengths) != 1:
            raise ValueError("all synchronized arms must have the same nonzero waypoint count")
        raw_names = _mapping(self.joint_names, "joint_names", allow_empty=False)
        if set(raw_names) != set(positions):
            raise ValueError("joint_names must have the same arms as joint_positions")
        names = {
            arm: _string_tuple(
                value,
                f"joint_names[{arm!r}]",
                length=positions[arm].shape[1],
            )
            for arm, value in raw_names.items()
        }
        if not isinstance(self.expected_start, RobotState):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("expected_start must be a RobotState")
        if self.expected_start.embodiment != embodiment:
            raise ValueError("expected_start embodiment must match the trajectory")
        if set(self.expected_start.arms) != set(positions):
            raise ValueError("expected_start must have the same arms as joint_positions")
        for arm in positions:
            if self.expected_start.joint_positions[arm].shape[0] != positions[arm].shape[1]:
                raise ValueError("expected_start must match each arm's trajectory joint dimension")
            if tuple(self.expected_start.joint_names[arm]) != tuple(names[arm]):
                raise ValueError("expected_start joint names must match the trajectory")
        grippers = None
        if self.gripper_positions is not None:
            raw_grippers = _mapping(self.gripper_positions, "gripper_positions", allow_empty=False)
            if set(raw_grippers) != set(positions):
                raise ValueError("gripper_positions must have the same arms as joint_positions")
            count = next(iter(lengths))
            grippers = {
                arm: _array(value, f"gripper_positions[{arm!r}]", shape=(count,))
                for arm, value in raw_grippers.items()
            }
            if any(np.any((value < 0.0) | (value > 1.0)) for value in grippers.values()):
                raise ValueError("gripper_positions values must be in [0, 1]")
        object.__setattr__(self, "joint_positions", MappingProxyType(positions))
        object.__setattr__(self, "joint_names", MappingProxyType(names))
        object.__setattr__(
            self, "gripper_positions", None if grippers is None else MappingProxyType(grippers)
        )
        object.__setattr__(
            self,
            "dt_s",
            _finite_float(self.dt_s, "dt_s", minimum=0.0, strict_minimum=True),
        )
        object.__setattr__(self, "planner", _non_empty_string(self.planner, "planner"))
        object.__setattr__(self, "collision_aware", _bool(self.collision_aware, "collision_aware"))
        object.__setattr__(self, "embodiment", embodiment)

    @property
    def waypoint_count(self) -> int:
        return next(iter(self.joint_positions.values())).shape[0]


@dataclass(frozen=True, slots=True)
class Segmentation:
    """One scored binary mask in an explicitly named camera frame."""

    mask: np.ndarray
    label: str
    score: float
    camera_name: str
    frame: str
    box_xyxy: np.ndarray | None = None

    def __post_init__(self) -> None:
        try:
            raw_mask = np.asarray(self.mask)
        except (TypeError, ValueError) as exc:
            raise ValueError("mask must be a two-dimensional array") from exc
        if raw_mask.ndim != 2 or raw_mask.shape[0] == 0 or raw_mask.shape[1] == 0:
            raise ValueError("mask must have non-empty shape (H, W)")
        if raw_mask.dtype != np.bool_:
            if not (
                np.issubdtype(raw_mask.dtype, np.integer)
                or np.issubdtype(raw_mask.dtype, np.floating)
            ):
                raise ValueError("mask must be boolean or contain only 0/1 values")
            if not bool(np.all(np.isfinite(raw_mask))) or not bool(
                np.all((raw_mask == 0) | (raw_mask == 1))
            ):
                raise ValueError("mask must be boolean or contain only 0/1 values")
        mask = np.array(raw_mask, dtype=np.bool_, copy=True, order="C")
        mask.setflags(write=False)
        object.__setattr__(self, "mask", mask)
        object.__setattr__(self, "label", _non_empty_string(self.label, "label"))
        object.__setattr__(
            self,
            "score",
            _finite_float(self.score, "score", minimum=0.0, maximum=1.0),
        )
        object.__setattr__(
            self,
            "camera_name",
            _non_empty_string(self.camera_name, "camera_name"),
        )
        object.__setattr__(self, "frame", _non_empty_string(self.frame, "frame"))
        if self.box_xyxy is not None:
            box = _array(self.box_xyxy, "box_xyxy", shape=(4,))
            x1, y1, x2, y2 = box
            if x2 < x1 or y2 < y1:
                raise ValueError("box_xyxy must satisfy x2 >= x1 and y2 >= y1")
            object.__setattr__(self, "box_xyxy", box)


@dataclass(frozen=True, slots=True)
class SegmentationSet:
    """Recoverable result of a segmentation provider call."""

    ok: bool
    segmentations: Sequence[Segmentation] = ()
    error: ApiError | None = None
    diagnostics: Mapping[str, object] = field(default_factory=dict)

    def __post_init__(self) -> None:
        ok = _validate_result_status(self.ok, self.error)
        if isinstance(self.segmentations, str | bytes) or not isinstance(
            self.segmentations, Sequence
        ):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("segmentations must be a sequence")
        items = tuple(self.segmentations)
        if any(not isinstance(item, Segmentation) for item in items):
            raise ValueError("segmentations must contain only Segmentation values")
        if ok and not items:
            raise ValueError("a successful SegmentationSet must contain at least one segmentation")
        if not ok and items:
            raise ValueError("a failed SegmentationSet cannot carry segmentations")
        if items:
            expected = (items[0].camera_name, items[0].frame, items[0].mask.shape)
            if any(
                (item.camera_name, item.frame, item.mask.shape) != expected for item in items[1:]
            ):
                raise ValueError("all segmentations must share camera, frame, and mask shape")
        object.__setattr__(self, "ok", ok)
        object.__setattr__(self, "segmentations", items)
        object.__setattr__(self, "diagnostics", _diagnostics(self.diagnostics))

    @property
    def value(self) -> tuple[Segmentation, ...] | None:
        return self.segmentations if self.ok else None


@dataclass(frozen=True, slots=True)
class DepthEstimateResult:
    """Recoverable metric-depth estimate from one or more camera frames."""

    ok: bool
    provider: str
    source_frames: Sequence[str]
    depth_m: np.ndarray | None = None
    disparity_px: np.ndarray | None = None
    valid_fraction: float = 0.0
    valid_min_m: float = 0.0
    valid_max_m: float = 0.0
    median_depth_m: float = 0.0
    prior_median_abs_error_m: float | None = None
    inference_time_s: float | None = None
    device: str | None = None
    error: ApiError | None = None
    diagnostics: Mapping[str, object] = field(default_factory=dict)

    def __post_init__(self) -> None:
        ok = _validate_result_status(self.ok, self.error)
        provider = _non_empty_string(self.provider, "provider")
        source_frames = _string_tuple(self.source_frames, "source_frames")
        if not source_frames:
            raise ValueError("source_frames must contain at least one frame")

        depth = None
        if self.depth_m is not None:
            depth = _array(self.depth_m, "depth_m", shape=(None, None), dtype=np.float32)
            if depth.shape[0] == 0 or depth.shape[1] == 0:
                raise ValueError("depth_m must have non-empty shape (H, W)")
            if bool(np.any(depth < 0.0)):
                raise ValueError("depth_m values must be non-negative")

        disparity = None
        if self.disparity_px is not None:
            disparity = _array(
                self.disparity_px,
                "disparity_px",
                shape=(None, None),
                dtype=np.float32,
            )
            if depth is None or disparity.shape != depth.shape:
                raise ValueError("disparity_px must match depth_m shape")

        valid_fraction = _finite_float(
            self.valid_fraction,
            "valid_fraction",
            minimum=0.0,
            maximum=1.0,
        )
        valid_min = _finite_float(self.valid_min_m, "valid_min_m", minimum=0.0)
        valid_max = _finite_float(self.valid_max_m, "valid_max_m", minimum=0.0)
        median = _finite_float(self.median_depth_m, "median_depth_m", minimum=0.0)
        if ok:
            if depth is None or valid_fraction <= 0.0 or not bool(np.any(depth > 0.0)):
                raise ValueError("a successful DepthEstimateResult must carry valid metric depth")
            if not 0.0 < valid_min <= median <= valid_max:
                raise ValueError(
                    "successful depth statistics must satisfy 0 < min <= median <= max"
                )
        elif depth is not None or disparity is not None:
            raise ValueError("a failed DepthEstimateResult cannot carry depth or disparity")

        prior_error = self.prior_median_abs_error_m
        if prior_error is not None:
            prior_error = _finite_float(
                prior_error,
                "prior_median_abs_error_m",
                minimum=0.0,
            )
        inference_time = self.inference_time_s
        if inference_time is not None:
            inference_time = _finite_float(
                inference_time,
                "inference_time_s",
                minimum=0.0,
            )
        device = self.device
        if device is not None:
            device = _non_empty_string(device, "device")

        object.__setattr__(self, "ok", ok)
        object.__setattr__(self, "provider", provider)
        object.__setattr__(self, "source_frames", source_frames)
        object.__setattr__(self, "depth_m", depth)
        object.__setattr__(self, "disparity_px", disparity)
        object.__setattr__(self, "valid_fraction", valid_fraction)
        object.__setattr__(self, "valid_min_m", valid_min)
        object.__setattr__(self, "valid_max_m", valid_max)
        object.__setattr__(self, "median_depth_m", median)
        object.__setattr__(self, "prior_median_abs_error_m", prior_error)
        object.__setattr__(self, "inference_time_s", inference_time)
        object.__setattr__(self, "device", device)
        object.__setattr__(self, "diagnostics", _diagnostics(self.diagnostics))

    @property
    def value(self) -> np.ndarray | None:
        """Return the metric depth array for successful calls."""
        return self.depth_m if self.ok else None


@dataclass(frozen=True, slots=True)
class PointCloud:
    """Finite XYZ points, and optional RGB colors, expressed in ``frame``."""

    points: np.ndarray
    frame: str
    colors: np.ndarray | None = None

    def __post_init__(self) -> None:
        points = _array(self.points, "points", shape=(None, 3))
        if points.shape[0] == 0:
            raise ValueError("points must contain at least one point")
        object.__setattr__(self, "points", points)
        object.__setattr__(self, "frame", _non_empty_string(self.frame, "frame"))
        if self.colors is not None:
            try:
                colors = np.asarray(self.colors)
            except (TypeError, ValueError) as exc:
                raise ValueError("colors must be a numeric array") from exc
            if colors.shape != points.shape:
                raise ValueError(f"colors must have shape {points.shape}, got {colors.shape}")
            if np.issubdtype(colors.dtype, np.bool_) or not (
                np.issubdtype(colors.dtype, np.integer) or np.issubdtype(colors.dtype, np.floating)
            ):
                raise ValueError("colors must use an integer or floating dtype")
            if not bool(np.all(np.isfinite(colors))):
                raise ValueError("colors must contain only finite values")
            color_min = float(np.min(colors))
            color_max = float(np.max(colors))
            upper = 255.0 if np.issubdtype(colors.dtype, np.integer) else 1.0
            if color_min < 0.0 or color_max > upper:
                raise ValueError(f"colors values must be in [0, {upper:g}]")
            colors = np.array(colors, copy=True, order="C")
            colors.setflags(write=False)
            object.__setattr__(self, "colors", colors)


@dataclass(frozen=True, slots=True)
class PlanningScene:
    """A public-observation-derived collision scene in one explicit frame."""

    point_cloud: PointCloud
    voxel_size_m: float = 0.01
    timestamp_s: float | None = None

    def __post_init__(self) -> None:
        if not isinstance(self.point_cloud, PointCloud):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("point_cloud must be a PointCloud")
        object.__setattr__(
            self,
            "voxel_size_m",
            _finite_float(
                self.voxel_size_m,
                "voxel_size_m",
                minimum=0.0,
                strict_minimum=True,
            ),
        )
        object.__setattr__(self, "timestamp_s", _optional_timestamp(self.timestamp_s))

    @property
    def frame(self) -> str:
        return self.point_cloud.frame


@dataclass(frozen=True, slots=True)
class RobotPlanningContext:
    """Non-policy-facing robot model and arm calibration for a planner."""

    embodiment: str
    model: str
    joint_names: Mapping[str, Sequence[str]]
    base_transforms: Mapping[str, np.ndarray]
    end_effector_links: Mapping[str, str]

    def __post_init__(self) -> None:
        embodiment = _non_empty_string(self.embodiment, "embodiment")
        joint_dimension = _joint_dimension(embodiment)
        raw_names = _mapping(self.joint_names, "joint_names", allow_empty=False)
        names = {
            arm: _string_tuple(value, f"joint_names[{arm!r}]", length=joint_dimension)
            for arm, value in raw_names.items()
        }
        if any(len(value) not in SUPPORTED_JOINT_DIMENSIONS for value in names.values()):
            raise ValueError("joint_names must contain 6 or 7 entries per arm")
        raw_transforms = _mapping(self.base_transforms, "base_transforms", allow_empty=False)
        raw_links = _mapping(self.end_effector_links, "end_effector_links", allow_empty=False)
        if set(raw_transforms) != set(names) or set(raw_links) != set(names):
            raise ValueError(
                "joint_names, base_transforms, and end_effector_links must share arm names"
            )
        transforms: dict[str, np.ndarray] = {}
        for arm, value in raw_transforms.items():
            transform = _array(value, f"base_transforms[{arm!r}]", shape=(4, 4))
            if not np.allclose(transform[3], (0.0, 0.0, 0.0, 1.0), atol=1e-9):
                raise ValueError("base transforms must be homogeneous 4x4 matrices")
            transforms[arm] = transform
        links = {
            arm: _non_empty_string(value, f"end_effector_links[{arm!r}]")
            for arm, value in raw_links.items()
        }
        object.__setattr__(self, "embodiment", embodiment)
        object.__setattr__(self, "model", _non_empty_string(self.model, "model"))
        object.__setattr__(self, "joint_names", MappingProxyType(names))
        object.__setattr__(self, "base_transforms", MappingProxyType(transforms))
        object.__setattr__(self, "end_effector_links", MappingProxyType(links))

    @property
    def arms(self) -> tuple[str, ...]:
        return tuple(self.joint_names)


@dataclass(frozen=True, slots=True)
class MotionStrategy:
    """Per-call selection of IK, trajectory, and optional integrated pose planning."""

    ik_solver: str = "pyroki"
    trajectory_planner: str = "interpolation"
    pose_planner: str = "composed"
    time_dilation_factor: float | None = None
    interpolation_dt_s: float | None = None
    maximum_trajectory_dt_s: float | None = None

    def __post_init__(self) -> None:
        ik_solver = _non_empty_string(self.ik_solver, "ik_solver")
        trajectory_planner = _non_empty_string(self.trajectory_planner, "trajectory_planner")
        pose_planner = _non_empty_string(self.pose_planner, "pose_planner")
        if ik_solver not in {"pyroki", "curobo", "mink"}:
            raise ValueError("ik_solver must be 'pyroki', 'curobo', or 'mink'")
        if trajectory_planner not in {"interpolation", "curobo"}:
            raise ValueError("trajectory_planner must be 'interpolation' or 'curobo'")
        if pose_planner not in {"composed", "curobo-integrated"}:
            raise ValueError("pose_planner must be 'composed' or 'curobo-integrated'")
        object.__setattr__(self, "ik_solver", ik_solver)
        object.__setattr__(self, "trajectory_planner", trajectory_planner)
        object.__setattr__(self, "pose_planner", pose_planner)
        if self.time_dilation_factor is not None:
            object.__setattr__(
                self,
                "time_dilation_factor",
                _finite_float(
                    self.time_dilation_factor,
                    "time_dilation_factor",
                    minimum=0.0,
                    maximum=1.0,
                    strict_minimum=True,
                ),
            )
        if self.interpolation_dt_s is not None:
            object.__setattr__(
                self,
                "interpolation_dt_s",
                _finite_float(
                    self.interpolation_dt_s,
                    "interpolation_dt_s",
                    minimum=0.0,
                    strict_minimum=True,
                ),
            )
        if self.maximum_trajectory_dt_s is not None:
            object.__setattr__(
                self,
                "maximum_trajectory_dt_s",
                _finite_float(
                    self.maximum_trajectory_dt_s,
                    "maximum_trajectory_dt_s",
                    minimum=0.0,
                    strict_minimum=True,
                ),
            )


@dataclass(frozen=True, slots=True)
class ObjectGeometry:
    """An oriented bounding box represented by a pose and positive XYZ extents."""

    pose: Pose
    extents: np.ndarray
    point_count: int | None = None

    def __post_init__(self) -> None:
        if not isinstance(self.pose, Pose):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("pose must be a Pose")
        extents = _array(self.extents, "extents", shape=(3,))
        if bool(np.any(extents <= 0.0)):
            raise ValueError("extents must be strictly positive")
        object.__setattr__(self, "extents", extents)
        if self.point_count is not None:
            if isinstance(self.point_count, bool) or not isinstance(
                self.point_count, int | np.integer
            ):
                raise ValueError("point_count must be a positive integer or None")
            point_count = int(self.point_count)
            if point_count <= 0:
                raise ValueError("point_count must be a positive integer or None")
            object.__setattr__(self, "point_count", point_count)

    @property
    def frame(self) -> str:
        return self.pose.frame


@dataclass(frozen=True, slots=True)
class GraspCandidate:
    """A scored gripper pose and opening width in metres."""

    pose: Pose
    score: float
    width_m: float
    approach_distance_m: float = 0.0
    metadata: Mapping[str, object] = field(default_factory=dict)

    def __post_init__(self) -> None:
        if not isinstance(self.pose, Pose):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("pose must be a Pose")
        object.__setattr__(
            self,
            "score",
            _finite_float(self.score, "score", minimum=0.0, maximum=1.0),
        )
        object.__setattr__(
            self,
            "width_m",
            _finite_float(self.width_m, "width_m", minimum=0.0),
        )
        object.__setattr__(
            self,
            "approach_distance_m",
            _finite_float(self.approach_distance_m, "approach_distance_m", minimum=0.0),
        )
        object.__setattr__(self, "metadata", _mapping(self.metadata, "metadata"))

    @property
    def frame(self) -> str:
        return self.pose.frame

    @property
    def transform(self) -> np.ndarray:
        return self.pose.as_matrix()


@dataclass(frozen=True, slots=True)
class GraspSet:
    """Recoverable result of grasp generation."""

    ok: bool
    grasps: Sequence[GraspCandidate] = ()
    error: ApiError | None = None
    diagnostics: Mapping[str, object] = field(default_factory=dict)

    def __post_init__(self) -> None:
        ok = _validate_result_status(self.ok, self.error)
        if isinstance(self.grasps, str | bytes) or not isinstance(self.grasps, Sequence):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("grasps must be a sequence")
        grasps = tuple(self.grasps)
        if any(not isinstance(item, GraspCandidate) for item in grasps):
            raise ValueError("grasps must contain only GraspCandidate values")
        if ok and not grasps:
            raise ValueError("a successful GraspSet must contain at least one grasp")
        if not ok and grasps:
            raise ValueError("a failed GraspSet cannot carry grasps")
        if grasps and any(item.frame != grasps[0].frame for item in grasps[1:]):
            raise ValueError("all grasp candidates must use the same frame")
        object.__setattr__(self, "ok", ok)
        object.__setattr__(self, "grasps", grasps)
        object.__setattr__(self, "diagnostics", _diagnostics(self.diagnostics))

    @property
    def value(self) -> tuple[GraspCandidate, ...] | None:
        return self.grasps if self.ok else None


@dataclass(frozen=True, slots=True)
class LocalizationResult:
    """Recoverable composed localization result with optional intermediate values."""

    ok: bool
    geometry: ObjectGeometry | None = None
    segmentation: Segmentation | None = None
    point_cloud: PointCloud | None = None
    error: ApiError | None = None
    diagnostics: Mapping[str, object] = field(default_factory=dict)

    def __post_init__(self) -> None:
        ok = _validate_result_status(self.ok, self.error)
        if ok and self.geometry is None:
            raise ValueError("a successful LocalizationResult must carry geometry")
        if self.geometry is not None and not isinstance(self.geometry, ObjectGeometry):
            raise ValueError("geometry must be an ObjectGeometry or None")
        if self.segmentation is not None and not isinstance(self.segmentation, Segmentation):
            raise ValueError("segmentation must be a Segmentation or None")
        if self.point_cloud is not None and not isinstance(self.point_cloud, PointCloud):
            raise ValueError("point_cloud must be a PointCloud or None")
        if (
            self.geometry is not None
            and self.point_cloud is not None
            and self.geometry.frame != self.point_cloud.frame
        ):
            raise ValueError("geometry and point_cloud must use the same frame")
        object.__setattr__(self, "ok", ok)
        object.__setattr__(self, "diagnostics", _diagnostics(self.diagnostics))

    @property
    def value(self) -> ObjectGeometry | None:
        return self.geometry if self.ok else None


@dataclass(frozen=True, slots=True)
class IKResult:
    """Recoverable inverse-kinematics result for one arm."""

    ok: bool
    joint_positions: np.ndarray | None = None
    arm: str = "primary"
    error: ApiError | None = None
    diagnostics: Mapping[str, object] = field(default_factory=dict)
    embodiment: str = DEFAULT_EMBODIMENT

    def __post_init__(self) -> None:
        embodiment = _non_empty_string(self.embodiment, "embodiment")
        joint_dimension = _joint_dimension(embodiment)
        ok = _validate_result_status(self.ok, self.error)
        joints = self.joint_positions
        if ok and joints is None:
            raise ValueError("a successful IKResult must carry joint_positions")
        if not ok and joints is not None:
            raise ValueError("a failed IKResult cannot carry joint_positions")
        if joints is not None:
            joints = _array(joints, "joint_positions", shape=(joint_dimension,))
        object.__setattr__(self, "ok", ok)
        object.__setattr__(self, "joint_positions", joints)
        object.__setattr__(self, "arm", _arm_key(self.arm))
        object.__setattr__(self, "diagnostics", _diagnostics(self.diagnostics))
        object.__setattr__(self, "embodiment", embodiment)

    @property
    def value(self) -> np.ndarray | None:
        return self.joint_positions if self.ok else None


@dataclass(frozen=True, slots=True)
class PlanResult:
    """Recoverable motion-planning result for one arm."""

    ok: bool
    trajectory: Trajectory | None = None
    error: ApiError | None = None
    diagnostics: Mapping[str, object] = field(default_factory=dict)

    def __post_init__(self) -> None:
        ok = _validate_result_status(self.ok, self.error)
        if ok and self.trajectory is None:
            raise ValueError("a successful PlanResult must carry a trajectory")
        if not ok and self.trajectory is not None:
            raise ValueError("a failed PlanResult cannot carry a trajectory")
        if self.trajectory is not None and not isinstance(self.trajectory, Trajectory):
            raise ValueError("trajectory must be a Trajectory or None")
        object.__setattr__(self, "ok", ok)
        object.__setattr__(self, "diagnostics", _diagnostics(self.diagnostics))

    @property
    def value(self) -> Trajectory | None:
        return self.trajectory if self.ok else None


@dataclass(frozen=True, slots=True)
class SynchronizedPlanResult:
    """Recoverable result of synchronized multi-arm motion planning."""

    ok: bool
    trajectory: SynchronizedTrajectory | None = None
    error: ApiError | None = None
    diagnostics: Mapping[str, object] = field(default_factory=dict)

    def __post_init__(self) -> None:
        ok = _validate_result_status(self.ok, self.error)
        if ok and self.trajectory is None:
            raise ValueError("a successful SynchronizedPlanResult must carry a trajectory")
        if not ok and self.trajectory is not None:
            raise ValueError("a failed SynchronizedPlanResult cannot carry a trajectory")
        if self.trajectory is not None and not isinstance(self.trajectory, SynchronizedTrajectory):
            raise ValueError("trajectory must be a SynchronizedTrajectory or None")
        object.__setattr__(self, "ok", ok)
        object.__setattr__(self, "diagnostics", _diagnostics(self.diagnostics))

    @property
    def value(self) -> SynchronizedTrajectory | None:
        return self.trajectory if self.ok else None


_SENSITIVE_DIAGNOSTIC_TERMS = (
    "_private",
    "ground_truth",
    "groundtruth",
    "mujoco",
    "object_pose",
    "privileged",
    "qpos",
    "qvel",
    "raw_observation",
    "raw_state",
    "reward",
    "sensitive",
    "sim_state",
    "success_predicate",
)
_SENSITIVE_DIAGNOSTIC_NAMES = frozenset({"private", "success"})


def _is_sensitive_diagnostic_key(key: str) -> bool:
    normalized = key.strip().lower().replace("-", "_").replace(" ", "_")
    return (
        normalized.startswith("_")
        or normalized in _SENSITIVE_DIAGNOSTIC_NAMES
        or any(term in normalized for term in _SENSITIVE_DIAGNOSTIC_TERMS)
    )


def _public_diagnostic_value(value: object) -> object:
    if isinstance(value, Mapping):
        return MappingProxyType(
            {
                key: _public_diagnostic_value(item)
                for key, item in value.items()
                if isinstance(key, str) and not _is_sensitive_diagnostic_key(key)
            }
        )
    if isinstance(value, tuple):
        return tuple(_public_diagnostic_value(item) for item in value)
    if isinstance(value, list):
        return tuple(_public_diagnostic_value(item) for item in value)
    return value


def _public_diagnostics(value: Mapping[str, object]) -> Mapping[str, object]:
    sanitized = _public_diagnostic_value(value)
    if not isinstance(sanitized, Mapping):  # pragma: no cover - defensive type narrowing
        # Internal invariant failure, not invalid caller input.
        raise AssertionError("diagnostic sanitization must return a mapping")
    return sanitized


def _public_error(error: ApiError | None) -> ApiError | None:
    if error is None:
        return None
    return ApiError(
        code=error.code,
        message=error.message,
        recoverable=error.recoverable,
        details=_public_diagnostics(error.details),
    )


class ExecutionStatus(str, Enum):
    """Stable terminal classification for a motion or control attempt."""

    SUCCESS = "success"
    TERMINATED = "terminated"
    TRUNCATED = "truncated"
    TIMEOUT = "timeout"
    CANCELLED = "cancelled"
    STALE_PLAN = "stale_plan"
    PLANNER_FAILED = "planner_failed"
    CONTROLLER_FAILED = "controller_failed"
    INVALID_REQUEST = "invalid_request"
    UNSUPPORTED = "unsupported"
    FAILED = "failed"


def _execution_status(
    ok: bool,
    error: ApiError | None,
    terminated: bool,
    truncated: bool,
) -> ExecutionStatus:
    if ok:
        return ExecutionStatus.SUCCESS
    if terminated:
        return ExecutionStatus.TERMINATED
    if truncated:
        return ExecutionStatus.TRUNCATED
    if error is None:  # _validate_result_status rejects this first; defensive typing only.
        return ExecutionStatus.FAILED
    mapping = {
        ErrorCode.TERMINATED: ExecutionStatus.TERMINATED,
        ErrorCode.TRUNCATED: ExecutionStatus.TRUNCATED,
        ErrorCode.TIMEOUT: ExecutionStatus.TIMEOUT,
        ErrorCode.CANCELLED: ExecutionStatus.CANCELLED,
        ErrorCode.STALE_PLAN: ExecutionStatus.STALE_PLAN,
        ErrorCode.PLANNING_FAILED: ExecutionStatus.PLANNER_FAILED,
        ErrorCode.IK_FAILED: ExecutionStatus.PLANNER_FAILED,
        ErrorCode.IK_UNREACHABLE: ExecutionStatus.PLANNER_FAILED,
        ErrorCode.EXECUTION_FAILED: ExecutionStatus.CONTROLLER_FAILED,
        ErrorCode.CONTROLLER_FAILED: ExecutionStatus.CONTROLLER_FAILED,
        ErrorCode.ADAPTER_FAILED: ExecutionStatus.CONTROLLER_FAILED,
        ErrorCode.INVALID_REQUEST: ExecutionStatus.INVALID_REQUEST,
        ErrorCode.UNSUPPORTED: ExecutionStatus.UNSUPPORTED,
    }
    return mapping.get(error.code, ExecutionStatus.FAILED)


@dataclass(frozen=True, slots=True)
class StepResult:
    """Result of exactly one adapter control period.

    ``reward`` and diagnostics marked by sensitive key names are runtime-only.
    Call :meth:`public_view` before exposing a step result to generated code.
    """

    ok: bool
    observation: Observation | None = None
    terminated: bool = False
    truncated: bool = False
    reward: float | None = None
    error: ApiError | None = None
    diagnostics: Mapping[str, object] = field(default_factory=dict)

    def __post_init__(self) -> None:
        ok = _validate_result_status(self.ok, self.error)
        if ok and self.observation is None:
            raise ValueError("a successful StepResult must carry an observation")
        if self.observation is not None and not isinstance(self.observation, Observation):
            raise ValueError("observation must be an Observation or None")
        object.__setattr__(self, "ok", ok)
        object.__setattr__(self, "terminated", _bool(self.terminated, "terminated"))
        object.__setattr__(self, "truncated", _bool(self.truncated, "truncated"))
        if self.reward is not None:
            object.__setattr__(self, "reward", _finite_float(self.reward, "reward"))
        object.__setattr__(self, "diagnostics", _diagnostics(self.diagnostics))

    def public_view(self) -> StepResult:
        """Return a copy without runtime reward or privileged diagnostic data."""
        return replace(
            self,
            reward=None,
            error=_public_error(self.error),
            diagnostics=_public_diagnostics(self.diagnostics),
        )


@dataclass(frozen=True, slots=True)
class ExecutionResult:
    """Recoverable result of timed trajectory execution."""

    ok: bool
    steps_executed: int
    status: ExecutionStatus | str | None = None
    final_observation: Observation | None = None
    terminated: bool = False
    truncated: bool = False
    error: ApiError | None = None
    final_errors: Mapping[str, float] = field(default_factory=dict)
    diagnostics: Mapping[str, object] = field(default_factory=dict)

    def __post_init__(self) -> None:
        ok = _validate_result_status(self.ok, self.error)
        if isinstance(self.steps_executed, bool) or not isinstance(
            self.steps_executed, int | np.integer
        ):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("steps_executed must be a non-negative integer")
        steps = int(self.steps_executed)
        if steps < 0:
            raise ValueError("steps_executed must be a non-negative integer")
        if self.final_observation is not None and not isinstance(
            self.final_observation, Observation
        ):
            raise ValueError("final_observation must be an Observation or None")
        terminated = _bool(self.terminated, "terminated")
        truncated = _bool(self.truncated, "truncated")
        if terminated and truncated:
            raise ValueError("execution cannot be both terminated and truncated")
        if ok and (terminated or truncated):
            raise ValueError("terminated or truncated execution cannot be successful")
        status = self.status
        if status is None:
            status = _execution_status(ok, self.error, terminated, truncated)
        elif isinstance(status, str) and not isinstance(status, ExecutionStatus):
            try:
                status = ExecutionStatus(status)
            except ValueError as exc:
                raise ValueError(f"unknown execution status: {self.status!r}") from exc
        if not isinstance(status, ExecutionStatus):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("status must be an ExecutionStatus")
        if ok != (status is ExecutionStatus.SUCCESS):
            raise ValueError("only success status may have ok=True")
        inferred_status = _execution_status(ok, self.error, terminated, truncated)
        if status is not inferred_status:
            raise ValueError(
                f"status {status.value!r} conflicts with execution outcome "
                f"{inferred_status.value!r}"
            )
        raw_final_errors = _mapping(self.final_errors, "final_errors")
        final_errors = {
            arm: _finite_float(value, f"final_errors[{arm!r}]", minimum=0.0)
            for arm, value in raw_final_errors.items()
        }
        object.__setattr__(self, "ok", ok)
        object.__setattr__(self, "steps_executed", steps)
        object.__setattr__(self, "status", status)
        object.__setattr__(self, "terminated", terminated)
        object.__setattr__(self, "truncated", truncated)
        object.__setattr__(self, "final_errors", MappingProxyType(final_errors))
        object.__setattr__(self, "diagnostics", _diagnostics(self.diagnostics))

    def public_view(self) -> ExecutionResult:
        """Return a copy with privileged diagnostic data removed."""
        return replace(
            self,
            error=_public_error(self.error),
            diagnostics=_public_diagnostics(self.diagnostics),
        )


__all__ = [
    "DEFAULT_EMBODIMENT",
    "DEFAULT_JOINT_NAMES",
    "JOINT_DIMENSION",
    "JOINT_DIMENSIONS",
    "SUPPORTED_JOINT_DIMENSIONS",
    "ArmCommand",
    "CameraObservation",
    "DepthEstimateResult",
    "ExecutionResult",
    "ExecutionStatus",
    "GraspCandidate",
    "GraspSet",
    "IKResult",
    "LocalizationResult",
    "MotionStrategy",
    "ObjectGeometry",
    "Observation",
    "PlanResult",
    "PlanningScene",
    "PointCloud",
    "Pose",
    "RobotAction",
    "RobotPlanningContext",
    "RobotState",
    "Segmentation",
    "SegmentationSet",
    "StepResult",
    "SynchronizedPlanResult",
    "SynchronizedTrajectory",
    "TaskContext",
    "Trajectory",
]
````

## src/cap_harness/api.py

````text
"""Hierarchical public API composed from adapters and injected providers."""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from dataclasses import replace
from typing import Any

import numpy as np

from cap_harness.contracts import (
    DEFAULT_EMBODIMENT,
    JOINT_DIMENSIONS,
    ArmCommand,
    ExecutionResult,
    GraspCandidate,
    GraspSet,
    IKResult,
    LocalizationResult,
    MotionStrategy,
    ObjectGeometry,
    Observation,
    PlanningScene,
    PlanResult,
    PointCloud,
    Pose,
    RobotAction,
    RobotPlanningContext,
    RobotState,
    Segmentation,
    SegmentationSet,
    StepResult,
    SynchronizedPlanResult,
    SynchronizedTrajectory,
    TaskContext,
    Trajectory,
)
from cap_harness.registry import ToolRegistry

from .errors import ApiError, ErrorCode
from .geometry import (
    crop_point_cloud as crop_observed_point_cloud,
)
from .geometry import (
    estimate_geometry as estimate_object_geometry,
)
from .geometry import (
    mask_to_point_cloud as project_mask_to_point_cloud,
)
from .geometry import (
    pose_from_mapping,
    select_top_down_grasp,
)
from .protocols import (
    EnvironmentAdapter,
    GraspProvider,
    IKProvider,
    IntegratedPosePlanningProvider,
    SegmentationProvider,
    TrajectoryPlanningProvider,
)

TRAJECTORY_START_TOLERANCE_RAD = 0.02

#: How far the gripper may have moved since planning before a trajectory counts
#: as stale. Separate from the joint tolerance above because it is a *different
#: unit*: gripper positions are normalized 0-1 widths, not radians, and applying
#: a 0.02 rad joint threshold to them rejects a gripper that has drifted 2% of
#: its travel.
#:
#: Measured on a real bimanual station: a ``set_gripper(OPEN)`` just before planning leaves
#: the jaws still travelling -- ``gripper_full_travel_s`` is 3.0 -- so by the
#: time the plan comes back the width has moved ~0.06. That is physically
#: nothing, and it was rejecting every transit of a pick.
#:
#: Loose on purpose. The stale-plan check exists to catch an ARM that moved
#: since planning, which would invalidate the path; the gripper is commanded
#: independently along the trajectory's own gripper column. This bound only
#: catches a gripper that has changed enough to alter the collision geometry.
TRAJECTORY_START_GRIPPER_TOLERANCE = 0.25


class CapApi:
    """Atomic robot APIs plus explicit higher-level local compositions."""

    #: How many times `go_home()` may re-issue the joint move before giving up.
    #: Three sufficed in every measured case; the cap only stops a wedged arm
    #: from spending an episode trying.
    GO_HOME_MAX_ATTEMPTS = 4

    def __init__(
        self,
        adapter: EnvironmentAdapter,
        *,
        segmentation_provider: SegmentationProvider | None = None,
        grasp_providers: Mapping[str, GraspProvider] | None = None,
        ik_providers: Mapping[str, IKProvider] | None = None,
        trajectory_planning_providers: Mapping[str, TrajectoryPlanningProvider] | None = None,
        integrated_pose_planning_providers: (
            Mapping[str, IntegratedPosePlanningProvider] | None
        ) = None,
        default_camera: str = "agentview",
        default_motion_strategy: MotionStrategy | None = None,
        home_joint_positions: Mapping[str, np.ndarray] | np.ndarray | None = None,
        recorder: object | None = None,
    ) -> None:
        self._adapter = adapter
        declared_embodiment = str(getattr(adapter, "embodiment", DEFAULT_EMBODIMENT))
        self._embodiment = (
            declared_embodiment if declared_embodiment in JOINT_DIMENSIONS else DEFAULT_EMBODIMENT
        )
        self._segmentation_provider = segmentation_provider
        self._grasp_providers = dict(grasp_providers or {})
        self._ik_providers = dict(ik_providers or {})
        self._trajectory_planning_providers = dict(trajectory_planning_providers or {})
        self._integrated_pose_planning_providers = dict(integrated_pose_planning_providers or {})
        self.default_camera = default_camera
        self.default_motion_strategy = default_motion_strategy
        self._recorder = recorder
        self._home_joint_positions: dict[str, np.ndarray] = {}
        # The last jaw target *commanded* per arm, not the last one reached. It fills
        # `gripper_position` for arm commands a program issues without one, so it must
        # record every accepted command including those that do not converge. A grasp
        # that succeeds is exactly such a command: the jaw stalls on the object well
        # short of 0.0, and the adapter reports `ok=False`. Latching only on success
        # therefore left this at the 1.0 from the open-gripper before the approach, and
        # every later move re-commanded the jaw open and dropped the held object.
        self._commanded_gripper_positions: dict[str, float] = {}
        if home_joint_positions is None:
            try:
                self._remember_home(adapter.get_robot_state())
            except RuntimeError:
                # Adapters may be injected before reset. In that case callers must
                # provide an explicit home; never redefine home from a later pose.
                pass
        else:
            source = (
                home_joint_positions
                if isinstance(home_joint_positions, Mapping)
                else {"primary": home_joint_positions}
            )
            for arm, value in source.items():
                joints = np.asarray(value, dtype=np.float64)
                if joints.shape not in {(6,), (7,)} or not bool(np.all(np.isfinite(joints))):
                    raise ValueError(
                        "home_joint_positions must contain finite 6- or 7-joint vectors"
                    )
                self._home_joint_positions[str(arm)] = joints.copy()

    @property
    def configured_providers(self) -> dict[str, object]:
        """Describe configured backends; this is not a service health check."""
        return {
            "segmentation": self._segmentation_provider is not None,
            "ik": tuple(self._ik_providers),
            "trajectory_planning": tuple(self._trajectory_planning_providers),
            "pose_planning": tuple(self._integrated_pose_planning_providers),
        }

    def monitor_snapshot(self) -> dict[str, object]:
        """Return the adapter's live station cache."""
        monitor = getattr(self._adapter, "monitor_snapshot", None)
        if not callable(monitor):
            return {"ok": False, "error": "environment does not support live monitoring"}
        try:
            snapshot = dict(monitor())
        except Exception as exc:
            return {"ok": False, "error": f"station monitor failed: {exc}"}
        snapshot["ok"] = True
        return snapshot

    def get_task_context(self) -> TaskContext:
        """The task's identity, plus how many control ticks it actually has.

        The tick budget is the binding constraint on these benchmarks -- a task
        loses by running out of episode far more often than by being unable to
        reach anything -- and until now a program had no way to read it. Every
        generated program that cared therefore hardcoded a guess, and one that
        guessed 995 went on budgeting against 995 after the harness had given it
        1950, spending none of the extra and finishing on exactly the same tick
        as before. Publishing the number costs nothing and removes a whole class
        of silently stale constant.
        """
        context = self._adapter.get_task_context()
        if self._recorder is None:
            return context
        total = getattr(self._recorder, "max_steps", None)
        used = getattr(self._recorder, "step_count", None)
        if total is None:
            return context
        metadata = dict(context.metadata)
        metadata["episode_max_steps"] = int(total)
        if used is not None:
            metadata["episode_steps_used"] = int(used)
            metadata["episode_steps_remaining"] = max(0, int(total) - int(used))
        return TaskContext(
            suite=context.suite,
            task_id=context.task_id,
            task_name=context.task_name,
            language=context.language,
            family=context.family,
            metadata=metadata,
        )

    def get_observation(self, camera_names: Sequence[str] | str | None = None) -> Observation:
        observation = self._adapter.get_observation()
        if camera_names is not None:
            names = (camera_names,) if isinstance(camera_names, str) else tuple(camera_names)
            if not names or any(name not in observation.cameras for name in names):
                raise ValueError("camera_names must name cameras present in the observation")
            observation = Observation(
                cameras={name: observation.cameras[name] for name in names},
                robot_state=observation.robot_state,
                task_context=observation.task_context,
                timestamp_s=observation.timestamp_s,
            )
        return observation

    def get_robot_state(self) -> RobotState:
        state = self._adapter.get_robot_state()
        if state.embodiment != self._embodiment:
            raise ValueError(
                f"adapter embodiment {self._embodiment!r} returned {state.embodiment!r} RobotState"
            )
        return state

    def segment_text(
        self,
        camera_name: str,
        text: str,
    ) -> SegmentationSet:
        return self._segment_text(camera_name, text, self.get_observation(camera_name))

    def _segment_text(
        self, camera_name: str, text: str, observation: Observation
    ) -> SegmentationSet:
        if self._segmentation_provider is None:
            return self._segmentation_failure("no segmentation provider is configured")
        camera = observation.cameras[camera_name]
        result = self._segmentation_provider.segment_text(camera, text)
        return self._with_camera_name(result, camera_name)

    def segment_points(
        self,
        camera_name: str,
        points_px: np.ndarray,
    ) -> SegmentationSet:
        if self._segmentation_provider is None:
            return self._segmentation_failure("no segmentation provider is configured")
        observation = self.get_observation(camera_name)
        result = self._segmentation_provider.segment_points(
            observation.cameras[camera_name], points_px
        )
        return self._with_camera_name(result, camera_name)

    def mask_to_point_cloud(
        self,
        mask: Segmentation | np.ndarray,
        camera_name: str,
        target_frame: str = "robot_base",
    ) -> PointCloud:
        observation = self.get_observation(camera_name)
        return self._project_mask(
            mask,
            camera_name=camera_name,
            target_frame=target_frame,
            observation=observation,
        )

    def _project_mask(
        self,
        mask: Segmentation | np.ndarray,
        *,
        camera_name: str,
        target_frame: str,
        observation: Observation,
    ) -> PointCloud:
        camera = observation.cameras[camera_name]
        if isinstance(mask, Segmentation):
            segmentation = mask
        else:
            segmentation = Segmentation(
                mask=mask,
                label="object",
                score=1.0,
                camera_name=camera_name,
                frame=camera.frame,
            )
        if segmentation.camera_name not in {camera_name, camera.frame}:
            raise ValueError(
                f"segmentation camera {segmentation.camera_name!r} does not match {camera_name!r}"
            )
        return project_mask_to_point_cloud(camera, segmentation, target_frame=target_frame)

    def estimate_geometry(self, point_cloud: PointCloud) -> ObjectGeometry:
        return estimate_object_geometry(point_cloud)

    def crop_point_cloud(
        self,
        point_cloud: PointCloud,
        lower_xyz: object,
        upper_xyz: object,
    ) -> PointCloud:
        return crop_observed_point_cloud(point_cloud, lower_xyz, upper_xyz)

    def generate_grasps(
        self,
        camera_name: str,
        mask: Segmentation | np.ndarray,
        *,
        backend: str = "contact-graspnet",
        max_candidates: int = 5,
    ) -> GraspSet:
        provider = self._grasp_providers.get(backend)
        if provider is None:
            return GraspSet(
                ok=False,
                error=ApiError(
                    code=ErrorCode.UNSUPPORTED,
                    message=f"grasp backend {backend!r} is not configured",
                    details={"backend": backend},
                ),
            )
        observation = self.get_observation(camera_name)
        camera = observation.cameras[camera_name]
        if isinstance(mask, Segmentation):
            segmentation = mask
        else:
            segmentation = Segmentation(
                mask=mask,
                label="grasp target",
                score=1.0,
                camera_name=camera_name,
                frame=camera.frame,
            )
        try:
            point_cloud = self._stage(
                "mask_to_point_cloud",
                self._project_mask,
                segmentation,
                camera_name=camera_name,
                target_frame=observation.robot_state.base_frame,
                observation=observation,
            )
            scene_point_cloud = self._stage(
                "mask_to_point_cloud",
                self._project_mask,
                np.ones(camera.depth_m.shape, dtype=bool),
                camera_name=camera_name,
                target_frame=observation.robot_state.base_frame,
                observation=observation,
            )
        except ValueError as exc:
            return GraspSet(
                ok=False,
                error=ApiError(
                    code=ErrorCode.POINT_CLOUD_FAILED,
                    message=f"cannot project grasp mask: {exc}",
                ),
            )
        # Caller-chosen, because a caller that filters candidates itself -- by
        # approach direction, say -- needs more of them than one that takes the
        # first. Five was fine as a fixed ceiling only while nobody filtered.
        return provider.generate_grasps(
            point_cloud,
            scene_point_cloud=scene_point_cloud,
            max_candidates=max_candidates,
        )

    def _resolve_arm(self, arm: str) -> str:
        """An embodiment's own name for the arm the caller asked for.

        Arm vocabularies differ between embodiments and there is no translation
        between them here: the shared signatures default to
        ``"primary"``/``"secondary"``, single-arm backends expose exactly
        ``"primary"``, and a bimanual embodiment may name its arms
        ``"left"``/``"right"``. Without a mapping every shared default fails on
        such an embodiment -- ``set_gripper()`` with no arm reports
        ``execution_failed``, and ``plan_motion()`` reports
        ``robot state has no arm 'primary'``.

        An embodiment that knows a mapping exposes ``resolve_arm``; anything
        else is passed through unchanged, so no other backend is affected. The
        mapping is DATA, not a convention hardcoded here: which physical arm is
        "primary" is a property of how a station is set up and rigged, and its
        profile is what declares it.
        """
        resolver = getattr(self._adapter, "resolve_arm", None)
        if not callable(resolver):
            return arm
        try:
            return str(resolver(arm))
        # Best-effort arm resolution must not mask the embodiment error.
        except Exception:
            # embodiment's own error, not be masked by the resolver failing.
            return arm

    def solve_ik(
        self,
        target_pose: Pose,
        seed_joints: np.ndarray | None = None,
        *,
        arm: str = "primary",
        backend: str | None = None,
    ) -> IKResult:
        arm = self._resolve_arm(arm)
        if backend is None:
            # The benchmark's default IK solver (pyroki unless the runner configured another,
            # as the BEHAVIOR runner does with its in-process cuRobo).
            strategy = self.default_motion_strategy
            backend = strategy.ik_solver if strategy is not None else "pyroki"
        provider = self._ik_providers.get(backend)
        if provider is None:
            return IKResult(
                ok=False,
                arm=arm,
                embodiment=self._embodiment,
                error=ApiError(
                    code=ErrorCode.UNSUPPORTED,
                    message=f"IK backend {backend!r} is not configured",
                    details={"backend": backend},
                ),
            )
        state = self.get_robot_state()
        if arm not in state.joint_positions:
            return IKResult(
                ok=False,
                arm=arm,
                embodiment=self._embodiment,
                error=ApiError(code=ErrorCode.NOT_FOUND, message=f"unknown arm {arm!r}"),
            )
        if seed_joints is not None:
            joint_dimension = state.joint_positions[arm].shape[0]
            try:
                seed = np.asarray(seed_joints, dtype=np.float64)
            except (TypeError, ValueError) as exc:
                return IKResult(
                    ok=False,
                    embodiment=self._embodiment,
                    error=ApiError(
                        code=ErrorCode.INVALID_REQUEST,
                        message=(
                            f"seed_joints must be a finite {joint_dimension}-joint vector: {exc}"
                        ),
                    ),
                )
            if seed.shape != (joint_dimension,) or not bool(np.all(np.isfinite(seed))):
                return IKResult(
                    ok=False,
                    embodiment=self._embodiment,
                    error=ApiError(
                        code=ErrorCode.INVALID_REQUEST,
                        message=(f"seed_joints must be a finite {joint_dimension}-joint vector"),
                    ),
                )
            state = self._state_with_arm_joints(state, arm, seed)
        adapter_transform = getattr(self._adapter, "ik_request", None)
        if callable(adapter_transform):
            try:
                target_pose, state = adapter_transform(target_pose, state, arm)
            except (TypeError, ValueError) as exc:
                return IKResult(
                    ok=False,
                    arm=arm,
                    embodiment=self._embodiment,
                    error=ApiError(code=ErrorCode.INVALID_REQUEST, message=str(exc)),
                )
        solve_with_context = getattr(provider, "solve_ik_with_context", None)
        if callable(solve_with_context):
            result = solve_with_context(
                target_pose,
                state,
                arm=arm,
                context=self._planning_context(state),
            )
        else:
            result = provider.solve_ik(target_pose, state, arm=arm)
        if result.ok and (
            result.joint_positions is None
            or result.joint_positions.shape != state.joint_positions[arm].shape
            or result.arm != arm
        ):
            return IKResult(
                ok=False,
                arm=arm,
                error=ApiError(
                    code=ErrorCode.IK_FAILED,
                    message="IK provider returned a solution for the wrong arm dimension",
                    details={
                        "arm": arm,
                        "expected_dimension": state.joint_positions[arm].shape[0],
                        "returned_dimension": (
                            None
                            if result.joint_positions is None
                            else result.joint_positions.shape[0]
                        ),
                    },
                ),
            )
        return result

    def plan_motion(
        self,
        goal: Pose | np.ndarray,
        start_joints: np.ndarray | None = None,
        *,
        arm: str = "primary",
        strategy: MotionStrategy | None = None,
        target_point_cloud: PointCloud | None = None,
    ) -> PlanResult:
        arm = self._resolve_arm(arm)
        if strategy is None:
            strategy = self.default_motion_strategy or MotionStrategy()
        if not isinstance(strategy, MotionStrategy):
            return self._plan_failure(
                ErrorCode.INVALID_REQUEST,
                "strategy must be a MotionStrategy",
            )
        if target_point_cloud is not None and not isinstance(target_point_cloud, PointCloud):
            return self._plan_failure(
                ErrorCode.INVALID_REQUEST,
                "target_point_cloud must be a PointCloud or None",
            )
        state = self.get_robot_state()
        if target_point_cloud is not None and target_point_cloud.frame != state.base_frame:
            return self._plan_failure(
                ErrorCode.INVALID_REQUEST,
                f"target point cloud is in frame {target_point_cloud.frame!r}, "
                f"expected {state.base_frame!r}",
            )
        if arm not in state.joint_positions:
            return self._plan_failure(ErrorCode.NOT_FOUND, f"robot state has no arm {arm!r}")
        joint_dimension = state.joint_positions[arm].shape[0]
        if start_joints is None:
            start = state.joint_positions[arm]
        else:
            try:
                start = np.asarray(start_joints, dtype=np.float64)
            except (TypeError, ValueError) as exc:
                return self._plan_failure(
                    ErrorCode.INVALID_REQUEST,
                    f"start_joints must be a finite {joint_dimension}-joint vector",
                    details={"error": str(exc)},
                )
            if start.shape != (joint_dimension,) or not bool(np.all(np.isfinite(start))):
                return self._plan_failure(
                    ErrorCode.INVALID_REQUEST,
                    f"start_joints must be a finite {joint_dimension}-joint vector",
                )
        planning_state = self._state_with_arm_joints(state, arm, start)
        timing_options = {
            name: value
            for name, value in (
                ("time_dilation_factor", strategy.time_dilation_factor),
                ("interpolation_dt_s", strategy.interpolation_dt_s),
                ("maximum_trajectory_dt_s", strategy.maximum_trajectory_dt_s),
            )
            if value is not None
        }
        if isinstance(goal, Pose) and strategy.pose_planner != "composed":
            provider = self._integrated_pose_planning_providers.get(strategy.pose_planner)
            if provider is None:
                return self._plan_failure(
                    ErrorCode.UNSUPPORTED,
                    f"integrated pose planner {strategy.pose_planner!r} is not configured",
                )
            planning_goal = goal
            adapter_transform = getattr(self._adapter, "ik_request", None)
            if callable(adapter_transform):
                try:
                    planning_goal, planning_state = adapter_transform(
                        planning_goal, planning_state, arm
                    )
                except (TypeError, ValueError) as exc:
                    return self._plan_failure(ErrorCode.INVALID_REQUEST, str(exc))
            try:
                result = provider.plan_to_pose(
                    planning_state,
                    planning_goal,
                    arm=arm,
                    gripper_position=self._commanded_gripper_position(state, arm),
                    scene=self._planning_scene_request(
                        arm,
                        target_point_cloud=target_point_cloud,
                    ),
                    context=self._planning_context(planning_state),
                    **timing_options,
                )
                validated = self._validate_plan_start(result, planning_state)
                return self._bind_plan_start(validated, state)
            # Best-effort arm resolution must not mask the embodiment error.
            except Exception as exc:
                return self._plan_failure(
                    ErrorCode.PLANNING_FAILED,
                    f"integrated pose planning provider failed: {exc}",
                    details={"exception_type": type(exc).__name__},
                )

        planner = "joint_interpolation"
        if isinstance(goal, Pose):
            ik_result = self.solve_ik(
                goal,
                start,
                arm=arm,
                backend=strategy.ik_solver,
            )
            if not ik_result.ok:
                return PlanResult(ok=False, error=ik_result.error)
            joint_goal = ik_result.joint_positions
            planner = f"{strategy.ik_solver}+joint_interpolation"
        else:
            try:
                joint_goal = np.asarray(goal, dtype=np.float64)
            except (TypeError, ValueError) as exc:
                return self._plan_failure(
                    ErrorCode.INVALID_REQUEST,
                    f"joint target must be a finite {joint_dimension}-joint vector",
                    details={"error": str(exc)},
                )
            if joint_goal.shape != (joint_dimension,) or not bool(np.all(np.isfinite(joint_goal))):
                return self._plan_failure(
                    ErrorCode.INVALID_REQUEST,
                    f"joint target must be a finite {joint_dimension}-joint vector",
                )
        assert joint_goal is not None

        if strategy.trajectory_planner != "interpolation":
            provider = self._trajectory_planning_providers.get(strategy.trajectory_planner)
            if provider is None:
                return self._plan_failure(
                    ErrorCode.UNSUPPORTED,
                    f"trajectory planner {strategy.trajectory_planner!r} is not configured",
                )
            try:
                result = provider.plan_to_joints(
                    planning_state,
                    joint_goal,
                    arm=arm,
                    gripper_position=self._commanded_gripper_position(state, arm),
                    scene=self._planning_scene(target_point_cloud=target_point_cloud),
                    context=self._planning_context(state),
                    **timing_options,
                )
                return self._validate_plan_start(result, planning_state)
            # Best-effort arm resolution must not mask the embodiment error.
            except Exception as exc:
                return self._plan_failure(
                    ErrorCode.PLANNING_FAILED,
                    f"trajectory planning provider failed: {exc}",
                    details={"exception_type": type(exc).__name__},
                )

        step_limits, dt_s = self._controller_step_limits(start, joint_goal, arm)
        difference = joint_goal - start
        waypoint_count = max(
            1,
            int(np.max(np.ceil(np.abs(difference) / step_limits))),
        )
        fractions = np.arange(1, waypoint_count + 1, dtype=np.float64) / waypoint_count
        waypoints = start + fractions[:, None] * difference
        waypoints[-1] = joint_goal
        gripper = self._commanded_gripper_position(state, arm)
        trajectory = Trajectory(
            joint_positions=waypoints,
            dt_s=dt_s,
            joint_names=state.joint_names[arm],
            planner=planner,
            collision_aware=False,
            expected_start=planning_state,
            arm=arm,
            gripper_positions=np.full(waypoint_count, gripper, dtype=np.float64),
            embodiment=self._embodiment,
        )
        return PlanResult(
            ok=True,
            trajectory=trajectory,
            diagnostics={
                "ik_solver": strategy.ik_solver,
                "trajectory_planner": strategy.trajectory_planner,
                "max_joint_delta_rad": float(np.max(step_limits)),
            },
        )

    def plan_synchronized_motion(
        self,
        targets: Mapping[str, Pose | np.ndarray],
        strategy: MotionStrategy | None = None,
    ) -> SynchronizedPlanResult:
        if strategy is None:
            strategy = self.default_motion_strategy or MotionStrategy(
                pose_planner="curobo-integrated"
            )
        if not isinstance(strategy, MotionStrategy):
            return SynchronizedPlanResult(
                ok=False,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message="strategy must be a MotionStrategy",
                ),
            )
        state = self.get_robot_state()
        normalized_targets, error = self._normalize_synchronized_targets(targets, state)
        if error is not None:
            return SynchronizedPlanResult(ok=False, error=error)
        assert normalized_targets is not None
        provider = self._integrated_pose_planning_providers.get(strategy.pose_planner)
        if provider is None:
            return SynchronizedPlanResult(
                ok=False,
                error=ApiError(
                    code=ErrorCode.UNSUPPORTED,
                    message=(
                        f"integrated pose planner {strategy.pose_planner!r} is not configured"
                    ),
                ),
            )
        grippers = {arm: self._commanded_gripper_position(state, arm) for arm in state.arms}
        timing_options = {
            name: value
            for name, value in (
                ("time_dilation_factor", strategy.time_dilation_factor),
                ("interpolation_dt_s", strategy.interpolation_dt_s),
                ("maximum_trajectory_dt_s", strategy.maximum_trajectory_dt_s),
            )
            if value is not None
        }
        try:
            result = provider.plan_synchronized_motion(
                state,
                normalized_targets,
                gripper_positions=grippers,
                scene=self._planning_scene(),
                context=self._planning_context(state),
                **timing_options,
            )
            return self._validate_synchronized_plan_start(result, state)
        # Best-effort arm resolution must not mask the embodiment error.
        except Exception as exc:
            return SynchronizedPlanResult(
                ok=False,
                error=ApiError(
                    code=ErrorCode.PLANNING_FAILED,
                    message=f"synchronized motion planning provider failed: {exc}",
                    details={"exception_type": type(exc).__name__},
                ),
            )

    def move_synchronized(
        self,
        targets: Mapping[str, Pose | np.ndarray],
        tolerance: float = 0.01,
        max_steps: int = 120,
        strategy: MotionStrategy | None = None,
    ) -> ExecutionResult:
        validation = self._motion_options(tolerance, max_steps)
        if validation is not None:
            return validation
        state = self.get_robot_state()
        normalized_targets, error = self._normalize_synchronized_targets(targets, state)
        if error is not None:
            return ExecutionResult(ok=False, steps_executed=0, error=error)
        assert normalized_targets is not None
        plan = self._stage(
            "plan_synchronized_motion",
            self.plan_synchronized_motion,
            normalized_targets,
            strategy,
        )
        if not plan.ok or plan.trajectory is None:
            return ExecutionResult(ok=False, steps_executed=0, error=plan.error)
        if plan.trajectory.waypoint_count > max_steps:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message="planned synchronized trajectory exceeds max_steps",
                    details={
                        "waypoint_count": plan.trajectory.waypoint_count,
                        "max_steps": max_steps,
                    },
                ),
            )
        execution = self._stage("execute_trajectory", self.execute_trajectory, plan.trajectory)
        if not execution.ok:
            return execution
        final_state = self._execution_state(execution)
        final_errors: dict[str, float] = {}
        for arm, target in normalized_targets.items():
            if isinstance(target, Pose):
                current = final_state.end_effector_poses[arm]
                position_error = float(np.linalg.norm(current.position - target.position))
                orientation_error = float(
                    2.0
                    * np.arccos(
                        np.clip(
                            abs(np.dot(current.quaternion_wxyz, target.quaternion_wxyz)),
                            0.0,
                            1.0,
                        )
                    )
                )
                final_errors[arm] = position_error
                if position_error > tolerance or orientation_error > np.deg2rad(10.0):
                    return ExecutionResult(
                        ok=False,
                        steps_executed=execution.steps_executed,
                        final_observation=execution.final_observation,
                        terminated=execution.terminated,
                        truncated=execution.truncated,
                        error=ApiError(
                            code=ErrorCode.CONTROLLER_FAILED,
                            message=f"synchronized pose target for {arm!r} is outside tolerance",
                            details={
                                "arm": arm,
                                "position_error_m": position_error,
                                "orientation_error_rad": orientation_error,
                            },
                        ),
                        final_errors=final_errors,
                    )
            else:
                joint_error = float(np.max(np.abs(final_state.joint_positions[arm] - target)))
                final_errors[arm] = joint_error
                if joint_error > tolerance:
                    return ExecutionResult(
                        ok=False,
                        steps_executed=execution.steps_executed,
                        final_observation=execution.final_observation,
                        terminated=execution.terminated,
                        truncated=execution.truncated,
                        error=ApiError(
                            code=ErrorCode.CONTROLLER_FAILED,
                            message=f"synchronized joint target for {arm!r} is outside tolerance",
                            details={
                                "arm": arm,
                                "joint_error_rad": joint_error,
                                "tolerance_rad": tolerance,
                            },
                        ),
                        final_errors=final_errors,
                    )
        return ExecutionResult(
            ok=True,
            steps_executed=execution.steps_executed,
            final_observation=execution.final_observation,
            final_errors=final_errors,
            diagnostics=execution.diagnostics,
        )

    def step(self, action: RobotAction) -> StepResult:
        if action.embodiment != self._embodiment:
            return StepResult(
                ok=False,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message=(
                        f"action embodiment {action.embodiment!r} does not match "
                        f"adapter embodiment {self._embodiment!r}"
                    ),
                ),
            )
        try:
            result = self._adapter.step(action)
        # Best-effort arm resolution must not mask the embodiment error.
        except Exception as exc:
            result = StepResult(
                ok=False,
                error=ApiError(
                    code=ErrorCode.ADAPTER_FAILED,
                    message=f"adapter step failed: {exc}",
                    details={"exception_type": type(exc).__name__},
                ),
            )
        public = result.public_view()
        if public.ok:
            for arm, command in action.arms.items():
                if command.gripper_position is not None:
                    self._commanded_gripper_positions[arm] = command.gripper_position
        return public

    def execute_trajectory(
        self,
        trajectory: Trajectory | SynchronizedTrajectory,
        stop_on_termination: bool = True,
    ) -> ExecutionResult:
        if trajectory.embodiment != self._embodiment:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message=(
                        f"trajectory embodiment {trajectory.embodiment!r} does not match "
                        f"adapter embodiment {self._embodiment!r}"
                    ),
                ),
            )
        if type(stop_on_termination) is not bool:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message="stop_on_termination must be a bool",
                ),
            )
        if not stop_on_termination:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.UNSUPPORTED,
                    message=(
                        "stop_on_termination=False is unsupported; adapters must stop "
                        "on termination or truncation"
                    ),
                ),
            )
        stale = self._stale_trajectory_result(trajectory)
        if stale is not None:
            return stale
        try:
            result = self._adapter.execute_trajectory(trajectory)
        except (TypeError, ValueError) as exc:
            result = ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message=f"invalid trajectory: {exc}",
                ),
            )
        # Best-effort arm resolution must not mask the embodiment error.
        except Exception as exc:
            result = ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.EXECUTION_FAILED,
                    message=f"trajectory execution failed: {exc}",
                    details={"exception_type": type(exc).__name__},
                ),
            )
        public = result.public_view()
        if public.ok:
            if isinstance(trajectory, Trajectory):
                if trajectory.gripper_positions is not None:
                    self._commanded_gripper_positions[trajectory.arm] = float(
                        trajectory.gripper_positions[-1]
                    )
            elif trajectory.gripper_positions is not None:
                self._commanded_gripper_positions.update(
                    {arm: float(values[-1]) for arm, values in trajectory.gripper_positions.items()}
                )
        return public

    def set_grippers(self, positions: Mapping[str, float]) -> ExecutionResult:
        """Command every arm's gripper together in exactly one control tick."""
        state = self.get_robot_state()
        if not isinstance(positions, Mapping) or set(positions) != set(state.arms):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message="positions must name every robot arm",
                    details={
                        "expected_arms": state.arms,
                        "position_arms": tuple(positions) if isinstance(positions, Mapping) else (),
                    },
                ),
            )
        normalized: dict[str, float] = {}
        for arm in state.arms:
            try:
                numeric = float(positions[arm])
            except (TypeError, ValueError):
                numeric = float("nan")
            if not np.isfinite(numeric) or not 0.0 <= numeric <= 1.0:
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        code=ErrorCode.INVALID_REQUEST,
                        message=f"gripper position for {arm!r} must be finite and in [0, 1]",
                    ),
                )
            if not self._gripper_target_is_holdable(numeric):
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        code=ErrorCode.UNSUPPORTED,
                        message=(
                            f"gripper for {arm!r} only holds fully open (1.0) or fully closed "
                            f"(0.0); {numeric} cannot be held -- use open_gripper() or "
                            "close_gripper()"
                        ),
                        details={"requested": numeric, "holdable": (0.0, 1.0)},
                    ),
                )
            normalized[arm] = numeric
        adapter_method = getattr(self._adapter, "set_grippers", None)
        if callable(adapter_method):
            try:
                execution = adapter_method(normalized).public_view()
            # Best-effort arm resolution must not mask the embodiment error.
            except Exception as exc:
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        code=ErrorCode.CONTROLLER_FAILED,
                        message=f"coordinated gripper execution failed: {exc}",
                        details={"exception_type": type(exc).__name__},
                    ),
                )
            self._commanded_gripper_positions.update(normalized)
            return execution
        step = self.step(
            RobotAction(
                arms={
                    arm: ArmCommand(
                        mode="joint_position",
                        target=state.joint_positions[arm],
                        gripper_position=normalized[arm],
                        embodiment=self._embodiment,
                    )
                    for arm in state.arms
                }
            )
        )
        error = step.error
        if step.ok and (step.terminated or step.truncated):
            error = self._terminal_error(step.terminated, step.truncated)
        execution = ExecutionResult(
            ok=step.ok and not step.terminated and not step.truncated,
            steps_executed=1 if step.ok else 0,
            final_observation=step.observation,
            terminated=step.terminated,
            truncated=step.truncated,
            error=error,
        ).public_view()
        self._commanded_gripper_positions.update(normalized)
        return execution

    def _gripper_target_is_holdable(self, value: float) -> bool:
        """Whether this embodiment can actually hold an intermediate jaw width.

        On LIBERO and Robosuite/RoboCasa the gripper action is a **velocity**,
        not a position: `simple_grip.set_goal` assigns `goal_qvel`, so the sign
        chooses a direction and the magnitude only chooses how fast the jaw
        travels to its stop. An intermediate target is therefore unreachable --
        the jaw passes through it and keeps going -- and the wait loop spends
        its whole budget on a state that cannot occur. Measured on
        `libero_10_swap/task_7`: `set_gripper(0.669)` and `set_gripper(0.933)`
        each burned 60 ticks and finished fully OPEN, 12% of the episode.

        YAM commands a real position target, so it is unaffected and the
        default stays permissive.
        """
        if getattr(self._adapter, "gripper_holds_intermediate", True):
            return True
        return min(abs(value), abs(1.0 - value)) <= 1e-6

    def set_gripper(self, position: float, *, arm: str = "primary") -> ExecutionResult:
        arm = self._resolve_arm(arm)
        try:
            numeric = float(position)
        except (TypeError, ValueError):
            numeric = float("nan")
        if not np.isfinite(numeric) or not 0.0 <= numeric <= 1.0:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message="gripper position must be finite and in [0, 1]",
                ),
            )
        if not self._gripper_target_is_holdable(numeric):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.UNSUPPORTED,
                    message=(
                        "this gripper only holds fully open (1.0) or fully closed (0.0); "
                        f"{numeric} cannot be held -- use open_gripper() or close_gripper(), "
                        "and control approach clearance with geometry instead"
                    ),
                    details={"requested": numeric, "holdable": (0.0, 1.0)},
                ),
            )
        adapter_method = getattr(self._adapter, "set_gripper", None)
        if callable(adapter_method):
            try:
                result = adapter_method(numeric, arm=arm).public_view()
                self._commanded_gripper_positions[arm] = numeric
                return result
            # Best-effort arm resolution must not mask the embodiment error.
            except Exception as exc:
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        code=ErrorCode.EXECUTION_FAILED,
                        message=f"gripper execution failed: {exc}",
                    ),
                )
        state = self.get_robot_state()
        if arm not in state.joint_positions:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(code=ErrorCode.NOT_FOUND, message=f"unknown arm {arm!r}"),
            )
        result = self.step(
            RobotAction(
                arms={
                    arm: ArmCommand(
                        mode="joint_position",
                        target=state.joint_positions[arm],
                        gripper_position=numeric,
                        embodiment=self._embodiment,
                    )
                }
            )
        )
        execution = ExecutionResult(
            ok=result.ok and not result.terminated and not result.truncated,
            steps_executed=1 if result.ok else 0,
            final_observation=result.observation,
            terminated=result.terminated,
            truncated=result.truncated,
            error=result.error
            or (
                self._terminal_error(result.terminated, result.truncated)
                if result.terminated or result.truncated
                else None
            ),
        ).public_view()
        self._commanded_gripper_positions[arm] = numeric
        return execution

    def localize_object(
        self,
        query: str,
        *,
        camera_name: str | None = None,
        target_frame: str | None = None,
    ) -> LocalizationResult:
        observation = self.get_observation()
        name = camera_name or self.default_camera
        segmentation_set = self._stage("segment_text", self._segment_text, name, query, observation)
        if not segmentation_set.ok:
            return LocalizationResult(ok=False, error=segmentation_set.error)
        segmentation = segmentation_set.segmentations[0]
        if target_frame is None:
            target_frame = observation.robot_state.base_frame
        try:
            point_cloud = self._stage(
                "mask_to_point_cloud",
                self._project_mask,
                segmentation,
                camera_name=name,
                target_frame=target_frame,
                observation=observation,
            )
            geometry = self._stage("estimate_geometry", self.estimate_geometry, point_cloud)
        except ValueError as exc:
            return LocalizationResult(
                ok=False,
                segmentation=segmentation,
                error=ApiError(
                    code=ErrorCode.POINT_CLOUD_FAILED,
                    message=f"object localization geometry failed: {exc}",
                ),
            )
        return LocalizationResult(
            ok=True,
            geometry=geometry,
            segmentation=segmentation,
            point_cloud=point_cloud,
        )

    def select_grasp(
        self,
        grasps: GraspSet,
        strategy: str = "top_down",
    ) -> GraspCandidate | None:
        if not grasps.ok:
            return None
        if strategy == "top_down":
            return select_top_down_grasp(grasps)
        if strategy == "highest_score":
            return max(grasps.grasps, key=lambda candidate: candidate.score, default=None)
        raise ValueError("strategy must be 'top_down' or 'highest_score'")

    def move_to_joints(
        self,
        target: np.ndarray,
        tolerance: float = 0.01,
        max_steps: int = 120,
        *,
        arm: str = "primary",
    ) -> ExecutionResult:
        arm = self._resolve_arm(arm)
        validation = self._motion_options(tolerance, max_steps)
        if validation is not None:
            return validation
        try:
            goal = np.asarray(target, dtype=np.float64)
        except (TypeError, ValueError) as exc:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message=f"joint target must be a finite arm joint vector: {exc}",
                ),
            )
        final_observation: Observation | None = None
        initial_state = self.get_robot_state()
        if arm not in initial_state.joint_positions:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(code=ErrorCode.NOT_FOUND, message=f"unknown arm {arm!r}"),
            )
        joint_dimension = initial_state.joint_positions[arm].shape[0]
        if goal.shape != (joint_dimension,) or not bool(np.all(np.isfinite(goal))):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message=f"joint target must be a finite {joint_dimension}-joint vector",
                ),
            )
        for step_index in range(max_steps):
            state = self.get_robot_state()
            gripper_target = self._commanded_gripper_position(state, arm)
            result = self.step(
                RobotAction(
                    arms={
                        arm: ArmCommand(
                            mode="joint_position",
                            target=goal,
                            gripper_position=gripper_target,
                            embodiment=self._embodiment,
                        )
                    }
                )
            )
            if not result.ok:
                return ExecutionResult(
                    ok=False,
                    steps_executed=step_index,
                    final_observation=final_observation,
                    error=result.error,
                )
            final_observation = result.observation
            final_state = final_observation.robot_state
            error_rad = float(np.max(np.abs(final_state.joint_positions[arm] - goal)))
            if result.terminated or result.truncated:
                return ExecutionResult(
                    ok=False,
                    steps_executed=step_index + 1,
                    final_observation=final_observation,
                    terminated=result.terminated,
                    truncated=result.truncated,
                    error=self._terminal_error(result.terminated, result.truncated),
                    final_errors={arm: error_rad},
                )
            if error_rad <= tolerance:
                return ExecutionResult(
                    ok=True,
                    steps_executed=step_index + 1,
                    final_observation=final_observation,
                    terminated=result.terminated,
                    truncated=result.truncated,
                    final_errors={arm: error_rad},
                    diagnostics={"joint_error_rad": error_rad},
                )
        return ExecutionResult(
            ok=False,
            steps_executed=step_index + 1 if final_observation is not None else 0,
            final_observation=final_observation,
            terminated=result.terminated if final_observation is not None else False,
            truncated=result.truncated if final_observation is not None else False,
            error=ApiError(
                code=ErrorCode.TIMEOUT,
                message=f"joint target did not converge within max_steps={max_steps}",
                details={
                    "reason": "joint_convergence_timeout",
                    "joint_error_rad": error_rad,
                    "tolerance_rad": tolerance,
                },
            ),
            final_errors={arm: error_rad},
        )

    def move_to_pose(
        self,
        target_pose: Pose | Mapping[str, Any],
        tolerance: float = 0.01,
        max_steps: int = 120,
        *,
        arm: str = "primary",
        strategy: MotionStrategy | None = None,
    ) -> ExecutionResult:
        """Move to a Pose or an absolute position/frame plus quaternion or rpy_deg."""
        arm = self._resolve_arm(arm)
        validation = self._motion_options(tolerance, max_steps)
        if validation is not None:
            return validation
        try:
            if isinstance(target_pose, Mapping):
                target_pose = pose_from_mapping(target_pose)
            elif not isinstance(target_pose, Pose):
                raise ValueError("target_pose must be a Pose or pose mapping")
        except (TypeError, ValueError) as exc:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(ErrorCode.INVALID_REQUEST, str(exc)),
            )
        plan = self._stage(
            "plan_motion",
            self.plan_motion,
            target_pose,
            arm=arm,
            strategy=strategy,
        )
        if not plan.ok or plan.trajectory is None:
            return ExecutionResult(ok=False, steps_executed=0, error=plan.error)
        if len(plan.trajectory.joint_positions) > max_steps:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message="planned trajectory exceeds max_steps",
                    details={
                        "waypoint_count": len(plan.trajectory.joint_positions),
                        "max_steps": max_steps,
                    },
                ),
            )
        execution = self._stage(
            "execute_trajectory",
            self.execute_trajectory,
            plan.trajectory,
        )
        if not execution.ok:
            return execution
        return self._validate_pose_execution(execution, target_pose, tolerance, arm)

    def _validate_pose_execution(
        self,
        execution: ExecutionResult,
        target_pose: Pose,
        tolerance: float,
        arm: str,
    ) -> ExecutionResult:
        final_state = self._execution_state(execution)
        current_pose = final_state.end_effector_poses[arm]
        if current_pose.frame != target_pose.frame:
            return ExecutionResult(
                ok=False,
                steps_executed=execution.steps_executed,
                final_observation=execution.final_observation,
                terminated=execution.terminated,
                truncated=execution.truncated,
                error=ApiError(
                    code=ErrorCode.CONTROLLER_FAILED,
                    message="final end-effector pose frame does not match target frame",
                ),
            )
        position_error_m = float(np.linalg.norm(current_pose.position - target_pose.position))
        quaternion_dot = float(
            np.clip(
                abs(np.dot(current_pose.quaternion_wxyz, target_pose.quaternion_wxyz)),
                0.0,
                1.0,
            )
        )
        orientation_error_rad = float(2.0 * np.arccos(quaternion_dot))
        orientation_tolerance_rad = float(np.deg2rad(10.0))
        if position_error_m > tolerance or orientation_error_rad > orientation_tolerance_rad:
            return ExecutionResult(
                ok=False,
                steps_executed=execution.steps_executed,
                final_observation=execution.final_observation,
                terminated=execution.terminated,
                truncated=execution.truncated,
                error=ApiError(
                    code=ErrorCode.CONTROLLER_FAILED,
                    message="final end-effector pose is outside target tolerance",
                    details={
                        "position_error_m": position_error_m,
                        "position_tolerance_m": tolerance,
                        "orientation_error_rad": orientation_error_rad,
                        "orientation_tolerance_rad": orientation_tolerance_rad,
                    },
                ),
                final_errors={arm: position_error_m},
            )
        return ExecutionResult(
            ok=True,
            steps_executed=execution.steps_executed,
            final_observation=execution.final_observation,
            terminated=execution.terminated,
            truncated=execution.truncated,
            final_errors={arm: position_error_m},
            diagnostics={
                "position_error_m": position_error_m,
                "orientation_error_rad": orientation_error_rad,
                "trajectory_executed": True,
                "joint_target_converged": execution.ok,
            },
        )

    def open_gripper(self, *, arm: str = "primary") -> ExecutionResult:
        arm = self._resolve_arm(arm)
        return self.set_gripper(1.0, arm=arm)

    def close_gripper(self, *, arm: str = "primary") -> ExecutionResult:
        arm = self._resolve_arm(arm)
        adapter_method = getattr(self._adapter, "close_gripper", None)
        if callable(adapter_method):
            try:
                result = adapter_method(arm=arm).public_view()
                self._commanded_gripper_positions[arm] = 0.0
                return result
            # Best-effort arm resolution must not mask the embodiment error.
            except Exception as exc:
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        code=ErrorCode.EXECUTION_FAILED,
                        message=f"gripper close failed: {exc}",
                    ),
                )
        return self.set_gripper(0.0, arm=arm)

    def go_home(self, *, arm: str = "primary") -> ExecutionResult:
        """Home through the embodiment's own primitive when it has one.

        An embodiment that ships a ``go_home`` knows something this layer does
        not: on a physical station it is one smoothly interpolated command to
        the pose the station is *calibrated* against, rather than a stepping
        loop toward whatever configuration this API happened to observe first.

        The fallback below remembers the state at construction and calls that
        home. For a harness run that is the post-reset pose, which is usually
        the same place -- but only usually, and it is not the profile's home.

        Delegating also fixes a silent no-op. This layer's arm names default to
        ``"primary"`` while a bimanual embodiment's may be ``left``/``right``,
        so the fallback path found no home joints for the default arm and
        returned ``UNSUPPORTED``: every bare ``go_home()`` in such a program did
        nothing and reported it in a result the program then discarded. An
        adapter's own ``go_home`` may home both arms and ignore the arm name by
        design, so the call works.
        """
        arm = self._resolve_arm(arm)
        adapter_method = getattr(self._adapter, "go_home", None)
        if callable(adapter_method):
            try:
                return adapter_method(arm=arm).public_view()
            # Best-effort arm resolution must not mask the embodiment error.
            except Exception as exc:
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        code=ErrorCode.EXECUTION_FAILED,
                        message=f"adapter go_home failed: {exc}",
                    ),
                )
        if arm not in self._home_joint_positions:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.UNSUPPORTED,
                    message=f"no home joints are configured for arm {arm!r}",
                ),
            )
        # `move_to_joints` caps at 120 ticks and the joint servo droops: a step
        # past roughly 0.24 rad does not converge inside one cap. Out of a folded
        # pose that is not a corner case -- measured on RoboCasa
        # `drawer_utensil_sort:0`, homing from the pulled-open drawer needed three
        # consecutive calls (gaps 0.3724 -> 0.2743 -> 0.0029, 353 ticks) and one
        # call returned ok=False having moved most of the way. A caller that
        # believes that `ok=False` is left with the arm stranded, and every later
        # `move_to_pose` then crawls against a residual it cannot close.
        #
        # The calls accumulate, so repeat until it arrives. `go_home()` promises a
        # configuration, not an attempt, and unlike `move_to_joints` it takes no
        # `max_steps` for a caller to raise.
        home = self._home_joint_positions[arm]
        result = self.move_to_joints(home, arm=arm)
        attempts = 1
        while (
            not result.ok
            and not result.terminated
            and not result.truncated
            and attempts < self.GO_HOME_MAX_ATTEMPTS
        ):
            follow_up = self.move_to_joints(home, arm=arm)
            attempts += 1
            result = ExecutionResult(
                ok=follow_up.ok,
                steps_executed=result.steps_executed + follow_up.steps_executed,
                final_observation=follow_up.final_observation,
                terminated=follow_up.terminated,
                truncated=follow_up.truncated,
                error=follow_up.error,
                final_errors=follow_up.final_errors,
                diagnostics={"go_home_attempts": attempts},
            ).public_view()
            if follow_up.steps_executed == 0:
                break
        return result

    def register_tools(self, registry: ToolRegistry) -> ToolRegistry:
        """Register only approved public methods and metadata extensions."""
        tools = {
            "get_task_context": ("shared_atomic", "task"),
            "get_observation": ("shared_atomic", "observation"),
            "get_robot_state": ("shared_atomic", "state"),
            "segment_text": ("shared_atomic", "perception"),
            "segment_points": ("shared_atomic", "perception"),
            "mask_to_point_cloud": ("shared_atomic", "geometry"),
            "crop_point_cloud": ("shared_atomic", "geometry"),
            "estimate_geometry": ("shared_atomic", "geometry"),
            "generate_grasps": ("shared_atomic", "grasping"),
            "solve_ik": ("shared_atomic", "kinematics"),
            "plan_motion": ("shared_atomic", "planning"),
            "plan_synchronized_motion": ("shared_atomic", "planning"),
            "step": ("shared_atomic", "control"),
            "execute_trajectory": ("shared_atomic", "execution"),
            "set_gripper": ("shared_atomic", "control"),
            "set_grippers": ("shared_atomic", "control"),
            "localize_object": ("shared_high_level", "perception"),
            "select_grasp": ("shared_high_level", "grasping"),
            "move_to_joints": ("shared_high_level", "execution"),
            "move_to_pose": ("shared_high_level", "execution"),
            "move_synchronized": ("shared_high_level", "execution"),
            "open_gripper": ("shared_high_level", "control"),
            "close_gripper": ("shared_high_level", "control"),
            "go_home": ("shared_high_level", "execution"),
        }
        for name, (layer, capability) in tools.items():
            registry.register(
                getattr(self, name),
                name=name,
                layer=layer,
                capability=capability,
                public=True,
            )
        extensions = (
            ("get_task_metadata", "metadata"),
            ("get_controller_metadata", "metadata"),
            ("get_base_pose", "metadata"),
            ("navigate_to_pose", "execution"),
            ("move_torso", "execution"),
            ("reset_torso", "execution"),
            ("plan_standoff_pose", "geometry"),
            ("plan_approach_pose", "geometry"),
            ("base_pose_is_free", "geometry"),
        )
        for extension_name, capability in extensions:
            function = getattr(self._adapter, extension_name, None)
            if callable(function):
                registry.register(
                    function,
                    name=f"{self._adapter.embodiment}.{extension_name}",
                    layer="extension",
                    capability=capability,
                    public=True,
                )
        return registry

    def _stage(self, name: str, function: Any, *args: object, **kwargs: object) -> Any:
        """Record a nested composition stage without changing public APIs."""
        if self._recorder is None:
            return function(*args, **kwargs)
        with self._recorder.span(  # type: ignore[attr-defined]
            name, category="api", inputs={"args": args, "kwargs": kwargs}
        ) as span:
            result = function(*args, **kwargs)
            ok = getattr(result, "ok", True)
            return span.output(result, ok=ok if type(ok) is bool else True)

    def _planning_scene(
        self,
        *,
        voxel_size_m: float = 0.01,
        target_point_cloud: PointCloud | None = None,
    ) -> PlanningScene:
        """Fuse public RGB-D observations without reading native simulator geometry."""
        observation = self.get_observation()
        frame = observation.robot_state.base_frame
        if target_point_cloud is not None and target_point_cloud.frame != frame:
            raise ValueError(
                f"target point cloud is in frame {target_point_cloud.frame!r}, expected {frame!r}"
            )
        clouds: list[np.ndarray] = []
        for camera_name, camera in observation.cameras.items():
            # Only cameras that know where they are can contribute. A camera
            # whose pose is expressed in its own optical frame -- an uncalibrated
            # one, with no transform into the base frame -- cannot be fused into
            # a world-frame scene, and asking it to project raises rather than
            # returning camera-frame points mislabelled as base ones.
            #
            # Skipping it here is what keeps such a camera from breaking planning
            # for everyone else: a station that adds a wrist camera for its
            # images should not thereby lose motion planning.
            if camera.camera_pose.frame != frame:
                continue
            valid = np.isfinite(camera.depth_m) & (camera.depth_m > 0.0)
            if not bool(np.any(valid)):
                continue
            cloud = self._project_mask(
                valid,
                camera_name=camera_name,
                target_frame=frame,
                observation=observation,
            )
            clouds.append(cloud.points)
        if not clouds:
            raise ValueError("no valid public depth points are available for motion planning")
        points = np.concatenate(clouds, axis=0)
        points = self._crop_to_planning_workspace(points, frame)
        if target_point_cloud is not None:
            points = self._exclude_target_from_scene(points, target_point_cloud.points)
        cells = np.floor(points / voxel_size_m).astype(np.int64)
        _, first = np.unique(cells, axis=0, return_index=True)
        downsampled = points[np.sort(first)]
        return PlanningScene(
            point_cloud=PointCloud(points=downsampled, frame=frame),
            voxel_size_m=voxel_size_m,
            timestamp_s=observation.timestamp_s,
        )

    @staticmethod
    def _exclude_target_from_scene(
        scene_points: np.ndarray,
        target_points: np.ndarray,
    ) -> np.ndarray:
        """Remove one observed manipulation target while retaining surrounding obstacles."""
        lower = np.quantile(target_points, 0.01, axis=0) - np.array([0.01, 0.01, 0.005])
        upper = np.quantile(target_points, 0.99, axis=0) + np.array([0.01, 0.01, 0.01])
        inside = np.all((scene_points >= lower) & (scene_points <= upper), axis=1)
        filtered = scene_points[~inside]
        if not len(filtered):
            raise ValueError("target exclusion removed the entire observed planning scene")
        return filtered

    def _crop_to_planning_workspace(self, points: np.ndarray, frame: str) -> np.ndarray:
        """Drop depth returns the robot could never reach, if the embodiment says where.

        A depth camera sees the whole room. Points beyond the arm's reach cannot
        be collided with, so carrying them into the planner buys nothing and
        costs: they inflate the voxel grid the obstacle mesh is built over, and a
        few degenerate returns hundreds of metres out have been observed
        exploding that allocation outright.

        Purely an optimization, and deliberately not a safety mechanism: it
        removes geometry that is out of reach, never geometry that is in the way.
        Cropping tight enough to remove a real obstacle would be a bug, which is
        why the bound is derived from arm reach rather than from the table.

        Embodiments opt in by exposing ``planning_workspace()``. Adapters without
        it -- every simulator embodiment today -- get the full cloud exactly as
        before.
        """
        workspace = getattr(self._adapter, "planning_workspace", None)
        if not callable(workspace):
            return points
        bounds = workspace()
        if bounds is None:
            return points
        lower, upper = bounds
        lower = np.asarray(lower, dtype=np.float64).reshape(3)
        upper = np.asarray(upper, dtype=np.float64).reshape(3)
        if not bool(np.all(np.isfinite(lower))) or not bool(np.all(np.isfinite(upper))):
            raise ValueError("planning_workspace() bounds must be finite")
        if bool(np.any(lower >= upper)):
            raise ValueError("planning_workspace() lower bounds must be below upper bounds")
        keep = np.all((points >= lower) & (points <= upper), axis=1)
        cropped = points[keep]
        if not len(cropped):
            raise ValueError(
                f"planning workspace {lower.tolist()}..{upper.tolist()} in frame {frame!r} "
                "contains no observed points; the bounds or the camera extrinsics are wrong"
            )
        return cropped

    def _planning_scene_request(
        self,
        arm: str,
        *,
        target_point_cloud: PointCloud | None = None,
    ) -> PlanningScene:
        """Let an adapter express the public scene in a selected planner base."""
        scene = self._planning_scene(target_point_cloud=target_point_cloud)
        transform = getattr(self._adapter, "planning_scene_request", None)
        if not callable(transform):
            return scene
        transformed = transform(scene, arm)
        if not isinstance(transformed, PlanningScene):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("adapter planning_scene_request() returned an invalid value")
        return transformed

    def _planning_context(self, state: RobotState) -> RobotPlanningContext:
        factory = getattr(self._adapter, "get_planning_context", None)
        if callable(factory):
            context = factory()
            if not isinstance(context, RobotPlanningContext):
                # Preserve the invalid-data ValueError contract.
                raise ValueError("adapter get_planning_context() returned an invalid value")
            if set(context.arms) == set(state.arms):
                return context
        arms = state.arms
        identity = np.eye(4, dtype=np.float64)
        return RobotPlanningContext(
            embodiment=self._embodiment,
            model="panda" if len(arms) == 1 else "dual_panda",
            joint_names={arm: state.joint_names[arm] for arm in arms},
            base_transforms=dict.fromkeys(arms, identity),
            end_effector_links={
                arm: "panda_hand" if index == 0 else f"panda_hand_{index + 1}"
                for index, arm in enumerate(arms)
            },
        )

    def _camera(
        self,
        camera_name: str | None,
        observation: Observation | None,
    ) -> tuple[str, Any]:
        current = self.get_observation() if observation is None else observation
        name = camera_name or self.default_camera
        if name not in current.cameras:
            raise ValueError(f"observation has no camera {name!r}")
        return name, current.cameras[name]

    def _remember_home(self, state: RobotState) -> None:
        for arm, joints in state.joint_positions.items():
            self._home_joint_positions.setdefault(arm, np.array(joints, copy=True))

    def _commanded_gripper_position(self, state: RobotState, arm: str) -> float:
        return self._commanded_gripper_positions.setdefault(arm, state.gripper_positions[arm])

    def _execution_state(self, result: ExecutionResult) -> RobotState:
        if result.final_observation is not None:
            return result.final_observation.robot_state
        return self.get_robot_state()

    @staticmethod
    def _validate_plan_start(result: PlanResult, expected_start: RobotState) -> PlanResult:
        if not result.ok or result.trajectory is None:
            return result
        mismatch = CapApi._start_state_mismatch(result.trajectory.expected_start, expected_start)
        if mismatch is not None:
            return PlanResult(
                ok=False,
                error=ApiError(
                    code=ErrorCode.PLANNING_FAILED,
                    message="planner returned a trajectory bound to a different start state",
                    details={"mismatch": mismatch},
                ),
            )
        return result

    @staticmethod
    def _bind_plan_start(result: PlanResult, public_start: RobotState) -> PlanResult:
        """Bind a validated adapter-frame plan to its measured public start state."""
        if not result.ok or result.trajectory is None:
            return result
        return replace(
            result,
            trajectory=replace(result.trajectory, expected_start=public_start),
        )

    @staticmethod
    def _validate_synchronized_plan_start(
        result: SynchronizedPlanResult,
        expected_start: RobotState,
    ) -> SynchronizedPlanResult:
        if not result.ok or result.trajectory is None:
            return result
        mismatch = CapApi._start_state_mismatch(result.trajectory.expected_start, expected_start)
        if mismatch is not None:
            return SynchronizedPlanResult(
                ok=False,
                error=ApiError(
                    code=ErrorCode.PLANNING_FAILED,
                    message="planner returned a trajectory bound to a different start state",
                    details={"mismatch": mismatch},
                ),
            )
        return result

    @staticmethod
    def _start_state_mismatch(actual: RobotState, expected: RobotState) -> str | None:
        if set(actual.arms) != set(expected.arms):
            return "arm_names"
        if actual.base_frame != expected.base_frame:
            return "base_frame"
        for arm in expected.arms:
            if tuple(actual.joint_names[arm]) != tuple(expected.joint_names[arm]):
                return f"joint_names[{arm}]"
            if not np.array_equal(actual.joint_positions[arm], expected.joint_positions[arm]):
                return f"joint_positions[{arm}]"
            if actual.gripper_positions[arm] != expected.gripper_positions[arm]:
                return f"gripper_positions[{arm}]"
        return None

    def _stale_trajectory_result(
        self,
        trajectory: Trajectory | SynchronizedTrajectory,
    ) -> ExecutionResult | None:
        if not isinstance(trajectory, Trajectory | SynchronizedTrajectory):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message="trajectory must be a Trajectory or SynchronizedTrajectory",
                ),
            )
        state = self.get_robot_state()
        expected_state = trajectory.expected_start
        if set(expected_state.arms) != set(state.arms):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.STALE_PLAN,
                    message="trajectory start arm set no longer matches the robot",
                ),
            )
        errors: dict[str, float] = {}
        gripper_errors: dict[str, float] = {}
        for arm in expected_state.arms:
            expected = expected_state.joint_positions[arm]
            if tuple(expected_state.joint_names[arm]) != tuple(state.joint_names[arm]):
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        code=ErrorCode.STALE_PLAN,
                        message=f"trajectory joint names no longer match arm {arm!r}",
                    ),
                )
            measured = state.joint_positions[arm]
            if expected.shape != measured.shape:
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        code=ErrorCode.INVALID_REQUEST,
                        message=f"trajectory dimension does not match arm {arm!r}",
                    ),
                )
            errors[arm] = float(np.max(np.abs(measured - expected)))
            gripper_errors[arm] = abs(
                state.gripper_positions[arm] - expected_state.gripper_positions[arm]
            )
        if errors and (
            max(errors.values()) > TRAJECTORY_START_TOLERANCE_RAD
            or max(gripper_errors.values()) > TRAJECTORY_START_GRIPPER_TOLERANCE
        ):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.STALE_PLAN,
                    message="trajectory start state no longer matches measured robot state",
                    details={
                        "start_error_rad": errors,
                        "gripper_start_error": gripper_errors,
                        "tolerance_rad": TRAJECTORY_START_TOLERANCE_RAD,
                        "gripper_tolerance": TRAJECTORY_START_GRIPPER_TOLERANCE,
                    },
                ),
                final_errors=errors,
            )
        return None

    @staticmethod
    def _terminal_error(terminated: bool, truncated: bool) -> ApiError:
        if truncated:
            return ApiError(
                code=ErrorCode.TRUNCATED,
                message="episode was truncated before control completed",
            )
        if terminated:
            return ApiError(
                code=ErrorCode.TERMINATED,
                message="episode terminated before control completed",
            )
        raise ValueError("a terminal error requires terminated or truncated")

    @staticmethod
    def _state_with_arm_joints(state: RobotState, arm: str, joints: np.ndarray) -> RobotState:
        positions = dict(state.joint_positions)
        positions[arm] = joints
        return RobotState(
            joint_positions=positions,
            joint_velocities=state.joint_velocities,
            end_effector_poses=state.end_effector_poses,
            gripper_positions=state.gripper_positions,
            base_frame=state.base_frame,
            joint_names=state.joint_names,
            timestamp_s=state.timestamp_s,
            embodiment=state.embodiment,
        )

    @staticmethod
    def _normalize_synchronized_targets(
        targets: Mapping[str, Pose | np.ndarray],
        state: RobotState,
    ) -> tuple[dict[str, Pose | np.ndarray] | None, ApiError | None]:
        if not isinstance(targets, Mapping) or not targets:
            return None, ApiError(
                code=ErrorCode.INVALID_REQUEST,
                message="targets must be a non-empty arm mapping",
            )
        if set(targets) != set(state.arms):
            return None, ApiError(
                code=ErrorCode.INVALID_REQUEST,
                message="synchronized targets must name every robot arm",
                details={"expected_arms": state.arms, "target_arms": tuple(targets)},
            )
        normalized: dict[str, Pose | np.ndarray] = {}
        for arm in state.arms:
            target = targets[arm]
            if isinstance(target, Pose):
                if target.frame != state.base_frame:
                    return None, ApiError(
                        code=ErrorCode.INVALID_REQUEST,
                        message=f"target pose for {arm!r} is not in the robot base frame",
                        details={
                            "target_frame": target.frame,
                            "base_frame": state.base_frame,
                        },
                    )
                normalized[arm] = target
                continue
            try:
                joint_target = np.asarray(target, dtype=np.float64)
            except (TypeError, ValueError) as exc:
                return None, ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message=f"joint target for {arm!r} must be a finite arm joint vector",
                    details={"error": str(exc)},
                )
            dimension = state.joint_positions[arm].shape[0]
            if joint_target.shape != (dimension,) or not bool(np.all(np.isfinite(joint_target))):
                return None, ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message=(f"joint target for {arm!r} must be a finite {dimension}-joint vector"),
                )
            copied = np.array(joint_target, copy=True)
            copied.setflags(write=False)
            normalized[arm] = copied
        return normalized, None

    @staticmethod
    def _motion_options(tolerance: float, max_steps: int) -> ExecutionResult | None:
        if (
            isinstance(tolerance, bool)
            or not np.isfinite(tolerance)
            or tolerance <= 0.0
            or isinstance(max_steps, bool)
            or not isinstance(max_steps, int)
            or max_steps <= 0
        ):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message="tolerance and max_steps must be positive",
                ),
            )
        return None

    @staticmethod
    def _with_camera_name(result: SegmentationSet, camera_name: str) -> SegmentationSet:
        if not result.ok:
            return result
        return SegmentationSet(
            ok=True,
            segmentations=tuple(
                Segmentation(
                    mask=item.mask,
                    label=item.label,
                    score=item.score,
                    camera_name=camera_name,
                    frame=item.frame,
                    box_xyxy=item.box_xyxy,
                )
                for item in result.segmentations
            ),
            diagnostics=result.diagnostics,
        )

    def _controller_step_limits(
        self, start: np.ndarray, goal: np.ndarray, arm: str
    ) -> tuple[np.ndarray, float]:
        joint_dimension = start.shape[0]
        fallback = np.full(joint_dimension, 0.05, dtype=np.float64)
        dt_s = 0.05
        try:
            metadata_getter = getattr(self._adapter, "get_controller_metadata", None)
            if callable(metadata_getter):
                metadata = metadata_getter()
                low = np.asarray(metadata["action_lower_bounds"], dtype=np.float64)
                high = np.asarray(metadata["action_upper_bounds"], dtype=np.float64)
                frequency = float(metadata["control_frequency_hz"])
                dt_s = float(metadata.get("control_period_s", 1.0 / frequency))
                arm_names = tuple(metadata.get("arm_names", ("primary",)))
                offset = arm_names.index(arm) * (low.size // len(arm_names))
            else:
                low, high = self._adapter.action_bounds  # type: ignore[attr-defined]
                low = np.asarray(low, dtype=np.float64)
                high = np.asarray(high, dtype=np.float64)
                frequency = float(self._adapter.control_frequency)  # type: ignore[attr-defined]
                dt_s = float(getattr(self._adapter, "control_period_s", 1.0 / frequency))
                offset = 0
            direction_limits = np.where(
                goal - start >= 0.0,
                high[offset : offset + joint_dimension],
                -low[offset : offset + joint_dimension],
            )
            # Absolute-mode controllers report joint limits as action bounds;
            # those are goal ranges, not per-tick steps, so cap interpolation
            # steps at the conservative fallback either way.
            limits = np.minimum(direction_limits / frequency, fallback)
            if (
                low.size < offset + joint_dimension
                or high.size < offset + joint_dimension
                or not np.isfinite(frequency)
                or frequency <= 0.0
                or not bool(np.all(np.isfinite(limits)))
                or bool(np.any(limits <= 0.0))
                or not np.isfinite(dt_s)
                or dt_s <= 0.0
            ):
                raise ValueError("invalid controller metadata")
            return limits, dt_s
        except (AttributeError, KeyError, TypeError, ValueError, RuntimeError):
            return fallback, dt_s

    @staticmethod
    def _segmentation_failure(message: str) -> SegmentationSet:
        return SegmentationSet(
            ok=False,
            error=ApiError(code=ErrorCode.UNSUPPORTED, message=message),
        )

    @staticmethod
    def _plan_failure(
        code: ErrorCode,
        message: str,
        *,
        details: Mapping[str, object] | None = None,
    ) -> PlanResult:
        return PlanResult(
            ok=False,
            error=ApiError(code=code, message=message, details=details or {}),
        )


__all__ = ["CapApi"]
````

## src/cap_harness/artifacts.py

````text
"""Compact artifact recorder for one Code-as-Policy episode."""

from __future__ import annotations

from collections.abc import Iterator, Mapping
import contextlib
import contextvars
import dataclasses
from datetime import datetime, timezone
from enum import Enum
import hashlib
import json
import os
from pathlib import Path
import re
import secrets
import shutil
import subprocess
import time
from typing import Any

import imageio.v2 as imageio
import numpy as np

from cap_harness.contracts import (
    CameraObservation,
    Observation,
    PointCloud,
    RobotAction,
    Segmentation,
    SegmentationSet,
    StepResult,
)

SCHEMA_VERSION = "1.0"
TERMINATION_REASONS = {
    "program_completed": "The generated Python program returned normally.",
    "task_succeeded": "The environment ended after benchmark success.",
    "environment_terminated": "The environment terminated without benchmark success.",
    "environment_truncated": "The environment reached its horizon.",
    "step_limit": "The configured simulator-step limit was reached.",
    "program_error": "The generated program was rejected or raised an exception.",
    "provider_error": "An unrecoverable provider failure stopped execution.",
    "harness_error": "The adapter or artifact recorder failed.",
    "user_interrupt": "Execution received a user interrupt.",
}
#: zlib effort for recorded PNGs. Every level is lossless -- the level buys
#: file size, not fidelity -- and the default (6) is the wrong trade here: on a
#: measured 800x512 keyframe it costs 136 ms against 33 ms at level 1, to save
#: 57 kB of a 492 kB file. Keyframes are written twice per motion call, so that
#: default was ~16% of a recorded episode's wall clock.
PNG_COMPRESS_LEVEL = 1
_PARENT: contextvars.ContextVar[str | None] = contextvars.ContextVar("trace_parent", default=None)
_SECRET_KEY = re.compile(r"authorization|cookie|credential|password|secret|token", re.IGNORECASE)
_SECRET_TEXT = re.compile(r"(?i)\b(?:bearer\s+\S+|hf_[A-Za-z0-9]{12,})")


class StepLimitReached(RuntimeError):
    """A run tried to exceed its global simulator-step limit."""


class RunTiming:
    """Disjoint wall-clock attribution for one run, reported in ``outcome.json``.

    Every bucket is a leaf: :meth:`measure` charges a region only the time not
    already charged to something nested inside it, so ``reset`` excludes the
    keyframe it writes and ``record_step`` excludes the video frame it encodes.
    What no bucket claims is the generated program's own Python plus harness
    glue, reported as ``unattributed_s`` rather than silently folded into a
    neighbour.
    """

    def __init__(self) -> None:
        self.buckets: dict[str, float] = {}
        self.counts: dict[str, int] = {}
        self._attributed = 0.0

    def add(self, bucket: str, seconds: float) -> None:
        self.buckets[bucket] = self.buckets.get(bucket, 0.0) + seconds
        self.counts[bucket] = self.counts.get(bucket, 0) + 1
        self._attributed += seconds

    @contextlib.contextmanager
    def measure(self, bucket: str) -> Iterator[None]:
        started, attributed_at_start = time.monotonic(), self._attributed
        try:
            yield
        finally:
            elapsed = time.monotonic() - started
            nested = self._attributed - attributed_at_start
            self.add(bucket, max(elapsed - nested, 0.0))

    def snapshot(self, *, wall_s: float) -> Mapping[str, object]:
        return {
            "wall_s": round(wall_s, 6),
            "attributed_s": round(self._attributed, 6),
            # Program Python and harness glue: no bucket claims it.
            "unattributed_s": round(max(wall_s - self._attributed, 0.0), 6),
            "buckets": {
                name: {"seconds": round(seconds, 6), "calls": self.counts[name]}
                for name, seconds in sorted(self.buckets.items(), key=lambda item: -item[1])
            },
        }


def _now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="microseconds").replace("+00:00", "Z")


def slug(value: object) -> str:
    return (re.sub(r"[^a-z0-9]+", "-", str(value).lower()).strip("-") or "unnamed")[:96]


def _component(value: object) -> str:
    return (re.sub(r"[^a-z0-9_.-]+", "-", str(value).lower()).strip("-.") or "unnamed")[:96]


def redact(value: object) -> object:
    if isinstance(value, str):
        return _SECRET_TEXT.sub("[REDACTED]", value)
    if isinstance(value, Mapping):
        return {
            str(key): "[REDACTED]" if _SECRET_KEY.search(str(key)) else redact(item)
            for key, item in value.items()
        }
    if isinstance(value, list | tuple):
        return [redact(item) for item in value]
    return value


def atomic_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(f".{path.name}.{os.getpid()}.tmp")
    temporary.write_text(
        json.dumps(redact(value), indent=2, sort_keys=True, allow_nan=False) + "\n",
        encoding="utf-8",
    )
    temporary.replace(path)


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


class Serializer:
    """Readable typed JSON with exact NumPy arrays stored beside it."""

    def __init__(self, root: Path) -> None:
        self.root = root

    def dump(self, path: Path, value: object) -> None:
        atomic_json(path, self.encode(value, path.parent / "arrays"))

    def encode(self, value: object, arrays: Path) -> object:
        if value is None or isinstance(value, bool | int | str):
            return redact(value)
        if isinstance(value, float | np.floating):
            number = float(value)
            return number if np.isfinite(number) else {"$float": str(number)}
        if isinstance(value, np.integer):
            return int(value)
        if isinstance(value, PointCloud):
            return {
                "$type": "PointCloud",
                "frame": value.frame,
                "point_count": len(value.points),
                "has_colors": value.colors is not None,
            }
        if isinstance(value, CameraObservation):
            return {
                "$type": "CameraObservation",
                "frame": value.frame,
                "rgb_shape": list(value.rgb.shape),
                "depth_shape": list(value.depth_m.shape),
                "intrinsics": value.intrinsics.tolist(),
                "camera_pose": self.encode(value.camera_pose, arrays),
                "timestamp_s": value.timestamp_s,
            }
        if isinstance(value, Observation):
            return {
                "$type": "Observation",
                "cameras": {
                    name: self.encode(camera, arrays) for name, camera in value.cameras.items()
                },
                "robot_state": self.encode(value.robot_state, arrays),
                "task_context": self.encode(value.task_context, arrays),
                "timestamp_s": value.timestamp_s,
            }
        if isinstance(value, Segmentation):
            return {
                "$type": "Segmentation",
                "label": value.label,
                "score": value.score,
                "camera_name": value.camera_name,
                "frame": value.frame,
                "mask_shape": list(value.mask.shape),
                "box_xyxy": value.box_xyxy.tolist() if value.box_xyxy is not None else None,
            }
        if isinstance(value, SegmentationSet):
            return {
                "$type": "SegmentationSet",
                "ok": value.ok,
                "segmentations": [self.encode(item, arrays) for item in value.segmentations[:5]],
                "error": self.encode(value.error, arrays),
                "diagnostics": self.encode(value.diagnostics, arrays),
            }
        if isinstance(value, np.ndarray):
            array = np.ascontiguousarray(value)
            if array.dtype == np.bool_ and array.ndim == 2:
                return {
                    "$type": "MaskSummary",
                    "shape": list(array.shape),
                    "true_pixels": int(np.count_nonzero(array)),
                }
            if array.size <= 64:
                return {
                    "$array_inline": array.tolist(),
                    "dtype": str(array.dtype),
                    "shape": list(array.shape),
                }
            identity = hashlib.sha256()
            identity.update(array.dtype.str.encode())
            identity.update(str(array.shape).encode())
            identity.update(array.tobytes())
            path = self.root / "payloads" / f"{identity.hexdigest()}.npy"
            if not path.exists():
                path.parent.mkdir(parents=True, exist_ok=True)
                np.save(path, array, allow_pickle=False)
            return {
                "$array": str(path.relative_to(self.root)),
                "dtype": str(value.dtype),
                "shape": list(value.shape),
                "sha256": _sha256(path),
            }
        if dataclasses.is_dataclass(value) and not isinstance(value, type):
            return {
                "$type": type(value).__name__,
                **{
                    field.name: self.encode(getattr(value, field.name), arrays)
                    for field in dataclasses.fields(value)
                },
            }
        if isinstance(value, Enum):
            return value.value
        if isinstance(value, Path):
            return str(value)
        if isinstance(value, Mapping):
            return {
                str(key): (
                    "[REDACTED]" if _SECRET_KEY.search(str(key)) else self.encode(item, arrays)
                )
                for key, item in value.items()
            }
        if isinstance(value, list | tuple | set | frozenset):
            return [self.encode(item, arrays) for item in value]
        return {"$type": type(value).__name__, "repr": redact(repr(value)[:512])}


class _Span:
    def __init__(
        self,
        path: Path,
        serializer: Serializer,
        state: dict[str, bool],
        recorder: RunRecorder,
        *,
        capture_segmentation: bool,
    ) -> None:
        self.path, self.serializer, self.state = path, serializer, state
        self.recorder = recorder
        self.capture_segmentation = capture_segmentation

    def output(self, value: object, *, ok: bool = True) -> object:
        with self.recorder.timing.measure("trace_write"):
            self.serializer.dump(self.path / "output.json", value)
        if self.capture_segmentation and isinstance(value, SegmentationSet):
            self.recorder.segmentation_overlay(value)
        self.state["ok"] = ok
        return value


class RunRecorder:
    """Write one immutable, self-contained run directory."""

    def __init__(
        self,
        *,
        output_root: Path,
        benchmark: str,
        suite: str,
        task_id: int,
        task_name: str,
        seed: int,
        max_steps: int,
        camera_width: int = 128,
        camera_height: int = 128,
        control_frequency_hz: float = 20.0,
        providers: Mapping[str, object] | None = None,
        init_mode: str = "saved",
        flat_layout: bool = False,
        capture_videos: bool = True,
        step_video: bool = True,
        video_frame_stride: int = 1,
    ) -> None:
        stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S.%fZ")
        self.run_id = f"run-{stamp}-{secrets.token_hex(4)}"
        if flat_layout:
            # Task identity comes from the caller-chosen output_root (e.g. a
            # task-scoped directory); only seed and run id are nested.
            self.root = output_root / f"{seed:04d}" / self.run_id
        else:
            self.root = (
                output_root
                / _component(benchmark)
                / _component(suite)
                / f"{task_id:02d}-{slug(task_name)}"
                / f"{seed:04d}"
                / self.run_id
            )
        self.capture_videos = capture_videos
        #: Whether a recorded step contributes a VIDEO FRAME.
        #:
        #: True for embodiments that step at the control rate -- a simulator's
        #: per-step frame is a real video. False where one recorded step is a
        #: whole commanded motion: on the real YAM a 2.8 s descent is a single
        #: ``execute_trajectory``, so per-step frames produced a 10-frame,
        #: half-second "video" of a run lasting minutes. Those embodiments write
        #: media/videos from a sampler running on its own clock, and each step
        #: is captured here as a KEYFRAME instead -- same images, filed as the
        #: stills they always were rather than assembled into a misleading movie.
        self.step_video = bool(step_video)
        # Record every Nth step as a video frame; slow simulators at 30 Hz use 3 (10 fps).
        self.video_frame_stride = max(1, int(video_frame_stride))
        self.root.mkdir(parents=True)
        for name in (
            "source",
            "episode",
            "evaluation",
            "trace/calls",
            "trace/model",
            "media/videos",
            "media/keyframes",
            "logs",
        ):
            (self.root / name).mkdir(parents=True, exist_ok=True)
        (self.root / "trace/model/turns.jsonl").touch()
        self.serializer = Serializer(self.root)
        self.max_steps, self.step_count = max_steps, 0
        self.frequency = float(control_frequency_hz)
        self.cumulative_reward = 0.0
        self.terminated = self.truncated = False
        self.terminal_reason: str | None = None
        self.started_at, self.started = _now(), time.monotonic()
        self.timing = RunTiming()
        #: Set when the adapter is asked to step, cleared when it answers. The
        #: gap is the simulator step plus its observation normalization -- the
        #: one cost the recorder can attribute without reaching into an adapter.
        self._step_entered: float | None = None
        self.events = (self.root / "trace/events.jsonl").open("a", encoding="utf-8")
        self.steps = (self.root / "episode/steps.jsonl").open("a", encoding="utf-8")
        self.writers: dict[str, Any] = {}
        self.video_frames: dict[str, int] = {}
        self.last_observation: Observation | None = None
        self.last_video_step: int | None = None
        self.depth_saved = False
        self.overlay_index = 0
        self.event_index = self.call_index = self.keyframe_index = 0
        self.finalized = False
        self.identity = {
            "schema_version": SCHEMA_VERSION,
            "run_id": self.run_id,
            "status": "in_progress",
            "benchmark": benchmark,
            "suite": suite,
            "task_id": task_id,
            "task_name": task_name,
            "seed": seed,
            "started_at": self.started_at,
            "capture": {
                "profile": "balanced_evidence" if capture_videos else "no_videos",
                "max_steps": max_steps,
                "camera_width": camera_width,
                "camera_height": camera_height,
                "videos": capture_videos,
            },
            "init_mode": init_mode,
            "providers": dict(providers or {}),
            "environment_sha256": os.environ.get("CAP_HARNESS_ENVIRONMENT_SHA256"),
        }
        atomic_json(self.root / "run.json", self.identity)

    def save_program(self, path: Path) -> None:
        raw = path.read_bytes()
        (self.root / "source/program.py").write_bytes(raw)
        dependency_lock = Path(__file__).resolve().parents[2] / "configs/dependency-lock.json"
        lock_raw = dependency_lock.read_bytes() if dependency_lock.is_file() else b""
        if lock_raw:
            (self.root / "source/dependency-lock.json").write_bytes(lock_raw)
        atomic_json(
            self.root / "source/provenance.json",
            {
                "generation_source": "program_file",
                "input_path": str(path.resolve()),
                "sha256": hashlib.sha256(raw).hexdigest(),
                "harness_git": self._git(),
                "dependency_lock_sha256": (
                    hashlib.sha256(lock_raw).hexdigest() if lock_raw else None
                ),
            },
        )

    def import_model_trace(self, path: Path | None) -> None:
        if path is None:
            return
        records = []
        for number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            if line.strip():
                try:
                    records.append(redact(json.loads(line)))
                except json.JSONDecodeError as exc:
                    raise ValueError(f"model trace line {number} is invalid JSON") from exc
        target = self.root / "trace/model/turns.jsonl"
        target.write_text("".join(json.dumps(item, sort_keys=True) + "\n" for item in records))
        media = path.parent / "media"
        if media.is_dir():
            shutil.copytree(media, self.root / "trace/model/media", dirs_exist_ok=True)

    def save_protocol_evidence(self, evidence: Mapping[str, object]) -> None:
        """Persist summarized host-only evaluation without exposing native state."""
        atomic_json(self.root / "evaluation/protocol.json", evidence)

    @contextlib.contextmanager
    def span(self, name: str, *, category: str, inputs: object) -> Iterator[_Span]:
        self.call_index += 1
        span_id, parent = f"span-{self.call_index:06d}", _PARENT.get()
        directory = self.root / "trace/calls" / f"call-{self.call_index:06d}-{slug(name)}"
        with self.timing.measure("trace_write"):
            directory.mkdir()
            self.serializer.dump(directory / "input.json", inputs)
        self._event("span_start", span_id=span_id, parent_id=parent, name=name, category=category)
        token, state, started = _PARENT.set(span_id), {"ok": True}, time.monotonic()
        try:
            yield _Span(
                directory,
                self.serializer,
                state,
                self,
                capture_segmentation=category == "provider" and name.startswith("sam3."),
            )
        except BaseException as exc:
            self.serializer.dump(
                directory / "error.json", {"type": type(exc).__name__, "message": str(exc)}
            )
            state["ok"] = False
            raise
        finally:
            self._event(
                "span_end",
                span_id=span_id,
                parent_id=parent,
                name=name,
                category=category,
                ok=state["ok"],
                duration_s=time.monotonic() - started,
            )
            _PARENT.reset(token)

    def before_step(self, action: RobotAction) -> None:
        del action
        if self.step_count >= self.max_steps:
            self.terminal_reason = "step_limit"
            raise StepLimitReached(f"run reached max_steps={self.max_steps}")
        self._step_entered = time.monotonic()

    def after_step(self, action: RobotAction, result: StepResult) -> None:
        if self._step_entered is not None:
            self.timing.add("adapter_step", time.monotonic() - self._step_entered)
            self._step_entered = None
        with self.timing.measure("record_step"):
            self._after_step(action, result)

    def _after_step(self, action: RobotAction, result: StepResult) -> None:
        if result.ok:
            self.step_count += 1
            self.cumulative_reward += result.reward or 0.0
            self.terminated, self.truncated = result.terminated, result.truncated
            if result.observation is not None:
                self.last_observation = result.observation
                if self.step_video:
                    self._video(result.observation, self.step_count)
                else:
                    self.keyframe(f"step-{self.step_count:04d}")
        record = {
            "step_index": self.step_count,
            "simulator_time_s": self.step_count / self.frequency,
            "action": self.serializer.encode(action, self.root / "episode/arrays"),
            "robot_state": (
                self.serializer.encode(result.observation.robot_state, self.root / "episode/arrays")
                if result.observation
                else None
            ),
            "ok": result.ok,
            "terminated": result.terminated,
            "truncated": result.truncated,
        }
        self.steps.write(json.dumps(record, sort_keys=True, allow_nan=False) + "\n")
        self.steps.flush()

    def on_reset(self, observation: Observation, metadata: Mapping[str, object]) -> None:
        self.last_observation = observation
        self.serializer.dump(
            self.root / "episode/reset.json", {"metadata": metadata, "observation": observation}
        )
        if self.step_video:
            self._video(observation, 0)
        else:
            self.keyframe("reset")

    def keyframe(self, label: str) -> None:
        if self.last_observation is None:
            return
        with self.timing.measure("keyframe"):
            self._keyframe(label)

    def _keyframe(self, label: str) -> None:
        self.keyframe_index += 1
        directory = self.root / "media/keyframes" / f"{self.keyframe_index:06d}-{slug(label)}"
        directory.mkdir()
        cameras = {}
        for name, camera in self.last_observation.cameras.items():
            rgb = directory / f"{_component(name)}.png"
            imageio.imwrite(
                rgb, np.asarray(camera.rgb, dtype=np.uint8), compress_level=PNG_COMPRESS_LEVEL
            )
            record = {"rgb": rgb.name, "frame": camera.frame}
            if not self.depth_saved:
                depth = directory / f"{_component(name)}-depth.npy"
                np.save(depth, camera.depth_m, allow_pickle=False)
                record["depth"] = depth.name
                self.depth_saved = True
            cameras[name] = record
        atomic_json(
            directory / "metadata.json",
            {"label": label, "step_index": self.step_count, "cameras": cameras},
        )

    def segmentation_overlay(self, result: SegmentationSet) -> None:
        """Save one annotated image containing every returned SAM candidate.

        One image per provider call keeps large campaigns tractable while still
        showing false positives, score ordering, boxes, and overlapping masks.
        Raw masks remain summarized rather than persisted.
        """
        if not result.ok or not result.segmentations or self.last_observation is None:
            return
        with self.timing.measure("overlay"):
            self._segmentation_overlay(result)

    def _segmentation_overlay(self, result: SegmentationSet) -> None:
        segmentations = result.segmentations[:5]
        first = segmentations[0]
        camera = next(
            (
                item
                for name, item in self.last_observation.cameras.items()
                if name == first.camera_name or item.frame == first.frame
            ),
            None,
        )
        if camera is None or camera.rgb.shape[:2] != first.mask.shape:
            return
        rgb = np.asarray(camera.rgb)
        if np.issubdtype(rgb.dtype, np.floating):
            rgb = np.rint(rgb * 255.0)
        overlay = np.asarray(rgb, dtype=np.uint8).copy()
        colors = (
            np.array([255, 64, 64]),
            np.array([64, 255, 64]),
            np.array([64, 128, 255]),
            np.array([255, 192, 64]),
            np.array([224, 64, 255]),
        )
        records = []
        boxes = []
        for index, segmentation in enumerate(segmentations):
            mask = segmentation.mask
            if (
                mask.shape != overlay.shape[:2]
                or segmentation.camera_name != first.camera_name
                or segmentation.frame != first.frame
            ):
                continue
            color = colors[index]
            overlay[mask] = np.rint(0.68 * overlay[mask] + 0.32 * color).astype(np.uint8)
            box = None
            if segmentation.box_xyxy is not None:
                height, width = mask.shape
                x1, y1, x2, y2 = np.rint(segmentation.box_xyxy).astype(int)
                x1, x2 = np.clip((x1, x2), 0, width - 1)
                y1, y2 = np.clip((y1, y2), 0, height - 1)
                box = [int(x1), int(y1), int(x2), int(y2)]
                boxes.append((box, tuple(int(value) for value in color), index, segmentation))
            records.append(
                {
                    "index": index,
                    "label": segmentation.label,
                    "score": float(segmentation.score),
                    "box_xyxy": box,
                    "mask_pixels": int(np.count_nonzero(mask)),
                }
            )
        self.overlay_index += 1
        directory = self.root / "media/overlays"
        directory.mkdir(parents=True, exist_ok=True)
        stem = f"sam3-{self.overlay_index:06d}-{_component(first.camera_name)}"
        from PIL import Image, ImageDraw

        image = Image.fromarray(overlay)
        draw = ImageDraw.Draw(image)
        for box, color, index, segmentation in boxes:
            draw.rectangle(box, outline=color, width=3)
            text = f"#{index + 1} {segmentation.label} {segmentation.score:.3f}"
            text_y = max(0, box[1] - 13)
            draw.rectangle(
                (box[0], text_y, min(image.width - 1, box[0] + 8 * len(text)), text_y + 12),
                fill=(0, 0, 0),
            )
            draw.text((box[0] + 2, text_y), text, fill=color)
        if image.width > 960:
            image.thumbnail((960, 960 * image.height // image.width))
        image.save(directory / f"{stem}.png", optimize=True)
        atomic_json(
            directory / f"{stem}.json",
            {
                "camera_name": first.camera_name,
                "camera_frame": first.frame,
                "image_shape": list(first.mask.shape),
                "candidates": records,
            },
        )

    def finalize(
        self,
        *,
        program_ok: bool,
        task_success: bool | None,
        protocol_success: bool | None = None,
        termination_reason: str,
        program_result: object,
        error: object = None,
        cleanup_errors: tuple[str, ...] = (),
        success_observed_step: int | None = None,
    ) -> None:
        if self.finalized:
            return
        finalization_errors = list(cleanup_errors)
        with self.timing.measure("finalize"):
            # Closing an x264 writer flushes and muxes the whole file, so it is
            # video cost, not bookkeeping: charge it where a reader would look.
            with self.timing.measure("video_encode"):
                for name, writer in self.writers.items():
                    try:
                        writer.close()
                        (self.root / "media/videos" / f".{_component(name)}.partial.mp4").replace(
                            self.root / "media/videos" / f"{_component(name)}.mp4"
                        )
                    # Record video finalization errors without losing the episode result.
                    except Exception as exc:
                        finalization_errors.append(f"video {name}: {exc}")
            self.events.close()
            self.steps.close()
            self.serializer.dump(self.root / "source/program-result.json", program_result)
        wall_duration_s = time.monotonic() - self.started
        self.serializer.dump(
            self.root / "outcome.json",
            {
                "schema_version": SCHEMA_VERSION,
                "program_ok": program_ok,
                "task_success": task_success,
                "protocol_success": protocol_success,
                "cumulative_reward": self.cumulative_reward,
                "steps_executed": self.step_count,
                "simulator_duration_s": self.step_count / self.frequency,
                "wall_duration_s": wall_duration_s,
                # Where the wall clock went. Buckets are disjoint; the manifest
                # hash pass runs after this file is written and is not in them.
                "timing": self.timing.snapshot(wall_s=wall_duration_s),
                "termination_reason": termination_reason,
                "termination_description": TERMINATION_REASONS[termination_reason],
                # How the episode itself ended, independent of the reason above:
                # a latched success on a task without a success termination reads
                # task_succeeded while the environment never ended. These make the
                # two distinguishable after the fact.
                "environment_terminated": bool(self.terminated),
                "environment_truncated": bool(self.truncated),
                "success_observed_step": success_observed_step,
                "error": error,
                "finalization_errors": finalization_errors,
            },
        )
        atomic_json(
            self.root / "media/video-index.json",
            {"fps": self.frequency / self.video_frame_stride, "frames": self.video_frames},
        )
        self.identity.update(status="finalized", finished_at=_now())
        atomic_json(self.root / "run.json", self.identity)
        self._manifest()
        self.finalized = True

    def close_incomplete(
        self, error: BaseException, *, cleanup_errors: tuple[str, ...] = ()
    ) -> None:
        try:
            self.finalize(
                program_ok=False,
                task_success=None,
                termination_reason="harness_error",
                program_result=None,
                error={"type": type(error).__name__, "message": str(error)},
                cleanup_errors=cleanup_errors,
            )
        # Persist an incomplete run marker if finalization fails.
        except Exception:
            self.identity.update(status="incomplete", finished_at=_now())
            atomic_json(self.root / "run.json", self.identity)

    def _event(self, event: str, **fields: object) -> None:
        with self.timing.measure("trace_write"):
            self._write_event(event, **fields)

    def _write_event(self, event: str, **fields: object) -> None:
        self.event_index += 1
        record = {
            "event_index": self.event_index,
            "event": event,
            "timestamp": _now(),
            "simulator_time_s": self.step_count / self.frequency,
            **fields,
        }
        self.events.write(json.dumps(redact(record), sort_keys=True, allow_nan=False) + "\n")
        self.events.flush()

    def _video(self, observation: Observation, step: int) -> None:
        if not self.capture_videos or self.last_video_step == step:
            return
        if step % self.video_frame_stride:
            return
        with self.timing.measure("video_encode"):
            self._encode_video_frame(observation, step)

    def _encode_video_frame(self, observation: Observation, step: int) -> None:
        for name, camera in observation.cameras.items():
            if name not in self.writers:
                path = self.root / "media/videos" / f".{_component(name)}.partial.mp4"
                self.writers[name] = imageio.get_writer(
                    path,
                    fps=self.frequency / self.video_frame_stride,
                    codec="libx264",
                    macro_block_size=None,
                )
                self.video_frames[name] = 0
            self.writers[name].append_data(np.asarray(camera.rgb, dtype=np.uint8))
            self.video_frames[name] += 1
        self.last_video_step = step

    def _manifest(self) -> None:
        files = [
            {
                "path": str(path.relative_to(self.root)),
                "size_bytes": path.stat().st_size,
                "sha256": _sha256(path),
            }
            for path in sorted(self.root.rglob("*"))
            if path.is_file() and path.name != "manifest.json"
        ]
        atomic_json(self.root / "manifest.json", {"schema_version": SCHEMA_VERSION, "files": files})

    @staticmethod
    def _git() -> Mapping[str, object]:
        repository = Path(__file__).resolve().parents[2]
        try:
            commit = subprocess.run(
                ["git", "rev-parse", "HEAD"],
                cwd=repository,
                capture_output=True,
                text=True,
                check=True,
            ).stdout.strip()
            dirty = bool(
                subprocess.run(
                    ["git", "status", "--porcelain"],
                    cwd=repository,
                    capture_output=True,
                    text=True,
                    check=True,
                ).stdout.strip()
            )
            return {"commit": commit, "dirty": dirty}
        except (OSError, subprocess.CalledProcessError):
            return {"commit": None, "dirty": None}


class TracedProvider:
    """Tiny proxy adding provider child spans."""

    def __init__(self, provider: object, recorder: RunRecorder, name: str) -> None:
        self.provider, self.recorder, self.name = provider, recorder, name

    def __getattr__(self, name: str) -> object:
        attribute = getattr(self.provider, name)
        if not callable(attribute) or name == "health":
            return attribute

        def invoke(*args: object, **kwargs: object) -> object:
            with self.recorder.span(
                f"{self.name}.{name}", category="provider", inputs={"args": args, "kwargs": kwargs}
            ) as span:
                # Time the backend call alone. The span's own input/output
                # serialization is charged to trace_write, so a slow provider
                # and a slow trace never hide inside one another.
                with self.recorder.timing.measure(f"provider.{self.name}"):
                    result = attribute(*args, **kwargs)
                ok = getattr(result, "ok", True)
                return span.output(result, ok=ok if type(ok) is bool else True)

        return invoke


__all__ = [
    "TERMINATION_REASONS",
    "RunRecorder",
    "RunTiming",
    "StepLimitReached",
    "TracedProvider",
    "redact",
    "slug",
]
````

## src/cap_harness/batch.py

````text
"""Run one program over many seeds without paying for a process per seed.

The pipeline's debug and validation loops are shell ``for`` loops around
``cap-harness run``: fifteen or fifty interpreter starts, each re-importing the
simulator stack before it can step anything. This module keeps that cost per
*worker* instead of per *seed*, and lets several workers run at once.

What it deliberately does not share is the environment. Every seed still calls
:func:`cap_harness.run.run_program`, which builds its own registry, adapter,
simulator environment, and recorder exactly as a standalone ``cap-harness run``
does, and tears them down before the next seed starts. A worker reuses the
*imports*, never a live scene. Three further rules keep a seed's result
independent of what its worker ran before it:

* Workers are **spawned**, never forked, so no CUDA, EGL, or MuJoCo state is
  inherited from the parent or shared between workers.
* Each seed re-seeds the interpreter-global ``random`` and ``numpy.random``
  streams from its own seed, so a program that draws from them sees the same
  numbers whatever ran earlier in that worker.
* A worker is retired after ``recycle_after`` seeds. Repeatedly building and
  closing GL contexts in one process is the classic place for a driver-side
  leak, and a bounded worker lifetime bounds the exposure.

Only LIBERO-Pro and Robosuite support worker reuse. BEHAVIOR tears down its
Isaac runtime on close and must keep using one fresh process per episode.
"""

from __future__ import annotations

from collections.abc import Iterable, Iterator, Sequence
from concurrent.futures import ProcessPoolExecutor, as_completed
from concurrent.futures.process import BrokenProcessPool
import contextlib
import ctypes
from dataclasses import asdict, dataclass
import importlib
import json
import multiprocessing
import os
from pathlib import Path
import resource
import signal
import sys
import time
import traceback
from typing import Any

PR_SET_PDEATHSIG = 1

#: Seeds run by this worker process so far. A fresh process starts at zero, so
#: a result carrying a high index is one that ran on a long-lived worker --
#: which is what a leak, if there is one, would correlate with.
_SEEDS_RUN = 0

DEFAULT_RECYCLE_AFTER = 10


@dataclass(frozen=True, slots=True)
class SeedResult:
    """One seed's outcome, as the batch parent recorded it."""

    seed: int
    ok: bool
    run_dir: str | None
    program_ok: bool | None
    task_success: bool | None
    termination_reason: str | None
    wall_s: float
    worker_pid: int
    worker_seed_index: int
    max_rss_mb: float
    error: str | None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


def parse_seed_arguments(values: Iterable[str]) -> list[int]:
    """Accept ``51 52 53`` and ``51-65`` alike, so a shell loop maps over directly."""
    seeds: list[int] = []
    for value in values:
        text = str(value).strip()
        start, separator, end = text.partition("-")
        if separator and start.strip().isdigit() and end.strip().isdigit():
            low, high = int(start), int(end)
            if high < low:
                raise ValueError(f"seed range must not run backwards: {text}")
            seeds.extend(range(low, high + 1))
            continue
        try:
            seeds.append(int(text))
        except ValueError as exc:
            raise ValueError(f"not a seed or seed range: {text!r}") from exc
    ordered = sorted(set(seeds))
    if not ordered:
        raise ValueError("no seeds requested")
    if ordered[0] < 0:
        raise ValueError("seeds must be non-negative")
    return ordered


#: What a worker actually calls. A dotted ``module:attribute`` string rather
#: than a function object because a spawned worker resolves it after import,
#: and because a test needs to substitute one without the simulator installed.
DEFAULT_RUNNER = "cap_harness.run:run_program"


def _resolve(target: str) -> Any:
    module_name, _, attribute = target.partition(":")
    if not module_name or not attribute:
        raise ValueError(f"runner must be 'module:attribute', got {target!r}")
    return getattr(importlib.import_module(module_name), attribute)


def _max_rss_mb() -> float:
    # ru_maxrss is kilobytes on Linux.
    return round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024.0, 1)


def _die_with_parent() -> None:
    """Ask the kernel to kill this worker if the parent goes away.

    ``ProcessPoolExecutor`` shuts its workers down cleanly on every exit the parent survives --
    normal return, exception, KeyboardInterrupt -- because ``__exit__`` calls ``shutdown``. It
    cannot help when the parent is SIGKILLed or its terminal dies, and then a worker only notices
    on its next ``call_queue.get()``. A worker blocked inside MuJoCo or the EGL driver never gets
    there.

    That is not hypothetical: this campaign left four workers alive for **30 hours**, reparented to
    init, each holding ~1.4 GB and a GPU context, sleeping in ``futex_wait_queue_me`` with 64
    native threads apiece. Nothing in userspace reclaims those, which is why this asks the kernel.

    ``PR_SET_PDEATHSIG`` is Linux-only and fires on the death of the *thread* that spawned us, so
    it is exactly right for a pool whose workers are spawned from the main thread and useless
    anywhere else -- hence the platform guard rather than a hard requirement.
    """
    if not sys.platform.startswith("linux"):
        return
    try:
        libc = ctypes.CDLL("libc.so.6", use_errno=True)
        libc.prctl(PR_SET_PDEATHSIG, signal.SIGKILL, 0, 0, 0)
    except (OSError, AttributeError):
        return  # no prctl: fall back to the pre-existing behaviour rather than refusing to run
    # Close the race the flag cannot: if the parent died between spawn and here, the signal has
    # already been missed and this worker would inherit the leak it exists to prevent.
    if os.getppid() == 1:
        os._exit(1)


def _died(job: dict[str, Any], reason: str) -> dict[str, Any]:
    """A result for a seed whose worker died before it could report one."""
    return SeedResult(
        seed=int(job["seed"]),
        ok=False,
        run_dir=None,
        program_ok=None,
        task_success=None,
        termination_reason=None,
        wall_s=0.0,
        worker_pid=0,
        worker_seed_index=-1,
        max_rss_mb=0.0,
        error=reason,
    ).to_dict()


def _run_seed(job: dict[str, Any]) -> dict[str, Any]:
    """Run one seed in this worker. Never raises: a bad seed must not end the sweep."""
    global _SEEDS_RUN

    seed = int(job["seed"])
    seed_index, _SEEDS_RUN = _SEEDS_RUN, _SEEDS_RUN + 1
    log_path = Path(job["log_path"])
    started = time.monotonic()
    run_dir: str | None = None
    program_ok: bool | None = None
    task_success: bool | None = None
    termination_reason: str | None = None
    error: str | None = None

    log_path.parent.mkdir(parents=True, exist_ok=True)
    with log_path.open("w", encoding="utf-8") as log, _captured_output(log):
        try:
            # Import inside the worker: the parent process never loads the
            # simulator stack, and this is the cost being amortized.
            import random

            import numpy as np

            run_program = _resolve(job["runner"])

            # Make the seed, not the running order, decide any global draw.
            random.seed(seed)
            # Seed the simulator's legacy global RNG, not a separate generator.
            np.random.seed(seed)

            outcome = run_program(
                benchmark=job["benchmark"],
                suite=job["suite"],
                task_id=int(job["task_id"]),
                seed=seed,
                program_path=Path(job["program_path"]),
                output_root=Path(job["output_root"]),
                max_steps=int(job["max_steps"]),
                camera_width=int(job["camera_width"]),
                camera_height=int(job["camera_height"]),
                init_mode=job["init_mode"],
                flat_layout=bool(job["flat_layout"]),
                capture_videos=bool(job["capture_videos"]),
            )
            run_dir = str(outcome.run_dir)
            program_ok = bool(outcome.program_ok)
            task_success = outcome.task_success
            termination_reason = outcome.termination_reason
            # Worker protocol emits the run directory to its captured output.
            print(f"run: {run_dir}", flush=True)
        except (KeyboardInterrupt, SystemExit):
            # Not this seed's failure. Filing it as one made Ctrl-C on a
            # fifteen-seed sweep take fifteen Ctrl-Cs, each writing a bogus
            # recorded failure before the loop moved to the next seed.
            raise
        # Record worker failures; KeyboardInterrupt and SystemExit are re-raised above.
        except BaseException as exc:
            error = f"{type(exc).__name__}: {exc}"
            traceback.print_exc()

    return SeedResult(
        seed=seed,
        ok=run_dir is not None,
        run_dir=run_dir,
        program_ok=program_ok,
        task_success=task_success,
        termination_reason=termination_reason,
        wall_s=round(time.monotonic() - started, 3),
        worker_pid=os.getpid(),
        worker_seed_index=seed_index,
        max_rss_mb=_max_rss_mb(),
        error=error,
    ).to_dict()


@contextlib.contextmanager
def _captured_output(stream: Any) -> Iterator[None]:
    """Point fds 1 and 2 at a log file, so the simulator's C-level output lands there too.

    ``contextlib.redirect_stdout`` rebinds a Python name; MuJoCo, EGL, and
    ffmpeg write to the file descriptor. Rebinding both is what makes a batched
    seed's log the same artifact its own process produced: the dup2 catches the
    simulator, and the redirect catches Python code that holds its own
    reference to ``sys.stdout``.
    """
    sys.stdout.flush()
    sys.stderr.flush()
    saved = (os.dup(1), os.dup(2))
    try:
        os.dup2(stream.fileno(), 1)
        os.dup2(stream.fileno(), 2)
        with contextlib.redirect_stdout(stream), contextlib.redirect_stderr(stream):
            yield
    finally:
        sys.stdout.flush()
        sys.stderr.flush()
        stream.flush()
        for descriptor, original in zip((1, 2), saved, strict=False):
            os.dup2(original, descriptor)
            os.close(original)


def _task_horizon(benchmark: str, suite: str, task_id: int) -> int:
    """The episode length the task's own benchmark states, else the flat default."""
    from cap_harness.run import DEFAULT_MAX_STEPS

    if benchmark == "robosuite":
        from cap_harness.robosuite.registry import RobosuiteTaskRegistry

        stated = RobosuiteTaskRegistry().resolve(suite, task_id).horizon
    else:
        stated = None
    return int(stated) if stated else DEFAULT_MAX_STEPS


def run_seeds(
    *,
    benchmark: str,
    suite: str,
    task_id: int,
    program_path: Path,
    output_root: Path,
    seeds: Sequence[int],
    workers: int = 1,
    recycle_after: int = DEFAULT_RECYCLE_AFTER,
    max_steps: int | None = None,
    camera_width: int = 800,
    camera_height: int = 512,
    init_mode: str = "saved",
    flat_layout: bool = False,
    capture_videos: bool = True,
    log_dir: Path | None = None,
    results_jsonl: Path | None = None,
    on_result: Any = None,
    runner: str = DEFAULT_RUNNER,
) -> list[SeedResult]:
    """Run ``program_path`` on every seed, returning one record per seed.

    Results stream to ``results_jsonl`` as they land, so an interrupted sweep
    leaves the seeds it finished on disk rather than nothing at all.
    """
    if benchmark not in {"libero-pro", "robosuite"}:
        raise ValueError(
            f"run-batch does not accept {benchmark}: only libero-pro and robosuite "
            "support worker reuse. Use a fresh `cap-harness run` process for each episode."
        )
    if init_mode not in {"saved", "seeded"}:
        raise ValueError("init_mode must be 'saved' or 'seeded'")
    if workers < 1:
        raise ValueError("workers must be at least 1")
    if recycle_after < 0:
        raise ValueError("recycle_after must be non-negative")
    if not seeds:
        raise ValueError("no seeds requested")
    if not program_path.is_file():
        raise ValueError(f"program does not exist: {program_path}")

    logs = log_dir if log_dir is not None else output_root / "logs"
    logs.mkdir(parents=True, exist_ok=True)
    if results_jsonl is not None:
        results_jsonl.parent.mkdir(parents=True, exist_ok=True)
        # Truncate: this file is the record of *this* sweep. Appending left a
        # re-run of the same version with two rows per seed, and the documented
        # scoring command then reports "passed 12 of 30" for fifteen seeds.
        results_jsonl.write_text("")

    # One horizon for the whole sweep, resolved once so that every seed is scored
    # against the same budget and the manifest records which one. A sweep whose
    # seeds silently used different episode lengths would not be comparable.
    if max_steps is None:
        resolved_max_steps = _task_horizon(benchmark, suite, task_id)
    else:
        resolved_max_steps = int(max_steps)

    jobs = [
        {
            "seed": int(seed),
            "benchmark": benchmark,
            "suite": suite,
            "task_id": int(task_id),
            "program_path": str(program_path),
            "output_root": str(output_root),
            "max_steps": int(resolved_max_steps),
            "camera_width": int(camera_width),
            "camera_height": int(camera_height),
            "init_mode": init_mode,
            "flat_layout": bool(flat_layout),
            "capture_videos": bool(capture_videos),
            "log_path": str(logs / f"seed_{int(seed):02d}.log"),
            "runner": runner,
        }
        for seed in seeds
    ]

    collected: list[SeedResult] = []

    def record(payload: dict[str, Any]) -> None:
        result = SeedResult(**payload)
        collected.append(result)
        if results_jsonl is not None:
            with results_jsonl.open("a", encoding="utf-8") as stream:
                stream.write(json.dumps(payload, sort_keys=True) + "\n")
        if on_result is not None:
            on_result(result)

    if workers == 1 and recycle_after == 0:
        # One worker that never retires is just this process doing the work --
        # no pool, no pickling, and a traceback the caller can actually see.
        for job in jobs:
            record(_run_seed(job))
        return collected

    # spawn: a forked child would inherit CUDA/EGL state from the parent, which
    # is exactly the cross-seed contamination this module exists to avoid.
    context = multiprocessing.get_context("spawn")
    # ...and spawn is also why the workers need _die_with_parent: they hold a
    # GPU context and ~1.4 GB each, and nothing else reclaims them.
    pool_size = min(workers, len(jobs))
    # Deliberately not multiprocessing.Pool. A worker that dies abruptly -- a
    # MuJoCo or EGL segfault, an OOM kill -- never returns a result, and Pool's
    # imap_unordered then blocks forever: the sweep holds its GPU and the
    # coordinator, told to go idle until notified, is never notified. That is
    # precisely the driver-side crash `recycle_after` exists to bound, and
    # since _run_seed catches everything else, it is the only failure that can
    # escape a worker at all. ProcessPoolExecutor reports it as
    # BrokenProcessPool instead. It has no max_tasks_per_child before 3.11, so
    # retirement comes from running each generation under fresh executors.
    # With recycling, give each worker its own queue of at most recycle_after
    # jobs. A shared queue lets a fast worker consume the whole generation
    # while another is still running its first seed, exceeding the limit.
    generation = pool_size * recycle_after if recycle_after else len(jobs)
    for start in range(0, len(jobs), generation):
        batch = jobs[start : start + generation]
        with contextlib.ExitStack() as stack:
            queues = (
                [batch[index::pool_size] for index in range(pool_size)]
                if recycle_after
                else [batch]
            )
            futures = {}
            for queue in queues:
                if not queue:
                    continue
                pool = stack.enter_context(
                    ProcessPoolExecutor(
                        max_workers=1 if recycle_after else pool_size,
                        mp_context=context,
                        initializer=_die_with_parent,
                    )
                )
                for job in queue:
                    try:
                        futures[pool.submit(_run_seed, job)] = job
                    except BrokenProcessPool as exc:
                        record(_died(job, f"worker died: {type(exc).__name__}: {exc}"))
            for future in as_completed(futures):
                job = futures[future]
                try:
                    record(future.result())
                except BrokenProcessPool as exc:
                    # The worker died mid-seed. Record it and keep going; the
                    # next generation gets a fresh executor.
                    record(_died(job, f"worker died: {type(exc).__name__}: {exc}"))
    collected.sort(key=lambda result: result.seed)
    return collected


def summarize(results: Sequence[SeedResult]) -> dict[str, Any]:
    """Aggregate a sweep. ``passes`` counts benchmark success, not clean exits."""
    finished = [result for result in results if result.ok]
    passes = sum(1 for result in finished if result.task_success)
    return {
        "seeds": len(results),
        "runs": len(finished),
        "missing": [result.seed for result in results if not result.ok],
        "passes": passes,
        # Over every seed asked for, not just those that produced a run: a
        # sweep where five of fifteen crashed and ten passed is 10/15, not 1.0.
        "pass_rate": round(passes / len(results), 6) if results else 0.0,
        "program_errors": [result.seed for result in finished if result.program_ok is False],
        # Summed per-seed time, not the sweep's elapsed time: with several
        # workers the sweep finishes in a fraction of this.
        "seed_wall_s": round(sum(result.wall_s for result in results), 3),
        "results": [result.to_dict() for result in results],
    }


__all__ = [
    "DEFAULT_RECYCLE_AFTER",
    "DEFAULT_RUNNER",
    "SeedResult",
    "parse_seed_arguments",
    "run_seeds",
    "summarize",
]
````

## src/cap_harness/libero/adapter.py

````text
"""Runtime-only direct OffScreenRenderEnv adapter for LIBERO-Pro."""

from __future__ import annotations

from collections.abc import Callable, Mapping
import importlib
from typing import Any, TypeVar

import numpy as np

from cap_harness.contracts import (
    ArmCommand,
    CameraObservation,
    ExecutionResult,
    Observation,
    Pose,
    RobotAction,
    RobotPlanningContext,
    RobotState,
    StepResult,
    TaskContext,
    Trajectory,
)
from cap_harness.errors import ApiError, ErrorCode
from cap_harness.libero.codec import LIBERO_ACTION_DIMENSION, LiberoActionCodec
from cap_harness.libero.registry import LiberoSuiteRegistry, LiberoTaskMetadata

CAMERA_NAMES: tuple[str, str] = ("agentview", "robot0_eye_in_hand")
BASE_FRAME = "robot_base"
PRIMARY_ARM = "primary"
PANDA_JOINT_NAMES: tuple[str, ...] = tuple(f"robot0_joint{i}" for i in range(1, 8))
TRAJECTORY_JOINT_TOLERANCE_RAD = 0.01
TRAJECTORY_MAX_STEPS_PER_WAYPOINT = 120

_LiberoAdapterT = TypeVar("_LiberoAdapterT", bound="LiberoAdapter")


def _as_finite_array(value: Any, name: str, shape: tuple[int, ...]) -> np.ndarray:
    try:
        array = np.asarray(value, dtype=np.float64)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{name} must be a numeric array") from exc
    if array.shape != shape:
        raise ValueError(f"{name} must have shape {shape}, got {array.shape}")
    if not bool(np.all(np.isfinite(array))):
        raise ValueError(f"{name} must contain only finite values")
    return array


def _libero_quaternion_xyzw_to_matrix(quaternion: Any) -> np.ndarray:
    x, y, z, w = _as_finite_array(quaternion, "quaternion", (4,))
    norm = float(np.linalg.norm((x, y, z, w)))
    if norm <= 0.0:
        raise ValueError("quaternion must have nonzero norm")
    x, y, z, w = np.array((x, y, z, w), dtype=np.float64) / norm
    return np.array(
        [
            [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
            [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
            [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)],
        ],
        dtype=np.float64,
    )


def _matrix_to_quaternion_wxyz(rotation: Any) -> np.ndarray:
    matrix = _as_finite_array(rotation, "rotation", (3, 3))
    # Project tiny simulator drift back onto SO(3) before conversion.
    u, _, vh = np.linalg.svd(matrix)
    matrix = u @ vh
    if np.linalg.det(matrix) < 0.0:
        u[:, -1] *= -1.0
        matrix = u @ vh

    trace = float(np.trace(matrix))
    if trace > 0.0:
        scale = np.sqrt(trace + 1.0) * 2.0
        w = 0.25 * scale
        x = (matrix[2, 1] - matrix[1, 2]) / scale
        y = (matrix[0, 2] - matrix[2, 0]) / scale
        z = (matrix[1, 0] - matrix[0, 1]) / scale
    else:
        diagonal = np.diag(matrix)
        index = int(np.argmax(diagonal))
        if index == 0:
            scale = np.sqrt(1.0 + matrix[0, 0] - matrix[1, 1] - matrix[2, 2]) * 2.0
            w = (matrix[2, 1] - matrix[1, 2]) / scale
            x = 0.25 * scale
            y = (matrix[0, 1] + matrix[1, 0]) / scale
            z = (matrix[0, 2] + matrix[2, 0]) / scale
        elif index == 1:
            scale = np.sqrt(1.0 + matrix[1, 1] - matrix[0, 0] - matrix[2, 2]) * 2.0
            w = (matrix[0, 2] - matrix[2, 0]) / scale
            x = (matrix[0, 1] + matrix[1, 0]) / scale
            y = 0.25 * scale
            z = (matrix[1, 2] + matrix[2, 1]) / scale
        else:
            scale = np.sqrt(1.0 + matrix[2, 2] - matrix[0, 0] - matrix[1, 1]) * 2.0
            w = (matrix[1, 0] - matrix[0, 1]) / scale
            x = (matrix[0, 2] + matrix[2, 0]) / scale
            y = (matrix[1, 2] + matrix[2, 1]) / scale
            z = 0.25 * scale
    quaternion = np.array((w, x, y, z), dtype=np.float64)
    quaternion /= np.linalg.norm(quaternion)
    return quaternion


def _transform(rotation: Any, translation: Any) -> np.ndarray:
    transform = np.eye(4, dtype=np.float64)
    transform[:3, :3] = _as_finite_array(rotation, "rotation", (3, 3))
    transform[:3, 3] = _as_finite_array(translation, "translation", (3,))
    return transform


def _default_depth_converter(sim: Any, depth: np.ndarray) -> np.ndarray:
    """Match robosuite's normalized z-buffer to metric-depth conversion."""
    try:
        extent = float(sim.model.stat.extent)
        near = float(sim.model.vis.map.znear) * extent
        far = float(sim.model.vis.map.zfar) * extent
    except (AttributeError, TypeError, ValueError) as exc:
        raise ValueError(
            "metric depth conversion needs sim.model.stat.extent and vis.map near/far"
        ) from exc
    if not np.isfinite(near) or not np.isfinite(far) or near <= 0.0 or far <= near:
        raise ValueError("simulator reports invalid depth clipping planes")
    metric = near / (1.0 - depth * (1.0 - near / far))
    if not bool(np.all(np.isfinite(metric))) or bool(np.any(metric < 0.0)):
        raise ValueError("depth conversion produced invalid metric values")
    return metric


def _load_offscreen_render_env() -> Callable[..., Any]:
    failures: list[BaseException] = []
    for module_name in ("libero.envs", "libero.libero.envs"):
        try:
            module = importlib.import_module(module_name)
        except (ImportError, ModuleNotFoundError) as exc:
            failures.append(exc)
            continue
        factory = getattr(module, "OffScreenRenderEnv", None)
        if callable(factory):
            return factory
    raise ModuleNotFoundError(
        "LIBERO is not installed; install the LIBERO-Pro runtime to create an adapter"
    ) from (failures[-1] if failures else None)


class LiberoAdapter:
    """Normalize a task-specific LIBERO ``OffScreenRenderEnv`` directly."""

    #: The gripper action on this embodiment is a velocity, not a position:
    #: robosuite's `simple_grip` controller assigns `goal_qvel`, so the sign picks
    #: a direction and the jaw travels to its stop. Only the two endpoints are
    #: states the actuator can hold.
    gripper_holds_intermediate = False

    def __init__(
        self,
        *,
        registry: LiberoSuiteRegistry | Any | None = None,
        env_factory: Callable[..., Any] | Any | None = None,
        control_frequency: float = 20.0,
        camera_height: int = 128,
        camera_width: int = 128,
        controller: str = "JOINT_POSITION",
        horizon: int = 1000,
        post_settle_steps: int = 10,
        gripper_max_opening_m: float = 0.04,
        gripper_tolerance: float = 0.05,
        gripper_max_steps: int = 60,
        depth_converter: Callable[[Any, np.ndarray], np.ndarray] | None = None,
        run_observer: Any | None = None,
        init_mode: str = "saved",
    ) -> None:
        if (
            isinstance(camera_height, bool)
            or not isinstance(camera_height, int)
            or camera_height <= 0
        ):
            raise ValueError("camera_height must be a positive integer")
        if isinstance(camera_width, bool) or not isinstance(camera_width, int) or camera_width <= 0:
            raise ValueError("camera_width must be a positive integer")
        if isinstance(horizon, bool) or not isinstance(horizon, int) or horizon <= 0:
            raise ValueError("horizon must be a positive integer")
        if (
            isinstance(post_settle_steps, bool)
            or not isinstance(post_settle_steps, int)
            or post_settle_steps < 0
        ):
            raise ValueError("post_settle_steps must be a non-negative integer")
        if not isinstance(controller, str) or not controller.strip():
            raise ValueError("controller must be a non-empty string")
        if init_mode not in ("saved", "seeded"):
            raise ValueError("init_mode must be 'saved' or 'seeded'")
        if controller != "JOINT_POSITION":
            raise ValueError("LiberoAdapter requires the JOINT_POSITION controller")
        try:
            max_opening = float(gripper_max_opening_m)
        except (TypeError, ValueError) as exc:
            raise ValueError("gripper_max_opening_m must be positive and finite") from exc
        if not np.isfinite(max_opening) or max_opening <= 0.0:
            raise ValueError("gripper_max_opening_m must be positive and finite")
        try:
            gripper_tolerance = float(gripper_tolerance)
        except (TypeError, ValueError) as exc:
            raise ValueError("gripper_tolerance must be positive and finite") from exc
        if not np.isfinite(gripper_tolerance) or gripper_tolerance <= 0.0:
            raise ValueError("gripper_tolerance must be positive and finite")
        if (
            isinstance(gripper_max_steps, bool)
            or not isinstance(gripper_max_steps, int)
            or gripper_max_steps <= 0
        ):
            raise ValueError("gripper_max_steps must be a positive integer")

        # Let the codec own frequency validation so adapter and encoding semantics agree.
        self._codec = LiberoActionCodec(control_frequency=control_frequency)
        self.registry = registry if registry is not None else LiberoSuiteRegistry()
        self._env_factory = env_factory
        self.control_frequency = self._codec.control_frequency
        self.control_period_s = 1.0 / self.control_frequency
        self.camera_height = camera_height
        self.camera_width = camera_width
        self.controller = controller
        self.horizon = horizon
        self.post_settle_steps = post_settle_steps
        self.gripper_max_opening_m = max_opening
        self.gripper_tolerance = gripper_tolerance
        self.gripper_max_steps = gripper_max_steps
        self._depth_converter = depth_converter or _default_depth_converter
        self._run_observer = run_observer
        self.init_mode = init_mode

        self._env: Any | None = None
        self._environment_task_ref: str | None = None
        self._task_metadata: LiberoTaskMetadata | None = None
        self._task_context: TaskContext | None = None
        self._selected_init_state_index: int | None = None
        self._seed: int | None = None
        self._raw_observation: Mapping[str, Any] | None = None
        self._elapsed_steps = 0
        self._last_reward: float | None = None
        self._last_native_info: Mapping[str, Any] = {}
        self._last_terminated = False
        self._last_truncated = False
        self._action_bounds: tuple[np.ndarray, np.ndarray] | None = None
        self._extensions: Any | None = None
        self._closed = False

    @property
    def embodiment(self) -> str:
        return "libero"

    @property
    def native_env(self) -> Any:
        """Runtime-only access to the direct OffScreenRenderEnv instance."""
        return self._require_env()

    @property
    def current_time_s(self) -> float:
        return self._elapsed_steps * self.control_period_s

    def get_current_time_s(self) -> float:
        return self.current_time_s

    def get_planning_context(self) -> RobotPlanningContext:
        """Return non-privileged Panda model calibration for external planners."""
        self._require_env()
        return RobotPlanningContext(
            embodiment=self.embodiment,
            model="panda",
            joint_names={PRIMARY_ARM: PANDA_JOINT_NAMES},
            base_transforms={PRIMARY_ARM: np.eye(4, dtype=np.float64)},
            end_effector_links={PRIMARY_ARM: "panda_hand"},
        )

    @property
    def task_metadata(self) -> LiberoTaskMetadata:
        if self._task_metadata is None:
            raise RuntimeError("reset() must be called before task metadata is available")
        return self._task_metadata

    @property
    def selected_init_state_index(self) -> int | None:
        """Saved-state index, or None in seeded mode where no saved state is applied.

        Gated on ``_seed`` rather than on the index itself, because None is a
        legitimate value here: seeded mode deliberately applies no saved state.
        """
        if self._seed is None:
            raise RuntimeError("reset() must be called before init-state metadata is available")
        return self._selected_init_state_index

    @property
    def seed(self) -> int:
        if self._seed is None:
            raise RuntimeError("reset() must be called before seed metadata is available")
        return self._seed

    @property
    def action_bounds(self) -> tuple[np.ndarray, np.ndarray]:
        if self._action_bounds is None:
            raise RuntimeError("reset() must be called before action bounds are available")
        return self._action_bounds[0].copy(), self._action_bounds[1].copy()

    @property
    def extensions(self) -> Any:
        if self._extensions is None:
            from cap_harness.libero.extensions import LiberoRuntimeExtensions

            self._extensions = LiberoRuntimeExtensions(self)
        return self._extensions

    def _require_env(self) -> Any:
        if self._env is None:
            raise RuntimeError("reset() must be called before using the LIBERO adapter")
        return self._env

    @staticmethod
    def _extract_observation(reset_result: Any) -> Mapping[str, Any]:
        candidate = reset_result
        if isinstance(reset_result, tuple) and len(reset_result) == 2:
            candidate = reset_result[0]
        if not isinstance(candidate, Mapping):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("LIBERO reset/set_init_state did not return an observation mapping")
        return candidate

    def _read_action_spec(self, env: Any) -> tuple[np.ndarray, np.ndarray]:
        spec: Any = getattr(env, "action_spec", None)
        if spec is None and getattr(env, "env", None) is not None:
            spec = getattr(env.env, "action_spec", None)
        if callable(spec):
            spec = spec()
        if hasattr(spec, "low") and hasattr(spec, "high"):
            spec = (spec.low, spec.high)
        return LiberoActionCodec.validate_action_spec(spec)

    def _close_environment(self) -> None:
        if self._env is None:
            return
        env, self._env = self._env, None
        self._environment_task_ref = None
        close = getattr(env, "close", None)
        if callable(close):
            close()

    def _create_environment(self, metadata: LiberoTaskMetadata) -> Any:
        if self._environment_task_ref == metadata.task_ref and self._env is not None:
            return self._env
        self._close_environment()
        factory = (
            self._env_factory if self._env_factory is not None else _load_offscreen_render_env()
        )
        kwargs = {
            "bddl_file_name": str(metadata.bddl_path),
            "camera_depths": True,
            "camera_heights": self.camera_height,
            "camera_names": list(CAMERA_NAMES),
            "camera_widths": self.camera_width,
            "control_freq": self.control_frequency,
            "controller": self.controller,
            "horizon": self.horizon,
        }
        env = factory(**kwargs) if callable(factory) else factory
        if env is None:
            raise RuntimeError("env_factory returned None")
        self._env = env
        self._environment_task_ref = metadata.task_ref
        self._action_bounds = self._read_action_spec(env)
        return env

    def _unpack_native_result(
        self, result: Any
    ) -> tuple[Mapping[str, Any], float, bool, bool, Mapping[str, Any]]:
        if not isinstance(result, tuple) or len(result) not in (4, 5):
            raise ValueError("LIBERO step() must return a four- or five-element tuple")
        if len(result) == 4:
            raw_observation, reward, done, info = result
            terminated, truncated = bool(done), False
        else:
            raw_observation, reward, terminated, truncated, info = result
            terminated, truncated = bool(terminated), bool(truncated)
        raw_observation = self._extract_observation(raw_observation)
        try:
            numeric_reward = float(reward)
        except (TypeError, ValueError) as exc:
            raise ValueError("LIBERO step reward must be numeric") from exc
        if not np.isfinite(numeric_reward):
            raise ValueError("LIBERO step reward must be finite")
        if not isinstance(info, Mapping):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("LIBERO step info must be a mapping")
        return raw_observation, numeric_reward, terminated, truncated, info

    def _settle(self, env: Any) -> None:
        for _ in range(self.post_settle_steps):
            if self._raw_observation is None:
                raise RuntimeError("cannot settle without a raw observation")
            normalized_gripper = self._normalized_gripper(self._raw_observation)
            native_action = np.zeros(LIBERO_ACTION_DIMENSION, dtype=np.float64)
            native_action[-1] = LiberoActionCodec.normalized_gripper_to_native(normalized_gripper)
            if self._action_bounds is None:  # pragma: no cover - established at env creation
                raise RuntimeError("LIBERO action bounds are unavailable")
            native_action = np.clip(native_action, *self._action_bounds)
            (
                self._raw_observation,
                self._last_reward,
                self._last_terminated,
                self._last_truncated,
                self._last_native_info,
            ) = self._unpack_native_result(env.step(native_action))

    def reset(self, task_ref: Any, seed: int) -> Observation:
        """Reset a task, choose its deterministic init state, settle, and zero public time."""
        if self._closed:
            raise RuntimeError("the LIBERO adapter is closed")
        if isinstance(seed, bool | np.bool_) or not isinstance(seed, int | np.integer):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("seed must be an integer")
        seed = int(seed)
        metadata = self.registry.resolve(task_ref)
        init_states = self.registry.get_init_states(metadata)
        if len(init_states) != metadata.init_state_count:
            raise ValueError(
                f"init-state count changed for {metadata.task_ref}: "
                f"manifest={metadata.init_state_count}, runtime={len(init_states)}"
            )
        if self.init_mode == "seeded":
            # Procedural placement. env.seed(seed) seeds np.random, and env.reset()
            # re-samples every object pose through the placement initializer
            # (bddl_base_domain._reset_internal, guarded by deterministic_reset).
            # Restoring a saved state afterwards would overwrite exactly that
            # randomization -- which is what previously pinned all 50 seeds to one
            # scene -- so seeded mode applies no saved state at all.
            state_index = None
        elif not init_states:
            raise ValueError(
                f"{metadata.task_ref} ships no saved init states, so init_mode "
                "'saved' cannot select a layout; use init_mode 'seeded'"
            )
        else:
            state_index = (seed - 1) % len(init_states)
        env = self._create_environment(metadata)

        seed_method = getattr(env, "seed", None)
        if callable(seed_method):
            seed_method(seed)
        self._raw_observation = self._extract_observation(env.reset())
        if state_index is not None:
            set_result = env.set_init_state(init_states[state_index])
            if set_result is not None:
                self._raw_observation = self._extract_observation(set_result)

        self._task_metadata = metadata
        self._selected_init_state_index = state_index
        self._seed = seed
        self._task_context = TaskContext(
            suite=metadata.suite_name,
            task_id=metadata.task_id,
            task_name=metadata.task_name,
            language=metadata.language,
            family=metadata.family,
            metadata={
                "init_state_count": metadata.init_state_count,
                "init_state_index": state_index,
                "init_mode": self.init_mode,
                "task_ref": metadata.task_ref,
            },
        )
        self._last_reward = None
        self._last_native_info = {}
        self._last_terminated = False
        self._last_truncated = False
        self._settle(env)

        # Settling belongs to reset, not to the public episode timeline.
        self._elapsed_steps = 0
        observation = self.get_observation()
        if self._run_observer is not None:
            self._run_observer.on_reset(observation, metadata.to_manifest_record())
        return observation

    @staticmethod
    def _named_id(model: Any, kind: str, name: str) -> int:
        legacy_lookup = getattr(model, f"{kind}_name2id", None)
        if callable(legacy_lookup):
            return int(legacy_lookup(name))
        modern_lookup = getattr(model, kind, None)
        if callable(modern_lookup):
            return int(modern_lookup(name).id)
        raise ValueError(f"simulator model cannot resolve {kind} {name!r}")

    @classmethod
    def _body_transform(cls, sim: Any, body_name: str) -> np.ndarray:
        data = sim.data
        get_rotation = getattr(data, "get_body_xmat", None)
        get_position = getattr(data, "get_body_xpos", None)
        if callable(get_rotation) and callable(get_position):
            rotation = np.asarray(get_rotation(body_name), dtype=np.float64).reshape(3, 3)
            position = get_position(body_name)
        else:
            body_id = cls._named_id(sim.model, "body", body_name)
            rotation = np.asarray(data.xmat[body_id], dtype=np.float64).reshape(3, 3)
            position = data.xpos[body_id]
        return _transform(rotation, position)

    @classmethod
    def _camera_transform(cls, sim: Any, camera_name: str) -> np.ndarray:
        data = sim.data
        get_rotation = getattr(data, "get_camera_xmat", None)
        get_position = getattr(data, "get_camera_xpos", None)
        if callable(get_rotation) and callable(get_position):
            rotation = np.asarray(get_rotation(camera_name), dtype=np.float64).reshape(3, 3)
            position = get_position(camera_name)
        else:
            camera_id = cls._named_id(sim.model, "camera", camera_name)
            rotation = np.asarray(data.cam_xmat[camera_id], dtype=np.float64).reshape(3, 3)
            position = data.cam_xpos[camera_id]
        return _transform(rotation, position)

    @classmethod
    def _camera_fovy(cls, sim: Any, camera_name: str) -> float:
        camera_id = cls._named_id(sim.model, "camera", camera_name)
        fovy = float(np.asarray(sim.model.cam_fovy)[camera_id])
        if not np.isfinite(fovy) or fovy <= 0.0 or fovy >= 180.0:
            raise ValueError(f"camera {camera_name!r} reports invalid fovy {fovy}")
        return fovy

    def _base_from_world(self) -> np.ndarray:
        env = self._require_env()
        return np.linalg.inv(self._body_transform(env.sim, "robot0_base"))

    def _camera_observation(
        self, camera_name: str, raw: Mapping[str, Any], timestamp_s: float
    ) -> CameraObservation:
        rgb_key = f"{camera_name}_image"
        depth_key = f"{camera_name}_depth"
        if rgb_key not in raw or depth_key not in raw:
            raise ValueError(f"LIBERO observation is missing RGB-D for {camera_name!r}")
        rgb = np.asarray(raw[rgb_key])
        if rgb.ndim != 3 or rgb.shape[2] != 3:
            raise ValueError(f"{rgb_key} must have shape (H, W, 3)")
        rgb = np.ascontiguousarray(rgb[::-1])

        raw_depth = np.asarray(raw[depth_key], dtype=np.float64)
        if raw_depth.ndim == 3 and raw_depth.shape[2] == 1:
            raw_depth = raw_depth[:, :, 0]
        if raw_depth.shape != rgb.shape[:2]:
            raise ValueError(f"{depth_key} must have shape {rgb.shape[:2]}, got {raw_depth.shape}")
        raw_depth = np.ascontiguousarray(raw_depth[::-1])
        env = self._require_env()
        depth_m = np.asarray(self._depth_converter(env.sim, raw_depth), dtype=np.float64)
        if depth_m.shape != raw_depth.shape:
            raise ValueError("depth_converter must preserve the depth image shape")

        height, width = rgb.shape[:2]
        fovy = self._camera_fovy(env.sim, camera_name)
        focal = 0.5 * height / np.tan(np.deg2rad(fovy) / 2.0)
        intrinsics = np.array(
            [[focal, 0.0, 0.5 * width], [0.0, focal, 0.5 * height], [0.0, 0.0, 1.0]],
            dtype=np.float64,
        )

        # MuJoCo cameras use OpenGL axes. Flip camera Y/Z to publish the
        # conventional +X-right, +Y-down, +Z-forward image frame.
        opengl_to_image = np.diag((1.0, -1.0, -1.0, 1.0))
        base_from_camera = (
            self._base_from_world() @ self._camera_transform(env.sim, camera_name) @ opengl_to_image
        )
        camera_pose = Pose(
            position=base_from_camera[:3, 3],
            quaternion_wxyz=_matrix_to_quaternion_wxyz(base_from_camera[:3, :3]),
            frame=BASE_FRAME,
        )
        return CameraObservation(
            rgb=rgb,
            depth_m=depth_m,
            intrinsics=intrinsics,
            frame=f"camera/{camera_name}",
            camera_pose=camera_pose,
            timestamp_s=timestamp_s,
        )

    def _normalized_gripper(self, raw: Mapping[str, Any]) -> float:
        if "robot0_gripper_qpos" not in raw:
            raise ValueError("LIBERO observation is missing robot0_gripper_qpos")
        qpos = np.asarray(raw["robot0_gripper_qpos"], dtype=np.float64).reshape(-1)
        if qpos.size == 0 or not bool(np.all(np.isfinite(qpos))):
            raise ValueError("robot0_gripper_qpos must contain finite values")
        return float(np.clip(qpos[0] / self.gripper_max_opening_m, 0.0, 1.0))

    def _end_effector_pose(self, raw: Mapping[str, Any]) -> Pose:
        base_from_world = self._base_from_world()
        if "robot0_eef_pos" in raw and "robot0_eef_quat" in raw:
            world_from_eef = _transform(
                _libero_quaternion_xyzw_to_matrix(raw["robot0_eef_quat"]),
                raw["robot0_eef_pos"],
            )
        else:
            env = self._require_env()
            world_from_eef = self._body_transform(env.sim, "gripper0_eef")
        base_from_eef = base_from_world @ world_from_eef
        return Pose(
            position=base_from_eef[:3, 3],
            quaternion_wxyz=_matrix_to_quaternion_wxyz(base_from_eef[:3, :3]),
            frame=BASE_FRAME,
        )

    def get_robot_state(self) -> RobotState:
        if self._raw_observation is None:
            raise RuntimeError("reset() must be called before reading robot state")
        raw = self._raw_observation
        joints = _as_finite_array(raw.get("robot0_joint_pos"), "robot0_joint_pos", (7,))
        if "robot0_joint_vel" in raw:
            velocities = _as_finite_array(raw["robot0_joint_vel"], "robot0_joint_vel", (7,))
        else:
            velocities = np.zeros(7, dtype=np.float64)
        return RobotState(
            joint_positions={PRIMARY_ARM: joints},
            joint_velocities={PRIMARY_ARM: velocities},
            end_effector_poses={PRIMARY_ARM: self._end_effector_pose(raw)},
            gripper_positions={PRIMARY_ARM: self._normalized_gripper(raw)},
            base_frame=BASE_FRAME,
            joint_names={PRIMARY_ARM: PANDA_JOINT_NAMES},
            timestamp_s=self.current_time_s,
            embodiment=self.embodiment,
        )

    def get_task_context(self) -> TaskContext:
        if self._task_context is None:
            raise RuntimeError("reset() must be called before reading task context")
        return self._task_context

    def get_observation(self) -> Observation:
        if self._raw_observation is None:
            raise RuntimeError("reset() must be called before reading observations")
        timestamp_s = self.current_time_s
        cameras = {
            camera_name: self._camera_observation(camera_name, self._raw_observation, timestamp_s)
            for camera_name in CAMERA_NAMES
        }
        return Observation(
            cameras=cameras,
            robot_state=self.get_robot_state(),
            task_context=self.get_task_context(),
            timestamp_s=timestamp_s,
        )

    def native_step(self, action: RobotAction) -> StepResult:
        """Runtime-only step retaining native reward and sanitized-at-boundary info."""
        env = self._require_env()
        if action.embodiment != self.embodiment:
            raise ValueError(
                f"action embodiment {action.embodiment!r} does not match {self.embodiment!r}"
            )
        if self._run_observer is not None:
            self._run_observer.before_step(action)
        if self._action_bounds is None:  # pragma: no cover - established by reset
            raise RuntimeError("LIBERO action bounds are unavailable")
        native_action = self._codec.encode(
            action,
            self.get_robot_state(),
            action_spec=self._action_bounds,
        )
        try:
            native_result = env.step(native_action)
        # Convert native/provider failures into the public typed error result.
        except Exception as exc:
            result = StepResult(
                ok=False,
                error=ApiError(
                    code=ErrorCode.ADAPTER_FAILED,
                    message=f"LIBERO native step failed: {exc}",
                    details={"exception_type": type(exc).__name__},
                ),
            )
            if self._run_observer is not None:
                self._run_observer.after_step(action, result)
            return result

        # A returned native step advanced one control period even if output
        # normalization subsequently fails.
        self._elapsed_steps += 1
        try:
            (
                self._raw_observation,
                self._last_reward,
                self._last_terminated,
                self._last_truncated,
                self._last_native_info,
            ) = self._unpack_native_result(native_result)
            observation = self.get_observation()
        # Convert native/provider failures into the public typed error result.
        except Exception as exc:
            result = StepResult(
                ok=False,
                error=ApiError(
                    code=ErrorCode.ADAPTER_FAILED,
                    message=f"LIBERO step normalization failed: {exc}",
                    details={"exception_type": type(exc).__name__},
                ),
            )
            if self._run_observer is not None:
                self._run_observer.after_step(action, result)
            return result
        result = StepResult(
            ok=True,
            observation=observation,
            terminated=self._last_terminated,
            truncated=self._last_truncated,
            reward=self._last_reward,
            diagnostics={"native_info": self._last_native_info},
        )
        if self._run_observer is not None:
            self._run_observer.after_step(action, result)
        return result

    def step(self, action: RobotAction) -> StepResult:
        """Advance exactly one native control period and return a public result."""
        runtime_result = self.native_step(action)
        public_error = runtime_result.public_view().error
        return StepResult(
            ok=runtime_result.ok,
            observation=runtime_result.observation,
            terminated=runtime_result.terminated,
            truncated=runtime_result.truncated,
            reward=None,
            error=public_error,
            diagnostics={
                "control_period_s": self.control_period_s,
                "step_index": self._elapsed_steps,
            },
        )

    def execute_trajectory(self, trajectory: Trajectory) -> ExecutionResult:
        if not isinstance(trajectory, Trajectory):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("trajectory must be a Trajectory")
        if trajectory.embodiment != self.embodiment:
            raise ValueError(
                f"trajectory embodiment {trajectory.embodiment!r} "
                f"does not match {self.embodiment!r}"
            )
        if trajectory.arm != PRIMARY_ARM:
            raise ValueError("LIBERO trajectories must target the 'primary' arm")
        if not np.isclose(trajectory.dt_s, self.control_period_s, rtol=0.0, atol=1e-9):
            raise ValueError(
                f"trajectory dt_s must equal LIBERO control period {self.control_period_s}"
            )
        state = self.get_robot_state()
        expected = trajectory.expected_start
        if set(expected.arms) != {PRIMARY_ARM} or tuple(expected.joint_names[PRIMARY_ARM]) != tuple(
            state.joint_names[PRIMARY_ARM]
        ):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(ErrorCode.STALE_PLAN, "trajectory start metadata is stale"),
            )
        start_error = float(
            np.max(
                np.abs(expected.joint_positions[PRIMARY_ARM] - state.joint_positions[PRIMARY_ARM])
            )
        )
        gripper_error = abs(
            expected.gripper_positions[PRIMARY_ARM] - state.gripper_positions[PRIMARY_ARM]
        )
        if max(start_error, gripper_error) > 0.02:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    ErrorCode.STALE_PLAN,
                    "trajectory start no longer matches measured robot state",
                    details={
                        "joint_error_rad": {PRIMARY_ARM: start_error},
                        "gripper_error": {PRIMARY_ARM: gripper_error},
                        "tolerance": 0.02,
                    },
                ),
                final_errors={PRIMARY_ARM: start_error},
            )
        final_observation: Observation | None = None
        steps_executed = 0
        terminated = False
        truncated = False

        def apply_waypoint(index: int) -> StepResult:
            joints = trajectory.joint_positions[index]
            gripper = (
                None
                if trajectory.gripper_positions is None
                else float(trajectory.gripper_positions[index])
            )
            return self.step(
                RobotAction(
                    arms={
                        PRIMARY_ARM: ArmCommand(
                            mode="joint_position",
                            target=joints,
                            gripper_position=gripper,
                            embodiment=self.embodiment,
                        )
                    }
                )
            )

        for index, _joints in enumerate(trajectory.joint_positions):
            result = apply_waypoint(index)
            if not result.ok or result.observation is None:
                return ExecutionResult(
                    ok=False,
                    steps_executed=steps_executed,
                    final_observation=final_observation,
                    terminated=result.terminated,
                    truncated=result.truncated,
                    error=result.error
                    or ApiError(
                        code=ErrorCode.EXECUTION_FAILED,
                        message="trajectory step returned no observation",
                    ),
                    diagnostics={"failed_waypoint": index},
                )
            steps_executed += 1
            final_observation = result.observation
            terminated, truncated = result.terminated, result.truncated
            if terminated or truncated:
                break

        final_joints = trajectory.joint_positions[-1]
        error_rad = float(
            np.max(
                np.abs(final_observation.robot_state.joint_positions[PRIMARY_ARM] - final_joints)
            )
        )
        for _ in range(TRAJECTORY_MAX_STEPS_PER_WAYPOINT - 1):
            if error_rad <= TRAJECTORY_JOINT_TOLERANCE_RAD or terminated or truncated:
                break
            result = apply_waypoint(len(trajectory.joint_positions) - 1)
            if not result.ok or result.observation is None:
                return ExecutionResult(
                    ok=False,
                    steps_executed=steps_executed,
                    final_observation=final_observation,
                    terminated=result.terminated,
                    truncated=result.truncated,
                    error=result.error
                    or ApiError(
                        code=ErrorCode.EXECUTION_FAILED,
                        message="final trajectory settle returned no observation",
                    ),
                    diagnostics={"failed_waypoint": len(trajectory.joint_positions) - 1},
                )
            steps_executed += 1
            final_observation = result.observation
            terminated, truncated = result.terminated, result.truncated
            error_rad = float(
                np.max(
                    np.abs(
                        final_observation.robot_state.joint_positions[PRIMARY_ARM] - final_joints
                    )
                )
            )
        if error_rad > TRAJECTORY_JOINT_TOLERANCE_RAD and not (terminated or truncated):
            return ExecutionResult(
                ok=False,
                steps_executed=steps_executed,
                final_observation=final_observation,
                error=ApiError(
                    code=ErrorCode.TIMEOUT,
                    message="final trajectory waypoint did not converge",
                    details={
                        "joint_error_rad": error_rad,
                        "tolerance_rad": TRAJECTORY_JOINT_TOLERANCE_RAD,
                        "max_steps": TRAJECTORY_MAX_STEPS_PER_WAYPOINT,
                    },
                ),
                diagnostics={"failed_waypoint": len(trajectory.joint_positions) - 1},
            )
        if terminated or truncated:
            return ExecutionResult(
                ok=False,
                steps_executed=steps_executed,
                final_observation=final_observation,
                terminated=terminated,
                truncated=truncated,
                error=ApiError(
                    ErrorCode.TRUNCATED if truncated else ErrorCode.TERMINATED,
                    "episode ended before trajectory execution completed",
                ),
                final_errors={PRIMARY_ARM: error_rad},
                diagnostics={
                    "control_period_s": self.control_period_s,
                    "joint_error_rad": error_rad,
                },
            )
        return ExecutionResult(
            ok=True,
            steps_executed=steps_executed,
            final_observation=final_observation,
            terminated=terminated,
            truncated=truncated,
            final_errors={PRIMARY_ARM: error_rad},
            diagnostics={
                "control_period_s": self.control_period_s,
                "joint_error_rad": error_rad,
            },
        )

    def set_grippers(self, positions: Mapping[str, float]) -> ExecutionResult:
        """One-arm compatibility wrapper with one-control-tick semantics."""
        if not isinstance(positions, Mapping) or set(positions) != {PRIMARY_ARM}:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    ErrorCode.INVALID_REQUEST,
                    "positions must contain only the 'primary' arm",
                ),
            )
        try:
            numeric = float(positions[PRIMARY_ARM])
        except (TypeError, ValueError):
            numeric = float("nan")
        if not np.isfinite(numeric) or not 0.0 <= numeric <= 1.0:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    ErrorCode.INVALID_REQUEST,
                    "gripper position must be finite and in [0, 1]",
                ),
            )
        state = self.get_robot_state()
        result = self.step(
            RobotAction(
                arms={
                    PRIMARY_ARM: ArmCommand(
                        mode="joint_position",
                        target=state.joint_positions[PRIMARY_ARM],
                        gripper_position=numeric,
                    )
                }
            )
        )
        terminal = result.terminated or result.truncated
        return ExecutionResult(
            ok=result.ok and not terminal,
            steps_executed=1 if result.ok else 0,
            final_observation=result.observation,
            terminated=result.terminated,
            truncated=result.truncated,
            error=result.error
            or (
                ApiError(
                    ErrorCode.TRUNCATED if result.truncated else ErrorCode.TERMINATED,
                    "episode ended during the coordinated gripper tick",
                )
                if terminal
                else None
            ),
        )

    def set_gripper(self, position: float, *, arm: str = PRIMARY_ARM) -> ExecutionResult:
        return self._drive_gripper(position, arm=arm, accept_contact_stall=False)

    def close_gripper(self, *, arm: str = PRIMARY_ARM) -> ExecutionResult:
        """Close fully, accepting a stable nonzero position as object contact."""
        return self._drive_gripper(0.0, arm=arm, accept_contact_stall=True)

    def _drive_gripper(
        self,
        position: float,
        *,
        arm: str,
        accept_contact_stall: bool,
    ) -> ExecutionResult:
        if arm != PRIMARY_ARM:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.NOT_FOUND,
                    message=f"LIBERO has no arm {arm!r}",
                ),
            )
        if isinstance(position, bool | np.bool_):
            position = float("nan")
        try:
            normalized = float(position)
        except (TypeError, ValueError):
            normalized = float("nan")
        if not np.isfinite(normalized) or not 0.0 <= normalized <= 1.0:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message="gripper position must be finite and in [0, 1]",
                ),
            )
        state = self.get_robot_state()
        actual = state.gripper_positions[PRIMARY_ARM]
        if abs(actual - normalized) <= self.gripper_tolerance:
            return ExecutionResult(
                ok=True,
                steps_executed=0,
                final_observation=self.get_observation(),
                diagnostics={
                    "target_position": normalized,
                    "final_position": actual,
                    "tolerance": self.gripper_tolerance,
                },
            )

        final_observation: Observation | None = None
        recent_positions: list[float] = []
        for step_index in range(self.gripper_max_steps):
            result = self.step(
                RobotAction(
                    arms={
                        PRIMARY_ARM: ArmCommand(
                            mode="joint_position",
                            target=state.joint_positions[PRIMARY_ARM],
                            gripper_position=normalized,
                            embodiment=self.embodiment,
                        )
                    }
                )
            )
            if not result.ok or result.observation is None:
                return ExecutionResult(
                    ok=False,
                    steps_executed=step_index,
                    final_observation=final_observation,
                    terminated=result.terminated,
                    truncated=result.truncated,
                    error=result.error
                    or ApiError(
                        code=ErrorCode.EXECUTION_FAILED,
                        message="gripper step returned no observation",
                    ),
                )
            final_observation = result.observation
            state = final_observation.robot_state
            actual = state.gripper_positions[PRIMARY_ARM]
            recent_positions.append(actual)
            steps_executed = step_index + 1
            if result.terminated or result.truncated:
                return ExecutionResult(
                    ok=False,
                    steps_executed=steps_executed,
                    final_observation=final_observation,
                    terminated=result.terminated,
                    truncated=result.truncated,
                    error=ApiError(
                        code=ErrorCode.TERMINATED,
                        message="episode ended before the gripper reached its target",
                        details={"target_position": normalized, "final_position": actual},
                    ),
                )
            if abs(actual - normalized) <= self.gripper_tolerance:
                return ExecutionResult(
                    ok=True,
                    steps_executed=steps_executed,
                    final_observation=final_observation,
                    diagnostics={
                        "target_position": normalized,
                        "final_position": actual,
                        "tolerance": self.gripper_tolerance,
                        "completion": "target_reached",
                    },
                )
            stall_window = 5
            if (
                accept_contact_stall
                and normalized == 0.0
                and len(recent_positions) >= stall_window
                and max(recent_positions[-stall_window:]) - min(recent_positions[-stall_window:])
                <= 0.005
            ):
                return ExecutionResult(
                    ok=True,
                    steps_executed=steps_executed,
                    final_observation=final_observation,
                    diagnostics={
                        "target_position": normalized,
                        "final_position": actual,
                        "completion": "contact_stall",
                        "stall_window_steps": stall_window,
                    },
                )

        return ExecutionResult(
            ok=False,
            steps_executed=self.gripper_max_steps,
            final_observation=final_observation,
            error=ApiError(
                code=ErrorCode.TIMEOUT,
                message="gripper did not reach its target within the step limit",
                details={
                    "target_position": normalized,
                    "final_position": actual,
                    "max_steps": self.gripper_max_steps,
                },
            ),
        )

    def compute_reward(self) -> float | None:
        """Return the latest native reward for evaluator/runtime use only."""
        return self._last_reward

    def check_success(self) -> bool:
        """Evaluate LIBERO's privileged success predicate for runtime use only."""
        env = self._require_env()
        checker = getattr(env, "check_success", None)
        if checker is None and getattr(env, "env", None) is not None:
            checker = getattr(env.env, "_check_success", None)
        if not callable(checker):
            # Unavailable simulator state, not an argument type error.
            raise RuntimeError("LIBERO environment has no success predicate")
        return bool(checker())

    def get_task_metadata(self) -> Mapping[str, object]:
        return self.extensions.get_task_metadata()

    def get_controller_metadata(self) -> Mapping[str, object]:
        return self.extensions.get_controller_metadata()

    def close(self) -> None:
        if self._closed:
            return
        self._close_environment()
        self._closed = True

    # Preserve subclass typing on Python 3.10 without a new typing_extensions dependency.
    def __enter__(self: _LiberoAdapterT) -> _LiberoAdapterT:  # noqa: PYI019
        if self._closed:
            raise RuntimeError("the LIBERO adapter is closed")
        return self

    def __exit__(self, exc_type: object, exc: object, traceback: object) -> None:
        del exc_type, exc, traceback
        self.close()
````

## src/cap_harness/robosuite/adapter.py

````text
"""Typed, frame-explicit adapter for the supported Robosuite tasks."""

from __future__ import annotations

from collections.abc import Callable, Mapping
import importlib
from types import MappingProxyType
from typing import Any

import numpy as np

from cap_harness.contracts import (
    ArmCommand,
    CameraObservation,
    ExecutionResult,
    Observation,
    Pose,
    RobotAction,
    RobotPlanningContext,
    RobotState,
    StepResult,
    SynchronizedTrajectory,
    TaskContext,
    Trajectory,
)
from cap_harness.errors import ApiError, ErrorCode
from cap_harness.geometry import invert_transform, matrix_to_pose, transform_pose
from cap_harness.robosuite.codec import RobosuiteActionCodec
from cap_harness.robosuite.registry import RobosuiteTaskMetadata, RobosuiteTaskRegistry

PANDA_JOINT_NAMES = tuple(f"panda_joint{i}" for i in range(1, 8))
TRAJECTORY_TOLERANCE_RAD = 0.01
TRAJECTORY_START_TOLERANCE_RAD = 0.02
TRAJECTORY_MAX_STEPS_PER_WAYPOINT = 120
_EEF_TO_HAND_ROTATION = np.array(
    [[0.0, -1.0, 0.0], [1.0, 0.0, 0.0], [0.0, 0.0, 1.0]], dtype=np.float64
)


def _transform(rotation: Any, position: Any) -> np.ndarray:
    result = np.eye(4, dtype=np.float64)
    result[:3, :3] = np.asarray(rotation, dtype=np.float64).reshape(3, 3)
    result[:3, 3] = np.asarray(position, dtype=np.float64).reshape(3)
    return result


def _metric_depth(sim: Any, depth: np.ndarray) -> np.ndarray:
    extent = float(sim.model.stat.extent)
    near = float(sim.model.vis.map.znear) * extent
    far = float(sim.model.vis.map.zfar) * extent
    return near / (1.0 - depth * (1.0 - near / far))


class RobosuiteAdapter:
    """Normalize Robosuite 1.4 without exposing native state to generated code."""

    #: The gripper action on this embodiment is a velocity, not a position:
    #: robosuite's `simple_grip` controller assigns `goal_qvel`, so the sign picks
    #: a direction and the jaw travels to its stop. Only the two endpoints are
    #: states the actuator can hold.
    gripper_holds_intermediate = False

    BASE_FRAME = "robot0_base"
    SECONDARY_BASE_FRAME = "robot1_base"

    def __init__(
        self,
        *,
        registry: RobosuiteTaskRegistry | None = None,
        env_factory: Callable[..., Any] | None = None,
        control_frequency: float = 20.0,
        camera_height: int = 128,
        camera_width: int = 128,
        horizon: int = 1000,
        run_observer: Any | None = None,
    ) -> None:
        if camera_height <= 0 or camera_width <= 0 or horizon <= 0:
            raise ValueError("camera dimensions and horizon must be positive")
        self.registry = registry or RobosuiteTaskRegistry()
        self._env_factory = env_factory
        self.control_frequency = float(control_frequency)
        if not np.isfinite(self.control_frequency) or self.control_frequency <= 0:
            raise ValueError("control_frequency must be positive and finite")
        self.control_period_s = 1.0 / self.control_frequency
        self.camera_height = int(camera_height)
        self.camera_width = int(camera_width)
        self.horizon = int(horizon)
        self.controller = "JOINT_POSITION"
        self._run_observer = run_observer
        self._protocol_evaluator: Any | None = None
        self._env: Any | None = None
        self._metadata: RobosuiteTaskMetadata | None = None
        self._task_context: TaskContext | None = None
        self._raw_observation: Mapping[str, Any] | None = None
        self._codec: RobosuiteActionCodec | None = None
        self._action_bounds: tuple[np.ndarray, np.ndarray] | None = None
        self._elapsed_steps = 0
        self._seed: int | None = None
        self._gripper_targets: dict[str, float] = {}
        self._joint_targets: dict[str, np.ndarray] = {}
        self._last_reward: float | None = None
        self._last_terminated = False
        self._last_truncated = False
        self._closed = False

    @property
    def embodiment(self) -> str:
        return "robosuite"

    @property
    def current_time_s(self) -> float:
        return self._elapsed_steps * self.control_period_s

    def get_planning_context(self) -> RobotPlanningContext:
        """Return calibrated Panda chains without exposing task object state."""
        transforms = {"primary": np.eye(4, dtype=np.float64)}
        links = {"primary": "panda_hand"}
        joint_names = {"primary": PANDA_JOINT_NAMES}
        if "secondary" in self.arms:
            transforms["secondary"] = self._primary_from_secondary()
            links["secondary"] = "panda_hand_2"
            joint_names["secondary"] = tuple(f"{name}_2" for name in PANDA_JOINT_NAMES)
        return RobotPlanningContext(
            embodiment=self.embodiment,
            model="panda" if len(self.arms) == 1 else "dual_panda",
            joint_names=joint_names,
            base_transforms=transforms,
            end_effector_links=links,
        )

    @property
    def native_env(self) -> Any:
        """Runtime-only native environment; never registered with generated programs."""
        return self._require_env()

    def bind_protocol_evaluator(self, evaluator: Any) -> None:
        """Attach one host-only evaluator after reset; never exposed to programs."""
        if self._env is None:
            raise RuntimeError("reset() must be called before binding an evaluator")
        if self._protocol_evaluator is not None:
            raise RuntimeError("a protocol evaluator is already bound")
        if not callable(getattr(evaluator, "after_step", None)):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("protocol evaluator must define after_step()")
        self._protocol_evaluator = evaluator

    @property
    def metadata(self) -> RobosuiteTaskMetadata:
        if self._metadata is None:
            raise RuntimeError("reset() must be called before task metadata is available")
        return self._metadata

    @property
    def arms(self) -> tuple[str, ...]:
        return self.metadata.arms

    @property
    def action_bounds(self) -> tuple[np.ndarray, np.ndarray]:
        if self._action_bounds is None:
            raise RuntimeError("reset() must be called before action bounds are available")
        return self._action_bounds[0].copy(), self._action_bounds[1].copy()

    def _require_env(self) -> Any:
        if self._env is None:
            raise RuntimeError("reset() must be called before using the Robosuite adapter")
        return self._env

    def _make_environment(self, metadata: RobosuiteTaskMetadata) -> Any:
        if self._env_factory is not None:
            return self._env_factory(metadata)
        suite = importlib.import_module("robosuite")
        controllers = importlib.import_module("robosuite.controllers")
        controller = controllers.load_controller_config(default_controller=self.controller)
        kwargs: dict[str, Any] = {
            "robots": list(metadata.robots),
            "controller_configs": controller,
            "initialization_noise": None,
            "has_renderer": False,
            "has_offscreen_renderer": True,
            "use_camera_obs": True,
            "use_object_obs": True,
            "camera_names": list(metadata.camera_names),
            "camera_heights": self.camera_height,
            "camera_widths": self.camera_width,
            "camera_depths": True,
            "control_freq": self.control_frequency,
            "horizon": self.horizon,
            "ignore_done": False,
            "reward_shaping": True,
        }
        if metadata.env_configuration is not None:
            kwargs["env_configuration"] = metadata.env_configuration
        if metadata.task_name == "cube_restack":
            from cap_harness.robosuite.environments import CubeRestack

            return CubeRestack(**kwargs)
        return suite.make(metadata.environment, **kwargs)

    def reset(
        self,
        task_ref: str | tuple[str, int] | RobosuiteTaskMetadata,
        seed: int,
    ) -> Observation:
        if isinstance(seed, bool) or not isinstance(seed, int) or seed < 0:
            raise ValueError("seed must be a non-negative integer")
        metadata = self.registry.resolve(task_ref)
        self._close_environment()
        # Seed the simulator's legacy global RNG, not a separate generator.
        np.random.seed(seed)
        self._seed = seed
        self._env = self._make_environment(metadata)
        self._closed = False
        self._metadata = metadata
        self._raw_observation = self._env.reset()
        self._after_native_reset(self._env)
        self._elapsed_steps = 0
        self._last_reward = None
        self._last_terminated = False
        self._last_truncated = False
        self._task_context = TaskContext(
            suite=metadata.suite_name,
            task_id=metadata.task_id,
            task_name=metadata.task_name,
            language=self._episode_language(metadata),
            family=metadata.family,
            metadata={"task_ref": metadata.task_ref},
        )
        self._action_bounds = tuple(
            np.asarray(value, dtype=np.float64).copy() for value in self._env.action_spec
        )
        self._codec = self._build_codec(metadata)
        self._gripper_targets = {
            arm: self._measured_gripper(index) for index, arm in enumerate(metadata.arms)
        }
        state = self.get_robot_state()
        self._joint_targets = {
            arm: np.array(joints, copy=True) for arm, joints in state.joint_positions.items()
        }
        observation = self.get_observation()
        if self._run_observer is not None:
            self._run_observer.on_reset(observation, metadata.to_manifest_record())
        return observation

    def _after_native_reset(self, env: Any) -> None:
        """Embodiment hook run right after the native reset, before codec setup."""
        del env  # The default hook is a no-op; subclasses use the environment.

    def _build_codec(self, metadata: RobosuiteTaskMetadata) -> Any:
        """Construct the native action codec once bounds and robots exist."""
        return RobosuiteActionCodec(
            metadata.arms,
            control_frequency=self.control_frequency,
            action_spec=self._action_bounds,
            arm_action_dimensions=tuple(robot.action_dim for robot in self._require_env().robots),
        )

    def _episode_language(self, metadata: RobosuiteTaskMetadata) -> str:
        """Return the task language for the freshly reset episode."""
        return metadata.language

    @staticmethod
    def _gripper_qpos_indexes(robot: Any) -> Any:
        """Return simulator qpos indexes for the primary gripper joints."""
        # Simulator bridge requires native state unavailable through its public API.
        return robot._ref_gripper_joint_pos_indexes

    @staticmethod
    def _grip_site(robot: Any) -> str:
        """Return the gripper grip-site name used as the public EEF frame."""
        return robot.gripper.important_sites["grip_site"]

    @staticmethod
    def _arm_has_gripper(robot: Any) -> bool:
        """Whether the robot exposes a controllable gripper actuator."""
        return robot.action_dim == 8

    @staticmethod
    def _body_transform(sim: Any, name: str) -> np.ndarray:
        return _transform(sim.data.get_body_xmat(name), sim.data.get_body_xpos(name))

    @staticmethod
    def _site_transform(sim: Any, name: str) -> np.ndarray:
        return _transform(sim.data.get_site_xmat(name), sim.data.get_site_xpos(name))

    @staticmethod
    def _camera_transform(sim: Any, name: str) -> np.ndarray:
        return _transform(sim.data.get_camera_xmat(name), sim.data.get_camera_xpos(name))

    def _primary_from_world(self) -> np.ndarray:
        return invert_transform(self._body_transform(self._require_env().sim, self.BASE_FRAME))

    def _primary_from_secondary(self) -> np.ndarray:
        env = self._require_env()
        return self._primary_from_world() @ self._body_transform(env.sim, self.SECONDARY_BASE_FRAME)

    def _camera_observation(self, name: str) -> CameraObservation:
        raw = self._raw_observation
        if raw is None:
            raise RuntimeError("reset() must be called before reading cameras")
        rgb = np.ascontiguousarray(np.asarray(raw[f"{name}_image"])[::-1])
        depth = np.asarray(raw[f"{name}_depth"], dtype=np.float64)
        if depth.ndim == 3:
            depth = depth[..., 0]
        depth = np.ascontiguousarray(depth[::-1])
        env = self._require_env()
        depth_m = _metric_depth(env.sim, depth)
        camera_id = env.sim.model.camera_name2id(name)
        fovy = float(env.sim.model.cam_fovy[camera_id])
        focal = 0.5 * rgb.shape[0] / np.tan(np.deg2rad(fovy) / 2.0)
        intrinsics = np.array(
            [
                [focal, 0.0, 0.5 * rgb.shape[1]],
                [0.0, focal, 0.5 * rgb.shape[0]],
                [0.0, 0.0, 1.0],
            ]
        )
        image_from_opengl = np.diag((1.0, -1.0, -1.0, 1.0))
        primary_from_camera = (
            self._primary_from_world() @ self._camera_transform(env.sim, name) @ image_from_opengl
        )
        return CameraObservation(
            rgb=rgb,
            depth_m=depth_m,
            intrinsics=intrinsics,
            frame=f"camera/{name}",
            camera_pose=matrix_to_pose(primary_from_camera, frame=self.BASE_FRAME),
            timestamp_s=self.current_time_s,
        )

    def _measured_gripper(self, index: int) -> float:
        env = self._require_env()
        robot = env.robots[index]
        qpos = np.asarray(env.sim.data.qpos[self._gripper_qpos_indexes(robot)])
        if qpos.size == 0:
            return 1.0
        return float(np.clip(qpos[0] / 0.04, 0.0, 1.0))

    def get_robot_state(self) -> RobotState:
        env = self._require_env()
        joints: dict[str, np.ndarray] = {}
        velocities: dict[str, np.ndarray] = {}
        poses: dict[str, Pose] = {}
        grippers: dict[str, float] = {}
        for index, arm in enumerate(self.arms):
            robot = env.robots[index]
            # Simulator bridge requires native state unavailable through its public API.
            joints[arm] = np.asarray(robot._joint_positions, dtype=np.float64)
            # Simulator bridge requires native state unavailable through its public API.
            velocities[arm] = np.asarray(robot._joint_velocities, dtype=np.float64)
            world_from_eef = self._site_transform(env.sim, self._grip_site(robot))
            poses[arm] = matrix_to_pose(
                self._primary_from_world() @ world_from_eef,
                frame=self.BASE_FRAME,
            )
            grippers[arm] = self._measured_gripper(index)
        return RobotState(
            joint_positions=joints,
            joint_velocities=velocities,
            end_effector_poses=poses,
            gripper_positions=grippers,
            base_frame=self.BASE_FRAME,
            joint_names=dict.fromkeys(self.arms, PANDA_JOINT_NAMES),
            timestamp_s=self.current_time_s,
            embodiment=self.embodiment,
        )

    def get_task_context(self) -> TaskContext:
        if self._task_context is None:
            raise RuntimeError("reset() must be called before reading task context")
        return self._task_context

    def get_observation(self) -> Observation:
        return Observation(
            cameras={name: self._camera_observation(name) for name in self.metadata.camera_names},
            robot_state=self.get_robot_state(),
            task_context=self.get_task_context(),
            timestamp_s=self.current_time_s,
        )

    def native_step(self, action: RobotAction) -> StepResult:
        env = self._require_env()
        if action.embodiment != self.embodiment:
            raise ValueError(
                f"action embodiment {action.embodiment!r} does not match {self.embodiment!r}"
            )
        if self._codec is None:
            raise RuntimeError("Robosuite codec is unavailable before reset")
        unknown_arms = set(action.arms) - set(self.arms)
        if unknown_arms:
            return StepResult(
                ok=False,
                error=ApiError(
                    ErrorCode.NOT_FOUND,
                    f"unknown Robosuite arms: {sorted(unknown_arms)}",
                ),
            )
        for arm, command in action.arms.items():
            arm_index = self.arms.index(arm)
            expected_dimension = self.get_robot_state().joint_positions[arm].shape
            if command.target.shape != expected_dimension:
                return StepResult(
                    ok=False,
                    error=ApiError(
                        ErrorCode.INVALID_REQUEST,
                        f"command dimension does not match arm {arm!r}",
                    ),
                )
            if command.gripper_position is not None and not self._arm_has_gripper(
                env.robots[arm_index]
            ):
                return StepResult(
                    ok=False,
                    error=ApiError(
                        ErrorCode.UNSUPPORTED,
                        f"arm {arm!r} has no controllable gripper",
                    ),
                )
        if self._run_observer is not None:
            self._run_observer.before_step(action)
        for arm, command in action.arms.items():
            self._joint_targets[arm] = np.array(command.target, copy=True)
            if command.gripper_position is not None:
                self._gripper_targets[arm] = command.gripper_position
        try:
            native = self._codec.encode(
                action,
                self.get_robot_state(),
                joint_targets=self._joint_targets,
                gripper_targets=self._gripper_targets,
            )
            raw, reward, done, info = env.step(native)
            self._elapsed_steps += 1
            self._raw_observation = raw
            self._last_reward = float(reward)
            self._last_terminated = bool(done and self.check_success())
            self._last_truncated = bool(done and not self._last_terminated)
            result = StepResult(
                ok=True,
                observation=self.get_observation(),
                terminated=self._last_terminated,
                truncated=self._last_truncated,
                reward=self._last_reward,
                diagnostics={"native_info": info},
            )
        # Convert native/provider failures into the public typed error result.
        except Exception as exc:
            result = StepResult(
                ok=False,
                error=ApiError(
                    ErrorCode.ADAPTER_FAILED,
                    f"Robosuite native step failed: {exc}",
                    details={"exception_type": type(exc).__name__},
                ),
            )
        if self._protocol_evaluator is not None:
            self._protocol_evaluator.after_step(action, result)
        if self._run_observer is not None:
            self._run_observer.after_step(action, result)
        return result

    def step(self, action: RobotAction) -> StepResult:
        runtime = self.native_step(action)
        return StepResult(
            ok=runtime.ok,
            observation=runtime.observation,
            terminated=runtime.terminated,
            truncated=runtime.truncated,
            error=runtime.public_view().error,
            diagnostics={
                "control_period_s": self.control_period_s,
                "step_index": self._elapsed_steps,
            },
        )

    def execute_trajectory(
        self, trajectory: Trajectory | SynchronizedTrajectory
    ) -> ExecutionResult:
        if not isinstance(trajectory, Trajectory | SynchronizedTrajectory):
            # Preserve the invalid-data ValueError contract.
            raise ValueError("trajectory must be a Trajectory or SynchronizedTrajectory")
        if trajectory.embodiment != self.embodiment:
            raise ValueError(
                f"trajectory embodiment {trajectory.embodiment!r} "
                f"does not match {self.embodiment!r}"
            )
        if not np.isclose(trajectory.dt_s, self.control_period_s, atol=1e-9, rtol=0.0):
            raise ValueError("trajectory dt_s must equal the Robosuite control period")
        state = self.get_robot_state()
        if isinstance(trajectory, Trajectory):
            positions = {trajectory.arm: trajectory.joint_positions}
            names = {trajectory.arm: trajectory.joint_names}
            grippers = (
                None
                if trajectory.gripper_positions is None
                else {trajectory.arm: trajectory.gripper_positions}
            )
            count = len(trajectory.joint_positions)
        elif isinstance(trajectory, SynchronizedTrajectory):
            positions = trajectory.joint_positions
            names = trajectory.joint_names
            grippers = trajectory.gripper_positions
            count = trajectory.waypoint_count
        if not set(positions).issubset(self.arms):
            raise ValueError("trajectory contains an unavailable arm")
        if isinstance(trajectory, SynchronizedTrajectory) and set(positions) != set(self.arms):
            raise ValueError("synchronized trajectory must name every Robosuite arm")
        stale = self._stale_trajectory_result(trajectory, state)
        if stale is not None:
            return stale
        for arm, trajectory_names in names.items():
            if tuple(trajectory_names) != tuple(state.joint_names[arm]):
                raise ValueError(f"trajectory joint_names do not match arm {arm!r}")
        final: Observation | None = None
        steps = 0

        def commands(waypoint: int) -> dict[str, ArmCommand]:
            return {
                arm: ArmCommand(
                    mode="joint_position",
                    target=values[waypoint],
                    gripper_position=(None if grippers is None else float(grippers[arm][waypoint])),
                    embodiment=self.embodiment,
                )
                for arm, values in positions.items()
            }

        for waypoint in range(count):
            result = self.step(RobotAction(commands(waypoint)))
            if not result.ok or result.observation is None:
                return ExecutionResult(
                    ok=False,
                    steps_executed=steps,
                    final_observation=final,
                    error=result.error,
                )
            steps += 1
            final = result.observation
            if result.terminated or result.truncated:
                errors = {
                    arm: float(np.max(np.abs(final.robot_state.joint_positions[arm] - values[-1])))
                    for arm, values in positions.items()
                }
                return ExecutionResult(
                    ok=False,
                    steps_executed=steps,
                    final_observation=final,
                    terminated=result.terminated,
                    truncated=result.truncated,
                    error=self._terminal_error(result.terminated, result.truncated),
                    final_errors=errors,
                    diagnostics={"joint_error_rad": errors},
                )

        errors = {
            arm: float(np.max(np.abs(final.robot_state.joint_positions[arm] - values[-1])))
            for arm, values in positions.items()
        }
        for _ in range(TRAJECTORY_MAX_STEPS_PER_WAYPOINT - 1):
            if max(errors.values()) <= TRAJECTORY_TOLERANCE_RAD:
                break
            result = self.step(RobotAction(commands(count - 1)))
            if not result.ok or result.observation is None:
                return ExecutionResult(
                    ok=False,
                    steps_executed=steps,
                    final_observation=final,
                    error=result.error,
                )
            steps += 1
            final = result.observation
            errors = {
                arm: float(np.max(np.abs(final.robot_state.joint_positions[arm] - values[-1])))
                for arm, values in positions.items()
            }
            if result.terminated or result.truncated:
                return ExecutionResult(
                    ok=False,
                    steps_executed=steps,
                    final_observation=final,
                    terminated=result.terminated,
                    truncated=result.truncated,
                    error=self._terminal_error(result.terminated, result.truncated),
                    final_errors=errors,
                    diagnostics={"joint_error_rad": errors},
                )
        if max(errors.values()) > TRAJECTORY_TOLERANCE_RAD:
            return ExecutionResult(
                ok=False,
                steps_executed=steps,
                final_observation=final,
                error=ApiError(
                    ErrorCode.TIMEOUT,
                    "final trajectory waypoint did not converge",
                    details={"joint_error_rad": errors},
                ),
                final_errors=errors,
            )
        return ExecutionResult(
            ok=True,
            steps_executed=steps,
            final_observation=final,
            final_errors=errors if final is not None else {},
            diagnostics={"joint_error_rad": errors if final is not None else {}},
        )

    def set_grippers(self, positions: Mapping[str, float]) -> ExecutionResult:
        """Issue validated gripper targets for every arm in one simulator tick."""
        if not isinstance(positions, Mapping) or set(positions) != set(self.arms):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    ErrorCode.INVALID_REQUEST,
                    "positions must name every Robosuite arm",
                ),
            )
        env = self._require_env()
        normalized: dict[str, float] = {}
        for arm in self.arms:
            if not self._arm_has_gripper(env.robots[self.arms.index(arm)]):
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        ErrorCode.UNSUPPORTED,
                        f"arm {arm!r} has no controllable gripper",
                    ),
                )
            try:
                numeric = float(positions[arm])
            except (TypeError, ValueError):
                numeric = float("nan")
            if not np.isfinite(numeric) or not 0.0 <= numeric <= 1.0:
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        ErrorCode.INVALID_REQUEST,
                        f"gripper position for {arm!r} must be finite and in [0, 1]",
                    ),
                )
            normalized[arm] = numeric
        state = self.get_robot_state()
        result = self.step(
            RobotAction(
                arms={
                    arm: ArmCommand(
                        "joint_position",
                        self._joint_targets.get(arm, state.joint_positions[arm]),
                        normalized[arm],
                    )
                    for arm in self.arms
                }
            )
        )
        terminal = result.terminated or result.truncated
        return ExecutionResult(
            ok=result.ok and not terminal,
            steps_executed=1 if result.ok else 0,
            final_observation=result.observation,
            terminated=result.terminated,
            truncated=result.truncated,
            error=result.error
            or (self._terminal_error(result.terminated, result.truncated) if terminal else None),
        )

    def set_gripper(self, position: float, *, arm: str = "primary") -> ExecutionResult:
        if arm not in self.arms:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(ErrorCode.NOT_FOUND, f"unknown arm {arm!r}"),
            )
        arm_index = self.arms.index(arm)
        if not self._arm_has_gripper(self._require_env().robots[arm_index]):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    ErrorCode.UNSUPPORTED,
                    f"arm {arm!r} has a fixed task tool without a controllable gripper",
                ),
            )
        numeric = float(position)
        if not np.isfinite(numeric) or not 0.0 <= numeric <= 1.0:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(ErrorCode.INVALID_REQUEST, "gripper position must be in [0, 1]"),
            )
        self._gripper_targets[arm] = numeric
        result: StepResult | None = None
        final: Observation | None = None
        for _step_index in range(30):
            result = self.step(
                RobotAction(
                    {
                        arm: ArmCommand(
                            "joint_position",
                            self._joint_targets.get(
                                arm, self.get_robot_state().joint_positions[arm]
                            ),
                            numeric,
                            embodiment=self.embodiment,
                        )
                    }
                )
            )
            if not result.ok or result.observation is None:
                break
            final = result.observation
            if result.terminated or result.truncated:
                break
        assert result is not None
        terminal = result.terminated or result.truncated
        return ExecutionResult(
            ok=result.ok and not terminal,
            steps_executed=_step_index + 1 if result.ok else _step_index,
            final_observation=final,
            terminated=result.terminated,
            truncated=result.truncated,
            error=result.error
            or (self._terminal_error(result.terminated, result.truncated) if terminal else None),
        )

    @staticmethod
    def _terminal_error(terminated: bool, truncated: bool) -> ApiError:
        del terminated  # Callers establish terminal state; truncation takes precedence.
        if truncated:
            return ApiError(
                ErrorCode.TRUNCATED,
                "episode was truncated before trajectory execution completed",
            )
        return ApiError(
            ErrorCode.TERMINATED,
            "episode terminated before trajectory execution completed",
        )

    @staticmethod
    def _stale_trajectory_result(
        trajectory: Trajectory | SynchronizedTrajectory,
        state: RobotState,
    ) -> ExecutionResult | None:
        expected = trajectory.expected_start
        if set(expected.arms) != set(state.arms):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(ErrorCode.STALE_PLAN, "trajectory arm set is stale"),
            )
        joint_errors: dict[str, float] = {}
        gripper_errors: dict[str, float] = {}
        for arm in state.arms:
            if tuple(expected.joint_names[arm]) != tuple(state.joint_names[arm]):
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        ErrorCode.STALE_PLAN,
                        f"trajectory joint names are stale for arm {arm!r}",
                    ),
                )
            joint_errors[arm] = float(
                np.max(np.abs(expected.joint_positions[arm] - state.joint_positions[arm]))
            )
            gripper_errors[arm] = abs(
                expected.gripper_positions[arm] - state.gripper_positions[arm]
            )
        if (
            max(joint_errors.values()) <= TRAJECTORY_START_TOLERANCE_RAD
            and max(gripper_errors.values()) <= TRAJECTORY_START_TOLERANCE_RAD
        ):
            return None
        return ExecutionResult(
            ok=False,
            steps_executed=0,
            error=ApiError(
                ErrorCode.STALE_PLAN,
                "trajectory start no longer matches measured robot state",
                details={
                    "joint_error_rad": joint_errors,
                    "gripper_error": gripper_errors,
                    "tolerance": TRAJECTORY_START_TOLERANCE_RAD,
                },
            ),
            final_errors=joint_errors,
        )

    def ik_request(self, target_pose: Pose, state: RobotState, arm: str) -> tuple[Pose, RobotState]:
        """Express secondary IK explicitly in robot1 base; primary is already robot0-based."""
        if arm == "primary":
            hand_target = target_pose.as_matrix().copy()
            hand_target[:3, :3] = hand_target[:3, :3] @ _EEF_TO_HAND_ROTATION
            return matrix_to_pose(hand_target, frame=self.BASE_FRAME), state
        if arm != "secondary" or arm not in state.joint_positions:
            raise ValueError(f"unknown arm {arm!r}")
        secondary_from_primary = invert_transform(self._primary_from_secondary())
        secondary_pose = transform_pose(
            target_pose,
            secondary_from_primary,
            source_frame=self.BASE_FRAME,
            target_frame=self.SECONDARY_BASE_FRAME,
        )
        hand_target = secondary_pose.as_matrix().copy()
        hand_target[:3, :3] = hand_target[:3, :3] @ _EEF_TO_HAND_ROTATION
        secondary_pose = matrix_to_pose(hand_target, frame=self.SECONDARY_BASE_FRAME)
        secondary_state = RobotState(
            joint_positions={arm: state.joint_positions[arm]},
            joint_velocities={arm: state.joint_velocities[arm]},
            end_effector_poses={
                arm: transform_pose(
                    state.end_effector_poses[arm],
                    secondary_from_primary,
                    source_frame=self.BASE_FRAME,
                    target_frame=self.SECONDARY_BASE_FRAME,
                )
            },
            gripper_positions={arm: state.gripper_positions[arm]},
            base_frame=self.SECONDARY_BASE_FRAME,
            joint_names={arm: state.joint_names[arm]},
            timestamp_s=state.timestamp_s,
            embodiment=self.embodiment,
        )
        return secondary_pose, secondary_state

    def check_success(self) -> bool:
        checker = getattr(self._require_env(), "_check_success", None)
        if not callable(checker):
            # Unavailable simulator state, not an argument type error.
            raise RuntimeError("Robosuite environment has no success predicate")
        return bool(checker())

    def compute_reward(self) -> float | None:
        return self._last_reward

    def get_task_metadata(self) -> Mapping[str, object]:
        return MappingProxyType(self.metadata.to_manifest_record())

    def get_controller_metadata(self) -> Mapping[str, object]:
        low, high = self.action_bounds
        return MappingProxyType(
            {
                "action_dimension": int(low.size),
                "action_lower_bounds": tuple(float(value) for value in low),
                "action_upper_bounds": tuple(float(value) for value in high),
                "arm_names": self.arms,
                "base_frame": self.BASE_FRAME,
                "camera_names": self.metadata.camera_names,
                "control_frequency_hz": self.control_frequency,
                "control_period_s": self.control_period_s,
                "controller": self.controller,
                "gripper_semantics": {
                    "normalized": "0=closed, 1=open",
                    "native": "1=closed, -1=open",
                },
                "controllable_gripper_arms": tuple(
                    arm
                    for arm, robot in zip(self.arms, self._require_env().robots, strict=False)
                    if self._arm_has_gripper(robot)
                ),
                "supported_action_modes": ("joint_position",),
            }
        )

    def _close_environment(self) -> None:
        if self._env is not None:
            close = getattr(self._env, "close", None)
            if callable(close):
                close()
        self._env = None

    def close(self) -> None:
        if self._closed:
            return
        self._close_environment()
        self._closed = True


BASE_FRAME = RobosuiteAdapter.BASE_FRAME
"""Compatibility alias; adapter implementations use the class variable."""

__all__ = ["BASE_FRAME", "RobosuiteAdapter"]
````

## src/cap_harness/behavior/adapter.py

````text
"""Typed, frame-explicit adapter for the BEHAVIOR-1K R1 Pro pickup tasks (OmniGibson on Isaac Sim).

Frame model: everything public is expressed in ``odom``, the base-footprint pose captured when the
task instance was loaded (z on the floor, yaw only). Cameras, end effectors, point clouds and
navigation goals therefore stay valid after the base drives. Internally the simulator works in the
world frame and the planner in the robot root frame; the adapter owns both conversions.

Actuation model: one full joint-position target (28 values on R1 Pro) is rewritten slice by slice
(arms from ``RobotAction``, fingers from normalized gripper positions, base and torso from the
``behavior.*`` extensions) and sent every tick through ``robot.q_to_action``.
"""

from __future__ import annotations

from collections.abc import Callable, Mapping, Sequence
from dataclasses import dataclass, field
import math
import os
import sys
from types import MappingProxyType
from typing import Any

import numpy as np

from cap_harness.behavior.codec import BehaviorActionCodec, R1ProJointLayout
from cap_harness.behavior.config import HEAD_HORIZONTAL_APERTURE, build_environment_config
from cap_harness.behavior.registry import (
    BEHAVIOR_ARMS,
    BehaviorTaskMetadata,
    BehaviorTaskRegistry,
)
from cap_harness.contracts import (
    ArmCommand,
    CameraObservation,
    ExecutionResult,
    Observation,
    PlanningScene,
    Pose,
    RobotAction,
    RobotPlanningContext,
    RobotState,
    StepResult,
    SynchronizedTrajectory,
    TaskContext,
    Trajectory,
)
from cap_harness.errors import ApiError, ErrorCode
from cap_harness.geometry import invert_transform, matrix_to_pose

BASE_FRAME = "odom"
CONTROL_FREQUENCY_HZ = 30.0
CAMERA_LINKS: Mapping[str, str] = MappingProxyType(
    {"head": "zed_link", "left_wrist": "left_realsense_link", "right_wrist": "right_realsense_link"}
)
TRAJECTORY_TOLERANCE_RAD = 0.01
TRUNK_TOLERANCE_RAD = 0.05
"""The torso settles more slowly than the arm and carries more of the robot's mass, so holding it
to the arm's tolerance failed motions whose arm was already on target. Two evaluation seeds recorded
stalls with the arm inside tolerance and the torso 0.021 to 0.085 rad outside it.
"""
TRAJECTORY_START_TOLERANCE_RAD = 0.02
TRAJECTORY_MAX_STEPS_PER_WAYPOINT = 120
GRIPPER_STEPS = 40
SETTLE_MIN_STEPS = 50
SETTLE_MAX_STEPS = 500
SETTLE_VELOCITY_M_S = 0.01
INSTANCE_SETTLE_PHYSICS_STEPS = 25
BASE_STEPS_PER_WAYPOINT = 10
FOOTPRINT_MARGIN_M = 0.2
"""Added to half the base footprint's diagonal when testing a base goal against the scene's
traversability map (OmniGibson erodes its map by the same radius for path planning)."""
BASE_HOP_M = 1.0
"""Spacing of the intermediate base goals taken from the scene's traversability map when cuRobo's
direct base plan fails. OmniGibson's cuRobo wrapper plans the base with trajectory optimisation
only (no graph search), so a goal across the room behind furniture is unreachable in one plan
while a chain of short hops along the map's shortest path is not.
"""
BASE_SERVO_STEP_M = 0.02
BASE_SERVO_STEP_RAD = 0.05
"""Per-tick cap on how far the servo path may move its base target. The base virtual joints are
position controlled, so commanding a goal a metre away drives them at roughly a metre in twenty
ticks, which sweeps furniture aside: measured across five evaluation seeds, a leg at that rate
displaced the target object by 16 to 51 mm before the arm moved. Stepping the target keeps the
commanded motion near the planner's own 0.005 to 0.010 m per tick.
"""
BASE_FALL_LIMIT_M = 0.5
"""A base whose height drops this far below its reset height has left the floor. The scene's
traversability map is a square raster and its margin cells need not have floor geometry beneath
them, so a route can send the base somewhere it falls: measured on one evaluation seed at -34, -45
and -158 m while the planar pose kept reporting sane x and y.
"""
HOP_TOLERANCE_M = 0.10
HOP_TOLERANCE_RAD = 0.25
SERVO_HOP_MAX_STEPS = 400
BASE_WAYPOINT_TOLERANCE_M = 0.005
BASE_WAYPOINT_TOLERANCE_RAD = 0.03
ARTICULATION_WAYPOINT_TOLERANCE_RAD = 0.005
INTRINSICS_RENDER_RETRIES = 40
GL_TO_CV = np.diag((1.0, -1.0, -1.0, 1.0))
"""OmniGibson cameras look down -Z with +Y up (OpenGL); our contracts use +Z forward, +Y down."""


def _to_numpy(value: Any) -> np.ndarray:
    if hasattr(value, "detach"):
        value = value.detach().cpu()
    return np.asarray(value)


def _as_tensor(value: np.ndarray) -> Any:
    """A float32 torch tensor when torch is importable (OmniGibson's maps expect one)."""
    try:
        import torch
    except ImportError:
        return np.asarray(value, dtype=np.float32)
    return torch.as_tensor(np.asarray(value, dtype=np.float32))


def _pose_matrix(position: Any, quaternion_xyzw: Any) -> np.ndarray:
    from cap_harness.geometry import quaternion_wxyz_to_matrix

    xyzw = _to_numpy(quaternion_xyzw).astype(np.float64).reshape(4)
    wxyz = np.array([xyzw[3], xyzw[0], xyzw[1], xyzw[2]])
    transform = np.eye(4, dtype=np.float64)
    transform[:3, :3] = quaternion_wxyz_to_matrix(wxyz)
    transform[:3, 3] = _to_numpy(position).astype(np.float64).reshape(3)
    return transform


def _planar_transform(x: float, y: float, yaw: float, z: float = 0.0) -> np.ndarray:
    cos, sin = math.cos(yaw), math.sin(yaw)
    transform = np.eye(4, dtype=np.float64)
    transform[:2, :2] = np.array([[cos, -sin], [sin, cos]])
    transform[:3, 3] = (x, y, z)
    return transform


def _yaw_of(transform: np.ndarray) -> float:
    return float(math.atan2(transform[1, 0], transform[0, 0]))


def _wrap_angle(value: float) -> float:
    return float((value + math.pi) % (2.0 * math.pi) - math.pi)


def _planar_pose_of(transform: np.ndarray) -> tuple[float, float, float]:
    return float(transform[0, 3]), float(transform[1, 3]), _yaw_of(transform)


@dataclass
class _BaseDrive:
    """Outcome of one base motion (a planned path or a servo) inside ``navigate_to_pose``."""

    ok: bool
    steps: int = 0
    final: Observation | None = None
    error: ApiError | None = None
    terminated: bool = False
    truncated: bool = False
    diagnostics: dict[str, Any] = field(default_factory=dict)


def erode_free_cells(free: np.ndarray, half_window: int) -> np.ndarray:
    """Cells whose square neighbourhood (``half_window`` cells each way) is entirely free."""
    free = np.asarray(free, dtype=bool)
    if half_window <= 0:
        return free.copy()
    padded = np.pad(~free, half_window, mode="constant", constant_values=True).astype(np.int64)
    integral = np.zeros((padded.shape[0] + 1, padded.shape[1] + 1), dtype=np.int64)
    integral[1:, 1:] = padded.cumsum(axis=0).cumsum(axis=1)
    size = 2 * half_window + 1
    rows, columns = free.shape
    window = (
        integral[size : size + rows, size : size + columns]
        - integral[:rows, size : size + columns]
        - integral[size : size + rows, :columns]
        + integral[:rows, :columns]
    )
    return window == 0


def resample_route(
    points: Sequence[Sequence[float]], goal: Sequence[float], hop_m: float = BASE_HOP_M
) -> list[tuple[float, float, float]]:
    """Intermediate ``(x, y, yaw)`` goals every ``hop_m`` along a polyline that ends at ``goal``.

    Intermediate hops face the next hop so the head camera looks along the route; the last hop
    is the goal itself with the goal's yaw.
    """
    polyline = [np.asarray(point, dtype=np.float64)[:2] for point in points]
    polyline.append(np.asarray(goal, dtype=np.float64)[:2])
    deduped = [polyline[0]]
    for point in polyline[1:]:
        if np.linalg.norm(point - deduped[-1]) > 1e-6:
            deduped.append(point)
    hops: list[np.ndarray] = []
    if len(deduped) > 1:
        array = np.stack(deduped)
        cumulative = np.concatenate(
            [[0.0], np.cumsum(np.linalg.norm(np.diff(array, axis=0), axis=1))]
        )
        for distance in np.arange(hop_m, cumulative[-1] - hop_m / 2.0 + 1e-9, hop_m):
            hops.append(
                np.array(
                    [
                        np.interp(distance, cumulative, array[:, 0]),
                        np.interp(distance, cumulative, array[:, 1]),
                    ]
                )
            )
    hops.append(deduped[-1])
    route: list[tuple[float, float, float]] = []
    for index, point in enumerate(hops):
        if index == len(hops) - 1:
            yaw = float(goal[2])
        else:
            ahead = hops[index + 1]
            yaw = math.atan2(ahead[1] - point[1], ahead[0] - point[0])
        route.append((float(point[0]), float(point[1]), float(yaw)))
    return route


def _closest_point_on_segment(point: np.ndarray, a: np.ndarray, b: np.ndarray) -> np.ndarray:
    segment = b - a
    length = float(np.dot(segment, segment))
    if length <= 1e-12:
        return a.copy()
    t = float(np.clip(np.dot(point - a, segment) / length, 0.0, 1.0))
    return a + t * segment


def _hull_vertices(points_xy: np.ndarray) -> np.ndarray:
    """Convex hull vertices in order; falls back to the axis-aligned box for degenerate input."""
    unique = np.unique(points_xy, axis=0)
    if len(unique) >= 3:
        try:
            from scipy.spatial import ConvexHull

            hull = ConvexHull(unique)
            return unique[hull.vertices]
        except Exception:  # pragma: no cover - collinear or numerically degenerate clouds
            pass
    lower, upper = unique.min(axis=0), unique.max(axis=0)
    return np.array(
        [[lower[0], lower[1]], [upper[0], lower[1]], [upper[0], upper[1]], [lower[0], upper[1]]]
    )


def plan_standoff_pose(
    support_cloud: Any, object_cloud: Any, standoff_m: float = 0.3
) -> tuple[float, float, float]:
    """Pure geometry: a base pose ``standoff_m`` outside the support surface's nearest edge.

    The support cloud's convex hull in XY gives the edges; the edge closest to the object's
    median XY is chosen; the outward normal is the one pointing away from the hull centroid;
    yaw faces the object. Both clouds must share one frame, which is the frame of the answer.
    """
    standoff = float(standoff_m)
    if not np.isfinite(standoff) or standoff <= 0.0:
        raise ValueError("standoff_m must be positive")
    support = np.asarray(getattr(support_cloud, "points", support_cloud), dtype=np.float64)
    target = np.asarray(getattr(object_cloud, "points", object_cloud), dtype=np.float64)
    if support.ndim != 2 or support.shape[1] != 3 or len(support) == 0:
        raise ValueError("support_cloud must contain (N, 3) points")
    if target.ndim != 2 or target.shape[1] != 3 or len(target) == 0:
        raise ValueError("object_cloud must contain (N, 3) points")
    support_frame = getattr(support_cloud, "frame", None)
    object_frame = getattr(object_cloud, "frame", None)
    if support_frame is not None and object_frame is not None and support_frame != object_frame:
        raise ValueError("support and object clouds must share a frame")
    object_xy = np.median(target[:, :2], axis=0)
    vertices = _hull_vertices(support[:, :2])
    centroid = vertices.mean(axis=0)
    best: tuple[float, np.ndarray, np.ndarray] | None = None
    for index in range(len(vertices)):
        a, b = vertices[index], vertices[(index + 1) % len(vertices)]
        closest = _closest_point_on_segment(object_xy, a, b)
        distance = float(np.linalg.norm(object_xy - closest))
        if best is None or distance < best[0]:
            edge = b - a
            normal = np.array([edge[1], -edge[0]])
            norm = float(np.linalg.norm(normal))
            normal = normal / norm if norm > 1e-9 else np.array([1.0, 0.0])
            if np.dot(normal, closest - centroid) < 0.0:
                normal = -normal
            best = (distance, closest, normal)
    assert best is not None
    _, closest, normal = best
    standoff_xy = closest + normal * standoff
    yaw = math.atan2(object_xy[1] - standoff_xy[1], object_xy[0] - standoff_xy[0])
    return float(standoff_xy[0]), float(standoff_xy[1]), float(yaw)


def plan_approach_pose(
    object_cloud: Any,
    base_pose: tuple[float, float, float],
    distance_m: float = 0.7,
) -> tuple[float, float, float]:
    """Pure geometry: a base pose ``distance_m`` short of the object along the line from the base.

    Useful for free-standing objects (a can on the floor) where there is no support surface to
    stand off from. Yaw faces the object. The answer is in the cloud's frame.
    """
    distance = float(distance_m)
    if not np.isfinite(distance) or distance < 0.0:
        raise ValueError("distance_m must be non-negative")
    points = np.asarray(getattr(object_cloud, "points", object_cloud), dtype=np.float64)
    if points.ndim != 2 or points.shape[1] != 3 or len(points) == 0:
        raise ValueError("object_cloud must contain (N, 3) points")
    object_xy = np.median(points[:, :2], axis=0)
    base_xy = np.asarray(base_pose[:2], dtype=np.float64)
    direction = object_xy - base_xy
    span = float(np.linalg.norm(direction))
    if span <= 1e-9:
        return float(base_xy[0]), float(base_xy[1]), float(base_pose[2])
    unit = direction / span
    goal = object_xy - unit * min(distance, span)
    yaw = math.atan2(unit[1], unit[0])
    return float(goal[0]), float(goal[1]), float(yaw)


class BehaviorAdapter:
    """Normalize OmniGibson's R1 Pro without exposing native state to generated code."""

    BASE_FRAME = BASE_FRAME
    ARMS = BEHAVIOR_ARMS

    def __init__(
        self,
        *,
        registry: BehaviorTaskRegistry | None = None,
        run_observer: Any | None = None,
        camera_width: int = 512,
        camera_height: int = 512,
        horizon: int = 6000,
        gpu_id: int | None = None,
        data_root: str | os.PathLike[str] | None = None,
        env_factory: Callable[[dict[str, object]], Any] | None = None,
        head_horizontal_aperture: float = HEAD_HORIZONTAL_APERTURE,
    ) -> None:
        if camera_height <= 0 or camera_width <= 0 or horizon <= 0:
            raise ValueError("camera dimensions and horizon must be positive")
        self.registry = registry or BehaviorTaskRegistry()
        self.camera_height = int(camera_height)
        self.camera_width = int(camera_width)
        self.horizon = int(horizon)
        self.control_frequency = CONTROL_FREQUENCY_HZ
        self.control_period_s = 1.0 / self.control_frequency
        self.controller = "JOINT_POSITION"
        self.head_horizontal_aperture = float(head_horizontal_aperture)
        self._gpu_id = gpu_id
        self._data_root = os.fspath(data_root) if data_root is not None else None
        self._env_factory = env_factory
        self._run_observer = run_observer
        self._protocol_evaluator: Any | None = None
        self._og: Any | None = None
        self._env: Any | None = None
        self._env_metadata: BehaviorTaskMetadata | None = None
        self._layout: R1ProJointLayout | None = None
        self._codec: BehaviorActionCodec | None = None
        self._metadata: BehaviorTaskMetadata | None = None
        self._task_context: TaskContext | None = None
        self._raw_observation: Mapping[str, Any] | None = None
        self._intrinsics: dict[str, np.ndarray] = {}
        self._sensor_names: dict[str, str] = {}
        self._q_target: np.ndarray | None = None
        self._reset_trunk: np.ndarray | None = None
        self._world_from_odom = np.eye(4)
        self._odom_from_world = np.eye(4)
        self._free_cells: tuple[Any, np.ndarray] | None = None
        self._world_from_root = np.eye(4)
        self._root_from_world = np.eye(4)
        self._elapsed_steps = 0
        self._seed: int | None = None
        self._last_reward: float | None = None
        self._last_terminated = False
        self._last_truncated = False
        self._success_latched = False
        self._success_observed_step: int | None = None
        self._closed = False
        self._planner: Any | None = None

    # ------------------------------------------------------------------ identity and hooks
    @property
    def embodiment(self) -> str:
        return "behavior"

    @property
    def arms(self) -> tuple[str, ...]:
        return self.ARMS

    @property
    def current_time_s(self) -> float:
        return self._elapsed_steps * self.control_period_s

    @property
    def metadata(self) -> BehaviorTaskMetadata:
        if self._metadata is None:
            raise RuntimeError("reset() must be called before task metadata is available")
        return self._metadata

    @property
    def native_env(self) -> Any:
        """Runtime-only native environment; never registered with generated programs."""
        return self._require_env()

    @property
    def success_observed_step(self) -> int | None:
        return self._success_observed_step

    @property
    def episode_seed(self) -> int | None:
        return self._seed

    def resolve_arm(self, arm: str) -> str:
        if arm in self.ARMS:
            return arm
        if arm == "left":
            return "primary"
        if arm == "right":
            return "secondary"
        return arm

    def bind_protocol_evaluator(self, evaluator: Any) -> None:
        """Attach one host-only evaluator after reset; never exposed to programs."""
        if self._env is None:
            raise RuntimeError("reset() must be called before binding an evaluator")
        if self._protocol_evaluator is not None:
            raise RuntimeError("a protocol evaluator is already bound")
        if not callable(getattr(evaluator, "after_step", None)):
            raise ValueError("protocol evaluator must define after_step()")
        self._protocol_evaluator = evaluator

    def planner(self) -> Any:
        """The in-process cuRobo planner bound to this adapter's live robot."""
        if self._planner is None:
            from cap_harness.behavior.planning import OmniGibsonCuroboPlanner

            self._planner = OmniGibsonCuroboPlanner(self)
        return self._planner

    def _require_env(self) -> Any:
        if self._env is None:
            raise RuntimeError("reset() must be called before using the BEHAVIOR adapter")
        return self._env

    def _require_codec(self) -> BehaviorActionCodec:
        if self._codec is None or self._layout is None:
            raise RuntimeError("reset() must be called before the joint layout is known")
        return self._codec

    @property
    def layout(self) -> R1ProJointLayout:
        if self._layout is None:
            raise RuntimeError("reset() must be called before the joint layout is known")
        return self._layout

    @property
    def robot(self) -> Any:
        return self._require_env().robots[0]

    # ------------------------------------------------------------------ frames
    @property
    def world_from_odom(self) -> np.ndarray:
        return self._world_from_odom.copy()

    @property
    def odom_from_world(self) -> np.ndarray:
        return self._odom_from_world.copy()

    @property
    def world_from_root(self) -> np.ndarray:
        return self._world_from_root.copy()

    @property
    def root_from_world(self) -> np.ndarray:
        return self._root_from_world.copy()

    def _capture_frames(self) -> None:
        robot = self.robot
        footprint = _pose_matrix(*robot.get_position_orientation())
        x, y, yaw = _planar_pose_of(footprint)
        self._world_from_odom = _planar_transform(x, y, yaw)
        self._free_cells = None
        self._odom_from_world = invert_transform(self._world_from_odom)
        # The base's virtual joints measure the footprint relative to the articulation root, so
        # the root pose is world_from_footprint composed with the inverse of that offset.
        q = _to_numpy(robot.get_joint_positions()).astype(np.float64)
        base = q[self.layout.base]
        root_from_footprint = _planar_transform(float(base[0]), float(base[1]), float(base[5]))
        root_from_footprint[2, 3] = float(base[2])
        self._world_from_root = footprint @ invert_transform(root_from_footprint)
        self._root_from_world = invert_transform(self._world_from_root)

    def base_pose_odom(self) -> tuple[float, float, float]:
        footprint = _pose_matrix(*self.robot.get_position_orientation())
        return _planar_pose_of(self._odom_from_world @ footprint)

    def root_from_odom_planar(self, x: float, y: float, yaw: float) -> tuple[float, float, float]:
        transform = self._root_from_world @ self._world_from_odom @ _planar_transform(x, y, yaw)
        return _planar_pose_of(transform)

    # ------------------------------------------------------------------ environment lifecycle
    def _configure_process(self) -> None:
        os.environ.setdefault("OMNIGIBSON_HEADLESS", "1")
        if self._gpu_id is not None:
            os.environ.setdefault("OMNIGIBSON_GPU_ID", str(self._gpu_id))
        if self._data_root is not None:
            os.environ.setdefault("OMNIGIBSON_DATA_PATH", self._data_root)
        if "OMNIGIBSON_APPDATA_PATH" not in os.environ:
            gpu = os.environ.get("OMNIGIBSON_GPU_ID", "0")
            os.environ["OMNIGIBSON_APPDATA_PATH"] = os.path.join(
                os.path.expanduser("~"), ".cache", f"cap-harness-behavior-appdata-gpu{gpu}"
            )
        os.makedirs(os.environ["OMNIGIBSON_APPDATA_PATH"], exist_ok=True)

    def _create_native_environment(self, config: dict[str, object]) -> Any:
        self._configure_process()
        saved_argv = list(sys.argv)
        sys.argv = saved_argv[:1]  # Isaac Sim parses sys.argv and rejects unknown flags.
        try:
            import omnigibson as og

            self._og = og
            return og.Environment(configs=config)
        except Exception:
            sys.stdout.flush()
            sys.stderr.flush()
            raise
        finally:
            sys.argv = saved_argv

    def _ensure_environment(self, metadata: BehaviorTaskMetadata) -> None:
        if (
            self._env is not None
            and self._env_metadata is not None
            and self._env_metadata.activity_name == metadata.activity_name
            and self._env_metadata.scene_model == metadata.scene_model
        ):
            return
        self._clear_environment()
        config = build_environment_config(
            metadata,
            camera_width=self.camera_width,
            camera_height=self.camera_height,
            horizon=self.horizon,
        )
        env = (
            self._env_factory(config)
            if self._env_factory is not None
            else self._create_native_environment(config)
        )
        self._env = env
        self._env_metadata = metadata
        robot = env.robots[0]
        self._layout = self._read_layout(robot)
        self._codec = BehaviorActionCodec(self._layout)
        self._sensor_names = self._resolve_sensor_names(robot)
        head = robot.sensors.get(self._sensor_names["head"])
        if head is not None and hasattr(head, "horizontal_aperture"):
            head.horizontal_aperture = self.head_horizontal_aperture
        self._planner = None

    @staticmethod
    def _read_layout(robot: Any) -> R1ProJointLayout:
        q = _to_numpy(robot.get_joint_positions())
        lower = _to_numpy(robot.joint_lower_limits).astype(np.float64)
        upper = _to_numpy(robot.joint_upper_limits).astype(np.float64)
        grippers = {arm: _to_numpy(robot.gripper_control_idx[arm]) for arm in robot.arm_names}
        return R1ProJointLayout(
            joint_count=int(q.size),
            base=_to_numpy(robot.base_idx),
            trunk=_to_numpy(robot.trunk_control_idx),
            arms={arm: _to_numpy(robot.arm_control_idx[arm]) for arm in robot.arm_names},
            grippers=grippers,
            gripper_open={arm: upper[idx] for arm, idx in grippers.items()},
            gripper_closed={arm: lower[idx] for arm, idx in grippers.items()},
        )

    @staticmethod
    def _resolve_sensor_names(robot: Any) -> dict[str, str]:
        names: dict[str, str] = {}
        for public, link in CAMERA_LINKS.items():
            matches = [name for name in robot.sensors if f":{link}:" in name]
            if not matches:
                raise RuntimeError(f"robot has no camera on link {link!r} for {public!r}")
            names[public] = sorted(matches)[0]
        return names

    def _clear_environment(self) -> None:
        env, self._env = self._env, None
        self._env_metadata = None
        self._planner = None
        self._raw_observation = None
        self._intrinsics = {}
        if env is None:
            return
        if self._env_factory is not None:
            close = getattr(env, "close", None)
            if callable(close):
                close()
            return
        if self._og is not None:
            self._og.clear()

    # ------------------------------------------------------------------ reset
    def reset(
        self,
        task_ref: str | tuple[str, int] | BehaviorTaskMetadata,
        seed: int,
    ) -> Observation:
        if isinstance(seed, bool) or not isinstance(seed, int) or seed < 0:
            raise ValueError("seed must be a non-negative integer")
        metadata = self.registry.resolve(task_ref)
        data_root = self._data_root or os.environ.get("OMNIGIBSON_DATA_PATH")
        if data_root is not None:
            ids = self.registry.instance_ids(metadata, data_root)
            if ids and seed not in ids:
                raise ValueError(
                    f"seed {seed} is not a {metadata.task_name} task instance; available: {ids}"
                )
        self._ensure_environment(metadata)
        env = self._require_env()
        self._closed = False
        self._metadata = metadata
        self._seed = seed
        self._protocol_evaluator = None
        self._success_latched = False
        self._success_observed_step = None
        np.random.seed(seed)
        env.reset()
        self._load_task_instance(metadata, seed)
        observation, _ = env.reset()
        self._raw_observation = observation
        self._q_target = _to_numpy(self.robot.get_joint_positions()).astype(np.float64).copy()
        self._reset_trunk = _to_numpy(self.robot.reset_joint_pos).astype(np.float64)[
            self.layout.trunk
        ]
        self._open_grippers()
        self._raw_step_settle(SETTLE_MIN_STEPS, SETTLE_MAX_STEPS)
        self._capture_frames()
        self._refresh_intrinsics()
        self._elapsed_steps = 0
        self._last_reward = None
        self._last_terminated = False
        self._last_truncated = False
        self._task_context = TaskContext(
            suite=metadata.suite_name,
            task_id=metadata.task_id,
            task_name=metadata.task_name,
            language=metadata.language,
            family=metadata.family,
            metadata={
                "task_ref": metadata.task_ref,
                "activity_name": metadata.activity_name,
                "instance_id": seed,
            },
        )
        observation = self.get_observation()
        if self._run_observer is not None:
            record = dict(metadata.to_manifest_record())
            record["instance_id"] = seed
            self._run_observer.on_reset(observation, record)
        return observation

    def _load_task_instance(self, metadata: BehaviorTaskMetadata, instance_id: int) -> None:
        env = self._require_env()
        loader = getattr(env, "load_task_instance", None)
        if callable(loader):  # test doubles and future upstream helpers
            loader(instance_id)
            return
        import json

        from omnigibson.utils.asset_utils import get_task_instance_path
        from omnigibson.utils.bddl_utils import is_system_bddl_inst
        from omnigibson.utils.python_utils import recursively_convert_to_torch

        og = self._og
        task = env.task
        scene_model = task.scene_name
        tro_filename = task.get_cached_activity_scene_filename(
            scene_model=scene_model,
            activity_name=task.activity_name,
            activity_definition_id=task.activity_definition_id,
            activity_instance_id=instance_id,
        )
        path = get_task_instance_path(
            scene_model,
            f"{scene_model}_task_{task.activity_name}_instances/{tro_filename}-tro_state",
            mode=metadata.instance_mode,
        )
        if path is None:
            raise FileNotFoundError(
                f"no {metadata.instance_mode} task instance {instance_id} for "
                f"{task.activity_name} in scene {scene_model}"
            )
        with open(path, encoding="utf-8") as handle:
            tro_state = recursively_convert_to_torch(json.load(handle))
        robot = self.robot
        for key, state in tro_state.items():
            if key == "robot_poses":
                poses = {name.lower(): value for name, value in state.items()}
                available = poses.get("robot") or poses.get(robot.model)
                if available is None:
                    raise KeyError(f"no presampled robot pose for {robot.model!r}")
                robot.set_position_orientation(
                    available[0]["position"], available[0]["orientation"]
                )
                env.scene.write_task_metadata(key=key, data=state)
            else:
                task.object_scope[key].load_state(state, serialized=False)
        og.sim.update_handles()
        for _ in range(INSTANCE_SETTLE_PHYSICS_STEPS):
            og.sim.step_physics()
            for inst, entity in task.object_scope.items():
                if not is_system_bddl_inst(inst) and entity is not None:
                    entity.keep_still()
        env.scene.update_initial_file()
        env.scene.reset()

    def _open_grippers(self) -> None:
        robot = self.robot
        codec = self._require_codec()
        for arm in self.ARMS:
            native = codec.native_arm(arm)
            assert self._q_target is not None
            self._q_target = codec.apply_gripper(self._q_target, arm, 1.0)
            robot.set_joint_positions(
                self._as_tensor(self.layout.gripper_open[native]),
                indices=self._as_tensor(self.layout.grippers[native], integer=True),
            )
        keep_still = getattr(robot, "keep_still", None)
        if callable(keep_still):
            keep_still()

    def _as_tensor(self, values: np.ndarray, *, integer: bool = False) -> Any:
        try:
            import torch
        except ImportError:  # pragma: no cover - test doubles run without torch
            return np.asarray(values)
        dtype = torch.long if integer else torch.float32
        return torch.as_tensor(np.asarray(values), dtype=dtype)

    def _native_action(self) -> Any:
        assert self._q_target is not None
        return self.robot.q_to_action(self._as_tensor(self._q_target))

    def _raw_step(self) -> None:
        """Advance one tick holding the current target, bypassing observers (reset-time only)."""
        env = self._require_env()
        observation, reward, terminated, truncated, info = env.step(self._native_action())
        self._raw_observation = observation

    def _raw_step_settle(self, min_steps: int, max_steps: int) -> None:
        for _ in range(min_steps):
            self._raw_step()
        for _ in range(max_steps):
            velocity = _to_numpy(self.robot.get_linear_velocity()).astype(np.float64)
            if float(np.linalg.norm(velocity)) < SETTLE_VELOCITY_M_S:
                return
            self._raw_step()

    def _refresh_intrinsics(self) -> None:
        """Read each camera's intrinsics, rendering until the camera parameters are populated.

        OmniGibson enables the camera-parameter annotator lazily; on the first reads after a
        reset a sensor can report all zeros (older versions) or assert "degenerate" (v3.9.2)
        until a few more frames have rendered. Either way: render, then read again.
        """
        robot = self.robot
        for public, sensor_name in self._sensor_names.items():
            sensor = robot.sensors[sensor_name]
            matrix = np.zeros((3, 3))
            last_error: Exception | None = None
            for _ in range(INTRINSICS_RENDER_RETRIES):
                try:
                    matrix = _to_numpy(sensor.intrinsic_matrix).astype(np.float64).reshape(3, 3)
                except AssertionError as exc:
                    last_error = exc
                    matrix = np.zeros((3, 3))
                if matrix[0, 0] > 0.0 and matrix[1, 1] > 0.0:
                    break
                if self._og is not None:
                    self._og.sim.render()
            if matrix[0, 0] <= 0.0 or matrix[1, 1] <= 0.0:
                raise RuntimeError(
                    f"camera {public!r} reported degenerate intrinsics after "
                    f"{INTRINSICS_RENDER_RETRIES} renders: {last_error}"
                )
            self._intrinsics[public] = matrix

    # ------------------------------------------------------------------ observations
    def get_task_context(self) -> TaskContext:
        if self._task_context is None:
            raise RuntimeError("reset() must be called before the task context is available")
        return self._task_context

    def get_robot_state(self) -> RobotState:
        robot = self.robot
        codec = self._require_codec()
        q = _to_numpy(robot.get_joint_positions()).astype(np.float64)
        qd = _to_numpy(robot.get_joint_velocities()).astype(np.float64)
        positions: dict[str, np.ndarray] = {}
        velocities: dict[str, np.ndarray] = {}
        poses: dict[str, Pose] = {}
        grippers: dict[str, float] = {}
        names: dict[str, tuple[str, ...]] = {}
        for arm in self.ARMS:
            native = codec.native_arm(arm)
            idx = self.layout.arms[native]
            positions[arm] = q[idx].copy()
            velocities[arm] = qd[idx].copy()
            eef = _pose_matrix(*robot.eef_links[native].get_position_orientation())
            poses[arm] = matrix_to_pose(self._odom_from_world @ eef, frame=self.BASE_FRAME)
            grippers[arm] = codec.gripper_position(q, arm)
            names[arm] = tuple(str(name) for name in robot.arm_joint_names[native])
        return RobotState(
            joint_positions=positions,
            joint_velocities=velocities,
            end_effector_poses=poses,
            gripper_positions=grippers,
            base_frame=self.BASE_FRAME,
            joint_names=names,
            timestamp_s=self.current_time_s,
            embodiment=self.embodiment,
        )

    def _camera_observation(self, name: str) -> CameraObservation:
        raw = self._raw_observation
        if raw is None:
            raise RuntimeError("reset() must be called before reading cameras")
        robot = self.robot
        sensor_name = self._sensor_names[name]
        frame = raw[robot.name][sensor_name]
        rgb = _to_numpy(frame["rgb"])[..., :3]
        rgb = np.ascontiguousarray(rgb.astype(np.uint8))
        depth = _to_numpy(frame["depth_linear"]).astype(np.float64)
        if depth.ndim == 3:
            depth = depth[..., 0]
        # Isaac reports non-finite distance for rays that hit nothing; the contract needs
        # finite, non-negative metres, and a single bad frame must not poison the episode.
        depth = np.where(np.isfinite(depth) & (depth > 0.0), depth, 0.0)
        sensor = robot.sensors[sensor_name]
        world_from_camera_gl = _pose_matrix(*sensor.get_position_orientation())
        odom_from_camera = self._odom_from_world @ world_from_camera_gl @ GL_TO_CV
        return CameraObservation(
            rgb=rgb,
            depth_m=np.ascontiguousarray(depth),
            intrinsics=self._intrinsics[name].copy(),
            frame=f"camera/{name}",
            camera_pose=matrix_to_pose(odom_from_camera, frame=self.BASE_FRAME),
            timestamp_s=self.current_time_s,
        )

    def get_observation(self) -> Observation:
        cameras = {name: self._camera_observation(name) for name in self.metadata.camera_names}
        return Observation(
            cameras=cameras,
            robot_state=self.get_robot_state(),
            task_context=self.get_task_context(),
            timestamp_s=self.current_time_s,
        )

    # ------------------------------------------------------------------ stepping
    def native_step(self, action: RobotAction) -> StepResult:
        env = self._require_env()
        codec = self._require_codec()
        if action.embodiment != self.embodiment:
            raise ValueError(
                f"action embodiment {action.embodiment!r} does not match {self.embodiment!r}"
            )
        unknown_arms = set(action.arms) - set(self.ARMS)
        if unknown_arms:
            return StepResult(
                ok=False,
                error=ApiError(
                    ErrorCode.NOT_FOUND, f"unknown BEHAVIOR arms: {sorted(unknown_arms)}"
                ),
            )
        for arm, command in action.arms.items():
            if command.target.shape != (7,):
                return StepResult(
                    ok=False,
                    error=ApiError(
                        ErrorCode.INVALID_REQUEST, f"command dimension does not match arm {arm!r}"
                    ),
                )
        if self._run_observer is not None:
            self._run_observer.before_step(action)
        assert self._q_target is not None
        self._q_target = codec.apply_action(self._q_target, action)
        try:
            observation, reward, terminated, truncated, info = env.step(self._native_action())
            self._elapsed_steps += 1
            self._raw_observation = observation
            self._last_reward = float(reward) if reward is not None else None
            self._last_truncated = bool(truncated)
            result = StepResult(
                ok=True,
                observation=self.get_observation(),
                terminated=False,
                truncated=self._last_truncated,
                reward=self._last_reward,
                diagnostics={"native_info": info},
            )
        except Exception as exc:
            result = StepResult(
                ok=False,
                error=ApiError(
                    ErrorCode.ADAPTER_FAILED,
                    f"OmniGibson native step failed: {exc}",
                    details={"exception_type": type(exc).__name__},
                ),
            )
        if self._protocol_evaluator is not None:
            self._protocol_evaluator.after_step(action, result)
            if (
                result.ok
                and not self._success_latched
                and bool(getattr(self._protocol_evaluator, "success", False))
            ):
                self._success_latched = True
                self._success_observed_step = self._elapsed_steps
                result = StepResult(
                    ok=True,
                    observation=result.observation,
                    terminated=True,
                    truncated=result.truncated,
                    reward=result.reward,
                    diagnostics=result.diagnostics,
                )
        self._last_terminated = bool(result.terminated)
        if self._run_observer is not None:
            self._run_observer.after_step(action, result)
        return result

    def step(self, action: RobotAction) -> StepResult:
        runtime = self.native_step(action)
        return StepResult(
            ok=runtime.ok,
            observation=runtime.observation,
            terminated=runtime.terminated,
            truncated=runtime.truncated,
            error=runtime.public_view().error,
            diagnostics={
                "control_period_s": self.control_period_s,
                "step_index": self._elapsed_steps,
            },
        )

    def _hold_action(self) -> RobotAction:
        """Command every arm to its current target so a tick changes only what was rewritten."""
        codec = self._require_codec()
        assert self._q_target is not None
        return RobotAction(
            {
                arm: ArmCommand(
                    "joint_position",
                    codec.arm_joints(self._q_target, arm),
                    embodiment=self.embodiment,
                )
                for arm in self.ARMS
            }
        )

    def check_success(self) -> bool:
        if self._success_latched:
            return True
        evaluator = self._protocol_evaluator
        return bool(evaluator is not None and getattr(evaluator, "success", False))

    def compute_reward(self) -> float | None:
        return self._last_reward

    # ------------------------------------------------------------------ trajectories
    def execute_trajectory(
        self, trajectory: Trajectory | SynchronizedTrajectory
    ) -> ExecutionResult:
        if not isinstance(trajectory, Trajectory | SynchronizedTrajectory):
            raise ValueError("trajectory must be a Trajectory or SynchronizedTrajectory")
        if trajectory.embodiment != self.embodiment:
            raise ValueError(
                f"trajectory embodiment {trajectory.embodiment!r} "
                f"does not match {self.embodiment!r}"
            )
        if not np.isclose(trajectory.dt_s, self.control_period_s, atol=1e-9, rtol=0.0):
            raise ValueError("trajectory dt_s must equal the BEHAVIOR control period (1/30 s)")
        state = self.get_robot_state()
        if isinstance(trajectory, Trajectory):
            positions = {trajectory.arm: trajectory.joint_positions}
            names = {trajectory.arm: trajectory.joint_names}
            grippers = (
                None
                if trajectory.gripper_positions is None
                else {trajectory.arm: trajectory.gripper_positions}
            )
            count = len(trajectory.joint_positions)
        else:
            positions = trajectory.joint_positions
            names = trajectory.joint_names
            grippers = trajectory.gripper_positions
            count = trajectory.waypoint_count
        if not set(positions).issubset(self.ARMS):
            raise ValueError("trajectory contains an unavailable arm")
        if isinstance(trajectory, SynchronizedTrajectory) and set(positions) != set(self.ARMS):
            raise ValueError("synchronized trajectory must name every BEHAVIOR arm")
        stale = self._stale_trajectory_result(trajectory, state)
        if stale is not None:
            return stale
        for arm, trajectory_names in names.items():
            if tuple(trajectory_names) != tuple(state.joint_names[arm]):
                raise ValueError(f"trajectory joint_names do not match arm {arm!r}")
        planned_trunk = self._planned_trunk_targets(trajectory, count)
        codec = self._require_codec()
        trunk = self.layout.trunk
        final: Observation | None = None
        steps = 0

        def trunk_error() -> float:
            if planned_trunk is None:
                return 0.0
            q = _to_numpy(self.robot.get_joint_positions()).astype(np.float64)
            return float(np.max(np.abs(q[trunk] - planned_trunk[-1])))

        def commands(waypoint: int) -> dict[str, ArmCommand]:
            return {
                arm: ArmCommand(
                    mode="joint_position",
                    target=values[waypoint],
                    gripper_position=(None if grippers is None else float(grippers[arm][waypoint])),
                    embodiment=self.embodiment,
                )
                for arm, values in positions.items()
            }

        def joint_errors(observation: Observation) -> dict[str, float]:
            return {
                arm: float(
                    np.max(np.abs(observation.robot_state.joint_positions[arm] - values[-1]))
                )
                for arm, values in positions.items()
            }

        def terminal(result: StepResult, errors: dict[str, float]) -> ExecutionResult:
            return ExecutionResult(
                ok=False,
                steps_executed=steps,
                final_observation=final,
                terminated=result.terminated,
                truncated=result.truncated,
                error=self._terminal_error(result.terminated, result.truncated),
                final_errors=errors,
                diagnostics={"joint_error_rad": errors},
            )

        for waypoint in range(count):
            if planned_trunk is not None:
                assert self._q_target is not None
                self._q_target = codec.apply_trunk(self._q_target, planned_trunk[waypoint])
            result = self.step(RobotAction(commands(waypoint)))
            if not result.ok or result.observation is None:
                return ExecutionResult(
                    ok=False, steps_executed=steps, final_observation=final, error=result.error
                )
            steps += 1
            final = result.observation
            if result.terminated or result.truncated:
                return terminal(result, joint_errors(final))
        assert final is not None
        errors = joint_errors(final)
        for _ in range(TRAJECTORY_MAX_STEPS_PER_WAYPOINT - 1):
            if (
                max(errors.values()) <= TRAJECTORY_TOLERANCE_RAD
                and trunk_error() <= TRUNK_TOLERANCE_RAD
            ):
                break
            result = self.step(RobotAction(commands(count - 1)))
            if not result.ok or result.observation is None:
                return ExecutionResult(
                    ok=False, steps_executed=steps, final_observation=final, error=result.error
                )
            steps += 1
            final = result.observation
            errors = joint_errors(final)
            if result.terminated or result.truncated:
                return terminal(result, errors)
        torso_error = trunk_error()
        if max(errors.values()) > TRAJECTORY_TOLERANCE_RAD or torso_error > TRUNK_TOLERANCE_RAD:
            return ExecutionResult(
                ok=False,
                steps_executed=steps,
                final_observation=final,
                error=ApiError(
                    ErrorCode.TIMEOUT,
                    "final trajectory waypoint did not converge",
                    details={"joint_error_rad": errors, "torso_error_rad": torso_error},
                ),
                final_errors=errors,
            )
        return ExecutionResult(
            ok=True,
            steps_executed=steps,
            final_observation=final,
            final_errors=errors,
            diagnostics={
                "joint_error_rad": errors,
                "torso_planned": planned_trunk is not None,
                "torso_error_rad": torso_error,
            },
        )

    def _planned_trunk_targets(
        self, trajectory: Trajectory | SynchronizedTrajectory, count: int
    ) -> np.ndarray | None:
        """Per-waypoint torso targets when the in-process planner produced ``trajectory``."""
        planner = self._planner
        lookup = getattr(planner, "full_path_for", None)
        if lookup is None:
            return None
        full = lookup(trajectory)
        if full is None:
            return None
        full = np.asarray(full, dtype=np.float64)
        if full.ndim != 2 or len(full) != count or full.shape[1] != self.layout.joint_count:
            return None
        return full[:, self.layout.trunk]

    @staticmethod
    def _terminal_error(terminated: bool, truncated: bool) -> ApiError:
        if truncated:
            return ApiError(
                ErrorCode.TRUNCATED, "episode was truncated before the motion completed"
            )
        return ApiError(ErrorCode.TERMINATED, "episode terminated before the motion completed")

    @staticmethod
    def _stale_trajectory_result(
        trajectory: Trajectory | SynchronizedTrajectory, state: RobotState
    ) -> ExecutionResult | None:
        expected = trajectory.expected_start
        if set(expected.arms) != set(state.arms):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(ErrorCode.STALE_PLAN, "trajectory arm set is stale"),
            )
        joint_errors: dict[str, float] = {}
        gripper_errors: dict[str, float] = {}
        for arm in state.arms:
            if tuple(expected.joint_names[arm]) != tuple(state.joint_names[arm]):
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        ErrorCode.STALE_PLAN, f"trajectory joint names are stale for arm {arm!r}"
                    ),
                )
            joint_errors[arm] = float(
                np.max(np.abs(expected.joint_positions[arm] - state.joint_positions[arm]))
            )
            gripper_errors[arm] = abs(
                expected.gripper_positions[arm] - state.gripper_positions[arm]
            )
        # The gripper is reported but never gates: cuRobo plans the arm with the fingers locked,
        # so an aperture change cannot invalidate the arm path. Gating on it made the natural
        # ordering, plan the reach then open the hand then execute, fail with zero steps.
        if max(joint_errors.values()) <= TRAJECTORY_START_TOLERANCE_RAD:
            return None
        return ExecutionResult(
            ok=False,
            steps_executed=0,
            error=ApiError(
                ErrorCode.STALE_PLAN,
                "trajectory start no longer matches measured robot state",
                details={
                    "joint_error_rad": joint_errors,
                    "gripper_error": gripper_errors,
                    "tolerance": TRAJECTORY_START_TOLERANCE_RAD,
                },
            ),
            final_errors=joint_errors,
        )

    def execute_joint_targets(
        self,
        targets: Sequence[np.ndarray],
        *,
        steps_per_waypoint: int = BASE_STEPS_PER_WAYPOINT,
        articulation_tolerance_rad: float = ARTICULATION_WAYPOINT_TOLERANCE_RAD,
        base_tolerance_m: float = BASE_WAYPOINT_TOLERANCE_M,
        base_tolerance_rad: float = BASE_WAYPOINT_TOLERANCE_RAD,
    ) -> ExecutionResult:
        """Drive the full joint vector through planner waypoints (arms, torso and base together)."""
        layout = self.layout
        articulation = np.concatenate([layout.trunk, *layout.arms.values()])
        steps = 0
        final: Observation | None = None
        last_result: StepResult | None = None
        for raw_waypoint in targets:
            waypoint = np.asarray(raw_waypoint, dtype=np.float64).reshape(-1)
            if waypoint.shape != (layout.joint_count,) or not np.all(np.isfinite(waypoint)):
                return ExecutionResult(
                    ok=False,
                    steps_executed=steps,
                    final_observation=final,
                    error=ApiError(ErrorCode.INVALID_REQUEST, "waypoint has the wrong joint count"),
                )
            self._q_target = waypoint.copy()
            for _ in range(max(1, steps_per_waypoint)):
                last_result = self.step(self._hold_action())
                if not last_result.ok or last_result.observation is None:
                    return ExecutionResult(
                        ok=False,
                        steps_executed=steps,
                        final_observation=final,
                        error=last_result.error,
                    )
                steps += 1
                final = last_result.observation
                if last_result.terminated or last_result.truncated:
                    return ExecutionResult(
                        ok=False,
                        steps_executed=steps,
                        final_observation=final,
                        terminated=last_result.terminated,
                        truncated=last_result.truncated,
                        error=self._terminal_error(last_result.terminated, last_result.truncated),
                    )
                q = _to_numpy(self.robot.get_joint_positions()).astype(np.float64)
                joint_error = float(np.max(np.abs(q[articulation] - waypoint[articulation])))
                base_error = float(np.linalg.norm(q[layout.base[:2]] - waypoint[layout.base[:2]]))
                yaw_error = abs(_wrap_angle(float(q[layout.base[5]] - waypoint[layout.base[5]])))
                if (
                    joint_error <= articulation_tolerance_rad
                    and base_error <= base_tolerance_m
                    and yaw_error <= base_tolerance_rad
                ):
                    break
        return ExecutionResult(ok=True, steps_executed=steps, final_observation=final)

    # ------------------------------------------------------------------ grippers
    def set_grippers(self, positions: Mapping[str, float]) -> ExecutionResult:
        if not isinstance(positions, Mapping) or set(positions) != set(self.ARMS):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(ErrorCode.INVALID_REQUEST, "positions must name every BEHAVIOR arm"),
            )
        codec = self._require_codec()
        normalized: dict[str, float] = {}
        for arm in self.ARMS:
            try:
                normalized[arm] = codec.validate_gripper(positions[arm])
            except (TypeError, ValueError):
                return ExecutionResult(
                    ok=False,
                    steps_executed=0,
                    error=ApiError(
                        ErrorCode.INVALID_REQUEST,
                        f"gripper position for {arm!r} must be finite and in [0, 1]",
                    ),
                )
        assert self._q_target is not None
        result = self.step(
            RobotAction(
                {
                    arm: ArmCommand(
                        "joint_position",
                        codec.arm_joints(self._q_target, arm),
                        normalized[arm],
                        embodiment=self.embodiment,
                    )
                    for arm in self.ARMS
                }
            )
        )
        terminal = result.terminated or result.truncated
        return ExecutionResult(
            ok=result.ok and not terminal,
            steps_executed=1 if result.ok else 0,
            final_observation=result.observation,
            terminated=result.terminated,
            truncated=result.truncated,
            error=result.error
            or (self._terminal_error(result.terminated, result.truncated) if terminal else None),
        )

    def set_gripper(self, position: float, *, arm: str = "primary") -> ExecutionResult:
        arm = self.resolve_arm(arm)
        if arm not in self.ARMS:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(ErrorCode.NOT_FOUND, f"unknown arm {arm!r}"),
            )
        codec = self._require_codec()
        try:
            numeric = codec.validate_gripper(position)
        except (TypeError, ValueError):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(ErrorCode.INVALID_REQUEST, "gripper position must be in [0, 1]"),
            )
        result: StepResult | None = None
        final: Observation | None = None
        step_index = -1
        for step_index in range(GRIPPER_STEPS):
            assert self._q_target is not None
            result = self.step(
                RobotAction(
                    {
                        arm: ArmCommand(
                            "joint_position",
                            codec.arm_joints(self._q_target, arm),
                            numeric,
                            embodiment=self.embodiment,
                        )
                    }
                )
            )
            if not result.ok or result.observation is None:
                break
            final = result.observation
            if result.terminated or result.truncated:
                break
        assert result is not None
        terminal = result.terminated or result.truncated
        return ExecutionResult(
            ok=result.ok and not terminal,
            steps_executed=step_index + 1 if result.ok else step_index,
            final_observation=final,
            terminated=result.terminated,
            truncated=result.truncated,
            error=result.error
            or (self._terminal_error(result.terminated, result.truncated) if terminal else None),
        )

    def close_gripper(self, *, arm: str = "primary") -> ExecutionResult:
        return self.set_gripper(0.0, arm=arm)

    # ------------------------------------------------------------------ extensions (public)
    def get_base_pose(self) -> tuple[float, float, float]:
        """``(x, y, yaw)`` of the base footprint in ``odom``."""
        return self.base_pose_odom()

    def navigate_to_pose(
        self,
        x: float,
        y: float,
        yaw: float = 0.0,
        *,
        planner: str = "curobo",
        tolerance_m: float = 0.05,
        tolerance_rad: float = 0.1,
        max_steps: int = 1500,
    ) -> ExecutionResult:
        """Drive the holonomic base to an ``odom`` pose; diagnostics report the motion made."""
        goal = np.array([x, y, yaw], dtype=np.float64)
        if not np.all(np.isfinite(goal)):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(ErrorCode.INVALID_REQUEST, "navigation goal must be finite"),
            )
        if planner not in ("curobo", "servo"):
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(ErrorCode.INVALID_REQUEST, "planner must be 'curobo' or 'servo'"),
            )
        if max_steps <= 0 or tolerance_m <= 0.0 or tolerance_rad <= 0.0:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    ErrorCode.INVALID_REQUEST, "max_steps and tolerances must be positive"
                ),
            )
        start = self.base_pose_odom()
        if planner == "servo":
            drive = self._servo_base(goal, tolerance_m, tolerance_rad, int(max_steps))
        else:
            drive = self._drive_planned(goal, tolerance_m, tolerance_rad, int(max_steps))
        steps, final = drive.steps, drive.final
        if not drive.ok:
            return ExecutionResult(
                ok=False,
                steps_executed=steps,
                final_observation=final,
                terminated=drive.terminated,
                truncated=drive.truncated,
                error=drive.error,
                diagnostics={**self._motion_report(start, planner), **drive.diagnostics},
            )
        position_error, yaw_error = self._base_errors(goal)
        diagnostics = {**self._motion_report(start, planner), **drive.diagnostics}
        errors = {"position_m": position_error, "yaw_rad": yaw_error}
        if position_error > tolerance_m or yaw_error > tolerance_rad:
            return ExecutionResult(
                ok=False,
                steps_executed=steps,
                final_observation=final,
                error=ApiError(
                    ErrorCode.TIMEOUT,
                    "base did not reach the navigation goal within tolerance",
                    details=errors,
                ),
                final_errors=errors,
                diagnostics=diagnostics,
            )
        return ExecutionResult(
            ok=True,
            steps_executed=steps,
            final_observation=final,
            final_errors=errors,
            diagnostics=diagnostics,
        )

    def _servo_base(
        self, goal: np.ndarray, tolerance_m: float, tolerance_rad: float, max_steps: int
    ) -> _BaseDrive:
        """Position-servo the base virtual joints straight to an ``odom`` goal (no planning)."""
        assert self._q_target is not None
        codec = self._require_codec()
        goal_root = np.array(
            self.root_from_odom_planar(float(goal[0]), float(goal[1]), float(goal[2])),
            dtype=np.float64,
        )
        steps = 0
        final: Observation | None = None
        for _ in range(max_steps):
            # Step the commanded base pose toward the goal instead of jumping to it, so the
            # position controller never drives the base fast enough to sweep the scene.
            current = np.array(self.root_from_odom_planar(*self.base_pose_odom()), dtype=np.float64)
            delta = goal_root - current
            delta[2] = _wrap_angle(float(delta[2]))
            distance = float(np.hypot(delta[0], delta[1]))
            if distance > BASE_SERVO_STEP_M:
                delta[:2] *= BASE_SERVO_STEP_M / distance
            delta[2] = float(np.clip(delta[2], -BASE_SERVO_STEP_RAD, BASE_SERVO_STEP_RAD))
            nxt = current + delta
            self._q_target = codec.apply_base(self._q_target, nxt[0], nxt[1], nxt[2])
            result = self.step(self._hold_action())
            if not result.ok or result.observation is None:
                return _BaseDrive(False, steps, final, result.error)
            steps += 1
            final = result.observation
            if result.terminated or result.truncated:
                return _BaseDrive(
                    False,
                    steps,
                    final,
                    self._terminal_error(result.terminated, result.truncated),
                    result.terminated,
                    result.truncated,
                )
            fallen = self._base_fall_error()
            if fallen is not None:
                return _BaseDrive(False, steps, final, fallen)
            if self._base_within(goal, tolerance_m, tolerance_rad):
                break
        return _BaseDrive(True, steps, final)

    def _base_fall_error(self) -> ApiError | None:
        """An error when the base has dropped off the floor, which the planar pose cannot show."""
        height = float(_pose_matrix(*self.robot.get_position_orientation())[2, 3])
        reference = float(self._world_from_odom[2, 3])
        if not math.isfinite(height) or height < reference - BASE_FALL_LIMIT_M:
            return ApiError(
                ErrorCode.TERMINATED,
                "the base has left the floor; the navigation goal had no ground beneath it",
                details={"base_height_m": height, "reset_height_m": reference},
            )
        return None

    def _execute_base_plan(self, waypoints: Sequence[np.ndarray], budget: int) -> _BaseDrive:
        per_waypoint = max(1, budget // max(1, len(waypoints)))
        execution = self.execute_joint_targets(
            waypoints, steps_per_waypoint=min(BASE_STEPS_PER_WAYPOINT, per_waypoint)
        )
        return _BaseDrive(
            execution.ok,
            execution.steps_executed,
            execution.final_observation,
            execution.error,
            execution.terminated,
            execution.truncated,
        )

    def _drive_planned(
        self, goal: np.ndarray, tolerance_m: float, tolerance_rad: float, max_steps: int
    ) -> _BaseDrive:
        """CuRobo base plan to the goal; when none exists, hop along the traversability map."""
        if not self.base_pose_is_free(float(goal[0]), float(goal[1])):
            return _BaseDrive(
                False,
                error=ApiError(
                    ErrorCode.PLANNING_FAILED,
                    "navigation goal is not traversable for the base footprint "
                    "(scene traversability map); choose another goal",
                    details={"route": "goal_blocked"},
                ),
                diagnostics={"route": "goal_blocked"},
            )
        xr, yr, yawr = self.root_from_odom_planar(float(goal[0]), float(goal[1]), float(goal[2]))
        waypoints, error = self.planner().plan_base(xr, yr, yawr)
        if error is None:
            drive = self._execute_base_plan(waypoints, max_steps)
            drive.diagnostics.update({"route": "direct", "hops": 1, "servo_hops": 0})
            fallen = self._base_fall_error()
            if fallen is not None:
                drive.ok, drive.error = False, fallen
            return drive
        direct_status = str(dict(error.details or {}).get("status", "unknown"))
        route = self._traversable_route(goal)
        if route is None:
            return _BaseDrive(
                False,
                error=ApiError(
                    ErrorCode.PLANNING_FAILED,
                    f"{error.message}; the scene's traversability map has no route to the goal either",
                    details={**dict(error.details or {}), "route": "none"},
                ),
                diagnostics={"route": "none", "direct_status": direct_status},
            )
        hops, geodesic_m = route
        diagnostics: dict[str, Any] = {
            "route": "traversability",
            "hops": len(hops),
            "servo_hops": 0,
            "geodesic_m": geodesic_m,
            "direct_status": direct_status,
        }
        steps = 0
        final: Observation | None = None
        for index, hop in enumerate(hops):
            last = index == len(hops) - 1
            remaining = max_steps - steps
            if remaining <= 0:
                return _BaseDrive(
                    False,
                    steps,
                    final,
                    ApiError(
                        ErrorCode.TIMEOUT, "step budget exhausted before the base reached the goal"
                    ),
                    diagnostics=diagnostics,
                )
            hop_goal = np.array(hop, dtype=np.float64)
            hx, hy, hyaw = self.root_from_odom_planar(*hop)
            waypoints, hop_error = self.planner().plan_base(hx, hy, hyaw)
            if hop_error is None:
                drive = self._execute_base_plan(waypoints, remaining)
            else:
                diagnostics["servo_hops"] += 1
                drive = self._servo_base(
                    hop_goal,
                    tolerance_m if last else HOP_TOLERANCE_M,
                    tolerance_rad if last else HOP_TOLERANCE_RAD,
                    min(remaining, SERVO_HOP_MAX_STEPS),
                )
            steps += drive.steps
            final = drive.final if drive.final is not None else final
            if not drive.ok:
                drive.steps, drive.final, drive.diagnostics = steps, final, diagnostics
                return drive
        return _BaseDrive(True, steps, final, diagnostics=diagnostics)

    def _traversable_route(
        self, goal: np.ndarray
    ) -> tuple[list[tuple[float, float, float]], float] | None:
        """Hops along the scene's shortest traversable path to ``goal`` (odom), or None."""
        robot = self.robot
        scene = getattr(robot, "scene", None)
        shortest_path = getattr(scene, "get_shortest_path", None)
        if shortest_path is None:
            return None
        sx, sy, _ = self.base_pose_odom()
        start_world = (self._world_from_odom @ np.array([sx, sy, 0.0, 1.0]))[:2]
        goal_world = (self._world_from_odom @ np.array([goal[0], goal[1], 0.0, 1.0]))[:2]
        try:
            path, geodesic = shortest_path(
                self._floor_index(scene),
                _as_tensor(start_world),
                _as_tensor(goal_world),
                entire_path=True,
                robot=robot,
            )
        except Exception:
            return None
        if path is None:
            return None
        world_points = _to_numpy(path).astype(np.float64).reshape(-1, 2)
        odom_points = [
            (self._odom_from_world @ np.array([wx, wy, 0.0, 1.0]))[:2] for wx, wy in world_points
        ]
        hops = resample_route(odom_points, goal, BASE_HOP_M)
        return hops, float(_to_numpy(geodesic).reshape(-1)[0])

    def base_pose_is_free(self, x: float, y: float) -> bool:
        """Whether the base footprint fits at ``odom`` (x, y) per the scene's traversability map.

        True when the scene has no map (nothing known); False outside the map. A blocked goal is
        refused by ``navigate_to_pose`` before any planning, so programs can test candidate
        approach poses cheaply.
        """
        cells = self._free_footprint_cells()
        if cells is None:
            return True
        trav_map, free = cells
        world = (self._world_from_odom @ np.array([float(x), float(y), 0.0, 1.0]))[:2]
        try:
            index = _to_numpy(trav_map.world_to_map(_as_tensor(world))).astype(int).reshape(2)
        except Exception:
            return True
        row, column = int(index[0]), int(index[1])
        if not (0 <= row < free.shape[0] and 0 <= column < free.shape[1]):
            return False
        return bool(free[row, column])

    def _free_footprint_cells(self) -> tuple[Any, np.ndarray] | None:
        """The traversability map eroded by the base footprint, cached per reset."""
        if self._free_cells is not None:
            return self._free_cells
        robot = self.robot
        scene = getattr(robot, "scene", None)
        trav_map = getattr(scene, "trav_map", None)
        floor_maps = getattr(trav_map, "floor_map", None)
        if not floor_maps:
            return None
        try:
            grid = _to_numpy(floor_maps[self._floor_index(scene)]) >= 255
            extent = _to_numpy(robot.reset_joint_pos_aabb_extent).astype(np.float64).reshape(-1)
            radius_m = float(np.linalg.norm(extent[:2])) / 2.0 + FOOTPRINT_MARGIN_M
            resolution = float(trav_map.map_resolution)
        except Exception:
            return None
        half = max(1, int(math.ceil(radius_m / resolution)) // 2)
        self._free_cells = (trav_map, erode_free_cells(grid, half))
        return self._free_cells

    def _floor_index(self, scene: Any) -> int:
        heights = getattr(getattr(scene, "trav_map", None), "floor_heights", None)
        if not heights:
            return 0
        z = float(_pose_matrix(*self.robot.get_position_orientation())[2, 3])
        return int(np.argmin([abs(float(h) - z) for h in heights]))

    def _base_errors(self, goal: np.ndarray) -> tuple[float, float]:
        x, y, yaw = self.base_pose_odom()
        return (
            float(np.hypot(goal[0] - x, goal[1] - y)),
            abs(_wrap_angle(float(goal[2] - yaw))),
        )

    def _base_within(self, goal: np.ndarray, tolerance_m: float, tolerance_rad: float) -> bool:
        position_error, yaw_error = self._base_errors(goal)
        return position_error <= tolerance_m and yaw_error <= tolerance_rad

    def _motion_report(
        self, start: tuple[float, float, float], planner: str
    ) -> dict[str, float | str]:
        x, y, yaw = self.base_pose_odom()
        moved_yaw = _wrap_angle(yaw - start[2])
        return {
            "planner": planner,
            "moved_x": float(x - start[0]),
            "moved_y": float(y - start[1]),
            "moved_yaw": float(moved_yaw),
            "moved_cos": float(math.cos(moved_yaw)),
            "moved_sin": float(math.sin(moved_yaw)),
        }

    def move_torso(
        self,
        target: Sequence[float],
        *,
        tolerance: float = 0.01,
        max_steps: int = 300,
    ) -> ExecutionResult:
        """Servo the torso joints to ``target`` (radians, in the robot's torso joint order)."""
        codec = self._require_codec()
        try:
            values = np.asarray(target, dtype=np.float64).reshape(-1)
            assert self._q_target is not None
            proposed = codec.apply_trunk(self._q_target, values)
        except (TypeError, ValueError, AssertionError) as exc:
            return ExecutionResult(
                ok=False, steps_executed=0, error=ApiError(ErrorCode.INVALID_REQUEST, str(exc))
            )
        if tolerance <= 0.0 or max_steps <= 0:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(
                    ErrorCode.INVALID_REQUEST, "tolerance and max_steps must be positive"
                ),
            )
        self._q_target = proposed
        steps = 0
        final: Observation | None = None
        error = float("inf")
        for _ in range(int(max_steps)):
            result = self.step(self._hold_action())
            if not result.ok or result.observation is None:
                return ExecutionResult(
                    ok=False, steps_executed=steps, final_observation=final, error=result.error
                )
            steps += 1
            final = result.observation
            if result.terminated or result.truncated:
                return ExecutionResult(
                    ok=False,
                    steps_executed=steps,
                    final_observation=final,
                    terminated=result.terminated,
                    truncated=result.truncated,
                    error=self._terminal_error(result.terminated, result.truncated),
                )
            q = _to_numpy(self.robot.get_joint_positions()).astype(np.float64)
            error = float(np.max(np.abs(q[self.layout.trunk] - values)))
            if error <= tolerance:
                break
        errors = {"torso_rad": error}
        if error > tolerance:
            return ExecutionResult(
                ok=False,
                steps_executed=steps,
                final_observation=final,
                error=ApiError(ErrorCode.TIMEOUT, "torso did not converge", details=errors),
                final_errors=errors,
            )
        return ExecutionResult(
            ok=True, steps_executed=steps, final_observation=final, final_errors=errors
        )

    def reset_torso(self) -> ExecutionResult:
        """Return the torso to the pose it had when the task instance was loaded."""
        if self._reset_trunk is None:
            return ExecutionResult(
                ok=False,
                steps_executed=0,
                error=ApiError(ErrorCode.INVALID_REQUEST, "reset() must be called first"),
            )
        return self.move_torso(self._reset_trunk)

    @staticmethod
    def plan_standoff_pose(
        support_cloud: Any, object_cloud: Any, standoff_m: float = 0.3
    ) -> tuple[float, float, float]:
        return plan_standoff_pose(support_cloud, object_cloud, standoff_m)

    def plan_approach_pose(
        self, object_cloud: Any, distance_m: float = 0.7
    ) -> tuple[float, float, float]:
        """Base pose ``distance_m`` short of the object along the current line of sight."""
        return plan_approach_pose(object_cloud, self.base_pose_odom(), distance_m)

    # ------------------------------------------------------------------ planning hooks
    def get_planning_context(self) -> RobotPlanningContext:
        robot = self.robot
        codec = self._require_codec()
        odom_from_root = self._odom_from_world @ self._world_from_root
        return RobotPlanningContext(
            embodiment=self.embodiment,
            model=str(robot.model),
            joint_names={
                arm: tuple(str(name) for name in robot.arm_joint_names[codec.native_arm(arm)])
                for arm in self.ARMS
            },
            base_transforms={arm: odom_from_root.copy() for arm in self.ARMS},
            end_effector_links={
                arm: str(robot.eef_link_names[codec.native_arm(arm)]) for arm in self.ARMS
            },
        )

    def ik_request(self, target_pose: Pose, state: RobotState, arm: str) -> tuple[Pose, RobotState]:
        return target_pose, state

    def planning_scene_request(self, scene: PlanningScene, arm: str) -> PlanningScene:
        return scene

    @property
    def action_bounds(self) -> tuple[np.ndarray, np.ndarray]:
        lower = _to_numpy(self.robot.joint_lower_limits).astype(np.float64)
        upper = _to_numpy(self.robot.joint_upper_limits).astype(np.float64)
        return lower.copy(), upper.copy()

    # ------------------------------------------------------------------ metadata (public)
    def get_task_metadata(self) -> Mapping[str, object]:
        record = dict(self.metadata.to_manifest_record())
        record["instance_id"] = self._seed
        return MappingProxyType(record)

    def get_controller_metadata(self) -> Mapping[str, object]:
        layout = self.layout
        q = _to_numpy(self.robot.get_joint_positions()).astype(np.float64)
        lower, upper = self.action_bounds
        return MappingProxyType(
            {
                "action_dimension": int(layout.joint_count),
                "action_lower_bounds": tuple(float(value) for value in lower),
                "action_upper_bounds": tuple(float(value) for value in upper),
                "arm_names": self.ARMS,
                "base_frame": self.BASE_FRAME,
                "base_pose": self.base_pose_odom(),
                "camera_names": self.metadata.camera_names,
                "control_frequency_hz": self.control_frequency,
                "control_period_s": self.control_period_s,
                "controller": self.controller,
                "controllable_gripper_arms": self.ARMS,
                "gripper_semantics": {
                    "normalized": "0=closed, 1=open",
                    "native": "finger joint positions in metres",
                },
                "supported_action_modes": ("joint_position",),
                "torso_positions": tuple(float(value) for value in q[layout.trunk]),
                "torso_lower_bounds": tuple(float(value) for value in lower[layout.trunk]),
                "torso_upper_bounds": tuple(float(value) for value in upper[layout.trunk]),
            }
        )

    # ------------------------------------------------------------------ lifecycle
    def close(self) -> None:
        if self._closed:
            return
        self._clear_environment()
        self._closed = True


__all__ = [
    "BASE_FRAME",
    "CAMERA_LINKS",
    "BehaviorAdapter",
    "plan_approach_pose",
    "plan_standoff_pose",
]
````

## src/cap_harness/behavior/planning.py

````text
"""In-process cuRobo planning for R1 Pro through OmniGibson's ``CuRoboMotionGenerator``.

Implements the harness provider protocols (IK, joint-space trajectories, integrated pose planning)
on the simulator's own robot model and world geometry instead of the HTTP cuRobo service, which
has no R1 Pro model and only a point-cloud view of the scene. Poses arrive in ``odom`` and are
converted to the world frame the OmniGibson wrapper plans in; results come back as 30 Hz
trajectories bound to the arm's measured start state.
"""

from __future__ import annotations

import collections
from collections.abc import Mapping
import math
import os
from pathlib import Path
from typing import Any

import numpy as np

from cap_harness.behavior.codec import BehaviorActionCodec
from cap_harness.contracts import (
    IKResult,
    PlanningScene,
    PlanResult,
    Pose,
    RobotPlanningContext,
    RobotState,
    SynchronizedPlanResult,
    SynchronizedTrajectory,
    Trajectory,
)
from cap_harness.errors import ApiError, ErrorCode
from cap_harness.geometry import pose_to_matrix

PLANNER_NAME = "curobo_omnigibson"
DEFAULT_BATCH_SIZE = 1
"""One cuRobo seed batch: three seeds triple the warm-up memory next to Isaac on a 24 GB GPU."""
DEFAULT_USE_CUDA_GRAPH = False
"""CUDA graphs save milliseconds per plan but a failed capture (e.g. under memory pressure) poisons
every later allocation with "Global alloc not supported yet"; planning is not the bottleneck."""
COLLISION_ACTIVATION_DISTANCE_M = 0.02
PLAN_TIMEOUT_S = 60.0
MAX_PLANNING_ATTEMPTS = 100
MAX_IK_FAILURES_BEFORE_RETURN = 50
WAYPOINT_INTERPOLATION_RAD = 0.01
FULL_PATH_MEMORY = 8
GOAL_CONTAINMENT_MARGIN_M = 0.02
"""A scene object whose bounding box contains a pose goal (plus this margin) is the object the
arm is reaching into, so it is left out of the collision world for that plan, as OmniGibson's own
grasp primitive does with its target. Tables and floors never contain a goal above them.
"""
BASE_PRISMATIC_LIMIT_M = 12.0
"""cuRobo bound on the base's virtual x/y joints, measured from the articulation root.

OmniGibson leaves that root at the world origin and loads a task instance into the joints, so the
upstream ±5 m bound cannot even reach the robot's own start pose in a house scene; 12 m covers the
scenes of the supported tasks. Override with CAP_HARNESS_BEHAVIOR_BASE_LIMIT_M.
"""


def _to_numpy(value: Any) -> np.ndarray:
    if hasattr(value, "detach"):
        value = value.detach().cpu()
    return np.asarray(value)


def locked_torso_config(
    source: str | os.PathLike[str], output_dir: str | os.PathLike[str], torso_joints: Any
) -> Path:
    """Write a copy of an embodiment yaml with the torso joints added to ``lock_joints``.

    cuRobo's R1 Pro arm embodiment leaves the four torso joints free, so an "arm" plan may also
    lean the torso; our ``Trajectory`` carries only the arm, so that motion would be lost on
    execution. Locking the torso makes arm plans pure arm motion; the wrapper re-syncs locked
    joints with the live state before every plan, so the torso stays where the program put it.
    """
    import yaml

    source = Path(source)
    data = yaml.safe_load(source.read_text(encoding="utf-8"))
    kinematics = data["robot_cfg"]["kinematics"]
    locks = dict(kinematics.get("lock_joints") or {})
    for name in torso_joints:
        locks.setdefault(str(name), None)
    kinematics["lock_joints"] = locks
    out_dir = Path(output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    target = out_dir / f"{source.stem}_locked_torso{source.suffix}"
    target.write_text(yaml.safe_dump(data, sort_keys=False), encoding="utf-8")
    return target


def _tensor(values: np.ndarray) -> Any:
    """float32 torch tensor when torch is importable, else the numpy array (unit tests)."""
    try:
        import torch
    except ImportError:  # pragma: no cover - exercised only without torch
        return np.asarray(values, dtype=np.float32)
    return torch.as_tensor(np.asarray(values, dtype=np.float32))


def _batched(values: np.ndarray, batch_size: int) -> Any:
    """Stack one target ``batch_size`` times, the layout OmniGibson's primitives send to cuRobo."""
    array = np.asarray(values, dtype=np.float32)
    return _tensor(np.repeat(array[None, :], max(1, int(batch_size)), axis=0))


def _full_result_outcome(results: Any) -> tuple[np.ndarray, list[Any], dict[str, Any]]:
    """Success flags, per-target paths and a failure summary from cuRobo MotionGenResult objects."""
    flags: list[np.ndarray] = []
    paths: list[Any] = []
    statuses: list[str] = []
    attempts = 0
    solve_time = 0.0
    for result in list(results):
        success = _to_numpy(result.success).astype(bool).reshape(-1)
        batch_paths = (
            list(result.get_paths())
            if getattr(result, "interpolated_plan", None) is not None
            else [None] * len(success)
        )
        flags.append(success)
        paths.extend(batch_paths[: len(success)])
        status = getattr(result, "status", None)
        if status is not None:
            statuses.append(str(getattr(status, "value", status)))
        attempts += int(getattr(result, "attempts", 0) or 0)
        solve_time += float(getattr(result, "solve_time", 0.0) or 0.0)
    merged = np.concatenate(flags) if flags else np.zeros(0, dtype=bool)
    outcome = {
        "status": statuses[0] if statuses else ("ok" if merged.any() else "unknown"),
        "attempts": attempts,
        "solve_time_s": round(solve_time, 3),
    }
    return merged, paths, outcome


def _link_position(link: Any) -> np.ndarray | None:
    """World position of a simulator link, or None when it cannot be read."""
    if link is None:
        return None
    try:
        return _to_numpy(link.get_position_orientation()[0]).astype(np.float64)[:3]
    except (AttributeError, TypeError, ValueError, IndexError):
        return None


def _object_bounds(obj: Any) -> tuple[np.ndarray, np.ndarray] | None:
    """World-frame axis-aligned bounds of a scene object, or None when it has none."""
    aabb = getattr(obj, "aabb", None)
    if aabb is None:
        return None
    try:
        lower = _to_numpy(aabb[0]).astype(np.float64).reshape(3)
        upper = _to_numpy(aabb[1]).astype(np.float64).reshape(3)
    except (TypeError, ValueError, IndexError):
        return None
    return lower, upper


def _to_cpu_float(trajectory: Any) -> Any:
    """Move a cuRobo path to the CPU before interpolating it.

    OmniGibson does the same (``.cpu().float()``): interpolating on the GPU allocates while cuRobo
    may still hold a CUDA-graph capture open, which fails with "Global alloc not supported yet".
    """
    if hasattr(trajectory, "detach"):
        return trajectory.detach().cpu().float()
    return np.asarray(trajectory, dtype=np.float32)


def _matrix_to_xyzw(transform: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    from cap_harness.geometry import matrix_to_quaternion_wxyz

    wxyz = matrix_to_quaternion_wxyz(transform[:3, :3])
    return transform[:3, 3].copy(), np.array([wxyz[1], wxyz[2], wxyz[3], wxyz[0]])


class OmniGibsonCuroboPlanner:
    """Bind cuRobo to the adapter's live robot; construction is lazy and warm-up happens once."""

    def __init__(
        self,
        adapter: Any,
        *,
        batch_size: int | None = None,
        use_cuda_graph: bool | None = None,
    ) -> None:
        self._adapter = adapter
        env_batch = os.environ.get("CAP_HARNESS_BEHAVIOR_CUROBO_BATCH")
        env_graph = os.environ.get("CAP_HARNESS_BEHAVIOR_CUROBO_CUDA_GRAPH")
        self._batch_size = int(
            batch_size if batch_size is not None else (env_batch or DEFAULT_BATCH_SIZE)
        )
        if use_cuda_graph is None:
            use_cuda_graph = (
                env_graph.strip().lower() in {"1", "true", "yes"}
                if env_graph
                else DEFAULT_USE_CUDA_GRAPH
            )
        self._use_cuda_graph = bool(use_cuda_graph)
        # Upstream's arm embodiment plans with the four torso joints active (only the base and
        # the fingers are locked); the torso is what brings a table top or the floor within reach
        # of the hanging arms. The planned torso motion is executed alongside the arm (the adapter
        # asks ``full_path_for``); CAP_HARNESS_BEHAVIOR_LOCK_TORSO=1 restores arm-only plans.
        env_lock = os.environ.get("CAP_HARNESS_BEHAVIOR_LOCK_TORSO", "0").strip().lower()
        self._lock_torso = env_lock in {"1", "true", "yes"}
        self._generator: Any | None = None
        self._embodiment: Any | None = None
        self.last_ignored_objects: list[str] = []
        self.last_attached_objects: list[str] = []
        self._full_paths: collections.OrderedDict[bytes, np.ndarray] = collections.OrderedDict()

    # ------------------------------------------------------------------ native access
    def _generator_for(self) -> tuple[Any, Any]:
        if self._generator is None:
            import omnigibson.action_primitives.curobo as curobo_module
            from omnigibson.action_primitives.curobo import (
                CuRoboEmbodimentSelection,
                CuRoboMotionGenerator,
            )

            # The planar base joints are clamped to ±5 m around the articulation root upstream,
            # too little for a room-to-room task; the macro is read when the generator is built.
            try:
                curobo_module.m.HOLONOMIC_BASE_PRISMATIC_JOINT_LIMIT = float(
                    os.environ.get("CAP_HARNESS_BEHAVIOR_BASE_LIMIT_M", BASE_PRISMATIC_LIMIT_M)
                )
            except AttributeError:  # pragma: no cover - macro already read and locked
                pass

            robot = self._adapter.robot
            config_paths = None
            if self._lock_torso:
                paths = dict(robot.curobo_path)
                joint_names = list(robot.joints.keys())
                trunk_names = [joint_names[int(i)] for i in _to_numpy(robot.trunk_control_idx)]
                output_dir = (
                    Path(os.environ.get("OMNIGIBSON_APPDATA_PATH", os.path.expanduser("~/.cache")))
                    / "cap-harness-curobo"
                )
                paths[CuRoboEmbodimentSelection.ARM] = str(
                    locked_torso_config(
                        paths[CuRoboEmbodimentSelection.ARM], output_dir, trunk_names
                    )
                )
                config_paths = paths
            self._generator = CuRoboMotionGenerator(
                robot=robot,
                robot_cfg_path=config_paths,
                batch_size=self._batch_size,
                use_cuda_graph=self._use_cuda_graph,
                collision_activation_distance=COLLISION_ACTIVATION_DISTANCE_M,
            )
            self._embodiment = CuRoboEmbodimentSelection
        return self._generator, self._embodiment

    def _attached_object(self, native_arm: str) -> Mapping[str, Any] | None:
        """The object held by ``native_arm``, keyed by its eef link, if its mesh is available."""
        robot = self._adapter.robot
        held = getattr(robot, "_ag_obj_in_hand", {}).get(native_arm)
        if held is None:
            return None
        try:
            held.root_link.get_trimesh_mesh()
        except Exception:
            return None
        return {str(robot.eef_link_names[native_arm]): held.root_link}

    def _start_in_collision(self, generator: Any, embodiment: Any) -> bool:
        """Whether the robot's current configuration is itself in collision.

        A plan refused from such a state looks exactly like an unreachable goal, and no goal is
        reachable until the arm is servoed out of it.
        """
        check = getattr(generator, "check_collisions", None)
        if check is None:
            return False
        try:
            q = _to_numpy(self._adapter.robot.get_joint_positions()).astype(np.float64)
            verdict = _to_numpy(check(_batched(q, 1), skip_obstacle_update=True))
            return bool(np.asarray(verdict).reshape(-1)[0])
        except Exception:
            return False

    def _held_objects(self) -> list[Any]:
        """Objects assisted-grasped by either hand (they ride with the hand, never obstacles)."""
        robot = self._adapter.robot
        held = getattr(robot, "_ag_obj_in_hand", None) or {}
        return [obj for obj in held.values() if obj is not None]

    def _eef_world_positions(self, native_arms: list[str]) -> list[np.ndarray]:
        robot = self._adapter.robot
        links = getattr(robot, "eef_links", None) or {}
        points = [_link_position(links.get(native)) for native in native_arms]
        return [point for point in points if point is not None]

    def _plan_exclusions(self, native_arms: list[str], goal_points: list[np.ndarray]) -> list[Any]:
        """Objects left out of the collision world for one plan: the object a goal reaches into,
        the object the hand is currently inside (a grasp just made or just missed), and anything
        held by either hand.
        """
        candidates = self._objects_containing(goal_points + self._eef_world_positions(native_arms))
        candidates.extend(self._held_objects())
        unique: list[Any] = []
        for obj in candidates:
            if not any(obj is seen for seen in unique):
                unique.append(obj)
        return unique

    def _objects_containing(self, world_points: list[np.ndarray]) -> list[Any]:
        """Scene objects whose axis-aligned bounds contain any of ``world_points``."""
        robot = self._adapter.robot
        scene = getattr(robot, "scene", None)
        objects = list(getattr(scene, "objects", []) or [])
        found: list[Any] = []
        for obj in objects:
            if obj is robot or getattr(obj, "visual_only", False):
                continue
            bounds = _object_bounds(obj)
            if bounds is None:
                continue
            lower = bounds[0] - GOAL_CONTAINMENT_MARGIN_M
            upper = bounds[1] + GOAL_CONTAINMENT_MARGIN_M
            for point in world_points:
                if bool(np.all(point >= lower) and np.all(point <= upper)):
                    found.append(obj)
                    break
        return found

    def _world_targets(self, targets: Mapping[str, Pose]) -> tuple[dict[str, Any], dict[str, Any]]:
        """Map public arm → odom pose into eef-link → world position / xyzw quaternion tensors."""
        codec: BehaviorActionCodec = self._adapter._require_codec()
        robot = self._adapter.robot
        world_from_odom = self._adapter.world_from_odom
        positions: dict[str, Any] = {}
        quaternions: dict[str, Any] = {}
        for arm, pose in targets.items():
            native = codec.native_arm(arm)
            link = str(robot.eef_link_names[native])
            world = world_from_odom @ pose_to_matrix(pose)
            position, xyzw = _matrix_to_xyzw(world)
            positions[link] = _batched(position, self._batch_size)
            quaternions[link] = _batched(xyzw, self._batch_size)
        return positions, quaternions

    def _compute(
        self,
        targets: Mapping[str, Pose],
        *,
        embodiment: Any,
        attached: Mapping[str, Any] | None,
        ik_only: bool,
        initial_joint_pos: np.ndarray | None = None,
    ) -> tuple[np.ndarray | None, str | None]:
        """Run cuRobo once; return the full joint-space path (T, D) or a failure message."""
        generator, _ = self._generator_for()
        positions, quaternions = self._world_targets(targets)
        world_from_odom = self._adapter.world_from_odom
        goal_points = [
            (world_from_odom @ np.append(np.asarray(pose.position, dtype=np.float64), 1.0))[:3]
            for pose in targets.values()
        ]
        codec_for_arms: BehaviorActionCodec = self._adapter._require_codec()
        ignored = self._plan_exclusions(
            [codec_for_arms.native_arm(arm) for arm in targets], goal_points
        )
        try:
            generator.update_obstacles(ignore_objects=ignored or None)
            response = generator.compute_trajectories(
                target_pos=positions,
                target_quat=quaternions,
                initial_joint_pos=initial_joint_pos,
                is_local=False,
                max_attempts=math.ceil(MAX_PLANNING_ATTEMPTS / self._batch_size),
                timeout=PLAN_TIMEOUT_S,
                ik_fail_return=MAX_IK_FAILURES_BEFORE_RETURN,
                enable_finetune_trajopt=True,
                finetune_attempts=1,
                # IK-only answers are cuRobo IKResults without a status; full plans carry
                # MotionGenStatus, which tells reach (IK Fail) from a blocked path (TrajOpt Fail).
                return_full_result=not ik_only,
                success_ratio=1.0 / max(1, self._batch_size),
                attached_obj=attached,
                skip_obstacle_update=True,
                ik_only=ik_only,
                ik_world_collision_check=True,
                emb_sel=embodiment,
            )
        except Exception as exc:
            return None, f"cuRobo raised {type(exc).__name__}: {exc}"
        if ik_only:
            successes, paths = response
            flags = _to_numpy(successes).astype(bool).reshape(-1)
            outcome = {"status": "IK Fail"}
        else:
            flags, paths, outcome = _full_result_outcome(response)
        if not flags.any():
            ignored_names = ", ".join(str(getattr(obj, "name", obj)) for obj in ignored) or "none"
            status = str(outcome["status"])
            if "Start State" in status:
                # cuRobo says so itself: nothing plans from a configuration already in collision,
                # including a straight retreat, so the caller must servo out rather than replan.
                return None, (
                    "the arm's current configuration is in collision, so no plan is possible from "
                    "it; servo out with go_home(), or move_to_joints to a configuration you stored "
                    f"earlier, before planning again ({status}; ignored objects: {ignored_names})"
                )
            if self._start_in_collision(generator, embodiment):
                # Advisory only. The probe runs on cuRobo's default embodiment and does not see
                # this plan's exclusion list, so a correct pregrasp over the target can read as a
                # collision; seed 26 of picking_up_trash measured exactly that false positive.
                return None, (
                    f"cuRobo found no collision-free solution ({status}; ignored objects: "
                    f"{ignored_names}). A collision probe also flags the arm's current "
                    "configuration, which may be a false positive over the target: if a retreat "
                    "also fails to plan, servo out with go_home() rather than replanning"
                )
            return None, (
                f"cuRobo found no collision-free solution ({status}; "
                f"ignored objects: {ignored_names})"
            )
        index = int(np.argmax(flags))
        path = paths[index]
        try:
            try:
                trajectory = _to_cpu_float(
                    generator.path_to_joint_trajectory(path, get_full_js=True, emb_sel=embodiment)
                )
            except ValueError as exc:
                # cuRobo's IK solutions already carry the locked (torso) joints, so appending
                # them again is refused; the solution is then complete as it is.
                if not ik_only or "lock_joints" not in str(exc):
                    raise
                trajectory = _to_cpu_float(
                    generator.path_to_joint_trajectory(path, get_full_js=False, emb_sel=embodiment)
                )
            if not ik_only:
                trajectory = generator.add_linearly_interpolated_waypoints(
                    trajectory, max_inter_dist=WAYPOINT_INTERPOLATION_RAD
                )
        except Exception as exc:
            return None, f"cuRobo path conversion failed: {type(exc).__name__}: {exc}"
        array = _to_numpy(trajectory).astype(np.float64)
        if array.ndim == 1:
            array = array.reshape(1, -1)
        if array.ndim != 2 or array.size == 0 or not np.all(np.isfinite(array)):
            return None, "cuRobo returned an empty or non-finite trajectory"
        self.last_ignored_objects = [str(getattr(obj, "name", obj)) for obj in ignored]
        self.last_attached_objects = (
            [str(getattr(obj, "name", obj)) for obj in self._held_objects()] if attached else []
        )
        return array, None

    # ------------------------------------------------------------------ base planning
    def plan_base(self, x: float, y: float, yaw: float) -> tuple[list[np.ndarray], ApiError | None]:
        """Plan the holonomic base to a root-frame planar pose; waypoints are full joint vectors."""
        generator, embodiment = self._generator_for()
        from cap_harness.behavior.adapter import _planar_transform

        robot = self._adapter.robot
        world = self._adapter.world_from_root @ _planar_transform(x, y, yaw)
        # A planar base cannot change its height: the target keeps the footprint's current world
        # z (OmniGibson's own navigation does the same), or IK fails and no path is ever found.
        from cap_harness.behavior.adapter import _pose_matrix

        world[2, 3] = float(_pose_matrix(*robot.get_position_orientation())[2, 3])
        position, xyzw = _matrix_to_xyzw(world)
        link = str(robot.base_footprint_link_name)
        held = self._held_objects()
        attached: dict[str, Any] = {}
        for native in getattr(robot, "arm_names", ()):
            bundle = self._attached_object(str(native))
            if bundle:
                attached.update(bundle)
        try:
            generator.update_obstacles(ignore_objects=held or None)
            results = generator.compute_trajectories(
                target_pos={link: _batched(position, self._batch_size)},
                target_quat={link: _batched(xyzw, self._batch_size)},
                attached_obj=attached or None,
                is_local=False,
                max_attempts=math.ceil(MAX_PLANNING_ATTEMPTS / self._batch_size),
                timeout=PLAN_TIMEOUT_S,
                ik_fail_return=MAX_IK_FAILURES_BEFORE_RETURN,
                enable_finetune_trajopt=True,
                finetune_attempts=1,
                return_full_result=True,
                success_ratio=1.0 / max(1, self._batch_size),
                skip_obstacle_update=True,
                emb_sel=embodiment.BASE,
            )
            flags, paths, outcome = _full_result_outcome(results)
            if not flags.any():
                return [], ApiError(
                    ErrorCode.PLANNING_FAILED,
                    f"cuRobo found no base path ({outcome['status']})",
                    details=outcome,
                )
            trajectory = _to_cpu_float(
                generator.path_to_joint_trajectory(
                    paths[int(np.argmax(flags))], get_full_js=True, emb_sel=embodiment.BASE
                )
            )
            trajectory = generator.add_linearly_interpolated_waypoints(
                trajectory, max_inter_dist=WAYPOINT_INTERPOLATION_RAD
            )
        except Exception as exc:
            return [], ApiError(
                ErrorCode.PLANNING_FAILED,
                f"cuRobo base planning failed: {exc}",
                details={"exception_type": type(exc).__name__},
            )
        array = _to_numpy(trajectory).astype(np.float64)
        if array.ndim != 2 or array.size == 0 or not np.all(np.isfinite(array)):
            return [], ApiError(ErrorCode.PLANNING_FAILED, "cuRobo returned an invalid base path")
        return [row.copy() for row in array], None

    # ------------------------------------------------------------------ provider protocols
    def solve_ik(
        self, target_pose: Pose, robot_state: RobotState, *, arm: str = "primary"
    ) -> IKResult:
        arm = self._adapter.resolve_arm(arm)
        error = self._validate(robot_state, target_pose, arm)
        if error is not None:
            return IKResult(ok=False, arm=arm, error=error, embodiment=robot_state.embodiment)
        _, embodiment = self._generator_for()
        codec: BehaviorActionCodec = self._adapter._require_codec()
        native = codec.native_arm(arm)
        # `CapApi.solve_ik` substitutes any caller-supplied seed into the robot state's arm
        # joints, so the seed arrives here as `robot_state`. Build cuRobo's start configuration
        # from the live robot and overwrite this arm with it; without this the seed is ignored and
        # the returned solution can sit a radian away on a different IK branch.
        seed = _to_numpy(self._adapter.robot.get_joint_positions()).astype(np.float64).copy()
        seed = codec.apply_arm(
            seed, arm, np.asarray(robot_state.joint_positions[arm], dtype=np.float64)
        )
        path, failure = self._compute(
            {arm: target_pose},
            embodiment=embodiment.ARM,
            attached=self._attached_object(native),
            ik_only=True,
            initial_joint_pos=_batched(seed, self._batch_size),
        )
        if path is None:
            return IKResult(
                ok=False,
                arm=arm,
                embodiment=robot_state.embodiment,
                error=ApiError(
                    ErrorCode.IK_FAILED, failure or "IK failed", details={"provider": PLANNER_NAME}
                ),
            )
        joints = codec.arm_joints(path[-1], arm)
        return IKResult(
            ok=True,
            joint_positions=joints,
            arm=arm,
            embodiment=robot_state.embodiment,
            diagnostics={"provider": PLANNER_NAME, "collision_aware": True},
        )

    def plan_to_joints(
        self,
        robot_state: RobotState,
        target_joints: np.ndarray,
        *,
        arm: str = "primary",
        gripper_position: float | None = None,
        scene: PlanningScene | None = None,
        context: RobotPlanningContext | None = None,
        time_dilation_factor: float | None = None,
        interpolation_dt_s: float | None = None,
        maximum_trajectory_dt_s: float | None = None,
    ) -> PlanResult:
        arm = self._adapter.resolve_arm(arm)
        error = self._validate(robot_state, np.asarray(target_joints, dtype=np.float64), arm)
        if error is not None:
            return PlanResult(ok=False, error=error)
        # Joint goals are planned as a pose goal at the target configuration's forward kinematics
        # is not available here, so drive a straight joint-space interpolation that cuRobo checks
        # for collisions; the sim executes it at the control rate.
        start = robot_state.joint_positions[arm]
        goal = np.asarray(target_joints, dtype=np.float64)
        steps = max(2, int(np.ceil(np.max(np.abs(goal - start)) / WAYPOINT_INTERPOLATION_RAD)) + 1)
        waypoints = np.linspace(start, goal, steps)
        collision_free, message = self._check_arm_path(waypoints, arm)
        if not collision_free:
            return PlanResult(
                ok=False,
                error=ApiError(
                    ErrorCode.PLANNING_FAILED, message, details={"provider": PLANNER_NAME}
                ),
            )
        return PlanResult(
            ok=True,
            trajectory=self._trajectory(robot_state, waypoints, arm, gripper_position, "cspace"),
            diagnostics={"provider": PLANNER_NAME, "planning_mode": "cspace", "waypoints": steps},
        )

    def _check_arm_path(self, waypoints: np.ndarray, arm: str) -> tuple[bool, str]:
        generator, _ = self._generator_for()
        codec: BehaviorActionCodec = self._adapter._require_codec()
        try:
            current = _to_numpy(self._adapter.robot.get_joint_positions()).astype(np.float64)
            full = np.repeat(current[None, :], len(waypoints), axis=0)
            full[:, self._adapter.layout.arms[codec.native_arm(arm)]] = waypoints
            generator.update_obstacles()
            collisions = generator.check_collisions(_tensor(full), skip_obstacle_update=True)
            flags = _to_numpy(collisions).astype(bool).reshape(-1)
        except Exception as exc:
            return False, f"cuRobo collision check failed: {type(exc).__name__}: {exc}"
        if flags.any():
            return (
                False,
                f"joint-space path collides at {int(flags.sum())} of {len(flags)} waypoints",
            )
        return True, ""

    def plan_to_pose(
        self,
        robot_state: RobotState,
        target_pose: Pose,
        *,
        arm: str = "primary",
        gripper_position: float | None = None,
        scene: PlanningScene | None = None,
        context: RobotPlanningContext | None = None,
        time_dilation_factor: float | None = None,
        interpolation_dt_s: float | None = None,
        maximum_trajectory_dt_s: float | None = None,
    ) -> PlanResult:
        arm = self._adapter.resolve_arm(arm)
        error = self._validate(robot_state, target_pose, arm)
        if error is not None:
            return PlanResult(ok=False, error=error)
        _, embodiment = self._generator_for()
        codec: BehaviorActionCodec = self._adapter._require_codec()
        native = codec.native_arm(arm)
        path, failure = self._compute(
            {arm: target_pose},
            embodiment=embodiment.ARM,
            attached=self._attached_object(native),
            ik_only=False,
        )
        if path is None:
            return PlanResult(
                ok=False,
                error=ApiError(
                    ErrorCode.PLANNING_FAILED,
                    failure or "planning failed",
                    details={"provider": PLANNER_NAME},
                ),
            )
        waypoints = np.stack([codec.arm_joints(row, arm) for row in path])
        return PlanResult(
            ok=True,
            trajectory=self._trajectory(
                robot_state, waypoints, arm, gripper_position, "pose", full_path=path
            ),
            diagnostics={
                "provider": PLANNER_NAME,
                "planning_mode": "pose",
                "waypoints": int(len(waypoints)),
                "time_dilation_factor": time_dilation_factor,
                "ignored_objects": tuple(self.last_ignored_objects),
                "attached_objects": tuple(self.last_attached_objects),
            },
        )

    def plan_synchronized_motion(
        self,
        robot_state: RobotState,
        targets: Mapping[str, Pose],
        *,
        gripper_positions: Mapping[str, float] | None = None,
        scene: PlanningScene | None = None,
        context: RobotPlanningContext | None = None,
        time_dilation_factor: float | None = None,
        interpolation_dt_s: float | None = None,
        maximum_trajectory_dt_s: float | None = None,
    ) -> SynchronizedPlanResult:
        resolved = {self._adapter.resolve_arm(arm): pose for arm, pose in targets.items()}
        if set(resolved) != set(robot_state.arms):
            return SynchronizedPlanResult(
                ok=False,
                error=ApiError(ErrorCode.INVALID_REQUEST, "targets must name every robot arm"),
            )
        for arm, pose in resolved.items():
            if not isinstance(pose, Pose):
                return SynchronizedPlanResult(
                    ok=False,
                    error=ApiError(
                        ErrorCode.UNSUPPORTED, "synchronized planning requires pose targets"
                    ),
                )
            error = self._validate(robot_state, pose, arm)
            if error is not None:
                return SynchronizedPlanResult(ok=False, error=error)
        _, embodiment = self._generator_for()
        codec: BehaviorActionCodec = self._adapter._require_codec()
        attached: dict[str, Any] = {}
        for arm in resolved:
            held = self._attached_object(codec.native_arm(arm))
            if held:
                attached.update(held)
        path, failure = self._compute(
            resolved, embodiment=embodiment.ARM, attached=attached or None, ik_only=False
        )
        if path is None:
            return SynchronizedPlanResult(
                ok=False,
                error=ApiError(
                    ErrorCode.PLANNING_FAILED,
                    failure or "planning failed",
                    details={"provider": PLANNER_NAME},
                ),
            )
        positions = {
            arm: np.stack([codec.arm_joints(row, arm) for row in path]) for arm in resolved
        }
        grippers = gripper_positions or robot_state.gripper_positions
        count = len(path)
        self._remember_full_path(positions, path)
        trajectory = SynchronizedTrajectory(
            joint_positions=positions,
            dt_s=self._adapter.control_period_s,
            joint_names={arm: robot_state.joint_names[arm] for arm in resolved},
            planner=PLANNER_NAME,
            collision_aware=True,
            expected_start=robot_state,
            gripper_positions={arm: np.full(count, float(grippers[arm])) for arm in resolved},
            embodiment=robot_state.embodiment,
        )
        return SynchronizedPlanResult(
            ok=True,
            trajectory=trajectory,
            diagnostics={
                "provider": PLANNER_NAME,
                "waypoints": count,
                "ignored_objects": tuple(self.last_ignored_objects),
                "attached_objects": tuple(self.last_attached_objects),
            },
        )

    # ------------------------------------------------------------------ helpers
    @staticmethod
    def _path_key(positions: Mapping[str, np.ndarray]) -> bytes:
        return b"".join(
            np.ascontiguousarray(positions[arm], dtype=np.float64).tobytes()
            for arm in sorted(positions)
        )

    def _remember_full_path(self, positions: Mapping[str, np.ndarray], path: np.ndarray) -> None:
        """Keep the full 28-DoF path behind an arm-only trajectory so execution can move the torso."""
        self._full_paths[self._path_key(positions)] = np.asarray(path, dtype=np.float64).copy()
        while len(self._full_paths) > FULL_PATH_MEMORY:
            self._full_paths.popitem(last=False)

    def full_path_for(self, trajectory: Trajectory | SynchronizedTrajectory) -> np.ndarray | None:
        """The full joint-space path this planner produced for ``trajectory``, if it is one of ours."""
        if isinstance(trajectory, Trajectory):
            positions = {trajectory.arm: trajectory.joint_positions}
        else:
            positions = dict(trajectory.joint_positions)
        return self._full_paths.get(self._path_key(positions))

    def _trajectory(
        self,
        robot_state: RobotState,
        waypoints: np.ndarray,
        arm: str,
        gripper_position: float | None,
        mode: str,
        full_path: np.ndarray | None = None,
    ) -> Trajectory:
        gripper = robot_state.gripper_positions[arm]
        if gripper_position is not None:
            gripper = float(gripper_position)
        waypoints = np.asarray(waypoints, dtype=np.float64)
        if full_path is not None:
            self._remember_full_path({arm: waypoints}, full_path)
        return Trajectory(
            joint_positions=np.asarray(waypoints, dtype=np.float64),
            dt_s=self._adapter.control_period_s,
            joint_names=robot_state.joint_names[arm],
            planner=f"{PLANNER_NAME}_{mode}",
            collision_aware=True,
            expected_start=robot_state,
            arm=arm,
            gripper_positions=np.full(len(waypoints), gripper),
            embodiment=robot_state.embodiment,
        )

    @staticmethod
    def _validate(state: RobotState, target: Pose | np.ndarray, arm: str) -> ApiError | None:
        if not isinstance(state, RobotState):
            return ApiError(ErrorCode.INVALID_REQUEST, "robot_state is invalid")
        if arm not in state.joint_positions:
            return ApiError(ErrorCode.NOT_FOUND, f"unknown arm {arm!r}")
        if isinstance(target, Pose):
            if target.frame != state.base_frame:
                return ApiError(
                    ErrorCode.INVALID_REQUEST, "target pose and robot state frames do not match"
                )
            return None
        joints = np.asarray(target, dtype=np.float64)
        if joints.shape != (7,) or not np.all(np.isfinite(joints)):
            return ApiError(ErrorCode.INVALID_REQUEST, "joint target must contain 7 finite values")
        return None


__all__ = ["PLANNER_NAME", "OmniGibsonCuroboPlanner"]
````

## src/cap_harness/yam_real/adapter.py

````text
"""``EnvironmentAdapter`` for the real bimanual YAM.

Deliberately thin: normalize, delegate, never actuate. Every motion routes to
``env.execute_action_batch``, the single chokepoint the plant exposes, so this
surface and any other driving the same station produce comparable command
streams.

**The motion interlock.** Construction, observation and state reads always work.
Anything that can command the arms is refused unless ``allow_physical_motion``
was explicitly set, and refused *before* any RPC is issued -- the gate precedes
payload construction and transport, so an unauthorized call leaves no trace on
the wire. ``command_rpc_count`` counts commands actually submitted, never
attempted, which makes it usable as evidence rather than as a hint.

This is a client-side safeguard for a harness that runs model-generated code. It
is not a safety system: it does not replace the hardware E-stop, the arm
server's watchdog, or a human watching the robot. It stops this process from
commanding motion by accident; it cannot stop a robot that is already moving.
"""

from __future__ import annotations

from collections.abc import Mapping
from pathlib import Path
from typing import Any

import numpy as np

from cap_harness.contracts import (
    ArmCommand,
    ExecutionResult,
    Observation,
    RobotAction,
    RobotPlanningContext,
    RobotState,
    StepResult,
    SynchronizedTrajectory,
    TaskContext,
    Trajectory,
)
from cap_harness.errors import ApiError, ErrorCode
from cap_harness.yam_real import codec
from cap_harness.yam_real.action import YamActionBatch
from cap_harness.yam_real.registry import YamRealTaskMetadata, YamRealTaskRegistry

ARMS = codec.ARMS
ARM_DOF = codec.ARM_DOF

#: Held at the final waypoint after a trajectory is streamed, so a
#: position-controlled arm has time to close the following error it accumulated.
TRAJECTORY_SETTLE_S = 1.0

#: How close every joint must be to its last commanded waypoint for a motion to
#: count as executed. This is a following-error budget, not a precision claim: a
#: position-controlled joint settles a few hundredths of a radian short and that
#: is normal. The failure it exists to catch was an arm that stopped a quarter of
#: the way through its trajectory and reported success, so the threshold sits
#: well above servo error and well below a missed motion.
TRAJECTORY_JOINT_TOLERANCE_RAD = 0.10

#: Joint speed a homing move is scheduled at, rad/s. The interpolation is linear
#: with no acceleration limit, so this is both the average and the peak rate --
#: keep it gentle. 0.35 rad/s takes a full 1.4 rad sweep across the table in
#: about four seconds and a small correction in well under one.
HOMING_JOINT_SPEED_RAD_S = 0.35

#: Bounds on the scheduled window. The floor stops a tiny correction becoming a
#: step command; the ceiling stops a pathological start state parking the arm in
#: a minutes-long crawl.
MINIMUM_HOMING_S = 1.5
MAXIMUM_HOMING_S = 8.0
HOME_DIAGNOSTIC_TOLERANCE_RAD = 0.03


class YamRealAdapter:
    """Protocol-facing wrapper over a YAM station."""

    embodiment = codec.EMBODIMENT
    registry_prefix = "yam_real"

    def __init__(
        self,
        env: Any,
        *,
        registry: YamRealTaskRegistry | None = None,
        task_context: TaskContext | None = None,
        allow_physical_motion: bool = False,
        run_observer: object | None = None,
    ) -> None:
        self._env = env
        self._registry = registry or YamRealTaskRegistry()
        self._task_context = task_context
        self._allow_physical_motion = bool(allow_physical_motion)
        self._run_observer = run_observer
        self._command_rpc_count = 0
        self._closed = False
        self._episode_recorder: Any = None
        controller = env.config.controller
        self.control_frequency = controller.control_frequency_hz
        self.control_period_s = 1.0 / controller.control_frequency_hz

    # -- identity ----------------------------------------------------------

    @property
    def native_env(self) -> Any:
        """The plant, mirroring the simulator adapters' ``native_env``."""
        return self._env

    @property
    def arms(self) -> tuple[str, ...]:
        return ARMS

    def resolve_arm(self, arm: str) -> str:
        """This station's own name for the arm a caller asked for.

        ``left`` and ``right`` are the real arms and pass through untouched.
        The shared API's ``primary``/``secondary`` are resolved through the
        profile's ``arm_aliases``, which is the whole point of that field --
        until now it was validated on load, asserted in a test, and read by
        nothing, so every shared default failed on this embodiment.

        The mapping is deliberately data rather than a constant here. Which
        physical arm is "primary" depends on how a bench is rigged and what it
        faces; yam-example declares ``primary: right``, and a station that reaches its
        work with the left arm would say so in its own profile without a code
        change.

        An unknown name is returned unchanged so it fails in the caller's own
        terms -- a wrong arm key should read as "no arm 'wrist'", not as a
        resolver error.
        """
        name = str(arm)
        if name in ARMS:
            return name
        return str(self._env.config.arm_aliases.get(name, name))

    @property
    def dof(self) -> int:
        return ARM_DOF

    @property
    def command_rpc_count(self) -> int:
        """Command RPCs actually submitted through this adapter."""
        return self._command_rpc_count

    @property
    def physical_motion_authorized(self) -> bool:
        return self._allow_physical_motion

    # -- the interlock -----------------------------------------------------

    def _motion_denied(self) -> ApiError | None:
        """The single gate. Every command path calls this first.

        Returns the typed refusal, or None when motion is authorized. Keeping it
        in one place means a new motion method that forgets to call it is a
        visible omission rather than a silent hole.
        """
        if self._allow_physical_motion:
            return None
        return ApiError(
            code=ErrorCode.SAFETY_INTERLOCK,
            message=(
                "physical motion is not authorized for this YAM adapter; "
                "construct it with allow_physical_motion=True (cap-harness run --allow-motion)"
            ),
            recoverable=False,
            details={"command_rpc_count": self._command_rpc_count},
        )

    # -- recording ---------------------------------------------------------

    def _commanded_action(
        self,
        targets: Mapping[str, Any] | None = None,
        gripper: Mapping[str, float] | None = None,
    ) -> RobotAction:
        """A ``RobotAction`` describing what was just commanded, for the recorder.

        ``targets`` are the joint positions actually sent to each arm, and
        ``gripper`` the widths. Both fall back to the MEASURED state only for
        arms the caller did not command -- an arm holding still while the other
        moves genuinely was commanded to where it is.

        Passing them is the whole point. This used to read the measured pose for
        every arm and record that as the action, so ``episode/steps.jsonl`` said
        the policy commanded exactly where the arm already was. On a
        position-controlled arm that lags its target by centimetres, an action
        stream built from measurements is not a weaker record of the policy --
        it is a record of a different policy, one that never asks for anything
        it has not already got. Trained on, it teaches the arm to stand still.

        The recorder's contract is per-``step``, and this plant does not step:
        it streams a whole batch through one RPC. So each command that reaches
        the plant is reported as one action carrying its final target, which
        gives the run one recorded frame per commanded motion rather than one
        per control period. That is coarser than a simulator's record and it is
        the honest shape for this embodiment.
        """
        state = codec.robot_state(self._env)
        return RobotAction(
            arms={
                side: ArmCommand(
                    mode="joint_position",
                    target=(
                        state.joint_positions[side]
                        if targets is None or targets.get(side) is None
                        else np.asarray(targets[side], dtype=np.float64).reshape(ARM_DOF)
                    ),
                    gripper_position=(
                        state.gripper_positions[side]
                        if gripper is None or gripper.get(side) is None
                        else gripper[side]
                    ),
                    embodiment=self.embodiment,
                )
                for side in ARMS
            }
            # No `embodiment=` here: RobotAction takes only `arms` and derives
            # the embodiment from the commands, which must all agree.
        )

    def _before_command(self) -> None:
        """Let the recorder enforce the step limit before anything is commanded."""
        if self._run_observer is not None:
            self._run_observer.before_step(self._commanded_action())

    def _record(
        self,
        result: object,
        gripper: Mapping[str, float] | None = None,
        targets: Mapping[str, Any] | None = None,
    ) -> None:
        """Hand the recorder the action and its outcome, so a frame is captured."""
        if self._run_observer is None:
            return
        action = self._commanded_action(targets, gripper)
        step = (
            result
            if isinstance(result, StepResult)
            else StepResult(
                ok=bool(getattr(result, "ok", False)),
                observation=getattr(result, "final_observation", None),
                error=getattr(result, "error", None) if not getattr(result, "ok", False) else None,
            )
        )
        self._run_observer.after_step(action, step)

    def _denied_step(self, error: ApiError) -> StepResult:
        return StepResult(ok=False, error=error)

    def _denied_execution(self, error: ApiError) -> ExecutionResult:
        return ExecutionResult(ok=False, steps_executed=0, error=error)

    def _plant_failure(self, exc: Exception, operation: str) -> ApiError:
        """Turn a refusal or fault from the plant into a typed failure.

        The arm servers validate what they are asked to do and raise across the
        RPC boundary when they refuse -- a target outside the joint limits, for
        instance. Letting that surface as a bare ``RuntimeError`` would end a
        generated program's run with a traceback instead of a result it could
        respond to, so it is classified here.
        """
        message = str(exc)
        code = (
            ErrorCode.INVALID_REQUEST
            if "outside the configured limits" in message or "must contain" in message
            else ErrorCode.EXECUTION_FAILED
        )
        return ApiError(
            code=code,
            message=f"{operation} rejected by the station: {message}",
            details={"command_rpc_count": self._command_rpc_count},
        )

    def _plant_refusal(self, result: Mapping[str, Any], operation: str) -> ApiError | None:
        """Typed failure for a plant that REPORTS a refusal instead of raising.

        The sibling of :meth:`_plant_failure`, which only covers the case where
        the RPC raises. A station that answers ``{"success": False, "reason":
        ...}`` took the other path, and every command here used to build its
        result as ``ok=bool(result["success"])`` with no ``error``.

        ``_validate_result_status`` rejects a failed result carrying no
        ``ApiError``, so that combination did not degrade -- it raised
        ``ValueError: a failed result must carry an ApiError`` out of the
        adapter, ending the run with a traceback. Which is the exact opposite of
        what this class documents: a refusal from the station should reach the
        program as something it can respond to.
        """
        if bool(result.get("success", True)):
            return None
        reason = str(result.get("reason", "")).strip() or "no reason given"
        return ApiError(
            code=ErrorCode.EXECUTION_FAILED,
            message=f"{operation} refused by the station: {reason}",
            details={"command_rpc_count": self._command_rpc_count, "reason": reason},
        )

    # -- lifecycle ---------------------------------------------------------

    def reset(self, task_ref: object = None, seed: int = 0) -> Observation:
        """Reset what can be reset on hardware, and be explicit about the rest.

        A physical station cannot be restored to a seeded state, so this does not
        pretend to. It performs the *robot* reset -- homing both arms -- and
        records the seed as provenance only. Scene reset is a physical act and
        belongs to a human or a task procedure; conflating the two would let a run
        proceed against an un-reset scene while reporting that it had reset.

        Homing is motion, so it goes through the same gate as everything else. An
        unauthorized reset observes and returns without commanding anything.
        """
        if isinstance(task_ref, TaskContext):
            self._task_context = task_ref
        elif isinstance(task_ref, YamRealTaskMetadata):
            self._task_context = TaskContext(
                suite=task_ref.suite_name,
                task_id=task_ref.task_id,
                task_name=task_ref.task_name,
                language=task_ref.language,
                family=task_ref.family,
                metadata={
                    "scene_reset": task_ref.scene_reset,
                    "seed": int(seed),
                    "station": self._env.config.station,
                    "calibration_bundle": self._env.config.calibration.bundle_id,
                },
            )
        elif task_ref is not None:
            self._task_context = self._task_context_for(self._registry.resolve(task_ref), seed)

        if self._motion_denied() is None:
            # Home, the mechanical zero. It is the calibration reference, so a run
            # that starts here starts somewhere the profile actually defines,
            # rather than at a second pose that has to be kept correct alongside
            # it. Both plan; cuRobo solves IK from either.
            #
            # This was `go_ready` until it turned out that the ready pose parks
            # the forearm at z 1.23, inside the band where the camera sees arm
            # hardware the URDF does not model. Home keeps the highest link at
            # z 0.95, below that band entirely.
            self._env.go_home(duration_s=4.0, keep_grippers=False)
            self._command_rpc_count += 1
        observation = self.get_observation()
        # Opens the recorded episode: writes reset.json and captures frame 0 of
        # every camera. Without it a recorded run has no video at all, because
        # every later frame is written from `after_step`.
        if self._run_observer is not None:
            metadata = {} if self._task_context is None else dict(self._task_context.metadata or {})
            metadata.update(
                {
                    "embodiment": self.embodiment,
                    "station": self._env.config.station,
                    "physical_motion_authorized": self._allow_physical_motion,
                }
            )
            self._run_observer.on_reset(observation, metadata)
        self._start_episode_recording()
        return observation

    # -- episode recording -------------------------------------------------

    def _start_episode_recording(self) -> None:
        """Begin sampling the plant at 30 Hz into the run's episode directory.

        Separate from ``_run_observer``, and deliberately so. The harness
        recorder writes one frame per commanded action, which is the right
        granularity for a trace but produces a slideshow for video: a real run
        logged 9 frames over several minutes because a 2.8 s descent is one
        command. This samples on its own clock, so the trajectory between
        commands is captured too.

        Needs somewhere to write, so it is skipped when the adapter has no run
        observer -- an ad-hoc adapter built in a script records nothing rather
        than scattering episode directories.
        """
        root = getattr(self._run_observer, "root", None)
        if root is None:
            return
        self.finish_episode_recording()
        from .recorder import YamEpisodeRecorder

        task = "" if self._task_context is None else str(self._task_context.task_name or "")
        recorder = YamEpisodeRecorder(
            Path(root) / "episode" / "raw",
            # media/videos is where every embodiment's video lives; on this one
            # it is written here rather than from recorded steps.
            video_dir=Path(root) / "media" / "videos",
            fps=round(self.control_frequency),
            cameras=None if getattr(self._run_observer, "capture_videos", True) else (),
            task=task,
        )
        try:
            recorder.start(
                self._env,
                meta={
                    "station": self._env.config.station,
                    "calibration_bundle": self._env.config.calibration.bundle_id,
                    "physical_motion_authorized": self._allow_physical_motion,
                },
            )
        except Exception:
            return
        self._episode_recorder = recorder

    def finish_episode_recording(self) -> None:
        """Stop the sampler and write the episode. Safe when none is running.

        Public because the run teardown calls it BEFORE artifacts are sealed:
        the arrays are written here, and the manifest hashes what exists when it
        is built. Left to ``close`` -- which for this embodiment runs after
        recording, so the camera threads survive -- the episode would land
        unlisted next to a manifest that had already been written.
        """
        recorder = self._episode_recorder
        self._episode_recorder = None
        if recorder is None:
            return
        try:
            recorder.finalize()
        except Exception:
            pass

    def _task_context_for(self, metadata: YamRealTaskMetadata, seed: int) -> TaskContext:
        return TaskContext(
            suite=metadata.suite_name,
            task_id=metadata.task_id,
            task_name=metadata.task_name,
            language=metadata.language,
            family=metadata.family,
            metadata={
                "scene_reset": metadata.scene_reset,
                "seed": int(seed),
                "station": self._env.config.station,
                "calibration_bundle": self._env.config.calibration.bundle_id,
            },
        )

    def close(self) -> None:
        """Close the client side. Never stops the arm servers."""
        if self._closed:
            return
        self._closed = True
        self.finish_episode_recording()
        self._env.close()

    # -- observation -------------------------------------------------------

    def get_task_context(self) -> TaskContext:
        if self._task_context is None:
            raise RuntimeError("no task context set; pass one to the adapter or to reset()")
        return self._task_context

    def get_observation(self) -> Observation:
        return codec.observation(self._env, task_context=self._task_context)

    def get_robot_state(self) -> RobotState:
        return codec.robot_state(self._env)

    def check_success(self) -> bool:
        """No task success predicate exists on hardware.

        Returning False is not a claim that the task failed; it is a statement
        that this embodiment cannot tell. A recorded run reports how it
        terminated, and success is judged from the video by whoever ran it.
        """
        return False

    # -- actuation ---------------------------------------------------------

    def _submit(
        self,
        joints: Mapping[str, np.ndarray],
        grippers: Mapping[str, float | None],
        *,
        duration_s: float,
        source: str,
    ) -> dict[str, Any]:
        """Build one action batch and push it through the plant's chokepoint."""
        state = codec.robot_state(self._env)
        # "Hold where you are" is built from the MEASURED pose, and a measured
        # pose can sit outside the commandable range -- an arm resting against a
        # limit sags a little past it. Commanding that verbatim is rejected by
        # the station, which would wedge the robot: an arm that drifted out of
        # range could never be commanded again, not even to move back in. Only
        # the derived hold target is clamped; a caller's own target is passed
        # through untouched and refused if it is genuinely out of range.
        config = self._env.config
        held = {
            side: np.clip(
                np.asarray(state.joint_positions[side], dtype=np.float64).reshape(ARM_DOF),
                config.joint_limits_lower,
                config.joint_limits_upper,
            )
            for side in ARMS
        }
        held_grip = {side: float(state.gripper_positions[side]) for side in ARMS}
        targets = {side: joints.get(side, held[side]) for side in ARMS}
        grips = {
            side: held_grip[side] if grippers.get(side) is None else float(grippers[side])
            for side in ARMS
        }
        batch = YamActionBatch.joint_abs(
            [0.0, max(1e-3, float(duration_s))],
            [held["left"], targets["left"]],
            [held["right"], targets["right"]],
            [[held_grip["left"]], [grips["left"]]],
            [[held_grip["right"]], [grips["right"]]],
            source=source,
        )
        result = self._env.execute_action_batch(batch)
        self._command_rpc_count += 1
        return result

    def step(self, action: RobotAction) -> StepResult:
        denied = self._motion_denied()
        if denied is not None:
            return self._denied_step(denied)
        joints, grippers = codec.arm_command_targets(action)
        # ``RobotAction`` does not constrain its arm keys -- it has no start state
        # to check them against -- so a mistyped arm arrives here looking valid.
        # Without this, the unknown entry is dropped, both arms hold their current
        # position, and the step reports success having moved nothing.
        unknown = set(joints) - set(ARMS)
        if unknown:
            return self._denied_step(
                ApiError(
                    code=ErrorCode.INVALID_REQUEST,
                    message=f"action names unknown YAM arms: {sorted(unknown)}",
                    details={"known_arms": list(ARMS)},
                )
            )
        self._before_command()
        try:
            result = self._submit(
                joints, grippers, duration_s=self.control_period_s, source="harness_step"
            )
        except Exception as exc:
            denied = self._denied_step(self._plant_failure(exc, "step"))
            self._record(denied)
            return denied
        step = StepResult(
            ok=bool(result.get("success", True)),
            error=self._plant_refusal(result, "step"),
            observation=self.get_observation(),
            diagnostics={
                "reason": str(result.get("reason", "")),
                "command_rpc_count": self._command_rpc_count,
            },
        )
        self._record(step, gripper=grippers, targets=joints)
        return step

    def execute_trajectory(
        self, trajectory: Trajectory | SynchronizedTrajectory
    ) -> ExecutionResult:
        """Execute a joint trajectory through the level-1 controller.

        Two checks that ``yam_sim`` makes are deliberately absent here.

        **Embodiment** is not re-checked because it cannot fail. Both
        ``Trajectory`` and ``SynchronizedTrajectory`` already require
        ``expected_start.embodiment`` to equal their own, so a trajectory built
        against this adapter's state is a ``yam_real`` trajectory by
        construction. Repeating the test here would be unreachable code that
        reads like a live guard.

        **dt_s** is not required to equal the control period, which is where
        this genuinely differs from ``yam_sim`` rather than merely omitting
        something. Level 1 resamples waypoints against the wall clock, so a
        trajectory takes the duration it claims however many waypoints express
        it. Both working pick programs depend on that: they step at 1/10 s
        against a 1/30 s control period, because at 1/30 the descent ran at
        14 cm/s and the arm finished 2.7 cm short of its target.
        """
        denied = self._motion_denied()
        if denied is not None:
            return self._denied_execution(denied)

        if isinstance(trajectory, Trajectory):
            per_arm = {trajectory.arm: np.asarray(trajectory.joint_positions, dtype=np.float64)}
            per_arm_grippers = (
                {}
                if trajectory.gripper_positions is None
                else {trajectory.arm: np.asarray(trajectory.gripper_positions, dtype=np.float64)}
            )
        else:
            per_arm = {
                side: np.asarray(value, dtype=np.float64)
                for side, value in trajectory.joint_positions.items()
            }
            per_arm_grippers = (
                {}
                if trajectory.gripper_positions is None
                else {
                    side: np.asarray(value, dtype=np.float64)
                    for side, value in trajectory.gripper_positions.items()
                }
            )
        # No arm-key check here, unlike ``step``: both trajectory contracts
        # validate their arms against ``expected_start``, so an unknown arm cannot
        # reach this point. ``RobotAction`` has no such start state, which is why
        # ``step`` must check.

        dt_s = float(trajectory.dt_s)
        state = codec.robot_state(self._env)
        steps = max(len(value) for value in per_arm.values())
        timestamps = [index * dt_s for index in range(steps)]

        def rows(side: str) -> np.ndarray:
            if side in per_arm:
                return per_arm[side][:, :ARM_DOF]
            held = np.asarray(state.joint_positions[side], dtype=np.float64).reshape(ARM_DOF)
            return np.tile(held, (steps, 1))

        held_grip = {side: float(state.gripper_positions[side]) for side in ARMS}

        def gripper_rows(side: str) -> list[list[float]]:
            """The trajectory's own gripper column, or the held width if it has none.

            The *command* has to survive, not the measurement. During a successful
            grasp the two deliberately differ: fingers stalled on an object read
            wider than they were told to close to -- commanding 0.12 on this
            station reads back around 0.36. Substituting the measurement here
            re-commands that wider value and releases the squeeze, which shows up
            as the object not rising and reads like a grasp or planning fault.
            """
            if side not in per_arm_grippers:
                return [[held_grip[side]]] * steps
            # Length is not re-checked: both trajectory contracts validate the
            # gripper column against the waypoint count in ``__post_init__``, and
            # a synchronized trajectory additionally requires every arm to be the
            # same length, so ``steps`` cannot disagree with it here.
            return [[float(value)] for value in per_arm_grippers[side].reshape(-1)]

        batch = YamActionBatch.joint_abs(
            timestamps,
            rows("left"),
            rows("right"),
            gripper_rows("left"),
            gripper_rows("right"),
            source="harness_trajectory",
        )
        self._before_command()
        try:
            result = self._env.execute_action_batch(batch, settle_s=TRAJECTORY_SETTLE_S)
        except Exception as exc:
            denied = self._denied_execution(self._plant_failure(exc, "trajectory"))
            self._record(denied)
            return denied
        self._command_rpc_count += 1
        ok = bool(result.get("success", True))

        # ``success`` from the batch means the commands were streamed, not that
        # the arm arrived. A position-controlled arm lags a fast trajectory, so a
        # batch can end with the arm still well behind its last target. Settling
        # holds the final waypoint; this checks that holding it was enough.
        reached = codec.robot_state(self._env)
        residuals = {
            side: float(
                np.max(
                    np.abs(
                        np.asarray(reached.joint_positions[side], dtype=np.float64).reshape(ARM_DOF)
                        - np.asarray(value[-1], dtype=np.float64).reshape(ARM_DOF)
                    )
                )
            )
            for side, value in per_arm.items()
        }
        worst_arm = max(residuals, key=residuals.get) if residuals else None
        worst = residuals.get(worst_arm, 0.0) if worst_arm else 0.0
        # A plant that REPORTED a refusal first: without this the result is
        # ok=False with error=None, because the tracking check below only fires
        # when ok is still True, and a failed result carrying no ApiError raises
        # out of the adapter instead of reaching the program.
        error = self._plant_refusal(result, "execute_trajectory")
        if ok and worst > TRAJECTORY_JOINT_TOLERANCE_RAD:
            ok = False
            error = ApiError(
                code=ErrorCode.EXECUTION_FAILED,
                message=(
                    f"trajectory ended {worst:.3f} rad from its final waypoint on the "
                    f"{worst_arm} arm (tolerance {TRAJECTORY_JOINT_TOLERANCE_RAD:.3f} rad); "
                    "the arm did not track the commanded motion"
                ),
                details={"joint_residual_rad": residuals},
            )

        execution = ExecutionResult(
            ok=ok,
            steps_executed=int(result.get("command_count", steps)),
            final_observation=self.get_observation(),
            error=error,
            diagnostics={
                "reason": str(result.get("reason", "")),
                "joint_residual_rad": residuals,
                "command_rpc_count": self._command_rpc_count,
            },
        )
        # The trajectory's FINAL waypoint is what this batch asked the arms to
        # reach, so that is the action. `per_arm` holds only the arms the
        # trajectory named; anything else falls back to its measured pose in
        # `_commanded_action`, which is correct -- an arm this batch did not
        # address was commanded to hold where it is.
        final_targets = {side: value[-1] for side, value in per_arm.items()}
        commanded_gripper = {
            side: float(np.asarray(value, dtype=np.float64).reshape(-1)[-1])
            for side, value in per_arm_grippers.items()
            if np.asarray(value).size
        }
        self._record(execution, gripper=commanded_gripper, targets=final_targets)
        return execution

    def set_gripper(self, position: float, *, arm: str = "left") -> ExecutionResult:
        denied = self._motion_denied()
        if denied is not None:
            return self._denied_execution(denied)
        self._before_command()
        try:
            result = self._env.set_gripper(str(arm), float(position))
        except Exception as exc:
            denied = self._denied_execution(self._plant_failure(exc, "set_gripper"))
            self._record(denied)
            return denied
        self._command_rpc_count += 1
        execution = ExecutionResult(
            ok=bool(result.get("success", True)),
            error=self._plant_refusal(result, "set_gripper"),
            steps_executed=1,
            final_observation=self.get_observation(),
            diagnostics={
                "reason": str(result.get("reason", "")),
                "command_rpc_count": self._command_rpc_count,
            },
        )
        # The width is the command. Joints were not addressed, so they fall
        # back to measured, which is exactly what holding means here.
        self._record(execution, gripper={self.resolve_arm(arm): float(position)})
        return execution

    def set_grippers(self, positions: Mapping[str, float]) -> ExecutionResult:
        """Set both grippers, returning the first failure rather than continuing."""
        denied = self._motion_denied()
        if denied is not None:
            return self._denied_execution(denied)
        steps = 0
        for arm, position in positions.items():
            result = self.set_gripper(float(position), arm=str(arm))
            steps += int(result.steps_executed)
            if not result.ok:
                return ExecutionResult(
                    ok=False,
                    steps_executed=steps,
                    final_observation=result.final_observation,
                    error=result.error,
                )
        return ExecutionResult(
            ok=True, steps_executed=steps, final_observation=self.get_observation()
        )

    def _homing_duration_s(self) -> float:
        """Schedule the homing window from the largest joint the move must turn."""
        state = codec.robot_state(self._env)
        config = self._env.config
        worst = 0.0
        for side in ARMS:
            measured = np.asarray(state.joint_positions[side], dtype=np.float64).reshape(ARM_DOF)
            home = np.asarray(config.arms[side].home_joints, dtype=np.float64).reshape(ARM_DOF)
            worst = max(worst, float(np.max(np.abs(measured - home))))
        seconds = worst / HOMING_JOINT_SPEED_RAD_S
        return float(min(MAXIMUM_HOMING_S, max(MINIMUM_HOMING_S, seconds)))

    def go_home(self, *, arm: str = "both", duration: float | None = None) -> ExecutionResult:
        """Home through the plant's own primitive rather than a settling loop.

        Both arms move together because that is what the primitive does: home is
        a whole-robot pose here, and homing one arm while the other stays put is
        not a state the profile describes. ``arm`` is accepted for signature
        compatibility with the shared API and deliberately ignored.

        ``duration`` defaults to **scaled by how far the arms actually have to
        travel** rather than to a fixed number. A fixed 3 s made a 0.02 rad
        correction and a 1.5 rad sweep across the table take exactly as long,
        which meant the sweep ran at roughly seventy times the joint speed of the
        correction and looked and sounded like it. Distance-scaling keeps the
        peak joint rate roughly constant instead.

        The underlying interpolation is linear in joint space (``controller.py``
        ramps ``(1-alpha) * start + alpha * target`` over the window), so there is
        no acceleration limiting -- velocity steps from zero at both ends. Giving
        a long move a proportionally longer window is what keeps that step small.
        Pass an explicit ``duration`` to override.
        """
        denied = self._motion_denied()
        if denied is not None:
            return self._denied_execution(denied)
        seconds = self._homing_duration_s() if duration is None else float(duration)
        self._before_command()
        try:
            result = self._env.go_home(duration_s=seconds)
        except Exception as exc:
            denied = self._denied_execution(self._plant_failure(exc, "go_home"))
            self._record(denied)
            return denied
        self._command_rpc_count += 1
        observation = self.get_observation()
        residuals = {
            side: float(
                np.max(
                    np.abs(
                        observation.robot_state.joint_positions[side]
                        - self._env.config.arms[side].home_joints
                    )
                )
            )
            for side in ARMS
        }
        execution = ExecutionResult(
            ok=bool(result.get("success", True)),
            error=self._plant_refusal(result, "go_home"),
            steps_executed=int(result.get("command_count", 1)),
            final_observation=observation,
            diagnostics={
                "source": str(result.get("source", "cap_home")),
                "joint_residual_rad": residuals,
                "home_tolerance_rad": HOME_DIAGNOSTIC_TOLERANCE_RAD,
                "home_verified": max(residuals.values()) <= HOME_DIAGNOSTIC_TOLERANCE_RAD,
                "grippers_open": {
                    side: float(observation.robot_state.gripper_positions[side]) >= 0.95
                    for side in ARMS
                },
                # `seconds`, not `duration`: the argument is None on the default
                # path, so float(duration) raised TypeError *after* the arms had
                # already moved, outside the try above. Reporting the value
                # actually commanded is also the correct diagnostic -- with
                # distance-scaling the two differ by design.
                "duration_s": seconds,
                "requested_arm": str(arm),
                "command_rpc_count": self._command_rpc_count,
            },
        )
        # Homing commands the profile's home pose on both arms, so that is the
        # action -- not wherever the arms ended up, which is the same distinction
        # every other path here now makes.
        self._record(
            execution,
            targets={side: self._env.config.arms[side].home_joints for side in ARMS},
        )
        return execution

    # -- planning and metadata --------------------------------------------

    def get_planning_context(self) -> RobotPlanningContext:
        """Describe YAM to the planners instead of letting them guess.

        The shared fallback infers a model from arm count -- two arms means dual
        Panda -- which sends YAM requests to a 7-DOF model that rejects them
        before planning starts. YAM is 6-DOF with its own grasp frames, so the
        embodiment states that itself through the hook provided for it.
        """
        config = self._env.config
        return RobotPlanningContext(
            embodiment=self.embodiment,
            # Must match a model the cuRobo service registers. The YAM Sim
            # description is a single arm, so it cannot represent this station's
            # second arm -- and arm-to-arm collision is what a bimanual planner
            # is for. `yam_real` selects the dual-arm description.
            model="yam_real",
            joint_names={side: config.arms[side].joint_names for side in ARMS},
            # Identity, NOT the profile's measured base transforms. The cuRobo
            # model is bimanual and already places both arms 0.62 m apart, so
            # supplying the offset here applies it a second time and every goal
            # lands somewhere impossible. Measured symptom: IK refused the arm's
            # OWN current pose, which is reachable by definition.
            base_transforms={side: np.eye(4, dtype=np.float64) for side in ARMS},
            end_effector_links={side: f"{side}_grasp" for side in ARMS},
        )

    def planning_workspace(self) -> tuple[np.ndarray, np.ndarray]:
        """World-frame box the shared planning scene is cropped to.

        The station's own profile owns this, so a second bench with a different
        table is a data change. It bounds what the arms can reach, not what the
        task cares about: nothing reachable is ever cropped away, which is what
        keeps this an optimization rather than a way to hide obstacles.
        """
        config = self._env.config
        return config.planning_workspace_lower, config.planning_workspace_upper

    def get_task_metadata(self) -> dict[str, Any]:
        context = self._task_context
        return {
            "embodiment": self.embodiment,
            "station": self._env.config.station,
            "calibration_bundle": self._env.config.calibration.bundle_id,
            "arms": list(ARMS),
            "dof": ARM_DOF,
            "cameras": [self._env.config.camera.role],
            "language": "" if context is None else context.language,
        }

    def get_controller_metadata(self) -> dict[str, Any]:
        """Plant description, including the versioned control contract.

        This is where provenance belongs: a dataset that does not record which
        plant executed it is unattributable.
        """
        contract = self._env.control_contract()
        config = self._env.config
        lower = np.concatenate([config.joint_limits_lower, config.joint_limits_lower]).tolist()
        upper = np.concatenate([config.joint_limits_upper, config.joint_limits_upper]).tolist()
        return {
            "control_frequency_hz": self.control_frequency,
            "control_period_s": self.control_period_s,
            "arm_names": list(ARMS),
            "control_contract": contract,
            "control_contract_version": contract.get("version"),
            "action_lower_bounds": lower,
            "action_upper_bounds": upper,
            "physical_motion_authorized": self._allow_physical_motion,
            "command_rpc_count": self._command_rpc_count,
        }


__all__ = [
    "TRAJECTORY_JOINT_TOLERANCE_RAD",
    "TRAJECTORY_SETTLE_S",
    "YamRealAdapter",
]
````

## src/cap_harness/yam_real/env.py

````text
"""The YAM plant: arms, camera, kinematics, and the one path that actuates.

``RealYamEnv`` is the native environment behind :class:`~cap_harness.yam_real.adapter.YamRealAdapter`,
the same way a MuJoCo env sits behind a simulator adapter. It owns
:meth:`execute_action_batch`, and that method is the **only** way anything in
this package commands the arms -- ``go_home`` and ``set_gripper`` are built on
it rather than beside it.

Keeping one chokepoint is what makes recorded episodes comparable. Two code
paths to the motors would be two plants, and data collected under one would not
transfer to the other even if both looked correct.

The arm clients are injected rather than constructed here, so the same env drives
either portal clients or the MuJoCo station in :mod:`cap_harness.yam_real.sim`.
The control path under test off-robot is then the real one.
"""

from __future__ import annotations

import threading
from typing import Any

import numpy as np

from cap_harness.yam_real.action import YamActionBatch, resolve_action_batch
from cap_harness.yam_real.config import YamStationConfig
from cap_harness.yam_real.kinematics import ARM_DOF, YamKinematics

ARMS = ("left", "right")

#: Per-joint channels the arm server reports at full MOTOR width -- the six arm
#: joints plus the gripper. Only ``joint_pos`` arrives pre-sliced, so the env
#: splits the rest rather than exposing a ``joint_pos`` of length 6 beside a
#: ``joint_vel`` of length 7.
MOTOR_WIDTH_CHANNELS = ("joint_vel", "joint_eff")

#: Where each motor-width channel's gripper entry is republished.
GRIPPER_CHANNELS = {"joint_vel": "gripper_vel", "joint_eff": "gripper_eff"}


class RealYamEnv:
    """Bimanual YAM plant, driven through a single action chokepoint."""

    def __init__(
        self,
        config: YamStationConfig,
        arms: dict[str, Any],
        *,
        camera: Any | None = None,
        aux_cameras: dict[str, Any] | None = None,
        plant: Any | None = None,
        camera_marker: Any | None = None,
    ) -> None:
        """``plant`` is an owned physics backend, if any, stopped on close.

        Hardware has none -- the arm servers outlive this process, and closing a
        client must never stop them. A simulated station does, and would leak a
        stepping thread per env without this.

        ``camera_marker`` is an advisory note that this process holds the
        cameras, released last of all on close; see
        :mod:`cap_harness.yam_real.station_marker`.
        """
        if set(arms) != set(ARMS):
            raise ValueError("arms must contain exactly 'left' and 'right'")
        self.config = config
        self._arms = dict(arms)
        self._camera = camera
        self._aux_cameras = dict(aux_cameras or {})
        self._plant = plant
        self._camera_marker = camera_marker
        # Attachments that read this env and must stop before it does -- today
        # only the dashboard. Kept as callables so env.py needs no import of, and
        # no opinion about, whatever attached itself.
        self._close_hooks: list[Any] = []
        self.kin = YamKinematics(config.model_xml)
        # YamKinematics carries a mutable configuration, and both observation and
        # planning write to it. One lock, held across write-then-read.
        self._kin_lock = threading.Lock()
        self._closed = False
        # Most recent commanded target per arm, and a per-arm counter of how many
        # batches have been issued. Written by _note_action_input, read by the
        # episode recorder's sampler thread. Plain dicts: the writer replaces a
        # whole value per arm and the reader tolerates a stale one, so a lock
        # would only add a way for recording to stall actuation.
        self._last_action_input: dict[str, tuple[np.ndarray, float]] = {}
        self._action_input_seq: dict[str, int] = dict.fromkeys(ARMS, 0)

    # -- observation -------------------------------------------------------

    def get_observations(self, side: str) -> dict[str, np.ndarray]:
        """One arm's state: joints, gripper, and the end-effector pose from FK.

        FK is bimanual -- the model holds both arms -- so both arms are read even
        when only one side is asked for. Doing otherwise would evaluate one arm's
        pose against a stale configuration for the other.
        """
        if side not in ARMS:
            raise ValueError(f"side must be 'left' or 'right'; got {side!r}")
        raw = {name: self._arms[name].get_observations() for name in ARMS}
        with self._kin_lock:
            left_pos, left_quat, right_pos, right_quat = self.kin.forward_kinematics(
                raw["left"]["joint_pos"], raw["right"]["joint_pos"]
            )
        poses = {"left": (left_pos, left_quat), "right": (right_pos, right_quat)}

        own = raw[side]
        out: dict[str, np.ndarray] = {
            "joint_pos": np.asarray(own["joint_pos"], dtype=np.float64).reshape(ARM_DOF),
            "gripper_pos": np.asarray(own["gripper_pos"], dtype=np.float64).reshape(1),
            "ee_pos": poses[side][0],
            "ee_quat": poses[side][1],
        }
        for key in MOTOR_WIDTH_CHANNELS:
            value = own.get(key)
            if value is None:
                continue
            channel = np.asarray(value, dtype=np.float64).reshape(-1)
            out[key] = channel[:ARM_DOF]
            if channel.size > ARM_DOF:
                out[GRIPPER_CHANNELS[key]] = channel[ARM_DOF : ARM_DOF + 1]
        return out

    def read_camera(self) -> Any | None:
        """Most recent frame from the station camera, or None when there is none."""
        return None if self._camera is None else self._camera.read()

    def read_aux_camera(self, role: str) -> Any | None:
        """Most recent frame from one image-only camera, or None."""
        source = self._aux_cameras.get(role)
        return None if source is None else source.read()

    @property
    def aux_camera_roles(self) -> tuple[str, ...]:
        """Roles of the cameras that are opened but not calibrated."""
        return tuple(sorted(self._aux_cameras))

    @property
    def camera_aliases(self) -> tuple[str, ...]:
        """Names ``render_rgb`` will answer to. Empty when the station has none.

        The calibrated camera comes first, then the image-only ones in profile
        order, so a caller that wants "the" camera and takes the first alias
        still gets the one that can be projected into metres.
        """
        names: list[str] = []
        if self._camera is not None:
            names.append(str(self.config.camera.role))
        names.extend(sorted(self._aux_cameras))
        return tuple(names)

    def attach_cameras(self, cameras: dict[str, Any], *, marker: Any | None = None) -> None:
        """Take ownership of already-opened cameras, keyed by role.

        The inverse of :meth:`release_cameras`, for a viewer that gives the
        devices up to a run and takes them back afterwards without dropping its
        arm connections. Refuses to overwrite cameras it already holds, since
        that would silently leak the pipelines.
        """
        if self._camera is not None or self._aux_cameras:
            raise RuntimeError("this station already holds cameras; release them first")
        remaining = dict(cameras)
        self._camera = remaining.pop(str(self.config.camera.role), None)
        self._aux_cameras = remaining
        self._camera_marker = marker

    def release_cameras(self) -> None:
        """Give up the cameras, keeping the arm connections.

        A RealSense device belongs to one process, so a courtesy viewer holding
        them has to let go when a run wants them -- but the arms are a
        client/server split and need no handover at all. Dropping the whole
        station to release a USB handle would blind the viewer to joints and
        poses for no reason.

        Afterwards ``camera_aliases`` is empty and ``render_rgb`` answers None,
        which is the same shape as a station built with ``enable_camera=False``.
        """
        sources = ([self._camera] if self._camera is not None else []) + list(
            self._aux_cameras.values()
        )
        self._camera = None
        self._aux_cameras = {}
        errors: list[str] = []
        for source in sources:
            try:
                source.close()
            except Exception as exc:
                errors.append(f"{type(exc).__name__}: {exc}")
        if self._camera_marker is not None:
            self._camera_marker.release()
            self._camera_marker = None
        if errors:
            raise RuntimeError("YAM camera release failed: " + "; ".join(errors))

    def add_close_hook(self, hook: Any) -> None:
        """Call `hook` when this station closes, before the devices go down.

        For things that read the env and must stop first. Hooks run in reverse
        registration order and their failures are printed, not raised.
        """
        self._close_hooks.append(hook)

    def camera_frame(self, alias: str) -> Any | None:
        """One camera's most recent frame by alias, or None.

        The frame-level twin of :meth:`render_rgb`, and total in the same way.
        A caller that only wants pixels should use ``render_rgb``; this exists
        for callers that also need ``timestamp_s`` -- notably
        :mod:`cap_harness.yam_real.dashboard`, which watches that field for
        *change* to tell a live camera from a wedged one still serving its last
        good frame.
        """
        if self._camera is not None and alias == str(self.config.camera.role):
            return self._camera.read()
        source = self._aux_cameras.get(alias)
        return None if source is None else source.read()

    def render_rgb(self, alias: str) -> np.ndarray | None:
        """One camera's RGB frame as ``(H, W, 3)`` uint8, or None.

        Exists for :class:`~cap_harness.yam_real.recorder.YamEpisodeRecorder`,
        which samples cameras by name on a background thread and must not raise:
        a station with no camera, an unknown alias, or a frame the driver has not
        produced yet all return None rather than killing the sampler.
        """
        frame = self.camera_frame(alias)
        if frame is None:
            return None
        return np.asarray(frame.rgb, dtype=np.uint8)

    # -- actuation ---------------------------------------------------------

    def command_joint_state(self, side: str, state: dict[str, Any]) -> None:
        """Forward one already-resolved tick to an arm server. Level-1 only."""
        self._arms[side].command_joint_state(state)

    def execute_action_batch(
        self,
        batch: YamActionBatch | dict[str, Any],
        *,
        command_hz: float | None = None,
        start_interp_s: float = 0.0,
        settle_s: float = 0.2,
        playback_speed: float = 1.0,
    ) -> dict[str, Any]:
        """Execute one typed action batch. The only path to the motors."""
        from cap_harness.yam_real.control.controller import execute_joint_trajectory

        resolved = resolve_action_batch(self, batch)
        self._note_action_input(resolved)
        rate = float(command_hz or self.config.controller.command_stream_hz)
        result = execute_joint_trajectory(
            self,
            resolved.timestamps,
            resolved.left_joint_positions,
            resolved.right_joint_positions,
            resolved.left_gripper_positions,
            resolved.right_gripper_positions,
            command_hz=rate,
            start_interp_s=start_interp_s,
            settle_s=settle_s,
            playback_speed=playback_speed,
        )
        result.setdefault("source", resolved.source)
        result.setdefault("input_space", resolved.input_space)
        return result

    def _note_action_input(self, resolved: Any) -> None:
        """Publish the batch's final target so a recorder can sample it.

        The episode recorder runs on its own thread and cannot see inside this
        call, so it reads the most recent commanded target from here. Without
        it, every recorded action is the arm's measured position -- an episode
        that says "the policy commanded exactly where the arm already was",
        which trains nothing.

        The batch's LAST waypoint is published, not each one in turn: the
        recorder samples at its own rate and only ever asks "what is the current
        target", and a batch is commanded as a unit.

        ``_action_input_seq`` increments per arm so the recorder can tell a genuinely
        new command from a zero-order hold. Perception and planning gaps are long
        here -- seven segmentation reads and a cuRobo round trip between motions
        -- so without it an episode looks like continuous actuation when most of
        it is the arm standing still.

        Deliberately total: a recorder attaching mid-run sees whatever the last
        batch left, and nothing here can fail a motion.
        """
        try:
            positions = {
                "left": resolved.left_joint_positions,
                "right": resolved.right_joint_positions,
            }
            grippers = {
                "left": resolved.left_gripper_positions,
                "right": resolved.right_gripper_positions,
            }
            for side in ARMS:
                rows = np.asarray(positions[side], dtype=np.float64)
                grip = np.asarray(grippers[side], dtype=np.float64).reshape(-1)
                if rows.size == 0:
                    continue
                self._last_action_input[side] = (
                    rows.reshape(-1, ARM_DOF)[-1].copy(),
                    float(grip[-1]) if grip.size else 0.0,
                )
                self._action_input_seq[side] = self._action_input_seq.get(side, 0) + 1
        except Exception:
            pass

    def set_gripper(
        self, side: str, position: float, *, duration_s: float | None = None
    ) -> dict[str, Any]:
        """Move one gripper while both arms hold their measured joint positions.

        The command is time-boxed, so the window has to cover the travel: a fixed
        short duration stops a large move partway. Measured on the bench, a 0.25 s
        window closed only 0.55 of a commanded 0.75 span. When ``duration_s`` is
        not given it is scaled from how far the jaws actually have to go.
        """
        if side not in ARMS:
            return {"success": False, "reason": f"invalid side: {side!r}"}
        observed = {name: self.get_observations(name) for name in ARMS}
        # Clamped for the same reason as the adapter's hold targets: a measured
        # pose can sit outside the commandable range, and commanding it verbatim
        # is refused, which would make a drifted arm impossible to command.
        joints = {
            name: np.clip(
                np.asarray(observed[name]["joint_pos"], dtype=np.float64).reshape(ARM_DOF),
                self.config.joint_limits_lower,
                self.config.joint_limits_upper,
            )
            for name in ARMS
        }
        start = {name: float(observed[name]["gripper_pos"][0]) for name in ARMS}
        goal = dict(start)
        goal[side] = float(np.clip(position, 0.0, 1.0))

        travel = abs(goal[side] - start[side])
        duration = (
            max(0.05, travel * self.config.controller.gripper_full_travel_s)
            if duration_s is None
            else max(0.02, float(duration_s))
        )

        batch = YamActionBatch.joint_abs(
            [0.0, duration],
            [joints["left"], joints["left"]],
            [joints["right"], joints["right"]],
            [[start["left"]], [goal["left"]]],
            [[start["right"]], [goal["right"]]],
            source="cap_gripper",
            meta={"side": side},
        )
        result = self.execute_action_batch(batch, settle_s=0.0)
        result.update({"side": side, "gripper": goal[side]})
        return result

    def go_ready(self, *, duration_s: float = 4.0, keep_grippers: bool = True) -> dict[str, Any]:
        """Drive both arms to the profile's ready pose.

        Kept as an explicit primitive, but no longer what ``reset`` uses.

        "Ready" is a misnomer worth knowing about before you call this: measured
        against home, it moves the grasp frame *forward* 0.11 m and *inward*
        0.16 m, parking the arm over the table rather than clear of it, with the
        forearm at z 1.23. That height is inside the band where the station
        camera returns arm hardware the URDF does not model, which makes the
        start state read as in-collision to a scene-aware planner.

        Home plans fine too. An earlier version of this docstring claimed home was
        a singularity IK could not solve from; that was wrong -- the failure was a
        stale self-collision ignore map, since fixed. See BUGS.md.
        """
        return self._drive_to(
            {name: self.config.arms[name].ready_joints for name in ARMS},
            duration_s=duration_s,
            keep_grippers=keep_grippers,
            source="cap_ready",
        )

    def go_home(self, *, duration_s: float = 3.0, keep_grippers: bool = True) -> dict[str, Any]:
        """Drive both arms to the profile's home pose -- the mechanical zero.

        Home is the parking and calibration reference, and what ``reset`` drives
        to. cuRobo IK solves both arms from here.

        Two properties to know before commanding it. Joints 2 and 3 bottom out at
        exactly 0.0, so at home they sit *on* their lower limits -- a planner
        cannot seed below them, only away from them. And the arm is fully
        extended, putting the grasp frame at roughly x 0.50, z 0.91: reaching
        over the table about 13 cm above its surface, so the path there sweeps
        the workspace and anything left on the table is in it.
        """
        return self._drive_to(
            {name: self.config.arms[name].home_joints for name in ARMS},
            duration_s=duration_s,
            keep_grippers=keep_grippers,
            source="cap_home",
        )

    def _drive_to(
        self,
        targets: dict[str, np.ndarray],
        *,
        duration_s: float,
        keep_grippers: bool,
        source: str,
    ) -> dict[str, Any]:
        """One command with a start interpolation, not a settling loop.

        The controller drives smoothly to the target and arrives; re-commanding
        the goal one control period at a time creeps instead of converging.
        """
        observed = {name: self.get_observations(name) for name in ARMS}
        grippers = {
            name: (float(observed[name]["gripper_pos"][0]) if keep_grippers else 0.0)
            for name in ARMS
        }
        batch = YamActionBatch.joint_abs(
            [0.0],
            [targets["left"]],
            [targets["right"]],
            [[grippers["left"]]],
            [[grippers["right"]]],
            source=source,
        )
        return self.execute_action_batch(
            batch, start_interp_s=max(0.0, float(duration_s)), settle_s=0.2
        )

    # -- lifecycle ---------------------------------------------------------

    def control_contract(self) -> dict[str, Any]:
        """The versioned plant description recorded actions were executed under."""
        from cap_harness.yam_real.control.controller import build_control_contract

        return build_control_contract(self)

    def close(self) -> None:
        if self._closed:
            return
        self._closed = True
        errors: list[str] = []
        # Hooks first: an attachment that samples cameras must stop before the
        # devices do. Their failures are not the station's -- a web server that
        # will not shut down cleanly is no reason to report that the robot did
        # not -- so they are printed, not collected into `errors`.
        for hook in reversed(self._close_hooks):
            try:
                hook()
            except Exception as exc:
                print(f"[yam-station] close hook failed: {type(exc).__name__}: {exc}")
        if self._camera is not None:
            try:
                self._camera.close()
            except Exception as exc:
                errors.append(f"camera: {type(exc).__name__}: {exc}")
        # Every aux camera gets a close attempt even if an earlier one raises:
        # one wedged device must not leak the rest of the USB handles.
        for role, aux in self._aux_cameras.items():
            try:
                aux.close()
            except Exception as exc:
                errors.append(f"camera {role}: {type(exc).__name__}: {exc}")
        for name, arm in self._arms.items():
            close = getattr(arm, "close", None)
            if close is None:
                continue
            try:
                close()
            except Exception as exc:
                errors.append(f"{name}: {type(exc).__name__}: {exc}")
        if self._plant is not None:
            try:
                self._plant.stop()
            except Exception as exc:
                errors.append(f"plant: {type(exc).__name__}: {exc}")
        # Last of all, and after the devices are actually free: the marker says
        # the cameras are held, so clearing it before they are released would
        # invite a waiting viewer in while they are still ours.
        if self._camera_marker is not None:
            self._camera_marker.release()
        if errors:
            raise RuntimeError("YAM station cleanup failed: " + "; ".join(errors))


__all__ = ["ARMS", "RealYamEnv"]
````

## src/cap_harness/agent/mcp.py

````text
"""Allowlisted MCP tools over a persistent robot session."""

from __future__ import annotations

import asyncio
import base64
from collections.abc import Mapping, Sequence
from collections.abc import Mapping as MappingABC
from collections.abc import Sequence as SequenceABC
from contextlib import asynccontextmanager
import inspect
from io import BytesIO
import json
import types as python_types
from typing import Any, Union, get_args, get_origin, get_type_hints

import numpy as np

from cap_harness.contracts import MotionStrategy
from cap_harness.geometry import pose_from_mapping

from .session import LiveAgentSession, _compact_summary


def _object_schema(
    properties: Mapping[str, Any] | None = None, *, required: Sequence[str] = ()
) -> dict[str, Any]:
    schema: dict[str, Any] = {
        "type": "object",
        "properties": dict(properties or {}),
        "additionalProperties": False,
    }
    if required:
        schema["required"] = list(required)
    return schema


_CAMERAS = {
    "type": "array",
    "items": {"type": "string"},
    "description": "Camera names to return; defaults to the station's primary camera.",
}


def _annotation_schema(annotation: Any) -> dict[str, Any]:
    if annotation in (inspect.Parameter.empty, Any, object):
        return {}
    if annotation is str:
        return {"type": "string"}
    if annotation is bool:
        return {"type": "boolean"}
    if annotation is int:
        return {"type": "integer"}
    if annotation is float:
        return {"type": "number"}
    if annotation is np.ndarray:
        return {"type": "array"}

    origin = get_origin(annotation)
    arguments = get_args(annotation)
    if origin in (list, tuple, set, Sequence, SequenceABC):
        item = _annotation_schema(arguments[0]) if arguments else {}
        return {"type": "array", **({"items": item} if item else {})}
    if origin in (dict, Mapping, MappingABC):
        return {"type": "object"}
    if origin in (Union, python_types.UnionType):
        schemas = [
            {"type": "null"} if item is type(None) else _annotation_schema(item)
            for item in arguments
        ]
        schemas = [schema for schema in schemas if schema]
        if len(schemas) == 1:
            return schemas[0]
        if schemas:
            return {"anyOf": schemas}
    return {}


def _cap_input_schema(spec: Any) -> dict[str, Any]:
    """Derive the JSON-callable portion of a registered Python signature."""
    try:
        hints = get_type_hints(spec.function)
    except Exception:
        hints = {}
    properties: dict[str, Any] = {}
    required: list[str] = []
    additional = False
    for parameter in spec.signature.parameters.values():
        if parameter.kind is inspect.Parameter.VAR_POSITIONAL:
            continue
        if parameter.kind is inspect.Parameter.VAR_KEYWORD:
            additional = True
            continue
        schema = _annotation_schema(hints.get(parameter.name, parameter.annotation))
        if parameter.default is inspect.Parameter.empty:
            required.append(parameter.name)
        elif isinstance(parameter.default, (str, int, float, bool)) or parameter.default is None:
            schema = {**schema, "default": parameter.default}
        properties[parameter.name] = schema
    result: dict[str, Any] = {
        "type": "object",
        "properties": properties,
        "additionalProperties": additional,
    }
    if required:
        result["required"] = required
    return result


def _pose_input_schema() -> dict[str, Any]:
    schema = _object_schema(
        {
            "position": {
                "type": "array",
                "items": {"type": "number"},
                "minItems": 3,
                "maxItems": 3,
            },
            "quaternion_wxyz": {
                "type": "array",
                "items": {"type": "number"},
                "minItems": 4,
                "maxItems": 4,
                "description": "Absolute unit quaternion [w, x, y, z] in the pose frame.",
            },
            "rpy_deg": {
                "type": "array",
                "items": {"type": "number"},
                "minItems": 3,
                "maxItems": 3,
                "description": (
                    "Absolute [roll, pitch, yaw] in degrees in the pose frame. "
                    "Fixed-axis XYZ: R = Rz(yaw) @ Ry(pitch) @ Rx(roll)."
                ),
            },
            "frame": {"type": "string", "minLength": 1},
        },
        required=("position", "frame"),
    )
    schema["oneOf"] = [{"required": ["quaternion_wxyz"]}, {"required": ["rpy_deg"]}]
    schema["description"] = "Absolute pose; provide exactly one of quaternion_wxyz or rpy_deg."
    return schema


def _motion_strategy_input_schema() -> dict[str, Any]:
    return _object_schema(
        {
            "ik_solver": {
                "type": "string",
                "enum": ["pyroki", "curobo", "mink"],
                "default": "pyroki",
            },
            "trajectory_planner": {
                "type": "string",
                "enum": ["interpolation", "curobo"],
                "default": "interpolation",
            },
            "pose_planner": {
                "type": "string",
                "enum": ["composed", "curobo-integrated"],
                "default": "composed",
            },
            "time_dilation_factor": {
                "type": ["number", "null"],
                "exclusiveMinimum": 0.0,
                "maximum": 1.0,
            },
            "interpolation_dt_s": {
                "type": ["number", "null"],
                "exclusiveMinimum": 0.0,
            },
            "maximum_trajectory_dt_s": {
                "type": ["number", "null"],
                "exclusiveMinimum": 0.0,
            },
        }
    )


def _encode_jpeg(frame: np.ndarray, *, max_side: int = 960) -> str:
    from PIL import Image

    array = np.asarray(frame)
    if np.issubdtype(array.dtype, np.floating):
        scale = 255.0 if array.size and float(np.nanmax(array)) <= 1.0 else 1.0
        array = np.clip(array * scale, 0, 255).astype(np.uint8)
    else:
        array = np.clip(array, 0, 255).astype(np.uint8)
    image = Image.fromarray(array)
    image.thumbnail((max_side, max_side))
    buffer = BytesIO()
    image.save(buffer, format="JPEG", quality=85)
    return base64.b64encode(buffer.getvalue()).decode("ascii")


_DIRECT = {
    "get_robot_state",
    "localize_object",
    "move_to_joints",
    "move_to_pose",
    "move_synchronized",
    "set_gripper",
    "yam_real.get_controller_metadata",
}
_READ_ONLY = {"get_robot_state", "localize_object", "yam_real.get_controller_metadata"}


def _jsonable(value: Any, *, _active: set[int] | None = None) -> Any:
    if value is None or isinstance(value, (bool, int, float, str)):
        return value
    if isinstance(value, np.ndarray):
        if value.ndim <= 1 and value.size <= 32:
            return np.round(value.astype(float), 6).tolist()
        return {"shape": list(value.shape), "dtype": str(value.dtype)}
    if isinstance(value, (Mapping, list, tuple)):
        active = set() if _active is None else _active
        identity = id(value)
        if identity in active:
            return "<recursive-reference>"
        active.add(identity)
        try:
            if isinstance(value, Mapping):
                return {str(key): _jsonable(item, _active=active) for key, item in value.items()}
            return [_jsonable(item, _active=active) for item in value]
        finally:
            active.remove(identity)
    return str(value)


class CapMcpBridge:
    """Keep the remote tool surface small and describe the live capabilities."""

    def __init__(self, session: LiveAgentSession) -> None:
        self.session = session
        configured = session.api.configured_providers
        allowed = set(_DIRECT)
        if not configured["segmentation"]:
            allowed.discard("localize_object")
        if not configured["ik"] and not configured["pose_planning"]:
            allowed.discard("move_to_pose")
        self._default_ik = next(iter(configured["ik"]), "pyroki")
        self._direct = {
            "cap_" + spec.name.replace(".", "__"): spec
            for spec in session.registry.all_specs(public_only=True)
            if spec.name in allowed
        }

    def tool_specs(self) -> list[Any]:
        from mcp.types import Tool

        specs = [
            (
                "get_capability_graph",
                "Read available tools and program provenance.",
                _object_schema(),
            ),
            (
                "observe",
                "Read fresh station state and camera images during any job.",
                _object_schema({"cameras": _CAMERAS}),
            ),
            (
                "get_job",
                "Read job status and terminal state. Cameras are omitted unless requested.",
                _object_schema({"job_id": {"type": "string"}, "cameras": _CAMERAS}),
            ),
            ("read_operator_messages", "Drain pending operator instructions.", _object_schema()),
        ]
        for name, spec in self._direct.items():
            schema = _cap_input_schema(spec)
            if "target_pose" in schema["properties"]:
                schema["properties"]["target_pose"] = _pose_input_schema()
            if "targets" in schema["properties"]:
                schema["properties"]["targets"] = {
                    "type": "object",
                    "additionalProperties": {
                        "oneOf": [
                            _pose_input_schema(),
                            {"type": "array", "items": {"type": "number"}},
                        ]
                    },
                }
            if "strategy" in schema["properties"]:
                strategy_schema = _motion_strategy_input_schema()
                strategy_schema["properties"]["ik_solver"]["default"] = self._default_ik
                schema["properties"]["strategy"] = {"anyOf": [strategy_schema, {"type": "null"}]}
            specs.append((name, spec.documented_signature, schema))
        specs.extend(
            (p.definition.tool_name, p.definition.summary, _object_schema())
            for p in self.session.program_catalog.all()
        )
        return [
            Tool(name=name, description=description, inputSchema=schema)
            for name, description, schema in specs
        ]

    def call(self, name: str, arguments: Mapping[str, Any] | None = None) -> Any:
        from jsonschema import validate
        from mcp.types import CallToolResult, ImageContent, TextContent

        try:
            args = dict(arguments or {})
            spec = next((s for s in self.tool_specs() if s.name == name), None)
            if spec is None:
                raise ValueError(f"unknown tool {name!r}")
            validate(args, spec.inputSchema)
            value, frames = self._dispatch(name, args)
            value = _jsonable(value)
            content = [TextContent(type="text", text=json.dumps(value))]
            for camera, frame in frames.items():
                content.append(TextContent(type="text", text=f"camera: {camera}"))
                content.append(
                    ImageContent(type="image", data=_encode_jpeg(frame), mimeType="image/jpeg")
                )
            return CallToolResult(
                content=content, structuredContent=value, isError=bool(value.get("ok") is False)
            )
        except Exception as exc:
            value = {"ok": False, "error": f"{type(exc).__name__}: {exc}"}
            return CallToolResult(
                content=[TextContent(type="text", text=json.dumps(value))],
                structuredContent=value,
                isError=True,
            )

    def _snapshot(
        self, value: dict[str, Any], cameras: Sequence[str] | None = None
    ) -> tuple[dict[str, Any], dict[str, np.ndarray]]:
        snapshot = self.session.visual_snapshot()
        frames = {}
        for name in snapshot["cameras"] if cameras is None else cameras:
            if name not in snapshot["cameras"]:
                raise ValueError(f"camera {name!r} is unavailable")
            frames[name] = snapshot["cameras"][name]
        return {
            **value,
            "observation": {
                key: snapshot[key]
                for key in (
                    "observation_seq",
                    "timestamp_s",
                    "stale",
                    "monitor_error",
                    "camera_metadata",
                    "state",
                )
            },
            "image_cameras": list(frames),
        }, frames

    def _terminal(self, job_id: str) -> dict[str, Any]:
        job = self.session.wait(job_id, timeout_s=None)
        result = job.get("result") if job else None
        return {
            "ok": bool(
                job
                and not job["error"]
                and not (isinstance(result, dict) and result.get("ok") is False)
            ),
            "job": job,
        }

    def _dispatch(
        self, name: str, args: dict[str, Any]
    ) -> tuple[dict[str, Any], dict[str, np.ndarray]]:
        if name == "get_capability_graph":
            return {
                "ok": True,
                "tools": [
                    {"name": s.name, "description": s.description} for s in self.tool_specs()
                ],
                "programs": [p.metadata() for p in self.session.program_catalog.all()],
                "configured_providers": self.session.api.configured_providers,
            }, {}
        if name == "observe":
            return self._snapshot(
                {"ok": True}, args.get("cameras", [self.session.api.default_camera])
            )
        if name == "get_job":
            job = self.session.job(args.get("job_id"))
            value = {"ok": job is not None, "job": job}
            return self._snapshot(value, args["cameras"]) if args.get("cameras") else (value, {})
        if name == "read_operator_messages":
            return {"ok": True, "messages": self.session.drain_steering()}, {}
        if name.startswith("cap_program_"):
            program = self.session.program_catalog.get_by_tool(name)
            value = self._terminal(self.session.start_named_program(program.definition.name))
            return self._snapshot(value) if program.definition.moves_robot else (value, {})
        spec = self._direct[name]
        if "target_pose" in args:
            args["target_pose"] = pose_from_mapping(args["target_pose"])
        if "target" in args:
            args["target"] = np.asarray(args["target"], dtype=float)
        if "targets" in args:
            args["targets"] = {
                arm: pose_from_mapping(target)
                if isinstance(target, dict)
                else np.asarray(target, dtype=float)
                for arm, target in args["targets"].items()
            }
        if spec.name in {"move_to_pose", "move_synchronized"}:
            args["strategy"] = MotionStrategy(
                **{"ik_solver": self._default_ik, **(args.get("strategy") or {})}
            )
        if spec.name in _READ_ONLY:
            result = spec.function(**args)
            return {"ok": bool(getattr(result, "ok", True)), "result": _compact_summary(result)}, {}
        value = self._terminal(self.session.start_tool(spec.name, args))
        return self._snapshot(value)


def create_mcp_transport(session: LiveAgentSession) -> tuple[Any, Any]:
    from mcp.server.lowlevel import Server
    from mcp.server.streamable_http_manager import StreamableHTTPSessionManager

    bridge = CapMcpBridge(session)
    server = Server("cap", version="0.1.0")

    @server.list_tools()
    async def list_tools() -> list[Any]:
        return bridge.tool_specs()

    @server.call_tool()
    async def call_tool(name: str, arguments: dict[str, Any]) -> Any:
        return await asyncio.to_thread(bridge.call, name, arguments)

    manager = StreamableHTTPSessionManager(app=server, stateless=True, json_response=True)

    async def endpoint(scope: Any, receive: Any, send: Any) -> None:
        await manager.handle_request(scope, receive, send)

    return manager, endpoint


def create_lifespan(manager: Any) -> Any:
    @asynccontextmanager
    async def lifespan(_app: Any):
        async with manager.run():
            yield

    return lifespan
````

## src/cap_harness/agent/session.py

````text
"""One persistent CAP session shared by an agent, operator UI, and robot."""

from __future__ import annotations

from collections import deque
from collections.abc import Mapping
from dataclasses import dataclass, fields, is_dataclass
from enum import Enum
import logging
import threading
import time
from typing import Any
from uuid import uuid4

import numpy as np

from ..contracts import ExecutionResult
from ..registry import ToolRegistry
from ..runtime import ProgramExecutionResult, ProgramExecutor
from .program_catalog import CapProgramCatalog

PHASES = ("idle", "perceive", "reason", "act", "verify", "done", "error")
_READ_ONLY_TOOL_NAMES = frozenset({"get_task_context", "get_observation", "get_robot_state"})
logger = logging.getLogger(__name__)


class SessionBusyError(RuntimeError):
    """Raised when a second physical operation is submitted concurrently."""


@dataclass(frozen=True, slots=True)
class SessionEvent:
    seq: int
    timestamp_s: float
    role: str
    text: str
    phase: str
    source_id: str = ""
    turn_id: str = ""
    message_phase: str = ""


@dataclass(slots=True)
class _Job:
    id: str
    kind: str
    label: str
    phase: str
    started_s: float
    thread: threading.Thread | None = None
    finished_s: float | None = None
    result: Any = None
    error: str | None = None
    terminal_state: Any = None

    @property
    def active(self) -> bool:
        return self.finished_s is None


@dataclass(frozen=True, slots=True)
class _ReviewedProgramResult:
    """One checked-in program result plus evidence captured by the live session."""

    execution: ProgramExecutionResult
    verification: Mapping[str, Any]
    images: Mapping[str, np.ndarray]
    terminal_state: Any = None

    @property
    def ok(self) -> bool:
        return self.execution.ok and bool(getattr(self.execution.result, "ok", True))


def _summary(value: Any, *, depth: int = 0) -> Any:
    """Make an API-safe result summary without copying images or action arrays."""
    if depth > 6:
        return f"<{type(value).__name__}>"
    if value is None or isinstance(value, (bool, int, float, str)):
        return value
    if isinstance(value, Enum):
        return value.value
    if isinstance(value, np.ndarray):
        # Small state vectors are the typed numeric payload of contracts such as
        # RobotState.  Images and action tensors remain bounded
        # metadata, but joint/EEF/gripper values must reach System-2 intact.
        if value.ndim <= 1 and value.size <= 32:
            return np.round(value.astype(float), 6).tolist()
        return {"type": "ndarray", "shape": list(value.shape), "dtype": str(value.dtype)}
    if isinstance(value, Mapping):
        return {
            str(key): _summary(item, depth=depth + 1)
            for key, item in value.items()
            if isinstance(key, str)
        }
    if isinstance(value, (list, tuple)):
        return [_summary(item, depth=depth + 1) for item in value]
    if is_dataclass(value):
        return {
            field.name: _summary(getattr(value, field.name), depth=depth + 1)
            for field in fields(value)
        }
    return str(value)


def _compact_robot_state(value: Any) -> dict[str, Any] | None:
    """Return the complete numeric state needed for the next metric action."""
    if value is None:
        return None
    return {
        "base_frame": getattr(value, "base_frame", None),
        "embodiment": getattr(value, "embodiment", None),
        "joint_positions": _summary(getattr(value, "joint_positions", {})),
        "joint_velocities": _summary(getattr(value, "joint_velocities", {})),
        "gripper_positions": _summary(getattr(value, "gripper_positions", {})),
        "end_effector_poses": _summary(getattr(value, "end_effector_poses", {})),
        "timestamp_s": getattr(value, "timestamp_s", None),
    }


def _compact_execution_result(value: Any) -> dict[str, Any]:
    """Expose a motion's terminal state without nesting camera observations.

    ``ExecutionResult.final_observation`` contains the exact state the motion
    used for its terminal tolerance check, but it also contains every RGB-D
    camera.  Putting that full observation in compact MCP feedback buried the
    useful joint/gripper values behind image metadata and encouraged a redundant
    ``get_robot_state`` call.  Keep the full observation in the recorder while
    presenting the already-verified terminal state directly to System-2. The MCP bridge attaches
    fresh post-action camera frames as separate image content blocks.
    """
    observation = getattr(value, "final_observation", None)
    state = getattr(observation, "robot_state", None)
    terminal_state = _compact_robot_state(state)
    ok = bool(getattr(value, "ok", False))
    status = getattr(value, "status", None)
    return {
        "ok": ok,
        "status": _summary(status),
        "postcondition_satisfied": ok,
        "steps_executed": int(getattr(value, "steps_executed", 0)),
        "terminated": bool(getattr(value, "terminated", False)),
        "truncated": bool(getattr(value, "truncated", False)),
        "final_errors": _summary(getattr(value, "final_errors", {})),
        "diagnostics": _summary(getattr(value, "diagnostics", {})),
        "error": _summary(getattr(value, "error", None)),
        "terminal_state": terminal_state,
        "terminal_observation_timestamp_s": getattr(observation, "timestamp_s", None),
        "state_refresh_required": terminal_state is None,
    }


def _compact_summary(value: Any, *, depth: int = 0) -> Any:
    """Bound decision feedback while retaining its semantic fields."""
    if depth > 6:
        return f"<{type(value).__name__}>"
    if isinstance(value, ExecutionResult):
        return _compact_execution_result(value)
    if isinstance(value, str):
        return value if len(value) <= 512 else value[:509] + "..."
    if value is None or isinstance(value, (bool, int, float)):
        return value
    if isinstance(value, Mapping):
        return {
            str(key): _compact_summary(item, depth=depth + 1)
            for key, item in list(value.items())[:24]
            if isinstance(key, str)
        }
    if isinstance(value, (list, tuple)):
        return [_compact_summary(item, depth=depth + 1) for item in value[:12]]
    return _compact_summary(_summary(value), depth=depth + 1)


def _reviewed_program_summary(
    value: _ReviewedProgramResult, *, detail: str = "compact"
) -> dict[str, Any]:
    execution = value.execution
    terminal_state = _compact_robot_state(value.terminal_state)
    summary = {
        "ok": value.ok,
        "result": _compact_summary(execution.result),
        "error": _compact_summary(execution.error),
        "verification": _compact_summary(value.verification),
        "evidence_images": sorted(value.images),
        "terminal_state": terminal_state,
        "state_refresh_required": terminal_state is None,
    }
    if detail == "full":
        summary.update(stdout=execution.stdout, calls=_summary(execution.calls))
    return summary


class LiveAgentSession:
    """Serialize physical work while leaving monitoring and steering responsive.

    Programs use the existing restricted :class:`ProgramExecutor`; individual
    calls resolve through the same public :class:`ToolRegistry`. Every physical
    operation is a background job so a UI or agent can monitor
    execution while it is running.
    """

    def __init__(
        self,
        api: Any,
        registry: ToolRegistry,
        *,
        recorder: Any = None,
        event_limit: int = 100,
        monitor_hz: float = 2.0,
        monitor_active_hz: float = 5.0,
        program_catalog: CapProgramCatalog | None = None,
        operation_controller: Any = None,
        event_sink: Any = None,
        tool_result_sink: Any = None,
    ) -> None:
        self.api = api
        self.registry = registry
        self.executor = ProgramExecutor(registry, recorder=recorder)
        self.program_catalog = program_catalog or CapProgramCatalog()
        self._lock = threading.RLock()
        self._state_changed = threading.Condition(self._lock)
        self._operation_lock = threading.Lock()
        self._events: deque[SessionEvent] = deque(maxlen=event_limit)
        self._steering: deque[str] = deque()
        self._operation_controller = operation_controller
        self._event_sink = event_sink
        self._tool_result_sink = tool_result_sink
        self._job: _Job | None = None
        self._phase = "idle"
        self._seq = 0
        self._closed = False
        self._cameras: dict[str, np.ndarray] = {}
        self._robot_state: dict[str, np.ndarray] = {}
        self._observation_timestamp_s: float | None = None
        self._observation_seq: int | None = None
        self._refresh_timestamp_s: float | None = None
        self._refresh_monotonic_s: float | None = None
        self._camera_metadata: dict[str, dict[str, Any]] = {}
        self._monitor_error: str | None = None
        if float(monitor_hz) <= 0 or float(monitor_active_hz) <= 0:
            raise ValueError("monitor rates must be positive")
        self._monitor_idle_period_s = 1.0 / float(monitor_hz)
        self._monitor_active_period_s = 1.0 / float(monitor_active_hz)
        self._monitor_stop = threading.Event()
        self._monitor_thread = threading.Thread(
            target=self._monitor_loop,
            name="cap-agent-monitor",
            daemon=True,
        )
        self._monitor_thread.start()
        self.publish("system", "Live CAP session ready", phase="perceive")

    @property
    def phase(self) -> str:
        with self._lock:
            return self._phase

    def publish(
        self,
        role: str,
        text: str,
        *,
        phase: str | None = None,
        timestamp_s: float | None = None,
        source_id: str = "",
        turn_id: str = "",
        message_phase: str = "",
    ) -> SessionEvent:
        message = str(text).strip()
        if not message:
            raise ValueError("event text must be non-empty")
        if phase is not None and phase not in PHASES:
            raise ValueError(f"phase must be one of {PHASES}")
        with self._lock:
            if phase is not None:
                self._phase = phase
            self._seq += 1
            event = SessionEvent(
                seq=self._seq,
                timestamp_s=time.time() if timestamp_s is None else float(timestamp_s),
                role=str(role).strip() or "system",
                text=message,
                phase=self._phase,
                source_id=str(source_id),
                turn_id=str(turn_id),
                message_phase=str(message_phase),
            )
            self._events.append(event)
        if self._event_sink is not None:
            try:
                self._event_sink(event)
            except Exception:
                logger.exception("System-2 event recorder failed")
        return event

    def _record_tool_result(self, job: _Job, result: Any = None) -> None:
        if self._tool_result_sink is None:
            return
        try:
            self._tool_result_sink(
                job_id=job.id,
                label=job.label,
                timestamp_s=time.time(),
                result=_summary(result),
                error=job.error,
            )
        except Exception:
            logger.exception("System-2 tool-result recorder failed")

    def steer(self, message: str) -> SessionEvent:
        text = str(message).strip()
        if not text:
            raise ValueError("steering message must be non-empty")
        event = self.publish("human", text)
        with self._lock:
            self._steering.append(text)
            self._state_changed.notify_all()
        self.publish("system", "Operator message queued")
        return event

    def drain_steering(self) -> list[str]:
        """Return queued operator messages exactly once, in arrival order."""
        with self._lock:
            messages = list(self._steering)
            self._steering.clear()
            return messages

    def terminal_robot_state(self) -> Any:
        """Read the canonical state from the shared environment observation cache."""
        try:
            return self.api.get_robot_state()
        except Exception:
            return None

    def terminal_robot_state_summary(self) -> dict[str, Any] | None:
        """Return that state in the bounded numeric form used by MCP feedback."""
        return _compact_robot_state(self.terminal_robot_state())

    def start_program(self, code: str, *, label: str = "CaP program") -> str:
        source = str(code)
        if not source.strip():
            raise ValueError("program must be non-empty")
        return self._start_job(
            kind="program",
            label=label,
            phase="act",
            operation=lambda: self.executor.execute_program(source),
        )

    def start_named_program(self, name: str) -> str:
        """Execute one immutable, human-reviewed program from the catalog."""
        program = self.program_catalog.get(name)
        return self._start_reviewed_program(
            program.definition.name,
            program.source,
            label=f"CaP program: {program.definition.name}",
            controls_runtime=program.definition.moves_robot,
        )

    def _start_reviewed_program(
        self,
        name: str,
        source: str,
        *,
        label: str,
        controls_runtime: bool = True,
    ) -> str:
        return self._start_job(
            kind="program",
            label=label,
            phase="act",
            operation=lambda: self._run_reviewed_program(name, source),
            controls_runtime=controls_runtime,
        )

    def _run_reviewed_program(self, name: str, source: str) -> _ReviewedProgramResult:
        """Bracket a reviewed program with station evidence."""
        before = self.visual_snapshot()
        execution = self.executor.execute_program(source)
        after = self.visual_snapshot()
        images: dict[str, np.ndarray] = {}
        for phase, snapshot in (("before", before), ("after", after)):
            for camera, frame in snapshot.get("cameras", {}).items():
                images[f"{phase}.{camera}"] = np.asarray(frame, dtype=np.uint8).copy()
        verification = {
            "program": name,
            "ok": execution.ok and bool(getattr(execution.result, "ok", True)),
        }
        return _ReviewedProgramResult(
            execution=execution,
            verification=verification,
            images=images,
            terminal_state=self.terminal_robot_state(),
        )

    def _start_job(
        self,
        *,
        kind: str,
        label: str,
        phase: str,
        operation: Any,
        on_result: Any = None,
        controls_runtime: bool = True,
    ) -> str:
        with self._lock:
            if self._closed:
                raise RuntimeError("session is closed")
            if self._job is not None and self._job.active:
                raise SessionBusyError(f"job {self._job.id} ({self._job.label}) is still active")
            job = _Job(
                id=uuid4().hex[:12],
                kind=kind,
                label=str(label),
                phase=phase,
                started_s=time.time(),
            )
            self._job = job
        self.publish("tool", f"started {job.label} [{job.id}]", phase=phase)

        def run() -> None:
            try:
                with self._operation_lock:
                    controller = self._operation_controller
                    try:
                        if controller is not None and controls_runtime:
                            controller.begin_operation(kind=kind, label=label)
                        result = operation()
                    finally:
                        if controller is not None and controls_runtime:
                            controller.end_operation(kind=kind, label=label)
                    if on_result is not None:
                        on_result(result)
                    terminal_state = self.terminal_robot_state()
                    with self._lock:
                        job.result = result
                        job.terminal_state = terminal_state
                    self._capture_result(result)
                    self._record_tool_result(job, result)
                    ok = bool(getattr(result, "ok", True))
                    if isinstance(result, ProgramExecutionResult):
                        ok = result.ok
                    next_phase = "verify" if phase == "act" else "reason"
                    self.publish(
                        "tool",
                        f"finished {job.label} [{job.id}] ({'ok' if ok else 'failed'})",
                        phase=next_phase,
                    )
            except Exception as exc:
                terminal_state = self.terminal_robot_state()
                with self._lock:
                    job.error = f"{type(exc).__name__}: {exc}"
                    job.terminal_state = terminal_state
                self._record_tool_result(job)
                self.publish("tool", f"{job.label} failed: {job.error}", phase="error")
            finally:
                with self._lock:
                    job.finished_s = time.time()
                    self._state_changed.notify_all()

        job.thread = threading.Thread(target=run, name=f"cap-agent-{kind}", daemon=True)
        job.thread.start()
        return job.id

    def job(self, job_id: str | None = None, *, detail: str = "compact") -> dict[str, Any] | None:
        if detail not in {"compact", "full"}:
            raise ValueError("detail must be 'compact' or 'full'")
        with self._lock:
            job = self._job
            if job is None or (job_id is not None and job.id != job_id):
                return None
            result = None
            if not job.active:
                result = (
                    _reviewed_program_summary(job.result, detail=detail)
                    if isinstance(job.result, _ReviewedProgramResult)
                    else _compact_summary(job.result)
                    if detail == "compact"
                    else _summary(job.result)
                )
            return {
                "id": job.id,
                "kind": job.kind,
                "label": job.label,
                "phase": job.phase,
                "active": job.active,
                "elapsed_s": round(
                    (job.finished_s or time.time()) - job.started_s,
                    3,
                ),
                "error": job.error,
                "result": result,
                "terminal_state": _compact_robot_state(job.terminal_state),
            }

    def job_evidence_images(
        self, job_id: str | None, *, cameras: tuple[str, ...] = ("top",)
    ) -> dict[str, np.ndarray]:
        """Return immutable before/after evidence for a finished reviewed program."""
        with self._lock:
            job = self._job
            if job is None or (job_id is not None and job.id != job_id):
                return {}
            result = job.result
            if not isinstance(result, _ReviewedProgramResult):
                return {}
            return {
                label: np.asarray(frame, dtype=np.uint8).copy()
                for label, frame in result.images.items()
                if label.rsplit(".", 1)[-1] in cameras
            }

    def wait(
        self, job_id: str, *, timeout_s: float | None = 0.0, detail: str = "compact"
    ) -> dict[str, Any] | None:
        """Wait for the current job, or until an optional timeout expires."""
        with self._lock:
            job = self._job
            thread = job.thread if job is not None and job.id == job_id else None
        if thread is None:
            return None
        thread.join(timeout=None if timeout_s is None else max(0.0, float(timeout_s)))
        return self.job(job_id, detail=detail)

    def finish(self, *, success: bool, summary: str) -> SessionEvent:
        """Mark the agent task complete; this does not shut down robot services."""
        with self._lock:
            if self._job is not None and self._job.active:
                raise SessionBusyError("cannot finish while a physical job is active")
        return self.publish("agent", summary, phase="done" if success else "error")

    def state(self, *, after: int = 0) -> dict[str, Any]:
        with self._lock:
            events = [
                {
                    "seq": item.seq,
                    "timestamp_s": item.timestamp_s,
                    "role": item.role,
                    "text": item.text,
                    "phase": item.phase,
                }
                for item in self._events
                if item.seq > int(after)
            ]
            steering_pending = len(self._steering)
            phase = self._phase
        return {
            "phase": phase,
            "job": self.job(),
            "events": events,
            "steering_pending": steering_pending,
            "tools": [
                spec.documented_signature for spec in self.registry.all_specs(public_only=True)
            ],
        }

    def decision_context(self, *, after_seq: int = 0) -> dict[str, Any]:
        """Project only live execution and sensor state for System 2."""
        with self._lock:
            context_seq = self._seq
            job = self._job
            execution = None
            if job is not None:
                execution = {
                    "job_id": job.id,
                    "actor": "cap",
                    "action": job.label,
                    "status": "running" if job.active else "finished",
                    "elapsed_s": round((job.finished_s or time.time()) - job.started_s, 2),
                    "error": job.error,
                }
            elapsed_ms = (
                0.0
                if self._refresh_monotonic_s is None
                else max(0.0, time.monotonic() - self._refresh_monotonic_s) * 1000.0
            )
            camera_health = {}
            for name, metadata in self._camera_metadata.items():
                item = {
                    key: metadata.get(key)
                    for key in ("sequence", "age_ms", "stale", "missing", "frame_hash")
                }
                if isinstance(item.get("age_ms"), (int, float)):
                    item["age_ms"] = round(float(item["age_ms"]) + elapsed_ms, 1)
                    stale_after_ms = metadata.get("stale_after_ms")
                    if isinstance(stale_after_ms, (int, float)):
                        item["stale"] = item["age_ms"] > float(stale_after_ms)
                camera_health[name] = item
            observation = {
                "seq": self._observation_seq,
                "stale": bool(self._monitor_error)
                or any(
                    bool(item.get("stale") or item.get("missing"))
                    for item in camera_health.values()
                ),
                "monitor_error": self._monitor_error,
                "cameras": camera_health,
            }
        return {
            "context_seq": context_seq,
            "execution": execution,
            "observation": observation,
        }

    def visual_snapshot(self) -> dict[str, Any]:
        """Refresh and return the station monitoring cache."""
        station_monitor = getattr(self.api, "monitor_snapshot", None)
        if callable(station_monitor):
            try:
                station_live = station_monitor()
            except Exception as exc:
                station_live = {"ok": False, "error": f"{type(exc).__name__}: {exc}"}
            if isinstance(station_live, Mapping) and station_live.get("ok"):
                self._capture_station_snapshot(station_live)
            else:
                error = (
                    station_live.get("error", "station monitor unavailable")
                    if isinstance(station_live, Mapping)
                    else "station monitor unavailable"
                )
                self._capture_station_failure(str(error))

        return self.cached_visual_snapshot()

    def cached_visual_snapshot(self) -> dict[str, Any]:
        """Return the monitor cache without polling the station."""
        with self._lock:
            timestamp_s = self._observation_timestamp_s
            elapsed_ms = (
                0.0
                if self._refresh_monotonic_s is None
                else max(0.0, time.monotonic() - self._refresh_monotonic_s) * 1000.0
            )
            camera_metadata = {}
            for name, raw in self._camera_metadata.items():
                metadata = dict(raw)
                age_ms = metadata.get("age_ms")
                if isinstance(age_ms, (int, float)):
                    metadata["age_ms"] = float(age_ms) + elapsed_ms
                    stale_after_ms = metadata.get("stale_after_ms")
                    if isinstance(stale_after_ms, (int, float)):
                        metadata["stale"] = metadata["age_ms"] > float(stale_after_ms)
                camera_metadata[name] = metadata
            stale = bool(self._monitor_error) or any(
                bool(item.get("stale") or item.get("missing")) for item in camera_metadata.values()
            )
            active_job = self._job if self._job is not None and self._job.active else None
            job_id = None if active_job is None else active_job.id
            return {
                "timestamp_s": timestamp_s,
                "age_s": None if timestamp_s is None else max(0.0, time.time() - timestamp_s),
                "refresh_timestamp_s": self._refresh_timestamp_s,
                "observation_seq": self._observation_seq,
                "job_id": job_id,
                "job_label": None if active_job is None else active_job.label,
                "stale": stale,
                "monitor_error": self._monitor_error,
                "camera_metadata": camera_metadata,
                "cameras": {key: value.copy() for key, value in self._cameras.items()},
                "state": {key: value.copy() for key, value in self._robot_state.items()},
            }

    def _capture_result(self, result: Any) -> None:
        if isinstance(result, _ReviewedProgramResult):
            result = result.execution
        if isinstance(result, ProgramExecutionResult):
            result = result.result
        observation = getattr(result, "final_observation", None) or result
        cameras = getattr(observation, "cameras", None)
        robot_state = getattr(observation, "robot_state", None)
        with self._lock:
            if isinstance(cameras, Mapping) and cameras:
                self._cameras = {
                    str(name): np.asarray(camera.rgb, dtype=np.uint8).copy()
                    for name, camera in cameras.items()
                    if hasattr(camera, "rgb")
                }
            joints = getattr(robot_state, "joint_positions", None)
            grippers = getattr(robot_state, "gripper_positions", None)
            if isinstance(joints, Mapping):
                state = {
                    f"{side}_joint_pos": np.asarray(value, dtype=float).copy()
                    for side, value in joints.items()
                }
                if isinstance(grippers, Mapping):
                    state.update(
                        {
                            f"{side}_gripper_pos": np.asarray([value], dtype=float)
                            for side, value in grippers.items()
                        }
                    )
                self._robot_state = state

    def _capture_station_snapshot(self, value: Mapping[str, Any]) -> None:
        cameras = value.get("cameras")
        camera_metadata = value.get("camera_metadata")
        state = value.get("state")
        timestamp_s = value.get("timestamp_s")
        refresh_timestamp_s = value.get("refresh_timestamp_s")
        observation_seq = value.get("observation_seq")
        copied_cameras = (
            {
                str(name): np.asarray(frame, dtype=np.uint8).copy()
                for name, frame in cameras.items()
                if isinstance(frame, np.ndarray)
            }
            if isinstance(cameras, Mapping)
            else {}
        )
        copied_metadata = (
            {
                str(name): dict(item)
                for name, item in camera_metadata.items()
                if isinstance(item, Mapping)
            }
            if isinstance(camera_metadata, Mapping)
            else {}
        )
        with self._lock:
            self._cameras.update(copied_cameras)
            self._camera_metadata = copied_metadata
            if isinstance(state, Mapping) and state:
                next_state = {
                    str(name): np.asarray(item, dtype=float).copy()
                    for name, item in state.items()
                    if isinstance(item, np.ndarray)
                }
                self._robot_state = next_state
            if isinstance(timestamp_s, (int, float)):
                self._observation_timestamp_s = float(timestamp_s)
            if isinstance(refresh_timestamp_s, (int, float)):
                self._refresh_timestamp_s = float(refresh_timestamp_s)
            else:
                self._refresh_timestamp_s = time.time()
            if isinstance(observation_seq, int):
                self._observation_seq = observation_seq
            self._refresh_monotonic_s = time.monotonic()
            self._monitor_error = None
            self._state_changed.notify_all()

    def _capture_station_failure(self, error: str) -> None:
        with self._lock:
            self._monitor_error = str(error)
            self._refresh_timestamp_s = time.time()
            self._state_changed.notify_all()

    def start_tool(self, name: str, arguments: Mapping[str, Any] | None = None) -> str:
        spec = self.registry.get_spec(str(name))
        if not spec.public:
            raise ValueError(f"tool {name!r} is not public")
        kwargs = dict(arguments or {})
        readonly = name in _READ_ONLY_TOOL_NAMES or spec.capability == "metadata"
        return self._start_job(
            kind="tool",
            label=name,
            phase="perceive" if readonly else "act",
            operation=lambda: spec.function(**kwargs),
            controls_runtime=not readonly,
        )

    def _monitor_loop(self) -> None:
        while not self._monitor_stop.wait(self._next_monitor_period_s()):
            try:
                self.visual_snapshot()
            except Exception as exc:
                self._capture_station_failure(str(exc))

    def _next_monitor_period_s(self) -> float:
        with self._lock:
            active = self._job is not None and self._job.active
        return self._monitor_active_period_s if active else self._monitor_idle_period_s

    def close(self) -> None:
        with self._lock:
            if self._closed:
                return
            self._closed = True
        self._monitor_stop.set()
        with self._state_changed:
            self._state_changed.notify_all()
        if self._monitor_thread is not threading.current_thread():
            self._monitor_thread.join(timeout=1.0)
        controller_close = getattr(self._operation_controller, "close", None)
        if callable(controller_close):
            controller_close()
        with self._lock:
            thread = None if self._job is None else self._job.thread
        if thread is not None and thread is not threading.current_thread():
            thread.join()


__all__ = [
    "PHASES",
    "LiveAgentSession",
    "SessionBusyError",
    "SessionEvent",
]
````

## src/cap_harness/providers/curobo/dual.py

````text
"""Generate a dual-Panda cuRobo model from the pinned single-Panda assets."""

from __future__ import annotations

import copy
import hashlib
from pathlib import Path
import xml.etree.ElementTree as ET

import numpy as np
import yaml

_SECONDARY_SUFFIX = "_2"


def _rpy(rotation: np.ndarray) -> tuple[float, float, float]:
    """Convert a proper rotation matrix to fixed-axis XYZ roll/pitch/yaw."""
    pitch = float(np.arctan2(-rotation[2, 0], np.hypot(rotation[0, 0], rotation[1, 0])))
    if abs(abs(pitch) - np.pi / 2.0) < 1e-7:
        roll = float(np.arctan2(-rotation[0, 1], rotation[1, 1]))
        yaw = 0.0
    else:
        roll = float(np.arctan2(rotation[2, 1], rotation[2, 2]))
        yaw = float(np.arctan2(rotation[1, 0], rotation[0, 0]))
    return roll, pitch, yaw


def _suffix_tree(element: ET.Element, suffix: str) -> ET.Element:
    result = copy.deepcopy(element)
    for item in result.iter():
        if item.tag in {"link", "joint"} and "name" in item.attrib:
            item.attrib["name"] += suffix
        if item.tag in {"parent", "child"} and "link" in item.attrib:
            item.attrib["link"] += suffix
    return result


def _suffix_name(name: str, suffix: str = _SECONDARY_SUFFIX) -> str:
    return f"{name}{suffix}"


def _duplicate_mapping(value: dict[str, object]) -> dict[str, object]:
    result = copy.deepcopy(value)
    for key, item in value.items():
        new_key = _suffix_name(key)
        if isinstance(item, list) and item and all(isinstance(entry, str) for entry in item):
            result[new_key] = [_suffix_name(entry) for entry in item]
        else:
            result[new_key] = copy.deepcopy(item)
    return result


def build_dual_panda_config(
    curobo_root: Path,
    secondary_base_transform: np.ndarray,
    output_root: Path,
) -> Path:
    """Build and cache a 14-DoF model for one calibrated secondary base pose."""
    transform = np.asarray(secondary_base_transform, dtype=np.float64)
    if transform.shape != (4, 4) or not np.all(np.isfinite(transform)):
        raise ValueError("secondary_base_transform must be a finite 4x4 matrix")
    digest = hashlib.sha256(transform.tobytes()).hexdigest()[:16]
    directory = output_root / digest
    config_path = directory / "dual_panda.yml"
    if config_path.is_file():
        return config_path
    directory.mkdir(parents=True, exist_ok=True)

    content = curobo_root / "curobo/content"
    description = content / "assets/robot/franka_description"
    source_urdf = description / "franka_panda.urdf"
    source_config = content / "configs/robot/franka.yml"

    source_root = ET.parse(source_urdf).getroot()
    robot = ET.Element("robot", {"name": "dual_panda"})
    ET.SubElement(robot, "link", {"name": "world_base_link"})
    for child in source_root:
        robot.append(copy.deepcopy(child))
    for child in source_root:
        robot.append(_suffix_tree(child, _SECONDARY_SUFFIX))

    def fixed_joint(name: str, child: str, matrix: np.ndarray) -> None:
        joint = ET.SubElement(robot, "joint", {"name": name, "type": "fixed"})
        roll, pitch, yaw = _rpy(matrix[:3, :3])
        ET.SubElement(
            joint,
            "origin",
            {
                "xyz": " ".join(f"{value:.12g}" for value in matrix[:3, 3]),
                "rpy": f"{roll:.12g} {pitch:.12g} {yaw:.12g}",
            },
        )
        ET.SubElement(joint, "parent", {"link": "world_base_link"})
        ET.SubElement(joint, "child", {"link": child})

    fixed_joint("world_to_primary", "base_link", np.eye(4))
    fixed_joint("world_to_secondary", _suffix_name("base_link"), transform)
    urdf_path = directory / "dual_panda.urdf"
    ET.ElementTree(robot).write(urdf_path, encoding="utf-8", xml_declaration=True)

    data = yaml.safe_load(source_config.read_text(encoding="utf-8"))
    source = data["robot_cfg"]["kinematics"]
    config = copy.deepcopy(source)
    config["asset_root_path"] = str(description)
    config["urdf_path"] = str(urdf_path)
    config["base_link"] = "world_base_link"
    for key in (
        "collision_link_names",
        "mesh_link_names",
        "tool_frames",
        "grasp_contact_link_names",
    ):
        values = [value for value in source.get(key, []) if value != "attached_object"]
        config[key] = values + [_suffix_name(value) for value in values]
    for key in ("collision_spheres", "self_collision_buffer"):
        values = {
            name: value
            for name, value in dict(source.get(key, {})).items()
            if name != "attached_object"
        }
        config[key] = _duplicate_mapping(values)
    ignore = {
        name: [entry for entry in values if entry != "attached_object"]
        for name, values in dict(source.get("self_collision_ignore", {})).items()
        if name != "attached_object"
    }
    config["self_collision_ignore"] = _duplicate_mapping(ignore)
    config["lock_joints"] = {
        **dict(source.get("lock_joints", {})),
        **{
            _suffix_name(name): value for name, value in dict(source.get("lock_joints", {})).items()
        },
    }
    config.pop("extra_links", None)
    config.pop("extra_collision_spheres", None)
    cspace = copy.deepcopy(source["cspace"])
    for key in ("joint_names",):
        values = list(cspace[key])
        cspace[key] = values + [_suffix_name(value) for value in values]
    for key in ("default_joint_position", "null_space_weight", "cspace_distance_weight"):
        cspace[key] = list(cspace[key]) * 2
    config["cspace"] = cspace
    config_path.write_text(
        yaml.safe_dump({"robot_cfg": {"kinematics": config}}, sort_keys=False),
        encoding="utf-8",
    )
    return config_path


__all__ = ["build_dual_panda_config"]
````

## src/cap_harness/validation/provenance.py

````text
"""Generic sealed-evidence helpers for acceptance-grade validation plans.

Extracted from the RoboSuite campaign so any plan marked ``sealed`` reproduces
the same guarantees: a clean-committed-worktree requirement, a full source-tree
hash, package/render provenance, program hashes, and a sealed environment file
whose hash is injected into every fresh program run. Import-light (stdlib only).
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping
import hashlib
from importlib import metadata as importlib_metadata
import json
import os
from pathlib import Path
import platform
import subprocess
import sys

_SEALED_PACKAGES = ("cap-harness", "mujoco", "numpy", "requests", "robosuite", "scipy")
_RENDER_ENV_KEYS = (
    "CUDA_VISIBLE_DEVICES",
    "EGL_PLATFORM",
    "MUJOCO_EGL_DEVICE_ID",
    "MUJOCO_GL",
    "PYOPENGL_PLATFORM",
)


class DirtyWorktreeError(RuntimeError):
    """Raised when a sealed plan is run from a dirty or uncommitted worktree."""


def sha256_file(path: str | os.PathLike[str]) -> str:
    digest = hashlib.sha256()
    with Path(path).open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def write_json(path: str | os.PathLike[str], value: object) -> None:
    target = Path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def git(repo_root: str | os.PathLike[str], *args: str) -> str:
    return subprocess.run(
        ["git", *args],
        cwd=repo_root,
        check=True,
        capture_output=True,
        text=True,
    ).stdout.strip()


def source_tree_sha256(repo_root: str | os.PathLike[str]) -> str:
    """Hash every tracked file under the repo top, in sorted path order."""
    git_top = Path(git(repo_root, "rev-parse", "--show-toplevel"))
    tracked = git(repo_root, "ls-files", "--", ".").splitlines()
    digest = hashlib.sha256()
    for relative in sorted(tracked):
        path = git_top / relative
        if not path.is_file():
            continue
        digest.update(relative.encode("utf-8"))
        digest.update(b"\0")
        digest.update(path.read_bytes())
        digest.update(b"\0")
    return digest.hexdigest()


def package_versions(names: Iterable[str]) -> dict[str, str | None]:
    versions: dict[str, str | None] = {}
    for name in names:
        try:
            versions[name] = importlib_metadata.version(name)
        except importlib_metadata.PackageNotFoundError:
            versions[name] = None
    return versions


def require_clean_worktree(repo_root: str | os.PathLike[str]) -> str:
    """Return HEAD commit; raise DirtyWorktreeError if the tree is not clean."""
    if git(repo_root, "status", "--porcelain"):
        raise DirtyWorktreeError("sealed validation plans require a clean committed worktree")
    return git(repo_root, "rev-parse", "HEAD")


def seal_environment(
    output_root: str | os.PathLike[str],
    repo_root: str | os.PathLike[str],
    *,
    renderer: str,
    schema_version: int = 1,
) -> tuple[Path, str, str]:
    """Write ``environment.json`` and return (path, environment_sha256, commit).

    Records python/platform/package/render provenance, the HEAD commit, the full
    source-tree hash, and the dependency-lock hash. The returned environment hash
    is injected into each fresh program run for later verification.
    """
    repo_root = Path(repo_root).resolve()
    output_root = Path(output_root)
    commit = require_clean_worktree(repo_root)
    dependency_lock = repo_root / "configs/dependency-lock.json"
    environment = {
        "schema_version": schema_version,
        "python": {
            "executable": str(Path(sys.executable).resolve()),
            "implementation": platform.python_implementation(),
            "version": platform.python_version(),
        },
        "platform": platform.platform(),
        "packages": package_versions(_SEALED_PACKAGES),
        "renderer": renderer,
        "render_environment": {name: os.environ.get(name) for name in _RENDER_ENV_KEYS},
        "harness_git_commit": commit,
        "harness_source_tree_sha256": source_tree_sha256(repo_root),
        "dependency_lock_sha256": (
            sha256_file(dependency_lock) if dependency_lock.is_file() else None
        ),
    }
    environment_path = output_root / "environment.json"
    write_json(environment_path, environment)
    return environment_path, sha256_file(environment_path), commit


def check_program_provenance(
    provenance: Mapping[str, object],
    *,
    program_sha256: str,
    commit: str,
    dependency_lock_sha256: str | None,
) -> list[str]:
    """Return a list of issue strings for a single run's ``provenance.json``."""
    issues: list[str] = []
    if provenance.get("sha256") != program_sha256:
        issues.append("program provenance hash mismatch")
    git_info = provenance.get("harness_git")
    if (
        not isinstance(git_info, Mapping)
        or git_info.get("commit") != commit
        or git_info.get("dirty") is not False
    ):
        issues.append("run was not recorded from the clean sealed commit")
    if provenance.get("dependency_lock_sha256") != dependency_lock_sha256:
        issues.append("dependency lock hash mismatch")
    return issues


__all__ = [
    "DirtyWorktreeError",
    "check_program_provenance",
    "git",
    "package_versions",
    "require_clean_worktree",
    "seal_environment",
    "sha256_file",
    "source_tree_sha256",
    "write_json",
]
````

## src/cap_harness/validation/evaluators/behavior_pickup.py

````text
"""Host-side pickup witness for the BEHAVIOR-1K R1 Pro tasks.

Success is the ASPIRE-comparable rule: the robot's grasp holds the target object AND the object
sits at least ``LIFT_THRESHOLD_M`` above the height it had when the task instance was loaded.
Unlike the reference, the baseline is captured after the instance load, and success is latched
on the first step both conditions hold (``DEBOUNCE_STEPS`` consecutive steps, zero today).

Only booleans, step indices and clearances leave this module; generated programs never see it.
"""

from __future__ import annotations

from collections.abc import Mapping
from typing import Any

import numpy as np

from cap_harness.contracts import RobotAction, StepResult

LIFT_THRESHOLD_M = 0.005
"""Minimum rise above the instance-start height, ASPIRE's 5 mm."""
DEBOUNCE_STEPS = 0
"""Extra consecutive steps both predicates must hold before success latches (ASPIRE: none)."""


def _as_float(value: Any) -> float:
    if hasattr(value, "detach"):
        value = value.detach().cpu()
    return float(np.asarray(value, dtype=np.float64).reshape(-1)[0])


def _object_height(entity: Any) -> float:
    position, _ = entity.get_position_orientation()
    if hasattr(position, "detach"):
        position = position.detach().cpu()
    return float(np.asarray(position, dtype=np.float64).reshape(-1)[2])


def _grasp_state_is_true(state: Any) -> bool:
    """Interpret OmniGibson's ``IsGraspingState`` without importing it."""
    if state is True:
        return True
    if isinstance(state, int | float | np.integer) and not isinstance(state, bool):
        return int(state) == 1
    name = getattr(state, "name", None)
    if isinstance(name, str):
        return name.upper() == "TRUE"
    return str(state).upper().endswith("TRUE")


class BehaviorPickupWitness:
    """Latch ``held and lifted`` for the task's target object on the first episode only."""

    def __init__(
        self,
        task_name: str,
        native_env: Any,
        *,
        target_scope: str,
        lift_threshold_m: float = LIFT_THRESHOLD_M,
        debounce_steps: int = DEBOUNCE_STEPS,
    ) -> None:
        self.task_name = str(task_name)
        self.target_scope = str(target_scope)
        self.lift_threshold_m = float(lift_threshold_m)
        self.debounce_steps = int(debounce_steps)
        if self.lift_threshold_m <= 0.0 or self.debounce_steps < 0:
            raise ValueError("lift threshold must be positive and debounce non-negative")
        self._env = native_env
        self._robot = native_env.robots[0]
        scope = native_env.task.object_scope
        if self.target_scope not in scope or scope[self.target_scope] is None:
            raise KeyError(f"target {self.target_scope!r} is not in the task object scope")
        self._target = scope[self.target_scope]
        self._baseline_z = _object_height(self._target)
        self._step_index = 0
        self._consecutive = 0
        self._success = False
        self._success_step: int | None = None
        self._first_held_step: int | None = None
        self._first_lifted_step: int | None = None
        self._max_clearance_m = 0.0
        self._holding_arm: str | None = None

    @property
    def success(self) -> bool:
        return self._success

    @property
    def success_step(self) -> int | None:
        return self._success_step

    def held_by(self) -> str | None:
        """Return the arm whose grasp holds the target, or None."""
        for arm in self._robot.arm_names:
            try:
                state = self._robot.is_grasping(arm=arm, candidate_obj=self._target)
            except Exception:  # pragma: no cover - defensive against native API drift
                state = False
            if _grasp_state_is_true(state):
                return str(arm)
        return None

    def clearance_m(self) -> float:
        return _object_height(self._target) - self._baseline_z

    def after_step(self, action: RobotAction, result: StepResult) -> None:
        if not result.ok:
            return
        self._step_index += 1
        clearance = self.clearance_m()
        self._max_clearance_m = max(self._max_clearance_m, clearance)
        arm = self.held_by()
        lifted = clearance >= self.lift_threshold_m
        if arm is not None and self._first_held_step is None:
            self._first_held_step = self._step_index
        if lifted and self._first_lifted_step is None:
            self._first_lifted_step = self._step_index
        if self._success:
            return
        if arm is not None and lifted:
            self._consecutive += 1
            if self._consecutive > self.debounce_steps:
                self._success = True
                self._success_step = self._step_index
                self._holding_arm = arm
        else:
            self._consecutive = 0

    def evidence(self, *, final_native_success: bool | None = None) -> Mapping[str, object]:
        return {
            "schema_version": 1,
            "task_name": self.task_name,
            "rule": {
                "lift_threshold_m": self.lift_threshold_m,
                "debounce_steps": self.debounce_steps,
                "baseline": "instance-start height, captured after the task instance was loaded",
            },
            "checks": {
                "held": self._first_held_step is not None,
                "lifted": self._first_lifted_step is not None,
                "held_and_lifted": self._success,
            },
            "first_held_step": self._first_held_step,
            "first_lifted_step": self._first_lifted_step,
            "success_step": self._success_step,
            "holding_arm": self._holding_arm,
            "max_clearance_m": float(self._max_clearance_m),
            "steps_observed": self._step_index,
            "final_native_success": final_native_success,
            "protocol_success": self._success,
        }


__all__ = ["DEBOUNCE_STEPS", "LIFT_THRESHOLD_M", "BehaviorPickupWitness"]
````

## src/cap_harness/validation/evaluators/robosuite_bimanual.py

````text
"""Evaluator-only bimanual protocol witnesses for Robosuite acceptance runs.

This module intentionally consumes privileged simulator predicates. Nothing in
it is registered with generated programs, serialized into public call traces,
or returned through :class:`cap_harness.api.CapApi`.
"""

from __future__ import annotations

from collections.abc import Mapping
from dataclasses import dataclass
from types import MappingProxyType
from typing import Any

import numpy as np

from cap_harness.contracts import RobotAction, StepResult

_CLOSED = 0.05
_OPEN = 0.95
_MOTION_EPSILON_RAD = 1e-4
_HANDOVER_PRESENTATION_X_RANGE_M = (0.55, 1.10)
_HANDOVER_PRESENTATION_ABS_Y_M = 0.25
_HANDOVER_PRESENTATION_PROGRESS_M = 0.15
_HANDOVER_RECEIVER_APPROACH_M = 0.12


@dataclass(frozen=True, slots=True)
class NativeProtocolState:
    """Minimal privileged state consumed by the evaluator state machine."""

    primary_grasp: bool
    secondary_grasp: bool
    object_clearance_m: float
    native_success: bool
    handle_position_xyz: np.ndarray | None = None
    receiver_to_handle_m: float | None = None
    receiver_to_handle_xyz: np.ndarray | None = None
    object_long_axis_xyz: np.ndarray | None = None
    secondary_handle_finger_contacts: int | None = None
    secondary_handle_full_finger_contacts: int | None = None
    secondary_hammer_full_finger_contacts: int | None = None
    secondary_hammer_contact_pairs: tuple[tuple[str, str], ...] | None = None

    def __post_init__(self) -> None:
        if type(self.primary_grasp) is not bool or type(self.secondary_grasp) is not bool:
            raise ValueError("grasp predicates must be bools")
        if type(self.native_success) is not bool:
            raise ValueError("native_success must be a bool")
        if not np.isfinite(self.object_clearance_m):
            raise ValueError("object_clearance_m must be finite")
        if self.handle_position_xyz is not None:
            handle = np.asarray(self.handle_position_xyz, dtype=np.float64)
            if handle.shape != (3,) or not bool(np.all(np.isfinite(handle))):
                raise ValueError("handle_position_xyz must be a finite three-vector or None")
            object.__setattr__(self, "handle_position_xyz", np.array(handle, copy=True))
        if self.receiver_to_handle_m is not None:
            distance = float(self.receiver_to_handle_m)
            if not np.isfinite(distance) or distance < 0.0:
                raise ValueError("receiver_to_handle_m must be finite and non-negative or None")
            object.__setattr__(self, "receiver_to_handle_m", distance)
        if self.receiver_to_handle_xyz is not None:
            offset = np.asarray(self.receiver_to_handle_xyz, dtype=np.float64)
            if offset.shape != (3,) or not bool(np.all(np.isfinite(offset))):
                raise ValueError("receiver_to_handle_xyz must be a finite three-vector or None")
            object.__setattr__(self, "receiver_to_handle_xyz", np.array(offset, copy=True))
        if self.object_long_axis_xyz is not None:
            axis = np.asarray(self.object_long_axis_xyz, dtype=np.float64)
            if axis.shape != (3,) or not bool(np.all(np.isfinite(axis))):
                raise ValueError("object_long_axis_xyz must be a finite three-vector or None")
            norm = float(np.linalg.norm(axis))
            if norm <= 1e-12:
                raise ValueError("object_long_axis_xyz must be non-zero or None")
            object.__setattr__(self, "object_long_axis_xyz", axis / norm)
        if self.secondary_handle_finger_contacts is not None and (
            isinstance(self.secondary_handle_finger_contacts, bool)
            or self.secondary_handle_finger_contacts not in {0, 1, 2}
        ):
            raise ValueError("secondary_handle_finger_contacts must be 0, 1, 2, or None")
        for name in (
            "secondary_handle_full_finger_contacts",
            "secondary_hammer_full_finger_contacts",
        ):
            count = getattr(self, name)
            if count is not None and (isinstance(count, bool) or count not in {0, 1, 2}):
                raise ValueError(f"{name} must be 0, 1, 2, or None")
        if self.secondary_hammer_contact_pairs is not None:
            pairs = tuple(self.secondary_hammer_contact_pairs)
            if any(
                not isinstance(pair, tuple)
                or len(pair) != 2
                or any(not isinstance(geom, str) or not geom for geom in pair)
                for pair in pairs
            ):
                raise ValueError(
                    "secondary_hammer_contact_pairs must contain non-empty string pairs"
                )
            object.__setattr__(self, "secondary_hammer_contact_pairs", pairs)


class BimanualProtocolTracker:
    """Pure state machine producing ordered protocol witnesses."""

    def __init__(self, task_name: str, *, success_clearance_m: float) -> None:
        if task_name not in {"two_arm_lift", "two_arm_handover"}:
            raise ValueError("unsupported bimanual protocol task")
        if not np.isfinite(success_clearance_m) or success_clearance_m < 0.0:
            raise ValueError("success_clearance_m must be finite and non-negative")
        self.task_name = task_name
        self.success_clearance_m = float(success_clearance_m)
        self.steps_observed = 0
        self.max_clearance_m = float("-inf")
        self.last_native_success = False
        self.witnesses: dict[str, int] = {}
        self._dual_close_targets: dict[str, np.ndarray] | None = None
        self.min_receiver_to_handle_m = float("inf")
        self.receiver_to_handle_at_pickup_m: float | None = None
        self.max_object_long_axis_x_alignment = 0.0
        self.max_secondary_handle_finger_contacts = 0
        self.max_secondary_handle_full_finger_contacts = 0
        self.max_secondary_hammer_full_finger_contacts = 0
        self.closest_receiver_to_handle_xyz: np.ndarray | None = None
        self.final_receiver_to_handle_xyz: np.ndarray | None = None
        self.secondary_hammer_contact_pairs: set[tuple[str, str]] = set()
        self.errors: list[str] = []

    def observe(
        self,
        step_index: int,
        action: RobotAction,
        native: NativeProtocolState,
    ) -> None:
        if isinstance(step_index, bool) or not isinstance(step_index, int) or step_index <= 0:
            raise ValueError("step_index must be a positive integer")
        if not isinstance(action, RobotAction) or not isinstance(native, NativeProtocolState):
            raise ValueError("action and native state must use typed protocol values")
        self.steps_observed = max(self.steps_observed, step_index)
        self.max_clearance_m = max(self.max_clearance_m, native.object_clearance_m)
        self.last_native_success = native.native_success
        if native.receiver_to_handle_m is not None:
            if native.receiver_to_handle_m < self.min_receiver_to_handle_m:
                self.min_receiver_to_handle_m = native.receiver_to_handle_m
                self.closest_receiver_to_handle_xyz = (
                    None
                    if native.receiver_to_handle_xyz is None
                    else np.array(native.receiver_to_handle_xyz, copy=True)
                )
        if native.receiver_to_handle_xyz is not None:
            self.final_receiver_to_handle_xyz = np.array(
                native.receiver_to_handle_xyz,
                copy=True,
            )
        if (
            native.object_long_axis_xyz is not None
            and native.primary_grasp
            and native.object_clearance_m > self.success_clearance_m
        ):
            self.max_object_long_axis_x_alignment = max(
                self.max_object_long_axis_x_alignment,
                abs(float(native.object_long_axis_xyz[0])),
            )
        if native.secondary_handle_finger_contacts is not None:
            self.max_secondary_handle_finger_contacts = max(
                self.max_secondary_handle_finger_contacts,
                native.secondary_handle_finger_contacts,
            )
        if native.secondary_handle_full_finger_contacts is not None:
            self.max_secondary_handle_full_finger_contacts = max(
                self.max_secondary_handle_full_finger_contacts,
                native.secondary_handle_full_finger_contacts,
            )
        if native.secondary_hammer_full_finger_contacts is not None:
            self.max_secondary_hammer_full_finger_contacts = max(
                self.max_secondary_hammer_full_finger_contacts,
                native.secondary_hammer_full_finger_contacts,
            )
        if native.secondary_hammer_contact_pairs is not None:
            self.secondary_hammer_contact_pairs.update(native.secondary_hammer_contact_pairs)
        if self.task_name == "two_arm_lift":
            self._observe_lift(step_index, action, native)
        else:
            self._observe_handover(step_index, action, native)

    def record_error(self, error: BaseException) -> None:
        if not self.errors:
            self.errors.append(type(error).__name__)

    def evidence(self, *, final_native_success: bool) -> Mapping[str, object]:
        checks = (
            self._lift_checks(final_native_success)
            if self.task_name == "two_arm_lift"
            else self._handover_checks(final_native_success)
        )
        result: dict[str, object] = {
            "schema_version": 1,
            "task": self.task_name,
            "protocol_success": all(checks.values()) and not self.errors,
            "checks": MappingProxyType(checks),
            "witness_steps": MappingProxyType(dict(sorted(self.witnesses.items()))),
            "steps_observed": self.steps_observed,
            "success_clearance_m": self.success_clearance_m,
            "max_object_clearance_m": (
                None if self.max_clearance_m == float("-inf") else self.max_clearance_m
            ),
            "final_native_success": bool(final_native_success),
            "evaluator_errors": tuple(self.errors),
        }
        if self.task_name == "two_arm_handover":
            result["stages"] = MappingProxyType(self._handover_stages(final_native_success))
            result["stage_metrics"] = MappingProxyType(
                {
                    "min_receiver_to_handle_m": (
                        None
                        if self.min_receiver_to_handle_m == float("inf")
                        else self.min_receiver_to_handle_m
                    ),
                    "max_object_long_axis_x_alignment": (self.max_object_long_axis_x_alignment),
                    "receiver_to_handle_at_pickup_m": self.receiver_to_handle_at_pickup_m,
                    "presentation_x_range_m": _HANDOVER_PRESENTATION_X_RANGE_M,
                    "presentation_abs_y_m": _HANDOVER_PRESENTATION_ABS_Y_M,
                    "presentation_progress_m": _HANDOVER_PRESENTATION_PROGRESS_M,
                    "receiver_approach_m": _HANDOVER_RECEIVER_APPROACH_M,
                    "max_secondary_handle_finger_contacts": (
                        self.max_secondary_handle_finger_contacts
                    ),
                    "max_secondary_handle_full_finger_contacts": (
                        self.max_secondary_handle_full_finger_contacts
                    ),
                    "max_secondary_hammer_full_finger_contacts": (
                        self.max_secondary_hammer_full_finger_contacts
                    ),
                    "closest_receiver_to_handle_xyz": (
                        None
                        if self.closest_receiver_to_handle_xyz is None
                        else tuple(float(value) for value in self.closest_receiver_to_handle_xyz)
                    ),
                    "final_receiver_to_handle_xyz": (
                        None
                        if self.final_receiver_to_handle_xyz is None
                        else tuple(float(value) for value in self.final_receiver_to_handle_xyz)
                    ),
                    "secondary_hammer_contact_pairs": tuple(
                        sorted(self.secondary_hammer_contact_pairs)
                    ),
                }
            )
        return MappingProxyType(result)

    def _observe_lift(
        self,
        step: int,
        action: RobotAction,
        native: NativeProtocolState,
    ) -> None:
        commands = action.arms
        if (
            "dual_close" not in self.witnesses
            and set(commands) == {"primary", "secondary"}
            and all(
                commands[arm].gripper_position is not None
                and commands[arm].gripper_position <= _CLOSED
                for arm in ("primary", "secondary")
            )
        ):
            self.witnesses["dual_close"] = step
            self._dual_close_targets = {
                arm: np.array(commands[arm].target, copy=True) for arm in ("primary", "secondary")
            }

        close_step = self.witnesses.get("dual_close")
        if close_step is None or step < close_step:
            return
        if "dual_grasp" not in self.witnesses and native.primary_grasp and native.secondary_grasp:
            self.witnesses["dual_grasp"] = step
        if (
            "coupled_motion" not in self.witnesses
            and step > close_step
            and set(commands) == {"primary", "secondary"}
            and self._dual_close_targets is not None
            and all(
                float(np.max(np.abs(commands[arm].target - self._dual_close_targets[arm])))
                > _MOTION_EPSILON_RAD
                for arm in ("primary", "secondary")
            )
        ):
            self.witnesses["coupled_motion"] = step
        coupled_step = self.witnesses.get("coupled_motion")
        if (
            "lifted_with_dual_grasp" not in self.witnesses
            and coupled_step is not None
            and step >= coupled_step
            and native.primary_grasp
            and native.secondary_grasp
            and native.object_clearance_m > self.success_clearance_m
        ):
            self.witnesses["lifted_with_dual_grasp"] = step

    def _observe_handover(
        self,
        step: int,
        action: RobotAction,
        native: NativeProtocolState,
    ) -> None:
        primary = action.arms.get("primary")
        secondary = action.arms.get("secondary")
        if (
            "giver_grasp_elevated" not in self.witnesses
            and native.primary_grasp
            and native.object_clearance_m > self.success_clearance_m
        ):
            self.witnesses["giver_grasp_elevated"] = step
            self.receiver_to_handle_at_pickup_m = native.receiver_to_handle_m
        giver_step = self.witnesses.get("giver_grasp_elevated")
        handle = native.handle_position_xyz
        entered_shared_workspace = (
            handle is not None
            and _HANDOVER_PRESENTATION_X_RANGE_M[0]
            <= float(handle[0])
            <= _HANDOVER_PRESENTATION_X_RANGE_M[1]
            and abs(float(handle[1])) <= _HANDOVER_PRESENTATION_ABS_Y_M
        )
        progressed_toward_receiver = (
            self.receiver_to_handle_at_pickup_m is not None
            and native.receiver_to_handle_m is not None
            and native.receiver_to_handle_m
            <= self.receiver_to_handle_at_pickup_m - _HANDOVER_PRESENTATION_PROGRESS_M
        )
        if (
            giver_step is not None
            and "presentation" not in self.witnesses
            and native.primary_grasp
            and native.object_clearance_m > self.success_clearance_m
            and (entered_shared_workspace or progressed_toward_receiver)
        ):
            self.witnesses["presentation"] = step
        presentation = self.witnesses.get("presentation")
        if (
            presentation is not None
            and "receiver_approach" not in self.witnesses
            and native.primary_grasp
            and native.object_clearance_m > self.success_clearance_m
            and native.receiver_to_handle_m is not None
            and native.receiver_to_handle_m <= _HANDOVER_RECEIVER_APPROACH_M
        ):
            self.witnesses["receiver_approach"] = step
        if (
            giver_step is not None
            and "receiver_close_command" not in self.witnesses
            and secondary is not None
            and secondary.gripper_position is not None
            and secondary.gripper_position <= _CLOSED
        ):
            self.witnesses["receiver_close_command"] = step
        receiver_close = self.witnesses.get("receiver_close_command")
        if (
            receiver_close is not None
            and "overlap_grasp" not in self.witnesses
            and step >= receiver_close
            and native.primary_grasp
            and native.secondary_grasp
        ):
            self.witnesses["overlap_grasp"] = step
        overlap = self.witnesses.get("overlap_grasp")
        if (
            overlap is not None
            and "giver_open_command" not in self.witnesses
            and primary is not None
            and primary.gripper_position is not None
            and primary.gripper_position >= _OPEN
        ):
            self.witnesses["giver_open_command"] = step
        giver_open = self.witnesses.get("giver_open_command")
        if (
            giver_open is not None
            and "receiver_only_elevated" not in self.witnesses
            and step >= giver_open
            and not native.primary_grasp
            and native.secondary_grasp
            and native.object_clearance_m > self.success_clearance_m
        ):
            self.witnesses["receiver_only_elevated"] = step

    def _lift_checks(self, final_native_success: bool) -> dict[str, bool]:
        close = self.witnesses.get("dual_close")
        grasp = self.witnesses.get("dual_grasp")
        coupled = self.witnesses.get("coupled_motion")
        lifted = self.witnesses.get("lifted_with_dual_grasp")
        return {
            "same_tick_dual_close": close is not None,
            "both_correct_grasps": grasp is not None and close is not None and grasp >= close,
            "coupled_motion_after_close": (
                coupled is not None and close is not None and coupled > close
            ),
            "lifted_while_both_grasp": (
                lifted is not None and coupled is not None and lifted >= coupled
            ),
            "native_task_success": bool(final_native_success and self.last_native_success),
        }

    def _handover_checks(self, final_native_success: bool) -> dict[str, bool]:
        giver = self.witnesses.get("giver_grasp_elevated")
        receiver_close = self.witnesses.get("receiver_close_command")
        overlap = self.witnesses.get("overlap_grasp")
        giver_open = self.witnesses.get("giver_open_command")
        receiver_only = self.witnesses.get("receiver_only_elevated")
        return {
            "giver_grasp_elevated": giver is not None,
            "receiver_close_after_giver_grasp": (
                receiver_close is not None and giver is not None and receiver_close >= giver
            ),
            "overlap_before_release": (
                overlap is not None and receiver_close is not None and overlap >= receiver_close
            ),
            "giver_open_after_receiver_grasp": (
                giver_open is not None and overlap is not None and giver_open >= overlap
            ),
            "receiver_only_elevated": (
                receiver_only is not None and giver_open is not None and receiver_only >= giver_open
            ),
            "native_task_success": bool(final_native_success and self.last_native_success),
        }

    def _handover_stages(self, final_native_success: bool) -> dict[str, Mapping[str, object]]:
        """Return host-only cumulative stage gates for targeted experiments."""
        receiver_close = self.witnesses.get("receiver_close_command")
        overlap = self.witnesses.get("overlap_grasp")
        receiver_only = self.witnesses.get("receiver_only_elevated")
        native_success = bool(final_native_success and self.last_native_success)

        def stage(
            passed: bool,
            witness: str | None,
            **details: object,
        ) -> Mapping[str, object]:
            payload: dict[str, object] = {
                "passed": passed,
                "witness_step": None if witness is None else self.witnesses.get(witness),
            }
            payload.update(details)
            return MappingProxyType(payload)

        protocol_checks = self._handover_checks(final_native_success)
        return {
            "pickup": stage(
                "giver_grasp_elevated" in self.witnesses,
                "giver_grasp_elevated",
            ),
            "presentation": stage(
                "presentation" in self.witnesses,
                "presentation",
            ),
            "receiver_approach": stage(
                "receiver_approach" in self.witnesses,
                "receiver_approach",
            ),
            "receiver_close": stage(
                overlap is not None,
                "overlap_grasp",
                command_step=receiver_close,
                native_overlap=overlap is not None,
            ),
            "giver_release": stage(
                receiver_only is not None,
                "receiver_only_elevated",
                command_step=self.witnesses.get("giver_open_command"),
                receiver_only_elevated=receiver_only is not None,
            ),
            "native_success": stage(native_success, None),
            "protocol_witnesses": stage(
                all(protocol_checks.values()) and not self.errors,
                None,
                checks=MappingProxyType(protocol_checks),
            ),
        }


class RobosuiteBimanualProtocolEvaluator:
    """Adapter-bound privileged sampler feeding the pure protocol tracker."""

    def __init__(self, task_name: str, native_env: Any) -> None:
        self.task_name = task_name
        self.native_env = native_env
        threshold = 0.10 if task_name == "two_arm_lift" else float(native_env.height_threshold)
        self.tracker = BimanualProtocolTracker(
            task_name,
            success_clearance_m=threshold,
        )
        self.step_index = 0

    def after_step(self, action: RobotAction, result: StepResult) -> None:
        if not result.ok:
            return
        self.step_index += 1
        try:
            self.tracker.observe(self.step_index, action, self._native_state())
        except Exception as exc:  # Evaluation failure must not mutate simulation control.
            self.tracker.record_error(exc)

    def evidence(self, *, final_native_success: bool) -> Mapping[str, object]:
        return self.tracker.evidence(final_native_success=final_native_success)

    def _native_state(self) -> NativeProtocolState:
        env = self.native_env
        if self.task_name == "two_arm_handover":
            primary, secondary, object_height, table_height = env._get_task_info()
            primary_base_rotation = np.asarray(
                env.sim.data.get_body_xmat("robot0_base"),
                dtype=np.float64,
            ).reshape(3, 3)
            primary_base_position = np.asarray(
                env.sim.data.get_body_xpos("robot0_base"),
                dtype=np.float64,
            ).reshape(3)
            primary_from_world_rotation = primary_base_rotation.T
            hammer_rotation = np.asarray(
                env.sim.data.body_xmat[env.hammer_body_id],
                dtype=np.float64,
            ).reshape(3, 3)
            receiver = env.robots[1].gripper
            handle_geoms = env.hammer.handle_geoms
            hammer_geoms = env.hammer.contact_geoms
            finger_pad_contacts = sum(
                bool(env.check_contact(receiver.important_geoms[name], handle_geoms))
                for name in ("left_fingerpad", "right_fingerpad")
            )
            handle_full_finger_contacts = sum(
                bool(env.check_contact(receiver.important_geoms[name], handle_geoms))
                for name in ("left_finger", "right_finger")
            )
            hammer_full_finger_contacts = sum(
                bool(env.check_contact(receiver.important_geoms[name], hammer_geoms))
                for name in ("left_finger", "right_finger")
            )
            receiver_geoms = set(receiver.contact_geoms)
            hammer_geom_set = set(hammer_geoms)
            contact_pairs: set[tuple[str, str]] = set()
            for contact in env.sim.data.contact[: env.sim.data.ncon]:
                geom1 = env.sim.model.geom_id2name(contact.geom1)
                geom2 = env.sim.model.geom_id2name(contact.geom2)
                if geom1 in receiver_geoms and geom2 in hammer_geom_set:
                    contact_pairs.add((geom1, geom2))
                elif geom2 in receiver_geoms and geom1 in hammer_geom_set:
                    contact_pairs.add((geom2, geom1))
            handle_position = primary_from_world_rotation @ (
                np.asarray(env._handle_xpos, dtype=np.float64) - primary_base_position
            )
            receiver_to_handle = primary_from_world_rotation @ np.asarray(
                env._gripper_1_to_handle,
                dtype=np.float64,
            )
            return NativeProtocolState(
                primary_grasp=bool(primary),
                secondary_grasp=bool(secondary),
                object_clearance_m=float(object_height - table_height),
                native_success=bool(env._check_success()),
                handle_position_xyz=handle_position,
                receiver_to_handle_m=float(np.linalg.norm(env._gripper_1_to_handle)),
                receiver_to_handle_xyz=receiver_to_handle,
                # HammerObject builds its handle cylinder along local Z.
                object_long_axis_xyz=primary_from_world_rotation @ hammer_rotation[:, 2],
                secondary_handle_finger_contacts=finger_pad_contacts,
                secondary_handle_full_finger_contacts=handle_full_finger_contacts,
                secondary_hammer_full_finger_contacts=hammer_full_finger_contacts,
                secondary_hammer_contact_pairs=tuple(sorted(contact_pairs)),
            )
        grippers = (
            (env.robots[0].gripper["right"], env.robots[0].gripper["left"])
            if env.env_configuration == "bimanual"
            else (env.robots[0].gripper, env.robots[1].gripper)
        )
        primary = env._check_grasp(gripper=grippers[0], object_geoms=env.pot.handle0_geoms)
        secondary = env._check_grasp(gripper=grippers[1], object_geoms=env.pot.handle1_geoms)
        pot_bottom = env.sim.data.site_xpos[env.pot_center_id][2] - env.pot.top_offset[2]
        table_height = env.sim.data.site_xpos[env.table_top_id][2]
        return NativeProtocolState(
            primary_grasp=bool(primary),
            secondary_grasp=bool(secondary),
            object_clearance_m=float(pot_bottom - table_height),
            native_success=bool(env._check_success()),
        )


__all__ = [
    "BimanualProtocolTracker",
    "NativeProtocolState",
    "RobosuiteBimanualProtocolEvaluator",
]
````
